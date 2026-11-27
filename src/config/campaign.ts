export type PlanKey = "essential" | "premium" | "essentialUpgrade";

export interface PlanConfig {
  key: PlanKey;
  name: string;
  price: number;
  priceFormatted: string;
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
  brandName: "Fábrica de Mimos Natalinos",
  editionLabel: "Edição Especial de Natal",
  /** Data real do Natal desta campanha (sem contador regressivo artificial). */
  campaignDate: {
    christmasIso: "2026-12-25",
    displayLabel: "25 de dezembro de 2026",
  },
  /**
   * Placeholders explícitos de checkout.
   * Substitua pelas URLs reais do seu gateway de pagamento antes de publicar.
   */
  plans: {
    essential: {
      key: "essential",
      name: "Plano Essencial",
      price: 10,
      priceFormatted: "R$ 10,00",
      guaranteeDays: 7,
      checkoutUrl: "CONFIGURE_CHECKOUT_URL_ESSENCIAL",
      accessLabel: "Acesso imediato após confirmação",
      features: [
        "+500 moldes natalinos de cones de papel prontos para imprimir",
        "Tutorial básico de impressão, recorte e montagem",
        "Acesso imediato em PDF de alta resolução",
        "Garantia incondicional de 7 dias",
      ],
    },
    premium: {
      key: "premium",
      name: "Plano Premium",
      price: 27.9,
      priceFormatted: "R$ 27,90",
      guaranteeDays: 30,
      checkoutUrl: "CONFIGURE_CHECKOUT_URL_PREMIUM",
      accessLabel: "Acesso imediato à coleção completa",
      features: [
        "Tudo do Plano Essencial (+500 moldes natalinos)",
        "Biblioteca organizada por categorias e estilos",
        "Tutorial completo com acabamento de loja e escolha de papéis",
        "Todos os 6 bônus exclusivos com moldes e materiais extras",
        "Garantia estendida de 30 dias",
      ],
    },
    essentialUpgrade: {
      key: "essentialUpgrade",
      name: "Upgrade para o Plano Premium",
      price: 20,
      priceFormatted: "R$ 20,00",
      guaranteeDays: 30,
      checkoutUrl: "CONFIGURE_CHECKOUT_URL_UPGRADE_PREMIUM",
      accessLabel: "Condição de upgrade no clique do Essencial",
      features: [
        "Tudo do Plano Premium completo por R$ 20,00 no total",
        "Biblioteca por categorias + tutorial completo + 6 bônus",
        "Garantia estendida de 30 dias",
      ],
    },
  } satisfies Record<PlanKey, PlanConfig>,
  bonuses: [
    {
      id: "tags",
      number: "01",
      title: "Tags Natalinas Prontas",
      subtitle: "Etiquetas coordenadas De / Para",
      description:
        "Folhas prontas com etiquetas natalinas coordenadas aos cones para assinar cada mimo com cuidado.",
      format: "PDF A4 • Prontas para recorte",
      mockupKind: "tags",
    },
    {
      id: "boxes",
      number: "02",
      title: "Caixinhas Natalinas",
      subtitle: "Moldes extras para bombons e biscoitos",
      description:
        "Modelos dobráveis compactos para compor kits com trufas, pães de mel ou lembranças corporativas.",
      format: "PDF A4 • Vincos marcados",
      mockupKind: "boxes",
    },
    {
      id: "cards",
      number: "03",
      title: "Cartões de Natal",
      subtitle: "Papelaria editorial para acompanhar o presente",
      description:
        "Cartões dobráveis com ilustrações festivas e espaço interno limpo para mensagens manuscritas.",
      format: "PDF A4 • Frente e verso",
      mockupKind: "cards",
    },
    {
      id: "manual",
      number: "04",
      title: "Manual de Montagem",
      subtitle: "Guia ilustrado de papel, impressão e dobra",
      description:
        "Orientações práticas sobre gramaturas recomendadas, corte preciso, tipos de cola e laços firmes.",
      format: "Guia digital ilustrado",
      mockupKind: "manual",
    },
    {
      id: "guide",
      number: "05",
      title: "Guia Natal Lucrativo",
      subtitle: "Organização de custos, kits e precificação",
      description:
        "Passo a passo realista para calcular insumos, estruturar encomendas e organizar a produção artesanal.",
      format: "Material prático em PDF",
      mockupKind: "guide",
    },
    {
      id: "whatsapp",
      number: "06",
      title: "Kit Divulgação WhatsApp",
      subtitle: "Textos editáveis e roteiro de apresentação",
      description:
        "Modelos de mensagens discretas e vitrines para apresentar seus mimos prontos a amigos, escola e clientes.",
      format: "Modelos prontos para copiar",
      mockupKind: "whatsapp",
    },
  ] satisfies readonly BonusItem[],
  /**
   * Avaliações reais verificadas.
   * Mantido vazio por padrão: a seção permanece oculta até você preencher depoimentos reais.
   */
  testimonials: [] as readonly VerifiedTestimonial[],
  license: {
    summary:
      "Uso pessoal e venda artesanal das peças físicas montadas por você. É proibida a revenda, doação ou redistribuição dos arquivos digitais/moldes em PDF.",
  },
  guarantees: {
    essentialDays: 7,
    premiumDays: 30,
    note: "Solicite o reembolso integral dentro do prazo do plano escolhido pelos canais oficiais da plataforma de pagamento ou suporte abaixo.",
  },
  analytics: {
    /** Substitua pelo ID numérico do seu Meta Pixel antes de publicar. */
    metaPixelId: "CONFIGURE_META_PIXEL_ID",
    consentStorageKey: "fmn_analytics_consent_v1",
  },
  legal: {
    /** Placeholders explícitos: confirme e substitua antes de publicar. */
    merchantName: "CONFIGURE_RAZAO_SOCIAL_OU_NOME_RESPONSAVEL",
    documentId: "CONFIGURE_CNPJ_OU_CPF",
    supportEmail: "CONFIGURE_EMAIL_DE_SUPORTE",
    privacyPolicyUrl: "CONFIGURE_URL_POLITICA_DE_PRIVACIDADE",
    termsUrl: "CONFIGURE_URL_TERMOS_DE_USO",
    commercialNotice:
      "Antes de publicar, substitua os placeholders de checkout, dados legais, Pixel e revise preços, garantias e licença em src/config/campaign.ts.",
  },
} as const;

export function isPlaceholderValue(value: string): boolean {
  return value.trim() === "" || value.startsWith("CONFIGURE_");
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