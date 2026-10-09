// The hero box and the closing band share one prompt text (the design keeps it in one state value).

let value = "";
const listeners = new Set<() => void>();

export function subscribePrompt(fn: () => void) {
	listeners.add(fn);
	return () => {
		listeners.delete(fn);
	};
}
export const getPrompt = () => value;
export const getServerPrompt = () => "";
export function setPrompt(next: string) {
	value = next;
	listeners.forEach((fn) => fn());
}
