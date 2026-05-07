import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(studioDir, '..')
const assetsDir = path.join(repoRoot, 'sanity-seed', 'assets')

const dryRun = process.argv.includes('--dry-run')

const client = getCliClient({apiVersion: '2025-05-07'})

const key = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || Math.random().toString(36).slice(2, 10)

const slug = (value) => ({_type: 'slug', current: key(value)})

const pt = (text) => [
  {
    _type: 'block',
    _key: key(text).slice(0, 12),
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `${key(text).slice(0, 8)}-span`, text, marks: []}],
  },
]

const imageField = (asset, alt) => ({
  _type: 'image',
  asset: {_type: 'reference', _ref: asset._id},
  alt,
})

const imageOnly = (asset) => ({
  _type: 'image',
  asset: {_type: 'reference', _ref: asset._id},
})

const assetManifest = {
  dogBowlKitchen: {
    file: 'dog-bowl-kitchen-unsplash.jpg',
    title: 'Dog waiting by a meal bowl in a bright kitchen',
    credit: 'Unsplash free stock result',
  },
  dogEatingBowl: {
    file: 'dog-eating-bowl-unsplash.jpg',
    title: 'Dog enjoying a bowl outdoors',
    credit: 'Unsplash free stock result',
  },
  huskyMealBowl: {
    file: 'husky-meal-bowl-unsplash.jpg',
    title: 'Husky receiving a meal bowl',
    credit: 'Unsplash free stock result',
  },
  smallDogFreshMeal: {
    file: 'small-dog-fresh-meal-unsplash.jpg',
    title: 'Small dog beside a fresh food bowl',
    credit: 'Unsplash free stock result',
  },
  vetCheckingDog: {
    file: 'vet-checking-dog-pexels.jpeg',
    title: 'Veterinarian checking a dog with a stethoscope',
    credit: 'Pexels free stock result',
  },
  animalHospital: {
    file: 'animal-hospital-pexels.jpeg',
    title: 'Veterinary clinic care scene',
    credit: 'Pexels free stock result',
  },
  personServingDogFood: {
    file: 'person-serving-dog-food-pexels.jpeg',
    title: 'Person serving dog food into a bowl',
    credit: 'Pexels free stock result',
  },
  dogKitchen: {
    file: 'dog-in-kitchen-pexels.jpeg',
    title: 'Dog watching food preparation in a kitchen',
    credit: 'Pexels free stock result',
  },
}

async function uploadAssets() {
  const uploaded = {}

  for (const [name, item] of Object.entries(assetManifest)) {
    const filePath = path.join(assetsDir, item.file)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing seed asset: ${filePath}`)
    }

    if (dryRun) {
      uploaded[name] = {_id: `dry-run-${name}`}
      continue
    }

    console.log(`Uploading asset: ${item.file}`)
    uploaded[name] = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: item.file,
      title: item.title,
      source: {name: item.credit},
    })
  }

  return uploaded
}

function buildDocs(a) {
  const nutritionAuthor = {
    _id: 'author-maya-pawmeals-nutrition',
    _type: 'author',
    name: 'Maya Pawmeals Nutrition Team',
    role: 'Canine Nutrition Content Lead',
    bio: 'Writes practical feeding guidance for pawrents who want cooked, balanced meals without guesswork.',
    credentials: 'Pawmeals Editorial Team',
    photo: imageOnly(a.personServingDogFood),
  }

  const vetAuthor = {
    _id: 'author-dr-raka-pratama',
    _type: 'author',
    name: 'drh. Raka Pratama',
    role: 'Partner Veterinarian',
    bio: 'Supports nutrition education for dogs transitioning from kibble or home-cooked trial meals into balanced cooked-food routines.',
    credentials: 'drh., Companion Animal Practice',
    photo: imageOnly(a.vetCheckingDog),
  }

  const homepage = {
    _id: 'homepage',
    _type: 'homepage',
    heroSlides: [
      {
        _key: 'hero-fresh-cooked',
        headline: 'Fresh cooked meals for dogs who deserve real food',
        subheadline: 'Balanced Pawmeals menus with recognizable ingredients, thoughtful portions, and delivery-ready convenience for busy pawrents.',
        ctaText: 'Explore Pawmeals',
        ctaLink: '/id/products',
        image: imageField(a.dogEatingBowl, 'Dog enjoying a fresh meal bowl outdoors'),
      },
      {
        _key: 'hero-vet-informed',
        headline: 'Built around daily nutrition, not just cute packaging',
        subheadline: 'Give your dog a routine that feels home-cooked while keeping portions, transition, and ingredient clarity easier to manage.',
        ctaText: 'See feeding guide',
        ctaLink: '/id/pawrenting',
        image: imageField(a.personServingDogFood, 'A person serving dog food into a clean bowl'),
      },
      {
        _key: 'hero-clinic-trust',
        headline: 'A warmer way to talk about dog nutrition with your vet',
        subheadline: 'Use Pawmeals as a practical starting point for better meal conversations, especially for dogs with sensitive routines.',
        ctaText: 'Vet exclusive',
        ctaLink: '/id/vet-exclusive',
        image: imageField(a.vetCheckingDog, 'Veterinarian checking a dog in a clinic'),
      },
    ],
    whyPawmeals: [
      {_key: 'why-real-ingredients', icon: '🥕', title: 'Recognizable ingredients', description: 'A food story pawrents can understand at a glance: cooked proteins, vegetables, and practical daily portions.'},
      {_key: 'why-easy-routine', icon: '📦', title: 'Routine-friendly delivery', description: 'Content and visuals are designed around the weekly rhythm of ordering, thawing, serving, and reordering.'},
      {_key: 'why-transition-support', icon: '🐾', title: 'Gentle transition mindset', description: 'The experience encourages gradual changes, simple observation, and better conversations with vets.'},
      {_key: 'why-premium-warmth', icon: '✨', title: 'Premium but warm', description: 'The tone stays trustworthy and practical without becoming clinical, cold, or overdesigned.'},
    ],
    featuredTestimonials: [
      {
        _key: 'testimonial-luna',
        customerName: 'Nadia',
        petName: 'Luna',
        petBreed: 'Mini Poodle',
        review: 'Luna used to get bored halfway through meals. With Pawmeals, dinner finally feels like a routine we both look forward to.',
        rating: 5,
        photo: imageOnly(a.smallDogFreshMeal),
      },
      {
        _key: 'testimonial-bimo',
        customerName: 'Kevin',
        petName: 'Bimo',
        petBreed: 'Husky Mix',
        review: 'The biggest win is clarity. I can see what goes into the bowl and explain Bimo’s feeding routine more confidently.',
        rating: 5,
        photo: imageOnly(a.huskyMealBowl),
      },
    ],
    vetPartners: [
      {
        _key: 'vet-raka-homepage',
        vetName: 'drh. Raka Pratama',
        clinicName: 'Klinik Satwa Selatan',
        location: 'Jakarta Selatan',
        quote: 'The most useful nutrition plan is one a family can follow consistently. Clear ingredients and gradual transitions make that conversation easier.',
        photo: imageOnly(a.vetCheckingDog),
      },
      {
        _key: 'vet-anisa-homepage',
        vetName: 'drh. Anisa Widjaja',
        clinicName: 'Happy Paws Vet Care',
        location: 'Tangerang',
        quote: 'For many families, the first improvement is not complexity. It is a more intentional daily bowl and better observation of how the dog responds.',
        photo: imageOnly(a.animalHospital),
      },
    ],
  }

  const cateringPage = {
    _id: 'cateringPage',
    _type: 'cateringPage',
    heroHeadline: 'Cooked dog-meal catering for weekly routines, events, and multi-dog homes',
    heroSubheadline: 'Use Pawmeals catering to show what a complete cooked-food experience could look like: portioned meals, fresh serving moments, and practical WhatsApp ordering.',
    heroImage: imageField(a.personServingDogFood, 'Fresh dog food being served into a bowl'),
    services: [
      {_key: 'service-weekly', title: 'Weekly Home Routine', description: 'A practical meal plan for pawrents who want enough variety for the week without cooking every night.', icon: '🏡', price: 'Mulai dari Rp 350.000/minggu', image: imageOnly(a.dogBowlKitchen)},
      {_key: 'service-sensitive', title: 'Sensitive Routine Trial', description: 'A carefully introduced cooked-food trial for dogs whose families want to observe appetite, stool, and meal consistency.', icon: '🌿', price: 'Konsultasi menu tersedia', image: imageOnly(a.smallDogFreshMeal)},
      {_key: 'service-community', title: 'Community Pack', description: 'A visually appealing package concept for adoption days, dog cafés, and small pet community gatherings.', icon: '🎪', price: 'Custom by quantity', image: imageOnly(a.huskyMealBowl)},
    ],
    howItWorks: [
      {_key: 'step-chat', step: 1, title: 'Share your dog profile', description: 'Tell us age, size, appetite, and current feeding routine through WhatsApp.'},
      {_key: 'step-menu', step: 2, title: 'Choose a menu rhythm', description: 'Pick a weekly, trial, or event package that matches the use case.'},
      {_key: 'step-serve', step: 3, title: 'Serve, observe, adjust', description: 'Use simple serving guidance and note what your dog enjoys most.'},
    ],
    gallery: [
      {...imageField(a.personServingDogFood, 'Serving a fresh meal into a dog bowl'), _key: 'gallery-serving'},
      {...imageField(a.dogEatingBowl, 'Dog eating from a fresh bowl'), _key: 'gallery-eating'},
      {...imageField(a.dogKitchen, 'Dog in kitchen during meal preparation'), _key: 'gallery-kitchen'},
    ],
    testimonials: [
      {_key: 'catering-testimonial-1', name: 'Ayu', organization: 'BSD Pawrent Community', quote: 'The catering concept made our gathering feel more thoughtful. The dogs had a real food moment, not just treats.', photo: imageOnly(a.dogEatingBowl)},
      {_key: 'catering-testimonial-2', name: 'Marco', organization: 'Multi-dog household', quote: 'It helped us visualize a weekly routine before committing to a larger plan.', photo: imageOnly(a.huskyMealBowl)},
    ],
    whatsappNumber: '+6281234567890',
    ctaText: 'Chat for catering plan',
  }

  const aboutPage = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'About Pawmeals',
    heroHeadline: 'A warmer cooked-food routine for modern pawrents',
    heroSubheadline: 'Pawmeals exists to make better dog meals feel clear, beautiful, and manageable in real daily life.',
    heroImage: imageField(a.dogKitchen, 'Dog in a home kitchen during meal preparation'),
    story: pt('Pawmeals is designed around a simple belief: better nutrition should be easier to understand and easier to repeat. The brand experience should help pawrents imagine the full routine, from choosing a menu to serving a bowl their dog recognizes and enjoys.'),
    mission: 'To make cooked dog meals feel practical, trustworthy, and joyful for families who want more intention in the bowl.',
    vision: 'A dog-food experience where ingredient clarity, daily convenience, and warm veterinary conversations can live together.',
    values: [
      {_key: 'value-clear', title: 'Clarity before complexity', description: 'Every section should help pawrents understand what they are seeing, serving, and asking about.', icon: '🔎'},
      {_key: 'value-warm', title: 'Warm trust', description: 'The visual style should feel premium and calm without becoming cold or medical.', icon: '🤎'},
      {_key: 'value-daily', title: 'Designed for daily life', description: 'The CMS content focuses on routines, portions, delivery, and small wins families can repeat.', icon: '📅'},
    ],
    team: [
      {_key: 'team-nutrition', name: 'Maya', role: 'Nutrition Content Lead', bio: 'Shapes feeding guidance into language pawrents can actually use.', photo: imageOnly(a.personServingDogFood)},
      {_key: 'team-vet', name: 'drh. Raka', role: 'Vet Partner', bio: 'Advises on transition-friendly education and practical nutrition conversations.', photo: imageOnly(a.vetCheckingDog)},
    ],
    milestones: [
      {_key: 'milestone-2024', year: '2024', title: 'Cooked-food concept refined', description: 'Pawmeals focused the brand around real-food clarity and daily feeding routines.'},
      {_key: 'milestone-2025', year: '2025', title: 'CMS-first website experience', description: 'The website moved toward editable CMS content so visuals and messaging can evolve without hard-coding.'},
    ],
    certifications: [
      {_key: 'cert-preview', name: 'Preview content only', description: 'Replace this CMS placeholder with verified certifications or partner badges when available.', logo: imageOnly(a.animalHospital)},
    ],
  }

  const vetExclusivePage = {
    _id: 'vetExclusivePage',
    _type: 'vetExclusivePage',
    heroHeadline: 'Vet-informed nutrition conversations for better daily bowls',
    heroSubheadline: 'A professional-facing content area for clinics, partner vets, and pawrents who want clearer guidance around cooked meals.',
    heroImage: imageField(a.vetCheckingDog, 'Veterinarian examining a dog in a clinic'),
    vetTestimonials: [
      {_key: 'vet-testimonial-raka', vetName: 'drh. Raka Pratama', credentials: 'drh.', clinicName: 'Klinik Satwa Selatan', location: 'Jakarta Selatan', quote: 'The strongest feeding plan is one the family can repeat and observe. Pawmeals can help make that routine easier to discuss.', photo: imageOnly(a.vetCheckingDog)},
      {_key: 'vet-testimonial-anisa', vetName: 'drh. Anisa Widjaja', credentials: 'drh.', clinicName: 'Happy Paws Vet Care', location: 'Tangerang', quote: 'Clear serving guidance gives pawrents a better starting point when they ask about meal transitions.', photo: imageOnly(a.animalHospital)},
    ],
    partnerClinics: [
      {_key: 'clinic-selatan', clinicName: 'Klinik Satwa Selatan', address: 'Jl. Kemang Raya No. 12, Jakarta Selatan', city: 'Jakarta', phone: '+6281200000001', googleMapsUrl: 'https://maps.google.com', logo: imageOnly(a.animalHospital)},
      {_key: 'clinic-happy-paws', clinicName: 'Happy Paws Vet Care', address: 'Gading Serpong, Tangerang', city: 'Tangerang', phone: '+6281200000002', googleMapsUrl: 'https://maps.google.com', logo: imageOnly(a.vetCheckingDog)},
    ],
    vetQA: [
      {_key: 'qa-transition', question: 'How should a dog transition into cooked meals?', answer: 'Start gradually, observe appetite and stool quality, and avoid changing too many variables at once. Pawmeals content should support, not replace, individualized veterinary guidance.', answeredBy: {_type: 'reference', _ref: vetAuthor._id}},
      {_key: 'qa-sensitive', question: 'Can cooked food support sensitive routines?', answer: 'It can be a helpful structure when ingredients and portions are clear, but dogs with medical conditions should follow vet-specific advice first.', answeredBy: {_type: 'reference', _ref: vetAuthor._id}},
    ],
  }

  const blogPosts = [
    {
      _id: 'blog-real-food-routine',
      _type: 'blogPost',
      title: 'What a Real-Food Dog Meal Routine Can Look Like',
      slug: slug('What a Real-Food Dog Meal Routine Can Look Like'),
      excerpt: 'A visual guide to making cooked dog food feel simple, repeatable, and less intimidating for busy pawrents.',
      publishedAt: '2026-05-07T03:00:00.000Z',
      readingTime: 4,
      category: 'nutrition',
      tags: ['fresh food', 'routine', 'pawmeals'],
      featuredImage: imageField(a.personServingDogFood, 'A person serving dog food into a clean bowl'),
      author: {_type: 'reference', _ref: nutritionAuthor._id},
      body: pt('A better feeding routine starts with clarity: what is in the bowl, how often it is served, and what the pawrent should observe after the meal. Use this article as a CMS-driven preview of how Pawmeals can educate without overwhelming.'),
      seo: {title: 'Real-Food Dog Meal Routine | Pawmeals', description: 'A simple CMS-driven guide to cooked dog meal routines for Pawmeals pawrents.'},
    },
    {
      _id: 'blog-transition-with-confidence',
      _type: 'blogPost',
      title: 'How to Transition Without Turning Dinner Into a Science Project',
      slug: slug('How to Transition Without Turning Dinner Into a Science Project'),
      excerpt: 'A friendly transition article that gives pawrents useful questions and simple observations instead of generic promises.',
      publishedAt: '2026-05-05T03:00:00.000Z',
      readingTime: 5,
      category: 'health',
      tags: ['transition', 'digestion', 'vet conversation'],
      featuredImage: imageField(a.dogBowlKitchen, 'Dog waiting by a meal bowl in a bright kitchen'),
      author: {_type: 'reference', _ref: vetAuthor._id},
      body: pt('Introduce new meals gradually and make the observation process simple. Appetite, stool consistency, energy, and comfort are more useful to track than complicated assumptions.'),
      seo: {title: 'Dog Food Transition Guide | Pawmeals', description: 'A practical transition guide for pawrents trying cooked dog food routines.'},
    },
  ]

  const pawrentingTips = [
    {
      _id: 'tip-serving-fresh-meals',
      _type: 'pawrentingTip',
      title: 'How to Serve Fresh Cooked Meals Without Overthinking It',
      slug: slug('How to Serve Fresh Cooked Meals Without Overthinking It'),
      excerpt: 'A concise serving guide for thawing, plating, observing, and making mealtime feel consistent.',
      publishedAt: '2026-05-06T03:00:00.000Z',
      readingTime: 3,
      category: 'how-to-serve',
      tags: ['serving', 'fresh meals', 'routine'],
      featuredImage: imageField(a.smallDogFreshMeal, 'Small dog sitting near a fresh meal bowl'),
      author: {_type: 'reference', _ref: nutritionAuthor._id},
      body: pt('Keep the serving ritual simple: prepare the portion, serve at a familiar time, and observe the dog after eating. Consistency makes premium food feel less complicated.'),
      relatedProducts: ['fresh-cooked-chicken', 'weekly-meal-plan'],
      seo: {title: 'How to Serve Pawmeals Fresh Cooked Meals', description: 'Simple serving guidance for fresh cooked dog meals.'},
    },
    {
      _id: 'tip-questions-for-your-vet',
      _type: 'pawrentingTip',
      title: 'Questions to Ask Your Vet Before Changing Your Dog’s Meals',
      slug: slug('Questions to Ask Your Vet Before Changing Your Dogs Meals'),
      excerpt: 'A pawrent-friendly checklist for turning nutrition anxiety into a better clinic conversation.',
      publishedAt: '2026-05-04T03:00:00.000Z',
      readingTime: 4,
      category: 'dog-nutrition',
      tags: ['vet', 'nutrition', 'questions'],
      featuredImage: imageField(a.vetCheckingDog, 'Veterinarian examining a dog with a stethoscope'),
      author: {_type: 'reference', _ref: vetAuthor._id},
      body: pt('Ask about your dog’s current body condition, health history, transition speed, and what signs to monitor. The goal is not to sound technical; it is to become more observant and prepared.'),
      relatedProducts: ['fresh-cooked-chicken'],
      seo: {title: 'Questions to Ask Your Vet About Dog Meals', description: 'A Pawmeals guide to better vet conversations about dog nutrition.'},
    },
  ]

  const vetArticles = [
    {
      _id: 'vet-article-clear-ingredient-conversations',
      _type: 'vetArticle',
      title: 'Why Clear Ingredient Conversations Matter in Daily Feeding',
      slug: slug('Why Clear Ingredient Conversations Matter in Daily Feeding'),
      excerpt: 'A professional note on why simple ingredient clarity can improve nutrition conversations between vets and families.',
      publishedAt: '2026-05-03T03:00:00.000Z',
      category: 'nutrition-science',
      featuredImage: imageField(a.animalHospital, 'Veterinary clinic care scene'),
      author: {_type: 'reference', _ref: vetAuthor._id},
      body: pt('Ingredient clarity does not replace clinical judgment, but it helps families explain what their dogs are actually eating. That context can make nutrition guidance more practical.'),
    },
  ]

  const faqs = [
    {_id: 'faq-fresh-or-frozen', _type: 'faq', question: 'Are Pawmeals served fresh or frozen?', answer: 'Use this CMS answer as preview copy: Pawmeals can explain storage and serving clearly so pawrents know how to prepare each meal safely.', category: 'products', order: 1},
    {_id: 'faq-transition-time', _type: 'faq', question: 'How long should transition take?', answer: 'Most dogs benefit from a gradual transition. The exact timeline should consider the dog’s current diet, age, sensitivity, and any veterinary advice.', category: 'nutrition', order: 2},
    {_id: 'faq-whatsapp-order', _type: 'faq', question: 'Can I order through WhatsApp?', answer: 'Yes. The catering page includes a WhatsApp-focused CTA so ordering can stay simple while the website shows the meal experience visually.', category: 'ordering', order: 3},
    {_id: 'faq-delivery-area', _type: 'faq', question: 'Where does Pawmeals deliver?', answer: 'Replace this preview answer with current operational coverage once delivery zones are finalized.', category: 'delivery', order: 4},
  ]

  return [nutritionAuthor, vetAuthor, homepage, cateringPage, aboutPage, vetExclusivePage, ...blogPosts, ...pawrentingTips, ...vetArticles, ...faqs]
}

async function main() {
  console.log(dryRun ? 'Dry run: no Sanity mutations will be written.' : 'Seeding Pawmeals demo content into Sanity.')
  const assets = await uploadAssets()
  const docs = buildDocs(assets)

  if (dryRun) {
    console.log(`Would create or replace ${docs.length} documents:`)
    for (const doc of docs) console.log(`- ${doc._id} (${doc._type})`)
    return
  }

  const tx = client.transaction()
  for (const doc of docs) {
    tx.createOrReplace(doc)
  }

  const result = await tx.commit({visibility: 'sync'})
  console.log(`Seed complete. Mutations: ${result.transactionId || 'committed'}`)
  console.log(`Created or replaced ${docs.length} documents and uploaded ${Object.keys(assets).length} images.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
