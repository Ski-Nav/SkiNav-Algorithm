import { Navigation } from "./src/models/Navigation";
const util = require('util')

// Usage
async function foo() {
    const nav = new Navigation();
    await nav.requestGraph("Mammoth");
    await nav.updateEdgesStatus();
    const start = nav.getClosestNode(37.6436286, -119.0150186);
    const end = nav.getClosestNode(37.6441982, -119.0060669);
    console.log("Start node: ", nav.getNodes()[start.toString()])
    console.log("End node: ",nav.getNodes()[end.toString()])
    try{
        let path = await nav.findAllShortestPath([start, end], new Set([1,2,3]))
        console.log(util.inspect(path, {showHidden: false, depth: null, colors: true}))
    } catch (error) {
        let errorMessage: string = "Failed to do something exceptional";
        if (error instanceof Error){
            errorMessage = error.message;
        }
        console.error(errorMessage);
    }

}

foo();