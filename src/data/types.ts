/**
 * The 16 type profiles.
 *
 * Content lives as structured data rather than sixteen hand-written pages so
 * every profile carries the same sections, the same depth, and — critically —
 * its own validated title and meta description. The reference audit's target
 * shipped type pages with no descriptions at all; here a profile without one
 * will not compile.
 */

export interface CareerFit {
  readonly title: string;
  readonly why: string;
}

export interface StackSlot {
  readonly role: 'Dominant' | 'Auxiliary' | 'Tertiary' | 'Inferior';
  readonly fn: string;
  readonly gloss: string;
}

export interface TypeProfile {
  readonly code: string;
  readonly nickname: string;
  /** One-sentence summary used on cards and list pages. */
  readonly summary: string;
  /** Validated meta description, 70-165 characters. */
  readonly metaDescription: string;
  readonly population: string;
  readonly stack: readonly StackSlot[];
  readonly atBest: string;
  readonly underStress: string;
  readonly strengths: readonly string[];
  readonly blindSpots: readonly string[];
  readonly careers: readonly CareerFit[];
  readonly workEnvironment: string;
  readonly drains: string;
  readonly withOthers: string;
}

export const TYPES: readonly TypeProfile[] = [
  {
    code: 'INFJ',
    nickname: 'The Counsellor',
    summary: 'Private, future-focused, and unusually attentive to what people are not saying.',
    metaDescription:
      'INFJ personality type explained: cognitive stack, real strengths and blind spots, and the careers INFJs actually stay in. Free, no signup required.',
    population: 'Roughly 1-2% of people, making it the least common type.',
    stack: [
      { role: 'Dominant', fn: 'Introverted Intuition (Ni)', gloss: 'Converges on a single underlying pattern and trusts it before the evidence is complete.' },
      { role: 'Auxiliary', fn: 'Extraverted Feeling (Fe)', gloss: 'Reads the emotional temperature of a room and adjusts to keep it workable.' },
      { role: 'Tertiary', fn: 'Introverted Thinking (Ti)', gloss: 'Quietly audits whether an idea is internally consistent.' },
      { role: 'Inferior', fn: 'Extraverted Sensing (Se)', gloss: 'Under-used contact with the immediate physical present.' },
    ],
    atBest:
      'At their best, INFJs turn a vague sense that something is wrong into a specific, actionable insight that other people can act on. They are the person who names the dynamic everyone else was tiptoeing around, and who does it in language that makes the room feel understood rather than exposed. Given a long horizon and genuine autonomy, they will quietly build something coherent while others are still arguing about the framing.',
    underStress:
      'Under sustained stress an INFJ tends to withdraw and over-interpret. Small social signals get read as evidence of a larger rupture, and the pattern-matching that is normally their strength starts generating conclusions the facts do not support. The classic stress release is an uncharacteristic lunge at the physical world — overeating, compulsive exercise, a sudden spending spree — which is inferior Se breaking loose rather than a change of character.',
    strengths: [
      'Sees the shape of a problem long before the data is conclusive',
      'Communicates hard truths in a way people can actually absorb',
      'Sustains commitment to a long project without external pressure',
      'Notices the one person in the room who has gone quiet',
      'Holds a principled line even when it costs them socially',
    ],
    blindSpots: [
      'Treats a private conclusion as settled fact without testing it out loud',
      'Absorbs other people’s emotional weather until their own state is unreadable',
      'Withdraws instead of raising a problem while it is still small',
      'Perfectionism delays shipping work that was good enough weeks ago',
      'Struggles to notice physical needs until the body forces the issue',
    ],
    careers: [
      { title: 'Clinical or counselling psychologist', why: 'Depth of attention and pattern-reading applied to one person at a time, with the boundaries the role provides.' },
      { title: 'UX researcher', why: 'Turning what users half-say into a coherent account of what they need is close to native work for Ni plus Fe.' },
      { title: 'Curriculum or instructional designer', why: 'Long-horizon structure building with a clear human beneficiary and few interruptions.' },
      { title: 'Editor or developmental editor', why: 'Sensing the argument a writer is reaching for and helping them land it.' },
      { title: 'Non-profit programme lead', why: 'Mission alignment matters more to INFJs than compensation, and this role rewards it.' },
      { title: 'Organisational or L&D consultant', why: 'Diagnosing why a team keeps failing in the same way, which is pattern work with people attached.' },
      { title: 'Writer, researcher, or long-form journalist', why: 'Solitary synthesis with a public payoff.' },
      { title: 'Speech and language or occupational therapist', why: 'Structured one-to-one work with visible, incremental human progress.' },
    ],
    workEnvironment:
      'INFJs need a door that closes, a horizon longer than the current sprint, and a manager who asks for their read rather than only their output. They do poorly in open-plan sales floors and well in small teams with a clearly stated purpose.',
    drains:
      'Constant interruption, shallow social performance, work whose purpose nobody can articulate, and environments where raising a concern is treated as disloyalty.',
    withOthers:
      'INFJs form few friendships and hold them for decades. They tend to give more than they ask for, then feel quietly resentful about an imbalance they never mentioned. The single most useful habit an INFJ can build is saying the thing at week one instead of month six.',
  },
  {
    code: 'INFP',
    nickname: 'The Idealist',
    summary: 'Guided by an internal set of values they rarely explain and never compromise.',
    metaDescription:
      'INFP personality type explained: cognitive functions, honest strengths and blind spots, and careers that fit INFP values. Free test, no email needed.',
    population: 'Roughly 4% of people.',
    stack: [
      { role: 'Dominant', fn: 'Introverted Feeling (Fi)', gloss: 'Measures everything against a private, deeply felt standard of what is right.' },
      { role: 'Auxiliary', fn: 'Extraverted Intuition (Ne)', gloss: 'Generates possibilities outward in every direction at once.' },
      { role: 'Tertiary', fn: 'Introverted Sensing (Si)', gloss: 'Draws on accumulated personal experience as a reference point.' },
      { role: 'Inferior', fn: 'Extraverted Thinking (Te)', gloss: 'Under-developed capacity for external structure, metrics, and logistics.' },
    ],
    atBest:
      'INFPs bring moral seriousness to work that other people treat as routine. They notice when a process quietly harms someone and they will not let it go. Paired with Ne, that conviction becomes genuine creative range — they can imagine a dozen versions of how things could be fairer and describe them in language that moves people.',
    underStress:
      'Stress pushes INFPs into harsh, uncharacteristically rigid judgement, often aimed at themselves. Inferior Te shows up as frantic list-making and a conviction that they are objectively failing by some measurable standard they would normally reject as meaningless. Withdrawal deepens, and the gap between their ideal and their actual output becomes painful.',
    strengths: [
      'Unusual clarity about what they will and will not do',
      'Writes and speaks with warmth that does not feel performed',
      'Sees the individual human cost inside an aggregate decision',
      'Generates genuinely original framings of familiar problems',
      'Accepts other people’s oddities without needing to fix them',
    ],
    blindSpots: [
      'Avoids necessary conflict until the situation has already deteriorated',
      'Starts far more projects than any person could finish',
      'Reads disagreement about ideas as rejection of self',
      'Underestimates how much structure they would actually benefit from',
      'Defers practical decisions until circumstances decide for them',
    ],
    careers: [
      { title: 'Writer, novelist, or content designer', why: 'Fi supplies the conviction and Ne supplies the range; both reward solitary drafting.' },
      { title: 'Counsellor or therapist', why: 'Sustained, values-driven attention to one person, without the performance demands of group work.' },
      { title: 'Librarian or archivist', why: 'Quiet, meaningful stewardship with clear boundaries and low interruption.' },
      { title: 'Social worker or case manager', why: 'Direct human impact, though burnout risk is high without firm limits.' },
      { title: 'Graphic or brand designer', why: 'Craft plus self-expression, with a brief to push against.' },
      { title: 'Teacher, especially arts or humanities', why: 'Values transmission to individuals, which INFPs find genuinely sustaining.' },
      { title: 'Non-profit communications lead', why: 'Advocacy writing lets conviction and craft run in the same direction.' },
      { title: 'Translator or localisation specialist', why: 'Precise, solitary work with a strong element of judgement and voice.' },
    ],
    workEnvironment:
      'INFPs need autonomy over how work gets done and a mission they can believe without irony. Light structure imposed from outside actually helps them, provided it is not framed as surveillance.',
    drains:
      'Aggressive sales targets, office politics, being asked to defend a position they do not hold, and any environment where people are treated as headcount.',
    withOthers:
      'INFPs are warm but slow to reveal themselves, and they tend to idealise people early then feel quietly disappointed. They do best with partners and colleagues who ask direct questions and do not read silence as agreement.',
  },
  {
    code: 'INTJ',
    nickname: 'The Strategist',
    summary: 'Builds a long-range model of how something works, then rebuilds the thing to match.',
    metaDescription:
      'INTJ personality type explained: cognitive stack, genuine strengths, real blind spots, and careers INTJs thrive in. Free assessment, no signup.',
    population: 'Roughly 2% of people.',
    stack: [
      { role: 'Dominant', fn: 'Introverted Intuition (Ni)', gloss: 'Builds one converging model of how a system will behave over time.' },
      { role: 'Auxiliary', fn: 'Extraverted Thinking (Te)', gloss: 'Organises the outside world to match that model efficiently.' },
      { role: 'Tertiary', fn: 'Introverted Feeling (Fi)', gloss: 'A private value core that rarely gets voiced.' },
      { role: 'Inferior', fn: 'Extraverted Sensing (Se)', gloss: 'Weak link to immediate physical detail and the present moment.' },
    ],
    atBest:
      'INTJs are the people who notice that the current approach cannot work, say so early, and have already sketched the alternative. They combine an unusual tolerance for being the only person holding a position with the executive drive to actually implement it. Give an INTJ a badly designed system and real authority, and they will quietly return a better one.',
    underStress:
      'Stressed INTJs become dismissive and increasingly certain, discarding input that would have complicated the model. When inferior Se erupts it looks like sudden indulgence or reckless physical risk-taking that colleagues find baffling. The deeper failure mode is isolation: deciding that nobody else is worth consulting, then being wrong alone.',
    strengths: [
      'Thinks several moves beyond the immediate decision',
      'Detaches personal ego from whether a plan is correct',
      'Rebuilds broken processes rather than routing around them',
      'Comfortable holding an unpopular position on evidence',
      'Learns complex domains quickly and independently',
    ],
    blindSpots: [
      'Assumes an unspoken plan is obvious to everyone else',
      'Dismisses emotional data as noise when it is actually signal',
      'Underinvests in the relationships that would let the plan land',
      'Confuses confidence in the model with having tested it',
      'Impatient with people who need the reasoning spelled out',
    ],
    careers: [
      { title: 'Systems or software architect', why: 'Long-horizon structural thinking with authority to shape the whole design.' },
      { title: 'Strategy consultant or corporate strategist', why: 'Diagnosing why an organisation keeps losing and rebuilding the approach.' },
      { title: 'Data scientist or quantitative analyst', why: 'Model-building rewarded directly, with minimal social overhead.' },
      { title: 'Investment analyst or portfolio manager', why: 'Independent judgement against a long time horizon, scored objectively.' },
      { title: 'Research scientist', why: 'Deep domain mastery and self-directed problem selection.' },
      { title: 'Product manager, technical', why: 'Works when authority is real; frustrating when the role is pure coordination.' },
      { title: 'Engineering or R&D manager', why: 'Te drive plus Ni foresight, applied to a team that shares the vocabulary.' },
      { title: 'Operations or supply chain designer', why: 'Redesigning a complex system for efficiency is close to recreational for INTJs.' },
    ],
    workEnvironment:
      'INTJs need competent colleagues, decisions made on argument rather than seniority, and enough authority to change the thing they were asked to fix. Status meetings without decisions are corrosive to them.',
    drains:
      'Micromanagement, mandatory enthusiasm, consensus processes that ignore evidence, and being asked to execute a plan they have already shown to be flawed.',
    withOthers:
      'INTJs are loyal to a very small circle and blunt inside it. They tend to communicate care through problem-solving, which lands poorly on people who wanted to be heard rather than fixed. Learning to ask "do you want input or company?" solves most of it.',
  },
  {
    code: 'INTP',
    nickname: 'The Analyst',
    summary: 'Takes ideas apart to see whether they actually hold together, mostly for its own sake.',
    metaDescription:
      'INTP personality type explained: cognitive functions, strengths, blind spots, and careers that suit INTP thinking. Free test with instant results.',
    population: 'Roughly 3-4% of people.',
    stack: [
      { role: 'Dominant', fn: 'Introverted Thinking (Ti)', gloss: 'Builds a precise internal framework and tests everything against it.' },
      { role: 'Auxiliary', fn: 'Extraverted Intuition (Ne)', gloss: 'Throws off alternative possibilities and edge cases constantly.' },
      { role: 'Tertiary', fn: 'Introverted Sensing (Si)', gloss: 'Recalls specific prior detail that contradicts the current claim.' },
      { role: 'Inferior', fn: 'Extraverted Feeling (Fe)', gloss: 'Uncertain handling of group emotional expectations.' },
    ],
    atBest:
      'INTPs find the flaw. Given a proposal that everyone else has nodded along to, they will locate the assumption it rests on and ask whether it is true. Combined with Ne, this becomes real inventiveness: they hold several incompatible models at once without needing to resolve them prematurely, which is exactly the posture that produces novel solutions.',
    underStress:
      'Under pressure INTPs retreat further into analysis and stop producing anything. Deadlines become unreal. Inferior Fe surfaces as sudden, disproportionate emotional outbursts or an anxious conviction that the group dislikes them, which sits oddly against their usual detachment.',
    strengths: [
      'Detects the hidden assumption inside a confident claim',
      'Genuinely changes position when shown better reasoning',
      'Builds precise mental models of complicated systems',
      'Unbothered by ambiguity and unresolved questions',
      'Explains difficult ideas clearly once engaged',
    ],
    blindSpots: [
      'Optimises understanding over shipping, indefinitely',
      'Corrects trivial inaccuracies at socially expensive moments',
      'Neglects routine logistics until they become emergencies',
      'Mistakes internal coherence for external validity',
      'Goes quiet rather than managing an interpersonal problem',
    ],
    careers: [
      { title: 'Software engineer', why: 'Immediate feedback on whether the model is right, with deep problems available.' },
      { title: 'Research scientist or academic', why: 'Rewarded for rigour and for questions that do not resolve quickly.' },
      { title: 'Data or systems analyst', why: 'Finding what the numbers actually support rather than what was hoped.' },
      { title: 'Security researcher', why: 'Professional scepticism as the core job function.' },
      { title: 'Economist or policy analyst', why: 'Model-building against messy real-world data.' },
      { title: 'Technical writer or documentation lead', why: 'Precision plus explanation, with low interpersonal overhead.' },
      { title: 'Philosophy, mathematics, or logic educator', why: 'Ti applied to foundations, which INTPs find intrinsically motivating.' },
      { title: 'Architect (software or systems) in a small team', why: 'Design influence without the meeting load of formal management.' },
    ],
    workEnvironment:
      'INTPs need unstructured thinking time, colleagues who argue on merit, and the freedom to follow a tangent that might pay off. Rigid process and constant status reporting reliably drive them out.',
    drains:
      'Enforced small talk, decisions by seniority, work that is purely repetitive execution, and being asked to be enthusiastic on cue.',
    withOthers:
      'INTPs are easy company and hard to know. They often assume affection is self-evident and do not restate it. Relationships go better when they treat explicit reassurance as a maintenance task rather than redundancy.',
  },
  {
    code: 'ENFJ',
    nickname: 'The Mentor',
    summary: 'Organises people toward a shared goal and notices who is being left behind doing it.',
    metaDescription:
      'ENFJ personality type explained: cognitive stack, leadership strengths, blind spots, and careers where ENFJs excel. Free test, results on screen.',
    population: 'Roughly 2-3% of people.',
    stack: [
      { role: 'Dominant', fn: 'Extraverted Feeling (Fe)', gloss: 'Actively manages group harmony and the needs of the people in it.' },
      { role: 'Auxiliary', fn: 'Introverted Intuition (Ni)', gloss: 'Holds a clear picture of where this group should end up.' },
      { role: 'Tertiary', fn: 'Extraverted Sensing (Se)', gloss: 'Reads the immediate room and responds in real time.' },
      { role: 'Inferior', fn: 'Introverted Thinking (Ti)', gloss: 'Less comfortable with cold, impersonal analysis of their own logic.' },
    ],
    atBest:
      'ENFJs make groups better at being groups. They articulate a direction people actually want to follow, then do the unglamorous work of checking whether each person has what they need to get there. They are unusually good at telling someone a hard thing about their performance in a way that leaves them motivated rather than defensive.',
    underStress:
      'Stressed ENFJs over-function: taking on other people’s responsibilities, managing everyone’s feelings, and quietly running out of capacity. Inferior Ti then turns inward as obsessive, hair-splitting self-criticism, or as uncharacteristically cutting logical attacks on someone who disappointed them.',
    strengths: [
      'Turns a vague goal into something a group can rally behind',
      'Gives difficult feedback without damaging the relationship',
      'Spots the quiet person whose contribution is being missed',
      'Builds trust quickly and across differences',
      'Follows through on commitments to people',
    ],
    blindSpots: [
      'Takes responsibility for outcomes that were never theirs',
      'Avoids decisions that would upset someone, past the point of usefulness',
      'Reads their own needs last, and often too late',
      'Can over-manage people who wanted to be left alone',
      'Takes criticism of the plan as criticism of themselves',
    ],
    careers: [
      { title: 'Teacher or head of department', why: 'Sustained development of individuals inside a shared direction.' },
      { title: 'Learning and development lead', why: 'Designing growth for people at organisational scale.' },
      { title: 'HR business partner', why: 'Fe as the core competency, provided the organisation is not purely adversarial.' },
      { title: 'Non-profit or programme director', why: 'Mission plus people plus long horizon, which is the ENFJ sweet spot.' },
      { title: 'Engagement or community manager', why: 'Building a group that holds together without constant intervention.' },
      { title: 'Executive or leadership coach', why: 'One-to-one development with a clear outcome and real depth.' },
      { title: 'Public health or advocacy lead', why: 'Persuasion at scale toward a genuinely held goal.' },
      { title: 'Sales leadership, values-aligned', why: 'ENFJs sell well when they believe it, and badly when they do not.' },
    ],
    workEnvironment:
      'ENFJs need a mission they endorse, contact with the people the work affects, and a manager who notices when they are absorbing too much. Purely transactional environments erode them.',
    drains:
      'Working alone for long stretches, being asked to implement decisions that hurt people, cynical cultures, and roles with no visible human outcome.',
    withOthers:
      'ENFJs are generous and can be subtly controlling about it, steering people toward what they believe is best. The healthy version asks rather than assumes, and keeps a relationship or two where they are allowed to be the one who needs help.',
  },
  {
    code: 'ENFP',
    nickname: 'The Catalyst',
    summary: 'Sees possibility everywhere and pulls other people into it with real warmth.',
    metaDescription:
      'ENFP personality type explained: cognitive functions, strengths, honest blind spots, and careers that suit ENFP energy. Free test, no email gate.',
    population: 'Roughly 7-8% of people.',
    stack: [
      { role: 'Dominant', fn: 'Extraverted Intuition (Ne)', gloss: 'Generates connections and possibilities outward, rapidly and continuously.' },
      { role: 'Auxiliary', fn: 'Introverted Feeling (Fi)', gloss: 'Filters those possibilities through a strong personal value system.' },
      { role: 'Tertiary', fn: 'Extraverted Thinking (Te)', gloss: 'Can organise and drive execution in bursts.' },
      { role: 'Inferior', fn: 'Introverted Sensing (Si)', gloss: 'Weak relationship with routine, precedent, and accumulated detail.' },
    ],
    atBest:
      'ENFPs create momentum. They connect an idea in one domain to a problem in another, then make the connection contagious enough that other people start working on it. Paired with Fi, that energy has a spine: they will not champion something they think is wrong, however exciting it looks.',
    underStress:
      'Overloaded ENFPs scatter, leaving a trail of promising unfinished starts and a growing sense of guilt. Inferior Si arrives as gloomy fixation on past mistakes and bodily complaints, or a sudden rigid insistence on detail that is unlike them.',
    strengths: [
      'Finds the non-obvious connection between two unrelated things',
      'Gets people genuinely invested rather than merely compliant',
      'Adapts fast when circumstances change',
      'Holds a real ethical line under social pressure',
      'Makes newcomers feel immediately included',
    ],
    blindSpots: [
      'Commits enthusiastically and then cannot deliver all of it',
      'Loses interest once the interesting part is solved',
      'Neglects the administrative tail of their own projects',
      'Takes on other people’s emotional states as their own',
      'Avoids routine maintenance until something breaks',
    ],
    careers: [
      { title: 'Journalist or podcast producer', why: 'Curiosity rewarded, variety built in, deadlines that force completion.' },
      { title: 'Brand or campaign strategist', why: 'Ne generates the angles; Fi keeps the work from being cynical.' },
      { title: 'Startup founder or early employee', why: 'High ambiguity and fast change suit ENFPs better than most.' },
      { title: 'Teacher or trainer', why: 'Improvisational, relational, and never the same day twice.' },
      { title: 'Product designer or design researcher', why: 'Divergent thinking with users at the centre.' },
      { title: 'Community or partnerships lead', why: 'Relationship building across many groups at once.' },
      { title: 'Career or life coach', why: 'Possibility-thinking applied directly to a person who wants it.' },
      { title: 'Creative director', why: 'Works best with a strong operational partner handling the tail.' },
    ],
    workEnvironment:
      'ENFPs need variety, people, and permission to pursue a promising tangent. They are far more effective when paired with someone who owns the follow-through, and they should stop treating that as a character flaw.',
    drains:
      'Repetitive process work, isolation, rigid hierarchy, long approval chains, and jobs where the interesting question is never asked.',
    withOthers:
      'ENFPs invest quickly and deeply, and can drift when novelty fades. The relationships that last are the ones where they build small rituals — the Si work they find unnatural — rather than relying on enthusiasm alone.',
  },
  {
    code: 'ENTJ',
    nickname: 'The Commander',
    summary: 'Identifies the objective, builds the structure to reach it, and starts moving.',
    metaDescription:
      'ENTJ personality type explained: cognitive stack, leadership strengths, blind spots, and careers where ENTJs perform. Free test, instant results.',
    population: 'Roughly 2% of people.',
    stack: [
      { role: 'Dominant', fn: 'Extraverted Thinking (Te)', gloss: 'Organises people, resources, and timelines toward a measurable outcome.' },
      { role: 'Auxiliary', fn: 'Introverted Intuition (Ni)', gloss: 'Supplies the long-range picture that the structure serves.' },
      { role: 'Tertiary', fn: 'Extraverted Sensing (Se)', gloss: 'Responds decisively to what is happening right now.' },
      { role: 'Inferior', fn: 'Introverted Feeling (Fi)', gloss: 'Under-examined personal values and emotional interior.' },
    ],
    atBest:
      'ENTJs convert intent into apparatus. Where others describe a goal, an ENTJ names the owner, the date, and the measure, and then holds the line on all three. They are comfortable making decisions with incomplete information and revisiting them without embarrassment when the information improves.',
    underStress:
      'Pressure makes ENTJs blunter and more controlling, treating people as capacity rather than colleagues. Inferior Fi eventually surfaces as unexpected emotional overwhelm, often about something that seems disproportionate, or as a delayed realisation that they have been building the wrong thing for reasons they never examined.',
    strengths: [
      'Decides quickly and takes responsibility for the call',
      'Builds structures that survive their own absence',
      'Says the uncomfortable thing that unblocks a meeting',
      'Recovers from failure without prolonged self-doubt',
      'Develops people fast by giving them real stakes',
    ],
    blindSpots: [
      'Runs over quieter contributors without registering it',
      'Optimises the measurable and ignores what is not measured',
      'Impatient with process that protects people, not output',
      'Neglects their own values until a crisis forces the question',
      'Mistakes speed of decision for quality of decision',
    ],
    careers: [
      { title: 'Executive or general manager', why: 'The role is Te at institutional scale, which is where ENTJs are most at home.' },
      { title: 'Management consultant', why: 'Diagnose, restructure, move on — with objective outcomes.' },
      { title: 'Founder or COO', why: 'Building the machine rather than only the product.' },
      { title: 'Investment banking or private equity', why: 'High stakes, clear scoreboard, decisive judgement rewarded.' },
      { title: 'Programme or portfolio director', why: 'Coordinating many moving parts against a hard deadline.' },
      { title: 'Litigator', why: 'Adversarial structure with a defined win condition.' },
      { title: 'Sales director', why: 'Targets, teams, and territory design all reward Te.' },
      { title: 'Military or emergency services command', why: 'Decision-making under pressure with clear chains of responsibility.' },
    ],
    workEnvironment:
      'ENTJs need authority proportional to accountability, colleagues who push back with evidence, and an organisation that will actually move. They stagnate badly in slow, consensus-bound institutions.',
    drains:
      'Ambiguous ownership, meetings without decisions, being managed in detail, and environments where competence is not the basis for influence.',
    withOthers:
      'ENTJs are direct and can read as harsh when they mean efficient. Close relationships improve markedly when they treat listening without solving as a deliberate practice, and when they let someone see the part of them that is not competent yet.',
  },
  {
    code: 'ENTP',
    nickname: 'The Challenger',
    summary: 'Argues with the premise, usually productively, occasionally at the worst moment.',
    metaDescription:
      'ENTP personality type explained: cognitive functions, real strengths, blind spots, and careers that reward ENTP thinking. Free test, no signup.',
    population: 'Roughly 3% of people.',
    stack: [
      { role: 'Dominant', fn: 'Extraverted Intuition (Ne)', gloss: 'Generates alternatives and counter-cases at speed.' },
      { role: 'Auxiliary', fn: 'Introverted Thinking (Ti)', gloss: 'Tests each one for internal consistency.' },
      { role: 'Tertiary', fn: 'Extraverted Feeling (Fe)', gloss: 'Reads and plays the room, often for effect.' },
      { role: 'Inferior', fn: 'Introverted Sensing (Si)', gloss: 'Poor relationship with routine, precedent, and follow-through.' },
    ],
    atBest:
      'ENTPs stress-test ideas before reality does. They will take the opposite side of a proposal not to obstruct it but to find out whether it survives contact, and they do it fast enough to save a team months. The same machinery makes them genuinely inventive — recombining known pieces into something nobody had assembled before.',
    underStress:
      'Stressed ENTPs argue for sport, burn credibility they will need later, and accumulate half-built projects. Inferior Si produces uncharacteristic gloom, fixation on physical symptoms, or a sudden brittle insistence that things be done exactly as before.',
    strengths: [
      'Finds the failure mode in a plan before it is expensive',
      'Reframes a stuck problem into a tractable one',
      'Learns new domains quickly and connects them',
      'Comfortable being the dissenting voice',
      'Quick, genuinely funny, and good in a crisis',
    ],
    blindSpots: [
      'Wins the argument and loses the relationship',
      'Abandons projects once the puzzle is solved',
      'Underrates the work of maintaining what exists',
      'Debates when the other person needed support',
      'Treats consistency as a lesser virtue than it is',
    ],
    careers: [
      { title: 'Founder or product lead', why: 'Ambiguity, invention, and fast iteration play directly to Ne plus Ti.' },
      { title: 'Management or strategy consultant', why: 'Paid to challenge the client’s framing and leave before maintenance starts.' },
      { title: 'Trial lawyer', why: 'Adversarial reasoning as the literal job.' },
      { title: 'Venture investor', why: 'Pattern-matching across domains with a tolerance for being wrong often.' },
      { title: 'Growth or performance marketer', why: 'Continuous experimentation with fast feedback.' },
      { title: 'Engineer in R&D or prototyping', why: 'Build, break, rebuild, without owning long-term operations.' },
      { title: 'Journalist or commentator', why: 'Rewarded for finding the angle nobody else took.' },
      { title: 'Creative or innovation director', why: 'Works best with an operator handling delivery.' },
    ],
    workEnvironment:
      'ENTPs need real problems, people who will argue back, and the freedom to change approach. They should deliberately partner with a completer-finisher rather than pretending they will become one.',
    drains:
      'Rigid process, deference to authority for its own sake, repetitive operations work, and cultures where dissent is punished.',
    withOthers:
      'ENTPs are engaging and can be exhausting. The single highest-return habit is asking "do you want me to poke holes in this, or not right now?" before doing it anyway.',
  },
  {
    code: 'ISTJ',
    nickname: 'The Steward',
    summary: 'Keeps the commitments other people forget they made, and remembers the details.',
    metaDescription:
      'ISTJ personality type explained: cognitive stack, dependable strengths, blind spots, and careers that suit ISTJs. Free test with instant results.',
    population: 'Roughly 11-12% of people, one of the most common types.',
    stack: [
      { role: 'Dominant', fn: 'Introverted Sensing (Si)', gloss: 'Compares the present against a detailed store of what has worked before.' },
      { role: 'Auxiliary', fn: 'Extraverted Thinking (Te)', gloss: 'Applies that experience through orderly, efficient execution.' },
      { role: 'Tertiary', fn: 'Introverted Feeling (Fi)', gloss: 'A quiet, firmly held sense of duty and fairness.' },
      { role: 'Inferior', fn: 'Extraverted Intuition (Ne)', gloss: 'Limited appetite for speculative, untested possibility.' },
    ],
    atBest:
      'ISTJs are the reason institutions work. They notice the discrepancy in the reconciliation, remember the exception agreed to three years ago, and do what they said they would do without being chased. Their reliability is not passivity — it is an active, effortful commitment to getting things right that most organisations badly undervalue until it is absent.',
    underStress:
      'Stress narrows an ISTJ onto procedure, and they can defend a process past the point where it serves anyone. Inferior Ne arrives as catastrophising: uncharacteristic, vivid certainty that things will go disastrously wrong in ways they cannot specify.',
    strengths: [
      'Delivers what was promised, on the date promised',
      'Retains specific, accurate detail others lose',
      'Spots the inconsistency in a set of numbers',
      'Stays calm and methodical when a process fails',
      'Holds standards without needing to be watched',
    ],
    blindSpots: [
      'Defends the established way after it stops working',
      'Underweights an option because it has no precedent',
      'Says no to a change before fully hearing it',
      'Assumes their own effort is visible when it is not',
      'Struggles to delegate work they know they would do correctly',
    ],
    careers: [
      { title: 'Auditor or accountant', why: 'Detail accuracy and procedural rigour are the whole job.' },
      { title: 'Compliance or risk officer', why: 'Si memory plus Te structure applied to rules that genuinely matter.' },
      { title: 'Project or operations manager', why: 'Owning schedule, scope, and follow-through.' },
      { title: 'Database or systems administrator', why: 'Careful stewardship of something everyone depends on.' },
      { title: 'Civil engineer or quantity surveyor', why: 'Precision with real-world consequences for error.' },
      { title: 'Paralegal or legal operations', why: 'Exacting documentary work with clear standards.' },
      { title: 'Logistics or inventory manager', why: 'Physical systems that reward accuracy and consistency.' },
      { title: 'Clinical laboratory technologist', why: 'Protocol-driven work where deviation has consequences.' },
    ],
    workEnvironment:
      'ISTJs need clear expectations, stable priorities, and recognition that is concrete rather than effusive. Constant reorganisation is the fastest way to lose one.',
    drains:
      'Shifting goalposts, vague briefs, forced brainstorming, and colleagues who treat commitments as provisional.',
    withOthers:
      'ISTJs show care through reliability rather than declaration, which can read as coolness to people expecting words. They benefit from saying the affectionate thing occasionally, and from believing that others mean theirs.',
  },
  {
    code: 'ISFJ',
    nickname: 'The Protector',
    summary: 'Notices what people need and quietly handles it before anyone has to ask.',
    metaDescription:
      'ISFJ personality type explained: cognitive functions, strengths, blind spots, and careers where ISFJs thrive. Free personality test, no email.',
    population: 'Roughly 13-14% of people, the most common type.',
    stack: [
      { role: 'Dominant', fn: 'Introverted Sensing (Si)', gloss: 'Holds a rich, specific memory of people, routines, and what worked.' },
      { role: 'Auxiliary', fn: 'Extraverted Feeling (Fe)', gloss: 'Directs that attention outward to others’ practical and emotional needs.' },
      { role: 'Tertiary', fn: 'Introverted Thinking (Ti)', gloss: 'A private, precise standard for how things should be done.' },
      { role: 'Inferior', fn: 'Extraverted Intuition (Ne)', gloss: 'Discomfort with open-ended, unproven change.' },
    ],
    atBest:
      'ISFJs carry the invisible load. They remember the dietary requirement, the anniversary of the difficult year, and which colleague is struggling this month. That attention is paired with genuine competence: they do not merely notice what is needed, they execute it accurately and without fuss.',
    underStress:
      'Overextended ISFJs keep giving while resentment accumulates silently, then surfaces as uncharacteristic sharpness or a sense of being taken for granted that nobody saw building. Inferior Ne generates anxious, spiralling worst-case scenarios.',
    strengths: [
      'Anticipates practical needs before they are voiced',
      'Follows through with genuine care and accuracy',
      'Creates stability that lets other people take risks',
      'Remembers the specific detail that makes someone feel known',
      'Maintains standards quietly and consistently',
    ],
    blindSpots: [
      'Says yes past their actual capacity',
      'Waits to be noticed rather than stating a need',
      'Avoids conflict until resentment does the talking',
      'Undervalues their own contribution in visible terms',
      'Resists change that would genuinely help them',
    ],
    careers: [
      { title: 'Registered nurse', why: 'Practical care with detail accuracy and direct human benefit.' },
      { title: 'Primary or special education teacher', why: 'Structured nurture of specific children over a full year.' },
      { title: 'Medical or dental office manager', why: 'Running the system that keeps care running.' },
      { title: 'Human resources coordinator', why: 'Practical support for people, with process to lean on.' },
      { title: 'Librarian', why: 'Stewardship, service, and order in combination.' },
      { title: 'Physical or occupational therapist', why: 'Hands-on, incremental, relationship-based progress.' },
      { title: 'Executive assistant or chief of staff', why: 'Anticipatory work that materially multiplies someone else’s effectiveness.' },
      { title: 'Social services caseworker', why: 'High impact, though boundaries must be actively defended.' },
    ],
    workEnvironment:
      'ISFJs need appreciation that is specific, workloads that are actually bounded, and managers who ask what they are carrying. They rarely volunteer that they are overloaded.',
    drains:
      'Chaotic reorganisation, impersonal targets, being publicly criticised, and environments where kindness is treated as weakness.',
    withOthers:
      'ISFJs give steadily and ask rarely. The most important skill they can build is making a direct request early, before the ledger has quietly gone lopsided.',
  },
  {
    code: 'ESTJ',
    nickname: 'The Organiser',
    summary: 'Sees a disorganised situation and starts assigning owners and deadlines.',
    metaDescription:
      'ESTJ personality type explained: cognitive stack, management strengths, blind spots, and careers that fit ESTJs. Free test, results shown instantly.',
    population: 'Roughly 8-9% of people.',
    stack: [
      { role: 'Dominant', fn: 'Extraverted Thinking (Te)', gloss: 'Imposes order, sequence, and accountability on the outside world.' },
      { role: 'Auxiliary', fn: 'Introverted Sensing (Si)', gloss: 'Grounds decisions in established practice and proven detail.' },
      { role: 'Tertiary', fn: 'Extraverted Intuition (Ne)', gloss: 'Occasional openness to an alternative approach.' },
      { role: 'Inferior', fn: 'Introverted Feeling (Fi)', gloss: 'Less practised at examining personal values and feeling states.' },
    ],
    atBest:
      'ESTJs get things finished. They convert a sprawling, stalled situation into a list of owners, dates, and standards, and then they hold people to it fairly. Their attachment to proven practice is not rigidity so much as a well-founded suspicion of novelty that has not been tested.',
    underStress:
      'Under pressure ESTJs become autocratic and dismissive of anything that cannot be measured, including morale. Inferior Fi eventually breaks through as disproportionate personal hurt or a sudden, destabilising question about whether any of this matters to them.',
    strengths: [
      'Turns chaos into an executable plan quickly',
      'Holds people accountable consistently and without favouritism',
      'Makes the call when a decision is overdue',
      'Preserves institutional knowledge and standards',
      'Reliable under pressure and in crisis',
    ],
    blindSpots: [
      'Decides before quieter people have spoken',
      'Treats emotional objections as noise rather than data',
      'Over-indexes on how it has always been done',
      'Undervalues work that does not produce visible output',
      'Neglects their own interior life until it demands attention',
    ],
    careers: [
      { title: 'Operations manager or director', why: 'Te applied to a real system with measurable throughput.' },
      { title: 'Construction or site manager', why: 'Physical, schedule-driven work with clear accountability.' },
      { title: 'Financial controller', why: 'Standards, accuracy, and authority over process.' },
      { title: 'Police, fire, or military officer', why: 'Clear hierarchy, procedure, and decisive action.' },
      { title: 'School principal or administrator', why: 'Running an institution to a standard.' },
      { title: 'Manufacturing or plant manager', why: 'Optimising a concrete system with visible results.' },
      { title: 'Sales manager', why: 'Targets, territories, and team accountability.' },
      { title: 'Hospital or clinic administrator', why: 'Complex logistics where reliability is not optional.' },
    ],
    workEnvironment:
      'ESTJs need defined authority, measurable objectives, and an organisation willing to enforce its own standards. Ambiguity about who decides is corrosive to them.',
    drains:
      'Unowned work, endless deliberation, abstract strategy with no delivery plan, and cultures that avoid holding anyone accountable.',
    withOthers:
      'ESTJs are dependable and blunt. Relationships improve substantially when they learn to ask a question before issuing a correction, and to treat someone’s feeling as a fact about the situation rather than an error.',
  },
  {
    code: 'ESFJ',
    nickname: 'The Host',
    summary: 'Builds the group, feeds the group, and keeps track of how everyone in it is doing.',
    metaDescription:
      'ESFJ personality type explained: cognitive functions, strengths, blind spots, and careers where ESFJs excel. Free personality test, no signup.',
    population: 'Roughly 12% of people.',
    stack: [
      { role: 'Dominant', fn: 'Extraverted Feeling (Fe)', gloss: 'Actively tends the emotional and practical needs of the group.' },
      { role: 'Auxiliary', fn: 'Introverted Sensing (Si)', gloss: 'Remembers the specifics that make that care land accurately.' },
      { role: 'Tertiary', fn: 'Extraverted Intuition (Ne)', gloss: 'Some appetite for new approaches, within familiar bounds.' },
      { role: 'Inferior', fn: 'Introverted Thinking (Ti)', gloss: 'Less comfortable with detached, impersonal analysis.' },
    ],
    atBest:
      'ESFJs make places feel like somewhere you want to be. They do the concrete work of belonging — the invitation, the follow-up, the remembered detail — and they do it at a scale that holds whole teams and families together. Underneath the warmth is real organisational competence.',
    underStress:
      'Stressed ESFJs become anxious about approval and over-attentive to slights, managing relationships so hard that the effort itself becomes visible. Inferior Ti turns into corrosive, circular self-criticism or uncharacteristically cold logical attacks.',
    strengths: [
      'Creates genuine cohesion in groups that lacked it',
      'Remembers and acts on what matters to each person',
      'Organises practical support quickly and effectively',
      'Maintains traditions that give people continuity',
      'Follows up reliably on commitments to others',
    ],
    blindSpots: [
      'Ties self-worth to being needed and approved of',
      'Avoids necessary conflict to preserve surface harmony',
      'Takes disagreement personally',
      'Over-relies on how things have always been done',
      'Gives help that was not asked for and feels rebuffed',
    ],
    careers: [
      { title: 'Nurse or healthcare coordinator', why: 'Direct care plus practical organisation, with visible benefit.' },
      { title: 'Teacher, early years or primary', why: 'Warmth and structure combined for a group that needs both.' },
      { title: 'Event or hospitality manager', why: 'Making an experience work for people, down to the details.' },
      { title: 'Customer success manager', why: 'Long-term relationships with practical problem-solving.' },
      { title: 'Office or practice manager', why: 'The person who makes a workplace function humanly and logistically.' },
      { title: 'Community or volunteer coordinator', why: 'Building and sustaining a group around a shared purpose.' },
      { title: 'Recruiter', why: 'Relationship-driven matching with a clear outcome.' },
      { title: 'Retail or branch manager', why: 'Team leadership with direct customer contact.' },
    ],
    workEnvironment:
      'ESFJs need contact with people, appreciation that is said out loud, and stable expectations. Purely remote, low-contact roles tend to leave them flat.',
    drains:
      'Sustained interpersonal conflict, isolation, abstract work with no human end user, and cultures where warmth is read as unseriousness.',
    withOthers:
      'ESFJs are deeply invested and can over-attend, reading neutral behaviour as withdrawal. The useful discipline is asking directly rather than inferring, and holding a sense of worth that does not depend on being needed this week.',
  },
  {
    code: 'ISTP',
    nickname: 'The Troubleshooter',
    summary: 'Works out how the thing actually operates by taking it apart and fixing it.',
    metaDescription:
      'ISTP personality type explained: cognitive stack, practical strengths, blind spots, and hands-on careers that suit ISTPs. Free test, no account.',
    population: 'Roughly 5% of people.',
    stack: [
      { role: 'Dominant', fn: 'Introverted Thinking (Ti)', gloss: 'Builds a precise mechanical model of how something works.' },
      { role: 'Auxiliary', fn: 'Extraverted Sensing (Se)', gloss: 'Engages directly and skilfully with the physical present.' },
      { role: 'Tertiary', fn: 'Introverted Intuition (Ni)', gloss: 'Occasional flashes of where this is heading.' },
      { role: 'Inferior', fn: 'Extraverted Feeling (Fe)', gloss: 'Limited patience for managing group emotional expectations.' },
    ],
    atBest:
      'ISTPs are the people you want when something is broken and nobody knows why. They combine hands-on skill with genuinely analytical diagnosis, working the problem calmly while others panic. They are economical: they do what is needed, they do it well, and they do not narrate it.',
    underStress:
      'Stressed ISTPs disengage entirely, going quiet and physically absent rather than negotiating. Inferior Fe can erupt as a sudden, disproportionate emotional outburst that surprises everyone, including them.',
    strengths: [
      'Diagnoses mechanical and systemic faults efficiently',
      'Stays calm and effective in an emergency',
      'Learns by doing, fast, without needing instruction',
      'Assesses risk realistically rather than anxiously',
      'Says little and means all of it',
    ],
    blindSpots: [
      'Withdraws instead of addressing a relational problem',
      'Bored by maintenance and long-term planning',
      'Underexplains, leaving others guessing at their reasoning',
      'Resists commitments that constrain future options',
      'Dismisses emotional considerations as irrelevant',
    ],
    careers: [
      { title: 'Mechanical, aerospace, or automotive engineer', why: 'Ti analysis applied to physical systems with real feedback.' },
      { title: 'Paramedic or emergency responder', why: 'Calm, skilled action under time pressure.' },
      { title: 'Pilot', why: 'Technical mastery plus real-time responsiveness.' },
      { title: 'Electrician, machinist, or skilled trades', why: 'Hands-on problem-solving with visible, verifiable results.' },
      { title: 'Software or hardware debugging specialist', why: 'Root-cause analysis as the core task.' },
      { title: 'Forensic or field investigator', why: 'Evidence-driven reconstruction of what actually happened.' },
      { title: 'Surgeon or surgical technologist', why: 'Precision, skill, and decisiveness in the physical present.' },
      { title: 'Network or infrastructure engineer', why: 'Complex systems that break in interesting ways.' },
    ],
    workEnvironment:
      'ISTPs need autonomy, real problems, and minimal meetings. They perform badly under close supervision and well when handed a fault and left to it.',
    drains:
      'Bureaucracy, mandatory process theatre, emotional performance requirements, and long-range planning exercises with no immediate object.',
    withOthers:
      'ISTPs are loyal but undemonstrative, and their default response to tension is distance. Saying "I need an hour, then I’ll talk" rather than simply leaving resolves most of the damage.',
  },
  {
    code: 'ISFP',
    nickname: 'The Artisan',
    summary: 'Makes things with care, holds their values quietly, and dislikes being managed.',
    metaDescription:
      'ISFP personality type explained: cognitive functions, strengths, blind spots, and creative careers that suit ISFPs. Free test with instant results.',
    population: 'Roughly 8-9% of people.',
    stack: [
      { role: 'Dominant', fn: 'Introverted Feeling (Fi)', gloss: 'A strong, private sense of what is authentic and right.' },
      { role: 'Auxiliary', fn: 'Extraverted Sensing (Se)', gloss: 'Immersed, skilful attention to sensory and physical detail.' },
      { role: 'Tertiary', fn: 'Introverted Intuition (Ni)', gloss: 'Occasional sense of a longer arc.' },
      { role: 'Inferior', fn: 'Extraverted Thinking (Te)', gloss: 'Limited natural pull toward metrics, systems, and logistics.' },
    ],
    atBest:
      'ISFPs bring taste and sincerity to concrete work. They notice the quality of a material, the exact wrongness of a colour, the moment a person stopped being comfortable. They are rarely interested in convincing anyone — they would rather make the thing well and let it speak.',
    underStress:
      'Stress sends ISFPs inward and can produce a sudden, sharp withdrawal from people who thought things were fine. Inferior Te shows up as uncharacteristic bossiness or a punishing, metric-driven self-assessment that ignores everything they actually value.',
    strengths: [
      'Genuine aesthetic judgement, not borrowed taste',
      'Present and attentive in the actual moment',
      'Acts on values without needing an audience',
      'Adapts gracefully when circumstances shift',
      'Accepts people as they are without agenda',
    ],
    blindSpots: [
      'Avoids conflict until leaving feels like the only option',
      'Undersells their own work and expertise',
      'Defers planning until options have narrowed',
      'Reads structure as an attack on autonomy',
      'Keeps concerns private for far too long',
    ],
    careers: [
      { title: 'Graphic designer or illustrator', why: 'Craft, taste, and autonomy with a concrete output.' },
      { title: 'Chef or pastry chef', why: 'Se mastery of material with immediate sensory feedback.' },
      { title: 'Physical therapist or massage therapist', why: 'Hands-on, one-to-one care with real presence.' },
      { title: 'Photographer or videographer', why: 'Aesthetic judgement applied in the moment.' },
      { title: 'Veterinary technician', why: 'Practical care for animals, with low interpersonal politics.' },
      { title: 'Landscape designer or horticulturalist', why: 'Physical, aesthetic, and patient work outdoors.' },
      { title: 'Carpenter, jeweller, or craftsperson', why: 'Skilled making with visible quality.' },
      { title: 'Music teacher or performer', why: 'Expression plus technical mastery, largely self-directed.' },
    ],
    workEnvironment:
      'ISFPs need autonomy over their craft, a low-conflict setting, and feedback on the work rather than on their personality. Heavy process and aggressive targets push them out quickly.',
    drains:
      'Corporate politics, rigid hierarchy, public criticism, forced competition, and work whose only measure is a number.',
    withOthers:
      'ISFPs show love through action and presence rather than discussion. Their main relational risk is quietly deciding something is over before saying it was ever a problem.',
  },
  {
    code: 'ESTP',
    nickname: 'The Operator',
    summary: 'Reads the situation fast, acts on it, and sorts out the theory afterwards.',
    metaDescription:
      'ESTP personality type explained: cognitive stack, strengths under pressure, blind spots, and careers that suit ESTPs. Free test, no email required.',
    population: 'Roughly 4% of people.',
    stack: [
      { role: 'Dominant', fn: 'Extraverted Sensing (Se)', gloss: 'Takes in the immediate situation completely and responds to it.' },
      { role: 'Auxiliary', fn: 'Introverted Thinking (Ti)', gloss: 'Rapid internal analysis of what will actually work.' },
      { role: 'Tertiary', fn: 'Extraverted Feeling (Fe)', gloss: 'Reads and works a room effectively.' },
      { role: 'Inferior', fn: 'Introverted Intuition (Ni)', gloss: 'Less natural attention to long-range implication.' },
    ],
    atBest:
      'ESTPs are exceptional in situations that are moving. They perceive what is actually happening rather than what was planned, and they act while the window is open. That combination — accurate perception plus willingness to commit — is rarer than it sounds and enormously valuable in a crisis or a negotiation.',
    underStress:
      'Stressed ESTPs escalate: more action, more risk, less reflection. Inferior Ni produces uncharacteristic dark certainty about a future they cannot articulate, or paranoid readings of other people’s motives.',
    strengths: [
      'Assesses a live situation accurately and quickly',
      'Comfortable acting on incomplete information',
      'Persuasive and quick-witted in person',
      'Unflustered by physical or social risk',
      'Cuts through abstraction to what will work now',
    ],
    blindSpots: [
      'Discounts consequences beyond the current horizon',
      'Bores of situations that require patience',
      'Commits before considering who else is affected',
      'Treats planning as unnecessary until it is urgent',
      'Reads reflection as hesitation',
    ],
    careers: [
      { title: 'Emergency medicine physician or paramedic', why: 'Accurate, fast decisions in genuinely live situations.' },
      { title: 'Sales, especially field or enterprise', why: 'Reading a room and closing in real time.' },
      { title: 'Entrepreneur or operator', why: 'Bias to action pays when the environment is moving.' },
      { title: 'Trader', why: 'Rapid decisions under uncertainty with immediate scoring.' },
      { title: 'Police officer or firefighter', why: 'Physical competence plus situational judgement.' },
      { title: 'Construction or project superintendent', why: 'Solving what is actually happening on site today.' },
      { title: 'Professional athlete or coach', why: 'Se mastery with direct competitive feedback.' },
      { title: 'Negotiator or business development lead', why: 'Live, adaptive, interpersonal problem-solving.' },
    ],
    workEnvironment:
      'ESTPs need movement, real stakes, and autonomy. Desk-bound roles with long planning cycles and no live interaction waste them entirely.',
    drains:
      'Theory without application, long meetings, rigid procedure, and roles where nothing observable changes week to week.',
    withOthers:
      'ESTPs are fun, direct, and can be careless with other people’s slower processing. Deliberately slowing down to check the impact of what they just said covers most of the gap.',
  },
  {
    code: 'ESFP',
    nickname: 'The Performer',
    summary: 'Fully present, genuinely warm, and better in the moment than on the plan.',
    metaDescription:
      'ESFP personality type explained: cognitive functions, strengths, blind spots, and careers that fit ESFPs. Free personality test, results on screen.',
    population: 'Roughly 8-9% of people.',
    stack: [
      { role: 'Dominant', fn: 'Extraverted Sensing (Se)', gloss: 'Engages fully with what is happening right now.' },
      { role: 'Auxiliary', fn: 'Introverted Feeling (Fi)', gloss: 'Anchors that engagement to personal values and authenticity.' },
      { role: 'Tertiary', fn: 'Extraverted Thinking (Te)', gloss: 'Can organise effectively in short bursts.' },
      { role: 'Inferior', fn: 'Introverted Intuition (Ni)', gloss: 'Less drawn to abstraction and long-range forecasting.' },
    ],
    atBest:
      'ESFPs raise the level of a room. They are attentive to the actual people in front of them, quick to act on a need, and unembarrassed about enjoying things — which gives other people permission to. Under the sociability is a firm Fi core: they will not perform a position they do not hold.',
    underStress:
      'Stressed ESFPs seek distraction and avoid the thing that needs deciding. Inferior Ni shows up as uncharacteristic doom-laden certainty, or as suspicion about motives where none is warranted.',
    strengths: [
      'Makes people feel genuinely welcome and at ease',
      'Responds practically and immediately to a real need',
      'Adapts instantly when the plan changes',
      'Brings energy that lifts a whole group',
      'Authentic rather than strategic about what they value',
    ],
    blindSpots: [
      'Avoids difficult decisions by staying busy',
      'Underplans and then absorbs the consequences',
      'Takes criticism hard and personally',
      'Struggles with long solitary stretches of work',
      'Over-commits socially and under-delivers on admin',
    ],
    careers: [
      { title: 'Event manager or producer', why: 'Live, people-facing, and different every day.' },
      { title: 'Nurse or paramedic', why: 'Practical care delivered in the moment, with real presence.' },
      { title: 'Sales or account executive', why: 'Relationship-driven work with immediate feedback.' },
      { title: 'Early years or primary teacher', why: 'Energy, warmth, and improvisation with a group who need it.' },
      { title: 'Hospitality or restaurant manager', why: 'Fast-moving, sensory, deeply interpersonal.' },
      { title: 'Performer, presenter, or broadcaster', why: 'Se plus audience, which is where ESFPs come alive.' },
      { title: 'Fitness trainer or physical coach', why: 'Physical mastery plus one-to-one motivation.' },
      { title: 'Travel or experience designer', why: 'Building things people feel rather than read about.' },
    ],
    workEnvironment:
      'ESFPs need people, variety, and visible results. They do best with light structure supplied by someone else and a role where the day is never identical.',
    drains:
      'Solitary analytical work, long-range strategy documents, rigid routine, and environments that treat enthusiasm as unprofessional.',
    withOthers:
      'ESFPs are generous and present, and can avoid the conversation that would fix something. Naming a problem while it is still small is the highest-value habit available to them.',
  },
];

/** Lookup by four-letter code, case-insensitive. */
export function getType(code: string): TypeProfile | undefined {
  return TYPES.find((t) => t.code.toLowerCase() === code.toLowerCase());
}

/** The four dichotomies, used by the type test and the explainer pages. */
export const DICHOTOMIES = [
  { axis: 'EI', left: 'E', right: 'I', leftName: 'Extraversion', rightName: 'Introversion', question: 'Where your attention and energy naturally go' },
  { axis: 'SN', left: 'S', right: 'N', leftName: 'Sensing', rightName: 'Intuition', question: 'What kind of information you trust first' },
  { axis: 'TF', left: 'T', right: 'F', leftName: 'Thinking', rightName: 'Feeling', question: 'How you weigh a decision once the facts are in' },
  { axis: 'JP', left: 'J', right: 'P', leftName: 'Judging', rightName: 'Perceiving', question: 'How you prefer to organise the world around you' },
] as const;

export type Axis = (typeof DICHOTOMIES)[number]['axis'];
