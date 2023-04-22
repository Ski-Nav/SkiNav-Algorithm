
export class PriorityQueue {
	constructor() {
		this.heap = []; // [[toID, weight]]
		this.pos = {}; // {toID: pos}
	}

	// Helper Methods
	getWeight(nodeId) {
		return this.heap[this.pos[nodeId]][1];
	}

	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}

	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}

	getParentIndex(childIndex) {
		return Math.floor((childIndex - 1) / 2);
	}

	hasNode(nodeId) {
		return nodeId in this.pos;
	}

	hasLeftChild(index) {
		return this.getLeftChildIndex(index) < this.heap.length;
	}

	hasRightChild(index) {
		return this.getRightChildIndex(index) < this.heap.length;
	}

	hasParent(index) {
		return this.getParentIndex(index) >= 0;
	}

	leftChildWeight(index) {
		return this.heap[this.getLeftChildIndex(index)][1];
	}

	rightChildWeight(index) {
		return this.heap[this.getRightChildIndex(index)][1];
	}

	parentWeight(index) {
		return this.heap[this.getParentIndex(index)][1];
	}

	swap(indexOne, indexTwo) {
		// swap pos
		let temp = this.pos[this.heap[indexOne][0]];
		this.pos[this.heap[indexOne][0]] = this.pos[this.heap[indexTwo][0]];
		this.pos[this.heap[indexTwo][0]] = temp;

		// swap heap
		temp = this.heap[indexOne];
		this.heap[indexOne] = this.heap[indexTwo];
		this.heap[indexTwo] = temp;
	}

	peek() {
		if (this.heap.length === 0) {
			return null;
		}
		return this.heap[0];
	}
	
	// Removing an element will remove the
	// top element with highest priority then
	// heapifyDown will be called
	remove() {
		if (this.heap.length === 0) {
			return null;
		}
		const item = this.heap[0];
		delete this.pos[this.heap[0][0]];
		this.heap[0] = this.heap[this.heap.length - 1];
		this.heap.pop();
		if (this.heap.length != 0){
			this.pos[this.heap[0][0]] = 0;
		}
		this.heapifyDown();
		return item;
	}

	add(toId, weight) {
		this.heap.push([toId, weight]);
		this.pos[toId] = this.heap.length - 1;
		this.heapifyUp(this.heap.length - 1);
	}

	heapifyUp(index) {
		while (this.hasParent(index) && this.parentWeight(index) > this.heap[index][1]) {
			this.swap(this.getParentIndex(index), index);
			index = this.getParentIndex(index);
		}
	}

	heapifyDown() {
		let index = 0;
		while (this.hasLeftChild(index)) {
			let smallerChildIndex = this.getLeftChildIndex(index);
			if (this.hasRightChild(index) && this.rightChildWeight(index) < this.leftChildWeight(index)) {
				smallerChildIndex = this.getRightChildIndex(index);
			}
			if (this.heap[index][1] < this.heap[smallerChildIndex][1]) {
				break;
			} else {
				this.swap(index, smallerChildIndex);
			}
			index = smallerChildIndex;
		}
	}

	decreaseValue(id, newVal) {
		const index = this.pos[id];
		this.heap[index][1] = newVal;
		this.heapifyUp(index);
	}
}