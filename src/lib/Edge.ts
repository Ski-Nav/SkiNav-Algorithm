export class Edge {
    edgeType: string;
    difficulty: number;
    edgeName: string;
    edgeId: string;
    fromNodeId: string;
    toNodeId: string;
    weight: number;
    status: string;

    constructor(edgeType: string, difficulty: number, edgeName: string, edgeId: string, fromNodeId: string, toNodeId: string, weight: number) {
        this.edgeType = edgeType;
        this.difficulty = difficulty;
        this.edgeName = edgeName;
        this.edgeId = edgeId;
        this.fromNodeId = fromNodeId;
        this.toNodeId = toNodeId;
        this.weight = weight;
        this.status = "open";
    }

    getEdgeType(): string {
        return this.edgeType;
    }
    
    getDifficulty(): number {
        return this.difficulty;
    }
    
    getName(): string {
        return this.edgeName;
    }
    
    getWeight(): number {
        return this.weight;
    }
}