/**
 * Week of 28 November 2026 — fresh questions.
 * First steps stays easy and long. Intermediate is one step up.
 * Secure is still primary school: no letters standing for numbers,
 * and no secondary-school science.
 * Nothing here repeats a question the children already have.
 * Saved ticks, stars and badges are left alone.
 */
function week6Multi(q, options, answer, explain, passage) {
  const item = {
    q: q,
    type: "multi",
    options: options,
    answer: answer,
    explain: explain,
    stage: "both",
    week: 6,
  };
  if (passage) item.passage = passage;
  return item;
}

function week6Typed(q, answer, explain) {
  return {
    q: q,
    type: "typed",
    answer: String(answer),
    explain: explain,
    stage: "both",
    week: 6,
  };
}

function week6Row(q, options, answer, explain, diff) {
  return [q, options, answer, explain, diff || 2, 6];
}

const WEEK6_CORE = {
  maths: {
    number: {
      1: [
        week6Typed("What number comes after 58?", "59", "Count on one step: 58, then 59."),
        week6Multi("Of 23, 32, 3 and 30, which count is the greatest?", ["23", "32", "3", "30"], 1, "32 is greater than 30, 23 and 3."),
      ],
      2: [
        week6Typed("What is 100 less than 910?", "810", "Taking away 100 changes the hundreds digit: 910 − 100 = 810."),
      ],
      3: [
        week6Typed("What number is 4000 + 200 + 50 + 7?", "4257", "4 thousands, 2 hundreds, 5 tens and 7 ones make 4257."),
      ],
    },
    operations: {
      1: [
        week6Typed("What is 19 − 8?", "11", "Start at 19 and count back 8. You land on 11."),
        week6Typed("What is 3 × 7?", "21", "Three groups of 7 make 21. Count 7, 14, 21."),
      ],
      2: [
        week6Typed("What is 42 ÷ 6?", "7", "Six sevens are 42, so 42 ÷ 6 = 7."),
      ],
      3: [
        week6Typed("What is 6 × 9?", "54", "Six nines are 54. You can add 9 six times if you prefer."),
      ],
    },
    fractions: {
      1: [
        week6Typed("What is half of 36?", "18", "Half means two equal parts. 36 ÷ 2 = 18."),
        week6Typed("What is a quarter of 32?", "8", "A quarter is 4 equal parts. 32 ÷ 4 = 8."),
      ],
      2: [
        week6Typed("What is 1/4 of 24?", "6", "One quarter means divide by 4. 24 ÷ 4 = 6."),
      ],
      3: [
        week6Typed("What is 1/10 of 70?", "7", "One tenth means divide by 10. 70 ÷ 10 = 7."),
      ],
    },
    algebra: {
      1: [
        week6Typed("How many more do you need if you have 3 and you want 10?", "7", "3 and 7 more make 10. Count on if you want to."),
        week6Typed("How many more do you need if you have 6 and you want 10?", "4", "6 and 4 more make 10. No letter is needed."),
      ],
      2: [
        week6Typed("What is 3 × 9?", "27", "Three groups of 9 make 27. Count 9, 18, 27."),
      ],
      3: [
        week6Typed("Count in tens: 40, 50, 60, 70. What comes next?", "80", "The pattern adds 10 each time. 70 and 10 more is 80."),
      ],
    },
    geometry: {
      1: [
        week6Typed("Count the corners on a triangle.", "3", "A triangle has 3 corners. Touch each one as you count."),
        week6Multi("Which of these shapes is completely round?", ["A square", "A circle", "A rectangle"], 1, "A circle is completely round. A square and a rectangle have corners."),
      ],
      2: [
        week6Typed("A rectangle is 5 cm long and 3 cm wide. What is the perimeter in cm?", "16", "Go all the way round: 5 + 3 + 5 + 3 = 16 cm."),
      ],
      3: [
        week6Typed("A square has sides of 6 cm. What is the area in square centimetres?", "36", "Area of this square is side times side. 6 × 6 = 36."),
      ],
    },
    data: {
      1: [
        week6Multi("Three full tally gates, with no extra marks, count as…", ["3", "15", "10"], 1, "Each gate is 5. Three gates are 15."),
        week6Typed("There are 6 blue pens and 5 yellow pens. How many pens altogether?", "11", "6 and 5 more is 11 pens."),
      ],
      2: [
        week6Typed("The numbers are 2, 15 and 6. What is the range?", "13", "Range is biggest minus smallest. 15 − 2 = 13."),
      ],
      3: [
        week6Typed("The numbers are 7, 2, 7, 9 and 7. What is the mode?", "7", "7 appears three times. The others appear once, so 7 is the mode."),
      ],
    },
    "y-place": {
      1: [
        week6Typed("In 63, how many tens are there?", "6", "The 6 is in the tens place, so there are 6 tens."),
        week6Typed("What number is 5 tens and 2 ones?", "52", "5 tens is 50, and 2 more is 52."),
      ],
      2: [
        week6Typed("What number is 400 + 70 + 5?", "475", "4 hundreds, 7 tens and 5 ones make 475."),
      ],
      3: [
        week6Typed("In 3600, what is the thousands digit?", "3", "3600 is 3 thousands and 6 hundreds. The thousands digit is 3."),
      ],
    },
    "y-bonds": {
      1: [
        week6Typed("What do you add to 9 to make 20?", "11", "9 and 11 make 20. Count on from 9 if you want to."),
        week6Multi("Which of these pairs makes 20?", ["13 and 7", "13 and 6", "12 and 7"], 0, "13 and 7 make 20. 13 and 6 make 19. 12 and 7 make 19."),
      ],
      2: [
        week6Typed("What do you add to 35 to make 100?", "65", "35 and 65 make 100. Count on from 35 if that helps."),
      ],
      3: [
        week6Typed("What do you add to 175 to make 1000?", "825", "175 and 825 make 1000. Count on from 175 if you want to."),
      ],
    },
    "y-add": {
      1: [
        week6Typed("What is 7 + 6?", "13", "7 and 6 more is 13. You can count on from 7."),
        week6Typed("What is 8 + 9?", "17", "8 and 2 make 10, and 7 more is 17."),
      ],
      2: [
        week6Typed("What is 53 + 20?", "73", "53 and 2 tens is 73."),
      ],
      3: [
        week6Typed("What is 257 + 20?", "277", "The tens go from 5 to 7. 257 + 20 = 277."),
      ],
    },
    "y-sub": {
      1: [
        week6Typed("What is 13 − 5?", "8", "Count back 5 from 13. You land on 8."),
        week6Typed("What is 17 − 9?", "8", "17 take away 9 is 8."),
      ],
      2: [
        week6Typed("What is 60 − 20?", "40", "6 tens take away 2 tens is 4 tens, which is 40."),
      ],
      3: [
        week6Typed("What is 4000 − 800?", "3200", "40 hundreds take away 8 hundreds is 32 hundreds, which is 3200."),
      ],
    },
    "y-count": {
      1: [
        week6Typed("Four groups of 3. How many is that?", "12", "Four groups of 3 make 12. Count 3, 6, 9, 12."),
        week6Multi("Which of these can be split into pairs with none left over?", ["11", "14", "17"], 1, "14 splits into pairs. 11 and 17 each leave one over."),
      ],
      2: [
        week6Typed("What is 9 × 3?", "27", "Nine threes are 27. Count on in threes if you want to."),
      ],
      3: [
        week6Typed("What is 13 × 2?", "26", "13 and 13 is 26. Two groups of 13."),
      ],
    },
    "y-share": {
      1: [
        week6Typed("12 carrots shared between 4 ponies. How many each?", "3", "4 equal groups in 12 is 3 each. 12 ÷ 4 = 3."),
        week6Typed("16 shared into 2 equal groups. How many in each?", "8", "Sixteen shared into 2 equal groups is 8 each. 16 ÷ 2 = 8."),
      ],
      2: [
        week6Typed("What is 40 ÷ 8?", "5", "Eight fives are 40, so 40 ÷ 8 = 5."),
      ],
      3: [
        week6Typed("What is 63 ÷ 7?", "9", "Seven nines are 63, so 63 ÷ 7 = 9."),
      ],
    },
    "y-money": {
      1: [
        week6Typed("How many pence are in £6?", "600", "£1 is 100 pence, so £6 is 600 pence."),
        week6Multi("50p and 10p together make…", ["60p", "40p", "£60"], 0, "50 and 10 more is 60 pence. That is not £60."),
      ],
      2: [
        week6Typed("You pay 25p with £1. How many pence change?", "75", "100 pence take away 25 pence is 75 pence."),
      ],
      3: [
        week6Typed("What is half of £18?", "9", "Half of 18 pounds is 9 pounds. This is a practice sum."),
      ],
    },
    "y-time": {
      1: [
        week6Multi("Quarter to 4 is…", ["4:15", "3:45", "4:45"], 1, "Quarter to means 15 minutes before the hour, so 3:45."),
        week6Typed("How many minutes are in 3 hours?", "180", "One hour is 60 minutes, so 3 hours is 180 minutes."),
      ],
      2: [
        week6Typed("How many minutes are in three quarters of an hour?", "45", "An hour is 60 minutes. Three quarters of that is 45 minutes."),
      ],
      3: [
        week6Typed("A riding lesson starts at 11:20 and ends at 11:55. How many minutes is that?", "35", "From 11:20 to 11:55 is 35 minutes."),
      ],
    },
    "y-measure": {
      1: [
        week6Typed("How many centimetres are in 4 metres?", "400", "One metre is 100 centimetres, so 4 metres is 400 centimetres."),
        week6Multi("Which bag is heavier, if the labels are honest?", ["300 grams of carrots", "3 kilograms of hay", "They weigh the same"], 1, "3 kilograms is 3000 grams, which is much more than 300 grams."),
      ],
      2: [
        week6Typed("How many millilitres are in 2 litres?", "2000", "One litre is 1000 millilitres, so 2 litres is 2000 millilitres."),
      ],
      3: [
        week6Typed("A rectangle is 6 cm long and 5 cm wide. What is the area in square centimetres?", "30", "Area here is length times width. 6 × 5 = 30."),
      ],
    },
    "y-shape2": {
      1: [
        week6Multi("Which shape has 6 sides?", ["A hexagon", "A triangle", "A circle"], 0, "A hexagon has 6 sides. A triangle has 3. A circle has none."),
        week6Typed("Count the sides on a hexagon.", "6", "A hexagon has 6 sides. You can count them around the shape."),
      ],
      2: [
        week6Typed("A triangle has sides of 5 cm, 5 cm and 5 cm. What is the perimeter in cm?", "15", "Add every side. 5 + 5 + 5 = 15 cm."),
      ],
      3: [
        week6Multi("Which name belongs to an angle smaller than a square corner?", ["Acute", "A tally mark", "A litre"], 0, "A square corner is a right angle. A smaller opening is called acute."),
      ],
    },
  },
  english: {
    grammar: {
      1: [
        week6Multi("Which word is the verb in 'Bella grooms the pony'?", ["Bella", "grooms", "pony"], 1, "Grooms is the doing word. That is the verb."),
        week6Multi("Which line is ready to stand as a sentence?", ["The gate clicked.", "Clicked shut", "Gate"], 0, "It starts with a capital, ends with a full stop, and can stand on its own."),
      ],
      2: [
        week6Multi("Which sentence has the verb that matches karts?", ["The karts was lined up.", "The karts were lined up.", "The karts is lined up."], 1, "Karts is plural, so the verb is were, not was."),
      ],
      3: [
        week6Multi("Which word is the adjective in 'the chilly yard'?", ["chilly", "the", "yard"], 0, "Chilly describes the yard. A describing word is an adjective."),
      ],
    },
    punctuation: {
      1: [
        week6Multi("Which of these lines asks a question?", ["Where is the hoof pick?", "The hoof pick is on the hook.", "Hoof pick on the hook"], 0, "A question asks something and ends with a question mark."),
        week6Multi("Which spelling of friend is the real word?", ["friend", "freind", "frend"], 0, "Friend has the letters f-r-i-e-n-d. I before e in this word."),
      ],
      2: [
        week6Multi(
          "Which line separates the kit with commas?",
          ["He packed a helmet, gloves and boots.", "He packed a helmet gloves and boots.", "He packed, a helmet gloves and boots"],
          0,
          "Commas separate the items. The last pair can use and."
        ),
      ],
      3: [
        week6Multi(
          "Which sentence shows that the brush belongs to one pony?",
          ["The pony's brush is muddy.", "The ponies brush is muddy.", "The pony brush is muddy?"],
          0,
          "The brush belongs to the pony, so pony's takes an apostrophe."
        ),
      ],
    },
    vocabulary: {
      1: [
        week6Multi("What does miniature mean?", ["Very small", "Very loud", "Very late"], 0, "Miniature means very small, like a miniature pony beside a full-size horse."),
        week6Multi("Which word means the opposite of empty?", ["Full", "Hollow", "Bare"], 0, "Full is the opposite of empty. Hollow and bare are still empty words."),
      ],
      2: [
        week6Multi("Which word means the same as quick?", ["Fast", "Slow", "Heavy"], 0, "Fast and quick mean almost the same thing. They are synonyms."),
      ],
      3: [
        week6Multi("In 'the lane was gloomy', gloomy means…", ["dark and dull", "a type of hoof", "a capital letter"], 0, "Here gloomy means dark and dull. Read the word in the sentence."),
      ],
    },
    reading: {
      1: [
        week6Multi(
          "What did the pony eat?",
          ["Hay", "A riding hat", "A newspaper"],
          0,
          "The passage says the pony ate hay. That is the fact to find.",
          "The bay pony stood in the stable and ate hay."
        ),
        week6Multi(
          "Who fastened the chin strap?",
          ["The marshal", "The pony", "The piggy bank"],
          0,
          "The passage says the marshal fastened the chin strap.",
          "Before the kart rolled, the marshal fastened George's chin strap."
        ),
      ],
      2: [
        week6Multi(
          "Why did George slow the kart?",
          ["A yellow flag was out", "He wanted a new name", "The flag was a noun"],
          0,
          "The sentence gives the reason: a yellow flag was out.",
          "A yellow flag was out, so George slowed the kart and stayed in line."
        ),
      ],
      3: [
        week6Multi(
          "What can you tell from the empty bucket, even though nobody says it?",
          ["The pony still needs water", "The bucket can drive a kart", "The trough is a verb"],
          0,
          "An empty bucket means the drink has not been given. That is a simple inference.",
          "Bella looked into the stable bucket. It was empty."
        ),
      ],
    },
    writing: {
      1: [
        week6Multi("Which line can stand alone as a sentence about a helmet?", ["The helmet fitted.", "Fitted on the grid", "Helmet"], 0, "It can stand on its own. It has a what and a doing word."),
        week6Multi(
          "Which opening is written correctly for the start of a sentence?",
          ["Before dusk I filled the trough.", "before dusk I filled the trough.", "before dusk"],
          0,
          "A sentence starts with a capital letter, including the first word."
        ),
      ],
      2: [
        week6Multi(
          "Which sentence tells you why the rug went on?",
          ["Bella put the rug on because the evening was cold.", "Bella put the rug on.", "Rug cold"],
          0,
          "Because tells the reader the reason."
        ),
      ],
      3: [
        week6Multi(
          "Which is the best topic sentence for a paragraph about skipping out?",
          ["Skipping out means taking the droppings out of the bed.", "Anyway.", "Fork"],
          0,
          "A topic sentence says what the whole paragraph is about."
        ),
      ],
    },
    "y-caps": {
      1: [
        week6Multi(
          "Which line is a finished statement?",
          ["the trough froze", "The trough froze.", "The trough froze"],
          1,
          "A statement starts with a capital letter and ends with a full stop."
        ),
        week6Multi("Which race name is written the right way?", ["the grand national", "The Grand National", "race"], 1, "The Grand National is a name, so the main words start with capitals."),
      ],
      2: [
        week6Multi("Which line writes the word I as a capital?", ["Then I shut the stable.", "Then i shut the stable.", "shut the stable i"], 0, "The word I is always a capital, even when it is not the first word."),
      ],
      3: [
        week6Multi(
          "Which line uses capitals for the months, not for ordinary words?",
          ["In November and December the yard is dark early.", "In november and december The Yard is dark.", "in November And december the yard is dark"],
          0,
          "Months take a capital. Ordinary words in the middle do not."
        ),
      ],
    },
    "y-nouns": {
      1: [
        week6Multi("Which word is a noun in 'The saddle is heavy'?", ["saddle", "is", "heavy"], 0, "Saddle is a thing you can name. That is the noun."),
        week6Multi("Which of these is a noun?", ["Bucket", "Quickly", "And"], 0, "A bucket is a thing. Quickly tells how. And joins words."),
      ],
      2: [
        week6Multi("Which word is the proper noun?", ["george", "George", "driver"], 1, "George is a person's name, so it is a proper noun and takes a capital."),
      ],
      3: [
        week6Multi(
          "Which sentence has a collective noun?",
          ["The team waited in the garage.", "Waited quietly.", "Quickly"],
          0,
          "Team names a group of people. A word for a group is a collective noun."
        ),
      ],
    },
    "y-verbs": {
      1: [
        week6Multi("Which word is the verb in 'The pony drinks'?", ["pony", "drinks", "The"], 1, "Drinks is the doing word. That is the verb."),
        week6Multi("Which of these is a verb?", ["Trot", "Hay", "Stable"], 0, "Trot is something you or the horse can do. Hay and stable are things."),
      ],
      2: [
        week6Multi("Which sentence uses the past tense?", ["Bella filled the bucket.", "Bella fills the bucket.", "Bella filling"], 0, "Filled tells us the job is already done. That is the past tense."),
      ],
      3: [
        week6Multi(
          "Which sentence uses a powerful verb instead of a weak one?",
          ["The kart skidded on the wet line.", "The kart went on the wet line.", "Kart wet"],
          0,
          "Skidded shows the reader what happened. Went is weaker."
        ),
      ],
    },
    "y-adj": {
      1: [
        week6Multi("Which word describes the pony in 'a calm pony'?", ["calm", "a", "pony"], 0, "Calm describes the pony. A describing word is an adjective."),
        week6Multi("Which of these is an adjective?", ["Soft", "Bucket", "Run"], 0, "Soft describes something. Bucket is a thing. Run is a doing word."),
      ],
      2: [
        week6Multi("Which word tells you how big the rug is?", ["A tiny rug", "A rug", "The rug"], 0, "Tiny tells you the size. The other lines do not describe it."),
      ],
      3: [
        week6Multi(
          "Which pair of adjectives is in a sensible order?",
          ["a small brown pony", "a brown small pony", "pony small brown a"],
          0,
          "Size usually comes before colour. A small brown pony sounds natural."
        ),
      ],
    },
    "y-join": {
      1: [
        week6Multi(
          "Which sentence uses and to join two jobs?",
          ["George zipped his suit and checked the strap.", "George zipped his suit.", "Zipped and"],
          0,
          "And joins two jobs he did. Both parts belong in the same sentence."
        ),
        week6Multi("Which word can join two sentences?", ["and", "bucket", "quietly"], 0, "And is a joining word. Bucket is a thing. Quietly tells how."),
      ],
      2: [
        week6Multi(
          "Which sentence gives a reason with because?",
          ["Bella added a rug because the night was frosty.", "Bella added a rug.", "Because"],
          0,
          "Because answers why. The night was frosty, so the rug went on."
        ),
      ],
      3: [
        week6Multi(
          "Which sentence uses when to say the time?",
          ["When the flag dropped, the karts moved.", "The karts moved.", "When"],
          0,
          "When tells the reader the moment. The flag dropping is that moment."
        ),
      ],
    },
    "y-spell": {
      1: [
        week6Multi("Which spelling of said is the real word?", ["said", "sed", "sayed"], 0, "Said is the usual spelling. It does not look quite like it sounds."),
        week6Multi("Which spelling of they is the real word?", ["they", "thay", "tey"], 0, "The word they is spelled t-h-e-y."),
      ],
      2: [
        week6Multi("Which word means 'belonging to them'?", ["their", "there", "where"], 0, "Their shows belonging. There is a place. Where asks about a place."),
      ],
      3: [
        week6Multi("Which line uses the British spelling?", ["Her favourite colour is bay.", "Her favorite color is bay.", "favourite colour is"], 0, "In Britain we write favourite and colour with the u."),
      ],
    },
    "y-read": {
      1: [
        week6Multi(
          "Where was the helmet?",
          ["On the bench", "In the trough", "On the Moon"],
          0,
          "The passage says the helmet was on the bench.",
          "George left his helmet on the bench and went to the briefing."
        ),
        week6Multi(
          "What was shut?",
          ["The gate", "The sky", "The verb"],
          0,
          "The passage says Bella shut the gate.",
          "Bella shut the gate and counted the ponies in the field."
        ),
      ],
      2: [
        week6Multi(
          "Why did the lesson stop?",
          ["The rain was too heavy", "The ponies wanted a story", "A comma fell off"],
          0,
          "The sentence gives the reason: the rain was too heavy.",
          "The rain was too heavy, so the riding lesson stopped early."
        ),
      ],
      3: [
        week6Multi(
          "What can you tell about the driver who keeps checking the mirrors?",
          ["They are watching the karts behind", "They have finished the race", "They are a horse"],
          0,
          "Checking mirrors means they want to know who is behind. That is a simple inference.",
          "On the straight, the driver kept checking the mirrors."
        ),
      ],
    },
    "y-sent": {
      1: [
        week6Multi("Which of these is a finished sentence?", ["The frost sparkled.", "The frost", "Sparkled brightly"], 0, "A sentence has a who or what, and a doing word, and it finishes."),
        week6Multi("Which line tells someone to do something?", ["Fill the bucket.", "The bucket is full.", "Is the bucket full?"], 0, "A command tells someone to do something. It can end with a full stop."),
      ],
      2: [
        week6Multi("Which line shows a strong feeling?", ["What a muddy pony!", "The pony is muddy.", "Is the pony muddy?"], 0, "An exclamation shows a strong feeling and ends with an exclamation mark."),
      ],
      3: [
        week6Multi(
          "Which line joins two whole ideas?",
          ["The visor misted and George pitted.", "The visor.", "Pitted"],
          0,
          "A compound sentence joins two clauses that could each stand alone."
        ),
      ],
    },
  },
  science: {
    biology: {
      1: [
        week6Multi("Which one of these grows and needs food?", ["A fern", "A metal bit", "A plastic cone"], 0, "A fern grows and needs water and light. A bit and a cone do not."),
        week6Multi("Animals need food because they…", ["cannot make it the way plants do", "are the same as stones", "stop needing water by rule"], 0, "Animals eat food. Most plants make theirs using light."),
      ],
      2: [
        week6Multi("Which body part takes in air?", ["The lungs", "The hoof", "The mane"], 0, "The lungs take air in and let it out. That is breathing."),
      ],
      3: [
        week6Multi("In a food chain, a herbivore eats…", ["plants", "only other meat-eaters", "sunlight as a solid meal"], 0, "A herbivore eats plants. A carnivore eats other animals."),
      ],
    },
    chemistry: {
      1: [
        week6Multi("Water left in a freezer will…", ["freeze into ice", "become a pony", "turn into a flag"], 0, "Cold can turn liquid water into solid ice. Warmth can melt it again."),
        week6Multi("Which material is a good choice for a bucket?", ["Plastic that holds water", "Tissue paper", "A biscuit"], 0, "A bucket must hold water. Tissue paper goes soggy. The job picks the material."),
      ],
      2: [
        week6Multi("Chocolate left in a warm pocket will…", ["melt", "become a metal", "freeze harder"], 0, "Warmth can turn a solid into a liquid. Cooling can set it again."),
      ],
      3: [
        week6Multi("Salt stirred into warm water, then left, will…", ["dissolve, so you may not see the grains", "become a new animal", "turn the water into wood"], 0, "Salt dissolves. The salt is still there, even when you cannot see the grains."),
      ],
    },
    physics: {
      1: [
        week6Multi("A pull can make a gate…", ["start to move", "turn into a plant", "lose its need for a force"], 0, "A pull is a force. It can start something moving."),
        week6Multi("Which one is a push?", ["Pressing a pedal away from you", "A habitat", "A comma"], 0, "A push moves something away from you. It is a force."),
      ],
      2: [
        week6Multi("A torch shines because it…", ["gives out light", "eats food like a pony", "is a type of verb"], 0, "A torch is a light source. The Moon is not. The Moon reflects light."),
      ],
      3: [
        week6Multi("A smoother surface usually means…", ["less friction, so things slide further", "more friction every time", "the object becomes a liquid"], 0, "Smooth surfaces rub less. Less friction lets a thing slide further."),
      ],
    },
    method: {
      1: [
        week6Multi("A fair test keeps every part the same except…", ["one thing", "every part", "the date on the page"], 0, "If you change two things, you cannot tell which one mattered."),
        week6Multi("A result is…", ["what you measured", "what you hoped, written instead", "a type of saddle"], 0, "You write what happened. A hope is not a result."),
      ],
      2: [
        week6Multi(
          "You test which feed scoop holds more. What should stay the same?",
          ["How you fill them, so the test is fair", "The size of both scoops, on purpose, as a second change", "The name of the test"],
          0,
          "The scoops can differ. The way you fill them should be the same."
        ),
      ],
      3: [
        week6Multi(
          "If two repeats do not match, you should…",
          ["measure again and record all three", "keep only the one you like", "change the prediction so it matches"],
          0,
          "A mismatch is a reason to check, not a reason to hide a number."
        ),
      ],
    },
    "y-alive": {
      1: [
        week6Multi("Which one does not grow, feed or have young?", ["A plastic cone", "A moth", "Ivy"], 0, "A plastic cone does not grow, feed or reproduce. A moth and ivy do."),
        week6Multi("Living things can sometimes be spotted because they…", ["make more of their own kind", "turn into flags", "stop needing water by rule"], 0, "Living things can make more of their own kind. That is one of the signs of life."),
      ],
      2: [
        week6Multi("A fish is a vertebrate because it has…", ["a backbone", "six legs", "a saddle"], 0, "Vertebrates have a backbone. Insects do not."),
      ],
      3: [
        week6Multi("A frog grows through which order?", ["Spawn, then tadpole, then frog", "Only a helmet", "A pit stop"], 0, "The same animal, different stages. Spawn comes before the tadpole, and the tadpole before the frog."),
      ],
    },
    "y-plants": {
      1: [
        week6Multi("A plant's roots usually…", ["take in water", "make the flower steer", "replace the Sun"], 0, "Roots hold the plant and take in water. Leaves catch the light."),
        week6Multi("Most leaves are green because they…", ["catch light to help make food", "are painted each morning", "are a type of soil"], 0, "The green part helps the plant use light. That is how most plants feed."),
      ],
      2: [
        week6Multi("A seed needs, in the usual story, water and…", ["warmth, to start growing", "a steering wheel", "a question mark"], 0, "Water and warmth let many seeds germinate. Light matters more once leaves open."),
      ],
      3: [
        week6Multi("Pollen travelling from one flower to another is part of…", ["pollination", "a pit stop", "melting"], 0, "Pollination lets many plants make seeds. Insects or the wind can carry the pollen."),
      ],
    },
    "y-body": {
      1: [
        week6Multi("Where in the body is the heart?", ["In the chest", "In a boot", "In a helmet"], 0, "The heart sits in the chest and pumps blood."),
        week6Multi("Bones are useful because they…", ["hold the body up", "make food like a leaf", "replace water"], 0, "The skeleton supports you and protects organs. It does not make food."),
      ],
      2: [
        week6Multi("Muscles work by…", ["pulling on bones", "pushing blood on their own as the heart", "melting"], 0, "A muscle pulls. Bones and joints let the body move."),
      ],
      3: [
        week6Multi("Digestion is the job of…", ["breaking food down so the body can use it", "breathing in the lungs only", "making the skeleton green"], 0, "Food is broken into smaller parts. The body can then use them."),
      ],
    },
    "y-mats": {
      1: [
        week6Multi("Which material is waterproof?", ["Rubber boots", "A paper tissue", "A dry biscuit"], 0, "Rubber keeps water out. Tissue soaks it up."),
        week6Multi("Wood is a good choice for a fence because it is…", ["strong and can be cut to size", "a liquid", "invisible"], 0, "The job needs something that stands up. Wood can do that."),
      ],
      2: [
        week6Multi("A material that bends without breaking is…", ["flexible", "always magnetic", "a gas"], 0, "Flexible means it can bend. Rigid means it keeps its shape."),
      ],
      3: [
        week6Multi("Metal conducts heat, so a metal spoon in a hot drink…", ["gets hot at the handle too", "stays cold forever", "turns into wood"], 0, "Heat travels through the metal. That is why the handle warms up."),
      ],
    },
    "y-push": {
      1: [
        week6Multi("To stop a rolling ball you need…", ["a force against the movement", "a louder name", "no force at all"], 0, "A force can slow something. Friction or a hand can be that force."),
        week6Multi("Gravity pulls things…", ["towards the Earth", "only upwards", "sideways because of a comma"], 0, "Dropped things fall. Gravity is the pull towards the Earth."),
      ],
      2: [
        week6Multi("A magnet can attract…", ["some metals, such as iron", "every plastic", "sunlight"], 0, "Magnets pull certain metals. They do not pull every material."),
      ],
      3: [
        week6Multi("On a rough yard, a sliding boot stops sooner because…", ["friction is greater", "friction has been switched off", "rough means the same as ice"], 0, "Rough surfaces rub more. More friction means the boot stops sooner."),
      ],
    },
    "y-home": {
      1: [
        week6Multi("A good habitat gives a living thing…", ["food and a place to shelter", "a full stop", "a steering wheel"], 0, "A habitat is the place that supplies those needs."),
        week6Multi("Which animal could use a pond as its habitat?", ["A newt", "A helmet", "A question mark"], 0, "Newts live and feed around ponds. A pond can be their habitat."),
      ],
      2: [
        week6Multi("In the chain leaf → caterpillar → bird, the bird eats the…", ["caterpillar", "leaf, as the only food", "arrow"], 0, "The arrow means 'is eaten by'. The caterpillar is eaten by the bird."),
      ],
      3: [
        week6Multi("A hedgehog's spines are an adaptation because they…", ["help protect it", "make it photosynthesise", "replace the need for a habitat"], 0, "An adaptation is a feature that helps something survive where it lives."),
      ],
    },
    "y-sky": {
      1: [
        week6Multi("We get day and night because…", ["the Earth spins", "the Sun goes out at tea time", "a flag tells the sky"], 0, "The Earth turns. Your side faces the Sun, then faces away."),
        week6Multi("When your side of the Earth faces away from the Sun, it is…", ["night", "always summer", "a new planet"], 0, "Facing away from the Sun is night. Facing the Sun is day."),
      ],
      2: [
        week6Multi("A year is about the time the Earth takes to…", ["go once around the Sun", "spin once", "fill a bucket"], 0, "One orbit of the Sun is about a year. One spin is about a day."),
      ],
      3: [
        week6Multi("In the solar system, the Sun is…", ["the star in the middle", "a planet like Mars", "a moon of the Earth"], 0, "The Sun is a star. Planets, including Earth, go around it."),
      ],
    },
  },
  horses: {
    care: {
      1: [
        week6Multi("You walk up to a horse's shoulder because…", ["they can see you there", "heels are the friendly end", "it is the same as walking under the belly"], 0, "The shoulder is where they can see you. The heels are not a greeting place."),
        week6Multi("A horse that turns its head away and tightens its mouth is…", ["asking for space", "asking for a hug around the ears", "ready for a child to climb on"], 0, "A turned head can mean 'not now'. Give space and fetch an adult."),
      ],
      2: [
        week6Multi("You notice a horse standing away from the hay, looking dull. You…", ["tell the person who knows that horse", "offer a double feed to cheer them up", "ignore it until next week"], 0, "A change in habit can matter. The yard decides. You do not invent a treatment."),
      ],
      3: [
        week6Multi("A new swelling on a leg is…", ["reported the same day", "wrapped in any bandage you find", "left until it matches a picture"], 0, "Swelling can be a sign of heat or injury. The yard or the vet decides the next step."),
      ],
    },
    water: {
      1: [
        week6Multi("Before you tip a bucket out, you…", ["look, so you do not soak the bed or your boots by mistake", "throw it over the horse", "use it as a feed scoop"], 0, "Water belongs in the bucket or the drain. A soaked bed is not the plan."),
        week6Multi("A horse that has an empty bucket at evening check needs…", ["fresh water the same visit", "to wait until morning", "a handful of salt instead"], 0, "Water is a daily need. Empty means you refill, then tell someone if it keeps happening."),
      ],
      2: [
        week6Multi("A trough in a frosty morning is checked because…", ["ice can hide the water", "frost is a drink", "horses prefer ice"], 0, "A lid of ice stops them drinking. Break it and look again later."),
      ],
      3: [
        week6Multi("Green slime in a trough is…", ["a reason to clean it, as the yard showed you", "a healthy drink", "a sign to add feed"], 0, "Slimy water is not the drink you want. Empty, scrub if you are allowed, and refill."),
      ],
    },
    feeding: {
      1: [
        week6Multi("You read the feed chart because…", ["each horse can have a different amount", "every horse gets the same scoop always", "charts are only for people"], 0, "The chart is the instruction. A guess can be too much."),
        week6Multi("You put the scoop back in the right bin because…", ["the next horse must not get the wrong feed", "bins are all the same", "scoops are toys"], 0, "A scoop left in the wrong bin mixes feeds. Put it back."),
      ],
      2: [
        week6Multi("A feed that smells sour is…", ["not fed", "stirred and used", "dried on a radiator"], 0, "Sour means it has gone off. Tip it out where the yard says, and tell someone."),
      ],
      3: [
        week6Multi("A horse that gulps feed too fast may need…", ["the yard's plan, which might include a slow feeder", "a bigger scoop to finish faster", "no water afterwards"], 0, "Eating too fast can be a problem. You do not invent a bigger meal."),
      ],
    },
    grooming: {
      1: [
        week6Multi("A face is cleaned with…", ["a soft cloth, not the body brush", "a hoof pick", "the metal curry comb"], 0, "The face is tender. Soft cloth only. The curry comb stays on the body, or on the brush."),
        week6Multi("You pick out hooves…", ["from heel towards toe, if you have been shown", "by digging anywhere", "only on the mane"], 0, "The usual path is heel to toe. Ask to be shown before you try."),
      ],
      2: [
        week6Multi("A stone in the frog of the hoof is…", ["lifted out carefully, then an adult checks", "hammered in", "left as a grip"], 0, "A stone can bruise. Lift it if you can do so gently, and show an adult."),
      ],
      3: [
        week6Multi("You find a bald patch under the rug while grooming. You…", ["tell an adult before the rug goes back on", "rub it harder", "cover it with more mud"], 0, "A bald patch can be a rub. The rug may not fit. Riding or rugging over it can make it worse."),
      ],
    },
    stable: {
      1: [
        week6Multi("You speak before you open a stable door so that…", ["the horse is not surprised", "doors need a password", "speaking replaces a headcollar"], 0, "A quiet word is a warning. Then look, then open."),
        week6Multi("Droppings in the bed are…", ["skipped out", "left as a pillow", "fed back to the horse"], 0, "Skip-out keeps the bed dry and clean. Droppings do not stay."),
      ],
      2: [
        week6Multi("A broken board in a stable wall is…", ["reported before a hoof finds it", "a new window", "fixed with baler twine by a child"], 0, "A gap or a splinter can cut. Tell an adult. Do not invent a repair."),
      ],
      3: [
        week6Multi("Banks of bedding against the wall can…", ["help keep a draught off a lying horse, if the yard wants that", "replace water", "be piled over the door"], 0, "Banks are a yard choice. They are not a reason to block the door or the window."),
      ],
    },
    riding: {
      1: [
        week6Multi("Your heels in the stirrup stay…", ["down, as you were taught", "up by the horse's ears", "out of the stirrup on purpose while you trot"], 0, "Heels down help you stay balanced. An instructor watches the detail."),
        week6Multi("You look up between the ears because…", ["where you look is where you go", "the ground is more interesting", "the reins steer themselves"], 0, "Eyes up. The horse follows a rider who looks ahead."),
      ],
      2: [
        week6Multi("To ask for halt you…", ["sit tall and close your fingers, as you were taught", "pull as hard as you can", "drop the reins"], 0, "Halt is a quiet aid. A haul is not the lesson."),
      ],
      3: [
        week6Multi("You pass another horse in the school…", ["with a horse's length, and on the side your instructor said", "so close that the stirrups touch", "by cutting in front"], 0, "Room is the rule. The instructor sets which way you pass."),
      ],
    },
    tack: {
      1: [
        week6Multi("The girth is checked…", ["again after you have walked a few steps", "once, then never", "only if it looks pretty"], 0, "Horses can blow out. A second check stops a slipping saddle."),
        week6Multi("You do not leave a saddle on the ground because…", ["it can twist, and grit can scratch the leather", "the ground is a saddle rack", "saddles like mud"], 0, "Put it on a rack or ask where it lives. Grit under the panel becomes a sore."),
      ],
      2: [
        week6Multi("A bit that is too low in the mouth can…", ["bang the teeth", "be more comfortable", "replace a bridle"], 0, "The usual check is a small wrinkle at the lip, and an adult confirms it."),
      ],
      3: [
        week6Multi("Stirrups that are uneven mean…", ["you stop and even them before you trot", "one leg is meant to be longer", "the hat can be left off"], 0, "Uneven stirrups twist you. Match them. A hat is a separate rule and it stays on."),
      ],
    },
    history: {
      1: [
        week6Multi("A blacksmith's old job with horses was often…", ["making and fitting shoes", "driving Formula 1 cars", "writing the feed chart in Latin only"], 0, "Shoes were forged and fitted. A child does not shoe a horse."),
        week6Multi("A pack horse was used to…", ["carry loads", "fly", "replace a tractor in a race"], 0, "Pack horses carried goods on paths. That is history, not a job for a child's pony."),
      ],
      2: [
        week6Multi("Pit ponies, in the past, worked…", ["underground, pulling carts", "only in show rings", "as kart engines"], 0, "They lived and worked in mines. The work was hard, and the law around it changed."),
      ],
      3: [
        week6Multi("Horses in the First World War were used to…", ["pull guns and wagons", "fly aeroplanes", "drive tanks"], 0, "Many horses pulled loads. Remembering them is part of the history, not a game."),
      ],
    },
    "h-lead": {
      1: [
        week6Multi("Spare lead rope should be…", ["folded in your hand, not wrapped around it", "wrapped tight around your wrist", "held in your teeth"], 0, "A wrap around a hand can trap you if the horse pulls. Fold the spare rope."),
        week6Multi("You walk beside the shoulder, not…", ["in front, where a spook can run you over", "where they can see you", "at a quiet pace"], 0, "Beside the shoulder is the usual place. In front of the chest is a poor place."),
      ],
    },
    "h-field": {
      1: [
        week6Multi("You call a horse in from the field by…", ["walking quietly and showing the headcollar, not chasing", "running and shouting", "throwing a stone"], 0, "Chasing makes them faster. Quiet and a headcollar is the lesson."),
        week6Multi("Two horses pinned back and kicking means you…", ["stay out and fetch an adult", "walk between them with the hay", "join in"], 0, "Kicking is a message. Hay can wait. People do not stand in the middle."),
      ],
    },
    "h-rug": {
      1: [
        week6Multi("You fasten the chest buckle before the surcingle so that…", ["the rug cannot slip back while you do the rest", "the order does not matter", "the rug works undone"], 0, "The yard's order keeps the rug still. Ask to be shown if you forget."),
        week6Multi("A rug that has twisted under the belly is…", ["straightened before you leave", "left as a style", "a sign to add another rug"], 0, "A twist rubs. Smooth it. If it twists again, tell an adult."),
      ],
    },
  },
  f1: {
    "f-teams": {
      1: [
        week6Multi("A constructor, in Formula 1, means…", ["the team that builds and enters the car", "the person waving the flag", "a type of helmet"], 0, "The constructor is the team. The driver is the person in the seat."),
        week6Multi("Two cars from the same team can…", ["score points separately for that team", "share one steering wheel", "be a horse each"], 0, "Both cars can bring points home. The rules of that year say how the numbers add."),
      ],
      2: [
        week6Multi("The people who change the tyres are part of…", ["the pit crew", "the crowd", "the horse box"], 0, "The pit crew is the team you see in the stop. They practise the same moves."),
      ],
      3: [
        week6Multi("A reserve driver is…", ["a driver who can step in if needed", "the person who paints the kerbs", "a flag colour"], 0, "They are ready to drive. They are not a spare flag."),
      ],
    },
    "f-flags": {
      1: [
        week6Multi("A red flag in Formula 1 means…", ["the session stops", "one more racing lap", "the winner's colour"], 0, "Red means stop. You slow and follow the instruction. You do not keep racing."),
        week6Multi("When a green flag comes out, it means…", ["the track is clear to go", "danger, so no overtaking", "the session is finished"], 0, "Green is the all-clear. Yellow was the caution. They are not the same."),
      ],
      2: [
        week6Multi("A blue flag shown to a car means…", ["a faster car is behind", "that car has won", "the pit lane is shut forever"], 0, "Blue warns that someone quicker is there. You do not weave to stop them."),
      ],
      3: [
        week6Multi("A black and orange flag, often called the meatball, means…", ["that car has a problem and must come in", "that car set the fastest lap", "the whole field takes lunch"], 0, "It is aimed at one car. Something may be unsafe, so they come in."),
      ],
    },
    "f-pits": {
      1: [
        week6Multi("In Formula 1, where does the team watch the race and talk to the driver?", ["From the pit wall", "From the crowd, sitting on the tools", "From a horse box"], 0, "The pit wall is the team's desk. It is not a place for a visitor to lean on the equipment."),
        week6Multi("A wheel gun in a stop is…", ["a tool for the crew, not a toy", "the driver's steering wheel", "a flag"], 0, "The crew train with it. A child does not pick one up."),
      ],
      2: [
        week6Multi("A stop under green-flag running is different from a stop under a safety car because…", ["the time you lose can change", "the tyres become flags", "the car does not need wheels"], 0, "The field bunches behind a safety car. The gap you lose is not the same. The team does the sums."),
      ],
      3: [
        week6Multi("Releasing a car with a hose still attached would be…", ["a failed stop", "a bonus", "the normal overtake"], 0, "Everything must be clear before the car leaves. That is why the release is a system, not a guess."),
      ],
    },
    "f-car": {
      1: [
        week6Multi("The halo in the cockpit is there to…", ["protect the driver's head", "make the car fly", "hold a picnic"], 0, "The halo is a guard around the head. It stays on the car."),
        week6Multi("Slick tyres are used when the track is…", ["dry", "a river", "made of hay"], 0, "Slicks have no tread. They are for a dry track. Grooved tyres are for rain."),
      ],
      2: [
        week6Multi("Downforce helps the car…", ["stay stuck to the track in the corners", "take off", "skip the brakes"], 0, "The wings push the car down. More grip in the corner is the idea. It is not flight."),
      ],
      3: [
        week6Multi("If the brakes get too hot they can…", ["work less well", "turn into wings", "become a flag"], 0, "Too much heat can make brakes fade. The team watches the temperatures."),
      ],
    },
    "f-history": {
      1: [
        week6Multi("The first championship Formula 1 race was held at…", ["Silverstone", "a stable", "a karting briefing only"], 0, "Silverstone, in 1950, held the first round. That fact stays put."),
        week6Multi("Formula 1 cars race on…", ["circuits and some street tracks", "horse gallops", "the school run"], 0, "A circuit is a built track. A street track uses closed public roads."),
      ],
      2: [
        week6Multi("A lap record is…", ["the fastest lap that still stands at that circuit", "the slowest lap", "a flag colour"], 0, "It is a time. A new car or a new rule can change it. The idea stays."),
      ],
      3: [
        week6Multi("Which fact will still be true next year?", ["The championship began in 1950", "This weekend's tyre choice", "The name of next year's champion"], 0, "1950 stays true. A tyre choice is news, and news goes out of date."),
      ],
    },
    "f-sums": {
      1: [
        week6Typed("A story-lap is 82 seconds. Which is quicker, 82 seconds or 91 seconds?", "82", "Less time is faster. 82 is a shorter lap than 91."),
        week6Multi("Four equal story-laps of 50 seconds take…", ["200 seconds", "50 seconds altogether", "54 seconds"], 0, "50 and 50 and 50 and 50 is 200. A real race has many more laps."),
      ],
      2: [
        week6Typed("A story-car loses 4 seconds a lap for 3 laps. How many seconds is that?", "12", "4 × 3 = 12 seconds. A real gap depends on the cars and the track."),
      ],
      3: [
        week6Typed("A pit stop costs 20 seconds and the new tyres then save 5 seconds a lap. After 2 laps, how many seconds are still lost?", "10", "2 × 5 = 10 seconds saved. 20 − 10 = 10 still lost. This is a story sum, not a real stop."),
      ],
    },
  },
  horseworld: {
    "w-breeds": {
      1: [
        week6Multi("A horse, on the usual height rule, measures…", ["over 14.2 hands", "always under 10 hands", "in racing laps"], 0, "Over 14.2 hands is the usual horse line. 14.2 and under is a pony."),
        week6Multi("A Shire is best described as…", ["a tall heavy horse", "a tiny pony like a Shetland", "a type of kart"], 0, "Shires are tall, heavy horses. They are not Shetlands."),
      ],
      2: [
        week6Multi("The Arab is often recognised by…", ["a dished face, on an old riding breed", "having no tail", "pulling Formula 1 cars"], 0, "Arabs are an old riding breed, often with a dished face. One horse is still an individual."),
      ],
      3: [
        week6Multi("Height in hands is taken at which point?", ["The withers", "The ears", "The frog of the hoof"], 0, "The withers are the ridge where the neck meets the back. Ears would make the number silly."),
      ],
    },
    "w-gaits": {
      1: [
        week6Multi("Trot, compared with walk, is…", ["quicker, and it is two beats", "slower than halt", "a jump"], 0, "Trot is the two-beat gait. Walk is the slow four-beat gait."),
        week6Multi("The sound of trot is…", ["two beats", "one long whistle", "a car horn"], 0, "Diagonal pairs give the trot its two beats."),
      ],
      2: [
        week6Multi("Gallop is…", ["faster than canter", "the same as halt", "a four-beat walk"], 0, "Gallop is the fast gait. Canter is slower than gallop and has a leading leg."),
      ],
      3: [
        week6Multi("A change of leading leg in canter is…", ["a movement the rider can ask for, once it is taught", "the horse falling", "a flag"], 0, "The leading leg can change. It is a lesson, not an accident you ignore."),
      ],
    },
    "w-famous": {
      1: [
        week6Multi("The Derby is a race…", ["for horses, on the flat", "for Formula 1 cars", "inside a stable"], 0, "It is a famous flat race at Epsom. It is not a motor race."),
        week6Multi("Red Rum is remembered because he…", ["won the Grand National three times", "drove a kart", "was a cartoon only"], 0, "Three wins: 1973, 1974 and 1977. That history does not change."),
      ],
      2: [
        week6Multi("Dressage is a sport of…", ["accurate, calm movements in a marked arena", "who jumps the highest fence only", "the loudest pony"], 0, "The test asks for set movements. It is not a race."),
      ],
      3: [
        week6Multi("Cross-country, in eventing, is…", ["a course of solid fences against the clock", "a written spelling test", "a motor race"], 0, "The fences stay up. Time matters. It is one part of eventing, with dressage and showjumping."),
      ],
    },
    "w-rules": {
      1: [
        week6Multi("You do not duck under a horse's neck because…", ["they may throw the head, and you are in the way", "it is the safest path", "necks are handles"], 0, "Go the long way, where they can see you. Under the neck is a poor shortcut."),
        week6Multi("A body protector, if your lesson uses one, is…", ["fastened before you mount", "optional once you can trot", "a replacement for a hat"], 0, "It is kit for the lesson. The hat is separate and it still goes on."),
      ],
      2: [
        week6Multi("In a showjumping round, a pole down usually means…", ["faults", "a bonus", "the round is deleted from history"], 0, "Poles down cost faults. The exact number can depend on the rules of that class."),
      ],
      3: [
        week6Multi("A refusal at a fence is…", ["the horse stopping instead of jumping", "a perfect jump", "a type of feed"], 0, "A refusal is a stop. The rules of the class say what it costs. You do not turn it into a joke."),
      ],
    },
    "w-move": {
      1: [
        week6Multi("In Britain, the near side means…", ["the left side", "the right side", "the tail"], 0, "Near is left. Off is right. You still approach where the horse can see you."),
        week6Multi("A horse hears well, so a sudden shout…", ["can startle them", "is the same as a quiet voice", "is how you lead"], 0, "Quiet is kinder. A shout can send a horse forward."),
      ],
      2: [
        week6Multi("A swishing tail and a lifted hind hoof, together, mean…", ["step away", "come closer for a hug", "offer a treat at the heels"], 0, "That pair is a warning. Heels are not a place for a treat."),
      ],
      3: [
        week6Multi("A horse that spooks at a flapping bag is showing…", ["a flight reaction", "a reading habit", "a wish to discuss the bag"], 0, "Flight is the prey-animal habit. Quiet handling and a folded bag give them less to flee from."),
      ],
    },
    "w-sums": {
      1: [
        week6Typed("How many inches are in 5 hands?", "20", "A hand is 4 inches. Five hands are 20 inches."),
        week6Multi("12 hands, with no extra inches, is…", ["48 inches", "12 inches", "12.2 inches"], 0, "12 × 4 = 48 inches. 12.2 would be 12 hands and 2 extra inches."),
      ],
      2: [
        week6Typed("A pony of 13 hands, with no extra inches, is how many inches? A hand is 4 inches.", "52", "A hand is 4 inches, so 13 hands is 52 inches."),
      ],
      3: [
        week6Typed("13.2 hands is 54 inches. How many inches is 54 + 2?", "56", "54 and 2 more is 56 inches. 14 hands, with no extra inches, is 56 inches."),
      ],
    },
  },
};

const WEEK6_KART = {
  safety: {
    1: [
      week6Row("A helmet strap done up means…", ["the helmet stays on if you bump", "you can leave it flapping", "you may skip the visor"], 0, "The strap is what keeps the helmet on your head. Click it before you sit in.", 2),
      week6Row("You climb out of a kart…", ["only when a marshal has said you may", "while it is still rolling", "on the racing line"], 0, "Wait for the word. A rolling kart and a live track are not places to climb.", 3),
    ],
    2: [
      week6Row("A glove dropped on the track is…", ["left there until a marshal can fetch it", "a reason to run out and grab it", "a new racing line"], 0, "You do not chase kit onto a live track. Tell a marshal.", 3),
    ],
    3: [
      week6Row("If your kart stops pointing the wrong way, you…", ["stay belted, hands in, and wait to be shown", "reverse up the straight", "undo the strap to look braver"], 0, "Other karts are coming. A predictable you, still in the seat, is the safe you.", 4),
    ],
  },
  kit: {
    1: [
      week6Row("Shoes for the kart must…", ["cover your toes and stay on the pedals", "be sandals", "come off so you can feel the pedals"], 0, "A shoe that slips off cannot work a pedal. Toes stay covered.", 2),
      week6Row("You do the zip up…", ["before the engine starts", "on the second lap", "only if a friend reminds you after the flag"], 0, "A flapping zip can catch. It is done before you roll.", 3),
    ],
    2: [
      week6Row("A visor with mud on it is…", ["wiped while you are stopped", "left, because mud is a sunshade", "taken off at racing speed"], 0, "You need to see. Clean it in the pit or when a marshal has stopped you.", 3),
    ],
    3: [
      week6Row("Overalls that trail on the ground are…", ["a size problem to fix before you drive", "faster", "a new style the rules like"], 0, "Cloth near the chain or the ground can catch. Ask for a better size.", 4),
    ],
  },
  kart: {
    1: [
      week6Row("The red button you are shown before a session is often…", ["the way to stop the engine", "a radio", "a horn for fun"], 0, "Know how the engine stops before you move. Ask if you are not sure which button.", 2),
      week6Row("You hold the wheel…", ["with two hands", "with your knees", "with one finger on the spoke"], 0, "Two hands, where the briefing showed you. A one-finger hold is not it.", 3),
    ],
    2: [
      week6Row("You do not rest a hand on the chain because…", ["a moving chain can catch skin or a glove", "the chain is a handle", "chains are cold and therefore safe"], 0, "The guard is there for a reason. Hands stay on the wheel.", 3),
    ],
    3: [
      week6Row("A kart that smells of fuel before you start is…", ["a reason to stop and tell a marshal", "a good luck sign", "fixed by starting it quickly"], 0, "Fuel where it should not be is a grown-up's problem. Do not turn the key on a spill.", 4),
    ],
  },
  pedals: {
    1: [
      week6Row("The brake is the pedal that…", ["slows the kart", "makes the engine louder as its only job", "is a footrest"], 0, "Brake is stop. Throttle is go. The briefing shows which side is which.", 2),
      week6Row("You look at the pedals…", ["before the session, not during the corner", "all the way through every turn", "never, even in the briefing"], 0, "Learn them first. In the corner your eyes are up the track.", 3),
    ],
    2: [
      week6Row("Braking in a straight line, before you turn, is…", ["the usual order", "slower for no reason", "only for dry hair"], 0, "The kart is stable while it is straight. Turn after the speed has come off.", 3),
    ],
    3: [
      week6Row("Pressing the brake harder and harder without looking ahead is…", ["a skid waiting to happen", "the racing line", "what a green flag asks"], 0, "Brakes need a plan. Eyes up, then the pedal. A locked wheel does not steer.", 4),
    ],
  },
  marshal: {
    1: [
      week6Row("A marshal with a board is…", ["giving an instruction", "advertising snacks", "asking for a wave you can ignore"], 0, "Boards and flags are the job. You follow them.", 2),
      week6Row("You thank a marshal…", ["after the session, from behind the fence", "by driving up to their post", "by stopping beside them on a live lap"], 0, "Thank-yous happen off the track. Their post is not a pit stop.", 3),
    ],
    2: [
      week6Row("If two marshals signal differently, you…", ["slow down and take the safer signal", "pick the one you like", "speed up to get past the confusion"], 0, "Slow is the safe choice while the message is unclear. Do not guess a faster one.", 3),
    ],
    3: [
      week6Row("Driving close to a marshal post to 'see the flag better' is…", ["a bad idea, because people are standing there", "the racing line", "what the chequered flag means"], 0, "You can see a flag from the track you were given. Posts need space.", 4),
    ],
  },
  flags: {
    1: [
      week6Row("A yellow flag held still means…", ["there is something ahead, so be ready to slow", "the race is over", "overtake now"], 0, "Still yellow is a warning. Waved yellow is more urgent. You do not pass.", 2),
      week6Row("The chequered flag is…", ["black and white", "solid red", "blue with a yellow cross"], 0, "Chequered means the session is finishing. It is the black and white one.", 3),
    ],
    2: [
      week6Row("A red and yellow striped flag, if your track uses one, warns of…", ["a slippery surface", "the winner", "a faster kart only"], 0, "Stripes can mean oil or a wet patch. Ease off. The briefing names the flags you will see.", 3),
    ],
    3: [
      week6Row("Ignoring a yellow flag because you are last is…", ["still not allowed", "fine, because nobody is behind", "what a blue flag means"], 0, "Yellow is about the danger ahead, not about your position. Last place still slows.", 4),
    ],
  },
  driving: {
    1: [
      week6Row("Smooth hands on the wheel mean…", ["small movements, not a saw", "yanking from lock to lock", "letting go on the straight"], 0, "Small corrections keep the kart settled. Sawing makes it wander.", 2),
      week6Row("You leave a kart's width when you pass because…", ["both karts need space", "touching is how you say hello", "the rules score a bump"], 0, "A pass needs a gap that is really there. Room is the kind lap.", 3),
    ],
    2: [
      week6Row("If the kart ahead brakes early, you…", ["brake as well, rather than run into them", "assume they are wrong and stay flat", "close your eyes"], 0, "Their brake lights, or their nose dipping, are a message. You react.", 3),
    ],
    3: [
      week6Row("A kart that disappears from your mirror into your blind side is…", ["still there until you know otherwise", "gone, so you may swing over", "a reason to brake in their door"], 0, "If you cannot see them, you do not move into the space. Hold the line.", 4),
    ],
  },
  corners: {
    1: [
      week6Row("The middle of a corner is for…", ["steering, after the speed has come off", "standing on the brake for the first time", "looking at your shoes"], 0, "Slow before the turn. The turn itself is for the wheel and your eyes.", 2),
      week6Row("Looking at the exit of the corner helps you…", ["steer towards where you want to go", "forget the kart ahead", "skip the brake"], 0, "Eyes lead the hands. The exit is where you are going.", 3),
    ],
    2: [
      week6Row("A late turn, after a wide entry, can…", ["give you a straight exit", "be a shortcut across the grass", "replace the throttle"], 0, "Wide, then turn, then run out to the exit. Grass is not part of that shape.", 3),
    ],
    3: [
      week6Row("Closing the gap on a kart already beside you in the corner is…", ["how karts touch", "a fair way to win the corner", "what a yellow flag asks"], 0, "If they are beside you, they need a kart's width. Shutting the door is a crash.", 4),
    ],
  },
  pits: {
    1: [
      week6Row("People in the pit lane mean you…", ["drive at the slow speed you were given", "race them", "weave to warm the tyres"], 0, "Crews and children stand close. The pit lane is not a straight.", 2),
      week6Row("You keep your hands in until…", ["a marshal says you can get out", "the kart has almost stopped", "you want a drink"], 0, "Hands in, then the word, then you climb. Hot engines are not a climbing frame.", 3),
    ],
    2: [
      week6Row("A queue of karts waiting to go out is…", ["left in order", "a place to push to the front", "a good spot for a photo on the bodywork"], 0, "The order is the marshal's. You do not overtake the queue.", 3),
    ],
    3: [
      week6Row("If fuel is being put in a kart, you…", ["stand back, engine off, and let the adult do it", "help by holding the can", "sit in the seat to watch closely"], 0, "Fuel is a grown-up's job. You step away from the can and the hot engine.", 4),
    ],
  },
  racing: {
    1: [
      week6Row("A practice lap is for…", ["learning where the track goes", "bumping the kart ahead", "stopping to wave"], 0, "Learn the corners first. Racing manners still apply when nobody is keeping score.", 2),
      week6Row("You wait for the lights or the flag because…", ["an early go is a jump, not a clever start", "the kart decides", "waiting is only for the leader"], 0, "The signal is the start. Going early can earn a penalty, and it is unfair.", 3),
    ],
    2: [
      week6Row("If you spin on a slow lap, you…", ["stay in the seat until you are shown what to do", "jump out to turn the kart by the bumper", "take the helmet off to hear better"], 0, "You are safer belted in. Other karts need you to stay predictable.", 3),
    ],
    3: [
      week6Row("A move that only works if the other kart disappears is…", ["not a real gap", "the champion's pass", "what the chequered flag rewards"], 0, "A gap is space you can see. Hope is not space.", 4),
    ],
  },
  line: {
    1: [
      week6Row("Four wheels beyond the white line means…", ["you are off the track", "you have found a faster lane", "the chequered flag"], 0, "The line is the edge. Beyond it is off, even if the grass looks smooth.", 2),
      week6Row("Putting a wheel on the grass to stay ahead is…", ["not a pass you get to keep", "clever", "what a marshal asks"], 0, "The place has to be made on the track. Grass does not count.", 3),
    ],
    2: [
      week6Row("A kerb the briefing called 'do not ride' is…", ["left alone", "a ramp", "the shortest way"], 0, "That kerb may unsettle the kart. The briefing is the rule for this track.", 3),
    ],
    3: [
      week6Row("You rejoin the track when…", ["the karts already on it have gone past", "you feel you have waited one second", "you can cross the line flat"], 0, "They have the racing line. You wait, then join without moving into someone.", 4),
    ],
  },
  respect: {
    1: [
      week6Row("At the end of the session you…", ["bring the kart in as you were shown, and thank the marshal", "leave it on the track", "blame the pedals out loud"], 0, "The tidy finish is part of the day. People gave up their time.", 2),
      week6Row("A bump you caused is…", ["mentioned calmly to a marshal", "a secret", "the other driver's fault until proved"], 0, "Owning a bump is the fair thing. Shouting in the pit lane does not fix a kart.", 3),
    ],
    2: [
      week6Row("A driver on their first day is…", ["given extra room", "a problem to pass at all costs", "in the way on purpose"], 0, "Everyone had a first day. Room is how you race kindly.", 3),
    ],
    3: [
      week6Row("Telling the whole pit lane about someone's mistake is…", ["unkind", "part of the points", "what a yellow flag asks"], 0, "A mistake is a lesson for them. You do not turn it into a story for everyone.", 4),
    ],
  },
  "k-brief": {
    1: [
      week6Row("The briefing tells you…", ["today's flags, the pit speed, and where to stop", "the winner of a race that has not started", "which kart is lucky"], 0, "Listen for the flags and the places. Lucky is not a safety rule.", 2),
      week6Row("If you missed one sentence of the briefing, you…", ["ask for it again before you drive", "hope it was not important", "copy the kart in front"], 0, "The missed sentence might have been the one about where to stop. Ask.", 2),
    ],
  },
  "k-rain": {
    1: [
      week6Row("In the wet you brake…", ["earlier than on a dry track", "later, to be brave", "not at all"], 0, "Water means less grip. Earlier and gentler is the usual change.", 2),
      week6Row("A visor that mists in the rain is…", ["a reason to pit if you cannot see the corner", "cleared by going faster", "opened wide at full speed"], 0, "Seeing is the rule. Come in rather than guess where the corner is.", 2),
    ],
  },
  "k-cheer": {
    1: [
      week6Row("The safe place to watch a session is…", ["the spectator place the track has marked", "the pit exit", "the kerb"], 0, "The marked place keeps you off the track and out of the tools.", 2),
      week6Row("Clapping a careful lap is…", ["fair, even if it was not the fastest", "only for the winner", "a signal to the marshal"], 0, "Careful is worth cheering. Fast is not the only good lap.", 2),
    ],
  },
};

const WEEK6_INVEST = {
  compound: {
    1: [
      week6Row("£3 put in a story pot, and £3 the next week, with nothing taken out, is…", ["£6", "£3", "£0"], 0, "3 and 3 make 6. This is a story pot, not a promise about a real bank.", 2),
      week6Row("Leaving the coins in the pot, instead of tipping them out, means…", ["they are still there next week", "they spend themselves", "they turn into flags"], 0, "The pot only keeps what you leave in it.", 3),
    ],
    2: [
      week6Row("A little extra paid for leaving money in an account is called…", ["interest, if the account pays it", "a fine", "a flag"], 0, "Interest is the extra. Not every account pays it. A parent reads the terms.", 3),
    ],
    3: [
      week6Row("If a story pot pays £1 of interest on £20, the same rate on £40 would pay…", ["£2", "£1", "£40"], 0, "The same share of a bigger pot is more pounds. £1 is a twentieth of £20, and a twentieth of £40 is £2. This is a story, not a promise.", 4),
    ],
  },
  spend: {
    1: [
      week6Row("A bus fare you need this week is…", ["a plan, before a toy", "the same as a toy", "interest"], 0, "The fare has a date. The toy can wait.", 2),
      week6Row("Money you have already promised for a present stays…", ["with that present", "in a story about shares", "in a stranger's message"], 0, "A promise has a date. It is not the long pot.", 3),
    ],
    2: [
      week6Row("Buying the first thing you see in a shop is…", ["a hurry, not a plan", "always a need", "interest"], 0, "A plan was written before the shop. The first shiny thing is not the plan.", 3),
    ],
    3: [
      week6Row("A want you still like after a week of waiting is…", ["a fairer choice than one you grabbed", "a rule that you must buy it", "interest"], 0, "The week was a test. You can still say yes, or you can still say no.", 4),
    ],
  },
  twenty: {
    1: [
      week6Row("If you have £10 and you set aside the 20% idea, you set aside…", ["£2", "£10", "20 pence"], 0, "A fifth of £10 is £2. The other £8 still has jobs. A parent chooses the real amount.", 2),
      week6Row("The slice you set aside is…", ["a habit, not the whole pot", "every coin you have", "a tax you invent"], 0, "Saving is a slice. The rest still pays for the things you planned.", 3),
    ],
    2: [
      week6Row("A week you can only set aside half the usual slice, you…", ["set aside what you can, and leave the old pot alone", "empty the pot to make the number look right", "skip the note"], 0, "A smaller slice is still a slice. The old savings stay.", 3),
    ],
    3: [
      week6Row("20p out of every extra pound, in this lesson, is…", ["the same idea as a fifth", "the whole pound", "a fine"], 0, "20p is a fifth of £1. The lesson calls that 20%. It is not an order to a family.", 4),
    ],
  },
  time: {
    1: [
      week6Row("A pot you will not need until next summer has…", ["more weeks to sit than a pot for this Saturday", "less time than a day", "no calendar"], 0, "The date chooses the pot. Saturday's money stays easy to reach.", 2),
      week6Row("Opening the pot every day to look does not…", ["add pounds by itself", "tell you what is in it", "count as leaving it alone"], 0, "Looking is not the same as adding. Growth, when it happens, takes time.", 3),
    ],
    2: [
      week6Row("A goal that is months away can sit in…", ["a pot you do not need for the bus", "the envelope for this week's fare", "a stranger's link"], 0, "Near money and far money have different homes.", 3),
    ],
    3: [
      week6Row("Many small adds, left alone, can grow past…", ["one add that you then spend", "a promise that the number only rises", "a rule that children must buy shares"], 0, "The habit is the lesson. Nothing here promises a profit.", 4),
    ],
  },
  metals: {
    1: [
      week6Row("A silver coin in a story is…", ["a thing you can hold, whose price can still change", "a guarantee of more coins", "a flag"], 0, "Metal is a thing. The price in pounds can fall. A parent holds any real coin.", 2),
      week6Row("The price of gold and the price of silver…", ["can move differently", "are always the same number", "are a type of interest"], 0, "They are both metals. They do not have to rise or fall together.", 3),
    ],
    2: [
      week6Row("A shiny coin is not…", ["a promise that the price will rise", "a thing you can look at", "something to ask a parent about"], 0, "Shiny is the look. The price is what someone will pay later.", 3),
    ],
    3: [
      week6Row("A story pot that is mostly cash, with a little metal, means…", ["a fall in the metal price hurts a small slice", "the metal cannot fall", "the cash turns into coins overnight"], 0, "The mix is the point. One price does not own the whole pot.", 4),
    ],
  },
  bitcoin: {
    1: [
      week6Row("A number on a screen that can fall by half is…", ["a poor home for the school-trip money", "the same as coins in a jar", "interest"], 0, "The trip has a date. A wild price does not care about the date.", 2),
      week6Row("This lesson does not ask a child to…", ["set up a wallet", "learn that prices can crash", "tell a parent"], 0, "The idea is the lesson. A wallet is not a homework task.", 3),
    ],
    2: [
      week6Row("A huge rise you heard about is…", ["a story from the past, not a plan", "a rule for next year", "the 20% slice"], 0, "Past jumps are not a forecast. They can be followed by falls.", 3),
    ],
    3: [
      week6Row("Money a stranger asks you to send, to 'start internet money', is…", ["shown to a parent, and not sent", "a starter kit you should buy", "interest arriving"], 0, "You do not send money because a message said so. Fetch a grown-up.", 4),
    ],
  },
  etf: {
    1: [
      week6Row("One shop having a bad week, inside a bag of many shops, means…", ["the other shops are still in the bag", "the whole bag is deleted", "the bag cannot fall"], 0, "The mix is the idea. One bad week is not the whole bag. The bag can still fall.", 2),
      week6Row("An advert that says a bag of shops 'cannot fall' is…", ["not a lesson you trust", "a rule of maths", "the same as reading the list"], 0, "No honest bag can promise it never falls.", 3),
    ],
    2: [
      week6Row("Reading, with a parent, what is inside the bag is…", ["more useful than liking the name", "a waste of time", "the same as buying it"], 0, "The name is not the contents. The list is. A parent still decides.", 3),
    ],
    3: [
      week6Row("The price of a wide bag can fall even when…", ["you set money aside every week", "you did the habit", "you left it alone"], 0, "A habit is not a shield. Markets wobble. The habit is still the lesson.", 4),
    ],
  },
  stocks: {
    1: [
      week6Row("A share in one shop, in this story, is…", ["a slice of that one business", "the shop's door key", "a gold coin"], 0, "A share is a slice of the business. It is not the building in your pocket.", 2),
      week6Row("If that one shop closes, the slice can…", ["be worth nothing, in the story", "only rise", "turn into a bag of many shops by itself"], 0, "One business is one story. It can end.", 3),
    ],
    2: [
      week6Row("Slices of many shops, compared with one shop, are…", ["a wider story", "the same risk", "a promise"], 0, "A wider story can fall too. It does not fall for the same single reason.", 3),
    ],
    3: [
      week6Row("A child does not buy a share because a clip said a shop was 'the one' …", ["a parent would have to decide, and a clip is not a plan", "the lesson says to", "clips are the same as a bank"], 0, "A clip is an advert or an opinion. It is not an instruction.", 4),
    ],
  },
  risk: {
    1: [
      week6Row("Money for a coat that is wearing out belongs in…", ["a calm place you can reach", "a pot that might fall by half", "a stranger's link"], 0, "A coat is a need with a date. The wobbly pot is a poor home for it.", 2),
      week6Row("'It might fall' does not mean…", ["it falls every single day on a timetable", "the number of pounds can be smaller later", "you should read the warning"], 0, "Might is a warning, not a diary. The number is not fixed.", 3),
    ],
    2: [
      week6Row("A story that can rise a lot, and can also fall a lot, is…", ["a wild one", "a calm cash pot", "a free gift"], 0, "The wild ones swing both ways. That is the trade.", 3),
    ],
    3: [
      week6Row("You do not put the fare for a school trip in a wild pot because…", ["the trip has a date, and the pot might be smaller that day", "fares are an investment", "a fall is illegal"], 0, "The fare is a need. Needs stay out of the wobbly pot.", 4),
    ],
  },
  mix: {
    1: [
      week6Row("A story pot split between cash and a bag of shops means…", ["some of it is calm and some can wobble", "both parts are the same thing", "the cash becomes shares overnight"], 0, "The calm part is for near dates. The wobbly part is the long story.", 2),
      week6Row("Putting every pound in the one shop you like best means…", ["that shop decides the whole story", "you are safer", "the pot cannot fall"], 0, "One basket is one risk.", 3),
    ],
    2: [
      week6Row("If the wobbly part falls and the cash does not, the whole pot…", ["falls by less than the wobbly part", "must fall by the same percent", "is deleted"], 0, "The cash is still there. That is why a mix is a softer landing.", 3),
    ],
    3: [
      week6Row("Rewriting the mix because of one headline is…", ["letting a noisy day write the plan", "the calm plan", "free"], 0, "The mix was chosen on a quiet day. One headline is not that day.", 4),
    ],
  },
  fees: {
    1: [
      week6Row("A charge taken out of a pot each year is…", ["a fee", "interest arriving", "a badge"], 0, "A fee leaves the pot. It is not growth.", 2),
      week6Row("A fee that looks tiny, taken every year for many years, is…", ["still money leaving, many times", "nothing", "a gift back to you"], 0, "Small and repeated is still a cost.", 3),
    ],
    2: [
      week6Row("A fee of £2 on a £20 story pot is…", ["a tenth of the pot", "nothing", "interest of £2"], 0, "£2 is 10p in every pound of that pot. You can see it without a formula.", 3),
    ],
    3: [
      week6Row("Asking 'what leaves the pot each year?' is…", ["a useful question for a parent", "rude", "the same as picking a winner"], 0, "The cost can be known. The future price cannot.", 4),
    ],
  },
  patience: {
    1: [
      week6Row("The plan you wrote on a quiet day is for…", ["the day you feel like changing everything", "throwing away", "a stranger in a link"], 0, "You wrote it for the noisy day. Read it before you change it.", 2),
      week6Row("These lessons still do not…", ["tell a family to buy anything", "explain that prices can fall", "mention fees"], 0, "Ideas only. A parent decides about real money.", 3),
    ],
    2: [
      week6Row("A bad month for a long pot is…", ["a month, not the end of the plan", "a reason the habit was wrong", "the same as spending the pot"], 0, "The plan expected bad months. A month is not the whole story.", 3),
    ],
    3: [
      week6Row("Changing the long pot because a friend is excited this week…", ["lets someone else's feeling write your plan", "is required by this lesson", "removes fees"], 0, "Excitement is allowed. It is not an instruction. A parent decides.", 4),
    ],
  },
  "i-need": {
    1: [
      week6Row("School shoes that have worn through, and a new game, are…", ["a need and a want", "both needs", "both savings"], 0, "Shoes you can walk to school in are a need. The game can wait.", 2),
      week6Row("The money for a club subscription that is already due stays…", ["with that subscription", "in a story about coins", "in a link a stranger sent"], 0, "A due date is a due date. It is not the long pot.", 2),
    ],
  },
  "i-wait": {
    1: [
      week6Row("Waiting until the weekend before a want means…", ["you can see if you still want it", "the shop must reserve it", "you have broken a rule"], 0, "A few days is a fair test. You can still say yes afterwards.", 2),
      week6Row("A sign that says 'today only' is…", ["the shop hurrying you", "an order", "a bank"], 0, "Hurry is a selling trick. You can still ask and wait.", 2),
    ],
  },
  "i-ask": {
    1: [
      week6Row("A text that says you have won money, and asks for a code, is…", ["shown to a parent, and not answered", "typed into, to be polite", "interest"], 0, "A prize that needs a code is a common trick. Do not send the code.", 2),
      week6Row("A grown-up's card number is…", ["not yours to type", "a handy thing to fill in", "the same as pocket money"], 0, "The card is not yours. Fetch the grown-up. Do not type.", 2),
    ],
  },
};

function installWeek6() {
  if (installWeek6.done) return;
  installWeek6.done = true;

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
    Object.keys(WEEK6_KART).forEach((skill) => {
      if (!GEORGE_KART_BANK[skill]) return;
      Object.keys(WEEK6_KART[skill]).forEach((stage) => {
        pushRows(GEORGE_KART_BANK, skill, Number(stage), WEEK6_KART[skill][stage]);
      });
    });
  }
  if (typeof GEORGE_INVEST_BANK !== "undefined") {
    Object.keys(WEEK6_INVEST).forEach((skill) => {
      if (!GEORGE_INVEST_BANK[skill]) return;
      Object.keys(WEEK6_INVEST[skill]).forEach((stage) => {
        pushRows(GEORGE_INVEST_BANK, skill, Number(stage), WEEK6_INVEST[skill][stage]);
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
      if (q && q.week === 6 && typeof q.ramp !== "number") q.ramp = ramp;
      mod.practice.push(q);
      have.add(key);
    });
  }

  Object.keys(WEEK6_CORE).forEach((subject) => {
    Object.keys(WEEK6_CORE[subject]).forEach((skill) => {
      Object.keys(WEEK6_CORE[subject][skill]).forEach((stage) => {
        pushModuleQuestions(subject, skill, stage, WEEK6_CORE[subject][skill][stage]);
      });
    });
  });

  ["k-brief", "k-rain", "k-cheer"].forEach((skill) => {
    const pack = WEEK6_KART[skill] && WEEK6_KART[skill][1];
    if (!pack) return;
    pushModuleQuestions(
      "karting",
      skill,
      1,
      pack.map((row) => week6Multi(row[0], row[1], row[2], row[3]))
    );
  });
  ["i-need", "i-wait", "i-ask"].forEach((skill) => {
    const pack = WEEK6_INVEST[skill] && WEEK6_INVEST[skill][1];
    if (!pack) return;
    pushModuleQuestions(
      "investing",
      skill,
      1,
      pack.map((row) => week6Multi(row[0], row[1], row[2], row[3]))
    );
  });
}

installWeek6();
