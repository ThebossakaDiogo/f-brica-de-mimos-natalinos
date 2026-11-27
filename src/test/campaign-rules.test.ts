import { describe, expect, it } from "vitest";

import {
  CAMPAIGN_CONFIG,
  getDaysUntilChristmas,
  isCheckoutConfigured,
  isPlaceholderValue,
} from "@/config/campaign";
import { FAQ_ITEMS } from "@/config/content";
import {
  buildCheckoutUrlWithUtms,
  calculateProfitSimulation,
  readUtmParamsFromSearch,
} from "@/lib/tracking";

describe("Regras comerciais da Fábrica de Mimos Natalinos", () => {
  it("mantém os preços e prazos de garantia exatos dos planos e do upgrade", () => {
    expect(CAMPAIGN_CONFIG.plans.essential.price).toBe(10);
    expect(CAMPAIGN_CONFIG.plans.essential.guaranteeDays).toBe(7);

    expect(CAMPAIGN_CONFIG.plans.premium.price).toBe(27.9);
    expect(CAMPAIGN_CONFIG.plans.premium.guaranteeDays).toBe(30);

    expect(CAMPAIGN_CONFIG.plans.essentialUpgrade.price).toBe(20);
    expect(CAMPAIGN_CONFIG.plans.essentialUpgrade.guaranteeDays).toBe(30);
  });

  it("mantém exatamente 6 bônus e 10 perguntas de FAQ configuradas", () => {
    expect(CAMPAIGN_CONFIG.bonuses).toHaveLength(6);
    expect(FAQ_ITEMS).toHaveLength(10);
  });

  it("mantém avaliações vazias por padrão e placeholders explícitos de checkout e Pixel", () => {
    expect(CAMPAIGN_CONFIG.testimonials).toHaveLength(0);
    expect(isCheckoutConfigured(CAMPAIGN_CONFIG.plans.essential.checkoutUrl)).toBe(false);
    expect(isCheckoutConfigured(CAMPAIGN_CONFIG.plans.premium.checkoutUrl)).toBe(false);
    expect(isCheckoutConfigured(CAMPAIGN_CONFIG.plans.essentialUpgrade.checkoutUrl)).toBe(false);
    expect(isPlaceholderValue(CAMPAIGN_CONFIG.analytics.metaPixelId)).toBe(true);
  });

  it("propaga parâmetros UTM apenas em URLs reais configuradas", () => {
    const utms = readUtmParamsFromSearch(
      "?utm_source=instagram&utm_medium=cpc&utm_campaign=natal2026&fbclid=abc123",
    );
    expect(utms.utm_source).toBe("instagram");
    expect(utms.fbclid).toBe("abc123");

    const configured = buildCheckoutUrlWithUtms("https://pay.exemplo.com/premium?ref=site", utms);
    expect(configured).toContain("ref=site");
    expect(configured).toContain("utm_source=instagram");
    expect(configured).toContain("utm_campaign=natal2026");

    const unconfigured = buildCheckoutUrlWithUtms("CONFIGURE_CHECKOUT_URL_PREMIUM", utms);
    expect(unconfigured).toBe("CONFIGURE_CHECKOUT_URL_PREMIUM");
  });

  it("calcula corretamente o simulador e limita entradas inválidas ou negativas", () => {
    const sample = calculateProfitSimulation({ quantity: 40, unitPrice: 18, unitCost: 5.5 });
    expect(sample.grossRevenue).toBe(720);
    expect(sample.totalCost).toBe(220);
    expect(sample.unitMargin).toBe(12.5);
    expect(sample.estimatedNet).toBe(500);
    expect(sample.isUnitLoss).toBe(false);

    const clamped = calculateProfitSimulation({
      quantity: -10,
      unitPrice: Number.NaN,
      unitCost: -5,
    });
    expect(clamped.quantity).toBe(1);
    expect(clamped.unitPrice).toBe(18);
    expect(clamped.unitCost).toBe(0);
  });

  it("calcula dias reais até a data de Natal da campanha", () => {
    const days = getDaysUntilChristmas(new Date("2026-12-20T12:00:00"));
    expect(days).toBe(5);
  });
});