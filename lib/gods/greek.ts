/**
 * Greek deities data for the /gods/greek reference grid.
 *
 * Organized into four groups to support recognition over lookup:
 *   Primordials → Titans → Olympians → Other Gods & Personifications
 *
 * Each entry carries only what fits on a card: name, epithets, Roman
 * equivalent, a one-line definition, and symbols (max 4).
 * Nothing encyclopedic — the goal is pattern recognition.
 *
 * On sigils: the field has been deliberately omitted. Greek deities do not
 * have historically attested personal sigils in the way alchemical or
 * astrological symbols do. The planetary glyphs (♃ ♆ ♄ etc.) belong to
 * astronomical tradition, not mythology proper, and mixing them here would
 * blur a distinction Oddessi needs to keep clean. Symbols and iconography
 * will be studied separately.
 *
 * On Eros: he appears twice. The primordial Eros (Hesiod) is a cosmogonic
 * force; the Olympian-era Eros (son of Aphrodite) is a playful love god.
 * The duplication is intentional — it reflects a genuine development in
 * Greek theological thought, not a data error.
 */

export interface GreekGod {
  name: string;
  /** 2–3 short thematic keywords */
  epithets: string[];
  /** Roman counterpart, if one exists */
  roman?: string;
  /** Single-sentence definition */
  definition: string;
  /** Up to 4 symbols or attributes */
  symbols: string[];
}

export interface GreekGroup {
  id: string;
  label: string;
  description: string;
  gods: GreekGod[];
}

export const GREEK_GROUPS: GreekGroup[] = [
  {
    id: "primordials",
    label: "Primordials",
    description: "The first beings — not born but emerged from the void.",
    gods: [
      {
        name: "Chaos",
        epithets: ["Void", "Origin", "Abyss"],
        definition: "The formless void from which all existence first emerged.",
        symbols: ["Void", "Darkness", "Infinite space"],
      },
      {
        name: "Gaia",
        epithets: ["Earth", "Mother", "Foundation"],
        roman: "Terra",
        definition:
          "The primordial earth goddess, mother of the sky, sea, and all life.",
        symbols: ["Earth", "Cornucopia", "Mountains"],
      },
      {
        name: "Ouranos",
        epithets: ["Sky", "Heaven", "Stars"],
        roman: "Caelus",
        definition:
          "The primordial sky, father of the Titans, whose castration by Cronus ended the first age.",
        symbols: ["Starry sky", "Sickle", "Heavens"],
      },
      {
        name: "Nyx",
        epithets: ["Night", "Shadow", "Mystery"],
        definition:
          "The goddess of night, ancient even among the Olympians, mother of sleep and death.",
        symbols: ["Stars", "Dark wings", "Veil"],
      },
      {
        name: "Erebus",
        epithets: ["Darkness", "Underworld", "Gloom"],
        definition:
          "The deep darkness that fills the underworld and the space between earth and sky.",
        symbols: ["Darkness", "Shadow"],
      },
      {
        name: "Eros",
        epithets: ["Desire", "Attraction", "Cosmos"],
        definition:
          "In Hesiod's cosmogony, the primordial force of attraction that binds the cosmos together — older than the gods.",
        symbols: ["Wings", "Arrow", "Cosmic bond"],
      },
      {
        name: "Pontus",
        epithets: ["Sea", "Deep", "Water"],
        definition:
          "The primordial sea, one of the first children of Gaia, father of sea gods and monsters.",
        symbols: ["Waves", "Sea serpents"],
      },
      {
        name: "Tartarus",
        epithets: ["Abyss", "Pit", "Punishment"],
        definition:
          "The deep abyss beneath the underworld, used as a dungeon for the Titans after their defeat.",
        symbols: ["Chains", "Abyss", "Pit"],
      },
    ],
  },
  {
    id: "titans",
    label: "Titans",
    description: "The elder gods who ruled before the Olympians.",
    gods: [
      {
        name: "Cronus",
        epithets: ["Harvest", "Agriculture", "Ruler"],
        roman: "Saturn",
        definition:
          "King of the Titans and ruler of the Golden Age, who swallowed his children to prevent his overthrow.",
        symbols: ["Sickle", "Grain", "Harvest scythe"],
      },
      {
        name: "Rhea",
        epithets: ["Motherhood", "Earth", "Flow"],
        roman: "Ops",
        definition:
          "Mother of the Olympians, who saved Zeus by hiding him from Cronus and substituting a stone.",
        symbols: ["Drum", "Lions", "Crown"],
      },
      {
        name: "Prometheus",
        epithets: ["Fire", "Foresight", "Craft"],
        definition:
          "The Titan who stole fire from the gods and gave it to humanity, enduring eternal punishment for it.",
        symbols: ["Torch", "Fire", "Eagle", "Chains"],
      },
      {
        name: "Epimetheus",
        epithets: ["Hindsight", "Impulsiveness"],
        definition:
          "Brother of Prometheus whose thoughtless distribution of gifts left humanity without natural defenses.",
        symbols: ["Jar", "Animals"],
      },
      {
        name: "Atlas",
        epithets: ["Endurance", "Strength", "Burden"],
        definition:
          "The Titan condemned to hold up the heavens on his shoulders for eternity.",
        symbols: ["Globe", "Sky", "Pillars"],
      },
      {
        name: "Oceanus",
        epithets: ["River", "Ocean", "Boundary"],
        definition:
          "The Titan who personifies the great world-ocean encircling the earth.",
        symbols: ["Waves", "Serpent tail", "Bull horns"],
      },
      {
        name: "Tethys",
        epithets: ["Sea", "Nurture", "Rivers"],
        definition:
          "Titaness of the sea and mother of all rivers and ocean nymphs.",
        symbols: ["Waves", "Fish", "Wings on forehead"],
      },
      {
        name: "Hyperion",
        epithets: ["Light", "Observation", "Heights"],
        definition:
          "Titan of heavenly light and observation, father of Helios, Selene, and Eos.",
        symbols: ["Sun", "Light", "Torch"],
      },
      {
        name: "Theia",
        epithets: ["Sight", "Gold", "Brilliance"],
        definition:
          "Titaness of sight and the shining light of the sky, mother of the sun, moon, and dawn.",
        symbols: ["Gold", "Eye", "Radiance"],
      },
      {
        name: "Mnemosyne",
        epithets: ["Memory", "Time", "Language"],
        definition:
          "Titaness of memory and language, mother of the nine Muses.",
        symbols: ["Scroll", "Waters of memory"],
      },
      {
        name: "Themis",
        epithets: ["Law", "Order", "Prophecy"],
        roman: "Justitia",
        definition:
          "Titaness of divine law and natural order, second consort of Zeus and mother of the Fates and Seasons.",
        symbols: ["Scales", "Cornucopia", "Laurel"],
      },
      {
        name: "Coeus",
        epithets: ["Intellect", "Axis", "Query"],
        definition:
          "Titan of the inquisitive mind and the north celestial pole.",
        symbols: ["Celestial sphere"],
      },
      {
        name: "Phoebe",
        epithets: ["Moon", "Prophecy", "Radiance"],
        definition:
          "Titaness of oracular intellect and radiance, grandmother of Apollo and Artemis.",
        symbols: ["Crescent moon", "Laurel"],
      },
      {
        name: "Crius",
        epithets: ["Stars", "Constellations", "Measure"],
        definition:
          "Titan of the heavenly constellations and the measure of the year.",
        symbols: ["Stars", "Ram"],
      },
      {
        name: "Iapetus",
        epithets: ["Mortality", "Craft", "Lifespan"],
        definition:
          "Titan of mortality and the mortal lifespan, father of Prometheus, Epimetheus, and Atlas.",
        symbols: ["Spear", "Mortal coil"],
      },
    ],
  },
  {
    id: "olympians",
    label: "Olympians",
    description: "The twelve sovereign gods of Mount Olympus.",
    gods: [
      {
        name: "Zeus",
        epithets: ["Sky", "Thunder", "Law"],
        roman: "Jupiter",
        definition:
          "King of the gods, ruler of Mount Olympus, wielder of thunder and arbiter of justice among immortals and mortals.",
        symbols: ["Thunderbolt", "Eagle", "Oak tree", "Scales"],
      },
      {
        name: "Hera",
        epithets: ["Marriage", "Queens", "Loyalty"],
        roman: "Juno",
        definition:
          "Queen of the gods, protector of marriage and women, known for the fierce jealousy she directed at Zeus's lovers.",
        symbols: ["Peacock", "Crown", "Pomegranate", "Cuckoo"],
      },
      {
        name: "Poseidon",
        epithets: ["Sea", "Earthquakes", "Horses"],
        roman: "Neptune",
        definition:
          "God of the sea, earthquakes, and storms, whose trident could shatter rock and raise new islands.",
        symbols: ["Trident", "Dolphin", "Horse", "Bull"],
      },
      {
        name: "Demeter",
        epithets: ["Harvest", "Agriculture", "Seasons"],
        roman: "Ceres",
        definition:
          "Goddess of the harvest whose grief for Persephone brings winter to the world each year.",
        symbols: ["Wheat", "Torch", "Cornucopia", "Poppy"],
      },
      {
        name: "Athena",
        epithets: ["Wisdom", "Strategy", "Craft"],
        roman: "Minerva",
        definition:
          "Goddess of strategic wisdom, warfare, and skilled craft, born fully-armed from Zeus's head.",
        symbols: ["Owl", "Olive tree", "Aegis", "Spear"],
      },
      {
        name: "Apollo",
        epithets: ["Prophecy", "Music", "Healing"],
        roman: "Apollo",
        definition:
          "God of prophecy, music, poetry, and healing — the ideal of ordered beauty and rational knowledge.",
        symbols: ["Lyre", "Laurel", "Bow", "Raven"],
      },
      {
        name: "Artemis",
        epithets: ["Hunt", "Wilderness", "Chastity"],
        roman: "Diana",
        definition:
          "Goddess of the hunt and wild places, fierce protector of women, young girls, and animals.",
        symbols: ["Bow", "Deer", "Cypress", "Crescent"],
      },
      {
        name: "Ares",
        epithets: ["War", "Courage", "Violence"],
        roman: "Mars",
        definition:
          "God of war and the savage, physical side of battle — feared and despised even by his own father Zeus.",
        symbols: ["Spear", "Shield", "Vulture", "Dog"],
      },
      {
        name: "Aphrodite",
        epithets: ["Love", "Beauty", "Desire"],
        roman: "Venus",
        definition:
          "Goddess of love, beauty, and desire, born from the sea-foam, whose power no god or mortal could resist.",
        symbols: ["Dove", "Rose", "Myrtle", "Scallop shell"],
      },
      {
        name: "Hephaestus",
        epithets: ["Fire", "Forge", "Craft"],
        roman: "Vulcan",
        definition:
          "God of fire and the forge, divine craftsman who built the palaces and weapons of the gods.",
        symbols: ["Hammer", "Anvil", "Tongs", "Fire"],
      },
      {
        name: "Hermes",
        epithets: ["Messenger", "Travel", "Commerce"],
        roman: "Mercury",
        definition:
          "Messenger of the gods, patron of travelers, thieves, and commerce, guide of souls to the underworld.",
        symbols: ["Caduceus", "Winged sandals", "Petasos", "Tortoise"],
      },
      {
        name: "Dionysus",
        epithets: ["Wine", "Ecstasy", "Theatre"],
        roman: "Bacchus",
        definition:
          "God of wine, festivity, and ritual madness, patron of theatre and the dissolution of ordinary boundaries.",
        symbols: ["Grapevine", "Thyrsus", "Panther", "Ivy"],
      },
    ],
  },
  {
    id: "others",
    label: "Other Gods & Personifications",
    description:
      "Gods of the underworld, lesser Olympians, and the forces that took divine form.",
    gods: [
      {
        name: "Hades",
        epithets: ["Underworld", "Death", "Wealth"],
        roman: "Pluto",
        definition:
          "Ruler of the underworld and all the dead, whose realm every mortal must eventually enter.",
        symbols: ["Cerberus", "Helm of darkness", "Cypress", "Narcissus"],
      },
      {
        name: "Hestia",
        epithets: ["Hearth", "Home", "Sacred fire"],
        roman: "Vesta",
        definition:
          "Goddess of the hearth and sacred flame, first-born of Cronus and the still center of every home.",
        symbols: ["Hearth", "Flame", "Kettle"],
      },
      {
        name: "Persephone",
        epithets: ["Spring", "Underworld", "Duality"],
        roman: "Proserpina",
        definition:
          "Queen of the underworld for half the year, goddess of spring's return for the other — the axis of the seasons.",
        symbols: ["Pomegranate", "Wheat", "Torch", "Narcissus"],
      },
      {
        name: "Hecate",
        epithets: ["Magic", "Crossroads", "Thresholds"],
        roman: "Trivia",
        definition:
          "Goddess of magic, witchcraft, and crossroads, who holds torches at the threshold between the living and the dead.",
        symbols: ["Torch", "Key", "Dog", "Serpent"],
      },
      {
        name: "Nike",
        epithets: ["Victory", "Speed", "Glory"],
        roman: "Victoria",
        definition:
          "The winged goddess of victory who crowns the triumphant with a laurel wreath.",
        symbols: ["Wings", "Laurel wreath", "Palm branch"],
      },
      {
        name: "Eos",
        epithets: ["Dawn", "Morning", "Renewal"],
        roman: "Aurora",
        definition:
          "Goddess of the dawn who opens the gates of heaven each morning to let the sun begin its journey.",
        symbols: ["Saffron robes", "Rose-tipped fingers", "Wings"],
      },
      {
        name: "Helios",
        epithets: ["Sun", "Light", "Sight"],
        roman: "Sol",
        definition:
          "The solar deity who drives a fiery chariot across the sky each day, seeing all that happens on earth.",
        symbols: ["Sun disk", "Chariot", "Rooster", "Globe"],
      },
      {
        name: "Selene",
        epithets: ["Moon", "Night", "Tides"],
        roman: "Luna",
        definition:
          "The lunar deity who drives her silver chariot across the night sky.",
        symbols: ["Crescent moon", "Silver chariot", "Bull horns"],
      },
      {
        name: "Tyche",
        epithets: ["Fortune", "Chance", "Fate"],
        roman: "Fortuna",
        definition:
          "The goddess of fortune and chance who steers the fate of cities and individuals with a rudder and a wheel.",
        symbols: ["Wheel", "Cornucopia", "Rudder", "Crown"],
      },
      {
        name: "Kairos",
        epithets: ["Opportunity", "Timing", "Moment"],
        definition:
          "The god of the fleeting opportune moment — the right time that, once past, cannot be recaptured.",
        symbols: ["Scales", "Razor", "Winged feet"],
      },
      {
        name: "Nemesis",
        epithets: ["Retribution", "Balance", "Justice"],
        roman: "Invidia",
        definition:
          "The goddess of retribution who ensures no mortal escapes the consequences of hubris or excessive pride.",
        symbols: ["Sword", "Scales", "Wheel", "Wings"],
      },
      {
        name: "Iris",
        epithets: ["Rainbow", "Messenger", "Bridges"],
        roman: "Iris",
        definition:
          "The goddess of the rainbow, swift messenger who bridges the realms of gods and mortals.",
        symbols: ["Rainbow", "Caduceus", "Wings"],
      },
      {
        name: "Hypnos",
        epithets: ["Sleep", "Dreams", "Rest"],
        roman: "Somnus",
        definition:
          "The god of sleep and twin of death, who lives in a cave by the river Lethe.",
        symbols: ["Poppy", "Wings", "Horn", "Branch"],
      },
      {
        name: "Thanatos",
        epithets: ["Death", "Peace", "Transition"],
        roman: "Mors",
        definition:
          "The god of peaceful death and twin of Hypnos, who gently carries the dying to the underworld.",
        symbols: ["Inverted torch", "Butterfly", "Dark wings"],
      },
      {
        name: "Pan",
        epithets: ["Wild", "Nature", "Panic"],
        roman: "Faunus",
        definition:
          "God of the wild, shepherds, and rustic music, whose sudden appearance in lonely places inspired wordless terror.",
        symbols: ["Pan flute", "Goat legs", "Pine wreath", "Staff"],
      },
      {
        name: "Eros",
        epithets: ["Love", "Desire", "Youth"],
        roman: "Cupid",
        definition:
          "In later tradition, the playful winged son of Aphrodite whose arrows strike gods and mortals with uncontrollable desire.",
        symbols: ["Bow", "Arrow", "Wings", "Torch"],
      },
      {
        name: "Asclepius",
        epithets: ["Healing", "Medicine", "Rebirth"],
        roman: "Aesculapius",
        definition:
          "The god of medicine and healing, son of Apollo, whose skill was so great he could raise the dead.",
        symbols: ["Rod of Asclepius", "Serpent", "Staff"],
      },
      {
        name: "Morpheus",
        epithets: ["Dreams", "Form", "Illusion"],
        roman: "Morpheus",
        definition:
          "The god of dreams who shapes the visions that visit sleeping mortals in the night.",
        symbols: ["Poppy", "Wings", "Horn of sleep"],
      },
      {
        name: "Proteus",
        epithets: ["Change", "Prophecy", "Sea"],
        definition:
          "The shape-shifting sea god who holds prophetic knowledge but eludes those who seek it.",
        symbols: ["Waves", "Shifting forms"],
      },
      {
        name: "Eris",
        epithets: ["Discord", "Strife", "Chaos"],
        roman: "Discordia",
        definition:
          "The goddess of discord whose golden apple of contention set the gods against each other and ignited the Trojan War.",
        symbols: ["Golden apple", "Torch", "Sword"],
      },
      {
        name: "Phobos",
        epithets: ["Fear", "Dread", "Rout"],
        roman: "Timor",
        definition:
          "The personification of fear and panic in battle, son of Ares, who accompanies his father into every conflict.",
        symbols: ["Lion head", "Shield"],
      },
      {
        name: "Deimos",
        epithets: ["Terror", "Dread", "Warfare"],
        roman: "Metus",
        definition:
          "The personification of battlefield dread, brother of Phobos, who saps the courage of those who face him.",
        symbols: ["Sword", "Torch"],
      },
    ],
  },
];
