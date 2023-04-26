"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routingAlgo_1 = require("./src/utils/routingAlgo");
const testGraph_1 = require("./src/testFiles/testGraph");
// Testing 
try {
    console.log((0, routingAlgo_1.findAllShortestPath)(testGraph_1.testGraph1, ["1", "12"], new Set([0, 1, 2, 3])));
}
catch (error) {
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.error(errorMessage);
}
