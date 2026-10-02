"use client";

import type { UnitType } from "@/content/site";

const W = 600;
const H = 440;
const PAD = 30;

const FILL = {
  living: "#EDE6DA",
  wet: "#DCE4E8",
  outdoor: "#E3E8DA",
  default: "#F4F1EA",
} as const;

/** Architectural unit plan drawn from room data (percent-based layout). */
export function UnitPlan({ unit }: { unit: UnitType }) {
  const sx = (W - PAD * 2) / 100;
  const sy = (H - PAD * 2) / 100;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${unit.name} floor plan`}>
      <rect width={W} height={H} fill="#FBFAF7" />
      {unit.rooms.map((r, i) => {
        const x = PAD + r.x * sx;
        const y = PAD + r.y * sy;
        const w = r.w * sx;
        const h = r.h * sy;
        const outdoor = r.tone === "outdoor";
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill={FILL[r.tone ?? "default"]}
              stroke="#1c1c1c"
              strokeWidth={outdoor ? 1 : 5}
              strokeDasharray={outdoor ? "6 4" : undefined}
            />
            {/* door swing */}
            {!outdoor && w > 60 && (
              <path
                d={`M ${x + 14} ${y + h} a 22 22 0 0 1 22 -22 v 22 z`}
                fill="#FBFAF7"
                stroke="#1c1c1c"
                strokeWidth={0.75}
              />
            )}
            {outdoor &&
              Array.from({ length: Math.floor(w / 12) }).map((_, k) => (
                <line key={k} x1={x + k * 12} y1={y} x2={x + k * 12} y2={y + h} stroke="#1c1c1c" strokeOpacity={0.08} />
              ))}
            <text
              x={x + w / 2}
              y={y + h / 2 + 4}
              textAnchor="middle"
              fill="#1c1c1c"
              style={{ font: `${w < 70 ? 8 : 10}px var(--font-sans)`, letterSpacing: "0.16em" }}
            >
              {r.label.toUpperCase()}
            </text>
          </g>
        );
      })}
      {/* north arrow */}
      <g transform={`translate(${W - 22} 20)`}>
        <path d="M0 -10 L6 8 L0 4 L-6 8 Z" fill="#1c1c1c" />
        <text y="20" textAnchor="middle" style={{ font: "8px var(--font-sans)" }}>
          N
        </text>
      </g>
    </svg>
  );
}
