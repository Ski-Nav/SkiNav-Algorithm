import fs from 'fs';

/**
 * request graph via api, then store it in "../data/json/"
 */
export async function requestGraph(resortName: string) {
    const url = "http://ec2-18-222-140-238.us-east-2.compute.amazonaws.com:3000/api/v1/maps/".concat(resortName);
    const response = await fetch(url);
    const jsonData = JSON.stringify(await response.json());
    let fileName = __dirname.concat('/../data/json/', resortName, '_graph.json');
    fs.writeFileSync(fileName, jsonData);
}

requestGraph('UCSD');