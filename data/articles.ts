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
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: 'Earn Amex MR to transfer to Aeroplan at 1:1' },
      { cardId: 'amex-platinum', cardSlug: 'american-express-platinum-card', cardName: 'Amex Platinum', reason: 'Highest points earn + 1:1 Aeroplan transfer' },
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
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: 'Best Amex MR earner for everyday spend' },
      { cardId: 'amex-platinum', cardSlug: 'american-express-platinum-card', cardName: 'Amex Platinum', reason: 'Highest earn rates + transfer bonus eligibility' },
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
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: 'Best first travel rewards card for beginners' },
      { cardId: 'td-aeroplan-vi', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'Best entry-level Aeroplan card' },
      { cardId: 'pc-financial-world-elite-mastercard', cardSlug: 'pc-financial-world-elite-mastercard', cardName: 'PC Financial World Elite Mastercard', reason: 'Best no-fee rewards card for groceries' },
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
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: 'Earn Amex MR to transfer to Aeroplan at 1:1' },
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
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: 'Best everyday travel card' },
      { cardId: 'amex-platinum', cardSlug: 'american-express-platinum-card', cardName: 'Amex Platinum', reason: 'Best premium travel card' },
      { cardId: 'td-aeroplan-vi', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'Best Aeroplan-focused card' },
      { cardId: 'scotiabank-passport-vi', cardSlug: 'scotiabank-passport-visa-infinite-card', cardName: 'Scotiabank Passport Visa Infinite', reason: 'Best no-FX travel card' },
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

  // ─── Best No-Fee Credit Cards Canada 2026 ───────────────────────────────────
  {
    id: 'art-best-no-fee-credit-cards-canada-2026',
    slug: 'best-no-fee-credit-cards-canada-2026',
    title: 'Best No-Fee Credit Cards in Canada for 2026',
    excerpt: 'You don\'t need to pay an annual fee to earn great rewards. These are the best no-annual-fee credit cards in Canada right now.',
    category: 'credit-card-deals',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-04-01',
    heroImageUrl: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Credit card and coins on a clean desk',
    tags: ['no-fee', 'cash-back', 'rewards', 'canada', 'credit-cards'],
    readingTimeMinutes: 7,
    featured: true,
    editorsPick: false,
    metaDescription: 'The best no-annual-fee credit cards in Canada for 2026. Earn cash back and rewards without paying a cent in annual fees.',
    relatedCards: [
      { cardId: 'pc-financial-world-elite-mastercard', cardSlug: 'pc-financial-world-elite-mastercard', cardName: 'PC Financial World Elite Mastercard', reason: 'Best no-fee grocery rewards card' },
      { cardId: 'tangerine-money-back', cardSlug: 'tangerine-money-back', cardName: 'Tangerine Money-Back', reason: 'Best flexible no-fee cash back card' },
      { cardId: 'american-express-green-card', cardSlug: 'american-express-green-card', cardName: 'American Express Green Card', reason: 'Best no-fee travel rewards card' },
    ],
    relatedArticleIds: ['art-best-cash-back-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'No-annual-fee credit cards have come a long way. Today\'s best options earn meaningful rewards — often 2% or more in key categories — without charging you anything to hold the card. If you\'re new to credit cards, have variable monthly spending, or simply don\'t want to think about whether your card "pays for itself," a no-fee card is the smart default.' },
      { type: 'callout', calloutType: 'tip', heading: 'The rule of thumb', body: 'A no-fee card is almost always better than a fee card if your annual spending on the card is under $10,000–$15,000. Above that level, a premium card\'s higher earn rates usually outpace the fee.' },
      { type: 'h2', heading: 'Top No-Fee Cards in Canada' },
      { type: 'paragraph', body: 'The PC Financial World Elite Mastercard earns 45 PC Optimum points per dollar at Loblaw-banner stores (Loblaws, No Frills, Real Canadian Superstore, Shoppers Drug Mart) and 30 points per dollar everywhere else. With over 2,500 Loblaw locations across Canada, this card is unbeatable for grocery earners who shop at those banners. There\'s no annual fee, and points are redeemed at Loblaw stores at a rate of 10,000 points = $10.' },
      { type: 'paragraph', body: 'The Tangerine Money-Back Credit Card earns 2% cash back in up to three categories you choose (groceries, gas, restaurants, recurring bills, drug stores, home improvement, furniture, hotel/motel, entertainment, or public transit) and 0.5% on everything else. The flexibility to pick your own categories makes it ideal for people whose spending doesn\'t fit a standard template.' },
      { type: 'h2', heading: 'Honourable Mentions' },
      { type: 'paragraph', body: 'The American Express Green Card earns 1 Amex Membership Rewards point per dollar with no annual fee — valuable because Amex MR points transfer to Aeroplan at 1:1. The SimplyCash Card from American Express earns 1.25% flat cash back. For grocery shoppers at Empire stores (Sobeys, Safeway), the free Scotiabank Scene+ Visa gives you Scene+ points with no fee.' },
    ],
  },

  // ─── Amex Cobalt Review 2026 ─────────────────────────────────────────────────
  {
    id: 'art-amex-cobalt-review-2026',
    slug: 'amex-cobalt-review-2026',
    title: 'Amex Cobalt Review 2026: Canada\'s Best Everyday Rewards Card?',
    excerpt: 'The Amex Cobalt earns 5x points on dining and groceries, making it one of the highest earn-rate cards in Canada. Here\'s a full 2026 review.',
    category: 'guides',
    author: { name: 'Marcus Williams', title: 'Senior Cards Analyst' },
    publishDate: '2026-03-28',
    heroImageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Restaurant dining table with food and drinks',
    tags: ['amex', 'cobalt', 'dining', 'travel', 'membership-rewards', 'review'],
    readingTimeMinutes: 9,
    featured: true,
    editorsPick: true,
    metaDescription: 'Full Amex Cobalt review for 2026. Earn 5x points on food and drinks, 3x on streaming, 2x on travel. Is it worth the $155.88 annual fee?',
    relatedCards: [
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: 'The card being reviewed' },
      { cardId: 'american-express-gold-rewards-card', cardSlug: 'american-express-gold-rewards-card', cardName: 'Amex Gold Rewards', reason: 'Best Amex card for higher income earners' },
      { cardId: 'scotiabank-gold-american-express-card', cardSlug: 'scotiabank-gold-american-express-card', cardName: 'Scotiabank Gold Amex', reason: 'Best competitor for groceries and dining' },
    ],
    relatedArticleIds: ['art-amex-mr-transfer-partners-canada', 'art-best-travel-credit-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'The American Express Cobalt is consistently ranked among the best everyday credit cards in Canada, and for good reason. It earns 5 Membership Rewards points per dollar at restaurants, cafes, food delivery, and grocery stores — a category that most Canadians spend thousands of dollars on every month. For people who eat out regularly or order delivery, no other Canadian card comes close to this earn rate.' },
      { type: 'callout', calloutType: 'info', heading: 'Quick verdict', body: 'Best for: Dining heavy spenders, urban Canadians, Aeroplan/hotel points collectors. Annual fee: $155.88 ($12.99/month). Our rating: 4.7/5.' },
      { type: 'h2', heading: 'Earn Rates' },
      { type: 'paragraph', body: '5x points at restaurants, fast food, food delivery, and grocery stores in Canada. 3x points on eligible streaming subscriptions (Netflix, Crave, Disney+, Apple TV+). 2x points on travel, transit, and gas. 1x point on everything else. The 5x rate applies to Amex\'s broad definition of "eat and drink" — including convenience stores and some delivery apps.' },
      { type: 'h2', heading: 'Point Value and Transfer Partners' },
      { type: 'paragraph', body: 'Amex Membership Rewards points are worth approximately 1.5–2 cents each when transferred to airline partners. The key transfer for Canadians: Aeroplan at 1:1 ratio. Other partners include British Airways Avios, Air France/KLM Flying Blue, Marriott Bonvoy, and Hilton Honors. Points can also be used to pay for travel at 1 cpp through the Amex travel portal.' },
      { type: 'h2', heading: 'Is the Fee Worth It?' },
      { type: 'paragraph', body: 'At $155.88/year, the Cobalt fee is moderate. Someone spending $1,000/month on dining and groceries earns 60,000 points/year — worth at least $600 transferred to Aeroplan. After the fee, that\'s a $444 net gain. For most Canadians who dine out and order delivery regularly, the math works clearly in favour of the card.' },
    ],
  },

  // ─── TD Aeroplan Visa Infinite Review ────────────────────────────────────────
  {
    id: 'art-td-aeroplan-visa-infinite-review-2026',
    slug: 'td-aeroplan-visa-infinite-review-2026',
    title: 'TD Aeroplan Visa Infinite Review 2026',
    excerpt: 'The TD Aeroplan Visa Infinite is Canada\'s most popular Aeroplan credit card. Full review of earn rates, benefits, insurance, and whether it\'s worth the $139 annual fee.',
    category: 'guides',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-03-20',
    heroImageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Airplane flying above clouds at sunset',
    tags: ['td', 'aeroplan', 'travel', 'review', 'visa-infinite'],
    readingTimeMinutes: 8,
    featured: false,
    editorsPick: false,
    metaDescription: 'TD Aeroplan Visa Infinite review 2026. Earn up to 45,000 Aeroplan points welcome bonus. Full review of earn rates, travel insurance, and perks.',
    relatedCards: [
      { cardId: 'td-aeroplan-visa-infinite', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'The card being reviewed' },
      { cardId: 'cibc-aeroplan-visa-infinite', cardSlug: 'cibc-aeroplan-visa-infinite', cardName: 'CIBC Aeroplan Visa Infinite', reason: 'Direct competitor — same Aeroplan earning' },
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: 'Best complementary card for dining earn' },
    ],
    relatedArticleIds: ['art-fly-business-class-aeroplan', 'art-aeroplan-sweet-spots'],
    content: [
      { type: 'paragraph', body: 'The TD Aeroplan Visa Infinite is the go-to Aeroplan card for most Canadians who fly Air Canada. It earns 1.5 Aeroplan points per dollar on purchases at grocery stores, gas stations, Air Canada, and drug stores, and 1 point per dollar everywhere else. The card also comes with a strong travel insurance package and Air Canada perks that make the $139 annual fee easy to justify for frequent Air Canada flyers.' },
      { type: 'h2', heading: 'Welcome Bonus' },
      { type: 'paragraph', body: 'The current welcome offer provides up to 45,000 Aeroplan points — typically 10,000 on first purchase and 35,000 after spending $5,000 in the first 90 days. At a conservative valuation of 1.5 cpp, that\'s $675 in travel value from the welcome bonus alone, more than covering the first three years of annual fees.' },
      { type: 'h2', heading: 'Travel Insurance' },
      { type: 'paragraph', body: 'The TD Aeroplan Visa Infinite includes emergency travel medical insurance (up to $2 million, for trips up to 21 days), trip cancellation/interruption, delayed and lost baggage, flight delay, and rental car collision/damage insurance. This is a comprehensive insurance suite that competes with premium cards costing $250–$599 annually.' },
      { type: 'h2', heading: 'Air Canada Perks' },
      { type: 'paragraph', body: 'Cardholders get free first checked bag on Air Canada flights, priority check-in access, and preferred pricing on Air Canada seat upgrades. The first checked bag perk alone saves $35+ each way — a family of four saves $280 on a round trip.' },
    ],
  },

  // ─── Best Premium Credit Cards Canada ────────────────────────────────────────
  {
    id: 'art-best-premium-credit-cards-canada-2026',
    slug: 'best-premium-credit-cards-canada-2026',
    title: 'Best Premium Credit Cards in Canada for 2026',
    excerpt: 'Premium credit cards with $400–$799 annual fees can deliver thousands in annual value through lounge access, travel credits, and insurance. Here are the best.',
    category: 'guides',
    author: { name: 'Marcus Williams', title: 'Senior Cards Analyst' },
    publishDate: '2026-03-15',
    heroImageUrl: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Airport lounge with comfortable seating and views',
    tags: ['premium', 'travel', 'lounge-access', 'amex-platinum', 'canada'],
    readingTimeMinutes: 10,
    featured: true,
    editorsPick: false,
    metaDescription: 'Best premium credit cards in Canada 2026. Amex Platinum, Scotiabank Passport, RBC Avion Privilege. Compare benefits, fees, and travel perks.',
    relatedCards: [
      { cardId: 'american-express-platinum-card', cardSlug: 'american-express-platinum-card', cardName: 'Amex Platinum', reason: 'Best overall premium card — most lounge access and travel credits' },
      { cardId: 'scotiabank-american-express-platinum-card', cardSlug: 'scotiabank-american-express-platinum-card', cardName: 'Scotiabank Amex Platinum', reason: 'Best Scene+ premium card with strong travel insurance' },
      { cardId: 'rbc-avion-visa-infinite-privilege', cardSlug: 'rbc-avion-visa-infinite-privilege', cardName: 'RBC Avion Visa Infinite Privilege', reason: 'Best RBC premium card for Avion points' },
    ],
    relatedArticleIds: ['art-best-travel-credit-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'A premium credit card is worth paying for if you travel frequently, value lounge access, and want comprehensive travel insurance. The best Canadian premium cards return $1,500–$3,000+ in value annually through credits, perks, and points — far exceeding their $400–$799 fees for the right cardholder.' },
      { type: 'callout', calloutType: 'info', heading: 'Who should get a premium card?', body: 'Premium cards make sense if you: take at least 4 flights per year, value airport lounge access ($50+ per visit at pay-per-entry), want top-tier travel medical insurance, or spend $30,000+ annually on a credit card.' },
      { type: 'h2', heading: 'Amex Platinum — Best Overall' },
      { type: 'paragraph', body: 'The American Express Platinum Card ($799/year) gives cardholders access to over 1,400 airport lounges worldwide via Amex Centurion, Priority Pass, and Plaza Premium. It also includes up to $200 in annual travel credits, $100 NEXUS/FAST application fee credit, hotel elite status with Marriott and Hilton, and one of the most comprehensive travel insurance packages in Canada. For frequent international travellers, the lounge access alone is worth $1,200+ per year.' },
      { type: 'h2', heading: 'Scotiabank Amex Platinum — Best for Scene+ Earners' },
      { type: 'paragraph', body: 'The Scotiabank American Express Platinum Card ($399/year) earns 3 Scene+ points per dollar on dining, food delivery, and entertainment, 2 points per dollar on transit, gas, and daily transit, and 1 point everywhere else. It includes 10 annual Priority Pass lounge visits, comprehensive travel insurance, and no foreign transaction fees. Best for Canadians who already accumulate Scene+ points through Scotiabank or Sobeys spending.' },
    ],
  },

  // ─── How to Compare Credit Cards Canada ──────────────────────────────────────
  {
    id: 'art-how-to-compare-credit-cards-canada',
    slug: 'how-to-compare-credit-cards-canada',
    title: 'How to Compare Credit Cards in Canada: A Step-by-Step Guide',
    excerpt: 'Comparing credit cards can be overwhelming. This guide breaks down exactly what to look at — fees, earn rates, insurance, and more — so you can pick the right card.',
    category: 'guides',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-03-05',
    heroImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Person comparing documents at a desk',
    tags: ['guide', 'comparison', 'canada', 'credit-cards', 'annual-fee'],
    readingTimeMinutes: 8,
    featured: false,
    editorsPick: false,
    metaDescription: 'Step-by-step guide to comparing credit cards in Canada. What to look for: annual fees, earn rates, insurance, income requirements, and welcome bonuses.',
    relatedCards: [],
    relatedArticleIds: ['art-beginners-guide-canadian-points', 'art-best-no-fee-credit-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'Choosing a credit card in Canada is not just about the welcome bonus. The right card depends on your spending patterns, travel habits, income level, and whether you carry a balance. This guide walks you through every factor you should evaluate before applying.' },
      { type: 'h2', heading: 'Step 1: Decide What You Want From a Card' },
      { type: 'paragraph', body: 'There are four main card goals: (1) Earn cash back — get money back on purchases, simple and flexible; (2) Earn travel points — accumulate points redeemable for flights and hotels; (3) Reduce interest — get a low-rate card if you carry a balance; (4) Build credit — get a basic secured or entry-level card if your credit history is short.' },
      { type: 'h2', heading: 'Step 2: Calculate Whether the Annual Fee is Worth It' },
      { type: 'paragraph', body: 'The break-even formula: Annual fee ÷ difference in earn rate = spend required. Example: a $120-fee card earns 2% cash back vs. a free card that earns 1%. Difference = 1%. Break-even = $120 ÷ 0.01 = $12,000/year. If you spend more than $12,000 on the card, the fee card wins. Most Canadians with moderate-to-heavy card use will find a mid-range fee card ($99–$150) pays for itself easily.' },
      { type: 'h2', heading: 'Step 3: Check the Income Requirement' },
      { type: 'paragraph', body: 'Visa Infinite and World Elite Mastercard products typically require a personal income of $60,000–$80,000 or household income of $100,000. Super-premium cards like the Amex Platinum or TD Aeroplan Visa Privilege may require $200,000+. Always check the income requirement before applying — a declined application leaves a hard inquiry on your credit report.' },
      { type: 'h2', heading: 'Step 4: Compare Insurance Packages' },
      { type: 'paragraph', body: 'Travel insurance on credit cards can be worth hundreds of dollars annually. Key coverages to compare: travel medical emergency ($1M–$5M, trip length limits), trip cancellation/interruption, delayed baggage, and rental car collision/damage waiver (CDW). The CDW coverage alone saves $20–$40/day on rental cars.' },
      { type: 'h2', heading: 'Use Our Compare Tool' },
      { type: 'paragraph', body: 'SmartCardOffers lets you compare up to three Canadian credit cards side by side. Head to our Compare page to see all fees, earn rates, insurance, and perks in a single table.' },
    ],
  },

  // ─── WestJet Credit Card Guide ────────────────────────────────────────────────
  {
    id: 'art-westjet-credit-card-guide-2026',
    slug: 'westjet-credit-card-guide-2026',
    title: 'WestJet Credit Cards Canada 2026: Which One Is Right for You?',
    excerpt: 'WestJet Rewards works differently from Aeroplan — you earn WestJet dollars, not points. Here\'s how to choose between the WestJet RBC Mastercard and World Elite.',
    category: 'guides',
    author: { name: 'James Park', title: 'Points & Deals Reporter' },
    publishDate: '2026-02-25',
    heroImageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'City skyline from above the clouds',
    tags: ['westjet', 'travel', 'rbc', 'canada', 'airline', 'rewards'],
    readingTimeMinutes: 7,
    featured: false,
    editorsPick: false,
    metaDescription: 'WestJet credit cards Canada 2026 guide. Compare WestJet RBC Mastercard vs World Elite. Earn WestJet dollars on every purchase.',
    relatedCards: [
      { cardId: 'westjet-rbc-world-elite', cardSlug: 'westjet-rbc-world-elite', cardName: 'WestJet RBC World Elite Mastercard', reason: 'Best WestJet card for frequent flyers' },
    ],
    relatedArticleIds: ['art-best-travel-credit-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'WestJet Rewards is different from most Canadian loyalty programs: instead of points you have to decipher, you earn WestJet dollars — actual dollar amounts that go directly toward the cost of a WestJet flight. One WestJet dollar = one Canadian dollar off a booking. There\'s no award chart to learn and no blackout dates.' },
      { type: 'h2', heading: 'WestJet RBC World Elite Mastercard' },
      { type: 'paragraph', body: 'The WestJet RBC World Elite Mastercard ($119/year) earns 2% back in WestJet dollars on WestJet flights and WestJet Vacations bookings, and 1.5% on everything else. It includes an annual companion voucher (a flight ticket for $119 base fare for one companion) and a free first checked bag for the cardholder and up to eight companions on the same booking. The companion voucher alone is worth $200–$600+ depending on your route.' },
      { type: 'h2', heading: 'Who Should Get a WestJet Card?' },
      { type: 'paragraph', body: 'WestJet cards make most sense if: you fly WestJet at least 2–4 times per year, you want simplicity (no redemption complexity), you value the free checked bag benefit, or you travel with family and the companion voucher fits a route you\'d fly anyway. If you want to fly international business class on partner airlines, Aeroplan is more powerful. WestJet dollars are best for domestic Canada and sun destinations.' },
    ],
  },

  // ─── Credit Card for Students Canada ─────────────────────────────────────────
  {
    id: 'art-best-student-credit-cards-canada-2026',
    slug: 'best-student-credit-cards-canada-2026',
    title: 'Best Student Credit Cards in Canada for 2026',
    excerpt: 'Your first credit card shapes your credit history for years. These are the best student cards in Canada — no income requirement, no annual fee, real rewards.',
    category: 'guides',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-02-15',
    heroImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Student studying with laptop and coffee',
    tags: ['student', 'no-fee', 'canada', 'credit-score', 'beginner'],
    readingTimeMinutes: 6,
    featured: false,
    editorsPick: false,
    metaDescription: 'Best student credit cards in Canada 2026. No annual fee, low or no income requirement. Start building credit and earning rewards as a student.',
    relatedCards: [
      { cardId: 'tangerine-money-back', cardSlug: 'tangerine-money-back', cardName: 'Tangerine Money-Back', reason: 'Best flexible no-fee card for students' },
      { cardId: 'american-express-green-card', cardSlug: 'american-express-green-card', cardName: 'Amex Green Card', reason: 'Best no-fee Amex MR earner for first-time cardholders' },
    ],
    relatedArticleIds: ['art-beginners-guide-canadian-points', 'art-best-no-fee-credit-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'Getting your first credit card as a student is one of the most important financial decisions you\'ll make. A good credit history — built by using a card responsibly and paying it off in full each month — will make it easier to get an apartment, finance a car, or qualify for a mortgage years from now. The good news: there are excellent Canadian student credit cards with no annual fee and no income requirement.' },
      { type: 'callout', calloutType: 'tip', heading: 'The golden rule', body: 'Pay your credit card balance in full every month, without exception. Interest rates on credit cards (19.99% on most) will erase any rewards you earn if you carry a balance.' },
      { type: 'h2', heading: 'What to Look for in a Student Card' },
      { type: 'paragraph', body: 'Look for: (1) No annual fee — don\'t pay to hold a card while you\'re a student; (2) No minimum income requirement — most student cards have none; (3) Low or no credit history required — some issuers accept thin files; (4) Meaningful rewards — even 1% cash back adds up; (5) Free credit score monitoring — several Canadian banks offer this with their cards.' },
      { type: 'h2', heading: 'Building Credit Responsibly' },
      { type: 'paragraph', body: 'Keep your credit utilization below 30% of your limit (ideally below 10%). Pay on time, every time — one late payment can stay on your credit file for 6 years. Don\'t apply for multiple cards in the same year. After 12–18 months of good habits, you\'ll have a solid credit score and be eligible for better cards with higher rewards.' },
    ],
  },

  // ─── Aeroplan vs Scene+ Canada ────────────────────────────────────────────────
  {
    id: 'art-aeroplan-vs-scene-plus-canada',
    slug: 'aeroplan-vs-scene-plus-canada',
    title: 'Aeroplan vs Scene+: Which Canadian Loyalty Program Is Better?',
    excerpt: 'Aeroplan and Scene+ are Canada\'s two biggest credit card loyalty programs. Here\'s how they compare for earning, redemptions, and everyday value.',
    category: 'points-deals',
    author: { name: 'Marcus Williams', title: 'Senior Cards Analyst' },
    publishDate: '2026-02-05',
    heroImageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Two paths diverging in a forest',
    tags: ['aeroplan', 'scene-plus', 'canada', 'loyalty', 'comparison', 'travel'],
    readingTimeMinutes: 8,
    featured: true,
    editorsPick: false,
    metaDescription: 'Aeroplan vs Scene+ loyalty program comparison for Canadians. Earn rates, redemption value, best cards, and which program suits different lifestyles.',
    relatedCards: [
      { cardId: 'td-aeroplan-visa-infinite', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'Best Aeroplan credit card' },
      { cardId: 'scotiabank-gold-american-express-card', cardSlug: 'scotiabank-gold-american-express-card', cardName: 'Scotiabank Gold Amex', reason: 'Best Scene+ credit card' },
    ],
    relatedArticleIds: ['art-fly-business-class-aeroplan', 'art-maximize-scene-plus-points-canada'],
    content: [
      { type: 'paragraph', body: 'Canada\'s two largest loyalty programs sit at opposite ends of the spectrum. Aeroplan is a sophisticated travel rewards program built for people who want to fly business class on Air Canada and its 40+ Star Alliance partners. Scene+ is a flexible everyday program that rewards Canadians who shop at Sobeys, watch movies at Cineplex, and want simple redemptions without learning an award chart.' },
      { type: 'h2', heading: 'Earning: Aeroplan' },
      { type: 'paragraph', body: 'Aeroplan points are primarily earned through TD, CIBC, and Amex cards. The TD Aeroplan Visa Infinite earns 1.5 points per dollar at groceries, gas, and drug stores — the everyday categories. Amex Membership Rewards transfer to Aeroplan at 1:1, making the Amex Cobalt (5x on dining) an indirect but powerful Aeroplan earner.' },
      { type: 'h2', heading: 'Earning: Scene+' },
      { type: 'paragraph', body: 'Scene+ is earned through Scotiabank credit cards and at Sobeys/Empire grocery banners. The Scotiabank Gold Amex earns 6x at Sobeys/Safeway/IGA, 5x at restaurants, 3x on gas and transit — best-in-class grocery earn rate. Scene+ is also earned at Cineplex and directly at most Sobeys/Empire locations even without a Scotiabank card.' },
      { type: 'h2', heading: 'Redemption Value: Aeroplan Wins for Travel' },
      { type: 'paragraph', body: 'Aeroplan points are worth 1.5–2.5 cents per point when redeemed for business class international flights. A Toronto–London business class seat redeemed at 85,000 points could cost $4,000+ in cash — implying ~4.7 cpp value. This is where Aeroplan dramatically outperforms Scene+.' },
      { type: 'h2', heading: 'Redemption Value: Scene+ Wins for Flexibility' },
      { type: 'paragraph', body: 'Scene+ points are worth approximately 1 cent each for most redemptions — travel, groceries, Cineplex. There is no complexity: 10,000 points = $10, redeemable at Cineplex, Sobeys, or through the Scene+ travel portal. If you don\'t want to learn award charts and just want simple, consistent value, Scene+ is the easier choice.' },
    ],
  },

  // ─── Scotiabank Gold Amex Review ──────────────────────────────────────────────
  {
    id: 'art-scotiabank-gold-amex-review-2026',
    slug: 'scotiabank-gold-american-express-card-review-2026',
    title: 'Scotiabank Gold Amex Review 2026: Best Grocery Card in Canada?',
    excerpt: 'The Scotiabank Gold American Express earns 6x Scene+ at Sobeys grocery stores and 5x at restaurants. Here\'s a full 2026 review.',
    category: 'guides',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-01-20',
    heroImageUrl: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Fresh groceries and produce in a grocery bag',
    tags: ['scotiabank', 'scene-plus', 'groceries', 'dining', 'review', 'no-foreign-fee'],
    readingTimeMinutes: 7,
    featured: false,
    editorsPick: false,
    metaDescription: 'Scotiabank Gold American Express review 2026. Earn 6x Scene+ at Sobeys, 5x dining, no foreign transaction fee. Is the $120 annual fee worth it?',
    relatedCards: [
      { cardId: 'scotiabank-gold-american-express-card', cardSlug: 'scotiabank-gold-american-express-card', cardName: 'Scotiabank Gold American Express', reason: 'The card being reviewed' },
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: 'Best competitor for dining and groceries' },
      { cardId: 'scotiabank-passport-visa-infinite-card', cardSlug: 'scotiabank-passport-visa-infinite-card', cardName: 'Scotiabank Passport Visa Infinite', reason: 'Best Scotiabank card for travel and no-FX fee' },
    ],
    relatedArticleIds: ['art-maximize-scene-plus-points-canada', 'art-aeroplan-vs-scene-plus-canada'],
    content: [
      { type: 'paragraph', body: 'The Scotiabank Gold American Express Card earns 6 Scene+ points per dollar at Sobeys, Safeway, IGA, FreshCo, Foodland, Farm Boy, and other Empire-banner grocery stores — the highest grocery earn rate available on any Canadian credit card without a cap or rotating category. It also charges no foreign transaction fee, making it a rare "do everything well" card.' },
      { type: 'callout', calloutType: 'info', heading: 'Quick verdict', body: 'Best for: Sobeys/Safeway shoppers, frequent diners, international travellers. Annual fee: $120 (first year free). Our rating: 4.6/5.' },
      { type: 'h2', heading: 'Earn Rates' },
      { type: 'paragraph', body: '6x Scene+ points per dollar at Sobeys, Safeway, IGA, FreshCo, and other Sobeys-banner stores. 5x at restaurants, fast food, and food delivery (including Uber Eats, Skip the Dishes, DoorDash). 3x on gas, daily transit (bus, subway, Uber), and select streaming services. 1x on everything else. The stacking opportunity: you can also scan your Scene+ member card at the same Sobeys register to earn additional in-store points on top of the card earn.' },
      { type: 'h2', heading: 'No Foreign Transaction Fee' },
      { type: 'paragraph', body: 'Most Canadian credit cards charge 2.5% on purchases made in foreign currencies. The Scotiabank Gold Amex charges zero. On a $5,000 international trip, that\'s $125 saved. Combined with the travel insurance and competitive earn rates, this card is one of the most well-rounded options in Canada at its price point.' },
      { type: 'h2', heading: 'Is the $120 Fee Worth It?' },
      { type: 'paragraph', body: 'If you spend $500/month at Sobeys/Safeway, you earn 36,000 Scene+ points ($360) annually on groceries alone. Add dining and other spending and most cardholders easily generate $500+ in points per year. After the $120 fee, that\'s a $380+ net benefit — before accounting for the saved foreign transaction fees and travel insurance value.' },
    ],
  },

  // ─── Foreign Transaction Fee Cards Canada ────────────────────────────────────
  {
    id: 'art-no-foreign-transaction-fee-cards-canada-2026',
    slug: 'no-foreign-transaction-fee-credit-cards-canada-2026',
    title: 'Best No-Foreign-Transaction-Fee Credit Cards in Canada (2026)',
    excerpt: 'Travelling internationally? Most Canadian credit cards charge 2.5% on foreign purchases. These cards waive that fee entirely.',
    category: 'credit-card-deals',
    author: { name: 'James Park', title: 'Points & Deals Reporter' },
    publishDate: '2026-01-10',
    heroImageUrl: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Travel suitcase at a scenic destination',
    tags: ['no-foreign-fee', 'travel', 'international', 'canada', 'credit-cards'],
    readingTimeMinutes: 6,
    featured: false,
    editorsPick: false,
    metaDescription: 'Best no-foreign-transaction-fee credit cards in Canada for 2026. Save 2.5% on every international purchase. Top picks for travellers.',
    relatedCards: [
      { cardId: 'scotiabank-passport-visa-infinite-card', cardSlug: 'scotiabank-passport-visa-infinite-card', cardName: 'Scotiabank Passport Visa Infinite', reason: 'Best no-FX travel card with lounge access' },
      { cardId: 'scotiabank-gold-american-express-card', cardSlug: 'scotiabank-gold-american-express-card', cardName: 'Scotiabank Gold Amex', reason: 'Best no-FX card for everyday earn rates' },
      { cardId: 'american-express-platinum-card', cardSlug: 'american-express-platinum-card', cardName: 'Amex Platinum', reason: 'Best premium no-FX card' },
    ],
    relatedArticleIds: ['art-best-travel-credit-cards-canada-2026', 'art-best-premium-credit-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'A 2.5% foreign transaction fee might not sound like much, but on a $7,000 international trip, that\'s $175 straight out of your pocket — just for using a card abroad. For Canadians who travel internationally even once or twice a year, carrying a no-foreign-transaction-fee card is an easy way to save hundreds annually.' },
      { type: 'h2', heading: 'What Is a Foreign Transaction Fee?' },
      { type: 'paragraph', body: 'When you use a Canadian credit card to pay in a foreign currency — whether you\'re physically abroad or shopping on a US website — most issuers charge a currency conversion fee of 2.5% on the converted amount. This fee is charged in addition to the exchange rate itself. No-FX cards waive this fee, charging only the standard exchange rate with no markup.' },
      { type: 'h2', heading: 'Top No-FX Cards in Canada' },
      { type: 'paragraph', body: 'The Scotiabank Passport Visa Infinite ($150/year) combines no foreign transaction fees with 6 complimentary Priority Pass lounge visits annually, 2x Scene+ points on groceries, dining, and entertainment, and comprehensive travel insurance. It\'s one of the best mid-range travel cards in Canada.' },
      { type: 'paragraph', body: 'The Scotiabank Gold American Express ($120/year, first year free) has no foreign transaction fee and earns 6x Scene+ at Sobeys, 5x at restaurants — excellent for those who want the no-FX benefit alongside strong everyday earn rates.' },
      { type: 'h2', heading: 'Worth the Upgrade?' },
      { type: 'paragraph', body: 'If you spend $5,000+/year on international purchases (including US online shopping), the 2.5% savings alone ($125+) covers the annual fee of most no-FX cards. Factor in travel insurance and earn rates, and the upgrade math is straightforward for most Canadians who travel or shop internationally.' },
    ],
  },

  // ─── Best RBC Credit Cards Canada 2026 ───────────────────────────────────────
  {
    id: 'art-best-rbc-credit-cards-canada-2026',
    slug: 'best-rbc-credit-cards-canada-2026',
    title: 'Best RBC Credit Cards in Canada for 2026',
    excerpt: 'RBC offers one of the widest credit card lineups in Canada — from no-fee entry cards to premium Avion rewards. Here\'s a complete guide to the best RBC cards.',
    category: 'guides',
    author: { name: 'Marcus Williams', title: 'Senior Cards Analyst' },
    publishDate: '2026-04-06',
    heroImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Modern bank building exterior',
    tags: ['rbc', 'avion', 'travel', 'cash-back', 'canada', 'review'],
    readingTimeMinutes: 9,
    featured: true,
    editorsPick: false,
    metaDescription: 'Best RBC credit cards in Canada for 2026. Compare RBC Avion Visa Infinite, RBC Cash Back Preferred, WestJet RBC World Elite, and more.',
    relatedCards: [
      { cardId: 'rbc-avion-visa-infinite', cardSlug: 'rbc-avion-visa-infinite', cardName: 'RBC Avion Visa Infinite', reason: 'Best RBC travel rewards card' },
      { cardId: 'rbc-avion-visa-infinite-privilege', cardSlug: 'rbc-avion-visa-infinite-privilege', cardName: 'RBC Avion Visa Infinite Privilege', reason: 'Best RBC premium card' },
      { cardId: 'westjet-rbc-world-elite', cardSlug: 'westjet-rbc-world-elite', cardName: 'WestJet RBC World Elite Mastercard', reason: 'Best RBC airline card' },
    ],
    relatedArticleIds: ['art-best-travel-credit-cards-canada-2026', 'art-westjet-credit-card-guide-2026'],
    content: [
      { type: 'paragraph', body: 'RBC is Canada\'s largest bank and offers one of the most comprehensive credit card portfolios in the country. Whether you\'re looking for a no-fee starter card, a WestJet companion voucher, or a premium Avion Visa Infinite Privilege, RBC has an option. This guide covers the best RBC cards for 2026 across every spending profile.' },
      { type: 'h2', heading: 'Best RBC Card for Travel: RBC Avion Visa Infinite' },
      { type: 'paragraph', body: 'The RBC Avion Visa Infinite ($120/year) earns 1.25 Avion points per dollar on all purchases and 1.5 points at grocery stores, gas stations, and drug stores. Avion points can be redeemed for flights, hotel stays, or car rentals through RBC Rewards. A limited-time offer is currently running with up to 55,000 bonus Avion points — expiring June 15, 2026.' },
      { type: 'callout', calloutType: 'tip', heading: 'Avion vs Aeroplan', body: 'Avion points are worth approximately 1–1.5 cpp when redeemed for flights. Aeroplan (from TD/CIBC cards) offers better sweet-spot redemptions for business class, but Avion is more flexible for any airline booking through the RBC portal.' },
      { type: 'h2', heading: 'Best RBC Card for WestJet Flyers' },
      { type: 'paragraph', body: 'The WestJet RBC World Elite Mastercard ($119/year) is the top choice for Canadians who fly WestJet. You earn 2% back in WestJet dollars on WestJet flights and 1.5% on everything else. The annual companion voucher (a round-trip base fare of $119 for one companion) plus free first checked bag make this card easy to justify for anyone who flies WestJet even once a year.' },
      { type: 'h2', heading: 'Best RBC Card for Cash Back' },
      { type: 'paragraph', body: 'The RBC Cash Back Preferred World Elite Mastercard ($99/year) earns 1.5% cash back on all purchases with no rotating categories, no caps, and no need to track spending. The straightforward earn rate and the World Elite insurance package (travel medical, rental car, purchase protection) make it the go-to for RBC customers who want simplicity.' },
      { type: 'h2', heading: 'Which RBC Card Is Right for You?' },
      { type: 'paragraph', body: 'If you fly WestJet → WestJet RBC World Elite. If you want flexible travel rewards → RBC Avion Visa Infinite. If you want simple cash back → RBC Cash Back Preferred. If you want premium perks → RBC Avion Visa Infinite Privilege. RBC also offers no-fee British Airways Avios earning via the RBC British Airways Visa Infinite, which is unique in the Canadian market.' },
    ],
  },

  // ─── Best BMO Credit Cards Canada 2026 ───────────────────────────────────────
  {
    id: 'art-best-bmo-credit-cards-canada-2026',
    slug: 'best-bmo-credit-cards-canada-2026',
    title: 'Best BMO Credit Cards in Canada for 2026',
    excerpt: 'BMO has strong travel and cash back options — including the BMO Ascend with 100,000 points and the eclipse Rise with no annual fee. Here\'s how they stack up.',
    category: 'guides',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-04-04',
    heroImageUrl: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Financial district skyscrapers at dusk',
    tags: ['bmo', 'ascend', 'eclipse', 'travel', 'cash-back', 'canada'],
    readingTimeMinutes: 8,
    featured: false,
    editorsPick: false,
    metaDescription: 'Best BMO credit cards in Canada 2026. Compare BMO Ascend World Elite, BMO eclipse Visa Infinite, BMO CashBack World Elite, and no-fee options.',
    relatedCards: [
      { cardId: 'bmo-ascend-world-elite-mastercard', cardSlug: 'bmo-ascend-world-elite-mastercard', cardName: 'BMO Ascend World Elite Mastercard', reason: 'Best BMO travel card with lounge access' },
      { cardId: 'bmo-eclipse-visa-infinite', cardSlug: 'bmo-eclipse-visa-infinite', cardName: 'BMO eclipse Visa Infinite', reason: 'Best BMO mid-range travel card' },
      { cardId: 'bmo-cashback-world-elite-mastercard', cardSlug: 'bmo-cashback-world-elite-mastercard', cardName: 'BMO CashBack World Elite Mastercard', reason: 'Best BMO cash back card' },
    ],
    relatedArticleIds: ['art-best-travel-credit-cards-canada-2026', 'art-best-premium-credit-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'BMO\'s credit card lineup has improved substantially. Their flagship BMO Ascend World Elite Mastercard now offers up to 100,000 BMO Rewards points as a welcome bonus — one of the largest in Canada. Across no-fee, mid-range, and premium tiers, BMO has a card for every type of Canadian spender.' },
      { type: 'h2', heading: 'Best BMO Card for Travel: BMO Ascend World Elite Mastercard' },
      { type: 'paragraph', body: 'The BMO Ascend World Elite Mastercard ($150/year) earns 5x BMO Rewards points on travel (flights, hotels, car rentals), 3x on dining and entertainment, and 1x everywhere else. The card includes airport lounge access through DragonPass (4 complimentary passes), comprehensive travel insurance (up to $5M travel medical, trip cancellation/interruption, flight delay, baggage), and no foreign transaction fee.' },
      { type: 'callout', calloutType: 'info', heading: 'BMO Rewards point value', body: 'BMO Rewards points are worth approximately 0.67–1 cent each depending on redemption. 100,000 points = roughly $667–$1,000 in travel value. The welcome bonus alone can exceed the annual fee by 4–5x in the first year.' },
      { type: 'h2', heading: 'Best BMO Card for Everyday Earn: BMO eclipse Visa Infinite' },
      { type: 'paragraph', body: 'The BMO eclipse Visa Infinite ($120/year) earns 5x BMO Rewards on groceries, dining, gas, and transit in Canada — strong everyday categories. It also provides a $50 lifestyle credit annually that partially offsets the fee. For Canadians who spend heavily in these four categories, the eclipse can outperform many competitors.' },
      { type: 'h2', heading: 'Best BMO No-Fee Option' },
      { type: 'paragraph', body: 'The BMO eclipse Rise Visa is a no-annual-fee card that earns 3x BMO Rewards on groceries, dining, gas, and transit. It\'s one of the better no-fee options for category-based earning in Canada, making it a strong choice for students or anyone not ready to commit to an annual fee.' },
    ],
  },

  // ─── Best Credit Cards for Groceries Canada 2026 ────────────────────────────
  {
    id: 'art-best-grocery-credit-cards-canada-2026',
    slug: 'best-credit-cards-for-groceries-canada-2026',
    title: 'Best Credit Cards for Groceries in Canada 2026',
    excerpt: 'Groceries are most Canadians\' biggest monthly expense. The right card earns 4x–6x points or 2%+ cash back on every grocery run. Here are the best.',
    category: 'guides',
    author: { name: 'James Park', title: 'Points & Deals Reporter' },
    publishDate: '2026-04-02',
    heroImageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Grocery store produce aisle with fresh vegetables',
    tags: ['groceries', 'cash-back', 'points', 'canada', 'sobeys', 'loblaws'],
    readingTimeMinutes: 7,
    featured: true,
    editorsPick: false,
    metaDescription: 'Best credit cards for groceries in Canada 2026. Earn 4x–6x points or 2%+ cash back at Sobeys, Loblaws, Metro, and other Canadian grocery stores.',
    relatedCards: [
      { cardId: 'scotiabank-gold-american-express-card', cardSlug: 'scotiabank-gold-american-express-card', cardName: 'Scotiabank Gold Amex', reason: '6x Scene+ at Sobeys/Safeway — best grocery earn rate' },
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: '5x Amex MR at all grocery stores in Canada' },
      { cardId: 'pc-financial-world-elite-mastercard', cardSlug: 'pc-financial-world-elite-mastercard', cardName: 'PC Financial World Elite', reason: 'Best no-fee card for Loblaws/PC stores' },
    ],
    relatedArticleIds: ['art-best-no-fee-credit-cards-canada-2026', 'art-best-cash-back-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'The average Canadian household spends $1,000–$1,500 per month on groceries. Over a year, earning 5–6x points on that spending can generate $600–$900 in rewards value — often more than offsetting a premium card\'s annual fee. Choosing the right grocery card is one of the single highest-impact credit card decisions you can make.' },
      { type: 'h2', heading: 'Best for Sobeys / Safeway Shoppers' },
      { type: 'paragraph', body: 'The Scotiabank Gold American Express earns 6x Scene+ points per dollar at Sobeys, Safeway, IGA, FreshCo, Farm Boy, and all Empire-banner stores. That\'s the highest grocery earn rate available on any Canadian card. Pair it with scanning your Scene+ member card at the same store for an additional points stack. Annual fee: $120 (first year free).' },
      { type: 'h2', heading: 'Best for All Grocery Stores' },
      { type: 'paragraph', body: 'The Amex Cobalt earns 5x Membership Rewards points per dollar at all grocery stores in Canada — including Loblaws, Metro, Sobeys, Whole Foods, and No Frills. Unlike the Scotiabank Gold Amex, which only earns the high rate at Sobeys-banner stores, the Cobalt\'s 5x applies anywhere classified as a grocery store. At $155.88/year ($12.99/month), it\'s easy to justify for regular grocery shoppers.' },
      { type: 'h2', heading: 'Best No-Fee Grocery Card' },
      { type: 'paragraph', body: 'The PC Financial World Elite Mastercard earns 45 PC Optimum points per dollar at Loblaw-banner stores (Loblaws, No Frills, Real Canadian Superstore, Shoppers Drug Mart, T&T Supermarket). With no annual fee, it\'s the best free grocery card in Canada for those who shop at Loblaw-owned stores. Points are redeemable at 10,000 per $10 across all Loblaw-banner stores.' },
      { type: 'h2', heading: 'Grocery Earn Rate Comparison' },
      { type: 'table', headers: ['Card', 'Rate at Grocery', 'Annual Fee', 'Works At'], rows: [
        ['Scotiabank Gold Amex', '6x Scene+', '$120', 'Sobeys-banner only'],
        ['Amex Cobalt', '5x Amex MR', '$155.88', 'All grocery stores'],
        ['BMO eclipse Visa Infinite', '5x BMO Rewards', '$120', 'All grocery stores'],
        ['PC Financial World Elite', '45x PC Optimum', '$0', 'Loblaw-banner only'],
        ['Tangerine Money-Back', '2% cash back', '$0', 'All grocery stores'],
      ]},
    ],
  },

  // ─── Best Business Credit Cards Canada 2026 ──────────────────────────────────
  {
    id: 'art-best-business-credit-cards-canada-2026',
    slug: 'best-business-credit-cards-canada-2026',
    title: 'Best Business Credit Cards in Canada for 2026',
    excerpt: 'Canadian business owners can earn significant rewards on business expenses. These are the best small-business credit cards available right now.',
    category: 'guides',
    author: { name: 'Marcus Williams', title: 'Senior Cards Analyst' },
    publishDate: '2026-03-25',
    heroImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Business professional working at a modern office desk',
    tags: ['business', 'amex', 'travel', 'cash-back', 'canada', 'small-business'],
    readingTimeMinutes: 8,
    featured: false,
    editorsPick: false,
    metaDescription: 'Best business credit cards in Canada 2026. Compare Amex Business Gold, Amex Business Platinum, and other top Canadian business cards.',
    relatedCards: [
      { cardId: 'amex-biz-gold', cardSlug: 'amex-biz-gold', cardName: 'Amex Business Gold Rewards', reason: 'Best mid-range business rewards card' },
      { cardId: 'amex-biz-platinum', cardSlug: 'amex-biz-platinum', cardName: 'Amex Business Platinum', reason: 'Best premium business card with lounge access' },
      { cardId: 'amex-marriott-biz', cardSlug: 'amex-marriott-biz', cardName: 'Marriott Bonvoy Business Amex', reason: 'Best business card for hotel earners' },
    ],
    relatedArticleIds: ['art-best-premium-credit-cards-canada-2026', 'art-amex-mr-transfer-partners-canada'],
    content: [
      { type: 'paragraph', body: 'Business credit cards in Canada offer one major advantage over personal cards: higher spending limits and the ability to pool employee spending on a single account. The best Canadian business cards from American Express also earn Membership Rewards points that transfer to Aeroplan, making them powerful tools for business owners who travel.' },
      { type: 'callout', calloutType: 'info', heading: 'Business cards vs. personal cards', body: 'Business cards don\'t appear on your personal credit report (with most issuers). This means you can hold both a personal and a business Amex without impacting your personal credit utilization.' },
      { type: 'h2', heading: 'Best Business Card for Rewards: Amex Business Gold' },
      { type: 'paragraph', body: 'The American Express Business Gold Rewards Card ($199/year) earns 2 Membership Rewards points per dollar on all purchases, plus bonus points in categories like gas, office supplies, and travel. The welcome offer of up to 70,000 points is one of the strongest in the business card category. Employee cards can be added for free.' },
      { type: 'h2', heading: 'Best Premium Business Card: Amex Business Platinum' },
      { type: 'paragraph', body: 'The Amex Business Platinum ($799/year) provides access to 1,400+ airport lounges worldwide (including Centurion Lounges), up to 120,000 points welcome bonus, and a comprehensive travel insurance package. For business owners who travel frequently and want to write off the annual fee, this card delivers more value than almost any alternative.' },
      { type: 'h2', heading: 'Key Differences: Business vs Personal Amex Cards' },
      { type: 'paragraph', body: 'Business Amex cards earn the same Membership Rewards points as personal cards — transferable to Aeroplan, Avios, Flying Blue, Marriott Bonvoy, and other partners at the same ratios. The main advantages of business cards: no impact on personal credit bureau, higher credit limits, expense management tools, and the ability to have employee supplementary cardholders.' },
    ],
  },

  // ─── How Credit Card Points Work Canada ──────────────────────────────────────
  {
    id: 'art-how-credit-card-points-work-canada',
    slug: 'how-credit-card-points-work-canada',
    title: 'How Credit Card Points Work in Canada: Complete Beginner\'s Guide',
    excerpt: 'Credit card points in Canada can be confusing — different programs, transfer partners, and redemption options. This guide explains everything from scratch.',
    category: 'guides',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-03-18',
    heroImageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Person using a laptop to research financial options',
    tags: ['beginner', 'points', 'canada', 'guide', 'aeroplan', 'amex-mr'],
    readingTimeMinutes: 10,
    featured: true,
    editorsPick: true,
    metaDescription: 'How credit card points work in Canada — a complete beginner\'s guide. Learn about earn rates, transfer partners, point values, and how to redeem for maximum value.',
    relatedCards: [
      { cardId: 'amex-cobalt', cardSlug: 'amex-cobalt', cardName: 'Amex Cobalt', reason: 'Best beginner travel rewards card' },
      { cardId: 'td-aeroplan-visa-infinite', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'Best Aeroplan card for beginners' },
    ],
    relatedArticleIds: ['art-beginners-guide-canadian-points', 'art-aeroplan-vs-scene-plus-canada'],
    content: [
      { type: 'paragraph', body: 'Canadian credit card points can seem complicated — there are dozens of programs, each with their own earn rates, expiry rules, and transfer partners. But the basics are simple once you understand the structure. This guide explains how points work from first principles, so you can make informed decisions about which cards and programs to use.' },
      { type: 'h2', heading: 'The Three Types of Points Programs in Canada' },
      { type: 'paragraph', body: '(1) Bank-issued flexible points (Amex MR, RBC Avion, BMO Rewards, TD Rewards) — earned on bank credit cards, redeemable through the bank\'s portal or transferable to airline/hotel partners. Most flexible. (2) Coalition/co-branded programs (Aeroplan, Scene+, PC Optimum) — earned at partner stores and on co-branded credit cards, redeemable within the program. (3) Direct airline/hotel programs (WestJet Dollars, Marriott Bonvoy) — earned on airline/hotel co-branded cards, most valuable within that ecosystem.' },
      { type: 'h2', heading: 'What Is a Point Worth?' },
      { type: 'paragraph', body: 'A credit card point is worth whatever the program assigns it. General guideline: Amex MR = 1.5–2 cpp when transferred to airlines. Aeroplan points = 1.5–3 cpp for business class, 1–1.5 for economy. Scene+ = approximately 1 cpp. PC Optimum = 0.1 cpp (10,000 points = $10). WestJet dollars = 1 CAD. BMO/RBC Rewards = 0.67–1 cpp. Always calculate the value before redeeming.' },
      { type: 'callout', calloutType: 'tip', heading: 'The golden rule', body: 'Never redeem points for gift cards or merchandise — you almost always get less than 0.5 cpp. The best value is almost always flights, especially business class on partner airlines.' },
      { type: 'h2', heading: 'How Transfer Partners Work' },
      { type: 'paragraph', body: 'Many bank programs let you "transfer" points to airline loyalty programs at a set ratio. Amex MR → Aeroplan at 1:1. RBC Avion → British Airways Avios at 1:1. BMO Rewards → Air Miles at various rates. Transfers are typically one-way and instant (Amex to Aeroplan, for example). Once transferred, the points live in your airline loyalty account and can be used for award flights.' },
      { type: 'h2', heading: 'How to Start Earning Points' },
      { type: 'paragraph', body: 'The simplest starting point: get one card that earns broadly — like the Amex Cobalt for dining and groceries — and one that earns on everything else. Use the Cobalt at restaurants and grocery stores (5x points), and a flat-rate card everywhere else. After 12 months, you\'ll likely have 50,000–80,000 points — enough for a round-trip domestic flight or a meaningful portion of a transatlantic redemption.' },
    ],
  },

  // ─── Marriott Bonvoy Canada Credit Cards Guide ───────────────────────────────
  {
    id: 'art-marriott-bonvoy-credit-cards-canada-2026',
    slug: 'marriott-bonvoy-credit-cards-canada-2026',
    title: 'Marriott Bonvoy Credit Cards in Canada 2026: Complete Guide',
    excerpt: 'Marriott Bonvoy is the world\'s largest hotel loyalty program. Here\'s how to earn Bonvoy points with Canadian credit cards and how to redeem them.',
    category: 'points-deals',
    author: { name: 'James Park', title: 'Points & Deals Reporter' },
    publishDate: '2026-03-12',
    heroImageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Luxury hotel lobby with elegant design',
    tags: ['marriott', 'bonvoy', 'hotel', 'amex', 'travel', 'canada'],
    readingTimeMinutes: 8,
    featured: false,
    editorsPick: false,
    metaDescription: 'Marriott Bonvoy credit cards in Canada 2026. Compare Amex Marriott Bonvoy personal and business cards. Earn up to 110,000 points welcome bonus.',
    relatedCards: [
      { cardId: 'amex-marriott-pers', cardSlug: 'amex-marriott-pers', cardName: 'Marriott Bonvoy American Express', reason: 'Best personal Bonvoy card in Canada' },
      { cardId: 'amex-marriott-biz', cardSlug: 'amex-marriott-biz', cardName: 'Marriott Bonvoy Business Amex', reason: 'Best business Bonvoy card in Canada' },
    ],
    relatedArticleIds: ['art-amex-mr-transfer-partners-canada', 'art-best-premium-credit-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'Marriott Bonvoy is the world\'s largest hotel loyalty program with 9,000+ properties in 140+ countries. In Canada, Marriott Bonvoy points are primarily earned through two American Express co-branded cards — a personal card and a business card. Both offer strong welcome bonuses and ongoing earn rates that make Marriott stays significantly cheaper for loyal cardholders.' },
      { type: 'h2', heading: 'Marriott Bonvoy American Express Card (Personal)' },
      { type: 'paragraph', body: 'The Marriott Bonvoy American Express Card ($120/year) earns 5x Bonvoy points per dollar at Marriott hotels, 2x on dining and food delivery, and 1x everywhere else. The welcome bonus of up to 110,000 Bonvoy points (split across first purchase and spending milestones) is enough for multiple free nights at Category 4–5 properties. The card also includes one free night award annually after $30,000 in annual spending.' },
      { type: 'callout', calloutType: 'info', heading: 'Bonvoy point value', body: 'Marriott Bonvoy points are worth approximately 0.7–1.5 cents per point depending on how you redeem. Free night awards at premium properties can yield significantly higher value. A 50,000-point redemption at a $400/night hotel = 0.8 cpp, but a 50,000-point room that would cost $750 = 1.5 cpp.' },
      { type: 'h2', heading: 'Marriott Bonvoy Business Amex' },
      { type: 'paragraph', body: 'The Marriott Bonvoy Business American Express Card ($150/year) earns 5x at Marriott, 3x at restaurants, gas stations, and Canadian wireless providers, and 2x everywhere else. The higher earn rates on gas and wireless make it especially valuable for business owners who drive and maintain corporate phone plans. The welcome bonus of up to 110,000 points matches the personal card.' },
      { type: 'h2', heading: 'Best Marriott Bonvoy Redemptions for Canadians' },
      { type: 'paragraph', body: 'For Canadians, the best Bonvoy redemptions are often US city hotels (New York, Miami, San Francisco) and Caribbean/Mexico resort properties, where cash rates are high and point redemptions are proportionally strong. The Marriott Bonvoy travel portal also allows points-and-cash combinations. Points never expire as long as your account has activity every 24 months.' },
    ],
  },

  // ─── Fixed vs Variable Rate Mortgage Canada ──────────────────────────────────
  {
    id: 'art-fixed-vs-variable-mortgage-canada-2026',
    slug: 'fixed-vs-variable-rate-mortgage-canada-2026',
    title: 'Fixed vs Variable Mortgage Rate in Canada 2026: Which Is Right for You?',
    excerpt: 'With the Bank of Canada cutting rates, the fixed vs variable debate is back. Here\'s a data-driven look at which rate type makes more sense in 2026.',
    category: 'mortgage-news',
    author: { name: 'Marcus Williams', title: 'Senior Cards Analyst' },
    publishDate: '2026-03-08',
    heroImageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Canadian residential neighbourhood with houses',
    tags: ['mortgage', 'fixed-rate', 'variable-rate', 'bank-of-canada', 'canada', 'housing'],
    readingTimeMinutes: 9,
    featured: true,
    editorsPick: false,
    metaDescription: 'Fixed vs variable mortgage rate Canada 2026. With Bank of Canada rate cuts ongoing, should you lock in or stay variable? Data-driven analysis.',
    relatedCards: [],
    relatedArticleIds: ['art-boc-rate-cuts-mortgage-impact-2026'],
    content: [
      { type: 'paragraph', body: 'The fixed vs variable mortgage decision is one of the most consequential financial choices a Canadian homeowner can make. In 2026, with the Bank of Canada having cut rates from a 5% peak to 2.75% and signalling caution ahead, the calculus has shifted significantly from two years ago. Here\'s how to think through the decision.' },
      { type: 'callout', calloutType: 'info', heading: 'Current rate environment', body: 'As of April 2026, the Bank of Canada policy rate sits at 2.75%. Most major Canadian lenders are offering 5-year fixed rates between 4.1%–4.6% and variable rates around prime minus 0.5% (approximately 4.45%). The gap between fixed and variable has narrowed considerably.' },
      { type: 'h2', heading: 'How Fixed Mortgages Work in Canada' },
      { type: 'paragraph', body: 'A fixed-rate mortgage locks your interest rate for the entire term (typically 3, 5, or 10 years). Your payment doesn\'t change with Bank of Canada rate decisions. The certainty is valuable for budgeting, especially for first-time buyers. The downside: if rates fall significantly, you\'re locked in until renewal — and breaking a fixed mortgage early triggers an Interest Rate Differential (IRD) penalty, which can be substantial (sometimes $15,000–$30,000+ on a typical mortgage).' },
      { type: 'h2', heading: 'How Variable Mortgages Work in Canada' },
      { type: 'paragraph', body: 'Variable-rate mortgages are tied to your lender\'s prime rate, which moves with the Bank of Canada\'s policy rate. When the Bank cuts rates, your variable rate decreases automatically. The historically higher prepayment flexibility (typically only 3 months\' interest penalty to break) makes variable mortgages cheaper to exit if circumstances change.' },
      { type: 'h2', heading: 'Which Is Better in 2026?' },
      { type: 'paragraph', body: 'Historical research (including the widely-cited Moshe Milevsky study) shows variable-rate borrowers paid less interest approximately 90% of the time over comparable periods. However, 2022–2024 proved the exception: variable-rate holders saw their rates spike above fixed alternatives. In 2026, with rates declining, variable-rate mortgages are gaining appeal again. The key question is: how much more do you expect rates to fall?' },
      { type: 'h2', heading: 'The Rule of Thumb' },
      { type: 'paragraph', body: 'If the difference between fixed and variable rates is 0.5% or less, choose fixed for certainty. If the variable rate is 1%+ lower than the best fixed rate, the variable rate is likely compelling for most borrowers. In April 2026, the spread is narrow — making a 3-year fixed (which benefits from a shorter commitment period) an increasingly popular compromise.' },
    ],
  },

  // ─── Credit Card Travel Insurance Guide Canada ───────────────────────────────
  {
    id: 'art-credit-card-travel-insurance-canada-2026',
    slug: 'credit-card-travel-insurance-canada-2026',
    title: 'Credit Card Travel Insurance in Canada 2026: What\'s Covered and What\'s Not',
    excerpt: 'Many Canadian credit cards include travel insurance worth hundreds of dollars a year. But what exactly is covered? Here\'s what you need to know before relying on it.',
    category: 'guides',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-02-20',
    heroImageUrl: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Traveller with luggage at an airport',
    tags: ['travel-insurance', 'credit-cards', 'canada', 'guide', 'benefits'],
    readingTimeMinutes: 9,
    featured: false,
    editorsPick: false,
    metaDescription: 'Credit card travel insurance Canada guide 2026. What\'s covered: travel medical, trip cancellation, baggage, rental car. Which cards have the best coverage.',
    relatedCards: [
      { cardId: 'td-aeroplan-visa-infinite', cardSlug: 'td-aeroplan-visa-infinite', cardName: 'TD Aeroplan Visa Infinite', reason: 'Strong travel insurance suite at mid-range price' },
      { cardId: 'american-express-platinum-card', cardSlug: 'american-express-platinum-card', cardName: 'Amex Platinum', reason: 'Best travel insurance coverage in Canada' },
      { cardId: 'scotiabank-passport-visa-infinite-card', cardSlug: 'scotiabank-passport-visa-infinite-card', cardName: 'Scotiabank Passport Visa Infinite', reason: 'Strong travel insurance with no-FX fee' },
    ],
    relatedArticleIds: ['art-best-travel-credit-cards-canada-2026', 'art-best-premium-credit-cards-canada-2026'],
    content: [
      { type: 'paragraph', body: 'Many Canadians don\'t realize the travel insurance included on their credit card can be worth $300–$500+ annually. But credit card travel insurance has limitations that standard travel insurance doesn\'t — and relying on it without understanding the fine print can be costly. This guide breaks down what\'s covered, what\'s not, and which cards offer the best coverage.' },
      { type: 'h2', heading: 'What Credit Card Travel Insurance Typically Covers' },
      { type: 'paragraph', body: 'Most Visa Infinite and World Elite Mastercard products include: emergency travel medical insurance (typically $1M–$5M, for trips up to 15–21 days), trip cancellation and interruption, flight delay coverage (meals/hotel after a set delay period), lost or delayed baggage, and rental car collision/damage waiver (CDW). Some premium cards also add accidental death and dismemberment (AD&D) coverage.' },
      { type: 'callout', calloutType: 'warning', heading: 'Important limitation: pre-existing conditions', body: 'Most credit card travel medical policies exclude pre-existing conditions diagnosed or treated in the 6–12 months before your trip. Always read the certificate of insurance carefully, and consider supplemental coverage if you have ongoing health conditions.' },
      { type: 'h2', heading: 'Trip Length Limits' },
      { type: 'paragraph', body: 'This is the most commonly overlooked limitation. Most credit card travel medical policies cover trips up to 15–21 days. If you\'re travelling for 30 days, your coverage may expire halfway through your trip. Some premium cards (like the Amex Platinum) extend coverage to longer periods, or you can purchase a top-up policy.' },
      { type: 'h2', heading: 'Rental Car Insurance: What\'s Covered' },
      { type: 'paragraph', body: 'Most premium credit cards include rental car collision/damage waiver (CDW), which means you can decline the rental company\'s LDW/CDW coverage (saving $20–$40/day). Important: credit card rental car coverage is typically for collision and theft only. Third-party liability (if you hit another car and injure someone) is NOT covered by credit card insurance — you need either your own auto insurance or the rental company\'s liability coverage.' },
      { type: 'h2', heading: 'Best Travel Insurance Coverage by Card Tier' },
      { type: 'paragraph', body: 'Entry-level cards ($0–$99/year): typically no travel insurance. Mid-range ($120–$150/year): emergency travel medical + delayed baggage + rental car CDW. TD Aeroplan Visa Infinite and Scotiabank Passport Visa Infinite are strong in this tier. Premium ($399–$799/year): comprehensive coverage including longer trip lengths, higher medical limits, and trip cancellation. Amex Platinum is the gold standard in Canada for travel insurance breadth.' },
    ],
  },

  // ─── How to Build Your Credit Score in Canada ────────────────────────────────
  {
    id: 'art-how-to-build-credit-score-canada',
    slug: 'how-to-build-credit-score-canada',
    title: 'How to Build and Improve Your Credit Score in Canada',
    excerpt: 'Your credit score affects your mortgage rate, rental applications, and card approvals. Here\'s a practical guide to building good credit in Canada.',
    category: 'guides',
    author: { name: 'Sarah Chen', title: 'Credit Cards Editor' },
    publishDate: '2026-02-10',
    heroImageUrl: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'Person reviewing financial documents on a tablet',
    tags: ['credit-score', 'canada', 'equifax', 'transunion', 'guide', 'personal-finance'],
    readingTimeMinutes: 8,
    featured: false,
    editorsPick: false,
    metaDescription: 'How to build your credit score in Canada. Practical tips for improving your Equifax and TransUnion scores, understanding utilization, and qualifying for better cards.',
    relatedCards: [
      { cardId: 'tangerine-money-back', cardSlug: 'tangerine-money-back', cardName: 'Tangerine Money-Back', reason: 'Best no-fee starter card for building credit' },
      { cardId: 'american-express-green-card', cardSlug: 'american-express-green-card', cardName: 'Amex Green Card', reason: 'Best no-fee Amex card for thin credit files' },
    ],
    relatedArticleIds: ['art-best-student-credit-cards-canada-2026', 'art-how-to-compare-credit-cards-canada'],
    content: [
      { type: 'paragraph', body: 'In Canada, credit scores range from 300–900 and are tracked by two bureaus: Equifax and TransUnion. Most lenders consider a score of 660+ to be "good," 725+ to be "very good," and 760+ to be "excellent." Your credit score directly affects the mortgage rate you qualify for — the difference between a 680 and 780 score can be 0.5%+ on your mortgage rate, costing thousands over an amortization.' },
      { type: 'h2', heading: 'What Makes Up Your Credit Score' },
      { type: 'paragraph', body: 'Payment history (35%): the biggest factor — a single missed payment can drop your score 50–100 points. Credit utilization (30%): the percentage of your available credit you\'re using; keep it below 30%, ideally below 10%. Length of credit history (15%): older accounts help, so don\'t close your first credit card. Credit mix (10%): having both revolving credit (cards) and installment loans (car, student) helps. New inquiries (10%): each hard inquiry from a new credit application temporarily lowers your score.' },
      { type: 'callout', calloutType: 'tip', heading: 'Fastest way to improve your score', body: 'Pay down your credit card balances so your utilization is below 10% — this can raise your score 30–50 points within one billing cycle.' },
      { type: 'h2', heading: 'How to Check Your Canadian Credit Score for Free' },
      { type: 'paragraph', body: 'Several services offer free credit score monitoring in Canada: Borrowell (Equifax score, free), Credit Karma (TransUnion score, free), and most major bank apps now include your credit score in-app. Your bank may show your Equifax or TransUnion score directly in mobile banking. Note that different lenders pull from different bureaus, so it\'s worth monitoring both.' },
      { type: 'h2', heading: 'Building Credit from Scratch' },
      { type: 'paragraph', body: 'If you have no credit history (new to Canada, or just starting out), the fastest path is: (1) Apply for a no-fee credit card — most major banks offer entry-level cards with no income requirement. (2) Use it for regular purchases (groceries, gas). (3) Pay the full balance every month, on time, without exception. (4) Keep your balance below 30% of your credit limit at all times. (5) After 12 months, you\'ll typically have a score of 660–700 and can apply for better cards.' },
      { type: 'h2', heading: 'Common Mistakes That Hurt Your Score' },
      { type: 'paragraph', body: 'Missing payments (even by one day). Maxing out credit cards (high utilization damages your score even if you pay in full). Applying for too many cards in a short period (multiple hard inquiries in 3–6 months signal risk). Closing old accounts (shortens your average account age). Carrying a balance thinking it helps — it doesn\'t. Paying in full is always better than carrying a balance.' },
    ],
  },

  // ─── CIBC Credit Cards Guide 2026 ────────────────────────────────────────────
  {
    id: 'art-best-cibc-credit-cards-canada-2026',
    slug: 'best-cibc-credit-cards-canada-2026',
    title: 'Best CIBC Credit Cards in Canada for 2026',
    excerpt: 'CIBC offers some of Canada\'s best Aeroplan credit cards alongside a full lineup from no-fee to super-premium. Here\'s which CIBC card is worth it.',
    category: 'guides',
    author: { name: 'James Park', title: 'Points & Deals Reporter' },
    publishDate: '2026-01-28',
    heroImageUrl: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&auto=format&fit=crop&q=80',
    heroImageAlt: 'City bank tower reflected in glass windows',
    tags: ['cibc', 'aeroplan', 'aventura', 'travel', 'canada', 'review'],
    readingTimeMinutes: 8,
    featured: false,
    editorsPick: false,
    metaDescription: 'Best CIBC credit cards in Canada 2026. Compare CIBC Aeroplan Visa Infinite, CIBC Aventura, and more. Find the best CIBC card for your spending.',
    relatedCards: [
      { cardId: 'cibc-aeroplan-visa-infinite', cardSlug: 'cibc-aeroplan-visa-infinite', cardName: 'CIBC Aeroplan Visa Infinite', reason: 'Best CIBC Aeroplan card' },
      { cardId: 'cibc-aventura-visa-infinite', cardSlug: 'cibc-aventura-visa-infinite', cardName: 'CIBC Aventura Visa Infinite', reason: 'Best CIBC flexible rewards card' },
      { cardId: 'cibc-aeroplan-visa-infinite-privilege', cardSlug: 'cibc-aeroplan-visa-infinite-privilege', cardName: 'CIBC Aeroplan Visa Infinite Privilege', reason: 'Best CIBC premium Aeroplan card' },
    ],
    relatedArticleIds: ['art-td-aeroplan-visa-infinite-review-2026', 'art-fly-business-class-aeroplan'],
    content: [
      { type: 'paragraph', body: 'CIBC is one of two major banks (alongside TD) that issues Aeroplan co-branded credit cards in Canada. If you fly Air Canada and want direct Aeroplan earning, a CIBC or TD Aeroplan card is your best option. CIBC also offers the Aventura rewards program as an alternative to Aeroplan for those who want more flexibility in how they redeem points.' },
      { type: 'h2', heading: 'CIBC Aeroplan Visa Infinite: The Core Card' },
      { type: 'paragraph', body: 'The CIBC Aeroplan Visa Infinite ($139/year) is CIBC\'s flagship Aeroplan card. It earns 1.5 Aeroplan points per dollar at grocery stores, gas stations, Air Canada, and drug stores, and 1 point everywhere else. The current welcome offer provides up to 50,000 Aeroplan points. The card also includes a free first checked bag on Air Canada, and an Aeroplan 500 Mile Minimum Earning Bonus on Air Canada flights.' },
      { type: 'callout', calloutType: 'info', heading: 'CIBC vs TD Aeroplan cards', body: 'CIBC and TD both issue Aeroplan cards at virtually identical earn rates and fees. The main differentiators are the banks\' other product relationships — if you already bank with CIBC, their Aeroplan card integrates better with your existing accounts. Both cards earn Aeroplan directly and offer the same Air Canada perks.' },
      { type: 'h2', heading: 'CIBC Aventura: When You Want Flexibility' },
      { type: 'paragraph', body: 'The CIBC Aventura Visa Infinite ($139/year) earns points in the Aventura program rather than Aeroplan. Aventura points can be redeemed through the CIBC Rewards Centre for flights on any airline (not just Air Canada), hotel stays, and car rentals. This flexibility is valuable for travellers who fly multiple airlines. Welcome offer: up to 35,000 Aventura Points.' },
      { type: 'h2', heading: 'CIBC for Premium Travellers' },
      { type: 'paragraph', body: 'The CIBC Aeroplan Visa Infinite Privilege ($599/year) is designed for frequent Air Canada flyers. It earns 2 Aeroplan points per dollar at grocery stores and 1.5 points everywhere else, provides Aeroplan 50K elite status (conditional on spending thresholds), and includes comprehensive lounge access and travel insurance. For Air Canada Super Elite or Altitude members, this card stacks with their status benefits.' },
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
