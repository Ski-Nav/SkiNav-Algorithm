import { Edge } from "../models/Edge"
import { Node } from "../models/Node";
import { PriorityQueue } from "../models/priorityQueue";
import { parseData } from "./parseData";

/**
 * Removes runs that are not included in the chosen diffculties
 */
const checkDifficulty = (graph: { [fromId: string]: { [toId: string]: Edge}}, 
                         difficulties: Set<number>) => {
	for (let fromNode in graph) {
		for (let edge in graph[fromNode]) {
			if (!difficulties.has(graph[fromNode][edge].difficulty)) {
				delete graph[fromNode][edge];
			}
		}
	}
	return graph;
}


/**
 * Find the shortest path between the startNode and endNode
 */
const findShortestPath = (graph: { [fromId: string]: { [toId: string]: Edge}}, 
                          startNode: string, 
                          endNode: string) => {
	let weightsFromStart = new PriorityQueue(),
		predecessors: { [toNode: string]: [string, string]} = {}, // {toNode: [fromNode, EdgeName]}
		visited = new Set([startNode]);

	// establish object for recording weightsFromStart from the start node
	for (let node in graph[startNode]) {
		weightsFromStart.add(node, graph[startNode][node].weight)
	}

	// assign start as predecessor for the nodes pointed by start
	predecessors[endNode] = ["", ""];
	for (let child in graph[startNode]) {
		predecessors[child] = [startNode, graph[startNode][child].name]; 
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
					predecessors[childId] = [node[0], graph[node[0]][childId].name];
				} 
				else if (weightsFromStart.getWeight(childId) > newWeight) {
					weightsFromStart.decreaseValue(childId, newWeight);
					predecessors[childId] = [node[0], graph[node[0]][childId].name];
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
export const findAllShortestPath = (resortName: string,
							stops: string[], 
							difficulties: Set<number> = new Set([0,1,2,3])) => {
	var startNode: any = stops.shift(),
		endNode: any,
		predecessors: { [toNode: string]: [string, string]} = {},
		allPath: any[][] = [],
		graph: {[fromId:string]: {[toId:string]: Edge}},
		nodes: {[nodeId: string]: Node},
		edges: {[edgeName: string]: Edge},
	
	[graph, nodes, edges] = parseData(resortName);

	graph = checkDifficulty(graph, difficulties);

	while (stops.length) {
		endNode = stops.shift();
		predecessors = findShortestPath(graph, startNode, endNode);

		// return error if can't find route
		if (!predecessors[endNode]) {
			throw new Error("cannot find route");
		}

		// record path from start to end
		let shortestPath: (Edge|Node)[] = [nodes[endNode]];
		let pre = predecessors[endNode]; // [fromNode, EdgeName]
		while (pre) {
			shortestPath.push(edges[pre[1]], nodes[pre[0]]);
			pre = predecessors[pre[0]];
		}
		shortestPath.reverse();
		allPath.push(shortestPath);

		startNode = endNode;
	}

	return allPath;
};







