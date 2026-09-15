/**
 * Career-specific content, kept separate from the type profiles on purpose.
 *
 * The reference audit flagged two URLs on the target site serving near-identical
 * content. The obvious way to build sixteen career pages is to restate the type
 * profile with a job list bolted on, which produces exactly that problem at
 * scale. These fields exist so /careers/<type>/ answers questions the type page
 * never touches: how the type behaves in a job, where their career usually
 * stalls, whether management suits them, and how to run a search.
 */
export interface CareerNotes {
  /** Day-to-day working behaviour, as a colleague would describe it. */
  readonly atWork: string;
  /** The characteristic early-career mistake for this type. */
  readonly trap: string;
  /** Honest read on management as a path. */
  readonly managing: string;
  /** Concrete, type-specific job-search advice. */
  readonly jobSearch: string;
  /** Fields that chronically misfit, and why. */
  readonly avoid: string;
}

export const CAREER_NOTES: Readonly<Record<string, CareerNotes>> = {
  INFJ: {
    atWork: 'INFJs work quietly and deliver more than their visible activity suggests. They form a view of what the team should be doing early, hold it privately, and become frustrated when decisions drift the way they predicted. Colleagues often discover months later how much thinking went into something they delivered without comment.',
    trap: 'Taking on the emotional maintenance of a team that is not paying them for it. INFJs become the person everyone confides in, which is meaningful and also unbudgeted, unrecognised labour that quietly displaces the work they are actually assessed on.',
    managing: 'INFJs make better managers than they expect and worse ones than they want. They read their reports accurately and develop them genuinely, but they avoid the conflict management requires, and they carry other people’s difficulties home. Small teams with a clear mission suit them; large, political organisations do not.',
    jobSearch: 'Interview the mission, not the perks. An INFJ in a role whose purpose they cannot articulate will be unhappy within a year regardless of pay. Ask what the organisation has recently refused to do — the answer tells you more than any values page.',
    avoid: 'High-volume transactional sales, roles whose main output is someone else’s quarterly number, and open-plan environments with no quiet space. Not from fragility — from the specific cost of sustained shallow contact on someone who processes everything deeply.',
  },
  INFP: {
    atWork: 'INFPs do their best work when they believe in it and visibly less when they do not, which makes them look inconsistent to managers who have not noticed the pattern. They are unusually good at work with a voice — writing, design, advocacy — and unusually poor at pretending to care about metrics they find hollow.',
    trap: 'Waiting to be recognised rather than asking. INFPs often assume good work speaks for itself, then feel overlooked while less capable colleagues advance by simply stating what they want.',
    managing: 'Management is rarely the right path for an INFP, and treating that as a failure is the mistake. Senior individual-contributor tracks — principal writer, lead designer, specialist practitioner — offer the same seniority without requiring them to spend their day on conflict and headcount.',
    jobSearch: 'Apply to fewer places, more deliberately. An INFP’s hit rate rises sharply when they write a genuine, specific application to somewhere they actually want to be, and collapses when they mass-apply to roles they feel lukewarm about.',
    avoid: 'Cold-call sales, debt collection, aggressive consultancy cultures, and any role requiring them to argue a position they privately think is wrong. The cost shows up as burnout rather than poor performance.',
  },
  INTJ: {
    atWork: 'INTJs work from a model. They will spend the first weeks in a role understanding how the system actually functions, then propose a restructure that is usually correct and frequently unwelcome. They deliver reliably and dislike being asked for status updates on work they have already planned in full.',
    trap: 'Being right without being heard. INTJs often present a conclusion without the reasoning, assume the logic is self-evident, and then treat the resulting resistance as evidence that the organisation is irrational rather than under-briefed.',
    managing: 'INTJs manage well where competence is the basis of authority and badly where it is not. They develop strong people quickly by handing them real problems, and they lose weaker ones entirely. The transition that breaks them is the one from deciding to persuading.',
    jobSearch: 'Screen for decision-making culture, not role title. Ask how the last significant technical decision was made and who made it. An INTJ with responsibility and no authority will leave inside eighteen months.',
    avoid: 'Roles that are pure coordination, organisations where seniority outranks evidence, and anything requiring sustained enthusiasm for a strategy they have already assessed as flawed.',
  },
  INTP: {
    atWork: 'INTPs go deep on whatever has caught their attention and can be oddly indifferent to whether it is the current priority. Given a genuinely hard problem they will outperform almost anyone; given routine delivery work they quietly stall. They are the colleague who finds the bug nobody could reproduce.',
    trap: 'Optimising understanding over shipping. An INTP can spend a quarter building the correct abstraction for a problem that needed a rough answer in a week, and be genuinely surprised that this was not appreciated.',
    managing: 'Most INTPs should decline management and pursue a staff or principal track instead. The parts of management they find tolerable — technical direction, mentoring on craft — are available without the parts they find intolerable, which is nearly all the rest of it.',
    jobSearch: 'Interview for problem quality and autonomy. An INTP will accept a lower title for a harder problem and should — but they also need to ask directly about process load, because heavy ceremony is the thing that actually drives them out.',
    avoid: 'Highly proceduralised roles, client-facing work requiring constant emotional attunement, and organisations that measure activity rather than outcome.',
  },
  ENFJ: {
    atWork: 'ENFJs raise the performance of people around them, often more than their own output would suggest. They notice who is struggling before their manager does and will reorganise their own week to fix it. Their visible warmth sometimes causes people to underestimate how ambitious and organised they are.',
    trap: 'Absorbing responsibility that belongs to others. ENFJs take on the emotional and practical overflow of a whole team, call it being helpful, and end up over capacity while the people who caused the overflow face no consequence.',
    managing: 'Management genuinely suits ENFJs — it is one of the few types for which this is straightforwardly true. The risk is not capability but boundaries: they need a manager of their own who asks what they are carrying, because they will not volunteer it.',
    jobSearch: 'Check whether the organisation actually acts on its stated values, because an ENFJ in a cynical culture will burn out defending people from it. Ask how a recent difficult people-decision was handled.',
    avoid: 'Purely analytical roles with no human contact, and organisations that treat staff as interchangeable capacity. Both leave an ENFJ with nothing to work on that they find meaningful.',
  },
  ENFP: {
    atWork: 'ENFPs start things. They bring energy to a stalled project, connect people who should have met months ago, and generate more ideas in a meeting than the team can action. Follow-through is the recurring weak point, and they usually know it.',
    trap: 'Job-hopping past the point where it compounds. Three years in one place builds the depth and reputation that makes the next move a genuine step up; a decade of eighteen-month stints builds neither, however interesting each move felt.',
    managing: 'ENFPs manage people well and process badly. They inspire teams and forget the administrative half of the role entirely. They do well with a strong operations partner and poorly alone.',
    jobSearch: 'Beware optimising purely for novelty. An ENFP should ask what the role looks like in month eighteen, once the interesting part is solved, because that is the month they usually start looking again.',
    avoid: 'Highly repetitive operational roles, rigid hierarchies, and long approval chains. Not because ENFPs cannot do the work, but because the disengagement is gradual, invisible, and total.',
  },
  ENTJ: {
    atWork: 'ENTJs arrive with a plan and start assigning. They are comfortable making unpopular calls, they hold people to commitments, and they move faster than most organisations are built for. Their contribution is usually obvious and their cost is usually to morale.',
    trap: 'Mistaking speed for judgement. A young ENTJ builds a reputation for decisiveness, then discovers that several of those fast calls were wrong and that nobody felt able to say so at the time.',
    managing: 'Management is the natural ENTJ path and they generally get there early. The development edge is not competence but listening — specifically, building a team where dissent survives contact with them.',
    jobSearch: 'Negotiate scope of authority explicitly, in writing. ENTJs accept roles on an implied promise of latitude that the organisation never actually made, then leave angry eighteen months later.',
    avoid: 'Slow consensus institutions, roles with accountability but no authority, and cultures where influence flows from tenure. An ENTJ will either break such an organisation or leave it.',
  },
  ENTP: {
    atWork: 'ENTPs are most valuable in the first third of a project, where the framing is still wrong and someone needs to say so. They are least valuable in the last third, when the work is maintenance. Teams that understand this get enormous value from them; teams that do not find them disruptive.',
    trap: 'Winning arguments at the cost of the relationships needed to implement anything. An ENTP can be right in every meeting for a year and end it with no allies and no delivered work.',
    managing: 'ENTPs make interesting managers and inconsistent ones. They develop people through challenge, which suits the robust and damages the fragile. Founder, principal, or head-of-strategy roles usually fit better than line management.',
    jobSearch: 'Optimise for problem novelty and for a colleague who will argue back. An ENTP in a deferential culture becomes either bored or a problem, frequently both.',
    avoid: 'Compliance-heavy roles, long-cycle operations work, and organisations where questioning the premise is read as disloyalty rather than diligence.',
  },
  ISTJ: {
    atWork: 'ISTJs are the reason things do not fall over. They deliver what they committed to, on the date they committed to it, and they notice the discrepancy nobody else caught. Their work is most visible in its absence, which is a chronic career problem for them.',
    trap: 'Assuming reliability is self-evidently valuable and will be rewarded without being stated. ISTJs are routinely passed over by louder colleagues whose contribution is more visible and less dependable.',
    managing: 'ISTJs manage execution superbly and ambiguity poorly. They are excellent where the work is well-defined and struggle where the job is to invent the definition. Operational leadership suits them better than strategic.',
    jobSearch: 'Document specifics. An ISTJ CV tends to under-claim; replacing "responsible for reporting" with the actual scale, accuracy, and saving turns a modest application into a strong one.',
    avoid: 'Startups in genuine flux, roles where priorities change weekly, and organisations that treat process as an obstacle. The mismatch reads as resistance when it is actually accurate risk assessment.',
  },
  ISFJ: {
    atWork: 'ISFJs carry the work that holds a team together and rarely appears in anyone’s objectives. They remember the context, cover the gaps, and notice the colleague who is struggling. They are frequently the most informed person in the room and the least likely to say so.',
    trap: 'Becoming indispensable in a role they have outgrown. An ISFJ who makes themselves the person everything depends on is often the last person the organisation will promote, precisely because the gap would hurt.',
    managing: 'ISFJs manage caringly and can struggle to hold people to account, particularly someone they like. The skill worth building deliberately is separating "I am disappointed in this work" from "I am rejecting you", which they feel acutely and their reports usually do not.',
    jobSearch: 'Ask for what you want explicitly. ISFJs frequently accept the first offer and rarely negotiate, which compounds into a substantial lifetime cost over a career.',
    avoid: 'Cut-throat commission environments, roles requiring constant public confrontation, and organisations undergoing perpetual restructure.',
  },
  ESTJ: {
    atWork: 'ESTJs organise. Dropped into a shapeless situation they produce owners, dates, and standards within a week, and they enforce them evenly. They are trusted because they are consistent, and resented when consistency hardens into inflexibility.',
    trap: 'Defending an established process past the point where it serves the goal. An ESTJ can spend years being extremely effective at running a system that should have been replaced.',
    managing: 'Management suits ESTJs and they usually reach it early. The development edge is hearing objections that arrive in emotional rather than analytical form — which is most objections, from most people.',
    jobSearch: 'Target organisations that actually enforce their own standards. An ESTJ in a permissive culture spends their energy on enforcement rather than delivery and becomes the disliked one for it.',
    avoid: 'Ambiguous matrix structures with no clear ownership, early-stage companies without process, and roles that are pure influence without authority.',
  },
  ESFJ: {
    atWork: 'ESFJs make workplaces function humanly. They organise the practical support, remember the context that matters to each person, and keep a team connected. They are often the reason people stay somewhere, and this almost never appears in a performance review.',
    trap: 'Tying professional self-worth to being liked. An ESFJ who avoids every difficult conversation to preserve harmony ends up with a team that likes them and does not respect the standard.',
    managing: 'ESFJs manage warmly and effectively where the work is well-defined. The hard part is critical feedback, which they delay until it is either overdue or delivered with more heat than they intended.',
    jobSearch: 'Assess the team, not just the role. An ESFJ in a hostile or purely transactional team will be unhappy regardless of the work itself, more so than most types.',
    avoid: 'Isolated remote analytical roles, environments with sustained interpersonal conflict, and cultures where warmth is read as a lack of seriousness.',
  },
  ISTP: {
    atWork: 'ISTPs are the person you want when something is broken. They diagnose calmly, fix efficiently, and say very little about it. They are indifferent to process for its own sake and will route around it, which makes them invaluable in a crisis and awkward in an audit.',
    trap: 'Letting expertise stay invisible. ISTPs solve difficult problems without documenting or communicating them, then find that the credit and the promotion went to whoever explained the work in the meeting.',
    managing: 'Most ISTPs should stay technical. Management asks for exactly the things they find draining — meetings, emotional labour, forward planning — in exchange for authority they can often get through expertise instead.',
    jobSearch: 'Screen hard for autonomy and meeting load. Ask how many recurring meetings the role carries; the honest answer predicts an ISTP’s satisfaction better than salary does.',
    avoid: 'Heavily proceduralised bureaucracies, roles that are primarily coordination, and any job where the main output is a document about work rather than the work.',
  },
  ISFP: {
    atWork: 'ISFPs bring real craft and taste to concrete work and are often better than their quiet self-presentation suggests. They need autonomy over how the work is done and respond badly to being managed in detail — not from arrogance, but because close supervision genuinely degrades their output.',
    trap: 'Undercharging and under-claiming. ISFPs consistently price their work below its value and describe their skills modestly, which compounds badly in freelance and creative fields where the rate you name is the rate you get.',
    managing: 'Management usually costs an ISFP more than it returns. Senior craft roles, freelance practice, or a small studio give them the autonomy they need without the conflict load.',
    jobSearch: 'Show the work rather than describing it. An ISFP portfolio does more than an ISFP cover letter, and they should invest accordingly.',
    avoid: 'Corporate political environments, aggressive targets, roles with heavy public confrontation, and anywhere quality is systematically traded for volume.',
  },
  ESTP: {
    atWork: 'ESTPs are effective where things are actually moving. They read a live situation accurately, commit while the window is open, and recover from a bad call without drama. Planning documents and long approval cycles waste them entirely.',
    trap: 'Building a career on momentum rather than compounding skill. ESTPs can spend a decade in a series of energetic roles and find they have breadth but no deep expertise to trade on when the market tightens.',
    managing: 'ESTPs lead well in operational and crisis contexts and less well where the job is patient development of people over years. Sales leadership, site management, and emergency command fit; slow-burn strategic leadership rarely does.',
    jobSearch: 'Optimise for live stakes and short feedback loops. An ESTP should ask how quickly they will know whether they are doing well — if the answer is "at the annual review", it is the wrong role.',
    avoid: 'Desk-bound analytical roles, long planning cycles, and organisations where nothing observable changes between quarters.',
  },
  ESFP: {
    atWork: 'ESFPs lift the people around them and are genuinely good in the moment — with customers, patients, students, audiences. They read a room accurately and respond practically. Administrative tails and long solitary stretches are the reliable weak point.',
    trap: 'Staying in roles that are enjoyable but capped. ESFPs often discover at thirty-five that the work they liked has no senior version, and that the qualification which would have opened one was a two-year course they kept deferring.',
    managing: 'ESFPs manage warmly and are strong on morale and customer outcomes. Planning, reporting, and difficult performance conversations are where they need structure or a deputy.',
    jobSearch: 'Ask what the role looks like at senior level and what qualification it needs. An ESFP’s biggest career risk is a ceiling they did not notice until they reached it.',
    avoid: 'Solitary analytical work, long-range strategy roles, and rigid routine with no human contact.',
  },
};

export function getCareerNotes(code: string): CareerNotes | undefined {
  return CAREER_NOTES[code.toUpperCase()];
}
