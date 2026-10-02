"use client";

import { UNIT_TYPES, type FloorBand } from "@/content/site";

export interface FloorPlateProps {
  band: FloorBand;
  hovered: number | null;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}

const PLATE = "M120 40 H880 V250 H940 V330 H880 V520 H120 V330 H60 V250 H120 Z";

/** Blueprint-style floor plate with colour-coded, selectable residences. */
export function FloorPlate({ band, hovered, onHover, onSelect }: FloorPlateProps) {
  return (
    <svg viewBox="0 0 1000 560" className="w-full h-auto overflow-visible" role="group" aria-label={band.title}>
      <defs>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(243,241,236,0.35)" strokeWidth="1" />
        </pattern>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="rgba(243,241,236,0.05)" />
        </pattern>
      </defs>

      <rect x="-200" y="-100" width="1400" height="760" fill="url(#grid)" />
      {/* axis lines */}
      <line x1="-200" y1="290" x2="1200" y2="290" stroke="rgba(243,241,236,0.18)" strokeDasharray="2 6" />
      <line x1="500" y1="-60" x2="500" y2="620" stroke="rgba(243,241,236,0.12)" strokeDasharray="2 6" />

      <path d={PLATE} fill="rgba(243,241,236,0.03)" stroke="rgba(243,241,236,0.7)" strokeWidth="2" />

      {/* Core: lifts + stairs */}
      <rect x="420" y="70" width="160" height="190" fill="url(#hatch)" stroke="rgba(243,241,236,0.55)" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={432 + i * 48} y={84} width={40} height={40} fill="none" stroke="rgba(243,241,236,0.6)" />
      ))}
      <text x="500" y="200" textAnchor="middle" className="fill-dark-foreground/60" style={{ font: "10px var(--font-sans)", letterSpacing: "0.2em" }}>
        CORE
      </text>

      {band.units.map((u, i) => {
        const type = UNIT_TYPES[u.unit];
        const active = hovered === i;
        return (
          <g
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`${type.name}, ${type.type}`}
            className="cursor-pointer outline-none"
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(i)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(i);
              }
            }}
          >
            <rect
              x={u.x}
              y={u.y}
              width={u.w}
              height={u.h}
              fill={type.color}
              fillOpacity={active ? 0.75 : hovered === null ? 0.45 : 0.2}
              stroke={type.color}
              strokeWidth={active ? 2.5 : 1.5}
              style={{ transition: "fill-opacity 300ms ease, stroke-width 300ms ease" }}
            />
            {/* interior partitions suggest rooms */}
            <line x1={u.x + u.w * 0.55} y1={u.y} x2={u.x + u.w * 0.55} y2={u.y + u.h * 0.6} stroke="rgba(243,241,236,0.35)" />
            <line x1={u.x} y1={u.y + u.h * 0.6} x2={u.x + u.w} y2={u.y + u.h * 0.6} stroke="rgba(243,241,236,0.35)" />
            <text
              x={u.x + u.w / 2}
              y={u.y + u.h / 2 - 4}
              textAnchor="middle"
              className="fill-dark-foreground"
              style={{ font: "italic 22px var(--font-display)" }}
            >
              {type.name.replace(" with Jacuzzi", "")}
            </text>
            <text
              x={u.x + u.w / 2}
              y={u.y + u.h / 2 + 18}
              textAnchor="middle"
              className="fill-dark-foreground/70"
              style={{ font: "9px var(--font-sans)", letterSpacing: "0.22em" }}
            >
              {type.type.toUpperCase()} · {type.total.toUpperCase()}
            </text>
          </g>
        );
      })}

      <text x="500" y="555" textAnchor="middle" className="fill-dark-foreground/50" style={{ font: "10px var(--font-sans)", letterSpacing: "0.3em" }}>
        ENTRANCE · BOULEVARD
      </text>
    </svg>
  );
}
