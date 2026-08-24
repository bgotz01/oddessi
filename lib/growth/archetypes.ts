/**
 * lib/growth/archetypes.ts
 *
 * The role a pole is called, given its sign and house.
 *
 * The archetype is not simply a synonym for the house. It is the role produced
 * when the SIGN'S mode of development operates through the HOUSE'S arena.
 *
 *     sign  = how the person moves
 *     house = where that movement has to operate
 *     role  = who that combination asks the person to become
 *
 * "Why" is kept beside every name because the name is a derived interpretation,
 * not raw astrological data. A future editor should be able to see the argument
 * that produced "Founder" rather than "Keeper", not merely inherit the word.
 */

import type { House } from "@/lib/astrology/house-categories";
import { HOUSE } from "./houses";

export interface ArchetypeEntry {
  role: string;
  why: string;
}

/**
 * Per-combination archetypes, keyed `"Sign/house"`.
 *
 * The quality bar is simple: the combination-specific role should tell us
 * something the generic house noun does not. The sign should materially change
 * how the house is occupied.
 */
export const ARCHETYPE: Record<string, ArchetypeEntry> = {
  // ─── Aries ────────────────────────────────────────────────────────────────
  //
  // Core movement:
  // self-directed action · initiative · assertion · willingness to go first
  //
  // Aries does not merely occupy an arena. It initiates within it. Across the
  // twelve houses the question is therefore: what does "I act from myself"
  // become when expressed through this particular territory?

  "Aries/1": {
    role: "Pioneer",
    why:
      "The first house is already the arena of self and first moves; Aries intensifies it into entering first and establishing a path where none existed.",
  },

  "Aries/2": {
    role: "Claimant",
    why:
      "The second house asks what is mine and what I value; Aries makes that an act of self-definition — claiming worth, resources and ownership rather than waiting for them to be assigned.",
  },

  "Aries/3": {
    role: "Provocateur",
    why:
      "The third house thinks through exchange; Aries learns by challenging, questioning and saying the thing that forces an idea into direct contact with another mind.",
  },

  "Aries/4": {
    role: "Founder",
    why:
      "The fourth house is the foundation one normally inherits or protects; Aries turns it into something actively established — creating a base, home or belonging on one's own terms.",
  },

  "Aries/5": {
    role: "Creator",
    why:
      "The fifth house makes from desire rather than obligation; Aries gives that desire immediate authorship — making the thing because I want it to exist.",
  },

  "Aries/6": {
    role: "Operator",
    why:
      "The sixth house deals with concrete work, method and repair; Aries meets that territory through action — identifying what needs doing and acting directly on it.",
  },

  "Aries/7": {
    role: "Challenger",
    why:
      "The seventh house requires a real encounter with another person; Aries makes that encounter direct, developing through assertion, disagreement and the willingness to meet an equal without disappearing into them.",
  },

  "Aries/8": {
    role: "Catalyst",
    why:
      "The eighth house contains entanglement, power and irreversible change; Aries supplies the initiating force that makes what was latent in the entanglement actually happen.",
  },

  "Aries/9": {
    role: "Author",
    why:
      "The ninth house forms the larger worldview; Aries makes that worldview one's own — moving from interpreting available ideas to taking a position and putting a personally authored thesis into the world.",
  },

  "Aries/10": {
    role: "Commander",
    why:
      "The tenth house makes action public and consequential; Aries expresses there as visible decision and direction — becoming the person willing to act, lead and be held to the result.",
  },

  "Aries/11": {
    role: "Instigator",
    why:
      "The eleventh house moves through groups and shared futures; Aries contributes the first move — initiating the project, challenge or possibility that gets the collective moving.",
  },

  "Aries/12": {
    role: "Pathfinder",
    why:
      "The twelfth house offers no clear map: it contains the hidden, unresolved and unseen; Aries develops here by learning to move into that uncertainty without waiting for the path to become visible first.",
  },

  // ─── Taurus ───────────────────────────────────────────────────────────────
  //
  // Core movement:
  // steadiness · embodiment · value · accumulation · patience · enough
  //
  // Taurus asks how something becomes stable, tangible and worth keeping.
  // Across the twelve houses the question is: what does "I build and preserve
  // what has real value" become in this particular arena?

  "Taurus/1": {
    role: "Anchor",
    why:
      "The first house is the arena of self and first moves; Taurus slows that beginning down into presence — becoming someone who establishes stability simply by arriving and holding their ground.",
  },

  "Taurus/2": {
    role: "Steward",
    why:
      "The second house already governs worth, resources and what can be held; Taurus intensifies that into careful ownership — building, protecting and using value rather than merely possessing it.",
  },

  "Taurus/3": {
    role: "Grounder",
    why:
      "The third house moves through ideas, language and exchange; Taurus gives thought weight by making it concrete, practical and usable rather than leaving it abstract or endlessly mobile.",
  },

  "Taurus/4": {
    role: "Homesteader",
    why:
      "The fourth house is home, roots and foundation; Taurus develops there by making belonging tangible — creating a stable base that can actually nourish and sustain life over time.",
  },

  "Taurus/5": {
    role: "Artisan",
    why:
      "The fifth house creates for pleasure and self-expression; Taurus turns that impulse into craft — making something beautiful, sensory or enduring enough to be enjoyed repeatedly rather than only expressed once.",
  },

  "Taurus/6": {
    role: "Craftsperson",
    why:
      "The sixth house is repetition, maintenance and useful work; Taurus brings patience and continuity, developing mastery through a pace that can be sustained rather than through bursts of effort.",
  },

  "Taurus/7": {
    role: "Companion",
    why:
      "The seventh house is the territory of partnership and agreement; Taurus develops there through constancy — becoming someone who can build trust, continuity and shared value with another person over time.",
  },

  "Taurus/8": {
    role: "Trustee",
    why:
      "The eighth house deals with what is shared, entangled and placed in another person's hands; Taurus brings the question of stewardship into that territory — learning how to hold shared value without trying to make it entirely one's own.",
  },

  "Taurus/9": {
    role: "Builder of Belief",
    why:
      "The ninth house forms a worldview; Taurus asks for beliefs that can be lived rather than merely admired — principles sturdy enough to organise ordinary choices, habits and commitments.",
  },

  "Taurus/10": {
    role: "Institution Builder",
    why:
      "The tenth house makes work public and durable; Taurus develops there by creating something substantial enough to last — a reputation, enterprise or body of work whose value accumulates over time.",
  },

  "Taurus/11": {
    role: "Sustainer",
    why:
      "The eleventh house concerns groups, networks and shared futures; Taurus contributes continuity — keeping a collective effort resourced, grounded and alive after the initial excitement has passed.",
  },

  "Taurus/12": {
    role: "Sanctuary Keeper",
    why:
      "The twelfth house contains retreat, dissolution and what cannot be fully controlled; Taurus develops there by creating enough physical and inner steadiness to remain present without needing uncertainty to disappear.",
  },

  // ─── Gemini ───────────────────────────────────────────────────────────────
  //
  // Core movement:
  // curiosity · exchange · language · mobility · connection · provisionality
  //
  // Gemini asks how an arena becomes more alive through questions, movement and
  // communication. Across the twelve houses the question is: what does "I connect,
  // ask and circulate" become in this particular territory?

  "Gemini/1": {
    role: "Messenger",
    why:
      "The first house is the arena of self and arrival; Gemini develops there by making identity mobile and communicative — becoming someone who enters through curiosity, language and immediate contact.",
  },

  "Gemini/2": {
    role: "Broker",
    why:
      "The second house concerns value, resources and what can be exchanged; Gemini makes value relational — recognising opportunities by connecting information, people and resources rather than simply holding them.",
  },

  "Gemini/3": {
    role: "Correspondent",
    why:
      "The third house already governs language, questions and exchange; Gemini intensifies it into active circulation — gathering, translating and passing information between people and contexts.",
  },

  "Gemini/4": {
    role: "Storykeeper",
    why:
      "The fourth house holds memory, family and belonging; Gemini develops there by giving the private world language — collecting its stories, asking what was never asked, and keeping the foundation connected through communication.",
  },

  "Gemini/5": {
    role: "Improviser",
    why:
      "The fifth house creates through play and desire; Gemini makes creativity experimental — generating through wit, variation, conversation and the freedom to try one version after another.",
  },

  "Gemini/6": {
    role: "Coordinator",
    why:
      "The sixth house is daily work, method and service; Gemini develops there by linking moving parts — keeping information flowing, adapting quickly and making practical work function through communication.",
  },

  "Gemini/7": {
    role: "Conversationalist",
    why:
      "The seventh house requires real engagement with another person; Gemini develops there by keeping the relationship mentally alive — asking, listening, negotiating meaning and allowing the other person to remain surprising.",
  },

  "Gemini/8": {
    role: "Interrogator",
    why:
      "The eighth house contains what is hidden, shared and psychologically entangled; Gemini enters it through questions — making difficult material speak rather than treating depth as something that must remain mysterious.",
  },

  "Gemini/9": {
    role: "Correspondent",
    why:
      "The ninth house reaches toward larger systems of meaning; Gemini keeps that larger frame porous — comparing cultures, testing beliefs and translating distant ideas back into specific, intelligible language.",
  },

  "Gemini/10": {
    role: "Spokesperson",
    why:
      "The tenth house makes a contribution public; Gemini develops there by becoming the person who can articulate, translate and circulate what the work means to a wider audience.",
  },

  "Gemini/11": {
    role: "Connector",
    why:
      "The eleventh house operates through networks and collective futures; Gemini contributes by linking people, ideas and conversations that would otherwise remain separate.",
  },

  "Gemini/12": {
    role: "Listener",
    why:
      "The twelfth house contains what is difficult to name or fully know; Gemini develops there by listening for fragments, symbols and half-formed thoughts without forcing them too quickly into a finished explanation.",
  },

  // ─── Cancer ───────────────────────────────────────────────────────────────
  //
  // Core movement:
  // protection · belonging · care · memory · attunement · emotional foundation
  //
  // Cancer asks what needs to be protected, tended and given somewhere to belong.
  // Across the twelve houses the question is: what does "I create the conditions
  // for belonging" become in this particular territory?

  "Cancer/1": {
    role: "Protector",
    why:
      "The first house is the arena of self and first moves; Cancer develops there by making sensitivity active — becoming someone who notices vulnerability quickly and instinctively moves to protect what matters.",
  },

  "Cancer/2": {
    role: "Provider",
    why:
      "The second house concerns resources, worth and what can be relied upon; Cancer turns possession into provision — building enough security that both the self and what it cares for can be sustained.",
  },

  "Cancer/3": {
    role: "Confidant",
    why:
      "The third house is the territory of conversation and immediate exchange; Cancer makes communication personal — listening for what is felt beneath what is said and creating enough trust for the real thing to be spoken.",
  },

  "Cancer/4": {
    role: "Homemaker",
    why:
      "The fourth house already governs home, roots and emotional foundation; Cancer intensifies it into the active creation of belonging — making a place, family or inner base in which life can safely take root.",
  },

  "Cancer/5": {
    role: "Nurturer",
    why:
      "The fifth house contains what one creates, loves and brings forth; Cancer develops there through attachment to what it makes — protecting, encouraging and helping a creation, relationship or joy grow into a life of its own.",
  },

  "Cancer/6": {
    role: "Caretaker",
    why:
      "The sixth house deals with ordinary work, maintenance and repair; Cancer expresses there as practical care — noticing what needs tending and repeatedly doing the small things that keep a person, body or system well.",
  },

  "Cancer/7": {
    role: "Companion",
    why:
      "The seventh house requires sustained encounter with another person; Cancer develops there by creating emotional safety between equals — learning to care for the bond without turning care into dependency or control.",
  },

  "Cancer/8": {
    role: "Guardian",
    why:
      "The eighth house contains intimacy, vulnerability and what is entrusted between people; Cancer becomes the guardian of what has been exposed — learning how to hold another person's vulnerability without possessing it.",
  },

  "Cancer/9": {
    role: "Custodian",
    why:
      "The ninth house carries beliefs, traditions and larger frameworks across generations and cultures; Cancer develops there by asking what inheritance is worth preserving and giving enduring ideas somewhere to remain alive.",
  },

  "Cancer/10": {
    role: "Patron",
    why:
      "The tenth house makes responsibility public; Cancer develops there by using position to protect and sustain what depends upon it — turning authority into stewardship rather than status alone.",
  },

  "Cancer/11": {
    role: "Host",
    why:
      "The eleventh house concerns communities, networks and shared futures; Cancer contributes by turning a collection of people into somewhere they can belong — creating cohesion, continuity and a sense of being included.",
  },

  "Cancer/12": {
    role: "Witness",
    why:
      "The twelfth house contains private feeling, loss and what cannot always be repaired; Cancer develops there by remaining emotionally present with what is hidden or unresolved without needing to rescue it from its experience.",
  },

  // ─── Leo ──────────────────────────────────────────────────────────────────
  //
  // Core movement:
  // expression · visibility · authorship · confidence · creation · wholeheartedness
  //
  // Leo asks what becomes possible when a person stops standing outside their own
  // contribution and puts themselves visibly into it. Across the twelve houses the
  // question is: what does "I create, claim and stand behind what is mine" become
  // in this particular territory?

  "Leo/1": {
    role: "Protagonist",
    why:
      "The first house is the arena of self and arrival; Leo develops there by fully occupying the foreground of its own life — becoming willing to be seen, recognised and identified with the choices it makes.",
  },

  "Leo/2": {
    role: "Proprietor",
    why:
      "The second house concerns worth, resources and what is one's own; Leo develops there by taking pride in what it creates and possesses — treating value as something personally built, claimed and worth standing behind.",
  },

  "Leo/3": {
    role: "Storyteller",
    why:
      "The third house is the territory of language and exchange; Leo turns communication into expression — giving information a voice, point of view and personal presence that makes other people want to listen.",
  },

  "Leo/4": {
    role: "Patriarch",
    why:
      "The fourth house is home, roots and the private foundation; Leo develops there by becoming a defining presence within that foundation — someone who gives the household or lineage identity, continuity and a centre around which it can gather.",
  },

  "Leo/5": {
    role: "Performer",
    why:
      "The fifth house already governs creation, play and self-expression; Leo intensifies it into wholehearted display — making something unmistakably personal and accepting the vulnerability of letting other people see and respond to it.",
  },

  "Leo/6": {
    role: "Master",
    why:
      "The sixth house is the territory of practice, repetition and craft; Leo develops there by putting personal pride into mastery — turning ordinary work into something recognisably one's own and worth being known for doing well.",
  },

  "Leo/7": {
    role: "Counterpart",
    why:
      "The seventh house requires encounter between equals; Leo develops there by remaining fully present as a distinct self inside relationship — allowing another strong person to stand opposite without surrendering either visibility or individuality.",
  },

  "Leo/8": {
    role: "Revealer",
    why:
      "The eighth house contains intimacy, power and what is normally concealed; Leo brings visibility into that territory — developing the courage to expose what matters personally rather than protecting the self through secrecy or control.",
  },

  "Leo/9": {
    role: "Evangelist",
    why:
      "The ninth house forms and transmits a larger worldview; Leo develops there by giving conviction a personal voice — becoming willing to proclaim, teach and embody an idea strongly enough that other people can feel why it matters.",
  },

  "Leo/10": {
    role: "Figurehead",
    why:
      "The tenth house is public role, reputation and authority; Leo develops there by becoming visibly identified with the work — accepting that leadership sometimes means putting one's own name, judgment and reputation on the result.",
  },

  "Leo/11": {
    role: "Ringleader",
    why:
      "The eleventh house operates through groups and collective projects; Leo contributes a visible centre of enthusiasm — giving people something to rally around and turning shared participation into an effort with energy and identity.",
  },

  "Leo/12": {
    role: "Visionary",
    why:
      "The twelfth house contains what develops outside ordinary visibility; Leo learns there to create from an inner source before recognition is available — trusting a vision enough to give it form even when nobody is watching yet.",
  },

  // ─── Virgo ─────────────────────────────────────────────────────────────────
  //
  // Core movement:
  // discernment · refinement · precision · usefulness · method · improvement
  //
  // Virgo asks what needs to be distinguished, corrected, practised or made more
  // useful. Across the twelve houses the question is: what does "I examine what is
  // here and make it work better" become in this particular territory?

  "Virgo/1": {
    role: "Practitioner",
    why:
      "The first house is the arena of self and agency; Virgo develops there by treating the self as something practised rather than merely declared — learning through observation, adjustment and repeated improvement of how one actually operates.",
  },

  "Virgo/2": {
    role: "Appraiser",
    why:
      "The second house concerns worth, resources and what can be relied upon; Virgo develops there by distinguishing real value from assumed value — assessing what is useful, what is wasteful and what deserves continued investment.",
  },

  "Virgo/3": {
    role: "Analyst",
    why:
      "The third house is the territory of thought, information and exchange; Virgo develops there by separating signal from noise — examining details, finding discrepancies and organising information until it becomes precise enough to use.",
  },

  "Virgo/4": {
    role: "Restorer",
    why:
      "The fourth house contains foundations, inherited patterns and the private environment; Virgo develops there by noticing what in that foundation no longer works and patiently repairing it rather than simply preserving what was inherited.",
  },

  "Virgo/5": {
    role: "Craftsperson",
    why:
      "The fifth house is the arena of creation and personal expression; Virgo turns inspiration into craft — revising, practising and refining something until the original impulse acquires a form capable of carrying it well.",
  },

  "Virgo/6": {
    role: "Specialist",
    why:
      "The sixth house already governs practice, method and repair; Virgo intensifies it into specialised competence — learning the details deeply enough to diagnose problems, improve the process and become genuinely useful through mastery.",
  },

  "Virgo/7": {
    role: "Mediator",
    why:
      "The seventh house requires two people to make something work between them; Virgo develops there by noticing where expectations, responsibilities or agreements are misaligned and helping the relationship arrive at clearer and more workable terms.",
  },

  "Virgo/8": {
    role: "Examiner",
    why:
      "The eighth house contains hidden obligations, shared resources and psychological entanglements; Virgo develops there by examining exactly what is owed, shared, concealed or unresolved rather than allowing complexity to remain vague.",
  },

  "Virgo/9": {
    role: "Scholar",
    why:
      "The ninth house builds larger systems of meaning; Virgo develops there by testing the larger claim against particulars — studying closely enough that belief becomes something supported, qualified and capable of surviving scrutiny.",
  },

  "Virgo/10": {
    role: "Professional",
    why:
      "The tenth house makes competence visible and accountable; Virgo develops there by becoming known for reliability, standards and expertise — building authority through the quality of the work rather than through position alone.",
  },

  "Virgo/11": {
    role: "Organizer",
    why:
      "The eleventh house concerns collective projects and shared futures; Virgo contributes by turning aspiration into workable structure — identifying what the group actually needs, assigning practical form to it and keeping the effort functional.",
  },

  "Virgo/12": {
    role: "Interpreter",
    why:
      "The twelfth house contains what is diffuse, hidden or difficult to name; Virgo develops there by giving careful form to material that initially arrives without clear boundaries — discerning patterns without pretending the unknowable can be completely controlled.",
  },

  // ─── Libra ─────────────────────────────────────────────────────────────────
  //
  // Core movement:
  // relationship · reciprocity · perspective · balance · negotiation · proportion
  //
  // Libra develops through encounter. It discovers what cannot be seen from one
  // position alone by bringing another person, perspective or interest into the
  // equation. Across the twelve houses the question is: what role emerges when
  // an arena is approached through comparison, reciprocity and relationship?

  "Libra/1": {
    role: "Diplomat",
    why:
      "The first house asks for a distinct self and a first move; Libra develops there by becoming an active representative of its own position — learning to enter the room with a point of view while remaining capable of seeing the one opposite it.",
  },

  "Libra/2": {
    role: "Valuator",
    why:
      "The second house concerns worth, resources and what deserves to be kept; Libra develops there by judging value comparatively — weighing quality, alternatives and competing interests until it can decide what something is actually worth.",
  },

  "Libra/3": {
    role: "Interpreter",
    why:
      "The third house is the arena of thought and exchange; Libra develops there by moving between perspectives — comparing what different people mean, finding the relationship between their positions and making one intelligible to the other.",
  },

  "Libra/4": {
    role: "Peacemaker",
    why:
      "The fourth house contains family, belonging and inherited emotional patterns; Libra develops there by recognising the competing needs inside that foundation and creating terms under which they can coexist without one simply dominating the others.",
  },

  "Libra/5": {
    role: "Curator",
    why:
      "The fifth house creates, selects and expresses what one loves; Libra develops there through composition — choosing what belongs together, arranging elements in relation to one another and producing something whose beauty comes from proportion.",
  },

  "Libra/6": {
    role: "Facilitator",
    why:
      "The sixth house is the arena of practical work and functioning systems; Libra develops there by coordinating people, responsibilities and competing requirements so that the work functions through cooperation rather than isolated effort.",
  },

  "Libra/7": {
    role: "Negotiator",
    why:
      "The seventh house already requires encounter between equals; Libra intensifies that into the ability to hold two legitimate positions at once and find terms neither side could have produced independently.",
  },

  "Libra/8": {
    role: "Arbiter",
    why:
      "The eighth house contains shared resources, obligations, power and entanglement; Libra develops there by determining what is fair when interests can no longer be separated — who owes what, who controls what and what equitable exchange actually requires.",
  },

  "Libra/9": {
    role: "Comparativist",
    why:
      "The ninth house forms larger systems of belief and meaning; Libra develops there by placing worldviews beside one another — discovering principles through comparison rather than assuming that the first coherent system encountered must be the final one.",
  },

  "Libra/10": {
    role: "Statesperson",
    why:
      "The tenth house makes judgment public and consequential; Libra develops there by representing interests larger than its own — becoming responsible for decisions that require legitimacy, proportion and the reconciliation of competing claims.",
  },

  "Libra/11": {
    role: "Coalition Builder",
    why:
      "The eleventh house concerns groups, networks and shared futures; Libra develops there by finding enough common interest between different people or factions for them to act together without requiring them to become the same.",
  },

  "Libra/12": {
    role: "Reconciler",
    why:
      "The twelfth house contains what has been excluded, unresolved or left outside conscious agreement; Libra develops there by holding contradictions that cannot simply be negotiated away and finding a relationship between parts that previously could not coexist.",
  },

  // ─── Scorpio ───────────────────────────────────────────────────────────────
  //
  // Core movement:
  // penetration · exposure · intensity · power · transformation · truth beneath form
  //
  // Scorpio develops by refusing to stop at the presented version of something.
  // It follows pressure, motive, vulnerability and power beneath the surface until
  // the underlying reality becomes visible. Across the twelve houses the question
  // is: what role emerges when an arena is approached through depth, exposure and
  // transformation?

  "Scorpio/1": {
    role: "Transformer",
    why:
      "The first house is the arena of self and agency; Scorpio develops there by repeatedly confronting what in the self has become false, exhausted or defensive — shedding identities that no longer hold and emerging with greater personal power.",
  },

  "Scorpio/2": {
    role: "Investor",
    why:
      "The second house concerns value, resources and what is worth holding; Scorpio develops there by looking beneath apparent value — concentrating resources where hidden potential is greatest and accepting that meaningful accumulation often requires risk, patience and transformation.",
  },

  "Scorpio/3": {
    role: "Investigator",
    why:
      "The third house is the arena of questions, information and exchange; Scorpio develops there by refusing the surface account — following contradictions, motives and missing information until it reaches what is actually going on.",
  },

  "Scorpio/4": {
    role: "Excavator",
    why:
      "The fourth house contains roots, family and inherited emotional foundations; Scorpio develops there by uncovering what the foundation has buried — exposing inherited patterns, secrets and unresolved material so they no longer govern the present invisibly.",
  },

  "Scorpio/5": {
    role: "Alchemist",
    why:
      "The fifth house turns inner material into creation and expression; Scorpio develops there by transforming intense, private or difficult experience into something newly alive — making creation itself an act of transmutation.",
  },

  "Scorpio/6": {
    role: "Diagnostician",
    why:
      "The sixth house concerns work, repair and what makes a system function; Scorpio develops there by locating the underlying cause rather than repeatedly treating the visible symptom — finding the failure beneath the failure.",
  },

  "Scorpio/7": {
    role: "Intimate",
    why:
      "The seventh house requires genuine encounter with another person; Scorpio develops there by allowing relationship to move beyond negotiated surfaces into vulnerability, trust and power — becoming willing both to see and to be seen where defenses normally intervene.",
  },

  "Scorpio/8": {
    role: "Trustee",
    why:
      "The eighth house already contains shared resources, intimacy, power and irreversible entanglement; Scorpio intensifies the responsibility of holding what another person has exposed or entrusted — learning to carry power without exploiting the vulnerability that accompanies it.",
  },

  "Scorpio/9": {
    role: "Heretic",
    why:
      "The ninth house forms beliefs and larger systems of meaning; Scorpio develops there by interrogating the assumptions beneath accepted truth — following an idea into territory where inherited doctrine may have to die for a more convincing worldview to emerge.",
  },

  "Scorpio/10": {
    role: "Power Broker",
    why:
      "The tenth house concerns public authority and consequential action; Scorpio develops there by understanding where power actually resides — reading incentives, leverage and hidden dependencies well enough to influence outcomes rather than merely occupy a visible position.",
  },

  "Scorpio/11": {
    role: "Strategist",
    why:
      "The eleventh house concerns groups, networks and collective futures; Scorpio develops there by reading the forces beneath collective behaviour — identifying loyalties, incentives and concentrations of power that determine where a group is really capable of going.",
  },

  "Scorpio/12": {
    role: "Depth Diver",
    why:
      "The twelfth house contains what is hidden even from conscious inspection; Scorpio develops there by entering psychological and symbolic material that cannot be reached through surface explanation — remaining with what is buried long enough for it to reveal itself.",
  },

  // ─── Sagittarius ──────────────────────────────────────────────────────────
  //
  // Core movement:
  // exploration · meaning · conviction · expansion · synthesis · horizon
  //
  // Sagittarius develops by moving beyond the immediate frame and discovering
  // the larger pattern that gives experience meaning. It explores, synthesises
  // and eventually takes a position. Across the twelve houses the question is:
  // what role emerges when an arena is approached through expansion, meaning
  // and the search for a larger horizon?

  "Sagittarius/1": {
    role: "Adventurer",
    why:
      "The first house is the arena of self and first moves; Sagittarius develops there by treating life as territory to enter — discovering who it is through movement, risk and direct encounters with what lies beyond the familiar.",
  },

  "Sagittarius/2": {
    role: "Venturer",
    why:
      "The second house concerns value, resources and what can be built; Sagittarius develops there by putting resources behind possibility — accepting calculated uncertainty when a larger opportunity, capability or horizon can be created through it.",
  },

  "Sagittarius/3": {
    role: "Commentator",
    why:
      "The third house gathers observations, conversations and immediate information; Sagittarius develops there by connecting those particulars to a larger frame — turning scattered facts into an account of what they mean and why they matter.",
  },

  "Sagittarius/4": {
    role: "Wayfarer",
    why:
      "The fourth house asks where one belongs; Sagittarius develops there by discovering that foundation through experience rather than inheritance alone — travelling beyond the given home in order to decide what home, culture and belonging actually mean.",
  },

  "Sagittarius/5": {
    role: "Enthusiast",
    why:
      "The fifth house creates through desire, play and personal risk; Sagittarius develops there by following what enlarges experience — throwing itself wholeheartedly into creation, romance, play or adventure and inviting others into that sense of possibility.",
  },

  "Sagittarius/6": {
    role: "Mentor",
    why:
      "The sixth house is the arena of practice, work and useful competence; Sagittarius develops there by connecting the daily task to a larger purpose — using accumulated experience to show others not only how something is done but why the work matters.",
  },

  "Sagittarius/7": {
    role: "Fellow Traveler",
    why:
      "The seventh house requires a real journey with another person; Sagittarius develops there by forming partnerships that enlarge both lives — relating through shared discovery while allowing each person enough freedom to keep growing.",
  },

  "Sagittarius/8": {
    role: "Truth Seeker",
    why:
      "The eighth house contains intimacy, power, loss and experiences that overturn ordinary assumptions; Sagittarius develops there by asking what those encounters reveal about life itself — extracting meaning from territory that cannot be understood from a safe distance.",
  },

  "Sagittarius/9": {
    role: "Philosopher",
    why:
      "The ninth house already concerns worldview, belief and the larger frame; Sagittarius intensifies it into the search for a coherent philosophy — ranging widely through experience and ideas until a principle emerges that is large enough to organise a life.",
  },

  "Sagittarius/10": {
    role: "Standard-Bearer",
    why:
      "The tenth house makes one's position public and consequential; Sagittarius develops there by becoming visibly associated with a larger principle, mission or direction — standing for something strongly enough that others know what the work represents.",
  },

  "Sagittarius/11": {
    role: "Evangelist",
    why:
      "The eleventh house concerns networks, movements and shared futures; Sagittarius develops there by spreading a compelling possibility through the collective — giving people a larger idea of where they could go and persuading them that the horizon is worth pursuing.",
  },

  "Sagittarius/12": {
    role: "Pilgrim",
    why:
      "The twelfth house removes the certainty of an external map; Sagittarius develops there by continuing the search for meaning when answers cannot be verified in ordinary ways — allowing solitude, surrender and the unknown to become part of the journey rather than evidence that the journey has failed.",
  },

  // ─── Capricorn ─────────────────────────────────────────────────────────────
  //
  // Core movement:
  // structure · responsibility · discipline · authority · endurance · consequence
  //
  // Capricorn develops by accepting that worthwhile outcomes require structure,
  // limits, responsibility and time. It turns intention into something capable of
  // carrying weight. Across the twelve houses the question is: what role emerges
  // when an arena is approached through construction, accountability and endurance?

  "Capricorn/1": {
    role: "Architect",
    why:
      "The first house is the arena of self and agency; Capricorn develops there by deliberately constructing the person it intends to become — treating character, conduct and direction as something built through repeated choices rather than simply discovered.",
  },

  "Capricorn/2": {
    role: "Capitalist",
    why:
      "The second house concerns resources, value and what can be accumulated; Capricorn develops there by turning resources into productive capacity — organising what it has so that value compounds, supports larger aims and remains durable over time.",
  },

  "Capricorn/3": {
    role: "Planner",
    why:
      "The third house is the arena of information, thought and immediate decisions; Capricorn develops there by organising scattered information into a sequence — determining what matters, what comes first and what practical course follows from it.",
  },

  "Capricorn/4": {
    role: "Patriarch",
    why:
      "The fourth house contains home, lineage and the foundation inherited from the past; Capricorn develops there by assuming responsibility for that foundation — becoming the person who establishes continuity, boundaries and structure strong enough for others to stand on.",
  },

  "Capricorn/5": {
    role: "Producer",
    why:
      "The fifth house generates ideas, creations and personal expression; Capricorn develops there by giving creation enough structure to become real — organising time, resources and execution so that an impulse becomes a finished work rather than remaining a possibility.",
  },

  "Capricorn/6": {
    role: "Manager",
    why:
      "The sixth house concerns daily work, systems and repeated execution; Capricorn develops there by organising effort — establishing standards, responsibilities and processes that allow work to continue reliably beyond individual bursts of effort.",
  },

  "Capricorn/7": {
    role: "Contractor",
    why:
      "The seventh house requires commitments between equals; Capricorn develops there by making those commitments explicit and durable — defining responsibilities, accepting obligations and building relationships that can withstand consequence and time.",
  },

  "Capricorn/8": {
    role: "Executor",
    why:
      "The eighth house contains shared assets, obligations, inheritance and consequences that outlive individual control; Capricorn develops there by taking responsibility for what has been entrusted — administering complex commitments and ensuring that obligations are actually carried through.",
  },

  "Capricorn/9": {
    role: "Legislator",
    why:
      "The ninth house forms principles, laws and larger frameworks; Capricorn develops there by turning abstract principles into standards capable of governing action — asking not only what is true, but what rule should follow from it.",
  },

  "Capricorn/10": {
    role: "Authority",
    why:
      "The tenth house already concerns public responsibility, reputation and consequence; Capricorn intensifies it into earned authority — becoming the person whose judgment carries weight because they have accepted responsibility for outcomes over time.",
  },

  "Capricorn/11": {
    role: "Institution Builder",
    why:
      "The eleventh house concerns collective projects and futures larger than one person; Capricorn develops there by giving those ambitions durable form — creating organisations, rules and structures capable of continuing after the original participants are gone.",
  },

  "Capricorn/12": {
    role: "Custodian",
    why:
      "The twelfth house contains what operates outside visibility and recognition; Capricorn develops there by taking responsibility for necessary work that may never become public — maintaining structures, obligations or boundaries precisely because someone has to hold them.",
  },

  // ─── Aquarius ──────────────────────────────────────────────────────────────
  //
  // Core movement:
  // independence · reform · systems · experimentation · networks · future
  //
  // Aquarius develops by gaining enough distance from an existing arrangement to
  // see that it is only one possible arrangement. It identifies structures that
  // have become limiting, experiments with alternatives and reconnects the pieces
  // differently. Across the twelve houses the question is: what role emerges when
  // an arena is approached through independence, redesign and systemic change?

  "Aquarius/1": {
    role: "Individualist",
    why:
      "The first house is the arena of self and agency; Aquarius develops there by separating identity from expectation — becoming willing to define itself outside the roles, conventions and categories other people assume it should occupy.",
  },

  "Aquarius/2": {
    role: "Innovator",
    why:
      "The second house concerns value, resources and what can be built; Aquarius develops there by questioning conventional definitions of value — finding new uses, models or resources where the existing system sees little worth.",
  },

  "Aquarius/3": {
    role: "Disruptor",
    why:
      "The third house is the arena of thought, information and exchange; Aquarius develops there by breaking habitual patterns of thought — introducing the unexpected connection, contradiction or alternative model that changes how a problem can be understood.",
  },

  "Aquarius/4": {
    role: "Exile",
    why:
      "The fourth house contains home, roots and inherited belonging; Aquarius develops there by gaining enough distance from the inherited foundation to discover which parts genuinely belong to it and which were merely assigned by family, culture or history.",
  },

  "Aquarius/5": {
    role: "Inventor",
    why:
      "The fifth house is the arena of creation and personal expression; Aquarius develops there through experimentation — making what does not yet have an established form and allowing originality to matter more than familiarity or approval.",
  },

  "Aquarius/6": {
    role: "Systems Designer",
    why:
      "The sixth house concerns work, process and repeated functioning; Aquarius develops there by redesigning the system rather than endlessly performing around its defects — changing the arrangement so that the work itself can happen differently.",
  },

  "Aquarius/7": {
    role: "Collaborator",
    why:
      "The seventh house requires sustained encounter with another person; Aquarius develops there by building partnership without possession — creating relationships in which two autonomous people can cooperate without either being required to conform to the other.",
  },

  "Aquarius/8": {
    role: "Reallocator",
    why:
      "The eighth house contains shared resources, power and interdependence; Aquarius develops there by questioning how those resources and powers are distributed — redesigning arrangements that concentrate control or reproduce dependencies that no longer serve the whole.",
  },

  "Aquarius/9": {
    role: "Futurist",
    why:
      "The ninth house forms the larger frame through which reality is understood; Aquarius develops there by constructing frameworks around what could become possible rather than merely explaining what already exists — using ideas to anticipate a different world.",
  },

  "Aquarius/10": {
    role: "Reformer",
    why:
      "The tenth house contains institutions, authority and the public order; Aquarius develops there by challenging structures from within public life — becoming identified with changing an institution, profession or system whose inherited form has ceased to fit its purpose.",
  },

  "Aquarius/11": {
    role: "Organizer",
    why:
      "The eleventh house already concerns networks, groups and shared futures; Aquarius intensifies it into the ability to organise people around a common possibility — creating a structure through which distributed individuals can act collectively without requiring a single centre.",
  },

  "Aquarius/12": {
    role: "Outsider",
    why:
      "The twelfth house contains what sits beyond ordinary participation and visibility; Aquarius develops there through distance itself — occupying the edge long enough to perceive assumptions that remain invisible to those fully embedded in the prevailing system.",
  },
  // ─── Pisces ────────────────────────────────────────────────────────────────
  //
  // Core movement:
  // receptivity · imagination · surrender · empathy · synthesis · transcendence
  //
  // Pisces develops by loosening boundaries that have become too rigid to contain
  // reality. It receives what cannot always be reached through direct action or
  // analysis and allows apparently separate things to participate in a larger
  // whole. Across the twelve houses the question is: what role emerges when an
  // arena is approached through receptivity, imagination and surrender?

  "Pisces/1": {
    role: "Shape-Shifter",
    why:
      "The first house asks for identity and a distinct way of entering life; Pisces develops there by allowing identity to remain permeable — becoming capable of inhabiting different roles and perspectives without assuming that any single presentation exhausts who one is.",
  },

  "Pisces/2": {
    role: "Benefactor",
    why:
      "The second house concerns value, resources and what is one's own; Pisces develops there by loosening the boundary between possession and contribution — learning that value can also be created by circulating, supporting and giving rather than only accumulating.",
  },

  "Pisces/3": {
    role: "Poet",
    why:
      "The third house is the arena of language, thought and immediate perception; Pisces develops there by giving language to what literal description cannot fully capture — communicating through image, metaphor, intuition and association.",
  },

  "Pisces/4": {
    role: "Harbor",
    why:
      "The fourth house is home, emotional foundation and belonging; Pisces develops there by becoming a place where experience can come to rest — creating belonging through acceptance rather than requiring everything that enters to fit a predetermined form.",
  },

  "Pisces/5": {
    role: "Dreamer",
    why:
      "The fifth house gives inner material creative form; Pisces develops there by allowing imagination to lead — drawing images, stories and possibilities from material that did not begin as a rational plan.",
  },

  "Pisces/6": {
    role: "Healer",
    why:
      "The sixth house concerns service, repair and the needs encountered in ordinary life; Pisces develops there by becoming receptive to suffering that cannot be solved mechanically — bringing care, intuition and compassion into the practical work of helping.",
  },

  "Pisces/7": {
    role: "Empath",
    why:
      "The seventh house requires encounter with another person; Pisces develops there by becoming deeply receptive to another person's experience while learning that genuine empathy requires connection without complete loss of one's own boundaries.",
  },

  "Pisces/8": {
    role: "Medium",
    why:
      "The eighth house contains intimacy, loss, inheritance and transformations that cross the boundary of individual control; Pisces develops there by becoming receptive to what passes between people and through endings — holding experiences whose meaning cannot be reduced to ownership or explanation.",
  },

  "Pisces/9": {
    role: "Mystic",
    why:
      "The ninth house seeks a larger account of reality; Pisces develops there by approaching meaning through direct experience of connection rather than doctrine alone — allowing mystery, symbol and transcendence to participate in the worldview.",
  },

  "Pisces/10": {
    role: "Vessel",
    why:
      "The tenth house asks what one contributes publicly; Pisces develops there by allowing the public work to carry something larger than personal ambition — becoming a vessel through which an artistic, compassionate or transcendent contribution can take visible form.",
  },

  "Pisces/11": {
    role: "Humanitarian",
    why:
      "The eleventh house extends concern toward the collective; Pisces develops there by widening identification beyond the immediate circle — recognising distant or unfamiliar people as participants in the same human condition and acting from that recognition.",
  },

  "Pisces/12": {
    role: "Contemplative",
    why:
      "The twelfth house already contains solitude, surrender and what exceeds conscious control; Pisces intensifies it into the capacity to remain with the unbounded — entering silence, imagination or spiritual experience without requiring everything encountered there to become definite.",
  },
};

/**
 * The archetype for a pole.
 *
 * A hand-authored sign/house combination is preferred. Until the full 144-entry
 * matrix is complete, the generic house noun remains a safe fallback.
 */
export function archetypeFor(
  sign: string,
  house: number | null,
): string | null {
  if (house === null) return null;

  return (
    ARCHETYPE[`${sign}/${house}`]?.role ??
    HOUSE[house as House].noun
  );
}