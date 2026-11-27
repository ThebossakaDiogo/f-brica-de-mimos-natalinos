import { useState } from "react";
import { ArrowRight, Scissors, Printer, Sparkles, Gift, MoveHorizontal } from "lucide-react";

import heroConesImg from "@/assets/hero-cones.webp";
import beforeSheetImg from "@/assets/before-sheet.webp";
import afterConeImg from "@/assets/after-cone.webp";
import { Button } from "@/components/ui/button";
import { BENEFITS, FOUR_STEPS } from "@/config/content";
import { CAMPAIGN_CONFIG } from "@/config/campaign";
import { SnowfallOverlay } from "@/components/SnowfallOverlay";

interface HeroAndStoryProps {
  onJumpToPlans: () => void;
}

const STEP_ICONS = [Printer, Scissors, Gift, Sparkles] as const;

export function HeroAndStorySections({ onJumpToPlans }: HeroAndStoryProps) {
  const [revealPercent, setRevealPercent] = useState(52);

  return (
    <>
      <section
        id="topo"
        className="relative overflow-hidden bg-pine text-cream hero-vignette"
      >
        <SnowfallOverlay />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pt-5 pb-3 sm:px-8 sm:pt-7">
          <a
            href="#topo"
            className="font-display text-lg font-semibold tracking-tight text-cream sm:text-xl"
          >
            {CAMPAIGN_CONFIG.brandName}
          </a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm text-cream/80 md:flex">
            <a href="#antes-depois" className="transition-colors hover:text-gold">
              Antes &amp; Depois
            </a>
            <a href="#catalogo" className="transition-colors hover:text-gold">
              Catálogo
            </a>
            <a href="#simulador" className="transition-colors hover:text-gold">
              Simulador
            </a>
            <a href="#planos" className="text-gold font-medium transition-colors hover:text-cream">
              Ver planos
            </a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pt-6 pb-16 sm:px-8 sm:pt-10 sm:pb-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              <span className="h-px w-6 bg-gold/70" aria-hidden="true" />
              {CAMPAIGN_CONFIG.editionLabel} • +500 Moldes Digitais
            </p>

            <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-cream sm:text-5xl lg:text-[3.55rem]">
              Antes de gastar uma fortuna com lembrancinhas de Natal, veja o que você consegue fazer
              com uma simples folha de papel.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              Transforme papel em presentes encantadores com mais de 500 moldes natalinos prontos
              para imprimir, recortar e montar.
            </p>

            <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:gap-5">
              <Button
                type="button"
                variant="crimson"
                size="xl"
                onClick={onJumpToPlans}
                className="w-full sm:w-auto"
              >
                QUERO MEUS +500 MOLDES
                <ArrowRight className="size-4" />
              </Button>
              <div className="text-sm text-cream/80">
                <span className="font-semibold text-gold">A partir de R$ 10</span>
                <span className="mx-2 text-gold/50">•</span>
                <span>Acesso imediato em PDF</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              data-parallax="hero"
              className="relative overflow-hidden rounded-3xl border border-gold/25 bg-pine-surface editorial-shadow"
            >
              <img
                src={heroConesImg}
                alt="Cones natalinos de papel feitos à mão em verde pinheiro, vermelho carmim e creme, recheados de trufas e doces"
                width={1024}
                height={1536}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-pine/85 via-pine/25 to-transparent" />
              <p className="absolute right-5 bottom-4 left-5 text-xs tracking-wide text-cream/90">
                Cones de papel A4 impressos, recortados e finalizados com fita de cetim e doces.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px w-full gold-rule" aria-hidden="true" />
      </section>

      <section id="beneficios" className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-4xl">
              Lembranças memoráveis sem estourar o orçamento de dezembro
            </h2>
            <p className="mt-3 text-base leading-relaxed text-pine/75">
              Cada detalhe dos moldes foi pensado para que qualquer pessoa alcance um acabamento
              firme, limpo e elegante usando apenas impressora, tesoura e cola.
            </p>
          </div>

          <div
            data-stagger-group
            className="mt-12 grid gap-8 border-t border-pine/15 pt-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {BENEFITS.map((item) => (
              <article key={item.number} data-stagger-item className="space-y-3">
                <span className="font-display text-2xl font-medium text-gold-deep">
                  {item.number}
                </span>
                <h3 className="font-display text-xl leading-snug font-semibold text-pine">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-pine/75">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="antes-depois" className="bg-cream-warm py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
            <div data-reveal className="space-y-5">
              <h2 className="font-display text-3xl leading-tight font-semibold text-pine sm:text-5xl">
                Parece comprado em uma loja. Mas foi você quem fez.
              </h2>
              <p className="text-base leading-relaxed text-pine/80">
                Tudo começa com uma folha A4 impressa com as marcas exatas de corte e dobra. Em
                poucos minutos, a folha lisa ganha volume, laço e recheio — pronta para encantar
                quem recebe.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-pine/15 pt-5 text-sm">
                <div>
                  <p className="font-semibold text-crimson">Antes</p>
                  <p className="mt-1 text-pine/75">
                    1 folha A4 impressa com o molde escolhido e linhas de vinco.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-pine">Depois</p>
                  <p className="mt-1 text-pine/75">
                    Cone firme de papelaria fina, recheado de doces e finalizado com fita.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Button
                  type="button"
                  variant={revealPercent < 40 ? "crimson" : "pineOutline"}
                  size="sm"
                  onClick={() => setRevealPercent(15)}
                >
                  Ver folha impressa
                </Button>
                <Button
                  type="button"
                  variant={revealPercent > 60 ? "crimson" : "pineOutline"}
                  size="sm"
                  onClick={() => setRevealPercent(85)}
                >
                  Ver cone pronto
                </Button>
              </div>
            </div>

            <div data-reveal className="space-y-3">
              <div className="relative overflow-hidden rounded-3xl border border-pine/15 bg-pine editorial-shadow">
                <div className="relative aspect-[4/5] w-full select-none">
                  <img
                    src={beforeSheetImg}
                    alt="Antes: folha de papel A4 impressa com molde plano de cone natalino ao lado de tesoura e cola"
                    width={900}
                    height={1350}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - revealPercent}% 0 0)` }}
                  >
                    <img
                      src={afterConeImg}
                      alt="Depois: cone natalino de papel montado com laço dourado e recheado de trufas e bengalas doces"
                      width={900}
                      height={1350}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-0.5 bg-gold"
                    style={{ left: `${revealPercent}%` }}
                  >
                    <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-pine text-cream shadow-lg">
                      <MoveHorizontal className="size-4" />
                    </span>
                  </div>

                  <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-pine/85 px-3 py-1 text-xs font-medium text-cream backdrop-blur-xs">
                    Depois • Montado
                  </span>
                  <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-pine backdrop-blur-xs">
                    Antes • Folha A4
                  </span>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={revealPercent}
                    onChange={(event) => setRevealPercent(Number(event.target.value))}
                    aria-label="Comparar antes e depois: arraste para revelar o cone montado"
                    className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                  />
                </div>
              </div>
              <p className="text-center text-xs text-pine/65">
                Arraste sobre a imagem para comparar o molde impresso com o cone finalizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="passos" className="bg-pine py-16 text-cream sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-semibold text-cream sm:text-4xl">
              Quatro passos simples da folha até o presente pronto
            </h2>
            <p className="mt-3 text-base text-cream/75">
              Sem software complicado nem equipamentos caros: só seguir a sequência.
            </p>
          </div>

          <ol
            data-stagger-group
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {FOUR_STEPS.map((item, idx) => {
              const Icon = STEP_ICONS[idx] ?? Sparkles;
              return (
                <li
                  key={item.step}
                  data-stagger-item
                  className="flex flex-col justify-between rounded-2xl border border-gold/20 bg-pine-surface p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-medium text-gold">
                        {item.step}
                      </span>
                      <Icon className="size-5 text-gold/80" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-cream/75">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}