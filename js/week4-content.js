/**
 * Week of 14 November 2026 — fresh questions.
 * First steps stays easy and long. Intermediate is one step up.
 * Secure is still primary school: no letters standing for numbers,
 * and no secondary-school science.
 * Nothing here repeats a question the children already have.
 */
function week4Multi(q, options, answer, explain, passage) {
  const item = {
    q: q,
    type: "multi",
    options: options,
    answer: answer,
    explain: explain,
    stage: "both",
    week: 4,
  };
  if (passage) item.passage = passage;
  return item;
}

function week4Typed(q, answer, explain) {
  return {
    q: q,
    type: "typed",
    answer: String(answer),
    explain: explain,
    stage: "both",
    week: 4,
  };
}

function week4Row(q, options, answer, explain, diff) {
  return [q, options, answer, explain, diff || 2, 4];
}

const WEEK4_CORE = {
  maths: {
    number: {
      1: [
        week4Typed("What is 9 + 5?", "14", "9 and 5 more is 14. Count on from 9 if you need to."),
        week4Multi(
          "Which of these numbers is the biggest?",
          ["14", "41", "4"],
          1,
          "41 has 4 tens. 14 has 1 ten. 4 has no tens."
        ),
      ],
      2: [
        week4Typed("What is 180 + 100?", "280", "Adding 100 changes the hundreds digit: 180 + 100 = 280."),
      ],
      3: [
        week4Typed("What is 3000 − 1000?", "2000", "3000 take away 1000 is 2000. That is one thousand less."),
      ],
    },
    operations: {
      1: [
        week4Typed("What is 13 − 6?", "7", "Start at 13 and count back 6. You land on 7."),
        week4Typed("What is 7 × 2?", "14", "Seven groups of 2 make 14. Count 2, 4, 6, 8, 10, 12, 14."),
      ],
      2: [
        week4Typed("What is 32 ÷ 4?", "8", "Four eights are 32, so 32 ÷ 4 = 8."),
      ],
      3: [
        week4Typed("What is 6 × 6?", "36", "Six sixes are 36. You can add 6 six times if you like."),
      ],
    },
    fractions: {
      1: [
        week4Typed("What is half of 26?", "13", "Half means two equal parts. 26 ÷ 2 = 13."),
        week4Multi(
          "A pizza cut into 2 equal slices. One slice is…",
          ["a half", "a quarter", "the whole pizza"],
          0,
          "Two equal slices means each one is a half."
        ),
      ],
      2: [
        week4Typed("What is a quarter of 28?", "7", "A quarter is 4 equal parts. 28 ÷ 4 = 7."),
      ],
      3: [
        week4Typed("What is 10% of 90?", "9", "10% is one tenth. 90 ÷ 10 = 9."),
      ],
    },
    algebra: {
      1: [
        week4Typed("What do you add to 6 to make 10?", "4", "6 and 4 more make 10. Count on four steps if you want to."),
        week4Typed("What is 4 × 5?", "20", "Four groups of 5 make 20. No letters are needed."),
      ],
      2: [
        week4Typed(
          "A car has 4 wheels. How many wheels do 5 cars have?",
          "20",
          "5 groups of 4 is 20. Count 4, 8, 12, 16, 20."
        ),
      ],
      3: [
        week4Typed(
          "What do you add to 25 to make 60?",
          "35",
          "25 and 35 make 60. Count on from 25 if you want to check."
        ),
      ],
    },
    geometry: {
      1: [
        week4Typed("How many sides does a triangle have?", "3", "A triangle has 3 straight sides, one between each pair of corners."),
        week4Multi(
          "Which of these has four equal sides and four square corners?",
          ["A square", "A circle", "A triangle"],
          0,
          "A square has four equal sides and four square corners. A circle is round. A triangle has three sides."
        ),
      ],
      2: [
        week4Typed(
          "A square has sides of 8 cm. What is the perimeter in cm?",
          "32",
          "A square has 4 equal sides. 8 + 8 + 8 + 8 = 32 cm."
        ),
      ],
      3: [
        week4Typed(
          "A rectangle is 6 cm long and 2 cm wide. What is the perimeter in cm?",
          "16",
          "Go around the outside: 6 + 2 + 6 + 2 = 16 cm."
        ),
      ],
    },
    data: {
      1: [
        week4Typed(
          "There are 6 ducks and 2 swans. How many birds altogether?",
          "8",
          "6 and 2 more is 8 birds."
        ),
        week4Multi(
          "A tally of five is drawn as…",
          ["four sticks and a diagonal", "five separate words", "a circle"],
          0,
          "The fifth mark is the diagonal that closes the gate."
        ),
      ],
      2: [
        week4Typed(
          "The numbers are 4, 11 and 6. What is the range?",
          "7",
          "Range is biggest minus smallest. 11 − 4 = 7."
        ),
      ],
      3: [
        week4Typed(
          "The scores are 5, 5, 8 and 2. Which score appears most?",
          "5",
          "5 appears twice. The others appear once, so 5 is the mode."
        ),
      ],
    },
    "y-place": {
      1: [
        week4Typed("In 58, how many tens are there?", "5", "The 5 is in the tens place, so there are 5 tens."),
        week4Typed("What number is 6 tens and 3 ones?", "63", "6 tens is 60, and 3 more is 63."),
      ],
      2: [
        week4Typed("What number is 500 + 20 + 7?", "527", "5 hundreds, 2 tens and 7 ones make 527."),
      ],
      3: [
        week4Typed("How many thousands are in 7400?", "7", "7400 is 7 thousands and 4 hundreds."),
      ],
    },
    "y-bonds": {
      1: [
        week4Typed("What do you add to 13 to make 20?", "7", "13 and 7 make 20. Count on from 13 if you want to."),
        week4Multi(
          "Which pair makes 20?",
          ["9 and 11", "9 and 9", "12 and 9"],
          0,
          "9 and 11 make 20. The other pairs make 18 and 21."
        ),
      ],
      2: [
        week4Typed("What do you add to 70 to make 100?", "30", "70 and 30 make 100. Count in tens if that helps."),
      ],
      3: [
        week4Typed("What do you add to 400 to make 1000?", "600", "400 and 600 make 1000. That is 4 hundreds and 6 hundreds."),
      ],
    },
    "y-add": {
      1: [
        week4Typed("What is 8 + 7?", "15", "8 and 2 make 10, and 5 more is 15."),
        week4Typed("What is 6 + 6?", "12", "Double 6 is 12. Two sixes make twelve."),
      ],
      2: [
        week4Typed("What is 57 + 20?", "77", "57 and 2 tens is 77."),
      ],
      3: [
        week4Typed("What is 246 + 30?", "276", "The tens go from 4 to 7. 246 + 30 = 276."),
      ],
    },
    "y-sub": {
      1: [
        week4Typed("What is 16 − 7?", "9", "Count back 7 from 16. You land on 9."),
        week4Typed("What is 11 − 4?", "7", "11 take away 4 is 7."),
      ],
      2: [
        week4Typed("What is 90 − 40?", "50", "9 tens take away 4 tens is 5 tens."),
      ],
      3: [
        week4Typed("What is 1000 − 300?", "700", "10 hundreds take away 3 hundreds is 7 hundreds."),
      ],
    },
    "y-count": {
      1: [
        week4Typed("What is 5 × 5?", "25", "Five fives are 25. Count 5, 10, 15, 20, 25."),
        week4Multi(
          "Which of these is an even number?",
          ["16", "9", "3"],
          0,
          "16 can be split into pairs. 9 and 3 cannot."
        ),
      ],
      2: [
        week4Typed("What is 4 × 8?", "32", "Four eights are 32. That is the 4 times table."),
      ],
      3: [
        week4Typed("What is 12 × 3?", "36", "12 and 12 and 12 is 36. Three groups of 12."),
      ],
    },
    "y-share": {
      1: [
        week4Typed("12 sweets shared between 3 children. How many each?", "4", "3 equal groups in 12 is 4 each. 12 ÷ 3 = 4."),
        week4Typed("What is 10 ÷ 2?", "5", "Ten shared into 2 equal groups is 5 each."),
      ],
      2: [
        week4Typed("What is 24 ÷ 8?", "3", "Eight threes are 24, so 24 ÷ 8 = 3."),
      ],
      3: [
        week4Typed("What is 64 ÷ 8?", "8", "Eight eights are 64, so 64 ÷ 8 = 8."),
      ],
    },
    "y-money": {
      1: [
        week4Typed("How many pence are in £3?", "300", "£1 is 100 pence, so £3 is 300 pence."),
        week4Multi(
          "50p and 20p together make…",
          ["70p", "30p", "£70"],
          0,
          "50 and 20 more is 70 pence. That is not £70."
        ),
      ],
      2: [
        week4Typed("You pay 35p with £1. How many pence change?", "65", "100 pence take away 35 pence is 65 pence."),
      ],
      3: [
        week4Typed("What is half of £8?", "4", "Half of 8 pounds is 4 pounds. This is a practice sum."),
      ],
    },
    "y-time": {
      1: [
        week4Multi(
          "Half past 3 is…",
          ["3:30", "3:15", "3:00"],
          0,
          "Half past means 30 minutes after the hour."
        ),
        week4Typed("How many minutes are in one hour?", "60", "An hour is 60 minutes."),
      ],
      2: [
        week4Typed("How many minutes are in a quarter of an hour?", "15", "A quarter of 60 minutes is 15 minutes."),
      ],
      3: [
        week4Typed("A lesson starts at 9:10 and ends at 9:40. How many minutes is that?", "30", "From 9:10 to 9:40 is 30 minutes."),
      ],
    },
    "y-measure": {
      1: [
        week4Typed("How many centimetres are in one metre?", "100", "A metre is 100 centimetres."),
        week4Multi(
          "Which is longer?",
          ["2 metres", "20 centimetres", "They are the same"],
          0,
          "2 metres is 200 centimetres, which is much longer than 20 centimetres."
        ),
      ],
      2: [
        week4Typed("How many millilitres are in one litre?", "1000", "A litre is 1000 millilitres."),
      ],
      3: [
        week4Typed(
          "A rectangle is 5 cm long and 3 cm wide. What is the area in square centimetres?",
          "15",
          "Area here is length times width. 5 × 3 = 15. No letters are needed."
        ),
      ],
    },
    "y-shape2": {
      1: [
        week4Multi(
          "Which shape has no straight sides?",
          ["A circle", "A rectangle", "A triangle"],
          0,
          "A circle is round. A rectangle and a triangle have straight sides."
        ),
        week4Typed("How many sides does a hexagon have?", "6", "A hexagon has 6 sides. You can count them around the shape."),
      ],
      2: [
        week4Typed(
          "A triangle has sides of 3 cm, 4 cm and 5 cm. What is the perimeter in cm?",
          "12",
          "Add every side. 3 + 4 + 5 = 12 cm."
        ),
      ],
      3: [
        week4Multi(
          "An angle smaller than a right angle is called…",
          ["acute", "a circle", "a metre"],
          0,
          "A right angle is a square corner. A smaller opening is acute."
        ),
      ],
    },
  },
  english: {
    grammar: {
      1: [
        week4Multi(
          "Which word is the verb in 'The pony jumps the pole'?",
          ["pony", "jumps", "pole"],
          1,
          "Jumps is the doing word. That is the verb."
        ),
        week4Multi(
          "Which line is a full sentence?",
          ["George washed the kart.", "Washed the kart", "Kart"],
          0,
          "It names George and says what he did, then ends with a full stop."
        ),
      ],
      2: [
        week4Multi(
          "Which verb fits more than one horse?",
          ["The horses were tired.", "The horses was tired.", "The horses is tired."],
          0,
          "Horses means more than one, so the verb is were, not was."
        ),
      ],
      3: [
        week4Multi(
          "Which word joins the reason to the rest?",
          ["We stayed in because it rained.", "We stayed in.", "Rain"],
          0,
          "Because joins the reason to the sentence. That is a conjunction."
        ),
      ],
    },
    punctuation: {
      1: [
        week4Multi(
          "Which one needs a question mark?",
          ["Who fed the pony", "The pony ate hay.", "Hay"],
          0,
          "It asks something, so it needs a question mark at the end."
        ),
        week4Multi(
          "Which spelling is the real word?",
          ["friend", "freind", "frend"],
          0,
          "Friend is spelled f-r-i-e-n-d. The i comes before the e."
        ),
      ],
      2: [
        week4Multi(
          "Which sentence shows belonging?",
          ["Bella's hat is blue.", "Bellas hat is blue.", "Bella hat is blue."],
          0,
          "The apostrophe shows the hat belongs to Bella."
        ),
      ],
      3: [
        week4Multi(
          "Which hay list is punctuated properly?",
          ["Hay, water and a rug.", "Hay water and a rug.", "Hay; water and a rug?"],
          0,
          "Commas separate the items in a short list. The last join is and."
        ),
      ],
    },
    vocabulary: {
      1: [
        week4Multi(
          "A paddock is…",
          ["a fenced field for horses", "a type of helmet", "a full stop"],
          0,
          "A paddock is a field with a fence, the sort a horse might turn out in."
        ),
        week4Multi(
          "A bucket with nothing in it is…",
          ["empty", "full", "heavy"],
          0,
          "Empty means nothing inside. Full is the opposite. Heavy is about weight."
        ),
      ],
      2: [
        week4Multi(
          "If a pony is swift, it is…",
          ["quick", "sleepy", "square"],
          0,
          "Swift means quick. A swift pony moves fast. Sleepy and square are different ideas."
        ),
      ],
      3: [
        week4Multi(
          "In 'the marshal's instruction was brief', brief means…",
          ["short", "angry and endless", "made of metal"],
          0,
          "A brief instruction does not go on for long. It means short."
        ),
      ],
    },
    reading: {
      1: [
        week4Multi(
          "What did the horse eat?",
          ["Hay", "A helmet", "A laptop"],
          0,
          "The passage says the horse ate hay. That is the fact to find.",
          "The bay horse stood by the door and ate hay."
        ),
        week4Multi(
          "Where was the bucket?",
          ["By the door", "In the kart", "On the Moon"],
          0,
          "The passage says the bucket was by the door.",
          "Bella filled the bucket by the door before she left the stable."
        ),
      ],
      2: [
        week4Multi(
          "Why did George slow down?",
          ["He saw oil on the track", "He wanted a new helmet colour", "The lights had not been invented"],
          0,
          "The sentence gives the reason: he saw oil on the track.",
          "George saw oil on the track, so he slowed down before the corner."
        ),
      ],
      3: [
        week4Multi(
          "What can you work out, even though it is not said in those words?",
          ["The gate was open, so the horse could leave the field", "The horse can drive", "The gate is a verb"],
          0,
          "An open gate means the way out is clear. That is a simple inference.",
          "Bella found the field gate open when she arrived with the headcollar."
        ),
      ],
    },
    writing: {
      1: [
        week4Multi(
          "Which line is a proper sentence about a kart?",
          ["The kart stopped.", "Stopped suddenly", "Kart"],
          0,
          "It can stand on its own. It has a what and a doing word."
        ),
        week4Multi(
          "Which opening uses a capital letter?",
          ["After lunch we groomed the pony.", "after lunch we groomed the pony.", "after lunch"],
          0,
          "A sentence starts with a capital letter, including the first word."
        ),
      ],
      2: [
        week4Multi(
          "Which sentence tells you why the gate was shut?",
          ["We shut the gate because the pony was in the field.", "We shut the gate.", "Field gate"],
          0,
          "Because tells the reader the reason."
        ),
      ],
      3: [
        week4Multi(
          "Which is the best topic sentence for a paragraph about a wet track?",
          ["A wet track needs a smoother, slower lap.", "Anyway.", "Visor"],
          0,
          "A topic sentence says what the whole paragraph is about."
        ),
      ],
    },
    "y-caps": {
      1: [
        week4Multi(
          "Which of these lines starts with a capital and ends with a full stop?",
          ["the dog sat", "The dog sat.", "The dog sat"],
          1,
          "A telling sentence starts with a capital letter and ends with a full stop."
        ),
        week4Multi(
          "Which name needs a capital letter?",
          ["george", "George", "kart"],
          1,
          "George is a name, so it starts with a capital G."
        ),
      ],
      2: [
        week4Multi(
          "Which list uses commas?",
          ["Boots, a hat and gloves.", "Boots a hat and gloves.", "Boots a hat, and gloves"],
          0,
          "Commas separate the things in the list. The last pair can use and."
        ),
      ],
      3: [
        week4Multi(
          "Which shortening is written correctly?",
          ["don't", "do'nt", "dont'"],
          0,
          "Don't stands for do not. The apostrophe marks the missing o."
        ),
      ],
    },
    "y-nouns": {
      1: [
        week4Multi(
          "Which word is a noun in 'The stable is warm'?",
          ["stable", "is", "warm"],
          0,
          "A stable is a place you can name. That is a noun."
        ),
        week4Multi(
          "Which of these is a naming word?",
          ["helmet", "quickly", "and"],
          0,
          "A helmet is a thing. Quickly describes how, and and joins words."
        ),
      ],
      2: [
        week4Multi(
          "Which plural is right?",
          ["two ponies", "two ponys", "two pony"],
          0,
          "Pony ends in y, so the plural is ponies."
        ),
      ],
      3: [
        week4Multi(
          "In 'Bella led the pony', which words are nouns?",
          ["Bella and pony", "led", "the"],
          0,
          "Bella is a person and pony is an animal. Led is the verb."
        ),
      ],
    },
    "y-verbs": {
      1: [
        week4Multi(
          "Which word is the verb in 'George brakes for the corner'?",
          ["brakes", "George", "corner"],
          0,
          "Brakes is the doing word."
        ),
        week4Multi(
          "Which line has a doing word?",
          ["The flag waved.", "Red flag", "Slowly"],
          0,
          "Waved tells us what the flag did."
        ),
      ],
      2: [
        week4Multi(
          "Which verb fits one pony in the past?",
          ["The pony was calm.", "The pony were calm.", "The pony are calm yesterday."],
          0,
          "One pony takes was. Were is for more than one. Are does not fit yesterday."
        ),
      ],
      3: [
        week4Multi(
          "Which story stays in the past?",
          ["The horse walked in and ate.", "The horse walked in and eats.", "The horse walks in and ate."],
          0,
          "Walked and ate are both past. Mixing walked and eats hops tense."
        ),
      ],
    },
    "y-adj": {
      1: [
        week4Multi(
          "Which word is the adjective in 'the muddy yard'?",
          ["muddy", "the", "yard"],
          0,
          "Muddy describes the yard. That is the adjective."
        ),
        week4Multi(
          "Which word describes the helmet?",
          ["red", "wore", "and"],
          0,
          "Red tells us about the helmet. Wore is a verb."
        ),
      ],
      2: [
        week4Multi(
          "Which comparison is right for two ponies?",
          ["This pony is taller.", "This pony is tallest of the two.", "This pony is more taller."],
          0,
          "Taller compares two. Tallest is for three or more."
        ),
      ],
      3: [
        week4Multi(
          "Which word is more precise than big?",
          ["enormous", "nice", "stuff"],
          0,
          "Enormous tells the reader the size. Big is vague. Nice is not a size."
        ),
      ],
    },
    "y-join": {
      1: [
        week4Multi(
          "Which sentence joins two ideas with and?",
          ["The pony ate and then drank.", "The pony ate.", "Ate drank"],
          0,
          "And joins the two actions into one sentence."
        ),
        week4Multi(
          "Which join is a proper sentence?",
          ["George checked the visor and tightened the strap.", "Checked and tightened", "Visor strap"],
          0,
          "It has a who and two actions joined by and."
        ),
      ],
      2: [
        week4Multi(
          "Which sentence shows a contrast?",
          ["The track was wet, but the briefing still happened.", "The track was wet.", "Wet track"],
          0,
          "But shows the second idea is different from the first."
        ),
      ],
      3: [
        week4Multi(
          "Which sentence uses if correctly?",
          ["If the gate is open, shut it.", "If the gate.", "Open if"],
          0,
          "If sets a condition, and the rest of the sentence says what to do."
        ),
      ],
    },
    "y-spell": {
      1: [
        week4Multi(
          "Which of these is the right spelling of the word for 'spoke'?",
          ["said", "sed", "saide"],
          0,
          "Said is one of the words to know by heart. It is not sed or saide."
        ),
        week4Multi(
          "Which spelling is right?",
          ["they", "thay", "tey"],
          0,
          "They is spelled t-h-e-y."
        ),
      ],
      2: [
        week4Multi(
          "Which sentence uses there correctly?",
          ["The brush is over there.", "The brush is over their.", "The brush is over they're."],
          0,
          "There is a place. Their means belonging. They're means they are."
        ),
      ],
      3: [
        week4Multi(
          "Which is the British spelling?",
          ["colour", "color", "culour"],
          0,
          "In Britain we write colour with a u."
        ),
      ],
    },
    "y-read": {
      1: [
        week4Multi(
          "How many laps did the note mention?",
          ["Three", "Ten", "None"],
          0,
          "The sentence says three laps. That is the fact.",
          "George drove three laps and then came into the pits."
        ),
        week4Multi(
          "What colour was the rug?",
          ["Green", "The passage does not say a colour", "Invisible"],
          1,
          "The passage says the rug was folded. It does not give a colour.",
          "Bella folded the rug and hung it on the door."
        ),
      ],
      2: [
        week4Multi(
          "Who filled the bucket?",
          ["Bella", "The pony", "A stranger"],
          0,
          "The note names Bella.",
          "Bella filled the water bucket. The pony drank when she had finished."
        ),
      ],
      3: [
        week4Multi(
          "What does the text suggest?",
          ["George was being careful, because he checked twice", "George ignored the kart", "The visor is a verb"],
          0,
          "Checking twice fits a careful driver. The text supports that guess.",
          "George checked the visor, then he checked it again before he sat in."
        ),
      ],
    },
    "y-sent": {
      1: [
        week4Multi(
          "Which of these lines is a finished telling sentence about the marshal?",
          ["The marshal raised the flag.", "Raised the flag", "Marshal"],
          0,
          "A sentence needs a who, a verb, and a stop. The other two lines are only pieces."
        ),
        week4Multi(
          "Which ending is right for a telling sentence?",
          ["A full stop", "Nothing at all", "A random comma in the middle of the verb"],
          0,
          "A telling sentence ends with a full stop."
        ),
      ],
      2: [
        week4Multi(
          "Which is the clearer joined sentence?",
          ["The yard was muddy, so we wore boots.", "Muddy. Boots.", "Yard was"],
          0,
          "So joins the reason to the action and the sentence can stand alone."
        ),
      ],
      3: [
        week4Multi(
          "Which is a topic sentence about cooling a kart engine?",
          ["After a session, a hot engine needs time to cool before anyone touches it.", "Anyway the thing.", "Engine"],
          0,
          "A topic sentence tells the reader what the paragraph will explain."
        ),
      ],
    },
  },
  science: {
    biology: {
      1: [
        week4Multi(
          "Which of these is alive?",
          ["A pony", "A helmet", "A full stop"],
          0,
          "A pony grows and needs food and water. A helmet does not."
        ),
        week4Multi(
          "Which body part helps a human breathe air in?",
          ["The lungs", "The helmet strap", "The full stop"],
          0,
          "Lungs take air in. They are part of a living body."
        ),
      ],
      2: [
        week4Multi(
          "A food chain starts with a plant because the plant…",
          ["makes food from light", "eats the fox", "is a type of rock"],
          0,
          "Plants make food. Animals eat. The plant is the start in this simple chain."
        ),
      ],
      3: [
        week4Multi(
          "If the rabbits leave a field, the foxes that eat them…",
          ["may have less food", "will turn into plants that week", "no longer need food"],
          0,
          "A predator depends on its prey. Lose the rabbits and the foxes struggle."
        ),
      ],
    },
    chemistry: {
      1: [
        week4Multi(
          "Steam from a kettle is water as a…",
          ["gas", "helmet", "verb"],
          0,
          "Steam is water that has become a gas. It is still water."
        ),
        week4Multi(
          "A wooden fence post keeps its shape, so the wood is a…",
          ["solid", "liquid you can pour", "gas you can stir"],
          0,
          "A solid keeps its shape. Wood in a post is a solid."
        ),
      ],
      2: [
        week4Multi(
          "Salt stirred into water can…",
          ["dissolve, so the grains seem to vanish", "stop being salt forever in every case", "become a horse"],
          0,
          "Dissolved salt is still in the water. You may not see the grains."
        ),
      ],
      3: [
        week4Multi(
          "Cooling water vapour on a cold window can turn it back into…",
          ["liquid water", "a brick", "a bone"],
          0,
          "Cooling can bring a gas back to a liquid. That is condensation."
        ),
      ],
    },
    physics: {
      1: [
        week4Multi(
          "To stop a rolling ball you need a…",
          ["force, such as a hand in the way", "comma", "habitat"],
          0,
          "A push or a pull can slow something down. That push is a force."
        ),
        week4Typed(
          "A pony walks 10 metres in 2 seconds. What is the speed in metres per second?",
          "5",
          "Speed here is distance shared by time. 10 ÷ 2 = 5 metres each second."
        ),
      ],
      2: [
        week4Multi(
          "A rough surface usually gives…",
          ["more friction than a smooth one", "no forces at all", "photosynthesis"],
          0,
          "Rough surfaces grip more. That grip is friction."
        ),
      ],
      3: [
        week4Typed(
          "A kart rolls 20 metres in 5 seconds. What is the speed in metres per second?",
          "4",
          "20 ÷ 5 = 4. That is 4 metres every second in this story sum."
        ),
      ],
    },
    method: {
      1: [
        week4Multi(
          "In a fair test, how many things do you change?",
          ["one thing at a time", "every thing at once, then guesses", "the question into a story only"],
          0,
          "Change one thing so you know what caused the result. Keep the rest the same."
        ),
        week4Multi(
          "Writing the result in a notebook helps because…",
          ["you can look back and compare", "notebooks change the result", "guessing is more exact"],
          0,
          "A written result can be checked. A forgotten guess cannot."
        ),
      ],
      2: [
        week4Multi(
          "You test which paper towel soaks up more water. What should stay the same?",
          ["The amount of water you start with", "The brand, on purpose, as a second change", "The day of the week as the only measurement"],
          0,
          "The towel can change. The amount of water should start the same."
        ),
      ],
      3: [
        week4Multi(
          "If the result does not match your prediction, you…",
          ["record what happened", "change the numbers so they match", "throw the test away and pretend"],
          0,
          "The result is the evidence. A surprise is still a result."
        ),
      ],
    },
    "y-alive": {
      1: [
        week4Multi(
          "Which of these can grow?",
          ["A sunflower", "A stone", "A plastic cone"],
          0,
          "A sunflower is living, so it can grow. A stone cannot."
        ),
        week4Multi(
          "A living thing needs…",
          ["food or a way to make food", "only a flag", "a question mark"],
          0,
          "Living things need food. Plants make theirs. Animals eat."
        ),
      ],
      2: [
        week4Multi(
          "A beetle is an insect because it has…",
          ["six legs", "a saddle", "four wheels"],
          0,
          "Insects have six legs. You can count them."
        ),
      ],
      3: [
        week4Multi(
          "A frog's life cycle includes…",
          ["eggs, then tadpoles, then a frog", "only a helmet", "a pit stop"],
          0,
          "The same animal, different stages. Eggs hatch into tadpoles."
        ),
      ],
    },
    "y-plants": {
      1: [
        week4Multi(
          "A plant left with no water will…",
          ["struggle to live", "grow faster by rule", "turn into a kart"],
          0,
          "Plants need water. Without it they wilt."
        ),
        week4Multi(
          "Plants also need…",
          ["light", "a chequered flag", "a bank account"],
          0,
          "Light is how most plants get the energy to make food."
        ),
      ],
      2: [
        week4Multi(
          "The part that holds a plant in the soil is the…",
          ["root", "flower only", "visor"],
          0,
          "Roots anchor the plant and take in water."
        ),
      ],
      3: [
        week4Multi(
          "Photosynthesis is how a plant…",
          ["makes food using light", "eats hay", "changes into a gas called metal"],
          0,
          "Plants use light, water and air to make food. Animals cannot do that."
        ),
      ],
    },
    "y-body": {
      1: [
        week4Multi(
          "To stay well, a person needs…",
          ["food, water and sleep", "only a louder engine", "no water at all"],
          0,
          "Bodies need food, drink and rest. An engine is not a meal."
        ),
        week4Multi(
          "Exercise helps because it…",
          ["keeps the body moving and strong", "replaces drinking water", "is the same as a full stop"],
          0,
          "Moving is part of looking after a body. Water is still needed."
        ),
      ],
      2: [
        week4Multi(
          "The flat front teeth are for…",
          ["cutting food", "pumping blood", "making light"],
          0,
          "Incisors cut. The back teeth crush. The heart pumps."
        ),
      ],
      3: [
        week4Multi(
          "Blood is pumped around the body by the…",
          ["heart", "stomach", "hair"],
          0,
          "The heart is a muscle that pumps. The lungs take in air."
        ),
      ],
    },
    "y-mats": {
      1: [
        week4Multi(
          "A good material for a raincoat is one that is…",
          ["waterproof", "made of paper that falls apart in rain", "the same as a verb"],
          0,
          "A raincoat has to keep water out. The material is chosen for that job."
        ),
        week4Multi(
          "Metal is often used for a spoon because it is…",
          ["strong and can be shaped", "a liquid at the table", "alive"],
          0,
          "Metal keeps its shape and can be made into a spoon."
        ),
      ],
      2: [
        week4Multi(
          "Orange juice in a glass is a…",
          ["liquid", "solid with corners", "gas you can sit on"],
          0,
          "Juice flows and takes the shape of the glass. That is a liquid."
        ),
      ],
      3: [
        week4Multi(
          "Sugar that has dissolved in tea…",
          ["is still in the tea", "has left the universe", "has become a magnet"],
          0,
          "You may not see the grains. The sugar is still there."
        ),
      ],
    },
    "y-push": {
      1: [
        week4Multi(
          "Opening a gate by pulling the handle is a…",
          ["pull", "habitat", "spelling rule"],
          0,
          "A pull is a force. It can start the gate moving."
        ),
        week4Multi(
          "A push can…",
          ["make something start to move", "turn a noun into a verb by law", "remove the need for a force"],
          0,
          "Pushes and pulls are forces. They can start or stop a movement."
        ),
      ],
      2: [
        week4Multi(
          "A louder sound is usually a…",
          ["bigger vibration", "smaller vibration with no change", "type of plant"],
          0,
          "Sound is a vibration. A bigger vibration is louder."
        ),
      ],
      3: [
        week4Multi(
          "Air resistance is a force that…",
          ["pushes back against something moving through air", "makes every object speed up forever", "is the same as a comma"],
          0,
          "Moving through air meets a push back. That is air resistance."
        ),
      ],
    },
    "y-home": {
      1: [
        week4Multi(
          "A habitat is…",
          ["the place a living thing lives", "a full stop", "a times table"],
          0,
          "A habitat provides what the living thing needs, such as food and shelter."
        ),
        week4Multi(
          "A pond can be a habitat for…",
          ["a frog", "a steering wheel", "a question mark"],
          0,
          "Frogs live in and around water. A pond can be their habitat."
        ),
      ],
      2: [
        week4Multi(
          "In a food chain, the arrow means…",
          ["is eaten by", "is the same word as", "is faster than"],
          0,
          "Grass → rabbit means the grass is eaten by the rabbit."
        ),
      ],
      3: [
        week4Multi(
          "A thick coat on a pony in winter is an adaptation because it…",
          ["helps the pony stay warm", "makes the pony photosynthesise", "replaces water"],
          0,
          "An adaptation is a feature that helps something survive where it lives."
        ),
      ],
    },
    "y-sky": {
      1: [
        week4Multi(
          "Day and night happen because…",
          ["the Earth spins", "the Sun goes out every evening", "clouds are switched off"],
          0,
          "The Earth turns. Your side faces the Sun, then faces away."
        ),
        week4Multi(
          "When your side of the Earth faces the Sun, it is…",
          ["day", "always winter", "a full stop"],
          0,
          "Day is the time your part of the Earth is in the sunlight."
        ),
      ],
      2: [
        week4Multi(
          "A year is about how long the Earth takes to…",
          ["go once around the Sun", "spin once", "change a tyre"],
          0,
          "One orbit of the Sun is a year. One spin is a day."
        ),
      ],
      3: [
        week4Multi(
          "In the solar system, the planets go around…",
          ["the Sun", "a kart", "the Moon only, with the Sun going around the Moon"],
          0,
          "The Sun is in the middle. The planets, including Earth, go around it."
        ),
      ],
    },
  },
  horses: {
    care: {
      1: [
        week4Multi("You walk up to a horse from…", ["the shoulder, where they can see you", "straight at the heels", "a sprint from behind"], 0, "The shoulder is the safe side to approach. Heels can kick."),
        week4Multi("A horse you do not know…", ["is treated as if it might be nervous", "is safe to surprise", "can be climbed on at once"], 0, "A strange horse needs a quiet introduction and an adult who knows them."),
      ],
      2: [
        week4Multi("A quick-release knot is used so that…", ["the rope can be undone in a hurry", "the horse can never be freed", "it replaces a headcollar"], 0, "If a horse panics, a quick-release knot lets a person free them fast."),
      ],
      3: [
        week4Multi("A horse that rolls, looks at its belly and will not eat may have…", ["colic, so you tell an adult the same day", "a new coat colour", "nothing worth mentioning"], 0, "Those signs can be colic. People who know the horse need to hear at once."),
      ],
    },
    water: {
      1: [
        week4Multi("A horse should be able to drink…", ["through the day", "only once a week", "only from a puddle"], 0, "Water is not a treat. Clean water stays available."),
        week4Multi("You top up a bucket that is half empty because…", ["horses drink a lot", "air is a drink", "feed belongs in the water"], 0, "A low bucket gets filled with clean water, not left until it is dry."),
      ],
      2: [
        week4Multi("A bucket with dung in the water is…", ["tipped out and refilled", "a nice drink", "left for the next horse"], 0, "Dirty water is not a drink. Empty it, rinse, and refill."),
      ],
      3: [
        week4Multi("In hot weather you check water more often because…", ["horses drink more when they are warm", "they stop needing water in summer", "heat turns water into hay"], 0, "Sweat means more water is needed. Look at the buckets more often."),
      ],
    },
    feeding: {
      1: [
        week4Multi("The main food for many horses is…", ["grass or hay", "chocolate", "a bowl of sweets"], 0, "Forage is the base. Treats are a small extra, if the yard allows them."),
        week4Multi("You change a horse's feed scoop because…", ["you should not — the chart is for that horse", "every horse wants your guess", "scoops are toys"], 0, "The yard writes the feed. You do not invent a bigger scoop."),
      ],
      2: [
        week4Multi("A big feed just before hard work is a poor plan because…", ["a full stomach and hard work do not mix", "food makes the horse lighter", "the rules say horses never eat"], 0, "Many yards feed after work, or leave time. Ask before you change the order."),
      ],
      3: [
        week4Multi("A new bag of feed is started…", ["the way the yard shows, not by pouring the whole bag in", "by doubling it on the first day", "by guessing from the picture"], 0, "A sudden rich feed can make a horse ill. Changes are slow and decided by an adult."),
      ],
    },
    grooming: {
      1: [
        week4Multi("A curry comb on a muddy coat is for…", ["loosening dried mud", "brushing the eyes", "cleaning the inside of the ear"], 0, "The curry works on the body. Eyes and ears need a softer, careful approach."),
        week4Multi("You put a grooming brush down…", ["where the horse cannot tread on it", "under a hoof", "in the water bucket"], 0, "A brush under a foot is a trip. Park it outside the kick zone."),
      ],
      2: [
        week4Multi("Picking out a hoof means…", ["clearing mud and stones from the underneath", "painting the hoof for fun", "cutting the frog with scissors"], 0, "A stone can bruise. An adult shows you the pick. You do not cut anything."),
      ],
      3: [
        week4Multi("A hot horse is scraped and walked because…", ["sweat left on can chill them as they cool", "sweat is a rug", "walking is illegal after work"], 0, "A cooler and a quiet walk help them dry. An adult sets the routine."),
      ],
    },
    stable: {
      1: [
        week4Multi("A stable door is shut so that…", ["the horse stays in until a person means to lead them out", "the horse can wander the yard alone", "it keeps the hay outside"], 0, "An open door is an invitation. Shut it properly when you leave."),
        week4Multi("Droppings in a stable are…", ["skipped out so the bed stays clean", "a pillow", "left for a month"], 0, "A clean bed is part of care. Skip out, then add bedding if the yard asks."),
      ],
      2: [
        week4Multi("Bedding banked up the wall can…", ["stop a horse getting cast as easily", "replace water", "be eaten as the only feed"], 0, "A bank gives a horse something to push against if they lie too close to the wall. Ask the yard."),
      ],
      3: [
        week4Multi("You stack the wheelbarrow and tools…", ["out of the doorway and the horse's path", "in the middle of the stable door", "under the horse's belly"], 0, "A blocked door traps people and horses. Park tools where the yard shows you."),
      ],
    },
    riding: {
      1: [
        week4Multi("Before you mount you…", ["check the girth with an adult", "jump on from behind", "leave the reins on the ground and hope"], 0, "A loose girth lets a saddle slip. An adult checks it with you."),
        week4Multi("Your heels in the stirrup sit…", ["down, not clamped up by your toes", "on the dashboard", "behind the horse"], 0, "Heels down help you stay balanced. Toes are not the grip."),
      ],
      2: [
        week4Multi("In rising trot you…", ["rise and sit with the two-beat rhythm", "stand in the stirrups the whole time", "hold the mane and shut your eyes"], 0, "Trot is two beats. The rise matches that rhythm. An instructor sets the lesson."),
      ],
      3: [
        week4Multi("You turn a horse by…", ["looking and asking with the rein and leg you were taught", "pulling one rein to your knee as hard as you can", "dropping the reins"], 0, "A turn is a quiet aid. Hauling a rein is not the lesson."),
      ],
    },
    tack: {
      1: [
        week4Multi("A riding hat is fastened…", ["before you mount, and it stays on", "after you are already moving", "only if it is sunny"], 0, "The hat is on and done up before your foot goes in the stirrup."),
        week4Multi("A twisted noseband is…", ["straightened before you do it up", "a new style to copy", "safer if it pinches"], 0, "Tack should sit flat. A twist rubs. Ask if you are not sure."),
      ],
      2: [
        week4Multi("You store a leather bridle…", ["hung up, not in a wet heap", "on the floor of the wash box", "in the feed bin"], 0, "Wet leather left in a pile cracks and goes mouldy. Hang it where the yard shows you."),
      ],
      3: [
        week4Multi("A stirrup leather with a cracked hole is…", ["shown to an adult before it is used", "fine if you skip that hole and hope", "a decoration"], 0, "Cracked leather can snap. Tack that looks tired is a stop, not a secret."),
      ],
    },
    history: {
      1: [
        week4Multi("Horses were used on farms to…", ["pull ploughs and carts", "drive karts", "write letters"], 0, "Before tractors, horses did a lot of the pulling. That is history, not a job for a child's pony today."),
        week4Multi("A heavy horse and a riding pony are…", ["different types for different work", "always the same height", "both karts"], 0, "Some breeds pulled. Some were ridden. The type was chosen for the job."),
      ],
      2: [
        week4Multi("Pit ponies worked…", ["underground, pulling carts in mines", "only on the beach", "in Formula 1"], 0, "In Britain, ponies hauled coal underground. It was hard, dark work."),
      ],
      3: [
        week4Multi("The job of a horse today, for most families, is…", ["riding, driving or companionship, with proper care", "winning a war", "replacing a car on the motorway"], 0, "History explains the past. The present job is care, and the work the horse is trained for."),
      ],
    },
    "h-lead": {
      1: [
        week4Multi("The lead rope is held…", ["in a flat hand, not wrapped around it", "looped tight around your wrist", "in your mouth"], 0, "You must be able to let go. A wrap can trap your fingers."),
        week4Multi("You walk…", ["beside the shoulder, not in front of the chest", "under the neck", "three steps behind the heels"], 0, "Beside the shoulder you can see the horse and they can see you."),
      ],
    },
    "h-field": {
      1: [
        week4Multi("You turn a horse towards the gate before you let go so that…", ["you are not in front of them as they spin away", "they can barge you", "the gate can stay open all week"], 0, "Turn them, slip the rope, and step aside. Then shut the gate."),
        week4Multi("After they are in the field you…", ["shut and check the gate", "leave it ajar", "throw the headcollar over the wire"], 0, "A checked gate is the end of the job. An open gate is a loose horse."),
      ],
    },
    "h-rug": {
      1: [
        week4Multi("You rug a horse…", ["only when an adult says that horse needs it", "because the rug looks smart", "in a heatwave, to be kind"], 0, "Some horses need a rug. Some get too hot. The person who knows them decides."),
        week4Multi("A rug that has slipped under the belly is…", ["straightened or taken off, with help", "left, because it will sort itself", "a new fashion"], 0, "A slipped rug rubs and can tangle legs. Fetch someone and make it safe."),
      ],
    },
  },
  f1: {
    "f-teams": {
      1: [
        week4Multi("A Formula 1 team is…", ["the people and the car, not only the driver", "one person with a flag", "a go-kart club"], 0, "The driver is the one you see. A team designs, builds and runs the car."),
        week4Multi("There are two championships. One is for drivers and one is for…", ["teams, called constructors", "the loudest engine", "the marshals"], 0, "Drivers score, and those points also count for their team."),
      ],
      2: [
        week4Multi("The people on the pit wall are…", ["part of the team, talking to the driver", "spectators who wandered in", "horse grooms"], 0, "Engineers and the team principal watch the race and send messages. They are not the crowd."),
      ],
      3: [
        week4Multi("A driver can change teams. The team's history…", ["stays with the team", "is deleted that week", "moves into go-karting"], 0, "Teams and drivers are not the same thing. A new driver does not erase the garage."),
      ],
    },
    "f-flags": {
      1: [
        week4Multi("When the five red lights go out, the race…", ["starts", "is cancelled forever", "becomes a kart lesson"], 0, "Lights out is the start. Going before they go out is a jump start."),
        week4Multi("A blue flag in Formula 1 is shown to a driver who is…", ["being lapped, so they should let the leader through", "the winner already", "in the pits for lunch"], 0, "Blue means a faster car is catching you to lap you. You let them by."),
      ],
      2: [
        week4Multi("A red flag shown to the whole Formula 1 session means…", ["stop. The session is halted", "go faster", "the track is now a road"], 0, "Red is a stop. You do not keep racing to the flag you wish you had seen."),
      ],
      3: [
        week4Multi("Double yellow flags in Formula 1 mean…", ["slow down. There is danger, and you do not overtake", "the race is over", "you must set your fastest lap"], 0, "Yellow is caution. Waved or double yellow is urgent. Overtaking waits."),
      ],
    },
    "f-pits": {
      1: [
        week4Multi("A pit crew changes the tyres. The driver…", ["stays in the car", "gets out to help unscrew a wheel as a first habit", "walks to the cafe"], 0, "The stop is practised so the driver holds still and the crew does the work."),
        week4Multi("The pit lane is left…", ["when the team releases the car, not when you feel like it", "whenever the driver is bored", "by reversing the wrong way"], 0, "A release light or a person tells the driver to go. Jumping that signal is dangerous."),
      ],
      2: [
        week4Multi("Under the rules used for many seasons, a race pit stop is for…", ["tyres, not a tank of fuel", "a new engine every lap", "changing the driver for a horse"], 0, "Refuelling in the race was stopped. Tyres are the usual job. Rule books can still change."),
      ],
      3: [
        week4Multi("A slow pit stop can…", ["cost more time than a fast car gains on the track", "be ignored because pits do not count", "add points by itself"], 0, "The clock does not pause. A long stop is time lost to the cars that were quicker in the box."),
      ],
    },
    "f-car": {
      1: [
        week4Multi("A Formula 1 car is…", ["a single-seat racing car with wings", "a go-kart with a roof", "a road car with the number painted on"], 0, "Wings and a wide shape push the car onto the track. It is not a kart and not a family car."),
        week4Multi("The driver sits…", ["in a cockpit, with a halo over their head", "on the engine", "standing up"], 0, "The halo is a protection around the cockpit. The driver is belted in."),
      ],
      2: [
        week4Multi("Slick tyres, with no tread, are for…", ["a dry track", "deep water", "the pit wall"], 0, "Slicks grip dry tarmac. A wet tyre has grooves to move water. The team chooses."),
      ],
      3: [
        week4Multi("The drag reduction system opens a flap in the rear wing so the car can…", ["go quicker in a straight line when the rules allow", "fly", "skip the pits"], 0, "Less drag means more speed on the straight. It is only used where and when the rules say."),
      ],
    },
    "f-history": {
      1: [
        week4Multi("The first Formula 1 world championship race was at…", ["Silverstone, in Britain", "a kart track last Tuesday", "the Moon"], 0, "1950, at Silverstone. That date does not change when a new season starts."),
        week4Multi("Ferrari has been in the championship…", ["since the beginning, in 1950", "only for one weekend", "never"], 0, "Ferrari entered in 1950 and is the team that has been there throughout. Line-ups of other teams change."),
      ],
      2: [
        week4Multi("A street circuit is a track…", ["laid out on closed public roads", "that is always a field", "inside a stable"], 0, "Monaco is the famous example. The roads are closed and lined with barriers."),
      ],
      3: [
        week4Multi("We do not learn 'this year's champion' in the lesson because…", ["that name changes, and the ideas do not", "there has never been a champion", "history is not allowed"], 0, "Flags, stops and the 1950 start stay true. A winner is news, and news goes out of date."),
      ],
    },
    "f-sums": {
      1: [
        week4Typed("A story-lap is 80 seconds. Which is quicker, 80 seconds or 95 seconds?", "80", "Less time is faster. 80 is a shorter lap than 95."),
        week4Multi("Two equal story-laps of 90 seconds take…", ["180 seconds", "90 seconds altogether", "45 seconds"], 0, "90 and 90 is 180. A real race has many more laps than two."),
      ],
      2: [
        week4Typed("A story-car gains 2 seconds a lap for 4 laps. How many seconds is that?", "8", "4 × 2 = 8 seconds. A real gap depends on the cars and the track."),
      ],
      3: [
        week4Typed("A pit stop costs 20 seconds and the new tyres then save 3 seconds a lap. After 4 laps, how many seconds are still lost?", "8", "4 × 3 = 12 seconds saved. 20 − 12 = 8 still lost. This is a story sum, not a real stop."),
      ],
    },
  },
  horseworld: {
    "w-breeds": {
      1: [
        week4Multi("A horse is usually…", ["over 14.2 hands", "always smaller than a pony", "measured in laps"], 0, "Over 14.2 hands is the usual line for a horse. 14.2 and under is a pony."),
        week4Multi("A Shire is known as…", ["a heavy horse", "a pony under 10 hands", "a type of kart"], 0, "Shires are a tall British heavy breed. They are not ponies."),
      ],
      2: [
        week4Multi("An Arab horse is famous for…", ["stamina and a fine head", "having five legs", "living only in a book"], 0, "Arabs are an old riding breed. 'Famous for' is not a promise about one horse in a field."),
      ],
      3: [
        week4Multi("The ridge where the neck meets the back is called the…", ["withers", "muzzle", "hoof"], 0, "Height in hands is taken at the withers, not at the ears."),
      ],
    },
    "w-gaits": {
      1: [
        week4Multi("A gallop, compared with a canter, is…", ["faster, and it becomes four beats", "slower than the walk", "a two-beat trot"], 0, "Walk is four beats and slower. Gallop is four beats and fast. Canter is three beats."),
        week4Multi("You can hear a trot as…", ["two beats", "one long note", "a car horn"], 0, "Diagonal pairs of legs give the trot its two beats."),
      ],
      2: [
        week4Multi("Canter is a…", ["three-beat gait", "four-beat walk", "jump"], 0, "Canter has three beats, then a moment of suspension. It is not the trot."),
      ],
      3: [
        week4Multi("A pace is…", ["a two-beat gait where the legs on the same side move together", "the same as walk", "a flag"], 0, "Pace is not trot. Trot is diagonal pairs. Pace is lateral pairs. Some breeds are known for it."),
      ],
    },
    "w-famous": {
      1: [
        week4Multi("The Grand National is run at…", ["Aintree", "a go-kart circuit", "Silverstone, as a Formula 1 race"], 0, "Aintree, near Liverpool. It is a horse race over fences, not a motor race."),
        week4Multi("Red Rum's three Grand National wins were in…", ["1973, 1974 and 1977", "one single year", "a novel only"], 0, "Three wins: 1973, 1974 and 1977. That history does not change."),
      ],
      2: [
        week4Multi("Dressage, as a sport, is marked on…", ["training and obedience", "who finishes the fences first", "the loudest horse"], 0, "Dressage is a test of schooling. It is not a race."),
      ],
      3: [
        week4Multi("Showjumping faults are given for…", ["knocking a pole, or refusing", "a quiet circle", "standing still in the stable"], 0, "A pole down or a refusal costs faults. The round with fewer faults, in the time, wins."),
      ],
    },
    "w-rules": {
      1: [
        week4Multi("A lead rope wrapped around your hand can…", ["trap your fingers if the horse pulls", "make you safer", "be the correct hold"], 0, "Fold the rope. Do not wrap it. You have to be able to let go."),
        week4Multi("You tie a horse…", ["with a quick-release knot, to a ring that is meant for it", "to a gate that can be pulled over", "by the reins to a car"], 0, "A proper ring and a knot you can undo. Reins are not a lead rope."),
      ],
      2: [
        week4Multi("In the show ring, the steward's instruction is…", ["part of the rules for that class", "optional if you are winning", "a joke"], 0, "Stewards keep the class safe and fair. You do what they ask."),
      ],
      3: [
        week4Multi("A hat that has had a hard knock is…", ["replaced, not just painted", "fine forever", "a good spare for a friend"], 0, "A hat protects once. After a serious impact it can be damaged inside. Replace it."),
      ],
    },
    "w-move": {
      1: [
        week4Multi("The near side of a horse is…", ["the left side, where you usually lead", "the tail", "under the belly"], 0, "In Britain you lead and mount from the near side unless you are shown otherwise."),
        week4Multi("You do not stand…", ["directly behind the hind legs", "at the shoulder", "where the horse can see you"], 0, "A horse that cannot see you behind them may kick. The shoulder is the place to be."),
      ],
      2: [
        week4Multi("A horse that swings its hindquarters away from you is…", ["making space, which you respect", "inviting a hug around the back legs", "asking to be chased"], 0, "Give them the space they asked for. Tell an adult if you are unsure."),
      ],
      3: [
        week4Multi("Flight, fight or freeze. A scared horse may…", ["run, kick or go still", "read a rule book", "always walk calmly towards a surprise"], 0, "Those are prey-animal reactions. Quiet handling gives them less to fear."),
      ],
    },
    "w-sums": {
      1: [
        week4Typed("How many inches are in 2 hands?", "8", "A hand is 4 inches. Two hands are 8 inches."),
        week4Multi("15 hands, with no extra inches, is…", ["60 inches", "15 inches", "14.2 inches"], 0, "15 × 4 = 60 inches. 14.2 would be 14 hands and 2 extra inches."),
      ],
      2: [
        week4Typed("What is 13 × 4?", "52", "13 hands, with no extra inches, is 52 inches."),
      ],
      3: [
        week4Typed("What is 52 + 1?", "53", "13.1 hands is 13 hands plus 1 inch. 52 + 1 = 53 inches."),
      ],
    },
  },
};

const WEEK4_KART = {
  safety: {
    1: [
      week4Row("Sandals on a karting day are…", ["the wrong shoes. Wear the closed shoes you were told", "faster", "a type of helmet"], 0, "Toes need a proper shoe. Sandals are not kit.", 2),
      week4Row("You touch the engine after a session…", ["only when a grown-up says it is cool", "at once, to see how hot it is", "with the visor up as a glove"], 0, "A kart engine stays hot. Burns are not a lesson. Wait.", 3),
    ],
    2: [
      week4Row("Fuel for the kart is…", ["a grown-up's job", "something you pour because you are curious", "the same as a water bottle"], 0, "Fuel is dangerous and the amount is set by the people who run the kart. Hands off.", 3),
    ],
    3: [
      week4Row("You stall and stop on the racing line. You…", ["keep your hands where the briefing said, and wait", "climb out and push across the track", "wave your helmet at the karts behind"], 0, "Other karts are coming. Stay protected until a marshal tells you the next move.", 4),
    ],
  },
  kit: {
    1: [
      week4Row("The visor is clean before you leave the pit because…", ["you need to see the corner", "a dirty visor is faster", "marshals prefer a fog"], 0, "If you cannot see, you cannot drive. Clean it, or ask for help, before you roll.", 2),
      week4Row("A helmet that wobbles when you shake your head is…", ["the wrong size. Say so", "a good fit", "meant to come off in a corner"], 0, "A helmet should sit snug and stay done up. A wobble is a stop.", 3),
    ],
    2: [
      week4Row("You do the chin strap up…", ["before the kart moves", "on the second lap", "after the chequered flag"], 0, "The strap is what keeps the helmet on. It is not a decoration for later.", 3),
    ],
    3: [
      week4Row("A rib protector that is too small and rides up is…", ["shown to the marshal, not 'good enough'", "faster", "a substitute for a helmet"], 0, "Kit has to cover the bit it is meant to cover. The wrong size is changed.", 4),
    ],
  },
  kart: {
    1: [
      week4Row("Most rental karts do not have…", ["a reverse gear", "a brake", "a steering wheel"], 0, "You learn the pedals you were shown. Do not hunt for a reverse that is not there.", 2),
      week4Row("The kill switch is…", ["how you stop the engine when you are told to", "a volume knob", "the same as a blue flag"], 0, "Know where it is before you move. It is the engine's off switch.", 3),
    ],
    2: [
      week4Row("A kart with a flat tyre is…", ["parked and shown to a marshal", "driven anyway, because flat is a racing style", "pumped up by guessing"], 0, "A flat tyre will not steer properly. It is a fault, not a challenge.", 3),
    ],
    3: [
      week4Row("You notice a loose wheel nut in the paddock. You…", ["tell a mechanic at once and do not drive", "tighten it with your fingers and hope", "ignore it until the last lap"], 0, "Wheels stay on because someone qualified checked them. A loose nut is a stop.", 4),
    ],
  },
  pedals: {
    1: [
      week4Row("The pedal that stops you is…", ["the one the marshal pointed out as the brake", "whichever your foot finds", "always the one on the bumper"], 0, "Karts are not all the same. Learn the brake you were shown before you roll.", 2),
      week4Row("You look at the corner, then your feet…", ["do one job at a time", "press both pedals as a habit", "leave the kart"], 0, "Brake, or throttle, not a muddle of both. The marshal's pedals are the ones that count.", 3),
    ],
    2: [
      week4Row("Coasting into a slow corner, off the throttle, is…", ["a calm way to arrive if you started slowing early", "against the laws of the track", "the same as stamping the brake at the apex"], 0, "Early and smooth beats a late stamp. You still brake when the corner needs it.", 3),
    ],
    3: [
      week4Row("Trail braking, for a beginner, is…", ["not the first habit. Slow, then turn", "the thing you try on lap one", "done with your eyes shut"], 0, "Braking in a straight line comes first. Fancy overlaps wait until a coach teaches them.", 4),
    ],
  },
  marshal: {
    1: [
      week4Row("A marshal points you into the pit. You…", ["go where the hand says", "wave and stay out", "stop on the racing line to ask why"], 0, "The hand is the instruction. Questions can wait until you are in a safe place.", 2),
      week4Row("You do not know a signal. You…", ["slow and do the safe thing you were taught, then ask", "invent a meaning", "speed up to get past it"], 0, "Unknown means careful. The briefing is where you learn it, and a marshal can explain after.", 3),
    ],
    2: [
      week4Row("In the paddock a marshal is walking backwards with a kart. You…", ["stop and let them see you", "squeeze past on the blind side", "sit on their kart"], 0, "People pushing karts cannot see behind them. You wait.", 3),
    ],
    3: [
      week4Row("A black and white flag, if your club uses one, is often…", ["a warning about your driving", "the chequered flag", "a signal to start"], 0, "Clubs differ. If you are shown one, you find out what you did. You do not argue from the seat.", 4),
    ],
  },
  flags: {
    1: [
      week4Row("You see yellow and the kart ahead is slow. You…", ["stay behind. Yellow is not a place to pass", "use it as an overtaking chance", "close your eyes"], 0, "Yellow means danger. The gap in front of you is not a present.", 2),
      week4Row("A chequered flag at the end of your session means…", ["that session is finished", "one more racing lap", "come to the cafe by crossing the grass"], 0, "Chequered is the end. You finish the lap as you were told, then come in.", 3),
    ],
    2: [
      week4Row("A red flag at a kart club means…", ["stop the session, the way the briefing said", "sprint for the line", "ignore it if you are leading"], 0, "Red is a stop for everyone. Your club's briefing says where you stop.", 3),
    ],
    3: [
      week4Row("Yellow is still out and you have already gone past the incident. You…", ["wait for the green, or the end of the yellow, before you race again", "pass the next kart to make up time", "assume yellow is over because you cannot see it"], 0, "The caution lasts until it is lifted. One clear corner does not cancel the flag.", 4),
    ],
  },
  driving: {
    1: [
      week4Row("Your hands on the wheel stay…", ["on the wheel, not waving at a friend", "in your pockets", "holding the brake and the wheel in one fist"], 0, "The wheel is how you steer. A wave can wait until you are out of the kart.", 2),
      week4Row("A slow kart ahead, and the track is clear to pass, under green. You…", ["pass only when you can see the space", "push them off", "follow forever even on a long straight"], 0, "A pass needs room. Green means the caution is not the reason to wait. Contact is still not a pass.", 3),
    ],
    2: [
      week4Row("You miss the apex. The calm fix is…", ["look where you want to go and be smooth for the exit", "saw at the wheel", "brake harder while you are already sliding"], 0, "One missed apex is not saved by a panic. Eyes up, hands quiet.", 3),
    ],
    3: [
      week4Row("Looking at the kart you want to pass, instead of the corner, often…", ["pulls you towards that kart", "steers you onto the perfect line", "is what the flags ask for"], 0, "You steer where you look. Look through the gap, not at their bumper.", 4),
    ],
  },
  corners: {
    1: [
      week4Row("A hairpin is a corner that…", ["turns back on itself, so you arrive slowly", "is a straight", "is taken flat on your first lap"], 0, "Tight corners need less speed. Learn it slowly, then tidy the exit.", 2),
      week4Row("The exit of the corner is where you…", ["unwind the steering and pick up speed", "turn in again", "close your eyes"], 0, "Once the kart is pointing down the straight, you can feed the power back in.", 3),
    ],
    2: [
      week4Row("A late apex can help because…", ["you have more room to drive out", "it means you never brake", "it is the grass"], 0, "Turning later can stop you running out of road on the exit. A coach shows you where.", 3),
    ],
    3: [
      week4Row("Two corners that lead into each other are set up by…", ["getting the exit of the first one right", "braking only in the second", "using the grass as a third lane"], 0, "A bad exit from the first corner ruins the second. The first exit is the setup.", 4),
    ],
  },
  pits: {
    1: [
      week4Row("Your helmet stays on until…", ["you are out of the kart and a marshal has said you can take it off", "you feel warm", "you cross the pit lane to a friend"], 0, "The helmet is kit until you are clear of karts. Ask if you are not sure.", 2),
      week4Row("You cross a live pit lane…", ["only where and when a marshal tells you", "whenever there is a gap you like", "running"], 0, "Pit lanes have karts. A person on foot uses the place they were shown.", 3),
    ],
    2: [
      week4Row("After a session you leave the kart…", ["as the marshal parked it", "sideways across the lane", "with a friend sitting on the side pod"], 0, "The parking spot is the safe spot. Do not rearrange it.", 3),
    ],
    3: [
      week4Row("A driver is released from the pits as you arrive. You…", ["wait. Their release is not your gap", "join beside them", "block the lane to talk"], 0, "One kart leaves at a time. You were not the one who was released.", 4),
    ],
  },
  racing: {
    1: [
      week4Row("A formation lap, if your club uses one, is for…", ["warming up and taking your grid slot", "winning the race", "overtaking as practice"], 0, "You learn the place you start from. The race has not started.", 2),
      week4Row("Jumping the start means…", ["you moved before the signal", "you did a perfect launch", "the lights were a suggestion"], 0, "Early is a penalty at many clubs. Wait for the signal you were taught.", 3),
    ],
    2: [
      week4Row("You are much slower than the kart behind and they are close. A fair habit is…", ["hold a line and let them through when it is safe", "weave so they cannot pass", "brake-test them"], 0, "Holding one line is fair. Weaving and brake-testing are not.", 3),
    ],
    3: [
      week4Row("A last-lap lunge that only works if they vanish is…", ["not a plan. Leave the space or stay behind", "always clever", "what a yellow flag is for"], 0, "If the pass needs them to disappear, it is not a pass. It is a crash waiting.", 4),
    ],
  },
  line: {
    1: [
      week4Row("The white lines at the edge of the track are…", ["the edge. Inside them is the track", "a shortcut", "optional if you are slow"], 0, "Stay on the tarmac you were given. Lines are not a new lane.", 2),
      week4Row("You drop a wheel off the edge. You…", ["lift and steer gently back when you can see a gap", "yank the wheel", "accelerate harder off the tarmac"], 0, "A gentle return beats a snap that throws you across the track.", 3),
    ],
    2: [
      week4Row("Defending by moving once, then staying there, is…", ["the fair version", "weaving", "the same as using the grass"], 0, "One move. Then the kart stays on that line. A second chop is how people hit each other.", 3),
    ],
    3: [
      week4Row("You rejoin from the grass behind a kart that is beside you. You…", ["wait until you are clearly behind, then come back", "turn up the track into their door", "assume they saw you"], 0, "They may not know you are there. Behind, then on. Never across their nose.", 4),
    ],
  },
  respect: {
    1: [
      week4Row("You spin and someone avoids you. Afterwards you…", ["can thank them in the paddock", "owe them a bump", "block them for the day"], 0, "They gave you room. That is the sport. A thank-you is enough.", 2),
      week4Row("A smaller driver is slower. You…", ["pass cleanly when there is room", "use them as a brake", "shout from the kart"], 0, "Size is not a reason to be rough. Room, then the pass.", 3),
    ],
    2: [
      week4Row("Protesting a result is done…", ["with the official, calmly, after the session", "by parking sideways in the next race", "online, with their name"], 0, "Officials have a process. Anger on track is a second problem.", 3),
    ],
    3: [
      week4Row("You win. The lap after the flag you…", ["slow down as you were told and come in", "keep racing the person in second", "do a celebration that crosses the racing line in front of others"], 0, "The flag ends the race. A celebration that causes a crash is not a celebration.", 4),
    ],
  },
  "k-brief": {
    1: [
      week4Row("The briefing says where you stop for a red flag. You…", ["remember that place", "guess a different place because it is shorter", "ask a friend during the race"], 0, "The stop place is part of the plan. If you missed it, you ask before you drive.", 2),
      week4Row("You think a rule has changed since last time. You…", ["listen. Today's briefing is the one that counts", "use last month's memory", "invent a mix of both"], 0, "Clubs update rules. The words you hear today are the rules for today.", 2),
    ],
  },
  "k-rain": {
    1: [
      week4Row("Painted lines and kerbs in the wet are often…", ["slippier than the plain tarmac", "the grippiest place", "a good place to brake hard"], 0, "Paint and kerbs can be like ice when they are wet. Ease off before them.", 2),
      week4Row("Your visor is covered in spray. You…", ["slow down until you can see", "tuck closer to the kart ahead", "open the visor at full speed"], 0, "Spray hides the corner. Space and a cleaner visor come before a brave lap.", 2),
    ],
  },
  "k-cheer": {
    1: [
      week4Row("A kart stops near the fence where you are standing. You…", ["stay behind the fence", "climb over to help push", "lean on the fence until it moves"], 0, "A stopped kart is still in a dangerous place. Marshals do the helping.", 2),
      week4Row("You want a photo of the start. You take it…", ["from the spectator place you were given", "from the grid", "by the pit exit"], 0, "Starts are busy. The spectator bank is the place for a camera.", 2),
    ],
  },
};

const WEEK4_INVEST = {
  compound: {
    1: [
      week4Row("A piggy bank on a shelf does not grow by itself because…", ["nobody is adding interest", "coins double every night by law", "time always multiplies money"], 0, "Interest is something an account might add. A jar at home just holds the coins.", 2),
      week4Row("£5 left alone for a month in a jar at home is still about…", ["£5", "£50", "nothing, because a month passed"], 0, "Without interest, the coins are the coins. Time alone is not a pay rise.", 3),
    ],
    2: [
      week4Row("Pretend £10 grows by £1 to £11. A next pretend 10% is worked out on…", ["£11", "£10 again, forever", "£1 only"], 0, "That is the snowball picture. The £1 and the 10% are pretend, not a promise.", 3),
    ],
    3: [
      week4Row("Someone who says they can double your money by Friday is…", ["not offering interest. That is a trap", "a bank", "a Junior ISA"], 0, "Real interest is slow and explained by an adult. A promise to double it is how scams start.", 4),
    ],
  },
  spend: {
    1: [
      week4Row("Money given for a school book is…", ["for the book", "spare for a game", "yours to hide"], 0, "It has a job. It is not the pot you practise saving with.", 2),
      week4Row("A want can wait. A need for today's lunch…", ["cannot", "is the same as a poster", "is optional"], 0, "Lunch is today. The poster can still be there tomorrow.", 3),
    ],
    2: [
      week4Row("£9.99 in your head is closest to…", ["£10", "£9 exactly with nothing more", "99p"], 0, "Shops like prices that look smaller. Round £9.99 up to £10.", 3),
    ],
    3: [
      week4Row("A 'buy now' button in a game is…", ["the shop talking. You can close it", "an order from home", "a school rule"], 0, "Buttons are not grown-ups. Fetch an adult before any payment.", 4),
    ],
  },
  twenty: {
    1: [
      week4Row("You have £5. You put 20% aside. How much is that?", ["£1", "£5", "20p"], 0, "20% of £5 is £1. The other £4 is still there to use.", 2),
      week4Row("Putting the £1 aside first means…", ["that pound is kept before the shop sees it", "the pound has to be spent today", "the shopping becomes free"], 0, "The slice you move first is the one that does not get eaten by the till.", 3),
    ],
    2: [
      week4Row("20% of £40 is…", ["£8", "£40", "£4"], 0, "A fifth of £40 is £8. This is a practice sum, not an order to save that much.", 3),
    ],
    3: [
      week4Row("20% of £35 is…", ["£7", "£35", "£3"], 0, "A fifth of £35 is £7. The other £28 is the rest of the pot in this sum.", 4),
    ],
  },
  time: {
    1: [
      week4Row("£2 a week for 4 weeks is £8 before any growth. The lesson is…", ["a small regular amount becomes a pile", "£2 becomes £8 overnight", "you must save £2"], 0, "The habit is the point. It is not an order for your family.", 2),
      week4Row("Looking in the jar every hour…", ["does not add coins", "is how interest is forced", "is required by the lesson"], 0, "Watching is not the same as leaving money alone, and a home jar does not pay you.", 3),
    ],
    2: [
      week4Row("A year of £1 most weeks is about £52 before growth. That sum uses…", ["52 weeks", "12 weeks", "365 weeks"], 0, "There are about 52 weeks in a year. This is practice, not a target.", 3),
    ],
    3: [
      week4Row("Ten years of a habit only helps if…", ["the money stays in, and any growth is real", "you empty it every Friday", "a headline tells you the rate"], 0, "Time does nothing to an empty jar. Growth on top is never guaranteed.", 4),
    ],
  },
  metals: {
    1: [
      week4Row("A silver coin you can hold…", ["is a real object, and the price can fall", "can only rise", "is the same as a sweet"], 0, "Silver is something you can own. Shops still change what they will pay for it.", 2),
      week4Row("Gold and silver prices…", ["do not move together in a perfect pair", "are fixed by a piggy bank", "are the same as interest in a jar"], 0, "They are different metals. One can have a bad year while you hold it.", 3),
    ],
    2: [
      week4Row("A coin shop's price to buy and their price to sell are…", ["not the same. The gap is their charge", "always identical", "a type of flag"], 0, "They buy from you for less than they sell for. That gap is a cost.", 3),
    ],
    3: [
      week4Row("Keeping every spare pound as one metal for ten years…", ["can still leave you with less than you paid", "is forced to rise", "is the same as a packed lunch"], 0, "A long wait is not a promise. The price in ten years is unknown.", 4),
    ],
  },
  bitcoin: {
    1: [
      week4Row("Internet money that jumps in price is a bad home for…", ["tomorrow's bus fare", "a story in a lesson", "a question"], 0, "A price that can fall overnight is a bad place for money you need tomorrow.", 2),
      week4Row("A stranger who asks you to send coins 'to unlock a prize' is…", ["running a trap. Send nothing and tell an adult", "a bank cashier", "your teacher"], 0, "Prizes that need you to pay first are how scams start.", 3),
    ],
    2: [
      week4Row("A password written in a game chat is…", ["no longer a secret", "safer, because friends can help", "the same as your first name"], 0, "A chat can be copied. A password stays with you and a parent.", 3),
    ],
    3: [
      week4Row("An app that looks like a bank is checked by…", ["an adult, before any money moves", "the logo alone", "a countdown on the screen"], 0, "Logos can be copied. A grown-up checks the real address and the account.", 4),
    ],
  },
  etf: {
    1: [
      week4Row("A basket of many shops, rather than one, means…", ["one closed shop is not the whole story", "you cannot lose money", "it is a single sweet"], 0, "Spreading out is calmer. The whole basket can still fall. It is not a promise.", 2),
      week4Row("An ETF, in kid words, follows…", ["a long list of companies", "one friend's tip", "a flag"], 0, "You own a tiny slice of many firms, not one hero shop.", 3),
    ],
    2: [
      week4Row("A fund that went up last year…", ["might go down this year", "must repeat the rise", "has signed a contract with you"], 0, "Last year is a story about before. It is not a promise.", 3),
    ],
    3: [
      week4Row("A cheap tracker and an expensive fund that own a similar list…", ["differ by the charge, which you can notice", "are identical in every way", "are both guaranteed"], 0, "You cannot control the market. You can notice what is taken out each year. A parent decides.", 4),
    ],
  },
  stocks: {
    1: [
      week4Row("One company can have a brilliant year and the next year…", ["be worth less", "be forced to repeat it", "become a coin in your jar"], 0, "A share is a slice of that firm. The firm can do badly. It is not a promise.", 2),
      week4Row("Owning a slice of the shop you like is still…", ["one shop. It can fail", "the same as a basket of hundreds", "your lunch"], 0, "Liking a shop is not the same as spreading the risk.", 3),
    ],
    2: [
      week4Row("Money for a birthday present next week should…", ["stay out of a single share", "go into the jumpiest share", "be lent to a stranger"], 0, "Soon-money wants to stay spendable. A parent decides about anything else.", 3),
    ],
    3: [
      week4Row("A company that stops trading can leave its shares…", ["worth little or nothing", "redrawn at home as a new coin", "turned into pocket money by law"], 0, "One firm can fail. A wide mix is calmer than that one name.", 4),
    ],
  },
  risk: {
    1: [
      week4Row("Money you need for a school trip next month is…", ["soon-money. A jumpy price is a bad place for it", "the same as money for ten years' time", "required to be invested"], 0, "Soon-money stays where an adult can still spend it.", 2),
      week4Row("A bigger possible fall means…", ["more risk, even if the rise looks exciting", "a guaranteed prize", "no need to tell an adult"], 0, "Risk is the size of the wobble. Excitement is not a promise.", 3),
    ],
    2: [
      week4Row("Two pots, one for a holiday next summer and one for when you are grown…", ["are different jobs", "must both sit in the jumpiest thing", "are both safe in a link from a chat"], 0, "The holiday is soon. The grown-up pot can wait. A parent chooses.", 3),
    ],
    3: [
      week4Row("Borrowing money to buy something that can fall is…", ["a way to lose more than you started with", "how jars pay interest", "required"], 0, "If it falls, you still owe the borrowed pounds. That is a bigger hole.", 4),
    ],
  },
  mix: {
    1: [
      week4Row("A mix is calmer than one basket because…", ["a fall in one part is not a fall in every part", "mixes cannot fall", "it removes fees"], 0, "Spreading helps. It does not delete risk. It is not advice to buy.", 2),
      week4Row("Copying whatever rose yesterday is…", ["chasing, not a mix", "the 20% rule", "a packed lunch"], 0, "A mix is a plan. Yesterday's winner is a story.", 3),
    ],
    2: [
      week4Row("If one part of a mix grows until it is almost everything…", ["you are nearly back to one basket", "the risk has gone", "you must add more of it"], 0, "The calm came from having more than one home. A parent decides if anything is tidied.", 3),
    ],
    3: [
      week4Row("A written mix, looked at a few times a year, is…", ["calmer than changing it every day", "a way to force a profit", "illegal"], 0, "Constant tinkering adds fuss and sometimes charges. A parent decides the real plan.", 4),
    ],
  },
  fees: {
    1: [
      week4Row("A charge taken every year is…", ["rent for staying, so less remains", "free interest", "a racing flag"], 0, "Fees leave the pot. They are not interest added.", 2),
      week4Row("0 pounds of growth and a fee taken out means the pot…", ["gets smaller", "stays the same", "must double"], 0, "If nothing is added and a charge leaves, there is less than you started with.", 3),
    ],
    2: [
      week4Row("2% taken every year is a bigger slice than 0.2% because…", ["2 pounds in every 100 is more than 20 pence", "percentages are decorations", "the bigger fee is always kinder"], 0, "You can compare the charge even when you cannot control the market.", 3),
    ],
    3: [
      week4Row("A fee to buy, a fee to sell, and a fee every year…", ["can all leave the pot", "cancel out and become interest", "only matter for adults who like maths"], 0, "Each one is a cost. Together they are a pile over a long time. A parent notices them.", 4),
    ],
  },
  patience: {
    1: [
      week4Row("A plan written on a calm Sunday is for…", ["the noisy week as well", "throwing away at the first headline", "changing before breakfast"], 0, "You write it while you are calm so a wobble does not write it for you.", 2),
      week4Row("These lessons are…", ["learning. A parent decides about real money", "an order to buy a fund", "a promise of a rate"], 0, "Nothing here is personal advice. The idea is the lesson.", 3),
    ],
    2: [
      week4Row("A Junior ISA, as an idea some families use, can be…", ["locked until 18 so it is harder to raid", "a rule that the pot cannot fall", "a shop voucher"], 0, "The lock is the point some families like. It is not a promise the pot only grows.", 3),
    ],
    3: [
      week4Row("Selling in a panic, when the plan was for years…", ["lets the noisy week make the decision", "is always required by this lesson", "removes every fee"], 0, "The calm plan was for this feeling. Changing it in a fright can lock in a fall.", 4),
    ],
  },
  "i-need": {
    1: [
      week4Row("Shoes that fit and a fourth soft toy are…", ["a need and a want", "both needs", "both against the rules"], 0, "Shoes that fit are a need. Another toy can wait.", 2),
      week4Row("The money for the school trip stays…", ["with the trip", "in a game", "in a stranger's link"], 0, "It has a job. It is not the pot these lessons talk about.", 2),
    ],
  },
  "i-wait": {
    1: [
      week4Row("Which clue is better than a countdown on an advert?", ["You still want the toy the next day", "The timer says only today", "A stranger says to buy it now"], 0, "Still wanting it after a night is a fair test. A countdown is pressure.", 2),
      week4Row("A timer that says 'only today' is…", ["the shop hurrying you", "proof the toy will vanish from the world", "a bank"], 0, "Hurry is a selling trick. You can still wait and ask.", 2),
    ],
  },
  "i-ask": {
    1: [
      week4Row("A site asks for a grown-up's card. You…", ["do not type it. You fetch the grown-up", "type it to be helpful", "read it to a friend"], 0, "The card is not yours to use. An adult decides.", 2),
      week4Row("A text with a code from the bank is…", ["read to nobody except the parent who is holding the phone with you", "fine in a game chat", "a high score"], 0, "A code is a key. A real bank will not ask a child to pass it to a stranger.", 2),
    ],
  },
};

function installWeek4() {
  if (installWeek4.done) return;
  installWeek4.done = true;

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
    Object.keys(WEEK4_KART).forEach((skill) => {
      if (!GEORGE_KART_BANK[skill]) return;
      Object.keys(WEEK4_KART[skill]).forEach((stage) => {
        pushRows(GEORGE_KART_BANK, skill, Number(stage), WEEK4_KART[skill][stage]);
      });
    });
  }
  if (typeof GEORGE_INVEST_BANK !== "undefined") {
    Object.keys(WEEK4_INVEST).forEach((skill) => {
      if (!GEORGE_INVEST_BANK[skill]) return;
      Object.keys(WEEK4_INVEST[skill]).forEach((stage) => {
        pushRows(GEORGE_INVEST_BANK, skill, Number(stage), WEEK4_INVEST[skill][stage]);
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
      if (q && q.week === 4 && typeof q.ramp !== "number") q.ramp = ramp;
      mod.practice.push(q);
      have.add(key);
    });
  }

  Object.keys(WEEK4_CORE).forEach((subject) => {
    Object.keys(WEEK4_CORE[subject]).forEach((skill) => {
      Object.keys(WEEK4_CORE[subject][skill]).forEach((stage) => {
        pushModuleQuestions(subject, skill, stage, WEEK4_CORE[subject][skill][stage]);
      });
    });
  });

  ["k-brief", "k-rain", "k-cheer"].forEach((skill) => {
    const pack = WEEK4_KART[skill] && WEEK4_KART[skill][1];
    if (!pack) return;
    pushModuleQuestions(
      "karting",
      skill,
      1,
      pack.map((row) => week4Multi(row[0], row[1], row[2], row[3]))
    );
  });
  ["i-need", "i-wait", "i-ask"].forEach((skill) => {
    const pack = WEEK4_INVEST[skill] && WEEK4_INVEST[skill][1];
    if (!pack) return;
    pushModuleQuestions(
      "investing",
      skill,
      1,
      pack.map((row) => week4Multi(row[0], row[1], row[2], row[3]))
    );
  });
}

installWeek4();
