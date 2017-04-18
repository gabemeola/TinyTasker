// Convert Object Values to an Array
export function toArray(elements: object) {
	return Object.keys(elements).map((c) => elements[c])
}