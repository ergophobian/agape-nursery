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
    display: '(661) 778-0602',
    href: 'tel:+16617780602',
  },
  email: 'hello@agapenurseryandlandscape.com',
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
   * Calendly placeholder URL — swap for Adolfo's real booking link before launch.
   * Format: https://calendly.com/<account>/<event>
   */
  calendlyUrl: 'https://calendly.com/agape-nursery/landscape-consultation',
};

export const navItems = [
  { id: 'booking', en: 'Book a Visit', es: 'Reservar Cita' },
  { id: 'services', en: 'Services', es: 'Servicios' },
  { id: 'portfolio', en: 'Our Work', es: 'Nuestro Trabajo' },
  { id: 'about', en: 'Family Story', es: 'Familia' },
  { id: 'contact', en: 'Contact', es: 'Contacto' },
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
    en: 'Book a Free Landscape Consultation',
    es: 'Reservar Consulta Gratis',
  },
  secondaryCta: {
    en: 'Or call (661) 778-0602',
    es: 'O llame al (661) 778-0602',
  },
  trustLine: {
    en: 'Family-run since 1982 · Tulare + Kern Counties',
    es: 'Negocio familiar desde 1982 · Condados de Tulare y Kern',
  },
};

export const booking = {
  eyebrow: { en: 'Schedule', es: 'Agendar' },
  h2: {
    en: 'Pick a time. We’ll come look at your yard.',
    es: 'Elija un horario. Vamos a ver su jardín.',
  },
  body: {
    en: 'A free 15-minute site visit, on your schedule. We bring ideas, plant suggestions, and a no-pressure quote.',
    es: 'Visita gratis de 15 minutos, en su horario. Traemos ideas, sugerencias y un presupuesto sin presión.',
  },
  fallbackHeadline: {
    en: 'Booking widget didn’t load?',
    es: '¿No cargó el calendario?',
  },
  fallbackBody: {
    en: 'No problem — call us at (661) 778-0602 or fill out the quick form below.',
    es: 'Llámenos al (661) 778-0602 o complete el formulario.',
  },
  fallbackFormCta: {
    en: 'Send us a message instead',
    es: 'Enviar un mensaje',
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

export const services = [
  {
    icon: 'leaf',
    title: { en: 'Landscape Design & Install', es: 'Diseño e Instalación de Paisajes' },
    body: {
      en: 'From front-yard refresh to full backyard transformation. We design with you, then plant, build, and irrigate.',
      es: 'Desde renovación de patio frontal hasta transformación completa del patio trasero. Diseñamos con usted, luego plantamos, construimos y regamos.',
    },
  },
  {
    icon: 'sprout',
    title: { en: 'Nursery: Plants & Trees', es: 'Vivero: Plantas y Árboles' },
    body: {
      en: 'Annuals, perennials, shrubs, fruit trees, shade trees. All chosen for the Valley climate.',
      es: 'Anuales, perennes, arbustos, árboles frutales, árboles de sombra. Todos elegidos para el clima del Valle.',
    },
  },
  {
    icon: 'shovel',
    title: { en: 'Garden Supplies', es: 'Suministros de Jardín' },
    body: {
      en: 'Soil, mulch, fertilizer, pots, and tools. Delivery available across Kern and Tulare.',
      es: 'Tierra, mantillo, fertilizante, macetas y herramientas. Entrega disponible en Kern y Tulare.',
    },
  },
  {
    icon: 'wheat',
    title: { en: 'Animal Feed & Supplies', es: 'Alimento Animal y Suministros' },
    body: {
      en: 'Feed for pets, livestock, and poultry. Same family-run trust customers have counted on for 44 years.',
      es: 'Alimento para mascotas, ganado y aves. La misma confianza familiar en la que los clientes han confiado por 44 años.',
    },
  },
];

export const portfolio = [
  {
    id: 'p1',
    title: { en: 'Drought-tolerant front yard', es: 'Jardín frontal sin riego' },
    location: 'Delano, CA',
    tags: ['drought-tolerant', 'front-yard'],
    placeholder: true,
    /** Unsplash-hosted v0 placeholder. Adolfo's drive replaces these at v1. */
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1024&q=85',
  },
  {
    id: 'p2',
    title: { en: 'Backyard transformation with seasonal color', es: 'Transformación del patio trasero con colores' },
    location: 'Bakersfield, CA',
    tags: ['backyard', 'install'],
    placeholder: true,
    image: 'https://images.unsplash.com/photo-1571767454098-246b94fbcf70?w=1024&q=85',
  },
  {
    id: 'p3',
    title: { en: 'Native pollinator garden', es: 'Jardín de polinizadores nativos' },
    location: 'Visalia, CA',
    tags: ['drought-tolerant', 'native'],
    placeholder: true,
    image: 'https://images.unsplash.com/photo-1558616629-899031969d5a?w=1024&q=85',
  },
  {
    id: 'p4',
    title: { en: 'Citrus orchard install', es: 'Instalación de huerto cítrico' },
    location: 'Wasco, CA',
    tags: ['trees', 'install'],
    placeholder: true,
    image: 'https://images.unsplash.com/photo-1592420114011-69e34d1ea60d?w=1024&q=85',
  },
  {
    id: 'p5',
    title: { en: 'Front entry refresh', es: 'Renovación de entrada principal' },
    location: 'Delano, CA',
    tags: ['front-yard'],
    placeholder: true,
    image: 'https://images.unsplash.com/photo-1592595896616-c37162298647?w=1024&q=85',
  },
  {
    id: 'p6',
    title: { en: 'Backyard with raised beds', es: 'Patio con jardineras elevadas' },
    location: 'McFarland, CA',
    tags: ['backyard', 'edible'],
    placeholder: true,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1024&q=85',
  },
];

export const portfolioFilters = [
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
    en: 'Adolfo started Agape in 1982 with a simple idea: grow plants that actually work in the San Joaquin Valley, sell them honestly, and stick around long enough that customers’ kids become customers too. Three generations later, that’s still the operating principle. We know which trees survive the August heat. We know which roses will keep blooming through October. And we know that the best yard isn’t the most expensive one — it’s the one that fits your life.',
    es: 'Adolfo fundó Agape en 1982 con una idea simple: cultivar plantas que realmente funcionen en el Valle de San Joaquín, venderlas con honestidad, y quedarse el tiempo suficiente para que los hijos de los clientes también sean clientes. Tres generaciones después, ese sigue siendo el principio. Sabemos qué árboles sobreviven el calor de agosto. Sabemos qué rosas siguen floreciendo en octubre. Y sabemos que el mejor jardín no es el más caro — es el que se adapta a su vida.',
  },
  signature: {
    en: '— Adolfo & family',
    es: '— Adolfo y familia',
  },
  imagePlaceholder:
    'https://images.unsplash.com/photo-1530293959042-32a09cf95406?w=900&q=85',
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
      title: { en: 'Book a visit', es: 'Reserve una visita' },
      body: {
        en: 'Pick a time online or call us. We come to your home, walk the yard, and listen to what you want.',
        es: 'Elija un horario en línea o llámenos. Vamos a su casa, caminamos el jardín y escuchamos lo que quiere.',
      },
    },
    {
      n: '02',
      title: { en: 'Free site visit', es: 'Visita gratis' },
      body: {
        en: 'Within a week, we walk your space, take measurements, and bring plant ideas that fit your light, soil, and budget.',
        es: 'En una semana, caminamos su espacio, tomamos medidas, y traemos ideas que se ajustan a su luz, tierra y presupuesto.',
      },
    },
    {
      n: '03',
      title: { en: 'A yard you’ll keep using', es: 'Un jardín que disfrutará' },
      body: {
        en: 'Honest quote, honest timeline. Once we install, we’re still a phone call away — that’s how three generations of Delano families have stuck with us.',
        es: 'Presupuesto honesto, plazo honesto. Una vez instalado, seguimos a una llamada de distancia — así nos han acompañado tres generaciones de familias de Delano.',
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
    en: 'Prefer to talk? Call (661) 778-0602 — Adolfo answers his phone.',
    es: '¿Prefiere hablar? Llame al (661) 778-0602 — Adolfo contesta su teléfono.',
  },
  form: {
    name: { en: 'Your name', es: 'Su nombre' },
    phone: { en: 'Phone number', es: 'Teléfono' },
    email: { en: 'Email (optional)', es: 'Correo (opcional)' },
    projectType: { en: 'Project type', es: 'Tipo de proyecto' },
    timeline: { en: 'Timeline', es: 'Plazo' },
    description: { en: 'Tell us about your yard', es: 'Cuéntenos sobre su jardín' },
    submit: { en: 'Send to Adolfo', es: 'Enviar a Adolfo' },
    sending: { en: 'Sending…', es: 'Enviando…' },
    success: {
      en: 'Got it! Adolfo will reach out within 24 hours. If urgent, call (661) 778-0602.',
      es: '¡Recibido! Adolfo se comunicará en 24 horas. Si es urgente, llame al (661) 778-0602.',
    },
    error: {
      en: 'Something went wrong. Please call (661) 778-0602.',
      es: 'Algo salió mal. Por favor, llame al (661) 778-0602.',
    },
  },
  projectTypes: [
    { value: 'design-install', en: 'Landscape design & install', es: 'Diseño e instalación' },
    { value: 'plant-install', en: 'Plant install', es: 'Instalación de plantas' },
    { value: 'refresh', en: 'Refresh / repair existing yard', es: 'Renovación / reparación' },
    { value: 'plants-pickup', en: 'Just plants for pickup', es: 'Solo plantas para recoger' },
    { value: 'feed', en: 'Animal feed & supplies', es: 'Alimento y suministros' },
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
