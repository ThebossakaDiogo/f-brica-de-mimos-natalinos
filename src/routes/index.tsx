import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HeroAndStorySections } from "@/components/HeroAndStorySections";
import { CatalogAndEmotionSections } from "@/components/CatalogAndEmotionSections";
import { SimulatorAndBonusesSections } from "@/components/SimulatorAndBonusesSections";
import { PricingAndTrustSections } from "@/components/PricingAndTrustSections";
import {
  AnalyticsConsentBanner,
  BasicUpgradeModal,
  CheckoutPlaceholderModal,
  StickyMobileCta,
} from "@/components/OfferModals";
import {
  CAMPAIGN_CONFIG,
  isCheckoutConfigured,
  isPlanPriceConfigured,
  type PlanConfig,
} from "@/config/campaign";
import {
  buildCheckoutUrlWithUtms,
  captureAndPersistUtmParams,
  initMetaPixelWithConsent,
  readStoredConsent,
  saveConsent,
  trackMetaPixelEvent,
  type ConsentState,
  type UtmParams,
} from "@/lib/tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Christmas Treat Workshop — 500+ Printable Christmas Cone Templates (PDF)" },
      {
        name: "description",
        content:
          "Turn a single sheet of cardstock into boutique-style Christmas treat cones with 500+ printable US Letter & A4 PDF templates for gifting or local handmade sales.",
      },
      {
        property: "og:title",
        content: "Christmas Treat Workshop — 500+ Printable Christmas Templates",
      },
      {
        property: "og:description",
        content:
          "Craft boutique-style holiday paper treat cones at home with 500+ printable templates ready to print, cut, and assemble.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChristmasTreatWorkshopLanding,
});

function ChristmasTreatWorkshopLanding() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [pendingPlaceholderPlan, setPendingPlaceholderPlan] = useState<PlanConfig | null>(null);
  const [utms, setUtms] = useState<UtmParams>({});
  const [consent, setConsent] = useState<ConsentState>("denied");
  const [showStickyMobile, setShowStickyMobile] = useState(false);

  useEffect(() => {
    setUtms(captureAndPersistUtmParams());
    const storedConsent = readStoredConsent();
    setConsent(storedConsent);
    if (storedConsent === "granted") {
      initMetaPixelWithConsent("granted");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const plansEl = document.getElementById("plans");
      const passedHero = window.scrollY > 520;
      const nearPlans = plansEl
        ? plansEl.getBoundingClientRect().top < window.innerHeight * 0.85 &&
          plansEl.getBoundingClientRect().bottom > 120
        : false;
      setShowStickyMobile(passedHero && !nearPlans);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(root);

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.["reduceMotion"]) return;

        const isDesktop = Boolean(context.conditions?.["isDesktop"]);

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: isDesktop ? 26 : 16,
            opacity: 0,
            duration: isDesktop ? 0.72 : 0.52,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger-group]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
          if (items.length === 0) return;
          gsap.from(items, {
            y: isDesktop ? 22 : 14,
            opacity: 0,
            duration: isDesktop ? 0.62 : 0.48,
            stagger: isDesktop ? 0.1 : 0.06,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: group,
              start: "top 86%",
              once: true,
            },
          });
        });

        if (isDesktop) {
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            gsap.to(el, {
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        }
      },
    );

    return () => {
      mm.revert();
    };
  }, []);

  const scrollToPlans = useCallback(() => {
    const target = document.getElementById("plans");
    if (!target) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
  }, []);

  const proceedToCheckout = useCallback(
    (plan: PlanConfig) => {
      const payload: Record<string, string | number> = {
        content_name: plan.name,
        currency: CAMPAIGN_CONFIG.currency,
      };
      if (isPlanPriceConfigured(plan.priceUsd)) {
        payload["value"] = plan.priceUsd;
      }
      trackMetaPixelEvent(consent, "InitiateCheckout", payload);

      if (!isCheckoutConfigured(plan.checkoutUrl)) {
        setPendingPlaceholderPlan(plan);
        return;
      }

      const finalUrl = buildCheckoutUrlWithUtms(plan.checkoutUrl, utms);
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    },
    [consent, utms],
  );

  const handleSelectBasic = useCallback(() => {
    const upgrade = CAMPAIGN_CONFIG.plans.basicUpgrade;
    const payload: Record<string, string | number> = {
      content_name: "Basic to PRO Upgrade Modal",
      currency: CAMPAIGN_CONFIG.currency,
    };
    if (isPlanPriceConfigured(upgrade.priceUsd)) {
      payload["value"] = upgrade.priceUsd;
    }
    trackMetaPixelEvent(consent, "ViewContent", payload);
    setUpgradeModalOpen(true);
  }, [consent]);

  const handleSelectPro = useCallback(() => {
    proceedToCheckout(CAMPAIGN_CONFIG.plans.pro);
  }, [proceedToCheckout]);

  const handleAcceptUpgrade = useCallback(() => {
    setUpgradeModalOpen(false);
    proceedToCheckout(CAMPAIGN_CONFIG.plans.basicUpgrade);
  }, [proceedToCheckout]);

  const handleDeclineUpgrade = useCallback(() => {
    setUpgradeModalOpen(false);
    proceedToCheckout(CAMPAIGN_CONFIG.plans.basic);
  }, [proceedToCheckout]);

  const handleAcceptConsent = useCallback(() => {
    saveConsent("granted");
    setConsent("granted");
    initMetaPixelWithConsent("granted");
  }, []);

  const handleDeclineConsent = useCallback(() => {
    saveConsent("denied");
    setConsent("denied");
  }, []);

  const handleResetConsent = useCallback(() => {
    setConsent("unknown");
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-cream text-pine">
      <main>
        <HeroAndStorySections onJumpToPlans={scrollToPlans} />
        <CatalogAndEmotionSections />
        <SimulatorAndBonusesSections />
        <PricingAndTrustSections
          onSelectBasic={handleSelectBasic}
          onSelectPro={handleSelectPro}
          onJumpToPlans={scrollToPlans}
          consent={consent}
          onResetConsent={handleResetConsent}
        />
      </main>

      <BasicUpgradeModal
        open={upgradeModalOpen}
        onOpenChange={setUpgradeModalOpen}
        onAcceptUpgrade={handleAcceptUpgrade}
        onDeclineAndContinueBasic={handleDeclineUpgrade}
      />

      <CheckoutPlaceholderModal
        plan={pendingPlaceholderPlan}
        utms={utms}
        onClose={() => setPendingPlaceholderPlan(null)}
      />

      <AnalyticsConsentBanner
        consent={consent}
        onAccept={handleAcceptConsent}
        onDecline={handleDeclineConsent}
      />

      <StickyMobileCta
        visible={showStickyMobile && consent !== "unknown"}
        onClick={scrollToPlans}
      />
    </div>
  );
}
