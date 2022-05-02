const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.treeRoot = null;
	}

	root() {
		return this.treeRoot;
	}

	add(data) {
		let el = this.treeRoot;
		if (!el) {
			this.treeRoot = new Node(data);
			return;
		} else {
			const searchPlace = function (el) {
				if (data < el.data) {
					if (!el.left) {
						el.left = new Node(data);
						return;
					} else {
						return searchPlace(el.left);
					}
				} else if (data > el.data) {
					if (!el.right) {
						el.right = new Node(data);
						return;
					} else {
						return searchPlace(el.right);
					}
				}
			};
			return searchPlace(el);
		}
	}

	has(data) {
		let el = this.treeRoot;
		while (el) {
			if (data === el.data) {
				return true;
			}
			if (data > el.data) {
				el = el.right;
			} else {
				el = el.left;
			}
		}
		return false;
	}

	find(data) {
		let el = this.treeRoot;
		while (el.data !== data) {
			if (data > el.data) {
				el = el.right;
			} else {
				el = el.left;
			}
			if (!el) {
				return null;
			}
		}
		return el;
	}

	remove(data) {
		let el = this.treeRoot;
		const removeElement = function (el, data) {
			if (!el) {
				return null;
			}
			if (data === el.data) {
				if (!el.left && !el.right) {
					return null;
				}
				if (!el.right) {
					return el.left;
				}
				if (!el.left) {
					return el.right;
				}
				let newel = el.right;
				while (newel.left) {
					newel = newel.left;
				}
				el.data = newel.data;
				el.right = removeElement(el.right, newel.data);
				return el;
			} else if (data < el.data) {
				el.left = removeElement(el.left, data);
				return el;
			} else {
				el.right = removeElement(el.right, data);
				return el;
			}
		};
		el = removeElement(el, data);
	}

	min() {
		let el = this.treeRoot;
		while (el.left) {
			el = el.left;
		}
		return el.data;
	}

	max() {
		let el = this.treeRoot;
		while (el.right) {
			el = el.right;
		}
		return el.data;
	}
}

module.exports = {
	BinarySearchTree,
};
