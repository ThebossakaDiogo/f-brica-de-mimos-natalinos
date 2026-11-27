import { describe, expect, it } from "vitest";

import {
  CAMPAIGN_CONFIG,
  formatUsd,
  getDaysUntilChristmas,
  getPlanPriceLabel,
  getUpgradePriceDifferenceUsd,
  getUpgradeSavingsVsProUsd,
  isCheckoutConfigured,
  isPlanPriceConfigured,
  isPlaceholderValue,
} from "@/config/campaign";
import { FAQ_ITEMS } from "@/config/content";
import {
  buildCheckoutUrlWithUtms,
  calculateBreakEvenUnits,
  calculateProfitSimulation,
  readUtmParamsFromSearch,
} from "@/lib/tracking";

describe("Christmas Treat Workshop commercial & USD compliance rules", () => {
  it("keeps USD currency, actual guarantee windows, and unset configurable prices without inventing USD figures", () => {
    expect(CAMPAIGN_CONFIG.currency).toBe("USD");
    expect(CAMPAIGN_CONFIG.plans.basic.priceUsd).toBeNull();
    expect(CAMPAIGN_CONFIG.plans.basic.guaranteeDays).toBe(7);

    expect(CAMPAIGN_CONFIG.plans.pro.priceUsd).toBeNull();
    expect(CAMPAIGN_CONFIG.plans.pro.guaranteeDays).toBe(30);

    expect(CAMPAIGN_CONFIG.plans.basicUpgrade.priceUsd).toBeNull();
    expect(CAMPAIGN_CONFIG.plans.basicUpgrade.guaranteeDays).toBe(30);

    expect(isPlanPriceConfigured(CAMPAIGN_CONFIG.plans.basic.priceUsd)).toBe(false);
    expect(getPlanPriceLabel(null)).toBe("USD price configurable");
    expect(getUpgradePriceDifferenceUsd(null, null)).toBeNull();
  });

  it("computes exact USD upgrade price difference and savings when real USD prices are provided", () => {
    expect(getUpgradePriceDifferenceUsd(9, 19)).toBe(10);
    expect(getUpgradePriceDifferenceUsd(9.99, 19.99)).toBe(10);
    expect(getUpgradeSavingsVsProUsd(27, 19)).toBe(8);
    expect(formatUsd(19.99)).toBe("$19.99");
  });

  it("preserves all 6 bonuses and 10 FAQ items", () => {
    expect(CAMPAIGN_CONFIG.bonuses).toHaveLength(6);
    expect(FAQ_ITEMS).toHaveLength(10);
  });

  it("keeps testimonials empty by default and explicit placeholders for checkout and Meta Pixel", () => {
    expect(CAMPAIGN_CONFIG.testimonials).toHaveLength(0);
    expect(isCheckoutConfigured(CAMPAIGN_CONFIG.plans.basic.checkoutUrl)).toBe(false);
    expect(isCheckoutConfigured(CAMPAIGN_CONFIG.plans.pro.checkoutUrl)).toBe(false);
    expect(isCheckoutConfigured(CAMPAIGN_CONFIG.plans.basicUpgrade.checkoutUrl)).toBe(false);
    expect(isPlaceholderValue(CAMPAIGN_CONFIG.analytics.metaPixelId)).toBe(true);
  });

  it("preserves and appends UTM parameters only on configured live checkout URLs", () => {
    const utms = readUtmParamsFromSearch(
      "?utm_source=pinterest&utm_medium=cpc&utm_campaign=christmas2026&fbclid=xyz789",
    );
    expect(utms.utm_source).toBe("pinterest");
    expect(utms.fbclid).toBe("xyz789");

    const configured = buildCheckoutUrlWithUtms("https://pay.example.com/pro?ref=site", utms);
    expect(configured).toContain("ref=site");
    expect(configured).toContain("utm_source=pinterest");
    expect(configured).toContain("utm_campaign=christmas2026");

    const unconfigured = buildCheckoutUrlWithUtms("CONFIGURE_CHECKOUT_URL_PRO", utms);
    expect(unconfigured).toBe("CONFIGURE_CHECKOUT_URL_PRO");
  });

  it("calculates USD profit scenarios with overhead and clamps invalid or negative inputs", () => {
    const sample = calculateProfitSimulation({
      quantity: 40,
      unitPrice: 8,
      unitCost: 2.5,
      extraBatchCost: 15,
    });
    expect(sample.grossRevenue).toBe(320);
    expect(sample.materialCost).toBe(100);
    expect(sample.totalCost).toBe(115);
    expect(sample.unitMargin).toBe(5.5);
    expect(sample.estimatedNet).toBe(205);
    expect(sample.breakEvenUnits).toBe(3);
    expect(sample.isUnitLoss).toBe(false);
    expect(sample.isNetLoss).toBe(false);

    const clamped = calculateProfitSimulation({
      quantity: -10,
      unitPrice: Number.NaN,
      unitCost: -5,
      extraBatchCost: -20,
    });
    expect(clamped.quantity).toBe(1);
    expect(clamped.unitPrice).toBe(8);
    expect(clamped.unitCost).toBe(0);
    expect(clamped.extraBatchCost).toBe(0);
    expect(calculateBreakEvenUnits(20, 0)).toBeNull();
  });

  it("calculates real calendar days remaining until the configured Christmas date", () => {
    const days = getDaysUntilChristmas(new Date("2026-12-20T12:00:00"));
    expect(days).toBe(5);
  });
});