/**
 * Stage 3 Secure
 */

const TEACH_MODULES_STAGE3 = {
  "maths": {
    "number": {
      "title": "Number secure",
      "blurb": "Indices, primes, HCF/LCM and directed numbers — Secure.",
      "videoKey": "placevalue",
      "teach": {
        "points": [
          "Prime factors: break numbers into primes (e.g. 12 = 2² × 3).",
          "HCF = highest common factor; LCM = lowest common multiple.",
          "Laws of indices (intro): aᵐ × aⁿ = aᵐ⁺ⁿ when bases match."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Find HCF of 12 and 18.",
          "12 = 2²×3, 18 = 2×3²",
          "Common: 2×3 = 6."
        ]
      },
      "practice": [
        {
          "q": "HCF of 12 and 18?",
          "type": "typed",
          "answer": "6",
          "explain": "2×3 = 6.",
          "accept": [
            "6"
          ],
          "stage": "both"
        },
        {
          "q": "LCM of 4 and 6?",
          "type": "typed",
          "answer": "12",
          "explain": "4=2², 6=2×3 → LCM=2²×3=12.",
          "accept": [
            "12"
          ],
          "stage": "both"
        },
        {
          "q": "Which is prime?",
          "type": "multi",
          "options": [
            "21",
            "27",
            "29",
            "33"
          ],
          "answer": 2,
          "explain": "29 has only two factors: 1 and 29.",
          "stage": "both"
        },
        {
          "q": "2³ × 2² = 2^?",
          "type": "typed",
          "answer": "5",
          "explain": "Add indices: 3+2=5.",
          "accept": [
            "5"
          ],
          "stage": "both"
        },
        {
          "q": "Calculate −8 − (−3).",
          "type": "typed",
          "answer": "-5",
          "explain": "−8 + 3 = −5.",
          "accept": [
            "-5",
            "−5"
          ],
          "stage": "both"
        },
        {
          "q": "Standard form of 45,000?",
          "type": "multi",
          "options": [
            "4.5×10³",
            "4.5×10⁴",
            "45×10³",
            "4.5×10⁵"
          ],
          "answer": 1,
          "explain": "4.5×10⁴.",
          "stage": "ks3"
        },
        {
          "q": "Prime factorisation of 36 as 2^a × 3^b. What is a?",
          "type": "typed",
          "answer": "2",
          "explain": "36=2²×3².",
          "accept": [
            "2"
          ],
          "stage": "both"
        },
        {
          "q": "LCM of 8 and 12?",
          "type": "multi",
          "options": [
            "24",
            "4",
            "16",
            "96"
          ],
          "answer": 0,
          "explain": "2³×3=24.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "List factors of both numbers; HCF is the largest shared.",
          "For indices with same base, add when multiplying."
        ],
        "practice": [
          {
            "q": "HCF of 12 and 18?",
            "type": "typed",
            "answer": "6",
            "explain": "2×3 = 6.",
            "accept": [
              "6"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "operations": {
      "title": "Operations secure",
      "blurb": "BIDMAS mastery, long multiplication/division and estimation.",
      "videoKey": "multiply",
      "teach": {
        "points": [
          "BIDMAS: Brackets, Indices, Division & Multiplication (L→R), Addition & Subtraction (L→R).",
          "Estimate by rounding to 1 s.f. before calculating.",
          "Long division: divide, multiply, subtract, bring down."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "(5 + 3)² − 4 × 3",
          "8² = 64",
          "4×3=12",
          "64−12=52"
        ]
      },
      "practice": [
        {
          "q": "Calculate (5+3)² − 4×3.",
          "type": "typed",
          "answer": "52",
          "explain": "64 − 12 = 52.",
          "accept": [
            "52"
          ],
          "stage": "both"
        },
        {
          "q": "Estimate 49 × 21 to 1 s.f.",
          "type": "typed",
          "answer": "1000",
          "explain": "50×20=1000.",
          "accept": [
            "1000",
            "1,000"
          ],
          "stage": "both"
        },
        {
          "q": "What is 15% of 360?",
          "type": "typed",
          "answer": "54",
          "explain": "10%=36, 5%=18 → 54.",
          "accept": [
            "54"
          ],
          "stage": "both"
        },
        {
          "q": "18 ÷ 3 × 2 = ?",
          "type": "multi",
          "options": [
            "3",
            "12",
            "1",
            "108"
          ],
          "answer": 1,
          "explain": "L→R: 6×2=12.",
          "stage": "both"
        },
        {
          "q": "Calculate 7² + 3³.",
          "type": "typed",
          "answer": "76",
          "explain": "49+27=76.",
          "accept": [
            "76"
          ],
          "stage": "both"
        },
        {
          "q": "240 ÷ 16 = ?",
          "type": "typed",
          "answer": "15",
          "explain": "16×15=240.",
          "accept": [
            "15"
          ],
          "stage": "both"
        },
        {
          "q": "Calculate 2³ × 3 − 4.",
          "type": "typed",
          "answer": "20",
          "explain": "8×3−4=20.",
          "accept": [
            "20"
          ],
          "stage": "both"
        },
        {
          "q": "Which is correct BIDMAS?",
          "type": "multi",
          "options": [
            "6÷2×3=9",
            "6÷2×3=1",
            "6÷2×3=4",
            "6÷2×3=12"
          ],
          "answer": 0,
          "explain": "L→R: 3×3=9.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "BIDMAS: Brackets, Indices, Division & Multiplication (L→R), Addition & Subtraction (L→R).",
          "Estimate by rounding to 1 s.f. before calculating."
        ],
        "practice": [
          {
            "q": "Calculate (5+3)² − 4×3.",
            "type": "typed",
            "answer": "52",
            "explain": "64 − 12 = 52.",
            "accept": [
              "52"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "fractions": {
      "title": "FDP secure",
      "blurb": "Four operations with fractions; reverse percentages.",
      "videoKey": "fractions",
      "teach": {
        "points": [
          "Add/subtract fractions: common denominator first.",
          "Divide fractions: multiply by the reciprocal (keep-change-flip).",
          "Reverse %: if sale price is 80% of original, original = sale ÷ 0.8."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "¾ + ⅛",
          "Common denom 8: 6/8 + 1/8 = 7/8"
        ]
      },
      "practice": [
        {
          "q": "¾ + ⅛ = ?",
          "type": "multi",
          "options": [
            "7/8",
            "4/12",
            "1/2",
            "5/8"
          ],
          "answer": 0,
          "explain": "6/8+1/8=7/8.",
          "stage": "both"
        },
        {
          "q": "⅔ × ¾ = ?",
          "type": "multi",
          "options": [
            "6/12",
            "1/2",
            "5/7",
            "8/9"
          ],
          "answer": 1,
          "explain": "6/12=1/2.",
          "stage": "both"
        },
        {
          "q": "½ ÷ ¼ = ?",
          "type": "multi",
          "options": [
            "1/8",
            "2",
            "1/2",
            "4"
          ],
          "answer": 1,
          "explain": "½ × 4/1 = 2.",
          "stage": "both"
        },
        {
          "q": "A jumper is £36 after 10% off. Original price?",
          "type": "typed",
          "answer": "40",
          "explain": "36÷0.9=40.",
          "accept": [
            "40",
            "£40"
          ],
          "stage": "both"
        },
        {
          "q": "Express 0.375 as a fraction in lowest terms.",
          "type": "typed",
          "answer": "3/8",
          "explain": "375/1000=3/8.",
          "accept": [
            "3/8",
            "⅜"
          ],
          "stage": "both"
        },
        {
          "q": "Which is largest?",
          "type": "multi",
          "options": [
            "2/5",
            "0.45",
            "3/7",
            "40%"
          ],
          "answer": 1,
          "explain": "0.45 > 0.4 > ~0.429 > 0.4.",
          "stage": "ks3"
        },
        {
          "q": "⅝ − ¼ = ?",
          "type": "multi",
          "options": [
            "⅜",
            "½",
            "¼",
            "1"
          ],
          "answer": 0,
          "explain": "⅝−2/8=⅜.",
          "stage": "both"
        },
        {
          "q": "Find 35% of 200.",
          "type": "typed",
          "answer": "70",
          "explain": "0.35×200=70.",
          "accept": [
            "70"
          ],
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Add/subtract fractions: common denominator first.",
          "Divide fractions: multiply by the reciprocal (keep-change-flip)."
        ],
        "practice": [
          {
            "q": "¾ + ⅛ = ?",
            "type": "multi",
            "options": [
              "7/8",
              "4/12",
              "1/2",
              "5/8"
            ],
            "answer": 0,
            "explain": "6/8+1/8=7/8.",
            "stage": "both"
          }
        ]
      }
    },
    "algebra": {
      "title": "Algebra secure",
      "blurb": "Two-step equations, expanding brackets, simple sequences.",
      "videoKey": "algebra",
      "teach": {
        "points": [
          "Solve two-step equations by inverse operations, both sides balanced.",
          "Expand: a(b+c)=ab+ac. Factorise: reverse (common factor).",
          "nth term of arithmetic sequence: a + (n−1)d."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "3(x+2)=18",
          "x+2=6",
          "x=4"
        ]
      },
      "practice": [
        {
          "q": "Solve 3(x+2)=18.",
          "type": "typed",
          "answer": "4",
          "explain": "x+2=6 → x=4.",
          "accept": [
            "4"
          ],
          "stage": "both"
        },
        {
          "q": "Expand 4(2x−3)",
          "type": "multi",
          "options": [
            "8x−3",
            "8x−12",
            "6x−3",
            "8x+12"
          ],
          "answer": 1,
          "explain": "8x−12.",
          "stage": "both"
        },
        {
          "q": "If 5n − 2 = 18, n = ?",
          "type": "typed",
          "answer": "4",
          "explain": "5n=20 → n=4.",
          "accept": [
            "4"
          ],
          "stage": "both"
        },
        {
          "q": "nth term of 3,7,11,15…?",
          "type": "multi",
          "options": [
            "4n−1",
            "3n",
            "n+4",
            "4n+3"
          ],
          "answer": 0,
          "explain": "a=3,d=4 → 4n−1.",
          "stage": "both"
        },
        {
          "q": "Factorise 6x + 9.",
          "type": "typed",
          "answer": "3(2x+3)",
          "explain": "HCF 3.",
          "accept": [
            "3(2x+3)",
            "3(2x + 3)"
          ],
          "stage": "both"
        },
        {
          "q": "Solve x/5 + 3 = 7.",
          "type": "typed",
          "answer": "20",
          "explain": "x/5=4 → x=20.",
          "accept": [
            "20"
          ],
          "stage": "ks3"
        },
        {
          "q": "Solve 2x − 3 = 11.",
          "type": "typed",
          "answer": "7",
          "explain": "2x=14 → x=7.",
          "accept": [
            "7"
          ],
          "stage": "both"
        },
        {
          "q": "Expand −2(x−5)",
          "type": "multi",
          "options": [
            "−2x+10",
            "−2x−10",
            "2x−10",
            "2x+10"
          ],
          "answer": 0,
          "explain": "−2x+10.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Solve two-step equations by inverse operations, both sides balanced.",
          "Expand: a(b+c)=ab+ac. Factorise: reverse (common factor)."
        ],
        "practice": [
          {
            "q": "Solve 3(x+2)=18.",
            "type": "typed",
            "answer": "4",
            "explain": "x+2=6 → x=4.",
            "accept": [
              "4"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "geometry": {
      "title": "Geometry secure",
      "blurb": "Area of triangles/parallelograms, angle facts, circumference intro.",
      "videoKey": "angles",
      "teach": {
        "points": [
          "Triangle 180°, quadrilateral 360°, straight line 180°, point 360°.",
          "Area parallelogram = base × height; triangle = ½bh.",
          "Circumference ≈ πd or 2πr (use π=3.14 or leave in terms of π)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Parallelogram base 8, height 5 → area 40"
        ]
      },
      "practice": [
        {
          "q": "Area of parallelogram base 8 cm height 5 cm?",
          "type": "typed",
          "answer": "40",
          "explain": "8×5=40.",
          "accept": [
            "40"
          ],
          "stage": "both"
        },
        {
          "q": "Interior angle sum of a pentagon?",
          "type": "typed",
          "answer": "540",
          "explain": "(5−2)×180=540.",
          "accept": [
            "540"
          ],
          "stage": "both"
        },
        {
          "q": "Vertically opposite angles are…",
          "type": "multi",
          "options": [
            "equal",
            "sum to 90",
            "sum to 180",
            "always 45"
          ],
          "answer": 0,
          "explain": "VO angles are equal.",
          "stage": "both"
        },
        {
          "q": "Circumference of circle diameter 10 (use π=3.14)?",
          "type": "typed",
          "answer": "31.4",
          "explain": "πd=31.4.",
          "accept": [
            "31.4",
            "31.40"
          ],
          "stage": "both"
        },
        {
          "q": "Area of triangle base 12 height 7?",
          "type": "typed",
          "answer": "42",
          "explain": "½×12×7=42.",
          "accept": [
            "42"
          ],
          "stage": "both"
        },
        {
          "q": "Corresponding angles on parallel lines are…",
          "type": "multi",
          "options": [
            "equal",
            "sum 180",
            "sum 90",
            "random"
          ],
          "answer": 0,
          "explain": "Corresponding angles equal.",
          "stage": "ks3"
        },
        {
          "q": "Exterior angle of regular hexagon?",
          "type": "typed",
          "answer": "60",
          "explain": "360/6=60.",
          "accept": [
            "60"
          ],
          "stage": "both"
        },
        {
          "q": "Area of trapezium formula uses…",
          "type": "multi",
          "options": [
            "average of parallel sides × height",
            "only base×height",
            "πr²",
            "½bh only always"
          ],
          "answer": 0,
          "explain": "½(a+b)h.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Triangle 180°, quadrilateral 360°, straight line 180°, point 360°.",
          "Area parallelogram = base × height; triangle = ½bh."
        ],
        "practice": [
          {
            "q": "Area of parallelogram base 8 cm height 5 cm?",
            "type": "typed",
            "answer": "40",
            "explain": "8×5=40.",
            "accept": [
              "40"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "data": {
      "title": "Data secure",
      "blurb": "Mean/median/mode/range, simple probability, reading charts.",
      "videoKey": "averages",
      "teach": {
        "points": [
          "Mean, median, mode, range — know which average suits the data.",
          "P(event) = favourable ÷ total (equally likely outcomes).",
          "Grouped data: estimate mean using midpoints (intro)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Data 2,5,5,7,11 — median 5, mode 5, mean 6, range 9"
        ]
      },
      "practice": [
        {
          "q": "Median of 2,5,5,7,11?",
          "type": "typed",
          "answer": "5",
          "explain": "Middle value.",
          "accept": [
            "5"
          ],
          "stage": "both"
        },
        {
          "q": "Mean of 2,5,5,7,11?",
          "type": "typed",
          "answer": "6",
          "explain": "30÷5=6.",
          "accept": [
            "6"
          ],
          "stage": "both"
        },
        {
          "q": "P(even) on fair die?",
          "type": "multi",
          "options": [
            "1/2",
            "1/3",
            "1/6",
            "2/3"
          ],
          "answer": 0,
          "explain": "2,4,6 → 3/6=1/2.",
          "stage": "both"
        },
        {
          "q": "Range of 14, 3, 9, 20, 7?",
          "type": "typed",
          "answer": "17",
          "explain": "20−3=17.",
          "accept": [
            "17"
          ],
          "stage": "both"
        },
        {
          "q": "Best average if data has a huge outlier?",
          "type": "multi",
          "options": [
            "mean",
            "median",
            "range",
            "mode always"
          ],
          "answer": 1,
          "explain": "Median resists outliers.",
          "stage": "both"
        },
        {
          "q": "Two coins: P(two heads)?",
          "type": "multi",
          "options": [
            "1/2",
            "1/3",
            "1/4",
            "1"
          ],
          "answer": 2,
          "explain": "HH among HH,HT,TH,TT.",
          "stage": "ks3"
        },
        {
          "q": "Mean of 10, 20, 30?",
          "type": "typed",
          "answer": "20",
          "explain": "60/3=20.",
          "accept": [
            "20"
          ],
          "stage": "both"
        },
        {
          "q": "P(not 6) on fair die?",
          "type": "multi",
          "options": [
            "5/6",
            "1/6",
            "1/2",
            "6/5"
          ],
          "answer": 0,
          "explain": "1−1/6.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Mean, median, mode, range — know which average suits the data.",
          "P(event) = favourable ÷ total (equally likely outcomes)."
        ],
        "practice": [
          {
            "q": "Median of 2,5,5,7,11?",
            "type": "typed",
            "answer": "5",
            "explain": "Middle value.",
            "accept": [
              "5"
            ],
            "stage": "both"
          }
        ]
      }
    }
  },
  "english": {
    "grammar": {
      "title": "Grammar secure",
      "blurb": "Clauses, tense control, active/passive and agreement.",
      "videoKey": "grammar",
      "teach": {
        "points": [
          "Complex sentences: main + subordinate clause(s).",
          "Tense consistency within a paragraph unless time shifts deliberately.",
          "Passive voice: object becomes subject + form of be + past participle."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Active: The chef cooked the meal.",
          "Passive: The meal was cooked by the chef."
        ]
      },
      "practice": [
        {
          "q": "Passive form of 'The storm destroyed the pier.'?",
          "type": "multi",
          "options": [
            "The pier was destroyed by the storm.",
            "The storm was destroyed the pier.",
            "Destroyed the pier the storm.",
            "The pier destroyed."
          ],
          "answer": 0,
          "explain": "Object + was + past participle.",
          "stage": "both"
        },
        {
          "q": "Subordinate clause in: 'Although it rained, we played.'?",
          "type": "multi",
          "options": [
            "we played",
            "Although it rained",
            "it",
            "played"
          ],
          "answer": 1,
          "explain": "Although… cannot stand alone.",
          "stage": "both"
        },
        {
          "q": "Correct agreement:",
          "type": "multi",
          "options": [
            "The list of items are long.",
            "The list of items is long.",
            "The list of items be long.",
            "The list of items were long."
          ],
          "answer": 1,
          "explain": "Subject is 'list' (singular).",
          "stage": "both"
        },
        {
          "q": "Past perfect is used for…",
          "type": "multi",
          "options": [
            "an action before another past action",
            "future only",
            "commands only",
            "adjectives only"
          ],
          "answer": 0,
          "explain": "had + past participle.",
          "stage": "both"
        },
        {
          "q": "Which is a relative clause?",
          "type": "multi",
          "options": [
            "who lives next door",
            "and then",
            "very quickly",
            "Oh no"
          ],
          "answer": 0,
          "explain": "who/which/that clauses.",
          "stage": "both"
        },
        {
          "q": "Modal verb of obligation:",
          "type": "multi",
          "options": [
            "might",
            "must",
            "could",
            "may"
          ],
          "answer": 1,
          "explain": "must = strong obligation.",
          "stage": "both"
        },
        {
          "q": "Correct past perfect:",
          "type": "multi",
          "options": [
            "She had left before we arrived.",
            "She have left before we arrived.",
            "She leaved before.",
            "She did left."
          ],
          "answer": 0,
          "explain": "had + past participle.",
          "stage": "both"
        },
        {
          "q": "Active voice:",
          "type": "multi",
          "options": [
            "The team won the cup.",
            "The cup was won by the team.",
            "The cup is being.",
            "Won the cup team."
          ],
          "answer": 0,
          "explain": "subject does action.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Complex sentences: main + subordinate clause(s).",
          "Tense consistency within a paragraph unless time shifts deliberately."
        ],
        "practice": [
          {
            "q": "Passive form of 'The storm destroyed the pier.'?",
            "type": "multi",
            "options": [
              "The pier was destroyed by the storm.",
              "The storm was destroyed the pier.",
              "Destroyed the pier the storm.",
              "The pier destroyed."
            ],
            "answer": 0,
            "explain": "Object + was + past participle.",
            "stage": "both"
          }
        ]
      }
    },
    "punctuation": {
      "title": "Punctuation secure",
      "blurb": "Colons, semi-colons, dashes, brackets and accurate speech.",
      "videoKey": "punctuation",
      "teach": {
        "points": [
          "Colon introduces list, explanation or quotation after a complete clause.",
          "Semi-colon joins two related independent clauses.",
          "Parentheses/dashes add extra information; don't let them break grammar."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "I packed three things: water, a map and a torch."
        ]
      },
      "practice": [
        {
          "q": "Best punctuation: The recipe was simple_ flour, eggs, milk.",
          "type": "multi",
          "options": [
            ",",
            ":",
            ";",
            "— only always"
          ],
          "answer": 1,
          "explain": "Colon introduces the list.",
          "stage": "both"
        },
        {
          "q": "Correct:",
          "type": "multi",
          "options": [
            "It's cold; we should go in.",
            "It's cold, we should go in.",
            "It's cold we should go in.",
            "Its cold; we should go in."
          ],
          "answer": 0,
          "explain": "Semi-colon joins related sentences; it's = it is.",
          "stage": "both"
        },
        {
          "q": "Plural possession: bags of the teachers",
          "type": "multi",
          "options": [
            "teacher's bags",
            "teachers' bags",
            "teachers bags",
            "teacher's' bags"
          ],
          "answer": 1,
          "explain": "teachers'.",
          "stage": "both"
        },
        {
          "q": "Speech punctuation:",
          "type": "multi",
          "options": [
            "\"Stop,\" she said.",
            "\"Stop\" she said.",
            "\"Stop,\" She said.",
            "Stop, she said."
          ],
          "answer": 0,
          "explain": "Comma inside speech before she said.",
          "stage": "both"
        },
        {
          "q": "Hyphen vs dash: a well-known author uses a…",
          "type": "multi",
          "options": [
            "hyphen in well-known",
            "semi-colon in well-known",
            "colon in well-known",
            "full stop in well-known"
          ],
          "answer": 0,
          "explain": "Compound adjective often hyphenated.",
          "stage": "both"
        },
        {
          "q": "Ellipsis (…) can suggest…",
          "type": "multi",
          "options": [
            "trailing off / pause",
            "only a list",
            "a question",
            "volume"
          ],
          "answer": 0,
          "explain": "Pause or unfinished thought.",
          "stage": "both"
        },
        {
          "q": "Need apostrophe?",
          "type": "multi",
          "options": [
            "The cats whiskers (one cat)",
            "The cat's whiskers",
            "The cats' (one cat) whiskers wrong",
            "The cat whiskers"
          ],
          "answer": 1,
          "explain": "cat's.",
          "stage": "both"
        },
        {
          "q": "Best for two related full sentences:",
          "type": "multi",
          "options": [
            ";",
            ",",
            "... only",
            "! only"
          ],
          "answer": 0,
          "explain": "semi-colon.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Colon introduces list, explanation or quotation after a complete clause.",
          "Semi-colon joins two related independent clauses."
        ],
        "practice": [
          {
            "q": "Best punctuation: The recipe was simple_ flour, eggs, milk.",
            "type": "multi",
            "options": [
              ",",
              ":",
              ";",
              "— only always"
            ],
            "answer": 1,
            "explain": "Colon introduces the list.",
            "stage": "both"
          }
        ]
      }
    },
    "vocabulary": {
      "title": "Vocabulary secure",
      "blurb": "Nuance, formal register and morphology.",
      "videoKey": "reading",
      "teach": {
        "points": [
          "Choose words for precise tone — synonyms are not identical.",
          "Morphology: root + prefix/suffix changes meaning (un-, -less, -ology).",
          "Formal writing avoids slang and contractions (usually)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "reluctant ≈ unwilling; eager is an antonym."
        ]
      },
      "practice": [
        {
          "q": "Best word: The scientist's method was highly ___ .",
          "type": "multi",
          "options": [
            "slapdash",
            "rigorous",
            "random",
            "chatty"
          ],
          "answer": 1,
          "explain": "rigorous = careful and thorough.",
          "stage": "both"
        },
        {
          "q": "Prefix 'anti-' means…",
          "type": "multi",
          "options": [
            "before",
            "against",
            "again",
            "not enough"
          ],
          "answer": 1,
          "explain": "against.",
          "stage": "both"
        },
        {
          "q": "Most formal synonym of 'get':",
          "type": "multi",
          "options": [
            "obtain",
            "grab",
            "score",
            "nab"
          ],
          "answer": 0,
          "explain": "obtain is formal.",
          "stage": "both"
        },
        {
          "q": "Ambiguous means…",
          "type": "multi",
          "options": [
            "crystal clear",
            "open to more than one meaning",
            "musical",
            "ancient"
          ],
          "answer": 1,
          "explain": "more than one interpretation.",
          "stage": "both"
        },
        {
          "q": "Connotation of 'slim' vs 'scrawny'?",
          "type": "multi",
          "options": [
            "slim is more positive",
            "identical always",
            "scrawny is more positive",
            "neither has tone"
          ],
          "answer": 0,
          "explain": "slim often complimentary; scrawny critical.",
          "stage": "both"
        },
        {
          "q": "'Benevolent' most nearly means…",
          "type": "multi",
          "options": [
            "kind",
            "violent",
            "noisy",
            "tiny"
          ],
          "answer": 0,
          "explain": "well-meaning, kind.",
          "stage": "ks3"
        },
        {
          "q": "Antonym of scarce?",
          "type": "multi",
          "options": [
            "plentiful",
            "rare",
            "tiny",
            "hidden"
          ],
          "answer": 0,
          "explain": "plentiful.",
          "stage": "both"
        },
        {
          "q": "'Meticulous' means…",
          "type": "multi",
          "options": [
            "very careful/precise",
            "messy",
            "loud",
            "late"
          ],
          "answer": 0,
          "explain": "careful.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Choose words for precise tone — synonyms are not identical.",
          "Morphology: root + prefix/suffix changes meaning (un-, -less, -ology)."
        ],
        "practice": [
          {
            "q": "Best word: The scientist's method was highly ___ .",
            "type": "multi",
            "options": [
              "slapdash",
              "rigorous",
              "random",
              "chatty"
            ],
            "answer": 1,
            "explain": "rigorous = careful and thorough.",
            "stage": "both"
          }
        ]
      }
    },
    "reading": {
      "title": "Reading secure",
      "blurb": "Inference, evidence, structure and writer’s methods.",
      "videoKey": "reading",
      "teach": {
        "points": [
          "AO1: identify & interpret; AO2: language/structure effects; AO3: compare; AO4: evaluate.",
          "Always embed a short quotation and explain the effect.",
          "Track tone shifts across a text."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Clue words + knowledge → inference. Quote → evidence."
        ]
      },
      "practice": [
        {
          "q": "Inference means…",
          "type": "multi",
          "options": [
            "copying the text only",
            "reading between the lines using clues",
            "counting adjectives",
            "ignoring context"
          ],
          "answer": 1,
          "explain": "clues + knowledge.",
          "stage": "both"
        },
        {
          "q": "Why quote in answers?",
          "type": "multi",
          "options": [
            "to decorate",
            "to support points with evidence",
            "to fill space",
            "exam boards ban quotes"
          ],
          "answer": 1,
          "explain": "evidence for AO1/AO2.",
          "stage": "both"
        },
        {
          "q": "A motif is…",
          "type": "multi",
          "options": [
            "a repeated idea/image",
            "a full stop",
            "a type of narrator only",
            "a rhyme scheme only"
          ],
          "answer": 0,
          "explain": "recurring element.",
          "stage": "both"
        },
        {
          "q": "First-person narrator uses…",
          "type": "multi",
          "options": [
            "I/we",
            "he/she only",
            "you only always",
            "no pronouns"
          ],
          "answer": 0,
          "explain": "I/we.",
          "stage": "both"
        },
        {
          "q": "Structural feature:",
          "type": "multi",
          "options": [
            "paragraph shift / focus change",
            "only spelling",
            "only commas",
            "font size only"
          ],
          "answer": 0,
          "explain": "how the text is built.",
          "stage": "both"
        },
        {
          "q": "Evaluate (AO4) means…",
          "type": "multi",
          "options": [
            "judge how successful methods are",
            "list characters only",
            "copy the title",
            "count words"
          ],
          "answer": 0,
          "explain": "critical judgement.",
          "stage": "ks3"
        },
        {
          "q": "Bias in a text means…",
          "type": "multi",
          "options": [
            "one-sided viewpoint",
            "perfect neutrality only",
            "no adjectives",
            "only facts always"
          ],
          "answer": 0,
          "explain": "slant.",
          "stage": "both"
        },
        {
          "q": "A cliffhanger…",
          "type": "multi",
          "options": [
            "leaves tension unresolved at a break",
            "ends with a moral only",
            "lists facts",
            "is a simile"
          ],
          "answer": 0,
          "explain": "tension.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "AO1: identify & interpret; AO2: language/structure effects; AO3: compare; AO4: evaluate.",
          "Always embed a short quotation and explain the effect."
        ],
        "practice": [
          {
            "q": "Inference means…",
            "type": "multi",
            "options": [
              "copying the text only",
              "reading between the lines using clues",
              "counting adjectives",
              "ignoring context"
            ],
            "answer": 1,
            "explain": "clues + knowledge.",
            "stage": "both"
          }
        ]
      }
    },
    "writing": {
      "title": "Writing secure",
      "blurb": "Purpose, audience, form and controlled techniques.",
      "videoKey": "writing",
      "teach": {
        "points": [
          "PAF: Purpose, Audience, Form before you write.",
          "Vary sentence openers and lengths for effect.",
          "Persuade: ethos/pathos/logos lite — credibility, emotion, reason."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Task: article for classmates → lively but clear; subheadings OK."
        ]
      },
      "practice": [
        {
          "q": "Best for a formal letter of complaint?",
          "type": "multi",
          "options": [
            "Dear Sir or Madam,",
            "Hey,",
            "Yo,",
            "Hiya mate,"
          ],
          "answer": 0,
          "explain": "formal greeting.",
          "stage": "both"
        },
        {
          "q": "Rhetorical question aims to…",
          "type": "multi",
          "options": [
            "get a spoken answer always",
            "make the reader think",
            "end the text only",
            "replace full stops"
          ],
          "answer": 1,
          "explain": "engage thinking.",
          "stage": "both"
        },
        {
          "q": "Discourse marker for contrast:",
          "type": "multi",
          "options": [
            "Furthermore",
            "However",
            "Firstly",
            "In conclusion only"
          ],
          "answer": 1,
          "explain": "However = contrast.",
          "stage": "both"
        },
        {
          "q": "Show-not-tell example:",
          "type": "multi",
          "options": [
            "She was angry.",
            "She slammed the book shut.",
            "Anger.",
            "She felt anger emotions."
          ],
          "answer": 1,
          "explain": "action shows emotion.",
          "stage": "both"
        },
        {
          "q": "A topic sentence…",
          "type": "multi",
          "options": [
            "states the paragraph’s main idea",
            "must be a question",
            "is always last",
            "lists random words"
          ],
          "answer": 0,
          "explain": "guides the paragraph.",
          "stage": "both"
        },
        {
          "q": "Call to action belongs most naturally in…",
          "type": "multi",
          "options": [
            "persuasive ending",
            "dictionary entry",
            "maths formula",
            "silent film only"
          ],
          "answer": 0,
          "explain": "tell reader what to do.",
          "stage": "both"
        },
        {
          "q": "Formal letter close:",
          "type": "multi",
          "options": [
            "Yours faithfully (unknown name)",
            "See ya",
            "Love always only",
            "Thx"
          ],
          "answer": 0,
          "explain": "faithfully if unknown.",
          "stage": "both"
        },
        {
          "q": "Discourse marker to add idea:",
          "type": "multi",
          "options": [
            "Furthermore",
            "However",
            "In contrast",
            "Although"
          ],
          "answer": 0,
          "explain": "Furthermore adds.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "PAF: Purpose, Audience, Form before you write.",
          "Vary sentence openers and lengths for effect."
        ],
        "practice": [
          {
            "q": "Best for a formal letter of complaint?",
            "type": "multi",
            "options": [
              "Dear Sir or Madam,",
              "Hey,",
              "Yo,",
              "Hiya mate,"
            ],
            "answer": 0,
            "explain": "formal greeting.",
            "stage": "both"
          }
        ]
      }
    }
  },
  "science": {
    "biology": {
      "title": "Biology secure",
      "blurb": "Cells, organisation, photosynthesis and health.",
      "videoKey": "biology",
      "teach": {
        "points": [
          "Cell hierarchy: cell → tissue → organ → system → organism.",
          "Photosynthesis: CO₂ + H₂O → glucose + O₂ (chloroplasts, light).",
          "Pathogens cause disease; white blood cells defend."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Leaf cells packed with chloroplasts for photosynthesis."
        ]
      },
      "practice": [
        {
          "q": "Site of photosynthesis?",
          "type": "multi",
          "options": [
            "mitochondria",
            "chloroplasts",
            "nucleus only",
            "ribosomes only"
          ],
          "answer": 1,
          "explain": "chloroplasts.",
          "stage": "both"
        },
        {
          "q": "Correct order?",
          "type": "multi",
          "options": [
            "organ → cell → tissue",
            "cell → tissue → organ → system",
            "system → cell",
            "tissue → atom → organ"
          ],
          "answer": 1,
          "explain": "cell→tissue→organ→system.",
          "stage": "both"
        },
        {
          "q": "Mitochondria are for…",
          "type": "multi",
          "options": [
            "photosynthesis",
            "aerobic respiration (energy)",
            "storing DNA only",
            "making cell walls"
          ],
          "answer": 1,
          "explain": "respiration.",
          "stage": "both"
        },
        {
          "q": "A pathogen is…",
          "type": "multi",
          "options": [
            "a nutrient",
            "a disease-causing microorganism",
            "a bone",
            "a vitamin"
          ],
          "answer": 1,
          "explain": "causes disease.",
          "stage": "both"
        },
        {
          "q": "Xylem transports…",
          "type": "multi",
          "options": [
            "sugars mainly",
            "water and minerals up the plant",
            "oxygen only",
            "blood"
          ],
          "answer": 1,
          "explain": "water/minerals.",
          "stage": "both"
        },
        {
          "q": "Enzymes are…",
          "type": "multi",
          "options": [
            "biological catalysts",
            "only fats",
            "types of bone",
            "light waves"
          ],
          "answer": 0,
          "explain": "speed up reactions.",
          "stage": "ks3"
        },
        {
          "q": "Diffusion is…",
          "type": "multi",
          "options": [
            "net movement high→low concentration",
            "only in solids",
            "needs ATP always",
            "only in plants"
          ],
          "answer": 0,
          "explain": "passive high to low.",
          "stage": "both"
        },
        {
          "q": "Red blood cells carry…",
          "type": "multi",
          "options": [
            "oxygen",
            "only food",
            "bones",
            "urine"
          ],
          "answer": 0,
          "explain": "oxygen via haemoglobin.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Cell hierarchy: cell → tissue → organ → system → organism.",
          "Photosynthesis: CO₂ + H₂O → glucose + O₂ (chloroplasts, light)."
        ],
        "practice": [
          {
            "q": "Site of photosynthesis?",
            "type": "multi",
            "options": [
              "mitochondria",
              "chloroplasts",
              "nucleus only",
              "ribosomes only"
            ],
            "answer": 1,
            "explain": "chloroplasts.",
            "stage": "both"
          }
        ]
      }
    },
    "chemistry": {
      "title": "Chemistry secure",
      "blurb": "Particle model, pure/mixtures, acids/alkalis intro.",
      "videoKey": "chemistry",
      "teach": {
        "points": [
          "Pure substance = single element or compound; mixture = two+ not chemically joined.",
          "pH < 7 acid, 7 neutral, > 7 alkali.",
          "Conservation of mass in a closed system."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Filtration separates insoluble solid from liquid."
        ]
      },
      "practice": [
        {
          "q": "pH of a strong acid is…",
          "type": "multi",
          "options": [
            "close to 1–2",
            "7",
            "14",
            "100"
          ],
          "answer": 0,
          "explain": "low pH.",
          "stage": "both"
        },
        {
          "q": "Neutralisation produces…",
          "type": "multi",
          "options": [
            "only oxygen",
            "salt + water (typically)",
            "only acid",
            "plastic"
          ],
          "answer": 1,
          "explain": "acid + alkali → salt + water.",
          "stage": "both"
        },
        {
          "q": "Chromatography separates…",
          "type": "multi",
          "options": [
            "dissolved substances",
            "only metals",
            "sound waves",
            "magnets"
          ],
          "answer": 0,
          "explain": "inks/dyes etc.",
          "stage": "both"
        },
        {
          "q": "An element…",
          "type": "multi",
          "options": [
            "contains one type of atom",
            "is always a mixture",
            "cannot be solid",
            "is a solution"
          ],
          "answer": 0,
          "explain": "one atom type.",
          "stage": "both"
        },
        {
          "q": "Oxidation (simple) often means…",
          "type": "multi",
          "options": [
            "gain of oxygen / loss of electrons (KS4)",
            "cooling only",
            "melting only",
            "freezing"
          ],
          "answer": 0,
          "explain": "gain oxygen / e⁻ loss at GCSE.",
          "stage": "both"
        },
        {
          "q": "Distillation separates liquids by…",
          "type": "multi",
          "options": [
            "colour only",
            "different boiling points",
            "magnetism",
            "taste"
          ],
          "answer": 1,
          "explain": "boiling points.",
          "stage": "ks3"
        },
        {
          "q": "Group 0/18 are…",
          "type": "multi",
          "options": [
            "noble gases",
            "halogens",
            "alkali metals",
            "transition only"
          ],
          "answer": 0,
          "explain": "noble gases.",
          "stage": "both"
        },
        {
          "q": "Thermal decomposition…",
          "type": "multi",
          "options": [
            "breaks compound with heat",
            "joins metals only",
            "is melting ice",
            "is dissolving"
          ],
          "answer": 0,
          "explain": "heat split.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Pure substance = single element or compound; mixture = two+ not chemically joined.",
          "pH < 7 acid, 7 neutral, > 7 alkali."
        ],
        "practice": [
          {
            "q": "pH of a strong acid is…",
            "type": "multi",
            "options": [
              "close to 1–2",
              "7",
              "14",
              "100"
            ],
            "answer": 0,
            "explain": "low pH.",
            "stage": "both"
          }
        ]
      }
    },
    "physics": {
      "title": "Physics secure",
      "blurb": "Forces, energy stores, speed and circuits.",
      "videoKey": "physics",
      "teach": {
        "points": [
          "Resultant force = overall force; unbalanced → acceleration.",
          "Energy stores: kinetic, GPE, elastic, chemical, thermal, nuclear…",
          "Series vs parallel; current and potential difference basics."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "speed = distance ÷ time"
        ]
      },
      "practice": [
        {
          "q": "Speed if 100 m in 20 s?",
          "type": "typed",
          "answer": "5",
          "explain": "100÷20=5 m/s.",
          "accept": [
            "5",
            "5 m/s",
            "5m/s"
          ],
          "stage": "both"
        },
        {
          "q": "Unit of force?",
          "type": "multi",
          "options": [
            "joule",
            "newton",
            "watt",
            "volt"
          ],
          "answer": 1,
          "explain": "newton (N).",
          "stage": "both"
        },
        {
          "q": "In series, current is…",
          "type": "multi",
          "options": [
            "same everywhere",
            "different in each component always",
            "zero always",
            "only at the battery"
          ],
          "answer": 0,
          "explain": "same current in series.",
          "stage": "both"
        },
        {
          "q": "GPE increases when…",
          "type": "multi",
          "options": [
            "object is lifted higher",
            "object cools",
            "mass becomes zero",
            "time stops"
          ],
          "answer": 0,
          "explain": "higher → more GPE.",
          "stage": "both"
        },
        {
          "q": "Friction…",
          "type": "multi",
          "options": [
            "always speeds you up",
            "opposes relative motion",
            "only in space",
            "creates gravity"
          ],
          "answer": 1,
          "explain": "opposes motion.",
          "stage": "both"
        },
        {
          "q": "Wave speed = frequency × …",
          "type": "multi",
          "options": [
            "wavelength",
            "mass",
            "voltage",
            "time only"
          ],
          "answer": 0,
          "explain": "v = fλ.",
          "stage": "ks3"
        },
        {
          "q": "Moment = force × …",
          "type": "multi",
          "options": [
            "perpendicular distance",
            "mass only",
            "time",
            "temperature"
          ],
          "answer": 0,
          "explain": "F×d.",
          "stage": "both"
        },
        {
          "q": "Sound cannot travel through…",
          "type": "multi",
          "options": [
            "vacuum",
            "air",
            "water",
            "steel"
          ],
          "answer": 0,
          "explain": "needs medium.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Resultant force = overall force; unbalanced → acceleration.",
          "Energy stores: kinetic, GPE, elastic, chemical, thermal, nuclear…"
        ],
        "practice": [
          {
            "q": "Speed if 100 m in 20 s?",
            "type": "typed",
            "answer": "5",
            "explain": "100÷20=5 m/s.",
            "accept": [
              "5",
              "5 m/s",
              "5m/s"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "method": {
      "title": "Working scientifically secure",
      "blurb": "Variables, graphs, uncertainty and fair tests.",
      "videoKey": "method",
      "teach": {
        "points": [
          "Independent / dependent / control variables — state them clearly.",
          "Range, interval and repeats for reliability.",
          "Plot continuous data as line graphs; include units on axes."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Temperature (IV) vs time to dissolve (DV); control mass of solute."
        ]
      },
      "practice": [
        {
          "q": "What you change deliberately is the…",
          "type": "multi",
          "options": [
            "dependent",
            "independent",
            "control",
            "anomaly"
          ],
          "answer": 1,
          "explain": "independent.",
          "stage": "both"
        },
        {
          "q": "An anomaly is…",
          "type": "multi",
          "options": [
            "a result that doesn't fit the pattern",
            "the mean",
            "the title",
            "a control"
          ],
          "answer": 0,
          "explain": "odd result.",
          "stage": "both"
        },
        {
          "q": "Resolution of a measuring instrument is…",
          "type": "multi",
          "options": [
            "smallest change it can show",
            "accuracy always",
            "the mean",
            "the range"
          ],
          "answer": 0,
          "explain": "smallest division.",
          "stage": "both"
        },
        {
          "q": "Categoric independent variable → best chart?",
          "type": "multi",
          "options": [
            "line graph",
            "bar chart",
            "no chart",
            "histogram only always"
          ],
          "answer": 1,
          "explain": "bar chart.",
          "stage": "both"
        },
        {
          "q": "A hypothesis should be…",
          "type": "multi",
          "options": [
            "testable",
            "impossible",
            "a random poem",
            "the conclusion only"
          ],
          "answer": 0,
          "explain": "testable prediction.",
          "stage": "both"
        },
        {
          "q": "Uncertainty can be reduced by…",
          "type": "multi",
          "options": [
            "repeating and improving method",
            "guessing",
            "ignoring units",
            "changing IV randomly"
          ],
          "answer": 0,
          "explain": "better method/repeats.",
          "stage": "both"
        },
        {
          "q": "Continuous variable example?",
          "type": "multi",
          "options": [
            "temperature",
            "eye colour",
            "blood group",
            "car brand"
          ],
          "answer": 0,
          "explain": "can take any value in range.",
          "stage": "both"
        },
        {
          "q": "Bar chart vs histogram:",
          "type": "multi",
          "options": [
            "bar chart: categories; histogram: continuous FD",
            "identical always",
            "histogram for names only",
            "bar for time only"
          ],
          "answer": 0,
          "explain": "different uses.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Independent / dependent / control variables — state them clearly.",
          "Range, interval and repeats for reliability."
        ],
        "practice": [
          {
            "q": "What you change deliberately is the…",
            "type": "multi",
            "options": [
              "dependent",
              "independent",
              "control",
              "anomaly"
            ],
            "answer": 1,
            "explain": "independent.",
            "stage": "both"
          }
        ]
      }
    }
  }
};
