type Props = {
  className?: string;
  variant?: "hero" | "section";
};

export function RoadLine({ className, variant = "hero" }: Props) {
  const isHero = variant === "hero";

  return (
    <svg
      className={className}
      viewBox="0 0 1200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        className="road-path"
        d="M40 180 C 220 170, 340 40, 560 70 C 780 100, 860 190, 1160 90"
        stroke={isHero ? "#3355A6" : "#3355A6"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        className="road-marks-path"
        d="M40 180 C 220 170, 340 40, 560 70 C 780 100, 860 190, 1160 90"
        stroke="#A77928"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="10 16"
        opacity="0.9"
      />
    </svg>
  );
}
