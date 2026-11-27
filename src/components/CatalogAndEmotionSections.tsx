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
      <section id="catalogo" className="overflow-x-clip bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div
            data-reveal
            className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:items-end sm:justify-between"
          >
            <div className="min-w-0 max-w-2xl">
              <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
                Uma amostra dos +500 moldes da coleção
              </h2>
              <p className="mt-2.5 text-base text-pine/75">
                Deslize para explorar estilos clássicos, botânicos e escandinavos. Toque em
                qualquer cone para ver em detalhe.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                type="button"
                variant="pineOutline"
                size="icon"
                aria-label="Rolar catálogo para a esquerda"
                onClick={() => scrollRail("prev")}
                className="rounded-full"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                variant="pineOutline"
                size="icon"
                aria-label="Rolar catálogo para a direita"
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
              aria-label={`Ampliar ${item.title} no catálogo`}
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
                    <p className="mt-5 border-t border-gold/20 pt-4 text-xs text-gold">
                      Sugestão de acabamento: {activeItem.paperNote}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-gold/20 pt-4">
                    <span className="text-xs text-cream/65">
                      {(activeIndex ?? 0) + 1} de {CATALOG_ITEMS.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="creamOutline"
                        size="icon"
                        aria-label="Modelo anterior"
                        onClick={() => navigateLightbox(-1)}
                        className="rounded-full"
                      >
                        <ChevronLeft className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="creamOutline"
                        size="icon"
                        aria-label="Próximo modelo"
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

      <section className="relative overflow-hidden bg-pine py-20 text-cream sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div
            data-parallax="emotion"
            className="overflow-hidden rounded-3xl border border-gold/25 bg-pine-surface editorial-shadow"
          >
            <img
              src={emotionalHandsImg}
              alt="Mãos amarrando uma fita dourada em um cone natalino de papel feito à mão diante de uma árvore iluminada"
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
              “O melhor presente nem sempre é o mais caro. É aquele que carrega um pedacinho de
              você.”
            </p>
            <p className="max-w-xl text-base leading-relaxed text-cream/80">
              Quando alguém recebe um cone montado pelas suas mãos, sente o tempo, o carinho e o
              cuidado em cada dobra. Um gesto simples que transforma papel e doces em memória de
              Natal.
            </p>
          </blockquote>
        </div>
      </section>
    </>
  );
}