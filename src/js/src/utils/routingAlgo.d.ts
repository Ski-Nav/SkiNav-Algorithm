import { edge } from "../models/edge";
/**
 * Given a list of nodes, return a list of shortest path between each two consecutive nodes.
 */
export declare const findAllShortestPath: (graph: {
    [fromId: string]: {
        [toId: string]: edge;
    };
}, nodes: string[], difficulties?: Set<number>) => any[][];
