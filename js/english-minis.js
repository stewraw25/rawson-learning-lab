/**
 * Stage 3 English teach-pattern roll-out.
 * Builds a mini-lesson (goal, ready check, teach, worked example,
 * guided practice with hints, existing practice, end check) for every
 * English skill and stage that has extras. Unique ready / guided /
 * exit questions are used so they do not repeat in the practice set.
 * Explicit MINI_LESSONS entries still win.
 */
const ENGLISH_MINI_EXTRAS = {
  "grammar:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a simple sentence needs a subject and a what?",
        "answer": "verb",
        "explain": "A simple sentence needs a subject and a verb.",
        "hint": "Who or what, and what happens."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: in 'The rider waited', what is the subject?",
        "options": ["waited", "The rider", "the"],
        "answer": 1,
        "explain": "The rider is who the sentence is about.",
        "hint": "Ask who or what the verb is about."
      },
      {
        "type": "multi",
        "q": "Guided: which line is a complete simple sentence?",
        "options": ["After the rain.", "The rain stopped.", "Stopped."],
        "answer": 1,
        "explain": "The rain is the subject and stopped is the verb.",
        "hint": "Subject plus verb, finished cleanly."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: in 'Clouds gathered', what is the verb?",
        "answer": "gathered",
        "explain": "Gathered is the doing word. Clouds is the subject.",
        "hint": "What did the clouds do?"
      }
  },
  "grammar:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is 'runs' usually present or past tense?",
        "answer": "present",
        "explain": "Runs is present tense. Ran is past.",
        "hint": "Is it happening now?"
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which verb agrees with 'She'?",
        "options": ["She ride every day.", "She rides every day.", "She riding every day."],
        "answer": 1,
        "explain": "She takes rides, with an s, in the present.",
        "hint": "He, she and it often add s in the present."
      },
      {
        "type": "multi",
        "q": "Guided: which sentence is in the past?",
        "options": ["They school the pony.", "They schooled the pony.", "They are schooling the pony."],
        "answer": 1,
        "explain": "Schooled is the past tense.",
        "hint": "Look for the past form."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line about grammar is correct?",
        "options": ["The ponies eats hay.", "The ponies eat hay.", "The ponies eating hay."],
        "answer": 1,
        "explain": "A plural subject takes eat, not eats.",
        "hint": "Match the verb to the subject."
      }
  },
  "grammar:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is 'when the rain started' a complete sentence by itself, yes or no?",
        "answer": "no",
        "explain": "That is a clause that needs a main clause to finish the idea.",
        "hint": "Does it make sense on its own?"
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is a main clause that can stand alone?",
        "options": ["although the wind rose", "the wind rose", "when the wind"],
        "answer": 1,
        "explain": "The wind rose is a complete idea.",
        "hint": "A main clause has a subject and verb and can stand alone."
      },
      {
        "type": "multi",
        "q": "Guided: which sentence uses a clause of time correctly?",
        "options": ["When the rain started, we packed the tack.", "When the rain started.", "The rain started we packed the tack when."],
        "answer": 0,
        "explain": "The when-clause is attached to a complete main clause.",
        "hint": "Finish the idea after when."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line is a complete sentence with a subordinate clause?",
        "options": ["Because the path was icy.", "Because the path was icy, we led the ponies.", "Because."],
        "answer": 1,
        "explain": "The because-clause is followed by a main clause.",
        "hint": "A reason clause still needs a main idea."
      }
  },
  "grammar:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a preposition often shows place or time. Is 'under' a preposition, yes or no?",
        "answer": "yes",
        "explain": "Under shows place, so it is a preposition.",
        "hint": "Think of under the table."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word is the preposition in 'The tack hangs on the hook'?",
        "options": ["tack", "hangs", "on"],
        "answer": 2,
        "explain": "On shows where the tack hangs.",
        "hint": "Find the place word."
      },
      {
        "type": "multi",
        "q": "Guided: which sentence uses a preposition of time clearly?",
        "options": ["We school in the morning.", "We school the morning in.", "Morning we school."],
        "answer": 0,
        "explain": "In the morning uses in as a time preposition.",
        "hint": "In, at and on often mark time or place."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: in 'The pony walked towards the gate', what is the preposition?",
        "answer": "towards",
        "explain": "Towards shows direction.",
        "hint": "Which word shows where the pony was heading?",
        "accept": ["towards", "toward"]
      }
  },
  "grammar:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does an adverb often describe a verb, yes or no?",
        "answer": "yes",
        "explain": "An adverb can tell us how, when or where an action happens.",
        "hint": "It adds to the verb."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word is the adverb in 'The pony trotted quietly'?",
        "options": ["pony", "trotted", "quietly"],
        "answer": 2,
        "explain": "Quietly tells you how the pony trotted.",
        "hint": "How did the action happen?"
      },
      {
        "type": "multi",
        "q": "Guided: which sentence uses an adverbial of time?",
        "options": ["She checked the water after lunch.", "She checked the water wet.", "She water checked."],
        "answer": 0,
        "explain": "After lunch tells you when.",
        "hint": "Adverbials can be a short phrase, not just one word."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: in 'They arrived early', what is the adverb?",
        "answer": "early",
        "explain": "Early tells you when they arrived.",
        "hint": "When did they arrive?"
      }
  },
  "grammar:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is 'must' a modal verb, yes or no?",
        "answer": "yes",
        "explain": "Must, can, should and might are modal verbs. They change how certain or necessary an action is.",
        "hint": "Modals sit with another verb."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which sentence uses a modal of possibility?",
        "options": ["The rain might hold off.", "The rain holding off.", "The rain off."],
        "answer": 0,
        "explain": "Might shows possibility, not certainty.",
        "hint": "Might, could and may show possibility."
      },
      {
        "type": "multi",
        "q": "Guided: which modal shows obligation?",
        "options": ["You can leave the rug off.", "You must check the bolts.", "You might like the path."],
        "answer": 1,
        "explain": "Must shows that the check is necessary.",
        "hint": "Obligation is stronger than a suggestion."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line uses a modal correctly?",
        "options": ["We should to warm up first.", "We should warm up first.", "We should warming up first."],
        "answer": 1,
        "explain": "A modal is followed by the base verb: should warm, not should to warm.",
        "hint": "Use the base form after the modal."
      }
  },
  "punctuation:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: the word I should be written as a capital, yes or no?",
        "answer": "yes",
        "explain": "The word I is always a capital letter.",
        "hint": "Even in the middle of a sentence."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which sentence is punctuated correctly?",
        "options": ["the yard is quiet", "The yard is quiet.", "The yard is quiet"],
        "answer": 1,
        "explain": "It starts with a capital and ends with a full stop.",
        "hint": "Start and finish the sentence."
      },
      {
        "type": "multi",
        "q": "Guided: which name is capitalised correctly?",
        "options": ["bella-rose", "Bella-Rose", "BELLA-rose"],
        "answer": 1,
        "explain": "Each part of the name starts with a capital.",
        "hint": "Names of people start with a capital."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line about punctuation is correct?",
        "options": ["i walked to London.", "I walked to London.", "I walked to london."],
        "answer": 1,
        "explain": "I is a capital, and London is a place name so it needs a capital too.",
        "hint": "Check I and the place name."
      }
  },
  "punctuation:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a list of three items usually needs commas, yes or no?",
        "answer": "yes",
        "explain": "Commas separate items in a list of three or more.",
        "hint": "Think of apples, pears and plums."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which list is punctuated best?",
        "options": ["Bring a hat boots and gloves.", "Bring a hat, boots and gloves.", "Bring, a hat boots and gloves."],
        "answer": 1,
        "explain": "A comma comes after hat, and and comes before the last item.",
        "hint": "Separate the first items with commas."
      },
      {
        "type": "multi",
        "q": "Guided: which line should end with a question mark?",
        "options": ["Shut the gate now", "Where is the lead rope", "The lead rope is here"],
        "answer": 1,
        "explain": "Where starts a question, so it needs a question mark.",
        "hint": "Questions need a question mark."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence about punctuation is correct \u2014 punctuation?",
        "options": ["Have you packed the boots.", "Have you packed the boots?", "Have you packed, the boots"],
        "answer": 1,
        "explain": "It is a question, so it ends with a question mark.",
        "hint": "Look at the opening word Have."
      }
  },
  "punctuation:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: in it's raining, does the apostrophe mark a missing letter, yes or no?",
        "answer": "yes",
        "explain": "It's means it is, so the apostrophe marks the missing i.",
        "hint": "Try writing it is instead."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which line about punctuation is correct?",
        "options": ["Its a cold morning.", "It's a cold morning.", "Its' a cold morning."],
        "answer": 1,
        "explain": "It's means it is.",
        "hint": "Replace it's with it is to check."
      },
      {
        "type": "multi",
        "q": "Guided: which line shows belonging for one pony?",
        "options": ["The ponys rug is damp.", "The pony's rug is damp.", "The ponys' rug is damp, and there is only one pony."],
        "answer": 1,
        "explain": "One pony owns the rug, so the apostrophe is before the s.",
        "hint": "How many ponies?"
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence about punctuation is correct \u2014 punctuation?",
        "options": ["The ponies' rugs were damp, and they were all outside.", "The ponie's rugs were damp, and they were all outside.", "The ponies rugs were damp, and they were all outside."],
        "answer": 0,
        "explain": "More than one pony owns the rugs, so the apostrophe comes after the s.",
        "hint": "Plural belonging often uses s then the apostrophe."
      }
  },
  "punctuation:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: do spoken words usually sit inside speech marks, yes or no?",
        "answer": "yes",
        "explain": "Speech marks (inverted commas) enclose the words that are spoken.",
        "hint": "They wrap around the talking."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which line punctuates the speech correctly?",
        "options": ["Come in said Ali.", "\u201cCome in,\u201d said Ali.", "\u201cCome in,\u201d said ali"],
        "answer": 1,
        "explain": "The spoken words are inside speech marks, with a comma before said, and Ali is a name.",
        "hint": "Wrap the spoken words and keep the comma."
      },
      {
        "type": "multi",
        "q": "Guided: where does the comma usually go in this pattern?",
        "options": ["after said, outside the speech", "before the closing speech mark, then said", "before the opening speech mark only"],
        "answer": 1,
        "explain": "In \u201cCome in,\u201d said Ali, the comma sits inside the closing speech mark.",
        "hint": "The reporting clause follows the speech."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence is correctly punctuated \u2014 punctuation?",
        "options": ["\u201cThe path is icy\u201d said Jo.", "\u201cThe path is icy,\u201d said Jo.", "The path is icy, \u201csaid Jo.\u201d"],
        "answer": 1,
        "explain": "The spoken words, a comma, the closing speech mark, then said Jo.",
        "hint": "Keep the comma inside the speech marks in this pattern."
      }
  },
  "punctuation:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a colon can introduce a list, yes or no?",
        "answer": "yes",
        "explain": "A colon can introduce a list or an explanation.",
        "hint": "Think of a list after a complete lead-in."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which line uses a colon correctly to start a list?",
        "options": ["Please bring: a hat, boots and gloves.", "Please: bring a hat boots and gloves.", ": a hat, boots and gloves."],
        "answer": 0,
        "explain": "The words before the colon are a complete lead-in, then the list follows.",
        "hint": "A complete clause comes before the colon."
      },
      {
        "type": "multi",
        "q": "Guided: which mark is better to join two closely linked clauses, a comma alone or a semicolon?",
        "options": ["a comma alone", "a semicolon", "no mark at all"],
        "answer": 1,
        "explain": "A semicolon can join two closely linked complete clauses. A comma alone would be a comma splice.",
        "hint": "Each side of a semicolon should be able to stand as a sentence."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence is correctly punctuated \u2014 punctuation?",
        "options": ["The yard was still, the ponies were in.", "The yard was still; the ponies were in.", "The yard was still;."],
        "answer": 1,
        "explain": "Both sides are complete clauses, so a semicolon is appropriate.",
        "hint": "Check that each side could be a sentence."
      }
  },
  "punctuation:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should both sides of a semicolon be complete clauses, yes or no?",
        "answer": "yes",
        "explain": "A semicolon joins two complete, closely linked clauses.",
        "hint": "Each side should make sense alone."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which line uses a colon to explain?",
        "options": ["She had one aim: to keep the pony calm.", "She had one aim to keep: the pony calm.", "She had: one aim to keep the pony calm."],
        "answer": 0,
        "explain": "The colon introduces the explanation of the aim.",
        "hint": "The first part should be complete, then the explanation."
      },
      {
        "type": "multi",
        "q": "Guided: which punctuation is most precise here?",
        "options": ["Bring the following, hat, boots, gloves.", "Bring the following: hat, boots, gloves.", "Bring the following; hat, boots, gloves."],
        "answer": 1,
        "explain": "A colon introduces the list after a complete lead-in.",
        "hint": "A list after a complete clause often follows a colon."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence uses a semicolon well?",
        "options": ["We packed early, the journey was long.", "We packed early; the journey was long.", "We packed early; and."],
        "answer": 1,
        "explain": "Both clauses are complete and closely linked.",
        "hint": "Do not use a semicolon with a fragment."
      }
  },
  "reading:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should you look back at the text for a fact, yes or no?",
        "answer": "yes",
        "explain": "Retrieval means the answer is in the words.",
        "hint": "Do not guess if the fact is written down."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: 'The lesson started at 10.' What time did it start?",
        "options": ["12", "10", "2"],
        "answer": 1,
        "explain": "The sentence states the time.",
        "hint": "Copy the fact."
      },
      {
        "type": "multi",
        "q": "Guided: 'Only three jumps stayed up.' How many jumps stayed up?",
        "options": ["all of them", "three", "none"],
        "answer": 1,
        "explain": "Only three is the fact in the sentence.",
        "hint": "The number is written down."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: 'The arena was booked after school.' When was it booked?",
        "answer": "after school",
        "explain": "The phrase after school is in the sentence.",
        "hint": "Find the time phrase.",
        "accept": ["after school", "After school"]
      }
  },
  "reading:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: can you use a clue in the text to work out something that is not fully spelled out, yes or no?",
        "answer": "yes",
        "explain": "That is inference: a careful conclusion from evidence in the text.",
        "hint": "The text still has to support it."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: 'She wiped the saddle twice and frowned at a damp patch.' What is suggested?",
        "options": ["She was checking the kit carefully and was not happy about the damp.", "She had definitely sold the saddle.", "It was certainly midsummer."],
        "answer": 0,
        "explain": "Wiping twice and frowning are clues, but we should not invent bigger claims.",
        "hint": "Use the clues only."
      },
      {
        "type": "multi",
        "q": "Guided: 'They turned back when the fog thickened.' Why did they turn back?",
        "options": ["The text says the fog thickened.", "They were certainly lost forever.", "They had finished the whole ride for sure."],
        "answer": 0,
        "explain": "The reason given is the thickening fog.",
        "hint": "Stay with the words."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: 'He checked the bolts, then checked them again.' What is suggested?",
        "options": ["He wanted to be sure they were secure.", "The bolts were definitely missing.", "He was certainly late for school."],
        "answer": 0,
        "explain": "Checking twice suggests he wanted to be sure. The other options are not supported.",
        "hint": "Do not add facts that are not there."
      }
  },
  "reading:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should a summary keep the main idea and drop tiny extra detail, yes or no?",
        "answer": "yes",
        "explain": "A summary is a shorter restatement of the important points.",
        "hint": "Keep what matters most."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is the better summary of 'After a long warm-up, the pony jumped a clear round and the crowd clapped'?",
        "options": ["There was a crowd.", "The pony jumped a clear round after a warm-up.", "Someone clapped at lunch."],
        "answer": 1,
        "explain": "The main events are the warm-up and the clear round.",
        "hint": "Do not keep only a tiny side detail."
      },
      {
        "type": "multi",
        "q": "Guided: what should a summary not do?",
        "options": ["leave out the main idea", "stay shorter than the original", "keep the important points"],
        "answer": 0,
        "explain": "If you drop the main idea, it is not a useful summary.",
        "hint": "Keep the heart of the text."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence best sums up 'The icy wind made them lead the ponies home early'?",
        "options": ["They led the ponies home early because of the icy wind.", "There was a wind somewhere.", "They definitely cancelled the whole term."],
        "answer": 0,
        "explain": "The summary keeps the reason and the main action.",
        "hint": "Keep cause and result."
      }
  },
  "reading:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: can a writer's word choice affect the mood of a text, yes or no?",
        "answer": "yes",
        "explain": "Word choice is part of how meaning and effects are built, including in England GCSE reading (graded 9\u20131). This lesson does not promise a grade.",
        "hint": "Think about the feeling a word creates."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word creates a more threatening mood: 'the wind whispered' or 'the wind roared'?",
        "options": ["whispered", "roared", "the"],
        "answer": 1,
        "explain": "Roared suggests force and threat more than whispered.",
        "hint": "Compare the two verbs."
      },
      {
        "type": "multi",
        "q": "Guided: why might a writer repeat a short sentence?",
        "options": ["to slow the reader and add emphasis", "because sentences may never be short", "to remove all meaning"],
        "answer": 0,
        "explain": "Short, repeated sentences can add emphasis or tension.",
        "hint": "Think about the effect on the reader."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: in 'The gate screamed on its hinges', the verb screamed is used to\u2026",
        "options": ["make the gate sound harsh and unpleasant", "tell us the exact scientific pitch", "show that gates can talk in real life"],
        "answer": 0,
        "explain": "Screamed is a vivid, human verb used for effect, not a literal fact about speech.",
        "hint": "Focus on the effect of the word."
      }
  },
  "reading:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should a comment on language be backed by a word or phrase from the text, yes or no?",
        "answer": "yes",
        "explain": "Point and evidence belong together.",
        "hint": "Name the word that creates the effect."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which comment is better supported?",
        "options": ["The text is really good.", "The verb 'dragged' suggests the work was heavy and slow.", "I just liked it."],
        "answer": 1,
        "explain": "It names a word and explains the effect.",
        "hint": "Use evidence, then the effect."
      },
      {
        "type": "multi",
        "q": "Guided: what is the job of a comparison in reading?",
        "options": ["to notice a similarity or difference and explain it", "to retell the whole text word for word", "to ignore the second text"],
        "answer": 0,
        "explain": "Comparison looks at what is similar or different, and why it matters.",
        "hint": "Stay with both sides."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which is a useful comparison sentence?",
        "options": ["Both openings set a calm scene, but the second uses shorter sentences to add tension.", "The second one is just better.", "I prefer horses."],
        "answer": 0,
        "explain": "It names a similarity and a difference with a reason.",
        "hint": "Compare, then explain."
      }
  },
  "reading:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should an evaluation still be supported by the text, yes or no?",
        "answer": "yes",
        "explain": "A judgement is more convincing when it is backed by evidence. That habit matters in England GCSE reading, graded 9\u20131, without promising a grade.",
        "hint": "Opinion plus evidence."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which evaluation is better?",
        "options": ["It was boring.", "The ending is effective because the last image of the empty yard stays with the reader.", "The writer is famous."],
        "answer": 1,
        "explain": "It makes a judgement and gives a reason tied to the text.",
        "hint": "Effective because\u2026"
      },
      {
        "type": "multi",
        "q": "Guided: what should you avoid in an evaluation?",
        "options": ["a reason from the text", "a claim with no evidence", "a clear judgement"],
        "answer": 1,
        "explain": "A claim with no evidence is only a personal reaction.",
        "hint": "Back it up."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line is a supported evaluation?",
        "options": ["The contrast between the noisy start and the quiet last line makes the ending more striking.", "The ending was random.", "I would have written something else."],
        "answer": 0,
        "explain": "It names a contrast and explains the effect.",
        "hint": "Judgement plus evidence."
      }
  },
  "vocabulary:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a synonym is a word close in meaning, yes or no?",
        "answer": "yes",
        "explain": "Synonyms are words with a close meaning, such as big and large.",
        "hint": "Same idea, different word."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word is a synonym of happy?",
        "options": ["miserable", "cheerful", "furious"],
        "answer": 1,
        "explain": "Cheerful is close in meaning to happy.",
        "hint": "Which word means almost the same?"
      },
      {
        "type": "multi",
        "q": "Guided: which word is an antonym of quiet?",
        "options": ["silent", "noisy", "calm"],
        "answer": 1,
        "explain": "An antonym is an opposite. Noisy is the opposite of quiet.",
        "hint": "Opposite, not similar."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: write a one-word synonym of start.",
        "answer": "begin",
        "explain": "Begin is a synonym of start.",
        "hint": "Another word for start.",
        "accept": ["begin", "commence", "open"]
      }
  },
  "vocabulary:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is unhappy made from a prefix plus happy, yes or no?",
        "answer": "yes",
        "explain": "The prefix un- changes the meaning of happy.",
        "hint": "A prefix sits at the start of a word."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which prefix turns kind into its opposite?",
        "options": ["re-", "un-", "pre-"],
        "answer": 1,
        "explain": "Unkind is the opposite of kind.",
        "hint": "Un- often means not."
      },
      {
        "type": "multi",
        "q": "Guided: which word uses a suffix?",
        "options": ["replay", "kindness", "undo"],
        "answer": 1,
        "explain": "Kindness adds the suffix -ness. Replay and undo use prefixes.",
        "hint": "A suffix sits at the end."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: add a prefix to lock to mean 'open a lock'. Write the new word.",
        "answer": "unlock",
        "explain": "The prefix un- gives unlock.",
        "hint": "What do you do to a locked door?"
      }
  },
  "vocabulary:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: do their, there and they're sound similar, yes or no?",
        "answer": "yes",
        "explain": "They are homophones: same sound, different meaning and spelling.",
        "hint": "Sound alike, not spelled alike."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word fits 'The books are over _'?",
        "options": ["their", "there", "they're"],
        "answer": 1,
        "explain": "There points to a place.",
        "hint": "Here and there."
      },
      {
        "type": "multi",
        "q": "Guided: which pair are homophones?",
        "options": ["horse and pony", "pair and pear", "run and ran"],
        "answer": 1,
        "explain": "Pair and pear sound the same but have different meanings.",
        "hint": "Same sound, different spelling."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: which word means a fruit, pear or pair?",
        "answer": "pear",
        "explain": "A pear is a fruit. A pair is two of something.",
        "hint": "Think of the fruit."
      }
  },
  "vocabulary:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is a noun a word class, yes or no?",
        "answer": "yes",
        "explain": "Noun, verb, adjective and adverb are word classes.",
        "hint": "Word class means the job the word does."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which list is in the order noun, verb, adjective?",
        "options": ["gate, slammed, rusty", "slammed, rusty, gate", "rusty, gate, slammed"],
        "answer": 0,
        "explain": "Gate names a thing, slammed is the action, rusty describes.",
        "hint": "Name, action, description."
      },
      {
        "type": "multi",
        "q": "Guided: which word class is 'carefully' in 'She checked carefully'?",
        "options": ["noun", "verb", "adverb"],
        "answer": 2,
        "explain": "Carefully tells you how she checked, so it is an adverb.",
        "hint": "How was the action done?"
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which word is the adjective in 'A sudden gust lifted the rug'?",
        "options": ["sudden", "gust", "lifted"],
        "answer": 0,
        "explain": "Sudden describes the gust.",
        "hint": "Which word describes the noun?"
      }
  },
  "vocabulary:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: are bare and bear homophones, yes or no?",
        "answer": "yes",
        "explain": "They sound the same but have different meanings and spellings.",
        "hint": "Same sound, different job."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word fits 'The _ tree had no leaves'?",
        "options": ["bear", "bare", "beer"],
        "answer": 1,
        "explain": "Bare means uncovered. A bear is an animal.",
        "hint": "Think of empty branches."
      },
      {
        "type": "multi",
        "q": "Guided: what is a homonym?",
        "options": ["two words that look or sound the same but can mean different things", "a type of full stop", "a word with no meaning"],
        "answer": 0,
        "explain": "A homonym can share spelling or sound but have more than one meaning, such as bark (tree or dog).",
        "hint": "One form, more than one meaning."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence uses 'light' to mean not heavy?",
        "options": ["Switch on the light.", "The bag was light to carry.", "The light was red."],
        "answer": 1,
        "explain": "Here light means not heavy, not a lamp.",
        "hint": "Read the whole sentence."
      }
  },
  "vocabulary:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should you choose a precise word rather than a vague one in formal writing, yes or no?",
        "answer": "yes",
        "explain": "Precise vocabulary makes meaning sharper, which is useful in England GCSE writing (graded 9\u20131). A lesson cannot promise a grade.",
        "hint": "Pick the exact word."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word is more precise than 'said' for a quiet voice?",
        "options": ["said", "whispered", "went"],
        "answer": 1,
        "explain": "Whispered tells the reader how the words were spoken.",
        "hint": "How quietly were they spoken?"
      },
      {
        "type": "multi",
        "q": "Guided: which word is more precise than 'bad' for icy ground?",
        "options": ["bad", "hazardous", "stuff"],
        "answer": 1,
        "explain": "Hazardous tells the reader the ground was dangerous.",
        "hint": "What risk does ice add?"
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which word is more precise than 'nice' for a carefully planned argument?",
        "options": ["nice", "convincing", "good"],
        "answer": 1,
        "explain": "Convincing tells the reader the argument works on the reader.",
        "hint": "What does the argument do?"
      }
  },
  "writing:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should a short story have a clear beginning, yes or no?",
        "answer": "yes",
        "explain": "A story is easier to follow if it has a beginning, a middle and an ending.",
        "hint": "Start by setting the scene or the problem."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which opening sets a clearer scene?",
        "options": ["Once. Stuff happened.", "The yard was still dark when Bella opened the gate.", "And then."],
        "answer": 1,
        "explain": "It tells the reader where we are and who is there.",
        "hint": "Time, place, person."
      },
      {
        "type": "multi",
        "q": "Guided: what should happen in the middle of a short story?",
        "options": ["the problem or action develops", "a brand-new unrelated report", "nothing at all"],
        "answer": 0,
        "explain": "The middle moves the story on.",
        "hint": "Something should change or be attempted."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which ending finishes a story more clearly?",
        "options": ["The end maybe.", "They shut the gate and the yard was quiet again.", "Also ponies."],
        "answer": 1,
        "explain": "It closes the action and returns to a calm final image.",
        "hint": "The reader should feel the story has finished."
      }
  },
  "writing:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should a new idea often start a new paragraph, yes or no?",
        "answer": "yes",
        "explain": "Paragraphs group sentences about the same idea.",
        "hint": "One idea, one paragraph."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which plan is clearer for a short story?",
        "options": ["one huge block with no breaks", "a paragraph for the opening, one for the problem, one for the ending", "a new paragraph after every word"],
        "answer": 1,
        "explain": "A simple three-part paragraph plan keeps the story organised.",
        "hint": "Group the sentences by idea."
      },
      {
        "type": "multi",
        "q": "Guided: which sentence would start a new paragraph well?",
        "options": ["Also the same moment continued with no change.", "Later that afternoon, the wind picked up.", "And."],
        "answer": 1,
        "explain": "A time change is a natural paragraph break.",
        "hint": "Look for a shift in time or place."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: why use paragraphs?",
        "options": ["to organise ideas so the reader can follow", "to make the page look random", "because stories may never use them"],
        "answer": 0,
        "explain": "Paragraphs help the reader follow each idea.",
        "hint": "Think about the reader."
      }
  },
  "writing:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should instructions be written in a clear order, yes or no?",
        "answer": "yes",
        "explain": "Clear steps, in order, help the reader do the task.",
        "hint": "First, then, next, finally."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is the better instruction?",
        "options": ["Do the thing with the stuff.", "Check the girth, then lead the pony out.", "Girth pony maybe."],
        "answer": 1,
        "explain": "It tells the reader exactly what to do, in order.",
        "hint": "Be precise and keep the sequence."
      },
      {
        "type": "multi",
        "q": "Guided: which opening is more useful for instructions?",
        "options": ["You might want to sort of begin.", "First, put on your hat.", "Stuff."],
        "answer": 1,
        "explain": "First makes the order obvious, and the verb is clear.",
        "hint": "Start with a clear step."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which list is better as instructions?",
        "options": ["Hat. Maybe boots. The pony.", "1. Put on your hat. 2. Check the girth. 3. Lead the pony out.", "Do whatever."],
        "answer": 1,
        "explain": "Numbered, precise steps are easier to follow.",
        "hint": "Order plus clear verbs."
      }
  },
  "writing:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should a report stick to facts the reader needs, yes or no?",
        "answer": "yes",
        "explain": "A report is written for a purpose and an audience, so the facts should be relevant and clearly organised.",
        "hint": "Think who will read it, and why."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which sentence is more appropriate in a short school report?",
        "options": ["It was like, well, you know.", "The trial started at 10 and three ponies completed the course.", "OMG ponies!!!"],
        "answer": 1,
        "explain": "It is factual, clear and in a formal enough tone for a report.",
        "hint": "Keep to the facts."
      },
      {
        "type": "multi",
        "q": "Guided: what should a report opening usually do?",
        "options": ["state what the report is about", "tell a joke with no link", "hide the topic"],
        "answer": 0,
        "explain": "The reader should know the subject at once.",
        "hint": "Purpose first."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which closing is more useful in a report?",
        "options": ["That is all I can be bothered to write.", "In summary, the morning session ran to time and no one was injured.", "The end lol."],
        "answer": 1,
        "explain": "It sums up the key facts for the reader.",
        "hint": "A report ends by gathering the important points."
      }
  },
  "writing:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should persuasive writing have a clear point of view, yes or no?",
        "answer": "yes",
        "explain": "Persuasive writing tries to convince a reader, so the viewpoint should be clear and supported. That craft is used in England GCSE writing, graded 9\u20131, without promising a grade.",
        "hint": "The reader should know what you want."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which opening is more persuasive for a school letter?",
        "options": ["I kind of want a thing maybe.", "I am writing to ask the school to add a weekly riding club, because it would support fitness and confidence.", "Do it or else, I guess."],
        "answer": 1,
        "explain": "It states the request and a reason, in a calm tone.",
        "hint": "Be clear and give a reason."
      },
      {
        "type": "multi",
        "q": "Guided: which device is useful in persuasion?",
        "options": ["a reason plus a real example", "a long insult", "hiding your point"],
        "answer": 0,
        "explain": "Reasons and examples are more convincing than insults.",
        "hint": "Support the point."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which ending is more effective?",
        "options": ["Whatever.", "Please approve the club so that more students can take part safely next term.", "I have finished typing."],
        "answer": 1,
        "explain": "It restates the request and the benefit.",
        "hint": "Finish with a clear ask."
      }
  },
  "writing:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should crafted writing keep purpose, audience and tone in mind, yes or no?",
        "answer": "yes",
        "explain": "Matching tone to purpose and audience is part of writing craft on the England GCSE 9\u20131 scale. This lesson does not promise a grade.",
        "hint": "Who is it for, and why?"
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which tone better fits a formal letter to a headteacher?",
        "options": ["Yours sincerely, with a clear request and reasons", "yeah pls do it lol", "I demand this now or else"],
        "answer": 0,
        "explain": "A formal letter is polite, clear and supported.",
        "hint": "Match the tone to the reader."
      },
      {
        "type": "multi",
        "q": "Guided: what does a topic sentence help a paragraph do?",
        "options": ["stay focused on one idea", "hide the idea from the reader", "list random words"],
        "answer": 0,
        "explain": "The opening sentence signs the idea, then details follow.",
        "hint": "One paragraph, one idea."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence is more carefully crafted for a formal argument?",
        "options": ["School sport matters because it builds health, teamwork and confidence.", "Sport is well, sort of, you know, good-ish.", "Sport stuff yeah."],
        "answer": 0,
        "explain": "It makes a clear claim and offers three precise reasons.",
        "hint": "Clear claim plus reasons."
      }
  },
  "y-adj:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does an adjective describe a noun or a verb?",
        "answer": "noun",
        "explain": "An adjective tells us more about a noun.",
        "hint": "It describes a person, place or thing."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word is the adjective in 'a muddy paddock'?",
        "options": ["a", "muddy", "paddock"],
        "answer": 1,
        "explain": "Muddy describes the paddock.",
        "hint": "Which word tells you what the paddock was like?"
      },
      {
        "type": "multi",
        "q": "Guided: which adjective fits 'The _ pony trotted'?",
        "options": ["quickly", "gentle", "galloped"],
        "answer": 1,
        "explain": "Gentle describes the pony. Quickly would describe the verb.",
        "hint": "Pick a describing word for the noun."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: in 'The rusty gate creaked', what is the adjective?",
        "answer": "rusty",
        "explain": "Rusty describes the gate.",
        "hint": "Which word tells you more about the gate?"
      }
  },
  "y-adj:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: to compare two things, do we often add -er or -est?",
        "answer": "-er",
        "explain": "Use -er to compare two things, like taller.",
        "hint": "Two things, -er.",
        "accept": ["-er", "er"]
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is correct for two fences?",
        "options": ["This fence is tallest than that one.", "This fence is taller than that one.", "This fence is more taller than that one."],
        "answer": 1,
        "explain": "Taller compares two things. Do not use more and -er together.",
        "hint": "Two fences, so use -er."
      },
      {
        "type": "multi",
        "q": "Guided: which is correct for three ponies?",
        "options": ["Amber is the faster.", "Amber is the fastest.", "Amber is more faster."],
        "answer": 1,
        "explain": "Fastest is for three or more.",
        "hint": "Use -est when there are more than two."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line about adjectives is correct?",
        "options": ["Of the two paths, this one is safest.", "Of the two paths, this one is safer.", "Of the two paths, this one is more safer."],
        "answer": 1,
        "explain": "Two paths, so safer, not safest.",
        "hint": "How many paths are being compared?"
      }
  },
  "y-adj:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: which is more precise, big or huge?",
        "answer": "huge",
        "explain": "Huge tells you more than just big.",
        "hint": "Pick the sharper word."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which adjective is more precise for a very small gap?",
        "options": ["big", "narrow", "nice"],
        "answer": 1,
        "explain": "Narrow tells the reader the size and shape of the gap.",
        "hint": "Think about the exact meaning."
      },
      {
        "type": "multi",
        "q": "Guided: which sentence uses a clearer adjective?",
        "options": ["It was a nice day.", "It was a warm, bright day.", "It was a thing day."],
        "answer": 1,
        "explain": "Warm and bright tell the reader more than nice.",
        "hint": "Avoid vague words when you can."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: which adjective is more precise than 'good' for a sharp knife?",
        "answer": "sharp",
        "explain": "Sharp tells you exactly what is good about the knife.",
        "hint": "What quality does a useful knife have?"
      }
  },
  "y-caps:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: a telling sentence should end with what mark?",
        "answer": "full stop",
        "explain": "A telling sentence ends with a full stop.",
        "hint": "Look at the end of a finished sentence.",
        "accept": ["full stop", "a full stop", "."]
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which list uses commas correctly?",
        "options": ["I packed pens pencils and a ruler.", "I packed pens, pencils and a ruler.", "I packed, pens pencils and a ruler."],
        "answer": 1,
        "explain": "Commas separate the items in a list of three or more.",
        "hint": "Put a comma between the first items."
      },
      {
        "type": "multi",
        "q": "Guided: which date uses capitals correctly?",
        "options": ["monday 4 may", "Monday 4 May", "monday 4 May"],
        "answer": 1,
        "explain": "The day and the month both start with a capital letter.",
        "hint": "Days and months are names."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line is a finished list sentence?",
        "options": ["She bought bread milk and eggs", "She bought bread, milk and eggs.", "she bought, bread milk and eggs."],
        "answer": 1,
        "explain": "It starts with a capital, uses list commas, and ends with a full stop.",
        "hint": "Check the start, the commas, and the ending."
      }
  },
  "y-caps:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: which letters are missing in don't?",
        "answer": "o",
        "explain": "Don't is do not, so the apostrophe marks the missing o.",
        "hint": "Say do not slowly."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word uses an apostrophe for a missing letter?",
        "options": ["dogs", "don't", "dads"],
        "answer": 1,
        "explain": "Don't is do not. The apostrophe shows the missing o.",
        "hint": "Look for two words joined together."
      },
      {
        "type": "multi",
        "q": "Guided: which line shows belonging, not a missing letter?",
        "options": ["It's raining.", "The horse's saddle is brown.", "Let's go."],
        "answer": 1,
        "explain": "Horse's here means the saddle belongs to the horse.",
        "hint": "Belonging often comes before a thing that is owned."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence about capitals and end marks is correct?",
        "options": ["The dogs bowl is empty.", "The dog's bowl is empty.", "The dogs' bowl is empty and its the only dog."],
        "answer": 1,
        "explain": "One dog owns the bowl, so the apostrophe is before the s.",
        "hint": "Think how many dogs own the bowl."
      }
  },
  "y-join:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: which word can join two ideas, and or because?",
        "answer": "and",
        "explain": "And joins two ideas of equal weight.",
        "hint": "The simplest joining word."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which sentence joins the ideas clearly?",
        "options": ["I brushed the pony. I filled the water. And.", "I brushed the pony and I filled the water.", "I brushed the pony I filled the water."],
        "answer": 1,
        "explain": "And joins the two complete ideas.",
        "hint": "Use and between the two clauses."
      },
      {
        "type": "multi",
        "q": "Guided: which join is best here?",
        "options": ["The gate was shut and the yard was quiet.", "The gate was shut and.", "And the gate the yard."],
        "answer": 0,
        "explain": "Both parts are complete ideas joined by and.",
        "hint": "Each side of and should make sense."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: join these with and: 'It rained.' 'We stayed in.' Write one sentence starting with It.",
        "answer": "It rained and we stayed in.",
        "explain": "Put and between the two ideas, and keep one full stop at the end.",
        "hint": "Keep both ideas, add and.",
        "accept": ["It rained and we stayed in.", "It rained and we stayed in"]
      }
  },
  "y-join:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: which joining word shows a reason, but or because?",
        "answer": "because",
        "explain": "Because introduces a reason.",
        "hint": "It answers why."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which sentence uses but correctly?",
        "options": ["I wanted to ride but it was icy.", "I wanted to ride because it was icy.", "I wanted to ride but."],
        "answer": 0,
        "explain": "But shows a contrast: the ice got in the way.",
        "hint": "But signals a change of direction."
      },
      {
        "type": "multi",
        "q": "Guided: which sentence uses because correctly?",
        "options": ["We went in because the rain started.", "We went in but the rain started, so because.", "Because."],
        "answer": 0,
        "explain": "Because gives the reason for going in.",
        "hint": "Look for a reason."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which joining word fits 'The pony was calm, _ the wind was strong'?",
        "options": ["because", "but", "and so because"],
        "answer": 1,
        "explain": "But shows the contrast between calm and strong wind.",
        "hint": "The two ideas pull in different directions."
      }
  },
  "y-join:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: which word can start a time clause, when or because?",
        "answer": "when",
        "explain": "When can show the time something happens.",
        "hint": "Think about time."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which sentence uses when clearly?",
        "options": ["When the bell rings, we pack away.", "When. The bell rings we pack away.", "We pack away when."],
        "answer": 0,
        "explain": "When the bell rings is the time clause, then the main idea follows.",
        "hint": "The when-clause tells you the time."
      },
      {
        "type": "multi",
        "q": "Guided: which sentence uses if correctly?",
        "options": ["If the path is icy, we walk instead.", "If the path is icy we.", "If."],
        "answer": 0,
        "explain": "If introduces a condition.",
        "hint": "If means only in that case."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line is a clear condition?",
        "options": ["If it stays dry, we will school in the arena.", "If it stays dry we will.", "It stays dry if we will school."],
        "answer": 0,
        "explain": "If it stays dry is the condition; the main clause is complete.",
        "hint": "Check both parts of the sentence."
      }
  },
  "y-nouns:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is jump a noun or a verb?",
        "answer": "verb",
        "explain": "Jump is usually a doing word, so it is a verb.",
        "hint": "A noun names a thing. A verb is an action."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word is a noun in 'The pony trotted'?",
        "options": ["The", "pony", "trotted"],
        "answer": 1,
        "explain": "Pony names an animal, so it is a noun.",
        "hint": "Find the naming word."
      },
      {
        "type": "multi",
        "q": "Guided: which word names a place?",
        "options": ["quickly", "London", "ran"],
        "answer": 1,
        "explain": "London is a place name, so it is a noun.",
        "hint": "A noun can name a person, a place or a thing."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: in 'Bella opened the gate', which word is a noun that names a thing?",
        "answer": "gate",
        "explain": "Gate names a thing, so it is a noun.",
        "hint": "Look for something you could touch."
      }
  },
  "y-nouns:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is the plural of cat?",
        "answer": "cats",
        "explain": "Add s to make more than one cat.",
        "hint": "One cat, two\u2026"
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is the correct plural of fox?",
        "options": ["foxs", "foxes", "foxies"],
        "answer": 1,
        "explain": "Words ending in x often add es: foxes.",
        "hint": "Try saying it out loud."
      },
      {
        "type": "multi",
        "q": "Guided: which sentence uses a plural noun correctly?",
        "options": ["The childs are ready.", "The children are ready.", "The childrens are ready."],
        "answer": 1,
        "explain": "Children is already the plural of child.",
        "hint": "Some plurals do not just add s."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: what is the plural of horse?",
        "answer": "horses",
        "explain": "One horse, two horses.",
        "hint": "Add s."
      }
  },
  "y-nouns:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: in 'The rider waved', which word is the noun?",
        "answer": "rider",
        "explain": "Rider names the person.",
        "hint": "Find the naming word."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which sentence has two nouns?",
        "options": ["She ran quickly.", "The dog chased the ball.", "Blue is bright."],
        "answer": 1,
        "explain": "Dog and ball are both nouns.",
        "hint": "Look for two naming words."
      },
      {
        "type": "multi",
        "q": "Guided: which word is the noun in 'A cold wind blew'?",
        "options": ["cold", "wind", "blew"],
        "answer": 1,
        "explain": "Wind names the thing. Cold describes it.",
        "hint": "The adjective is not the noun."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: in 'George closed the stable', write the two nouns, with the person first, like George stable.",
        "answer": "George stable",
        "explain": "George names a person and stable names a place or thing.",
        "hint": "Names of people and places are nouns too.",
        "accept": ["George stable", "george stable"]
      }
  },
  "y-read:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: if a sentence says 'The pony is grey', what colour is the pony?",
        "answer": "grey",
        "explain": "The fact is written in the sentence.",
        "hint": "Copy the fact; do not guess."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: 'The stable door is blue.' What colour is the door?",
        "options": ["red", "blue", "green"],
        "answer": 1,
        "explain": "The sentence says the door is blue.",
        "hint": "The answer is in the words."
      },
      {
        "type": "multi",
        "q": "Guided: 'George fed two ponies at 8.' How many ponies did he feed?",
        "options": ["8", "2", "10"],
        "answer": 1,
        "explain": "The sentence says two ponies. 8 is the time.",
        "hint": "Do not mix up the numbers."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: 'Bella walked to the arena after lunch.' When did she walk there?",
        "answer": "after lunch",
        "explain": "The sentence says after lunch.",
        "hint": "Find the time phrase.",
        "accept": ["after lunch", "After lunch"]
      }
  },
  "y-read:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does a fact have to be written in the text, yes or no?",
        "answer": "yes",
        "explain": "A retrieved fact is there in the words.",
        "hint": "Do not invent a fact."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: 'The yard was quiet after the rain stopped.' What had just happened?",
        "options": ["It was still raining hard.", "The rain had stopped.", "Snow had started."],
        "answer": 1,
        "explain": "The words say the rain stopped.",
        "hint": "Stay close to the sentence."
      },
      {
        "type": "multi",
        "q": "Guided: 'Only the grey pony was left in the field.' How many ponies were left?",
        "options": ["all of them", "only one", "none"],
        "answer": 1,
        "explain": "Only the grey pony means one pony was left.",
        "hint": "Only is an important word."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: 'She packed the tack, then locked the door.' What did she do last?",
        "options": ["packed the tack", "locked the door", "opened the door"],
        "answer": 1,
        "explain": "Then shows the order: locking the door came last.",
        "hint": "Look at the word then."
      }
  },
  "y-read:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should a careful guess still fit the words, yes or no?",
        "answer": "yes",
        "explain": "An inference has to be supported by the text.",
        "hint": "Do not invent a new story."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: 'He pulled his coat tighter and hurried to the barn.' What is suggested?",
        "options": ["He felt cold or wanted to get out of the weather.", "He was definitely going swimming.", "The barn was certainly closed forever."],
        "answer": 0,
        "explain": "Pulling a coat tighter and hurrying suggests cold or bad weather, but we should not invent extra facts.",
        "hint": "Use the clues, but do not over-claim."
      },
      {
        "type": "multi",
        "q": "Guided: 'She smiled when the pony trotted up.' What is suggested?",
        "options": ["She was pleased to see the pony.", "She was certainly angry.", "The pony had definitely run away forever."],
        "answer": 0,
        "explain": "A smile when the pony comes up suggests she is pleased.",
        "hint": "The text has to support the idea."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: 'The path was icy, so they led the ponies.' Why did they lead them?",
        "options": ["Because the path was icy.", "Because they were late.", "Because the ponies were missing."],
        "answer": 0,
        "explain": "So tells you the reason: the icy path.",
        "hint": "Stay with the reason given in the sentence."
      }
  },
  "y-sent:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what should a telling sentence start with?",
        "answer": "a capital letter",
        "explain": "A telling sentence starts with a capital letter.",
        "hint": "Look at the first letter.",
        "accept": ["a capital letter", "capital letter", "a capital"]
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which line is a complete telling sentence?",
        "options": ["ran to the gate", "The pony ran to the gate.", "the pony ran to the gate"],
        "answer": 1,
        "explain": "It has a capital, a verb, and a full stop.",
        "hint": "Check the start, the verb, and the ending."
      },
      {
        "type": "multi",
        "q": "Guided: which line is missing a verb?",
        "options": ["The brown pony.", "The brown pony trotted.", "Stop there."],
        "answer": 0,
        "explain": "The brown pony names something, but nothing happens.",
        "hint": "A sentence needs a doing or being word."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line is finished correctly?",
        "options": ["we stacked the jumps", "We stacked the jumps.", "We stacked the jumps"],
        "answer": 1,
        "explain": "Capital at the start and a full stop at the end, with a verb in the middle.",
        "hint": "Start, verb, stop."
      }
  },
  "y-sent:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: which word can join two short sentences, and or the?",
        "answer": "and",
        "explain": "And can join two short sentences into one clearer sentence.",
        "hint": "The joining word."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is the clearer joined sentence?",
        "options": ["The pony stopped. The rider waited. And stopped.", "The pony stopped and the rider waited.", "The pony stopped the rider waited."],
        "answer": 1,
        "explain": "And joins the two ideas without a comma splice or a fragment.",
        "hint": "Keep both ideas and put and in the middle."
      },
      {
        "type": "multi",
        "q": "Guided: which join is best?",
        "options": ["It was late, we packed up.", "It was late and we packed up.", "It was late we packed up and."],
        "answer": 1,
        "explain": "And joins the two complete ideas. A comma alone is not enough here.",
        "hint": "Use a joining word, not just a comma."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence is one clear joined idea?",
        "options": ["The light faded we headed in.", "The light faded, we headed in.", "The light faded and we headed in."],
        "answer": 2,
        "explain": "And is the clean join here.",
        "hint": "Two ideas, one joining word."
      }
  },
  "y-sent:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should a topic sentence tell the reader what the paragraph is about, yes or no?",
        "answer": "yes",
        "explain": "A topic sentence states the idea of the paragraph.",
        "hint": "It comes first, then the details."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which line would work as a topic sentence?",
        "options": ["And then.", "Checking the water is the first job in the yard.", "Purple."],
        "answer": 1,
        "explain": "It tells the reader what the writing will be about.",
        "hint": "Which line could open a paragraph?"
      },
      {
        "type": "multi",
        "q": "Guided: what should come after a topic sentence?",
        "options": ["a brand-new unrelated topic", "details that support the topic", "a full stop only"],
        "answer": 1,
        "explain": "The rest of the paragraph adds detail to the opening idea.",
        "hint": "Keep the paragraph on the same theme."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which opening is a clear topic sentence?",
        "options": ["Because.", "A good warm-up keeps the pony safe in the school.", "Also."],
        "answer": 1,
        "explain": "It states the idea the paragraph will explain.",
        "hint": "The reader should know the topic at once."
      }
  },
  "y-spell:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: how do you spell the number after seven, as a word?",
        "answer": "eight",
        "explain": "Eight is a common tricky word: e-i-g-h-t.",
        "hint": "Think of the number 8 in words."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which spelling of because is correct?",
        "options": ["becos", "because", "becuase"],
        "answer": 1,
        "explain": "Because has the ending -cause.",
        "hint": "Try sounding the second half."
      },
      {
        "type": "multi",
        "q": "Guided: which spelling of said is correct?",
        "options": ["sed", "said", "siad"],
        "answer": 1,
        "explain": "Said is a common exception: it looks a little like say, but is written said.",
        "hint": "This is one to remember."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: spell the word that means 'also', starting with t.",
        "answer": "too",
        "explain": "Too means also, or more than enough. It has two o's.",
        "hint": "Not to, and not two the number."
      }
  },
  "y-spell:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: which word means a place, there or their?",
        "answer": "there",
        "explain": "There points to a place. Their shows belonging.",
        "hint": "Here and there are places."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which sentence uses their correctly?",
        "options": ["The ponies ate there hay.", "The ponies ate their hay.", "The ponies ate they're hay."],
        "answer": 1,
        "explain": "Their shows the hay belongs to the ponies.",
        "hint": "Belonging uses their."
      },
      {
        "type": "multi",
        "q": "Guided: which sentence uses there as a place?",
        "options": ["Put the tack over their.", "Put the tack over there.", "Put the tack over they're."],
        "answer": 1,
        "explain": "There points to a place.",
        "hint": "You could also say 'over here'."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which line about spelling is correct?",
        "options": ["They're going to the field, and their rugs are over there.", "Their going to the field, and there rugs are over they're.", "There going to the field, and they're rugs are over their."],
        "answer": 0,
        "explain": "They're means they are; their shows belonging; there is the place.",
        "hint": "Try replacing they're with they are."
      }
  },
  "y-spell:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: in British English, does colour end in -our or -or?",
        "answer": "-our",
        "explain": "British spelling uses colour, with -our.",
        "hint": "Think of favourite and colour.",
        "accept": ["-our", "our"]
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is the British spelling of favorite?",
        "options": ["favorite", "favourite", "favoritte"],
        "answer": 1,
        "explain": "British English writes favourite with ou.",
        "hint": "Look for the ou."
      },
      {
        "type": "multi",
        "q": "Guided: which note about British spelling is right?",
        "options": ["organise is never used", "organise or organize can appear, but colour is the British form of color", "color is the only British form"],
        "answer": 1,
        "explain": "Colour is the usual British spelling. Organise is also used in British English.",
        "hint": "This lesson is about British word endings such as -our."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: write the British spelling of color.",
        "answer": "colour",
        "explain": "British English uses colour.",
        "hint": "Add the u."
      }
  },
  "y-verbs:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is table usually a noun or a verb?",
        "answer": "noun",
        "explain": "Table names a thing, so it is a noun.",
        "hint": "A verb is a doing or being word."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word is the verb in 'The horse galloped'?",
        "options": ["The", "horse", "galloped"],
        "answer": 2,
        "explain": "Galloped is the doing word.",
        "hint": "Ask: what happened?"
      },
      {
        "type": "multi",
        "q": "Guided: which sentence has a clear verb?",
        "options": ["The red gate.", "The red gate slammed.", "Bright and early."],
        "answer": 1,
        "explain": "Slammed is the verb. The first line is not a full sentence.",
        "hint": "Find the doing word."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: in 'They planted seeds', what is the verb?",
        "answer": "planted",
        "explain": "Planted is the action.",
        "hint": "What did they do?"
      }
  },
  "y-verbs:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: do we write 'I was' or 'I were'?",
        "answer": "I was",
        "explain": "Use was with I, he, she and it.",
        "hint": "One person, was."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which line about verbs is correct?",
        "options": ["We was tired.", "We were tired.", "We is tired."],
        "answer": 1,
        "explain": "We takes were, not was.",
        "hint": "More than one person uses were."
      },
      {
        "type": "multi",
        "q": "Guided: which line is correct for one rider?",
        "options": ["The rider were ready.", "The rider was ready.", "The rider are ready."],
        "answer": 1,
        "explain": "One rider takes was.",
        "hint": "Singular uses was."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence about verbs is correct?",
        "options": ["The horses was in the field.", "The horses were in the field.", "The horses is in the field."],
        "answer": 1,
        "explain": "Horses is plural, so use were.",
        "hint": "More than one horse."
      }
  },
  "y-verbs:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is 'walked' past or present tense?",
        "answer": "past",
        "explain": "Walked has -ed, so it is past tense.",
        "hint": "Has the action already happened?"
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which sentence keeps the same tense?",
        "options": ["She opens the door and walked in.", "She opened the door and walked in.", "She opened the door and walks in."],
        "answer": 1,
        "explain": "Opened and walked are both past tense.",
        "hint": "Do not hop from past to present."
      },
      {
        "type": "multi",
        "q": "Guided: which line stays in the present?",
        "options": ["He rides out and checked the gate.", "He rides out and checks the gate.", "He rode out and checks the gate."],
        "answer": 1,
        "explain": "Rides and checks are both present.",
        "hint": "Keep both verbs in the same time."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sentence stays in the past?",
        "options": ["I walk to the yard and filled the nets.", "I walked to the yard and filled the nets.", "I walked to the yard and fill the nets."],
        "answer": 1,
        "explain": "Walked and filled are both past.",
        "hint": "Both actions have already happened."
      }
  }
};

const ENGLISH_TEACH_DEEP = {
  "y-caps": {
    "extra": "A capital letter is a signal. It marks the start of a sentence, and it marks names of people, places, days and months. The word I is always a capital.",
    "mistake": "A common slip is to capitalise a normal word in the middle of a sentence, or to forget the capital on a name. Save question marks for questions, and full stops for telling sentences.",
    "example": ["Find the first word and give it a capital.", "Check any names, then finish with the right end mark."]
  },
  "y-nouns": {
    "extra": "A noun names a person, a place or a thing. If you can put the, a or an in front of a word, it is often a noun.",
    "mistake": "A common slip is to call an adjective a noun, for example treating rusty as the naming word in 'the rusty gate'. The noun is gate.",
    "example": ["Ask: who or what is this about?", "The naming word is the noun."]
  },
  "y-verbs": {
    "extra": "A verb is a doing or being word. Every complete sentence needs one. Tense tells you whether the action is in the past, present or future.",
    "mistake": "A common slip is to hop from past to present in the same sentence, or to use was with we and they. We and they take were.",
    "example": ["Find the doing or being word.", "Check it agrees with the subject and stays in one tense."]
  },
  "y-adj": {
    "extra": "An adjective describes a noun. A precise adjective, such as narrow or rusty, tells the reader more than a vague word such as nice or big.",
    "mistake": "A common slip is to use -est when only two things are being compared, or to write more taller. Two things take -er; three or more take -est.",
    "example": ["Find the noun, then the word that describes it.", "If you are comparing, count how many things there are before you choose -er or -est."]
  },
  "y-join": {
    "extra": "Joining words such as and, but, because, when and if help you build a longer, clearer sentence. And adds, but contrasts, because gives a reason, when marks time, and if sets a condition.",
    "mistake": "A common slip is to join two sentences with only a comma, or to leave a joining word with no complete idea after it.",
    "example": ["Write the two short ideas first.", "Choose the joining word that shows the relationship, then check both sides still make sense."]
  },
  "y-spell": {
    "extra": "Some words have to be learned as a set, especially homophones such as their, there and they're, and British spellings such as colour and favourite.",
    "mistake": "A common slip is to write there when you mean belonging (their), or they're when you do not mean they are. Try swapping in they are to check.",
    "example": ["Say the word in the sentence.", "If it is a homophone, test the meaning before you choose the spelling."]
  },
  "y-read": {
    "extra": "First find facts that are written in the text. Then, if you make a careful suggestion, check that the words still support it. Do not invent a new story.",
    "mistake": "A common slip is to use something you already know, rather than what the text actually says.",
    "example": ["Underline the words that answer the question.", "If you infer, add the clue that supports your idea."]
  },
  "y-sent": {
    "extra": "A complete telling sentence needs a capital letter, a verb, and an end mark. Later, a topic sentence tells the reader what a whole paragraph is about.",
    "mistake": "A common slip is to write a fragment that has no verb, or to start a paragraph with a detail and never state the topic.",
    "example": ["Check for a subject and a verb.", "If you are writing a paragraph, open with the main idea, then add detail."]
  },
  "grammar": {
    "extra": "Grammar is the way words work together. A clause needs a subject and a verb. Main clauses can stand alone; subordinate clauses cannot. Word classes such as prepositions, adverbs and modal verbs add precision.",
    "mistake": "A common slip is to leave a subordinate clause hanging, as in 'Because the path was icy.' It still needs a main clause.",
    "example": ["Find the subject and the verb.", "If you have used when, if, although or because, check that a complete main clause is also there."]
  },
  "punctuation": {
    "extra": "Punctuation shows the reader where ideas start, pause and stop. Full stops, question marks, commas, apostrophes, speech marks, colons and semicolons each have a job.",
    "mistake": "A common slip is the comma splice: joining two complete sentences with only a comma. Use a full stop, a joining word, or a semicolon if both sides are complete and closely linked.",
    "example": ["Read the sentence aloud and notice the pauses.", "Choose the mark that matches the job: stop, list, belonging, speech, or a close link."]
  },
  "vocabulary": {
    "extra": "Vocabulary is about choosing the right word. Synonyms are close in meaning, antonyms are opposites, and homophones sound the same but are spelled differently. Precise words help the reader.",
    "mistake": "A common slip is to pick a word that sounds right but has the wrong meaning, especially with homophones such as bare and bear, or their, there and they're.",
    "example": ["Think about the exact meaning you need.", "If two spellings sound the same, test which meaning fits the sentence."]
  },
  "reading": {
    "extra": "Strong reading moves from retrieving facts, to inferring with evidence, to commenting on language and making a supported judgement. In England GCSEs, reading is assessed on the 9\u20131 scale; these lessons help you work towards that and do not promise a grade.",
    "mistake": "A common slip is to give an opinion with no evidence, or to infer something the text does not support.",
    "example": ["Find the evidence first.", "Then explain what the words suggest, without adding facts that are not there."]
  },
  "writing": {
    "extra": "Writing is easier to follow when you know the purpose and the reader. Stories need a clear shape, instructions need ordered steps, reports need facts, and persuasive writing needs a clear viewpoint and reasons. England GCSEs use a 9\u20131 scale for this craft; a lesson cannot promise a grade.",
    "mistake": "A common slip is to lose the purpose, for example writing a chatty joke in a formal report, or forgetting to make the request in a persuasive letter.",
    "example": ["Decide the purpose and the reader first.", "Plan the opening, the supporting points, and a clear ending before you write."]
  }
};

const ENGLISH_GCSE_NOTE = "On the England GCSE 9-1 scale, this is the sort of knowledge you work towards. This lesson does not promise a grade.";

function englishMiniQuestion(spec) {
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

function englishExtrasFor(skillId, stage) {
  return ENGLISH_MINI_EXTRAS[skillId + ":" + (Number(stage) || 1)] || null;
}

function buildEnglishMiniLesson(skillId, stage) {
  const st = Number(stage) || 1;
  const mod = typeof getTeachModule === "function" ? getTeachModule("english", skillId, st) : null;
  const extras = englishExtrasFor(skillId, st);
  if (!extras || !extras.exit) return null;
  const skill =
    (typeof getSkill === "function" && getSkill(skillId)) ||
    (typeof SKILLS !== "undefined" && SKILLS.english && SKILLS.english[skillId]) ||
    { name: skillId };
  const deep = ENGLISH_TEACH_DEEP[skillId] || {};
  const points = (mod && mod.teach && (mod.teach.points || mod.teach.paragraphs)) || [];
  const paragraphs = points.slice();
  if (deep.extra && paragraphs.indexOf(deep.extra) === -1) paragraphs.push(deep.extra);
  if (st >= 4 && ["grammar", "punctuation", "reading", "vocabulary", "writing"].indexOf(skillId) !== -1 && paragraphs.indexOf(ENGLISH_GCSE_NOTE) === -1) paragraphs.push(ENGLISH_GCSE_NOTE);
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
  const clip = typeof getVerifiedLessonVideo === "function" ? getVerifiedLessonVideo("english", skillId, st) : null;
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
    prereq: (extras.prereq || []).map(englishMiniQuestion),
    guided: (extras.guided || []).map(englishMiniQuestion),
    exit: englishMiniQuestion(extras.exit),
    revisit: "If that felt shaky, go back to the example and try one more guided question later.",
    video: clip || null,
  };
}

var _getMiniLessonBeforeEnglish = typeof getMiniLesson === "function" ? getMiniLesson : function () { return null; };
getMiniLesson = function (subject, skillId, stage) {
  const explicit = _getMiniLessonBeforeEnglish(subject, skillId, stage);
  if (explicit) {
    if (!explicit.video && typeof getVerifiedLessonVideo === "function") {
      explicit.video = getVerifiedLessonVideo(subject, skillId, stage);
    }
    if (explicit.teach && subject === "english") {
      const deep = ENGLISH_TEACH_DEEP[skillId];
      if (deep && deep.mistake && !explicit.teach.mistake) explicit.teach.mistake = deep.mistake;
      if (deep && deep.extra && Array.isArray(explicit.teach.paragraphs) && explicit.teach.paragraphs.indexOf(deep.extra) === -1) {
        explicit.teach.paragraphs = explicit.teach.paragraphs.concat([deep.extra]);
      }
      if ((Number(stage) || 1) >= 4 && ["grammar", "punctuation", "reading", "vocabulary", "writing"].indexOf(skillId) !== -1 && Array.isArray(explicit.teach.paragraphs) && explicit.teach.paragraphs.indexOf(ENGLISH_GCSE_NOTE) === -1) {
        explicit.teach.paragraphs = explicit.teach.paragraphs.concat([ENGLISH_GCSE_NOTE]);
      }
    }
    return explicit;
  }
  if (subject === "english") return buildEnglishMiniLesson(skillId, stage);
  return null;
}
