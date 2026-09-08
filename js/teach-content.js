/**
 * Teach modules: UK curriculum micro-lessons with SVG visuals + trusted video links.
 * Used by the adaptive tutor (offline-first). Grok can extend when API key is set.
 */

const VIDEO_LINKS = {
  // Curated UK-friendly education links (open in new tab / embed where allowed)
  fractions: {
    title: "BBC Bitesize — Fractions",
    url: "https://www.bbc.co.uk/bitesize/topics/zhdwxnb",
    embed: null,
  },
  percentages: {
    title: "BBC Bitesize — Percentages",
    url: "https://www.bbc.co.uk/bitesize/topics/znjqtfr",
  },
  algebra: {
    title: "BBC Bitesize — Algebra",
    url: "https://www.bbc.co.uk/bitesize/topics/z2nycdm",
  },
  angles: {
    title: "BBC Bitesize — Angles",
    url: "https://www.bbc.co.uk/bitesize/topics/zb6tyrd",
  },
  averages: {
    title: "BBC Bitesize — Averages",
    url: "https://www.bbc.co.uk/bitesize/topics/zmgthyc",
  },
  placevalue: {
    title: "BBC Bitesize — Place value",
    url: "https://www.bbc.co.uk/bitesize/topics/z8sfr82",
  },
  multiply: {
    title: "Oak National Academy — Multiplication",
    url: "https://www.thenational.academy/teachers/programmes/maths-primary",
  },
  grammar: {
    title: "BBC Bitesize — Grammar",
    url: "https://www.bbc.co.uk/bitesize/topics/zwwp8mn",
  },
  punctuation: {
    title: "BBC Bitesize — Punctuation",
    url: "https://www.bbc.co.uk/bitesize/topics/zwwp8mn",
  },
  reading: {
    title: "BBC Bitesize — Reading",
    url: "https://www.bbc.co.uk/bitesize/subjects/z3kw2hv",
  },
  writing: {
    title: "BBC Bitesize — Writing",
    url: "https://www.bbc.co.uk/bitesize/subjects/z3kw2hv",
  },
  photosynthesis: {
    title: "BBC Bitesize — Photosynthesis",
    url: "https://www.bbc.co.uk/bitesize/topics/zyss34j",
  },
  heart: {
    title: "BBC Bitesize — Circulatory system",
    url: "https://www.bbc.co.uk/bitesize/topics/zcyycdm",
  },
  states: {
    title: "BBC Bitesize — States of matter",
    url: "https://www.bbc.co.uk/bitesize/topics/z9r4jxs",
  },
  forces: {
    title: "BBC Bitesize — Forces",
    url: "https://www.bbc.co.uk/bitesize/topics/znpp34j",
  },
  electricity: {
    title: "BBC Bitesize — Electricity",
    url: "https://www.bbc.co.uk/bitesize/topics/zj44jxs",
  },
  scientific: {
    title: "BBC Bitesize — Working scientifically",
    url: "https://www.bbc.co.uk/bitesize/topics/z2ddmp3",
  },
};

/** Inline SVG helpers */
const SVG = {
  fractionBars: `
    <svg viewBox="0 0 320 120" class="teach-svg" aria-hidden="true">
      <text x="8" y="22" fill="#a8b0d6" font-size="14" font-family="Nunito,sans-serif">1 whole</text>
      <rect x="8" y="30" width="300" height="28" rx="6" fill="#5b8cff"/>
      <text x="8" y="78" fill="#a8b0d6" font-size="14" font-family="Nunito,sans-serif">½ + ½</text>
      <rect x="8" y="86" width="148" height="28" rx="6" fill="#3dd6c6"/>
      <rect x="164" y="86" width="144" height="28" rx="6" fill="#3dd6c6"/>
    </svg>`,
  placeValue: `
    <svg viewBox="0 0 340 100" class="teach-svg" aria-hidden="true">
      <rect x="10" y="20" width="70" height="50" rx="8" fill="#272e52" stroke="#5b8cff" stroke-width="2"/>
      <rect x="90" y="20" width="70" height="50" rx="8" fill="#272e52" stroke="#5b8cff" stroke-width="2"/>
      <rect x="170" y="20" width="70" height="50" rx="8" fill="#ff6bcb" stroke="#ff6bcb" stroke-width="2"/>
      <rect x="250" y="20" width="70" height="50" rx="8" fill="#272e52" stroke="#5b8cff" stroke-width="2"/>
      <text x="45" y="52" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">4</text>
      <text x="125" y="52" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">7</text>
      <text x="205" y="52" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">2</text>
      <text x="285" y="52" text-anchor="middle" fill="#fff" font-size="22" font-weight="700">0</text>
      <text x="45" y="90" text-anchor="middle" fill="#a8b0d6" font-size="11">Thousands</text>
      <text x="125" y="90" text-anchor="middle" fill="#a8b0d6" font-size="11">Hundreds</text>
      <text x="205" y="90" text-anchor="middle" fill="#ff6bcb" font-size="11">Tens</text>
      <text x="285" y="90" text-anchor="middle" fill="#a8b0d6" font-size="11">Ones</text>
    </svg>`,
  triangle: `
    <svg viewBox="0 0 200 140" class="teach-svg" aria-hidden="true">
      <polygon points="100,15 20,120 180,120" fill="none" stroke="#5b8cff" stroke-width="3"/>
      <text x="100" y="85" text-anchor="middle" fill="#ffd166" font-size="16" font-weight="700">180°</text>
      <text x="55" y="115" fill="#a8b0d6" font-size="12">A</text>
      <text x="140" y="115" fill="#a8b0d6" font-size="12">B</text>
      <text x="100" y="35" fill="#a8b0d6" font-size="12">C</text>
    </svg>`,
  balance: `
    <svg viewBox="0 0 280 100" class="teach-svg" aria-hidden="true">
      <line x1="40" y1="50" x2="240" y2="50" stroke="#5b8cff" stroke-width="4"/>
      <circle cx="140" cy="50" r="6" fill="#ffd166"/>
      <text x="70" y="40" fill="#3dd6c6" font-size="16" font-weight="700">3 + □</text>
      <text x="190" y="40" fill="#ff8c5a" font-size="16" font-weight="700">7</text>
      <text x="90" y="85" fill="#a8b0d6" font-size="12">3 and what make 7?</text>
    </svg>`,
  heart: `
    <svg viewBox="0 0 120 110" class="teach-svg" aria-hidden="true" style="max-width:140px">
      <path d="M60 95 C20 70 5 45 25 28 C40 15 55 25 60 35 C65 25 80 15 95 28 C115 45 100 70 60 95Z" fill="#ff6b6b"/>
      <text x="60" y="58" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">HEART</text>
    </svg>`,
  plant: `
    <svg viewBox="0 0 260 120" class="teach-svg" aria-hidden="true">
      <rect x="110" y="50" width="40" height="50" rx="4" fill="#4ade80"/>
      <ellipse cx="130" cy="40" rx="50" ry="25" fill="#22c55e"/>
      <text x="20" y="30" fill="#7ec0f0" font-size="12">CO₂ + water</text>
      <path d="M70 35 L100 45" stroke="#7ec0f0" stroke-width="2" marker-end="url(#a)"/>
      <text x="175" y="30" fill="#ffd166" font-size="12">sunlight</text>
      <text x="90" y="115" fill="#a8b0d6" font-size="12">→ glucose + oxygen</text>
    </svg>`,
  particles: `
    <svg viewBox="0 0 300 100" class="teach-svg" aria-hidden="true">
      <text x="30" y="18" fill="#a8b0d6" font-size="12">Solid</text>
      <circle cx="25" cy="45" r="6" fill="#5b8cff"/><circle cx="40" cy="45" r="6" fill="#5b8cff"/>
      <circle cx="25" cy="60" r="6" fill="#5b8cff"/><circle cx="40" cy="60" r="6" fill="#5b8cff"/>
      <text x="120" y="18" fill="#a8b0d6" font-size="12">Liquid</text>
      <circle cx="115" cy="42" r="6" fill="#3dd6c6"/><circle cx="135" cy="50" r="6" fill="#3dd6c6"/>
      <circle cx="125" cy="65" r="6" fill="#3dd6c6"/><circle cx="145" cy="40" r="6" fill="#3dd6c6"/>
      <text x="220" y="18" fill="#a8b0d6" font-size="12">Gas</text>
      <circle cx="210" cy="40" r="5" fill="#ff8c5a"/><circle cx="245" cy="55" r="5" fill="#ff8c5a"/>
      <circle cx="225" cy="70" r="5" fill="#ff8c5a"/><circle cx="255" cy="35" r="5" fill="#ff8c5a"/>
    </svg>`,
  sentence: `
    <svg viewBox="0 0 320 70" class="teach-svg" aria-hidden="true">
      <rect x="10" y="15" width="90" height="36" rx="8" fill="#5b8cff"/>
      <text x="55" y="38" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">Subject</text>
      <rect x="115" y="15" width="90" height="36" rx="8" fill="#3dd6c6"/>
      <text x="160" y="38" text-anchor="middle" fill="#0f1221" font-size="13" font-weight="700">Verb</text>
      <rect x="220" y="15" width="90" height="36" rx="8" fill="#ff8c5a"/>
      <text x="265" y="38" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">Object</text>
    </svg>`,
};

/**
 * Each module: teach, example, practice[], struggle (simpler), videoKey
 */
const TEACH_MODULES = {
  maths: {
    number: {
      title: "Counting & numbers",
      blurb: "Count forwards, compare, and know tens and ones.",
      videoKey: "placevalue",
      teach: {
        points: [
          "Numbers tell us how many. 1, 2, 3, 4… keep going.",
          "Bigger means more. 9 is bigger than 4.",
          "10 ones make 1 ten. 20 is 2 tens.",
        ],
        visual: SVG.placeValue,
      },
      example: {
        title: "Worked example",
        steps: [
          "Count from 6: 6, 7, 8 — so 8 comes after 7.",
          "Compare 5 and 2: 5 is more.",
          "14 is 1 ten and 4 ones.",
        ],
      },
      practice: [
        {
          q: "What number comes after 11?",
          type: "typed",
          answer: "12",
          explain: "11, then 12.",
        },
        {
          q: "Which is bigger?",
          type: "multi",
          options: ["3", "8", "1", "6"],
          answer: 1,
          explain: "8 is the biggest.",
        },
        {
          q: "How many tens in 30?",
          type: "typed",
          answer: "3",
          explain: "30 is 3 tens.",
        },
      ],
      struggle: {
        points: [
          "Use your fingers. Hold up 7, then one more is 8.",
          "Draw the numbers in a line: 1 2 3 4 5 6 7 8 9 10.",
        ],
        practice: [
          {
            q: "What comes after 4?",
            type: "multi",
            options: ["3", "4", "5", "6"],
            answer: 2,
            explain: "4, then 5.",
          },
          {
            q: "Which is smaller: 2 or 7?",
            type: "multi",
            options: ["2", "7"],
            answer: 0,
            explain: "2 is smaller.",
          },
          {
            q: "What number is this: ten?",
            type: "typed",
            answer: "10",
            explain: "Ten is 10.",
          },
        ],
      },
    },
    operations: {
      title: "Add, take away, times",
      blurb: "Small sums first. Fingers are allowed.",
      videoKey: "multiply",
      teach: {
        points: [
          "Add means put together: 2 + 3 = 5.",
          "Take away means how many are left: 5 − 2 = 3.",
          "Times means groups: 2 × 4 is two groups of 4 = 8.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["4 + 3", "Start at 4. Count on 3: 5, 6, 7.", "So 4 + 3 = 7."],
      },
      practice: [
        {
          q: "What is 5 + 2?",
          type: "typed",
          answer: "7",
          explain: "5 and 2 more is 7.",
        },
        {
          q: "What is 8 − 3?",
          type: "typed",
          answer: "5",
          explain: "Take 3 from 8 → 5.",
        },
        {
          q: "What is 3 × 2?",
          type: "multi",
          options: ["5", "6", "8", "32"],
          answer: 1,
          explain: "Three 2s: 2 + 2 + 2 = 6.",
        },
      ],
      struggle: {
        points: [
          "Use fingers or draw dots.",
          "For take away, start with the bigger number and count backwards.",
        ],
        practice: [
          {
            q: "What is 1 + 1?",
            type: "typed",
            answer: "2",
            explain: "1 and 1 more is 2.",
          },
          {
            q: "What is 4 − 1?",
            type: "typed",
            answer: "3",
            explain: "Take 1 from 4 → 3.",
          },
          {
            q: "What is 2 × 2?",
            type: "multi",
            options: ["2", "3", "4", "22"],
            answer: 2,
            explain: "Two 2s make 4.",
          },
        ],
      },
    },
    fractions: {
      title: "Halves & quarters",
      blurb: "Sharing into 2 or 4 equal pieces.",
      videoKey: "fractions",
      teach: {
        points: [
          "Half means 2 equal parts. Half of 8 is 4.",
          "A quarter means 4 equal parts. A quarter of 8 is 2.",
          "If you share a cake equally with a friend, you each get a half.",
        ],
        visual: SVG.fractionBars,
      },
      example: {
        title: "Worked example",
        steps: [
          "Half of 10.",
          "Split 10 into 2 equal groups.",
          "Each group is 5.",
        ],
      },
      practice: [
        {
          q: "What is half of 4?",
          type: "typed",
          answer: "2",
          explain: "4 split into 2 equal groups is 2.",
        },
        {
          q: "A pizza cut into 4 equal slices. One slice is…",
          type: "multi",
          options: ["a half", "a quarter", "the whole pizza", "none"],
          answer: 1,
          explain: "1 of 4 equal parts is a quarter.",
        },
        {
          q: "What is a quarter of 4?",
          type: "typed",
          answer: "1",
          explain: "4 ÷ 4 = 1.",
        },
      ],
      struggle: {
        points: [
          "Fold a paper in two — that is a half.",
          "Fold it again — each piece is a quarter.",
        ],
        practice: [
          {
            q: "Half of 2 is…",
            type: "typed",
            answer: "1",
            explain: "2 split into 2 groups is 1.",
          },
          {
            q: "Two halves make…",
            type: "multi",
            options: ["nothing", "a quarter", "a whole", "three"],
            answer: 2,
            explain: "Two halves make one whole.",
          },
        ],
      },
    },
    algebra: {
      title: "Missing numbers",
      blurb: "Find the number that belongs in the box. Not GCSE algebra.",
      videoKey: "algebra",
      teach: {
        points: [
          "A box □ is a number we have not written yet.",
          "3 + □ = 5 means: 3 and what make 5?",
          "The answer is 2, because 3 + 2 = 5.",
        ],
        visual: SVG.balance,
      },
      example: {
        title: "Worked example",
        steps: ["5 + □ = 9", "Start at 5. Count up to 9: 6, 7, 8, 9.", "That was 4 jumps. So □ is 4."],
      },
      practice: [
        {
          q: "2 + □ = 6. What is □?",
          type: "typed",
          answer: "4",
          explain: "2 and 4 make 6.",
        },
        {
          q: "□ + 1 = 4. What is □?",
          type: "typed",
          answer: "3",
          explain: "3 and 1 make 4.",
        },
        {
          q: "10 − □ = 7. What is □?",
          type: "multi",
          options: ["2", "3", "4", "17"],
          answer: 1,
          explain: "10 take away 3 is 7.",
        },
      ],
      struggle: {
        points: [
          "Use counters or fingers.",
          "Ask: what do I add to the first number to reach the total?",
        ],
        practice: [
          {
            q: "1 + □ = 2. What is □?",
            type: "typed",
            answer: "1",
            explain: "1 and 1 make 2.",
          },
          {
            q: "5 − □ = 5. What is □?",
            type: "typed",
            answer: "0",
            explain: "Take away 0 and 5 stays 5.",
          },
          {
            q: "□ + 0 = 3. What is □?",
            type: "multi",
            options: ["0", "1", "3", "30"],
            answer: 2,
            explain: "3 and 0 make 3.",
          },
        ],
      },
    },
    geometry: {
      title: "Shapes",
      blurb: "Name shapes and count sides.",
      videoKey: "angles",
      teach: {
        points: [
          "A triangle has 3 sides. A square has 4 equal sides.",
          "A circle is round, like a wheel.",
          "A rectangle has 4 sides — two long and two short, or all looking like a door.",
        ],
        visual: SVG.triangle,
      },
      example: {
        title: "Worked example",
        steps: [
          "Look at a square window.",
          "Count the sides: 1, 2, 3, 4.",
          "Four equal sides → square.",
        ],
      },
      practice: [
        {
          q: "How many sides does a triangle have?",
          type: "typed",
          answer: "3",
          explain: "Tri means 3.",
        },
        {
          q: "A circle is…",
          type: "multi",
          options: ["round", "a square", "three-sided", "a cube"],
          answer: 0,
          explain: "A circle is round.",
        },
        {
          q: "How many sides does a square have?",
          type: "typed",
          answer: "4",
          explain: "A square has 4 sides.",
        },
      ],
      struggle: {
        points: [
          "Trace the shape with your finger and count each side once.",
          "Triangle = 3, square = 4, pentagon = 5.",
        ],
        practice: [
          {
            q: "How many sides does a circle have?",
            type: "multi",
            options: ["0 — it is round", "3", "4", "100"],
            answer: 0,
            explain: "A circle is a round line, not straight sides.",
          },
          {
            q: "A square has 4…",
            type: "multi",
            options: ["sides", "wheels", "flavours", "hours"],
            answer: 0,
            explain: "4 sides.",
          },
        ],
      },
    },
    data: {
      title: "Sorting & pictograms",
      blurb: "More, less, and simple pictures of numbers.",
      videoKey: "averages",
      teach: {
        points: [
          "More means a bigger amount. 6 is more than 2.",
          "A tally mark | means 1. Four marks |||| means 4.",
          "If 3 children like red and 1 likes blue, red is more popular.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Apples: 2. Bananas: 5.",
          "5 is more than 2.",
          "So there are more bananas.",
        ],
      },
      practice: [
        {
          q: "Which is more: 4 or 1?",
          type: "multi",
          options: ["4", "1", "the same"],
          answer: 0,
          explain: "4 is more than 1.",
        },
        {
          q: "A tally ||| means…",
          type: "typed",
          answer: "3",
          explain: "Three marks = 3.",
        },
        {
          q: "2 children like cats, 6 like dogs. Which is more popular?",
          type: "multi",
          options: ["cats", "dogs", "the same"],
          answer: 1,
          explain: "6 is more than 2.",
        },
      ],
      struggle: {
        points: [
          "Count the pictures. The taller pile is more.",
          "Each tally mark is one.",
        ],
        practice: [
          {
            q: "Which is less: 9 or 2?",
            type: "multi",
            options: ["9", "2"],
            answer: 1,
            explain: "2 is less.",
          },
          {
            q: "|||| how many?",
            type: "typed",
            answer: "4",
            explain: "Four marks.",
          },
        ],
      },
    },
  },
  english: {
    grammar: {
      title: "Grammar gym",
      blurb: "Build clear sentences.",
      videoKey: "grammar",
      teach: {
        points: [
          "Every sentence needs a subject (who) and a verb (does what).",
          "Subject–verb agreement: they were, not they was.",
          "Adjectives describe nouns: the fierce storm.",
        ],
        visual: SVG.sentence,
      },
      example: {
        title: "Worked example",
        steps: [
          "Wrong: They was going.",
          "They = plural → use were.",
          "Correct: They were going.",
        ],
      },
      practice: [
        {
          q: "Correct sentence?",
          type: "multi",
          options: [
            "They was going to the park.",
            "They were going to the park.",
            "They is going to the park.",
            "They be going.",
          ],
          answer: 1,
          explain: "Plural 'they' takes 'were'.",
        },
        {
          q: "Verb in: The cat slept on the mat.",
          type: "multi",
          options: ["cat", "slept", "on", "mat"],
          answer: 1,
          explain: "Slept = action.",
        },
        {
          q: "Adjective in: The fierce storm hit Wales.",
          type: "multi",
          options: ["storm", "fierce", "hit", "Wales"],
          answer: 1,
          explain: "Fierce describes storm.",
        },
      ],
      struggle: {
        points: [
          "Find the verb first — the 'doing' or 'being' word.",
          "Read the sentence aloud; wrong grammar often sounds odd.",
        ],
        practice: [
          {
            q: "She ___ happy. (is/are)",
            type: "multi",
            options: ["is", "are"],
            answer: 0,
            explain: "She = singular → is.",
          },
        ],
      },
    },
    punctuation: {
      title: "Punctuation patrol",
      blurb: "Apostrophes, commas, spelling — GCSE SPaG.",
      videoKey: "punctuation",
      teach: {
        points: [
          "Apostrophe for belonging: the dog's bone (one dog).",
          "Apostrophe for missing letters: don't = do not.",
          "Comma after Yes/No at the start: Yes, I will help.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["the dogs bone → one dog owns it → dog's bone"],
      },
      practice: [
        {
          q: "Apostrophe: The dogs bone was buried.",
          type: "multi",
          options: ["dogs'", "dog's", "dogs", "dog's'"],
          answer: 1,
          explain: "One dog → dog's.",
        },
        {
          q: "Correct spelling?",
          type: "multi",
          options: ["definately", "definitely", "definatly", "definetely"],
          answer: 1,
          explain: "definitely — 'finite' in the middle.",
        },
        {
          q: "Yes I will help. — best fix?",
          type: "multi",
          options: [
            "Yes I will, help.",
            "Yes, I will help.",
            "Yes I, will help.",
            "No change",
          ],
          answer: 1,
          explain: "Comma after Yes.",
        },
      ],
      struggle: {
        points: [
          "Belonging: write 'of the dog' → dog's.",
          "Spelling: break words into chunks and say them slowly.",
        ],
        practice: [
          {
            q: "it is → shortened?",
            type: "multi",
            options: ["its", "it's", "its'"],
            answer: 1,
            explain: "it's = it is.",
          },
        ],
      },
    },
    vocabulary: {
      title: "Word wizardry",
      blurb: "Meanings and better word choices.",
      videoKey: "reading",
      teach: {
        points: [
          "Synonym = similar meaning (brave / courageous).",
          "Antonym = opposite (ancient / modern).",
          "Use precise words in writing for higher marks.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["rapid → means fast", "Not slow, heavy, or noisy."],
      },
      practice: [
        {
          q: "'Rapid' means…",
          type: "multi",
          options: ["slow", "fast", "heavy", "noisy"],
          answer: 1,
          explain: "Rapid = fast.",
        },
        {
          q: "Synonym of brave?",
          type: "multi",
          options: ["cowardly", "fearful", "courageous", "timid"],
          answer: 2,
          explain: "Courageous = brave.",
        },
        {
          q: "Antonym of ancient?",
          type: "multi",
          options: ["old", "modern", "historic", "aged"],
          answer: 1,
          explain: "Modern is opposite.",
        },
      ],
      struggle: {
        points: [
          "Try the word in a sentence you invent — does it fit?",
          "Look for root words: courage → courageous.",
        ],
        practice: [
          {
            q: "Enormous means…",
            type: "multi",
            options: ["tiny", "very large", "quiet"],
            answer: 1,
            explain: "Enormous = huge.",
          },
        ],
      },
    },
    reading: {
      title: "Reading quests",
      blurb: "Inference and evidence — GCSE Reading.",
      videoKey: "reading",
      teach: {
        points: [
          "Inference = work out what is meant, not only what is said.",
          "Use clues in the text (grinned, hands shook → excited).",
          "Atmosphere comes from word choices: silent, dust, carefully.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Text: He grinned so wide his cheeks hurt.",
          "Clue: grinned, cheeks hurt.",
          "Inference: he is very happy/excited.",
        ],
      },
      practice: [
        {
          passage:
            "Sam’s hands shook as he opened the envelope. Inside was a ticket. He grinned so wide his cheeks hurt.",
          q: "How does Sam feel?",
          type: "multi",
          options: ["Angry", "Bored", "Excited / happy", "Confused only"],
          answer: 2,
          explain: "Shaking + huge grin → excitement.",
        },
        {
          passage:
            "The village green was empty. Footballs lay abandoned.",
          q: "This suggests…",
          type: "multi",
          options: [
            "A party is starting",
            "A quiet / empty scene",
            "It is underwater",
            "Desert heat",
          ],
          answer: 1,
          explain: "Empty + abandoned → no one there.",
        },
        {
          q: "Main purpose of an information text?",
          type: "multi",
          options: ["Invent a story", "Inform the reader", "Confuse", "Rhyme only"],
          answer: 1,
          explain: "Information texts inform.",
        },
      ],
      struggle: {
        points: [
          "Highlight feeling words and action words.",
          "Ask: why did the writer choose that word?",
        ],
        practice: [
          {
            passage: "Tears rolled down her face as she laughed.",
            q: "She is probably…",
            type: "multi",
            options: ["Only sad", "Very happy (maybe emotional)", "Sleepy"],
            answer: 1,
            explain: "Laughing + tears often = strong happy emotion.",
          },
        ],
      },
    },
    writing: {
      title: "Writing workshop",
      blurb: "Techniques that score marks.",
      videoKey: "writing",
      teach: {
        points: [
          "Simile: like/as (moon like a silver coin).",
          "Metaphor: says something is something else (he was a rocket).",
          "Topic sentence states the paragraph’s main idea.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Simile: as brave as a lion.",
          "Metaphor: the classroom was a zoo.",
        ],
      },
      practice: [
        {
          q: "Which is a simile?",
          type: "multi",
          options: [
            "The moon was bright.",
            "The moon was like a silver coin.",
            "The moon glowed.",
            "The moon watched.",
          ],
          answer: 1,
          explain: "Uses 'like'.",
        },
        {
          q: "Which is a metaphor?",
          type: "multi",
          options: [
            "He ran like the wind.",
            "He was a rocket down the pitch.",
            "He ran quickly.",
            "He ran and jumped.",
          ],
          answer: 1,
          explain: "Says he was a rocket.",
        },
        {
          q: "Best topic sentence about recycling?",
          type: "multi",
          options: [
            "I like pizza.",
            "Recycling helps protect the environment in several ways.",
            "Then we put bottles in a box.",
            "The end.",
          ],
          answer: 1,
          explain: "Introduces the main idea.",
        },
      ],
      struggle: {
        points: [
          "Simile = compare with like/as. Metaphor = is.",
          "Topic sentence = what the whole paragraph is about.",
        ],
        practice: [
          {
            q: "Alliteration is…",
            type: "multi",
            options: [
              "Same starting sounds",
              "A full stop",
              "A silent letter",
            ],
            answer: 0,
            explain: "e.g. slippery snakes.",
          },
        ],
      },
    },
  },
  science: {
    biology: {
      title: "Living world lab",
      blurb: "Life processes — GCSE Biology pathway.",
      videoKey: "photosynthesis",
      teach: {
        points: [
          "The heart pumps blood around the body.",
          "Photosynthesis: plants use light, CO₂ and water to make food (glucose) and oxygen.",
          "Pathogens are microbes that can cause disease.",
        ],
        visual: SVG.plant,
      },
      example: {
        title: "Worked example",
        steps: [
          "Question: which organ pumps blood?",
          "Lungs exchange gases; brain controls; heart pumps → heart.",
        ],
      },
      practice: [
        {
          q: "Which organ pumps blood?",
          type: "multi",
          options: ["Lungs", "Brain", "Heart", "Stomach"],
          answer: 2,
          explain: "Heart is the pump.",
        },
        {
          q: "Plants make food using sunlight — process name?",
          type: "multi",
          options: ["respiration", "photosynthesis", "digestion", "evaporation"],
          answer: 1,
          explain: "Photosynthesis.",
        },
        {
          q: "Disease-causing microbes are called…",
          type: "multi",
          options: ["nutrients", "pathogens", "minerals", "vitamins"],
          answer: 1,
          explain: "Pathogens.",
        },
      ],
      struggle: {
        points: [
          "Photo = light, synthesis = making → making food with light.",
          "Heart = pump; lungs = breathing.",
        ],
        visual: SVG.heart,
        practice: [
          {
            q: "Photosynthesis needs…",
            type: "multi",
            options: ["Only darkness", "Light, CO₂, water", "Only plastic"],
            answer: 1,
            explain: "Light + CO₂ + water.",
          },
        ],
      },
    },
    chemistry: {
      title: "Materials lab",
      blurb: "Particles and changes.",
      videoKey: "states",
      teach: {
        points: [
          "Solid: fixed shape. Liquid: flows. Gas: fills space.",
          "Melting ice is a physical change (still water/H₂O).",
          "Rusting iron is a chemical change (new substance).",
        ],
        visual: SVG.particles,
      },
      example: {
        title: "Worked example",
        steps: [
          "Ice melts → particles gain energy, move more freely.",
          "Still H₂O → physical change.",
        ],
      },
      practice: [
        {
          q: "Water freezing is a…",
          type: "multi",
          options: ["chemical change", "physical change", "nuclear change"],
          answer: 1,
          explain: "State change only.",
        },
        {
          q: "Fixed shape and volume?",
          type: "multi",
          options: ["Gas", "Liquid", "Solid"],
          answer: 2,
          explain: "Solid.",
        },
        {
          q: "Sand and water separated by…",
          type: "multi",
          options: ["Magnetism only", "Filtration", "Hearing"],
          answer: 1,
          explain: "Filter out sand.",
        },
      ],
      struggle: {
        points: [
          "Physical = same substance, different form.",
          "Chemical = new substance made (hard to reverse).",
        ],
        practice: [
          {
            q: "Chocolate melting is mostly…",
            type: "multi",
            options: ["physical", "creating a new metal"],
            answer: 0,
            explain: "Still chocolate — physical.",
          },
        ],
      },
    },
    physics: {
      title: "Forces & energy lab",
      blurb: "Forces, energy, circuits.",
      videoKey: "forces",
      teach: {
        points: [
          "Gravity pulls objects toward Earth.",
          "Friction opposes motion between surfaces.",
          "Sound is vibrations travelling as waves.",
          "Series circuit: one break → all off.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Stretched rubber band stores elastic potential energy.",
          "When released, energy transfers to movement.",
        ],
      },
      practice: [
        {
          q: "Force toward Earth?",
          type: "multi",
          options: ["Friction", "Magnetism", "Gravity", "Upthrust only"],
          answer: 2,
          explain: "Gravity.",
        },
        {
          q: "Sound travels as…",
          type: "multi",
          options: ["smell", "vibration / wave", "only light", "static"],
          answer: 1,
          explain: "Vibrations / waves.",
        },
        {
          q: "Stretched band energy store?",
          type: "multi",
          options: ["Chemical", "Elastic potential", "Nuclear"],
          answer: 1,
          explain: "Elastic potential.",
        },
      ],
      struggle: {
        points: [
          "Name the force: push, pull, rub (friction), fall (gravity).",
          "Energy is stored or transferred — it doesn’t vanish.",
        ],
        practice: [
          {
            q: "Friction usually…",
            type: "multi",
            options: ["speeds you forever", "opposes motion", "creates gravity"],
            answer: 1,
            explain: "Opposes motion.",
          },
        ],
      },
    },
    method: {
      title: "Scientist skills",
      blurb: "Fair tests and variables.",
      videoKey: "scientific",
      teach: {
        points: [
          "Independent variable = what you change.",
          "Dependent variable = what you measure.",
          "Control variables = what you keep the same (fair test).",
          "Repeats improve reliability.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Test: does fertilizer change plant height?",
          "Change: fertilizer amount (independent).",
          "Measure: height (dependent).",
          "Same: plant type, water, light (controls).",
        ],
      },
      practice: [
        {
          q: "Variable you measure is…",
          type: "multi",
          options: ["control", "independent", "dependent", "lucky"],
          answer: 2,
          explain: "Dependent = measured.",
        },
        {
          q: "Repeating measurements improves…",
          type: "multi",
          options: ["handwriting", "reliability", "gravity"],
          answer: 1,
          explain: "Reliability.",
        },
        {
          q: "A hypothesis is…",
          type: "multi",
          options: [
            "random guess",
            "testable prediction",
            "only the conclusion",
            "a microscope",
          ],
          answer: 1,
          explain: "Testable prediction.",
        },
      ],
      struggle: {
        points: [
          "Change one thing only for a fair test.",
          "Write hypothesis as: If I change X, then Y will happen because…",
        ],
        practice: [
          {
            q: "In a fair test change…",
            type: "multi",
            options: ["everything", "one variable", "nothing"],
            answer: 1,
            explain: "One independent variable.",
          },
        ],
      },
    },
  },
  karting: {
    safety: {
      title: "Track safety",
      blurb: "Helmet on. Watch the flags. Look after yourself and others.",
      videoKey: "forces",
      teach: {
        points: [
          "A helmet goes on before you sit in the kart. No helmet, no driving.",
          "A red flag means stop — something is wrong on the track.",
          "Keep your hands on the wheel and your feet on the pedals.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "You walk to the kart.",
          "Put the helmet on and do it up.",
          "Then you may sit down and wait for the marshal.",
        ],
      },
      practice: [
        {
          q: "What must you wear on your head?",
          type: "multi",
          options: ["A helmet", "A baseball cap", "Nothing"],
          answer: 0,
          explain: "A proper helmet every time.",
        },
        {
          q: "A red flag means…",
          type: "multi",
          options: ["Go faster", "Stop", "You won"],
          answer: 1,
          explain: "Red = stop. There is a problem.",
        },
        {
          q: "Who helps keep the track safe?",
          type: "multi",
          options: ["Marshals", "The ice-cream van", "Nobody"],
          answer: 0,
          explain: "Marshals watch the track and wave flags.",
        },
      ],
      struggle: {
        points: [
          "Think of a bike helmet — same idea, but for a kart.",
          "Flags are like traffic lights for racing.",
        ],
        practice: [
          {
            q: "True or false: you can drive without a helmet.",
            type: "multi",
            options: ["True", "False"],
            answer: 1,
            explain: "False. Helmet first.",
          },
          {
            q: "Red flag = …",
            type: "multi",
            options: ["stop", "speed up"],
            answer: 0,
            explain: "Stop.",
          },
        ],
      },
    },
    kart: {
      title: "The kart",
      blurb: "Steering wheel, two pedals, four tyres.",
      videoKey: "forces",
      teach: {
        points: [
          "The steering wheel turns the kart left and right.",
          "One pedal makes you go. The other is the brake — it slows you down.",
          "Tyres grip the track. If they are bald or flat, tell a marshal.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Want to go? Press the go pedal gently.",
          "Want to slow? Take your foot off go and press the brake.",
          "Want to turn? Turn the wheel a little, not a huge yank.",
        ],
      },
      practice: [
        {
          q: "The brake pedal…",
          type: "multi",
          options: ["makes you faster", "slows you down", "plays music"],
          answer: 1,
          explain: "Brake = slower.",
        },
        {
          q: "The steering wheel…",
          type: "multi",
          options: ["turns the kart", "opens the engine", "is only for sitting"],
          answer: 0,
          explain: "It turns left and right.",
        },
        {
          q: "How many tyres does a kart usually have?",
          type: "typed",
          answer: "4",
          explain: "Four tyres, like a tiny car.",
        },
      ],
      struggle: {
        points: [
          "Go pedal = faster. Brake pedal = slower. Wheel = turn.",
          "Gentle feet. Don’t stamp.",
        ],
        practice: [
          {
            q: "To slow down you use the…",
            type: "multi",
            options: ["brake", "horn", "seat"],
            answer: 0,
            explain: "The brake.",
          },
        ],
      },
    },
    racing: {
      title: "Race day",
      blurb: "Start, laps, flags, finish.",
      videoKey: "forces",
      teach: {
        points: [
          "A lap is one time all the way round the track.",
          "The chequered flag (black and white squares) means the race is finished.",
          "A green flag often means the track is clear — you may go.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Lights go out or green flag: start.",
          "You drive round and round — each loop is a lap.",
          "Chequered flag: slow down and head to the pits. You finished!",
        ],
      },
      practice: [
        {
          q: "The chequered flag means…",
          type: "multi",
          options: ["start", "the race is finished", "rain"],
          answer: 1,
          explain: "Black and white squares = finished.",
        },
        {
          q: "One time all the way round the track is a…",
          type: "multi",
          options: ["lap", "goal", "chapter"],
          answer: 0,
          explain: "A lap.",
        },
        {
          q: "You should wait for the marshal before you…",
          type: "multi",
          options: ["leave the pits", "eat lunch only", "go home without asking"],
          answer: 0,
          explain: "Marshals say when it is safe to go.",
        },
      ],
      struggle: {
        points: [
          "Start → drive laps → chequered flag → stop.",
          "Watch the people at the side with flags.",
        ],
        practice: [
          {
            q: "Chequered flag = …",
            type: "multi",
            options: ["finish", "start"],
            answer: 0,
            explain: "Finish.",
          },
        ],
      },
    },
    driving: {
      title: "How to drive",
      blurb: "Look where you want to go. Slow for corners.",
      videoKey: "forces",
      teach: {
        points: [
          "Look ahead, not at your feet.",
          "Slow down before a corner, then steer, then speed up a little on the straight.",
          "Leave a gap. Do not bump other karts on purpose.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Straight: look far down the track.",
          "Corner coming: ease off, press the brake a bit.",
          "Turn the wheel smoothly. Then go again.",
        ],
      },
      practice: [
        {
          q: "Before a corner you should…",
          type: "multi",
          options: ["slow down", "speed up as much as you can", "close your eyes"],
          answer: 0,
          explain: "Slow in, then turn.",
        },
        {
          q: "Look…",
          type: "multi",
          options: ["at your feet", "ahead down the track", "behind you the whole time"],
          answer: 1,
          explain: "Look where you want to go.",
        },
        {
          q: "Bumping other karts on purpose is…",
          type: "multi",
          options: ["clever", "not allowed", "the way to win"],
          answer: 1,
          explain: "Leave a gap. Be fair.",
        },
      ],
      struggle: {
        points: [
          "Slow → turn → go. That is the pattern.",
          "Eyes up.",
        ],
        practice: [
          {
            q: "Slow down for a…",
            type: "multi",
            options: ["corner", "straight with no one on it"],
            answer: 0,
            explain: "Corners need less speed.",
          },
        ],
      },
    },
  },
  horses: {
    care: {
      title: "Looking after a horse",
      blurb: "Water, a clean stable, and gentle hands.",
      videoKey: "scientific",
      teach: {
        points: [
          "A horse needs fresh water every day.",
          "Grooming means brushing the coat so it is clean and you can check for sore bits.",
          "Speak softly. Horses notice if you rush or shout.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Check the water bucket is full and clean.",
          "Brush from neck to tail, the way the hair grows.",
          "Look at the hooves. Tell an adult if something looks sore.",
        ],
      },
      practice: [
        {
          q: "Horses need fresh water…",
          type: "multi",
          options: ["every day", "once a year", "never"],
          answer: 0,
          explain: "Every day. They drink a lot.",
        },
        {
          q: "Grooming means…",
          type: "multi",
          options: ["brushing the coat", "shouting", "racing"],
          answer: 0,
          explain: "Brushing and checking the horse.",
        },
        {
          q: "Around a horse you should be…",
          type: "multi",
          options: ["calm and kind", "as loud as possible", "running in circles"],
          answer: 0,
          explain: "Calm voices, slow moves.",
        },
      ],
      struggle: {
        points: [
          "Water, food, shelter, kindness — the same four things you need.",
          "Brush the way the hair grows.",
        ],
        practice: [
          {
            q: "A horse’s water should be…",
            type: "multi",
            options: ["fresh", "empty"],
            answer: 0,
            explain: "Fresh, every day.",
          },
        ],
      },
    },
    feeding: {
      title: "Feeding",
      blurb: "Hay and grass. Not chocolate.",
      videoKey: "scientific",
      teach: {
        points: [
          "Horses eat grass and hay most of the time.",
          "They can have some pony nuts or mix — an adult will measure this.",
          "Chocolate, onions and lots of human snacks can make a horse very ill.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "In the field: grass.",
          "In the stable: a hay net, so they can nibble slowly.",
          "Treats: a carrot or apple slice, not a whole bag of sweets.",
        ],
      },
      practice: [
        {
          q: "A horse’s main food is…",
          type: "multi",
          options: ["hay and grass", "chocolate", "chips"],
          answer: 0,
          explain: "Hay and grass.",
        },
        {
          q: "A safe treat is often…",
          type: "multi",
          options: ["a carrot", "a chocolate bar", "an onion"],
          answer: 0,
          explain: "Carrot or apple — not chocolate.",
        },
        {
          q: "Who should measure hard feed (pony nuts)?",
          type: "multi",
          options: ["An adult who knows the horse", "Anyone, as much as they like"],
          answer: 0,
          explain: "Too much hard feed is not kind.",
        },
      ],
      struggle: {
        points: [
          "Grass and hay = yes. Chocolate = no.",
          "Small treats. Not a feast.",
        ],
        practice: [
          {
            q: "Chocolate for horses?",
            type: "multi",
            options: ["No", "Yes, lots"],
            answer: 0,
            explain: "No.",
          },
        ],
      },
    },
    riding: {
      title: "Riding basics",
      blurb: "Hat on. Mount calmly. Walk first.",
      videoKey: "scientific",
      teach: {
        points: [
          "A riding hat / helmet every time you sit on a horse.",
          "Walk is the slow pace. Trot is bouncier. Canter is faster — later.",
          "Hold the reins gently. The horse feels your hands.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Hat on. Check the girth with an adult.",
          "Mount from the left, using a block if you have one.",
          "Walk a circle. Sit tall. Smile — you are riding!",
        ],
      },
      practice: [
        {
          q: "Before you ride, wear a…",
          type: "multi",
          options: ["riding hat", "flip-flops", "no hat"],
          answer: 0,
          explain: "Hat on. Every ride.",
        },
        {
          q: "The slowest pace is…",
          type: "multi",
          options: ["walk", "canter", "gallop"],
          answer: 0,
          explain: "Walk first.",
        },
        {
          q: "Hands on the reins should be…",
          type: "multi",
          options: ["gentle", "as hard as you can yank"],
          answer: 0,
          explain: "Soft hands. The horse feels everything.",
        },
      ],
      struggle: {
        points: [
          "Hat. Walk. Kind hands.",
          "An instructor helps you mount.",
        ],
        practice: [
          {
            q: "Walk is…",
            type: "multi",
            options: ["slow", "the fastest pace"],
            answer: 0,
            explain: "Slow and steady.",
          },
        ],
      },
    },
    history: {
      title: "History of horses",
      blurb: "How horses helped people long before cars.",
      videoKey: "reading",
      teach: {
        points: [
          "For thousands of years horses helped people travel, farm and carry loads.",
          "Knights rode horses. So did messengers and farmers.",
          "Today we still ride for sport and fun, and some horses still work on farms and with police.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: [
          "Before cars: a horse and cart took you to market.",
          "In war and tournaments: knights sat on horses.",
          "Now: riding schools, racing, and police horses in towns.",
        ],
      },
      practice: [
        {
          q: "Before cars, horses helped people…",
          type: "multi",
          options: ["travel and farm", "send emails", "charge phones"],
          answer: 0,
          explain: "Travel, farm, carry things.",
        },
        {
          q: "Knights often rode…",
          type: "multi",
          options: ["horses", "bicycles", "trains"],
          answer: 0,
          explain: "Horses.",
        },
        {
          q: "Today you might see a police horse…",
          type: "multi",
          options: ["in a town or at a crowd", "only on the moon"],
          answer: 0,
          explain: "Police horses still work with people.",
        },
      ],
      struggle: {
        points: [
          "Old job: travel and farm. New job: sport, riding schools, police.",
          "People and horses have been a team for a very long time.",
        ],
        practice: [
          {
            q: "A horse and cart was used…",
            type: "multi",
            options: ["before cars were common", "only in space"],
            answer: 0,
            explain: "To travel and carry goods.",
          },
        ],
      },
    },
  },
  investing: {
    compound: {
      title: "The money snowball",
      blurb: "Leave money in. Growth can earn more growth. That is compound investing.",
      videoKey: "number",
      teach: {
        points: [
          "If you hide £10 under the bed, next year you still have £10.",
          "If you invest £10 and it grows 10%, you have £11. Next year 10% of £11 is more than 10% of £10.",
          "That extra-on-the-extra is the snowball. The longer you leave it, the bigger it can get.",
        ],
        visual: "£10 → grows → £11 → grows → £12.10 → and so on.",
      },
      example: {
        title: "Worked example",
        steps: [
          "Start with £10.",
          "It grows 10% → add £1 → £11.",
          "Next year 10% of £11 is £1.10 → £12.10. The snowball got a little bigger.",
        ],
      },
      practice: [
        {
          q: "Compound investing is like a…",
          type: "multi",
          options: ["snowball that can grow", "hole that eats money", "game you always win"],
          answer: 0,
          explain: "Growth can earn more growth if you leave it in.",
        },
        {
          q: "The snowball works best when you…",
          type: "multi",
          options: ["leave the money in for a long time", "spend it the same day", "change your mind every week"],
          answer: 0,
          explain: "Time is the secret. Start young.",
        },
        {
          q: "£10 under the bed after a year is still…",
          type: "typed",
          answer: "10",
          explain: "It did not grow. Investing is how a pot can grow.",
        },
      ],
      struggle: {
        points: [
          "Bed = same number. Invested pot = number can grow.",
          "Snowball = new growth sits on old growth.",
        ],
        practice: [
          {
            q: "Leaving money in to grow is called…",
            type: "multi",
            options: ["compound investing", "spending"],
            answer: 0,
            explain: "Compound = snowball.",
          },
        ],
      },
    },
    twenty: {
      title: "The 20% rule",
      blurb: "Pay yourself first: 20p of every £1 you get goes in the pot.",
      videoKey: "fractions",
      teach: {
        points: [
          "20% means 20 in every 100 — or 1 in every 5. So 20% of £10 is £2.",
          "If you always put 20% of pocket money, birthday money or later a job into the pot, you still have 80% to use.",
          "The 20% is not for sweets today. It is the snowball for Future You.",
        ],
        visual: "£10 → £2 in the pot, £8 to spend.",
      },
      example: {
        title: "Worked example",
        steps: [
          "You get £10.",
          "Split into 5 equal parts of £2.",
          "One part (£2) goes in the pot. That is 20%.",
        ],
      },
      practice: [
        {
          q: "20% of £10 is…",
          type: "typed",
          answer: "2",
          explain: "£10 ÷ 5 = £2.",
        },
        {
          q: "20% of £5 is…",
          type: "typed",
          answer: "1",
          explain: "£5 ÷ 5 = £1.",
        },
        {
          q: "The 20% rule means you…",
          type: "multi",
          options: [
            "put 20p of every £1 into the pot",
            "spend every penny",
            "give all your money away",
          ],
          answer: 0,
          explain: "Pay yourself first. 20% saved, 80% for now.",
        },
      ],
      struggle: {
        points: [
          "20% = 1 out of 5.",
          "£10 → five lots of £2 → one lot in the pot.",
        ],
        practice: [
          {
            q: "20% of £20 is…",
            type: "typed",
            answer: "4",
            explain: "£20 ÷ 5 = £4.",
          },
        ],
      },
    },
    metals: {
      title: "Gold & silver",
      blurb: "Old metals. People still buy them as a store of value.",
      videoKey: "materials",
      teach: {
        points: [
          "Gold and silver are metals. Kings, coins and jewellery have used them for thousands of years.",
          "You can buy small coins or bars, or a gold/silver fund. You do not need a chest of treasure.",
          "Prices go up and down. Gold does not pay you a wage — you hope the metal is worth more later.",
        ],
        visual: "Gold coin + silver bar = metals people treat as money.",
      },
      example: {
        title: "Worked example",
        steps: [
          "Long ago people paid with gold and silver coins.",
          "Today we use pounds, but some people still keep gold or silver.",
          "It is one way to save — not the only way, and not a magic trick.",
        ],
      },
      practice: [
        {
          q: "Gold and silver are…",
          type: "multi",
          options: ["metals", "types of bread", "computer apps"],
          answer: 0,
          explain: "They are metals people have used as money.",
        },
        {
          q: "Gold prices…",
          type: "multi",
          options: ["can go up and down", "never change", "only go up"],
          answer: 0,
          explain: "Some years gold falls. Past years are not a promise.",
        },
        {
          q: "A store of value means you hope it…",
          type: "multi",
          options: ["keeps worth for later", "tastes nice", "runs fast"],
          answer: 0,
          explain: "You keep it so Future You might still find it useful.",
        },
      ],
      struggle: {
        points: [
          "Gold = yellow metal. Silver = grey-white metal.",
          "People like them because they are rare and last a long time.",
        ],
        practice: [
          {
            q: "Which is a metal people use as money?",
            type: "multi",
            options: ["gold", "paper aeroplanes"],
            answer: 0,
            explain: "Gold (and silver).",
          },
        ],
      },
    },
    bitcoin: {
      title: "Bitcoin",
      blurb: "Internet money. Only a set amount can ever exist. It is jumpy.",
      videoKey: "energy",
      teach: {
        points: [
          "Bitcoin is digital money on computers around the world. Nobody can print extra forever — there is a cap.",
          "In some past years it grew very fast. In other years it crashed. Both can happen.",
          "Never put in money you cannot lose. Past speed cannot keep going forever.",
        ],
        visual: "Bitcoin = internet money with a limited amount.",
      },
      example: {
        title: "Worked example",
        steps: [
          "Imagine a sticker album that will only ever have 21 million stickers.",
          "If lots of people want one, the price can jump. If they stop wanting it, the price can drop.",
          "That is why Bitcoin is exciting and risky.",
        ],
      },
      practice: [
        {
          q: "Bitcoin is…",
          type: "multi",
          options: ["internet money", "a kind of horse", "a sandwich"],
          answer: 0,
          explain: "Digital money with a limited amount.",
        },
        {
          q: "Bitcoin’s price can…",
          type: "multi",
          options: ["shoot up or crash", "only go up", "never move"],
          answer: 0,
          explain: "It is jumpy. Past years are not a promise.",
        },
        {
          q: "True or false: Bitcoin will grow 50% every year forever.",
          type: "multi",
          options: ["False", "True"],
          answer: 0,
          explain: "Nothing grows that fast forever. The calculator shows a past picture only.",
        },
      ],
      struggle: {
        points: [
          "Internet money ≠ coins in your pocket.",
          "Limited amount + lots of people wanting it = price can jump. Fear = price can drop.",
        ],
        practice: [
          {
            q: "Should you put in money you cannot lose?",
            type: "multi",
            options: ["No", "Yes, all of it"],
            answer: 0,
            explain: "Only money you can afford to lose.",
          },
        ],
      },
    },
    etf: {
      title: "ETFs & the S&P 500",
      blurb: "Buy a bundle of many companies in one go.",
      videoKey: "data",
      teach: {
        points: [
          "ETF means a basket you can buy like one thing. Inside are lots of pieces.",
          "The S&P 500 is a famous basket of 500 big companies in the United States.",
          "Owning a little of many companies is usually steadier than betting on just one.",
        ],
        visual: "One ETF ticket → 500 companies inside.",
      },
      example: {
        title: "Worked example",
        steps: [
          "Instead of picking one shop, you buy a tiny slice of 500 shops.",
          "If one shop has a bad year, the others can still help.",
          "Over many years that basket has grown — but some years it falls too.",
        ],
      },
      practice: [
        {
          q: "An ETF is a…",
          type: "multi",
          options: ["basket of many things", "single sweet", "type of horse"],
          answer: 0,
          explain: "A bundle you buy in one go.",
        },
        {
          q: "The S&P 500 is about…",
          type: "multi",
          options: ["500 big US companies", "500 footballers", "500 horses"],
          answer: 0,
          explain: "A famous US company basket.",
        },
        {
          q: "A basket of many companies is usually…",
          type: "multi",
          options: ["steadier than one company", "always a loss", "illegal"],
          answer: 0,
          explain: "Spreading out is the idea. Still not a promise.",
        },
      ],
      struggle: {
        points: [
          "ETF = basket. S&P 500 = a famous basket of 500.",
          "Many slices beat one slice if that one slice goes wrong.",
        ],
        practice: [
          {
            q: "S&P 500 is an example of an…",
            type: "multi",
            options: ["ETF / basket", "ice cream"],
            answer: 0,
            explain: "A company basket.",
          },
        ],
      },
    },
    stocks: {
      title: "One company",
      blurb: "Buying one firm can win — or you can lose that money.",
      videoKey: "writing",
      teach: {
        points: [
          "A share is a tiny slice of one company. If the company does well, the slice can be worth more.",
          "If the company does badly or closes, that slice can be worth little or nothing.",
          "Grown-ups sometimes pick a few companies they understand — but a basket (ETF) is the calmer first step.",
        ],
        visual: "One shop vs a street of shops.",
      },
      example: {
        title: "Worked example",
        steps: [
          "You buy a slice of one toy shop.",
          "If kids love the toys, the slice might grow.",
          "If the shop closes, the slice can vanish. That is the risk of one company.",
        ],
      },
      practice: [
        {
          q: "A share is a…",
          type: "multi",
          options: ["tiny slice of a company", "slice of cake you must eat today", "free prize"],
          answer: 0,
          explain: "You own a little bit of that firm.",
        },
        {
          q: "If one company fails, you can…",
          type: "multi",
          options: ["lose that money", "never lose", "print more shares at home"],
          answer: 0,
          explain: "One-company bets can go to zero.",
        },
        {
          q: "A calmer first step is often…",
          type: "multi",
          options: ["an ETF basket", "one mystery company", "spending the 20%"],
          answer: 0,
          explain: "Many companies in one go.",
        },
      ],
      struggle: {
        points: [
          "Share = slice of one firm.",
          "One firm can fail. A basket spreads the risk.",
        ],
        practice: [
          {
            q: "True or false: one company can fail.",
            type: "multi",
            options: ["True", "False"],
            answer: 0,
            explain: "Yes. That is why spreading money matters.",
          },
        ],
      },
    },
  },
};

/**
 * @param {string} subject
 * @param {string} skillId
 * @param {number} [stageNum=1] 1=Foundation … 6=A* Mastery
 * @param {string|null} [learnerId] filter practice by ks2/ks3 when set
 */
function getTeachModule(subject, skillId, stageNum, learnerId) {
  const stage = Number(stageNum) || 1;
  let raw = null;
  if (typeof getStageTeachBank === "function") {
    const bank = getStageTeachBank(stage);
    raw = bank?.[subject]?.[skillId] || null;
  }
  if (!raw && stage >= 2) {
    const banks = [
      null,
      null,
      typeof TEACH_MODULES_STAGE2 !== "undefined" ? TEACH_MODULES_STAGE2 : null,
      typeof TEACH_MODULES_STAGE3 !== "undefined" ? TEACH_MODULES_STAGE3 : null,
      typeof TEACH_MODULES_STAGE4 !== "undefined" ? TEACH_MODULES_STAGE4 : null,
      typeof TEACH_MODULES_STAGE5 !== "undefined" ? TEACH_MODULES_STAGE5 : null,
      typeof TEACH_MODULES_STAGE6 !== "undefined" ? TEACH_MODULES_STAGE6 : null,
    ];
    raw = banks[stage]?.[subject]?.[skillId] || null;
  }
  if (!raw) raw = TEACH_MODULES[subject]?.[skillId] || null;
  if (!raw) return null;

  if (!learnerId || typeof LEARNERS === "undefined" || !LEARNERS[learnerId]) {
    return raw;
  }
  const learnerStage = LEARNERS[learnerId].stage;
  const filterItems = (items) => {
    if (!Array.isArray(items)) return items || [];
    const filtered = items.filter(
      (q) => !q.stage || q.stage === "both" || q.stage === learnerStage
    );
    // If filtering removed everything, fall back to full bank
    return filtered.length ? filtered : items;
  };
  return {
    ...raw,
    practice: filterItems(raw.practice),
    struggle: raw.struggle
      ? {
          ...raw.struggle,
          practice: filterItems(raw.struggle.practice),
        }
      : raw.struggle,
  };
}

function getVideoForModule(mod) {
  if (!mod?.videoKey) return null;
  return VIDEO_LINKS[mod.videoKey] || null;
}
