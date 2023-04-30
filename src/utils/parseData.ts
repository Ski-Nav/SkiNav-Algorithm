import fs from 'fs';
import { Node } from '../models/Node';
import { Edge } from '../models/Edge';

/**
 * Parse graph json file into graph, nodes, edges variables.
 */
export function parseData(graphName: string): [{[fromId: string]: {[toId: string]: Edge}}, {[id: string]: Node}, {[name: string]: Edge}]{
    let fileName = __dirname.concat('/../data/json/', graphName, '_graph.json');
    const file = fs.readFileSync(fileName, 'utf-8');
    const graphJson = JSON.parse(file);

    let graph: {[fromId: string]: {[toId: string]: Edge}} = {};
    let nodes: {[id: string]: Node} = {};
    let edges: {[name: string]: Edge} = {};
    
    Object.entries(graphJson["vertices"]).forEach(([_, v]) => {
        let vertex = v as any;
        let vertexId: string = vertex["id"].toString();

        nodes[vertexId] = new Node(Number(vertex["latitude"]), Number(vertex["longitude"]));
        
        Object.entries(vertex["edges"]).forEach(([_, e]) => {
            let edge = e as any;

            edges[edge["name"]] = new Edge(edge["edgeType"], edge["difficulty"], edge["name"], edge["weight"]);   
            
            if (!graph[vertexId]) {
                graph[vertexId] = {};
            }
            graph[vertexId][edge["to"].toString()] = edges[edge["name"]];

        })
    })

    return [graph, nodes, edges];
}

