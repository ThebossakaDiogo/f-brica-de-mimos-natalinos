import { ArrowRight, Check, Minus, ShieldCheck, Calendar, Cookie } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  CAMPAIGN_CONFIG,
  getDaysUntilChristmas,
  getPlanPriceLabel,
  hasUnsetCommercialConfig,
  isPlanPriceConfigured,
} from "@/config/campaign";
import { BENEFIT_ANCHOR_ITEMS, FAQ_ITEMS } from "@/config/content";
import { TwinklingLightsOverlay } from "@/components/SnowfallOverlay";
import type { ConsentState } from "@/lib/tracking";

interface PricingAndTrustProps {
  onSelectBasic: () => void;
  onSelectPro: () => void;
  onJumpToPlans: () => void;
  consent: ConsentState;
  onResetConsent: () => void;
}

export function PricingAndTrustSections({
  onSelectBasic,
  onSelectPro,
  onJumpToPlans,
  consent,
  onResetConsent,
}: PricingAndTrustProps) {
  const { basic, pro } = CAMPAIGN_CONFIG.plans;
  const verifiedTestimonials = CAMPAIGN_CONFIG.testimonials;
  const daysUntilChristmas = getDaysUntilChristmas();
  const showPrelaunchNotice = hasUnsetCommercialConfig();

  const basicPriceLabel = getPlanPriceLabel(basic.priceUsd, "USD price pending");
  const proPriceLabel = getPlanPriceLabel(pro.priceUsd, "USD price pending");

  return (
    <>
      {verifiedTestimonials.length > 0 && (
        <section id="reviews" className="bg-cream py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div data-reveal className="max-w-2xl">
              <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
                Verified reviews from real makers
              </h2>
            </div>
            <div data-stagger-group className="mt-10 grid gap-6 md:grid-cols-3">
              {verifiedTestimonials.map((item) => (
                <figure
                  key={item.id}
                  data-stagger-item
                  className="flex flex-col justify-between rounded-2xl border border-pine/15 bg-card p-6"
                >
                  <blockquote className="text-sm leading-relaxed text-pine/85">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-pine/10 pt-3 text-xs text-pine/70">
                    <span className="font-semibold text-pine">{item.author}</span>
                    {" • "}
                    {item.location} ({item.verifiedDate})
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="comparison" className="bg-cream py-16 editorial-paper sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
              Everything included in each tier, side by side
            </h2>
            <p className="mt-3 text-base text-pine/75">
              Compare Basic and PRO strictly by the real templates, guides, and guarantees you
              receive — never inflated crossed-out price anchors.
            </p>
          </div>

          <div
            data-reveal
            className="mt-10 overflow-hidden rounded-2xl border border-pine/15 bg-card editorial-shadow"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_84px_84px] items-center border-b border-pine/15 bg-pine px-4 py-3.5 text-xs font-semibold tracking-wider text-cream uppercase sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:px-6">
              <span>Included feature</span>
              <span className="text-center">Basic</span>
              <span className="text-center text-gold">PRO</span>
            </div>
            <div className="divide-y divide-pine/10">
              {BENEFIT_ANCHOR_ITEMS.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[minmax(0,1fr)_84px_84px] items-center gap-2 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:px-6"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-pine">{row.label}</p>
                    <p className="mt-0.5 text-xs text-pine/70">{row.detail}</p>
                  </div>
                  <div className="flex justify-center">
                    {row.basic ? (
                      <Check className="size-5 text-pine" aria-label="Included in Basic" />
                    ) : (
                      <Minus className="size-4 text-pine/30" aria-label="Not included in Basic" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Check className="size-5 text-crimson" aria-label="Included in PRO" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="relative overflow-hidden bg-pine py-20 text-cream gold-aura sm:py-28">
        <TwinklingLightsOverlay />
        <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl leading-tight font-semibold text-cream sm:text-5xl">
              Choose the workshop edition that fits your holiday plans
            </h2>
            <p className="mt-3 text-base text-cream/80">
              One-time USD purchase, instant digital PDF access after checkout confirmation, and a
              clear money-back guarantee on both tiers.
            </p>
          </div>

          <div
            data-stagger-group
            className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:gap-8"
          >
            <article
              data-stagger-item
              className="flex flex-col justify-between rounded-3xl border border-gold/25 bg-pine-surface/95 p-7 sm:p-8"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  Starter Edition
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-cream">
                  {basic.name}
                </h3>
                <div className="mt-5 flex flex-wrap items-baseline gap-2">
                  <span
                    className={
                      isPlanPriceConfigured(basic.priceUsd)
                        ? "font-display text-5xl font-semibold text-cream"
                        : "font-display text-2xl font-semibold text-gold"
                    }
                  >
                    {basicPriceLabel}
                  </span>
                  <span className="text-xs text-cream/70">
                    {isPlanPriceConfigured(basic.priceUsd)
                      ? "USD • one-time payment"
                      : "set confirmed USD in config"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gold">{basic.accessLabel}</p>

                <ul className="mt-7 space-y-3 border-t border-gold/20 pt-6 text-sm text-cream/85">
                  {basic.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-2">
                <Button
                  type="button"
                  variant="creamOutline"
                  size="xl"
                  onClick={onSelectBasic}
                  className="w-full"
                >
                  {isPlanPriceConfigured(basic.priceUsd)
                    ? `Choose Basic Plan (${basicPriceLabel})`
                    : "Choose Basic Plan"}
                </Button>
              </div>
            </article>

            <article
              data-stagger-item
              className="relative flex flex-col justify-between rounded-3xl border-2 border-gold bg-cream p-7 text-pine gold-halo sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-[0.16em] text-crimson uppercase">
                    Full Library + 6 Bonuses
                  </p>
                  <span className="rounded-full bg-pine px-3 py-1 text-[11px] font-semibold text-gold">
                    Most Complete
                  </span>
                </div>
                <h3 className="mt-2 font-display text-3xl font-semibold text-pine">
                  {pro.name}
                </h3>
                <div className="mt-5 flex flex-wrap items-baseline gap-2">
                  <span
                    className={
                      isPlanPriceConfigured(pro.priceUsd)
                        ? "font-display text-5xl font-semibold text-pine"
                        : "font-display text-2xl font-semibold text-crimson"
                    }
                  >
                    {proPriceLabel}
                  </span>
                  <span className="text-xs text-pine/65">
                    {isPlanPriceConfigured(pro.priceUsd)
                      ? "USD • one-time payment"
                      : "set confirmed USD in config"}
                  </span>
                </div>
                <p className="mt-2 text-xs font-medium text-crimson">{pro.accessLabel}</p>

                <ul className="mt-7 space-y-3 border-t border-pine/15 pt-6 text-sm text-pine/90">
                  {pro.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-2">
                <Button
                  type="button"
                  variant="crimson"
                  size="xl"
                  onClick={onSelectPro}
                  className="w-full"
                >
                  {isPlanPriceConfigured(pro.priceUsd)
                    ? `Get the PRO Plan (${proPriceLabel})`
                    : "Get the PRO Plan"}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="guarantee" className="bg-cream-warm py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div
            data-reveal
            className="grid items-center gap-6 rounded-3xl border border-pine/15 bg-card p-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-10"
          >
            <div className="flex size-16 items-center justify-center rounded-2xl bg-pine text-gold">
              <ShieldCheck className="size-8" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-pine sm:text-3xl">
                Clear {CAMPAIGN_CONFIG.guarantees.basicDays}-day guarantee on Basic &amp;{" "}
                {CAMPAIGN_CONFIG.guarantees.proDays}-day guarantee on PRO
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-pine/80">
                Download the PDFs, print a test sheet, and inspect the artwork at your own pace.{" "}
                {CAMPAIGN_CONFIG.guarantees.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div data-reveal className="text-center">
            <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-2.5 text-base text-pine/75">
              Straightforward answers about cardstock, US Letter &amp; A4 printing, digital
              delivery, handmade licensing, and guarantees.
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-10 border-t border-pine/15">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-pine/15">
                <AccordionTrigger className="py-5 text-base font-semibold text-pine hover:text-crimson hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-pine/80">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="relative overflow-hidden bg-pine py-20 text-cream gold-aura sm:py-28">
        <TwinklingLightsOverlay />
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div data-reveal className="space-y-6">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-gold uppercase">
              <Calendar className="size-4" aria-hidden="true" />
              <span>
                Christmas on {CAMPAIGN_CONFIG.campaignDate.displayLabel}
                {daysUntilChristmas !== null && daysUntilChristmas > 0
                  ? ` • ${daysUntilChristmas} days away`
                  : ""}
              </span>
            </p>
            <h2 className="font-display text-3xl leading-tight font-semibold text-cream sm:text-5xl">
              Christmas is right around the corner. What will you craft before then?
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-cream/80">
              Unlock instant access to 500+ printable templates and start turning simple cardstock
              into boutique-ready holiday keepsakes tonight.
            </p>
            <div className="pt-2">
              <Button type="button" variant="crimson" size="xl" onClick={onJumpToPlans}>
                GET MY 500+ TEMPLATES
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gold/20 bg-pine py-12 text-cream/75">
        <div className="mx-auto max-w-6xl space-y-6 px-5 text-xs leading-relaxed sm:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="font-display text-base font-semibold text-cream">
                {CAMPAIGN_CONFIG.brandName}
              </p>
              <p>
                100% digital PDF product (US Letter &amp; A4). Physical candies, ribbons, and
                decorative props are not included.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gold">Handmade Craft License</p>
              <p>{CAMPAIGN_CONFIG.license.summary}</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gold">Legal &amp; Privacy</p>
              <p className="[overflow-wrap:anywhere]">
                Seller: {CAMPAIGN_CONFIG.legal.merchantName}
                <br />
                Registration / Tax ID: {CAMPAIGN_CONFIG.legal.documentId}
                <br />
                Support: {CAMPAIGN_CONFIG.legal.supportEmail}
              </p>
              <button
                type="button"
                onClick={onResetConsent}
                className="inline-flex cursor-pointer items-center gap-1.5 text-gold underline underline-offset-4 hover:text-cream"
              >
                <Cookie className="size-3.5" aria-hidden="true" />
                Cookie &amp; Meta Pixel preferences (
                {consent === "granted"
                  ? "accepted"
                  : consent === "denied"
                    ? "declined"
                    : "not set"}
                )
              </button>
            </div>
          </div>

          {showPrelaunchNotice && (
            <div className="rounded-xl border border-gold/30 bg-pine-surface px-4 py-3 text-cream/85">
              <strong className="text-gold">Pre-launch configuration notice:</strong>{" "}
              {CAMPAIGN_CONFIG.legal.commercialNotice}
            </div>
          )}
        </div>
      </footer>
    </>
  );
}