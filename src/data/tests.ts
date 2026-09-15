/**
 * Assessment definitions.
 *
 * Every instrument is declarative data. Scoring is a pure function over that
 * data (see src/lib/scoring.ts), so the runtime shipped to the browser is one
 * small script shared by all four tests rather than four bespoke ones.
 *
 * Item keying is deliberately balanced: each scale carries an equal number of
 * forward- and reverse-keyed items, so a respondent who agrees with everything
 * lands near the midpoint instead of at an extreme. That controls acquiescence
 * bias, which is the usual reason a casual online quiz returns a flattering
 * but meaningless profile.
 */

/** +1: agreement moves the score toward poleB. -1: agreement moves it toward poleA. */
export type Keying = 1 | -1;

export interface Item {
  readonly text: string;
  readonly scale: string;
  readonly keyed: Keying;
}

export interface Scale {
  readonly id: string;
  /** Low-end label. */
  readonly poleA: string;
  /** High-end label. */
  readonly poleB: string;
  readonly question: string;
  readonly poleADescription: string;
  readonly poleBDescription: string;
}

export interface Faq {
  readonly question: string;
  readonly answer: string;
}

export type ResultMode = 'type' | 'profile';

export interface Assessment {
  readonly slug: string;
  readonly path: string;
  readonly name: string;
  /** Page <h1>. Describes this page, never the site tagline. */
  readonly h1: string;
  /** Validated <title>, brand suffix appended by the layout. */
  readonly title: string;
  /** Validated meta description, 70-165 characters. */
  readonly metaDescription: string;
  readonly cardBlurb: string;
  readonly minutes: number;
  readonly about: string;
  readonly lede: string;
  readonly intro: readonly string[];
  readonly resultMode: ResultMode;
  readonly scales: readonly Scale[];
  readonly questions: readonly Item[];
  readonly faqs: readonly Faq[];
}

/** Shared five-point agreement scale. Index 0-4 maps to -2..+2. */
export const LIKERT = [
  { label: 'Strongly disagree', short: 'SD' },
  { label: 'Disagree', short: 'D' },
  { label: 'Neutral', short: 'N' },
  { label: 'Agree', short: 'A' },
  { label: 'Strongly agree', short: 'SA' },
] as const;

const personalityType: Assessment = {
  slug: 'personality-type',
  path: '/tests/personality-type/',
  name: 'Personality type test',
  h1: 'Free personality type test',
  title: 'Free Personality Type Test — 48 Questions, No Email',
  metaDescription:
    'A free 48-question personality type test that reports your four-letter type plus how strongly you lean on each dimension. No email, no account, results on screen.',
  cardBlurb:
    'Find your four-letter type and, more usefully, how strongly you actually lean on each of the four dimensions.',
  minutes: 9,
  about: 'Jungian personality typology',
  lede:
    'Forty-eight questions, about nine minutes, and a result that tells you how strong each preference is rather than just handing you four letters.',
  intro: [
    'This test places you on the four dimensions described by Carl Jung and later popularised by Isabel Briggs Myers: where your energy goes, what information you trust, how you decide, and how you organise your world. It reports a four-letter type, but the number that actually matters is the percentage beside each letter.',
    'A 54% preference for Introversion and a 91% preference for Introversion produce the same letter and describe very different people. Most free tests hide that distinction. This one leads with it, because a near-tie is real information — it usually means you genuinely use both sides depending on context.',
  ],
  resultMode: 'type',
  scales: [
    {
      id: 'EI', poleA: 'E', poleB: 'I',
      question: 'Where your attention and energy go',
      poleADescription: 'Extraversion — you think by talking, and contact with people tops you up.',
      poleBDescription: 'Introversion — you think before talking, and solitude is how you recover.',
    },
    {
      id: 'SN', poleA: 'S', poleB: 'N',
      question: 'What information you trust first',
      poleADescription: 'Sensing — you trust concrete, verifiable detail and direct experience.',
      poleBDescription: 'Intuition — you trust patterns, implications, and where things are heading.',
    },
    {
      id: 'TF', poleA: 'T', poleB: 'F',
      question: 'How you weigh a decision',
      poleADescription: 'Thinking — you decide by consistency, logic, and the merits of the case.',
      poleBDescription: 'Feeling — you decide by impact on people and alignment with your values.',
    },
    {
      id: 'JP', poleA: 'J', poleB: 'P',
      question: 'How you organise your world',
      poleADescription: 'Judging — you prefer things decided, planned, and closed.',
      poleBDescription: 'Perceiving — you prefer things open, flexible, and still adjustable.',
    },
  ],
  questions: [
    { scale: 'EI', keyed: 1, text: 'After a long social event, I need time alone before I feel like myself again.' },
    { scale: 'EI', keyed: -1, text: 'I do my best thinking out loud, with other people in the room.' },
    { scale: 'EI', keyed: 1, text: 'I would rather have two long conversations than circulate around a party.' },
    { scale: 'EI', keyed: -1, text: 'Meeting new people energises me more than it tires me.' },
    { scale: 'EI', keyed: 1, text: 'I often think of what I wanted to say only after the conversation has ended.' },
    { scale: 'EI', keyed: -1, text: 'I am usually among the first to speak up in a group discussion.' },
    { scale: 'EI', keyed: 1, text: 'A weekend with nothing scheduled sounds restorative rather than lonely.' },
    { scale: 'EI', keyed: -1, text: 'I find it easy to start a conversation with someone I have just met.' },
    { scale: 'EI', keyed: 1, text: 'I prefer to write my thoughts down before I share them.' },
    { scale: 'EI', keyed: -1, text: 'A busy, lively environment tends to lift my mood.' },
    { scale: 'EI', keyed: 1, text: 'I keep a lot of what I am thinking to myself, even around people I like.' },
    { scale: 'EI', keyed: -1, text: 'I have a wide circle of friends rather than a small, close one.' },

    { scale: 'SN', keyed: 1, text: 'I am more interested in what something could become than in what it is now.' },
    { scale: 'SN', keyed: -1, text: 'I trust concrete facts more than patterns I cannot yet demonstrate.' },
    { scale: 'SN', keyed: 1, text: 'I notice connections between things that other people treat as unrelated.' },
    { scale: 'SN', keyed: -1, text: 'I would rather follow a method that is proven than experiment with a new one.' },
    { scale: 'SN', keyed: 1, text: 'While others discuss the details, my mind moves to the wider implications.' },
    { scale: 'SN', keyed: -1, text: 'I remember specific details — dates, names, exact wording — accurately.' },
    { scale: 'SN', keyed: 1, text: 'Abstract ideas interest me even when they have no obvious practical use.' },
    { scale: 'SN', keyed: -1, text: 'I focus on what is actually in front of me rather than on what might happen.' },
    { scale: 'SN', keyed: 1, text: 'I tend to explain things using metaphors and analogies.' },
    { scale: 'SN', keyed: -1, text: 'I would describe myself as practical and down to earth.' },
    { scale: 'SN', keyed: 1, text: 'I get restless repeating the same familiar task.' },
    { scale: 'SN', keyed: -1, text: 'I prefer instructions that are literal and step by step.' },

    { scale: 'TF', keyed: 1, text: 'When someone brings me a problem, my first instinct is to comfort them, not solve it.' },
    { scale: 'TF', keyed: -1, text: 'I can set aside how people feel in order to reach the right decision.' },
    { scale: 'TF', keyed: 1, text: 'I find it hard to stay neutral when I think someone is being treated unfairly.' },
    { scale: 'TF', keyed: -1, text: 'I would rather be told a harsh truth than a kind inaccuracy.' },
    { scale: 'TF', keyed: 1, text: 'I weigh how people will feel before I state my position.' },
    { scale: 'TF', keyed: -1, text: 'I judge an argument on its logic, regardless of who is making it.' },
    { scale: 'TF', keyed: 1, text: 'Keeping a group on good terms matters more to me than being proved right.' },
    { scale: 'TF', keyed: -1, text: 'I am comfortable giving someone critical feedback directly.' },
    { scale: 'TF', keyed: 1, text: 'I notice quickly when someone in the room has become upset.' },
    { scale: 'TF', keyed: -1, text: 'I analyse a disagreement rather than feel my way through it.' },
    { scale: 'TF', keyed: 1, text: 'It troubles me to make a decision that hurts someone, even when it is correct.' },
    { scale: 'TF', keyed: -1, text: 'People have described me as objective, or as detached.' },

    { scale: 'JP', keyed: 1, text: 'I often start work close to the deadline and still get it done.' },
    { scale: 'JP', keyed: -1, text: 'I like having a clear plan before I begin.' },
    { scale: 'JP', keyed: 1, text: 'I would rather keep my options open than commit to a fixed schedule.' },
    { scale: 'JP', keyed: -1, text: 'I make lists and work through them methodically.' },
    { scale: 'JP', keyed: 1, text: 'My desk or workspace is usually somewhat disorganised.' },
    { scale: 'JP', keyed: -1, text: 'Leaving a decision unresolved makes me uncomfortable.' },
    { scale: 'JP', keyed: 1, text: 'Last-minute changes to plans do not bother me much.' },
    { scale: 'JP', keyed: -1, text: 'I prefer to finish one task completely before starting another.' },
    { scale: 'JP', keyed: 1, text: 'I enjoy deciding as I go rather than settling things in advance.' },
    { scale: 'JP', keyed: -1, text: 'Deadlines and structure help me do my best work.' },
    { scale: 'JP', keyed: 1, text: 'I explore several approaches before settling on one.' },
    { scale: 'JP', keyed: -1, text: 'I like knowing something is settled and finished.' },
  ],
  faqs: [
    {
      question: 'Is this the same as the official MBTI test?',
      answer:
        'No. The MBTI instrument is a commercial product owned by The Myers-Briggs Company and is normally administered through a certified practitioner. This is an independent test built on the same underlying Jungian dimensions. It is free, it is not affiliated with that company, and it should not be described as an MBTI score.',
    },
    {
      question: 'What do the percentages next to my letters mean?',
      answer:
        'Each percentage shows how strongly your answers leaned toward one side of that dimension. Fifty per cent is an exact tie. A score in the fifties means you use both sides readily and your letter could plausibly flip on a different day. A score above roughly seventy-five per cent indicates a strong, stable preference.',
    },
    {
      question: 'Why did I get a different type than on another site?',
      answer:
        'Usually because one or more of your dimensions is close to the midpoint. If you scored 51% Introversion, a different instrument with slightly different items can easily return Extraversion instead. That is not an error in either test — it is an accurate report that you sit near the middle of that dimension.',
    },
    {
      question: 'How long does it take?',
      answer:
        'Around nine minutes. There are 48 questions and the test does not ask for any personal information before, during, or after.',
    },
    {
      question: 'Can I use this for hiring or clinical decisions?',
      answer:
        'No. Type-based instruments have limited predictive validity for job performance and are not diagnostic tools. Use this for self-reflection and conversation, not for selection, screening, or diagnosis.',
    },
  ],
};

const careerFit: Assessment = {
  slug: 'career-fit',
  path: '/tests/career-fit/',
  name: 'Career fit test',
  h1: 'Free career fit test',
  title: 'Free Career Fit Test — Find Work That Suits You',
  metaDescription:
    'A free 36-question career test based on the six Holland interest themes. Get your ranked interest profile and matching careers instantly — no email or signup.',
  cardBlurb:
    'Rank your six work-interest themes and see which fields consistently line up with the way you like to work.',
  minutes: 7,
  about: 'Vocational interests and career fit',
  lede:
    'Thirty-six questions mapped to the six Holland interest themes — the framework behind most professional career guidance — with your ranked profile shown immediately.',
  intro: [
    'Personality type tells you how you process the world. Vocational interest tells you what you would actually enjoy doing all day, and it predicts job satisfaction and tenure considerably better. This test uses the six-theme model developed by John Holland, which underpins most professional careers guidance in use today.',
    'You will get a ranked profile across all six themes rather than a single winner, because almost nobody is one theme. The combination of your top two or three is what usefully narrows a career search.',
  ],
  resultMode: 'profile',
  scales: [
    { id: 'R', poleA: 'Lower', poleB: 'Realistic', question: 'Building, fixing, and working with physical things', poleADescription: 'Hands-on, physical work is not a strong draw for you.', poleBDescription: 'You like tangible work with tools, machines, materials, or the outdoors — problems that are solved physically.' },
    { id: 'I', poleA: 'Lower', poleB: 'Investigative', question: 'Researching, analysing, and figuring things out', poleADescription: 'Sustained analytical investigation is not where you naturally go.', poleBDescription: 'You like questions with depth — research, analysis, theory, and understanding why something behaves as it does.' },
    { id: 'A', poleA: 'Lower', poleB: 'Artistic', question: 'Creating, designing, and expressing', poleADescription: 'Open-ended creative work is not a primary motivator for you.', poleBDescription: 'You like unstructured, expressive work where taste and originality are the point.' },
    { id: 'S', poleA: 'Lower', poleB: 'Social', question: 'Teaching, helping, and developing people', poleADescription: 'Person-centred helping work is not a core driver for you.', poleBDescription: 'You like work whose product is a person being better off — teaching, care, counselling, development.' },
    { id: 'E', poleA: 'Lower', poleB: 'Enterprising', question: 'Persuading, leading, and taking commercial risk', poleADescription: 'Persuasion and commercial risk-taking are not strong pulls for you.', poleBDescription: 'You like influence, momentum, and stakes — leading, selling, negotiating, building a venture.' },
    { id: 'C', poleA: 'Lower', poleB: 'Conventional', question: 'Organising, ordering, and working precisely with data', poleADescription: 'Highly structured, detail-exact work is not a natural fit for you.', poleBDescription: 'You like order, accuracy, and systems that work — records, data, standards, and clean process.' },
  ],
  questions: [
    { scale: 'R', keyed: 1, text: 'I would enjoy a job where I work with tools, machinery, or materials.' },
    { scale: 'R', keyed: 1, text: 'Fixing something physical that is broken is satisfying to me.' },
    { scale: 'R', keyed: 1, text: 'I would rather work outdoors than in an office.' },
    { scale: 'R', keyed: -1, text: 'Practical, hands-on tasks bore me fairly quickly.' },
    { scale: 'R', keyed: -1, text: 'I would avoid a job that involved physical work or getting dirty.' },
    { scale: 'R', keyed: -1, text: 'I have little interest in how mechanical things are put together.' },

    { scale: 'I', keyed: 1, text: 'I enjoy digging into a problem until I understand why it behaves that way.' },
    { scale: 'I', keyed: 1, text: 'I would like a job that involves research and analysis.' },
    { scale: 'I', keyed: 1, text: 'I read about subjects that have no direct bearing on my work.' },
    { scale: 'I', keyed: -1, text: 'I would rather apply an existing answer than investigate a new one.' },
    { scale: 'I', keyed: -1, text: 'Detailed analysis tires me more than it interests me.' },
    { scale: 'I', keyed: -1, text: 'Theoretical questions hold little appeal unless they are immediately useful.' },

    { scale: 'A', keyed: 1, text: 'I would enjoy work where I create something original.' },
    { scale: 'A', keyed: 1, text: 'I notice and care about how things look, sound, or read.' },
    { scale: 'A', keyed: 1, text: 'I would rather have creative freedom than clear instructions.' },
    { scale: 'A', keyed: -1, text: 'I prefer work with one correct answer over work open to interpretation.' },
    { scale: 'A', keyed: -1, text: 'I would find a job centred on self-expression uncomfortable.' },
    { scale: 'A', keyed: -1, text: 'Design and aesthetics matter little to me compared with function.' },

    { scale: 'S', keyed: 1, text: 'I would find it rewarding to help someone develop a new skill.' },
    { scale: 'S', keyed: 1, text: 'I would like a job where I work directly with people who need support.' },
    { scale: 'S', keyed: 1, text: 'People tend to come to me when they need to talk something through.' },
    { scale: 'S', keyed: -1, text: 'I would rather work with data or objects than with people all day.' },
    { scale: 'S', keyed: -1, text: 'Being responsible for other people’s wellbeing at work would drain me.' },
    { scale: 'S', keyed: -1, text: 'Teaching or coaching someone repeatedly would frustrate me.' },

    { scale: 'E', keyed: 1, text: 'I enjoy persuading people to come round to my view.' },
    { scale: 'E', keyed: 1, text: 'I would like to lead a team or run my own venture.' },
    { scale: 'E', keyed: 1, text: 'I am comfortable taking a calculated risk for a bigger payoff.' },
    { scale: 'E', keyed: -1, text: 'Selling or negotiating makes me uncomfortable.' },
    { scale: 'E', keyed: -1, text: 'I would rather be an expert contributor than a manager.' },
    { scale: 'E', keyed: -1, text: 'Competitive, target-driven environments do not appeal to me.' },

    { scale: 'C', keyed: 1, text: 'I like knowing exactly what is expected and delivering it precisely.' },
    { scale: 'C', keyed: 1, text: 'Organising information into a clean system is satisfying to me.' },
    { scale: 'C', keyed: 1, text: 'I notice errors in documents, numbers, or records that others miss.' },
    { scale: 'C', keyed: -1, text: 'Detailed, procedural work makes me restless.' },
    { scale: 'C', keyed: -1, text: 'I would rather improvise than follow an established procedure.' },
    { scale: 'C', keyed: -1, text: 'Keeping records accurate and up to date is tedious to me.' },
  ],
  faqs: [
    {
      question: 'What are the six Holland themes?',
      answer:
        'Realistic, Investigative, Artistic, Social, Enterprising, and Conventional — often abbreviated RIASEC. The model proposes that people are happier and stay longer in work environments that match their dominant interest themes, and it is the basis of most professional careers guidance.',
    },
    {
      question: 'Does this test tell me exactly what job to take?',
      answer:
        'No, and be sceptical of any test that claims to. It tells you which kinds of work environment tend to suit your interests. The careers listed against your profile are illustrative starting points for research, not a prescription.',
    },
    {
      question: 'How is this different from the personality type test?',
      answer:
        'The personality type test describes how you take in information and make decisions. This one describes what kind of work you are drawn to. They answer different questions, and interest is the better predictor of job satisfaction.',
    },
    {
      question: 'Do I need to create an account to see my career matches?',
      answer:
        'No. Your ranked profile and the matching career suggestions appear on screen as soon as you finish the last question. Nothing is emailed, stored, or held back.',
    },
  ],
};

const riskTolerance: Assessment = {
  slug: 'risk-tolerance',
  path: '/tests/risk-tolerance/',
  name: 'Risk tolerance test',
  h1: 'Free risk tolerance test',
  title: 'Free Risk Tolerance Test — Across Four Domains',
  metaDescription:
    'Measure your appetite for risk across money, career, social, and physical situations. 24 questions, instant results, no email address or account required.',
  cardBlurb:
    'Most people are not simply cautious or bold — they are bold about some things. See where your appetite actually sits.',
  minutes: 5,
  about: 'Risk attitudes and risk-taking behaviour',
  lede:
    'Risk appetite is not one number. This 24-question test separates financial, career, social, and physical risk, because most people differ sharply between them.',
  intro: [
    'Treating risk tolerance as a single trait is the most common mistake in this area. Someone who will remortgage to fund a business can be the same person who will not raise a concern in a meeting. Research on domain-specific risk-taking consistently finds that appetite varies by context far more than it varies by person.',
    'This test therefore reports four separate scores rather than one. The gaps between them are usually more informative than any individual figure.',
  ],
  resultMode: 'profile',
  scales: [
    { id: 'FIN', poleA: 'Cautious', poleB: 'Financial risk appetite', question: 'Money, investing, and financial commitments', poleADescription: 'You prioritise protecting what you have over pursuing a larger, less certain gain.', poleBDescription: 'You accept meaningful variance in financial outcomes in exchange for higher expected return.' },
    { id: 'CAR', poleA: 'Cautious', poleB: 'Career risk appetite', question: 'Jobs, ventures, and professional bets', poleADescription: 'You favour stability, tenure, and a predictable professional path.', poleBDescription: 'You will trade security for upside — a move, a venture, an unproven role.' },
    { id: 'SOC', poleA: 'Cautious', poleB: 'Social risk appetite', question: 'Disagreement, exposure, and reputation', poleADescription: 'You avoid situations that could cost you standing or provoke conflict.', poleBDescription: 'You will say the unpopular thing and accept the social cost of being visibly wrong.' },
    { id: 'PHY', poleA: 'Cautious', poleB: 'Physical risk appetite', question: 'Bodily risk, speed, and physical uncertainty', poleADescription: 'You avoid activities with real physical downside.', poleBDescription: 'You are comfortable with activities carrying genuine physical risk.' },
  ],
  questions: [
    { scale: 'FIN', keyed: 1, text: 'I would invest a meaningful sum in something with high potential and real downside.' },
    { scale: 'FIN', keyed: 1, text: 'A temporary fall in the value of my savings would not prompt me to act.' },
    { scale: 'FIN', keyed: 1, text: 'I would rather chase a larger uncertain return than lock in a small certain one.' },
    { scale: 'FIN', keyed: -1, text: 'I keep more in cash than I probably need to, because it feels safer.' },
    { scale: 'FIN', keyed: -1, text: 'Taking on debt for an opportunity would keep me awake at night.' },
    { scale: 'FIN', keyed: -1, text: 'I would accept a lower return in exchange for knowing the outcome.' },

    { scale: 'CAR', keyed: 1, text: 'I would leave a stable job for a role with more upside and less certainty.' },
    { scale: 'CAR', keyed: 1, text: 'I would join an early-stage venture that might not survive the year.' },
    { scale: 'CAR', keyed: 1, text: 'I would take on work I am not yet qualified for and learn on the way.' },
    { scale: 'CAR', keyed: -1, text: 'Job security matters more to me than a higher ceiling.' },
    { scale: 'CAR', keyed: -1, text: 'I would want another offer signed before resigning from a role.' },
    { scale: 'CAR', keyed: -1, text: 'I prefer a clearly defined career path to an open-ended one.' },

    { scale: 'SOC', keyed: 1, text: 'I will voice an unpopular opinion in a room that clearly disagrees.' },
    { scale: 'SOC', keyed: 1, text: 'I am willing to be visibly wrong in front of people I respect.' },
    { scale: 'SOC', keyed: 1, text: 'I would raise a difficult issue with someone senior to me.' },
    { scale: 'SOC', keyed: -1, text: 'I stay quiet rather than risk an awkward disagreement.' },
    { scale: 'SOC', keyed: -1, text: 'I worry about how a contribution will be judged before I make it.' },
    { scale: 'SOC', keyed: -1, text: 'I would rather not be the centre of attention in a group.' },

    { scale: 'PHY', keyed: 1, text: 'I would try an activity like climbing, diving, or riding a fast motorbike.' },
    { scale: 'PHY', keyed: 1, text: 'Physical challenge with some genuine danger appeals to me.' },
    { scale: 'PHY', keyed: 1, text: 'I am comfortable travelling somewhere unfamiliar without a fixed plan.' },
    { scale: 'PHY', keyed: -1, text: 'I read the safety information carefully before anything physically risky.' },
    { scale: 'PHY', keyed: -1, text: 'I avoid activities with a realistic chance of injury.' },
    { scale: 'PHY', keyed: -1, text: 'High speed makes me uncomfortable rather than exhilarated.' },
  ],
  faqs: [
    {
      question: 'Why does this test give four scores instead of one?',
      answer:
        'Because risk appetite is domain-specific. Research on risk-taking consistently finds weak correlation between, say, financial and social risk appetite. A single number would average away the part that is actually useful to know.',
    },
    {
      question: 'Is a high score better than a low score?',
      answer:
        'No. Neither end is healthier. High appetite in a domain where you have no expertise is simply exposure, and low appetite in a domain that matters to you can quietly cap your outcomes. What matters is whether your appetite matches your situation.',
    },
    {
      question: 'Can I use this to choose investments?',
      answer:
        'Not on its own. This measures attitude, not capacity — how much volatility you can emotionally tolerate, not how much you can financially afford. Regulated financial advice considers both. Treat the result as a conversation starter.',
    },
  ],
};

const assertiveness: Assessment = {
  slug: 'assertiveness',
  path: '/tests/assertiveness/',
  name: 'Assertiveness test',
  h1: 'Free assertiveness test',
  title: 'Free Assertiveness Test — 24 Questions, Instant Result',
  metaDescription:
    'Find out how assertive you are across saying no, making requests, holding your position, and giving feedback. Free, 24 questions, results with no signup.',
  cardBlurb:
    'Assertiveness is four separate skills, and most people are strong at some and weak at others. See which.',
  minutes: 5,
  about: 'Assertive communication behaviour',
  lede:
    'Twenty-four questions across the four distinct skills that make up assertiveness — because "not assertive enough" is almost never true across all of them.',
  intro: [
    'Assertiveness is usually described as a single trait sitting between passivity and aggression. In practice it breaks into separate behaviours that people are good at independently: declining a request, asking for something you want, holding a position under pressure, and telling someone something they will not enjoy hearing.',
    'Plenty of people negotiate hard on price and cannot tell a friend they are hurt. This test scores the four separately so you can see where the actual gap is.',
  ],
  resultMode: 'profile',
  scales: [
    { id: 'NO', poleA: 'Accommodating', poleB: 'Saying no', question: 'Declining requests without over-explaining', poleADescription: 'You take on more than you want to rather than decline.', poleBDescription: 'You decline clearly and without excessive justification when you need to.' },
    { id: 'ASK', poleA: 'Reticent', poleB: 'Making requests', question: 'Asking directly for what you want', poleADescription: 'You hint, or go without, rather than ask outright.', poleBDescription: 'You ask plainly for what you want, including raises, help, and changes.' },
    { id: 'HOLD', poleA: 'Yielding', poleB: 'Holding your position', question: 'Staying on a point under pressure', poleADescription: 'You concede quickly when someone pushes back firmly.', poleBDescription: 'You stay on your point under pressure without becoming hostile.' },
    { id: 'FDBK', poleA: 'Avoidant', poleB: 'Giving direct feedback', question: 'Saying the difficult thing to someone’s face', poleADescription: 'You avoid or soften difficult messages until they lose their meaning.', poleBDescription: 'You deliver difficult messages clearly and early, while they are still fixable.' },
  ],
  questions: [
    { scale: 'NO', keyed: 1, text: 'I can decline a request without giving a long list of reasons.' },
    { scale: 'NO', keyed: 1, text: 'I say no to things I do not have time for, even when asked personally.' },
    { scale: 'NO', keyed: 1, text: 'Turning down an invitation does not leave me feeling guilty for days.' },
    { scale: 'NO', keyed: -1, text: 'I agree to things I do not want to do to avoid disappointing someone.' },
    { scale: 'NO', keyed: -1, text: 'I invent an excuse rather than simply say I would rather not.' },
    { scale: 'NO', keyed: -1, text: 'I end up with tasks that were never mine because I did not object.' },

    { scale: 'ASK', keyed: 1, text: 'I ask for help directly when I need it.' },
    { scale: 'ASK', keyed: 1, text: 'I have asked for a raise, a promotion, or better terms.' },
    { scale: 'ASK', keyed: 1, text: 'If something I bought were faulty, I would return it without hesitating.' },
    { scale: 'ASK', keyed: -1, text: 'I hint at what I want rather than asking for it.' },
    { scale: 'ASK', keyed: -1, text: 'I would rather manage without than ask someone for a favour.' },
    { scale: 'ASK', keyed: -1, text: 'Asking for something makes me feel as though I am imposing.' },

    { scale: 'HOLD', keyed: 1, text: 'I keep making my point when someone pushes back hard.' },
    { scale: 'HOLD', keyed: 1, text: 'I can disagree with someone senior without backing down.' },
    { scale: 'HOLD', keyed: 1, text: 'Being interrupted does not stop me finishing what I was saying.' },
    { scale: 'HOLD', keyed: -1, text: 'I drop my position quickly when someone argues confidently.' },
    { scale: 'HOLD', keyed: -1, text: 'I say I agree in the moment and reconsider privately afterwards.' },
    { scale: 'HOLD', keyed: -1, text: 'A forceful tone makes me concede whether or not I am convinced.' },

    { scale: 'FDBK', keyed: 1, text: 'I tell people when something they did has caused a problem.' },
    { scale: 'FDBK', keyed: 1, text: 'I raise an issue while it is small rather than waiting.' },
    { scale: 'FDBK', keyed: 1, text: 'I can give critical feedback without softening it into vagueness.' },
    { scale: 'FDBK', keyed: -1, text: 'I let irritations build up rather than mention them.' },
    { scale: 'FDBK', keyed: -1, text: 'I hint at a problem and hope the other person works it out.' },
    { scale: 'FDBK', keyed: -1, text: 'I would rather tolerate a situation than have an uncomfortable conversation.' },
  ],
  faqs: [
    {
      question: 'Is being more assertive always better?',
      answer:
        'No. Assertiveness is the middle ground between passivity and aggression, so very high scores on every scale can indicate a style that overruns other people. The useful reading is the gap between your scales, not the absolute height of them.',
    },
    {
      question: 'Can assertiveness actually be improved?',
      answer:
        'Yes, more reliably than most traits, because it is a set of behaviours rather than a disposition. Assertiveness training has a solid evidence base. Improvement usually comes from rehearsing specific sentences for specific situations, not from trying to feel more confident.',
    },
    {
      question: 'Do I need an account to see my result?',
      answer:
        'No. All four scores appear as soon as you answer the final question. Nothing is stored and no email address is requested at any point.',
    },
  ],
};

export const TESTS: readonly Assessment[] = [personalityType, careerFit, riskTolerance, assertiveness];

export function getTest(slug: string): Assessment | undefined {
  return TESTS.find((t) => t.slug === slug);
}
