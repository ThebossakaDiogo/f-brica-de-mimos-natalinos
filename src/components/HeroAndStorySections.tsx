import { useState } from "react";
import {
  ArrowRight,
  Scissors,
  Printer,
  Sparkles,
  Gift,
  MoveHorizontal,
  Store,
} from "lucide-react";

import heroConesImg from "@/assets/hero-cones.webp";
import beforeSheetImg from "@/assets/before-sheet.webp";
import afterConeImg from "@/assets/after-cone.webp";
import { Button } from "@/components/ui/button";
import {
  BENEFITS,
  FOUR_STEPS,
  PRINT_CREATE_SELL_ROADMAP,
  USE_CASES,
} from "@/config/content";
import {
  CAMPAIGN_CONFIG,
  formatUsd,
  isPlanPriceConfigured,
} from "@/config/campaign";
import { SnowfallOverlay, TwinklingLightsOverlay } from "@/components/SnowfallOverlay";

interface HeroAndStoryProps {
  onJumpToPlans: () => void;
}

const STEP_ICONS = [Printer, Scissors, Gift, Sparkles] as const;

export function HeroAndStorySections({ onJumpToPlans }: HeroAndStoryProps) {
  const [revealPercent, setRevealPercent] = useState(52);
  const basicPriceUsd = CAMPAIGN_CONFIG.plans.basic.priceUsd;
  const heroPriceCopy = isPlanPriceConfigured(basicPriceUsd)
    ? `Starting at ${formatUsd(basicPriceUsd)} USD`
    : "One-time USD purchase (Basic & PRO)";

  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-pine text-cream hero-vignette"
      >
        <SnowfallOverlay />
        <TwinklingLightsOverlay />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pt-5 pb-3 sm:px-8 sm:pt-7">
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-tight text-cream sm:text-xl"
          >
            {CAMPAIGN_CONFIG.brandName}
          </a>
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 text-sm text-cream/80 md:flex"
          >
            <a href="#before-after" className="transition-colors hover:text-gold">
              Before &amp; After
            </a>
            <a href="#steps" className="transition-colors hover:text-gold">
              Roadmap
            </a>
            <a href="#catalog" className="transition-colors hover:text-gold">
              Catalog
            </a>
            <a href="#calculator" className="transition-colors hover:text-gold">
              USD Calculator
            </a>
            <a href="#plans" className="font-medium text-gold transition-colors hover:text-cream">
              See Plans
            </a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pt-6 pb-16 sm:px-8 sm:pt-10 sm:pb-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              <span className="h-px w-6 bg-gold/70" aria-hidden="true" />
              {CAMPAIGN_CONFIG.editionLabel} • 500+ Printable Templates
            </p>

            <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-cream sm:text-5xl lg:text-[3.55rem]">
              Before you spend a fortune on Christmas favors, see what you can craft from a single
              sheet of paper.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              Turn crisp cardstock and favorite holiday treats into boutique-worthy paper cones with
              over 500 printable PDF templates. Craft meaningful gifts around your kitchen table —
              or assemble finished seasonal sets to sell locally where the handmade license permits.
            </p>

            <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:gap-5">
              <Button
                type="button"
                variant="crimson"
                size="xl"
                onClick={onJumpToPlans}
                className="w-full sm:w-auto"
              >
                GET MY 500+ TEMPLATES
                <ArrowRight className="size-4" />
              </Button>
              <div className="text-sm text-cream/80">
                <span className="font-semibold text-gold">{heroPriceCopy}</span>
                <span className="mx-2 text-gold/50">•</span>
                <span>US Letter &amp; A4 PDFs</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gold/10 blur-2xl"
            />
            <div
              data-parallax="hero"
              className="relative overflow-hidden rounded-3xl border border-gold/35 bg-pine-surface gold-halo"
            >
              <img
                src={heroConesImg}
                alt="Handmade evergreen, cranberry, and ivory Christmas paper treat cones filled with chocolate truffles and festive sweets"
                width={1024}
                height={1536}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-pine/85 via-pine/25 to-transparent" />
              <p className="absolute right-5 bottom-4 left-5 text-xs tracking-wide text-cream/90">
                Printed on home cardstock, hand-cut with scissors, and finished with satin ribbon &amp; treats.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px w-full gold-rule" aria-hidden="true" />
      </section>

      <section id="benefits" className="bg-cream py-16 editorial-paper sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
              Memorable holiday craftsmanship without stretching your December budget
            </h2>
            <p className="mt-3 text-base leading-relaxed text-pine/75">
              Every template is drafted for clean cuts, crisp creases, and structured sides — so
              anyone with a printer, scissors, and craft glue can produce gift-shop presentation at
              home.
            </p>
          </div>

          <div
            data-stagger-group
            className="mt-12 grid gap-8 border-t border-pine/15 pt-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {BENEFITS.map((item) => (
              <article key={item.number} data-stagger-item className="space-y-3">
                <span className="font-display text-2xl font-medium text-gold-deep">
                  {item.number}
                </span>
                <h3 className="font-display text-xl leading-snug font-semibold text-pine">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-pine/75">{item.description}</p>
              </article>
            ))}
          </div>

          <div data-reveal className="mt-14 border-t border-pine/15 pt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="font-display text-2xl font-semibold text-pine">
                Practical ways makers gift and sell their finished cones
              </h3>
              <p className="text-xs font-medium tracking-wider text-crimson uppercase">
                Personal gifting &amp; handmade local sales
              </p>
            </div>
            <div
              data-stagger-group
              className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            >
              {USE_CASES.map((useCase) => (
                <div
                  key={useCase.label}
                  data-stagger-item
                  className="rounded-2xl border border-pine/12 bg-card p-4"
                >
                  <p className="font-display text-base font-semibold text-pine">{useCase.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-pine/75">{useCase.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="before-after" className="bg-cream-warm py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
            <div data-reveal className="space-y-5">
              <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-5xl">
                Looks boutique-bought. Made by your own hands.
              </h2>
              <p className="text-base leading-relaxed text-pine/80">
                It all begins as a single flat sheet of printed cardstock with exact trim and score
                guides. Minutes later, that flat sheet becomes a structured holiday keepsake tied
                with satin ribbon and brimming with treats.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-pine/15 pt-5 text-sm">
                <div>
                  <p className="font-semibold text-crimson">Before</p>
                  <p className="mt-1 text-pine/75">
                    1 US Letter or A4 sheet printed with your chosen template and fold lines.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-pine">After</p>
                  <p className="mt-1 text-pine/75">
                    A sturdy, gift-shop paper cone filled with candies and finished with ribbon.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  type="button"
                  variant={revealPercent < 40 ? "crimson" : "pineOutline"}
                  size="sm"
                  onClick={() => setRevealPercent(15)}
                >
                  See flat sheet
                </Button>
                <Button
                  type="button"
                  variant={revealPercent > 60 ? "crimson" : "pineOutline"}
                  size="sm"
                  onClick={() => setRevealPercent(85)}
                >
                  See finished cone
                </Button>
              </div>
            </div>

            <div data-reveal className="space-y-3">
              <div className="relative overflow-hidden rounded-3xl border border-pine/15 bg-pine editorial-shadow">
                <div className="relative aspect-[4/5] w-full select-none">
                  <img
                    src={beforeSheetImg}
                    alt="Before: flat printed Christmas cone paper template sheet beside scissors and glue"
                    width={900}
                    height={1350}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - revealPercent}% 0 0)` }}
                  >
                    <img
                      src={afterConeImg}
                      alt="After: assembled Christmas paper treat cone tied with gold ribbon and filled with truffles and candy canes"
                      width={900}
                      height={1350}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-0.5 bg-gold"
                    style={{ left: `${revealPercent}%` }}
                  >
                    <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-pine text-cream shadow-lg">
                      <MoveHorizontal className="size-4" />
                    </span>
                  </div>

                  <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-pine/85 px-3 py-1 text-xs font-medium text-cream backdrop-blur-xs">
                    After • Assembled
                  </span>
                  <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-pine backdrop-blur-xs">
                    Before • Flat Sheet
                  </span>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={revealPercent}
                    onChange={(event) => setRevealPercent(Number(event.target.value))}
                    aria-label="Compare before and after: drag to reveal the assembled cone"
                    className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                  />
                </div>
              </div>
              <p className="text-center text-xs text-pine/65">
                Drag across the image to compare the flat printed sheet with the finished cone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="steps" className="relative overflow-hidden bg-pine py-16 text-cream gold-aura sm:py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-cream sm:text-4xl">
              Four effortless steps from flat paper to finished keepsake
            </h2>
            <p className="mt-3 text-base text-cream/75">
              No design software or specialty machines required — just follow the natural craft
              rhythm.
            </p>
          </div>

          <ol
            data-stagger-group
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {FOUR_STEPS.map((item, idx) => {
              const Icon = STEP_ICONS[idx] ?? Sparkles;
              return (
                <li
                  key={item.step}
                  data-stagger-item
                  className="flex flex-col justify-between rounded-2xl border border-gold/25 bg-pine-surface/90 p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-medium text-gold">
                        {item.step}
                      </span>
                      <Icon className="size-5 text-gold/80" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-cream/75">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div
            data-reveal
            className="mt-14 rounded-3xl border border-gold/30 bg-pine-surface/80 p-6 sm:p-8"
          >
            <div className="flex flex-col gap-3 border-b border-gold/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  <Store className="size-3.5" aria-hidden="true" />
                  Practical Print → Create → Sell Roadmap
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-cream sm:text-3xl">
                  Want to earn seasonal extra income with handmade cones?
                </h3>
              </div>
              <p className="max-w-xs text-xs leading-relaxed text-cream/70">
                License covers physically assembled crafts you make yourself. Earnings are never
                guaranteed and depend on your local demand, pricing, and effort.
              </p>
            </div>

            <div data-stagger-group className="mt-6 grid gap-6 md:grid-cols-3">
              {PRINT_CREATE_SELL_ROADMAP.map((phase) => (
                <div key={phase.stage} data-stagger-item className="space-y-2">
                  <p className="text-xs font-semibold tracking-wider text-gold uppercase">
                    {phase.stage}
                  </p>
                  <h4 className="font-display text-lg font-semibold text-cream">{phase.title}</h4>
                  <p className="text-sm leading-relaxed text-cream/75">{phase.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 h-px w-full gold-rule sm:mt-24" aria-hidden="true" />
      </section>
    </>
  );
}