export class Node {
    nodeId: string;
    latitude: number;
    longitude: number;
    
    constructor(nodeId: string, latitude: number, longitude: number){
        this.nodeId = nodeId;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getLatitude(): number {
        return this.latitude;
    }

    getLongitude(): number {
        return this.longitude;
    }
}