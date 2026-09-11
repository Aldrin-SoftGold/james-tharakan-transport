"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion } from "@/lib/utils";
import { scrollToY, setLenis } from "@/lib/scroll";
import {
  isInternalRouteChange,
  killAllScrollTriggers,
  refreshScrollTriggers,
  registerScrollTrigger,
} from "@/lib/gsap-runtime";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (!window.location.hash) scrollToY(0);
    } else {
      scrollToY(0);
    }

    const frame = requestAnimationFrame(() => {
      refreshScrollTriggers();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const beforeRouteChange = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || !isInternalRouteChange(anchor)) return;
      killAllScrollTriggers();
      scrollToY(0);
    };
    const beforeHistory = () => {
      killAllScrollTriggers();
      scrollToY(0);
    };

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
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.1,
        syncTouch: false,
        overscroll: true,
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
