import { ArrowRight, Check, ExternalLink, Info, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CAMPAIGN_CONFIG,
  formatUsd,
  getPlanPriceLabel,
  getUpgradePriceDifferenceUsd,
  getUpgradeSavingsVsProUsd,
  isPlanPriceConfigured,
  type PlanConfig,
} from "@/config/campaign";
import type { ConsentState, UtmParams } from "@/lib/tracking";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAcceptUpgrade: () => void;
  onDeclineAndContinueBasic: () => void;
}

export function BasicUpgradeModal({
  open,
  onOpenChange,
  onAcceptUpgrade,
  onDeclineAndContinueBasic,
}: UpgradeModalProps) {
  const upgrade = CAMPAIGN_CONFIG.plans.basicUpgrade;
  const basic = CAMPAIGN_CONFIG.plans.basic;
  const pro = CAMPAIGN_CONFIG.plans.pro;

  const upgradePriceLabel = getPlanPriceLabel(upgrade.priceUsd, "USD upgrade price pending");
  const basicPriceLabel = getPlanPriceLabel(basic.priceUsd, "Basic Plan");
  const diffUsd = getUpgradePriceDifferenceUsd(basic.priceUsd, upgrade.priceUsd);
  const savingsVsProUsd = getUpgradeSavingsVsProUsd(pro.priceUsd, upgrade.priceUsd);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto border-gold/40 bg-cream p-6 text-pine sm:rounded-2xl sm:p-8">
        <DialogHeader className="text-left">
          <p className="text-xs font-semibold tracking-[0.16em] text-crimson uppercase">
            One-Time PRO Upgrade Option
          </p>
          <DialogTitle className="mt-1 font-display text-2xl leading-snug font-semibold text-pine sm:text-3xl">
            Wait! Make your holiday workshop even more complete.
          </DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-relaxed text-pine/80">
            {diffUsd !== null && isPlanPriceConfigured(upgrade.priceUsd) ? (
              <>
                For just <strong>{formatUsd(diffUsd)} more</strong> than Basic ({upgradePriceLabel}{" "}
                total USD
                {savingsVsProUsd !== null ? `, saving ${formatUsd(savingsVsProUsd)} off standard PRO` : ""}
                ), upgrade now to unlock the full <strong>PRO Plan</strong> — with the
                theme-organized library, full boutique-finish tutorial, all 6 bonuses, and a{" "}
                {upgrade.guaranteeDays}-day money-back guarantee.
              </>
            ) : (
              <>
                Upgrade directly from Basic to the full <strong>PRO Plan</strong> — unlocking the
                theme-organized library, full boutique-finish tutorial, all 6 curated bonuses, and a{" "}
                {upgrade.guaranteeDays}-day money-back guarantee. (Exact USD price difference will
                display automatically once confirmed USD prices are set in{" "}
                <code className="rounded bg-cream-warm px-1 py-0.5 text-xs">
                  src/config/campaign.ts
                </code>
                .)
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-pine/15 bg-cream-warm p-4">
          <div className="flex items-baseline justify-between gap-3 border-b border-pine/10 pb-3">
            <span className="font-display text-lg font-semibold text-pine">
              PRO Plan Upgrade
            </span>
            <span className="font-display text-xl font-semibold text-crimson sm:text-2xl">
              {diffUsd !== null
                ? `+${formatUsd(diffUsd)} (${upgradePriceLabel} total)`
                : upgradePriceLabel}
            </span>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-pine/85">
            {upgrade.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden="true" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <Button
            type="button"
            variant="crimson"
            size="xl"
            onClick={onAcceptUpgrade}
            className="w-full"
          >
            {diffUsd !== null
              ? `Yes, upgrade to PRO for +${formatUsd(diffUsd)} (${upgradePriceLabel} total)`
              : "Yes, upgrade to the full PRO Plan"}
            <ArrowRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="pineOutline"
            size="lg"
            onClick={onDeclineAndContinueBasic}
            className="w-full rounded-full"
          >
            {isPlanPriceConfigured(basic.priceUsd)
              ? `No thanks — continue with Basic (${basicPriceLabel})`
              : "No thanks — continue with Basic Plan"}
          </Button>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-pine/65">
          <ShieldCheck className="size-3.5 text-pine" aria-hidden="true" />
          No pressure: {upgrade.guaranteeDays}-day guarantee on PRO or {basic.guaranteeDays}-day
          guarantee on Basic.
        </p>
      </DialogContent>
    </Dialog>
  );
}

interface CheckoutNoticeModalProps {
  plan: PlanConfig | null;
  utms: UtmParams;
  onClose: () => void;
}

export function CheckoutPlaceholderModal({ plan, utms, onClose }: CheckoutNoticeModalProps) {
  const utmEntries = Object.entries(utms);
  const planPriceDisplay = plan
    ? getPlanPriceLabel(plan.priceUsd, "USD price unset")
    : "";

  return (
    <Dialog
      open={plan !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-md border-gold/40 bg-cream p-6 text-pine sm:rounded-2xl">
        {plan && (
          <>
            <DialogHeader className="text-left">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-crimson uppercase">
                <Info className="size-4" aria-hidden="true" />
                <span>Checkout awaiting live configuration</span>
              </div>
              <DialogTitle className="mt-1 font-display text-2xl font-semibold text-pine">
                {plan.name} — {planPriceDisplay}
              </DialogTitle>
              <DialogDescription className="pt-2 text-sm leading-relaxed text-pine/80">
                This page never simulates fake payments. To enable live checkout redirect, configure
                the confirmed USD price and official checkout URL for this plan in{" "}
                <code className="rounded bg-cream-warm px-1.5 py-0.5 text-xs text-pine">
                  src/config/campaign.ts
                </code>
                .
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 rounded-xl border border-pine/15 bg-cream-warm p-4 text-xs text-pine/85">
              <p>
                <strong>Current checkout placeholder:</strong> {plan.checkoutUrl}
              </p>
              <p>
                <strong>Configured USD price:</strong> {planPriceDisplay}
              </p>
              <p>
                <strong>Configured guarantee:</strong> {plan.guaranteeDays} days
              </p>
              <p>
                <strong>Captured UTM parameters:</strong>{" "}
                {utmEntries.length > 0
                  ? utmEntries.map(([k, v]) => `${k}=${v}`).join(", ")
                  : "none in current URL (preserved and appended automatically when present)"}
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <Button type="button" variant="crimson" onClick={onClose} className="rounded-full">
                Got it
                <ExternalLink className="size-3.5" />
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface ConsentBannerProps {
  consent: ConsentState;
  onAccept: () => void;
  onDecline: () => void;
}

export function AnalyticsConsentBanner({ consent, onAccept, onDecline }: ConsentBannerProps) {
  if (consent !== "unknown") return null;

  return (
    <aside
      aria-label="Privacy and Meta Pixel preferences"
      className="fixed right-3 bottom-3 left-3 z-40 mx-auto max-w-2xl rounded-2xl border border-gold/35 bg-pine/95 p-4 text-cream shadow-2xl backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-cream/85">
          We only load measurement cookies (Meta Pixel) with your explicit consent to understand how
          visitors find us. You can accept or decline now and change your choice anytime in the
          footer.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="creamOutline"
            size="sm"
            onClick={onDecline}
            className="rounded-full"
          >
            Decline
          </Button>
          <Button
            type="button"
            variant="gold"
            size="sm"
            onClick={onAccept}
            className="rounded-full"
          >
            Accept
          </Button>
        </div>
      </div>
    </aside>
  );
}

interface StickyMobileCtaProps {
  visible: boolean;
  onClick: () => void;
}

export function StickyMobileCta({ visible, onClick }: StickyMobileCtaProps) {
  if (!visible) return null;
  const basicPriceUsd = CAMPAIGN_CONFIG.plans.basic.priceUsd;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/30 bg-pine/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-gold">500+ Christmas Cone Templates</p>
          <p className="text-[11px] text-cream/80">
            {isPlanPriceConfigured(basicPriceUsd)
              ? `Starting at ${formatUsd(basicPriceUsd)} USD`
              : "Instant US Letter & A4 PDFs"}
          </p>
        </div>
        <Button type="button" variant="crimson" size="sm" onClick={onClick} className="shrink-0 rounded-full px-4">
          SEE PLANS
        </Button>
      </div>
    </div>
  );
}