/**
 * GCSE lessons (stages 4–6) keep their questions.
 * Two easy warm-ups are added at the front so every level starts gently.
 * A few First steps English questions are marked as the stretch, not the opener.
 */
function gentleTyped(q, answer, explain) {
  return {
    q: q,
    type: "typed",
    answer: String(answer),
    accept: [String(answer)],
    explain: explain,
    stage: "both",
    ramp: 1,
  };
}

function gentleMulti(q, options, answer, explain) {
  return {
    q: q,
    type: "multi",
    options: options,
    answer: answer,
    explain: explain,
    stage: "both",
    ramp: 1,
  };
}

const GENTLE_WARMUPS = {
  4: {
    maths: {
      number: [
        gentleMulti("Which is larger, 400 or 40?", ["400", "40", "they are equal"], 0, "400 is ten times 40."),
        gentleTyped("What is 5 × 20?", "100", "Five twenties are 100."),
      ],
      operations: [
        gentleTyped("What is 9 + 1?", "10", "9 and 1 more is 10."),
        gentleTyped("What is 100 ÷ 10?", "10", "100 shared into 10 is 10 each."),
      ],
      fractions: [
        gentleTyped("What is half of 100?", "50", "100 split into 2 equal groups is 50."),
        gentleTyped("What is 50% of 10?", "5", "50% is a half. Half of 10 is 5."),
      ],
      algebra: [
        gentleTyped("If x = 3, what is x + 2?", "5", "3 + 2 = 5."),
        gentleTyped("What is 4 × 2?", "8", "Four twos are 8."),
      ],
      geometry: [
        gentleTyped("How many degrees are in a right angle?", "90", "A right angle is 90 degrees."),
        gentleTyped("A square has sides of 1 cm. What is the perimeter in cm?", "4", "1 + 1 + 1 + 1 = 4 cm."),
      ],
      data: [
        gentleMulti("Which is the biggest of 2, 9 and 4?", ["2", "9", "4"], 1, "9 is the biggest."),
        gentleMulti("10 goals or 1 goal. Which is more?", ["10 goals", "1 goal", "the same"], 0, "10 is more than 1."),
      ],
    },
    english: {
      grammar: [
        gentleMulti(
          "Which sentence is complete?",
          ["The bell rang.", "Rang loudly", "Because the bell"],
          0,
          "It has a who and what happened."
        ),
        gentleMulti("We ___ ready.", ["were", "was", "be"], 0, "We takes were."),
      ],
      punctuation: [
        gentleMulti(
          "Which ends with a full stop?",
          ["The lab was quiet.", "The lab was quiet?", "the lab was quiet"],
          0,
          "A telling sentence ends with a full stop."
        ),
        gentleMulti("Can't means…", ["cannot", "can it", "can two"], 0, "The apostrophe shows missing letters."),
      ],
      vocabulary: [
        gentleMulti("Swift means…", ["fast", "slow", "heavy"], 0, "Swift means fast."),
        gentleMulti("The opposite of early is…", ["late", "soon", "morning"], 0, "Late is the opposite of early."),
      ],
      reading: [
        gentleMulti(
          "The beaker was empty. Was there liquid in it?",
          ["No", "Yes, it was full", "It was a pony"],
          0,
          "Empty means there was nothing in it."
        ),
        gentleMulti(
          "She underlined the date. What did she underline?",
          ["The date", "The window", "A verb chart"],
          0,
          "The sentence says she underlined the date."
        ),
      ],
      writing: [
        gentleMulti(
          "Which line compares the graph using like?",
          ["The graph was like a staircase.", "The graph was neat.", "Graph"],
          0,
          "Like compares the graph to a staircase."
        ),
        gentleMulti(
          "Which line about the result is a full sentence?",
          ["The result surprised her.", "Surprised her", "Result"],
          0,
          "It says who and what happened."
        ),
      ],
    },
    science: {
      biology: [
        gentleMulti("Which organ pumps blood?", ["Heart", "Shoe", "Ruler"], 0, "The heart pumps blood."),
        gentleMulti("A plant needs light and…", ["water", "a helmet", "a comma"], 0, "Plants need light and water."),
      ],
      chemistry: [
        gentleMulti("A cube of ice kept in the freezer is a…", ["solid", "gas only", "type of force"], 0, "Ice keeps its shape. It is a solid."),
        gentleMulti("Boiling turns a liquid into a…", ["gas", "wooden block", "magnet"], 0, "Boiling makes a gas."),
      ],
      physics: [
        gentleMulti("A dropped ball falls…", ["down", "up forever", "into a sentence"], 0, "Gravity pulls it down."),
        gentleMulti("A push is a…", ["force", "noun only", "full stop"], 0, "Pushes and pulls are forces."),
      ],
      method: [
        gentleMulti(
          "A fair test changes…",
          ["one thing", "every thing at once", "the date after you finish"],
          0,
          "Change one thing so you know what mattered."
        ),
        gentleMulti(
          "You should record…",
          ["what you measured", "what you wish", "nothing"],
          0,
          "Write the measurement you actually took."
        ),
      ],
    },
  },
  5: {
    maths: {
      number: [
        gentleTyped("What is 25% of 100?", "25", "25% is a quarter. A quarter of 100 is 25."),
        gentleMulti("Which is bigger, 0.5 or 0.05?", ["0.5", "0.05", "they are equal"], 0, "0.5 is five tenths. 0.05 is five hundredths."),
      ],
      operations: [
        gentleTyped("What is 12 × 2?", "24", "Twelve twos are 24."),
        gentleTyped("What is 30 − 10?", "20", "30 take away 10 is 20."),
      ],
      fractions: [
        gentleTyped("What is 1/4 of 40?", "10", "40 ÷ 4 = 10."),
        gentleTyped("What is 10% of 200?", "20", "200 ÷ 10 = 20."),
      ],
      algebra: [
        gentleTyped("If y = 10, what is y − 4?", "6", "10 − 4 = 6."),
        gentleTyped("□ + 5 = 9. What is □?", "4", "4 and 5 make 9."),
      ],
      geometry: [
        gentleTyped("How many sides does a hexagon have?", "6", "A hexagon has 6 sides."),
        gentleTyped("A rectangle is 2 cm by 2 cm. What is the area in square cm?", "4", "2 × 2 = 4."),
      ],
      data: [
        gentleTyped("The numbers are 5, 5 and 8. Which appears most?", "5", "5 appears twice."),
        gentleTyped("What is the range of 1 and 6?", "5", "6 − 1 = 5."),
      ],
    },
    english: {
      grammar: [
        gentleMulti("She ___ singing.", ["is", "are", "be"], 0, "She takes is."),
        gentleMulti("Which of these words names a place?", ["laboratory", "slowly", "and"], 0, "A laboratory is a place, so it is a noun."),
      ],
      punctuation: [
        gentleMulti(
          "Which is a question?",
          ["Did the salt dissolve?", "The salt dissolved.", "Salt"],
          0,
          "It asks something and ends with a question mark."
        ),
        gentleMulti("It's means…", ["it is", "it was never", "its belonging only"], 0, "It's is short for it is."),
      ],
      vocabulary: [
        gentleMulti("Brief means…", ["short", "enormous", "angry"], 0, "Brief means short."),
        gentleMulti("The opposite of increase is…", ["decrease", "grow", "double"], 0, "Decrease means go down."),
      ],
      reading: [
        gentleMulti(
          "The thermometer read 21°C. What did it read?",
          ["21°C", "A poem", "Nothing"],
          0,
          "The sentence gives the reading."
        ),
        gentleMulti(
          "He frowned at the broken beaker. How does he seem?",
          ["Unhappy about the break", "Delighted", "Asleep"],
          0,
          "A frown suggests he is not pleased."
        ),
      ],
      writing: [
        gentleMulti(
          "Which opener sets a scene?",
          ["Rain tapped the lab window.", "This is a paragraph.", "Words."],
          0,
          "The rain gives a place and a mood."
        ),
        gentleMulti(
          "Which line compares the acid using as?",
          ["The acid was as clear as water.", "The acid was clear.", "Acid"],
          0,
          "As… as makes a simile."
        ),
      ],
    },
    science: {
      biology: [
        gentleMulti("Lungs are for…", ["breathing", "dissolving sugar", "rounding numbers"], 0, "Lungs help you breathe."),
        gentleMulti("A food chain starts with a…", ["plant", "plastic cup", "full stop"], 0, "Plants make the food."),
      ],
      chemistry: [
        gentleMulti("Melting is solid to…", ["liquid", "a new element always", "a sound"], 0, "Melting makes a liquid."),
        gentleMulti("A gas spreads out to…", ["fill the space", "keep one rigid shape", "become a horse"], 0, "Gas particles move to fill the container."),
      ],
      physics: [
        gentleTyped(
          "A trolley rolls 8 metres in 2 seconds. What is the speed in metres per second?",
          "4",
          "8 ÷ 2 = 4 metres each second."
        ),
        gentleMulti("An open switch means the bulb is…", ["off", "definitely on", "a solid"], 0, "A gap stops the circuit."),
      ],
      method: [
        gentleMulti(
          "The thing you measure is the result. In a plant test that might be the…",
          ["height", "hope", "title"],
          0,
          "Height is something you can measure."
        ),
        gentleMulti(
          "Repeating a test helps you check…",
          ["whether the result holds", "your favourite colour", "the date only"],
          0,
          "A repeat shows if you get a similar result."
        ),
      ],
    },
  },
  6: {
    maths: {
      number: [
        gentleTyped("What is 1% of 200?", "2", "1% is divide by 100. 200 ÷ 100 = 2."),
        gentleTyped("Round 3.2 to the nearest whole number.", "3", "3.2 is closer to 3 than to 4."),
      ],
      operations: [
        gentleTyped("What is 15 × 2?", "30", "Fifteen twos are 30."),
        gentleTyped("What is 7 × 0?", "0", "Anything times 0 is 0."),
      ],
      fractions: [
        gentleTyped("What is 1/5 of 100?", "20", "100 ÷ 5 = 20."),
        gentleMulti("Which is larger?", ["3/4", "1/4", "they are equal"], 0, "3/4 is three of the four pieces."),
      ],
      algebra: [
        gentleTyped("If a = 8, what is a ÷ 2?", "4", "8 ÷ 2 = 4."),
        gentleTyped("2 × □ = 10. What is □?", "5", "2 groups of 5 make 10."),
      ],
      geometry: [
        gentleTyped("Angles on a straight line add up to how many degrees?", "180", "A straight line is 180 degrees."),
        gentleTyped("A rectangle is 6 cm by 1 cm. What is the area in square cm?", "6", "6 × 1 = 6."),
      ],
      data: [
        gentleTyped("The mean of 10 and 20 is…", "15", "10 + 20 = 30, and 30 ÷ 2 = 15."),
        gentleMulti("A certain event has a chance of…", ["1", "0", "a half only always"], 0, "Certain means it will happen. The probability is 1."),
      ],
    },
    english: {
      grammar: [
        gentleMulti(
          "Which is a full sentence?",
          ["The evidence supports the claim.", "Supports the claim", "Because the evidence"],
          0,
          "It can stand alone."
        ),
        gentleMulti("They ___ finished.", ["have", "has", "haves"], 0, "They takes have."),
      ],
      punctuation: [
        gentleMulti(
          "Which uses a colon to introduce a list? Pick the fair one.",
          ["She needed three things: a pen, a ruler and a watch.", "She needed: things", "Things she needed"],
          0,
          "The colon comes after a complete idea, then the list."
        ),
        gentleMulti("A question mark belongs on…", ["a question", "every sentence", "a list only"], 0, "Questions ask something."),
      ],
      vocabulary: [
        gentleMulti("Precise means…", ["exact", "vague", "late"], 0, "Precise means exact."),
        gentleMulti("The opposite of ancient is…", ["modern", "old", "historic"], 0, "Modern is the opposite of ancient."),
      ],
      reading: [
        gentleMulti(
          "The writer says the room was 'airless'. The room felt…",
          ["stifling", "windy and huge", "underwater only"],
          0,
          "Airless suggests it was hard to breathe, close and stifling."
        ),
        gentleMulti(
          "Quote the fact: 'The trial lasted six days.' How long was the trial?",
          ["Six days", "Six years", "It does not say"],
          0,
          "The sentence states six days."
        ),
      ],
      writing: [
        gentleMulti(
          "Which sentence states a paragraph's main idea?",
          ["Regular practice builds fluency.", "Then we did a thing.", "Bye."],
          0,
          "It tells the reader what the paragraph will show."
        ),
        gentleMulti(
          "Which line says the paragraph was a door, with no like or as?",
          ["The last paragraph was a door closing.", "The paragraph was like a door.", "Paragraph"],
          0,
          "It says the paragraph was a door, without like or as."
        ),
      ],
    },
    science: {
      biology: [
        gentleMulti(
          "Mitochondria are linked with…",
          ["releasing energy", "making full stops", "painting fences"],
          0,
          "Mitochondria are where cells release energy."
        ),
        gentleMulti("A producer in a food chain is usually a…", ["plant", "fox", "rock"], 0, "Plants produce food."),
      ],
      chemistry: [
        gentleMulti(
          "An element contains…",
          ["one type of atom", "a mixture by definition", "only electricity"],
          0,
          "An element is one type of atom."
        ),
        gentleTyped("What is the pH of a neutral solution such as pure water?", "7", "Neutral is pH 7."),
      ],
      physics: [
        gentleTyped("A force of 4 N acts on a mass of 2 kg. What is the acceleration in m/s²?", "2", "a = F ÷ m = 4 ÷ 2 = 2."),
        gentleMulti("Speed is distance divided by…", ["time", "colour", "a comma"], 0, "Speed = distance ÷ time."),
      ],
      method: [
        gentleMulti(
          "An anomaly is a result that…",
          ["does not fit the pattern", "is always the mean", "is the title"],
          0,
          "An anomaly looks odd compared with the other results."
        ),
        gentleMulti(
          "A line graph suits data that…",
          ["changes continuously", "is only a list of names", "cannot be measured"],
          0,
          "Continuous change, such as temperature over time, suits a line."
        ),
      ],
    },
  },
};

const STAGE1_STRETCH = [
  "plural belonging",
  "correct spelling?",
  "'scarce' means",
  "antonym of 'generous'",
  "'fragile' means",
  "which word is most precise",
  "which uses personification",
  "which sentence shows alliteration",
  "a rhetorical question",
  "best concluding sentence",
  "best topic sentence about recycling",
  "what is inference?",
  "antonym of ancient?",
  "which word is an adverb?",
];

const STAGE1_EASY = {
  grammar: [
    gentleMulti(
      "Which line starts with a capital and ends with a full stop?",
      ["The pony ran.", "the pony ran", "the pony ran.", "The pony ran"],
      0,
      "A telling sentence starts with a capital and ends with a full stop."
    ),
    gentleMulti(
      "In 'The dog ran home', who ran?",
      ["The dog", "Home", "The full stop"],
      0,
      "The dog is the one who did the running."
    ),
  ],
  punctuation: [
    gentleMulti(
      "Which mark ends a telling sentence?",
      ["A full stop", "A question mark always", "Nothing"],
      0,
      "Telling sentences end with a full stop."
    ),
    gentleMulti("What does don't mean?", ["do not", "do a knot", "doughnut"], 0, "Don't is short for do not."),
  ],
  vocabulary: [
    gentleMulti("Big and large mean…", ["almost the same", "the opposite", "nothing"], 0, "They are a pair of similar words."),
    gentleMulti("The opposite of day is…", ["night", "morning", "noon"], 0, "Night is the opposite of day."),
  ],
  reading: [
    gentleMulti(
      "The cat sat on the mat. Where did the cat sit?",
      ["On the mat", "In the sky", "Under the sea"],
      0,
      "The sentence says the cat sat on the mat."
    ),
    gentleMulti(
      "Sam grinned. A grin shows he is…",
      ["pleased", "a triangle", "asleep"],
      0,
      "A grin is a smile. He is pleased."
    ),
  ],
  writing: [
    gentleMulti(
      "Which line is a complete sentence?",
      ["Bella brushed the pony.", "Brushed the pony", "Bella"],
      0,
      "It says who and what she did."
    ),
    gentleMulti(
      "Which line uses like?",
      ["The reins were like ribbons.", "The reins were leather.", "Reins"],
      0,
      "Like compares the reins to ribbons."
    ),
  ],
};

/** A few later-stage "warm-ups" are still GCSE facts. They climb after a genuine easy start. */
const LATER_STEP_UP = [
  "what is 1% of 200",
  "round 3.2",
  "mitochondria",
  "a force of 4 n",
  "which uses a colon",
  "the writer says the room was",
  "which line says the paragraph was a door",
  "an anomaly is",
  "an element contains",
  "what is the ph",
  "a line graph suits",
  "a certain event",
  "the mean of 10 and 20",
];

const OPENER = {
  maths: {
    point: "Warm-up first: a sum you can already do. Harder lines come after that.",
    step: "Do the small sum first. Then try the harder line.",
  },
  english: {
    point: "Warm-up first: a short sentence you can already read. Harder writing comes after that.",
    step: "Read the short, clear sentence first. Then try the harder line.",
  },
  science: {
    point: "Warm-up first: a science fact you already know. The harder idea comes after that.",
    step: "Name the everyday thing first. Then try the harder word.",
  },
};

/** Two more easy questions so an Easier lesson is a proper warm-up, not two sums then GCSE. */
const EXTRA_WARMUPS = {
  4: {
    maths: {
      number: [
        gentleTyped("What is 2 × 50?", "100", "Two fifties are 100."),
        gentleMulti("Which is smaller, 60 or 16?", ["16", "60", "they are equal"], 0, "16 is smaller than 60."),
      ],
      operations: [
        gentleTyped("What is 13 + 2?", "15", "13 and 2 more is 15."),
        gentleTyped("What is 9 × 1?", "9", "A number times 1 stays the same."),
      ],
      fractions: [
        gentleTyped("What is half of 24?", "12", "24 split into 2 is 12."),
        gentleTyped("What is one quarter of 36?", "9", "36 shared into 4 is 9."),
      ],
      algebra: [
        gentleTyped("What is 8 + 2?", "10", "8 and 2 make 10."),
        gentleTyped("If x = 1, what is x + 6?", "7", "1 + 6 = 7."),
      ],
      geometry: [
        gentleTyped("A rectangle has how many corners?", "4", "A rectangle has 4 corners."),
        gentleTyped("A square has sides of 2 cm. What is the perimeter in cm?", "8", "2 + 2 + 2 + 2 = 8 cm."),
      ],
      data: [
        gentleMulti("Which is the smallest of 8, 3 and 6?", ["8", "3", "6"], 1, "3 is the smallest."),
        gentleTyped("What number comes after 19?", "20", "19, then 20."),
      ],
    },
    english: {
      grammar: [
        gentleMulti("The dogs ___ barking.", ["are", "is", "be"], 0, "Dogs means more than one, so we use are."),
        gentleMulti("Which word names a person?", ["driver", "quickly", "and"], 0, "A driver is a person."),
      ],
      punctuation: [
        gentleMulti(
          "Which of these is a question?",
          ["Where is the helmet?", "The helmet is here.", "Helmet"],
          0,
          "It asks something."
        ),
        gentleMulti("I've means…", ["I have", "I very", "I of"], 0, "I've is short for I have."),
      ],
      vocabulary: [
        gentleMulti("Tiny means…", ["very small", "very loud", "very old"], 0, "Tiny means very small."),
        gentleMulti("The opposite of hot is cold. Cold means…", ["not hot", "boiling", "sunny"], 0, "Cold means not hot."),
      ],
      reading: [
        gentleMulti(
          "The flag was red. What colour was the flag?",
          ["Red", "Blue", "It does not say"],
          0,
          "The sentence says the flag was red."
        ),
        gentleMulti(
          "Bella smiled at the pony. How does Bella seem?",
          ["Pleased", "Furious", "Asleep"],
          0,
          "A smile shows she is pleased."
        ),
      ],
      writing: [
        gentleMulti(
          "Which line about the helmet is a full sentence?",
          ["George checked his helmet.", "Checked his helmet", "Helmet"],
          0,
          "It says who and what he did."
        ),
        gentleMulti(
          "Which line compares the track using like?",
          ["The track was like a ribbon.", "The track was long.", "Track"],
          0,
          "Like compares the track to a ribbon."
        ),
      ],
    },
    science: {
      biology: [
        gentleMulti("Which animal has feathers?", ["A bird", "A fish", "A rock"], 0, "Birds have feathers."),
        gentleMulti("You breathe in with your…", ["lungs", "knees", "hair"], 0, "Lungs take in air."),
      ],
      chemistry: [
        gentleMulti("Water you can pour is a…", ["liquid", "solid only", "sound"], 0, "Water you pour is a liquid."),
        gentleMulti("Steam from a kettle is a…", ["gas", "solid block", "magnet"], 0, "Steam is a gas."),
      ],
      physics: [
        gentleMulti("To light a dark shed you can use a…", ["torch", "spoon", "comma"], 0, "A torch gives light."),
        gentleMulti("A magnet can pull a…", ["steel paperclip", "wooden spoon", "glass of water"], 0, "Magnets pull some metals."),
      ],
      method: [
        gentleMulti(
          "You write a result so you can…",
          ["look back at it", "forget it", "hide the test"],
          0,
          "A written result can be checked later."
        ),
        gentleMulti(
          "In a fair test, the things you do not mean to change should stay…",
          ["the same", "all different", "a secret"],
          0,
          "Keep them the same so the test is fair."
        ),
      ],
    },
  },
  5: {
    maths: {
      number: [
        gentleTyped("What is 10 × 4?", "40", "Four tens are 40."),
        gentleMulti("Which is larger, 0.8 or 0.3?", ["0.8", "0.3", "they are equal"], 0, "0.8 is more than 0.3."),
      ],
      operations: [
        gentleTyped("What is 19 + 1?", "20", "19 and 1 more is 20."),
        gentleTyped("What is 14 ÷ 2?", "7", "14 shared into 2 is 7 each."),
      ],
      fractions: [
        gentleTyped("What is half of 22?", "11", "22 ÷ 2 = 11."),
        gentleTyped("What is 10% of 80?", "8", "80 ÷ 10 = 8."),
      ],
      algebra: [
        gentleTyped("If n = 4, what is n + 3?", "7", "4 + 3 = 7."),
        gentleTyped("What is 5 × 3?", "15", "Five threes are 15."),
      ],
      geometry: [
        gentleTyped("How many sides does a pentagon have?", "5", "A pentagon has 5 sides."),
        gentleTyped("A rectangle is 4 cm by 2 cm. What is the area in square cm?", "8", "4 × 2 = 8."),
      ],
      data: [
        gentleTyped("The numbers are 2, 2 and 9. Which appears most?", "2", "2 appears twice."),
        gentleMulti("Which is more, 12 goals or 7 goals?", ["12 goals", "7 goals", "the same"], 0, "12 is more than 7."),
      ],
    },
    english: {
      grammar: [
        gentleMulti("He ___ a kart.", ["has", "have", "haves"], 0, "He takes has."),
        gentleMulti("Which word names an animal?", ["pony", "slowly", "but"], 0, "A pony is an animal, so it is a noun."),
      ],
      punctuation: [
        gentleMulti(
          "Which mark ends a question?",
          ["A question mark", "A comma always", "Nothing"],
          0,
          "Questions end with a question mark."
        ),
        gentleMulti("Won't means…", ["will not", "will two", "want"], 0, "Won't is short for will not."),
      ],
      vocabulary: [
        gentleMulti("Speedy means…", ["fast", "slow", "heavy"], 0, "Speedy means fast."),
        gentleMulti("The opposite of full is…", ["empty", "overflowing", "heavy"], 0, "Empty is the opposite of full."),
      ],
      reading: [
        gentleMulti("The clock said 3. What time did it say?", ["3", "A poem", "Nothing"], 0, "The sentence says 3."),
        gentleMulti(
          "The pony flicked her ears. She seems…",
          ["alert", "a triangle", "a liquid"],
          0,
          "Flicking her ears shows she is alert."
        ),
      ],
      writing: [
        gentleMulti(
          "Which line about the yard is a full sentence?",
          ["The yard was quiet.", "Was quiet", "Yard"],
          0,
          "It can stand alone."
        ),
        gentleMulti(
          "Which line compares the mane using as?",
          ["The mane was as soft as cotton.", "The mane was soft.", "Mane"],
          0,
          "As… as makes a simile."
        ),
      ],
    },
    science: {
      biology: [
        gentleMulti("Your heart is in your…", ["chest", "boot", "pencil case"], 0, "The heart sits in the chest."),
        gentleMulti("Plants take in light with their…", ["leaves", "roots only always", "hooves"], 0, "Leaves catch the light."),
      ],
      chemistry: [
        gentleMulti(
          "Sugar stirred into tea can…",
          ["dissolve", "become a horse", "turn into a full stop"],
          0,
          "Sugar can dissolve."
        ),
        gentleMulti("A frozen puddle is…", ["ice, a solid", "a gas only", "a force"], 0, "Frozen water is solid ice."),
      ],
      physics: [
        gentleMulti("A closed switch lets the bulb…", ["light", "become a noun", "fall upwards"], 0, "A closed switch completes the loop."),
        gentleTyped(
          "A buggy rolls 10 metres in 2 seconds. What is the speed in metres per second?",
          "5",
          "10 ÷ 2 = 5 metres each second."
        ),
      ],
      method: [
        gentleMulti(
          "If you change two things at once, it is harder to know…",
          ["which change mattered", "your name", "the day of the week"],
          0,
          "Change one thing so the result is clear."
        ),
        gentleMulti(
          "A bar chart is useful for…",
          ["comparing amounts", "rhyming words", "hiding results"],
          0,
          "Bars show amounts side by side."
        ),
      ],
    },
  },
  6: {
    maths: {
      number: [
        gentleTyped("What is 100 × 2?", "200", "Two hundreds are 200."),
        gentleTyped("What is 1 more than 99?", "100", "99, then 100."),
      ],
      operations: [
        gentleTyped("What is 50 − 20?", "30", "50 take away 20 is 30."),
        gentleTyped("What is 6 × 2?", "12", "Six twos are 12."),
      ],
      fractions: [
        gentleTyped("What is half of 50?", "25", "50 ÷ 2 = 25."),
        gentleTyped("What is a quarter of 40?", "10", "40 ÷ 4 = 10."),
      ],
      algebra: [
        gentleTyped("If b = 9, what is b − 1?", "8", "9 − 1 = 8."),
        gentleTyped("4 × □ = 12. What is □?", "3", "4 groups of 3 make 12."),
      ],
      geometry: [
        gentleTyped("How many degrees are in a full turn?", "360", "A full turn is 360 degrees."),
        gentleTyped("A rectangle is 5 cm by 2 cm. What is the area in square cm?", "10", "5 × 2 = 10."),
      ],
      data: [
        gentleTyped("The mean of 4 and 6 is…", "5", "4 + 6 = 10, and 10 ÷ 2 = 5."),
        gentleMulti(
          "Which is more likely on a normal dice, a 6 or a 7?",
          ["A 6", "A 7", "they are the same"],
          0,
          "A dice has a 6. It has no 7."
        ),
      ],
    },
    english: {
      grammar: [
        gentleMulti("I ___ finished the lap.", ["have", "has", "haves"], 0, "I takes have."),
        gentleMulti(
          "Which word names a place on a track?",
          ["hairpin", "quickly", "because"],
          0,
          "A hairpin is a place, so it is a noun."
        ),
      ],
      punctuation: [
        gentleMulti(
          "Which telling sentence is written fairly?",
          ["The result was clear.", "the result was clear", "the result was clear."],
          0,
          "It starts with a capital and ends with a full stop."
        ),
        gentleMulti("They're means…", ["they are", "they were never", "their belonging only"], 0, "They're is short for they are."),
      ],
      vocabulary: [
        gentleMulti("Calm means…", ["settled and quiet", "furious", "tiny"], 0, "Calm means settled and quiet."),
        gentleMulti("The opposite of cheap is…", ["expensive", "free", "small"], 0, "Expensive is the opposite of cheap."),
      ],
      reading: [
        gentleMulti(
          "The marshal waved a yellow flag. What colour was the flag?",
          ["Yellow", "Green", "It does not say"],
          0,
          "The sentence says yellow."
        ),
        gentleMulti(
          "The lap time was 62 seconds. How long was the lap?",
          ["62 seconds", "62 hours", "It does not say"],
          0,
          "The sentence says 62 seconds."
        ),
      ],
      writing: [
        gentleMulti(
          "Which line about practice is a full sentence?",
          ["Regular practice helps.", "Helps a lot", "Practice"],
          0,
          "It can stand alone."
        ),
        gentleMulti(
          "Which line compares the finish using like?",
          ["The finish was like a doorway.", "The finish was close.", "Finish"],
          0,
          "Like compares the finish to a doorway."
        ),
      ],
    },
    science: {
      biology: [
        gentleMulti("Bones are part of the…", ["skeleton", "weather", "times table"], 0, "Bones make the skeleton."),
        gentleMulti("A herbivore eats…", ["plants", "only electricity", "full stops"], 0, "A herbivore eats plants."),
      ],
      chemistry: [
        gentleMulti("The air we breathe is a…", ["gas", "wooden block", "ruler"], 0, "Air is a gas."),
        gentleMulti(
          "Table salt dissolved in water can be…",
          ["still there, even if you cannot see it", "gone from the universe", "a type of force"],
          0,
          "Dissolved salt is still in the water."
        ),
      ],
      physics: [
        gentleMulti("Sound travels as a…", ["vibration", "colour only", "comma"], 0, "Sound is a vibration."),
        gentleTyped(
          "A kart travels 20 metres in 4 seconds. What is the speed in metres per second?",
          "5",
          "20 ÷ 4 = 5 metres each second."
        ),
      ],
      method: [
        gentleMulti(
          "A prediction is what you think will…",
          ["happen", "rhyme", "be the title only"],
          0,
          "A prediction says what you expect."
        ),
        gentleMulti(
          "Measuring in centimetres is better than guessing because it is…",
          ["the same whoever measures", "a secret", "a story"],
          0,
          "A measurement can be checked by someone else."
        ),
      ],
    },
  },
};

function installGentleRamp() {
  if (installGentleRamp.done) return;
  installGentleRamp.done = true;

  function prepend(mod, items) {
    if (!mod) return;
    if (!Array.isArray(mod.practice)) mod.practice = [];
    const have = new Set(mod.practice.map((q) => String((q && q.q) || "").trim().toLowerCase()));
    const add = items.filter((q) => q && q.q && !have.has(String(q.q).trim().toLowerCase()));
    if (add.length) mod.practice = add.concat(mod.practice);
  }

  if (typeof TEACH_MODULES !== "undefined" && TEACH_MODULES.english) {
    Object.keys(STAGE1_EASY).forEach((skill) => {
      const mod = TEACH_MODULES.english[skill];
      prepend(mod, STAGE1_EASY[skill]);
      if (!mod || !mod.practice) return;
      mod.practice.forEach((q) => {
        const text = String((q && q.q) || "").trim().toLowerCase();
        if (STAGE1_STRETCH.some((bit) => text.startsWith(bit))) q.ramp = 3;
      });
    });
  }

  [4, 5, 6].forEach((stage) => {
    const bank = typeof getStageTeachBank === "function" ? getStageTeachBank(stage) : null;
    const pack = GENTLE_WARMUPS[stage];
    if (!bank || !pack) return;
    Object.keys(pack).forEach((subject) => {
      Object.keys(pack[subject]).forEach((skill) => {
        const mod = bank[subject] && bank[subject][skill];
        if (!mod || !Array.isArray(mod.practice)) return;
        const existing = mod.practice.filter((q) => !(q && q.ramp === 1 && q.explain));
        const n = mod.practice.length;
        mod.practice.forEach((q, i) => {
          if (!q || typeof q.ramp === "number" || q.week) return;
          const t = n <= 1 ? 1 : i / (n - 1);
          q.ramp = t < 0.45 ? 2 : 3;
        });
        prepend(mod, pack[subject][skill]);
        const extra = EXTRA_WARMUPS[stage] && EXTRA_WARMUPS[stage][subject] && EXTRA_WARMUPS[stage][subject][skill];
        if (extra) prepend(mod, extra);
        if (stage >= 6) {
          mod.practice.forEach((q) => {
            const text = String((q && q.q) || "").trim().toLowerCase();
            if (LATER_STEP_UP.some((bit) => text.startsWith(bit))) q.ramp = 2;
          });
        }
        const open = OPENER[subject];
        if (open && mod.teach && Array.isArray(mod.teach.points) && mod.teach.points[0] !== open.point) {
          mod.teach.points = [open.point].concat(mod.teach.points);
        }
        if (open && mod.example && Array.isArray(mod.example.steps) && mod.example.steps[0] !== open.step) {
          mod.example.steps = [open.step].concat(mod.example.steps);
        }
        void existing;
      });
    });
  });
}

installGentleRamp();
