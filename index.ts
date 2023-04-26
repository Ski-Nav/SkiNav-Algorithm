import { findAllShortestPath } from "./src/utils/routingAlgo";
import { testGraph1 } from "./src/testFiles/testGraph";


// Testing 
try{
	console.log(findAllShortestPath(testGraph1, ["1", "11"], new Set([0,1,2,3])));
	// console.log(findAllShortestPath(testGraph2, ["start", "end"], ));
} catch(error){
    let errorMessage: string = "Failed to do something exceptional";
    if (error instanceof Error){
        errorMessage = error.message;
    }
	console.error(errorMessage);
}
