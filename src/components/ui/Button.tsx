"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: Props) {
  const styles = {
    primary:
      "bg-royal text-white hover:bg-royal-deep border border-royal",
    secondary:
      "bg-transparent text-white border border-white/70 hover:border-white hover:bg-white/10",
    ghost:
      "bg-transparent text-ink border border-ink/20 hover:border-royal hover:text-royal",
  }[variant];

  const classNames = cn(
    "group inline-flex items-center gap-3 px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.16em] uppercase rounded-[4px]",
    styles,
    className,
  );

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
      {external ? (
        <a href={href} className={classNames}>
          {children}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
            →
          </span>
        </a>
      ) : (
        <Link href={href} className={classNames}>
          {children}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>
            →
          </span>
        </Link>
      )}
    </motion.div>
  );
}
