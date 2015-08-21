module Trees {

	export interface SortedSet<T> {
		isEmpty: boolean
		contains(el: T): boolean
		insert(el: T): SortedSet<T>
		remove(el: T): SortedSet<T>

		smallest(): T
		largest(): T
	}
	
	export function newSet() {
		return new EmptyTreeSet()
	}

	class EmptyTreeSet<T> implements SortedSet<T> {
		isEmpty = true

		contains = (el: T) => false

		insert(el: T) {
			return new NonEmptyTreeSet(el, this, this)
		}

		remove(el: T) {
			return this;
		}

		smallest() {
			throw "No such element exception"
			return null;
		}

		largest() {
			throw "No such element exception"
			return null;
		}
	}

	class NonEmptyTreeSet<T> implements SortedSet<T> {

		constructor(public value: T, public left: SortedSet<T>, public right: SortedSet<T>) {

		}

		contains(el: T) {
			if (this.value === el) {
				return true
			} else if (this.value > el) {
				return this.right.contains(el)
			} else {
				return this.left.contains(el)
			}
		}

		insert(el: T) {
			if (this.value == el) {
				return this;
			} else if (this.value > el) {
				return new NonEmptyTreeSet(this.value, this.left, this.right.insert(el))
			} else {
				return new NonEmptyTreeSet(this.value, this.left.insert(el), this.right)
			}
		}

		/* For some reason this does not compile, but the code below does
		remove(el: T) {
			if (this.value == el) {
				if (this.left.isEmpty) {
					return this.right
				} else if (this.right.isEmpty) {
					return this.left
				} else {
					var newHead = this.left.largest();
					var newLeft = this.left.remove(newHead)
					return new NonEmptyTreeSet(newHead, newLeft, this.right)
				}
			} else if (this.value > el) {
				return new NonEmptyTreeSet(this.value, this.left, this.right.remove(el))
			} else {
				return new NonEmptyTreeSet(this.value, this.left.remove(el), this.right)
			}
		}*/

		remove(el: T) {
			var rv: SortedSet<T>
			if (this.value == el) {
				if (this.left.isEmpty) {
					rv = this.right
				} else if (this.right.isEmpty) {
					rv = this.left
				} else {
					var newHead = this.left.largest();
					var newLeft = this.left.remove(newHead)
					rv = new NonEmptyTreeSet(newHead, newLeft, this.right)
				}
			} else if (this.value > el) {
				rv = new NonEmptyTreeSet(this.value, this.left, this.right.remove(el))
			} else {
				rv = new NonEmptyTreeSet(this.value, this.left.remove(el), this.right)
			}
			return rv
		}

		smallest() {
			if (this.left.isEmpty) {
				return this.value
			} else {
				return this.left.smallest()
			}
		}

		largest() {
			if (this.right.isEmpty) {
				return this.value
			} else {
				return this.right.smallest()
			}
		}

		isEmpty = false
	}

}

