import { useSyncExternalStore } from "react";
import { INTRO_DONE_EVENT } from "./intro";

const subscribe = (cb: () => void) => {
  window.addEventListener(INTRO_DONE_EVENT, cb);
  return () => window.removeEventListener(INTRO_DONE_EVENT, cb);
};

const getSnapshot = () => "introSeen" in document.documentElement.dataset;

/** True once the splash intro has finished (or was already seen this session). */
export function useIntroDone() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
