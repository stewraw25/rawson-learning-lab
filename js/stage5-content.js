/**
 * TEACH_MODULES_STAGE5 — Rawson Learning Lab pathway content
 * Auto-built curriculum bank (UK GCSE pathway)
 */

const TEACH_MODULES_STAGE5 = {
  "maths": {
    "number": {
      "title": "Higher Number",
      "blurb": "Surds, fractional indices, recurring decimals and bounds calculations.",
      "videoKey": "placevalue",
      "teach": {
        "points": [
          "Surds: √a × √b = √(ab); rationalise denominator ×√b/√b.",
          "a^(m/n) = ⁿ√(aᵐ). Negative fractional indices too.",
          "Calculations with upper/lower bounds in multi-step problems."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Rationalise 1/√2 → √2/2",
          "8^(2/3)=(³√8)²=2²=4"
        ]
      },
      "practice": [
        {
          "q": "Simplify √12.",
          "type": "multi",
          "options": [
            "2√3",
            "3√2",
            "4√3",
            "√3"
          ],
          "answer": 0,
          "explain": "√(4×3)=2√3.",
          "stage": "both"
        },
        {
          "q": "8^(2/3) = ?",
          "type": "typed",
          "answer": "4",
          "explain": "∛8=2, 2²=4.",
          "accept": [
            "4"
          ],
          "stage": "both"
        },
        {
          "q": "Rationalise 1/√3.",
          "type": "multi",
          "options": [
            "√3/3",
            "3",
            "√3",
            "1/3"
          ],
          "answer": 0,
          "explain": "×√3/√3.",
          "stage": "both"
        },
        {
          "q": "0.1̇ (0.111…) as fraction?",
          "type": "multi",
          "options": [
            "1/9",
            "1/3",
            "1/11",
            "1/90"
          ],
          "answer": 0,
          "explain": "classic result.",
          "stage": "both"
        },
        {
          "q": "Lower bound of 5.0 (1 d.p.)?",
          "type": "typed",
          "answer": "4.95",
          "explain": "nearest 0.1 → 4.95.",
          "accept": [
            "4.95"
          ],
          "stage": "both"
        },
        {
          "q": "√50 in simplest surd form?",
          "type": "multi",
          "options": [
            "5√2",
            "2√5",
            "10√5",
            "25√2"
          ],
          "answer": 0,
          "explain": "√(25×2)=5√2.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Surds: √a × √b = √(ab); rationalise denominator ×√b/√b.",
          "a^(m/n) = ⁿ√(aᵐ). Negative fractional indices too."
        ],
        "practice": [
          {
            "q": "Simplify √12.",
            "type": "multi",
            "options": [
              "2√3",
              "3√2",
              "4√3",
              "√3"
            ],
            "answer": 0,
            "explain": "√(4×3)=2√3.",
            "stage": "both"
          }
        ]
      }
    },
    "operations": {
      "title": "Higher calculations",
      "blurb": "Exact values, iterative processes and compound measures combo.",
      "videoKey": "multiply",
      "teach": {
        "points": [
          "Keep answers exact (surds/π/fractions) until the end if asked.",
          "Iteration: xₙ₊₁ = F(xₙ) converges to a solution when it settles.",
          "Combine compound measures carefully with unit conversions."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Iterate x=√(10−x) or similar until stable."
        ]
      },
      "practice": [
        {
          "q": "Exact sin 30° (Higher knowledge)?",
          "type": "multi",
          "options": [
            "1/2",
            "√3/2",
            "√2/2",
            "0"
          ],
          "answer": 0,
          "explain": "sin30=1/2.",
          "stage": "both"
        },
        {
          "q": "Area of circle r=3 exact?",
          "type": "typed",
          "answer": "9π",
          "explain": "πr²=9π.",
          "accept": [
            "9π",
            "9pi"
          ],
          "stage": "both"
        },
        {
          "q": "If iteration converges, values…",
          "type": "multi",
          "options": [
            "settle toward a limit",
            "always go to infinity",
            "oscillate forever always",
            "become complex"
          ],
          "answer": 0,
          "explain": "approach solution.",
          "stage": "both"
        },
        {
          "q": "1 mile ≈ ?",
          "type": "multi",
          "options": [
            "1.6 km",
            "0.5 km",
            "10 km",
            "100 m"
          ],
          "answer": 0,
          "explain": "≈1.6 km.",
          "stage": "both"
        },
        {
          "q": "Pressure if F=100 N, A=0.5 m²?",
          "type": "typed",
          "answer": "200",
          "explain": "100/0.5=200 Pa.",
          "accept": [
            "200",
            "200 Pa"
          ],
          "stage": "both"
        },
        {
          "q": "Rounding  error accumulates most when…",
          "type": "multi",
          "options": [
            "many steps with premature rounding",
            "exact values kept",
            "one addition",
            "writing units"
          ],
          "answer": 0,
          "explain": "round late.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Keep answers exact (surds/π/fractions) until the end if asked.",
          "Iteration: xₙ₊₁ = F(xₙ) converges to a solution when it settles."
        ],
        "practice": [
          {
            "q": "Exact sin 30° (Higher knowledge)?",
            "type": "multi",
            "options": [
              "1/2",
              "√3/2",
              "√2/2",
              "0"
            ],
            "answer": 0,
            "explain": "sin30=1/2.",
            "stage": "both"
          }
        ]
      }
    },
    "fractions": {
      "title": "Higher ratio & proportion",
      "blurb": "Algebraic proportion, growth/decay, reverse percentage chains.",
      "videoKey": "percentages",
      "teach": {
        "points": [
          "y ∝ x² means y = kx²; find k from a pair, then predict.",
          "Exponential growth/decay: multiplier each period.",
          "Successive percentages: multiply multipliers (1.1 × 0.9 ≠ 1)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "y∝x²; when x=2, y=20 → k=5 → y=5x²"
        ]
      },
      "practice": [
        {
          "q": "After +10% then −10%, value is…",
          "type": "multi",
          "options": [
            "down overall",
            "unchanged",
            "up overall",
            "zero"
          ],
          "answer": 0,
          "explain": "×1.1×0.9=0.99.",
          "stage": "both"
        },
        {
          "q": "y∝x; x=4,y=10. When x=6, y=?",
          "type": "typed",
          "answer": "15",
          "explain": "k=2.5 → 15.",
          "accept": [
            "15"
          ],
          "stage": "both"
        },
        {
          "q": "y ∝ 1/x. If x triples, y…",
          "type": "multi",
          "options": [
            "÷3",
            "×3",
            "×9",
            "unchanged"
          ],
          "answer": 0,
          "explain": "inverse.",
          "stage": "both"
        },
        {
          "q": "Compound: £1000 grows 5% for 2 years. Final?",
          "type": "typed",
          "answer": "1102.5",
          "explain": "1000×1.05²=1102.5.",
          "accept": [
            "1102.5",
            "1102.50",
            "£1102.50"
          ],
          "stage": "both"
        },
        {
          "q": "Depreciation 20% per year for 2 years multiplier?",
          "type": "multi",
          "options": [
            "0.8²",
            "0.2²",
            "1.2²",
            "0.8×2"
          ],
          "answer": 0,
          "explain": "×0.8 twice.",
          "stage": "both"
        },
        {
          "q": "Capture-recapture estimates…",
          "type": "multi",
          "options": [
            "population size",
            "mean only",
            "prime factors",
            "angles"
          ],
          "answer": 0,
          "explain": "wildlife populations.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "y ∝ x² means y = kx²; find k from a pair, then predict.",
          "Exponential growth/decay: multiplier each period."
        ],
        "practice": [
          {
            "q": "After +10% then −10%, value is…",
            "type": "multi",
            "options": [
              "down overall",
              "unchanged",
              "up overall",
              "zero"
            ],
            "answer": 0,
            "explain": "×1.1×0.9=0.99.",
            "stage": "both"
          }
        ]
      }
    },
    "algebra": {
      "title": "Higher algebra",
      "blurb": "Quadratics, simultaneous equations, inequalities regions intro.",
      "videoKey": "algebra",
      "teach": {
        "points": [
          "Factorise quadratics; solve by factorising or formula.",
          "Simultaneous: elimination or substitution.",
          "Complete the square for turning point (Higher)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "x²+5x+6=(x+2)(x+3) → x=−2 or −3"
        ]
      },
      "practice": [
        {
          "q": "Factorise x²+5x+6",
          "type": "multi",
          "options": [
            "(x+2)(x+3)",
            "(x+1)(x+6)",
            "(x−2)(x−3)",
            "(x+5)(x+1)"
          ],
          "answer": 0,
          "explain": "2+3=5, 2×3=6.",
          "stage": "both"
        },
        {
          "q": "Solve x² − 9 = 0 (positive root).",
          "type": "typed",
          "answer": "3",
          "explain": "(x−3)(x+3)=0.",
          "accept": [
            "3"
          ],
          "stage": "both"
        },
        {
          "q": "Simultaneous: x+y=5, x−y=1. x=?",
          "type": "multi",
          "options": [
            "3",
            "2",
            "5",
            "1"
          ],
          "answer": 0,
          "explain": "add: 2x=6 → x=3.",
          "stage": "both"
        },
        {
          "q": "Turning point of y=(x−3)²+2?",
          "type": "multi",
          "options": [
            "(3,2)",
            "(−3,2)",
            "(3,−2)",
            "(0,2)"
          ],
          "answer": 0,
          "explain": "vertex form.",
          "stage": "both"
        },
        {
          "q": "Quadratic formula for ax²+bx+c=0 uses…",
          "type": "multi",
          "options": [
            "b²−4ac",
            "b²+4ac",
            "2a only",
            "c/a only"
          ],
          "answer": 0,
          "explain": "discriminant.",
          "stage": "both"
        },
        {
          "q": "Sum of roots of x²−5x+6=0?",
          "type": "typed",
          "answer": "5",
          "explain": "sum=−b/a=5.",
          "accept": [
            "5"
          ],
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Factorise quadratics; solve by factorising or formula.",
          "Simultaneous: elimination or substitution."
        ],
        "practice": [
          {
            "q": "Factorise x²+5x+6",
            "type": "multi",
            "options": [
              "(x+2)(x+3)",
              "(x+1)(x+6)",
              "(x−2)(x−3)",
              "(x+5)(x+1)"
            ],
            "answer": 0,
            "explain": "2+3=5, 2×3=6.",
            "stage": "both"
          }
        ]
      }
    },
    "geometry": {
      "title": "Higher geometry",
      "blurb": "Trigonometry SOHCAHTOA, sine/cosine rule intro, circle theorems intro.",
      "videoKey": "angles",
      "teach": {
        "points": [
          "SOH CAH TOA in right triangles.",
          "Sine rule a/sin A = b/sin B; cosine rule a²=b²+c²−2bc cos A.",
          "Circle theorems: angle in semicircle is 90°, etc."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "sin θ = opp/hyp"
        ]
      },
      "practice": [
        {
          "q": "cos θ = ?",
          "type": "multi",
          "options": [
            "adj/hyp",
            "opp/hyp",
            "opp/adj",
            "hyp/opp"
          ],
          "answer": 0,
          "explain": "CAH.",
          "stage": "both"
        },
        {
          "q": "In right triangle, opp=3, hyp=6, sin θ=?",
          "type": "typed",
          "answer": "0.5",
          "explain": "3/6=0.5.",
          "accept": [
            "0.5",
            "1/2",
            ".5"
          ],
          "stage": "both"
        },
        {
          "q": "Angle in a semicircle is…",
          "type": "multi",
          "options": [
            "90°",
            "45°",
            "180°",
            "60°"
          ],
          "answer": 0,
          "explain": "theorem.",
          "stage": "both"
        },
        {
          "q": "Similar triangles have…",
          "type": "multi",
          "options": [
            "equal angles",
            "equal areas always",
            "equal perimeters always",
            "no related sides"
          ],
          "answer": 0,
          "explain": "AAA similarity.",
          "stage": "both"
        },
        {
          "q": "Vector a followed by b is…",
          "type": "multi",
          "options": [
            "a+b",
            "a−b only",
            "a×b",
            "0 always"
          ],
          "answer": 0,
          "explain": "resultant addition.",
          "stage": "both"
        },
        {
          "q": "Area of triangle ½ab sin C uses…",
          "type": "multi",
          "options": [
            "two sides and included angle",
            "three angles only",
            "only base",
            "radius only"
          ],
          "answer": 0,
          "explain": "SAS area.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "SOH CAH TOA in right triangles.",
          "Sine rule a/sin A = b/sin B; cosine rule a²=b²+c²−2bc cos A."
        ],
        "practice": [
          {
            "q": "cos θ = ?",
            "type": "multi",
            "options": [
              "adj/hyp",
              "opp/hyp",
              "opp/adj",
              "hyp/opp"
            ],
            "answer": 0,
            "explain": "CAH.",
            "stage": "both"
          }
        ]
      }
    },
    "data": {
      "title": "Higher stats & probability",
      "blurb": "Histograms, cumulative frequency, conditional probability intro.",
      "videoKey": "averages",
      "teach": {
        "points": [
          "Histogram: frequency density = frequency ÷ class width.",
          "Cumulative frequency → median/IQR from graph.",
          "Tree diagrams for successive events; independent vs dependent."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "FD = f / width"
        ]
      },
      "practice": [
        {
          "q": "Histogram vertical axis is…",
          "type": "multi",
          "options": [
            "frequency density",
            "always frequency",
            "probability only",
            "time"
          ],
          "answer": 0,
          "explain": "FD.",
          "stage": "both"
        },
        {
          "q": "IQR = ?",
          "type": "multi",
          "options": [
            "UQ − LQ",
            "max − min",
            "mean − mode",
            "Σx / n"
          ],
          "answer": 0,
          "explain": "interquartile range.",
          "stage": "both"
        },
        {
          "q": "Independent events: P(A and B)=?",
          "type": "multi",
          "options": [
            "P(A)×P(B)",
            "P(A)+P(B)",
            "P(A)−P(B)",
            "1"
          ],
          "answer": 0,
          "explain": "product rule.",
          "stage": "both"
        },
        {
          "q": "Box plot shows…",
          "type": "multi",
          "options": [
            "min, LQ, median, UQ, max",
            "only mean",
            "only mode",
            "hist bars"
          ],
          "answer": 0,
          "explain": "five-number summary.",
          "stage": "both"
        },
        {
          "q": "Stratified sample…",
          "type": "multi",
          "options": [
            "keeps group proportions",
            "picks only friends",
            "ignores groups",
            "is always smaller than 5"
          ],
          "answer": 0,
          "explain": "proportional groups.",
          "stage": "both"
        },
        {
          "q": "P(A|B) means…",
          "type": "multi",
          "options": [
            "probability of A given B",
            "A or B",
            "A times B",
            "not A"
          ],
          "answer": 0,
          "explain": "conditional.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Histogram: frequency density = frequency ÷ class width.",
          "Cumulative frequency → median/IQR from graph."
        ],
        "practice": [
          {
            "q": "Histogram vertical axis is…",
            "type": "multi",
            "options": [
              "frequency density",
              "always frequency",
              "probability only",
              "time"
            ],
            "answer": 0,
            "explain": "FD.",
            "stage": "both"
          }
        ]
      }
    }
  },
  "english": {
    "grammar": {
      "title": "Higher grammar craft",
      "blurb": "Controlled complexity for top-band AO6.",
      "videoKey": "grammar",
      "teach": {
        "points": [
          "Use complex and compound-complex sentences deliberately for effect.",
          "Fronted adverbials, embedding, and non-finite clauses for variety.",
          "Maintain standard English under timed conditions."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Having finished the test, she checked AO6 carefully."
        ]
      },
      "practice": [
        {
          "q": "Non-finite clause example:",
          "type": "multi",
          "options": [
            "Having left early, we arrived on time.",
            "We left.",
            "Yes.",
            "The end."
          ],
          "answer": 0,
          "explain": "Having left…",
          "stage": "both"
        },
        {
          "q": "Subjunctive mood example (formal):",
          "type": "multi",
          "options": [
            "If I were you…",
            "If I was you only always",
            "I be going",
            "Me went"
          ],
          "answer": 0,
          "explain": "were in hypothetical.",
          "stage": "both"
        },
        {
          "q": "Apposition:",
          "type": "multi",
          "options": [
            "My sister, a doctor, arrived.",
            "My sister doctor arrived.",
            "Sister my arrived doctor.",
            "Arrived sister."
          ],
          "answer": 0,
          "explain": "noun renaming noun.",
          "stage": "both"
        },
        {
          "q": "Nominalisation turns verbs into…",
          "type": "multi",
          "options": [
            "nouns (decision from decide)",
            "adverbs only",
            "punctuation",
            "paragraphs"
          ],
          "answer": 0,
          "explain": "noun forms.",
          "stage": "both"
        },
        {
          "q": "Cohesion is improved by…",
          "type": "multi",
          "options": [
            "pronouns, discourse markers, lexical ties",
            "random fonts",
            "no paragraphs",
            "emojis only"
          ],
          "answer": 0,
          "explain": "linking devices.",
          "stage": "both"
        },
        {
          "q": "Register shift mid-letter usually…",
          "type": "multi",
          "options": [
            "weakens formality control",
            "always gains marks",
            "is required",
            "replaces structure"
          ],
          "answer": 0,
          "explain": "stay consistent.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Use complex and compound-complex sentences deliberately for effect.",
          "Fronted adverbials, embedding, and non-finite clauses for variety."
        ],
        "practice": [
          {
            "q": "Non-finite clause example:",
            "type": "multi",
            "options": [
              "Having left early, we arrived on time.",
              "We left.",
              "Yes.",
              "The end."
            ],
            "answer": 0,
            "explain": "Having left…",
            "stage": "both"
          }
        ]
      }
    },
    "punctuation": {
      "title": "Higher punctuation",
      "blurb": "Ambitious punctuation used accurately under pressure.",
      "videoKey": "punctuation",
      "teach": {
        "points": [
          "Semi-colons and colons in sophisticated lists and explanations.",
          "Parenthetical commas/dashes for layered information.",
          "Avoid overusing exclamation marks in formal responses."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "The argument was clear: evidence first; interpretation second."
        ]
      },
      "practice": [
        {
          "q": "Sophisticated list of clauses best uses…",
          "type": "multi",
          "options": [
            "semi-colons between complex items",
            "only commas always",
            "no marks",
            "question marks"
          ],
          "answer": 0,
          "explain": "complex list items.",
          "stage": "both"
        },
        {
          "q": "Pair of dashes can…",
          "type": "multi",
          "options": [
            "insert an emphatic aside",
            "end the exam",
            "replace verbs",
            "mean plurals"
          ],
          "answer": 0,
          "explain": "aside.",
          "stage": "both"
        },
        {
          "q": "In formal GCSE writing, !!! is…",
          "type": "multi",
          "options": [
            "usually poor control",
            "required",
            "AO4 only",
            "a structure mark"
          ],
          "answer": 0,
          "explain": "avoid multi !.",
          "stage": "both"
        },
        {
          "q": "Single quotation marks often used for…",
          "type": "multi",
          "options": [
            "titles/words as words (UK style varies)",
            "shouting",
            "paragraphs",
            "page breaks"
          ],
          "answer": 0,
          "explain": "words-as-words/titles.",
          "stage": "both"
        },
        {
          "q": "Oxford comma is…",
          "type": "multi",
          "options": [
            "optional serial comma before 'and'",
            "a full stop",
            "only in maths",
            "banned always"
          ],
          "answer": 0,
          "explain": "serial comma.",
          "stage": "both"
        },
        {
          "q": "Interrobang (‽) in exams is…",
          "type": "multi",
          "options": [
            "risky/non-standard",
            "compulsory",
            "AO1 only",
            "a graph symbol"
          ],
          "answer": 0,
          "explain": "stick to standard marks.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Semi-colons and colons in sophisticated lists and explanations.",
          "Parenthetical commas/dashes for layered information."
        ],
        "practice": [
          {
            "q": "Sophisticated list of clauses best uses…",
            "type": "multi",
            "options": [
              "semi-colons between complex items",
              "only commas always",
              "no marks",
              "question marks"
            ],
            "answer": 0,
            "explain": "complex list items.",
            "stage": "both"
          }
        ]
      }
    },
    "vocabulary": {
      "title": "Higher vocabulary & rhetoric",
      "blurb": "Precise academic and rhetorical lexis for grades 6–7.",
      "videoKey": "reading",
      "teach": {
        "points": [
          "Analyse with precise verbs: undermines, elevates, saturates, fractures.",
          "Comment on connotations and semantic fields, not just 'positive/negative'.",
          "In writing, advanced vocab must still sound natural to the form."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "'Saturates the scene with dread' > 'makes it scary'."
        ]
      },
      "practice": [
        {
          "q": "Best verb: The motif of darkness ___ the ending.",
          "type": "multi",
          "options": [
            "foreshadows",
            "eats",
            "jumps",
            "prints"
          ],
          "answer": 0,
          "explain": "foreshadows.",
          "stage": "both"
        },
        {
          "q": "Irony is…",
          "type": "multi",
          "options": [
            "contrast between expectation and reality",
            "only sarcasm always",
            "a rhyme",
            "a setting"
          ],
          "answer": 0,
          "explain": "incongruity.",
          "stage": "both"
        },
        {
          "q": "Hyperbole means…",
          "type": "multi",
          "options": [
            "deliberate exaggeration",
            "understatement",
            "literal measurement",
            "silence"
          ],
          "answer": 0,
          "explain": "exaggeration.",
          "stage": "both"
        },
        {
          "q": "A pejorative term is…",
          "type": "multi",
          "options": [
            "disapproving",
            "neutral always",
            "scientific only",
            "a connectives list"
          ],
          "answer": 0,
          "explain": "negative judgement.",
          "stage": "both"
        },
        {
          "q": "Idiolect is…",
          "type": "multi",
          "options": [
            "an individual's language style",
            "national language only",
            "punctuation set",
            "a poem form"
          ],
          "answer": 0,
          "explain": "personal variety.",
          "stage": "both"
        },
        {
          "q": "Lexical choice of 'slithered' vs 'walked' mainly affects…",
          "type": "multi",
          "options": [
            "imagery/connotation",
            "word count only",
            "font",
            "margins"
          ],
          "answer": 0,
          "explain": "connotation.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Analyse with precise verbs: undermines, elevates, saturates, fractures.",
          "Comment on connotations and semantic fields, not just 'positive/negative'."
        ],
        "practice": [
          {
            "q": "Best verb: The motif of darkness ___ the ending.",
            "type": "multi",
            "options": [
              "foreshadows",
              "eats",
              "jumps",
              "prints"
            ],
            "answer": 0,
            "explain": "foreshadows.",
            "stage": "both"
          }
        ]
      }
    },
    "reading": {
      "title": "Higher Reading analysis",
      "blurb": "Integrated AO2/AO4 — methods, effects, evaluation.",
      "videoKey": "reading",
      "teach": {
        "points": [
          "Zoom in on words, then zoom out to whole-text effect.",
          "Evaluate: how far is the writer successful for their purpose?",
          "Compare tone, methods and perspectives with precise connectives."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Word → method → effect → reader → purpose link."
        ]
      },
      "practice": [
        {
          "q": "Best analysis moves from…",
          "type": "multi",
          "options": [
            "language detail to wider meaning",
            "plot summary only",
            "biographical only",
            "word count"
          ],
          "answer": 0,
          "explain": "micro→macro.",
          "stage": "both"
        },
        {
          "q": "Structural shift often…",
          "type": "multi",
          "options": [
            "changes focus/time/perspective",
            "only adds adjectives",
            "ends AO6",
            "removes tension always"
          ],
          "answer": 0,
          "explain": "focus change.",
          "stage": "both"
        },
        {
          "q": "Unreliable narrator makes us…",
          "type": "multi",
          "options": [
            "question the account",
            "trust every word",
            "ignore tone",
            "count paragraphs"
          ],
          "answer": 0,
          "explain": "doubt.",
          "stage": "both"
        },
        {
          "q": "When evaluating, avoid…",
          "type": "multi",
          "options": [
            "unsupported 'it is good'",
            "evidence",
            "methods",
            "purpose"
          ],
          "answer": 0,
          "explain": "empty judgement.",
          "stage": "both"
        },
        {
          "q": "Semantic field of disease in a text might…",
          "type": "multi",
          "options": [
            "suggest corruption/decay",
            "prove dates",
            "fix grammar",
            "set font"
          ],
          "answer": 0,
          "explain": "thematic colouring.",
          "stage": "both"
        },
        {
          "q": "Comparative conclusion should…",
          "type": "multi",
          "options": [
            "synthesise similarities/differences",
            "introduce a third text only",
            "list quotes only",
            "stop mid-sentence"
          ],
          "answer": 0,
          "explain": "synthesis.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Zoom in on words, then zoom out to whole-text effect.",
          "Evaluate: how far is the writer successful for their purpose?"
        ],
        "practice": [
          {
            "q": "Best analysis moves from…",
            "type": "multi",
            "options": [
              "language detail to wider meaning",
              "plot summary only",
              "biographical only",
              "word count"
            ],
            "answer": 0,
            "explain": "micro→macro.",
            "stage": "both"
          }
        ]
      }
    },
    "writing": {
      "title": "Higher transactional & creative",
      "blurb": "Crafted voice, structure and sustained accuracy.",
      "videoKey": "writing",
      "teach": {
        "points": [
          "Distinctive voice sustained from first line to last.",
          "Motif and structural patterning elevate creative writing.",
          "Transactional: control counter-argument without losing line of argument."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Open in media res or with a striking image; echo it at the end."
        ]
      },
      "practice": [
        {
          "q": "In media res means…",
          "type": "multi",
          "options": [
            "starting mid-action",
            "starting with dictionary def only",
            "ending first",
            "no characters"
          ],
          "answer": 0,
          "explain": "into the middle.",
          "stage": "both"
        },
        {
          "q": "Counter-argument should be…",
          "type": "multi",
          "options": [
            "acknowledged then rebutted",
            "ignored always",
            "the only paragraph",
            "a shopping list"
          ],
          "answer": 0,
          "explain": "fair then refute.",
          "stage": "both"
        },
        {
          "q": "Sustained metaphor…",
          "type": "multi",
          "options": [
            "extends an image across a text",
            "is one adjective",
            "is a full stop",
            "is AO6 only"
          ],
          "answer": 0,
          "explain": "extended image.",
          "stage": "both"
        },
        {
          "q": "Pace can be slowed by…",
          "type": "multi",
          "options": [
            "longer complex sentences / detail",
            "only short fragments always",
            "removing verbs",
            "ALL CAPS"
          ],
          "answer": 0,
          "explain": "syntax & detail.",
          "stage": "both"
        },
        {
          "q": "Direct address ('you') in articles…",
          "type": "multi",
          "options": [
            "involves the reader",
            "is always informal fail",
            "is banned",
            "replaces evidence"
          ],
          "answer": 0,
          "explain": "engagement.",
          "stage": "both"
        },
        {
          "q": "Top-band endings often…",
          "type": "multi",
          "options": [
            "resonate/echo rather than fizzle",
            "introduce brand new plot only",
            "list spelling",
            "apologise"
          ],
          "answer": 0,
          "explain": "crafted closure.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Distinctive voice sustained from first line to last.",
          "Motif and structural patterning elevate creative writing."
        ],
        "practice": [
          {
            "q": "In media res means…",
            "type": "multi",
            "options": [
              "starting mid-action",
              "starting with dictionary def only",
              "ending first",
              "no characters"
            ],
            "answer": 0,
            "explain": "into the middle.",
            "stage": "both"
          }
        ]
      }
    }
  },
  "science": {
    "biology": {
      "title": "Higher Biology",
      "blurb": "Infection, bioenergetics, homeostasis overview and inheritance intro.",
      "videoKey": "biology",
      "teach": {
        "points": [
          "Aerobic vs anaerobic respiration; oxygen debt idea.",
          "Homeostasis: blood glucose and temperature control overview.",
          "DNA, genes, chromosomes; dominant/recessive alleles intro."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Aerobic: glucose + oxygen → CO₂ + water (+ energy)"
        ]
      },
      "practice": [
        {
          "q": "Anaerobic in muscles produces…",
          "type": "multi",
          "options": [
            "lactic acid",
            "only oxygen",
            "only glucose",
            "chlorophyll"
          ],
          "answer": 0,
          "explain": "lactic acid.",
          "stage": "both"
        },
        {
          "q": "Insulin…",
          "type": "multi",
          "options": [
            "lowers blood glucose",
            "raises blood glucose only",
            "is a vitamin",
            "is a bone"
          ],
          "answer": 0,
          "explain": "glucose → storage.",
          "stage": "both"
        },
        {
          "q": "Genotype is…",
          "type": "multi",
          "options": [
            "allele combination",
            "physical appearance only",
            "the environment",
            "a cell wall"
          ],
          "answer": 0,
          "explain": "genetic make-up.",
          "stage": "both"
        },
        {
          "q": "Phenotype is…",
          "type": "multi",
          "options": [
            "observable characteristics",
            "only DNA letters",
            "a microscope",
            "a catalyst"
          ],
          "answer": 0,
          "explain": "expressed traits.",
          "stage": "both"
        },
        {
          "q": "Antibiotics work on…",
          "type": "multi",
          "options": [
            "bacteria (not viruses)",
            "viruses only",
            "all pathogens equally always",
            "only fungi always"
          ],
          "answer": 0,
          "explain": "bacterial.",
          "stage": "both"
        },
        {
          "q": "Meiosis produces…",
          "type": "multi",
          "options": [
            "gametes with half the chromosomes",
            "identical body cells only",
            "only proteins",
            "only ATP"
          ],
          "answer": 0,
          "explain": "haploid gametes.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Aerobic vs anaerobic respiration; oxygen debt idea.",
          "Homeostasis: blood glucose and temperature control overview."
        ],
        "practice": [
          {
            "q": "Anaerobic in muscles produces…",
            "type": "multi",
            "options": [
              "lactic acid",
              "only oxygen",
              "only glucose",
              "chlorophyll"
            ],
            "answer": 0,
            "explain": "lactic acid.",
            "stage": "both"
          }
        ]
      }
    },
    "chemistry": {
      "title": "Higher Chemistry",
      "blurb": "Bonding, electrolysis intro, energy changes and rates.",
      "videoKey": "chemistry",
      "teach": {
        "points": [
          "Electrolysis: ions move; reduction at cathode, oxidation at anode.",
          "Rates: collision theory — concentration, temperature, surface area, catalyst.",
          "Exothermic: energy released; endothermic: energy absorbed."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "Catalyst lowers activation energy; not used up."
        ]
      },
      "practice": [
        {
          "q": "Catalyst effect?",
          "type": "multi",
          "options": [
            "lowers activation energy",
            "is used up as reactant",
            "always slows reaction",
            "removes products only"
          ],
          "answer": 0,
          "explain": "Ea down.",
          "stage": "both"
        },
        {
          "q": "Oxidation (in terms of electrons) is…",
          "type": "multi",
          "options": [
            "loss of electrons",
            "gain of electrons",
            "gain of neutrons",
            "loss of protons only"
          ],
          "answer": 0,
          "explain": "OIL RIG.",
          "stage": "both"
        },
        {
          "q": "At the cathode in electrolysis…",
          "type": "multi",
          "options": [
            "reduction (gain e⁻)",
            "oxidation only",
            "nothing",
            "only gases from air"
          ],
          "answer": 0,
          "explain": "reduction.",
          "stage": "both"
        },
        {
          "q": "Increasing temperature increases rate because…",
          "type": "multi",
          "options": [
            "more frequent successful collisions / higher energy",
            "particles disappear",
            "volume always doubles reaction",
            "catalyst is created"
          ],
          "answer": 0,
          "explain": "collision theory.",
          "stage": "both"
        },
        {
          "q": "Metallic bonding: outer electrons are…",
          "type": "multi",
          "options": [
            "delocalised",
            "fixed to one atom only always",
            "missing",
            "protons"
          ],
          "answer": 0,
          "explain": "sea of electrons.",
          "stage": "both"
        },
        {
          "q": "Dynamic equilibrium means…",
          "type": "multi",
          "options": [
            "forward and reverse rates equal",
            "reaction stopped",
            "only products exist",
            "no closed system needed"
          ],
          "answer": 0,
          "explain": "equal rates.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Electrolysis: ions move; reduction at cathode, oxidation at anode.",
          "Rates: collision theory — concentration, temperature, surface area, catalyst."
        ],
        "practice": [
          {
            "q": "Catalyst effect?",
            "type": "multi",
            "options": [
              "lowers activation energy",
              "is used up as reactant",
              "always slows reaction",
              "removes products only"
            ],
            "answer": 0,
            "explain": "Ea down.",
            "stage": "both"
          }
        ]
      }
    },
    "physics": {
      "title": "Higher Physics",
      "blurb": "Forces & motion maths, waves, electromagnetism intro.",
      "videoKey": "physics",
      "teach": {
        "points": [
          "a = Δv/t ; F = ma ; W = mg (near Earth).",
          "Wave equation v=fλ; EM spectrum order and uses.",
          "Motor effect / electromagnetic induction overview (Higher)."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "F=ma: 3 kg at 2 m/s² → F=6 N"
        ]
      },
      "practice": [
        {
          "q": "F if m=3 kg and a=2 m/s²?",
          "type": "typed",
          "answer": "6",
          "explain": "F=ma=6 N.",
          "accept": [
            "6",
            "6N",
            "6 N"
          ],
          "stage": "both"
        },
        {
          "q": "Weight is…",
          "type": "multi",
          "options": [
            "mass × g",
            "mass only",
            "volume",
            "density only"
          ],
          "answer": 0,
          "explain": "W=mg.",
          "stage": "both"
        },
        {
          "q": "Longest wavelength EM wave (typical list)?",
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
          "q": "Ionising radiation examples include…",
          "type": "multi",
          "options": [
            "gamma / X-ray / UV (higher energy)",
            "radio only",
            "visible only",
            "sound"
          ],
          "answer": 0,
          "explain": "high energy EM.",
          "stage": "both"
        },
        {
          "q": "Terminal velocity: forces are…",
          "type": "multi",
          "options": [
            "balanced",
            "unbalanced forever",
            "zero mass",
            "only magnetic"
          ],
          "answer": 0,
          "explain": "balanced → a=0.",
          "stage": "both"
        },
        {
          "q": "Transformer equation links…",
          "type": "multi",
          "options": [
            "Vp/Vs = Np/Ns",
            "only currents equal always",
            "mass and weight",
            "speed and time only"
          ],
          "answer": 0,
          "explain": "turns ratio.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "a = Δv/t ; F = ma ; W = mg (near Earth).",
          "Wave equation v=fλ; EM spectrum order and uses."
        ],
        "practice": [
          {
            "q": "F if m=3 kg and a=2 m/s²?",
            "type": "typed",
            "answer": "6",
            "explain": "F=ma=6 N.",
            "accept": [
              "6",
              "6N",
              "6 N"
            ],
            "stage": "both"
          }
        ]
      }
    },
    "method": {
      "title": "Higher WS & practicals",
      "blurb": "Uncertainty, graphs and required practical reasoning.",
      "videoKey": "method",
      "teach": {
        "points": [
          "Estimate uncertainty; percentage uncertainty = (uncertainty/value)×100%.",
          "Identify systematic vs random errors.",
          "Justify improvements linked to accuracy/precision."
        ],
        "visual": ""
      },
      "example": {
        "title": "Worked example",
        "steps": [
          "% uncertainty = (abs uncertainty / measurement) × 100"
        ]
      },
      "practice": [
        {
          "q": "Systematic error…",
          "type": "multi",
          "options": [
            "shifts results consistently",
            "scatters randomly only",
            "is always zero",
            "removes units"
          ],
          "answer": 0,
          "explain": "consistent bias.",
          "stage": "both"
        },
        {
          "q": "% uncertainty of 5.0 ± 0.1?",
          "type": "multi",
          "options": [
            "2%",
            "0.1%",
            "5%",
            "10%"
          ],
          "answer": 0,
          "explain": "0.1/5.0 ×100 = 2%.",
          "stage": "both"
        },
        {
          "q": "Random errors reduced by…",
          "type": "multi",
          "options": [
            "repeats and averaging",
            "one hurried reading",
            "changing IV randomly",
            "removing table"
          ],
          "answer": 0,
          "explain": "repeats.",
          "stage": "both"
        },
        {
          "q": "A graph that should go through origin but doesn't may show…",
          "type": "multi",
          "options": [
            "systematic error / zero error",
            "perfect accuracy",
            "no relationship possible",
            "only categoric data"
          ],
          "answer": 0,
          "explain": "offset.",
          "stage": "both"
        },
        {
          "q": "Control variable must be…",
          "type": "multi",
          "options": [
            "kept constant",
            "changed each trial",
            "ignored",
            "the DV"
          ],
          "answer": 0,
          "explain": "constant.",
          "stage": "both"
        },
        {
          "q": "Valid conclusion is…",
          "type": "multi",
          "options": [
            "supported by the data and method limits",
            "any opinion",
            "only a guess",
            "unrelated to IV"
          ],
          "answer": 0,
          "explain": "data-linked.",
          "stage": "both"
        }
      ],
      "struggle": {
        "points": [
          "Estimate uncertainty; percentage uncertainty = (uncertainty/value)×100%.",
          "Identify systematic vs random errors."
        ],
        "practice": [
          {
            "q": "Systematic error…",
            "type": "multi",
            "options": [
              "shifts results consistently",
              "scatters randomly only",
              "is always zero",
              "removes units"
            ],
            "answer": 0,
            "explain": "consistent bias.",
            "stage": "both"
          }
        ]
      }
    }
  }
};
