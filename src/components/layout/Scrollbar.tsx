"use client";

import { useEffect, useRef } from "react";
import { activeScroller, scrollToY } from "@/lib/scroll";

export function Scrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const idleRef = useRef<number>(0);
  const dragRef = useRef<{ active: boolean; offset: number }>({ active: false, offset: 0 });

  useEffect(() => {
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!thumb || !track) return;

    const metrics = () => {
      const menu = activeScroller();
      const view = menu ? menu.clientHeight : window.innerHeight;
      const scrollHeight = menu ? menu.scrollHeight : document.documentElement.scrollHeight;
      const scrollable = scrollHeight - view;
      const trackH = track.clientHeight;
      const thumbH = Math.max(56, scrollable <= 0 ? trackH : (view / scrollHeight) * trackH);
      return { scrollable, trackH, thumbH, view, menu };
    };

    const setIdle = () => {
      window.clearTimeout(idleRef.current);
      track.dataset.active = "true";
      idleRef.current = window.setTimeout(() => {
        if (!dragRef.current.active) track.dataset.active = "false";
      }, 1200);
    };

    const update = () => {
      const { scrollable, trackH, thumbH, menu } = metrics();
      if (scrollable <= 8) {
        track.style.visibility = "hidden";
        return;
      }
      track.style.visibility = "visible";
      const current = menu ? menu.scrollTop : window.scrollY;
      const y = (current / scrollable) * (trackH - thumbH);
      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translate3d(0, ${Math.max(0, y)}px, 0)`;
    };

    const ratioFromClientY = (clientY: number) => {
      const { trackH, thumbH, scrollable } = metrics();
      const rect = track.getBoundingClientRect();
      const usable = trackH - thumbH;
      const y = clientY - rect.top - dragRef.current.offset;
      return usable <= 0 ? 0 : Math.max(0, Math.min(1, y / usable));
    };

    const jumpTo = (clientY: number) => {
      const { scrollable, thumbH } = metrics();
      const rect = track.getBoundingClientRect();
      const center = clientY - rect.top - thumbH / 2;
      const usable = track.clientHeight - thumbH;
      const ratio = usable <= 0 ? 0 : Math.max(0, Math.min(1, center / usable));
      scrollToY(ratio * scrollable);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.active) return;
      const { scrollable } = metrics();
      scrollToY(ratioFromClientY(event.clientY) * scrollable);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      track.dataset.dragging = "false";
      thumb.releasePointerCapture(event.pointerId);
      setIdle();
    };

    const onThumbDown = (event: PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const thumbTop = thumb.getBoundingClientRect().top;
      dragRef.current = { active: true, offset: event.clientY - thumbTop };
      track.dataset.active = "true";
      track.dataset.dragging = "true";
      thumb.setPointerCapture(event.pointerId);
    };

    const onTrackDown = (event: PointerEvent) => {
      if (event.target === thumb) return;
      event.preventDefault();
      jumpTo(event.clientY);
      const thumbTop = thumb.getBoundingClientRect().top;
      dragRef.current = { active: true, offset: event.clientY - thumbTop };
      track.dataset.active = "true";
      track.dataset.dragging = "true";
      thumb.setPointerCapture(event.pointerId);
    };

    const onScroll = () => {
      update();
      setIdle();
    };

    let menuEl: HTMLElement | null = null;
    const bindMenu = () => {
      const next = activeScroller();
      if (menuEl === next) {
        update();
        return;
      }
      menuEl?.removeEventListener("scroll", onScroll);
      menuEl = next;
      menuEl?.addEventListener("scroll", onScroll, { passive: true });
      update();
    };
    const bindSoon = () => {
      bindMenu();
      requestAnimationFrame(bindMenu);
    };

    update();
    bindSoon();
    thumb.addEventListener("pointerdown", onThumbDown);
    track.addEventListener("pointerdown", onTrackDown);
    thumb.addEventListener("pointermove", onPointerMove);
    thumb.addEventListener("pointerup", onPointerUp);
    thumb.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    const menuWatch = new MutationObserver(bindSoon);
    menuWatch.observe(document.body, { attributes: true, attributeFilter: ["data-menu-open"] });
    return () => {
      thumb.removeEventListener("pointerdown", onThumbDown);
      track.removeEventListener("pointerdown", onTrackDown);
      thumb.removeEventListener("pointermove", onPointerMove);
      thumb.removeEventListener("pointerup", onPointerUp);
      thumb.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      menuEl?.removeEventListener("scroll", onScroll);
      menuWatch.disconnect();
      window.clearTimeout(idleRef.current);
    };
  }, []);

  return (
    <aside ref={trackRef} className="site-scrollbar" aria-hidden>
      <div ref={thumbRef} className="site-scrollbar-thumb" />
    </aside>
  );
}
