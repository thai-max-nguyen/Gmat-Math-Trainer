// ════════════════════════════════════════════════════════════════
//  Per-question theory + hint table
//  Keyed by question id. Loaded BEFORE data/theories.js.
//  resolveTheory(q) in theories.js merges entry.theory over the topic theory.
//  generateHint(q) in app.js prefers entry.hint over q.hint.
//
//  Schema per entry:
//    {
//      hint?: 'one-line nudge',
//      theory?: { title, icon, summary, keyFacts[], example{problem,steps[],answer}, traps[], solveSteps[] }
//    }
// ════════════════════════════════════════════════════════════════

const QUESTION_THEORIES = {
  "63": {
    "hint": "Direct d = r × t. Multiply rate by time. Watch units (mph × hours = miles).",
    "theory": {
      "title": "Distance = Rate × Time",
      "icon": "🚂",
      "summary": "d = r × t is the entire rate equation. Plug in two, solve for the third.",
      "keyFacts": [
        "d = r × t  →  r = d/t,  t = d/r",
        "Units must align: mph × hours → miles; km/h × hours → km",
        "2.5 hours = 2h 30m, NOT 2h 50m — decimal hours ≠ minutes",
        "If rate is per minute and time in hours, convert first"
      ],
      "example": {
        "problem": "Train at 60 mph for 2.5 hours. How far?",
        "steps": [
          "Plug in: d = 60 × 2.5",
          "Compute: d = 150",
          "Units: mph × hr = miles ✓"
        ],
        "answer": "150 miles"
      },
      "traps": [
        "Mismatched units (minutes vs hours, km vs miles)",
        "2.5 hr ≠ 2:50 — it is 2:30"
      ],
      "solveSteps": [
        "1. Identify which of d, r, t are given",
        "2. Check unit consistency — convert if needed",
        "3. Apply d = rt and solve for the missing variable"
      ]
    }
  },
  "64": {
    "hint": "Moving toward each other → ADD speeds (closing rate). Moving same direction → SUBTRACT.",
    "theory": {
      "title": "Relative Speed (Closing Rate)",
      "icon": "↔",
      "summary": "When two objects move, the gap closes (or opens) at the RELATIVE speed, not either individual speed.",
      "keyFacts": [
        "Toward each other: closing rate = r₁ + r₂",
        "Same direction (chase): closing rate = r_fast − r_slow",
        "Time to meet = initial gap / closing rate",
        "Distance each travels = its own speed × meeting time"
      ],
      "example": {
        "problem": "A and B 200 mi apart, toward each other at 40 and 60 mph. Meet when?",
        "steps": [
          "Closing rate = 40 + 60 = 100 mph",
          "Time = gap / closing = 200/100 = 2 hr",
          "Check: A goes 80 mi, B goes 120 mi, sum = 200 ✓"
        ],
        "answer": "2 hours"
      },
      "traps": [
        "Adding speeds when objects move SAME direction (should subtract)",
        "Using individual speed instead of closing rate",
        "Forgetting head start when one starts earlier"
      ],
      "solveSteps": [
        "1. Determine direction: toward, away, or chase?",
        "2. Compute relative speed (add or subtract)",
        "3. Apply time = gap / relative speed"
      ]
    }
  },
  "65": {
    "hint": "Same distance each leg → use HARMONIC mean: 2ab/(a+b). NOT (a+b)/2 — that is the trap.",
    "theory": {
      "title": "Average Speed — Harmonic Mean",
      "icon": "⚖",
      "summary": "Average speed ≠ average of speeds. Slower leg eats more time → average pulled toward slower speed. Equal distance → harmonic mean.",
      "keyFacts": [
        "Avg speed = total distance / total time (ALWAYS)",
        "Equal distance both legs → Avg = 2ab / (a + b)  (harmonic mean)",
        "Equal time both legs → Avg = (a + b) / 2  (arithmetic mean)",
        "Round trip = equal distance → harmonic mean ALWAYS applies",
        "Harmonic mean < arithmetic mean — answer pulled toward slower speed"
      ],
      "example": {
        "problem": "Out at 6 mph, back at 4 mph, same path. Avg speed for round trip?",
        "steps": [
          "Pick distance d = 12 mi each leg (any number works — it cancels)",
          "Time out = 12/6 = 2 hr",
          "Time back = 12/4 = 3 hr",
          "Total: 24 mi / 5 hr = 4.8 mph",
          "Shortcut: 2(6)(4)/(6+4) = 48/10 = 4.8 ✓"
        ],
        "answer": "4.8 mph"
      },
      "traps": [
        "(6+4)/2 = 5 mph — WRONG. Arithmetic mean only applies if TIMES are equal",
        "Answer must be between the two speeds, closer to slower one",
        "Same path / round trip = same distance, even if not said explicitly"
      ],
      "solveSteps": [
        "1. Ask: what is equal — distance or time?",
        "2. Equal distance → harmonic mean  2ab/(a+b)",
        "3. Equal time → arithmetic mean  (a+b)/2",
        "4. Sanity: result lies between a and b, pulled toward slower"
      ]
    }
  },
  "66": {
    "hint": "Average speed = TOTAL distance / TOTAL time. Never average the two segment speeds.",
    "theory": {
      "title": "Average Speed — Always Total/Total",
      "icon": "∑",
      "summary": "When distances AND times differ across legs, you cannot use harmonic OR arithmetic shortcut. Always sum distances, sum times, divide.",
      "keyFacts": [
        "Avg = (d₁ + d₂ + ...) / (t₁ + t₂ + ...)",
        "Shortcuts (harmonic, arithmetic) only work in special cases",
        "Default: just sum and divide",
        "Individual segment speeds: 300/5 = 60, 200/4 = 50 — useless on their own"
      ],
      "example": {
        "problem": "300 mi in 5 hr, then 200 mi in 4 hr. Avg?",
        "steps": [
          "Total distance = 300 + 200 = 500",
          "Total time = 5 + 4 = 9",
          "Avg = 500 / 9 ≈ 55.56 mph"
        ],
        "answer": "55.6 mph"
      },
      "traps": [
        "Averaging 60 and 50 → 55 mph (WRONG — arithmetic mean only works when times equal)",
        "Forgetting that segments may have unequal distances AND times"
      ],
      "solveSteps": [
        "1. Tabulate (d, t) for each leg",
        "2. Sum distances; sum times",
        "3. Divide. Do not shortcut"
      ]
    }
  },
  "67": {
    "hint": "Downstream rate = boat + current. Upstream = boat − current. Time = distance / effective rate.",
    "theory": {
      "title": "Boat & Current (Stream) Problems",
      "icon": "⛵",
      "summary": "Current helps downstream, fights upstream. Effective speed changes per direction.",
      "keyFacts": [
        "Downstream speed = v_boat + v_current",
        "Upstream speed = v_boat − v_current",
        "Time = distance / effective speed",
        "Round trip total: d/(v+c) + d/(v−c)",
        "Plug-in answers often faster than algebra"
      ],
      "example": {
        "problem": "30 km down + 30 km back. Current 2 km/h, total time 8 hr. Boat speed?",
        "steps": [
          "Equation: 30/(v+2) + 30/(v−2) = 8",
          "Try v = 8: 30/10 + 30/6 = 3 + 5 = 8 ✓",
          "Confirmed: v = 8 km/h"
        ],
        "answer": "8 km/h"
      },
      "traps": [
        "Treating downstream and upstream as same rate",
        "Heavy algebra: faster to plug in answer choices",
        "Round trip time ≠ 2 × (one-way time at avg speed) unless symmetric"
      ],
      "solveSteps": [
        "1. Define v_boat, v_current — write down both effective speeds",
        "2. Set up time equation: t = d/(v+c) + d/(v−c)",
        "3. Plug in answer choices — fastest path"
      ]
    }
  },
  "68": {
    "hint": "Add rates, NOT times. Rate = 1/time. Together time = 1 / (1/a + 1/b) = ab/(a+b).",
    "theory": {
      "title": "Combined Work Rate",
      "icon": "🔨",
      "summary": "Work is additive in RATES (work per unit time), not in times. Convert each worker to a rate, sum, invert.",
      "keyFacts": [
        "Rate = 1 / time-to-finish-alone",
        "Together rate = sum of individual rates",
        "Together time = 1 / (combined rate)",
        "Shortcut for 2 workers: T = ab/(a+b)",
        "Combined time ALWAYS less than each individual time"
      ],
      "example": {
        "problem": "Alice: 6 hr alone, Bob: 4 hr alone. Together?",
        "steps": [
          "Alice rate = 1/6 wall per hour",
          "Bob rate = 1/4 wall per hour",
          "Combined = 1/6 + 1/4 = 2/12 + 3/12 = 5/12 per hour",
          "Time = 1 / (5/12) = 12/5 = 2.4 hr",
          "Shortcut: (6·4)/(6+4) = 24/10 = 2.4 ✓"
        ],
        "answer": "2.4 hr"
      },
      "traps": [
        "Averaging times: (6+4)/2 = 5 — WRONG. Rates add, not times",
        "Together time must be LESS than fastest worker alone (here < 4 hr)"
      ],
      "solveSteps": [
        "1. Convert each worker to rate = 1/time",
        "2. Sum the rates",
        "3. Invert sum to get combined time"
      ]
    }
  },
  "69": {
    "hint": "Draining = negative rate. Net rate = fill rate − drain rate. Invert net for total time.",
    "theory": {
      "title": "Opposing Rates (Fill vs Drain)",
      "icon": "💧",
      "summary": "When forces work against each other, subtract rates. Only net rate matters.",
      "keyFacts": [
        "Filler rate is positive, drainer rate is negative",
        "Net rate = fill rate − drain rate",
        "If drain ≥ fill, tank NEVER fills",
        "Time to fill = 1 / net rate",
        "Net time always GREATER than fill-alone time (drain slows it)"
      ],
      "example": {
        "problem": "A fills in 3 hr; B drains in 5 hr. Both open. Fill time?",
        "steps": [
          "A rate = 1/3, B rate = −1/5",
          "Net = 1/3 − 1/5 = 5/15 − 3/15 = 2/15",
          "Time = 1 / (2/15) = 15/2 = 7.5 hr"
        ],
        "answer": "7.5 hr"
      },
      "traps": [
        "Adding instead of subtracting when one drains",
        "Forgetting to check: does it ever fill at all?",
        "Net time must EXCEED fill-alone time of 3 hr"
      ],
      "solveSteps": [
        "1. Assign sign to each rate (+ fill, − drain)",
        "2. Sum signed rates → net rate",
        "3. Time = 1 / net (only if net > 0)"
      ]
    }
  },
  "70": {
    "hint": "Adding pure water → SOLUTE stays constant. Track salt amount, not concentration.",
    "theory": {
      "title": "Mixtures — Track the Solute",
      "icon": "🧪",
      "summary": "When diluting (adding pure solvent), the solute amount is FIXED. Only total volume changes.",
      "keyFacts": [
        "Initial solute = initial volume × initial concentration",
        "Add pure solvent → solute unchanged, denominator grows",
        "Add pure solute → solute grows, denominator grows",
        "Drain & replace → solute decreases proportionally",
        "Final concentration = (final solute) / (final total)"
      ],
      "example": {
        "problem": "30 L at 20% salt. Add water to reach 15% salt. Water needed?",
        "steps": [
          "Salt amount = 30 × 0.20 = 6 L (locked)",
          "Equation: 6 / (30 + x) = 0.15",
          "30 + x = 40 → x = 10"
        ],
        "answer": "10 L"
      },
      "traps": [
        "Trying to compute concentration changes directly (wastes time)",
        "Forgetting solute stays constant when adding pure solvent"
      ],
      "solveSteps": [
        "1. Compute initial solute amount (volume × concentration)",
        "2. Determine what is added: pure solvent, pure solute, or another mix",
        "3. Build equation: final solute / final total = final concentration"
      ]
    }
  },
  "71": {
    "hint": "Drain-and-replace: total volume STAYS 50. Track net change in acid: −0.4x + x = +0.6x.",
    "theory": {
      "title": "Mixtures — Drain & Replace",
      "icon": "🔁",
      "summary": "Drain-and-replace keeps TOTAL volume constant. Only the solute amount shifts by (new − old)·x.",
      "keyFacts": [
        "Total volume stays the same throughout",
        "Acid removed when draining x liters = x · (current concentration)",
        "Acid added back = x · (replacement concentration)",
        "Net change in acid = x · (replacement conc − current conc)",
        "Replacing with PURE solute: replacement conc = 1.0"
      ],
      "example": {
        "problem": "50 L at 40% acid. Drain x, refill with pure acid to reach 60%. x?",
        "steps": [
          "Initial acid = 50 × 0.4 = 20 L",
          "Drain x → lose 0.4x acid",
          "Add x pure acid → gain x",
          "Final acid = 20 − 0.4x + x = 20 + 0.6x",
          "Need (20 + 0.6x) / 50 = 0.6 → 0.6x = 10 → x = 50/3"
        ],
        "answer": "50/3 L (≈16.67)"
      },
      "traps": [
        "Forgetting the drained portion CONTAINS solute (loses 0.4x acid, not all x)",
        "Treating drain-and-replace as just \"add x\""
      ],
      "solveSteps": [
        "1. Note total volume is unchanged",
        "2. Compute solute removed: x × current concentration",
        "3. Compute solute added: x × replacement concentration",
        "4. Build final = initial − removed + added, set ratio to target"
      ]
    }
  },
  "72": {
    "hint": "Set variables for CURRENT ages. Future = current + years. Translate each sentence to equation.",
    "theory": {
      "title": "Age Problems — Two-Equation Setup",
      "icon": "🎂",
      "summary": "Define variables for current ages. Every \"in N years\" or \"N years ago\" adds/subtracts N from BOTH sides.",
      "keyFacts": [
        "Let variables = CURRENT ages",
        "\"In N years\" → age + N",
        "\"N years ago\" → age − N",
        "Age difference is INVARIANT (never changes over time)",
        "\"X times as old\" → multiplicative relation NOW or at the given time"
      ],
      "example": {
        "problem": "Mary = 3× son now. In 5 yr, Mary = 2× son. Mary now?",
        "steps": [
          "Let S = son now, M = mary now",
          "Equation 1: M = 3S",
          "Equation 2: M + 5 = 2(S + 5)",
          "Substitute: 3S + 5 = 2S + 10 → S = 5",
          "So M = 3 × 5 = 15"
        ],
        "answer": "15"
      },
      "traps": [
        "Adding 5 to only one person's age (must add to BOTH)",
        "Confusing \"3 times older\" (meaning 4× total) vs \"3 times as old\" (3× total)",
        "Mixing past and future references in one equation"
      ],
      "solveSteps": [
        "1. Define variables for CURRENT ages",
        "2. Translate each sentence to an equation (now or shifted)",
        "3. Solve system — typically substitution",
        "4. Sanity check: ages must be positive integers"
      ]
    }
  },
  "1": {
    "hint": "Find the WHOLE first (n), then take the % you want. Don't try to scale 30%→75% directly without n.",
    "theory": {
      "title": "Percent of a Number — Find the Whole First",
      "icon": "％",
      "summary": "“x% of n” means (x/100)·n. If you know one percent-fact, solve for n, then answer any other percent of it.",
      "keyFacts": [
        "x% of n = (x/100) · n",
        "Given a%·n = value → n = value / (a/100)",
        "Once n is known, any other b% is just (b/100)·n",
        "Scaling shortcut: 75% is 2.5 × 30%, so 24 × 2.5 = 60 (only works for same n)"
      ],
      "example": {
        "problem": "30% of n is 24. Find 75% of n.",
        "steps": [
          "0.30·n = 24 → n = 24 / 0.30 = 80",
          "0.75 · 80 = 60"
        ],
        "answer": "60"
      },
      "traps": [
        "Answering n (=80) instead of the requested 75%",
        "Adding 45% to 24 — percents are multiplicative on n, not additive on the value"
      ],
      "solveSteps": [
        "1. Translate the given percent fact to an equation",
        "2. Solve for the whole n",
        "3. Apply the requested percent to n"
      ]
    }
  },
  "2": {
    "hint": "Successive % changes MULTIPLY, never add. +20% then −20% = 1.2 × 0.8 = 0.96, a net LOSS.",
    "theory": {
      "title": "Successive Percent Changes — Multiply Factors",
      "icon": "🔁",
      "summary": "Each ±x% is a multiplier (1 ± x/100). Chain them by multiplying. A +x% then −x% always loses x²/100 percent.",
      "keyFacts": [
        "+x% → ×(1 + x/100);  −x% → ×(1 − x/100)",
        "Apply on a base of 1 (or 100) and read the final factor",
        "+x% then −x% = 1 − x²/10000 → net −x²/100 percent",
        "Order does not matter: multiplication commutes"
      ],
      "example": {
        "problem": "Price +20% then −20% on the new price. Final vs original?",
        "steps": [
          "Start 1.00",
          "×1.20 = 1.20",
          "×0.80 = 0.96 → 96% of original"
        ],
        "answer": "96%"
      },
      "traps": [
        "+20% then −20% = 0% (WRONG — discount is on the bigger number)",
        "Adding the percents instead of multiplying factors"
      ],
      "solveSteps": [
        "1. Convert each change to a multiplier",
        "2. Multiply all multipliers onto base 1",
        "3. Convert final factor back to percent"
      ]
    }
  },
  "3": {
    "hint": "Chain the multipliers: −10% then +20% = 0.90 × 1.20 = 1.08 → +8%. Don't add −10+20.",
    "theory": {
      "title": "Net Percent Change Across Two Moves",
      "icon": "📉",
      "summary": "A drop then a rise compound multiplicatively. The rise acts on the reduced base, so it is not a simple sum.",
      "keyFacts": [
        "Final factor = (1 − a/100)(1 + b/100)",
        "Net % = (final factor − 1) × 100",
        "−10% then +20%: 0.9 × 1.2 = 1.08 → +8%",
        "Result is NOT (−10 + 20) = +10"
      ],
      "example": {
        "problem": "Stock falls 10%, then rises 20%. Net change?",
        "steps": [
          "0.90 × 1.20 = 1.08",
          "1.08 − 1 = 0.08 = +8%"
        ],
        "answer": "+8%"
      },
      "traps": [
        "Adding the two percents (+10%)",
        "Applying the rise to the original price, not the reduced one"
      ],
      "solveSteps": [
        "1. Write each move as a multiplier",
        "2. Multiply in order onto 1",
        "3. Subtract 1, convert to percent"
      ]
    }
  },
  "4": {
    "hint": "Find the LCD of 3, 4, 6 → 12. Convert each fraction, then add/subtract numerators.",
    "theory": {
      "title": "Adding & Subtracting Fractions — Common Denominator",
      "icon": "➗",
      "summary": "Fractions can only be combined over a common denominator. Use the LCM of the denominators, convert, then operate on numerators only.",
      "keyFacts": [
        "LCD = LCM of all denominators",
        "Scale each fraction: multiply num & denom by the same factor",
        "Add/subtract numerators; keep the common denominator",
        "Simplify at the end (divide by GCF)"
      ],
      "example": {
        "problem": "2/3 + 3/4 − 1/6",
        "steps": [
          "LCD(3,4,6) = 12",
          "8/12 + 9/12 − 2/12 = 15/12",
          "15/12 = 5/4"
        ],
        "answer": "5/4"
      },
      "traps": [
        "Adding numerators AND denominators (2/3+3/4 ≠ 5/7)",
        "Forgetting to simplify the final fraction"
      ],
      "solveSteps": [
        "1. LCM of denominators = LCD",
        "2. Rewrite each fraction over the LCD",
        "3. Combine numerators, then simplify"
      ]
    }
  },
  "5": {
    "hint": "Factor 72 = 2³·3². In n², every prime exponent is EVEN, so n² needs 2⁴ and 3² → n needs 2²·3¹ = 12.",
    "theory": {
      "title": "Perfect-Square Divisibility — Even Exponents",
      "icon": "■",
      "summary": "If n² is divisible by a number, look at prime exponents: in any square they are all even, so round each required exponent UP to the next even number, then halve for n.",
      "keyFacts": [
        "n² has only even prime exponents",
        "For p^k | n², n² needs p raised to the next even ≥ k",
        "Then n must contain p^(thateven/2)",
        "“Must divide n” = the guaranteed minimum, not the maximum"
      ],
      "example": {
        "problem": "n² divisible by 72 = 2³·3². Largest integer that must divide n?",
        "steps": [
          "2³ in n² → need 2⁴ in n² → 2² in n",
          "3² in n² → need 3² in n² → 3¹ in n",
          "n divisible by 2²·3 = 12"
        ],
        "answer": "12"
      },
      "traps": [
        "Answering 72 (that divides n², not necessarily n)",
        "Forgetting to round odd exponents up to even before halving"
      ],
      "solveSteps": [
        "1. Prime-factorize the divisor",
        "2. Round each exponent up to the next even number",
        "3. Halve each exponent → that product must divide n"
      ]
    }
  },
  "6": {
    "hint": "Count multiples of 3, then SUBTRACT multiples of 15 (the 3-and-5 overlap). floor(99/3) − floor(99/15).",
    "theory": {
      "title": "Counting Multiples with an Exclusion",
      "icon": "🔢",
      "summary": "“Divisible by A but not B” = (multiples of A) − (multiples of lcm(A,B)). Use floor division for counts up to a limit.",
      "keyFacts": [
        "Multiples of k ≤ N: floor(N/k)",
        "Both A and B → multiples of lcm(A,B)",
        "Divisible by A not B = floor(N/A) − floor(N/lcm(A,B))",
        "“Less than 100” → use N = 99"
      ],
      "example": {
        "problem": "Positive integers < 100 divisible by 3 but not 5.",
        "steps": [
          "Multiples of 3: floor(99/3) = 33",
          "Multiples of 15: floor(99/15) = 6",
          "33 − 6 = 27"
        ],
        "answer": "27"
      },
      "traps": [
        "Subtracting multiples of 5 instead of 15",
        "Using N = 100 when the bound is “less than 100”"
      ],
      "solveSteps": [
        "1. Count multiples of A up to the limit",
        "2. Count multiples of lcm(A,B)",
        "3. Subtract"
      ]
    }
  },
  "7": {
    "hint": "Units digits cycle. 7 → 7,9,3,1 (length 4). Take exponent mod 4 (use 4 if remainder 0).",
    "theory": {
      "title": "Units Digit of a Power — Cyclicity",
      "icon": "🔚",
      "summary": "The last digit of bⁿ repeats with a short cycle (length 1, 2, or 4). Find the cycle, then index by exponent mod cycle-length.",
      "keyFacts": [
        "7: 7, 9, 3, 1 — cycle length 4",
        "2: 2,4,8,6 | 3: 3,9,7,1 | 8: 8,4,2,6 — all length 4",
        "0,1,5,6 → constant; 4,9 → length 2",
        "exponent mod 4: remainder r→position r; r=0→last in cycle"
      ],
      "example": {
        "problem": "Units digit of 7^85.",
        "steps": [
          "Cycle of 7: [7,9,3,1], length 4",
          "85 mod 4 = 1 → 1st in cycle",
          "→ 7"
        ],
        "answer": "7"
      },
      "traps": [
        "Using remainder 0 as position 0 (it is the LAST element)",
        "Assuming every base has a length-4 cycle"
      ],
      "solveSteps": [
        "1. List the units-digit cycle of the base",
        "2. Take exponent mod cycle length",
        "3. Map remainder to the cycle position"
      ]
    }
  },
  "8": {
    "hint": "Prime-factorize 210. Count DISTINCT primes, not the exponents or the total factors.",
    "theory": {
      "title": "Distinct Prime Factors",
      "icon": "🔑",
      "summary": "Break the number into its prime factorization; the count of different primes is the answer. Distinct ≠ total factors.",
      "keyFacts": [
        "210 = 2 × 3 × 5 × 7",
        "Distinct primes = number of different bases",
        "12 = 2²·3 → 2 distinct primes (not 3)",
        "Pull out small primes 2,3,5,7,11 in order"
      ],
      "example": {
        "problem": "Distinct prime factors of 210.",
        "steps": [
          "210 / 2 = 105",
          "105 / 3 = 35",
          "35 = 5 × 7",
          "Primes: 2,3,5,7 → 4"
        ],
        "answer": "4"
      },
      "traps": [
        "Counting exponents (12=2²·3 is 2 distinct, not 3)",
        "Including 1 as a prime (it is not)"
      ],
      "solveSteps": [
        "1. Divide by smallest primes repeatedly",
        "2. List the unique prime bases",
        "3. Count them"
      ]
    }
  },
  "9": {
    "hint": "Fixed sum → product is maximized when the two numbers are as EQUAL as possible. 13 → 6 and 7.",
    "theory": {
      "title": "Maximize Product with a Fixed Sum",
      "icon": "⚖",
      "summary": "For a fixed sum, the product peaks when the values are equal (or, for integers, as close as possible).",
      "keyFacts": [
        "Sum s fixed → max product near (s/2)²",
        "Integers: split as ⌊s/2⌋ and ⌈s/2⌉",
        "13 → 6 and 7 → 42",
        "Product falls as the pair spreads apart"
      ],
      "example": {
        "problem": "x + y = 13, positive integers. Max xy?",
        "steps": [
          "Closest split: 6 and 7",
          "6 × 7 = 42"
        ],
        "answer": "42"
      },
      "traps": [
        "Picking extreme values (1·12 = 12) thinking 'bigger spread'",
        "Using 6.5·6.5 when integers are required"
      ],
      "solveSteps": [
        "1. Halve the sum",
        "2. Round to the two nearest integers",
        "3. Multiply"
      ]
    }
  },
  "10": {
    "hint": "Multiply ignoring decimals (25×4=100), then place decimals: total decimal places in = total out.",
    "theory": {
      "title": "Decimal Multiplication — Count the Places",
      "icon": "•",
      "summary": "Multiply as integers, then the product has as many decimal places as the two factors combined.",
      "keyFacts": [
        "0.25 has 2 dp, 0.4 has 1 dp → product has 3 dp",
        "25 × 4 = 100 → place 3 decimals → 0.100 = 0.1",
        "Trailing zeros after the decimal can be dropped",
        "Estimate magnitude to catch place errors"
      ],
      "example": {
        "problem": "0.25 × 0.4",
        "steps": [
          "25 × 4 = 100",
          "Decimal places: 2 + 1 = 3 → 0.100",
          "= 0.1"
        ],
        "answer": "0.1"
      },
      "traps": [
        "Answering 1.0 or 0.01 (wrong place count)",
        "Forgetting a factor's decimal place"
      ],
      "solveSteps": [
        "1. Multiply as whole numbers",
        "2. Sum the decimal places of both factors",
        "3. Place the decimal that many digits from the right"
      ]
    }
  },
  "11": {
    "hint": "The $54 already INCLUDES tax. Divide by 1.08 — do not subtract 8% of 54.",
    "theory": {
      "title": "Reverse Percent — Back Out an Included Tax",
      "icon": "↩",
      "summary": "When a total already includes an x% add-on, the total = base × (1 + x/100). Recover base by dividing, not subtracting.",
      "keyFacts": [
        "Total = P × (1 + rate)",
        "P = Total / (1 + rate)",
        "8% tax → divide by 1.08, NOT subtract 0.08·Total",
        "Subtracting 8% of the total under-counts (8% of bigger number)"
      ],
      "example": {
        "problem": "Bill incl. 8% tax = $54. Pre-tax price?",
        "steps": [
          "1.08 · P = 54",
          "P = 54 / 1.08 = 50"
        ],
        "answer": "$50.00"
      },
      "traps": [
        "54 − 0.08·54 = 49.68 (WRONG — 8% was on P, not on 54)",
        "Treating tax as a discount"
      ],
      "solveSteps": [
        "1. Write Total = P·(1 + rate)",
        "2. Divide the total by (1 + rate)",
        "3. Sanity: P·rate added back returns the total"
      ]
    }
  },
  "12": {
    "hint": "Ratio 3:5. One 'part' = boys/3 = 8. Girls = 5 parts = 40.",
    "theory": {
      "title": "Ratios — Value of One Part",
      "icon": "⬛",
      "summary": "A ratio splits a quantity into equal parts. Find the value of one part from the known side, then scale the other side.",
      "keyFacts": [
        "a : b means a parts to b parts",
        "One part = known quantity / its number of parts",
        "Other quantity = one part × its number of parts",
        "Total = (sum of ratio terms) × one part"
      ],
      "example": {
        "problem": "Boys:Girls = 3:5, boys = 24. Girls?",
        "steps": [
          "1 part = 24 / 3 = 8",
          "Girls = 5 × 8 = 40"
        ],
        "answer": "40"
      },
      "traps": [
        "Computing 24 × 5/3 vs 24 × 3/5 — pick the right direction",
        "Treating the ratio terms as actual counts"
      ],
      "solveSteps": [
        "1. Identify which side is known and its part-count",
        "2. One part = known / its parts",
        "3. Scale to the requested side"
      ]
    }
  },
  "13": {
    "hint": "Total parts = 3 + 2 = 5. Juice = (2/5) of 25 L.",
    "theory": {
      "title": "Ratios in a Total — Fraction of the Whole",
      "icon": "🧪",
      "summary": "When a ratio fills a known total, each component is (its parts / total parts) of the whole.",
      "keyFacts": [
        "Total parts = sum of ratio terms",
        "Component = (component parts / total parts) × total amount",
        "3:2 water:juice → juice fraction = 2/5",
        "All components must sum back to the total"
      ],
      "example": {
        "problem": "Water:Juice = 3:2, make 25 L. Juice?",
        "steps": [
          "Total parts = 5",
          "Juice = (2/5) × 25 = 10 L"
        ],
        "answer": "10 L"
      },
      "traps": [
        "Using 2/3 (the ratio) instead of 2/5 (fraction of total)",
        "Forgetting to add both terms for total parts"
      ],
      "solveSteps": [
        "1. Sum ratio terms = total parts",
        "2. Component fraction = its parts / total parts",
        "3. Multiply by the total amount"
      ]
    }
  },
  "14": {
    "hint": "Reduce the base mod 5 first: 7 ≡ 2. Then powers of 2 mod 5 cycle 2,4,3,1 (length 4).",
    "theory": {
      "title": "Remainder of a Power — Modular Cyclicity",
      "icon": "🌀",
      "summary": "Reduce the base mod m, then the remainders of its powers cycle with a short period. Index by exponent mod the period.",
      "keyFacts": [
        "7 ≡ 2 (mod 5)",
        "2^n mod 5: 2,4,3,1 then repeats (period 4)",
        "Answer depends on n mod 4 — it is NOT constant",
        "Always reduce the base before taking powers"
      ],
      "example": {
        "problem": "Remainder of 7^n ÷ 5, all n.",
        "steps": [
          "7 ≡ 2 (mod 5)",
          "2,4,3,1,2,4,3,1 …",
          "Cycles through 2,4,3,1"
        ],
        "answer": "Cycles through 2, 4, 3, 1"
      },
      "traps": [
        "Assuming a single constant remainder",
        "Taking powers of 7 directly instead of reducing to 2"
      ],
      "solveSteps": [
        "1. Reduce base mod m",
        "2. List the power-cycle of remainders",
        "3. State the cycle / use n mod period"
      ]
    }
  },
  "15": {
    "hint": "Prime-factorize both. LCM = each prime to its HIGHEST exponent across the numbers.",
    "theory": {
      "title": "LCM via Prime Factorization",
      "icon": "🔗",
      "summary": "Least common multiple takes every prime to the maximum power seen in any of the numbers.",
      "keyFacts": [
        "12 = 2²·3, 18 = 2·3²",
        "LCM = 2^max(2,1) · 3^max(1,2) = 2²·3² = 36",
        "GCF uses MIN exponents; LCM uses MAX",
        "LCM(a,b) = a·b / GCF(a,b)"
      ],
      "example": {
        "problem": "LCM of 12 and 18.",
        "steps": [
          "12 = 2²·3¹",
          "18 = 2¹·3²",
          "Max each: 2²·3² = 36"
        ],
        "answer": "36"
      },
      "traps": [
        "Using min exponents (that gives GCF = 6)",
        "Multiplying 12·18 without dividing by GCF"
      ],
      "solveSteps": [
        "1. Prime-factorize both numbers",
        "2. Take the highest power of each prime",
        "3. Multiply"
      ]
    }
  },
  "16": {
    "hint": "GCF = each shared prime to its LOWEST exponent. 24=2³·3, 36=2²·3² → 2²·3 = 12.",
    "theory": {
      "title": "GCF via Prime Factorization",
      "icon": "🔻",
      "summary": "Greatest common factor takes every common prime to the minimum power present in both numbers.",
      "keyFacts": [
        "24 = 2³·3, 36 = 2²·3²",
        "GCF = 2^min(3,2) · 3^min(1,2) = 2²·3 = 12",
        "GCF uses MIN; LCM uses MAX",
        "GCF(a,b)·LCM(a,b) = a·b"
      ],
      "example": {
        "problem": "GCF of 24 and 36.",
        "steps": [
          "24 = 2³·3¹",
          "36 = 2²·3²",
          "Min each: 2²·3¹ = 12"
        ],
        "answer": "12"
      },
      "traps": [
        "Using max exponents (that is the LCM = 72)",
        "Including a prime not common to both"
      ],
      "solveSteps": [
        "1. Prime-factorize both",
        "2. Take the lowest power of each shared prime",
        "3. Multiply"
      ]
    }
  },
  "17": {
    "hint": "Factor count = product of (each exponent + 1). 36 = 2²·3² → (2+1)(2+1) = 9.",
    "theory": {
      "title": "Number of Divisors Formula",
      "icon": "🧮",
      "summary": "If N = p^a · q^b · …, the total number of positive divisors is (a+1)(b+1)…  — add 1 to each exponent and multiply.",
      "keyFacts": [
        "N = p^a·q^b → #divisors = (a+1)(b+1)",
        "36 = 2²·3² → 3·3 = 9",
        "Counts ALL divisors incl. 1 and N",
        "Perfect squares have an ODD divisor count"
      ],
      "example": {
        "problem": "How many factors does 36 have?",
        "steps": [
          "36 = 2²·3²",
          "(2+1)(2+1) = 9",
          "1,2,3,4,6,9,12,18,36 → 9"
        ],
        "answer": "9"
      },
      "traps": [
        "Multiplying exponents (2·2=4) instead of (a+1)(b+1)",
        "Forgetting to count 1 and N"
      ],
      "solveSteps": [
        "1. Prime-factorize N",
        "2. Add 1 to each exponent",
        "3. Multiply those results"
      ]
    }
  },
  "18": {
    "hint": "6 divisors → form p⁵ or p²·q. Smallest is the p²·q build with smallest primes: 2²·3 = 12.",
    "theory": {
      "title": "Smallest Integer with Exactly k Divisors",
      "icon": "🎯",
      "summary": "Divisor count factors as a product of (exponent+1) terms. Match k to exponent patterns, then assign the SMALLEST primes to the LARGEST exponents.",
      "keyFacts": [
        "6 = 6 or 3·2 → exponent patterns p⁵ or p²·q¹",
        "p⁵: 2⁵ = 32",
        "p²·q: smallest = 2²·3 = 12",
        "Rule: biggest exponent on the smallest prime (2)"
      ],
      "example": {
        "problem": "Smallest N with exactly 6 divisors.",
        "steps": [
          "6 = 3·2 → exponents (2,1)",
          "2²·3¹ = 12",
          "Divisors: 1,2,3,4,6,12 → 6"
        ],
        "answer": "12"
      },
      "traps": [
        "Picking 2·3=6 (only 4 divisors)",
        "Putting the large exponent on the larger prime (3²·2=18 > 12)"
      ],
      "solveSteps": [
        "1. Factor k into (exponent+1) pieces",
        "2. Subtract 1 → exponent pattern",
        "3. Assign largest exponent to prime 2, next to 3, …"
      ]
    }
  },
  "19": {
    "hint": "Cut is measured on the NEW (bigger) wage. Undo +20%: reduction = 0.2/1.2 = 1/6 ≈ 16⅔%.",
    "theory": {
      "title": "Undoing a Percent Increase",
      "icon": "↘",
      "summary": "To reverse a +x% increase you cut from the larger amount, so the required cut % is x/(100+x), not x.",
      "keyFacts": [
        "After +x%: amount = (1 + x/100)·W",
        "Required cut = x/(100 + x)",
        "+20% → cut = 20/120 = 1/6 ≈ 16.67%",
        "The undo % is always SMALLER than the increase %"
      ],
      "example": {
        "problem": "Wage +20%. % cut to restore original?",
        "steps": [
          "New = 1.2W",
          "Need to remove 0.2W from 1.2W",
          "0.2/1.2 = 1/6 ≈ 16⅔%"
        ],
        "answer": "16⅔%"
      },
      "traps": [
        "Answering 20% (cut base is the bigger 1.2W, not W)",
        "Using x/100 instead of x/(100+x)"
      ],
      "solveSteps": [
        "1. Express the increased amount",
        "2. Cut needed = increase / increased amount",
        "3. Convert to percent"
      ]
    }
  },
  "20": {
    "hint": "Use cost = 100. Marked = 140, sale = 140×0.75 = 105 → profit 5 → 5%.",
    "theory": {
      "title": "Markup then Discount — Profit on Cost",
      "icon": "🏷",
      "summary": "Set cost = 100, apply the markup multiplier, then the discount multiplier. Profit % = (selling − 100).",
      "keyFacts": [
        "Selling = Cost × (1 + markup) × (1 − discount)",
        "Cost 100 → 100 × 1.40 × 0.75 = 105",
        "Profit% on cost = selling − 100 (when cost = 100)",
        "Markup is on cost; discount is on the marked price"
      ],
      "example": {
        "problem": "Markup 40%, then 25% discount. Profit on cost?",
        "steps": [
          "Cost = 100 → marked = 140",
          "Sale = 140 × 0.75 = 105",
          "Profit = 5 → 5%"
        ],
        "answer": "5%"
      },
      "traps": [
        "Netting 40% − 25% = 15% (discount base is 140, not 100)",
        "Taking the discount off cost instead of marked price"
      ],
      "solveSteps": [
        "1. Let cost = 100",
        "2. ×(1+markup) then ×(1−discount)",
        "3. Profit% = selling − 100"
      ]
    }
  },
  "21": {
    "hint": "Isolate x in two moves: subtract the constant, then divide by the coefficient.",
    "theory": {
      "title": "Solving a One-Variable Linear Equation",
      "icon": "🟰",
      "summary": "Undo operations in reverse order: strip the added/subtracted constant first, then divide off the coefficient.",
      "keyFacts": [
        "ax + b = c → ax = c − b → x = (c − b)/a",
        "Do the same operation to BOTH sides",
        "Undo addition before multiplication (reverse PEMDAS)",
        "Check by substituting back"
      ],
      "example": {
        "problem": "3x + 7 = 22",
        "steps": [
          "3x = 22 − 7 = 15",
          "x = 15 / 3 = 5"
        ],
        "answer": "x = 5"
      },
      "traps": [
        "Dividing before subtracting the constant",
        "Only operating on one side"
      ],
      "solveSteps": [
        "1. Move constant to the other side",
        "2. Divide by the coefficient",
        "3. Substitute back to verify"
      ]
    }
  },
  "22": {
    "hint": "Distribute first, gather x on one side, constants on the other. Watch signs when moving 4x.",
    "theory": {
      "title": "Linear Equation with Variables on Both Sides",
      "icon": "⚖",
      "summary": "Expand brackets, then collect all x-terms on one side and numbers on the other. Sign care is everything.",
      "keyFacts": [
        "Distribute: 2(x − 3) = 2x − 6",
        "Subtract the smaller x-term from both sides",
        "A negative coefficient flips sign on divide",
        "2x − 6 = 4x + 2 → −8 = 2x"
      ],
      "example": {
        "problem": "2(x − 3) = 4x + 2",
        "steps": [
          "2x − 6 = 4x + 2",
          "−6 − 2 = 4x − 2x",
          "−8 = 2x → x = −4"
        ],
        "answer": "x = −4"
      },
      "traps": [
        "Forgetting to distribute the 2 to BOTH terms",
        "Sign error moving 4x or the constants"
      ],
      "solveSteps": [
        "1. Distribute all brackets",
        "2. Collect x one side, constants the other",
        "3. Divide; recheck signs"
      ]
    }
  },
  "23": {
    "hint": "Add the two equations to kill y, get x. Back-substitute for y, then multiply.",
    "theory": {
      "title": "2×2 System — Elimination",
      "icon": "➕",
      "summary": "When one variable has opposite coefficients, adding the equations eliminates it instantly.",
      "keyFacts": [
        "x + y = S and x − y = D → add → 2x = S + D",
        "Then y = S − x (back-substitute)",
        "Add to cancel opposite signs; subtract to cancel equal signs",
        "Answer the asked quantity (xy), not just x"
      ],
      "example": {
        "problem": "x + y = 10, x − y = 4. Find xy.",
        "steps": [
          "Add: 2x = 14 → x = 7",
          "y = 10 − 7 = 3",
          "xy = 21"
        ],
        "answer": "21"
      },
      "traps": [
        "Stopping at x = 7 and not finding xy",
        "Subtracting when you should add (or vice versa)"
      ],
      "solveSteps": [
        "1. Add/subtract to eliminate a variable",
        "2. Solve for the first variable",
        "3. Back-substitute, then form the requested expression"
      ]
    }
  },
  "24": {
    "hint": "Factor: find two numbers multiplying to +6, adding to −5 → −2 and −3. Roots flip sign.",
    "theory": {
      "title": "Solving a Quadratic by Factoring",
      "icon": "✖",
      "summary": "x² + bx + c = 0 factors as (x − r)(x − s) where r·s = c and r + s = −b. Roots are r and s.",
      "keyFacts": [
        "Need product = c, sum = b (the middle coefficient)",
        "x² − 5x + 6 → factors (x−2)(x−3)",
        "Root has OPPOSITE sign to the number in the bracket",
        "Set each factor = 0"
      ],
      "example": {
        "problem": "x² − 5x + 6 = 0",
        "steps": [
          "Product 6, sum −5 → −2, −3",
          "(x − 2)(x − 3) = 0",
          "x = 2 or x = 3"
        ],
        "answer": "x = 2, 3"
      },
      "traps": [
        "Reporting roots as −2, −3 (sign flips from the bracket)",
        "Mixing up which is product vs sum"
      ],
      "solveSteps": [
        "1. Find two numbers: product c, sum b",
        "2. Write (x + p)(x + q) = 0",
        "3. Roots = negatives of p, q"
      ]
    }
  },
  "25": {
    "hint": "Product = −16, sum = −6 → −8 and +2 → factors (x−8)(x+2). Positive root = 8.",
    "theory": {
      "title": "Quadratic with a Negative Constant",
      "icon": "✖",
      "summary": "Negative c means the two factors have OPPOSITE signs; the larger-magnitude one carries the sign of b.",
      "keyFacts": [
        "c < 0 → roots have opposite signs",
        "x² − 6x − 16: product −16, sum −6 → −8, +2",
        "(x − 8)(x + 2) = 0 → x = 8 or −2",
        "Read which root is asked (positive)"
      ],
      "example": {
        "problem": "x² − 6x − 16 = 0, positive root?",
        "steps": [
          "Need product −16, sum −6",
          "−8 and +2 work",
          "Roots 8, −2 → positive = 8"
        ],
        "answer": "8"
      },
      "traps": [
        "Same-sign factor pair (won't give product −16)",
        "Answering −2 when positive root requested"
      ],
      "solveSteps": [
        "1. Product = c (negative), sum = b",
        "2. One factor +, one −",
        "3. Pick the requested root"
      ]
    }
  },
  "26": {
    "hint": "Same base, multiplied → ADD exponents. 2³·2⁴ = 2⁷. Base stays 2.",
    "theory": {
      "title": "Exponent Rule — Product, Same Base",
      "icon": "^",
      "summary": "Multiplying powers of the same base adds exponents; the base never changes.",
      "keyFacts": [
        "aᵐ · aⁿ = a^(m+n)",
        "Base stays the same — 2³·2⁴ = 2⁷, not 4⁷",
        "Division subtracts: aᵐ/aⁿ = a^(m−n)",
        "Power of a power multiplies: (aᵐ)ⁿ = a^(mn)"
      ],
      "example": {
        "problem": "2³ · 2⁴",
        "steps": [
          "Same base 2 → add exponents",
          "2^(3+4) = 2⁷"
        ],
        "answer": "2⁷"
      },
      "traps": [
        "Changing the base to 4 (4⁷)",
        "Multiplying the exponents (2¹²)"
      ],
      "solveSteps": [
        "1. Confirm bases are equal",
        "2. Add exponents for a product",
        "3. Keep the original base"
      ]
    }
  },
  "27": {
    "hint": "Write 81 as a power of 3 (3⁴). Equal bases → set exponents equal: x+1 = 4.",
    "theory": {
      "title": "Exponential Equation — Match the Base",
      "icon": "^",
      "summary": "Rewrite both sides as the same base, then equate exponents.",
      "keyFacts": [
        "81 = 3⁴; 27 = 3³; 243 = 3⁵",
        "a^f = a^g → f = g (a ≠ 0,1)",
        "3^(x+1) = 3⁴ → x + 1 = 4",
        "Always express the constant as a power of the base"
      ],
      "example": {
        "problem": "3^(x+1) = 81",
        "steps": [
          "81 = 3⁴",
          "x + 1 = 4",
          "x = 3"
        ],
        "answer": "x = 3"
      },
      "traps": [
        "Solving 3·(x+1) = 81 (it's an exponent, not a factor)",
        "Forgetting the +1 in the exponent"
      ],
      "solveSteps": [
        "1. Express RHS as a power of the base",
        "2. Set exponents equal",
        "3. Solve the resulting linear equation"
      ]
    }
  },
  "28": {
    "hint": "Find x from 2^x = 32 (=2⁵), then 2^(x−2) = 2³. Or just divide by 2² = 4.",
    "theory": {
      "title": "Reindexing a Known Power",
      "icon": "^",
      "summary": "Once you know 2^x, any 2^(x±k) is the known value times/over 2^k — no need to find x explicitly.",
      "keyFacts": [
        "2^x = 32 = 2⁵ → x = 5",
        "2^(x−2) = 2^x / 2² = 32/4 = 8",
        "Subtracting 2 from the exponent divides by 2² = 4",
        "Shortcut avoids solving for x at all"
      ],
      "example": {
        "problem": "2^x = 32. Find 2^(x−2).",
        "steps": [
          "2^x = 2⁵ → x = 5",
          "2^(5−2) = 2³ = 8",
          "(or 32 / 4 = 8)"
        ],
        "answer": "8"
      },
      "traps": [
        "Subtracting 2 from the value (32 − 2)",
        "Dividing by 2 instead of 2² "
      ],
      "solveSteps": [
        "1. Express the given as a power",
        "2. Adjust the exponent by the shift",
        "3. Or scale the known value by 2^shift"
      ]
    }
  },
  "29": {
    "hint": "2¹⁰ + 2¹⁰ = 2·2¹⁰ = 2¹¹ (NOT 4²⁰). Then 2¹¹/2¹¹ = 1.",
    "theory": {
      "title": "Sum of Equal Powers — Factor, Don't Multiply Bases",
      "icon": "Σ",
      "summary": "aⁿ + aⁿ = 2·aⁿ (a sum, factor out), not a²ⁿ. This collapses many GMAT exponent traps.",
      "keyFacts": [
        "2¹⁰ + 2¹⁰ = 2 · 2¹⁰ = 2¹¹",
        "x + x = 2x — same idea with x = 2¹⁰",
        "NOT 2¹⁰ · 2¹⁰ = 2²⁰ (that's a product, not a sum)",
        "k copies of aⁿ = k·aⁿ"
      ],
      "example": {
        "problem": "(2¹⁰ + 2¹⁰) / 2¹¹",
        "steps": [
          "2¹⁰ + 2¹⁰ = 2 · 2¹⁰ = 2¹¹",
          "2¹¹ / 2¹¹ = 1"
        ],
        "answer": "1"
      },
      "traps": [
        "Treating the sum as a product (2²⁰)",
        "Adding exponents on a sum"
      ],
      "solveSteps": [
        "1. Factor the repeated power: k·aⁿ",
        "2. Combine into a single power",
        "3. Apply the division rule"
      ]
    }
  },
  "30": {
    "hint": "Solve like an equation: 3x − 5 > 7 → 3x > 12 → x > 4. (No flip — divided by +3.)",
    "theory": {
      "title": "Solving a Linear Inequality",
      "icon": "≷",
      "summary": "Solve exactly like an equation, with ONE extra rule: multiplying or dividing by a negative flips the inequality sign.",
      "keyFacts": [
        "Add/subtract: sign unchanged",
        "Multiply/divide by POSITIVE: sign unchanged",
        "Multiply/divide by NEGATIVE: flip the sign",
        "3x − 5 > 7 → 3x > 12 → x > 4"
      ],
      "example": {
        "problem": "3x − 5 > 7",
        "steps": [
          "3x > 12",
          "Divide by +3 (no flip)",
          "x > 4"
        ],
        "answer": "x > 4"
      },
      "traps": [
        "Flipping the sign when dividing by a POSITIVE",
        "Using ≥ when the original is strict >"
      ],
      "solveSteps": [
        "1. Isolate the variable term",
        "2. Divide by the coefficient",
        "3. Flip the sign ONLY if that coefficient is negative"
      ]
    }
  },
  "31": {
    "hint": "Add the extremes: min+min and max+max. −2+1 = −1, 5+6 = 11. Bounds stay strict.",
    "theory": {
      "title": "Adding Two Ranges (Interval Arithmetic)",
      "icon": "↔",
      "summary": "The sum of two intervals runs from (min+min) to (max+max). Strict bounds stay strict.",
      "keyFacts": [
        "If a<x<b and c<y<d → (a+c) < x+y < (b+d)",
        "Add lows together, highs together",
        "Strict < stays strict in the sum",
        "For x − y instead: low = a − d, high = b − c"
      ],
      "example": {
        "problem": "−2 < x < 5, 1 < y < 6. Range of x+y?",
        "steps": [
          "Min = −2 + 1 = −1",
          "Max = 5 + 6 = 11",
          "−1 < x+y < 11"
        ],
        "answer": "−1 < x+y < 11"
      },
      "traps": [
        "Subtracting the bounds when adding the variables",
        "For x−y, pairing min with min (must cross: a−d, b−c)"
      ],
      "solveSteps": [
        "1. Identify each variable's bounds",
        "2. Sum: low+low, high+high (subtract: cross the bounds)",
        "3. Keep strictness"
      ]
    }
  },
  "32": {
    "hint": "|x−3|<4 → −4 < x−3 < 4 → −1 < x < 7. Count INTEGERS strictly inside: 0..6.",
    "theory": {
      "title": "Absolute Value Inequality — Unfold the Band",
      "icon": "│ │",
      "summary": "|expr| < k means −k < expr < k. Solve the double inequality, then count integers strictly inside.",
      "keyFacts": [
        "|A| < k ⟺ −k < A < k (k > 0)",
        "|A| > k ⟺ A < −k OR A > k",
        "Strict < excludes the endpoints",
        "−1 < x < 7 → integers 0,1,2,3,4,5,6"
      ],
      "example": {
        "problem": "Integer solutions of |x − 3| < 4",
        "steps": [
          "−4 < x − 3 < 4",
          "−1 < x < 7",
          "Integers: 0..6 → 7 values"
        ],
        "answer": "7"
      },
      "traps": [
        "Including endpoints −1 and 7 (strict inequality)",
        "Off-by-one in the integer count"
      ],
      "solveSteps": [
        "1. Rewrite as −k < A < k",
        "2. Solve the compound inequality",
        "3. Count integers strictly between"
      ]
    }
  },
  "33": {
    "hint": "Notice x²+8x = (x+4)² − 16. Since |x+4|=3, (x+4)²=9 → 9 − 16 = −7 (both roots).",
    "theory": {
      "title": "Use the Squared Form, Not the Roots",
      "icon": "│ │",
      "summary": "When asked for x²+8x and given |x+4|=3, complete the square: x²+8x = (x+4)²−16. (x+4)² = 3² regardless of which root.",
      "keyFacts": [
        "x² + 8x = (x + 4)² − 16",
        "|x+4| = 3 → (x+4)² = 9",
        "So x²+8x = 9 − 16 = −7 for BOTH roots",
        "Completing the square dodges casework"
      ],
      "example": {
        "problem": "|x+4| = 3. Find x² + 8x.",
        "steps": [
          "x²+8x = (x+4)² − 16",
          "(x+4)² = 3² = 9",
          "9 − 16 = −7"
        ],
        "answer": "−7"
      },
      "traps": [
        "Solving both roots and arithmetic-erroring one",
        "Forgetting the −16 from completing the square"
      ],
      "solveSteps": [
        "1. Complete the square on the target expression",
        "2. Substitute (x+4)² = k²",
        "3. Evaluate — same for both roots"
      ]
    }
  },
  "34": {
    "hint": "Square x + 1/x. (x+1/x)² = x² + 2 + 1/x². So x²+1/x² = 4² − 2 = 14.",
    "theory": {
      "title": "Symmetric Identity x² + 1/x²",
      "icon": "🪞",
      "summary": "Squaring x + 1/x produces the cross term 2. Subtract it to isolate x² + 1/x².",
      "keyFacts": [
        "(x + 1/x)² = x² + 2 + 1/x²",
        "x² + 1/x² = (x + 1/x)² − 2",
        "(x − 1/x)² = x² − 2 + 1/x²",
        "Given sum 4 → 16 − 2 = 14"
      ],
      "example": {
        "problem": "x + 1/x = 4. Find x² + 1/x².",
        "steps": [
          "Square: 16 = x² + 2 + 1/x²",
          "x² + 1/x² = 16 − 2 = 14"
        ],
        "answer": "14"
      },
      "traps": [
        "Forgetting the middle term is 2 (from 2·x·1/x)",
        "Adding 2 instead of subtracting"
      ],
      "solveSteps": [
        "1. Square the given sum",
        "2. Expand: middle term = 2",
        "3. Subtract 2"
      ]
    }
  },
  "35": {
    "hint": "a²−b² = (a+b)(a−b). You know a−b=5 and a²−b²=35 → a+b = 35/5 = 7.",
    "theory": {
      "title": "Difference of Squares Factoring",
      "icon": "△",
      "summary": "a² − b² always factors as (a+b)(a−b). Given one factor and the product, divide for the other.",
      "keyFacts": [
        "a² − b² = (a + b)(a − b)",
        "Given (a−b) and (a²−b²): a+b = (a²−b²)/(a−b)",
        "35 / 5 = 7",
        "No need to find a and b individually"
      ],
      "example": {
        "problem": "a − b = 5, a² − b² = 35. Find a + b.",
        "steps": [
          "35 = (a+b)(a−b) = (a+b)·5",
          "a + b = 7"
        ],
        "answer": "7"
      },
      "traps": [
        "Solving for a and b separately (slower, error-prone)",
        "Factoring a²−b² as (a−b)² "
      ],
      "solveSteps": [
        "1. Recognize a²−b² = (a+b)(a−b)",
        "2. Divide the product by the known factor",
        "3. Read off the other factor"
      ]
    }
  },
  "36": {
    "hint": "Substitute x = −2 carefully. (−2)² = 4 (positive). f(−2) = 2·4 − 3 = 5.",
    "theory": {
      "title": "Function Evaluation — Substitute & Sign Care",
      "icon": "ƒ",
      "summary": "Replace every x with the input value, in brackets. A squared negative becomes positive.",
      "keyFacts": [
        "(−2)² = 4, NOT −4",
        "Substitute the whole value in parentheses",
        "Follow order of operations after substitution",
        "f(x)=2x²−3 → f(−2)=2(4)−3=5"
      ],
      "example": {
        "problem": "f(x) = 2x² − 3. Find f(−2).",
        "steps": [
          "(−2)² = 4",
          "2·4 = 8",
          "8 − 3 = 5"
        ],
        "answer": "5"
      },
      "traps": [
        "−2² treated as −4 (forgot the square applies to −2)",
        "Multiplying then squaring (order error)"
      ],
      "solveSteps": [
        "1. Put the input in parentheses for every x",
        "2. Apply exponents first",
        "3. Finish the arithmetic"
      ]
    }
  },
  "37": {
    "hint": "Convert 5 miles → quarter-miles: 5 ÷ 0.25 = 20 units. Cost = base + 20·0.40.",
    "theory": {
      "title": "Linear Cost Model (Base + Per-Unit)",
      "icon": "🚕",
      "summary": "Cost = fixed base + (rate × number of units). Convert the quantity into the unit the rate uses FIRST.",
      "keyFacts": [
        "Cost = base + rate · units",
        "Match units: $0.40 per quarter-mile → count quarter-miles",
        "5 miles = 5 / 0.25 = 20 quarter-miles",
        "2.50 + 20·0.40 = 10.50"
      ],
      "example": {
        "problem": "$2.50 base + $0.40 per ¼ mile. 5-mile ride?",
        "steps": [
          "5 mi = 20 quarter-miles",
          "20 × 0.40 = 8.00",
          "2.50 + 8.00 = 10.50"
        ],
        "answer": "$10.50"
      },
      "traps": [
        "Using 5 (miles) instead of 20 (quarter-miles)",
        "Forgetting the fixed base fare"
      ],
      "solveSteps": [
        "1. Convert quantity to the rate's unit",
        "2. Multiply by the per-unit rate",
        "3. Add the fixed base"
      ]
    }
  },
  "38": {
    "hint": "Consecutive even integers: n and n+2. n + (n+2) = 78 → n = 38, larger = 40.",
    "theory": {
      "title": "Consecutive-Integer Word Equations",
      "icon": "🔢",
      "summary": "Name the first integer n; consecutive evens/odds differ by 2. Translate the sentence, solve, then answer the specific one asked.",
      "keyFacts": [
        "Consecutive even: n, n+2 (also works for consecutive odd)",
        "Consecutive integers: n, n+1",
        "Sum of two: 2n + 2 = total",
        "Larger = n + 2"
      ],
      "example": {
        "problem": "Two consecutive even integers sum to 78. Larger?",
        "steps": [
          "n + (n+2) = 78",
          "2n + 2 = 78 → n = 38",
          "Larger = 40"
        ],
        "answer": "40"
      },
      "traps": [
        "Answering n (38) instead of the larger (40)",
        "Using n+1 for consecutive EVEN integers"
      ],
      "solveSteps": [
        "1. Let n = first integer",
        "2. Express the others (n+2, …) and the equation",
        "3. Solve, then pick the requested integer"
      ]
    }
  },
  "39": {
    "hint": "(x+y)² = x²+y² + 2xy. Plug in 25 + 2·12 = 49. Don't solve for x,y.",
    "theory": {
      "title": "Expanding (x + y)² with Known Pieces",
      "icon": "△",
      "summary": "(x+y)² = x² + y² + 2xy. If you know x²+y² and xy, just substitute — never solve the system.",
      "keyFacts": [
        "(x + y)² = x² + 2xy + y²",
        "(x − y)² = x² − 2xy + y²",
        "Given x²+y²=25, xy=12 → 25 + 24 = 49",
        "Sum of squares + twice product"
      ],
      "example": {
        "problem": "x²+y²=25, xy=12. Find (x+y)².",
        "steps": [
          "(x+y)² = (x²+y²) + 2xy",
          "= 25 + 2·12",
          "= 49"
        ],
        "answer": "49"
      },
      "traps": [
        "Forgetting the 2 on the cross term",
        "Trying to solve for x and y separately"
      ],
      "solveSteps": [
        "1. Write the identity (x+y)² = x²+y²+2xy",
        "2. Substitute the known values",
        "3. Compute"
      ]
    }
  },
  "40": {
    "hint": "Composition works inside-out: compute g(2) FIRST, then feed it to f.",
    "theory": {
      "title": "Function Composition f(g(x)) — Inside Out",
      "icon": "ƒ∘",
      "summary": "Evaluate the inner function first, then substitute that result into the outer function. Order matters.",
      "keyFacts": [
        "f(g(x)) → do g first, then f",
        "g(2) = 2·2 − 3 = 1",
        "f(1) = 1² + 1 = 2",
        "f(g(x)) ≠ g(f(x)) in general"
      ],
      "example": {
        "problem": "f(x)=x²+1, g(x)=2x−3. Find f(g(2)).",
        "steps": [
          "g(2) = 4 − 3 = 1",
          "f(1) = 1 + 1 = 2"
        ],
        "answer": "2"
      },
      "traps": [
        "Doing f first then g (wrong order)",
        "Composing the formulas but mis-substituting"
      ],
      "solveSteps": [
        "1. Evaluate the inner function at the input",
        "2. Feed that output into the outer function",
        "3. Simplify"
      ]
    }
  },
  "41": {
    "hint": "|2x−5|≤4 → −4 ≤ 2x−5 ≤ 4 → 0.5 ≤ x ≤ 4.5. Count integers in [0.5,4.5]: 1,2,3,4.",
    "theory": {
      "title": "Counting Integers in an Absolute-Value Band",
      "icon": "│ │",
      "summary": "|A| ≤ k unfolds to −k ≤ A ≤ k. Solve for x, then count integers inside the (possibly non-integer) bounds.",
      "keyFacts": [
        "|A| ≤ k ⟺ −k ≤ A ≤ k (≤ keeps endpoints)",
        "0.5 ≤ x ≤ 4.5 → integers 1,2,3,4",
        "Non-integer bounds: round inward",
        "Count = floor(hi) − ceil(lo) + 1"
      ],
      "example": {
        "problem": "Integer x with |2x − 5| ≤ 4",
        "steps": [
          "−4 ≤ 2x − 5 ≤ 4",
          "1 ≤ 2x ≤ 9 → 0.5 ≤ x ≤ 4.5",
          "Integers 1,2,3,4 → 4"
        ],
        "answer": "4"
      },
      "traps": [
        "Counting 0 or 5 (outside 0.5–4.5)",
        "Off-by-one with non-integer endpoints"
      ],
      "solveSteps": [
        "1. Unfold |A| ≤ k to −k ≤ A ≤ k",
        "2. Solve for x",
        "3. Count integers strictly within the bounds"
      ]
    }
  },
  "42": {
    "hint": "Subtract the fixed daily fee first ($80−$30=$50), THEN divide by per-mile rate.",
    "theory": {
      "title": "Linear Cost Model — Solve for Quantity",
      "icon": "🚗",
      "summary": "Bill = fixed + rate·units. To find units: peel off the fixed part, then divide by the rate.",
      "keyFacts": [
        "Total = base + rate · units",
        "units = (Total − base) / rate",
        "$80 − $30 = $50 variable; 50 / 0.20 = 250",
        "Dividing $0.20 → ×5 per dollar"
      ],
      "example": {
        "problem": "$30/day + $0.20/mi, bill $80 (1 day). Miles?",
        "steps": [
          "Variable = 80 − 30 = 50",
          "Miles = 50 / 0.20 = 250"
        ],
        "answer": "250"
      },
      "traps": [
        "Dividing 80 by 0.20 (forgot the base fee)",
        "Multiplying by 0.20 instead of dividing"
      ],
      "solveSteps": [
        "1. Subtract the fixed component",
        "2. Divide remainder by the per-unit rate",
        "3. Units = result"
      ]
    }
  },
  "43": {
    "hint": "Pythagoras: hyp = √(3²+4²) = 5. (Recognize the 3-4-5 triple instantly.)",
    "theory": {
      "title": "Pythagorean Theorem & Common Triples",
      "icon": "📐",
      "summary": "In a right triangle, leg² + leg² = hyp². Memorize 3-4-5, 5-12-13, 8-15-17 to skip the arithmetic.",
      "keyFacts": [
        "a² + b² = c² (c = hypotenuse, opposite right angle)",
        "Triples: 3-4-5, 5-12-13, 8-15-17 (and multiples)",
        "√(9+16) = √25 = 5",
        "Hypotenuse is always the LONGEST side"
      ],
      "example": {
        "problem": "Legs 3 and 4, find hypotenuse.",
        "steps": [
          "3² + 4² = 9 + 16 = 25",
          "√25 = 5"
        ],
        "answer": "5"
      },
      "traps": [
        "Adding 3+4 = 7",
        "Treating a leg as the hypotenuse"
      ],
      "solveSteps": [
        "1. Identify legs vs hypotenuse",
        "2. a²+b²=c² (or recall the triple)",
        "3. Square-root for c"
      ]
    }
  },
  "44": {
    "hint": "30-60-90 sides are x : x√3 : 2x. Side opp 60° = x√3 = 6√3 → x=6 → hyp = 2x = 12.",
    "theory": {
      "title": "30–60–90 Special Right Triangle",
      "icon": "📐",
      "summary": "Fixed side ratio 1 : √3 : 2 for angles 30° : 60° : 90°. Match the given side to its ratio slot, find x, scale.",
      "keyFacts": [
        "Opposite 30° : 60° : 90° = x : x√3 : 2x",
        "Shortest side faces 30°; hyp faces 90°",
        "Side opp 60° = x√3 = 6√3 → x = 6",
        "Hypotenuse = 2x = 12"
      ],
      "example": {
        "problem": "30-60-90, side opp 60° = 6√3. Hypotenuse?",
        "steps": [
          "x√3 = 6√3 → x = 6",
          "Hyp = 2x = 12"
        ],
        "answer": "12"
      },
      "traps": [
        "Mismatching which side faces which angle",
        "Using 45-45-90 ratio (1:1:√2) by mistake"
      ],
      "solveSteps": [
        "1. Write the 1:√3:2 template",
        "2. Match given side to its slot, solve for x",
        "3. Scale to the requested side"
      ]
    }
  },
  "45": {
    "hint": "Triangle angles sum to 180°. Third = 180 − 50 − 70.",
    "theory": {
      "title": "Triangle Angle Sum",
      "icon": "△",
      "summary": "The three interior angles of any triangle add to exactly 180°. Subtract the two known from 180.",
      "keyFacts": [
        "Interior angles sum to 180°",
        "Third = 180 − (sum of other two)",
        "Exterior angle = sum of two remote interiors",
        "Quadrilateral sum = 360°"
      ],
      "example": {
        "problem": "Angles 50° and 70°, find third.",
        "steps": [
          "180 − 50 − 70 = 60°"
        ],
        "answer": "60°"
      },
      "traps": [
        "Using 360° (that's a quadrilateral)",
        "Arithmetic slip on the subtraction"
      ],
      "solveSteps": [
        "1. Sum the known angles",
        "2. Subtract from 180°",
        "3. That is the third angle"
      ]
    }
  },
  "46": {
    "hint": "Isosceles right (45-45-90): hyp = leg·√2. Leg = 10/√2 = 5√2. Area = ½ leg².",
    "theory": {
      "title": "45–45–90 Triangle & Its Area",
      "icon": "📐",
      "summary": "Isosceles right triangle: legs equal, hyp = leg·√2. From the hypotenuse, back out the leg, then area = ½ leg².",
      "keyFacts": [
        "45-45-90 ratio: 1 : 1 : √2",
        "leg = hyp / √2",
        "Area = ½ · leg · leg (the two legs are the base & height)",
        "hyp 10 → leg 5√2 → area ½·50 = 25"
      ],
      "example": {
        "problem": "Isosceles right triangle, hyp = 10. Area?",
        "steps": [
          "leg = 10/√2 = 5√2",
          "Area = ½(5√2)(5√2) = ½·50 = 25"
        ],
        "answer": "25"
      },
      "traps": [
        "Using the hypotenuse as base × height",
        "Forgetting leg = hyp/√2 (rationalize)"
      ],
      "solveSteps": [
        "1. leg = hyp / √2",
        "2. Area = ½ · leg²",
        "3. Simplify"
      ]
    }
  },
  "47": {
    "hint": "Equilateral height = (s√3)/2. s=6 → 3√3.",
    "theory": {
      "title": "Equilateral Triangle Height",
      "icon": "△",
      "summary": "The altitude splits an equilateral triangle into two 30-60-90s; height = (side·√3)/2.",
      "keyFacts": [
        "Height h = (s√3)/2",
        "Area = (√3/4)s²",
        "Altitude bisects the base and apex angle",
        "s=6 → h = 3√3"
      ],
      "example": {
        "problem": "Equilateral side 6, height?",
        "steps": [
          "h = (6√3)/2",
          "= 3√3"
        ],
        "answer": "3√3"
      },
      "traps": [
        "Using s/2 (that's half the base, not the height)",
        "Confusing height formula with area formula"
      ],
      "solveSteps": [
        "1. Apply h = (s√3)/2",
        "2. Substitute the side",
        "3. Simplify the radical"
      ]
    }
  },
  "48": {
    "hint": "Equilateral area = (√3/4)·s². s=8 → (√3/4)·64 = 16√3.",
    "theory": {
      "title": "Equilateral Triangle Area",
      "icon": "△",
      "summary": "Area of an equilateral triangle is (√3/4) times the side squared — a formula worth memorizing cold.",
      "keyFacts": [
        "Area = (√3/4) s²",
        "s = 8 → (√3/4)(64) = 16√3",
        "Derives from ½·base·height with h=(s√3)/2",
        "Scales with s² (double side → 4× area)"
      ],
      "example": {
        "problem": "Equilateral side 8, area?",
        "steps": [
          "(√3/4)·8²",
          "(√3/4)·64 = 16√3"
        ],
        "answer": "16√3"
      },
      "traps": [
        "Using ½·s·s (only valid for right isosceles)",
        "Forgetting to square the side"
      ],
      "solveSteps": [
        "1. Area = (√3/4)s²",
        "2. Square the side",
        "3. Multiply by √3/4"
      ]
    }
  },
  "49": {
    "hint": "Area = πr². r=7 → 49π. (Don't use 2πr — that's circumference.)",
    "theory": {
      "title": "Circle Area",
      "icon": "⚪",
      "summary": "Area = πr². Keep it distinct from circumference 2πr — mixing them is the classic circle trap.",
      "keyFacts": [
        "Area = πr²",
        "Circumference = 2πr",
        "r = 7 → area 49π",
        "Area scales with r² (double r → 4× area)"
      ],
      "example": {
        "problem": "Radius 7, area?",
        "steps": [
          "A = π·7²",
          "= 49π"
        ],
        "answer": "49π"
      },
      "traps": [
        "Computing 2π·7 = 14π (circumference)",
        "Using diameter 14 as r"
      ],
      "solveSteps": [
        "1. Identify r (not diameter)",
        "2. Square it",
        "3. Multiply by π"
      ]
    }
  },
  "50": {
    "hint": "Circumference 12π → 2πr=12π → r=6 → Area = π·36 = 36π.",
    "theory": {
      "title": "Circle — Circumference to Area",
      "icon": "⚪",
      "summary": "Use circumference to recover r (divide by 2π), then plug r into πr².",
      "keyFacts": [
        "C = 2πr → r = C/(2π)",
        "Then A = πr²",
        "C = 12π → r = 6 → A = 36π",
        "Never jump straight from C to A"
      ],
      "example": {
        "problem": "Circumference 12π, area?",
        "steps": [
          "2πr = 12π → r = 6",
          "A = π·36 = 36π"
        ],
        "answer": "36π"
      },
      "traps": [
        "Treating 12π as the radius or area",
        "Forgetting to square r after finding it"
      ],
      "solveSteps": [
        "1. r = C / (2π)",
        "2. A = πr²",
        "3. Simplify"
      ]
    }
  },
  "51": {
    "hint": "60° = 1/6 of the circle. Arc 5π is 1/6 of circumference → C=30π → r=15 → A=225π.",
    "theory": {
      "title": "Arc Length → Radius → Area",
      "icon": "⚪",
      "summary": "An arc is the central-angle fraction of the full circumference. Recover the whole circle from the fraction, then find r and area.",
      "keyFacts": [
        "Arc = (θ/360) · 2πr",
        "60° = 1/6 of 360° → arc = (1/6)·C",
        "5π = C/6 → C = 30π → r = 15",
        "A = πr² = 225π"
      ],
      "example": {
        "problem": "60° arc length 5π. Circle area?",
        "steps": [
          "5π = (1/6)·C → C = 30π",
          "r = 15",
          "A = π·225 = 225π"
        ],
        "answer": "225π"
      },
      "traps": [
        "Treating 5π as the full circumference",
        "Using 60 instead of 60/360 fraction"
      ],
      "solveSteps": [
        "1. Convert angle to a fraction of 360°",
        "2. Arc = fraction · C → solve C, then r",
        "3. A = πr²"
      ]
    }
  },
  "52": {
    "hint": "Distance = √[(Δx)²+(Δy)²] = √(3²+4²) = 5.",
    "theory": {
      "title": "Distance Formula (Coordinate Plane)",
      "icon": "📍",
      "summary": "Distance between two points is the Pythagorean theorem on the coordinate differences.",
      "keyFacts": [
        "d = √[(x₂−x₁)² + (y₂−y₁)²]",
        "Δx=3, Δy=4 → √25 = 5 (3-4-5 again)",
        "Order of subtraction doesn't matter (squared)",
        "It's just Pythagoras on Δx, Δy"
      ],
      "example": {
        "problem": "Distance (1,2) to (4,6)",
        "steps": [
          "Δx = 3, Δy = 4",
          "√(9+16) = √25 = 5"
        ],
        "answer": "5"
      },
      "traps": [
        "Adding Δx+Δy instead of the root of squares",
        "Sign error before squaring (harmless but messy)"
      ],
      "solveSteps": [
        "1. Compute Δx and Δy",
        "2. Square, add",
        "3. Square-root"
      ]
    }
  },
  "53": {
    "hint": "Slope = rise/run = (9−3)/(5−2) = 6/3 = 2. Keep point order consistent.",
    "theory": {
      "title": "Slope Between Two Points",
      "icon": "📈",
      "summary": "Slope = change in y over change in x. Subtract coordinates in the SAME order top and bottom.",
      "keyFacts": [
        "m = (y₂−y₁)/(x₂−x₁)",
        "Consistent order both numerator & denominator",
        "(9−3)/(5−2) = 6/3 = 2",
        "Positive slope rises left→right"
      ],
      "example": {
        "problem": "Slope through (2,3) and (5,9)",
        "steps": [
          "Δy = 9−3 = 6",
          "Δx = 5−2 = 3",
          "m = 6/3 = 2"
        ],
        "answer": "2"
      },
      "traps": [
        "Flipping to run/rise (Δx/Δy)",
        "Mixing point order between num and denom"
      ],
      "solveSteps": [
        "1. Pick (x₁,y₁) and (x₂,y₂)",
        "2. m = Δy/Δx (same order)",
        "3. Simplify"
      ]
    }
  },
  "54": {
    "hint": "Reflect across x-axis → replace y with −y: −y = 2x+3 → y = −2x−3.",
    "theory": {
      "title": "Reflecting a Line Across the x-Axis",
      "icon": "🪞",
      "summary": "x-axis reflection sends (x,y)→(x,−y). Substitute −y for y in the equation, then re-solve for y.",
      "keyFacts": [
        "x-axis: y → −y (x unchanged)",
        "y-axis: x → −x",
        "−y = 2x+3 → y = −2x−3",
        "Both slope and intercept negate here"
      ],
      "example": {
        "problem": "Reflect y=2x+3 across x-axis.",
        "steps": [
          "Replace y with −y: −y = 2x+3",
          "Multiply by −1: y = −2x−3"
        ],
        "answer": "y = −2x − 3"
      },
      "traps": [
        "Only negating slope OR intercept, not both",
        "Confusing with y-axis reflection (x→−x)"
      ],
      "solveSteps": [
        "1. Substitute −y for y",
        "2. Solve back for y",
        "3. Read new slope/intercept"
      ]
    }
  },
  "55": {
    "hint": "Set the two expressions equal: 2x+3 = −x+6 → x=1, then y=5.",
    "theory": {
      "title": "Intersection of Two Lines",
      "icon": "✕",
      "summary": "At the intersection both equations share x and y. Set the y-expressions equal, solve for x, back-substitute for y.",
      "keyFacts": [
        "Set y₁ = y₂ and solve for x",
        "Substitute x into either line for y",
        "2x+3 = −x+6 → 3x = 3 → x = 1",
        "y = 2(1)+3 = 5 → (1,5)"
      ],
      "example": {
        "problem": "y=2x+3 and y=−x+6 meet where?",
        "steps": [
          "2x+3 = −x+6",
          "3x = 3 → x = 1",
          "y = 5 → (1,5)"
        ],
        "answer": "(1, 5)"
      },
      "traps": [
        "Reporting only x, not the (x,y) point",
        "Substituting into the wrong equation and slipping"
      ],
      "solveSteps": [
        "1. Equate the two y-expressions",
        "2. Solve for x",
        "3. Back-substitute for y; give the point"
      ]
    }
  },
  "56": {
    "hint": "Radius = distance from center (3,4) to the point it passes through (0,0) = 5.",
    "theory": {
      "title": "Radius as a Distance",
      "icon": "⚪",
      "summary": "A circle's radius equals the distance from its center to ANY point on it — here, the origin.",
      "keyFacts": [
        "r = distance(center, point on circle)",
        "Use the distance formula",
        "(3,4) to (0,0): √(9+16) = 5",
        "3-4-5 triple again"
      ],
      "example": {
        "problem": "Center (3,4), passes through origin. r?",
        "steps": [
          "d = √[(3−0)²+(4−0)²]",
          "= √25 = 5"
        ],
        "answer": "5"
      },
      "traps": [
        "Adding coordinates (3+4)",
        "Using only one coordinate as r"
      ],
      "solveSteps": [
        "1. Identify center and a known point",
        "2. Distance formula between them",
        "3. That distance = r"
      ]
    }
  },
  "57": {
    "hint": "Rectangle diagonal = √(l²+w²) = √(144+25) = 13.",
    "theory": {
      "title": "Rectangle Diagonal (Pythagoras)",
      "icon": "▭",
      "summary": "The diagonal splits a rectangle into two right triangles with legs = length and width.",
      "keyFacts": [
        "Diagonal = √(l² + w²)",
        "12,5 → √169 = 13 (5-12-13 triple)",
        "Diagonal > either side",
        "Same idea as the distance formula"
      ],
      "example": {
        "problem": "Rectangle 12 × 5, diagonal?",
        "steps": [
          "√(12² + 5²)",
          "√(144+25) = √169 = 13"
        ],
        "answer": "13"
      },
      "traps": [
        "Adding 12+5 = 17",
        "Using area (60) as a length"
      ],
      "solveSteps": [
        "1. Legs = length and width",
        "2. Diagonal = √(l²+w²)",
        "3. Recognize the triple if present"
      ]
    }
  },
  "58": {
    "hint": "Area 64 → side 8 → square diagonal = side·√2 = 8√2.",
    "theory": {
      "title": "Square Diagonal from Area",
      "icon": "⬛",
      "summary": "Side = √area; the diagonal of a square is side·√2 (it's the hypotenuse of a 45-45-90).",
      "keyFacts": [
        "side = √area",
        "diagonal = side·√2",
        "area 64 → side 8 → diagonal 8√2",
        "diagonal² = 2·area"
      ],
      "example": {
        "problem": "Square area 64, diagonal?",
        "steps": [
          "side = √64 = 8",
          "diagonal = 8√2"
        ],
        "answer": "8√2"
      },
      "traps": [
        "Reporting side (8) as the diagonal",
        "Using ·2 instead of ·√2"
      ],
      "solveSteps": [
        "1. side = √area",
        "2. diagonal = side·√2",
        "3. Simplify"
      ]
    }
  },
  "59": {
    "hint": "Cube surface area = 6s². 6s²=96 → s²=16 → s=4 → V = s³ = 64.",
    "theory": {
      "title": "Cube — Surface Area to Volume",
      "icon": "🧊",
      "summary": "A cube has 6 equal faces (SA = 6s²) and volume s³. Back out the side from SA, then cube it.",
      "keyFacts": [
        "SA = 6s²; V = s³",
        "6s² = 96 → s² = 16 → s = 4",
        "V = 4³ = 64",
        "Don't confuse 6s² with s² or 4s²"
      ],
      "example": {
        "problem": "Cube SA = 96, volume?",
        "steps": [
          "6s² = 96 → s² = 16",
          "s = 4 → V = 64"
        ],
        "answer": "64"
      },
      "traps": [
        "Using SA = s² (one face only)",
        "Stopping at s or s² instead of s³"
      ],
      "solveSteps": [
        "1. SA = 6s² → solve s",
        "2. V = s³",
        "3. Compute"
      ]
    }
  },
  "60": {
    "hint": "Cylinder V = πr²h. V₁=π·9·10=90π, V₂=π·36·5=180π → 1:2. r is squared.",
    "theory": {
      "title": "Cylinder Volume Ratio",
      "icon": "🛢",
      "summary": "V = πr²h. When comparing two cylinders, the radius enters SQUARED — doubling r quadruples that factor.",
      "keyFacts": [
        "V = πr²h",
        "V₁ = π·3²·10 = 90π",
        "V₂ = π·6²·5 = 180π",
        "Ratio 90:180 = 1:2 (π cancels)"
      ],
      "example": {
        "problem": "r=3,h=10 vs r=6,h=5. V₁:V₂?",
        "steps": [
          "V₁ = π·9·10 = 90π",
          "V₂ = π·36·5 = 180π",
          "1 : 2"
        ],
        "answer": "1:2"
      },
      "traps": [
        "Using r linearly instead of r²",
        "Forgetting π cancels in a ratio"
      ],
      "solveSteps": [
        "1. V = πr²h for each",
        "2. Form the ratio (π cancels)",
        "3. Simplify"
      ]
    }
  }
};

if (typeof window !== 'undefined') {
  window.QUESTION_THEORIES = QUESTION_THEORIES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_THEORIES };
}
