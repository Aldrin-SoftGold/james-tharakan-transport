"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/utils";
import { setLenis } from "@/lib/scroll";
import { isInternalRouteChange, killAllScrollTriggers, registerScrollTrigger } from "@/lib/gsap-runtime";

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const beforeRouteChange = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || !isInternalRouteChange(anchor)) return;
      killAllScrollTriggers();
    };
    const beforeHistory = () => killAllScrollTriggers();

    document.addEventListener("click", beforeRouteChange, true);
    window.addEventListener("popstate", beforeHistory);
    return () => {
      document.removeEventListener("click", beforeRouteChange, true);
      window.removeEventListener("popstate", beforeHistory);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let destroy: (() => void) | undefined;
    let killed = false;

    const start = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (killed) return;
      gsap.registerPlugin(ScrollTrigger);
      registerScrollTrigger(ScrollTrigger);
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tickerFn = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);

      const refresh = () => {
        if (!killed) ScrollTrigger.refresh();
      };
      requestAnimationFrame(refresh);
      window.addEventListener("load", refresh);
      const lateRefresh = window.setTimeout(refresh, 480);
      void document.fonts?.ready.then(refresh);

      destroy = () => {
        window.removeEventListener("load", refresh);
        window.clearTimeout(lateRefresh);
        setLenis(null);
        killAllScrollTriggers();
        gsap.ticker.remove(tickerFn);
        lenis.destroy();
      };
    };

    void start();

    return () => {
      killed = true;
      destroy?.();
    };
  }, []);

  return <>{children}</>;
}
