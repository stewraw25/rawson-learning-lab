/**
 * GCSE exam-style mixed workouts (unlock with pathway stage)
 */

const EXAM_PACKS = {
  "maths": {
    "4": {
      "title": "Maths GCSE Core workout",
      "blurb": "Mixed Foundation-tier style questions · 12 Qs",
      "minStage": 4,
      "questions": [
        {
          "q": "3.4×10³ as ordinary number?",
          "type": "multi",
          "options": [
            "3400",
            "340",
            "34",
            "34000"
          ],
          "answer": 0,
          "explain": "3.4×1000.",
          "stage": "both"
        },
        {
          "q": "15% of 80?",
          "type": "typed",
          "answer": "12",
          "explain": "0.15×80.",
          "accept": [
            "12"
          ],
          "stage": "both"
        },
        {
          "q": "Gradient of y=4x−2?",
          "type": "multi",
          "options": [
            "4",
            "−2",
            "2",
            "0"
          ],
          "answer": 0,
          "explain": "m=4.",
          "stage": "both"
        },
        {
          "q": "Hypotenuse 6 and 8?",
          "type": "typed",
          "answer": "10",
          "explain": "6-8-10.",
          "accept": [
            "10"
          ],
          "stage": "both"
        },
        {
          "q": "Share 50 in 2:3. Smaller?",
          "type": "multi",
          "options": [
            "20",
            "30",
            "25",
            "10"
          ],
          "answer": 0,
          "explain": "2/5×50.",
          "stage": "both"
        },
        {
          "q": "Solve 5x=35.",
          "type": "typed",
          "answer": "7",
          "explain": "x=7.",
          "accept": [
            "7"
          ],
          "stage": "both"
        },
        {
          "q": "Density = mass ÷ ?",
          "type": "multi",
          "options": [
            "volume",
            "time",
            "force",
            "speed"
          ],
          "answer": 0,
          "explain": "m/V.",
          "stage": "both"
        },
        {
          "q": "Mean of 2,4,6,8?",
          "type": "typed",
          "answer": "5",
          "explain": "20/4.",
          "accept": [
            "5"
          ],
          "stage": "both"
        },
        {
          "q": "P(head) fair coin?",
          "type": "multi",
          "options": [
            "1/2",
            "1/3",
            "1",
            "0"
          ],
          "answer": 0,
          "explain": "equally likely.",
          "stage": "both"
        },
        {
          "q": "Area circle r=2 exact?",
          "type": "multi",
          "options": [
            "4π",
            "2π",
            "π",
            "8π"
          ],
          "answer": 0,
          "explain": "πr².",
          "stage": "both"
        },
        {
          "q": "2³ × 2² = 2^?",
          "type": "typed",
          "answer": "5",
          "explain": "add indices.",
          "accept": [
            "5"
          ],
          "stage": "both"
        },
        {
          "q": "Lower bound 8 cm nearest cm?",
          "type": "multi",
          "options": [
            "7.5",
            "8",
            "8.5",
            "7"
          ],
          "answer": 0,
          "explain": "7.5.",
          "stage": "both"
        }
      ]
    },
    "5": {
      "title": "Maths Higher workout",
      "blurb": "Higher-tier mixed · 12 Qs",
      "minStage": 5,
      "questions": [
        {
          "q": "√48 simplified?",
          "type": "multi",
          "options": [
            "4√3",
            "2√12",
            "√16×3 wrong form",
            "3√4"
          ],
          "answer": 0,
          "explain": "√(16×3)=4√3.",
          "stage": "both"
        },
        {
          "q": "Factorise x²−5x+6",
          "type": "multi",
          "options": [
            "(x−2)(x−3)",
            "(x+2)(x+3)",
            "(x−1)(x−6)",
            "(x+1)(x−6)"
          ],
          "answer": 0,
          "explain": "2+3=5.",
          "stage": "both"
        },
        {
          "q": "sin θ = ?",
          "type": "multi",
          "options": [
            "opp/hyp",
            "adj/hyp",
            "opp/adj",
            "hyp/opp"
          ],
          "answer": 0,
          "explain": "SOH.",
          "stage": "both"
        },
        {
          "q": "FD = frequency ÷ ?",
          "type": "multi",
          "options": [
            "class width",
            "mean",
            "median",
            "range"
          ],
          "answer": 0,
          "explain": "width.",
          "stage": "both"
        },
        {
          "q": "8^(2/3)=?",
          "type": "typed",
          "answer": "4",
          "explain": "∛8=2 → 4.",
          "accept": [
            "4"
          ],
          "stage": "both"
        },
        {
          "q": "Simultaneous x+y=10, x−y=2 → x?",
          "type": "multi",
          "options": [
            "6",
            "4",
            "8",
            "5"
          ],
          "answer": 0,
          "explain": "2x=12.",
          "stage": "both"
        },
        {
          "q": "y∝1/x; x×2 → y?",
          "type": "multi",
          "options": [
            "÷2",
            "×2",
            "×4",
            "unchanged"
          ],
          "answer": 0,
          "explain": "inverse.",
          "stage": "both"
        },
        {
          "q": "Angle in semicircle?",
          "type": "multi",
          "options": [
            "90°",
            "60°",
            "45°",
            "180°"
          ],
          "answer": 0,
          "explain": "theorem.",
          "stage": "both"
        },
        {
          "q": "Independent P(A and B)?",
          "type": "multi",
          "options": [
            "P(A)P(B)",
            "P(A)+P(B)",
            "P(A)−P(B)",
            "1"
          ],
          "answer": 0,
          "explain": "product.",
          "stage": "both"
        },
        {
          "q": "Complete square x²+6x+1",
          "type": "multi",
          "options": [
            "(x+3)²−8",
            "(x+3)²+1",
            "(x+6)²",
            "(x+3)²−1"
          ],
          "answer": 0,
          "explain": "−9+1=−8.",
          "stage": "both"
        },
        {
          "q": "F=ma; m=5,a=3 → F?",
          "type": "typed",
          "answer": "15",
          "explain": "15 N.",
          "accept": [
            "15"
          ],
          "stage": "both"
        },
        {
          "q": "Rationalise 1/√5",
          "type": "multi",
          "options": [
            "√5/5",
            "5",
            "√5",
            "1/5"
          ],
          "answer": 0,
          "explain": "×√5/√5.",
          "stage": "both"
        }
      ]
    },
    "6": {
      "title": "Maths A* workout",
      "blurb": "Grade 8–9 stretch mixed · 12 Qs",
      "minStage": 6,
      "questions": [
        {
          "q": "Max a/b (a,b>0)?",
          "type": "multi",
          "options": [
            "UB_a/LB_b",
            "LB_a/UB_b",
            "UB/UB",
            "LB/LB"
          ],
          "answer": 0,
          "explain": "big/small.",
          "stage": "both"
        },
        {
          "q": "Discriminant 0 means…",
          "type": "multi",
          "options": [
            "one real root",
            "two real",
            "none",
            "infinite"
          ],
          "answer": 0,
          "explain": "repeated.",
          "stage": "both"
        },
        {
          "q": "Length k=2 → volume factor?",
          "type": "multi",
          "options": [
            "8",
            "4",
            "2",
            "16"
          ],
          "answer": 0,
          "explain": "k³.",
          "stage": "both"
        },
        {
          "q": "f(x)=3x−6 inverse?",
          "type": "multi",
          "options": [
            "(x+6)/3",
            "3x+6",
            "x/3−6",
            "6−3x"
          ],
          "answer": 0,
          "explain": "swap solve.",
          "stage": "both"
        },
        {
          "q": "Space diagonal 3×6×6?",
          "type": "typed",
          "answer": "9",
          "explain": "√(9+36+36)=9.",
          "accept": [
            "9"
          ],
          "stage": "both"
        },
        {
          "q": "P(A|B)=?",
          "type": "multi",
          "options": [
            "P(A∩B)/P(B)",
            "P(A)+P(B)",
            "P(A)P(B)",
            "1−P(B)"
          ],
          "answer": 0,
          "explain": "conditional.",
          "stage": "both"
        },
        {
          "q": "√12 + √3 = ?",
          "type": "multi",
          "options": [
            "3√3",
            "√15",
            "2√3",
            "√36"
          ],
          "answer": 0,
          "explain": "2√3+√3.",
          "stage": "both"
        },
        {
          "q": "Composite fg means…",
          "type": "multi",
          "options": [
            "g then f",
            "f then g always",
            "f×g",
            "gradient"
          ],
          "answer": 0,
          "explain": "right first.",
          "stage": "both"
        },
        {
          "q": "Histogram frequency ∝ ?",
          "type": "multi",
          "options": [
            "area",
            "height only always",
            "colour",
            "title"
          ],
          "answer": 0,
          "explain": "area.",
          "stage": "both"
        },
        {
          "q": "Proof odds: 2k+1 + 2m+1 = ?",
          "type": "multi",
          "options": [
            "2(k+m+1) even",
            "odd always",
            "prime",
            "1"
          ],
          "answer": 0,
          "explain": "even.",
          "stage": "both"
        },
        {
          "q": "Exact cos 30°?",
          "type": "multi",
          "options": [
            "√3/2",
            "1/2",
            "0",
            "1"
          ],
          "answer": 0,
          "explain": "√3/2.",
          "stage": "both"
        },
        {
          "q": "When stuck on 6 marks…",
          "type": "multi",
          "options": [
            "show method steps",
            "blank only",
            "final only",
            "erase all"
          ],
          "answer": 0,
          "explain": "method marks.",
          "stage": "both"
        }
      ]
    }
  },
  "english": {
    "4": {
      "title": "English GCSE Core workout",
      "blurb": "Lang skills AO1–AO6 core · 10 Qs",
      "minStage": 4,
      "questions": [
        {
          "q": "Comma splice fix uses…",
          "type": "multi",
          "options": [
            "full stop or conjunction",
            "more commas only",
            "no punctuation",
            "emojis"
          ],
          "answer": 0,
          "explain": "separate clauses.",
          "stage": "both"
        },
        {
          "q": "PEE stands for ideas like…",
          "type": "multi",
          "options": [
            "Point Evidence Explain",
            "Pen Erase Exit",
            "Plot Ending Epilogue only",
            "Page Exam Entry"
          ],
          "answer": 0,
          "explain": "analysis structure.",
          "stage": "both"
        },
        {
          "q": "Formal greeting unknown name:",
          "type": "multi",
          "options": [
            "Dear Sir or Madam",
            "Hey",
            "Yo",
            "Hiya"
          ],
          "answer": 0,
          "explain": "formal.",
          "stage": "both"
        },
        {
          "q": "Its vs it's possession:",
          "type": "multi",
          "options": [
            "its",
            "it's",
            "its'",
            "it"
          ],
          "answer": 0,
          "explain": "its.",
          "stage": "both"
        },
        {
          "q": "Pathetic fallacy:",
          "type": "multi",
          "options": [
            "weather mirrors mood",
            "a lie",
            "a full stop",
            "a rhyme"
          ],
          "answer": 0,
          "explain": "weather/mood.",
          "stage": "both"
        },
        {
          "q": "AO6 checks…",
          "type": "multi",
          "options": [
            "SPaG accuracy",
            "only ideas",
            "only structure",
            "only quotes"
          ],
          "answer": 0,
          "explain": "tech accuracy.",
          "stage": "both"
        },
        {
          "q": "Rhetorical question…",
          "type": "multi",
          "options": [
            "engages reader",
            "needs spoken answer always",
            "is a fragment error always",
            "replaces verbs"
          ],
          "answer": 0,
          "explain": "engage.",
          "stage": "both"
        },
        {
          "q": "Topic sentence…",
          "type": "multi",
          "options": [
            "main idea of paragraph",
            "always last word",
            "a doodle",
            "exam code"
          ],
          "answer": 0,
          "explain": "main idea.",
          "stage": "both"
        },
        {
          "q": "Bias means…",
          "type": "multi",
          "options": [
            "slanted viewpoint",
            "perfect balance always",
            "no adjectives",
            "only facts"
          ],
          "answer": 0,
          "explain": "slant.",
          "stage": "both"
        },
        {
          "q": "Proofread for…",
          "type": "multi",
          "options": [
            "sentence boundaries",
            "new plot",
            "longer words only",
            "removing evidence"
          ],
          "answer": 0,
          "explain": "AO6.",
          "stage": "both"
        }
      ]
    },
    "5": {
      "title": "English Higher workout",
      "blurb": "Methods, evaluation, craft · 10 Qs",
      "minStage": 5,
      "questions": [
        {
          "q": "Best analysis verb:",
          "type": "multi",
          "options": [
            "conveys / suggests",
            "does",
            "is thing",
            "has stuff"
          ],
          "answer": 0,
          "explain": "precise verbs.",
          "stage": "both"
        },
        {
          "q": "Juxtaposition…",
          "type": "multi",
          "options": [
            "contrast side by side",
            "rhyme only",
            "volume",
            "font"
          ],
          "answer": 0,
          "explain": "contrast.",
          "stage": "both"
        },
        {
          "q": "Evaluate asks…",
          "type": "multi",
          "options": [
            "how successful + why",
            "yes only",
            "word count",
            "drawing"
          ],
          "answer": 0,
          "explain": "judgement.",
          "stage": "both"
        },
        {
          "q": "Unreliable narrator…",
          "type": "multi",
          "options": [
            "makes us question truth",
            "is always honest",
            "has no voice",
            "is a graph"
          ],
          "answer": 0,
          "explain": "doubt.",
          "stage": "both"
        },
        {
          "q": "In media res…",
          "type": "multi",
          "options": [
            "start mid-action",
            "dictionary start",
            "end first only",
            "no characters"
          ],
          "answer": 0,
          "explain": "middle.",
          "stage": "both"
        },
        {
          "q": "Semantic field…",
          "type": "multi",
          "options": [
            "related word group",
            "full stop",
            "page",
            "margin"
          ],
          "answer": 0,
          "explain": "lexis set.",
          "stage": "both"
        },
        {
          "q": "Counter-argument…",
          "type": "multi",
          "options": [
            "acknowledge then rebut",
            "ignore forever",
            "only insults",
            "no view"
          ],
          "answer": 0,
          "explain": "rebut.",
          "stage": "both"
        },
        {
          "q": "Structural shift…",
          "type": "multi",
          "options": [
            "changes focus/time/person",
            "only adjectives",
            "AO6 only",
            "removes purpose"
          ],
          "answer": 0,
          "explain": "focus.",
          "stage": "both"
        },
        {
          "q": "Register must…",
          "type": "multi",
          "options": [
            "match audience/form",
            "always slang",
            "always archaic",
            "ignore purpose"
          ],
          "answer": 0,
          "explain": "match.",
          "stage": "both"
        },
        {
          "q": "Cyclical structure…",
          "type": "multi",
          "options": [
            "ending echoes opening",
            "random end",
            "no end",
            "only lists"
          ],
          "answer": 0,
          "explain": "echo.",
          "stage": "both"
        }
      ]
    },
    "6": {
      "title": "English A* workout",
      "blurb": "Conceptualised critical & craft · 10 Qs",
      "minStage": 6,
      "questions": [
        {
          "q": "Conceptualised response has…",
          "type": "multi",
          "options": [
            "unifying critical idea",
            "only feature list",
            "plot only",
            "biography only"
          ],
          "answer": 0,
          "explain": "thesis.",
          "stage": "both"
        },
        {
          "q": "Interwoven comparison…",
          "type": "multi",
          "options": [
            "moves between texts throughout",
            "A then B blocks only",
            "no connectives",
            "quote dump"
          ],
          "answer": 0,
          "explain": "integrated.",
          "stage": "both"
        },
        {
          "q": "Subverts means…",
          "type": "multi",
          "options": [
            "undermines expectations",
            "copies",
            "repeats",
            "deletes"
          ],
          "answer": 0,
          "explain": "undermines.",
          "stage": "both"
        },
        {
          "q": "Alternative interpretation needs…",
          "type": "multi",
          "options": [
            "textual support",
            "random denial",
            "gossip",
            "no evidence"
          ],
          "answer": 0,
          "explain": "support.",
          "stage": "both"
        },
        {
          "q": "A* AO6 is…",
          "type": "multi",
          "options": [
            "ambitious + accurate",
            "long errors OK",
            "no punctuation",
            "only simple sentences"
          ],
          "answer": 0,
          "explain": "control.",
          "stage": "both"
        },
        {
          "q": "Motif at A*…",
          "type": "multi",
          "options": [
            "purposeful recurrence",
            "one random image",
            "a full stop",
            "font change"
          ],
          "answer": 0,
          "explain": "pattern.",
          "stage": "both"
        },
        {
          "q": "Prefer…",
          "type": "multi",
          "options": [
            "precise word over fancy wrong word",
            "longest word",
            "slang in formal analysis",
            "'bad'×10"
          ],
          "answer": 0,
          "explain": "precision.",
          "stage": "both"
        },
        {
          "q": "Critical conclusion…",
          "type": "multi",
          "options": [
            "returns to thesis with insight",
            "repeats intro only",
            "stops mid-idea",
            "lists devices only"
          ],
          "answer": 0,
          "explain": "insight.",
          "stage": "both"
        },
        {
          "q": "Voice consistency fails when…",
          "type": "multi",
          "options": [
            "persona flips unmotivated",
            "tone matches form",
            "structure planned",
            "ending echoes"
          ],
          "answer": 0,
          "explain": "flip.",
          "stage": "both"
        },
        {
          "q": "Last minute marks from…",
          "type": "multi",
          "options": [
            "AO6 + ending polish",
            "new arc",
            "new form",
            "delete plan"
          ],
          "answer": 0,
          "explain": "secure.",
          "stage": "both"
        }
      ]
    }
  },
  "science": {
    "4": {
      "title": "Science GCSE Core workout",
      "blurb": "Bio/Chem/Phys + WS core · 12 Qs",
      "minStage": 4,
      "questions": [
        {
          "q": "Magnification = ?",
          "type": "multi",
          "options": [
            "image÷actual",
            "actual÷image",
            "image×actual",
            "sum"
          ],
          "answer": 0,
          "explain": "I/A.",
          "stage": "both"
        },
        {
          "q": "Prokaryotic example?",
          "type": "multi",
          "options": [
            "bacteria",
            "plant leaf cell",
            "animal cheek cell",
            "fungal always identical to plant"
          ],
          "answer": 0,
          "explain": "bacteria.",
          "stage": "both"
        },
        {
          "q": "Atomic number counts…",
          "type": "multi",
          "options": [
            "protons",
            "neutrons only",
            "electrons only always equal mass",
            "shells only"
          ],
          "answer": 0,
          "explain": "protons.",
          "stage": "both"
        },
        {
          "q": "Ionic bonding…",
          "type": "multi",
          "options": [
            "electron transfer",
            "sharing only",
            "magnetism",
            "light"
          ],
          "answer": 0,
          "explain": "transfer.",
          "stage": "both"
        },
        {
          "q": "V=IR units: R is…",
          "type": "multi",
          "options": [
            "ohms",
            "volts",
            "amps",
            "watts"
          ],
          "answer": 0,
          "explain": "Ω.",
          "stage": "both"
        },
        {
          "q": "Efficiency = useful÷?",
          "type": "multi",
          "options": [
            "total input",
            "time only",
            "mass",
            "force"
          ],
          "answer": 0,
          "explain": "useful/total.",
          "stage": "both"
        },
        {
          "q": "Independent variable is…",
          "type": "multi",
          "options": [
            "what you change",
            "what you measure only",
            "kept same",
            "anomaly"
          ],
          "answer": 0,
          "explain": "change.",
          "stage": "both"
        },
        {
          "q": "Photosynthesis gas produced?",
          "type": "multi",
          "options": [
            "oxygen",
            "nitrogen only",
            "helium",
            "CO₂ only as product"
          ],
          "answer": 0,
          "explain": "O₂.",
          "stage": "both"
        },
        {
          "q": "pH 2 is…",
          "type": "multi",
          "options": [
            "acidic",
            "neutral",
            "alkaline",
            "pure water"
          ],
          "answer": 0,
          "explain": "acid.",
          "stage": "both"
        },
        {
          "q": "Series current is…",
          "type": "multi",
          "options": [
            "same throughout",
            "different always",
            "zero",
            "infinite"
          ],
          "answer": 0,
          "explain": "same.",
          "stage": "both"
        },
        {
          "q": "Pathogen…",
          "type": "multi",
          "options": [
            "causes disease",
            "is a nutrient",
            "is a bone",
            "is a vitamin"
          ],
          "answer": 0,
          "explain": "disease.",
          "stage": "both"
        },
        {
          "q": "Line of best fit…",
          "type": "multi",
          "options": [
            "shows trend",
            "hits every point always",
            "is y-axis",
            "is title"
          ],
          "answer": 0,
          "explain": "trend.",
          "stage": "both"
        }
      ]
    },
    "5": {
      "title": "Science Higher workout",
      "blurb": "Higher mechanisms & equations · 12 Qs",
      "minStage": 5,
      "questions": [
        {
          "q": "Aerobic respiration needs…",
          "type": "multi",
          "options": [
            "oxygen",
            "only nitrogen",
            "only chlorophyll",
            "only light"
          ],
          "answer": 0,
          "explain": "O₂.",
          "stage": "both"
        },
        {
          "q": "Insulin lowers…",
          "type": "multi",
          "options": [
            "blood glucose",
            "bone density only",
            "only temperature",
            "only CO₂ in air"
          ],
          "answer": 0,
          "explain": "glucose.",
          "stage": "both"
        },
        {
          "q": "Oxidation (electrons)…",
          "type": "multi",
          "options": [
            "loss",
            "gain",
            "share always",
            "none"
          ],
          "answer": 0,
          "explain": "OIL.",
          "stage": "both"
        },
        {
          "q": "Catalyst lowers…",
          "type": "multi",
          "options": [
            "activation energy",
            "temperature to 0 always",
            "mass of products always",
            "pressure only"
          ],
          "answer": 0,
          "explain": "Ea.",
          "stage": "both"
        },
        {
          "q": "F=?",
          "type": "multi",
          "options": [
            "ma",
            "mv only",
            "mgh only",
            "V/t only"
          ],
          "answer": 0,
          "explain": "F=ma.",
          "stage": "both"
        },
        {
          "q": "Weight = ?",
          "type": "multi",
          "options": [
            "mg",
            "m/a",
            "VIt",
            "IR"
          ],
          "answer": 0,
          "explain": "mg.",
          "stage": "both"
        },
        {
          "q": "Longest λ typical EM list?",
          "type": "multi",
          "options": [
            "radio",
            "gamma",
            "X-ray",
            "UV"
          ],
          "answer": 0,
          "explain": "radio.",
          "stage": "both"
        },
        {
          "q": "Genotype is…",
          "type": "multi",
          "options": [
            "alleles present",
            "only appearance",
            "environment only",
            "a tissue"
          ],
          "answer": 0,
          "explain": "alleles.",
          "stage": "both"
        },
        {
          "q": "Cathode reaction type…",
          "type": "multi",
          "options": [
            "reduction",
            "oxidation only",
            "neutralisation only",
            "filtration"
          ],
          "answer": 0,
          "explain": "reduction.",
          "stage": "both"
        },
        {
          "q": "% uncertainty…",
          "type": "multi",
          "options": [
            "(unc/value)×100",
            "unc×value",
            "value−unc",
            "100"
          ],
          "answer": 0,
          "explain": "relative.",
          "stage": "both"
        },
        {
          "q": "Dynamic equilibrium rates…",
          "type": "multi",
          "options": [
            "forward = reverse",
            "zero",
            "infinite",
            "only forward"
          ],
          "answer": 0,
          "explain": "equal.",
          "stage": "both"
        },
        {
          "q": "Systematic error…",
          "type": "multi",
          "options": [
            "consistent bias",
            "pure scatter",
            "no effect",
            "random only"
          ],
          "answer": 0,
          "explain": "bias.",
          "stage": "both"
        }
      ]
    },
    "6": {
      "title": "Science A* workout",
      "blurb": "Synoptic + quantitative · 12 Qs",
      "minStage": 6,
      "questions": [
        {
          "q": "n = m/Mr moles in 10 g Mr50?",
          "type": "multi",
          "options": [
            "0.2",
            "5",
            "2",
            "0.5"
          ],
          "answer": 0,
          "explain": "10/50.",
          "stage": "both"
        },
        {
          "q": "c=n/V; n=0.1, V=0.5 dm³ → c?",
          "type": "multi",
          "options": [
            "0.2",
            "0.05",
            "0.5",
            "2"
          ],
          "answer": 0,
          "explain": "0.1/0.5.",
          "stage": "both"
        },
        {
          "q": "KE=½mv²; double v → KE…",
          "type": "multi",
          "options": [
            "×4",
            "×2",
            "÷2",
            "unchanged"
          ],
          "answer": 0,
          "explain": "v².",
          "stage": "both"
        },
        {
          "q": "Antibiotic resistance spreads via…",
          "type": "multi",
          "options": [
            "selection + gene transfer",
            "vaccines making bacteria",
            "cold only",
            "viruses→bacteria"
          ],
          "answer": 0,
          "explain": "selection.",
          "stage": "both"
        },
        {
          "q": "Negative feedback…",
          "type": "multi",
          "options": [
            "restores norm",
            "amplifies always",
            "only plants",
            "stops DNA only"
          ],
          "answer": 0,
          "explain": "homeostasis.",
          "stage": "both"
        },
        {
          "q": "Le Chatelier: fewer gas moles on product side, ↑P shifts…",
          "type": "multi",
          "options": [
            "to products",
            "to reactants always",
            "nowhere",
            "to solid only"
          ],
          "answer": 0,
          "explain": "fewer moles.",
          "stage": "both"
        },
        {
          "q": "Correlation ≠ ?",
          "type": "multi",
          "options": [
            "causation",
            "graph",
            "data",
            "mean"
          ],
          "answer": 0,
          "explain": "causation.",
          "stage": "both"
        },
        {
          "q": "Atom economy high →",
          "type": "multi",
          "options": [
            "less waste mass",
            "always slower",
            "more waste",
            "no reaction"
          ],
          "answer": 0,
          "explain": "green.",
          "stage": "both"
        },
        {
          "q": "Series R total…",
          "type": "multi",
          "options": [
            "sum",
            "product only",
            "always less than smallest",
            "zero"
          ],
          "answer": 0,
          "explain": "sum.",
          "stage": "both"
        },
        {
          "q": "Synoptic mito in muscle because…",
          "type": "multi",
          "options": [
            "high ATP demand",
            "photosynthesis",
            "DNA only store",
            "cell wall"
          ],
          "answer": 0,
          "explain": "energy.",
          "stage": "both"
        },
        {
          "q": "Valid method measures…",
          "type": "multi",
          "options": [
            "what it claims to",
            "anything",
            "only time",
            "only colour"
          ],
          "answer": 0,
          "explain": "validity.",
          "stage": "both"
        },
        {
          "q": "Claim-evidence-reasoning needs…",
          "type": "multi",
          "options": [
            "linked scientific idea",
            "slogan only",
            "no numbers",
            "slang only"
          ],
          "answer": 0,
          "explain": "CER.",
          "stage": "both"
        }
      ]
    }
  }
};
