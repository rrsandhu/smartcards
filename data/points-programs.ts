/**
 * points-programs.ts — Canadian loyalty program & transfer partner data
 *
 * To update a CPP value: find the program by id and edit cppCents / cppCentsMax.
 * To add a transfer partner: add an entry to the transferPartners array.
 * Verify ratios directly with the program before acting on any transfer.
 */

// ─── Transfer partner type ────────────────────────────────────────────────────

export type PartnerType = 'airline' | 'hotel' | 'bank' | 'retail'
export type Alliance    = 'Star Alliance' | 'SkyTeam' | 'Oneworld' | 'Independent'

export interface TransferPartner {
  name: string
  slug: string
  type: PartnerType
  alliance?: Alliance
  // Ratio: for every `ratioFrom` points you send, you receive `ratioTo` partner points
  ratioFrom: number
  ratioTo: number
  ratioLabel: string          // e.g. "1:1", "1:1.2", "2:1"
  transferTime: string        // e.g. "Instant", "1–3 days", "Up to 5 days"
  isInstant: boolean
  bestFor?: string            // one-liner on where this partner shines
  notes?: string              // caveat, minimum transfer, etc.
}

export interface SweetSpot {
  title: string
  description: string
  pointsNeeded: string        // e.g. "55,000 points one-way"
  estimatedCashValue: string  // e.g. "$2,200+"
  cppEstimate: number         // approximate cents per point
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tip?: string
}

export interface PointsProgram {
  id: string
  slug: string
  name: string
  shortName: string
  operator: string
  type: 'airline' | 'hotel' | 'bank' | 'retail' | 'coalition'
  tagline: string
  description: string
  // Value
  cppCents: number            // average redemption value in cents
  cppCentsMax: number         // best-case redemption value
  flexibilityRating: number   // 1–5 (how easy/flexible to use)
  // Cards that earn this currency
  earnCards: string[]         // CreditCard.id[]
  // Transfer ecosystem
  transferPartners: TransferPartner[]
  // Best uses
  sweetSpots: SweetSpot[]
  pros: string[]
  cons: string[]
  // Tips
  strategyTips: string[]
  // Meta
  websiteUrl?: string
  tags: string[]
  lastUpdated: string
}

// ─── Program data ──────────────────────────────────────────────────────────────

export const pointsPrograms: PointsProgram[] = [

  // ── 1. Amex Membership Rewards ───────────────────────────────────────────────
  {
    id: 'amex-membership-rewards',
    slug: 'amex-membership-rewards',
    name: 'American Express Membership Rewards',
    shortName: 'Amex MR',
    operator: 'American Express',
    type: 'bank',
    tagline: 'Canada\'s most flexible points currency',
    description:
      'Amex Membership Rewards is arguably the most powerful bank points currency available to Canadians. The combination of strong earn rates (5x on the Cobalt card for dining and groceries), a large transfer partner network, and 1:1 transfers to Aeroplan makes it the go-to for serious points collectors. Points never expire as long as you hold an eligible Amex card.',
    cppCents: 1.5,
    cppCentsMax: 3.0,
    flexibilityRating: 5,
    earnCards: ['amex-cobalt', 'amex-platinum', 'amex-business-gold'],
    transferPartners: [
      {
        name: 'Aeroplan',
        slug: 'aeroplan',
        type: 'airline',
        alliance: 'Star Alliance',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: 'Instant (same name required)',
        isInstant: true,
        bestFor: 'Air Canada flights and Star Alliance partners worldwide',
        notes: 'Name on Amex account must match Aeroplan account exactly.',
      },
      {
        name: 'British Airways Avios',
        slug: 'british-airways-avios',
        type: 'airline',
        alliance: 'Oneworld',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: '3–5 business days',
        isInstant: false,
        bestFor: 'Short-haul flights on American Airlines, Iberia, and BA',
        notes: 'Avios are distance-based — short haul offers excellent value.',
      },
      {
        name: 'Air France / KLM Flying Blue',
        slug: 'flying-blue',
        type: 'airline',
        alliance: 'SkyTeam',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: '3–5 business days',
        isInstant: false,
        bestFor: 'Promo awards to Europe — Flying Blue runs monthly 50% off sales',
        notes: 'Check Flying Blue Promo Rewards each month for steep discounts.',
      },
      {
        name: 'Singapore Airlines KrisFlyer',
        slug: 'singapore-krisflyer',
        type: 'airline',
        alliance: 'Star Alliance',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: 'Up to 5 business days',
        isInstant: false,
        bestFor: 'Singapore Suites and First Class — among the world\'s best redemptions',
        notes: 'Transfers are one-way and cannot be reversed.',
      },
      {
        name: 'Delta SkyMiles',
        slug: 'delta-skymiles',
        type: 'airline',
        alliance: 'SkyTeam',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: '3–5 business days',
        isInstant: false,
        bestFor: 'Delta One (business class) to the US and beyond',
        notes: 'Delta uses dynamic pricing — award rates fluctuate.',
      },
      {
        name: 'Etihad Guest',
        slug: 'etihad-guest',
        type: 'airline',
        alliance: 'Independent',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: '3–5 business days',
        isInstant: false,
        bestFor: 'Etihad First Apartment and American Airlines redemptions',
      },
      {
        name: 'Emirates Skywards',
        slug: 'emirates-skywards',
        type: 'airline',
        alliance: 'Independent',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: 'Up to 5 business days',
        isInstant: false,
        bestFor: 'Emirates First Class and Business — one of the world\'s best cabin products',
        notes: 'Emirates rarely discounts awards but the product justifies the cost.',
      },
      {
        name: 'Marriott Bonvoy',
        slug: 'marriott-bonvoy',
        type: 'hotel',
        ratioFrom: 1, ratioTo: 1.2, ratioLabel: '1:1.2',
        transferTime: 'Up to 5 business days',
        isInstant: false,
        bestFor: 'Hotel redemptions at Marriott, Westin, Sheraton, and 30+ brands',
        notes: '1,000 Amex MR = 1,200 Marriott Bonvoy points. Bonvoy also transfers to 40+ airlines.',
      },
      {
        name: 'Hilton Honors',
        slug: 'hilton-honors',
        type: 'hotel',
        ratioFrom: 1, ratioTo: 2, ratioLabel: '1:2',
        transferTime: '3–5 business days',
        isInstant: false,
        bestFor: "Hilton's all-inclusive resorts and urban luxury properties",
        notes: '1,000 Amex MR = 2,000 Hilton Honors points. Hilton awards require ~5,000+ pts/night.',
      },
    ],
    sweetSpots: [
      {
        title: 'Business Class to Europe via Aeroplan',
        description: 'Transfer Amex MR to Aeroplan at 1:1, then book Air Canada business class to Europe (LHR, CDG, FRA). The Aeroplan distance chart is generous for transatlantic routes.',
        pointsNeeded: '70,000–85,000 pts one-way',
        estimatedCashValue: '$3,000–$4,500',
        cppEstimate: 3.5,
        difficulty: 'intermediate',
        tip: 'Watch for a 20–30% Amex→Aeroplan transfer bonus (offered periodically) to stretch your points further.',
      },
      {
        title: 'Short-haul flights via British Airways Avios',
        description: 'Transfer to BA Avios and book American Airlines flights within North America. Short-haul Avios redemptions are distance-based and very cheap (7,500 Avios for under 650 miles).',
        pointsNeeded: '7,500–15,000 Avios one-way',
        estimatedCashValue: '$150–$400',
        cppEstimate: 2.0,
        difficulty: 'intermediate',
        tip: 'Fly within the US/Caribbean on American Airlines to maximize Avios value per point.',
      },
      {
        title: 'Flying Blue Promo Rewards',
        description: 'Air France/KLM runs monthly Promo Rewards with 25–50% off award flights. Transfer Amex MR and check the calendar each month for deals to Europe and beyond.',
        pointsNeeded: '20,000–40,000 pts one-way',
        estimatedCashValue: '$800–$1,500',
        cppEstimate: 2.5,
        difficulty: 'beginner',
        tip: 'Promo Rewards refresh on the 1st of every month — set a reminder.',
      },
      {
        title: 'Amex Fixed Points Travel',
        description: 'Book any flight through Amex Travel and redeem at a fixed 1 cent per point rate. Simple, predictable, no program transfer required.',
        pointsNeeded: 'Variable (1 pt = 1¢)',
        estimatedCashValue: 'Face value of flight',
        cppEstimate: 1.0,
        difficulty: 'beginner',
        tip: 'Best for expensive business class fares where cash price is high.',
      },
    ],
    pros: [
      'Largest transfer partner network of any Canadian bank currency',
      '1:1 transfer to Aeroplan — Canada\'s most popular airline program',
      'Points never expire while you hold an eligible Amex card',
      'Periodic transfer bonuses (up to 30%) boost value significantly',
      'Multiple hotel partners (Marriott, Hilton) for non-flight redemptions',
    ],
    cons: [
      'Amex not accepted at all Canadian merchants (~10–15% exclusion)',
      'Some transfer partners take 3–5 business days (not instant)',
      'Transfers to airlines are one-way — plan carefully before moving points',
      'Highest-value redemptions require some research and flexibility',
    ],
    strategyTips: [
      'Hold points in Amex MR until you have a redemption in mind — don\'t transfer speculatively.',
      'Watch for Amex→Aeroplan transfer bonuses (historically offered 1–2×/year).',
      'Stack the Cobalt\'s 5x on dining with Amex Offers for extra points on specific merchants.',
      'If you have both Amex MR and Aeroplan accounts, make sure names match exactly to avoid transfer delays.',
      'Marriott Bonvoy transfers can then transfer onward to 40+ airlines — useful for obscure programs.',
    ],
    tags: ['bank', 'flexible', 'transfer-partners', 'aeroplan', 'avios', 'premium'],
    lastUpdated: '2024-07-01',
  },

  // ── 2. Aeroplan ──────────────────────────────────────────────────────────────
  {
    id: 'aeroplan',
    slug: 'aeroplan',
    name: 'Aeroplan',
    shortName: 'Aeroplan',
    operator: 'Air Canada',
    type: 'airline',
    tagline: 'Canada\'s most popular frequent flyer program',
    description:
      'Aeroplan is Canada\'s dominant frequent flyer program, offering redemptions on Air Canada, over 40 Star Alliance partners, and a growing network of non-airline partners. The program uses a hybrid distance/zone award chart, making it possible to find outsized value on long-haul and business class redemptions. Points can be earned through direct credit cards (TD, CIBC) or transferred from bank programs (Amex MR, TD Rewards).',
    cppCents: 2.0,
    cppCentsMax: 3.5,
    flexibilityRating: 4,
    earnCards: ['td-aeroplan-vi', 'cibc-aeroplan-vi'],
    transferPartners: [
      {
        name: 'American Express Membership Rewards',
        slug: 'amex-membership-rewards',
        type: 'bank',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: 'Instant (same name required)',
        isInstant: true,
        bestFor: 'Converting a large Amex MR balance to Aeroplan for an upcoming trip',
        notes: 'Names must match exactly. Transfers are one-way and irreversible.',
      },
      {
        name: 'TD Rewards',
        slug: 'td-rewards',
        type: 'bank',
        ratioFrom: 3, ratioTo: 2, ratioLabel: '3:2',
        transferTime: 'Instant',
        isInstant: true,
        bestFor: 'TD cardholders who want to consolidate into Aeroplan',
        notes: '3 TD Rewards = 2 Aeroplan points. Less efficient than Amex 1:1.',
      },
      {
        name: 'CIBC Rewards',
        slug: 'cibc-rewards',
        type: 'bank',
        ratioFrom: 3, ratioTo: 2, ratioLabel: '3:2',
        transferTime: 'Instant',
        isInstant: true,
        bestFor: 'CIBC cardholders consolidating into Aeroplan',
        notes: '3 CIBC Rewards = 2 Aeroplan points.',
      },
      {
        name: 'Marriott Bonvoy',
        slug: 'marriott-bonvoy',
        type: 'hotel',
        ratioFrom: 3, ratioTo: 1, ratioLabel: '3:1',
        transferTime: 'Up to 5 business days',
        isInstant: false,
        bestFor: 'Turning excess Bonvoy points into Aeroplan miles',
        notes: '60,000 Bonvoy → 25,000 Aeroplan (with 5,000 bonus for every 60K transferred).',
      },
    ],
    sweetSpots: [
      {
        title: 'Business Class to Europe',
        description: 'Air Canada\'s Aeroplan distance chart prices transatlantic business class at 70,000–85,000 points one-way. For a $3,000+ Air Canada Signature Class seat, this is outstanding value.',
        pointsNeeded: '70,000 pts one-way',
        estimatedCashValue: '$3,000–$4,500',
        cppEstimate: 3.5,
        difficulty: 'intermediate',
        tip: 'Book early (saver availability opens ~355 days out). Avoid peak summer.',
      },
      {
        title: 'Short-haul North America (Under 500 miles)',
        description: 'Aeroplan\'s short-haul zone pricing starts at 6,000 points for economy within North America (under 500 miles). Perfect for Toronto–Ottawa or Vancouver–Seattle.',
        pointsNeeded: '6,000–10,000 pts one-way',
        estimatedCashValue: '$150–$350',
        cppEstimate: 2.5,
        difficulty: 'beginner',
        tip: 'Use Air Canada or United to maximize short-haul zone value.',
      },
      {
        title: 'Star Alliance Redemptions (Non-AC)',
        description: 'Book partner airlines like Lufthansa, Swiss, ANA, and United through Aeroplan. Sometimes cheaper than booking the same flight through the airline\'s own program.',
        pointsNeeded: '55,000–80,000 pts one-way business',
        estimatedCashValue: '$2,500–$5,000',
        cppEstimate: 3.0,
        difficulty: 'intermediate',
        tip: 'ANA business class (LAX/SFO→NRT) via Aeroplan is a legendary sweet spot.',
      },
      {
        title: 'Stopover + Open-jaw Routing',
        description: 'Aeroplan allows a free stopover on one-way redemptions and open-jaw routing. This lets you visit two cities on one award — exceptional value versus booking separately.',
        pointsNeeded: 'Same as base award',
        estimatedCashValue: '2× the trip value',
        cppEstimate: 4.0,
        difficulty: 'advanced',
        tip: 'Try YYZ → LHR (stopover 1–5 days) → CDG on one award ticket.',
      },
    ],
    pros: [
      'Free stopover on one-way awards — visit two cities on one booking',
      'No fuel surcharges on Air Canada flights',
      'Over 40 Star Alliance partners for global redemptions',
      'Points never expire with activity every 18 months',
      'Strong value for transatlantic business class',
    ],
    cons: [
      'Partner airline availability can be limited',
      'Award chart can be complex — mixed cabin bookings get tricky',
      'Fuel surcharges apply on some partner airlines (e.g., Lufthansa, Swiss)',
      'Call center required for some complex partner redemptions',
    ],
    strategyTips: [
      'Use the Aeroplan flight search tool\'s "flexible dates" view to find saver availability.',
      'Aeroplan charges a fixed "distance-based" rate — longer flights = more points but also more value per point.',
      'Book partner award tickets through aeroplan.com — call if search doesn\'t show availability.',
      'The free stopover rule is one of the best in the industry — always plan a stopover on transatlantic trips.',
      'Transfer points from Amex MR only when you have a specific booking in mind — don\'t park points in Aeroplan speculatively.',
    ],
    tags: ['airline', 'air-canada', 'star-alliance', 'popular', 'transatlantic'],
    lastUpdated: '2024-07-01',
  },

  // ── 3. RBC Avion ─────────────────────────────────────────────────────────────
  {
    id: 'rbc-avion',
    slug: 'rbc-avion',
    name: 'RBC Avion Rewards',
    shortName: 'RBC Avion',
    operator: 'RBC',
    type: 'bank',
    tagline: 'Flexible bank points with strong airline transfer options',
    description:
      'RBC Avion Rewards is a bank points currency that offers reasonable flexibility through its airline transfer partners and the Avion travel portal. Unlike Amex MR, Avion\'s earn rates are more modest (1x–1.25x), but the program shines for RBC banking clients who want a simple path to WestJet, British Airways Avios, or American Airlines.',
    cppCents: 1.0,
    cppCentsMax: 2.0,
    flexibilityRating: 3,
    earnCards: ['rbc-avion-vi'],
    transferPartners: [
      {
        name: 'WestJet Rewards',
        slug: 'westjet-rewards',
        type: 'airline',
        alliance: 'Independent',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: 'Up to 3 business days',
        isInstant: false,
        bestFor: 'Domestic Canadian flights and sun destinations on WestJet',
        notes: 'WestJet Dollars are dollar-denominated — simple and transparent.',
      },
      {
        name: 'British Airways Avios',
        slug: 'british-airways-avios',
        type: 'airline',
        alliance: 'Oneworld',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: '3–5 business days',
        isInstant: false,
        bestFor: 'Short-haul American Airlines flights within North America',
        notes: 'Avios distance-based pricing rewards short flights heavily.',
      },
      {
        name: 'American Airlines AAdvantage',
        slug: 'american-airlines-aadvantage',
        type: 'airline',
        alliance: 'Oneworld',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: '3–5 business days',
        isInstant: false,
        bestFor: 'Oneworld business class on AA, Cathay Pacific, and Finnair',
        notes: 'AA partner awards can be booked by calling AAdvantage.',
      },
      {
        name: 'Air France / KLM Flying Blue',
        slug: 'flying-blue',
        type: 'airline',
        alliance: 'SkyTeam',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: '3–5 business days',
        isInstant: false,
        bestFor: 'Monthly Flying Blue Promo Rewards to Europe',
        notes: 'Check monthly promo awards for 25–50% discounts.',
      },
      {
        name: 'Cathay Pacific Asia Miles',
        slug: 'cathay-asia-miles',
        type: 'airline',
        alliance: 'Oneworld',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: 'Up to 5 business days',
        isInstant: false,
        bestFor: 'Cathay Pacific premium cabin to Hong Kong and Southeast Asia',
      },
    ],
    sweetSpots: [
      {
        title: 'Short-haul via British Airways Avios',
        description: 'Transfer Avion to BA Avios and book American Airlines domestic US flights. Under 650 miles costs just 7,500 Avios in economy — outstanding per-point value.',
        pointsNeeded: '7,500–15,000 Avios one-way',
        estimatedCashValue: '$150–$400',
        cppEstimate: 2.0,
        difficulty: 'intermediate',
        tip: 'AA flights on short US routes — NYC to Boston, Miami, Charlotte — offer top Avios value.',
      },
      {
        title: 'Domestic WestJet via WestJet Dollars',
        description: 'Transfer Avion to WestJet Dollars at 1:1. WestJet Dollars offset any WestJet flight at face value. Simple, flexible, no award chart needed.',
        pointsNeeded: 'Variable (1 WestJet $ = $1 off)',
        estimatedCashValue: 'Face value',
        cppEstimate: 1.0,
        difficulty: 'beginner',
        tip: 'Great for last-minute domestic bookings when cash prices are high.',
      },
      {
        title: 'Flying Blue Promo Awards to Europe',
        description: 'Transfer Avion to Flying Blue and catch monthly promo awards — up to 50% off economy and business class to Europe from Canada.',
        pointsNeeded: '25,000–40,000 pts one-way',
        estimatedCashValue: '$800–$1,500',
        cppEstimate: 2.5,
        difficulty: 'intermediate',
        tip: 'Promos refresh monthly. Plan 1–2 months ahead when a good promo appears.',
      },
    ],
    pros: [
      'Strong airline transfer partner network (WestJet, Avios, AA, Flying Blue)',
      'WestJet transfer is simple and predictable for domestic travel',
      'Works well for RBC banking clients already in the ecosystem',
      'Avion travel portal for straightforward booking without transfers',
    ],
    cons: [
      'Lower earn rate (1x base) than Amex MR or TD Aeroplan cards',
      'No Aeroplan transfer option — major gap for AC-focused travellers',
      'Portal booking value (~1¢/pt) is mediocre',
      'Transfer times are 3–5 days — not instant',
    ],
    strategyTips: [
      'Unless you\'re booking through the Avion portal, transfers to airline partners offer the best value.',
      'The British Airways Avios path is the best use of Avion points for most travellers.',
      'Consider using the RBC Avion card as a secondary card — it pairs well with a higher-earn primary card.',
      'For WestJet loyalists, the WestJet transfer is unbeatable for simplicity.',
    ],
    tags: ['bank', 'rbc', 'westjet', 'avios', 'flexible', 'transfer-partners'],
    lastUpdated: '2024-07-01',
  },

  // ── 4. Scene+ ────────────────────────────────────────────────────────────────
  {
    id: 'scene-plus',
    slug: 'scene-plus',
    name: 'Scene+',
    shortName: 'Scene+',
    operator: 'Scotiabank / Cineplex / Empire Group',
    type: 'coalition',
    tagline: 'Simple Canadian coalition rewards — groceries, movies, and travel',
    description:
      'Scene+ is a Canadian coalition program run by Scotiabank, Cineplex, and the Empire grocery group (Sobeys, IGA, FreshCo, Foodland). Points are worth a fixed 1 cent each and can be redeemed for movies, groceries, travel, and dining. Unlike bank currencies, Scene+ has no transfer partners — it\'s designed for simplicity and straightforward redemptions.',
    cppCents: 1.0,
    cppCentsMax: 1.0,
    flexibilityRating: 2,
    earnCards: ['scotia-passport-vi', 'scotiabank-scene-plus-visa'],
    transferPartners: [],     // No transfer partners — by design
    sweetSpots: [
      {
        title: 'Cineplex Movie Tickets',
        description: 'Redeem Scene+ points for General Admission and UltraAVX movie tickets at Cineplex theatres nationwide. A standard ticket costs ~$16–$22 depending on location.',
        pointsNeeded: '1,250–2,200 points per ticket',
        estimatedCashValue: '$16–$22',
        cppEstimate: 1.0,
        difficulty: 'beginner',
        tip: 'Combine 5x scene+ earn on Scotiabank Visa with movie ticket redemptions for the best per-visit value.',
      },
      {
        title: 'Grocery Redemptions at Sobeys/IGA',
        description: 'Redeem Scene+ points at checkout at Sobeys, IGA, FreshCo, Foodland, and other Empire group stores. In-store redemptions are seamless.',
        pointsNeeded: '1,000 points = $10',
        estimatedCashValue: '$10 per 1,000 pts',
        cppEstimate: 1.0,
        difficulty: 'beginner',
        tip: 'Combine weekly in-store bonus point offers with your Scene+ Visa earn for accelerated accumulation.',
      },
      {
        title: 'Travel via Scotiabank',
        description: 'Book travel through Scotiabank\'s Expedia-powered travel portal and redeem Scene+ points. Points are worth 1¢ each on any eligible travel booking.',
        pointsNeeded: 'Variable (1 pt = 1¢)',
        estimatedCashValue: 'Face value of travel',
        cppEstimate: 1.0,
        difficulty: 'beginner',
        tip: 'Works best when you\'ve accumulated a large Scene+ balance through grocery and movie spend.',
      },
    ],
    pros: [
      'Fixed 1¢ value — no devaluations, no complex award charts',
      'Strong in-store earn at Sobeys, IGA, FreshCo and Cineplex',
      'Scotiabank Passport Visa Infinite earns Scene+ with no FX fee — great combo',
      'Points never expire with card activity',
      'Easy to understand for non-travel-hackers',
    ],
    cons: [
      'No transfer partners — 1¢/pt is the ceiling, not a floor',
      'Less valuable than Amex MR or Aeroplan for big-ticket travel redemptions',
      'Cineplex and Sobeys ecosystem required to maximize value',
      'Travel portal redemptions are simple but not high-value',
    ],
    strategyTips: [
      'Stack Scene+ card earn with in-store Sobeys bonus point events (often 10× on specific items).',
      'For movie-goers: the Scotiabank Scene+ Visa earns 5× at Cineplex — pay $15 earn effectively $0.75 back.',
      'If you primarily shop at Loblaws/PC stores, consider a PC Optimum card instead.',
      'Scene+ is best as a complementary program, not your primary travel currency.',
    ],
    tags: ['coalition', 'grocery', 'movies', 'scotiabank', 'cineplex', 'simple'],
    lastUpdated: '2024-07-01',
  },

  // ── 5. BMO Rewards ───────────────────────────────────────────────────────────
  {
    id: 'bmo-rewards',
    slug: 'bmo-rewards',
    name: 'BMO Rewards',
    shortName: 'BMO Rewards',
    operator: 'BMO',
    type: 'bank',
    tagline: 'BMO\'s bank points — best used through the travel portal',
    description:
      'BMO Rewards is BMO\'s proprietary points currency, earned primarily on BMO credit cards and redeemed through the BMO Rewards travel portal or for statement credits. Unlike Amex MR or RBC Avion, BMO Rewards lacks airline transfer partners — its best value comes from booking through the travel portal at approximately 0.67¢–1¢ per point, or statement credits against travel purchases.',
    cppCents: 0.71,
    cppCentsMax: 1.0,
    flexibilityRating: 2,
    earnCards: ['bmo-eclipse-vi'],
    transferPartners: [],
    sweetSpots: [
      {
        title: 'Statement Credit Against Travel',
        description: 'Book any travel with your BMO card, then redeem points as a statement credit against that purchase at 0.67¢–1¢ per point.',
        pointsNeeded: 'Variable',
        estimatedCashValue: 'Face value of booking',
        cppEstimate: 0.71,
        difficulty: 'beginner',
        tip: 'Book directly with airlines/hotels, then offset with points — more flexibility than the portal.',
      },
      {
        title: 'BMO Rewards Travel Portal Booking',
        description: 'Book flights and hotels directly through the BMO Rewards portal. Points are worth approximately 0.71¢ each.',
        pointsNeeded: '150 points ≈ $1',
        estimatedCashValue: 'Face value of travel',
        cppEstimate: 0.71,
        difficulty: 'beginner',
        tip: 'Works like a travel portal — convenient but not high-yield compared to transfer programs.',
      },
    ],
    pros: [
      'Very strong earn rates on the BMO eclipse Visa (5× on dining, groceries, gas, drugstore)',
      'Simple redemption — no complex award charts or transfer delays',
      'Cash back redemption option if you don\'t want travel',
      'Good welcome bonus offers, often with first-year fee waived',
    ],
    cons: [
      'No airline or hotel transfer partners',
      'Points value is capped at ~0.71¢–1¢ — no upside',
      'Less flexible than Amex MR for travel redemptions',
      'BMO travel portal has limited inventory vs. booking direct',
    ],
    strategyTips: [
      'The BMO eclipse\'s real value is its 5× earn rate on everyday categories — think of it as high-rate cash back.',
      'Redeem as a statement credit against travel charges for the simplest experience.',
      'Pair BMO Rewards with a more flexible travel card for non-everyday spending.',
    ],
    tags: ['bank', 'bmo', 'travel-portal', 'simple', 'no-transfer-partners'],
    lastUpdated: '2024-07-01',
  },

  // ── 6. WestJet Rewards ───────────────────────────────────────────────────────
  {
    id: 'westjet-rewards',
    slug: 'westjet-rewards',
    name: 'WestJet Rewards',
    shortName: 'WestJet $',
    operator: 'WestJet',
    type: 'airline',
    tagline: 'Simple dollar-based rewards for WestJet loyalists',
    description:
      'WestJet Rewards uses a dollar-denominated currency (WestJet dollars) rather than points, making it one of Canada\'s simplest airline programs. Every WestJet dollar is worth exactly $1 and can be applied to any WestJet flight or vacation package. No award charts, no availability windows, no complexity — just simple discounts on WestJet travel.',
    cppCents: 1.0,
    cppCentsMax: 1.0,
    flexibilityRating: 3,
    earnCards: ['rbc-avion-vi'],
    transferPartners: [
      {
        name: 'RBC Avion',
        slug: 'rbc-avion',
        type: 'bank',
        ratioFrom: 1, ratioTo: 1, ratioLabel: '1:1',
        transferTime: '3 business days',
        isInstant: false,
        bestFor: 'RBC cardholders who want to boost WestJet balance',
        notes: 'RBC Avion → WestJet Dollars at 1:1 ratio.',
      },
    ],
    sweetSpots: [
      {
        title: 'WestJet Companion Voucher',
        description: 'The WestJet RBC World Elite Mastercard comes with an annual companion voucher — a second ticket (taxes only) for any fare on any WestJet route when you buy one fare.',
        pointsNeeded: 'Annual card fee only',
        estimatedCashValue: '$99–$399+ depending on route',
        cppEstimate: 3.0,
        difficulty: 'beginner',
        tip: 'Use on a transatlantic or sun destination route to maximize the voucher\'s value.',
      },
      {
        title: 'Last-minute WestJet Bookings',
        description: 'WestJet Dollars are best on higher-priced fares. A $400 fare redeemed with $400 in WestJet Dollars is a clean, no-hassle experience.',
        pointsNeeded: '400 WestJet $ for a $400 flight',
        estimatedCashValue: '$400',
        cppEstimate: 1.0,
        difficulty: 'beginner',
        tip: 'WestJet Dollars work on all fare types including Econo — no blackout dates.',
      },
    ],
    pros: [
      'Completely transparent — 1 WestJet $ = $1, always',
      'No award charts, no availability restrictions, no blackout dates',
      'Companion voucher from WestJet credit cards is very valuable',
      'Applies to any seat on any WestJet flight',
    ],
    cons: [
      'Only useful on WestJet — no other redemption options',
      'No ability to exceed 1¢/pt in value',
      'WestJet doesn\'t fly everywhere (limited international routes)',
      'Must earn through WestJet card or transfer from RBC Avion',
    ],
    strategyTips: [
      'The companion voucher is the real value driver with WestJet credit cards — maximize it on a premium route.',
      'Save WestJet Dollars for higher-fare routes where cash prices are steep.',
      'Consider WestJet Rewards as supplementary to a primary flexible bank currency.',
    ],
    tags: ['airline', 'westjet', 'simple', 'dollar-based', 'companion-voucher'],
    lastUpdated: '2024-07-01',
  },

  // ── 7. Marriott Bonvoy ───────────────────────────────────────────────────────
  {
    id: 'marriott-bonvoy',
    slug: 'marriott-bonvoy',
    name: 'Marriott Bonvoy',
    shortName: 'Bonvoy',
    operator: 'Marriott International',
    type: 'hotel',
    tagline: 'Massive hotel network — and a gateway to 40+ airline programs',
    description:
      'Marriott Bonvoy is the world\'s largest hotel loyalty program, covering 30+ brands including Marriott, Sheraton, Westin, W Hotels, St. Regis, and Ritz-Carlton. Canadian cardholders can earn Bonvoy points through Amex MR transfers. Bonvoy also serves as a transfer hub to over 40 airline frequent flyer programs — though the 3:1 ratio (3 Bonvoy = 1 airline mile) makes this a last resort path.',
    cppCents: 0.8,
    cppCentsMax: 1.5,
    flexibilityRating: 3,
    earnCards: ['amex-platinum'],
    transferPartners: [
      {
        name: 'American Express Membership Rewards',
        slug: 'amex-membership-rewards',
        type: 'bank',
        ratioFrom: 1, ratioTo: 1.2, ratioLabel: '1:1.2',
        transferTime: 'Up to 5 business days',
        isInstant: false,
        bestFor: 'Building Bonvoy balance from Amex MR',
        notes: '1,000 Amex MR = 1,200 Bonvoy points.',
      },
      {
        name: 'Aeroplan',
        slug: 'aeroplan',
        type: 'airline',
        alliance: 'Star Alliance',
        ratioFrom: 3, ratioTo: 1, ratioLabel: '3:1',
        transferTime: 'Up to 5 business days',
        isInstant: false,
        bestFor: 'Last-resort conversion of excess Bonvoy points',
        notes: '60,000 Bonvoy = 25,000 Aeroplan (includes 5,000 bonus for every 60K transferred).',
      },
      {
        name: 'Air Canada (direct Bonvoy→Aeroplan)',
        slug: 'aeroplan',
        type: 'airline',
        alliance: 'Star Alliance',
        ratioFrom: 3, ratioTo: 1, ratioLabel: '3:1',
        transferTime: '3–5 business days',
        isInstant: false,
        bestFor: 'Clearing out large Bonvoy balances',
        notes: 'Transfer in blocks of 60,000 for the 5,000-pt bonus.',
      },
    ],
    sweetSpots: [
      {
        title: 'Peak Category 1–4 Hotel Redemptions',
        description: 'Bonvoy properties in Categories 1–4 offer good value per point, typically costing 7,500–30,000 points per night at hotels priced $100–$250+ cash.',
        pointsNeeded: '7,500–30,000 per night',
        estimatedCashValue: '$100–$250',
        cppEstimate: 1.0,
        difficulty: 'beginner',
        tip: 'Off-peak rates can reduce costs by 20–35% — check the off-peak calendar.',
      },
      {
        title: 'Peak Luxury Properties (Category 7–8)',
        description: 'St. Regis, Ritz-Carlton, and Edition hotels — often priced at $500–$1,000+ per night — can be redeemed for 60,000–100,000+ points with strong per-point value.',
        pointsNeeded: '60,000–100,000 per night',
        estimatedCashValue: '$500–$1,000+',
        cppEstimate: 1.5,
        difficulty: 'intermediate',
        tip: 'Fifth night free applies on 5-night award stays — book 5 nights for 4× the price.',
      },
      {
        title: 'Transfer to Airlines (60K bonus)',
        description: 'Transfer 60,000 Bonvoy to most airlines and receive 25,000 miles (including a 5,000-point bonus). Useful for topping off an airline account before a redemption.',
        pointsNeeded: '60,000 Bonvoy → 25,000 airline miles',
        estimatedCashValue: 'Depends on airline',
        cppEstimate: 0.8,
        difficulty: 'intermediate',
        tip: 'Use Aeroplan as the destination — 25,000 Aeroplan is worth ~$500 in flights.',
      },
    ],
    pros: [
      '30+ hotel brands covering every tier from affordable to ultra-luxury',
      'Fifth night free on award stays of 5+ nights',
      'Transfer gateway to 40+ airline programs (3:1 ratio)',
      'Elite status benefits (free breakfast, upgrades) at higher tiers',
      'Points earned through Amex MR transfers',
    ],
    cons: [
      'Dynamic pricing means popular dates can cost significantly more',
      '3:1 ratio to airlines is inefficient — Amex MR to Aeroplan direct is better',
      'High peak awards at luxury properties require very large balances',
      'Earning through Canadian cards is limited vs. US market',
    ],
    strategyTips: [
      'Book award nights as part of a 5-night stay to get the 5th night free automatically.',
      'Off-peak pricing (typically 20–35% less) can make luxury redemptions very attainable.',
      'Use Amex Platinum benefits (Fine Hotels + Resorts) on top of Bonvoy points for elite treatment.',
      'Transferring Bonvoy to airlines should be a last resort — the 3:1 ratio burns value.',
    ],
    tags: ['hotel', 'marriott', 'luxury', 'transfer-hub', 'fifth-night-free'],
    lastUpdated: '2024-07-01',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProgramBySlug(slug: string): PointsProgram | undefined {
  return pointsPrograms.find(p => p.slug === slug)
}

export function getProgramsWithTransferPartners(): PointsProgram[] {
  return pointsPrograms.filter(p => p.transferPartners.length > 0)
}

export function getBankPrograms(): PointsProgram[] {
  return pointsPrograms.filter(p => p.type === 'bank')
}
