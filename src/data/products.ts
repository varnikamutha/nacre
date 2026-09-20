import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ==========================================
  // BRACELETS (6 curated styles)
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
      '/assets/images/pearl_strand_bracelet_1789910930879.jpg'
    ],
    badges: ['Anti-Tarnish', 'Real Seed Pearls', 'Bestseller'],
    universe: 'summer-i-turned-pretty',
    tier: 'signature',
    referenceImageName: 'be.JPG (Freshwater pearl strand with gold beads)',
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
      '/assets/images/twisted_gold_bangle_1789217246681.jpg'
    ],
    badges: ['18K Gold Plated', 'Waterproof', 'Micro-Pavé'],
    universe: 'bridgerton',
    tier: 'signature',
    referenceImageName: 'bg.JPG (Sculptural twisted pave torque bangle)',
    description: 'An ethereal twist cuff capturing romantic starlight. Featuring a fluid helical curve inset with hand-set pavé round brilliant cubic zirconia stones on one edge and mirror-polished gold on the other, equipped with a discreet side safety clasp.',
    materials: 'Triple-layer 18K Gold PVD over solid 316L stainless steel, AAA+ Austrian pavé cubic zirconia crystals.',
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
      '/assets/images/paperclip_bracelet_1789217343899.jpg'
    ],
    badges: ['Anti-Tarnish', '18K Gold Plated', 'Editor’s Pick'],
    universe: 'emily-in-paris',
    tier: 'signature',
    referenceImageName: 'bgf.JPG (French open oval link paperclip chain)',
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
      '/assets/images/crossover_knot_bangle_1789217703206.jpg'
    ],
    badges: ['Anti-Tarnish', 'Waterproof', 'Signature Tier'],
    universe: 'emily-in-paris',
    tier: 'signature',
    referenceImageName: 'gbf.JPG (Overlapping crossover crystal knot cuff)',
    description: 'Clean architectural lines meet French Riviera luxury. A polished gold cuff tapers into a double band gathered at the crest with a sparkling pavé crystal collar ring that stays firmly in place without snagging.',
    materials: '18K Yellow Gold PVD over vacuum-tempered steel, encrusted with high-clarity pavé CZ.',
    dimensions: 'Oval contour 60mm × 50mm inner circumference with spring tension hinge.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'Pair with tailored blazers, dark manicures, and an espresso on the Boulevard Saint-Germain.'
  },
  {
    id: 'bracelet-croissant-dome',
    name: 'The Riviera Croissant Dome Bangle',
    tagline: 'Sculptural ribbed hollow dome cuff in mirror-polish 18k gold',
    category: 'bracelets',
    metal: 'gold',
    price: 1650,
    originalPrice: 2199,
    rating: 4.9,
    reviewCount: 89,
    images: [
      '/assets/images/croissant_bangle_1789218346424.jpg'
    ],
    badges: ['Anti-Tarnish', 'French Riveted', 'Chic Minimal'],
    universe: 'emily-in-paris',
    tier: 'signature',
    referenceImageName: 'Croissant dome minimal gold cuff',
    description: 'A timeless French pastry silhouette re-imagined into heavy-look, featherlight wristwear. Its tapered ergonomic contour slips on effortlessly and hugs the wrist with warm golden glow.',
    materials: '18K Gold PVD electroplated over surgical 316L stainless steel. Waterproof, sunscreen-safe, and perfume-proof.',
    dimensions: 'Internal diameter 60mm with smooth slip-on contoured open closure.',
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: false,
    stylingNote: 'Stack with an ultra-thin diamond tennis bracelet for the ultimate Pinterest wrist-party.'
  },
  {
    id: 'bracelet-lumina-tennis',
    name: 'The Lumina Micro-Pavé Tennis Bracelet',
    tagline: 'Continuous line of brilliant-cut Austrian crystals in 18k bezel',
    category: 'bracelets',
    metal: 'gold',
    price: 1399,
    originalPrice: 1899,
    rating: 5.0,
    reviewCount: 153,
    images: [
      '/assets/images/tennis_bracelet_1789218435495.jpg'
    ],
    badges: ['Anti-Tarnish', 'Everyday Sparkle', 'Bestseller'],
    universe: 'bridgerton',
    tier: 'everyday',
    referenceImageName: 'Minimalist line crystal tennis bracelet',
    description: 'The elusive everyday tennis bracelet that feels completely weightless and never flips. Individually bezel-set round brilliant crystals give constant, liquid twinkle from day to night.',
    materials: 'Triple-layer 18K Yellow Gold PVD over steel, premium Austrian cubic zirconia stones, double-latch safety clasp.',
    dimensions: '16cm + 2cm removable safety extender.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'Never take it off — sleek enough for pilates, dazzling enough for cocktail hour.'
  },

  // ==========================================
  // RINGS (6 curated styles)
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
      '/assets/images/twist_silk_ring_1789217753853.jpg'
    ],
    badges: ['Under ₹999', 'Anti-Tarnish', 'Daily Stacker'],
    universe: 'summer-i-turned-pretty',
    tier: 'everyday',
    referenceImageName: 'IMG_1188.JPG (Eternity twist pave ring on ivory silk)',
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
      '/assets/images/gemstone_vine_ring_1789217278517.jpg'
    ],
    badges: ['Demi-Fine', 'Anti-Tarnish', 'Pastel Gemstones'],
    universe: 'to-all-the-boys',
    tier: 'signature',
    referenceImageName: 'IMG_1189.JPG (Lilac & rose crystal cluster on soft fabric)',
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
      '/assets/images/blossom_ring_1789217769956.jpg'
    ],
    badges: ['Anti-Tarnish', 'Botanical Sculpted', '18K Gold'],
    universe: 'emily-in-paris',
    tier: 'signature',
    referenceImageName: 'IMG_1190.JPG (Harmonique botanical floral vine ring)',
    description: 'Inspired by Parisian botanical gardens. A graceful twig band blooming with three dimensional five-petal blossoms, each centered with a sparkling micro-crystal pistil.',
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
      '/assets/images/sapphire_ring_1789217784742.jpg'
    ],
    badges: ['Regency Collection', 'Deep Sapphire', 'Anti-Tarnish'],
    universe: 'bridgerton',
    tier: 'signature',
    referenceImageName: 'IMG_1191.JPG (Deep blue sapphire foliage vine on linen)',
    description: 'Fit for the Diamond of the Season. An undulating golden vine wraps the finger with asymmetrical prongs holding rich royal blue sapphires and brilliant diamond-white crystals that twinkle like the Mayfair night sky.',
    materials: '18K Yellow Gold PVD over 316L Surgical Steel, laboratory-grown royal sapphire and diamond cubic zirconias.',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: false,
    stylingNote: 'The wavy contour stacks harmoniously above a plain engagement or signet band.'
  },
  {
    id: 'ring-solitaire-wishbone-stack',
    name: 'The Wishbone Pavé Stacker Duo',
    tagline: 'Contoured chevron wishbone band nestled with brilliant solitaire',
    category: 'rings',
    metal: 'gold',
    price: 949,
    originalPrice: 1399,
    rating: 4.9,
    reviewCount: 118,
    images: [
      '/assets/images/wishbone_ring_1789218391745.jpg'
    ],
    badges: ['Under ₹999', 'Anti-Tarnish', 'Duo Stacker'],
    universe: 'emily-in-paris',
    tier: 'everyday',
    referenceImageName: 'Wishbone chevron micro-pave ring stack',
    description: 'A match made in heaven. A sharp geometric wishbone arc lined with glittering micro-pavé crystals creates an optical focal point that elongates your fingers effortlessly.',
    materials: '18K Yellow Gold PVD coating over titanium stainless steel core. Soap, sanitizer, and lotion proof.',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: true,
    stylingNote: 'Point the chevron apex down toward your knuckles for a modern architectural silhouette.'
  },
  {
    id: 'ring-starburst-celestial-signet',
    name: 'The Celestial Starburst Signet Ring',
    tagline: 'Hand-engraved starlight compass with glistening diamond solitaire',
    category: 'rings',
    metal: 'gold',
    price: 999,
    originalPrice: 1450,
    rating: 4.8,
    reviewCount: 77,
    images: [
      '/assets/images/solitaire_ring_1789218497424.jpg'
    ],
    badges: ['Under ₹999', 'Anti-Tarnish', 'Minimalist Signet'],
    universe: 'summer-i-turned-pretty',
    tier: 'everyday',
    referenceImageName: 'Dainty starburst engraved signet ring',
    description: 'A dainty modern update to classic heirloom signets. An oval mirror-buffed face is engraved with an eight-point starlight compass centered with a radiant micro-crystal.',
    materials: '18K Gold PVD over solid hypo-allergenic medical steel core.',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: true,
    stylingNote: 'The ultimate pinky or index finger statement ring.'
  },

  // ==========================================
  // EARRINGS
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
      '/assets/images/pave_huggie_velvet_1789217215432.jpg'
    ],
    badges: ['Under ₹999', 'Anti-Tarnish', 'Daily Essential', 'Hypoallergenic'],
    universe: 'emily-in-paris',
    tier: 'everyday',
    referenceImageName: 'ef.JPG (Wide micro-pave huggies on dusty rose velvet)',
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
      '/assets/images/heart_drop_earrings_1789217233020.jpg'
    ],
    badges: ['Anti-Tarnish', 'Faceted Heart Gem', 'New In'],
    universe: 'to-all-the-boys',
    tier: 'signature',
    referenceImageName: 'e.JPG (Double-hoop pave huggies with heart drop charm on stand)',
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
    name: 'The Cascading Starburst Chain Earrings',
    tagline: 'Triple delicate chain waterfalls dripping with pavé crystal charms',
    category: 'earrings',
    metal: 'gold',
    price: 1450,
    originalPrice: 1899,
    rating: 4.9,
    reviewCount: 71,
    images: [
      '/assets/images/cascading_chains_1789217722327.jpg'
    ],
    badges: ['Statement Drop', 'Anti-Tarnish', 'Waterproof'],
    universe: 'to-all-the-boys',
    tier: 'signature',
    referenceImageName: 'IMG_1184.JPG (Cascading kinetic heart drop chains on rod)',
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
      '/assets/images/split_huggies_1789217737854.jpg'
    ],
    badges: ['Anti-Tarnish', 'Architectural Dual Band', 'Bestseller'],
    universe: 'summer-i-turned-pretty',
    tier: 'everyday',
    referenceImageName: 'IMG_1185.JPG (Dual curved huggie arcs on book stand)',
    description: 'A contemporary silhouette mimicking a double piercing. The split curvature features a slim line of channel-set pave crystals gracefully juxtaposed against a bold, mirror-finished gold ribbon band.',
    materials: '18K Yellow Gold PVD over 316L medical stainless steel. Sweat-proof, perfume-safe, waterproof.',
    dimensions: '14mm height, 7mm width with secure click hinge.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'Clean, modern, and goes with everything from vintage denim jackets to evening slip dresses.'
  },
  {
    id: 'earrings-baroque-pearl-huggies',
    name: 'The Baroque Pearl Droplet Huggies',
    tagline: 'Pavé crystal huggie hoops cradling luminous teardrop freshwater pearls',
    category: 'earrings',
    metal: 'gold',
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 112,
    images: [
      '/assets/images/pearl_drop_earrings_1789218367457.jpg'
    ],
    badges: ['Real Cultured Pearls', 'Anti-Tarnish', 'Bestseller'],
    universe: 'summer-i-turned-pretty',
    tier: 'signature',
    referenceImageName: 'Organic baroque pearl huggie drops on blush velvet',
    description: 'The epitome of coastal Mediterranean luxury. Small huggie hoops encrusted with micro-pavé diamonds suspend genuine organic teardrop freshwater pearls with high iridescent luster.',
    materials: '18K Gold PVD over hypoallergenic surgical steel, genuine freshwater teardrop pearls, AAA+ micro CZ.',
    dimensions: '11mm hoop diameter, 10mm organic pearl drop.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'The pearls are detachable! Wear the huggies solo on casual days or slide the pearls back on for evenings.'
  },
  {
    id: 'earrings-cherie-pave-heart-studs',
    name: 'The Chérie Pavé Micro Heart Studs',
    tagline: 'Petite 18k gold heart studs paved with brilliant diamond crystals',
    category: 'earrings',
    metal: 'gold',
    price: 799,
    originalPrice: 1099,
    rating: 4.8,
    reviewCount: 94,
    images: [
      '/assets/images/heart_stud_earrings_1789218456085.jpg'
    ],
    badges: ['Under ₹999', 'Anti-Tarnish', 'Minimalist Studs'],
    universe: 'to-all-the-boys',
    tier: 'everyday',
    referenceImageName: 'Dainty micro-pave heart studs on handmade paper',
    description: 'Dainty, flat-back friendly, and utterly charming. Delicate heart studs encrusted with sparkling Austrian crystals that sit flush against your lobe or cartilage piercing.',
    materials: '18K Gold PVD over 316L surgical stainless steel. Hypoallergenic post with butterfly clutch.',
    dimensions: '6mm × 6mm heart silhouette.',
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: true,
    stylingNote: 'Ideal for secondary lobe, helix, or tragus piercings.'
  },

  // ==========================================
  // NECK PIECES / NECKLACES
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
      '/assets/images/swan_crystal_pendant_1789217305759.jpg'
    ],
    badges: ['Regency Fine Tier', 'Blush Pink Gem', 'Anti-Tarnish'],
    universe: 'bridgerton',
    tier: 'fine-edit',
    referenceImageName: 'IMG_1182.JPG (Royal crystal swan pendant in ivory box)',
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
      '/assets/images/knot_collar_necklace_1789910944582.jpg'
    ],
    badges: ['Under ₹999', 'Anti-Tarnish', 'Infinity Knot', 'Cousins Beach Edit'],
    universe: 'summer-i-turned-pretty',
    tier: 'everyday',
    referenceImageName: 'n.JPG (Infinity collar necklace on ivory)',
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
      '/assets/images/tulip_enamel_neck_1789910959953.jpg'
    ],
    badges: ['Hand-Poured Enamel', 'Snake Chain', 'Anti-Tarnish'],
    universe: 'emily-in-paris',
    tier: 'signature',
    referenceImageName: 'nm.JPG (Botanical tulip medallion on snake chain)',
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
      '/assets/images/puffed_heart_necklace_1789217324035.jpg'
    ],
    badges: ['Anti-Tarnish', '3D Sculpted', 'Most Saved on Pinterest'],
    universe: 'summer-i-turned-pretty',
    tier: 'signature',
    referenceImageName: 'nv.JPG (Minimal 3D puffed heart on satellite chain)',
    description: 'Substantial yet buoyant. A modern, voluptuous 3D puffed heart pendant with a weighted, satisfying tactile feel, gliding on a fine snake chain accented with spaced satellite micro-beads.',
    materials: 'Triple-plated 18K Yellow Gold PVD over solid medical-grade steel. Won’t discolor from sun, sea, or sweat.',
    dimensions: '42cm chain with 5cm extension. Puffed heart: 16mm × 14mm × 6mm.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'The piece everyone stops to ask about. The weighted heart stays centered on your collarbone all day.'
  },
  {
    id: 'necklace-liquid-herringbone-snake',
    name: 'The Liquid Gold Herringbone Chain',
    tagline: 'Ultra-fluid 3mm flat weave chain that contours the neck like silk',
    category: 'necklaces',
    metal: 'gold',
    price: 1299,
    originalPrice: 1749,
    rating: 4.9,
    reviewCount: 168,
    images: [
      '/assets/images/snake_chain_neck_1789218313736.jpg'
    ],
    badges: ['Anti-Tarnish', 'Liquid Gold', 'Bestseller'],
    universe: 'emily-in-paris',
    tier: 'signature',
    referenceImageName: 'Liquid herringbone flat chain on limestone',
    description: 'The definitive foundation piece. Highly polished flat-woven chevron links fit together seamlessly to reflect light like a ribbon of liquid gold across your clavicle without pinching or kinking.',
    materials: 'Triple 18K Yellow Gold PVD over reinforced surgical steel. Waterproof, sweatproof, tangle-free.',
    dimensions: '40cm length + 5cm extender with stamped signature lobster clasp.',
    isBestSeller: true,
    isNewArrival: false,
    isUnder999: false,
    stylingNote: 'Lies flat against the skin; style under an open shirt or layered with the Royal Swan Pendant.'
  },
  {
    id: 'necklace-ethereal-marquise-droplet',
    name: 'The Ethereal Marquise Droplet Pendant',
    tagline: 'Floating faceted marquise crystal on delicate diamond-cut cable chain',
    category: 'necklaces',
    metal: 'gold',
    price: 1099,
    originalPrice: 1499,
    rating: 4.8,
    reviewCount: 92,
    images: [
      '/assets/images/droplet_necklace_1789218417081.jpg'
    ],
    badges: ['Anti-Tarnish', 'Floating Crystal', 'New In'],
    universe: 'to-all-the-boys',
    tier: 'everyday',
    referenceImageName: 'Marquise crystal droplet pendant on ceramic tray',
    description: 'Whisper-light and luminous. A single faceted marquise-cut crystal hangs freely from a delicate diamond-cut cable chain, catching glimmers of light as you move.',
    materials: '18K Gold PVD over surgical stainless steel, optical clarity cubic zirconia marquise gemstone.',
    dimensions: '38cm chain + 5cm extension chain.',
    isBestSeller: false,
    isNewArrival: true,
    isUnder999: false,
    stylingNote: 'Subtle enough for daily school or office wear, yet adds an instant feminine polish.'
  },

  // ==========================================
  // COMPLEMENTARY PIECES & CURATED SETS
  // ==========================================
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
      '/assets/images/pearl_anklet_beach_1789910973597.jpg'
    ],
    badges: ['Under ₹999', 'Beach-Proof', 'Anti-Tarnish'],
    universe: 'summer-i-turned-pretty',
    tier: 'everyday',
    referenceImageName: 'Dainty seed pearl anklet',
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
      '/assets/images/nacre_hero_editorial_1789199546846.jpg'
    ],
    badges: ['Save ₹648', 'Luxury Gift Box Included', 'Bundle & Save'],
    universe: 'summer-i-turned-pretty',
    tier: 'fine-edit',
    referenceImageName: 'Curated 3-piece introductory gift box',
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
  'bracelet-knot-of-monaco-bangle': [
    '“The crossover design is so unique. Feels so solid and luxury on the wrist without being heavy.” — Tanya V., Mumbai'
  ],
  'earrings-pave-radiance-huggies': [
    '“The velvet display shot is what made me buy this! The wide huggies are so sparkly and comfortable to sleep in. Zero irritation on my sensitive ears.” — Shreya B., Bangalore'
  ],
  'necklace-royal-swan-pendant': [
    '“My boyfriend gave this to me for our anniversary. The blush pink stone in the swan is SO romantic and expensive-looking. Comes in gorgeous packaging.” — Pooja S., Bengaluru'
  ],
  'ring-eternal-twist': [
    '“Looks exactly like the photo on the silk. So comfortable and has not tarnished at all despite daily hand washing.” — Meera D., Pune'
  ]
};
