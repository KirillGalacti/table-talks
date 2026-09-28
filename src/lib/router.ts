import { useEffect, useSyncExternalStore } from "react";

export type ScreenId = "settings" | "howto" | "table" | "result" | "report" | "full-report" | "history";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

window.addEventListener("popstate", notify);

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function snapshot() {
  return window.location.search;
}

export function useSearch() {
  return useSyncExternalStore(subscribe, snapshot);
}

export function currentParams() {
  return new URLSearchParams(window.location.search);
}

export function navigate(screen: ScreenId, params: Record<string, string | undefined> = {}, replace = false) {
  const search = new URLSearchParams();
  if (screen !== "settings") search.set("screen", screen);
  for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
  const url = `${window.location.pathname}${search.size ? `?${search}` : ""}`;
  if (replace) window.history.replaceState(null, "", url);
  else window.history.pushState(null, "", url);
  window.scrollTo(0, 0);
  notify();
}

export function Redirect({ to, params }: { to: ScreenId; params?: Record<string, string | undefined> }) {
  useEffect(() => navigate(to, params, true), [to, params]);
  return null;
}
