/**
 * Single source of truth for site copy and constants.
 *
 * PLAN.md §13.5 A5: content.ts holds typed site constants. Portfolio, reviews,
 * and stock items will move to Astro Content Collections (Markdown/JSON) once the
 * photo drive arrives. For now everything lives here for v0 localhost preview.
 *
 * UC-1 (approved at Phase 4): bilingual at v1. The `_es` field on each user-facing
 * string is the Spanish counterpart. Components render English on top, Spanish below
 * at 0.86em italic via `.lang-es`. Adolfo will refine the Spanish copy before launch.
 */

export const business = {
  name: 'Agape Nursery & Landscape Supply',
  shortName: 'Agape',
  tagline: {
    en: 'Growing Delano’s gardens since 1982.',
    es: 'Cultivando los jardines de Delano desde 1982.',
  },
  established: 1982,
  yearsInBusiness: new Date().getFullYear() - 1982,
  phone: {
    display: '(661) 725-7749',
    href: 'tel:+16617257749',
  },
  email: 'agapenurseryandlandscape@gmail.com',
  address: {
    street: '2011 Girard Street',
    city: 'Delano',
    state: 'CA',
    zip: '93215',
    formatted: '2011 Girard St, Delano, CA 93215',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=2011+Girard+St+Delano+CA+93215',
  },
  hours: {
    weekdays: '8:00 AM – 5:30 PM',
    saturday: '8:00 AM – 5:30 PM',
    sunday: 'By appointment',
    summary: 'Mon–Sat 8:00 AM – 5:30 PM · Sun by appointment',
    summaryEs: 'Lun–Sáb 8:00 AM – 5:30 PM · Dom con cita',
  },
  socials: {
    instagram: 'https://www.instagram.com/agapenurseryandlandscape/',
    facebook: 'https://www.facebook.com/agapenursery/',
  },
  serviceArea: {
    counties: ['Tulare County', 'Kern County'],
    cities: ['Delano', 'Bakersfield', 'Visalia', 'Wasco', 'Shafter', 'McFarland'],
  },
  /**
   * California Contractors State License Board.
   * C-27 Landscape Contractor — public verification:
   * https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx
   */
  license: {
    board: 'CSLB',
    number: '1158574',
    classification: 'C-27',
    classificationName: {
      en: 'Landscape Contractor',
      es: 'Contratista de Paisajismo',
    },
    display: 'CSLB #1158574',
    line: {
      en: 'Licensed C-27 Landscape Contractor · CSLB #1158574',
      es: 'Contratista de Paisajismo con licencia C-27 · CSLB #1158574',
    },
    verifyUrl:
      'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
  },
};

export const navItems = [
  { id: 'contact', en: 'Get a Quote', es: 'Cotización' },
  { id: 'services', en: 'Services', es: 'Servicios' },
  { id: 'bulk-materials', en: 'Bulk Materials', es: 'Mayoreo' },
  { id: 'portfolio', en: 'Our Work', es: 'Nuestro Trabajo' },
  { id: 'about', en: 'Family Story', es: 'Familia' },
  { id: 'in-stock', en: 'In Stock', es: 'En Stock' },
];

export const hero = {
  status: {
    en: 'Open today · Delano, CA',
    es: 'Abierto hoy · Delano, CA',
  },
  h1: {
    en: 'Growing Delano’s gardens since 1982.',
    es: 'Cultivando los jardines de Delano desde 1982.',
  },
  subhead: {
    en: 'We design, plant, and care for yards across Tulare and Kern Counties. Free site visit, no commitment.',
    es: 'Diseñamos, plantamos y cuidamos jardines en los condados de Tulare y Kern. Visita gratis, sin compromiso.',
  },
  primaryCta: {
    en: 'Get a Free Site Visit',
    es: 'Visita Gratis · Sin Compromiso',
  },
  secondaryCta: {
    en: 'Or call (661) 725-7749',
    es: 'O llame al (661) 725-7749',
  },
  trustLine: {
    en: 'Family-run since 1982 · Tulare + Kern Counties',
    es: 'Negocio familiar desde 1982 · Condados de Tulare y Kern',
  },
};


export const trust = {
  yearsLabel: {
    en: 'years family-run',
    es: 'años de negocio familiar',
  },
  countiesLabel: {
    en: 'counties served',
    es: 'condados atendidos',
  },
  reviewsLabel: {
    en: 'happy customers',
    es: 'clientes felices',
  },
};

export const reviews = [
  {
    quote: {
      en: 'Adolfo and his crew transformed our backyard into something out of a magazine. They listened, didn’t oversell, and finished on time.',
      es: 'Adolfo y su equipo transformaron nuestro patio en algo de revista. Escucharon, no exageraron, y terminaron a tiempo.',
    },
    author: 'María L.',
    location: 'Delano',
    project: { en: 'Drought-tolerant front yard', es: 'Jardín frontal sin riego' },
  },
  {
    quote: {
      en: 'Three generations of my family have shopped here. The quality of the plants and the advice you get — there’s nothing like it in the Valley.',
      es: 'Tres generaciones de mi familia compran aquí. La calidad de las plantas y el consejo que reciben — no hay nada igual en el Valle.',
    },
    author: 'Robert K.',
    location: 'Bakersfield',
    project: { en: 'Returning customer since 1991', es: 'Cliente desde 1991' },
  },
  {
    quote: {
      en: 'They re-did our entire backyard install after a contractor flaked on us. Honest pricing, real craftsmanship. Worth every dollar.',
      es: 'Rehicieron toda la instalación de nuestro patio después que otro contratista nos falló. Precios honestos, verdadero arte. Vale cada dólar.',
    },
    author: 'Jennifer S.',
    location: 'Visalia',
    project: { en: 'Backyard renovation + irrigation', es: 'Renovación del patio + riego' },
  },
];

/** Service tile imagery — verified working Unsplash photos.
 *  Note: titles use "and" instead of "&" because the Fraunces ampersand at card-title
 *  size is too stylized to read at a glance. */
export const services = [
  {
    icon: 'leaf',
    image:
      '/photos/services/landscape.jpg',
    title: { en: 'Landscape Design and Install', es: 'Diseño e Instalación' },
    body: {
      en: 'Front yard refresh to full backyard transformation. We design with you, then plant, build, irrigate, and stick around.',
      es: 'Renovación del patio frontal hasta transformación completa del patio trasero. Diseñamos con usted, luego plantamos y nos quedamos.',
    },
  },
  {
    icon: 'sprout',
    image:
      '/photos/services/plants.jpg',
    title: { en: 'Plants and Trees', es: 'Plantas y Árboles' },
    body: {
      en: 'Annuals, perennials, shrubs, fruit trees, shade trees, and plants chosen for the Valley climate.',
      es: 'Anuales, perennes, arbustos, árboles frutales, árboles de sombra y plantas elegidas para el clima del Valle.',
    },
  },
  {
    icon: 'shovel',
    image:
      '/photos/services/supplies.jpg',
    title: { en: 'Garden Supplies', es: 'Suministros' },
    body: {
      en: 'Soil, mulch, fertilizer, pots, tools. Delivery across Kern and Tulare. Bulk pricing for big yards.',
      es: 'Tierra, mantillo, fertilizante, macetas, herramientas. Entrega en Kern y Tulare. Precios al mayoreo.',
    },
  },
  {
    icon: 'droplet',
    image:
      '/photos/services/irrigation.jpg',
    title: { en: 'Irrigation Install and Repair', es: 'Riego · Instalación y Reparación' },
    body: {
      en: 'PVC and drip systems, open-trench installs, repairs, and remodels so your plants get water where they need it.',
      es: 'Sistemas de PVC y goteo, instalación en zanja, reparaciones y remodelaciones para regar donde hace falta.',
    },
  },
];

/** Bulk landscape materials offered at the yard — Adolfo review request 2026-08-14. */
export const bulkMaterials = {
  eyebrow: { en: 'At the yard', es: 'En el vivero' },
  h2: {
    en: 'Landscape materials in bulk.',
    es: 'Materiales de paisajismo al mayoreo.',
  },
  body: {
    en: 'Need a truckload or a few yards? We supply bulk landscape materials for homeowners and crews across the Valley.',
    es: '¿Necesita un camión o unos metros? Suministramos materiales de paisajismo al mayoreo para hogares y contratistas del Valle.',
  },
  image: '/photos/services/bulk-materials.jpg',
  cta: { en: 'Call for bulk pricing', es: 'Llame para precios al mayoreo' },
  items: [
    { en: 'Gravel', es: 'Grava' },
    { en: 'Mulch', es: 'Mantillo' },
    { en: 'Soil', es: 'Tierra' },
    { en: 'Sand', es: 'Arena' },
    { en: 'Decomposed granite (DG)', es: 'Granito descompuesto (DG)' },
    { en: 'Base rock', es: 'Base de roca' },
  ],
};

/** Portfolio — diversified across Adolfo's project photos (not one repeated job). */
export const portfolio = [
  {
    id: 'p1',
    title: { en: 'Curved lawn and planting beds', es: 'Césped curvo y camas' },
    location: 'Tulare County, CA',
    year: '2025',
    tags: ['front-yard', 'install'],
    image: '/photos/portfolio/p9-finished-curve.jpg',
  },
  {
    id: 'p2',
    title: { en: 'Plant staging and install', es: 'Preparación e instalación de plantas' },
    location: 'Kern County, CA',
    year: '2025',
    tags: ['install', 'front-yard'],
    image: '/photos/portfolio/p-plant-staging.jpg',
  },
  {
    id: 'p3',
    title: { en: 'Front entry planting', es: 'Plantación de entrada' },
    location: 'Delano, CA',
    year: '2024',
    tags: ['front-yard'],
    image: '/photos/portfolio/p2-entry-plant.jpg',
  },
  {
    id: 'p4',
    title: { en: 'Tree planting and grade work', es: 'Plantación de árboles y nivelación' },
    location: 'Wasco, CA',
    year: '2024',
    tags: ['trees', 'install'],
    image: '/photos/portfolio/p5-tree-planting.jpg',
  },
  {
    id: 'p5',
    title: { en: 'Walkway and bed install', es: 'Pasillo y camas' },
    location: 'Delano, CA',
    year: '2024',
    tags: ['front-yard'],
    image: '/photos/portfolio/p3-walkway.jpg',
  },
  {
    id: 'p6',
    title: { en: 'Fresh sod install', es: 'Instalación de césped' },
    location: 'McFarland, CA',
    year: '2023',
    tags: ['backyard', 'install'],
    image: '/photos/portfolio/p4-sod.jpg',
  },
  {
    id: 'p7',
    title: { en: 'Gravel front with plantings', es: 'Frente con grava y plantas' },
    location: 'Delano, CA',
    year: '2025',
    tags: ['front-yard', 'drought-tolerant'],
    image: '/photos/portfolio/p7-gravel-front.jpg',
  },
  {
    id: 'p8',
    title: { en: 'Stone patio and plantings', es: 'Patio de piedra y plantas' },
    location: 'Kern County, CA',
    year: '2025',
    tags: ['backyard', 'install'],
    image: '/photos/portfolio/p-stone-patio.jpg',
  },
  {
    id: 'p9',
    title: { en: 'Curved walk and lawn', es: 'Pasillo curvo y césped' },
    location: 'Tulare County, CA',
    year: '2025',
    tags: ['backyard', 'install'],
    image: '/photos/portfolio/p-curved-walk.jpg',
  },
  {
    id: 'p10',
    title: { en: 'Irrigation trench install', es: 'Instalación de riego en zanja' },
    location: 'Kern County, CA',
    year: '2024',
    tags: ['install'],
    image: '/photos/portfolio/p-irrigation-trench.jpg',
  },
  {
    id: 'p11',
    title: { en: 'Gravel beds and shrubs', es: 'Camas de grava y arbustos' },
    location: 'Delano, CA',
    year: '2024',
    tags: ['front-yard', 'drought-tolerant'],
    image: '/photos/portfolio/p-gravel-beds.jpg',
  },
  {
    id: 'p12',
    title: { en: 'Parkway planting strip', es: 'Franja de plantación' },
    location: 'Kern County, CA',
    year: '2024',
    tags: ['front-yard', 'install'],
    image: '/photos/portfolio/p-parkway-planting.jpg',
  },
];export const portfolioFilters = [
  { id: 'all', en: 'All Work', es: 'Todos' },
  { id: 'front-yard', en: 'Front Yards', es: 'Patios Frontales' },
  { id: 'backyard', en: 'Backyards', es: 'Patios Traseros' },
  { id: 'drought-tolerant', en: 'Drought-Tolerant', es: 'Sin Riego' },
];

export const about = {
  eyebrow: { en: 'The Family', es: 'La Familia' },
  h2: {
    en: 'Forty-four years. Same family. Same dirt under our fingernails.',
    es: 'Cuarenta y cuatro años. Misma familia. Misma tierra bajo las uñas.',
  },
  body: {
    en: 'Agape started serving Delano and the surrounding communities in 1982. The idea was simple: grow plants that actually work in the San Joaquin Valley, sell them honestly, and stick around long enough that customers’ kids become customers too. Generations later, that’s still the operating principle. We know which trees survive the August heat. We know which roses will keep blooming through October. And we know that the best yard isn’t the most expensive one — it’s the one that fits your life.',
    es: 'Agape comenzó a servir a Delano y las comunidades de alrededor en 1982. La idea era simple: cultivar plantas que realmente funcionen en el Valle de San Joaquín, venderlas con honestidad, y quedarse el tiempo suficiente para que los hijos de los clientes también sean clientes. Generaciones después, ese sigue siendo el principio. Sabemos qué árboles sobreviven el calor de agosto. Sabemos qué rosas siguen floreciendo en octubre. Y sabemos que el mejor jardín no es el más caro — es el que se adapta a su vida.',
  },
  signature: {
    en: '— Adolfo & family',
    es: '— Adolfo y familia',
  },
  imagePlaceholder:
    '/photos/about/family-yard.jpg',
};

export const process = {
  eyebrow: { en: 'How it works', es: 'Cómo funciona' },
  h2: {
    en: 'Three steps to a yard you’ll actually use.',
    es: 'Tres pasos para un jardín que realmente disfrutará.',
  },
  steps: [
    {
      n: '01',
      duration: { en: '~2 minutes', es: '~2 minutos' },
      image: '/photos/process/step-01-call-site.jpg',
      title: { en: 'Call or message us', es: 'Llámenos o escriba' },
      body: {
        en: 'Call us or send a quick message. We come to your home, walk the yard, and listen.',
        es: 'Llámenos o envíe un mensaje. Vamos a su casa, caminamos el jardín, escuchamos.',
      },
    },
    {
      n: '02',
      duration: { en: 'Free · 30-45 min', es: 'Gratis · 30-45 min' },
      image: '/photos/process/step-02-visit.jpg',
      title: { en: 'Free site visit', es: 'Visita gratis' },
      body: {
        en: 'We walk your space, check grade and irrigation needs, take measurements, and bring plant ideas that fit your light, soil, and budget.',
        es: 'Caminamos su espacio, revisamos nivelación y riego, tomamos medidas, y traemos ideas que se ajustan a su luz, tierra y presupuesto.',
      },
    },
    {
      n: '03',
      duration: { en: '1-3 weeks install', es: '1-3 semanas' },
      image: '/photos/process/step-03-finish.jpg',
      title: { en: 'A yard you’ll keep using', es: 'Un jardín que disfrutará' },
      body: {
        en: 'Honest quote, honest timeline. Once we install, we’re still a phone call away — that’s why three generations have stuck with us.',
        es: 'Presupuesto honesto, plazo honesto. Una vez instalado, seguimos cerca — por eso tres generaciones nos han acompañado.',
      },
    },
  ],
};

export const inStock = {
  eyebrow: { en: 'This week', es: 'Esta semana' },
  h2: {
    en: 'Just arrived at the nursery.',
    es: 'Recién llegado al vivero.',
  },
  updated: '2026-04-25',
  items: [
    { name: { en: 'Meyer Lemon Trees', es: 'Limoneros Meyer' }, size: '15 gal' },
    { name: { en: 'Heirloom Tomato Starts', es: 'Plántulas de Tomate Heirloom' }, size: '4 in' },
    { name: { en: 'California Native Sage', es: 'Salvia Nativa de California' }, size: '1 gal' },
    { name: { en: 'Knock Out Roses', es: 'Rosas Knock Out' }, size: '5 gal' },
    { name: { en: 'Bermuda Sod', es: 'Césped Bermuda' }, size: 'pallet' },
    { name: { en: 'Compost & Bark Mulch', es: 'Composta y Mantillo de Corteza' }, size: 'cubic yard' },
  ],
};

export const serviceAreaCopy = {
  eyebrow: { en: 'Where we work', es: 'Dónde trabajamos' },
  h2: {
    en: 'From Delano to Bakersfield, Visalia and beyond.',
    es: 'Desde Delano hasta Bakersfield, Visalia y más allá.',
  },
};

export const contact = {
  eyebrow: { en: 'Get a quote', es: 'Cotización' },
  h2: {
    en: 'Send a few details. We’ll be in touch within 24 hours.',
    es: 'Envíe algunos detalles. Le contactamos en 24 horas.',
  },
  body: {
    en: 'Prefer to talk? Call (661) 725-7749 — Adolfo answers his phone.',
    es: '¿Prefiere hablar? Llame al (661) 725-7749 — Adolfo contesta su teléfono.',
  },
  form: {
    name: { en: 'Your name', es: 'Su nombre' },
    phone: { en: 'Phone number', es: 'Teléfono' },
    email: { en: 'Email', es: 'Correo' },
    projectType: { en: 'Project type', es: 'Tipo de proyecto' },
    timeline: { en: 'Timeline', es: 'Plazo' },
    description: { en: 'Tell us about your yard', es: 'Cuéntenos sobre su jardín' },
    submit: { en: 'Send to Adolfo', es: 'Enviar a Adolfo' },
    sending: { en: 'Sending…', es: 'Enviando…' },
    success: {
      en: 'Got it! If this is the first website lead, Adolfo should also check spam for a FormSubmit activation email and click it. If urgent, call (661) 725-7749.',
      es: '¡Recibido! Si es el primer mensaje del sitio, Adolfo debe revisar spam por un correo de activación de FormSubmit y hacer clic. Si es urgente, llame al (661) 725-7749.',
    },
    error: {
      en: 'Something went wrong. Please call (661) 725-7749.',
      es: 'Algo salió mal. Por favor, llame al (661) 725-7749.',
    },
  },
  projectTypes: [
    { value: 'design-install', en: 'Landscape design & install', es: 'Diseño e instalación' },
    { value: 'plant-install', en: 'Plant install', es: 'Instalación de plantas' },
    { value: 'irrigation', en: 'Irrigation install / repair', es: 'Riego · instalación / reparación' },
    { value: 'bulk-materials', en: 'Bulk materials (gravel, mulch, soil, sand, DG)', es: 'Materiales al mayoreo (grava, mantillo, tierra, arena, DG)' },
    { value: 'refresh', en: 'Refresh / repair existing yard', es: 'Renovación / reparación' },
    { value: 'plants-pickup', en: 'Just plants for pickup', es: 'Solo plantas para recoger' },
    { value: 'other', en: 'Not sure / other', es: 'No estoy seguro / otro' },
  ],
  timelines: [
    { value: 'urgent', en: 'Within 2 weeks', es: 'En 2 semanas' },
    { value: 'soon', en: '1–3 months', es: '1–3 meses' },
    { value: 'exploring', en: 'Just exploring', es: 'Solo explorando' },
  ],
};

export const footer = {
  callToActionRepeat: {
    en: 'Ready to start your yard?',
    es: '¿Listo para empezar su jardín?',
  },
  signoff: {
    en: 'Family-owned in Delano, California.',
    es: 'Familia propietaria en Delano, California.',
  },
};
