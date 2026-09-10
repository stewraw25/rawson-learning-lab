/**
 * Go-karting (George) and Horses (Bella) — stages 2–6.
 * Stage 1 stays the easy First steps in teach-content.js.
 * Each level is a bit harder than the one before.
 */

function funQ(q, options, answer, explain) {
  return { q, type: "multi", options, answer, explain, stage: "both" };
}

function funTyped(q, answer, explain) {
  return { q, type: "typed", answer: String(answer), explain, stage: "both" };
}

function funMod(title, blurb, points, steps, practice, strugglePoints, struggleQ) {
  return {
    title,
    blurb,
    videoKey: "",
    teach: { points, visual: "" },
    example: { title: "Worked example", steps },
    practice,
    struggle: {
      points: strugglePoints,
      practice: [struggleQ],
    },
  };
}

const FUN_KARTING_STAGES = {
  2: {
    safety: funMod(
      "Flags and kit",
      "Yellow means slow. Visor down. Hair tied back.",
      [
        "A yellow flag means danger ahead — slow down, no overtaking.",
        "Your visor (the clear bit on the helmet) stays down on track.",
        "Long hair is tied back so it cannot catch in the kart.",
      ],
      ["You see a yellow flag.", "You lift off the throttle and do not pass anyone.", "You wait for green before racing again."],
      [
        funQ("A yellow flag means…", ["Go faster", "Slow down — no overtaking", "You won"], 1, "Yellow = caution. Stay in line."),
        funQ("On track your visor should be…", ["Down", "Off", "In your pocket"], 0, "Visor down protects your eyes."),
        funQ("Long hair should be…", ["Tied back", "Loose in the wind", "Cut off every race"], 0, "Tied back so it cannot catch."),
      ],
      ["Yellow = slow, no passing.", "Green = racing can start again."],
      funQ("True or false: you may overtake under yellow.", ["True", "False"], 1, "No overtaking under yellow.")
    ),
    kart: funMod(
      "How the kart is built",
      "Kill switch, tyres, and what makes it go.",
      [
        "The kill switch (often red) stops the engine. Learn where it is before you drive.",
        "Tyres need air. Soft tyres grip more; bald tyres slip.",
        "A kart has no gears like a car — you use the throttle and brake.",
      ],
      ["Before you roll, find the kill switch.", "Check the tyres look round and pumped.", "Then you may start."],
      [
        funQ("The kill switch…", ["Stops the engine", "Makes you faster", "Plays music"], 0, "It shuts the engine off."),
        funQ("Bald tyres…", ["Grip more", "Slip more", "Never wear out"], 1, "Smooth rubber slides."),
        funQ("A typical hire kart has…", ["Lots of gears like a lorry", "No gears — throttle and brake", "Only reverse"], 1, "Throttle and brake."),
      ],
      ["Kill switch = stop engine.", "Air in tyres = safer grip."],
      funQ("Find this before you drive:", ["The kill switch", "The ice-cream van"], 0, "Know how to stop the engine.")
    ),
    racing: funMod(
      "Starts and lights",
      "Lights go out — then you go. Don’t jump.",
      [
        "Start lights: red lights come on, then they go out. That’s the start.",
        "Jumping the start (going early) can earn a penalty.",
        "A formation lap is a slow lap to warm tyres and line up.",
      ],
      ["Lights are red.", "They go out.", "Now you may go — not before."],
      [
        funQ("You go when the start lights…", ["Come on red", "Go out", "Turn blue"], 1, "Lights out = start."),
        funQ("Going before the start is called…", ["A jump start", "A picnic", "A chequered flag"], 0, "Jump start = too early."),
        funQ("A formation lap is…", ["A slow warm-up lap", "The last lap", "Lunch"], 0, "Warm tyres and line up."),
      ],
      ["Red on → wait. Lights out → go.", "Early = jump start."],
      funQ("Jump start means you went…", ["Too early", "Too late"], 0, "Before the lights went out.")
    ),
    driving: funMod(
      "Look where you go",
      "Eyes up. Smooth feet. The kart follows your eyes.",
      [
        "Look through the corner to where you want to go — not at the barrier.",
        "Smooth on the throttle: squeeze, don’t stamp.",
        "If you look at the wall, you tend to drive toward it.",
      ],
      ["Corner coming.", "Look to the exit.", "Steer there and squeeze the go pedal after the apex."],
      [
        funQ("In a corner you should look…", ["At the barrier", "To where you want to go", "At your shoes"], 1, "Eyes lead the kart."),
        funQ("On the throttle, be…", ["Smooth", "As jumpy as you can", "Asleep"], 0, "Squeeze, don’t stamp."),
        funQ("If you stare at the wall you may…", ["Drive toward it", "Teleport", "Win automatically"], 0, "You go where you look."),
      ],
      ["Eyes to the exit.", "Smooth feet."],
      funQ("Stamp on the throttle?", ["No — squeeze", "Yes — always"], 0, "Smooth is faster and safer.")
    ),
  },
  3: {
    safety: funMod(
      "More flags",
      "Blue, green, and what to do if you stop.",
      [
        "Blue flag: a faster kart is catching you — don’t block, let them by when it’s safe.",
        "Green flag: track is clear, racing is on.",
        "If you stop on track, keep your helmet on and wait for a marshal.",
      ],
      ["A blue flag waves.", "A faster kart is behind.", "Hold your line and let them pass on the straight if you can."],
      [
        funQ("A blue flag means…", ["You won", "A faster kart is coming — don’t block", "Rain"], 1, "Let faster traffic through."),
        funQ("Green flag means…", ["Track is clear", "Stop now", "Push the kart"], 0, "Racing is on."),
        funQ("If you stop on track, keep…", ["Your helmet on", "Your visor in the pit", "Running across the track"], 0, "Helmet stays on."),
      ],
      ["Blue = faster kart behind.", "Helmet on if you stop."],
      funQ("Block a faster kart under blue?", ["No", "Yes"], 0, "Don’t block.")
    ),
    kart: funMod(
      "Wet and dry",
      "Slick tyres for dry. Different rubber for rain.",
      [
        "Slick tyres (smooth) are for dry tracks. Rain tyres have grooves to push water away.",
        "The chain drives the back axle. A slack chain can jump off.",
        "Brake bias (on some race karts) is how much front vs rear brake you use.",
      ],
      ["It’s raining.", "Grooved tyres move water.", "Slicks would skate on puddles."],
      [
        funQ("Slick tyres are for…", ["Dry tracks", "Deep puddles only", "Snowmen"], 0, "Smooth rubber, dry days."),
        funQ("Rain tyres have…", ["Grooves", "No rubber", "Wings like a plane"], 0, "Grooves move water."),
        funQ("A slack chain can…", ["Jump off", "Make you invisible", "Cook lunch"], 0, "Keep it snug."),
      ],
      ["Slick = dry. Grooves = rain.", "Chain drives the rear."],
      funQ("Puddles + slicks =", ["Skating", "Extra grip"], 0, "You slide.")
    ),
    racing: funMod(
      "Qualifying and race",
      "First you set a time. Then you race.",
      [
        "Qualifying: you set your fastest lap. Fastest starts at the front.",
        "The race is a set number of laps. First over the line (after penalties) wins.",
        "Pit lane has a slow speed — you don’t blast through it.",
      ],
      ["Qualifying: one flying lap.", "You go 3rd fastest.", "You start the race P3."],
      [
        funQ("Qualifying decides…", ["Who starts at the front", "The weather", "Lunch"], 0, "Fastest lap → front of the grid."),
        funQ("A race is usually…", ["A set number of laps", "One sleep", "Until you get bored"], 0, "Fixed laps (or a time)."),
        funQ("In the pit lane you should be…", ["Slow and careful", "Flat out", "Blindfolded"], 0, "Pit lane is slow."),
      ],
      ["Qualifying = grid.", "Pit lane = slow."],
      funQ("Fastest in qualifying starts…", ["At the front", "At the back"], 0, "Pole is the front.")
    ),
    driving: funMod(
      "The racing line",
      "Outside, inside, outside. Use all the track.",
      [
        "The racing line is the fastest path: start wide, cut in (apex), then let the kart run out wide.",
        "The apex is the inside point of the corner, closest to the kerb.",
        "A late apex (turning a bit later) can help you go faster down the next straight.",
      ],
      ["Turn 1: start on the outside.", "Clip the inside kerb (apex).", "Unwind to the outside on exit."],
      [
        funQ("The racing line is…", ["The fastest path around a corner", "A type of rope", "Only for horses"], 0, "Wide–in–wide."),
        funQ("The apex is…", ["The inside of the corner", "The start lights", "The engine"], 0, "Closest point to the inside."),
        funQ("Out-in-out means…", ["Wide, then inside, then wide", "Only drive in a circle in the paddock", "Close your eyes"], 0, "That’s the basic line."),
      ],
      ["Wide → apex → wide.", "Apex = inside point."],
      funQ("Start a corner on the…", ["Outside", "Middle of the grass"], 0, "Then cut in.")
    ),
  },
  4: {
    safety: funMod(
      "Incidents",
      "What to do when karts tangle — and how to push safely.",
      [
        "If karts tangle, stay in the kart if you can, visor down, wait for marshals.",
        "Never stand in the middle of the track to pick up a bumper.",
        "When you push a kart, push from the back bumper, looking where you’re going.",
      ],
      ["Two karts touch and stop.", "Keep helmets on.", "Marshals move you — you don’t wander about."],
      [
        funQ("After a tangle, first…", ["Stay put, helmet on, wait", "Run across the track", "Take the helmet off at once"], 0, "Stay safe, wait for help."),
        funQ("Standing in the middle of a live track is…", ["Dangerous", "A good idea", "Required"], 0, "Never stand in traffic."),
        funQ("Push a kart from the…", ["Back bumper, looking ahead", "Steering wheel while sitting in a tree", "Front spoiler with your face"], 0, "Back, eyes up."),
      ],
      ["Helmet on. Wait.", "Don’t walk into traffic."],
      funQ("Walk into a live track to fetch a cone?", ["No", "Yes"], 0, "Marshals do that.")
    ),
    kart: funMod(
      "Sprockets and speed",
      "A bigger rear sprocket = easier to get going, less top speed.",
      [
        "The sprocket is the toothed wheel the chain sits on.",
        "Bigger rear sprocket: quicker off the line, lower top speed.",
        "Smaller rear sprocket: slower away, higher top speed on long straights.",
      ],
      ["Short twisty track.", "You want punch out of corners.", "Fit a slightly bigger rear sprocket."],
      [
        funQ("A sprocket is…", ["A toothed wheel for the chain", "A type of flag", "A sandwich"], 0, "Chain sits on it."),
        funQ("Bigger rear sprocket usually means…", ["Quicker acceleration, less top speed", "Always slower everywhere", "No chain needed"], 0, "Punch vs top speed."),
        funQ("Long straight, you may want…", ["A smaller rear sprocket", "No tyres", "A bigger sofa"], 0, "More top speed."),
      ],
      ["Big rear sprocket = punch.", "Small = top speed."],
      funQ("Twisty track favours…", ["More punch (bigger rear sprocket)", "Only top speed"], 0, "Get out of corners fast.")
    ),
    racing: funMod(
      "Overtaking",
      "Pass on the straight or with a better line — not by diving into the side.",
      [
        "The cleanest pass is down the straight or with a later brake that still leaves space.",
        "Leave a kart’s width. Turning in on someone beside you is blocking / contact.",
        "Defending: one move to cover the inside is usually OK. Weaving is not.",
      ],
      ["You’re faster on the straight.", "Pull out, pass, and leave a kart’s width.", "Don’t chop across their nose."],
      [
        funQ("A clean pass leaves…", ["A kart’s width", "No space at all", "The other kart in the gravel on purpose"], 0, "Room to exist."),
        funQ("Weaving down the straight to block is…", ["Not OK", "The best skill", "Required"], 0, "One defensive move, not a snake."),
        funQ("The safest place to pass is often…", ["The straight", "The medical centre", "The car park"], 0, "Speed difference, more space."),
      ],
      ["Leave space.", "One move to defend, not weaving."],
      funQ("Chop across someone’s nose?", ["No", "Always"], 0, "That’s contact waiting to happen.")
    ),
    driving: funMod(
      "Braking and kerbs",
      "Brake in a straight line first. Kerbs can help — or spit you off.",
      [
        "Brake hardest while the kart is straight. Then ease off as you turn (a simple idea of trail braking).",
        "Inside kerbs at the apex can shorten the corner if they’re flat.",
        "High, painted sausage kerbs can bounce you into a spin — treat them with respect.",
      ],
      ["Straight: squeeze the brake.", "As you turn, ease off the brake.", "Pick up the throttle after the apex."],
      [
        funQ("Brake hardest when the kart is…", ["Straight", "Already fully sideways", "In the air"], 0, "Straight-line braking first."),
        funQ("A sausage kerb can…", ["Bounce you into a spin", "Cook sausages", "Make you lighter"], 0, "They’re tall and nasty."),
        funQ("Trail braking (simple) means…", ["Ease off the brake as you turn", "Never brake", "Only brake in the pits"], 0, "Blend brake into the turn."),
      ],
      ["Straight = most brake.", "Nasty kerbs = bounce."],
      funQ("Stamp the brake in the middle of a turn?", ["Risky — you may spin", "Always perfect"], 0, "That’s how you lose the back end.")
    ),
  },
  5: {
    safety: funMod(
      "Rules of the meeting",
      "Scrutineering, parc fermé, and not blocking on purpose.",
      [
        "Scrutineering is a safety check of the kart before you race (seat, bumpers, helmet).",
        "Parc fermé is a closed park after the race — you don’t tinker until you’re allowed.",
        "Deliberate blocking or ignoring flags can mean a black flag (you’re out).",
      ],
      ["Before the final, marshals check bumpers and helmet strap.", "That’s scrutineering.", "You only race if you pass."],
      [
        funQ("Scrutineering is…", ["A safety check of kart and kit", "A type of sandwich", "The winner’s speech"], 0, "Is the kart safe?"),
        funQ("Parc fermé means…", ["A closed park — no tinkering yet", "Free ice cream", "Open paddock party"], 0, "Hands off until released."),
        funQ("A black flag usually means…", ["You must come in / you’re out", "Go faster", "Rain"], 0, "Serious — obey it."),
      ],
      ["Scrutineering = safety check.", "Black flag = come in."],
      funQ("Ignore a black flag?", ["No", "Yes, for fun"], 0, "You come in.")
    ),
    kart: funMod(
      "Grip, heat and camber",
      "Hot tyres grip more — until they overheat. Camber is wheel tilt.",
      [
        "Tyres grip more when they’re up to temperature. Cold tyres slide.",
        "Too much heat and they go greasy (you slide again).",
        "Camber is a tiny tilt of the wheel. A little can help the front bite in corners.",
      ],
      ["First lap: tyres are cold.", "You brake earlier.", "As they warm, you can push a bit more."],
      [
        funQ("Cold tyres…", ["Grip less", "Always grip more", "Never change"], 0, "Warm them up."),
        funQ("Overheated tyres can…", ["Go greasy and slide", "Turn into metal", "Last forever"], 0, "Too hot is also slow."),
        funQ("Camber is…", ["A small tilt of the wheel", "A type of flag", "The driver’s snack"], 0, "Wheel lean."),
      ],
      ["Cold = slide. Hot enough = grip. Too hot = greasy.", "Camber = tilt."],
      funQ("Push at 100% on lap 1 on cold tyres?", ["Risky", "Always safest"], 0, "Build up.")
    ),
    racing: funMod(
      "Strategy",
      "Save the kart, watch the weather, think a lap ahead.",
      [
        "Sometimes you attack early. Sometimes you sit behind, save tyres, and pass later.",
        "Rain can change everything — the fastest dry line may be the slowest wet line.",
        "Think one corner ahead: set up the next pass, not just this one.",
      ],
      ["10 laps, tyres fading.", "You wait until lap 8 when they slide wide.", "Then you pass on the inside."],
      [
        funQ("Saving tyres can help you…", ["Pass later when others slide", "Never finish", "Skip scrutineering"], 0, "Patience is a tool."),
        funQ("In rain the dry racing line is often…", ["Not the fastest any more", "Still perfect", "Closed by law"], 0, "Rubber in the wet is slippery."),
        funQ("Think…", ["A corner ahead", "Only about snacks", "About yesterday only"], 0, "Set up the next move."),
      ],
      ["Attack or wait — both can be right.", "Wet ≠ dry line."],
      funQ("Always dive-bomb every corner?", ["No — think", "Yes"], 0, "That’s how you crash.")
    ),
    driving: funMod(
      "Understeer and oversteer",
      "Front won’t turn, or the back steps out. What you do next.",
      [
        "Understeer: the front washes wide — you turn but it doesn’t bite. Ease off the throttle and give it a cleaner line.",
        "Oversteer: the back steps out. Don’t stamp the brake; unwind a little and catch it with small steering.",
        "Weight transfer: brake and the nose bites; accelerate and the rear sits down.",
      ],
      ["Kart won’t turn in — understeer.", "Lift a little.", "The nose may grip again."],
      [
        funQ("Understeer is when…", ["The front washes wide", "The back spins first", "The engine sings"], 0, "You turn, it goes straight-ish."),
        funQ("Oversteer is when…", ["The back steps out", "The front never moves", "The visor fogs on purpose"], 0, "Rear is loose."),
        funQ("Stamping the brake in a slide often…", ["Makes it worse", "Fixes everything", "Adds horsepower"], 0, "Be gentle."),
      ],
      ["Understeer = front wide.", "Oversteer = rear out.", "Gentle inputs."],
      funQ("Kart won’t turn. Try…", ["A little lift", "More and more lock forever"], 0, "Give the front a chance.")
    ),
  },
  6: {
    safety: funMod(
      "Stewards and penalties",
      "Someone watches. Penalties exist so racing stays fair.",
      [
        "Stewards review incidents: jumps, contact, ignoring flags.",
        "Penalties can be a time add, a drop of places, or disqualification.",
        "Fair racing: you can be firm, but you don’t use people as brakes.",
      ],
      ["Contact at turn 3.", "Stewards look at who left space.", "A time penalty may be added."],
      [
        funQ("Stewards…", ["Review incidents and apply rules", "Sell snacks only", "Drive your kart for you"], 0, "They’re the referees."),
        funQ("A time penalty means…", ["Seconds added to your result", "You get extra cake", "Free tyres"], 0, "Your time gets worse."),
        funQ("Using another kart as a brake is…", ["Unfair and unsafe", "Great strategy always", "Required in the rules"], 0, "Don’t."),
      ],
      ["Stewards = referees.", "Penalties keep it fair."],
      funQ("Rules are only for slow people?", ["False", "True"], 0, "Rules are for everyone.")
    ),
    kart: funMod(
      "Setup trade-offs",
      "Every change helps one thing and hurts another.",
      [
        "More grip often means tyres wear faster.",
        "A kart set for one fast corner may feel slow in a tight hairpin.",
        "Great drivers adapt their driving to the setup they have, not the perfect one in their head.",
      ],
      ["You add grip.", "Qualifying is quick.", "By lap 12 the tyres are gone — that’s the trade-off."],
      [
        funQ("More grip often means…", ["Tyres wear faster", "Tyres last forever", "No need to drive well"], 0, "Trade-off."),
        funQ("One setup…", ["Cannot be perfect for every corner", "Wins every corner equally always", "Removes the need for practice"], 0, "Compromise."),
        funQ("When the kart isn’t perfect you…", ["Adapt how you drive", "Give up at once", "Remove the steering wheel"], 0, "Drive what’s under you."),
      ],
      ["Help one thing, hurt another.", "Adapt."],
      funQ("Perfect setup for every corner at once?", ["Rarely exists", "Always easy"], 0, "It’s a compromise.")
    ),
    racing: funMod(
      "Championship thinking",
      "Points over the year. One race is not the whole story.",
      [
        "Championships add points each round. Finishing beats a hero crash.",
        "A DNF (did not finish) scores nothing — sometimes P4 and points is smarter than P1 or zero.",
        "Teams and drivers still race hard — they also think about the season.",
      ],
      ["Last lap, wet, huge lead.", "A crash = zero points.", "You ease off and take the finish."],
      [
        funQ("A championship is won by…", ["Points over rounds", "One handshake", "The loudest engine only"], 0, "Season, not one lap."),
        funQ("DNF means…", ["Did not finish", "Drove near fastest", "Did nothing funny"], 0, "You didn’t see the flag."),
        funQ("Sometimes P4 is smarter than…", ["Crashing for a win that doesn’t happen", "Wearing a helmet", "Learning flags"], 0, "Points > hero zero."),
      ],
      ["Finish = points.", "Season > one lunge."],
      funQ("Always crash rather than finish P5?", ["No", "Yes"], 0, "Points matter.")
    ),
    driving: funMod(
      "Consistent laps",
      "The same good lap, again and again, beats one magic lap and three mistakes.",
      [
        "Consistency: hit the same marks. That’s how you get quicker without crashing.",
        "A “hero lap” with mistakes on the next three is slower overall.",
        "Breathe, look far, repeat the plan. That’s race-craft in your head.",
      ],
      ["You do 48.2, 48.3, 48.2.", "A rival does 47.9 then 49.5, 49.8.", "You win on average."],
      [
        funQ("Consistency means…", ["Repeating good laps", "One lucky lap only", "Never practising"], 0, "Same marks, again."),
        funQ("One magic lap plus mistakes is often…", ["Slower overall", "Always the win", "Required by flags"], 0, "Average lap matters."),
        funQ("A simple mental plan is…", ["Look far, hit marks, repeat", "Panic every corner", "Close your eyes"], 0, "That’s race-craft."),
      ],
      ["Repeat the good lap.", "Hero + crash < tidy pace."],
      funQ("Best racers only ever go 100% messy?", ["False", "True"], 0, "They pick their moments.")
    ),
  },
};

const FUN_HORSES_STAGES = {
  2: {
    care: funMod(
      "Feet, bed and water",
      "Hooves, a clean bed, water checked often.",
      [
        "A horse’s feet (hooves) need checking. Stones hurt. A farrier trims and shoes.",
        "Stables need clean, dry bedding. Wet dirty beds can make skin sore.",
        "Check water at least twice a day — buckets get empty or icy.",
      ],
      ["Pick up a hoof (with help).", "Look for stones.", "Tell an adult if it’s cracked or smelly."],
      [
        funQ("A farrier looks after…", ["Hooves", "Emails", "Only dogs"], 0, "Feet specialist."),
        funQ("Bedding should be…", ["Clean and dry", "Soaking wet", "Made of crisps"], 0, "Dry bed, happy skin."),
        funQ("Water should be checked…", ["Often (at least twice a day)", "Once a year", "Never"], 0, "Horses drink a lot."),
      ],
      ["Hooves matter.", "Dry bed. Fresh water."],
      funQ("Leave a stone in a hoof?", ["No — it can hurt", "Yes — lucky stone"], 0, "Pick it out (with help).")
    ),
    feeding: funMod(
      "Little and often",
      "Horses nibble all day. Don’t dump a huge new meal.",
      [
        "Horses are designed to eat forage (hay/grass) little and often, not one giant dinner.",
        "Change food slowly. A sudden rich mix can upset the tummy.",
        "Treats (apple, carrot) are small extras — not the whole diet.",
      ],
      ["New hay arrives.", "Mix a little with the old hay for a few days.", "Then switch fully."],
      [
        funQ("Horses should eat…", ["Little and often", "One huge meal a week", "Only chocolate"], 0, "Nibble, nibble."),
        funQ("Change food…", ["Slowly", "All in one hour always", "Never tell anyone"], 0, "Tummies like slow change."),
        funQ("A carrot is…", ["A small treat", "A full day’s food", "Poison always"], 0, "Treat, not dinner."),
      ],
      ["Forage first.", "Slow changes."],
      funQ("Swap to rich food in five minutes?", ["Risky", "Perfect"], 0, "Go slowly.")
    ),
    riding: funMod(
      "Mount, walk, reins",
      "Get on from the left. Walk first. Soft hands.",
      [
        "We usually mount from the left side (the near side).",
        "Walk before you trot. The horse needs to warm up too.",
        "Reins: hold them so you can talk to the mouth softly — not a big yank.",
      ],
      ["Hat on, check girth (with help).", "Mount from the left.", "Walk a lap before faster work."],
      [
        funQ("Mount from the…", ["Left (near side)", "Roof", "Tail"], 0, "Left is the usual side."),
        funQ("Before trot…", ["Walk first", "Gallop at once", "Take the hat off"], 0, "Warm up."),
        funQ("Reins should be…", ["Soft and clear", "Yanked as hard as you can", "Tied to the fence"], 0, "Talk, don’t shout."),
      ],
      ["Left to mount.", "Walk first.", "Soft hands."],
      funQ("Yank the mouth to say hello?", ["No", "Yes"], 0, "That’s unkind and unclear.")
    ),
    history: funMod(
      "Horses in Britain",
      "Farms, pits, and pulling loads — not just riding schools.",
      [
        "Pit ponies worked underground in coal mines. It was hard, dark work.",
        "Farm horses pulled ploughs before tractors were common.",
        "Coaches and carts used teams of horses on the roads.",
      ],
      ["Before tractors, a horse walked the field.", "The plough turned the soil.", "That fed people."],
      [
        funQ("Pit ponies worked…", ["In coal mines", "On the moon", "Only at parties"], 0, "Underground."),
        funQ("Before tractors, many ploughs were pulled by…", ["Horses", "Laptops", "Hot-air balloons"], 0, "Horse power was real horses."),
        funQ("Road coaches were pulled by…", ["Teams of horses", "One hamster", "Magnets only"], 0, "Teams on the road."),
      ],
      ["Mines, farms, roads.", "Horses did the heavy work."],
      funQ("Tractors came…", ["After horse ploughs were common", "Before dinosaurs"], 0, "Horses first.")
    ),
  },
  3: {
    care: funMod(
      "Rugs, worms, jabs",
      "Winter rugs. Worming and vaccines — a grown-up’s job, you should know they exist.",
      [
        "A rug can keep a clipped or thin-coated horse warm in winter. Not every horse needs one every day.",
        "Worming and vaccinations are health jobs a vet or experienced adult plans.",
        "If a horse is shivering, not eating, or very quiet, tell an adult at once.",
      ],
      ["Cold, clipped horse.", "A well-fitting rug.", "Check it isn’t rubbing the shoulders."],
      [
        funQ("A winter rug is for…", ["Warmth when needed", "Fashion only", "Stopping all food"], 0, "Some horses, some days."),
        funQ("Worming and jabs are…", ["Health jobs for a vet / experienced adult", "A child’s secret", "Optional for fun"], 0, "Grown-up plan."),
        funQ("Horse very quiet and not eating…", ["Tell an adult now", "Ignore it", "Give chocolate"], 0, "Could be poorly."),
      ],
      ["Rugs if needed.", "Jabs/worming = adult + vet.", "Quiet + no food = tell someone."],
      funQ("Fit a rug so it…", ["Doesn’t rub", "Covers the eyes tightly"], 0, "Comfort.")
    ),
    feeding: funMod(
      "Colic — tummy pain",
      "Colic is a sore tummy. It can be serious. Fetch an adult.",
      [
        "Colic means tummy pain. A horse may roll, look at its side, or not eat.",
        "You cannot fix colic with a carrot. Get an experienced adult / vet.",
        "Keeping to little-and-often forage and clean water helps reduce risk — it is not a promise.",
      ],
      ["Horse paws, looks at its flank, won’t eat.", "That can be colic.", "Tell an adult immediately."],
      [
        funQ("Colic is…", ["Tummy pain", "A type of hat", "A fast gait"], 0, "Abdominal pain."),
        funQ("If you suspect colic…", ["Get an adult / vet", "Leave them 3 days", "Feed a huge extra meal"], 0, "Now, not later."),
        funQ("Rolling and not eating can be a sign of…", ["Colic", "Winning a race", "Being a cat"], 0, "Get help."),
      ],
      ["Colic = tummy pain = adult now.", "You don’t treat it yourself."],
      funQ("Treat colic with sweets?", ["No", "Yes"], 0, "Vet / adult.")
    ),
    riding: funMod(
      "Walk, trot, canter",
      "Three main gaits. Rising trot saves your back.",
      [
        "Walk: four beats. Trot: two beats. Canter: three beats.",
        "Rising trot: you rise and sit with the two-beat trot so it doesn’t bounce you.",
        "Canter is faster than trot. You learn it when walk and trot are steady.",
      ],
      ["Count walk: 1-2-3-4.", "Trot: 1-2, 1-2.", "Canter: 1-2-3."],
      [
        funQ("Walk has how many beats?", ["4", "1", "10"], 0, "Four-beat gait."),
        funQ("Trot is…", ["Two beats", "Silent", "Only for cars"], 0, "1-2, 1-2."),
        funQ("Rising trot helps you…", ["Not bounce so much", "Fall off on purpose", "Skip the hat"], 0, "Rise and sit with the beat."),
      ],
      ["Walk 4, trot 2, canter 3.", "Rise in trot."],
      funTyped("How many beats in canter?", "3", "Three-beat gait.")
    ),
    history: funMod(
      "Knights and coaches",
      "War horses, armour, and mail on the road.",
      [
        "Medieval knights rode war horses (often called chargers or destriers in stories).",
        "Mail coaches carried letters and people before trains were everywhere.",
        "When engines arrived, many working horses lost those jobs — some still work today.",
      ],
      ["A knight needed a strong horse.", "A coach needed a team.", "Then steam and petrol took a lot of that work."],
      [
        funQ("Knights often rode…", ["War horses", "Bicycles in armour", "Skateboards"], 0, "Horse and rider as a pair."),
        funQ("Mail coaches carried…", ["Letters and people", "Only clouds", "Wi-Fi routers"], 0, "Before trains ruled."),
        funQ("Engines meant many horse jobs…", ["Changed or ended", "Grew forever with no change", "Moved to space"], 0, "Technology shifted work."),
      ],
      ["Knights. Coaches. Then engines."],
      funQ("Trains replaced some horse travel?", ["Yes", "Never"], 0, "They did.")
    ),
  },
  4: {
    care: funMod(
      "Laminitis — sore feet",
      "Too much rich grass can make feet burn. It’s serious.",
      [
        "Laminitis is inflammation in the hoof. It hurts. Horses may rock back off their toes.",
        "Lush spring grass and too much rich food raise the risk, especially for ponies.",
        "If a horse is foot-sore, don’t force a ride. Tell an adult / vet.",
      ],
      ["Pony on rich spring grass, reluctant to walk.", "Could be laminitis.", "Stop extra food, call the adult in charge."],
      [
        funQ("Laminitis is…", ["Painful inflammation in the hoof", "A riding hat", "A fast canter"], 0, "Sore feet, serious."),
        funQ("Rich spring grass can…", ["Raise laminitis risk", "Cure all illness", "Turn horses blue"], 0, "Especially ponies."),
        funQ("Foot-sore horse…", ["Don’t force a ride — tell an adult", "Gallop it off", "Ignore it"], 0, "Rest and help."),
      ],
      ["Laminitis = sore hoof.", "Rich grass = risk.", "No forced work."],
      funQ("Spring pony suddenly foot-sore. First…", ["Tell an adult", "Enter a race"], 0, "Get help.")
    ),
    feeding: funMod(
      "Forage and hard feed",
      "Hay/grass is the base. Hard feed is extra energy if they need it.",
      [
        "Forage (hay, haylage, grass) should be the biggest part of most horses’ diets.",
        "Hard feed (mixes, cubes) adds energy for work — not every horse needs much.",
        "A salt lick lets them top up minerals. Fresh water always.",
      ],
      ["Easy-keeping pony at rest.", "Mostly forage, little or no hard feed.", "Fat ponies don’t need extra cups of mix."],
      [
        funQ("The base of the diet is usually…", ["Forage (hay/grass)", "Sweets", "Only hard feed"], 0, "Fibre first."),
        funQ("Hard feed is…", ["Extra energy if needed", "The only food allowed", "For cats"], 0, "Not always needed."),
        funQ("A salt lick…", ["Offers minerals they can choose", "Replaces all hay", "Is a toy only"], 0, "They lick what they need."),
      ],
      ["Forage first.", "Hard feed if the work needs it."],
      funQ("Fat resting pony needs buckets of mix?", ["Usually no", "Always yes"], 0, "Forage is enough for many.")
    ),
    riding: funMod(
      "Aids and a 20 m circle",
      "Leg, seat, rein. Ride a round circle, not a pentagon.",
      [
        "Aids are how you ask: legs, seat, reins, voice. Quiet aids are kinder and clearer.",
        "A 20 metre circle is a common school shape. Keep it round — same bend all the way.",
        "Inside leg at the girth helps the horse bend around it.",
      ],
      ["Ask for a 20 m circle at A.", "Inside leg, soft inside rein.", "Look round the circle, not at the ears."],
      [
        funQ("Aids are…", ["How you ask the horse", "A type of hay", "Only shouting"], 0, "Leg, seat, rein, voice."),
        funQ("A 20 m circle should be…", ["Round", "A sharp square", "A straight line"], 0, "Even bend."),
        funQ("Inside leg at the girth helps…", ["Bend", "The horse forget you", "The hat fall off"], 0, "They bend around that leg."),
      ],
      ["Quiet aids.", "Round circles."],
      funQ("Kick harder instead of a clear aid?", ["No — clearer is kinder", "Always"], 0, "Quality not volume.")
    ),
    history: funMod(
      "From war to sport",
      "Cavalry, then cars, then riding as sport and care.",
      [
        "Cavalry were soldiers on horses. Machines later took that battlefield job.",
        "Today most horses in Britain are for sport, leisure, police, or therapy — not war.",
        "We still owe them kind, skilled care. History is not just armour — it’s partnership.",
      ],
      ["Cavalry charged.", "Tanks and engines arrived.", "Horses moved into sport and everyday riding."],
      [
        funQ("Cavalry were…", ["Soldiers on horses", "A type of saddle soap", "Only circus clowns"], 0, "Mounted soldiers."),
        funQ("Today many UK horses are for…", ["Sport, leisure, police, therapy", "Medieval battles every Tuesday", "Space travel"], 0, "Different jobs now."),
        funQ("History of horses is also about…", ["Partnership and care", "Ignoring them", "Only engines"], 0, "We still owe them."),
      ],
      ["War → machines → sport/care."],
      funQ("Horses vanished when cars arrived?", ["No — jobs changed", "Yes, all gone"], 0, "They’re still here.")
    ),
  },
  5: {
    care: funMod(
      "Reading the horse",
      "Ears, eyes, tail. They’re talking even when they’re quiet.",
      [
        "Ears pinned back can mean anger or pain. Ears pricked forward: interested.",
        "A swishing tail can mean flies — or irritation. Look at the whole horse.",
        "Stable vices (weaving, crib-biting) can mean boredom or stress. More turnout and forage can help.",
      ],
      ["Ears flat, whites of eyes, tense.", "Give space, tell an adult.", "Don’t crowd a worried horse."],
      [
        funQ("Ears pinned back can mean…", ["Anger or pain", "Always happy", "They want a joke"], 0, "Read the rest of the body too."),
        funQ("Ears pricked forward often mean…", ["Interest", "Asleep standing", "They’ve turned into a rabbit"], 0, "Paying attention."),
        funQ("Weaving in the stable can be…", ["A stress / boredom behaviour", "A dressage move", "Required by the rules"], 0, "Needs a better day, not a shout."),
      ],
      ["Ears tell a story.", "Whole body, not one sign.", "Boredom can show as vices."],
      funQ("Crowd a pinned-ear horse?", ["No — give space", "Yes — hug harder"], 0, "Respect the warning.")
    ),
    feeding: funMod(
      "Condition — too fat, too thin",
      "You can see and feel ribs with a light touch. Guessing from the gate is not enough.",
      [
        "Condition scoring is a simple 0–5 (or 1–9) look-and-feel of fat cover.",
        "You should feel ribs easily but not see a full skeleton. Fat on the crest and rump matters too.",
        "Overweight ponies are at more laminitis risk. Underweight horses need a plan, not random snacks.",
      ],
      ["Run a hand along the ribs.", "Feel them easily, a light cover.", "That’s nearer ‘good’ than buried in fat."],
      [
        funQ("Condition scoring is…", ["Judging fat cover", "Counting gallops only", "A type of bit"], 0, "Look and feel."),
        funQ("Ribs should usually be…", ["Felt easily, not buried in fat", "Invisible under a duvet of fat always", "Sharp as a knife with no cover"], 0, "Middle is the aim."),
        funQ("Fat ponies have more risk of…", ["Laminitis", "Turning into unicorns", "Never needing water"], 0, "Weight and feet are linked."),
      ],
      ["Feel, don’t just glance.", "Fat and thin both need a plan."],
      funQ("More mix always = kinder?", ["No — some need less", "Yes always"], 0, "The right amount.")
    ),
    riding: funMod(
      "Diagonals and jumping intro",
      "In rising trot you rise with a pair of legs. Jumps start tiny.",
      [
        "In rising trot, sit when a particular hind leg is coming under — that’s your diagonal.",
        "On the right rein you usually sit as the left shoulder comes back (outside diagonal).",
        "Jumping starts with poles on the ground, then tiny cross-poles — not a huge oxer on day one.",
      ],
      ["Right rein.", "Glance at the outside shoulder.", "Sit as it comes back — that’s the usual diagonal."],
      [
        funQ("A diagonal in trot is…", ["Which pair you rise with", "A type of haynet", "The horse’s name"], 0, "Rise with a pair of legs."),
        funQ("Jumping should start with…", ["Poles / tiny fences", "A 1.60 m Grand Prix oxer", "No hat"], 0, "Build up."),
        funQ("Cross-poles are…", ["A beginner-friendly jump shape", "A type of colic", "Only for cars"], 0, "They help you to the middle."),
      ],
      ["Diagonal = the pair you sit to.", "Poles before big jumps."],
      funQ("First lesson: huge square oxer?", ["No", "Yes"], 0, "Start small.")
    ),
    history: funMod(
      "Breeds with a job",
      "Arabians, Thoroughbreds, native ponies — each was shaped by work.",
      [
        "Arabian horses are an ancient desert breed — hardy, with a distinctive head.",
        "The Thoroughbred was bred in Britain for speed; racing still uses them.",
        "Native ponies (Welsh, Dartmoor, Shetland…) coped with tough land and still make great kids’ rides when well trained.",
      ],
      ["Need speed on grass → Thoroughbred idea.", "Need hardy hill pony → native breed idea.", "Match the horse to the job."],
      [
        funQ("Thoroughbreds were bred for…", ["Speed", "Pulling canal boats only", "Being cats"], 0, "Racehorses."),
        funQ("Arabians are originally a…", ["Desert breed", "Fish", "Type of rug"], 0, "Hardy, old breed."),
        funQ("Native ponies often coped with…", ["Tough land", "Only palaces", "The deep ocean"], 0, "Hill and moor."),
      ],
      ["Breed follows job.", "TB speed, natives hardy."],
      funQ("Every breed is identical?", ["No", "Yes"], 0, "Jobs shaped them.")
    ),
  },
  6: {
    care: funMod(
      "When to call the vet",
      "You don’t diagnose. You notice, you fetch help, you keep them safe.",
      [
        "Call a vet (via the adult in charge) for: colic signs, laminitis, wounds that gape or bleed a lot, sudden lameness, not eating, fever.",
        "A yard first-aid kit: gloves, wound gel/saline, bandage, scissors, thermometer — adults use it.",
        "Your job: notice early, keep yourself safe, don’t give random medicine.",
      ],
      ["Deep cut, bleeding.", "Adult presses with a clean pad.", "Vet on the way — you don’t play doctor."],
      [
        funQ("Gaping wound or colic signs…", ["Get the adult / vet", "Wait a fortnight", "Ride it off"], 0, "Early help is kinder."),
        funQ("A first-aid kit is used by…", ["Trained / experienced adults", "Any passing stranger with no plan", "The horse itself"], 0, "You can fetch it, not freelance."),
        funQ("Give random human pills to a horse?", ["No", "Yes, always"], 0, "Never."),
      ],
      ["Notice. Tell. Don’t guess medicine.", "Vet for the serious stuff."],
      funQ("Your best first move in an emergency is…", ["Get the responsible adult", "Google a wild guess and inject"], 0, "People who know.")
    ),
    feeding: funMod(
      "Fibre, energy, protein",
      "The three big ideas — still in plain English.",
      [
        "Fibre (from forage) keeps the gut moving. It’s the foundation.",
        "Energy (calories) fuels work. Too much energy + too little work = fat and fizz.",
        "Protein helps build and repair muscle — extras are for horses in real work, not every pet pony.",
      ],
      ["Schoolmaster in light work.", "High fibre, modest energy.", "He stays rideable, not fizzy."],
      [
        funQ("Fibre mainly comes from…", ["Forage", "Sweets", "Metal"], 0, "Hay and grass."),
        funQ("Too much energy for the work can mean…", ["Fat and fizz", "Instant A* dressage", "No need for water"], 0, "Match feed to work."),
        funQ("Extra protein is most useful when…", ["The horse is in real work / growing", "They already have a huge crest of fat and do nothing", "They are a bicycle"], 0, "Work or growth."),
      ],
      ["Fibre = gut.", "Energy = fuel.", "Protein = repair, if needed."],
      funQ("Feed like a racehorse to a resting pet pony?", ["Usually a bad match", "Always kind"], 0, "Match the job.")
    ),
    riding: funMod(
      "Three riding sports",
      "Dressage, showjumping, cross-country — different questions, same horse care.",
      [
        "Dressage: training tests of balance, rhythm and obedience in an arena.",
        "Showjumping: coloured fences in an arena, against the clock if it’s a jump-off.",
        "Cross-country: solid-looking fences over hills and water — brave and judged on time/faults. Eventing combines all three.",
      ],
      ["Eventing horse: dressage Friday, cross-country Saturday, showjumping Sunday (typical story).", "Three tests, one partnership."],
      [
        funQ("Dressage tests…", ["Balance, rhythm, obedience", "Only speed", "Who shouts loudest"], 0, "Arena training test."),
        funQ("Showjumping is usually…", ["Coloured fences in an arena", "A 20-mile road race with no fences", "Underwater"], 0, "Knockdowns cost faults."),
        funQ("Eventing combines…", ["Dressage, cross-country, showjumping", "Only shopping", "Karting and chess"], 0, "Three phases."),
      ],
      ["Dressage = trained pattern.", "SJ = coloured fences.", "XC = solid, across country.", "Eventing = all three."],
      funQ("Cross-country fences are meant to knock down like showjumps?", ["No — they are solid-looking", "Yes, always flimsy"], 0, "Different question.")
    ),
    history: funMod(
      "Domestication to now",
      "People and horses teamed up thousands of years ago. The job list keeps changing.",
      [
        "Horses were domesticated thousands of years ago (on the steppe — think Central Asia).",
        "They changed war, farms, travel and post. Then engines took the heavy jobs.",
        "Now the test of a good horse person is care and skill, not whether we still plough with them.",
      ],
      ["Steppe people tamed horses.", "Empires used them.", "We inherited the care, not the chariot charges."],
      [
        funQ("Domestication means…", ["Living and working with people", "Horses turning into cars", "Only living in palaces"], 0, "A partnership, not wild only."),
        funQ("Horses were first tamed…", ["Thousands of years ago", "Last Tuesday", "After the internet"], 0, "Deep history."),
        funQ("The modern test is mostly…", ["Kind, skilled care", "Winning wars on horseback at the weekend", "Ignoring history"], 0, "Care is the job now."),
      ],
      ["Tamed long ago.", "Jobs changed.", "Care remains."],
      funQ("Engines ended all need for horse knowledge?", ["No", "Yes"], 0, "We still owe them skill.")
    ),
  },
};

/**
 * Money & investing — stages 2–6 (stage 1 is pocket-money First steps).
 * Same six ideas, a bit harder each level. Never recycle the piggy-bank set.
 */
const FUN_INVESTING_STAGES = {
  2: {
    compound: funMod(
      "The snowball starts",
      "Leave money in. A little growth can earn a little more.",
      [
        "If £10 grows by £1, you have £11.",
        "Next time, growth is on £11 — not just the first £10. That extra-on-the-extra is the snowball.",
        "Spending it stops the snowball.",
      ],
      ["Start with £10.", "It grows to £11.", "Next growth is on £11."],
      [
        funQ("A money snowball grows when you…", ["leave it in", "spend it all today", "hide it in a sandwich"], 0, "Leave it in."),
        funQ("£10 grows by £1. You now have…", ["£11", "£9", "£100"], 0, "10 + 1 = 11."),
        funQ("The next bit of growth sits on…", ["the new bigger pot", "nothing", "only the sweets"], 0, "Growth on growth."),
      ],
      ["Leave it in.", "New growth sits on the new total."],
      funQ("Spending the pot…", ["stops the snowball", "makes it bigger"], 0, "Gone money cannot grow.")
    ),
    twenty: funMod(
      "20% of a tenner",
      "Same rule, bigger pocket money.",
      [
        "20% still means 1 in every 5, or 20p in every £1.",
        "£10 → five lots of £2 → £2 in the pot.",
        "You still have £8 to use now.",
      ],
      ["You get £10.", "Split into five £2 piles.", "One pile (£2) goes in the pot."],
      [
        funTyped("20% of £10 is…", "2", "£10 ÷ 5 = £2."),
        funQ("After putting 20% of £10 aside, you have…", ["£8 to use", "£0", "£10 extra"], 0, "£10 − £2 = £8."),
        funQ("The 20% is for…", ["Future You", "the bin", "a joke"], 0, "Pay yourself first."),
      ],
      ["£10 → £2 in the pot.", "£8 left."],
      funTyped("20% of £5 is…", "1", "£5 ÷ 5 = £1.")
    ),
    metals: funMod(
      "Why people keep gold",
      "It lasts. It is hard to make more. Price can still wobble.",
      [
        "Gold does not go rusty. People have wanted it for thousands of years.",
        "You cannot print gold in a kitchen. That is why some people keep a little.",
        "The price can still go down some years. It is not magic.",
      ],
      ["Gold lasts.", "It is rare.", "The price can still wobble."],
      [
        funQ("People like gold because it…", ["lasts and is hard to make more of", "tastes of chocolate", "runs fast"], 0, "Rare and lasting."),
        funQ("Gold prices…", ["can go up or down", "only go up", "never move"], 0, "They wobble."),
        funQ("Keeping gold is one way to…", ["save for later", "buy lunch today automatically", "skip school"], 0, "A store for later — not a promise."),
      ],
      ["Lasts. Rare. Price still wobbles."],
      funQ("Is gold a metal?", ["Yes", "No"], 0, "Yes.")
    ),
    bitcoin: funMod(
      "Up and down",
      "Internet money can jump. It can crash. Both have happened.",
      [
        "Bitcoin is still internet money — not a 20p in your pocket.",
        "Some years the price shot up. Some years it fell hard.",
        "Never use money you need for lunch, shoes or this week.",
      ],
      ["It can jump.", "It can fall.", "Only spare money — never this week's."],
      [
        funQ("Bitcoin’s price can…", ["shoot up or crash", "only go up forever", "never move"], 0, "It is jumpy."),
        funQ("Should you use this week's lunch money?", ["No", "Yes, all of it"], 0, "Never money you need."),
        funQ("Past fast years…", ["are not a promise", "must happen again", "mean it is a sandwich"], 0, "The past is a picture, not a deal."),
      ],
      ["Jumpy.", "Spare money only."],
      funQ("Bitcoin lives…", ["on computers", "in a lunch box"], 0, "Digital.")
    ),
    etf: funMod(
      "The big basket",
      "One ticket, lots of companies inside.",
      [
        "An ETF is a grown-up bag: you buy one thing, lots of companies sit inside.",
        "The S&P 500 is a famous bag of 500 big US companies.",
        "If one company has a bad year, the others can still help.",
      ],
      ["One ticket.", "500 companies inside.", "One bad shop does not empty the bag."],
      [
        funQ("An ETF is a…", ["basket of many companies", "single sweet", "horse"], 0, "A bundle."),
        funQ("The S&P 500 is about…", ["500 big US companies", "500 footballers", "500 horses"], 0, "A famous US basket."),
        funQ("Many companies in one bag is usually…", ["steadier than one company", "always a loss", "illegal"], 0, "Spreading out. Still not a promise."),
      ],
      ["ETF = basket.", "S&P 500 = 500 companies."],
      funQ("S&P 500 is an example of an…", ["ETF / basket", "ice cream"], 0, "A company basket.")
    ),
    stocks: funMod(
      "One shop can close",
      "A share is a slice of one company. That company can fail.",
      [
        "A share = a tiny slice of one shop.",
        "If the shop does well, the slice can grow. If it closes, the slice can vanish.",
        "A bag of many shops is the calmer first step.",
      ],
      ["One toy shop.", "It might boom — or close.", "That is the risk of one slice."],
      [
        funQ("A share is a…", ["tiny slice of one company", "free prize", "sandwich"], 0, "One firm."),
        funQ("If that company fails you can…", ["lose that money", "never lose", "print more at home"], 0, "One bet can go to zero."),
        funQ("A calmer first step is often…", ["a bag of many companies", "one mystery shop", "spending the 20%"], 0, "Spread it out."),
      ],
      ["One shop can fail.", "A bag shares the risk."],
      funQ("True or false: one company can fail.", ["True", "False"], 0, "True.")
    ),
  },
  3: {
    compound: funMod(
      "Year after year",
      "The longer you leave it, the more the extra-on-the-extra can add up.",
      [
        "Time is the secret. Starting young means more years of snowball.",
        "Taking money out early stops those extra years.",
        "A calculator can show a picture of the past — it is not a promise.",
      ],
      ["Leave it.", "Years add extra-on-the-extra.", "Pictures of the past are not deals."],
      [
        funQ("The snowball works best when you…", ["leave it in for a long time", "take it out every week", "spend it the same day"], 0, "Time."),
        funQ("Starting young helps because you have…", ["more years", "fewer years", "no piggy bank"], 0, "More time."),
        funQ("A past picture in a calculator is…", ["not a promise", "a contract", "always the future"], 0, "Illustration only."),
      ],
      ["Time.", "Leave it in."],
      funQ("Taking it out early…", ["stops extra years of growth", "adds extra years"], 0, "Stops the snowball.")
    ),
    twenty: funMod(
      "Pay yourself first",
      "The 20% goes in the pot before sweets, games or apps.",
      [
        "Pay yourself first: 20% in the pot, then spend the rest.",
        "Birthday money and later a job use the same rule.",
        "80% is still a lot for now.",
      ],
      ["Money in.", "20% in the pot first.", "Then spend the 80%."],
      [
        funQ("Pay yourself first means…", ["pot first, then spend", "spend first, save nothing", "give it all away"], 0, "20% first."),
        funTyped("20% of £20 is…", "4", "£20 ÷ 5 = £4."),
        funQ("The 80% is…", ["still yours to use now", "thrown away", "illegal"], 0, "Most of the money is for now."),
      ],
      ["Pot first.", "Then spend."],
      funQ("Birthday money should…", ["follow the same 20% rule", "all be spent that hour"], 0, "Same rule.")
    ),
    metals: funMod(
      "Not a wage",
      "Gold does not pay you every week. You hope it keeps worth.",
      [
        "A job pays a wage. Gold just sits there.",
        "You hope it is still useful later. That is a store of value — not a payday.",
        "Some years it falls. Do not put the whole pot in gold.",
      ],
      ["No weekly wage.", "Hope it keeps worth.", "Only a slice of the pot."],
      [
        funQ("Gold pays you a weekly wage?", ["No", "Yes, every Friday"], 0, "It just sits there."),
        funQ("A store of value means you hope it…", ["keeps worth for later", "tastes nice", "runs fast"], 0, "For Future You."),
        funQ("Put the whole piggy bank into gold?", ["No — only a slice", "Yes, all of it"], 0, "Spread it."),
      ],
      ["Not a wage.", "Only a slice."],
      funQ("Some years gold can…", ["fall in price", "only rise"], 0, "It wobbles.")
    ),
    bitcoin: funMod(
      "Only so many",
      "There is a cap. That does not mean the price only goes up.",
      [
        "Only a set amount of Bitcoin can ever exist. Nobody can print extra forever.",
        "A cap can make people want it. Fear can still make the price drop.",
        "Exciting is not the same as safe.",
      ],
      ["Limited amount.", "Want + fear move the price.", "Not a piggy bank."],
      [
        funQ("Bitcoin has…", ["a limited amount", "unlimited printing forever", "a smell of bread"], 0, "A cap."),
        funQ("A cap means the price…", ["can still crash", "can only go up", "never moves"], 0, "Limited ≠ only-up."),
        funQ("Is Bitcoin as calm as a piggy bank?", ["No", "Yes"], 0, "It is jumpy."),
      ],
      ["Capped.", "Still jumpy."],
      funQ("Never use money you…", ["cannot lose", "saved for later in the 20% pot as a toy"], 0, "Spare only.")
    ),
    etf: funMod(
      "Own a little of many",
      "The basket idea, with the S&P 500 as the example.",
      [
        "Owning a little of many companies is the basket idea.",
        "The S&P 500 is 500 large US companies in one ETF.",
        "Some years the basket falls too. It is calmer than one shop — not a magic shield.",
      ],
      ["Many slices.", "One famous basket.", "Still can have down years."],
      [
        funQ("The S&P 500 lets you own…", ["a little of 500 companies", "one sweet", "a horse"], 0, "A bundle."),
        funQ("The basket can still…", ["have a down year", "never fall", "print money"], 0, "Calmer, not magic."),
        funQ("One company vs 500 is usually…", ["jumpy vs steadier", "always better as one", "the same"], 0, "Many is usually steadier."),
      ],
      ["500 slices.", "Still not a promise."],
      funQ("ETF means…", ["a basket you buy in one go", "a type of coin you chew"], 0, "Bundle.")
    ),
    stocks: funMod(
      "Spread it out",
      "One company you love can still have a bad year.",
      [
        "Picking one shop you understand is still a bet on that shop.",
        "Grown-ups sometimes hold a few companies — and a basket as the base.",
        "Never the money for this week's food.",
      ],
      ["One shop = one bet.", "Basket as the base.", "Never this week's food."],
      [
        funQ("Loving a shop means it cannot fail?", ["False", "True"], 0, "Love ≠ safety."),
        funQ("A calmer base is often…", ["the basket / ETF", "one mystery ticker", "cash under the bed only"], 0, "Many companies."),
        funQ("Food money for this week should be…", ["left out of bets", "put into one shop"], 0, "Never gamble the shopping."),
      ],
      ["One bet can fail.", "Basket first."],
      funQ("Spreading money is usually…", ["safer than one bet", "a way to print cash"], 0, "Diversify.")
    ),
  },
  4: {
    compound: funMod(
      "Time is the secret",
      "Years in the pot beat clever timing you cannot do yet.",
      [
        "Leaving money in for years usually beats taking it in and out.",
        "You cannot know the best day to jump in. Time in the pot matters more.",
        "The calculator’s past picture assumes you left it. Taking it out changes the story.",
      ],
      ["Leave it.", "Do not chase the perfect day.", "Past pictures assume you stayed in."],
      [
        funQ("Usually better:", ["leave it in for years", "jump in and out every week", "spend it"], 0, "Time in."),
        funQ("The perfect day to jump in is…", ["something you cannot know", "always Monday", "printed on the coin"], 0, "Nobody knows."),
        funQ("A calculator past picture assumes you…", ["left the money in", "spent it", "changed it every hour"], 0, "Stayed in."),
      ],
      ["Time in the pot.", "Not timing the pot."],
      funQ("In-and-out every week…", ["stops the snowball working well", "always wins"], 0, "Stay in.")
    ),
    twenty: funMod(
      "The 20% habit",
      "Same rule when pocket money grows — and later a job.",
      [
        "The rule does not change when the number gets bigger: 20% still in the pot.",
        "£50 → £10 in the pot, £40 for now.",
        "Habits beat one-off bursts.",
      ],
      ["Bigger money, same split.", "£50 → £10 aside.", "Every time, not once."],
      [
        funTyped("20% of £50 is…", "10", "£50 ÷ 5 = £10."),
        funQ("When you earn more, the 20% rule…", ["stays the same split", "stops", "becomes 100%"], 0, "Same habit."),
        funQ("Doing it every time is…", ["a habit", "a trick", "optional forever with no effect"], 0, "Habits build pots."),
      ],
      ["Same split.", "Every time."],
      funQ("£50 → pot first is…", ["£10", "£50", "£0"], 0, "20%.")
    ),
    metals: funMod(
      "Prices wobble",
      "Gold can have a bad year. It is a slice of a plan, not the whole plan.",
      [
        "Some years gold falls even if the world feels scary.",
        "It does not pay a wage, so you are waiting, not earning weekly.",
        "A little gold plus a basket plus cash you need this month is calmer than gold-only.",
      ],
      ["Wobbles.", "No wage.", "Only a slice."],
      [
        funQ("Gold can have a…", ["bad year", "perfect year every year", "taste of orange"], 0, "It falls sometimes."),
        funQ("Gold-only is…", ["risky as a whole plan", "the only grown-up plan", "required by school"], 0, "Slice, not all."),
        funQ("This month’s spending money should sit in…", ["cash you can use", "only gold bars"], 0, "Cash for now."),
      ],
      ["Wobble.", "Slice."],
      funQ("Does gold pay a weekly wage?", ["No", "Yes"], 0, "No.")
    ),
    bitcoin: funMod(
      "Never money you need",
      "If you cannot lose it, it does not belong in Bitcoin.",
      [
        "A crash can last a long time. You might need the money before it comes back — if it does.",
        "Spare long-term money only. Never rent, food, or shoes.",
        "FOMO (fear of missing out) is not a plan.",
      ],
      ["Crashes can last.", "Spare only.", "FOMO ≠ plan."],
      [
        funQ("Money for rent or food in Bitcoin?", ["No", "Yes, all of it"], 0, "Never."),
        funQ("FOMO means…", ["fear of missing out — not a plan", "a type of coin", "a safe wage"], 0, "Feelings are not a plan."),
        funQ("A crash might…", ["last a long time", "always bounce next morning", "turn into gold"], 0, "You may need the money first."),
      ],
      ["Spare long-term only.", "No FOMO."],
      funQ("If you cannot lose it…", ["do not put it in Bitcoin", "put it all in"], 0, "Spare only.")
    ),
    etf: funMod(
      "Index funds",
      "An index is a list. An index fund buys the list.",
      [
        "The S&P 500 is a list of 500. An index fund/ETF tries to own that list.",
        "You are not picking a hero shop. You own the street.",
        "Fees should be small. The idea is boring on purpose.",
      ],
      ["List of companies.", "Buy the list.", "Boring is the point."],
      [
        funQ("An index fund tries to own…", ["the list (like 500 companies)", "one mystery shop only", "a sandwich shop on the moon"], 0, "The list."),
        funQ("Owning the street means…", ["many companies, not a hero pick", "standing in the road", "one shop"], 0, "The basket."),
        funQ("Boring and low-fee is often…", ["the point", "a failure", "illegal"], 0, "Calm on purpose."),
      ],
      ["Own the list.", "Keep fees small."],
      funQ("S&P 500 is a…", ["list / index of companies", "type of horse"], 0, "An index.")
    ),
    stocks: funMod(
      "Do you understand the shop?",
      "If you cannot say what the company does, it is a guess.",
      [
        "A grown-up rule: only pick a company you can explain in one sentence.",
        "Even then, that one sentence can still fail. Size the bet small.",
        "The basket stays the base.",
      ],
      ["Explain it in one sentence.", "Still can fail.", "Keep the bet small."],
      [
        funQ("If you cannot explain the company, buying it is…", ["a guess", "always clever", "required"], 0, "Guessing."),
        funQ("Even a company you understand can…", ["fail", "never fail", "print your lunch"], 0, "Still a risk."),
        funQ("The base of a simple plan is often…", ["the basket", "one guess", "Bitcoin only"], 0, "ETF/index."),
      ],
      ["Understand it.", "Bet small.", "Basket base."],
      funQ("A one-sentence test is: can you say…", ["what the company does", "the CEO's favourite colour"], 0, "What it does.")
    ),
  },
  5: {
    compound: funMod(
      "The long game",
      "Years beat tips. Taking it out for a fad resets the clock.",
      [
        "A long game means years, not days.",
        "Every time you empty the pot for a fad, you restart the snowball.",
        "Past 10-year pictures look calmer than one wild month — still not a promise.",
      ],
      ["Years.", "Fads reset the clock.", "Long pictures look calmer."],
      [
        funQ("The long game is measured in…", ["years", "minutes", "one weekend"], 0, "Years."),
        funQ("Emptying the pot for a fad…", ["restarts the snowball", "helps it", "is required"], 0, "Resets time."),
        funQ("One wild month is…", ["not the whole story", "the only number that matters", "a wage"], 0, "Zoom out."),
      ],
      ["Stay in.", "Ignore fads."],
      funQ("Tips and fads vs years in the pot:", ["years usually win", "fads always win"], 0, "Time.")
    ),
    twenty: funMod(
      "Future You",
      "The 20% is a person: older you. Do not steal from them every week.",
      [
        "Future You is the person who gets the pot.",
        "Spending the 20% on every want is stealing from that person.",
        "When money goes up (a job), raise the pounds in the pot — keep 20%.",
      ],
      ["Future You owns the 20%.", "Do not nick it weekly.", "Same % when pay rises."],
      [
        funQ("The 20% belongs to…", ["Future You", "every advert", "the bin"], 0, "Later you."),
        funQ("Spending the 20% on every want is…", ["stealing from Future You", "clever", "required"], 0, "Protect it."),
        funQ("When pay rises, keep…", ["the same 20% split", "0%", "100% spending"], 0, "Same habit."),
      ],
      ["Protect Future You.", "Same %."],
      funTyped("20% of £100 is…", "20", "£100 ÷ 5 = £20.")
    ),
    metals: funMod(
      "A slice, not the whole pot",
      "Gold can be a small slice beside a basket and cash.",
      [
        "Think of three jars: cash for soon, basket for years, a little metal if you want.",
        "All-in gold is a bet that gold will do well. That bet can lose for years.",
        "Jewellery you wear is not the same as an investment plan.",
      ],
      ["Three jars.", "All-in is a bet.", "Wearing gold ≠ a plan."],
      [
        funQ("A simple set of jars is…", ["cash + basket + maybe a little metal", "gold only", "bitcoin only"], 0, "Mix."),
        funQ("All-in gold can…", ["lose for years", "never lose", "pay a weekly wage"], 0, "It is a bet."),
        funQ("A necklace you wear is…", ["not automatically an investing plan", "the S&P 500", "a wage"], 0, "Jewellery ≠ plan."),
      ],
      ["Slice.", "Not the whole pot."],
      funQ("Cash you need soon should be in…", ["cash you can use", "only gold"], 0, "Cash.")
    ),
    bitcoin: funMod(
      "FOMO is not a plan",
      "Buying because friends got rich last year is how people buy the top.",
      [
        "FOMO buys after a jump, when it feels easy. That is often the dangerous moment.",
        "A plan says how much (tiny), why (spare), and when you would not add more.",
        "No plan = a guess with feelings.",
      ],
      ["FOMO buys late.", "Write a tiny spare-only rule.", "Feelings are not a plan."],
      [
        funQ("Buying because friends got rich last year is…", ["FOMO, not a plan", "always wise", "required"], 0, "FOMO."),
        funQ("A plan should say…", ["how much, why, and when to stop adding", "just yeet it all", "nothing"], 0, "Rules."),
        funQ("The dangerous feeling is often…", ["it feels easy after a jump", "boredom with a basket", "saving 20%"], 0, "After the jump."),
      ],
      ["No FOMO.", "Tiny spare-only rules."],
      funQ("No written rule means…", ["a guess with feelings", "a perfect system"], 0, "Guess.")
    ),
    etf: funMod(
      "Stay in the basket",
      "Selling the basket after a scary year locks in the scare.",
      [
        "Scary years happen. Selling then turns a paper drop into a real one.",
        "Staying in is how long pictures were made — if you had sold, you would not have that picture.",
        "Rebalancing later is a grown-up extra. First skill: do not panic-sell.",
      ],
      ["Scary years happen.", "Selling locks it in.", "Stay in."],
      [
        funQ("Selling after a scary year often…", ["locks in the drop", "always wins", "prints cash"], 0, "Panic-sell."),
        funQ("Long pictures of the S&P 500 assume you…", ["stayed in", "sold every dip", "spent it"], 0, "Stayed."),
        funQ("First skill in a scary year:", ["do not panic-sell", "sell everything at 3am", "buy a horse"], 0, "Stay."),
      ],
      ["Do not panic-sell.", "Stay in the basket."],
      funQ("Paper drop vs sold drop:", ["sold makes it real", "they are the same if you stay in"], 0, "Selling makes it real.")
    ),
    stocks: funMod(
      "One bet is a gamble",
      "Size it so a zero does not wreck Future You.",
      [
        "If one share going to zero would wreck you, the bet is too big.",
        "A tiny slice you could shrug at is the only size that belongs next to a basket.",
        "Tips from the internet are adverts in disguise more often than homework.",
      ],
      ["Zero should not wreck you.", "Tiny or none.", "Internet tips ≠ homework."],
      [
        funQ("If a zero would wreck you, the bet is…", ["too big", "perfect", "required"], 0, "Too big."),
        funQ("Beside a basket, one company should be…", ["tiny or none", "the whole pot", "this week's food"], 0, "Tiny."),
        funQ("Random internet tips are often…", ["adverts, not homework", "always research", "wages"], 0, "Be sceptical."),
      ],
      ["Size it to shrug.", "Basket first."],
      funQ("A gamble that can go to zero should be…", ["small enough to shrug", "your whole 20%"], 0, "Small.")
    ),
  },
  6: {
    compound: funMod(
      "Leaving it beats timing it",
      "A* money sense: you will not pick every top and bottom. Stay invested.",
      [
        "Timing the market (jumping in and out) is a skill almost nobody has.",
        "Time in the market — years of staying in — is the snowball you can actually do.",
        "The 20% habit + a boring basket + years is the simple A* plan. Everything else is extra.",
      ],
      ["Do not time it.", "Stay in.", "Habit + basket + years."],
      [
        funQ("Timing every top and bottom is…", ["something almost nobody can do", "easy homework", "required"], 0, "Don't try."),
        funQ("Time in the market means…", ["years of staying in", "one lucky afternoon", "selling every Monday"], 0, "Stay."),
        funQ("The simple A* plan is…", ["20% + basket + years", "FOMO + one shop + fads", "gold only"], 0, "Habit, basket, time."),
      ],
      ["Stay invested.", "Simple plan."],
      funQ("Jumping in and out usually…", ["hurts the snowball", "guarantees extra"], 0, "Hurts.")
    ),
    twenty: funMod(
      "Keep the rule when you earn more",
      "The % stays. The pounds get bigger. That is how pots get serious.",
      [
        "A job of £200 a week: 20% is £40 a week in the pot. Same rule, bigger pounds.",
        "Lifestyle creep is spending every raise. The 20% is how you refuse that.",
        "Future You with a habit beats Future You who waited until they felt rich.",
      ],
      ["Same %.", "Bigger pounds.", "Do not spend every raise."],
      [
        funTyped("20% of £200 is…", "40", "£200 ÷ 5 = £40."),
        funQ("Lifestyle creep means…", ["spending every raise", "saving more", "the 20% rule"], 0, "Spending the raise."),
        funQ("Waiting until you feel rich to save…", ["usually never starts", "is the A* plan", "beats a habit"], 0, "Start the habit now."),
      ],
      ["Same %.", "Refuse creep."],
      funQ("When pay rises, the 20%…", ["stays 20%, so pounds rise", "must stop"], 0, "Pounds rise.")
    ),
    metals: funMod(
      "Insurance, not a lottery",
      "A little metal can be a rainy-day slice. A lottery is all-in.",
      [
        "Insurance thinking: a small slice in case other things wobble.",
        "Lottery thinking: all-in because last year looked pretty.",
        "A* is insurance thinking. Lottery thinking is a bet.",
      ],
      ["Small slice = insurance idea.", "All-in = lottery.", "Pick insurance."],
      [
        funQ("A small metal slice is closer to…", ["insurance thinking", "a lottery ticket", "a wage"], 0, "Insurance."),
        funQ("All-in because last year looked pretty is…", ["lottery thinking", "the A* plan", "required"], 0, "A bet."),
        funQ("A* metals sense is…", ["a small slice, not the pot", "100% gold", "0% thinking"], 0, "Slice."),
      ],
      ["Insurance, not lottery."],
      funQ("Last year's pretty chart is…", ["not a promise", "a contract"], 0, "Not a promise.")
    ),
    bitcoin: funMod(
      "Speculation vs saving",
      "Saving is the piggy bank and the basket. Speculation is a tiny maybe.",
      [
        "Saving: 20% + boring basket + years. That is the job.",
        "Speculation: a tiny extra you could lose and still sleep.",
        "If Bitcoin is the whole plan, it is not saving. It is a bet.",
      ],
      ["Saving = habit + basket.", "Speculation = tiny maybe.", "Whole plan in Bitcoin = a bet."],
      [
        funQ("Saving is mostly…", ["20% + basket + years", "Bitcoin only", "one shop"], 0, "The job."),
        funQ("Speculation should be…", ["tiny enough to lose and sleep", "the rent", "100%"], 0, "Tiny."),
        funQ("Bitcoin as the whole plan is…", ["a bet, not saving", "the 20% rule", "an ETF"], 0, "A bet."),
      ],
      ["Saving first.", "Tiny maybe last."],
      funQ("Sleep test: if a crash would ruin sleep, it is…", ["too big", "perfect"], 0, "Too big.")
    ),
    etf: funMod(
      "Own the whole street",
      "A* basket: you do not need a hero pick. Own the list and keep adding the 20%.",
      [
        "Owning the street (the index) is how you skip hero-picking.",
        "Keep buying the basket with the 20%. That is the snowball plus spreading out.",
        "Hero picks can wait until the boring plan is on rails — if ever.",
      ],
      ["Own the list.", "Add 20% to it.", "Heroes are extra."],
      [
        funQ("Owning the whole street means…", ["the index / basket", "one hero shop", "gold only"], 0, "The list."),
        funQ("The 20% should mostly go into…", ["the boring basket, over years", "every fad", "lunch"], 0, "Basket + time."),
        funQ("Hero picks are…", ["extra, if ever", "the first step", "required at Year 5"], 0, "Extra."),
      ],
      ["Index + 20% + years."],
      funQ("Skip hero-picking by…", ["owning the list", "guessing daily"], 0, "Index.")
    ),
    stocks: funMod(
      "Never money for this week's food",
      "The last A* rule: size, understand, and never the shopping.",
      [
        "Three gates: Can I explain it? Can I shrug if it hits zero? Is this week's food safe?",
        "If any gate is ‘no’, skip the single stock.",
        "The basket plus 20% plus years does the heavy lifting. One shop is optional spice.",
      ],
      ["Three gates.", "Any ‘no’ → skip.", "Spice, not the meal."],
      [
        funQ("This week's food money in one stock?", ["No", "Yes"], 0, "Never."),
        funQ("If you cannot shrug at a zero…", ["skip it", "double it", "use the rent"], 0, "Skip."),
        funQ("One shop compared to the plan is…", ["optional spice", "the meal", "the 20% rule itself"], 0, "Spice."),
      ],
      ["Gates.", "Skip if no.", "Spice only."],
      funQ("The heavy lifting is…", ["20% + basket + years", "one internet tip"], 0, "The simple plan.")
    ),
  },
};

function funInstallStages() {
  const packs = [
    [2, typeof TEACH_MODULES_STAGE2 !== "undefined" ? TEACH_MODULES_STAGE2 : null],
    [3, typeof TEACH_MODULES_STAGE3 !== "undefined" ? TEACH_MODULES_STAGE3 : null],
    [4, typeof TEACH_MODULES_STAGE4 !== "undefined" ? TEACH_MODULES_STAGE4 : null],
    [5, typeof TEACH_MODULES_STAGE5 !== "undefined" ? TEACH_MODULES_STAGE5 : null],
    [6, typeof TEACH_MODULES_STAGE6 !== "undefined" ? TEACH_MODULES_STAGE6 : null],
  ];
  for (const [stage, bank] of packs) {
    if (!bank) continue;
    bank.karting = FUN_KARTING_STAGES[stage];
    bank.horses = FUN_HORSES_STAGES[stage];
    if (typeof FUN_INVESTING_STAGES !== "undefined" && FUN_INVESTING_STAGES[stage]) {
      bank.investing = FUN_INVESTING_STAGES[stage];
    }
  }
}

funInstallStages();
