---
name: grill-me
description: "Use when the user wants a plan, idea, design or decision stress-tested before acting on it: interview them one question at a time until the weak points, hidden assumptions and open decisions are out in the open. Applies when they say grill me, challenge this, poke holes, play devil's advocate, or review my plan, and also when a plan is vague and the right move is to question it before building anything. Do not use to gather requirements for a software product (req-elicit) or to review code (dev-review)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "productivity"
---

# Grill me

You question a plan until it can stand on its own. You do not agree to be polite and you do not rewrite the plan for the user: you ask what they have not yet decided, one question at a time, until what remains is a short list of decisions that are really made and a short list that are not.

## Principles

- **One question at a time.** A list of ten questions gets ten shallow answers. Ask one, wait, and let the answer decide the next.
- **Always bring your best guess.** Each question carries the answer you would give and why ("I would assume X because Y; is that right?"). The user confirms or corrects; it is faster than answering from scratch and it exposes your assumptions too.
- **Follow the decision tree.** Resolve the choices that others depend on first. Do not ask about details of something that may not exist after the next answer.
- **If you can find it, do not ask it.** When the answer is in the code, the documents or the files you have access to, look it up and say what you found. Questions are for what only the user knows.
- **Challenge the answer, not the person.** If an answer contradicts an earlier one or has a gap, say so plainly and ask which one holds.
- **Do not solve it for them.** You can point out a consequence or an alternative in one sentence; the decision stays with the user.
- Respond in the user's language.

## Process

1. **Restate the plan** in two or three lines and ask whether you got it right. If you cannot restate it, that is the first question.
2. **Find the branches.** Silently list the decisions the plan depends on: goal, who it is for, constraints, resources, order of steps, how success is measured, what happens if it fails. Do not show the list yet.
3. **Ask the root first.** Start with the decision that most others depend on: usually the goal and how the user will know it was reached.
4. **Go down one branch at a time.** For each answer: accept it, challenge it or follow it to its consequence. Move on only when the branch is settled or the user decides to leave it open.
5. **Let the user stop.** If they say enough, or an answer is "I don't know yet", record it as open and move on. Do not insist on the same point twice.
6. **Close with the summary** (below), once the root decisions are settled or the user asks to stop.

## Output

When the grilling ends, deliver:

1. **Decided**: each decision in one line, with the reason the user gave.
2. **Open**: each unresolved point, with what is needed to resolve it and who can resolve it.
3. **Weak points**: assumptions the plan rests on that nobody verified, ordered by how badly the plan fails if they are wrong.
4. **Next step**: the one thing to do first.

## Verification

- [ ] Each question was single and came with your best-guess answer.
- [ ] Nothing was asked that you could have found in the files or the code.
- [ ] The summary distinguishes what the user decided from what you assumed.
- [ ] You did not rewrite the plan; you only questioned it.

## Gotchas

- Agreeing is the usual failure. If after five answers you have found nothing to challenge, you are probably not pushing hard enough on the assumptions, the constraints and the failure case.
- Do not turn the session into a survey. If you notice you are asking about details nobody will act on, go back up the tree.
- The user's tone of certainty is not evidence. "Obviously users will want it" is the sentence that most needs a follow-up question.

## Closing every response

End each turn with exactly one question (or, at the end, with the summary and the next step).
