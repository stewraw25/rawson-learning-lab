# Weekly notes — 2 November 2026

First weekly review. Nothing here is live until Stewart merges it.

## Fixed

- A handful of questions were repeated (the same horse-water question twice in the placement test, the same simile, the same “knights often rode”, and two “field horses still need” questions). Each one now asks something different.
- Some exam explanations were only a symbol or the word “No.” They now say why.
- A typed answer such as “twelve” or “£8” was marked wrong when the real answer was 12 or 8. Those are accepted now. A different number is still wrong.
- Bella’s money page said “George’s pot”. It now uses whichever child is learning.
- If a level is locked, the reason is written on the subject page (for example “Finish the 6 First steps lessons first”), not only inside a closed menu.
- Pressing Check with no answer used to pop up a box that froze the page. It now shows a line on the page and points at Something’s wrong?
- A right answer used to jump on in half a second. It now waits a moment, and opening Something’s wrong? stops the jump.
- Horses now earn stars and badges the same way karting and money do.

## Added

- **Something’s wrong?** on every lesson, placement question, Power 5, exam question, and the Learn window. The child can pick Stuck, The answer seems wrong, A button doesn’t work, or Too hard, and can type a short note. Email Stewart opens a message to stewraw25@hotmail.co.uk. The subject starts with “Something’s wrong - Rawson Learning Lab”. The message includes the child’s name, the section, the lesson, the question and the note. **Skip this and carry on** is always there, so a question cannot trap them. A copy is saved in the browser (the last 100 notes) if Mail is not set up. No accounts and no secret keys.
- A fresh week of questions inside the lessons that already exist (so unlocking the next level is unchanged). Two easy ones in every First steps lesson, and one harder one in every Intermediate lesson:
  - Maths 18, English 15, Science 12, Horses 24
  - George’s karting 36 (First laps and Getting quicker)
  - Money, for both children, 36 (Pocket money and The snowball)
- Stars, badges and saved progress still work. A new “Fresh questions” badge appears when a new question is answered right.
- `node scripts/check-lessons.js` checks every question for both children: one correct answer, an explanation, no duplicate, and the lesson can be finished. It also checks the problem-button email and the saved note.

## Next week

- Read any notes the children send. If Mail does not open on the iPad, the notes are still in that browser. A Parent zone list of those notes would make them easier to see.
- Add the next step up (Secure / Race craft / Real things / Riding on) once this week’s questions have been seen, still with no repeats.
- Keep running `node scripts/check-lessons.js` before anything goes live.
