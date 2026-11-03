/**
 * Formula 1 for George, Horse world for Bella-Rose, plus a few extra
 * First steps lessons so an old finished path is not instantly complete.
 * Facts are evergreen. Season line-ups and "this year's champion" are not taught.
 */
(function installPassionCourses() {
  if (installPassionCourses.done) return;
  installPassionCourses.done = true;
  if (typeof SUBJECTS === "undefined" || typeof SKILLS === "undefined" || typeof TEACH_MODULES === "undefined") return;

  SUBJECTS.f1 = {
    id: "f1",
    name: "Formula 1",
    emoji: "🏁",
    colour: "f1",
    fun: true,
    forLearner: "george",
    illust: "assets/illust/george/hero.jpg",
    illustAlt: "Formula-style racing car on track",
  };
  SUBJECTS.horseworld = {
    id: "horseworld",
    name: "Horse world",
    emoji: "🏇",
    colour: "horseworld",
    fun: true,
    forLearner: "bella",
    illust: "assets/illust/bella/hero.jpg",
    illustAlt: "A horse and a golden miniature poodle",
  };
  if (typeof ILLUST_LEARNER !== "undefined") {
    if (ILLUST_LEARNER.george) {
      ILLUST_LEARNER.george["subject-f1"] = {
        src: "assets/illust/george/hero.jpg",
        alt: "Formula-style racing car — George's Formula 1 course",
      };
    }
    if (ILLUST_LEARNER.bella) {
      ILLUST_LEARNER.bella["subject-horseworld"] = {
        src: "assets/illust/bella/hero.jpg",
        alt: "Horse world — Bella-Rose's course beside daily horse care",
      };
    }
  }

  const F1 = (globalThis.FUN_F1_STAGES = {});
  const HW = (globalThis.FUN_HORSEWORLD_STAGES = {});
  for (let s = 2; s <= 6; s++) {
    F1[s] = {};
    HW[s] = {};
  }

  function qOf(item, ramp) {
    if (item[0] === "m") {
      return { q: item[1], type: "multi", options: item[2], answer: item[3], explain: item[4], stage: "both", ramp: ramp };
    }
    return { q: item[1], type: "typed", answer: String(item[2]), explain: item[3], stage: "both", ramp: ramp };
  }

  function put(subject, bank, id, name, stage, title, blurb, points, steps, practice, help, helpQ) {
    if (!SKILLS[subject]) SKILLS[subject] = {};
    if (!SKILLS[subject][id]) SKILLS[subject][id] = { name: name, gcse: "Fun" };
    const home = stage <= 1 ? TEACH_MODULES : bank;
    if (!home[subject]) home[subject] = {};
    const target = stage <= 1 ? home[subject] : home[stage];
    target[id] = {
      title: title,
      blurb: blurb,
      videoKey: "",
      teach: { points: points, visual: "" },
      example: { title: "Worked example", steps: steps },
      practice: practice.map((item, i) => qOf(item, i === practice.length - 1 && stage >= 4 ? 2 : 1)),
      struggle: { points: [help], practice: [qOf(helpQ, 1)] },
    };
  }

  function f1(id, name, stage, title, blurb, points, steps, practice, help, helpQ) {
    put("f1", F1, id, name, stage, title, blurb, points, steps, practice, help, helpQ);
  }
  function hw(id, name, stage, title, blurb, points, steps, practice, help, helpQ) {
    put("horseworld", HW, id, name, stage, title, blurb, points, steps, practice, help, helpQ);
  }

  // —— Formula 1 ——
  f1("f-teams", "Teams", 1, "A team and a driver", "Two championships, not one.",
    ["The drivers' championship is for the person in the car.", "The constructors' championship is for the team.", "Ferrari has been in the championship since it began in 1950. Line-ups change every season, so we do not memorise this year's names."],
    ["A driver scores points.", "The team scores points too.", "They are two different cups."],
    [["m", "The drivers' championship is for…", ["the person in the car", "only the tyres", "the flag", "the crowd"], 0, "It is the driver's title."],
     ["m", "The constructors' championship is for…", ["the team", "the weather", "one lap only", "the national anthem"], 0, "Constructor means the team."],
     ["m", "Why do we not learn this season's driver line-up by heart?", ["teams change drivers", "drivers are not real", "there is only one team", "flags replaced drivers"], 0, "A line-up is for that season. The idea of a team stays."]],
    "Ferrari's story is long.",
    ["m", "Ferrari has raced in the championship since…", ["1950", "last Thursday only", "the Moon landings as the start", "there is no such team"], 0, "The championship began in 1950 and Ferrari was there."]);

  f1("f-teams", "Teams", 2, "What a team does", "More people than the driver.",
    ["Mechanics, engineers and the pit crew are the team as well as the drivers.", "A team may run two cars.", "The people you see on television are only part of the garage."],
    ["One car needs a crew.", "A second car needs a crew too.", "Both cars belong to the same constructor."],
    [["m", "Who else, besides the driver, makes the car go racing?", ["mechanics and engineers", "only the spectators", "the chequered flag by itself", "nobody"], 0, "A team is a lot of people."],
     ["m", "A constructor may enter…", ["two cars", "no cars", "only a horse", "only a flag"], 0, "Two cars is the usual idea. The exact number is in that year's rules."],
     ["m", "The garage you do not see on television…", ["still does real work", "does not exist", "drives the car", "waves the chequered flag"], 0, "Design and preparation happen out of shot."]],
    "The driver is the visible part.",
    ["m", "The driver is…", ["one person in a much bigger team", "the entire team", "a flag", "a circuit"], 0, "One job among many."]);

  f1("f-teams", "Teams", 3, "Names change", "The job of a team stays.",
    ["Teams have been bought, renamed and repainted many times.", "The famous red Italian team associated with Ferrari is the one that has stayed since 1950.", "A new name on a shirt does not change what a constructor is."],
    ["Last decade's team name may not be on the grid now.", "We learn the idea, not a list that expires."],
    [["m", "Team names over the years…", ["can change", "are fixed forever by law", "are the same as flag colours", "do not matter so there are no teams"], 0, "Names change. The job does not."],
     ["m", "Which fact is safe to remember?", ["Ferrari has been part of the championship since 1950", "the same two drivers always drive for every team", "this year's champion is printed in the lesson", "there is one team"], 0, "1950 is history. A line-up is not."],
     ["m", "A constructor is…", ["the team that enters the car", "a type of tyre only", "a flag", "a lap time"], 0, "Constructor is the official word for the team."]],
    "Do not bet a badge on a rumour.",
    ["m", "If a website says who drives for a team this weekend, you should…", ["treat it as this season's news, not a forever fact", "carve it into the lesson", "ignore that teams exist", "change the flag colours"], 0, "News expires. The idea of a team does not."]);

  f1("f-teams", "Teams", 4, "Points for two cups", "The exact table can change.",
    ["Whoever finishes higher usually scores more points.", "The exact numbers, such as 25 for a win, are in that year's rule book and have changed before.", "Both the driver and the team can score from the same race."],
    ["A win is worth the most.", "We do not memorise a table that the rule book can edit."],
    [["m", "The points table…", ["is set in the rule book and can be changed", "has been the same numbers since 1950 with no edits", "is a secret with no meaning", "is the same as a pit stop"], 0, "Learn that a win scores most. Check the current table if you need the numbers."],
     ["m", "One race can score points for…", ["the driver and the team", "neither", "only the crowd", "only the tyres"], 0, "Both championships use the race."],
     ["m", "A sensible thing to remember is…", ["a higher finish usually scores more", "eighth place always beats first", "points are laps", "points are flags"], 0, "Higher is usually richer in points."]],
    "The winner of the season is not in this lesson.",
    ["m", "Does this course name the current world champion?", ["no — that changes, and the lesson would go stale", "yes, it is fixed in the code forever"], 0, "We teach history that stays true."]);

  f1("f-teams", "Teams", 5, "Home races", "A driver's passport is not the team's.",
    ["A team can be based in one country and employ drivers from others.", "Silverstone is in Britain. Monza is in Italy. Monaco is a street race around a town.", "The crowd's home hero can drive for a team based somewhere else."],
    ["Read the passport and the team's base as two facts.", "They do not have to match."],
    [["m", "A driver and their team…", ["can come from different countries", "must share a passport", "must share a flag colour with the circuit", "are the same person"], 0, "Teams hire talent from many places."],
     ["m", "Monza is in…", ["Italy", "Japan", "the sea only", "a pit box"], 0, "Monza is the famous Italian circuit."],
     ["m", "Monaco is famous as…", ["a street circuit", "a desert oval with no corners", "a horse track", "a wind tunnel only"], 0, "The race runs on closed streets."]],
    "Silverstone is the British round's famous home.",
    ["m", "Silverstone is in…", ["Britain", "Japan", "Belgium only", "space"], 0, "It is the best-known British grand prix circuit."]);

  f1("f-teams", "Teams", 6, "Two cups, one garage", "Put the team ideas together.",
    ["Driver's title, team's title.", "Names change. Ferrari's 1950 start does not.", "A line-up is news. A constructor is the idea."],
    ["You can explain a team without naming this year's drivers."],
    [["m", "Which sentence stays true next season?", ["A constructor is the team that enters the car", "These two named drivers will share a car forever", "The points table can never change", "There is no drivers' championship"], 0, "The definition survives a new season."],
     ["m", "A season's line-up is…", ["news, not a forever list", "the same list since 1950", "a flag", "a lap time"], 0, "It expires."],
     ["m", "Points from a race can go to…", ["driver and team", "the circuit only", "the Sun", "nobody"], 0, "Two championships."]],
    "Say it in one line.",
    ["m", "Ferrari's link with the championship started in…", ["1950", "yesterday", "the year 3000", "there is no link"], 0, "The first championship season."]);

  f1("f-flags", "Flags", 1, "The flags that matter first", "Yellow, green, red, chequered.",
    ["Yellow means danger — slow down, no overtaking.", "Green means go, or that the caution is over.", "Red means stop. Chequered means the session is finished."],
    ["You see yellow.", "Lift off. Do not pass.", "Wait for the message that racing is on again."],
    [["m", "A yellow flag means…", ["slow down, no overtaking", "go faster", "the race is finished", "you have won"], 0, "Yellow is caution."],
     ["m", "A chequered flag means…", ["the session is finished", "danger, speed up", "pit for petrol immediately", "a horse is loose"], 0, "Chequered is the finish."],
     ["m", "A red flag means…", ["stop", "overtake now", "ignore the marshal", "a faster lap is required"], 0, "Red stops the session."]],
    "Green is the opposite of a caution.",
    ["m", "Green means…", ["go, or the caution is over", "stop forever", "the car is on fire only", "lunch"], 0, "Green is proceed."]);

  f1("f-flags", "Flags", 2, "Blue, white and stripes", "More flags, still the same idea.",
    ["A blue flag means a faster car is behind you. Let it past.", "A white flag warns of a slow car ahead.", "Yellow and red stripes mean the surface is slippery — oil or debris."],
    ["Blue in your mirrors.", "Hold the line and let the faster car through.", "Do not fight it."],
    [["m", "A blue flag means…", ["a faster car is behind — let it past", "you won", "the surface is fine and you should defend hard", "stop on track"], 0, "Blue is about the faster car."],
     ["m", "Yellow and red stripes warn that…", ["the surface is slippery", "the race is finished", "you must refuel in the old way", "a horse is on track"], 0, "Slippery surface."],
     ["m", "A white flag warns of…", ["a slow car ahead", "the winner", "a green light to overtake wildly", "rain is illegal"], 0, "Slow vehicle."]],
    "Black is serious.",
    ["m", "A black flag is shown to a driver who…", ["must come in, often for a rule break", "has won", "should set a faster lap", "needs a drink"], 0, "Black means come to the pits and see the officials."]);

  f1("f-flags", "Flags", 3, "Same colours in karting", "The warnings match on purpose.",
    ["Karting uses the same main colours so a driver can move up without learning a new language.", "Yellow is still no overtaking.", "If you do not know a flag, slow down and ask at the next briefing."],
    ["You already know yellow from karting.", "It means the same kind of caution in Formula 1."],
    [["m", "Why are kart flags and Formula 1 flags so similar?", ["drivers need the same warnings at every level", "flags are only decoration", "Formula 1 invented helmets", "colours mean nothing"], 0, "The warning has to be instant."],
     ["m", "Under yellow, overtaking is…", ["not allowed", "compulsory", "only for the leader", "a type of pit stop"], 0, "No overtaking."],
     ["m", "A flag you do not recognise yet means you should…", ["be cautious and ask later", "treat it as green", "invent a meaning", "close your eyes"], 0, "Caution first. Briefings teach the rest."]],
    "Chequered is still the finish.",
    ["m", "In a kart race, the chequered flag still means…", ["finished", "speed up", "slippery", "blue"], 0, "Same idea."]);

  f1("f-flags", "Flags", 4, "Marshals", "Flags are people, not magic.",
    ["A marshal waves the flag. You obey the flag, not a guess.", "Marshals wear bright colours so you can see them.", "Never drive at a marshal. They are standing in a dangerous place to help you."],
    ["See the yellow.", "See the person waving it.", "Slow down."],
    [["m", "You obey…", ["the flag the marshal shows", "your own invention", "the loudest engine", "a guess from the grandstand"], 0, "The flag is the instruction."],
     ["m", "Marshals wear bright colours so…", ["you can see them", "the car goes faster", "the rules disappear", "tyres last longer"], 0, "Visibility."],
     ["m", "Driving towards a marshal is…", ["never the plan", "a way to say thanks", "required under green", "how a pit stop starts"], 0, "Give them space."]],
    "The briefing is where new flags are explained.",
    ["m", "A new flag colour should be learned…", ["in the briefing, before you need it", "at full speed", "after you ignore it", "never"], 0, "Learn it before the start."]);

  f1("f-flags", "Flags", 5, "Safety car and red", "Sometimes the whole race slows or stops.",
    ["A safety car leads the field slowly while a problem is cleared. Passing it is not the game.", "A red flag stops the session.", "The exact safety-car rules are in that year's book. The idea is: slow down and bunch up safely."],
    ["Hazard on track.", "Safety car picks up the leader.", "Everybody slows."],
    [["m", "A safety car is used to…", ["slow the field while a danger is cleared", "start a party", "replace the chequered flag every lap", "refuel the leaders in a banned era"], 0, "It controls the speed."],
     ["m", "When the safety car is out, the main idea is…", ["be controlled and do not race past it", "overtake as often as you can", "stop on the racing line", "ignore flags"], 0, "The field is being kept safe."],
     ["m", "A red flag, compared with yellow…", ["stops the session rather than only cautioning it", "means go faster", "is only for the winner", "is a tyre colour"], 0, "Red is stop."]],
    "Rules around restarts can change.",
    ["m", "The exact restart rule…", ["can be updated in the rule book", "has never changed since 1950", "is a secret you invent", "is the same as a horse's gait"], 0, "Learn the idea. Check the year's rules for the detail."]);

  f1("f-flags", "Flags", 6, "Flags together", "One colour, one action.",
    ["Yellow: slow, no passing.", "Blue: let a faster car through.", "Red: stop. Chequered: finished. Stripes: slippery."],
    ["You can say the action without looking it up."],
    [["m", "Slippery surface is shown by…", ["yellow and red stripes", "a chequered flag", "a plain green only", "a blue flag"], 0, "Stripes mean the grip has changed."],
     ["m", "Finished is shown by…", ["chequered", "blue", "white", "stripes"], 0, "Chequered ends it."],
     ["m", "Let a faster car past is…", ["blue", "red", "chequered", "black for a win"], 0, "Blue is the faster car behind."]],
    "Black is not a prize.",
    ["m", "A black flag means…", ["come in to the officials", "you won the championship", "the surface is perfect", "green"], 0, "It is a serious instruction."]);

  f1("f-pits", "Pit stops", 1, "Why the car stops", "Fresh tyres. A still car.",
    ["A pit stop is a planned stop in the team's box.", "The usual job in modern races is fresh tyres. Refuelling during the race has been banned for many seasons — the year's rules are the ones the team follows.", "Nobody works on the car until it is stopped."],
    ["The driver stops on the marks.", "The crew changes the wheels.", "The car leaves when it is released."],
    [["m", "A pit stop is mainly, in recent rule books…", ["a stop for fresh tyres", "a place to have lunch", "a chance to change the driver for a horse", "the chequered flag"], 0, "Tyres are the usual reason. Fuel rules can change, so the team follows the book."],
     ["m", "The crew should touch the car…", ["when it has stopped", "while it is still racing down the pit lane at speed", "before it arrives, by standing in the fast lane", "never, even when it is still"], 0, "Still, then work."],
     ["m", "The pit box is…", ["the team's marked space", "the start lights", "a grandstand", "a flag"], 0, "Each team has its box."]],
    "The release has to be safe.",
    ["m", "The car should leave…", ["when the crew releases it and the lane is clear", "whenever the driver feels like bouncing off the jacks", "under a red flag at full speed", "without its wheels"], 0, "Released, and clear."]);

  f1("f-pits", "Pit stops", 2, "Wheel guns and jacks", "Seconds, if the practice was good.",
    ["A wheel gun undoes and does up the nut.", "A jack lifts the car so the wheels can come off.", "A good stop is a few seconds. A slow stop can cost track position. Rushing unsafely can cost more."],
    ["Gun off. Wheel off. New wheel. Gun on. Down. Go."],
    [["m", "A wheel gun is used to…", ["undo and tighten the wheel nut", "wave a yellow flag", "fill the petrol tank in a banned era", "steer"], 0, "It is a powered spanner."],
     ["m", "The jack…", ["lifts the car", "is a flag", "is the driver", "is the chequered flag"], 0, "The wheels need to be free of the ground."],
     ["m", "A pit stop that is fast but unsafe…", ["can cost more than a slow one", "is always the right choice", "is how flags work", "scores 25 points by itself"], 0, "A loose wheel is worse than a slow stop."]],
    "Practice is the secret.",
    ["m", "Crews practise stops because…", ["the actions have to be automatic and safe", "the rules ban practice", "stops are illegal", "the driver changes the tyres alone from the seat"], 0, "Repetition makes it quick without being wild."]);

  f1("f-pits", "Pit stops", 3, "The pit lane", "A speed limit lives there.",
    ["The pit lane has a speed limit. It is not the straight.", "The fast lane is for moving. The inner lane by the boxes is where you stop.", "Crossing in front of another car in the lane is how people get hurt."],
    ["Enter the pit lane.", "Slow to the limit.", "Stop in your box, not in the fast lane."],
    [["m", "In the pit lane you must…", ["obey the speed limit", "go as fast as on the straight", "overtake under red", "stop in the fast lane and chat"], 0, "The limit is part of the rule."],
     ["m", "You stop…", ["in your team's box", "in the fast lane", "on the racing line", "in the grandstand"], 0, "The box is the marked space."],
     ["m", "Pulling out in front of a car in the pit lane is…", ["dangerous", "the point of a stop", "required", "a blue flag"], 0, "Look, then release."]],
    "The limiter helps the driver obey.",
    ["m", "A pit-lane speed limiter is there to…", ["help the driver stay under the limit", "make the car fly", "remove the wheels", "replace the flags"], 0, "It holds the speed down."]);

  f1("f-pits", "Pit stops", 4, "Strategy", "When you stop is a choice.",
    ["Stopping early gives you fresh tyres for longer, but you fight through traffic.", "Stopping later keeps track position, but the tyres may be tired.", "There is no single magic lap. The team watches the tyres and the cars around you."],
    ["Old tyres are slow.", "A stop costs time in the lane.", "The fresh tyres have to earn that time back."],
    [["m", "A pit stop costs time because…", ["you are in the lane instead of on the racing line", "fresh tyres are slower forever", "the chequered flag is in the box", "flags stop working"], 0, "The stop has to be paid back on track."],
     ["m", "Fresh tyres usually…", ["grip better than worn ones", "are always worse", "are illegal", "remove the need to steer"], 0, "That grip is why you stop."],
     ["m", "The best lap to stop…", ["depends on tyres and traffic", "is always lap 1", "is a secret that never changes", "does not exist so cars never stop"], 0, "Strategy is a choice, not a chant."]],
    "Traffic matters.",
    ["m", "Coming out of the pits into a pack of cars means…", ["you may lose time behind them", "you automatically lead the race", "the stop did not happen", "yellow is cancelled"], 0, "Track position can vanish in traffic."]);

  f1("f-pits", "Pit stops", 5, "Undercut, in kid words", "Stopping first can jump someone.",
    ["If you stop before the car ahead, your fresh tyres might go quicker than their old ones.", "People call that an undercut. It does not always work.", "If they stop and you stay out, you need your tyres to survive."],
    ["You pit.", "They stay out on old tyres.", "You may be ahead when they finally stop."],
    [["m", "An undercut means…", ["you stop first and try to jump ahead on fresher tyres", "you ignore the pit lane", "you take the chequered flag in the garage", "you change the flag colours"], 0, "First stop, then pace, then they lose time when they stop."],
     ["m", "Does an undercut always work?", ["no", "yes, it is a law"], 0, "Traffic, safety cars and tyre life can spoil it."],
     ["m", "Staying out longer can help if…", ["your tyres still have grip and you keep the place", "tyres never wear", "the pit lane is the racing line", "red means go"], 0, "Track position is worth keeping when the tyres allow it."]],
    "A safety car can change the sums.",
    ["m", "A safety car during a stop window can…", ["change who gains from pitting", "delete the race", "make tyres last forever", "ban the team"], 0, "The field bunches up, so a stop costs less time."]);

  f1("f-pits", "Pit stops", 6, "A safe stop", "Fast is the bonus. Safe is the job.",
    ["Stopped car. Wheels changed. Nuts tight. Jack down. Lane clear. Then go.", "A few seconds is normal for a clean Formula 1 stop. Kart pit stops, if your club has them, are calmer and slower.", "Fuel during the race follows that year's rules. Do not assume."],
    ["Check the nut.", "Check the lane.", "Then the driver leaves."],
    [["m", "The order that matters is…", ["stop, change wheels, release when safe", "release, then hope the wheels are on", "change wheels at full speed", "skip the stop and call it done"], 0, "Still, then work, then go."],
     ["m", "A loose wheel is…", ["worse than a slow stop", "a clever strategy", "a blue flag", "impossible"], 0, "Safety beats the stopwatch."],
     ["m", "Refuelling during a race…", ["depends on that year's rules", "has been compulsory every year since 1950", "is done by the driver with a bottle", "is a flag"], 0, "Do not memorise a fuel rule as eternal."]],
    "Say the job in one line.",
    ["m", "In recent seasons a stop is mostly for…", ["tyres", "changing the circuit", "a haircut", "the national anthem"], 0, "Tyres."]);

  f1("f-car", "How the car works", 1, "Wings, tyres and brakes", "Three ideas, no equations.",
    ["Wings push the car down onto the tyres. That push is called downforce.", "Slick tyres are smooth, for dry tracks. Wet tyres have grooves.", "Brakes turn speed into heat. They can get too hot and then work less well."],
    ["More downforce helps in corners.", "It can slow you on the straight, because the air also drags."],
    [["m", "Downforce is…", ["a push downward from the wings that helps the tyres grip", "a flag", "an upward hop", "a type of sandwich"], 0, "The wings squash the car onto the track."],
     ["m", "Slick tyres are for…", ["dry tracks", "deep snow only", "the pit wall decoration", "horses"], 0, "Smooth rubber for the dry."],
     ["m", "Brakes get hot because…", ["they turn speed into heat", "they are painted red only", "heat is illegal so they stay cold", "the driver waves them"], 0, "Rubbing pads on a disc makes heat."]],
    "Grooves in the wet.",
    ["m", "Wet-weather tyres have grooves so they can…", ["clear water", "look like slicks", "replace the brakes", "fly"], 0, "Grooves move water out of the way."]);

  f1("f-car", "How the car works", 2, "Soft and hard", "Grip against how long the tyre lasts.",
    ["Softer rubber grips more and wears out faster.", "Harder rubber lasts longer and grips less.", "The colours painted on tyres change by season. Remember the idea, not this year's colour chart."],
    ["A soft tyre is lovely for a short run.", "It may be finished before the stint is."],
    [["m", "Softer rubber usually…", ["grips more and wears faster", "lasts forever and grips less", "is a flag", "is a brake disc"], 0, "Grip and life are a trade."],
     ["m", "Why not memorise this year's tyre colours?", ["the chart can change", "tyres have no colours ever", "colours are the points table", "slicks are illegal"], 0, "The idea is softer versus harder."],
     ["m", "Harder rubber usually…", ["lasts longer", "melts on the formation lap for certain", "is only for horses", "cannot be fitted"], 0, "It gives up some grip to last."]],
    "The team chooses.",
    ["m", "Choosing a tyre is about…", ["grip now against life later", "the driver's favourite colour only", "ignoring the track", "the chequered flag's cloth"], 0, "A trade, not a fashion."]);

  f1("f-car", "How the car works", 3, "Drag", "Air holds you back as well as pushing you down.",
    ["Drag is the air resisting the car.", "A big wing adds downforce and also adds drag.", "Teams trim the wing: more corner grip, or more straight-line speed."],
    ["A big wing sticks the car in a slow corner.", "On the straight, that same wing can hold it back."],
    [["m", "Drag is…", ["air holding the car back", "a downwards-only word with no slow-down", "a pit stop", "a flag"], 0, "Drag resists forward movement."],
     ["m", "A bigger wing often…", ["helps corners and hurts the straight", "removes all drag", "replaces the brakes", "is illegal to think about"], 0, "Downforce and drag come together."],
     ["m", "Trimming the wing means…", ["choosing a balance between corner and straight", "cutting it off with scissors during the race", "painting it chequered", "removing the tyres"], 0, "It is a setup choice."]],
    "Slipstreaming is sitting in someone's drag shadow.",
    ["m", "Tucking behind another car on a straight can…", ["reduce the drag on your car", "increase your downforce for certain", "stop the engine", "change the flag"], 0, "You sit in the hole in the air they have made."]);

  f1("f-car", "How the car works", 4, "Brakes in more detail", "Pads, discs and heat.",
    ["A pad squeezes a disc that spins with the wheel.", "The energy of the speed becomes heat.", "If the brakes get too hot they can fade, which means they stop less well. Cooling ducts send air at the discs."],
    ["Big stop into a slow corner.", "The discs glow with heat.", "They need air before the next big stop."],
    [["m", "Brake fade means…", ["the brakes work less well when they are too hot", "the brakes get stronger without limit", "the wing has fallen off", "the flag is blue"], 0, "Too much heat, less stopping."],
     ["m", "A brake disc spins with…", ["the wheel", "the steering wheel only", "the flag", "the pit board"], 0, "It is attached to the wheel's rotation."],
     ["m", "Cooling ducts…", ["send air at the brakes", "fill the car with water", "are tyres", "are the seatbelt"], 0, "Air carries heat away."]],
    "Smooth braking helps.",
    ["m", "Stamping and releasing wildly can…", ["upset the tyres and the balance", "always be faster", "cool the discs instantly", "be the same as a yellow flag"], 0, "Smooth pressure is easier on the car."]);

  f1("f-car", "How the car works", 5, "The power unit, without a parts list that expires", "Petrol plus an electric part.",
    ["A modern Formula 1 car uses a petrol engine and an electric part together.", "The exact size and the rules change every few years. Do not memorise a parts code as if it were forever.", "The electric part can recover energy when the car slows."],
    ["The petrol burns.", "The electric motor helps.", "Slowing down can put some energy back."],
    [["m", "A modern Formula 1 power unit…", ["combines petrol and an electric part", "is a horse", "is only a battery with no petrol, in the rules we grew up with", "is a flag"], 0, "Both parts. The exact recipe changes with the rules."],
     ["m", "Why not memorise the exact engine code?", ["the rules change", "engines are imaginary", "there is no petrol", "the code is a flag colour"], 0, "A new rule book can rewrite it."],
     ["m", "Energy recovery on the slow-down means…", ["some of the slowing can feed the electric part", "the brakes are removed", "fuel appears from nothing", "the chequered flag charges the car"], 0, "Harvesting, not magic."]],
    "The driver still steers.",
    ["m", "The power unit does not replace…", ["the driver's judgement", "the need for any wheels", "the tyres", "the wings"], 0, "The person in the seat still decides."]);

  f1("f-car", "How the car works", 6, "The whole car", "Grip, drag, heat.",
    ["Wings: downforce and drag.", "Tyres: softer grips more and wears faster. Slicks in the dry, grooves in the wet.", "Brakes: speed into heat. Too hot and they fade."],
    ["You can explain a car without a single equation."],
    [["m", "Downforce helps mostly in…", ["corners", "making the car weightless", "removing drag", "the pit restaurant"], 0, "It loads the tyres."],
     ["m", "Slicks are wrong when…", ["the track is wet", "the track is dry", "the car has wings", "the driver is wearing a helmet"], 0, "Wet tracks need grooves."],
     ["m", "Fade is a problem for…", ["overheated brakes", "fresh slick tyres on a dry track", "a chequered flag", "a blue flag used correctly"], 0, "Heat."]],
    "One sentence.",
    ["m", "Drag is the price you often pay for…", ["a lot of downforce", "having no wings at all", "a slower pit stop", "a red flag"], 0, "Big wings drag."]);

  f1("f-history", "History", 1, "1950", "The championship has a birthday.",
    ["The Formula 1 world championship began in 1950.", "The first championship race was at Silverstone in Britain.", "Cars and rules from 1950 would not be allowed today. The sport has got much safer."],
    ["1950. Silverstone. A championship, not just one race."],
    [["m", "The world championship began in…", ["1950", "2014", "last year only", "1850"], 0, "1950 is the start."],
     ["m", "The first championship race was at…", ["Silverstone", "a street in Tokyo only", "the Moon", "Monaco in the year 1900"], 0, "Silverstone, 1950."],
     ["m", "Compared with 1950, the cars now are…", ["much safer", "exactly the same", "slower for certain and made of wood", "horses"], 0, "Safety has been rebuilt many times."]],
    "It is a world championship.",
    ["m", "1950 started…", ["a championship, not a single one-off race", "karting at your club", "the Moon", "horse racing"], 0, "A season of races."]);

  f1("f-history", "History", 2, "Fangio and Senna", "Closed stories.",
    ["Juan Manuel Fangio won five titles in the 1950s.", "Ayrton Senna won three titles: 1988, 1990 and 1991.", "Senna was killed in a race at Imola in 1994. That weekend changed safety work afterwards."],
    ["Five for Fangio. Three for Senna. Both numbers are finished stories."],
    [["m", "Fangio's five titles were in…", ["the 1950s", "the 2020s", "one afternoon", "karting cadets"], 0, "He was the star of the early championship."],
     ["m", "Senna won…", ["three titles", "twenty titles", "the Grand National", "no races"], 0, "1988, 1990 and 1991."],
     ["m", "After Senna's death in 1994, the sport…", ["worked harder on safety", "stopped using brakes", "banned helmets", "ended forever that week"], 0, "Imola 1994 pushed big safety changes."]],
    "Remember people as history.",
    ["m", "These stories are…", ["finished history", "this season's entry list", "a prediction", "a tyre colour chart"], 0, "They will not be rewritten by next year's grid."]);

  f1("f-history", "History", 3, "Schumacher and Hamilton", "Say what already happened.",
    ["Michael Schumacher won seven titles between 1994 and 2004.", "Lewis Hamilton became a seven-time champion in 2020.", "We do not guess whether anyone wins another title after this lesson was written."],
    ["Seven is the famous number for both.", "Hamilton's seventh was in 2020. That sentence stays true even if he wins another."],
    [["m", "Schumacher's seven titles were won…", ["between 1994 and 2004", "in the 1950s", "in one race", "in karting only"], 0, "A finished run of seasons."],
     ["m", "Hamilton became a seven-time champion in…", ["2020", "1950", "the future, which this lesson pretends to know", "a single pit stop"], 0, "2020 is the year of the seventh. Later titles are news, not this sentence."],
     ["m", "Why does the lesson avoid 'the current champion'?", ["it changes", "there is no championship", "champions are flags", "it is rude to count titles"], 0, "A current fact goes stale."]],
    "Titles are history once the season is over.",
    ["m", "A finished season's result is…", ["history", "a prediction", "a tyre compound", "a blue flag"], 0, "It can be written down."]);

  f1("f-history", "History", 4, "Circuits with a long story", "Places, not this year's calendar.",
    ["Silverstone is in Britain. Monza is in Italy and is known as a fast circuit. Spa is in Belgium. Suzuka is in Japan and crosses over itself.", "Monaco is a street circuit. The walls are close.", "A calendar can add or drop races. These places are the famous ones people mean."],
    ["Monaco: streets and barriers.", "Monza: long straights and history."],
    [["m", "Spa is in…", ["Belgium", "Japan", "Brazil only", "the pit lane"], 0, "Spa-Francorchamps is the Belgian circuit people mean."],
     ["m", "Suzuka is famous for…", ["a layout that crosses itself", "being in Italy", "having no corners", "being a horse track"], 0, "The figure-of-eight crossing is in Japan."],
     ["m", "Monaco's walls matter because…", ["there is little room for a mistake", "the track is a wide airfield", "there is no race there", "the walls are soft hay on purpose"], 0, "It is a street circuit."]],
    "A calendar is not the same as a famous place.",
    ["m", "If a famous circuit is missing from one year's calendar…", ["it can still be a famous circuit", "it never existed", "the flags change meaning", "history is deleted"], 0, "Calendars move. History stays."]);

  f1("f-history", "History", 5, "Safety changed the sport", "Halo, belts, barriers.",
    ["Drivers wear a harness and a helmet. The head restraint and the halo are later safety ideas.", "Barriers and run-off have changed since 1950.", "The exact device names can be updated. The aim is the same: the driver goes home."],
    ["1950 cars did not have a halo.", "Later cars grew structures around the driver."],
    [["m", "The aim of the safety kit is…", ["that the driver goes home", "that the car looks unchanged since 1950", "to remove seatbelts", "to ban helmets"], 0, "Safety is the point."],
     ["m", "A harness…", ["holds the driver in the seat", "is a type of wing", "is the chequered flag", "replaces the tyres"], 0, "Belts."],
     ["m", "Why has the safety kit changed since 1950?", ["people learned from crashes", "safety was perfect in 1950", "helmets became illegal", "flags replaced cars"], 0, "Each bad weekend taught something."]],
    "You still obey flags.",
    ["m", "Safety kit does not replace…", ["obeying flags and marshals", "the need for wheels", "brakes", "a helmet"], 0, "Kit and behaviour both matter."]);

  f1("f-history", "History", 6, "A short history you can tell", "Dates that will not move.",
    ["1950: championship starts at Silverstone.", "Fangio: five titles in the 1950s. Senna: three titles, and 1994 changed safety.", "Schumacher: seven titles by 2004. Hamilton: a seventh title in 2020."],
    ["You can tell that story without naming this year's grid."],
    [["m", "Which list is in a sensible time order?", ["1950 championship, Fangio, Senna, Schumacher's seventh era, Hamilton's seventh in 2020", "Hamilton, then the year 1950, then the invention of the wheel", "Senna, then Fangio's 1950s, then the year 1400", "a pit stop, then the Sun"], 0, "Time runs forward."],
     ["m", "Imola 1994 is remembered because…", ["Senna was killed and safety work intensified", "it was the first championship race in 1950", "tyres were invented that day", "flags were cancelled"], 0, "A turning point for safety."],
     ["m", "This lesson will not tell you…", ["who is champion of a season that is still news", "that the championship began in 1950", "that Monaco is a street circuit", "that yellow means caution"], 0, "News is not the lesson."]],
    "One date.",
    ["m", "The championship began in…", ["1950", "2020", "1994 only", "there is no start"], 0, "1950."]);

  f1("f-sums", "Lap sums", 1, "Which lap is quicker", "A smaller time is faster.",
    ["A lap time is how long one lap took.", "80 seconds is quicker than 95 seconds.", "Two laps of 40 seconds take 80 seconds."],
    ["Compare 80 and 95.", "80 is less.", "That car was quicker."],
    [["m", "Which lap is quicker?", ["80 seconds", "95 seconds", "they are the same speed"], 0, "Less time means faster."],
     ["t", "Two laps take 40 seconds each. How many seconds for both laps?", "80", "40 + 40 = 80."],
     ["t", "How many seconds are in 1 minute?", "60", "A minute is 60 seconds."]],
    "One more easy compare.",
    ["m", "Which is slower?", ["70 seconds", "90 seconds", "they match"], 1, "90 seconds takes longer."]);

  f1("f-sums", "Lap sums", 2, "Three laps and a splash of fuel", "Multiply small numbers.",
    ["Three laps of 30 seconds take 90 seconds.", "The gap between 90 and 70 is 20.", "If a story-car uses 2 units of fuel each lap, 4 laps use 8. Real Formula 1 fuel use is more complicated and the rules change."],
    ["30 + 30 + 30 = 90.", "Or 3 × 30 = 90."],
    [["t", "Three laps take 30 seconds each. How many seconds altogether?", "90", "3 × 30 = 90."],
     ["t", "What is 90 − 70?", "20", "The quicker lap is 20 seconds quicker."],
     ["t", "A story-car uses 2 fuel units a lap. How many units do 4 laps use?", "8", "4 × 2 = 8. A real car's number is different."]],
    "Two laps of 45.",
    ["t", "Two laps take 45 seconds each. How many seconds for both?", "90", "45 + 45 = 90."]);

  f1("f-sums", "Lap sums", 3, "A mean of two laps", "Add, then share.",
    ["The mean of two laps is their total shared by 2.", "80 and 90 make 170. Half of 170 is 85.", "A smaller single lap is still the quicker one. The mean is the typical lap."],
    ["80 + 90 = 170.", "170 ÷ 2 = 85."],
    [["t", "What is the mean of a 80-second lap and a 90-second lap?", "85", "170 shared by 2 is 85."],
     ["t", "What is half of 60?", "30", "60 ÷ 2 = 30."],
     ["t", "What is 100 − 25?", "75", "100 take away 25 is 75."]],
    "Two equal laps.",
    ["t", "Two laps are both 50 seconds. What is the mean, in seconds?", "50", "The mean of 50 and 50 is 50."]);

  f1("f-sums", "Lap sums", 4, "Three laps and a tenth", "A mean of three. 10% as a tenth.",
    ["The mean of 20, 30 and 40 is 30, because the total is 90 and 90 ÷ 3 = 30.", "10% of 50 is 5.", "Same distance and less time means faster. We are not using a speed formula yet."],
    ["20 + 30 + 40 = 90.", "90 ÷ 3 = 30."],
    [["t", "What is the mean of 20, 30 and 40?", "30", "The total is 90. 90 ÷ 3 = 30."],
     ["t", "What is 10% of 50?", "5", "50 ÷ 10 = 5."],
     ["m", "Two cars do the same distance. One takes less time. That car is…", ["faster", "slower", "the same", "parked"], 0, "Less time, more speed."]],
    "A tenth of 40.",
    ["t", "What is 10% of 40?", "4", "40 ÷ 10 = 4."]);

  f1("f-sums", "Lap sums", 5, "A stint in your head", "Three laps, then a fuel story.",
    ["The mean of 70, 80 and 90 is 80.", "2 × 45 = 90.", "A story of 3 kg a lap for 4 laps is 12 kg. A real Formula 1 car uses a different amount, set by the year's rules."],
    ["70 + 80 + 90 = 240.", "240 ÷ 3 = 80."],
    [["t", "What is the mean of 70, 80 and 90 seconds?", "80", "240 ÷ 3 = 80."],
     ["t", "What is 2 × 45?", "90", "Two 45s make 90."],
     ["t", "A story uses 3 kg of fuel each lap for 4 laps. How many kilograms?", "12", "4 × 3 = 12. Real cars differ."]],
    "Half of 90.",
    ["t", "What is half of 90?", "45", "90 ÷ 2 = 45."]);

  f1("f-sums", "Lap sums", 6, "Champion sums", "Still numbers, not letters.",
    ["The mean of 40 and 60 is 50.", "Ten laps at 3 kg in the story use 30 kg.", "Two minutes is 120 seconds."],
    ["40 + 60 = 100.", "100 ÷ 2 = 50."],
    [["t", "What is the mean of 40 and 60?", "50", "100 ÷ 2 = 50."],
     ["t", "Ten story-laps use 3 kg each. How many kilograms?", "30", "10 × 3 = 30."],
     ["t", "How many seconds are in 2 minutes?", "120", "60 + 60 = 120."]],
    "A 10-second gap.",
    ["t", "What is 95 − 85?", "10", "The gap is 10 seconds."]);

  // —— Horse world ——
  hw("w-breeds", "Breeds", 1, "Horse or pony", "Height is the usual dividing line.",
    ["A pony is 14.2 hands or under. A horse is taller than that.", "A hand is 4 inches. We will do the sum carefully in a later lesson. 14.2 is not a decimal.", "Shetlands are small and strong. Shires are very large."],
    ["If it is over 14.2 hands, call it a horse.", "If it is 14.2 or under, call it a pony."],
    [["m", "A pony is…", ["14.2 hands or under", "always taller than a Shire", "a type of kart", "measured in laps"], 0, "14.2 hands is the usual cut-off."],
     ["m", "A Shetland is known as…", ["small and strong", "the tallest breed", "a race car", "a flag"], 0, "Shetlands are little and tough."],
     ["m", "A Shire is…", ["a very large draught horse", "a tiny pony from the seaside only", "a circuit", "a tyre"], 0, "Shires pulled heavy loads."]],
    "Arab and Thoroughbred, first meeting.",
    ["m", "A Thoroughbred is best known as…", ["a racehorse breed", "a pit-stop tool", "a flag", "a measurement of hay"], 0, "Thoroughbreds were bred to race."]);

  hw("w-breeds", "Breeds", 2, "Arab and Welsh", "Two famous types.",
    ["Arabian horses are known for stamina and a fine head.", "Welsh ponies are a family of British ponies, in sections of different heights.", "A breed is a type, not a single famous animal."],
    ["An Arab can cover long distances.", "A Welsh pony is a brilliant all-rounder for many riders."],
    [["m", "Arabian horses are famous for…", ["stamina", "having wheels", "being flags", "living only one year"], 0, "Endurance is the reputation."],
     ["m", "Welsh ponies come from…", ["Wales", "the Moon", "a pit lane", "a single stable in 2024 only"], 0, "They are a British mountain and moorland family."],
     ["m", "A breed is…", ["a type of horse or pony", "one celebrity animal", "a hands measurement", "a saddle"], 0, "Many animals can share a breed."]],
    "Colour is not a breed.",
    ["m", "A grey coat…", ["is a colour, not a breed by itself", "means the horse is an Arab for certain", "means it is a Shire for certain", "is a tyre"], 0, "Greys exist in many breeds."]);

  hw("w-breeds", "Breeds", 3, "Points of the horse", "Names for the parts.",
    ["The muzzle is the nose and mouth.", "The withers are the ridge at the base of the neck, where height is measured.", "The hoof is the hard foot. The mane is the hair on the neck. The tail is at the back."],
    ["Height in hands is taken at the withers, not at the ears."],
    [["m", "Height is measured at…", ["the withers", "the ears", "the tail", "the rider's hat"], 0, "The withers are the standard point."],
     ["m", "The muzzle is…", ["the nose and mouth", "the hoof", "the tail", "the saddle"], 0, "Soft, and sensitive."],
     ["m", "The mane grows on…", ["the neck", "the hoof", "the rider", "the bucket"], 0, "Neck hair."]],
    "A hoof is not a shoe. The shoe is nailed to the hoof by a farrier.",
    ["m", "A farrier looks after…", ["feet and shoes", "the engine", "the flags", "the points table"], 0, "Hoof care is skilled work."]);

  hw("w-breeds", "Breeds", 4, "What the sports are", "Racing, dressage, showjumping.",
    ["Racing is a speed contest. Flat racing has no fences. Jump racing has fences, including the Grand National.", "Dressage is a test of training and balance, often described as dancing but it is serious gymnastic work.", "Showjumping is a round of fences against the clock, with faults for poles down."],
    ["Three sports. Three different jobs.", "A horse can be brilliant at one and ordinary at another."],
    [["m", "Flat racing has…", ["no fences", "the Grand National fences", "a dressage arena only", "a pit stop"], 0, "Flat means no jumps."],
     ["m", "Dressage is mainly about…", ["training, balance and obedience", "who is tallest", "a single jump", "fuel"], 0, "It is a training test."],
     ["m", "A pole down in showjumping is…", ["a fault", "a bonus", "a breed", "a hand"], 0, "Knocking a pole costs faults."]],
    "One horse, one job, sometimes.",
    ["m", "The Grand National is…", ["a famous jump race", "a flat sprint of one furlong with no fences", "a dressage test", "a kart race"], 0, "Fences, long distance, Aintree."]);

  hw("w-breeds", "Breeds", 5, "Hands, said properly", "14.2 is not fourteen point two.",
    ["A hand is 4 inches.", "14 hands is 14 × 4 = 56 inches.", "14.2 hands means 14 hands and 2 extra inches, so 58 inches. The .2 is two inches, not two tenths."],
    ["14 × 4 = 56.", "Add the 2 inches.", "58."],
    [["t", "How many inches are in one hand?", "4", "A hand is 4 inches."],
     ["t", "How many inches is 14 hands, with no extra inches?", "56", "14 × 4 = 56."],
     ["m", "14.2 hands means…", ["14 hands and 2 inches, which is 58 inches", "14.2 as a decimal, about 14 and a fifth", "142 hands", "2 hands"], 0, "The .2 is a leftover from counting in fours, not a decimal."]],
    "Ten hands.",
    ["t", "How many inches is 10 hands?", "40", "10 × 4 = 40."]);

  hw("w-breeds", "Breeds", 6, "Breeds in one picture", "Type, height, job.",
    ["Pony: 14.2 hands or under. Horse: over that.", "Shetland small, Shire huge, Arab enduring, Thoroughbred raced, Welsh pony all-round.", "Height is at the withers. 14.2 means 58 inches."],
    ["You can describe an animal without saying it is 'the best in the world this year'."],
    [["m", "Which measurement is 14.2 hands?", ["58 inches", "14.2 inches", "142 inches", "4 inches"], 0, "56 + 2 = 58."],
     ["m", "A Thoroughbred's traditional job is…", ["racing", "pulling a plough as a Shire does", "being a flag", "being a hand"], 0, "Racehorse breed."],
     ["m", "You measure height at the…", ["withers", "ears", "hoof only", "tail"], 0, "Withers."]],
    "The cut-off.",
    ["m", "Over 14.2 hands, the animal is usually called…", ["a horse", "a pony", "a hand", "a farrier"], 0, "Taller than the cut-off."]);

  hw("w-gaits", "Gaits", 1, "Walk and trot", "Four beats, then two.",
    ["The walk is a four-beat gait. You can hear four hoof-falls.", "The trot is a two-beat gait. Diagonal legs move together.", "The rider rises, or sits, to the trot. Rising is often easier to start with."],
    ["Listen at the walk: 1, 2, 3, 4.", "At the trot the sound pairs up."],
    [["m", "The walk is…", ["four beats", "one beat", "a jump", "a tyre"], 0, "Four hoof-falls."],
     ["m", "The trot is…", ["two beats", "four beats like the walk", "no beats", "a canter"], 0, "Diagonal pairs."],
     ["m", "Rising trot means the rider…", ["sits and rises with the trot", "lies on the neck", "drops the reins on the ground", "closes their eyes"], 0, "Up and down with the two beats."]],
    "Neither gait is a race.",
    ["m", "Walk and trot are…", ["ordinary gaits you learn first", "only for Grand National fences", "the same gait", "pit stops"], 0, "They are the foundation."]);

  hw("w-gaits", "Gaits", 2, "Canter and gallop", "Three beats, then four again.",
    ["The canter is a three-beat gait with a moment of suspension.", "The gallop is faster and becomes four beats.", "A horse has a leading leg in canter. The rider can feel which one."],
    ["Canter: three beats.", "Ask for more and it opens into gallop."],
    [["m", "The canter has…", ["three beats", "one beat", "two beats like the trot", "no rhythm"], 0, "Three, then a pause."],
     ["m", "The gallop is…", ["faster than the canter and four beats", "slower than the walk", "a two-beat trot", "standing still"], 0, "It opens out."],
     ["m", "A leading leg is…", ["the leg that reaches further forward in canter", "a wooden leg", "a type of hat", "a fence"], 0, "Left lead or right lead."]],
    "You do not gallop past a warning.",
    ["m", "If a rider ahead raises a hand to slow the ride, you…", ["slow down too", "gallop past", "drop the reins", "jump them"], 0, "The ride stays together."]);

  hw("w-gaits", "Gaits", 3, "The rider's job", "Still hands, a following seat.",
    ["At walk, the rider lets the hands follow the head a little.", "At trot, rising or sitting, the hands stay quiet.", "Pulling backwards is not how you steer. Legs, seat and a soft rein share the work."],
    ["A busy hand makes a worried mouth.", "Quiet hands are a skill."],
    [["m", "Quiet hands mean…", ["you do not jiggle the reins", "you drop them", "you pull every stride", "you tie them in a knot"], 0, "Still, following, kind."],
     ["m", "Steering is…", ["legs, seat and rein together", "only a hard pull", "a shout", "a stick used every stride"], 0, "The whole body helps."],
     ["m", "Rising trot should match…", ["the two beats", "the four beats of walk", "no rhythm", "the gallop only"], 0, "Up-down with the trot."]],
    "Look up.",
    ["m", "Where should the rider look?", ["up, where they are going", "down at the horse's ears the entire time", "at their own feet", "behind with the body twisted"], 0, "Look where you want to go."]);

  hw("w-gaits", "Gaits", 4, "Pace in a group", "The ride has a speed.",
    ["In a group, the leader sets the gait.", "Pass other riders left hand to left hand, as if on a road.", "Do not overtake by galloping up the inside on a hack."],
    ["Someone is coming towards you.", "You pass so your left hands are nearest.", "There is space."],
    [["m", "On a hack, riders coming towards each other should pass…", ["left hand to left hand", "as close as possible", "at a racing gallop", "by swapping horses"], 0, "Like traffic, with space."],
     ["m", "Who sets the gait in a lesson ride?", ["the leader, often the instructor", "the keenest child at the back", "the pony who wants to canter home", "nobody"], 0, "The ride stays at the asked pace."],
     ["m", "Galloping up the inside of a walking ride is…", ["not safe", "the point of a hack", "required", "a dressage movement"], 0, "You wait, and you ask."]],
    "A safe distance.",
    ["m", "You leave space so…", ["a pony can stop or shy without hitting the one in front", "the reins can drag on the ground", "you can tailgate", "hats become optional"], 0, "Space is control."]);

  hw("w-gaits", "Gaits", 5, "Which gait fits", "Choose the gear.",
    ["Walk for learning a new idea, for steep hills, and for cooling down.", "Trot covers ground.", "Canter is for when the going is good and the rider is ready. Gallop is a race or a schooled exercise, not the default on a hack."],
    ["Hill: walk.", "Long track, balanced pony: trot.", "Home: walk, so they cool."],
    [["m", "A steep hill is usually taken at…", ["walk", "a racing gallop", "a jump", "a trot with no balance"], 0, "Walk keeps the balance."],
     ["m", "Cooling a horse down is done at…", ["walk", "gallop", "a jump-off", "a pit stop"], 0, "Walk lets the breathing settle."],
     ["m", "Gallop on a crowded hack is…", ["the wrong choice", "always required", "the same as walk", "a breed"], 0, "Save gallop for the right place."]],
    "Trot is the working gear.",
    ["m", "Trot is useful because…", ["it covers ground in balance", "it is faster than a gallop", "it has one beat", "it needs no rider"], 0, "Two beats, purposeful."]);

  hw("w-gaits", "Gaits", 6, "Name the beat", "All four gaits.",
    ["Walk: four. Trot: two. Canter: three. Gallop: four.", "The leading leg belongs to canter.", "The rider's hands stay quiet in all of them."],
    ["You can count them."],
    [["m", "Which gait is two beats?", ["trot", "walk", "canter", "a standstill"], 0, "Trot."],
     ["m", "Which gait is three beats?", ["canter", "trot", "walk", "gallop"], 0, "Canter."],
     ["m", "Walk and gallop both have four beats, but gallop is…", ["much faster", "slower", "the same speed", "a jump"], 0, "The pattern opens up."]],
    "Quiet hands still apply.",
    ["m", "In every gait, kind hands are…", ["quiet", "busy on the mouth", "optional if you are keen", "replaced by shouting"], 0, "The mouth is sensitive."]);

  hw("w-famous", "Famous horses", 1, "Stories and real horses", "Black Beauty is a book.",
    ["Black Beauty is a novel, not a horse you can visit.", "A real famous horse has a record: races, years, places.", "We will use records that are finished."],
    ["If it is in a story, say it is a story.", "If it won races, say which ones, carefully."],
    [["m", "Black Beauty is…", ["a story", "a horse alive in a modern yard that you should copy this year", "a breed", "a hand"], 0, "Anna Sewell wrote the book."],
     ["m", "A real horse's record is…", ["something that happened", "a guess about next year", "a flag", "a sum with letters"], 0, "History, not a prediction."],
     ["m", "Why be careful with 'the best horse alive'?", ["that changes, and it is often just an opinion", "there is only one horse", "records are illegal", "ponies are not real"], 0, "Opinions expire. Results of old races do not."]],
    "Separate the book from the yard.",
    ["m", "You should treat Black Beauty as…", ["fiction", "a training manual for your pony's exact feed", "a race entry", "a measurement"], 0, "It is a novel."]);

  hw("w-famous", "Famous horses", 2, "Red Rum", "Three Grand Nationals.",
    ["Red Rum won the Grand National in 1973, 1974 and 1977.", "That is three wins. The record is closed.", "He was a steeplechaser, so he jumped fences."],
    ["1973, 1974, then 1977.", "Count the wins: three."],
    [["m", "Red Rum won the Grand National…", ["three times", "never", "once, in 2024", "as a flat sprinter with no fences"], 0, "1973, 1974 and 1977."],
     ["m", "The Grand National is…", ["a jump race", "a dressage test", "a showing class for Shetlands only", "a kart race"], 0, "Fences."],
     ["m", "Red Rum's wins are…", ["finished history", "a prediction for next April", "a breed", "a hand"], 0, "Those years will not change."]],
    "Not every great horse won three.",
    ["m", "Three Grand Nationals is…", ["exceptional", "what every pony does", "a legal requirement", "the same as one walk stride"], 0, "It is a rare record."]);

  hw("w-famous", "Famous horses", 3, "Desert Orchid", "A famous grey chaser.",
    ["Desert Orchid was a grey steeplechaser, loved in the 1980s.", "Grey is a colour. The career is the history.", "Being famous is not the same as being the right horse for a child to ride."],
    ["People remember the grey colour and the jumping.", "The record belongs to that era."],
    [["m", "Desert Orchid was…", ["a grey steeplechaser", "a Shetland who only walked", "a storybook pony with no real life", "a Formula 1 car"], 0, "A real jump horse."],
     ["m", "Grey describes…", ["the coat colour", "the breed by itself", "the number of Grand Nationals", "the rider's hat"], 0, "Colour, not breed."],
     ["m", "A famous racehorse is…", ["not automatically a safe first pony", "always the right pony for a beginner", "measured in pit stops", "a flag"], 0, "Fame is not a riding-school job."]],
    "Admire from the history, not from the saddle, unless a trainer says so.",
    ["m", "Your first pony should be chosen for…", ["temperament and size, with an adult", "how famous its grandsire was on television", "its colour only", "its name"], 0, "Suitability first."]);

  hw("w-famous", "Famous horses", 4, "Valegro", "Dressage, already done.",
    ["Valegro, ridden by Charlotte Dujardin, won Olympic dressage gold in 2012 and 2016.", "Those medals are history.", "Dressage at that level is years of training, not a trick you copy on a hack."],
    ["2012 and 2016.", "Team and individual success. The exact extra medals are easy to over-claim, so we stick to the Olympic golds."],
    [["m", "Valegro is famous for…", ["dressage", "the Grand National", "flat sprinting only", "pulling a plough"], 0, "An Olympic dressage horse."],
     ["m", "The Olympic golds mentioned are from…", ["2012 and 2016", "1950 and 1951", "next year", "a novel"], 0, "Finished Games."],
     ["m", "Copying an Olympic exercise on a first hack is…", ["a bad idea", "the lesson", "required", "how you cool a horse down"], 0, "Those movements are trained slowly."]],
    "Gold is history.",
    ["m", "A past Olympic result…", ["stays a past result", "enters next week's novice class for you", "changes if we forget it", "is a hand"], 0, "It is done."]);

  hw("w-famous", "Famous horses", 5, "Don't learn a league table", "This year's star is news.",
    ["Horse of the year changes.", "A finished record, like Red Rum's three Nationals, does not.", "If you want this year's winner, that is a news search, not a lesson to memorise."],
    ["News: who won last Saturday.", "Lesson: what the Grand National is, and who won it three times in the 1970s."],
    [["m", "Which fact is safe in a lesson?", ["Red Rum won three Grand Nationals", "the name of next year's winner", "this month's world ranking as if it were permanent", "a driver's current team"], 0, "The Nationals already happened."],
     ["m", "This year's showjumper of the moment…", ["can change", "is the same person forever", "is a breed", "is a gait"], 0, "Rankings move."],
     ["m", "A novel about a horse should be labelled…", ["fiction", "a race record", "a measurement", "a rule of the Pony Club"], 0, "Stories are stories."]],
    "Ask an adult before you trust a headline.",
    ["m", "A headline that says a horse is unbeatable is…", ["an opinion", "a law of nature", "a hand", "a gait"], 0, "Opinions are not records."]);

  hw("w-famous", "Famous horses", 6, "Tell the history", "Three real ones and one book.",
    ["Black Beauty: a book.", "Red Rum: three Grand Nationals.", "Desert Orchid: a famous grey chaser. Valegro: Olympic dressage gold in 2012 and 2016."],
    ["You can say which is fiction."],
    [["m", "Which one is fiction?", ["Black Beauty", "Red Rum", "Valegro", "Desert Orchid"], 0, "The novel."],
     ["m", "Which one is the Grand National horse?", ["Red Rum", "Valegro", "a Shetland who never raced", "Black Beauty"], 0, "Three wins."],
     ["m", "Valegro's sport was…", ["dressage", "only the Grand National", "flat sprinting with no training", "polo"], 0, "Dressage."]],
    "Dates stay put.",
    ["m", "Red Rum's National wins include…", ["1973, 1974 and 1977", "2012 and 2016", "1950 only", "no years"], 0, "Those three."]);

  hw("w-rules", "Yard rules", 1, "Hands and ropes", "Kind, and not trapped.",
    ["Never wrap a lead rope around your hand. A loop can tighten.", "Walk beside the shoulder, not in front of the hooves.", "An up-to-date riding hat matters. The exact standard label changes, so an adult checks the current one."],
    ["Lead rope in a flat hand, folded, not wrapped.", "You can drop it if you have to."],
    [["m", "A lead rope around your hand is…", ["dangerous", "the correct knot", "required", "a breed"], 0, "A loop can trap the hand."],
     ["m", "You walk…", ["beside the shoulder", "directly in front of the front hooves", "under the belly", "holding the tail only"], 0, "Shoulder, where you can see the head and stay clear of a strike."],
     ["m", "A riding hat should be…", ["in date, checked by an adult", "any woolly hat", "optional at canter", "a bicycle helmet from years ago with no check"], 0, "Standards change. An adult checks."]],
    "Quiet voice.",
    ["m", "A loud surprise at a horse's side can…", ["startle it", "be the best training", "replace a hat", "be a gait"], 0, "Quiet is safer."]);

  hw("w-rules", "Yard rules", 2, "Ties and gates", "Quick release. Gates shut.",
    ["Tie with a quick-release knot, to a breakable loop of string, not to a solid ring with a knot you cannot undo.", "Shut gates. A loose horse on a road is an emergency.", "Do not duck under a tied horse's neck."],
    ["String loop on the ring.", "Quick-release knot on the string.", "If the horse pulls back, the string breaks before the halter injures."],
    [["m", "A quick-release knot is used so…", ["you can free the horse in a hurry", "the horse can never be undone", "the rope welds itself", "gates stay open"], 0, "Emergencies need a fast undo."],
     ["m", "Why tie to a loop of string?", ["the string can break if the horse panics", "string is decorative", "string is stronger than a chain on purpose so nothing breaks", "it is a gait"], 0, "Something should give."],
     ["m", "A gate left open can…", ["let a horse onto a road", "be the correct end to every lesson", "replace a hat", "be a breed"], 0, "Shut it."]],
    "Do not stand where a cow-kick or a stamp lands.",
    ["m", "You avoid standing…", ["right behind the hind legs", "beside the shoulder when leading", "where the handler asked", "by the gate you are shutting"], 0, "Hind legs can kick."]);

  hw("w-rules", "Yard rules", 3, "On the road", "Hi-vis, and a handler.",
    ["Roads are for traffic. A horse and a car do not mix well.", "If you must use a short quiet lane, an adult leads or rides, hi-vis is on, and you have a plan.", "This lesson is not permission to go on a road."],
    ["Ask.", "Hi-vis.", "A calm horse, and a grown-up who knows the lane."],
    [["m", "Going on a road with a horse…", ["needs an adult and is not a game", "is fine alone if you are keen", "is the same as a dressage arena", "needs no hat"], 0, "Adults decide."],
     ["m", "Hi-vis clothing helps because…", ["drivers see you", "it makes the horse faster", "it replaces a gate", "it is a breed"], 0, "See and be seen."],
     ["m", "This lesson…", ["does not give permission for a road hack", "means you should go out now", "cancels the Highway Code", "replaces a farrier"], 0, "Permission comes from a grown-up, not a screen."]],
    "Cars are heavier.",
    ["m", "A car against a horse is…", ["a bad meeting", "a fair race", "a gait", "a hand"], 0, "Stay off roads unless a competent adult has a reason and a plan."]);

  hw("w-rules", "Yard rules", 4, "After work", "Cool, water, check.",
    ["A sweaty horse is walked until the breathing settles.", "Water is offered. A horse that will not drink, or that stands oddly, is mentioned to an adult.", "Rugs: an adult decides. A wet horse under a wrong rug can chill."],
    ["Walk.", "Feel the chest.", "Tell someone if something looks wrong."],
    [["m", "After a hard ride you…", ["walk to cool down", "put them straight into a sealed rug and leave", "gallop back to the box", "skip water"], 0, "Cooling is part of the work."],
     ["m", "If a horse will not drink and looks wrong…", ["tell an adult", "ignore it", "add more canter", "take the hat off and hope"], 0, "Adults know the horse's normal."],
     ["m", "Who chooses the rug?", ["an adult who knows the horse and the weather", "the keenest child", "a website from another country", "nobody, rugs are always wrong"], 0, "Rugs are a judgement."]],
    "Pick out the feet.",
    ["m", "Feet are checked because…", ["a stone can bruise", "hooves do not matter", "it is a gait", "it replaces water"], 0, "Stones hurt."]);

  hw("w-rules", "Yard rules", 5, "Tack that fits", "A sore is a stop.",
    ["A saddle that rocks or pinches makes a sore.", "A bit that is too narrow or too severe is an adult's conversation, not a child's experiment.", "If the skin is rubbed, you stop and you tell someone."],
    ["Look under the saddle cloth.", "Hair rubbed the wrong way, or a hot spot, is a clue."],
    [["m", "A sore under the saddle means…", ["stop and tell an adult", "carry on, it will toughen", "add a bigger bit", "ignore it"], 0, "Pain is information."],
     ["m", "Choosing a harsher bit to fix a problem…", ["is not a child's job", "is the first trick to try alone", "replaces a dentist", "is a breed decision"], 0, "Mouths need a knowledgeable adult."],
     ["m", "Tack should…", ["fit the horse", "be whatever is nearest", "be as small as possible even if it pinches", "stay dirty so it grips"], 0, "Fit, then use."]],
    "Dirty tack can rot.",
    ["m", "Sweat left in leather…", ["can damage it", "makes it stronger for certain", "is a gait", "is a hand"], 0, "Clean it, or ask how the yard does it."]);

  hw("w-rules", "Yard rules", 6, "Leave the yard better", "The rules in one list.",
    ["Rope not around the hand. Quick-release tie. Gates shut.", "Hat in date. Adult for the road. Cool, water, feet.", "A sore stops the work."],
    ["You can say the list."],
    [["m", "A lead rope should be held…", ["so you can let go", "wrapped around the hand", "in your teeth", "tied to your wrist"], 0, "You must be able to release."],
     ["m", "Gates should be…", ["shut", "left open as a kindness", "removed", "used as jumps on the way out"], 0, "Shut."],
     ["m", "A rubbed sore means…", ["stop and tell an adult", "trot it off", "change the breed", "add a longer ride"], 0, "Stop."]],
    "Quiet still counts.",
    ["m", "The voice around horses should be…", ["calm", "as loud as possible", "a surprise every time", "replaced by a klaxon"], 0, "Calm animals, calm people."]);

  hw("w-move", "How a horse moves", 1, "A prey animal", "Eyes at the side.",
    ["Horses are prey animals. They notice movement at the side.", "A sudden flap can mean 'danger' to them, even when it is a bag.", "You move calmly and you speak before you appear at the shoulder."],
    ["Approach the shoulder.", "Let them see you.", "Do not pop up under the nose."],
    [["m", "Horses notice a lot at the side because…", ["their eyes are on the sides of the head", "they have no eyes", "they are predators like cats", "they only see flags"], 0, "A wide view helps a prey animal."],
     ["m", "A flapping bag can…", ["startle a horse", "be invisible to them", "be a gait", "be a hand"], 0, "Sudden movement reads as danger."],
     ["m", "You approach…", ["calmly, towards the shoulder", "at a run from behind", "with a shout", "under the belly"], 0, "Shoulder, calm, seen."]],
    "They are heavy.",
    ["m", "A startled horse is dangerous partly because…", ["it is heavy and fast", "it is as light as a cat", "it cannot move", "it is a story"], 0, "Weight plus speed."]);

  hw("w-move", "How a horse moves", 2, "Balance", "Weight over the legs.",
    ["A horse balances over its legs, with a lot of weight towards the front.", "A rider sitting heavily on the last rib, or leaning up the neck, changes that balance.", "Hills are walked so the horse can organise its legs."],
    ["Your weight is part of the horse's problem to solve.", "Sit where you were taught."],
    [["m", "The rider's weight…", ["affects the horse's balance", "does not exist", "is only a colour", "replaces the legs"], 0, "You are part of the load."],
     ["m", "A steep hill is walked so…", ["the horse can balance", "you can gallop straight down it", "reins can trail", "the hat can come off"], 0, "Time to place the feet."],
     ["m", "Leaning up the neck without being asked…", ["shifts weight forward", "is the perfect seat", "is a breed", "lifts the horse"], 0, "The balance tips forward."]],
    "Look up to help your own balance.",
    ["m", "Looking down at the shoulder for a whole lesson…", ["can tip you forward", "is the only correct seat", "replaces reins", "is a gait"], 0, "Eyes up."]);

  hw("w-move", "How a horse moves", 3, "Muscles, in kid words", "They warm up like athletes.",
    ["Muscles work better after a gentle start.", "That is why you walk before you trot, and trot before you canter.", "A cold horse asked for a sudden gallop can strain something."],
    ["Walk.", "Then trot.", "Then, if the plan says so, canter."],
    [["m", "A warm-up starts at…", ["walk", "gallop", "a jump", "a road"], 0, "Walk first."],
     ["m", "Muscles that are cold and then asked for a sudden effort…", ["can be strained", "are always safer", "do not exist", "are tyres"], 0, "Warm them up."],
     ["m", "The order that respects the body is…", ["walk, trot, then faster work", "gallop, then think about a walk", "jump, then tack up", "canter in the stable"], 0, "Build it."]],
    "Cool down is the other end.",
    ["m", "After fast work, walk…", ["lets the body settle", "is a waste so you should skip it", "replaces water", "is only for ponies under 10 hands"], 0, "Cooling down matters."]);

  hw("w-move", "How a horse moves", 4, "The foot", "A hoof is a living structure.",
    ["The hoof grows, like a fingernail, and is trimmed.", "A stone in the foot makes a horse lame. Pick the feet out.", "Shoes, if they are worn, are the farrier's work. A loose shoe is an adult's problem today, not next month."],
    ["Pick the feet.", "See a stone.", "Tell someone. Do not dig with a dangerous tool you have not been shown."],
    [["m", "A hoof grows and needs…", ["trimming", "to be ignored for years", "paint only", "a pit stop"], 0, "The farrier trims."],
     ["m", "A stone in the foot can make a horse…", ["lame", "taller", "a different breed", "faster for certain"], 0, "Pain changes the stride."],
     ["m", "A loose shoe should be…", ["reported to an adult the same day", "left until it falls off in a field", "pulled off by a child with any tool", "ignored because shoes are decoration"], 0, "A twisted shoe can wound."]],
    "Frog, sole, wall — the farrier names the parts.",
    ["m", "Who trims and shoes?", ["a farrier", "any visitor", "the horse alone", "a flag marshal"], 0, "It is a trade."]);

  hw("w-move", "How a horse moves", 5, "Breathing and sweat", "Fitness is slow.",
    ["A fit horse recovers its breathing sooner.", "Sweat is normal. Shaking, distress, or breathing that will not settle is an adult's emergency.", "Fitness is built over weeks, not one heroic canter."],
    ["Watch the nostrils.", "They flare with work.", "They should quieten at walk."],
    [["m", "Breathing that will not settle after a cool-down is…", ["something to tell an adult about", "a sign to canter again", "normal for hours with no check", "a breed"], 0, "Distress is not 'being keen'."],
     ["m", "Fitness is built…", ["over weeks", "in one ride", "by skipping water", "by a tighter girth"], 0, "Slow work, repeated."],
     ["m", "Sweat on a working horse is…", ["normal, and then you cool them", "always an emergency with no cool-down", "a reason to gallop more", "a colour"], 0, "Work makes heat. Cooling handles it."]],
    "Water after work.",
    ["m", "After cooling, you offer…", ["water", "nothing until tomorrow", "a tighter noseband", "a gallop"], 0, "They need to drink."]);

  hw("w-move", "How a horse moves", 6, "Movement in one go", "Prey, balance, warm-up, feet.",
    ["Eyes at the side: approach calmly.", "Your weight is part of the balance.", "Walk before fast work. Feet picked out. Breathing watched."],
    ["You can list four cares."],
    [["m", "You approach a horse…", ["calmly, at the shoulder", "at a sprint from behind", "with a flapping coat as a joke", "under the belly"], 0, "Seen, and calm."],
     ["m", "Fast work comes…", ["after a walk and a trot", "first, to save time", "in the stable", "instead of a warm-up"], 0, "Warm the muscles."],
     ["m", "A stone in the hoof is…", ["a reason to stop and sort the foot", "a lucky weight", "a breed point", "ignored"], 0, "Lameness starts small."]],
    "One more.",
    ["m", "The rider's weight…", ["changes the balance", "does not exist", "is a gait", "replaces shoes"], 0, "Sit as you were taught."]);

  hw("w-sums", "Horse sums", 1, "Hands are fours", "Easy multiplying.",
    ["One hand is 4 inches.", "Two hands are 8 inches.", "Ten hands are 40 inches. We are not doing 14.2 yet."],
    ["4 + 4 = 8.", "That is two hands."],
    [["t", "How many inches are in one hand?", "4", "A hand is 4 inches."],
     ["t", "How many inches is 2 hands?", "8", "4 + 4 = 8."],
     ["t", "How many inches is 10 hands?", "40", "10 × 4 = 40."]],
    "Three hands.",
    ["t", "How many inches is 3 hands?", "12", "3 × 4 = 12."]);

  hw("w-sums", "Horse sums", 2, "A small height", "Five hands, and fourteen without the extra inches.",
    ["5 × 4 = 20, so 5 hands is 20 inches.", "14 × 4 = 56, so 14 hands is 56 inches.", "The walk has 4 beats. That 4 is not the same 4 as a hand, but you can count both."],
    ["Count four beats.", "They are hoof-falls, not inches."],
    [["t", "How many inches is 5 hands?", "20", "5 × 4 = 20."],
     ["t", "How many inches is 14 hands, with no extra inches?", "56", "14 × 4 = 56."],
     ["t", "How many hoof-beats are in one stride of walk?", "4", "Walk is a four-beat gait."]],
    "Half of 8 hands? Stay in inches you know.",
    ["t", "How many inches is 8 hands?", "32", "8 × 4 = 32."]);

  hw("w-sums", "Horse sums", 3, "14.2 done properly", "Add the two extra inches.",
    ["14 hands is 56 inches.", "The extra 2 inches make 58.", "Three strides of 2 metres cover 6 metres. A real stride length depends on the horse."],
    ["56 + 2 = 58.", "Say 'fourteen two', not 'fourteen point two'."],
    [["t", "14 hands is 56 inches. Add the 2 extra inches of a 14.2 hand horse. How many inches?", "58", "56 + 2 = 58."],
     ["m", "14.2 hands is…", ["58 inches", "14.2 inches", "14 inches", "142 inches"], 0, "It is not a decimal."],
     ["t", "Three strides of 2 metres. How many metres?", "6", "3 × 2 = 6."]],
    "One hand again.",
    ["t", "What is 56 + 4, if you added one more hand to 14 hands?", "60", "56 + 4 = 60, which would be 15 hands."]);

  hw("w-sums", "Horse sums", 4, "Water and hay", "Halves and a tenth.",
    ["Half of 12 litres is 6 litres.", "4 horses with 2 buckets each need 8 buckets.", "10% of 20 kg of hay is 2 kg. Real feeds are set by the yard, not by this sum."],
    ["The sum is practice.", "The scoop in the feed room is the real instruction."],
    [["t", "What is half of 12?", "6", "12 ÷ 2 = 6."],
     ["t", "4 horses need 2 buckets each. How many buckets?", "8", "4 × 2 = 8."],
     ["t", "What is 10% of 20?", "2", "20 ÷ 10 = 2."]],
    "Double 6 litres.",
    ["t", "What is 6 + 6?", "12", "Two sixes make 12."]);

  hw("w-sums", "Horse sums", 5, "A mean stride count", "Two numbers, shared.",
    ["The mean of 8 and 12 is 10.", "An hour and a half is 90 minutes.", "58 inches is still the 14.2 hand horse."],
    ["8 + 12 = 20.", "20 ÷ 2 = 10."],
    [["t", "What is the mean of 8 and 12?", "10", "20 ÷ 2 = 10."],
     ["t", "How many minutes are in an hour and a half?", "90", "60 + 30 = 90."],
     ["t", "A 14.2 hand horse is how many inches?", "58", "14 × 4 = 56, plus 2 is 58."]],
    "A quarter of an hour.",
    ["t", "How many minutes are in a quarter of an hour?", "15", "A quarter of 60 is 15."]);

  hw("w-sums", "Horse sums", 6, "Yard maths together", "Hay, mean, height.",
    ["4 horses at 5 kg of hay each, in the story, is 20 kg.", "The mean of 10, 20 and 30 is 20.", "14.2 hands is 58 inches. The yard's real feed chart beats any story sum."],
    ["4 × 5 = 20.", "10 + 20 + 30 = 60. 60 ÷ 3 = 20."],
    [["t", "4 horses get 5 kg of hay each in a story sum. How many kilograms?", "20", "4 × 5 = 20. Use the yard's real chart for a real horse."],
     ["t", "What is the mean of 10, 20 and 30?", "20", "60 ÷ 3 = 20."],
     ["m", "58 inches is the same as…", ["14.2 hands", "14.2 inches", "5 hands", "a decimal 14.2 with no extra meaning"], 0, "56 + 2."]],
    "Two hands in inches.",
    ["t", "What is 4 × 4?", "16", "Four hands would be 16 inches. 4 × 4 = 16."]);

  // A few extra First steps so an already-finished old path is not instantly complete.
  put("karting", null, "k-brief", "The briefing", 1, "Listen at the briefing", "The briefing is where today's plan lives.",
    ["A briefing tells you the flags, the circuit and the rules for today.", "If you missed it, you ask. You do not guess.", "Phones away. Ears on."],
    ["Arrive.", "Listen.", "Ask one question if something was unclear."],
    [["m", "The drivers' briefing is where you learn…", ["today's flags, circuit and rules", "nothing useful", "only the music", "the lunch menu only"], 0, "It is the plan for this session."],
     ["m", "If you missed a rule…", ["ask", "invent it on track", "ignore marshals", "copy the fastest person blindly"], 0, "Asking is the safe move."],
     ["m", "During the briefing you…", ["listen", "shout over it", "walk onto the track", "rev an engine in the middle of the room"], 0, "Ears on."]],
    "One more.",
    ["m", "Guessing a flag you were told about is…", ["worse than asking", "the professional way", "required", "the same as listening"], 0, "Ask."]);

  put("karting", null, "k-rain", "Rain", 1, "When the track is wet", "Smooth, and more space.",
    ["Wet tracks are slippery. Smooth steering and gentle pedals.", "Spray means you may not see. Leave a gap.", "If you cannot see the marshal, slow down."],
    ["Rain starts.", "You are smoother, not braver.", "You leave space."],
    [["m", "On a wet track you should be…", ["smoother", "sharper and later on the brakes as a first try", "on the grass on purpose", "faster into every puddle"], 0, "Smooth inputs."],
     ["m", "Spray from the kart ahead means…", ["you may not see — leave a gap", "you should tuck into their bumper", "the race is dry", "flags stop working"], 0, "Vision first."],
     ["m", "If you cannot see a marshal…", ["slow down", "speed up", "close your eyes", "overtake anyway"], 0, "See them, or be slower until you can."]],
    "Tyres.",
    ["m", "Wet tyres, if the club has them, are for…", ["rain", "making the kart louder", "dry tracks only as a joke", "the briefing room"], 0, "Grooves for water."]);

  put("karting", null, "k-cheer", "Watching kindly", 1, "Cheering from the safe side", "Support without stepping on the track.",
    ["Spectators stay behind the fence or where the marshal puts them.", "You do not step onto the track to congratulate someone.", "A thumbs-up after the session, in the paddock, is plenty."],
    ["Fence.", "Cheer.", "Meet them in the paddock, not on the racing line."],
    [["m", "You watch from…", ["behind the fence or the marshal's spot", "the apex of the corner", "the pit lane entry", "the racing line"], 0, "Safe side."],
     ["m", "Running onto the track to cheer is…", ["dangerous", "required", "how podiums work", "a yellow flag"], 0, "Stay off the track."],
     ["m", "A kind cheer…", ["waits until they are in a safe place", "involves throwing hats onto the circuit", "means grabbing the steering wheel", "is silent and on the track"], 0, "Paddock, not apex."]],
    "Marshals first.",
    ["m", "If a marshal asks you to move…", ["you move", "you argue from the grass verge", "you step closer to the karts", "you sit on the tyre wall"], 0, "They can see the risk."]);

  put("horses", null, "h-lead", "Leading", 1, "Lead from the shoulder", "A flat hand. A quiet pace.",
    ["Walk beside the shoulder.", "The rope is folded in the hand, never wrapped around it.", "Turn the horse away from you, not on top of your feet."],
    ["Shoulder.", "Folded rope.", "A wide turn."],
    [["m", "You lead from…", ["the shoulder", "directly in front", "the tail", "under the belly"], 0, "Shoulder."],
     ["m", "The lead rope around your hand is…", ["a trap", "correct", "a quick-release knot", "required"], 0, "You must be able to let go."],
     ["m", "A turn should…", ["keep your feet clear", "spin the horse onto your toes", "be a gallop", "be done with the rope wrapped tight"], 0, "Space for the feet."]],
    "Gates.",
    ["m", "After you go through a gate you…", ["shut it", "leave it open", "remove it", "tie the horse to it with a solid knot and walk away"], 0, "Shut the gate."]);

  put("horses", null, "h-field", "The field", 1, "Turning out", "Head towards the gate, then let go.",
    ["You lead in, turn the horse to face the gate, then release.", "If you let go while they face into the field, they may kick as they wheel away.", "More than one horse: an adult decides the order."],
    ["In.", "Turn to the gate.", "Unclip.", "Step away calmly."],
    [["m", "Before you unclip in the field, the horse should face…", ["the gate", "away from you into a gallop", "the opposite hedge at full speed", "another horse's heels"], 0, "Facing the gate means the hind legs are not the exit."],
     ["m", "Letting go as they spin away can…", ["put you by the hind legs", "be the safest habit", "be a dressage move", "replace a farrier"], 0, "Heels."],
     ["m", "Who decides if two horses go out together?", ["an adult", "the newest helper", "a website", "the loudest pony"], 0, "Some horses must not share."]],
    "Shut the gate after.",
    ["m", "The field gate is shut because…", ["horses stay in and cars stay out", "gates are optional", "a shut gate is unlucky", "the pony prefers the road"], 0, "Shut it."]);

  put("horses", null, "h-rug", "Rugs", 1, "Ask before you rug", "Weather and the horse, not a guess.",
    ["A rug can warm a clipped horse. It can also overheat a hairy one.", "An adult who knows the horse chooses.", "Straps must not rub. A twisted strap is fixed before you leave."],
    ["Ask.", "Put it on as you were shown.", "Check the straps."],
    [["m", "Who chooses whether a horse wears a rug?", ["an adult who knows that horse", "anyone walking past", "the rug itself", "a timetable from another yard"], 0, "It is a judgement."],
     ["m", "A twisted leg strap should be…", ["straightened", "left, because it will sort itself", "pulled tighter", "ignored overnight"], 0, "Twists rub."],
     ["m", "A thick rug on a hot, unclipped horse can…", ["overheat them", "always be perfect", "replace water", "be a gait"], 0, "Heat is a problem too."]],
    "Look underneath.",
    ["m", "If the coat is rubbed sore under a rug…", ["tell an adult and stop using that rug until it is sorted", "add another rug", "ignore it", "tighten every strap"], 0, "Sores need a person who knows."]);

  put("investing", null, "i-need", "Needs and wants", 1, "Need, then want", "Food and the bus come before the extra toy.",
    ["A need is something you must have to be okay: food, a warm coat, the fare you were given for a reason.", "A want is lovely and optional: another toy, a fancy drink.", "If the money is for a need, it is not spare."],
    ["Bus fare in the pocket.", "A toy in the window.", "The fare stays. The toy waits."],
    [["m", "Which is a need on a school day?", ["the bus fare you were given", "a third soft drink", "a poster", "a random in-app purchase"], 0, "The fare gets you there."],
     ["m", "A want is…", ["lovely and optional", "the same as rent", "always urgent", "illegal"], 0, "You can wait."],
     ["m", "Money that was given for a need…", ["is not spare", "must be spent on the first advert", "is the same as a gift to a stranger online", "should be hidden from the adult who gave it"], 0, "It has a job."]],
    "Say it simply.",
    ["m", "Buy the need…", ["before the extra toy", "after every advert", "never", "only if a stranger says so"], 0, "Order."]);

  put("investing", null, "i-wait", "Waiting", 1, "Sleep on it", "A day can save a regret.",
    ["If you want to spend spare money, waiting a day often changes your mind.", "The price will usually still be there.", "Pressure — 'only today' — is a reason to slow down, not speed up."],
    ["You want it.", "You wait until tomorrow.", "You still want it, and an adult agrees it is spare money. Then it is a choice."],
    [["m", "Waiting a day is useful because…", ["the feeling may fade", "prices always vanish in one hour so you must rush", "waiting is illegal", "money grows for certain overnight in your pocket"], 0, "Feelings are fast. Money is slower."],
     ["m", "'Only today' on an advert is…", ["pressure", "proof you must buy", "a Junior ISA", "a need"], 0, "Pressure is a clue to pause."],
     ["m", "Spare money means…", ["money that is not already for a need", "the rent", "someone else's card", "the bus fare"], 0, "Spare comes after needs."]],
    "Tell an adult about a big want.",
    ["m", "A big spend should be…", ["talked over with an adult", "hidden", "done with a stranger's link", "rushed"], 0, "Adults help."]);

  put("investing", null, "i-ask", "Ask before you pay", 1, "Online buttons", "A button is not a grown-up.",
    ["Do not type a card number.", "Do not share a password or a one-time code.", "If a game or a site asks you to pay, you fetch an adult. 'Free' screens can still be trying to sell."],
    ["A pop-up.", "You do not tap buy.", "You call the adult."],
    [["m", "A one-time code from a text should be…", ["kept from everyone except the real service you already trust, and never read out to a caller", "read out to anyone who phones", "posted online", "the same as a username you share"], 0, "A code is a key."],
     ["m", "Who pays online in this family?", ["an adult", "a child with a saved card", "a stranger in a chat", "a pop-up"], 0, "Adults hold the payment."],
     ["m", "A game that says 'free' and then asks for money…", ["needs an adult before any tap", "must be completed", "is always a need", "cannot be closed"], 0, "Fetch a person."]],
    "Passwords stay secret.",
    ["m", "You share a password with…", ["nobody, except a parent who already helps you set it", "a new friend in a game", "a pop-up", "the comments"], 0, "Secret means secret."]);

  if (typeof DIAGNOSTICS !== "undefined") {
    DIAGNOSTICS.f1 = [
      { id: "f1a", skill: "f-flags", stage: "both", q: "A yellow flag means…", type: "multi", options: ["Slow down, no overtaking", "You won", "Speed up", "The race has not started ever"], answer: 0, explain: "Yellow is caution." },
      { id: "f1b", skill: "f-flags", stage: "both", q: "A chequered flag means the session is…", type: "multi", options: ["finished", "just starting", "slippery", "a pit stop"], answer: 0, explain: "Chequered is the finish." },
      { id: "f1c", skill: "f-teams", stage: "both", q: "Ferrari has been in the championship since…", type: "multi", options: ["1950", "last week only", "there is no such team", "the Moon"], answer: 0, explain: "The championship began in 1950." },
      { id: "f1d", skill: "f-sums", stage: "both", q: "Which lap is quicker?", type: "multi", options: ["70 seconds", "90 seconds", "They are the same"], answer: 0, explain: "Less time is faster." },
      { id: "f1e", skill: "f-pits", stage: "both", q: "A modern pit stop is usually for…", type: "multi", options: ["fresh tyres", "lunch", "changing the driver for a horse", "a haircut"], answer: 0, explain: "Tyres. Fuel rules can change." },
      { id: "f1f", skill: "f-history", stage: "both", q: "The world championship began in…", type: "typed", answer: "1950", explain: "1950, at Silverstone." },
    ];
    DIAGNOSTICS.horseworld = [
      { id: "hwa", skill: "w-breeds", stage: "both", q: "A pony is usually…", type: "multi", options: ["14.2 hands or under", "taller than a Shire", "a kart", "measured in laps"], answer: 0, explain: "14.2 hands is the usual cut-off." },
      { id: "hwb", skill: "w-sums", stage: "both", q: "How many inches are in one hand?", type: "typed", answer: "4", explain: "A hand is 4 inches." },
      { id: "hwc", skill: "w-gaits", stage: "both", q: "The trot is…", type: "multi", options: ["two beats", "four beats", "a jump", "standing still"], answer: 0, explain: "Two beats." },
      { id: "hwd", skill: "w-famous", stage: "both", q: "Red Rum won the Grand National…", type: "multi", options: ["three times", "never", "as a book only", "once in a novel"], answer: 0, explain: "1973, 1974 and 1977." },
      { id: "hwe", skill: "w-rules", stage: "both", q: "A lead rope around your hand is…", type: "multi", options: ["dangerous", "the correct hold", "a quick-release knot", "required"], answer: 0, explain: "You must be able to let go." },
      { id: "hwf", skill: "w-move", stage: "both", q: "You approach a horse…", type: "multi", options: ["calmly, at the shoulder", "at a run from behind", "under the belly", "with a surprise shout"], answer: 0, explain: "Shoulder, calm, seen." },
    ];
  }
})();
