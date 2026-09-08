/**
 * Compound investing calculator for Rawson Learning Lab.
 * Teaching toy — past returns are illustrations, not promises.
 *
 * Nominal periodic rate: i = APR / periodsPerYear (standard savings-calculator style).
 */

const INVEST_CALC_STORE = "rawson-invest-calc-v1";

/** Past-return illustrations used as slider defaults — not forecasts. */
const INVEST_STRATEGIES = {
  gold: {
    id: "gold",
    name: "Gold & silver",
    emoji: "🥇",
    apr: 8,
    pastLabel: "about 8% a year",
    pastNote:
      "Gold since the 1970s (when the gold price was set free) grew roughly 7–8% a year on average. Silver jumps around more. Some years metals fall.",
  },
  sp500: {
    id: "sp500",
    name: "S&P 500 ETF",
    emoji: "📈",
    apr: 10,
    pastLabel: "about 10% a year",
    pastNote:
      "The S&P 500 is 500 big US companies. Over about 100 years, with dividends paid back in, it averaged close to 10% a year. Some years it drops a lot.",
  },
  bitcoin: {
    id: "bitcoin",
    name: "Bitcoin",
    emoji: "₿",
    apr: 50,
    pastLabel: "about 50% a year in one 10-year stretch",
    pastNote:
      "Bitcoin’s early years were wild. A recent 10-year stretch grew very fast — and other years it crashed. That speed cannot keep going forever. This is a past picture, not a promise.",
  },
};

const INVEST_MIX_WEIGHTS = { gold: 1 / 3, sp500: 1 / 3, bitcoin: 1 / 3 };

const INVEST_MILLION = 1000000;
const INVEST_APR_MIN = 0;
const INVEST_APR_MAX = 60;

function investPeriodsPerYear(freq) {
  return freq === "week" ? 52 : 12;
}

function investPeriodicRate(annualPct, periodsPerYear) {
  const r = Number(annualPct) || 0;
  const ppy = Number(periodsPerYear) || 12;
  return r / 100 / ppy;
}

function investFutureValue(pmt, annualPct, years, periodsPerYear) {
  const payment = Number(pmt) || 0;
  const yrs = Math.max(0, Number(years) || 0);
  const ppy = Number(periodsPerYear) || 12;
  const n = yrs * ppy;
  if (n <= 0 || payment === 0) return 0;
  const i = investPeriodicRate(annualPct, ppy);
  if (Math.abs(i) < 1e-12) return payment * n;
  const growth = Math.pow(1 + i, n);
  if (!isFinite(growth)) return Infinity;
  return payment * ((growth - 1) / i);
}

function investPmtForTarget(target, annualPct, years, periodsPerYear) {
  const goal = Number(target) || 0;
  const yrs = Math.max(0, Number(years) || 0);
  const ppy = Number(periodsPerYear) || 12;
  const n = yrs * ppy;
  if (n <= 0) return Infinity;
  if (goal <= 0) return 0;
  const i = investPeriodicRate(annualPct, ppy);
  if (Math.abs(i) < 1e-12) return goal / n;
  const growth = Math.pow(1 + i, n);
  if (!isFinite(growth) || growth <= 1) return goal / n;
  return (goal * i) / (growth - 1);
}

function investYearsToTarget(pmt, target, annualPct, periodsPerYear) {
  const payment = Number(pmt) || 0;
  const goal = Number(target) || 0;
  const ppy = Number(periodsPerYear) || 12;
  if (goal <= 0) return 0;
  if (payment <= 0) return Infinity;
  const i = investPeriodicRate(annualPct, ppy);
  if (Math.abs(i) < 1e-12) return goal / payment / ppy;
  const inner = 1 + (goal * i) / payment;
  if (inner <= 0) return Infinity;
  const n = Math.log(inner) / Math.log(1 + i);
  if (!isFinite(n) || n < 0) return Infinity;
  return n / ppy;
}

function investMixFutureValue(pmt, years, periodsPerYear, weights) {
  const w = weights || INVEST_MIX_WEIGHTS;
  let total = 0;
  for (const id of Object.keys(w)) {
    const strat = INVEST_STRATEGIES[id];
    if (!strat) continue;
    const part = investFutureValue(pmt * w[id], strat.apr, years, periodsPerYear);
    if (!isFinite(part)) return Infinity;
    total += part;
  }
  return total;
}

function investMixPmtForTarget(target, years, periodsPerYear) {
  const unit = investMixFutureValue(1, years, periodsPerYear);
  if (!isFinite(unit) || unit <= 0) return Infinity;
  return (Number(target) || 0) / unit;
}

function investMixYearsToTarget(pmt, target, periodsPerYear) {
  const payment = Number(pmt) || 0;
  const goal = Number(target) || 0;
  const ppy = Number(periodsPerYear) || 12;
  if (goal <= 0) return 0;
  if (payment <= 0) return Infinity;
  let lo = 0;
  let hi = 90;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    const fv = investMixFutureValue(payment, mid, ppy);
    if (!isFinite(fv) || fv >= goal) hi = mid;
    else lo = mid;
  }
  const fv = investMixFutureValue(payment, hi, ppy);
  if (!isFinite(fv) || fv < goal) return Infinity;
  return hi;
}

function investFormatGBP(n) {
  const x = Number(n);
  if (!isFinite(x) || x >= 1e12) return "more than a trillion pounds";
  if (x >= 1e9) {
    const b = x / 1e9;
    return "£" + (b >= 10 ? b.toFixed(0) : b.toFixed(1)) + " billion";
  }
  if (x >= 1e6) {
    const m = x / 1e6;
    return "£" + (m >= 10 ? m.toFixed(1) : m.toFixed(2)) + " million";
  }
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(Math.round(x));
  } catch (_) {
    return "£" + Math.round(x).toLocaleString("en-GB");
  }
}

function investFormatYears(years) {
  if (!isFinite(years)) return "never (put more in, or wait longer)";
  if (years < 0.05) return "less than a month";
  if (years < 1) {
    const months = Math.max(1, Math.round(years * 12));
    return months === 1 ? "about 1 month" : "about " + months + " months";
  }
  const y = Math.round(years * 10) / 10;
  return y === 1 ? "1 year" : y + " years";
}

function investDefaultState(learnerMeta) {
  const age = Number(learnerMeta && learnerMeta.age) || 10;
  return {
    startAge: age,
    endAge: 60,
    lookAge: 60,
    freq: "month",
    amount: 20,
    earnings: 100,
    useTwenty: true,
    target: INVEST_MILLION,
    strategy: "sp500",
    apr: INVEST_STRATEGIES.sp500.apr,
  };
}

function loadInvestCalcState(learnerId, learnerMeta) {
  const fallback = investDefaultState(learnerMeta);
  try {
    const raw = localStorage.getItem(INVEST_CALC_STORE);
    if (!raw) return fallback;
    const all = JSON.parse(raw);
    const saved = all && all[learnerId];
    if (!saved || typeof saved !== "object") return fallback;
    return { ...fallback, ...saved };
  } catch (_) {
    return fallback;
  }
}

function saveInvestCalcState(learnerId, data) {
  try {
    const raw = localStorage.getItem(INVEST_CALC_STORE);
    const all = raw ? JSON.parse(raw) : {};
    all[learnerId] = data;
    localStorage.setItem(INVEST_CALC_STORE, JSON.stringify(all));
  } catch (_) {
    /* ignore quota */
  }
}

function investChartAges(startAge, endAge) {
  const start = Math.max(5, Math.floor(Number(startAge) || 10));
  const end = Math.max(start + 1, Math.floor(Number(endAge) || 60));
  const marks = [start];
  [18, 30, 40, 50, 60, 70, 80].forEach((a) => {
    if (a > start && a < end) marks.push(a);
  });
  marks.push(end);
  return marks;
}

function investSnapshot(input) {
  const startAge = Math.max(5, Math.min(18, Number(input.startAge) || 10));
  const endAge = Math.max(startAge + 1, Math.min(90, Number(input.endAge) || 60));
  const lookAge = Math.max(startAge, Math.min(90, Number(input.lookAge) || endAge));
  const freq = input.freq === "week" ? "week" : "month";
  const ppy = investPeriodsPerYear(freq);
  const earnings = Math.max(0, Number(input.earnings) || 0);
  const useTwenty = !!input.useTwenty;
  const typedAmount = Math.max(0, Number(input.amount) || 0);
  const amount = useTwenty ? Math.round(earnings * 0.2 * 100) / 100 : typedAmount;
  const target = Math.max(1, Number(input.target) || INVEST_MILLION);
  const strategy = INVEST_STRATEGIES[input.strategy] ? input.strategy : "sp500";
  let apr = Number(input.apr);
  if (!isFinite(apr)) apr = INVEST_STRATEGIES[strategy].apr;
  apr = Math.max(INVEST_APR_MIN, Math.min(INVEST_APR_MAX, apr));

  const yearsToEnd = endAge - startAge;
  const yearsToLook = lookAge - startAge;
  const putInEnd = amount * ppy * yearsToEnd;
  const putInLook = amount * ppy * yearsToLook;

  const byStrategy = {};
  for (const id of Object.keys(INVEST_STRATEGIES)) {
    const s = INVEST_STRATEGIES[id];
    const fvEnd = investFutureValue(amount, s.apr, yearsToEnd, ppy);
    const fvLook = investFutureValue(amount, s.apr, yearsToLook, ppy);
    const pmtNeed = investPmtForTarget(target, s.apr, yearsToEnd, ppy);
    const yrsNeed = investYearsToTarget(amount, target, s.apr, ppy);
    byStrategy[id] = {
      fvEnd,
      fvLook,
      growthEnd: isFinite(fvEnd) ? fvEnd - putInEnd : Infinity,
      pmtNeed,
      yrsNeed,
      millionAge: isFinite(yrsNeed) ? startAge + yrsNeed : Infinity,
    };
  }

  const mixEnd = investMixFutureValue(amount, yearsToEnd, ppy);
  const mixLook = investMixFutureValue(amount, yearsToLook, ppy);
  const mixYrs = investMixYearsToTarget(amount, target, ppy);
  const mix = {
    fvEnd: mixEnd,
    fvLook: mixLook,
    growthLook: isFinite(mixLook) ? mixLook - putInLook : Infinity,
    growthEnd: isFinite(mixEnd) ? mixEnd - putInEnd : Infinity,
    pmtNeed: investMixPmtForTarget(target, yearsToEnd, ppy),
    yrsNeed: mixYrs,
    millionAge: isFinite(mixYrs) ? startAge + mixYrs : Infinity,
  };

  const customEnd = investFutureValue(amount, apr, yearsToEnd, ppy);
  const customLook = investFutureValue(amount, apr, yearsToLook, ppy);
  const customPmt = investPmtForTarget(target, apr, yearsToEnd, ppy);
  const customYrs = investYearsToTarget(amount, target, apr, ppy);

  const ages = investChartAges(startAge, Math.max(endAge, lookAge));
  const chart = ages.map((age) => {
    const y = age - startAge;
    return {
      age,
      gold: investFutureValue(amount, INVEST_STRATEGIES.gold.apr, y, ppy),
      sp500: investFutureValue(amount, INVEST_STRATEGIES.sp500.apr, y, ppy),
      bitcoin: investFutureValue(amount, INVEST_STRATEGIES.bitcoin.apr, y, ppy),
      mix: investMixFutureValue(amount, y, ppy),
    };
  });

  return {
    startAge,
    endAge,
    lookAge,
    freq,
    ppy,
    earnings,
    useTwenty,
    amount,
    target,
    strategy,
    apr,
    yearsToEnd,
    yearsToLook,
    putInEnd,
    putInLook,
    byStrategy,
    mix,
    custom: {
      fvEnd: customEnd,
      fvLook: customLook,
      growthLook: isFinite(customLook) ? customLook - putInLook : Infinity,
      growthEnd: isFinite(customEnd) ? customEnd - putInEnd : Infinity,
      pmtNeed: customPmt,
      yrsNeed: customYrs,
      millionAge: isFinite(customYrs) ? startAge + customYrs : Infinity,
    },
    chart,
  };
}

function investUnrealistic(value, apr, years) {
  return !isFinite(value) || value >= 1e9 || (apr >= 20 && years >= 15 && value >= 1e7);
}

function investView(snap) {
  const freqWord = snap.freq === "week" ? "week" : "month";
  const freqWordly = snap.freq === "week" ? "every week" : "every month";
  const twentyFill = Math.round(snap.earnings * 0.2 * 100) / 100;
  const strat = INVEST_STRATEGIES[snap.strategy];
  const isMix = snap.strategy === "mix";
  const heroFV = isMix ? snap.mix.fvLook : snap.custom.fvLook;
  const heroGrowth = isMix ? snap.mix.growthLook : snap.custom.growthLook;
  const heroPmt = isMix ? snap.mix.pmtNeed : snap.custom.pmtNeed;
  const heroYrs = isMix ? snap.mix.yrsNeed : snap.custom.yrsNeed;
  const heroMillionAge = isMix ? snap.mix.millionAge : snap.custom.millionAge;
  const heroAprLabel = isMix
    ? "equal split of gold, S&P 500 and Bitcoin past rates"
    : snap.apr + "%";
  const wild = investUnrealistic(
    heroFV,
    isMix ? INVEST_STRATEGIES.bitcoin.apr : snap.apr,
    snap.yearsToLook
  );
  const mixWild = investUnrealistic(snap.mix.fvLook, 20, snap.yearsToLook);
  const pastNote = isMix
    ? "Equal split: one third gold (8%), one third S&P 500 (10%), one third Bitcoin (50% past stretch). Bitcoin’s past years make the mix look huge — they may not repeat."
    : (strat ? strat.pastNote : INVEST_STRATEGIES.sp500.pastNote);
  return {
    freqWord,
    freqWordly,
    twentyFill,
    strat,
    isMix,
    heroFV,
    heroGrowth,
    heroPmt,
    heroYrs,
    heroMillionAge,
    heroAprLabel,
    wild,
    mixWild,
    pastNote,
  };
}

function investStrategyCardsHtml(snap, v) {
  const cards = ["gold", "sp500", "bitcoin"]
    .map((id) => {
      const s = INVEST_STRATEGIES[id];
      const row = snap.byStrategy[id];
      const on = snap.strategy === id;
      const wild = investUnrealistic(row.fvLook, s.apr, snap.yearsToLook);
      return `<button type="button" class="invest-strat ${on ? "is-on" : ""}" data-strategy="${id}">
        <span class="invest-strat-emoji">${s.emoji}</span>
        <strong>${escapeHtml(s.name)}</strong>
        <span class="muted">${escapeHtml(s.pastLabel)}</span>
        <span class="invest-strat-pot">${escapeHtml(investFormatGBP(row.fvLook))}</span>
        ${wild ? `<span class="invest-mini-warn">past speed — not a promise</span>` : ""}
      </button>`;
    })
    .join("");
  return (
    cards +
    `<button type="button" class="invest-strat invest-strat-mix ${
      snap.strategy === "mix" ? "is-on" : ""
    }" data-strategy="mix">
      <span class="invest-strat-emoji">🧩</span>
      <strong>All three together</strong>
      <span class="muted">split your ${v.freqWordly} pot equally across gold, S&amp;P 500 and Bitcoin</span>
      <span class="invest-strat-pot">${escapeHtml(investFormatGBP(snap.mix.fvLook))}</span>
      ${v.mixWild ? `<span class="invest-mini-warn">Bitcoin’s past speed dominates this mix</span>` : ""}
    </button>`
  );
}

function investCompareHtml(snap) {
  return (
    ["gold", "sp500", "bitcoin"]
      .map((id) => {
        const s = INVEST_STRATEGIES[id];
        const row = snap.byStrategy[id];
        return `<article class="invest-compare-card">
          <h4>${s.emoji} ${escapeHtml(s.name)}</h4>
          <p class="invest-compare-pot">${escapeHtml(investFormatGBP(row.fvLook))}</p>
          <p class="muted">Past ${s.apr}% a year. Millionaire in ${escapeHtml(
          investFormatYears(row.yrsNeed)
        )}.</p>
        </article>`;
      })
      .join("") +
    `<article class="invest-compare-card is-mix">
      <h4>🧩 All three together</h4>
      <p class="invest-compare-pot">${escapeHtml(investFormatGBP(snap.mix.fvLook))}</p>
      <p class="muted">Equal split. Bitcoin’s past years make this look huge — they may not repeat.</p>
    </article>`
  );
}

function investChartHtml(snap) {
  const maxBar = snap.chart.reduce((m, row) => {
    const vals = [row.gold, row.sp500, row.mix].map((x) => (isFinite(x) ? x : 0));
    return Math.max(m, ...vals);
  }, 1);
  return snap.chart
    .map((row) => {
      const spPct = Math.max(4, Math.min(100, (row.sp500 / maxBar) * 100));
      const goldPct = Math.max(4, Math.min(100, (row.gold / maxBar) * 100));
      const mixPct = Math.max(4, Math.min(100, (row.mix / maxBar) * 100));
      const btcLabel = isFinite(row.bitcoin) ? investFormatGBP(row.bitcoin) : "huge";
      return `<div class="invest-age-row">
        <div class="invest-age-label">Age ${row.age}</div>
        <div class="invest-age-bars">
          <div class="invest-bar gold" style="width:${goldPct}%" title="Gold"></div>
          <div class="invest-bar sp500" style="width:${spPct}%" title="S&P 500"></div>
          <div class="invest-bar mix" style="width:${mixPct}%" title="Mix"></div>
        </div>
        <div class="invest-age-nums muted">
          🥇 ${escapeHtml(investFormatGBP(row.gold))}
          · 📈 ${escapeHtml(investFormatGBP(row.sp500))}
          · 🧩 ${escapeHtml(investFormatGBP(row.mix))}
          · ₿ ${escapeHtml(btcLabel)}
        </div>
      </div>`;
    })
    .join("");
}

function investMillionHtml(snap, v) {
  return `
    <h3 style="margin:1rem 0 0.35rem;font-family:var(--display)">To become a millionaire</h3>
    <p style="margin:0 0 0.35rem">
      Target ${escapeHtml(investFormatGBP(snap.target))} by age ${snap.endAge}
      (${snap.yearsToEnd} years from now).
    </p>
    <p style="margin:0">
      At this picture you would need
      <strong style="color:var(--gold)">${escapeHtml(investFormatGBP(v.heroPmt))}</strong> ${v.freqWordly}.
    </p>
    <p style="margin:0.35rem 0 0">
      Or keep putting in ${escapeHtml(investFormatGBP(snap.amount))} ${v.freqWordly}
      and you would hit it in
      <strong>${escapeHtml(investFormatYears(v.heroYrs))}</strong>
      ${isFinite(v.heroMillionAge) ? `(around age ${Math.round(v.heroMillionAge)})` : ""}.
    </p>`;
}

function renderInvestCalc() {
  if (!state.activeLearner) return go("home");
  const L = learner();
  const p = profile();
  if (!L || !p) return go("home");

  let input = loadInvestCalcState(L.id, L);
  let bound = false;

  function persist() {
    saveInvestCalcState(L.id, input);
  }

  function readForm() {
    const amtEl = document.getElementById("invAmount");
    const earnEl = document.getElementById("invEarnings");
    const startEl = document.getElementById("invStartAge");
    const endEl = document.getElementById("invEndAge");
    const lookEl = document.getElementById("invLookAge");
    const aprEl = document.getElementById("invApr");
    const tgtEl = document.getElementById("invTarget");
    const twentyEl = document.getElementById("invTwenty");
    const freqEl = document.querySelector('input[name="invFreq"]:checked');
    if (earnEl) input.earnings = Number(earnEl.value) || 0;
    if (twentyEl) input.useTwenty = !!twentyEl.checked;
    if (input.useTwenty) {
      input.amount = Math.round(input.earnings * 0.2 * 100) / 100;
    } else if (amtEl) {
      input.amount = Number(amtEl.value) || 0;
    }
    if (startEl) input.startAge = Number(startEl.value) || input.startAge;
    if (endEl) input.endAge = Number(endEl.value) || input.endAge;
    if (lookEl) input.lookAge = Number(lookEl.value) || input.lookAge;
    if (aprEl) input.apr = Number(aprEl.value);
    if (tgtEl) input.target = Number(tgtEl.value) || INVEST_MILLION;
    if (freqEl) input.freq = freqEl.value === "week" ? "week" : "month";
    if (input.lookAge < input.startAge) input.lookAge = input.startAge;
    persist();
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function patchResults(snap) {
    const v = investView(snap);
    appEl.querySelectorAll(".invFreqWord").forEach((el) => {
      el.textContent = v.freqWord;
    });
    appEl.querySelectorAll(".invFreqWordly").forEach((el) => {
      el.textContent = v.freqWordly;
    });
    setText("invLookAgeVal", "Age " + snap.lookAge);
    setText("invAprVal", snap.apr + "%");
    setText("invHeroAge", "At age " + snap.lookAge);
    setText("invHeroPot", investFormatGBP(v.heroFV));
    setText(
      "invHeroMeta",
      "You would have put in " +
        investFormatGBP(snap.putInLook) +
        " · growth about " +
        investFormatGBP(v.heroGrowth) +
        " · " +
        investFormatGBP(snap.amount) +
        " " +
        v.freqWordly +
        " at " +
        v.heroAprLabel
    );
    const warn = document.getElementById("invHeroWarn");
    if (warn) warn.hidden = !v.wild;
    const million = document.getElementById("invMillion");
    if (million) million.innerHTML = investMillionHtml(snap, v);
    const compare = document.getElementById("invCompare");
    if (compare) compare.innerHTML = investCompareHtml(snap);
    const chart = document.getElementById("invChart");
    if (chart) chart.innerHTML = investChartHtml(snap);
    const strats = document.getElementById("invStrats");
    if (strats) strats.innerHTML = investStrategyCardsHtml(snap, v);
    setText("invPastNote", v.pastNote);
    setText("invCompareTitle", "Same " + v.freqWordly + " sum — four past pictures at age " + snap.lookAge);
    const hint = document.getElementById("invTwentyHint");
    if (hint) {
      hint.innerHTML =
        "20% of " +
        escapeHtml(investFormatGBP(snap.earnings)) +
        " is <strong style=\"color:var(--gold)\">" +
        escapeHtml(investFormatGBP(v.twentyFill)) +
        "</strong> " +
        v.freqWordly +
        ". Keep 80% to use now.";
    }
    const earnEl = document.getElementById("invEarnings");
    const amtEl = document.getElementById("invAmount");
    if (earnEl) earnEl.disabled = !snap.useTwenty;
    if (amtEl) {
      amtEl.disabled = !!snap.useTwenty;
      if (snap.useTwenty) amtEl.value = String(snap.amount);
    }
    const lookEl = document.getElementById("invLookAge");
    if (lookEl) {
      lookEl.min = String(snap.startAge);
      if (Number(lookEl.value) !== snap.lookAge) lookEl.value = String(snap.lookAge);
    }
    const aprEl = document.getElementById("invApr");
    if (aprEl && Number(aprEl.value) !== snap.apr) aprEl.value = String(snap.apr);
    appEl.querySelectorAll(".invest-freq label").forEach((lab) => {
      const radio = lab.querySelector("input");
      lab.classList.toggle("is-on", !!(radio && radio.checked));
    });
    strats?.querySelectorAll("[data-strategy]").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.strategy;
        input.strategy = id;
        if (INVEST_STRATEGIES[id]) input.apr = INVEST_STRATEGIES[id].apr;
        else if (id === "mix") input.apr = 15;
        persist();
        patchResults(investSnapshot(input));
      };
    });
  }

  function fullPaint() {
    const snap = investSnapshot(input);
    const v = investView(snap);
    appEl.innerHTML = `
      ${topbar()}
      <button class="btn btn-ghost mb-1" type="button" data-go="dashboard">← Back to hub</button>

      <div class="subject-top card mb-2">
        <img class="subject-top-img" src="${subjectIllust("investing").src}" alt="" />
        <div>
          <h1 class="subject-top-title">💰 Money machine</h1>
          <p class="muted" style="margin:0.25rem 0 0">Compound investing for ${escapeHtml(
            L.name
          )} — a teaching toy, not a promise</p>
        </div>
      </div>

      <div class="card invest-hero mb-2">
        <p class="next-step-label">The 20% snowball</p>
        <h2 class="next-step-title" style="margin-bottom:0.4rem">If you always put 20% away, time does the heavy lifting</h2>
        <p class="lead" style="margin-top:0">Fill in a sum. Pick weekly or monthly. Slide the yearly rate. Watch Gold, the S&amp;P 500, Bitcoin — and all three together.</p>
      </div>

      <div class="card mb-2">
        <h3 style="margin-top:0;font-family:var(--display)">Your numbers</h3>
        <div class="invest-grid">
          <label class="invest-field">
            <span>I start at age</span>
            <input id="invStartAge" type="number" min="5" max="18" step="1" value="${snap.startAge}" />
          </label>
          <label class="invest-field">
            <span>I want to be grown-up rich by age</span>
            <input id="invEndAge" type="number" min="18" max="90" step="1" value="${snap.endAge}" />
          </label>
          <label class="invest-field">
            <span>Show my pot at age</span>
            <input id="invLookAge" type="range" min="${snap.startAge}" max="80" step="1" value="${snap.lookAge}" />
            <strong id="invLookAgeVal">Age ${snap.lookAge}</strong>
          </label>
        </div>

        <div class="invest-freq" role="radiogroup" aria-label="How often">
          <label class="${snap.freq === "week" ? "is-on" : ""}">
            <input type="radio" name="invFreq" value="week" ${
              snap.freq === "week" ? "checked" : ""
            } /> Every week
          </label>
          <label class="${snap.freq === "month" ? "is-on" : ""}">
            <input type="radio" name="invFreq" value="month" ${
              snap.freq === "month" ? "checked" : ""
            } /> Every month
          </label>
        </div>

        <div class="invest-twenty-box">
          <label class="invest-check">
            <input id="invTwenty" type="checkbox" ${snap.useTwenty ? "checked" : ""} />
            <span>Use the 20% rule — I put 20% of what I get <span class="invFreqWordly">${v.freqWordly}</span> into the pot</span>
          </label>
          <div class="invest-grid">
            <label class="invest-field">
              <span>I get (£ / <span class="invFreqWord">${v.freqWord}</span>)</span>
              <input id="invEarnings" type="number" min="0" step="1" value="${snap.earnings}" ${
      snap.useTwenty ? "" : "disabled"
    } />
            </label>
            <label class="invest-field">
              <span>I put in (£ / <span class="invFreqWord">${v.freqWord}</span>)</span>
              <input id="invAmount" type="number" min="0" step="1" value="${snap.amount}" ${
      snap.useTwenty ? "disabled" : ""
    } />
            </label>
            <label class="invest-field">
              <span>Target pot (£)</span>
              <input id="invTarget" type="number" min="100" step="1000" value="${snap.target}" />
            </label>
          </div>
          <p class="muted" id="invTwentyHint" style="margin:0.4rem 0 0">
            20% of ${escapeHtml(investFormatGBP(snap.earnings))} is
            <strong style="color:var(--gold)">${escapeHtml(investFormatGBP(v.twentyFill))}</strong>
            ${v.freqWordly}. Keep 80% to use now.
          </p>
        </div>
      </div>

      <div class="card mb-2">
        <h3 style="margin-top:0;font-family:var(--display)">Yearly growth (APR-style slider)</h3>
        <p class="muted">Tap a past picture to jump the slider. Then drag it yourself. Past ≠ future.</p>
        <div class="invest-strats" id="invStrats">${investStrategyCardsHtml(snap, v)}</div>
        <label class="invest-apr-row">
          <span>Yearly rate</span>
          <input id="invApr" type="range" min="${INVEST_APR_MIN}" max="${INVEST_APR_MAX}" step="1" value="${snap.apr}" />
          <strong id="invAprVal">${snap.apr}%</strong>
        </label>
        <p class="muted" id="invPastNote" style="margin:0.35rem 0 0">${escapeHtml(v.pastNote)}</p>
      </div>

      <div class="card invest-result mb-2">
        <p class="next-step-label" id="invHeroAge">At age ${snap.lookAge}</p>
        <p class="invest-big" id="invHeroPot">${escapeHtml(investFormatGBP(v.heroFV))}</p>
        <p class="muted" id="invHeroMeta" style="margin:0">
          You would have put in ${escapeHtml(investFormatGBP(snap.putInLook))}
          · growth about ${escapeHtml(investFormatGBP(v.heroGrowth))}
          · ${escapeHtml(investFormatGBP(snap.amount))} ${v.freqWordly} at ${escapeHtml(v.heroAprLabel)}
        </p>
        <p class="invest-warn" id="invHeroWarn" ${v.wild ? "" : "hidden"}>This past speed cannot last forever — treat huge numbers as a story, not a plan.</p>
        <div class="invest-million" id="invMillion">${investMillionHtml(snap, v)}</div>
      </div>

      <div class="card mb-2">
        <h3 id="invCompareTitle" style="margin-top:0;font-family:var(--display)">Same ${v.freqWordly} sum — four past pictures at age ${snap.lookAge}</h3>
        <div class="invest-compare" id="invCompare">${investCompareHtml(snap)}</div>
        <p class="muted" style="font-size:0.82rem;margin:0.85rem 0 0">
          Gold bar · S&amp;P bar · mix bar. Bitcoin numbers are listed because a 50% bar would swamp the chart.
        </p>
        <div class="invest-chart" id="invChart">${investChartHtml(snap)}</div>
      </div>

      <div class="card mb-2">
        <h3 style="margin-top:0;font-family:var(--display)">Grown-up rules</h3>
        <ul class="invest-rules">
          <li>This is a lesson, not advice. Past returns are not a guide to the future.</li>
          <li>Kids in the UK usually invest with a parent, through something like a Junior ISA.</li>
          <li>Bitcoin can crash. One company can fail. A basket (S&amp;P 500) is the calmer first idea.</li>
          <li>The 20% rule still works if the number is small — start with what you actually get.</li>
        </ul>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.75rem">
          <button class="btn btn-primary" type="button" data-go-subject="investing">Open Money &amp; investing lessons →</button>
          <button class="btn btn-secondary" type="button" data-go="dashboard">Hub</button>
        </div>
      </div>
      ${siteFooter()}
    `;
    bindShell();
    bound = false;
    bindOnce();
    patchResults(snap);
  }

  function live() {
    readForm();
    patchResults(investSnapshot(input));
  }

  function bindOnce() {
    if (bound) return;
    bound = true;
    appEl.querySelector("[data-go-subject]")?.addEventListener("click", () =>
      go("subject", { subject: "investing" })
    );
    ["invStartAge", "invEndAge", "invEarnings", "invAmount", "invTarget"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", live);
      el.addEventListener("change", live);
    });
    document.getElementById("invLookAge")?.addEventListener("input", live);
    document.getElementById("invApr")?.addEventListener("input", () => {
      if (input.strategy === "mix") input.strategy = "sp500";
      live();
    });
    document.getElementById("invTwenty")?.addEventListener("change", live);
    appEl.querySelectorAll('input[name="invFreq"]').forEach((el) => {
      el.addEventListener("change", live);
    });
  }

  fullPaint();
}
