import { edge } from "./pkg/common/edge";
import { node } from "./pkg/common/node";

export var testGraph1 = {
    "1":{
        "2": new edge("slope", 3, "a", 8),
        "3": new edge("slope", 3, "b", 5),
        "4": new edge("slope", 3, "c", 7),
    },
    "2":{
        "5": new edge("slope", 2, "d", 4),
        "10": new edge("slope", 2, "e", 12),
    },
    "3":{
        "10": new edge("slope", 2, "f", 9),
    },
    "4":{
        "10": new edge("slope", 2, "g", 10),
        "12": new edge("slope", 2, "h", 3),
    },
    "5":{
        "6": new edge("slope", 3, "i", 3),
        "8": new edge("slope", 1, "j", 2),
    },
    "6":{
        "7": new edge("slope", 2, "k", 2),
    },
    "7":{},
    "8":{
        "7": new edge("slope", 2, "l", 2),
        "11": new edge("slope", 1, "m", 3),
    },
    "10":{
        "11": new edge("slope", 1, "n", 2),
    },
    "11":{
        "4": new edge("slope", 0, "o", 30),
        "13": new edge("slope", 1, "p", 15),
    },
    "12":{
        "11": new edge("slope", 1, "q", 8),
        "13": new edge("slope", 1, "r", 12),
    },
    "13":{
        "1": new edge("lift", 0, "s", 50)
    }
}

export var testGraph2 = {
    "start":{
        "A": new edge("slope", 3, "a", 5),
        "B": new edge("slope", 3, "b", 2),
    },
    "A":{
        "start": new edge("slope", 3, "c", 1),
        "C": new edge("slope", 3, "d", 4),
        "D": new edge("slope", 3, "e", 2),
    },
    "B":{
        "A": new edge("slope", 3, "f", 8),
        "D": new edge("slope", 3, "g", 7),
    },
    "C":{
        "D": new edge("slope", 3, "h", 6),
        "end": new edge("slope", 3, "i", 3),
    },
    "D":{
        "end": new edge("slope", 3, "j", 1),
    },
    "end":{}
}

export var testNodes: {[nodeId: string]: node} = {
    "1": new node(10, 10),
    "2": new node(10, 10),
    "3": new node(10, 10),
    "4": new node(10, 10),
    "5": new node(10, 10),
    "6": new node(10, 10),
    "7": new node(10, 10),
    "8": new node(10, 10),
    "9": new node(10, 10),
    "10": new node(10, 10),
    "11": new node(10, 10),
    "12": new node(10, 10),
    "13": new node(10, 10),
}

export var testEdges: {[fromId: string]: edge} = {
    "a": new edge("slope", 3, "a", 8),
    "b": new edge("slope", 3, "b", 8),
    "c": new edge("slope", 3, "c", 8),
    "d": new edge("slope", 3, "d", 8),
    "e": new edge("slope", 3, "e", 8),
    "f": new edge("slope", 3, "f", 8),
    "g": new edge("slope", 3, "g", 8),
    "h": new edge("slope", 3, "h", 8),
    "i": new edge("slope", 3, "i", 8),
    "j": new edge("slope", 3, "j", 8),
    "k": new edge("slope", 3, "k", 8),
    "l": new edge("slope", 3, "l", 8),
    "m": new edge("slope", 3, "m", 8),
    "n": new edge("slope", 3, "n", 8),
    "o": new edge("slope", 3, "o", 8),
    "p": new edge("slope", 3, "p", 8),
    "q": new edge("slope", 3, "q", 8),
    "r": new edge("slope", 3, "r", 8),
    "s": new edge("slope", 3, "s", 8),
}