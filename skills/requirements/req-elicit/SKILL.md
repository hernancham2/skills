---
name: req-elicit
description: "Use at the start of a software project or feature to discover needs: identify stakeholders, prepare interviews, workshops, surveys or observation, and process raw notes or transcripts from those sessions."
license: MIT
metadata:
  author: "Hernan"
  version: "2.0.0"
  phase: "requirements"
  reads: "PRODUCT.md, docs/requirements/findings.md"
  writes: "docs/requirements/findings.md"
---

# Requirements elicitation

You help an analyst discover what people need before proposing software. You prepare, organize and spot gaps; the analyst is the one who talks to the stakeholders.

## Principles

- **Never invent.** Every finding has a source (a role or a document). Anything without one is an *assumption* or an *open question* and is marked as such.
- **Problem before solution.** Do not propose screens, technologies or architecture at this stage.
- **The user's language.** Questions are about their work, not about "the system". Never ask "what system do you want?", "web or mobile?", "which technology?".
- **Remove, don't add.** Point out what looks unnecessary instead of piling up requests.
- Respond in the user's language.

## Choose the mode based on what you are given

| You are given | Mode |
| :--- | :--- |
| Only an idea or a brief | A. Kick-off |
| Context, but it is unclear whom to consult | B. Stakeholder map |
| A session coming up | C. Prepare a session |
| Notes, transcripts, emails, documents | D. Process material |

If the business goal or the current situation is missing, ask for both in one short question before continuing. If the user does not know them, continue and leave them as the first open question.

## A. Kick-off

Deliver, in this order:
1. What is understood of the brief in 2 or 3 lines (the problem, not the solution).
2. What is still unknown about the context: current situation, why now, what happens if nothing is done, how success will be measured, known constraints (date, budget, mandatory technology, regulation).
3. A preliminary stakeholder map (mode B).
4. An elicitation plan: with whom, with which technique, in what order.

## B. Stakeholder map

Always go through these categories and say explicitly when one does not apply:

- **Sponsor:** provides resources, sets goals, accepts or rejects.
- **Direct users:** use the software; include other systems or devices that connect to it.
- **Indirect users:** receive the benefit or consume the information without using it.
- **Rule setters:** regulators, legal, internal policies.
- **Team and operations:** development, support, infrastructure, training.
- **Negatively affected or opponents:** those who lose control, tasks or jobs because of the change.

Output table: Role (never personal names) | Type | What they care about | Power / Interest (high or low) | What we need to learn from them | Suggested technique.

High power + high interest: involve closely. High power + low interest: keep satisfied. Low power + high interest: keep informed and consult. Not every user is a key stakeholder: prioritize those who own the problem and can validate the solution.

## C. Prepare a session

### Choose a technique

| Situation | Technique |
| :--- | :--- |
| Few representative users, little time | Interview |
| Several groups with different or conflicting interests; agreement is needed | Workshop |
| Product similar to something existing; attitudes and preferences are sought | Focus group |
| Many or geographically dispersed users | Survey (as an initial input) |
| They cannot explain their work because it is routine | On-site observation (max. 2 h) or contextual inquiry |
| There are manuals, processes, forms, support tickets | Document analysis (they may be outdated) |
| There is an existing system or a competitor | Analysis of the existing system |
| They struggle to imagine the solution | Paper prototype to provoke reactions |

Recommend combining at least two.

### Interview script

Structure: introduction and goal (2 min), permission to record, questions, closing. Order the questions from general to specific and cover these blocks:

1. **Context:** role, responsibilities, who they work with.
2. **Typical day:** "Describe what a normal workday looks like."
3. **Specific incident:** "Tell me about the last time you did X, step by step." Worth more than any general description.
4. **Pain:** what is slowest, what repeats most, what causes the most errors.
5. **Current workarounds:** spreadsheets, notebooks, WhatsApp, sticky notes. Every workaround is an unmet requirement.
6. **Goals:** what they would like to be able to do today that they cannot.
7. **Exceptions:** "What happens when something goes wrong? What is the strangest case?"
8. **Volume and frequency:** how many, how often, peak hours and days.
9. **Quality, in their words:** how long they can wait, what happens if it goes down, who must not see what.
10. **Success:** "How would you know this worked?"
11. **Closing:** "What didn't I ask that I should know?" and "Who else should I talk to?"

Rules for writing questions:
- Open-ended, one idea per question.
- About the past and present, not hypothetical. "Would you use…?" produces unreliable answers; "When was the last time you…?" produces facts.
- Without leading the answer or mentioning solutions.
- Without technical vocabulary.

At the end of the script, include these reminders for the analyst:
- Listen more than you talk; tolerate silence.
- When a solution is requested ("I want a button that…", "I want a cloud"), ask: "What would that let you do?" until you reach the need.
- When you hear "fast", "easy", "nice": ask for an example and a number.
- Ask "why?" several times in a row to reach the cause.
- Paraphrase what you understood and ask for confirmation.

### Workshop
One single goal, participants by role, an agenda with times and breaks, a dynamic (map the current process, then pains, then prioritize), rules (ideas are discussed, not people), one facilitator and a different person taking notes. Say how to give a voice to those who do not participate.

### Focus group
A neutral facilitator, explicit consent to record, participants who have already used similar products, questions about what was left uncovered for them.

### Survey
Closed questions with mutually exclusive options, consistent scales throughout the questionnaire, "Other" only where it adds something, 10 to 12 questions at most, one open question at the end.

### Observation
Which activities to observe, of which types of user, and a recording sheet: tools, layout of the space, objects, interruptions, people they interact with, steps that appear in no manual.

## D. Process material

Read everything before writing. Extract each finding as a row and **do not turn it into a formal requirement yet**.

Findings table: ID (F-01…) | Type | Finding | Source (role or document) | Certainty (fact / opinion / assumption).

Types:
- **Activity:** something someone does or needs to do.
- **Pain:** a current problem or inefficiency.
- **Goal:** an aspiration or expected result.
- **Business rule:** policy, calculation, condition, regulation.
- **Constraint:** technology, budget, date, mandatory hardware.
- **Data:** a domain concept or entity and what is known about it.
- **Quality:** an expectation about speed, availability, security, ease of use.
- **Context:** other systems, devices, locations, connectivity, volumes.
- **Requested solution:** record it as stated and add the underlying need if known; if not, generate a question.

After the table, deliver:
1. **Contradictions** between sources, indicating who said what.
2. **Ambiguous terms or terms with more than one meaning** (glossary candidates).
3. **Gaps:** stakeholder categories not consulted, unexplored exceptions, qualities without a number, unknown volumes.
4. **Open questions**, grouped by whom to ask.
5. **Candidates to discard:** requests from a single person, of low value or unrelated to the business goal.

If the source of something cannot be determined, write "unknown source"; do not deduce it.

## Project context

When you work inside the project's repository:

- **Read before asking:** `PRODUCT.md` and `docs/requirements/findings.md`, if they exist. What is already defined or recorded is not asked again.
- **Write** the findings table, contradictions, gaps and open questions to `docs/requirements/findings.md`. If the file exists, append at the end and continue the ID numbering; do not rewrite earlier findings.
- You do not write `PRODUCT.md`: `req-specify` does that when findings become decisions.
- If there is no repository or files cannot be written, deliver the table in the conversation under that file name.

## Closing every response

End with the concrete next step: another session (with whom and for what) or, if the critical gaps are closed, moving on to the `req-specify` skill with the findings table. Suggest saving the table as a file so it can be reused.
