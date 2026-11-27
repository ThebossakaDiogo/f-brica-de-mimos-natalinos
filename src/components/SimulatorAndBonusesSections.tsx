import { useState } from "react";
import { AlertCircle, Calculator, MessageCircle, BookOpen, TrendingUp } from "lucide-react";

import bonusTagsBoxesImg from "@/assets/bonus-tags-boxes.webp";
import bonusManualGuideImg from "@/assets/bonus-manual-guide.webp";
import coneAtelierKitImg from "@/assets/cone-atelier-kit.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  CAMPAIGN_CONFIG,
  isPlanPriceConfigured,
  type BonusItem,
} from "@/config/campaign";
import {
  SIMULATOR_LIMITS,
  SIMULATOR_PRESETS,
  calculateBreakEvenUnits,
  calculateProfitSimulation,
  formatUSD,
} from "@/lib/tracking";

function parseFieldNumber(raw: string): number {
  const normalized = raw.replace(",", ".").trim();
  if (normalized === "") return Number.NaN;
  return Number(normalized);
}

function BonusMockup({ bonus }: { bonus: BonusItem }) {
  if (bonus.mockupKind === "tags") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gold/25 bg-pine">
        <img
          src={bonusTagsBoxesImg}
          alt="Printable coordinated Christmas gift tags with gold twine"
          width={900}
          height={960}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-bottom"
        />
      </div>
    );
  }

  if (bonus.mockupKind === "boxes") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gold/25 bg-pine">
        <img
          src={bonusTagsBoxesImg}
          alt="Foldable evergreen and cranberry Christmas favor boxes"
          width={900}
          height={960}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </div>
    );
  }

  if (bonus.mockupKind === "cards") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gold/25 bg-pine">
        <img
          src={coneAtelierKitImg}
          alt="Coordinated printable holiday greeting cards"
          width={900}
          height={960}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-bottom"
        />
      </div>
    );
  }

  if (bonus.mockupKind === "manual") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gold/25 bg-pine">
        <img
          src={bonusManualGuideImg}
          alt="Illustrated cardstock printing and cone assembly manual"
          width={900}
          height={822}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-left"
        />
      </div>
    );
  }

  if (bonus.mockupKind === "guide") {
    return (
      <div className="flex aspect-[16/10] flex-col justify-between rounded-xl border border-gold/30 bg-pine p-4 text-cream">
        <div className="flex items-center justify-between text-[11px] tracking-wider text-gold uppercase">
          <span>Practical PDF Guide</span>
          <TrendingUp className="size-4" aria-hidden="true" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-cream">
            Seasonal Pricing &amp; Planning
          </p>
          <p className="mt-1 text-xs text-cream/75">
            USD supply tracker • Gift bundle pricing • Pre-order schedule
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[10px] text-cream/85">
          <span className="rounded bg-pine-surface px-2 py-1 text-center">Real Costs</span>
          <span className="rounded bg-pine-surface px-2 py-1 text-center">Gift Sets</span>
          <span className="rounded bg-pine-surface px-2 py-1 text-center">Pre-Orders</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] flex-col justify-between rounded-xl border border-gold/30 bg-pine p-4 text-cream">
      <div className="flex items-center justify-between text-[11px] tracking-wider text-gold uppercase">
        <span>Editable Scripts</span>
        <MessageCircle className="size-4" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <div className="max-w-[92%] rounded-xl rounded-tl-none bg-pine-surface px-3 py-2 text-xs leading-snug text-cream/90">
          “Hi! I&apos;m crafting handmade Christmas treat cones in small pre-order batches for
          teacher gifts and holiday tables this month.”
        </div>
        <div className="ml-auto flex max-w-[82%] items-center gap-1.5 rounded-xl rounded-tr-none bg-crimson/85 px-3 py-1.5 text-[11px] text-cream">
          <BookOpen className="size-3.5 shrink-0" aria-hidden="true" />
          SMS, WhatsApp &amp; local post scripts
        </div>
      </div>
    </div>
  );
}

export function SimulatorAndBonusesSections() {
  const [qtyText, setQtyText] = useState("40");
  const [priceText, setPriceText] = useState("8");
  const [costText, setCostText] = useState("2.5");
  const [extraCostText, setExtraCostText] = useState("15");

  const parsedQty = parseFieldNumber(qtyText);
  const parsedPrice = parseFieldNumber(priceText);
  const parsedCost = parseFieldNumber(costText);
  const parsedExtraCost = parseFieldNumber(extraCostText);

  const hasValidationWarning =
    Number.isNaN(parsedQty) ||
    Number.isNaN(parsedPrice) ||
    Number.isNaN(parsedCost) ||
    Number.isNaN(parsedExtraCost) ||
    parsedQty < SIMULATOR_LIMITS.minQuantity ||
    parsedQty > SIMULATOR_LIMITS.maxQuantity ||
    parsedPrice < SIMULATOR_LIMITS.minPrice ||
    parsedPrice > SIMULATOR_LIMITS.maxPrice ||
    parsedCost < SIMULATOR_LIMITS.minCost ||
    parsedCost > SIMULATOR_LIMITS.maxCost ||
    parsedExtraCost < SIMULATOR_LIMITS.minExtraBatchCost ||
    parsedExtraCost > SIMULATOR_LIMITS.maxExtraBatchCost;

  const result = calculateProfitSimulation({
    quantity: parsedQty,
    unitPrice: parsedPrice,
    unitCost: parsedCost,
    extraBatchCost: parsedExtraCost,
  });

  const proPlanPrice = CAMPAIGN_CONFIG.plans.pro.priceUsd;
  const proBreakEven = isPlanPriceConfigured(proPlanPrice)
    ? calculateBreakEvenUnits(proPlanPrice + result.extraBatchCost, result.unitMargin)
    : null;

  return (
    <>
      <section id="calculator" className="bg-cream py-16 editorial-paper sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
              Planning to sell handmade cones locally? Run your own USD numbers
            </h2>
            <p className="mt-3 text-base leading-relaxed text-pine/75">
              Plug in your realistic local supply costs in USD — cardstock, ink, ribbon, treats, and
              optional batch packaging — to preview your estimated margin before crafting a single
              order.
            </p>
          </div>

          <div
            data-reveal
            className="mt-10 grid gap-8 rounded-3xl border border-pine/15 bg-card p-6 editorial-shadow sm:p-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wider text-gold-deep uppercase">
                  Quick editable scenarios (illustrative only)
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIMULATOR_PRESETS.map((preset) => (
                    <Button
                      key={preset.id}
                      type="button"
                      variant="pineOutline"
                      size="sm"
                      onClick={() => {
                        setQtyText(String(preset.quantity));
                        setPriceText(String(preset.unitPrice));
                        setCostText(String(preset.unitCost));
                        setExtraCostText(String(preset.extraBatchCost));
                      }}
                      className="rounded-full text-xs"
                    >
                      {preset.label} ({preset.quantity})
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="sim-qty" className="text-sm font-semibold text-pine">
                    Number of assembled cones
                  </Label>
                  <Input
                    id="sim-qty"
                    type="number"
                    inputMode="numeric"
                    min={SIMULATOR_LIMITS.minQuantity}
                    max={SIMULATOR_LIMITS.maxQuantity}
                    value={qtyText}
                    onChange={(e) => setQtyText(e.target.value)}
                    className="h-9 w-24 text-right font-semibold"
                  />
                </div>
                <Slider
                  aria-label="Select number of assembled cones"
                  min={SIMULATOR_LIMITS.minQuantity}
                  max={250}
                  step={5}
                  value={[Math.min(250, result.quantity)]}
                  onValueChange={([v]) => {
                    if (v !== undefined) setQtyText(String(v));
                  }}
                />
                <p className="text-xs text-pine/60">
                  Allowed range: {SIMULATOR_LIMITS.minQuantity} to {SIMULATOR_LIMITS.maxQuantity}{" "}
                  cones.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="sim-price" className="text-sm font-semibold text-pine">
                    Selling price per cone (USD $)
                  </Label>
                  <Input
                    id="sim-price"
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min={SIMULATOR_LIMITS.minPrice}
                    max={SIMULATOR_LIMITS.maxPrice}
                    value={priceText}
                    onChange={(e) => setPriceText(e.target.value)}
                    className="h-9 w-24 text-right font-semibold"
                  />
                </div>
                <Slider
                  aria-label="Select selling price per cone in USD"
                  min={2}
                  max={35}
                  step={0.5}
                  value={[Math.min(35, Math.max(2, result.unitPrice))]}
                  onValueChange={([v]) => {
                    if (v !== undefined) setPriceText(String(v));
                  }}
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="sim-cost" className="text-sm font-semibold text-pine">
                    Material cost per cone — cardstock, ink, ribbon &amp; treats (USD $)
                  </Label>
                  <Input
                    id="sim-cost"
                    type="number"
                    inputMode="decimal"
                    step="0.25"
                    min={SIMULATOR_LIMITS.minCost}
                    max={SIMULATOR_LIMITS.maxCost}
                    value={costText}
                    onChange={(e) => setCostText(e.target.value)}
                    className="h-9 w-24 text-right font-semibold"
                  />
                </div>
                <Slider
                  aria-label="Select material cost per cone in USD"
                  min={0}
                  max={20}
                  step={0.25}
                  value={[Math.min(20, result.unitCost)]}
                  onValueChange={([v]) => {
                    if (v !== undefined) setCostText(String(v));
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="sim-extra" className="text-sm font-semibold text-pine">
                    Extra batch overhead — bags, tape or booth fee (USD $)
                  </Label>
                  <Input
                    id="sim-extra"
                    type="number"
                    inputMode="decimal"
                    step="1"
                    min={SIMULATOR_LIMITS.minExtraBatchCost}
                    max={SIMULATOR_LIMITS.maxExtraBatchCost}
                    value={extraCostText}
                    onChange={(e) => setExtraCostText(e.target.value)}
                    className="h-9 w-24 text-right font-semibold"
                  />
                </div>
                <p className="text-xs text-pine/60">
                  Optional fixed costs for the whole batch ($0 to $5,000 USD).
                </p>
              </div>

              {hasValidationWarning && (
                <p
                  role="status"
                  className="flex items-start gap-2 rounded-xl border border-crimson/30 bg-crimson/10 px-3.5 py-2.5 text-xs text-crimson"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>
                    Enter valid USD numbers within the allowed range; the preview panel automatically
                    clamps out-of-range values.
                  </span>
                </p>
              )}
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-gold/25 bg-pine p-6 text-cream gold-halo">
              <div>
                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                  <span className="text-xs font-semibold tracking-wider text-gold uppercase">
                    Illustrative USD Breakdown
                  </span>
                  <Calculator className="size-4 text-gold" aria-hidden="true" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-cream/70">Estimated gross sales</p>
                    <p
                      data-testid="calc-gross"
                      className="mt-1 font-display text-2xl font-semibold text-cream"
                    >
                      {formatUSD(result.grossRevenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cream/70">Total costs (materials + overhead)</p>
                    <p
                      data-testid="calc-total-cost"
                      className="mt-1 font-display text-2xl font-semibold text-cream/90"
                    >
                      {formatUSD(result.totalCost)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cream/70">Profit per cone</p>
                    <p
                      data-testid="calc-unit-margin"
                      className="mt-1 text-lg font-semibold text-gold"
                    >
                      {formatUSD(result.unitMargin)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cream/70">Estimated net margin</p>
                    <p className="mt-1 text-lg font-semibold text-gold">
                      {result.marginPercent.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-gold/30 bg-pine-surface p-4">
                  <p className="text-xs text-cream/75">
                    Estimated batch net ({result.quantity} cones)
                  </p>
                  <p
                    data-testid="calc-net"
                    className="mt-1 font-display text-3xl font-semibold text-gold"
                  >
                    {formatUSD(result.estimatedNet)}
                  </p>
                  {result.breakEvenUnits !== null && result.extraBatchCost > 0 && !result.isUnitLoss && (
                    <p className="mt-2 text-xs text-cream/80">
                      Overhead break-even: about{" "}
                      <strong className="text-gold">{result.breakEvenUnits} cones</strong> to cover{" "}
                      {formatUSD(result.extraBatchCost)} in extra batch supplies.
                      {proBreakEven !== null && (
                        <> ({proBreakEven} cones including the configured PRO plan.)</>
                      )}
                    </p>
                  )}
                  {(result.isUnitLoss || result.isNetLoss) && (
                    <p className="mt-2 text-xs text-cream/90">
                      Heads up:{" "}
                      {result.isUnitLoss
                        ? "your per-cone cost is higher than your selling price."
                        : "your total batch cost exceeds estimated gross sales at this volume."}
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-5 border-t border-gold/20 pt-4 text-xs leading-relaxed text-cream/70">
                <strong>Important disclaimer:</strong> This calculator is an illustrative planning
                tool based solely on the USD figures you enter. There is no guarantee of sales or
                income — actual results vary with local supply prices, craftsmanship, marketing,
                and community demand. Commercial sales apply only to physically assembled cones
                under the included handmade license.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="bonuses" className="bg-cream-warm py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
              Six curated bonuses included in the PRO Plan
            </h2>
            <p className="mt-3 text-base leading-relaxed text-pine/75">
              Alongside the theme-organized template library and full finishing tutorial, the PRO
              Plan includes six coordinated printable and planning resources to elevate every batch.
            </p>
          </div>

          <div data-stagger-group className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPAIGN_CONFIG.bonuses.map((bonus) => (
              <article
                key={bonus.id}
                data-stagger-item
                className="flex flex-col rounded-2xl border border-pine/15 bg-card p-5 editorial-shadow"
              >
                <BonusMockup bonus={bonus} />
                <div className="mt-4 flex items-center justify-between text-xs font-semibold tracking-wider text-gold-deep uppercase">
                  <span>Bonus {bonus.number}</span>
                  <span>{bonus.format}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-pine">
                  {bonus.title}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-crimson">{bonus.subtitle}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-pine/75">
                  {bonus.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}