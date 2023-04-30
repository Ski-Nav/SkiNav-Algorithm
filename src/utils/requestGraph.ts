import fs from 'fs';

export async function fetchGraph(url: string) {
    const response = await fetch(url);
    const jsonData = JSON.stringify(await response.json());
    let urlSplit = url.split("/");
    let name = urlSplit[urlSplit.length-1];
    let fileName = __dirname.concat('/../data/json/', name, '_graph.json');
    fs.writeFileSync(fileName, jsonData);
}



fetchGraph("http://ec2-18-222-140-238.us-east-2.compute.amazonaws.com:3000/api/v1/maps/UCSD");