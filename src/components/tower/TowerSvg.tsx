"use client";

import { memo } from "react";
import { FLOOR_COUNT } from "@/content/site";

export const TOWER = {
  width: 600,
  height: 1000,
  ground: 1000,
  podiumTop: 860,
  top: 90,
  left: 215,
  right: 385,
};

export const FLOOR_HEIGHT = (TOWER.podiumTop - TOWER.top) / FLOOR_COUNT;

/** y-coordinate (viewBox units) of the top edge of a level, 1-indexed. */
export function floorY(level: number) {
  return TOWER.podiumTop - level * FLOOR_HEIGHT;
}

/* Staggered balcony slabs give the tower its stacked, shifting silhouette. */
function slabOffset(level: number) {
  const pattern = [0, 14, 26, 14, 0, -14, -26, -14];
  return pattern[level % pattern.length];
}

function Palm({ x, scale = 1, flip = false }: { x: number; scale?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${TOWER.ground}) scale(${flip ? -scale : scale} ${scale})`} fill="#05080d">
      <path d="M-2 0 C -1 -40, 4 -80, 2 -120 L 6 -120 C 8 -80, 3 -40, 3 0 Z" />
      <path d="M4 -120 C -20 -132, -44 -128, -58 -112 C -36 -122, -18 -122, 4 -116 Z" />
      <path d="M4 -120 C 26 -134, 50 -130, 62 -112 C 42 -124, 22 -122, 4 -116 Z" />
      <path d="M4 -122 C -8 -146, -30 -156, -44 -152 C -24 -146, -10 -136, 4 -118 Z" />
      <path d="M4 -122 C 18 -148, 40 -156, 52 -150 C 32 -144, 18 -134, 4 -118 Z" />
      <path d="M4 -120 C 0 -100, -16 -84, -30 -80 C -16 -92, -6 -104, 4 -118 Z" />
      <path d="M4 -120 C 10 -100, 24 -86, 38 -82 C 26 -94, 14 -106, 4 -118 Z" />
    </g>
  );
}

export interface TowerSvgProps {
  activeLevel: number | null;
  onHover: (level: number | null) => void;
  onSelect: (level: number) => void;
}

export const TowerSvg = memo(function TowerSvg({ activeLevel, onHover, onSelect }: TowerSvgProps) {
  const levels = Array.from({ length: FLOOR_COUNT }, (_, i) => i + 1);
  const towerW = TOWER.right - TOWER.left;

  return (
    <svg
      viewBox={`0 0 ${TOWER.width} ${TOWER.height}`}
      className="h-full w-auto overflow-visible select-none"
      role="img"
      aria-label="Residence tower — select a level"
    >
      <defs>
        <linearGradient id="glass" x1="0" x2="1">
          <stop offset="0" stopColor="#1a2233" />
          <stop offset="0.45" stopColor="#2c3a52" />
          <stop offset="1" stopColor="#141b28" />
        </linearGradient>
        <linearGradient id="slab" x1="0" x2="1">
          <stop offset="0" stopColor="#c9c3b6" />
          <stop offset="1" stopColor="#8d877b" />
        </linearGradient>
        <linearGradient id="lobby" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd59a" />
          <stop offset="1" stopColor="#c27b35" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#ffd9a3" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd9a3" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Crown */}
      <rect x={TOWER.left + 20} y={TOWER.top - 30} width={towerW - 40} height={30} fill="#1b2232" />
      <rect x={TOWER.left + 10} y={TOWER.top - 6} width={towerW - 20} height={6} fill="url(#slab)" />

      {/* Floors */}
      {levels.map((level) => {
        const y = floorY(level);
        const off = slabOffset(level);
        const active = activeLevel === level;
        // Lit windows are deterministic so SSR and client match.
        const lit = (level * 7) % 5;
        return (
          <g
            key={level}
            data-level={level}
            className="cursor-pointer"
            onMouseEnter={() => onHover(level)}
            onFocus={() => onHover(level)}
            onMouseLeave={() => onHover(null)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(level)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(level);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Level ${level}`}
          >
            <rect x={TOWER.left} y={y} width={towerW} height={FLOOR_HEIGHT} fill="url(#glass)" />
            {Array.from({ length: 6 }).map((_, w) => (
              <rect
                key={w}
                x={TOWER.left + 6 + w * (towerW / 6)}
                y={y + 6}
                width={towerW / 6 - 6}
                height={FLOOR_HEIGHT - 10}
                fill={w === lit ? "#e9b878" : "#24314a"}
                opacity={w === lit ? 0.75 : 0.55}
              />
            ))}
            {/* Balcony slab + glass rail */}
            <rect x={TOWER.left - 16 + off} y={y + FLOOR_HEIGHT - 4} width={towerW + 32} height={4} fill="url(#slab)" />
            <rect
              x={TOWER.left - 16 + off}
              y={y + FLOOR_HEIGHT - 12}
              width={towerW + 32}
              height={8}
              fill="#9fb3c8"
              opacity={0.12}
            />
            {/* Hover highlight */}
            <rect
              x={TOWER.left - 20}
              y={y}
              width={towerW + 40}
              height={FLOOR_HEIGHT}
              fill="#ffffff"
              opacity={active ? 0.32 : 0}
              style={{ transition: "opacity 300ms ease" }}
            />
            {/* Generous invisible hit area */}
            <rect x={TOWER.left - 40} y={y} width={towerW + 80} height={FLOOR_HEIGHT} fill="transparent" />
          </g>
        );
      })}

      {/* Podium with vertical fins */}
      <rect x={40} y={TOWER.podiumTop} width={520} height={TOWER.ground - TOWER.podiumTop} fill="#151a22" />
      <rect x={30} y={TOWER.podiumTop - 6} width={540} height={8} fill="url(#slab)" />
      {Array.from({ length: 64 }).map((_, i) => (
        <rect key={i} x={44 + i * 8} y={TOWER.podiumTop + 4} width={3} height={TOWER.ground - TOWER.podiumTop - 30} fill="#cfc8ba" opacity={0.55} />
      ))}
      <ellipse cx={300} cy={TOWER.ground - 40} rx={180} ry={70} fill="url(#glow)" />
      <rect x={250} y={TOWER.ground - 90} width={100} height={64} fill="url(#lobby)" opacity={0.9} />
      <rect x={236} y={TOWER.ground - 96} width={128} height={6} fill="#e8e1d2" />
      <rect x={0} y={TOWER.ground - 26} width={600} height={26} fill="#07090d" />

      <Palm x={40} scale={1.1} />
      <Palm x={120} scale={0.85} flip />
      <Palm x={480} scale={0.9} />
      <Palm x={565} scale={1.15} flip />
    </svg>
  );
});
