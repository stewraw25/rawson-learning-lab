/**
 * Stage 4 GCSE Core
 */

const TEACH_MODULES_STAGE4 = {
  "maths": {
    "number": {
      "title": "GCSE Number (Core)",
      "blurb": "Standard form, bounds, indices and roots — Foundation tier.",
      "videoKey": "placevalue",
      "teach": {
        "points": [
          "Standard form: a × 10ⁿ with 1 ≤ a < 10.",
          "Error intervals / bounds: continuous measure to nearest unit.",
          "Index laws including a⁰=1 and a⁻ⁿ = 1/aⁿ (Foundation)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "3400 = 3.4 × 10³",
          "0.0051 = 5.1 × 10⁻³"
        ]
      },
      "practice": [
        {
          "q": "3400 in standard form?",
          "type": "multi",
          "options": [
            "3.4×10²",
            "3.4×10³",
            "34×10²",
            "3.4×10⁴"
          ],
          "answer": 1,
          "explain": "3.4 × 10³.",
          "stage": "both"
        },
        {
          "q": "0.0051 in standard form?",
          "type": "multi",
          "options": [
            "5.1×10⁻³",
            "5.1×10⁻²",
            "51×10⁻⁴",
            "5.1×10³"
          ],
          "answer": 0,
          "explain": "5.1×10⁻³.",
          "stage": "both"
        },
        {
          "q": "2⁻³ as a fraction?",
          "type": "typed",
          "answer": "1/8",
          "explain": "1/2³=1/8.",
          "accept": [
            "1/8",
            "0.125"
          ],
          "stage": "both"
        },
        {
          "q": "Length 12 cm to nearest cm. Lower bound?",
          "type": "multi",
          "options": [
            "11.5 cm",
            "12 cm",
            "12.5 cm",
            "11 cm"
          ],
          "answer": 0,
          "explain": "halfway down.",
          "stage": "both"
        },
        {
          "q": "√81 = ?",
          "type": "typed",
          "answer": "9",
          "explain": "9×9=81.",
          "accept": [
            "9"
          ],
          "stage": "both"
        },
        {
          "q": "Evaluate 5⁰.",
          "type": "typed",
          "answer": "1",
          "explain": "Any non-zero number to power 0 is 1.",
          "accept": [
            "1"
          ],
          "stage": "both"
        },
        {
          "q": "Write 6.2×10⁻³ as ordinary number.",
          "type": "multi",
          "options": [
            "0.0062",
            "0.062",
            "6200",
            "0.00062"
          ],
          "answer": 0,
          "explain": "move DP 3 left.",
          "stage": "both"
        },
        {
          "q": "3² × 3⁵ = 3^?",
          "type": "typed",
          "answer": "7",
          "explain": "add indices.",
          "accept": [
            "7"
          ],
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Standard form: a × 10ⁿ with 1 ≤ a < 10.",
          "Error intervals / bounds: continuous measure to nearest unit."
        ],
        "practice": [
          {
            "q": "3400 in standard form?",
            "type": "multi",
            "options": [
              "3.4×10²",
              "3.4×10³",
              "34×10²",
              "3.4×10⁴"
            ],
            "answer": 0,
            "explain": "Wait 3.4×10³ is correct — answer index 1.",
            "stage": "both"
          }
        ]
      }
    },
    "operations": {
      "title": "GCSE Calculations (Core)",
      "blurb": "Compound measures, reverse operations, calculator-smart methods.",
      "videoKey": "multiply",
      "teach": {
        "points": [
          "Density = mass ÷ volume; speed = distance ÷ time; pressure = force ÷ area.",
          "Show clear steps even with a calculator — method marks matter.",
          "Convert units carefully (cm³ ↔ m³ etc.)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "mass=20g, volume=4cm³ → density=5 g/cm³"
        ]
      },
      "practice": [
        {
          "q": "Density if mass 20 g and volume 4 cm³?",
          "type": "typed",
          "answer": "5",
          "explain": "20÷4=5.",
          "accept": [
            "5"
          ],
          "stage": "both"
        },
        {
          "q": "Time for 150 km at 50 km/h?",
          "type": "typed",
          "answer": "3",
          "explain": "150÷50=3 hours.",
          "accept": [
            "3",
            "3 hours",
            "3h"
          ],
          "stage": "both"
        },
        {
          "q": "Pressure unit example?",
          "type": "multi",
          "options": [
            "N/m² (pascal)",
            "kg only",
            "seconds",
            "degrees"
          ],
          "answer": 0,
          "explain": "force/area.",
          "stage": "both"
        },
        {
          "q": "3.5 hours in minutes?",
          "type": "typed",
          "answer": "210",
          "explain": "3.5×60=210.",
          "accept": [
            "210"
          ],
          "stage": "both"
        },
        {
          "q": "Best estimate of 4.9²?",
          "type": "multi",
          "options": [
            "25",
            "16",
            "36",
            "10"
          ],
          "answer": 0,
          "explain": "~5²=25.",
          "stage": "both"
        },
        {
          "q": "Force if pressure 10 N/m² on area 3 m²?",
          "type": "typed",
          "answer": "30",
          "explain": "P=F/A → F=30.",
          "accept": [
            "30"
          ],
          "stage": "both"
        },
        {
          "q": "Speed 90 km in 1.5 h?",
          "type": "typed",
          "answer": "60",
          "explain": "90/1.5=60 km/h.",
          "accept": [
            "60",
            "60 km/h"
          ],
          "stage": "both"
        },
        {
          "q": "1 m³ = ? litres",
          "type": "multi",
          "options": [
            "1000",
            "100",
            "10",
            "1"
          ],
          "answer": 0,
          "explain": "1000 L.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Density = mass ÷ volume; speed = distance ÷ time; pressure = force ÷ area.",
          "Show clear steps even with a calculator — method marks matter."
        ],
        "practice": [
          {
            "q": "Density if mass 20 g and volume 4 cm³?",
            "type": "typed",
            "answer": "5",
            "explain": "20÷4=5.",
            "accept": [
              "5"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "fractions": {
      "title": "GCSE Ratio & proportion (Core)",
      "blurb": "Ratio, proportion, percentages and compound interest intro.",
      "videoKey": "percentages",
      "teach": {
        "points": [
          "Share in a ratio: total parts, then multiply.",
          "Direct proportion: y = kx. Inverse: y = k/x.",
          "Compound interest: multiplier each year (e.g. ×1.03)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Share £60 in ratio 2:3 → parts 5 → £24 and £36"
        ]
      },
      "practice": [
        {
          "q": "Share £60 in 2:3. Smaller share?",
          "type": "multi",
          "options": [
            "£24",
            "£30",
            "£36",
            "£20"
          ],
          "answer": 0,
          "explain": "2/5 of 60=24.",
          "stage": "both"
        },
        {
          "q": "Increase 80 by 15%.",
          "type": "typed",
          "answer": "92",
          "explain": "80×1.15=92.",
          "accept": [
            "92"
          ],
          "stage": "both"
        },
        {
          "q": "y is directly proportional to x. If x doubles, y…",
          "type": "multi",
          "options": [
            "doubles",
            "halves",
            "squares",
            "stays same"
          ],
          "answer": 0,
          "explain": "y=kx.",
          "stage": "both"
        },
        {
          "q": "Simple interest: £200 at 5% for 3 years (not compound).",
          "type": "typed",
          "answer": "30",
          "explain": "200×0.05×3=30.",
          "accept": [
            "30",
            "£30"
          ],
          "stage": "both"
        },
        {
          "q": "Express 3:12 simplified.",
          "type": "multi",
          "options": [
            "1:4",
            "3:4",
            "1:3",
            "4:1"
          ],
          "answer": 0,
          "explain": "divide by 3.",
          "stage": "both"
        },
        {
          "q": "If 4 workers take 6 hours, 8 workers take? (same job, inverse)",
          "type": "typed",
          "answer": "3",
          "explain": "twice workers → half time.",
          "accept": [
            "3",
            "3 hours"
          ],
          "stage": "ks3"
        },
        {
          "q": "Share 80 in 1:3. Larger share?",
          "type": "multi",
          "options": [
            "60",
            "20",
            "40",
            "80"
          ],
          "answer": 0,
          "explain": "3/4 of 80.",
          "stage": "both"
        },
        {
          "q": "Decrease 50 by 20%.",
          "type": "typed",
          "answer": "40",
          "explain": "50×0.8=40.",
          "accept": [
            "40"
          ],
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Share in a ratio: total parts, then multiply.",
          "Direct proportion: y = kx. Inverse: y = k/x."
        ],
        "practice": [
          {
            "q": "Share £60 in 2:3. Smaller share?",
            "type": "multi",
            "options": [
              "£24",
              "£30",
              "£36",
              "£20"
            ],
            "answer": 0,
            "explain": "2/5 of 60=24.",
            "stage": "both"
          }
        ]
      }
    },
    "algebra": {
      "title": "GCSE Algebra (Core)",
      "blurb": "Equations, inequalities, formulae and straight-line graphs intro.",
      "videoKey": "algebra",
      "teach": {
        "points": [
          "Solve linear equations and simple inequalities (flip when ×/÷ by negative).",
          "Rearrange formulae: inverse operations.",
          "Straight line y = mx + c: m gradient, c intercept."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "y=2x+1 has gradient 2, intercept 1"
        ]
      },
      "practice": [
        {
          "q": "Gradient of y=2x+1?",
          "type": "multi",
          "options": [
            "2",
            "1",
            "0",
            "−2"
          ],
          "answer": 0,
          "explain": "m=2.",
          "stage": "both"
        },
        {
          "q": "Solve 4x − 7 = 9.",
          "type": "typed",
          "answer": "4",
          "explain": "4x=16 → x=4.",
          "accept": [
            "4"
          ],
          "stage": "both"
        },
        {
          "q": "Solve inequality 2x > 10.",
          "type": "multi",
          "options": [
            "x>5",
            "x<5",
            "x=5",
            "x≥5"
          ],
          "answer": 0,
          "explain": "divide by 2.",
          "stage": "both"
        },
        {
          "q": "Make x the subject: y = 3x + 2. x = ?",
          "type": "typed",
          "answer": "(y-2)/3",
          "explain": "y−2=3x → x=(y−2)/3.",
          "accept": [
            "(y-2)/3",
            "(y − 2)/3",
            "y/3-2/3"
          ],
          "stage": "both"
        },
        {
          "q": "Expand and simplify 2(x+3)+x",
          "type": "multi",
          "options": [
            "3x+6",
            "2x+3",
            "3x+3",
            "2x+6"
          ],
          "answer": 0,
          "explain": "2x+6+x=3x+6.",
          "stage": "both"
        },
        {
          "q": "If f(x)=2x+5, f(3)=?",
          "type": "typed",
          "answer": "11",
          "explain": "6+5=11.",
          "accept": [
            "11"
          ],
          "stage": "both"
        },
        {
          "q": "y-intercept of y=−3x+7?",
          "type": "multi",
          "options": [
            "7",
            "−3",
            "3",
            "0"
          ],
          "answer": 0,
          "explain": "c=7.",
          "stage": "both"
        },
        {
          "q": "Solve 3x+2=2x+9.",
          "type": "typed",
          "answer": "7",
          "explain": "x=7.",
          "accept": [
            "7"
          ],
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Solve linear equations and simple inequalities (flip when ×/÷ by negative).",
          "Rearrange formulae: inverse operations."
        ],
        "practice": [
          {
            "q": "Gradient of y=2x+1?",
            "type": "multi",
            "options": [
              "2",
              "1",
              "0",
              "−2"
            ],
            "answer": 0,
            "explain": "m=2.",
            "stage": "both"
          }
        ]
      }
    },
    "geometry": {
      "title": "GCSE Geometry (Core)",
      "blurb": "Pythagoras, volume of prisms, transformations intro.",
      "videoKey": "angles",
      "teach": {
        "points": [
          "Pythagoras: a²+b²=c² for right-angled triangles only.",
          "Volume prism = area of cross-section × length.",
          "Congruent = same shape and size; similar = same shape, scaled."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "3-4-5 triangle: 3²+4²=9+16=25=5²"
        ]
      },
      "practice": [
        {
          "q": "Hypotenuse if legs 3 and 4?",
          "type": "typed",
          "answer": "5",
          "explain": "3-4-5 triangle.",
          "accept": [
            "5"
          ],
          "stage": "both"
        },
        {
          "q": "Volume of cuboid 2×3×4?",
          "type": "typed",
          "answer": "24",
          "explain": "2×3×4=24.",
          "accept": [
            "24"
          ],
          "stage": "both"
        },
        {
          "q": "Pythagoras applies to…",
          "type": "multi",
          "options": [
            "any triangle",
            "right-angled triangles",
            "only equilateral",
            "circles only"
          ],
          "answer": 1,
          "explain": "right-angled.",
          "stage": "both"
        },
        {
          "q": "A translation…",
          "type": "multi",
          "options": [
            "slides without turning",
            "flips",
            "enlarges only",
            "changes angles"
          ],
          "answer": 0,
          "explain": "slide.",
          "stage": "both"
        },
        {
          "q": "Area of circle radius 5 (leave in terms of π)?",
          "type": "typed",
          "answer": "25π",
          "explain": "πr²=25π.",
          "accept": [
            "25π",
            "25pi",
            "25 π"
          ],
          "stage": "both"
        },
        {
          "q": "Scale factor 2 enlargement…",
          "type": "multi",
          "options": [
            "lengths double",
            "angles double",
            "area same",
            "shape changes"
          ],
          "answer": 0,
          "explain": "lengths ×2.",
          "stage": "both"
        },
        {
          "q": "Pythagoras: legs 5 and 12, hyp?",
          "type": "typed",
          "answer": "13",
          "explain": "5-12-13.",
          "accept": [
            "13"
          ],
          "stage": "both"
        },
        {
          "q": "Volume of triangular prism needs…",
          "type": "multi",
          "options": [
            "triangle area × length",
            "only perimeter",
            "πr²h always",
            "surface area only"
          ],
          "answer": 0,
          "explain": "cross-section×length.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Pythagoras: a²+b²=c² for right-angled triangles only.",
          "Volume prism = area of cross-section × length."
        ],
        "practice": [
          {
            "q": "Hypotenuse if legs 3 and 4?",
            "type": "typed",
            "answer": "5",
            "explain": "3-4-5 triangle.",
            "accept": [
              "5"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "data": {
      "title": "GCSE Statistics & probability (Core)",
      "blurb": "Averages from tables, Venn intro, tree diagrams (simple).",
      "videoKey": "averages",
      "teach": {
        "points": [
          "Estimated mean from grouped frequency: Σ(fm)/Σf using midpoints.",
          "P(A or B) for mutually exclusive: P(A)+P(B).",
          "Sample vs population; avoid bias where possible."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Midpoints × frequencies, sum, divide by total frequency."
        ]
      },
      "practice": [
        {
          "q": "Mutually exclusive events…",
          "type": "multi",
          "options": [
            "cannot happen together",
            "always independent",
            "have P=1 always",
            "are impossible"
          ],
          "answer": 0,
          "explain": "no overlap.",
          "stage": "both"
        },
        {
          "q": "P(not A) if P(A)=0.3?",
          "type": "typed",
          "answer": "0.7",
          "explain": "1−0.3=0.7.",
          "accept": [
            "0.7",
            ".7"
          ],
          "stage": "both"
        },
        {
          "q": "Mode is…",
          "type": "multi",
          "options": [
            "most frequent",
            "middle value",
            "mean",
            "range"
          ],
          "answer": 0,
          "explain": "most common.",
          "stage": "both"
        },
        {
          "q": "A fair spinner 1–5. P(multiple of 2)?",
          "type": "multi",
          "options": [
            "2/5",
            "1/5",
            "3/5",
            "1/2"
          ],
          "answer": 0,
          "explain": "2 and 4 → 2/5.",
          "stage": "both"
        },
        {
          "q": "Why random sample?",
          "type": "multi",
          "options": [
            "reduce bias",
            "guarantee mean 0",
            "always smaller",
            "remove range"
          ],
          "answer": 0,
          "explain": "fairer representation.",
          "stage": "both"
        },
        {
          "q": "Frequency polygon plots…",
          "type": "multi",
          "options": [
            "midpoints against frequency",
            "only pie slices",
            "names",
            "colours only"
          ],
          "answer": 0,
          "explain": "midpoint vs frequency.",
          "stage": "both"
        },
        {
          "q": "P(A or B) exclusive =",
          "type": "multi",
          "options": [
            "P(A)+P(B)",
            "P(A)×P(B)",
            "P(A)−P(B)",
            "1"
          ],
          "answer": 0,
          "explain": "add.",
          "stage": "both"
        },
        {
          "q": "Median position in 11 ordered values?",
          "type": "typed",
          "answer": "6th",
          "explain": "middle is 6th.",
          "accept": [
            "6",
            "6th",
            "position 6"
          ],
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Estimated mean from grouped frequency: Σ(fm)/Σf using midpoints.",
          "P(A or B) for mutually exclusive: P(A)+P(B)."
        ],
        "practice": [
          {
            "q": "Mutually exclusive events…",
            "type": "multi",
            "options": [
              "cannot happen together",
              "always independent",
              "have P=1 always",
              "are impossible"
            ],
            "answer": 0,
            "explain": "no overlap.",
            "stage": "both"
          }
        ]
      }
    }
  },
  "english": {
    "grammar": {
      "title": "GCSE Grammar (Core)",
      "blurb": "Sentence accuracy for AO6 — Foundation/Core band.",
      "videoKey": "grammar",
      "teach": {
        "points": [
          "Secure control of sentence demarcation and standard English.",
          "Avoid comma splices: use full stop, semi-colon, or conjunction.",
          "Subject–verb agreement and pronoun reference clarity."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Wrong: It was late, we went home.",
          "Right: It was late, so we went home. / It was late; we went home."
        ]
      },
      "practice": [
        {
          "q": "Comma splice fix:",
          "type": "multi",
          "options": [
            "It rained. We left.",
            "It rained, we left.",
            "It rained we left.",
            "It rained;."
          ],
          "answer": 0,
          "explain": "separate sentences or use conjunction.",
          "stage": "both"
        },
        {
          "q": "Standard English:",
          "type": "multi",
          "options": [
            "We was happy.",
            "We were happy.",
            "We were is happy.",
            "We be happy."
          ],
          "answer": 1,
          "explain": "were with we.",
          "stage": "both"
        },
        {
          "q": "Fragment:",
          "type": "multi",
          "options": [
            "Because the train was late.",
            "The train was late.",
            "It arrived.",
            "She smiled."
          ],
          "answer": 0,
          "explain": "subordinate alone.",
          "stage": "both"
        },
        {
          "q": "Correct possessive:",
          "type": "multi",
          "options": [
            "The dog wagged it's tail.",
            "The dog wagged its tail.",
            "The dog wagged its' tail.",
            "The dog wagged it tail."
          ],
          "answer": 1,
          "explain": "its = possession; it's = it is.",
          "stage": "both"
        },
        {
          "q": "Parallel structure:",
          "type": "multi",
          "options": [
            "She likes hiking, swimming and to bike.",
            "She likes hiking, swimming and biking.",
            "She likes hike, swim, bike.",
            "She likes hiking and swim."
          ],
          "answer": 1,
          "explain": "match forms.",
          "stage": "both"
        },
        {
          "q": "Dangling modifier risk:",
          "type": "multi",
          "options": [
            "Running late, the bus was missed.",
            "Running late, we missed the bus.",
            "The bus, running late we.",
            "Missed bus running."
          ],
          "answer": 1,
          "explain": "subject who was running = we.",
          "stage": "both"
        },
        {
          "q": "Avoid double negative in standard English:",
          "type": "multi",
          "options": [
            "I didn't see anything.",
            "I didn't see nothing.",
            "I ain't saw none.",
            "I never not went."
          ],
          "answer": 0,
          "explain": "anything.",
          "stage": "both"
        },
        {
          "q": "Which is a complex sentence?",
          "type": "multi",
          "options": [
            "Although tired, she revised.",
            "She revised.",
            "Revise!",
            "Yes."
          ],
          "answer": 0,
          "explain": "subordinate+main.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Secure control of sentence demarcation and standard English.",
          "Avoid comma splices: use full stop, semi-colon, or conjunction."
        ],
        "practice": [
          {
            "q": "Comma splice fix:",
            "type": "multi",
            "options": [
              "It rained. We left.",
              "It rained, we left.",
              "It rained we left.",
              "It rained;."
            ],
            "answer": 0,
            "explain": "separate sentences or use conjunction.",
            "stage": "both"
          }
        ]
      }
    },
    "punctuation": {
      "title": "GCSE Punctuation (Core)",
      "blurb": "Full range for clear meaning — exam-ready accuracy.",
      "videoKey": "punctuation",
      "teach": {
        "points": [
          "Use a wide range accurately: . , ! ? ; : — ' \" ( ) …",
          "Apostrophes: omission vs possession; never in plain plurals.",
          "Speech layout conventions for narrative writing."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Students' books (plural possession)."
        ]
      },
      "practice": [
        {
          "q": "Plural of fox with no possession:",
          "type": "multi",
          "options": [
            "fox's",
            "foxes",
            "foxes'",
            "fox"
          ],
          "answer": 1,
          "explain": "plain plural foxes.",
          "stage": "both"
        },
        {
          "q": "Omission apostrophe:",
          "type": "multi",
          "options": [
            "cant",
            "can't",
            "ca'nt",
            "cant'"
          ],
          "answer": 1,
          "explain": "cannot → can't.",
          "stage": "both"
        },
        {
          "q": "Colon use:",
          "type": "multi",
          "options": [
            "She brought: apples.",
            "She brought three items: apples, pears and grapes.",
            "She: brought apples.",
            ":She brought apples"
          ],
          "answer": 1,
          "explain": "complete clause then list.",
          "stage": "both"
        },
        {
          "q": "Semi-colon best in:",
          "type": "multi",
          "options": [
            "I came; I saw; I conquered. (related clauses)",
            "I came, I saw, I conquered only always",
            "listing single words only",
            "ending questions"
          ],
          "answer": 0,
          "explain": "linked independent clauses.",
          "stage": "both"
        },
        {
          "q": "Direct speech new speaker means…",
          "type": "multi",
          "options": [
            "new line",
            "same line always",
            "no punctuation",
            "brackets only"
          ],
          "answer": 0,
          "explain": "new speaker, new line.",
          "stage": "both"
        },
        {
          "q": "Brackets can…",
          "type": "multi",
          "options": [
            "add extra info",
            "replace all commas forever",
            "end essays only",
            "mean possession"
          ],
          "answer": 0,
          "explain": "parenthetical info.",
          "stage": "both"
        },
        {
          "q": "Titles of short poems often in…",
          "type": "multi",
          "options": [
            "quotation marks",
            "bold only",
            "ALL CAPS only",
            "no marks ever"
          ],
          "answer": 0,
          "explain": "quotes (style).",
          "stage": "both"
        },
        {
          "q": "Possessive plural children:",
          "type": "multi",
          "options": [
            "children's",
            "childrens'",
            "childrens",
            "child'ss"
          ],
          "answer": 0,
          "explain": "children's.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Use a wide range accurately: . , ! ? ; : — ' \" ( ) …",
          "Apostrophes: omission vs possession; never in plain plurals."
        ],
        "practice": [
          {
            "q": "Plural of fox with no possession:",
            "type": "multi",
            "options": [
              "fox's",
              "foxes",
              "foxes'",
              "fox"
            ],
            "answer": 1,
            "explain": "plain plural foxes.",
            "stage": "both"
          }
        ]
      }
    },
    "vocabulary": {
      "title": "GCSE Vocabulary (Core)",
      "blurb": "Ambitious but precise vocabulary for Reading & Writing.",
      "videoKey": "reading",
      "teach": {
        "points": [
          "Ambitious vocabulary only works if precise and in the right register.",
          "Academic verbs: suggests, implies, conveys, emphasises, juxtaposes.",
          "Avoid malapropisms — near-miss words cost marks."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "'The writer conveys a sense of unease' beats 'The writer does emotions'."
        ]
      },
      "practice": [
        {
          "q": "Best analytical verb:",
          "type": "multi",
          "options": [
            "shows",
            "conveys",
            "does",
            "is"
          ],
          "answer": 1,
          "explain": "conveys is more precise (shows also OK but conveys stronger).",
          "stage": "both"
        },
        {
          "q": "Juxtaposition means…",
          "type": "multi",
          "options": [
            "placing side by side for contrast",
            "rhyming",
            "whispering",
            "summarising only"
          ],
          "answer": 0,
          "explain": "contrast through pairing.",
          "stage": "both"
        },
        {
          "q": "Tone means…",
          "type": "multi",
          "options": [
            "writer's attitude/mood created",
            "only volume",
            "font",
            "page number"
          ],
          "answer": 0,
          "explain": "attitude/mood.",
          "stage": "both"
        },
        {
          "q": "Formal alternative to 'kids':",
          "type": "multi",
          "options": [
            "children / young people",
            "guys",
            "mates",
            "folks only"
          ],
          "answer": 0,
          "explain": "register.",
          "stage": "both"
        },
        {
          "q": "'Ominous' most nearly…",
          "type": "multi",
          "options": [
            "threatening",
            "cheerful",
            "tiny",
            "sweet"
          ],
          "answer": 0,
          "explain": "suggesting something bad.",
          "stage": "both"
        },
        {
          "q": "Semantic field is…",
          "type": "multi",
          "options": [
            "a group of related words",
            "a full stop",
            "a narrator type",
            "a rhyme"
          ],
          "answer": 0,
          "explain": "related lexical set.",
          "stage": "both"
        },
        {
          "q": "Best synonym for 'significant' in analysis:",
          "type": "multi",
          "options": [
            "noteworthy",
            "tiny",
            "random",
            "loud"
          ],
          "answer": 0,
          "explain": "noteworthy.",
          "stage": "both"
        },
        {
          "q": "'Understatement' opposite technique often…",
          "type": "multi",
          "options": [
            "hyperbole",
            "full stop",
            "list",
            "indent"
          ],
          "answer": 0,
          "explain": "hyperbole.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Ambitious vocabulary only works if precise and in the right register.",
          "Academic verbs: suggests, implies, conveys, emphasises, juxtaposes."
        ],
        "practice": [
          {
            "q": "Best analytical verb:",
            "type": "multi",
            "options": [
              "shows",
              "conveys",
              "does",
              "is"
            ],
            "answer": 1,
            "explain": "conveys is more precise (shows also OK but conveys stronger).",
            "stage": "both"
          }
        ]
      }
    },
    "reading": {
      "title": "GCSE Reading (Core)",
      "blurb": "Lang Paper skills AO1–AO4 at Core level.",
      "videoKey": "reading",
      "teach": {
        "points": [
          "Select and synthesise evidence; interpret clearly.",
          "Explain language and structural effects with subject terminology.",
          "Compare writers' ideas and perspectives (where required)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Point → Evidence → Explain (effect on reader) → Link."
        ]
      },
      "practice": [
        {
          "q": "PEEL/PEE helps you…",
          "type": "multi",
          "options": [
            "structure analytical paragraphs",
            "write shopping lists",
            "count words only",
            "avoid quotes"
          ],
          "answer": 0,
          "explain": "clear analysis structure.",
          "stage": "both"
        },
        {
          "q": "Structure includes…",
          "type": "multi",
          "options": [
            "openings, shifts, focus, endings",
            "only adjectives",
            "only spelling",
            "page colour"
          ],
          "answer": 0,
          "explain": "how text is organised.",
          "stage": "both"
        },
        {
          "q": "Pathetic fallacy:",
          "type": "multi",
          "options": [
            "weather mirrors mood",
            "a lying character",
            "a type of full stop",
            "a sonnet rule"
          ],
          "answer": 0,
          "explain": "nature reflects emotion.",
          "stage": "both"
        },
        {
          "q": "When comparing texts…",
          "type": "multi",
          "options": [
            "use connectives: whereas, similarly",
            "never mention either text",
            "only list dates",
            "copy both titles only"
          ],
          "answer": 0,
          "explain": "comparative discourse.",
          "stage": "both"
        },
        {
          "q": "Implicit meaning is…",
          "type": "multi",
          "options": [
            "suggested not stated",
            "printed in bold only",
            "always false",
            "the title only"
          ],
          "answer": 0,
          "explain": "implied.",
          "stage": "both"
        },
        {
          "q": "Evaluate question wants…",
          "type": "multi",
          "options": [
            "judgement + methods + evidence",
            "yes/no only",
            "a drawing",
            "word count"
          ],
          "answer": 0,
          "explain": "critical evaluation.",
          "stage": "both"
        },
        {
          "q": "Synthesis means…",
          "type": "multi",
          "options": [
            "bringing ideas together",
            "copying one line",
            "ignoring text",
            "only spelling"
          ],
          "answer": 0,
          "explain": "combine.",
          "stage": "both"
        },
        {
          "q": "Writer's perspective is…",
          "type": "multi",
          "options": [
            "viewpoint/attitude",
            "font size",
            "page number",
            "exam board"
          ],
          "answer": 0,
          "explain": "viewpoint.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Select and synthesise evidence; interpret clearly.",
          "Explain language and structural effects with subject terminology."
        ],
        "practice": [
          {
            "q": "PEEL/PEE helps you…",
            "type": "multi",
            "options": [
              "structure analytical paragraphs",
              "write shopping lists",
              "count words only",
              "avoid quotes"
            ],
            "answer": 0,
            "explain": "clear analysis structure.",
            "stage": "both"
          }
        ]
      }
    },
    "writing": {
      "title": "GCSE Writing (Core)",
      "blurb": "AO5 content/organisation + AO6 tech accuracy.",
      "videoKey": "writing",
      "teach": {
        "points": [
          "Plan: purpose, audience, form, 4–6 clear sections.",
          "Match register: article ≠ story ≠ letter.",
          "Leave 5 minutes to proofread AO6."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Persuasive article: hook → arguments → counter → call to action."
        ]
      },
      "practice": [
        {
          "q": "AO5 rewards…",
          "type": "multi",
          "options": [
            "content, organisation, style",
            "only spelling",
            "only handwriting size",
            "drawing"
          ],
          "answer": 0,
          "explain": "ideas and structure.",
          "stage": "both"
        },
        {
          "q": "AO6 rewards…",
          "type": "multi",
          "options": [
            "spelling, punctuation, grammar",
            "only plot",
            "only quotes from others",
            "margins"
          ],
          "answer": 0,
          "explain": "technical accuracy.",
          "stage": "both"
        },
        {
          "q": "Anecdote in persuasion…",
          "type": "multi",
          "options": [
            "short personal story as evidence",
            "a graph only",
            "a full novel",
            "a dictionary"
          ],
          "answer": 0,
          "explain": "engaging proof.",
          "stage": "both"
        },
        {
          "q": "Cyclical structure means…",
          "type": "multi",
          "options": [
            "ending echoes the opening",
            "no paragraphs",
            "only questions",
            "random order"
          ],
          "answer": 0,
          "explain": "circular framing.",
          "stage": "both"
        },
        {
          "q": "Best thesis-style opening for argue essay?",
          "type": "multi",
          "options": [
            "clear viewpoint",
            "once upon a time only",
            "dictionary definition always",
            "joke only"
          ],
          "answer": 0,
          "explain": "state your line of argument.",
          "stage": "both"
        },
        {
          "q": "Proofreading priority:",
          "type": "multi",
          "options": [
            "sentence boundaries and agreement",
            "adding 500 words",
            "removing all commas",
            "changing topic"
          ],
          "answer": 0,
          "explain": "AO6 basics.",
          "stage": "both"
        },
        {
          "q": "Counter-argument signal:",
          "type": "multi",
          "options": [
            "Some people argue…",
            "Firstly only",
            "The end",
            "Once upon"
          ],
          "answer": 0,
          "explain": "acknowledge other view.",
          "stage": "both"
        },
        {
          "q": "Semantic field planning helps…",
          "type": "multi",
          "options": [
            "unified imagery/tone",
            "random vocab",
            "AO6 only",
            "margins"
          ],
          "answer": 0,
          "explain": "coherence.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Plan: purpose, audience, form, 4–6 clear sections.",
          "Match register: article ≠ story ≠ letter."
        ],
        "practice": [
          {
            "q": "AO5 rewards…",
            "type": "multi",
            "options": [
              "content, organisation, style",
              "only spelling",
              "only handwriting size",
              "drawing"
            ],
            "answer": 0,
            "explain": "ideas and structure.",
            "stage": "both"
          }
        ]
      }
    }
  },
  "science": {
    "biology": {
      "title": "GCSE Biology Core",
      "blurb": "Cell biology, organisation, infection and bioenergetics (Foundation).",
      "videoKey": "biology",
      "teach": {
        "points": [
          "Eukaryotic vs prokaryotic cells; magnification = image ÷ actual.",
          "Digestive enzymes; heart as double pump (overview).",
          "Photosynthesis limiting factors: light, CO₂, temperature."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Magnification = image size ÷ actual size."
        ]
      },
      "practice": [
        {
          "q": "Bacteria cells are typically…",
          "type": "multi",
          "options": [
            "prokaryotic",
            "eukaryotic plant",
            "always multicellular",
            "without DNA"
          ],
          "answer": 0,
          "explain": "prokaryotic.",
          "stage": "both"
        },
        {
          "q": "Magnification formula?",
          "type": "multi",
          "options": [
            "image ÷ actual",
            "actual ÷ image",
            "image × actual",
            "image + actual"
          ],
          "answer": 0,
          "explain": "I/A.",
          "stage": "both"
        },
        {
          "q": "Protease digests…",
          "type": "multi",
          "options": [
            "protein",
            "lipid only",
            "starch only",
            "DNA only"
          ],
          "answer": 0,
          "explain": "proteins → amino acids.",
          "stage": "both"
        },
        {
          "q": "Limiting factor means…",
          "type": "multi",
          "options": [
            "the factor in shortest supply holding the rate down",
            "any factor",
            "only light ever",
            "temperature only"
          ],
          "answer": 0,
          "explain": "limits rate.",
          "stage": "both"
        },
        {
          "q": "White blood cells can…",
          "type": "multi",
          "options": [
            "engulf pathogens / produce antibodies",
            "photosynthesise",
            "make bone only",
            "carry oxygen only always"
          ],
          "answer": 0,
          "explain": "immune defence.",
          "stage": "both"
        },
        {
          "q": "Stem cells can…",
          "type": "multi",
          "options": [
            "differentiate into other cell types",
            "only make skin forever",
            "never divide",
            "only exist in plants"
          ],
          "answer": 0,
          "explain": "unspecialised → specialised.",
          "stage": "both"
        },
        {
          "q": "Osmosis is water movement…",
          "type": "multi",
          "options": [
            "across partially permeable membrane",
            "of sodium only",
            "only in animals never plants",
            "requiring light"
          ],
          "answer": 0,
          "explain": "water/ppm.",
          "stage": "both"
        },
        {
          "q": "Vaccines contain…",
          "type": "multi",
          "options": [
            "dead/weakened pathogen or antigens",
            "antibiotics only",
            "only sugar",
            "red blood cells only"
          ],
          "answer": 0,
          "explain": "immune prep.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Eukaryotic vs prokaryotic cells; magnification = image ÷ actual.",
          "Digestive enzymes; heart as double pump (overview)."
        ],
        "practice": [
          {
            "q": "Bacteria cells are typically…",
            "type": "multi",
            "options": [
              "prokaryotic",
              "eukaryotic plant",
              "always multicellular",
              "without DNA"
            ],
            "answer": 0,
            "explain": "prokaryotic.",
            "stage": "both"
          }
        ]
      }
    },
    "chemistry": {
      "title": "GCSE Chemistry Core",
      "blurb": "Atomic structure, bonding intro, quantitative chem basics.",
      "videoKey": "chemistry",
      "teach": {
        "points": [
          "Atomic number = protons; mass number = protons + neutrons.",
          "Ionic bonding: metal + non-metal (electron transfer); covalent: shared pairs.",
          "Conservation of mass; simple reacting mass ideas at Foundation."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Na atomic number 11 → 11 protons, electron config 2,8,1"
        ]
      },
      "practice": [
        {
          "q": "Particles with + charge in nucleus?",
          "type": "multi",
          "options": [
            "protons",
            "electrons",
            "neutrons",
            "photons"
          ],
          "answer": 0,
          "explain": "protons.",
          "stage": "both"
        },
        {
          "q": "Neutrons have charge…",
          "type": "multi",
          "options": [
            "0",
            "+1",
            "−1",
            "+2"
          ],
          "answer": 0,
          "explain": "neutral.",
          "stage": "both"
        },
        {
          "q": "Ionic bonding involves…",
          "type": "multi",
          "options": [
            "electron transfer",
            "sharing only always",
            "magnetism only",
            "light"
          ],
          "answer": 0,
          "explain": "transfer.",
          "stage": "both"
        },
        {
          "q": "Group 1 metals…",
          "type": "multi",
          "options": [
            "form 1+ ions",
            "form 1− ions",
            "never react",
            "are noble gases"
          ],
          "answer": 0,
          "explain": "lose one electron.",
          "stage": "both"
        },
        {
          "q": "Chromatography Rf = ?",
          "type": "multi",
          "options": [
            "distance spot ÷ distance solvent",
            "solvent ÷ spot",
            "spot × solvent",
            "spot + solvent"
          ],
          "answer": 0,
          "explain": "spot/solvent front.",
          "stage": "both"
        },
        {
          "q": "Endothermic reactions…",
          "type": "multi",
          "options": [
            "take in energy from surroundings",
            "always explode",
            "make only salts",
            "are freezing only"
          ],
          "answer": 0,
          "explain": "energy in.",
          "stage": "both"
        },
        {
          "q": "Isotopes have same…",
          "type": "multi",
          "options": [
            "protons different neutrons",
            "neutrons different protons",
            "electrons only differ by mass 0",
            "no nucleus"
          ],
          "answer": 0,
          "explain": "same Z different n.",
          "stage": "both"
        },
        {
          "q": "Covalent bonds form between…",
          "type": "multi",
          "options": [
            "non-metals sharing electrons",
            "metals only",
            "metal+non-metal transfer only",
            "noble gases always"
          ],
          "answer": 0,
          "explain": "sharing.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Atomic number = protons; mass number = protons + neutrons.",
          "Ionic bonding: metal + non-metal (electron transfer); covalent: shared pairs."
        ],
        "practice": [
          {
            "q": "Particles with + charge in nucleus?",
            "type": "multi",
            "options": [
              "protons",
              "electrons",
              "neutrons",
              "photons"
            ],
            "answer": 0,
            "explain": "protons.",
            "stage": "both"
          }
        ]
      }
    },
    "physics": {
      "title": "GCSE Physics Core",
      "blurb": "Energy, electricity, particles and forces (Foundation).",
      "videoKey": "physics",
      "teach": {
        "points": [
          "Efficiency = useful output ÷ total input (×100 for %).",
          "V = IR; series and parallel rules at Foundation level.",
          "Specific heat capacity: E = m c Δθ (intro)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Efficiency 0.25 means 25% useful."
        ]
      },
      "practice": [
        {
          "q": "Efficiency if useful 50 J from 200 J input?",
          "type": "typed",
          "answer": "0.25",
          "explain": "50/200=0.25 (or 25%).",
          "accept": [
            "0.25",
            "25%",
            "25"
          ],
          "stage": "both"
        },
        {
          "q": "V = IR means…",
          "type": "multi",
          "options": [
            "voltage = current × resistance",
            "volume = current × radius",
            "velocity = mass × g",
            "power = I only"
          ],
          "answer": 0,
          "explain": "Ohm's law form.",
          "stage": "both"
        },
        {
          "q": "Unit of resistance?",
          "type": "multi",
          "options": [
            "ohm (Ω)",
            "volt",
            "amp",
            "watt"
          ],
          "answer": 0,
          "explain": "ohm.",
          "stage": "both"
        },
        {
          "q": "In parallel, PD across branches is…",
          "type": "multi",
          "options": [
            "the same",
            "always zero",
            "split by resistance only in series sense",
            "infinite"
          ],
          "answer": 0,
          "explain": "same PD.",
          "stage": "both"
        },
        {
          "q": "National Grid uses high voltage to…",
          "type": "multi",
          "options": [
            "reduce energy loss in transmission",
            "increase resistance of air",
            "make sparks only",
            "charge phones"
          ],
          "answer": 0,
          "explain": "lower current → less heating loss.",
          "stage": "both"
        },
        {
          "q": "Scalar quantity example?",
          "type": "multi",
          "options": [
            "speed",
            "velocity",
            "force",
            "acceleration"
          ],
          "answer": 0,
          "explain": "speed has magnitude only.",
          "stage": "both"
        },
        {
          "q": "Power = ?",
          "type": "multi",
          "options": [
            "energy ÷ time",
            "force ÷ area",
            "mass × g only",
            "V only"
          ],
          "answer": 0,
          "explain": "P=E/t.",
          "stage": "both"
        },
        {
          "q": "I if V=12 and R=4?",
          "type": "typed",
          "answer": "3",
          "explain": "I=V/R=3 A.",
          "accept": [
            "3",
            "3A",
            "3 A"
          ],
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Efficiency = useful output ÷ total input (×100 for %).",
          "V = IR; series and parallel rules at Foundation level."
        ],
        "practice": [
          {
            "q": "Efficiency if useful 50 J from 200 J input?",
            "type": "typed",
            "answer": "0.25",
            "explain": "50/200=0.25 (or 25%).",
            "accept": [
              "0.25",
              "25%",
              "25"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "method": {
      "title": "GCSE WS Core",
      "blurb": "Required practical skills and data handling (Foundation).",
      "videoKey": "method",
      "teach": {
        "points": [
          "Identify variables, hazards, risks and control measures.",
          "Process data: mean, range; plot and draw lines of best fit.",
          "Evaluate methods: accuracy, precision, repeatability, reproducibility."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Precision = close together; accuracy = close to true value."
        ]
      },
      "practice": [
        {
          "q": "Repeatable means…",
          "type": "multi",
          "options": [
            "same person/method similar results",
            "different teams always identical",
            "never wrong",
            "no units"
          ],
          "answer": 0,
          "explain": "same experimenter/method.",
          "stage": "both"
        },
        {
          "q": "Line of best fit…",
          "type": "multi",
          "options": [
            "shows the trend, not necessarily through all points",
            "must hit every point",
            "is always horizontal",
            "is the y-axis"
          ],
          "answer": 0,
          "explain": "trend line.",
          "stage": "both"
        },
        {
          "q": "Hazard vs risk:",
          "type": "multi",
          "options": [
            "hazard = potential source of harm; risk = chance/severity",
            "identical",
            "risk is the chemical name",
            "hazard is only fire"
          ],
          "answer": 0,
          "explain": "definitions.",
          "stage": "both"
        },
        {
          "q": "Categoric data example?",
          "type": "multi",
          "options": [
            "eye colour",
            "temperature in °C continuous",
            "time in seconds",
            "length in m"
          ],
          "answer": 0,
          "explain": "categories.",
          "stage": "both"
        },
        {
          "q": "Zero error means…",
          "type": "multi",
          "options": [
            "instrument doesn't read zero when it should",
            "answer is zero",
            "no anomalies",
            "perfect accuracy"
          ],
          "answer": 0,
          "explain": "calibration issue.",
          "stage": "both"
        },
        {
          "q": "Peer review helps…",
          "type": "multi",
          "options": [
            "check validity of scientific claims",
            "bake cakes",
            "set school bells",
            "print money"
          ],
          "answer": 0,
          "explain": "quality check.",
          "stage": "both"
        },
        {
          "q": "Independent variable on graph usually…",
          "type": "multi",
          "options": [
            "x-axis",
            "y-axis always",
            "title only",
            "units only"
          ],
          "answer": 0,
          "explain": "x-axis.",
          "stage": "both"
        },
        {
          "q": "Precision high means…",
          "type": "multi",
          "options": [
            "results clustered closely",
            "close to true value only",
            "random",
            "no units"
          ],
          "answer": 0,
          "explain": "cluster.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Identify variables, hazards, risks and control measures.",
          "Process data: mean, range; plot and draw lines of best fit."
        ],
        "practice": [
          {
            "q": "Repeatable means…",
            "type": "multi",
            "options": [
              "same person/method similar results",
              "different teams always identical",
              "never wrong",
              "no units"
            ],
            "answer": 0,
            "explain": "same experimenter/method.",
            "stage": "both"
          }
        ]
      }
    }
  }
};
