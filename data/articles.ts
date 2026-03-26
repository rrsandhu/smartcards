/**
 * articles.ts — Blog content
 *
 * Static hand-crafted articles live below.
 * Auto-generated articles are written to data/generated-articles.json
 * by the cron script (scripts/blog-cron.mjs) and merged at runtime.
 */

import type { Article } from '@/types'
import generatedRaw from './generated-articles.json'

const generated = generatedRaw as unknown as Article[]

const staticArticles: Article[] = [
  // ─── How to Fly Business Class Using Aeroplan ────────────────────────────────
  {
    id: 'art-fly-business-class-aeroplan',
    slug: 'how-to-fly-business-class-aeroplan-points',
    title: 'How to Fly Business Class to Europe Using Aeroplan Points',
    excerpt:
      'A step-by-step guide to booking Air Canada Signature Class — and Lufthansa, SWISS, and ANA business class — using Aeroplan miles earned on Canadian credit cards.',
    category: 'points-deals',
    author: { name: 'James Park', title: 'Points & Deals Reporter' },
    publishDate: '2026-03-05',
    heroImageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Airplane wing at sunset over the clouds',
    tags: ['aeroplan', 'business-class', 'air-canada', 'points-redemption', 'flying-on-points', 'europe'],
    readingTimeMinutes: 10,
    featured: true,
    editorsPick: true,
    metaDescription:
      'How to book business class flights using Aeroplan points. Step-by-step guide to finding award space on Air Canada, Lufthansa, SWISS, ANA, and more Star Alliance partners.',
    relatedCards: [
      { cardId: 'td-aeroplan-vi', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'Best Aeroplan-earning credit card' },
      { cardId: 'amex-cobalt', cardSlug: 'american-express-cobalt', cardName: 'Amex Cobalt', reason: 'Earn Amex MR to transfer to Aeroplan at 1:1' },
      { cardId: 'amex-platinum', cardSlug: 'american-express-platinum', cardName: 'Amex Platinum', reason: 'Highest points earn + 1:1 Aeroplan transfer' },
    ],
    relatedArticleIds: ['art-amex-mr-transfer-partners-canada', 'art-aeroplan-sweet-spots'],
    content: [
      {
        type: 'paragraph',
        body: 'A business class seat to Europe can easily cost $4,000–$8,000 in cash. With Aeroplan — Canada\'s most powerful frequent flyer program — that same seat can cost 70,000–85,000 points one-way. If you use Canadian credit cards for groceries, dining, and everyday spending, you can realistically accumulate that balance in 12–18 months. Here\'s exactly how.',
      },
      {
        type: 'callout',
        calloutType: 'info',
        heading: 'TL;DR — The short version',
        body: 'Earn Aeroplan points via TD/CIBC cards or transfer from Amex MR at 1:1. Search award space at aeroplan.com. Book at the "Saver" rate when available. Transatlantic business class costs 70,000–85,000 pts one-way. Total value: ~$1,400–$1,700 per ticket.',
      },
      {
        type: 'h2',
        heading: 'Why Aeroplan Is Canada\'s Best Tool for Business Class',
      },
      {
        type: 'paragraph',
        body: 'Aeroplan uses a hybrid distance-and-zone award chart, which means the cost of a redemption is tied to the route distance — not the cash price. A Toronto–London business class ticket priced at $5,000 cash costs the same in points as a $3,500 version on a less popular date. This pricing model makes Aeroplan uniquely powerful for premium cabin redemptions: you\'re essentially paying a fixed toll regardless of how high Air Canada decides to price the cash fare.',
      },
      {
        type: 'paragraph',
        body: 'Beyond Air Canada itself, Aeroplan lets you book on 40+ Star Alliance partners — including Lufthansa, SWISS, United, ANA, Singapore Airlines, and Turkish Airlines — all through the same award chart. Many of these partners have even better business class products than Air Canada Signature Class.',
      },
      {
        type: 'h2',
        heading: 'Step 1 — How Many Points Do You Need?',
      },
      {
        type: 'table',
        headers: ['Route (one-way)', 'Saver Level', 'Latitude Level', 'Notes'],
        rows: [
          ['Canada → UK/Ireland (Zone 3)', '70,000 pts', '90,000 pts', 'Best value zone for Europe'],
          ['Canada → Europe (Zone 4)', '80,000 pts', '100,000 pts', 'France, Germany, Spain, Italy'],
          ['Canada → Middle East / India', '85,000 pts', '105,000 pts', 'Via Star Alliance partners'],
          ['Canada → Japan / Korea', '75,000 pts', '95,000 pts', 'ANA or Air Canada seasonal routes'],
          ['Canada → Southeast Asia / Australia', '100,000 pts', '120,000 pts', 'Best for Singapore Suites via partner'],
        ],
      },
      {
        type: 'paragraph',
        body: 'Always target the "Saver" award level — these are the published chart prices. "Latitude" awards exist when Saver availability is gone and cost 25–30% more points. If you can\'t find Saver space, it\'s often better to wait for availability to open (which often happens 1–3 weeks before departure) rather than book Latitude.',
      },
      {
        type: 'h2',
        heading: 'Step 2 — Finding Award Availability',
      },
      {
        type: 'paragraph',
        body: 'Aeroplan award availability is searchable at aeroplan.com. Use the flexible dates calendar view — it shows you the cheapest available award date across an entire month in one grid. Availability on Air Canada tends to be strongest 330 days before departure (the booking window opening) and again within 2–3 weeks of the flight date. For partner airlines like Lufthansa and SWISS, availability can be more limited; check early.',
      },
      {
        type: 'bullets',
        items: [
          'Search one-way awards independently for maximum flexibility',
          'Use "flexible dates" or the calendar view to spot Saver availability',
          'Try different origins (e.g. search YYZ and YVR if you\'re flexible)',
          'Star Alliance partners often have availability Aeroplan doesn\'t show on Air Canada flights',
          'Set an availability alert using tools like AwardTool or ExpertFlyer (paid)',
        ],
      },
      {
        type: 'h2',
        heading: 'Step 3 — Building Your Aeroplan Balance',
      },
      {
        type: 'paragraph',
        body: 'There are three main ways Canadians accumulate Aeroplan miles: earning directly on Aeroplan co-branded credit cards (TD and CIBC), transferring from bank point currencies like Amex Membership Rewards at 1:1, and flying Air Canada. For most people, credit card spending is far and away the fastest path.',
      },
      {
        type: 'bullets',
        items: [
          'TD Aeroplan Visa Infinite: 1.5x on groceries, gas, and Air Canada; 1x everywhere else',
          'CIBC Aeroplan Visa Infinite: similar earn, strong insurance package',
          'Amex Cobalt: earn 5x Amex MR on dining and groceries, transfer to Aeroplan at 1:1',
          'Amex Platinum: earn 3x on dining, 2x on travel; 70,000-point welcome bonus transfers to Aeroplan',
          'Flying Air Canada itself earns Status Miles + Aeroplan Points on paid fares',
        ],
      },
      {
        type: 'callout',
        calloutType: 'tip',
        heading: 'The fastest path: Amex Cobalt + Aeroplan card combo',
        body: 'Use the Amex Cobalt (5x on dining/groceries) for food spending, transfer those MR to Aeroplan when you\'re ready to book. Use a TD or CIBC Aeroplan card for everything else. This combination lets many households earn 80,000+ Aeroplan points per year from normal spending.',
      },
      {
        type: 'h2',
        heading: 'Best Business Class Redemptions with Aeroplan',
      },
      {
        type: 'h3',
        heading: 'Air Canada Signature Class to Europe',
      },
      {
        type: 'paragraph',
        body: 'Air Canada\'s Signature Class features fully lie-flat seats in a 1-2-1 configuration on wide-body aircraft (787, 777, A330). The on-demand dining, Luminess amenity kit, and direct aisle access make it a competitive business class product. At 70,000–80,000 points to the UK or Western Europe, you\'re extracting ~2 cents per point — among the best redemption rates available on any Canadian program.',
      },
      {
        type: 'h3',
        heading: 'Lufthansa and SWISS Business via Star Alliance',
      },
      {
        type: 'paragraph',
        body: 'Lufthansa and SWISS offer award space to Aeroplan members on many routes. The catch: Lufthansa charges a fuel surcharge (~$300–$500 CAD per round trip) on Aeroplan awards. SWISS Business is often cited as having a superior cabin and dining experience, and SWISS tends to have fewer surcharges. Search both when pricing an award.',
      },
      {
        type: 'h3',
        heading: 'ANA Business Class — One of the World\'s Best',
      },
      {
        type: 'paragraph',
        body: 'ANA\'s "The Room" business class product is widely ranked among the world\'s top five business class cabins. At 75,000 Aeroplan points one-way from Canada to Japan, this is exceptional value. Availability is limited but does open. Worth checking 330 days in advance for popular departure windows.',
      },
      {
        type: 'callout',
        calloutType: 'tip',
        heading: 'Pro tip: Mixed cabin bookings',
        body: 'If you can\'t find business class availability end-to-end, consider booking a mixed cabin award: business on the long-haul leg, economy on the short connector. Aeroplan prices mixed cabin awards based on the highest class of service — so you still pay the business class rate. Always check if a business seat is available on at least the main ocean-crossing flight.',
      },
      {
        type: 'h2',
        heading: 'Common Mistakes to Avoid',
      },
      {
        type: 'bullets',
        items: [
          'Transferring points before you have confirmed award availability — transfers are one-way and permanent',
          'Booking Latitude when Saver availability is available closer to departure',
          'Only searching Air Canada flights when Star Alliance partners have better availability',
          'Ignoring taxes and surcharges — these are paid in cash and vary by airline (Lufthansa > ANA > Air Canada)',
          'Not checking the flexible date calendar — Saver seats are often just 3–5 days away from your preferred date',
        ],
      },
    ],
  },

  // ─── Amex MR Transfer Partners Canada Guide ───────────────────────────────────
  {
    id: 'art-amex-mr-transfer-partners-canada',
    slug: 'amex-membership-rewards-transfer-partners-canada',
    title: 'Amex Membership Rewards Transfer Partners: Complete Canadian Guide',
    excerpt:
      'A full breakdown of every Amex MR transfer partner available in Canada — which offer 1:1 ratios, which have surcharges, and which sweet spots are worth chasing.',
    category: 'points-deals',
    author: { name: 'Sarah Mitchell', title: 'Senior Finance Editor' },
    publishDate: '2026-03-08',
    heroImageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Travel and adventure — passport, map, and camera on a wooden table',
    tags: ['amex', 'membership-rewards', 'transfer-partners', 'aeroplan', 'points-strategy'],
    readingTimeMinutes: 8,
    featured: true,
    editorsPick: false,
    metaDescription:
      'All Amex Membership Rewards transfer partners available to Canadians — ratios, transfer times, surcharges, and the best redemptions for each program.',
    relatedCards: [
      { cardId: 'amex-cobalt', cardSlug: 'american-express-cobalt', cardName: 'Amex Cobalt', reason: 'Best Amex MR earner for everyday spend' },
      { cardId: 'amex-platinum', cardSlug: 'american-express-platinum', cardName: 'Amex Platinum', reason: 'Highest earn rates + transfer bonus eligibility' },
    ],
    relatedArticleIds: ['art-fly-business-class-aeroplan', 'art-aeroplan-sweet-spots'],
    content: [
      {
        type: 'paragraph',
        body: 'American Express Membership Rewards is the most flexible points currency in Canada. With nine transfer partners including Aeroplan, British Airways Avios, Air France-KLM Flying Blue, Singapore KrisFlyer, and Marriott Bonvoy, Amex MR gives Canadian cardholders access to a breadth of redemption options no other domestic bank currency can match. Here\'s exactly what you can do with your points.',
      },
      {
        type: 'callout',
        calloutType: 'info',
        heading: 'Key rule: transfers are one-way and irreversible',
        body: 'Once you transfer Amex MR to any partner, those points cannot be returned. Only transfer when you have a specific redemption in mind and have already confirmed award availability in that program.',
      },
      {
        type: 'h2',
        heading: 'All Canadian Amex MR Transfer Partners at a Glance',
      },
      {
        type: 'table',
        headers: ['Partner', 'Type', 'Ratio', 'Transfer Time', 'Fuel Surcharges?'],
        rows: [
          ['Air Canada Aeroplan', 'Airline', '1:1', 'Instant', 'Minimal on AC'],
          ['British Airways Avios', 'Airline', '1:1', '3–5 days', 'High on BA flights'],
          ['Air France-KLM Flying Blue', 'Airline', '1:1', '3–5 days', 'Moderate'],
          ['Singapore Airlines KrisFlyer', 'Airline', '1:1', 'Up to 24 hrs', 'Yes on SQ'],
          ['Delta SkyMiles', 'Airline', '1:1', '3–5 days', 'No — but dynamic pricing'],
          ['Etihad Guest', 'Airline', '1:1', '3–5 days', 'Minimal'],
          ['Emirates Skywards', 'Airline', '1:1', 'Up to 24 hrs', 'Moderate'],
          ['Marriott Bonvoy', 'Hotel', '1:1.2', 'Up to 5 days', 'N/A'],
          ['Hilton Honors', 'Hotel', '1:2', 'Up to 5 days', 'N/A'],
        ],
      },
      {
        type: 'h2',
        heading: 'Aeroplan — The Default Best Choice for Canadians',
      },
      {
        type: 'paragraph',
        body: 'Aeroplan should be your first consideration when deciding where to send Amex MR points. The instant 1:1 transfer ratio, combined with Aeroplan\'s access to 40+ Star Alliance airlines and a well-structured distance award chart, makes it the most versatile destination. A 70,000-point transfer books a business class seat to Europe worth $3,500–$5,000 in cash. If Amex runs a transfer bonus (typically 20–30% bonus to Aeroplan, offered periodically), this becomes even more compelling.',
      },
      {
        type: 'h2',
        heading: 'British Airways Avios — Best for Short-Haul and Iberia Redemptions',
      },
      {
        type: 'paragraph',
        body: 'Avios uses a distance-based chart that prices short-haul redemptions exceptionally well. A Toronto–New York City flight (under 500 miles) costs just 4,500 Avios in economy. The real power move: transfer Avios to Iberia and book Madrid–New York in business class for 34,000 Avios one-way — one of the best transatlantic business class deals available anywhere. The catch is that Iberia and BA availability is separate and requires time to find.',
      },
      {
        type: 'h2',
        heading: 'Flying Blue — Best for Air France Business Class to Europe',
      },
      {
        type: 'paragraph',
        body: 'Air France-KLM Flying Blue runs monthly "Promo Rewards" that discount certain routes by 25–50%. When an Air France business class promo hits Paris routes — which happens several times per year — you can book for as few as 40,000–50,000 miles one-way from North America. Set a Flying Blue Promo Rewards alert and jump when one appears.',
      },
      {
        type: 'callout',
        calloutType: 'tip',
        heading: 'Flying Blue Promo Rewards — how to find them',
        body: 'Flying Blue releases monthly promo awards on the 15th of each month. Sign up for the Flying Blue newsletter and check flyingblue.com/en/promo-rewards on the 15th. Promo seats are limited and sell out fast — have your Amex MR ready to transfer the moment you spot a route you want.',
      },
      {
        type: 'h2',
        heading: 'Singapore KrisFlyer — For Premium Suites Redemptions',
      },
      {
        type: 'paragraph',
        body: 'Singapore Airlines First Class Suites is widely considered the best commercial flying experience in the world. The catch: KrisFlyer points are notoriously hard to use for Suites redemptions, as Singapore Airlines releases very limited award space. That said, business class ("Business Class") is more achievable and is still a world-class product. KrisFlyer is worth transferring to if you\'re specifically targeting a Singapore Airlines cabin.',
      },
      {
        type: 'h2',
        heading: 'Hotel Partners: Marriott and Hilton',
      },
      {
        type: 'paragraph',
        body: 'The two hotel transfer options are rarely the best use of Amex MR, but they have their place. Marriott Bonvoy at 1:1.2 (you receive more points than you send) can help top off a Bonvoy balance for a luxury redemption. Hilton Honors at 1:2 sounds generous, but Hilton points are worth ~0.5¢ each, so the effective value is roughly 1¢ per Amex MR point — less than you\'d get from airline transfers. Use hotel transfers only when chasing a specific property redemption.',
      },
      {
        type: 'h2',
        heading: 'Watch for Transfer Bonuses',
      },
      {
        type: 'paragraph',
        body: 'Periodically — usually 2–4 times per year — American Express runs transfer bonuses to select partners. A 20% bonus to Aeroplan means 60,000 Amex MR becomes 72,000 Aeroplan miles instead of 60,000. These bonuses are not publicized far in advance; the best way to catch them is subscribing to SmartCardOffers\'s newsletter or following Canadian points blogs. The bonuses typically run for 2–4 weeks.',
      },
      {
        type: 'bullets',
        items: [
          'Transfer bonuses have historically ranged from 15% to 30%',
          'Both standard Amex MR cards and the Cobalt are eligible for transfer bonuses',
          'Minimum transfer amounts vary by partner (usually 1,000 or 5,000 points)',
          'You cannot transfer fractional amounts — transfers must be in whole multiples of the minimum',
        ],
      },
    ],
  },

  // ─── Beginner's Guide to Canadian Credit Card Points ──────────────────────────
  {
    id: 'art-beginners-guide-canadian-points',
    slug: 'beginners-guide-canadian-credit-card-points',
    title: 'The Beginner\'s Guide to Canadian Credit Card Points (2026)',
    excerpt:
      'New to credit card rewards in Canada? This complete guide explains how points work, which programs matter, and exactly how to get started without making costly mistakes.',
    category: 'guides',
    author: { name: 'Sarah Mitchell', title: 'Senior Finance Editor' },
    publishDate: '2026-03-10',
    heroImageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'World map with travel planning items',
    tags: ['beginner', 'getting-started', 'points-guide', 'canada', 'aeroplan', 'amex', 'credit-cards'],
    readingTimeMinutes: 11,
    featured: true,
    editorsPick: true,
    metaDescription:
      'A complete beginner\'s guide to Canadian credit card points. Learn how points work, which programs are best, and how to earn your first free flight.',
    relatedCards: [
      { cardId: 'amex-cobalt', cardSlug: 'american-express-cobalt', cardName: 'Amex Cobalt', reason: 'Best first travel rewards card for beginners' },
      { cardId: 'td-aeroplan-vi', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'Best entry-level Aeroplan card' },
      { cardId: 'scotiabank-scene-plus-visa', cardSlug: 'scotiabank-scene-plus-visa', cardName: 'Scotiabank Scene+ Visa', reason: 'Best no-fee starting point' },
    ],
    relatedArticleIds: ['art-best-travel-credit-cards-canada-2026', 'art-fly-business-class-aeroplan'],
    content: [
      {
        type: 'paragraph',
        body: 'Every year, millions of Canadians leave thousands of dollars in free travel on the table — simply because nobody explained how credit card points actually work. This guide will change that. By the end, you\'ll understand the Canadian points landscape, know which programs are worth your time, and have a clear plan to earn your first free flight.',
      },
      {
        type: 'h2',
        heading: 'How Credit Card Points Actually Work',
      },
      {
        type: 'paragraph',
        body: 'When you spend on a rewards credit card, you earn points (or miles, or dollars) based on your spending. The earn rate varies by card and category: a card might give you 5x points at restaurants, 3x on groceries, and 1x everywhere else. Those points accumulate in a loyalty account and can be redeemed for flights, hotels, statement credits, merchandise, and more.',
      },
      {
        type: 'paragraph',
        body: 'The key insight: the same dollar spent can be worth vastly different amounts depending on which card you used and how you redeem the rewards. A savvy Canadian can extract 3–5× more value per dollar spent than someone using a basic no-rewards card.',
      },
      {
        type: 'h2',
        heading: 'The Three Types of Canadian Points Programs',
      },
      {
        type: 'h3',
        heading: '1. Bank Point Currencies (Flexible)',
      },
      {
        type: 'paragraph',
        body: 'These are points issued by a bank that can be transferred to multiple airline and hotel programs. Amex Membership Rewards (earned on Amex Cobalt, Platinum, etc.) is Canada\'s most powerful example — you can transfer to Aeroplan, British Airways Avios, Flying Blue, and more. RBC Avion is another. These are the most flexible currencies because you\'re not locked into one airline.',
      },
      {
        type: 'h3',
        heading: '2. Airline Programs (Locked-In)',
      },
      {
        type: 'paragraph',
        body: 'Aeroplan is Canada\'s dominant airline program, operated by Air Canada. TD and CIBC issue Aeroplan co-branded cards that earn directly into your Aeroplan account. The advantage: these cards often earn at higher rates for Air Canada purchases. The tradeoff: your points are tied to Air Canada\'s partner network.',
      },
      {
        type: 'h3',
        heading: '3. Coalition Programs (Simple & Retail)',
      },
      {
        type: 'paragraph',
        body: 'Scene+ (Scotiabank + Cineplex + Sobeys) and BMO Rewards are simpler programs — points are worth a fixed 1 cent each and redeem for travel, movies, or statement credits. No complex award charts, no partner transfers. Excellent for beginners who want simplicity.',
      },
      {
        type: 'callout',
        calloutType: 'info',
        heading: 'Which type is right for you?',
        body: 'Start with a flexible bank currency (like Amex MR) or a coalition program (like Scene+). Once you understand the basics and know where you want to travel, layer in a specific airline card like TD Aeroplan for targeted earning.',
      },
      {
        type: 'h2',
        heading: 'How to Earn Your First 50,000 Points',
      },
      {
        type: 'paragraph',
        body: '50,000 Aeroplan points is roughly enough for a round-trip economy flight from Toronto to London, or a one-way premium economy seat. Here\'s a realistic path to getting there in 6–12 months:',
      },
      {
        type: 'bullets',
        items: [
          'Apply for the Amex Cobalt — earn 15,000 bonus points over your first year by spending $500/month',
          'Use the Cobalt for all restaurants and grocery purchases (5x points)',
          'At $500/month on food categories: 5,000 pts/month = 60,000 pts/year just on dining/groceries',
          'Add an annual spend of $500 on travel: +1,000 pts',
          'Transfer your Amex MR to Aeroplan when you\'re ready to book',
        ],
      },
      {
        type: 'h2',
        heading: 'Points Valuation — What Are Your Points Worth?',
      },
      {
        type: 'paragraph',
        body: 'Points aren\'t worth a fixed dollar amount — their value depends on how you redeem them. A single Aeroplan point might be worth 0.5¢ if you redeem for merchandise, or 2.5¢ if you book a business class seat. This is why the redemption strategy matters as much as the earn strategy.',
      },
      {
        type: 'table',
        headers: ['Program', 'Cash/Statement Redemption', 'Economy Flight', 'Business Class'],
        rows: [
          ['Aeroplan', '~0.8¢', '~1.5¢', '~2.0–3.0¢'],
          ['Amex MR (via transfer)', '~1.0¢', '~1.5¢ via Aeroplan', '~2.0–3.0¢ via Aeroplan'],
          ['Scene+', '1.0¢', '1.0¢', 'N/A'],
          ['BMO Rewards', '~0.67¢', '~1.0¢ via portal', 'N/A'],
          ['RBC Avion', '~0.9¢', '~1.5¢ via Avios', 'Variable'],
        ],
      },
      {
        type: 'callout',
        calloutType: 'tip',
        heading: 'The most important rule: never redeem points for gift cards or merchandise',
        body: 'Gift card and merchandise redemptions typically get you 0.5¢ or less per point — far below what you\'d get on flights. If you\'re going to collect points, commit to redeeming them for travel. That\'s where the outsized value lives.',
      },
      {
        type: 'h2',
        heading: 'Common Beginner Mistakes to Avoid',
      },
      {
        type: 'bullets',
        items: [
          'Applying for too many cards at once — space new applications 6 months apart to protect your credit score',
          'Carrying a balance — credit card interest (20–23%) instantly destroys any points value',
          'Letting points expire — check your program\'s expiry policy and keep accounts active',
          'Redeeming for merchandise or gift cards — always redeem for travel to get maximum value',
          'Ignoring the welcome bonus — the sign-up offer is often worth more than 12 months of spend',
          'Transferring points without confirmed award availability — transfers are permanent and one-way',
        ],
      },
      {
        type: 'h2',
        heading: 'Your First 90-Day Action Plan',
      },
      {
        type: 'bullets',
        items: [
          'Day 1: Choose one card — we recommend the Amex Cobalt for most Canadians starting out',
          'Day 30: Create an Aeroplan account (free) so you\'re ready to receive transfers',
          'Day 60: Set up auto-pay in full to avoid interest charges',
          'Day 90: Check your Amex MR balance; if you\'ve spent $500/month, you should have 8,000+ pts',
          'Ongoing: Search award availability on aeroplan.com to set a redemption goal',
        ],
      },
    ],
  },

  // ─── Aeroplan Sweet Spots ─────────────────────────────────────────────────────
  {
    id: 'art-aeroplan-sweet-spots',
    slug: 'aeroplan-best-sweet-spots-award-redemptions-2026',
    title: '7 Aeroplan Sweet Spots: The Best Award Redemptions for Canadians',
    excerpt:
      'The Aeroplan award chart has pockets of exceptional value most people miss. Here are the seven best Aeroplan sweet spots — from transatlantic business class to quick weekend escapes.',
    category: 'points-deals',
    author: { name: 'James Park', title: 'Points & Deals Reporter' },
    publishDate: '2026-03-12',
    heroImageUrl: 'https://images.unsplash.com/photo-1569154651151-1e9fc43f0813?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Airport terminal with planes visible through large windows',
    tags: ['aeroplan', 'sweet-spots', 'award-chart', 'business-class', 'points-redemption', 'star-alliance'],
    readingTimeMinutes: 9,
    featured: false,
    editorsPick: true,
    metaDescription:
      'The 7 best Aeroplan award redemptions for Canadians in 2026. Business class to Europe, ANA The Room, Lufthansa First, and more sweet spots most people miss.',
    relatedCards: [
      { cardId: 'amex-cobalt', cardSlug: 'american-express-cobalt', cardName: 'Amex Cobalt', reason: 'Earn Amex MR to transfer to Aeroplan at 1:1' },
      { cardId: 'td-aeroplan-vi', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'Direct Aeroplan earning' },
    ],
    relatedArticleIds: ['art-fly-business-class-aeroplan', 'art-amex-mr-transfer-partners-canada'],
    content: [
      {
        type: 'paragraph',
        body: 'Not all Aeroplan redemptions are created equal. Some routes offer extraordinary value — extracting 3–5 cents per point on premium cabin redemptions — while others are mediocre at best. Knowing which sweet spots exist, and how to book them, is the difference between a good points hobby and a great one. Here are the seven redemptions worth building your strategy around.',
      },
      {
        type: 'h2',
        heading: '1. Air Canada Signature Class to Europe — 70,000–85,000 pts',
      },
      {
        type: 'paragraph',
        body: 'The crown jewel of Aeroplan redemptions. Air Canada\'s Signature Class (business) to London, Paris, Frankfurt, Amsterdam, or Zurich costs 70,000–80,000 Aeroplan points one-way in a Saver award. Cash prices for the same seats routinely hit $4,000–$6,000. At 70,000 points for a $4,500 seat, you\'re getting 6.4¢ per point — arguably the best value in Canadian points.',
      },
      {
        type: 'callout',
        calloutType: 'highlight',
        heading: 'Value check',
        body: '70,000 Aeroplan points → $4,500 Air Canada Signature Class seat = 6.4¢/pt. The same 70,000 points redeemed for a statement credit = $700. Booking the flight is 6× more valuable than cashing out.',
      },
      {
        type: 'h2',
        heading: '2. ANA Business Class to Japan — 75,000 pts',
      },
      {
        type: 'paragraph',
        body: 'ANA\'s "The Room" business class product is routinely ranked the world\'s best or second-best business class. Fully enclosed suites, direct aisle access, and outstanding Japanese hospitality on the Tokyo route. Aeroplan prices this at 75,000 points one-way from Canada — roughly the same as a domestic transatlantic route, but for a product worth $7,000–$9,000 in cash.',
      },
      {
        type: 'h2',
        heading: '3. Short-Haul North America — 6,000–12,500 pts Each Way',
      },
      {
        type: 'paragraph',
        body: 'Aeroplan\'s zone-based pricing makes short-haul economy redemptions excellent value for weekend getaways. Toronto–Ottawa, Toronto–Montreal, Vancouver–Victoria, and similar short routes start at 6,000 points in economy — often less than a $100 gift card would cost at those same point values. Great for impulse travel when you spot cheap availability.',
      },
      {
        type: 'h2',
        heading: '4. United Airlines Polaris Business to South America — 63,000 pts',
      },
      {
        type: 'paragraph',
        body: 'Booking United Polaris (business class) to South America via the Aeroplan chart costs just 55,000–63,000 points one-way from the US — and since Aeroplan allows connections, Canadians can often add a short Air Canada segment and clear the whole trip for a modest extra amount. United Polaris features fully lie-flat seats and is a significant upgrade over economy on these long routes.',
      },
      {
        type: 'h2',
        heading: '5. Singapore Business Class via "Saver" Space — 80,000 pts',
      },
      {
        type: 'paragraph',
        body: 'Singapore Airlines releases Saver award space to Aeroplan on select flights, though availability is limited. When it opens, business class to Singapore costs 80,000 points one-way and includes access to Singapore\'s renowned Business Class product — an experience cash-priced at $6,000–$10,000. Book 330 days in advance for the best shot at availability.',
      },
      {
        type: 'h2',
        heading: '6. Turkish Airlines Business to Southeast Asia via Istanbul',
      },
      {
        type: 'paragraph',
        body: 'Turkish Airlines has one of the most underrated business class products in the world, and it\'s a Star Alliance member bookable via Aeroplan. Routes connecting North America to Southeast Asia via Istanbul can unlock significant award value, especially if you\'re willing to take a longer routing. Turkish business class features the famous "Flying Chef" dining service in business class — a genuinely premium experience.',
      },
      {
        type: 'h2',
        heading: '7. Layovers in Tokyo, Istanbul, or Frankfurt — Free with Aeroplan',
      },
      {
        type: 'paragraph',
        body: 'Aeroplan allows stopovers of up to 24 hours at connecting points on international one-way awards — without charging extra points. This means a business class award from Toronto to Sydney via Tokyo can include a 22-hour stopover in Tokyo at no extra cost. Similarly, a Europe award routing through Frankfurt can include a full day in the city. This "stopover hack" effectively gives you two destinations for the price of one.',
      },
      {
        type: 'callout',
        calloutType: 'tip',
        heading: 'Pro tip: Use the stopover to your advantage',
        body: 'When booking international one-way awards, always check if your routing offers a useful stopover city. Tokyo, Istanbul, Frankfurt, London, and Zurich all make excellent one-day cities. Aeroplan\'s policy is among the most generous of any North American program for stopovers.',
      },
    ],
  },

  // ─── Best Canadian Travel Credit Cards 2026 ──────────────────────────────────
  {
    id: 'art-best-travel-credit-cards-canada-2026',
    slug: 'best-travel-credit-cards-canada-2026',
    title: 'Best Travel Credit Cards in Canada for 2026 — Our Top Picks',
    excerpt:
      'We\'ve ranked the best Canadian travel credit cards by annual value, welcome bonus, earn rates, and real-world perks. From premium cards to no-fee options.',
    category: 'credit-card-deals',
    author: { name: 'Sarah Mitchell', title: 'Senior Finance Editor' },
    publishDate: '2026-03-15',
    updatedDate: '2026-03-17',
    heroImageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Person tapping credit card on payment terminal',
    tags: ['travel-cards', 'best-of', 'comparison', 'amex', 'aeroplan', 'rbc-avion', 'scotiabank'],
    readingTimeMinutes: 10,
    featured: true,
    editorsPick: false,
    metaDescription:
      'Best travel credit cards in Canada for 2026 ranked and reviewed. Compare the Amex Cobalt, TD Aeroplan Visa Infinite, Scotiabank Passport, and more.',
    relatedCards: [
      { cardId: 'amex-cobalt', cardSlug: 'american-express-cobalt', cardName: 'Amex Cobalt', reason: 'Best everyday travel card' },
      { cardId: 'amex-platinum', cardSlug: 'american-express-platinum', cardName: 'Amex Platinum', reason: 'Best premium travel card' },
      { cardId: 'td-aeroplan-vi', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'Best Aeroplan-focused card' },
      { cardId: 'scotiabank-passport-vi', cardSlug: 'scotiabank-passport-visa-infinite', cardName: 'Scotiabank Passport Visa Infinite', reason: 'Best no-FX travel card' },
    ],
    relatedArticleIds: ['art-aeroplan-sweet-spots', 'art-beginners-guide-canadian-points'],
    content: [
      {
        type: 'paragraph',
        body: 'The best travel credit card for you depends on where you bank, how much you spend, and what kind of travel you want to fund. This ranking covers the top options across all tiers — from the $799/year premium card that pays for itself in the first month, to the no-annual-fee option that still earns enough for a free flight every year.',
      },
      {
        type: 'callout',
        calloutType: 'info',
        heading: 'How we ranked these cards',
        body: 'We calculated net first-year value (welcome bonus + estimated ongoing earn − annual fee) for a typical Canadian household spending $3,000/month across groceries, dining, travel, and other categories. Points were valued at their realistic average redemption rate.',
      },
      {
        type: 'h2',
        heading: '1. Amex Cobalt — Best Everyday Travel Card',
      },
      {
        type: 'paragraph',
        body: 'The Amex Cobalt earns 5 Amex MR points per dollar on dining and groceries — a rate that no other Canadian card comes close to matching. On a household spending $1,500/month on food categories, that\'s 7,500 points per month or 90,000 points per year — enough to book a business class flight to Europe. The $155.88 annual fee is trivially small relative to the ongoing earn potential. For most Canadians, this should be their primary spending card.',
      },
      {
        type: 'bullets',
        items: [
          '5x points on dining & food delivery, 3x on streaming & eligible travel',
          'Flexible Amex MR points transfer to Aeroplan, Avios, Flying Blue, and more at 1:1',
          '$155.88/year (monthly billing at $12.99)',
          'Welcome bonus: earn up to 15,000 points in year one with monthly $500 spend',
          'Supplementary cards: $0 (great for household pooling)',
        ],
      },
      {
        type: 'h2',
        heading: '2. Scotiabank Passport Visa Infinite — Best for Frequent Flyers',
      },
      {
        type: 'paragraph',
        body: 'The Scotiabank Passport Visa Infinite\'s headline feature: no foreign transaction fees. For Canadians who travel internationally several times a year and use their card abroad, this 2.5% fee waiver alone can save $200–$400 per year. Layer in 3x Scene+ on dining, 2x on transit and streaming, plus six free Visa Airport Companion lounge visits annually, and you have a genuinely compelling all-in-one travel card.',
      },
      {
        type: 'bullets',
        items: [
          'No foreign transaction fees — rare for a Canadian card at this fee level',
          '3x Scene+ on dining, 2x on groceries, transit, streaming',
          '6 free airport lounge visits per year (Visa Airport Companion network)',
          '$150 annual fee (first year free on some offers)',
          'Strong travel insurance: emergency medical, trip cancellation, baggage',
        ],
      },
      {
        type: 'h2',
        heading: '3. TD Aeroplan Visa Infinite — Best for Aeroplan Collectors',
      },
      {
        type: 'paragraph',
        body: 'If you fly Air Canada regularly and want to build Aeroplan miles as efficiently as possible, the TD Aeroplan Visa Infinite is purpose-built for you. It earns 1.5x Aeroplan on groceries, gas, and Air Canada purchases — and those miles go directly into your Aeroplan account with no transfer step required. The included travel insurance package is also among the most comprehensive in this fee tier.',
      },
      {
        type: 'h2',
        heading: '4. Amex Platinum — Best Premium Travel Card',
      },
      {
        type: 'paragraph',
        body: 'The Amex Platinum\'s $799 annual fee is steep, but the benefits more than offset it for the right cardholder. The $200 annual travel credit effectively reduces the fee to $599. Add in unlimited lounge access at 1,400+ airport lounges globally (Centurion, Priority Pass, Escape, and more), comprehensive travel insurance, and a 70,000-point welcome bonus worth ~$1,050 in Aeroplan flights, and the first-year value is over $2,000 for frequent travellers.',
      },
      {
        type: 'callout',
        calloutType: 'tip',
        heading: 'The Amex Platinum "break-even" calculation',
        body: 'The $799 fee sounds daunting. But: $200 travel credit + $100 dining credit + $200+ in lounge visit value (at $40/visit, you need 5 visits to break even) = the card pays for itself if you fly internationally 5+ times per year and use the credits. The welcome bonus alone covers the first-year fee.',
      },
      {
        type: 'h2',
        heading: '5. Scotiabank Scene+ Visa — Best No-Fee Travel Card',
      },
      {
        type: 'paragraph',
        body: 'For those who refuse to pay an annual fee, the Scotiabank Scene+ Visa earns 5x at Cineplex, 3x at Sobeys group stores, and 2x on dining. The points are worth 1 cent each and can be redeemed on any Expedia booking with no blackout dates. Simple, transparent, and surprisingly generous for a $0/year product.',
      },
      {
        type: 'h2',
        heading: 'Honourable Mention: RBC Avion Visa Infinite',
      },
      {
        type: 'paragraph',
        body: 'The RBC Avion earns in its own bank currency (Avion Rewards) that can be transferred to British Airways Avios, WestJet Dollars, and American Airlines AAdvantage. For RBC clients who want a single institution relationship or who frequently fly WestJet, Avion offers a compelling alternative to the Amex ecosystem. The companion voucher feature available on some Avion tiers adds meaningful value for couples who travel together.',
      },
    ],
  },
  // ─── Best Cash Back Credit Cards Canada 2026 ────────────────────────────────
  {
    id: 'art-best-cash-back-cards-canada-2026',
    slug: 'best-cash-back-credit-cards-canada-2026',
    title: 'Best Cash Back Credit Cards in Canada for 2026',
    excerpt:
      'No points math required. We ranked the top cash back cards in Canada by actual dollars returned — from no-fee everyday earners to premium cards that pay back 4% on groceries.',
    category: 'credit-card-deals',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-03-20',
    heroImageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Person tapping a credit card on a payment terminal',
    tags: ['cash-back', 'no-fee', 'groceries', 'everyday-spending', 'canada'],
    readingTimeMinutes: 7,
    featured: true,
    editorsPick: true,
    metaDescription:
      'The best cash back credit cards in Canada for 2026. Compare earn rates on groceries, gas, and everyday purchases. No-fee and premium options ranked by real dollar returns.',
    relatedCards: [],
    content: [
      {
        type: 'paragraph',
        body: 'Cash back credit cards are the simplest way to get rewarded — no airline loyalty programs, no point valuations, just real money back on every purchase. But not all cash back cards are equal: earn rates vary wildly by category, and annual fees can eat into your returns. We crunched the numbers on every major Canadian cash back card to find the best options for 2026.',
      },
      {
        type: 'callout',
        calloutType: 'tip',
        heading: 'Top Pick: Tangerine Money-Back Credit Card',
        body: 'No annual fee. Earn 2% in up to 3 categories you choose (groceries, gas, restaurants, recurring bills, etc.) and 0.5% on everything else. Best no-fee cash back card in Canada for most Canadians.',
      },
      {
        type: 'h2',
        heading: 'Best No-Fee Cash Back Cards',
      },
      {
        type: 'paragraph',
        body: 'The Tangerine Money-Back Credit Card stands out as the best no-fee option because it lets you choose your own 2% categories — up to three of them. Most Canadians select groceries, gas, and recurring bills, which covers the majority of monthly spending. There\'s no cap on cash back earned and no annual fee to offset.',
      },
      {
        type: 'paragraph',
        body: 'The Rogers Red World Elite Mastercard earns 1.5% cash back on all purchases with no annual fee (waived first year) — making it a strong flat-rate option for those who don\'t want to think about categories. It also earns 3% on purchases made in US dollars, making it one of the best cards for online US shopping.',
      },
      {
        type: 'h2',
        heading: 'Best Premium Cash Back Cards',
      },
      {
        type: 'paragraph',
        body: 'The Scotia Momentum Visa Infinite is the perennial Canadian favourite for high spenders: 4% cash back on groceries and recurring bills, 2% on gas and transit, 1% everywhere else. The $120 annual fee (waived first year) is quickly offset if you spend $500+ per month on groceries alone.',
      },
      {
        type: 'paragraph',
        body: 'The CIBC Dividend Visa Infinite matches Scotia on grocery earn rate (4%) and adds 2% on gas, EV charging, and transit. For families with large grocery bills, either card can return $300–$500 per year in cash back — well above the annual fee.',
      },
      {
        type: 'h2',
        heading: 'How Much Cash Back Can You Actually Earn?',
      },
      {
        type: 'paragraph',
        body: 'Based on a typical Canadian household spending $1,200/month on groceries, $300 on gas, $400 on restaurants, and $600 on everything else: the Scotia Momentum Visa Infinite would return approximately $612/year before the $120 fee — a net $492 annual benefit. The Tangerine Money-Back Card (no-fee, 2% groceries/gas/dining) would return approximately $504/year with zero fee.',
      },
    ],
  },

  // ─── Bank of Canada Rate Impact on Mortgages ────────────────────────────────
  {
    id: 'art-boc-rate-cuts-mortgage-impact-2026',
    slug: 'bank-of-canada-rate-cuts-mortgage-impact-2026',
    title: 'Bank of Canada Rate Cuts: What It Means for Your Mortgage in 2026',
    excerpt:
      'The Bank of Canada has cut its overnight rate four times since mid-2024. Here\'s exactly how that flows through to variable-rate mortgages, HELOCs, and renewal decisions.',
    category: 'mortgage-news',
    author: { name: 'Priya Nair', title: 'Mortgage & Housing Reporter' },
    publishDate: '2026-03-18',
    heroImageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Modern Canadian home exterior in summer',
    tags: ['bank-of-canada', 'rate-cut', 'variable-rate', 'mortgage-renewal', 'heloc', 'housing'],
    readingTimeMinutes: 6,
    featured: true,
    metaDescription:
      'Bank of Canada rate cuts explained. How lower overnight rates affect variable mortgages, HELOCs, and fixed-rate renewals in 2026 — and what Canadians should do now.',
    relatedCards: [],
    content: [
      {
        type: 'paragraph',
        body: 'The Bank of Canada\'s overnight rate currently sits at 2.75% — down significantly from its peak of 5.0% in 2023. For Canadians with variable-rate mortgages or HELOCs tied to prime, each quarter-point cut translates directly to lower monthly payments. But the picture for fixed-rate mortgages and upcoming renewals is more complicated.',
      },
      {
        type: 'callout',
        calloutType: 'info',
        heading: 'Current Rate Context',
        body: 'Bank of Canada overnight rate: 2.75% (as of March 2026). Prime rate at most major banks: 4.95%. Variable-rate mortgages typically priced at Prime minus 0.5% to Prime minus 1.0%.',
      },
      {
        type: 'h2',
        heading: 'Variable-Rate Mortgages: Immediate Relief',
      },
      {
        type: 'paragraph',
        body: 'If you have a variable-rate mortgage, you\'ve already felt the benefit of rate cuts. Every 25 basis point reduction in the overnight rate reduces prime by the same amount — and your rate adjusts automatically. On a $500,000 mortgage with 22 years remaining, moving from 5.45% to 4.45% saves approximately $270/month in interest costs.',
      },
      {
        type: 'h2',
        heading: 'Fixed-Rate Renewals: A Different Story',
      },
      {
        type: 'paragraph',
        body: 'Fixed mortgage rates are driven by the Government of Canada 5-year bond yield — not the overnight rate. Bonds have been relatively stable despite BoC cuts, which means Canadians renewing from 2019–2021 ultra-low fixed rates (1.79%–2.39%) still face significantly higher renewal rates in the 4.2%–4.8% range. Payment shock at renewal remains the defining mortgage story of 2026.',
      },
      {
        type: 'h2',
        heading: 'What Should You Do?',
      },
      {
        type: 'paragraph',
        body: 'If your mortgage renews in the next 12 months, start comparing rates now — not the week before renewal. Brokers can lock in rates 120 days in advance. If you\'re already variable and comfortable with volatility, holding may make sense if further cuts are expected. For HELOCs, the lower prime rate means debt paydown is more effective now — consider accelerating payments while you have breathing room.',
      },
    ],
  },

  // ─── How to Maximize Scene+ Points ─────────────────────────────────────────
  {
    id: 'art-maximize-scene-plus-points-canada',
    slug: 'how-to-maximize-scene-plus-points-canada',
    title: 'How to Maximize Scene+ Points: The Complete Canadian Guide',
    excerpt:
      'Scene+ is now one of Canada\'s largest loyalty programs — covering Scotiabank cards, Cineplex, Empire grocery stores, and more. Here\'s how to stack and redeem for maximum value.',
    category: 'points-deals',
    author: { name: 'James Park', title: 'Points & Deals Reporter' },
    publishDate: '2026-03-10',
    heroImageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Movie popcorn and tickets in a cinema',
    tags: ['scene-plus', 'scotiabank', 'cineplex', 'sobeys', 'loyalty-program', 'points-redemption'],
    readingTimeMinutes: 8,
    featured: true,
    editorsPick: true,
    metaDescription:
      'Complete guide to Scene+ points in Canada. How to earn faster with Scotiabank credit cards and where to redeem for best value at Cineplex, Sobeys, Empire stores, and travel.',
    relatedCards: [],
    content: [
      {
        type: 'paragraph',
        body: 'Scene+ started as a Cineplex movie rewards program. After Scotiabank\'s acquisition and the integration of Empire\'s grocery network (Sobeys, Safeway, IGA, FreshCo, Farm Boy), it has become a legitimate everyday loyalty powerhouse. With the right Scotiabank credit card, Canadians can now earn Scene+ points on every grocery run, gas fill, and dining bill — and redeem for travel, movies, and groceries.',
      },
      {
        type: 'callout',
        calloutType: 'tip',
        heading: 'Best Scene+ credit card',
        body: 'The Scotiabank Gold American Express earns 6 Scene+ points per dollar at Empire grocery stores (Sobeys, Safeway, IGA), 5 pts at restaurants and food delivery, 3 pts on gas and transit, and 1 pt elsewhere. Annual fee: $120 (waived first year).',
      },
      {
        type: 'h2',
        heading: 'Where to Earn Scene+ Points',
      },
      {
        type: 'paragraph',
        body: 'The best earning opportunities: (1) Scotiabank credit cards — especially the Gold Amex for groceries and dining, (2) Empire stores — Sobeys, Safeway, IGA, FreshCo, Farm Boy, Thrifty Foods — earn points both on the card and via the in-store Scene+ scan, (3) Cineplex — earn on every movie ticket and concession purchase.',
      },
      {
        type: 'h2',
        heading: 'Best Scene+ Redemptions',
      },
      {
        type: 'paragraph',
        body: 'Scene+ points are worth approximately 1 cent each at most redemption options. The best-value redemptions are: (1) Cineplex tickets — 1,000 points = $10 off a ticket, straightforward 1 cpp, (2) Travel through Scene+ Travel portal — flights, hotels, car rentals redeemed at 1 cpp, (3) Sobeys/Empire grocery purchases — convenient if you shop there anyway. Avoid using points for gift cards or merchandise, where the value often drops below 0.8 cpp.',
      },
      {
        type: 'h2',
        heading: 'Stacking Tips',
      },
      {
        type: 'paragraph',
        body: 'The single biggest Scene+ tip: always scan your Scene+ card or app at Sobeys/Safeway in addition to paying with your Scotiabank Gold Amex. You\'ll earn points twice — once from the store loyalty program and once from the credit card. On a $200 grocery trip, that\'s 200 bonus points (card) + 200 store points = 400+ points vs. just using another card.',
      },
    ],
  },
]

// Merge static + auto-generated, newest first
export const articles: Article[] = [
  ...generated,
  ...staticArticles,
].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

// Helper: get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

// Helper: get featured articles
export function getFeaturedArticles(): Article[] {
  return articles.filter(a => a.featured)
}

// Helper: get articles by category
export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(a => a.category === category)
}

// Helper: get related articles
export function getRelatedArticles(ids: string[]): Article[] {
  return articles.filter(a => ids.includes(a.id))
}
