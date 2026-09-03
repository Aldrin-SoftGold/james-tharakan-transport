import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  titleLine2?: string;
  className?: string;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  titleLine2,
  className,
  light,
}: Props) {
  return (
    <div className={cn("max-w-4xl", className)}>
      {eyebrow ? (
        <p className={cn("label mb-5", light && "text-white/55")}>{eyebrow}</p>
      ) : null}
      <h2 className={cn("display text-[clamp(2.2rem,5.2vw,4.6rem)]", light && "text-white")}>
        {title}
        {titleLine2 ? (
          <>
            <br />
            {titleLine2}
          </>
        ) : null}
      </h2>
    </div>
  );
}
