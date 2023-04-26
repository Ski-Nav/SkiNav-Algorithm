"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEdges = exports.testNodes = exports.testGraph2 = exports.testGraph1 = void 0;
const edge_1 = require("./pkg/common/edge");
const node_1 = require("./pkg/common/node");
exports.testGraph1 = {
    "1": {
        "2": new edge_1.edge("slope", 3, "a", 8),
        "3": new edge_1.edge("slope", 3, "b", 5),
        "4": new edge_1.edge("slope", 3, "c", 7),
    },
    "2": {
        "5": new edge_1.edge("slope", 2, "d", 4),
        "10": new edge_1.edge("slope", 2, "e", 12),
    },
    "3": {
        "10": new edge_1.edge("slope", 2, "f", 9),
    },
    "4": {
        "10": new edge_1.edge("slope", 2, "g", 10),
        "12": new edge_1.edge("slope", 2, "h", 3),
    },
    "5": {
        "6": new edge_1.edge("slope", 3, "i", 3),
        "8": new edge_1.edge("slope", 1, "j", 2),
    },
    "6": {
        "7": new edge_1.edge("slope", 2, "k", 2),
    },
    "7": {},
    "8": {
        "7": new edge_1.edge("slope", 2, "l", 2),
        "11": new edge_1.edge("slope", 1, "m", 3),
    },
    "10": {
        "11": new edge_1.edge("slope", 1, "n", 2),
    },
    "11": {
        "4": new edge_1.edge("slope", 0, "o", 30),
        "13": new edge_1.edge("slope", 1, "p", 15),
    },
    "12": {
        "11": new edge_1.edge("slope", 1, "q", 8),
        "13": new edge_1.edge("slope", 1, "r", 12),
    },
    "13": {
        "1": new edge_1.edge("lift", 0, "s", 50)
    }
};
exports.testGraph2 = {
    "start": {
        "A": new edge_1.edge("slope", 3, "a", 5),
        "B": new edge_1.edge("slope", 3, "b", 2),
    },
    "A": {
        "start": new edge_1.edge("slope", 3, "c", 1),
        "C": new edge_1.edge("slope", 3, "d", 4),
        "D": new edge_1.edge("slope", 3, "e", 2),
    },
    "B": {
        "A": new edge_1.edge("slope", 3, "f", 8),
        "D": new edge_1.edge("slope", 3, "g", 7),
    },
    "C": {
        "D": new edge_1.edge("slope", 3, "h", 6),
        "end": new edge_1.edge("slope", 3, "i", 3),
    },
    "D": {
        "end": new edge_1.edge("slope", 3, "j", 1),
    },
    "end": {}
};
exports.testNodes = {
    "1": new node_1.node(10, 10),
    "2": new node_1.node(10, 10),
    "3": new node_1.node(10, 10),
    "4": new node_1.node(10, 10),
    "5": new node_1.node(10, 10),
    "6": new node_1.node(10, 10),
    "7": new node_1.node(10, 10),
    "8": new node_1.node(10, 10),
    "9": new node_1.node(10, 10),
    "10": new node_1.node(10, 10),
    "11": new node_1.node(10, 10),
    "12": new node_1.node(10, 10),
    "13": new node_1.node(10, 10),
};
exports.testEdges = {
    "a": new edge_1.edge("slope", 3, "a", 8),
    "b": new edge_1.edge("slope", 3, "b", 8),
    "c": new edge_1.edge("slope", 3, "c", 8),
    "d": new edge_1.edge("slope", 3, "d", 8),
    "e": new edge_1.edge("slope", 3, "e", 8),
    "f": new edge_1.edge("slope", 3, "f", 8),
    "g": new edge_1.edge("slope", 3, "g", 8),
    "h": new edge_1.edge("slope", 3, "h", 8),
    "i": new edge_1.edge("slope", 3, "i", 8),
    "j": new edge_1.edge("slope", 3, "j", 8),
    "k": new edge_1.edge("slope", 3, "k", 8),
    "l": new edge_1.edge("slope", 3, "l", 8),
    "m": new edge_1.edge("slope", 3, "m", 8),
    "n": new edge_1.edge("slope", 3, "n", 8),
    "o": new edge_1.edge("slope", 3, "o", 8),
    "p": new edge_1.edge("slope", 3, "p", 8),
    "q": new edge_1.edge("slope", 3, "q", 8),
    "r": new edge_1.edge("slope", 3, "r", 8),
    "s": new edge_1.edge("slope", 3, "s", 8),
};
