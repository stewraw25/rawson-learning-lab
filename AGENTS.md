# Rawson Learning Lab — agent rules

Live: https://stewraw25.github.io/rawson-learning-lab/#/  
Repo: `stewraw25/rawson-learning-lab` (GitHub Pages from `main`)

Do **not** rebuild the hub, homepage hero, or the six-stage pathway.  
Do **not** revert `3a11f8c` (long fun courses + Unlock) or `95808da` (hub + Money climb).

## Family

- **Bella-Rose Rawson** (12) — horses & mini poodles. AI coach: **Kimi Antonelli**.
- **George Rawson** (10) — F1 / go-karting. AI coach: **Gwen Stacy**.
- UK homeschool. British English. Money in £.

## Subjects

Maths, English, Science, plus extras:

- Money (`investing`) — both children
- Karting — George
- Horses — Bella-Rose

## Pathway (keep these names)

| Stage | Core name | Fun courses (`courseStageMeta`) |
|------:|-----------|----------------------------------|
| 1 | First steps (Year 2–4, genuinely easy) | First laps / Pocket money / First yard |
| 2 | Intermediate | Getting quicker / The snowball / Daily care |
| 3 | Secure | Race craft / Real things / Riding on |
| 4 | GCSE Core | Club racer / Markets / Horse sports |
| 5 | GCSE Higher | Hot lap / Your plan / Yard pro |
| 6 | A* Mastery | Champion / Long-term / Horsemaster |

Finish **every lesson in a stage** to unlock the next. Progress = lessons finished, not the placement-test score. Fun courses keep kid names — never slap “GCSE Intermediate” on karting.

## Unlock (must stay true)

When a child taps Unlock / next stage:

1. Persist the **new** stage (`activeStage = N`, cloud keys `s1`, `s2`… via `serializeCourseEntry`).
2. Open **lesson 1 of that stage’s teach bank** (`TEACH_MODULES_STAGE{N}` / fun stage bank).
3. Do **not** copy First steps ticks onto stage 2 (same skill ids, different bank).
4. Do **not** replay stage-1 questions.
5. If a stage is locked, the UI must **say why** (e.g. “Finish the 12 First laps lessons first”), not a dead silent button.

First steps stays on its own bank. Do not mix stage 2–6 questions into a stage-1 lesson. Harder content is what Unlock is for.

## Technical constraints

- Hash routes on GitHub Pages. Vanilla JS. No new framework, no backend rewrite.
- Firebase: persist stages as `s1`, `s2`… Never numeric object keys on the wire (RTDB turns `{1: …}` into an array and wipes ticks).
- Do not restyle the homepage hero.
- Do not break Grok Voice / Cloudflare worker.
- Cache-bust `?v=` on `index.html` and `learn.html` when shipping JS/CSS.
- Small diffs. Match existing style.

## Where to look

- Unlock: `js/app.js` (`unlockAndOpenStage`) → `js/engine.js` (`startCourseStage`, `firstLessonOfStage`)
- Teach banks: `getStageTeachBank` / `getTeachModule` / `funInstallStages`
- Lesson questions: `js/tutor.js` (`collectAdaptiveBanks` — this stage only)
