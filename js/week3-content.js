/**
 * Week of 7 November 2026 — fresh questions.
 * First steps stays easy and long. Intermediate is one step up.
 * Secure is still primary school: no letters standing for numbers,
 * and no secondary-school science.
 * Nothing here repeats a question the children already have.
 */
function freshMulti(q, options, answer, explain, passage) {
  const item = {
    q: q,
    type: "multi",
    options: options,
    answer: answer,
    explain: explain,
    stage: "both",
    week: 3,
  };
  if (passage) item.passage = passage;
  return item;
}

function freshTyped(q, answer, explain) {
  return {
    q: q,
    type: "typed",
    answer: String(answer),
    explain: explain,
    stage: "both",
    week: 3,
  };
}

function freshRow(q, options, answer, explain, diff) {
  return [q, options, answer, explain, diff || 2, 3];
}

const WEEK3_CORE = {
  maths: {
    number: {
      1: [
        freshTyped("What is 6 + 7?", "13", "6 and 7 more is 13. Count on from 6 if you need to."),
        freshMulti(
          "Which number is even?",
          ["8", "7", "3"],
          0,
          "8 can be split into pairs. 7 and 3 cannot."
        ),
      ],
      2: [
        freshTyped("What is 240 + 100?", "340", "Adding 100 changes the hundreds digit: 240 + 100 = 340."),
      ],
      3: [
        freshTyped("What is 1000 − 200?", "800", "1000 take away 200 is 800. You can count back two hundreds."),
      ],
    },
    operations: {
      1: [
        freshTyped("What is 9 − 4?", "5", "Start at 9 and count back 4. You land on 5."),
        freshTyped("What is 2 × 8?", "16", "Two groups of 8 make 16. Count 8 and another 8."),
      ],
      2: [
        freshTyped("What is 48 ÷ 6?", "8", "Six eights are 48, so 48 ÷ 6 = 8."),
      ],
      3: [
        freshTyped("What is 7 × 8?", "56", "Seven eights are 56. You can add 8 seven times if you like."),
      ],
    },
    fractions: {
      1: [
        freshTyped("What is half of 18?", "9", "Half means split into 2 equal parts. 18 ÷ 2 = 9."),
        freshMulti(
          "A chocolate bar broken into 4 equal pieces. One piece is…",
          ["a quarter", "a half", "the whole bar"],
          0,
          "Four equal pieces means each one is a quarter of the bar."
        ),
      ],
      2: [
        freshTyped("What is a quarter of 24?", "6", "A quarter is 4 equal parts. 24 ÷ 4 = 6."),
      ],
      3: [
        freshTyped("What is 10% of 70?", "7", "10% is one tenth. 70 ÷ 10 = 7."),
      ],
    },
    algebra: {
      1: [
        freshTyped("What do you add to 1 to make 10?", "9", "1 and 9 more make 10. Count on from 1 if you want to."),
        freshTyped("What is 2 × 6?", "12", "Two groups of 6 make 12. No letters are needed."),
      ],
      2: [
        freshTyped(
          "A stool has 4 legs. How many legs do 3 stools have?",
          "12",
          "3 groups of 4 is 12. Count 4, 8, 12."
        ),
      ],
      3: [
        freshTyped(
          "What do you add to 35 to make 80?",
          "45",
          "35 and 45 make 80. Count on from 35 if you want to check."
        ),
      ],
    },
    geometry: {
      1: [
        freshTyped("How many corners does a triangle have?", "3", "A triangle has 3 corners, one where each pair of sides meets."),
        freshMulti(
          "Which of these shapes is round all the way?",
          ["A circle", "A square", "A triangle"],
          0,
          "A circle has no corners. A square and a triangle both have corners."
        ),
      ],
      2: [
        freshTyped(
          "A rectangle is 4 cm long and 3 cm wide. What is the perimeter in cm?",
          "14",
          "Go around the outside: 4 + 3 + 4 + 3 = 14 cm."
        ),
      ],
      3: [
        freshTyped(
          "A square has sides of 5 cm. What is the perimeter in cm?",
          "20",
          "A square has 4 equal sides. 5 + 5 + 5 + 5 = 20 cm."
        ),
      ],
    },
    data: {
      1: [
        freshTyped(
          "There are 4 apples and 3 pears. How many pieces of fruit altogether?",
          "7",
          "4 and 3 more is 7 pieces of fruit."
        ),
        freshMulti(
          "A tally of four sticks, with no diagonal, stands for…",
          ["4", "5", "3"],
          0,
          "The diagonal is the fifth mark. Four sticks on their own is 4."
        ),
      ],
      2: [
        freshTyped(
          "The numbers are 3, 10 and 5. What is the range?",
          "7",
          "Range is biggest minus smallest. 10 − 3 = 7."
        ),
      ],
      3: [
        freshTyped(
          "The scores are 4, 4, 9 and 7. Which score appears most?",
          "4",
          "4 appears twice. The others appear once, so 4 is the mode."
        ),
      ],
    },
  },
  english: {
    grammar: {
      1: [
        freshMulti(
          "Which word is the noun in 'George wins the race'?",
          ["wins", "race", "the"],
          1,
          "A race is a thing you can name. Wins is the doing word."
        ),
        freshMulti(
          "Which line can stand on its own?",
          ["The pony ate hay.", "Ate the hay", "Pony"],
          0,
          "It names the pony and says what the pony did, then ends with a full stop."
        ),
      ],
      2: [
        freshMulti(
          "Which sentence agrees?",
          ["The dogs was barking.", "The dogs were barking.", "The dogs is barking."],
          1,
          "Dogs means more than one, so the verb is were, not was."
        ),
      ],
      3: [
        freshMulti(
          "Which word joins the two ideas?",
          ["The gate was shut because the horse was in.", "The gate was shut.", "Horse"],
          0,
          "Because joins the reason to the sentence. That is a conjunction."
        ),
      ],
    },
    punctuation: {
      1: [
        freshMulti(
          "Which one needs a question mark?",
          ["Where is the stable", "The stable is warm.", "Stable"],
          0,
          "It asks something, so it needs a question mark at the end."
        ),
        freshMulti(
          "Which spelling is the real word?",
          ["because", "becuase", "becaus"],
          0,
          "Because is spelled b-e-c-a-u-s-e. The other two are missing or swapped letters."
        ),
      ],
      2: [
        freshMulti(
          "Which sentence uses an apostrophe for belonging?",
          ["George's helmet is red.", "Georges helmet is red.", "George helmet is red."],
          0,
          "The apostrophe shows the helmet belongs to George."
        ),
      ],
      3: [
        freshMulti(
          "Which list is punctuated properly?",
          ["Boots, gloves and a helmet.", "Boots gloves and a helmet.", "Boots; gloves and a helmet?"],
          0,
          "Commas separate the items in a short list. The last join is and."
        ),
      ],
    },
    vocabulary: {
      1: [
        freshMulti(
          "A meadow is…",
          ["a grassy field", "a type of engine", "a full stop"],
          0,
          "A meadow is a field of grass, the sort a horse might graze."
        ),
        freshMulti(
          "The opposite of noisy is…",
          ["quiet", "loud", "shouting"],
          0,
          "Quiet is the opposite of noisy."
        ),
      ],
      2: [
        freshMulti(
          "Cautious means…",
          ["careful", "reckless", "asleep"],
          0,
          "A cautious driver is careful, not reckless."
        ),
      ],
      3: [
        freshMulti(
          "In 'the marshal's voice was firm', firm means…",
          ["clear and not wobbly", "very quiet and lost", "made of wood"],
          0,
          "A firm voice is steady and sure. It does not mean a wooden voice."
        ),
      ],
    },
    reading: {
      1: [
        freshMulti(
          "What did the pony do?",
          ["Drank from the bucket", "Drove a kart", "Closed the laptop"],
          0,
          "The passage says the pony drank. That is the fact to find.",
          "The grey pony walked to the bucket and drank."
        ),
        freshMulti(
          "Who checked the strap?",
          ["Bella", "The pony", "A stranger online"],
          0,
          "The passage names Bella as the person who checked.",
          "Bella checked the strap before she led the pony out."
        ),
      ],
      2: [
        freshMulti(
          "Why did George lift off the throttle?",
          ["He saw a yellow flag", "He wanted a snack", "The race had not started"],
          0,
          "The sentence gives the reason: he saw a yellow flag.",
          "George saw a yellow flag, so he lifted off the throttle."
        ),
      ],
      3: [
        freshMulti(
          "What can you work out, even though it is not said in those words?",
          ["The trough was empty, so the horse could not drink", "The horse prefers fizzy drinks", "The gate is a verb"],
          0,
          "An empty trough means there is nothing to drink. That is a simple inference.",
          "The trough in the field was empty when Bella arrived."
        ),
      ],
    },
    writing: {
      1: [
        freshMulti(
          "Which line is a proper sentence about a horse?",
          ["The horse drank.", "Drank quickly", "Horse"],
          0,
          "It can stand on its own. It has a who and a what."
        ),
        freshMulti(
          "Which opening uses a capital letter?",
          ["On Saturday we practised.", "on Saturday we practised.", "on saturday"],
          0,
          "A sentence starts with a capital letter, including the first word."
        ),
      ],
      2: [
        freshMulti(
          "Which sentence tells you why the boots were worn?",
          ["I wore boots because the yard was muddy.", "I wore boots.", "Muddy yard"],
          0,
          "Because tells the reader the reason. That makes the sentence more useful."
        ),
      ],
      3: [
        freshMulti(
          "Which is the best topic sentence for a paragraph about cooling a horse down?",
          ["After work, a horse needs time to cool down.", "Anyway.", "Hoof"],
          0,
          "A topic sentence says what the whole paragraph is about."
        ),
      ],
    },
  },
  science: {
    biology: {
      1: [
        freshMulti(
          "A living thing that makes its own food from sunlight is usually…",
          ["a plant", "a steering wheel", "a full stop"],
          0,
          "Plants make food using light. Kart parts and punctuation do not."
        ),
        freshMulti(
          "Which of these is a habitat?",
          ["A pond", "A comma", "A times table"],
          0,
          "A habitat is the place a living thing lives. A pond is one."
        ),
      ],
      2: [
        freshMulti(
          "In a simple food chain, grass is eaten by a rabbit. The rabbit is…",
          ["a consumer", "a cloud", "a type of rock"],
          0,
          "A consumer eats. The grass is the producer. The rabbit eats the grass."
        ),
      ],
      3: [
        freshMulti(
          "If the plants in a habitat die out, the animals that eat them…",
          ["may go hungry", "will definitely grow wings that week", "turn into rocks"],
          0,
          "Animals depend on their food. Lose the plants and the eaters struggle."
        ),
      ],
    },
    chemistry: {
      1: [
        freshMulti(
          "Juice in a jug, ready to pour, is a…",
          ["liquid", "helmet", "verb"],
          0,
          "A liquid flows and takes the shape of the jug. Juice in a jug is a liquid."
        ),
        freshMulti(
          "Ice is water as a…",
          ["solid", "gas you can stir like soup", "type of horse"],
          0,
          "Ice keeps its shape. That is a solid. It is still water."
        ),
      ],
      2: [
        freshMulti(
          "Sugar stirred into hot tea can…",
          ["dissolve, so you may not see the grains", "vanish from the universe", "become a magnet"],
          0,
          "Dissolved sugar is still in the tea. You just cannot see the grains."
        ),
      ],
      3: [
        freshMulti(
          "Heating liquid water until it bubbles can turn some of it into…",
          ["a gas called water vapour", "a block of wood", "a bone"],
          0,
          "Boiling lets water become a gas. Cooling can bring it back to liquid."
        ),
      ],
    },
    physics: {
      1: [
        freshMulti(
          "A push or a pull is a…",
          ["force", "habitat", "paragraph"],
          0,
          "Forces are pushes and pulls. They can start, stop or turn something."
        ),
        freshTyped(
          "A toy kart rolls 8 metres in 2 seconds. What is the speed in metres per second?",
          "4",
          "Speed here is distance shared by time. 8 ÷ 2 = 4 metres each second."
        ),
      ],
      2: [
        freshMulti(
          "Friction between tyres and the track…",
          ["helps the kart grip", "always makes the kart float", "is a type of plant"],
          0,
          "Grip comes from friction. Too little friction and the kart slides."
        ),
      ],
      3: [
        freshTyped(
          "A horse walks 12 metres in 3 seconds. What is the speed in metres per second?",
          "4",
          "12 ÷ 3 = 4. That is 4 metres every second in this story sum."
        ),
      ],
    },
    method: {
      1: [
        freshMulti(
          "To keep a test fair you change…",
          ["one thing, and keep the rest the same", "everything at once", "nothing, then guess"],
          0,
          "Change one thing so you know what caused the result."
        ),
        freshMulti(
          "A result you can check again is better than…",
          ["one guess with no measurement", "a ruler", "a notebook"],
          0,
          "Measuring means someone else can try the same thing and compare."
        ),
      ],
      2: [
        freshMulti(
          "You time how fast ice melts in the sun and in the shade. What should stay the same?",
          ["The size of the ice cubes", "The weather on purpose as a second change", "The question mark"],
          0,
          "The place changes. The ice cubes should start the same size."
        ),
      ],
      3: [
        freshMulti(
          "A prediction is useful because you can…",
          ["compare it with what actually happens", "skip the test", "change the result to match it"],
          0,
          "You say what you expect, then you look. The result can surprise you."
        ),
      ],
    },
  },
  horses: {
    care: {
      1: [
        freshMulti(
          "Before you go near a horse you…",
          ["speak so they know you are there", "rush at their heels", "wave a coat at their face"],
          0,
          "A quiet voice tells them you are coming. Surprises frighten horses."
        ),
        freshMulti(
          "If you are not sure a job is safe you…",
          ["fetch an adult", "try the risky way first", "do it with your eyes shut"],
          0,
          "An adult who knows the horse can decide. Guessing is not brave."
        ),
      ],
      2: [
        freshMulti(
          "A horse that pins its ears and swings its hindquarters toward you is saying…",
          ["give me space", "please climb on now", "I want a carrot immediately"],
          0,
          "Ears back and a hindquarter swung round is a warning. Step away and tell an adult."
        ),
      ],
      3: [
        freshMulti(
          "A daily check includes looking at…",
          ["eyes, legs, appetite and droppings", "only the colour of the rug from the lane", "the horse's passport instead of the horse"],
          0,
          "Changes in eyes, legs, eating or droppings are clues. Tell an adult if something is new."
        ),
      ],
    },
    water: {
      1: [
        freshMulti(
          "An empty bucket in the stable means you…",
          ["refill it", "leave it, because horses drink air", "fill it with feed"],
          0,
          "Horses need water all day. An empty bucket gets filled."
        ),
        freshMulti(
          "A green, slimy trough should be…",
          ["emptied and scrubbed", "topped up and ignored", "used as a mirror"],
          0,
          "Slime is not a nice drink. Empty it, scrub, and refill with clean water."
        ),
      ],
      2: [
        freshMulti(
          "After hard work, a very hot horse should be offered water…",
          ["little and often, while they cool", "a whole icy trough in one go as a rule", "none until tomorrow"],
          0,
          "Small drinks while they cool are kinder than a huge icy gulp. Ask the yard's rule."
        ),
      ],
      3: [
        freshMulti(
          "In a hard frost you check water because…",
          ["the surface can freeze solid", "horses stop needing water in winter", "ice is the same as hay"],
          0,
          "A lid of ice is not a drink. Break it or change the water, with a grown-up."
        ),
      ],
    },
    feeding: {
      1: [
        freshMulti(
          "Hay is…",
          ["dried grass, and the main food for many horses", "a type of sweet", "only for dogs"],
          0,
          "Forage such as hay or grass is the base of the feed. Treats are extra."
        ),
        freshMulti(
          "You feed a horse someone else's scoop because…",
          ["you should not — each horse has their own feed", "all horses eat the same secret amount", "scoops are decorations"],
          0,
          "The yard's chart is for that horse. Do not invent a scoop."
        ),
      ],
      2: [
        freshMulti(
          "A horse that bolts its feed may need…",
          ["an adult to look at how the feed is given", "a bigger and bigger bucket with no plan", "no water at all"],
          0,
          "Eating too fast can be a problem. An adult decides if a slow feeder or a change is needed."
        ),
      ],
      3: [
        freshMulti(
          "Droppings that suddenly change, with a horse that looks quiet, means…",
          ["tell an adult the same day", "wait a month", "add more rich mix at once"],
          0,
          "A change in droppings plus a quiet horse can be colic or a feed problem. People need to know."
        ),
      ],
    },
    grooming: {
      1: [
        freshMulti(
          "You pick out a hoof from…",
          ["heel toward toe", "toe toward yourself in a jab", "the side, with your face against the leg"],
          0,
          "Heel to toe flicks dirt away from you. Keep your face out of the kick zone."
        ),
        freshMulti(
          "A metal curry comb is for…",
          ["cleaning the body brush, not scrubbing bony legs", "the eyes", "the inside of the ear"],
          0,
          "The curry comb cleans the brush. Hard metal on bone is unkind."
        ),
      ],
      2: [
        freshMulti(
          "A stone stuck in the frog of the hoof should be…",
          ["shown to an adult before you dig wildly", "ignored for a week", "pushed in deeper"],
          0,
          "Stones hurt. If it will not lift out easily, stop and fetch someone who knows."
        ),
      ],
      3: [
        freshMulti(
          "A hot, muddy horse in winter is best…",
          ["dried carefully so they do not chill", "left soaking with every window open and no rug decision", "hosed with icy water for fun"],
          0,
          "Mud can be brushed or washed, then they must dry. Cold plus wet needs an adult's plan."
        ),
      ],
    },
    stable: {
      1: [
        freshMulti(
          "You tie a horse in the stable with…",
          ["a quick-release knot", "a knot you cannot undo", "the rope around your own wrist"],
          0,
          "A quick-release knot can be freed in a hurry. A trap knot cannot."
        ),
        freshMulti(
          "Bedding should be…",
          ["deep enough that the floor does not show through", "a thin sprinkle on concrete", "piled only in one corner"],
          0,
          "A deep bed protects knees and hocks when they lie down."
        ),
      ],
      2: [
        freshMulti(
          "A blocked stable drain or a flooded bed means…",
          ["the horse should not stand in it — tell an adult", "it is a paddling pool", "add more hay on top and leave it"],
          0,
          "Wet beds cause slips and sore skin. The horse needs a dry place."
        ),
      ],
      3: [
        freshMulti(
          "Droppings and wet patches skipped out daily help because…",
          ["the bed stays dry and the air smells cleaner", "horses prefer a dirty bed", "it replaces water"],
          0,
          "A clean bed is healthier for feet and lungs. Skip out, then top up the bed."
        ),
      ],
    },
    riding: {
      1: [
        freshMulti(
          "You mount when…",
          ["an adult says the horse is ready and you are", "the horse is walking away", "you are still eating"],
          0,
          "Mounting is a taught skill. Wait until the person in charge says go."
        ),
        freshMulti(
          "Heels down helps you…",
          ["stay balanced", "stand up in the stirrup and lean forward always", "hold the reins in your teeth"],
          0,
          "A heel a little lower than the toe is a steadier seat."
        ),
      ],
      2: [
        freshMulti(
          "If the horse spooks, the first job is…",
          ["sit up, shorten the rein a little, and listen", "drop the reins and shout", "jump off on the road"],
          0,
          "Stay with them if you can, sit tall, and do what you were taught. An adult leads the decision."
        ),
      ],
      3: [
        freshMulti(
          "A rising trot matches…",
          ["the two-beat rhythm, up and down", "every fourth step only, with no plan", "the canter's three beats as if it were trot"],
          0,
          "Trot is two beats. You rise and sit with that rhythm, the way you were shown."
        ),
      ],
    },
    tack: {
      1: [
        freshMulti(
          "A riding hat for the lesson should be…",
          ["fastened", "carried in your hand while you ride", "balanced on the horse's ears"],
          0,
          "The hat only protects you if it is on and done up."
        ),
        freshMulti(
          "A girth is done up…",
          ["firmly, and checked again before you move off", "with one finger of slack and a hope", "after you are already cantering"],
          0,
          "Saddles slip if the girth is left loose. Check it before you leave the yard."
        ),
      ],
      2: [
        freshMulti(
          "A rub under the girth after a ride means…",
          ["tell an adult and do not ignore the sore", "tighten it more tomorrow", "swap to a smaller hat"],
          0,
          "Sores get worse if the same tack is used without a look. Show someone."
        ),
      ],
      3: [
        freshMulti(
          "You put the bridle on…",
          ["the way you were shown, without banging the teeth", "by pulling the bit up fast", "over the riding hat"],
          0,
          "A quiet bridle, a thumb in the corner of the lips if you were taught that, and no rush."
        ),
      ],
    },
    history: {
      1: [
        freshMulti(
          "Horses have worked with people for…",
          ["thousands of years", "only since last Tuesday", "about a week"],
          0,
          "Horses pulled, carried and farmed long before cars. The story is very old."
        ),
        freshMulti(
          "A heavy horse and a riding pony are different mainly in…",
          ["the job they were bred for, and often their build", "the colour of the sky", "nothing at all"],
          0,
          "Some were bred to pull. Some were bred to ride. Build follows the job."
        ),
      ],
      2: [
        freshMulti(
          "Before tractors, many farm horses…",
          ["pulled ploughs and carts", "drove cars", "wrote the feed chart"],
          0,
          "Farm power used to be horses. Tractors changed that job, not the need to care for horses."
        ),
      ],
      3: [
        freshMulti(
          "Pit ponies were real horses that…",
          ["hauled loads underground in mines", "only existed in cartoons", "were a type of tractor"],
          0,
          "Pit ponies worked in the dark. It is history now in Britain, and it was hard work."
        ),
      ],
    },
    "h-lead": {
      1: [
        freshMulti(
          "The spare rope is held…",
          ["folded in your hand, not wrapped around it", "around your waist", "in your mouth"],
          0,
          "You must be able to let go. A wrap around the hand is a trap."
        ),
        freshMulti(
          "You turn a led horse…",
          ["away from your toes", "onto your feet", "by spinning them on the spot toward you"],
          0,
          "A wide turn keeps their feet off yours."
        ),
      ],
    },
    "h-field": {
      1: [
        freshMulti(
          "You lead a horse into the field and…",
          ["turn them to face the gate before you let go", "let go while they face away at speed", "chase them in"],
          0,
          "Facing the gate means the hind legs are not your exit."
        ),
        freshMulti(
          "The field gate after turn-out is…",
          ["shut", "left open for a breeze", "removed"],
          0,
          "A shut gate keeps horses in and stops a loose horse on the road."
        ),
      ],
    },
    "h-rug": {
      1: [
        freshMulti(
          "A rug is chosen by…",
          ["an adult who knows that horse and the weather", "the first person to find a spare", "the rug label alone, with no look at the horse"],
          0,
          "Too much rug overheats. Too little chills a clipped horse. It is a judgement."
        ),
        freshMulti(
          "Before you leave a rugged horse you…",
          ["check the straps lie flat", "twist a strap on purpose", "leave the front buckle undone"],
          0,
          "A twisted strap rubs. Flat straps are part of putting the rug on."
        ),
      ],
    },
  },
  f1: {
    "f-teams": {
      1: [
        freshMulti(
          "A team can score even when…",
          ["their driver scores, because there are two championships", "nobody finishes", "the flag is chequered for fun in the garage"],
          0,
          "Driver points and team points are linked, but they are two cups."
        ),
        freshMulti(
          "The people who design the car are part of…",
          ["the team", "the crowd only", "the yellow flag"],
          0,
          "Designers, mechanics and the driver are one constructor."
        ),
      ],
      2: [
        freshMulti(
          "Two cars from the same garage usually…",
          ["share a team", "race for two different sports", "do not count"],
          0,
          "A constructor often enters two cars. They still belong to one team."
        ),
      ],
      3: [
        freshMulti(
          "A team name from ten years ago may be…",
          ["gone from the grid, even if the job of a team remains", "the only name allowed forever", "a type of tyre"],
          0,
          "Names change. Ferrari's place since 1950 is the safe history. This year's list is news."
        ),
      ],
    },
    "f-flags": {
      1: [
        freshMulti(
          "A red flag in a session means…",
          ["stop racing — the session is halted", "go faster", "you have won"],
          0,
          "Red is stop. You do not finish the lap as a race."
        ),
        freshMulti(
          "A chequered flag is shown…",
          ["at the end", "at every corner", "only in the rain"],
          0,
          "Chequered means the session is finished. Ease off and follow instructions."
        ),
      ],
      2: [
        freshMulti(
          "A blue flag is a message to…",
          ["let a faster car through when it is safe", "close your eyes", "drive on the grass"],
          0,
          "Blue means someone quicker is behind. Do not weave."
        ),
      ],
      3: [
        freshMulti(
          "Yellow in Formula 1 and yellow in karting both mean…",
          ["danger — slow down and do not overtake", "the winner's song", "pit lane is a shortcut"],
          0,
          "The colours match on purpose. Yellow is caution in both."
        ),
      ],
    },
    "f-pits": {
      1: [
        freshMulti(
          "A pit stop changes…",
          ["tyres, and sometimes the nose, in a few seconds", "the driver's name", "the circuit"],
          0,
          "Fresh tyres are the usual reason. The car is held still while the crew works."
        ),
        freshMulti(
          "You do not stand in a Formula 1 pit lane because…",
          ["cars pass close and fast", "it is a cafe", "flags do not work there"],
          0,
          "The pit lane is a workplace. Spectators stay where they are told."
        ),
      ],
      2: [
        freshMulti(
          "A jack lifts the car so…",
          ["the wheels can come off", "the driver can have a nap", "the wings fold away"],
          0,
          "The wheels must be free of the ground for a tyre change."
        ),
      ],
      3: [
        freshMulti(
          "Stopping earlier than the car ahead can…",
          ["sometimes jump them when they stop later — if the tyres allow it", "always be illegal", "remove the need for tyres"],
          0,
          "That idea is called an undercut. It is a plan, not a promise. Tyres still have to work."
        ),
      ],
    },
    "f-car": {
      1: [
        freshMulti(
          "A wing pushes the car down using…",
          ["air", "a rope from the crowd", "the chequered flag"],
          0,
          "Air over the wing makes downforce. More downforce can mean more grip."
        ),
        freshMulti(
          "Brakes turn speed into…",
          ["heat", "hay", "a new lap time written on the tyre"],
          0,
          "Pads and discs get hot when they slow the car. That is why they can glow."
        ),
      ],
      2: [
        freshMulti(
          "A softer tyre usually…",
          ["grips more and wears out sooner", "lasts forever", "is only for rain, always"],
          0,
          "Soft can be faster for a short run. Hard can last longer. The choice is a balance."
        ),
      ],
      3: [
        freshMulti(
          "Air that slows the car on a straight is called…",
          ["drag", "a chequered flag", "a pit stop"],
          0,
          "Drag is air holding the car back. Downforce is the push downward. A car balances both."
        ),
      ],
    },
    "f-history": {
      1: [
        freshMulti(
          "The Formula 1 world championship began in…",
          ["1950", "2010", "last month"],
          0,
          "1950 is the start. We do not memorise this year's winner in a lesson."
        ),
        freshMulti(
          "A fact that stays true is better than…",
          ["a rumour about next week's driver", "the date 1950", "a flag colour"],
          0,
          "Line-ups change. Dates that already happened do not."
        ),
      ],
      2: [
        freshMulti(
          "Juan Manuel Fangio and Ayrton Senna are…",
          ["drivers whose careers are already history", "this season's full grid", "types of tyre"],
          0,
          "Their stories are closed. We can learn them without chasing a live table."
        ),
      ],
      3: [
        freshMulti(
          "The halo in a modern Formula 1 car is there to…",
          ["protect the driver's head", "make the car louder", "replace the seatbelt"],
          0,
          "Safety kit changed after real accidents. The halo is one of those changes."
        ),
      ],
    },
    "f-sums": {
      1: [
        freshMulti(
          "A lap of 90 seconds and a lap of 93 seconds. Which is quicker?",
          ["90 seconds", "93 seconds", "they are the same"],
          0,
          "A smaller time is a faster lap. 90 is less than 93."
        ),
        freshTyped("What is 3 × 4, if each lap is 4 tenths slower in a story?", "12", "3 groups of 4 is 12. The story is still a times table."),
      ],
      2: [
        freshMulti(
          "Three laps of 20 seconds add up to…",
          ["60 seconds", "20 seconds", "23 seconds"],
          0,
          "20 + 20 + 20 = 60 seconds. Three equal laps add like that."
        ),
      ],
      3: [
        freshTyped(
          "Two laps take 80 seconds and 90 seconds. What is the mean?",
          "85",
          "80 + 90 = 170. The mean is 170 ÷ 2 = 85 seconds."
        ),
      ],
    },
  },
  horseworld: {
    "w-breeds": {
      1: [
        freshMulti(
          "A pony is usually…",
          ["shorter than a horse, often under 14.2 hands", "any animal with hooves including a cow", "a horse wearing a hat"],
          0,
          "Height is the usual line. 14.2 hands is a special way of measuring, not a decimal."
        ),
        freshMulti(
          "An Arab horse is known as…",
          ["a breed with a long history", "a type of saddle", "a gait"],
          0,
          "Arab is a breed. Welsh is another. The name is the type, not a job you invent."
        ),
      ],
      2: [
        freshMulti(
          "The withers are…",
          ["the ridge where the neck meets the back", "the tail", "the hoof only"],
          0,
          "Height in hands is measured at the withers, not at the ears."
        ),
      ],
      3: [
        freshMulti(
          "Dressage, racing and showjumping are…",
          ["different horse sports", "three names for the same trot", "types of feed"],
          0,
          "They are different jobs. A horse can be brilliant at one and not at another."
        ),
      ],
    },
    "w-gaits": {
      1: [
        freshMulti(
          "Walk is…",
          ["a four-beat gait", "a two-beat gait", "a jump"],
          0,
          "Walk is four beats. Trot is two. You can hear the difference."
        ),
        freshMulti(
          "Trot is…",
          ["two beats, diagonal pairs", "four beats like walk", "standing still"],
          0,
          "In trot the legs move in diagonal pairs. That is why it is two beats."
        ),
      ],
      2: [
        freshMulti(
          "Canter is…",
          ["a three-beat gait", "a four-beat walk", "a two-beat trot"],
          0,
          "Canter has three beats, then a moment of suspension. Gallop goes back toward four."
        ),
      ],
      3: [
        freshMulti(
          "A following seat in canter means…",
          ["your body goes with the horse, not against them", "you stand in the stirrups the whole way", "you hold the mane and shut your eyes"],
          0,
          "The rider's job is balance. Still hands, a seat that follows the stride."
        ),
      ],
    },
    "w-famous": {
      1: [
        freshMulti(
          "Black Beauty belongs in…",
          ["the fiction shelf", "the yard's live booking list", "the breed society rules"],
          0,
          "Black Beauty is a novel. A real horse in a history book is a different kind of fact."
        ),
        freshMulti(
          "A horse in a novel and a horse in a history book…",
          ["are not the same kind of fact", "must both be alive now", "are both made up"],
          0,
          "Stories can be kind and still be stories. History names a real horse."
        ),
      ],
      2: [
        freshMulti(
          "How many Grand Nationals did Red Rum win?",
          ["3", "1", "10"],
          0,
          "Red Rum won in 1973, 1974 and 1977. Three wins, and that history stays put."
        ),
      ],
      3: [
        freshMulti(
          "This year's famous horse is…",
          ["news, not a fact to memorise in the lesson", "the only horse that has ever lived", "always Red Rum again"],
          0,
          "League tables move. Red Rum's three Nationals stay in the history book."
        ),
      ],
    },
    "w-rules": {
      1: [
        freshMulti(
          "Wrapping the lead rope around your hand is…",
          ["a trap if the horse pulls", "the recommended knot", "how you steer from the ground"],
          0,
          "You must be able to let go. A wrap around the hand can drag you."
        ),
        freshMulti(
          "Gates on a yard are shut so…",
          ["horses stay where they were put", "the wind stays out only", "ponies can wander to the road"],
          0,
          "An open gate is how a horse gets loose. Shut it."
        ),
      ],
      2: [
        freshMulti(
          "On the road, a horse should…",
          ["wear high-visibility gear and have a handler who knows the route", "go alone", "trot on the white line for fun"],
          0,
          "Traffic, hi-vis, and a person who can handle the horse. An adult decides if the road is allowed."
        ),
      ],
      3: [
        freshMulti(
          "After work you…",
          ["cool the horse, offer water, and check legs and tack marks", "turn them straight back out at a gallop", "skip the check if you are late"],
          0,
          "Cool, water, look. A rub or a heat in a leg is something an adult should see."
        ),
      ],
    },
    "w-move": {
      1: [
        freshMulti(
          "Horses are prey animals, so they…",
          ["watch for surprise and can shy", "never move quickly", "have eyes that only look forward like a person's"],
          0,
          "Eyes on the side see a lot. A sudden thing can still make them jump."
        ),
        freshMulti(
          "A horse's eyes are…",
          ["on the sides of the head", "both in the front like a visor", "on the hooves"],
          0,
          "Side-set eyes see almost all the way round. They still have a blind spot behind the tail."
        ),
      ],
      2: [
        freshMulti(
          "A horse carries more weight…",
          ["over the front legs than people expect", "only on the tail", "in the ears"],
          0,
          "Balance matters. A rider who leans wrongly makes the front legs work harder."
        ),
      ],
      3: [
        freshMulti(
          "Muscles need a warm-up because…",
          ["cold muscles are easier to strain", "walking is illegal", "sweat is the only goal"],
          0,
          "They are athletes. A quiet walk before faster work is part of looking after them."
        ),
      ],
    },
    "w-sums": {
      1: [
        freshTyped("What is 4 × 3, if three hands are 12 inches?", "12", "4 inches in a hand, times 3 hands, is 12 inches."),
        freshMulti(
          "One hand is…",
          ["4 inches", "4 centimetres", "14.2 inches"],
          0,
          "A hand is 4 inches. 14.2 hands is not fourteen point two."
        ),
      ],
      2: [
        freshTyped("What is 14 × 4?", "56", "Fourteen hands, with no extra inches, is 14 × 4 = 56 inches."),
      ],
      3: [
        freshTyped(
          "What is 56 + 2?",
          "58",
          "14 hands is 56 inches. The extra 2 inches in 14.2 hands makes 58."
        ),
      ],
    },
  },
};

const WEEK3_KART = {
  safety: {
    1: [
      freshRow("A friend steps onto the track to wave. You…", ["Stay put and shout for a marshal", "Drive at them so they move", "Copy them"], 0, "The track is not a pavement. A marshal moves people. You do not collect them.", 2),
      freshRow("Your visor fogs so you cannot see the next corner. You…", ["Slow and signal, then get help", "Speed up to clear it", "Shut your eyes"], 0, "If you cannot see, you cannot drive. Ease off and let a marshal know.", 3),
    ],
    2: [
      freshRow("Oil flags and a shiny line on the tarmac mean…", ["it may be slippery there", "you should brake harder on that spot", "the race is cancelled forever"], 0, "A shiny track can be oil. Ease off before you reach it.", 3),
    ],
    3: [
      freshRow("You spin and stop sideways on the racing line. The safe habit is…", ["stay in, hands up if that is the rule, and wait", "climb out and jog across", "reverse back into traffic"], 0, "Other karts are still coming. Stay protected until a marshal tells you the next move.", 4),
    ],
  },
  kit: {
    1: [
      freshRow("Long hair on a karting day is…", ["tied up, out of the visor and the wheels", "left loose over your eyes", "a good flag"], 0, "Hair in your eyes or near a wheel is a problem. Tie it before the helmet goes on.", 2),
      freshRow("Gloves that are much too big…", ["can slip on the wheel", "are always safer", "replace a helmet"], 0, "You need to feel the wheel. A glove that twists is the wrong size.", 3),
    ],
    2: [
      freshRow("A neck brace or collar, if the club uses one, is…", ["part of the kit they set, not a decoration", "optional jewellery", "a scarf you bring from home and hope"], 0, "Use what the club fits. Do not invent a substitute.", 3),
    ],
    3: [
      freshRow("A rib protector is there because…", ["the seat can bang your ribs", "it makes the kart faster by itself", "it replaces the seatbelt story in a car"], 0, "Kart seats hold you tight. A protector spreads the knocks. Wear the one you are given.", 4),
    ],
  },
  kart: {
    1: [
      freshRow("Before you sit in, you look for…", ["the brake, the throttle and the kill switch", "the cafe menu", "a reverse gear that most karts do not have"], 0, "Know how to stop the kart and the engine before it moves.", 2),
      freshRow("A chain guard is there to…", ["keep fingers and clothing out of the chain", "make a nice noise", "hold your drink"], 0, "A chain can grab cloth or a hand. The guard stays on.", 3),
    ],
    2: [
      freshRow("If the steering feels notchy or the wheel hits your knees, you…", ["tell a marshal before you drive", "hope it frees up at full speed", "stand up while you drive"], 0, "The seat and the wheel should fit. Pain and a stuck wheel are a stop.", 3),
    ],
    3: [
      freshRow("A kart that pulls to one side under braking may have…", ["a problem to show an adult, not a new racing style", "the perfect setup for a beginner to copy", "nothing worth mentioning"], 0, "Pulling aside can be brakes or a tyre. You do not 'drive around' a fault you do not understand.", 4),
    ],
  },
  pedals: {
    1: [
      freshRow("You rest your feet…", ["on the pedals you were shown, ready to brake", "on the front bumper", "tucked under the seat"], 0, "Feet stay on the pedals so a brake is there when you need it.", 2),
      freshRow("Stamping both pedals at once…", ["is a muddle — one job at a time", "is the fastest way", "is how you indicate"], 0, "Throttle is go. Brake is stop. Together they fight each other.", 3),
    ],
    2: [
      freshRow("You finish most of the braking…", ["before you turn", "in the middle of the slide as a first habit", "after you have already hit the kerb"], 0, "Slow in a straight line, then steer. Braking and turning hard together can spin you.", 3),
    ],
    3: [
      freshRow("A little throttle through a gentle corner can…", ["settle the kart once you are pointed", "replace looking ahead", "be used with your eyes shut"], 0, "Smooth throttle can help the kart drive through. It is not a reason to rush the entry.", 4),
    ],
  },
  marshal: {
    1: [
      freshRow("A marshal's board or flag beats…", ["your guess", "the driver behind shouting", "a joke from the pits"], 0, "Marshals can see more of the track than you can. Do what they ask.", 2),
      freshRow("If you are sent to the pit exit and told to wait, you…", ["wait", "join when you feel like it", "drive the wrong way to the grid"], 0, "The exit has a person in charge. Their hand is the signal.", 3),
    ],
    2: [
      freshRow("You are moving a kart in the paddock. You…", ["have a person watching the front and you look where you push", "push toward the live track for a shortcut", "sit on the side pod"], 0, "Paddocks have people on foot. Eyes up, and only where you were told.", 3),
    ],
    3: [
      freshRow("A black flag shown to you, if the club uses one, means…", ["come in — the marshal wants you", "you won", "speed up"], 0, "Black is a message to you, not the whole field. Pit in and ask.", 4),
    ],
  },
  flags: {
    1: [
      freshRow("Yellow means…", ["slow down, no overtaking", "the session is over", "rain has definitely stopped"], 0, "Yellow is caution. The danger is ahead. Do not use it as a chance to pass.", 2),
      freshRow("Green after yellow means…", ["the warning has cleared and you may race again", "stop at once", "get out of the kart"], 0, "Green cancels that caution. It does not cancel every other rule.", 3),
    ],
    2: [
      freshRow("A yellow and red striped flag often means…", ["the surface is slippery", "you must pit for lunch", "the winner is you"], 0, "Stripes warn of oil, water or debris. Ease off.", 3),
    ],
    3: [
      freshRow("Waved yellow is more urgent than a still yellow because…", ["the danger is closer or worse", "waved flags are only for photographs", "it means the same as green"], 0, "A wave says be especially careful now. Still no overtaking.", 4),
    ],
  },
  driving: {
    1: [
      freshRow("You look…", ["where you want to go", "at your own hands the whole lap", "at the sky"], 0, "The kart follows your eyes. Look through the corner, not at the bumper.", 2),
      freshRow("On a new track the first laps are for…", ["learning the corners", "your fastest lap ever", "closing your eyes on the straight"], 0, "Learn the shape first. Speed comes after you know where it goes.", 3),
    ],
    2: [
      freshRow("If the back of the kart steps out, a first calm move is…", ["a small lift, and look where you want to go", "more steering and more throttle together in a panic", "both feet down"], 0, "A little lift can catch a slide. Grabbing everything at once often makes it worse.", 3),
    ],
    3: [
      freshRow("A smooth lap is often quicker than a wild one because…", ["the tyres stay gripped instead of sliding", "sliding is always faster", "marshals prefer noise"], 0, "A slide scrubs speed. Smooth steering and pedals keep the time you already earned.", 4),
    ],
  },
  corners: {
    1: [
      freshRow("A simple corner is…", ["slow a little, turn, then go", "turn first and remember the brake later", "brake only after you spin"], 0, "Slow in, turn, pick up speed. That order keeps the kart stable.", 2),
      freshRow("The outside-inside-outside path is often called…", ["out-in-out", "the pit lane", "a shortcut across the grass"], 0, "Wide, to the apex, then wide again. That is a basic racing line.", 3),
    ],
    2: [
      freshRow("The closest point to the inside of a corner is the…", ["apex", "pit wall", "formation lap"], 0, "You pass the apex, then unwind the steering toward the exit.", 3),
    ],
    3: [
      freshRow("Turning in too early often means…", ["you run out of room on the exit", "you always hit the apex perfectly", "the corner gets shorter for everyone else"], 0, "Early in, and the exit tightens. A later turn can leave you space to drive out.", 4),
    ],
  },
  pits: {
    1: [
      freshRow("While you wait you…", ["stay where the marshal put you", "sit on the tyre wall with your legs out", "wander onto a live track"], 0, "The waiting spot is the safe spot. The track is not a playground.", 2),
      freshRow("In a pit lane where driving is allowed, you go…", ["slowly", "as fast as the straight", "the wrong way if it is shorter"], 0, "People and karts share a pit lane. Slow is the rule.", 3),
    ],
    2: [
      freshRow("After the chequered flag you are sent to a closed park. You…", ["leave the kart alone until an official says so", "change the engine at once", "invite friends to sit in it"], 0, "A closed park means hands off. No tinkering until you are released.", 3),
    ],
    3: [
      freshRow("A driver ahead slows a lot in the pit lane and you are close. You…", ["leave a gap and stay slow", "use it as an overtaking place", "stop sideways"], 0, "Pit lanes are for control, not passes. Room in front of you matters.", 4),
    ],
  },
  racing: {
    1: [
      freshRow("Lights out means…", ["you may go, if that is how your club starts", "wait for a second secret signal you invent", "the race is over"], 0, "Know the start before you get there. Going early is a jump start.", 2),
      freshRow("On the lap before the lights, you are mainly…", ["warming tyres and keeping your place", "racing for the lead", "looking for the cafe"], 0, "That lap gets the kart ready and lines you up. It is not a race yet.", 3),
    ],
    2: [
      freshRow("A clean pass leaves…", ["room for the other kart", "the other kart on the grass on purpose", "no gap at all"], 0, "Leave a kart's width. Contact is not a pass.", 3),
    ],
    3: [
      freshRow("You are alongside into the corner, with your front wheels level with their seat. A fair move is…", ["leave them space on the exit", "turn in as if they were not there", "brake-test them"], 0, "Overlap means you share the corner. Crowding them off is not a pass.", 4),
    ],
  },
  line: {
    1: [
      freshRow("A shorter route across the grass is…", ["not a racing line", "always allowed if you are losing", "what the chequered flag means"], 0, "Stay on the tarmac. Grass and gravel are not shortcuts.", 2),
      freshRow("All four wheels go off. You…", ["lift, look, and rejoin when there is a gap", "rejoin across someone's nose", "stop sideways on the line"], 0, "A blind rejoin causes crashes. Look before you come back.", 3),
    ],
    2: [
      freshRow("Weaving to block, again and again, is…", ["not allowed", "what a blue flag asks for", "the best way to learn"], 0, "One move to defend is different from weaving. Weaving is not fair.", 3),
    ],
    3: [
      freshRow("You defend into a corner by…", ["one move, then holding a line", "moving twice more after they commit", "using the grass as a second lane"], 0, "Pick a line and stay there. A second chop is how people hit each other.", 4),
    ],
  },
  respect: {
    1: [
      freshRow("Someone clips you and you both stay on. Next you…", ["make sure you are both running and race fairly", "wait a lap and hit them back", "throw a glove onto the track"], 0, "A clip can be a racing incident. Paying it back is how a small bump becomes a crash.", 2),
      freshRow("A marshal tells you off. You…", ["listen", "argue from the seat", "drive off mid-sentence"], 0, "You can talk calmly later. In the moment, you listen.", 3),
    ],
    2: [
      freshRow("Points come from…", ["finishing, not from one hero crash", "the loudest engine", "ignoring flags"], 0, "A steady finish scores. A crash that fails scores nothing.", 3),
    ],
    3: [
      freshRow("You think a penalty is wrong. You…", ["ask calmly afterwards", "block them for the rest of the day", "post their name online"], 0, "Officials can explain. Anger on track makes a second problem.", 4),
    ],
  },
  "k-brief": {
    1: [
      freshRow("You arrive as the briefing starts. You…", ["listen from the edge and ask after if you missed a rule", "talk over it", "guess the flags later"], 0, "The briefing is the plan. If you missed a sentence, you ask. You do not invent it.", 2),
      freshRow("Phones in the briefing are…", ["away", "a second steering wheel", "how you learn the flags"], 0, "Ears on. A phone can wait until the briefing is done.", 2),
    ],
  },
  "k-rain": {
    1: [
      freshRow("Rain starts mid-session. You…", ["are smoother, and you leave a gap in the spray", "try your fastest dry line at the same speed", "aim at the puddles"], 0, "Wet tracks slide. Spray hides the kart ahead. Space is how you see.", 2),
      freshRow("If you cannot see the marshal post through the spray you…", ["slow down", "tuck into the bumper", "close your eyes"], 0, "See the corner, or be slower until you can.", 2),
    ],
  },
  "k-cheer": {
    1: [
      freshRow("Your brother finishes a race. You cheer…", ["from behind the fence, then meet him in the paddock", "by running to the apex", "by stepping onto the track"], 0, "The fence is the safe side. The paddock is where you say well done.", 2),
      freshRow("A marshal points you back from the tyre wall. You…", ["move at once", "lean further over", "sit on the wall to see better"], 0, "They can see a risk you cannot. Moving is the whole job.", 2),
    ],
  },
};

const WEEK3_INVEST = {
  compound: {
    1: [
      freshRow("£1 left in a jar for a week is…", ["still about £1, unless a grown-up's account adds interest", "automatically £10", "gone because time passed"], 0, "A home jar does not grow by itself. Interest is something a bank may add, and it is not a promise.", 2),
      freshRow("Interest is…", ["extra a bank might add, not magic", "a fine you always pay", "a type of sweet"], 0, "Not every pot pays interest. A piggy bank at home usually does not.", 3),
    ],
    2: [
      freshRow("Pretend £20 grows by 10% to £22. The next 10% is worked out on…", ["£22", "£20 again, forever", "£0"], 0, "That is the snowball picture. 10% here is pretend, not a promise for your family.", 3),
    ],
    3: [
      freshRow("Compounding needs…", ["time and money left in the pot", "a new plan every hour", "someone online who doubles it"], 0, "The extra only stacks if the pot stays put. A stranger offering to double it is a trap.", 4),
    ],
  },
  spend: {
    1: [
      freshRow("The bus fare you were given is…", ["a need for that journey", "spare money for a game", "a gift to spend in an app"], 0, "Money with a job is not spare. The fare gets you there.", 2),
      freshRow("A want can be…", ["lovely and still able to wait", "the same as rent", "always urgent"], 0, "Toys and extras can wait. Needs come first.", 3),
    ],
    2: [
      freshRow("£4.99 in your head is closest to…", ["£5", "£4 exactly with nothing more", "50p"], 0, "Shops like prices that look smaller. Round £4.99 up to £5.", 3),
    ],
    3: [
      freshRow("An advert inside a game is…", ["the shop talking, and you can still say no", "an order from your family", "a school rule"], 0, "The button is not a grown-up. Fetch one before any payment.", 4),
    ],
  },
  twenty: {
    1: [
      freshRow("You have £1. You put 20% aside. How much is that?", ["20p", "£1", "£20"], 0, "20% of £1 is 20p. The other 80p is still there to use.", 2),
      freshRow("Putting 20p aside before you buy a sweet means…", ["that 20p is kept for later", "the 20p has to be spent today", "the sweet becomes free"], 0, "The slice you move first is the one that does not get eaten by the shop.", 3),
    ],
    2: [
      freshRow("20% of £30 is…", ["£6", "£30", "£3"], 0, "A fifth of £30 is £6. This is a practice sum, not an order to save that much.", 3),
    ],
    3: [
      freshRow("20% of £25 is…", ["£5", "£25", "50p"], 0, "A fifth of £25 is £5. The other £20 is the rest of the pot in this sum.", 4),
    ],
  },
  time: {
    1: [
      freshRow("Checking a jar every five minutes…", ["does not make the coins grow", "is how interest is invented", "is required"], 0, "Looking is not the same as leaving it alone.", 2),
      freshRow("A snowball of money takes…", ["years, if it grows at all", "one afternoon", "a shout"], 0, "Growth on growth is slow. Many pots do not grow on their own.", 3),
    ],
    2: [
      freshRow("£2 a week for 10 weeks is £20 before any growth. The lesson is…", ["small regular amounts become a pile", "£2 becomes £20 overnight", "you must save £2"], 0, "The habit is the point. It is not an order for your family.", 3),
    ],
    3: [
      freshRow("Leaving a pot alone for years only helps if…", ["the money stays in, and any growth is real", "you move it every day", "a headline tells you to panic"], 0, "Time does nothing if the pot is emptied. And growth is never guaranteed.", 4),
    ],
  },
  metals: {
    1: [
      freshRow("A gold coin you can hold…", ["is a real thing, and the price can still fall", "can only go up", "is the same as a sweet"], 0, "Gold is something you can own. Its price still moves.", 2),
      freshRow("Silver prices…", ["can go down as well as up", "are fixed by a piggy bank", "never change"], 0, "Metals are not a savings account with a guaranteed extra.", 3),
    ],
    2: [
      freshRow("Putting every pound into one metal is closer to…", ["one big bet", "a glass of water", "a packed lunch"], 0, "One price can fall. A small slice is different from the whole pot.", 3),
    ],
    3: [
      freshRow("Gold can sit for a long time and…", ["still be worth less than you paid", "be forced to rise", "turn into pocket money by law"], 0, "A long wait is not a promise. The price in ten years is unknown.", 4),
    ],
  },
  bitcoin: {
    1: [
      freshRow("A price that jumps around every day, like some internet money…", ["is a bad place for tomorrow's bus fare", "is the same as coins in a jar at home", "cannot fall"], 0, "Jittery prices can drop before you need the money. Bus fare stays in ordinary money.", 2),
      freshRow("A message that says send £5 and get £50 back is…", ["a trap — send nothing and tell an adult", "a Junior ISA", "a school project you must finish"], 0, "Strangers do not multiply your money. That is how scams start.", 3),
    ],
    2: [
      freshRow("A one-time code from a text is…", ["a secret, not something you read to a caller", "fine to put in a game chat", "the same as your first name"], 0, "A code is a key. A real bank will not ask a child to read it out.", 3),
    ],
    3: [
      freshRow("Money in an app you do not understand should…", ["wait until an adult has looked", "be sent because the logo looked real", "be your lunch money as a test"], 0, "Logos can be copied. An adult checks before any payment leaves.", 4),
    ],
  },
  etf: {
    1: [
      freshRow("Owning a little of fifty shops, not just one, means…", ["one bad shop does not wipe the whole story", "you cannot lose money", "it is the same as one sweet"], 0, "Spreading out is calmer. The whole bag can still fall. It is not a promise.", 2),
      freshRow("An ETF, in kid words, is…", ["a basket that follows a long list of companies", "a loan from a stranger in a chat", "a flag"], 0, "You own a tiny slice of many firms, not one hero shop.", 3),
    ],
    2: [
      freshRow("A chart of past growth is…", ["a story about before, not a promise", "a contract that it repeats", "the same as interest in a jar"], 0, "Last year does not owe you the same year again.", 3),
    ],
    3: [
      freshRow("A fund can fall even if it holds many companies because…", ["lots of shops can have a bad year together", "baskets are not allowed to fall", "the name ETF means safety"], 0, "Spreading helps. It does not delete risk. A parent decides about real money.", 4),
    ],
  },
  stocks: {
    1: [
      freshRow("Buying a share means you own…", ["a tiny piece of that one company", "a coin that doubles while you sleep", "a bill from a stranger"], 0, "One company can do well or badly. A share is a slice of that firm, not a promise.", 2),
      freshRow("If the only company you own a slice of shuts down, that slice can…", ["be worth almost nothing", "be redrawn at home as a new coin", "turn into pocket money by law"], 0, "One firm can fail. A mix of many firms is calmer than betting on just that one.", 3),
    ],
    2: [
      freshRow("This week's food money should…", ["stay out of a single share", "go into the jumpiest share", "be lent to a stranger"], 0, "Soon-money wants to stay spendable. Only spare money could even be discussed, and a parent decides.", 3),
    ],
    3: [
      freshRow("Owning one shop's shares is riskier than a wide basket because…", ["everything depends on that one firm", "one share cannot fall", "baskets are illegal"], 0, "A bad year for that firm hits the whole slice. A mix spreads the story.", 4),
    ],
  },
  risk: {
    1: [
      freshRow("If a price can fall, you only use money you…", ["could leave alone", "need for the bus tomorrow", "borrowed from a stranger"], 0, "Soon-money stays spendable. Falling prices are a bad place for it.", 2),
      freshRow("A loud news story about prices falling means you…", ["stop and talk to an adult before doing anything", "must sell because the lesson says so", "are not allowed to learn about money"], 0, "Headlines are noisy. A parent decides what happens to real money. The lesson does not.", 3),
    ],
    2: [
      freshRow("A bumpier price, one that can drop hard, is…", ["higher risk, even if it sometimes rises", "a guaranteed prize", "the same as a packed lunch"], 0, "Risk is the size of the wobble. A bigger wobble is not a promise of a bigger prize.", 3),
    ],
    3: [
      freshRow("A pot you need in a month and a pot you can leave for years…", ["should not be treated the same", "must both go in the jumpiest thing", "are both safe in a stranger's link"], 0, "Soon-money wants to stay still. Long money can sit through a wobble. A parent chooses.", 4),
    ],
  },
  mix: {
    1: [
      freshRow("The whole pot in one place is…", ["riskier than spreading it", "always safer", "the 20% rule"], 0, "One fall can hit everything if it is all in one basket.", 2),
      freshRow("A mix of a coin, a fund and some cash means…", ["more than one kind of thing", "only whatever rose yesterday", "your lunch money must go in too"], 0, "Mix means more than one home for the money. It can still fall. It is not advice to buy.", 3),
    ],
    2: [
      freshRow("Changing a mix every day…", ["usually adds fuss, and sometimes charges", "forces it to grow", "removes all risk"], 0, "A calm mix can sit. Constant tinkering is not the same as a plan.", 3),
    ],
    3: [
      freshRow("A mix still needs a look sometimes because…", ["one part can grow until it is most of the pot", "looking makes it double", "mixes cannot change"], 0, "If one piece becomes almost everything, you are back to one basket. A parent decides if anything is tidied.", 4),
    ],
  },
  fees: {
    1: [
      freshRow("A yearly charge taken from a pot is…", ["a fee, so less stays in", "free interest", "a racing flag"], 0, "Fees leave the pot. They are not interest added. Small charges, many years, add up.", 2),
      freshRow("Two similar baskets, one with a bigger yearly charge…", ["the cheaper charge keeps more in the pot", "the expensive one is always better", "charges do not matter"], 0, "You cannot control the market. You can notice the charge.", 3),
    ],
    2: [
      freshRow("1% taken every year is…", ["a real slice, not nothing", "too small to mention ever", "a guarantee of profit"], 0, "One pound in every hundred, every year, becomes a pile over a long time.", 3),
    ],
    3: [
      freshRow("A fee you pay when you buy and a fee you pay every year…", ["both leave the pot", "cancel each other out", "are the same as interest added"], 0, "One is a ticket in. One is rent for staying. Both are costs, not growth.", 4),
    ],
  },
  patience: {
    1: [
      freshRow("You write down what you will do before a noisy week so that…", ["the noisy week does not make the decision", "you can throw the plan away at the first headline", "you must change it every evening"], 0, "A calm plan is for the days when prices shout. The shout should not rewrite it.", 2),
      freshRow("These lessons are…", ["learning, not an order to buy anything", "personal advice for your family", "a promise of a rate"], 0, "A parent decides what happens to real money. The lesson teaches the idea.", 3),
    ],
    2: [
      freshRow("A Junior ISA, as an idea, can be…", ["locked away until 18 so it is not raided", "a rule that it cannot fall", "a shop voucher"], 0, "The lock is the point some families like. It is not a promise the pot only grows.", 3),
    ],
    3: [
      freshRow("Selling because a week looked bad, when the plan was for years…", ["is the wobble writing the plan", "is always required", "removes fees"], 0, "The calm plan was for this feeling. Changing it in a panic is how people lock in a fall.", 4),
    ],
  },
  "i-need": {
    1: [
      freshRow("Food for dinner and a poster are…", ["a need and a want", "both needs", "both against the rules"], 0, "Dinner keeps you going. The poster can wait.", 2),
      freshRow("Money given for a school trip is…", ["for the trip", "spare for an app", "yours to hide"], 0, "It has a job. It is not the pot you practise investing with.", 2),
    ],
  },
  "i-wait": {
    1: [
      freshRow("You want a toy with spare money. Waiting until tomorrow…", ["often shows you if you still want it", "is illegal", "makes the price vanish by law"], 0, "Feelings are fast. A night is a fair test of a want.", 2),
      freshRow("'Only today' on a screen is…", ["pressure", "proof you must buy", "a bank"], 0, "A countdown is a reason to slow down, not speed up.", 2),
    ],
  },
  "i-ask": {
    1: [
      freshRow("A game asks for a card number. You…", ["fetch an adult and do not type it", "type it to see what happens", "read it to a friend in the chat"], 0, "Children do not pay online in this family. An adult holds the card.", 2),
      freshRow("A password is shared with…", ["nobody, except a parent who already helps you set it", "a new friend in a game", "a pop-up"], 0, "A password is a key to the account. Chats are not a safe place for it.", 2),
    ],
  },
};

function installFreshWeek() {
  if (installFreshWeek.done) return;
  installFreshWeek.done = true;

  function pushRows(bank, skill, stage, rows) {
    if (!bank[skill]) bank[skill] = {};
    if (!Array.isArray(bank[skill][stage])) bank[skill][stage] = [];
    const have = new Set(bank[skill][stage].map((row) => String(row[0] || "").trim().toLowerCase()));
    rows.forEach((row) => {
      const key = String(row[0] || "").trim().toLowerCase();
      if (!key || have.has(key)) return;
      bank[skill][stage].push(row);
      have.add(key);
    });
  }

  if (typeof GEORGE_KART_BANK !== "undefined") {
    Object.keys(WEEK3_KART).forEach((skill) => {
      if (!GEORGE_KART_BANK[skill]) return;
      Object.keys(WEEK3_KART[skill]).forEach((stage) => {
        pushRows(GEORGE_KART_BANK, skill, Number(stage), WEEK3_KART[skill][stage]);
      });
    });
  }
  if (typeof GEORGE_INVEST_BANK !== "undefined") {
    Object.keys(WEEK3_INVEST).forEach((skill) => {
      if (!GEORGE_INVEST_BANK[skill]) return;
      Object.keys(WEEK3_INVEST[skill]).forEach((stage) => {
        pushRows(GEORGE_INVEST_BANK, skill, Number(stage), WEEK3_INVEST[skill][stage]);
      });
    });
  }
  if (typeof installGeorgeBanks === "function") installGeorgeBanks();

  function pushModuleQuestions(subject, skill, stage, items) {
    if (typeof getTeachModule !== "function") return;
    const mod = getTeachModule(subject, skill, Number(stage), null);
    if (!mod) return;
    if (!Array.isArray(mod.practice)) mod.practice = [];
    const have = new Set(mod.practice.map((q) => String((q && q.q) || "").trim().toLowerCase()));
    items.forEach((q) => {
      const key = String(q.q || "").trim().toLowerCase();
      if (!key || have.has(key)) return;
      mod.practice.push(q);
      have.add(key);
    });
  }

  Object.keys(WEEK3_CORE).forEach((subject) => {
    Object.keys(WEEK3_CORE[subject]).forEach((skill) => {
      Object.keys(WEEK3_CORE[subject][skill]).forEach((stage) => {
        pushModuleQuestions(subject, skill, stage, WEEK3_CORE[subject][skill][stage]);
      });
    });
  });

  // Extra First steps lessons live on the teach module, not in the big banks.
  ["k-brief", "k-rain", "k-cheer"].forEach((skill) => {
    const pack = WEEK3_KART[skill] && WEEK3_KART[skill][1];
    if (!pack) return;
    pushModuleQuestions(
      "karting",
      skill,
      1,
      pack.map((row) => freshMulti(row[0], row[1], row[2], row[3]))
    );
  });
  ["i-need", "i-wait", "i-ask"].forEach((skill) => {
    const pack = WEEK3_INVEST[skill] && WEEK3_INVEST[skill][1];
    if (!pack) return;
    pushModuleQuestions(
      "investing",
      skill,
      1,
      pack.map((row) => freshMulti(row[0], row[1], row[2], row[3]))
    );
  });
}

installFreshWeek();
