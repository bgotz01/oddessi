/**
 * lib/growth/archetype-questions.ts
 *
 * Specialized developmental prompts for each sign × house combination.
 *
 * `move` is the shortest practical instruction for the role.
 * `questions` are the three questions that make that role concrete in the
 * arena of the house.
 */

export interface ArchetypeQuestionsEntry {
    move: string;
    questions: [string, string, string];
}

export const ARCHETYPE_QUESTIONS: Record<
    string,
    ArchetypeQuestionsEntry
> = {
    // ─── Aries ────────────────────────────────────────────────────────────────

    "Aries/1": {
        move: "Go first on purpose.",
        questions: [
            "Where am I waiting for someone else to make the first move?",
            "What would I begin if I stopped asking whether I was ready?",
            "What part of myself only becomes visible once I act?",
        ],
    },

    "Aries/2": {
        move: "Claim what is yours.",
        questions: [
            "What do I value enough to claim without waiting for validation?",
            "Where am I letting someone else decide what my time, work or resources are worth?",
            "What would I build if I treated my own judgment of value as sufficient to begin?",
        ],
    },

    "Aries/3": {
        move: "Say the thing that tests the idea.",
        questions: [
            "What question would change this conversation if I asked it directly?",
            "Where am I softening my real position before anyone has challenged it?",
            "What do I understand only by arguing with it?",
        ],
    },

    "Aries/4": {
        move: "Establish your own ground.",
        questions: [
            "What would home look like if I built it around my needs rather than inherited expectations?",
            "Where am I still living inside a foundation someone else chose?",
            "What boundary would make my private life more truly mine?",
        ],
    },

    "Aries/5": {
        move: "Make what you want to make.",
        questions: [
            "What would I create if I stopped asking whether anyone wanted it?",
            "Where have I turned play into performance for approval?",
            "What desire deserves expression simply because it is mine?",
        ],
    },

    "Aries/6": {
        move: "Act on the problem.",
        questions: [
            "What practical problem am I still discussing instead of fixing?",
            "Where would a direct intervention work better than another round of preparation?",
            "What daily action would give me more agency over this situation?",
        ],
    },

    "Aries/7": {
        move: "Meet the other person directly.",
        questions: [
            "What do I need to say before this relationship can become an honest negotiation?",
            "Where am I avoiding disagreement because I fear what directness might reveal?",
            "Can I remain fully myself while letting the other person remain fully themselves?",
        ],
    },

    "Aries/8": {
        move: "Initiate the transformation.",
        questions: [
            "What shared situation is waiting for someone to name what must change?",
            "Where am I tolerating an entanglement because taking action would make the consequences real?",
            "What becomes possible if I confront the power dynamic directly?",
        ],
    },

    "Aries/9": {
        move: "Stake your worldview.",
        questions: [
            "What do I actually believe after everything I have learned?",
            "Which principle am I willing to defend without hiding behind endless qualification?",
            "What have I researched long enough that it is time to make a claim?",
        ],
    },

    "Aries/10": {
        move: "Take responsibility for the direction.",
        questions: [
            "Where am I doing the work without claiming the authority to decide?",
            "What public decision am I waiting for someone else to make?",
            "What would I lead differently if I accepted that the result would carry my name?",
        ],
    },

    "Aries/11": {
        move: "Start the collective move.",
        questions: [
            "What shared project is waiting for someone to initiate it?",
            "Where am I waiting for consensus when a first experiment would teach us more?",
            "What could I set in motion that others would be able to join?",
        ],
    },

    "Aries/12": {
        move: "Move before the path is visible.",
        questions: [
            "What inner impulse keeps returning even though I cannot yet explain it?",
            "Where am I waiting for certainty about something that can only be learned by entering it?",
            "What would a small act of courage look like in territory nobody else can see?",
        ],
    },

    // ─── Taurus ────────────────────────────────────────────────────────────────

    "Taurus/1": {
        move: "Hold your ground.",
        questions: [
            "Where am I changing myself simply because someone else is moving faster?",
            "What choice would I make if I trusted my own pace?",
            "What becomes possible when I stop treating steadiness as hesitation?",
        ],
    },

    "Taurus/2": {
        move: "Build what lasts.",
        questions: [
            "What am I building that will still have value years from now?",
            "Where am I spending resources on what impresses rather than what endures?",
            "What would enough look like if I defined it for myself?",
        ],
    },

    "Taurus/3": {
        move: "Make the idea tangible.",
        questions: [
            "Which idea becomes more useful when I make it concrete?",
            "What do I actually know from experience rather than abstraction?",
            "How could I explain this so someone could use it tomorrow?",
        ],
    },

    "Taurus/4": {
        move: "Build somewhere to belong.",
        questions: [
            "What does my environment need in order to genuinely restore me?",
            "Which parts of home create security, and which merely preserve familiarity?",
            "What foundation could I build now that my future self would be grateful to inherit?",
        ],
    },

    "Taurus/5": {
        move: "Give pleasure a form.",
        questions: [
            "What do I enjoy making slowly enough to become good at it?",
            "What would I create if usefulness were not required?",
            "What deserves to be made beautifully rather than merely finished?",
        ],
    },

    "Taurus/6": {
        move: "Make it sustainable.",
        questions: [
            "What routine could I realistically keep doing for years?",
            "Where am I relying on intensity when consistency would work better?",
            "What small improvement would make the daily work easier to sustain?",
        ],
    },

    "Taurus/7": {
        move: "Build trust through constancy.",
        questions: [
            "What does this relationship need repeatedly, not dramatically?",
            "Where am I confusing familiarity with genuine commitment?",
            "What can I reliably offer another person without abandoning my own needs?",
        ],
    },

    "Taurus/8": {
        move: "Steward what is shared.",
        questions: [
            "What am I trying to possess that can only be held jointly?",
            "What would responsible stewardship of our shared resources actually require?",
            "Where does trust require me to loosen control without becoming careless?",
        ],
    },

    "Taurus/9": {
        move: "Live the principle.",
        questions: [
            "Which of my beliefs actually changes how I live?",
            "What principle has survived enough experience to deserve my commitment?",
            "Where am I collecting ideas instead of building a life around what I already know matters?",
        ],
    },

    "Taurus/10": {
        move: "Build a durable body of work.",
        questions: [
            "What could I become known for if I kept building it for ten years?",
            "Where am I chasing visibility instead of accumulating substance?",
            "What am I creating that could retain value after the attention moves elsewhere?",
        ],
    },

    "Taurus/11": {
        move: "Keep the effort alive.",
        questions: [
            "What does this group need in order to survive after the initial excitement?",
            "Which shared goal deserves a long-term commitment from me?",
            "What resource, habit or structure could make this collective more durable?",
        ],
    },

    "Taurus/12": {
        move: "Create steadiness inside uncertainty.",
        questions: [
            "What helps me remain grounded when there is nothing concrete to solve?",
            "Where am I clinging to certainty because uncertainty feels unsafe?",
            "What simple physical practice helps me stay present with what I cannot control?",
        ],
    },

    // ─── Gemini ────────────────────────────────────────────────────────────────

    "Gemini/1": {
        move: "Enter through curiosity.",
        questions: [
            "What changes when I introduce myself by what I am curious about rather than what I already know?",
            "Where has a fixed idea of who I am stopped me from experimenting with who I could be?",
            "What would I try if I allowed myself to change my mind afterward?",
        ],
    },

    "Gemini/2": {
        move: "Connect what has value.",
        questions: [
            "What information, skill or relationship do I have that becomes more valuable when connected to something else?",
            "Where am I overlooking opportunity because value is appearing in an unfamiliar form?",
            "What could I exchange, combine or circulate instead of simply holding?",
        ],
    },

    "Gemini/3": {
        move: "Keep the information moving.",
        questions: [
            "What have I not asked because I assumed I already understood?",
            "Who knows something about this that I do not?",
            "What becomes clearer when I explain what I know to someone else?",
        ],
    },

    "Gemini/4": {
        move: "Give the past a voice.",
        questions: [
            "What story about my family or past have I inherited without ever questioning it?",
            "What conversation would help me understand where I came from differently?",
            "What part of my private experience needs words before I can understand what it means?",
        ],
    },

    "Gemini/5": {
        move: "Play with the possibilities.",
        questions: [
            "What could I make if I treated the first version as an experiment rather than a commitment?",
            "Where has taking myself too seriously made creation less interesting?",
            "What new possibility appears when I combine two ideas that normally stay separate?",
        ],
    },

    "Gemini/6": {
        move: "Connect the moving parts.",
        questions: [
            "What information is missing between the people or tasks involved here?",
            "Where is poor communication creating work that does not need to exist?",
            "What could I simplify by naming the next step more clearly?",
        ],
    },

    "Gemini/7": {
        move: "Keep the other person surprising.",
        questions: [
            "What have I stopped asking because I think I already know this person?",
            "What changes if I become curious about their position instead of preparing my response?",
            "Which conversation have we been replacing with assumptions?",
        ],
    },

    "Gemini/8": {
        move: "Ask what nobody is asking.",
        questions: [
            "What subject has become difficult precisely because nobody will name it?",
            "Which question would expose what is actually happening between us?",
            "What becomes less powerful once it can be spoken plainly?",
        ],
    },

    "Gemini/9": {
        move: "Compare the larger frames.",
        questions: [
            "What happens to my worldview when I encounter a genuinely different one?",
            "Which belief have I accepted because I have never heard the strongest alternative?",
            "How would I explain this idea to someone from a completely different background?",
        ],
    },

    "Gemini/10": {
        move: "Make the work intelligible.",
        questions: [
            "What do people need to understand about my work that I have not explained clearly?",
            "Where could the ability to translate complexity become part of my public contribution?",
            "What idea am I capable of carrying from the people who understand it to the people who need it?",
        ],
    },

    "Gemini/11": {
        move: "Connect the people who should meet.",
        questions: [
            "Which two people or ideas in my network should already know each other?",
            "Where could one conversation unlock movement across the whole group?",
            "What becomes possible if I stop treating my relationships as separate circles?",
        ],
    },

    "Gemini/12": {
        move: "Listen before you name it.",
        questions: [
            "What thought keeps appearing before I have language for it?",
            "Where am I explaining something too quickly because ambiguity makes me uncomfortable?",
            "What might I hear if I let the fragment remain unfinished for a while?",
        ],
    },

    // ─── Cancer ────────────────────────────────────────────────────────────────

    "Cancer/1": {
        move: "Protect what matters.",
        questions: [
            "What am I instinctively trying to protect, and why does it matter to me?",
            "Where am I hiding sensitivity when it is actually telling me what deserves action?",
            "What boundary would let me remain open without leaving myself unprotected?",
        ],
    },

    "Cancer/2": {
        move: "Build enough to provide.",
        questions: [
            "What resources would make me feel genuinely secure rather than temporarily reassured?",
            "Who or what do I want to be capable of providing for?",
            "Where am I accumulating for safety without ever deciding what enough actually means?",
        ],
    },

    "Cancer/3": {
        move: "Make it safe to say.",
        questions: [
            "What is this person communicating beneath the words they are using?",
            "What question would show that I am actually listening rather than preparing an answer?",
            "What becomes speakable when someone knows I will not immediately judge or fix it?",
        ],
    },

    "Cancer/4": {
        move: "Create somewhere to belong.",
        questions: [
            "What makes a place feel like home to me rather than merely somewhere I live?",
            "Which parts of my inherited idea of family do I want to preserve, and which do I want to remake?",
            "What would I need to create so that I could genuinely return there for restoration?",
        ],
    },

    "Cancer/5": {
        move: "Help what you love grow.",
        questions: [
            "What creation, relationship or desire am I willing to care for after the initial excitement passes?",
            "Where am I protecting something so much that I am preventing it from developing a life of its own?",
            "What deserves encouragement before it is impressive?",
        ],
    },

    "Cancer/6": {
        move: "Turn care into practice.",
        questions: [
            "What small act of care would matter more if I did it consistently?",
            "What does my body or daily environment keep asking me to tend?",
            "Where am I offering emotional concern without doing the practical thing that would actually help?",
        ],
    },

    "Cancer/7": {
        move: "Build emotional safety together.",
        questions: [
            "What would help both of us feel safe enough to be honest in this relationship?",
            "Where am I caring for the bond by avoiding something the bond actually needs us to discuss?",
            "Can I support another person's needs without making myself responsible for their emotional state?",
        ],
    },

    "Cancer/8": {
        move: "Hold what has been entrusted.",
        questions: [
            "What has someone trusted me with that requires care rather than intervention?",
            "Where does intimacy require me to stay present with vulnerability instead of trying to remove it?",
            "What boundary would let me protect what is shared without trying to control it?",
        ],
    },

    "Cancer/9": {
        move: "Carry forward what matters.",
        questions: [
            "Which beliefs or traditions have genuinely nourished me enough to deserve preservation?",
            "What have I inherited that I want to pass on in a different form?",
            "How can I keep a tradition alive without making it immune to change?",
        ],
    },

    "Cancer/10": {
        move: "Use authority to protect.",
        questions: [
            "What becomes my responsibility once other people depend on my decisions?",
            "Who or what needs protection that my position allows me to provide?",
            "How would I exercise authority differently if I measured success by what remained healthy under my care?",
        ],
    },

    "Cancer/11": {
        move: "Turn the group into belonging.",
        questions: [
            "What would make the people around this project feel that they genuinely belong to it?",
            "Who is standing at the edge of the group that nobody has brought inside?",
            "What shared ritual, memory or practice could turn this network into a community?",
        ],
    },

    "Cancer/12": {
        move: "Stay with what cannot be fixed.",
        questions: [
            "What feeling am I trying to solve because simply experiencing it feels harder?",
            "Where does care require presence rather than rescue?",
            "What becomes possible when I allow grief, uncertainty or vulnerability to exist without immediately defending against it?",
        ],
    },

    // ─── Leo ──────────────────────────────────────────────────────────────────

    "Leo/1": {
        move: "Occupy your own life.",
        questions: [
            "Where am I making myself smaller so I do not become too visible?",
            "What choice would make this life feel more unmistakably mine?",
            "What part of myself wants to be expressed rather than explained?",
        ],
    },

    "Leo/2": {
        move: "Put your name behind the value.",
        questions: [
            "What have I created or built that I am genuinely proud to call mine?",
            "Where am I letting external recognition determine what I think my work is worth?",
            "What would I value differently if I trusted my own sense of quality?",
        ],
    },

    "Leo/3": {
        move: "Give the idea your voice.",
        questions: [
            "What do I have to say that becomes less interesting when I remove myself from it?",
            "Where am I reporting other people's ideas instead of developing my own point of view?",
            "What story could only be told this way by me?",
        ],
    },

    "Leo/4": {
        move: "Become a center of belonging.",
        questions: [
            "What kind of home or family culture do I want my presence to create?",
            "Which part of my inheritance am I proud to carry forward in my own way?",
            "What would it mean to become a source of warmth and continuity rather than only seeking it?",
        ],
    },

    "Leo/5": {
        move: "Create without hiding.",
        questions: [
            "What do I most want to make when I stop worrying whether it will be admired?",
            "Where am I protecting myself from judgment by never fully committing to the work?",
            "What deserves to be shown precisely because it carries so much of me?",
        ],
    },

    "Leo/6": {
        move: "Make the craft your own.",
        questions: [
            "What ordinary work could become exceptional if I brought more of myself to it?",
            "Where am I completing the task correctly without leaving any personal signature on it?",
            "What skill would make me proud if I mastered it deeply enough to be known for it?",
        ],
    },

    "Leo/7": {
        move: "Stay visible beside another.",
        questions: [
            "Where am I becoming smaller so the other person can remain comfortable?",
            "Can I admire someone else's strength without experiencing it as a threat to my own?",
            "What would this relationship look like if both of us were allowed to take up full space?",
        ],
    },

    "Leo/8": {
        move: "Reveal what has real stakes.",
        questions: [
            "What am I protecting behind composure because revealing it would make me vulnerable?",
            "Where does genuine intimacy require me to risk being fully seen?",
            "What becomes more powerful when I stop hiding how much it matters to me?",
        ],
    },

    "Leo/9": {
        move: "Stand behind the idea.",
        questions: [
            "Which belief matters enough that I am willing to become publicly associated with it?",
            "Where am I discussing ideas intelligently without revealing what I actually believe?",
            "What could I teach with conviction because I have lived it rather than merely studied it?",
        ],
    },

    "Leo/10": {
        move: "Put your name on the work.",
        questions: [
            "What am I willing to become publicly accountable for?",
            "Where am I contributing from behind the scenes when the role actually requires visible leadership?",
            "What body of work would I be proud to have associated with my name?",
        ],
    },

    "Leo/11": {
        move: "Give people something to rally around.",
        questions: [
            "What possibility could I make vivid enough that other people want to participate?",
            "Where could my enthusiasm give a collective effort more courage or momentum?",
            "Can I become a visible center of energy without needing the group to revolve around me?",
        ],
    },

    "Leo/12": {
        move: "Create before anyone applauds.",
        questions: [
            "What would I keep making even if nobody knew I was doing it?",
            "Where has the absence of recognition made me doubt something that still feels alive inside me?",
            "What wants to come through me before I know whether the world has a place for it?",
        ],
    },

    // ─── Virgo ─────────────────────────────────────────────────────────────────

    "Virgo/1": {
        move: "Refine how you operate.",
        questions: [
            "What do I notice about myself when I observe my behavior instead of defending it?",
            "Which small adjustment would make the way I move through life more effective?",
            "Where am I demanding perfection from myself instead of practicing improvement?",
        ],
    },

    "Virgo/2": {
        move: "Distinguish what is worth keeping.",
        questions: [
            "Which of my resources actually contributes something useful to my life?",
            "Where am I spending time, money or effort without receiving enough value in return?",
            "What becomes more valuable when I remove what is unnecessary?",
        ],
    },

    "Virgo/3": {
        move: "Separate signal from noise.",
        questions: [
            "Which detail changes how I understand the whole situation?",
            "What am I assuming that I could actually verify?",
            "What becomes clear when I separate observation from interpretation?",
        ],
    },

    "Virgo/4": {
        move: "Repair the foundation.",
        questions: [
            "What inherited pattern keeps producing problems in my private life?",
            "What needs repair rather than acceptance simply because it has always been this way?",
            "Which small change to my foundation would improve everything built on top of it?",
        ],
    },

    "Virgo/5": {
        move: "Refine the creation.",
        questions: [
            "What does this work need in order to become better rather than merely more finished?",
            "Which part deserves another revision because I know it can carry the idea more precisely?",
            "When does refinement serve the work, and when does it become a way of avoiding release?",
        ],
    },

    "Virgo/6": {
        move: "Master the method.",
        questions: [
            "What problem keeps recurring because I have never understood its actual cause?",
            "Which part of my daily process deserves deeper expertise rather than another workaround?",
            "What could I become exceptionally useful at if I practiced it deliberately?",
        ],
    },

    "Virgo/7": {
        move: "Make the relationship workable.",
        questions: [
            "What specific expectation between us has never actually been clarified?",
            "Where am I criticizing the other person instead of identifying what needs to change between us?",
            "What practical agreement would remove a recurring source of friction?",
        ],
    },

    "Virgo/8": {
        move: "Examine what is entangled.",
        questions: [
            "What exactly is being shared, owed or expected here?",
            "Which hidden obligation becomes manageable once I name it precisely?",
            "Where is vagueness allowing an unhealthy arrangement to continue?",
        ],
    },

    "Virgo/9": {
        move: "Test the larger claim.",
        questions: [
            "What evidence would make me revise this belief?",
            "Which part of my worldview sounds coherent in theory but fails against the particulars?",
            "What do I need to study more carefully before I can responsibly make this claim?",
        ],
    },

    "Virgo/10": {
        move: "Earn authority through the work.",
        questions: [
            "What standard do I want the quality of my work to represent?",
            "Where am I seeking recognition before developing the competence that would justify it?",
            "What expertise could become part of my public reputation if I refined it deeply enough?",
        ],
    },

    "Virgo/11": {
        move: "Make the collective functional.",
        questions: [
            "What does this group actually need in order to turn its intention into action?",
            "Where is a practical problem being mistaken for a lack of vision?",
            "What process could I improve that would make everyone else's contribution easier?",
        ],
    },

    "Virgo/12": {
        move: "Give form to what is unclear.",
        questions: [
            "What pattern keeps appearing even though I cannot fully explain it yet?",
            "Where am I trying to eliminate ambiguity instead of learning to observe it carefully?",
            "What can I name precisely without pretending I understand the whole thing?",
        ],
    },

    // ─── Libra ─────────────────────────────────────────────────────────────────

    "Libra/1": {
        move: "Represent your own position.",
        questions: [
            "What do I actually want before I begin adjusting to what someone else wants?",
            "Where am I being agreeable when the situation requires me to state a position?",
            "How can I remain open to another perspective without abandoning my own?",
        ],
    },

    "Libra/2": {
        move: "Decide what is worth it.",
        questions: [
            "What am I comparing this against when I decide what it is worth?",
            "Where am I accepting someone else's valuation instead of making my own judgment?",
            "What deserves more of my time, money or attention than I am currently giving it?",
        ],
    },

    "Libra/3": {
        move: "Translate between perspectives.",
        questions: [
            "What does each person mean that the other side is failing to hear?",
            "Where am I treating two different perspectives as contradictions when they may simply describe different parts of the same thing?",
            "How would I explain this position fairly to someone who disagrees with it?",
        ],
    },

    "Libra/4": {
        move: "Make room for competing needs.",
        questions: [
            "Whose needs have quietly become the default in my private life?",
            "What unresolved tension keeps disturbing the peace beneath the surface?",
            "What arrangement would let the people involved belong without requiring one person to disappear?",
        ],
    },

    "Libra/5": {
        move: "Compose what belongs together.",
        questions: [
            "Which elements become more beautiful or expressive when placed in relationship?",
            "What am I adding that disrupts the proportion of the whole?",
            "What would I choose if I trusted my own sense of taste rather than anticipating the audience's?",
        ],
    },

    "Libra/6": {
        move: "Make cooperation work.",
        questions: [
            "Where are responsibilities poorly balanced in the work we are doing together?",
            "What practical adjustment would make cooperation easier for everyone involved?",
            "Which recurring friction is really a problem of unclear expectations or unequal contribution?",
        ],
    },

    "Libra/7": {
        move: "Negotiate the real terms.",
        questions: [
            "What does each of us actually need from this relationship?",
            "Where am I preserving harmony by avoiding a negotiation we need to have?",
            "What agreement could both of us genuinely choose rather than merely tolerate?",
        ],
    },

    "Libra/8": {
        move: "Make the exchange fair.",
        questions: [
            "Who is carrying more risk, cost or responsibility than the current arrangement acknowledges?",
            "What does each person actually owe the other here?",
            "Where has avoiding conflict allowed an unequal exchange to become normal?",
        ],
    },

    "Libra/9": {
        move: "Compare the frameworks.",
        questions: [
            "What can this worldview see that mine cannot?",
            "Which principle survives when I examine the strongest argument from the other side?",
            "What larger truth appears when I stop requiring one framework to contain all of it?",
        ],
    },

    "Libra/10": {
        move: "Make the judgment legitimate.",
        questions: [
            "Whose interests am I responsible for considering before I decide?",
            "Where does leadership require judgment rather than simply keeping everyone satisfied?",
            "What decision could I defend as fair even to the person who does not benefit from it?",
        ],
    },

    "Libra/11": {
        move: "Build the coalition.",
        questions: [
            "What common interest is strong enough to bring these different people together?",
            "Which disagreement actually needs resolution, and which differences can the group simply contain?",
            "What terms would allow people with different motives to work toward the same outcome?",
        ],
    },

    "Libra/12": {
        move: "Reconcile what cannot simply agree.",
        questions: [
            "What contradiction am I trying to resolve by choosing one side too quickly?",
            "Which rejected part of the situation still needs a place in the whole?",
            "What changes when I allow two opposing truths to remain present long enough to discover their relationship?",
        ],
    },

    // ─── Scorpio ───────────────────────────────────────────────────────────────

    "Scorpio/1": {
        move: "Act from what is real.",
        questions: [
            "Where am I presenting a safer version of myself than the one actually driving my choices?",
            "What truth about myself becomes harder to avoid once I act on it?",
            "What would I do differently if I stopped protecting an identity I have already outgrown?",
        ],
    },

    "Scorpio/2": {
        move: "Find what has real value.",
        questions: [
            "What would still matter to me if status, appearance and other people's valuation disappeared?",
            "Where am I holding onto something because losing it would force me to confront what it represents?",
            "What resource becomes available once I stop investing in what has already lost its value?",
        ],
    },

    "Scorpio/3": {
        move: "Follow the contradiction.",
        questions: [
            "What doesn't add up in the story I have been given?",
            "What question am I avoiding because I suspect the answer changes everything?",
            "What becomes visible if I follow this one layer deeper?",
        ],
    },

    "Scorpio/4": {
        move: "Excavate the foundation.",
        questions: [
            "What pattern in my family or past keeps operating even though nobody talks about it?",
            "What am I still protecting because exposing it would change the story I tell about where I came from?",
            "What becomes possible if I stop treating an inherited pattern as permanent?",
        ],
    },

    "Scorpio/5": {
        move: "Create from what has stakes.",
        questions: [
            "What am I afraid to put into the work because it reveals too much of me?",
            "Which creation would become more powerful if I stopped making it safe?",
            "What desire keeps returning because I have not yet given it an honest form?",
        ],
    },

    "Scorpio/6": {
        move: "Find the underlying cause.",
        questions: [
            "What recurring problem am I treating at the surface instead of investigating at the source?",
            "Which habit or system keeps producing an outcome I claim not to want?",
            "What would I have to change if I understood why this keeps happening?",
        ],
    },

    "Scorpio/7": {
        move: "Bring the hidden terms into the relationship.",
        questions: [
            "What are we each wanting from this relationship that neither of us has said directly?",
            "Where is power operating between us even though we pretend it is not?",
            "What truth would make this relationship either deeper or impossible to continue as it is?",
        ],
    },

    "Scorpio/8": {
        move: "Enter the transformation fully.",
        questions: [
            "What am I trying to control because surrendering it would change me?",
            "Which attachment has reached the point where preserving it costs more than letting it end?",
            "What can only emerge after I allow the old arrangement to become irretrievable?",
        ],
    },

    "Scorpio/9": {
        move: "Interrogate the belief.",
        questions: [
            "What assumption is holding my worldview together that I have never seriously questioned?",
            "Which belief survives because challenging it would threaten something deeper than the idea itself?",
            "What would I have to rethink if the strongest opposing argument were true?",
        ],
    },

    "Scorpio/10": {
        move: "Use power consciously.",
        questions: [
            "What power does my position give me whether or not I acknowledge having it?",
            "Where am I avoiding responsibility for an outcome I have more influence over than I admit?",
            "What would change if I used authority to transform the structure rather than merely succeed within it?",
        ],
    },

    "Scorpio/11": {
        move: "Expose what moves the group.",
        questions: [
            "What motive is shaping this collective that nobody is naming openly?",
            "Where is informal power actually located, regardless of the official structure?",
            "What would the group have to confront before genuine change became possible?",
        ],
    },

    "Scorpio/12": {
        move: "Descend into what you avoid.",
        questions: [
            "What keeps returning when I am quiet enough that distraction cannot cover it?",
            "Which fear becomes more powerful because I refuse to look at it directly?",
            "What part of myself have I pushed out of awareness that may be influencing me from there?",
        ],
    },

    // ─── Sagittarius ───────────────────────────────────────────────────────────

    "Sagittarius/1": {
        move: "Move toward the larger life.",
        questions: [
            "Where has my current identity become too small for what I want to experience?",
            "What would I attempt if I treated life as something to explore rather than preserve?",
            "What direction makes me feel more alive even before I know exactly where it leads?",
        ],
    },

    "Sagittarius/2": {
        move: "Invest in what expands you.",
        questions: [
            "Which resources give me greater freedom, range or possibility rather than simply more possessions?",
            "What am I willing to invest in because it enlarges the life I can live?",
            "Where am I protecting what I have at the cost of what I could become?",
        ],
    },

    "Sagittarius/3": {
        move: "Find the larger meaning.",
        questions: [
            "What larger pattern connects the facts I have gathered?",
            "Where am I accumulating information without deciding what I think it means?",
            "What conclusion becomes possible once I stop treating every detail as equally important?",
        ],
    },

    "Sagittarius/4": {
        move: "Expand the meaning of home.",
        questions: [
            "Which inherited beliefs about home or belonging have become too narrow for the life I am living?",
            "What experiences outside my origins have changed what belonging means to me?",
            "What kind of foundation would give me roots without limiting my range?",
        ],
    },

    "Sagittarius/5": {
        move: "Make the adventure.",
        questions: [
            "What would I create if I followed fascination further than practicality?",
            "Where has caution made my creative life smaller than my imagination?",
            "What experiment, journey or risk would give me a story worth telling?",
        ],
    },

    "Sagittarius/6": {
        move: "Connect the task to the purpose.",
        questions: [
            "What larger purpose makes this daily work worth doing?",
            "Where am I trapped in details because I have lost sight of what the work is for?",
            "What routine would make more of the life I actually want possible?",
        ],
    },

    "Sagittarius/7": {
        move: "Let the other person enlarge your world.",
        questions: [
            "What can this person show me that I could not discover from my own position?",
            "Where am I trying to convince rather than allowing myself to be changed by another perspective?",
            "What kind of relationship gives both of us more freedom and possibility than we had alone?",
        ],
    },

    "Sagittarius/8": {
        move: "Find meaning in the transformation.",
        questions: [
            "What is this loss, crisis or entanglement forcing me to understand differently?",
            "Where am I asking how to get back to the old life instead of asking what this experience has changed?",
            "What larger truth becomes visible only because something I relied on has been disrupted?",
        ],
    },

    "Sagittarius/9": {
        move: "Live by the larger truth.",
        questions: [
            "What do I believe strongly enough to organize my life around it?",
            "Which experience would test whether my worldview works beyond theory?",
            "What truth am I ready to teach because I have explored it deeply enough to stand behind it?",
        ],
    },

    "Sagittarius/10": {
        move: "Give the vision public direction.",
        questions: [
            "What larger possibility do I want my public work to move people toward?",
            "Where am I pursuing achievement without a compelling reason for achieving it?",
            "What could I become known for that expresses not just what I can do, but what I believe matters?",
        ],
    },

    "Sagittarius/11": {
        move: "Give the collective a horizon.",
        questions: [
            "What future could make these people willing to move together?",
            "Where is the group solving immediate problems without agreeing on where it ultimately wants to go?",
            "What larger possibility could turn a collection of interests into a shared mission?",
        ],
    },

    "Sagittarius/12": {
        move: "Trust the journey you cannot map.",
        questions: [
            "What experience am I being drawn toward even though I cannot yet explain its purpose?",
            "Where am I demanding a coherent meaning before I have lived enough of the story to discover one?",
            "What changes if I allow uncertainty itself to widen my understanding?",
        ],
    },

    // ─── Capricorn ─────────────────────────────────────────────────────────────

    "Capricorn/1": {
        move: "Become someone you can rely on.",
        questions: [
            "What standard do I want my own actions to consistently meet?",
            "Where am I waiting to feel ready instead of becoming ready through responsibility?",
            "What repeated choice would gradually build the person I intend to become?",
        ],
    },

    "Capricorn/2": {
        move: "Turn resources into capacity.",
        questions: [
            "What could I build with what I have rather than simply preserving it?",
            "Which resource would become more valuable if I deployed it toward a long-term aim?",
            "What am I accumulating that has not yet been given a productive purpose?",
        ],
    },

    "Capricorn/3": {
        move: "Put the facts in order.",
        questions: [
            "What needs to happen first before anything else can move?",
            "Which information actually changes the plan, and which is merely interesting?",
            "What sequence turns what I know into something I can act on?",
        ],
    },

    "Capricorn/4": {
        move: "Become the foundation.",
        questions: [
            "What responsibility for my home or family can no longer be left to someone else?",
            "Which inherited structure deserves preservation, and which one needs rebuilding?",
            "What could I establish now that would make the people who come after me more secure?",
        ],
    },

    "Capricorn/5": {
        move: "Finish what you create.",
        questions: [
            "What idea deserves enough discipline to become a finished work?",
            "Where am I relying on inspiration when the creation now needs structure?",
            "What would this become if I treated making it as a serious commitment?",
        ],
    },

    "Capricorn/6": {
        move: "Build the system that carries the work.",
        questions: [
            "What keeps depending on effort that should already have a process?",
            "Which responsibility needs a clear standard rather than another improvised solution?",
            "What structure would allow this work to continue reliably even when motivation disappears?",
        ],
    },

    "Capricorn/7": {
        move: "Define the commitment.",
        questions: [
            "What am I actually agreeing to when I enter this relationship?",
            "Which responsibility between us remains unclear because neither person has defined it?",
            "What commitment am I willing to make even when keeping it becomes inconvenient?",
        ],
    },

    "Capricorn/8": {
        move: "Take responsibility for what is shared.",
        questions: [
            "What obligation have I inherited or accepted that now requires active stewardship?",
            "Where is shared responsibility becoming nobody's responsibility because ownership is unclear?",
            "What difficult consequence needs to be dealt with rather than passed forward?",
        ],
    },

    "Capricorn/9": {
        move: "Turn the principle into a standard.",
        questions: [
            "What rule for action follows if I genuinely believe this principle?",
            "Which of my convictions am I willing to apply even when doing so costs me something?",
            "What larger framework could make difficult decisions more consistent rather than more arbitrary?",
        ],
    },

    "Capricorn/10": {
        move: "Carry the consequence.",
        questions: [
            "What outcome am I willing to be held personally responsible for?",
            "Where do I want authority without yet accepting the weight that comes with it?",
            "What would I build differently if I expected my decisions to be judged ten years from now?",
        ],
    },

    "Capricorn/11": {
        move: "Build something that outlasts the group.",
        questions: [
            "What structure would allow this collective effort to continue after its current leaders leave?",
            "Which shared ambition needs an institution rather than another burst of enthusiasm?",
            "What rules, resources or responsibilities must exist for this project to survive success?",
        ],
    },

    "Capricorn/12": {
        move: "Hold what no one sees.",
        questions: [
            "What responsibility still matters even if nobody ever recognizes me for carrying it?",
            "Which unseen obligation have I been postponing because there is no external pressure to complete it?",
            "What inner structure helps me remain steady when there is no visible measure of progress?",
        ],
    },

    // ─── Aquarius ──────────────────────────────────────────────────────────────

    "Aquarius/1": {
        move: "Define yourself outside the template.",
        questions: [
            "Which part of my identity exists mainly because other people expect it from me?",
            "What would I do differently if I stopped needing my choices to make sense to everyone else?",
            "Where does becoming more myself require being willing to become less familiar to others?",
        ],
    },

    "Aquarius/2": {
        move: "Redefine what has value.",
        questions: [
            "What valuable resource am I overlooking because it does not fit the conventional definition of an asset?",
            "Where am I measuring worth by a system whose assumptions I no longer believe?",
            "What new model could create value from something the existing arrangement wastes or ignores?",
        ],
    },

    "Aquarius/3": {
        move: "Question the frame.",
        questions: [
            "What assumption makes this problem look inevitable when it may only be conventional?",
            "What becomes possible if I reverse the way the question is normally asked?",
            "Which connection between seemingly unrelated ideas changes how I understand the whole problem?",
        ],
    },

    "Aquarius/4": {
        move: "Choose what belonging means.",
        questions: [
            "Which part of my inherited idea of home or family genuinely belongs to me?",
            "Where do I need distance from my origins in order to see them clearly?",
            "What kind of belonging could I create if blood, tradition or convention were not the only things defining it?",
        ],
    },

    "Aquarius/5": {
        move: "Make what does not exist yet.",
        questions: [
            "What would I create if originality mattered more than immediate recognition?",
            "Which experiment am I avoiding because I cannot predict whether it will work?",
            "What possibility becomes interesting precisely because there is no established model for it?",
        ],
    },

    "Aquarius/6": {
        move: "Redesign the system.",
        questions: [
            "What recurring problem is actually evidence that the underlying system is badly designed?",
            "Which task could disappear entirely if I changed the process instead of becoming better at performing it?",
            "What would this workflow look like if I were designing it from scratch today?",
        ],
    },

    "Aquarius/7": {
        move: "Collaborate without surrendering autonomy.",
        questions: [
            "What would partnership look like if neither person had to become more like the other?",
            "Where am I confusing commitment with conformity?",
            "What arrangement would give both of us more freedom because we chose to cooperate?",
        ],
    },

    "Aquarius/8": {
        move: "Redistribute the power.",
        questions: [
            "Who actually has control in this shared arrangement, regardless of what the formal terms say?",
            "Where has dependence become concentrated in a way that limits everyone's freedom?",
            "What different structure could distribute resources, risk or decision-making more intelligently?",
        ],
    },

    "Aquarius/9": {
        move: "Think from the future backward.",
        questions: [
            "Which assumption about how the world works may no longer be true in the world that is emerging?",
            "What becomes possible if I imagine the future without treating today's institutions as permanent?",
            "Which idea seems unrealistic only because I am evaluating it through the logic of the present?",
        ],
    },

    "Aquarius/10": {
        move: "Change the structure publicly.",
        questions: [
            "Which institution, profession or public system no longer serves the purpose it was built for?",
            "Where could I use my position to change the rules rather than merely succeed under them?",
            "What reform would I still advocate if benefiting personally from the existing system were no longer part of the calculation?",
        ],
    },

    "Aquarius/11": {
        move: "Organize the network.",
        questions: [
            "What could these people accomplish together that none of them needs to control alone?",
            "Where is the collective still depending on a central person or structure it has outgrown?",
            "What shared protocol, platform or purpose would allow independent people to coordinate themselves?",
        ],
    },

    "Aquarius/12": {
        move: "Stand outside long enough to see.",
        questions: [
            "What becomes obvious only when I stop participating in the system for a while?",
            "Which assumption feels natural simply because I have never experienced life outside it?",
            "What can solitude or distance show me that constant involvement keeps invisible?",
        ],
    },


    // ─── Pisces ────────────────────────────────────────────────────────────────

    "Pisces/1": {
        move: "Let identity remain alive.",
        questions: [
            "Which version of myself am I holding onto because having a fixed identity feels safer than changing?",
            "What part of me appears only when I stop trying to define who I am?",
            "Where could greater openness let me become something I could not have planned in advance?",
        ],
    },

    "Pisces/2": {
        move: "Let value circulate.",
        questions: [
            "What becomes more valuable when I share it rather than keep it entirely for myself?",
            "Where am I treating possession as the only form of security?",
            "What could I give, support or contribute without needing an immediate return?",
        ],
    },

    "Pisces/3": {
        move: "Say what facts cannot.",
        questions: [
            "What am I sensing that literal language does not quite capture?",
            "Which image, metaphor or story expresses this more truthfully than an explanation would?",
            "What becomes understandable when I stop trying to make every thought completely logical?",
        ],
    },

    "Pisces/4": {
        move: "Become a place of refuge.",
        questions: [
            "What allows me or another person to arrive without immediately having to explain ourselves?",
            "Where am I confusing emotional openness with having no boundaries at all?",
            "What kind of home could hold uncertainty, vulnerability and change without making belonging conditional on fixing them?",
        ],
    },

    "Pisces/5": {
        move: "Follow the image.",
        questions: [
            "What wants to be created before I fully understand what it means?",
            "Where am I interrupting imagination by demanding a practical purpose too early?",
            "What appears when I let the work surprise me instead of forcing it toward the outcome I planned?",
        ],
    },

    "Pisces/6": {
        move: "Serve what actually needs care.",
        questions: [
            "What need am I sensing that cannot be solved by efficiency alone?",
            "Where am I absorbing another person's difficulty instead of finding the form of help that is actually mine to give?",
            "How can I turn compassion into a concrete act without making myself responsible for everything?",
        ],
    },

    "Pisces/7": {
        move: "Meet the person behind the role.",
        questions: [
            "Who is this person when I stop relating to the version of them I imagined?",
            "Where am I dissolving my own needs in order to remain connected?",
            "Can I understand another person deeply without needing either of us to disappear into the relationship?",
        ],
    },

    "Pisces/8": {
        move: "Surrender to what changes you.",
        questions: [
            "What am I trying to keep separate that has already become deeply entangled?",
            "Where am I resisting an ending because I cannot imagine who I will be after it?",
            "What transformation becomes possible when I stop demanding complete control over what happens next?",
        ],
    },

    "Pisces/9": {
        move: "Experience the mystery.",
        questions: [
            "What have I understood intellectually that I have never actually experienced?",
            "Where has explaining my worldview become a substitute for encountering what it points toward?",
            "What might remain meaningful even if I can never prove or completely define it?",
        ],
    },

    "Pisces/10": {
        move: "Let the work carry something larger.",
        questions: [
            "What wants to move through my work that is larger than my personal ambition?",
            "Where am I trying to control how my contribution will be understood instead of making the contribution itself?",
            "What could I offer publicly if usefulness, compassion or imagination mattered more than recognition?",
        ],
    },

    "Pisces/11": {
        move: "Widen the circle of concern.",
        questions: [
            "Whose experience remains outside the boundaries of the group I naturally identify with?",
            "What shared human need exists beneath the differences separating these people?",
            "Where could compassion connect people whom ideology, geography or identity keeps apart?",
        ],
    },

    "Pisces/12": {
        move: "Let the boundary dissolve.",
        questions: [
            "What happens when I stop requiring every inner experience to become understandable?",
            "What am I still trying to control that can only be met through surrender?",
            "What becomes perceptible when I become quiet enough to stop separating myself from the experience?",
        ],
    },
};

export function archetypeQuestionsFor(
    sign: string,
    house: number | null,
): ArchetypeQuestionsEntry | null {
    if (house === null) return null;

    return ARCHETYPE_QUESTIONS[`${sign}/${house}`] ?? null;
}