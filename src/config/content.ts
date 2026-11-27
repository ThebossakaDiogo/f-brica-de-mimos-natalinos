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
  occasionNote: string;
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
    title: "Boutique look at a fraction of store prices",
    description:
      "Pair one sheet of sturdy cardstock with chocolates, peppermint bark, or homemade cookies to create heirloom-feel favors without boutique markups.",
  },
  {
    number: "02",
    title: "500+ curated holiday designs ready to print",
    description:
      "Classic cranberry, botanical evergreen, Scandinavian ivory, playful gingerbread, and gilded motifs — each with clean trim and fold guides built in.",
  },
  {
    number: "03",
    title: "Home printer or local print shop ready",
    description:
      "High-resolution PDF files sized for US Letter and A4 paper so you can print on a standard home inkjet printer or at any neighborhood print shop.",
  },
  {
    number: "04",
    title: "Heartfelt gifting or seasonal handmade income",
    description:
      "Craft memorable favors for family tables, teachers, and coworkers — or assemble physical treat cones to sell locally under the handmade commercial license.",
  },
] as const;

export const USE_CASES = [
  {
    label: "Family & Table Settings",
    detail:
      "Personalized place-setting cones filled with truffles or spiced nuts for Christmas Eve dinner.",
  },
  {
    label: "Teachers & Classrooms",
    detail:
      "Coordinated ribboned favors you can assemble in an evening for teachers, coaches, and classmates.",
  },
  {
    label: "Holiday Craft Fairs",
    detail:
      "Eye-catching display batches packaged in clear cellophane bags for weekend seasonal markets.",
  },
  {
    label: "Office & Client Thank-Yous",
    detail:
      "Polished evergreen-and-gold cones ready for small businesses, salons, realtors, and local teams.",
  },
  {
    label: "Local Pre-Order Gift Sets",
    detail:
      "Curated 4-pack or 12-pack handmade bundles shared with neighbors, church groups, and local networks.",
  },
] as const;

export const FOUR_STEPS = [
  {
    step: "01",
    title: "Print",
    description:
      "Pick your favorite designs and print at 100% scale on 65–90 lb cardstock (180–240 gsm), matte or satin finish.",
  },
  {
    step: "02",
    title: "Cut",
    description:
      "Follow the crisp outer guidelines with everyday household scissors or a craft knife — no Cricut or cutting machine needed.",
  },
  {
    step: "03",
    title: "Assemble",
    description:
      "Crease along the marked tab, seal cleanly with double-sided tape or craft glue, and finish with satin ribbon or a gift tag.",
  },
  {
    step: "04",
    title: "Gift or Sell",
    description:
      "Fill with truffles, biscotti, candy canes, or cocoa mix to delight loved ones — or package finished handmade sets for local buyers.",
  },
] as const;

export const PRINT_CREATE_SELL_ROADMAP = [
  {
    stage: "Stage 01 • Print",
    title: "Test one sheet & lock your supply cost",
    detail:
      "Run a 3-design sample batch on 65–90 lb cardstock, weigh your favorite fillings, and calculate your exact per-cone material cost in USD before buying in bulk.",
  },
  {
    stage: "Stage 02 • Create",
    title: "Batch-assemble a cohesive 3-style menu",
    detail:
      "Cut and fold in assembly-line order (print, cut, crease, seal, ribbon) so 20 to 50 cones come together cleanly in an evening with consistent boutique presentation.",
  },
  {
    stage: "Stage 03 • Sell Locally",
    title: "Photograph & take seasonal pre-orders",
    detail:
      "Snap natural-light photos of your assembled cones, offer single favors or 6- and 12-pack bundles to neighbors, schools, offices, or craft fairs, and produce to order.",
  },
] as const;

export const CATALOG_ITEMS: readonly CatalogItem[] = [
  {
    id: "classic-red",
    title: "Classic Cranberry & Gold",
    category: "Heritage Collection",
    paperNote: "65 lb (180 gsm) matte cardstock + gold satin ribbon",
    occasionNote: "Ideal for truffles, wrapped chocolates & holiday host gifts",
    description:
      "Deep holiday cranberry paired with fine gilded flourishes — designed for artisan truffles, wrapped chocolates, and peppermint candies.",
    image: coneClassicRed,
    alt: "Handmade cranberry red Christmas paper cone with gold details filled with chocolate truffles",
  },
  {
    id: "pine-gold",
    title: "Evergreen Botanical",
    category: "Editorial Collection",
    paperNote: "90 lb (240 gsm) smooth cardstock + matte finish",
    occasionNote: "Ideal for dinner place settings & corporate thank-yous",
    description:
      "Rich pine evergreen accented with botanical gold sprigs for holiday table settings, client appreciation favors, and curated gift baskets.",
    image: conePineGold,
    alt: "Deep evergreen Christmas paper cone with botanical gold foliage filled with chocolates",
  },
  {
    id: "nordic-cream",
    title: "Nordic Ivory & Snow",
    category: "Scandinavian Collection",
    paperNote: "65 lb (180 gsm) textured ivory cardstock",
    occasionNote: "Ideal for shortbread cookies, marshmallows & cocoa toppers",
    description:
      "Warm ivory backdrop with crisp crimson snowflakes and Nordic stitchwork, tailored for butter cookies, marshmallows, and cocoa bombs.",
    image: coneNordicCream,
    alt: "Warm ivory Scandinavian-style Christmas paper cone filled with cookies and marshmallows",
  },
  {
    id: "gingerbread",
    title: "Gingerbread & Holly",
    category: "Cozy Keepsake Collection",
    paperNote: "75 lb (200 gsm) kraft or warm ivory paper",
    occasionNote: "Ideal for classroom favors, neighbors & family stockings",
    description:
      "Storybook gingerbread cottages and winter berries crafted for teacher gifts, school parties, and charming family stocking stuffers.",
    image: coneGingerbread,
    alt: "Ivory and red gingerbread-patterned Christmas paper cone filled with festive sweets",
  },
  {
    id: "royal-velvet",
    title: "Damask & Velvet",
    category: "Silent Night Collection",
    paperNote: "85 lb (230 gsm) matte photo cardstock",
    occasionNote: "Ideal for boutique gift sets & craft market centerpieces",
    description:
      "An opulent pairing of deep evergreen, cranberry damask, and warm gold detailing built to stand out on holiday gift tables and craft displays.",
    image: coneRoyalVelvet,
    alt: "Evergreen and cranberry damask Christmas paper cone with gold trim filled with chocolates",
  },
  {
    id: "atelier-kit",
    title: "Complete Workshop Suite",
    category: "PRO Collection + 6 Bonuses",
    paperNote: "Cones + coordinated gift tags + favor boxes + greeting cards",
    occasionNote: "Ideal for matching holiday gift bundles & pre-order menus",
    description:
      "Visual harmony across cones, To/From tags, compact favor boxes, and matching greeting cards unlocked inside the PRO Plan.",
    image: coneAtelierKit,
    alt: "Coordinated handmade Christmas paper cone suite with matching gift tags, boxes, and greeting cards",
  },
];

export const BENEFIT_ANCHOR_ITEMS = [
  {
    label: "500+ printable Christmas cone templates",
    detail: "Wide range of heirloom, Nordic, botanical, playful, and classic patterns.",
    basic: true,
    pro: true,
  },
  {
    label: "Instant US Letter & A4 high-resolution PDFs",
    detail: "Print at home or at any local copy shop as many times as you need.",
    basic: true,
    pro: true,
  },
  {
    label: "Printing & boutique-finish assembly tutorial",
    detail: "Essential starter guide in Basic; complete cardstock & finishing manual in PRO.",
    basic: true,
    pro: true,
  },
  {
    label: "Theme-organized template library",
    detail: "Browse by holiday palette, occasion, and style in seconds without digging through folders.",
    basic: false,
    pro: true,
  },
  {
    label: "All 6 curated bonuses (tags, boxes, cards, manual & guides)",
    detail: "Coordinated stationery plus practical costing and local outreach templates.",
    basic: false,
    pro: true,
  },
  {
    label: "Handmade commercial license (physical crafts) & guarantee",
    detail: "Sell assembled physical cones you make • 7-day Basic / 30-day PRO guarantee.",
    basic: true,
    pro: true,
  },
] as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I receive my templates after purchasing?",
    answer:
      "Immediately after payment is confirmed through the official checkout platform, you receive digital download access by email so you can save and print your PDF templates right away.",
  },
  {
    id: "faq-2",
    question: "Do I need a cutting machine like a Cricut or Silhouette?",
    answer:
      "Not at all. Every cone template is designed with clean outer trim lines and fold marks so you can cut them neatly with standard household scissors or a craft knife.",
  },
  {
    id: "faq-3",
    question: "What paper weight works best for a sturdy boutique feel?",
    answer:
      "We recommend 65 lb to 90 lb cardstock (180–240 gsm) in matte, smooth cover, or linen finish. If your home printer prefers lighter paper, any local print shop can print the PDFs on heavy cardstock for pennies per sheet.",
  },
  {
    id: "faq-4",
    question: "Can I print these on a regular home printer in US Letter or A4?",
    answer:
      "Yes. The printable PDF files are prepared for both US Letter (8.5 × 11 in) and international A4 sheets. Simply select 'Actual Size (100%)' and Best/High print quality in your printer dialog.",
  },
  {
    id: "faq-5",
    question: "Is this a physical shipment or a digital download?",
    answer:
      "This is a 100% digital PDF product. No physical cones, ribbons, or candies are mailed — you download the printable templates and craft as many cones as you like with your own supplies.",
  },
  {
    id: "faq-6",
    question: "What is the difference between the Basic Plan and the PRO Plan?",
    answer:
      "The Basic Plan includes all 500+ printable cone templates, the starter printing and folding guide, instant PDF access, and a 7-day money-back guarantee. The PRO Plan includes everything in Basic plus a theme-organized library, the complete boutique-finish tutorial, all 6 curated bonuses, and an extended 30-day money-back guarantee.",
  },
  {
    id: "faq-7",
    question: "Can I sell the assembled cones for seasonal extra income?",
    answer:
      "Yes, where permitted by the included handmade license: you may craft and sell physically assembled cones (filled or unfilled) at local markets, schools, offices, or through pre-orders. Reselling, sharing, or redistributing the digital PDF templates themselves is not permitted, and sales or earnings are never guaranteed.",
  },
  {
    id: "faq-8",
    question: "I'm a complete beginner at paper crafting. Will I be able to assemble them?",
    answer:
      "Yes. Each cone follows a forgiving four-step rhythm — print, cut, fold on the marked tab, and seal. Even your very first cone takes only a few minutes, and batching becomes effortless once you've made two or three.",
  },
  {
    id: "faq-9",
    question: "How does the 7-day or 30-day money-back guarantee work?",
    answer:
      "Download the templates, run a test print, and see the artwork up close. If it isn't the right fit, request a full refund within 7 days on the Basic Plan or 30 days on the PRO Plan via the official checkout platform or support email.",
  },
  {
    id: "faq-10",
    question: "How long can I keep and reuse the PDF files?",
    answer:
      "Once downloaded to your computer or cloud drive, your templates are yours to reprint for this holiday season and future Christmases under the included personal and handmade physical-craft license.",
  },
];