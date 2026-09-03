type ScrollTriggerApi = {
  killAll: (revert?: boolean) => void;
  refresh?: (safe?: boolean) => void;
};

let scrollTrigger: ScrollTriggerApi | null = null;

export function registerScrollTrigger(instance: ScrollTriggerApi) {
  scrollTrigger = instance;
}

export function killAllScrollTriggers() {
  try {
    scrollTrigger?.killAll(true);
  } catch {
    /* already torn down */
  }
}

export function refreshScrollTriggers() {
  try {
    scrollTrigger?.refresh?.(true);
  } catch {
    /* not ready */
  }
}

export function pinnedStartOffset() {
  if (typeof document === "undefined") return 84;
  const header = document.querySelector("header");
  return Math.round(header?.getBoundingClientRect().height ?? 84);
}

export function isInternalRouteChange(anchor: HTMLAnchorElement) {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return false;
  }
  if (url.origin !== window.location.origin) return false;
  return url.pathname !== window.location.pathname || url.search !== window.location.search;
}
