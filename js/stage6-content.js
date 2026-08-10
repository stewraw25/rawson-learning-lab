/**
 * Stage 6 A* Mastery
 */

const TEACH_MODULES_STAGE6 = {
  "maths": {
    "number": {
      "title": "A* Number mastery",
      "blurb": "Exact surd form, multi-step bounds and index/surd synthesis.",
      "videoKey": "placevalue",
      "teach": {
        "points": [
          "Combine index laws with surds in multi-step exact answers.",
          "Bounds in formulae: decide whether to use UB or LB for max/min.",
          "Recurring decimals to fractions with algebraic proof style."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Max of a/b uses UB_a / LB_b (positive values)."
        ]
      },
      "practice": [
        {
          "q": "For maximum of a÷b (a,b>0) use…",
          "type": "multi",
          "options": [
            "UB_a ÷ LB_b",
            "LB_a ÷ UB_b",
            "UB_a ÷ UB_b",
            "LB_a ÷ LB_b"
          ],
          "answer": 0,
          "explain": "big÷small.",
          "stage": "both"
        },
        {
          "q": "Expand and simplify (√12 + √3)²",
          "type": "multi",
          "options": [
            "27",
            "15",
            "12",
            "9"
          ],
          "answer": 0,
          "explain": "(√12+√3)² = 12 + 2√36 + 3 = 15 + 12 = 27.",
          "stage": "both"
        },
        {
          "q": "To rationalise 3/(2−√2), multiply numerator and denominator by…",
          "type": "multi",
          "options": [
            "2+√2",
            "2−√2",
            "√2",
            "2"
          ],
          "answer": 0,
          "explain": "Multiply by the conjugate 2+√2.",
          "stage": "both"
        },
        {
          "q": "0.1̇2̇ (0.121212…) as fraction?",
          "type": "multi",
          "options": [
            "12/99 = 4/33",
            "12/100",
            "1/12",
            "12/9"
          ],
          "answer": 0,
          "explain": "let x=0.1212… 100x−x=12 → 99x=12.",
          "stage": "both"
        },
        {
          "q": "√8 + √2 simplified?",
          "type": "multi",
          "options": [
            "3√2",
            "2√2",
            "√10",
            "4√2"
          ],
          "answer": 0,
          "explain": "2√2+√2=3√2.",
          "stage": "both"
        },
        {
          "q": "If n=3.5×10⁴ to 2 s.f., upper bound?",
          "type": "multi",
          "options": [
            "3.55×10⁴",
            "3.5×10⁴",
            "4×10⁴",
            "3.45×10⁴"
          ],
          "answer": 0,
          "explain": "halfway to 3.6×10⁴.",
          "stage": "both"
        },
        {
          "q": "Min of a×b (a,b>0) uses…",
          "type": "multi",
          "options": [
            "LB_a × LB_b",
            "UB_a × UB_b",
            "UB_a × LB_b",
            "LB_a × UB_b"
          ],
          "answer": 0,
          "explain": "small×small.",
          "stage": "both"
        },
        {
          "q": "√18 + √8 = ?",
          "type": "multi",
          "options": [
            "5√2",
            "√26",
            "3√2",
            "4√2"
          ],
          "answer": 0,
          "explain": "3√2+2√2=5√2.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Combine index laws with surds in multi-step exact answers.",
          "Bounds in formulae: decide whether to use UB or LB for max/min."
        ],
        "practice": [
          {
            "q": "For maximum of a÷b (a,b>0) use…",
            "type": "multi",
            "options": [
              "UB_a ÷ LB_b",
              "LB_a ÷ UB_b",
              "UB_a ÷ UB_b",
              "LB_a ÷ LB_b"
            ],
            "answer": 0,
            "explain": "big÷small.",
            "stage": "both"
          }
        ]
      }
    },
    "operations": {
      "title": "A* problem solving",
      "blurb": "Multi-topic synthesis and exam-style chains of reasoning.",
      "videoKey": "multiply",
      "teach": {
        "points": [
          "Break hard problems into labelled steps; track units.",
          "Check reasonableness with estimation and inverse operations.",
          "Present algebraic reasoning, not only calculator output."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Underline ask; list knowns; choose model; compute; check."
        ]
      },
      "practice": [
        {
          "q": "First step in multi-mark modelling often is…",
          "type": "multi",
          "options": [
            "define variables / draw diagram",
            "guess answer",
            "skip units",
            "round mid-way heavily"
          ],
          "answer": 0,
          "explain": "structure.",
          "stage": "both"
        },
        {
          "q": "Average speed whole journey: 60 km at 30 km/h then 60 km at 60 km/h. Overall?",
          "type": "typed",
          "answer": "40",
          "explain": "Time 2h+1h=3h; 120/3=40.",
          "accept": [
            "40",
            "40 km/h"
          ],
          "stage": "both"
        },
        {
          "q": "Exact answers preferred when paper says…",
          "type": "multi",
          "options": [
            "leave in terms of π / surd form",
            "always decimal",
            "always 3 s.f. only",
            "no units"
          ],
          "answer": 0,
          "explain": "exact form.",
          "stage": "both"
        },
        {
          "q": "A sense-check for area of a field ~100m by 50m?",
          "type": "multi",
          "options": [
            "~5000 m²",
            "5 m²",
            "5×10⁶ m²",
            "0.5 m²"
          ],
          "answer": 0,
          "explain": "order of magnitude.",
          "stage": "both"
        },
        {
          "q": "Dimensional consistency means…",
          "type": "multi",
          "options": [
            "units match across equation terms",
            "only integers",
            "no algebra",
            "graphs only"
          ],
          "answer": 0,
          "explain": "units check.",
          "stage": "both"
        },
        {
          "q": "When stuck on a 6-mark Q…",
          "type": "multi",
          "options": [
            "write partial steps for method marks",
            "leave blank only",
            "only final number",
            "scribble out working"
          ],
          "answer": 0,
          "explain": "method marks.",
          "stage": "both"
        },
        {
          "q": "Average speed ≠ mean of speeds when…",
          "type": "multi",
          "options": [
            "different times for legs",
            "always equal",
            "units match",
            "distance zero"
          ],
          "answer": 0,
          "explain": "use total dist/time.",
          "stage": "both"
        },
        {
          "q": "Method marks reward…",
          "type": "multi",
          "options": [
            "clear correct process",
            "final answer only",
            "rubbing out all working",
            "guessing"
          ],
          "answer": 0,
          "explain": "process.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Break hard problems into labelled steps; track units.",
          "Check reasonableness with estimation and inverse operations."
        ],
        "practice": [
          {
            "q": "First step in multi-mark modelling often is…",
            "type": "multi",
            "options": [
              "define variables / draw diagram",
              "guess answer",
              "skip units",
              "round mid-way heavily"
            ],
            "answer": 0,
            "explain": "structure.",
            "stage": "both"
          }
        ]
      }
    },
    "fractions": {
      "title": "A* proportion mastery",
      "blurb": "Algebraic ratio, exponential models and rates of change.",
      "videoKey": "percentages",
      "teach": {
        "points": [
          "Set up proportion equations; solve for unknowns rigorously.",
          "Interpret growth factor vs growth rate carefully.",
          "Rates: related changes (e.g. similar shapes — area scale k², volume k³)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Lengths ×k → areas ×k² → volumes ×k³"
        ]
      },
      "practice": [
        {
          "q": "Similar shapes scale factor 3: area factor?",
          "type": "multi",
          "options": [
            "9",
            "3",
            "6",
            "27"
          ],
          "answer": 0,
          "explain": "k²=9.",
          "stage": "both"
        },
        {
          "q": "Volume scale factor if length ×2?",
          "type": "multi",
          "options": [
            "8",
            "2",
            "4",
            "16"
          ],
          "answer": 0,
          "explain": "2³=8.",
          "stage": "both"
        },
        {
          "q": "Population multiplies by 1.02 per year for 3 years from 1000. After 3 years?",
          "type": "typed",
          "answer": "1061.208",
          "explain": "1000×1.02³.",
          "accept": [
            "1061.208",
            "1061.21",
            "1061"
          ],
          "stage": "both"
        },
        {
          "q": "If y ∝ x³ and x ×1.5, y multiplies by…",
          "type": "multi",
          "options": [
            "3.375",
            "1.5",
            "2.25",
            "4.5"
          ],
          "answer": 0,
          "explain": "1.5³=3.375.",
          "stage": "both"
        },
        {
          "q": "Mixture problems often use…",
          "type": "multi",
          "options": [
            "weighted ratios / parts",
            "only Pythagoras",
            "circle theorems",
            "vectors only"
          ],
          "answer": 0,
          "explain": "ratio parts.",
          "stage": "both"
        },
        {
          "q": "Inverse square ideas (Higher science link) mean intensity ∝…",
          "type": "multi",
          "options": [
            "1/r²",
            "r²",
            "r",
            "1/r"
          ],
          "answer": 0,
          "explain": "inverse square.",
          "stage": "both"
        },
        {
          "q": "Length ×3 → volume ×?",
          "type": "multi",
          "options": [
            "27",
            "9",
            "3",
            "6"
          ],
          "answer": 0,
          "explain": "k³.",
          "stage": "both"
        },
        {
          "q": "Area scale factor 16 → length scale?",
          "type": "multi",
          "options": [
            "4",
            "16",
            "8",
            "2"
          ],
          "answer": 0,
          "explain": "√16=4.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Set up proportion equations; solve for unknowns rigorously.",
          "Interpret growth factor vs growth rate carefully."
        ],
        "practice": [
          {
            "q": "Similar shapes scale factor 3: area factor?",
            "type": "multi",
            "options": [
              "9",
              "3",
              "6",
              "27"
            ],
            "answer": 0,
            "explain": "k²=9.",
            "stage": "both"
          }
        ]
      }
    },
    "algebra": {
      "title": "A* algebra mastery",
      "blurb": "Quadratics, functions, iteration and algebraic proof style.",
      "videoKey": "algebra",
      "teach": {
        "points": [
          "Discriminant b²−4ac: >0 two roots, =0 one, <0 none (reals).",
          "Functions: composite fg(x)=f(g(x)); inverse undoes f.",
          "Algebraic proof: clear chain from given to result."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "b²−4ac for x²+4x+4=0 is 0 → repeated root"
        ]
      },
      "practice": [
        {
          "q": "Discriminant of x²+4x+4?",
          "type": "multi",
          "options": [
            "0",
            "4",
            "16",
            "−4"
          ],
          "answer": 0,
          "explain": "16−16=0.",
          "stage": "both"
        },
        {
          "q": "If f(x)=2x+1, inverse f⁻¹(x)=?",
          "type": "multi",
          "options": [
            "(x−1)/2",
            "2x−1",
            "x/2+1",
            "1−2x"
          ],
          "answer": 0,
          "explain": "swap and solve.",
          "stage": "both"
        },
        {
          "q": "fg means…",
          "type": "multi",
          "options": [
            "do g first then f",
            "do f first then g always",
            "multiply f×g only",
            "gradient"
          ],
          "answer": 0,
          "explain": "right to left.",
          "stage": "both"
        },
        {
          "q": "Completing square x²+6x+5 = ?",
          "type": "multi",
          "options": [
            "(x+3)²−4",
            "(x+3)²+4",
            "(x+6)²−5",
            "(x+5)²"
          ],
          "answer": 0,
          "explain": "(x+3)²−9+5=(x+3)²−4.",
          "stage": "both"
        },
        {
          "q": "Proof that sum of two odds is even uses…",
          "type": "multi",
          "options": [
            "2k+1 forms",
            "only numbers 1 and 2",
            "graphs",
            "trigonometry"
          ],
          "answer": 0,
          "explain": "parity algebra.",
          "stage": "both"
        },
        {
          "q": "Asymptote of y=1/x is…",
          "type": "multi",
          "options": [
            "axes (x=0,y=0)",
            "y=x",
            "y=1",
            "x=1 only"
          ],
          "answer": 0,
          "explain": "approaches axes.",
          "stage": "both"
        },
        {
          "q": "Discriminant <0 means…",
          "type": "multi",
          "options": [
            "no real roots",
            "two real roots",
            "one real root",
            "infinite roots"
          ],
          "answer": 0,
          "explain": "no reals.",
          "stage": "both"
        },
        {
          "q": "f⁻¹ undoes f so f(f⁻¹(x)) = ?",
          "type": "multi",
          "options": [
            "x",
            "0",
            "1",
            "f(x)"
          ],
          "answer": 0,
          "explain": "identity.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Discriminant b²−4ac: >0 two roots, =0 one, <0 none (reals).",
          "Functions: composite fg(x)=f(g(x)); inverse undoes f."
        ],
        "practice": [
          {
            "q": "Discriminant of x²+4x+4?",
            "type": "multi",
            "options": [
              "0",
              "4",
              "16",
              "−4"
            ],
            "answer": 0,
            "explain": "16−16=0.",
            "stage": "both"
          }
        ]
      }
    },
    "geometry": {
      "title": "A* geometry & trig",
      "blurb": "3D Pythagoras/trig, circle theorems chains, vectors proof style.",
      "videoKey": "angles",
      "teach": {
        "points": [
          "3D: find space diagonals; use right triangles in planes.",
          "Chain circle theorems with reasons for full marks.",
          "Vector geometry: show collinear / parallelogram with vector algebra."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Space diagonal of cuboid √(l²+w²+h²)"
        ]
      },
      "practice": [
        {
          "q": "Space diagonal of 2×3×6 cuboid?",
          "type": "typed",
          "answer": "7",
          "explain": "√(4+9+36)=√49=7.",
          "accept": [
            "7"
          ],
          "stage": "both"
        },
        {
          "q": "Opposite angles in a cyclic quadrilateral…",
          "type": "multi",
          "options": [
            "sum to 180°",
            "are equal",
            "sum to 90°",
            "are 60°"
          ],
          "answer": 0,
          "explain": "cyclic quad theorem.",
          "stage": "both"
        },
        {
          "q": "Tangent-radius theorem: angle is…",
          "type": "multi",
          "options": [
            "90°",
            "45°",
            "180°",
            "0°"
          ],
          "answer": 0,
          "explain": "tangent ⊥ radius.",
          "stage": "both"
        },
        {
          "q": "To prove parallelogram with vectors, show…",
          "type": "multi",
          "options": [
            "AB=DC (or diagonals bisect)",
            "angles 90 only",
            "sides equal to 1",
            "area 0"
          ],
          "answer": 0,
          "explain": "vector equality.",
          "stage": "both"
        },
        {
          "q": "Exact cos 60°?",
          "type": "multi",
          "options": [
            "1/2",
            "√3/2",
            "0",
            "1"
          ],
          "answer": 0,
          "explain": "1/2.",
          "stage": "both"
        },
        {
          "q": "Bearing of return journey differs by…",
          "type": "multi",
          "options": [
            "180° (adjust into 000–360)",
            "90 always",
            "0 always",
            "45 always"
          ],
          "answer": 0,
          "explain": "reverse bearing.",
          "stage": "both"
        },
        {
          "q": "Cuboid 1×2×2 space diagonal?",
          "type": "typed",
          "answer": "3",
          "explain": "√(1+4+4)=3.",
          "accept": [
            "3"
          ],
          "stage": "both"
        },
        {
          "q": "Tangent ⊥ radius reason code often…",
          "type": "multi",
          "options": [
            "tangent-radius theorem",
            "SSS",
            "only alternate segment without statement",
            "Pythagoras only"
          ],
          "answer": 0,
          "explain": "state theorem.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "3D: find space diagonals; use right triangles in planes.",
          "Chain circle theorems with reasons for full marks."
        ],
        "practice": [
          {
            "q": "Space diagonal of 2×3×6 cuboid?",
            "type": "typed",
            "answer": "7",
            "explain": "√(4+9+36)=√49=7.",
            "accept": [
              "7"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "data": {
      "title": "A* stats & probability",
      "blurb": "Conditional probability, histograms area, interpreting critically.",
      "videoKey": "averages",
      "teach": {
        "points": [
          "P(A|B)=P(A∩B)/P(B); use trees carefully with dependence.",
          "Histogram area ∝ frequency; compare distributions with IQR/median.",
          "Critique sampling methods and misleading graphs."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Dependent tree: second branch probabilities change."
        ]
      },
      "practice": [
        {
          "q": "P(A|B) = ?",
          "type": "multi",
          "options": [
            "P(A∩B)/P(B)",
            "P(A)+P(B)",
            "P(A)P(B) always",
            "1−P(A)"
          ],
          "answer": 0,
          "explain": "conditional definition.",
          "stage": "both"
        },
        {
          "q": "In a histogram, frequency is proportional to…",
          "type": "multi",
          "options": [
            "area of bar",
            "height only always",
            "width only",
            "colour"
          ],
          "answer": 0,
          "explain": "area.",
          "stage": "both"
        },
        {
          "q": "Skewed right distribution: mean is often…",
          "type": "multi",
          "options": [
            "greater than median",
            "less than median",
            "equal always",
            "zero"
          ],
          "answer": 0,
          "explain": "pull of tail.",
          "stage": "both"
        },
        {
          "q": "Misleading graph trick:",
          "type": "multi",
          "options": [
            "truncated y-axis",
            "label axes clearly",
            "use equal widths",
            "show source"
          ],
          "answer": 0,
          "explain": "truncation exaggerates.",
          "stage": "both"
        },
        {
          "q": "Expected frequency = ?",
          "type": "multi",
          "options": [
            "n × p",
            "n + p",
            "n / p",
            "p only"
          ],
          "answer": 0,
          "explain": "np.",
          "stage": "both"
        },
        {
          "q": "Two-way tables help with…",
          "type": "multi",
          "options": [
            "'and'/'or'/'given' probability",
            "only means",
            "circle theorems",
            "surds"
          ],
          "answer": 0,
          "explain": "categorical probability.",
          "stage": "both"
        },
        {
          "q": "P(A∪B)= P(A)+P(B)−?",
          "type": "multi",
          "options": [
            "P(A∩B)",
            "P(A)P(B)",
            "1",
            "0"
          ],
          "answer": 0,
          "explain": "inclusion.",
          "stage": "both"
        },
        {
          "q": "Histogram area total equals…",
          "type": "multi",
          "options": [
            "total frequency",
            "1 always",
            "mean",
            "IQR"
          ],
          "answer": 0,
          "explain": "Σf.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "P(A|B)=P(A∩B)/P(B); use trees carefully with dependence.",
          "Histogram area ∝ frequency; compare distributions with IQR/median."
        ],
        "practice": [
          {
            "q": "P(A|B) = ?",
            "type": "multi",
            "options": [
              "P(A∩B)/P(B)",
              "P(A)+P(B)",
              "P(A)P(B) always",
              "1−P(A)"
            ],
            "answer": 0,
            "explain": "conditional definition.",
            "stage": "both"
          }
        ]
      }
    }
  },
  "english": {
    "grammar": {
      "title": "A* technical accuracy",
      "blurb": "Near-flawless AO6 with ambitious structures.",
      "videoKey": "grammar",
      "teach": {
        "points": [
          "Ambition + accuracy: complex structures must still be controlled.",
          "Avoid comma splices and tense drift entirely under time pressure.",
          "Use sentence variety purposefully, not randomly."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "One flawless complex sentence beats three broken ambitious ones."
        ]
      },
      "practice": [
        {
          "q": "Top-band AO6 prioritises…",
          "type": "multi",
          "options": [
            "accuracy with range",
            "range without accuracy",
            "only short sentences",
            "no punctuation"
          ],
          "answer": 0,
          "explain": "control.",
          "stage": "both"
        },
        {
          "q": "Highest-risk structure if uncontrolled:",
          "type": "multi",
          "options": [
            "multi-clause sentences with weak commas",
            "simple SV sentences",
            "full stops",
            "capital I"
          ],
          "answer": 0,
          "explain": "ambition without control.",
          "stage": "both"
        },
        {
          "q": "Pronoun reference must be…",
          "type": "multi",
          "options": [
            "unambiguous",
            "as vague as possible",
            "avoided always",
            "only 'it'"
          ],
          "answer": 0,
          "explain": "clarity.",
          "stage": "both"
        },
        {
          "q": "In narratives, tense shifts…",
          "type": "multi",
          "options": [
            "must be deliberate and signalled",
            "can be random",
            "are banned forever",
            "only use future"
          ],
          "answer": 0,
          "explain": "control time.",
          "stage": "both"
        },
        {
          "q": "Ellipsis of words in advanced style…",
          "type": "multi",
          "options": [
            "can work if meaning remains clear",
            "always fails",
            "replaces verbs always",
            "is AO1 only"
          ],
          "answer": 0,
          "explain": "clarity first.",
          "stage": "both"
        },
        {
          "q": "Final proofread should hunt…",
          "type": "multi",
          "options": [
            "agreement, demarcation, homophones",
            "only adjectives to add",
            "new plot",
            "longer words only"
          ],
          "answer": 0,
          "explain": "AO6 errors.",
          "stage": "both"
        },
        {
          "q": "A* control means…",
          "type": "multi",
          "options": [
            "ambition without error clusters",
            "longest sentences always",
            "no variety",
            "only fragments"
          ],
          "answer": 0,
          "explain": "control.",
          "stage": "both"
        },
        {
          "q": "Homophone trap:",
          "type": "multi",
          "options": [
            "their/there/they're",
            "run/ran",
            "cat/cats",
            "big/bigger"
          ],
          "answer": 0,
          "explain": "common AO6.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Ambition + accuracy: complex structures must still be controlled.",
          "Avoid comma splices and tense drift entirely under time pressure."
        ],
        "practice": [
          {
            "q": "Top-band AO6 prioritises…",
            "type": "multi",
            "options": [
              "accuracy with range",
              "range without accuracy",
              "only short sentences",
              "no punctuation"
            ],
            "answer": 0,
            "explain": "control.",
            "stage": "both"
          }
        ]
      }
    },
    "punctuation": {
      "title": "A* punctuation control",
      "blurb": "Full repertoire used with precision for meaning and effect.",
      "videoKey": "punctuation",
      "teach": {
        "points": [
          "Punctuation shapes meaning and rhythm — not decoration.",
          "Use sparse, powerful marks rather than scattergun symbols.",
          "Speech and parentheticals must remain grammatically integrated."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "A single well-placed colon can replace a clunky sentence."
        ]
      },
      "practice": [
        {
          "q": "A* colon use often…",
          "type": "multi",
          "options": [
            "introduces a precise amplification",
            "appears randomly",
            "replaces spaces",
            "ends questions"
          ],
          "answer": 0,
          "explain": "amplify.",
          "stage": "both"
        },
        {
          "q": "Semi-colons at A* link…",
          "type": "multi",
          "options": [
            "closely related independent clauses",
            "any words",
            "titles only",
            "paragraphs only"
          ],
          "answer": 0,
          "explain": "related clauses.",
          "stage": "both"
        },
        {
          "q": "Overusing dashes…",
          "type": "multi",
          "options": [
            "dilutes impact",
            "always raises AO6",
            "replaces planning",
            "is required"
          ],
          "answer": 0,
          "explain": "less is more.",
          "stage": "both"
        },
        {
          "q": "In dialogue, interruption may use…",
          "type": "multi",
          "options": [
            "dash/ellipsis appropriately",
            "only full stops mid-word always",
            "no marks",
            "semicolons only"
          ],
          "answer": 0,
          "explain": "interruptions.",
          "stage": "both"
        },
        {
          "q": "Parenthetical commas must…",
          "type": "multi",
          "options": [
            "pair correctly",
            "appear once only ever",
            "replace verbs",
            "end the text"
          ],
          "answer": 0,
          "explain": "pairing.",
          "stage": "both"
        },
        {
          "q": "Meaning change: 'Let's eat, Grandma' vs without comma shows…",
          "type": "multi",
          "options": [
            "punctuation alters meaning",
            "identical meaning",
            "only spelling matters",
            "AO2 only"
          ],
          "answer": 0,
          "explain": "comma clarity.",
          "stage": "both"
        },
        {
          "q": "Meaning-critical comma example is famous for…",
          "type": "multi",
          "options": [
            "Let's eat, Grandma",
            "only maths",
            "only science",
            "page numbers"
          ],
          "answer": 0,
          "explain": "clarity.",
          "stage": "both"
        },
        {
          "q": "A* punctuation is…",
          "type": "multi",
          "options": [
            "purposeful and accurate",
            "maximum symbols",
            "none",
            "random"
          ],
          "answer": 0,
          "explain": "purpose.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Punctuation shapes meaning and rhythm — not decoration.",
          "Use sparse, powerful marks rather than scattergun symbols."
        ],
        "practice": [
          {
            "q": "A* colon use often…",
            "type": "multi",
            "options": [
              "introduces a precise amplification",
              "appears randomly",
              "replaces spaces",
              "ends questions"
            ],
            "answer": 0,
            "explain": "amplify.",
            "stage": "both"
          }
        ]
      }
    },
    "vocabulary": {
      "title": "A* lexical precision",
      "blurb": "Original, precise vocabulary and critical metalanguage.",
      "videoKey": "reading",
      "teach": {
        "points": [
          "Prefer the exact word over the longest word.",
          "Critical vocabulary: ambivalence, incongruity, subverts, idealises…",
          "In creative writing, fresh imagery beats cliché piles."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Subverts expectations > 'is surprising and stuff'."
        ]
      },
      "practice": [
        {
          "q": "Best critical verb for undercutting a message:",
          "type": "multi",
          "options": [
            "subverts",
            "says",
            "does",
            "has"
          ],
          "answer": 0,
          "explain": "subverts.",
          "stage": "both"
        },
        {
          "q": "Cliché weakness:",
          "type": "multi",
          "options": [
            "predictable imagery lowers impact",
            "always gains AO2",
            "required in articles",
            "replaces structure"
          ],
          "answer": 0,
          "explain": "freshness.",
          "stage": "both"
        },
        {
          "q": "Ambivalence means…",
          "type": "multi",
          "options": [
            "mixed/conflicting feelings",
            "certainty",
            "silence",
            "rhyme"
          ],
          "answer": 0,
          "explain": "mixed feelings.",
          "stage": "both"
        },
        {
          "q": "Semantic juxtaposition can…",
          "type": "multi",
          "options": [
            "create tension between word groups",
            "only decorate",
            "fix spelling",
            "set line spacing"
          ],
          "answer": 0,
          "explain": "tension.",
          "stage": "both"
        },
        {
          "q": "Register mismatch example:",
          "type": "multi",
          "options": [
            "slang in a formal complaint letter",
            "formal tone in formal letter",
            "clear thesis",
            "discourse markers"
          ],
          "answer": 0,
          "explain": "mismatch.",
          "stage": "both"
        },
        {
          "q": "A* vocabulary in analysis is…",
          "type": "multi",
          "options": [
            "precise and text-tied",
            "rare words unused in context",
            "repeated 'shows' only",
            "Latin only"
          ],
          "answer": 0,
          "explain": "precision.",
          "stage": "both"
        },
        {
          "q": "Prefer…",
          "type": "multi",
          "options": [
            "exact ordinary word over wrong fancy word",
            "longest word always",
            "slang in formal analysis",
            "repeating 'bad'"
          ],
          "answer": 0,
          "explain": "precision.",
          "stage": "both"
        },
        {
          "q": "'Incongruity' helps discuss…",
          "type": "multi",
          "options": [
            "mismatch for effect",
            "only rhyme",
            "only plot dates",
            "handwriting"
          ],
          "answer": 0,
          "explain": "mismatch.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Prefer the exact word over the longest word.",
          "Critical vocabulary: ambivalence, incongruity, subverts, idealises…"
        ],
        "practice": [
          {
            "q": "Best critical verb for undercutting a message:",
            "type": "multi",
            "options": [
              "subverts",
              "says",
              "does",
              "has"
            ],
            "answer": 0,
            "explain": "subverts.",
            "stage": "both"
          }
        ]
      }
    },
    "reading": {
      "title": "A* critical reading",
      "blurb": "Conceptualised, evaluative, comparative responses.",
      "videoKey": "reading",
      "teach": {
        "points": [
          "Conceptualise: a big idea that unifies your analysis.",
          "Evaluate alternative interpretations where fruitful.",
          "Comparison is interwoven, not bolted on at the end only."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Thesis concept → methods → effects → evaluation → link texts."
        ]
      },
      "practice": [
        {
          "q": "Conceptualised response offers…",
          "type": "multi",
          "options": [
            "an overarching critical idea",
            "only feature spotting",
            "plot retell only",
            "biography only"
          ],
          "answer": 0,
          "explain": "big idea.",
          "stage": "both"
        },
        {
          "q": "Alternative interpretation should be…",
          "type": "multi",
          "options": [
            "plausible and text-based",
            "random contradiction",
            "off-text gossip",
            "ignored always"
          ],
          "answer": 0,
          "explain": "text-based.",
          "stage": "both"
        },
        {
          "q": "Interwoven comparison…",
          "type": "multi",
          "options": [
            "moves between texts throughout",
            "describes text A fully then B only",
            "avoids connectives",
            "lists quotes"
          ],
          "answer": 0,
          "explain": "integrated.",
          "stage": "both"
        },
        {
          "q": "Context (if relevant) should…",
          "type": "multi",
          "options": [
            "illuminate meaning, not dominate",
            "replace quotes",
            "be a full history essay",
            "be invented"
          ],
          "answer": 0,
          "explain": "illuminate.",
          "stage": "both"
        },
        {
          "q": "Evaluating structure at A* includes…",
          "type": "multi",
          "options": [
            "why shifts occur for purpose",
            "only naming 'paragraph'",
            "counting lines only",
            "ignoring ending"
          ],
          "answer": 0,
          "explain": "purpose of shifts.",
          "stage": "both"
        },
        {
          "q": "Critical conclusion…",
          "type": "multi",
          "options": [
            "returns to thesis with insight",
            "repeats introduction word-for-word only",
            "stops mid-idea",
            "lists techniques only"
          ],
          "answer": 0,
          "explain": "insightful return.",
          "stage": "both"
        },
        {
          "q": "Conceptualised thesis is…",
          "type": "multi",
          "options": [
            "unifying critical argument",
            "feature list only",
            "story retell",
            "quote dump"
          ],
          "answer": 0,
          "explain": "argument.",
          "stage": "both"
        },
        {
          "q": "Alternative reading should be…",
          "type": "multi",
          "options": [
            "text-supported",
            "contradict for fun only",
            "biographical gossip",
            "off-topic"
          ],
          "answer": 0,
          "explain": "supported.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Conceptualise: a big idea that unifies your analysis.",
          "Evaluate alternative interpretations where fruitful."
        ],
        "practice": [
          {
            "q": "Conceptualised response offers…",
            "type": "multi",
            "options": [
              "an overarching critical idea",
              "only feature spotting",
              "plot retell only",
              "biography only"
            ],
            "answer": 0,
            "explain": "big idea.",
            "stage": "both"
          }
        ]
      }
    },
    "writing": {
      "title": "A* writing craft",
      "blurb": "Compelling voice, engineered structure, flawless control.",
      "videoKey": "writing",
      "teach": {
        "points": [
          "Engineer openings and endings for resonance.",
          "Every paragraph earns its place — cut decoration that doesn't serve purpose.",
          "Voice is consistent: persona, viewpoint, and tone held under pressure."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Design a structural 'spine' before drafting sentences."
        ]
      },
      "practice": [
        {
          "q": "A* creative control often uses…",
          "type": "multi",
          "options": [
            "motif + structural echo",
            "random events only",
            "no planning",
            "only dialogue forever"
          ],
          "answer": 0,
          "explain": "patterning.",
          "stage": "both"
        },
        {
          "q": "Transactional A* argument…",
          "type": "multi",
          "options": [
            "anticipates objections",
            "never states a view",
            "uses only insults",
            "has no paragraphs"
          ],
          "answer": 0,
          "explain": "rebuttal skill.",
          "stage": "both"
        },
        {
          "q": "Selective detail means…",
          "type": "multi",
          "options": [
            "choose images that serve theme",
            "describe everything equally",
            "avoid imagery",
            "list adjectives only"
          ],
          "answer": 0,
          "explain": "purpose-driven detail.",
          "stage": "both"
        },
        {
          "q": "Pacing a climax…",
          "type": "multi",
          "options": [
            "shorten sentences / heighten sensory focus",
            "add a dictionary definition",
            "remove verbs",
            "switch to passive only always"
          ],
          "answer": 0,
          "explain": "syntax for pace.",
          "stage": "both"
        },
        {
          "q": "Voice consistency fails when…",
          "type": "multi",
          "options": [
            "persona flips without reason",
            "tone matches form",
            "structure is planned",
            "ending echoes opening"
          ],
          "answer": 0,
          "explain": "unmotivated flip.",
          "stage": "both"
        },
        {
          "q": "Final exam minute is best used to…",
          "type": "multi",
          "options": [
            "fix AO6 and tighten ending",
            "add a new plot arc",
            "change the form",
            "erase the plan only"
          ],
          "answer": 0,
          "explain": "secure marks.",
          "stage": "both"
        },
        {
          "q": "Cut prose that…",
          "type": "multi",
          "options": [
            "doesn't serve purpose/voice",
            "is beautiful and useful",
            "links paragraphs",
            "shows motif"
          ],
          "answer": 0,
          "explain": "kill darlings.",
          "stage": "both"
        },
        {
          "q": "Last-minute exam gain often from…",
          "type": "multi",
          "options": [
            "AO6 sweep + ending polish",
            "new full plot",
            "changing form",
            "deleting plan"
          ],
          "answer": 0,
          "explain": "secure marks.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Engineer openings and endings for resonance.",
          "Every paragraph earns its place — cut decoration that doesn't serve purpose."
        ],
        "practice": [
          {
            "q": "A* creative control often uses…",
            "type": "multi",
            "options": [
              "motif + structural echo",
              "random events only",
              "no planning",
              "only dialogue forever"
            ],
            "answer": 0,
            "explain": "patterning.",
            "stage": "both"
          }
        ]
      }
    }
  },
  "science": {
    "biology": {
      "title": "A* Biology mastery",
      "blurb": "Synoptic links: cells–systems–environment–inheritance.",
      "videoKey": "biology",
      "teach": {
        "points": [
          "Link cell processes to whole-organism responses and ecosystems.",
          "Explain data from unfamiliar contexts using core principles.",
          "Evaluate models and experimental designs critically."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Photosynthesis–respiration–carbon cycle are one story."
        ]
      },
      "practice": [
        {
          "q": "Synoptic link: mitochondria rich in muscle cells because…",
          "type": "multi",
          "options": [
            "high energy demand",
            "they photosynthesise",
            "they store DNA only",
            "they make cell walls"
          ],
          "answer": 0,
          "explain": "ATP need.",
          "stage": "both"
        },
        {
          "q": "Antibiotic resistance spreads by…",
          "type": "multi",
          "options": [
            "selection of resistant bacteria + gene transfer",
            "viruses becoming bacteria",
            "cold weather only",
            "vaccines creating bacteria"
          ],
          "answer": 0,
          "explain": "natural selection.",
          "stage": "both"
        },
        {
          "q": "Negative feedback…",
          "type": "multi",
          "options": [
            "reverses a change to restore norm",
            "amplifies change always",
            "is only in plants",
            "stops DNA replication only"
          ],
          "answer": 0,
          "explain": "homeostasis.",
          "stage": "both"
        },
        {
          "q": "Evaluating a model means…",
          "type": "multi",
          "options": [
            "stating strengths/limits vs reality",
            "saying models are useless",
            "memorising only",
            "ignoring data"
          ],
          "answer": 0,
          "explain": "critique.",
          "stage": "both"
        },
        {
          "q": "Biodiversity importance includes…",
          "type": "multi",
          "options": [
            "ecosystem stability / resources",
            "only decoration",
            "removing all species",
            "stopping photosynthesis"
          ],
          "answer": 0,
          "explain": "stability.",
          "stage": "both"
        },
        {
          "q": "Genetic engineering ethical evaluation needs…",
          "type": "multi",
          "options": [
            "benefits vs risks/arguments",
            "only slogans",
            "no science",
            "one word answers"
          ],
          "answer": 0,
          "explain": "balanced eval.",
          "stage": "both"
        },
        {
          "q": "Carbon cycle links…",
          "type": "multi",
          "options": [
            "photosynthesis, respiration, combustion",
            "only digestion",
            "only magnetism",
            "only sound"
          ],
          "answer": 0,
          "explain": "C stores.",
          "stage": "both"
        },
        {
          "q": "Evaluating gene tech needs…",
          "type": "multi",
          "options": [
            "benefits, risks, ethics",
            "only cost",
            "only jokes",
            "no science"
          ],
          "answer": 0,
          "explain": "balanced.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Link cell processes to whole-organism responses and ecosystems.",
          "Explain data from unfamiliar contexts using core principles."
        ],
        "practice": [
          {
            "q": "Synoptic link: mitochondria rich in muscle cells because…",
            "type": "multi",
            "options": [
              "high energy demand",
              "they photosynthesise",
              "they store DNA only",
              "they make cell walls"
            ],
            "answer": 0,
            "explain": "ATP need.",
            "stage": "both"
          }
        ]
      }
    },
    "chemistry": {
      "title": "A* Chemistry mastery",
      "blurb": "Quantitative chemistry, equilibria and organic intro synthesis.",
      "videoKey": "chemistry",
      "teach": {
        "points": [
          "Mole calculations: n=m/Mr ; solutions n=cV (V in dm³).",
          "Le Chatelier: predict equilibrium shifts qualitatively.",
          "Organic: homologous series, combustion, basic functional groups."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "n = m/Mr ; c = n/V"
        ]
      },
      "practice": [
        {
          "q": "Moles in 20 g of CaCO₃ (Mr=100)?",
          "type": "typed",
          "answer": "0.2",
          "explain": "20/100=0.2.",
          "accept": [
            "0.2",
            "0.20"
          ],
          "stage": "both"
        },
        {
          "q": "Concentration 0.5 mol/dm³ in 0.25 dm³ has moles…",
          "type": "multi",
          "options": [
            "0.125",
            "2",
            "0.5",
            "0.25"
          ],
          "answer": 0,
          "explain": "n=cV=0.125.",
          "stage": "both"
        },
        {
          "q": "Increase pressure on equilibrium with fewer gas moles product side…",
          "type": "multi",
          "options": [
            "shifts to products (fewer moles)",
            "always to reactants",
            "no effect ever",
            "stops reaction"
          ],
          "answer": 0,
          "explain": "Le Chatelier.",
          "stage": "both"
        },
        {
          "q": "Alkanes are…",
          "type": "multi",
          "options": [
            "saturated hydrocarbons",
            "always acids",
            "metals",
            "noble gases"
          ],
          "answer": 0,
          "explain": "C–C single bonds.",
          "stage": "both"
        },
        {
          "q": "Incomplete combustion risks…",
          "type": "multi",
          "options": [
            "carbon monoxide",
            "only pure oxygen",
            "only salt water",
            "noble gases"
          ],
          "answer": 0,
          "explain": "CO toxic.",
          "stage": "both"
        },
        {
          "q": "Atom economy high means…",
          "type": "multi",
          "options": [
            "more desired product mass fraction",
            "faster always",
            "lower yield always",
            "no catalyst ever"
          ],
          "answer": 0,
          "explain": "green chemistry.",
          "stage": "both"
        },
        {
          "q": "Mr of H2O?",
          "type": "typed",
          "answer": "18",
          "explain": "2+16=18.",
          "accept": [
            "18"
          ],
          "stage": "both"
        },
        {
          "q": "High atom economy is greener because…",
          "type": "multi",
          "options": [
            "less waste mass",
            "always faster",
            "uses more solvent always",
            "lower temperature always"
          ],
          "answer": 0,
          "explain": "less waste.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Mole calculations: n=m/Mr ; solutions n=cV (V in dm³).",
          "Le Chatelier: predict equilibrium shifts qualitatively."
        ],
        "practice": [
          {
            "q": "Moles in 20 g of CaCO₃ (Mr=100)?",
            "type": "typed",
            "answer": "0.2",
            "explain": "20/100=0.2.",
            "accept": [
              "0.2",
              "0.20"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "physics": {
      "title": "A* Physics mastery",
      "blurb": "Multi-step mechanics, electricity and waves with equations.",
      "videoKey": "physics",
      "teach": {
        "points": [
          "Select equations; rearrange; substitute with units; significant figures.",
          "Energy transfers across stores with conservation checks.",
          "Explain phenomena with models (particles, fields, waves)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "List equation → rearrange → numbers + units → check s.f."
        ]
      },
      "practice": [
        {
          "q": "KE formula?",
          "type": "multi",
          "options": [
            "½mv²",
            "mv",
            "mgh only",
            "Fd only"
          ],
          "answer": 0,
          "explain": "½mv².",
          "stage": "both"
        },
        {
          "q": "KE of 2 kg at 3 m/s?",
          "type": "typed",
          "answer": "9",
          "explain": "0.5×2×9=9 J.",
          "accept": [
            "9",
            "9J",
            "9 J"
          ],
          "stage": "both"
        },
        {
          "q": "GPE = ?",
          "type": "multi",
          "options": [
            "mgh",
            "½mv²",
            "VIt",
            "IR"
          ],
          "answer": 0,
          "explain": "mgh.",
          "stage": "both"
        },
        {
          "q": "If resistance doubles at constant V, current…",
          "type": "multi",
          "options": [
            "halves",
            "doubles",
            "unchanged",
            "squares"
          ],
          "answer": 0,
          "explain": "I=V/R.",
          "stage": "both"
        },
        {
          "q": "Total resistance in series…",
          "type": "multi",
          "options": [
            "sum of resistances",
            "always less than smallest",
            "product only",
            "zero"
          ],
          "answer": 0,
          "explain": "R₁+R₂+…",
          "stage": "both"
        },
        {
          "q": "A step-up transformer increases…",
          "type": "multi",
          "options": [
            "voltage (approx), decreases current",
            "mass",
            "resistance of copper to zero always",
            "frequency of mains to zero"
          ],
          "answer": 0,
          "explain": "Vp/Vs=Np/Ns.",
          "stage": "both"
        },
        {
          "q": "KE 4 kg at 5 m/s?",
          "type": "typed",
          "answer": "50",
          "explain": "0.5×4×25=50 J.",
          "accept": [
            "50",
            "50J"
          ],
          "stage": "both"
        },
        {
          "q": "Series resistors: total R…",
          "type": "multi",
          "options": [
            "increases",
            "decreases below smallest always",
            "is product only",
            "is zero"
          ],
          "answer": 0,
          "explain": "sum.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Select equations; rearrange; substitute with units; significant figures.",
          "Energy transfers across stores with conservation checks."
        ],
        "practice": [
          {
            "q": "KE formula?",
            "type": "multi",
            "options": [
              "½mv²",
              "mv",
              "mgh only",
              "Fd only"
            ],
            "answer": 0,
            "explain": "½mv².",
            "stage": "both"
          }
        ]
      }
    },
    "method": {
      "title": "A* scientific thinking",
      "blurb": "Design, critique and communicate like a top-band scientist.",
      "videoKey": "method",
      "teach": {
        "points": [
          "Design methods that isolate IV and quantify uncertainty.",
          "Critique others' methods for validity and reliability.",
          "Communicate with precise scientific vocabulary and clear data references."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Claim → evidence → reasoning → limitation."
        ]
      },
      "practice": [
        {
          "q": "A* practical write-up includes…",
          "type": "multi",
          "options": [
            "variables, method, data, uncertainty, evaluation",
            "only a colourful graph",
            "no units",
            "one sentence"
          ],
          "answer": 0,
          "explain": "full loop.",
          "stage": "both"
        },
        {
          "q": "Validity asks…",
          "type": "multi",
          "options": [
            "does it measure what it claims?",
            "is handwriting neat?",
            "is it long?",
            "is it copied?"
          ],
          "answer": 0,
          "explain": "fitness for purpose.",
          "stage": "both"
        },
        {
          "q": "Reproducible means…",
          "type": "multi",
          "options": [
            "other people/methods can get similar results",
            "only you can",
            "results are random",
            "no equipment"
          ],
          "answer": 0,
          "explain": "others can repeat.",
          "stage": "both"
        },
        {
          "q": "When data conflict with a prediction…",
          "type": "multi",
          "options": [
            "recheck method/data; refine model",
            "delete data quietly",
            "change IV labels randomly",
            "ignore"
          ],
          "answer": 0,
          "explain": "scientific honesty.",
          "stage": "both"
        },
        {
          "q": "Correlation ≠ causation reminds us…",
          "type": "multi",
          "options": [
            "linked trends may share other factors",
            "graphs are useless",
            "means equal medians",
            "samples are infinite"
          ],
          "answer": 0,
          "explain": "causal caution.",
          "stage": "both"
        },
        {
          "q": "Communicating A* answers…",
          "type": "multi",
          "options": [
            "links numbers to scientific ideas clearly",
            "lists equations with no meaning",
            "avoids units",
            "uses only slang"
          ],
          "answer": 0,
          "explain": "explain links.",
          "stage": "both"
        },
        {
          "q": "Limitation statement should link to…",
          "type": "multi",
          "options": [
            "method/data quality",
            "favourite colour",
            "page length",
            "pen type only"
          ],
          "answer": 0,
          "explain": "method.",
          "stage": "both"
        },
        {
          "q": "Correlation caution:",
          "type": "multi",
          "options": [
            "other variables may explain link",
            "proves cause always",
            "means equal",
            "invalidates all graphs"
          ],
          "answer": 0,
          "explain": "not causation.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Design methods that isolate IV and quantify uncertainty.",
          "Critique others' methods for validity and reliability."
        ],
        "practice": [
          {
            "q": "A* practical write-up includes…",
            "type": "multi",
            "options": [
              "variables, method, data, uncertainty, evaluation",
              "only a colourful graph",
              "no units",
              "one sentence"
            ],
            "answer": 0,
            "explain": "full loop.",
            "stage": "both"
          }
        ]
      }
    }
  }
};
