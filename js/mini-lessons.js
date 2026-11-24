/**
 * Data-driven mini-lesson pattern.
 *
 * Lessons listed in MINI_LESSONS run:
 *   goal → prerequisite check → teach (words + diagram) →
 *   step-by-step worked example → guided practice with hints →
 *   the existing practice questions → a short exit check.
 *
 * Any other lesson keeps the older flow: teach → example → practice.
 * This file does not read or write profile storage.
 */
const MINI_SVG = {
  tensOnes23: `
    <svg viewBox="0 0 340 150" class="teach-svg mini-svg" role="img" aria-labelledby="svgTensOnesTitle">
      <title id="svgTensOnesTitle">The number 23 shown as 2 tens and 3 ones</title>
      <text x="12" y="22" fill="currentColor" font-size="16" font-family="Nunito,sans-serif" font-weight="700">23</text>
      <rect x="70" y="8" width="70" height="46" rx="8" fill="#5b8cff"/>
      <text x="105" y="37" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">2</text>
      <text x="105" y="72" text-anchor="middle" fill="currentColor" font-size="12">tens</text>
      <rect x="160" y="8" width="70" height="46" rx="8" fill="#3dd6c6"/>
      <text x="195" y="37" text-anchor="middle" fill="#0f1221" font-size="22" font-weight="700">3</text>
      <text x="195" y="72" text-anchor="middle" fill="currentColor" font-size="12">ones</text>
      <text x="12" y="104" fill="currentColor" font-size="14" font-family="Nunito,sans-serif">2 tens is 20. 3 ones is 3.</text>
      <text x="12" y="128" fill="currentColor" font-size="14" font-family="Nunito,sans-serif" font-weight="700">20 and 3 make 23.</text>
    </svg>`,
  thousands4321: `
    <svg viewBox="0 0 360 168" class="teach-svg mini-svg" role="img" aria-labelledby="svgThousandsTitle">
      <title id="svgThousandsTitle">The number 4321 split into thousands, hundreds, tens and ones</title>
      <rect x="8" y="10" width="78" height="52" rx="8" fill="#5b8cff"/>
      <text x="47" y="42" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">4</text>
      <text x="47" y="80" text-anchor="middle" fill="currentColor" font-size="11">thousands</text>
      <rect x="96" y="10" width="78" height="52" rx="8" fill="#7c6cff"/>
      <text x="135" y="42" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">3</text>
      <text x="135" y="80" text-anchor="middle" fill="currentColor" font-size="11">hundreds</text>
      <rect x="184" y="10" width="78" height="52" rx="8" fill="#ff6bcb"/>
      <text x="223" y="42" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">2</text>
      <text x="223" y="80" text-anchor="middle" fill="currentColor" font-size="11">tens</text>
      <rect x="272" y="10" width="78" height="52" rx="8" fill="#3dd6c6"/>
      <text x="311" y="42" text-anchor="middle" fill="#0f1221" font-size="22" font-weight="700">1</text>
      <text x="311" y="80" text-anchor="middle" fill="currentColor" font-size="11">ones</text>
      <text x="8" y="112" fill="currentColor" font-size="14" font-family="Nunito,sans-serif">4 thousands is 4000. 3 hundreds is 300.</text>
      <text x="8" y="134" fill="currentColor" font-size="14" font-family="Nunito,sans-serif">2 tens is 20. 1 one is 1.</text>
      <text x="8" y="156" fill="currentColor" font-size="14" font-family="Nunito,sans-serif" font-weight="700">Together they make 4321.</text>
    </svg>`,
  sentenceCapital: `
    <svg viewBox="0 0 360 130" class="teach-svg mini-svg" role="img" aria-labelledby="svgSentenceTitle">
      <title id="svgSentenceTitle">A telling sentence starts with a capital and ends with a full stop</title>
      <text x="16" y="32" fill="currentColor" font-size="15" font-family="Nunito,sans-serif">Not finished:</text>
      <text x="130" y="32" fill="#c96b6b" font-size="18" font-family="Nunito,sans-serif">the dog ran</text>
      <text x="16" y="70" fill="currentColor" font-size="15" font-family="Nunito,sans-serif">Finished:</text>
      <rect x="120" y="48" width="210" height="36" rx="8" fill="#2a3d30"/>
      <text x="136" y="72" fill="#c5e1a5" font-size="18" font-family="Nunito,sans-serif" font-weight="700">The dog ran.</text>
      <text x="16" y="112" fill="currentColor" font-size="13" font-family="Nunito,sans-serif">Capital at the start. Full stop at the end.</text>
    </svg>`,
  topicSentence: `
    <svg viewBox="0 0 360 150" class="teach-svg mini-svg" role="img" aria-labelledby="svgTopicTitle">
      <title id="svgTopicTitle">A topic sentence sits first, then detail sentences</title>
      <rect x="16" y="14" width="328" height="52" rx="10" fill="#5b8cff"/>
      <text x="180" y="36" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">Topic sentence</text>
      <text x="180" y="54" text-anchor="middle" fill="#e8f0ff" font-size="12">Says what the paragraph is about</text>
      <rect x="16" y="78" width="154" height="52" rx="10" fill="#3dd6c6"/>
      <text x="93" y="108" text-anchor="middle" fill="#0f1221" font-size="14" font-weight="700">Detail</text>
      <rect x="190" y="78" width="154" height="52" rx="10" fill="#3dd6c6"/>
      <text x="267" y="108" text-anchor="middle" fill="#0f1221" font-size="14" font-weight="700">Detail</text>
    </svg>`,
  aliveOrNot: `
    <svg viewBox="0 0 360 150" class="teach-svg mini-svg" role="img" aria-labelledby="svgAliveTitle">
      <title id="svgAliveTitle">A pony is alive. A stone is not alive.</title>
      <rect x="16" y="12" width="152" height="120" rx="12" fill="#2a4a32"/>
      <text x="92" y="40" text-anchor="middle" fill="#c5e1a5" font-size="16" font-weight="700">Pony</text>
      <text x="92" y="66" text-anchor="middle" fill="#e8f0e4" font-size="13">grows</text>
      <text x="92" y="86" text-anchor="middle" fill="#e8f0e4" font-size="13">needs food</text>
      <text x="92" y="112" text-anchor="middle" fill="#ffd166" font-size="14" font-weight="700">Alive</text>
      <rect x="192" y="12" width="152" height="120" rx="12" fill="#3a3a48"/>
      <text x="268" y="40" text-anchor="middle" fill="#d0d0d8" font-size="16" font-weight="700">Stone</text>
      <text x="268" y="66" text-anchor="middle" fill="#c8c8d0" font-size="13">does not grow</text>
      <text x="268" y="86" text-anchor="middle" fill="#c8c8d0" font-size="13">needs no food</text>
      <text x="268" y="112" text-anchor="middle" fill="#ff8c5a" font-size="14" font-weight="700">Not alive</text>
    </svg>`,
  photosynthesis: `
    <svg viewBox="0 0 360 160" class="teach-svg mini-svg" role="img" aria-labelledby="svgPhotoTitle">
      <title id="svgPhotoTitle">A plant uses light, water and air to make food</title>
      <text x="24" y="28" fill="currentColor" font-size="13" font-family="Nunito,sans-serif">light</text>
      <text x="24" y="86" fill="currentColor" font-size="13" font-family="Nunito,sans-serif">water</text>
      <text x="24" y="132" fill="currentColor" font-size="13" font-family="Nunito,sans-serif">air</text>
      <path d="M70 22 L120 70" stroke="#ffd166" stroke-width="2" fill="none"/>
      <path d="M70 80 L120 86" stroke="#7ec0f0" stroke-width="2" fill="none"/>
      <path d="M70 126 L120 100" stroke="#a8b0d6" stroke-width="2" fill="none"/>
      <ellipse cx="170" cy="86" rx="44" ry="36" fill="#22c55e"/>
      <rect x="156" y="118" width="28" height="28" fill="#4ade80"/>
      <text x="170" y="90" text-anchor="middle" fill="#073b16" font-size="12" font-weight="700">plant</text>
      <path d="M214 86 L268 86" stroke="#c5e1a5" stroke-width="2" fill="none"/>
      <text x="280" y="82" fill="currentColor" font-size="14" font-family="Nunito,sans-serif" font-weight="700">food</text>
      <text x="280" y="102" fill="currentColor" font-size="12" font-family="Nunito,sans-serif">for the plant</text>
    </svg>`,
};

function miniQ(type, q, answer, explain, extra, extra2) {
  const item = { type: type, q: q, stage: "both" };
  if (type === "multi") {
    // miniQ("multi", question, options, index, explain, { hint })
    item.options = answer;
    item.answer = explain;
    item.explain = extra;
    if (extra2 && extra2.hint) item.hint = extra2.hint;
    if (extra2 && extra2.accept) item.accept = extra2.accept;
  } else {
    // miniQ("typed", question, answer, explain, { hint, accept })
    item.answer = String(answer);
    item.explain = explain;
    item.accept = extra && extra.accept ? extra.accept : [String(answer)];
    if (extra && extra.hint) item.hint = extra.hint;
  }
  return item;
}

const MINI_LESSONS = {
  "maths:y-place:1": {
    title: "Tens and ones",
    goal: "You can look at a two-digit number and say how many tens and how many ones it has.",
    curriculum: "England National Curriculum, Year 2 maths: recognise the place value of each digit in a two-digit number (tens, ones).",
    prereq: [
      miniQ("typed", "What number comes after 9?", "10", "After 9 comes 10. Ten ones make one ten.", { hint: "Count 8, 9, then the next number." }),
      miniQ("typed", "How many ones make one ten?", "10", "Ten ones make one ten.", { hint: "A full ten stick has this many ones." }),
    ],
    bridge: {
      subject: "maths",
      skillId: "number",
      stage: 1,
      label: "Counting & numbers",
      reason: "Tens and ones are easier once counting to 10 feels safe.",
    },
    teach: {
      paragraphs: [
        "In a two-digit number, each digit has a job, depending on where it sits.",
        "The digit on the left is the tens digit. It tells you how many groups of ten. The digit on the right is the ones digit. It tells you how many extra ones.",
        "In 23, the 2 is not just a 2. It stands in the tens place, so it means two tens, which is 20. The 3 stands in the ones place. 20 and 3 make 23.",
      ],
      mistake: "A common mix-up is reading 23 as “2 and 3”, or thinking 32 is smaller than 23 because it “starts with a 3”. The left digit is the tens, so 32 is 3 tens, which is more than 2 tens.",
      visual: "tensOnes23",
    },
    example: {
      title: "Worked example",
      steps: [
        "Look at 41.",
        "The digit on the left is 4, so there are 4 tens. 4 tens is 40.",
        "The digit on the right is 1, so there is 1 one.",
        "40 and 1 make 41.",
      ],
    },
    guided: [
      miniQ("typed", "In 17, how many tens are there?", "1", "The tens digit is the one on the left. In 17 that is 1, so there is 1 ten.", { hint: "The tens digit is the one on the left." }),
      miniQ("typed", "What number is 3 tens and 2 ones?", "32", "3 tens is 30, and 2 ones make 32.", { hint: "3 tens is 30. Then add the ones." }),
    ],
    exit: miniQ("typed", "In 50, how many tens and how many ones are there? Write it like this: 5 tens and 0 ones", "5 tens and 0 ones", "50 is 5 tens and no extra ones, so 0 ones.", {
      accept: ["5 tens and 0 ones", "5 tens 0 ones", "5 tens and 0 ones.", "5 tens, 0 ones"],
      hint: "50 is five groups of ten, and nothing left over.",
    }),
    revisit: "Have another go at tens and ones in a few days, so the idea stays.",
  },

  "maths:y-place:3": {
    title: "Thousands",
    goal: "You can read a four-digit number as thousands, hundreds, tens and ones.",
    curriculum: "England National Curriculum, Year 4 maths (built on in Year 5–6): recognise the place value of each digit in a four-digit number (thousands, hundreds, tens and ones).",
    prereq: [
      miniQ("typed", "How many hundreds are in 250?", "2", "250 is 2 hundreds and 5 tens.", { hint: "Look at the hundreds digit, three places from the right." }),
      miniQ("typed", "What is 10 × 100?", "1000", "Ten hundreds make one thousand.", { hint: "A thousand is ten hundreds." }),
    ],
    bridge: {
      subject: "maths",
      skillId: "y-place",
      stage: 2,
      label: "Hundreds",
      reason: "Thousands make more sense once hundreds are secure.",
    },
    teach: {
      paragraphs: [
        "When a number has four digits, a new place appears on the left: thousands.",
        "A thousand is 10 hundreds, or 1000. The thousands digit tells you how many thousands. Then come hundreds, tens and ones, just as before, each one place to the right.",
        "In 4321, the 4 means 4 thousands (4000), the 3 means 3 hundreds (300), the 2 means 2 tens (20) and the 1 means 1 one. Add them and you get 4321.",
      ],
      mistake: "A common mix-up is comparing 2099 and 2190 by looking only at the last two digits. Start from the left. Both have 2 thousands, but 2190 has 1 hundred and 2099 has 0 hundreds, so 2190 is bigger.",
      visual: "thousands4321",
    },
    example: {
      title: "Worked example",
      steps: [
        "Write 4 thousands: 4000.",
        "Add 3 hundreds: 4000 + 300 = 4300.",
        "Add 2 tens: 4300 + 20 = 4320.",
        "Add 1 one: 4320 + 1 = 4321.",
      ],
    },
    guided: [
      miniQ("typed", "How many thousands are in 5600?", "5", "5600 is 5 thousands and 6 hundreds.", { hint: "The thousands digit is the left-hand digit of this four-digit number." }),
      miniQ("typed", "What number is 7 thousands and 2 ones?", "7002", "7 thousands is 7000. There are no hundreds and no tens, so the middle digits are 0. Then 2 ones make 7002.", { hint: "7000, then no hundreds, no tens, and 2 ones." }),
    ],
    exit: miniQ("typed", "What number is 1000 + 1000?", "2000", "Two thousands make 2000.", { hint: "1000 and another 1000." }),
    revisit: "Have another go at thousands in a few days, so the places stay clear.",
  },

  "english:y-caps:1": {
    title: "Capitals and full stops",
    goal: "You can write a telling sentence that starts with a capital letter and ends with a full stop, and you can write the word I as a capital.",
    curriculum: "England National Curriculum, Year 2 English: use capital letters, full stops and question marks to demarcate sentences; use a capital letter for names of people, places, the days of the week, and the personal pronoun I.",
    prereq: [
      miniQ("multi", "Which of these is a letter?", ["A", "2", "?"], 0, "A is a letter. 2 is a number. ? is a punctuation mark.", { hint: "A letter is something you use to write a word." }),
      miniQ("multi", "Where does a line of writing usually start?", ["at the end", "at the beginning", "in the full stop"], 1, "We start reading and writing at the beginning of the line.", { hint: "Think about where you put the first word." }),
    ],
    teach: {
      paragraphs: [
        "A telling sentence is a complete thought. It needs a clear start and a clear finish so the reader can follow it.",
        "The first letter of the sentence wears a capital, so the reader can see where it begins. A full stop at the end says the thought is finished.",
        "The names of people and places also start with a capital. The word I is always a capital, even in the middle of a sentence.",
      ],
      mistake: "A common mix-up is putting a capital on a normal word in the middle of a sentence, or ending a telling sentence with a question mark. Save the question mark for a question.",
      visual: "sentenceCapital",
    },
    example: {
      title: "Worked example",
      steps: [
        "Look at this line: the dog ran",
        "It is not finished. Start with a capital: The",
        "The rest of the words stay as they are: dog ran",
        "End with a full stop: The dog ran.",
      ],
    },
    guided: [
      miniQ("multi", "Which line writes the name correctly and finishes the sentence?", ["george is ten", "George is ten.", "george is Ten.", "GEORGE is ten"], 1, "George is a name, so it starts with a capital. The sentence also needs a full stop.", { hint: "A person's name starts with a capital, and a telling sentence needs a full stop." }),
      miniQ("multi", "Which line uses the word I correctly?", ["i like horses.", "I like horses.", "i Like horses", "like I horses."], 1, "The word I is always a capital, and this telling sentence ends with a full stop.", { hint: "The word I is always a capital." }),
    ],
    exit: miniQ("multi", "Which line is finished correctly?", ["i am here.", "I am here.", "i Am here", "am i here"], 1, "I is a capital, the sentence starts correctly, and a full stop finishes it.", { hint: "Check the word I, the start of the sentence, and the ending." }),
    revisit: "Notice capitals and full stops in a book you read this week, then try this lesson again in a few days.",
  },

  "english:y-sent:3": {
    title: "One clear paragraph start",
    goal: "You can write or choose a topic sentence that tells the reader what the paragraph is about, then add details after it.",
    curriculum: "England National Curriculum, Year 5–6 English: organise paragraphs around a theme, and use devices to build cohesion within and across paragraphs.",
    prereq: [
      miniQ("multi", "A telling sentence needs…", ["a capital and a full stop", "only a comma", "no words at all"], 0, "A telling sentence starts with a capital and ends with a full stop.", { hint: "Think back to capitals and full stops." }),
      miniQ("multi", "Which line already tells the reader a clear topic?", ["And then.", "Checking the water is the first yard job.", "Purple."], 1, "It says what the writing is about.", { hint: "Which line could stand as the start of a paragraph?" }),
    ],
    bridge: {
      subject: "english",
      skillId: "y-sent",
      stage: 2,
      label: "Join two short ones",
      reason: "A topic sentence is easier once ordinary sentences feel clear.",
    },
    teach: {
      paragraphs: [
        "A paragraph is a group of sentences about one idea. The first sentence can tell the reader that idea. That first sentence is called a topic sentence.",
        "The sentences after it give details, reasons or examples. They should still belong to the same idea.",
        "If you start with “And then” or a single word like “Blue”, the reader does not yet know the topic. Say the topic first, then give the details.",
      ],
      mistake: "A common mix-up is starting with a detail, or with “And then”, before the reader knows what the paragraph is about. The strap under a riding hat is a detail. “A riding hat matters” is closer to a main idea.",
      visual: "topicSentence",
    },
    example: {
      title: "Worked example",
      steps: [
        "The paragraph will be about a fair test.",
        "Topic sentence: A fair test changes one thing.",
        "Detail that belongs: We changed only the water.",
        "A sentence about sandwiches would not belong in this paragraph.",
      ],
    },
    guided: [
      miniQ("multi", "Which is the best topic sentence for a paragraph about checking a pony's water?", ["Checking the water is the first yard job.", "And then the bucket.", "Blue.", "Because."], 0, "It tells the reader the topic of the paragraph.", { hint: "The topic sentence should say what the paragraph is about." }),
      miniQ("multi", "Which line is a detail, not the main idea?", ["Hats protect your head.", "The strap sits under the chin.", "A riding hat matters.", "Kit comes before you mount."], 1, "The strap is one detail inside the bigger idea of a riding hat.", { hint: "A detail is one smaller fact inside the main idea." }),
    ],
    exit: miniQ("multi", "Which topic sentence fits a paragraph about saving pocket money?", ["Saving a little each week builds a pot.", "The carburettor.", "And then.", "Purple."], 0, "It introduces saving, so the reader knows the topic.", { hint: "Pick the sentence that names the topic." }),
    revisit: "In a few days, try writing one topic sentence and two details of your own.",
  },

  "science:y-alive:1": {
    title: "Alive or not",
    goal: "You can say whether something is alive, and give one reason.",
    curriculum: "England National Curriculum, Year 2 science: explore and compare the differences between things that are living, dead, and things that have never been alive.",
    prereq: [
      miniQ("multi", "Which of these can you see in a garden?", ["a tree", "the number 7"], 0, "A tree is a real living thing you can see in a garden.", { hint: "Which one is a real thing you could stand next to?" }),
      miniQ("multi", "Which one needs food or water?", ["a pony", "a stone"], 0, "A pony needs food and water. A stone does not.", { hint: "Think about which one eats or drinks." }),
    ],
    teach: {
      paragraphs: [
        "Living things grow, and they need food or — for a plant — light and water. Many living things also have young.",
        "A pony grows and eats, so it is alive. A stone stays a stone. It does not grow or need food, so it is not alive. A plastic bucket was made by people. It does not grow either.",
        "Plants are alive too, even though they do not eat like a pony. A tree grows and needs light and water.",
      ],
      mistake: "A common mix-up is thinking “it moves, so it is alive”. A kart moves, but it is not alive. Another mix-up is thinking a tree is not alive because it does not walk.",
      visual: "aliveOrNot",
    },
    example: {
      title: "Worked example",
      steps: [
        "Is a hen alive? It grows, it eats, and it can lay eggs. Yes, a hen is alive.",
        "Is a metal shoe alive? It does not grow and it does not need food. No, it is not alive.",
      ],
    },
    guided: [
      miniQ("multi", "Is a tree alive?", ["yes", "no"], 0, "A tree grows and needs water and light, so it is alive.", { hint: "Does a tree grow, and does it need water and light?" }),
      miniQ("multi", "Is a plastic cone on a track alive?", ["alive", "not alive"], 1, "It does not grow or need food, so it is not alive.", { hint: "Was it made, or does it grow?" }),
    ],
    exit: miniQ("multi", "A dog is alive because it…", ["grows and needs food", "is made of metal", "never needs water", "cannot move"], 0, "Growth and needing food are clues that a dog is alive.", { hint: "Pick a reason that living things share." }),
    revisit: "On a walk, try pointing to one living thing and one thing that has never been alive. Come back to this lesson in a few days.",
  },

  "science:y-plants:3": {
    title: "Plants make food",
    goal: "You can explain that plants make their own food using light, water and air, and that this process is called photosynthesis.",
    curriculum: "England National Curriculum, Year 3 science (secured in later primary): explore the requirements of plants for life and growth, including air, light and water. The name photosynthesis is introduced here in plain words, ready for later secondary work.",
    prereq: [
      miniQ("multi", "What does a plant need to grow?", ["water, light and room", "only stones", "no light at all"], 0, "Plants need water, light and room to grow.", { hint: "Think about what you would give a plant in a pot." }),
      miniQ("multi", "Which part of a plant is often green and catches light?", ["the leaf", "the pebble", "the metal shoe"], 0, "Leaves are the main place a plant catches light.", { hint: "Look at a leaf in the light." }),
    ],
    bridge: {
      subject: "science",
      skillId: "y-plants",
      stage: 2,
      label: "Parts of a plant",
      reason: "Photosynthesis makes more sense once you know the leaf, stem and root.",
    },
    teach: {
      paragraphs: [
        "Animals have to eat. A horse eats plants or other food. A plant can make its own food.",
        "To do that, a plant needs light, water, and a gas from the air called carbon dioxide. Inside the green parts, usually the leaves, the plant uses these to make food. The name of this process is photosynthesis.",
        "If a plant is kept in a dark cupboard, it cannot catch light, so it cannot photosynthesise well. That is why plants in a window often grow better than plants left in the dark.",
      ],
      mistake: "A common mix-up is thinking plants “eat soil” the way a horse eats hay. Soil can hold water and minerals, but the plant’s food is made in the leaves using light.",
      visual: "photosynthesis",
    },
    example: {
      title: "Worked example",
      steps: [
        "A rose bush in the light can make food. That process is called photosynthesis.",
        "A horse cannot do this. A horse has to eat.",
        "A plant left in the dark cannot catch the light it needs, so photosynthesis cannot work well.",
      ],
    },
    guided: [
      miniQ("multi", "Photosynthesis is how a plant…", ["makes food using light", "eats hay", "drives a kart", "melts ice"], 0, "The plant uses light, with water and air, to make food.", { hint: "The word is about the plant making food, not eating hay." }),
      miniQ("multi", "Which one makes its own food this way?", ["a horse", "a rose bush", "a human", "a rock"], 1, "Plants photosynthesise. Animals have to eat.", { hint: "Which one has leaves that can catch light?" }),
    ],
    exit: miniQ("multi", "Which word names plants making food with light?", ["photosynthesis", "gravity", "friction", "a full stop"], 0, "Photosynthesis is the name of the process.", { hint: "It is the long word from this lesson." }),
    revisit: "In a few days, say the word photosynthesis out loud and name the three things a plant needs for it: light, water and air.",
  },
};

function miniLessonKey(subject, skillId, stage) {
  return `${subject}:${skillId}:${Number(stage) || 1}`;
}

function getMiniLesson(subject, skillId, stage) {
  return MINI_LESSONS[miniLessonKey(subject, skillId, stage)] || null;
}

function miniLessonPhases(mini) {
  if (!mini) return ["teach", "example", "practice"];
  const phases = ["goal"];
  if (mini.prereq && mini.prereq.length) phases.push("prereq");
  phases.push("teach", "example");
  if (mini.guided && mini.guided.length) phases.push("guided");
  phases.push("practice");
  if (mini.exit) phases.push("exit");
  return phases;
}

function miniLessonNextPhase(mini, phase) {
  const phases = miniLessonPhases(mini);
  const i = phases.indexOf(phase);
  if (i < 0) return "practice";
  return phases[i + 1] || "complete";
}

function miniLessonVisualHtml(mini) {
  if (!mini || !mini.teach) return "";
  if (mini.teach.visualHtml) return mini.teach.visualHtml;
  if (!mini.teach.visual) return "";
  if (MINI_SVG[mini.teach.visual]) return MINI_SVG[mini.teach.visual];
  const raw = String(mini.teach.visual);
  if (raw.trim().charAt(0) === "<") return raw;
  return "";
}

function miniSpeakEnabled() {
  return typeof getVoicePrefs === "function" && getVoicePrefs().enabled;
}

function miniSpeakButtonHtml(srcId, label) {
  if (!miniSpeakEnabled()) return "";
  const text = label || "Hear this";
  return `<div class="mt-1 mini-speak" style="display:flex;gap:0.5rem;flex-wrap:wrap">
    <button type="button" class="btn btn-secondary" data-speak data-speak-src="${srcId}" data-voice-label="🔊 ${text}">
      🔊 ${text}
    </button>
  </div>`;
}

function miniEscape(text) {
  if (typeof escapeHtml === "function") return escapeHtml(String(text == null ? "" : text));
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function miniLessonProgress(session, mini) {
  const phase = session && session.phase;
  if (phase === "goal") return { label: "Goal", pct: 4 };
  if (phase === "prereq") {
    const n = (mini && mini.prereq && mini.prereq.length) || 1;
    const i = Math.min(Number(session.prereqIndex) || 0, n - 1);
    return { label: `Ready? ${i + 1} of ${n}`, pct: 8 + Math.round((i / n) * 8) };
  }
  if (phase === "teach") return { label: "Learn", pct: 20 };
  if (phase === "example") return { label: "Example", pct: 28 };
  if (phase === "guided") {
    const n = (mini && mini.guided && mini.guided.length) || 1;
    const i = Math.min(Number(session.guidedIndex) || 0, n - 1);
    return { label: `Guided ${i + 1} of ${n}`, pct: 34 + Math.round((i / n) * 12) };
  }
  if (phase === "exit") return { label: "End check", pct: 92 };
  return null;
}

function currentMiniQuestion(session, mini) {
  if (!session || !mini) return null;
  if (session.phase === "prereq") return (mini.prereq || [])[Number(session.prereqIndex) || 0] || null;
  if (session.phase === "guided") return (mini.guided || [])[Number(session.guidedIndex) || 0] || null;
  if (session.phase === "exit") return mini.exit || null;
  return null;
}

function miniLessonBodyHtml(opts) {
  const mini = opts.mini;
  const session = opts.session;
  const stageName = opts.stageName || "";
  const isRevise = !!opts.isRevise;
  const escape = opts.escapeHtml || miniEscape;
  const phase = session.phase;
  const skipBtn = isRevise
    ? `<button class="btn btn-secondary" type="button" id="btnSkipPractice">⚡ Skip to practice</button>`
    : "";
  const speak = (id, label) => (opts.speakEnabled === false ? "" : miniSpeakButtonHtml(id, label));

  if (phase === "goal") {
    return `
      <div class="phase-pill">🎯 Goal · ${escape(stageName)}</div>
      <p class="mini-kicker muted">What you will learn</p>
      <h3 class="teach-heading" id="miniGoalText">${escape(mini.goal)}</h3>
      ${speak("#miniGoalText", "Hear the goal")}
      <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
        <button class="btn btn-primary btn-lg" type="button" id="btnAdvance">Start the ready check →</button>
        ${skipBtn}
      </div>`;
  }

  if (phase === "teach") {
    const paras = (mini.teach && mini.teach.paragraphs) || [];
    const visual = miniLessonVisualHtml(mini);
    const mistake = mini.teach && mini.teach.mistake;
    return `
      <div class="phase-pill">📖 Teach · ${escape(stageName)}</div>
      <h3 class="teach-heading">${escape(mini.title || "")}</h3>
      ${visual ? `<div class="visual-wrap mini-visual-wrap">${visual}</div>` : ""}
      <div class="mini-teach" id="miniTeachText">
        ${paras.map((pt) => `<p>${escape(pt)}</p>`).join("")}
        ${
          mistake
            ? `<p class="mini-mistake"><strong>Watch out:</strong> ${escape(mistake)}</p>`
            : ""
        }
      </div>
      ${
        typeof verifiedVideoPanelHtml === "function" && mini.video
          ? verifiedVideoPanelHtml(mini.video, { skipButton: false })
          : ""
      }
      ${speak("#miniTeachText", "Hear this lesson")}
      <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
        <button class="btn btn-primary btn-lg" type="button" id="btnAdvance">Got it — show example →</button>
        ${skipBtn}
      </div>`;
  }

  if (phase === "example") {
    const steps = (mini.example && mini.example.steps) || [];
    const shown = Math.max(1, Math.min((Number(session.exampleStep) || 0) + 1, steps.length || 1));
    const more = shown < steps.length;
    return `
      <div class="phase-pill">✏️ Example · step ${shown} of ${steps.length || 1}</div>
      <h3 class="teach-heading">${escape((mini.example && mini.example.title) || "Worked example")}</h3>
      <ol class="teach-steps" id="miniExampleText">
        ${steps
          .slice(0, shown)
          .map((s) => `<li>${escape(s)}</li>`)
          .join("")}
      </ol>
      ${speak("#miniExampleText", "Hear the example")}
      <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
        <button class="btn btn-primary btn-lg" type="button" id="btnAdvance">${
          more ? "Next step →" : "I'm ready for guided practice →"
        }</button>
        ${skipBtn}
      </div>`;
  }

  if (phase === "prereq" || phase === "guided" || phase === "exit") {
    const q = currentMiniQuestion(session, mini);
    if (!q) return `<p class="muted">This step is ready.</p>`;
    const n = phase === "prereq" ? (mini.prereq || []).length : phase === "guided" ? (mini.guided || []).length : 1;
    const i =
      phase === "prereq"
        ? (Number(session.prereqIndex) || 0) + 1
        : phase === "guided"
          ? (Number(session.guidedIndex) || 0) + 1
          : 1;
    const pill =
      phase === "prereq"
        ? `🧭 Ready check · ${i} of ${n}`
        : phase === "guided"
          ? `🤝 Guided practice · ${i} of ${n}`
          : "🏁 End check";
    const hint = q.hint
      ? session.hintShown
        ? `<p class="mini-hint is-open" id="miniHintText"><strong>Hint:</strong> ${escape(q.hint)}</p>`
        : `<p><button class="btn btn-secondary" type="button" id="btnMiniHint">Hint</button></p>`
      : "";
    const revisit =
      phase === "exit" && mini.revisit
        ? `<p class="muted mini-revisit">${escape(mini.revisit)}</p>`
        : "";
    return `
      <div class="phase-pill">${pill}</div>
      ${
        phase === "prereq"
          ? `<p class="muted">A quick check that this lesson is the right next step.</p>`
          : ""
      }
      ${
        phase === "exit"
          ? `<p class="muted">One last question, to see if the idea has stuck.</p>`
          : ""
      }
      <h3 class="teach-heading" id="miniQText">${escape(q.q)}</h3>
      ${hint}
      <div id="qBody"></div>
      <div id="feedback"></div>
      <div id="miniBridge"></div>
      ${revisit}
      <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
        <button class="btn btn-primary" type="button" id="btnCheck">Check</button>
        <button class="btn btn-ok" type="button" id="btnAdvance" style="display:none">Next →</button>
      </div>`;
  }

  return "";
}
