import { Navigation } from "./src/models/Navigation";

// Usage
const nav = new Navigation();
nav.requestGraph("mammoth").then(()=>{
    // console.log(nav.getEdges())
    const start = nav.getClosestNode(37.6336275, -119.0291459);
    const end = nav.getClosestNode(37.6418128, -119.0248050);
    console.log(nav.getNodes()[start.toString()])
    console.log(nav.getNodes()[end.toString()])
    try{
       console.log(nav.findAllShortestPath([start, end], new Set([1,2,3])))
    } catch (error) {
        let errorMessage: string = "Failed to do something exceptional";
        if (error instanceof Error){
            errorMessage = error.message;
        }
        console.error(errorMessage);
    }
})