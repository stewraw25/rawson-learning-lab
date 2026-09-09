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
  }
}

funInstallStages();
