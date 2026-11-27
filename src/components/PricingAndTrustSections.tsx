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
  isPlaceholderValue,
} from "@/config/campaign";
import { BENEFIT_ANCHOR_ITEMS, FAQ_ITEMS } from "@/config/content";
import type { ConsentState } from "@/lib/tracking";

interface PricingAndTrustProps {
  onSelectEssential: () => void;
  onSelectPremium: () => void;
  onJumpToPlans: () => void;
  consent: ConsentState;
  onResetConsent: () => void;
}

export function PricingAndTrustSections({
  onSelectEssential,
  onSelectPremium,
  onJumpToPlans,
  consent,
  onResetConsent,
}: PricingAndTrustProps) {
  const { essential, premium } = CAMPAIGN_CONFIG.plans;
  const verifiedTestimonials = CAMPAIGN_CONFIG.testimonials;
  const daysUntilChristmas = getDaysUntilChristmas();

  const hasLegalPlaceholders =
    isPlaceholderValue(CAMPAIGN_CONFIG.legal.merchantName) ||
    isPlaceholderValue(CAMPAIGN_CONFIG.legal.documentId) ||
    isPlaceholderValue(CAMPAIGN_CONFIG.legal.supportEmail);

  return (
    <>
      {verifiedTestimonials.length > 0 && (
        <section id="avaliacoes" className="bg-cream py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div data-reveal className="max-w-2xl">
              <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
                Avaliações reais de quem já montou seus mimos
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

      <section id="comparativo" className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
              Tudo o que acompanha sua coleção, com total transparência
            </h2>
            <p className="mt-3 text-base text-pine/75">
              Compare o que entra em cada plano pelos benefícios reais que você recebe — sem
              valores fictícios riscados.
            </p>
          </div>

          <div
            data-reveal
            className="mt-10 overflow-hidden rounded-2xl border border-pine/15 bg-card editorial-shadow"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_84px_84px] items-center border-b border-pine/15 bg-pine px-4 py-3.5 text-xs font-semibold tracking-wider text-cream uppercase sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:px-6">
              <span>O que está incluso</span>
              <span className="text-center">Essencial</span>
              <span className="text-center text-gold">Premium</span>
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
                    {row.essential ? (
                      <Check className="size-5 text-pine" aria-label="Incluso no Essencial" />
                    ) : (
                      <Minus className="size-4 text-pine/30" aria-label="Não incluso no Essencial" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Check className="size-5 text-crimson" aria-label="Incluso no Premium" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="bg-pine py-20 text-cream sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl leading-tight font-semibold text-cream sm:text-5xl">
              Escolha o plano ideal para o seu Natal
            </h2>
            <p className="mt-3 text-base text-cream/80">
              Pagamento único, acesso digital imediato após confirmação e garantia clara em ambos os
              planos.
            </p>
          </div>

          <div
            data-stagger-group
            className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:gap-8"
          >
            <article
              data-stagger-item
              className="flex flex-col justify-between rounded-3xl border border-gold/25 bg-pine-surface p-7 sm:p-8"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  Para começar agora
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-cream">
                  {essential.name}
                </h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-semibold text-cream">
                    {essential.priceFormatted}
                  </span>
                  <span className="text-xs text-cream/70">pagamento único</span>
                </div>
                <p className="mt-2 text-xs text-gold">{essential.accessLabel}</p>

                <ul className="mt-7 space-y-3 border-t border-gold/20 pt-6 text-sm text-cream/85">
                  {essential.features.map((feature) => (
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
                  onClick={onSelectEssential}
                  className="w-full"
                >
                  Escolher Plano Essencial ({essential.priceFormatted})
                </Button>
              </div>
            </article>

            <article
              data-stagger-item
              className="relative flex flex-col justify-between rounded-3xl border-2 border-gold bg-cream p-7 text-pine editorial-shadow sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-[0.16em] text-crimson uppercase">
                    Coleção completa + 6 bônus
                  </p>
                  <span className="rounded-full bg-pine px-3 py-1 text-[11px] font-semibold text-gold">
                    Mais completo
                  </span>
                </div>
                <h3 className="mt-2 font-display text-3xl font-semibold text-pine">
                  {premium.name}
                </h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-semibold text-pine">
                    {premium.priceFormatted}
                  </span>
                  <span className="text-xs text-pine/65">pagamento único</span>
                </div>
                <p className="mt-2 text-xs font-medium text-crimson">{premium.accessLabel}</p>

                <ul className="mt-7 space-y-3 border-t border-pine/15 pt-6 text-sm text-pine/90">
                  {premium.features.map((feature) => (
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
                  onClick={onSelectPremium}
                  className="w-full"
                >
                  Quero o Plano Premium ({premium.priceFormatted})
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="garantia" className="bg-cream-warm py-16 sm:py-20">
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
                Garantia clara de {CAMPAIGN_CONFIG.guarantees.essentialDays} dias no Essencial e{" "}
                {CAMPAIGN_CONFIG.guarantees.premiumDays} dias no Premium
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-pine/80">
                Baixe os moldes, teste a impressão e avalie a qualidade das artes com calma.{" "}
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
              Perguntas frequentes
            </h2>
            <p className="mt-2.5 text-base text-pine/75">
              Respostas diretas sobre impressão, papel, entrega digital, licença e garantia.
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

      <section className="relative overflow-hidden bg-pine py-20 text-cream sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div data-reveal className="space-y-6">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-gold uppercase">
              <Calendar className="size-4" aria-hidden="true" />
              <span>
                Natal em {CAMPAIGN_CONFIG.campaignDate.displayLabel}
                {daysUntilChristmas !== null && daysUntilChristmas > 0
                  ? ` • faltam ${daysUntilChristmas} dias`
                  : ""}
              </span>
            </p>
            <h2 className="font-display text-3xl leading-tight font-semibold text-cream sm:text-5xl">
              Daqui a alguns dias, será Natal. O que você vai criar até lá?
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-cream/80">
              Garanta acesso imediato aos +500 moldes e comece hoje mesmo a montar lembranças com
              acabamento de loja usando uma folha de papel.
            </p>
            <div className="pt-2">
              <Button type="button" variant="crimson" size="xl" onClick={onJumpToPlans}>
                QUERO MEUS +500 MOLDES
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
              <p>Produto 100% digital em PDF. Doces, fitas e objetos decorativos não acompanham.</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gold">Licença de uso</p>
              <p>{CAMPAIGN_CONFIG.license.summary}</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-gold">Dados legais e privacidade</p>
              <p className="[overflow-wrap:anywhere]">
                Responsável: {CAMPAIGN_CONFIG.legal.merchantName}
                <br />
                Documento: {CAMPAIGN_CONFIG.legal.documentId}
                <br />
                Suporte: {CAMPAIGN_CONFIG.legal.supportEmail}
              </p>
              <button
                type="button"
                onClick={onResetConsent}
                className="inline-flex cursor-pointer items-center gap-1.5 text-gold underline underline-offset-4 hover:text-cream"
              >
                <Cookie className="size-3.5" aria-hidden="true" />
                Preferências de cookies e Meta Pixel (
                {consent === "granted"
                  ? "aceito"
                  : consent === "denied"
                    ? "recusado"
                    : "não definido"}
                )
              </button>
            </div>
          </div>

          {hasLegalPlaceholders && (
            <div className="rounded-xl border border-gold/30 bg-pine-surface px-4 py-3 text-cream/85">
              <strong className="text-gold">Aviso pré-publicação:</strong>{" "}
              {CAMPAIGN_CONFIG.legal.commercialNotice}
            </div>
          )}
        </div>
      </footer>
    </>
  );
}