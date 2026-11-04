import Image from "next/image";
import type { ReactNode } from "react";
import type { CoverVariant } from "@/lib/content/schemas";
import { cn } from "@/components/ui/primitives";

/**
 * Abstract, decorative cover art. These are illustrations — not screenshots
 * and not data charts — so they never imply product UI or results that don't exist.
 * Replace with a real image by setting `cover.image` in the content frontmatter.
 */

type Palette = { b1: string; b2: string; b3: string; b4: string; b5: string; ac: string; w: string };
type Tone = "blue" | "violet" | "mint" | "peach";

const palettes: Record<Tone, Palette> = {
  blue: { b1: "#F3FAFF", b2: "#E5F4FF", b3: "#CBE9FF", b4: "#A5D8FF", b5: "#65B8F3", ac: "#1D6FAE", w: "#FFFFFF" },
  violet: { b1: "#F7F5FF", b2: "#EFEBFF", b3: "#DED6FF", b4: "#C6B8FF", b5: "#9B87F5", ac: "#5B45C9", w: "#FFFFFF" },
  mint: { b1: "#F0FBF7", b2: "#DDF6EC", b3: "#BDEBD9", b4: "#8EDCBF", b5: "#43BF92", ac: "#11795A", w: "#FFFFFF" },
  peach: { b1: "#FFF7F2", b2: "#FFEDE3", b3: "#FFDAC6", b4: "#FFC0A0", b5: "#FB8F62", ac: "#C2502A", w: "#FFFFFF" },
};

const toneOf: Record<CoverVariant, Tone> = {
  ascend: "blue",
  revenue: "mint",
  rings: "violet",
  wave: "peach",
  device: "blue",
  nodes: "violet",
  gauge: "peach",
  stack: "mint",
  network: "violet",
  cake: "peach",
  agent: "blue",
  spark: "violet",
};

const toneBg: Record<Tone, string> = {
  blue: "from-blue-50 via-blue-100 to-blue-200/70",
  violet: "from-[#F7F5FF] via-[#EFEBFF] to-[#DED6FF]/80",
  mint: "from-[#F0FBF7] via-[#DDF6EC] to-[#BDEBD9]/80",
  peach: "from-[#FFF7F2] via-[#FFEDE3] to-[#FFDAC6]/80",
};

const makeArt = (C: Palette): Record<CoverVariant, ReactNode> => ({
  ascend: (
    <g>
      <rect x="120" y="150" width="56" height="70" rx="12" fill={C.b3} />
      <rect x="200" y="80" width="56" height="140" rx="12" fill={C.b5} />
      <path d="M100 190 C 160 170, 200 120, 300 60" stroke={C.ac} strokeWidth="2.5" fill="none" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="300" cy="60" r="9" fill={C.w} stroke={C.ac} strokeWidth="3" />
      <rect x="276" y="150" width="56" height="70" rx="12" fill={C.w} stroke={C.b4} strokeDasharray="4 5" />
    </g>
  ),
  revenue: (
    <g>
      <rect x="110" y="150" width="180" height="56" rx="16" fill={C.b3} />
      <rect x="125" y="112" width="150" height="56" rx="16" fill={C.b4} />
      <rect x="140" y="74" width="120" height="56" rx="16" fill={C.w} stroke={C.b5} strokeWidth="2" />
      <circle cx="170" cy="102" r="8" fill={C.b5} />
      <rect x="186" y="96" width="52" height="12" rx="6" fill={C.b3} />
      <path d="M300 120 L 320 100 L 340 108 L 360 70" stroke={C.ac} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M348 68 L 362 68 L 362 82" stroke={C.ac} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  rings: (
    <g transform="translate(200 130)">
      <circle r="88" fill="none" stroke={C.b3} strokeWidth="1.5" />
      <circle r="66" fill="none" stroke={C.b3} strokeWidth="14" />
      <circle r="66" fill="none" stroke={C.b5} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 66 * 0.9} 999`} transform="rotate(-90)" />
      <circle r="36" fill={C.w} />
      <circle r="14" fill={C.ac} />
    </g>
  ),
  wave: (
    <g>
      <path d="M40 210 C 110 200, 150 180, 210 170 S 320 160, 360 150 L 360 230 L 40 230 Z" fill={C.b3} />
      <path d="M40 200 C 110 180, 160 130, 220 110 S 320 60, 360 40 L 360 230 L 40 230 Z" fill={C.b4} opacity="0.6" />
      <path d="M40 200 C 110 180, 160 130, 220 110 S 320 60, 360 40" stroke={C.ac} strokeWidth="2.5" fill="none" />
      <circle cx="360" cy="40" r="7" fill={C.w} stroke={C.ac} strokeWidth="3" />
    </g>
  ),
  device: (
    <g>
      <rect x="150" y="30" width="100" height="200" rx="22" fill={C.w} stroke={C.b4} strokeWidth="2" />
      <rect x="185" y="40" width="30" height="6" rx="3" fill={C.b3} />
      <rect x="164" y="60" width="72" height="54" rx="12" fill={C.b3} />
      <rect x="164" y="124" width="72" height="12" rx="6" fill={C.b4} />
      <rect x="164" y="144" width="48" height="12" rx="6" fill={C.b2} />
      <rect x="164" y="176" width="72" height="34" rx="12" fill={C.b5} />
      <path d="M270 70 l 34 0 M 270 90 l 22 0" stroke={C.b4} strokeWidth="6" strokeLinecap="round" />
      <path d="M96 170 l 34 0 M 108 190 l 22 0" stroke={C.b4} strokeWidth="6" strokeLinecap="round" />
    </g>
  ),
  nodes: (
    <g>
      <path d="M140 130 H 260" stroke={C.b5} strokeWidth="2.5" strokeDasharray="6 6" />
      <rect x="70" y="90" width="80" height="80" rx="22" fill={C.w} stroke={C.b4} strokeWidth="2" />
      <rect x="92" y="112" width="36" height="36" rx="10" fill={C.b3} />
      <rect x="250" y="90" width="80" height="80" rx="22" fill={C.w} stroke={C.b4} strokeWidth="2" />
      <circle cx="290" cy="130" r="18" fill={C.b5} />
      <circle cx="200" cy="130" r="20" fill={C.ac} />
      <path d="M192 130 l 6 6 l 10 -12" stroke={C.w} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  gauge: (
    <g transform="translate(200 175)">
      <path d="M -110 0 A 110 110 0 0 1 110 0" fill="none" stroke={C.b3} strokeWidth="18" strokeLinecap="round" />
      <path d="M -110 0 A 110 110 0 0 1 98 -50" fill="none" stroke={C.b5} strokeWidth="18" strokeLinecap="round" />
      <line x1="0" y1="0" x2="76" y2="-68" stroke={C.ac} strokeWidth="5" strokeLinecap="round" />
      <circle r="12" fill={C.ac} />
      <circle r="4" fill={C.w} />
    </g>
  ),
  stack: (
    <g>
      {Array.from({ length: 11 }).map((_, i) => (
        <rect key={`a${i}`} x="90" y={40 + i * 17} width="90" height="10" rx="5" fill={C.b3} opacity={0.35 + i * 0.06} />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={`b${i}`} x="230" y={159 + i * 17} width="90" height="10" rx="5" fill={C.b5} />
      ))}
      <path d="M196 130 h 22 m -8 -8 l 8 8 l -8 8" stroke={C.ac} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  network: (
    <g>
      <path d="M110 90 L 200 140 L 290 90 M 200 140 L 200 215 M 110 90 L 290 90" stroke={C.b4} strokeWidth="2" fill="none" />
      <circle cx="110" cy="90" r="30" fill={C.w} stroke={C.b4} strokeWidth="2" />
      <circle cx="290" cy="90" r="30" fill={C.w} stroke={C.b4} strokeWidth="2" />
      <circle cx="200" cy="215" r="30" fill={C.w} stroke={C.b4} strokeWidth="2" />
      <circle cx="110" cy="90" r="12" fill={C.b5} />
      <circle cx="290" cy="90" r="12" fill={C.b3} />
      <rect x="188" y="203" width="24" height="24" rx="6" fill={C.b4} />
      <circle cx="200" cy="140" r="16" fill={C.ac} />
      {[[60, 50], [70, 140], [340, 50], [330, 150], [140, 215], [260, 215]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill={C.b3} />
      ))}
    </g>
  ),
  cake: (
    <g>
      <ellipse cx="200" cy="222" rx="120" ry="12" fill={C.b3} />
      <rect x="110" y="160" width="180" height="56" rx="18" fill={C.b4} />
      <rect x="135" y="112" width="130" height="54" rx="18" fill={C.b3} />
      <rect x="160" y="70" width="80" height="48" rx="16" fill={C.w} stroke={C.b4} strokeWidth="2" />
      <path d="M110 180 q 15 12 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0" stroke={C.w} strokeWidth="4" fill="none" />
      <rect x="196" y="40" width="8" height="30" rx="4" fill={C.b5} />
      <ellipse cx="200" cy="32" rx="6" ry="9" fill={C.ac} />
    </g>
  ),
  agent: (
    <g>
      {[0, 1, 2, 3].map((r) => (
        <g key={r} transform={`translate(110 ${52 + r * 44})`}>
          <rect width="180" height="32" rx="10" fill={C.w} stroke={C.b3} strokeWidth="1.5" />
          <rect x="10" y="9" width="14" height="14" rx="4" fill={r < 3 ? C.b5 : C.b2} stroke={r < 3 ? "none" : C.b4} />
          {r < 3 && <path d="M13 16 l 3 3 l 6 -7" stroke={C.w} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 0)" />}
          <rect x="36" y="12" width={110 - r * 14} height="8" rx="4" fill={C.b3} />
        </g>
      ))}
      <path d="M318 70 l 6 16 l 16 6 l -16 6 l -6 16 l -6 -16 l -16 -6 l 16 -6 z" fill={C.ac} />
      <path d="M86 186 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 z" fill={C.b5} />
    </g>
  ),
  spark: (
    <g>
      <circle cx="200" cy="130" r="80" fill={C.b2} />
      <path d="M200 60 l 14 52 l 52 18 l -52 18 l -14 52 l -14 -52 l -52 -18 l 52 -18 z" fill={C.b5} />
      <path d="M300 60 l 5 14 l 14 5 l -14 5 l -5 14 l -5 -14 l -14 -5 l 14 -5 z" fill={C.ac} />
      <circle cx="110" cy="200" r="8" fill={C.b4} />
    </g>
  ),
});

export function Cover({
  variant,
  image,
  alt,
  position = "center",
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  variant: CoverVariant;
  image?: string;
  alt?: string;
  position?: "left" | "center" | "right";
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const tone = toneOf[variant];
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", toneBg[tone], className)}>
      {image ? (
        <Image src={image} alt={alt ?? ""} fill quality={90} priority={priority} sizes={sizes} className={cn("object-cover", position === "left" ? "object-left" : position === "right" ? "object-right" : "object-center")} />
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-white/60 blur-3xl" />
          <svg
            aria-hidden
            viewBox="0 0 400 260"
            className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            preserveAspectRatio="xMidYMid meet"
          >
            {makeArt(palettes[tone])[variant]}
          </svg>
        </>
      )}
    </div>
  );
}
