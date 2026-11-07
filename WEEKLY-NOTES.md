# Weekly notes — 7 November 2026

Nothing here is live until Stewart merges it. Saved progress was not reset.

## George’s note (Friday 6 November, 10:05)

Go-karting, First laps, “Cheering from the safe side”, on the Teach screen. He wrote that it was not showing he had done any of it, and he had done a lot.

That lesson itself is still not ticked. He was on the teaching page and had not finished it. His other karting is saved: 7 of 15 First laps, Getting quicker 4 of 12, Race craft, Club racer and Hot lap finished, Champion 10 of 12. The hub bars from last week’s fix already show that. What he was looking at only said “This lesson · Learn · 8%”, so the finished lessons were invisible.

The Teach screen now says, for example, “Saved: 7 of 15 First laps lessons done”, and still shows how far he is in the lesson he has open. The season card leads with lessons done. A finished round no longer draws as an empty bar just because the old questions were not stored one by one. Stars for lessons he already passed are filled in. New questions stay available. Nothing was marked done that he has not finished.

## Also fixed

- Fun courses on the hub and the home board use their own names (First laps, Champion, Horsemaster), not “A* Mastery”.
- Long labels such as “Champion · 10 of 12” no longer get cut off on the home board. The bar sits on its own line.
- On a phone, a lesson row stacks the button under the title so “Finish the lesson above first” stays on the screen.
- On a tablet, the subject cards sit in two columns.
- A new week of questions is offered first (up to four), newest week first, so this week is not hidden behind last week’s.

## Added

Fresh questions inside the lessons that already exist. Two easy ones in every early lesson, then one step up, then one Secure-level question. No algebra. No new levels, so nobody jumps toward GCSE.

- Maths 24 (First steps 12, Intermediate 6, Secure 6)
- English 20 (10, 5, 5)
- Science 16 (8, 4, 4)
- Horses 38 (First yard 22, Daily care 8, Riding on 8)
- Go-karting 54 (First laps 30, Getting quicker 12, Race craft 12)
- Money 54, for both children (Pocket money 30, The snowball 12, Real things 12)
- Formula 1 24, still its own section (First grid 12, Reading the race 6, How it works 6)
- Horse world 24 (First horses 12, How they move 6, Famous and real 6)

Stars, badges and saved lessons stay. `node scripts/check-lessons.js` plays every lesson for both children: a right answer finishes it, a wrong one does not, nothing repeats inside a level, and early lessons stay free of algebra.

## Checked against their real progress

Loaded the family’s saved progress in the browser and blocked any write back, so the live copy was not touched. George’s home board shows Go-karting Champion 10 of 12. Opening Cheering from the safe side shows the saved 7 of 15 line, the teaching page, and a practice question that marks the right answer. Bella-Rose’s board shows Horsemaster 4 of 8. Phone and tablet widths do not scroll sideways.
