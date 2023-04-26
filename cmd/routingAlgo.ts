import { PriorityQueue } from "../pkg/common/priorityQueue";
import { testGraph1, testEdges, testNodes } from "../testFile";
import { edge } from "../pkg/common/edge";
import { node } from "../pkg/common/node";

/**
 * Removes runs that are not included in the chosen diffculties
 */
const checkDifficulty = (graph: { [fromId: string]: { [toId: string]: edge}}, 
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
const findShortestPath = (graph: { [fromId: string]: { [toId: string]: edge}}, 
                          startNode: string, 
                          endNode: string) => {
	let weightsFromStart = new PriorityQueue(),
		predecessors: { [toNode: string]: [string, string]} = {}, // {toNode: [fromNode, edgeName]}
		visited = new Set([startNode]);

	// establish object for recording weightsFromStart from the start node
	for (let node in graph[startNode]) {
		weightsFromStart.add(node, graph[startNode][node].weight)
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
const findAllShortestPath = (graph: { [fromId:string]: { [toId:string]: edge}},
                             nodes: string[], 
                             difficulties: Set<number> = new Set([0,1,2,3])) => {
	var startNode: any = nodes.shift(),
		endNode: any,
		predecessors: { [toNode: string]: [string, string]} = {},
		allPath: any[][] = [];
	
	graph = checkDifficulty(graph, difficulties);

	while (nodes.length) {
		endNode = nodes.shift();
		predecessors = findShortestPath(graph, startNode, endNode);

		// return error if can't find route
		if (!predecessors[endNode]) {
			throw new Error("cannot find route");
		}

		// record path from start to end
		let shortestPath: (edge|node)[] = [testNodes[endNode]];
		let pre = predecessors[endNode]; // [fromNode, edgeName]
		while (pre) {
			shortestPath.push(testEdges[pre[1]], testNodes[pre[0]]);
			pre = predecessors[pre[0]];
		}
		shortestPath.reverse();
		allPath.push(shortestPath);

		startNode = endNode;
	}

	return allPath;
};





// Testing 
try{
	console.log(findAllShortestPath(testGraph1, ["1", "11"], new Set([0,1,2,3])));
	// console.log(findAllShortestPath(testGraph2, ["start", "end"], ));
} catch(error){
    let errorMessage: string = "Failed to do something exceptional";
    if (error instanceof Error){
        errorMessage = error.message;
    }
	console.error(errorMessage);
}


