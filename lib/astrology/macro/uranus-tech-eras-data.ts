// lib/astrology/macro/uranus-tech-eras-data.ts

import { SIGNS } from "./zodiac-framework-data";

export type TechEraStatus = "completed" | "active" | "upcoming";

export type TechEvent = {
  year: string;
  name: string;
  significance: string;
};

export type TechEraData = {
  id: string;
  sign: string;
  symbol: string;
  element: "earth" | "air" | "water" | "fire";
  timeframe: string;
  startYear: number;
  endYear: number;
  status: TechEraStatus;

  // Timeline
  domain: string;
  paradigm: string;
  thesis: string;

  // Drawer
  before: string;
  after: string;
  interpretation: string;
  significance: string;
  earlySignal: { marker: string; reason: string }[] | null;
  transition: string;

  events: TechEvent[];
};

export const URANUS_TECH_ERAS: TechEraData[] = [
  {
    id: "libra-1968",
    sign: "Libra",
    symbol: "♎",
    element: "air",
    timeframe: "1968–1975",
    startYear: 1968,
    endYear: 1975,
    status: "completed",

    domain: SIGNS.libra.domain,
    paradigm: "Electronic connection",
    thesis: "Electronic networks disrupt how machines and people form connections.",

    before: "Isolated machines",
    after: "Connected machines",

    interpretation:
      "Uranus disrupts relationships. Computers had operated as isolated instruments — each machine a closed system, each institution its own island. The microelectronics revolution begins wiring them together. Networks, protocols, and shared standards emerge as a consequence of the new components making connection possible. The computer stops being a standalone calculator and starts becoming a node.",

    significance:
      "Every subsequent paradigm — personal computing, the internet, mobile, AI — depends on the connective infrastructure laid here.",

    earlySignal: null,

    transition:
      "The next disruption concerns power: computing capability held inside large institutions becomes available in a device one person can own.",

    events: [
      {
        year: "1969",
        name: "ARPANET",
        significance:
          "The first packet-switched network connecting universities and research labs, establishing the technical foundation for all subsequent networking.",
      },
      {
        year: "1971",
        name: "Intel 4004",
        significance:
          "The first commercially available microprocessor, placing the logic of a computer onto a single chip and making miniaturization economically viable.",
      },
      {
        year: "1973",
        name: "Ethernet",
        significance:
          "Defines the local area network standard that becomes the dominant protocol for connecting machines within institutions.",
      },
      {
        year: "1973",
        name: "First mobile phone call",
        significance:
          "Motorola's handheld cellular call demonstrates that voice communication can detach from fixed infrastructure.",
      },
    ],
  },

  {
    id: "scorpio-1974",
    sign: "Scorpio",
    symbol: "♏",
    element: "water",
    timeframe: "1974–1981",
    startYear: 1974,
    endYear: 1981,
    status: "completed",

    domain: SIGNS.scorpio.domain,
    paradigm: "Personal computing",
    thesis: "Personal computers shift computing power from institutions toward individuals.",

    before: "Institutional computing power",
    after: "Personal computing power",

    interpretation:
      "Uranus disrupts power. Computing had been concentrated physically and economically inside governments, universities, and corporations. The microcomputer compresses that capability into a machine that can be owned and controlled by one person. The locus of power shifts — from the institution to the individual.",

    significance:
      "The computer changes from institutional infrastructure into a personal instrument. This creates the foundation for the software industry, consumer computing, and eventually the individual digital identity.",

    earlySignal: [{
      marker: "1971 — Intel 4004",
      reason: "The microprocessor makes the personal computer technically possible, arriving three years before Scorpio begins.",
    }],

    transition:
      "The next disruption concerns expansion: the personal computer breaks out of specialist settings and becomes a mass-market platform.",

    events: [
      {
        year: "1975",
        name: "Altair 8800",
        significance:
          "Makes microcomputing accessible to hobbyists and helps establish the emerging personal-computer ecosystem.",
      },
      {
        year: "1976",
        name: "Apple I",
        significance:
          "Packages microprocessor computing around an individual user rather than an institutional installation.",
      },
      {
        year: "1977",
        name: "Apple II",
        significance:
          "Helps move personal computing from the hobbyist market toward ordinary consumers and businesses.",
      },
      {
        year: "1980",
        name: "Apple IPO",
        significance:
          "Signals that personal computing has developed into a major commercial industry.",
      },
    ],
  },

  {
    id: "sagittarius-1981",
    sign: "Sagittarius",
    symbol: "♐",
    element: "fire",
    timeframe: "1981–1988",
    startYear: 1981,
    endYear: 1988,
    status: "completed",

    domain: SIGNS.sagittarius.domain,
    paradigm: "PC expansion",
    thesis: "Personal computing breaks out of specialist environments and expands into homes, offices, and global markets.",

    before: "Specialist computing",
    after: "Mass-market computing",

    interpretation:
      "Uranus disrupts expansion. Personal computing had largely served hobbyists and specialist users. Mass-market PCs and accessible software break those limits, bringing computing into homes, offices, and global markets. The PC becomes a mainstream product category, and a commercial software industry forms around it. IBM's entry legitimises the market; Apple's interface broadens who can use it; TCP/IP begins stitching the scattered machines together.",

    significance:
      "The PC becomes the default business and consumer computing platform for a generation, and the software industry — Microsoft, Lotus, Adobe — forms around it. The commercial computing ecosystem as we know it is established here.",

    earlySignal: [{
      marker: "1977 — Apple II, TRS-80, Commodore PET",
      reason: "The consumer PC ecosystem appears in the final years of Scorpio, before mass expansion begins.",
    }],

    transition:
      "The next disruption concerns structure: fragmented computing systems are reorganized around shared standards, operating systems, and network infrastructure.",

    events: [
      {
        year: "1981",
        name: "IBM PC",
        significance:
          "IBM's entry validates personal computing for businesses and sets the open-architecture standard that enables a broad ecosystem.",
      },
      {
        year: "1983",
        name: "TCP/IP",
        significance:
          "The internet's protocol suite becomes the universal standard for network communication, creating the technical substrate for the internet.",
      },
      {
        year: "1984",
        name: "Macintosh",
        significance:
          "Introduces the graphical interface to a mass audience, redefining what interacting with a computer can look like.",
      },
      {
        year: "1985",
        name: "Windows 1.0",
        significance:
          "Brings a graphical interface to the dominant IBM-compatible market, beginning the operating system as a platform business.",
      },
    ],
  },

  {
    id: "capricorn-1988",
    sign: "Capricorn",
    symbol: "♑",
    element: "earth",
    timeframe: "1988–1995",
    startYear: 1988,
    endYear: 1995,
    status: "completed",

    domain: SIGNS.capricorn.domain,
    paradigm: "Digital infrastructure",
    thesis: "Common standards and infrastructure rebuild the structure of computing around interconnected systems.",

    before: "Fragmented digital systems",
    after: "Shared digital infrastructure",

    interpretation:
      "Uranus disrupts structure. Computing had grown through fragmented machines, incompatible systems, and separate information stores. Shared protocols and platforms overturn that fragmentation. The World Wide Web provides a common document layer on top of TCP/IP; operating systems become serious platforms; institutions begin building digital infrastructure as a long-term asset rather than an experiment.",

    significance:
      "The internet becomes a public resource rather than a research network. The foundations of the digital economy — web servers, browsers, networked databases, commercial operating systems — are laid here. Everything that follows runs on this infrastructure.",

    earlySignal: [{
      marker: "1983 — TCP/IP",
      reason: "The standardised networking protocol arrives during Sagittarius, creating the connective architecture the infrastructure era will build on.",
    }],

    transition:
      "The next disruption concerns networks: closed systems give way to an open, globally connected internet.",

    events: [
      {
        year: "1989",
        name: "World Wide Web proposed",
        significance:
          "Tim Berners-Lee's proposal creates a document layer on top of the internet, making distributed information navigable by ordinary users.",
      },
      {
        year: "1991",
        name: "Linux",
        significance:
          "An open-source operating system kernel that becomes the foundation for servers, the internet, and eventually Android.",
      },
      {
        year: "1993",
        name: "Mosaic",
        significance:
          "The first widely used graphical web browser, making the web accessible beyond researchers and developers.",
      },
      {
        year: "1995",
        name: "Windows 95",
        significance:
          "Brings internet connectivity and a modern interface to hundreds of millions of users, normalising the networked PC.",
      },
    ],
  },

  {
    id: "aquarius-1995",
    sign: "Aquarius",
    symbol: "♒",
    element: "air",
    timeframe: "1995–2003",
    startYear: 1995,
    endYear: 2003,
    status: "completed",

    domain: SIGNS.aquarius.domain,
    paradigm: "Internet",
    thesis: "The internet overturns closed networks with an open global network anyone can join.",

    before: "Closed networks",
    after: "Open global network",

    interpretation:
      "Uranus disrupts networks. Digital communication had largely depended on institutional networks and closed online services. Public internet access and the open web break those boundaries, enabling a global network of participants. Commerce, communication, and community migrate onto the open network. The dot-com cycle concentrates investment and then collapses it — but the network itself survives and grows through the crash, more embedded than before.",

    significance:
      "The internet becomes a social and commercial infrastructure, not merely a technical one. Search, e-commerce, and online community establish the basic patterns of digital life that persist today. The crash of 2000–01 clears speculative excess but leaves the underlying network stronger.",

    earlySignal: [{
      marker: "1993 — Mosaic",
      reason: "The first consumer-facing graphical browser appears at the end of Capricorn, making the web accessible to non-technical users immediately before the internet era opens.",
    }],

    transition:
      "The next disruption concerns unity: separate activities in communication, identity, and media converge into a shared social environment.",

    events: [
      {
        year: "1995",
        name: "Amazon",
        significance:
          "Demonstrates that retail commerce can migrate entirely onto the network, beginning the displacement of physical retail.",
      },
      {
        year: "1998",
        name: "Google",
        significance:
          "Makes the open web navigable at scale, becoming the primary interface between users and networked information.",
      },
      {
        year: "1999",
        name: "Napster",
        significance:
          "Proves that peer-to-peer networks can distribute media without institutional intermediaries, disrupting the recorded music industry.",
      },
      {
        year: "2001",
        name: "Wikipedia",
        significance:
          "Demonstrates that collaborative knowledge production at global scale is possible on an open network.",
      },
    ],
  },

  {
    id: "pisces-2003",
    sign: "Pisces",
    symbol: "♓",
    element: "water",
    timeframe: "2003–2010",
    startYear: 2003,
    endYear: 2010,
    status: "completed",

    domain: SIGNS.pisces.domain,
    paradigm: "Social web",
    thesis: "Separate forms of identity, relationships, communication, and media converge into a shared digital environment.",

    before: "Separate digital activities",
    after: "Unified social environment",

    interpretation:
      "Uranus disrupts unity. The internet shifts from a network primarily used to find and consume information into a continuous social environment. Identity, relationships, conversation, photos, music, and video all begin converging onto the same network. What appeared to be separate digital activities — messaging, browsing, publishing, entertainment — reveal themselves as one interconnected system.",

    significance:
      "The social rails of the modern internet are built during this era. Profiles establish digital identity, social graphs map relationships, feeds organize activity, and user-generated media turns ordinary people into participants.",

    earlySignal: [
      {
        marker: "1999 — Napster",
        reason:
          "Millions of users begin exchanging media directly across the internet, foreshadowing a network organized around participation rather than one-way publishing.",
      },
    ],

    transition:
      "The next disruption concerns initiation: the smartphone changes entry into digital life from visiting a fixed computer to acting through a device carried by the individual.",

    events: [
      {
        year: "2003",
        name: "MySpace",
        significance:
          "Turns the personal profile into a public digital identity and brings relationships, music, self-expression, and social discovery into one network.",
      },
      {
        year: "2004",
        name: "Facebook",
        significance:
          "Maps real-world identity and relationships into a structured social graph, creating durable social rails for the internet.",
      },
      {
        year: "2005",
        name: "YouTube",
        significance:
          "Makes online video participatory, allowing anyone to publish, share, discover, and respond to media through the network.",
      },
      {
        year: "2006",
        name: "Twitter",
        significance:
          "Adds a real-time public conversation layer, connecting people through an open stream of continuously updating information.",
      },
    ],
  },

  {
    id: "aries-2010",
    sign: "Aries",
    symbol: "♈",
    element: "fire",
    timeframe: "2010–2018",
    startYear: 2010,
    endYear: 2018,
    status: "completed",

    domain: SIGNS.aries.domain,
    paradigm: "Mobile computing",
    thesis: "The smartphone changes how individuals enter and interact with the digital world.",

    before: "Computing tied to a place",
    after: "Computing begins with the individual",

    interpretation:
      "Uranus disrupts initiation. Entering digital life had usually meant going to a desk and operating a fixed computer. The smartphone shifts that starting point to a networked device carried by the individual. Computing is no longer something you go to — it follows you, and it begins with you. The app economy builds around the individual user; social media builds around individual identity; sensors and GPS make location a computing primitive.",

    significance:
      "Mobile overtakes desktop as the dominant computing platform. The app store model reshapes software distribution; social media reshapes political and cultural communication; the smartphone becomes the primary interface for commerce, navigation, banking, and entertainment.",

    earlySignal: [{
      marker: "2007 — iPhone",
      reason: "The smartphone paradigm arrives three years before Aries begins, establishing the device form factor and interaction model that defines the mobile era.",
    }],

    transition:
      "The next disruption concerns stability: artificial intelligence challenges the established software paradigm and reorganizes computing around models and accelerated compute.",

    events: [
      {
        year: "2010",
        name: "iPad",
        significance:
          "Establishes the tablet as a consumption-first computing form factor and expands the iOS platform.",
      },
      {
        year: "2012",
        name: "4G expansion",
        significance:
          "High-speed mobile data makes video streaming, real-time apps, and always-on connectivity viable everywhere.",
      },
      {
        year: "2015",
        name: "TensorFlow",
        significance:
          "Google's open-source machine-learning framework democratises deep learning research and begins the AI toolchain.",
      },
      {
        year: "2017",
        name: "Transformer architecture",
        significance:
          "The attention-based neural network architecture that underpins GPT, BERT, and every large language model that follows.",
      },
    ],
  },

  {
    id: "taurus-2018",
    sign: "Taurus",
    symbol: "♉",
    element: "earth",
    timeframe: "2018–2026",
    startYear: 2018,
    endYear: 2026,
    status: "completed",

    domain: SIGNS.taurus.domain,
    paradigm: "Artificial intelligence",
    thesis: "AI disrupts the stability of the established computing paradigm.",

    before: "Stable software paradigm",
    after: "AI-native computing",

    interpretation:
      "Uranus disrupts stability. Computing had settled around deterministic software operated directly by humans. Artificial intelligence breaks that assumption by introducing systems that can generate, reason, and increasingly act. The computing stack begins reorganizing around models, accelerated compute, and AI-native interfaces.",

    significance:
      "Artificial intelligence moves from a primarily research-driven field toward a new computing infrastructure. The defining feature of the era is not only that models become dramatically more capable, but that enormous physical systems are built to train, serve, and scale them.",

    earlySignal: [{
      marker: "2017 — Transformer architecture",
      reason: "The attention mechanism that underpins all large language models appears during Aries, a year before Taurus begins and five years before the GPU buildout it requires.",
    }],

    transition:
      "The next disruption concerns exchange: AI agents begin interpreting human intent and coordinating information, instructions, and actions across digital systems.",

    events: [
      {
        year: "2020",
        name: "GPT-3",
        significance:
          "Scaling produces a major jump in general language capability and demonstrates the value of very large compute-intensive models.",
      },
      {
        year: "2022",
        name: "ChatGPT",
        significance:
          "Generative AI reaches mass adoption, triggering an industry-wide race to build and deploy AI capacity.",
      },
      {
        year: "2023",
        name: "GPU boom",
        significance:
          "Accelerator supply becomes a strategic constraint as demand for AI training and inference surges.",
      },
      {
        year: "2023–24",
        name: "AI data-center buildout",
        significance:
          "Technology companies commit enormous capital to the physical infrastructure required to scale AI.",
      },
      {
        year: "2024–26",
        name: "AI power buildout",
        significance:
          "Energy availability, grid capacity, cooling, and data-center construction become central constraints on AI expansion.",
      },
    ],
  },

  {
    id: "gemini-2026",
    sign: "Gemini",
    symbol: "♊",
    element: "air",
    timeframe: "2026–2033",
    startYear: 2026,
    endYear: 2033,
    status: "active",

    domain: SIGNS.gemini.domain,
    paradigm: "Agentic computing",
    thesis: "AI agents disrupt how information, instructions, and actions are exchanged between humans and machines.",

    before: "Humans operate software",
    after: "Agents operate software",

    interpretation:
      "Uranus disrupts exchange. Digital interaction had largely meant humans exchanging instructions with software through fixed interfaces. AI agents begin interpreting intent, retrieving information, using tools, writing software, and coordinating actions. Exchange increasingly occurs between humans and intelligent systems — and between intelligent systems themselves.",

    significance:
      "The interface to computing begins shifting from applications and menus toward intent. A user can increasingly retrieve information in real time, create software on demand, and instruct agents to perform digital work across previously separate systems.",

    earlySignal: [
      {
        marker: "2024–26 — AI agents",
        reason: "Models begin using tools, browsing information, writing and executing code, and carrying out multi-step tasks.",
      },
      {
        marker: "2025–26 — Agentic coding",
        reason: "Software creation begins shifting from manually writing code toward describing outcomes to autonomous coding systems.",
      },
    ],

    transition:
      "The full technological consequences of the Gemini era are still emerging.",

    events: [],
  },
];
