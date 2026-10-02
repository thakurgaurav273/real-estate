"use client";

import { useState } from "react";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/hooks/useScene";
import { BRAND } from "@/content/site";

export function ContactScene() {
  const [sent, setSent] = useState(false);

  const ref = useScene<HTMLElement>((root, reduced) => {
    if (reduced) return;
    gsap.from("[data-contact] > *", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 70%" },
    });
  });

  return (
    <section id="contact" ref={ref} className="relative w-full bg-forest text-dark-foreground border-t border-dark-foreground/10">
      <div data-contact className="min-h-[90vh] flex flex-col items-center justify-center text-center px-5 py-[14vh]">
        <p className="text-micro text-dark-foreground/50 mb-6">09 — Enquire</p>
        <h2 className="text-serif-xl">
          Let&apos;s talk
          <br />
          <em>about {BRAND.project}.</em>
        </h2>
        <p className="mt-6 max-w-sm text-sm text-dark-foreground/70">
          Private viewings, floor plans and payment plans — share your email and our team will be in touch.
        </p>

        {sent ? (
          <p className="mt-12 font-display italic text-2xl">Thank you — we&apos;ll be in touch shortly.</p>
        ) : (
          <form
            className="mt-12 flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-lg"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label htmlFor="contact-email" className="sr-only">
              Email address
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 rounded-full bg-dark-foreground text-foreground px-6 py-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-dark-foreground/40"
            />
            <button
              type="submit"
              className="text-micro rounded-full border border-dark-foreground/50 px-8 py-4 hover:bg-dark-foreground hover:text-forest transition-colors cursor-pointer"
            >
              Contact us →
            </button>
          </form>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-2 sm:gap-8 text-micro text-dark-foreground/60">
          <a href={`mailto:${BRAND.email}`} className="hover:text-dark-foreground transition-colors">
            {BRAND.email}
          </a>
          <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-dark-foreground transition-colors">
            {BRAND.phone}
          </a>
        </div>
      </div>

      <footer className="px-5 md:px-[3vw] py-6 border-t border-dark-foreground/10 flex flex-col md:flex-row justify-between gap-3 text-micro text-dark-foreground/50">
        <span>{BRAND.projectFull} · {BRAND.location}</span>
        <span>© {new Date().getFullYear()} {BRAND.developer}</span>
        <span>Renders are indicative only</span>
      </footer>
    </section>
  );
}
