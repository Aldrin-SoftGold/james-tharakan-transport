type LenisLike = {
  scrollTo: (
    value: number | string | HTMLElement,
    options?: {
      immediate?: boolean;
      offset?: number;
      lerp?: number;
    },
  ) => void;
  stop?: () => void;
  start?: () => void;
};

let lenis: LenisLike | null = null;

export function setLenis(instance: LenisLike | null) {
  lenis = instance;
}

export function pauseLenis() {
  lenis?.stop?.();
}

export function resumeLenis() {
  lenis?.start?.();
}

export function activeScroller() {
  if (typeof document === "undefined") return null;
  if (document.body.dataset.menuOpen === "true") {
    return document.getElementById("mobile-menu-scroll");
  }
  return null;
}

export function scrollToY(y: number) {
  const menu = activeScroller();
  if (menu) {
    const max = Math.max(0, menu.scrollHeight - menu.clientHeight);
    menu.scrollTop = Math.max(0, Math.min(max, y));
    return;
  }
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const top = Math.max(0, Math.min(max, y));
  if (lenis) {
    lenis.scrollTo(top, { immediate: true });
    return;
  }
  window.scrollTo({ top, left: 0, behavior: "auto" });
}

export function scrollToElement(id: string, offset = -88) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, lerp: 0.08 });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
