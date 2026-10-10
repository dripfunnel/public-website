import { useEffect, type RefObject } from "react";

/** Calls onClose when Esc is pressed or the user clicks outside `ref` while `active`. */
export function useDismiss(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void) {
	useEffect(() => {
		if (!active) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		const onClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) onClose();
		};
		window.addEventListener("keydown", onKey);
		document.addEventListener("click", onClick);
		return () => {
			window.removeEventListener("keydown", onKey);
			document.removeEventListener("click", onClick);
		};
	}, [ref, active, onClose]);
}
