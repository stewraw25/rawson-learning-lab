/**
 * Week of 21 November 2026 — fresh questions.
 * First steps stays easy and long. Intermediate is one step up.
 * Secure is still primary school: no letters standing for numbers,
 * and no secondary-school science.
 * Nothing here repeats a question the children already have.
 */
function week5Multi(q, options, answer, explain, passage) {
  const item = {
    q: q,
    type: "multi",
    options: options,
    answer: answer,
    explain: explain,
    stage: "both",
    week: 5,
  };
  if (passage) item.passage = passage;
  return item;
}

function week5Typed(q, answer, explain) {
  return {
    q: q,
    type: "typed",
    answer: String(answer),
    explain: explain,
    stage: "both",
    week: 5,
  };
}

function week5Row(q, options, answer, explain, diff) {
  return [q, options, answer, explain, diff || 2, 5];
}

const WEEK5_CORE = {
  maths: {
    number: {
      1: [
        week5Typed("What number comes after 39?", "40", "Count on one step: 39, then 40."),
        week5Multi(
          "Of 18, 80, 8 and 28, which count is the greatest?",
          ["18", "80", "8", "28"],
          1,
          "80 is greater than 28, 18 and 8."
        ),
      ],
      2: [
        week5Typed("What is 100 less than 640?", "540", "Taking away 100 changes the hundreds digit: 640 − 100 = 540."),
      ],
      3: [
        week5Typed("What number is 2000 + 300 + 40 + 6?", "2346", "2 thousands, 3 hundreds, 4 tens and 6 ones make 2346."),
      ],
    },
    operations: {
      1: [
        week5Typed("What is 14 − 9?", "5", "Start at 14 and count back 9. You land on 5."),
        week5Typed("What is 3 × 6?", "18", "Three groups of 6 make 18. Count 6, 12, 18."),
      ],
      2: [
        week5Typed("What is 28 ÷ 7?", "4", "Seven fours are 28, so 28 ÷ 7 = 4."),
      ],
      3: [
        week5Typed("What is 9 × 6?", "54", "Nine sixes are 54. You can add 6 nine times if you prefer."),
      ],
    },
    fractions: {
      1: [
        week5Typed("What is half of 28?", "14", "Half means two equal parts. 28 ÷ 2 = 14."),
        week5Typed("What is a quarter of 16?", "4", "A quarter is 4 equal parts. 16 ÷ 4 = 4."),
      ],
      2: [
        week5Typed("What is 1/4 of 36?", "9", "One quarter means divide by 4. 36 ÷ 4 = 9."),
      ],
      3: [
        week5Typed("What is 1/10 of 80?", "8", "One tenth means divide by 10. 80 ÷ 10 = 8."),
      ],
    },
    algebra: {
      1: [
        week5Typed("What do you add to 4 to make 10?", "6", "4 and 6 more make 10. Count on if you want to."),
        week5Typed("What do you add to 7 to make 10?", "3", "7 and 3 more make 10. No letter is needed."),
      ],
      2: [
        week5Typed("What is 5 × 6?", "30", "Five groups of 6 make 30. Count 6, 12, 18, 24, 30."),
      ],
      3: [
        week5Typed(
          "Count in fives: 15, 20, 25, 30. What comes next?",
          "35",
          "The pattern adds 5 each time. 30 and 5 more is 35."
        ),
      ],
    },
    geometry: {
      1: [
        week5Typed("Count the sides on a square.", "4", "Go around a square and you count 4 sides."),
        week5Multi(
          "Which shape has exactly 3 corners?",
          ["A triangle", "A circle", "A rectangle"],
          0,
          "A triangle has 3 corners. A rectangle has 4. A circle has none."
        ),
      ],
      2: [
        week5Typed(
          "A rectangle is 7 cm long and 2 cm wide. What is the perimeter in cm?",
          "18",
          "Go all the way round: 7 + 2 + 7 + 2 = 18 cm."
        ),
      ],
      3: [
        week5Typed(
          "A square has sides of 9 cm. What is the area in square centimetres?",
          "81",
          "Area of this square is side times side. 9 × 9 = 81."
        ),
      ],
    },
    data: {
      1: [
        week5Multi(
          "Two full tally gates, with no extra marks, count as…",
          ["10", "2", "8"],
          0,
          "Each gate is 5. Two gates are 10."
        ),
        week5Typed(
          "There are 7 green apples and 4 red apples. How many apples altogether?",
          "11",
          "7 and 4 more is 11 apples."
        ),
      ],
      2: [
        week5Typed(
          "The numbers are 3, 12 and 5. What is the range?",
          "9",
          "Range is biggest minus smallest. 12 − 3 = 9."
        ),
      ],
      3: [
        week5Typed(
          "The numbers are 4, 9, 4 and 6. What is the mode?",
          "4",
          "4 appears twice. The others appear once, so 4 is the mode."
        ),
      ],
    },
    "y-place": {
      1: [
        week5Typed("In 47, how many ones are there?", "7", "The 7 is in the ones place, so there are 7 ones."),
        week5Typed("What number is 4 tens and 8 ones?", "48", "4 tens is 40, and 8 more is 48."),
      ],
      2: [
        week5Typed("What number is 300 + 60 + 2?", "362", "3 hundreds, 6 tens and 2 ones make 362."),
      ],
      3: [
        week5Typed("In 2500, what is the hundreds digit?", "5", "2500 is 2 thousands and 5 hundreds. The hundreds digit is 5."),
      ],
    },
    "y-bonds": {
      1: [
        week5Typed("What do you add to 6 to make 20?", "14", "6 and 14 make 20. Count on from 6 if you want to."),
        week5Multi(
          "Which pair adds up to 20?",
          ["12 and 8", "12 and 6", "9 and 9"],
          0,
          "12 and 8 make 20. The other pairs make 18."
        ),
      ],
      2: [
        week5Typed("What do you add to 25 to make 100?", "75", "25 and 75 make 100. Count on from 25 if that helps."),
      ],
      3: [
        week5Typed("What do you add to 350 to make 1000?", "650", "350 and 650 make 1000. Count on from 350 if you want to."),
      ],
    },
    "y-add": {
      1: [
        week5Typed("What is 9 + 8?", "17", "9 and 1 make 10, and 7 more is 17."),
        week5Typed("What is 5 + 9?", "14", "5 and 9 more is 14. You can count on from 9."),
      ],
      2: [
        week5Typed("What is 46 + 30?", "76", "46 and 3 tens is 76."),
      ],
      3: [
        week5Typed("What is 128 + 40?", "168", "The tens go from 2 to 6. 128 + 40 = 168."),
      ],
    },
    "y-sub": {
      1: [
        week5Typed("What is 15 − 6?", "9", "Count back 6 from 15. You land on 9."),
        week5Typed("What is 12 − 8?", "4", "12 take away 8 is 4."),
      ],
      2: [
        week5Typed("What is 70 − 20?", "50", "7 tens take away 2 tens is 5 tens, which is 50."),
      ],
      3: [
        week5Typed("What is 3000 − 500?", "2500", "30 hundreds take away 5 hundreds is 25 hundreds, which is 2500."),
      ],
    },
    "y-count": {
      1: [
        week5Typed("Three groups of 4. How many is that?", "12", "Three groups of 4 make 12. Count 4, 8, 12."),
        week5Multi(
          "Which of these is an odd number?",
          ["11", "8", "14"],
          0,
          "11 cannot be split into pairs. 8 and 14 can."
        ),
      ],
      2: [
        week5Typed("What is 7 × 3?", "21", "Seven threes are 21. Count on in threes if you want to."),
      ],
      3: [
        week5Typed("What is 11 × 2?", "22", "11 and 11 is 22. Two groups of 11."),
      ],
    },
    "y-share": {
      1: [
        week5Typed("15 grapes shared between 5 children. How many each?", "3", "5 equal groups in 15 is 3 each. 15 ÷ 5 = 3."),
        week5Typed("18 shared into 2 equal groups. How many in each?", "9", "Eighteen shared into 2 equal groups is 9 each. 18 ÷ 2 = 9."),
      ],
      2: [
        week5Typed("What is 18 ÷ 6?", "3", "Six threes are 18, so 18 ÷ 6 = 3."),
      ],
      3: [
        week5Typed("What is 56 ÷ 7?", "8", "Seven eights are 56, so 56 ÷ 7 = 8."),
      ],
    },
    "y-money": {
      1: [
        week5Typed("How many pence are in £4?", "400", "£1 is 100 pence, so £4 is 400 pence."),
        week5Multi(
          "20p and 5p together make…",
          ["25p", "15p", "£25"],
          0,
          "20 and 5 more is 25 pence. That is not £25."
        ),
      ],
      2: [
        week5Typed("You pay 45p with £1. How many pence change?", "55", "100 pence take away 45 pence is 55 pence."),
      ],
      3: [
        week5Typed("What is a quarter of £12?", "3", "A quarter of 12 pounds is 3 pounds. This is a practice sum."),
      ],
    },
    "y-time": {
      1: [
        week5Multi(
          "Quarter past 2 is…",
          ["2:15", "2:45", "2:30"],
          0,
          "Quarter past means 15 minutes after the hour."
        ),
        week5Typed("A full day and night lasts how many hours?", "24", "A full day and night is 24 hours."),
      ],
      2: [
        week5Typed("Half of 60 minutes is how many minutes?", "30", "Half an hour is 30 minutes, because half of 60 is 30."),
      ],
      3: [
        week5Typed("A ride starts at 10:05 and ends at 10:50. How many minutes is that?", "45", "From 10:05 to 10:50 is 45 minutes."),
      ],
    },
    "y-measure": {
      1: [
        week5Typed("How many centimetres are in 3 metres?", "300", "One metre is 100 centimetres, so 3 metres is 300 centimetres."),
        week5Multi(
          "Which is heavier to carry, if the labels are honest?",
          ["2 kilograms", "200 grams", "They weigh the same"],
          0,
          "2 kilograms is 2000 grams, which is much more than 200 grams."
        ),
      ],
      2: [
        week5Typed("How many grams are in one kilogram?", "1000", "A kilogram is 1000 grams."),
      ],
      3: [
        week5Typed(
          "A rectangle is 8 cm long and 4 cm wide. What is the area in square centimetres?",
          "32",
          "Area here is length times width. 8 × 4 = 32."
        ),
      ],
    },
    "y-shape2": {
      1: [
        week5Multi(
          "Which shape has 4 equal sides and 4 square corners?",
          ["A square", "A triangle", "A circle"],
          0,
          "A square has equal sides and square corners. A triangle has 3 sides."
        ),
        week5Typed("Count the sides on a pentagon.", "5", "A pentagon has 5 sides. You can count them around the shape."),
      ],
      2: [
        week5Typed(
          "A triangle has sides of 6 cm, 6 cm and 4 cm. What is the perimeter in cm?",
          "16",
          "Add every side. 6 + 6 + 4 = 16 cm."
        ),
      ],
      3: [
        week5Multi(
          "An angle bigger than a right angle, but not a straight line, is called…",
          ["obtuse", "a tally", "a litre"],
          0,
          "A right angle is a square corner. A wider opening that is not a straight line is obtuse."
        ),
      ],
    },
  },
  english: {
    grammar: {
      1: [
        week5Multi(
          "Which word is the verb in 'George steers the kart'?",
          ["George", "steers", "kart"],
          1,
          "Steers is the doing word. That is the verb."
        ),
        week5Multi(
          "Which of these can stand on its own as a sentence?",
          ["The pony drank.", "Drank the water", "Pony"],
          0,
          "It starts with a capital, ends with a full stop, and can stand on its own."
        ),
      ],
      2: [
        week5Multi(
          "Which sentence has the verb that matches horses?",
          ["The horses was quiet.", "The horses were quiet.", "The horses is quiet."],
          1,
          "Horses is plural, so the verb is were, not was."
        ),
      ],
      3: [
        week5Multi(
          "Which word is the adjective in 'the muddy lane'?",
          ["muddy", "the", "lane"],
          0,
          "Muddy describes the lane. A describing word is an adjective."
        ),
      ],
    },
    punctuation: {
      1: [
        week5Multi(
          "Which line is asking something?",
          ["Where is the lead rope?", "The rope is on the hook.", "Rope on the hook"],
          0,
          "A question asks something and ends with a question mark."
        ),
        week5Multi(
          "Which spelling of because is the real word?",
          ["because", "becuase", "becaus"],
          0,
          "Because has the letters b-e-c-a-u-s-e."
        ),
      ],
      2: [
        week5Multi(
          "Which line separates the packed items with a comma?",
          [
            "She packed a hat, crop and gloves.",
            "She packed a hat crop and gloves.",
            "She packed, a hat crop and gloves",
          ],
          0,
          "Commas separate the items. The last pair can use and."
        ),
      ],
      3: [
        week5Multi(
          "Which sentence shows that the rug belongs to one pony?",
          ["The pony's rug is wet.", "The ponies rug is wet.", "The pony rug is wet?"],
          0,
          "The rug belongs to the pony, so pony's takes an apostrophe."
        ),
      ],
    },
    vocabulary: {
      1: [
        week5Multi("What does huge mean?", ["Very big", "Very quiet", "Very early"], 0, "Huge means very big."),
        week5Multi(
          "Which word means the opposite of hot?",
          ["Cold", "Warm", "Boiling"],
          0,
          "Cold is the opposite of hot. Warm and boiling are still hot words."
        ),
      ],
      2: [
        week5Multi(
          "Which word means the same as begin?",
          ["Start", "Finish", "Forget"],
          0,
          "Start and begin mean almost the same thing. They are synonyms."
        ),
      ],
      3: [
        week5Multi(
          "In 'the track was slick', slick means…",
          ["slippery", "a kind of cake", "a full stop"],
          0,
          "Here slick means slippery, like a wet surface. Read the word in the sentence."
        ),
      ],
    },
    reading: {
      1: [
        week5Multi(
          "What did the pony drink?",
          ["Water", "A riding hat", "A newspaper"],
          0,
          "The passage says the pony drank water. That is the fact to find.",
          "The grey pony stood by the trough and drank water."
        ),
        week5Multi(
          "Who waved the flag?",
          ["The marshal", "The horse", "The piggy bank"],
          0,
          "The passage says the marshal waved the flag.",
          "The marshal waved the yellow flag and the karts slowed down."
        ),
      ],
      2: [
        week5Multi(
          "Why did Bella close the stable door?",
          ["The rain had started", "She wanted a new name", "The door was a verb"],
          0,
          "The sentence gives the reason: the rain had started.",
          "The rain started, so Bella closed the stable door and checked the bolt."
        ),
      ],
      3: [
        week5Multi(
          "What can you tell from the undone strap, even though nobody says it?",
          ["George was not ready to drive yet", "The helmet can eat hay", "The visor is a question"],
          0,
          "If the strap is still undone, he is not ready to drive. That is a simple inference.",
          "George held his helmet, but the strap was still undone."
        ),
      ],
    },
    writing: {
      1: [
        week5Multi(
          "Which line is a proper sentence about a pony?",
          ["The pony waited.", "Waited by the gate", "Pony"],
          0,
          "It can stand on its own. It has a what and a doing word."
        ),
        week5Multi(
          "Which of these openings begins with a capital letter?",
          ["Before breakfast I filled the bucket.", "before breakfast I filled the bucket.", "before breakfast"],
          0,
          "A sentence starts with a capital letter, including the first word."
        ),
      ],
      2: [
        week5Multi(
          "Which sentence tells you why the visor came down?",
          ["George lowered the visor because the rain had started.", "George lowered the visor.", "Visor rain"],
          0,
          "Because tells the reader the reason."
        ),
      ],
      3: [
        week5Multi(
          "Which is the best topic sentence for a paragraph about a morning feed?",
          ["A morning feed follows the yard chart, one horse at a time.", "Anyway.", "Scoop"],
          0,
          "A topic sentence says what the whole paragraph is about."
        ),
      ],
    },
    "y-caps": {
      1: [
        week5Multi(
          "Which line is written as a finished telling sentence?",
          ["the pony ate", "The pony ate.", "The pony ate"],
          1,
          "A telling sentence starts with a capital letter and ends with a full stop."
        ),
        week5Multi(
          "Which place name is written the right way?",
          ["silverstone", "Silverstone", "track"],
          1,
          "Silverstone is a place name, so it starts with a capital. Track is an ordinary word."
        ),
      ],
      2: [
        week5Multi(
          "Which sentence uses a capital for I?",
          ["I filled the bucket.", "i filled the bucket.", "filled the bucket i"],
          0,
          "The word I is always a capital, even in the middle of a sentence."
        ),
      ],
      3: [
        week5Multi(
          "Which line uses capitals for the days, not for ordinary words?",
          ["On Monday and Friday we ride.", "On monday and friday We Ride.", "on Monday And friday we ride"],
          0,
          "Days of the week take a capital. Ordinary words in the middle do not."
        ),
      ],
    },
    "y-nouns": {
      1: [
        week5Multi(
          "Which word is a noun in 'The bucket leaked'?",
          ["bucket", "the", "leaked"],
          0,
          "Bucket names a thing. That is a noun. Leaked is the doing word."
        ),
        week5Multi(
          "Which word names the building where a horse sleeps?",
          ["Stable", "Quickly", "And"],
          0,
          "Stable names a place. Quickly tells how. And joins words."
        ),
      ],
      2: [
        week5Multi(
          "Which noun is plural?",
          ["Ponies", "Pony", "A pony"],
          0,
          "Ponies means more than one. Pony is just one."
        ),
      ],
      3: [
        week5Multi(
          "Which word is a proper noun?",
          ["Bella-Rose", "bucket", "quietly"],
          0,
          "A person's name is a proper noun. It takes a capital letter."
        ),
      ],
    },
    "y-verbs": {
      1: [
        week5Multi(
          "Which word is the verb in 'The marshal waves'?",
          ["waves", "the", "marshal"],
          0,
          "Waves is the doing word. That is the verb."
        ),
        week5Multi(
          "Which sentence uses a doing word?",
          ["The kart stops.", "The red kart", "A yellow flag"],
          0,
          "Stops tells what the kart does. The other lines only name things."
        ),
      ],
      2: [
        week5Multi(
          "Which verb matches 'yesterday'?",
          ["The pony jumped.", "The pony jump tomorrow.", "The pony jumping."],
          0,
          "Jumped is the past. Yesterday has already happened."
        ),
      ],
      3: [
        week5Multi(
          "Which sentence uses the verb in the present, for something happening now?",
          ["The horses are eating.", "The horses ate last winter.", "The horses will eat next year."],
          0,
          "Are eating is happening now. Ate is the past. Will eat is the future."
        ),
      ],
    },
    "y-adj": {
      1: [
        week5Multi(
          "In the phrase 'a gentle pony', which word describes the pony?",
          ["gentle", "a", "pony"],
          0,
          "Gentle describes the pony. A describing word is an adjective."
        ),
        week5Multi(
          "Which of these words describes a thing?",
          ["Slippery", "Drove", "Under"],
          0,
          "Slippery describes something. Drove is a verb. Under is a place word."
        ),
      ],
      2: [
        week5Multi(
          "Which adjective tells you the size?",
          ["The tiny kitten slept.", "The kitten slept.", "Slept the kitten."],
          0,
          "Tiny tells the size. The other lines do not."
        ),
      ],
      3: [
        week5Multi(
          "Which sentence uses a comparative adjective?",
          ["This lane is muddier than the yard.", "This lane is muddy.", "Lane."],
          0,
          "Muddier compares two things. Than is the clue."
        ),
      ],
    },
    "y-join": {
      1: [
        week5Multi(
          "Which of these words can join two actions?",
          ["and", "bucket", "red"],
          0,
          "And joins 'I brushed' to 'I picked out the feet' in a sentence like that."
        ),
        week5Multi(
          "Which sentence uses and to join two actions?",
          ["I filled the bucket and shut the door.", "I filled the bucket.", "Bucket door"],
          0,
          "And joins the two actions into one sentence."
        ),
      ],
      2: [
        week5Multi(
          "Which word shows a contrast?",
          ["but", "and", "a"],
          0,
          "But shows that the second idea is different from the first."
        ),
      ],
      3: [
        week5Multi(
          "Which sentence uses because to give a reason?",
          ["We walked the horse because he was hot.", "We walked the horse.", "Because."],
          0,
          "Because joins the action to the reason. A lone because is not a sentence."
        ),
      ],
    },
    "y-spell": {
      1: [
        week5Multi(
          "Which is the correct spelling of the word for a person you like?",
          ["friend", "freind", "frend"],
          0,
          "Friend has the i before the e in this word: f-r-i-e-n-d."
        ),
        week5Multi(
          "Which is the correct spelling of the past of say?",
          ["said", "sed", "sayed"],
          0,
          "Said is the usual spelling of the past of say."
        ),
      ],
      2: [
        week5Multi(
          "Which spelling means belonging to them?",
          ["their", "thier", "ther"],
          0,
          "Their means belonging to them. It is t-h-e-i-r."
        ),
      ],
      3: [
        week5Multi(
          "Which sentence uses there for a place?",
          ["The brushes are over there.", "Their brushes are clean.", "They're late."],
          0,
          "There points to a place. Their means belonging. They're means they are."
        ),
      ],
    },
    "y-read": {
      1: [
        week5Multi(
          "What colour was the flag?",
          ["Yellow", "A sentence", "A stable"],
          0,
          "The passage says the flag was yellow.",
          "A yellow flag came out by the corner, and the karts lifted off."
        ),
        week5Multi(
          "Where did the cat sit?",
          ["On the rug", "In the engine", "On the Moon"],
          0,
          "The passage says the cat sat on the rug.",
          "The stable cat sat on the rug beside the door."
        ),
      ],
      2: [
        week5Multi(
          "What happened first?",
          ["Bella checked the bolt", "Bella left the yard", "Bella forgot the horse"],
          0,
          "The passage says she checked the bolt, then she left.",
          "Bella checked the bolt. Then she left the yard."
        ),
      ],
      3: [
        week5Multi(
          "Why is the second sentence a useful follow-up?",
          ["It gives a detail about the same horse", "It changes the subject to a kart", "It is only a question mark"],
          0,
          "A follow-up sentence stays on the same idea and adds a detail.",
          "The horse was lame on the near fore. He would not put that foot down."
        ),
      ],
    },
    "y-sent": {
      1: [
        week5Multi(
          "Which group of words is a sentence?",
          ["The gate shut.", "The gate", "Shut quickly"],
          0,
          "A sentence has a who or what, and a doing word, and it finishes."
        ),
        week5Multi(
          "Which sentence is a command?",
          ["Shut the gate.", "The gate is shut.", "Is the gate shut?"],
          0,
          "A command tells someone to do something. It can end with a full stop."
        ),
      ],
      2: [
        week5Multi(
          "Which sentence is an exclamation?",
          ["What a wet track!", "The track is wet.", "Is the track wet?"],
          0,
          "An exclamation shows a strong feeling and ends with an exclamation mark."
        ),
      ],
      3: [
        week5Multi(
          "Which pair is a compound sentence?",
          ["The rain fell and the visors went down.", "The rain.", "Visors down"],
          0,
          "A compound sentence joins two clauses that could each stand alone."
        ),
      ],
    },
  },
  science: {
    biology: {
      1: [
        week5Multi(
          "Which of these is living?",
          ["A pony", "A helmet", "A plastic cone"],
          0,
          "A pony grows, eats and breathes. A helmet and a cone do not."
        ),
        week5Multi(
          "A plant makes its food using…",
          ["light", "a steering wheel", "a question mark"],
          0,
          "Most plants use light to make food. Animals cannot do that."
        ),
      ],
      2: [
        week5Multi(
          "Which body part pumps blood?",
          ["The heart", "The hair", "The hoof"],
          0,
          "The heart is a muscle that pumps blood around the body."
        ),
      ],
      3: [
        week5Multi(
          "A food chain starts with…",
          ["a plant, which makes food", "a steering wheel", "a full stop"],
          0,
          "Plants make food. Animals eat plants or other animals."
        ),
      ],
    },
    chemistry: {
      1: [
        week5Multi(
          "Ice left in a warm room will…",
          ["melt into water", "become a horse", "turn into a flag"],
          0,
          "Ice is frozen water. Warmth melts it back into liquid water."
        ),
        week5Multi(
          "Which material is a good choice for a window?",
          ["Glass, because you can see through it", "Hay, because it is soft", "A biscuit"],
          0,
          "A window needs a material you can see through. The job picks the material."
        ),
      ],
      2: [
        week5Multi(
          "Steam from a kettle is water that has become a…",
          ["gas", "solid block", "metal"],
          0,
          "Heating can turn liquid water into a gas. Cooling can turn it back."
        ),
      ],
      3: [
        week5Multi(
          "Sand mixed into water, then left to stand, will…",
          ["settle to the bottom", "become a new metal", "vanish from the world"],
          0,
          "Sand does not dissolve. It sinks. The water and the sand are still there."
        ),
      ],
    },
    physics: {
      1: [
        week5Multi(
          "A push can make a swing…",
          ["start to move", "turn into a plant", "lose its need for a force"],
          0,
          "A push is a force. It can start something moving."
        ),
        week5Multi(
          "Which one is a pull?",
          ["Tugging a lead rope towards you", "A habitat", "A capital letter"],
          0,
          "A pull draws something towards you. It is a force."
        ),
      ],
      2: [
        week5Multi(
          "A shadow appears when…",
          ["an object blocks the light", "the light is switched into a liquid", "a noun changes tense"],
          0,
          "Light travels until something blocks it. The dark patch is the shadow."
        ),
      ],
      3: [
        week5Multi(
          "Friction is a force that…",
          ["slows things that are rubbing", "makes every object speed up forever", "is the same as a comma"],
          0,
          "Rubbing surfaces push back. That slowing force is friction."
        ),
      ],
    },
    method: {
      1: [
        week5Multi(
          "Before a test, a prediction is…",
          ["what you think will happen", "the result written afterwards", "a type of pony"],
          0,
          "You say what you expect, then you test it. The result can surprise you."
        ),
        week5Multi(
          "Why do you repeat a measurement?",
          ["To check it was not a one-off mistake", "So the numbers change on purpose", "Because one guess is enough"],
          0,
          "A second try can show a slip. Similar results are more trustworthy."
        ),
      ],
      2: [
        week5Multi(
          "You test which ramp lets a toy car roll further. What should stay the same?",
          ["The toy car", "The ramp height, on purpose, as a second change", "The question"],
          0,
          "The ramp can change. The car should be the same one, so the test is fair."
        ),
      ],
      3: [
        week5Multi(
          "A result that does not match the prediction should be…",
          ["written down as it happened", "rubbed out and replaced with the prediction", "hidden"],
          0,
          "The measurement is the evidence. A surprise is still a result."
        ),
      ],
    },
    "y-alive": {
      1: [
        week5Multi(
          "Which of these is not alive?",
          ["A stone", "A beetle", "A daisy"],
          0,
          "A stone does not grow, feed or reproduce. A beetle and a daisy do."
        ),
        week5Multi(
          "One sign that something is living is that it can…",
          ["reproduce, so there are more of them", "turn into flags", "stop needing water by rule"],
          0,
          "Living things can make more of their own kind. That is one of the signs of life."
        ),
      ],
      2: [
        week5Multi(
          "A bird is a vertebrate because it has…",
          ["a backbone", "six legs", "a saddle"],
          0,
          "Vertebrates have a backbone. Insects do not."
        ),
      ],
      3: [
        week5Multi(
          "A butterfly's life cycle includes…",
          ["egg, caterpillar, chrysalis, then butterfly", "only a helmet", "a pit stop"],
          0,
          "The same animal, different stages. The order is the life cycle."
        ),
      ],
    },
    "y-plants": {
      1: [
        week5Multi(
          "A plant kept in a dark cupboard will…",
          ["struggle, because it needs light", "grow faster by rule", "turn into a kart"],
          0,
          "Most plants need light to make food. Darkness is not a kindness."
        ),
        week5Multi(
          "The flower of a plant can…",
          ["help it make seeds", "pump blood", "replace the roots"],
          0,
          "Flowers are part of how many plants make seeds. Roots take in water."
        ),
      ],
      2: [
        week5Multi(
          "Water travels up a plant through the…",
          ["stem", "flower only", "visor"],
          0,
          "The stem carries water from the roots towards the leaves."
        ),
      ],
      3: [
        week5Multi(
          "Leaves help a plant because they…",
          ["catch light to help the plant make food", "pump blood", "are only a decoration"],
          0,
          "Leaves catch light so the plant can make food. They are not a decoration."
        ),
      ],
    },
    "y-body": {
      1: [
        week5Multi(
          "Washing hands before a meal helps because it…",
          ["removes dirt and germs", "replaces food", "is the same as a full stop"],
          0,
          "Clean hands keep germs off the food. Soap and water are the habit."
        ),
        week5Multi(
          "The lungs are for…",
          ["breathing air", "chewing hay", "steering a kart"],
          0,
          "Air goes into the lungs. The heart pumps blood. They are different jobs."
        ),
      ],
      2: [
        week5Multi(
          "The back teeth are for…",
          ["crushing food", "seeing light", "hearing a flag"],
          0,
          "Molars crush. The front teeth cut. Eyes see."
        ),
      ],
      3: [
        week5Multi(
          "Muscles and bones work together so that a person can…",
          ["move", "photosynthesise", "dissolve"],
          0,
          "Muscles pull on bones. That is how a body moves. Plants make food. Bodies do not."
        ),
      ],
    },
    "y-mats": {
      1: [
        week5Multi(
          "A good material for a towel is one that…",
          ["soaks up water", "stays slippery when wet", "is made of ice"],
          0,
          "A towel has a job: to take up water. The material is chosen for that."
        ),
        week5Multi(
          "Wood is often used for a fence because it is…",
          ["strong enough and can be cut to length", "a liquid at the table", "alive in the same way as a pony"],
          0,
          "Wood keeps its shape and can be cut. The job is to make a barrier."
        ),
      ],
      2: [
        week5Multi(
          "A brick is a…",
          ["solid", "gas you can pour", "liquid with no shape of its own"],
          0,
          "A brick keeps its shape. That is a solid."
        ),
      ],
      3: [
        week5Multi(
          "Filtering sandy water through a cloth can…",
          ["trap the sand and let water through", "turn the sand into sugar", "make a new metal"],
          0,
          "A filter separates bits that are big enough to catch. The sand is still sand."
        ),
      ],
    },
    "y-push": {
      1: [
        week5Multi(
          "Kicking a ball is a…",
          ["push", "habitat", "spelling rule"],
          0,
          "A kick pushes the ball. A push is a force."
        ),
        week5Multi(
          "A force can also…",
          ["slow something down or change its direction", "turn a noun into a verb by law", "remove the need for a cause"],
          0,
          "Forces can start, stop, speed up, slow down, or turn a movement."
        ),
      ],
      2: [
        week5Multi(
          "A higher sound is usually a…",
          ["faster vibration", "slower vibration with no change", "type of plant"],
          0,
          "Sound is a vibration. A faster vibration sounds higher."
        ),
      ],
      3: [
        week5Multi(
          "On a rough surface, a sliding box slows sooner because…",
          ["friction is greater", "friction has been switched off", "rough means the same as smooth"],
          0,
          "Rough surfaces rub more. More friction means the box stops sooner."
        ),
      ],
    },
    "y-home": {
      1: [
        week5Multi(
          "A habitat must provide…",
          ["what the living thing needs, such as food and shelter", "a full stop", "a times table"],
          0,
          "A habitat is the place that supplies those needs."
        ),
        week5Multi(
          "A hedgerow can be a habitat for…",
          ["a bird", "a steering wheel", "a question mark"],
          0,
          "Birds nest and feed in hedges. A hedge can be their habitat."
        ),
      ],
      2: [
        week5Multi(
          "In the chain grass → snail → thrush, the thrush eats the…",
          ["snail", "grass, as the only food", "arrow"],
          0,
          "The arrow means 'is eaten by'. The snail is eaten by the thrush."
        ),
      ],
      3: [
        week5Multi(
          "A fish's gills are an adaptation because they…",
          ["let the fish take oxygen from water", "make the fish photosynthesise", "replace the need for a habitat"],
          0,
          "An adaptation is a feature that helps something survive where it lives."
        ),
      ],
    },
    "y-sky": {
      1: [
        week5Multi(
          "The Moon looks bright because it…",
          ["reflects light from the Sun", "is a fire the same size as the Sun", "is switched on by clouds"],
          0,
          "The Moon does not make its own light. It reflects the Sun."
        ),
        week5Multi(
          "One spin of the Earth takes about…",
          ["a day", "a year", "a minute"],
          0,
          "One spin is a day. One trip around the Sun is a year."
        ),
      ],
      2: [
        week5Multi(
          "The Sun is a…",
          ["star", "planet the same as Earth", "moon of the Earth"],
          0,
          "The Sun is our nearest star. Earth is a planet that goes around it."
        ),
      ],
      3: [
        week5Multi(
          "Seasons change because…",
          ["the Earth is tilted as it goes around the Sun", "the Sun is switched off in winter", "clouds decide the month"],
          0,
          "The tilt means one half of the Earth leans towards the Sun, then the other."
        ),
      ],
    },
  },
  horses: {
    care: {
      1: [
        week5Multi("You speak before you touch a horse so that…", ["they know you are there", "they jump", "the words replace a headcollar"], 0, "A quiet voice is a warning. A surprise from silence can startle them."),
        week5Multi("Loose hair across a horse's eye is…", ["moved aside gently, or left if they dislike it", "pulled hard", "cut with any scissors you find"], 0, "They need to see. Ask if you are not sure. Do not grab."),
      ],
      2: [
        week5Multi("A horse that pins its ears and swishes its tail is…", ["telling you it is unhappy", "inviting a hug around the heels", "ready for a child to climb on"], 0, "Ears and tail are a message. Give space and fetch an adult."),
      ],
      3: [
        week5Multi("You report a new cut on a leg…", ["the same day, to the person who knows that horse", "next month", "only if it matches a picture in a book"], 0, "A small cut can hide a bigger problem. The yard decides the treatment."),
      ],
    },
    water: {
      1: [
        week5Multi("A water bucket is carried…", ["with two hands if it is heavy, and not slopped over the bed", "on your head", "inside the feed scoop"], 0, "A heavy bucket needs a safe carry. Wet bedding is not the plan."),
        week5Multi("You do not share one dirty bucket between horses because…", ["illness can travel in the water", "water is the same as hay", "buckets are toys"], 0, "Each horse has their own clean water. A sick horse's bucket stays separate."),
      ],
      2: [
        week5Multi("Ice on a trough is…", ["broken and removed so the horse can drink", "left, because ice is a drink", "a sign to empty the field for the week"], 0, "Horses cannot drink through a solid lid of ice. Break it and check again later."),
      ],
      3: [
        week5Multi("An automatic drinker is still checked because…", ["it can block or run dry", "machines never fail", "horses prefer an empty bowl"], 0, "A quiet drinker may be broken. Look, listen, and tell an adult if it is not filling."),
      ],
    },
    feeding: {
      1: [
        week5Multi("Feed room doors are shut because…", ["a loose horse and an open feed bin are a bad pair", "horses should serve themselves", "doors are only for people"], 0, "A horse that raids a bin can eat far too much. Shut the door."),
        week5Multi("You wash your hands between horses when you feed if…", ["the yard asks, especially around a horse on medicine", "you feel like it, or never", "soap is only for people at home"], 0, "Medicine and illness should not travel on your hands. Follow the yard."),
      ],
      2: [
        week5Multi("Soaked feed that has been left out too long is…", ["thrown away, not fed", "a better feed", "dried on a heater and used"], 0, "Warm wet feed can go off. If it smells wrong, it is not a meal."),
      ],
      3: [
        week5Multi("A horse on box rest may need…", ["the feed the vet or the yard wrote down, which can be less hard feed", "a double scoop to cheer them up", "no water"], 0, "Rest changes the feed. You do not invent a treat ration."),
      ],
    },
    grooming: {
      1: [
        week5Multi("You groom in the direction of the hair on the body because…", ["it is more comfortable", "it is faster to go against it always", "brushes only work on the face"], 0, "With the coat, not scrubbing backwards. The face needs a softer cloth."),
        week5Multi("A tail is brushed…", ["from the bottom up, a little at a time, so it does not break", "by pulling the whole length in one yank", "with a hoof pick"], 0, "Start at the ends. A hard pull snaps hairs and can annoy the horse."),
      ],
      2: [
        week5Multi("A caked mud ball under the belly is…", ["loosened carefully, not ripped off", "left forever", "scraped with a sharp knife"], 0, "Ripping mud can pull skin. Soften it. Ask if you are not sure."),
      ],
      3: [
        week5Multi("You notice a rub under the girth area while grooming. You…", ["tell an adult before the saddle goes on", "tighten the girth over it", "cover it with more mud"], 0, "A rub means the tack or the rug may not fit. Riding over it makes it worse."),
      ],
    },
    stable: {
      1: [
        week5Multi("You look into a stable before you open the door because…", ["the horse may be standing against it", "doors open themselves", "looking is rude"], 0, "A horse against the door can be bumped. Look, speak, then open."),
        week5Multi("A haynet is tied…", ["high enough and with a knot the yard uses, so a foot cannot get caught", "on the floor", "to the horse's leg"], 0, "A low net is a trap for a foot. Ask to be shown the knot and the height."),
      ],
      2: [
        week5Multi("Wet bedding under a horse is…", ["skipped out, because it rots hooves and smells", "a warmer bed", "left as a drink"], 0, "Urine-soaked beds are part of skip-out. Dry bedding goes back if it is still clean."),
      ],
      3: [
        week5Multi("A stable with poor airflow on a hot day is a problem because…", ["horses can overheat", "fresh air is bad for them", "windows replace water"], 0, "They need air. The yard decides which window or door stays open. You do not shut everything."),
      ],
    },
    riding: {
      1: [
        week5Multi("You mount from…", ["the near side, unless you have been taught otherwise", "the tail", "a run and a jump from behind"], 0, "In Britain the near side is the usual side. An instructor sets the habit."),
        week5Multi("Your hands on the reins stay…", ["quiet, with a straight line to the bit", "down by your knees in a haul", "wrapped in the mane and the reins together as a knot"], 0, "A steady hand asks. A yank is not the aid."),
      ],
      2: [
        week5Multi("In walk, you sit…", ["tall, and let the movement come through your seat", "leaning on the neck", "looking at the ground"], 0, "Walk is four beats. An upright seat follows it. An instructor watches you."),
      ],
      3: [
        week5Multi("You ask for trot only when…", ["your instructor has said so, and the space is clear", "you feel bored in walk", "another rider is in the way"], 0, "Trot is a lesson, not a surprise. Look, ask, and keep a horse's length."),
      ],
    },
    tack: {
      1: [
        week5Multi("A throatlash is done up so that…", ["you can fit a flat hand between it and the cheek", "it strangles", "it hangs to the knees"], 0, "Too tight is uncomfortable. Too loose can catch. The flat-hand check is the usual one."),
        week5Multi("You do not leave a horse tied by the reins because…", ["reins can snap, and the bit can hurt if they pull back", "reins are stronger than a lead rope", "it is the same as a headcollar"], 0, "Tie with a headcollar and a lead rope. Reins are for riding."),
      ],
      2: [
        week5Multi("A numnah that is rucked under the saddle is…", ["smoothed flat before you girth up", "a new style", "safer if it bunches"], 0, "A wrinkle becomes a sore. Smooth it. Ask if the saddle still sits level."),
      ],
      3: [
        week5Multi("Stirrup irons that are too small can…", ["trap a foot", "make you safer", "replace a hat"], 0, "You need room to slip the foot out. An adult checks the size. A hat is a separate rule."),
      ],
    },
    history: {
      1: [
        week5Multi("Before engines, horses pulled…", ["carts, ploughs and carriages", "Formula 1 cars", "aeroplanes as a rule"], 0, "Horses were the transport and the farm power. That is history, not a job for a child's pony."),
        week5Multi("A pony and a horse are separated, in the usual rule, by…", ["height, around 14.2 hands", "the colour of the rider's hat", "which one can read"], 0, "14.2 hands and under is the usual pony line. The care is still individual."),
      ],
      2: [
        week5Multi("Police horses today are…", ["trained working horses, handled by officers", "wild horses with no tack", "a type of kart"], 0, "They are schooled for crowds and noise. They are not a ride for a visitor."),
      ],
      3: [
        week5Multi("When tractors replaced many farm horses, the horses that remained needed…", ["new jobs, and the same care", "to be forgotten", "to be turned into machines"], 0, "The work changed. The duty of care did not."),
      ],
    },
    "h-lead": {
      1: [
        week5Multi("If a horse pulls ahead on the lead, you…", ["stop and reset, rather than lean on the rope", "run to keep up", "drop the rope and shout"], 0, "A steady stop asks them to wait. Dragging is not leading."),
        week5Multi("When you turn a horse you are leading, you turn them…", ["away from you, so they do not tread on you", "across your toes", "by pulling the tail"], 0, "Turn them away. Your feet stay out of the circle."),
      ],
    },
    "h-field": {
      1: [
        week5Multi("You shut the gate before you take the headcollar off if…", ["the yard has taught you that order, so they cannot spin out past you", "you like the gate open", "the field has no fence"], 0, "Ask the yard for their order. The aim is a shut gate and you out of the way."),
        week5Multi("Other horses charging the gate means you…", ["wait, and do not walk in between them", "run through the middle", "throw the hay over them"], 0, "A greeting can include kicks. Wait until an adult says the moment is quiet."),
      ],
    },
    "h-rug": {
      1: [
        week5Multi("Leg straps on a turnout rug are…", ["clipped so they cannot dangle and catch a foot", "left undone as a style", "tied to the gate"], 0, "A dangling strap is a trap. The clips cross in the way the yard showed you."),
        week5Multi("A horse sweating under a thick rug on a mild day needs…", ["the rug reconsidered by an adult", "another rug on top", "no water"], 0, "Too hot is as unkind as too cold. You do not add layers to a sweating horse."),
      ],
    },
  },
  f1: {
    "f-teams": {
      1: [
        week5Multi("The person who drives the car is called the…", ["driver", "constructor", "marshal"], 0, "The driver is in the cockpit. The constructor is the team."),
        week5Multi("A Formula 1 team can still score points when…", ["their second car finishes, as well as the first", "nobody finishes", "the race is a horse race"], 0, "Both cars can bring points to the same team. The rules of that year say how."),
      ],
      2: [
        week5Multi("The garage work you do not see on television includes…", ["designing and preparing the car", "waving the chequered flag", "selling tickets"], 0, "A team is bigger than the people in shot. Design happens before the weekend."),
      ],
      3: [
        week5Multi("A team principal is…", ["the person who leads the team", "the driver of both cars", "a flag colour"], 0, "They run the team. They are not a second driver, and they are not a flag."),
      ],
    },
    "f-flags": {
      1: [
        week5Multi("A chequered flag in Formula 1 means…", ["the session is over for the leader", "go faster for one more surprise lap", "the track is wet"], 0, "Chequered means finished. You do not invent an extra racing lap."),
        week5Multi("In Formula 1, a yellow flag tells the driver…", ["there is danger, so slow down and do not overtake", "they have won", "the pit lane is a cafe"], 0, "Yellow is caution. The exact boards can change, but the idea stays."),
      ],
      2: [
        week5Multi("A green flag after yellow means…", ["the caution has ended and you may race on", "stop forever", "the race is now a kart lesson"], 0, "Green is the all-clear after the danger. You do not treat it as a new sport."),
      ],
      3: [
        week5Multi("A black flag shown to one car means…", ["that driver must come in, as the stewards instructed", "that driver has won", "the whole field stops for lunch"], 0, "A black flag is for one car, not a trophy. You obey it."),
      ],
    },
    "f-pits": {
      1: [
        week5Multi("The pit lane has a speed limit so that…", ["people working there are not met at racing speed", "the cars look slower on television", "tyres last forever"], 0, "Crews stand close. A speed limit is a safety rule, not a style."),
        week5Multi("A wheel that is not tightened is…", ["a reason the car must not be released", "a quicker stop", "the driver's job to notice from the crowd"], 0, "The crew and the release system are there so a loose wheel does not leave the box."),
      ],
      2: [
        week5Multi("Changing tyres in the race is a choice about…", ["how the car will grip for the laps that follow", "the colour of the driver's helmet", "the horse power of a pony"], 0, "Tyres change the grip. The team decides. It is not a fashion stop."),
      ],
      3: [
        week5Multi("A car that leaves the pit box into the path of another car…", ["can cause a crash, which is why the release is controlled", "is awarded a bonus", "is the normal way to overtake"], 0, "The pit exit is still a piece of track. You leave only when it is clear and you are released."),
      ],
    },
    "f-car": {
      1: [
        week5Multi("The wings on a Formula 1 car are there to…", ["push the car down onto the track", "make it fly", "carry luggage"], 0, "Downforce is a push downwards from the air. It is not flight."),
        week5Multi("The driver wears a seatbelt because…", ["a crash throws the body, and the belts hold them", "it is a fashion", "the rules do not mention belts"], 0, "Belts are protection. The halo is another piece. Both stay on."),
      ],
      2: [
        week5Multi("A wet-weather tyre has grooves so that…", ["water has a path to escape", "the tyre looks faster in the dry", "the car can skip the pits"], 0, "Grooves move water. A slick has no tread and is for a dry track."),
      ],
      3: [
        week5Multi("Brakes turn the car's speed into…", ["heat, so the car slows", "a new lap", "a flag"], 0, "Brakes slow the car by turning movement into heat. They are not a flag."),
      ],
    },
    "f-history": {
      1: [
        week5Multi("Formula 1's world championship began in…", ["1950", "last Tuesday", "the year the Moon was built"], 0, "1950 is the start of the drivers' world championship. That date does not move."),
        week5Multi("The circuit called Silverstone is in which country?", ["Britain", "a stable", "a go-kart lesson only"], 0, "The first championship race was at Silverstone, in Britain."),
      ],
      2: [
        week5Multi("A circuit and a street track differ because…", ["a street track uses closed public roads", "a circuit is always made of grass", "street tracks have no corners"], 0, "Monaco is the famous street example. A permanent circuit is built as a track."),
      ],
      3: [
        week5Multi("A fact that stays in the lesson is…", ["Ferrari has been in the championship since 1950", "this year's driver line-up", "the name of next week's winner"], 0, "1950 stays true. A line-up is news, and news goes out of date."),
      ],
    },
    "f-sums": {
      1: [
        week5Typed("A story-lap is 70 seconds. Which is quicker, 70 seconds or 88 seconds?", "70", "Less time is faster. 70 is a shorter lap than 88."),
        week5Multi("Three equal story-laps of 60 seconds take…", ["180 seconds", "60 seconds altogether", "20 seconds"], 0, "60 and 60 and 60 is 180. A real race has many more laps."),
      ],
      2: [
        week5Typed("A story-car loses 3 seconds a lap for 3 laps. How many seconds is that?", "9", "3 × 3 = 9 seconds. A real gap depends on the cars and the track."),
      ],
      3: [
        week5Typed("A pit stop costs 24 seconds and the new tyres then save 4 seconds a lap. After 3 laps, how many seconds are still lost?", "12", "3 × 4 = 12 seconds saved. 24 − 12 = 12 still lost. This is a story sum, not a real stop."),
      ],
    },
  },
  horseworld: {
    "w-breeds": {
      1: [
        week5Multi("On the usual height rule, a pony measures…", ["14.2 hands and under", "always taller than a horse", "in racing laps"], 0, "14.2 hands and under is the usual pony line. Over that is a horse."),
        week5Multi("A Shetland pony is best described as…", ["a small, strong pony", "a heavy horse over 18 hands", "a type of kart"], 0, "Shetlands are small ponies. They are still strong, and they are not horses."),
      ],
      2: [
        week5Multi("A Thoroughbred is famous for…", ["speed, as a racehorse breed", "pulling ploughs as its only job", "having no withers"], 0, "Thoroughbreds were bred to race. One horse in a field is still an individual."),
      ],
      3: [
        week5Multi("Height in hands is measured at the…", ["withers", "ears", "tail"], 0, "The withers are the ridge where the neck meets the back. Ears would make the number silly."),
      ],
    },
    "w-gaits": {
      1: [
        week5Multi("Walk, compared with trot, is…", ["slower, and it is four beats", "faster than gallop", "a jump"], 0, "Walk is the slow four-beat gait. Trot is two beats and quicker."),
        week5Multi("You can hear a walk as…", ["four beats", "one beep", "a car horn"], 0, "Each foot falls in turn. That is the four beats of walk."),
      ],
      2: [
        week5Multi("Trot is a…", ["two-beat gait", "four-beat gallop", "halt"], 0, "Diagonal pairs give the trot its two beats. It is not the walk."),
      ],
      3: [
        week5Multi("In canter, the leading leg is…", ["the front leg that reaches further forward", "the tail", "a flag"], 0, "One front leg reaches further. That is the leading leg. It is not a piece of tack."),
      ],
    },
    "w-famous": {
      1: [
        week5Multi("The Grand National is a race…", ["over fences", "for Formula 1 cars", "inside a stable"], 0, "It is a horse race over fences at Aintree. It is not a motor race."),
        week5Multi("How many times did Red Rum win the Grand National?", ["Three", "Never", "Once, in a cartoon only"], 0, "Three wins: 1973, 1974 and 1977. That history does not change."),
      ],
      2: [
        week5Multi("Showjumping is a sport of…", ["fences in an arena, with faults for poles and refusals", "who writes the best essay", "the loudest pony"], 0, "Poles down and refusals cost faults. It is not a written test."),
      ],
      3: [
        week5Multi("Eventing, as a sport, includes…", ["dressage, cross-country and showjumping", "only a walk around the yard", "a motor race"], 0, "Three tests, one horse. The exact rules of a year can change. The three parts are the idea."),
      ],
    },
    "w-rules": {
      1: [
        week5Multi("You pass behind a tied horse…", ["only with a wide gap, or not at all", "close enough to brush the hocks", "under the belly"], 0, "A tied horse can still kick. Give the hind legs a wide path."),
        week5Multi("A riding hat is replaced when…", ["it has had a hard knock, or it is too old for its standard", "the colour fades", "you feel brave"], 0, "The inside can be damaged after a knock. Age and the standard matter. An adult decides."),
      ],
      2: [
        week5Multi("In a showing class you walk and trot where…", ["the steward asks", "you feel like cutting across", "the judge cannot see you"], 0, "The steward runs the class. Cutting across is not the pattern."),
      ],
      3: [
        week5Multi("A whip, if one is carried, is…", ["an aid you were taught, not a punishment in temper", "for hitting as hard as you can", "a toy to wave at the horse's eye"], 0, "An aid is quiet and taught. Temper is not a reason. Many lessons use no whip at all."),
      ],
    },
    "w-move": {
      1: [
        week5Multi("The off side of a horse is…", ["the right side", "the tail", "the near side as well"], 0, "Near is left. Off is right. You still approach where the horse can see you."),
        week5Multi("A horse sees less well…", ["directly behind them", "at the shoulder, where you stand", "nowhere, they see everything at once with no blind spot"], 0, "Behind them is a poor place to stand. The shoulder is the usual place."),
      ],
      2: [
        week5Multi("A horse that lifts a hind leg while you are close is…", ["a warning, so you step away", "asking to be hugged", "stretching for fun that you should ignore"], 0, "A lifted hind leg can become a kick. Step back and tell an adult."),
      ],
      3: [
        week5Multi("A startled horse's first choice is often to…", ["move away", "read a rule", "stand and discuss it"], 0, "Flight is the prey-animal habit. Quiet handling gives them less to flee from."),
      ],
    },
    "w-sums": {
      1: [
        week5Typed("How many inches are in 3 hands?", "12", "A hand is 4 inches. Three hands are 12 inches."),
        week5Multi("14 hands, with no extra inches, is…", ["56 inches", "14 inches", "14.2 inches"], 0, "14 × 4 = 56 inches. 14.2 would be 14 hands and 2 extra inches."),
      ],
      2: [
        week5Typed("14 hands, with no extra inches, is how many inches? A hand is 4 inches.", "56", "14 hands, with no extra inches, is 56 inches."),
      ],
      3: [
        week5Typed(
          "14.2 hands is 58 inches. How many inches is 58 + 2?",
          "60",
          "58 and 2 more is 60 inches. 15 hands, with no extra inches, is 60 inches."
        ),
      ],
    },
  },
};

const WEEK5_KART = {
  safety: {
    1: [
      week5Row("Long hair loose around the visor is…", ["tied back so you can see", "a faster style", "a type of helmet"], 0, "Hair in your eyes is a reason to stop. Tie it back before you sit in the kart.", 2),
      week5Row("You walk onto the track…", ["only when a marshal has said the session is stopped", "to fetch a glove during racing", "because it is quieter in the middle"], 0, "Karts are still coming. The track is not a path.", 3),
    ],
    2: [
      week5Row("A visor that has fogged up is…", ["a reason to pit and clear it", "fine if you squint", "faster"], 0, "You have to see. A fogged visor is a stop, not a brave lap.", 3),
    ],
    3: [
      week5Row("After a spin you rejoin…", ["when a marshal shows you, and you look for a gap", "by darting back onto the racing line", "by reversing the wrong way"], 0, "Other karts are coming. Wait for the signal and a gap.", 4),
    ],
  },
  kit: {
    1: [
      week5Row("Gloves on a karting day are…", ["the ones you were given, done up", "optional mittens", "a place to hide a phone"], 0, "Hands need the gloves from the briefing. Loose cuffs can catch.", 2),
      week5Row("You zip the suit…", ["before you sit in the kart", "halfway through the first lap", "only if it is cold"], 0, "The suit is on properly before the engine starts.", 3),
    ],
    2: [
      week5Row("A neck brace, if the track gives you one, is…", ["worn the way they showed you", "hung on the steering wheel", "a spare visor"], 0, "It has a job. It is not a decoration. Ask if the straps confuse you.", 3),
    ],
    3: [
      week5Row("A rib protector that does not fit is…", ["swapped before you drive", "fine if it is uncomfortable", "a reason to loosen the seat belt into a slack loop"], 0, "Kit that does not fit does not protect. Tell the marshal.", 4),
    ],
  },
  kart: {
    1: [
      week5Row("You sit in the kart so that…", ["you can reach the pedals without stretching onto your toes", "your knees hit the wheel", "you can stand up"], 0, "The seat should fit. If you cannot reach, tell a marshal before the session.", 2),
      week5Row("The steering wheel is held…", ["with both hands, where you were shown", "with one finger", "in your lap"], 0, "Two hands. The briefing shows the place. A one-finger hold is not it.", 3),
    ],
    2: [
      week5Row("A chain guard is there so that…", ["the chain cannot catch a hand or a suit", "the kart looks finished", "you can rest a foot on it"], 0, "Guards are not decorations. Hands stay off the chain.", 3),
    ],
    3: [
      week5Row("A kart that pulls to one side on the straight is…", ["reported before you keep pushing", "a skill to enjoy", "fixed by you with a spanner"], 0, "A pull can be a tyre or a setting. The mechanic looks. You do not.", 4),
    ],
  },
  pedals: {
    1: [
      week5Row("The throttle is the pedal that…", ["makes the kart go", "stops the engine by itself", "is a footrest"], 0, "Throttle is go. Brake is stop. The briefing shows which is which.", 2),
      week5Row("You cover the brake before a corner so that…", ["your foot is ready", "you can press both pedals at once as a habit", "the kart rolls faster"], 0, "Ready does not mean pressing both. One job at a time, as you were taught.", 3),
    ],
    2: [
      week5Row("Lifting off the throttle before the brake is…", ["the usual order into a corner", "slower for no reason", "only for wet hair"], 0, "Come off the power, then brake in a straight line. The instructor sets the detail.", 3),
    ],
    3: [
      week5Row("Standing on the brake and the throttle together, as a habit, is…", ["a mix-up to unlearn", "the fast way", "what the lights mean"], 0, "One pedal does the job you want. Both at once fights itself.", 4),
    ],
  },
  marshal: {
    1: [
      week5Row("A marshal pointing you to the pit exit is…", ["an instruction", "a wave hello you can ignore", "a request for a photo"], 0, "Pointing is the job. You follow it.", 2),
      week5Row("You do not argue with a flag from the kart because…", ["the marshal can see more of the track than you can", "flags are suggestions", "you are the race director"], 0, "They have the view. You have the kart. Their signal wins.", 3),
    ],
    2: [
      week5Row("If you do not understand a signal, you…", ["slow and wait for a clearer one", "guess and go faster", "stop in the racing line to think"], 0, "Slow is the safe guess. Stopping on the line is not.", 3),
    ],
    3: [
      week5Row("A marshal post is a place you…", ["do not drive at", "aim for, because it is a shortcut", "use as a marker to brush"], 0, "Posts are where people stand. Give them space.", 4),
    ],
  },
  flags: {
    1: [
      week5Row("A yellow flag that is waving means…", ["slow down now. There is something ahead", "the race is over", "overtake as many karts as you can"], 0, "Waved yellow is urgent. You lift and you do not pass.", 2),
      week5Row("A red flag in a kart session means…", ["stop as you were shown", "one more fast lap", "the cafe is open"], 0, "Red is stop. The briefing told you where to roll to.", 3),
    ],
    2: [
      week5Row("A blue flag in karting means…", ["a faster kart is behind you", "you have won", "the track is wet"], 0, "Blue is a warning that someone quicker is there. You hold a line and let them by when it is safe.", 3),
    ],
    3: [
      week5Row("When the chequered flag comes out, it means…", ["the session is finished", "start your fastest lap", "come into the pits for fuel yourself"], 0, "Chequered is the end. You complete the lap as you were told, then come in.", 4),
    ],
  },
  driving: {
    1: [
      week5Row("You look where you want the kart to go because…", ["the kart tends to follow your eyes", "looking down is faster", "the wheel steers itself"], 0, "Look up the track, not at the nose. Your hands follow.", 2),
      week5Row("A slow kart ahead is a reason to…", ["leave room and wait for a safe place", "shove it off the line", "close your eyes and hope"], 0, "Room first. A pass is a later lesson, and it needs a gap.", 3),
    ],
    2: [
      week5Row("On a straight you hold the wheel…", ["still, with small hands", "sawing from lock to lock", "with one hand while you wave"], 0, "Small corrections. A straight is not a place to wag the wheel.", 3),
    ],
    3: [
      week5Row("If you cannot see a kart that was beside you, you…", ["hold your line until you know where they went", "swing across", "brake in the middle of them"], 0, "A kart you cannot see is still there. Wait.", 4),
    ],
  },
  corners: {
    1: [
      week5Row("You slow down before the corner, not…", ["in the middle of the turn as your first habit", "on the straight at all", "when a marshal says so"], 0, "Speed comes off while the kart is straight. The turn is for steering.", 2),
      week5Row("A wide line into a corner can…", ["give you room to turn", "be a shortcut across the grass", "replace the brake"], 0, "Wide, then in, then wide again is the idea. Grass is not the track.", 3),
    ],
    2: [
      week5Row("Looking through the corner means…", ["your eyes are on the exit, not on the kerb under your wheel", "you shut your eyes", "you watch your feet"], 0, "Eyes lead the kart. The exit is where you are going.", 3),
    ],
    3: [
      week5Row("Two karts arriving at a corner side by side need…", ["room for both, not a shut door", "the inside kart to disappear", "a shove"], 0, "Leave a kart's width. Closing the door is how karts touch.", 4),
    ],
  },
  pits: {
    1: [
      week5Row("In the pit lane you…", ["drive slowly, as the briefing said", "treat it as a racing straight", "get out and push"], 0, "People are standing close. The pit lane is slow.", 2),
      week5Row("You stay in the kart with your hands in, until…", ["a marshal says you can get out", "you feel like a stretch", "the engine is still running and you climb over it"], 0, "Hot engines and moving karts. Wait for the word.", 3),
    ],
    2: [
      week5Row("A kart in the weighing line, if your club has one, is…", ["left as the marshal parks it", "pushed to the front by you", "a place to sit on the bodywork"], 0, "The line has an order. You do not rearrange it.", 3),
    ],
    3: [
      week5Row("Refuelling, if it happens at your club, is…", ["a grown-up's job, with the engine off", "a good thing to try", "done while you sit in the seat"], 0, "Fuel and a hot engine are not a child's job. Step away.", 4),
    ],
  },
  racing: {
    1: [
      week5Row("A practice session is for…", ["learning the track, not for winning a prize", "shoving other karts", "stopping on the line to chat"], 0, "Practice is where you learn. Racing manners still apply.", 2),
      week5Row("The start lights or the flag mean…", ["go when they say go, not before", "go when you feel ready", "the session is cancelled"], 0, "A jumped start is not a clever one. Wait for the signal.", 3),
    ],
    2: [
      week5Row("If you spin and others are coming, you…", ["stay buckled and keep your hands in until you are shown", "jump out to turn the kart", "wave your helmet"], 0, "You are protected in the seat. Other karts need a predictable you.", 3),
    ],
    3: [
      week5Row("A last-lap lunge that needs the other kart to vanish is…", ["not a pass", "the way champions drive", "what a blue flag asks for"], 0, "A pass needs space that is really there. Hope is not a gap.", 4),
    ],
  },
  line: {
    1: [
      week5Row("The painted white lines beside the kart track are…", ["the edge, not a suggestion to put a wheel beyond them", "a target to drive on", "only painted for photos"], 0, "Stay on the track you were given. Beyond the line is off.", 2),
      week5Row("Cutting across the grass to gain a place is…", ["not allowed", "a clever shortcut", "what the chequered flag means"], 0, "The track is the track. Grass is not a lane.", 3),
    ],
    2: [
      week5Row("A kerb that your briefing said to avoid is…", ["avoided", "a launch ramp", "the racing line"], 0, "Some kerbs unsettle a kart. The briefing is the rule for that track.", 3),
    ],
    3: [
      week5Row("Rejoining from a runoff, you…", ["wait until you will not move into someone's path", "rejoin at racing speed across the line", "reverse back up the track"], 0, "Look, wait, rejoin. The cars already on the track have the line.", 4),
    ],
  },
  respect: {
    1: [
      week5Row("After the session you…", ["thank the marshal who looked after you", "blame the kart", "leave your helmet on the track"], 0, "People gave up their time. A thank-you is part of the day.", 2),
      week5Row("If you bump another kart, you…", ["say so to a marshal, calmly", "pretend it did not happen", "shout at the other driver in the pit lane"], 0, "Bumps get reported. Shouting does not fix a kart.", 3),
    ],
    2: [
      week5Row("A slower driver is…", ["given room", "a problem to remove", "in the wrong sport"], 0, "Everyone is learning. Room is the kind lap.", 3),
    ],
    3: [
      week5Row("Laughing at someone's spin is…", ["unkind, and it can be your spin next", "part of the points", "what the blue flag means"], 0, "A spin is a lesson. You do not make a joke of it.", 4),
    ],
  },
  "k-brief": {
    1: [
      week5Row("If you arrive late for the briefing you…", ["tell the marshal, and you do not drive until they have briefed you", "slip into a kart anyway", "brief yourself"], 0, "The briefing is the safety lesson for that session. Late still means you hear it.", 2),
      week5Row("A question during the briefing is…", ["welcome, before you drive", "a reason to be sent home without asking", "only for adults"], 0, "Ask now. The track is a bad place to wonder.", 2),
    ],
  },
  "k-rain": {
    1: [
      week5Row("Rain on the visor means you…", ["pit if you cannot see, rather than guess the corner", "go faster to dry it", "open the visor at full speed"], 0, "Seeing is the rule. A wet visor is a reason to come in.", 2),
      week5Row("Painted white lines in the wet are often…", ["slipperier than the rest of the track", "the grippiest place", "a dry path"], 0, "Paint can be shiny in the rain. The briefing may tell you to avoid them.", 2),
    ],
  },
  "k-cheer": {
    1: [
      week5Row("You cheer from…", ["behind the fence the track has given you", "the pit wall among the tools", "the middle of the track"], 0, "The fence is the place. Tools and the track are not.", 2),
      week5Row("A shout of 'go faster' at a child who is already at their limit is…", ["not helpful", "the coach's job from the crowd", "a flag"], 0, "Encourage the effort. Do not demand a speed they have not been taught.", 2),
    ],
  },
};

const WEEK5_INVEST = {
  compound: {
    1: [
      week5Row("A piggy bank that you do not raid can…", ["keep growing by what you add", "spend itself", "turn coins into flags"], 0, "The pot grows when money stays and more is added. This is a story pot.", 2),
      week5Row("£2 put in, and another £2 next week, is…", ["£4 in the pot if nothing is taken out", "still £2", "£0 because weeks cancel"], 0, "2 and 2 make 4. Nothing here is a promise about a real bank.", 3),
    ],
    2: [
      week5Row("Interest, in this lesson, means…", ["a little extra paid for leaving money alone", "a fine you always owe", "a racing flag"], 0, "Interest is the extra. It is not guaranteed in every real account. A parent reads the terms.", 3),
    ],
    3: [
      week5Row("Interest on a bigger pot, if the rate stays the same, is…", ["a bigger extra than on a tiny pot", "always the same number of pounds", "a reason the pot cannot fall"], 0, "The same percent of a bigger number is more pounds. The pot can still fall if it is not cash.", 4),
    ],
  },
  spend: {
    1: [
      week5Row("Sweets today and a trip next month are…", ["a want now, and a plan later", "both impossible", "both the same coin"], 0, "You can want both. The money cannot do both if there is only enough for one.", 2),
      week5Row("Spending every pound on the day you get it means…", ["the pot stays empty", "the pot doubles", "the shop pays you"], 0, "Nothing left in is nothing to grow. That is the lesson, not a telling-off.", 3),
    ],
    2: [
      week5Row("A price that is 'only £1' is still…", ["£1 that cannot be spent twice", "free", "a saving"], 0, "Small prices add up. Each pound has one job.", 3),
    ],
    3: [
      week5Row("Buying because a friend did is…", ["their choice, not a rule for your pot", "always a need", "interest"], 0, "A friend's spend is not your plan. You can still like the friend.", 4),
    ],
  },
  twenty: {
    1: [
      week5Row("20 pence out of every £1, set aside, is…", ["the 20% idea in this lesson", "the whole pound", "a tax you invent"], 0, "20p is a fifth of £1. The lesson calls that 20%. A parent chooses the real amount.", 2),
      week5Row("If you have £5 and you set aside the 20% idea, you set aside…", ["£1", "£5", "5 pence"], 0, "A fifth of £5 is £1. The other £4 still has jobs.", 3),
    ],
    2: [
      week5Row("The pounds you do not set aside are…", ["still real, and they pay for the things you planned", "useless", "interest"], 0, "Saving is a slice. The rest is for spending that was already decided.", 3),
    ],
    3: [
      week5Row("A week you cannot set the slice aside, you…", ["note it and start again next time, without raiding the old pot", "empty the pot to punish yourself", "pretend the week did not happen by changing the numbers"], 0, "A missed week is a missed week. The old savings stay.", 4),
    ],
  },
  time: {
    1: [
      week5Row("A year is longer than a week, so a pot left for a year has…", ["more chances for adds and for interest, in the story", "less time than a week", "no calendar"], 0, "Time is the quiet helper. A week is short. A year is many weeks.", 2),
      week5Row("Checking the pot every hour does not…", ["make it grow faster", "tell you what is in it", "count as leaving it alone"], 0, "Looking is not the same as adding. Growth, when it happens, takes time.", 3),
    ],
    2: [
      week5Row("A goal that is years away can sit in…", ["a pot you do not need this month", "the money for Saturday's bus", "a stranger's link"], 0, "The date chooses the pot. Money for this week stays easy to reach.", 3),
    ],
    3: [
      week5Row("Ten years of small adds can beat…", ["one big add that you then spend", "a promise that the number only rises", "a rule that children must buy shares"], 0, "The habit is the lesson. Nothing here promises a profit.", 4),
    ],
  },
  metals: {
    1: [
      week5Row("A gold coin in a story is…", ["a thing you can hold, whose price can still change", "a guarantee of more coins", "a flag"], 0, "Metal is a thing. The price in pounds can fall. A parent holds any real coin.", 2),
      week5Row("Silver and gold are…", ["different metals, with different prices", "the same coin", "a type of interest"], 0, "They are both metals. They do not move together every day.", 3),
    ],
    2: [
      week5Row("A coin's picture is not…", ["its price", "part of the design", "a reason to ask a parent before you buy one"], 0, "Pretty is not the price. The price is what someone will pay.", 3),
    ],
    3: [
      week5Row("Holding a little metal and a lot of cash, in a story mix, means…", ["a fall in the metal price hurts less of the pot", "the metal cannot fall", "cash turns into gold overnight"], 0, "The mix is the point. One price does not own the whole pot.", 4),
    ],
  },
  bitcoin: {
    1: [
      week5Row("Internet money in this lesson is…", ["a story, not something a child sets up", "pocket coins", "a riding hat"], 0, "You do not download a wallet. A parent would decide, and this course does not ask them to.", 2),
      week5Row("A code on a screen is…", ["not the same as coins in your hand", "a gold coin", "interest"], 0, "You cannot put it in a piggy bank. The price can jump and crash.", 3),
    ],
    2: [
      week5Row("A big rise last year is…", ["not a promise for next year", "a rule", "the 20% slice"], 0, "Past jumps are a story. They are not a forecast.", 3),
    ],
    3: [
      week5Row("Money you might need for a school trip does not belong in…", ["something that can fall by half", "a labelled envelope", "a parent's hand"], 0, "The trip has a date. A wild price does not care about the date.", 4),
    ],
  },
  etf: {
    1: [
      week5Row("A bag of many shops, in this lesson, means…", ["one pot that holds lots of companies", "one shop only", "a paper bag of sweets"], 0, "The idea is a mix. If one shop has a bad week, the others are still in the bag.", 2),
      week5Row("You do not pick the bag because…", ["an advert said it cannot fall", "you have read, with a parent, what is in it", "the name sounds fast"], 0, "No honest bag can promise it never falls. The advert is not a lesson.", 3),
    ],
    2: [
      week5Row("A bag that holds shops in several countries is…", ["a wider mix than one shop on one street", "a guarantee", "a coin"], 0, "Wider is the idea. Wider is not safe. A parent still decides.", 3),
    ],
    3: [
      week5Row("The price of the bag can fall even when…", ["you did nothing wrong", "you checked it every day", "you set aside 20%"], 0, "Markets wobble. A good habit does not cancel a fall.", 4),
    ],
  },
  stocks: {
    1: [
      week5Row("One shop's shares, in this story, are…", ["a slice of that one business", "the building's bricks in your pocket", "a flag"], 0, "A share is a slice of the business. It is not the door key.", 2),
      week5Row("If that one shop has a bad year, the slice can…", ["be worth fewer pounds", "only rise", "turn into gold"], 0, "One business is one story. It can go badly.", 3),
    ],
    2: [
      week5Row("Owning slices of many shops is…", ["a mix", "the same as owning one", "a way to skip a fall"], 0, "A mix spreads the story. It does not delete it.", 3),
    ],
    3: [
      week5Row("A child does not open a share account because…", ["a parent would have to, and this lesson is not an instruction", "the lesson says to", "shares are pocket money"], 0, "The idea is the lesson. The account is an adult decision.", 4),
    ],
  },
  risk: {
    1: [
      week5Row("A pot that can fall is a poor home for…", ["money you need next week", "money you can leave for years, if a parent agrees", "a labelled story"], 0, "The date matters. Next week's money wants a calm place.", 2),
      week5Row("'It might fall' means…", ["the number of pounds can be smaller later", "it will fall every day", "it cannot fall"], 0, "Might is not a timetable. It is a warning that the number is not fixed.", 3),
    ],
    2: [
      week5Row("A bigger possible rise often comes with…", ["a bigger possible fall", "no fall at all", "a free gift"], 0, "The wild ones swing both ways. That is the trade.", 3),
    ],
    3: [
      week5Row("You do not put lunch money in a pot that can fall because…", ["you need the lunch", "lunch is an investment", "a fall is illegal"], 0, "Food is a need. The lesson keeps needs out of the wobbly pot.", 4),
    ],
  },
  mix: {
    1: [
      week5Row("Putting the whole pot in one place means…", ["that one place decides the whole story", "you are safer", "the pot cannot fall"], 0, "One basket is one risk. A mix is several stories.", 2),
      week5Row("A mix of cash and a bag of shops, in a story, means…", ["some of the pot is calm and some can wobble", "both parts are identical", "the cash becomes shares overnight"], 0, "The calm part pays for near dates. The wobbly part is the long story.", 3),
    ],
    2: [
      week5Row("If one part falls and another does not, the whole pot…", ["falls by less than the one part", "must fall by the same percent", "is deleted"], 0, "The other part is still there. That is why a mix is a softer landing.", 3),
    ],
    3: [
      week5Row("Changing the mix every time a headline appears is…", ["the noisy week writing the plan", "the calm plan", "free"], 0, "The mix was chosen on a quiet day. Headlines are not that day.", 4),
    ],
  },
  fees: {
    1: [
      week5Row("In a money pot, a fee is…", ["money that leaves the pot", "interest arriving", "a badge"], 0, "Fees are a cost. They are not growth.", 2),
      week5Row("Two small fees, taken every year, are…", ["still a cost, twice", "nothing, because they are small", "a gift"], 0, "Small and repeated is still money leaving.", 3),
    ],
    2: [
      week5Row("A fee of £1 on a £10 story pot is…", ["a tenth of the pot", "nothing", "interest of £1"], 0, "£1 is 10p in every pound of that pot. You can see it without a formula.", 3),
    ],
    3: [
      week5Row("A parent asking 'what does this cost each year?' is…", ["the useful question", "rude", "the same as picking a winner"], 0, "The cost can be known. The future price cannot. Ask about the cost.", 4),
    ],
  },
  patience: {
    1: [
      week5Row("A plan you wrote down can be read…", ["on the day you feel like changing everything", "only on the day you wrote it", "by a stranger in a link"], 0, "You wrote it for the noisy day. Read it before you change it.", 2),
      week5Row("These lessons do not…", ["tell a family to buy anything", "explain ideas", "mention that prices can fall"], 0, "Ideas only. A parent decides about real money.", 3),
    ],
    2: [
      week5Row("Leaving a long pot alone for a month of bad headlines is…", ["what the calm plan was for", "always a mistake", "the same as spending it"], 0, "The plan expected bad months. A month is not the end of a long pot.", 3),
    ],
    3: [
      week5Row("Selling the long pot because a friend is worried…", ["lets someone else's feeling write your plan", "is required by this lesson", "removes fees"], 0, "Worry is allowed. It is not an instruction. A parent decides.", 4),
    ],
  },
  "i-need": {
    1: [
      week5Row("A winter coat that fits, and a second games skin, are…", ["a need and a want", "both needs", "both savings"], 0, "A coat that fits is a need. A second skin can wait.", 2),
      week5Row("The money for a birthday present you already promised stays…", ["with that present", "in a story about shares", "in a link a stranger sent"], 0, "A promise has a date. It is not the long pot.", 2),
    ],
  },
  "i-wait": {
    1: [
      week5Row("Waiting a week before a want means…", ["you can see if you still want it", "the shop must keep it for you", "you have broken a rule"], 0, "A week is a fair test. You can still say yes afterwards.", 2),
      week5Row("A poster that says 'only two left' is…", ["the shop hurrying you", "a fact you must obey", "a bank"], 0, "Hurry is a selling trick. You can still ask and wait.", 2),
    ],
  },
  "i-ask": {
    1: [
      week5Row("A message from a 'bank' that wants a password is…", ["shown to a parent, and not answered", "typed into, to be helpful", "a high score"], 0, "A real bank does not ask a child for a password in a message.", 2),
      week5Row("A prize that needs a grown-up's card number is…", ["not yours to claim", "a free gift", "interest"], 0, "The card is not yours. Fetch the grown-up. Do not type.", 2),
    ],
  },
};

function installWeek5() {
  if (installWeek5.done) return;
  installWeek5.done = true;

  function pushRows(bank, skill, stage, rows) {
    if (!bank[skill]) bank[skill] = {};
    if (!Array.isArray(bank[skill][stage])) bank[skill][stage] = [];
    const have = new Set(bank[skill][stage].map((row) => String(row[0] || "").trim().toLowerCase()));
    rows.forEach((row) => {
      const key = String(row[0] || "").trim().toLowerCase();
      if (!key || have.has(key)) return;
      bank[skill][stage].push(row);
      have.add(key);
    });
  }

  if (typeof GEORGE_KART_BANK !== "undefined") {
    Object.keys(WEEK5_KART).forEach((skill) => {
      if (!GEORGE_KART_BANK[skill]) return;
      Object.keys(WEEK5_KART[skill]).forEach((stage) => {
        pushRows(GEORGE_KART_BANK, skill, Number(stage), WEEK5_KART[skill][stage]);
      });
    });
  }
  if (typeof GEORGE_INVEST_BANK !== "undefined") {
    Object.keys(WEEK5_INVEST).forEach((skill) => {
      if (!GEORGE_INVEST_BANK[skill]) return;
      Object.keys(WEEK5_INVEST[skill]).forEach((stage) => {
        pushRows(GEORGE_INVEST_BANK, skill, Number(stage), WEEK5_INVEST[skill][stage]);
      });
    });
  }
  if (typeof installGeorgeBanks === "function") installGeorgeBanks();

  function pushModuleQuestions(subject, skill, stage, items) {
    if (typeof getTeachModule !== "function") return;
    const mod = getTeachModule(subject, skill, Number(stage), null);
    if (!mod) return;
    if (!Array.isArray(mod.practice)) mod.practice = [];
    const have = new Set(mod.practice.map((q) => String((q && q.q) || "").trim().toLowerCase()));
    const ramp = Number(stage) <= 1 ? 1 : 2;
    items.forEach((q) => {
      const key = String(q.q || "").trim().toLowerCase();
      if (!key || have.has(key)) return;
      if (q && q.week === 5 && typeof q.ramp !== "number") q.ramp = ramp;
      mod.practice.push(q);
      have.add(key);
    });
  }

  Object.keys(WEEK5_CORE).forEach((subject) => {
    Object.keys(WEEK5_CORE[subject]).forEach((skill) => {
      Object.keys(WEEK5_CORE[subject][skill]).forEach((stage) => {
        pushModuleQuestions(subject, skill, stage, WEEK5_CORE[subject][skill][stage]);
      });
    });
  });

  ["k-brief", "k-rain", "k-cheer"].forEach((skill) => {
    const pack = WEEK5_KART[skill] && WEEK5_KART[skill][1];
    if (!pack) return;
    pushModuleQuestions(
      "karting",
      skill,
      1,
      pack.map((row) => week5Multi(row[0], row[1], row[2], row[3]))
    );
  });
  ["i-need", "i-wait", "i-ask"].forEach((skill) => {
    const pack = WEEK5_INVEST[skill] && WEEK5_INVEST[skill][1];
    if (!pack) return;
    pushModuleQuestions(
      "investing",
      skill,
      1,
      pack.map((row) => week5Multi(row[0], row[1], row[2], row[3]))
    );
  });
}

installWeek5();

