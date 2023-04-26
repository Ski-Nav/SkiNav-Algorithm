import { edge } from "../models/edge"

export var testGraph1 = {
    "1":{
        "2": new edge("slope", 3, "a", 8),
        "3": new edge("slope", 3, "b", 5),
        "4": new edge("slope", 3, "c", 7),
    },
    "2":{
        "5": new edge("slope", 2, "d", 4),
        "9": new edge("slope", 2, "e", 12),
    },
    "3":{
        "9": new edge("slope", 2, "f", 9),
    },
    "4":{
        "9": new edge("slope", 2, "g", 10),
        "11": new edge("slope", 2, "h", 3),
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
        "10": new edge("slope", 1, "m", 3),
    },
    "9":{
        "10": new edge("slope", 1, "n", 2),
    },
    "10":{
        "4": new edge("slope", 0, "o", 30),
        "12": new edge("slope", 1, "p", 15),
    },
    "11":{
        "10": new edge("slope", 1, "q", 8),
        "12": new edge("slope", 1, "r", 12),
    },
    "12":{
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