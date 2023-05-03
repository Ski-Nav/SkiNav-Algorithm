import { findAllShortestPath } from "./src/utils/routingAlgo";
import { Navigation } from "./src/models/Navigation";

try {
    const nav = new Navigation();
    nav.requestGraph("UCSD").then(()=>{
        const start = nav.getClosestNode(32.88122718312019, -117.23757547573618);
        const end = nav.getClosestNode(32.879347457165174, -117.23725798289574);
        console.log(start, end);
        console.log(nav.findAllShortestPath([start, end], new Set([0,1])));
        console.log(nav.findAllShortestPath([start, end], new Set([0,1,2])));
        console.log(nav.getGraph());
    });
} catch (error) {
    let errorMessage: string = "Failed to do something exceptional";
    if (error instanceof Error){
        errorMessage = error.message;
    }
	console.error(errorMessage);
}


// Testing 
// try{
// 	console.log(findAllShortestPath(testGraph1, ["1", "12"], new Set([0,1,2,3])));
// } catch(error){
//     let errorMessage: string = "Failed to do something exceptional";
//     if (error instanceof Error){
//         errorMessage = error.message;
//     }
// 	console.error(errorMessage);
// }
