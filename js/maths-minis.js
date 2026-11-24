/**
 * Stage 2 maths teach-pattern roll-out.
 * Builds a mini-lesson (goal, ready check, teach, worked example,
 * guided practice with hints, existing practice, end check) for every
 * maths skill and stage that has extras. Unique ready / guided /
 * exit questions are used so they do not repeat in the practice set.
 * Explicit MINI_LESSONS entries still win.
 */
const MATHS_MINI_EXTRAS = {
  "number:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what number comes after 29?",
        "answer": "30",
        "explain": "29, then 30.",
        "hint": "Count on one."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 17 is how many tens and how many ones? Write it like 1 ten and 7 ones.",
        "answer": "1 ten and 7 ones",
        "explain": "17 is 1 ten and 7 ones.",
        "hint": "Split into tens and ones.",
        "accept": [
          "1 ten and 7 ones",
          "1 ten 7 ones",
          "1 ten and 7"
        ]
      },
      {
        "type": "multi",
        "q": "Guided: which is greater, 26 or 62?",
        "options": [
          "26",
          "62"
        ],
        "answer": 1,
        "explain": "62 has 6 tens, so it is greater.",
        "hint": "Compare the tens first."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: how many ones are in 48?",
      "answer": "8",
      "explain": "48 is 4 tens and 8 ones.",
      "hint": "Look at the ones digit."
    }
  },
  "number:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is 400 + 70 + 6?",
        "answer": "476",
        "explain": "4 hundreds, 7 tens and 6 ones make 476.",
        "hint": "Build the number from each column."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: what is 308 in hundreds, tens and ones? Write 3 hundreds, 0 tens and 8 ones.",
        "answer": "3 hundreds, 0 tens and 8 ones",
        "explain": "The 0 means there are no tens.",
        "hint": "Do not skip the zero tens.",
        "accept": [
          "3 hundreds, 0 tens and 8 ones",
          "3 hundreds 0 tens and 8 ones"
        ]
      },
      {
        "type": "multi",
        "q": "Guided: which number is 6 thousands, 0 hundreds, 2 tens and 5 ones?",
        "options": [
          "625",
          "6025",
          "6520"
        ],
        "answer": 1,
        "explain": "6 thousands, 0 hundreds, 2 tens and 5 ones is 6025.",
        "hint": "Write the digits in their columns."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: what number is 9 thousands and 4 tens?",
      "answer": "9040",
      "explain": "9 thousands and 4 tens is 9040. The hundreds and ones are 0.",
      "hint": "Keep a 0 in the empty columns."
    }
  },
  "number:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: which digit is in the tenths place in 15.47?",
        "answer": "4",
        "explain": "15.47 has 4 tenths and 7 hundredths.",
        "hint": "Just after the decimal point is tenths."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: write 3 + 2/10 + 6/100 as a decimal.",
        "answer": "3.26",
        "explain": "3 and 2 tenths and 6 hundredths is 3.26.",
        "hint": "The first decimal digit is tenths."
      },
      {
        "type": "multi",
        "q": "Guided: which is larger, 0.8 or 0.75?",
        "options": [
          "0.75",
          "0.8"
        ],
        "answer": 1,
        "explain": "0.8 is 80 hundredths, and 0.75 is 75 hundredths.",
        "hint": "Compare tenths first."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: write four and nine hundredths as a decimal.",
      "answer": "4.09",
      "explain": "4 and 9 hundredths is 4.09. The tenths place is 0.",
      "hint": "Do not miss the 0 in the tenths place."
    }
  },
  "number:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is 7 × 10³ as an ordinary number?",
        "answer": "7000",
        "explain": "10³ is 1000, so 7 × 1000 = 7000.",
        "hint": "10³ means 10 × 10 × 10."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: write 0.045 in standard form.",
        "answer": "4.5 × 10^-2",
        "explain": "Move the point 2 places to get 4.5, so × 10⁻².",
        "hint": "One digit should sit before the point.",
        "accept": [
          "4.5 × 10^-2",
          "4.5x10^-2",
          "4.5 × 10⁻²",
          "4.5e-2"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: work out 3.2 × 10⁴ as an ordinary number.",
        "answer": "32000",
        "explain": "Move the point 4 places: 32000.",
        "hint": "The 4 tells you how many places to move."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: write 81000 in standard form.",
      "answer": "8.1 × 10^4",
      "explain": "8.1 × 10⁴, because the point moved 4 places.",
      "hint": "Keep one non-zero digit before the point.",
      "accept": [
        "8.1 × 10^4",
        "8.1x10^4",
        "8.1 × 10⁴",
        "8.1e4"
      ]
    }
  },
  "number:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: round 847 to the nearest 10.",
        "answer": "850",
        "explain": "47 is closer to 50 than to 40, so 850.",
        "hint": "Look at the ones digit."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: bound 6.28 to 1 decimal place.",
        "answer": "6.3",
        "explain": "The 8 in the hundredths place rounds the 2 up to 3.",
        "hint": "Look one digit to the right of the place you want."
      },
      {
        "type": "typed",
        "q": "Guided: what is 2.4 × 10⁻³ as an ordinary number?",
        "answer": "0.0024",
        "explain": "Move the point 3 places left: 0.0024.",
        "hint": "A negative power means a smaller number."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: round 3.14159 to 3 decimal places.",
      "answer": "3.142",
      "explain": "The 5 in the next place rounds the 1 up.",
      "hint": "Look at the digit after the third decimal place."
    }
  },
  "number:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: round 2460 to the nearest 100.",
        "answer": "2500",
        "explain": "460 is at least 50, so it rounds up to 2500.",
        "hint": "Look at the tens digit."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: write 1/8 as a decimal.",
        "answer": "0.125",
        "explain": "1 ÷ 8 = 0.125.",
        "hint": "Divide the top by the bottom."
      },
      {
        "type": "multi",
        "q": "Guided: 4.07 × 10² is which ordinary number?",
        "options": [
          "40.7",
          "407",
          "4070"
        ],
        "answer": 1,
        "explain": "Move the point 2 places: 407.",
        "hint": "The power tells you the place-value move."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: write 0.00056 in standard form.",
      "answer": "5.6 × 10^-4",
      "explain": "5.6 × 10⁻⁴.",
      "hint": "Count how many places the point moved.",
      "accept": [
        "5.6 × 10^-4",
        "5.6x10^-4",
        "5.6 × 10⁻⁴",
        "5.6e-4"
      ]
    }
  },
  "operations:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is 9 + 6?",
        "answer": "15",
        "explain": "9 + 6 = 15.",
        "hint": "Count on from 9."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: what is 14 − 5?",
        "answer": "9",
        "explain": "14 − 5 = 9.",
        "hint": "Count back, or use a number line."
      },
      {
        "type": "typed",
        "q": "Guided: there are 3 groups of 4 stickers. How many stickers?",
        "answer": "12",
        "explain": "3 × 4 = 12.",
        "hint": "Times means equal groups."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: what is 8 + 7?",
      "answer": "15",
      "explain": "8 + 7 = 15.",
      "hint": "Make 10 first: 8 + 2 = 10, then 5 more is 15."
    }
  },
  "operations:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is 7 × 8?",
        "answer": "56",
        "explain": "7 × 8 = 56.",
        "hint": "Think of 7 × 4 = 28, then double it."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: what is 46 + 27?",
        "answer": "73",
        "explain": "40 + 20 = 60 and 6 + 7 = 13, so 73.",
        "hint": "Add tens, then ones."
      },
      {
        "type": "typed",
        "q": "Guided: what is 81 − 36?",
        "answer": "45",
        "explain": "81 − 30 = 51, then 51 − 6 = 45.",
        "hint": "Subtract the tens first."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 56 sweets shared equally between 7 children. How many each?",
      "answer": "8",
      "explain": "56 ÷ 7 = 8.",
      "hint": "How many 7s make 56?"
    }
  },
  "operations:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is 12 × 11?",
        "answer": "132",
        "explain": "12 × 10 = 120, plus one more 12 is 132.",
        "hint": "Use 12 × 10, then add 12."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: work out 306 − 148.",
        "answer": "158",
        "explain": "306 − 100 = 206, 206 − 40 = 166, 166 − 8 = 158.",
        "hint": "Subtract in parts."
      },
      {
        "type": "typed",
        "q": "Guided: what is 25 × 16?",
        "answer": "400",
        "explain": "25 × 4 = 100, and 16 = 4 × 4, so 25 × 16 = 400.",
        "hint": "4 lots of 25 make 100."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 144 ÷ 9 = ?",
      "answer": "16",
      "explain": "9 × 16 = 144.",
      "hint": "9 × 10 = 90, 9 × 6 = 54, and 90 + 54 = 144."
    }
  },
  "operations:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is −3 + 8?",
        "answer": "5",
        "explain": "From −3, count up 8 to land on 5.",
        "hint": "A number line helps with negatives."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: work out 2.7 + 3.45.",
        "answer": "6.15",
        "explain": "Line up the decimal points: 2.70 + 3.45 = 6.15.",
        "hint": "Keep the point in line."
      },
      {
        "type": "typed",
        "q": "Guided: what is −6 − 5?",
        "answer": "-11",
        "explain": "Starting at −6 and going 5 further down is −11.",
        "hint": "Further down the number line.",
        "accept": [
          "-11",
          "−11"
        ]
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: what is 0.6 × 0.4?",
      "answer": "0.24",
      "explain": "6 × 4 = 24, and two decimal places in total give 0.24.",
      "hint": "Count the decimal places."
    }
  },
  "operations:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: evaluate 3² + 4².",
        "answer": "25",
        "explain": "9 + 16 = 25.",
        "hint": "Square first, then add."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: work out 2.4 ÷ 0.3.",
        "answer": "8",
        "explain": "2.4 ÷ 0.3 is the same as 24 ÷ 3 = 8.",
        "hint": "Multiply both by 10 first."
      },
      {
        "type": "typed",
        "q": "Guided: what is 5 − −3?",
        "answer": "8",
        "explain": "Subtracting a negative is adding, so 5 + 3 = 8.",
        "hint": "Two minuses together make a plus."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: calculate 7³.",
      "answer": "343",
      "explain": "7 × 7 = 49, and 49 × 7 = 343.",
      "hint": "A cube is the number times itself, three times."
    }
  },
  "operations:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: work out 2⁵.",
        "answer": "32",
        "explain": "2 × 2 × 2 × 2 × 2 = 32.",
        "hint": "Five factors of 2."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: evaluate 3/5 of 80.",
        "answer": "48",
        "explain": "One fifth of 80 is 16, so three fifths is 48.",
        "hint": "Divide by 5, then multiply by 3."
      },
      {
        "type": "typed",
        "q": "Guided: what is 1.6 × 10² + 4 × 10¹?",
        "answer": "200",
        "explain": "160 + 40 = 200.",
        "hint": "Write as ordinary numbers first."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: work out (−4) × (−6).",
      "answer": "24",
      "explain": "A negative times a negative is positive: 24.",
      "hint": "Same signs make a positive."
    }
  },
  "fractions:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is half of 16?",
        "answer": "8",
        "explain": "Half of 16 is 8.",
        "hint": "Share 16 into 2 equal parts."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: a quarter of 8 counters is how many?",
        "options": [
          "2",
          "4",
          "6"
        ],
        "answer": 0,
        "explain": "A quarter of 8 is 2.",
        "hint": "Split into 4 equal groups."
      },
      {
        "type": "typed",
        "q": "Guided: what is 1/4 of 20?",
        "answer": "5",
        "explain": "20 ÷ 4 = 5.",
        "hint": "Divide by the bottom number."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: two quarters of 12 is the same as how many?",
      "answer": "6",
      "explain": "Two quarters is a half, and half of 12 is 6.",
      "hint": "Simplify two quarters first if you want."
    }
  },
  "fractions:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is 2/5 of 20?",
        "answer": "8",
        "explain": "A fifth of 20 is 4, so two fifths is 8.",
        "hint": "Divide by 5, then multiply by 2."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 1/3 + 1/3 = ?",
        "answer": "2/3",
        "explain": "Same denominators: add the tops, 1 + 1 = 2.",
        "hint": "Keep the bottom the same.",
        "accept": [
          "2/3",
          "2 / 3"
        ]
      },
      {
        "type": "multi",
        "q": "Guided: which is equivalent to 1/2?",
        "options": [
          "2/5",
          "3/6",
          "3/8"
        ],
        "answer": 1,
        "explain": "3/6 simplifies to 1/2.",
        "hint": "Times or divide the top and bottom by the same number."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: work out 3/8 + 2/8.",
      "answer": "5/8",
      "explain": "Same denominator: 3 + 2 = 5, so 5/8.",
      "hint": "Add the numerators only.",
      "accept": [
        "5/8",
        "5 / 8"
      ]
    }
  },
  "fractions:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: write a fraction equivalent to 2/3 with denominator 12.",
        "answer": "8/12",
        "explain": "2/3 × 4/4 = 8/12.",
        "hint": "12 ÷ 3 = 4, so multiply top and bottom by 4.",
        "accept": [
          "8/12",
          "8 / 12"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: simplify 18/24.",
        "answer": "3/4",
        "explain": "Divide top and bottom by 6: 3/4.",
        "hint": "Find a common factor.",
        "accept": [
          "3/4",
          "3 / 4"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: what is 1/2 + 1/4?",
        "answer": "3/4",
        "explain": "1/2 = 2/4, so 2/4 + 1/4 = 3/4.",
        "hint": "Make the denominators the same first.",
        "accept": [
          "3/4",
          "3 / 4"
        ]
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: convert 0.4 to a fraction in its simplest form.",
      "answer": "2/5",
      "explain": "0.4 = 4/10 = 2/5.",
      "hint": "Write as tenths, then simplify.",
      "accept": [
        "2/5",
        "2 / 5"
      ]
    }
  },
  "fractions:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: simplify 45/60.",
        "answer": "3/4",
        "explain": "Divide by 15: 3/4.",
        "hint": "15 goes into both.",
        "accept": [
          "3/4",
          "3 / 4"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: work out 2/3 × 5/7.",
        "answer": "10/21",
        "explain": "Multiply tops and bottoms: 10/21.",
        "hint": "No need for a common denominator when multiplying.",
        "accept": [
          "10/21",
          "10 / 21"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: what is 15% of 60?",
        "answer": "9",
        "explain": "10% is 6 and 5% is 3, so 15% is 9.",
        "hint": "Split 15% into 10% and 5%."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: write 3/5 as a percentage.",
      "answer": "60",
      "explain": "3/5 = 0.6 = 60%.",
      "hint": "A fifth is 20%, so three fifths is 60%.",
      "accept": [
        "60",
        "60%"
      ]
    }
  },
  "fractions:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: work out 3/4 × 8/9.",
        "answer": "2/3",
        "explain": "24/36 simplifies to 2/3.",
        "hint": "Cancel before multiplying if you can.",
        "accept": [
          "2/3",
          "2 / 3"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: divide 2/3 by 4/5.",
        "answer": "5/6",
        "explain": "Keep 2/3, flip 4/5 to 5/4, then multiply: 10/12 = 5/6.",
        "hint": "Dividing by a fraction is multiplying by its reciprocal.",
        "accept": [
          "5/6",
          "5 / 6"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: increase 80 by 15%.",
        "answer": "92",
        "explain": "15% of 80 is 12, and 80 + 12 = 92.",
        "hint": "Find 15% first, then add."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: write 2/8 in its simplest form.",
      "answer": "1/4",
      "explain": "Divide top and bottom by 2.",
      "hint": "Find a common factor.",
      "accept": [
        "1/4",
        "1 / 4"
      ]
    }
  },
  "fractions:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a jumper costs £40. It is reduced by 20%. What is the new price, in pounds?",
        "answer": "32",
        "explain": "20% of 40 is 8, so the new price is 32.",
        "hint": "Find 20% first, then subtract."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: write 7/4 as a mixed number.",
        "answer": "1 3/4",
        "explain": "7 ÷ 4 is 1 remainder 3, so 1 3/4.",
        "hint": "How many wholes fit?",
        "accept": [
          "1 3/4",
          "1 3 / 4"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: share 120 in the ratio 1 : 5. What is the smaller share?",
        "answer": "20",
        "explain": "1 + 5 = 6 parts, and 120 ÷ 6 = 20.",
        "hint": "One part is 20."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 3/5 of a number is 24. What is the number?",
      "answer": "40",
      "explain": "One fifth is 8, so five fifths is 40.",
      "hint": "Divide 24 by 3, then multiply by 5."
    }
  },
  "algebra:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: the pattern is 2, 4, 6, 8, … What comes next?",
        "answer": "10",
        "explain": "It goes up by 2 each time, so 10.",
        "hint": "Look at the jump between numbers."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 5, 10, 15, 20, … What is the 6th term?",
        "answer": "30",
        "explain": "It is the 5 times table: 5 × 6 = 30.",
        "hint": "The 6th term is 6 jumps of 5 from 0."
      },
      {
        "type": "multi",
        "q": "Guided: which rule takes 3 to 9 and 4 to 12?",
        "options": [
          "add 6",
          "multiply by 3",
          "subtract 2"
        ],
        "answer": 1,
        "explain": "3 × 3 = 9 and 4 × 3 = 12.",
        "hint": "Test each rule on both numbers."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 1, 4, 7, 10, … What comes next?",
      "answer": "13",
      "explain": "It goes up by 3, so 13.",
      "hint": "Same jump each time."
    }
  },
  "algebra:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: if a bag has n pencils, what is 2 bags of pencils? Write 2n.",
        "answer": "2n",
        "explain": "2 lots of n is 2n.",
        "hint": "Lots of n means multiply.",
        "accept": [
          "2n",
          "2 n",
          "2*n"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: the nth term is n + 5. What is the 7th term?",
        "answer": "12",
        "explain": "7 + 5 = 12.",
        "hint": "Put 7 in place of n."
      },
      {
        "type": "typed",
        "q": "Guided: I think of a number, then add 4, and get 11. What was the number?",
        "answer": "7",
        "explain": "Work backwards: 11 − 4 = 7.",
        "hint": "Undo the add 4."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: if 3 boxes hold 18 apples, how many in one box?",
      "answer": "6",
      "explain": "18 ÷ 3 = 6.",
      "hint": "Share equally."
    }
  },
  "algebra:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: solve x + 7 = 15. What is x?",
        "answer": "8",
        "explain": "x = 15 − 7 = 8.",
        "hint": "Undo the + 7."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: solve 2y = 18. What is y?",
        "answer": "9",
        "explain": "Divide both sides by 2: y = 9.",
        "hint": "Undo the × 2."
      },
      {
        "type": "typed",
        "q": "Guided: the nth term is 3n + 1. What is the 5th term?",
        "answer": "16",
        "explain": "3 × 5 + 1 = 16.",
        "hint": "Do the multiply first."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: solve x − 9 = 4. What is x?",
      "answer": "13",
      "explain": "Add 9 to both sides: x = 13.",
      "hint": "Undo the subtract 9."
    }
  },
  "algebra:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: solve 4x = 28. What is x?",
        "answer": "7",
        "explain": "Divide both sides by 4.",
        "hint": "Undo the multiply."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: solve 2x + 5 = 17. What is x?",
        "answer": "6",
        "explain": "2x = 12, so x = 6.",
        "hint": "Subtract 5 first, then divide by 2."
      },
      {
        "type": "typed",
        "q": "Guided: expand 4(x + 3).",
        "answer": "4x+12",
        "explain": "4 × x and 4 × 3.",
        "hint": "Multiply both terms by 4.",
        "accept": [
          "4x+12",
          "4x + 12",
          "12+4x"
        ]
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: solve 5x − 8 = 17. What is x?",
      "answer": "5",
      "explain": "5x = 25, so x = 5.",
      "hint": "Add 8, then divide by 5."
    }
  },
  "algebra:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: expand 2(3x − 4).",
        "answer": "6x-8",
        "explain": "2 × 3x = 6x and 2 × −4 = −8.",
        "hint": "Watch the minus.",
        "accept": [
          "6x-8",
          "6x − 8",
          "6x - 8"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: solve 3x + 4 = x + 16. What is x?",
        "answer": "6",
        "explain": "Take x from both sides: 2x + 4 = 16, so 2x = 12, x = 6.",
        "hint": "Collect the x terms on one side."
      },
      {
        "type": "typed",
        "q": "Guided: factorise 6x + 9.",
        "answer": "3(2x+3)",
        "explain": "3 is common: 3(2x + 3).",
        "hint": "Take out the highest common factor.",
        "accept": [
          "3(2x+3)",
          "3(2x + 3)",
          "3(3+2x)"
        ]
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: solve 2(x + 3) = 14. What is x?",
      "answer": "4",
      "explain": "2x + 6 = 14, so 2x = 8, x = 4.",
      "hint": "Expand first, or divide both sides by 2."
    }
  },
  "algebra:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: expand (x + 3)(x + 2).",
        "answer": "x^2+5x+6",
        "explain": "x² + 2x + 3x + 6 = x² + 5x + 6.",
        "hint": "Use FOIL or a grid.",
        "accept": [
          "x^2+5x+6",
          "x² + 5x + 6",
          "x^2 + 5x + 6"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: factorise x² + 7x + 10.",
        "answer": "(x+2)(x+5)",
        "explain": "2 and 5 multiply to 10 and add to 7.",
        "hint": "Find the two numbers first.",
        "accept": [
          "(x+2)(x+5)",
          "(x+5)(x+2)",
          "(x + 2)(x + 5)",
          "(x + 5)(x + 2)"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: solve 4x − 1 = 2x + 9. What is x?",
        "answer": "5",
        "explain": "2x = 10, so x = 5.",
        "hint": "Collect like terms."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: the nth term is 2n − 3. What is the 10th term?",
      "answer": "17",
      "explain": "2 × 10 − 3 = 17.",
      "hint": "Put 10 in place of n."
    }
  },
  "geometry:1": {
    "prereq": [
      {
        "type": "multi",
        "q": "Ready check: how many sides does a triangle have?",
        "options": [
          "3",
          "4",
          "5"
        ],
        "answer": 0,
        "explain": "A triangle has 3 sides.",
        "hint": "Tri means three."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which shape has 4 equal sides and 4 right angles?",
        "options": [
          "rectangle that is not a square",
          "square",
          "pentagon"
        ],
        "answer": 1,
        "explain": "A square has equal sides and right angles.",
        "hint": "A rectangle can have unequal sides."
      },
      {
        "type": "typed",
        "q": "Guided: how many vertices does a cube have?",
        "answer": "8",
        "explain": "A cube has 8 corners.",
        "hint": "Count the corners of a dice."
      }
    ],
    "exit": {
      "type": "multi",
      "q": "End check: which of these is a hexagon?",
      "options": [
        "4 sides",
        "5 sides",
        "6 sides"
      ],
      "answer": 2,
      "explain": "A hexagon has 6 sides.",
      "hint": "Hex means six."
    }
  },
  "geometry:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a rectangle is 8 cm by 3 cm. What is its area in cm²?",
        "answer": "24",
        "explain": "8 × 3 = 24 cm².",
        "hint": "Area of a rectangle is length times width."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: the same 8 cm by 3 cm rectangle. What is its perimeter in cm?",
        "answer": "22",
        "explain": "8 + 3 + 8 + 3 = 22.",
        "hint": "Add all four sides."
      },
      {
        "type": "multi",
        "q": "Guided: a right angle is how many degrees?",
        "options": [
          "45",
          "90",
          "180"
        ],
        "answer": 1,
        "explain": "A right angle is 90°.",
        "hint": "The corner of a square."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a square has side 6 cm. What is its area in cm²?",
      "answer": "36",
      "explain": "6 × 6 = 36.",
      "hint": "A square is a rectangle with equal sides."
    }
  },
  "geometry:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: angles on a straight line add to how many degrees?",
        "answer": "180",
        "explain": "A straight line is 180°.",
        "hint": "Half of a full turn is 180°."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: two angles on a straight line are 65° and x. What is x?",
        "answer": "115",
        "explain": "180 − 65 = 115.",
        "hint": "They add to 180°."
      },
      {
        "type": "multi",
        "q": "Guided: a triangle has angles 50°, 60° and x. What is x?",
        "options": [
          "70°",
          "80°",
          "90°"
        ],
        "answer": 0,
        "explain": "Angles in a triangle add to 180°, so x = 70°.",
        "hint": "Add 50 and 60, then take from 180."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a right-angled triangle has another angle of 35°. What is the third angle, in degrees?",
      "answer": "55",
      "explain": "180 − 90 − 35 = 55.",
      "hint": "Right-angled means 90° is already used."
    }
  },
  "geometry:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a triangle has base 10 cm and height 6 cm. What is its area in cm²?",
        "answer": "30",
        "explain": "Area = ½ × base × height = 30.",
        "hint": "Half of 10 × 6."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: a parallelogram has base 9 cm and height 4 cm. What is its area in cm²?",
        "answer": "36",
        "explain": "Area = base × height = 36.",
        "hint": "Do not use the sloping side as the height."
      },
      {
        "type": "typed",
        "q": "Guided: the area of a triangle is 24 cm² and the base is 8 cm. What is the height in cm?",
        "answer": "6",
        "explain": "½ × 8 × h = 24, so 4h = 24, h = 6.",
        "hint": "Work backwards from the area formula."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a rectangle is 12 cm by 5 cm. What is its area in cm²?",
      "answer": "60",
      "explain": "12 × 5 = 60.",
      "hint": "Length times width."
    }
  },
  "geometry:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: angles in a triangle add to how many degrees?",
        "answer": "180",
        "explain": "Always 180°.",
        "hint": "This stays true for every triangle."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: a right-angled triangle has short sides 5 cm and 12 cm. What is the hypotenuse in cm?",
        "answer": "13",
        "explain": "5² + 12² = 25 + 144 = 169, and √169 = 13.",
        "hint": "Pythagoras: a² + b² = c²."
      },
      {
        "type": "typed",
        "q": "Guided: an isosceles triangle has angles 70°, 70° and x. What is x?",
        "answer": "40",
        "explain": "180 − 70 − 70 = 40.",
        "hint": "The two equal angles are already given."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a square of area 50 cm² is cut in half by a diagonal. What is the area of one triangle, in cm²?",
      "answer": "25",
      "explain": "The diagonal splits the square into two equal triangles, so 25.",
      "hint": "Half of the square."
    }
  },
  "geometry:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a circle has radius 7 cm. Using π = 22/7, what is the circumference in cm?",
        "answer": "44",
        "explain": "C = 2πr = 2 × 22/7 × 7 = 44.",
        "hint": "The 7s cancel."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: using π = 3.14, a circle of radius 10 cm has area, to the nearest whole cm², of?",
        "answer": "314",
        "explain": "πr² = 3.14 × 100 = 314.",
        "hint": "Square the radius first."
      },
      {
        "type": "typed",
        "q": "Guided: similar triangles are in the ratio 1 : 3. A short side of 4 cm matches a side of what length, in cm?",
        "answer": "12",
        "explain": "4 × 3 = 12.",
        "hint": "Multiply by the scale factor."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: an interior angle of a regular hexagon is how many degrees?",
      "answer": "120",
      "explain": "Interior = 180 − 360/6 = 120.",
      "hint": "Exterior 60°, so interior 120°."
    }
  },
  "data:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a pictogram uses 1 picture = 2 books. 3 pictures show how many books?",
        "answer": "6",
        "explain": "3 × 2 = 6.",
        "hint": "Each picture is 2."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: in a tally, a gate (5) plus 2 marks is how many?",
        "options": [
          "5",
          "6",
          "7"
        ],
        "answer": 2,
        "explain": "A five-bar gate plus 2 is 7.",
        "hint": "A gate is a group of 5."
      },
      {
        "type": "typed",
        "q": "Guided: 4 children chose apples, 2 chose pears. How many children were asked, if those were the only choices?",
        "answer": "6",
        "explain": "4 + 2 = 6.",
        "hint": "Add the groups."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a pictogram uses 1 symbol = 5 votes. 4 symbols show how many votes?",
      "answer": "20",
      "explain": "4 × 5 = 20.",
      "hint": "Multiply the number of symbols by 5."
    }
  },
  "data:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: the numbers 3, 5, 5, 7. What is the mode?",
        "answer": "5",
        "explain": "5 appears most often.",
        "hint": "Mode means most often."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: the numbers 4, 6 and 8. What is the mean?",
        "answer": "6",
        "explain": "4 + 6 + 8 = 18, and 18 ÷ 3 = 6.",
        "hint": "Add, then divide by how many numbers."
      },
      {
        "type": "typed",
        "q": "Guided: the numbers 2, 9, 4, 7. What is the range?",
        "answer": "7",
        "explain": "Largest 9 minus smallest 2 is 7.",
        "hint": "Range is biggest minus smallest."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: the numbers 10, 2, 6. What is the mean?",
      "answer": "6",
      "explain": "10 + 2 + 6 = 18, and 18 ÷ 3 = 6.",
      "hint": "Add, then divide by 3."
    }
  },
  "data:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: the numbers 1, 3, 7, 9. What is the median?",
        "answer": "5",
        "explain": "The middle of 3 and 7 is 5.",
        "hint": "Order them, then find the middle. For an even count, average the two middle numbers."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: a bar chart shows 8, 5 and 11. What is the total?",
        "answer": "24",
        "explain": "8 + 5 + 11 = 24.",
        "hint": "Add the bar heights."
      },
      {
        "type": "typed",
        "q": "Guided: the mean of 5 numbers is 6. What is their total?",
        "answer": "30",
        "explain": "5 × 6 = 30.",
        "hint": "Mean × count = total."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: the numbers 2, 2, 4, 8, 9. What is the median?",
      "answer": "4",
      "explain": "The middle number of the ordered list is 4.",
      "hint": "There are 5 numbers, so the 3rd is the median."
    }
  },
  "data:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: the numbers 3, 6, 6, 9, 11. What is the median?",
        "answer": "6",
        "explain": "The middle value is 6.",
        "hint": "Order first, then pick the middle."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: a spinner is fair with 5 equal sections. What is the probability of one named section, as a fraction?",
        "answer": "1/5",
        "explain": "One out of five equally likely results.",
        "hint": "Favourable over possible.",
        "accept": [
          "1/5",
          "1 / 5"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: the mean of 2, 5, x and 9 is 6. What is x?",
        "answer": "8",
        "explain": "The total is 24, and 2 + 5 + 9 = 16, so x = 8.",
        "hint": "Mean 6 over 4 numbers means a total of 24."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a bag has 3 red and 5 blue counters. Probability of red, as a fraction in its simplest form?",
      "answer": "3/8",
      "explain": "3 red out of 8 counters.",
      "hint": "Do not forget to add both colours.",
      "accept": [
        "3/8",
        "3 / 8"
      ]
    }
  },
  "data:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: two fair coins are flipped. Probability both are heads, as a fraction?",
        "answer": "1/4",
        "explain": "HH is one of four equally likely pairs: HH, HT, TH, TT.",
        "hint": "List the four outcomes.",
        "accept": [
          "1/4",
          "1 / 4"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: a frequency table has midpoints 10 and 20 with frequencies 3 and 7. What is the estimated total of all values?",
        "answer": "170",
        "explain": "3 × 10 + 7 × 20 = 30 + 140 = 170.",
        "hint": "Multiply each midpoint by its frequency."
      },
      {
        "type": "typed",
        "q": "Guided: P(A) = 0.3. What is P(not A)?",
        "answer": "0.7",
        "explain": "1 − 0.3 = 0.7.",
        "hint": "A and not A add to 1."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: the numbers 4, 8, 8, 10. What is the mean?",
      "answer": "7.5",
      "explain": "30 ÷ 4 = 7.5.",
      "hint": "Add, then divide by 4."
    }
  },
  "data:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a cumulative frequency of 40 reaches the 20th value at 12. If n = 40, what is the median?",
        "answer": "12",
        "explain": "The median is the 20th value, which is 12.",
        "hint": "For even n, the median sits at n/2 on the cumulative graph."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: P(A) = 1/2 and P(B) = 1/3, and A and B are independent. What is P(A and B)?",
        "answer": "1/6",
        "explain": "Multiply: 1/2 × 1/3 = 1/6.",
        "hint": "Independent means you multiply.",
        "accept": [
          "1/6",
          "1 / 6"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: a histogram bar from 0–10 has frequency 20. What is the frequency density?",
        "answer": "2",
        "explain": "Density = frequency ÷ class width = 20 ÷ 10 = 2.",
        "hint": "Divide by the width, not the midpoint."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: the interquartile range of a set with Q1 = 8 and Q3 = 17 is?",
      "answer": "9",
      "explain": "17 − 8 = 9.",
      "hint": "IQR is Q3 minus Q1."
    }
  },
  "y-place:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: how many ones are in 27?",
        "answer": "7",
        "explain": "27 is 2 tens and 7 ones.",
        "hint": "Look at the ones digit."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: how many tens are in 50?",
        "answer": "5",
        "explain": "50 is 5 tens.",
        "hint": "The tens digit is 5."
      },
      {
        "type": "multi",
        "q": "Guided: 14 is the same as?",
        "options": [
          "1 ten and 4 ones",
          "4 tens and 1 one",
          "14 tens"
        ],
        "answer": 0,
        "explain": "14 = 10 + 4.",
        "hint": "A ten and some ones."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: what number is 3 tens and 2 ones?",
      "answer": "32",
      "explain": "3 tens and 2 ones make 32.",
      "hint": "Write the tens digit first."
    }
  },
  "y-place:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: how many hundreds are in 650?",
        "answer": "6",
        "explain": "650 is 6 hundreds and 5 tens.",
        "hint": "Look at the hundreds digit."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: what number is 4 hundreds, 0 tens and 9 ones?",
        "answer": "409",
        "explain": "The 0 holds the tens place.",
        "hint": "Do not lose the zero."
      },
      {
        "type": "typed",
        "q": "Guided: 270 is how many tens?",
        "answer": "27",
        "explain": "270 = 27 tens.",
        "hint": "10 × 27 = 270."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: write 7 hundreds and 5 ones as a number.",
      "answer": "705",
      "explain": "7 hundreds and 5 ones is 705.",
      "hint": "Zero tens in the middle."
    }
  },
  "y-place:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: how many thousands are in 4080?",
        "answer": "4",
        "explain": "4080 has 4 thousands.",
        "hint": "Look at the thousands place."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: what number is 2 thousands, 6 tens and 0 ones?",
        "answer": "2060",
        "explain": "2 thousands, 0 hundreds, 6 tens, 0 ones.",
        "hint": "Keep a 0 in the hundreds place."
      },
      {
        "type": "multi",
        "q": "Guided: which digit is in the hundreds place in 5,714?",
        "options": [
          "5",
          "7",
          "1"
        ],
        "answer": 1,
        "explain": "5,714 has 7 hundreds.",
        "hint": "Hundreds sit one place left of the tens."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 9,004 has how many hundreds?",
      "answer": "0",
      "explain": "There are 0 hundreds in 9,004.",
      "hint": "The hundreds digit is 0."
    }
  },
  "y-bonds:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 6 + ? = 10. What is the missing number?",
        "answer": "4",
        "explain": "6 and 4 make 10.",
        "hint": "Number bonds to 10."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 3 + 7 = ?",
        "answer": "10",
        "explain": "3 + 7 = 10.",
        "hint": "A bond to 10."
      },
      {
        "type": "typed",
        "q": "Guided: 10 − 2 = ?",
        "answer": "8",
        "explain": "10 take away 2 is 8.",
        "hint": "The partner of 2 is 8."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: what do you add to 9 to make 10?",
      "answer": "1",
      "explain": "9 + 1 = 10.",
      "hint": "The bond partner of 9 is 1."
    }
  },
  "y-bonds:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 17 + ? = 20. What is the missing number?",
        "answer": "3",
        "explain": "17 + 3 = 20.",
        "hint": "Bonds to 20."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 20 − 8 = ?",
        "answer": "12",
        "explain": "20 take away 8 is 12.",
        "hint": "The partner of 8 in a bond to 20 is 12."
      },
      {
        "type": "typed",
        "q": "Guided: 45 + ? = 50. Missing number?",
        "answer": "5",
        "explain": "45 + 5 = 50.",
        "hint": "Think of a bond to the next ten."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 100 − 40 = ?",
      "answer": "60",
      "explain": "A bond to 100: 40 and 60.",
      "hint": "Tens that add to 10 tens."
    }
  },
  "y-bonds:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 72 + ? = 100. Missing number?",
        "answer": "28",
        "explain": "72 + 28 = 100.",
        "hint": "72 + 8 = 80, then + 20 = 100."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 250 + ? = 300. Missing number?",
        "answer": "50",
        "explain": "250 + 50 = 300.",
        "hint": "A bond to the next hundred."
      },
      {
        "type": "typed",
        "q": "Guided: 1000 − 350 = ?",
        "answer": "650",
        "explain": "350 + 650 = 1000.",
        "hint": "Think 1000 − 300 = 700, then take 50."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 64 + 36 = ?",
      "answer": "100",
      "explain": "64 + 36 = 100.",
      "hint": "A bond to 100."
    }
  },
  "y-add:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is 8 + 5?",
        "answer": "13",
        "explain": "8 + 2 = 10, then 3 more is 13.",
        "hint": "Make 10 first."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 11 + 6 = ?",
        "answer": "17",
        "explain": "11 + 6 = 17.",
        "hint": "Count on from 11."
      },
      {
        "type": "typed",
        "q": "Guided: 9 + 9 = ?",
        "answer": "18",
        "explain": "Double 9 is 18.",
        "hint": "A double."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 7 + 8 = ?",
      "answer": "15",
      "explain": "7 + 8 = 15.",
      "hint": "7 + 3 = 10, then 5 more."
    }
  },
  "y-add:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 38 + 25 = ?",
        "answer": "63",
        "explain": "38 + 20 = 58, plus 5 is 63.",
        "hint": "Add the tens, then the ones."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 57 + 19 = ?",
        "answer": "76",
        "explain": "57 + 20 = 77, then take 1: 76.",
        "hint": "19 is 20 minus 1."
      },
      {
        "type": "typed",
        "q": "Guided: 64 + 28 = ?",
        "answer": "92",
        "explain": "60 + 20 = 80 and 4 + 8 = 12, so 92.",
        "hint": "Add tens and ones separately."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 46 + 37 = ?",
      "answer": "83",
      "explain": "40 + 30 = 70 and 6 + 7 = 13, so 83.",
      "hint": "Watch the ones crossing 10."
    }
  },
  "y-add:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 248 + 176 = ?",
        "answer": "424",
        "explain": "248 + 100 = 348, + 70 = 418, + 6 = 424.",
        "hint": "Add in parts."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 509 + 286 = ?",
        "answer": "795",
        "explain": "509 + 200 = 709, + 80 = 789, + 6 = 795.",
        "hint": "Keep the place values lined up."
      },
      {
        "type": "typed",
        "q": "Guided: 3.6 + 2.75 = ?",
        "answer": "6.35",
        "explain": "Line up the points: 3.60 + 2.75 = 6.35.",
        "hint": "A 0 in the hundredths place can help."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 399 + 125 = ?",
      "answer": "524",
      "explain": "399 + 1 = 400, then 400 + 124 = 524.",
      "hint": "399 is 1 less than 400."
    }
  },
  "y-sub:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 13 − 5 = ?",
        "answer": "8",
        "explain": "13 − 5 = 8.",
        "hint": "Count back, or use a number line."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 15 − 7 = ?",
        "answer": "8",
        "explain": "15 − 7 = 8.",
        "hint": "7 + 8 = 15."
      },
      {
        "type": "typed",
        "q": "Guided: 10 − 6 = ?",
        "answer": "4",
        "explain": "10 − 6 = 4.",
        "hint": "A bond to 10."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 16 − 9 = ?",
      "answer": "7",
      "explain": "16 − 9 = 7.",
      "hint": "9 + 7 = 16."
    }
  },
  "y-sub:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 50 − 18 = ?",
        "answer": "32",
        "explain": "50 − 10 = 40, then 40 − 8 = 32.",
        "hint": "Subtract tens, then ones."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 73 − 26 = ?",
        "answer": "47",
        "explain": "73 − 20 = 53, then 53 − 6 = 47.",
        "hint": "Partition the 26."
      },
      {
        "type": "typed",
        "q": "Guided: 80 − 35 = ?",
        "answer": "45",
        "explain": "80 − 30 = 50, then 50 − 5 = 45.",
        "hint": "Subtract in parts."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 61 − 19 = ?",
      "answer": "42",
      "explain": "61 − 20 = 41, then add 1 back: 42.",
      "hint": "19 is 20 minus 1."
    }
  },
  "y-sub:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 400 − 167 = ?",
        "answer": "233",
        "explain": "400 − 100 = 300, 300 − 60 = 240, 240 − 7 = 233.",
        "hint": "Subtract in parts."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 702 − 348 = ?",
        "answer": "354",
        "explain": "702 − 300 = 402, 402 − 40 = 362, 362 − 8 = 354.",
        "hint": "Watch the zeros."
      },
      {
        "type": "typed",
        "q": "Guided: 6.4 − 2.15 = ?",
        "answer": "4.25",
        "explain": "6.40 − 2.15 = 4.25.",
        "hint": "Line up the decimal points."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 1000 − 276 = ?",
      "answer": "724",
      "explain": "1000 − 200 = 800, 800 − 70 = 730, 730 − 6 = 724.",
      "hint": "Or 999 − 276 = 723, then add 1."
    }
  },
  "y-count:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 2, 4, 6, 8, … What comes next?",
        "answer": "10",
        "explain": "Counting in 2s.",
        "hint": "The 2 times table."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 5, 10, 15, … What comes next?",
        "answer": "20",
        "explain": "Counting in 5s.",
        "hint": "The 5 times table."
      },
      {
        "type": "typed",
        "q": "Guided: 10, 20, 30, 40, … What comes next?",
        "answer": "50",
        "explain": "Counting in 10s.",
        "hint": "Add 10 each time."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 3, 6, 9, 12, … What comes next?",
      "answer": "15",
      "explain": "Counting in 3s.",
      "hint": "Add 3 each time."
    }
  },
  "y-count:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 4, 8, 12, 16, … What comes next?",
        "answer": "20",
        "explain": "Counting in 4s.",
        "hint": "The 4 times table."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 6 × 9 = ?",
        "answer": "54",
        "explain": "6 × 9 = 54.",
        "hint": "6 × 10 = 60, then take 6."
      },
      {
        "type": "typed",
        "q": "Guided: 8 × 7 = ?",
        "answer": "56",
        "explain": "8 × 7 = 56.",
        "hint": "7 × 8 is the same."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 9 × 6 = ?",
      "answer": "54",
      "explain": "9 × 6 = 54.",
      "hint": "6 × 9 is the same fact."
    }
  },
  "y-count:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 12 × 8 = ?",
        "answer": "96",
        "explain": "12 × 8 = 96.",
        "hint": "10 × 8 = 80 and 2 × 8 = 16."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 7 × 12 = ?",
        "answer": "84",
        "explain": "7 × 10 = 70 and 7 × 2 = 14, so 84.",
        "hint": "Split 12 into 10 and 2."
      },
      {
        "type": "typed",
        "q": "Guided: 11 × 11 = ?",
        "answer": "121",
        "explain": "11 × 11 = 121.",
        "hint": "(10 + 1) × 11 = 110 + 11."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 15 × 6 = ?",
      "answer": "90",
      "explain": "10 × 6 = 60 and 5 × 6 = 30, so 90.",
      "hint": "Split 15 into 10 and 5."
    }
  },
  "y-share:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 12 sweets shared equally between 3 children. How many each?",
        "answer": "4",
        "explain": "12 ÷ 3 = 4.",
        "hint": "3 equal groups make 12."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 10 apples in pairs. How many pairs?",
        "answer": "5",
        "explain": "10 ÷ 2 = 5.",
        "hint": "Sharing into 2s."
      },
      {
        "type": "typed",
        "q": "Guided: 8 cakes, 4 plates, same number on each plate. How many on a plate?",
        "answer": "2",
        "explain": "8 ÷ 4 = 2.",
        "hint": "Equal groups."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 15 ÷ 5 = ?",
      "answer": "3",
      "explain": "15 ÷ 5 = 3.",
      "hint": "5 × 3 = 15."
    }
  },
  "y-share:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 36 ÷ 6 = ?",
        "answer": "6",
        "explain": "6 × 6 = 36.",
        "hint": "A times-table fact."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 45 ÷ 5 = ?",
        "answer": "9",
        "explain": "5 × 9 = 45.",
        "hint": "How many 5s in 45?"
      },
      {
        "type": "typed",
        "q": "Guided: 72 ÷ 8 = ?",
        "answer": "9",
        "explain": "8 × 9 = 72.",
        "hint": "The 8 times table."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 63 ÷ 7 = ?",
      "answer": "9",
      "explain": "7 × 9 = 63.",
      "hint": "The 7 times table."
    }
  },
  "y-share:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 144 ÷ 12 = ?",
        "answer": "12",
        "explain": "12 × 12 = 144.",
        "hint": "A square number."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 96 ÷ 6 = ?",
        "answer": "16",
        "explain": "6 × 16 = 96.",
        "hint": "6 × 10 = 60, 6 × 6 = 36."
      },
      {
        "type": "typed",
        "q": "Guided: 225 ÷ 15 = ?",
        "answer": "15",
        "explain": "15 × 15 = 225.",
        "hint": "15 × 10 = 150, 15 × 5 = 75."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 132 ÷ 11 = ?",
      "answer": "12",
      "explain": "11 × 12 = 132.",
      "hint": "11 × 12 = 132."
    }
  },
  "y-money:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: how many pence in £1?",
        "answer": "100",
        "explain": "£1 is 100p.",
        "hint": "100 pennies make a pound."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: a 20p and a 10p. How many pence in total?",
        "answer": "30",
        "explain": "20 + 10 = 30p.",
        "hint": "Add the coins."
      },
      {
        "type": "typed",
        "q": "Guided: 50p + 50p is how many pounds? Write 1 or 1.00.",
        "answer": "1",
        "explain": "100p is £1.",
        "hint": "Two 50p coins make a pound.",
        "accept": [
          "1",
          "1.00",
          "£1",
          "£1.00"
        ]
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a toy costs 80p. You pay with £1. How much change, in pence?",
      "answer": "20",
      "explain": "100p − 80p = 20p.",
      "hint": "Change is what is left from £1."
    }
  },
  "y-money:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: £2.30 + £1.40. How many pounds, as a decimal?",
        "answer": "3.70",
        "explain": "2.30 + 1.40 = 3.70.",
        "hint": "Add pounds and pence separately.",
        "accept": [
          "3.70",
          "3.7",
          "£3.70"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: a book is £4.99. What is the change from £10, in pounds as a decimal?",
        "answer": "5.01",
        "explain": "10.00 − 4.99 = 5.01.",
        "hint": "£5.01 change.",
        "accept": [
          "5.01",
          "£5.01"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: three packs at £1.25 each. Total in pounds as a decimal?",
        "answer": "3.75",
        "explain": "3 × 1.25 = 3.75.",
        "hint": "3 × 1.25.",
        "accept": [
          "3.75",
          "£3.75"
        ]
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: £6 − £2.45. Answer in pounds as a decimal.",
      "answer": "3.55",
      "explain": "6.00 − 2.45 = 3.55.",
      "hint": "Line up the points.",
      "accept": [
        "3.55",
        "£3.55"
      ]
    }
  },
  "y-money:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 15% of £40, in pounds?",
        "answer": "6",
        "explain": "10% is 4 and 5% is 2, so 6.",
        "hint": "Split 15% into 10% and 5%.",
        "accept": [
          "6",
          "6.00",
          "£6"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: a coat is £80, reduced by 25%. New price in pounds?",
        "answer": "60",
        "explain": "25% of 80 is 20, so 60.",
        "hint": "A quarter off.",
        "accept": [
          "60",
          "60.00",
          "£60"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: 4.5 kg of apples at £1.20 a kilogram. Total in pounds as a decimal?",
        "answer": "5.40",
        "explain": "4 × 1.20 = 4.80, plus 0.60 = 5.40.",
        "hint": "4.5 × 1.20.",
        "accept": [
          "5.40",
          "5.4",
          "£5.40"
        ]
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: you buy items costing £2.80, £3.15 and 95p. Total in pounds as a decimal?",
      "answer": "6.90",
      "explain": "2.80 + 3.15 + 0.95 = 6.90.",
      "hint": "Write 95p as £0.95 first.",
      "accept": [
        "6.90",
        "6.9",
        "£6.90"
      ]
    }
  },
  "y-time:1": {
    "prereq": [
      {
        "type": "multi",
        "q": "Ready check: how many minutes are in one hour?",
        "options": [
          "30",
          "60",
          "100"
        ],
        "answer": 1,
        "explain": "1 hour = 60 minutes.",
        "hint": "A clock goes all the way to 60."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: half past 4 is also written as 4:? Write the minutes.",
        "answer": "30",
        "explain": "Half past is 30 minutes.",
        "hint": "Halfway around the clock.",
        "accept": [
          "30",
          "4:30"
        ]
      },
      {
        "type": "multi",
        "q": "Guided: quarter past 7 is?",
        "options": [
          "7:15",
          "7:45",
          "7:30"
        ],
        "answer": 0,
        "explain": "Quarter past is 15 minutes.",
        "hint": "A quarter of 60 is 15."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: how many minutes in quarter of an hour?",
      "answer": "15",
      "explain": "A quarter of 60 is 15.",
      "hint": "Quarter past is 15 minutes."
    }
  },
  "y-time:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a film starts at 3:20 and lasts 40 minutes. What time does it finish? Write as 4:00.",
        "answer": "4:00",
        "explain": "20 + 40 = 60 minutes, which is 4:00.",
        "hint": "Add 40 minutes to 3:20.",
        "accept": [
          "4:00",
          "4:0",
          "16:00"
        ]
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: how many hours are in 150 minutes? Write 2.5 or 2 1/2.",
        "answer": "2.5",
        "explain": "150 ÷ 60 = 2.5 hours.",
        "hint": "60 minutes make an hour.",
        "accept": [
          "2.5",
          "2 1/2",
          "2.50"
        ]
      },
      {
        "type": "multi",
        "q": "Guided: 17:15 in 12-hour time is?",
        "options": [
          "5:15 am",
          "5:15 pm",
          "7:15 pm"
        ],
        "answer": 1,
        "explain": "17:15 is 5:15 pm.",
        "hint": "Subtract 12 from hours after midday."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a bus leaves at 09:40 and arrives at 10:15. How many minutes was the journey?",
      "answer": "35",
      "explain": "From 09:40 to 10:00 is 20 minutes, plus 15 is 35.",
      "hint": "Count to the next hour, then on."
    }
  },
  "y-time:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 2 hours 20 minutes is how many minutes?",
        "answer": "140",
        "explain": "2 × 60 + 20 = 140.",
        "hint": "Each hour is 60 minutes."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: a race starts at 14:55 and lasts 1 hour 20 minutes. Finish time as 16:15.",
        "answer": "16:15",
        "explain": "14:55 + 1 hour = 15:55, plus 20 minutes = 16:15.",
        "hint": "Add the hour, then the minutes.",
        "accept": [
          "16:15",
          "4:15 pm"
        ]
      },
      {
        "type": "typed",
        "q": "Guided: from 11:48 to 13:10, how many minutes?",
        "answer": "82",
        "explain": "11:48 to 12:00 is 12 minutes, then 70 more to 13:10, total 82.",
        "hint": "Split at 12:00."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 3.5 hours is how many minutes?",
      "answer": "210",
      "explain": "3 × 60 = 180, plus 30 = 210.",
      "hint": "Half an hour is 30 minutes."
    }
  },
  "y-measure:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: how many centimetres in 1 metre?",
        "answer": "100",
        "explain": "1 m = 100 cm.",
        "hint": "Centi means hundredths."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which unit is best for the length of a pencil?",
        "options": [
          "kilometres",
          "centimetres",
          "tonnes"
        ],
        "answer": 1,
        "explain": "A pencil is a few centimetres long.",
        "hint": "Kilometres are for long journeys."
      },
      {
        "type": "typed",
        "q": "Guided: 3 metres is how many centimetres?",
        "answer": "300",
        "explain": "3 × 100 = 300 cm.",
        "hint": "Each metre is 100 cm."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: how many millimetres in 1 centimetre?",
      "answer": "10",
      "explain": "1 cm = 10 mm.",
      "hint": "Milli is smaller than centi."
    }
  },
  "y-measure:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: 2.5 kg is how many grams?",
        "answer": "2500",
        "explain": "1 kg = 1000 g, so 2.5 kg = 2500 g.",
        "hint": "Kilo means 1000."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: 1.2 litres is how many millilitres?",
        "answer": "1200",
        "explain": "1 litre = 1000 ml, so 1.2 litres = 1200 ml.",
        "hint": "Move the figures 3 places."
      },
      {
        "type": "typed",
        "q": "Guided: 40 mm is how many centimetres?",
        "answer": "4",
        "explain": "10 mm = 1 cm, so 40 mm = 4 cm.",
        "hint": "Divide by 10."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: 3 km is how many metres?",
      "answer": "3000",
      "explain": "1 km = 1000 m.",
      "hint": "Kilo means 1000."
    }
  },
  "y-measure:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a rectangle is 9 cm by 4 cm. What is its area in cm²?",
        "answer": "36",
        "explain": "9 × 4 = 36.",
        "hint": "Length times width."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: the same 9 cm by 4 cm rectangle. What is its perimeter in cm?",
        "answer": "26",
        "explain": "9 + 4 + 9 + 4 = 26.",
        "hint": "Add all four sides."
      },
      {
        "type": "typed",
        "q": "Guided: a square has perimeter 32 cm. What is the side length in cm?",
        "answer": "8",
        "explain": "32 ÷ 4 = 8.",
        "hint": "Four equal sides."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a triangle has base 10 cm and height 5 cm. Area in cm²?",
      "answer": "25",
      "explain": "½ × 10 × 5 = 25.",
      "hint": "Half of base times height."
    }
  },
  "y-shape2:1": {
    "prereq": [
      {
        "type": "multi",
        "q": "Ready check: a triangle with all sides equal is called?",
        "options": [
          "scalene",
          "isosceles",
          "equilateral"
        ],
        "answer": 2,
        "explain": "Equilateral means all sides equal.",
        "hint": "Equi means equal."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: a triangle with one right angle is?",
        "options": [
          "right-angled",
          "obtuse only",
          "equilateral only"
        ],
        "answer": 0,
        "explain": "It is a right-angled triangle.",
        "hint": "A right angle is 90°."
      },
      {
        "type": "typed",
        "q": "Guided: how many sides does a pentagon have?",
        "answer": "5",
        "explain": "Penta means five.",
        "hint": "Think of a pentagon five sides."
      }
    ],
    "exit": {
      "type": "multi",
      "q": "End check: an obtuse angle is?",
      "options": [
        "less than 90°",
        "exactly 90°",
        "greater than 90° but less than 180°"
      ],
      "answer": 2,
      "explain": "Obtuse is between 90° and 180°.",
      "hint": "An acute angle is the small one."
    }
  },
  "y-shape2:2": {
    "prereq": [
      {
        "type": "multi",
        "q": "Ready check: a triangle with two equal sides is called?",
        "options": [
          "scalene",
          "isosceles",
          "equilateral only"
        ],
        "answer": 1,
        "explain": "Isosceles has two equal sides.",
        "hint": "The third side can be different."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: the three angles of any triangle add to how many degrees?",
        "answer": "180",
        "explain": "Always 180°.",
        "hint": "This is a key fact."
      },
      {
        "type": "multi",
        "q": "Guided: a reflex angle is?",
        "options": [
          "less than 90°",
          "between 180° and 360°",
          "exactly 90°"
        ],
        "answer": 1,
        "explain": "Reflex is greater than 180° and less than 360°.",
        "hint": "Bigger than a straight line."
      }
    ],
    "exit": {
      "type": "typed",
      "q": "End check: a regular octagon has how many sides?",
      "answer": "8",
      "explain": "Octo means eight.",
      "hint": "Stop-sign shape."
    }
  },
  "y-shape2:3": {
    "prereq": [
      {
        "type": "multi",
        "q": "Ready check: an acute angle is?",
        "options": [
          "less than 90°",
          "exactly 90°",
          "greater than 180°"
        ],
        "answer": 0,
        "explain": "Acute is less than 90°.",
        "hint": "Think of a sharp corner."
      }
    ],
    "guided": [
      {
        "type": "typed",
        "q": "Guided: two angles in a triangle are 42° and 68°. What is the third, in degrees?",
        "answer": "70",
        "explain": "180 − 42 − 68 = 70.",
        "hint": "Angles add to 180°."
      },
      {
        "type": "typed",
        "q": "Guided: angles around a point add to how many degrees?",
        "answer": "360",
        "explain": "A full turn is 360°.",
        "hint": "All the way around."
      }
    ],
    "exit": {
      "type": "multi",
      "q": "End check: a right angle measures?",
      "options": [
        "45°",
        "90°",
        "180°"
      ],
      "answer": 1,
      "explain": "A right angle is 90°.",
      "hint": "The corner of a square."
    }
  }
};

const MATHS_TEACH_DEEP = {
  "number": {
    "extra": "Place value is about where a digit sits. The same digit 4 means 4, 40, 400 or 0.4, depending on its place.",
    "mistake": "A common slip is to ignore a zero, writing 407 as 47. The zero is holding a place and must stay.",
    "example": [
      "Write the number in a place-value grid first.",
      "Read each column: thousands, hundreds, tens, ones, then tenths if there is a point."
    ]
  },
  "operations": {
    "extra": "Decide the operation before you calculate. Add puts amounts together, subtract finds the difference, multiply is equal groups, and divide shares equally.",
    "mistake": "A common slip is to subtract the wrong way round, or to forget a carried ten when adding.",
    "example": [
      "Write the calculation clearly, lining up place value.",
      "Estimate first, then work out the exact answer, then check against the estimate."
    ]
  },
  "fractions": {
    "extra": "The denominator (bottom) is the size of each piece. The numerator (top) is how many pieces you have.",
    "mistake": "A common slip when adding is to add the denominators as well. Only add the numerators when the denominators already match.",
    "example": [
      "If the denominators are different, find an equivalent fraction first.",
      "Then add or subtract the numerators and simplify if you can."
    ]
  },
  "algebra": {
    "extra": "A letter stands for a number we do not yet know, or for a changing value in a pattern. Whatever you do to one side of an equation, do to the other.",
    "mistake": "A common slip is to forget to do the same thing to both sides, or to expand only the first term in a bracket.",
    "example": [
      "Write the equation clearly.",
      "Undo the operations in reverse order: subtract or add first, then divide or multiply."
    ]
  },
  "geometry": {
    "extra": "Area is the space inside a shape. Perimeter is the distance around it. Angles around a point, on a line, and in a triangle have fixed totals.",
    "mistake": "A common slip is to mix up area and perimeter, or to use a sloping side as the height.",
    "example": [
      "Label the sides and any right angles.",
      "Write the formula, substitute the numbers, then include the unit."
    ]
  },
  "data": {
    "extra": "The mean is the total divided by how many values there are. The median is the middle when the list is ordered. The mode appears most often. The range is largest minus smallest.",
    "mistake": "A common slip is to forget to order the list before finding the median, or to divide by the wrong count for the mean.",
    "example": [
      "Order the numbers if you need the median or range.",
      "For the mean, add first, then divide by how many numbers there are."
    ]
  },
  "y-place": {
    "extra": "Each place is ten times the place to its right. Ones sit in the right-hand column of a whole number; tens are next; then hundreds and thousands.",
    "mistake": "A common slip is to read 305 as thirty-five, missing that the 0 holds the tens place.",
    "example": [
      "Write the number with a place-value heading over each digit.",
      "Say it as hundreds, tens and ones, including any zeros."
    ]
  },
  "y-bonds": {
    "extra": "A number bond is a pair that makes a target, often 10, 20 or 100. If you know 6 + 4 = 10, you also know 16 + 4 = 20 and 10 − 6 = 4.",
    "mistake": "A common slip is to count on from the target instead of from the given number.",
    "example": [
      "Start with the number you have.",
      "Count up to the target and write the partner."
    ]
  },
  "y-add": {
    "extra": "You can partition a number into tens and ones, add each part, then put them back together. Making 10 first often makes the sum easier.",
    "mistake": "A common slip is to add the ones and forget to exchange 10 ones for 1 ten.",
    "example": [
      "Partition both numbers if they are two-digit.",
      "Add the tens, add the ones, then combine, exchanging if you need to."
    ]
  },
  "y-sub": {
    "extra": "Subtract in parts, or count up from the smaller number to the larger one to find the difference. Both ways should give the same answer.",
    "mistake": "A common slip is to take the smaller digit from the larger one in a column even when the top digit is smaller, instead of exchanging.",
    "example": [
      "Write the larger number first.",
      "Subtract the tens, then the ones, exchanging a ten if you need to."
    ]
  },
  "y-count": {
    "extra": "Times tables are just equal jumps on a number line. If you know 6 × 5 = 30, you can use it to find 6 × 6 or 6 × 4.",
    "mistake": "A common slip is to add the two numbers instead of multiplying them.",
    "example": [
      "Say the jump size out loud.",
      "Count the jumps until you reach the term you want."
    ]
  },
  "y-share": {
    "extra": "Division shares an amount into equal groups, or groups an amount into equal-sized packs. It is the inverse of multiplication.",
    "mistake": "A common slip is to mix up the number of groups with the size of each group.",
    "example": [
      "Ask: how many equal groups, and how many in each group?",
      "Use a times-table fact to check: groups × size should make the starting amount."
    ]
  },
  "y-money": {
    "extra": "Write money with two decimal places when you can: £3.50, not £3.5, in answers about coins. 100p = £1.",
    "mistake": "A common slip is to treat 95p as £95, or to forget that 100 pence make one pound.",
    "example": [
      "Write every amount in the same unit, usually pounds with a point.",
      "Add or subtract, keeping the point in line, then check the total looks sensible."
    ]
  },
  "y-time": {
    "extra": "Time is not decimal. There are 60 minutes in an hour, not 100. When you pass 60 minutes, you have moved into the next hour.",
    "mistake": "A common slip is to treat 1.5 hours as 1 hour 50 minutes. 1.5 hours is 1 hour 30 minutes.",
    "example": [
      "Write the start time.",
      "Add the hours, then the minutes, and exchange 60 minutes for 1 hour if you go past 60."
    ]
  },
  "y-measure": {
    "extra": "Length, mass and capacity use related units: 10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km, 1000 g = 1 kg, 1000 ml = 1 litre.",
    "mistake": "A common slip is to multiply when you should divide, or to mix units in the same calculation.",
    "example": [
      "Write the conversion fact you need.",
      "Change everything into one unit, then calculate, and put the unit on the answer."
    ]
  },
  "y-shape2": {
    "extra": "Triangles are named by their sides (equilateral, isosceles, scalene) and by their angles (acute, right-angled, obtuse). Angles in any triangle add to 180°.",
    "mistake": "A common slip is to call any triangle with a long side isosceles, without checking that two sides or two angles are equal.",
    "example": [
      "Mark any equal sides or right angles on a sketch.",
      "Use the 180° total to find a missing angle."
    ]
  }
};

function mathsMiniQuestion(spec) {
  if (!spec) return null;
  const out = {
    type: spec.type || "typed",
    q: spec.q,
    answer: spec.answer,
    explain: spec.explain || "",
    hint: spec.hint || "",
  };
  if (spec.options) out.options = spec.options.slice();
  if (spec.accept) out.accept = spec.accept.slice();
  return out;
}

function mathsExtrasFor(skillId, stage) {
  return MATHS_MINI_EXTRAS[skillId + ":" + (Number(stage) || 1)] || null;
}

function buildMathsMiniLesson(skillId, stage) {
  const st = Number(stage) || 1;
  const mod = typeof getTeachModule === "function" ? getTeachModule("maths", skillId, st) : null;
  const extras = mathsExtrasFor(skillId, st);
  if (!extras || !extras.exit) return null;
  const skill =
    (typeof getSkill === "function" && getSkill(skillId)) ||
    (typeof SKILLS !== "undefined" && SKILLS.maths && SKILLS.maths[skillId]) ||
    { name: skillId };
  const deep = MATHS_TEACH_DEEP[skillId] || {};
  const points = (mod && mod.teach && (mod.teach.points || mod.teach.paragraphs)) || [];
  const paragraphs = points.slice();
  if (deep.extra && paragraphs.indexOf(deep.extra) === -1) paragraphs.push(deep.extra);
  if (!paragraphs.length) paragraphs.push("Work through the idea in small steps, then try the example.");
  const exampleSteps = ((mod && mod.example && mod.example.steps) || []).slice();
  (deep.example || []).forEach((step) => {
    if (exampleSteps.indexOf(step) === -1) exampleSteps.push(step);
  });
  if (!exampleSteps.length) {
    exampleSteps.push("Write the question clearly.", "Work one step at a time.", "Check the answer looks sensible.");
  }
  const visual = mod && mod.teach && mod.teach.visual;
  const teach = { paragraphs, mistake: deep.mistake || "" };
  if (visual) {
    if (typeof visual === "string" && visual.trim().charAt(0) === "<") teach.visualHtml = visual;
    else if (typeof visual === "string") teach.visual = visual;
  }
  const title = (mod && (mod.title || mod.blurb)) || (skill && skill.name) || skillId;
  const clip = typeof getVerifiedLessonVideo === "function" ? getVerifiedLessonVideo("maths", skillId, st) : null;
  return {
    title,
    goal:
      "By the end of this lesson you will be more confident with " +
      (skill && skill.name ? skill.name.toLowerCase() : title.toLowerCase()) +
      " at this stage.",
    teach,
    example: {
      title: (mod && mod.example && mod.example.title) || "Worked example",
      steps: exampleSteps,
    },
    prereq: (extras.prereq || []).map(mathsMiniQuestion),
    guided: (extras.guided || []).map(mathsMiniQuestion),
    exit: mathsMiniQuestion(extras.exit),
    revisit: "If that felt shaky, go back to the example and try one more guided question later.",
    video: clip || null,
  };
}

var _getMiniLessonExplicit = typeof getMiniLesson === "function" ? getMiniLesson : function () { return null; };
getMiniLesson = function (subject, skillId, stage) {
  const explicit = _getMiniLessonExplicit(subject, skillId, stage);
  if (explicit) {
    if (!explicit.video && typeof getVerifiedLessonVideo === "function") {
      explicit.video = getVerifiedLessonVideo(subject, skillId, stage);
    }
    if (explicit.teach && subject === "maths") {
      const deep = MATHS_TEACH_DEEP[skillId];
      if (deep && deep.mistake && !explicit.teach.mistake) explicit.teach.mistake = deep.mistake;
      if (deep && deep.extra && Array.isArray(explicit.teach.paragraphs) && explicit.teach.paragraphs.indexOf(deep.extra) === -1) {
        explicit.teach.paragraphs = explicit.teach.paragraphs.concat([deep.extra]);
      }
    }
    return explicit;
  }
  if (subject === "maths") return buildMathsMiniLesson(skillId, stage);
  return null;
}
