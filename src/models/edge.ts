export class edge {
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
}