/**
 * Single source of truth for copy and imagery.
 * Swap image paths for real renders as they arrive — every scene reads from here.
 */

export const IMAGES = {
  aerial: "/images/hero.jpg",
  exterior: "/images/architecture_exterior.jpg",
  interior: "/images/interior_living.jpg",
  material: "/images/material_study.jpg",
} as const;

export const BRAND = {
  developer: "Raison Properties",
  project: "Raison",
  projectFull: "Raison Residence",
  tagline: "Residences",
  location: "Al Furjan · Dubai",
  email: "hello@raisonproperties.com",
  phone: "+971 4 000 0000",
};

export const INTRO = {
  eyebrow: "Why here?",
  body: "Built for ambition. Designed around stillness. A city where opportunity meets an unhurried way of living — and a residence made for both.",
};

/* ---------------------------------------------------------------- tower */

export type Room = {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "wet" | "outdoor" | "living";
};

export type UnitType = {
  id: string;
  name: string;
  type: string;
  color: string;
  internal: string;
  balcony: string;
  total: string;
  rooms: Room[];
};

export const UNIT_TYPES: Record<string, UnitType> = {
  "1bs": {
    id: "1bs",
    name: "1 BHK + Study",
    type: "Type A",
    color: "#4F7BD9",
    internal: "742 sq.ft",
    balcony: "118 sq.ft",
    total: "860 sq.ft",
    rooms: [
      { label: "Living + Dining", x: 0, y: 0, w: 60, h: 46, tone: "living" },
      { label: "Kitchen", x: 60, y: 0, w: 40, h: 26 },
      { label: "Study", x: 60, y: 26, w: 40, h: 20 },
      { label: "Bedroom", x: 0, y: 46, w: 55, h: 36, tone: "living" },
      { label: "Bath", x: 55, y: 46, w: 22, h: 20, tone: "wet" },
      { label: "Powder", x: 77, y: 46, w: 23, h: 20, tone: "wet" },
      { label: "Wardrobe", x: 55, y: 66, w: 45, h: 16 },
      { label: "Balcony", x: 0, y: 82, w: 100, h: 18, tone: "outdoor" },
    ],
  },
  "2b": {
    id: "2b",
    name: "2 BHK",
    type: "Type B",
    color: "#5FA35A",
    internal: "1,124 sq.ft",
    balcony: "164 sq.ft",
    total: "1,288 sq.ft",
    rooms: [
      { label: "Living", x: 0, y: 0, w: 58, h: 40, tone: "living" },
      { label: "Dining", x: 58, y: 0, w: 42, h: 22 },
      { label: "Kitchen", x: 58, y: 22, w: 42, h: 18 },
      { label: "Master Bedroom", x: 0, y: 40, w: 50, h: 34, tone: "living" },
      { label: "Bedroom 2", x: 50, y: 40, w: 50, h: 34, tone: "living" },
      { label: "Bath", x: 0, y: 74, w: 30, h: 12, tone: "wet" },
      { label: "Bath", x: 70, y: 74, w: 30, h: 12, tone: "wet" },
      { label: "Laundry", x: 30, y: 74, w: 40, h: 12 },
      { label: "Balcony", x: 0, y: 86, w: 100, h: 14, tone: "outdoor" },
    ],
  },
  "3b": {
    id: "3b",
    name: "3 BHK",
    type: "Type C",
    color: "#8E7FD6",
    internal: "1,610 sq.ft",
    balcony: "212 sq.ft",
    total: "1,822 sq.ft",
    rooms: [
      { label: "Living + Dining", x: 0, y: 0, w: 64, h: 36, tone: "living" },
      { label: "Kitchen", x: 64, y: 0, w: 36, h: 22 },
      { label: "Maid", x: 64, y: 22, w: 36, h: 14 },
      { label: "Master Bedroom", x: 0, y: 36, w: 40, h: 32, tone: "living" },
      { label: "Bedroom 2", x: 40, y: 36, w: 30, h: 32, tone: "living" },
      { label: "Bedroom 3", x: 70, y: 36, w: 30, h: 32, tone: "living" },
      { label: "Ensuite", x: 0, y: 68, w: 26, h: 16, tone: "wet" },
      { label: "Bath", x: 26, y: 68, w: 24, h: 16, tone: "wet" },
      { label: "Walk-in", x: 50, y: 68, w: 50, h: 16 },
      { label: "Balcony", x: 0, y: 84, w: 100, h: 16, tone: "outdoor" },
    ],
  },
  ph: {
    id: "ph",
    name: "4 BHK Penthouse with Jacuzzi",
    type: "Type P",
    color: "#D9A441",
    internal: "3,480 sq.ft",
    balcony: "960 sq.ft",
    total: "4,440 sq.ft",
    rooms: [
      { label: "Grand Living", x: 0, y: 0, w: 52, h: 34, tone: "living" },
      { label: "Dining", x: 52, y: 0, w: 26, h: 34 },
      { label: "Kitchen", x: 78, y: 0, w: 22, h: 34 },
      { label: "Master Suite", x: 0, y: 34, w: 36, h: 30, tone: "living" },
      { label: "Bedroom 2", x: 36, y: 34, w: 22, h: 30, tone: "living" },
      { label: "Bedroom 3", x: 58, y: 34, w: 21, h: 30, tone: "living" },
      { label: "Bedroom 4", x: 79, y: 34, w: 21, h: 30, tone: "living" },
      { label: "Spa Bath", x: 0, y: 64, w: 26, h: 14, tone: "wet" },
      { label: "Bath", x: 26, y: 64, w: 20, h: 14, tone: "wet" },
      { label: "Majlis", x: 46, y: 64, w: 54, h: 14 },
      { label: "Terrace + Jacuzzi", x: 0, y: 78, w: 100, h: 22, tone: "outdoor" },
    ],
  },
};

export type FloorBand = {
  id: string;
  from: number;
  to: number;
  title: string;
  /** units on the plate, positioned in the 1000×560 plate coordinate space */
  units: { unit: keyof typeof UNIT_TYPES; x: number; y: number; w: number; h: number }[];
};

export const FLOOR_COUNT = 22;

export const FLOOR_BANDS: FloorBand[] = [
  {
    id: "typical-a",
    from: 1,
    to: 11,
    title: "Typical floor plan",
    units: [
      { unit: "1bs", x: 150, y: 70, w: 250, h: 190 },
      { unit: "2b", x: 150, y: 300, w: 250, h: 190 },
      { unit: "3b", x: 410, y: 300, w: 180, h: 190 },
      { unit: "2b", x: 600, y: 300, w: 250, h: 190 },
      { unit: "1bs", x: 600, y: 70, w: 250, h: 190 },
    ],
  },
  {
    id: "typical-b",
    from: 12,
    to: 19,
    title: "Upper residences",
    units: [
      { unit: "2b", x: 150, y: 70, w: 250, h: 190 },
      { unit: "3b", x: 150, y: 300, w: 330, h: 190 },
      { unit: "3b", x: 520, y: 300, w: 330, h: 190 },
      { unit: "2b", x: 600, y: 70, w: 250, h: 190 },
    ],
  },
  {
    id: "penthouse",
    from: 20,
    to: 22,
    title: "Penthouse level",
    units: [
      { unit: "ph", x: 150, y: 70, w: 330, h: 420 },
      { unit: "3b", x: 520, y: 300, w: 330, h: 190 },
      { unit: "ph", x: 520, y: 70, w: 330, h: 210 },
    ],
  },
];

export function bandForLevel(level: number) {
  return FLOOR_BANDS.find((b) => level >= b.from && level <= b.to) ?? FLOOR_BANDS[0];
}

/* ---------------------------------------------------------------- rooms */

export const ROOMS = [
  {
    id: "living",
    name: "The Living Room",
    short: "Living",
    line: "Light that lingers.",
    body: "Floor-to-ceiling glazing, 3.65 m ceilings and a plan that opens to the terrace — a room built around the afternoon.",
    image: IMAGES.interior,
    position: "center",
  },
  {
    id: "kitchen",
    name: "The Kitchen",
    short: "Kitchen",
    line: "Made for gathering.",
    body: "Italian cabinetry, stone counters and integrated appliances. Quiet enough for mornings, generous enough for guests.",
    image: IMAGES.material,
    position: "30% center",
  },
  {
    id: "bedroom",
    name: "The Bedroom",
    short: "Bedroom",
    line: "Rooms made to return to.",
    body: "Soft acoustics, blackout drapery and a city view framed like a painting. The end of the day, designed.",
    image: IMAGES.exterior,
    position: "70% center",
  },
  {
    id: "bath",
    name: "The Bathroom",
    short: "Bathroom",
    line: "A private ritual.",
    body: "Book-matched marble, rain showers and brushed-brass fittings. Warmth underfoot, calm overhead.",
    image: IMAGES.material,
    position: "85% center",
  },
];

/* ------------------------------------------------------------ amenities */

export const AMENITIES = [
  { name: "Zen Garden", note: "Podium level", image: IMAGES.aerial, position: "20% 60%" },
  { name: "Yoga Studio", note: "Sunrise sessions", image: IMAGES.interior, position: "70% center" },
  { name: "Modern Well-Equipped Gym", note: "Open 24 hours", image: IMAGES.material, position: "center" },
  { name: "Walking Track", note: "Shaded loop", image: IMAGES.aerial, position: "80% 40%" },
  { name: "Adults Swimming Pool", note: "All-weather, podium level", image: IMAGES.exterior, position: "80% 80%" },
  { name: "Steam Room with Personal Lockers", note: "Wellness floor", image: IMAGES.material, position: "90% center" },
  { name: "Open Terrace for Socials", note: "Sunset deck", image: IMAGES.exterior, position: "30% 70%" },
  { name: "Jacuzzi", note: "Rooftop", image: IMAGES.interior, position: "20% 80%" },
  { name: "Adults Outdoor Gym", note: "Garden level", image: IMAGES.aerial, position: "50% 80%" },
  { name: "Kids Play Area", note: "Supervised zone", image: IMAGES.exterior, position: "10% center" },
  { name: "Padel Court", note: "Floodlit", image: IMAGES.aerial, position: "60% 20%" },
  { name: "Cricket Simulator", note: "Indoor", image: IMAGES.interior, position: "90% 30%" },
];

/* ------------------------------------------------------------- wellness */

export const WELLNESS = [
  { title: ["Find your", "balance."], note: "Yoga studio · Zen garden", image: IMAGES.interior, position: "30% center" },
  { title: ["Room", "to move."], note: "Gym · Walking track · Padel", image: IMAGES.material, position: "center" },
  { title: ["Time", "to exhale."], note: "Steam · Sauna · Jacuzzi", image: IMAGES.exterior, position: "70% center" },
  { title: ["Simply", "be."], note: "Pool deck · Terrace", image: IMAGES.aerial, position: "center" },
];

/* ---------------------------------------------------------------- specs */

export const SPECS = [
  { value: "3.65", unit: "m", label: "Ceiling height", note: "Floor-to-ceiling glazing in every living room." },
  { value: "Italian", unit: "", label: "Kitchens", note: "Fully fitted with integrated appliances." },
  { value: "100", unit: "%", label: "Smart home", note: "Lighting, climate and access from one app." },
  { value: "22", unit: "fl", label: "Storeys", note: "Residences, wellness and a rooftop terrace." },
];

/* ------------------------------------------------------------- location */

export const LOCATION = [
  { minutes: "05", place: "Al Furjan Metro", note: "Red line" },
  { minutes: "05", place: "Ibn Battuta Mall", note: "Retail & dining" },
  { minutes: "12", place: "Dubai Marina", note: "Beach & waterfront" },
  { minutes: "25", place: "Downtown Dubai", note: "Burj Khalifa · DIFC" },
];
