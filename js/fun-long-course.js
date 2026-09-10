/**
 * Longer First steps + extra skills for go-karting, money and horses.
 * Stage 1 = beginner course (not “done” after a handful of questions).
 * Stages 2–6 keep getting harder. Same skill ids, new lessons each level.
 */
(function funLongCourse() {
  if (typeof funMod !== "function" || typeof TEACH_MODULES === "undefined") return;

  function qRow(row) {
    if (!row) return funQ("OK?", ["Yes", "No"], 0, "Yes.");
    if (row.t === "typed") return funTyped(row.q, row.a, row.e);
    return funQ(row.q, row.o, row.a, row.e);
  }

  function specToMod(spec) {
    const qs = (spec.qs || []).map(qRow);
    const sq = spec.sq ? qRow(spec.sq) : qs[0];
    return funMod(
      spec.title,
      spec.blurb,
      spec.points,
      spec.steps,
      qs,
      spec.help || (spec.points || []).slice(0, 2),
      sq
    );
  }

  function installLadder(subject, ladder) {
    if (!TEACH_MODULES[subject]) TEACH_MODULES[subject] = {};
    const banks = {
      karting: typeof FUN_KARTING_STAGES !== "undefined" ? FUN_KARTING_STAGES : null,
      horses: typeof FUN_HORSES_STAGES !== "undefined" ? FUN_HORSES_STAGES : null,
      investing: typeof FUN_INVESTING_STAGES !== "undefined" ? FUN_INVESTING_STAGES : null,
    };
    const later = banks[subject];
    for (const skillId of Object.keys(ladder)) {
      const byStage = ladder[skillId];
      if (byStage[1]) TEACH_MODULES[subject][skillId] = specToMod(byStage[1]);
      if (!later) continue;
      for (let s = 2; s <= 6; s++) {
        if (!byStage[s]) continue;
        if (!later[s]) later[s] = {};
        later[s][skillId] = specToMod(byStage[s]);
      }
    }
  }

  const kartExtra = {
    kit: {
      1: {
        title: "Your kit",
        blurb: "Helmet on before you sit down. Kit is not a costume — it is safety.",
        points: [
          "Helmet on and done up before you sit in the kart.",
          "Closed shoes that cover your toes. No flip-flops.",
          "Long hair tied back so it cannot catch.",
        ],
        steps: ["Walk to the kart.", "Helmet on, strap done.", "Then you may sit and wait."],
        qs: [
          { q: "Helmet goes on…", o: ["before you sit in the kart", "after you crash", "never"], a: 0, e: "Kit first." },
          { q: "Flip-flops on track are…", o: ["not OK", "perfect", "required"], a: 0, e: "Covered toes." },
          { q: "Long hair should be…", o: ["tied back", "loose in the wheels", "cut off every lap"], a: 0, e: "Tied back." },
        ],
        sq: { q: "Sit down with no helmet?", o: ["No", "Yes"], a: 0, e: "Helmet first." },
      },
      2: {
        title: "Visor and gloves",
        blurb: "Visor down. Gloves help you hold the wheel.",
        points: [
          "The visor is the clear bit on the helmet. Down on track.",
          "Gloves stop your hands slipping on the wheel.",
          "If the visor is scratched or fogged, tell a marshal — you need to see.",
        ],
        steps: ["Helmet on.", "Visor down.", "Gloves on if you have them."],
        qs: [
          { q: "On track the visor should be…", o: ["down", "in your pocket", "off"], a: 0, e: "Eyes protected." },
          { q: "Gloves help you…", o: ["hold the wheel", "go faster by magic", "skip the helmet"], a: 0, e: "Grip." },
          { q: "A fogged visor means…", o: ["you cannot see well — tell someone", "you are faster", "you won"], a: 0, e: "You must see." },
        ],
        sq: { q: "Drive with visor up?", o: ["No — down", "Yes"], a: 0, e: "Visor down." },
      },
      3: {
        title: "Boots and a snug suit",
        blurb: "Kit that fits is safer than kit that flaps.",
        points: [
          "A race suit (or the hire overalls) should not flap in the chain.",
          "Boots or trainers that stay on. Nothing that can slip off the pedal.",
          "If it is too big, ask for another size. Pride is not worth a catch.",
        ],
        steps: ["Try the suit.", "Move your arms.", "If it flaps on the chain line, swap it."],
        qs: [
          { q: "Flappy kit near the chain is…", o: ["dangerous", "stylish and required", "faster"], a: 0, e: "It can catch." },
          { q: "Shoes should…", o: ["stay on the pedal", "fall off for fun", "be roller skates"], a: 0, e: "Planted feet." },
          { q: "Too-big kit? You should…", o: ["ask for a better size", "ignore it", "cut it with scissors on the grid"], a: 0, e: "Ask." },
        ],
        sq: { q: "Wear anything that can catch in the chain?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      4: {
        title: "Ribs, neck and a good strap",
        blurb: "Extra kit exists because karts are low and bumps hurt.",
        points: [
          "Some racers wear a rib protector. Hire sessions may not need one — still sit well back.",
          "A helmet strap that is loose is almost as bad as no helmet.",
          "Neck braces exist in some series. If you are given one, wear it.",
        ],
        steps: ["Check the strap is snug.", "Sit back in the seat.", "Ask if extra kit is needed today."],
        qs: [
          { q: "A loose helmet strap is…", o: ["almost as bad as no helmet", "fine", "faster"], a: 0, e: "Do it up." },
          { q: "Sit…", o: ["well back in the seat", "on the front bumper", "on a friend's lap"], a: 0, e: "In the seat." },
          { q: "If you are given a neck brace…", o: ["wear it", "throw it", "wear it as a belt"], a: 0, e: "Wear it." },
        ],
        sq: { q: "Leave the strap flapping?", o: ["No", "Yes"], a: 0, e: "Snug." },
      },
      5: {
        title: "Kit check every session",
        blurb: "Pros check kit every time. So should you.",
        points: [
          "Before you roll: visor, strap, shoes, suit zip, hair.",
          "After a bump: check again. A strap can loosen.",
          "Never borrow a cracked helmet. Tell an adult.",
        ],
        steps: ["Zip.", "Strap.", "Visor.", "Then start."],
        qs: [
          { q: "Check kit…", o: ["every session", "once in your life", "never"], a: 0, e: "Every time." },
          { q: "A cracked helmet is…", o: ["not for track", "fine if you paint it", "faster"], a: 0, e: "Replace it." },
          { q: "After a bump, check…", o: ["strap and kit again", "nothing", "only the ice cream"], a: 0, e: "Check again." },
        ],
        sq: { q: "Use a cracked helmet?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      6: {
        title: "Your pre-grid ritual",
        blurb: "Same check, every time — that's race craft in the paddock.",
        points: [
          "A short list in your head: strap, visor, shoes, zip, gloves.",
          "If anything feels wrong, you say so. Heroes still speak up.",
          "The fastest people look after the boring kit jobs.",
        ],
        steps: ["List in your head.", "Touch each item.", "Thumbs up to the marshal."],
        qs: [
          { q: "A kit ritual is…", o: ["the same check every time", "skipping kit when you are late", "optional for winners"], a: 0, e: "Repeat it." },
          { q: "If kit feels wrong you…", o: ["say so", "hide it", "drive anyway at 100%"], a: 0, e: "Speak up." },
          { q: "Boring kit checks are…", o: ["part of going fast safely", "only for slow people", "banned"], a: 0, e: "Pros do them." },
        ],
        sq: { q: "Skip kit because you are late?", o: ["No", "Yes"], a: 0, e: "Never." },
      },
    },
    pedals: {
      1: {
        title: "Go and stop",
        blurb: "Two pedals. Right is go. Left is brake. Gentle feet.",
        points: [
          "Most hire karts: right pedal makes you go, left pedal is the brake.",
          "Squeeze, don't stamp. Stamping makes the kart jump or skid.",
          "If you need to stop, take your foot off go and press the brake.",
        ],
        steps: ["Find the two pedals.", "Right = go, left = brake.", "Squeeze a little go to roll."],
        qs: [
          { q: "How many pedals on a typical hire kart?", t: "typed", a: "2", e: "Go and brake." },
          { q: "The brake pedal…", o: ["slows you down", "plays a song", "turns on headlights"], a: 0, e: "Brake = slower." },
          { q: "On the pedals, be…", o: ["gentle", "as stampy as you can", "asleep"], a: 0, e: "Squeeze." },
        ],
        sq: { q: "Stamp as hard as you can?", o: ["No — squeeze", "Yes"], a: 0, e: "Gentle." },
      },
      2: {
        title: "One pedal at a time",
        blurb: "Don't press go and brake together on a hire kart.",
        points: [
          "Go OR brake. Not both at once on a simple hire kart.",
          "Coming off the go pedal already slows you a bit.",
          "Then add brake if you still need to slow.",
        ],
        steps: ["Lift off go.", "Then brake.", "Then turn."],
        qs: [
          { q: "Go and brake together on a hire kart?", o: ["Usually no", "Always yes", "Only in the car park"], a: 0, e: "One at a time." },
          { q: "Lifting off the go pedal…", o: ["slows you a bit", "makes you fly", "turns the kart off"], a: 0, e: "Engine braking / less push." },
          { q: "Brake when you still need to…", o: ["slow more", "go faster", "wave"], a: 0, e: "Slow more." },
        ],
        sq: { q: "Both pedals mashed?", o: ["No", "Yes"], a: 0, e: "One at a time." },
      },
      3: {
        title: "Smooth is fast",
        blurb: "The kart likes smooth feet more than hero stamps.",
        points: [
          "A smooth roll onto the go pedal keeps the rear tyres happy.",
          "A smooth squeeze on the brake keeps the kart straight.",
          "Jumpy feet make the kart snake. That is slower and scarier.",
        ],
        steps: ["Straight: squeeze brake.", "Kart settles.", "Then steer."],
        qs: [
          { q: "Smooth feet are usually…", o: ["faster and safer", "always slower", "banned"], a: 0, e: "Smooth is fast." },
          { q: "Jumpy feet can make the kart…", o: ["snake", "invisible", "quieter forever"], a: 0, e: "It wriggles." },
          { q: "Brake while the kart is…", o: ["straight first", "already fully sideways", "in the air"], a: 0, e: "Straight." },
        ],
        sq: { q: "Stamp in a panic every corner?", o: ["No", "Yes"], a: 0, e: "Plan the brake." },
      },
      4: {
        title: "Brake, then turn",
        blurb: "Most of the slowing happens before the corner.",
        points: [
          "Do most of the braking while you still see a straight bit of track.",
          "Then ease off the brake as you turn (a simple idea of trail braking).",
          "Pick up the go pedal after the tightest bit of the corner.",
        ],
        steps: ["Straight: brake.", "Turn in: ease off.", "After the inside: squeeze go."],
        qs: [
          { q: "Most braking is…", o: ["before the corner", "in the gravel", "after the finish"], a: 0, e: "In a straight line first." },
          { q: "Pick up the go pedal…", o: ["after the tightest bit", "in the middle of a full lock panic", "never"], a: 0, e: "After the apex idea." },
          { q: "Ease off the brake as you…", o: ["turn", "sit in the pits", "eat"], a: 0, e: "Blend it." },
        ],
        sq: { q: "Brake hardest in the middle of a turn?", o: ["Risky", "Always perfect"], a: 0, e: "Straight first." },
      },
      5: {
        title: "Where you brake is a skill",
        blurb: "Pick a mark — a cone, a board — and use it every lap.",
        points: [
          "A brake mark is a spot you choose: “I brake at this cone.”",
          "If you keep missing the corner, brake a bit earlier next lap.",
          "If you crawl to the corner, you can try a tiny bit later — carefully.",
        ],
        steps: ["Pick a cone.", "Brake there.", "If you run wide, earlier next time."],
        qs: [
          { q: "A brake mark is…", o: ["a spot you choose to brake", "a type of sandwich", "the chequered flag"], a: 0, e: "A reference." },
          { q: "Running wide often means…", o: ["brake a bit earlier", "close your eyes", "more stamp"], a: 0, e: "Earlier." },
          { q: "Change the mark…", o: ["a little at a time", "by 200 metres every lap", "never look"], a: 0, e: "Tiny changes." },
        ],
        sq: { q: "Guess a new brake point every corner?", o: ["No — use a mark", "Yes"], a: 0, e: "Repeat the mark." },
      },
      6: {
        title: "Pedals like a racer",
        blurb: "Same marks, same feet, lap after lap.",
        points: [
          "Consistency on the pedals beats one magic lap and three mistakes.",
          "If the kart is sliding, you were probably greedy on go or late on brake.",
          "Listen to the engine and feel the seat — they tell you before the wall does.",
        ],
        steps: ["Hit the mark.", "Smooth go.", "Repeat."],
        qs: [
          { q: "Consistent pedals beat…", o: ["one hero lap plus mistakes", "no practice", "no helmet"], a: 0, e: "Repeat the good lap." },
          { q: "Sliding often means…", o: ["too greedy on go or late on brake", "you need more ice cream", "the flag is wrong"], a: 0, e: "Ease it." },
          { q: "Feel the kart…", o: ["in the seat", "only on your phone", "never"], a: 0, e: "The seat talks." },
        ],
        sq: { q: "Ignore slides and add more go?", o: ["No", "Yes"], a: 0, e: "Listen to the kart." },
      },
    },
    marshal: {
      1: {
        title: "Marshals",
        blurb: "People in bright kit at the side. They keep you safe. Listen.",
        points: [
          "Marshals stand at the side of the track in bright kit.",
          "They wave flags and tell you when to go, slow or stop.",
          "If a marshal says stop or wait, you do it — even if you feel fast.",
        ],
        steps: ["See the bright kit.", "That person is in charge of that bit of track.", "Listen."],
        qs: [
          { q: "Marshals…", o: ["help keep the track safe", "only sell snacks", "drive your kart for you"], a: 0, e: "Safety team." },
          { q: "If a marshal says wait, you…", o: ["wait", "go anyway", "argue at full speed"], a: 0, e: "You wait." },
          { q: "Marshals often hold…", o: ["flags", "umbrellas only", "the steering wheel"], a: 0, e: "Flags." },
        ],
        sq: { q: "Ignore a marshal?", o: ["No", "Yes"], a: 0, e: "Listen." },
      },
      2: {
        title: "Where marshals stand",
        blurb: "They stand in a safe pocket — you don't aim at them.",
        points: [
          "Marshals stand behind barriers or in a safe gap, not in the racing line.",
          "If you spin, don't point the kart at a marshal post.",
          "A thumbs-up to a marshal after a spin means “I'm OK.”",
        ],
        steps: ["Spin.", "Stay in the kart if you can.", "Thumbs up if you are OK."],
        qs: [
          { q: "After a spin, a thumbs-up means…", o: ["I'm OK", "go faster", "I quit school"], a: 0, e: "I'm OK." },
          { q: "Aim at a marshal post?", o: ["No", "Yes, always"], a: 0, e: "Never." },
          { q: "Marshals stand…", o: ["in a safer pocket, not the racing line", "in the middle of the straight for fun", "on your kart"], a: 0, e: "Safe pocket." },
        ],
        sq: { q: "Drive at marshals?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      3: {
        title: "If you stop on track",
        blurb: "Helmet on. Stay put if you can. Wait.",
        points: [
          "If you stop, keep the helmet on.",
          "Stay in the kart unless a marshal or fire tells you to get out.",
          "Don't wander across a live track to fetch a cone.",
        ],
        steps: ["Stopped.", "Helmet on.", "Wait for a marshal."],
        qs: [
          { q: "If you stop, keep…", o: ["your helmet on", "running across the track", "the visor in the pits"], a: 0, e: "Helmet stays." },
          { q: "Walk into a live track for a cone?", o: ["No", "Yes"], a: 0, e: "Marshals do that." },
          { q: "Get out only if…", o: ["a marshal or danger says so", "you feel like a stroll", "the race is exciting"], a: 0, e: "Wait unless danger." },
        ],
        sq: { q: "Wander on a live track?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      4: {
        title: "Signals",
        blurb: "Hands, flags, boards — they are talking to you.",
        points: [
          "A raised hand from a marshal can mean wait.",
          "A waved flag is louder than a still flag.",
          "If you are not sure, slow down and look again — don't guess 'go'.",
        ],
        steps: ["See a signal.", "If unsure, slow.", "Look at the marshal."],
        qs: [
          { q: "If you are not sure what a signal means…", o: ["slow and look", "floor it", "close your eyes"], a: 0, e: "Slow." },
          { q: "A waved flag is usually…", o: ["more urgent", "a picnic", "nothing"], a: 0, e: "Pay attention." },
          { q: "Guess 'go' when unsure?", o: ["No", "Yes"], a: 0, e: "Don't guess go." },
        ],
        sq: { q: "Unsure + full speed?", o: ["No", "Yes"], a: 0, e: "Slow." },
      },
      5: {
        title: "Incidents",
        blurb: "Marshals move karts. You don't become a walking cone.",
        points: [
          "If karts tangle, stay put, visor down, wait.",
          "Marshals will push or stop the session.",
          "Your job is to be still and safe, not to referee.",
        ],
        steps: ["Contact.", "Stay in, helmet on.", "Let marshals work."],
        qs: [
          { q: "After a tangle, first…", o: ["stay put, helmet on", "run about", "take the helmet off at once"], a: 0, e: "Stay safe." },
          { q: "Who moves a stuck kart?", o: ["Marshals", "You wandering in the racing line", "The audience"], a: 0, e: "Marshals." },
          { q: "You are the referee?", o: ["No", "Yes"], a: 0, e: "Stewards later. You stay safe." },
        ],
        sq: { q: "Referee the crash on a live track?", o: ["No", "Yes"], a: 0, e: "Stay put." },
      },
      6: {
        title: "Respect the people who keep you racing",
        blurb: "No marshals, no session. Thank them.",
        points: [
          "Without marshals the track does not run.",
          "Be polite in the pits. They remember the kind kids.",
          "A wave after a flag is good manners — not a joke.",
        ],
        steps: ["Session ends.", "Thank a marshal if you can.", "That's race craft too."],
        qs: [
          { q: "No marshals means…", o: ["no safe session", "faster racing", "free ice cream"], a: 0, e: "They make it possible." },
          { q: "Polite in the pits is…", o: ["part of racing", "banned", "only for parents"], a: 0, e: "Manners." },
          { q: "A thank-you is…", o: ["good manners", "a penalty", "a yellow flag"], a: 0, e: "Do it." },
        ],
        sq: { q: "Rude to marshals because you are fast?", o: ["No", "Yes"], a: 0, e: "No." },
      },
    },
    flags: {
      1: {
        title: "Flags you will see",
        blurb: "Red = stop. Green = go. Chequered = finished.",
        points: [
          "Red flag: stop racing — something is wrong.",
          "Green flag: the track is clear. You may go.",
          "Chequered flag (black and white squares): the race or session is finished.",
        ],
        steps: ["Learn red, green, chequered.", "Red = stop.", "Chequered = done."],
        qs: [
          { q: "Red flag means…", o: ["stop", "go faster", "you won"], a: 0, e: "Stop." },
          { q: "Green often means…", o: ["track is clear", "stop now", "rain only"], a: 0, e: "Go / clear." },
          { q: "Chequered flag means…", o: ["finished", "start", "yellow caution"], a: 0, e: "Finished." },
        ],
        sq: { q: "Red flag = go faster?", o: ["No", "Yes"], a: 0, e: "Stop." },
      },
      2: {
        title: "Yellow means caution",
        blurb: "Slow down. No overtaking. Danger ahead.",
        points: [
          "Yellow flag: slow down, no overtaking.",
          "There may be a crashed kart or a marshal on that bit of track.",
          "Wait for green before you race again.",
        ],
        steps: ["See yellow.", "Lift off. Don't pass.", "Wait for green."],
        qs: [
          { q: "Yellow means…", o: ["slow — no overtaking", "go faster", "you won"], a: 0, e: "Caution." },
          { q: "Overtake under yellow?", o: ["No", "Yes"], a: 0, e: "No passing." },
          { q: "You may race again when you see…", o: ["green", "another yellow", "nothing"], a: 0, e: "Green." },
        ],
        sq: { q: "Pass people under yellow?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      3: {
        title: "Blue flag",
        blurb: "A faster kart is catching you. Don't block.",
        points: [
          "Blue flag: a faster kart is behind.",
          "Hold your line. Let them pass when it is safe — often on a straight.",
          "Blocking under blue is not clever. It is dangerous.",
        ],
        steps: ["Blue flag.", "Hold your line.", "Let them by on the straight if you can."],
        qs: [
          { q: "Blue flag means…", o: ["faster kart coming — don't block", "you won", "rain"], a: 0, e: "Let them through." },
          { q: "Best place to be passed is often…", o: ["the straight", "a blind corner", "the medical centre"], a: 0, e: "More space." },
          { q: "Block under blue?", o: ["No", "Yes"], a: 0, e: "Don't block." },
        ],
        sq: { q: "Weave to block under blue?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      4: {
        title: "Black flag",
        blurb: "Come in. Something is wrong with you or the kart.",
        points: [
          "A black flag usually means you must come into the pits.",
          "It can be a penalty, a mechanical problem, or unsafe driving.",
          "You don't ignore it and 'do one more lap for fun'.",
        ],
        steps: ["Black flag + your number sometimes.", "Come in.", "Talk to a marshal."],
        qs: [
          { q: "Black flag means…", o: ["come in", "go faster", "you won the championship"], a: 0, e: "Come in." },
          { q: "Ignore a black flag?", o: ["No", "Yes"], a: 0, e: "You come in." },
          { q: "It can be for…", o: ["unsafe driving or a problem", "free sweets", "a green light"], a: 0, e: "A problem." },
        ],
        sq: { q: "One more lap after black, for fun?", o: ["No", "Yes"], a: 0, e: "Come in." },
      },
      5: {
        title: "More flags, same brain",
        blurb: "White, yellow-red, and boards still mean: look, then act.",
        points: [
          "A white flag can mean a slow vehicle on track (rules vary — still be careful).",
          "Red-and-yellow stripes can mean a slippery surface.",
          "If you see a flag you don't know: slow, look, don't guess 'attack'.",
        ],
        steps: ["Unknown flag.", "Slow.", "Look at marshals."],
        qs: [
          { q: "Unknown flag: first you…", o: ["slow and look", "attack", "close your eyes"], a: 0, e: "Slow." },
          { q: "Red-and-yellow stripes can mean…", o: ["slippery surface", "you won", "lunch"], a: 0, e: "Slippery." },
          { q: "Guess 'attack' on a mystery flag?", o: ["No", "Yes"], a: 0, e: "Don't." },
        ],
        sq: { q: "Mystery flag + full send?", o: ["No", "Yes"], a: 0, e: "Slow." },
      },
      6: {
        title: "Flags are the rules in colour",
        blurb: "Stewards watch. Ignoring flags can cost a result.",
        points: [
          "Flags are not decoration. They are the live rules.",
          "Stewards can add time or drop you if you ignore them.",
          "Great racers read flags as fast as they read the track.",
        ],
        steps: ["See flag.", "Obey.", "Race again when it is green."],
        qs: [
          { q: "Flags are…", o: ["live rules", "just pretty cloth", "only for slow people"], a: 0, e: "Rules." },
          { q: "Ignoring flags can mean…", o: ["a penalty", "extra trophy", "free tyres"], a: 0, e: "Penalty." },
          { q: "Great racers…", o: ["read flags quickly", "never look up", "cover the visor"], a: 0, e: "They look." },
        ],
        sq: { q: "Flags only for beginners?", o: ["False", "True"], a: 0, e: "For everyone." },
      },
    },
    corners: {
      1: {
        title: "Corners",
        blurb: "Slow down, then turn. Look where you want to go.",
        points: [
          "Before a tight corner, slow down first.",
          "Look through the corner to the exit — not at the barrier.",
          "Then steer. Fast corners come later.",
        ],
        steps: ["See the corner.", "Slow.", "Look to the exit and turn."],
        qs: [
          { q: "Before a tight corner…", o: ["slow down first", "speed up as much as you can", "stand up"], a: 0, e: "Slow in." },
          { q: "Look…", o: ["to where you want to go", "at the barrier", "at your shoes"], a: 0, e: "Eyes lead." },
          { q: "Turn first, brake later in a panic?", o: ["That's how you miss it", "Always perfect"], a: 0, e: "Slow first." },
        ],
        sq: { q: "Stare at the wall?", o: ["No — look to the exit", "Yes"], a: 0, e: "You go where you look." },
      },
      2: {
        title: "Outside, inside, outside",
        blurb: "Use the track. Don't cut the grass.",
        points: [
          "A simple line: start wide, cut in (the inside), then let the kart run out wide.",
          "The inside point is called the apex — closest to the kerb.",
          "Grass and gravel are slower and can spin you.",
        ],
        steps: ["Wide.", "Inside.", "Wide again."],
        qs: [
          { q: "Out-in-out means…", o: ["wide, then inside, then wide", "only the grass", "eyes closed"], a: 0, e: "The basic line." },
          { q: "The apex is…", o: ["the inside of the corner", "the start lights", "the engine"], a: 0, e: "Inside point." },
          { q: "The grass is…", o: ["usually slower and slippy", "the racing line", "sticky like glue"], a: 0, e: "Stay on tarmac." },
        ],
        sq: { q: "Cut the grass to 'save time'?", o: ["Usually no", "Always yes"], a: 0, e: "Tarmac." },
      },
      3: {
        title: "Look further",
        blurb: "Your hands follow your eyes. Eyes up.",
        points: [
          "If you look at the apex only, you will be late on the exit.",
          "Look through — the kart follows.",
          "Peek, then lift your eyes to the next straight.",
        ],
        steps: ["See apex.", "Eyes already to the exit.", "Unwind the wheel."],
        qs: [
          { q: "Eyes should be…", o: ["ahead, through the corner", "on the front bumper only", "closed"], a: 0, e: "Look far." },
          { q: "Hands tend to follow…", o: ["your eyes", "the ice-cream van", "the radio"], a: 0, e: "Eyes lead." },
          { q: "Look only at the barrier?", o: ["No", "Yes"], a: 0, e: "You'll drive at it." },
        ],
        sq: { q: "Eyes on your shoes in a corner?", o: ["No", "Yes"], a: 0, e: "Eyes up." },
      },
      4: {
        title: "A late apex",
        blurb: "Turning a bit later can help you go faster down the next straight.",
        points: [
          "A late apex means you wait a beat, then clip the inside later.",
          "It can point the kart down the straight with more speed.",
          "Too late and you run out of road. Practise on a wide corner first.",
        ],
        steps: ["Wait a beat.", "Clip later.", "Squeeze go down the straight."],
        qs: [
          { q: "A late apex can help you…", o: ["carry speed onto the straight", "skip the helmet", "ignore flags"], a: 0, e: "Exit speed." },
          { q: "Too late means…", o: ["you may run out of road", "you teleport", "you always win"], a: 0, e: "Run wide." },
          { q: "Practise a new line…", o: ["on a wide corner first", "in a tiny hairpin at 100%", "in the pits at full speed"], a: 0, e: "Safe place." },
        ],
        sq: { q: "Try a brand new line in a blind kink at 100%?", o: ["No", "Yes"], a: 0, e: "Build up." },
      },
      5: {
        title: "Kerbs",
        blurb: "Flat kerbs can help. Sausage kerbs can spit you off.",
        points: [
          "A flat inside kerb can shorten the corner a little.",
          "Tall sausage kerbs can bounce the kart into a spin.",
          "If it looks angry, leave it.",
        ],
        steps: ["See the kerb.", "Flat? A little is OK.", "Tall sausage? Avoid."],
        qs: [
          { q: "A sausage kerb can…", o: ["bounce you into a spin", "cook sausages", "make you lighter"], a: 0, e: "Nasty." },
          { q: "Flat inside kerbs…", o: ["can help a little", "are lava", "are the pit lane"], a: 0, e: "A little." },
          { q: "Angry-looking kerb?", o: ["leave it", "attack it every lap", "park on it"], a: 0, e: "Respect it." },
        ],
        sq: { q: "Jump sausage kerbs for fun?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      6: {
        title: "Hit the same marks",
        blurb: "Same turn-in, same apex, same exit. That's how you get quicker.",
        points: [
          "Pick marks: turn-in cone, apex, exit.",
          "A tidy 48.2, 48.3, 48.2 beats 47.9 then 49.8.",
          "Change one thing at a time.",
        ],
        steps: ["Pick three marks.", "Hit them.", "Change one if needed."],
        qs: [
          { q: "Consistency means…", o: ["repeating good laps", "one lucky lap only", "never practising"], a: 0, e: "Repeat." },
          { q: "Change…", o: ["one thing at a time", "everything every lap", "the helmet colour only"], a: 0, e: "One thing." },
          { q: "Hero lap plus mistakes is often…", o: ["slower overall", "always the win", "required"], a: 0, e: "Average matters." },
        ],
        sq: { q: "Change the whole line every corner?", o: ["No", "Yes"], a: 0, e: "Repeat first." },
      },
    },
    pits: {
      1: {
        title: "Pits and waiting",
        blurb: "You wait in the pits until a marshal says go.",
        points: [
          "The pits are the safe waiting area off the track.",
          "You do not roll out until you are told.",
          "In the pit lane, go slowly — people are walking about.",
        ],
        steps: ["Sit in the pits.", "Wait.", "Go when told, slowly at first."],
        qs: [
          { q: "You wait in the…", o: ["pits", "middle of the track", "roof"], a: 0, e: "Pits." },
          { q: "Roll out before you are told?", o: ["No", "Yes"], a: 0, e: "Wait." },
          { q: "Pit lane speed should be…", o: ["slow", "flat out", "backwards always"], a: 0, e: "Slow." },
        ],
        sq: { q: "Blast through the pits?", o: ["No", "Yes"], a: 0, e: "Slow." },
      },
      2: {
        title: "Getting in and out",
        blurb: "Look. Point. Join the track only when it is clear.",
        points: [
          "Leaving the pits, look up the track — don't pull out in front of a flying kart.",
          "Stay off the racing line until you are up to speed.",
          "Coming in: lift early, hand up if that's the rule, pit lane slow.",
        ],
        steps: ["Look.", "Join off-line.", "Build speed."],
        qs: [
          { q: "Leaving the pits, first…", o: ["look up the track", "close your eyes", "cut across everyone"], a: 0, e: "Look." },
          { q: "Join…", o: ["off the racing line at first", "on the racing line at 0 mph", "on the grass"], a: 0, e: "Off-line." },
          { q: "Coming in, pit lane is…", o: ["slow", "qualifying pace", "a jump"], a: 0, e: "Slow." },
        ],
        sq: { q: "Pull out in front of a flying kart?", o: ["No", "Yes"], a: 0, e: "Look first." },
      },
      3: {
        title: "Formation and warm-up",
        blurb: "A slow lap to warm tyres and line up is not the race yet.",
        points: [
          "A formation lap is a slow lap to warm tyres and get in order.",
          "Weaving a little can warm tyres — weaving to block is not OK.",
          "The race starts when the lights go out (or the green / start signal).",
        ],
        steps: ["Slow lap.", "Line up.", "Lights out — then race."],
        qs: [
          { q: "A formation lap is…", o: ["a slow warm-up lap", "the last lap", "lunch"], a: 0, e: "Warm and line up." },
          { q: "You race when…", o: ["the start signal / lights out", "you feel like it in the pits", "the chequered flag"], a: 0, e: "The start." },
          { q: "Weave to block on a formation lap?", o: ["No", "Yes"], a: 0, e: "No." },
        ],
        sq: { q: "Race during formation?", o: ["No", "Yes"], a: 0, e: "Wait for the start." },
      },
      4: {
        title: "Starts",
        blurb: "Lights go out — then you go. Don't jump.",
        points: [
          "Start lights: reds come on, then they go out. That's the start.",
          "Going early is a jump start — it can mean a penalty.",
          "A clean start beats a jump that gets undone.",
        ],
        steps: ["Reds on.", "Wait.", "Lights out — go."],
        qs: [
          { q: "You go when the lights…", o: ["go out", "come on red", "turn blue"], a: 0, e: "Lights out." },
          { q: "Going early is a…", o: ["jump start", "chequered flag", "picnic"], a: 0, e: "Jump start." },
          { q: "Jump starts can mean…", o: ["a penalty", "extra points", "a gold coin"], a: 0, e: "Penalty." },
        ],
        sq: { q: "Go before lights out?", o: ["No", "Yes"], a: 0, e: "Wait." },
      },
      5: {
        title: "Parc fermé and scrutineering",
        blurb: "After a race they may check the kart. Hands off.",
        points: [
          "Scrutineering is a safety check of kart and kit.",
          "Parc fermé is a closed park — you don't tinker until you're allowed.",
          "You only race if the kart passes the check.",
        ],
        steps: ["Check bumpers and helmet.", "Race.", "Hands off in parc fermé."],
        qs: [
          { q: "Scrutineering is…", o: ["a safety check", "a sandwich", "the winner's speech"], a: 0, e: "Is it safe?" },
          { q: "Parc fermé means…", o: ["closed park — no tinkering yet", "free ice cream", "open party"], a: 0, e: "Hands off." },
          { q: "Fail the check?", o: ["you may not race", "you get extra laps", "you skip the helmet"], a: 0, e: "Must pass." },
        ],
        sq: { q: "Tinker in parc fermé?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      6: {
        title: "A race weekend in your head",
        blurb: "Practice, qualifying, race — each has a job.",
        points: [
          "Practice: learn the track and the kart.",
          "Qualifying: set a fast lap. Fastest starts at the front.",
          "Race: finish. Points beat a hero crash.",
        ],
        steps: ["Learn.", "Qualify.", "Finish the race."],
        qs: [
          { q: "Qualifying decides…", o: ["who starts at the front", "the weather", "lunch"], a: 0, e: "Grid." },
          { q: "Practice is for…", o: ["learning", "ignoring the track", "skipping kit"], a: 0, e: "Learn." },
          { q: "A DNF scores…", o: ["nothing", "maximum points", "a gold coin"], a: 0, e: "Did not finish." },
        ],
        sq: { q: "Crash rather than finish P5?", o: ["No", "Yes"], a: 0, e: "Finish." },
      },
    },
    line: {
      1: {
        title: "Stay on the track",
        blurb: "Tarmac grips. Grass and gravel often don't.",
        points: [
          "The black (or grey) tarmac is where the kart is meant to be.",
          "Grass can be slippy. Gravel can trap you.",
          "If you run wide, ease off, don't yank.",
        ],
        steps: ["See the edge.", "Stay in.", "If you go out, ease off."],
        qs: [
          { q: "The safest place is…", o: ["on the tarmac", "on the grass", "in the air"], a: 0, e: "On track." },
          { q: "Grass is often…", o: ["slippy", "stickier than glue", "the racing line"], a: 0, e: "Slippy." },
          { q: "If you run wide…", o: ["ease off, don't yank", "stamp and spin on purpose", "close your eyes"], a: 0, e: "Ease off." },
        ],
        sq: { q: "Use the gravel as a shortcut?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      2: {
        title: "Use all the track — not more",
        blurb: "Edge to edge is OK. Beyond the edge is not a bonus.",
        points: [
          "Using the full width can make a corner easier.",
          "Putting two wheels over the white line / kerb too much can be a track-limits warning.",
          "If a marshal boards show a warning, tidy it up.",
        ],
        steps: ["Use the width.", "Don't steal extra in the dirt.", "Tidy if warned."],
        qs: [
          { q: "Full width on the tarmac is…", o: ["often useful", "always a penalty", "only for horses"], a: 0, e: "Use it." },
          { q: "Track limits means…", o: ["don't keep running off", "ignore edges", "drive in the pits"], a: 0, e: "Stay in." },
          { q: "Warned for limits? You…", o: ["tidy the line", "go further off", "remove the steering"], a: 0, e: "Tidy." },
        ],
        sq: { q: "Cut beyond the track for a 'better lap'?", o: ["No", "Yes"], a: 0, e: "Stay in." },
      },
      3: {
        title: "The racing line",
        blurb: "The fastest path is usually wide–in–wide.",
        points: [
          "The racing line is the fastest path around a corner.",
          "It is not always the shortest path — shortest can be slowest.",
          "In the wet, the dry line can be the slipperiest.",
        ],
        steps: ["Wide.", "Apex.", "Wide. That's the dry idea."],
        qs: [
          { q: "The racing line is…", o: ["the fastest path", "a type of rope", "only for horses"], a: 0, e: "Fastest path." },
          { q: "Shortest path is always fastest?", o: ["No", "Yes"], a: 0, e: "Not always." },
          { q: "In the wet the dry line can be…", o: ["slippery", "perfect", "closed by law always"], a: 0, e: "Rubber gets slippy." },
        ],
        sq: { q: "Always copy the dry line in the rain?", o: ["Not always", "Always"], a: 0, e: "Wet ≠ dry." },
      },
      4: {
        title: "Traffic",
        blurb: "The racing line is yours until someone is beside you.",
        points: [
          "If a kart is alongside, you leave a kart's width.",
          "The cleanest pass is often on the straight.",
          "Don't squeeze someone into the grass on purpose.",
        ],
        steps: ["Someone alongside.", "Leave width.", "Don't chop their nose."],
        qs: [
          { q: "A clean pass leaves…", o: ["a kart's width", "no space", "them in the gravel on purpose"], a: 0, e: "Room." },
          { q: "Safest place to pass is often…", o: ["the straight", "a blind kink", "the medical centre"], a: 0, e: "Straight." },
          { q: "Chop across someone's nose?", o: ["No", "Always"], a: 0, e: "That's contact." },
        ],
        sq: { q: "Squeeze them off because you 'had the line'?", o: ["No — leave width if they're there", "Yes"], a: 0, e: "Alongside = space." },
      },
      5: {
        title: "Defending",
        blurb: "One move to cover the inside is usually OK. Weaving is not.",
        points: [
          "You may move once to defend the inside.",
          "Weaving down the straight to block is not OK.",
          "Defend, then race — don't become a rolling chicane.",
        ],
        steps: ["One move.", "Hold it.", "Don't snake."],
        qs: [
          { q: "Weaving to block is…", o: ["not OK", "the best skill", "required"], a: 0, e: "No snake." },
          { q: "One defensive move is often…", o: ["OK", "always a black flag", "a type of sandwich"], a: 0, e: "One move." },
          { q: "A rolling chicane means…", o: ["you keep blocking in a silly way", "a fast clean lap", "a helmet"], a: 0, e: "Don't." },
        ],
        sq: { q: "Snake down the straight?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      6: {
        title: "Think a corner ahead",
        blurb: "Set up the next pass, not just this one.",
        points: [
          "Sometimes you take a slightly worse line to set up a better exit.",
          "Exit speed onto a long straight is worth a lot.",
          "The best racers think one corner ahead.",
        ],
        steps: ["See the next straight.", "Set up the exit.", "Pass later if needed."],
        qs: [
          { q: "Think…", o: ["a corner ahead", "only about snacks", "about yesterday only"], a: 0, e: "Next corner." },
          { q: "Exit onto a long straight is…", o: ["worth a lot", "worthless", "a yellow flag"], a: 0, e: "Speed down the straight." },
          { q: "Always dive-bomb every corner?", o: ["No — think", "Yes"], a: 0, e: "That's how you crash." },
        ],
        sq: { q: "Only think about this metre of tarmac?", o: ["No — look ahead", "Yes"], a: 0, e: "Look ahead." },
      },
    },
    respect: {
      1: {
        title: "Kind racing",
        blurb: "Don't bump on purpose. Leave space. Have fun.",
        points: [
          "Karting is more fun when people are still friends at the end.",
          "Bumping on purpose is not OK.",
          "If you make a mistake, a wave is good manners.",
        ],
        steps: ["Leave space.", "Don't ram.", "Wave if you mess up."],
        qs: [
          { q: "Bumping on purpose is…", o: ["not OK", "the best way to win", "required"], a: 0, e: "Don't." },
          { q: "A wave after a mistake is…", o: ["good manners", "a penalty", "a yellow flag"], a: 0, e: "Manners." },
          { q: "Friends at the end means…", o: ["you raced fairly", "you ignored everyone", "you skipped the helmet"], a: 0, e: "Fair racing." },
        ],
        sq: { q: "Ram to 'teach them a lesson'?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      2: {
        title: "Leave a kart's width",
        blurb: "If they are beside you, they exist.",
        points: [
          "A kart's width is the space another kart needs.",
          "Turning in as if they are invisible is how contact starts.",
          "You can be firm. You cannot use people as brakes.",
        ],
        steps: ["Check beside you.", "Leave width.", "Then turn in."],
        qs: [
          { q: "If someone is alongside, leave…", o: ["a kart's width", "no space", "the track"], a: 0, e: "Width." },
          { q: "Using another kart as a brake is…", o: ["unfair and unsafe", "great always", "required"], a: 0, e: "Don't." },
          { q: "Turn in as if they are invisible?", o: ["No", "Yes"], a: 0, e: "Look." },
        ],
        sq: { q: "They disappeared because you wanted the apex?", o: ["No — they still exist", "Yes"], a: 0, e: "They exist." },
      },
      3: {
        title: "The start is not a demolition derby",
        blurb: "First-corner pile-ups help nobody.",
        points: [
          "Turn 1 is tight. Lots of karts. Brake earlier than you think.",
          "Winning turn 1 and crashing is not winning.",
          "A tidy P4 after turn 1 beats a DNF.",
        ],
        steps: ["Lights out.", "Brake earlier into turn 1.", "Still be there on lap 2."],
        qs: [
          { q: "Turn 1 is often…", o: ["busy and tight", "empty", "a picnic"], a: 0, e: "Busy." },
          { q: "Crash at turn 1 while 'leading'…", o: ["is not a win", "is the championship", "is required"], a: 0, e: "Finish." },
          { q: "Into turn 1, brake…", o: ["a bit earlier than you think", "never", "only after the wall"], a: 0, e: "Earlier." },
        ],
        sq: { q: "Dive to P1 or crash, nothing else?", o: ["No", "Yes"], a: 0, e: "Survive turn 1." },
      },
      4: {
        title: "Stewards",
        blurb: "Someone watches. Penalties exist so racing stays fair.",
        points: [
          "Stewards review incidents: jumps, contact, ignoring flags.",
          "Penalties can be time, places, or disqualification.",
          "Fair racing: firm, not dirty.",
        ],
        steps: ["Incident.", "Stewards look.", "A penalty may be added."],
        qs: [
          { q: "Stewards…", o: ["review incidents", "sell snacks only", "drive your kart"], a: 0, e: "Referees." },
          { q: "A time penalty means…", o: ["seconds added", "extra cake", "free tyres"], a: 0, e: "Your time gets worse." },
          { q: "Rules are only for slow people?", o: ["False", "True"], a: 0, e: "For everyone." },
        ],
        sq: { q: "Dirty because nobody saw?", o: ["Still wrong", "Fine"], a: 0, e: "Wrong." },
      },
      5: {
        title: "Team-mates and rivals",
        blurb: "You can race hard and still shake hands.",
        points: [
          "A rival is not an enemy.",
          "In the pits, help with a trolley or a visor tear-off if you can.",
          "The paddock remembers the kind racers.",
        ],
        steps: ["Race hard.", "Handshake.", "Help in the paddock."],
        qs: [
          { q: "A rival is…", o: ["not an enemy", "someone to ram", "a marshal"], a: 0, e: "Race them fairly." },
          { q: "Help in the paddock is…", o: ["good manners", "banned", "a jump start"], a: 0, e: "Kind." },
          { q: "Handshake after a scrap is…", o: ["grown-up racing", "a penalty", "illegal"], a: 0, e: "Do it." },
        ],
        sq: { q: "Sulk and never speak after a pass?", o: ["No", "Yes"], a: 0, e: "Shake hands." },
      },
      6: {
        title: "Championship brain",
        blurb: "One race is not the whole story. Finishing scores points.",
        points: [
          "Championships add points each round.",
          "A DNF scores nothing — sometimes P4 is smarter than P1 or zero.",
          "Race hard. Also think about the season.",
        ],
        steps: ["Last lap, huge lead, wet.", "A crash = zero.", "Ease off and take the flag."],
        qs: [
          { q: "A championship is won by…", o: ["points over rounds", "one handshake", "the loudest engine only"], a: 0, e: "Season." },
          { q: "DNF means…", o: ["did not finish", "drove near fastest", "did nothing funny"], a: 0, e: "No finish." },
          { q: "Sometimes P4 is smarter than…", o: ["crashing for a win that doesn't happen", "wearing a helmet", "learning flags"], a: 0, e: "Points > hero zero." },
        ],
        sq: { q: "Always crash rather than finish P5?", o: ["No", "Yes"], a: 0, e: "Points matter." },
      },
    },
  };

  const investExtra = {
    spend: {
      1: {
        title: "Spend or save",
        blurb: "Spent money is gone. Saved money is still yours tomorrow.",
        points: [
          "If you buy sweets, that pound is gone.",
          "If you drop it in the pot, it is still yours tomorrow.",
          "Both can be OK. The skill is choosing on purpose.",
        ],
        steps: ["You get £1.", "Sweets? Gone. Pot? Still there tomorrow."],
        qs: [
          { q: "Spent money is…", o: ["gone", "still in the pot", "a horse"], a: 0, e: "Gone." },
          { q: "Saved money is…", o: ["still yours later", "thrown away", "a flag"], a: 0, e: "Still yours." },
          { q: "Choosing on purpose is…", o: ["the skill", "banned", "only for adults in space"], a: 0, e: "Think first." },
        ],
        sq: { q: "Spend and save are the same?", o: ["No", "Yes"], a: 0, e: "Different." },
      },
      2: {
        title: "Needs and wants",
        blurb: "Lunch is a need. A tenth toy can wait.",
        points: [
          "Needs: food, shoes that fit, a roof.",
          "Wants: extra stickers, the thing in the advert.",
          "Pay needs first. Wants can wait — that is how the pot grows.",
        ],
        steps: ["List needs.", "Pay those.", "Then wants or the pot."],
        qs: [
          { q: "A need is more like…", o: ["food this week", "the tenth toy", "a random advert"], a: 0, e: "Need first." },
          { q: "A want can often…", o: ["wait", "replace lunch", "print money"], a: 0, e: "Wait." },
          { q: "Pay…", o: ["needs first", "every advert first", "nothing ever"], a: 0, e: "Needs first." },
        ],
        sq: { q: "Skip lunch for a sticker?", o: ["No", "Yes"], a: 0, e: "Needs first." },
      },
      3: {
        title: "Wait a day",
        blurb: "If you still want it tomorrow, maybe. If not, you saved the money.",
        points: [
          "Adverts are good at making you want something now.",
          "A one-day wait is a superpower.",
          "If the want fades, the pot wins.",
        ],
        steps: ["See the thing.", "Wait a day.", "Still want it? Then decide."],
        qs: [
          { q: "A one-day wait can…", o: ["stop a oops-buy", "print gold", "skip school"], a: 0, e: "Cool-off." },
          { q: "Adverts want you to buy…", o: ["now", "in 40 years", "never"], a: 0, e: "Now." },
          { q: "If the want fades, the pot…", o: ["wins", "loses", "turns into a kart"], a: 0, e: "You kept the money." },
        ],
        sq: { q: "Buy every advert the same second?", o: ["No", "Yes"], a: 0, e: "Wait." },
      },
      4: {
        title: "A simple budget",
        blurb: "Give every pound a job: spend, save, share if you like.",
        points: [
          "A budget is a plan for money before it disappears.",
          "20% in the pot is one job. The rest can have jobs too.",
          "If the jobs add up to more than you got, something has to wait.",
        ],
        steps: ["Write what came in.", "Give each bit a job.", "Stop when the pound is used up."],
        qs: [
          { q: "A budget is…", o: ["a plan for money", "a type of helmet", "a yellow flag"], a: 0, e: "A plan." },
          { q: "If jobs add up to more than you got…", o: ["something waits", "you print money", "you ignore maths"], a: 0, e: "Wait." },
          { q: "20% in the pot is…", o: ["one job in the plan", "all jobs", "a fee to a marshal"], a: 0, e: "Pay yourself first." },
        ],
        sq: { q: "Spend first, plan never?", o: ["No", "Yes"], a: 0, e: "Plan first." },
      },
      5: {
        title: "Choosing one thing means not another",
        blurb: "That is opportunity cost — a grown-up phrase for a kid idea.",
        points: [
          "If you buy the game, you cannot also buy the Lego with the same pound.",
          "That missed thing is the real price, not just the sticker.",
          "Good choosers see both.",
        ],
        steps: ["Two things.", "One pound.", "Pick, and notice what you didn't pick."],
        qs: [
          { q: "The same pound can buy…", o: ["one path, not both", "everything in the shop", "a time machine"], a: 0, e: "One path." },
          { q: "Opportunity cost is…", o: ["what you didn't buy", "a type of tyre", "a marshal"], a: 0, e: "The other choice." },
          { q: "Good choosers…", o: ["see both options", "close their eyes", "always panic"], a: 0, e: "See both." },
        ],
        sq: { q: "One pound buys two full things at full price?", o: ["No", "Yes"], a: 0, e: "One path." },
      },
      6: {
        title: "Future You is on the team",
        blurb: "Every spend is a vote. Some votes are for today. Some are for later.",
        points: [
          "Today-You likes sweets. Future-You likes options.",
          "The 20% rule is how Today-You is fair to Future-You.",
          "You can still have fun now — just not with the whole pot.",
        ],
        steps: ["Split the pound.", "Fun now with most of it.", "Pot for later."],
        qs: [
          { q: "The 20% is fair to…", o: ["Future You", "the bin", "nobody"], a: 0, e: "Later you." },
          { q: "Fun now with the whole pot?", o: ["leaves Future You with less", "prints gold", "is the 20% rule"], a: 0, e: "Less later." },
          { q: "You can still have fun now?", o: ["Yes — with the rest", "No, never again", "Only on Mars"], a: 0, e: "80% can be now." },
        ],
        sq: { q: "Forget Future You exists?", o: ["No", "Yes"], a: 0, e: "They're on the team." },
      },
    },
    time: {
      1: {
        title: "Time is the secret",
        blurb: "A snowball likes years, not five minutes.",
        points: [
          "Starting at 10 or 11 gives the pot many years.",
          "Waiting until you are old means the snowball has less time.",
          "Little and often, left alone, can beat a big late start.",
        ],
        steps: ["Start small.", "Leave it.", "Years do the heavy lifting."],
        qs: [
          { q: "A snowball likes…", o: ["a long time", "five minutes", "never"], a: 0, e: "Time." },
          { q: "Starting young means…", o: ["more years for growth", "less time", "no pot"], a: 0, e: "More years." },
          { q: "Little and often can beat…", o: ["a big late start", "maths", "helmets"], a: 0, e: "Time helps." },
        ],
        sq: { q: "Five minutes is enough for a snowball?", o: ["No", "Yes"], a: 0, e: "Years." },
      },
      2: {
        title: "Weekly beats never",
        blurb: "A little every week is a habit. A habit is powerful.",
        points: [
          "£2 a week is not a fortune. £2 a week for years is a pile.",
          "The calculator on this lab can show weekly or monthly.",
          "Missing one week is OK. Quitting the habit is the real leak.",
        ],
        steps: ["Pick a day.", "Put the 20% in.", "Repeat."],
        qs: [
          { q: "A weekly habit is…", o: ["powerful over years", "useless", "a yellow flag"], a: 0, e: "Habit." },
          { q: "The real leak is…", o: ["quitting the habit", "one missed week", "using £"], a: 0, e: "Quitting." },
          { q: "£2 a week for years is…", o: ["a pile", "still £2 only", "a horse"], a: 0, e: "It adds up." },
        ],
        sq: { q: "Skip forever because you missed one week?", o: ["No", "Yes"], a: 0, e: "Restart." },
      },
      3: {
        title: "Years on a page",
        blurb: "10 years is a lot of snowball. 40 years is a mountain of time.",
        points: [
          "From 11 to 21 is ten years of possible growth.",
          "From 11 to 51 is forty years — that is why adults talk about pensions.",
          "Pictures of the past are not a promise. Time still matters.",
        ],
        steps: ["Age now.", "Age later.", "Count the years in between."],
        qs: [
          { q: "From 11 to 21 is…", o: ["10 years", "1 year", "100 years"], a: 0, e: "Ten." },
          { q: "Pensions use…", o: ["lots of years", "five minutes", "flags"], a: 0, e: "Time." },
          { q: "Past returns are…", o: ["a picture, not a promise", "a deal with the future", "a helmet"], a: 0, e: "Not a promise." },
        ],
        sq: { q: "Time does not matter?", o: ["False", "True"], a: 0, e: "It matters." },
      },
      4: {
        title: "Time in, not timing",
        blurb: "Guessing the perfect day to buy is a hobby. Staying in is a plan.",
        points: [
          "Trying to jump in and out is called timing the market.",
          "Even grown-ups get that wrong a lot.",
          "A simple plan: keep adding, stay for years.",
        ],
        steps: ["Don't guess the perfect Tuesday.", "Add.", "Stay."],
        qs: [
          { q: "Timing the market means…", o: ["guessing when to jump in and out", "wearing a watch in a kart", "a marshal's job"], a: 0, e: "Guessing." },
          { q: "Grown-ups get timing…", o: ["wrong a lot", "perfect always", "as a law"], a: 0, e: "It's hard." },
          { q: "A simple plan is…", o: ["keep adding, stay for years", "guess daily", "spend the pot weekly"], a: 0, e: "Stay." },
        ],
        sq: { q: "Jump in and out every headline?", o: ["No", "Yes"], a: 0, e: "Stay." },
      },
      5: {
        title: "The boring years count",
        blurb: "Nothing exciting happening can still be the snowball working.",
        points: [
          "Some years the number barely moves. That can still be OK.",
          "You don't need fireworks every month.",
          "Opening the app every hour does not make time go faster.",
        ],
        steps: ["A quiet year.", "You still added.", "Time is still working."],
        qs: [
          { q: "A quiet year can still be…", o: ["OK", "a crime", "a red flag always"], a: 0, e: "OK." },
          { q: "Opening the app every hour…", o: ["does not speed time up", "prints money", "is the 20% rule"], a: 0, e: "It doesn't help." },
          { q: "Fireworks every month are…", o: ["not required", "required by law", "a helmet rule"], a: 0, e: "Not required." },
        ],
        sq: { q: "Quiet = broken always?", o: ["No", "Yes"], a: 0, e: "Not always." },
      },
      6: {
        title: "Give time the wheel",
        blurb: "You do the 20%. Time does the long stretch. Don't grab the wheel every dip.",
        points: [
          "Your job: add, mix, leave it.",
          "Time's job: the snowball.",
          "Grabbing the wheel every scary day is how people sell the bottom.",
        ],
        steps: ["Dip happens.", "If the plan is sound, sit.", "Keep the 20% going."],
        qs: [
          { q: "Your job is…", o: ["add, mix, leave it", "panic daily", "time the perfect minute"], a: 0, e: "The simple job." },
          { q: "Selling in a scare often means…", o: ["you lock in the drop", "you always win", "fees disappear"], a: 0, e: "Locked in." },
          { q: "Time's job is…", o: ["the snowball", "the yellow flag", "the helmet"], a: 0, e: "Snowball." },
        ],
        sq: { q: "Grab the wheel every dip?", o: ["No", "Yes"], a: 0, e: "Plan first." },
      },
    },
    risk: {
      1: {
        title: "It can go down",
        blurb: "Pots that can grow can also shrink. Never this week's lunch money.",
        points: [
          "A piggy bank pound is still a pound. An invested pot can wobble.",
          "Wobble is the price of a chance to grow.",
          "Never use money you need for lunch, shoes or this week.",
        ],
        steps: ["Need it this week? Don't invest it.", "Spare? Then maybe."],
        qs: [
          { q: "Investing can…", o: ["go down as well as up", "only go up", "never change"], a: 0, e: "It can fall." },
          { q: "This week's lunch money?", o: ["No", "Yes, all of it"], a: 0, e: "Never." },
          { q: "Wobble is…", o: ["the price of a chance to grow", "a type of flag", "a helmet"], a: 0, e: "Risk." },
        ],
        sq: { q: "Only ever goes up?", o: ["No", "Yes"], a: 0, e: "Can fall." },
      },
      2: {
        title: "Jumpy vs calmer",
        blurb: "Some things jump a lot. Some things wobble less. Jumpy is not 'better'.",
        points: [
          "Bitcoin has been very jumpy. A bag of many shops is usually calmer.",
          "More jumpy can mean more chance of a big up — and a big down.",
          "Calmer is not boring. It can be the point.",
        ],
        steps: ["Jumpy thing.", "Calmer bag.", "Match it to money you can leave."],
        qs: [
          { q: "Bitcoin has been…", o: ["very jumpy", "perfectly still", "a horse"], a: 0, e: "Jumpy." },
          { q: "A bag of many shops is usually…", o: ["calmer", "always zero", "a yellow flag"], a: 0, e: "Calmer." },
          { q: "Jumpy means better?", o: ["Not automatically", "Always"], a: 0, e: "Not automatically." },
        ],
        sq: { q: "Jumpy = always best?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      3: {
        title: "The sleep test",
        blurb: "If a number would keep you awake, it is too big a bet.",
        points: [
          "A good size is one you can shrug at if it has a bad year.",
          "If you would panic, it is too much.",
          "Smaller and sleeping is a skill.",
        ],
        steps: ["Imagine it halves.", "Can you shrug?", "If not, smaller."],
        qs: [
          { q: "If it would keep you awake, the bet is…", o: ["too big", "perfect", "required"], a: 0, e: "Too big." },
          { q: "A shrug at a bad year means…", o: ["the size is saner", "you don't care about anyone", "fees are zero"], a: 0, e: "Sane size." },
          { q: "Smaller and sleeping is…", o: ["a skill", "a failure", "a marshal rule"], a: 0, e: "Skill." },
        ],
        sq: { q: "Pick a size that ruins sleep?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      4: {
        title: "This week's money vs spare money",
        blurb: "Three pots: now, soon, later. Only later can wobble.",
        points: [
          "Now: lunch, bus, this week.",
          "Soon: bike, trip this year.",
          "Later: years-away pot. That is the one that may wobble.",
        ],
        steps: ["Sort the money.", "Only later-pot may invest.", "Protect now and soon."],
        qs: [
          { q: "The wobble pot is the…", o: ["later / years-away pot", "lunch money", "this week's shoes"], a: 0, e: "Later." },
          { q: "Soon money (a bike this year) in Bitcoin?", o: ["Risky — it might dip when you need it", "Perfect always", "Required"], a: 0, e: "Might dip." },
          { q: "Now-money should…", o: ["stay safe for this week", "go in the jumpiest thing", "be thrown"], a: 0, e: "Safe." },
        ],
        sq: { q: "Put rent-and-lunch in the jumpiest thing?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      5: {
        title: "You can lose some. You must not lose the lot you need.",
        blurb: "A single shop can go to zero. A life-pot should not be one shop.",
        points: [
          "One company can fail.",
          "A wide bag is built so one fail hurts less.",
          "Size the spice so a zero is a shrug, not a disaster.",
        ],
        steps: ["One shop can hit zero.", "Don't let that be the whole plan.", "Spice, not the meal."],
        qs: [
          { q: "One shop can…", o: ["hit zero", "never fail", "print lunch"], a: 0, e: "Fail." },
          { q: "The meal of the plan is…", o: ["the wide bag + time + 20%", "one internet tip", "a jump start"], a: 0, e: "The simple plan." },
          { q: "Spice means…", o: ["a small extra, not the whole pot", "the lunch money", "all of it"], a: 0, e: "Small extra." },
        ],
        sq: { q: "Whole life-pot in one shop?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      6: {
        title: "Risk you can explain",
        blurb: "If you cannot explain it in one sentence, skip it.",
        points: [
          "Three gates: Can I explain it? Can I shrug if it hurts? Is this week's food safe?",
          "Any 'no' → skip.",
          "This is not licensed advice. It is a kid's checklist.",
        ],
        steps: ["Three gates.", "Any no → skip.", "Keep the simple plan."],
        qs: [
          { q: "Cannot explain it?", o: ["skip", "double it", "use the lunch money"], a: 0, e: "Skip." },
          { q: "This week's food safe?", o: ["must be yes", "does not matter", "use it first"], a: 0, e: "Must be yes." },
          { q: "This checklist is…", o: ["a kid tool, not a licensed adviser", "the law", "a helmet"], a: 0, e: "Not licensed advice." },
        ],
        sq: { q: "Buy it because a stranger on the internet shouted?", o: ["No", "Yes"], a: 0, e: "Skip." },
      },
    },
    mix: {
      1: {
        title: "Don't put it all in one",
        blurb: "If one shop has a bad day, the others can still help.",
        points: [
          "All coins in one shop is a single bet.",
          "A bag of many shops spreads the wobble.",
          "Mix is not fancy. Mix is a seatbelt.",
        ],
        steps: ["One shop can fail.", "Many shops: one fail hurts less.", "That's the mix."],
        qs: [
          { q: "All coins in one shop is…", o: ["riskier", "always safest", "required"], a: 0, e: "Riskier." },
          { q: "A bag of many shops…", o: ["spreads the wobble", "removes all risk forever", "is a kart"], a: 0, e: "Spreads." },
          { q: "Mix is like a…", o: ["seatbelt", "yellow flag", "helmet on a horse"], a: 0, e: "Seatbelt." },
        ],
        sq: { q: "One shop only, always?", o: ["No", "Yes"], a: 0, e: "Mix." },
      },
      2: {
        title: "Different kinds of mix",
        blurb: "Shops, metals, internet money — they don't all dance the same day.",
        points: [
          "A bag of shops is one mix.",
          "A little gold is a different kind of thing.",
          "They can have different years. That is the point of a mix.",
        ],
        steps: ["Bag of shops.", "Maybe a little metal.", "Not 100% one idea."],
        qs: [
          { q: "Different things can have…", o: ["different years", "identical years always", "no prices"], a: 0, e: "Different." },
          { q: "A little gold in a mix is…", o: ["a different kind of thing", "the whole 20% rule", "a marshal"], a: 0, e: "Different." },
          { q: "100% one idea is…", o: ["not a mix", "the definition of mix", "a helmet"], a: 0, e: "Not a mix." },
        ],
        sq: { q: "Mix means 100% one coin?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      3: {
        title: "The 20% still comes first",
        blurb: "Mix is what you do with the pot. First you fill the pot.",
        points: [
          "No mix helps an empty pot.",
          "Pay yourself first (20%), then choose the mix.",
          "Fancy mix, zero savings, is a costume.",
        ],
        steps: ["20% in.", "Then mix.", "Not the other way round."],
        qs: [
          { q: "An empty pot with a fancy mix is…", o: ["still empty", "rich", "a kart"], a: 0, e: "Empty." },
          { q: "First…", o: ["fill the pot", "pick 12 coins", "read every headline"], a: 0, e: "Fill it." },
          { q: "20% is…", o: ["how the pot gets filled", "a flag", "a helmet"], a: 0, e: "Fill." },
        ],
        sq: { q: "Mix first, save never?", o: ["No", "Yes"], a: 0, e: "Save first." },
      },
      4: {
        title: "Don't chase last year's winner",
        blurb: "What just shot up can be the thing that looks expensive.",
        points: [
          "Chasing means buying a thing only because it just went up.",
          "Last year's winner is not a promise.",
          "The mix exists so you don't need a hero pick every month.",
        ],
        steps: ["Something shot up.", "Don't dump the mix to chase it.", "Stick to the plan."],
        qs: [
          { q: "Chasing means…", o: ["buying only because it just went up", "the 20% rule", "a yellow flag"], a: 0, e: "Chase." },
          { q: "Last year's winner is…", o: ["not a promise", "a contract with the future", "a helmet"], a: 0, e: "Not a promise." },
          { q: "Dump the mix to chase?", o: ["No", "Yes"], a: 0, e: "No." },
        ],
        sq: { q: "Buy it because it just doubled?", o: ["Not for that reason alone", "Always"], a: 0, e: "Don't chase." },
      },
      5: {
        title: "A yearly tidy",
        blurb: "Once in a while, put the mix back to the plan. Not every day.",
        points: [
          "If shops grew a lot, they might be a bigger slice than you meant.",
          "A yearly tidy (rebalance) puts slices back.",
          "Daily tinkering is not a tidy. It is fidgeting.",
        ],
        steps: ["Once a year, look.", "If slices drifted, tidy.", "Then leave it."],
        qs: [
          { q: "Rebalance means…", o: ["put slices back to the plan", "panic sell everything", "buy lunch"], a: 0, e: "Tidy." },
          { q: "Do it every hour?", o: ["No — that is fidgeting", "Yes"], a: 0, e: "Yearly-ish." },
          { q: "Slices drift because…", o: ["some bits grow faster", "marshals move them", "flags"], a: 0, e: "Growth differs." },
        ],
        sq: { q: "Tidy the mix every five minutes?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      6: {
        title: "The mix is the seatbelt. Time is the engine.",
        blurb: "Together they are the plan. Hero picks are optional spice.",
        points: [
          "Seatbelt: mix. Engine: years. Fuel: 20%.",
          "Spice: one shop you understand, sized to shrug.",
          "If spice would wreck the seatbelt, skip the spice.",
        ],
        steps: ["Fuel.", "Seatbelt.", "Engine.", "Spice only if it fits."],
        qs: [
          { q: "Fuel is the…", o: ["20%", "yellow flag", "helmet"], a: 0, e: "20%." },
          { q: "Engine is…", o: ["years", "daily headlines", "one tip"], a: 0, e: "Time." },
          { q: "Spice that wrecks the seatbelt?", o: ["skip it", "double it", "use lunch money"], a: 0, e: "Skip." },
        ],
        sq: { q: "Spice instead of the plan?", o: ["No", "Yes"], a: 0, e: "Plan first." },
      },
    },
    fees: {
      1: {
        title: "Little charges",
        blurb: "A little bit taken each year is a fee. It nibbles the snowball.",
        points: [
          "Some pots charge a small % every year to look after them.",
          "1% does not sound like much. Over years it is a real bite.",
          "Cheaper is not always worse. For a simple bag, cheaper is often kinder.",
        ],
        steps: ["A yearly nibble.", "Over years it adds up.", "Ask 'how much is the fee?'"],
        qs: [
          { q: "A yearly charge is a…", o: ["fee", "flag", "helmet"], a: 0, e: "Fee." },
          { q: "Fees nibble the…", o: ["snowball", "marshal", "kart tyre"], a: 0, e: "Snowball." },
          { q: "Cheaper for a simple bag is often…", o: ["kinder", "illegal", "a crash"], a: 0, e: "Kinder." },
        ],
        sq: { q: "Fees are always zero?", o: ["No", "Yes"], a: 0, e: "Ask." },
      },
      2: {
        title: "1% on a tenner",
        blurb: "1% of £10 is 10p. Small today. Not small over a life.",
        points: [
          "1% means 1 in every 100.",
          "£10 → 10p. £100 → £1. £1,000 → £10, each year.",
          "The snowball grows on what is left after the nibble.",
        ],
        steps: ["£100.", "1% = £1.", "That's the nibble that year."],
        qs: [
          { q: "1% of £100 is…", t: "typed", a: "1", e: "£1." },
          { q: "The snowball grows on…", o: ["what is left after fees", "the fee itself", "the yellow flag"], a: 0, e: "After the nibble." },
          { q: "1 in every 100 is…", o: ["1%", "50%", "a helmet"], a: 0, e: "1%." },
        ],
        sq: { q: "1% of £10 is 10p?", o: ["Yes", "No"], a: 0, e: "Yes." },
      },
      3: {
        title: "Two bags, two prices",
        blurb: "If two bags own the same list, the cheaper one usually leaves you more.",
        points: [
          "An index bag tries to own the list, not beat it with hero picks.",
          "Hero picking often costs more in fees.",
          "Paying extra only helps if the extra skill is real — and that is hard.",
        ],
        steps: ["Same list.", "Bag A costs more.", "Bag B cheaper → more left for you."],
        qs: [
          { q: "If two bags own the same list, cheaper usually…", o: ["leaves you more", "is a trick always", "breaks the kart"], a: 0, e: "More left." },
          { q: "An index bag tries to…", o: ["own the list", "guess daily", "skip school"], a: 0, e: "Own the list." },
          { q: "Higher fees are a promise of higher returns?", o: ["No", "Yes"], a: 0, e: "No." },
        ],
        sq: { q: "Pay more fees because it sounds fancy?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      4: {
        title: "Fees compound too",
        blurb: "The nibble has a snowball. That is why tiny % matters.",
        points: [
          "Growth compounds. Fees compound against you.",
          "A 1% nibble for 40 years is a big slice of the mountain.",
          "You don't need the exact maths today. You need the idea.",
        ],
        steps: ["Nibble each year.", "Next year the nibble sits on a changed pot.", "Years later: big slice."],
        qs: [
          { q: "Fees can compound…", o: ["against you", "only in your favour", "never"], a: 0, e: "Against you." },
          { q: "Over 40 years a 1% nibble is…", o: ["a big slice", "nothing", "a helmet"], a: 0, e: "Big." },
          { q: "You need the idea that tiny %…", o: ["matters over years", "never matters", "is a flag"], a: 0, e: "Matters." },
        ],
        sq: { q: "Tiny % is always nothing?", o: ["No — years matter", "Yes"], a: 0, e: "Years." },
      },
      5: {
        title: "Read the little number",
        blurb: "Look for the yearly % . If you cannot find it, ask a grown-up.",
        points: [
          "The little number has names like 'ongoing charge'.",
          "If nobody can show you the number, be careful.",
          "You are allowed to ask.",
        ],
        steps: ["Find the %.", "Compare.", "Cheaper similar bag often wins."],
        qs: [
          { q: "If you cannot find the fee…", o: ["ask / be careful", "pay anything", "close your eyes"], a: 0, e: "Ask." },
          { q: "You are allowed to…", o: ["ask", "never ask", "only guess"], a: 0, e: "Ask." },
          { q: "Ongoing charge is a…", o: ["yearly-style fee name", "yellow flag", "pedal"], a: 0, e: "Fee name." },
        ],
        sq: { q: "Never ask about fees?", o: ["No — ask", "Yes"], a: 0, e: "Ask." },
      },
      6: {
        title: "Keep more of your own snowball",
        blurb: "Low-cost mix + years + 20%. That is the whole trick, said plainly.",
        points: [
          "You cannot control markets. You can control fees, mix, time, and the 20%.",
          "Control the things you can.",
          "That is grown-up investing in kid words. Not licensed advice.",
        ],
        steps: ["Control 20%.", "Control mix.", "Control fees.", "Give time the rest."],
        qs: [
          { q: "You cannot control…", o: ["markets", "whether you add 20%", "whether you pick a cheaper bag"], a: 0, e: "Markets." },
          { q: "You can control…", o: ["fees, mix, time-in, 20%", "next year's price exactly", "the weather"], a: 0, e: "The plan." },
          { q: "This is licensed financial advice?", o: ["No", "Yes"], a: 0, e: "No. Learning only." },
        ],
        sq: { q: "Control the market's next week?", o: ["No", "Yes"], a: 0, e: "No." },
      },
    },
    patience: {
      1: {
        title: "Leave it alone",
        blurb: "Years, not minutes. Peeking every five minutes is a sport, not a plan.",
        points: [
          "The pot does not grow because you stare at it.",
          "Selling in a panic turns a wobble into a real loss.",
          "Have a plan. Then let time work.",
        ],
        steps: ["Add.", "Don't panic-sell a dip.", "Years."],
        qs: [
          { q: "Staring at the pot every five minutes…", o: ["does not make it grow", "prints gold", "is the 20% rule"], a: 0, e: "Doesn't help." },
          { q: "Panic-selling a dip…", o: ["can lock in the drop", "always wins", "is a helmet rule"], a: 0, e: "Locks it in." },
          { q: "Patience means…", o: ["years, not minutes", "never adding", "checking every second"], a: 0, e: "Years." },
        ],
        sq: { q: "Sell every time it wobbles?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      2: {
        title: "Dips happen",
        blurb: "Prices go down some years. That is not always the end of the plan.",
        points: [
          "Even famous bags have had bad years.",
          "A dip feels scary. The plan is written for scary days too.",
          "If you still have years, a dip can be a sale — not a fire.",
        ],
        steps: ["Dip.", "Check: is this week's food safe?", "If yes and years left, sit."],
        qs: [
          { q: "Famous bags have had…", o: ["bad years", "only perfect years", "no prices"], a: 0, e: "Bad years." },
          { q: "A dip with years left can be…", o: ["a sale, not a fire", "always the end", "a yellow flag to spend the lot"], a: 0, e: "Not always the end." },
          { q: "The plan is for…", o: ["scary days too", "only sunny days", "only Tuesdays"], a: 0, e: "Scary days too." },
        ],
        sq: { q: "One dip = always quit forever?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      3: {
        title: "News is loud. Plans are quiet.",
        blurb: "Loud is not the same as important.",
        points: [
          "Headlines want clicks. Your pot wants years.",
          "You do not need a new plan every time a headline shouts.",
          "If the three gates still pass, the plan can stay.",
        ],
        steps: ["Headline shouts.", "Gates still pass?", "Then keep the plan."],
        qs: [
          { q: "Headlines want…", o: ["clicks", "your 20% rule to succeed", "marshals"], a: 0, e: "Clicks." },
          { q: "A new plan every headline?", o: ["No", "Yes"], a: 0, e: "No." },
          { q: "Loud means important?", o: ["Not always", "Always"], a: 0, e: "Not always." },
        ],
        sq: { q: "Change the plan every shout?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      4: {
        title: "Boredom is allowed",
        blurb: "A good plan can look boring. Boring can be the feature.",
        points: [
          "Adding 20% and owning a cheap bag is not a movie.",
          "Movies skip the quiet years. Real pots need them.",
          "If it feels boring, you might be doing it right.",
        ],
        steps: ["Add.", "Own the list.", "Go and live the rest of your life."],
        qs: [
          { q: "A good plan can look…", o: ["boring", "like a car chase every day", "like a jump start"], a: 0, e: "Boring." },
          { q: "Movies skip the…", o: ["quiet years", "helmets", "£ sign"], a: 0, e: "Quiet years." },
          { q: "If it feels boring you might be…", o: ["doing it right", "failing", "a marshal"], a: 0, e: "Maybe right." },
        ],
        sq: { q: "If it's boring, quit and chase tips?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      5: {
        title: "Write the rules on a bad day",
        blurb: "Don't make the plan while you are scared. Make it while you are calm.",
        points: [
          "Calm-you writes: 20%, mix, years, never lunch money.",
          "Scared-you reads the card. Scared-you does not rewrite it.",
          "That is patience as a system, not a mood.",
        ],
        steps: ["Write the rules calm.", "Dip arrives.", "Read the card. Don't rewrite it scared."],
        qs: [
          { q: "Write the plan when you are…", o: ["calm", "terrified", "asleep at the wheel"], a: 0, e: "Calm." },
          { q: "Scared-you should…", o: ["read the card, not rewrite it", "throw the plan", "spend the pot"], a: 0, e: "Read it." },
          { q: "Patience as a system means…", o: ["rules, not a mood", "guessing", "flags"], a: 0, e: "Rules." },
        ],
        sq: { q: "Rewrite the whole plan in a panic?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      6: {
        title: "The whole money course on one card",
        blurb: "20%. Mix. Cheap. Years. Never this week's food. Not licensed advice.",
        points: [
          "Pay yourself first.",
          "Own a wide cheap bag. Maybe a little metal. Spice only if you can shrug.",
          "Give it years. Past pictures are not promises.",
        ],
        steps: ["20%.", "Mix.", "Cheap.", "Years.", "Food safe."],
        qs: [
          { q: "The heavy lifting is…", o: ["20% + bag + years", "one internet tip", "daily panic"], a: 0, e: "The simple plan." },
          { q: "Past returns are…", o: ["not a promise", "a contract", "a helmet"], a: 0, e: "Not a promise." },
          { q: "This course is licensed advice?", o: ["No — learning only", "Yes"], a: 0, e: "Learning only." },
        ],
        sq: { q: "Skip the card and follow a shout?", o: ["No", "Yes"], a: 0, e: "Keep the card." },
      },
    },
  };

  const horseExtra = {
    water: {
      1: {
        title: "Water every day",
        blurb: "Horses drink a lot. Fresh water, every day, no excuses.",
        points: [
          "A horse needs fresh water every day — buckets get empty or icy.",
          "Check at least twice a day.",
          "If they have not drunk and seem quiet, tell an adult.",
        ],
        steps: ["Look in the bucket.", "Empty or dirty? Refill (with help).", "Check again later."],
        qs: [
          { q: "Fresh water…", o: ["every day", "once a year", "never"], a: 0, e: "Every day." },
          { q: "Check water…", o: ["often (at least twice a day)", "once a decade", "never"], a: 0, e: "Often." },
          { q: "Quiet and not drinking?", o: ["tell an adult", "ignore it", "give chocolate"], a: 0, e: "Tell someone." },
        ],
        sq: { q: "One dirty bucket a year is enough?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      2: {
        title: "Ice, slime and empty buckets",
        blurb: "Winter ice. Summer slime. Both mean 'fix the water'.",
        points: [
          "Ice in a bucket is not a drink. Break it or swap it (with help).",
          "Green slime is dirty — scrub and refill.",
          "Automatic drinkers can still fail. Look with your eyes.",
        ],
        steps: ["Look.", "Ice or slime? Fix.", "Don't assume the gadget worked."],
        qs: [
          { q: "Ice in the bucket is…", o: ["not a drink until fixed", "fine", "a treat"], a: 0, e: "Fix it." },
          { q: "Green slime means…", o: ["scrub and refill", "extra vitamins", "ignore"], a: 0, e: "Dirty." },
          { q: "Automatic drinkers…", o: ["can still fail", "never fail", "replace hay"], a: 0, e: "Check anyway." },
        ],
        sq: { q: "Trust the gadget, never look?", o: ["No", "Yes"], a: 0, e: "Look." },
      },
      3: {
        title: "How much they drink",
        blurb: "Work, heat and hay-dry diets make them thirstier.",
        points: [
          "Hot day or hard work → more water.",
          "Lots of dry hay → more water than juicy grass.",
          "A sudden stop in drinking is a red flag — tell an adult.",
        ],
        steps: ["Hot work day.", "Offer plenty.", "Notice a sudden stop."],
        qs: [
          { q: "Hot work means…", o: ["more water", "no water", "only sweets"], a: 0, e: "More." },
          { q: "Dry hay diets often need…", o: ["more water", "no water", "ice cream"], a: 0, e: "More." },
          { q: "Sudden stop in drinking…", o: ["tell an adult", "celebrate", "ignore"], a: 0, e: "Tell someone." },
        ],
        sq: { q: "Work hard, skip water?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      4: {
        title: "Water in the field",
        blurb: "Troughs freeze, leak and get filthy. Field horses still need a drink.",
        points: [
          "A field trough is still a bucket, just bigger.",
          "Check it even if 'they have a stream' — streams can be low or icy.",
          "Herd bosses can guard a trough. Watch that quieter horses get a turn.",
        ],
        steps: ["Walk to the trough.", "Look and sniff.", "Watch shy horses drink."],
        qs: [
          { q: "Field horses still need…", o: ["checked water", "no water", "only snow"], a: 0, e: "Checked water." },
          { q: "A bossy horse can…", o: ["guard the trough", "fill the trough with gold", "replace hay"], a: 0, e: "Guard." },
          { q: "A stream always means enough?", o: ["No — check", "Yes always"], a: 0, e: "Check." },
        ],
        sq: { q: "Never check a field trough?", o: ["No", "Yes"], a: 0, e: "Check." },
      },
      5: {
        title: "Travel and competition days",
        blurb: "Horses still drink when the day is busy. Offer, don't assume.",
        points: [
          "On a show or travel day, offer water when you can.",
          "Some horses are fussy away from home — still offer.",
          "Dehydration is a grown-up/vet problem. You notice and tell.",
        ],
        steps: ["Busy day.", "Offer water.", "Tell an adult if they refuse for ages."],
        qs: [
          { q: "Busy days…", o: ["still need water offers", "mean no water", "replace water with sweets"], a: 0, e: "Still offer." },
          { q: "Fussy away from home?", o: ["still offer", "give up forever", "only cola"], a: 0, e: "Offer." },
          { q: "You notice and…", o: ["tell an adult", "tweet it only", "ignore"], a: 0, e: "Tell." },
        ],
        sq: { q: "Skip water because it's a show?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      6: {
        title: "Water is care, not a chore you skip",
        blurb: "The best riders still check the bucket.",
        points: [
          "Fancy riding does not replace water.",
          "A champion yard still does the boring checks.",
          "If you remember one thing: look in the bucket.",
        ],
        steps: ["Arrive.", "Bucket first.", "Then the fun work."],
        qs: [
          { q: "Fancy riding replaces water?", o: ["No", "Yes"], a: 0, e: "No." },
          { q: "Champion yards…", o: ["still do boring checks", "skip water", "only jump"], a: 0, e: "Checks." },
          { q: "One thing to remember…", o: ["look in the bucket", "ignore water", "only braid manes"], a: 0, e: "Bucket." },
        ],
        sq: { q: "Skip the bucket because you can rise to trot?", o: ["No", "Yes"], a: 0, e: "No." },
      },
    },
    grooming: {
      1: {
        title: "Grooming",
        blurb: "Brushing keeps the coat clean and lets you look at the skin.",
        points: [
          "Grooming is brushing — not shouting, not painting with jam.",
          "Start at the neck, work back. Be gentle on bony bits.",
          "It is also a check: lumps, cuts, mud in places mud should not be.",
        ],
        steps: ["Brush neck to back.", "Look as you go.", "Tell an adult about cuts."],
        qs: [
          { q: "Grooming is…", o: ["brushing the coat", "shouting", "skipping the horse"], a: 0, e: "Brushing." },
          { q: "Be gentle on…", o: ["bony bits", "nothing", "only the fence"], a: 0, e: "Bony bits." },
          { q: "Grooming is also a…", o: ["check for cuts", "race", "kart session"], a: 0, e: "A check." },
        ],
        sq: { q: "Shout instead of brush?", o: ["No", "Yes"], a: 0, e: "Brush." },
      },
      2: {
        title: "Hooves and a curry comb",
        blurb: "Pick out feet (with help). Mud hides stones.",
        points: [
          "A curry comb loosens mud (used the way you are taught).",
          "Hooves: pick from heel to toe, watch for stones.",
          "A stone left in can make a horse sore.",
        ],
        steps: ["Loosen mud.", "Pick the hoof with help.", "Look for stones."],
        qs: [
          { q: "A stone in a hoof can…", o: ["make them sore", "be lucky always", "replace shoes"], a: 0, e: "Sore." },
          { q: "Pick out feet…", o: ["with help, properly", "by kicking", "never"], a: 0, e: "With help." },
          { q: "Mud can hide…", o: ["stones", "gold coins always", "flags"], a: 0, e: "Stones." },
        ],
        sq: { q: "Leave a stone in?", o: ["No", "Yes"], a: 0, e: "Pick it." },
      },
      3: {
        title: "Mane, tail, face",
        blurb: "Gentle on the face. Don't yank the tail like a rope.",
        points: [
          "Tails have bones at the top. Support, don't yank.",
          "Face: soft brush, no poking eyes.",
          "Tangles come out slowly. Patience is kind.",
        ],
        steps: ["Soft on the face.", "Support the tail.", "Slow on tangles."],
        qs: [
          { q: "Yank the tail?", o: ["No", "Yes"], a: 0, e: "No." },
          { q: "On the face, use…", o: ["a soft brush, carefully", "a yard broom in the eye", "a hose in the ear for fun"], a: 0, e: "Soft." },
          { q: "Tangles come out…", o: ["slowly", "with one huge rip", "never"], a: 0, e: "Slow." },
        ],
        sq: { q: "Rip tangles in one go?", o: ["No", "Yes"], a: 0, e: "Slow." },
      },
      4: {
        title: "After work",
        blurb: "Sweaty horses need a wash-down or a good brush, then a check.",
        points: [
          "Sweat left to dry itchy is unkind.",
          "Cool them down — walk, then brush or wash as you are taught.",
          "Check girth and saddle patches for rubs.",
        ],
        steps: ["Walk to cool.", "Brush or wash.", "Look for rubs."],
        qs: [
          { q: "Leave them sweaty and walk away?", o: ["No", "Yes"], a: 0, e: "Cool and clean." },
          { q: "Rubs appear where…", o: ["kit sits", "the moon is", "the trough never is"], a: 0, e: "Under kit." },
          { q: "Cool down starts with…", o: ["a walk", "a sprint", "a jump-off"], a: 0, e: "Walk." },
        ],
        sq: { q: "Put them away hot and dirty?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      5: {
        title: "Skin stories",
        blurb: "Rain scald, mud fever — you don't treat them alone. You notice.",
        points: [
          "Sore, scabby, wet-white-leg skin can be a problem in mud.",
          "You don't invent cream plans. You show an adult.",
          "Dry, clean legs after mud help.",
        ],
        steps: ["See scabs.", "Show an adult.", "Help keep them cleaner/drier."],
        qs: [
          { q: "Scabby muddy legs…", o: ["show an adult", "ignore", "paint with jam"], a: 0, e: "Show someone." },
          { q: "You invent strong medicine?", o: ["No", "Yes"], a: 0, e: "No." },
          { q: "After mud, helping them dry/clean is…", o: ["useful", "banned", "a kart rule"], a: 0, e: "Useful." },
        ],
        sq: { q: "Hide a sore so you can still ride?", o: ["No", "Yes"], a: 0, e: "Show it." },
      },
      6: {
        title: "Grooming is conversation",
        blurb: "Your hands say 'I care'. The horse answers with how they stand.",
        points: [
          "A horse that fidgets may be sore, ticklish, or worried — not 'naughty' by default.",
          "Quiet hands, quiet voice.",
          "The best horse people still pick feet.",
        ],
        steps: ["Quiet.", "Watch their face.", "Adjust if they say 'ouch'."],
        qs: [
          { q: "Fidgeting might mean…", o: ["sore, ticklish, or worried", "always evil", "they want a kart"], a: 0, e: "Ask why." },
          { q: "Best horse people…", o: ["still pick feet", "skip care", "only compete"], a: 0, e: "Still care." },
          { q: "Quiet hands are…", o: ["kind and clear", "useless", "a yellow flag"], a: 0, e: "Kind." },
        ],
        sq: { q: "Call them naughty and ignore ouch?", o: ["No", "Yes"], a: 0, e: "Listen." },
      },
    },
    stable: {
      1: {
        title: "The stable",
        blurb: "Clean, dry bed. Fresh water. Air. Not a wet mess.",
        points: [
          "Wet dirty beds can make skin sore.",
          "Skip out droppings. Add dry bedding as you are taught.",
          "A stable is a bedroom. Would you sleep in that?",
        ],
        steps: ["Look at the bed.", "Skip out the wet bits.", "Check water."],
        qs: [
          { q: "A stable should be…", o: ["clean and dry", "soaking wet", "full of chocolate"], a: 0, e: "Dry." },
          { q: "Wet dirty beds can…", o: ["make skin sore", "win rosettes", "replace hay"], a: 0, e: "Sore skin." },
          { q: "Skip out means…", o: ["take out droppings", "skip the horse", "go karting"], a: 0, e: "Muck out the mess." },
        ],
        sq: { q: "Leave a soaking bed?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      2: {
        title: "Muck heap and tools",
        blurb: "Fork, skip, broom. Put tools away so nobody stands on a fork.",
        points: [
          "Tools have a home. A fork left tines-up is dangerous.",
          "Muck heap: where the dirty stuff goes — not the feed room.",
          "Work neatly. The next person should not trip.",
        ],
        steps: ["Fork the wet.", "Wheelbarrow to the heap.", "Tools away, tines down/safe."],
        qs: [
          { q: "A fork tines-up is…", o: ["dangerous", "tidy", "required"], a: 0, e: "Dangerous." },
          { q: "Muck goes on the…", o: ["muck heap", "feed room", "horse's back"], a: 0, e: "Heap." },
          { q: "Leave tools in the doorway?", o: ["No", "Yes"], a: 0, e: "Put them away." },
        ],
        sq: { q: "Tines up 'so you remember'?", o: ["No — unsafe", "Yes"], a: 0, e: "Unsafe." },
      },
      3: {
        title: "Air and light",
        blurb: "Horses like air. A sealed smelly box is unkind.",
        points: [
          "Dusty, stale air is bad for lungs.",
          "Don't shut every gap 'to be cosy' if it makes the box stale.",
          "Rugs if needed. Air anyway.",
        ],
        steps: ["Smell the box.", "Stale? More air (as the yard does it).", "Rug if they need warmth."],
        qs: [
          { q: "Stale dusty air is…", o: ["bad for lungs", "a treat", "required"], a: 0, e: "Bad." },
          { q: "Rugs replace air?", o: ["No", "Yes"], a: 0, e: "No." },
          { q: "A sealed smelly box is…", o: ["unkind", "perfect", "a jumping course"], a: 0, e: "Unkind." },
        ],
        sq: { q: "Shut every gap even if it stinks?", o: ["No", "Yes"], a: 0, e: "Air." },
      },
      4: {
        title: "In or out?",
        blurb: "Some horses live out. Some come in. Both still need checks.",
        points: [
          "Field: water, fence, rug, friends, feet.",
          "Stable: bed, water, hay, air.",
          "The question is 'are they comfortable and safe?', not 'what looks fancy'.",
        ],
        steps: ["Look at the horse, not the fashion.", "Comfortable? Safe?", "Fix the no's."],
        qs: [
          { q: "Field horses still need…", o: ["checks", "zero care", "only photos"], a: 0, e: "Checks." },
          { q: "The real question is…", o: ["comfortable and safe", "fanciest stable", "most rosettes today"], a: 0, e: "Comfort + safe." },
          { q: "Out always means no work for you?", o: ["No", "Yes"], a: 0, e: "Still check." },
        ],
        sq: { q: "Fancy box, miserable horse = good care?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      5: {
        title: "Fire and yard sense",
        blurb: "No playing with taps of hay as a joke. Know the yard's calm rules.",
        points: [
          "Hay and shavings burn. No silly sparks.",
          "Know where the adult is. Know the yard's emergency idea, simply.",
          "Aisle clear so a horse can be led out.",
        ],
        steps: ["Aisle clear.", "No silly fire risks.", "Know who to shout for."],
        qs: [
          { q: "Hay can…", o: ["burn", "swim", "replace water"], a: 0, e: "Burn." },
          { q: "Keep the aisle…", o: ["clear", "full of forks tines-up", "blocked for fun"], a: 0, e: "Clear." },
          { q: "Know who to…", o: ["shout for", "ignore", "race in a kart in the barn"], a: 0, e: "Shout for an adult." },
        ],
        sq: { q: "Block the aisle with a wheelbarrow 'just for a minute' forever?", o: ["No", "Yes"], a: 0, e: "Clear it." },
      },
      6: {
        title: "The yard is a team",
        blurb: "You leave it better than you found it. That's horsemanship.",
        points: [
          "Skip out even if 'you only popped in'.",
          "Fill water. Put tools away.",
          "Champions still sweep.",
        ],
        steps: ["Arrive.", "Leave it better.", "That's the standard."],
        qs: [
          { q: "Leave it…", o: ["better than you found it", "worse", "on fire"], a: 0, e: "Better." },
          { q: "Champions still…", o: ["sweep and skip out", "never do yard work", "skip water"], a: 0, e: "They still graft." },
          { q: "Pop in, skip the skip-out?", o: ["Not the standard", "The standard"], a: 0, e: "Do the small jobs." },
        ],
        sq: { q: "Yard work is below a 'real rider'?", o: ["False", "True"], a: 0, e: "It's the job." },
      },
    },
    tack: {
      1: {
        title: "Hat and tack",
        blurb: "Hat on every ride. Tack is the kit the horse wears.",
        points: [
          "A riding hat every time — not a baseball cap.",
          "Tack: saddle, bridle, girth — fitted by someone who knows.",
          "You check the girth (with help) so the saddle doesn't slip.",
        ],
        steps: ["Hat on.", "Tack fitted by a grown-up / instructor.", "Girth check."],
        qs: [
          { q: "Wear a…", o: ["riding hat", "baseball cap only", "no hat"], a: 0, e: "Riding hat." },
          { q: "Tack is…", o: ["the kit the horse wears", "a type of hay", "a kart pedal"], a: 0, e: "Saddle and bridle etc." },
          { q: "A loose girth can mean…", o: ["the saddle slips", "extra speed", "better jumps always"], a: 0, e: "Slips." },
        ],
        sq: { q: "Ride with no hat?", o: ["No", "Yes"], a: 0, e: "Hat on." },
      },
      2: {
        title: "Girth and stirrups",
        blurb: "Even both sides. Snug, not cruel.",
        points: [
          "Tighten a girth in stages, not one huge yank.",
          "Stirrups: about the length of your arm for a simple start (instructor's way wins).",
          "If something pinches, say so.",
        ],
        steps: ["Girth a little.", "Walk a step.", "Check again."],
        qs: [
          { q: "Tighten a girth…", o: ["in stages", "in one huge yank always", "never"], a: 0, e: "Stages." },
          { q: "If it pinches you…", o: ["say so", "hide it", "gallop"], a: 0, e: "Say so." },
          { q: "Instructor's way vs a random internet hack?", o: ["Instructor wins", "Internet always"], a: 0, e: "Instructor." },
        ],
        sq: { q: "Yank the girth as hard as you can in one go?", o: ["No", "Yes"], a: 0, e: "Stages." },
      },
      3: {
        title: "Bit and bridle, simply",
        blurb: "The bit sits in the mouth. Soft hands. No yanking.",
        points: [
          "A bridle holds the bit. The bit is a signal, not a brake like a kart's.",
          "Yank = unkind and unclear.",
          "If the bit looks crooked, ask — don't ride off.",
        ],
        steps: ["Look at the bit.", "Even?", "Soft hands."],
        qs: [
          { q: "Yank the mouth to say hello?", o: ["No", "Yes"], a: 0, e: "Unkind." },
          { q: "A bit is…", o: ["a signal", "a kart brake", "hay"], a: 0, e: "A signal." },
          { q: "Crooked bit?", o: ["ask, don't just go", "gallop anyway", "ignore"], a: 0, e: "Ask." },
        ],
        sq: { q: "Use the bit as a handle to pull yourself up?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      4: {
        title: "Fit is welfare",
        blurb: "A saddle that pinches is not 'making them rounder'. It hurts.",
        points: [
          "Saddle fit is a specialist / experienced adult job.",
          "White hairs, sores, or a horse that hates tacking up: tell someone.",
          "You can still check obvious: lumps under, girth galls, numnah flat.",
        ],
        steps: ["Look under the saddle area.", "Sore? Stop and tell.", "Don't 'push through'."],
        qs: [
          { q: "A pinching saddle…", o: ["hurts", "is a training tool", "is required"], a: 0, e: "Hurts." },
          { q: "Hates tacking up?", o: ["tell someone", "ignore", "add more tack"], a: 0, e: "Tell." },
          { q: "Fit is…", o: ["welfare", "fashion only", "a kart rule"], a: 0, e: "Welfare." },
        ],
        sq: { q: "Ride in a saddle that makes sores?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      5: {
        title: "Tack care",
        blurb: "Dirty cracked leather can snap. Clean it. Check stitches.",
        points: [
          "Wipe tack. Condition leather as the yard does.",
          "Look at stitching and holes — worn = tell an adult.",
          "A snapped stirrup leather is an accident waiting.",
        ],
        steps: ["Wipe.", "Look at stitches.", "Say if it looks tired."],
        qs: [
          { q: "Cracked leather can…", o: ["snap", "get stronger forever", "replace a hat"], a: 0, e: "Snap." },
          { q: "Tired stitching…", o: ["tell an adult", "ignore", "paint it gold"], a: 0, e: "Tell." },
          { q: "Tack care is…", o: ["safety", "only vanity", "optional for winners"], a: 0, e: "Safety." },
        ],
        sq: { q: "Ride in snapped-looking leather?", o: ["No", "Yes"], a: 0, e: "No." },
      },
      6: {
        title: "You and the horse, both kitted",
        blurb: "Your hat. Their fit. Then the ride. That order never flips.",
        points: [
          "People kit + horse kit, then mount.",
          "The best test riders still do the boring checks.",
          "If in doubt, don't get on.",
        ],
        steps: ["Your hat.", "Their tack check.", "Then mount."],
        qs: [
          { q: "Order is…", o: ["kit checks, then mount", "mount, then maybe hat", "gallop first"], a: 0, e: "Checks first." },
          { q: "If in doubt…", o: ["don't get on", "get on faster", "remove the hat"], a: 0, e: "Don't get on." },
          { q: "Boring checks are for…", o: ["everyone, including good riders", "only beginners", "only horses in books"], a: 0, e: "Everyone." },
        ],
        sq: { q: "Flip the order because you are late?", o: ["No", "Yes"], a: 0, e: "No." },
      },
    },
  };

  installLadder("karting", kartExtra);
  installLadder("investing", investExtra);
  installLadder("horses", horseExtra);

  if (typeof funInstallStages === "function") funInstallStages();
})();
