import { CAMPAIGN_CONFIG, isCheckoutConfigured, isPlaceholderValue } from "@/config/campaign";

export type ConsentState = "unknown" | "granted" | "denied";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
}

const UTM_KEYS: readonly (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
];

const UTM_STORAGE_KEY = "fmn_utm_params_v1";

export function readUtmParamsFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const collected: UtmParams = {};
  for (const key of UTM_KEYS) {
    const raw = params.get(key)?.trim();
    if (raw) {
      collected[key] = raw;
    }
  }
  return collected;
}

export function captureAndPersistUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  const fromUrl = readUtmParamsFromSearch(window.location.search);
  let stored: UtmParams = {};
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      for (const key of UTM_KEYS) {
        const val = parsed[key];
        if (typeof val === "string" && val.trim()) {
          stored[key] = val.trim();
        }
      }
    }
  } catch {
    stored = {};
  }
  const merged: UtmParams = { ...stored, ...fromUrl };
  try {
    if (Object.keys(merged).length > 0) {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
    }
  } catch {
    // Storage unavailable in private contexts; keep in memory.
  }
  return merged;
}

export function buildCheckoutUrlWithUtms(baseUrl: string, utms: UtmParams): string {
  if (!isCheckoutConfigured(baseUrl)) return baseUrl;
  const url = new URL(baseUrl);
  for (const key of UTM_KEYS) {
    const value = utms[key];
    if (value && !url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

export function readStoredConsent(): ConsentState {
  if (typeof window === "undefined") return "unknown";
  try {
    const val = window.localStorage.getItem(CAMPAIGN_CONFIG.analytics.consentStorageKey);
    if (val === "granted" || val === "denied") return val;
  } catch {
    // Ignore storage read errors.
  }
  return "unknown";
}

export function saveConsent(state: Exclude<ConsentState, "unknown">): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CAMPAIGN_CONFIG.analytics.consentStorageKey, state);
  } catch {
    // Ignore storage write errors.
  }
}

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[][];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: unknown;
  }
}

export function initMetaPixelWithConsent(consent: ConsentState): boolean {
  if (typeof window === "undefined" || consent !== "granted") return false;
  const pixelId = CAMPAIGN_CONFIG.analytics.metaPixelId;
  if (isPlaceholderValue(pixelId)) return false;

  if (!window.fbq) {
    const fbqFn: NonNullable<Window["fbq"]> = (...args: unknown[]) => {
      if (fbqFn.callMethod) {
        fbqFn.callMethod(...args);
      } else {
        fbqFn.queue?.push(args);
      }
    };
    fbqFn.queue = [];
    fbqFn.loaded = true;
    fbqFn.version = "2.0";
    fbqFn.push = fbqFn;
    window.fbq = fbqFn;
    window._fbq = fbqFn;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq("consent", "grant");
  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
  return true;
}

export function trackMetaPixelEvent(
  consent: ConsentState,
  eventName: "ViewContent" | "InitiateCheckout",
  payload: Record<string, string | number>,
): boolean {
  if (typeof window === "undefined" || consent !== "granted") return false;
  const pixelId = CAMPAIGN_CONFIG.analytics.metaPixelId;
  if (isPlaceholderValue(pixelId) || !window.fbq) return false;
  window.fbq("track", eventName, payload);
  return true;
}

export interface SimulatorInput {
  quantity: number;
  unitPrice: number;
  unitCost: number;
}

export interface SimulatorResult {
  quantity: number;
  unitPrice: number;
  unitCost: number;
  grossRevenue: number;
  totalCost: number;
  unitMargin: number;
  estimatedNet: number;
  marginPercent: number;
  isUnitLoss: boolean;
}

export const SIMULATOR_LIMITS = {
  minQuantity: 1,
  maxQuantity: 500,
  minPrice: 1,
  maxPrice: 200,
  minCost: 0,
  maxCost: 150,
} as const;

export function clampNumber(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

export function calculateProfitSimulation(input: SimulatorInput): SimulatorResult {
  const quantity = Math.round(
    clampNumber(input.quantity, SIMULATOR_LIMITS.minQuantity, SIMULATOR_LIMITS.maxQuantity, 30),
  );
  const unitPrice = clampNumber(
    input.unitPrice,
    SIMULATOR_LIMITS.minPrice,
    SIMULATOR_LIMITS.maxPrice,
    18,
  );
  const unitCost = clampNumber(
    input.unitCost,
    SIMULATOR_LIMITS.minCost,
    SIMULATOR_LIMITS.maxCost,
    5.5,
  );

  const grossRevenue = quantity * unitPrice;
  const totalCost = quantity * unitCost;
  const unitMargin = unitPrice - unitCost;
  const estimatedNet = grossRevenue - totalCost;
  const marginPercent = grossRevenue > 0 ? (estimatedNet / grossRevenue) * 100 : 0;

  return {
    quantity,
    unitPrice,
    unitCost,
    grossRevenue,
    totalCost,
    unitMargin,
    estimatedNet,
    marginPercent,
    isUnitLoss: unitMargin < 0,
  };
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}