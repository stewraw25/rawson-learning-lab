/**
 * Week of 2 November 2026 — fresh questions.
 * Stage 1 stays easy. Stage 2 is one step harder.
 * Nothing here repeats a question the children already have.
 */
function weekMulti(q, options, answer, explain, passage) {
  const item = {
    q: q,
    type: "multi",
    options: options,
    answer: answer,
    explain: explain,
    stage: "both",
    week: 2,
  };
  if (passage) item.passage = passage;
  return item;
}

function weekTyped(q, answer, explain) {
  return {
    q: q,
    type: "typed",
    answer: String(answer),
    explain: explain,
    stage: "both",
    week: 2,
  };
}

const WEEK_CORE = {
  maths: {
    number: {
      1: [
        weekTyped(
          "What number comes before 15?",
          "14",
          "Count back one step: 15, then 14."
        ),
        weekMulti(
          "Which of these numbers is the smallest?",
          ["12", "3", "9", "7"],
          1,
          "3 is smaller than 7, 9 and 12."
        ),
      ],
      2: [
        weekTyped(
          "What is 100 more than 250?",
          "350",
          "Adding 100 changes the hundreds digit: 250 + 100 = 350."
        ),
      ],
    },
    operations: {
      1: [
        weekTyped("What is 11 − 5?", "6", "Start at 11 and count back 5. You land on 6."),
        weekTyped("What is 4 × 3?", "12", "Four groups of 3 make 12."),
      ],
      2: [
        weekTyped("What is 36 ÷ 6?", "6", "Six sixes are 36, so 36 ÷ 6 = 6."),
      ],
    },
    fractions: {
      1: [
        weekTyped("What is half of 14?", "7", "Half means split into 2 equal parts. 14 ÷ 2 = 7."),
        weekTyped("What is a quarter of 20?", "5", "A quarter is 4 equal parts. 20 ÷ 4 = 5."),
      ],
      2: [
        weekTyped("What is 1/5 of 40?", "8", "One fifth means divide by 5. 40 ÷ 5 = 8."),
      ],
    },
    algebra: {
      1: [
        weekTyped(
          "What do you add to 3 to make 10?",
          "7",
          "3 and 7 more make 10. Say the pair out loud: 3 and 7."
        ),
        weekTyped(
          "What do you add to 8 to make 10?",
          "2",
          "8 and 2 more make 10. Count on two steps: 9, then 10."
        ),
      ],
      2: [
        weekTyped(
          "A tricycle has 3 wheels. How many wheels do 4 tricycles have?",
          "12",
          "4 groups of 3 is 12. Count 3, 6, 9, 12."
        ),
      ],
    },
    geometry: {
      1: [
        weekTyped(
          "How many corners does a rectangle have?",
          "4",
          "A rectangle has 4 corners and 4 sides."
        ),
        weekMulti(
          "Which shape has no corners?",
          ["A circle", "A square", "A triangle"],
          0,
          "A circle is round all the way. It has no corners."
        ),
      ],
      2: [
        weekTyped(
          "A square has sides of 6 cm. What is the perimeter in cm?",
          "24",
          "A square has 4 equal sides. 6 + 6 + 6 + 6 = 24 cm."
        ),
      ],
    },
    data: {
      1: [
        weekMulti(
          "Four sticks and a diagonal line across them is a tally for…",
          ["4", "5", "6"],
          1,
          "The fifth mark is the diagonal that closes the gate. That tally is 5."
        ),
        weekTyped(
          "There are 3 red cars and 5 blue cars. How many cars altogether?",
          "8",
          "3 and 5 more is 8 cars."
        ),
      ],
      2: [
        weekTyped(
          "The numbers are 2, 9 and 4. What is the range?",
          "7",
          "Range is biggest minus smallest. 9 − 2 = 7."
        ),
      ],
    },
  },
  english: {
    grammar: {
      1: [
        weekMulti(
          "Which sentence is written correctly?",
          ["the cat sat", "The cat sat.", "The cat sat", "the cat sat."],
          1,
          "A telling sentence starts with a capital letter and ends with a full stop."
        ),
        weekMulti(
          "Which word is the verb in 'Bella brushes the pony'?",
          ["Bella", "brushes", "the", "pony"],
          1,
          "Brushes is the doing word. That is the verb."
        ),
      ],
      2: [
        weekMulti(
          "Which sentence uses the right verb?",
          ["The ponies was tired.", "The ponies were tired.", "The ponies is tired."],
          1,
          "Ponies is plural, so the verb is were, not was."
        ),
      ],
    },
    punctuation: {
      1: [
        weekMulti(
          "Which one is a question?",
          ["Where is the riding hat?", "The hat is on the peg.", "Hat on the peg"],
          0,
          "A question asks something and ends with a question mark."
        ),
        weekMulti(
          "Which word is spelled correctly?",
          ["beautiful", "beutiful", "butiful"],
          0,
          "Beautiful has the letters b-e-a-u in the middle."
        ),
      ],
      2: [
        weekMulti(
          "Which sentence uses a comma in a list?",
          [
            "I packed a hat, gloves and boots.",
            "I packed a hat gloves and boots.",
            "I packed, a hat gloves and boots",
          ],
          0,
          "Commas separate the items in a list. The last pair can use and."
        ),
      ],
    },
    vocabulary: {
      1: [
        weekMulti("What does tiny mean?", ["Very small", "Very loud", "Very late"], 0, "Tiny means very small."),
        weekMulti(
          "Which word means the same as happy?",
          ["Glad", "Angry", "Asleep"],
          0,
          "Glad and happy mean almost the same thing. They are synonyms."
        ),
      ],
      2: [
        weekMulti(
          "A cautious rider is…",
          ["Careful", "Reckless", "Invisible"],
          0,
          "Cautious means careful, not rushing into danger."
        ),
      ],
    },
    reading: {
      1: [
        weekMulti(
          "Why did the pony stop?",
          ["The gate was shut", "She wanted a helmet", "The moon told her to"],
          0,
          "The passage says the gate was shut, so the pony could not go on.",
          "The pony pricked her ears and stopped. The gate at the end of the lane was shut."
        ),
        weekMulti(
          "How does George feel?",
          ["Proud", "Furious", "Asleep"],
          0,
          "A grin and a thumbs-up show he is pleased, not angry.",
          "George climbed out of the kart, grinned, and gave his coach a thumbs-up."
        ),
      ],
      2: [
        weekMulti(
          "What can you infer about the yard?",
          ["It had rained", "It was snowing in July", "Nobody owns a bucket"],
          0,
          "Puddles and dripping eaves tell you rain has fallen.",
          "Puddles sat in the yard and the stable eaves were still dripping."
        ),
      ],
    },
    writing: {
      1: [
        weekMulti(
          "Which is the stronger describing word for a fast pony?",
          ["She thundered down the lane.", "She went.", "She was a thing."],
          0,
          "Thundered helps the reader hear the speed. Went is too vague."
        ),
        weekMulti(
          "A story needs a beginning, a middle and…",
          ["an ending", "a spare helmet", "a times table"],
          0,
          "Readers need an ending so the story feels finished."
        ),
      ],
      2: [
        weekMulti(
          "Which opening makes you want to read on?",
          [
            "The stable door banged open in the dark.",
            "This is a story.",
            "I will write about stuff.",
          ],
          0,
          "A bang in the dark raises a question. The other openings tell us nothing."
        ),
      ],
    },
  },
  science: {
    biology: {
      1: [
        weekMulti(
          "Which of these is a living thing?",
          ["A horse", "A stone", "A helmet"],
          0,
          "A horse grows, feeds and breathes. A stone and a helmet do not."
        ),
        weekMulti(
          "To grow, a plant needs water and also…",
          ["light", "chocolate", "a steering wheel"],
          0,
          "Plants use light to make their food. Sweets and kart parts do not help."
        ),
      ],
      2: [
        weekMulti(
          "Which part of a plant takes in water?",
          ["The roots", "The flower only", "The shadow"],
          0,
          "Roots reach into the soil and take up water."
        ),
      ],
    },
    chemistry: {
      1: [
        weekMulti(
          "Ice is water that has become a…",
          ["solid", "type of animal", "sound"],
          0,
          "Cooling liquid water enough turns it into solid ice."
        ),
        weekMulti(
          "Which one is a liquid you could pour at the kitchen table?",
          ["Water", "A brick", "A wooden spoon"],
          0,
          "Water flows and takes the shape of the cup. A brick does not pour."
        ),
      ],
      2: [
        weekMulti(
          "Boiling water in a kettle makes…",
          ["water vapour", "new wood", "iron filings"],
          0,
          "Boiling turns liquid water into a gas called water vapour or steam."
        ),
      ],
    },
    physics: {
      1: [
        weekMulti(
          "A push or a pull is called a…",
          ["force", "colour", "full stop"],
          0,
          "Forces are pushes and pulls. They can start, stop or turn things."
        ),
        weekMulti(
          "Which one is a source of light?",
          ["The Sun", "A dark cupboard", "A shadow"],
          0,
          "The Sun makes light. A shadow is only the place light does not reach."
        ),
      ],
      2: [
        weekMulti(
          "Friction is useful when it…",
          ["stops your shoes slipping", "makes every surface into ice", "turns off gravity"],
          0,
          "Friction between your shoes and the ground helps you grip and stop."
        ),
      ],
    },
    method: {
      1: [
        weekMulti(
          "To compare two plants fairly you should change…",
          ["only one thing", "everything at once", "nothing, then guess"],
          0,
          "A fair test changes one thing and keeps the rest the same."
        ),
        weekMulti(
          "A result you did not expect should be…",
          ["checked, not hidden", "rubbed out so the page looks neat", "ignored forever"],
          0,
          "Odd results can be important. Check them instead of hiding them."
        ),
      ],
      2: [
        weekMulti(
          "The thing you measure in a test is the…",
          ["dependent variable", "joke", "title decoration"],
          0,
          "The dependent variable is what you measure after you change something."
        ),
      ],
    },
  },
  horses: {
    care: {
      1: [
        weekMulti(
          "A horse that is quiet and not eating needs…",
          ["an adult told straight away", "a joke and more sweets", "to be ignored until tomorrow"],
          0,
          "Not eating can mean the horse is poorly. Tell a grown-up now."
        ),
        weekMulti(
          "Kind hands around a horse means…",
          ["slow, calm and predictable", "sudden slaps for fun", "yanking the lead rope"],
          0,
          "Horses trust hands that move calmly and do not surprise them."
        ),
      ],
      2: [
        weekMulti(
          "Before you walk behind a horse you should…",
          ["stay close and let them know you are there, or go wide", "sprint under the tail", "clap in their ear"],
          0,
          "A startled horse may kick. They need to know where you are."
        ),
      ],
    },
    water: {
      1: [
        weekMulti(
          "Green slime in a bucket means you should…",
          ["tip it out, scrub and refill", "call the slime a vitamin", "leave it all week"],
          0,
          "Slime is dirty water. Horses need a clean drink."
        ),
        weekTyped(
          "A horse should be offered fresh water at least how many times each day? Type a number.",
          "2",
          "Look at least twice a day. Morning and evening is a simple start."
        ),
      ],
      2: [
        weekMulti(
          "Ice on the trough in winter is…",
          ["not a drink until it is broken or the water is changed", "better than water", "a toy"],
          0,
          "Horses cannot drink a solid lid of ice. Break it or refill, with a grown-up."
        ),
      ],
    },
    feeding: {
      1: [
        weekMulti(
          "The main food for most horses is…",
          ["hay or grass", "chocolate", "bread and jam"],
          0,
          "Forage — hay and grass — is the base of a horse's food."
        ),
        weekMulti(
          "A carrot for a horse is best thought of as…",
          ["a small treat", "the only meal they need", "something they must never see"],
          0,
          "A carrot is a treat. It does not replace hay."
        ),
      ],
      2: [
        weekMulti(
          "You change a horse's feed…",
          ["slowly, over days", "all in five minutes", "only by guessing"],
          0,
          "A sudden rich feed can upset the tummy. Change it slowly and ask an adult."
        ),
      ],
    },
    grooming: {
      1: [
        weekMulti(
          "A hoof pick is used to…",
          ["clear stones from the hoof", "paint the stable", "cut the mane without looking"],
          0,
          "Stones in the hoof hurt. Pick them out with help if you are still learning."
        ),
        weekMulti(
          "You groom in the direction that…",
          ["follows the lie of the coat", "always goes against every hair as hard as you can", "avoids the horse completely"],
          0,
          "Following the coat is comfortable. Rough backwards brushing is not the everyday job."
        ),
      ],
      2: [
        weekMulti(
          "A hot, sweaty horse after work should be…",
          ["walked and cooled before rugs and feed", "shut in at once under a heavy rug", "given a huge bucket of nuts"],
          0,
          "Cool them down first. A soaked rug on a hot horse is not kind."
        ),
      ],
    },
    stable: {
      1: [
        weekMulti(
          "A safe bed is…",
          ["deep, dry and clean", "soaking wet", "a pile of tools"],
          0,
          "Wet beds and hidden tools cause slips and sore skin."
        ),
        weekMulti(
          "Tools in the stable should be…",
          ["put away, not left tines-up", "dropped in the bed", "used as toys"],
          0,
          "A fork left tines-up can stab a hoof or a foot."
        ),
      ],
      2: [
        weekMulti(
          "Droppings in the bed should be…",
          ["skipped out", "left to build a mountain", "hidden under hay"],
          0,
          "Skip out so the bed stays dry and the horse is not standing in muck."
        ),
      ],
    },
    riding: {
      1: [
        weekMulti(
          "You mount a horse from…",
          ["the left, the near side, unless your instructor says otherwise", "the roof", "a surprise jump from behind"],
          0,
          "The usual side is the left. An instructor's plan wins if the horse is different."
        ),
        weekMulti(
          "Before you go faster you…",
          ["walk and check the girth", "gallop from the stable door", "take the hat off"],
          0,
          "Walk first. A loose girth can slip when you speed up."
        ),
      ],
      2: [
        weekMulti(
          "Rising trot is…",
          ["rising and sitting with the two-beat trot", "standing on the saddle", "holding the mane and closing your eyes"],
          0,
          "You rise and sit in time with the trot so you do not bounce on the horse's back."
        ),
      ],
    },
    tack: {
      1: [
        weekMulti(
          "Every ride starts with…",
          ["a riding hat done up", "a baseball cap", "no hat if you are only walking"],
          0,
          "A proper riding hat, done up, every time. Even a short walk."
        ),
        weekMulti(
          "The girth keeps…",
          ["the saddle from slipping", "the horse's dinner in", "the reins in your pocket"],
          0,
          "Check the girth, with help, so the saddle stays put."
        ),
      ],
      2: [
        weekMulti(
          "A dirty, cracked rein should be…",
          ["shown to an adult before you ride", "pulled harder so it looks fine", "hidden under the saddle flap"],
          0,
          "Leather that is cracking can snap. Do not ride on kit that looks unsafe."
        ),
      ],
    },
    history: {
      1: [
        weekMulti(
          "Before cars, horses often helped people…",
          ["travel and farm", "send emails", "charge phones"],
          0,
          "Horses pulled carts and ploughs and carried people for thousands of years."
        ),
        weekMulti(
          "Police horses today can still…",
          ["work with people in towns", "only live on the moon", "replace a riding hat"],
          0,
          "Some horses still work, including police horses in towns."
        ),
      ],
      2: [
        weekMulti(
          "Pit ponies were horses that worked…",
          ["underground in mines", "only at birthday parties", "as car engines"],
          0,
          "Pit ponies hauled loads in coal mines. It was hard, dark work."
        ),
      ],
    },
  },
};

/** Row: question, options, answer index, explanation, difficulty, week flag. */
const WEEK_KART = {
  safety: {
    1: [
      ["You spot oil on the racing line. You…", ["Slow down and tell a marshal", "Speed up to splash it", "Close your eyes"], 0, "Oil is slippery. Ease off and let a marshal know.", 2, 2],
      ["A friend offers a helmet that wobbles on your head. You…", ["Ask for one that fits", "Pad it with a scarf and hope", "Leave the strap undone"], 0, "A loose helmet will not stay on in a bump. Fit matters.", 3, 2],
    ],
    2: [
      ["A yellow and red striped flag usually warns of…", ["A slippery surface", "The winner's anthem", "Lunch"], 0, "Stripes can mean oil or rain. Ease off and do not make a sudden move.", 2, 2],
    ],
  },
  kit: {
    1: [
      ["Shoes for karting should…", ["Cover your toes and stay on", "Be flip-flops", "Come off when you brake"], 0, "A shoe that falls off cannot work the pedal.", 2, 2],
      ["If the overalls drag on the ground you…", ["Ask for a smaller size", "Tuck them into the chain", "Cut them on the grid"], 0, "Flappy cloth near the chain can catch. Ask a grown-up.", 3, 2],
    ],
    2: [
      ["A visor you cannot see through is…", ["A reason to stop and swap it", "Faster", "Only a problem for adults"], 0, "If you cannot see the corner, you are not safe to drive.", 2, 2],
    ],
  },
  kart: {
    1: [
      ["Before the kart rolls you should know where to find…", ["The kill switch", "The ice-cream queue", "The radio"], 0, "The kill switch stops the engine. Find it before you need it.", 2, 2],
      ["A tyre that looks flat should be…", ["Shown to a marshal before you drive", "Let down even more", "Ignored if the kart is your favourite colour"], 0, "A flat tyre will not steer or grip properly.", 3, 2],
    ],
    2: [
      ["Slick tyres on a wet patch…", ["Slide", "Grip better than rain tyres", "Dry the track by magic"], 0, "Smooth slicks cannot clear water. A puddle can spin you.", 2, 2],
    ],
  },
  pedals: {
    1: [
      ["The right-hand pedal on most karts is…", ["The throttle, which makes you go", "The horn", "The reverse gear"], 0, "Throttle is go. Brake is stop. Learn which is which before you roll.", 2, 2],
      ["You squeeze the throttle rather than stamp because…", ["Smooth is faster and safer", "Stamping is the rule", "The pedal is a button for music"], 0, "A stamp unsettles the kart. Squeeze on, ease off.", 3, 2],
    ],
    2: [
      ["The strongest braking is usually done while the kart is…", ["Straight", "Already fully sideways", "In the air"], 0, "Brake in a straight line first, then turn. Braking mid-slide can spin you.", 2, 2],
    ],
  },
  marshal: {
    1: [
      ["A marshal pointing you to one side means…", ["Follow that direction", "Take a shortcut across the grass", "Argue from the seat"], 0, "Marshals can see the whole corner. Do what they ask.", 2, 2],
      ["If you stop on track you…", ["Stay in, helmet on, and wait", "Climb out and jog to the pits", "Take the helmet off so people know you"], 0, "Stay in the kart until a marshal helps. The track is still live.", 3, 2],
    ],
    2: [
      ["You are asked to push a kart. You push from…", ["The back, looking where you are going", "The front, walking backwards into traffic", "The steering wheel while you sit on the side pod"], 0, "Eyes up, and only when a marshal says the track is safe.", 2, 2],
    ],
  },
  flags: {
    1: [
      ["A green flag means…", ["The track is clear to go", "Stop at once", "You have a penalty"], 0, "Green means racing can carry on. Yellow was the warning.", 2, 2],
      ["The chequered flag means…", ["The session is finished", "Speed up for one more racing lap", "Rain has started"], 0, "Chequered is the finish. Ease off and follow the marshals.", 3, 2],
    ],
    2: [
      ["A blue flag waved at you means…", ["A faster kart is behind — do not block", "You must invent a new line across the grass", "You won"], 0, "Let the faster kart through when it is safe. Do not weave.", 2, 2],
    ],
  },
  driving: {
    1: [
      ["Your eyes should look…", ["Ahead, to where you want to go", "Down at the front bumper", "At the driver next to you the whole lap"], 0, "You steer towards where you look. Look through the corner.", 2, 2],
      ["On a first lap of a new track you should…", ["Learn the corners before you push", "Go flat out because nobody is watching", "Close your eyes on the straight"], 0, "Learn the shape of the track first. Speed comes after.", 3, 2],
    ],
    2: [
      ["If the kart will not turn and is pushing wide, a first try is…", ["A small lift of the throttle", "More and more steering lock forever", "Both feet on the brake and the throttle"], 0, "A little lift can give the front tyres grip. Endless lock often scrubs speed.", 2, 2],
    ],
  },
  corners: {
    1: [
      ["A simple corner plan is…", ["Slow a little, turn, then go", "Brake only after you have spun", "Turn, then remember the brake"], 0, "Slow in, turn, then pick up speed. That is the basic corner.", 2, 2],
      ["The racing line, simply, is…", ["The smooth fast path, often wide then in then wide", "The grass", "The pit wall"], 0, "Wide, to the inside, then wide again. That is out-in-out.", 3, 2],
    ],
    2: [
      ["The apex is…", ["The inside point of the corner", "The start lights", "The fuel can"], 0, "You pass closest to the inside at the apex, then unwind the steering.", 2, 2],
    ],
  },
  pits: {
    1: [
      ["While you wait for your session you…", ["Stay in the pit or where the marshal asked", "Wander onto a live track", "Sit on the tyre wall and dangle your legs"], 0, "The pit is the safe place to wait. The track is not a playground.", 2, 2],
      ["In the pit lane, if you are allowed to drive, you go…", ["Slowly", "As fast as the straight", "With your visor up so you can chat"], 0, "Pit lane is slow. Fast karts and people on foot do not mix.", 3, 2],
    ],
    2: [
      ["Parc fermé means…", ["Hands off the kart until you are told", "Free snacks", "You may change the engine"], 0, "It is a closed park. No tinkering until the officials release you.", 2, 2],
    ],
  },
  racing: {
    1: [
      ["The start lights go out. That means…", ["You may go", "Wait for a second green", "The race is cancelled"], 0, "Lights out is the start. Going before that is a jump start.", 2, 2],
      ["A formation lap is for…", ["Warming tyres and lining up", "Overtaking practice at full speed", "Parking in the cafe"], 0, "It is a controlled lap. Stay in order unless you are told otherwise.", 3, 2],
    ],
    2: [
      ["A clean overtake leaves…", ["Room for the other kart", "The other kart on the grass on purpose", "No gap at all"], 0, "Leave a kart's width. Contact is not a pass.", 2, 2],
    ],
  },
  line: {
    1: [
      ["The safe place to drive is…", ["On the tarmac", "Across the grass to save time", "Along the barrier for fun"], 0, "Stay on the track. Grass and gravel are not shortcuts.", 2, 2],
      ["If all four wheels go off you should…", ["Lift, look, and rejoin when there is a gap", "Rejoin straight across someone's nose", "Stop sideways on the racing line"], 0, "Look before you come back. A blind rejoin causes crashes.", 3, 2],
    ],
    2: [
      ["Driving off line on purpose to block, again and again, is…", ["Not fair and often against the rules", "The best way to learn", "What the blue flag asks for"], 0, "One move to defend is different from weaving. Weaving is not allowed.", 2, 2],
    ],
  },
  respect: {
    1: [
      ["After a bump you…", ["Check you are both all right and carry on fairly", "Ram them on the next straight to teach a lesson", "Throw your gloves"], 0, "Racing incidents happen. Payback crashes are not racing.", 2, 2],
      ["If a marshal tells you off you…", ["Listen, even if you think you were right", "Argue until they change the flag", "Drive off mid-sentence"], 0, "You can talk calmly later. On track, you listen.", 3, 2],
    ],
    2: [
      ["Championship points are won by…", ["Finishing races, not by one hero crash", "The loudest engine", "Ignoring flags if you are quick"], 0, "A steady finish scores. A crash for a pass that fails scores nothing.", 2, 2],
    ],
  },
};

const WEEK_INVEST = {
  compound: {
    1: [
      ["You put £2 in the piggy bank and do not spend it. The next day that £2 is…", ["Still yours", "Automatically £20", "Gone because a day passed"], 0, "Leaving it there keeps the £2. Time alone does not spend it.", 2, 2],
      ["If a bank adds a little extra to money you leave with them, that extra is called…", ["interest", "a sweet", "a fine you always pay"], 0, "Not every pot pays interest. A home piggy bank usually does not.", 3, 2],
    ],
    2: [
      ["Pretend £50 grows by 10% to £55. The next 10% is worked out on…", ["£55, so the extra is £5.50", "£50 again, forever", "£0"], 0, "That is the snowball idea. 10% here is pretend, not a promise.", 2, 2],
    ],
  },
  spend: {
    1: [
      ["A need is something like…", ["Food", "A fifth video game", "A poster you saw once"], 0, "Needs keep you going. Toys can be lovely and still be wants.", 2, 2],
      ["An advert on a game wants you to…", ["Spend", "Check the price with a parent first", "Wait a month by law"], 0, "The advert is the shop's voice. You can still say no.", 3, 2],
    ],
    2: [
      ["£9.99 is closest to…", ["£10", "£9 exactly", "£1"], 0, "Shops like prices that look smaller. Round £9.99 up to £10 in your head.", 2, 2],
    ],
  },
  twenty: {
    1: [
      ["You have £2. You put 20% aside. How much is that?", ["40p", "£2", "20p"], 0, "20% of £1 is 20p, so 20% of £2 is 40p.", 2, 2],
      ["Saving a slice first means…", ["Future You actually gets it", "The sweets decide", "The coins double overnight"], 0, "What you set aside before spending is the part that stays.", 3, 2],
    ],
    2: [
      ["20% of £15 is…", ["£3", "£15", "30p"], 0, "A fifth of £15 is £3. The other £12 is still yours to use.", 2, 2],
    ],
  },
  time: {
    1: [
      ["A snowball of money needs…", ["Time and something left in the pot", "Five minutes and a shout", "A new plan every morning"], 0, "Growth on growth takes years, and only if the money stays in.", 2, 2],
      ["Checking the pot every five minutes…", ["Does not make it grow faster", "Is how interest is invented", "Is required by law"], 0, "Looking is not the same as leaving it alone to grow.", 3, 2],
    ],
    2: [
      ["£1 a week for a year is £52 before any growth. The lesson is…", ["Small regular amounts become a pile", "You must invest £1 a week", "£1 becomes £52 overnight"], 0, "The habit is the point. It is not an order for your family.", 2, 2],
    ],
  },
  metals: {
    1: [
      ["A gold coin you can hold is…", ["A real thing, and the price can still fall", "A promise it will only go up", "The same as a sweet"], 0, "Gold is a thing you can own. Its price still moves.", 2, 2],
      ["Silver and gold prices…", ["Can go down as well as up", "Are fixed by your piggy bank", "Never change"], 0, "Metals are not a savings account with a guaranteed extra.", 3, 2],
    ],
    2: [
      ["Putting every pound into gold is closer to…", ["A big bet", "A glass of water", "A school dinner"], 0, "One metal can fall. A small slice is different from the whole pot.", 2, 2],
    ],
  },
  bitcoin: {
    1: [
      ["Internet money such as Bitcoin…", ["Can fall a lot, very fast", "Is the same as coins in a piggy bank", "Cannot be stolen"], 0, "The price jumps around. It is not pocket money you need next week.", 2, 2],
      ["Someone online says send £10 and they will send £100 back. You…", ["Send nothing and tell an adult", "Send £10 as a test", "Send your password too"], 0, "Strangers do not double your money. That is a trap.", 3, 2],
    ],
    2: [
      ["A password for an account is…", ["Not for chats, even if they say they are the bank", "Fine to put in a game chat", "The same as your first name"], 0, "A real bank will not ask a child to read out a secret code.", 2, 2],
    ],
  },
  etf: {
    1: [
      ["A bag of many shops, instead of one shop, means…", ["If one shop struggles, the others are still there", "You cannot lose", "It is a single sweet"], 0, "Spreading out is calmer. It is not a promise that the bag only rises.", 2, 2],
      ["An index fund or ETF, in kid words, is…", ["A basket that follows a long list of companies", "A loan from a stranger", "A flag on a kart"], 0, "You own a tiny slice of many firms, not a bet on one hero shop.", 3, 2],
    ],
    2: [
      ["Past growth of a fund is…", ["A story about before, not a promise for you", "A contract that it repeats", "The same as interest on a piggy bank"], 0, "Last year's chart does not owe you the same year again.", 2, 2],
    ],
  },
  stocks: {
    1: [
      ["A share is…", ["A tiny slice of one company", "A coin that doubles every night", "A bill you must pay"], 0, "You own a little piece of that one firm. The firm can do well or badly.", 2, 2],
      ["If that one company closes, the share can…", ["Become worth very little", "Be printed again at home", "Turn into a riding hat"], 0, "One shop can fail. That is why a bag of many shops is calmer.", 3, 2],
    ],
    2: [
      ["Money needed for this week's food should…", ["Stay out of a single share", "Go into the jumpiest share", "Be lent to a stranger online"], 0, "Food money is not an investment. Only spare money could even be considered, and a parent decides.", 2, 2],
    ],
  },
  risk: {
    1: [
      ["If a price can fall, you should only use money you…", ["Could leave alone", "Need for the bus tomorrow", "Borrowed from a stranger"], 0, "Soon-money wants to stay spendable. Falling prices are a bad place for it.", 2, 2],
      ["A scary headline means…", ["You pause and talk to an adult, you do not panic-sell in the lesson", "The lesson orders you to sell", "Prices are now illegal"], 0, "Lessons teach the idea. A parent decides what happens to real money.", 3, 2],
    ],
    2: [
      ["Higher risk, in plain words, means…", ["A bigger chance of a big fall, and sometimes a big rise", "A guaranteed prize", "A lower price at the sweet shop"], 0, "Risk is the wobble. It is not a promise of a bigger prize.", 2, 2],
    ],
  },
  mix: {
    1: [
      ["Putting the whole pot in one place is…", ["Riskier than spreading it", "Always safer", "The 20% rule"], 0, "One fall can hit everything if it is all in one basket.", 2, 2],
      ["A simple mix might include…", ["More than one kind of thing", "Only the coin that rose yesterday", "Your lunch money as well"], 0, "Mix means more than one. It still can fall. It is not advice to buy.", 3, 2],
    ],
    2: [
      ["Tidying a mix every five minutes…", ["Usually adds cost and stress", "Is how compounding is forced", "Removes all risk"], 0, "A calm mix can sit. Constant tinkering is not the same as a plan.", 2, 2],
    ],
  },
  fees: {
    1: [
      ["A fee is…", ["Money taken out of the pot", "A free extra", "A type of flag"], 0, "Fees leave. They are not interest. Small fees, many times, add up.", 2, 2],
      ["A cheaper similar bag is often…", ["Kinder to a long snowball", "Always worse because it is cheap", "Illegal"], 0, "You cannot control the market. You can notice the charge.", 3, 2],
    ],
    2: [
      ["1% taken every year for many years is…", ["A real slice, not nothing", "Too small to mention ever", "A guarantee of profit"], 0, "One pound in every hundred, every year, becomes a pile over decades.", 2, 2],
    ],
  },
  patience: {
    1: [
      ["A plan made on a calm day is for…", ["The noisy days too", "Throwing away when a headline appears", "Changing every evening"], 0, "You write the plan while you are calm so a wobble does not write it for you.", 2, 2],
      ["This lesson is…", ["Learning, not an order to buy anything", "Personal advice for your family", "A promise of a rate"], 0, "A parent decides what happens to real money. The lesson teaches the idea.", 3, 2],
    ],
    2: [
      ["Leaving a Junior ISA alone until 18, as an idea, is…", ["A long lock so the pot is not raided", "A rule that it cannot fall", "A shop voucher"], 0, "The lock is the point. It is not a promise the pot only grows, and it is not advice to open one.", 2, 2],
    ],
  },
};

const WEEK_NOTE =
  "New this week: fresh questions are inside these lessons. They start easy, then step up. Stars, badges and progress still save.";

function weekNoteHtml() {
  return `<p class="week-note">${WEEK_NOTE}</p>`;
}

function installWeekContent() {
  if (installWeekContent.done) return;
  installWeekContent.done = true;

  function pushRows(bank, skill, stage, rows) {
    if (!bank[skill]) bank[skill] = {};
    if (!Array.isArray(bank[skill][stage])) bank[skill][stage] = [];
    const have = new Set(
      bank[skill][stage].map((row) => String(row[0] || "").trim().toLowerCase())
    );
    rows.forEach((row) => {
      const key = String(row[0] || "").trim().toLowerCase();
      if (!key || have.has(key)) return;
      bank[skill][stage].push(row);
      have.add(key);
    });
  }

  if (typeof GEORGE_KART_BANK !== "undefined") {
    Object.keys(WEEK_KART).forEach((skill) => {
      Object.keys(WEEK_KART[skill]).forEach((stage) => {
        pushRows(GEORGE_KART_BANK, skill, Number(stage), WEEK_KART[skill][stage]);
      });
    });
  }
  if (typeof GEORGE_INVEST_BANK !== "undefined") {
    Object.keys(WEEK_INVEST).forEach((skill) => {
      Object.keys(WEEK_INVEST[skill]).forEach((stage) => {
        pushRows(GEORGE_INVEST_BANK, skill, Number(stage), WEEK_INVEST[skill][stage]);
      });
    });
  }
  if (typeof installGeorgeBanks === "function") installGeorgeBanks();

  if (typeof getTeachModule !== "function") return;
  Object.keys(WEEK_CORE).forEach((subject) => {
    Object.keys(WEEK_CORE[subject]).forEach((skill) => {
      Object.keys(WEEK_CORE[subject][skill]).forEach((stage) => {
        const mod = getTeachModule(subject, skill, Number(stage), null);
        if (!mod) return;
        if (!Array.isArray(mod.practice)) mod.practice = [];
        const have = new Set(
          mod.practice.map((q) => String((q && q.q) || "").trim().toLowerCase())
        );
        WEEK_CORE[subject][skill][stage].forEach((q) => {
          const key = String(q.q || "").trim().toLowerCase();
          if (!key || have.has(key)) return;
          mod.practice.push(q);
          have.add(key);
        });
      });
    });
  });
}

installWeekContent();
