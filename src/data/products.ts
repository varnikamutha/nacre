import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ==========================================
  // BRACELETS (Referencing IMG_1182, IMG_1184, IMG_1185, IMG_1190)
  // ==========================================
  {
    id: 'bracelet-riviera-pearl',
    name: 'The Riviera Seed Pearl Strand',
    tagline: 'Luminous freshwater seed pearls woven with 18k gold beads',
    category: 'bracelets',
    metal: 'gold',
    price: 1299,
    originalPrice: 1799,
    rating: 4.9,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1611591475883-997214757351?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80',
      '/src/assets/images/universe_summer_pretty_1789199587798.jpg'
    ],
    badges: ['Anti-Tarnish', 'Real Seed Pearls', 'Bestseller'],
    universe: 'summer-i-turned-pretty',
    tier: 'signature',
    referenceImageName: 'IMG_1182.JPG (Pearl strand on porcelain)',
    description: 'A romantic, sun-drenched bracelet designed for salt-air mornings and barefoot strolls. Hand-strung with genuine miniature freshwater seed pearls nestled between gleaming 18K gold faceted spacer beads, finished with a delicate heart charm extender tag.',
    materials: 'Natural freshwater cultured seed pearls, 18K gold PVD plating on 316L surgical stainless steel core. Waterproof and hypoallergenic.',
    dimensions: '16cm chain length + 4cm adjustable heart extender link.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'Stack alongside "The Starlight Twisted Pavé Bangle" for effortless textural contrast.'
  },
  {
    id: 'bracelet-starlight-twisted-bangle',
    name: 'The Starlight Twisted Pavé Bangle',
    tagline: 'Architectural contoured bangle with sparkling pavé ribbon',
    category: 'bracelets',
    metal: 'rose-gold',
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611591475883-997214757351?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['18K Rose Gold Plated', 'Waterproof', 'Micro-Pavé'],
    universe: 'bridgerton',
    tier: 'signature',
    referenceImageName: 'IMG_1184.JPG (Twisted pave bangle on slate)',
    description: 'An ethereal twist cuff capturing romantic starlight. Featuring a fluid helical curve inset with hand-set pavé round brilliant cubic zirconia stones on one edge and mirror-polished rose gold on the other, equipped with a discreet side safety clasp.',
    materials: 'Triple-layer 18K Rose Gold PVD over solid 316L stainless steel, AAA+ Austrian pavé cubic zirconia crystals.',
    dimensions: 'Standard 58mm inner diameter (fits wrists up to 17.5cm) with hidden click-hinge lock.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'The subtle twist catches light as your wrist moves — perfect with evening silk or a crisp white linen shirt.'
  },
  {
    id: 'bracelet-bellini-oval-link',
    name: 'The Bellini Oval Link Bracelet',
    tagline: 'Sculptural open oval links crowned with pavé crystal discs',
    category: 'bracelets',
    metal: 'gold',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Anti-Tarnish', '18K Gold Plated', 'Editor’s Pick'],
    universe: 'emily-in-paris',
    tier: 'signature',
    referenceImageName: 'IMG_1185.JPG (Open oval link cluster bracelet on stand)',
    description: 'Warm, luminous, and undeniably Parisian. Elongated hollow-silhouette oval links alternate seamlessly with circular pavé crystal cluster medallions, giving you high-fashion presence with featherweight comfort.',
    materials: '18K Yellow Gold PVD on hypoallergenic medical-grade steel base, micro-pavé CZ crystals.',
    dimensions: '17cm length + 3cm extender chain with custom Nacre teardrop tag.',
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: false,
    stylingNote: 'Wears like vintage heirloom jewellery passed down from an effortlessly chic French grandmother.'
  },
  {
    id: 'bracelet-knot-of-monaco-bangle',
    name: 'The Knot of Monaco Crossover Bangle',
    tagline: 'Modern infinity crossover cuff with pavé band collar',
    category: 'bracelets',
    metal: 'gold',
    price: 1749,
    originalPrice: 2299,
    rating: 5.0,
    reviewCount: 114,
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Anti-Tarnish', 'Waterproof', 'Signature Tier'],
    universe: 'gossip-girl',
    tier: 'signature',
    referenceImageName: 'IMG_1190.JPG (Crossover crystal knot cuff)',
    description: 'Clean architectural lines meet Upper East Side luxury. A polished gold cuff tapers into a double band gathered at the crest with a sparkling pavé crystal collar ring that stays firmly in place without snagging.',
    materials: '18K Yellow Gold PVD over vacuum-tempered steel, encrusted with high-clarity pavé CZ.',
    dimensions: 'Oval contour 60mm × 50mm inner circumference with spring tension hinge.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'Pair with tailored blazers, dark manicures, and iced coffees on the Met steps.'
  },

  // ==========================================
  // RINGS (Referencing bgf, e, ef, gbf)
  // ==========================================
  {
    id: 'ring-eternal-twist',
    name: 'The Eternal Twist Rope Ring',
    tagline: 'Intertwined infinity ribbon with graduating crystal pavé',
    category: 'rings',
    metal: 'gold',
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Under ₹999', 'Anti-Tarnish', 'Daily Stacker'],
    universe: 'gossip-girl',
    tier: 'everyday',
    referenceImageName: 'bgf.JPG (Twisted rope ring on ivory silk)',
    description: 'Two fluid ribbons intertwine in an unbroken infinity braid — one mirror-polished 18k gold strand, the other lined with delicate pavé crystals that shimmer softly with every gesture.',
    materials: '18K Yellow Gold PVD on 316L Surgical Stainless Steel. 100% tarnish-proof, sweat-proof, hand-sanitizer safe.',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: true,
    stylingNote: 'Wear it solo on your pointer finger or stack it alongside smooth plain gold bands.'
  },
  {
    id: 'ring-lilac-blossom-cluster',
    name: 'The Lilac Blossom Cluster Ring',
    tagline: 'Prong-set pastel lilac & champagne crystals in a romantic spray',
    category: 'rings',
    metal: 'gold',
    price: 1199,
    originalPrice: 1599,
    rating: 4.9,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Demi-Fine', 'Anti-Tarnish', 'Pastel Gemstones'],
    universe: 'to-all-the-boys',
    tier: 'signature',
    referenceImageName: 'e.JPG (Lilac & rose crystal cluster on silk)',
    description: 'Sweet, nostalgic, and subtly magical. A whisper-thin gold band crowns your finger with five graduating pastel lilac and soft champagne cubic zirconia stones prong-set like freshly bloomed spring wildflowers.',
    materials: '18K Gold Plated 925 Sterling Silver core, lab-grown lavender and champagne zircon gemstones.',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: false,
    stylingNote: 'Looks like something Lara Jean would discover at a quaint flea market and treasure forever.'
  },
  {
    id: 'ring-atelier-floral-vine',
    name: 'The Atelier Floral Vine Ring',
    tagline: 'Sculpted cherry blossoms with diamond center pistils',
    category: 'rings',
    metal: 'gold',
    price: 1099,
    originalPrice: 1499,
    rating: 5.0,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Anti-Tarnish', 'Botanical Sculpted', '18K Gold'],
    universe: 'emily-in-paris',
    tier: 'signature',
    referenceImageName: 'ef.JPG (Harmonique floral vine ring on silk)',
    description: 'Inspired by Japanese cherry blossom branches and Parisian botanical gardens. A graceful twig band blooming with three dimensional five-petal blossoms, each centered with a sparkling micro-crystal pistil.',
    materials: '18K Yellow Gold PVD over high-grade steel, micro-pave crystal center stones. Never turns fingers green.',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'A conversation-starter ring that looks like a miniature botanical sculpture on your hand.'
  },
  {
    id: 'ring-midnight-celestial-foliage',
    name: 'The Midnight Sapphire Foliage Ring',
    tagline: 'Organic wave vine with alternating deep blue sapphires & diamonds',
    category: 'rings',
    metal: 'gold',
    price: 1349,
    originalPrice: 1799,
    rating: 4.9,
    reviewCount: 132,
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Regency Collection', 'Deep Sapphire', 'Anti-Tarnish'],
    universe: 'bridgerton',
    tier: 'signature',
    referenceImageName: 'gbf.JPG (Sapphire & diamond organic vine ring)',
    description: 'Fit for the Diamond of the Season. An undulating golden vine wraps the finger with asymmetrical prongs holding rich royal blue sapphires and brilliant diamond-white crystals that twinkle like the Mayfair night sky.',
    materials: '18K Yellow Gold PVD over 316L Surgical Steel, laboratory-grown royal sapphire and diamond cubic zirconias.',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: false,
    stylingNote: 'The wavy contour stacks harmoniously above a plain engagement or signet band.'
  },

  // ==========================================
  // EARRINGS (Referencing IMG_1189, IMG_1188, be, bg)
  // ==========================================
  {
    id: 'earrings-pave-radiance-huggies',
    name: 'The Pavé Radiance Wide Huggies',
    tagline: 'Triple-row micro-pavé huggie hoops with snug comfort click',
    category: 'earrings',
    metal: 'gold',
    price: 999,
    originalPrice: 1399,
    rating: 4.9,
    reviewCount: 320,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Under ₹999', 'Anti-Tarnish', 'Daily Essential', 'Hypoallergenic'],
    universe: 'emily-in-paris',
    tier: 'everyday',
    referenceImageName: 'IMG_1189.JPG (Wide pave huggies on pink velvet)',
    description: 'The pair you will put in and never take out — sleep-in safe, shower-safe, and phone-call safe. Wide channel hugging hoops encrusted with three rows of seamless brilliant-cut pavé crystals that shimmer from every angle.',
    materials: '18K Gold PVD over surgical stainless steel. Ultra-gentle on sensitive earlobes, 100% nickel-free and lead-free.',
    dimensions: '12mm outer diameter, 6mm width, snug click-latch closure.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: true,
    stylingNote: 'The ultimate hero earring. Elevates an everyday slicked-back bun or messy ponytail instantly.'
  },
  {
    id: 'earrings-dual-aurora-heart-drops',
    name: 'The Dual Aurora Heart Drops',
    tagline: 'Double-hoop huggies with floating faceted heart crystal drops',
    category: 'earrings',
    metal: 'gold',
    price: 1249,
    originalPrice: 1699,
    rating: 4.8,
    reviewCount: 84,
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Anti-Tarnish', 'Faceted Heart Gem', 'New In'],
    universe: 'to-all-the-boys',
    tier: 'signature',
    referenceImageName: 'IMG_1188.JPG (Double hoop huggies with heart drop on stand)',
    description: 'An optical illusion of two layered hoops in a single piercing — one high-polish gold, the other set with pavé crystals, dangling a precision-cut heart crystal that catches romantic candlelight.',
    materials: '18K Yellow Gold PVD over surgical steel core, heart-cut optical grade cubic zirconia drops.',
    dimensions: '14mm hoop drop + 6mm heart charm.',
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: false,
    stylingNote: 'Pair with an off-shoulder knit or silk cami for effortless date-night romance.'
  },
  {
    id: 'earrings-cascading-heart-rain',
    name: 'The Cascading Heart Rain Huggies',
    tagline: 'Triple delicate chain waterfalls dripping with pavé heart charms',
    category: 'earrings',
    metal: 'gold',
    price: 1450,
    originalPrice: 1899,
    rating: 4.9,
    reviewCount: 71,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Statement Drop', 'Anti-Tarnish', 'Waterproof'],
    universe: 'to-all-the-boys',
    tier: 'signature',
    referenceImageName: 'be.JPG (Triple chain heart huggies on rod)',
    description: 'Dramatic movement with featherweight grace. Suspended from a secure gold huggie are three graduated diamond-cut cable chains ending in puffed and pavé double-sided heart charms that dance as you turn your head.',
    materials: 'Triple-dip 18K Gold PVD over stainless steel, micro-pavé zirconia charms.',
    dimensions: '38mm total drop length, comfortable 10mm huggie hoop.',
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: false,
    stylingNote: 'Tuck your hair behind one ear and let these cascading chains do all the talking.'
  },
  {
    id: 'earrings-duo-horizon-huggies',
    name: 'The Duo Horizon Curved Huggies',
    tagline: 'Sculptural split band: one pavé diamond lane, one mirror gold',
    category: 'earrings',
    metal: 'gold',
    price: 1050,
    originalPrice: 1450,
    rating: 5.0,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Anti-Tarnish', 'Architectural Dual Band', 'Bestseller'],
    universe: 'summer-i-turned-pretty',
    tier: 'everyday',
    referenceImageName: 'bg.JPG (Dual curved huggies on linen stand)',
    description: 'A contemporary silhouette mimicking a double piercing. The split curvature features a slim line of channel-set pave crystals gracefully juxtaposed against a bold, mirror-finished gold ribbon band.',
    materials: '18K Yellow Gold PVD over 316L medical stainless steel. Sweat-proof, perfume-safe, waterproof.',
    dimensions: '14mm height, 7mm width with secure click hinge.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'Clean, modern, and goes with everything from vintage denim jackets to evening slip dresses.'
  },

  // ==========================================
  // NECK PIECES / NECKLACES (Referencing IMG_1191, n, nm, nv)
  // ==========================================
  {
    id: 'necklace-royal-swan-pendant',
    name: 'The Royal Swan Pavé Pendant',
    tagline: 'Pavé-encrusted royal swan cradling a blush pink marquise gem',
    category: 'necklaces',
    metal: 'rose-gold',
    price: 1799,
    originalPrice: 2399,
    rating: 5.0,
    reviewCount: 188,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Regency Fine Tier', 'Blush Pink Gem', 'Anti-Tarnish'],
    universe: 'bridgerton',
    tier: 'fine-edit',
    referenceImageName: 'IMG_1191.JPG (Rose gold swan necklace in velvet gift box)',
    description: 'Symbolizing eternal grace and romantic royalty. A delicate rose-gold box chain suspends a sculpted royal swan completely covered in micro-pavé crystals, cradling a faceted rose-quartz-toned marquise gem at its center.',
    materials: '18K Rose Gold PVD on 925 Sterling Silver, hand-cut pink spinel zirconia & pavé crystals.',
    dimensions: '40cm box chain + 5cm adjustable extender.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'Arrives in our signature navy velvet presentation box — the quintessential anniversary or birthday gift.'
  },
  {
    id: 'necklace-endless-knot-collar',
    name: 'The Endless Knot Shimmer Collar',
    tagline: 'Minimalist polished infinity knot on a liquid gold link chain',
    category: 'necklaces',
    metal: 'gold',
    price: 949,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 204,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Under ₹999', 'Anti-Tarnish', 'Minimalist Stacker'],
    universe: 'to-all-the-boys',
    tier: 'everyday',
    referenceImageName: 'n.JPG (Infinity knot necklace on bust)',
    description: 'Simplicity at its most powerful. A seamless, high-polished figure-8 infinity knot that rests flat against the collarbone, threaded seamlessly into an ultra-fine link chain that catches light with every breath.',
    materials: '18K Yellow Gold PVD over surgical stainless steel. Never tarnishes or fades even when worn in the pool.',
    dimensions: '38cm collar length + 5cm extender with lobster clasp.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: true,
    stylingNote: 'The anchor piece for any layered neckline. Pair with a longer pendant or wear alone as a subtle shimmer.'
  },
  {
    id: 'necklace-jardin-tulip-enamel',
    name: 'The Jardin Tulip Enamel Medallion',
    tagline: 'Sculpted gold floral tulip in ivory enamel portrait medallion',
    category: 'necklaces',
    metal: 'gold',
    price: 1399,
    originalPrice: 1899,
    rating: 4.9,
    reviewCount: 95,
    images: [
      '/src/assets/images/universe_emily_paris_1789199570293.jpg',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Hand-Poured Enamel', 'Snake Chain', 'Anti-Tarnish'],
    universe: 'emily-in-paris',
    tier: 'signature',
    referenceImageName: 'nm.JPG (Enamel tulip medallion on snake chain)',
    description: 'An ode to vintage Parisian locket treasures. An organic scalloped gold medallion filled with lustrous hand-poured ivory enamel, centering an embossed 18k gold botanical tulip and suspended from a slinky liquid snake chain.',
    materials: '18K Gold PVD over stainless steel, cold-fired ivory enamel inlay. Waterproof and chip-resistant.',
    dimensions: '42cm snake chain + 5cm extender. Pendant size: 20mm × 13mm.',
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: false,
    stylingNote: 'Pairs impeccably with linen shirts, cashmere turtlenecks, and retro sunglasses.'
  },
  {
    id: 'necklace-puffed-heart-satellite',
    name: 'The Puffed Heart Satellite Necklace',
    tagline: 'Sculptural 3D golden heart on delicate beaded satellite snake chain',
    category: 'necklaces',
    metal: 'gold',
    price: 1199,
    originalPrice: 1599,
    rating: 5.0,
    reviewCount: 147,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Anti-Tarnish', '3D Sculpted', 'Most Saved on Pinterest'],
    universe: 'summer-i-turned-pretty',
    tier: 'signature',
    referenceImageName: 'nv.JPG (Puffed heart pendant on beaded snake chain)',
    description: 'Substantial yet buoyant. A modern, voluptuous 3D puffed heart pendant with a weighted, satisfying tactile feel, gliding on a fine snake chain accented with spaced satellite micro-beads.',
    materials: 'Triple-plated 18K Yellow Gold PVD over solid medical-grade steel. Won’t discolor from sun, sea, or sweat.',
    dimensions: '42cm chain with 5cm extension. Puffed heart: 16mm × 14mm × 6mm.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'The piece everyone stops to ask about. The weighted heart stays centered on your collarbone all day.'
  },

  // Complementary pieces for full sets and gifting
  {
    id: 'anklet-bon-voyage-pearl',
    name: 'The Bon Voyage Pearl & Chain Anklet',
    tagline: 'Waterproof sea-glass beads and gold cable chain for beach days',
    category: 'anklets',
    metal: 'gold',
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviewCount: 52,
    images: [
      '/src/assets/images/universe_summer_pretty_1789199587798.jpg',
      'https://images.unsplash.com/photo-1611591475883-997214757351?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Under ₹999', 'Beach-Proof', 'Anti-Tarnish'],
    universe: 'summer-i-turned-pretty',
    tier: 'everyday',
    description: 'Dainty, salt-water safe anklet with mini organic seed pearls and diamond-cut curb links.',
    materials: '18K Gold PVD on 316L steel, real mini cultured seed pearls.',
    dimensions: '21cm + 5cm extender.',
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: true,
    stylingNote: 'Wear it all summer long into the sea, pool, and shower without ever taking it off.'
  },
  {
    id: 'set-main-character-trio',
    name: 'The "Main Character" Everyday Luxe Trio Set',
    tagline: 'Curated 3-piece bundle: Riviera Pearl Bracelet + Pavé Huggies + Endless Knot Necklace',
    category: 'sets',
    metal: 'gold',
    price: 2899,
    originalPrice: 3547,
    rating: 5.0,
    reviewCount: 63,
    images: [
      '/src/assets/images/nacre_hero_editorial_1789199546846.jpg',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80'
    ],
    badges: ['Save ₹648', 'Luxury Gift Box Included', 'Bundle & Save'],
    universe: 'summer-i-turned-pretty',
    tier: 'fine-edit',
    description: 'The definitive Nacre introductory set. Includes the Riviera Seed Pearl Strand, Pavé Radiance Huggies, and the Endless Knot Collar, packaged together in our midnight navy keepsake velvet presentation box with gold foil ribbon.',
    materials: '18K Gold PVD over stainless steel, real freshwater seed pearls, AAA+ CZ crystals.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'Instant effortless jewellery wardrobe in one package. Foolproof gift.'
  }
];

export const REVIEWS: { [key: string]: string[] } = {
  'bracelet-riviera-pearl': [
    '“I have worn this into the Arabian sea in Goa and into hot showers for 3 weeks straight. Still looks brand new, zero tarnishing. Absolutely stunning!” — Rhea K., Mumbai',
    '“The seed pearls are so delicate and the heart tag adds such a cute touch. 10/10!” — Alisha M., Delhi'
  ],
  'necklace-royal-swan-pendant': [
    '“My boyfriend gave this to me for our anniversary. The blush pink stone in the swan is SO romantic and expensive-looking. Comes in gorgeous packaging.” — Pooja S., Bengaluru'
  ]
};
