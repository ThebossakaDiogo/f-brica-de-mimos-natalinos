import coneClassicRed from "@/assets/cone-classic-red.webp";
import conePineGold from "@/assets/cone-pine-gold.webp";
import coneNordicCream from "@/assets/cone-nordic-cream.webp";
import coneGingerbread from "@/assets/cone-gingerbread.webp";
import coneRoyalVelvet from "@/assets/cone-royal-velvet.webp";
import coneAtelierKit from "@/assets/cone-atelier-kit.webp";

export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  paperNote: string;
  description: string;
  image: string;
  alt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BENEFITS = [
  {
    number: "01",
    title: "Economia real sem abrir mão do charme",
    description:
      "Com uma folha A4 de papel firme e seus doces favoritos, você monta lembranças com aparência de boutique por uma fração do preço pronto.",
  },
  {
    number: "02",
    title: "Mais de 500 moldes prontos para imprimir",
    description:
      "Estampas clássicas, botânicas, nórdicas, infantis e minimalistas — com marcas de recorte e vinco já preparadas para facilitar a montagem.",
  },
  {
    number: "03",
    title: "Funciona com impressora comum ou gráfica",
    description:
      "Os arquivos chegam em PDF tamanho A4 em alta definição para imprimir em casa ou levar à gráfica rápida da sua cidade.",
  },
  {
    number: "04",
    title: "Presente afetivo ou renda artesanal",
    description:
      "Crie mimos para família, escola, amigos secretos e equipes — ou monte kits sob encomenda com controle total do seu custo.",
  },
] as const;

export const FOUR_STEPS = [
  {
    step: "01",
    title: "Imprimir",
    description:
      "Escolha o molde na coleção e imprima em folha A4 (recomendado papel 180g a 240g, fosco ou fotográfico).",
  },
  {
    step: "02",
    title: "Recortar",
    description:
      "Siga as linhas externas limpas com tesoura comum — sem precisar de máquina de corte profissional.",
  },
  {
    step: "03",
    title: "Montar",
    description:
      "Dobre na aba indicada, passe um fio de cola ou fita dupla face e finalize o cone com laço ou tag.",
  },
  {
    step: "04",
    title: "Surpreender",
    description:
      "Recheie com trufas, bombons, balas ou biscoitos e entregue uma lembrança que parece saída de loja.",
  },
] as const;

export const CATALOG_ITEMS: readonly CatalogItem[] = [
  {
    id: "classic-red",
    title: "Clássico Carmim & Ouro",
    category: "Coleção Tradicional",
    paperNote: "Papel fosco 180g + fita dourada",
    description:
      "Estampa vermelha profunda com detalhes dourados pensada para trufas artesanais, bombons e balas de hortelã.",
    image: coneClassicRed,
    alt: "Cone natalino de papel vermelho carmim com detalhes dourados recheado de trufas e bombons",
  },
  {
    id: "pine-gold",
    title: "Pinheiro Botânico",
    category: "Coleção Editorial",
    paperNote: "Offset 240g + acabamento fosco",
    description:
      "Verde pinheiro fechado com ramos dourados para mesas postas, presentes corporativos e cestas natalinas.",
    image: conePineGold,
    alt: "Cone natalino de papel verde pinheiro com folhas douradas recheado de chocolates",
  },
  {
    id: "nordic-cream",
    title: "Nórdico Creme & Neve",
    category: "Coleção Escandinava",
    paperNote: "Papel creme texturizado 180g",
    description:
      "Fundo creme acolhedor com flocos e traços vermelhos, ideal para biscoitos amanteigados, marshmallows e gotas de chocolate.",
    image: coneNordicCream,
    alt: "Cone natalino de papel creme com estampa nórdica vermelha recheado de biscoitos e marshmallows",
  },
  {
    id: "gingerbread",
    title: "Pão de Mel & Frutas",
    category: "Coleção Aconchego",
    paperNote: "Papel kraft ou creme 200g",
    description:
      "Ilustração afetiva de casinhas natalinas e frutinhas vermelhas para lembranças de escola, família e amigos.",
    image: coneGingerbread,
    alt: "Cone natalino de papel em tons creme e vermelho com padrão de pão de mel recheado de doces",
  },
  {
    id: "royal-velvet",
    title: "Damasco & Veludo",
    category: "Coleção Noite Feliz",
    paperNote: "Fotográfico fosco 230g",
    description:
      "Combinação sofisticada de verde escuro, carmim e dourado para entregas que pedem presença de boutique.",
    image: coneRoyalVelvet,
    alt: "Cone natalino de papel verde e vermelho damasco com acabamento dourado e chocolates",
  },
  {
    id: "atelier-kit",
    title: "Conjunto Ateliê Completo",
    category: "Coleção + Bônus Premium",
    paperNote: "Cones + tags + caixinhas + cartões",
    description:
      "Integração visual entre cones, etiquetas De/Para, caixinhas dobráveis e cartões coordenados no Plano Premium.",
    image: coneAtelierKit,
    alt: "Coleção natalina de papel com cones recheados, tags, caixinhas e cartões coordenados",
  },
];

export const BENEFIT_ANCHOR_ITEMS = [
  {
    label: "Mais de 500 moldes de cones natalinos",
    detail: "Variedade para diferentes públicos, idades e estilos de celebração.",
    essential: true,
    premium: true,
  },
  {
    label: "Acesso imediato em PDF A4",
    detail: "Prontos para imprimir em casa ou em gráfica rápida quantas vezes precisar.",
    essential: true,
    premium: true,
  },
  {
    label: "Tutorial de impressão e montagem",
    detail: "Versão básica no Essencial; versão completa de acabamento no Premium.",
    essential: true,
    premium: true,
  },
  {
    label: "Biblioteca organizada por categorias",
    detail: "Encontre o estilo ideal em segundos sem perder tempo procurando pastas.",
    essential: false,
    premium: true,
  },
  {
    label: "6 bônus completos (tags, caixinhas, cartões, manual e guias)",
    detail: "Papelaria coordenada e apoio prático para montar e apresentar seus mimos.",
    essential: false,
    premium: true,
  },
  {
    label: "Garantia incondicional",
    detail: "7 dias no Plano Essencial • 30 dias no Plano Premium.",
    essential: true,
    premium: true,
  },
] as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "faq-1",
    question: "Como recebo acesso aos moldes após a compra?",
    answer:
      "Assim que o pagamento é confirmado pela plataforma oficial de checkout, você recebe o acesso digital imediatamente por e-mail para baixar os arquivos em PDF.",
  },
  {
    id: "faq-2",
    question: "Preciso de máquina de corte (Silhouette ou Cricut)?",
    answer:
      "Não. Todos os moldes foram desenhados para serem recortados facilmente com tesoura comum ou estilete, seguindo as linhas guias de corte e dobra.",
  },
  {
    id: "faq-3",
    question: "Qual papel é recomendado para ficar firme como de loja?",
    answer:
      "Papel offset, fotográfico fosco ou vergê entre 180g e 240g em tamanho A4 oferece estrutura firme e ótimo acabamento. Se sua impressora aceitar apenas papel mais fino, você também pode imprimir em gráfica rápida.",
  },
  {
    id: "faq-4",
    question: "Posso imprimir em impressora caseira comum?",
    answer:
      "Sim. Os arquivos estão formatados em tamanho A4 padrão. Basta ajustar a impressão para 'Tamanho real (100%)' e qualidade alta.",
  },
  {
    id: "faq-5",
    question: "O produto é físico ou digital?",
    answer:
      "100% digital. Você não recebe cones nem doces pelo correio — recebe os moldes digitais prontos para imprimir, recortar, montar e rechear como preferir.",
  },
  {
    id: "faq-6",
    question: "Qual a diferença entre o Plano Essencial e o Plano Premium?",
    answer:
      "O Essencial (R$ 10,00) entrega os +500 moldes, tutorial básico, acesso imediato e garantia de 7 dias. O Premium (R$ 27,90) inclui tudo isso mais biblioteca organizada por categorias, tutorial completo, os 6 bônus exclusivos e garantia estendida de 30 dias.",
  },
  {
    id: "faq-7",
    question: "Posso vender os cones que eu montar para fazer renda extra?",
    answer:
      "Sim. A licença permite produzir e vender as peças físicas montadas por você (recheadas ou vazias). O que não é permitido é revender, compartilhar ou redistribuir os arquivos digitais/moldes em PDF.",
  },
  {
    id: "faq-8",
    question: "Nunca trabalhei com papelaria personalizada. Vou conseguir montar?",
    answer:
      "Sim. O molde de cone tem montagem intuitiva em quatro passos — imprimir, recortar, dobrar na aba e colar. Os tutoriais acompanham dicas simples para um fechamento limpo.",
  },
  {
    id: "faq-9",
    question: "Como funciona a garantia de 7 ou 30 dias?",
    answer:
      "Se você perceber que o material não atende ao que esperava, pode solicitar o reembolso integral dentro do prazo do plano contratado (7 dias no Essencial ou 30 dias no Premium), sem burocracia.",
  },
  {
    id: "faq-10",
    question: "Por quanto tempo posso baixar e usar os arquivos?",
    answer:
      "Depois de baixar seus PDFs, você pode salvá-los no computador ou celular e imprimir quantas vezes quiser para este e para os próximos Natais, respeitando os termos de licença.",
  },
];