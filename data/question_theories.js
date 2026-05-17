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
//
//  Generated via batched Claude CLI (Sonnet 4.6) + 10 hand-authored seed entries
//  (ids 63-72) which serve as the quality benchmark for tone & structure.
// ════════════════════════════════════════════════════════════════

const QUESTION_THEORIES = {
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
  },
  "311": {
    "hint": "n² odd → n odd. 3n odd → n odd (3 is odd). Each alone → D.",
    "theory": {
      "title": "DS — Parity Preserved Through Odd Operations",
      "icon": "📊",
      "summary": "Squaring keeps parity; multiplying by an odd number keeps parity. Each statement forces n odd independently.",
      "keyFacts": [
        "(1) n² odd ⇔ n odd (even² is even): sufficient",
        "(2) 3n odd: 3 is odd, so 3n odd ⇔ n odd: sufficient",
        "odd·odd = odd, odd·even = even",
        "Each alone determines parity → D"
      ],
      "example": {
        "problem": "Is n odd? (1) n² odd (2) 3n odd",
        "steps": [
          "(1) n² odd ⇒ n odd: SUFFICIENT",
          "(2) 3n odd ⇒ n odd: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Thinking 3n odd could allow even n — 3·even is even, so no"
      ],
      "solveSteps": [
        "1. Squaring & odd-multiplying preserve parity",
        "2. Each statement → n odd",
        "3. → D"
      ]
    }
  },
  "312": {
    "hint": "|x| is magnitude. (1) x²=16 → |x|=4: sufficient. (2) sign only → insufficient. A.",
    "theory": {
      "title": "DS — Magnitude vs Sign",
      "icon": "📊",
      "summary": "|x| asks for magnitude only. x²=16 fixes |x|=4 regardless of sign; x<0 gives only the sign.",
      "keyFacts": [
        "(1) x²=16 → x=±4 → |x|=4 either way: sufficient",
        "(2) x<0: |x| could be 1, 7, … → insufficient",
        "|x| ignores sign, needs magnitude",
        "One sufficient, one not → A"
      ],
      "example": {
        "problem": "|x|? (1) x²=16 (2) x<0",
        "steps": [
          "(1) x=±4 → |x|=4: SUFFICIENT",
          "(2) only sign, no size: insufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking |x| needs the sign resolved — magnitude is the same for ±4"
      ],
      "solveSteps": [
        "1. |x| = magnitude",
        "2. x²=k → |x|=√k (sign irrelevant)",
        "3. → A"
      ]
    }
  },
  "313": {
    "hint": "Slope needs TWO points. Each statement = one point. Together → 2. C.",
    "theory": {
      "title": "DS — Slope Requires Two Points",
      "icon": "📊",
      "summary": "A single point fixes nothing about direction. Two points give slope = Δy/Δx.",
      "keyFacts": [
        "(1) (2,3) alone: infinitely many lines → insufficient",
        "(2) (4,7) alone: infinitely many lines → insufficient",
        "Together: slope = (7−3)/(4−2) = 4/2 = 2",
        "Two distinct points → unique slope"
      ],
      "example": {
        "problem": "Slope of L? (1) through (2,3) (2) through (4,7)",
        "steps": [
          "Each point alone → infinitely many slopes",
          "Together: (7−3)/(4−2) = 2 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Assuming a point plus 'a line' gives slope — direction is free"
      ],
      "solveSteps": [
        "1. Slope needs 2 points",
        "2. Each statement supplies one",
        "3. → C"
      ]
    }
  },
  "314": {
    "hint": "Mean(x,y,z) needs x+y+z. (1) x+y, (2) z → together sum 18 → mean 6. C.",
    "theory": {
      "title": "DS — Mean Needs the Full Sum",
      "icon": "📊",
      "summary": "Average of three needs x+y+z. A partial sum plus the missing term together complete it.",
      "keyFacts": [
        "(1) x+y=10 alone: z unknown → insufficient",
        "(2) z=8 alone: x+y unknown → insufficient",
        "Together: sum = 10+8 = 18 → mean = 6",
        "Need the total, not individual values"
      ],
      "example": {
        "problem": "Mean of x,y,z? (1) x+y=10 (2) z=8",
        "steps": [
          "(1) missing z → insufficient",
          "(2) missing x+y → insufficient",
          "Together: 18/3 = 6 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking z alone or x+y alone is enough"
      ],
      "solveSteps": [
        "1. Mean = (x+y+z)/3",
        "2. Combine partial sum + missing term",
        "3. → C"
      ]
    }
  },
  "315": {
    "hint": "30 = lcm(5,6) = lcm(10,3). (1) and (2) each force multiple of 30 → D.",
    "theory": {
      "title": "DS — Multiple of 30 via Two Coprime-ish Pairs",
      "icon": "📊",
      "summary": "30 = 2·3·5. Multiple of 5 AND 6 → lcm 30. Multiple of 10 AND 3 → lcm 30. Each pair independently covers all prime factors.",
      "keyFacts": [
        "(1) 5|n and 6|n → lcm(5,6)=30 → 30|n: sufficient",
        "(2) 10|n and 3|n → lcm(10,3)=30 → 30|n: sufficient",
        "30 = 2·3·5; each pair supplies all three primes",
        "Each alone → D"
      ],
      "example": {
        "problem": "Is n a multiple of 30? (1) mult of 5 & 6 (2) mult of 10 & 3",
        "steps": [
          "(1) lcm(5,6)=30 → SUFFICIENT",
          "(2) lcm(10,3)=30 → SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Computing 5·6=30 by luck but 10·3=30 too — verify via lcm, not product"
      ],
      "solveSteps": [
        "1. 30 = 2·3·5",
        "2. Does each pair's lcm = 30?",
        "3. Both yes → D"
      ]
    }
  },
  "316": {
    "hint": "(a+b)²=a²+2ab+b². (1) a+b=10, (2) a²+b²=50 → ab=25. Need both → C.",
    "theory": {
      "title": "DS — Rectangle Area via the Square Identity",
      "icon": "📊",
      "summary": "Area = ab. From (a+b)² = a²+2ab+b², the perimeter gives a+b and the diagonal gives a²+b²; together they isolate ab.",
      "keyFacts": [
        "(1) perimeter 20 → a+b=10 alone: area varies (9·1 vs 5·5) → insufficient",
        "(2) diagonal √50 → a²+b²=50 alone: area varies → insufficient",
        "(a+b)² = a²+2ab+b² → 100 = 50 + 2ab → ab=25",
        "Area = ab = 25"
      ],
      "example": {
        "problem": "Rectangle area? (1) perimeter 20 (2) diagonal √50",
        "steps": [
          "Each alone: area not fixed → insufficient",
          "100 = 50 + 2ab → ab = 25 → C"
        ],
        "answer": "C"
      },
      "traps": [
        "Thinking perimeter alone (a+b) determines area"
      ],
      "solveSteps": [
        "1. (a+b)² = a²+2ab+b²",
        "2. Substitute both statements",
        "3. Solve ab → C"
      ]
    }
  },
  "317": {
    "hint": "(1) 0<x<1 → 1/x>1>x: always yes. (2) x>0 mixes yes/no. A.",
    "theory": {
      "title": "DS — 1/x vs x by Interval",
      "icon": "📊",
      "summary": "For 0<x<1, the reciprocal exceeds 1 and thus exceeds x. For x>1 it's the opposite, so 'x>0' alone is ambiguous.",
      "keyFacts": [
        "(1) 0<x<1 → 1/x > 1 > x → 1/x > x: always YES → sufficient",
        "(2) x>0: x=0.5 → yes; x=2 → 1/2<2 no → insufficient",
        "Reciprocal flips the comparison across x=1",
        "One sufficient, one not → A"
      ],
      "example": {
        "problem": "Is 1/x > x? (1) 0<x<1 (2) x>0",
        "steps": [
          "(1) e.g. x=0.5 → 2 > 0.5: always yes → SUFFICIENT",
          "(2) x=2 → no; x=0.5 → yes → insufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Assuming x>0 makes 1/x>x (fails for x>1)"
      ],
      "solveSteps": [
        "1. Compare 1/x and x by interval around 1",
        "2. Statement inside one interval → sufficient",
        "3. → A"
      ]
    }
  },
  "318": {
    "hint": "Both give original salt = 3 L → new = 3/15 = 20%. Each alone → D.",
    "theory": {
      "title": "DS — Dilution: Either Route to Solute Amount",
      "icon": "📊",
      "summary": "New concentration = salt / (10+5). Both statements independently give the salt amount (3 L), so each suffices.",
      "keyFacts": [
        "(1) x=30 → salt = 30% of 10 = 3 L: sufficient",
        "(2) salt = 3 L directly: sufficient",
        "New = 3 / (10+5) = 20% either way",
        "Each alone → D"
      ],
      "example": {
        "problem": "New % after +5 L water? (1) x=30 (2) salt = 3 L",
        "steps": [
          "(1) salt = 3 L → 3/15 = 20%: SUFFICIENT",
          "(2) salt = 3 L → 20%: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C — each statement independently pins the salt"
      ],
      "solveSteps": [
        "1. New % = solute / new total",
        "2. Each statement gives the solute",
        "3. → D"
      ]
    }
  },
  "319": {
    "hint": "(1) 4^x=2^(2x)=64=2^6 → x=3 → 2^x=8. (2) x=3 → 8. Each alone → D.",
    "theory": {
      "title": "DS — Same-Base Exponent Recovery",
      "icon": "📊",
      "summary": "4^x = 2^(2x); equate to 2^6 to get x. The explicit x=3 does it directly. Each statement yields 2^x.",
      "keyFacts": [
        "(1) 4^x = 2^(2x) = 64 = 2^6 → 2x=6 → x=3 → 2^x=8: sufficient",
        "(2) x=3 → 2^3 = 8: sufficient",
        "Rewrite to a common base to solve",
        "Each alone → D"
      ],
      "example": {
        "problem": "2^x? (1) 4^x=64 (2) x=3",
        "steps": [
          "(1) 2^(2x)=2^6 → x=3 → 8: SUFFICIENT",
          "(2) 2^3=8: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Thinking (1) only gives 4^x, not 2^x — rewrite the base"
      ],
      "solveSteps": [
        "1. Express on a common base",
        "2. Solve the exponent",
        "3. Each yields 2^x → D"
      ]
    }
  },
  "320": {
    "hint": "(1) n=5k+7=5(k+1)+2 → rem 2. (2) n=10m+2 → rem 2. Each alone → D.",
    "theory": {
      "title": "DS — Remainder mod 5 From Either Form",
      "icon": "📊",
      "summary": "Reduce each description modulo 5. '7 more than a multiple of 5' and 'remainder 2 mod 10' both yield remainder 2 mod 5.",
      "keyFacts": [
        "(1) n = 5k+7 = 5(k+1)+2 → remainder 2: sufficient",
        "(2) n = 10m+2 → 10m divisible by 5 → remainder 2: sufficient",
        "mod 10 info refines mod 5 (10 is a multiple of 5)",
        "Each alone → D"
      ],
      "example": {
        "problem": "n mod 5? (1) n = mult of 5 + 7 (2) n mod 10 = 2",
        "steps": [
          "(1) 5(k+1)+2 → rem 2: SUFFICIENT",
          "(2) 10m+2 → rem 2: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Reading '7 more' as remainder 7 (must reduce: 7 mod 5 = 2)"
      ],
      "solveSteps": [
        "1. Write n in the stated form",
        "2. Reduce mod 5",
        "3. Each gives the remainder → D"
      ]
    }
  },
  "321": {
    "hint": "(1) equilateral perim 18 → side 6 = AB: sufficient. (2) isosceles, no length. A.",
    "theory": {
      "title": "DS — A Length Needs a Scale, Not Just Shape",
      "icon": "📊",
      "summary": "Equilateral + perimeter gives an exact side. 'Angle A = angle C' only says the triangle is isosceles — no measurement.",
      "keyFacts": [
        "(1) equilateral, perimeter 18 → each side 18/3 = 6 → AB=6: sufficient",
        "(2) A=C → sides opposite equal (AB=BC), but no length → insufficient",
        "Angle equality gives shape, not size",
        "One sufficient, one not → A"
      ],
      "example": {
        "problem": "Length AB? (1) equilateral, perim 18 (2) ∠A=∠C",
        "steps": [
          "(1) side = 6 → AB=6: SUFFICIENT",
          "(2) isosceles only, no length: insufficient",
          "Only (1) → A"
        ],
        "answer": "A"
      },
      "traps": [
        "Thinking angle equality yields a side length"
      ],
      "solveSteps": [
        "1. A length needs a scale (perimeter/side)",
        "2. Angle info alone = shape only",
        "3. → A"
      ]
    }
  },
  "322": {
    "hint": "Both give N=36=2²·3² → divisor count (2+1)(2+1)=9. Each alone → D.",
    "theory": {
      "title": "DS — Divisor Count From Prime Factorization",
      "icon": "📊",
      "summary": "Number of divisors = product of (exponent+1). N=36 and N=2²·3² are the same number, each fully determining the count.",
      "keyFacts": [
        "(1) N=36 → 2²·3² → (2+1)(2+1)=9: sufficient",
        "(2) N=2²·3² = 36 → same → 9: sufficient",
        "d(N) = ∏(eᵢ+1)",
        "Each alone → D"
      ],
      "example": {
        "problem": "Divisors of N? (1) N=36 (2) N=2²·3²",
        "steps": [
          "(1) factor 2²3² → 3·3 = 9: SUFFICIENT",
          "(2) directly 9: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Listing divisors and miscounting; the formula (e+1)(f+1) is safer"
      ],
      "solveSteps": [
        "1. Prime factorize",
        "2. d = ∏(exponent+1)",
        "3. Each statement → 9 → D"
      ]
    }
  },
  "323": {
    "hint": "xy>0 means same sign. (1)&(2) both true with x=2,y=−1 → xy<0. E.",
    "theory": {
      "title": "DS — Sign of a Product Undetermined",
      "icon": "📊",
      "summary": "xy>0 means x and y share a sign. x−y>0 and x+y>0 don't pin signs — counterexamples exist even together.",
      "keyFacts": [
        "(1) x−y>0: x=2,y=1 (xy>0) vs x=2,y=−1 (xy<0) → insufficient",
        "(2) x+y>0: similar mixed cases → insufficient",
        "Together: x=2,y=1 → xy=2>0; x=3,y=−1 → both hold, xy=−3<0",
        "Same statements, opposite xy signs → E"
      ],
      "example": {
        "problem": "Is xy>0? (1) x−y>0 (2) x+y>0",
        "steps": [
          "x=2,y=1: both hold, xy=2>0",
          "x=3,y=−1: both hold, xy=−3<0",
          "Contradictory → E"
        ],
        "answer": "E"
      },
      "traps": [
        "Assuming both inequalities force x,y positive"
      ],
      "solveSteps": [
        "1. xy>0 ⇔ same sign",
        "2. Seek counterexamples satisfying both",
        "3. Found → E"
      ]
    }
  },
  "324": {
    "hint": "(1) 12+5=17. (2) 20−3=17. Each alone → D.",
    "theory": {
      "title": "DS — Age From a Single Time-Anchor",
      "icon": "📊",
      "summary": "Each statement ties John's age to one known point in time; shifting it to 'now' gives a unique age.",
      "keyFacts": [
        "(1) 5 yr ago = 12 → now = 12+5 = 17: sufficient",
        "(2) in 3 yr = 20 → now = 20−3 = 17: sufficient",
        "One absolute age at a known offset → present age",
        "Each alone → D"
      ],
      "example": {
        "problem": "John now? (1) 5y ago 12 (2) in 3y 20",
        "steps": [
          "(1) 12+5 = 17: SUFFICIENT",
          "(2) 20−3 = 17: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Marking C because both give 17 — each suffices alone"
      ],
      "solveSteps": [
        "1. Shift the stated age to the present",
        "2. Each statement → unique now → D"
      ]
    }
  },
  "325": {
    "hint": "(1) area 16π → r=4 → C=8π. (2) r=4 → C=8π. Each alone → D.",
    "theory": {
      "title": "DS — Circumference From Area or Radius",
      "icon": "📊",
      "summary": "Circumference needs r. Area gives r via πr²; the radius is given directly. Each route works alone.",
      "keyFacts": [
        "(1) πr²=16π → r²=16 → r=4 → C=2π·4=8π: sufficient",
        "(2) r=4 → C=8π: sufficient",
        "Any single circle measure determines all others",
        "Each alone → D"
      ],
      "example": {
        "problem": "Circumference? (1) area 16π (2) radius 4",
        "steps": [
          "(1) r=4 → C=8π: SUFFICIENT",
          "(2) r=4 → C=8π: SUFFICIENT",
          "Each alone → D"
        ],
        "answer": "D"
      },
      "traps": [
        "Taking r²=16 → r=16 (skipped the square root)"
      ],
      "solveSteps": [
        "1. Need r for circumference",
        "2. Area→r or r given directly",
        "3. Each → D"
      ]
    }
  },
  "326": {
    "hint": "LEVEL: 5 letters, L×2, E×2 → 5!/(2!2!) = 30.",
    "theory": {
      "title": "Counting — Permutations With Repeats",
      "icon": "🔢",
      "summary": "Arrangements of a word with repeated letters = n! divided by the factorial of each repeat count.",
      "keyFacts": [
        "LEVEL: L,E,V,E,L → 5 letters",
        "L appears 2×, E appears 2×",
        "Arrangements = 5!/(2!·2!) = 120/4",
        "= 30"
      ],
      "example": {
        "problem": "Distinct arrangements of 'LEVEL'?",
        "steps": [
          "5! = 120",
          "÷ (2!·2!) = 120/4 = 30 → C"
        ],
        "answer": "C (30)"
      },
      "traps": [
        "Using 5!=120 (ignores the repeated L's and E's)"
      ],
      "solveSteps": [
        "1. n! for total letters",
        "2. Divide by factorial of each repeat count"
      ]
    }
  },
  "327": {
    "hint": "Pick per group: C(6,2)·C(5,2) = 15·10 = 150.",
    "theory": {
      "title": "Counting — Exactly k From Each Group",
      "icon": "🔢",
      "summary": "Choose the required count from each group independently and multiply.",
      "keyFacts": [
        "Men: C(6,2) = 15",
        "Women: C(5,2) = 10",
        "Total = 15 · 10 = 150",
        "Groups chosen independently → multiply"
      ],
      "example": {
        "problem": "4-committee, exactly 2M & 2W from 6M/5W?",
        "steps": [
          "C(6,2)=15, C(5,2)=10",
          "15·10 = 150 → C"
        ],
        "answer": "C (150)"
      },
      "traps": [
        "Adding (15+10) or using C(11,4) (ignores the split)"
      ],
      "solveSteps": [
        "1. C(group, required) per group",
        "2. Multiply"
      ]
    }
  },
  "328": {
    "hint": "Glue the 2 → 4! arrangements ×2 internal order = 24·2 = 48.",
    "theory": {
      "title": "Counting — Two Items Must Be Adjacent",
      "icon": "🔢",
      "summary": "Treat the adjacent pair as one block (n−1 units → (n−1)! arrangements), then ×2 for the pair's internal order.",
      "keyFacts": [
        "5 books, 2 must be together → block of 1 + 3 others = 4 units",
        "4! = 24 arrangements of the units",
        "Block internal order ×2",
        "24·2 = 48"
      ],
      "example": {
        "problem": "5 books, 2 specific adjacent; arrangements?",
        "steps": [
          "Block → 4 units → 4! = 24",
          "×2 internal → 48 → C"
        ],
        "answer": "C (48)"
      },
      "traps": [
        "Forgetting ×2 (gives 24) — the pair has two internal orders"
      ],
      "solveSteps": [
        "1. Glue the pair → (n−1)! ",
        "2. ×2 for internal order"
      ]
    }
  },
  "329": {
    "hint": "Without replacement: (13/52)·(12/51) = 1/4 · 12/51 = 1/17.",
    "theory": {
      "title": "Probability — Two Hearts, No Replacement",
      "icon": "🎲",
      "summary": "Multiply sequential probabilities; the deck shrinks after the first draw.",
      "keyFacts": [
        "P(1st heart) = 13/52 = 1/4",
        "P(2nd heart | 1st) = 12/51",
        "Product = (13·12)/(52·51) = 156/2652",
        "Simplify → 1/17"
      ],
      "example": {
        "problem": "Two cards, both hearts (no replacement)?",
        "steps": [
          "13/52 · 12/51",
          "= 156/2652 = 1/17 → B"
        ],
        "answer": "B (1/17)"
      },
      "traps": [
        "Using 13/52 twice (with-replacement) → 1/16, the decoy"
      ],
      "solveSteps": [
        "1. P(first) then P(second | first)",
        "2. Multiply and simplify"
      ]
    }
  },
  "330": {
    "hint": "Binomial: C(4,2)/2⁴ = 6/16 = 3/8.",
    "theory": {
      "title": "Probability — Exactly k Heads in n Tosses",
      "icon": "🎲",
      "summary": "P(exactly k heads) = C(n,k) / 2ⁿ for a fair coin.",
      "keyFacts": [
        "Total outcomes = 2⁴ = 16",
        "Ways for exactly 2 heads = C(4,2) = 6",
        "P = 6/16",
        "Simplify → 3/8"
      ],
      "example": {
        "problem": "4 tosses, P(exactly 2 heads)?",
        "steps": [
          "C(4,2)=6, total 16",
          "6/16 = 3/8 → C"
        ],
        "answer": "C (3/8)"
      },
      "traps": [
        "Using 1/2·1/2=1/4 (ignores the number of head positions)"
      ],
      "solveSteps": [
        "1. C(n,k) favorable",
        "2. ÷ 2ⁿ, simplify"
      ]
    }
  },
  "331": {
    "hint": "One-of-each = C(4,1)·C(6,1)/C(10,2) = 24/45 = 8/15.",
    "theory": {
      "title": "Probability — One From Each Colour",
      "icon": "🎲",
      "summary": "Favorable = (ways to pick 1 red)·(ways to pick 1 blue); divide by total unordered pairs C(10,2).",
      "keyFacts": [
        "C(4,1)=4 reds, C(6,1)=6 blues → 24 favorable pairs",
        "Total = C(10,2) = 45",
        "P = 24/45 = 8/15",
        "Unordered: pairing handles red-then-blue and blue-then-red together"
      ],
      "example": {
        "problem": "4R,6B, draw 2; P(one of each)?",
        "steps": [
          "Favorable = 4·6 = 24",
          "24 / C(10,2)=45 → 8/15 → B"
        ],
        "answer": "B (8/15)"
      },
      "traps": [
        "Forgetting both draw orders (if using sequential probs, must add RB and BR)"
      ],
      "solveSteps": [
        "1. Favorable = product of single-colour picks",
        "2. ÷ C(total,2)",
        "3. Simplify"
      ]
    }
  },
  "332": {
    "hint": "d = (a₇−a₃)/(7−3) = 16/4 = 4. a₂₀ = a₁+19d = 3+76 = 79.",
    "theory": {
      "title": "Sequence — Common Difference From Two Terms",
      "icon": "🔢",
      "summary": "d = (term gap)/(index gap). Recover a₁, then use aₙ = a₁+(n−1)d.",
      "keyFacts": [
        "d = (27−11)/(7−3) = 16/4 = 4",
        "a₁ = a₃ − 2d = 11 − 8 = 3",
        "a₂₀ = 3 + 19·4 = 79",
        "Index gap is 4, not 7"
      ],
      "example": {
        "problem": "AP: a₃=11, a₇=27; a₂₀?",
        "steps": [
          "d = 16/4 = 4",
          "a₁=3 → a₂₀ = 3+76 = 79 → B"
        ],
        "answer": "B (79)"
      },
      "traps": [
        "Dividing the term gap by 7 instead of (7−3)"
      ],
      "solveSteps": [
        "1. d = Δterm / Δindex",
        "2. Back out a₁",
        "3. aₙ = a₁+(n−1)d"
      ]
    }
  },
  "333": {
    "hint": "Σ first 50 evens = 2·(1+…+50) = 2·1275 = 2550.",
    "theory": {
      "title": "Series — Sum of First n Even Integers",
      "icon": "🔢",
      "summary": "Factor out 2: sum of first n evens = 2·(1+2+…+n) = n(n+1).",
      "keyFacts": [
        "2+4+…+100 = 2(1+2+…+50)",
        "1+…+50 = 50·51/2 = 1275",
        "2·1275 = 2550",
        "Closed form: n(n+1) = 50·51 = 2550"
      ],
      "example": {
        "problem": "Sum of first 50 positive even integers?",
        "steps": [
          "2·(50·51/2)",
          "= 2550 → C"
        ],
        "answer": "C (2550)"
      },
      "traps": [
        "Using n²=2500 (that's sum of first n ODD integers)"
      ],
      "solveSteps": [
        "1. Factor 2 out",
        "2. Triangular number 1..n",
        "3. ×2 → n(n+1)"
      ]
    }
  },
  "334": {
    "hint": "GP sum = a(rⁿ−1)/(r−1) = 2(243−1)/2 = 242.",
    "theory": {
      "title": "Series — Geometric Sum",
      "icon": "🔢",
      "summary": "Sₙ = a(rⁿ−1)/(r−1). Plug a=2, r=3, n=5.",
      "keyFacts": [
        "r⁵ = 3⁵ = 243",
        "S₅ = 2(243−1)/(3−1) = 2·242/2",
        "= 242",
        "Direct: 2+6+18+54+162 = 242"
      ],
      "example": {
        "problem": "GP a=2, r=3, sum of 5 terms?",
        "steps": [
          "2(3⁵−1)/(3−1)",
          "= 242 → C"
        ],
        "answer": "C (242)"
      },
      "traps": [
        "Using n=5 as 3⁴ (off-by-one in rⁿ)"
      ],
      "solveSteps": [
        "1. Sₙ = a(rⁿ−1)/(r−1)",
        "2. Substitute and compute"
      ]
    }
  },
  "335": {
    "hint": "r³ = a₇/a₄ = 192/24 = 8 → r=2. a₁ = 24/r³ = 24/8 = 3.",
    "theory": {
      "title": "Sequence — GP Ratio From Two Terms",
      "icon": "🔢",
      "summary": "aₘ/aₖ = r^(m−k). Solve r, then back out a₁ from a known term.",
      "keyFacts": [
        "a₇/a₄ = r³ = 192/24 = 8 → r = 2",
        "a₄ = a₁·r³ → 24 = a₁·8",
        "a₁ = 3",
        "Index gap 7−4 = 3 → r³"
      ],
      "example": {
        "problem": "GP a₄=24, a₇=192; a₁?",
        "steps": [
          "r³ = 8 → r=2",
          "a₁ = 24/8 = 3 → C"
        ],
        "answer": "C (3)"
      },
      "traps": [
        "Using r⁴ or r⁷ instead of r^(7−4)=r³"
      ],
      "solveSteps": [
        "1. r^(Δindex) = ratio of terms",
        "2. Solve r",
        "3. Back out a₁"
      ]
    }
  },
  "336": {
    "hint": "Factor: x³−6x²+5x = x(x²−6x+5) = x·0 = 0.",
    "theory": {
      "title": "Algebra — Substitute the Zero Expression",
      "icon": "🔢",
      "summary": "Spot that the target factors to contain the given quadratic, which equals 0 — so the whole product is 0.",
      "keyFacts": [
        "Given x²−6x+5 = 0",
        "x³−6x²+5x = x(x²−6x+5)",
        "= x · 0 = 0",
        "No need to solve for x explicitly"
      ],
      "example": {
        "problem": "x²−6x+5=0; x³−6x²+5x?",
        "steps": [
          "Factor out x → x(x²−6x+5)",
          "= x·0 = 0 → B"
        ],
        "answer": "B (0)"
      },
      "traps": [
        "Solving for x (1 or 5) and plugging in — slower and error-prone"
      ],
      "solveSteps": [
        "1. Factor the target to expose the given expression",
        "2. Substitute its zero value"
      ]
    }
  },
  "337": {
    "hint": "Square it: (x+1/x)² = x²+2+1/x² = 16 → x²+1/x² = 14.",
    "theory": {
      "title": "Algebra — Square the Sum Identity",
      "icon": "🔢",
      "summary": "(x+1/x)² = x² + 2 + 1/x². Square the given, subtract the cross term 2.",
      "keyFacts": [
        "(x+1/x)² = x² + 2·x·(1/x) + 1/x² = x²+2+1/x²",
        "4² = 16 = x²+2+1/x²",
        "x²+1/x² = 16 − 2 = 14",
        "Cross term is always 2 here"
      ],
      "example": {
        "problem": "x+1/x=4; x²+1/x²?",
        "steps": [
          "Square → 16 = x²+2+1/x²",
          "Subtract 2 → 14 → B"
        ],
        "answer": "B (14)"
      },
      "traps": [
        "Forgetting the +2 cross term (would give 16)"
      ],
      "solveSteps": [
        "1. Square the given sum",
        "2. Subtract the 2 cross term"
      ]
    }
  },
  "338": {
    "hint": "4^y = 2^(2y) → 2^(x+2y) = 2^6 → x+2y = 6.",
    "theory": {
      "title": "Exponents — Common Base Then Equate",
      "icon": "🔢",
      "summary": "Rewrite 4^y as 2^(2y); the product becomes 2^(x+2y). Match exponents to 64=2^6.",
      "keyFacts": [
        "4^y = (2²)^y = 2^(2y)",
        "2^x · 2^(2y) = 2^(x+2y)",
        "64 = 2^6 → x+2y = 6",
        "Equal bases → equate exponents"
      ],
      "example": {
        "problem": "2^x·4^y=64; x+2y?",
        "steps": [
          "2^(x+2y) = 2^6",
          "x+2y = 6 → C"
        ],
        "answer": "C (6)"
      },
      "traps": [
        "Treating 4^y as 2^y (it's 2^(2y))"
      ],
      "solveSteps": [
        "1. Rewrite all on base 2",
        "2. Combine exponents",
        "3. Equate to 2^6"
      ]
    }
  },
  "339": {
    "hint": "3^(2x)=81=3⁴ → x=2 → 3^(x+1)=3³=27.",
    "theory": {
      "title": "Exponents — Solve x Then Re-substitute",
      "icon": "🔢",
      "summary": "Match 3^(2x) to a power of 3 to get x, then evaluate the asked expression.",
      "keyFacts": [
        "81 = 3⁴ → 2x = 4 → x = 2",
        "3^(x+1) = 3^(2+1) = 3³",
        "= 27",
        "Don't stop at x; answer the asked power"
      ],
      "example": {
        "problem": "3^(2x)=81; 3^(x+1)?",
        "steps": [
          "2x=4 → x=2",
          "3³ = 27 → C"
        ],
        "answer": "C (27)"
      },
      "traps": [
        "Reporting x=2 or 3²=9 instead of 3^(x+1)"
      ],
      "solveSteps": [
        "1. Equate to a power of 3 → x",
        "2. Substitute into the target"
      ]
    }
  },
  "340": {
    "hint": "|x−3|<5 → −2<x<8; x>0 → {1..7} → 7 integers.",
    "theory": {
      "title": "Inequalities — Intersect Two Constraints",
      "icon": "🔢",
      "summary": "Solve the absolute-value band, intersect with x>0, then count integers strictly inside.",
      "keyFacts": [
        "|x−3|<5 → −2 < x < 8",
        "x>0 → 0 < x < 8",
        "Integers: 1,2,3,4,5,6,7",
        "Strict bounds exclude 0 and 8"
      ],
      "example": {
        "problem": "|x−3|<5 and x>0; integer count?",
        "steps": [
          "−2<x<8 ∩ x>0 → 0<x<8",
          "{1..7} → 7 → C"
        ],
        "answer": "C (7)"
      },
      "traps": [
        "Including 0 or 8 (strict inequalities exclude them)"
      ],
      "solveSteps": [
        "1. Solve |x−c|<r",
        "2. Intersect with the other constraint",
        "3. Count integers"
      ]
    }
  },
  "341": {
    "hint": "Inner first: g(2)=5, f(5)=2·5−3=7.",
    "theory": {
      "title": "Functions — Composition Order",
      "icon": "🔢",
      "summary": "f(g(2)): evaluate g first, feed into f.",
      "keyFacts": [
        "g(2) = 2²+1 = 5",
        "f(5) = 2·5−3 = 7",
        "Inner function first",
        "f(g(x)) ≠ g(f(x)) in general"
      ],
      "example": {
        "problem": "f=2x−3, g=x²+1; f(g(2))?",
        "steps": [
          "g(2)=5",
          "f(5)=7 → B"
        ],
        "answer": "B (7)"
      },
      "traps": [
        "Applying f first (wrong order)"
      ],
      "solveSteps": [
        "1. Evaluate inner",
        "2. Feed into outer"
      ]
    }
  },
  "342": {
    "hint": "g(f(3))=g(9)=11; f(g(3))=f(5)=25; 11−25 = −14.",
    "theory": {
      "title": "Functions — Two Compositions Differ",
      "icon": "🔢",
      "summary": "Composition is not commutative. Compute each direction separately, then subtract.",
      "keyFacts": [
        "f(3)=9 → g(9)=9+2=11",
        "g(3)=5 → f(5)=5²=25",
        "g(f(3)) − f(g(3)) = 11 − 25",
        "= −14"
      ],
      "example": {
        "problem": "f=x², g=x+2; g(f(3))−f(g(3))?",
        "steps": [
          "g(f(3))=11, f(g(3))=25",
          "11−25 = −14 → A"
        ],
        "answer": "A (−14)"
      },
      "traps": [
        "Assuming the two compositions are equal (they're not)"
      ],
      "solveSteps": [
        "1. Compute each composition fully",
        "2. Subtract in the stated order"
      ]
    }
  },
  "343": {
    "hint": "Primes 30–50: 31,37,41,43,47 → 5.",
    "theory": {
      "title": "Number Theory — Count Primes in a Range",
      "icon": "🔢",
      "summary": "Test each odd non-multiple-of-5 in the range for divisibility by small primes.",
      "keyFacts": [
        "Skip evens and multiples of 5",
        "31,37,41,43,47 are prime",
        "33=3·11, 39=3·13, 49=7² are NOT prime",
        "Count = 5"
      ],
      "example": {
        "problem": "Primes between 30 and 50?",
        "steps": [
          "Candidates 31,37,41,43,47",
          "All prime → 5 → C"
        ],
        "answer": "C (5)"
      },
      "traps": [
        "Counting 49 as prime (7×7) or missing 31"
      ],
      "solveSteps": [
        "1. List odd, non-5 candidates",
        "2. Trial-divide by 3,7",
        "3. Count survivors"
      ]
    }
  },
  "344": {
    "hint": "Units of 3^n cycle 3,9,7,1 (period 4). 45 mod 4 = 1 → 3.",
    "theory": {
      "title": "Number Theory — Units Digit Cycle",
      "icon": "🔢",
      "summary": "Only the base's units digit (3) matters. 3^n units cycle 3,9,7,1 with period 4.",
      "keyFacts": [
        "13 ends in 3 → use 3^n",
        "Cycle: 3¹→3, 3²→9, 3³→7, 3⁴→1",
        "45 mod 4 = 1 → first in cycle → 3",
        "Period is 4"
      ],
      "example": {
        "problem": "Units digit of 13^45?",
        "steps": [
          "Cycle 3,9,7,1",
          "45 mod 4 = 1 → 3 → B"
        ],
        "answer": "B (3)"
      },
      "traps": [
        "45 mod 4 = 1 but indexing the cycle from 0 → wrong term"
      ],
      "solveSteps": [
        "1. Units digit of base",
        "2. Find its 4-cycle",
        "3. Exponent mod 4 → term"
      ]
    }
  },
  "345": {
    "hint": "Rem mod 10 = units digit. 7^n cycle 7,9,3,1; 100 mod 4 = 0 → 1.",
    "theory": {
      "title": "Number Theory — Remainder mod 10 = Units Digit",
      "icon": "🔢",
      "summary": "Mod 10 is the units digit. 7^n cycles 7,9,3,1 (period 4); exponent ≡ 0 mod 4 → the 4th term (1).",
      "keyFacts": [
        "7¹→7, 7²→9, 7³→3, 7⁴→1",
        "100 mod 4 = 0 → last in cycle → 1",
        "mod 10 ⇔ units digit",
        "Period 4"
      ],
      "example": {
        "problem": "7^100 mod 10?",
        "steps": [
          "Cycle 7,9,3,1",
          "100 mod 4 = 0 → 1 → A"
        ],
        "answer": "A (1)"
      },
      "traps": [
        "Treating 100 mod 4 = 0 as the 1st term instead of the 4th"
      ],
      "solveSteps": [
        "1. mod 10 = units digit",
        "2. 4-cycle of the base",
        "3. exp mod 4 (0 → 4th term)"
      ]
    }
  },
  "346": {
    "hint": "45-45-90: hyp = leg·√2 = 6√2.",
    "theory": {
      "title": "Triangles — Isosceles Right Hypotenuse",
      "icon": "📐",
      "summary": "Legs equal, ratio 1:1:√2. Hypotenuse = leg × √2.",
      "keyFacts": [
        "45-45-90 ratio = 1 : 1 : √2",
        "Hyp = 6·√2 = 6√2",
        "Pythagoras check: √(6²+6²)=√72=6√2",
        "Not 6·2=12"
      ],
      "example": {
        "problem": "Isosceles right, legs 6; hypotenuse?",
        "steps": [
          "leg·√2",
          "= 6√2 → B"
        ],
        "answer": "B (6√2)"
      },
      "traps": [
        "Multiplying by 2 instead of √2"
      ],
      "solveSteps": [
        "1. Recognize 45-45-90",
        "2. Hyp = leg·√2"
      ]
    }
  },
  "347": {
    "hint": "(6−2)·180 = 720°.",
    "theory": {
      "title": "Polygons — Hexagon Interior Sum",
      "icon": "📐",
      "summary": "Interior angle sum = (n−2)·180°. For n=6 → 720°.",
      "keyFacts": [
        "n = 6",
        "(6−2)·180 = 4·180",
        "= 720°",
        "'Regular' doesn't change the sum, only per-angle"
      ],
      "example": {
        "problem": "Interior angle sum, regular hexagon?",
        "steps": [
          "(6−2)·180",
          "= 720° → C"
        ],
        "answer": "C (720°)"
      },
      "traps": [
        "Computing per-angle 120° instead of the sum"
      ],
      "solveSteps": [
        "1. (n−2)·180",
        "2. Evaluate for n=6"
      ]
    }
  },
  "348": {
    "hint": "Inscribed → r = side/2 = 5. 100 − π·25 = 100 − 25π.",
    "theory": {
      "title": "Geometry — Square Minus Inscribed Circle",
      "icon": "📐",
      "summary": "Inscribed circle diameter = square side. Subtract circle area from square area.",
      "keyFacts": [
        "Side 10 → circle diameter 10 → r=5",
        "Square area = 100",
        "Circle area = π·5² = 25π",
        "Leftover = 100 − 25π"
      ],
      "example": {
        "problem": "Square side 10, inscribed circle; outside-circle area?",
        "steps": [
          "r=5 → circle 25π",
          "100 − 25π → A"
        ],
        "answer": "A (100 − 25π)"
      },
      "traps": [
        "Using r=10 → 100−100π (negative, impossible)"
      ],
      "solveSteps": [
        "1. r = side/2",
        "2. Square − πr²"
      ]
    }
  },
  "349": {
    "hint": "V = πr²h = π·9·7 = 63π.",
    "theory": {
      "title": "Solids — Cylinder Volume",
      "icon": "📐",
      "summary": "V = πr²h. Square r first.",
      "keyFacts": [
        "r=3 → r²=9",
        "V = π·9·7",
        "= 63π",
        "Radius squared, height linear"
      ],
      "example": {
        "problem": "Cylinder r=3, h=7; volume?",
        "steps": [
          "r²=9",
          "π·9·7 = 63π → D"
        ],
        "answer": "D (63π)"
      },
      "traps": [
        "Not squaring r → 21π"
      ],
      "solveSteps": [
        "1. r²",
        "2. ×h×π"
      ]
    }
  },
  "350": {
    "hint": "√((5+3)²+(−2−4)²)=√(64+36)=√100=10.",
    "theory": {
      "title": "Coordinate — Distance With Negatives",
      "icon": "📐",
      "summary": "Distance = √(Δx²+Δy²). Be careful with signs in the differences; squaring removes them.",
      "keyFacts": [
        "Δx = 5−(−3) = 8",
        "Δy = −2−4 = −6",
        "√(8²+(−6)²) = √(64+36) = √100",
        "= 10"
      ],
      "example": {
        "problem": "Distance (−3,4)–(5,−2)?",
        "steps": [
          "Δ=(8,−6)",
          "√100 = 10 → B"
        ],
        "answer": "B (10)"
      },
      "traps": [
        "Sign slip: 5−(−3)=8 not 2; squaring fixes the −6"
      ],
      "solveSteps": [
        "1. Δx, Δy (mind signs)",
        "2. √(Δx²+Δy²)"
      ]
    }
  },
  "351": {
    "hint": "Subtract the equations: (3x+2y)−(2x+3y) = x−y = 17−13 = 4.",
    "theory": {
      "title": "Systems — Subtract for x−y Directly",
      "icon": "🔢",
      "summary": "When asked for x−y from a symmetric pair, subtract the equations — the answer pops out without solving for x and y.",
      "keyFacts": [
        "(3x+2y) − (2x+3y) = x − y",
        "RHS: 17 − 13 = 4",
        "So x − y = 4",
        "Symmetric coefficient swap → difference trick"
      ],
      "example": {
        "problem": "3x+2y=17, 2x+3y=13; x−y?",
        "steps": [
          "Subtract equations → x−y on left",
          "17−13 = 4 → D"
        ],
        "answer": "D (4)"
      },
      "traps": [
        "Fully solving the system instead of subtracting"
      ],
      "solveSteps": [
        "1. See what's asked (x−y)",
        "2. Subtract equations to form it"
      ]
    }
  },
  "352": {
    "hint": "Median = 3rd of 5. Already-sorted form requires x ≥ 11. Smallest = 11.",
    "theory": {
      "title": "Statistics — Median Position Constraint",
      "icon": "📊",
      "summary": "With the set written in increasing order {3,7,11,x,17}, the 3rd value (11) is the median only if x sits at or after position 4 — i.e. x ≥ 11.",
      "keyFacts": [
        "5 numbers → median is the 3rd sorted value",
        "Listed increasing: 3,7,11,x,17 → 11 is 3rd if x ≥ 11",
        "x < 11 would push 11 out of the middle slot",
        "Smallest integer x = 11"
      ],
      "example": {
        "problem": "Median of {3,7,11,x,17}=11; smallest x?",
        "steps": [
          "x must be ≥ 11 to keep 11 in position 3",
          "Smallest integer = 11 → C"
        ],
        "answer": "C (11)"
      },
      "traps": [
        "Picking x=7 or 8 — that reorders the set and changes the median"
      ],
      "solveSteps": [
        "1. Median = middle position",
        "2. Constrain x so the median value stays put",
        "3. Take the boundary"
      ]
    }
  },
  "353": {
    "hint": "Removed = old sum − new sum = 7·12 − 6·11 = 84−66 = 18.",
    "theory": {
      "title": "Statistics — Removed Value via Sums",
      "icon": "📊",
      "summary": "Convert both means to totals; the removed number is the difference of the two sums.",
      "keyFacts": [
        "Old sum = 7·12 = 84",
        "New sum = 6·11 = 66",
        "Removed = 84 − 66 = 18",
        "Mean change × count tells you nothing without converting to sums"
      ],
      "example": {
        "problem": "7 nums mean 12; remove one → 6 nums mean 11. Removed?",
        "steps": [
          "84 − 66",
          "= 18 → D"
        ],
        "answer": "D (18)"
      },
      "traps": [
        "Subtracting means (12−11=1) instead of sums"
      ],
      "solveSteps": [
        "1. Each mean × its count = sum",
        "2. Removed = old sum − new sum"
      ]
    }
  },
  "354": {
    "hint": "Lead at 1PM = 60 mi. Close at 75−60=15 mph → 4 h → 5 PM.",
    "theory": {
      "title": "Rate — Catch-Up With Clock Time",
      "icon": "🚆",
      "summary": "Head-start distance ÷ speed difference = catch-up duration; add to the chaser's start time.",
      "keyFacts": [
        "Train 1 runs noon→1PM alone: 60·1 = 60 mi lead",
        "Closing rate = 75 − 60 = 15 mph",
        "Catch-up time = 60/15 = 4 h after 1 PM",
        "1 PM + 4 h = 5 PM"
      ],
      "example": {
        "problem": "60 mph at noon, 75 mph at 1 PM; catch-up time?",
        "steps": [
          "Lead = 60 mi; close at 15 mph → 4 h",
          "1 PM + 4 h = 5 PM → C"
        ],
        "answer": "C (5:00 PM)"
      },
      "traps": [
        "Measuring catch-up time from noon instead of 1 PM"
      ],
      "solveSteps": [
        "1. Head-start distance at chaser's start",
        "2. ÷ speed difference",
        "3. Add to chaser's departure time"
      ]
    }
  },
  "355": {
    "hint": "1/6+1/8 = 7/24 → time = 24/7 h.",
    "theory": {
      "title": "Work — Combined Pipes",
      "icon": "🛠️",
      "summary": "Add the per-hour rates; the fill time is the reciprocal of the combined rate.",
      "keyFacts": [
        "Rates 1/6 and 1/8",
        "LCD 24: 4/24 + 3/24 = 7/24",
        "Time = 1/(7/24) = 24/7 h",
        "Combined time < the faster pipe alone"
      ],
      "example": {
        "problem": "A 6h, B 8h, both open; time?",
        "steps": [
          "1/6+1/8 = 7/24",
          "→ 24/7 h → A"
        ],
        "answer": "A (24/7 hr)"
      },
      "traps": [
        "Averaging the times (7 h) instead of summing rates"
      ],
      "solveSteps": [
        "1. Sum rates over a common denominator",
        "2. Invert"
      ]
    }
  },
  "356": {
    "hint": "x = 60/0.4 = 150 → 25% of 150 = 37.5.",
    "theory": {
      "title": "Percents — Find the Whole, Then Re-percent",
      "icon": "🔢",
      "summary": "Back out x from the first percent fact, then apply the second percent.",
      "keyFacts": [
        "0.40·x = 60 → x = 150",
        "25% of 150 = 0.25·150",
        "= 37.5",
        "Shortcut: 25/40 of 60 = 37.5 (same ratio)"
      ],
      "example": {
        "problem": "40% of x = 60; 25% of x?",
        "steps": [
          "x = 150",
          "0.25·150 = 37.5 → D"
        ],
        "answer": "D (37.5)"
      },
      "traps": [
        "Computing 25% of 60 instead of 25% of x"
      ],
      "solveSteps": [
        "1. Solve for x from the given percent",
        "2. Apply the asked percent to x"
      ]
    }
  },
  "357": {
    "hint": "a:c = (a/b)(b/c) = (3/5)(4/7) = 12/35.",
    "theory": {
      "title": "Ratios — Chain a:b and b:c",
      "icon": "🔢",
      "summary": "a/c = (a/b)·(b/c). Multiply the two ratios directly.",
      "keyFacts": [
        "a/b = 3/5, b/c = 4/7",
        "a/c = (3/5)(4/7) = 12/35",
        "No need to equalize b for a:c only",
        "12 and 35 are coprime → already reduced"
      ],
      "example": {
        "problem": "a:b=3:5, b:c=4:7; a:c?",
        "steps": [
          "(3/5)·(4/7)",
          "= 12/35 → B"
        ],
        "answer": "B (12:35)"
      },
      "traps": [
        "Concatenating to 3:7 (ignores the b link)"
      ],
      "solveSteps": [
        "1. a/c = (a/b)(b/c)",
        "2. Multiply the fractions"
      ]
    }
  },
  "358": {
    "hint": "1/2+1/3 = 5/6; ÷(1/4) = ×4 → 20/6 = 10/3.",
    "theory": {
      "title": "Fractions — Sum Then Divide",
      "icon": "🔢",
      "summary": "Add inside the parentheses first, then dividing by a fraction = multiplying by its reciprocal.",
      "keyFacts": [
        "1/2 + 1/3 = 3/6+2/6 = 5/6",
        "÷ (1/4) = × 4",
        "(5/6)·4 = 20/6",
        "Simplify → 10/3"
      ],
      "example": {
        "problem": "(1/2+1/3) ÷ (1/4)?",
        "steps": [
          "Sum = 5/6",
          "×4 = 10/3 → C"
        ],
        "answer": "C (10/3)"
      },
      "traps": [
        "Dividing by 4 instead of multiplying (÷ a fraction flips it)"
      ],
      "solveSteps": [
        "1. Resolve the parenthesis",
        "2. ÷fraction = ×reciprocal",
        "3. Simplify"
      ]
    }
  },
  "359": {
    "hint": "5x−3=2x+12 → 3x=15 → x=5.",
    "theory": {
      "title": "Linear — Collect Variables One Side",
      "icon": "🔢",
      "summary": "Move all x to one side, constants to the other, then divide.",
      "keyFacts": [
        "5x − 2x = 12 + 3",
        "3x = 15",
        "x = 5",
        "Check: 25−3 = 22 = 10+12 ✓"
      ],
      "example": {
        "problem": "5x−3 = 2x+12; x?",
        "steps": [
          "3x = 15",
          "x = 5 → C"
        ],
        "answer": "C (5)"
      },
      "traps": [
        "Sign error moving 2x or −3 across"
      ],
      "solveSteps": [
        "1. Variables left, constants right",
        "2. Divide by the coefficient"
      ]
    }
  },
  "360": {
    "hint": "2x−8 = 3x+1 → −9 = x.",
    "theory": {
      "title": "Linear — Distribute Then Solve (Negative Result)",
      "icon": "🔢",
      "summary": "Expand the bracket, collect x, expect a negative solution here.",
      "keyFacts": [
        "2(x−4) = 2x − 8",
        "2x − 8 = 3x + 1",
        "−8 − 1 = 3x − 2x → −9 = x",
        "Negative answers are valid"
      ],
      "example": {
        "problem": "2(x−4) = 3x+1; x?",
        "steps": [
          "2x−8 = 3x+1",
          "x = −9 → A"
        ],
        "answer": "A (−9)"
      },
      "traps": [
        "Forgetting to distribute the 2 to the −4"
      ],
      "solveSteps": [
        "1. Distribute",
        "2. Collect x, solve (sign-aware)"
      ]
    }
  },
  "361": {
    "hint": "x²−7x+12 = (x−3)(x−4) → roots 3, 4.",
    "theory": {
      "title": "Quadratics — Factor by Sum/Product",
      "icon": "🔢",
      "summary": "Find two numbers multiplying to 12 and summing to 7: 3 and 4.",
      "keyFacts": [
        "Need product 12, sum 7",
        "3·4 = 12, 3+4 = 7",
        "(x−3)(x−4)=0 → x = 3 or 4",
        "Signs both negative inside → positive roots"
      ],
      "example": {
        "problem": "Roots of x²−7x+12=0?",
        "steps": [
          "3 and 4 (product 12, sum 7)",
          "x = 3, 4 → C"
        ],
        "answer": "C (3, 4)"
      },
      "traps": [
        "Picking 2,6 (sum 8) or sign-flipped −3,−4"
      ],
      "solveSteps": [
        "1. Two numbers: product c, sum −b",
        "2. Roots are those numbers"
      ]
    }
  },
  "362": {
    "hint": "⌊100/7⌋ = 14.",
    "theory": {
      "title": "Number Theory — Count Multiples in a Range",
      "icon": "🔢",
      "summary": "Multiples of k up to N = ⌊N/k⌋ (when counting from 1).",
      "keyFacts": [
        "⌊100/7⌋ = 14 (7·14=98 ≤ 100)",
        "7·15 = 105 > 100 → not counted",
        "Count from 1 → simple floor",
        "Largest multiple ≤ 100 is 98"
      ],
      "example": {
        "problem": "Multiples of 7 in 1..100?",
        "steps": [
          "⌊100/7⌋",
          "= 14 → C"
        ],
        "answer": "C (14)"
      },
      "traps": [
        "Rounding 100/7≈14.3 up to 15"
      ],
      "solveSteps": [
        "1. ⌊N/k⌋",
        "2. Verify k·count ≤ N"
      ]
    }
  },
  "363": {
    "hint": "3n=96 → n=32 → largest = 33.",
    "theory": {
      "title": "Number Theory — Consecutive Integers Sum",
      "icon": "🔢",
      "summary": "Three consecutive integers sum to 3·(middle). Middle = sum/3; largest = middle+1.",
      "keyFacts": [
        "(n−1)+n+(n+1) = 3n = 96",
        "n = 32 (middle)",
        "Largest = 33",
        "Smallest = 31"
      ],
      "example": {
        "problem": "3 consecutive ints sum 96; largest?",
        "steps": [
          "Middle 96/3 = 32",
          "Largest = 33 → C"
        ],
        "answer": "C (33)"
      },
      "traps": [
        "Reporting the middle 32"
      ],
      "solveSteps": [
        "1. Middle = sum/3",
        "2. Largest = middle+1"
      ]
    }
  },
  "364": {
    "hint": "P=36, L=12 → L+W=18 → W=6 → area 72.",
    "theory": {
      "title": "Geometry — Rectangle Area From Perimeter & Side",
      "icon": "📐",
      "summary": "Perimeter gives L+W; subtract the known length to get width, then multiply.",
      "keyFacts": [
        "P = 2(L+W) = 36 → L+W = 18",
        "L = 12 → W = 6",
        "Area = 12·6 = 72",
        "Half the perimeter = L+W"
      ],
      "example": {
        "problem": "L=12, perimeter 36; area?",
        "steps": [
          "L+W = 18 → W = 6",
          "12·6 = 72 → C"
        ],
        "answer": "C (72)"
      },
      "traps": [
        "Using full perimeter 36 as L+W (it's half)"
      ],
      "solveSteps": [
        "1. L+W = P/2",
        "2. W = (P/2) − L",
        "3. Area = L·W"
      ]
    }
  },
  "365": {
    "hint": "5-12-13 right triangle → area = ½·5·12 = 30.",
    "theory": {
      "title": "Geometry — Recognize the Right Triangle",
      "icon": "📐",
      "summary": "5-12-13 satisfies 5²+12²=13², so it's right; the legs are base and height.",
      "keyFacts": [
        "5²+12² = 25+144 = 169 = 13²",
        "Right angle between the legs 5 and 12",
        "Area = ½·5·12 = 30",
        "13 is the hypotenuse (not a height)"
      ],
      "example": {
        "problem": "Triangle 5,12,13; area?",
        "steps": [
          "Pythagorean triple → right",
          "½·5·12 = 30 → B"
        ],
        "answer": "B (30)"
      },
      "traps": [
        "Using Heron's or treating 13 as a height"
      ],
      "solveSteps": [
        "1. Check a²+b²=c² → right",
        "2. Area = ½·leg·leg"
      ]
    }
  },
  "366": {
    "hint": "πr²=49π → r=7 → C=2π·7=14π.",
    "theory": {
      "title": "Geometry — Area → Radius → Circumference",
      "icon": "📐",
      "summary": "Solve r from the area, then circumference = 2πr.",
      "keyFacts": [
        "r² = 49 → r = 7",
        "C = 2π·7 = 14π",
        "r bridges area and circumference",
        "Don't confuse with area 14π"
      ],
      "example": {
        "problem": "Area 49π; circumference?",
        "steps": [
          "r = 7",
          "C = 14π → B"
        ],
        "answer": "B (14π)"
      },
      "traps": [
        "Taking r=49 (skipped the square root)"
      ],
      "solveSteps": [
        "1. r = √(Area/π)",
        "2. C = 2πr"
      ]
    }
  },
  "367": {
    "hint": "Sum = mean × count = 14·5 = 70.",
    "theory": {
      "title": "Statistics — Sum From Mean",
      "icon": "📊",
      "summary": "Sum = mean × number of values.",
      "keyFacts": [
        "Mean = 14, count = 5",
        "Sum = 14·5",
        "= 70",
        "Inverse of mean = sum/count"
      ],
      "example": {
        "problem": "Mean of 5 numbers is 14; sum?",
        "steps": [
          "14·5",
          "= 70 → C"
        ],
        "answer": "C (70)"
      },
      "traps": [
        "Dividing instead of multiplying"
      ],
      "solveSteps": [
        "1. Recall mean = sum/count",
        "2. Rearrange → sum = mean·count"
      ]
    }
  },
  "368": {
    "hint": "Even count (6): median = avg of 3rd & 4th = (7+11)/2 = 9.",
    "theory": {
      "title": "Statistics — Median, Even Count",
      "icon": "📊",
      "summary": "Sorted set of 6 → median = mean of positions 3 and 4.",
      "keyFacts": [
        "Already sorted: 2,5,7,11,13,16",
        "Middle positions: 3rd=7, 4th=11",
        "Median = (7+11)/2 = 9",
        "Not a member of the set"
      ],
      "example": {
        "problem": "Median of {2,5,7,11,13,16}?",
        "steps": [
          "Middle two: 7, 11",
          "(7+11)/2 = 9 → C"
        ],
        "answer": "C (9)"
      },
      "traps": [
        "Picking a single middle element (7 or 11)"
      ],
      "solveSteps": [
        "1. Sort, find n",
        "2. Even → average the two middles"
      ]
    }
  },
  "369": {
    "hint": "Face cards = 12 (J,Q,K × 4 suits). 12/52 = 3/13.",
    "theory": {
      "title": "Probability — Face Cards in a Deck",
      "icon": "🎲",
      "summary": "12 face cards (Jack, Queen, King in each of 4 suits) out of 52.",
      "keyFacts": [
        "3 face ranks × 4 suits = 12",
        "P = 12/52",
        "Simplify: 12/52 = 3/13",
        "Aces are NOT face cards"
      ],
      "example": {
        "problem": "P(face card) from 52?",
        "steps": [
          "12 face cards",
          "12/52 = 3/13 → A"
        ],
        "answer": "A (3/13)"
      },
      "traps": [
        "Counting aces as face cards (would give 16)"
      ],
      "solveSteps": [
        "1. Count favorable (12)",
        "2. ÷52, simplify"
      ]
    }
  },
  "370": {
    "hint": "C(8,2) = 8·7/2 = 28.",
    "theory": {
      "title": "Counting — Unordered Pair Selection",
      "icon": "🔢",
      "summary": "Picking 2 from 8 (order irrelevant) = C(8,2) = 8·7/2.",
      "keyFacts": [
        "C(8,2) = 8!/(2!·6!)",
        "= (8·7)/2",
        "= 28",
        "Order doesn't matter → combination"
      ],
      "example": {
        "problem": "Ways to pick 2 from 8?",
        "steps": [
          "8·7/2",
          "= 28 → C"
        ],
        "answer": "C (28)"
      },
      "traps": [
        "Using 8·7=56 (that's ordered, P(8,2))"
      ],
      "solveSteps": [
        "1. Unordered selection → C(n,k)",
        "2. C(n,2) = n(n−1)/2"
      ]
    }
  },
  "371": {
    "hint": "3x−5<13 → 3x<18 → x<6. Strict → largest integer = 5.",
    "theory": {
      "title": "Inequalities — Largest Integer Under a Strict Bound",
      "icon": "🔢",
      "summary": "Solve normally; a strict < means the bound itself is excluded, so the largest integer is one below it.",
      "keyFacts": [
        "3x − 5 < 13 → 3x < 18 → x < 6",
        "Strict < 6 → x = 6 NOT allowed",
        "Largest integer satisfying x<6 is 5",
        "Divide by +3 keeps direction"
      ],
      "example": {
        "problem": "3x−5<13; largest integer x?",
        "steps": [
          "3x < 18 → x < 6",
          "Strict → largest integer = 5 → B"
        ],
        "answer": "B (5)"
      },
      "traps": [
        "Answering 6 (would need ≤, but it's strict <)"
      ],
      "solveSteps": [
        "1. Isolate x",
        "2. Strict bound → take next integer below"
      ]
    }
  },
  "372": {
    "hint": "|x−4|=3 → x−4=±3 → x=7 or 1.",
    "theory": {
      "title": "Absolute Value — Two-Case Equation",
      "icon": "🔢",
      "summary": "|A|=k splits into A=k and A=−k. Solve both.",
      "keyFacts": [
        "x−4 = 3 → x = 7",
        "x−4 = −3 → x = 1",
        "Two solutions: 1 and 7",
        "Both are 3 units from 4 on the number line"
      ],
      "example": {
        "problem": "|x−4|=3; x?",
        "steps": [
          "x−4 = ±3",
          "x = 7 or 1 → A"
        ],
        "answer": "A (1 or 7)"
      },
      "traps": [
        "Giving only x=7 (dropping the negative case)"
      ],
      "solveSteps": [
        "1. Split into A=k and A=−k",
        "2. Solve each branch"
      ]
    }
  },
  "373": {
    "hint": "(2³)²=2⁶; 2⁶·2⁻⁴ = 2² = 4.",
    "theory": {
      "title": "Exponents — Power of a Power, Then Add",
      "icon": "🔢",
      "summary": "(aᵐ)ⁿ = aᵐⁿ; multiplying same bases adds exponents.",
      "keyFacts": [
        "(2³)² = 2^(3·2) = 2⁶",
        "2⁶ · 2⁻⁴ = 2^(6−4) = 2²",
        "= 4",
        "Power-of-power multiplies; product adds"
      ],
      "example": {
        "problem": "(2³)²·2⁻⁴?",
        "steps": [
          "2⁶ · 2⁻⁴",
          "= 2² = 4 → C"
        ],
        "answer": "C (4)"
      },
      "traps": [
        "Adding 3+2 for the power-of-power (should multiply → 6)"
      ],
      "solveSteps": [
        "1. (aᵐ)ⁿ → aᵐⁿ",
        "2. Same base product → add exponents"
      ]
    }
  },
  "374": {
    "hint": "√72 = √(36·2) = 6√2. Pull the largest perfect square.",
    "theory": {
      "title": "Roots — Simplify a Radical",
      "icon": "🔢",
      "summary": "Factor out the largest perfect square, take its root outside.",
      "keyFacts": [
        "72 = 36 · 2 (36 is the largest perfect-square factor)",
        "√72 = √36 · √2",
        "= 6√2",
        "Not 8√2 (that's √128)"
      ],
      "example": {
        "problem": "Simplify √72.",
        "steps": [
          "72 = 36·2",
          "√36·√2 = 6√2 → A"
        ],
        "answer": "A (6√2)"
      },
      "traps": [
        "Using 9·8 → 3√8 (not fully simplified)"
      ],
      "solveSteps": [
        "1. Largest perfect-square factor",
        "2. Root it out front"
      ]
    }
  },
  "375": {
    "hint": "Midpoint = ((2+8)/2,(−3+5)/2) = (5,1).",
    "theory": {
      "title": "Coordinate — Midpoint Formula",
      "icon": "📐",
      "summary": "Midpoint = average of the x's and average of the y's.",
      "keyFacts": [
        "x: (2+8)/2 = 5",
        "y: (−3+5)/2 = 1",
        "Midpoint = (5, 1)",
        "Mind the negative in the y-average"
      ],
      "example": {
        "problem": "Midpoint of (2,−3) and (8,5)?",
        "steps": [
          "x = 5",
          "y = 1 → (5,1) → A"
        ],
        "answer": "A ((5, 1))"
      },
      "traps": [
        "Subtracting instead of averaging (that's the distance/slope path)"
      ],
      "solveSteps": [
        "1. Average the x-coordinates",
        "2. Average the y-coordinates"
      ]
    }
  },
  "376": {
    "hint": "Slope = (11−2)/(4−1) = 9/3 = 3.",
    "theory": {
      "title": "Coordinate — Slope From Two Points",
      "icon": "📐",
      "summary": "Slope = Δy/Δx with consistent order.",
      "keyFacts": [
        "Δy = 11 − 2 = 9",
        "Δx = 4 − 1 = 3",
        "Slope = 9/3 = 3",
        "Same order top and bottom"
      ],
      "example": {
        "problem": "Slope through (1,2),(4,11)?",
        "steps": [
          "Δy/Δx = 9/3",
          "= 3 → C"
        ],
        "answer": "C (3)"
      },
      "traps": [
        "Inverting to 3/9 = 1/3"
      ],
      "solveSteps": [
        "1. Δy and Δx in matching order",
        "2. Divide"
      ]
    }
  },
  "377": {
    "hint": "Rate = 180/3 = 60 mph; 60·5 = 300.",
    "theory": {
      "title": "Rate — Constant Speed Extrapolation",
      "icon": "🚗",
      "summary": "Find the rate from the given trip, then distance = rate × new time.",
      "keyFacts": [
        "Rate = 180/3 = 60 mph",
        "Distance in 5 h = 60·5",
        "= 300 mi",
        "Same rate assumed"
      ],
      "example": {
        "problem": "180 mi in 3 h; distance in 5 h?",
        "steps": [
          "Rate = 60 mph",
          "60·5 = 300 → C"
        ],
        "answer": "C (300)"
      },
      "traps": [
        "Adding 180 + something instead of rescaling by rate"
      ],
      "solveSteps": [
        "1. Rate = distance/time",
        "2. New distance = rate·new time"
      ]
    }
  },
  "378": {
    "hint": "0.75·P = 90 → P = 120 (divide, don't add 25%).",
    "theory": {
      "title": "Percents — Reverse a Discount",
      "icon": "💰",
      "summary": "Sale price = (1−rate)·original. Divide the sale price by (1−rate) to recover the original.",
      "keyFacts": [
        "25% off → pay 75% → 0.75·P = 90",
        "P = 90 / 0.75 = 120",
        "Divide by 0.75, not ×1.25",
        "Check: 25% of 120 = 30, 120−30 = 90 ✓"
      ],
      "example": {
        "problem": "25% off → $90; original?",
        "steps": [
          "0.75·P = 90",
          "P = 120 → C"
        ],
        "answer": "C ($120)"
      },
      "traps": [
        "Adding 25% of 90 = 112.50 (wrong base)"
      ],
      "solveSteps": [
        "1. Sale = (1−rate)·orig",
        "2. orig = sale/(1−rate)"
      ]
    }
  },
  "379": {
    "hint": "I = P·r·t = 1000·0.05·3 = 150.",
    "theory": {
      "title": "Interest — Simple Interest Formula",
      "icon": "💰",
      "summary": "Simple interest = principal × rate × time, on the original principal only.",
      "keyFacts": [
        "P=1000, r=0.05, t=3",
        "I = 1000·0.05·3",
        "= 150",
        "Simple ≠ compound (no interest on interest)"
      ],
      "example": {
        "problem": "$1000 at 5% simple, 3 yr interest?",
        "steps": [
          "1000·0.05 = 50/yr",
          "·3 = 150 → C"
        ],
        "answer": "C ($150)"
      },
      "traps": [
        "Compounding → ~157.63 (the decoy D)"
      ],
      "solveSteps": [
        "1. I = P·r·t",
        "2. Distinguish from compound"
      ]
    }
  },
  "380": {
    "hint": "Salt = 4 L fixed; 4/(8+w)=0.4 → w=2.",
    "theory": {
      "title": "Mixtures — Dilute to a Target %",
      "icon": "⚗️",
      "summary": "Salt stays constant; set salt/(original+water) = target and solve for water.",
      "keyFacts": [
        "Salt = 50% of 8 = 4 L (constant)",
        "4 / (8+w) = 0.40",
        "8+w = 10 → w = 2",
        "Only water is added"
      ],
      "example": {
        "problem": "8 L of 50% salt → 40%; water to add?",
        "steps": [
          "Salt = 4 L",
          "4/(8+w)=0.4 → w=2 → C"
        ],
        "answer": "C (2)"
      },
      "traps": [
        "Changing the salt amount — only volume grows"
      ],
      "solveSteps": [
        "1. Solute = const",
        "2. solute/(orig+w)=target → solve w"
      ]
    }
  },
  "381": {
    "hint": "Converging → add speeds: 12+18=30. t = 90/30 = 3.",
    "theory": {
      "title": "Rate — Converging From Opposite Ends",
      "icon": "🚴",
      "summary": "Two bodies moving toward each other close the gap at the SUM of speeds.",
      "keyFacts": [
        "Closing rate = 12 + 18 = 30 mph",
        "Gap = 90 mi",
        "t = 90 / 30 = 3 h",
        "Add speeds (not subtract) when converging"
      ],
      "example": {
        "problem": "90 mi apart, 12 & 18 mph toward each other; meet time?",
        "steps": [
          "Combined = 30 mph",
          "90/30 = 3 → C"
        ],
        "answer": "C (3)"
      },
      "traps": [
        "Using the speed difference (6 mph) — that's chasing"
      ],
      "solveSteps": [
        "1. Converging → add speeds",
        "2. t = distance / combined rate"
      ]
    }
  },
  "382": {
    "hint": "A does 4/10 in 4 days; remaining 3/5 ÷ (1/10+1/15=1/6) = 3.6 days.",
    "theory": {
      "title": "Work — Head Start Then Combined",
      "icon": "🛠️",
      "summary": "Compute the solo portion done, then the remainder at the combined rate.",
      "keyFacts": [
        "A rate 1/10; 4 days → 4/10 = 2/5 done",
        "Remaining = 3/5",
        "Combined = 1/10 + 1/15 = 1/6 per day",
        "t = (3/5)/(1/6) = 18/5 = 3.6 days"
      ],
      "example": {
        "problem": "A(10d) solo 4d, then A+B(15d) together; more days?",
        "steps": [
          "Done 2/5, left 3/5",
          "(3/5)/(1/6) = 3.6 → C"
        ],
        "answer": "C (3.6)"
      },
      "traps": [
        "Forgetting the 4-day head start when computing the remainder"
      ],
      "solveSteps": [
        "1. Solo work done",
        "2. Remainder ÷ combined rate"
      ]
    }
  },
  "383": {
    "hint": "0.8x + 0.3·20 = 0.5(x+20) → 0.3x=4 → x=40/3≈13.33.",
    "theory": {
      "title": "Mixtures — Solve the Unknown Volume",
      "icon": "⚗️",
      "summary": "Acid in = acid out. Set up the balance and solve the linear equation.",
      "keyFacts": [
        "0.8x + 0.3(20) = 0.5(x+20)",
        "0.8x + 6 = 0.5x + 10",
        "0.3x = 4 → x = 40/3 ≈ 13.33",
        "Final concentration is between the two inputs"
      ],
      "example": {
        "problem": "x L of 80% + 20 L of 30% → 50%; x?",
        "steps": [
          "0.8x+6 = 0.5x+10",
          "0.3x=4 → 13.33 → C"
        ],
        "answer": "C (13.33)"
      },
      "traps": [
        "Averaging 80 & 30 to 55 instead of volume-weighting"
      ],
      "solveSteps": [
        "1. Acid_in = acid_out",
        "2. Solve for x"
      ]
    }
  },
  "384": {
    "hint": "Down=20/2=10, Up=20/4=5. Current=(10−5)/2=2.5.",
    "theory": {
      "title": "Rate — Current From Down/Up Times",
      "icon": "🚤",
      "summary": "Down = boat+current, up = boat−current. Current = (down−up)/2.",
      "keyFacts": [
        "Down speed = 20/2 = 10 km/h",
        "Up speed = 20/4 = 5 km/h",
        "Current = (10−5)/2 = 2.5",
        "Boat = (10+5)/2 = 7.5"
      ],
      "example": {
        "problem": "20 km down 2h, up 4h; current?",
        "steps": [
          "Down 10, up 5",
          "(10−5)/2 = 2.5 → B"
        ],
        "answer": "B (2.5 km/h)"
      },
      "traps": [
        "Reporting 10−5=5 (forgot to halve)"
      ],
      "solveSteps": [
        "1. Down & up speeds = dist/time",
        "2. current = (down−up)/2"
      ]
    }
  },
  "385": {
    "hint": "S=2T−3 (3y ago); S+T=36 (in 7y) → T=13, S=23.",
    "theory": {
      "title": "Ages — Past Ratio + Future Sum",
      "icon": "👥",
      "summary": "Two equations: a past ratio (shift both back) and a future sum (shift both forward). Solve the system.",
      "keyFacts": [
        "3 yr ago: S−3 = 2(T−3) → S = 2T−3",
        "In 7 yr: (S+7)+(T+7)=50 → S+T = 36",
        "Sub: (2T−3)+T = 36 → T=13",
        "S = 2·13−3 = 23"
      ],
      "example": {
        "problem": "3y ago Sara=2·Tom; in 7y sum=50; Sara now?",
        "steps": [
          "S=2T−3 and S+T=36",
          "T=13 → S=23 → D"
        ],
        "answer": "D (23)"
      },
      "traps": [
        "Adding 7 to only one age in the future-sum equation"
      ],
      "solveSteps": [
        "1. Shift ages for each time clause",
        "2. Solve the 2-equation system"
      ]
    }
  },
  "386": {
    "hint": "F=4S; F+20=2(S+20) → 2S=20 → S=10, F=40.",
    "theory": {
      "title": "Ages — Now Ratio + Future Ratio",
      "icon": "👥",
      "summary": "Write the current multiple and the future multiple (add the years to both), solve.",
      "keyFacts": [
        "Now: F = 4S",
        "In 20 yr: F+20 = 2(S+20)",
        "4S+20 = 2S+40 → 2S=20 → S=10",
        "F = 4·10 = 40"
      ],
      "example": {
        "problem": "Father 4× son; in 20y twice; father now?",
        "steps": [
          "4S+20 = 2(S+20)",
          "S=10 → F=40 → C"
        ],
        "answer": "C (40)"
      },
      "traps": [
        "Adding 20 to only the father"
      ],
      "solveSteps": [
        "1. Now ratio equation",
        "2. Future ratio with +years on both",
        "3. Solve"
      ]
    }
  },
  "387": {
    "hint": "1.6·0.75 = 1.20 → 20% profit.",
    "theory": {
      "title": "Percents — Markup Then Discount Compose",
      "icon": "💰",
      "summary": "Multiply the factors: markup ×1.6, discount ×0.75. Final/cost − 1 = profit rate.",
      "keyFacts": [
        "Marked = 1.60·C",
        "After 25% off: ·0.75 → 1.6·0.75·C = 1.20·C",
        "Profit = 1.20 − 1 = 0.20 → 20%",
        "Different bases — don't do 60−25"
      ],
      "example": {
        "problem": "60% markup, 25% discount; profit %?",
        "steps": [
          "1.6·0.75 = 1.20",
          "→ 20% → B"
        ],
        "answer": "B (20%)"
      },
      "traps": [
        "60% − 25% = 35% (mismatched bases)"
      ],
      "solveSteps": [
        "1. Compose factors (1+m)(1−d)",
        "2. Subtract 1 for profit rate"
      ]
    }
  },
  "388": {
    "hint": "Doubles: P = P·r·8 → r = 1/8 = 12.5%.",
    "theory": {
      "title": "Interest — Rate to Double (Simple)",
      "icon": "💰",
      "summary": "To double, the interest equals the principal: P = P·r·t → r = 1/t.",
      "keyFacts": [
        "2P = P + P·r·8 → interest = P",
        "P = P·r·8 → r = 1/8",
        "r = 0.125 = 12.5%",
        "Simple interest (linear), not the rule of 72"
      ],
      "example": {
        "problem": "Doubles in 8 yr simple; rate?",
        "steps": [
          "Interest must equal P",
          "r = 1/8 = 12.5% → C"
        ],
        "answer": "C (12.5%)"
      },
      "traps": [
        "Using rule of 72 (≈9%) — that's for compound"
      ],
      "solveSteps": [
        "1. Doubling → interest = P",
        "2. r = 1/t"
      ]
    }
  },
  "389": {
    "hint": "t = 2.5/6 h × 60 = 25 min.",
    "theory": {
      "title": "Rate — Time in Minutes",
      "icon": "🏃",
      "summary": "Time = distance/speed in hours, then ×60 for minutes.",
      "keyFacts": [
        "t = 2.5 / 6 h",
        "= 5/12 h",
        "×60 = 25 min",
        "Convert hours → minutes at the end"
      ],
      "example": {
        "problem": "6 mph, 2.5 mi; minutes?",
        "steps": [
          "2.5/6 = 5/12 h",
          "×60 = 25 min → C"
        ],
        "answer": "C (25)"
      },
      "traps": [
        "Leaving the answer in hours (5/12 ≈ 0.42)"
      ],
      "solveSteps": [
        "1. t = d/s (hours)",
        "2. ×60 → minutes"
      ]
    }
  },
  "390": {
    "hint": "7 min 30 s = 7.5 min. 24·7.5 = 180.",
    "theory": {
      "title": "Rate — Convert Mixed Time First",
      "icon": "🖨️",
      "summary": "Convert 30 s to 0.5 min, then output = rate × total minutes.",
      "keyFacts": [
        "30 s = 0.5 min → total 7.5 min",
        "24 pages/min · 7.5",
        "= 180 pages",
        "Convert seconds before multiplying"
      ],
      "example": {
        "problem": "24 ppm for 7 min 30 s; pages?",
        "steps": [
          "7.5 min",
          "24·7.5 = 180 → C"
        ],
        "answer": "C (180)"
      },
      "traps": [
        "Using 7 min (→168) or treating 30 as 0.3 min"
      ],
      "solveSteps": [
        "1. Convert seconds to a minute fraction",
        "2. rate × total minutes"
      ]
    }
  },
  "391": {
    "hint": "Workers × days = constant (fixed job). More workers → fewer days. Set up 4×12 = 6×d and solve.",
    "theory": {
      "title": "Work Rate — Inverse Proportion",
      "icon": "🔨",
      "summary": "Total work is fixed: workers × days = constant. Double the workers, halve the time. Always set the two products equal.",
      "keyFacts": [
        "Workers × days = total work units (constant for same job)",
        "More workers → fewer days (inverse relationship)",
        "Formula: W₁×D₁ = W₂×D₂",
        "One worker's rate = 1/(W×D) of the job per day",
        "If rates differ, use 1/t₁ + 1/t₂ = 1/T instead",
        "Units must match — check if workers or rate changes"
      ],
      "example": {
        "problem": "4 workers build a wall in 12 days. How many days for 6 workers at the same rate?",
        "steps": [
          "Total work = 4 × 12 = 48 worker-days",
          "Set equal: 6 × d = 48",
          "d = 48 / 6 = 8 days"
        ],
        "answer": "8 days"
      },
      "traps": [
        "Adding workers proportionally: 6/4 × 12 = 18 — WRONG direction, more workers = LESS time",
        "(12 + extra) instead of solving inverse proportion",
        "Forgetting to keep total work constant — only valid if same job, same rate",
        "Using additive logic instead of multiplicative inverse"
      ],
      "solveSteps": [
        "1. Confirm same job, same rate — inverse proportion applies",
        "2. Compute total work = workers × days from given scenario",
        "3. Set total work = new workers × unknown days",
        "4. Solve for unknown days",
        "5. Sanity check: more workers → fewer days, less workers → more days"
      ]
    }
  },
  "392": {
    "hint": "Set up boys/girls = 3/5, plug in boys = 24, cross-multiply to find girls. Watch which part of the ratio maps to which group.",
    "theory": {
      "title": "Part-to-Part Ratios — Finding a Missing Quantity",
      "icon": "⚖",
      "summary": "A ratio a:b means for every a of one group there are b of another. Set up a proportion and cross-multiply to find any missing value.",
      "keyFacts": [
        "Ratio a:b → fraction a/b; set equal to actual/actual",
        "Cross-multiply: a/b = x/y → ay = bx",
        "Identify WHICH group maps to WHICH ratio part before setting up",
        "Total parts = a+b; individual part = (a/(a+b)) × total",
        "Scale factor k: actual values are ka and kb"
      ],
      "example": {
        "problem": "Boys:girls = 3:5. There are 24 boys. How many girls?",
        "steps": [
          "Write ratio as fraction: boys/girls = 3/5",
          "Plug in known: 24/g = 3/5",
          "Cross-multiply: 3g = 24 × 5 = 120",
          "g = 40"
        ],
        "answer": "40 girls"
      },
      "traps": [
        "Swapping which number maps to which ratio part (e.g. setting 24/g = 5/3)",
        "Using total parts (8) instead of one part",
        "Picking 48 by multiplying 24 × 2 instead of scaling correctly",
        "Confusing part-to-part ratio with part-to-whole fraction"
      ],
      "solveSteps": [
        "1. Write ratio as fraction with correct labels (boys/girls = 3/5)",
        "2. Substitute known value into correct position",
        "3. Cross-multiply and solve for unknown",
        "4. Sanity check: larger ratio part should yield larger count"
      ]
    }
  },
  "393": {
    "hint": "Find empty portion = total capacity × (1 − fill fraction). One multiplication.",
    "theory": {
      "title": "Partial Fill — Empty Space Calculation",
      "icon": "🪣",
      "summary": "When a container is X% full, the empty portion is (100−X)% of total capacity. Multiply capacity by the empty fraction.",
      "keyFacts": [
        "Empty volume = Total × (1 − fill fraction)",
        "Fill fraction 75% → empty fraction 25% = 0.25",
        "Filled volume = Total × fill fraction",
        "Empty + Filled = Total (always)",
        "Convert percent to decimal before multiplying"
      ],
      "example": {
        "problem": "A 12-liter container is 75% full. How many more liters needed to fill it?",
        "steps": [
          "Empty fraction = 1 − 0.75 = 0.25",
          "Empty volume = 12 × 0.25 = 3 liters"
        ],
        "answer": "3 liters"
      },
      "traps": [
        "Using 75% instead of 25% → get 9 (filled, not empty)",
        "Computing 12 − 0.75 instead of 12 × 0.75",
        "Forgetting to convert percent: 12 × 75 = 900 (wrong)"
      ],
      "solveSteps": [
        "1. Identify total capacity and fill %",
        "2. Empty % = 100 − fill %",
        "3. Empty volume = capacity × (empty % / 100)",
        "4. Sanity: empty + filled = total capacity"
      ]
    }
  },
  "394": {
    "hint": "Discount % = (amount saved ÷ original price) × 100. Divide by ORIGINAL, not sale price.",
    "theory": {
      "title": "Percent Discount — Off the Original",
      "icon": "%",
      "summary": "Discount percent measures savings relative to the original price. Always divide the markdown amount by the original, not the new price.",
      "keyFacts": [
        "Discount % = (Original − Sale) / Original × 100",
        "Amount saved = Original − Sale price",
        "Never divide by the sale price — that inflates the percent",
        "If given %, sale price = Original × (1 − %/100)",
        "Successive discounts: multiply factors, e.g. 20% then 10% = 0.8 × 0.9 = 28% off total"
      ],
      "example": {
        "problem": "Shirt originally $50, now $35. What is the discount percent?",
        "steps": [
          "Amount saved = 50 − 35 = 15",
          "Discount % = 15 / 50 × 100",
          "= 0.30 × 100 = 30%"
        ],
        "answer": "30%"
      },
      "traps": [
        "Dividing by sale price (15/35 ≈ 43%) — wrong denominator",
        "Confusing dollar amount saved with percent",
        "Successive discounts: 20% + 10% ≠ 30% off; must multiply factors"
      ],
      "solveSteps": [
        "1. Find amount saved: Original − Sale",
        "2. Divide by ORIGINAL price",
        "3. Multiply by 100 for percent",
        "4. Sanity: result should be between 0% and 100%, closer to 0 for small markdowns"
      ]
    }
  },
  "395": {
    "hint": "Same distance each leg → harmonic mean: 2ab/(a+b). Arithmetic mean is the trap.",
    "theory": {
      "title": "Average Speed — Harmonic Mean",
      "icon": "🚂",
      "summary": "Average speed ≠ average of speeds. Equal distance both ways means slower leg consumes more time, pulling the average below the midpoint.",
      "keyFacts": [
        "Avg speed = total distance / total time (always)",
        "Equal distance both legs → harmonic mean: 2ab/(a+b)",
        "Equal time both legs → arithmetic mean: (a+b)/2",
        "Harmonic mean < arithmetic mean — result closer to slower speed",
        "Round trip on same path = equal distances, even if not stated"
      ],
      "example": {
        "problem": "Train goes 240 mi at 60 mph, returns 240 mi at 80 mph. Average speed?",
        "steps": [
          "Time out = 240/60 = 4 hr",
          "Time back = 240/80 = 3 hr",
          "Total distance = 480 mi, total time = 7 hr",
          "Avg = 480/7 ≈ 68.6 mph",
          "Shortcut: 2(60)(80)/(60+80) = 9600/140 ≈ 68.6 ✓"
        ],
        "answer": "≈ 68.6 mph"
      },
      "traps": [
        "(60+80)/2 = 70 mph — WRONG; arithmetic mean only when times are equal",
        "Answer must lie between 60 and 80, pulled toward 60 (slower leg)",
        "Forgetting to double the distance when computing total"
      ],
      "solveSteps": [
        "1. Identify what is equal — distance or time?",
        "2. Equal distance → harmonic mean 2ab/(a+b)",
        "3. Equal time → arithmetic mean (a+b)/2",
        "4. Compute directly if unsure: time each leg, sum, divide total distance",
        "5. Sanity check: result between the two speeds, closer to slower"
      ]
    }
  },
  "396": {
    "hint": "Set up two equations: one for age difference, one for sum. Solve for the older person's age.",
    "theory": {
      "title": "Age Problems — Two-Variable Linear System",
      "icon": "🎂",
      "summary": "Age problems give two relationships (difference + sum). Translate each into one equation, then solve the system by substitution.",
      "keyFacts": [
        "'X is N years older than Y' → X = Y + N",
        "'Sum of ages = S' → X + Y = S",
        "Substitute first eq into second to reduce to one variable",
        "Check: verify both original conditions hold with your answer",
        "Difference is preserved — older person stays older regardless of year"
      ],
      "example": {
        "problem": "Anna is 6 older than Bob. Their ages sum to 26. Find Anna's age.",
        "steps": [
          "A = B + 6  (difference condition)",
          "A + B = 26  (sum condition)",
          "Substitute: (B+6) + B = 26",
          "2B = 20 → B = 10",
          "A = 10 + 6 = 16"
        ],
        "answer": "16"
      },
      "traps": [
        "Solving for B and forgetting to compute A",
        "Using A - B = 6 correctly but then picking B as the answer",
        "Arithmetic slip: (B+6)+B = 2B+6, not 2B+12",
        "Answer choices include B's age (10) as a decoy"
      ],
      "solveSteps": [
        "1. Label variables: assign letters to each person",
        "2. Write difference equation: older = younger + gap",
        "3. Write sum equation: person1 + person2 = total",
        "4. Substitute one eq into the other, solve for the remaining variable",
        "5. Back-solve for the asked variable; verify both conditions"
      ]
    }
  },
  "397": {
    "hint": "Pure water adds volume but zero solute. Set up: solute stays constant, total volume grows. Solve for the added water.",
    "theory": {
      "title": "Dilution — Adding Pure Solvent",
      "icon": "💧",
      "summary": "Adding pure water keeps solute amount fixed while increasing total volume. Concentration = solute / new total. Solve for the unknown volume added.",
      "keyFacts": [
        "Solute amount never changes when adding pure water",
        "New concentration = original solute / (original volume + added water)",
        "Original solute = concentration × volume",
        "Set new concentration equation equal to target, solve for w",
        "Adding x liters of w% solution: solute increases too — different formula"
      ],
      "example": {
        "problem": "6 L of 25% sugar solution. Add pure water to get 15%. How much water?",
        "steps": [
          "Solute = 0.25 × 6 = 1.5 L",
          "New total volume = 6 + w",
          "Set up: 1.5 / (6 + w) = 0.15",
          "6 + w = 1.5 / 0.15 = 10",
          "w = 4 L"
        ],
        "answer": "4 liters"
      },
      "traps": [
        "Forgetting solute is FIXED — do not recalculate it with new concentration",
        "Using (25−15) / 15 shortcuts without checking which quantity is fixed",
        "Adding w% solution instead of pure water changes solute too",
        "Off-by-one on total volume: denominator is 6+w, not just w"
      ],
      "solveSteps": [
        "1. Compute fixed solute: conc × original volume",
        "2. Let w = water added; new total = original volume + w",
        "3. Equation: solute / (original + w) = target concentration",
        "4. Solve for w algebraically",
        "5. Sanity check: new concentration < old concentration ✓"
      ]
    }
  },
  "398": {
    "hint": "Net rate = fill rate − drain rate. Add rates (1/time), then invert for total time. Watch sign: drain subtracts.",
    "theory": {
      "title": "Combined Rates — Pipes & Drains",
      "icon": "🚰",
      "summary": "Each pipe/drain has a rate (fraction of job per hour). Filling pipes add; drains subtract. Net rate → invert for time.",
      "keyFacts": [
        "Rate of one agent = 1 / time_to_complete_alone",
        "Rates are additive: net rate = Σ fill_rates − Σ drain_rates",
        "Time to finish = 1 / net_rate (only when starting from empty/full)",
        "LCD trick: express all rates over common denominator before combining",
        "If net rate ≤ 0, pool never fills — no solution"
      ],
      "example": {
        "problem": "Pipe A fills pool in 4 hr; drain B empties in 6 hr. Both open from empty — how long to fill?",
        "steps": [
          "Rate A = 1/4 pool/hr (fills)",
          "Rate B = 1/6 pool/hr (drains — subtract)",
          "Net rate = 1/4 − 1/6 = 3/12 − 2/12 = 1/12 pool/hr",
          "Time = 1 ÷ (1/12) = 12 hr"
        ],
        "answer": "12 hours"
      },
      "traps": [
        "Averaging the times (4+6)/2 = 5 — nonsense; always work with RATES",
        "Forgetting drain subtracts: adding 1/4 + 1/6 gives wrong faster-than-A result",
        "(4×6)/(4+6) formula only works when BOTH agents fill — not here",
        "Inverting too early before combining rates"
      ],
      "solveSteps": [
        "1. Assign rate = 1/time for each agent",
        "2. Label sign: fill → +, drain → −",
        "3. Sum all rates to get net rate",
        "4. If net rate > 0, time = 1 / net_rate",
        "5. Sanity: time must exceed fastest fill-only agent (here > 4 hr ✓)"
      ]
    }
  },
  "399": {
    "hint": "Use work-rate addition: 1/A + 1/B = 1/T. Subtract A's rate from combined rate to isolate B.",
    "theory": {
      "title": "Combined Work Rates",
      "icon": "⚙",
      "summary": "Workers add rates, not times. Convert each worker to jobs-per-hour, sum them, then invert to get combined time.",
      "keyFacts": [
        "Rate = 1/time (jobs per hour)",
        "Combined rate: 1/A + 1/B = 1/T",
        "Isolate unknown: 1/B = 1/T − 1/A",
        "Find LCD when subtracting fractions",
        "Time = 1/rate — invert the final rate",
        "B alone always takes longer than combined time T"
      ],
      "example": {
        "problem": "A and B together finish in 6 hr. A alone takes 10 hr. How long does B alone take?",
        "steps": [
          "Write combined rate: 1/10 + 1/B = 1/6",
          "Isolate B: 1/B = 1/6 − 1/10",
          "LCD = 30: 1/B = 5/30 − 3/30 = 2/30",
          "Simplify: 1/B = 1/15",
          "B = 15 hours"
        ],
        "answer": "15 hours"
      },
      "traps": [
        "Adding times (6 + 10 = 16) instead of rates — WRONG",
        "Subtracting times (10 − 6 = 4) — WRONG",
        "Forgetting to invert: stopping at 1/15 and writing 15 correctly is fine, but writing 1/15 as answer is wrong",
        "B must take MORE than 6 hr (combined time) — sanity check"
      ],
      "solveSteps": [
        "1. Write each rate: combined = 1/T, A = 1/A_time",
        "2. Set up: 1/A + 1/B = 1/T",
        "3. Isolate unknown rate: 1/B = 1/T − 1/A",
        "4. Find LCD, subtract fractions",
        "5. Invert result to get time; verify B > T"
      ]
    }
  },
  "400": {
    "hint": "Two perpendicular legs → straight-line distance needs Pythagorean theorem. Sketch the right triangle before computing.",
    "theory": {
      "title": "Right-Triangle Distance — Pythagorean Theorem",
      "icon": "📐",
      "summary": "When movement splits into two perpendicular directions (N/S + E/W), the direct distance is the hypotenuse. Use a² + b² = c².",
      "keyFacts": [
        "a² + b² = c² for any right triangle",
        "Perpendicular directions (N+E, N+W, etc.) always form a right angle → theorem applies",
        "Memorize Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25",
        "Scaling works: 3-4-5 × k = 3k-4k-5k (e.g. 6-8-10, 9-12-15)",
        "Displacement ≠ total distance walked — it's the straight-line gap",
        "Draw the triangle first; label legs with given values"
      ],
      "example": {
        "problem": "Someone walks 3 km north then 4 km east. How far from start?",
        "steps": [
          "Sketch: vertical leg = 3, horizontal leg = 4",
          "Recognize 3-4-5 triple immediately",
          "c = √(3² + 4²) = √(9 + 16) = √25 = 5",
          "Answer: 5 km"
        ],
        "answer": "5 km"
      },
      "traps": [
        "Adding legs: 3 + 4 = 7 — total distance walked, NOT displacement",
        "Multiplying: 3 × 4 = 12 — meaningless here",
        "Forgetting to check for Pythagorean triple before computing square roots",
        "Mixing up 'total path length' with 'straight-line distance from start'"
      ],
      "solveSteps": [
        "1. Identify the two perpendicular directions and label them as legs a and b",
        "2. Check if (a, b, ?) matches a known triple (3-4-5, 5-12-13, etc.)",
        "3. If no triple, compute c = √(a² + b²)",
        "4. Confirm answer is the hypotenuse — must be larger than either leg but less than a + b"
      ]
    }
  },
  "401": {
    "hint": "Find LCD of denominators, convert both fractions, then add numerators. Never add denominators directly.",
    "theory": {
      "title": "Adding Fractions — LCD Method",
      "icon": "➗",
      "summary": "To add fractions, rewrite them with a common denominator first. Numerators add; denominator stays the same.",
      "keyFacts": [
        "LCD = Least Common Denominator = smallest number both denominators divide into",
        "Convert each fraction: multiply top and bottom by the same factor",
        "Only add numerators after denominators match",
        "Never add denominators: 1/2 + 1/3 ≠ 2/5",
        "Shortcut LCD for two numbers a,b: LCM(a,b) = a×b / GCD(a,b)",
        "Result: always simplify if numerator and denominator share a factor"
      ],
      "example": {
        "problem": "What is 1/2 + 1/3?",
        "steps": [
          "Find LCD of 2 and 3 → LCM(2,3) = 6",
          "Convert: 1/2 = 3/6  (multiply top & bottom by 3)",
          "Convert: 1/3 = 2/6  (multiply top & bottom by 2)",
          "Add: 3/6 + 2/6 = 5/6",
          "5 and 6 share no factor → already simplified"
        ],
        "answer": "5/6"
      },
      "traps": [
        "Adding denominators: 1/2 + 1/3 = 2/5 — WRONG. Denominators never add",
        "Using wrong LCD: LCD(2,3) = 6, not 2×3=6 coincidentally here, but always verify",
        "Forgetting to convert numerator when converting denominator",
        "Simplifying 5/6 incorrectly — 5 is prime, no common factor with 6"
      ],
      "solveSteps": [
        "1. Find LCD of all denominators (LCM)",
        "2. Rewrite each fraction with LCD as new denominator",
        "3. Adjust each numerator by the same factor used on denominator",
        "4. Add numerators; keep LCD as denominator",
        "5. Simplify result if GCD(numerator, denominator) > 1"
      ]
    }
  },
  "402": {
    "hint": "Multiply numerator × whole first, then divide by denominator. Watch for the trap of dividing first with a remainder.",
    "theory": {
      "title": "Fraction of a Whole Number",
      "icon": "✂️",
      "summary": "'Fraction of a number' means multiply. Find the part by multiplying numerator × whole, then dividing by denominator.",
      "keyFacts": [
        "a/b of N = (a × N) / b",
        "Multiply numerator × whole FIRST, then divide — avoids fractions mid-calc",
        "'Of' always means multiplication in math",
        "Result must be less than N (for proper fractions)",
        "Quick check: 1/4 of 60 = 15, so 3/4 = 3 × 15 = 45"
      ],
      "example": {
        "problem": "What is 3/4 of 60?",
        "steps": [
          "'Of' = multiply: 3/4 × 60",
          "Numerator first: 3 × 60 = 180",
          "Divide by denominator: 180 / 4 = 45"
        ],
        "answer": "45"
      },
      "traps": [
        "Dividing 60 by 4 first gives 15, then forgetting to multiply by 3",
        "Confusing 3/4 of 60 with 60/3 or 60/4",
        "Picking 40 (= 60 × 2/3) — wrong fraction applied",
        "Picking 48 (= 60 × 4/5) — misread numerator/denominator"
      ],
      "solveSteps": [
        "1. Rewrite 'a/b of N' as (a × N) / b",
        "2. Multiply numerator × whole number",
        "3. Divide result by denominator",
        "4. Sanity check: answer < N for proper fraction"
      ]
    }
  },
  "403": {
    "hint": "Find girls' share of total parts: girls/(boys+girls) × total students. Watch denominator — it's sum of parts, not girls' part alone.",
    "theory": {
      "title": "Part-to-Whole from a Ratio",
      "icon": "🔢",
      "summary": "A ratio like 3:5 splits a total into equal parts. Each group's count = (its parts / total parts) × whole. The denominator is always the sum of all parts.",
      "keyFacts": [
        "Ratio a:b → total parts = a+b",
        "Group count = (group parts / total parts) × total",
        "Scale factor k: actual counts are a·k and b·k where k = total/(a+b)",
        "Check: parts must sum back to total",
        "Ratio gives relative size, not absolute — need total to get actual counts"
      ],
      "example": {
        "problem": "Boys to girls ratio is 3:5 in a class of 24. How many girls?",
        "steps": [
          "Total parts = 3+5 = 8",
          "Scale factor k = 24/8 = 3",
          "Girls = 5 × 3 = 15",
          "Check: boys = 3×3=9, 9+15=24 ✓"
        ],
        "answer": "15"
      },
      "traps": [
        "Using 5/3 × total instead of 5/8 × total",
        "Dividing total by girls' part (24/5) instead of by total parts",
        "Forgetting to verify parts sum to total",
        "Confusing ratio of boys:girls with fraction of boys out of total"
      ],
      "solveSteps": [
        "1. Add ratio parts: a+b = total parts",
        "2. Compute scale factor k = total students / total parts",
        "3. Multiply target group's ratio number by k",
        "4. Verify: all groups × k must sum to total"
      ]
    }
  },
  "404": {
    "hint": "Convert % to decimal or fraction, then multiply. Simplify 15% as 15/100 before multiplying.",
    "theory": {
      "title": "Percent of a Number",
      "icon": "%",
      "summary": "'X% of Y' means (X/100) × Y. Convert the percent to a decimal or simple fraction first, then multiply.",
      "keyFacts": [
        "X% of Y = (X/100) × Y",
        "15% = 0.15 = 3/20",
        "Shortcut: 10% of Y = Y/10; 5% = half of 10%; 15% = 10% + 5%",
        "'Of' always means multiply in percent problems",
        "To find % of large number: break into 10% + 5% chunks mentally"
      ],
      "example": {
        "problem": "What is 15% of 80?",
        "steps": [
          "10% of 80 = 8",
          "5% of 80 = half of 8 = 4",
          "15% = 10% + 5% = 8 + 4 = 12",
          "Verify: 0.15 × 80 = 12 ✓"
        ],
        "answer": "12"
      },
      "traps": [
        "Picking 15 — confusing the percent itself for the answer",
        "Picking 10 — only computing 10% of 80, forgetting the 5%",
        "Dividing instead of multiplying: 80/15 ≠ 15% of 80",
        "Misplacing decimal: 0.15 × 80 ≠ 1.5 × 80"
      ],
      "solveSteps": [
        "1. Rewrite: X% of Y → (X/100) × Y",
        "2. Convert percent to decimal (15% → 0.15) or simple fraction (3/20)",
        "3. Multiply: 0.15 × 80",
        "4. Cross-check with mental math: 10% + 5% of the number"
      ]
    }
  },
  "405": {
    "hint": "Find LCM, not just any common multiple. Prime-factor each number, take highest power of each prime.",
    "theory": {
      "title": "LCM — Least Common Multiple",
      "icon": "🔢",
      "summary": "LCM is the smallest number divisible by all given numbers. Use prime factorization: take each prime to its highest power across all numbers.",
      "keyFacts": [
        "LCM(a,b) = product of each prime factor at its MAX exponent",
        "GCD × LCM = a × b  (useful shortcut for two numbers)",
        "LCM ≥ both numbers; GCD ≤ both numbers",
        "6 = 2¹ × 3¹;  8 = 2³  →  LCM = 2³ × 3¹ = 24",
        "Adding numbers: LCM(a,b,c) — factor all three, take max powers",
        "'Divisible by both' means 'is a multiple of both' = find LCM"
      ],
      "example": {
        "problem": "What is the smallest positive integer divisible by both 6 and 8?",
        "steps": [
          "Factor: 6 = 2¹ × 3¹",
          "Factor: 8 = 2³",
          "Take max power of each prime: 2³ × 3¹",
          "= 8 × 3 = 24",
          "Check: 24/6 = 4 ✓  24/8 = 3 ✓"
        ],
        "answer": "24"
      },
      "traps": [
        "14 = 6+8 — addition is meaningless here",
        "16 is divisible by 8 but not 6",
        "36 divisible by 6 but not 8 (36/8 = 4.5)",
        "48 works but is NOT the smallest — 24 comes first"
      ],
      "solveSteps": [
        "1. Prime-factor each number",
        "2. List all distinct primes across all numbers",
        "3. Take highest exponent for each prime",
        "4. Multiply to get LCM",
        "5. Verify: LCM divides cleanly by every original number"
      ]
    }
  },
  "406": {
    "hint": "Convert all to decimals or find common denominator. One fraction clearly separates from the pack — check which is closest to 1.",
    "theory": {
      "title": "Comparing Fractions — Quick Ranking Methods",
      "icon": "🔢",
      "summary": "To rank fractions fast: convert to decimals, use cross-multiplication pairwise, or compare each to a benchmark like 1/2 or 1. The fraction with the largest decimal wins.",
      "keyFacts": [
        "Decimal method: divide numerator ÷ denominator, compare results",
        "Cross-multiply pairwise: a/b vs c/d → compare a×d vs b×c; bigger product wins",
        "Benchmark trick: how far is each fraction below 1? (b−a)/b — smaller gap = larger fraction",
        "Fractions with similar n/d ratios cluster close together — compute carefully",
        "n/(n+1) form (1/2, 2/3, 3/4…) always increases as n grows"
      ],
      "example": {
        "problem": "Rank 1/2, 2/3, 3/5, 4/7, 5/9 from largest to smallest.",
        "steps": [
          "Convert: 1/2=0.500, 2/3≈0.667, 3/5=0.600, 4/7≈0.571, 5/9≈0.556",
          "2/3 is clearly highest at 0.667",
          "Next: 3/5=0.600, then 4/7≈0.571, then 5/9≈0.556, then 1/2=0.500",
          "Order: 2/3 > 3/5 > 4/7 > 5/9 > 1/2"
        ],
        "answer": "2/3 (≈0.667, largest of the five)"
      },
      "traps": [
        "Bigger numerator ≠ bigger fraction (4/7 < 3/5)",
        "Bigger denominator ≠ smaller fraction without checking numerator too",
        "Fractions in n/(n+1) form: 5/9 looks large but 2/3 is much closer to 1",
        "Don't eyeball — 4/7, 5/9, 3/5 are close enough to require actual computation"
      ],
      "solveSteps": [
        "1. Spot any obvious outliers — fractions far from the others",
        "2. Convert all to decimals (divide to 3 decimal places)",
        "3. If two are very close, cross-multiply to confirm order",
        "4. Pick the largest decimal value"
      ]
    }
  },
  "407": {
    "hint": "Set up proportion: (flour)/(water) = 2/3. Scale to 12 cups water and solve for flour.",
    "theory": {
      "title": "Scaling Ratios — Direct Proportion",
      "icon": "⚖",
      "summary": "When two quantities stay in constant ratio, scale both by the same multiplier. Find the multiplier from the known quantity, apply it to the unknown.",
      "keyFacts": [
        "Ratio a:b means a/b = constant",
        "Cross-multiply proportion: a/b = x/c → x = ac/b",
        "Multiplier method: new/old for known quantity → multiply unknown by same",
        "Direct proportion: one goes up, other goes up proportionally",
        "Always label units to avoid inverting the ratio"
      ],
      "example": {
        "problem": "Recipe: 2 cups flour per 3 cups water. How much flour for 12 cups water?",
        "steps": [
          "Write ratio: flour/water = 2/3",
          "Set up proportion: 2/3 = x/12",
          "Cross-multiply: 3x = 24",
          "x = 8 cups flour",
          "Check: 8/12 = 2/3 ✓"
        ],
        "answer": "8 cups"
      },
      "traps": [
        "Inverting ratio: using 3/2 instead of 2/3",
        "Multiplying wrong quantity: scaling water instead of solving for flour",
        "Adding instead of scaling: 2+9 = 11 (no logic)",
        "Picking 9 (= 12×3/4) by confusing which quantity is 12"
      ],
      "solveSteps": [
        "1. Identify the fixed ratio from the recipe (flour:water = 2:3)",
        "2. Set up proportion with unknown: 2/3 = x/12",
        "3. Cross-multiply and solve: x = 2×12/3",
        "4. Sanity check: does x/12 equal original ratio?"
      ]
    }
  },
  "408": {
    "hint": "Discount means multiply by (1 − rate). 25% off → keep 75% of price. Watch for trap: 25% of 40 ≠ final price.",
    "theory": {
      "title": "Percent Discount — Multiply by Complement",
      "icon": "%",
      "summary": "A X% discount means you pay (100−X)% of original. Multiply original by the decimal complement, not by the discount rate.",
      "keyFacts": [
        "Discount amount = Price × rate",
        "Final price = Price × (1 − rate)",
        "25% off → multiply by 0.75",
        "50% off → multiply by 0.50",
        "Complement shortcut: subtract rate from 1, then multiply — one step faster than computing discount then subtracting",
        "Rate as decimal: 25% = 0.25, 15% = 0.15"
      ],
      "example": {
        "problem": "Shirt costs $40. Store gives 25% discount. What is sale price?",
        "steps": [
          "Discount rate = 25% = 0.25",
          "Complement = 1 − 0.25 = 0.75",
          "Sale price = 40 × 0.75 = 30",
          "Check: discount amount = 40 × 0.25 = 10; 40 − 10 = 30 ✓"
        ],
        "answer": "$30"
      },
      "traps": [
        "Picking the discount amount ($10) as the answer instead of final price",
        "Computing 25% of 40 = 10, then stopping — that is the markdown, not the price",
        "Arithmetic error: 40 × 0.75 confused with 40 × 0.70 = 28 or 40 × 0.80 = 32"
      ],
      "solveSteps": [
        "1. Convert discount percent to decimal (25% → 0.25)",
        "2. Compute complement: 1 − 0.25 = 0.75",
        "3. Final price = original × complement",
        "4. Sanity: answer must be less than original but more than half (for discounts under 50%)"
      ]
    }
  },
  "409": {
    "hint": "List or formula: even integers from 2 to 20. Count = (last − first)/2 + 1. Watch 'between' vs 'inclusive'.",
    "theory": {
      "title": "Counting Evens in a Range",
      "icon": "🔢",
      "summary": "Count evenly spaced integers with (last − first)/step + 1. For even integers, step = 2. Inclusive vs exclusive wording changes the count by 1.",
      "keyFacts": [
        "Count of integers from a to b inclusive = b − a + 1",
        "Count of evens from a to b (both even, inclusive) = (b − a)/2 + 1",
        "Even integers 2–20: (20 − 2)/2 + 1 = 9 + 1 = 10",
        "'Between 1 and 20 inclusive' = same as 1 ≤ n ≤ 20; first even = 2, last = 20",
        "Odd count in same range also = 10 (1,3,...,19)"
      ],
      "example": {
        "problem": "How many even integers are between 1 and 20 inclusive?",
        "steps": [
          "First even ≥ 1 is 2; last even ≤ 20 is 20",
          "Apply formula: (20 − 2)/2 + 1",
          "= 18/2 + 1 = 9 + 1",
          "= 10"
        ],
        "answer": "10"
      },
      "traps": [
        "Forgetting +1: (20−2)/2 = 9 is off-by-one",
        "Counting odds instead of evens",
        "Misreading 'between' as exclusive (1 < n < 20 drops 20, but 20 is even so count drops to 9)",
        "Dividing total integers (20) by 2 = 10 works here, but only because range starts at 1"
      ],
      "solveSteps": [
        "1. Find first even in range and last even in range",
        "2. Apply (last − first)/2 + 1",
        "3. Check: did problem say inclusive or exclusive?",
        "4. Sanity: evens and odds split a consecutive range roughly 50/50"
      ]
    }
  },
  "410": {
    "hint": "Isolate x in two steps: subtract constant from both sides, then divide by coefficient.",
    "theory": {
      "title": "Solving Linear Equations — Isolation Method",
      "icon": "⚖",
      "summary": "Linear equation = one unknown, degree 1. Solve by undoing operations in reverse order: subtract/add first, then divide/multiply.",
      "keyFacts": [
        "ax + b = c → x = (c - b) / a",
        "Do same operation to BOTH sides — balance preserved",
        "Order: undo addition/subtraction first, then multiplication/division",
        "Coefficient must divide evenly on GMAT — no messy fractions at easy level",
        "Check: substitute x back to verify LHS = RHS"
      ],
      "example": {
        "problem": "If 2x + 5 = 17, find x.",
        "steps": [
          "Subtract 5 from both sides: 2x = 12",
          "Divide both sides by 2: x = 6",
          "Check: 2(6) + 5 = 17 ✓"
        ],
        "answer": "x = 6"
      },
      "traps": [
        "Dividing before subtracting: 2x + 5/2 ≠ correct first step",
        "Forgetting to divide after subtracting: stopping at 2x = 12",
        "Arithmetic slip: 17 − 5 = 11 (off-by-one trap → leads to x = 5.5 or 5)"
      ],
      "solveSteps": [
        "1. Move constant to RHS: subtract 5 → 2x = 12",
        "2. Divide both sides by coefficient 2 → x = 6",
        "3. Verify by substituting back into original equation"
      ]
    }
  },
  "411": {
    "hint": "Distribute or divide first — isolate x in two clean steps. Watch the subtraction inside the parentheses.",
    "theory": {
      "title": "Linear Equations — One-Step Isolate",
      "icon": "⚖",
      "summary": "Solve ax + b = c by undoing operations in reverse order: divide out the coefficient, then handle the constant. Two steps, no tricks.",
      "keyFacts": [
        "3(x − 2) = 12 → divide both sides by 3 first: x − 2 = 4",
        "Then add 2 both sides: x = 6",
        "Alternative: distribute first → 3x − 6 = 12 → 3x = 18 → x = 6",
        "Both paths give same answer — pick whichever is faster",
        "Reverse-PEMDAS: undo addition/subtraction last added first"
      ],
      "example": {
        "problem": "If 3(x − 2) = 12, what is x?",
        "steps": [
          "Divide both sides by 3: x − 2 = 4",
          "Add 2 to both sides: x = 6",
          "Check: 3(6 − 2) = 3(4) = 12 ✓"
        ],
        "answer": "x = 6"
      },
      "traps": [
        "Adding 2 before dividing by 3: 3x − 2 = 12 → wrong distribution path",
        "Forgetting to apply the 3 to both terms inside: treating as 3x − 2 = 12",
        "Sign error: x − 2 = 4 → x = 2 (subtracting instead of adding)"
      ],
      "solveSteps": [
        "1. Divide both sides by the outside coefficient: 12 ÷ 3 = 4",
        "2. Rewrite: x − 2 = 4",
        "3. Add 2 to both sides: x = 6",
        "4. Verify by substituting back into original equation"
      ]
    }
  },
  "412": {
    "hint": "Multiply the two perpendicular dimensions. Watch for traps: perimeter and wrong products are planted as choices.",
    "theory": {
      "title": "Rectangle Area — Length × Width",
      "icon": "▭",
      "summary": "Area measures the space inside a rectangle. Multiply length by width — two dimensions, one product. Perimeter is the other formula; don't mix them up.",
      "keyFacts": [
        "Area = l × w",
        "Perimeter = 2(l + w)  — different concept",
        "Units: area in square units (cm², m², etc.)",
        "Squaring only applies to squares (l = w); rectangles use both dims",
        "If l and w are integers, area is always an integer"
      ],
      "example": {
        "problem": "Rectangle with length 8 and width 5. Find the area.",
        "steps": [
          "Recall: Area = l × w",
          "Plug in: 8 × 5",
          "= 40"
        ],
        "answer": "40"
      },
      "traps": [
        "l + w = 13 — addition instead of multiplication",
        "2(l + w) = 26 — perimeter formula used instead",
        "8 × 5 misread as 8 + 5 + some offset yielding 30 or 35"
      ],
      "solveSteps": [
        "1. Identify the two given dimensions (length, width)",
        "2. Apply Area = l × w",
        "3. Eliminate perimeter-formula answer (2l + 2w) from choices",
        "4. Confirm result is in expected range"
      ]
    }
  },
  "413": {
    "hint": "Square has 4 equal sides. Perimeter = sum of all sides. Watch for area trap (s²).",
    "theory": {
      "title": "Square Perimeter vs Area",
      "icon": "□",
      "summary": "Perimeter is the total boundary length — add all 4 equal sides. Don't confuse with area, which multiplies two dimensions.",
      "keyFacts": [
        "Perimeter of square = 4s",
        "Area of square = s²",
        "Perimeter is linear (×4), area is quadratic (×s)",
        "All 4 sides equal — no need to add individually",
        "Units: perimeter in same units as side; area in square units"
      ],
      "example": {
        "problem": "Square with side 7. Find perimeter.",
        "steps": [
          "Perimeter = 4 × side",
          "= 4 × 7",
          "= 28"
        ],
        "answer": "28"
      },
      "traps": [
        "s² = 49 — common trap; that is AREA, not perimeter",
        "2 × 7 = 14 — only two sides, not four",
        "s × 3 = 21 — three sides, missing one"
      ],
      "solveSteps": [
        "1. Identify shape: square → all sides equal",
        "2. Perimeter = 4 × s",
        "3. Plug in: 4 × 7 = 28",
        "4. Sanity: perimeter > any single side; area = s² is different"
      ]
    }
  },
  "414": {
    "hint": "Sum all values, divide by count. Watch for off-by-one on number of terms.",
    "theory": {
      "title": "Arithmetic Mean — Basic Average",
      "icon": "∑",
      "summary": "Mean = sum of values ÷ count of values. Always add all terms first, then divide — never average the averages.",
      "keyFacts": [
        "Mean = (x₁ + x₂ + … + xₙ) / n",
        "Count terms carefully — include all endpoints",
        "If terms form arithmetic sequence, mean = (first + last) / 2",
        "Mean lies between min and max of the set",
        "Sum = mean × n (useful for back-solving)"
      ],
      "example": {
        "problem": "Find the average of 4, 7, 10, and 11.",
        "steps": [
          "Count terms: n = 4",
          "Sum: 4 + 7 + 10 + 11 = 32",
          "Mean: 32 / 4 = 8"
        ],
        "answer": "8"
      },
      "traps": [
        "Dividing by 3 instead of 4 (miscounting terms)",
        "Averaging only the middle two values and ignoring extremes",
        "Confusing median with mean — median of {4,7,10,11} = 8.5, mean = 8"
      ],
      "solveSteps": [
        "1. Count n terms exactly",
        "2. Sum all values",
        "3. Divide sum by n",
        "4. Sanity: result must be between min and max"
      ]
    }
  },
  "415": {
    "hint": "Convert decimal to fraction: write digits over power of 10, then simplify. One of these matches exactly.",
    "theory": {
      "title": "Decimal ↔ Fraction Conversion",
      "icon": "🔢",
      "summary": "Any terminating decimal = integer over power of 10. Simplify by dividing numerator and denominator by their GCD.",
      "keyFacts": [
        "0.4 = 4/10 — one decimal place → denominator 10",
        "0.04 = 4/100 — two decimal places → denominator 100",
        "Simplify: divide top and bottom by GCD",
        "GCD(4,10) = 2 → 4/10 = 2/5",
        "To go back: divide numerator by denominator (2÷5 = 0.4) ✓",
        "Memorize: 1/5=0.2, 2/5=0.4, 3/5=0.6, 4/5=0.8"
      ],
      "example": {
        "problem": "Express 0.6 as a simplified fraction.",
        "steps": [
          "Write 0.6 = 6/10",
          "Find GCD(6,10) = 2",
          "Divide: 6/10 = 3/5",
          "Check: 3 ÷ 5 = 0.6 ✓"
        ],
        "answer": "3/5"
      },
      "traps": [
        "Forgetting to simplify — 4/10 is correct but not among answer choices in simplified form",
        "Confusing 0.4 with 1/4 (=0.25) — different values",
        "Reading 0.4 as 4/100 instead of 4/10 — count decimal places carefully"
      ],
      "solveSteps": [
        "1. Count decimal places → that many zeros in denominator",
        "2. Write fraction: digits / (10^places)",
        "3. Simplify by dividing by GCD",
        "4. Verify: numerator ÷ denominator = original decimal"
      ]
    }
  },
  "416": {
    "hint": "Sum of roots of ax²+bx+c=0 equals −b/a. No need to factor — read it directly from coefficients.",
    "theory": {
      "title": "Vieta's Formulas — Sum & Product of Roots",
      "icon": "∑",
      "summary": "For any quadratic ax²+bx+c=0, the sum and product of roots are locked in the coefficients. Sum = −b/a, product = c/a — no factoring needed.",
      "keyFacts": [
        "Sum of roots = −b/a",
        "Product of roots = c/a",
        "For monic quadratic (a=1): sum = −b, product = c",
        "Roots need not be integers — formulas work for any real or complex roots",
        "If equation is x²−5x+6: b=−5, so sum = −(−5)/1 = 5",
        "Factor check: (x−2)(x−3)=0 → roots 2,3 → sum=5 ✓"
      ],
      "example": {
        "problem": "x²−5x+6=0. What is the sum of the roots?",
        "steps": [
          "Identify a=1, b=−5, c=6",
          "Sum of roots = −b/a = −(−5)/1 = 5",
          "Optional verify: factor → (x−2)(x−3)=0, roots 2 and 3",
          "2+3 = 5 ✓"
        ],
        "answer": "5"
      },
      "traps": [
        "Reading b=−5 as sum directly → gets −5 (forget the negation)",
        "Confusing sum with product: c/a=6, not the sum",
        "Factoring only — slower and fails when roots are irrational",
        "Picking 6 because it 'looks like the constant term answer'"
      ],
      "solveSteps": [
        "1. Write equation in ax²+bx+c=0 form",
        "2. Sum of roots = −b/a (plug in, watch sign)",
        "3. Product of roots = c/a (if needed)",
        "4. Verify by factoring if time permits"
      ]
    }
  },
  "417": {
    "hint": "x² = k with k > 0 always has TWO real solutions — one positive, one negative. Count the solutions, not the values.",
    "theory": {
      "title": "Square Root — Two Solutions",
      "icon": "±",
      "summary": "x² = k has two real solutions when k > 0: x = +√k and x = −√k. The square root symbol √ alone means positive root; the equation x² = k means both.",
      "keyFacts": [
        "x² = k → x = ±√k (two solutions if k > 0, one if k = 0, none real if k < 0)",
        "√49 = 7 (principal root only); x² = 49 gives x = 7 OR x = −7",
        "Squaring loses sign info — recovering it requires ±",
        "Number of real roots: k > 0 → 2, k = 0 → 1, k < 0 → 0",
        "Do NOT confuse 'value of x²' (one) with 'values of x' (two)"
      ],
      "example": {
        "problem": "x² = 49 and x is real. How many values can x take?",
        "steps": [
          "x² = 49 → x = ±√49",
          "√49 = 7",
          "So x = +7 or x = −7",
          "Two distinct real values"
        ],
        "answer": "2"
      },
      "traps": [
        "Saying √49 = 7 only → missing x = −7",
        "Confusing the equation x² = 49 with x = √49",
        "Thinking 'one equation → one solution' — quadratics can have 0, 1, or 2"
      ],
      "solveSteps": [
        "1. Isolate x²",
        "2. Check sign of right side: positive → two solutions, zero → one, negative → none real",
        "3. Apply ±√ to get both roots",
        "4. Count distinct values"
      ]
    }
  },
  "418": {
    "hint": "Two equations, two unknowns — eliminate one variable by substitution or subtraction. Isolate x after clearing y.",
    "theory": {
      "title": "Simultaneous Linear Equations — Two Methods",
      "icon": "⚖",
      "summary": "Two linear equations with two unknowns always yield a unique solution (if non-parallel). Eliminate one variable, solve for the other.",
      "keyFacts": [
        "Substitution: isolate one variable in simpler equation, substitute into other",
        "Elimination: multiply equations to match a coefficient, then add/subtract to cancel",
        "With 2 equations + 2 unknowns → exactly 1 solution (unless lines are parallel/same)",
        "Subtraction trick: if coefficients differ by 1, subtracting equations is fastest",
        "Always back-substitute to verify both equations hold"
      ],
      "example": {
        "problem": "3x + 2y = 14 and x + y = 6. Find x.",
        "steps": [
          "From eq2: y = 6 − x",
          "Sub into eq1: 3x + 2(6 − x) = 14",
          "3x + 12 − 2x = 14",
          "x = 2",
          "Check: y = 4; 3(2)+2(4)=14 ✓, 2+4=6 ✓"
        ],
        "answer": "x = 2"
      },
      "traps": [
        "Subbing into the SAME equation you used to isolate — circular, no solution found",
        "Arithmetic slip distributing the 2: 2(6−x) = 12−2x, not 12−x",
        "Solving for y and reporting y as x",
        "Skipping back-check — easy to catch sign errors"
      ],
      "solveSteps": [
        "1. Pick simpler equation (fewer terms); isolate one variable",
        "2. Substitute expression into other equation",
        "3. Solve resulting single-variable equation",
        "4. Back-substitute to find second variable",
        "5. Verify both original equations satisfied"
      ]
    }
  },
  "419": {
    "hint": "Isolate x in two clean steps: add 3 to both sides, then divide by 2. Watch which answer matches exactly.",
    "theory": {
      "title": "Linear Inequalities — Isolating the Variable",
      "icon": "⚖",
      "summary": "Solving a linear inequality mirrors solving an equation: add/subtract, then multiply/divide. Key exception: dividing by a negative flips the inequality sign.",
      "keyFacts": [
        "Add/subtract same value to both sides → inequality preserved",
        "Multiply/divide by positive → inequality preserved",
        "Multiply/divide by negative → FLIP the inequality sign",
        "2x − 3 > 7 → add 3 → 2x > 10 → divide by 2 → x > 5",
        "Never flip for positive divisor — common trap on GMAT"
      ],
      "example": {
        "problem": "Solve: 2x − 3 > 7",
        "steps": [
          "Add 3 to both sides: 2x > 10",
          "Divide both sides by 2 (positive → no flip): x > 5"
        ],
        "answer": "x > 5"
      },
      "traps": [
        "Forgetting to add 3 first → landing on x > 3.5 or similar",
        "Dividing before isolating the constant term",
        "Flipping sign when dividing by a positive number",
        "Picking x > 7 by treating the 7 as the threshold without solving"
      ],
      "solveSteps": [
        "1. Move constants: add/subtract to isolate the x-term",
        "2. Divide by coefficient of x; if negative, flip sign",
        "3. Match result exactly against answer choices — partial steps produce wrong letter",
        "4. Sanity: plug boundary value back in to confirm"
      ]
    }
  },
  "420": {
    "hint": "Spot the Pythagorean triple: legs 9 and 12 share a common factor. Scale a known triple instead of computing √(a²+b²).",
    "theory": {
      "title": "Pythagorean Theorem & Common Triples",
      "icon": "📐",
      "summary": "In any right triangle, a² + b² = c². Memorizing scaled triples (3-4-5, 5-12-13, 8-15-17) lets you skip arithmetic entirely.",
      "keyFacts": [
        "a² + b² = c² where c is hypotenuse",
        "3-4-5 scaled: 6-8-10, 9-12-15, 12-16-20, 15-20-25",
        "5-12-13 scaled: 10-24-26",
        "8-15-17 scaled: 16-30-34",
        "Always check GCD of legs — if legs share factor k, divide by k, match to base triple, multiply c by k",
        "Hypotenuse is always the longest side"
      ],
      "example": {
        "problem": "Right triangle legs = 9 and 12. Find hypotenuse.",
        "steps": [
          "GCD(9,12) = 3 → divide: 9/3=3, 12/3=4",
          "Recognize 3-4-5 triple",
          "Scale hypotenuse: 5 × 3 = 15",
          "Verify: 9² + 12² = 81 + 144 = 225 = 15² ✓"
        ],
        "answer": "15"
      },
      "traps": [
        "Adding legs directly (9+12=21) — wrong, that is answer choice E as a trap",
        "Forgetting to scale: 3-4-5 → hypotenuse is 5×k, not 5 alone",
        "Mixing up which side is hypotenuse — it is always opposite the right angle, always longest",
        "Computing √(a²+b²) from scratch when a triple is faster"
      ],
      "solveSteps": [
        "1. Find GCD of the two legs",
        "2. Divide both legs by GCD → check against base triples (3-4-5, 5-12-13, 8-15-17)",
        "3. If match found: hypotenuse = base triple hypotenuse × GCD",
        "4. If no match: compute √(leg1² + leg2²) directly",
        "5. Sanity check: hypotenuse > each leg"
      ]
    }
  },
  "421": {
    "hint": "Recall the two circle formulas: one uses radius, one uses diameter. Plug r = 5 into the area formula directly.",
    "theory": {
      "title": "Circle Area & Circumference",
      "icon": "⭕",
      "summary": "Circle area scales with the SQUARE of the radius. Doubling r quadruples area. Keep r vs d straight — most traps swap them.",
      "keyFacts": [
        "Area = πr²",
        "Circumference = 2πr = πd",
        "Diameter = 2r",
        "Area in terms of diameter: A = π(d/2)² = πd²/4",
        "Circumference in terms of diameter: C = πd"
      ],
      "example": {
        "problem": "Circle has radius 5. Find its area.",
        "steps": [
          "Formula: A = πr²",
          "r = 5, so r² = 25",
          "A = 25π"
        ],
        "answer": "25π"
      },
      "traps": [
        "Using circumference formula (2πr = 10π) when area is asked",
        "Squaring diameter instead of radius: π(10)² = 100π",
        "Forgetting to square: πr → 5π instead of 25π",
        "Mixing up r and d when only diameter is given"
      ],
      "solveSteps": [
        "1. Identify r (if given d, halve it first)",
        "2. Area → πr²; Circumference → 2πr",
        "3. Compute r², multiply by π",
        "4. Check units: area = square units, circumference = linear units"
      ]
    }
  },
  "422": {
    "hint": "Find r from circumference first, then plug into area formula. Watch for traps mixing r and d.",
    "theory": {
      "title": "Circle: Circumference → Area",
      "icon": "○",
      "summary": "Circumference and area both hinge on radius. Extract r from C = 2πr, then compute A = πr². Never shortcut by treating the circumference number as the area.",
      "keyFacts": [
        "C = 2πr = πd",
        "A = πr²",
        "Given C = kπ → r = k/2",
        "A = π(k/2)² = πk²/4",
        "Diameter d = 2r — don't confuse with radius in A formula",
        "A always grows as r², so doubling r quadruples A"
      ],
      "example": {
        "problem": "Circle has circumference 12π. Find area.",
        "steps": [
          "C = 2πr = 12π → r = 6",
          "A = πr² = π(6)² = 36π"
        ],
        "answer": "36π"
      },
      "traps": [
        "Using C number directly as area (12π → 12π is wrong)",
        "Using diameter instead of radius in A = πr² (r=6 not 12)",
        "Forgetting to square r (getting 6π instead of 36π)",
        "Confusing 2πr with πr² — one is linear, one is quadratic"
      ],
      "solveSteps": [
        "1. Extract r: set C = 2πr, solve r = C/(2π)",
        "2. Plug r into A = πr²",
        "3. Simplify — answer must be πr² not πr",
        "4. Sanity: A in πr² grows faster than C; area number > circumference number when r > 2"
      ]
    }
  },
  "423": {
    "hint": "Plug straight into d = r × t. Watch the decimal: 60 × 2.5 is not 120.",
    "theory": {
      "title": "Distance = Rate × Time",
      "icon": "🚗",
      "summary": "The core motion formula links three quantities: distance, rate, and time. Know any two → find the third by rearranging d = rt.",
      "keyFacts": [
        "d = r × t  (distance = rate × time)",
        "r = d / t  (rate = distance / time)",
        "t = d / r  (time = distance / rate)",
        "Units must match: mph + hours → miles",
        "2.5 hours = 2½ hours = 150 min — pick the unit matching rate",
        "Mixed units? Convert first, then plug in"
      ],
      "example": {
        "problem": "Car goes 60 mph for 2.5 hours. Distance?",
        "steps": [
          "d = r × t",
          "d = 60 × 2.5",
          "60 × 2 = 120, 60 × 0.5 = 30",
          "d = 120 + 30 = 150 miles"
        ],
        "answer": "150 miles"
      },
      "traps": [
        "60 × 2 = 120 — stops too early, drops the 0.5 hour",
        "Confusing r and t in the formula and dividing instead of multiplying",
        "Unit mismatch: rate in mph, time in minutes → wrong answer without conversion"
      ],
      "solveSteps": [
        "1. Identify the two knowns (rate and time here)",
        "2. Write d = r × t",
        "3. Substitute: 60 × 2.5",
        "4. Break decimal: 60×2 + 60×0.5 = 120 + 30",
        "5. Answer = 150"
      ]
    }
  },
  "424": {
    "hint": "Multiply total volume by the acid percentage expressed as a decimal. One direct multiplication gives the pure-component volume.",
    "theory": {
      "title": "Mixture Concentration — Component Extraction",
      "icon": "🧪",
      "summary": "Amount of a component = total volume × concentration (as decimal). No mixing needed when only one solution is involved.",
      "keyFacts": [
        "Component amount = Total volume × (% / 100)",
        "Concentration must be a decimal: 30% → 0.30",
        "Works for any component: acid, salt, alcohol, etc.",
        "Remaining (non-acid) volume = Total − Component amount",
        "When diluting/mixing two solutions: C₁V₁ + C₂V₂ = C_final × V_final"
      ],
      "example": {
        "problem": "10-liter solution is 30% acid. How many liters are pure acid?",
        "steps": [
          "Convert percent to decimal: 30% = 0.30",
          "Apply formula: acid = 0.30 × 10",
          "acid = 3 liters"
        ],
        "answer": "3 liters"
      },
      "traps": [
        "Using 30 instead of 0.30 → get 300, obviously wrong but test writers use 3 as answer so unit error hides",
        "Confusing acid volume (3 L) with non-acid volume (7 L) — option 7 is a sucker",
        "Overcomplicating: no mixing equation needed when only one solution exists"
      ],
      "solveSteps": [
        "1. Identify total volume and concentration percentage",
        "2. Convert % to decimal (÷ 100)",
        "3. Multiply: component = decimal × total volume",
        "4. Check: answer must be less than total volume"
      ]
    }
  },
  "425": {
    "hint": "Substitute x = 3 into each term separately, then combine. Watch signs on the middle term.",
    "theory": {
      "title": "Function Evaluation — Direct Substitution",
      "icon": "𝑓",
      "summary": "f(x) means 'replace every x with the input value.' Evaluate each term left to right, then sum. No algebra needed — just arithmetic.",
      "keyFacts": [
        "f(a) = substitute x = a everywhere in the expression",
        "Evaluate term by term: coefficient × (value)^power",
        "Negative middle term: −3x means subtract 3×input, not 3×(−input)",
        "Order: exponents first, multiply by coefficient, then add/subtract",
        "Constant term (no x) copies unchanged"
      ],
      "example": {
        "problem": "f(x) = 2x² − 3x + 1. Find f(3).",
        "steps": [
          "x = 3 → compute each term",
          "2x² = 2 · 3² = 2 · 9 = 18",
          "−3x = −3 · 3 = −9",
          "Constant = +1",
          "Sum: 18 − 9 + 1 = 10"
        ],
        "answer": "10"
      },
      "traps": [
        "Computing 2x² as (2x)² = 36 — coefficient stays outside the square",
        "Dropping the sign: treating −3x as +3x = +9 instead of −9",
        "Adding constant before finishing multiplication",
        "Squaring the coefficient: 2² · x² = 4 · 9 = 36"
      ],
      "solveSteps": [
        "1. Identify each term and its coefficient/exponent",
        "2. Substitute the input value for every x",
        "3. Compute exponents first, then multiply by coefficients",
        "4. Combine with correct signs (− terms subtract)",
        "5. Sum all terms for final answer"
      ]
    }
  },
  "426": {
    "hint": "Rewrite 32 as a power of 2, then equate exponents. Count the doublings from 1 to 32.",
    "theory": {
      "title": "Exponential Equations — Base Matching",
      "icon": "🔢",
      "summary": "When bases match, exponents must match. Rewrite both sides as the same base, then set exponents equal.",
      "keyFacts": [
        "If a^x = a^n, then x = n — bases equal → exponents equal",
        "Powers of 2: 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64",
        "To solve 2^x = N: express N as 2^k, then x = k",
        "log₂(N) = x is equivalent — but base-matching is faster on GMAT",
        "Each doubling adds 1 to the exponent"
      ],
      "example": {
        "problem": "If 2^x = 32, what is x?",
        "steps": [
          "Express 32 as power of 2: 32 = 2×16 = 2×2⁴ = 2⁵",
          "So 2^x = 2⁵",
          "Bases equal → exponents equal: x = 5"
        ],
        "answer": "5"
      },
      "traps": [
        "Dividing 32 by 2 once and stopping at x=4 (off-by-one)",
        "Confusing 2^x = 32 with 2×x = 32 → x = 16",
        "Guessing x = log(32)/log(2) correctly but miscalculating — base-match is safer"
      ],
      "solveSteps": [
        "1. Factor the right side into the same base as the left (here: base 2)",
        "2. Count doublings or use known powers to write N = 2^k",
        "3. Set exponents equal: x = k",
        "4. Verify: plug back in to confirm 2^k = N"
      ]
    }
  },
  "427": {
    "hint": "Power of a power: multiply exponents first, then add when multiplying same base. Count total exponent carefully.",
    "theory": {
      "title": "Exponent Rules — Power of a Power & Same-Base Multiplication",
      "icon": "⚡",
      "summary": "(aᵐ)ⁿ = aᵐⁿ (multiply exponents). aᵐ · aⁿ = aᵐ⁺ⁿ (add exponents). Apply in order: simplify inner power first, then combine.",
      "keyFacts": [
        "(aᵐ)ⁿ = aᵐⁿ — power of a power: multiply exponents",
        "aᵐ · aⁿ = aᵐ⁺ⁿ — same base product: add exponents",
        "aᵐ / aⁿ = aᵐ⁻ⁿ — same base quotient: subtract exponents",
        "a¹ = a — any number with exponent 1 stays itself",
        "a⁰ = 1 — any nonzero base to power 0 equals 1",
        "Order: resolve parenthesized powers first, then multiply/divide"
      ],
      "example": {
        "problem": "Simplify (2³)² · 2.",
        "steps": [
          "Step 1: Apply power of a power — (2³)² = 2^(3·2) = 2⁶",
          "Step 2: Rewrite standalone 2 as 2¹",
          "Step 3: Multiply same base — 2⁶ · 2¹ = 2^(6+1) = 2⁷"
        ],
        "answer": "2⁷"
      },
      "traps": [
        "Adding instead of multiplying in (aᵐ)ⁿ — gives 2⁵ instead of 2⁶",
        "Forgetting the standalone · 2 adds +1 to exponent, not ×2",
        "Multiplying exponents in the product step — gives 2⁶ instead of 2⁷",
        "Treating (2³)² as 2^(3²) = 2⁹ — wrong, exponents multiply, don't stack"
      ],
      "solveSteps": [
        "1. Spot any power-of-a-power: (aᵐ)ⁿ → aᵐⁿ",
        "2. Convert all terms to same base with explicit exponents",
        "3. Multiply same-base terms by adding exponents",
        "4. Verify by counting total 2s being multiplied if unsure"
      ]
    }
  },
  "428": {
    "hint": "Apply distance formula: √((x₂−x₁)² + (y₂−y₁)²). Look for a Pythagorean triple — avoids messy roots.",
    "theory": {
      "title": "Distance Formula — Coordinate Geometry",
      "icon": "📐",
      "summary": "Distance between two points = hypotenuse of right triangle formed by horizontal and vertical legs. Pythagorean theorem in disguise.",
      "keyFacts": [
        "d = √((x₂−x₁)² + (y₂−y₁)²)",
        "Horizontal leg = |x₂−x₁|, vertical leg = |y₂−y₁|",
        "Common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17 (and multiples)",
        "Order of subtraction doesn't matter — differences get squared",
        "Midpoint of two points: ((x₁+x₂)/2, (y₁+y₂)/2)"
      ],
      "example": {
        "problem": "Find distance between (2, 3) and (5, 7).",
        "steps": [
          "Δx = 5−2 = 3",
          "Δy = 7−3 = 4",
          "d = √(3² + 4²) = √(9+16) = √25",
          "d = 5 (3-4-5 triple — no calculator needed)"
        ],
        "answer": "5"
      },
      "traps": [
        "Adding legs directly: 3+4=7 — wrong. Hypotenuse ≠ sum of legs",
        "Forgetting to square differences before summing under radical",
        "Subtracting coordinates in different orders for x and y (signs cancel after squaring — but easy arithmetic error)",
        "Not recognizing common Pythagorean triples → wasted time computing √25"
      ],
      "solveSteps": [
        "1. Compute Δx = x₂−x₁ and Δy = y₂−y₁",
        "2. Square both differences",
        "3. Sum the squares, take √",
        "4. Check if result matches a Pythagorean triple first — saves time",
        "5. Verify answer lies between the two individual legs (must be > each leg)"
      ]
    }
  },
  "429": {
    "hint": "Slope = rise over run: (y₂−y₁)/(x₂−x₁). Plug in the two points directly — watch sign on numerator and denominator.",
    "theory": {
      "title": "Slope of a Line — Rise Over Run",
      "icon": "📐",
      "summary": "Slope measures steepness: how much y changes per unit of x. Calculate it as the ratio of vertical change to horizontal change between any two points.",
      "keyFacts": [
        "slope m = (y₂ − y₁) / (x₂ − x₁)",
        "Order of subtraction must match: top and bottom use same point first",
        "Positive slope → line rises left-to-right; negative → falls",
        "Slope-intercept form: y = mx + b, where b = y-intercept",
        "Slope is constant — same value for ANY two points on the line",
        "Horizontal line: m = 0. Vertical line: m = undefined"
      ],
      "example": {
        "problem": "A line passes through (0, 2) and (4, 10). What is its slope?",
        "steps": [
          "Label: (x₁,y₁) = (0,2), (x₂,y₂) = (4,10)",
          "Rise = y₂ − y₁ = 10 − 2 = 8",
          "Run = x₂ − x₁ = 4 − 0 = 4",
          "m = 8 / 4 = 2"
        ],
        "answer": "2"
      },
      "traps": [
        "Flipping rise and run: computing (x₂−x₁)/(y₂−y₁) instead",
        "Mixing point order: (y₂−y₁) but (x₁−x₂) — sign error",
        "Confusing slope with y-intercept (b = 2 here is a tempting distractor)",
        "Seeing 10 and 4 as 'big numbers' and guessing slope = large value"
      ],
      "solveSteps": [
        "1. Identify two points (x₁,y₁) and (x₂,y₂)",
        "2. Compute rise = y₂ − y₁",
        "3. Compute run = x₂ − x₁",
        "4. Divide: m = rise / run",
        "5. Sanity check: positive slope means y increases as x increases"
      ]
    }
  },
  "430": {
    "hint": "Set up one equation: (now+5) = 2·(now−4). Solve for current age — watch the sign when distributing the 2.",
    "theory": {
      "title": "Age Word Problems — Linear Equations",
      "icon": "🎂",
      "summary": "Age problems translate time-shifted ages into a single equation. Anchor on current age as the variable; add or subtract years for past/future.",
      "keyFacts": [
        "Let x = current age. Future: x+n. Past: x−n",
        "'Will be' → future; 'was' → past — never mix them on same side without adjusting",
        "Distribute multipliers carefully: 2(x−4) = 2x−8, NOT 2x−4",
        "One unknown → one equation is always enough for PS age problems",
        "After solving, verify: plug x back into BOTH sides of original equation"
      ],
      "example": {
        "problem": "In 5 years John is twice as old as he was 4 years ago. How old now?",
        "steps": [
          "Let x = current age",
          "In 5 years: x+5; 4 years ago: x−4",
          "Equation: x+5 = 2(x−4)",
          "Expand: x+5 = 2x−8",
          "Solve: 13 = x"
        ],
        "answer": "13"
      },
      "traps": [
        "Forgetting to distribute: writing 2(x−4) = 2x−4 loses 4 points",
        "Mixing up past/future: setting future = 2·future instead of 2·past",
        "Off-by-one: using 4 and 5 on same side of equation",
        "Not verifying: 13+5=18, 2·(13−4)=18 ✓ — always check"
      ],
      "solveSteps": [
        "1. Assign x = current age",
        "2. Translate each time phrase: future → x+n, past → x−n",
        "3. Build equation from 'will be … as … was' structure",
        "4. Distribute multipliers fully, then isolate x",
        "5. Verify by substituting x back into original English sentence"
      ]
    }
  },
  "431": {
    "hint": "More workers → less time. Total worker-days is fixed: (workers) × (days) = constant. Set up the inverse proportion.",
    "theory": {
      "title": "Work Rate — Inverse Proportion",
      "icon": "🔧",
      "summary": "Total work is fixed. Double the workers → half the time. Workers × Days = constant (worker-days).",
      "keyFacts": [
        "Worker-days = Workers × Days = constant (for fixed total work)",
        "More workers → fewer days (inverse proportion)",
        "Formula: W₁ × D₁ = W₂ × D₂",
        "Individual rate = 1/(days alone); combined rate = sum of rates",
        "Time = Total Work / Combined Rate"
      ],
      "example": {
        "problem": "3 workers finish a job in 8 days. How long for 6 workers at same rate?",
        "steps": [
          "Total worker-days = 3 × 8 = 24",
          "6 workers must still complete 24 worker-days",
          "t = 24 / 6 = 4 days",
          "Check: 6 × 4 = 24 ✓"
        ],
        "answer": "4 days"
      },
      "traps": [
        "Doubling workers does NOT halve the answer unless rates are equal",
        "Mixing additive rate method with inverse proportion — pick one approach",
        "Forgetting that total work is constant — it doesn't change with headcount",
        "Using direct proportion (more workers = more days) — it's INVERSE"
      ],
      "solveSteps": [
        "1. Compute total worker-days: W₁ × D₁",
        "2. Set equal to new scenario: W₂ × D₂ = same total",
        "3. Solve for unknown: D₂ = (W₁ × D₁) / W₂",
        "4. Sanity check: more workers → fewer days (inverse relationship)"
      ]
    }
  },
  "432": {
    "hint": "Old sum = mean × count. New sum = new mean × new count. Sixth number = new sum − old sum.",
    "theory": {
      "title": "Adding a Value — Mean × Count",
      "icon": "∑",
      "summary": "Mean encodes the total: sum = mean × count. When a new value joins, compare old and new sums to find it.",
      "keyFacts": [
        "Sum = mean × count (always)",
        "New sum = new mean × new count",
        "Added value = new sum − old sum",
        "Each new member must exceed the new mean to pull it up",
        "Mean rises by k → total sum rises by k × new count"
      ],
      "example": {
        "problem": "Mean of 5 numbers is 12. After adding a 6th, mean becomes 13. What is the 6th number?",
        "steps": [
          "Old sum = 12 × 5 = 60",
          "New sum = 13 × 6 = 78",
          "6th number = 78 − 60 = 18"
        ],
        "answer": "18"
      },
      "traps": [
        "Guessing 13 — the new mean, not the new value",
        "Guessing 14 — adding the difference 1 to the new mean",
        "Forgetting new count is 6, not 5",
        "The added value must be > new mean to have pulled the average up"
      ],
      "solveSteps": [
        "1. Compute old sum = old mean × old count",
        "2. Compute new sum = new mean × new count",
        "3. Added value = new sum − old sum",
        "4. Sanity: added value > new mean confirms average rose"
      ]
    }
  },
  "433": {
    "hint": "Median of 5 values = 3rd value when sorted. Place x and see when 9 stays in position 3.",
    "theory": {
      "title": "Median with Unknown — Position Logic",
      "icon": "📊",
      "summary": "Median = middle value after sorting. Adding an unknown shifts the sorted order. Find what values keep the target number in the middle position.",
      "keyFacts": [
        "Median of n values = middle value when sorted (n odd), or avg of two middle (n even)",
        "For 5 values: median = 3rd value in sorted order",
        "If x < median candidate → x slots left of it, middle unchanged",
        "If x > median candidate → x slots right of it, middle unchanged",
        "Only if x displaces the candidate from position 3 does median change",
        "Known values sorted: 4, 7, 9, 13 — 9 is already 3rd of 4"
      ],
      "example": {
        "problem": "Set {4, 7, 9, 13, x} has median 9. What values can x take?",
        "steps": [
          "Without x, sorted: 4, 7, 9, 13 — 9 is position 3 of 4",
          "Add x. Need 9 in position 3 of 5",
          "If x ≤ 9: sorted order …x… 9 13 or 4 x 9 13 — 9 stays at pos 3 ✓",
          "Wait: if x < 9, 9 is 4th? Check: x=1 → 1,4,7,9,13 — 9 is pos 4, not 3 ✗",
          "If x ≥ 9: sorted 4,7,9,x,13 or 4,7,9,13,x — 9 stays pos 3 ✓",
          "Conclusion: x ≥ 9"
        ],
        "answer": "Any value ≥ 9"
      },
      "traps": [
        "Assuming x ≤ 9 keeps 9 in middle — wrong, small x pushes 9 rightward",
        "Forgetting to re-sort after inserting x",
        "Thinking x must equal 9 exactly",
        "Not checking boundary: x = 9 itself is valid and keeps median = 9"
      ],
      "solveSteps": [
        "1. Sort known values: 4, 7, 9, 13",
        "2. Identify target position: median of 5 = position 3",
        "3. Test x < 9 (e.g. x=1): new sorted = 1,4,7,9,13 → pos 3 = 7, not 9 ✗",
        "4. Test x ≥ 9 (e.g. x=11): sorted = 4,7,9,11,13 → pos 3 = 9 ✓",
        "5. Conclude x ≥ 9"
      ]
    }
  },
  "434": {
    "hint": "Chain substitutions: replace b in the a=2b equation using b=3c. One step.",
    "theory": {
      "title": "Chain Substitution — Linked Variables",
      "icon": "🔗",
      "summary": "When variables chain (a in terms of b, b in terms of c), substitute inward: replace b with its c-expression to get a directly in terms of c.",
      "keyFacts": [
        "If a=kb and b=mc, then a=k·m·c — multiply the coefficients",
        "Substitute the innermost variable first, then work outward",
        "Order matters: always replace the middle variable, not the target",
        "No algebra needed — pure substitution",
        "Result = product of all scale factors along the chain"
      ],
      "example": {
        "problem": "a = 2b and b = 3c. Express a in terms of c.",
        "steps": [
          "b = 3c (given)",
          "Substitute into a = 2b: a = 2(3c)",
          "a = 6c"
        ],
        "answer": "6c"
      },
      "traps": [
        "Adding coefficients: 2+3=5 → 5c is wrong; MULTIPLY, don't add",
        "Stopping at b: forgetting to substitute b=3c and leaving answer as 2b",
        "Confusing direction: solving for c in terms of a instead"
      ],
      "solveSteps": [
        "1. Identify the chain: which variable appears in both equations?",
        "2. Express middle variable (b) fully in terms of the target (c)",
        "3. Substitute that expression into the first equation",
        "4. Simplify by multiplying coefficients",
        "5. Verify: coefficients multiply, not add"
      ]
    }
  },
  "435": {
    "hint": "Apply changes sequentially as multipliers. +10% then −10% is NOT a wash — order and base matter.",
    "theory": {
      "title": "Sequential Percent Changes — Multiplier Chain",
      "icon": "%",
      "summary": "Percent increases and decreases use the CURRENT value as the new base each time. +10% then −10% yields a net loss because the decrease applies to a larger base.",
      "keyFacts": [
        "Increase by p% → multiply by (1 + p/100)",
        "Decrease by p% → multiply by (1 − p/100)",
        "Chain multipliers: apply left to right",
        "+p% then −p% → net factor = (1 + p/100)(1 − p/100) = 1 − (p/100)² — always a NET LOSS",
        "Net % change = −(p²/100) for equal up/down swings",
        "Order doesn't matter for the net result — only the magnitudes"
      ],
      "example": {
        "problem": "$4,000 salary: +10% then −10%. What is final salary?",
        "steps": [
          "Step 1 multiplier: +10% → ×1.10",
          "Step 2 multiplier: −10% → ×0.90",
          "Combined: 4000 × 1.10 × 0.90",
          "= 4000 × 0.99",
          "= $3,960"
        ],
        "answer": "$3,960"
      },
      "traps": [
        "Assuming +10% then −10% cancels out to zero net change — WRONG",
        "Adding/subtracting percentages directly: 10% − 10% = 0 — ignores changing base",
        "Net loss formula: −(10²/100) = −1%, so 4000 × 0.99 = 3960",
        "Picking $4,000 is the classic sucker answer"
      ],
      "solveSteps": [
        "1. Convert each % change to a multiplier: +p% → (1+p/100), −p% → (1−p/100)",
        "2. Multiply all multipliers together",
        "3. Apply to original value",
        "4. Sanity check: equal up/down swings always produce a net loss — answer must be below start"
      ]
    }
  },
  "436": {
    "hint": "Units digit of 3^n cycles with period 4: 3,9,7,1. Find where the exponent lands in that cycle.",
    "theory": {
      "title": "Units Digit Cycles — Powers of 3",
      "icon": "🔄",
      "summary": "Units digits of integer powers repeat in short cycles. For base 3, the cycle is 3→9→7→1 (length 4). Use exponent mod 4 to find position.",
      "keyFacts": [
        "Units digit depends ONLY on units digit of the base",
        "3^n cycle (period 4): 3, 9, 7, 1, 3, 9, 7, 1 …",
        "Position in cycle = exponent mod 4 (if result = 0, use position 4)",
        "Common cycles: 2→4→8→6 (period 4), 7→9→3→1 (period 4), 4→6 (period 2), 5 & 6 always end in 5 & 6",
        "Any base ending in 1 or 0 → units digit always 1 or 0"
      ],
      "example": {
        "problem": "What is the units digit of 3^27?",
        "steps": [
          "Identify cycle for base 3: 3¹=3, 3²=9, 3³=27→7, 3⁴=81→1, then repeats",
          "Cycle length = 4",
          "Compute 27 mod 4 = 3 (27 = 6×4 + 3)",
          "Position 3 in cycle 3,9,7,1 → units digit 7"
        ],
        "answer": "7"
      },
      "traps": [
        "Forgetting mod 4 = 0 means position 4, not position 0 (e.g. 3^20 → units 1, not 3)",
        "Using the full number as the exponent base instead of just its units digit",
        "Misremembering the cycle order — write it out: 3,9,7,1",
        "Stopping at 3^27 mod 4 = 3 and misreading position 3 as the digit 3, not 7"
      ],
      "solveSteps": [
        "1. Extract units digit of the base (here: 3)",
        "2. Write out the units-digit cycle for that base until it repeats",
        "3. Note the cycle length (period)",
        "4. Compute exponent mod period; if result = 0, use last position in cycle",
        "5. Read off the units digit at that position"
      ]
    }
  },
  "437": {
    "hint": "Prime-factorize first, then apply (e₁+1)(e₂+1)… formula. Count ALL divisors, including 1 and the number itself.",
    "theory": {
      "title": "Counting Divisors — Prime Factorization Formula",
      "icon": "🔢",
      "summary": "Every divisor picks independently from each prime's exponents. Total divisors = product of (exponent + 1) for each prime factor.",
      "keyFacts": [
        "If n = p₁^a · p₂^b · p₃^c, then # divisors = (a+1)(b+1)(c+1)",
        "Each divisor independently chooses 0…a of p₁, 0…b of p₂, etc.",
        "Always include exponent 0 (gives factor 1) and max exponent (gives n itself)",
        "360 = 2³ · 3² · 5¹ → (3+1)(2+1)(1+1) = 24",
        "Perfect squares have odd # of divisors (each exponent is even → each +1 is odd)",
        "To factor quickly: divide by 2s, then 3s, then 5s, then 7s…"
      ],
      "example": {
        "problem": "How many positive divisors does 360 have?",
        "steps": [
          "360 ÷ 2 = 180, ÷2 = 90, ÷2 = 45 → 2³",
          "45 ÷ 3 = 15, ÷3 = 5 → 3²",
          "5 ÷ 5 = 1 → 5¹",
          "360 = 2³ · 3² · 5¹",
          "# divisors = (3+1)(2+1)(1+1) = 4·3·2 = 24"
        ],
        "answer": "24"
      },
      "traps": [
        "Forgetting +1: using exponents directly (3·2·1 = 6) instead of (4·3·2 = 24)",
        "Skipping 1 and 360 themselves — both are valid divisors",
        "Incomplete factorization: stopping at 2²·90 or similar composite remainder",
        "Confusing 'divisors of n' with 'prime factors of n' (only 3 prime factors here)"
      ],
      "solveSteps": [
        "1. Prime-factorize: divide out each prime until quotient = 1",
        "2. Write as p₁^a · p₂^b · p₃^c…",
        "3. Add 1 to each exponent: (a+1), (b+1), (c+1)…",
        "4. Multiply those incremented exponents together",
        "5. Sanity: result should include 1 and n as divisors — count should feel 'large enough'"
      ]
    }
  },
  "438": {
    "hint": "Find the remainder cycle for the base mod 5, then use 100 mod (cycle length) to pick the right term.",
    "theory": {
      "title": "Remainder Cycles — Powers mod n",
      "icon": "🔄",
      "summary": "Remainders of successive powers always repeat in a short cycle. Find the cycle, find where your exponent lands, read off the answer.",
      "keyFacts": [
        "a^k mod n = (a mod n)^k mod n — reduce base first",
        "Powers of 2 mod 5 cycle: 2,4,3,1 (length 4)",
        "Powers of 3 mod 5 cycle: 3,4,2,1 (length 4)",
        "Powers of 7 mod 5: same as powers of 2 mod 5 (7≡2 mod 5)",
        "Exponent position in cycle = exponent mod cycle_length; if result = 0, use last position",
        "GMAT cycles mod 5 or 10 are almost always length 1,2, or 4"
      ],
      "example": {
        "problem": "What is the remainder when 7^100 is divided by 5?",
        "steps": [
          "Reduce base: 7 mod 5 = 2, so 7^100 ≡ 2^100 (mod 5)",
          "List cycle: 2^1=2, 2^2=4, 2^3=3, 2^4=1, 2^5=2 … cycle length = 4",
          "Find position: 100 mod 4 = 0 → use position 4 (last in cycle)",
          "2^4 mod 5 = 16 mod 5 = 1",
          "Remainder = 1"
        ],
        "answer": "1"
      },
      "traps": [
        "Computing 7^100 directly — never do this",
        "Using 7 mod 5 = 2 but forgetting to apply the cycle (guessing remainder = 2)",
        "When exponent mod cycle = 0, using position 0 instead of the LAST position in cycle",
        "Confusing cycle mod 5 with cycle mod 10 (units-digit problems)"
      ],
      "solveSteps": [
        "1. Reduce base: compute base mod divisor",
        "2. List powers of reduced base mod divisor until cycle repeats",
        "3. Note cycle length L",
        "4. Compute exponent mod L; if 0 → use last element of cycle",
        "5. That element is the remainder"
      ]
    }
  },
  "439": {
    "hint": "Only units digit of n determines units digit of n². Map all 10 digits (0–9) → squared units digit. Which one never produces 6?",
    "theory": {
      "title": "Units Digit of Perfect Squares",
      "icon": "🔢",
      "summary": "Units digit of n² depends ONLY on units digit of n — a fixed 10-entry lookup. Only {0,1,4,5,6,9} can ever appear as units digits of any perfect square.",
      "keyFacts": [
        "Squaring cycles (units digit in → units digit out): 0→0, 1→1, 2→4, 3→9, 4→6, 5→5, 6→6, 7→9, 8→4, 9→1",
        "Possible units digits of perfect squares: {0,1,4,5,6,9} — only 6 values",
        "For n²to end in 6: n must end in 4 or 6 — exactly two possibilities",
        "Multi-digit n: ONLY its units digit matters. 14 and 4 behave identically",
        "5 always maps to 5: 5²=25, 15²=225, 105²=11025 — never 6"
      ],
      "example": {
        "problem": "Units digit of n² is 6. Could n end in 5?",
        "steps": [
          "Any n ending in 5: units digit 5",
          "5²=25 → units digit 5",
          "15²=225 → units digit 5",
          "Pattern: (…5)² always ends in 5, never 6",
          "So n ending in 5 is impossible"
        ],
        "answer": "No — n ending in 5 always yields n² ending in 5"
      },
      "traps": [
        "Treating 14 and 16 as different cases from 4 and 6 — only units digit matters",
        "Assuming any digit could appear as a square's units digit — only 0,1,4,5,6,9 can",
        "Confusing 'units digit of n' with 'units digit of n²'"
      ],
      "solveSteps": [
        "1. Build the 10-entry map: square each digit 0–9, record units digit of result",
        "2. For n²ending in 6: find which inputs map to 6 → {4, 6}",
        "3. For each answer choice: extract units digit only (14→4, 16→6)",
        "4. Check if that units digit is in the allowed set {4,6}",
        "5. The one NOT in the set → that is the answer"
      ]
    }
  },
  "440": {
    "hint": "Order doesn't matter — choosing a group, not arranging. Use C(n,r) = n! / (r!(n-r)!). Watch for n·(n-1)·(n-2) shortcut.",
    "theory": {
      "title": "Combinations — Choosing Without Order",
      "icon": "📚",
      "summary": "Combinations count ways to select a group when order is irrelevant. C(n,r) = n! / (r!(n-r)!) removes all orderings by dividing by r!.",
      "keyFacts": [
        "C(n,r) = n! / (r! · (n−r)!)",
        "Shortcut for small r: multiply r terms from n down, divide by r! — e.g. C(8,3) = (8·7·6)/(3·2·1)",
        "Permutations P(n,r) = n!/(n−r)! — use when ORDER matters",
        "C(n,r) = C(n, n−r) — choosing 3 from 8 same as choosing 5 from 8",
        "Combinations always ≤ Permutations: P = C · r!"
      ],
      "example": {
        "problem": "Choose 3 books from 8 distinct books — how many groups?",
        "steps": [
          "Order irrelevant (a group, not a sequence) → use C(8,3)",
          "Numerator: 8 · 7 · 6 = 336",
          "Denominator: 3! = 6",
          "C(8,3) = 336 / 6 = 56"
        ],
        "answer": "56"
      },
      "traps": [
        "336 = P(8,3) — forgetting to divide by r! is most common error",
        "120 = C(10,3) or P(5,3) — wrong n or wrong formula",
        "24 = 4! — accidental factorial of wrong number",
        "Divide by r! only once — not (n−r)! again separately"
      ],
      "solveSteps": [
        "1. Ask: does order matter? If selecting a group/team/subset → Combinations",
        "2. Write C(n,r) = n!/(r!(n−r)!)",
        "3. Use shortcut: multiply r descending terms from n, divide by r!",
        "4. Cancel before multiplying to keep numbers small",
        "5. Check: answer should be between 1 and n — sanity check against trap answers"
      ]
    }
  },
  "441": {
    "hint": "Repeated letters shrink the count — divide 4! by the factorial of each repeated letter's frequency. Count duplicates before computing.",
    "theory": {
      "title": "Permutations with Repeated Elements",
      "icon": "🔤",
      "summary": "When letters repeat, swapping identical copies produces no new arrangement. Divide n! by k! for each group of k identical elements.",
      "keyFacts": [
        "Distinct arrangements of n items = n! / (k1! × k2! × …) for repeated groups",
        "All unique letters: just n!",
        "One letter repeated k times: n! / k!",
        "Two different letters repeated: n! / (k1! × k2!)",
        "Result always ≤ n! — repeats only reduce count",
        "Check every letter's frequency before computing"
      ],
      "example": {
        "problem": "How many distinct 4-letter arrangements of BOOK?",
        "steps": [
          "Count letters: B×1, O×2, K×1 — total 4",
          "Apply formula: 4! / 2! (O repeats twice)",
          "4! = 24, 2! = 2",
          "24 / 2 = 12"
        ],
        "answer": "12"
      },
      "traps": [
        "Using 4! = 24 without dividing for the repeated O",
        "Dividing by 2 twice (treating each O separately) — divide by 2! once per repeated group",
        "Forgetting to check all letters — only O repeats here, not B or K",
        "Confusing with combinations — order matters in arrangements/permutations"
      ],
      "solveSteps": [
        "1. List all letters and their frequencies",
        "2. Write formula: n! / (k1! × k2! × …)",
        "3. Plug in: n = total letters, each ki = count of each repeated letter",
        "4. Compute numerator and denominator separately, then divide",
        "5. Sanity check: result < n! if any repeats exist"
      ]
    }
  },
  "442": {
    "hint": "Glue the pair into one block → count arrangements of 4 units, then multiply by internal orders of the block.",
    "theory": {
      "title": "Permutations — Glue (Block) Method",
      "icon": "🔗",
      "summary": "When two items must stay adjacent, treat them as one block. Arrange the blocks, then multiply by the internal arrangements of the glued pair.",
      "keyFacts": [
        "n items in a row: n! arrangements total",
        "Glue k adjacent items → treat as 1 block → (n−k+1)! × k! total",
        "For 2 glued people in n total: (n−1)! × 2",
        "Block internal order matters unless items are identical",
        "Without restriction, 5 people = 5! = 120 ways"
      ],
      "example": {
        "problem": "5 people in a row; 2 specific people must sit together. How many arrangements?",
        "steps": [
          "Glue the 2 people → 1 block + 3 others = 4 units",
          "Arrange 4 units: 4! = 24",
          "The glued pair can swap internally: × 2",
          "Total: 24 × 2 = 48"
        ],
        "answer": "48"
      },
      "traps": [
        "Forgetting internal order of the block → gets 24 instead of 48",
        "Using 5! = 120 — no restriction applied",
        "Dividing instead of multiplying for internal arrangements",
        "Gluing 3+ people: block gives (n−2)! × 3! for 3-person block"
      ],
      "solveSteps": [
        "1. Count glued items k; replace with 1 block → (n−k+1) units",
        "2. Arrange units: (n−k+1)!",
        "3. Multiply by internal arrangements of block: k!",
        "4. Final = (n−k+1)! × k!",
        "5. Sanity: result < n! (restriction reduces count)"
      ]
    }
  },
  "443": {
    "hint": "Count ways to arrange exactly 2 heads in 4 flips using combinations, then divide by total outcomes (2⁴).",
    "theory": {
      "title": "Binomial Probability — Exactly k Successes",
      "icon": "🎲",
      "summary": "When each trial is independent with probability p, use the binomial formula: C(n,k)·pᵏ·(1−p)^(n−k). The combination counts arrangements; the powers give the probability of each arrangement.",
      "keyFacts": [
        "P(exactly k heads in n flips) = C(n,k) · (1/2)ⁿ",
        "C(n,k) = n! / (k!(n−k)!) — counts distinct orderings",
        "Total outcomes for n fair coin flips = 2ⁿ",
        "Each specific sequence (e.g. HHTT) has probability (1/2)ⁿ",
        "Multiply C(n,k) by (1/2)ⁿ — don't double-count arrangements",
        "Sum of all binomial probabilities for fixed n = 1 (sanity check)"
      ],
      "example": {
        "problem": "Fair coin flipped 4 times. What is P(exactly 2 heads)?",
        "steps": [
          "Total outcomes = 2⁴ = 16",
          "Favorable: sequences with exactly 2 H — C(4,2) = 4!/(2!2!) = 6",
          "List to verify: HHTT, HTHT, HTTH, THHT, THTH, TTHH — yes, 6",
          "P = 6/16 = 3/8"
        ],
        "answer": "3/8"
      },
      "traps": [
        "Forgetting C(n,k) — assuming only 1 arrangement exists for 2 heads",
        "Dividing by 4! instead of 2ⁿ — confusing permutation total with outcome total",
        "Using 1/2 as answer (that's P(any single flip = H), not 2 heads in 4)",
        "Calculating P(at least 2 heads) instead of P(exactly 2 heads)"
      ],
      "solveSteps": [
        "1. Identify n (trials), k (target successes), p (success prob per trial)",
        "2. Compute total outcomes = 2ⁿ (for fair coin)",
        "3. Count favorable arrangements = C(n,k)",
        "4. P = C(n,k) / 2ⁿ  OR  C(n,k)·pᵏ·(1−p)^(n−k) for unfair coin",
        "5. Simplify fraction and sanity-check: result must be between 0 and 1"
      ]
    }
  },
  "444": {
    "hint": "Count all (die1, die2) pairs that sum to 7. Total sample space = 36. Pairs: systematic list beats guessing.",
    "theory": {
      "title": "Dice Probability — Counting Favorable Outcomes",
      "icon": "🎲",
      "summary": "Probability = favorable outcomes / total outcomes. Two dice → 36 equally-likely ordered pairs. Key: pairs are ordered, so (1,6) ≠ (6,1).",
      "keyFacts": [
        "Two dice: total outcomes = 6×6 = 36, all equally likely",
        "Each pair is ORDERED — (2,5) and (5,2) are distinct",
        "P(event) = count of favorable ordered pairs / 36",
        "Sums range from 2 to 12; sum=7 has the most combos (6)",
        "Symmetry: sum=7 is the peak — each number 1–6 on die1 pairs with exactly one die2 value"
      ],
      "example": {
        "problem": "Two fair dice rolled. How many ordered pairs give sum = 7?",
        "steps": [
          "List pairs: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)",
          "Count = 6",
          "P = 6/36 = 1/6"
        ],
        "answer": "1/6"
      },
      "traps": [
        "Treating (2,5) and (5,2) as the same pair — they're not; order matters",
        "Using 21 unordered pairs as denominator — wrong; all 36 ordered pairs are equally likely",
        "Confusing sum=7 with sum=6 or sum=8 (each has 5 pairs, not 6)",
        "Memorizing '6 pairs' without knowing WHY — if asked for sum=8, re-count"
      ],
      "solveSteps": [
        "1. Establish sample space: 6×6 = 36 ordered pairs",
        "2. List favorable pairs systematically: fix die1 = 1…6, solve die2 = target − die1",
        "3. Check die2 is in range 1–6 for each",
        "4. Count valid pairs, divide by 36",
        "5. Simplify fraction"
      ]
    }
  },
  "445": {
    "hint": "Without replacement → denominator shrinks each draw. Multiply conditional probabilities: P(1st red) × P(2nd red | 1st was red).",
    "theory": {
      "title": "Probability Without Replacement — Conditional Chain",
      "icon": "🎲",
      "summary": "Each draw changes the pool. The second probability is conditional on the first outcome, so denominator drops by 1 after every draw.",
      "keyFacts": [
        "P(A then B, no replacement) = P(A) × P(B|A)",
        "After drawing 1 red: pool shrinks from n to n−1, red count shrinks from r to r−1",
        "Combination shortcut: P(k successes from r type) = C(r,k) / C(n,k)",
        "With replacement: denominator stays fixed, events independent",
        "Without replacement: denominator AND success count both fall each draw",
        "C(4,2)/C(10,2) = 6/45 = 2/15 — same answer, cleaner algebra for bigger draws"
      ],
      "example": {
        "problem": "Bag: 4 red, 6 blue. Draw 2 without replacement. P(both red)?",
        "steps": [
          "P(1st red) = 4/10",
          "Given 1st was red, pool = 9 remaining, 3 red → P(2nd red) = 3/9",
          "Multiply: (4/10) × (3/9) = 12/90 = 2/15",
          "Combo check: C(4,2)/C(10,2) = 6/45 = 2/15 ✓"
        ],
        "answer": "2/15"
      },
      "traps": [
        "Using 4/10 × 4/10 — treats draws as independent (with replacement error)",
        "Using 4/10 × 3/10 — correct numerator chain but wrong denominator on 2nd draw",
        "Forgetting to reduce red count after 1st draw (using 4/9 instead of 3/9)",
        "Confusing C(4,2)=6 with P(4,2)=12 in the combination shortcut"
      ],
      "solveSteps": [
        "1. Confirm: with or without replacement?",
        "2. Without → set up conditional chain: P(1st) × P(2nd | 1st)",
        "3. Numerator: favorable count drops by 1 each successful draw",
        "4. Denominator: total pool drops by 1 each draw regardless",
        "5. Simplify fraction; or use C(successes,k)/C(total,k) as cross-check"
      ]
    }
  },
  "446": {
    "hint": "Count complement: total committees minus all-male committees. 'At least 1' = total − none.",
    "theory": {
      "title": "At Least One — Complement Counting",
      "icon": "🔢",
      "summary": "'At least 1 of X' = total combinations − combinations with zero X. Complement is almost always faster than direct counting.",
      "keyFacts": [
        "C(n,r) = n! / (r! × (n−r)!)",
        "'At least 1 woman' = Total − 'all men'",
        "Direct method: C(4,1)·C(5,2) + C(4,2)·C(5,1) + C(4,3)·C(5,0) — more steps, same answer",
        "Complement method: C(9,3) − C(5,3) — one subtraction",
        "Always verify: complement method answer must be < total"
      ],
      "example": {
        "problem": "Choose 3 from 5 men and 4 women. How many committees have at least 1 woman?",
        "steps": [
          "Total ways: C(9,3) = 84",
          "All-male ways: C(5,3) = 10",
          "At least 1 woman = 84 − 10 = 74"
        ],
        "answer": "74"
      },
      "traps": [
        "Adding all cases directly: easy to miss a combination (1W+2M, 2W+1M, 3W+0M)",
        "Using C(4,1) alone — ignores how many men fill remaining seats",
        "Forgetting complement = total − unwanted, not total − wanted",
        "C(9,3) = 84, not 9×8×7 = 504 (that's permutations)"
      ],
      "solveSteps": [
        "1. Spot 'at least 1' → plan complement",
        "2. Compute total: C(total people, committee size)",
        "3. Compute excluded case: C(non-target group, committee size)",
        "4. Subtract: total − excluded",
        "5. Check answer is between 0 and total"
      ]
    }
  },
  "447": {
    "hint": "Isolate one variable, then find which values make the other a positive integer. Use mod arithmetic to find the pattern — solutions repeat every fixed step.",
    "theory": {
      "title": "Linear Diophantine — Counting Positive Integer Solutions",
      "icon": "🔢",
      "summary": "When ax + by = n, integer solutions don't exist for every x — only specific residues work. Find the pattern mod b, then list valid positives.",
      "keyFacts": [
        "Isolate y = (n − ax)/b; need numerator divisible by b",
        "Divisibility condition: ax ≡ n (mod b) → find x mod b",
        "Solutions repeat every b/gcd(a,b) steps in x",
        "All variables must be strictly positive (x ≥ 1, y ≥ 1) — kills upper range",
        "Count by listing: start from smallest valid x, step by b until y < 1"
      ],
      "example": {
        "problem": "3x + 5y = 47, x and y positive integers. How many ordered pairs?",
        "steps": [
          "Isolate: y = (47 − 3x)/5 — need 47 − 3x divisible by 5",
          "Mod condition: 3x ≡ 47 ≡ 2 (mod 5)",
          "Multiply both sides by 2 (inverse of 3 mod 5): x ≡ 4 (mod 5)",
          "Valid x: 4, 9, 14 (next: x=19 → y=(47−57)/5 < 0, stop)",
          "Pairs: (4,7), (9,4), (14,1)"
        ],
        "answer": "3 pairs"
      },
      "traps": [
        "Forgetting y must also be a positive integer — not just x",
        "Using y ≥ 0 instead of y ≥ 1 (adds one phantom solution)",
        "Skipping mod arithmetic and trying every integer from 1 to 47/3 — wastes time",
        "Missing that step size = denominator (5), not 1"
      ],
      "solveSteps": [
        "1. Isolate the variable with larger coefficient: y = (47−3x)/5",
        "2. Set numerator ≡ 0 (mod 5): find x mod 5 via modular inverse",
        "3. List smallest valid x (≥1), then add 5 each time",
        "4. Stop when y drops below 1",
        "5. Count remaining pairs"
      ]
    }
  },
  "448": {
    "hint": "Count div-by-3 PLUS div-by-4, then SUBTRACT the overlap (div-by-12). Forgetting the overlap is the classic trap.",
    "theory": {
      "title": "Inclusion-Exclusion — Counting Divisibles",
      "icon": "∪",
      "summary": "When counting integers divisible by A or B, you double-count those divisible by both. Subtract the overlap: |A∪B| = |A| + |B| − |A∩B|.",
      "keyFacts": [
        "Count divisibles of n up to N: floor(N/n)",
        "'Divisible by 3 AND 4' = divisible by lcm(3,4) = 12",
        "Inclusion-exclusion: |A∪B| = |A| + |B| − |A∩B|",
        "floor(100/3)=33, floor(100/4)=25, floor(100/12)=8",
        "lcm(a,b) = a×b / gcd(a,b) — use when primes aren't obvious"
      ],
      "example": {
        "problem": "How many integers from 1 to 100 are divisible by 3 or 4?",
        "steps": [
          "Div by 3: floor(100/3) = 33",
          "Div by 4: floor(100/4) = 25",
          "Div by BOTH (lcm=12): floor(100/12) = 8",
          "|A∪B| = 33 + 25 − 8 = 50"
        ],
        "answer": "50"
      },
      "traps": [
        "Adding 33+25=58 without subtracting overlap — counts multiples of 12 twice",
        "Using 12 as overlap without verifying lcm(3,4)=12 (works here because gcd=1)",
        "Forgetting floor — 100/3 = 33.33, round DOWN",
        "Confusing 'or' (union) with 'and' (intersection)"
      ],
      "solveSteps": [
        "1. Find |A| = floor(N / a) and |B| = floor(N / b)",
        "2. Find overlap: lcm(a,b), then |A∩B| = floor(N / lcm(a,b))",
        "3. Apply inclusion-exclusion: |A∪B| = |A| + |B| − |A∩B|",
        "4. Always floor — partial multiples don't count",
        "5. Sanity: answer must be less than |A|+|B|"
      ]
    }
  },
  "449": {
    "hint": "Factor out the smaller factorial first. Then identify what primes the resulting product can possibly contain — no new primes sneak in.",
    "theory": {
      "title": "Factorial Factoring — Greatest Prime Factor",
      "icon": "∏",
      "summary": "n! contains every prime ≤ n as a factor. Factor sums of factorials by pulling out the smaller one, then check whether the leftover multiplier introduces any prime larger than what n! already covers.",
      "keyFacts": [
        "n! = 1·2·3·…·n, so every prime p ≤ n divides n!",
        "Greatest prime factor of n! = largest prime ≤ n",
        "Factor a! + b! (b > a) → a!(1 + b·(b−1)·…·(a+1)) — pull out a!",
        "Leftover factor may introduce NEW primes if it has prime divisors > a",
        "15 = 3·5 — no new prime. 17 = 17 — would be a new prime",
        "Scan choices from largest down; first one dividing the full product wins"
      ],
      "example": {
        "problem": "What is the greatest prime factor of 13! + 14!?",
        "steps": [
          "Factor: 13! + 14! = 13!(1 + 14) = 13! · 15",
          "15 = 3 · 5",
          "Prime factors of 13!: all primes ≤ 13 → {2,3,5,7,11,13}",
          "15 adds only 3 and 5 — both already present",
          "Greatest prime in the full product = 13"
        ],
        "answer": "13"
      },
      "traps": [
        "Adding factorials ≠ multiplying — you cannot just take primes from each separately without factoring",
        "Assuming 14 or 15 introduces a new largest prime (15 = 3·5, not a new prime)",
        "Forgetting to check if the leftover after factoring has a prime > n",
        "Picking 17 or 19 because they 'feel bigger' — neither divides the product"
      ],
      "solveSteps": [
        "1. Factor: pull out smaller factorial — a! + b! = a!(1 + remaining)",
        "2. Simplify the (1 + remaining) term to a plain integer",
        "3. Prime-factorize that integer",
        "4. List primes in n! — all primes ≤ n",
        "5. Greatest prime factor = max across both sets"
      ]
    }
  },
  "450": {
    "hint": "Two terms given → find common difference d first, then step back to a₁. Count gaps carefully — 4th to 10th is 6 steps, not 7.",
    "theory": {
      "title": "Arithmetic Sequences — Back-Solving for a₁",
      "icon": "🔢",
      "summary": "Arithmetic sequences add a fixed common difference d each step. Any two terms let you find d; then walk backward or forward to any target term.",
      "keyFacts": [
        "General term: aₙ = a₁ + (n−1)d",
        "Common difference: d = (aₘ − aₙ) / (m − n) for any two terms m, n",
        "Gap count between term m and term n = |m − n|, NOT |m − n| + 1",
        "Back-solve: a₁ = aₙ − (n−1)d",
        "Forward-solve: aₙ = a₁ + (n−1)d"
      ],
      "example": {
        "problem": "In an arithmetic sequence, 4th term = 17, 10th term = 41. Find the 1st term.",
        "steps": [
          "Gap from term 4 to term 10 = 10 − 4 = 6 steps",
          "d = (41 − 17) / 6 = 24 / 6 = 4",
          "a₁ = a₄ − (4−1)d = 17 − 3×4 = 17 − 12 = 5"
        ],
        "answer": "5"
      },
      "traps": [
        "Counting gap as 7 (10−4+1) instead of 6 → wrong d = 24/7",
        "Using aₙ = a₁ + n·d instead of a₁ + (n−1)d → off by one",
        "Stepping forward from a₄ instead of backward to a₁"
      ],
      "solveSteps": [
        "1. Find gap count: m − n (not m − n + 1)",
        "2. Compute d = (aₘ − aₙ) / (m − n)",
        "3. Use aₙ = a₁ + (n−1)d, solve for a₁",
        "4. Verify: plug a₁ and d back into both given terms"
      ]
    }
  },
  "451": {
    "hint": "Two known terms → divide to eliminate first term, isolate r raised to a power. No need to find the first term.",
    "theory": {
      "title": "Geometric Sequences — Finding the Common Ratio",
      "icon": "∿",
      "summary": "In a geometric sequence each term = previous × r. Knowing any two terms lets you isolate r by dividing — the first term cancels out.",
      "keyFacts": [
        "nth term: aₙ = a₁ · r^(n−1)",
        "Ratio between two terms: aₘ/aₙ = r^(m−n)",
        "To find r: divide the later term by the earlier term, then take the appropriate root",
        "r^k = (later term)/(earlier term) where k = difference in positions",
        "If r^k = x, then r = x^(1/k) — look for perfect cubes, squares, etc.",
        "Negative r is possible — check if signs alternate in the sequence"
      ],
      "example": {
        "problem": "2nd term of a geometric sequence is 6, 5th term is 162. Find r.",
        "steps": [
          "a₅/a₂ = r^(5−2) = r³",
          "r³ = 162/6 = 27",
          "r = ∛27 = 3",
          "Verify: 6, 18, 54, 162 ✓"
        ],
        "answer": "r = 3"
      },
      "traps": [
        "Dividing positions (5/2) instead of subtracting them — exponent is m−n, not m/n",
        "Forgetting to take the root — r³ = 27 means r = 3, not 27",
        "Arithmetic mean shortcut (sum/count) belongs to arithmetic sequences, not geometric",
        "Picking r = 27 or r = 6 without rooting the ratio"
      ],
      "solveSteps": [
        "1. Identify the two known term positions (m and n)",
        "2. Compute ratio: aₘ/aₙ = r^(m−n)",
        "3. Solve for r by taking the (m−n)th root",
        "4. Verify by stepping through the sequence from the known term"
      ]
    }
  },
  "452": {
    "hint": "Square (x + 1/x) to reach x² + 1/x². Remember squaring adds a middle term — account for it.",
    "theory": {
      "title": "Reciprocal Expressions — Square the Sum",
      "icon": "🔁",
      "summary": "When x + 1/x = k, square both sides to get x² + 1/x² = k² − 2. The cross-term 2·x·(1/x) = 2 always cancels cleanly.",
      "keyFacts": [
        "(x + 1/x)² = x² + 2 + 1/x²  →  x² + 1/x² = (x + 1/x)² − 2",
        "(x − 1/x)² = x² − 2 + 1/x²  →  x² + 1/x² = (x − 1/x)² + 2",
        "x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x)",
        "Middle term 2·x·(1/x) = 2 always, regardless of x",
        "Never need to solve for x itself — the expression collapses algebraically"
      ],
      "example": {
        "problem": "If x + 1/x = 4, find x² + 1/x².",
        "steps": [
          "Square both sides: (x + 1/x)² = 4² = 16",
          "Expand left side: x² + 2(x)(1/x) + 1/x² = 16",
          "Simplify middle: x² + 2 + 1/x² = 16",
          "Subtract 2: x² + 1/x² = 14"
        ],
        "answer": "14"
      },
      "traps": [
        "Squaring (x + 1/x) ≠ x² + 1/x² — middle term +2 is dropped",
        "Trying to solve for x directly — messy quadratic, unnecessary",
        "Confusing with (x − 1/x)² formula — sign on middle term flips to −2",
        "Picking 16 (= k²) without subtracting the middle term 2"
      ],
      "solveSteps": [
        "1. Identify the given sum: x + 1/x = k",
        "2. Square both sides: (x + 1/x)² = k²",
        "3. Expand: x² + 2 + 1/x² = k²",
        "4. Subtract 2: x² + 1/x² = k² − 2",
        "5. Plug in k = 4: 16 − 2 = 14"
      ]
    }
  },
  "453": {
    "hint": "Recall the dedicated equilateral-triangle area formula — avoid splitting into two 30-60-90 triangles unless you forget it.",
    "theory": {
      "title": "Equilateral Triangle Area",
      "icon": "△",
      "summary": "Any equilateral triangle with side s has area (√3/4)s². Derived from the 30-60-90 height, but memorize the formula directly for speed.",
      "keyFacts": [
        "Area = (√3/4)s²",
        "Height of equilateral triangle = (√3/2)s",
        "All angles = 60°; height bisects base into s/2 each side",
        "Height derived from Pythagorean: s² = (s/2)² + h²  →  h = (√3/2)s",
        "Area = ½ × base × height = ½ · s · (√3/2)s = (√3/4)s²",
        "Perimeter = 3s; all three 30-60-90 sub-triangles are congruent"
      ],
      "example": {
        "problem": "Equilateral triangle has side 6. Find its area.",
        "steps": [
          "Formula: A = (√3/4)s²",
          "s = 6, so s² = 36",
          "A = (√3/4) · 36",
          "A = 9√3"
        ],
        "answer": "9√3"
      },
      "traps": [
        "Using s² directly without the √3/4 factor — gives 9, not 9√3",
        "Forgetting height = (√3/2)s and using s as the height instead",
        "Mixing up formula with right-triangle area or isoceles shortcuts",
        "Computing 6² = 36 then halving to 18 without the √3 factor"
      ],
      "solveSteps": [
        "1. Confirm triangle is equilateral — all sides equal",
        "2. Apply A = (√3/4)s²",
        "3. Square the side length",
        "4. Multiply by √3/4 and simplify",
        "5. Check answer lies between s² /4 and s² /2 as rough sanity"
      ]
    }
  },
  "454": {
    "hint": "Find side length from surface area formula, then cube it. Surface area of cube splits evenly across 6 identical faces.",
    "theory": {
      "title": "Cube — Surface Area to Volume",
      "icon": "🎲",
      "summary": "A cube's 6 faces are identical squares. Find side length from surface area, then volume = s³.",
      "keyFacts": [
        "Surface area = 6s²",
        "Volume = s³",
        "From SA: s = √(SA/6)",
        "SA and V share same s — one equation chains to the other",
        "Units: SA in square units, V in cubic units — don't mix"
      ],
      "example": {
        "problem": "Cube has surface area 96. Find its volume.",
        "steps": [
          "SA = 6s² = 96",
          "s² = 16",
          "s = 4",
          "V = 4³ = 64"
        ],
        "answer": "64"
      },
      "traps": [
        "Forgetting the 6 faces — using s² = 96 gives s ≈ 9.8, wrong",
        "Taking √96 directly instead of √(96/6)",
        "Confusing SA formula with volume (s³ not 6s³)",
        "Answer 96 is a trap — same as given SA, not volume"
      ],
      "solveSteps": [
        "1. Write SA formula: 6s² = given SA",
        "2. Solve for s²  then s",
        "3. Compute V = s³",
        "4. Sanity: V < SA only holds for small s — verify units make sense"
      ]
    }
  },
  "455": {
    "hint": "Find the diagonal of the square — it equals the circle's diameter. Use d = s√2, then r = d/2, then A = πr².",
    "theory": {
      "title": "Square Inscribed in Circle — Diagonal = Diameter",
      "icon": "⬜",
      "summary": "When a square is inscribed in a circle, all four corners touch the circle. The circle's diameter equals the square's diagonal, linking side length directly to radius.",
      "keyFacts": [
        "Square diagonal = s√2 (Pythagorean theorem on half the square)",
        "Inscribed square → diagonal = diameter → r = s√2 / 2",
        "Circle area = πr² = π(s√2/2)² = πs²/2",
        "For side s=10: r = 5√2, A = π(50) = 50π",
        "Diagonal divides square into two 45-45-90 triangles: sides s, s, s√2",
        "Circumscribed circle always has r > s (radius > half the side)"
      ],
      "example": {
        "problem": "Square with side 10 is inscribed in a circle. What is the circle's area?",
        "steps": [
          "Diagonal of square = 10√2 (45-45-90 triangle)",
          "Diameter = diagonal = 10√2",
          "Radius = 5√2",
          "Area = π(5√2)² = π·50 = 50π"
        ],
        "answer": "50π"
      },
      "traps": [
        "Using r = s/2 = 5 → area 25π — wrong; radius equals HALF the DIAGONAL, not half the side",
        "Using r = s = 10 → area 100π — confusing side with radius",
        "Forgetting the √2 factor in the diagonal formula",
        "Confusing inscribed (square inside circle) with circumscribed (circle inside square)"
      ],
      "solveSteps": [
        "1. Inscribed square → all vertices on circle → diagonal = diameter",
        "2. Compute diagonal: d = s√2",
        "3. Find radius: r = d/2 = s√2/2",
        "4. Area = πr² = π(s²/2)",
        "5. Plug in s=10 → A = 50π"
      ]
    }
  },
  "456": {
    "hint": "Set up: acid IN = acid OUT. Concentration × volume for each component. Alligation shortcut: ratio of volumes = swap of concentration gaps.",
    "theory": {
      "title": "Mixture Problems — Weighted Concentration",
      "icon": "🧪",
      "summary": "Acid doesn't disappear when solutions mix — total acid before equals total acid after. Build one equation: C₁V₁ + C₂V₂ = Cf(V₁+V₂).",
      "keyFacts": [
        "Core equation: C₁·V₁ + C₂·V₂ = Cf·(V₁+V₂)",
        "Alligation shortcut: V₁/V₂ = (C₂−Cf)/(Cf−C₁)  [swap the gaps]",
        "Final concentration always lies strictly between C₁ and C₂",
        "Closer to Cf means more volume of that component is needed",
        "Percentages stay as decimals or raw numbers — just stay consistent",
        "If asked for ratio not exact volume, alligation is faster than algebra"
      ],
      "example": {
        "problem": "Add x liters of 60% acid to 8 L of 20% acid to yield 50% solution. Find x.",
        "steps": [
          "Acid equation: 0.60x + 0.20(8) = 0.50(x + 8)",
          "Expand: 0.6x + 1.6 = 0.5x + 4",
          "Solve: 0.1x = 2.4 → x = 24",
          "Alligation check: ratio 20%:60% = (60−50):(50−20) = 10:30 = 1:3 → need 3×8 = 24 ✓"
        ],
        "answer": "24 liters of 60% solution"
      },
      "traps": [
        "Forgetting total volume on right side: writing 0.50·8 instead of 0.50(x+8)",
        "Alligation ratio flip: V_low/V_high = (C_high−Cf)/(Cf−C_low), NOT the same-side gap",
        "Expecting answer near 8 — target 50% is close to 60%, so much more of 60% needed",
        "Picking answer 32 if you solve 0.1x = 3.2 from a sign error in expanding"
      ],
      "solveSteps": [
        "1. Label: C₁, V₁ (known), C₂, V₂=x (unknown), Cf (target)",
        "2. Write: C₁·V₁ + C₂·x = Cf·(V₁+x)",
        "3. Expand, collect x terms, solve",
        "4. Alligation sanity: ratio = opposite gaps. Answer must be closer to higher concentration side if Cf > midpoint",
        "5. Verify: plug x back — acid in = acid out"
      ]
    }
  },
  "457": {
    "hint": "Two objects closing gap → add speeds. Time = gap ÷ combined speed. Watch for mph vs minutes unit traps.",
    "theory": {
      "title": "Closing Distance — Combined Rates",
      "icon": "🚂",
      "summary": "When two objects move toward each other, they close the gap at the sum of their speeds. Divide total gap by combined speed for meeting time.",
      "keyFacts": [
        "Time to meet = total distance ÷ (speed₁ + speed₂)",
        "Moving toward each other: rates ADD",
        "Moving same direction: rates SUBTRACT (faster minus slower)",
        "Moving apart: rates ADD (gap grows)",
        "Formula: d = r·t applies to each train separately too",
        "Each train covers its own portion: d₁ = 50t, d₂ = 70t, d₁+d₂ = 300"
      ],
      "example": {
        "problem": "Two trains 300 mi apart approach each other at 50 mph and 70 mph. When do they meet?",
        "steps": [
          "Combined closing speed = 50 + 70 = 120 mph",
          "They must close 300 miles total",
          "t = 300 ÷ 120 = 2.5 hr",
          "Check: train 1 covers 50×2.5=125 mi, train 2 covers 70×2.5=175 mi, 125+175=300 ✓"
        ],
        "answer": "2.5 hr"
      },
      "traps": [
        "Using only one train's speed for the full 300 miles",
        "Averaging speeds: (50+70)/2 = 60 → wrong, that's same-direction logic",
        "Forgetting to verify both distances sum to total gap",
        "Unit mismatch: if speeds given in mph but question asks minutes, multiply by 60"
      ],
      "solveSteps": [
        "1. Identify direction: toward each other → add speeds",
        "2. Combined rate = 50 + 70 = 120 mph",
        "3. Time = total gap ÷ combined rate = 300/120",
        "4. Simplify: 300/120 = 5/2 = 2.5 hr",
        "5. Verify: each train's distance sums to 300"
      ]
    }
  },
  "458": {
    "hint": "Compute each deviation from mean, square them, average the squares, then take square root. Watch for √8 vs 2√2 — same value, different forms.",
    "theory": {
      "title": "Standard Deviation — From Scratch",
      "icon": "σ",
      "summary": "SD measures average distance of data points from the mean. Compute via squared deviations to avoid sign cancellation, then root the average.",
      "keyFacts": [
        "SD = √(Σ(xᵢ − μ)² / n)  for a population",
        "Step 1: find mean μ",
        "Step 2: subtract μ from each value, square each result",
        "Step 3: average those squares → variance σ²",
        "Step 4: √(variance) = SD",
        "√8 = √(4·2) = 2√2 — always simplify nested radicals"
      ],
      "example": {
        "problem": "Set {2, 4, 6, 8, 10}, mean = 6. Find SD.",
        "steps": [
          "Deviations: 2−6=−4, 4−6=−2, 6−6=0, 8−6=2, 10−6=4",
          "Square each: 16, 4, 0, 4, 16",
          "Sum = 40; variance = 40/5 = 8",
          "SD = √8 = 2√2"
        ],
        "answer": "2√2"
      },
      "traps": [
        "Averaging the raw deviations (they sum to 0 — useless)",
        "Forgetting to take the square root at the end (that's variance, not SD)",
        "Leaving √8 unsimplified and not matching 2√2 in answer choices",
        "Using n−1 (sample SD) instead of n (population SD) on GMAT unless told 'sample'"
      ],
      "solveSteps": [
        "1. Compute mean μ = Σx / n",
        "2. Find each (xᵢ − μ) and square it",
        "3. Average the squared deviations → variance",
        "4. Take √(variance) → SD",
        "5. Simplify radical: √8 = 2√2"
      ]
    }
  },
  "459": {
    "hint": "Count kings + hearts but subtract the overlap (king of hearts) — drawing 'or' means inclusion-exclusion, not simple addition.",
    "theory": {
      "title": "Probability — Inclusion-Exclusion (P(A or B))",
      "icon": "🃏",
      "summary": "P(A or B) = P(A) + P(B) − P(A and B). Forgetting to subtract the overlap double-counts cards belonging to BOTH groups.",
      "keyFacts": [
        "P(A or B) = P(A) + P(B) − P(A ∩ B)  — always",
        "Overlap = cards (or outcomes) satisfying BOTH conditions simultaneously",
        "If A and B are mutually exclusive, P(A ∩ B) = 0 → just add",
        "Standard deck: 52 cards, 4 suits × 13 ranks, 1 card per rank-suit pair",
        "King of hearts is counted in kings AND in hearts → subtract once",
        "Final fraction: reduce by GCD to match answer choices"
      ],
      "example": {
        "problem": "From 52 cards, what is P(king or heart)?",
        "steps": [
          "Kings: 4 (one per suit)",
          "Hearts: 13 (one per rank)",
          "Overlap: king of hearts = 1 card in both groups",
          "Apply inclusion-exclusion: 4 + 13 − 1 = 16",
          "P = 16/52 = 4/13"
        ],
        "answer": "4/13"
      },
      "traps": [
        "Adding 4 + 13 = 17 without subtracting overlap → 17/52 (classic trap, one of the choices)",
        "Thinking 'hearts only, not king' = 12/52 — misreads 'or' as 'and not'",
        "Dividing by 13 instead of 52 — confusing rank count with deck size",
        "Mutually exclusive assumption: kings and hearts SHARE the king of hearts, so they are NOT mutually exclusive"
      ],
      "solveSteps": [
        "1. Identify both groups: count each separately",
        "2. Find the overlap: items belonging to BOTH groups",
        "3. Apply P(A or B) = P(A) + P(B) − P(A ∩ B)",
        "4. Simplify the fraction (divide numerator and denominator by GCD)",
        "5. Check: answer must be ≥ max(P(A), P(B)) and ≤ P(A) + P(B)"
      ]
    }
  },
  "460": {
    "hint": "Count all teams, then subtract teams that include BOTH banned players. Complementary counting avoids messy case splits.",
    "theory": {
      "title": "Complementary Counting — Forbidden Pairs",
      "icon": "🚫",
      "summary": "When restrictions exclude certain combos, count the complement: total unrestricted minus the forbidden subset. Faster than listing allowed cases.",
      "keyFacts": [
        "C(n,k) = n! / (k!(n−k)!) — choose k from n, order irrelevant",
        "Complementary counting: Allowed = Total − Forbidden",
        "Forbidden pair on team: lock both in, choose remaining k−2 from leftover n−2",
        "C(7,4) = 35 total teams of 4 from 7",
        "Forbidden (both specific players): C(5,2) = 10 ways to fill remaining 2 spots",
        "Allowed = 35 − 10 = 25"
      ],
      "example": {
        "problem": "Pick 4 from 7 players. Players A and B refuse to share a team. How many valid teams?",
        "steps": [
          "Total unrestricted: C(7,4) = 35",
          "Forbidden: A and B both on team → pick 2 more from remaining 5 → C(5,2) = 10",
          "Allowed = 35 − 10 = 25"
        ],
        "answer": "25"
      },
      "traps": [
        "Adding cases instead of subtracting — tedious and error-prone (teams with A only + teams with B only + neither)",
        "Forgetting to reduce pool: if both are locked in, only 5 players remain for 2 spots",
        "Using permutations (4!) instead of combinations — team order doesn't matter",
        "Off-by-one: remaining pool is n−2, remaining spots are k−2"
      ],
      "solveSteps": [
        "1. Compute total unrestricted: C(n,k)",
        "2. Identify forbidden configuration (both banned players selected)",
        "3. Lock in banned pair, count ways to fill rest: C(n−2, k−2)",
        "4. Allowed = Total − Forbidden",
        "5. Sanity: allowed < total, and answer lies between adjacent choices"
      ]
    }
  },
  "461": {
    "hint": "Even power strips sign — n² > 4 tells you |n| > 2, not the sign. Odd power preserves sign. Check each statement alone before combining.",
    "theory": {
      "title": "Even vs Odd Powers — Sign Preservation",
      "icon": "±",
      "summary": "Even exponents erase sign: n² = (-n)². Odd exponents keep it: n³ > 0 iff n > 0. DS sign questions hinge on this asymmetry.",
      "keyFacts": [
        "n² ≥ 0 always — even power loses sign info",
        "n² > k² ⟺ |n| > k ⟺ n > k OR n < -k",
        "n³ > 0 ⟺ n > 0 (odd power preserves sign)",
        "n³ < 0 ⟺ n < 0",
        "Even power sufficient for magnitude; odd power sufficient for sign",
        "For DS: 'is n positive?' needs sign, so odd-power inequality is directly useful"
      ],
      "example": {
        "problem": "Is integer n positive? (1) n² > 4  (2) n³ > 0",
        "steps": [
          "St.1: n² > 4 → |n| > 2 → n ∈ {…, -3, 3, 4,…} — includes negatives. NOT sufficient.",
          "St.2: n³ > 0 → odd power → n must be positive. SUFFICIENT.",
          "No need to combine — St.2 alone answers the question."
        ],
        "answer": "B — statement 2 alone is sufficient; odd power directly reveals n > 0, while statement 1 only bounds |n|."
      },
      "traps": [
        "Assuming n² > 4 means n > 2 — forgets the negative root n < -2",
        "Thinking both statements needed because St.1 feels 'extra info'",
        "Forgetting integer constraint changes nothing here — sign logic is identical",
        "Combining when St.2 already sufficient wastes time and risks mis-selecting C"
      ],
      "solveSteps": [
        "1. Ask: does the statement determine SIGN (not just magnitude)?",
        "2. St.1: even power — rewrite as |n| > 2; test n = 3 (yes) and n = -3 (no) → NOT sufficient",
        "3. St.2: odd power — n³ > 0 directly implies n > 0 → SUFFICIENT",
        "4. Mark B; no need to check combined"
      ]
    }
  },
  "462": {
    "hint": "6 = 2 × 3. Ask: does each statement guarantee BOTH prime factors? Test a counterexample before concluding sufficient.",
    "theory": {
      "title": "Divisibility by Composite — Prime Factor Checklist",
      "icon": "🔢",
      "summary": "n is divisible by k iff n contains all prime factors of k (with required multiplicity). For DS, each statement must lock in every required factor — a missing factor means insufficient.",
      "keyFacts": [
        "n divisible by k ⟺ prime factorization of k is a subset of prime factorization of n",
        "6 = 2 × 3 → n must supply at least one 2 AND one 3",
        "Divisible by 4 = divisible by 2² → guarantees the factor 2 (and more)",
        "LCM rule: if n divisible by a AND b, then n divisible by lcm(a,b)",
        "lcm(3,4) = 12 → divisible by 12 ⟹ divisible by 6",
        "Counterexample technique: find n satisfying statement but NOT divisible by 6 to prove insufficiency"
      ],
      "example": {
        "problem": "Is integer n divisible by 6? (1) n divisible by 3. (2) n divisible by 4.",
        "steps": [
          "6 needs factors 2 and 3",
          "Stmt 1 alone: n=9 satisfies (div by 3) but 9/6 not integer → NOT sufficient",
          "Stmt 2 alone: n=8 satisfies (div by 4) but 8/6 not integer → NOT sufficient",
          "Together: div by 3 AND div by 4 → div by lcm(3,4)=12",
          "12 is divisible by 6, so any multiple of 12 is a multiple of 6 → SUFFICIENT"
        ],
        "answer": "C — neither statement alone covers both required prime factors, but together they guarantee divisibility by 12, hence by 6"
      },
      "traps": [
        "Assuming 'divisible by 4' means 'divisible by 2' is enough — you still need the factor of 3",
        "Forgetting to test a counterexample — just one n that fails kills sufficiency",
        "Thinking statements are sufficient because they 'feel like enough info'",
        "Confusing divisibility by 4 with divisibility by 2 for the purpose of covering 6's factor of 2 — it does cover it, but 3 is still missing"
      ],
      "solveSteps": [
        "1. Factor the target: 6 = 2 × 3 — list required prime factors",
        "2. Test each statement alone: find a counterexample (n satisfying stmt but not divisible by 6)",
        "3. If counterexample exists → that statement alone is insufficient",
        "4. Test both together: check if combined constraints force all required factors (use LCM)",
        "5. If combined guarantees divisibility → answer C; if not → E"
      ]
    }
  },
  "463": {
    "hint": "Each equation alone has 2 unknowns — test if combining pins x to one value. Count equations vs unknowns.",
    "theory": {
      "title": "Two-Variable Linear Systems — DS Sufficiency",
      "icon": "∥",
      "summary": "One linear equation with 2 unknowns has infinite solutions. Two independent equations create a unique intersection — but only if they're not parallel or identical.",
      "keyFacts": [
        "n unknowns need n independent equations for a unique solution",
        "One equation, 2 unknowns → infinite (x, y) pairs → never sufficient alone",
        "Two linear equations: check if independent (different slopes) → unique solution",
        "DS goal: does the statement PIN x to exactly one value?",
        "Adding/subtracting equations can eliminate one variable fast",
        "Parallel lines (same slope, different intercept) = no solution; same line = infinite"
      ],
      "example": {
        "problem": "What is x? (1) 2x + y = 10  (2) x − y = 2",
        "steps": [
          "Statement 1 alone: y = 10 − 2x; any x works → insufficient",
          "Statement 2 alone: y = x − 2; any x works → insufficient",
          "Together: add both equations: 3x = 12 → x = 4",
          "y = 2 as well — unique solution confirmed"
        ],
        "answer": "C — neither alone pins x, but together they give a unique x = 4"
      },
      "traps": [
        "Two equations always sufficient? No — if parallel or identical, still insufficient",
        "Forgetting to test each statement ALONE before testing together",
        "Solving for both x and y when DS only asks for x — stop once x is determined",
        "Assuming one equation is 'almost' sufficient because it looks simple"
      ],
      "solveSteps": [
        "1. Count unknowns vs equations in each statement alone",
        "2. One equation, 2 unknowns → insufficient (infinite solutions)",
        "3. Test statements together: are they independent? (different slopes?)",
        "4. Independent → solve system; verify x is uniquely determined",
        "5. Choose A/B if one alone works, C if only together works, E if even together fails"
      ]
    }
  },
  "464": {
    "hint": "Test each statement alone: does it GUARANTEE x > 5 for ALL valid x, or only sometimes? One statement narrows the range completely; the other allows counterexamples.",
    "theory": {
      "title": "DS Sufficiency — Inequality Implication Chains",
      "icon": "📐",
      "summary": "A statement is sufficient when every value it allows gives the SAME yes/no answer. With inequalities, ask: does this bound imply the target bound, or does it leave room for both outcomes?",
      "keyFacts": [
        "Sufficient = same answer (always YES or always NO) for every allowed value",
        "x > k implies x > j whenever k > j (stronger bound implies weaker)",
        "x > j does NOT imply x > k when k > j (weaker bound allows values below k)",
        "Counterexample test: find ONE value satisfying the statement that violates the target — if found, INSUFFICIENT",
        "For YES/NO DS, insufficient ≠ always NO — it means mixed answers are possible",
        "Nested intervals: if statement range ⊂ target-yes region, always YES → sufficient"
      ],
      "example": {
        "problem": "Is x > 5? (1) x > 3  (2) x > 7",
        "steps": [
          "Test (1): x > 3 allows x = 4 → 4 > 5? NO. Also x = 6 → 6 > 5? YES. Mixed → INSUFFICIENT",
          "Test (2): x > 7 means x is always above 7, and 7 > 5, so x > 5 ALWAYS. No counterexample → SUFFICIENT",
          "(1) alone: NOT sufficient. (2) alone: sufficient."
        ],
        "answer": "B — statement 2 guarantees x > 7 > 5, so x > 5 always YES; statement 1 allows x = 4, a counterexample"
      },
      "traps": [
        "Thinking x > 3 'moves toward' x > 5 — partial overlap is NOT sufficiency",
        "Combining both and forgetting to test each alone first",
        "Confusing 'statement is false' with 'statement is insufficient' — they are different things",
        "Assuming the stronger statement must be one of the later ones — always test both independently"
      ],
      "solveSteps": [
        "1. Identify the YES/NO target (here: is x > 5?)",
        "2. Test Statement (1) alone: find a counterexample or prove implication holds universally",
        "3. Test Statement (2) alone: same check",
        "4. If one statement's bound is strictly above the target bound (7 > 5), it implies the target — SUFFICIENT",
        "5. Pick A/B/C/D/E based on which statements are sufficient alone or together"
      ]
    }
  },
  "465": {
    "hint": "Ask: does each statement alone let you conclude yes/no definitively? One statement uses a triangle angle-side theorem directly — the other only gives a sum.",
    "theory": {
      "title": "Isosceles Triangle — Angles ↔ Sides",
      "icon": "△",
      "summary": "In any triangle, equal angles opposite equal sides (and vice versa). If two base angles match, the two legs must be equal — this is the isosceles triangle theorem.",
      "keyFacts": [
        "Isosceles: AB = AC ⟺ ∠B = ∠C (angles opposite equal sides are equal)",
        "Converse holds: equal base angles → equal legs, no extra info needed",
        "Sum AB + AC = constant is consistent with MANY (AB, AC) pairs — equal or unequal",
        "Knowing a sum never pins individual values unless a second constraint exists",
        "DS sufficiency = can you answer YES or can you answer NO definitively (either way counts)"
      ],
      "example": {
        "problem": "In △ABC, is AB = AC? (1) ∠B = ∠C  (2) AB + AC = 10",
        "steps": [
          "Statement 1: ∠B = ∠C → side opposite ∠B is AC, side opposite ∠C is AB → AB = AC. Definitive YES.",
          "Statement 1 alone: sufficient.",
          "Statement 2: AB + AC = 10. Try AB=5, AC=5 → equal (YES). Try AB=3, AC=7 → not equal (NO).",
          "Statement 2 cannot determine equality. Not sufficient."
        ],
        "answer": "A — statement 1 alone pins AB = AC via the isosceles angle-side theorem; statement 2 leaves both outcomes open"
      },
      "traps": [
        "Thinking 'sum = 10 and triangle exists' implies equal sides — it doesn't",
        "Forgetting the converse: equal angles → equal sides (not just equal sides → equal angles)",
        "Combining both statements when statement 1 already closes the question",
        "Confusing 'isosceles' with needing two pieces of info — one angle equality is enough"
      ],
      "solveSteps": [
        "1. Identify what isosceles means: AB = AC ⟺ ∠B = ∠C",
        "2. Test statement 1 alone: equal angles → equal opposite sides? YES, sufficient.",
        "3. Test statement 2 alone: plug in two different (AB, AC) pairs summing to 10 — get conflicting answers → NOT sufficient.",
        "4. Since statement 1 alone suffices and statement 2 alone does not → answer A"
      ]
    }
  },
  "466": {
    "hint": "To pin the y-intercept, you need slope AND a point — check whether each statement alone gives both. No letter revealed.",
    "theory": {
      "title": "Line Equation — Pinning the Y-Intercept",
      "icon": "📐",
      "summary": "A line is y = mx + b. Knowing m or one point alone leaves infinitely many lines. Both together uniquely fix b.",
      "keyFacts": [
        "Line equation: y = mx + b  (slope m, y-intercept b)",
        "Fix b: need BOTH slope m AND one (x, y) point — then b = y − mx",
        "Slope alone → infinitely many parallel lines (different b)",
        "One point alone → infinitely many lines through that point (different m)",
        "Two points → enough (gives m first, then b)",
        "DS rule: if each statement alone is insufficient but together they are, answer is C"
      ],
      "example": {
        "problem": "What is the y-intercept of line L? (1) slope = 2  (2) L passes through (3, 5)",
        "steps": [
          "Statement 1 only: slope = 2, but b unknown — lines y = 2x+0, y = 2x+1, ... all valid. Insufficient.",
          "Statement 2 only: passes through (3,5), but slope unknown — lines y = x+2, y = 2x−1, ... all valid. Insufficient.",
          "Together: y = 2x + b, substitute (3,5): 5 = 2(3) + b → b = −1. Unique answer.",
          "Both statements together fully determine the line."
        ],
        "answer": "C — neither statement alone fixes both m and b, but together they do: b = 5 − 2(3) = −1"
      },
      "traps": [
        "Thinking slope alone is enough — slope only tells direction, not position",
        "Thinking one point alone is enough — infinite slopes pass through any point",
        "Forgetting to substitute the point into y = mx + b after combining statements",
        "Assuming 'passes through a point' implies the y-intercept is that y-value (only true if x = 0)"
      ],
      "solveSteps": [
        "1. Write the line form: y = mx + b. Target: find b.",
        "2. Test Statement 1 alone: does it give both m and a point? No → insufficient.",
        "3. Test Statement 2 alone: does it give both m and a point? No → insufficient.",
        "4. Combine: plug the point into y = mx + b to solve b = y − mx.",
        "5. If unique b found → C. If still ambiguous → E."
      ]
    }
  },
  "467": {
    "hint": "Total discount needs BOTH multipliers: (1−p/100)(1−q/100). Ask: can you compute that with only one statement?",
    "theory": {
      "title": "Successive Percent Discounts",
      "icon": "%",
      "summary": "Two successive discounts don't simply add. Each applies to the already-reduced price, so you must multiply both factors and subtract from 1.",
      "keyFacts": [
        "After p% off: price × (1 − p/100)",
        "After q% off that: price × (1 − p/100)(1 − q/100)",
        "Total discount % = 1 − (1 − p/100)(1 − q/100), times 100",
        "p + q always OVERstates the total discount (ignores compounding)",
        "Need BOTH p and q — neither alone pins the total",
        "Formula shortcut: total = p + q − pq/100"
      ],
      "example": {
        "problem": "Item discounted 20%, then 25%. What is total percent discount?",
        "steps": [
          "Factor 1: 1 − 20/100 = 0.80",
          "Factor 2: 1 − 25/100 = 0.75",
          "Combined multiplier: 0.80 × 0.75 = 0.60",
          "Total discount: 1 − 0.60 = 0.40 → 40%",
          "Shortcut: 20 + 25 − (20×25)/100 = 45 − 5 = 40% ✓"
        ],
        "answer": "40%"
      },
      "traps": [
        "p + q = 45% — WRONG; ignores that second cut applies to reduced price",
        "Knowing only p (or only q) leaves the total unbounded",
        "Order of discounts doesn't matter — product (1−p/100)(1−q/100) is commutative",
        "Answer is always LESS than the naive sum p + q"
      ],
      "solveSteps": [
        "1. Write total multiplier: (1 − p/100)(1 − q/100) — need both p and q",
        "2. Test S1 alone: p = 20, q unknown → multiplier range open → insufficient",
        "3. Test S2 alone: q = 25, p unknown → multiplier range open → insufficient",
        "4. Both together: 0.80 × 0.75 = 0.60 → total discount = 40% → sufficient",
        "5. Answer: C — both statements together, neither alone"
      ]
    }
  },
  "468": {
    "hint": "Mean = sum / count. Ask: does each statement alone pin one unique number? Statement (1) directly gives sum; statement (2) gives range bounds only.",
    "theory": {
      "title": "Arithmetic Mean — Sum ÷ Count",
      "icon": "∑",
      "summary": "Mean is fully determined by sum and count alone. Knowing the range (min, max) tells you nothing about the middle values and cannot fix the sum.",
      "keyFacts": [
        "Mean = Sum / Count (ALWAYS — no exceptions)",
        "Count given → knowing sum is enough to find mean",
        "Range (min, max) does NOT fix sum; middle values can vary freely",
        "5 numbers with min=8, max=16: e.g. {8,8,8,8,16} vs {8,12,12,12,16} — different means",
        "DS sufficiency: one unique numerical answer = sufficient; any ambiguity = not sufficient"
      ],
      "example": {
        "problem": "What is the mean of 5 numbers? (1) Sum = 60. (2) Min = 8, max = 16.",
        "steps": [
          "Statement (1): mean = 60 / 5 = 12. One value. SUFFICIENT.",
          "Statement (2): three middle values unknown. Try {8,8,8,8,16} → mean=9.6; try {8,16,16,16,16} → mean=14.4. Not unique. NOT SUFFICIENT.",
          "Combined unnecessary once (1) is sufficient alone."
        ],
        "answer": "A — statement 1 alone pins the mean; statement 2 leaves it undetermined"
      },
      "traps": [
        "Assuming min/max constrains the mean — it only bounds it",
        "Thinking you need both statements when (1) is already fully sufficient",
        "Forgetting mean = sum/n is the only formula needed here"
      ],
      "solveSteps": [
        "1. Write mean = sum / count",
        "2. Test statement (1): does it give sum? Yes → mean = sum/5. Sufficient.",
        "3. Test statement (2): does it fix sum? No — middle values unknown. Not sufficient.",
        "4. Since (1) alone works, answer is A"
      ]
    }
  },
  "469": {
    "hint": "Each statement gives speed directly — check if speed × 3 pins a unique distance. Ask: does each statement alone answer the question?",
    "theory": {
      "title": "Constant-Speed DS — Rate × Time",
      "icon": "🚂",
      "summary": "If speed is constant, d = r·t. One rate datum is enough to find distance for any time interval. Both statements here encode the same rate.",
      "keyFacts": [
        "d = r·t — three variables, fix two, solve third",
        "Constant speed → rate from any (d,t) pair applies everywhere",
        "Statement sufficiency: can you get a UNIQUE answer? Yes → sufficient",
        "Same rate, different numbers → both statements give identical info",
        "DS trap: two statements agree → answer is D (each alone sufficient), not C"
      ],
      "example": {
        "problem": "Train moves at constant speed. How far in 3 hr? (1) 80 mi in 2 hr (2) 200 mi in 5 hr",
        "steps": [
          "S1: r = 80/2 = 40 mph → d = 40×3 = 120 mi. Unique. Sufficient.",
          "S2: r = 200/5 = 40 mph → d = 40×3 = 120 mi. Unique. Sufficient.",
          "Both give same rate — answer is D."
        ],
        "answer": "D — each statement alone pins speed at 40 mph, so distance in 3 hr = 120 mi uniquely"
      },
      "traps": [
        "Picking C because two statements exist — check each alone first",
        "Forgetting constant speed means any single (d,t) pair gives the universal rate",
        "Assuming different numbers in statements means different information"
      ],
      "solveSteps": [
        "1. Identify the unknown: distance for a given time",
        "2. Test S1 alone: extract rate → compute d = r·t → unique answer?",
        "3. Test S2 alone: same process",
        "4. If both independently sufficient → D",
        "5. Never assume C just because two statements are given"
      ]
    }
  },
  "470": {
    "hint": "Statement 1 gives two possible values; statement 2 alone is too broad. Ask: does combining them pin exactly one value?",
    "theory": {
      "title": "Quadratics in DS — Two Roots Trap",
      "icon": "±",
      "summary": "x² = k always yields two roots: +√k and −√k. A single quadratic statement almost never suffices in DS unless the domain already excludes one root.",
      "keyFacts": [
        "x² = k → x = +√k or x = −√k (two solutions unless k = 0)",
        "A sign constraint (x > 0 or x < 0) eliminates one root, leaving a unique value",
        "x² = 0 is the only case where the quadratic gives one root on its own",
        "DS sufficiency requires exactly ONE value — a range or two candidates = insufficient",
        "Combining a quadratic with a sign constraint is the classic 'C' pattern in GMAT DS"
      ],
      "example": {
        "problem": "What is x? (1) x² = 9  (2) x < 0",
        "steps": [
          "S1 alone: x = 3 or x = −3 → two values → NOT sufficient",
          "S2 alone: x < 0 → infinitely many values → NOT sufficient",
          "Together: x² = 9 AND x < 0 → x = −3 only → unique value → SUFFICIENT"
        ],
        "answer": "C — neither statement alone pins one value, but together the sign constraint eliminates the positive root"
      },
      "traps": [
        "Assuming x² = 16 means x = 4 — forgetting the negative root",
        "Thinking x > 0 alone is useful for 'what is x' — it only restricts, never pins",
        "Missing that k = 0 is the one exception where x² = k gives a single root",
        "Over-counting: even if both roots are positive, you still have two values"
      ],
      "solveSteps": [
        "1. S1 alone: solve the quadratic — count distinct real roots. Two roots → insufficient",
        "2. S2 alone: does the inequality pin a unique value? A range = insufficient",
        "3. Together: apply the sign/range constraint from S2 to filter S1 roots — one survivor?",
        "4. If exactly one value survives, answer is C",
        "5. Sanity: verify no edge case (k = 0, constraint matches both roots, etc.)"
      ]
    }
  },
  "471": {
    "hint": "Test each statement alone: can you determine even/odd definitively? Watch divisibility chain in (1) and the odd/even addition rule in (2).",
    "theory": {
      "title": "Parity from Divisibility & Odd/Even Arithmetic",
      "icon": "⚖",
      "summary": "Even/odd status flows through arithmetic operations predictably. Divisibility constraints and parity rules are two independent windows into the same property.",
      "keyFacts": [
        "Even ± Even = Even; Odd ± Odd = Even; Even ± Odd = Odd",
        "Even × anything = Even; Odd × Odd = Odd",
        "If 2x divisible by 4 → x divisible by 2 → x even",
        "If n+1 is odd → n is even (consecutive integers alternate parity)",
        "DS parity question: 'sufficient' means ONE answer (yes or no), never 'sometimes'",
        "Factor out the constant: 2x ÷ 4 = x ÷ 2 — divisibility chain reduces neatly"
      ],
      "example": {
        "problem": "Is integer x even? (1) 2x is divisible by 4. (2) x+1 is odd.",
        "steps": [
          "Stmt 1: 2x divisible by 4 → 2x = 4k → x = 2k → x is even. Definitive YES → sufficient",
          "Stmt 2: x+1 is odd. Odd number minus 1 = even → x is even. Definitive YES → sufficient",
          "Each statement alone answers the question. Answer = D"
        ],
        "answer": "D — each statement alone is sufficient: stmt 1 via divisibility chain, stmt 2 via parity rule"
      },
      "traps": [
        "Thinking stmt 1 only proves 2x is even (trivially true for any x) — you must carry the ÷2 step",
        "Forgetting that x+1 odd forces x even uniquely — no ambiguity remains",
        "Assuming you need both statements when each independently locks the answer",
        "Testing only positive integers — rule holds for all integers including negatives and zero"
      ],
      "solveSteps": [
        "1. Restate target: does this statement pin x as definitely even (or definitely odd)?",
        "2. Stmt 1: divide both sides — if 2x divisible by 4, is x divisible by 2?",
        "3. Stmt 2: apply odd/even addition rule — if x+1 is odd, what parity must x have?",
        "4. If both stmts give definitive same-direction answer → D",
        "5. Never mark sufficient if answer could be 'sometimes yes, sometimes no'"
      ]
    }
  },
  "472": {
    "hint": "Each statement alone leaves width free. Together: Pythagorean theorem locks the missing side — check whether BOTH are needed.",
    "theory": {
      "title": "Rectangle Area via Diagonal — Pythagorean Lock",
      "icon": "▭",
      "summary": "A rectangle's diagonal splits it into right triangles. Knowing one side + diagonal pins the other side via a²+b²=c², making area determinable.",
      "keyFacts": [
        "Area of rectangle = length × width",
        "Diagonal d relates sides: l² + w² = d²",
        "One side alone → infinitely many rectangles possible",
        "Diagonal alone → infinitely many (l,w) pairs satisfy l²+w²=d²",
        "One side + diagonal → unique second side → unique area",
        "Recognize 6-8-10 as a 3-4-5 Pythagorean triple scaled by 2"
      ],
      "example": {
        "problem": "Rectangle has length 8 and diagonal 10. What is the area?",
        "steps": [
          "Apply Pythagorean theorem: w² = d² − l²",
          "w² = 10² − 8² = 100 − 64 = 36",
          "w = 6",
          "Area = 8 × 6 = 48",
          "Note: 6-8-10 is 3-4-5 triple × 2 — recognizing this saves time"
        ],
        "answer": "48"
      },
      "traps": [
        "Thinking diagonal alone (statement 2) is sufficient — it isn't; (3,4,5) scale vs (6,8,10) scale both satisfy d=10 with different areas... wait, actually any angle gives different l,w pairs",
        "Assuming 'diagonal = 10 looks like a common triple' means it locks the rectangle — it doesn't without a side",
        "Forgetting that statement 1 alone (l=8 only) leaves width completely free",
        "Not checking both statements fail alone before concluding C"
      ],
      "solveSteps": [
        "1. Test statement 1 alone: length=8, width unknown → area = 8w, undetermined. INSUFFICIENT.",
        "2. Test statement 2 alone: diagonal=10, many (l,w) pairs satisfy l²+w²=100 (e.g. 6-8, 2-√96). INSUFFICIENT.",
        "3. Combine: l=8, d=10 → w²=100−64=36 → w=6 → area=48. Unique answer. SUFFICIENT.",
        "4. Answer = C (both together, neither alone)."
      ]
    }
  },
  "473": {
    "hint": "Each statement alone: does it pin x to exactly one value? Watch — squaring hides sign. Test each independently before combining.",
    "theory": {
      "title": "DS Sufficiency — Equations That Lose Sign",
      "icon": "±",
      "summary": "Quadratic equations yield two roots; linear equations yield one. On DS, 'x² = k' is a classic insufficient trap because it leaves ±√k as live candidates.",
      "keyFacts": [
        "DS goal: does the statement fix exactly ONE value for the variable?",
        "x² = k → x = ±√k — two solutions unless domain restricts sign",
        "x + c = d → x = d − c — one solution, always sufficient for 'is x = ?' questions",
        "Test each statement in isolation first; never mix S1 and S2 when judging alone",
        "Even if both individually fail, check combined — but here S2 alone settles it",
        "Sufficiency ≠ correctness; sufficient means no ambiguity remains"
      ],
      "example": {
        "problem": "Is x = 5? (1) x² = 25  (2) x + 5 = 10",
        "steps": [
          "S1 alone: x² = 25 → x = 5 or x = −5. Two values → not sufficient.",
          "S2 alone: x + 5 = 10 → x = 5. Exactly one value → sufficient.",
          "S1 is insufficient; S2 is sufficient → answer B."
        ],
        "answer": "B — statement 2 pins x = 5 uniquely; statement 1 leaves x = ±5 ambiguous."
      },
      "traps": [
        "Assuming x² = 25 means x = 5 (forgetting the negative root −5)",
        "Marking D because both 'look' like they give 5 — S1 actually gives two answers",
        "Combining statements when S2 alone is already sufficient (wasted work, same answer)",
        "Thinking 'the question says x might be 5' biases you to confirm rather than test for uniqueness"
      ],
      "solveSteps": [
        "1. Test S1 alone: solve fully — how many solutions? If more than one, NOT sufficient.",
        "2. Test S2 alone: solve fully — exactly one solution? If yes, SUFFICIENT → lean B or D.",
        "3. Since S1 has two solutions (±5) and S2 has one (5), answer is B.",
        "4. Never stop at 'one solution matches the target' — check ALL solutions exist uniquely."
      ]
    }
  },
  "474": {
    "hint": "Ratio fixes the shape; you need one number to anchor the scale. Check each statement: does it pin the total or one part?",
    "theory": {
      "title": "Ratios — Anchoring the Scale",
      "icon": "⚖",
      "summary": "A ratio like 3:5 defines proportions but not counts. Give any single real quantity (total, one part) and every other part is determined.",
      "keyFacts": [
        "Ratio a:b → parts are a·k and b·k for some unknown k",
        "Total = (a+b)·k → k = total/(a+b)",
        "One part known → k = (that part)/its ratio number",
        "Once k is known, every group = its ratio number × k",
        "Two statements giving redundant anchors = each alone sufficient (answer D pattern)",
        "DS trap: ratio already given in stem — one piece of data is enough to solve"
      ],
      "example": {
        "problem": "Boys:girls = 3:5. How many girls? (1) 24 total. (2) 9 boys.",
        "steps": [
          "Ratio means boys = 3k, girls = 5k",
          "(1): 3k + 5k = 24 → 8k = 24 → k = 3 → girls = 15 ✓",
          "(2): 3k = 9 → k = 3 → girls = 15 ✓",
          "Both statements independently determine k and thus girls"
        ],
        "answer": "D — each statement alone pins k, giving a unique count for girls"
      },
      "traps": [
        "Thinking you need both statements — ratio in stem already does heavy lifting",
        "Using ratio numbers as actual counts (girls = 5, not 15)",
        "Forgetting to check each statement independently before considering them together"
      ],
      "solveSteps": [
        "1. Identify unknowns: ratio given → only k is unknown",
        "2. Test S1 alone: does it give total or any part count? If yes, k is solvable",
        "3. Test S2 alone: does it give total or any part count? If yes, k is solvable",
        "4. If both independently determine k → answer D",
        "5. Confirm: plug k back to get the asked quantity as a sanity check"
      ]
    }
  },
  "475": {
    "hint": "Each statement alone gives partial info. Ask: does this statement PIN a unique value for Mary, or just a relationship/range?",
    "theory": {
      "title": "DS Age Problems — Relative vs Absolute Info",
      "icon": "🎂",
      "summary": "Age DS questions split info into relationships (older by N years) and anchor values (person X is Y years old). One type alone leaves unknowns; together they pin every variable.",
      "keyFacts": [
        "N unknowns need N independent equations to get unique solution",
        "Relative statement (A is 4 more than B) = 1 equation, 2 unknowns → range of solutions",
        "Absolute statement (B = 12) = 1 equation, 1 unknown → pins B but says nothing about A",
        "Combine: substitute absolute into relative → unique answer",
        "DS trap: each statement looks helpful, but test each ALONE before combining",
        "If both statements repeat same relationship type, together still insufficient"
      ],
      "example": {
        "problem": "How old is Mary? (1) Mary is 4 years older than John. (2) John is 12.",
        "steps": [
          "St.1 alone: M = J + 4. Two unknowns, one equation → infinite solutions (J=5→M=9, J=10→M=14…). NOT sufficient.",
          "St.2 alone: J = 12. Tells us John's age, says nothing about Mary. NOT sufficient.",
          "Together: substitute J=12 into M = J+4 → M = 16. Unique answer. SUFFICIENT."
        ],
        "answer": "C — neither statement alone pins Mary's age, but combining the relationship with the anchor gives M = 16"
      },
      "traps": [
        "St.1 feels useful because it mentions Mary directly — but without a fixed value for John, M floats",
        "St.2 feels irrelevant because it only names John — but it anchors the whole system",
        "Assuming 'together' always works — check that combined equations are truly independent",
        "Forgetting to test each statement alone before jumping to C"
      ],
      "solveSteps": [
        "1. Count unknowns in the question (here: Mary's age)",
        "2. Test St.1 alone: does it uniquely determine Mary? If only a relationship remains, INSUFFICIENT",
        "3. Test St.2 alone: does it uniquely determine Mary? If it names a different person only, INSUFFICIENT",
        "4. Combine both: substitute the anchor value into the relationship equation",
        "5. If unique numeric answer results → C; if still ambiguous → E"
      ]
    }
  },
  "476": {
    "hint": "Each statement pins radius fully — try to solve for r alone from each. No combo needed.",
    "theory": {
      "title": "Circle Area — Radius from Circumference or Diameter",
      "icon": "⭕",
      "summary": "Area, circumference, and diameter all flow from one value: r. Any one of the three uniquely determines the others.",
      "keyFacts": [
        "Area = πr²",
        "Circumference = 2πr",
        "Diameter = 2r",
        "Given C → r = C/(2π) → area determined",
        "Given d → r = d/2 → area determined",
        "All three circle measures are bijective — one pins the rest"
      ],
      "example": {
        "problem": "Circumference = 8π. What is area?",
        "steps": [
          "2πr = 8π",
          "r = 4",
          "Area = π(4²) = 16π"
        ],
        "answer": "16π"
      },
      "traps": [
        "Thinking you need both statements — each is independently sufficient",
        "Confusing circumference formula 2πr with area formula πr²",
        "Forgetting diameter = 2r (off-by-factor-of-2 error)"
      ],
      "solveSteps": [
        "1. For each statement alone: can you solve for r?",
        "2. Statement 1: C = 8π → r = 4 → area = 16π. Sufficient.",
        "3. Statement 2: d = 8 → r = 4 → area = 16π. Sufficient.",
        "4. Both alone sufficient → answer is D"
      ]
    }
  },
  "477": {
    "hint": "Two paths to original salary: percent increase → divide final by (1+r); dollar increase → subtract. Check each statement alone before combining.",
    "theory": {
      "title": "Reverse Percent Increase — Finding the Original",
      "icon": "%",
      "summary": "Given final value after a raise, work backwards using either the percent rate or the dollar amount. Either route pins the original uniquely.",
      "keyFacts": [
        "new = old × (1 + r)  →  old = new / (1 + r)",
        "new = old + dollar_increase  →  old = new − dollar_increase",
        "Knowing final value + percent rate → unique original",
        "Knowing final value + dollar amount → unique original",
        "Both statements give equivalent info when final value is known",
        "DS rule: if each statement alone pins one numeric answer, answer is D"
      ],
      "example": {
        "problem": "Salary rose to $5,500. Find original salary given: (1) increase was 10%; (2) increase was $500.",
        "steps": [
          "Statement 1: old = 5500 / 1.10 = 5000 ✓ — sufficient alone",
          "Statement 2: old = 5500 − 500 = 5000 ✓ — sufficient alone",
          "Both independently yield $5,000 — each alone sufficient"
        ],
        "answer": "D — each statement alone is sufficient; Statement 1 uses rate, Statement 2 uses dollar amount, both pin original at $5,000"
      },
      "traps": [
        "Thinking percent increase applies to final value: 5500 × 0.10 ≠ increase (percent is on ORIGINAL)",
        "Assuming statements must be combined — always test each alone first",
        "Confusing 'increased TO $5,500' with 'increased BY $5,500'",
        "Forgetting that knowing final + either rate or dollar amount fully determines original"
      ],
      "solveSteps": [
        "1. Identify what is known: final value = $5,500",
        "2. Test Statement 1 alone: old = final / (1 + rate) — does it give one value?",
        "3. Test Statement 2 alone: old = final − dollar amount — does it give one value?",
        "4. If both alone sufficient → answer is D",
        "5. Verify arithmetic: 5500/1.10 = 5000; 5500−500 = 5000"
      ]
    }
  },
  "478": {
    "hint": "Median of 5 = 3rd value when sorted. Knowing only the min or max leaves the middle three values free — test two sets that give median=10 vs median=11.",
    "theory": {
      "title": "Median of Odd-Sized Set — Extremes Don't Pin the Middle",
      "icon": "📊",
      "summary": "Median = middle value of sorted set. Knowing the endpoints (min, max) constrains the range but not the 3rd value — the middle can still float within that range.",
      "keyFacts": [
        "Median of n-element sorted set = value at position (n+1)/2",
        "For 5 distinct integers: median = 3rd smallest",
        "Min and max define the range, NOT the distribution of inner values",
        "'Greater than' DS question needs YES always or NO always — one counterexample kills sufficiency",
        "Distinct integers: values must all differ, but spacing is free",
        "Combining min+max still leaves 3 interior values free to place"
      ],
      "example": {
        "problem": "5 distinct positive integers, min=8, max=14. Is the median > 10?",
        "steps": [
          "Set sorted: {8, _, _, _, 14} — need 3 middle values from {9,10,11,12,13}",
          "Try {8, 9, 10, 12, 14}: median = 10 → NOT > 10",
          "Try {8, 9, 11, 12, 14}: median = 11 → IS > 10",
          "Both sets satisfy all constraints — two different answers",
          "No statement alone or together pins median to one side of 10"
        ],
        "answer": "E — even with both min=8 and max=14, median can be 10 (no) or 11 (yes); ambiguous"
      },
      "traps": [
        "Assuming min=8 forces values ≥ 8 and therefore median ≥ 10 — wrong, median could equal 10",
        "Thinking max=14 caps the median below 14 and somehow implies it's large — no constraint on middle",
        "Forgetting 'distinct' — can't repeat values, but still have many arrangements",
        "Combining statements feels like more info = sufficient, but interior values remain free"
      ],
      "solveSteps": [
        "1. Locate median position: for 5 elements, median = 3rd value sorted",
        "2. Per statement: identify what is fixed and what is still free",
        "3. Construct set where median > 10 (YES) and set where median ≤ 10 (NO) — both satisfying constraints",
        "4. If both exist → statement insufficient; repeat for other statement and combination",
        "5. Two valid counterexamples with both statements → answer E"
      ]
    }
  },
  "479": {
    "hint": "Test each statement alone. Statement 2 hides x — convert base 4 to base 2, then solve for x directly.",
    "theory": {
      "title": "Exponent Base Conversion — DS Sufficiency",
      "icon": "🔢",
      "summary": "When bases differ, rewrite everything in the same prime base. 4^x = (2²)^x = 2^(2x), which unlocks the exponent.",
      "keyFacts": [
        "(a^m)^n = a^(mn) — power of a power multiplies exponents",
        "4 = 2² so 4^x = 2^(2x) always",
        "1024 = 2^10 — memorize powers of 2: 2^10 = 1024",
        "If you can solve uniquely for x, 2^x has exactly one value",
        "DS: each statement tested ALONE first; answer D if both independently sufficient"
      ],
      "example": {
        "problem": "What is 2^x? St.1: x = 5. St.2: 4^x = 1024.",
        "steps": [
          "St.1: x = 5 → 2^5 = 32. Unique value. Sufficient.",
          "St.2: 4^x = 1024 → (2^2)^x = 2^10 → 2^(2x) = 2^10",
          "Same base: 2x = 10 → x = 5 → 2^5 = 32. Unique value. Sufficient.",
          "Both statements give the same unique answer independently."
        ],
        "answer": "D — each statement alone pins x = 5, so 2^x = 32."
      },
      "traps": [
        "Forgetting to test St.2 alone — looks 'indirect' but converts cleanly",
        "Not recognizing 1024 = 2^10 and getting stuck",
        "Thinking both statements are needed when each is individually sufficient",
        "Misapplying (2^2)^x as 2^(2+x) instead of 2^(2x)"
      ],
      "solveSteps": [
        "1. St.1 alone: plug in x directly, compute 2^x — sufficient?",
        "2. St.2 alone: convert 4^x → 2^(2x), set equal to 1024 = 2^10, solve for x",
        "3. If x is uniquely determined, 2^x is uniquely determined — sufficient",
        "4. If both alone sufficient → answer D"
      ]
    }
  },
  "480": {
    "hint": "Each statement gives one equation with two unknowns — check if combining pins Alice's rate uniquely. Ask: is ONE statement enough, or do you need BOTH?",
    "theory": {
      "title": "Work-Rate Problems — Combined & Individual Rates",
      "icon": "⚙",
      "summary": "Workers share a task by adding their rates (jobs per hour), not their times. If A does 1/a of the job per hour and B does 1/b, together they finish in 1/(1/a+1/b) hours.",
      "keyFacts": [
        "Rate = 1/time  (fraction of job completed per hour)",
        "Combined rate: 1/A + 1/B = 1/T  (T = time together)",
        "Isolate one unknown: 1/A = 1/T − 1/B",
        "Never add times directly — only rates add",
        "DS: one equation with two unknowns → insufficient alone",
        "DS: two independent equations for two unknowns → sufficient together"
      ],
      "example": {
        "problem": "Alice and Bob finish a job together in 4 hr. Bob alone takes 12 hr. How long does Alice take alone?",
        "steps": [
          "Write combined rate: 1/A + 1/B = 1/4",
          "Substitute B = 12: 1/A + 1/12 = 1/4",
          "1/A = 1/4 − 1/12 = 3/12 − 1/12 = 2/12",
          "1/A = 1/6  →  A = 6 hours"
        ],
        "answer": "6 hours"
      },
      "traps": [
        "Adding times: 4 + 12 = 16 hr — completely wrong, rates not times add",
        "Statement 1 alone: one equation, two unknowns (A and B) — cannot solve",
        "Statement 2 alone: tells us B's rate only, says nothing about A",
        "Forgetting to subtract: 1/A = 1/T − 1/B, not 1/T + 1/B"
      ],
      "solveSteps": [
        "1. Write the combined-rate equation: 1/A + 1/B = 1/T",
        "2. Check Stmt 1: introduces T but not B — two unknowns remain → insufficient",
        "3. Check Stmt 2: introduces B but not T — two unknowns remain → insufficient",
        "4. Combine: Stmt 1 gives T=4, Stmt 2 gives B=12 — one equation, one unknown → solve for A",
        "5. Answer = C — neither alone suffices, both together do"
      ]
    }
  },
  "481": {
    "hint": "Test small counterexamples for S1. For S2: if n² contains a prime factor p^k, what does that force about n's prime factors? Work prime-by-prime.",
    "theory": {
      "title": "Divisibility via Prime Factorization — Square Rule",
      "icon": "🔢",
      "summary": "When a squared number is divisible by some value, you can reverse-engineer minimum prime factors of the original. Squaring doubles every exponent, so halving (ceiling) recovers the original.",
      "keyFacts": [
        "12 = 2² × 3 — to be divisible by 12, n needs at least 2² and 3¹",
        "If n² divisible by p^k → n divisible by p^⌈k/2⌉ (exponents halve on square root)",
        "144 = 12² = 2⁴ × 3² — so n² | 144 forces n | 4 and n | 3, i.e. n | 12",
        "Sufficient ≠ n = 12 exactly; sufficient means ALL valid n are multiples of 12",
        "S1 trap: multiple of 8 = 2³, gives no guarantee of factor 3 — one counterexample kills it",
        "DS rule: find ONE counterexample → insufficient; prove every case satisfies → sufficient"
      ],
      "example": {
        "problem": "Is integer n a multiple of 12?  (1) n is a multiple of 8.  (2) n² is a multiple of 144.",
        "steps": [
          "S1: need 12|n. Try n=8: 8 not mult of 12 (NO). Try n=24: 24 is mult of 12 (YES). Two answers → insufficient.",
          "S2: 144 = 2⁴ × 3². Write n² divisible by 2⁴ → n divisible by 2² = 4.",
          "Write n² divisible by 3² → n divisible by 3¹ = 3.",
          "So n divisible by lcm(4,3) = 12. Every valid n is a multiple of 12 → sufficient.",
          "Answer: S2 alone sufficient, S1 not."
        ],
        "answer": "B — statement 2 forces n to carry 2² and 3¹ (i.e. 12) as factors; statement 1 carries no factor-of-3 guarantee."
      },
      "traps": [
        "Assuming multiples of 8 always cover multiples of 12 — they don't (8 shares only 2s, not 3s)",
        "Forgetting to check BOTH a YES and a NO example when testing insufficiency",
        "Thinking n² | 144 means n | 12 'only sometimes' — the prime-exponent halving is exact and mandatory",
        "Confusing 'n² is a perfect square multiple of 144' with 'n = 12' — n could be 24, 36, etc., but all ARE multiples of 12"
      ],
      "solveSteps": [
        "1. Factor the target: 12 = 2² × 3. n must have both.",
        "2. S1 test: find a multiple of 8 that is NOT a multiple of 12 (n=8). Insufficient.",
        "3. S2 test: factor 144 = 2⁴ × 3². Apply square rule: n needs 2^(4/2)=2² and 3^(2/2)=3¹.",
        "4. Conclude 4×3=12 divides n — every valid n works, so S2 sufficient.",
        "5. Answer B."
      ]
    }
  },
  "482": {
    "hint": "Statement 2: x−y even tells you same parity → does that also fix x+y? Statement 1: xy even means at least one is even — does that pin the sum?",
    "theory": {
      "title": "Parity Arithmetic — Same vs. Mixed",
      "icon": "⚖",
      "summary": "Even/odd status of a sum or difference depends entirely on whether the two integers share parity. Same parity → even result; mixed parity → odd result. This symmetry links +, −, and ×.",
      "keyFacts": [
        "even + even = even, odd + odd = even, even + odd = odd",
        "even − even = even, odd − odd = even, even − odd = odd",
        "x + y and x − y always have the SAME parity (both even or both odd)",
        "xy even ⟺ at least one factor is even (could be mixed parity)",
        "xy odd ⟺ BOTH factors are odd (same parity, so x+y even)",
        "Knowing one of {x+y, x−y, xy} is even does NOT always pin the other"
      ],
      "example": {
        "problem": "x and y are positive integers. Is x + y even?",
        "steps": [
          "Test St(1): xy even. Try (2,3): 2·3=6 even, sum=5 odd. Try (2,4): 2·4=8 even, sum=6 even. Two outcomes → insufficient.",
          "Test St(2): x−y even. Even difference ⟺ same parity.",
          "Same parity means both even or both odd.",
          "Both even: x+y = even. Both odd: x+y = even. Either way, sum is even.",
          "St(2) alone is sufficient."
        ],
        "answer": "B — statement 2 alone pins same parity, guaranteeing even sum; statement 1 allows mixed parity (one even, one odd) so sum could be odd."
      },
      "traps": [
        "xy even does NOT mean both are even — one even + one odd still gives even product but odd sum",
        "Confusing xy odd (forces both odd) with xy even (only forces at least one even)",
        "Forgetting x+y and x−y share the same parity — they rise and fall together",
        "Assuming St(1) and St(2) together are needed when St(2) alone settles it"
      ],
      "solveSteps": [
        "1. Identify the parity question: is x+y even ⟺ are x and y the same parity?",
        "2. Test St(1): xy even → at least one even. Construct counterexamples (one even, one odd vs. both even) to show insufficiency.",
        "3. Test St(2): x−y even → same parity rule → x+y must also be even. No counterexample possible → sufficient.",
        "4. Answer B."
      ]
    }
  },
  "483": {
    "hint": "Rearrange to x(x-1) > 0 and map the two sign regions. Check each statement against those regions — one pins x completely inside one region, one doesn't.",
    "theory": {
      "title": "Quadratic Inequality — Sign-Region Analysis",
      "icon": "📐",
      "summary": "x² > x rearranges to x(x-1) > 0 — positive only when both factors share sign. Map the number line into regions; each statement either nails one region or straddles the boundary.",
      "keyFacts": [
        "x² > x  ⟺  x² − x > 0  ⟺  x(x−1) > 0",
        "x(x−1) > 0 when BOTH same sign: x < 0 OR x > 1",
        "x(x−1) < 0 when signs differ: 0 < x < 1",
        "x² = x exactly at x = 0 and x = 1 (boundary — answer is NO)",
        "DS: a statement is sufficient only if it forces the answer to be ALWAYS YES or ALWAYS NO",
        "Danger zone: x > 0 includes both (0,1) where NO and (1,∞) where YES"
      ],
      "example": {
        "problem": "Is x² > x?  (1) x > 0  (2) x > 1",
        "steps": [
          "Rewrite: x² − x > 0 → x(x−1) > 0",
          "Sign chart: negative on x < 0 [YES], zero at 0 and 1, negative on (0,1) [NO], positive on x > 1 [YES]",
          "Stmt 1: x > 0 covers both (0,1) [NO] and (1,∞) [YES] → two answers → INSUFFICIENT",
          "Stmt 2: x > 1 lands entirely in (1,∞) [always YES] → SUFFICIENT"
        ],
        "answer": "B — statement 2 forces x into the region where x(x−1) > 0 always holds; statement 1 straddles the boundary at x = 1."
      },
      "traps": [
        "Assuming x > 0 guarantees x² > x — false for fractions like x = 1/2",
        "Forgetting x = 1 is a boundary where x² = x (answer is NO, not YES)",
        "Not rearranging first — comparing x² vs x directly by intuition is error-prone",
        "Treating 'x > 0' as 'x is big' — any value in (0,1) kills sufficiency"
      ],
      "solveSteps": [
        "1. Rearrange: x² > x  →  x(x−1) > 0",
        "2. Draw sign chart: YES if x < 0 or x > 1; NO if 0 ≤ x ≤ 1",
        "3. Test each statement: does it confine x to a single-answer zone?",
        "4. Statement lands in mixed zone → INSUFFICIENT; single zone → SUFFICIENT",
        "5. Pick answer based on which statement(s) are sufficient alone"
      ]
    }
  },
  "484": {
    "hint": "Rewrite |x−2|<3 as a compound inequality first, then test each statement against EVERY number in its range.",
    "theory": {
      "title": "Absolute Value Inequalities — Strip the Bars",
      "icon": "📐",
      "summary": "An absolute value inequality |expr| < k unfolds into a double-sided interval. DS asks whether the given statements pin x inside that interval for ALL allowed values.",
      "keyFacts": [
        "|x − a| < k  ⟺  a − k < x < a + k",
        "Always convert |expr| < k to interval form before testing statements",
        "|x − 2| < 3  ⟺  −1 < x < 5",
        "Statement is sufficient only if EVERY value it allows satisfies the target",
        "Combine statements when each alone leaves a counterexample",
        "Combined range is the intersection of both statement ranges"
      ],
      "example": {
        "problem": "Is |x − 2| < 3? (1) x > 0  (2) x < 5",
        "steps": [
          "Rewrite target: |x−2|<3 ⟺ −1 < x < 5",
          "Stmt 1 alone: x > 0 allows x = 10 → |10−2|=8 ≥ 3. NOT sufficient.",
          "Stmt 2 alone: x < 5 allows x = −5 → |−5−2|=7 ≥ 3. NOT sufficient.",
          "Combined: x > 0 AND x < 5 → 0 < x < 5",
          "Since 0 > −1, every x in (0,5) satisfies −1 < x < 5. SUFFICIENT."
        ],
        "answer": "C — neither statement alone excludes all counterexamples, but together they force x into (0,5) ⊂ (−1,5)"
      },
      "traps": [
        "Forgetting to flip the inequality: |x−a| < k does NOT mean x < a+k alone",
        "Testing only one value per statement — you must find a counterexample OR prove all values work",
        "Stmt 1 (x>0) looks 'positive', Stmt 2 (x<5) looks 'bounded' — each intuition is incomplete alone",
        "Stopping at 'both together look right' without verifying the combined range truly fits inside the target"
      ],
      "solveSteps": [
        "1. Convert |expr| < k → double inequality (strip bars first, always)",
        "2. For each statement, find ONE counterexample to check insufficiency",
        "3. If both fail alone, take the intersection of the two statement ranges",
        "4. Verify that intersection is a subset of the target interval",
        "5. If yes → C; if intersection still leaks outside target → E"
      ]
    }
  },
  "485": {
    "hint": "Statement 1 gives two roots — ask if a second condition eliminates one. Statement 2 alone covers infinite values. Try combining.",
    "theory": {
      "title": "DS + Quadratics — Narrowing Two Roots to One",
      "icon": "∩",
      "summary": "A quadratic yields up to two roots, so a single equation rarely pins one unique value. DS sufficiency requires that exactly one root survives all constraints.",
      "keyFacts": [
        "(a)(b)=0 → a=0 OR b=0 — two possible solutions, not one",
        "One equation with two roots = insufficient unless another constraint kills one root",
        "Stmt alone: check ALL solutions satisfy the question — if ambiguous, INSUFFICIENT",
        "Combining stmts: intersect the solution sets — if only one value remains, SUFFICIENT",
        "x>0 or x<0 alone is infinite — it prunes roots only when combined with a finite set",
        "Classic trap: assume quadratic has unique answer when it has two real roots"
      ],
      "example": {
        "problem": "Is x = 3? (1) (x−3)(x+5)=0  (2) x>0",
        "steps": [
          "Stmt 1: x=3 or x=−5. Question 'is x=3?' gets YES for x=3, NO for x=−5. Not definitive → INSUFFICIENT",
          "Stmt 2: x>0. Infinite positive values. Cannot answer 'is x=3?' → INSUFFICIENT",
          "Together: x must satisfy both. From Stmt 1, x∈{3,−5}. Apply x>0 → only x=3 survives",
          "Now 'is x=3?' has definitive YES → SUFFICIENT together"
        ],
        "answer": "C — neither statement alone pins a unique value, but together they eliminate x=−5 leaving only x=3"
      },
      "traps": [
        "Seeing (x−3) in the factor and stopping — the other root x=−5 makes Stmt 1 insufficient alone",
        "Thinking x>0 is meaningful alone — it covers infinitely many values",
        "Forgetting to test BOTH roots of the quadratic against the YES/NO question",
        "Confusing 'x could be 3' with 'x must be 3' — sufficiency requires certainty"
      ],
      "solveSteps": [
        "1. Factor/solve quadratic: list ALL roots",
        "2. For each stmt alone: does every root give the SAME answer (always YES or always NO)? If not → insufficient",
        "3. If both alone insufficient, combine: intersect root set with inequality constraint",
        "4. Check if exactly one value remains — if yes, SUFFICIENT together → C",
        "5. If ambiguity persists even combined → E"
      ]
    }
  },
  "486": {
    "hint": "St.1 matches Pythagorean form exactly — apply the CONVERSE. St.2 only tells you which angle is largest, not how large it is.",
    "theory": {
      "title": "Pythagorean Converse — Proving a Right Angle",
      "icon": "📐",
      "summary": "The Pythagorean theorem runs both ways: a²+b²=c² guarantees a 90° angle opposite c. Longest side alone only ranks angles, never fixes their measures.",
      "keyFacts": [
        "Pythagorean theorem: in a right triangle, leg₁²+leg₂²=hyp²",
        "CONVERSE (equally valid): if a²+b²=c², then the angle opposite c is exactly 90°",
        "In any triangle, largest angle is opposite the longest side — but 'largest' could be 60° or 89°",
        "DS goal: determine whether angle A=90° — need exact confirmation, not just relative size",
        "Statement gives a²+b²=c² with c=BC → angle opposite BC = angle A → 90° confirmed"
      ],
      "example": {
        "problem": "Triangle PQR: is angle P a right angle? (1) PQ²+PR²=QR²  (2) QR is the longest side.",
        "steps": [
          "St.1: PQ²+PR²=QR² matches a²+b²=c² with c=QR",
          "By Pythagorean converse, angle opposite QR = angle P = 90° → SUFFICIENT",
          "St.2: QR longest → angle P is largest angle in triangle",
          "But largest could be 91°, 100°, or 60° if other sides differ — no exact value → INSUFFICIENT"
        ],
        "answer": "A — statement 1 alone is sufficient via Pythagorean converse; statement 2 only establishes P is the largest angle, which could be any value above the others."
      },
      "traps": [
        "Confusing 'longest side' with 'hypotenuse' — hypotenuse is only defined after you KNOW there's a right angle",
        "Thinking St.2 + St.1 adds info — St.1 is already sufficient alone",
        "Applying theorem forward instead of backward — here you're given sides, must infer angle",
        "Assuming any triangle with a longest side must be right — false"
      ],
      "solveSteps": [
        "1. Identify which angle is in question (angle A) and what would confirm 90°",
        "2. St.1: check if it matches a²+b²=c² pattern with the remaining side opposite angle A",
        "3. If yes, Pythagorean converse applies → angle A=90° → SUFFICIENT",
        "4. St.2: longest side → largest angle, but no numeric constraint on that angle → INSUFFICIENT",
        "5. Answer A"
      ]
    }
  },
  "487": {
    "hint": "Two lines intersect iff they are NOT parallel (or the same line). Check slopes — different slopes guarantee intersection regardless of intercepts.",
    "theory": {
      "title": "Line Intersection — Slopes Determine Fate",
      "icon": "📐",
      "summary": "Two distinct lines intersect iff they have different slopes. Same slope = parallel (no intersection) or identical (infinite intersections). One slope fact settles it.",
      "keyFacts": [
        "Two lines intersect ⟺ slopes differ (in Euclidean plane)",
        "Same slope + different intercept = parallel, zero intersections",
        "Same slope + same intercept = same line, infinite intersections",
        "Knowing ONE point on each line tells nothing about slopes",
        "DS goal: determine YES/NO definitively — 'always yes' or 'always no' both = sufficient",
        "If statement allows both parallel and intersecting cases → insufficient"
      ],
      "example": {
        "problem": "Do lines P and Q intersect? (1) P has slope 1, Q has slope 2. (2) P passes through (0,0), Q passes through (2,2).",
        "steps": [
          "Statement 1: slopes 1 ≠ 2 → lines not parallel → must intersect. Definitive YES.",
          "Statement 2: both pass through points on y=x, but slopes unknown.",
          "With stmt 2 alone: both could be y=x (same line, ∞ intersections) or parallel lines through those points.",
          "No unique answer from stmt 2 alone."
        ],
        "answer": "A — statement 1 pins different slopes → guaranteed intersection; statement 2 leaves slope undetermined."
      },
      "traps": [
        "Assuming two points force a unique pair of lines — you need two points PER line to determine a line",
        "Thinking 'they share a nearby region so they must cross' — only slopes matter",
        "Same point on both lines does NOT mean they intersect elsewhere in a useful sense for DS",
        "Forgetting that 'sufficient' means the answer is always YES or always NO — not just sometimes"
      ],
      "solveSteps": [
        "1. Rephrase: lines intersect ⟺ slopes differ (distinct lines).",
        "2. Statement 1: compare slopes directly — different → always YES, same → always NO → sufficient either way.",
        "3. Statement 2: check if slopes are fully determined — if not, test parallel vs. intersecting cases.",
        "4. If stmt 2 gives only points (not slopes), try constructing both a parallel pair and an intersecting pair through those points.",
        "5. Mark sufficient only if every possible configuration gives the same YES/NO answer."
      ]
    }
  },
  "488": {
    "hint": "Each statement alone leaves multiple dimension combos. Ask: does adding the other statement eliminate all ambiguity and pin one unique area?",
    "theory": {
      "title": "Integer-Sided Rectangles — Perimeter + Constraint",
      "icon": "▭",
      "summary": "Perimeter fixes the sum of two sides, not each side individually. You need a second fact — one specific side — to resolve which integer pair applies.",
      "keyFacts": [
        "Rectangle perimeter P = 2(l + w), so each statement about P gives l + w = P/2",
        "Integer constraint limits pairs to a finite list — enumerate them",
        "Knowing only l + w leaves multiple (l, w) pairs → multiple areas",
        "Knowing only one side leaves the other free → infinite areas",
        "Knowing l + w AND one side pins both sides uniquely → unique area",
        "DS goal: does information reduce candidates to exactly ONE value?"
      ],
      "example": {
        "problem": "Integer-sided rectangle. Is area determined by: (1) perimeter = 14, (2) one side = 5?",
        "steps": [
          "Statement 1: l + w = 7. Integer pairs: (1,6),(2,5),(3,4). Areas: 6, 10, 12 — NOT unique",
          "Statement 2: one side = 5, other side unknown positive integer — NOT unique",
          "Together: l + w = 7 and one side = 5 → other side = 2. Only pair (5,2). Area = 10 — UNIQUE"
        ],
        "answer": "C — neither alone pins one area, but combined they eliminate all ambiguity"
      },
      "traps": [
        "Assuming perimeter alone determines area — it only fixes the SUM of sides",
        "Forgetting integer constraint narrows the list but may still leave multiple valid pairs",
        "Missing that (1,6) and (2,5) and (3,4) all satisfy statement 1 — list ALL pairs",
        "Thinking statement 2 alone is enough because 5 is specific — the other side is still free"
      ],
      "solveSteps": [
        "1. For each statement: list ALL valid (l, w) integer pairs satisfying that constraint",
        "2. Count distinct areas from that list — if >1, statement is insufficient alone",
        "3. If both alone fail, combine: find pairs satisfying BOTH constraints simultaneously",
        "4. If combined list yields exactly one area → answer C; if still ambiguous → answer E",
        "5. Check: could a different valid pair also satisfy both constraints? If yes, not sufficient"
      ]
    }
  },
  "489": {
    "hint": "Each statement gives one equation with two unknowns (x, V). Ask: does each alone pin x > 30, or do you need both?",
    "theory": {
      "title": "Dilution — Acid Amount Is Conserved",
      "icon": "🧪",
      "summary": "Adding pure water changes volume but NOT the acid quantity. So acid_before = acid_after. One dilution equation has two unknowns (conc, volume) — need both to solve.",
      "keyFacts": [
        "Acid amount = concentration × volume",
        "Adding pure water: acid_new = acid_old → c₁·V₁ = c₂·(V₁ + water added)",
        "Rearranged: c₁ = c₂·(V₁ + added) / V₁",
        "One dilution equation, two unknowns → underdetermined without volume",
        "DS: statement pins a relationship, not a unique value, unless volume also fixed",
        "Sufficiency = can you answer YES/NO definitively, not just compute x"
      ],
      "example": {
        "problem": "Solution is x% acid. Adding 5 L water → 25%. Is x > 30?",
        "steps": [
          "Let V = original volume, A = acid volume",
          "After dilution: A/(V+5) = 0.25 → A = 0.25(V+5)",
          "x = A/V = 0.25(V+5)/V = 0.25 + 1.25/V",
          "V=5 → x=50% (>30); V=100 → x≈26.3% (<30) → Statement 1 alone: insufficient",
          "Add V=10 (stmt 2): A=0.25×15=3.75; x=3.75/10=37.5% → YES x>30"
        ],
        "answer": "C — neither statement alone fixes both unknowns, but together they yield x = 37.5% > 30 uniquely"
      },
      "traps": [
        "Assuming statement 1 alone is sufficient because it 'mentions a percent'",
        "Forgetting that c₁V₁ = c₂V₂ only holds when no solute is added/removed",
        "Using V=10 from statement 2 back into statement 1 without recognizing you need both",
        "Mixing up which volume is pre- vs post-dilution in the equation"
      ],
      "solveSteps": [
        "1. Write the conserved-acid equation: c₁·V = c₂·(V + water_added)",
        "2. Count unknowns — here c₁ (=x) and V are both unknown",
        "3. Test stmt 1 alone: one equation, two unknowns → try two valid V values, get contradictory YES/NO → insufficient",
        "4. Test stmt 2 alone: fixes V but gives no info on acid amount → insufficient",
        "5. Together: two equations, two unknowns → unique x → answer YES/NO definitively → C"
      ]
    }
  },
  "490": {
    "hint": "Travel time alone can't tell you arrival order — arrival = start time + travel time. Ask what info is still missing even after both statements.",
    "theory": {
      "title": "DS Trap — Travel Time ≠ Arrival Time",
      "icon": "🕐",
      "summary": "Knowing how long a trip takes says nothing about when you arrive. Arrival time = departure time + travel time. Missing either piece leaves the question open.",
      "keyFacts": [
        "Arrival time = departure time + travel time",
        "Travel time = distance ÷ speed (both statements give this)",
        "DS sufficiency requires pinning the COMPARISON, not just one variable",
        "Even identical travel times → can't rank arrivals without start times",
        "'Did X happen before Y?' needs absolute timestamps, not durations"
      ],
      "example": {
        "problem": "Alice drove 60 mi at 30 mph; Bob drove 90 mi at 45 mph. Did Alice arrive first?",
        "steps": [
          "Alice travel time = 60/30 = 2 hr",
          "Bob travel time = 90/45 = 2 hr",
          "Both took same time — but when did each leave?",
          "If Alice left at 9am, arrived 11am; Bob left at 8am, arrived 10am → Bob first",
          "If Alice left at 8am, arrived 10am; Bob left at 9am, arrived 11am → Alice first",
          "No start times given → cannot determine order"
        ],
        "answer": "E — even combined, start times are unknown, so arrival order is indeterminate"
      },
      "traps": [
        "Assuming equal travel times → equal arrival times (ignores start times)",
        "Assuming they started simultaneously (never stated)",
        "Computing travel time and thinking the question is answered",
        "Confusing 'travel time' with 'arrival time' — they differ by departure offset"
      ],
      "solveSteps": [
        "1. Compute what each statement actually gives (travel time = dist/speed)",
        "2. Identify what the question really requires (arrival time = departure + travel)",
        "3. Check: is departure time given or implied? No → gap remains",
        "4. Test both statements together — same gap exists",
        "5. Conclude: still missing departure times → insufficient"
      ]
    }
  },
  "491": {
    "hint": "Knowing the floor and ceiling of a set doesn't pin the sum. Build a YES case and a NO case under both statements combined before choosing E.",
    "theory": {
      "title": "Mean Sufficiency — Bounds Don't Determine Sum",
      "icon": "📊",
      "summary": "Average = sum ÷ count. Knowing the smallest or largest value constrains only one element; the remaining n−1 elements can float freely, leaving the sum — and thus the mean — indeterminate.",
      "keyFacts": [
        "Average needs the SUM: avg > k ⟺ sum > k·n",
        "Knowing min only guarantees every value ≥ min — says nothing about the others",
        "Knowing max only guarantees every value ≤ max — middle values still unconstrained",
        "Both bounds together restrict range to [min, max] but n−2 middle values roam freely",
        "Sum range under both bounds: [n·min, n·max] — can straddle any threshold inside that interval",
        "DS rule: if you can build one YES case AND one NO case, the statement(s) are insufficient"
      ],
      "example": {
        "problem": "7-number list. Smallest = 8, largest = 14. Is the average > 10?",
        "steps": [
          "Need: is sum > 70?",
          "YES case: {8, 14, 14, 14, 14, 14, 14} → sum = 92, avg ≈ 13.1 > 10 ✓",
          "NO case:  {8, 8, 8, 8, 8, 8, 14} → sum = 62, avg ≈ 8.9 < 10 ✓",
          "Both cases satisfy smallest=8 AND largest=14",
          "Two contradicting answers → both statements together insufficient"
        ],
        "answer": "E — even with min=8 and max=14, the five middle values are free to push the average above or below 10"
      },
      "traps": [
        "'Smallest is 8 so avg ≥ 8' — true, but doesn't answer whether avg > 10",
        "'Together they bound the range' — bounding ≠ pinning; [8,14] straddles 10",
        "Assuming average must be near the midpoint (11) — no such constraint exists",
        "Forgetting to test the combined case: stmt 1 + stmt 2 together can still be E"
      ],
      "solveSteps": [
        "1. Reframe: is sum of 7 numbers > 70?",
        "2. Test stmt 1 alone: fix smallest=8, vary rest — build avg < 10 and avg > 10 → insufficient",
        "3. Test stmt 2 alone: fix largest=14, vary rest — build avg < 10 and avg > 10 → insufficient",
        "4. Test both together: fix smallest=8, largest=14, float middle 5 — YES and NO both achievable → insufficient",
        "5. Answer E"
      ]
    }
  },
  "492": {
    "hint": "SD = 0 when all elements identical; SD > 0 only when ≥2 DISTINCT values exist. Check each statement: does it force distinct values, or could all elements still be equal?",
    "theory": {
      "title": "Standard Deviation — Zero vs Positive",
      "icon": "σ",
      "summary": "SD measures spread from the mean. SD = 0 iff every element equals the mean — i.e., all values identical. Even a large set can have SD = 0 if all elements repeat.",
      "keyFacts": [
        "SD = 0 ⟺ all elements in set are identical",
        "SD > 0 ⟺ at least 2 DISTINCT values exist",
        "Knowing one element's value says nothing about other elements",
        "Knowing count of elements says nothing about whether they differ",
        "For DS: need to prove all elements MUST differ — not just that they COULD differ",
        "{5, 5, 5} has SD = 0; {5, 6} has SD > 0"
      ],
      "example": {
        "problem": "Is SD of set S greater than 0? (1) S contains 5. (2) S has ≥2 elements.",
        "steps": [
          "SD > 0 requires at least 2 distinct values — reframe the question",
          "Stmt 1: S contains 5 — could be {5} (SD=0) or {5,6} (SD>0). Insufficient",
          "Stmt 2: S has ≥2 elements — could be {5,5} (SD=0) or {5,6} (SD>0). Insufficient",
          "Together: S has ≥2 elements and contains 5 — try {5,5}: SD=0. Try {5,6}: SD>0",
          "Still two outcomes possible → combined insufficient"
        ],
        "answer": "E — both statements together still permit {5,5} (SD=0) or {5,6} (SD>0), so the question cannot be answered."
      },
      "traps": [
        "Thinking 'contains a specific number' implies uniqueness — it doesn't",
        "Thinking '≥2 elements' implies distinct values — repeated elements are allowed",
        "Combining the two statements and assuming they must interact to force distinctness",
        "Forgetting SD=0 is possible for multi-element sets if all elements are equal"
      ],
      "solveSteps": [
        "1. Rephrase target: SD > 0 ⟺ set contains ≥2 DISTINCT values",
        "2. Test stmt 1 alone: construct YES case and NO case with element 5 present",
        "3. Test stmt 2 alone: construct YES case and NO case with ≥2 elements",
        "4. Test combined: find one case where SD=0 AND both stmts satisfied — if found, answer is E",
        "5. {5,5} satisfies both stmts and gives SD=0 → combined insufficient → E"
      ]
    }
  },
  "493": {
    "hint": "Each statement gives C(n,k)=constant — set up the formula, solve for n. Check each statement alone: does it pin n to exactly one integer?",
    "theory": {
      "title": "Combinations — Solving for n",
      "icon": "🔢",
      "summary": "C(n,k) is a polynomial in n. Given C(n,k)=constant, you can solve for n algebraically; a positive-integer constraint usually yields exactly one solution.",
      "keyFacts": [
        "C(n,2) = n(n−1)/2  →  quadratic in n",
        "C(n,3) = n(n−1)(n−2)/6  →  cubic in n",
        "Set equal to given value, multiply out, solve; discard non-positive roots",
        "For small k (2 or 3), one positive integer solution is virtually guaranteed",
        "DS: if each statement uniquely determines n, answer is D",
        "Never assume you need both statements until you've tested each alone"
      ],
      "example": {
        "problem": "Club has n people. C(n,2)=28. Find n.",
        "steps": [
          "n(n−1)/2 = 28  →  n(n−1) = 56",
          "n² − n − 56 = 0  →  (n−8)(n+7) = 0",
          "n = 8 or n = −7; discard negative",
          "n = 8  ✓",
          "Verify: 8×7/2 = 28 ✓"
        ],
        "answer": "n = 8"
      },
      "traps": [
        "Forgetting to discard the negative root from the quadratic",
        "Assuming both statements are needed before testing each alone",
        "Confusing C(n,2) with P(n,2) — permutations are n(n−1), no division by 2",
        "Skipping the verify step — always plug back in to confirm"
      ],
      "solveSteps": [
        "1. Write the combination formula for the given k: C(n,2)=n(n−1)/2 or C(n,3)=n(n−1)(n−2)/6",
        "2. Set equal to the given value and clear the denominator",
        "3. Expand and solve the resulting polynomial; keep only positive integer roots",
        "4. If exactly one valid n found → statement is sufficient",
        "5. Test each statement independently; if both alone pin n → answer is D"
      ]
    }
  },
  "494": {
    "hint": "Probability needs a ratio, not a count. Ask: does each statement let you compute red/(red+blue)?",
    "theory": {
      "title": "Probability from Ratios vs. Counts",
      "icon": "🔵",
      "summary": "P(red) = red / total. A count alone is useless without total; a part-to-part ratio immediately gives P because it fixes the proportion of the whole.",
      "keyFacts": [
        "P(event) = favorable / total — BOTH numerator and denominator must be determined",
        "Part-to-part ratio a:b → part-to-whole fractions a/(a+b) and b/(a+b)",
        "Absolute count fixes numerator only; total stays unknown unless another constraint locks it",
        "Ratio constrains proportion, not magnitude — sufficient for probability, insufficient for counts",
        "DS: sufficiency means one unique numeric answer, not a range or 'it depends'"
      ],
      "example": {
        "problem": "Bag has red and blue only. P(red) = ? (1) 5 red marbles. (2) red:blue = 1:2",
        "steps": [
          "St1: P = 5/total. Total unknown (could be 6, 10, 100). Infinite answers. NOT sufficient.",
          "St2: red:blue = 1:2 → red = k, blue = 2k, total = 3k for any k > 0",
          "P(red) = k / 3k = 1/3. k cancels — unique answer. SUFFICIENT.",
          "St1+St2 together: 5 red, ratio 1:2 → blue=10, total=15, P=1/3. But St2 alone already done."
        ],
        "answer": "B — statement 2 pins P(red) = 1/3 via ratio; statement 1 gives a count with no total, leaving P undefined."
      },
      "traps": [
        "Thinking 5 red is enough — probability needs total, not just favorable count",
        "Assuming ratio and count together are needed when ratio alone suffices",
        "Confusing part-to-part ratio (1:2) with part-to-whole fraction (1/3)",
        "Forgetting that ratio magnitude (k) cancels out in a probability computation"
      ],
      "solveSteps": [
        "1. Identify what P(red) needs: red count AND total count (or their ratio)",
        "2. Test St1: does it pin total? No → NOT sufficient",
        "3. Test St2: does ratio fix proportion? Yes, 1/(1+2)=1/3 → SUFFICIENT",
        "4. Answer B — no need to test combined",
        "5. DS check: unique numeric value = sufficient; any ambiguity = not sufficient"
      ]
    }
  },
  "495": {
    "hint": "Factor the constant into primes — if unique prime factorization forces both exponents, statement 1 may pin x alone. Check each statement independently first.",
    "theory": {
      "title": "Unique Prime Factorization — Exponent Matching",
      "icon": "🔢",
      "summary": "Every integer has exactly one prime factorization. If 2^x · 3^y = N and N's prime factors are only 2 and 3, matching exponents gives unique x and y — no algebra needed.",
      "keyFacts": [
        "Fundamental Theorem: every integer > 1 has a unique prime factorization",
        "2^x · 3^y = N ⇒ x = power of 2 in N, y = power of 3 in N (exact match, no other solution)",
        "96 = 2⁵ · 3¹ — factor any constant before deciding sufficiency",
        "Positive integer constraint rules out x=0 or y=0, tightening uniqueness",
        "DS flow: test each statement alone, then together only if both fail alone"
      ],
      "example": {
        "problem": "x, y positive integers. 2^x · 3^y = 96. What is x?",
        "steps": [
          "Factor 96: 96 = 2 × 48 = 2 × 2 × 24 = … = 2⁵ × 3",
          "Match bases: 2^x = 2⁵ → x = 5; 3^y = 3¹ → y = 1",
          "Unique factorization means no other positive-integer (x,y) satisfies this",
          "Statement 1 alone determines x = 5"
        ],
        "answer": "A — statement 1 uniquely forces x=5 via prime factorization; statement 2 gives y but says nothing about x"
      },
      "traps": [
        "Thinking you need y to find x — prime factorization gives both simultaneously",
        "Assuming statement 2 helps: y=1 alone doesn't constrain x at all",
        "Forgetting to factor the constant — treat 96 as a mystery number and miss the lock",
        "Skipping the 'positive integers' constraint — it rules out fractional or zero exponents"
      ],
      "solveSteps": [
        "1. Factor the constant completely into primes (96 = 2⁵ · 3¹)",
        "2. Statement 1: match prime bases — unique factorization ⇒ x and y both fixed. Sufficient?",
        "3. Statement 2: does it constrain x at all without Statement 1? Check independently",
        "4. If S1 sufficient alone → answer is A or D; test S2 to distinguish",
        "5. S2 alone gives y=1 but x is free → insufficient → answer A"
      ]
    }
  },
  "496": {
    "hint": "List integer triples where SA=22 AND min side=1 — if two give different volumes, both statements together fail. Never assume integers lock one solution.",
    "theory": {
      "title": "Rectangular Solid — Integer Side Enumeration",
      "icon": "📦",
      "summary": "SA and a side constraint together may still allow multiple (l,w,h) triples with different volumes. Integer constraints narrow the field but don't guarantee uniqueness.",
      "keyFacts": [
        "Volume = l × w × h",
        "Surface Area = 2(lw + lh + wh)",
        "SA = 22 → lw + lh + wh = 11",
        "With positive integers, enumerate triples systematically: fix smallest, try all combos",
        "Two triples can share SA and min-side yet differ in volume → E",
        "Sufficiency = ONE value, not 'a small set of values'"
      ],
      "example": {
        "problem": "Box has positive integer sides. SA = 22 and smallest side = 1. What is volume?",
        "steps": [
          "SA = 22 → lw+lh+wh = 11",
          "Try (1,1,h): 1+h+h = 11 → 2h = 10 → h = 5. V = 5",
          "Try (1,2,h): 2+h+2h = 11 → 3h = 9 → h = 3. V = 6",
          "Both (1,1,5) and (1,2,3) satisfy SA=22 and min=1",
          "Two different volumes → cannot determine V"
        ],
        "answer": "E — even combining both statements, V = 5 or V = 6 are both valid; ambiguity remains."
      },
      "traps": [
        "Assuming integer constraints always pin one solution — they often don't",
        "Checking only one triple and calling it sufficient",
        "Forgetting to verify min-side = 1 on all candidates",
        "Thinking statement 1 alone is enough because SA=22 'looks restrictive'"
      ],
      "solveSteps": [
        "1. Write the formula: SA = 2(lw+lh+wh); shrink to lw+lh+wh = 11",
        "2. Statement (1) alone: enumerate integer triples summing to 11 — find ≥2 with different V → insufficient",
        "3. Statement (2) alone: min=1 gives no surface or volume info → clearly insufficient",
        "4. Both together: filter statement (1) triples to those with min=1 — still find (1,1,5) and (1,2,3) → different V",
        "5. Two valid solutions → NOT sufficient → answer E"
      ]
    }
  },
  "497": {
    "hint": "Two unknowns — count your equations. Each statement gives one equation; ask whether that alone pins a unique value.",
    "theory": {
      "title": "Two Unknowns — Counting Equations (DS)",
      "icon": "🔢",
      "summary": "With two unknowns you need two independent equations for a unique solution. On DS, each statement typically supplies one equation — test both together when each alone leaves a range.",
      "keyFacts": [
        "n unknowns → need n independent equations for unique solution",
        "One linear equation, two unknowns → infinitely many solutions (not sufficient alone)",
        "Two independent linear equations, two unknowns → exactly one solution (sufficient)",
        "Check independence: equations are dependent if one is a scalar multiple of the other",
        "Revenue equation (price × qty) + count equation = classic 2-statement combo",
        "Together sufficient (C) when EACH alone fails but BOTH together uniquely solve"
      ],
      "example": {
        "problem": "Total revenue $1,000 from items A ($10 each) and B ($25 each); 70 items sold total. How many A?",
        "steps": [
          "St.1 alone: 10A + 25B = 1000 → infinite integer pairs (A=0,B=40 or A=25,B=30 …) — NOT sufficient",
          "St.2 alone: A + B = 70 → infinite pairs (A=0,B=70 or A=10,B=60 …) — NOT sufficient",
          "Together: 10A + 25B = 1000 and A + B = 70 → two independent equations",
          "Substitute B = 70 − A: 10A + 25(70 − A) = 1000 → −15A = −750",
          "A = 50, B = 20 — unique solution"
        ],
        "answer": "C — neither statement alone pins the value, but together they form a 2×2 system with exactly one solution"
      },
      "traps": [
        "Assuming St.1 (prices) alone is enough — one equation, two unknowns → always underdetermined",
        "Assuming St.2 (total count) alone is enough — same issue, no price constraint",
        "Forgetting to verify independence — two equations that are multiples of each other still fail",
        "Not checking if non-negativity / integer constraints reduce solutions further before concluding"
      ],
      "solveSteps": [
        "1. Count unknowns (here: 2 — qty A and qty B)",
        "2. Translate each statement into an equation; note which unknowns appear",
        "3. Test St.1 alone: one equation, two unknowns → multiple solutions → NOT sufficient",
        "4. Test St.2 alone: one equation, two unknowns → multiple solutions → NOT sufficient",
        "5. Combine: two independent equations, two unknowns → unique solution → SUFFICIENT together → C"
      ]
    }
  },
  "498": {
    "hint": "f(2) = 2a + b needs both a and b pinned. Check whether each statement resolves the full system — one equation alone leaves a free variable.",
    "theory": {
      "title": "Linear Function DS — Two Unknowns Need Two Equations",
      "icon": "📐",
      "summary": "f(x) = ax + b has two unknowns (a, b). Each evaluated point gives exactly one equation. Sufficiency requires the system to be fully determined.",
      "keyFacts": [
        "f(x) = ax + b: slope a, intercept b — 2 independent unknowns",
        "f(0) = b directly — reveals only intercept, not slope",
        "f(k) = ak + b → one linear equation in a and b",
        "Two distinct x-values yield two independent equations → unique a, b",
        "DS rule: count free unknowns; count independent constraints — match needed",
        "If one statement gives partial info (1 of 2 unknowns), check if the other fills the gap"
      ],
      "example": {
        "problem": "f(x) = ax + b. Find f(2). (1) f(0) = 3. (2) f(1) = 5.",
        "steps": [
          "Need f(2) = 2a + b — two unknowns",
          "Stmt 1: f(0) = a·0 + b = b = 3. Knows b, but a is free → f(2) = 2a + 3 can be anything. NOT sufficient.",
          "Stmt 2: f(1) = a + b = 5. One equation, two unknowns → infinitely many (a,b) pairs. NOT sufficient.",
          "Together: b = 3 AND a + b = 5 → a = 2. f(2) = 2(2) + 3 = 7. Unique answer.",
          "Answer: C"
        ],
        "answer": "C — neither statement alone pins both a and b, but combined the 2×2 system has a unique solution giving f(2) = 7."
      },
      "traps": [
        "Stmt 2 looks stronger because it involves both a and b — but one equation, two unknowns is still underdetermined",
        "Assuming a=1 or b=0 by default — GMAT never lets you assume a parameter",
        "Forgetting f(0) is a special case that isolates b only",
        "Treating 'I found one unknown' as sufficient when the target expression needs both"
      ],
      "solveSteps": [
        "1. Identify unknowns: f(x) = ax + b has two (a, b). Target f(2) = 2a + b.",
        "2. Stmt 1 alone: substitute x=0. How many unknowns remain?",
        "3. Stmt 2 alone: substitute x=1. How many unknowns remain?",
        "4. If each leaves ≥1 free variable → not sufficient alone.",
        "5. Combined: solve the 2-equation system; if unique solution → answer C."
      ]
    }
  },
  "499": {
    "hint": "Statement 1 uses the exact definition of prime — ask whether that alone pins the answer. Statement 2 gives odd & >2, but find one counterexample to test sufficiency.",
    "theory": {
      "title": "Primality — Definition & DS Sufficiency",
      "icon": "🔢",
      "summary": "A prime has exactly 2 positive divisors: 1 and itself. If a statement restates the definition, it is automatically sufficient — no examples needed.",
      "keyFacts": [
        "Prime definition: exactly 2 positive divisors (1 and itself)",
        "1 is NOT prime — it has only 1 divisor",
        "2 is the only even prime",
        "Odd + greater than 2 ≠ prime (e.g., 9 = 3×3 has 3 divisors)",
        "DS sufficiency test: find YES case + NO case from the same statement → insufficient",
        "If statement = logical equivalent of the question, it is sufficient by definition"
      ],
      "example": {
        "problem": "Is positive integer n prime? (1) n has exactly 2 positive divisors. (2) n is odd and greater than 2.",
        "steps": [
          "Statement 1: '2 positive divisors' is word-for-word the definition of prime → always YES → sufficient",
          "Statement 2: try n=5 (prime, odd, >2) → YES; try n=9 (odd, >2, divisors 1,3,9) → NO",
          "Statement 2 gives both YES and NO → insufficient",
          "Statement 1 alone decides; Statement 2 does not"
        ],
        "answer": "A — Statement 1 restates the definition of prime, making it sufficient alone. Statement 2 admits composites like 9."
      },
      "traps": [
        "Assuming odd + >2 excludes all composites — 9, 15, 21, 25 are counterexamples",
        "Forgetting 1 is not prime when checking edge cases",
        "Thinking both statements together are needed when one already settles it",
        "Confusing 'has a factor other than 1 and itself' (composite) with 'has exactly 2 divisors' (prime)"
      ],
      "solveSteps": [
        "1. For each statement independently: can it produce BOTH a prime and a non-prime? If yes → insufficient",
        "2. Statement 1: count divisors = 2 ↔ prime by definition → sufficient, stop",
        "3. Statement 2: generate counterexample (9 is odd, >2, not prime) → insufficient",
        "4. Conclusion: Statement 1 alone sufficient, Statement 2 alone not → answer A"
      ]
    }
  },
  "500": {
    "hint": "Two sides alone leave BC in a range; the angle alone gives shape but no scale. Ask: do both together pin one unique triangle?",
    "theory": {
      "title": "Pythagorean Theorem — Fixing a Unique Triangle",
      "icon": "📐",
      "summary": "Knowing two sides of a triangle fixes a range for the third, not one value. Add a right angle and the Pythagorean theorem collapses that range to exactly one answer.",
      "keyFacts": [
        "Triangle inequality: |a−b| < c < a+b — two sides give a range, not a unique length",
        "Right triangle: a²+b²=c² (c = hypotenuse, opposite the 90° angle)",
        "Angle alone (no side) → shape is fixed but size is not (infinitely many similar triangles)",
        "Two sides + included angle → law of cosines pins the third side uniquely",
        "Classic 3-4-5 right triangle: legs 3,4 ⇒ hypotenuse = √(9+16) = 5",
        "For DS: ask whether statements together eliminate ALL ambiguity, not just some"
      ],
      "example": {
        "problem": "Triangle ABC. What is BC? (1) AB=3, AC=4. (2) Angle A=90°.",
        "steps": [
          "S1 alone: triangle inequality gives 1 < BC < 7 — infinitely many valid lengths. Not sufficient.",
          "S2 alone: right angle at A, but no side lengths known — infinitely many similar triangles. Not sufficient.",
          "Combined: right angle at A means BC is the hypotenuse. BC = √(AB²+AC²) = √(9+16) = √25 = 5.",
          "One unique value → sufficient together."
        ],
        "answer": "C — neither statement alone pins BC, but together the right angle converts the two known legs into a unique hypotenuse via a²+b²=c²."
      },
      "traps": [
        "S1 trap: 3+4=7 is the max, not the answer — two sides don't fix the third",
        "S2 trap: 'right triangle' sounds powerful but without any side length it fixes nothing",
        "Forgetting the angle is AT vertex A, making AB and AC the legs (not one of them the hypotenuse)",
        "Assuming 3-4-5 without confirming the right angle is between the two known sides"
      ],
      "solveSteps": [
        "1. Test S1 alone: do two sides uniquely determine the third? No — triangle inequality gives a range.",
        "2. Test S2 alone: does the angle alone (no sides) determine lengths? No — similar triangles exist.",
        "3. Combine: right angle at A + two adjacent sides → apply a²+b²=c² → unique BC.",
        "4. Confirm the angle is the INCLUDED angle between the two known sides, making them legs.",
        "5. Answer C — both together sufficient, neither alone sufficient."
      ]
    }
  },
  "501": {
    "hint": "Causal claim: bike lanes → more biking. Find what rules out coincidence or rival causes — replication across many cases is the gold standard strengthener.",
    "theory": {
      "title": "Strengthen — Causal Arguments",
      "icon": "🔗",
      "summary": "To strengthen 'X caused Y,' show the same X→Y pattern holds elsewhere, or eliminate rival explanations. One data point could be coincidence; consistent replication across cases makes causation credible.",
      "keyFacts": [
        "Strengthen = add info that makes conclusion MORE likely to be true",
        "Causal argument weakness: correlation ≠ causation; maybe Z caused Y",
        "Best strengthener: replication (same result in other contexts rules out local quirks)",
        "Also strong: eliminate an alternative cause, show X precedes Y, show dose-response",
        "Weak strengtheners: loosely related facts, tiny scope, off-topic data",
        "CR answer must connect directly to the gap between evidence and conclusion"
      ],
      "example": {
        "problem": "City adds bike lanes → 40% more bike commuting. Council: bike lanes cause the increase. Which strengthens?",
        "steps": [
          "Identify claim: bike lanes (cause) → more biking (effect)",
          "Find the gap: maybe bike commuting was rising anyway, or some other local factor drove it",
          "Ask: what would close that gap?",
          "Replication in 5 other cities = same treatment, same effect, different contexts → rules out local coincidence",
          "This directly supports the causal link, not just correlation on one street"
        ],
        "answer": "Five other cities saw the same pattern — replication eliminates coincidence and local confounders, making the causal link credible."
      },
      "traps": [
        "Tangentially related facts (bike sales up 5%) seem relevant but don't address causation",
        "Irrelevant actions (switching to walking, recycled materials) distract — check: does it close the argument gap?",
        "Bigger/busier street just means more exposure, doesn't confirm the causal mechanism",
        "One-city data is always vulnerable to 'it would have happened anyway' — replication fixes this"
      ],
      "solveSteps": [
        "1. Identify: conclusion (causal claim) and the gap (could be coincidence or rival cause)",
        "2. Pre-phrase what would close the gap (replication, ruling out alternatives, mechanism)",
        "3. Test each choice: does it directly address that gap?",
        "4. Eliminate off-topic or weakly connected choices",
        "5. Pick the one that most directly makes the conclusion harder to deny"
      ]
    }
  },
  "502": {
    "hint": "Strengthen = close the gap between evidence and conclusion. Look for what rules out alternative explanations for the study result — not off-topic perks.",
    "theory": {
      "title": "CR Strengthen — Eliminating Alternative Explanations",
      "icon": "🔬",
      "summary": "A study conclusion is only as strong as its controls. Strengthening means removing rival causes that could explain the result without the drug working.",
      "keyFacts": [
        "Strengthen = make conclusion MORE likely true given the new fact",
        "Target the gap: evidence (lower BP after 6 mo) → conclusion (Drug X is better)",
        "Biggest threat to comparative studies: selection bias — groups differ BEFORE treatment",
        "Random assignment + matched baselines = groups comparable → difference attributable to drug",
        "Off-scope facts (cost, market age, side effects) don't affect whether X beats Y on efficacy",
        "Funding source is usually a weakener, not strengthener — raises doubt about bias"
      ],
      "example": {
        "problem": "Drug X study shows lower BP vs Drug Y after 6 months. Which fact best supports the claim X is superior?",
        "steps": [
          "Identify claim: X reduces BP better than Y",
          "Identify evidence gap: maybe X-group started with lower BP (selection bias)",
          "Check each choice: does it close that gap?",
          "Random assignment + similar baselines → groups comparable before treatment → BP difference must come from the drug",
          "Cost, market age, side effects → don't address whether X actually works better"
        ],
        "answer": "Random assignment with similar baselines — eliminates selection bias, so the BP difference is credibly due to X"
      },
      "traps": [
        "Funding source (E) looks relevant but WEAKENS by suggesting bias, not strengthening",
        "Side effects (D) are off-scope — they don't speak to efficacy comparison",
        "Market longevity (C) says nothing about relative effectiveness",
        "Cost (B) is a manufacturing fact, irrelevant to clinical outcome"
      ],
      "solveSteps": [
        "1. Identify the conclusion and the evidence supporting it",
        "2. Spot the gap: what alternative explanation could undermine the causal link?",
        "3. Scan choices for the one that closes that gap (rules out the rival cause)",
        "4. Eliminate choices that are off-scope, irrelevant, or actually weaken",
        "5. Confirm: does your chosen fact make the conclusion more likely true — and only that?"
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
