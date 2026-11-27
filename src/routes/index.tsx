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
  CheckoutPlaceholderModal,
  EssentialUpgradeModal,
  StickyMobileCta,
} from "@/components/OfferModals";
import {
  CAMPAIGN_CONFIG,
  isCheckoutConfigured,
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
      { title: "Fábrica de Mimos Natalinos — +500 Moldes de Cones Natalinos em PDF" },
      {
        name: "description",
        content:
          "Transforme uma simples folha de papel em cones natalinos encantadores com mais de 500 moldes prontos para imprimir, recortar e montar. A partir de R$ 10.",
      },
      {
        property: "og:title",
        content: "Fábrica de Mimos Natalinos — +500 Moldes Natalinos",
      },
      {
        property: "og:description",
        content:
          "Transforme papel em presentes encantadores com mais de 500 moldes natalinos prontos para imprimir, recortar e montar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FabricaDeMimosLanding,
});

function FabricaDeMimosLanding() {
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
      const plansEl = document.getElementById("planos");
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

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.72,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
        if (items.length === 0) return;
        gsap.from(items, {
          y: 22,
          opacity: 0,
          duration: 0.62,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            once: true,
          },
        });
      });

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
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToPlans = useCallback(() => {
    const target = document.getElementById("planos");
    if (!target) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
  }, []);

  const proceedToCheckout = useCallback(
    (plan: PlanConfig) => {
      trackMetaPixelEvent(consent, "InitiateCheckout", {
        content_name: plan.name,
        value: plan.price,
        currency: "BRL",
      });

      if (!isCheckoutConfigured(plan.checkoutUrl)) {
        setPendingPlaceholderPlan(plan);
        return;
      }

      const finalUrl = buildCheckoutUrlWithUtms(plan.checkoutUrl, utms);
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    },
    [consent, utms],
  );

  const handleSelectEssential = useCallback(() => {
    trackMetaPixelEvent(consent, "ViewContent", {
      content_name: "Popup Upgrade Essencial para Premium R$20",
      value: CAMPAIGN_CONFIG.plans.essentialUpgrade.price,
      currency: "BRL",
    });
    setUpgradeModalOpen(true);
  }, [consent]);

  const handleSelectPremium = useCallback(() => {
    proceedToCheckout(CAMPAIGN_CONFIG.plans.premium);
  }, [proceedToCheckout]);

  const handleAcceptUpgrade = useCallback(() => {
    setUpgradeModalOpen(false);
    proceedToCheckout(CAMPAIGN_CONFIG.plans.essentialUpgrade);
  }, [proceedToCheckout]);

  const handleDeclineUpgrade = useCallback(() => {
    setUpgradeModalOpen(false);
    proceedToCheckout(CAMPAIGN_CONFIG.plans.essential);
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
          onSelectEssential={handleSelectEssential}
          onSelectPremium={handleSelectPremium}
          onJumpToPlans={scrollToPlans}
          consent={consent}
          onResetConsent={handleResetConsent}
        />
      </main>

      <EssentialUpgradeModal
        open={upgradeModalOpen}
        onOpenChange={setUpgradeModalOpen}
        onAcceptUpgrade={handleAcceptUpgrade}
        onDeclineAndContinueEssential={handleDeclineUpgrade}
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
