// One scroll listener for the entire page. Every component that needs the
// current "how deep are we" value subscribes here instead of adding its
// own window scroll listener.

type Listener = () => void;

let depth = 0;
const listeners = new Set<Listener>();
let rafId: number | null = null;
let started = false;

function computeDepth() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  depth = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
}

function onScrollOrResize() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    computeDepth();
    listeners.forEach((l) => l());
    rafId = null;
  });
}

function start() {
  if (started) return;
  started = true;
  computeDepth();
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
}

export function subscribe(listener: Listener) {
  start();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return depth;
}

export function getServerSnapshot() {
  return 0;
}
