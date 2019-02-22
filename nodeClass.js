class Node{
	constructor(value){
		this.value = value;
		this.adjacents = [];
	}

	addAdjacent(node){
		this.adjacents.push(node);
	}

	removeAdjacent(node){
		let nodeIndex = this.adjacents.indexOf(node);
		if(nodeIndex > -1){
			this.adjacents.splice(nodeIndex, 1);
		}
	}

	isAdjacent(node){
		return this.adjacents.indexOf(node) > -1;
	}

	getAdjacents(){
		return this.adjacents;
	}
}

module.exports = {
	Node
};