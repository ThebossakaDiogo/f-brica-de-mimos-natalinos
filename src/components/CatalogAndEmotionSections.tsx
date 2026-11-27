import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

import emotionalHandsImg from "@/assets/emotional-hands.webp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CATALOG_ITEMS, type CatalogItem } from "@/config/content";
import { TwinklingLightsOverlay } from "@/components/SnowfallOverlay";

export function CatalogAndEmotionSections() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem: CatalogItem | undefined =
    activeIndex !== null ? CATALOG_ITEMS[activeIndex] : undefined;

  const scrollRail = (direction: "prev" | "next") => {
    const rail = railRef.current;
    if (!rail) return;
    const distance = Math.max(280, Math.round(rail.clientWidth * 0.72));
    rail.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  };

  const navigateLightbox = (delta: number) => {
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev + delta + CATALOG_ITEMS.length) % CATALOG_ITEMS.length;
    });
  };

  return (
    <>
      <section id="catalog" className="overflow-x-clip bg-cream py-16 editorial-paper sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div
            data-reveal
            className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:items-end sm:justify-between"
          >
            <div className="min-w-0 max-w-2xl">
              <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
                A curated preview of the 500+ printable templates
              </h2>
              <p className="mt-2.5 text-base text-pine/75">
                Scroll across heritage cranberry, evergreen botanical, and Nordic ivory styles. Tap
                any cone to inspect paper weight and gifting ideas.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                type="button"
                variant="pineOutline"
                size="icon"
                aria-label="Scroll catalog left"
                onClick={() => scrollRail("prev")}
                className="rounded-full"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                variant="pineOutline"
                size="icon"
                aria-label="Scroll catalog right"
                onClick={() => scrollRail("next")}
                className="rounded-full"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div
          ref={railRef}
          className="catalog-scroll mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8"
        >
          {CATALOG_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Inspect ${item.title} in lightbox`}
              className="group w-[78vw] max-w-[300px] shrink-0 snap-start cursor-pointer text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold-deep"
            >
              <div className="relative overflow-hidden rounded-2xl border border-pine/15 bg-pine">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={900}
                  height={1350}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-pine/80 text-cream backdrop-blur-xs transition-colors group-hover:bg-crimson">
                  <Expand className="size-4" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold tracking-wider text-gold-deep uppercase">
                {item.category}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-pine">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-pine/70">{item.paperNote}</p>
            </button>
          ))}
        </div>

        <Dialog
          open={activeItem !== undefined}
          onOpenChange={(open) => {
            if (!open) setActiveIndex(null);
          }}
        >
          <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto border-gold/30 bg-pine p-0 text-cream sm:rounded-2xl">
            {activeItem && (
              <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
                <div className="bg-pine-surface">
                  <img
                    src={activeItem.image}
                    alt={activeItem.alt}
                    width={900}
                    height={1350}
                    className="aspect-[3/4] h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gold uppercase">
                      {activeItem.category}
                    </p>
                    <DialogHeader className="mt-2 text-left">
                      <DialogTitle className="font-display text-2xl font-semibold text-cream">
                        {activeItem.title}
                      </DialogTitle>
                      <DialogDescription className="pt-2 text-sm leading-relaxed text-cream/80">
                        {activeItem.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-5 space-y-2 border-t border-gold/20 pt-4 text-xs">
                      <p className="text-gold">Suggested cardstock: {activeItem.paperNote}</p>
                      <p className="text-cream/75">{activeItem.occasionNote}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-gold/20 pt-4">
                    <span className="text-xs text-cream/65">
                      {(activeIndex ?? 0) + 1} of {CATALOG_ITEMS.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="creamOutline"
                        size="icon"
                        aria-label="Previous template"
                        onClick={() => navigateLightbox(-1)}
                        className="rounded-full"
                      >
                        <ChevronLeft className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="creamOutline"
                        size="icon"
                        aria-label="Next template"
                        onClick={() => navigateLightbox(1)}
                        className="rounded-full"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      <section id="story" className="relative overflow-hidden bg-pine py-20 text-cream gold-aura sm:py-28">
        <TwinklingLightsOverlay />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div
            data-parallax="emotion"
            className="overflow-hidden rounded-3xl border border-gold/30 bg-pine-surface gold-halo"
          >
            <img
              src={emotionalHandsImg}
              alt="Hands tying a warm gold satin ribbon around a handmade Christmas paper cone in front of a glowing tree"
              width={900}
              height={1350}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <blockquote data-reveal className="space-y-6">
            <div className="h-px w-14 bg-gold" aria-hidden="true" />
            <p className="font-display text-3xl leading-[1.2] font-medium text-cream italic sm:text-5xl">
              “The best gift isn&apos;t always the most expensive one. It&apos;s the one that
              carries a piece of you.”
            </p>
            <p className="max-w-xl text-base leading-relaxed text-cream/80">
              When a friend, teacher, or neighbor receives a treat cone folded and tied by hand,
              they feel the thoughtfulness behind every crisp crease and satin bow. Whether you are
              starting a cozy kitchen-table tradition with family or crafting small-batch favors for
              your community, handmade details turn simple paper and sweets into lasting holiday
              warmth.
            </p>
          </blockquote>
        </div>
      </section>
    </>
  );
}