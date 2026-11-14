# Weekly notes — 14 November 2026

Nothing here is live until Stewart merges it. Saved progress was not reset, and this week’s checks did not write to the family’s cloud copy.

No problem reports arrived from the “Something’s wrong” button this week.

## Fixed

- A lesson only counts as finished at 7 in every 10 or better. A 6-out-of-10 sitting used to say “Lesson finished · saved” and skip on to the next lesson. It now says “Have another go” and stays on the same lesson. Older sittings that were already saved are left as they are.
- A question a child has already got right stays retired. It used to come back once only a few new ones were left, and an empty lesson could finish itself at 0% and look stuck. The lesson now says it is cleared, and “Practice these again” brings the questions back only when they ask.
- This week’s easy questions show on the easier setting. A step-up question does not.
- In Formula 1 and Horse world, “I don’t know” and a miss come back once, the same as go-karting and Money. They do not shuffle the lesson into a loop.
- Horses, Formula 1 and Horse world show their stars on the finished-lesson screen, the same as go-karting and Money.
- Saving a lesson on a level that had not been opened yet could throw and drop the tick. It now keeps the tick. A reload still keeps the lesson and the badge, and a cloud copy still uses s1, s2… so a save cannot be wiped by being stored as a list.
- Trying the site on this computer no longer talks to the family’s cloud lessons, so a practice run cannot change them.
- Early and middle lessons no longer show a “did you know” line about algebra, GCSE, or star-forged elements. Those lines wait for the later levels.

## Added

Fresh questions inside the lessons that already exist. Two easy ones in every early lesson, then one step up, then one Secure-level question. The thinner year lessons got the same, so they stop repeating. No algebra in the early or middle levels. No new levels, so nobody jumps toward GCSE. Formula 1 stays separate from go-karting. Horse world stays separate from daily horse care.

- Maths 64 (First steps 32, Intermediate 16, Secure 16), including the ten early year lessons
- English 52 (First steps 26, Intermediate 13, Secure 13), including the eight early year lessons
- Science 44 (First steps 22, Intermediate 11, Secure 11), including the seven early year lessons
- Horses 38 (First yard 22, Daily care 8, Riding on 8)
- Go-karting 54 (First laps 30, Getting quicker 12, Race craft 12)
- Money 54, for both children (Pocket money 30, The snowball 12, Real things 12)
- Formula 1 24, still its own section (First grid 12, Reading the race 6, How it works 6)
- Horse world 24 (First horses 12, How they move 6, Famous and real 6)

About 354 new questions. Stars, badges and saved lessons stay. `node scripts/check-lessons.js` plays every lesson for both children.
