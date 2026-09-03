type LenisLike = {
  scrollTo: (value: number, options?: { immediate?: boolean }) => void;
};

let lenis: LenisLike | null = null;

export function setLenis(instance: LenisLike | null) {
  lenis = instance;
}

export function scrollToY(y: number) {
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const top = Math.max(0, Math.min(max, y));
  if (lenis) {
    lenis.scrollTo(top, { immediate: true });
    return;
  }
  window.scrollTo({ top, left: 0, behavior: "auto" });
}
