export declare class PriorityQueue {
    private heap;
    private pos;
    constructor();
    getWeight(nodeId: string): number;
    getLeftChildIndex(parentIndex: number): number;
    getRightChildIndex(parentIndex: number): number;
    getParentIndex(childIndex: number): number;
    hasNode(nodeId: string): boolean;
    hasLeftChild(index: number): boolean;
    hasRightChild(index: number): boolean;
    hasParent(index: number): boolean;
    leftChildWeight(index: number): number;
    rightChildWeight(index: number): number;
    parentWeight(index: number): number;
    swap(indexOne: number, indexTwo: number): void;
    peek(): [string, number] | null;
    remove(): [string, number] | null;
    add(toId: string, weight: number): void;
    heapifyUp(index: number): void;
    heapifyDown(index: number): void;
    decreaseValue(id: string, newVal: number): void;
}
