/**
 * Symbols & Iconography data for the /symbols reference grid.
 *
 * Guiding principle: symbols with an identifiable historical symbolic
 * tradition — not "things that can symbolize something."
 *
 * Schema distinction:
 *   - `historical`  What we know about its actual historical use and context.
 *   - `meaning`     The symbolic meaning traditionally or later associated
 *                   with it. May be later interpretive framing — clearly
 *                   framed as such, not presented as historical fact.
 *
 * What is excluded:
 *   - Astrological notation (☉ ☽ ☊ ⊕ etc.) — belongs to the Astro study.
 *     Ancient celestial iconography (sun disk, crescent as cult object) is
 *     different and stays.
 *   - Generic objects without a specific historical symbolic tradition.
 *   - Interpretations presented as definitions without attribution.
 */

export const TRADITIONS = [
  "Greek",
  "Roman",
  "Egyptian",
  "Norse",
  "Icelandic",
  "Alchemical",
  "Mesopotamian",
  "Celtic",
  "Hindu",
] as const;

export const TYPES = [
  "Geometric",
  "Animal",
  "Object",
  "Celestial",
  "Protective",
  "Botanical",
  "Composite",
  "Anthropomorphic",
] as const;

export const MEANINGS = [
  "Authority",
  "Abundance",
  "Balance",
  "Death",
  "Duality",
  "Eternity",
  "Fertility",
  "Fortune",
  "Healing",
  "Journey",
  "Knowledge",
  "Order",
  "Power",
  "Protection",
  "Rebirth",
  "Time",
  "Transformation",
  "Victory",
  "Wisdom",
] as const;

export type Tradition = (typeof TRADITIONS)[number];
export type SymbolType = (typeof TYPES)[number];
export type Meaning = (typeof MEANINGS)[number];

export interface OddessiSymbol {
  id: string;
  name: string;
  /** Real Unicode glyph, if one exists and is unambiguous */
  glyph?: string;
  traditions: Tradition[];
  type: SymbolType;
  meanings: Meaning[];
  /**
   * What we know about its actual historical use and attestation.
   * Factual, not interpretive.
   */
  historical: string;
  /**
   * The symbolic meaning traditionally or later associated with it.
   * May include interpretive tradition — clearly framed as such.
   */
  meaning: string;
  /** Other names this symbol is known by */
  aliases?: string[];
  /** Cross-cultural or disambiguation note */
  also?: string;
}

export const SYMBOLS: OddessiSymbol[] = [

  // ── Greek ──────────────────────────────────────────────────────────────────

  {
    id: "gorgoneion",
    name: "Gorgoneion",
    traditions: ["Greek", "Roman"],
    type: "Anthropomorphic",
    meanings: ["Protection", "Power", "Death"],
    historical:
      "A frontal face — typically that of Medusa — appearing on temples, shields, armor, coins, and household objects from the archaic period onward. One of the most widely deployed apotropaic images in the ancient Mediterranean. The shield application is one of many contexts; the symbol is the face itself.",
    meaning:
      "The horrific gaze that turns enemies to stone. Worn as an amulet to deflect the evil eye and ward off death.",
    aliases: ["Medusa head", "Apotropaic mask"],
  },
  {
    id: "meander",
    name: "Meander",
    traditions: ["Greek", "Roman"],
    type: "Geometric",
    meanings: ["Journey", "Time", "Eternity"],
    historical:
      "A continuous interlocking right-angle pattern running as a border on pottery, architecture, and textiles from at least the Geometric period (c. 900–700 BCE). One of the oldest and most widespread ornamental motifs in Greek art.",
    meaning:
      "Named after the winding Meander river. Often interpreted as representing the labyrinthine path of life, the eternal flow of water, or the infinite.",
    aliases: ["Greek key", "Key pattern", "Fret"],
  },
  {
    id: "omphalos",
    name: "Omphalos",
    traditions: ["Greek"],
    type: "Object",
    meanings: ["Order", "Wisdom", "Power"],
    historical:
      "A sacred stone object housed at Delphi, believed to mark the center of the world. Zeus sent two eagles in opposite directions; where they met was the navel of the earth. The Delphic omphalos was covered in a knotted net and flanked by two golden eagles.",
    meaning:
      "The world's navel — the fixed point around which the cosmos is organized, the seat of divine knowledge and oracular power.",
  },
  {
    id: "labyrinth",
    name: "Labyrinth",
    traditions: ["Greek"],
    type: "Geometric",
    meanings: ["Journey", "Death", "Power"],
    historical:
      "The structure built by Daedalus at Knossos to contain the Minotaur. The Classical seven-circuit labyrinth pattern appears on Cretan coins (c. 400 BCE onward) and across the Mediterranean world. Distinct from a maze: it has a single path with no dead ends.",
    meaning:
      "The inescapable enclosure; the winding path that leads to a dangerous center. Later interpreted as a symbol of the soul's inward journey, particularly in Renaissance and modern esoteric traditions.",
  },
  {
    id: "cornucopia",
    name: "Cornucopia",
    traditions: ["Greek", "Roman"],
    type: "Object",
    meanings: ["Abundance", "Fertility", "Fortune"],
    historical:
      "A goat's horn overflowing with fruit, grain, and flowers. In myth, the horn of Amalthea — the goat who nursed Zeus — became an inexhaustible source of abundance. Widely used in Hellenistic and Roman art as an attribute of Tyche/Fortuna, Demeter/Ceres, and personifications of plenty.",
    meaning:
      "Overflowing material abundance; divine favor expressed through the generosity of the earth.",
    aliases: ["Horn of plenty", "Horn of Amalthea"],
  },
  {
    id: "thyrsus",
    name: "Thyrsus",
    traditions: ["Greek", "Roman"],
    type: "Object",
    meanings: ["Power", "Transformation", "Rebirth"],
    historical:
      "A staff of giant fennel topped with a pine cone, carried by Dionysus and his followers (maenads, satyrs). Attested in vase paintings from the 6th century BCE onward.",
    meaning:
      "The weapon and emblem of Dionysus — outwardly a harmless plant stalk, said to conceal a spear. Represents the intoxicating, boundary-dissolving power of the god.",
  },
  {
    id: "kantharos",
    name: "Kantharos",
    traditions: ["Greek"],
    type: "Object",
    meanings: ["Transformation", "Power", "Abundance"],
    historical:
      "A deep two-handled drinking cup with a high foot, the specific vessel of Dionysus. Consistently depicted as his attribute in vase painting and sculpture from the archaic period onward.",
    meaning:
      "The cup of divine wine — the vessel of transformation through intoxication. By extension, any vessel that contains a power beyond ordinary substance.",
  },
  {
    id: "caduceus",
    name: "Caduceus",
    traditions: ["Greek", "Roman"],
    type: "Object",
    meanings: ["Balance", "Journey", "Transformation"],
    historical:
      "The staff (kerykeion) carried by Hermes as the herald of the gods. Depicted as a short rod with two intertwined serpents and, in later representations, wings at the top. Used as a symbol of heralds and envoys.",
    meaning:
      "Safe conduct and inviolability of messengers. The two serpents represent opposing forces held in balance. In Renaissance and later alchemy, reinterpreted as a symbol of medicine — incorrectly; the medical symbol is the rod of Asclepius.",
    also: "Frequently confused in modern usage with the rod of Asclepius, which has a single serpent and no wings.",
  },
  {
    id: "rod-of-asclepius",
    name: "Rod of Asclepius",
    traditions: ["Greek"],
    type: "Object",
    meanings: ["Healing", "Rebirth", "Wisdom"],
    historical:
      "A rough staff with a single serpent coiled around it, the attribute of Asclepius, god of medicine. The serpent's skin-shedding was associated with renewal and healing. The symbol of the World Health Organization and most medical institutions.",
    meaning:
      "Healing, medical authority, and the renewal of the body. The serpent links medicine to the chthonic and regenerative aspects of nature.",
    also: "Consistently confused with the caduceus of Hermes (two serpents, wings) in commercial and American military medical insignia.",
  },
  {
    id: "aegis",
    name: "Aegis",
    traditions: ["Greek"],
    type: "Protective",
    meanings: ["Protection", "Power", "Authority"],
    historical:
      "Described in Homer as a divine object wielded by Zeus and lent to Athena — a fringed cloak or shield that, when shaken, produced storms and panic. In visual tradition, it becomes a tasseled garment with a central Gorgoneion worn by Athena.",
    meaning:
      "Absolute divine protection. To be 'under someone's aegis' derives directly from this image of the terror-inspiring divine shield.",
  },
  {
    id: "thunderbolt",
    name: "Thunderbolt",
    glyph: "⚡",
    traditions: ["Greek", "Roman"],
    type: "Object",
    meanings: ["Authority", "Power", "Order"],
    historical:
      "The keraunos — Zeus's primary weapon and attribute, depicted as a winged or flaming bolt. Appears on coins, temples, and in sculpture as the mark of supreme divine authority. Roman Jupiter carried the fulmen, the same symbol.",
    meaning:
      "Absolute divine power and the enforcement of cosmic law. The instrument that punishes hubris and marks the limit of mortal presumption.",
    aliases: ["Keraunos", "Fulmen"],
  },
  {
    id: "trident",
    name: "Trident",
    traditions: ["Greek", "Roman"],
    type: "Object",
    meanings: ["Authority", "Power", "Fortune"],
    historical:
      "The triaina — the three-pronged weapon and primary attribute of Poseidon/Neptune. Depicted in coins, sculpture, and mosaics from the classical period onward. Also the attribute of Britannia and various sea-gods in later traditions.",
    meaning:
      "Sovereignty over the sea and the power to shatter rock, raise storms, and cause earthquakes (Poseidon was also the Earth-shaker).",
  },
  {
    id: "lyre",
    name: "Lyre",
    traditions: ["Greek"],
    type: "Object",
    meanings: ["Order", "Wisdom", "Knowledge"],
    historical:
      "The chelys (tortoise-shell lyre) invented by Hermes and given to Apollo. The primary attribute of Apollo and the Muses in Greek art. Also associated with Orpheus, whose playing could move stones and charm the underworld.",
    meaning:
      "Divine order expressed through music — the harmony of the spheres made audible. The seven strings were associated with the seven known planets by later Pythagorean and Neoplatonic writers.",
  },
  {
    id: "laurel",
    name: "Laurel",
    traditions: ["Greek", "Roman"],
    type: "Botanical",
    meanings: ["Victory", "Fortune", "Knowledge"],
    historical:
      "Sacred to Apollo — the nymph Daphne was transformed into a laurel tree to escape him, and he adopted the plant as his own. Laurel crowns (stephanoi) were awarded at the Pythian games and later became Roman imperial insignia.",
    meaning:
      "Victory, poetic achievement, and divine favor. The Roman laurel wreath of triumph became the enduring Western emblem of mastery in any field.",
    aliases: ["Bay laurel", "Daphne"],
  },
  {
    id: "olive",
    name: "Olive Branch",
    traditions: ["Greek", "Roman"],
    type: "Botanical",
    meanings: ["Fortune", "Protection", "Balance"],
    historical:
      "Athena's gift in her contest with Poseidon for Athens — she struck the Acropolis and produced the first olive tree. Olive wreaths crowned Olympic victors. The olive branch as a peace symbol is attested in ancient sources and widely used in Greco-Roman visual culture.",
    meaning:
      "Peace, prosperity, and the civilizing gifts of agriculture over warfare. Athena's emblem as much as the owl.",
  },
  {
    id: "pentagram",
    name: "Pentagram",
    glyph: "⛤",
    traditions: ["Greek"],
    type: "Geometric",
    meanings: ["Protection", "Wisdom", "Balance"],
    historical:
      "Used as a symbol by the Pythagoreans (c. 5th century BCE), who called it the hygieia (health) and used it as a recognition sign among members. The five vertices were associated with the five letters of the word ΥΓΙΕΙΑ. Appears on Greek coins and architecture.",
    meaning:
      "In Pythagorean use, health and the harmonious proportions of the human body. Later Western esoteric traditions (medieval and Renaissance) added elemental and protective interpretations that are not Greek.",
    also: "The pentacle — a pentagram within a circle — has a distinct later history in medieval and early modern ritual magic.",
  },

  // ── Egyptian ───────────────────────────────────────────────────────────────

  {
    id: "ankh",
    name: "Ankh",
    glyph: "☥",
    traditions: ["Egyptian"],
    type: "Composite",
    meanings: ["Rebirth", "Protection", "Eternity"],
    historical:
      "One of the most common hieroglyphic symbols, attested from the Early Dynastic period (c. 3100 BCE). Carried by gods and pharaohs, often held to the nose to give the 'breath of life.' Appears on temple reliefs, amulets, and tomb objects throughout three millennia of Egyptian history.",
    meaning:
      "Life and immortality. The exact origin of the form is debated — hypotheses include a sandal strap, a mirror, or a combination of male and female symbols. Its meaning of life is not in doubt.",
    aliases: ["Key of life", "Crux ansata"],
  },
  {
    id: "eye-of-ra",
    name: "Eye of Ra",
    traditions: ["Egyptian"],
    type: "Composite",
    meanings: ["Authority", "Power", "Death"],
    historical:
      "The right eye of Ra, the sun god, personified as a goddess in her own right (sometimes Hathor, Sekhmet, or Tefnut depending on context). The Eye could be sent out independently and was considered the active, destructive aspect of the sun's power.",
    meaning:
      "Royal authority, the destructive heat of the midday sun, and divine wrath. The Uraeus worn by pharaohs is a manifestation of this force.",
    also: "Distinct from the Eye of Horus (left eye, lunar, associated with healing and restoration). The two are frequently conflated in modern use.",
  },
  {
    id: "eye-of-horus",
    name: "Eye of Horus",
    glyph: "𓂀",
    traditions: ["Egyptian"],
    type: "Composite",
    meanings: ["Protection", "Healing", "Rebirth"],
    historical:
      "The wedjat — the eye injured by Set and restored by Thoth or Hathor, representing the restoration of what is lost. Extremely common as an amulet from the Middle Kingdom onward, placed among mummy wrappings for protection.",
    meaning:
      "Healing, restoration, and protection of the dead. The six parts of the wedjat were associated with the six senses in some texts.",
    aliases: ["Wedjat", "Udjat", "Wadjet eye"],
    also: "Distinct from the Eye of Ra (right eye, solar, destructive force). The two are often conflated despite representing opposite qualities.",
  },
  {
    id: "djed",
    name: "Djed Pillar",
    traditions: ["Egyptian"],
    type: "Object",
    meanings: ["Power", "Rebirth", "Eternity"],
    historical:
      "A pillar with horizontal bands at the top, one of the oldest Egyptian symbols. Associated with Osiris — possibly representing his spine. A major ritual called the 'raising of the djed' was performed during festivals, enacting the resurrection of Osiris.",
    meaning:
      "Stability, endurance, and resurrection. The djed's raising symbolized Osiris's victory over death and the renewal of the king's power.",
  },
  {
    id: "ankh-djed-was",
    name: "Ankh · Djed · Was",
    traditions: ["Egyptian"],
    type: "Composite",
    meanings: ["Power", "Rebirth", "Authority"],
    historical:
      "Three symbols frequently grouped together in Egyptian art and inscriptions as a formulaic triad, appearing on amulets, temple walls, and royal objects throughout the New Kingdom and later periods.",
    meaning:
      "Life (ankh), stability (djed), and power/dominion (was-sceptre) — a complete expression of divine and royal blessing. An example of Egyptian symbols forming a compound vocabulary rather than isolated logos.",
  },
  {
    id: "uraeus",
    name: "Uraeus",
    traditions: ["Egyptian"],
    type: "Animal",
    meanings: ["Authority", "Protection", "Power"],
    historical:
      "The rearing cobra worn on the brow of the pharaoh's crown and depicted on many deities. Attested from the Early Dynastic period. Associated with the goddess Wadjet of Lower Egypt and with the Eye of Ra.",
    meaning:
      "Royal authority and divine protection — the cobra that spits fire at the enemies of the pharaoh. Its presence on a crown marks the wearer as sanctioned by the gods.",
  },
  {
    id: "scarab",
    name: "Scarab",
    traditions: ["Egyptian"],
    type: "Animal",
    meanings: ["Rebirth", "Fortune", "Protection"],
    historical:
      "The dung beetle (Scarabaeus sacer), observed rolling a ball of dung across the ground, was likened to the sun god Khepri pushing the sun across the sky. Scarab amulets are among the most common objects in Egyptian archaeology, found as funerary amulets, seals, and votive offerings from c. 2000 BCE onward.",
    meaning:
      "Self-creation, resurrection, and the daily renewal of the sun. The word kheper means both 'scarab' and 'to come into being.'",
  },
  {
    id: "shen",
    name: "Shen Ring",
    glyph: "𓍶",
    traditions: ["Egyptian"],
    type: "Geometric",
    meanings: ["Eternity", "Protection", "Authority"],
    historical:
      "A loop of rope with a horizontal line at the base, representing a circle of rope with no beginning or end. Held by protective deities such as Horus and Nekhbet, and carried by Heh, the personification of eternity. Royal cartouches are an elongated form of the shen.",
    meaning:
      "Eternal protection and infinity. Everything enclosed within a shen is protected forever.",
    aliases: ["Cartouche (elongated form)"],
  },
  {
    id: "tyet",
    name: "Tyet",
    traditions: ["Egyptian"],
    type: "Composite",
    meanings: ["Protection", "Rebirth", "Fertility"],
    historical:
      "An amulet resembling an ankh with drooping side loops, associated with the goddess Isis. Known from the Old Kingdom but most common in funerary contexts of the New Kingdom. The Book of the Dead specifies it should be made of red jasper.",
    meaning:
      "The protection of Isis, specifically her blood and the power of her magical knot. Often paired with the djed pillar of Osiris.",
    aliases: ["Isis knot", "Blood of Isis", "Knot of Isis"],
  },
  {
    id: "crook-and-flail",
    name: "Crook and Flail",
    traditions: ["Egyptian"],
    type: "Object",
    meanings: ["Authority", "Power", "Order"],
    historical:
      "The heqa (crook) and nekhakha (flail) were the two most important symbols of pharaonic power, held crossed over the chest. Associated with Osiris as ruler of the dead and with the pharaoh as his living representative. Attested from the Early Dynastic period.",
    meaning:
      "Royal and divine sovereignty — the shepherd's crook governing the people, the flail enforcing authority. Together they represent the two aspects of kingship: guidance and discipline.",
    aliases: ["Heqa and nekhakha"],
  },
  {
    id: "feather-of-maat",
    name: "Feather of Ma'at",
    traditions: ["Egyptian"],
    type: "Object",
    meanings: ["Order", "Balance", "Wisdom"],
    historical:
      "A single ostrich feather, the attribute of the goddess Ma'at, personification of truth, cosmic order, and justice. In the Weighing of the Heart ceremony (Book of the Dead), the deceased's heart was placed on a scale against this feather. Attested from the Old Kingdom.",
    meaning:
      "Truth, justice, and cosmic order. A heart lighter than the feather passed into paradise; a heavier heart was devoured by Ammit.",
    aliases: ["Ma'at's feather", "Ostrich feather of truth"],
  },
  {
    id: "was-sceptre",
    name: "Was Sceptre",
    traditions: ["Egyptian"],
    type: "Object",
    meanings: ["Authority", "Power", "Order"],
    historical:
      "A staff with an animal head at the top (possibly a Set-animal) and a forked base. Carried by gods and pharaohs in relief and sculpture throughout Egyptian history. The word was means 'power' or 'dominion.'",
    meaning:
      "Divine power and the dominion of gods over chaos. The forked base represents the creature subdued underfoot.",
  },
  {
    id: "ouroboros",
    name: "Ouroboros",
    traditions: ["Egyptian", "Greek", "Alchemical"],
    type: "Animal",
    meanings: ["Rebirth", "Time", "Eternity"],
    historical:
      "The earliest known depiction is in the Egyptian Amduat (c. 1600 BCE), where a serpent biting its own tail encircles the solar barque. The image was adopted into Greek magical papyri and Gnostic cosmology, then became central to alchemical illustration from the medieval period.",
    meaning:
      "The eternal return — destruction and creation as a single continuous process. In alchemy, it became the emblem of the prima materia and the cyclical nature of the Great Work.",
  },
  {
    id: "phoenix",
    name: "Phoenix",
    traditions: ["Egyptian", "Greek"],
    type: "Animal",
    meanings: ["Rebirth", "Transformation", "Time"],
    historical:
      "The Egyptian Bennu — a heron sacred to Ra and Osiris, associated with the primordial mound at Heliopolis. Greek writers, including Herodotus, described a similar bird visiting Heliopolis every 500 years to bury its father. The Roman period elaborated the burning-and-rising legend.",
    meaning:
      "Cyclical renewal — the sun that dies at night and is reborn at dawn, projected onto a mythic creature whose life-span equals a great cosmic cycle.",
    also: "The burning-and-rising narrative is largely a Greco-Roman elaboration; the Egyptian Bennu was primarily a solar bird, not a creature of fire.",
  },

  // ── Norse / Icelandic ──────────────────────────────────────────────────────

  {
    id: "valknut",
    name: "Valknut",
    traditions: ["Norse"],
    type: "Geometric",
    meanings: ["Death", "Power", "Journey"],
    historical:
      "Three interlocked triangles appearing on several Norse artifacts — most notably the Stora Hammar stone (Gotland, c. 7th–8th century CE) in scenes of sacrifice and battle. The name 'valknut' is modern; the original Norse name is unknown.",
    meaning:
      "Conventionally interpreted as associated with Odin and the slain in battle. The exact ancient meaning is not documented in textual sources — the symbol is identified only from archaeological context.",
    also: "The modern 'valknut' name and its common interpretation as 'knot of the slain' are scholarly conventions, not attested in period sources.",
  },
  {
    id: "yggdrasil",
    name: "Yggdrasil",
    traditions: ["Norse"],
    type: "Botanical",
    meanings: ["Journey", "Knowledge", "Order"],
    historical:
      "The great ash tree at the cosmological center of Norse mythology, described in the Prose Edda (Snorri Sturluson, c. 1220 CE) and the Poetic Edda. Its roots reach Asgard, Jotunheim, and Niflheim; the eagle, serpent Níðhöggr, and squirrel Ratatoskr inhabit it.",
    meaning:
      "The world axis (axis mundi) — the structure that connects and supports all realms of existence. Odin hung on it for nine nights to win the knowledge of the runes.",
    aliases: ["World Tree", "World Ash"],
  },
  {
    id: "vegvisir",
    name: "Vegvísir",
    traditions: ["Icelandic"],
    type: "Protective",
    meanings: ["Journey", "Protection", "Wisdom"],
    historical:
      "A magical stave appearing in the Huld Manuscript (Iceland, c. 1847 CE), not in Viking Age sources. The manuscript states it ensures the bearer will not lose their way. It belongs to the Icelandic post-Reformation magical tradition, not the Viking Age.",
    meaning:
      "Navigational protection — the bearer will find their way home through storms and unfamiliar land.",
    also: "Widely misrepresented as a 'Viking compass' or ancient Norse symbol. It is attested only in 19th-century Icelandic manuscripts.",
    aliases: ["Icelandic compass"],
  },
  {
    id: "aegishjalmur",
    name: "Ægishjálmur",
    traditions: ["Icelandic"],
    type: "Protective",
    meanings: ["Protection", "Power", "Authority"],
    historical:
      "The 'helm of awe' — mentioned in the Völsunga saga and Eddic poetry as a magical object causing fear in enemies, but the familiar radial eight-armed stave design appears in Icelandic grimoires of the 16th–19th century CE, not in Viking Age archaeological finds.",
    meaning:
      "Instilling terror in enemies and protecting the wearer from harm. The literary concept predates the visual form by several centuries.",
    aliases: ["Helm of Awe"],
    also: "The concept exists in Old Norse literature; the specific radial magical stave is a later Icelandic grimoire tradition.",
  },
  {
    id: "triquetra",
    name: "Triquetra",
    traditions: ["Celtic", "Norse"],
    type: "Geometric",
    meanings: ["Rebirth", "Time", "Protection"],
    historical:
      "A three-cornered interlaced design appearing in Insular Celtic art (Book of Kells, c. 800 CE) and on Norse rune stones. The form occurs widely as an ornamental motif. Its original symbolic intent in each context is debated by scholars.",
    meaning:
      "The grouping of three has various attributions — earth/sea/sky, past/present/future, the Christian Trinity — but no single meaning is universally attested. The symbol predates most of these interpretations.",
    aliases: ["Trinity knot"],
  },

  // ── Mesopotamian ───────────────────────────────────────────────────────────

  {
    id: "rod-and-ring",
    name: "Rod and Ring",
    traditions: ["Mesopotamian"],
    type: "Object",
    meanings: ["Authority", "Order", "Wisdom"],
    historical:
      "A measuring rod and coiled rope (or ring) held by gods — most famously in the stele of Hammurabi (c. 1754 BCE) where the sun god Shamash presents them to the king. Appears across Akkadian, Babylonian, and Assyrian art from c. 2100 BCE onward.",
    meaning:
      "Divine authority over just measurement — the rod marks the standard; the ring represents completion and perfection. Together, the divine grant of righteous kingship.",
  },
  {
    id: "star-of-ishtar",
    name: "Star of Ishtar",
    traditions: ["Mesopotamian"],
    type: "Celestial",
    meanings: ["Power", "Fertility", "Duality"],
    historical:
      "An eight-pointed star, the primary symbol of Inanna/Ishtar, goddess of love and war, attested on Akkadian cylinder seals and Neo-Assyrian palace reliefs. The eight points correspond to Venus's synodic cycle of eight years.",
    meaning:
      "The dual nature of Ishtar — goddess of erotic love and of warfare, the morning and evening star, descent and return. The number eight encodes the Venus cycle.",
    aliases: ["Star of Inanna", "Octagram"],
  },
  {
    id: "winged-sun",
    name: "Winged Sun",
    traditions: ["Mesopotamian", "Egyptian"],
    type: "Celestial",
    meanings: ["Authority", "Protection", "Power"],
    historical:
      "A sun disk flanked by wings, attested in Egyptian art from the Old Kingdom (c. 2500 BCE) and independently in Mesopotamian and later Achaemenid Persian art. In Egypt it represents Behedety (a form of Horus) and was placed above temple doorways as protection.",
    meaning:
      "Divine solar power in motion — the sun that traverses the sky, protects the king, and overcomes enemies. One of the most persistent symbols of divine royalty across the ancient Near East.",
    aliases: ["Winged disk"],
  },
  {
    id: "lamassu",
    name: "Lamassu",
    traditions: ["Mesopotamian"],
    type: "Anthropomorphic",
    meanings: ["Protection", "Power", "Wisdom"],
    historical:
      "A composite figure — human head, bull or lion body, eagle wings — placed as colossal guardian figures at the entrances to Assyrian palaces (9th–7th century BCE, Nineveh, Nimrud, Khorsabad). Earlier depictions in relief appear in Akkadian and Sumerian art.",
    meaning:
      "The guardian of the threshold — the combination of the strongest (bull/lion), most mobile (eagle), and most intelligent (human) beings as composite protection. Also a personal protective spirit (šēdu/lamassu) in Mesopotamian religion.",
    aliases: ["Shedu", "Alad"],
  },
  {
    id: "rosette",
    name: "Rosette",
    traditions: ["Mesopotamian", "Greek", "Roman"],
    type: "Geometric",
    meanings: ["Abundance", "Fertility", "Fortune"],
    historical:
      "A six- or eight-petaled floral motif appearing on Mesopotamian cylinder seals from the Uruk period (c. 3500 BCE), associated with Inanna/Ishtar. Later widespread in Assyrian palace decoration, then across Greek and Roman architectural ornament.",
    meaning:
      "In Mesopotamian use, a symbol of Ishtar and divine favor. In later Greco-Roman architecture, an ornamental emblem of abundance and celestial harmony.",
  },

  // ── Cross-traditional ──────────────────────────────────────────────────────

  {
    id: "serpent",
    name: "Serpent",
    traditions: ["Greek", "Egyptian", "Norse", "Mesopotamian"],
    type: "Animal",
    meanings: ["Transformation", "Wisdom", "Duality"],
    historical:
      "One of the most consistently deployed symbols across ancient cultures, each with distinct use: the Greek Agathos Daimon (household serpent); the Egyptian Uraeus and Apep; the Norse Níðhöggr gnawing at Yggdrasil's root; the Mesopotamian serpent of Ningishzida.",
    meaning:
      "The serpent's shed skin generates associations with renewal; its venom with death. These two poles appear consistently across traditions, though the specific mythic role varies greatly.",
    also: "Appears specifically as the caduceus (Hermes), rod of Asclepius (medicine), Uraeus (Egyptian kingship), and Ouroboros (eternity). Each is a distinct symbol rather than a generic 'serpent.'",
  },
  {
    id: "bull",
    name: "Bull",
    traditions: ["Greek", "Egyptian", "Mesopotamian"],
    type: "Animal",
    meanings: ["Power", "Fertility", "Authority"],
    historical:
      "The bull as a sacred animal and symbol of divine power is attested across the ancient world: the Apis bull of Memphis (Egypt), the bull-leaping frescoes of Minoan Crete, the celestial Bull of Heaven in the Epic of Gilgamesh, Zeus taking the form of a bull to abduct Europa.",
    meaning:
      "Raw physical strength, virile generative force, and the power of the sky-god made animal. In many traditions, the sacrifice of a bull transfers its power to the god or king.",
  },
  {
    id: "eagle",
    name: "Eagle",
    traditions: ["Greek", "Roman", "Mesopotamian"],
    type: "Animal",
    meanings: ["Authority", "Power", "Wisdom"],
    historical:
      "The eagle as attribute of the highest sky-god: Zeus (Greek), Jupiter (Roman aquila standard), the Anzu bird (Mesopotamian). The eagle standard of Roman legions was a sacred object — its loss in battle was a catastrophe requiring ritual response.",
    meaning:
      "Sovereign vision — the ability to see the whole from above, and divine authority over the earthly realm. The bird closest to the sun.",
  },
  {
    id: "scales",
    name: "Scales",
    glyph: "⚖",
    traditions: ["Egyptian", "Greek", "Mesopotamian"],
    type: "Object",
    meanings: ["Balance", "Order", "Death"],
    historical:
      "The weighing of the dead against a standard of truth appears in Egyptian religion (heart vs. feather of Ma'at, Book of the Dead) and in Mesopotamian texts. In Greek tradition, Zeus holds the scales of fate (kērostasia) at pivotal moments in the Iliad.",
    meaning:
      "Judgment without appeal — the impartial measure that determines fate after death. The enduring Western emblem of justice derives directly from these traditions.",
    aliases: ["Balance", "Kērostasia"],
  },

  // ── Alchemical ─────────────────────────────────────────────────────────────

  {
    id: "philosophers-stone",
    name: "Philosopher's Stone",
    traditions: ["Alchemical"],
    type: "Object",
    meanings: ["Transformation", "Wisdom", "Rebirth"],
    historical:
      "A central concept in Western alchemy from at least the 9th century CE (Jabir ibn Hayyan) through the 17th century. Not typically depicted as a specific visual symbol — more a theoretical substance described in texts.",
    meaning:
      "The perfected matter that transmutes base metals to gold and confers immortality. In Jungian and later psychological reading, a metaphor for the integrated self — but this is a 20th-century interpretation.",
    aliases: ["Lapis philosophorum"],
  },
  {
    id: "three-primes",
    name: "Sulphur · Mercury · Salt",
    traditions: ["Alchemical"],
    type: "Composite",
    meanings: ["Transformation", "Duality", "Balance"],
    historical:
      "The Tria Prima — three principles proposed by Paracelsus (c. 1530 CE) to replace the classical four elements as the basis of matter. Each has a distinct alchemical glyph: Sulphur (△ with cross), Mercury (☿), Salt (⊕ or a circle bisected).",
    meaning:
      "Soul (Sulphur), spirit (Mercury), and body (Salt) — the tripartite structure underlying all material substances and, by extension, the human being.",
    aliases: ["Tria Prima"],
  },
  {
    id: "solve-et-coagula",
    name: "Solve et Coagula",
    traditions: ["Alchemical"],
    type: "Composite",
    meanings: ["Transformation", "Duality", "Order"],
    historical:
      "A Latin maxim central to alchemical procedure: dissolve (solve) the fixed substance into its constituents, then coagulate (coagula) them into a purified form. Appears consistently in alchemical texts from the medieval period through the 17th century.",
    meaning:
      "The fundamental rhythm of transformation — nothing is refined without first being broken down. Applied metaphorically to spiritual and psychological transformation in Hermetic and Rosicrucian traditions.",
  },
  {
    id: "rebis",
    name: "Rebis",
    traditions: ["Alchemical"],
    type: "Anthropomorphic",
    meanings: ["Duality", "Transformation", "Balance"],
    historical:
      "A figure in alchemical illustration depicting a two-headed (male and female, solar and lunar) hermaphroditic being. Appears in major illustrated alchemical texts of the 16th–17th centuries (Rosarium Philosophorum, 1550; Symbola Aureae Mensae, 1617).",
    meaning:
      "The conjunctio — the union of opposing principles (sun/moon, sulphur/mercury, king/queen) that produces the philosopher's stone. The visual argument that perfection requires reconciling opposites.",
    aliases: ["Double thing", "Hermaphrodite (alchemical)"],
  },

];

// ── Deduplication guard ─────────────────────────────────────────────────────
const _seen = new Set<string>();
export const UNIQUE_SYMBOLS: OddessiSymbol[] = SYMBOLS.filter((s) => {
  if (_seen.has(s.id)) return false;
  _seen.add(s.id);
  return true;
});
