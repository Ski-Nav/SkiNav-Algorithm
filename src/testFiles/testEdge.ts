import { edge } from "../models/edge";

export var testEdges: {[fromId: string]: edge} = {
    "a": new edge("slope", 3, "a", 8),
    "b": new edge("slope", 3, "b", 5),
    "c": new edge("slope", 3, "c", 7),
    "d": new edge("slope", 2, "d", 4),
    "e": new edge("slope", 1, "e", 12),
    "f": new edge("slope", 2, "f", 9),
    "g": new edge("slope", 2, "g", 10),
    "h": new edge("slope", 2, "h", 3),
    "i": new edge("slope", 3, "i", 3),
    "j": new edge("slope", 1, "j", 2),
    "k": new edge("slope", 2, "k", 2),
    "l": new edge("slope", 2, "l", 2),
    "m": new edge("slope", 1, "m", 3),
    "n": new edge("slope", 1, "n", 2),
    "o": new edge("slope", 0, "o", 30),
    "p": new edge("slope", 1, "p", 15),
    "q": new edge("slope", 1, "q", 8),
    "r": new edge("slope", 1, "r", 12),
    "s": new edge("slope", 0, "s", 50),
}