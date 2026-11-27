import { ArrowRight, Check, ExternalLink, Info, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CAMPAIGN_CONFIG, type PlanConfig } from "@/config/campaign";
import type { ConsentState, UtmParams } from "@/lib/tracking";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAcceptUpgrade: () => void;
  onDeclineAndContinueEssential: () => void;
}

export function EssentialUpgradeModal({
  open,
  onOpenChange,
  onAcceptUpgrade,
  onDeclineAndContinueEssential,
}: UpgradeModalProps) {
  const upgrade = CAMPAIGN_CONFIG.plans.essentialUpgrade;
  const essential = CAMPAIGN_CONFIG.plans.essential;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto border-gold/40 bg-cream p-6 text-pine sm:rounded-2xl sm:p-8">
        <DialogHeader className="text-left">
          <p className="text-xs font-semibold tracking-[0.16em] text-crimson uppercase">
            Condição especial de upgrade
          </p>
          <DialogTitle className="mt-1 font-display text-2xl leading-snug font-semibold text-pine sm:text-3xl">
            Espere! Seu Natal pode ficar ainda mais completo.
          </DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-relaxed text-pine/80">
            Em vez de levar apenas o Essencial por {essential.priceFormatted}, você pode fazer o
            upgrade agora para o <strong>Plano Premium completo por {upgrade.priceFormatted} no total</strong>{" "}
            — com os 6 bônus exclusivos, biblioteca organizada por categorias, tutorial completo e
            garantia de {upgrade.guaranteeDays} dias.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-pine/15 bg-cream-warm p-4">
          <div className="flex items-baseline justify-between gap-3 border-b border-pine/10 pb-3">
            <span className="font-display text-lg font-semibold text-pine">
              Plano Premium no Upgrade
            </span>
            <span className="font-display text-2xl font-semibold text-crimson">
              {upgrade.priceFormatted}
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
            Sim, quero o Premium completo por {upgrade.priceFormatted}
            <ArrowRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="pineOutline"
            size="lg"
            onClick={onDeclineAndContinueEssential}
            className="w-full rounded-full"
          >
            Não, obrigado — seguir com o Essencial por {essential.priceFormatted}
          </Button>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-pine/65">
          <ShieldCheck className="size-3.5 text-pine" aria-hidden="true" />
          Você escolhe livremente: {upgrade.guaranteeDays} dias no Premium ou{" "}
          {essential.guaranteeDays} dias no Essencial.
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
                <span>Checkout aguardando configuração</span>
              </div>
              <DialogTitle className="mt-1 font-display text-2xl font-semibold text-pine">
                {plan.name} — {plan.priceFormatted}
              </DialogTitle>
              <DialogDescription className="pt-2 text-sm leading-relaxed text-pine/80">
                Esta página não simula pagamentos fictícios. Para ativar o direcionamento real,
                configure a URL oficial do checkout deste plano em{" "}
                <code className="rounded bg-cream-warm px-1.5 py-0.5 text-xs text-pine">
                  src/config/campaign.ts
                </code>
                .
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 rounded-xl border border-pine/15 bg-cream-warm p-4 text-xs text-pine/85">
              <p>
                <strong>Placeholder atual:</strong> {plan.checkoutUrl}
              </p>
              <p>
                <strong>Garantia configurada:</strong> {plan.guaranteeDays} dias
              </p>
              <p>
                <strong>Parâmetros UTM capturados:</strong>{" "}
                {utmEntries.length > 0
                  ? utmEntries.map(([k, v]) => `${k}=${v}`).join(", ")
                  : "nenhum na URL atual (serão anexados automaticamente quando presentes)"}
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <Button type="button" variant="crimson" onClick={onClose} className="rounded-full">
                Entendi
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
      aria-label="Preferências de privacidade e Meta Pixel"
      className="fixed right-3 bottom-3 left-3 z-40 mx-auto max-w-2xl rounded-2xl border border-gold/35 bg-pine/95 p-4 text-cream shadow-2xl backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-cream/85">
          Usamos cookies de mensuração (Meta Pixel) apenas com o seu consentimento para entender a
          origem das visitas. Você pode aceitar ou recusar agora e alterar quando quiser no rodapé.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="creamOutline"
            size="sm"
            onClick={onDecline}
            className="rounded-full"
          >
            Recusar
          </Button>
          <Button
            type="button"
            variant="gold"
            size="sm"
            onClick={onAccept}
            className="rounded-full"
          >
            Aceitar
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

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/30 bg-pine/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-gold">+500 Moldes Natalinos</p>
          <p className="text-[11px] text-cream/80">A partir de R$ 10,00</p>
        </div>
        <Button type="button" variant="crimson" size="sm" onClick={onClick} className="shrink-0 rounded-full px-4">
          QUERO MEUS MOLDES
        </Button>
      </div>
    </div>
  );
}