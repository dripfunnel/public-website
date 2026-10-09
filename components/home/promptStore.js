'use client';

// The "Describe your shop" text is shared by the box at the top of the page and the box at the bottom,
// and by the example buttons. This small store keeps them in step (same behaviour as the original, where both
// boxes were bound to one value).

import { useSyncExternalStore } from 'react';

let value = '';
const listeners = new Set();

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setPrompt(next) {
  value = next;
  listeners.forEach((fn) => fn());
}

export function usePrompt() {
  return useSyncExternalStore(subscribe, () => value, () => '');
}

// Remember the text for the store when the visitor presses "Start free" (browser storage can be blocked).
export function savePrompt() {
  try {
    localStorage.setItem('df-site-prompt', value);
  } catch (e) {}
}
