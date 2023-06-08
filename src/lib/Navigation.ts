import { Node } from "./Node";
import { Edge } from "./Edge";
import { PriorityQueue } from "../util/priorityQueue";
import { trailStatusUrls } from "../cfg/trailStatusUrls";
import fs from 'fs';
var cloneDeep = require('lodash.clonedeep');

interface Alias {
    name: string;
    node: Node;
}

export class Navigation{
    graph: {[fromId: string]: {[toId: string]: Edge}};
    nodes: {[id: string]: Node};
    edges: {[id: string]: Edge};
    diff_map: {[diff: string]: number};
    resortName: string;

    constructor(){
        this.graph = {}
        this.nodes = {};
        this.edges = {};
        this.diff_map = {
            "": 1,
            "novice": 1,
            "easy": 1,
            "intermediate": 2,
            "advanced": 3,
            "expert": 3,
        }
        this.resortName = "";
    };
    
    getGraph() {
        // fs.writeFileSync("graph.json", JSON.stringify(this.graph));
        return this.graph;
    }

    getNodes() {
        fs.writeFileSync("nodes.json", JSON.stringify(this.nodes));
        return this.nodes;
    }

    getEdges() {
        // fs.writeFileSync("edges.json", JSON.stringify(this.edges));
        return this.edges;
    }

    /**
     * Returns a list of objects that maps alias to node.
     */
    getSearchableNodes(): Alias[] {
        var searchableNodes: Alias[] = [];
        for (let nodeId in this.nodes) {
            const aliases = this.nodes[nodeId]["aliases"];

            for (let i in aliases) {
                searchableNodes.push({name: aliases[i], node: this.nodes[nodeId]});
            }
        }
        return searchableNodes;
    }

    /**
     * Request graph from our server via api, then parse it into graph, nodes, and edges."
     */
    async requestGraph(graphName: string) {
        this.resortName = graphName;
        const url = "http://ec2-18-188-212-45.us-east-2.compute.amazonaws.com:3000/api/v1/maps/".concat(graphName);
        const response = await fetch(url);
        const graphJson = await response.json();
        // fs.writeFileSync("response.json", JSON.stringify(graphJson));
        this.graph = {};
        this.nodes = {};
        this.edges = {};
        
        Object.entries(graphJson["vertices"]).forEach(([_, v]) => {
            let vertex = v as any;
            let vertexId: string = vertex["id"].toString();
    
            this.nodes[vertexId] = new Node(vertexId, Number(vertex["latitude"]), Number(vertex["longitude"]), vertex["aliases"]);
            
            Object.entries(vertex["edges"]).forEach(([_, e]) => {
                let edge = e as any;
                edge["name"] = edge["name"].replace(/[()']/g, "");

                if(edge["edgeType"] === "SLOPE") {
                    this.edges[edge["id"]] = new Edge(edge["edgeType"], this.diff_map[edge["difficulty"]], edge["name"], edge["id"], vertexId, edge["to"].toString(), edge["weight"]);   
                } else if(edge["edgeType"] === "LIFT") {
                    this.edges[edge["id"]] = new Edge(edge["edgeType"], 0, edge["name"], edge["id"], vertexId, edge["to"].toString(), edge["weight"]);   
                } else {
                    console.log("Edge not slope or lift, edge type = ", edge["edgeType"]);
                }
                
                if (!this.graph[vertexId]) {
                    this.graph[vertexId] = {};
                }
                this.graph[vertexId][edge["to"].toString()] = this.edges[edge["id"]];
            })
        })
    }

    _dist(x: [number, number], y: [number, number]): number{
        let d = (x[0]-y[0])**2 + (x[1]-y[1])**2;
        return d
    }

    /**
     * Find the closest node to the coordinate the user pressed.
     */
    getClosestNode(lati: number, long: number): string {
        let ClosestNode: string = "",
            minDist: number = Infinity;
        
        for (let n in this.nodes) {
            let curDist = this._dist([lati, long], [this.nodes[n].getLatitude(), this.nodes[n].getLongitude()]);
            if (curDist < minDist){
                minDist = curDist;
                ClosestNode = n;
            }
        }

        return ClosestNode;
    }

    /**
     * Removes runs that are not included in the chosen diffculties or those that are not open.
     */
    _checkDifficultyAndStatus (graph: { [fromId: string]: { [toId: string]: Edge}}, 
                               difficulties: Set<number>) { 
        let newGraph = cloneDeep(graph);        
        for (let fromNode in newGraph) {
            for (let edge in newGraph[fromNode]) {
                if (!difficulties.has(newGraph[fromNode][edge].difficulty) || newGraph[fromNode][edge].status != "open") {
                    delete newGraph[fromNode][edge];
                }
            }
        }
        return newGraph;
    }


    /**
    * Find the shortest path between the startNode and endNode
    */
    _findShortestPath (graph: { [fromId: string]: { [toId: string]: Edge}}, 
                       startNode: string, 
                       endNode: string) {
        let weightsFromStart = new PriorityQueue(),
        predecessors: { [toNode: string]: [string, string]} = {}, // {toNode: [fromNodeId, EdgeId]}
        visited = new Set([startNode]);

        // establish object for recording weightsFromStart from the start node
        for (let node in graph[startNode]) {
            weightsFromStart.add(node, graph[startNode][node].weight)
        }

        // assign start as predecessor for the nodes pointed by start
        predecessors[endNode] = ["", ""];
        for (let child in graph[startNode]) {
            predecessors[child] = [startNode, graph[startNode][child].edgeId]; 
        }

        // find the nearest node ([nodeId, weight])
        let node = weightsFromStart.remove(); 

        // traverse through all associated nodes 
        while (node) {
            // If the shortest weight node is the endNode, then exit early
            if (String(node[0]) === String(endNode)) {
                break;
            }

            let weight = node[1];
            let children = graph[node[0]];
            for (let childId in children) {
                // skip nodes that are in visited list
                if (visited.has(childId)) {
                    continue;
                } else {
                    let newWeight = weight + children[childId].weight;

                    if (!weightsFromStart.hasNode(childId)){
                        weightsFromStart.add(childId, newWeight);
                        predecessors[childId] = [node[0], graph[node[0]][childId].edgeId];
                    } 
                    else if (weightsFromStart.getWeight(childId) > newWeight) {
                        weightsFromStart.decreaseValue(childId, newWeight);
                        predecessors[childId] = [node[0], graph[node[0]][childId].edgeId];
                    } 
                }
            }

            visited.add(node[0]);
            node = weightsFromStart.remove();
        }

        return predecessors;
    }

    /**
     * Given a list of nodes, return a list of shortest path between each two consecutive nodes.
     */
    async findAllShortestPath(stops: string[], 
                              difficulties: Set<number> = new Set([1,2,3])) {
        difficulties.add(0);
        
        var startNode: any = stops.shift(),
            endNode: any,
            predecessors: { [toNode: string]: [string, string]} = {},
            allPath: (Edge|Node)[][] = [];

        // Update edges status everytime before routing.
        await this.updateEdgesStatus();
    
        // Filter out closed edges and unselected difficulties
        var graph = this._checkDifficultyAndStatus(this.graph, difficulties);

        while (stops.length) {
            endNode = stops.shift();
            predecessors = this._findShortestPath(graph, startNode, endNode);

            // return error if can't find route
            if (predecessors[endNode][0] == "" && predecessors[endNode][1] == "") {
                throw new Error("Cannot find route");
            }

            // record path from start to end
            let shortestPath: (Edge|Node)[] = [this.nodes[endNode]];
            let pre = predecessors[endNode]; // [fromNodeId, EdgeId]
            while (pre) {
                shortestPath.push(this.edges[pre[1]], this.nodes[pre[0]]);
                pre = predecessors[pre[0]];
            }
            shortestPath.reverse();
            allPath.push(shortestPath);

            startNode = endNode;
        }

        return allPath;
    };

    /**
     * Check and Update the availability of the slope and lifts
     * Runs every time when invoking findAllShortestPath()
     */
    async updateEdgesStatus() {
        var responseJson: any;
        try {
            const url: string = trailStatusUrls[this.resortName];
            const response = await fetch(url);
            responseJson = await response.json();
        } catch (err) {
            let errorMessage: string = "Failed while updating edges status";
            if (err instanceof Error){
                errorMessage = err.message;
            }
            console.error(errorMessage);
            return;
        } 

        const mountainAreas = responseJson["MountainAreas"];
        for (let i in mountainAreas) {
            const mountainArea = mountainAreas[i];
            const trails = mountainArea["Trails"];
            const lifts = mountainArea["Lifts"];
            const edges = trails.concat(lifts);

            for (let j in edges) {
                const edge = edges[j];

                // var edgeId: string = edge["id"];
                var edgeName: string = edge["Name"];
                edgeName = edgeName.replace(/[()']/g, "");
                
                for (let k in this.edges) {
                    if (edgeName === this.edges[k]["edgeName"]) {
                        if (edge["StatusId"] === 0) {
                            this.edges[k].status = "open";
                        } else {
                            this.edges[k].status = "close";
                        } 
                    }
                }
            }
        }

        // TODO: some runs have different names between Openstreetmap and Mammoth website, hence they are not took into considered, needs to somehow fix it.
        // e.g. (High 5, High Five), (Easy Over, Over Easy), (Saint Anton, St, Anton)
    }

}