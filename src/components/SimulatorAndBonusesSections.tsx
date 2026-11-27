import { useState } from "react";
import { AlertCircle, Calculator, MessageCircle, BookOpen, TrendingUp } from "lucide-react";

import bonusTagsBoxesImg from "@/assets/bonus-tags-boxes.webp";
import bonusManualGuideImg from "@/assets/bonus-manual-guide.webp";
import coneAtelierKitImg from "@/assets/cone-atelier-kit.webp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CAMPAIGN_CONFIG, type BonusItem } from "@/config/campaign";
import {
  SIMULATOR_LIMITS,
  calculateProfitSimulation,
  formatBRL,
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
          alt="Mockup de tags natalinas prontas com cordão dourado"
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
          alt="Mockup de caixinhas natalinas dobráveis em verde pinheiro e vermelho carmim"
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
          alt="Mockup de cartões natalinos dobráveis coordenados"
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
          alt="Mockup do manual ilustrado de montagem e dobra de cones natalinos"
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
          <span>Guia Prático PDF</span>
          <TrendingUp className="size-4" aria-hidden="true" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-cream">Natal Lucrativo</p>
          <p className="mt-1 text-xs text-cream/75">
            Planilha de insumos • Composição de kits • Agenda de entregas
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[10px] text-cream/85">
          <span className="rounded bg-pine-surface px-2 py-1 text-center">Custos reais</span>
          <span className="rounded bg-pine-surface px-2 py-1 text-center">Embalagem</span>
          <span className="rounded bg-pine-surface px-2 py-1 text-center">Encomendas</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] flex-col justify-between rounded-xl border border-gold/30 bg-pine p-4 text-cream">
      <div className="flex items-center justify-between text-[11px] tracking-wider text-gold uppercase">
        <span>Mensagens Prontas</span>
        <MessageCircle className="size-4" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <div className="max-w-[92%] rounded-xl rounded-tl-none bg-pine-surface px-3 py-2 text-xs leading-snug text-cream/90">
          “Oi! Estou preparando cones natalinos artesanais recheados sob encomenda para presentes
          deste ano.”
        </div>
        <div className="ml-auto flex max-w-[78%] items-center gap-1.5 rounded-xl rounded-tr-none bg-crimson/85 px-3 py-1.5 text-[11px] text-cream">
          <BookOpen className="size-3.5 shrink-0" aria-hidden="true" />
          Roteiros + catálogo para WhatsApp
        </div>
      </div>
    </div>
  );
}

export function SimulatorAndBonusesSections() {
  const [qtyText, setQtyText] = useState("40");
  const [priceText, setPriceText] = useState("18");
  const [costText, setCostText] = useState("5.5");

  const parsedQty = parseFieldNumber(qtyText);
  const parsedPrice = parseFieldNumber(priceText);
  const parsedCost = parseFieldNumber(costText);

  const hasValidationWarning =
    Number.isNaN(parsedQty) ||
    Number.isNaN(parsedPrice) ||
    Number.isNaN(parsedCost) ||
    parsedQty < SIMULATOR_LIMITS.minQuantity ||
    parsedQty > SIMULATOR_LIMITS.maxQuantity ||
    parsedPrice < SIMULATOR_LIMITS.minPrice ||
    parsedPrice > SIMULATOR_LIMITS.maxPrice ||
    parsedCost < SIMULATOR_LIMITS.minCost ||
    parsedCost > SIMULATOR_LIMITS.maxCost;

  const result = calculateProfitSimulation({
    quantity: parsedQty,
    unitPrice: parsedPrice,
    unitCost: parsedCost,
  });

  return (
    <>
      <section id="simulador" className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
              Quer transformar seus cones em renda extra artesanal? Simule seu cenário
            </h2>
            <p className="mt-3 text-base leading-relaxed text-pine/75">
              Ajuste quantidade, preço sugerido e custo real de papel, fita e doces na sua cidade
              para estimar sua margem antes de produzir.
            </p>
          </div>

          <div
            data-reveal
            className="mt-10 grid gap-8 rounded-3xl border border-pine/15 bg-card p-6 editorial-shadow sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
          >
            <div className="space-y-6">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="sim-qty" className="text-sm font-semibold text-pine">
                    Quantidade de cones
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
                  aria-label="Selecionar quantidade de cones"
                  min={SIMULATOR_LIMITS.minQuantity}
                  max={250}
                  step={5}
                  value={[Math.min(250, result.quantity)]}
                  onValueChange={([v]) => {
                    if (v !== undefined) setQtyText(String(v));
                  }}
                />
                <p className="text-xs text-pine/60">
                  Permitido: {SIMULATOR_LIMITS.minQuantity} a {SIMULATOR_LIMITS.maxQuantity}{" "}
                  unidades.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="sim-price" className="text-sm font-semibold text-pine">
                    Preço de venda por unidade (R$)
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
                  aria-label="Selecionar preço de venda por unidade"
                  min={5}
                  max={60}
                  step={1}
                  value={[Math.min(60, Math.max(5, result.unitPrice))]}
                  onValueChange={([v]) => {
                    if (v !== undefined) setPriceText(String(v));
                  }}
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="sim-cost" className="text-sm font-semibold text-pine">
                    Custo estimado por unidade — papel, fita e doces (R$)
                  </Label>
                  <Input
                    id="sim-cost"
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min={SIMULATOR_LIMITS.minCost}
                    max={SIMULATOR_LIMITS.maxCost}
                    value={costText}
                    onChange={(e) => setCostText(e.target.value)}
                    className="h-9 w-24 text-right font-semibold"
                  />
                </div>
                <Slider
                  aria-label="Selecionar custo estimado por unidade"
                  min={0}
                  max={40}
                  step={0.5}
                  value={[Math.min(40, result.unitCost)]}
                  onValueChange={([v]) => {
                    if (v !== undefined) setCostText(String(v));
                  }}
                />
              </div>

              {hasValidationWarning && (
                <p
                  role="status"
                  className="flex items-start gap-2 rounded-xl border border-crimson/30 bg-crimson/10 px-3.5 py-2.5 text-xs text-crimson"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>
                    Informe valores numéricos válidos dentro dos limites permitidos; o cálculo ao
                    lado considera os valores ajustados automaticamente.
                  </span>
                </p>
              )}
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-pine p-6 text-cream">
              <div>
                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                  <span className="text-xs font-semibold tracking-wider text-gold uppercase">
                    Estimativa ilustrativa
                  </span>
                  <Calculator className="size-4 text-gold" aria-hidden="true" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-cream/70">Receita bruta estimada</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-cream">
                      {formatBRL(result.grossRevenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cream/70">Custo total estimado</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-cream/90">
                      {formatBRL(result.totalCost)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cream/70">Margem por unidade</p>
                    <p className="mt-1 text-lg font-semibold text-gold">
                      {formatBRL(result.unitMargin)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cream/70">Margem percentual</p>
                    <p className="mt-1 text-lg font-semibold text-gold">
                      {result.marginPercent.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-gold/30 bg-pine-surface p-4">
                  <p className="text-xs text-cream/75">
                    Resultado líquido estimado ({result.quantity} unidades)
                  </p>
                  <p className="mt-1 font-display text-3xl font-semibold text-gold">
                    {formatBRL(result.estimatedNet)}
                  </p>
                  {result.isUnitLoss && (
                    <p className="mt-2 text-xs text-cream/90">
                      Atenção: o custo informado está maior que o preço de venda por unidade.
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-5 border-t border-gold/20 pt-4 text-xs leading-relaxed text-cream/70">
                <strong>Ressalva importante:</strong> esta simulação é apenas uma calculadora
                ilustrativa baseada nos números que você escolheu. Não existe promessa ou garantia
                de vendas ou lucro — resultados reais dependem dos custos locais, divulgação,
                qualidade da montagem e demanda.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="bonus" className="bg-cream-warm py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
              Seis bônus inclusos no Plano Premium
            </h2>
            <p className="mt-3 text-base leading-relaxed text-pine/75">
              Além da biblioteca completa organizada por categorias e do tutorial avançado, o Plano
              Premium entrega seis materiais complementares para elevar cada entrega.
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
                  <span>Bônus {bonus.number}</span>
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