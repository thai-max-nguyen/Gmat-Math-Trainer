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
          "Sum the known angles: 50 + 70 = 120°",
          "Third = 180 − 120 = 60°"
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
  },
  "61": {
    "hint": "Sphere V = (4/3)πr³. r=3 → (4/3)π·27 = 36π. Cube the radius, not square.",
    "theory": {
      "title": "Sphere Volume",
      "icon": "⚪",
      "summary": "Volume of a sphere is (4/3)πr³ — radius is CUBED. Keep it distinct from surface area 4πr².",
      "keyFacts": [
        "V = (4/3)πr³",
        "Surface area = 4πr²",
        "r=3 → 27 → (4/3)·27·π = 36π",
        "Volume scales with r³ (double r → 8× volume)"
      ],
      "example": {
        "problem": "Sphere radius 3, volume?",
        "steps": [
          "r³ = 27",
          "(4/3)·27 = 36",
          "V = 36π"
        ],
        "answer": "36π"
      },
      "traps": [
        "Squaring r (using r²) instead of cubing",
        "Dropping the 4/3 factor"
      ],
      "solveSteps": [
        "1. Cube the radius",
        "2. Multiply by 4/3",
        "3. Attach π"
      ]
    }
  },
  "62": {
    "hint": "Interior angle sum = (n−2)·180. Octagon n=8 → 6·180 = 1080°.",
    "theory": {
      "title": "Polygon Interior-Angle Sum",
      "icon": "⬡",
      "summary": "Any n-gon's interior angles sum to (n−2)·180° — split it into n−2 triangles.",
      "keyFacts": [
        "Sum = (n − 2) · 180°",
        "Octagon n=8 → 6·180 = 1080°",
        "Each angle of a REGULAR n-gon = (n−2)·180/n",
        "Exterior angles always sum to 360°"
      ],
      "example": {
        "problem": "Sum of interior angles of an octagon.",
        "steps": [
          "n = 8",
          "(8 − 2)·180 = 6·180",
          "= 1080°"
        ],
        "answer": "1080°"
      },
      "traps": [
        "Using n·180 (forgot the −2)",
        "Confusing with the 360° exterior sum"
      ],
      "solveSteps": [
        "1. Count sides n",
        "2. (n−2)·180",
        "3. Compute"
      ]
    }
  },
  "73": {
    "hint": "Compound: multiply by (1+r) each year. 1000·1.1·1.1 = 1000·1.21 = 1210 (not 1200).",
    "theory": {
      "title": "Compound Interest",
      "icon": "💰",
      "summary": "Each period multiplies by (1+r). After t periods: A = P(1+r)ᵗ. The extra over simple interest is interest-on-interest.",
      "keyFacts": [
        "A = P(1 + r)ᵗ",
        "1000·1.1² = 1000·1.21 = 1210",
        "Simple would give 1200 — the extra $10 is interest on year-1 interest",
        "Compounded annually → exponent = number of years"
      ],
      "example": {
        "problem": "$1000, 10%/yr compounded annually, 2 years.",
        "steps": [
          "Year 1: 1000·1.1 = 1100",
          "Year 2: 1100·1.1 = 1210"
        ],
        "answer": "$1210"
      },
      "traps": [
        "Using simple interest → $1200",
        "1000·1.2 (adding the two years' rates)"
      ],
      "solveSteps": [
        "1. A = P(1+r)ᵗ",
        "2. Raise (1+r) to the period count",
        "3. Multiply by principal"
      ]
    }
  },
  "74": {
    "hint": "Simple interest I = P·r·t = 5000·0.06·3 = 900. Linear, no compounding.",
    "theory": {
      "title": "Simple Interest",
      "icon": "💵",
      "summary": "Simple interest is flat: I = P·r·t. It does NOT compound — same interest each period.",
      "keyFacts": [
        "I = P · r · t",
        "5000 · 0.06 · 3 = 900",
        "Total owed = P + I",
        "No interest-on-interest (unlike compound)"
      ],
      "example": {
        "problem": "$5000 at 6%/yr simple, 3 years interest?",
        "steps": [
          "P·r = 5000·0.06 = 300/yr",
          "× 3 years = 900"
        ],
        "answer": "$900"
      },
      "traps": [
        "Compounding it (gives ~955)",
        "Forgetting to multiply by t"
      ],
      "solveSteps": [
        "1. I = P·r·t",
        "2. Convert rate to decimal",
        "3. Multiply all three"
      ]
    }
  },
  "75": {
    "hint": "At-least-one = 30+25−15 = 40 (subtract the overlap once). Neither = 60−40 = 20.",
    "theory": {
      "title": "Two-Set Inclusion-Exclusion",
      "icon": "⚭",
      "summary": "|A∪B| = |A| + |B| − |A∩B|. 'Neither' = total − |A∪B|.",
      "keyFacts": [
        "|A∪B| = |A|+|B|−|A∩B|",
        "Subtract the 'both' once (it was counted twice)",
        "Neither = Total − |A∪B|",
        "30+25−15 = 40; 60−40 = 20"
      ],
      "example": {
        "problem": "60 students; 30 Fr, 25 Sp, 15 both. Neither?",
        "steps": [
          "At least one = 30+25−15 = 40",
          "Neither = 60 − 40 = 20"
        ],
        "answer": "20"
      },
      "traps": [
        "Not subtracting the overlap (30+25=55)",
        "Answering 'at least one' (40) not 'neither'"
      ],
      "solveSteps": [
        "1. |A∪B| = |A|+|B|−|both|",
        "2. Neither = total − |A∪B|",
        "3. Answer the asked region"
      ]
    }
  },
  "76": {
    "hint": "Three-set: +singles −pairs +triple. 70+50+35 −30−20−15 +10 = 100.",
    "theory": {
      "title": "Three-Set Inclusion-Exclusion",
      "icon": "⚭",
      "summary": "|A∪B∪C| = Σsingles − Σpairs + triple. Alternating signs prevent double/triple counting.",
      "keyFacts": [
        "|A∪B∪C| = |A|+|B|+|C| − |AB|−|AC|−|BC| + |ABC|",
        "Add singles, subtract each pair, add back the triple",
        "70+50+35 − 30−20−15 + 10 = 100",
        "Pair counts include the triple region"
      ],
      "example": {
        "problem": "70 A, 50 B, 35 C; pairs 30/20/15; all 10. ≥1?",
        "steps": [
          "Singles: 70+50+35 = 155",
          "− pairs: −30−20−15 = −65 → 90",
          "+ triple: +10 = 100"
        ],
        "answer": "100"
      },
      "traps": [
        "Wrong sign on the triple term",
        "Forgetting pair counts already include all-three"
      ],
      "solveSteps": [
        "1. Sum singles",
        "2. Subtract all pairwise intersections",
        "3. Add back the triple"
      ]
    }
  },
  "77": {
    "hint": "Profit% = profit / COST × 100 = (100−80)/80 = 25%. Base is cost, not sale price.",
    "theory": {
      "title": "Profit Percent (on Cost)",
      "icon": "🏷",
      "summary": "Profit% = (Selling − Cost)/Cost × 100. The denominator is COST unless told otherwise.",
      "keyFacts": [
        "Profit = SP − CP",
        "Profit% = Profit / CP × 100",
        "(100−80)/80 = 20/80 = 25%",
        "Margin% (on SP) would be 20/100 = 20% — different"
      ],
      "example": {
        "problem": "Buy $80, sell $100. Profit %?",
        "steps": [
          "Profit = 100 − 80 = 20",
          "20 / 80 = 0.25 = 25%"
        ],
        "answer": "25%"
      },
      "traps": [
        "Dividing by 100 (selling price) → 20%",
        "Using SP−CP only, no percent"
      ],
      "solveSteps": [
        "1. Profit = SP − CP",
        "2. Divide by CP",
        "3. ×100"
      ]
    }
  },
  "78": {
    "hint": "Mean = sum / count = 60 / 5 = 12.",
    "theory": {
      "title": "Arithmetic Mean",
      "icon": "x̄",
      "summary": "Mean = (sum of all values) / (number of values). Add carefully, divide by the count.",
      "keyFacts": [
        "Mean = Σx / n",
        "5+8+12+15+20 = 60",
        "60 / 5 = 12",
        "Mean need not be one of the data values"
      ],
      "example": {
        "problem": "Mean of 5, 8, 12, 15, 20.",
        "steps": [
          "Sum = 60",
          "60 / 5 = 12"
        ],
        "answer": "12"
      },
      "traps": [
        "Dividing by wrong count",
        "Addition slip"
      ],
      "solveSteps": [
        "1. Sum all values",
        "2. Count them",
        "3. Divide"
      ]
    }
  },
  "79": {
    "hint": "Total = mean·n = 6·22 = 132. 6th = total − sum-of-other-5 = 132 − 110 = 22.",
    "theory": {
      "title": "Missing Value from a Mean",
      "icon": "x̄",
      "summary": "Mean·count = total. Subtract the known partial sum to recover the missing value.",
      "keyFacts": [
        "Total = mean × n",
        "Missing = Total − (sum of the rest)",
        "6·22 = 132; 132 − 110 = 22",
        "Works for any one unknown in a mean"
      ],
      "example": {
        "problem": "Mean of 6 nums = 22; 5 sum to 110. 6th?",
        "steps": [
          "Total = 6·22 = 132",
          "6th = 132 − 110 = 22"
        ],
        "answer": "22"
      },
      "traps": [
        "Using n=5 instead of 6 for the total",
        "Subtracting in the wrong direction"
      ],
      "solveSteps": [
        "1. Total = mean·n",
        "2. Subtract the known sum",
        "3. Remainder = missing value"
      ]
    }
  },
  "80": {
    "hint": "SORT first, then take the middle. 3,4,7,9,12 → median 7.",
    "theory": {
      "title": "Median",
      "icon": "↕",
      "summary": "Median = middle value of the SORTED list. Odd n → the middle one; even n → average of the two middle.",
      "keyFacts": [
        "Must sort before reading the middle",
        "Odd count → single middle value",
        "Even count → mean of the two central values",
        "Sorted 3,4,7,9,12 → middle = 7"
      ],
      "example": {
        "problem": "Median of 3, 7, 9, 4, 12",
        "steps": [
          "Sort: 3,4,7,9,12",
          "Middle (3rd of 5) = 7"
        ],
        "answer": "7"
      },
      "traps": [
        "Taking the middle of the UNSORTED list (9)",
        "Confusing median with mean"
      ],
      "solveSteps": [
        "1. Sort ascending",
        "2. Locate the middle position",
        "3. Read (or average two middles)"
      ]
    }
  },
  "81": {
    "hint": "Range = max − min = 9 − 1 = 8.",
    "theory": {
      "title": "Range",
      "icon": "↔",
      "summary": "Range is simply the largest value minus the smallest. No sorting of the middle needed.",
      "keyFacts": [
        "Range = max − min",
        "Only the two extremes matter",
        "9 − 1 = 8",
        "Range ≥ 0 always"
      ],
      "example": {
        "problem": "Range of 4, 9, 1, 7, 6",
        "steps": [
          "Max = 9, Min = 1",
          "9 − 1 = 8"
        ],
        "answer": "8"
      },
      "traps": [
        "Counting number of elements",
        "Min − max (negative)"
      ],
      "solveSteps": [
        "1. Find max",
        "2. Find min",
        "3. Subtract"
      ]
    }
  },
  "82": {
    "hint": "SD measures spread around the mean. {1,3,5,7,9} is the most spread → greatest SD.",
    "theory": {
      "title": "Comparing Standard Deviations by Inspection",
      "icon": "σ",
      "summary": "SD quantifies how far values sit from the mean. More spread = larger SD; identical values = SD 0. Often comparable without computing.",
      "keyFacts": [
        "SD = 0 when all values equal",
        "Wider spread around the mean → larger SD",
        "{1,3,5,7,9} spans 8 with gaps of 2 — most spread",
        "Tight clusters (e.g. {4,5,5,5,6}) → small SD"
      ],
      "example": {
        "problem": "Greatest SD among the listed sets?",
        "steps": [
          "{5,5,5,5,5} → SD 0",
          "Clustered sets → small SD",
          "{1,3,5,7,9} most dispersed → largest"
        ],
        "answer": "{1,3,5,7,9}"
      },
      "traps": [
        "Picking the set with the largest mean (irrelevant)",
        "Assuming more elements → more SD"
      ],
      "solveSteps": [
        "1. Eyeball spread around each mean",
        "2. Zero spread → SD 0",
        "3. Widest dispersion → greatest SD"
      ]
    }
  },
  "83": {
    "hint": "Old total 5·12=60. New total 7·14=98. Two new sum = 98 − 60 = 38.",
    "theory": {
      "title": "Effect of Adding Values on the Mean",
      "icon": "x̄",
      "summary": "Convert each mean to a total (mean×count). The added values' sum = new total − old total.",
      "keyFacts": [
        "Total = mean × count",
        "Old: 5·12 = 60; New: 7·14 = 98",
        "Added sum = 98 − 60 = 38",
        "Count grows by the number added (5→7)"
      ],
      "example": {
        "problem": "Mean 12 (n=5) → mean 14 (n=7). Sum of 2 new?",
        "steps": [
          "Old total = 60",
          "New total = 7·14 = 98",
          "New two = 38"
        ],
        "answer": "38"
      },
      "traps": [
        "Using n=5 for the new total",
        "Multiplying the mean change by something"
      ],
      "solveSteps": [
        "1. Old total = old mean·old n",
        "2. New total = new mean·new n",
        "3. Difference = sum of added values"
      ]
    }
  },
  "84": {
    "hint": "Weighted mean = Σ(value·weight)/Σweight = (240+120)/5 = 72. Not (80+60)/2.",
    "theory": {
      "title": "Weighted Average",
      "icon": "⚖",
      "summary": "Each value contributes in proportion to its weight: Σ(vᵢwᵢ)/Σwᵢ. Pulls toward the heavier-weighted value.",
      "keyFacts": [
        "Weighted mean = Σ(v·w) / Σw",
        "(80·3 + 60·2)/(3+2) = 360/5 = 72",
        "Result leans toward the larger weight (80, weight 3)",
        "Equal weights → ordinary average"
      ],
      "example": {
        "problem": "80 (w3) and 60 (w2) weighted average.",
        "steps": [
          "80·3 + 60·2 = 240 + 120 = 360",
          "÷ (3+2) = 360/5 = 72"
        ],
        "answer": "72"
      },
      "traps": [
        "Plain average (80+60)/2 = 70",
        "Dividing by 2 instead of total weight 5"
      ],
      "solveSteps": [
        "1. Multiply each value by its weight",
        "2. Sum those products",
        "3. Divide by total weight"
      ]
    }
  },
  "85": {
    "hint": "3 sum = 240. 4 sum = 4·82 = 328. 4th = 328 − 240 = 88.",
    "theory": {
      "title": "New Data Point Shifting a Mean",
      "icon": "x̄",
      "summary": "The new score must supply the old total PLUS the lift across all items. Use totals, not the mean change alone.",
      "keyFacts": [
        "Old total = 3·80 = 240",
        "New total = 4·82 = 328",
        "4th = 328 − 240 = 88",
        "Score = new total − old total"
      ],
      "example": {
        "problem": "3 tests mean 80 → 4 tests mean 82. 4th?",
        "steps": [
          "Old total = 240",
          "New total = 328",
          "4th = 88"
        ],
        "answer": "88"
      },
      "traps": [
        "Answering 82 (the new mean)",
        "Adding only the 2-point rise once"
      ],
      "solveSteps": [
        "1. Old total = old mean·n",
        "2. New total = new mean·(n+1)",
        "3. New score = difference"
      ]
    }
  },
  "86": {
    "hint": "Adding a constant to every value shifts the mean but NOT the spread → SD unchanged.",
    "theory": {
      "title": "Translation Invariance of Standard Deviation",
      "icon": "σ",
      "summary": "Adding/subtracting the same constant to every data point moves the whole set; distances from the mean are unchanged, so SD is unchanged.",
      "keyFacts": [
        "Add c to all → mean shifts by c, SD unchanged",
        "SD depends only on deviations from the mean",
        "Shifting preserves every deviation",
        "Contrast: multiplying scales SD (see scaling rule)"
      ],
      "example": {
        "problem": "Add 5 to every element. New SD vs old?",
        "steps": [
          "Each value +5 → mean +5",
          "value − mean unchanged",
          "SD identical"
        ],
        "answer": "Same"
      },
      "traps": [
        "Thinking SD also rises by 5",
        "Confusing shift with scaling"
      ],
      "solveSteps": [
        "1. Note it's an additive shift",
        "2. Deviations from mean unchanged",
        "3. SD unchanged"
      ]
    }
  },
  "87": {
    "hint": "Multiplying every value by k scales SD by |k|. ×3 → SD ×3.",
    "theory": {
      "title": "Scaling Rule for Standard Deviation",
      "icon": "σ",
      "summary": "Multiplying every data point by k multiplies the SD by |k| (and variance by k²). Contrast with additive shifts, which leave SD alone.",
      "keyFacts": [
        "Multiply all by k → SD ×|k|",
        "Variance ×k²",
        "×3 → SD ×3",
        "Adding a constant: SD unchanged (different rule)"
      ],
      "example": {
        "problem": "Every element ×3. New SD?",
        "steps": [
          "Deviations all scale by 3",
          "SD = 3 × old SD"
        ],
        "answer": "Old SD × 3"
      },
      "traps": [
        "Using ×9 (that's the variance factor)",
        "Treating it like an additive shift (no change)"
      ],
      "solveSteps": [
        "1. Identify multiplicative scaling by k",
        "2. SD × |k|",
        "3. (variance × k²)"
      ]
    }
  },
  "88": {
    "hint": "Arrange n distinct in a line = n!. 4! = 24.",
    "theory": {
      "title": "Permutations — Arranging in a Line",
      "icon": "🔢",
      "summary": "n distinct objects in order = n! (n choices, then n−1, …). Order matters.",
      "keyFacts": [
        "Arrangements of n distinct = n!",
        "4! = 4·3·2·1 = 24",
        "Order matters → permutation, not combination",
        "0! = 1"
      ],
      "example": {
        "problem": "Arrange 4 people in a line.",
        "steps": [
          "4 choices for 1st, 3, 2, 1",
          "4! = 24"
        ],
        "answer": "24"
      },
      "traps": [
        "Using 4² or 4·4",
        "Treating as a combination (order ignored)"
      ],
      "solveSteps": [
        "1. Distinct items, order matters",
        "2. Compute n!",
        "3. Done"
      ]
    }
  },
  "89": {
    "hint": "Choose (order irrelevant) → C(8,3) = 8·7·6 / 3! = 56.",
    "theory": {
      "title": "Combinations — Choosing a Group",
      "icon": "🔢",
      "summary": "Selecting r from n where order does NOT matter: C(n,r) = n! / (r!(n−r)!). Divide out the r! orderings.",
      "keyFacts": [
        "C(n,r) = n!/(r!(n−r)!)",
        "C(8,3) = 8·7·6 / 3! = 336/6 = 56",
        "Order irrelevant → combination",
        "C(n,r) = C(n,n−r)"
      ],
      "example": {
        "problem": "Choose 3 students from 8.",
        "steps": [
          "8·7·6 = 336 (ordered)",
          "÷ 3! = 6",
          "= 56"
        ],
        "answer": "56"
      },
      "traps": [
        "Using permutation 8·7·6 = 336 (order counted)",
        "Dividing by wrong factorial"
      ],
      "solveSteps": [
        "1. Order matters? No → combination",
        "2. n·(n−1)…(r terms) / r!",
        "3. Simplify"
      ]
    }
  },
  "90": {
    "hint": "Repeated letters: divide n! by the factorial of each repeat. BOOK = 4!/2! = 12.",
    "theory": {
      "title": "Permutations with Repeated Letters",
      "icon": "🔠",
      "summary": "Arrangements of a word with repeats = n! / (product of each repeated letter's factorial). Identical letters aren't distinguishable.",
      "keyFacts": [
        "Distinct arrangements = n! / (r₁!·r₂!…)",
        "BOOK: 4 letters, O repeats twice → 4!/2!",
        "4!/2! = 24/2 = 12",
        "No repeats → just n!"
      ],
      "example": {
        "problem": "Distinct 4-letter arrangements of BOOK.",
        "steps": [
          "4! = 24 if all distinct",
          "O twice → ÷2!",
          "24/2 = 12"
        ],
        "answer": "12"
      },
      "traps": [
        "Using 4! = 24 (ignores the repeated O)",
        "Dividing by 2 instead of 2! (same here, but matters for 3+ repeats)"
      ],
      "solveSteps": [
        "1. n! for all letters",
        "2. Divide by factorial of each repeat count",
        "3. Simplify"
      ]
    }
  },
  "91": {
    "hint": "“At least 2 women” → easier as TOTAL − (0 women) − (1 woman). C(10,5) − C(6,5) − C(4,1)C(6,4).",
    "theory": {
      "title": "Combinations — Complement for 'At Least'",
      "icon": "🔢",
      "summary": "“At least k” over many cases is faster as total minus the few forbidden cases (0 and 1 here).",
      "keyFacts": [
        "Total ways = C(10,5) = 252",
        "0 women = C(6,5) = 6",
        "1 woman = C(4,1)·C(6,4) = 4·15 = 60",
        "≥2 women = 252 − 6 − 60 = 186"
      ],
      "example": {
        "problem": "Committee 5 from 6M+4W, ≥2 women.",
        "steps": [
          "All: C(10,5) = 252",
          "Forbidden: 0W(6) + 1W(60) = 66",
          "252 − 66 = 186"
        ],
        "answer": "186"
      },
      "traps": [
        "Summing exactly-2,3,4 with arithmetic slips",
        "Forgetting the 1-woman case in the complement"
      ],
      "solveSteps": [
        "1. Total unrestricted",
        "2. Subtract the 'too few' cases",
        "3. Remainder = at-least count"
      ]
    }
  },
  "92": {
    "hint": "Exactly 1 woman = (choose 1 of 4 women)·(choose 2 of 5 men) = C(4,1)·C(5,2).",
    "theory": {
      "title": "Combinations — Exact Composition (Multiply Groups)",
      "icon": "🔢",
      "summary": "Pick the required count from each group separately, then multiply the per-group counts.",
      "keyFacts": [
        "Independent selections → multiply",
        "Women: C(4,1) = 4",
        "Men: C(5,2) = 10",
        "4 · 10 = 40"
      ],
      "example": {
        "problem": "Team of 3 from 5M+4W, exactly 1 woman.",
        "steps": [
          "1 woman: C(4,1) = 4",
          "2 men: C(5,2) = 10",
          "4·10 = 40"
        ],
        "answer": "40"
      },
      "traps": [
        "Adding instead of multiplying the groups",
        "Choosing 2 women (mis-reading 'exactly 1')"
      ],
      "solveSteps": [
        "1. Decide count from each group",
        "2. Combination per group",
        "3. Multiply"
      ]
    }
  },
  "93": {
    "hint": "P = favorable / total = 1/6.",
    "theory": {
      "title": "Basic Probability",
      "icon": "🎲",
      "summary": "For equally likely outcomes, probability = favorable outcomes ÷ total outcomes.",
      "keyFacts": [
        "P(event) = favorable / total",
        "Fair die: 6 equally likely faces",
        "One face = 5 → 1/6",
        "0 ≤ P ≤ 1"
      ],
      "example": {
        "problem": "P(rolling a 5 on a fair die)",
        "steps": [
          "Favorable = 1 (the face 5)",
          "Total = 6",
          "1/6"
        ],
        "answer": "1/6"
      },
      "traps": [
        "Using 5/6 (confusing the face value with probability)",
        "Forgetting all 6 faces are equally likely"
      ],
      "solveSteps": [
        "1. Count favorable",
        "2. Count total equally-likely",
        "3. Divide"
      ]
    }
  },
  "94": {
    "hint": "Independent events → multiply. P(HH) = ½·½ = ¼.",
    "theory": {
      "title": "Independent Events — Multiply",
      "icon": "🎲",
      "summary": "If events don't affect each other, P(both) = P(A)·P(B).",
      "keyFacts": [
        "Independent: P(A and B) = P(A)·P(B)",
        "Coin: P(H) = ½ each flip",
        "½ · ½ = ¼",
        "List check: HH,HT,TH,TT → 1/4 are HH"
      ],
      "example": {
        "problem": "Two coins, P(both heads)?",
        "steps": [
          "P(H)=½, P(H)=½",
          "½·½ = ¼"
        ],
        "answer": "1/4"
      },
      "traps": [
        "Adding ½+½ = 1",
        "Using 1/3 (ignoring HT≠TH)"
      ],
      "solveSteps": [
        "1. Confirm independence",
        "2. Multiply the probabilities",
        "3. Simplify"
      ]
    }
  },
  "95": {
    "hint": "Without replacement → denominator shrinks. P = (3/8)·(2/7) = 3/28.",
    "theory": {
      "title": "Dependent Draws (Without Replacement)",
      "icon": "🎲",
      "summary": "Each draw changes the pool. Multiply sequential probabilities, updating both favorable and total counts.",
      "keyFacts": [
        "1st red: 3/8",
        "2nd red: 2/7 (one red and one total gone)",
        "(3/8)·(2/7) = 6/56 = 3/28",
        "Without replacement → counts decrease"
      ],
      "example": {
        "problem": "3R/5B, draw 2 no replace, P(both red)?",
        "steps": [
          "P(1st R) = 3/8",
          "P(2nd R | R) = 2/7",
          "6/56 = 3/28"
        ],
        "answer": "3/28"
      },
      "traps": [
        "Keeping 3/8·3/8 (that's with replacement)",
        "Not reducing total from 8 to 7"
      ],
      "solveSteps": [
        "1. P(first)",
        "2. P(second) with pool reduced",
        "3. Multiply, simplify"
      ]
    }
  },
  "96": {
    "hint": "“At least one” → 1 − P(none). 1 − (½)³ = 7/8.",
    "theory": {
      "title": "Complement Rule — 'At Least One'",
      "icon": "🎲",
      "summary": "P(at least one) = 1 − P(zero). Computing the single 'none' case beats summing many cases.",
      "keyFacts": [
        "P(≥1) = 1 − P(0)",
        "P(no heads in 3) = (½)³ = 1/8",
        "1 − 1/8 = 7/8",
        "Works for any 'at least one' setup"
      ],
      "example": {
        "problem": "P(≥1 head in 3 flips)",
        "steps": [
          "P(all tails) = (1/2)³ = 1/8",
          "1 − 1/8 = 7/8"
        ],
        "answer": "7/8"
      },
      "traps": [
        "Adding P(1)+P(2)+P(3) with errors",
        "Forgetting to subtract from 1"
      ],
      "solveSteps": [
        "1. Find P(none)",
        "2. Subtract from 1",
        "3. That's P(at least one)"
      ]
    }
  },
  "97": {
    "hint": "Conditional: given 1st white removed, pool is 2W+2B → P(white) = 2/4 = 1/2.",
    "theory": {
      "title": "Conditional Probability — Reduced Pool",
      "icon": "🎲",
      "summary": "P(B|A) is computed in the world where A already happened — update the counts, then take the simple ratio.",
      "keyFacts": [
        "Start 3W, 2B",
        "Given 1st white gone → 2W, 2B (4 total)",
        "P(2nd white | 1st white) = 2/4 = 1/2",
        "Condition first, then count"
      ],
      "example": {
        "problem": "3W/2B, P(2nd white | 1st white)?",
        "steps": [
          "Remove 1 white → 2W, 2B",
          "P = 2/4 = 1/2"
        ],
        "answer": "1/2"
      },
      "traps": [
        "Using original 3/5",
        "Computing joint P(both) instead of conditional"
      ],
      "solveSteps": [
        "1. Apply the condition (adjust pool)",
        "2. Count favorable / new total",
        "3. Simplify"
      ]
    }
  },
  "98": {
    "hint": "36 ordered outcomes; sum 7 has 6 ways → 6/36 = 1/6.",
    "theory": {
      "title": "Two-Dice Sums",
      "icon": "🎲",
      "summary": "Two dice → 36 equally likely ordered pairs. Count pairs giving the target sum. Sum 7 is the most likely (6 ways).",
      "keyFacts": [
        "Total outcomes = 6·6 = 36",
        "Sum 7: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) = 6",
        "6/36 = 1/6",
        "Ways per sum: 2&12→1, 7→6 (triangular)"
      ],
      "example": {
        "problem": "Die rolled twice, P(sum = 7)?",
        "steps": [
          "Favorable pairs = 6",
          "Total = 36",
          "6/36 = 1/6"
        ],
        "answer": "1/6"
      },
      "traps": [
        "Using 11 outcomes (sums 2–12) as the denominator",
        "Not counting (a,b) and (b,a) separately"
      ],
      "solveSteps": [
        "1. Total = 36 ordered pairs",
        "2. Count pairs hitting the sum",
        "3. Divide"
      ]
    }
  },
  "99": {
    "hint": "aₙ = a₁ + (n−1)d. d=4, a₁=7 → a₁₀ = 7 + 9·4 = 43.",
    "theory": {
      "title": "Arithmetic Sequence — nth Term",
      "icon": "🔢",
      "summary": "Constant common difference d. The nth term is a₁ + (n−1)d — note it's (n−1), not n.",
      "keyFacts": [
        "aₙ = a₁ + (n−1)d",
        "d = 11 − 7 = 4",
        "a₁₀ = 7 + 9·4 = 43",
        "(n−1) factor, not n"
      ],
      "example": {
        "problem": "7,11,15,19,… 10th term?",
        "steps": [
          "d = 4, a₁ = 7",
          "a₁₀ = 7 + (10−1)·4",
          "= 7 + 36 = 43"
        ],
        "answer": "43"
      },
      "traps": [
        "Using n·d (gives 47)",
        "Wrong common difference sign"
      ],
      "solveSteps": [
        "1. d = consecutive difference",
        "2. aₙ = a₁ + (n−1)d",
        "3. Substitute n"
      ]
    }
  },
  "100": {
    "hint": "Series sum = n·(first+last)/2 = 50·(2+100)/2 = 2550.",
    "theory": {
      "title": "Arithmetic Series Sum",
      "icon": "Σ",
      "summary": "Sum = (number of terms)·(first + last)/2 — the average term times the count.",
      "keyFacts": [
        "S = n(a₁ + aₙ)/2",
        "50 even numbers: first 2, last 100",
        "50·(2+100)/2 = 50·51 = 2550",
        "n = count of terms (here 50, not 100)"
      ],
      "example": {
        "problem": "2 + 4 + … + 100 (50 terms)",
        "steps": [
          "n = 50, first 2, last 100",
          "50·(102)/2 = 50·51",
          "= 2550"
        ],
        "answer": "2550"
      },
      "traps": [
        "Using n = 100 instead of 50 terms",
        "Forgetting to divide by 2"
      ],
      "solveSteps": [
        "1. Count terms n",
        "2. (first+last)/2 = average",
        "3. × n"
      ]
    }
  },
  "101": {
    "hint": "Geometric: aₙ = a₁·r^(n−1). r=2, a₁=3 → a₇ = 3·2⁶ = 192.",
    "theory": {
      "title": "Geometric Sequence — nth Term",
      "icon": "🔢",
      "summary": "Constant ratio r between terms. nth term = a₁·r^(n−1) (exponent is n−1).",
      "keyFacts": [
        "aₙ = a₁·r^(n−1)",
        "r = 6/3 = 2",
        "a₇ = 3·2⁶ = 3·64 = 192",
        "Exponent n−1, not n"
      ],
      "example": {
        "problem": "3,6,12,24,… 7th term?",
        "steps": [
          "r = 2, a₁ = 3",
          "a₇ = 3·2^(7−1) = 3·64",
          "= 192"
        ],
        "answer": "192"
      },
      "traps": [
        "Using r⁷ (gives 384)",
        "Adding instead of multiplying by r"
      ],
      "solveSteps": [
        "1. r = term ÷ previous term",
        "2. aₙ = a₁·r^(n−1)",
        "3. Compute the power"
      ]
    }
  },
  "102": {
    "hint": "Sum 1..n = n(n+1)/2 = 100·101/2 = 5050.",
    "theory": {
      "title": "Sum of First n Integers",
      "icon": "Σ",
      "summary": "1 + 2 + … + n = n(n+1)/2 (Gauss pairing). Memorize it cold.",
      "keyFacts": [
        "Σ₁ⁿ = n(n+1)/2",
        "100·101/2 = 5050",
        "1..(n−1) would be (n−1)n/2 = 4950",
        "Inclusive of both endpoints"
      ],
      "example": {
        "problem": "Sum 1 to 100 inclusive",
        "steps": [
          "n = 100",
          "100·101/2",
          "= 5050"
        ],
        "answer": "5050"
      },
      "traps": [
        "Using 99·100/2 = 4950 (off by one)",
        "Forgetting the /2"
      ],
      "solveSteps": [
        "1. Identify n",
        "2. n(n+1)/2",
        "3. Compute"
      ]
    }
  },
  "103": {
    "hint": "d from two terms: (35−11)/(10−4)=4. Then a₁ = a₄ − 3d = 11 − 12 = −1.",
    "theory": {
      "title": "Arithmetic Sequence — Find a₁ from Two Terms",
      "icon": "🔢",
      "summary": "The difference between any two terms is (gap in indices)·d. Solve d, then step back to a₁.",
      "keyFacts": [
        "aₘ − aₖ = (m − k)·d",
        "(35 − 11)/(10 − 4) = 24/6 = 4",
        "a₁ = a₄ − 3d = 11 − 12 = −1",
        "Step from a known term, not from scratch"
      ],
      "example": {
        "problem": "a₄=11, a₁₀=35. Find a₁.",
        "steps": [
          "d = 24/6 = 4",
          "a₁ = 11 − 3·4",
          "= −1"
        ],
        "answer": "−1"
      },
      "traps": [
        "Dividing by 10−4=6 wrong, or using 10−1",
        "Adding 3d instead of subtracting to reach a₁"
      ],
      "solveSteps": [
        "1. d = Δterm / Δindex",
        "2. a₁ = known term − (index−1)·d",
        "3. Compute"
      ]
    }
  },
  "104": {
    "hint": "DS: (1) solves x=4 uniquely → sufficient. (2) only a sign → not. Answer A.",
    "theory": {
      "title": "Data Sufficiency — One Statement Solves It",
      "icon": "📊",
      "summary": "DS asks if you CAN determine the value, not what it is. A linear equation in one unknown is sufficient; a mere sign/range usually isn't.",
      "keyFacts": [
        "(1) 2x+3=11 → x=4: unique → sufficient",
        "(2) x>0: infinitely many x → insufficient",
        "One sufficient, the other not → answer A (or B)",
        "Never average/combine the actual values"
      ],
      "example": {
        "problem": "Value of x? (1) 2x+3=11 (2) x>0",
        "steps": [
          "(1) → x = 4 alone: SUFFICIENT",
          "(2) → any positive: INSUFFICIENT",
          "Only (1) works → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Solving the value and ignoring the sufficiency question",
        "Calling (2) sufficient because it 'helps'"
      ],
      "solveSteps": [
        "1. Test (1) alone: unique answer?",
        "2. Test (2) alone: unique answer?",
        "3. Map to AD / BCE grid"
      ]
    }
  },
  "105": {
    "hint": "Want x+y. (2) 2x+2y=10 → x+y=5 alone. (1) x−y=3 alone can't give the sum. Answer B.",
    "theory": {
      "title": "Data Sufficiency — Solve for the Asked Expression",
      "icon": "📊",
      "summary": "You need the exact quantity asked (x+y), not necessarily x and y individually. A statement giving the combination directly is sufficient.",
      "keyFacts": [
        "Target = x+y (the expression, not each variable)",
        "(2) 2x+2y=10 → x+y=5: sufficient",
        "(1) x−y=3: many (x,y) → sum varies → insufficient",
        "Don't demand individual x,y if the sum suffices"
      ],
      "example": {
        "problem": "x+y? (1) x−y=3 (2) 2x+2y=10",
        "steps": [
          "(1) sum not fixed: INSUFFICIENT",
          "(2) ÷2 → x+y=5: SUFFICIENT",
          "Answer B"
        ],
        "answer": "B"
      },
      "traps": [
        "Thinking you must find x and y separately",
        "Combining when (2) already suffices alone"
      ],
      "solveSteps": [
        "1. Identify the exact target expression",
        "2. Can each statement pin it down?",
        "3. AD / BCE"
      ]
    }
  },
  "106": {
    "hint": "Is x>0? (1) x²>0 only says x≠0 (±). (2) x³>0 ⇒ x>0 (odd power keeps sign). Answer B.",
    "theory": {
      "title": "Data Sufficiency — Sign via Powers",
      "icon": "📊",
      "summary": "Even powers destroy sign information; odd powers preserve it. x²>0 ⇒ x≠0 only; x³>0 ⇒ x>0.",
      "keyFacts": [
        "x² > 0 → x ≠ 0 (could be + or −): insufficient",
        "x³ > 0 → x > 0 (odd power keeps sign): sufficient",
        "Even power = no sign info",
        "Odd power = same sign as x"
      ],
      "example": {
        "problem": "Is x>0? (1) x²>0 (2) x³>0",
        "steps": [
          "(1) x=±2 both satisfy: INSUFFICIENT",
          "(2) x³>0 only if x>0: SUFFICIENT",
          "Answer B"
        ],
        "answer": "B"
      },
      "traps": [
        "Reading x²>0 as x>0",
        "Thinking both are needed"
      ],
      "solveSteps": [
        "1. Even power → sign unknown",
        "2. Odd power → sign of x",
        "3. Decide sufficiency"
      ]
    }
  },
  "107": {
    "hint": "Even n? (1) n² even ⇒ n even (odd²=odd). (2) n+3 odd ⇒ n even. EACH alone → D.",
    "theory": {
      "title": "Data Sufficiency — Parity Logic",
      "icon": "📊",
      "summary": "odd² is odd, so n² even forces n even. n+odd = odd forces n even. Both statements independently nail parity → answer D.",
      "keyFacts": [
        "n² even ⇒ n even (contrapositive of odd²=odd)",
        "n + 3 odd ⇒ n even",
        "Each statement alone is sufficient → D",
        "D requires BOTH alone work"
      ],
      "example": {
        "problem": "Is n even? (1) n² even (2) n+3 odd",
        "steps": [
          "(1) odd²=odd, so n² even → n even: SUFF",
          "(2) odd−3=even → n even: SUFF",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Answering C (each works alone, so it's D)",
        "Thinking n² even allows odd n"
      ],
      "solveSteps": [
        "1. Test (1) parity logic alone",
        "2. Test (2) parity logic alone",
        "3. Both alone → D"
      ]
    }
  },
  "108": {
    "hint": "Div by 4? (1) div by 2 → could be 2,6 (no): insufficient. (2) div by 8 ⇒ div by 4. Answer B.",
    "theory": {
      "title": "Data Sufficiency — Divisibility Implications",
      "icon": "📊",
      "summary": "Divisible by 8 ⇒ divisible by 4 (8 contains 4). Divisible by 2 does NOT imply divisible by 4 (6 is a counterexample).",
      "keyFacts": [
        "8 = 4·2 → multiple of 8 is a multiple of 4",
        "Multiple of 2: 2,6,10 are NOT multiples of 4 → insufficient",
        "Counterexample kills sufficiency",
        "Stronger divisor implies weaker"
      ],
      "example": {
        "problem": "n div by 4? (1) div by 2 (2) div by 8",
        "steps": [
          "(1) n=6 div by 2, not 4: INSUFFICIENT",
          "(2) div by 8 ⇒ div by 4: SUFFICIENT",
          "Answer B"
        ],
        "answer": "B"
      },
      "traps": [
        "Assuming even ⇒ divisible by 4",
        "Overlooking that 8 implies 4"
      ],
      "solveSteps": [
        "1. Try a counterexample for the weak statement",
        "2. Check the strong statement's implication",
        "3. AD / BCE"
      ]
    }
  },
  "109": {
    "hint": "Discount% needs BOTH price and discount amount. (1) sale only, (2) discount only → together C.",
    "theory": {
      "title": "Data Sufficiency — Two Pieces Needed",
      "icon": "📊",
      "summary": "Discount% = discount / original. You need original price AND discount; each statement supplies only one piece → both together (C).",
      "keyFacts": [
        "Discount% = (discount / original)·100",
        "(1) sale price 80 only — original unknown",
        "(2) discount 20 only — original unknown",
        "Together: original = 80+20 = 100 → 20%"
      ],
      "example": {
        "problem": "Discount%? (1) sale $80 (2) discount $20",
        "steps": [
          "(1) alone: original unknown — INSUFF",
          "(2) alone: original unknown — INSUFF",
          "Together: P=100, 20/100 → 20% → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking (1) alone gives % (no original)",
        "Picking E though together they work"
      ],
      "solveSteps": [
        "1. List what the % formula needs",
        "2. Each statement supplies one input",
        "3. Combine → C if together sufficient"
      ]
    }
  },
  "110": {
    "hint": "x=5? (1) x²=25 → x=±5. (2) x>0 alone says nothing specific. Together x=5 → C.",
    "theory": {
      "title": "Data Sufficiency — Quadratic Gives Two Roots",
      "icon": "📊",
      "summary": "x²=25 yields x=±5 (two values) → not sufficient alone. The sign statement removes the negative; together they pin x=5.",
      "keyFacts": [
        "x² = 25 → x = 5 OR −5: insufficient",
        "x > 0 alone: any positive: insufficient",
        "Together: x=5 only → sufficient → C",
        "Square roots in DS almost always give ±"
      ],
      "example": {
        "problem": "Is x=5? (1) x²=25 (2) x>0",
        "steps": [
          "(1) x=±5: INSUFFICIENT",
          "(2) x>0: INSUFFICIENT",
          "Together → x=5 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Taking x²=25 as x=5 only (forgot −5)",
        "Choosing A by ignoring the negative root"
      ],
      "solveSteps": [
        "1. Solve (1) — note ± roots",
        "2. (2) narrows sign",
        "3. Combine → C"
      ]
    }
  },
  "111": {
    "hint": "Angle needs 2 of 3 angles. Each statement gives only one → neither alone; together C.",
    "theory": {
      "title": "DS — Triangle Angle Needs Two Knowns",
      "icon": "📊",
      "summary": "Angle A = 180 − B − C. One angle alone leaves A undetermined; both angles together fix it → C.",
      "keyFacts": [
        "A = 180 − B − C (need both B and C)",
        "(1) B=50 only: A unknown",
        "(2) C=70 only: A unknown",
        "Together: A = 60 → C"
      ],
      "example": {
        "problem": "Angle A? (1) B=50 (2) C=70",
        "steps": [
          "(1) alone: INSUFFICIENT",
          "(2) alone: INSUFFICIENT",
          "Together: 180−50−70=60 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Picking D (one angle is never enough)",
        "Assuming an unstated isosceles/equilateral"
      ],
      "solveSteps": [
        "1. Note A needs the other two angles",
        "2. Each alone gives one → insufficient",
        "3. Together sufficient → C"
      ]
    }
  },
  "112": {
    "hint": "Area=LW. (1) L+W=10, (2) L²+W²=50. 2LW=(L+W)²−(L²+W²) → LW from BOTH → C.",
    "theory": {
      "title": "DS — Recover a Product via the Square Identity",
      "icon": "📊",
      "summary": "Neither perimeter nor diagonal alone gives area, but together (L+W)²−(L²+W²)=2LW yields the product → C.",
      "keyFacts": [
        "(1) L+W=10 alone: LW not fixed",
        "(2) L²+W²=50 alone: LW not fixed",
        "(L+W)² = L²+2LW+W² → 100 = 50 + 2LW",
        "LW = 25 (area) → C"
      ],
      "example": {
        "problem": "Rect area? (1) perim 20 (2) diag √50",
        "steps": [
          "(1) L+W=10; (2) L²+W²=50",
          "2LW = 100−50 = 50",
          "LW=25 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking perimeter alone gives area",
        "Choosing E despite the identity working"
      ],
      "solveSteps": [
        "1. Each alone: area not determined",
        "2. Combine via (L+W)²−(L²+W²)=2LW",
        "3. Sufficient together → C"
      ]
    }
  },
  "113": {
    "hint": "Diameter OR circumference each → r=5 → area. Each alone sufficient → D.",
    "theory": {
      "title": "DS — Each Statement Independently Fixes the Circle",
      "icon": "📊",
      "summary": "Any single circle measure (d, C, or r) determines all others, hence the area. Two independent sufficient statements → D.",
      "keyFacts": [
        "d=10 → r=5 → A=25π",
        "C=10π → r=5 → A=25π",
        "Either alone is enough",
        "Two-alone-sufficient → answer D"
      ],
      "example": {
        "problem": "Circle area? (1) d=10 (2) C=10π",
        "steps": [
          "(1) r=5 → 25π: SUFFICIENT",
          "(2) r=5 → 25π: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Picking C (each works alone → D, not C)",
        "Doubting that C alone gives r"
      ],
      "solveSteps": [
        "1. Does (1) alone fix r? Yes",
        "2. Does (2) alone fix r? Yes",
        "3. Both alone → D"
      ]
    }
  },
  "114": {
    "hint": "Average = sum/3. (1) sum=30 → avg 10 alone. (2) one value only. Answer A.",
    "theory": {
      "title": "DS — Mean Needs the Sum, Not Each Value",
      "icon": "📊",
      "summary": "Average of n values needs only their total. A statement giving the sum is sufficient; one individual value is not.",
      "keyFacts": [
        "avg = (x+y+z)/3",
        "(1) sum=30 → avg=10: SUFFICIENT",
        "(2) x=10 only: y,z unknown: INSUFFICIENT",
        "Sum suffices; pieces don't"
      ],
      "example": {
        "problem": "Avg of x,y,z? (1) sum=30 (2) x=10",
        "steps": [
          "(1) 30/3 = 10: SUFFICIENT",
          "(2) one value: INSUFFICIENT",
          "Answer A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking you need each of x,y,z",
        "Calling (2) helpful enough"
      ],
      "solveSteps": [
        "1. Mean needs the sum",
        "2. (1) gives sum → sufficient",
        "3. (2) partial → A"
      ]
    }
  },
  "115": {
    "hint": "Speed = dist/time. Each gives one of the two → neither alone; together C.",
    "theory": {
      "title": "DS — Rate Requires Both Distance and Time",
      "icon": "📊",
      "summary": "speed = distance/time. Time alone or distance alone can't give speed; both together → C.",
      "keyFacts": [
        "speed = d / t (need both)",
        "(1) t=4 only: speed unknown",
        "(2) d=240 only: speed unknown",
        "Together 240/4 = 60 mph → C"
      ],
      "example": {
        "problem": "Speed? (1) 4 hr (2) 240 mi",
        "steps": [
          "(1) alone: INSUFFICIENT",
          "(2) alone: INSUFFICIENT",
          "240/4 = 60 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Assuming a 'typical' speed",
        "Picking D"
      ],
      "solveSteps": [
        "1. speed needs d and t",
        "2. Each alone gives one",
        "3. Together → C"
      ]
    }
  },
  "116": {
    "hint": "New% = acid / new total. Need acid amount (orig volume) AND water added → C.",
    "theory": {
      "title": "DS — Dilution Needs Both Volumes",
      "icon": "📊",
      "summary": "New concentration = (original acid) / (original + added). You need original volume (to get acid) and the water added → both → C.",
      "keyFacts": [
        "acid = 0.30 · original volume",
        "new% = acid / (original + water)",
        "(1) original 50 only — water unknown",
        "(2) water 25 only — acid amount unknown; together 15/75=20% → C"
      ],
      "example": {
        "problem": "New % acid? (1) orig 50L (2) +25L water",
        "steps": [
          "(1) alone: final total unknown",
          "(2) alone: acid quantity unknown",
          "Together: 15/75 = 20% → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking 30% lets you skip volumes",
        "Choosing A or B"
      ],
      "solveSteps": [
        "1. Identify acid amount needs original volume",
        "2. New total needs added water",
        "3. Both → C"
      ]
    }
  },
  "117": {
    "hint": "Both 5x=25 and x−5=0 give x=5 uniquely. Each alone sufficient → D.",
    "theory": {
      "title": "DS — Two Independent Equations, Same Unknown",
      "icon": "📊",
      "summary": "Each statement is its own solvable one-variable equation giving x=5. Two-alone-sufficient → D.",
      "keyFacts": [
        "(1) 5x=25 → x=5: sufficient",
        "(2) x−5=0 → x=5: sufficient",
        "They agree, but agreement isn't required for D",
        "Each alone solves → D"
      ],
      "example": {
        "problem": "x? (1) 5x=25 (2) x−5=0",
        "steps": [
          "(1) x=5: SUFFICIENT",
          "(2) x=5: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Picking C (redundant, but each alone works → D)",
        "Overthinking identical answers"
      ],
      "solveSteps": [
        "1. Solve (1) alone",
        "2. Solve (2) alone",
        "3. Both unique → D"
      ]
    }
  },
  "118": {
    "hint": "Find a counterexample. 23 (prime) vs 25 (not) in 20–30; odd 21 vs 23 → E.",
    "theory": {
      "title": "DS — Disprove Sufficiency with Counterexamples",
      "icon": "📊",
      "summary": "To show a statement insufficient for a yes/no, exhibit one YES and one NO case. Both together still split → E.",
      "keyFacts": [
        "(1) 20–30: 23 prime, 25 not → INSUFFICIENT",
        "(2) odd: 23 prime, 21 not → INSUFFICIENT",
        "Together odd in 20–30: 23 prime, 25 not → still split",
        "Mixed yes/no even combined → E"
      ],
      "example": {
        "problem": "N prime? (1) 20<N<30 (2) N odd",
        "steps": [
          "(1) 23 vs 25: both possible",
          "(2) 23 vs 21: both possible",
          "Together 23 vs 25 → E"
        ],
        "answer": "E"
      },
      "traps": [
        "Assuming a range narrows to one prime",
        "Stopping at C without testing combined"
      ],
      "solveSteps": [
        "1. Seek yes & no example for (1)",
        "2. Same for (2)",
        "3. Test combined; still split → E"
      ]
    }
  },
  "119": {
    "hint": "xy>0 ? (1) x+y>0 allows xy<0 (5,−1). (2) xyz>0 & z>0 ⇒ xy>0. Answer B.",
    "theory": {
      "title": "DS — Sign of a Product",
      "icon": "📊",
      "summary": "Sum sign doesn't fix product sign. But dividing a positive product by a positive factor keeps it positive: xyz>0, z>0 ⇒ xy>0.",
      "keyFacts": [
        "(1) x+y>0: (5,−1)→xy<0, (2,3)→xy>0: INSUFFICIENT",
        "(2) xyz>0 and z>0 → xy = xyz/z > 0: SUFFICIENT",
        "Sum sign ≠ product sign",
        "Divide out a known-positive factor"
      ],
      "example": {
        "problem": "xy>0? (1) x+y>0 (2) xyz>0,z>0",
        "steps": [
          "(1) counterexamples → INSUFFICIENT",
          "(2) xy = xyz/z > 0 → SUFFICIENT",
          "Answer B"
        ],
        "answer": "B"
      },
      "traps": [
        "Reading x+y>0 as xy>0",
        "Missing that z>0 lets you isolate xy"
      ],
      "solveSteps": [
        "1. Counterexample-test (1)",
        "2. Use z>0 to deduce xy sign in (2)",
        "3. Decide"
      ]
    }
  },
  "120": {
    "hint": "Through origin? slope alone no; point alone no; together y=2x → yes. C.",
    "theory": {
      "title": "DS — Pin a Line with Slope + a Point",
      "icon": "📊",
      "summary": "A line needs slope AND a point to be unique. Slope 2 through (3,6) → y=2x, which passes through (0,0) → C.",
      "keyFacts": [
        "(1) slope 2 only: infinitely many parallel lines",
        "(2) point (3,6) only: infinitely many slopes",
        "Together: y−6=2(x−3) → y=2x → through origin",
        "Unique line → answer C"
      ],
      "example": {
        "problem": "Through origin? (1) slope 2 (2) thru (3,6)",
        "steps": [
          "Each alone: INSUFFICIENT",
          "Together: y=2x",
          "(0,0) on it → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking a point alone determines the line",
        "Not finishing the y=2x check"
      ],
      "solveSteps": [
        "1. Slope alone / point alone insufficient",
        "2. Combine → line equation",
        "3. Test origin → C"
      ]
    }
  },
  "121": {
    "hint": "Range = max − min. Need BOTH extremes; each alone gives one → C.",
    "theory": {
      "title": "DS — Range Needs Both Extremes",
      "icon": "📊",
      "summary": "Range = max − min. A single extreme is not enough; both together → C.",
      "keyFacts": [
        "Range = max − min",
        "(1) max=80 only: min unknown",
        "(2) min=12 only: max unknown",
        "Together 80−12=68 → C"
      ],
      "example": {
        "problem": "Range of 7? (1) max=80 (2) min=12",
        "steps": [
          "(1) alone: INSUFFICIENT",
          "(2) alone: INSUFFICIENT",
          "80−12=68 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking the other 5 numbers matter (they don't for range)",
        "Picking D"
      ],
      "solveSteps": [
        "1. Range needs max and min",
        "2. Each gives one extreme",
        "3. Together → C"
      ]
    }
  },
  "122": {
    "hint": "P(red) needs the RATIO, not the count. (2) 2:1 → 2/3 alone. (1) count only. Answer B.",
    "theory": {
      "title": "DS — Probability Needs a Ratio, Not a Count",
      "icon": "📊",
      "summary": "P(red)=red/total. The number of reds alone is useless without blue; a ratio fixes the probability directly.",
      "keyFacts": [
        "P(red) = red/(red+blue)",
        "(1) red=8 only: total unknown — INSUFFICIENT",
        "(2) red = 2·blue → P = 2/3 regardless of size — SUFFICIENT",
        "Ratios determine probabilities; raw counts often don't"
      ],
      "example": {
        "problem": "P(red)? (1) red=8 (2) red=2·blue",
        "steps": [
          "(1) total unknown: INSUFFICIENT",
          "(2) 2:1 → 2/3: SUFFICIENT",
          "Answer B"
        ],
        "answer": "B"
      },
      "traps": [
        "Thinking 8 reds is enough",
        "Needing absolute counts when a ratio suffices"
      ],
      "solveSteps": [
        "1. P needs red:total relation",
        "2. Count alone misses total",
        "3. Ratio gives P → B"
      ]
    }
  },
  "123": {
    "hint": "John's age needs sister's age AND the relation. Each alone misses one → C.",
    "theory": {
      "title": "DS — Age Problem Needs Relation + Anchor",
      "icon": "📊",
      "summary": "A ratio/relation needs a concrete anchor value to pin an age. The relation alone or the anchor alone is insufficient; together → C.",
      "keyFacts": [
        "(1) relation only (no sister's age): can't fix John",
        "(2) sister now 10 only: no relation to John",
        "Together: 5yr ago sister 5 → John 10 then → 15 now",
        "Relation + anchor → unique"
      ],
      "example": {
        "problem": "John's age? (1) 5yr ago John=2×sister (2) sister now 10",
        "steps": [
          "Each alone: INSUFFICIENT",
          "Sister 5yr ago = 5; John then 10",
          "John now 15 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking the relation alone solves it",
        "Not shifting both ages by 5 years"
      ],
      "solveSteps": [
        "1. Relation alone underdetermined",
        "2. Anchor alone underdetermined",
        "3. Combine, shift years → C"
      ]
    }
  },
  "124": {
    "hint": "2^x·3^y needs both x and y. Each statement gives one → C.",
    "theory": {
      "title": "DS — Expression with Two Independent Unknowns",
      "icon": "📊",
      "summary": "2^x·3^y has two free variables. Fixing only x or only y leaves it variable; both → C.",
      "keyFacts": [
        "Two independent unknowns x and y",
        "(1) x=2 only: y free",
        "(2) y=3 only: x free",
        "Together 4·27=108 → C"
      ],
      "example": {
        "problem": "2^x·3^y? (1) x=2 (2) y=3",
        "steps": [
          "(1) alone: INSUFFICIENT",
          "(2) alone: INSUFFICIENT",
          "4·27=108 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Assuming a default for the missing variable",
        "Picking A or B"
      ],
      "solveSteps": [
        "1. Count independent unknowns (2)",
        "2. Each statement fixes one",
        "3. Both needed → C"
      ]
    }
  },
  "125": {
    "hint": "(a+b)/c needs numerator AND denominator. Each gives one → C.",
    "theory": {
      "title": "DS — Fraction Needs Numerator and Denominator",
      "icon": "📊",
      "summary": "A quotient requires both its top and bottom. One statement gives a+b, the other c; only together is the value fixed → C.",
      "keyFacts": [
        "Value = (a+b)/c",
        "(1) a+b=12 only: c unknown",
        "(2) c=4 only: a+b unknown",
        "Together 12/4=3 → C"
      ],
      "example": {
        "problem": "(a+b)/c? (1) a+b=12 (2) c=4",
        "steps": [
          "Each alone: INSUFFICIENT",
          "12/4 = 3",
          "→ C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking a+b alone determines the ratio",
        "Dividing by an assumed c"
      ],
      "solveSteps": [
        "1. Need numerator and denominator",
        "2. Each supplies one",
        "3. Together → C"
      ]
    }
  },
  "126": {
    "hint": "Work-rate: 1/A = 1/4 − 1/6. Need combined time AND Bob's time → C.",
    "theory": {
      "title": "DS — Work Rates Add",
      "icon": "📊",
      "summary": "Rates add: 1/together = 1/A + 1/B. Knowing the combined time and one solo time isolates the other → C.",
      "keyFacts": [
        "1/4 = 1/A + 1/B",
        "(1) combined 4h only: A,B both unknown",
        "(2) Bob 6h only: combined unknown",
        "Together: 1/A = 1/4 − 1/6 = 1/12 → A=12 → C"
      ],
      "example": {
        "problem": "Alice alone? (1) together 4h (2) Bob 6h",
        "steps": [
          "Each alone: INSUFFICIENT",
          "1/A = 1/4 − 1/6 = 1/12",
          "A = 12 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Adding times (4+6) instead of rates",
        "Picking A or B"
      ],
      "solveSteps": [
        "1. Write 1/together = 1/A + 1/B",
        "2. Need two of three to isolate A",
        "3. Both → C"
      ]
    }
  },
  "127": {
    "hint": "Right? (1) AB²+BC²=AC² IS the Pythagorean converse → right at B: sufficient. (2) isosceles only. A.",
    "theory": {
      "title": "DS — Pythagorean Converse Proves Right Angle",
      "icon": "📊",
      "summary": "If the sides satisfy a²+b²=c², the triangle is right (converse of Pythagoras) — sufficient. Equal sides only means isosceles, not right.",
      "keyFacts": [
        "(1) AB²+BC²=AC² → right angle at B: SUFFICIENT",
        "(2) AB=BC → isosceles, may or may not be right: INSUFFICIENT",
        "Converse of Pythagoras is a valid sufficiency tool",
        "One sufficient, one not → A"
      ],
      "example": {
        "problem": "Right triangle? (1) AB²+BC²=AC² (2) AB=BC",
        "steps": [
          "(1) Pythagorean converse → right: SUFFICIENT",
          "(2) isosceles only: INSUFFICIENT",
          "Answer A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking isosceles implies right",
        "Doubting the converse holds"
      ],
      "solveSteps": [
        "1. (1): does it match a²+b²=c²? → right",
        "2. (2): equal sides ≠ right",
        "3. A"
      ]
    }
  },
  "128": {
    "hint": "60% female → males are 40%. (1) 30 males =40% → total 75. (2) 45 fem=60% → 75. Each → D.",
    "theory": {
      "title": "DS — Known Percent Lets One Count Give the Total",
      "icon": "📊",
      "summary": "With the percentage fixed, ANY single subgroup count back-solves the total. Both statements independently do this → D.",
      "keyFacts": [
        "Female 60% → male 40%",
        "(1) 30 male = 40% → total 75: SUFFICIENT",
        "(2) 45 female = 60% → total 75: SUFFICIENT",
        "Each alone fixes total → D"
      ],
      "example": {
        "problem": "Total? 60% female. (1) 30 male (2) 45 female",
        "steps": [
          "(1) 30/0.40 = 75: SUFFICIENT",
          "(2) 45/0.60 = 75: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Picking C (each works alone → D)",
        "Forgetting male share = 100−60"
      ],
      "solveSteps": [
        "1. Use the fixed percent",
        "2. Each count back-solves total",
        "3. Both alone → D"
      ]
    }
  },
  "129": {
    "hint": "x from x+y=7 needs y. Each alone gives one equation/value → together C.",
    "theory": {
      "title": "DS — Two Unknowns Need Two Facts",
      "icon": "📊",
      "summary": "One equation in x and y can't fix x; pairing it with y's value does → C.",
      "keyFacts": [
        "(1) x+y=7: one equation, two unknowns",
        "(2) y=3 only: x free",
        "Together x = 7−3 = 4",
        "2 unknowns → need 2 independent facts"
      ],
      "example": {
        "problem": "x? (1) x+y=7 (2) y=3",
        "steps": [
          "Each alone: INSUFFICIENT",
          "x = 7 − 3 = 4",
          "→ C"
        ],
        "answer": "C"
      },
      "traps": [
        "Treating x+y=7 as giving x",
        "Picking A"
      ],
      "solveSteps": [
        "1. Count unknowns vs equations",
        "2. Need 2 independent facts",
        "3. Together → C"
      ]
    }
  },
  "130": {
    "hint": "Square needs equal sides AND right angles. (1)=rhombus, (2)=rectangle; together → square. C.",
    "theory": {
      "title": "DS — Square = Rhombus + Rectangle",
      "icon": "📊",
      "summary": "Equal sides alone → rhombus (not necessarily square). Right angles alone → rectangle. Both conditions together force a square → C.",
      "keyFacts": [
        "(1) 4 equal sides → rhombus (could be non-square)",
        "(2) 4 right angles → rectangle (could be non-square)",
        "Square = equilateral AND equiangular",
        "Both together → square → C"
      ],
      "example": {
        "problem": "Square? (1) sides equal (2) angles 90°",
        "steps": [
          "(1) rhombus possible: INSUFFICIENT",
          "(2) rectangle possible: INSUFFICIENT",
          "Together → square → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking equal sides ⇒ square",
        "Thinking right angles ⇒ square"
      ],
      "solveSteps": [
        "1. Equal sides → rhombus only",
        "2. Right angles → rectangle only",
        "3. Both → square → C"
      ]
    }
  },
  "131": {
    "hint": "6 = 2·3. Need a factor of 2 AND a factor of 3. (1) gives 3 only, (2) gives 2 only → C.",
    "theory": {
      "title": "DS — Divisibility Needs ALL Prime Factors",
      "icon": "📊",
      "summary": "To prove xy divisible by 6 you must guarantee both prime factors 2 and 3. One statement supplies one prime; the other supplies the other.",
      "keyFacts": [
        "6 = 2 × 3 — both primes required",
        "(1) 3|x guarantees the 3 but says nothing about a factor of 2",
        "(2) y even guarantees the 2 but says nothing about a factor of 3",
        "Together: 3 from x, 2 from y → 6 | xy"
      ],
      "example": {
        "problem": "x,y positive ints, is 6|xy? (1) 3|x (2) y even",
        "steps": [
          "(1) x=3,y=1 → xy=3 not div by 6; x=3,y=2 → 6 yes: NOT sufficient",
          "(2) x=1,y=2 → xy=2 no; x=3,y=2 → 6 yes: NOT sufficient",
          "Together x has 3, y has 2 → product has 2·3 → ALWAYS divisible: C"
        ],
        "answer": "C"
      },
      "traps": [
        "Picking A because '3 is half of 6' — still missing the factor 2"
      ],
      "solveSteps": [
        "1. Factor the divisor into primes (6 → 2,3)",
        "2. Check which prime each statement guarantees",
        "3. Sufficient only when all primes covered → AD/BCE → C"
      ]
    }
  },
  "132": {
    "hint": "Two unknowns, one equation each → neither alone. System a+b=5, 2a+b=8 solves uniquely → C.",
    "theory": {
      "title": "DS — Linear System for an Expression",
      "icon": "📊",
      "summary": "A single linear equation in two unknowns is insufficient. Two independent equations pin both variables, so any expression of them is determined.",
      "keyFacts": [
        "(1) a+b=5 alone: infinitely many (a,b) → insufficient",
        "(2) 2a+b=8 alone: infinitely many → insufficient",
        "Two independent equations → unique a,b",
        "Subtract: (2)−(1) → a=3, then b=2"
      ],
      "example": {
        "problem": "Value of 3a+2b? (1) a+b=5 (2) 2a+b=8",
        "steps": [
          "(1)−(2): subtract to eliminate b → a=3",
          "Back-sub a=3 into a+b=5 → b=2",
          "3a+2b = 9+4 = 13 → both needed: C"
        ],
        "answer": "C"
      },
      "traps": [
        "Choosing E thinking the expression can't be isolated — solve the system first"
      ],
      "solveSteps": [
        "1. Count unknowns vs independent equations per statement",
        "2. One eq / two unknowns alone = insufficient",
        "3. Two independent eqs → solve → C"
      ]
    }
  },
  "133": {
    "hint": "Current = (downstream − upstream)/2. Formula needs BOTH speeds → C.",
    "theory": {
      "title": "DS — Stream-Speed Formula Needs Both Terms",
      "icon": "📊",
      "summary": "Upstream = boat−current, downstream = boat+current. Current = (S₂−S₁)/2 requires both the upstream and downstream speeds.",
      "keyFacts": [
        "Upstream S₁ = b − c, Downstream S₂ = b + c",
        "Subtracting: S₂ − S₁ = 2c → c = (S₂−S₁)/2",
        "(1) S₁=8 only: c unknown without S₂",
        "(2) S₂=12 only: c unknown without S₁"
      ],
      "example": {
        "problem": "Current speed? (1) S₁=8 (2) S₂=12",
        "steps": [
          "(1) alone: c = (S₂−8)/2, S₂ unknown → insufficient",
          "(2) alone: c = (12−S₁)/2, S₁ unknown → insufficient",
          "Together: c = (12−8)/2 = 2 mph → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Assuming boat's still-water speed is known — it isn't given"
      ],
      "solveSteps": [
        "1. Write upstream/downstream as b−c, b+c",
        "2. Identify which variables each statement fixes",
        "3. Need both S₁,S₂ for c → C"
      ]
    }
  },
  "134": {
    "hint": "Distance needs BOTH endpoints. One point alone fixes nothing → C.",
    "theory": {
      "title": "DS — Distance Requires Two Points",
      "icon": "📊",
      "summary": "The distance formula needs coordinates of both points. Knowing only one endpoint leaves the other free, so distance is undetermined.",
      "keyFacts": [
        "d = √((x₂−x₁)² + (y₂−y₁)²)",
        "(1) P=(2,3) alone: Q anywhere → insufficient",
        "(2) Q=(5,7) alone: P anywhere → insufficient",
        "Both points → single value"
      ],
      "example": {
        "problem": "Distance PQ? (1) P=(2,3) (2) Q=(5,7)",
        "steps": [
          "(1) alone: Q free → distance varies → insufficient",
          "(2) alone: P free → insufficient",
          "Together: √(3²+4²) = 5 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking one coordinate pair plus 'a line' is enough — no line given"
      ],
      "solveSteps": [
        "1. Distance formula needs 4 coordinates",
        "2. Each statement gives only 2",
        "3. Both required → C"
      ]
    }
  },
  "135": {
    "hint": "Probability needs a RATIO, not raw counts. Ratio 3:2 alone → P=3/5 → B.",
    "theory": {
      "title": "DS — Probability From Ratio, Not Count",
      "icon": "📊",
      "summary": "P(red) = red/total. A raw count of reds without the total is useless; a part-to-part ratio fixes the probability directly.",
      "keyFacts": [
        "(1) 6 red, total unknown → P could be anything → insufficient",
        "(2) red:blue = 3:2 → P(red) = 3/(3+2) = 3/5",
        "Ratio converts part:part → part/whole",
        "Absolute counts need the total to form a probability"
      ],
      "example": {
        "problem": "P(red)? (1) 6 red (2) red:blue = 3:2",
        "steps": [
          "(1) 6 red of 10 → 0.6, of 100 → 0.06: NOT sufficient",
          "(2) 3:2 → red fraction = 3/5 regardless of size: SUFFICIENT",
          "Only (2) → B"
        ],
        "answer": "B"
      },
      "traps": [
        "Demanding exact counts when a ratio already determines probability"
      ],
      "solveSteps": [
        "1. P = favorable/total",
        "2. Count alone w/o total = insufficient",
        "3. Ratio → fraction directly → B"
      ]
    }
  },
  "136": {
    "hint": "Each is a linear equation in one unknown → each solves x=15 alone → D.",
    "theory": {
      "title": "DS — Each Statement Solves Alone",
      "icon": "📊",
      "summary": "Any single linear equation with one unknown yields a unique value. When both do so independently, the answer is D.",
      "keyFacts": [
        "(1) 0.5x = 7.5 → x = 15: sufficient",
        "(2) x − 5 = 10 → x = 15: sufficient",
        "Independent sufficiency on both → D",
        "Equal answers is a coincidence — D depends on each being sufficient, not on matching"
      ],
      "example": {
        "problem": "Value of x? (1) 0.5x=7.5 (2) x−5=10",
        "steps": [
          "(1) divide by 0.5 → x=15: SUFFICIENT",
          "(2) add 5 → x=15: SUFFICIENT",
          "Each alone works → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C because both 'agree' — sufficiency is per-statement, don't combine"
      ],
      "solveSteps": [
        "1. Solve (1) alone — unique?",
        "2. Solve (2) alone — unique?",
        "3. Both unique → D (never average them)"
      ]
    }
  },
  "137": {
    "hint": "x²−y² = (x+y)(x−y). Need BOTH factors. (1) x−y, (2) x+y → C.",
    "theory": {
      "title": "DS — Factor the Target Expression",
      "icon": "📊",
      "summary": "Don't solve for x and y separately. Factor x²−y² into (x+y)(x−y); each statement supplies one factor, so together the product is fixed.",
      "keyFacts": [
        "x² − y² = (x+y)(x−y)",
        "(1) x−y=4 alone: x+y unknown → insufficient",
        "(2) x+y=10 alone: x−y unknown → insufficient",
        "Product = 10 × 4 = 40 — no need for x,y individually"
      ],
      "example": {
        "problem": "x²−y²? (1) x−y=4 (2) x+y=10",
        "steps": [
          "Recognize x²−y² = (x+y)(x−y)",
          "(1) gives one factor, (2) the other — neither alone",
          "Together: 10·4 = 40 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Trying to solve for x and y individually and giving up → missing the factoring shortcut"
      ],
      "solveSteps": [
        "1. Factor the asked expression first",
        "2. Map each factor to a statement",
        "3. All factors covered → C"
      ]
    }
  },
  "138": {
    "hint": "V = l·w·h. (1) gives lw, (2) gives h → product fixed → C.",
    "theory": {
      "title": "DS — Volume From Grouped Dimensions",
      "icon": "📊",
      "summary": "Volume = length·width·height. You don't need each dimension separately — a product of two plus the third is enough.",
      "keyFacts": [
        "V = lwh",
        "(1) lw=20 alone: h unknown → insufficient",
        "(2) h=5 alone: lw unknown → insufficient",
        "Together V = 20·5 = 100"
      ],
      "example": {
        "problem": "Box volume? (1) l·w=20 (2) h=5",
        "steps": [
          "(1) alone: V = 20h, h free → insufficient",
          "(2) alone: V = 5·lw, lw free → insufficient",
          "Together: 20·5 = 100 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Insisting each of l, w, h must be known individually"
      ],
      "solveSteps": [
        "1. Write V = lwh",
        "2. Group: do the statements jointly cover l·w·h?",
        "3. Yes → C"
      ]
    }
  },
  "139": {
    "hint": "Range and element count do NOT determine SD. Both fail, even together → E.",
    "theory": {
      "title": "DS — Spread ≠ Range or Size",
      "icon": "📊",
      "summary": "Standard deviation measures average distance from the mean. A larger range or a bigger sample says nothing definitive about SD.",
      "keyFacts": [
        "One extreme outlier can give big range but tiny SD for the rest",
        "(1) range S > range T: SD could still be smaller → insufficient",
        "(2) more elements: count is unrelated to spread → insufficient",
        "Together still no link between range/size and SD → E"
      ],
      "example": {
        "problem": "Is SD(S) > SD(T)? (1) range S > range T (2) |S| > |T|",
        "steps": [
          "S={0,0,0,10} big range, low SD; T={4,5,6} small range, comparable SD",
          "Adding elements (2) doesn't constrain spread",
          "No combination forces the inequality → E"
        ],
        "answer": "E"
      },
      "traps": [
        "Treating range as a proxy for standard deviation"
      ],
      "solveSteps": [
        "1. Recall SD depends on every value vs mean",
        "2. Test counterexample for each statement",
        "3. If counterexamples survive both → E"
      ]
    }
  },
  "140": {
    "hint": "Only-math = math − both. Need both numbers; total class size NOT needed → C.",
    "theory": {
      "title": "DS — Set 'Only' Region",
      "icon": "📊",
      "summary": "'Only math' = (take math) − (take both). You need the math total and the overlap; the grand total is irrelevant here.",
      "keyFacts": [
        "Only-math = M − (M∩E)",
        "(1) M=25 alone: overlap unknown → insufficient",
        "(2) both=10 alone: M unknown → insufficient",
        "Together: 25 − 10 = 15 — total students never needed"
      ],
      "example": {
        "problem": "Students taking ONLY math? (1) 25 take math (2) 10 take both",
        "steps": [
          "(1) alone: only-math = 25 − both, both free → insufficient",
          "(2) alone: only-math = M − 10, M free → insufficient",
          "Together: 25 − 10 = 15 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking you need the total class size — the 'only' region doesn't use it"
      ],
      "solveSteps": [
        "1. Write only-X = X − overlap",
        "2. Check each statement supplies a needed term",
        "3. Both terms present → C"
      ]
    }
  },
  "141": {
    "hint": "f(x)=ax+b, two unknowns. (1) gives b, (2) gives a+b → solve a,b → C.",
    "theory": {
      "title": "DS — Determine a Linear Function",
      "icon": "📊",
      "summary": "A linear function ax+b has two parameters. Two independent point-values pin a and b, so f(5) becomes computable.",
      "keyFacts": [
        "(1) f(0)=3 → b=3 only (a free) → insufficient",
        "(2) f(1)=5 → a+b=5 (one eq, two unknowns) → insufficient",
        "Together: b=3, a+b=5 → a=2",
        "f(5) = 2·5 + 3 = 13"
      ],
      "example": {
        "problem": "f(x)=ax+b, f(5)? (1) f(0)=3 (2) f(1)=5",
        "steps": [
          "(1) → b=3, slope unknown → insufficient",
          "(2) → a+b=5, can't isolate → insufficient",
          "Together → a=2,b=3 → f(5)=13 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking one point determines a line — a slope is still missing"
      ],
      "solveSteps": [
        "1. Count parameters (a,b → need 2 facts)",
        "2. Each statement = one equation",
        "3. Two independent → solve → C"
      ]
    }
  },
  "142": {
    "hint": "x²>y² is sign-blind (counterexample). x−y>0 directly gives x>y → B.",
    "theory": {
      "title": "DS — Squares Lose Sign Information",
      "icon": "📊",
      "summary": "x²>y² only compares magnitudes, not order. x−y>0 is the literal definition of x>y, so it is decisive.",
      "keyFacts": [
        "(1) x=−5,y=2: x²=25>4 but x<y → not sufficient",
        "(2) x−y>0 ⇔ x>y, always → sufficient",
        "Squaring discards sign — never infer order from it",
        "A direct subtraction inequality answers a 'greater than' question"
      ],
      "example": {
        "problem": "Is x>y? (1) x²>y² (2) x−y>0",
        "steps": [
          "(1) try x=−5,y=2 → x²>y² yet x<y: NOT sufficient",
          "(2) x−y>0 → add y → x>y: SUFFICIENT",
          "Only (2) → B"
        ],
        "answer": "B"
      },
      "traps": [
        "Assuming x²>y² ⇒ x>y — fails for negatives"
      ],
      "solveSteps": [
        "1. For order questions, test negative counterexamples on squared facts",
        "2. A direct difference inequality is decisive",
        "3. One works alone → B"
      ]
    }
  },
  "143": {
    "hint": "N²>0 only says N≠0 (±). N+|N|>0 is positive ONLY when N>0 → B.",
    "theory": {
      "title": "DS — N + |N| as a Sign Test",
      "icon": "📊",
      "summary": "N+|N| equals 2N for N>0 and 0 for N≤0. So 'N+|N|>0' is exactly the statement 'N is positive'.",
      "keyFacts": [
        "(1) N²>0 → N≠0, but N could be ±5 → insufficient",
        "If N≤0: |N|=−N so N+|N|=0 (not >0)",
        "If N>0: N+|N|=2N>0",
        "(2) N+|N|>0 ⇔ N>0 → sufficient"
      ],
      "example": {
        "problem": "Is integer N positive? (1) N²>0 (2) N+|N|>0",
        "steps": [
          "(1) N=−3 → N²=9>0 but negative: NOT sufficient",
          "(2) value is 0 for any N≤0, positive only if N>0: SUFFICIENT",
          "Only (2) → B"
        ],
        "answer": "B"
      },
      "traps": [
        "Reading N²>0 as 'N>0' — it only rules out zero"
      ],
      "solveSteps": [
        "1. Split |N| by sign cases",
        "2. Evaluate the expression in each case",
        "3. If only one sign yields the condition → sufficient → B"
      ]
    }
  },
  "144": {
    "hint": "Interest needs rate AND principal (time given as 1yr). (1) rate, (2) principal → C.",
    "theory": {
      "title": "DS — Interest Needs Every Input",
      "icon": "📊",
      "summary": "Final amount = principal·(1+rate)^time. Missing any of principal, rate, or time makes it undetermined.",
      "keyFacts": [
        "A = P(1+r)^t — three inputs",
        "(1) r=5% alone: P unknown → insufficient",
        "(2) P=$1000 alone: r unknown → insufficient",
        "Together (t=1): 1000·1.05 = $1050"
      ],
      "example": {
        "problem": "Balance after 1 year? (1) earns 5% (2) $1000 deposited",
        "steps": [
          "(1) alone: A = P·1.05, P free → insufficient",
          "(2) alone: A = 1000·(1+r), r free → insufficient",
          "Together: 1000·1.05 = 1050 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Assuming a 'standard' rate or principal not stated"
      ],
      "solveSteps": [
        "1. List formula inputs (P, r, t)",
        "2. Mark which statement supplies which",
        "3. All present → C"
      ]
    }
  },
  "145": {
    "hint": "BC longest ⇒ angle A largest; the largest angle of any triangle > 60° (avg). (1) alone → A.",
    "theory": {
      "title": "DS — Largest Side ⇒ Largest Angle ⇒ >60°",
      "icon": "📊",
      "summary": "The angle opposite the longest side is the triangle's largest angle, and the largest of three angles summing to 180° must exceed the 60° average.",
      "keyFacts": [
        "Longest side ⇔ largest opposite angle",
        "Angles sum 180° → average 60° → the max angle > 60° (unless equilateral, then =60, but a strict longest side rules that out)",
        "(1) BC longest → A is the largest → A > 60°: sufficient",
        "(2) B=70° leaves A anywhere (e.g. A=50,C=60) → insufficient"
      ],
      "example": {
        "problem": "Is angle A > 60°? (1) BC longest (2) B=70°",
        "steps": [
          "(1) A opposite BC = largest angle; max of three summing 180 must be >60 → SUFFICIENT",
          "(2) B=70 → A could be 50 (C=60) or 80 → NOT sufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Dismissing (1) as 'no numbers' — the inequality is forced geometrically"
      ],
      "solveSteps": [
        "1. Map side order to angle order",
        "2. Use angle-sum to bound the largest",
        "3. Decisive geometric bound → A"
      ]
    }
  },
  "146": {
    "hint": "x in terms of y (1) needs y; (2) gives y. Neither alone, together x=14 → C.",
    "theory": {
      "title": "DS — Substitution Chain",
      "icon": "📊",
      "summary": "One statement expresses x via y; the other fixes y. Only the combination produces a single x.",
      "keyFacts": [
        "(1) x=3y+2 alone: y free → x undetermined",
        "(2) y=4 alone: nothing about x",
        "Substitute: x = 3·4+2 = 14",
        "Classic C — a relation plus the value it depends on"
      ],
      "example": {
        "problem": "Value of x? (1) x=3y+2 (2) y=4",
        "steps": [
          "(1) alone: x varies with y → insufficient",
          "(2) alone: x not mentioned → insufficient",
          "Together: x = 3(4)+2 = 14 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Calling (1) sufficient because it 'has x ='— it still hides y"
      ],
      "solveSteps": [
        "1. Identify the dependency (x depends on y)",
        "2. Check the other statement resolves that dependency",
        "3. Chain them → C"
      ]
    }
  },
  "147": {
    "hint": "Side OR diagonal each fixes a square fully → area 36 either way → D.",
    "theory": {
      "title": "DS — One Square Measure Fixes All",
      "icon": "📊",
      "summary": "A square has one degree of freedom. Side, diagonal, perimeter or area — any single one determines every other.",
      "keyFacts": [
        "(1) side=6 → area = 6² = 36: sufficient",
        "(2) diagonal=6√2 → side = diag/√2 = 6 → area=36: sufficient",
        "Square fully defined by any single linear measure",
        "Each alone works → D"
      ],
      "example": {
        "problem": "Area of square? (1) side=6 (2) diagonal=6√2",
        "steps": [
          "(1) area = 36 directly: SUFFICIENT",
          "(2) side = 6√2/√2 = 6 → area 36: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Thinking the diagonal needs extra info — diag = side·√2 is fixed"
      ],
      "solveSteps": [
        "1. Square = 1 free parameter",
        "2. Each statement gives one measure → solves all",
        "3. Both independently sufficient → D"
      ]
    }
  },
  "148": {
    "hint": "Average needs the SUM. Extremes alone fail; total 400/5=80 → B.",
    "theory": {
      "title": "DS — Mean Requires the Total",
      "icon": "📊",
      "summary": "Average = sum ÷ count. Knowing only the min and max gives no sum; knowing the total directly gives the mean.",
      "keyFacts": [
        "(1) lowest 60, highest 100: middle three unknown → sum varies → insufficient",
        "(2) total = 400, n=5 → mean = 80: sufficient",
        "Mean depends on the sum, not on extreme values",
        "Only (2) → B"
      ],
      "example": {
        "problem": "Average of 5 scores? (1) min 60, max 100 (2) total 400",
        "steps": [
          "(1) sum could be 60+100+anything → NOT sufficient",
          "(2) mean = 400/5 = 80 → SUFFICIENT",
          "Only (2) → B"
        ],
        "answer": "B"
      },
      "traps": [
        "Averaging min and max as if that were the mean"
      ],
      "solveSteps": [
        "1. Mean = sum/count",
        "2. Does the statement give the sum (or let you derive it)?",
        "3. Only the total-giving one → B"
      ]
    }
  },
  "149": {
    "hint": "Both restate parity: K+1 even ⇒ K odd; K+2 odd ⇒ K odd → each alone → D.",
    "theory": {
      "title": "DS — Parity Restated Two Ways",
      "icon": "📊",
      "summary": "Adding a constant shifts parity predictably. Each statement independently forces K to be odd.",
      "keyFacts": [
        "(1) K+1 even → K = even−1 = odd: sufficient",
        "(2) K+2 odd → K = odd−2 = odd: sufficient",
        "Both pin parity alone → D",
        "Even ± odd = odd; even ± even = even"
      ],
      "example": {
        "problem": "Is integer K odd? (1) K+1 even (2) K+2 odd",
        "steps": [
          "(1) even − 1 → odd: SUFFICIENT",
          "(2) odd − 2 → odd: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C — each parity statement is self-contained"
      ],
      "solveSteps": [
        "1. Translate each statement to K's parity",
        "2. Check sufficiency individually",
        "3. Both decisive → D"
      ]
    }
  },
  "150": {
    "hint": "5 distinct letters → 5! = 120, fully determined. Vowel info is a distractor → A.",
    "theory": {
      "title": "DS — Arrangements Need Only the Count",
      "icon": "📊",
      "summary": "Permutations of distinct letters depend solely on how many there are. Which letters are vowels is irrelevant noise.",
      "keyFacts": [
        "(1) 5 distinct letters → 5! = 120: sufficient",
        "(2) 'two are vowels' gives no length → arrangements unknown: insufficient",
        "Distinct-item arrangements = n!",
        "Vowel/consonant label doesn't change the count"
      ],
      "example": {
        "problem": "Ways to arrange the letters? (1) 5 distinct letters (2) 2 are vowels",
        "steps": [
          "(1) 5 distinct → 5! = 120: SUFFICIENT",
          "(2) no total length → can't count: NOT sufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking the vowel detail must matter — it's an irrelevant-info trap"
      ],
      "solveSteps": [
        "1. Arrangements of n distinct = n!",
        "2. Need the count n only",
        "3. Statement giving n → sufficient → A"
      ]
    }
  },
  "151": {
    "hint": "Median of 5 = the 3rd value (c) — but only once you know c IS the middle. Need order + value → C.",
    "theory": {
      "title": "DS — Median Needs Position AND Value",
      "icon": "📊",
      "summary": "The median of 5 numbers is the 3rd when sorted. You need TWO things: which element sits in the middle, and what its value is.",
      "keyFacts": [
        "Median of 5 distinct = 3rd in sorted order",
        "(1) a<b<c<d<e → c is the middle, but value unknown → insufficient",
        "(2) c=10 → a value, but is c the middle? not stated → insufficient",
        "Together: c is the middle AND c=10 → median=10"
      ],
      "example": {
        "problem": "Median of {a,b,c,d,e}? (1) a<b<c<d<e (2) c=10",
        "steps": [
          "(1) names c as median position, no number → insufficient",
          "(2) c=10 but c could be smallest if unsorted → insufficient",
          "Together: middle = c = 10 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Taking (2) alone — c=10 means nothing until c is shown to be the middle term"
      ],
      "solveSteps": [
        "1. Median of n=5 → need the 3rd sorted value",
        "2. One statement gives position, the other the value",
        "3. Both required → C"
      ]
    }
  },
  "152": {
    "hint": "Length = speed × time. Passing a POINT means distance travelled = train length. Need both → C.",
    "theory": {
      "title": "DS — Train Past a Point = Its Own Length",
      "icon": "📊",
      "summary": "When a train clears a fixed point, the distance it covers equals its own length. Length = speed × time-to-pass — both inputs required.",
      "keyFacts": [
        "Past a point: distance covered = train length",
        "(1) t=10 s alone: speed unknown → length unknown",
        "(2) v=60 mph alone: time-to-pass unknown → length unknown",
        "Together: L = 60 mph × 10 s (convert units) → single value"
      ],
      "example": {
        "problem": "Train length? (1) passes a point in 10 s (2) speed 60 mph",
        "steps": [
          "(1) alone: L = v·10, v free → insufficient",
          "(2) alone: L = 60·t, t free → insufficient",
          "Together: L = 60 mph·(10/3600 h) ≈ 0.167 mi → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Confusing 'pass a point' (distance = length) with 'pass a platform' (distance = length + platform)"
      ],
      "solveSteps": [
        "1. Past a point → covered distance = length",
        "2. L = v·t needs both v and t",
        "3. One each → C"
      ]
    }
  },
  "153": {
    "hint": "Exterior = 180−interior; n = 360/exterior. (1) and (2) each fully determine n → D.",
    "theory": {
      "title": "DS — Regular Polygon: One Angle Fixes n",
      "icon": "📊",
      "summary": "A regular polygon is fully described by any one of: interior angle, exterior angle, or n. Each implies the others.",
      "keyFacts": [
        "Exterior = 180° − interior; n = 360° / exterior",
        "(1) exterior 36° → n = 360/36 = 10: sufficient",
        "(2) interior 144° → exterior 36° → n = 10: sufficient",
        "Each statement alone pins n → D"
      ],
      "example": {
        "problem": "Sides of regular polygon (interior 144°)? (1) exterior 36° (2) interior 144°",
        "steps": [
          "(1) n = 360/36 = 10: SUFFICIENT",
          "(2) ext = 180−144 = 36 → n = 10: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C — the two facts are equivalent restatements, each self-sufficient"
      ],
      "solveSteps": [
        "1. Link interior↔exterior↔n",
        "2. Test each statement alone for n",
        "3. Both sufficient → D"
      ]
    }
  },
  "154": {
    "hint": "|x|=4 → x=±4 (two roots). Sign resolves it. Need both → C.",
    "theory": {
      "title": "DS — Absolute Value Hides a Sign",
      "icon": "📊",
      "summary": "|x|=4 gives two candidates, +4 and −4. A 'is x = 4?' question is undecided until the sign is fixed.",
      "keyFacts": [
        "(1) |x|=4 → x ∈ {4, −4} → can't confirm x=4 → insufficient",
        "(2) x>0 alone: no magnitude → insufficient",
        "Together: x>0 eliminates −4 → x=4 → YES",
        "A definite-value DS needs both magnitude and sign"
      ],
      "example": {
        "problem": "Is x=4? (1) |x|=4 (2) x>0",
        "steps": [
          "(1) x=4 or −4 → answer could be yes or no → insufficient",
          "(2) positive but value unknown → insufficient",
          "Together: positive root of |x|=4 is 4 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Reading |x|=4 as x=4 — drops the negative root"
      ],
      "solveSteps": [
        "1. Split |x|=k into x=k, x=−k",
        "2. Use the other statement to kill one branch",
        "3. One branch left → C"
      ]
    }
  },
  "155": {
    "hint": "C(n,3) needs n; the captain rule changes the formula. Need group size AND the rule → C.",
    "theory": {
      "title": "DS — Combinations Need n and the Constraint",
      "icon": "📊",
      "summary": "Counting teams requires the pool size n and any selection constraint. A constraint without n, or n without the constraint, leaves the count undetermined.",
      "keyFacts": [
        "(1) n=7 alone: C(7,3)=35 — but a captain rule may apply → not the asked count",
        "(2) 'must include captain' alone: no n → can't count",
        "Together: captain fixed, choose 2 from remaining 6 → C(6,2)=15",
        "The constraint changes the formula, not just the number"
      ],
      "example": {
        "problem": "Teams of 3? (1) group has 7 (2) each team must include the captain",
        "steps": [
          "(1) alone: unclear if captain rule applies → ambiguous → insufficient",
          "(2) alone: no group size → insufficient",
          "Together: 1 captain + C(6,2)=15 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Answering C(7,3)=35 from (1) alone, ignoring the constraint in (2)"
      ],
      "solveSteps": [
        "1. Identify pool size n and any forced member",
        "2. Apply constraint before counting",
        "3. Need both pieces → C"
      ]
    }
  },
  "156": {
    "hint": "Joint P(HH) needs per-coin probabilities AND independence. Fairness + independence → C.",
    "theory": {
      "title": "DS — Joint Probability Needs Both Marginals and Independence",
      "icon": "📊",
      "summary": "P(both heads) = P(H₁)·P(H₂) ONLY if the coins are independent. You need the individual probabilities and the independence assumption.",
      "keyFacts": [
        "(1) each fair → P(H)=½ each, but if correlated, P(HH) ≠ ¼ → insufficient",
        "(2) independent, but P(H) per coin unknown (could be biased) → insufficient",
        "Together: ½ · ½ = ¼",
        "Independence alone doesn't give numbers; numbers alone don't give joint"
      ],
      "example": {
        "problem": "P(both heads)? (1) each coin fair (2) coins independent",
        "steps": [
          "(1) fair but possibly linked → joint unknown → insufficient",
          "(2) independent but maybe biased → insufficient",
          "Together: ½·½ = ¼ → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Assuming 'fair' implies independence — it does not"
      ],
      "solveSteps": [
        "1. Joint = product only under independence",
        "2. Need marginals (fair) AND independence",
        "3. Both → C"
      ]
    }
  },
  "157": {
    "hint": "Margin = (price−cost)/price. One number alone gives nothing. Need both → C.",
    "theory": {
      "title": "DS — Margin Needs Cost AND Price",
      "icon": "📊",
      "summary": "Profit margin = (selling − cost) / selling. A single dollar figure can't produce a ratio; you need both endpoints.",
      "keyFacts": [
        "(1) cost $40 alone: price unknown → margin unknown",
        "(2) price $50 alone: cost unknown → margin unknown",
        "Together: (50−40)/50 = 20% (or 25% on cost)",
        "A ratio needs two reference values"
      ],
      "example": {
        "problem": "Profit margin? (1) cost $40 (2) price $50",
        "steps": [
          "(1) alone: margin = (P−40)/P, P free → insufficient",
          "(2) alone: margin = (50−C)/50, C free → insufficient",
          "Together: both fixed → single margin → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking one price 'feels like enough' — a percentage always needs a base"
      ],
      "solveSteps": [
        "1. Margin formula needs cost and price",
        "2. One statement gives each",
        "3. Both → C"
      ]
    }
  },
  "158": {
    "hint": "aₙ = a₁+(n−1)d. Need first term AND common difference → C.",
    "theory": {
      "title": "DS — Arithmetic Term Needs a₁ and d",
      "icon": "📊",
      "summary": "Any term of an arithmetic sequence is a₁ + (n−1)d. Two parameters → need two independent facts.",
      "keyFacts": [
        "(1) a₁=3 alone: d unknown → a₁₀ varies → insufficient",
        "(2) d=4 alone: a₁ unknown → insufficient",
        "Together: a₁₀ = 3 + 9·4 = 39",
        "Two unknowns (a₁, d) need both statements"
      ],
      "example": {
        "problem": "10th term? (1) a₁=3 (2) d=4",
        "steps": [
          "(1) alone: 3 + 9d, d free → insufficient",
          "(2) alone: a₁ + 36, a₁ free → insufficient",
          "Together: 3 + 36 = 39 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking the first term alone defines the sequence — the step d is missing"
      ],
      "solveSteps": [
        "1. aₙ formula has two parameters",
        "2. Each statement gives one",
        "3. Both → C"
      ]
    }
  },
  "159": {
    "hint": "A line's quadrants depend on slope AND intercept. Need both → C.",
    "theory": {
      "title": "DS — Which Quadrants a Line Hits",
      "icon": "📊",
      "summary": "Which quadrants a line passes through is fixed only by its full equation (slope and intercept together). Either alone leaves a family of lines.",
      "keyFacts": [
        "(1) slope 1, intercept free: y=x+5 vs y=x−5 hit different quadrant patterns → insufficient",
        "(2) y-int 2, slope free: vertical-ish vs shallow lines differ → insufficient",
        "Together: y = x + 2 — for x<−2, both x,y<0 → passes QIII → YES",
        "Need the whole equation to trace quadrants"
      ],
      "example": {
        "problem": "Does L pass through QIII? (1) slope 1 (2) y-int 2",
        "steps": [
          "(1) alone: intercept free → can't tell → insufficient",
          "(2) alone: slope free → insufficient",
          "Together: y=x+2; at x=−5 → y=−3 (QIII) → YES → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Assuming a positive y-intercept keeps a line out of QIII — slope can still drag it there"
      ],
      "solveSteps": [
        "1. Quadrant question → need full line equation",
        "2. Slope + intercept together",
        "3. Trace sign of x,y → C"
      ]
    }
  },
  "160": {
    "hint": "12 = 4·3. Div by 4 OR by 6 alone misses a factor. Together gives LCM(4,6)=12 → C.",
    "theory": {
      "title": "DS — Divisible by 12 via Combined Factors",
      "icon": "📊",
      "summary": "12 = 2²·3. Divisibility by 4 gives 2²; by 6 gives 2·3. Neither alone guarantees 2²·3, but together they force it.",
      "keyFacts": [
        "(1) 4|x: x=4 → not div 12; x=12 → yes → insufficient",
        "(2) 6|x: x=6 → not div 12; x=12 → yes → insufficient",
        "Together x divisible by lcm(4,6)=12 → always YES",
        "Note lcm(4,6)=12, NOT 4·6=24 (shared factor 2)"
      ],
      "example": {
        "problem": "Is x divisible by 12? (1) 4|x (2) 6|x",
        "steps": [
          "(1) counterexample x=4 → insufficient",
          "(2) counterexample x=6 → insufficient",
          "Together: x multiple of lcm(4,6)=12 → definite YES → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Computing lcm as 4·6=24 — overlap of the factor 2 makes it 12"
      ],
      "solveSteps": [
        "1. Factor target: 12 = 2²·3",
        "2. Check primes each statement guarantees",
        "3. Combined lcm covers 12 → C"
      ]
    }
  },
  "161": {
    "hint": "Phase the timeline: 2 h fill-only, then net rate. Net = 1/3 − 1/5 = 2/15. Total 4.5 h.",
    "theory": {
      "title": "Work — Inlet With a Mid-Job Drain",
      "icon": "🚰",
      "summary": "Break the job at the moment the situation changes. Before the drain opens, only the inlet works; after, the NET rate (inlet − drain) applies.",
      "keyFacts": [
        "Inlet rate = 1/3 tank/hr; drain rate = 1/5 tank/hr",
        "First 2 h (fill only): 2 × 1/3 = 2/3 filled",
        "Remaining 1/3 at net rate 1/3 − 1/5 = 2/15 per hr",
        "Time for remainder = (1/3)/(2/15) = 2.5 h"
      ],
      "example": {
        "problem": "Fill 1/3 in 3h, drain empties in 5h, drain opens at t=2h until full. Total time?",
        "steps": [
          "Phase 1 (0–2h): filled = 2/3",
          "Phase 2: remaining 1/3 ÷ net (2/15) = 2.5 h",
          "Total = 2 + 2.5 = 4.5 h → B"
        ],
        "answer": "B (4.5 hrs)"
      },
      "traps": [
        "Applying the net rate to the whole job (ignoring the 2 h inlet-only head start)"
      ],
      "solveSteps": [
        "1. Split at the event (drain opens at 2h)",
        "2. Phase 1: inlet only → fraction done",
        "3. Phase 2: remainder ÷ (inlet − drain) → add times"
      ]
    }
  },
  "162": {
    "hint": "Combined rate 1 h, then B+C only. A+B+C=1/2 → 1/2 done in 1h; rest 1/2 ÷ 1/4 = 2h. Total 3h.",
    "theory": {
      "title": "Work — Machine Drops Out Mid-Job",
      "icon": "🚰",
      "summary": "Sum rates while all run, compute work done in that window, then finish the remainder at the reduced combined rate.",
      "keyFacts": [
        "Rates: A=1/4, B=1/6, C=1/12 → A+B+C = 3/12+2/12+1/12 = 1/2 per hr",
        "First 1 h all three: 1/2 of job done",
        "After A breaks: B+C = 2/12+1/12 = 1/4 per hr",
        "Remaining 1/2 ÷ (1/4) = 2 h"
      ],
      "example": {
        "problem": "A,B,C alone in 4,6,12 h; A breaks after 1h. Total time?",
        "steps": [
          "All three 1 h → 1/2 complete",
          "B+C finish remaining 1/2 at 1/4 per hr → 2 h",
          "Total = 1 + 2 = 3 h → D"
        ],
        "answer": "D (3 hr)"
      },
      "traps": [
        "Forgetting to remove A's rate after the breakdown and using 1/2 throughout"
      ],
      "solveSteps": [
        "1. Sum all rates, work the 'all on' window",
        "2. Subtract the lost machine's rate",
        "3. Remainder ÷ new rate, sum the times"
      ]
    }
  },
  "163": {
    "hint": "Without replacement → second prob shrinks. 4/9 × 3/8 = 1/6.",
    "theory": {
      "title": "Probability — Dependent Draws (No Replacement)",
      "icon": "🎲",
      "summary": "Without replacement, the pool changes after each draw. Multiply sequential conditional probabilities — both numerator and denominator drop.",
      "keyFacts": [
        "Total balls = 4+3+2 = 9",
        "P(1st red) = 4/9",
        "After a red is removed: 3 red of 8 left → P(2nd red) = 3/8",
        "P(both) = 4/9 × 3/8 = 12/72 = 1/6"
      ],
      "example": {
        "problem": "4R,3B,2G; draw 2 without replacement; P(both red)?",
        "steps": [
          "P(red then red) = (4/9)·(3/8)",
          "= 12/72 = 1/6 → A",
          "(With replacement it would be (4/9)² = 16/81 — different)"
        ],
        "answer": "A (1/6)"
      },
      "traps": [
        "Using 4/9 × 4/9 (treats it as with-replacement) → 16/81, the decoy choice"
      ],
      "solveSteps": [
        "1. Find total, P(first)",
        "2. Decrement both counts for P(second | first)",
        "3. Multiply"
      ]
    }
  },
  "164": {
    "hint": "List prime sums 2,3,5,7,11; count ordered pairs out of 36. = 15/36 = 5/12.",
    "theory": {
      "title": "Probability — Prime Sum of Two Dice",
      "icon": "🎲",
      "summary": "Enumerate which sums (2–12) are prime, count ordered (die1,die2) pairs for each, divide by 36.",
      "keyFacts": [
        "Prime sums in 2–12: 2, 3, 5, 7, 11",
        "Counts: 2→1, 3→2, 5→4, 7→6, 11→2",
        "Total favorable = 1+2+4+6+2 = 15",
        "P = 15/36 = 5/12"
      ],
      "example": {
        "problem": "Two dice, P(sum is prime)?",
        "steps": [
          "Sum=7 is the big one: 6 ordered pairs",
          "Add 2(1)+3(2)+5(4)+11(2) = 9; +6 = 15",
          "15/36 = 5/12 → A"
        ],
        "answer": "A (5/12)"
      },
      "traps": [
        "Forgetting 2 is prime, or treating (1,4) and (4,1) as one outcome"
      ],
      "solveSteps": [
        "1. List prime sums ≤ 12",
        "2. Count ordered pairs per sum",
        "3. Sum / 36"
      ]
    }
  },
  "165": {
    "hint": "Exactly-2-men = C(4,2)·C(6,3) / C(10,5) = 120/252 = 10/21.",
    "theory": {
      "title": "Probability — Committee With Exactly k of a Type",
      "icon": "🎲",
      "summary": "Choose the required men and the rest women separately, multiply, divide by all committees of that size.",
      "keyFacts": [
        "Total committees: C(10,5) = 252",
        "Exactly 2 men: C(4,2) = 6 ways for men",
        "Remaining 3 from 6 women: C(6,3) = 20",
        "Favorable = 6·20 = 120 → P = 120/252 = 10/21"
      ],
      "example": {
        "problem": "5 from 4M,6W; P(exactly 2 men)?",
        "steps": [
          "Men: C(4,2)=6; Women: C(6,3)=20",
          "Favorable = 120; total C(10,5)=252",
          "120/252 = 10/21 → A"
        ],
        "answer": "A (10/21)"
      },
      "traps": [
        "Using permutations, or forgetting the women must fill the remaining 3 seats exactly"
      ],
      "solveSteps": [
        "1. C(men_total, k) for the required men",
        "2. C(women_total, size−k) for the rest",
        "3. Product ÷ C(total, size)"
      ]
    }
  },
  "166": {
    "hint": "Complement: total 6! minus AB-adjacent (glue AB → 5!·2). 720 − 240 = 480.",
    "theory": {
      "title": "Counting — Non-Adjacent via Complement",
      "icon": "🔢",
      "summary": "'Not adjacent' is easiest as total minus adjacent. Glue the two people into one block (×2 for internal order) to count adjacent arrangements.",
      "keyFacts": [
        "Total arrangements of 6 = 6! = 720",
        "Treat A,B as one block → 5 units → 5! = 120",
        "Block internal order A-B or B-A → ×2 → 240 adjacent",
        "Non-adjacent = 720 − 240 = 480"
      ],
      "example": {
        "problem": "6 in a row, A and B NOT adjacent. Count?",
        "steps": [
          "Total = 720",
          "Adjacent (AB glued) = 5!·2 = 240",
          "720 − 240 = 480 → A"
        ],
        "answer": "A (480)"
      },
      "traps": [
        "Forgetting the ×2 for the AB/BA internal order (gives 600, a decoy)"
      ],
      "solveSteps": [
        "1. Count all arrangements",
        "2. Glue the pair, ×2 for their order",
        "3. Subtract from total"
      ]
    }
  },
  "167": {
    "hint": "Neither 2 nor 5 → ends in 1,3,7,9. Per decade sum = 40d+20; total 1–100 = 2000. (Listed key is wrong.)",
    "theory": {
      "title": "Sum — Integers Divisible by Neither 2 Nor 5",
      "icon": "🔢",
      "summary": "Numbers divisible by neither 2 nor 5 are exactly those ending in 1, 3, 7, or 9. Sum them decade by decade, or use inclusion–exclusion on sums.",
      "keyFacts": [
        "Inclusion–exclusion: Σ(1–100) − Σ(÷2) − Σ(÷5) + Σ(÷10)",
        "= 5050 − 2550 − 1050 + 550 = 2000",
        "Check: each decade contributes (10d+1)+(10d+3)+(10d+7)+(10d+9) = 40d+20",
        "Σ over d=0..9 = 40·45 + 200 = 2000"
      ],
      "example": {
        "problem": "Sum of 1–100 divisible by neither 2 nor 5?",
        "steps": [
          "Σ÷2 = 2550, Σ÷5 = 1050, Σ÷10 = 550",
          "Neither = 5050 − 2550 − 1050 + 550 = 2000",
          "Decade check confirms 2000 → answer is 2000"
        ],
        "answer": "2000 (choice A; the question's listed key 'C/2040' is an error — both methods give 2000)"
      },
      "traps": [
        "Forgetting +Σ(÷10): subtracting ÷2 and ÷5 double-removes multiples of 10",
        "Trusting a wrong answer key instead of verifying with a second method"
      ],
      "solveSteps": [
        "1. Σ(÷2) + Σ(÷5) − Σ(÷10) = Σ(÷2 or 5)",
        "2. Total − that = neither",
        "3. Cross-check with the decade pattern 40d+20"
      ]
    }
  },
  "168": {
    "hint": "a₄ = a₁r³ → 2r³=54 → r=3. Sum 2+6+18+54+162 = 242.",
    "theory": {
      "title": "Sequence — Geometric Ratio From Two Terms",
      "icon": "🔢",
      "summary": "Use the gap between known terms to solve for r, then sum. a₄/a₁ = r³ here because they're 3 steps apart.",
      "keyFacts": [
        "a₄ = a₁·r³ → 54 = 2·r³ → r³ = 27 → r = 3",
        "Terms: 2, 6, 18, 54, 162",
        "Sum of 5 = 2(r⁵−1)/(r−1) = 2·242/2 = 242",
        "Direct add: 2+6+18+54+162 = 242"
      ],
      "example": {
        "problem": "Geometric: a₁=2, a₄=54. Sum of first 5?",
        "steps": [
          "r³ = 54/2 = 27 → r = 3",
          "List 2,6,18,54,162",
          "Sum = 242 → D"
        ],
        "answer": "D (242)"
      },
      "traps": [
        "Using a₄ = a₁·r⁴ (off-by-one: terms are 3 ratios apart, not 4)"
      ],
      "solveSteps": [
        "1. aₘ/aₖ = r^(m−k) → solve r",
        "2. Generate the terms",
        "3. Sum (formula or direct)"
      ]
    }
  },
  "169": {
    "hint": "Find digit triples with product 24, then count arrangements per multiset. Total 21.",
    "theory": {
      "title": "Counting — 3-Digit Numbers With Digit Product 24",
      "icon": "🔢",
      "summary": "Enumerate unordered digit triples (1–9) whose product is 24, then count distinct orderings of each, dividing by repeats.",
      "keyFacts": [
        "Triples: {1,3,8}, {1,4,6}, {2,2,6}, {2,3,4}",
        "All-distinct triple → 3! = 6 arrangements",
        "{2,2,6} has a repeat → 3!/2! = 3 arrangements",
        "No 0 allowed (product would be 0); digits ≤ 9"
      ],
      "example": {
        "problem": "How many 3-digit integers have digit product 24?",
        "steps": [
          "{1,3,8}:6, {1,4,6}:6, {2,3,4}:6",
          "{2,2,6}:3 (repeat halves count)",
          "6+6+6+3 = 21 → C"
        ],
        "answer": "C (21)"
      },
      "traps": [
        "Giving {2,2,6} a full 3!=6 (must divide by 2! for the repeated 2)",
        "Including a triple with a digit >9 (e.g. {1,2,12})"
      ],
      "solveSteps": [
        "1. List all digit multisets (1–9) with product 24",
        "2. Arrangements = 3!/(repeats!)",
        "3. Sum across multisets"
      ]
    }
  },
  "170": {
    "hint": "Exactly 3 factors ⇔ number = p². Count primes p with p² < 200 → 6.",
    "theory": {
      "title": "Number Properties — Exactly Three Factors",
      "icon": "🔢",
      "summary": "An integer has exactly 3 divisors iff it is the square of a prime (divisors: 1, p, p²). Count primes whose square is in range.",
      "keyFacts": [
        "d(n)=3 ⇔ n = p² for prime p (1, p, p² only)",
        "Need p² < 200 → p ≤ 14",
        "Primes ≤ 14: 2,3,5,7,11,13 (their squares 4,9,25,49,121,169)",
        "17² = 289 > 200 → excluded"
      ],
      "example": {
        "problem": "Positive integers < 200 with exactly 3 factors?",
        "steps": [
          "Only prime squares qualify",
          "p ∈ {2,3,5,7,11,13} → 6 values",
          "13²=169<200, 17²=289>200 → count 6 → B"
        ],
        "answer": "B (6)"
      },
      "traps": [
        "Counting all perfect squares (e.g. 36=6² has 9 factors, not 3)"
      ],
      "solveSteps": [
        "1. Exactly 3 factors → n = prime²",
        "2. Bound: p² < limit",
        "3. Count primes under √limit"
      ]
    }
  },
  "171": {
    "hint": "Split the number line at the kinks (x=−1, x=3). Solve each region; only the two outer regions reach 8.",
    "theory": {
      "title": "Absolute Value — Sum of Two Distances",
      "icon": "📐",
      "summary": "|x−3|+|x+1| is the total distance from x to 3 and to −1. The points 3 and −1 are 4 apart; between them the sum is constant (4), so a value of 8 occurs only outside.",
      "keyFacts": [
        "Critical points: x=3 and x=−1 (where each absolute value changes sign)",
        "x ≥ 3: (x−3)+(x+1)=2x−2=8 → x=5",
        "x ≤ −1: (3−x)+(−x−1)=2−2x=8 → x=−3",
        "−1<x<3: sum = 4 (constant) ≠ 8 → no solution there"
      ],
      "example": {
        "problem": "Integer x with |x−3|+|x+1|=8?",
        "steps": [
          "Right region → x=5 (valid, ≥3)",
          "Left region → x=−3 (valid, ≤−1)",
          "Middle gives 4, never 8 → exactly 2 solutions → C"
        ],
        "answer": "C (2)"
      },
      "traps": [
        "Squaring the equation or dropping a region — misses one of the two roots"
      ],
      "solveSteps": [
        "1. Find the kink points; split into 3 regions",
        "2. Drop the bars with the right sign per region, solve",
        "3. Keep only roots that lie in their region"
      ]
    }
  },
  "172": {
    "hint": "Find both axis intercepts; triangle legs = |x-int| and |y-int|. Area = ½·3·3 = 4.5.",
    "theory": {
      "title": "Coordinate — Triangle From a Line and the Axes",
      "icon": "📐",
      "summary": "A line crossing both axes makes a right triangle with the origin. Its legs are the absolute values of the two intercepts.",
      "keyFacts": [
        "Through (0,3) and (−3,0): slope = (0−3)/(−3−0) = 1 → y = x+3",
        "y-intercept = 3, x-intercept = −3",
        "Legs = |3| and |−3| = 3 and 3",
        "Area = ½ · |x-int| · |y-int| = ½·3·3 = 4.5"
      ],
      "example": {
        "problem": "Line through (0,3),(−3,0); area with the axes?",
        "steps": [
          "Intercepts already given: 3 and −3",
          "Right triangle legs 3 and 3",
          "½·3·3 = 4.5 → B"
        ],
        "answer": "B (4.5)"
      },
      "traps": [
        "Using signed intercepts (−3) in the area — take absolute values"
      ],
      "solveSteps": [
        "1. Get both intercepts",
        "2. Legs = absolute intercept values",
        "3. Area = ½·leg·leg"
      ]
    }
  },
  "173": {
    "hint": "Scaling all data by k: mean ×k, SD ×|k|. k=3 → both ×3.",
    "theory": {
      "title": "Statistics — Linear Transformation of a Data Set",
      "icon": "📊",
      "summary": "Multiplying every value by k multiplies the mean by k and the standard deviation by |k|. (Adding a constant shifts the mean but leaves SD unchanged.)",
      "keyFacts": [
        "Mean(kA) = k·Mean(A)",
        "SD(kA) = |k|·SD(A) — spread scales linearly, not by k²",
        "Variance scales by k², but SD is its square root → k",
        "Mean(A)=3 → Mean(B)=9; SD scales by 3"
      ],
      "example": {
        "problem": "B = 3·A elementwise; relation of mean & SD?",
        "steps": [
          "Mean triples: 3 → 9",
          "SD multiplies by 3 (not 9, not unchanged)",
          "→ C"
        ],
        "answer": "C (Mean ×3, SD ×3)"
      },
      "traps": [
        "Scaling SD by k²=9 (that's variance, not SD)",
        "Thinking SD is unchanged (true only for ADDING a constant)"
      ],
      "solveSteps": [
        "1. Multiply → mean ×k",
        "2. SD ×|k| (variance ×k²)",
        "3. Match the option"
      ]
    }
  },
  "174": {
    "hint": "Inclusion–exclusion: union = ΣS − Σpairs + triple. Note: these figures give union 205 > 200 — data is inconsistent.",
    "theory": {
      "title": "Sets — Triple Inclusion–Exclusion (and a Data Check)",
      "icon": "📊",
      "summary": "|A∪B∪C| = Σsingles − Σpairs + triple, then none = total − union. Always sanity-check: the union can't exceed the population.",
      "keyFacts": [
        "Union = 120+90+70 − (40+30+20) + 15 = 205",
        "205 > 200 students → the given pairwise counts are internally inconsistent",
        "Intended answer 15 holds only if the pairwise figures mean 'exactly two' (then union = 185, none = 15)",
        "none = total − |A∪B∪C|"
      ],
      "example": {
        "problem": "200 students; M120 S90 E70; pair 40/30/20; all 15. None?",
        "steps": [
          "Standard IE → union 205 (impossible: >200)",
          "If pair counts = 'at least two': contradictory data",
          "If pair counts = 'exactly two': union 185 → none = 200−185 = 15 → C (the intended answer)"
        ],
        "answer": "C (15) — valid only under the 'exactly two' reading; raw IE on the given numbers is inconsistent"
      },
      "traps": [
        "Blindly applying IE without checking union ≤ population",
        "Confusing 'at least two of' with 'exactly two of' overlap counts"
      ],
      "solveSteps": [
        "1. Apply IE: ΣS − Σpairs + triple",
        "2. Sanity check union ≤ total",
        "3. none = total − union (resolve overlap convention if it fails)"
      ]
    }
  },
  "175": {
    "hint": "|F∪S| = 45+38−12 = 71. Neither = 80 − 71 = 9.",
    "theory": {
      "title": "Sets — Two-Set Neither",
      "icon": "📊",
      "summary": "For two sets: union = |F| + |S| − |both|. 'Neither' is the total minus the union.",
      "keyFacts": [
        "|F∪S| = 45 + 38 − 12 = 71",
        "Subtracting 'both' once removes the double-count",
        "Neither = 80 − 71 = 9",
        "Two-set IE has no +triple term"
      ],
      "example": {
        "problem": "80 students; French 45, Spanish 38, both 12; neither?",
        "steps": [
          "Union = 45+38−12 = 71",
          "Neither = 80 − 71 = 9 → B"
        ],
        "answer": "B (9)"
      },
      "traps": [
        "Forgetting to subtract 'both' (gives 83 > 80, impossible)"
      ],
      "solveSteps": [
        "1. Union = sum − both",
        "2. Neither = total − union"
      ]
    }
  },
  "176": {
    "hint": "Acid balance: 0.4x + 0.7·30 = 0.5(x+30). Solve x = 60.",
    "theory": {
      "title": "Mixtures — Conserve the Solute",
      "icon": "⚗️",
      "summary": "Total acid before = total acid after. Set acid contributed by each solution equal to acid in the final mix.",
      "keyFacts": [
        "Acid: 0.4x (from 40%) + 0.7(30) (from 70%) = 0.5(x+30) (final)",
        "0.4x + 21 = 0.5x + 15",
        "6 = 0.1x → x = 60",
        "Check: (0.4·60+21)/(90) = 45/90 = 50% ✓"
      ],
      "example": {
        "problem": "x L of 40% + 30 L of 70% → 50%. x?",
        "steps": [
          "0.4x + 21 = 0.5x + 15",
          "21−15 = 0.1x → x = 60 → C"
        ],
        "answer": "C (60)"
      },
      "traps": [
        "Averaging the percentages (40+70)/2 instead of weighting by volume"
      ],
      "solveSteps": [
        "1. Acid_in = Acid_out equation",
        "2. Expand and isolate x",
        "3. Verify the final concentration"
      ]
    }
  },
  "177": {
    "hint": "Compound yearly: 5000·1.08² = 5000·1.1664 = 5832.",
    "theory": {
      "title": "Compound Interest — Two Years Annual",
      "icon": "💰",
      "summary": "Compounded annually means each year's interest is on the new balance: A = P(1+r)ⁿ.",
      "keyFacts": [
        "Year 1: 5000 × 1.08 = 5400",
        "Year 2: 5400 × 1.08 = 5832",
        "Equivalent: 5000 × 1.08² = 5000 × 1.1664",
        "Simple interest would give only 5800 (a decoy)"
      ],
      "example": {
        "problem": "$5000 at 8% compounded annually, 2 years?",
        "steps": [
          "5000·1.08 = 5400",
          "5400·1.08 = 5832 → B"
        ],
        "answer": "B ($5,832)"
      },
      "traps": [
        "Using simple interest 5000+2·400 = 5800 (ignores compounding the 2nd year)"
      ],
      "solveSteps": [
        "1. A = P(1+r)ⁿ",
        "2. Apply rate year by year",
        "3. Distinguish from simple interest"
      ]
    }
  },
  "178": {
    "hint": "Make b common: a:b=3:4=15:20, b:c=5:6=20:24 → 15:20:24.",
    "theory": {
      "title": "Ratios — Chaining via the Common Term",
      "icon": "🔢",
      "summary": "To merge a:b and b:c, scale each ratio so the shared term b matches (use the LCM of the two b-values).",
      "keyFacts": [
        "b appears as 4 in a:b and as 5 in b:c → LCM(4,5)=20",
        "a:b = 3:4 → ×5 → 15:20",
        "b:c = 5:6 → ×4 → 20:24",
        "Combined a:b:c = 15:20:24"
      ],
      "example": {
        "problem": "a:b=3:4, b:c=5:6 → a:b:c?",
        "steps": [
          "Scale b to 20 in both",
          "15:20 and 20:24",
          "→ 15:20:24 → B"
        ],
        "answer": "B (15:20:24)"
      },
      "traps": [
        "Just concatenating 3:4:6 or 3:5:6 without equalizing b"
      ],
      "solveSteps": [
        "1. LCM of the two b values",
        "2. Scale each ratio to that b",
        "3. Read off a:b:c"
      ]
    }
  },
  "179": {
    "hint": "M=3s and M+12=2(s+12). Solve: s=12, M=36.",
    "theory": {
      "title": "Age — Two Equations, Two Times",
      "icon": "🔢",
      "summary": "Translate 'now' and 'future' into separate equations; substitute and solve.",
      "keyFacts": [
        "Now: M = 3s",
        "In 12 yrs: M+12 = 2(s+12)",
        "Substitute: 3s+12 = 2s+24 → s = 12",
        "M = 3·12 = 36"
      ],
      "example": {
        "problem": "Maria 3× son; in 12 yrs twice his age. Maria now?",
        "steps": [
          "3s+12 = 2(s+12)",
          "s = 12 → M = 36 → D"
        ],
        "answer": "D (36)"
      },
      "traps": [
        "Adding 12 to only one person's age in the future equation"
      ],
      "solveSteps": [
        "1. Write the 'now' relation",
        "2. Add the time shift to BOTH ages for the future relation",
        "3. Solve the system"
      ]
    }
  },
  "180": {
    "hint": "Set CP=100. MP=140, SP=140·0.85=119 → profit 19%.",
    "theory": {
      "title": "Profit — Markup Then Discount",
      "icon": "💰",
      "summary": "Markup is on cost; discount is on the marked price. Use CP=100 to read profit% directly off the final selling price.",
      "keyFacts": [
        "CP = 100 → MP = 100·1.40 = 140",
        "SP = MP·(1−0.15) = 140·0.85 = 119",
        "Profit = 119 − 100 = 19 → 19%",
        "Not 40−15=25%: discount and markup have different bases"
      ],
      "example": {
        "problem": "40% markup, 15% discount; profit %?",
        "steps": [
          "CP 100 → MP 140",
          "SP = 140·0.85 = 119",
          "Profit 19% → D"
        ],
        "answer": "D (19%)"
      },
      "traps": [
        "Subtracting percentages: 40% − 15% = 25% (different bases — wrong)"
      ],
      "solveSteps": [
        "1. CP = 100",
        "2. Apply markup to CP, then discount to MP",
        "3. Profit% = SP − 100"
      ]
    }
  },
  "181": {
    "hint": "Key identity: (x+y)²+(x−y)² = 2(x²+y²). Need BOTH 5|(x+y) and 5|(x−y) → C.",
    "theory": {
      "title": "DS — Build x²+y² From the Two Statements",
      "icon": "📊",
      "summary": "Neither divisibility alone forces 5 | x²+y². But (x+y)² + (x−y)² = 2(x²+y²); if 5 divides both x+y and x−y, it divides the left side, hence x²+y².",
      "keyFacts": [
        "(1) 5|(x+y): x=1,y=4 → x²+y²=17 (no); x=0,y=5 → 25 (yes) → insufficient",
        "(2) 5|(x−y): similarly mixed → insufficient",
        "Identity: (x+y)²+(x−y)² = 2(x²+y²)",
        "5|(x+y) and 5|(x−y) → 5 | 2(x²+y²) → 5 | x²+y² (5∤2)"
      ],
      "example": {
        "problem": "Integers x,y: is 5 | x²+y²? (1) 5|(x+y) (2) 5|(x−y)",
        "steps": [
          "Each alone: produce a yes-case and a no-case → insufficient",
          "Together: 25|(x+y)² and 25|(x−y)² → 5 | their sum = 2(x²+y²)",
          "Since gcd(2,5)=1 → 5 | x²+y² → definite YES → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Stopping after testing one pair and guessing E without the algebraic identity"
      ],
      "solveSteps": [
        "1. Test each statement with examples → likely insufficient",
        "2. Look for an identity combining x+y and x−y",
        "3. Together force the divisibility → C"
      ]
    }
  },
  "182": {
    "hint": "Both inequalities admit negative AND positive solutions; even intersected → still both signs → E.",
    "theory": {
      "title": "DS — Sign Undetermined by Power Inequalities",
      "icon": "📊",
      "summary": "a²>a and a³>a each carve out a set spanning both negative and positive values. Their intersection still contains both signs, so 'is a>0?' stays undecided.",
      "keyFacts": [
        "(1) a²>a → a<0 OR a>1 (e.g. a=−1 neg, a=2 pos) → insufficient",
        "(2) a³>a → −1<a<0 OR a>1 (e.g. a=−0.5 neg, a=2 pos) → insufficient",
        "Intersection: (−1<a<0) OR (a>1) — still both signs",
        "No combination pins the sign → E"
      ],
      "example": {
        "problem": "Is a>0? (1) a²>a (2) a³>a",
        "steps": [
          "(1) a=−1 and a=2 both satisfy → insufficient",
          "(2) a=−0.5 and a=2 both satisfy → insufficient",
          "Together a∈(−1,0)∪(1,∞): a=−0.5 (no), a=2 (yes) → E"
        ],
        "answer": "E"
      },
      "traps": [
        "Assuming a²>a or a³>a implies a>1 — forgets the negative interval"
      ],
      "solveSteps": [
        "1. Solve each inequality as a sign chart",
        "2. Intersect the solution sets",
        "3. If both signs survive → E"
      ]
    }
  },
  "183": {
    "hint": "P(red) needs red AND total. One count alone gives no ratio. Together 5/9>0.5 → C.",
    "theory": {
      "title": "DS — Probability Threshold Needs Both Counts",
      "icon": "📊",
      "summary": "With only red and blue marbles, P(red) = red/(red+blue). A single colour count can't form the ratio; both are required.",
      "keyFacts": [
        "(1) 5 red, blue unknown → P could be >0.5 or <0.5 → insufficient",
        "(2) 4 blue, red unknown → insufficient",
        "Together: total = 5+4 = 9, P(red) = 5/9 ≈ 0.556 > 0.5 → definite YES",
        "A yes/no probability DS still needs the full ratio"
      ],
      "example": {
        "problem": "P(red) > 0.5? (1) 5 red (2) 4 blue",
        "steps": [
          "(1) alone: 5 red of 5 → 1.0; of 100 → 0.05 → insufficient",
          "(2) alone: red unknown → insufficient",
          "Together: 5/9 > 0.5 → YES → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking 'more red than blue' is given by (1) alone — blue count is unknown"
      ],
      "solveSteps": [
        "1. P(red) = red/(red+blue)",
        "2. Need both colour counts",
        "3. Compare the resulting ratio to 0.5 → C"
      ]
    }
  },
  "184": {
    "hint": "Both circumference>10π and diameter>10 each force r>5 → area>25π. Each alone → D.",
    "theory": {
      "title": "DS — One Circle Measure Bounds the Area",
      "icon": "📊",
      "summary": "Area > 25π ⇔ r > 5. Any single measure that forces r > 5 (circumference or diameter) is sufficient on its own.",
      "keyFacts": [
        "Area > 25π ⇔ πr² > 25π ⇔ r > 5",
        "(1) C > 10π → 2πr > 10π → r > 5 → area > 25π: sufficient",
        "(2) d > 10 → r > 5 → area > 25π: sufficient",
        "Each statement independently fixes the inequality → D"
      ],
      "example": {
        "problem": "Area > 25π? (1) C > 10π (2) d > 10",
        "steps": [
          "Translate target: r > 5",
          "(1) C>10π → r>5: SUFFICIENT",
          "(2) d>10 → r>5: SUFFICIENT → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C — the two statements are independent routes to the same r>5"
      ],
      "solveSteps": [
        "1. Reduce the area question to a radius threshold",
        "2. Test each statement against r>5",
        "3. Both work alone → D"
      ]
    }
  },
  "185": {
    "hint": "Mean(a,b,c) needs a+b+c. (1) has an extra b — can't isolate. (2) gives 3(a+b+c)=60 → B.",
    "theory": {
      "title": "DS — Mean Needs the Plain Sum",
      "icon": "📊",
      "summary": "Average of a,b,c = (a+b+c)/3. You need a+b+c exactly; a weighted combination like a+2b+c does not give it.",
      "keyFacts": [
        "(1) a+2b+c=24 → equals (a+b+c)+b; b unknown → can't extract a+b+c → insufficient",
        "(2) 3a+3b+3c=60 → a+b+c=20 → mean=20/3: sufficient",
        "Mean depends only on the unweighted sum",
        "A scaled-but-uniform equation IS enough; an unevenly weighted one is not"
      ],
      "example": {
        "problem": "Mean of a,b,c? (1) a+2b+c=24 (2) 3a+3b+3c=60",
        "steps": [
          "(1) a+b+c = 24 − b, b free → insufficient",
          "(2) divide by 3 → a+b+c=20 → mean 20/3 → SUFFICIENT",
          "Only (2) → B"
        ],
        "answer": "B"
      },
      "traps": [
        "Treating (1)'s extra b as harmless — it blocks isolating the sum"
      ],
      "solveSteps": [
        "1. Mean needs a+b+c (equal weights)",
        "2. Check if a statement gives that exactly",
        "3. Uniform-coefficient eq → sufficient → B"
      ]
    }
  },
  "186": {
    "hint": "(1) n²−1=(n−1)(n+1) div by 8 → forces n odd. (2) n+1 div by 4 → n odd. Each alone → D.",
    "theory": {
      "title": "DS — Parity From Divisibility Structure",
      "icon": "📊",
      "summary": "Both statements independently force n to be odd — analyze the factor structure rather than testing endlessly.",
      "keyFacts": [
        "(1) n²−1=(n−1)(n+1). If n even → two odds, product never div by 8. If n odd → two consecutive evens, one div by 4 → product div by 8. So 8|(n²−1) ⇒ n odd: sufficient",
        "(2) n+1 div by 4 → n = 4k−1 = odd: sufficient",
        "Consecutive even numbers: exactly one is a multiple of 4",
        "Each statement alone determines parity → D"
      ],
      "example": {
        "problem": "Is n odd? (1) 8 | n²−1 (2) 4 | n+1",
        "steps": [
          "(1) only odd n makes (n−1)(n+1) divisible by 8 → SUFFICIENT",
          "(2) n = 4k−1 is always odd → SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Testing one value and assuming insufficiency without the factor argument"
      ],
      "solveSteps": [
        "1. Factor n²−1 = (n−1)(n+1)",
        "2. Reason by parity cases on each statement",
        "3. Both pin odd → D"
      ]
    }
  },
  "187": {
    "hint": "Two distinct roots ⇔ disc b²−4ac>0. (1) gives b²+24>0 always → sufficient alone → A.",
    "theory": {
      "title": "DS — Discriminant Sign Decides Distinct Roots",
      "icon": "📊",
      "summary": "A quadratic has two distinct real roots iff b²−4ac > 0. If a and c make −4ac always dominate, b is irrelevant.",
      "keyFacts": [
        "Distinct real roots ⇔ b² − 4ac > 0",
        "(1) a=1, c=−6 → disc = b² − 4(1)(−6) = b² + 24 > 0 for ALL real b → always two roots: sufficient",
        "(2) b=1 alone → disc = 1 − 4ac, sign depends on a,c → insufficient",
        "Negative product ac makes −4ac positive, guaranteeing disc>0"
      ],
      "example": {
        "problem": "Two distinct roots of ax²+bx+c? (1) a=1,c=−6 (2) b=1",
        "steps": [
          "(1) disc = b²+24 > 0 regardless of b → SUFFICIENT",
          "(2) disc = 1−4ac, unknown sign → insufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking b must be known — when −4ac>0 the b² term only helps"
      ],
      "solveSteps": [
        "1. Translate to disc = b²−4ac > 0",
        "2. Plug each statement; is the sign forced?",
        "3. (1) forces it alone → A"
      ]
    }
  },
  "188": {
    "hint": "(1) 6-8-10 satisfies 6²+8²=10² → right. (2) angle B=90° → right. Each alone → D.",
    "theory": {
      "title": "DS — Right Triangle: Two Independent Proofs",
      "icon": "📊",
      "summary": "A triangle is right if its sides satisfy Pythagoras OR an angle is 90°. Each statement gives one of these independently.",
      "keyFacts": [
        "(1) 6,8,10: 6²+8² = 36+64 = 100 = 10² → Pythagorean → right: sufficient",
        "(2) angle B = 90° → right by definition: sufficient",
        "Side test and angle test are independent sufficiency routes",
        "Each alone → D"
      ],
      "example": {
        "problem": "Is ABC right? (1) sides 6,8,10 (2) angle B=90°",
        "steps": [
          "(1) 6²+8²=10² → right: SUFFICIENT",
          "(2) a 90° angle → right: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C — neither statement needs the other"
      ],
      "solveSteps": [
        "1. Right ⇔ Pythagoras holds OR a 90° angle",
        "2. Check each statement against one criterion",
        "3. Both sufficient → D"
      ]
    }
  },
  "189": {
    "hint": "Closing-speed problem: need BOTH speeds for combined rate. 300/(60+90)=2h → C.",
    "theory": {
      "title": "DS — Converging Bodies Need Combined Rate",
      "icon": "📊",
      "summary": "Two objects approaching each other close the gap at the SUM of their speeds. Time = distance / combined rate, so both speeds are required.",
      "keyFacts": [
        "Closing speed = speed_A + speed_B",
        "(1) A=60 only: B unknown → combined rate unknown → insufficient",
        "(2) B=90 only: A unknown → insufficient",
        "Together: 300 / (60+90) = 2 h"
      ],
      "example": {
        "problem": "Meet time on 300 km? (1) A=60 km/h (2) B=90 km/h",
        "steps": [
          "(1) alone: gap closes at 60+B, B free → insufficient",
          "(2) alone: 60? unknown → insufficient",
          "Together: 300/150 = 2 h → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking one car's speed + the distance is enough — the other car also closes the gap"
      ],
      "solveSteps": [
        "1. Converging → add speeds",
        "2. Need both speeds for the sum",
        "3. Time = distance / combined → C"
      ]
    }
  },
  "190": {
    "hint": "|C∩T| = |C|+|T|−|C∪T|. Need both the singles and 'neither'. Together → 50 → C.",
    "theory": {
      "title": "DS — Overlap Needs Singles and the Union",
      "icon": "📊",
      "summary": "|C∩T| = |C| + |T| − |C∪T|. The union comes from 'neither' (union = total − neither). You need the individual counts AND neither.",
      "keyFacts": [
        "(1) |C|=70, |T|=50, but |C∪T| unknown → overlap unknown → insufficient",
        "(2) neither=30 → |C∪T|=70, but |C|,|T| unknown → insufficient",
        "Together: |C∩T| = 70 + 50 − 70 = 50",
        "Overlap formula needs three of the four quantities"
      ],
      "example": {
        "problem": "Both coffee & tea? (1) 70 coffee, 50 tea (2) 30 neither",
        "steps": [
          "(1) alone: no union → overlap free → insufficient",
          "(2) alone: union=70 but singles unknown → insufficient",
          "Together: 70+50−70 = 50 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Trying to get overlap from the two single counts alone (need the union too)"
      ],
      "solveSteps": [
        "1. |C∩T| = |C|+|T|−|C∪T|",
        "2. Union = total − neither",
        "3. Need singles AND neither → C"
      ]
    }
  },
  "191": {
    "hint": "Powers of 2 mod 7 cycle with period 3 (2,4,1). 100 mod 3 = 1 → answer = 2.",
    "theory": {
      "title": "Remainders — Cyclic Powers (mod 7)",
      "icon": "🔢",
      "summary": "Remainders of bⁿ repeat in a fixed cycle. Find the cycle length, reduce the exponent mod that length, read off the matching remainder.",
      "keyFacts": [
        "2¹≡2, 2²≡4, 2³≡8≡1 (mod 7) → cycle length 3",
        "Exponent 100 mod 3 = 1 (100 = 3·33 + 1)",
        "2^100 ≡ 2^1 ≡ 2 (mod 7)",
        "When remainder hits 1, the cycle restarts"
      ],
      "example": {
        "problem": "Remainder of 2^100 ÷ 7?",
        "steps": [
          "Cycle: 2,4,1 (period 3)",
          "100 mod 3 = 1 → use the 1st in the cycle",
          "→ 2 → B"
        ],
        "answer": "B (2)"
      },
      "traps": [
        "Using 100 mod 3 = 1 but indexing from 2⁰ instead of 2¹ — anchor the cycle to 2¹"
      ],
      "solveSteps": [
        "1. List bⁿ mod m until it returns to 1",
        "2. Reduce the exponent mod the cycle length",
        "3. Map to the corresponding term"
      ]
    }
  },
  "192": {
    "hint": "Legendre: ⌊20/2⌋+⌊20/4⌋+⌊20/8⌋+⌊20/16⌋ = 10+5+2+1 = 18.",
    "theory": {
      "title": "Factorials — Power of a Prime in n! (Legendre)",
      "icon": "🔢",
      "summary": "The exponent of prime p in n! is the sum of ⌊n/p⌋ + ⌊n/p²⌋ + ⌊n/p³⌋ + … — each term counts multiples that contribute another factor of p.",
      "keyFacts": [
        "⌊20/2⌋ = 10 (multiples of 2)",
        "⌊20/4⌋ = 5 (extra factor from multiples of 4)",
        "⌊20/8⌋ = 2, ⌊20/16⌋ = 1; ⌊20/32⌋ = 0 stop",
        "Total = 10+5+2+1 = 18"
      ],
      "example": {
        "problem": "Greatest n with 2ⁿ | 20!?",
        "steps": [
          "Sum floor(20/2^k): 10,5,2,1",
          "= 18 → C"
        ],
        "answer": "C (18)"
      },
      "traps": [
        "Only counting ⌊20/2⌋=10 — misses extra 2s from 4, 8, 16"
      ],
      "solveSteps": [
        "1. Add ⌊n/p⌋, ⌊n/p²⌋, … until the term is 0",
        "2. Sum the floors",
        "3. That sum is the max exponent"
      ]
    }
  },
  "193": {
    "hint": "LCM × GCF = product of the two numbers. Other = 120·8 / 24 = 40.",
    "theory": {
      "title": "LCM/GCF — Product Identity",
      "icon": "🔢",
      "summary": "For any two positive integers, LCM × GCF = their product. Solve for the unknown number directly.",
      "keyFacts": [
        "LCM(a,b) × GCF(a,b) = a × b",
        "120 × 8 = 24 × x → 960 = 24x",
        "x = 960 / 24 = 40",
        "Check: GCF(24,40)=8, LCM(24,40)=120 ✓"
      ],
      "example": {
        "problem": "LCM 120, GCF 8, one number 24. Other?",
        "steps": [
          "120·8 = 24·x → 960 = 24x",
          "x = 40 → D"
        ],
        "answer": "D (40)"
      },
      "traps": [
        "Adding or dividing LCM and GCF instead of using the product identity"
      ],
      "solveSteps": [
        "1. LCM·GCF = a·b",
        "2. Solve x = LCM·GCF / known",
        "3. Verify GCF and LCM of the pair"
      ]
    }
  },
  "194": {
    "hint": "Symmetric system — ADD the equations: 3x+3y=27 → x+y=9. Don't solve for x,y separately.",
    "theory": {
      "title": "Systems — Combine for the Asked Expression",
      "icon": "🔢",
      "summary": "When the question asks for x+y (not x and y), add or subtract the equations to land on that combination directly.",
      "keyFacts": [
        "2x+y=13 and x+2y=14",
        "Add: 3x+3y = 27 → x+y = 9",
        "No need to solve x=4, y=5 individually",
        "Symmetric coefficient pattern → sum trick"
      ],
      "example": {
        "problem": "2x+y=13, x+2y=14; x+y?",
        "steps": [
          "Add both equations → 3(x+y)=27",
          "x+y = 9 → C"
        ],
        "answer": "C (9)"
      },
      "traps": [
        "Fully solving the system (slower, more error-prone) when adding gives it instantly"
      ],
      "solveSteps": [
        "1. Look at what's asked (x+y)",
        "2. Add/subtract equations to form it",
        "3. Divide out the common factor"
      ]
    }
  },
  "195": {
    "hint": "Factor: (x−2)(x−3)=0 → roots 2,3. x>2 → x=3. x²−4 = 5.",
    "theory": {
      "title": "Quadratics — Pick the Root From a Constraint",
      "icon": "🔢",
      "summary": "Factor to get both roots, then use the side condition (x>2) to choose the valid one before evaluating the target expression.",
      "keyFacts": [
        "x²−5x+6 = (x−2)(x−3) → x ∈ {2,3}",
        "Constraint x>2 → x=3 (reject x=2)",
        "x²−4 = 3²−4 = 5",
        "The constraint exists precisely to disambiguate"
      ],
      "example": {
        "problem": "x²−5x+6=0, x>2; find x²−4",
        "steps": [
          "Roots 2 and 3; x>2 → x=3",
          "x²−4 = 9−4 = 5 → C"
        ],
        "answer": "C (5)"
      },
      "traps": [
        "Using x=2 (violates x>2) → gives 0, a wrong path"
      ],
      "solveSteps": [
        "1. Factor for the roots",
        "2. Apply the inequality to select one",
        "3. Substitute into the asked expression"
      ]
    }
  },
  "196": {
    "hint": "Sum of roots = −b/a = 7 (no need to factor). Both roots wanted, not one.",
    "theory": {
      "title": "Quadratics — Sum of Roots Shortcut",
      "icon": "🔢",
      "summary": "For ax²+bx+c=0, the roots sum to −b/a and multiply to c/a (Vieta). 'Sum of all possible values of x' = −b/a.",
      "keyFacts": [
        "x²−7x+10=0 → a=1, b=−7",
        "Sum of roots = −b/a = 7",
        "Factor check: (x−2)(x−5) → 2+5 = 7 ✓",
        "Question wants the SUM, not a single root"
      ],
      "example": {
        "problem": "Sum of all x with x²−7x+10=0?",
        "steps": [
          "−b/a = −(−7)/1 = 7",
          "Confirms 2+5 = 7 → C"
        ],
        "answer": "C (7)"
      },
      "traps": [
        "Reporting one root (2 or 5) instead of their sum"
      ],
      "solveSteps": [
        "1. Identify a, b",
        "2. Sum of roots = −b/a",
        "3. (Optional) factor to confirm"
      ]
    }
  },
  "197": {
    "hint": "Inscribed → circle diameter = square side = 6 → r=3. Area = 36 − 9π.",
    "theory": {
      "title": "Geometry — Square Minus Inscribed Circle",
      "icon": "📐",
      "summary": "A circle inscribed in a square touches all four sides, so its diameter equals the side. Subtract the circle's area from the square's.",
      "keyFacts": [
        "Inscribed circle: diameter = side = 6 → r = 3",
        "Square area = 6² = 36",
        "Circle area = π·3² = 9π",
        "Leftover = 36 − 9π"
      ],
      "example": {
        "problem": "Square side 6, inscribed circle; area outside circle?",
        "steps": [
          "r = 6/2 = 3",
          "36 − π(3²) = 36 − 9π → B"
        ],
        "answer": "B (36 − 9π)"
      },
      "traps": [
        "Setting radius = 6 (that's the diameter) → 36 − 36π, impossible (negative)"
      ],
      "solveSteps": [
        "1. Inscribed → diameter = side",
        "2. r = side/2; circle area = πr²",
        "3. Square area − circle area"
      ]
    }
  },
  "198": {
    "hint": "6s²=96 → s=4 → volume s³=64.",
    "theory": {
      "title": "Geometry — Cube From Surface Area",
      "icon": "📐",
      "summary": "A cube has 6 equal faces: SA = 6s². Solve for the edge, then cube it for volume.",
      "keyFacts": [
        "SA = 6s² = 96 → s² = 16 → s = 4",
        "Volume = s³ = 4³ = 64",
        "6 faces, not 4 — divide SA by 6",
        "Edge links area (s²) and volume (s³)"
      ],
      "example": {
        "problem": "Cube SA 96 cm²; volume?",
        "steps": [
          "s² = 96/6 = 16 → s = 4",
          "V = 4³ = 64 → C"
        ],
        "answer": "C (64 cm³)"
      },
      "traps": [
        "Dividing SA by 4 instead of 6 (cube has 6 faces)"
      ],
      "solveSteps": [
        "1. s² = SA/6",
        "2. s = √(s²)",
        "3. V = s³"
      ]
    }
  },
  "199": {
    "hint": "Opposite directions → speeds ADD. 105 / (15+20) = 3 h.",
    "theory": {
      "title": "Rate — Separating in Opposite Directions",
      "icon": "🚗",
      "summary": "Two bodies moving apart open the gap at the SUM of their speeds. Time = separation / combined speed.",
      "keyFacts": [
        "Combined separation rate = 15 + 20 = 35 km/h",
        "Gap grows linearly at 35 km/h",
        "Time = 105 / 35 = 3 h",
        "Same 'add the speeds' rule as converging — opposite sign of motion, same math"
      ],
      "example": {
        "problem": "15 & 20 km/h opposite; 105 km apart after?",
        "steps": [
          "Rate apart = 35 km/h",
          "105/35 = 3 → B"
        ],
        "answer": "B (3)"
      },
      "traps": [
        "Using the speed difference (5 km/h) — that's for same-direction chasing"
      ],
      "solveSteps": [
        "1. Opposite/converging → add speeds",
        "2. Time = distance / combined rate"
      ]
    }
  },
  "200": {
    "hint": "Weighted mean: (30·75 + 20·85)/50 = 3950/50 = 79, NOT 80.",
    "theory": {
      "title": "Statistics — Weighted Average",
      "icon": "📊",
      "summary": "Combine group averages by their sizes, not by a plain average. Total points ÷ total people.",
      "keyFacts": [
        "Group 1: 30·75 = 2250 points",
        "Group 2: 20·85 = 1700 points",
        "Combined = (2250+1700)/50 = 3950/50 = 79%",
        "Plain (75+85)/2 = 80 is WRONG (ignores group sizes)"
      ],
      "example": {
        "problem": "30 students @75%, 20 @85%; combined?",
        "steps": [
          "Total = 2250+1700 = 3950",
          "3950/50 = 79% → B"
        ],
        "answer": "B (79%)"
      },
      "traps": [
        "Averaging 75 and 85 to 80 — the larger group pulls the mean toward 75"
      ],
      "solveSteps": [
        "1. Σ(size · mean) for each group",
        "2. Divide by total size"
      ]
    }
  },
  "201": {
    "hint": "3:5 with cats=24 → scale ×8 → dogs = 5·8 = 40.",
    "theory": {
      "title": "Ratios — Scale Factor From a Known Part",
      "icon": "🔢",
      "summary": "Find the multiplier that turns the ratio's cat-term into the actual cat count, then apply it to the dog-term.",
      "keyFacts": [
        "cats:dogs = 3:5",
        "24 cats → scale = 24/3 = 8",
        "dogs = 5 × 8 = 40",
        "Same multiplier applies to every part"
      ],
      "example": {
        "problem": "3:5 cats:dogs, 24 cats; dogs?",
        "steps": [
          "Multiplier = 24/3 = 8",
          "Dogs = 5·8 = 40 → C"
        ],
        "answer": "C (40)"
      },
      "traps": [
        "Computing 24·3/5 (inverts the ratio) → 14.4, nonsense"
      ],
      "solveSteps": [
        "1. Scale = known / its ratio part",
        "2. Multiply the other part by the scale"
      ]
    }
  },
  "202": {
    "hint": "Parts = 7+3 = 10. Flour = 7/10 · 30 = 21.",
    "theory": {
      "title": "Ratios — Share of a Total",
      "icon": "🔢",
      "summary": "Add the ratio parts to get the whole, then take the asked component's fraction of the total quantity.",
      "keyFacts": [
        "Total parts = 7 + 3 = 10",
        "Flour fraction = 7/10",
        "Flour = (7/10)·30 = 21 cups",
        "Sugar would be (3/10)·30 = 9 (checks: 21+9=30)"
      ],
      "example": {
        "problem": "Flour:sugar 7:3, total 30 cups; flour?",
        "steps": [
          "Parts total 10",
          "7/10 · 30 = 21 → C"
        ],
        "answer": "C (21)"
      },
      "traps": [
        "Using 7/3 of something instead of 7/10 of the total"
      ],
      "solveSteps": [
        "1. Sum the parts",
        "2. Component/total-parts × quantity"
      ]
    }
  },
  "203": {
    "hint": "Parts = 3+5 = 8; each part = 40/8 = 5; blue = 5·5 = 25.",
    "theory": {
      "title": "Ratios — Value Per Part",
      "icon": "🔢",
      "summary": "Total ÷ sum-of-parts gives the value of one part; multiply by the asked component's part count.",
      "keyFacts": [
        "red:blue = 3:5 → 8 parts",
        "Per part = 40/8 = 5 marbles",
        "Blue = 5 parts × 5 = 25",
        "Red = 3·5 = 15 (15+25=40 ✓)"
      ],
      "example": {
        "problem": "3:5 red:blue, 40 total; blue?",
        "steps": [
          "8 parts, each = 5",
          "Blue = 5·5 = 25 → D"
        ],
        "answer": "D (25)"
      },
      "traps": [
        "Taking 5/3 ·something or using 3 parts for blue"
      ],
      "solveSteps": [
        "1. Per part = total / Σparts",
        "2. Component count × per-part"
      ]
    }
  },
  "204": {
    "hint": "Common denominator 6: 5/6 − 2/6 = 3/6 = 1/2.",
    "theory": {
      "title": "Fractions — Subtraction via Common Denominator",
      "icon": "🔢",
      "summary": "Convert to a common denominator, subtract numerators, simplify.",
      "keyFacts": [
        "LCD(6,3) = 6",
        "1/3 = 2/6",
        "5/6 − 2/6 = 3/6",
        "Simplify 3/6 = 1/2"
      ],
      "example": {
        "problem": "5/6 − 1/3?",
        "steps": [
          "1/3 → 2/6",
          "5/6 − 2/6 = 3/6 = 1/2 → C"
        ],
        "answer": "C (1/2)"
      },
      "traps": [
        "Subtracting denominators too (5/6−1/3 ≠ 4/3)"
      ],
      "solveSteps": [
        "1. LCD",
        "2. Rewrite both fractions",
        "3. Subtract numerators, simplify"
      ]
    }
  },
  "205": {
    "hint": "'What fraction of A is B' = B ÷ A = (1/2)÷(3/4) = 2/3.",
    "theory": {
      "title": "Fractions — 'What Fraction Of' = Divide",
      "icon": "🔢",
      "summary": "'What fraction of A is B' means B/A — divide the part by the whole (multiply by the reciprocal).",
      "keyFacts": [
        "Setup: answer = B ÷ A = (1/2) ÷ (3/4)",
        "Divide → multiply by reciprocal: (1/2)·(4/3)",
        "= 4/6 = 2/3",
        "Order matters: it's B/A, not A/B"
      ],
      "example": {
        "problem": "What fraction of 3/4 is 1/2?",
        "steps": [
          "(1/2) ÷ (3/4) = (1/2)(4/3)",
          "= 2/3 → B"
        ],
        "answer": "B (2/3)"
      },
      "traps": [
        "Computing (3/4)÷(1/2)=3/2 by reversing the order"
      ],
      "solveSteps": [
        "1. 'fraction of A is B' → B/A",
        "2. Divide = ×reciprocal",
        "3. Simplify"
      ]
    }
  },
  "206": {
    "hint": "Remaining 1/3 = 8 gal → full = 8·3 = 24.",
    "theory": {
      "title": "Fractions — Back Out the Whole From a Part",
      "icon": "🔢",
      "summary": "If 2/3 is filled, the missing 1/3 equals the stated top-up. Whole = top-up ÷ (missing fraction).",
      "keyFacts": [
        "Filled = 2/3 → empty = 1/3",
        "Empty portion = 8 gallons = 1/3 of capacity",
        "Capacity = 8 ÷ (1/3) = 24",
        "Check: 2/3·24 = 16 filled, +8 = 24 ✓"
      ],
      "example": {
        "problem": "2/3 full, 8 gal more fills it; capacity?",
        "steps": [
          "1/3 = 8",
          "Full = 8·3 = 24 → D"
        ],
        "answer": "D (24)"
      },
      "traps": [
        "Treating 8 as 2/3 of the tank → 12, the wrong direction"
      ],
      "solveSteps": [
        "1. Missing fraction = 1 − filled",
        "2. Whole = amount / missing fraction"
      ]
    }
  },
  "207": {
    "hint": "0.15 × 240 = 36.",
    "theory": {
      "title": "Percents — Percent Of a Number",
      "icon": "🔢",
      "summary": "'p% of N' = (p/100)·N. Convert to a decimal and multiply.",
      "keyFacts": [
        "15% = 0.15",
        "0.15 × 240 = 36",
        "Sanity: 10% = 24, 5% = 12, sum = 36",
        "Percent → divide by 100 before multiplying"
      ],
      "example": {
        "problem": "15% of 240?",
        "steps": [
          "10% = 24, 5% = 12",
          "24 + 12 = 36 → D"
        ],
        "answer": "D (36)"
      },
      "traps": [
        "Multiplying by 15 (not 0.15) → 3600"
      ],
      "solveSteps": [
        "1. p/100",
        "2. × N",
        "3. Sanity-check with 10%/5% blocks"
      ]
    }
  },
  "208": {
    "hint": "Discount% = drop / ORIGINAL = 20/80 = 25%.",
    "theory": {
      "title": "Percents — Discount Off the Original",
      "icon": "🔢",
      "summary": "Percent discount is the price drop divided by the ORIGINAL price (not the sale price).",
      "keyFacts": [
        "Drop = 80 − 60 = 20",
        "Discount% = 20 / 80 = 0.25 = 25%",
        "Base is the original 80, not the sale 60",
        "20/60 = 33% would answer a different question (markup)"
      ],
      "example": {
        "problem": "$80 → $60; percent discount?",
        "steps": [
          "Drop = 20",
          "20/80 = 25% → C"
        ],
        "answer": "C (25%)"
      },
      "traps": [
        "Dividing the drop by the sale price (20/60 ≈ 33%)"
      ],
      "solveSteps": [
        "1. Drop = original − new",
        "2. ÷ original",
        "3. ×100"
      ]
    }
  },
  "209": {
    "hint": "Successive discounts MULTIPLY: 0.75 × 0.80 = 0.60 → 60%.",
    "theory": {
      "title": "Percents — Successive Discounts",
      "icon": "🔢",
      "summary": "Chained discounts multiply the surviving fractions; they do NOT add. Each discount acts on the already-reduced price.",
      "keyFacts": [
        "25% off → ×0.75 remains",
        "20% off → ×0.80 remains",
        "Final = 0.75 × 0.80 = 0.60 → 60% of original",
        "Adding 25+20=45 (→55%) is wrong"
      ],
      "example": {
        "problem": "25% then 20% off; final % of original?",
        "steps": [
          "0.75 · 0.80 = 0.60",
          "→ 60% → B"
        ],
        "answer": "B (60%)"
      },
      "traps": [
        "Adding the discounts to 45% (gives 55% remaining) — they compound, not add"
      ],
      "solveSteps": [
        "1. Each discount → (1 − rate) factor",
        "2. Multiply the factors",
        "3. Result = % of original"
      ]
    }
  },
  "210": {
    "hint": "1–49: mult2=24, mult3=16, mult6=8. Either=32. Neither=49−32=17.",
    "theory": {
      "title": "Counting — Not Divisible by 2 or 3 (Inclusion–Exclusion)",
      "icon": "🔢",
      "summary": "Count multiples of 2 and 3, subtract the overlap (multiples of 6), subtract from the total.",
      "keyFacts": [
        "Integers 1–49: total 49",
        "⌊49/2⌋=24, ⌊49/3⌋=16, ⌊49/6⌋=8",
        "Divisible by 2 OR 3 = 24+16−8 = 32",
        "Neither = 49 − 32 = 17"
      ],
      "example": {
        "problem": "Positive ints < 50 not divisible by 2 or 3?",
        "steps": [
          "div2=24, div3=16, div6=8",
          "either = 32; 49−32 = 17 → D"
        ],
        "answer": "D (17)"
      },
      "traps": [
        "Forgetting to subtract multiples of 6 (double-counted) → 49−40=9"
      ],
      "solveSteps": [
        "1. ⌊N/2⌋ + ⌊N/3⌋ − ⌊N/6⌋",
        "2. Total − that"
      ]
    }
  },
  "211": {
    "hint": "7 ≡ −1 (mod 4). (−1)^100 = 1. Remainder 1.",
    "theory": {
      "title": "Remainders — Reduce the Base First",
      "icon": "🔢",
      "summary": "Replace the base with its small residue mod m before taking the power. 7 ≡ −1 (mod 4), so the parity of the exponent decides everything.",
      "keyFacts": [
        "7 mod 4 = 3 ≡ −1 (mod 4)",
        "(−1)^even = 1; (−1)^odd = −1 ≡ 3",
        "Exponent 100 is even → 7^100 ≡ 1 (mod 4)",
        "Using −1 instead of 3 makes the power trivial"
      ],
      "example": {
        "problem": "Remainder of 7^100 ÷ 4?",
        "steps": [
          "7 ≡ −1 (mod 4)",
          "(−1)^100 = 1 → B"
        ],
        "answer": "B (1)"
      },
      "traps": [
        "Computing huge powers directly instead of reducing the base mod 4"
      ],
      "solveSteps": [
        "1. base mod m (prefer ±1 forms)",
        "2. Apply the exponent to the residue",
        "3. Normalize to 0..m−1"
      ]
    }
  },
  "212": {
    "hint": "Scale both by 100: 0.6/0.02 = 60/2 = 30.",
    "theory": {
      "title": "Decimals — Clear Decimals by Scaling",
      "icon": "🔢",
      "summary": "Multiply numerator and denominator by the same power of 10 so the division becomes whole numbers.",
      "keyFacts": [
        "Multiply top & bottom by 100: 0.6→60, 0.02→2",
        "60 ÷ 2 = 30",
        "Dividing by a number <1 makes the result larger",
        "Equivalent: 0.6 × (1/0.02) = 0.6 × 50 = 30"
      ],
      "example": {
        "problem": "0.6 ÷ 0.02?",
        "steps": [
          "×100/×100 → 60/2",
          "= 30 → C"
        ],
        "answer": "C (30)"
      },
      "traps": [
        "Expecting a small answer because of decimals — dividing by 0.02 multiplies by 50"
      ],
      "solveSteps": [
        "1. Scale both by 10^k to clear decimals",
        "2. Do the integer division"
      ]
    }
  },
  "213": {
    "hint": "2^x=32 → x=5. 2^(x+2)=2^x·4 = 32·4 = 128.",
    "theory": {
      "title": "Exponents — Shift the Exponent",
      "icon": "🔢",
      "summary": "2^(x+2) = 2^x · 2² — you don't even need x; multiply the known power by 4.",
      "keyFacts": [
        "2^x = 32 = 2⁵ → x = 5",
        "2^(x+2) = 2^x · 2² = 32 · 4 = 128",
        "Adding 2 to the exponent multiplies by 2²",
        "= 2⁷ = 128"
      ],
      "example": {
        "problem": "2^x=32; 2^(x+2)?",
        "steps": [
          "2^x = 32",
          "×2² = ×4 → 128 → C"
        ],
        "answer": "C (128)"
      },
      "traps": [
        "Adding instead of multiplying: 32 + 4 = 36 (not how exponents work)"
      ],
      "solveSteps": [
        "1. a^(x+k) = a^x · a^k",
        "2. Multiply the known value by a^k"
      ]
    }
  },
  "214": {
    "hint": "3^(x+2)=9·3^x. Set 9·3^x = 27·3^x·k → k = 9/27 = 1/3.",
    "theory": {
      "title": "Exponents — Cancel the Common Power",
      "icon": "🔢",
      "summary": "Express both sides with 3^x as a common factor, then it cancels and you solve for k from the constants.",
      "keyFacts": [
        "3^(x+2) = 3² · 3^x = 9·3^x",
        "Equation: 9·3^x = 27·3^x·k",
        "Divide by 3^x: 9 = 27k",
        "k = 9/27 = 1/3"
      ],
      "example": {
        "problem": "3^(x+2) = 27·3^x·k; k?",
        "steps": [
          "LHS = 9·3^x",
          "9 = 27k → k = 1/3 → B"
        ],
        "answer": "B (1/3)"
      },
      "traps": [
        "Getting k=3 by flipping 9/27 to 27/9"
      ],
      "solveSteps": [
        "1. Rewrite each side as constant · 3^x",
        "2. Cancel 3^x",
        "3. Solve the constant equation"
      ]
    }
  },
  "215": {
    "hint": "LCM via prime powers: max(2³, 3, 5) = 8·3·5 = 120.",
    "theory": {
      "title": "LCM — Highest Power of Each Prime",
      "icon": "🔢",
      "summary": "The LCM takes the greatest power of every prime appearing in any number.",
      "keyFacts": [
        "6 = 2·3, 8 = 2³, 15 = 3·5",
        "Primes: 2 (max power 2³), 3 (3¹), 5 (5¹)",
        "LCM = 2³·3·5 = 120",
        "Not 6·8·15 = 720 (over-counts shared primes)"
      ],
      "example": {
        "problem": "Smallest int divisible by 6, 8, 15?",
        "steps": [
          "2³ from 8, 3 from 6/15, 5 from 15",
          "8·3·5 = 120 → C"
        ],
        "answer": "C (120)"
      },
      "traps": [
        "Multiplying all three numbers (720) instead of taking max prime powers"
      ],
      "solveSteps": [
        "1. Prime-factor each",
        "2. Take the highest power of each prime",
        "3. Multiply"
      ]
    }
  },
  "216": {
    "hint": "5x−3=22 → 5x=25 → x=5.",
    "theory": {
      "title": "Linear — Isolate in Two Steps",
      "icon": "🔢",
      "summary": "Undo the operations in reverse order: add the constant, then divide by the coefficient.",
      "keyFacts": [
        "5x − 3 = 22",
        "Add 3: 5x = 25",
        "Divide by 5: x = 5",
        "Check: 5·5−3 = 22 ✓"
      ],
      "example": {
        "problem": "5x − 3 = 22; x?",
        "steps": [
          "5x = 25",
          "x = 5 → C"
        ],
        "answer": "C (5)"
      },
      "traps": [
        "Dividing before adding 3 (mishandles order of inverse operations)"
      ],
      "solveSteps": [
        "1. Move the constant",
        "2. Divide by the coefficient",
        "3. Back-check"
      ]
    }
  },
  "217": {
    "hint": "Divide by 3 first: x+2=7 → x=5.",
    "theory": {
      "title": "Linear — Divide Out the Factor First",
      "icon": "🔢",
      "summary": "When one factor multiplies a bracket, dividing both sides by it is the fastest first move.",
      "keyFacts": [
        "3(x+2) = 21",
        "Divide by 3: x+2 = 7",
        "x = 5",
        "Distributing (3x+6=21) also works but is slower"
      ],
      "example": {
        "problem": "3(x+2)=21; x?",
        "steps": [
          "x+2 = 7",
          "x = 5 → B"
        ],
        "answer": "B (5)"
      },
      "traps": [
        "Distributing then forgetting the +6 → 3x=21 → x=7 (wrong)"
      ],
      "solveSteps": [
        "1. Divide both sides by the outside factor",
        "2. Solve the simple linear equation"
      ]
    }
  },
  "218": {
    "hint": "Cross-multiply: 5(x−2)=3(x+4) → 2x=22 → x=11.",
    "theory": {
      "title": "Proportions — Cross-Multiply",
      "icon": "🔢",
      "summary": "An equation of two fractions clears via cross-multiplication, then solve the resulting linear equation.",
      "keyFacts": [
        "(x−2)/3 = (x+4)/5",
        "Cross: 5(x−2) = 3(x+4)",
        "5x−10 = 3x+12 → 2x = 22",
        "x = 11"
      ],
      "example": {
        "problem": "(x−2)/3 = (x+4)/5; x?",
        "steps": [
          "5(x−2)=3(x+4)",
          "2x=22 → x=11 → B"
        ],
        "answer": "B (11)"
      },
      "traps": [
        "Multiplying only one side by a denominator (must cross both)"
      ],
      "solveSteps": [
        "1. Cross-multiply",
        "2. Expand both sides",
        "3. Collect and solve"
      ]
    }
  },
  "219": {
    "hint": "Add → 2x=16 → x=8; subtract → y=4. xy=32. Don't stop at x+y.",
    "theory": {
      "title": "Systems — Solve Then Multiply",
      "icon": "🔢",
      "summary": "Sum and difference equations give x and y immediately; the question wants the product, so finish the multiplication.",
      "keyFacts": [
        "x+y=12, x−y=4",
        "Add: 2x=16 → x=8",
        "Then y = 12−8 = 4",
        "xy = 8·4 = 32 (not 12 or 4)"
      ],
      "example": {
        "problem": "x+y=12, x−y=4; xy?",
        "steps": [
          "x=8, y=4",
          "xy = 32 → D"
        ],
        "answer": "D (32)"
      },
      "traps": [
        "Answering 12 (that's x+y) instead of the product"
      ],
      "solveSteps": [
        "1. Add/subtract for x and y",
        "2. Compute the asked product"
      ]
    }
  },
  "220": {
    "hint": "Add equations → 8x=32 → x=4 → y=2 → x+y=6.",
    "theory": {
      "title": "Systems — Elimination by Adding",
      "icon": "🔢",
      "summary": "Opposite y-coefficients (+2y, −2y) cancel on addition; solve x, back-substitute, then form x+y.",
      "keyFacts": [
        "3x+2y=16, 5x−2y=16",
        "Add: 8x = 32 → x = 4",
        "12 + 2y = 16 → y = 2",
        "x+y = 6"
      ],
      "example": {
        "problem": "3x+2y=16, 5x−2y=16; x+y?",
        "steps": [
          "Add → 8x=32 → x=4",
          "y=2 → x+y=6 → B"
        ],
        "answer": "B (6)"
      },
      "traps": [
        "Subtracting (keeps both y terms) instead of adding to cancel them"
      ],
      "solveSteps": [
        "1. Add to cancel the opposite term",
        "2. Solve x, back-substitute y",
        "3. Form the asked combination"
      ]
    }
  },
  "221": {
    "hint": "3x−5>7 → 3x>12 → x>4. Strict, no equality.",
    "theory": {
      "title": "Inequalities — Solve Like an Equation (Positive Divide)",
      "icon": "🔢",
      "summary": "Dividing by a positive number keeps the inequality direction. The result is strict (>) because the original was strict.",
      "keyFacts": [
        "3x − 5 > 7 → 3x > 12",
        "Divide by +3 (direction unchanged): x > 4",
        "Strict > → x = 4 is NOT included",
        "Answer set: x > 4"
      ],
      "example": {
        "problem": "3x − 5 > 7?",
        "steps": [
          "3x > 12",
          "x > 4 → C"
        ],
        "answer": "C (x > 4)"
      },
      "traps": [
        "Writing x ≥ 4 — the inequality is strict"
      ],
      "solveSteps": [
        "1. Isolate the x-term",
        "2. Divide by the positive coefficient (keep direction)",
        "3. Keep strictness"
      ]
    }
  },
  "222": {
    "hint": "−2x+5≥11 → −2x≥6 → divide by −2 FLIPS → x≤−3. Largest = −3.",
    "theory": {
      "title": "Inequalities — Flip When Dividing by a Negative",
      "icon": "🔢",
      "summary": "Dividing (or multiplying) both sides by a negative number reverses the inequality sign. The 'largest x' is the boundary.",
      "keyFacts": [
        "−2x + 5 ≥ 11 → −2x ≥ 6",
        "Divide by −2 → sign flips: x ≤ −3",
        "Largest value satisfying x ≤ −3 is −3",
        "≤ keeps the endpoint −3 included"
      ],
      "example": {
        "problem": "−2x+5 ≥ 11; largest x?",
        "steps": [
          "−2x ≥ 6",
          "x ≤ −3 → largest = −3 → A"
        ],
        "answer": "A (−3)"
      },
      "traps": [
        "Not flipping the sign → x ≥ −3 → wrongly picking a large positive answer"
      ],
      "solveSteps": [
        "1. Isolate the −2x term",
        "2. Divide by negative → FLIP sign",
        "3. Read the extreme value"
      ]
    }
  },
  "223": {
    "hint": "|x−5|<3 → 2<x<8. Integers 3,4,5,6,7 → 5 values (endpoints excluded).",
    "theory": {
      "title": "Absolute Value — Distance Band, Count Integers",
      "icon": "🔢",
      "summary": "|x−5|<3 means x is within 3 of 5: an open interval (2,8). Count integers strictly inside.",
      "keyFacts": [
        "|x−5|<3 ⇔ −3 < x−5 < 3 ⇔ 2 < x < 8",
        "Strict < → 2 and 8 excluded",
        "Integers: 3,4,5,6,7",
        "Count = 5"
      ],
      "example": {
        "problem": "Integer x with |x−5|<3?",
        "steps": [
          "2 < x < 8",
          "{3,4,5,6,7} → 5 → C"
        ],
        "answer": "C (5)"
      },
      "traps": [
        "Including 2 and 8 (would need ≤, not <) → wrongly counting 7"
      ],
      "solveSteps": [
        "1. |x−c|<r → c−r < x < c+r",
        "2. Exclude endpoints (strict)",
        "3. Count integers inside"
      ]
    }
  },
  "224": {
    "hint": "Product of roots = c/a = 8/1 = 8 (Vieta). No need to solve.",
    "theory": {
      "title": "Quadratics — Product of Roots (Vieta)",
      "icon": "🔢",
      "summary": "For ax²+bx+c=0, roots multiply to c/a. Read it off the constant term.",
      "keyFacts": [
        "x²−6x+8: a=1, c=8",
        "Product = c/a = 8",
        "Factor check: (x−2)(x−4) → 2·4 = 8 ✓",
        "Sum would be −b/a = 6 (different question)"
      ],
      "example": {
        "problem": "Product of roots of x²−6x+8=0?",
        "steps": [
          "Identify a=1, c=8",
          "Product = c/a = 8/1 = 8 → D"
        ],
        "answer": "D (8)"
      },
      "traps": [
        "Reporting the sum (6) or sign-flipping to −8"
      ],
      "solveSteps": [
        "1. Identify a, c",
        "2. Product = c/a"
      ]
    }
  },
  "225": {
    "hint": "Sum of roots = −b/a = 7 → b = −7.",
    "theory": {
      "title": "Quadratics — Solve b From Root Sum",
      "icon": "🔢",
      "summary": "Sum of roots = −b/a. Given the sum, invert to find b.",
      "keyFacts": [
        "x²+bx+12: a=1, sum of roots = −b",
        "Given sum = 7 → −b = 7",
        "b = −7",
        "(Product 12 is consistent: roots 3,4 → sum 7, product 12)"
      ],
      "example": {
        "problem": "x²+bx+12=0, root sum 7; b?",
        "steps": [
          "−b/a = 7 → −b = 7",
          "b = −7 → B"
        ],
        "answer": "B (−7)"
      },
      "traps": [
        "Forgetting the minus sign → b = 7"
      ],
      "solveSteps": [
        "1. Sum = −b/a",
        "2. Solve for b (mind the sign)"
      ]
    }
  },
  "226": {
    "hint": "3 consecutive sum 54 → middle = 18 → largest 19.",
    "theory": {
      "title": "Word Problems — Consecutive Integers Around the Mean",
      "icon": "🔢",
      "summary": "Three consecutive integers are symmetric around the middle one, so the middle = sum/3. Largest = middle + 1.",
      "keyFacts": [
        "n−1, n, n+1 sum to 3n",
        "3n = 54 → n = 18 (the middle)",
        "Largest = n+1 = 19",
        "Smallest would be 17"
      ],
      "example": {
        "problem": "3 consecutive ints sum 54; largest?",
        "steps": [
          "Middle = 54/3 = 18",
          "Largest = 19 → C"
        ],
        "answer": "C (19)"
      },
      "traps": [
        "Reporting the middle (18) instead of the largest"
      ],
      "solveSteps": [
        "1. Middle = sum / count",
        "2. Largest = middle + 1"
      ]
    }
  },
  "227": {
    "hint": "x+1/x=10/3 → 3x²−10x+3=0 → (3x−1)(x−3) → x=3 (larger).",
    "theory": {
      "title": "Word Problems — Number Plus Its Reciprocal",
      "icon": "🔢",
      "summary": "Clear the reciprocal by multiplying through by x, forming a quadratic; both roots are reciprocals of each other.",
      "keyFacts": [
        "x + 1/x = 10/3 → multiply by 3x: 3x²+3 = 10x",
        "3x² − 10x + 3 = 0 → (3x−1)(x−3)=0",
        "Roots x = 1/3 or 3 (reciprocal pair)",
        "Larger = 3"
      ],
      "example": {
        "problem": "Number + reciprocal = 10/3; larger value?",
        "steps": [
          "3x²−10x+3=0",
          "x = 1/3 or 3 → larger 3 → E"
        ],
        "answer": "E (3)"
      },
      "traps": [
        "Stopping at x=1/3 (the smaller root) — question asks the larger"
      ],
      "solveSteps": [
        "1. ×x to clear the reciprocal",
        "2. Solve the quadratic",
        "3. Pick the requested root"
      ]
    }
  },
  "228": {
    "hint": "2n = 3n − 10 → n = 10.",
    "theory": {
      "title": "Word Problems — Translate the Sentence Literally",
      "icon": "🔢",
      "summary": "'Twice a number is 10 less than three times it' → 2n = 3n − 10. Solve.",
      "keyFacts": [
        "'twice' = 2n; 'three times' = 3n",
        "'10 less than 3n' = 3n − 10",
        "2n = 3n − 10 → n = 10",
        "Check: 2·10=20, 3·10−10=20 ✓"
      ],
      "example": {
        "problem": "2n is 10 less than 3n; n?",
        "steps": [
          "2n = 3n − 10",
          "n = 10 → C"
        ],
        "answer": "C (10)"
      },
      "traps": [
        "Writing '10 less than 3n' as 10 − 3n (reversed)"
      ],
      "solveSteps": [
        "1. Translate each phrase to algebra",
        "2. '10 less than X' = X − 10",
        "3. Solve"
      ]
    }
  },
  "229": {
    "hint": "f(4)=2·4²−3 = 2·16−3 = 29. Square before multiplying.",
    "theory": {
      "title": "Functions — Order of Operations in Evaluation",
      "icon": "🔢",
      "summary": "Substitute, then apply exponent before multiplication (PEMDAS): 2·4² = 2·16, not (2·4)².",
      "keyFacts": [
        "f(x) = 2x² − 3",
        "4² = 16 first",
        "2·16 = 32, then −3",
        "f(4) = 29"
      ],
      "example": {
        "problem": "f(x)=2x²−3; f(4)?",
        "steps": [
          "4² = 16",
          "2·16−3 = 29 → C"
        ],
        "answer": "C (29)"
      },
      "traps": [
        "Computing (2·4)² = 64 → squaring after multiplying"
      ],
      "solveSteps": [
        "1. Substitute x",
        "2. Exponent before multiply (PEMDAS)",
        "3. Finish constants"
      ]
    }
  },
  "230": {
    "hint": "Inside-out: g(3)=9, then f(9)=9+2=11.",
    "theory": {
      "title": "Functions — Composition Evaluated Inside-Out",
      "icon": "🔢",
      "summary": "f(g(3)) means apply g first, feed the result into f. Innermost function evaluates first.",
      "keyFacts": [
        "g(x)=x² → g(3)=9",
        "f(x)=x+2 → f(9)=11",
        "Order matters: f(g(3)) ≠ g(f(3))",
        "g(f(3)) would be (3+2)²=25 (a decoy)"
      ],
      "example": {
        "problem": "f(x)=x+2, g(x)=x²; f(g(3))?",
        "steps": [
          "g(3)=9",
          "f(9)=11 → C"
        ],
        "answer": "C (11)"
      },
      "traps": [
        "Doing f first: (3+2)² = 25 (wrong composition order)"
      ],
      "solveSteps": [
        "1. Evaluate the inner function",
        "2. Feed into the outer function"
      ]
    }
  },
  "231": {
    "hint": "Same base: add exponents on multiply, subtract on divide → 2+5−3 = 4.",
    "theory": {
      "title": "Exponents — Combine Like Bases",
      "icon": "🔢",
      "summary": "With one base: xᵃ·xᵇ = xᵃ⁺ᵇ and xᵃ/xᵇ = xᵃ⁻ᵇ. Just track the exponent arithmetic.",
      "keyFacts": [
        "x²·x⁵ = x⁷ (add)",
        "x⁷ / x³ = x⁴ (subtract)",
        "k = 2 + 5 − 3 = 4",
        "Never multiply the exponents here"
      ],
      "example": {
        "problem": "(x²·x⁵)/x³ = x^k; k?",
        "steps": [
          "Numerator → x⁷",
          "÷x³ → x⁴ → k=4 → C"
        ],
        "answer": "C (4)"
      },
      "traps": [
        "Multiplying exponents (2·5) instead of adding"
      ],
      "solveSteps": [
        "1. Multiply → add exponents",
        "2. Divide → subtract exponents",
        "3. Read k"
      ]
    }
  },
  "232": {
    "hint": "1/y = 1/2 − 1/6 = 1/3 → y = 3. Solve the reciprocal last.",
    "theory": {
      "title": "Equations — Solve for a Reciprocal Then Invert",
      "icon": "🔢",
      "summary": "Isolate 1/y first using a common denominator, then take the reciprocal to get y.",
      "keyFacts": [
        "1/6 + 1/y = 1/2",
        "1/y = 1/2 − 1/6 = 3/6 − 1/6 = 2/6 = 1/3",
        "y = reciprocal of 1/3 = 3",
        "Common denominator 6 makes the subtraction clean"
      ],
      "example": {
        "problem": "1/x+1/y=1/2, x=6; y?",
        "steps": [
          "1/y = 1/2 − 1/6 = 1/3",
          "y = 3 → B"
        ],
        "answer": "B (3)"
      },
      "traps": [
        "Forgetting to invert: leaving the answer as 1/3 instead of 3"
      ],
      "solveSteps": [
        "1. Isolate 1/y",
        "2. Subtract with a common denominator",
        "3. Invert for y"
      ]
    }
  },
  "233": {
    "hint": "Two equations: p+q=0.55, 2p+3q=1.40. Substitute → q=0.30.",
    "theory": {
      "title": "Systems — Two-Item Pricing",
      "icon": "🔢",
      "summary": "Set variables for each item, write both purchase equations, substitute to eliminate one.",
      "keyFacts": [
        "p + q = 0.55 → p = 0.55 − q",
        "2p + 3q = 1.40",
        "2(0.55−q) + 3q = 1.40 → 1.10 + q = 1.40",
        "q = 0.30 (pen)"
      ],
      "example": {
        "problem": "2 pencil+3 pen=$1.40, 1+1=$0.55; pen?",
        "steps": [
          "p = 0.55 − q",
          "1.10 + q = 1.40 → q = 0.30 → C"
        ],
        "answer": "C ($0.30)"
      },
      "traps": [
        "Solving for pencil and reporting it; the question asks the pen"
      ],
      "solveSteps": [
        "1. Assign p, q; write both equations",
        "2. Substitute one into the other",
        "3. Answer the variable asked"
      ]
    }
  },
  "234": {
    "hint": "x²=49 → x=±7 → 2 distinct real values.",
    "theory": {
      "title": "Quadratics — Square Roots Come in Pairs",
      "icon": "🔢",
      "summary": "x² = k (k>0) has TWO real solutions: +√k and −√k.",
      "keyFacts": [
        "x² = 49 → x = +7 or −7",
        "Two distinct real values",
        "Only x²=0 gives a single value (0)",
        "x²=negative → 0 real values"
      ],
      "example": {
        "problem": "x²=49; how many real x?",
        "steps": [
          "x = ±7",
          "2 values → C"
        ],
        "answer": "C (2)"
      },
      "traps": [
        "Answering 1 (taking only the positive root)"
      ],
      "solveSteps": [
        "1. x² = k>0 → ±√k",
        "2. Count both"
      ]
    }
  },
  "235": {
    "hint": "Fix y, count x in (y, 9−y]: y=1→7, 2→5, 3→3, 4→1. Sum 16.",
    "theory": {
      "title": "Counting — Lattice Pairs Under Constraints",
      "icon": "🔢",
      "summary": "For each y, x must satisfy both x>y and x+y<10, giving x from y+1 to 9−y. Sum the counts.",
      "keyFacts": [
        "x range: y+1 ≤ x ≤ 9−y (positive integers)",
        "y=1: x∈{2..8} → 7",
        "y=2: 5; y=3: 3; y=4: 1; y=5 gives empty (6..4)",
        "Total = 7+5+3+1 = 16"
      ],
      "example": {
        "problem": "x,y>0, x+y<10, x>y; ordered pairs?",
        "steps": [
          "Per-y counts: 7,5,3,1",
          "Sum = 16 → A"
        ],
        "answer": "A (16)"
      },
      "traps": [
        "Allowing x=y (constraint is strict x>y) or x+y=10 (strict <10)"
      ],
      "solveSteps": [
        "1. Express x-range in terms of y",
        "2. Count integers per y",
        "3. Sum until the range is empty"
      ]
    }
  },
  "236": {
    "hint": "Right triangle area = ½·leg·leg = ½·5·12 = 30.",
    "theory": {
      "title": "Triangles — Legs Are the Base & Height",
      "icon": "📐",
      "summary": "In a right triangle the two legs are perpendicular, so they serve directly as base and height.",
      "keyFacts": [
        "Area = ½ · leg₁ · leg₂",
        "½ · 5 · 12 = 30",
        "Hypotenuse (13) is irrelevant to the area",
        "5-12-13 is a Pythagorean triple (the 13 is a decoy)"
      ],
      "example": {
        "problem": "Right triangle legs 5, 12; area?",
        "steps": [
          "½·5·12",
          "= 30 → B"
        ],
        "answer": "B (30)"
      },
      "traps": [
        "Using the hypotenuse as a side in the area formula"
      ],
      "solveSteps": [
        "1. Identify the two legs",
        "2. Area = ½·leg·leg"
      ]
    }
  },
  "237": {
    "hint": "√(9²+12²)=√225=15. Recognize 3-4-5 ×3.",
    "theory": {
      "title": "Triangles — Pythagoras & Triple Recognition",
      "icon": "📐",
      "summary": "Hypotenuse = √(a²+b²). Spot scaled Pythagorean triples to skip the arithmetic.",
      "keyFacts": [
        "9² + 12² = 81 + 144 = 225",
        "√225 = 15",
        "9-12-15 = 3·(3-4-5)",
        "Recognizing the triple gives 15 instantly"
      ],
      "example": {
        "problem": "Legs 9,12; hypotenuse?",
        "steps": [
          "3-4-5 scaled by 3 → 9-12-15",
          "Hypotenuse = 15 → C"
        ],
        "answer": "C (15)"
      },
      "traps": [
        "Adding 9+12=21 or guessing 13 (that's 5-12-13, wrong legs)"
      ],
      "solveSteps": [
        "1. c = √(a²+b²)",
        "2. Check for a known triple multiple"
      ]
    }
  },
  "238": {
    "hint": "Side = 18/3 = 6. Area = (√3/4)s² = (√3/4)·36 = 9√3.",
    "theory": {
      "title": "Triangles — Equilateral Area Formula",
      "icon": "📐",
      "summary": "Equilateral side = perimeter/3; area = (√3/4)·side².",
      "keyFacts": [
        "Side = 18/3 = 6",
        "Area = (√3/4)·s²",
        "= (√3/4)·36 = 9√3",
        "Don't use ½·base·height without the √3 height"
      ],
      "example": {
        "problem": "Equilateral perimeter 18; area?",
        "steps": [
          "Side = 6",
          "(√3/4)·36 = 9√3 → B"
        ],
        "answer": "B (9√3)"
      },
      "traps": [
        "Using ½·6·6 = 18 (ignores the 60° geometry / √3 factor)"
      ],
      "solveSteps": [
        "1. Side = perimeter/3",
        "2. Area = (√3/4)·side²"
      ]
    }
  },
  "239": {
    "hint": "C = 2πr = 2π·7 = 14π.",
    "theory": {
      "title": "Circles — Circumference From Radius",
      "icon": "📐",
      "summary": "C = 2πr (or πd). Plug the radius directly.",
      "keyFacts": [
        "C = 2πr",
        "2π·7 = 14π",
        "Equivalent: πd = π·14 = 14π",
        "Area would be πr² = 49π (different question)"
      ],
      "example": {
        "problem": "Radius 7; circumference?",
        "steps": [
          "Apply C = 2πr with r=7",
          "2π·7 = 14π → B"
        ],
        "answer": "B (14π)"
      },
      "traps": [
        "Using πr² = 49π (that's area, not circumference)"
      ],
      "solveSteps": [
        "1. C = 2πr",
        "2. Substitute r"
      ]
    }
  },
  "240": {
    "hint": "πr²=36π → r=6 → C=2πr=12π.",
    "theory": {
      "title": "Circles — Area → Radius → Circumference",
      "icon": "📐",
      "summary": "Back out the radius from the area, then compute circumference.",
      "keyFacts": [
        "πr² = 36π → r² = 36 → r = 6",
        "C = 2πr = 12π",
        "Two-step: area gives r, r gives C",
        "r is the bridge between the two formulas"
      ],
      "example": {
        "problem": "Area 36π; circumference?",
        "steps": [
          "r² = 36 → r = 6",
          "C = 2π·6 = 12π → C"
        ],
        "answer": "C (12π)"
      },
      "traps": [
        "Taking r=36 (skipped the square root)"
      ],
      "solveSteps": [
        "1. r = √(Area/π)",
        "2. C = 2πr"
      ]
    }
  },
  "241": {
    "hint": "r=8 → total 64π → /8 slices = 8π.",
    "theory": {
      "title": "Circles — Equal Sectors",
      "icon": "📐",
      "summary": "Each of n equal slices is (1/n) of the full circle's area. Use radius = diameter/2.",
      "keyFacts": [
        "Diameter 16 → radius 8",
        "Total area = π·8² = 64π",
        "One of 8 slices = 64π / 8 = 8π",
        "Diameter, not radius, is 16"
      ],
      "example": {
        "problem": "Pizza diameter 16, 8 slices; one slice area?",
        "steps": [
          "r=8, total = 64π",
          "64π/8 = 8π → B"
        ],
        "answer": "B (8π)"
      },
      "traps": [
        "Using r=16 → 256π/8 = 32π (used diameter as radius)"
      ],
      "solveSteps": [
        "1. r = d/2; total = πr²",
        "2. Divide by number of slices"
      ]
    }
  },
  "242": {
    "hint": "√(3²+4²)=√25=5. A 3-4-5.",
    "theory": {
      "title": "Coordinate — Distance Formula",
      "icon": "📐",
      "summary": "Distance = √[(Δx)² + (Δy)²]. Differences often form a Pythagorean triple.",
      "keyFacts": [
        "Δx = 4−1 = 3, Δy = 6−2 = 4",
        "√(3²+4²) = √25 = 5",
        "Classic 3-4-5",
        "Sign of the differences doesn't matter (squared)"
      ],
      "example": {
        "problem": "Distance (1,2)–(4,6)?",
        "steps": [
          "Δ = (3,4)",
          "√25 = 5 → C"
        ],
        "answer": "C (5)"
      },
      "traps": [
        "Adding differences 3+4=7 instead of the root of squares"
      ],
      "solveSteps": [
        "1. Δx, Δy",
        "2. √(Δx²+Δy²)"
      ]
    }
  },
  "243": {
    "hint": "Slope = Δy/Δx = (11−3)/(4−0) = 2.",
    "theory": {
      "title": "Coordinate — Slope Between Two Points",
      "icon": "📐",
      "summary": "Slope = rise/run = (y₂−y₁)/(x₂−x₁). Keep the point order consistent in numerator and denominator.",
      "keyFacts": [
        "Δy = 11 − 3 = 8",
        "Δx = 4 − 0 = 4",
        "Slope = 8/4 = 2",
        "Order must match top and bottom"
      ],
      "example": {
        "problem": "Slope through (0,3),(4,11)?",
        "steps": [
          "Δy = 11−3 = 8, Δx = 4−0 = 4",
          "8/4 = 2 → C"
        ],
        "answer": "C (2)"
      },
      "traps": [
        "Inverting to run/rise (Δx/Δy) → 1/2"
      ],
      "solveSteps": [
        "1. Δy/Δx with consistent order",
        "2. Simplify"
      ]
    }
  },
  "244": {
    "hint": "Plug the point: 13 = 3m+4 → m=3.",
    "theory": {
      "title": "Coordinate — Solve a Parameter From a Point",
      "icon": "📐",
      "summary": "If a point lies on the line, its coordinates satisfy the equation. Substitute and solve for the unknown.",
      "keyFacts": [
        "y = mx + 4; point (3,13)",
        "13 = 3m + 4",
        "3m = 9 → m = 3",
        "The 4 is the fixed y-intercept"
      ],
      "example": {
        "problem": "y=mx+4 through (3,13); m?",
        "steps": [
          "13 = 3m+4",
          "m = 3 → C"
        ],
        "answer": "C (3)"
      },
      "traps": [
        "Forgetting to subtract the intercept 4 before dividing"
      ],
      "solveSteps": [
        "1. Substitute the point",
        "2. Solve for the parameter"
      ]
    }
  },
  "245": {
    "hint": "P = 2(L+W) = 2(10+6) = 32.",
    "theory": {
      "title": "Rectangles — Perimeter",
      "icon": "📐",
      "summary": "Perimeter = 2(length + width). Add first, then double.",
      "keyFacts": [
        "L=10, W=6",
        "L+W = 16",
        "P = 2·16 = 32",
        "Area would be 60 (a decoy answer)"
      ],
      "example": {
        "problem": "Rectangle 10×6; perimeter?",
        "steps": [
          "L+W = 10+6 = 16",
          "P = 2·16 = 32 → C"
        ],
        "answer": "C (32)"
      },
      "traps": [
        "Computing area 60 instead of perimeter"
      ],
      "solveSteps": [
        "1. Sum length + width",
        "2. ×2"
      ]
    }
  },
  "246": {
    "hint": "w(w+4)=60 → w²+4w−60=0 → (w−6)(w+10) → w=6.",
    "theory": {
      "title": "Rectangles — Area Gives a Quadratic",
      "icon": "📐",
      "summary": "Express length in terms of width, set area equal, solve the quadratic, discard the negative root.",
      "keyFacts": [
        "L = w + 4; area w(w+4) = 60",
        "w² + 4w − 60 = 0",
        "(w−6)(w+10) = 0 → w = 6 or −10",
        "Width must be positive → w = 6"
      ],
      "example": {
        "problem": "Area 60, length = width+4; width?",
        "steps": [
          "w²+4w−60=0",
          "w = 6 (reject −10) → C"
        ],
        "answer": "C (6)"
      },
      "traps": [
        "Keeping the negative root −10 as a valid width"
      ],
      "solveSteps": [
        "1. L in terms of W; area equation",
        "2. Solve quadratic",
        "3. Discard non-physical root"
      ]
    }
  },
  "247": {
    "hint": "V = πr²h = π·9·10 = 90π.",
    "theory": {
      "title": "Solids — Cylinder Volume",
      "icon": "📐",
      "summary": "Cylinder volume = π r² h. Square the radius first, then multiply by height.",
      "keyFacts": [
        "r=3 → r² = 9",
        "V = π·9·10 = 90π",
        "Radius is squared, height is not",
        "Using r=3 once (not squared) gives 30π (decoy)"
      ],
      "example": {
        "problem": "Cylinder r=3, h=10; volume?",
        "steps": [
          "r²=9",
          "π·9·10 = 90π → C"
        ],
        "answer": "C (90π)"
      },
      "traps": [
        "Forgetting to square r → 30π"
      ],
      "solveSteps": [
        "1. r²",
        "2. ×h ×π"
      ]
    }
  },
  "248": {
    "hint": "45-45-90: leg = hyp/√2 = 10/√2 = 5√2.",
    "theory": {
      "title": "Triangles — 45-45-90 Ratios",
      "icon": "📐",
      "summary": "In a 45-45-90 triangle the sides are leg : leg : leg√2. So leg = hypotenuse / √2.",
      "keyFacts": [
        "Ratio 1 : 1 : √2",
        "Hypotenuse = leg·√2 = 10 → leg = 10/√2",
        "Rationalize: 10/√2 = 5√2",
        "Not 10/2 = 5 (that's dividing by 2, not √2)"
      ],
      "example": {
        "problem": "Isosceles right triangle, hyp 10; leg?",
        "steps": [
          "leg = 10/√2",
          "= 5√2 → B"
        ],
        "answer": "B (5√2)"
      },
      "traps": [
        "Dividing the hypotenuse by 2 instead of √2 (gives 5)"
      ],
      "solveSteps": [
        "1. Use ratio 1:1:√2",
        "2. leg = hyp/√2, rationalize"
      ]
    }
  },
  "249": {
    "hint": "(n−2)·180 = (6−2)·180 = 720°.",
    "theory": {
      "title": "Polygons — Interior Angle Sum",
      "icon": "📐",
      "summary": "Sum of interior angles of an n-gon = (n−2)·180°.",
      "keyFacts": [
        "Hexagon: n = 6",
        "(6−2)·180 = 4·180",
        "= 720°",
        "Triangle (n=3) is the base case: 180°"
      ],
      "example": {
        "problem": "Interior angle sum of a hexagon?",
        "steps": [
          "(6−2)·180",
          "= 720° → C"
        ],
        "answer": "C (720°)"
      },
      "traps": [
        "Using n·180 (forgets the −2) → 1080°"
      ],
      "solveSteps": [
        "1. (n−2)·180",
        "2. Evaluate"
      ]
    }
  },
  "250": {
    "hint": "Sum=(8−2)·180=1080; each = 1080/8 = 135°.",
    "theory": {
      "title": "Polygons — Regular Interior Angle",
      "icon": "📐",
      "summary": "Each interior angle of a regular n-gon = (n−2)·180 / n. (Or 180 − exterior, exterior = 360/n.)",
      "keyFacts": [
        "Sum = (8−2)·180 = 1080°",
        "Each = 1080 / 8 = 135°",
        "Check: exterior = 360/8 = 45°, 180−45 = 135 ✓",
        "108° is the pentagon value (a decoy)"
      ],
      "example": {
        "problem": "Each interior angle of a regular octagon?",
        "steps": [
          "Sum 1080°, ÷8",
          "= 135° → C"
        ],
        "answer": "C (135°)"
      },
      "traps": [
        "Dividing 1080 by (n−2)=6 instead of n=8"
      ],
      "solveSteps": [
        "1. Sum = (n−2)·180",
        "2. Divide by n",
        "3. Cross-check via 180 − 360/n"
      ]
    }
  },
  "251": {
    "hint": "Average speed = total distance / total time = 240/4 = 60.",
    "theory": {
      "title": "Rate — Basic Average Speed",
      "icon": "🚗",
      "summary": "Speed = distance ÷ time. Plug the totals directly.",
      "keyFacts": [
        "d = 240 mi, t = 4 h",
        "speed = d/t",
        "240 / 4 = 60 mph",
        "Units: miles per hour"
      ],
      "example": {
        "problem": "240 mi in 4 h; average speed?",
        "steps": [
          "Apply speed = distance / time",
          "240 / 4 = 60 → C"
        ],
        "answer": "C (60 mph)"
      },
      "traps": [
        "Multiplying 240·4 instead of dividing"
      ],
      "solveSteps": [
        "1. Identify total distance and time",
        "2. Divide d / t"
      ]
    }
  },
  "252": {
    "hint": "A's 1-h head start = 60 mi. Closing rate = 75−60 = 15. Time = 60/15 = 4.",
    "theory": {
      "title": "Rate — Catch-Up (Same Direction)",
      "icon": "🚗",
      "summary": "When chasing in the same direction, the gap closes at the speed DIFFERENCE. Find the head start, divide by the difference.",
      "keyFacts": [
        "A travels 1 h alone → 60 mi head start",
        "Closing rate = 75 − 60 = 15 mph",
        "Catch-up time = 60 / 15 = 4 h (from B's start)",
        "Same direction → subtract speeds (not add)"
      ],
      "example": {
        "problem": "A 60 mph, B 75 mph starts 1 h later; B catches A after?",
        "steps": [
          "Head start = 60·1 = 60 mi",
          "60 / (75−60) = 4 h → C"
        ],
        "answer": "C (4)"
      },
      "traps": [
        "Adding speeds (135) — that's for opposite directions, not catch-up"
      ],
      "solveSteps": [
        "1. Compute the head-start distance",
        "2. Closing rate = speed difference",
        "3. Time = head start / closing rate"
      ]
    }
  },
  "253": {
    "hint": "Down=30/2=15, Up=30/3=10. Current = (down−up)/2 = 2.5.",
    "theory": {
      "title": "Rate — Current From Down/Up Speeds",
      "icon": "🚤",
      "summary": "Downstream = boat+current, upstream = boat−current. Subtract and halve to isolate the current.",
      "keyFacts": [
        "Down speed = 30/2 = 15 mph",
        "Up speed = 30/3 = 10 mph",
        "current = (15 − 10)/2 = 2.5 mph",
        "boat = (15 + 10)/2 = 12.5 mph"
      ],
      "example": {
        "problem": "30 mi down in 2 h, up in 3 h; current?",
        "steps": [
          "Down=15, Up=10",
          "(15−10)/2 = 2.5 → C"
        ],
        "answer": "C (2.5 mph)"
      },
      "traps": [
        "Reporting 15−10 = 5 as the current (forgot to halve)"
      ],
      "solveSteps": [
        "1. Down & up speeds = dist/time",
        "2. current = (down − up)/2"
      ]
    }
  },
  "254": {
    "hint": "Whole job in 4 h → 1/4 per hour.",
    "theory": {
      "title": "Work — Rate Is the Reciprocal of Time",
      "icon": "🛠️",
      "summary": "If a whole task takes T hours, the per-hour rate is 1/T of the task.",
      "keyFacts": [
        "Time for full job = 4 h",
        "Rate = 1/4 per hour",
        "In 1 h → 1/4 of the room",
        "Rate and time are reciprocals"
      ],
      "example": {
        "problem": "Paints a room in 4 h; fraction in 1 h?",
        "steps": [
          "Rate = 1 / 4 per hour",
          "1 hour → 1/4 → C"
        ],
        "answer": "C (1/4)"
      },
      "traps": [
        "Answering 4 (the time) instead of 1/4 (the rate)"
      ],
      "solveSteps": [
        "1. Rate = 1 / total time",
        "2. Multiply by the hours asked"
      ]
    }
  },
  "255": {
    "hint": "Add rates: 1/6 + 1/3 = 1/2 → together 2 h.",
    "theory": {
      "title": "Work — Combined Rate",
      "icon": "🛠️",
      "summary": "Rates add when working together. Sum the per-hour fractions, then invert for the combined time.",
      "keyFacts": [
        "A = 1/6, B = 1/3 per hour",
        "Combined = 1/6 + 2/6 = 3/6 = 1/2",
        "Time = 1 / (1/2) = 2 h",
        "Combined time is less than either alone"
      ],
      "example": {
        "problem": "A 6 h, B 3 h; together?",
        "steps": [
          "1/6 + 1/3 = 1/2",
          "Time = 2 h → C"
        ],
        "answer": "C (2 h)"
      },
      "traps": [
        "Averaging the times (6+3)/2 = 4.5 instead of adding rates"
      ],
      "solveSteps": [
        "1. Sum the per-hour rates",
        "2. Invert the total rate"
      ]
    }
  },
  "256": {
    "hint": "Net = 1/4 − 1/6 = 1/12 → 12 h to fill.",
    "theory": {
      "title": "Work — Fill vs Drain (Net Rate)",
      "icon": "🛠️",
      "summary": "A draining pipe subtracts from the filling rate. Net = fill − drain, then invert.",
      "keyFacts": [
        "Fill A = 1/4, drain B = 1/6 per hour",
        "Net = 1/4 − 1/6 = 3/12 − 2/12 = 1/12",
        "Time = 1 / (1/12) = 12 h",
        "Net positive → tank still fills (just slower)"
      ],
      "example": {
        "problem": "Fill in 4 h, drain in 6 h, both open; fill time?",
        "steps": [
          "Net = 1/4 − 1/6 = 1/12",
          "Time = 12 h → C"
        ],
        "answer": "C (12 h)"
      },
      "traps": [
        "Adding the rates (1/4 + 1/6) instead of subtracting the drain"
      ],
      "solveSteps": [
        "1. Net = fill rate − drain rate",
        "2. Invert for time"
      ]
    }
  },
  "257": {
    "hint": "Salt = 50 mL stays; new volume 200 mL → 50/200 = 25%.",
    "theory": {
      "title": "Mixtures — Dilution Keeps Solute Constant",
      "icon": "⚗️",
      "summary": "Adding pure water changes total volume but not the amount of salt. New % = salt / new total.",
      "keyFacts": [
        "Salt = 50% of 100 mL = 50 mL",
        "Add 100 mL water → total 200 mL",
        "Concentration = 50/200 = 25%",
        "Solute amount unchanged by dilution"
      ],
      "example": {
        "problem": "100 mL of 50% + 100 mL water; new %?",
        "steps": [
          "Salt = 50 mL (unchanged)",
          "50 / 200 = 25% → D"
        ],
        "answer": "D (25%)"
      },
      "traps": [
        "Averaging 50% and 0% to 25% works here by luck — but always track solute, not average %"
      ],
      "solveSteps": [
        "1. Solute amount = original % · original volume",
        "2. New % = solute / new total volume"
      ]
    }
  },
  "258": {
    "hint": "Acid fixed at 10 mL; want 10/(50+x)=0.1 → x=50.",
    "theory": {
      "title": "Mixtures — Water to Reach a Target %",
      "icon": "⚗️",
      "summary": "Acid stays constant; set acid / (original + added water) = target fraction and solve.",
      "keyFacts": [
        "Acid = 20% of 50 = 10 mL (constant)",
        "Target: 10 / (50 + x) = 0.10",
        "50 + x = 100 → x = 50",
        "Halving concentration → doubling volume"
      ],
      "example": {
        "problem": "50 mL of 20% acid → 10%; water to add?",
        "steps": [
          "Acid = 10 mL",
          "10/(50+x) = 0.1 → x = 50 → D"
        ],
        "answer": "D (50 mL)"
      },
      "traps": [
        "Thinking you remove acid — only water is added; acid is fixed"
      ],
      "solveSteps": [
        "1. Solute = const",
        "2. solute/(orig+x) = target",
        "3. Solve x"
      ]
    }
  },
  "259": {
    "hint": "Alligation/balance: 4x + 7(30−x) = 5·30 → x=20.",
    "theory": {
      "title": "Mixtures — Weighted Cost Balance",
      "icon": "⚗️",
      "summary": "Total cost of components = total cost of the blend. Solve the linear equation for the unknown quantity.",
      "keyFacts": [
        "x lb at $4, (30−x) at $7, blend 30 lb at $5",
        "4x + 7(30−x) = 150",
        "4x + 210 − 7x = 150 → −3x = −60",
        "x = 20 lb of the $4 coffee"
      ],
      "example": {
        "problem": "$4 & $7 coffee → 30 lb @ $5; lb of $4?",
        "steps": [
          "4x + 7(30−x) = 5·30",
          "−3x = −60 → x = 20 → D"
        ],
        "answer": "D (20)"
      },
      "traps": [
        "Setting up with the blend price on a component (mismatched sides)"
      ],
      "solveSteps": [
        "1. cost_A + cost_B = cost_blend",
        "2. Expand and solve for x"
      ]
    }
  },
  "260": {
    "hint": "x + 4x = 25 → x=5 → Sam = 4·5 = 20.",
    "theory": {
      "title": "Ages — Ratio Plus Sum",
      "icon": "👥",
      "summary": "Let the smaller be x, the multiple 4x; their sum gives x, then scale for the asked person.",
      "keyFacts": [
        "Sister = x, Sam = 4x",
        "x + 4x = 25 → 5x = 25 → x = 5",
        "Sam = 4·5 = 20",
        "Question asks Sam, not the sister"
      ],
      "example": {
        "problem": "Sam = 4× sister, sum 25; Sam?",
        "steps": [
          "5x = 25 → x = 5",
          "Sam = 20 → D"
        ],
        "answer": "D (20)"
      },
      "traps": [
        "Reporting the sister's age 5 instead of Sam's 20"
      ],
      "solveSteps": [
        "1. Variables: x and 4x",
        "2. Sum equation → x",
        "3. Scale to the asked age"
      ]
    }
  },
  "261": {
    "hint": "Anna 5 yr ago = 20 = 2(Ben−5) → Ben = 15.",
    "theory": {
      "title": "Ages — Shift Both People to the Past",
      "icon": "👥",
      "summary": "Translate 'five years ago' by subtracting 5 from BOTH ages, then apply the ratio.",
      "keyFacts": [
        "Anna now 25 → 5 yr ago = 20",
        "20 = 2 · (Ben − 5)",
        "Ben − 5 = 10 → Ben = 15",
        "Both ages shift by the same 5 years"
      ],
      "example": {
        "problem": "5 yr ago Anna 2× Ben; Anna now 25; Ben now?",
        "steps": [
          "Anna then = 20",
          "20 = 2(Ben−5) → Ben = 15 → D"
        ],
        "answer": "D (15)"
      },
      "traps": [
        "Using Anna's current 25 in the ratio instead of her past age 20"
      ],
      "solveSteps": [
        "1. Subtract the offset from each age",
        "2. Apply the ratio at that time",
        "3. Solve, return to 'now' if needed"
      ]
    }
  },
  "262": {
    "hint": "t+8 = 3(t−4) → 2t=20 → t=10.",
    "theory": {
      "title": "Ages — Future = k × Past",
      "icon": "👥",
      "summary": "Express the future age (t+8) and the past age (t−4), set the multiple relationship, solve.",
      "keyFacts": [
        "Future: t + 8",
        "Past: t − 4",
        "t + 8 = 3(t − 4) → t + 8 = 3t − 12",
        "2t = 20 → t = 10"
      ],
      "example": {
        "problem": "In 8 yr, 3× age 4 yr ago; now?",
        "steps": [
          "t+8 = 3(t−4)",
          "2t = 20 → t = 10 → B"
        ],
        "answer": "B (10)"
      },
      "traps": [
        "Mixing the signs: writing t−8 or 3t+12"
      ],
      "solveSteps": [
        "1. Write future and past expressions",
        "2. Set future = k·past",
        "3. Solve for t"
      ]
    }
  },
  "263": {
    "hint": "SP = 1.2·CP → CP = 48/1.2 = 40.",
    "theory": {
      "title": "Profit — Back Out Cost From Selling Price",
      "icon": "💰",
      "summary": "A 20% profit means SP = 1.20·CP. Divide SP by 1.20 to recover the cost.",
      "keyFacts": [
        "SP = CP·(1 + 0.20) = 1.2·CP",
        "48 = 1.2·CP",
        "CP = 48 / 1.2 = 40",
        "Divide (not subtract 20%) to invert a markup"
      ],
      "example": {
        "problem": "20% profit, SP $48; cost?",
        "steps": [
          "48 = 1.2·CP",
          "CP = 40 → D"
        ],
        "answer": "D ($40)"
      },
      "traps": [
        "Taking 80% of 48 = 38.40 (treats profit like a discount)"
      ],
      "solveSteps": [
        "1. SP = (1+profit)·CP",
        "2. CP = SP / (1+profit)"
      ]
    }
  },
  "264": {
    "hint": "0.8·CP=144 → CP=180. Profit price = 1.1·180 = 198.",
    "theory": {
      "title": "Profit — Two-Step via Cost",
      "icon": "💰",
      "summary": "First recover cost from the loss sale, then apply the desired profit to that cost.",
      "keyFacts": [
        "20% loss → SP = 0.8·CP = 144 → CP = 180",
        "Desired 10% profit → SP = 1.10·CP",
        "1.10 · 180 = 198",
        "Both % apply to the SAME cost base"
      ],
      "example": {
        "problem": "Sold $144 at 20% loss; price for 10% profit?",
        "steps": [
          "CP = 144 / 0.8 = 180",
          "1.10·180 = 198 → D"
        ],
        "answer": "D ($198)"
      },
      "traps": [
        "Adding 30% to 144 directly (skips finding the true cost)"
      ],
      "solveSteps": [
        "1. CP from the loss equation",
        "2. Apply target profit to CP"
      ]
    }
  },
  "265": {
    "hint": "60 mL/min · 60 · 24 = 86400 mL = 86.4 L.",
    "theory": {
      "title": "Rate — Unit Chain Over a Day",
      "icon": "🚿",
      "summary": "Multiply the per-minute rate by minutes per hour and hours per day, then convert mL→L.",
      "keyFacts": [
        "60 mL/min × 60 min/h = 3600 mL/h",
        "× 24 h = 86,400 mL/day",
        "÷ 1000 → 86.4 L",
        "1 L = 1000 mL"
      ],
      "example": {
        "problem": "60 mL/min for a day; liters?",
        "steps": [
          "60·60·24 = 86,400 mL",
          "= 86.4 L → D"
        ],
        "answer": "D (86.4 L)"
      },
      "traps": [
        "Stopping at mL (86,400) or using only 24 (skipping ×60 min)"
      ],
      "solveSteps": [
        "1. Scale rate up the time units",
        "2. Convert mL to L (÷1000)"
      ]
    }
  },
  "266": {
    "hint": "5·0.40 + 8·0.25 = 2.00 + 2.00 = 4.00.",
    "theory": {
      "title": "Money — Itemized Total",
      "icon": "💰",
      "summary": "Multiply quantity by unit price for each item, then sum.",
      "keyFacts": [
        "Apples: 5 × 0.40 = 2.00",
        "Bananas: 8 × 0.25 = 2.00",
        "Total = 2.00 + 2.00 = 4.00",
        "Keep the two item costs separate before summing"
      ],
      "example": {
        "problem": "5 apples @0.40, 8 bananas @0.25; total?",
        "steps": [
          "Apples 2.00, bananas 2.00",
          "Sum = 4.00 → C"
        ],
        "answer": "C ($4.00)"
      },
      "traps": [
        "Multiplying combined counts by one price"
      ],
      "solveSteps": [
        "1. qty × unit price per item",
        "2. Add the subtotals"
      ]
    }
  },
  "267": {
    "hint": "600 / 30 = 20 min.",
    "theory": {
      "title": "Rate — Time = Quantity / Rate",
      "icon": "🖨️",
      "summary": "Time to process a quantity = total quantity ÷ processing rate.",
      "keyFacts": [
        "Rate = 30 pages/min",
        "Quantity = 600 pages",
        "Time = 600 / 30 = 20 min",
        "Inverse of rate × time = quantity"
      ],
      "example": {
        "problem": "30 pages/min; time for 600?",
        "steps": [
          "600 / 30",
          "= 20 min → C"
        ],
        "answer": "C (20 min)"
      },
      "traps": [
        "Multiplying 600·30 instead of dividing"
      ],
      "solveSteps": [
        "1. time = quantity / rate",
        "2. Mind the units"
      ]
    }
  },
  "268": {
    "hint": "Worker-days constant: 8·15=120 → 120/12 = 10 days.",
    "theory": {
      "title": "Work — Inverse Proportion (Worker-Days)",
      "icon": "🛠️",
      "summary": "Total work = workers × days is constant. More workers → fewer days, inversely.",
      "keyFacts": [
        "Work = 8 × 15 = 120 worker-days",
        "With 12 workers: days = 120 / 12 = 10",
        "Workers and days are inversely proportional",
        "Same total work either way"
      ],
      "example": {
        "problem": "8 workers, 15 days; 12 workers take?",
        "steps": [
          "Total = 120 worker-days",
          "120 / 12 = 10 → B"
        ],
        "answer": "B (10 days)"
      },
      "traps": [
        "Scaling directly (more workers = more days) — it's inverse"
      ],
      "solveSteps": [
        "1. Constant = workers · days",
        "2. New days = constant / new workers"
      ]
    }
  },
  "269": {
    "hint": "Simple interest: 1000·0.05·3 = 150 → balance 1150.",
    "theory": {
      "title": "Money — Simple Interest",
      "icon": "💰",
      "summary": "Simple interest = P·r·t (on the original principal only). Add to principal for the balance.",
      "keyFacts": [
        "I = P·r·t = 1000·0.05·3",
        "I = 150",
        "Balance = 1000 + 150 = 1150",
        "Simple ≠ compound (no interest-on-interest)"
      ],
      "example": {
        "problem": "$1000 at 5% simple, 3 yr; balance?",
        "steps": [
          "I = 1000·0.05·3 = 150",
          "1000 + 150 = 1150 → C"
        ],
        "answer": "C ($1,150)"
      },
      "traps": [
        "Compounding it (1000·1.05³ ≈ 1157.6) — question says simple"
      ],
      "solveSteps": [
        "1. I = P·r·t",
        "2. Balance = P + I"
      ]
    }
  },
  "270": {
    "hint": "Avg speed = TOTAL dist / TOTAL time = 310/5 = 62, not (50+70)/2.",
    "theory": {
      "title": "Rate — Average Speed Over Segments",
      "icon": "🚗",
      "summary": "Average speed = total distance ÷ total time. Never average the two speeds unless the times are equal.",
      "keyFacts": [
        "Leg 1: 50·2 = 100 mi; Leg 2: 70·3 = 210 mi",
        "Total distance = 310 mi, total time = 5 h",
        "Avg = 310 / 5 = 62 mph",
        "Plain (50+70)/2 = 60 is wrong (unequal times)"
      ],
      "example": {
        "problem": "50 mph 2 h then 70 mph 3 h; average?",
        "steps": [
          "Distances 100 + 210 = 310",
          "310 / 5 = 62 → C"
        ],
        "answer": "C (62 mph)"
      },
      "traps": [
        "Averaging the speeds to 60 — the 70 mph leg lasts longer, so it pulls the mean up"
      ],
      "solveSteps": [
        "1. Distance per leg = speed·time",
        "2. Total distance / total time"
      ]
    }
  },
  "271": {
    "hint": "(1) n>5 → positive: sufficient. (2) n>−5 allows 0/negatives → insufficient. A.",
    "theory": {
      "title": "DS — Positivity From an Inequality Shift",
      "icon": "📊",
      "summary": "A statement is sufficient for 'is n positive?' only if it forces n>0 with no exceptions. n−5>0 does; n+5>0 does not.",
      "keyFacts": [
        "(1) n−5>0 → n>5 → always positive: sufficient",
        "(2) n+5>0 → n>−5 → n could be 0 or −3: insufficient",
        "One sufficient, the other not → answer A",
        "Test the boundary values to expose insufficiency"
      ],
      "example": {
        "problem": "Is n positive? (1) n−5>0 (2) n+5>0",
        "steps": [
          "(1) n>5 → definitely positive: SUFFICIENT",
          "(2) n=−2 satisfies n>−5 but isn't positive: NOT sufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Treating n+5>0 as 'positive' — it only means n>−5"
      ],
      "solveSteps": [
        "1. Solve each inequality for n",
        "2. Does it force n>0 with no exception?",
        "3. Map to AD/BCE → A"
      ]
    }
  },
  "272": {
    "hint": "Each is a linear equation → x=5 alone. Each sufficient → D.",
    "theory": {
      "title": "DS — Two Independent One-Unknown Equations",
      "icon": "📊",
      "summary": "Any single linear equation in one unknown determines it. When both do so, the answer is D — regardless that they agree.",
      "keyFacts": [
        "(1) 2x=10 → x=5: sufficient",
        "(2) x+3=8 → x=5: sufficient",
        "Each alone yields a unique x → D",
        "Matching values is coincidence, not the criterion"
      ],
      "example": {
        "problem": "Value of x? (1) 2x=10 (2) x+3=8",
        "steps": [
          "(1) x=5: SUFFICIENT",
          "(2) x=5: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C because both give 5 — sufficiency is per-statement"
      ],
      "solveSteps": [
        "1. Solve (1) alone",
        "2. Solve (2) alone",
        "3. Both unique → D"
      ]
    }
  },
  "273": {
    "hint": "(1) 2x+2y=14 → x+y=7: sufficient. (2) only difference → insufficient. A.",
    "theory": {
      "title": "DS — Asked Sum From a Scaled Equation",
      "icon": "📊",
      "summary": "If a statement is just a multiple of x+y, it gives the sum directly. A difference equation alone cannot.",
      "keyFacts": [
        "(1) 2x+2y=14 → divide by 2 → x+y=7: sufficient",
        "(2) x−y=1: gives the difference, not the sum → insufficient",
        "Need x+y, not x and y individually",
        "Uniform-coefficient equation → sum obtainable"
      ],
      "example": {
        "problem": "x+y? (1) 2x+2y=14 (2) x−y=1",
        "steps": [
          "(1) → x+y=7: SUFFICIENT",
          "(2) → only x−y, sum varies: NOT sufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking you must solve for x and y separately — the scaled sum suffices"
      ],
      "solveSteps": [
        "1. Can the statement be reduced to x+y?",
        "2. Difference-only is insufficient for the sum",
        "3. → A"
      ]
    }
  },
  "274": {
    "hint": "(1) 3x even → x even (3 odd). (2) x/2 integer → x even. Each alone → D.",
    "theory": {
      "title": "DS — Parity Through a Multiplier",
      "icon": "📊",
      "summary": "Multiplying by an odd number preserves parity, so 3x even forces x even. x/2 integer also forces x even. Each is independently sufficient.",
      "keyFacts": [
        "(1) 3 is odd → 3x even ⇔ x even: sufficient",
        "(2) x/2 ∈ ℤ → x is a multiple of 2 → even: sufficient",
        "odd × x has the same parity as x",
        "Each alone determines parity → D"
      ],
      "example": {
        "problem": "Is x even? (1) 3x even (2) x/2 integer",
        "steps": [
          "(1) 3·odd = odd, so 3x even ⇒ x even: SUFFICIENT",
          "(2) x/2 integer ⇒ x even: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Thinking 3x even could come from odd x — 3·odd is odd, so no"
      ],
      "solveSteps": [
        "1. odd·x keeps x's parity",
        "2. Each statement → x even independently",
        "3. → D"
      ]
    }
  },
  "275": {
    "hint": "(1) x²>25 → x>5 OR x<−5. (2) x>0. Together → x>5. C.",
    "theory": {
      "title": "DS — Combine a Magnitude and a Sign",
      "icon": "📊",
      "summary": "x²>25 gives |x|>5 (both tails). x>0 removes the negative tail. Only together do they force x>5.",
      "keyFacts": [
        "(1) x²>25 → x>5 or x<−5: insufficient (x=−6 → no)",
        "(2) x>0: x could be 1 → insufficient",
        "Together: x>0 kills x<−5, leaving x>5 → definite YES",
        "Squared inequality = two-sided"
      ],
      "example": {
        "problem": "Is x>5? (1) x²>25 (2) x>0",
        "steps": [
          "(1) x=−6 works for x²>25 but x<5 → insufficient",
          "(2) x=1 → not >5 → insufficient",
          "Together x>0 and |x|>5 → x>5 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Reading x²>25 as x>5 only (ignores the negative branch)"
      ],
      "solveSteps": [
        "1. x²>k² → |x|>k (two tails)",
        "2. Use the sign statement to cut one tail",
        "3. → C"
      ]
    }
  },
  "276": {
    "hint": "(1) one angle ≠ A. (2) equilateral → A=60: sufficient. B.",
    "theory": {
      "title": "DS — Specific Shape Pins the Angle",
      "icon": "📊",
      "summary": "Knowing another angle alone can't fix angle A (third angle free). 'Equilateral' forces every angle to 60°.",
      "keyFacts": [
        "(1) B=60° → A+C=120°, A unconstrained: insufficient",
        "(2) equilateral → all angles 60° → A=60°: sufficient",
        "A triangle needs two angles (or a shape rule) to fix the third",
        "Equilateral is a complete specification"
      ],
      "example": {
        "problem": "Angle A? (1) B=60° (2) equilateral",
        "steps": [
          "(1) A could be 50,70,… → insufficient",
          "(2) equilateral → A=60: SUFFICIENT",
          "Only (2) → B"
        ],
        "answer": "B"
      },
      "traps": [
        "Assuming B=60° implies an equilateral/60-60-60 triangle"
      ],
      "solveSteps": [
        "1. One angle leaves the other two free",
        "2. A shape rule may fix all angles",
        "3. → B"
      ]
    }
  },
  "277": {
    "hint": "(1) perimeter alone → many L,W. (2) one side alone. Together → area 32. C.",
    "theory": {
      "title": "DS — Rectangle Area Needs Both Dimensions",
      "icon": "📊",
      "summary": "Perimeter fixes L+W but not the product; one side fixes nothing about the other. Together they pin both, so area follows.",
      "keyFacts": [
        "(1) P=24 → L+W=12, but area 11·1 vs 6·6 differ: insufficient",
        "(2) L=4 alone: W free → insufficient",
        "Together: W = 12−4 = 8 → area = 4·8 = 32",
        "Area needs both L and W, not just their sum"
      ],
      "example": {
        "problem": "Rectangle area? (1) perimeter 24 (2) length 4",
        "steps": [
          "(1) area varies for L+W=12 → insufficient",
          "(2) one side only → insufficient",
          "Together: W=8 → area 32 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking perimeter alone determines area"
      ],
      "solveSteps": [
        "1. Perimeter → L+W only",
        "2. Add one side → solve the other",
        "3. Area = L·W → C"
      ]
    }
  },
  "278": {
    "hint": "Each gives unit price $4 (20/5 = 40/10). Each sufficient → D.",
    "theory": {
      "title": "DS — Unit Rate From Any Bulk Quote",
      "icon": "📊",
      "summary": "Any total-cost-for-a-quantity pair yields the unit price by division. Each statement does so independently.",
      "keyFacts": [
        "(1) $20 / 5 = $4 per widget: sufficient",
        "(2) $40 / 10 = $4 per widget: sufficient",
        "Unit price = total / quantity",
        "Each alone → D"
      ],
      "example": {
        "problem": "Price per widget? (1) 5 for $20 (2) 10 for $40",
        "steps": [
          "(1) 20/5 = 4: SUFFICIENT",
          "(2) 40/10 = 4: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C because the prices are consistent — each already suffices"
      ],
      "solveSteps": [
        "1. Unit = total / quantity per statement",
        "2. Each gives a value → D"
      ]
    }
  },
  "279": {
    "hint": "6 = 2·3. (1) gives 2, (2) gives 3 — need both → C.",
    "theory": {
      "title": "DS — Divisible by 6 = Need 2 AND 3",
      "icon": "📊",
      "summary": "n divisible by 6 ⇔ divisible by 2 and by 3. One prime alone is insufficient; both together guarantee it.",
      "keyFacts": [
        "(1) 2|n: n=2 → not div 6; n=6 → yes → insufficient",
        "(2) 3|n: n=3 → no; n=6 → yes → insufficient",
        "Together: divisible by both 2 and 3 → by 6",
        "2 and 3 are coprime → product rule applies"
      ],
      "example": {
        "problem": "Is n divisible by 6? (1) 2|n (2) 3|n",
        "steps": [
          "(1) counterexample n=2 → insufficient",
          "(2) counterexample n=3 → insufficient",
          "Together → divisible by 6 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking one of 2 or 3 is 'most of 6' — both prime factors are required"
      ],
      "solveSteps": [
        "1. 6 = 2·3",
        "2. Each statement supplies one prime",
        "3. Both → C"
      ]
    }
  },
  "280": {
    "hint": "Identity (x+y)² = x²+2xy+y². (1)&(2) → 25 = 13+2xy → xy=6. C.",
    "theory": {
      "title": "DS — Solve xy via the Square-of-Sum Identity",
      "icon": "📊",
      "summary": "xy can't come from the sum or the sum-of-squares alone, but (x+y)² = x²+2xy+y² links them, isolating xy when both are known.",
      "keyFacts": [
        "(1) x+y=5 alone: xy ranges (e.g. 4·1 vs 2.5²) → insufficient",
        "(2) x²+y²=13 alone: xy not fixed → insufficient",
        "(x+y)² = x²+2xy+y² → 25 = 13 + 2xy",
        "xy = (25−13)/2 = 6"
      ],
      "example": {
        "problem": "xy? (1) x+y=5 (2) x²+y²=13",
        "steps": [
          "Each alone leaves xy free → insufficient",
          "(x+y)²=25 → 25 = 13 + 2xy",
          "xy = 6 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Trying to solve for x and y separately instead of using the identity"
      ],
      "solveSteps": [
        "1. Recall (x+y)² = x²+2xy+y²",
        "2. Substitute both statements",
        "3. Isolate xy → C"
      ]
    }
  },
  "281": {
    "hint": "(1) one equation, two unknowns. (2) Mary only. Together → John=15. C.",
    "theory": {
      "title": "DS — Age Relation Plus an Anchor",
      "icon": "📊",
      "summary": "A past-age relation has two unknowns; the other statement anchors one of them. Only together is John's age determined.",
      "keyFacts": [
        "(1) J−5 = 2(M−5): one equation, J and M unknown → insufficient",
        "(2) M=10 alone: nothing about J → insufficient",
        "Together: J−5 = 2(10−5)=10 → J=15",
        "Need the relation AND a value to anchor it"
      ],
      "example": {
        "problem": "John's age? (1) 5y ago J=2·M (2) Mary now 10",
        "steps": [
          "(1) two unknowns → insufficient",
          "(2) J unmentioned → insufficient",
          "Together: J = 2·5 + 5 = 15 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Forgetting to shift Mary back 5 years too in statement (1)"
      ],
      "solveSteps": [
        "1. Relation = 1 equation, 2 unknowns",
        "2. Other statement anchors one",
        "3. Solve → C"
      ]
    }
  },
  "282": {
    "hint": "d = s·t. (1) speed only, (2) time only. Need both → C.",
    "theory": {
      "title": "DS — Distance Needs Speed AND Time",
      "icon": "📊",
      "summary": "d = s·t. One factor alone leaves d undetermined; both together fix it.",
      "keyFacts": [
        "(1) s=60 alone: t free → d unknown",
        "(2) t=2 alone: s free → d unknown",
        "Together: d = 60·2 = 120",
        "Product needs both factors"
      ],
      "example": {
        "problem": "Distance d? (1) s=60 (2) t=2 h",
        "steps": [
          "(1) d=60t, t free → insufficient",
          "(2) d=2s, s free → insufficient",
          "Together: 120 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Assuming a 'standard' trip time or speed not given"
      ],
      "solveSteps": [
        "1. d = s·t",
        "2. Need both factors",
        "3. → C"
      ]
    }
  },
  "283": {
    "hint": "(1) sum/4 = mean directly: sufficient. (2) missing 4th number → insufficient. A.",
    "theory": {
      "title": "DS — Mean Needs Only the Sum",
      "icon": "📊",
      "summary": "Mean = sum / count. The sum alone is enough; three of four values is not (the fourth is free).",
      "keyFacts": [
        "(1) sum=20, n=4 → mean = 5: sufficient",
        "(2) three values 3,5,7 → 4th unknown → mean varies: insufficient",
        "Mean depends on the total, not individual values",
        "One sufficient, one not → A"
      ],
      "example": {
        "problem": "Mean of 4 numbers? (1) sum=20 (2) three are 3,5,7",
        "steps": [
          "(1) 20/4 = 5: SUFFICIENT",
          "(2) 4th number free → mean varies → insufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking partial values help — without the 4th, the sum is unknown"
      ],
      "solveSteps": [
        "1. Mean = sum/count",
        "2. Sum given → sufficient; partial values → not",
        "3. → A"
      ]
    }
  },
  "284": {
    "hint": "Diameter OR circumference each gives r=5 → area 25π. Each alone → D.",
    "theory": {
      "title": "DS — Any One Circle Measure Fixes Area",
      "icon": "📊",
      "summary": "A circle has one free parameter. Diameter or circumference each determines r, hence the area.",
      "keyFacts": [
        "(1) d=10 → r=5 → area = 25π: sufficient",
        "(2) C=10π → 2πr=10π → r=5 → area=25π: sufficient",
        "Each single measure → r → area",
        "Each alone → D"
      ],
      "example": {
        "problem": "Area of circle? (1) diameter 10 (2) circumference 10π",
        "steps": [
          "(1) r=5 → 25π: SUFFICIENT",
          "(2) r=5 → 25π: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C because both give the same area — each suffices alone"
      ],
      "solveSteps": [
        "1. Circle = 1 parameter",
        "2. Each statement → r",
        "3. → D"
      ]
    }
  },
  "285": {
    "hint": "(1) x²=9 → x=±3. (2) x>0. Together → x=3. C.",
    "theory": {
      "title": "DS — Square Root Sign Ambiguity",
      "icon": "📊",
      "summary": "x²=9 gives x=3 or −3. 'Is x=3?' stays undecided until the sign is fixed.",
      "keyFacts": [
        "(1) x²=9 → x ∈ {3,−3} → can't confirm x=3 → insufficient",
        "(2) x>0 alone: magnitude unknown → insufficient",
        "Together: positive root of x²=9 is 3 → YES",
        "Definite-value DS needs magnitude + sign"
      ],
      "example": {
        "problem": "Is x=3? (1) x²=9 (2) x>0",
        "steps": [
          "(1) x=3 or −3 → answer ambiguous → insufficient",
          "(2) positive, value unknown → insufficient",
          "Together → x=3 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Reading x²=9 as x=3 only (drops −3)"
      ],
      "solveSteps": [
        "1. x²=k → ±√k",
        "2. Sign statement kills one root",
        "3. → C"
      ]
    }
  },
  "286": {
    "hint": "(1) 3a=4b → a/b=4/3: sufficient. (2) difference → ratio not fixed. A.",
    "theory": {
      "title": "DS — Ratio From a Proportion, Not a Difference",
      "icon": "📊",
      "summary": "A proportional relation (3a=4b) fixes a/b. A difference (a−b=5) does not — many ratios satisfy it.",
      "keyFacts": [
        "(1) 3a=4b → a/b = 4/3: sufficient",
        "(2) a−b=5: a=6,b=1 → 6; a=10,b=5 → 2 → ratio varies → insufficient",
        "Ratios come from multiplicative relations",
        "One sufficient, one not → A"
      ],
      "example": {
        "problem": "a/b? (1) 3a=4b (2) a−b=5",
        "steps": [
          "(1) a/b = 4/3: SUFFICIENT",
          "(2) different (a,b) give different ratios → insufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking a−b=5 pins the ratio — it doesn't"
      ],
      "solveSteps": [
        "1. Ratio needs a multiplicative link",
        "2. Difference alone is insufficient",
        "3. → A"
      ]
    }
  },
  "287": {
    "hint": "Count + mean give no individual values → median unknown even together. E.",
    "theory": {
      "title": "DS — Mean and Size Don't Give the Median",
      "icon": "📊",
      "summary": "Median depends on the actual ordered values. Knowing how many elements and their average says nothing about the middle one.",
      "keyFacts": [
        "(1) |S|=5: position of median known, value not → insufficient",
        "(2) mean=7: many sets average 7 with different medians → insufficient",
        "Together: {7,7,7,7,7}→med 7 vs {1,2,7,12,13}→med 7? (mean 7, med 7) vs {1,1,1,1,31}→med 1 → median varies",
        "Mean ≠ median in general"
      ],
      "example": {
        "problem": "Median of S? (1) 5 elements (2) mean 7",
        "steps": [
          "{5,6,7,8,9} mean 7 → median 7",
          "{1,1,1,1,31} mean 7 → median 1",
          "Median differs with same mean & size → E"
        ],
        "answer": "E"
      },
      "traps": [
        "Assuming mean determines or equals the median"
      ],
      "solveSteps": [
        "1. Median needs ordered values",
        "2. Build two sets, same mean & size, different medians",
        "3. → E"
      ]
    }
  },
  "288": {
    "hint": "(1) 5-12-13: 25+144=169 → right. (2) 90° angle → right. Each alone → D.",
    "theory": {
      "title": "DS — Right Triangle: Sides or Angle",
      "icon": "📊",
      "summary": "Right triangle if Pythagoras holds OR an angle is 90°. Each statement independently certifies one.",
      "keyFacts": [
        "(1) 5²+12² = 25+144 = 169 = 13² → right: sufficient",
        "(2) largest angle 90° → right by definition: sufficient",
        "5-12-13 is a Pythagorean triple",
        "Each alone → D"
      ],
      "example": {
        "problem": "Right triangle? (1) sides 5,12,13 (2) largest angle 90°",
        "steps": [
          "(1) 5²+12²=13² → right: SUFFICIENT",
          "(2) 90° angle → right: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C — the side test and angle test are each complete"
      ],
      "solveSteps": [
        "1. Right ⇔ a²+b²=c² OR a 90° angle",
        "2. Each statement meets one criterion",
        "3. → D"
      ]
    }
  },
  "289": {
    "hint": "(1) 0.75·CP=60 → CP=80: sufficient. (2) $20 off, no %/final → insufficient. A.",
    "theory": {
      "title": "DS — Original Price From a Percent Discount",
      "icon": "📊",
      "summary": "A percent discount plus the discounted price gives the original (CP = price / (1−rate)). A raw discount amount alone does not.",
      "keyFacts": [
        "(1) 25% off, final $60 → 0.75·CP = 60 → CP = 80: sufficient",
        "(2) discount $20: original could be $100 (20%) or $40 (50%) → insufficient",
        "Need rate AND a price point to back out CP",
        "One sufficient, one not → A"
      ],
      "example": {
        "problem": "Original price? (1) 25% off → $60 (2) discount is $20",
        "steps": [
          "(1) CP = 60/0.75 = 80: SUFFICIENT",
          "(2) $20 off → CP ambiguous: insufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking a dollar discount alone pins the original price"
      ],
      "solveSteps": [
        "1. CP = discounted / (1 − rate)",
        "2. Raw $ discount alone is insufficient",
        "3. → A"
      ]
    }
  },
  "290": {
    "hint": "x−y>0? (1) x>0 only. (2) y<0 only. Together: pos − neg > 0 → C.",
    "theory": {
      "title": "DS — Sign of a Difference",
      "icon": "📊",
      "summary": "x−y>0 needs both a lower bound on x and an upper bound on y. x>0 alone or y<0 alone leaves the other free.",
      "keyFacts": [
        "(1) x>0: if y=5, x−y could be negative → insufficient",
        "(2) y<0: if x=−10, x−y could be negative → insufficient",
        "Together: x>0 and y<0 → x−y = positive − negative = positive",
        "Subtracting a negative adds → strictly positive"
      ],
      "example": {
        "problem": "Is x−y>0? (1) x>0 (2) y<0",
        "steps": [
          "(1) x=1,y=5 → x−y<0 → insufficient",
          "(2) x=−9,y=−1 → x−y<0 → insufficient",
          "Together: x>0, −y>0 → x−y>0 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Assuming x>0 alone makes x−y positive (y could exceed x)"
      ],
      "solveSteps": [
        "1. x−y>0 ⇔ x>y",
        "2. Need x bounded below AND y bounded above",
        "3. Together → C"
      ]
    }
  },
  "291": {
    "hint": "Mean = sum/count = (4+8+10+14)/4 = 36/4 = 9.",
    "theory": {
      "title": "Statistics — Arithmetic Mean",
      "icon": "📊",
      "summary": "Add every value, divide by how many. No shortcut needed for four small numbers.",
      "keyFacts": [
        "Sum = 4+8+10+14 = 36",
        "Count = 4",
        "Mean = 36/4 = 9",
        "Mean need not be one of the listed values"
      ],
      "example": {
        "problem": "Mean of 4, 8, 10, 14?",
        "steps": [
          "Sum = 36",
          "36 / 4 = 9 → C"
        ],
        "answer": "C (9)"
      },
      "traps": [
        "Dividing by 3 (miscounting the data points)"
      ],
      "solveSteps": [
        "1. Sum the values",
        "2. Divide by the count"
      ]
    }
  },
  "292": {
    "hint": "Even count (6): median = avg of 3rd & 4th = (9+11)/2 = 10.",
    "theory": {
      "title": "Statistics — Median of an Even Set",
      "icon": "📊",
      "summary": "Sort (already sorted here). With n even, median = average of the two middle terms (positions n/2 and n/2+1).",
      "keyFacts": [
        "n = 6 → middle positions 3 and 4",
        "3rd = 9, 4th = 11",
        "Median = (9+11)/2 = 10",
        "Median of even set may not be a member"
      ],
      "example": {
        "problem": "Median of {3,7,9,11,15,21}?",
        "steps": [
          "Middle two: 9 and 11",
          "(9+11)/2 = 10 → B"
        ],
        "answer": "B (10)"
      },
      "traps": [
        "Taking a single middle value (9 or 11) instead of averaging both"
      ],
      "solveSteps": [
        "1. Sort; find n",
        "2. Even n → average positions n/2 and n/2+1"
      ]
    }
  },
  "293": {
    "hint": "Range = max − min = 19 − 3 = 16.",
    "theory": {
      "title": "Statistics — Range",
      "icon": "📊",
      "summary": "Range = largest value − smallest value. Order is irrelevant; only the extremes matter.",
      "keyFacts": [
        "Max = 19, min = 3",
        "Range = 19 − 3 = 16",
        "Unsorted set is fine — just scan for extremes",
        "Range ignores all middle values"
      ],
      "example": {
        "problem": "Range of {12,4,7,19,10,3}?",
        "steps": [
          "Max 19, min 3",
          "19 − 3 = 16 → D"
        ],
        "answer": "D (16)"
      },
      "traps": [
        "Subtracting first and last as listed (12−3) instead of true max/min"
      ],
      "solveSteps": [
        "1. Find max and min",
        "2. Subtract"
      ]
    }
  },
  "294": {
    "hint": "Favorable {5,6} → 2/6 = 1/3.",
    "theory": {
      "title": "Probability — Single Die Event",
      "icon": "🎲",
      "summary": "P = favorable outcomes / total outcomes. 'Greater than 4' means strictly {5,6}.",
      "keyFacts": [
        "Total outcomes = 6",
        "'>4' → {5,6} (NOT including 4)",
        "P = 2/6 = 1/3",
        "Strict inequality excludes 4"
      ],
      "example": {
        "problem": "P(roll > 4) on a fair die?",
        "steps": [
          "Favorable {5,6} → 2",
          "2/6 = 1/3 → C"
        ],
        "answer": "C (1/3)"
      },
      "traps": [
        "Including 4 ('≥4' → 3/6) — question says greater than"
      ],
      "solveSteps": [
        "1. List favorable outcomes carefully (strict vs inclusive)",
        "2. Divide by total"
      ]
    }
  },
  "295": {
    "hint": "Complement: non-red = 1 − P(red) = 1 − 3/12 = 9/12 = 3/4.",
    "theory": {
      "title": "Probability — Complement of a Category",
      "icon": "🎲",
      "summary": "P(not red) = (total − red)/total, or 1 − P(red). Faster than summing the other colours.",
      "keyFacts": [
        "Total = 3+4+5 = 12",
        "Non-red = 4+5 = 9 (or 12−3)",
        "P = 9/12 = 3/4",
        "Complement = 1 − 3/12"
      ],
      "example": {
        "problem": "3R,4B,5G; P(non-red)?",
        "steps": [
          "Total 12, red 3",
          "(12−3)/12 = 9/12 = 3/4 → E"
        ],
        "answer": "E (3/4)"
      },
      "traps": [
        "Computing P(red)=1/4 and forgetting to take the complement"
      ],
      "solveSteps": [
        "1. P(not X) = 1 − P(X)",
        "2. Simplify the fraction"
      ]
    }
  },
  "296": {
    "hint": "4 outcomes; exactly one head = {HT, TH} → 2/4 = 1/2.",
    "theory": {
      "title": "Probability — Exactly One of Two Coins",
      "icon": "🎲",
      "summary": "Enumerate the 4 equally likely outcomes; count those with exactly one head.",
      "keyFacts": [
        "Sample space: HH, HT, TH, TT (4 outcomes)",
        "Exactly one head: HT, TH → 2",
        "P = 2/4 = 1/2",
        "'Exactly one' excludes HH and TT"
      ],
      "example": {
        "problem": "Two fair coins, P(exactly one head)?",
        "steps": [
          "Favorable: HT, TH",
          "2/4 = 1/2 → C"
        ],
        "answer": "C (1/2)"
      },
      "traps": [
        "Counting HH as 'a head' — 'exactly one' means precisely one"
      ],
      "solveSteps": [
        "1. List the 4 outcomes",
        "2. Count exactly-one-head cases / 4"
      ]
    }
  },
  "297": {
    "hint": "4 distinct letters → 4! = 24.",
    "theory": {
      "title": "Counting — Permutations of Distinct Letters",
      "icon": "🔢",
      "summary": "n distinct letters arrange in n! ways. MATH has 4 different letters → 4!.",
      "keyFacts": [
        "Letters M,A,T,H all distinct",
        "Arrangements = 4! = 24",
        "No repeated letters → no division",
        "4! = 4·3·2·1"
      ],
      "example": {
        "problem": "Arrangements of 'MATH'?",
        "steps": [
          "4 distinct letters",
          "4! = 24 → D"
        ],
        "answer": "D (24)"
      },
      "traps": [
        "Using 4² or dividing by a repeat that doesn't exist"
      ],
      "solveSteps": [
        "1. Count distinct letters n",
        "2. n! (divide by repeats if any)"
      ]
    }
  },
  "298": {
    "hint": "Order irrelevant → C(7,3) = 35.",
    "theory": {
      "title": "Counting — Committee = Combination",
      "icon": "🔢",
      "summary": "Choosing a committee doesn't care about order → use C(n,k) = n!/(k!(n−k)!).",
      "keyFacts": [
        "C(7,3) = 7!/(3!·4!)",
        "= (7·6·5)/(3·2·1)",
        "= 210/6 = 35",
        "Committee → combination, not permutation"
      ],
      "example": {
        "problem": "Committees of 3 from 7?",
        "steps": [
          "C(7,3) = (7·6·5)/6",
          "= 35 → C"
        ],
        "answer": "C (35)"
      },
      "traps": [
        "Using P(7,3)=210 (order doesn't matter for a committee)"
      ],
      "solveSteps": [
        "1. Unordered selection → C(n,k)",
        "2. Compute n!/(k!(n−k)!)"
      ]
    }
  },
  "299": {
    "hint": "Exactly one boy → C(5,1)·C(4,1) = 5·4 = 20.",
    "theory": {
      "title": "Counting — Constrained Selection by Type",
      "icon": "🔢",
      "summary": "Pick the required number from each group separately and multiply. Exactly one boy + one girl.",
      "keyFacts": [
        "Boys: C(5,1) = 5 ways",
        "Girls: C(4,1) = 4 ways (the other seat must be a girl)",
        "Total = 5 · 4 = 20",
        "'Exactly one boy' from a 2-pick → the other is a girl"
      ],
      "example": {
        "problem": "2 students, exactly 1 boy, from 5B/4G?",
        "steps": [
          "Boy: 5 choices",
          "Girl: 4 → 5·4 = 20 → D"
        ],
        "answer": "D (20)"
      },
      "traps": [
        "Using C(9,2)=36 (ignores the exactly-one-boy constraint)"
      ],
      "solveSteps": [
        "1. Choose required count from each group",
        "2. Multiply the group counts"
      ]
    }
  },
  "300": {
    "hint": "Var = Σ(dev²)/n = 32/8 = 4 → SD = 2.",
    "theory": {
      "title": "Statistics — Standard Deviation From Deviations",
      "icon": "📊",
      "summary": "SD = √(mean of squared deviations from the mean). Compute each deviation, square, average, square-root.",
      "keyFacts": [
        "Mean = 5; deviations: −3,−1,−1,−1,0,0,2,4",
        "Squares: 9,1,1,1,0,0,4,16 → sum 32",
        "Variance = 32/8 = 4",
        "SD = √4 = 2"
      ],
      "example": {
        "problem": "SD of {2,4,4,4,5,5,7,9}, mean 5?",
        "steps": [
          "Σ(dev²) = 32",
          "Var = 32/8 = 4 → SD = 2 → C"
        ],
        "answer": "C (2)"
      },
      "traps": [
        "Reporting the variance 4 instead of its root 2"
      ],
      "solveSteps": [
        "1. Deviations from the mean",
        "2. Square, average → variance",
        "3. √variance = SD"
      ]
    }
  },
  "301": {
    "hint": "(1) x−y>−2 allows x<y. (2) 2x>2y ⇔ x>y: sufficient. B.",
    "theory": {
      "title": "DS — Strict Order From a Clean Inequality",
      "icon": "📊",
      "summary": "x−y>−2 permits both x<y and x>y. Dividing 2x>2y by a positive 2 gives x>y directly.",
      "keyFacts": [
        "(1) x−y>−2: x−y could be −1 (x<y) or 1 (x>y) → insufficient",
        "(2) 2x>2y → divide by 2 → x>y: sufficient",
        "Dividing an inequality by a positive keeps direction",
        "One sufficient, one not → B"
      ],
      "example": {
        "problem": "Is x>y? (1) x−y>−2 (2) 2x>2y",
        "steps": [
          "(1) x−y=−1 → x<y; =1 → x>y: ambiguous → insufficient",
          "(2) x>y directly: SUFFICIENT",
          "Only (2) → B"
        ],
        "answer": "B"
      },
      "traps": [
        "Reading x−y>−2 as 'x>y' — it allows a negative difference"
      ],
      "solveSteps": [
        "1. Solve each for the x vs y relation",
        "2. Loose bound = insufficient; exact order = sufficient",
        "3. → B"
      ]
    }
  },
  "302": {
    "hint": "(1) x∈{2,3}. (2) x>2 only. Together → x=3. C.",
    "theory": {
      "title": "DS — Quadratic Roots Plus a Filter",
      "icon": "📊",
      "summary": "A quadratic gives two candidate roots; an inequality selects one. Neither alone is enough.",
      "keyFacts": [
        "(1) x²−5x+6=0 → x=2 or 3: not unique → insufficient",
        "(2) x>2 alone: infinitely many x → insufficient",
        "Together: x>2 eliminates 2 → x=3",
        "Two roots + one filter = unique"
      ],
      "example": {
        "problem": "x? (1) x²−5x+6=0 (2) x>2",
        "steps": [
          "(1) {2,3} → insufficient",
          "(2) any x>2 → insufficient",
          "Together → x=3 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Calling (1) sufficient — it yields two values, not one"
      ],
      "solveSteps": [
        "1. Factor for both roots",
        "2. Apply the inequality filter",
        "3. One root left → C"
      ]
    }
  },
  "303": {
    "hint": "12 = lcm(4,6). (1) gives 4, (2) gives 6 — need both → C.",
    "theory": {
      "title": "DS — Divisible by 12 via lcm(4,6)",
      "icon": "📊",
      "summary": "Divisible by 4 and by 6 means divisible by lcm(4,6)=12 (not 24, since they share a factor 2). Neither alone suffices.",
      "keyFacts": [
        "(1) 4|n: n=4 → not div 12 → insufficient",
        "(2) 6|n: n=6 → not div 12 → insufficient",
        "lcm(4,6) = 12 (shared factor 2 → not 24)",
        "Together → 12|n → YES"
      ],
      "example": {
        "problem": "Is n divisible by 12? (1) 4|n (2) 6|n",
        "steps": [
          "(1) n=4 counterexample → insufficient",
          "(2) n=6 counterexample → insufficient",
          "Together → lcm=12 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Using 4·6=24 as the combined requirement (overcounts the shared 2)"
      ],
      "solveSteps": [
        "1. Each statement alone: counterexample",
        "2. Combined ⇒ lcm of the divisors",
        "3. → C"
      ]
    }
  },
  "304": {
    "hint": "(1) exactly 2 divisors = definition of prime. (2) standard primality test. Each alone → D.",
    "theory": {
      "title": "DS — Two Equivalent Primality Criteria",
      "icon": "📊",
      "summary": "Both statements are independently valid definitions/tests of primality, so each is sufficient.",
      "keyFacts": [
        "(1) exactly two positive divisors (1 and itself) = the definition of prime: sufficient",
        "(2) p>1 with no divisor in [2,√p] = the standard primality test: sufficient",
        "Each fully decides 'is p prime?'",
        "Independent → D"
      ],
      "example": {
        "problem": "Is p prime? (1) exactly 2 divisors (2) p>1, no factor in [2,√p]",
        "steps": [
          "(1) = definition → SUFFICIENT",
          "(2) = trial-division test → SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Thinking the √p test needs (1) to confirm — it is self-contained for p>1"
      ],
      "solveSteps": [
        "1. Recognize each as a complete primality criterion",
        "2. Each alone decides → D"
      ]
    }
  },
  "305": {
    "hint": "(1) Pythagoras converse → A right. (2) BC=5 hypotenuse of 3-4-5 → A right. Each alone → D.",
    "theory": {
      "title": "DS — Right Angle at A: Two Routes",
      "icon": "📊",
      "summary": "AB²+AC²=BC² means the angle opposite BC (angle A) is right. The 3-4-5 with BC=5 as hypotenuse says the same.",
      "keyFacts": [
        "(1) AB²+AC²=BC² → by Pythagoras converse, angle A (opposite BC) = 90°: sufficient",
        "(2) sides 3,4,5 with BC=5 → 5 is the hypotenuse → right angle opposite it = A: sufficient",
        "Right angle is opposite the longest side",
        "Each alone → D"
      ],
      "example": {
        "problem": "Is angle A right? (1) AB²+AC²=BC² (2) 3-4-5 with BC=5",
        "steps": [
          "(1) converse of Pythagoras → A=90°: SUFFICIENT",
          "(2) hypotenuse BC → right angle at A: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Placing the right angle at the wrong vertex (it's opposite the hypotenuse BC, i.e. at A)"
      ],
      "solveSteps": [
        "1. Right angle is opposite the side in c² of a²+b²=c²",
        "2. Each statement identifies that as angle A → D"
      ]
    }
  },
  "306": {
    "hint": "(1) C=10π→r=5. (2) chord 8 at dist 3 → r=√(4²+3²)=5. Each → area 25π → D.",
    "theory": {
      "title": "DS — Radius From Circumference or Chord Geometry",
      "icon": "📊",
      "summary": "Area needs r. Circumference gives r directly; a chord with its distance from center gives r via the right triangle (half-chord, distance, radius).",
      "keyFacts": [
        "(1) 2πr=10π → r=5 → area 25π: sufficient",
        "(2) half-chord 4, distance 3 → r=√(4²+3²)=5 → area 25π: sufficient",
        "Perpendicular from center bisects the chord",
        "Each alone → D"
      ],
      "example": {
        "problem": "Area? (1) C=10π (2) chord 8 at distance 3 from O",
        "steps": [
          "(1) r=5 → 25π: SUFFICIENT",
          "(2) r=√(16+9)=5 → 25π: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Using the full chord 8 (not half = 4) in the radius right triangle"
      ],
      "solveSteps": [
        "1. Circumference → r",
        "2. Chord: r² = (half-chord)² + (distance)²",
        "3. Each gives area → D"
      ]
    }
  },
  "307": {
    "hint": "x²>x ⇔ x<0 or x>1. (1) x>1 → yes. (2) x<0 → yes. Each alone → D.",
    "theory": {
      "title": "DS — Solve the Inequality, Match Each Statement",
      "icon": "📊",
      "summary": "x²>x ⇔ x(x−1)>0 ⇔ x<0 OR x>1. Any statement landing entirely inside that solution set is sufficient.",
      "keyFacts": [
        "x²>x ⇔ x<0 or x>1 (NOT 0≤x≤1)",
        "(1) x>1: fully inside → always yes: sufficient",
        "(2) x<0: fully inside → always yes: sufficient",
        "Each region independently answers YES → D"
      ],
      "example": {
        "problem": "Is x²>x? (1) x>1 (2) x<0",
        "steps": [
          "Solve: x<0 or x>1",
          "(1) ⊂ solution → YES; (2) ⊂ solution → YES",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Assuming x²>x always (false for 0<x<1, e.g. 0.5²=0.25<0.5)"
      ],
      "solveSteps": [
        "1. Solve x²>x → x<0 or x>1",
        "2. Check each statement ⊆ solution set",
        "3. Both → D"
      ]
    }
  },
  "308": {
    "hint": "Round-trip avg = harmonic mean = 2·60·40/(60+40)=48. Need BOTH legs → C.",
    "theory": {
      "title": "DS — Round-Trip Average Speed (Harmonic)",
      "icon": "📊",
      "summary": "Equal distances each way → average speed is the harmonic mean of the two speeds, requiring both.",
      "keyFacts": [
        "(1) going 60 only: return speed unknown → insufficient",
        "(2) return 40 only: going speed unknown → insufficient",
        "Together: 2·60·40/(60+40) = 4800/100 = 48 mph",
        "NOT the arithmetic mean (50) — equal distance, unequal time"
      ],
      "example": {
        "problem": "Round-trip avg speed? (1) go 60 (2) return 40",
        "steps": [
          "Each alone: one leg unknown → insufficient",
          "Together: harmonic mean = 48 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking one speed + 'same distance' is enough — both speeds are needed"
      ],
      "solveSteps": [
        "1. Round trip, equal distance → harmonic mean",
        "2. Need both speeds → C"
      ]
    }
  },
  "309": {
    "hint": "Together time needs both rates: 1/6+1/12=1/4 → 4 h. Need both → C.",
    "theory": {
      "title": "DS — Combined Work Needs Both Solo Times",
      "icon": "📊",
      "summary": "Combined rate = sum of individual rates. One solo time alone can't give the joint time.",
      "keyFacts": [
        "(1) A=6h → rate 1/6, B unknown → insufficient",
        "(2) B=12h → rate 1/12, A unknown → insufficient",
        "Together: 1/6 + 1/12 = 1/4 → 4 h",
        "Joint time needs both rates"
      ],
      "example": {
        "problem": "A&B together? (1) A 6h (2) B 12h",
        "steps": [
          "Each alone: one rate missing → insufficient",
          "Together: 1/4 → 4 h → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Averaging the two times (9 h) instead of summing rates"
      ],
      "solveSteps": [
        "1. Combined rate = Σ(1/timeᵢ)",
        "2. Need every solo time",
        "3. → C"
      ]
    }
  },
  "310": {
    "hint": "(2) = 2×(1): redundant. One equation, two unknowns → x+y not fixed. E.",
    "theory": {
      "title": "DS — Redundant Equation Trap",
      "icon": "📊",
      "summary": "When statement (2) is just a scalar multiple of (1), it adds zero information. One equation in two unknowns cannot pin x+y.",
      "keyFacts": [
        "(1) 2x+3y=13: one equation, two unknowns → x+y varies → insufficient",
        "(2) 4x+6y=26 = 2·(1): same line → insufficient",
        "Together still one independent equation → insufficient",
        "(5,1)→sum 6; (2,3)→sum 5: x+y not determined → E"
      ],
      "example": {
        "problem": "x+y? (1) 2x+3y=13 (2) 4x+6y=26",
        "steps": [
          "(2) is 2×(1) → no new info",
          "One equation, two unknowns → x+y varies",
          "→ E"
        ],
        "answer": "E"
      },
      "traps": [
        "Marking C assuming 'two equations' — they are the same line"
      ],
      "solveSteps": [
        "1. Check if (2) is a multiple of (1)",
        "2. If yes → only one independent equation",
        "3. Two unknowns, one equation → E"
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
