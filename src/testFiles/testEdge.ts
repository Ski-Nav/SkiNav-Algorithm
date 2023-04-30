import { Edge } from "../models/Edge"

export var testEdges: {[fromId: string]: Edge} = {
    "a": new Edge("slope", 3, "a", 8),
    "b": new Edge("slope", 3, "b", 5),
    "c": new Edge("slope", 3, "c", 7),
    "d": new Edge("slope", 2, "d", 4),
    "e": new Edge("slope", 1, "e", 12),
    "f": new Edge("slope", 2, "f", 9),
    "g": new Edge("slope", 2, "g", 10),
    "h": new Edge("slope", 2, "h", 3),
    "i": new Edge("slope", 3, "i", 3),
    "j": new Edge("slope", 1, "j", 2),
    "k": new Edge("slope", 2, "k", 2),
    "l": new Edge("slope", 2, "l", 2),
    "m": new Edge("slope", 1, "m", 3),
    "n": new Edge("slope", 1, "n", 2),
    "o": new Edge("slope", 0, "o", 30),
    "p": new Edge("slope", 1, "p", 15),
    "q": new Edge("slope", 1, "q", 8),
    "r": new Edge("slope", 1, "r", 12),
    "s": new Edge("slope", 0, "s", 50),
}