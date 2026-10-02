"use client";

import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { IMAGES, SPECS } from "@/content/site";

/** Specification chapter with counting figures. */
export function LifeConsidered() {
  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) return;
    gsap.from("[data-life-head] > *", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
    root.querySelectorAll<HTMLElement>("[data-spec]").forEach((el) => {
      gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      const num = el.querySelector<HTMLElement>("[data-count]");
      const target = num ? parseFloat(num.dataset.count ?? "") : NaN;
      if (!num || Number.isNaN(target)) return;
      const decimals = (num.dataset.count ?? "").split(".")[1]?.length ?? 0;
      const state = { v: 0 };
      gsap.to(state, {
        v: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => {
          num.textContent = state.v.toFixed(decimals);
        },
      });
    });
    gsap.fromTo(
      "[data-life-img]",
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.out", scrollTrigger: { trigger: "[data-life-img]", start: "top 80%" } }
    );
  });

  return (
    <section ref={ref} className="relative w-full bg-background text-foreground px-5 md:px-[5vw] py-[18vh]">
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-16">
        <div data-life-head>
          <p className="text-micro text-muted-foreground mb-6">07 — Specification</p>
          <h2 className="text-serif-xl">
            Life,
            <br />
            <em>considered.</em>
          </h2>
          <div data-life-img className="mt-14 relative w-40 md:w-56 aspect-[3/5] overflow-hidden">
            <CinematicImage src={IMAGES.material} alt="Material detail" sizes="15vw" />
          </div>
          <p className="mt-6 font-display text-xl max-w-[16rem] leading-tight">The thoughtful details that make a home.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16 content-center">
          {SPECS.map((s) => {
            const numeric = !Number.isNaN(parseFloat(s.value));
            return (
              <div key={s.label} data-spec className="border-t border-line pt-6">
                <p className="text-micro text-muted-foreground">{s.label}</p>
                <p className="font-display text-6xl md:text-7xl mt-4 leading-none">
                  {numeric ? <span data-count={s.value}>{s.value}</span> : <em>{s.value}</em>}
                  {s.unit && <span className="text-2xl md:text-3xl ml-2 text-muted-foreground">{s.unit}</span>}
                </p>
                <p className="mt-4 text-sm text-muted-foreground max-w-[16rem] leading-relaxed">{s.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
