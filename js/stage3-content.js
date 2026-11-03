/**
 * Secure (Stage 3) — still starts easy, then a clearer step up.
 * Not GCSE yet. One stretch question sits at the end of each lesson.
 */

function s3Typed(q, answer, explain, ramp) {
  return {
    q: q,
    type: "typed",
    answer: String(answer),
    accept: [String(answer)],
    explain: explain,
    stage: "both",
    ramp: ramp,
  };
}

function s3Multi(q, options, answer, explain, ramp) {
  return {
    q: q,
    type: "multi",
    options: options,
    answer: answer,
    explain: explain,
    stage: "both",
    ramp: ramp,
  };
}

const TEACH_MODULES_STAGE3 = {
  maths: {
    number: {
      title: "Tens, rounding, a cold morning",
      blurb: "10 less, round to the nearest 10, then a first negative.",
      videoKey: "placevalue",
      teach: {
        points: [
          "10 less than 70 is 60.",
          "32 is nearer to 30 than to 40, so it rounds to 30.",
          "A negative temperature is below 0. −2 and 5 more lands on 3.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Start at −2.", "Count up 5: −1, 0, 1, 2, 3.", "You land on 3."],
      },
      practice: [
        s3Typed("What is 10 less than 70?", "60", "70 take away 10 is 60.", 1),
        s3Typed("Round 32 to the nearest 10.", "30", "32 is closer to 30 than to 40.", 1),
        s3Multi("Which of these is a factor of 10?", ["5", "3", "4", "6"], 0, "5 goes into 10 exactly. 10 ÷ 5 = 2.", 2),
        s3Typed(
          "The temperature is −2 degrees. It rises by 5 degrees. What is it now?",
          "3",
          "From −2, five steps up pass 0 and land on 3.",
          3
        ),
      ],
      struggle: {
        points: ["10 less means the tens digit drops by 1."],
        practice: [s3Typed("What is 10 less than 40?", "30", "40 take away 10 is 30.", 0)],
      },
    },
    operations: {
      title: "A little order",
      blurb: "Bigger adding, then times before adding, with tiny numbers.",
      videoKey: "multiply",
      teach: {
        points: [
          "24 and 10 more is 34.",
          "When a sum has × and +, do the × first.",
          "Brackets mean do the inside first.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["5 + 2 × 3.", "Times first: 2 × 3 = 6.", "Then 5 + 6 = 11."],
      },
      practice: [
        s3Typed("What is 24 + 10?", "34", "24 and 10 more is 34.", 1),
        s3Typed("What is 6 × 3?", "18", "Six groups of 3 make 18.", 1),
        s3Typed("Work out 5 + 2 × 3. Do the times first.", "11", "2 × 3 = 6, then 5 + 6 = 11.", 2),
        s3Typed("Work out (10 + 6) ÷ 2.", "8", "Brackets first: 16. Then 16 ÷ 2 = 8.", 3),
      ],
      struggle: {
        points: ["Circle the × and do that bit first."],
        practice: [s3Typed("Work out 1 + 2 × 2. Do the times first.", "5", "2 × 2 = 4, then 1 + 4 = 5.", 0)],
      },
    },
    fractions: {
      title: "Half, and 10%",
      blurb: "Halves of bigger numbers, then 10% as divide by 10.",
      videoKey: "fractions",
      teach: {
        points: [
          "Half of 30 is 15.",
          "10% means divide by 10. 10% of 50 is 5.",
          "A price that is £4 cheaper means take £4 away.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["10% of 50.", "50 ÷ 10 = 5.", "So 10% is £5 if we were talking about money."],
      },
      practice: [
        s3Typed("What is half of 30?", "15", "30 split into 2 equal groups is 15.", 1),
        s3Typed("What is 10% of 50?", "5", "10% means divide by 10. 50 ÷ 10 = 5.", 1),
        s3Typed("What is 1/2 of 22?", "11", "One half of 22 is 22 ÷ 2 = 11.", 2),
        s3Typed(
          "A hat costs £20. The sale takes £4 off. What is the new price in pounds?",
          "16",
          "20 take away 4 is 16, so the hat costs £16.",
          3
        ),
      ],
      struggle: {
        points: ["10% is the same as dividing by 10."],
        practice: [s3Typed("What is 10% of 20?", "2", "20 ÷ 10 = 2.", 0)],
      },
    },
    algebra: {
      title: "What do you add?",
      blurb: "Missing numbers in a sentence. Still no letters.",
      videoKey: "algebra",
      teach: {
        points: [
          "Ask the question in words: what do you add to 40 to make 100?",
          "Count on from 40: 50, 60, 70, 80, 90, 100. That is 60.",
          "Letters that stand for numbers wait until secondary school.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["You have 25.", "You want 30.", "25 and 5 make 30, so you add 5."],
      },
      practice: [
        s3Typed("What do you add to 40 to make 100?", "60", "40 and 60 make 100.", 1),
        s3Typed("What do you take from 50 to leave 35?", "15", "50 take away 15 is 35.", 1),
        s3Typed("What is double 16?", "32", "16 and 16 make 32.", 2),
        s3Typed("What do you add to 75 to make 100?", "25", "75 and 25 make 100.", 3),
      ],
      struggle: {
        points: ["Say the sentence out loud. Then count on."],
        practice: [s3Typed("What do you add to 25 to make 30?", "5", "25 and 5 make 30.", 0)],
      },
    },
    geometry: {
      title: "Around and inside",
      blurb: "Perimeter, then area as rows of squares, with small shapes.",
      videoKey: "angles",
      teach: {
        points: [
          "A square with sides of 3 cm has perimeter 3 + 3 + 3 + 3.",
          "Area of a rectangle is length times width. 4 cm by 3 cm is 12 square cm.",
          "A rectangle has 4 right angles. Angles in a triangle add up to 180°.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["A rectangle 4 cm by 3 cm.", "4 rows of 3 squares.", "4 × 3 = 12 square cm."],
      },
      practice: [
        s3Typed(
          "A square has sides of 3 cm. What is the perimeter in cm?",
          "12",
          "3 + 3 + 3 + 3 = 12 cm.",
          1
        ),
        s3Typed(
          "A rectangle is 4 cm by 3 cm. What is the area in square cm?",
          "12",
          "4 × 3 = 12 square centimetres.",
          2
        ),
        s3Typed("How many right angles does a rectangle have?", "4", "Each corner of a rectangle is a right angle.", 2),
        s3Typed(
          "A triangle has angles of 70 degrees and 50 degrees. What is the third angle?",
          "60",
          "Angles in a triangle add to 180. 180 − 70 − 50 = 60.",
          3
        ),
      ],
      struggle: {
        points: ["Add the sides you can see for a perimeter."],
        practice: [
          s3Typed("A square has sides of 2 cm. What is the perimeter in cm?", "8", "2 + 2 + 2 + 2 = 8 cm.", 0),
        ],
      },
    },
    data: {
      title: "Share, most, and chance",
      blurb: "A simple average, the most common number, then one chance.",
      videoKey: "averages",
      teach: {
        points: [
          "To find the mean, add the numbers and share by how many there are.",
          "The mode is the number that appears most.",
          "One red section on a spinner of 4 equal colours is a 1 in 4 chance.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Scores 2, 4 and 6.", "2 + 4 + 6 = 12.", "3 numbers, so 12 ÷ 3 = 4."],
      },
      practice: [
        s3Typed(
          "The scores are 2, 4 and 6. Add them and share into 3. What is each share?",
          "4",
          "12 shared into 3 is 4. That share is the mean.",
          1
        ),
        s3Typed("Which number appears most: 3, 5, 5 and 8?", "5", "5 appears twice. The others appear once.", 2),
        s3Typed(
          "The numbers are 4, 10 and 6. What is the range?",
          "6",
          "Range is biggest minus smallest. 10 − 4 = 6.",
          2
        ),
        s3Multi(
          "A spinner has 4 equal colours and one of them is red. The chance of red is…",
          ["1 out of 4", "4 out of 1", "certain", "impossible"],
          0,
          "One red part out of four equal parts is a 1 in 4 chance.",
          3
        ),
      ],
      struggle: {
        points: ["Add, then share fairly."],
        practice: [
          s3Typed("The scores are 1, 2 and 3. What is the mean?", "2", "1 + 2 + 3 = 6, and 6 ÷ 3 = 2.", 0),
        ],
      },
    },
  },
  english: {
    grammar: {
      title: "Sentences that hold together",
      blurb: "Were or was, find the verb, then a piece that cannot stand alone.",
      videoKey: "grammar",
      teach: {
        points: [
          "We were late, not we was late. We is more than one.",
          "The verb is the doing word: steered, ate, ran.",
          "Because the rain started needs a main sentence beside it.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["George steered the kart.", "Steered is the doing word.", "That is the verb."],
      },
      practice: [
        s3Multi(
          "Which sentence is right?",
          ["We were late.", "We was late.", "We be late."],
          0,
          "We is plural, so the verb is were.",
          1
        ),
        s3Multi(
          "Which word is the verb in 'George steered the kart'?",
          ["George", "steered", "the", "kart"],
          1,
          "Steered is what George did.",
          1
        ),
        s3Multi(
          "Which piece cannot stand alone as a sentence?",
          ["Because the rain started", "The rain started.", "Bella shut the gate."],
          0,
          "Because… needs the rest of the idea. It is not a whole sentence.",
          3
        ),
      ],
      struggle: {
        points: ["If you can ask 'did what?', the answer is the verb."],
        practice: [
          s3Multi("I ___ happy.", ["am", "are"], 0, "I takes am.", 0),
        ],
      },
    },
    punctuation: {
      title: "Lists and a trickier apostrophe",
      blurb: "Commas in a new list, then one plural apostrophe.",
      videoKey: "punctuation",
      teach: {
        points: [
          "Commas separate items in a list. The last pair can use and.",
          "They're means they are.",
          "More than one girl: the girls' stable. The apostrophe sits after the s.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["One girl: the girl's hat.", "More than one girl: the girls' stable.", "The apostrophe moves after the s."],
      },
      practice: [
        s3Multi(
          "Which sentence uses commas in a list?",
          [
            "She packed hay, a brush and a lead rope.",
            "She packed hay a brush and a lead rope.",
            "She packed, hay a brush and a lead rope",
          ],
          0,
          "Commas split the items. And joins the last pair.",
          1
        ),
        s3Multi("They're is short for…", ["they are", "they were", "there is"], 0, "They're means they are.", 2),
        s3Multi(
          "More than one girl owns the stable. Which is right?",
          ["the girls' stable", "the girl's stable", "the girls stable'"],
          0,
          "Plural girls already ends in s, so the apostrophe comes after it.",
          3
        ),
      ],
      struggle: {
        points: ["Read the list out loud. Pause where a comma goes."],
        practice: [
          s3Multi(
            "Which list needs commas?",
            ["hats gloves boots", "hats, gloves and boots"],
            1,
            "The second list separates the items.",
            0
          ),
        ],
      },
    },
    vocabulary: {
      title: "Quiet words, then a rarer one",
      blurb: "Words you know, then one that means 'not many'.",
      videoKey: "reading",
      teach: {
        points: [
          "Silent means quiet.",
          "The opposite of empty is full.",
          "Scarce means there are not many.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["The yard was silent.", "Silent means quiet.", "You could picture a still yard."],
      },
      practice: [
        s3Multi("Silent means…", ["quiet", "noisy", "late"], 0, "Silent means quiet.", 1),
        s3Multi("The opposite of empty is…", ["full", "hollow", "missing"], 0, "Full is the opposite of empty.", 1),
        s3Multi("Scarce means…", ["not many", "very loud", "easy to find"], 0, "If something is scarce, there is not much of it.", 3),
      ],
      struggle: {
        points: ["Opposite means the other end."],
        practice: [s3Multi("The opposite of up is…", ["down", "higher", "sky"], 0, "Down is the opposite of up.", 0)],
      },
    },
    reading: {
      title: "The light came on",
      blurb: "Find the fact, then one reason.",
      videoKey: "reading",
      teach: {
        points: [
          "The first question asks for something the sentence says.",
          "The next question asks why. Use the clue.",
          "A blink after a light comes on suggests the light was sudden.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Bella switched on the light and the pony blinked.",
          "What did she switch on? The light.",
          "Why blink? The light was sudden.",
        ],
      },
      practice: [
        s3Multi(
          "The yard was dark. Bella switched on the light. What did she switch on?",
          ["The light", "The radio", "The rain"],
          0,
          "The sentence says she switched on the light.",
          1
        ),
        s3Multi(
          "The pony blinked when the light came on. Why?",
          ["The light was sudden", "It was time for maths", "The gate was a simile"],
          0,
          "A sudden light makes you blink.",
          3
        ),
      ],
      struggle: {
        points: ["Use the words in the sentence first."],
        practice: [
          s3Multi(
            "The stable door was shut. Was the door open?",
            ["No", "Yes"],
            0,
            "Shut means it was not open.",
            0
          ),
        ],
      },
    },
    writing: {
      title: "Picture, then the main idea",
      blurb: "A simile, a strong verb, then a sentence that introduces a topic.",
      videoKey: "writing",
      teach: {
        points: [
          "A simile uses like or as.",
          "Shot is a stronger verb than went.",
          "A topic sentence says what the paragraph is about.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["A helmet keeps your head safe.", "That sentence tells you the paragraph is about helmets.", "It is a topic sentence."],
      },
      practice: [
        s3Multi(
          "Which line compares the mane using like?",
          ["The mane was like silk.", "The mane was long.", "Mane"],
          0,
          "Like compares the mane to silk.",
          1
        ),
        s3Multi(
          "Which verb is stronger?",
          ["The kart shot down the straight.", "The kart went.", "The kart."],
          0,
          "Shot helps the reader see the speed.",
          2
        ),
        s3Multi(
          "Which sentence introduces a paragraph about helmets?",
          ["A helmet keeps your head safe.", "I like toast.", "The end."],
          0,
          "It states the main idea before the details.",
          3
        ),
      ],
      struggle: {
        points: ["Look for like or as."],
        practice: [
          s3Multi(
            "Which line is a simile?",
            ["as quiet as a mouse", "very quiet", "quiet"],
            0,
            "As… as makes a simile.",
            0
          ),
        ],
      },
    },
  },
  science: {
    biology: {
      title: "Food, breath, a cell",
      blurb: "Body jobs you know, then one new word: nucleus.",
      videoKey: "photosynthesis",
      teach: {
        points: [
          "Your stomach helps digest food.",
          "Plants make food using light. That process is called photosynthesis.",
          "A cell's control centre is the nucleus.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Think of a cell as a tiny room.", "The nucleus is in charge.", "It is the control centre."],
      },
      practice: [
        s3Multi(
          "Your stomach helps you…",
          ["digest food", "steer a kart", "make sunlight"],
          0,
          "The stomach is part of digestion.",
          1
        ),
        s3Multi(
          "Plants make food using light. That is called…",
          ["photosynthesis", "gravity", "punctuation"],
          0,
          "Photosynthesis is how plants make food with light.",
          2
        ),
        s3Multi(
          "The control centre of a cell is the…",
          ["nucleus", "shoe", "fence"],
          0,
          "The nucleus controls what the cell does.",
          3
        ),
      ],
      struggle: {
        points: ["Stomach: food. Lungs: air."],
        practice: [
          s3Multi("Which helps you digest?", ["Stomach", "Helmet", "Tyre"], 0, "The stomach helps digest food.", 0),
        ],
      },
    },
    chemistry: {
      title: "Same water, new change",
      blurb: "Ice, water and steam, then a first chemical change.",
      videoKey: "states",
      teach: {
        points: [
          "Ice, water and steam are the same substance in three states.",
          "Steam is water as a gas.",
          "Burning wood makes new substances. That is a chemical change.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Ice is solid water.", "Melt it: liquid.", "Boil it: gas, which we call steam."],
      },
      practice: [
        s3Multi(
          "Ice, water and steam are all…",
          ["water", "wood", "iron"],
          0,
          "They are the same substance in different states.",
          1
        ),
        s3Multi("Steam is water as a…", ["gas", "solid brick", "metal"], 0, "Steam is the gas form of water.", 2),
        s3Multi(
          "Burning wood so it turns to ash is a…",
          ["chemical change", "change of handwriting", "type of map"],
          0,
          "New substances form. That is a chemical change.",
          3
        ),
      ],
      struggle: {
        points: ["A solid keeps its shape until it melts."],
        practice: [
          s3Multi("A solid keeps its…", ["shape", "promise to flow", "taste of steam"], 0, "Solids keep their shape.", 0),
        ],
      },
    },
    physics: {
      title: "Grip, a loop, a speed",
      blurb: "Friction, a complete circuit, then speed with small numbers.",
      videoKey: "electricity",
      teach: {
        points: [
          "Friction can slow you down. It is the grip between surfaces.",
          "A circuit needs a power source and a complete loop.",
          "Speed is distance divided by time. 20 metres in 2 seconds is 10 metres each second.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["20 metres.", "2 seconds.", "20 ÷ 2 = 10 metres each second."],
      },
      practice: [
        s3Multi(
          "Friction can…",
          ["slow you down", "turn off gravity", "make a noun"],
          0,
          "Grip between surfaces slows a slide.",
          1
        ),
        s3Multi(
          "A simple circuit needs a cell and a…",
          ["complete loop of wire", "gap you leave on purpose", "comma"],
          0,
          "The loop has to be complete for the bulb to light.",
          2
        ),
        s3Typed(
          "A kart travels 20 metres in 2 seconds. What is its speed in metres per second?",
          "10",
          "Speed is distance divided by time. 20 ÷ 2 = 10.",
          3
        ),
      ],
      struggle: {
        points: ["Divide the distance by the time."],
        practice: [
          s3Typed(
            "Something moves 10 metres in 2 seconds. What is the speed in metres per second?",
            "5",
            "10 ÷ 2 = 5 metres each second.",
            0
          ),
        ],
      },
    },
    method: {
      title: "What you change, what you measure",
      blurb: "Plain words first, then the name independent variable.",
      videoKey: "scientific",
      teach: {
        points: [
          "What you measure is the result, such as the height of a plant.",
          "What you deliberately change is the independent variable.",
          "An odd result should be checked, not hidden.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "You change how much water (independent variable).",
          "You measure the height.",
          "If one result looks odd, you do that pot again.",
        ],
      },
      practice: [
        s3Multi(
          "You measure how tall a plant grows. The height is what you…",
          ["measure", "ignore", "invent"],
          0,
          "The height is the result you measure.",
          1
        ),
        s3Multi(
          "The thing you deliberately change is the…",
          ["independent variable", "joke", "full stop"],
          0,
          "Independent variable means the one change you chose.",
          2
        ),
        s3Multi(
          "A result that looks odd should be…",
          ["checked again", "rubbed out", "turned into a story"],
          0,
          "Check an odd result. It might be a mistake, or it might matter.",
          2
        ),
        s3Multi(
          "To compare the heights of four ponies, a useful chart is a…",
          ["bar chart", "secret", "helmet"],
          0,
          "A bar chart shows groups side by side.",
          3
        ),
      ],
      struggle: {
        points: ["Measure means look and write the number."],
        practice: [
          s3Multi(
            "If you are finding out the temperature, you should…",
            ["measure it", "guess and hide the guess"],
            0,
            "Measure it and write it down.",
            0
          ),
        ],
      },
    },
  },
};
