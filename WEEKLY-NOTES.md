# Weekly notes — 28 November 2026

Nothing here is live until Stewart merges it. Saved progress was not reset, and this week’s checks did not write to the family’s cloud copy.

No problem reports arrived from the “Something’s wrong” button this week. The button still opens on a lesson, keeps a note on this device, and can email Stewart.

## Checked

Every lesson for Bella-Rose and George was played through: each question has one right answer, a wrong answer is not marked right, and a finished lesson still saves. Goals, stars and badges survive a reload. New questions do not wipe an old tick, and cloud saves still use `s1`, `s2` and so on.

Nothing in the lessons was stuck, dead-ended or repeating, so there is no repair in this week’s change. The fresh questions sit inside the lessons that already exist.

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
