import { useSyncExternalStore } from "react";
import { subscribe, getSnapshot, getServerSnapshot } from "./scrollDepthStore";

/**
 * Returns a value from 0 (top of page) to 1 (bottom of page), updated
 * on a single shared scroll listener via requestAnimationFrame.
 */
export function useScrollDepth() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
