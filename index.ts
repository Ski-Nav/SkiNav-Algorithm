import { Navigation } from "./src/models/Navigation";
const util = require('util')

// Usage
async function foo() {
    const nav = new Navigation();
    await nav.requestGraph("Mammoth");
    const start = nav.getClosestNode(37.6352064, -119.0209484);
    const end = nav.getClosestNode(37.6438451, -119.0260839);
    // await nav.requestGraph("UCSD");
    // const start = nav.getClosestNode(32.8804991, -117.2393515);
    // const end = nav.getClosestNode(32.8814433, -117.2395673);
    // const start = "2";
    // const end = "4";
    // console.log(nav.getEdges())
    // console.log(nav.getNodes())
    // console.log(nav.getGraph())
    console.log(start, end)
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