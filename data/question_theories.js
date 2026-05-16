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
  }
};

if (typeof window !== 'undefined') {
  window.QUESTION_THEORIES = QUESTION_THEORIES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_THEORIES };
}
