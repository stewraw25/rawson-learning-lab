/**
 * Intermediate (Stage 2) — a small step up from First steps.
 * Every lesson starts with an easy question, then climbs.
 * George (10, Year 3–4 catch-up) and Bella-Rose (12) both start here gently.
 * Items may set ramp: 1 easy, 2 middle, 3 stretch.
 */

function s2Typed(q, answer, explain, ramp) {
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

function s2Multi(q, options, answer, explain, ramp) {
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

const TEACH_MODULES_STAGE2 = {
  maths: {
    number: {
      title: "Tens and ones",
      blurb: "Bigger numbers, still friendly. Tens, ones, and 10 more.",
      videoKey: "placevalue",
      teach: {
        points: [
          "50 is 5 tens. 74 is 7 tens and 4 ones.",
          "10 more than 46 is 56. The tens digit goes up by 1.",
          "100 more changes the hundreds. 250 and 100 more is 350.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Look at 46.", "4 tens and 6 ones.", "10 more is 56."],
      },
      practice: [
        s2Typed("How many tens in 50?", "5", "50 is 5 tens.", 1),
        s2Multi("Which number is bigger?", ["28", "82", "19", "33"], 1, "82 is bigger than 28, 19 and 33.", 1),
        s2Typed("What is 10 more than 46?", "56", "The tens go from 4 to 5. 46 and 10 more is 56.", 2),
        s2Typed("What is the ones digit of 74?", "4", "74 is 7 tens and 4 ones.", 2),
      ],
      struggle: {
        points: ["Count on 10 from a tens number.", "The bigger number is further along the line."],
        practice: [
          s2Typed("What is 10 more than 20?", "30", "20 and 10 more is 30.", 0),
          s2Multi("Which is smaller?", ["18", "81"], 0, "18 is smaller than 81.", 0),
        ],
      },
    },
    operations: {
      title: "Add, share and times",
      blurb: "Sums you can count, then the 2, 5 and 10 times tables.",
      videoKey: "multiply",
      teach: {
        points: [
          "Add by counting on. 7 and 5 more lands on 12.",
          "Times means groups. 4 groups of 5 is 20.",
          "Divide means share. 18 shared into 2 groups is 9 each.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["4 × 5 means four groups of 5.", "5, 10, 15, 20.", "So 4 × 5 = 20."],
      },
      practice: [
        s2Typed("What is 7 + 5?", "12", "7 and 5 more is 12.", 1),
        s2Typed("What is 15 − 5?", "10", "Count back 5 from 15. You land on 10.", 1),
        s2Typed("What is 4 × 5?", "20", "Four groups of 5 make 20.", 2),
        s2Typed("What is 18 ÷ 2?", "9", "18 shared into 2 equal groups is 9.", 2),
      ],
      struggle: {
        points: ["Use your fingers for adding.", "Sharing into 2 is halving."],
        practice: [
          s2Typed("What is 3 + 3?", "6", "3 and 3 more is 6.", 0),
          s2Typed("What is 10 ÷ 2?", "5", "10 shared into 2 groups is 5.", 0),
        ],
      },
    },
    fractions: {
      title: "Halves and quarters again",
      blurb: "Same idea as First steps, with slightly bigger numbers.",
      videoKey: "fractions",
      teach: {
        points: [
          "Half means split into 2 equal groups.",
          "A quarter means split into 4 equal groups.",
          "A half is bigger than a quarter of the same thing.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Half of 16.", "Split 16 into 2 equal groups.", "Each group is 8."],
      },
      practice: [
        s2Typed("What is half of 16?", "8", "16 split into 2 equal groups is 8.", 1),
        s2Typed("What is a quarter of 8?", "2", "8 split into 4 equal groups is 2.", 1),
        s2Multi(
          "Which piece of the same cake is bigger?",
          ["A half", "A quarter", "They are the same size"],
          0,
          "A half is 2 quarters, so it is bigger than one quarter.",
          2
        ),
      ],
      struggle: {
        points: ["Half of an even number is the number shared by 2."],
        practice: [
          s2Multi("Is a half more than a quarter?", ["Yes", "No"], 0, "Yes. A half is the bigger piece.", 0),
        ],
      },
    },
    algebra: {
      title: "Count in threes",
      blurb: "Groups of three. No letters and no boxes.",
      videoKey: "algebra",
      teach: {
        points: [
          "Counting in threes goes 3, 6, 9, 12.",
          "3 groups of 4 is the same as 4 + 4 + 4.",
          "You do not need a letter. Say the numbers out loud.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Start at 3.", "Add another 3: that is 6.", "Add another 3: that is 9."],
      },
      practice: [
        s2Typed("Count in threes: 3, 6, 9, 12. What comes next?", "15", "12 and 3 more is 15.", 1),
        s2Typed("What is 3 × 4?", "12", "Four groups of 3 make 12.", 1),
        s2Typed("What is 3 × 5?", "15", "Five groups of 3 make 15.", 2),
      ],
      struggle: {
        points: ["Add 3 each time. Use your fingers if you need to."],
        practice: [s2Typed("What is 3 × 2?", "6", "Two groups of 3 make 6.", 0)],
      },
    },
    geometry: {
      title: "Around the edge",
      blurb: "Corners, sides, and a first perimeter with small numbers.",
      videoKey: "angles",
      teach: {
        points: [
          "A rectangle has 4 sides and 4 corners.",
          "Perimeter is the distance around the outside. Add every side.",
          "A rectangle 5 cm by 2 cm goes 5 + 2 + 5 + 2.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Sides 5 cm, 2 cm, 5 cm and 2 cm.", "5 + 2 = 7, and another 5 + 2 = 7.", "7 + 7 = 14 cm around."],
      },
      practice: [
        s2Typed("How many corners does a square have?", "4", "A square has 4 corners, one at each side.", 1),
        s2Multi(
          "Which shape has 4 equal sides?",
          ["A square", "A circle", "A triangle"],
          0,
          "A square has 4 sides and they are all the same length.",
          1
        ),
        s2Typed(
          "A rectangle is 5 cm long and 2 cm wide. What is the perimeter in cm?",
          "14",
          "Go around the outside: 5 + 2 + 5 + 2 = 14 cm.",
          2
        ),
      ],
      struggle: {
        points: ["Count the sides with your finger."],
        practice: [s2Typed("How many sides does a rectangle have?", "4", "A rectangle has 4 sides.", 0)],
      },
    },
    data: {
      title: "Pictures and the gap",
      blurb: "Count the pictures, then look at biggest minus smallest.",
      videoKey: "averages",
      teach: {
        points: [
          "If each picture stands for 1, count the pictures.",
          "The bigger count is more popular.",
          "The range is the biggest number minus the smallest.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Numbers 1, 8 and 3.", "Biggest is 8. Smallest is 1.", "8 − 1 = 7."],
      },
      practice: [
        s2Typed(
          "Each kart picture stands for 1 child. There are 4 kart pictures. How many children?",
          "4",
          "One picture each, so 4 pictures means 4 children.",
          1
        ),
        s2Multi(
          "7 children like red and 2 like blue. Which is more popular?",
          ["red", "blue", "they are the same"],
          0,
          "7 is more than 2, so red is more popular.",
          1
        ),
        s2Typed(
          "The numbers are 1, 8 and 3. What is the biggest minus the smallest?",
          "7",
          "8 is biggest and 1 is smallest. 8 − 1 = 7. That gap is the range.",
          2
        ),
      ],
      struggle: {
        points: ["Count, then compare."],
        practice: [s2Multi("Which is more?", ["5", "9"], 1, "9 is more than 5.", 0)],
      },
    },
  },
  english: {
    grammar: {
      title: "Who and what they do",
      blurb: "Nouns, describing words, and a whole sentence.",
      videoKey: "grammar",
      teach: {
        points: [
          "A noun names a person, place or thing: helmet, pony, yard.",
          "A describing word tells us more: the blue visor.",
          "A whole sentence can stand on its own. 'Because the gate shut' cannot.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["The pony ate hay.", "Pony is the who. Ate is what it did.", "That is a whole sentence."],
      },
      practice: [
        s2Multi("Which word is a noun?", ["helmet", "quickly", "and"], 0, "A helmet is a thing. That is a noun.", 1),
        s2Multi(
          "Which word describes the visor in 'the blue visor'?",
          ["the", "blue", "visor"],
          1,
          "Blue tells us about the visor.",
          1
        ),
        s2Multi(
          "Which one is a whole sentence?",
          ["The pony ate hay.", "Ate hay", "Because the gate shut"],
          0,
          "It has a who and what they did, and it can stand alone.",
          2
        ),
      ],
      struggle: {
        points: ["Look for the thing you can point at. That is often the noun."],
        practice: [
          s2Multi("The karts ___ fast.", ["is", "are"], 1, "Karts is more than one, so we say are.", 0),
        ],
      },
    },
    punctuation: {
      title: "Stops, questions, missing letters",
      blurb: "Start with the mark at the end, then a simple apostrophe.",
      videoKey: "punctuation",
      teach: {
        points: [
          "Questions end with a question mark.",
          "I'm means I am. The apostrophe shows the missing letter.",
          "One owner takes the apostrophe before the s: the rider's glove.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["I'm ready.", "I am ready.", "The apostrophe stands for the missing a."],
      },
      practice: [
        s2Multi(
          "Which line is a question?",
          ["Where is my helmet?", "The helmet is here.", "Helmet on the seat"],
          0,
          "It asks something and ends with a question mark.",
          1
        ),
        s2Multi("I'm is short for…", ["I am", "I mine", "I more"], 0, "I'm means I am.", 1),
        s2Multi(
          "One rider owns the glove. Which is right?",
          ["the rider's glove", "the riders glove", "the rider glove's"],
          0,
          "One owner: the apostrophe sits before the s.",
          2
        ),
      ],
      struggle: {
        points: ["If it asks something, it wants a question mark."],
        practice: [
          s2Multi("A question ends with…", ["?", ".", ","], 0, "Questions end with a question mark.", 0),
        ],
      },
    },
    vocabulary: {
      title: "Same, opposite, picture it",
      blurb: "Words you can act out, then a slightly newer one.",
      videoKey: "reading",
      teach: {
        points: [
          "Huge means very big.",
          "The opposite of hot is cold.",
          "Little means almost the same as small.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["The pony is huge.", "Huge means very big.", "The opposite would be tiny."],
      },
      practice: [
        s2Multi("Huge means…", ["very big", "very quiet", "very slow"], 0, "Huge means very big.", 1),
        s2Multi("The opposite of hot is…", ["cold", "warm", "boiling"], 0, "Cold is the opposite of hot.", 1),
        s2Multi(
          "Which word means almost the same as small?",
          ["little", "huge", "loud"],
          0,
          "Little and small mean almost the same.",
          2
        ),
      ],
      struggle: {
        points: ["Try the word in a sentence you can picture."],
        practice: [s2Multi("Loud means…", ["noisy", "soft", "asleep"], 0, "Loud means noisy.", 0)],
      },
    },
    reading: {
      title: "What does it say?",
      blurb: "A short scene. Answer what is written, then one small guess.",
      videoKey: "reading",
      teach: {
        points: [
          "Read it once. Ask: what happened?",
          "The answer to an easy question is often written in the sentence.",
          "A second question might ask why. Use the clue in the sentence.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "George sat in the kart. He clipped his helmet.",
          "What did he clip? His helmet. The sentence says so.",
        ],
      },
      practice: [
        s2Multi(
          "George sat in the kart and clipped his helmet. What did he clip?",
          ["His helmet", "The pony's tail", "A book"],
          0,
          "The sentence says he clipped his helmet.",
          1
        ),
        s2Multi(
          "The marshal held up a hand, so George waited in the kart. Why did George wait?",
          ["The marshal's hand said not yet", "He wanted a nap", "The kart had no wheels"],
          0,
          "A hand held up is a stop signal. He waited because he had not been sent.",
          2
        ),
      ],
      struggle: {
        points: ["Point at the words that answer the question."],
        practice: [
          s2Multi(
            "Bella led the pony across the yard. Who led the pony?",
            ["Bella", "The helmet", "The gate"],
            0,
            "The sentence says Bella led the pony.",
            0
          ),
        ],
      },
    },
    writing: {
      title: "A sentence you can see",
      blurb: "A full sentence, then a picture made with 'like'.",
      videoKey: "writing",
      teach: {
        points: [
          "A full sentence tells who did something.",
          "A simile uses like or as: the kart was like a rocket.",
          "Pick a word the reader can see or hear.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["The horse drank water.", "Who: the horse. Did: drank.", "The reader can picture it."],
      },
      practice: [
        s2Multi(
          "Which is a full sentence?",
          ["The horse drank water.", "Drank water", "Horse"],
          0,
          "It says who and what they did.",
          1
        ),
        s2Multi(
          "Which line compares the kart using like?",
          ["The kart was like a rocket.", "The kart was red.", "Kart"],
          0,
          "Like compares the kart to a rocket.",
          2
        ),
      ],
      struggle: {
        points: ["Look for the word like."],
        practice: [
          s2Multi(
            "Which line uses like?",
            ["The pony was like a cloud.", "The pony was grey.", "Pony"],
            0,
            "Like makes a simile.",
            0
          ),
        ],
      },
    },
  },
  science: {
    biology: {
      title: "Bodies and a food chain",
      blurb: "Breathing, plants, and who eats whom — in short steps.",
      videoKey: "photosynthesis",
      teach: {
        points: [
          "Lungs help you breathe.",
          "A plant makes its own food. In a food chain it comes first.",
          "An arrow in grass → rabbit means the rabbit eats the grass.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Grass → rabbit.", "The arrow points to the rabbit.", "The rabbit eats the grass."],
      },
      practice: [
        s2Multi(
          "Which body part helps you breathe?",
          ["Lungs", "Shoes", "A fence"],
          0,
          "Lungs take air in and out.",
          1
        ),
        s2Multi(
          "A food chain usually starts with a…",
          ["plant", "trainer", "helmet"],
          0,
          "Plants make food, so they start the chain.",
          1
        ),
        s2Multi(
          "In grass → rabbit, the rabbit…",
          ["eats the grass", "makes the grass", "is a rock"],
          0,
          "The arrow means the rabbit eats the grass.",
          2
        ),
      ],
      struggle: {
        points: ["Plants grow. They are living."],
        practice: [s2Multi("Is a flower a plant?", ["Yes", "No"], 0, "Yes. A flower is part of a plant.", 0)],
      },
    },
    chemistry: {
      title: "Melt, mix, separate",
      blurb: "Ice melts, sugar mixes in, sand can be caught.",
      videoKey: "states",
      teach: {
        points: [
          "When ice melts it becomes liquid water.",
          "Sugar stirred into tea dissolves. You can still taste it.",
          "Sand does not dissolve. A filter can catch it.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["An ice cube in a warm room.", "It melts.", "You now have liquid water."],
      },
      practice: [
        s2Multi(
          "When an ice cube melts it becomes a…",
          ["liquid", "rock", "type of animal"],
          0,
          "Melting turns solid ice into liquid water.",
          1
        ),
        s2Multi(
          "Sugar stirred into warm tea…",
          ["dissolves", "turns into a pony", "becomes sand"],
          0,
          "The sugar mixes in. That is dissolving.",
          2
        ),
        s2Multi(
          "A filter can catch…",
          ["sand that has not dissolved", "dissolved sugar", "an idea"],
          0,
          "Sand stays in bits a filter can hold. Dissolved sugar slips through.",
          2
        ),
      ],
      struggle: {
        points: ["A spoon keeps its shape. It is a solid."],
        practice: [s2Multi("Is a wooden spoon a solid?", ["Yes", "No"], 0, "Yes. It keeps its shape.", 0)],
      },
    },
    physics: {
      title: "Falls, pushes and a loop",
      blurb: "Gravity, a force, and a first look at a circuit.",
      videoKey: "forces",
      teach: {
        points: [
          "Gravity is the pull that makes things fall down.",
          "A bulb lights when the circuit is a complete loop.",
          "An open switch leaves a gap, so the bulb stays off.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Drop a ball.", "It falls down.", "That pull is called gravity."],
      },
      practice: [
        s2Multi(
          "The pull that makes a ball fall is called…",
          ["gravity", "a full stop", "a noun"],
          0,
          "Gravity pulls things towards the Earth.",
          1
        ),
        s2Multi(
          "A bulb lights when the circuit is a complete…",
          ["loop", "gap of air", "story"],
          0,
          "Electricity needs a closed loop to flow.",
          2
        ),
        s2Multi(
          "If the switch is open, the bulb is…",
          ["off", "brighter than the sun", "a liquid"],
          0,
          "An open switch is a gap. The bulb stays off.",
          2
        ),
      ],
      struggle: {
        points: ["A push or a pull can start or stop something."],
        practice: [
          s2Multi(
            "To start a swing you need a…",
            ["push or a pull", "full stop", "comma"],
            0,
            "A push or a pull is a force.",
            0
          ),
        ],
      },
    },
    method: {
      title: "One change, then look",
      blurb: "A fair test in plain words, then the name for what you measure.",
      videoKey: "scientific",
      teach: {
        points: [
          "Change one thing, such as how much water a plant gets.",
          "Keep the light the same, or you will not know what mattered.",
          "Write down the thing you measure, such as how tall the plant grows.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Two plants, same light.",
          "You change only the water.",
          "You measure how tall they grow, and you write that height down.",
        ],
      },
      practice: [
        s2Multi(
          "You give one plant more water and keep the light the same. You changed…",
          ["how much water", "everything", "the name of the plant"],
          0,
          "The water is the one change. The light stayed the same.",
          1
        ),
        s2Multi(
          "In a test you should write down what you…",
          ["see", "hope", "hide"],
          0,
          "Write the result you actually see.",
          1
        ),
        s2Multi(
          "Doing the test again helps you…",
          ["check", "forget", "change the question after you peek"],
          0,
          "A repeat lets you check the first result.",
          2
        ),
      ],
      struggle: {
        points: ["One change. Write what happens."],
        practice: [
          s2Multi(
            "How many things should you change in a fair test?",
            ["One", "Ten"],
            0,
            "Change one thing so the test is fair.",
            0
          ),
        ],
      },
    },
  },
};
