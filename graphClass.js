const {Node} = require('./nodeClass');

class Graph {
	
	constructor(edgeDirection = Graph.DIRECTED){
		this.nodes = new Map();
		this.edgeDirection = edgeDirection;
	}

	addVertex(value){
		if(this.nodes.has(value)){
			return this.nodes.get(value);
		} else{
			const vertex = new Node(value);
			this.nodes.set(value, vertex);
			return vertex;
		}
	}

	removeVertex(value){
		const delNode = this.nodes.get(value);
		if(delNode){
			for(const curNode of this.nodes.values()){
				curNode.removeAdjacent(delNode);
			}
		}
		return this.nodes.delete(value);
	}

	removeEdge(source, destination){
		const sourceNode = this.nodes.get(source);
		const destinationNode = this.nodes.get(destination);

		if(sourceNode && destinationNode){
			sourceNode.removeAdjacent(destinationNode);

			if(this.edgeDirection === Graph.UNDIRECTED){
				destinationNode.removeAdjacent(sourceNode);
			}

			return [sourceNode, destinationNode];
		}
	}

	addEdge(source, destination){
		const sourceNode = this.addVertex(source);
		const destinationNode = this.addVertex(destination);

		if(sourceNode && destinationNode){
			sourceNode.addAdjacent(destinationNode);

			if(this.edgeDirection === Graph.UNDIRECTED){
				destinationNode.addAdjacent(sourceNode);
			}

			return [sourceNode, destinationNode];
		}
	}
}

Graph.UNDIRECTED = Symbol('undirected graph');
Graph.DIRECTED = Symbol('directed graph');

module.exports = {
	Graph
};