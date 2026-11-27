export type PlanKey = "basic" | "pro" | "basicUpgrade";

export interface PlanConfig {
  key: PlanKey;
  name: string;
  /**
   * Confirmed USD price for this plan, or null when still unset.
   * Never invent prices: replace null with your confirmed USD figure before launch.
   */
  priceUsd: number | null;
  guaranteeDays: number;
  checkoutUrl: string;
  accessLabel: string;
  features: readonly string[];
}

export interface VerifiedTestimonial {
  id: string;
  author: string;
  location: string;
  quote: string;
  verifiedDate: string;
}

export interface BonusItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  format: string;
  mockupKind: "tags" | "boxes" | "cards" | "manual" | "guide" | "whatsapp";
}

export const CAMPAIGN_CONFIG = {
  brandName: "Christmas Treat Workshop",
  editionLabel: "Holiday Craft Edition",
  currency: "USD" as const,
  /** Real Christmas date for this campaign (never a fake countdown timer). */
  campaignDate: {
    christmasIso: "2026-12-25",
    displayLabel: "December 25, 2026",
  },
  /**
   * Explicit configurable commercial values and checkout placeholders.
   * Set confirmed USD prices (number) and live payment URLs before publishing.
   */
  plans: {
    basic: {
      key: "basic",
      name: "Basic Plan",
      priceUsd: null as number | null,
      guaranteeDays: 7,
      checkoutUrl: "CONFIGURE_CHECKOUT_URL_BASIC",
      accessLabel: "Instant digital PDF delivery after payment",
      features: [
        "500+ printable Christmas paper cone templates ready to download",
        "Basic printing, cutting, and folding starter guide",
        "High-resolution PDF files formatted for US Letter & A4",
        "Personal use & handmade finished-goods license (assembled cones only)",
        "7-day money-back guarantee",
      ],
    },
    pro: {
      key: "pro",
      name: "PRO Plan",
      priceUsd: null as number | null,
      guaranteeDays: 30,
      checkoutUrl: "CONFIGURE_CHECKOUT_URL_PRO",
      accessLabel: "Instant full library & all 6 bonuses",
      features: [
        "Everything in the Basic Plan (500+ printable Christmas templates)",
        "Theme-organized library by holiday style, color palette, and audience",
        "Complete boutique-finish tutorial on cardstock weights, crisp folds, and ribbons",
        "All 6 curated bonuses (gift tags, favor boxes, cards, assembly manual, pricing guide & outreach kit)",
        "30-day extended money-back guarantee",
      ],
    },
    basicUpgrade: {
      key: "basicUpgrade",
      name: "PRO Plan Upgrade Offer",
      priceUsd: null as number | null,
      guaranteeDays: 30,
      checkoutUrl: "CONFIGURE_CHECKOUT_URL_UPGRADE_PRO",
      accessLabel: "Special upgrade option when selecting Basic",
      features: [
        "Full PRO Plan library organized by holiday theme and style",
        "Complete boutique-finish tutorial + all 6 printable & planning bonuses",
        "30-day extended money-back guarantee",
      ],
    },
  } satisfies Record<PlanKey, PlanConfig>,
  bonuses: [
    {
      id: "tags",
      number: "01",
      title: "Coordinated Gift Tags",
      subtitle: "Printable To / From heirloom tags",
      description:
        "Ready-to-cut sheets of matching holiday gift tags so every cone looks personalized for family, teachers, or local buyers.",
      format: "US Letter & A4 PDF",
      mockupKind: "tags",
    },
    {
      id: "boxes",
      number: "02",
      title: "Holiday Favor Boxes",
      subtitle: "Compact fold-and-fill box templates",
      description:
        "Extra foldable treat boxes sized for truffles, shortbread cookies, fudge, or multi-piece holiday gift bundles.",
      format: "PDF • Score lines marked",
      mockupKind: "boxes",
    },
    {
      id: "cards",
      number: "03",
      title: "Editorial Greeting Cards",
      subtitle: "Foldable stationery to pair with every cone",
      description:
        "Classic holiday note cards featuring festive artwork and clean interior space for handwritten seasonal notes.",
      format: "PDF • Front & inside",
      mockupKind: "cards",
    },
    {
      id: "manual",
      number: "04",
      title: "Craft & Assembly Manual",
      subtitle: "Illustrated cardstock, ink, and finishing guide",
      description:
        "Step-by-step advice on choosing 65–90 lb (180–240 gsm) cardstock, crisp scoring, clean glue seams, and ribbon knots.",
      format: "Illustrated digital guide",
      mockupKind: "manual",
    },
    {
      id: "guide",
      number: "05",
      title: "Seasonal Pricing & Planning Guide",
      subtitle: "Costing sheets, gift bundles & batch prep",
      description:
        "A grounded workbook for tracking real supply costs, structuring 4-pack or 12-pack gift sets, and scheduling holiday pre-orders.",
      format: "Practical PDF workbook",
      mockupKind: "guide",
    },
    {
      id: "whatsapp",
      number: "06",
      title: "Local Outreach & Showcase Kit",
      subtitle: "Editable scripts for messages & holiday posts",
      description:
        "Polite, copy-and-customize announcement templates to share your finished handmade cones with neighbors, parents, coworkers, and craft groups.",
      format: "Ready-to-edit templates",
      mockupKind: "whatsapp",
    },
  ] satisfies readonly BonusItem[],
  /**
   * Genuine verified customer reviews.
   * Intentionally empty by default: the reviews section stays hidden until real reviews are entered here.
   */
  testimonials: [] as readonly VerifiedTestimonial[],
  license: {
    summary:
      "Includes personal crafting use and small-batch handmade commercial sales of finished, physically assembled cones you make yourself. Reselling, sharing, gifting, or redistributing the digital PDF files or raw templates is strictly prohibited.",
  },
  guarantees: {
    basicDays: 7,
    proDays: 30,
    note: "Request a full refund within your chosen plan's guarantee window through the official checkout platform or our support contact below.",
  },
  analytics: {
    /** Replace with your numeric Meta Pixel ID before publishing. */
    metaPixelId: "CONFIGURE_META_PIXEL_ID",
    consentStorageKey: "fmn_analytics_consent_v1",
  },
  legal: {
    /** Explicit pre-launch placeholders: confirm and replace before publishing. */
    merchantName: "CONFIGURE_BUSINESS_OR_SELLER_NAME",
    documentId: "CONFIGURE_TAX_ID_OR_REGISTRATION",
    supportEmail: "CONFIGURE_SUPPORT_EMAIL",
    privacyPolicyUrl: "CONFIGURE_PRIVACY_POLICY_URL",
    termsUrl: "CONFIGURE_TERMS_OF_USE_URL",
    commercialNotice:
      "Before publishing, configure confirmed USD prices, live checkout URLs, legal business details, and Meta Pixel ID in src/config/campaign.ts.",
  },
} as const;

export function isPlaceholderValue(value: string): boolean {
  return value.trim() === "" || value.startsWith("CONFIGURE_");
}

export function isPlanPriceConfigured(priceUsd: number | null): priceUsd is number {
  return typeof priceUsd === "number" && Number.isFinite(priceUsd) && priceUsd > 0;
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getPlanPriceLabel(priceUsd: number | null, fallback = "USD price configurable"): string {
  if (!isPlanPriceConfigured(priceUsd)) return fallback;
  return formatUsd(priceUsd);
}

export function getUpgradePriceDifferenceUsd(
  basicPriceUsd: number | null,
  upgradeTotalUsd: number | null,
): number | null {
  if (!isPlanPriceConfigured(basicPriceUsd) || !isPlanPriceConfigured(upgradeTotalUsd)) {
    return null;
  }
  const diff = Math.round((upgradeTotalUsd - basicPriceUsd) * 100) / 100;
  return diff >= 0 ? diff : null;
}

export function getUpgradeSavingsVsProUsd(
  proPriceUsd: number | null,
  upgradeTotalUsd: number | null,
): number | null {
  if (!isPlanPriceConfigured(proPriceUsd) || !isPlanPriceConfigured(upgradeTotalUsd)) {
    return null;
  }
  const savings = Math.round((proPriceUsd - upgradeTotalUsd) * 100) / 100;
  return savings > 0 ? savings : null;
}

export function isCheckoutConfigured(url: string): boolean {
  if (isPlaceholderValue(url)) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function hasUnsetCommercialConfig(): boolean {
  const { plans, legal, analytics } = CAMPAIGN_CONFIG;
  return (
    !isPlanPriceConfigured(plans.basic.priceUsd) ||
    !isPlanPriceConfigured(plans.pro.priceUsd) ||
    !isPlanPriceConfigured(plans.basicUpgrade.priceUsd) ||
    !isCheckoutConfigured(plans.basic.checkoutUrl) ||
    !isCheckoutConfigured(plans.pro.checkoutUrl) ||
    !isCheckoutConfigured(plans.basicUpgrade.checkoutUrl) ||
    isPlaceholderValue(analytics.metaPixelId) ||
    isPlaceholderValue(legal.merchantName) ||
    isPlaceholderValue(legal.documentId) ||
    isPlaceholderValue(legal.supportEmail)
  );
}

export function getDaysUntilChristmas(referenceDate: Date = new Date()): number | null {
  const target = new Date(`${CAMPAIGN_CONFIG.campaignDate.christmasIso}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const startOfToday = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );
  const diffMs = target.getTime() - startOfToday.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}