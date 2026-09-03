import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  titleLine2?: string;
  lede?: string;
  dark?: boolean;
};

export function PageHero({ eyebrow, title, titleLine2, lede, dark }: Props) {
  return (
    <header
      className={cn(
        "pt-28 md:pt-32 pb-6 md:pb-8",
        dark ? "bg-ink text-white" : "bg-offwhite",
      )}
    >
      <div className="site-grid max-w-5xl">
        <p className={cn("label", dark && "text-white/45")}>{eyebrow}</p>
        <h1 className="display text-[clamp(2.55rem,6vw,5.4rem)] mt-3 leading-[1.05]">
          {title}
          {titleLine2 ? (
            <>
              <br />
              {titleLine2}
            </>
          ) : null}
        </h1>
        {lede ? (
          <p className={cn("lede mt-4", dark && "text-white/70")}>{lede}</p>
        ) : null}
      </div>
    </header>
  );
}
