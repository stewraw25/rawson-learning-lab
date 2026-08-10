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
      <text x="70" y="40" fill="#3dd6c6" font-size="16" font-weight="700">2x + 4</text>
      <text x="190" y="40" fill="#ff8c5a" font-size="16" font-weight="700">18</text>
      <text x="100" y="85" fill="#a8b0d6" font-size="12">Keep both sides equal</text>
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
      title: "Number & place value",
      blurb: "Know what each digit is worth — GCSE Number foundation.",
      videoKey: "placevalue",
      teach: {
        points: [
          "Every digit has a place: ones, tens, hundreds, thousands…",
          "In 4,720 the 2 is worth 20 (2 tens), not 2.",
          "Rounding: look at the digit to the right — 5 or more rounds up.",
        ],
        visual: SVG.placeValue,
      },
      example: {
        title: "Worked example",
        steps: [
          "Number: 4,762",
          "Nearest hundred → look at the tens digit (6).",
          "6 ≥ 5, so round the hundreds up: 4,800.",
        ],
      },
      practice: [
        {
          q: "What is the value of 5 in 5,403?",
          type: "multi",
          options: ["5", "50", "500", "5,000"],
          answer: 3,
          explain: "5 is in the thousands place → 5,000.",
        },
        {
          q: "Round 3,450 to the nearest hundred.",
          type: "typed",
          answer: "3500",
          accept: ["3500", "3,500"],
          explain: "Tens digit is 5 → round up to 3,500.",
        },
        {
          q: "What is 10³?",
          type: "typed",
          answer: "1000",
          accept: ["1000", "1,000"],
          explain: "10×10×10 = 1,000.",
        },
      ],
      struggle: {
        points: [
          "Think of a number like money: £4,720 — the 7 is hundreds of pounds.",
          "Cover other digits with your finger and ask: what is this digit worth alone?",
        ],
        practice: [
          {
            q: "In 380, the 8 is worth…",
            type: "multi",
            options: ["8", "80", "800", "3"],
            answer: 1,
            explain: "8 tens = 80.",
          },
        ],
      },
    },
    operations: {
      title: "Four operations",
      blurb: "Add, subtract, multiply, divide accurately.",
      videoKey: "multiply",
      teach: {
        points: [
          "Multiplication is repeated addition: 7×8 = 7 groups of 8.",
          "Division splits into equal groups: 144÷12 = how many 12s in 144.",
          "Estimate first — does your answer look sensible?",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["48 × 6", "50 × 6 = 300", "2 × 6 = 12", "300 − 12 = 288"],
      },
      practice: [
        {
          q: "Calculate 144 ÷ 12.",
          type: "typed",
          answer: "12",
          explain: "12 × 12 = 144.",
        },
        {
          q: "7 packs of 8 pencils. Total?",
          type: "typed",
          answer: "56",
          explain: "7 × 8 = 56.",
        },
        {
          q: "What is 15²?",
          type: "typed",
          answer: "225",
          explain: "15 × 15 = 225.",
        },
      ],
      struggle: {
        points: [
          "Use a fact you know: 10×15=150, so 15×15 = 150+75 = 225.",
          "Draw equal groups for smaller multiplications.",
        ],
        practice: [
          {
            q: "6 × 7 = ?",
            type: "typed",
            answer: "42",
            explain: "6×7=42.",
          },
        ],
      },
    },
    fractions: {
      title: "Fractions, decimals & %",
      blurb: "Parts of a whole — huge GCSE topic.",
      videoKey: "fractions",
      teach: {
        points: [
          "A fraction is part of a whole: ¾ means 3 parts out of 4 equal parts.",
          "Percent means out of 100: 25% = 25/100 = ¼.",
          "0.5 = ½ = 50% — same idea, different form.",
        ],
        visual: SVG.fractionBars,
      },
      example: {
        title: "Worked example",
        steps: [
          "Find 25% of 80.",
          "25% = ¼.",
          "80 ÷ 4 = 20.",
        ],
      },
      practice: [
        {
          q: "Convert ¾ to a percentage.",
          type: "typed",
          answer: "75",
          accept: ["75", "75%"],
          explain: "¾ = 0.75 = 75%.",
        },
        {
          q: "Which is larger: 0.6 or 2/3?",
          type: "multi",
          options: ["0.6", "2/3", "Equal"],
          answer: 1,
          explain: "2/3 ≈ 0.667 > 0.6.",
        },
        {
          q: "Find 10% of 250.",
          type: "typed",
          answer: "25",
          explain: "10% → divide by 10.",
        },
      ],
      struggle: {
        points: [
          "Draw a bar. Shade 1 of 4 parts for ¼.",
          "10% tip: move the digit one place (250 → 25).",
        ],
        practice: [
          {
            q: "What is ½ of 20?",
            type: "typed",
            answer: "10",
            explain: "Half of 20 is 10.",
          },
        ],
      },
    },
    algebra: {
      title: "Algebra adventure",
      blurb: "Letters stand for numbers — GCSE Algebra core.",
      videoKey: "algebra",
      teach: {
        points: [
          "A letter (like x) is a mystery number.",
          "Whatever you do to one side of an equation, do to the other.",
          "3a means 3 × a.",
        ],
        visual: SVG.balance,
      },
      example: {
        title: "Worked example",
        steps: ["2x + 4 = 18", "Subtract 4 from both sides: 2x = 14", "Divide by 2: x = 7"],
      },
      practice: [
        {
          q: "If y = 5, what is 3y + 1?",
          type: "typed",
          answer: "16",
          explain: "3×5+1=16.",
        },
        {
          q: "Expand: 2(x + 4)",
          type: "multi",
          options: ["2x + 4", "2x + 8", "x + 8", "2x + 6"],
          answer: 1,
          explain: "2×x and 2×4 → 2x+8.",
        },
        {
          q: "Solve: x − 7 = 12",
          type: "typed",
          answer: "19",
          explain: "x = 12 + 7 = 19.",
        },
      ],
      struggle: {
        points: [
          "Think of a balance scale — both sides must stay equal.",
          "Undo operations in reverse: if something was added, subtract.",
        ],
        practice: [
          {
            q: "△ + 5 = 12. What is △?",
            type: "typed",
            answer: "7",
            explain: "12 − 5 = 7.",
          },
        ],
      },
    },
    geometry: {
      title: "Shape & measure",
      blurb: "Angles, perimeter, area.",
      videoKey: "angles",
      teach: {
        points: [
          "Angles in a triangle always add to 180°.",
          "Perimeter = distance around. Area = space inside.",
          "Rectangle area = length × width.",
        ],
        visual: SVG.triangle,
      },
      example: {
        title: "Worked example",
        steps: [
          "Triangle angles 50° and 60°.",
          "Third angle = 180 − 50 − 60 = 70°.",
        ],
      },
      practice: [
        {
          q: "Area of rectangle 9 cm by 4 cm?",
          type: "typed",
          answer: "36",
          accept: ["36", "36cm2", "36 cm2"],
          explain: "9×4=36 cm².",
        },
        {
          q: "A straight line is…",
          type: "multi",
          options: ["90°", "180°", "270°", "360°"],
          answer: 1,
          explain: "Straight line = 180°.",
        },
        {
          q: "Full turn in degrees?",
          type: "typed",
          answer: "360",
          explain: "Full turn = 360°.",
        },
      ],
      struggle: {
        points: [
          "Sketch the shape and label what you know.",
          "Triangle: if you know two angles, subtract from 180.",
        ],
        practice: [
          {
            q: "Angles 90° and 40° in a triangle. Third angle?",
            type: "typed",
            answer: "50",
            explain: "180−90−40=50.",
          },
        ],
      },
    },
    data: {
      title: "Data detectives",
      blurb: "Averages and probability.",
      videoKey: "averages",
      teach: {
        points: [
          "Mean = add up, divide by how many.",
          "Median = middle when ordered.",
          "Mode = most frequent. Probability of fair coin heads = ½.",
        ],
        visual: "",
      },
      example: {
        title: "Worked example",
        steps: ["Data: 3, 9, 5", "Order: 3, 5, 9", "Median (middle) = 5"],
      },
      practice: [
        {
          q: "Median of 3, 9, 5?",
          type: "typed",
          answer: "5",
          explain: "Ordered middle is 5.",
        },
        {
          q: "Mode of 2, 4, 4, 7, 9?",
          type: "typed",
          answer: "4",
          explain: "4 appears most.",
        },
        {
          q: "P(rolling a 6) on a fair die?",
          type: "multi",
          options: ["1/2", "1/6", "6/1", "1/3"],
          answer: 1,
          explain: "1 of 6 faces.",
        },
      ],
      struggle: {
        points: [
          "Always order numbers before finding the median.",
          "Probability = how many successful ÷ how many possible.",
        ],
        practice: [
          {
            q: "Mean of 2, 4, 6?",
            type: "typed",
            answer: "4",
            explain: "(2+4+6)÷3=4.",
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
};

/**
 * @param {string} subject
 * @param {string} skillId
 * @param {number} [stageNum=1] Foundation=1 Intermediate=2
 * @param {string|null} [learnerId] filter practice by ks2/ks3 when set
 */
function getTeachModule(subject, skillId, stageNum, learnerId) {
  const stage = Number(stageNum) || 1;
  let raw = null;
  if (stage >= 2 && typeof TEACH_MODULES_STAGE2 !== "undefined") {
    raw = TEACH_MODULES_STAGE2[subject]?.[skillId] || null;
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
