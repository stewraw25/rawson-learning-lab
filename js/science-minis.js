/**
 * Stage 3 science teach-pattern roll-out.
 * Builds a mini-lesson (goal, ready check, teach, worked example,
 * guided practice with hints, existing practice, end check) for every
 * science skill and stage that has extras. Unique ready / guided /
 * exit questions are used so they do not repeat in the practice set.
 * Explicit MINI_LESSONS entries still win.
 */
const SCIENCE_MINI_EXTRAS = {
  "biology:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: do living organisms carry out life processes such as growth, yes or no?",
        "answer": "yes",
        "explain": "Living organisms grow, respire, respond, and can reproduce, among other life processes.",
        "hint": "Think of movement, respiration, sensitivity, growth, reproduction, excretion and nutrition."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is a life process?",
        "options": ["respiration", "being made of metal only", "having a serial number"],
        "answer": 0,
        "explain": "Respiration is a life process. Being metal is not.",
        "hint": "Which one happens in living things?"
      },
      {
        "type": "multi",
        "q": "Guided: which is not a living organism?",
        "options": ["a grass plant", "a wooden pencil", "a robin"],
        "answer": 1,
        "explain": "A wooden pencil is not a living organism, even if the wood once came from a tree.",
        "hint": "Is it still carrying out life processes?"
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about biology is correct \u2014 biology?",
        "options": ["Living organisms carry out life processes such as growth and nutrition.", "Only animals, never plants, are living organisms.", "A rock respires."],
        "answer": 0,
        "explain": "Plants and animals are living organisms and carry out life processes.",
        "hint": "Life processes, not just moving about."
      }
  },
  "biology:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: can living things be grouped by shared features, yes or no?",
        "answer": "yes",
        "explain": "Classification uses observable features, such as having a backbone, or being a plant that makes seeds.",
        "hint": "Group by what you can see or test, not by size alone."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which feature is useful for grouping vertebrates?",
        "options": ["having a backbone", "being quite small", "being a favourite animal"],
        "answer": 0,
        "explain": "Vertebrates share a backbone. Size is not enough.",
        "hint": "Look for a reliable feature."
      },
      {
        "type": "multi",
        "q": "Guided: micro-organisms are\u2026",
        "options": ["living things that are usually too small to see without a microscope", "always rocks", "always visible from space"],
        "answer": 0,
        "explain": "Micro-organisms are living, but usually very small. Some can be helpful; some can cause disease.",
        "hint": "Too small to see easily."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about biology is correct \u2014 biology?",
        "options": ["We group living things by shared features, including some that are microscopic.", "All micro-organisms are always harmful.", "Only large animals can be classified."],
        "answer": 0,
        "explain": "Classification uses features. Micro-organisms are living too, and not all are harmful.",
        "hint": "Features, not just size."
      }
  },
  "biology:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is an organ a group of tissues with a job, yes or no?",
        "answer": "yes",
        "explain": "Organs such as the heart, lungs and stomach have particular jobs in the body. The body grows and works as a system.",
        "hint": "Heart, lungs, brain and stomach are organs."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which organ pumps blood?",
        "options": ["the heart", "the lung only", "the skin only"],
        "answer": 0,
        "explain": "The heart is the pump.",
        "hint": "Feel a pulse."
      },
      {
        "type": "multi",
        "q": "Guided: why does the body need a range of foods?",
        "options": ["different foods provide different nutrients for energy, growth and repair", "the body never uses food", "only water is ever needed"],
        "answer": 0,
        "explain": "A varied diet supplies the nutrients the body needs as it grows and repairs.",
        "hint": "Energy, growth, repair."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which pair about biology is correct?",
        "options": ["Organs have jobs; the body needs nutrients to grow and work.", "The heart digests food and the stomach pumps blood.", "Organs are only found in plants, never in humans."],
        "answer": 0,
        "explain": "Keep the jobs clear, and remember that nutrition supports growth.",
        "hint": "Job plus need."
      }
  },
  "biology:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: are animal and plant cells both types of cell, yes or no?",
        "answer": "yes",
        "explain": "Cells are the building blocks of living organisms. Animal and plant cells have some shared features and some differences.",
        "hint": "Both have a nucleus, cytoplasm and cell membrane in the usual school model."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which feature is usually found in plant cells but not in typical animal cells?",
        "options": ["a cell wall and chloroplasts", "a nucleus only, with no other parts", "cytoplasm only"],
        "answer": 0,
        "explain": "Plant cells usually have a cell wall, a vacuole and chloroplasts. Typical animal cells do not.",
        "hint": "Think about the rigid wall and the green parts."
      },
      {
        "type": "multi",
        "q": "Guided: what is a usual job of the nucleus?",
        "options": ["to control the cell and contain genetic material", "to make the cell wall in every animal cell", "to photosynthesise in every animal cell"],
        "answer": 0,
        "explain": "The nucleus contains genetic material and controls the cell.",
        "hint": "The control centre."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about biology is correct \u2014 biology?",
        "options": ["Plant cells usually have a cell wall and chloroplasts; animal cells do not.", "Animal cells always have chloroplasts.", "Neither type of cell has a membrane."],
        "answer": 0,
        "explain": "The cell wall and chloroplasts are typical plant-cell features.",
        "hint": "Compare the two cell types."
      }
  },
  "biology:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is diffusion the net movement of particles from a higher to a lower concentration, yes or no?",
        "answer": "yes",
        "explain": "Diffusion is the net movement of particles from a higher concentration to a lower concentration, down a concentration gradient.",
        "hint": "Particles spread out."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what is osmosis, in the school science sense?",
        "options": ["the diffusion of water through a partially permeable membrane", "the movement of rocks down a hill only", "a type of tooth"],
        "answer": 0,
        "explain": "Osmosis is about water moving through a partially permeable membrane.",
        "hint": "Water, membrane, concentration."
      },
      {
        "type": "multi",
        "q": "Guided: why does diffusion matter in living things?",
        "options": ["substances such as oxygen can move into cells", "it stops all movement in the body", "it only happens in space"],
        "answer": 0,
        "explain": "Useful substances can enter cells, and waste can leave, by diffusion.",
        "hint": "Movement in and out of cells."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about biology is correct \u2014 biology?",
        "options": ["Diffusion is down a concentration gradient; osmosis is the diffusion of water through a partially permeable membrane.", "Osmosis is the movement of any solid through glass.", "Diffusion only moves water, never oxygen."],
        "answer": 0,
        "explain": "Keep the two terms distinct, but related.",
        "hint": "Particles spread; osmosis is water through a membrane."
      }
  },
  "biology:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does the digestive system break down food so nutrients can be absorbed, yes or no?",
        "answer": "yes",
        "explain": "Digestion breaks large food molecules into smaller ones so they can be absorbed into the blood. Enzymes help speed up those reactions. This is the sort of idea used in England GCSE Biology, graded 9-1; this lesson does not promise a grade.",
        "hint": "Break down, then absorb."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what is a main job of digestive enzymes?",
        "options": ["to break large food molecules into smaller ones", "to pump blood", "to make bone only"],
        "answer": 0,
        "explain": "Enzymes are biological catalysts that help digest food.",
        "hint": "They speed up the breakdown."
      },
      {
        "type": "multi",
        "q": "Guided: where is digested food mainly absorbed in humans?",
        "options": ["the small intestine", "the hair", "the teeth only"],
        "answer": 0,
        "explain": "The small intestine is specialised for absorption.",
        "hint": "A long, folded tube."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about biology is correct \u2014 biology?",
        "options": ["Enzymes help digest food so that nutrients can be absorbed.", "The digestive system only stores air.", "Absorption happens only in the teeth."],
        "answer": 0,
        "explain": "Enzymes break food down; the small intestine absorbs the products.",
        "hint": "Break down, then absorb."
      }
  },
  "chemistry:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: do we choose materials because of their properties, yes or no?",
        "answer": "yes",
        "explain": "Hardness, flexibility, transparency, conductivity and waterproofing are properties that help us choose a material for a job.",
        "hint": "Match the property to the use."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which property matters most for an electrical wire?",
        "options": ["electrical conductivity", "being see-through like glass", "being edible"],
        "answer": 0,
        "explain": "A wire needs to conduct electricity, so a metal is often used, with a plastic coating as an insulator.",
        "hint": "What must the current be able to do?"
      },
      {
        "type": "multi",
        "q": "Guided: why is rubber sometimes used on a handle?",
        "options": ["it can be a good insulator and can improve grip", "it is always the strongest metal", "it is always transparent"],
        "answer": 0,
        "explain": "Rubber can insulate and can be gripped more safely than a bare metal handle.",
        "hint": "Safety and grip."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about chemistry is correct \u2014 chemistry?",
        "options": ["A material is chosen because its properties suit the job.", "Every material is equally good for every job.", "Properties never matter."],
        "answer": 0,
        "explain": "The job comes first, then the properties that match it.",
        "hint": "Property plus use."
      }
  },
  "chemistry:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: are solid, liquid and gas three states of matter, yes or no?",
        "answer": "yes",
        "explain": "The three states usually taught first are solid, liquid and gas. Particle ideas help explain their properties.",
        "hint": "Ice, water, steam."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: in the particle model, particles in a solid are usually\u2026",
        "options": ["close together in a regular arrangement, vibrating on the spot", "far apart and free-moving, with almost no attraction", "not present at all"],
        "answer": 0,
        "explain": "Solid particles are packed and vibrate in place. That is why a solid keeps its shape.",
        "hint": "Packed, vibrating, fixed shape."
      },
      {
        "type": "multi",
        "q": "Guided: what happens to particles when a solid melts?",
        "options": ["they gain energy and can move over each other", "they disappear", "they always turn straight into a gas with no liquid"],
        "answer": 0,
        "explain": "Melting lets particles move over each other, so the substance becomes a liquid.",
        "hint": "More energy, more movement."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about chemistry is correct \u2014 chemistry?",
        "options": ["Gases have particles that are far apart and fill their container.", "Solids have particles that fly freely, far apart, all the time.", "Liquids have a fixed shape that never matches a container."],
        "answer": 0,
        "explain": "Gas particles are far apart and fill the container. Liquids take the shape of the bottom of the container.",
        "hint": "Use the particle picture."
      }
  },
  "chemistry:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is a solution made when a substance dissolves in a liquid, yes or no?",
        "answer": "yes",
        "explain": "The liquid is the solvent, the dissolved substance is the solute, and the mixture is the solution.",
        "hint": "Salt is the solute; water is the solvent."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which word means the liquid that does the dissolving?",
        "options": ["solvent", "solute", "magnet"],
        "answer": 0,
        "explain": "The solvent is the liquid, often water.",
        "hint": "Water is a common solvent."
      },
      {
        "type": "multi",
        "q": "Guided: how can you often separate a dissolved solid from water?",
        "options": ["evaporate the water, leaving the solid", "use a magnet on salt", "pour the solution through a hole that only water cannot pass, in every case"],
        "answer": 0,
        "explain": "Evaporation leaves the dissolved solid behind. Filtration does not usually separate a dissolved solid.",
        "hint": "The water can leave as a gas."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about chemistry is correct \u2014 chemistry?",
        "options": ["A solute dissolves in a solvent to make a solution.", "A solvent always disappears for ever when a solid dissolves.", "Dissolving is the same as melting."],
        "answer": 0,
        "explain": "Dissolving makes a solution; the solute is still there. Melting is a change of state, not mixing with a solvent.",
        "hint": "Solute, solvent, solution."
      }
  },
  "chemistry:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: in a chemical reaction, are new substances made, yes or no?",
        "answer": "yes",
        "explain": "A chemical reaction makes new substances. Burning (combustion) is a chemical reaction. A physical change, such as melting, does not make a new substance.",
        "hint": "New stuff, not just a new shape."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is a chemical reaction?",
        "options": ["combustion of a fuel with oxygen", "ice melting to water", "water freezing to ice"],
        "answer": 0,
        "explain": "Combustion makes new substances, such as carbon dioxide and water. Melting and freezing are physical changes.",
        "hint": "Is a new substance made?"
      },
      {
        "type": "multi",
        "q": "Guided: what does a fuel need for combustion?",
        "options": ["oxygen", "only darkness", "a magnet"],
        "answer": 0,
        "explain": "Combustion needs a fuel and oxygen, and an ignition source.",
        "hint": "Think of a fire triangle: fuel, oxygen, heat."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about chemistry is correct \u2014 chemistry?",
        "options": ["Chemical reactions make new substances; melting does not.", "Melting always makes a brand-new chemical.", "Combustion never needs oxygen."],
        "answer": 0,
        "explain": "Keep chemical change and physical change distinct.",
        "hint": "New substance, or just a new state?"
      }
  },
  "chemistry:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does an exothermic reaction transfer energy to the surroundings, yes or no?",
        "answer": "yes",
        "explain": "Exothermic reactions heat the surroundings. Endothermic reactions take in energy and can make the surroundings colder. This idea appears in England GCSE Chemistry, graded 9-1; this lesson does not promise a grade.",
        "hint": "Exo means out; endo means in."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: a reaction that takes in energy from the surroundings is\u2026",
        "options": ["endothermic", "exothermic", "a type of noun"],
        "answer": 0,
        "explain": "Endothermic takes energy in, so the surroundings can feel colder.",
        "hint": "Endo, in."
      },
      {
        "type": "multi",
        "q": "Guided: combustion is usually\u2026",
        "options": ["exothermic", "endothermic", "not a reaction at all"],
        "answer": 0,
        "explain": "Burning transfers energy out to the surroundings, so it is exothermic.",
        "hint": "A fire feels hot."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about chemistry is correct \u2014 chemistry?",
        "options": ["Exothermic transfers energy out; endothermic takes energy in.", "Endothermic always feels hotter than exothermic.", "Energy is never transferred in chemical reactions."],
        "answer": 0,
        "explain": "Remember the direction of the energy transfer.",
        "hint": "Out or in."
      }
  },
  "chemistry:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: can a soluble salt be made and then dried, yes or no?",
        "answer": "yes",
        "explain": "In school chemistry, a soluble salt can be made from a reaction, then the solution is filtered if needed and evaporated or crystallised, and the solid is dried. This is the sort of practical idea used in England GCSE Chemistry, graded 9-1, without promising a grade.",
        "hint": "Make, separate, dry."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: why might you filter a mixture after a reaction?",
        "options": ["to remove leftover solid that did not dissolve or react", "to add more rocks on purpose", "because solutions cannot ever be liquids"],
        "answer": 0,
        "explain": "Filtration removes undissolved solid, leaving a solution of the salt.",
        "hint": "The leftover solid stays on the filter paper."
      },
      {
        "type": "multi",
        "q": "Guided: how can you get dry salt crystals from a salt solution?",
        "options": ["evaporate or crystallise, then dry the solid", "put the solution in a freezer and expect a new metal", "filter out dissolved salt with ordinary filter paper alone, in every case"],
        "answer": 0,
        "explain": "The water is removed by evaporation or crystallisation, then the solid is dried. Ordinary filter paper does not usually take out dissolved salt.",
        "hint": "Remove the water, then dry."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which sequence can give a pure, dry soluble salt?",
        "options": ["react, filter if needed, evaporate or crystallise, then dry", "only stir air into a rock", "melt the beaker"],
        "answer": 0,
        "explain": "The standard school sequence is react, filter if needed, evaporate or crystallise, and dry.",
        "hint": "Make the salt, then get it dry."
      }
  },
  "method:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should a scientific question be something you can test or observe, yes or no?",
        "answer": "yes",
        "explain": "Working scientifically starts with a question you can investigate, then you observe or measure carefully.",
        "hint": "A testable question is more useful than a guess you cannot check."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is a testable question?",
        "options": ["Does a plant grow taller with more hours of light?", "Are plants nicer than stars, in a way no one can check?", "What is the best colour, with no definition of best?"],
        "answer": 0,
        "explain": "You can change the light and measure height. The other questions are not clearly testable.",
        "hint": "Can you measure it?"
      },
      {
        "type": "multi",
        "q": "Guided: what makes an observation useful?",
        "options": ["it is careful and can be recorded", "it is a guess with no looking", "it changes every time on purpose, with no record"],
        "answer": 0,
        "explain": "A useful observation is careful and written down or measured.",
        "hint": "Look, then record."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about working scientifically is correct \u2014 working scientifically?",
        "options": ["A scientific question should be testable, and observations should be recorded carefully.", "Science never uses questions.", "You should never write down what you see."],
        "answer": 0,
        "explain": "Ask a testable question, then observe and record.",
        "hint": "Question, observe, record."
      }
  },
  "method:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: in a fair test, should you change only one thing at a time, yes or no?",
        "answer": "yes",
        "explain": "A fair test changes one factor, measures another, and keeps the rest the same.",
        "hint": "One change, one measurement, everything else constant."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: you want to test how water volume affects plant growth. What should you keep the same?",
        "options": ["the type of plant and the amount of light, among other conditions", "everything, including the water, so nothing is tested", "as many things as possible, all at once"],
        "answer": 0,
        "explain": "Change only the water volume. Keep other conditions the same.",
        "hint": "Only one change."
      },
      {
        "type": "multi",
        "q": "Guided: why is a fair test useful?",
        "options": ["so you can tell which change caused the result", "so the results are always the same as last year, automatically", "so you never have to measure anything"],
        "answer": 0,
        "explain": "If two things change at once, you cannot tell which one mattered.",
        "hint": "Cause and effect."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which investigation is fairer?",
        "options": ["change only the slope, and use the same car and surface each time", "change the slope, the car and the surface all at once", "do not measure the distance at all"],
        "answer": 0,
        "explain": "Only the slope should change if that is what you are testing.",
        "hint": "One factor at a time."
      }
  },
  "method:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should you choose a measuring instrument that is suitable for the job, yes or no?",
        "answer": "yes",
        "explain": "A ruler, a stopwatch, a thermometer or a microscope each has a job. Record the reading with a unit.",
        "hint": "The right tool, then a careful reading."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which instrument would you use to measure a short time?",
        "options": ["a stopwatch", "a metre ruler only", "a forcemeter only"],
        "answer": 0,
        "explain": "A stopwatch measures time.",
        "hint": "Match the quantity to the tool."
      },
      {
        "type": "multi",
        "q": "Guided: why might you use a microscope?",
        "options": ["to see details that are too small for the eye alone", "to measure the length of a field", "to time a race"],
        "answer": 0,
        "explain": "A microscope magnifies small details, such as cells.",
        "hint": "Too small to see clearly."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about working scientifically is correct \u2014 working scientifically?",
        "options": ["Choose a suitable instrument and record the reading with a unit.", "Units are never needed in a science result.", "Any instrument can measure any quantity equally well."],
        "answer": 0,
        "explain": "The instrument must match the quantity, and the unit must be written.",
        "hint": "Tool plus unit."
      }
  },
  "method:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is the independent variable the one you change, yes or no?",
        "answer": "yes",
        "explain": "The independent variable is what you change. The dependent variable is what you measure. Control variables are what you keep the same. This language is used in England GCSE science, graded 9-1; this lesson does not promise a grade.",
        "hint": "Change, measure, keep the same."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: you change the temperature and measure the time for a reaction. What is the independent variable?",
        "options": ["temperature", "time for the reaction", "the size of the beaker, if you kept it the same"],
        "answer": 0,
        "explain": "Temperature is what you change.",
        "hint": "The one you choose to change."
      },
      {
        "type": "multi",
        "q": "Guided: what are control variables?",
        "options": ["the things you keep the same so the test is fair", "the things you change on purpose, all at once", "the things you never record"],
        "answer": 0,
        "explain": "Control variables stay the same.",
        "hint": "Keep them constant."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which set is correctly named?",
        "options": ["independent = what you change; dependent = what you measure; control = what you keep the same", "independent = what you measure; dependent = what you keep the same", "control = the only thing you change"],
        "answer": 0,
        "explain": "Change, measure, keep the same: independent, dependent, control.",
        "hint": "Three jobs, three names."
      }
  },
  "method:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does repeating a measurement help you judge how reliable a result is, yes or no?",
        "answer": "yes",
        "explain": "Repeats, honest recording, and comparing with other evidence are part of working scientifically. A method should be clear enough for someone else to follow.",
        "hint": "If repeats are close, the result is more reliable."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: why repeat a measurement?",
        "options": ["to check how consistent the results are", "to hide an anomalous result without noting it", "because one measurement is always enough, in every case"],
        "answer": 0,
        "explain": "Repeats let you see whether a result is consistent, and they can help you spot an odd value.",
        "hint": "Consistency, not hiding data."
      },
      {
        "type": "multi",
        "q": "Guided: a scientific method should be\u2026",
        "options": ["clear enough for someone else to repeat the work", "a secret so no one can check it", "a guess with no steps"],
        "answer": 0,
        "explain": "A method has to be repeatable by someone else.",
        "hint": "Someone else should be able to follow it."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about working scientifically is correct \u2014 working scientifically?",
        "options": ["Repeats and a clear method help you judge how reliable a result is.", "You should change the method secretly halfway through and not record that.", "Reliability is the same as always getting the answer you hoped for."],
        "answer": 0,
        "explain": "Reliability is about consistency and a method others can repeat, not about a hoped-for answer.",
        "hint": "Clear method, honest repeats."
      }
  },
  "method:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: should a conclusion be based on the data, yes or no?",
        "answer": "yes",
        "explain": "A conclusion answers the question using the results. An evaluation looks at limitations, anomalous results, and how the method could be improved. This is used in England GCSE science, graded 9-1, without promising a grade.",
        "hint": "Data first, then the claim."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: a conclusion should\u2026",
        "options": ["be supported by the results you collected", "ignore the results if you prefer a different idea", "never mention the question"],
        "answer": 0,
        "explain": "The conclusion is drawn from the data, and it should answer the question.",
        "hint": "Stay with the evidence."
      },
      {
        "type": "multi",
        "q": "Guided: what is an anomalous result?",
        "options": ["a value that does not fit the pattern", "the average of all the results", "a unit, such as metres"],
        "answer": 0,
        "explain": "An anomaly does not fit the pattern and should be checked or discussed, not quietly hidden.",
        "hint": "The odd one out."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about working scientifically is correct \u2014 working scientifically?",
        "options": ["A conclusion uses the data; an evaluation discusses limits and improvements.", "An evaluation means deleting any result you do not like.", "A conclusion can never refer to the question."],
        "answer": 0,
        "explain": "Conclude from the data, then evaluate the quality of the method and the results.",
        "hint": "Conclude, then evaluate."
      }
  },
  "physics:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: if forces on an object are balanced, does its motion stay the same, yes or no?",
        "answer": "yes",
        "explain": "Balanced forces cancel out. A still object stays still, and a moving object keeps a steady speed in a straight line, unless an unbalanced force acts.",
        "hint": "Balanced means no change in motion."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: two children push a box equally hard in opposite directions. The forces are\u2026",
        "options": ["balanced, so the box does not start to move", "unbalanced, so the box must fly upwards", "not forces at all"],
        "answer": 0,
        "explain": "Equal forces in opposite directions are balanced.",
        "hint": "Equal and opposite."
      },
      {
        "type": "multi",
        "q": "Guided: what do unbalanced forces do?",
        "options": ["they change an object's speed or direction", "they always leave motion unchanged", "they only change an object's colour"],
        "answer": 0,
        "explain": "A resultant (unbalanced) force changes motion.",
        "hint": "Change of speed or direction."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about physics is correct \u2014 physics?",
        "options": ["Balanced forces do not change motion; unbalanced forces do.", "Balanced forces always speed an object up.", "A still object can never have forces on it."],
        "answer": 0,
        "explain": "The key is whether the forces cancel.",
        "hint": "Balanced, no change; unbalanced, change."
      }
  },
  "physics:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does sound need a medium such as air to travel, yes or no?",
        "answer": "yes",
        "explain": "Sound travels as vibrations through a solid, liquid or gas. It does not travel through a vacuum.",
        "hint": "No air on the Moon, no sound to hear in the usual way."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is a true statement about sound?",
        "options": ["a larger vibration is usually louder", "sound travels fastest through a vacuum", "sound is a smell"],
        "answer": 0,
        "explain": "Amplitude links to loudness. Sound cannot travel through empty space.",
        "hint": "Bigger vibration, louder sound."
      },
      {
        "type": "multi",
        "q": "Guided: sound usually travels fastest through\u2026",
        "options": ["a solid", "a vacuum", "empty outer space with no particles"],
        "answer": 0,
        "explain": "Particles are closer in a solid, so the vibration is often passed on more quickly than in a gas.",
        "hint": "Think of a tap on a table."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about physics is correct \u2014 physics?",
        "options": ["Sound is a vibration that needs a medium; it cannot travel through a vacuum.", "Sound travels freely through empty space.", "Quieter sounds always have larger vibrations."],
        "answer": 0,
        "explain": "A medium is needed. Larger vibrations are usually louder.",
        "hint": "Vibration plus medium."
      }
  },
  "physics:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does gravity pull objects towards the Earth, yes or no?",
        "answer": "yes",
        "explain": "Gravity is a non-contact force. On Earth it pulls objects down, towards the centre of the Earth. Weight is the force due to gravity.",
        "hint": "Drop a ball and it falls down, not up."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what is weight, in school science?",
        "options": ["the force of gravity on an object", "the same as mass in every unit, always", "a type of colour"],
        "answer": 0,
        "explain": "Weight is a force, measured in newtons. Mass is the amount of matter, measured in kilograms.",
        "hint": "Force, not kilograms."
      },
      {
        "type": "multi",
        "q": "Guided: what does air resistance do to a falling skydiver as they speed up?",
        "options": ["it increases and can oppose their fall", "it always disappears", "it pushes them faster without a limit in every case, with no other forces"],
        "answer": 0,
        "explain": "Air resistance usually increases with speed and acts against the motion.",
        "hint": "The air pushes back."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about physics is correct \u2014 physics?",
        "options": ["Weight is the gravity force; air resistance can oppose motion through the air.", "Mass and weight are always the same quantity, in the same unit.", "Gravity only acts on Earth if an object is moving."],
        "answer": 0,
        "explain": "Keep mass and weight distinct, and remember that air resistance opposes motion.",
        "hint": "Gravity down; air resistance against the motion."
      }
  },
  "physics:4": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is speed the distance travelled divided by the time taken, yes or no?",
        "answer": "yes",
        "explain": "Speed = distance divided by time. This is a core idea in England GCSE Physics, graded 9-1; this lesson does not promise a grade.",
        "hint": "How far, in how long."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: a pony walks 20 metres in 10 seconds. What is its average speed in metres per second?",
        "options": ["2", "200", "0.5"],
        "answer": 0,
        "explain": "20 divided by 10 is 2 m/s.",
        "hint": "Distance divided by time."
      },
      {
        "type": "multi",
        "q": "Guided: if the force on an object increases and its mass stays the same, its acceleration usually\u2026",
        "options": ["increases", "must become zero", "is never affected"],
        "answer": 0,
        "explain": "A larger unbalanced force gives a larger acceleration for the same mass.",
        "hint": "Bigger push, bigger change of speed."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about physics is correct \u2014 physics?",
        "options": ["Speed is distance divided by time; a larger force can give a larger acceleration for the same mass.", "Speed is time divided by distance.", "Mass has no effect on how hard it is to accelerate an object."],
        "answer": 0,
        "explain": "Use speed = distance divided by time, and remember that force and mass affect acceleration.",
        "hint": "Distance over time; force and mass."
      }
  },
  "physics:5": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: if no unbalanced force acts, does a moving object keep moving at a steady speed in a straight line, yes or no?",
        "answer": "yes",
        "explain": "That is Newton's first law: a resultant force is needed to change motion, not to keep a steady motion going. This is used in England GCSE Physics, graded 9-1, without promising a grade.",
        "hint": "No resultant force, no change of motion."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: a book sits still on a table. The forces on it are\u2026",
        "options": ["balanced", "unbalanced, so it must start to hover", "not present at all"],
        "answer": 0,
        "explain": "Weight is balanced by the support force from the table.",
        "hint": "It stays still, so the forces cancel."
      },
      {
        "type": "multi",
        "q": "Guided: Newton's first law says a resultant force is needed to\u2026",
        "options": ["change an object's speed or direction", "keep a moving object going at a steady speed in a straight line, in the absence of drag", "change only an object's colour"],
        "answer": 0,
        "explain": "A resultant force changes motion. Steady motion in a straight line does not need a resultant force.",
        "hint": "Change, not steady motion."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about physics is correct \u2014 physics?",
        "options": ["A resultant force changes motion; balanced forces do not.", "An object can only stay still if no forces act on it at all.", "A resultant force is needed to keep a steady speed in a straight line in empty space with no drag."],
        "answer": 0,
        "explain": "Balanced forces can keep something still, or keep its motion steady. A resultant force is what changes motion.",
        "hint": "Resultant means change."
      }
  },
  "physics:6": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is a resultant force the single force that has the same effect as all the forces combined, yes or no?",
        "answer": "yes",
        "explain": "If forces act in a straight line, you add forces in the same direction and subtract forces in the opposite direction. This is used in England GCSE Physics, graded 9-1; this lesson does not promise a grade.",
        "hint": "One force to replace the set."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: a 10 N force right and a 4 N force left gives a resultant of\u2026",
        "options": ["6 N to the right", "14 N to the left", "0 N"],
        "answer": 0,
        "explain": "10 minus 4 is 6 N, in the direction of the larger force, to the right.",
        "hint": "Subtract opposite forces."
      },
      {
        "type": "multi",
        "q": "Guided: if the resultant force on an object is zero, the forces are\u2026",
        "options": ["balanced", "unbalanced", "not forces"],
        "answer": 0,
        "explain": "A zero resultant means the forces cancel, so they are balanced.",
        "hint": "Resultant zero, no change of motion."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about physics is correct \u2014 physics?",
        "options": ["A resultant force of zero means balanced forces and no change of motion.", "You always add opposite forces to get a larger resultant.", "A resultant force is always zero, in every situation."],
        "answer": 0,
        "explain": "Add same-direction forces; subtract opposite ones. Zero means balanced.",
        "hint": "Combine, then look at the leftover force."
      }
  },
  "y-alive:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: do living things grow, yes or no?",
        "answer": "yes",
        "explain": "Living things grow, need food or energy, and can reproduce. A stone does not.",
        "hint": "Think about a plant or an animal."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which of these is living?",
        "options": ["a pebble", "a pony", "a metal bucket"],
        "answer": 1,
        "explain": "A pony is a living animal. A pebble and a bucket are not alive.",
        "hint": "Which one can grow and need food?"
      },
      {
        "type": "multi",
        "q": "Guided: which sign suggests something is living?",
        "options": ["it never changes at all", "it grows and needs nutrition", "it is made of metal"],
        "answer": 1,
        "explain": "Growth and nutrition are signs of living things.",
        "hint": "Look for life processes."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which group is all living?",
        "options": ["rock, water, air", "horse, grass, human", "glass, nail, plastic"],
        "answer": 1,
        "explain": "Horse, grass and a human are living things.",
        "hint": "Which group can grow?"
      }
  },
  "y-alive:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: do insects have a backbone, yes or no?",
        "answer": "no",
        "explain": "Insects are invertebrates: they do not have a backbone.",
        "hint": "A backbone is a spine."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which animal is a vertebrate?",
        "options": ["a beetle", "a horse", "a spider"],
        "answer": 1,
        "explain": "A horse has a backbone. Beetles and spiders do not.",
        "hint": "Vertebrates have a spine."
      },
      {
        "type": "multi",
        "q": "Guided: which feature helps you group an insect?",
        "options": ["six legs", "fur and a backbone", "feathers"],
        "answer": 0,
        "explain": "Insects have six legs. That is a useful observable feature.",
        "hint": "Count the legs."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about living things is correct?",
        "options": ["All small animals are insects.", "A fly is an insect; a pony is a vertebrate.", "Spiders are insects because they are small."],
        "answer": 1,
        "explain": "A fly has six legs, so it is an insect. A pony has a backbone, so it is a vertebrate. Spiders have eight legs, so they are not insects.",
        "hint": "Use features, not just size."
      }
  },
  "y-alive:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does a life cycle show stages in a living thing's life, yes or no?",
        "answer": "yes",
        "explain": "A life cycle is the pattern of stages, such as egg, young and adult.",
        "hint": "It comes back to the start when adults reproduce."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is a life-cycle stage for a butterfly?",
        "options": ["leaf", "pupa", "pebble"],
        "answer": 1,
        "explain": "A butterfly has a pupa (chrysalis) stage.",
        "hint": "Egg, larva, pupa, adult."
      },
      {
        "type": "multi",
        "q": "Guided: what do adults in a life cycle often do?",
        "options": ["reproduce, so the cycle can start again", "turn into rocks", "stop being living things"],
        "answer": 0,
        "explain": "Reproduction starts the next generation.",
        "hint": "The cycle continues."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement is true?",
        "options": ["Every animal has exactly the same stages as a butterfly.", "Different living things can have different life-cycle stages, but they still grow and reproduce.", "Plants do not have life cycles."],
        "answer": 1,
        "explain": "The pattern is similar, but the stages can look different. Plants have life cycles too.",
        "hint": "Same idea, different stages."
      }
  },
  "y-body:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does a human body need food and water, yes or no?",
        "answer": "yes",
        "explain": "The body needs food, water, air and movement to stay healthy.",
        "hint": "Think about your basic needs."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which habit supports a healthy body?",
        "options": ["eating a range of foods and being active", "never drinking water", "never moving"],
        "answer": 0,
        "explain": "A range of foods, water and movement help the body.",
        "hint": "What would a doctor usually recommend?"
      },
      {
        "type": "multi",
        "q": "Guided: why does the body need food?",
        "options": ["for energy and materials to grow and repair", "only to make a noise", "it does not need food"],
        "answer": 0,
        "explain": "Food provides energy and materials for growth and repair.",
        "hint": "Think of energy and growth."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which list best supports a healthy body?",
        "options": ["food, water, air and exercise", "only sweets and no sleep", "no food and no water"],
        "answer": 0,
        "explain": "Food, water, air and exercise are basic needs.",
        "hint": "Keep the essentials."
      }
  },
  "y-body:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: do back teeth usually crush food, yes or no?",
        "answer": "yes",
        "explain": "Back teeth (molars) crush and grind. Front teeth cut and bite.",
        "hint": "Feel where you chew a carrot."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what are front teeth mainly used for?",
        "options": ["cutting and biting food", "only grinding bones in every animal", "pumping blood"],
        "answer": 0,
        "explain": "Incisors at the front are used for cutting and biting.",
        "hint": "The sharp edges at the front."
      },
      {
        "type": "multi",
        "q": "Guided: why should you clean your teeth?",
        "options": ["to help remove plaque and look after the tooth surface", "because teeth cannot decay", "because enamel grows back fully each night"],
        "answer": 0,
        "explain": "Cleaning helps remove plaque. Enamel does not simply grow back each night.",
        "hint": "Look after the surface of the tooth."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about the body is correct?",
        "options": ["Front teeth cut; back teeth crush.", "All teeth do exactly the same job.", "Teeth are only for speaking."],
        "answer": 0,
        "explain": "Different teeth have different jobs.",
        "hint": "Front and back are not the same."
      }
  },
  "y-body:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does the heart pump blood, yes or no?",
        "answer": "yes",
        "explain": "The heart is a pump. It sends blood around the body.",
        "hint": "Put a hand on the left side of your chest and feel the beat."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what is a main job of the lungs?",
        "options": ["to take in oxygen from the air", "to digest food", "to pump blood"],
        "answer": 0,
        "explain": "The lungs take in oxygen and get rid of carbon dioxide.",
        "hint": "Think about breathing."
      },
      {
        "type": "multi",
        "q": "Guided: what does blood mainly carry?",
        "options": ["oxygen, nutrients and waste", "only broken bones", "only sound"],
        "answer": 0,
        "explain": "Blood carries useful substances and waste around the body.",
        "hint": "It is a transport system."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which pair about the body is correct?",
        "options": ["Heart pumps blood; lungs take in air.", "Lungs pump blood; the heart only stores food.", "The heart digests food."],
        "answer": 0,
        "explain": "The heart is the pump; the lungs are for gas exchange.",
        "hint": "Keep the two jobs separate."
      }
  },
  "y-home:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does a habitat provide what a living thing needs, yes or no?",
        "answer": "yes",
        "explain": "A habitat is the place where a living thing lives. It should provide things such as food, water, shelter and space.",
        "hint": "Think of a pond or a woodland."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is a habitat?",
        "options": ["a pond", "a plastic toy on its own, not used by any living thing", "a single word with no meaning"],
        "answer": 0,
        "explain": "A pond can be a habitat for plants and animals.",
        "hint": "Where could things live?"
      },
      {
        "type": "multi",
        "q": "Guided: what should a habitat provide?",
        "options": ["the things the living thing needs to survive", "only noise", "nothing at all"],
        "answer": 0,
        "explain": "Food, water, shelter and space are typical needs.",
        "hint": "Needs, not just a location on a map."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about habitats is correct \u2014 habitats?",
        "options": ["A habitat is where a living thing lives and gets what it needs.", "A habitat is only a type of rock.", "Living things do not need a place to live."],
        "answer": 0,
        "explain": "The habitat has to meet the living thing's needs.",
        "hint": "Place plus needs."
      }
  },
  "y-home:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: in a food chain, does the arrow usually mean 'is eaten by', yes or no?",
        "answer": "yes",
        "explain": "The arrow points to the eater: grass to rabbit means grass is eaten by the rabbit.",
        "hint": "The arrow shows the direction the energy goes."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: in the chain grass, then rabbit, then fox, what eats the rabbit?",
        "options": ["grass", "the fox", "a rock"],
        "answer": 1,
        "explain": "The arrow from rabbit to fox means the rabbit is eaten by the fox.",
        "hint": "Follow the arrow."
      },
      {
        "type": "multi",
        "q": "Guided: what is usually at the start of a food chain?",
        "options": ["a green plant that can make food", "only a fox", "a plastic bottle"],
        "answer": 0,
        "explain": "A producer, usually a plant, starts the chain.",
        "hint": "Who makes the food first?"
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which reading of leaf to caterpillar to bird is correct?",
        "options": ["The leaf is eaten by the caterpillar, which is eaten by the bird.", "The bird is eaten by the leaf.", "The arrows show only the wind direction."],
        "answer": 0,
        "explain": "Each arrow means is eaten by.",
        "hint": "Start at the plant."
      }
  },
  "y-home:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is an adaptation a feature that helps a living thing survive, yes or no?",
        "answer": "yes",
        "explain": "An adaptation is a feature that helps a living thing survive in its habitat.",
        "hint": "Think of thick fur in a cold place."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is an adaptation for a cold habitat?",
        "options": ["thick fur", "very thin tropical leaves with no other use suggested", "having no need for food"],
        "answer": 0,
        "explain": "Thick fur can help an animal keep warm.",
        "hint": "Match the feature to the habitat."
      },
      {
        "type": "multi",
        "q": "Guided: why might a duck have webbed feet?",
        "options": ["to help it swim", "to help it climb mountains only", "because feet are never useful"],
        "answer": 0,
        "explain": "Webbed feet are a feature that helps swimming.",
        "hint": "Think about water."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about habitats is correct \u2014 habitats?",
        "options": ["An adaptation helps a living thing survive in its habitat.", "An adaptation is a random decoration with no use.", "Only rocks have adaptations."],
        "answer": 0,
        "explain": "The feature has a survival job in that habitat.",
        "hint": "Feature plus habitat."
      }
  },
  "y-mats:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is metal often used when something needs to be strong and hard, yes or no?",
        "answer": "yes",
        "explain": "Materials are chosen for their properties, such as strength, flexibility or waterproofing.",
        "hint": "Think of a metal gate bolt."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which material is usually the most flexible for a coat?",
        "options": ["rock", "fabric", "glass"],
        "answer": 1,
        "explain": "Fabric can flex and is useful for clothing. Rock and glass are not flexible in that way.",
        "hint": "What can you fold?"
      },
      {
        "type": "multi",
        "q": "Guided: why might a window be made of glass, not wood?",
        "options": ["glass can be transparent, so light can pass through", "wood is always stronger than any other material", "glass is never breakable"],
        "answer": 0,
        "explain": "Glass lets light through. That property matches the job of a window.",
        "hint": "Match the property to the job."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which pairing makes most sense?",
        "options": ["a metal bolt for strength; a rubber sole for grip", "a paper bolt for a heavy gate; a glass sole for running", "a chocolate window and a sponge hammer"],
        "answer": 0,
        "explain": "Choose a material because its properties suit the job.",
        "hint": "Strength, grip, and suitability."
      }
  },
  "y-mats:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is ice a solid, yes or no?",
        "answer": "yes",
        "explain": "Ice is water in the solid state. Water can be a solid, a liquid or a gas.",
        "hint": "Ice keeps its shape."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which state has a fixed shape and a fixed volume?",
        "options": ["solid", "liquid", "gas"],
        "answer": 0,
        "explain": "A solid keeps its shape and volume unless a force changes it.",
        "hint": "Think of a rock."
      },
      {
        "type": "multi",
        "q": "Guided: which statement is true of a gas?",
        "options": ["it fills the container it is in", "it always has a fixed shape like a cube", "it cannot be water"],
        "answer": 0,
        "explain": "A gas spreads out to fill its container. Water can be a gas (water vapour or steam).",
        "hint": "Gases do not keep a fixed shape."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which change of state is melting?",
        "options": ["solid to liquid", "liquid to solid", "gas to solid"],
        "answer": 0,
        "explain": "Melting is solid to liquid, such as ice to water.",
        "hint": "What happens to ice in a warm room?"
      }
  },
  "y-mats:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: if salt disappears into water, has it gone forever, yes or no?",
        "answer": "no",
        "explain": "Salt can dissolve and still be there in the water. You can often get it back by evaporating the water.",
        "hint": "The salt is still in the solution."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what do we call a mixture of a dissolved solid in a liquid?",
        "options": ["a solution", "a magnet", "a circuit"],
        "answer": 0,
        "explain": "A solution is made when a substance dissolves in a liquid.",
        "hint": "Salt water is a solution."
      },
      {
        "type": "multi",
        "q": "Guided: which is more likely to dissolve in water?",
        "options": ["salt", "a metal bolt", "a pebble"],
        "answer": 0,
        "explain": "Salt dissolves in water. A bolt and a pebble do not.",
        "hint": "Think of sea water."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about materials is correct?",
        "options": ["A dissolved solid can still be in the water, even if you cannot see it.", "Dissolving always means the solid has been destroyed.", "Only metals can dissolve."],
        "answer": 0,
        "explain": "Dissolving spreads the solid through the liquid; it is still there.",
        "hint": "You can often get it back by evaporation."
      }
  },
  "y-plants:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: do most plants need light, yes or no?",
        "answer": "yes",
        "explain": "Most plants need light, water and a suitable temperature to grow.",
        "hint": "Think about a plant left in the dark."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which does a healthy plant usually need?",
        "options": ["water, light and room to grow", "only stones and darkness", "no water at all"],
        "answer": 0,
        "explain": "Water, light and space are basic needs.",
        "hint": "What would you give a plant you were looking after?"
      },
      {
        "type": "multi",
        "q": "Guided: what is likely if a plant has no water for a long time?",
        "options": ["it will usually wilt or die", "it will definitely turn into an animal", "it will not be affected"],
        "answer": 0,
        "explain": "Without water, plants usually wilt.",
        "hint": "Water is a basic need."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which list is the best set of plant needs?",
        "options": ["light, water and a suitable temperature", "only music", "darkness and no water"],
        "answer": 0,
        "explain": "Light, water and a suitable temperature help a plant grow.",
        "hint": "Think of the basics."
      }
  },
  "y-plants:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: which part of a plant is usually in the soil, the root or the flower?",
        "answer": "root",
        "explain": "Roots are usually in the soil. They take up water and hold the plant.",
        "hint": "Think about what you pull up when you lift a plant."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what is a main job of leaves?",
        "options": ["to take in light for making food", "to hold the plant in the soil only", "to turn into roots"],
        "answer": 0,
        "explain": "Leaves catch light, which plants use to make food.",
        "hint": "The flat green parts."
      },
      {
        "type": "multi",
        "q": "Guided: what does the stem do?",
        "options": ["it usually supports the plant and carries water", "it only makes seeds", "it is always underground"],
        "answer": 0,
        "explain": "The stem holds the plant up and can carry water to the leaves.",
        "hint": "Think of a flower stalk."
      }
    ],
    "exit": 
      {
        "type": "typed",
        "q": "End check: which plant part is often colourful and involved in making seeds?",
        "answer": "flower",
        "explain": "Flowers are often colourful and are involved in reproduction and seed making.",
        "hint": "The part that may have petals."
      }
  },
  "y-plants:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: what is the name of the process plants use to make food using light?",
        "answer": "photosynthesis",
        "explain": "Photosynthesis is how plants make food using light.",
        "hint": "The word starts with photo, meaning light."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which inputs does photosynthesis need?",
        "options": ["carbon dioxide, water and light", "only oxygen and darkness", "only soil stones"],
        "answer": 0,
        "explain": "Plants use carbon dioxide, water and light to make glucose, and they release oxygen.",
        "hint": "Light plus two raw materials."
      },
      {
        "type": "multi",
        "q": "Guided: what gas do plants release during photosynthesis?",
        "options": ["nitrogen only", "oxygen", "helium"],
        "answer": 1,
        "explain": "Oxygen is released during photosynthesis.",
        "hint": "The gas animals need to breathe."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about plants is correct?",
        "options": ["Plants make food in their leaves using light.", "Plants can only make food in complete darkness.", "Photosynthesis happens only in animals."],
        "answer": 0,
        "explain": "Leaves use light to make food. That process is photosynthesis.",
        "hint": "Where does a plant catch light?"
      }
  },
  "y-push:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is a push or a pull a force, yes or no?",
        "answer": "yes",
        "explain": "A force is a push or a pull. It can start, stop or change movement, or change a shape.",
        "hint": "Feel yourself push a door."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is a pull?",
        "options": ["tugging a lead rope towards you", "leaning on a gate to close it away from you", "the colour of the gate"],
        "answer": 0,
        "explain": "A tug towards you is a pull. Leaning the gate away is a push.",
        "hint": "Towards you is a pull."
      },
      {
        "type": "multi",
        "q": "Guided: what can a force do to a moving ball?",
        "options": ["speed it up, slow it down, or change its direction", "only change its colour", "nothing at all, ever"],
        "answer": 0,
        "explain": "Forces can change speed or direction.",
        "hint": "Think of kicking or catching."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about forces is correct \u2014 forces?",
        "options": ["Forces can start, stop or change movement.", "Forces are only colours.", "A force can never change an object's shape."],
        "answer": 0,
        "explain": "Pushes and pulls can change movement or shape.",
        "hint": "Push, pull, change."
      }
  },
  "y-push:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is sound made by a vibration, yes or no?",
        "answer": "yes",
        "explain": "Sound is caused by vibrations. The vibrations travel to your ear.",
        "hint": "Touch your throat while you hum."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: if a vibration is bigger, the sound is usually\u2026",
        "options": ["quieter", "louder", "gone completely"],
        "answer": 1,
        "explain": "A larger vibration usually makes a louder sound.",
        "hint": "Think of hitting a drum harder."
      },
      {
        "type": "multi",
        "q": "Guided: how does sound travel to your ear?",
        "options": ["as vibrations through a medium such as air", "only through a vacuum, never through air", "as a smell"],
        "answer": 0,
        "explain": "Sound needs a medium, such as air, water or a solid. It does not travel through empty space.",
        "hint": "The vibration has to travel."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about forces is correct \u2014 forces?",
        "options": ["Sound is a vibration that travels to the ear.", "Sound is a type of smell.", "Louder sounds always have smaller vibrations."],
        "answer": 0,
        "explain": "Sound is a vibration. Bigger vibrations are usually louder.",
        "hint": "Vibration travels; the ear detects it."
      }
  },
  "y-push:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does friction act when two surfaces rub, yes or no?",
        "answer": "yes",
        "explain": "Friction is a force between surfaces that are in contact. It can slow things down or help you grip.",
        "hint": "Feel your hands rub together."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: which is an example of friction being useful?",
        "options": ["the grip of a shoe on the ground", "a bike wheel locking in a way that always helps you speed up", "the colour of the shoe"],
        "answer": 0,
        "explain": "Friction between shoe and ground helps you not to slip.",
        "hint": "Grip is useful friction."
      },
      {
        "type": "multi",
        "q": "Guided: what does air resistance do to a moving cyclist?",
        "options": ["it pushes back and can slow the cyclist down", "it always pulls the cyclist forward", "it has no effect at any speed"],
        "answer": 0,
        "explain": "Air resistance is a drag force that opposes motion through the air.",
        "hint": "The air pushes back."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about forces is correct \u2014 forces?",
        "options": ["Friction and air resistance can oppose motion.", "Friction only exists in space, not on Earth.", "Air resistance always speeds objects up."],
        "answer": 0,
        "explain": "Both forces can push back against movement.",
        "hint": "They oppose motion."
      }
  },
  "y-sky:1": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: does day and night happen because the Earth spins, yes or no?",
        "answer": "yes",
        "explain": "The Earth rotates on its axis. The side facing the Sun has day; the side facing away has night.",
        "hint": "The Earth spins, not the Sun going out."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what is it on the side of Earth facing away from the Sun?",
        "options": ["day", "night", "always midsummer everywhere"],
        "answer": 1,
        "explain": "The face-away side is in shadow, so it is night.",
        "hint": "Light comes from the Sun."
      },
      {
        "type": "multi",
        "q": "Guided: about how long does one full spin of the Earth take?",
        "options": ["about 24 hours", "about one month", "about one year"],
        "answer": 0,
        "explain": "One rotation is about 24 hours, which is a day and a night.",
        "hint": "A day is one spin."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about day, night and space is correct \u2014 day, night and space?",
        "options": ["Day and night are caused by the Earth spinning.", "Day and night happen because the Earth stops once a week.", "The Sun switches off at night."],
        "answer": 0,
        "explain": "The Earth rotates, so different sides face the Sun.",
        "hint": "Spin, not a switching-off of the Sun."
      }
  },
  "y-sky:2": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is a year the time Earth takes to orbit the Sun, yes or no?",
        "answer": "yes",
        "explain": "A year is one orbit of the Earth around the Sun. A month is roughly the time for the Moon to orbit the Earth.",
        "hint": "Orbit means go around."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what does the Moon orbit?",
        "options": ["the Earth", "only a street lamp", "the bottom of the sea"],
        "answer": 0,
        "explain": "The Moon orbits the Earth.",
        "hint": "Our closest neighbour in space."
      },
      {
        "type": "multi",
        "q": "Guided: about how long is a year?",
        "options": ["about 365 days", "about 24 hours", "about 7 days"],
        "answer": 0,
        "explain": "A year is about 365 days, the time for one orbit.",
        "hint": "One trip around the Sun."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which pair about day, night and space is correct?",
        "options": ["A year is an Earth orbit of the Sun; a month is about one Moon orbit of the Earth.", "A year is one Earth spin; a month is one year.", "The Moon orbits the Sun once each hour."],
        "answer": 0,
        "explain": "Keep the two timescales separate: year for the Earth's orbit, month for the Moon's.",
        "hint": "Two different orbits."
      }
  },
  "y-sky:3": {
    "prereq": [
      {
        "type": "typed",
        "q": "Ready check: is the Sun at the centre of our solar system, yes or no?",
        "answer": "yes",
        "explain": "The planets orbit the Sun, which is at the centre of the solar system.",
        "hint": "The Sun is a star."
      }
    ],
    "guided": [
      {
        "type": "multi",
        "q": "Guided: what do planets do?",
        "options": ["orbit the Sun", "stay completely still in empty space with no movement at all", "orbit the Moon only"],
        "answer": 0,
        "explain": "Planets travel around the Sun.",
        "hint": "The path is an orbit."
      },
      {
        "type": "multi",
        "q": "Guided: why do seasons change in the UK?",
        "options": ["the Earth's tilt and its orbit around the Sun change how sunlight falls on a place through the year", "the Sun moves to a different galaxy each week", "seasons are caused only by the Moon switching off"],
        "answer": 0,
        "explain": "The Earth's tilt and orbit change the sunlight we get through the year, which is why seasons change.",
        "hint": "Tilt plus orbit."
      }
    ],
    "exit": 
      {
        "type": "multi",
        "q": "End check: which statement about day, night and space is correct \u2014 day, night and space?",
        "options": ["The Sun is at the centre of the solar system, and the planets orbit it.", "The Earth is the only object that does not move in any way.", "The Moon is at the centre of the solar system."],
        "answer": 0,
        "explain": "The Sun is in the middle; the planets, including Earth, go around it.",
        "hint": "Sun at the centre."
      }
  }
};

const SCIENCE_TEACH_DEEP = {
  "y-alive": {
    "extra": "Living things grow, need nutrition, and can reproduce. We can group them by features we can see, such as having a backbone, and we can look at the stages in a life cycle.",
    "mistake": "A common slip is to say a thing is living just because it moves, or to call a spider an insect. Insects have six legs; spiders have eight, and they do not have a backbone.",
    "example": ["Ask: does it carry out life processes?", "If you are grouping, use a clear feature, not just size."]
  },
  "y-plants": {
    "extra": "A plant usually needs light, water and a suitable temperature. Roots, stem, leaves and flowers have different jobs. Leaves use light to make food: that process is called photosynthesis.",
    "mistake": "A common slip is to think plants get their food from the soil alone. They make food in their leaves using light, and they take water and minerals from the soil.",
    "example": ["Name the part and its job.", "For food-making, remember light, water and carbon dioxide."]
  },
  "y-body": {
    "extra": "The body needs food, water, air and movement. Different teeth have different jobs. The heart pumps blood, and the lungs take in oxygen.",
    "mistake": "A common slip is to mix up the jobs: the lungs do not pump blood, and the heart does not take in air. Keep the two jobs separate.",
    "example": ["Name the organ or the tooth type.", "Say the job in one short sentence."]
  },
  "y-mats": {
    "extra": "We choose materials because of their properties. Water can be a solid, a liquid or a gas. A solid can dissolve in a liquid and still be there in the solution.",
    "mistake": "A common slip is to think a dissolved solid has been destroyed. It is still in the water, and you can often get it back by evaporating the water.",
    "example": ["Name the material or the state.", "Link the property, or the change, to what you would see."]
  },
  "y-push": {
    "extra": "A force is a push or a pull. Sound is a vibration that travels to the ear. Friction and air resistance can oppose motion, and they can also be useful, such as the grip of a shoe.",
    "mistake": "A common slip is to think friction is always a nuisance, or that sound can travel through empty space. Friction can be useful, and sound needs a medium.",
    "example": ["Name the force or the vibration.", "Say whether it starts, stops, changes or opposes the motion, or how the sound travels."]
  },
  "y-home": {
    "extra": "A habitat is where a living thing lives and gets what it needs. In a food chain, the arrow means is eaten by and shows the direction energy is transferred. An adaptation is a feature that helps survival in that habitat.",
    "mistake": "A common slip is to read the food-chain arrow the wrong way, as if it meant eats. Grass to rabbit means the grass is eaten by the rabbit.",
    "example": ["Name the habitat or the living thing.", "If there is a food chain, follow each arrow to the eater."]
  },
  "y-sky": {
    "extra": "Day and night happen because the Earth spins. A year is the time for the Earth to orbit the Sun, and a month is about the time for the Moon to orbit the Earth. The Sun is at the centre of the solar system. Seasons in the UK change because of the Earth's tilt and its orbit.",
    "mistake": "A common slip is to say the Sun switches off at night, or that a year is one spin of the Earth. One spin is about a day; one orbit of the Sun is a year.",
    "example": ["Name the movement: spin or orbit.", "Then name the time it takes: a day, a month or a year."]
  },
  "biology": {
    "extra": "Biology is the science of living organisms. It moves from life processes and grouping, to organs and growth, then to cells, transport by diffusion and osmosis, and digestion. England GCSEs in Biology are graded 9-1; these lessons help you work towards that and do not promise a grade.",
    "mistake": "A common slip is to mix up animal and plant cells, or to confuse diffusion with osmosis. Plant cells usually have a cell wall and chloroplasts. Osmosis is the diffusion of water through a partially permeable membrane.",
    "example": ["Name the structure or the process.", "Give the job, and keep similar terms distinct."]
  },
  "chemistry": {
    "extra": "Chemistry looks at materials, states of matter, dissolving, chemical change, and energy changes in reactions. A chemical reaction makes new substances; a physical change, such as melting, does not. England GCSEs in Chemistry are graded 9-1; these lessons do not promise a grade.",
    "mistake": "A common slip is to call melting a chemical reaction, or to mix up solute and solvent. Melting is a change of state. The solute dissolves in the solvent to make a solution.",
    "example": ["Decide whether a new substance is made.", "If you are dissolving, name the solute, the solvent and the solution."]
  },
  "physics": {
    "extra": "Physics here is about forces, motion, sound, gravity and resultant forces. Balanced forces do not change motion; a resultant (unbalanced) force does. Speed is distance divided by time. Weight is the force of gravity, measured in newtons, and is not the same as mass. England GCSEs in Physics are graded 9-1; these lessons do not promise a grade.",
    "mistake": "A common slip is to say a force is needed to keep a steady speed in a straight line when there is no drag, or to treat mass and weight as the same quantity. A resultant force is needed to change motion. Mass is in kilograms; weight is a force in newtons.",
    "example": ["Write the quantities and the units.", "Then decide whether the forces are balanced, and what that means for the motion."]
  },
  "method": {
    "extra": "Working scientifically means asking a testable question, running a fair test, measuring carefully, and then concluding from the data. The independent variable is what you change, the dependent variable is what you measure, and control variables stay the same. England GCSEs use this language on the 9-1 scale; these lessons do not promise a grade.",
    "mistake": "A common slip is to change more than one thing at once, or to write a conclusion that ignores the results. If two factors change, you cannot tell which one caused the effect.",
    "example": ["Name what you will change, what you will measure, and what you will keep the same.", "Draw the conclusion from the data, then say how the method could be improved."]
  }
};

const SCIENCE_GCSE_NOTE = "On the England GCSE 9-1 scale, this is the sort of knowledge you work towards. This lesson does not promise a grade.";

function scienceMiniQuestion(spec) {
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

function scienceExtrasFor(skillId, stage) {
  return SCIENCE_MINI_EXTRAS[skillId + ":" + (Number(stage) || 1)] || null;
}

function buildScienceMiniLesson(skillId, stage) {
  const st = Number(stage) || 1;
  const mod = typeof getTeachModule === "function" ? getTeachModule("science", skillId, st) : null;
  const extras = scienceExtrasFor(skillId, st);
  if (!extras || !extras.exit) return null;
  const skill =
    (typeof getSkill === "function" && getSkill(skillId)) ||
    (typeof SKILLS !== "undefined" && SKILLS.science && SKILLS.science[skillId]) ||
    { name: skillId };
  const deep = SCIENCE_TEACH_DEEP[skillId] || {};
  const points = (mod && mod.teach && (mod.teach.points || mod.teach.paragraphs)) || [];
  const paragraphs = points.slice();
  if (deep.extra && paragraphs.indexOf(deep.extra) === -1) paragraphs.push(deep.extra);
  if (st >= 4 && ["biology", "chemistry", "method", "physics"].indexOf(skillId) !== -1 && paragraphs.indexOf(SCIENCE_GCSE_NOTE) === -1) paragraphs.push(SCIENCE_GCSE_NOTE);
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
  const clip = typeof getVerifiedLessonVideo === "function" ? getVerifiedLessonVideo("science", skillId, st) : null;
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
    prereq: (extras.prereq || []).map(scienceMiniQuestion),
    guided: (extras.guided || []).map(scienceMiniQuestion),
    exit: scienceMiniQuestion(extras.exit),
    revisit: "If that felt shaky, go back to the example and try one more guided question later.",
    video: clip || null,
  };
}

var _getMiniLessonBeforeScience = typeof getMiniLesson === "function" ? getMiniLesson : function () { return null; };
getMiniLesson = function (subject, skillId, stage) {
  const explicit = _getMiniLessonBeforeScience(subject, skillId, stage);
  if (explicit) {
    if (!explicit.video && typeof getVerifiedLessonVideo === "function") {
      explicit.video = getVerifiedLessonVideo(subject, skillId, stage);
    }
    if (explicit.teach && subject === "science") {
      const deep = SCIENCE_TEACH_DEEP[skillId];
      if (deep && deep.mistake && !explicit.teach.mistake) explicit.teach.mistake = deep.mistake;
      if (deep && deep.extra && Array.isArray(explicit.teach.paragraphs) && explicit.teach.paragraphs.indexOf(deep.extra) === -1) {
        explicit.teach.paragraphs = explicit.teach.paragraphs.concat([deep.extra]);
      }
      if ((Number(stage) || 1) >= 4 && ["biology", "chemistry", "method", "physics"].indexOf(skillId) !== -1 && Array.isArray(explicit.teach.paragraphs) && explicit.teach.paragraphs.indexOf(SCIENCE_GCSE_NOTE) === -1) {
        explicit.teach.paragraphs = explicit.teach.paragraphs.concat([SCIENCE_GCSE_NOTE]);
      }
    }
    return explicit;
  }
  if (subject === "science") return buildScienceMiniLesson(skillId, stage);
  return null;
}
