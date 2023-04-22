import { PriorityQueue } from "./priorityQueue.js";
import { test1, test2 } from "./graph.js";

/**
 * Removes runs that are not included in the chosen diffculties
 * @param {Object.<string, edge>} graph 
 * @param {Set} difficulty 
 * @returns {Object.<string, edge>}
 */
const checkDifficulty = (graph, difficulty) => {
	for (let fromNode in graph) {
		for (let edge in graph[fromNode]) {
			if (!difficulty.has(graph[fromNode][edge].difficulty)) {
				delete graph[fromNode][edge];
			}
		}
	}
	return graph;
}


/**
 * Find the shortest path between the startNode and endNode
 * @param {Object.<string, edge>} graph 
 * @param {String} startNode 
 * @param {String} endNode 
 * @returns {String[]}
 */
const findShortestPath = (graph, startNode, endNode) => {
	let weightsFromStart = new PriorityQueue(),
		predecessors = {}, // {toNode: [fromNode, edgeName]}
		visited = new Set([startNode]);

	// establish object for recording weightsFromStart from the start node
	for (let node in graph[startNode]) {
		weightsFromStart.add(node, graph[startNode][node].weight)
	}

	// track paths
	predecessors[endNode] = null;
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
 * Given a list of nodes, return a list of shortest path between each node.
 * @param {Object.<string, edge>} graph 
 * @param {String[]} nodes 
 * @param {Set} difficulty 
 * @returns {String[][]}
 */
const findAllShortestPath = (graph, nodes, difficulty=new Set([0,1,2,3])) => {
	var startNode = nodes.shift(),
		endNode,
		predecessors,
		allPath = [];
	
	graph = checkDifficulty(graph, difficulty);

	while (nodes.length) {
		endNode = nodes.shift();
		predecessors = findShortestPath(graph, startNode, endNode);

		// return error if can't find route
		if (!predecessors[endNode]) {
			throw new Error("cannot find route");
		}

		// record path from start to end
		let shortestPath = [endNode];
		let pre = predecessors[endNode]; // [edgeName, fromNode]
		while (pre) {
			shortestPath.push(pre[1], pre[0]);
			pre = predecessors[pre[0]];
		}
		shortestPath.reverse();
		allPath.push(shortestPath);

		startNode = endNode;
	}

	return allPath;
};


// try{
// 	console.log(findAllShortestPath(test1, ["1", "11", "12", "10", "13", "7"], new Set([0,1,2,3])));
// 	console.log(findAllShortestPath(test2, ["start", "end"], ));
// } catch(error){
// 	console.error(error.message);
// }


