"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const priorityQueue_1 = require("../pkg/common/priorityQueue");
const testFile_1 = require("../testFile");
/**
 * Removes runs that are not included in the chosen diffculties
 */
const checkDifficulty = (graph, difficulties) => {
    for (let fromNode in graph) {
        for (let edge in graph[fromNode]) {
            if (!difficulties.has(graph[fromNode][edge].difficulty)) {
                delete graph[fromNode][edge];
            }
        }
    }
    return graph;
};
/**
 * Find the shortest path between the startNode and endNode
 */
const findShortestPath = (graph, startNode, endNode) => {
    let weightsFromStart = new priorityQueue_1.PriorityQueue(), predecessors = {}, // {toNode: [fromNode, edgeName]}
    visited = new Set([startNode]);
    // establish object for recording weightsFromStart from the start node
    for (let node in graph[startNode]) {
        weightsFromStart.add(node, graph[startNode][node].weight);
    }
    // track paths
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
            }
            else {
                let newWeight = weight + children[childId].weight;
                if (!weightsFromStart.hasNode(childId)) {
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
};
/**
 * Given a list of nodes, return a list of shortest path between each two consecutive nodes.
 */
const findAllShortestPath = (graph, nodes, difficulties = new Set([0, 1, 2, 3])) => {
    var startNode = nodes.shift(), endNode, predecessors = {}, allPath = [];
    graph = checkDifficulty(graph, difficulties);
    while (nodes.length) {
        endNode = nodes.shift();
        predecessors = findShortestPath(graph, startNode, endNode);
        // return error if can't find route
        if (!predecessors[endNode]) {
            throw new Error("cannot find route");
        }
        // record path from start to end
        let shortestPath = [testFile_1.testNodes[endNode]];
        let pre = predecessors[endNode]; // [fromNode, edgeName]
        while (pre) {
            shortestPath.push(testFile_1.testEdges[pre[1]], testFile_1.testNodes[pre[0]]);
            pre = predecessors[pre[0]];
        }
        shortestPath.reverse();
        allPath.push(shortestPath);
        startNode = endNode;
    }
    return allPath;
};
// Testing 
try {
    console.log(findAllShortestPath(testFile_1.testGraph1, ["1", "11"], new Set([0, 1, 2, 3])));
    // console.log(findAllShortestPath(testGraph2, ["start", "end"], ));
}
catch (error) {
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.error(errorMessage);
}
