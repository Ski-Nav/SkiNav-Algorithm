export class Edge {
    edgeType: string;
    difficulty: number;
    name: string;
    weight: number;

    constructor(edgeType: string, difficulty: number, name: string, weight: number) {
        this.edgeType = edgeType;
        this.difficulty = difficulty;
        this.name = name;
        this.weight = weight;
    }

    getEdgeType(): string {
        return this.edgeType;
    }
    
    getDifficulty(): number {
        return this.difficulty;
    }
    
    getName(): string {
        return this.name;
    }
    
    getWeight(): number {
        return this.weight;
    }
}