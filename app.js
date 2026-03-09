// Core flashcard data: topic, question, answer
// Each card id matches the "Flashcard N" from the GMAT Club PDF.
const FLASHCARDS = [
  {
    id: 1,
    topic: "Word Problems • Compound Interest",
    question: `Q. If $20,000 is invested at 12% annual interest, compounded
quarterly, what is the balance after 1 year?
A) $22,000
B) $22,400
C) $22,510
D) $22,600
E) $24,000`,
    answer: `A. Correct choice: C.
Use A = P(1 + r/n)^{nt} with P = 20,000, r = 0.12, n = 4, t = 1.
A = 20,000 × (1 + 0.12/4)^4 = 20,000 × 1.03^4 ≈ $22,510.18.`
  },
  {
    id: 2,
    topic: "Word Problems • Mixtures",
    question: `Q. 14 liters of apple juice is mixed with cranberry juice. If the
resulting mix is 65% cranberry, how many liters of the mix were
produced?
A) 20
B) 26
C) 34
D) 40
E) 60`,
    answer: `A. Correct choice: D.
Let c be liters of cranberry. c/(14+c) = 0.65 ⇒ c = 26, total = 40 liters.`
  },
  {
    id: 3,
    topic: "Word Problems • Work Formula",
    question: `Q. What is the standard formula setup for a two-worker work problem?`,
    answer: `A. Rates add. If A alone takes a hours and B alone takes b hours, then
1/T = 1/a + 1/b so T = ab/(a + b).`
  },
  {
    id: 4,
    topic: "Word Problems • Work Together",
    question: `Q. Robert can unload a truck in 8 hours. Doug can unload it in 6
hours. If they work together, how long will it take?
A) 3 hours
B) 3.33 hours
C) 3.43 hours
D) 4 hours
E) 7 hours`,
    answer: `A. Correct choice: C.
Combined rate = 1/8 + 1/6 = 7/24 job per hour, so T = 24/7 hours ≈ 3.43
hours.`
  },
  {
    id: 5,
    topic: "Word Problems • Groups: Both/Neither",
    question: `Q. Out of 90 attendees, 50 registered for Basic and 60 for
Advanced. If 20 registered for neither, how many registered for
both?
A) 20
B) 30
C) 35
D) 40
E) 50`,
    answer: `A. Correct choice: D.
Use Group1 + Group2 − Both + Neither = Total
50 + 60 − Both + 20 = 90
Both = 40.`
  },
  {
    id: 6,
    topic: "Word Problems • Groups with Ratios",
    question: `Q. An office of 120 employees is split male:female in a 3:5 ratio.
If 40% are married and 20 of the married are men, how many
women are single?
A) 27
B) 35
C) 45
D) 47
E) 55`,
    answer: `A. Correct choice: D.
Men = 45, women = 75. Married total = 48. Married women = 28. Single women = 47.`
  },
  {
    id: 7,
    topic: "Word Problems • Feed and Chickens (Hard)",
    question: `Q. If a farmer sells 15 chickens, the feed lasts 4 more days. If he
buys 20 chickens, the feed runs out 3 days earlier. How many
chickens does he have originally?
A) 12
B) 24
C) 48
D) 55
E) 60`,
    answer: `A. Correct choice: E.
Let n be original chickens and T be original days of feed.
nT = (n − 15)(T + 4) = (n + 20)(T − 3). Solving gives T = 12, n = 60.`
  },
  {
    id: 8,
    topic: "Word Problems • Chess Moves (Ultra Hard)",
    question: `Q. In a chess tourney, White made 2319 moves and Black made
2315. In any game, whoever made the last move did not lose. Which
can be true?
I. Blacks lost 5 games
II. Blacks won more games than Whites
III. All games were draws
A) I only
B) II only
C) III only
D) I and II
E) II and III`,
    answer: `A. Correct choice: E.
Difference in moves is 4, so Whites made the last move in exactly 4
games, which could not be Black wins. The rest could be Black wins
or draws.
Thus II and III can be true; I cannot.`
  },
  {
    id: 9,
    topic: "Word Problems • Percent DS",
    question: `Q. A price was increased by x% then decreased by y%. Is the new
price higher than the original?
(1) x > y  (2) x = 1.2y`,
    answer: `A. Neither statement alone nor together is sufficient. Answer: E.`
  },
  {
    id: 10,
    topic: "Word Problems • Exponential Growth",
    question: `Q. A bacteria colony doubles every day and fills the habitat in 20
days. If two identical colonies start together, when will they fill it?
A) 6.33
B) 7.5
C) 10
D) 15
E) 19`,
    answer: `A. Correct choice: E.
Starting with twice the mass shifts the timeline one day earlier. 19 days.`
  },
  {
    id: 11,
    topic: "Statistics • Average of Consecutive Integers",
    question: `Q. The average of 5 consecutive integers is 12. What is the
average of the even-only integers among them?
A) 10
B) 12
C) 13.5
D) 18
E) 36`,
    answer: `A. Correct choice: B.
Integers are 10, 11, 12, 13, 14. Even-only set 10, 12, 14 has average 12.`
  },
  {
    id: 12,
    topic: "Statistics • Average Over Days",
    question: `Q. For K days, Liv baked an average of 55 cupcakes per day. Today
Liv and John baked 100 together and the average rose to 60. Find K.
A) 8
B) 9
C) 10
D) 12
E) 13`,
    answer: `A. Correct choice: A.
Total after today: 60(K + 1) = 55K + 100
K = 8.`
  },
  {
    id: 13,
    topic: "Statistics • Mean",
    question: `Q. How do you compute the arithmetic mean?`,
    answer: `A. Mean = (sum of all terms) ÷ (number of terms).`
  },
  {
    id: 14,
    topic: "Statistics • Median",
    question: `Q. How do you find the median?`,
    answer: `A. Order the data. The median is the middle term. If the count is even,
take the average of the two middle terms.`
  },
  {
    id: 15,
    topic: "Statistics • Mode",
    question: `Q. How do you find the mode?`,
    answer: `A. The mode is the value that occurs most often. There can be more
than one mode.`
  },
  {
    id: 16,
    topic: "Statistics • Range",
    question: `Q. How do you find the range?`,
    answer: `A. Range = largest − smallest. Sorting helps.`
  },
  {
    id: 17,
    topic: "Statistics • Standard Deviation Concept",
    question: `Q. On the GMAT, do you compute exact SD? What is the concept?`,
    answer: `A. Usually you estimate. SD measures spread around the mean. Adding
a constant leaves SD unchanged; multiplying all values by k multiplies
SD by |k|.`
  },
  {
    id: 18,
    topic: "Statistics • Scale Change and SD",
    question: `Q. Set S = {67,32,76,35,101,45,24,37}. If every element is
decreased by 17%, how does SD change?
A) Increases by 17%
B) Decreases by 17%
C) Unchanged
D) Cannot be determined
E) Increases by 83%`,
    answer: `A. Correct choice: B.
Multiplying by 0.83 scales SD by 0.83, so SD decreases by 17%.`
  },
  {
    id: 19,
    topic: "Statistics • DS on Consecutive Evens",
    question: `Q. What is the SD of a set of consecutive even integers?
(1) There are 39 elements.
(2) The mean of the set is 382.`,
    answer: `A. For evenly spaced sets, SD depends on spacing and count, not on the
mean. Spacing is 2, so knowing count is sufficient.
Answer: A.`
  },
  {
    id: 20,
    topic: "Statistics • Reduce SD the Most",
    question: `Q. Set A has 19 integers, mean 4, SD 3. You add two integers to
form set B. Which pair reduces SD the most?
A) (9,3)
B) (-3,3)
C) (6,1)
D) (4,5)
E) (5,5)`,
    answer: `A. Correct choice: D.
Values closest to the mean reduce SD the most. Pair (4,5).`
  },
  {
    id: 21,
    topic: "Probability & Combinatorics • Enumeration Basics",
    question: `Q. There are 3 marbles: blue, gray, green. In how many ways can
they be arranged in a row?
A) 3
B) 4
C) 5
D) 6
E) 9`,
    answer: `A. Correct choice: D.
Use 3! = 6 permutations.`
  },
  {
    id: 22,
    topic: "Probability & Combinatorics • Enumeration with a Block",
    question: `Q. 3 marbles: blue, gray, green. If blue and green must be
adjacent, how many arrangements are possible?
A) 2
B) 3
C) 4
D) 5
E) 6`,
    answer: `A. Correct choice: C.
Treat BG as one block. Arrangements: 2! × 2 = 4.`
  },
  {
    id: 23,
    topic: "Probability & Combinatorics • Simple Factorial",
    question: `Q. In how many ways can 5 distinct dresses be arranged in a store
display?
A) 24
B) 60
C) 96
D) 120
E) 720`,
    answer: `A. Correct choice: D.
5! = 120.`
  },
  {
    id: 24,
    topic: "Probability & Combinatorics • Last Digit of 1! + 2! + … + N! (DS)",
    question: `Q. For positive integer N, what is the last digit of 1! + 2! + … + N! ?
(1) N is even. (2) N > 3.`,
    answer: `A. For N > 3, the sum ends with 3 because 5! onward end with 0. Either
statement implies N > 3. Answer: D.`
  },
  {
    id: 25,
    topic: "Probability & Combinatorics • Combinations",
    question: `Q. How many ways to choose k objects from n distinct objects
when order does not matter?`,
    answer: `A. C(n, k) = n! / [k!(n − k)!].`
  },
  {
    id: 26,
    topic: "Probability & Combinatorics • Permutations",
    question: `Q. How many ways to arrange k objects from n distinct objects
when order matters?`,
    answer: `A. P(n, k) = n! / (n − k)!.`
  },
  {
    id: 27,
    topic: "Probability & Combinatorics • Combos vs Permutations",
    question: `Q. What is the difference between combinations and
permutations? When do you use each?`,
    answer: `A. Permutations care about order; combinations do not. Use
permutations when positions are distinct; combinations when
selecting an unordered group.`
  },
  {
    id: 28,
    topic: "Probability & Combinatorics • Round Table",
    question: `Q. Six partners dine at a round table. How many distinct seatings are
possible?
A) 24
B) 60
C) 96
D) 120
E) 720`,
    answer: `A. Correct choice: D.
Fix one seat for rotation symmetry. (6 − 1)! = 120.`
  },
  {
    id: 29,
    topic: "Probability & Combinatorics • Left of Rachel",
    question: `Q. There are 5 chairs in a row. In how many ways can Bob and
Rachel sit so that Bob is always to the left of Rachel?
A) 5
B) 8
C) 10
D) 12
E) 20`,
    answer: `A. Correct choice: C.
Choose 2 chairs C(5,2) = 10; in each pair exactly one order has Bob left
of Rachel or 10.`
  },
  {
    id: 30,
    topic: "Probability & Combinatorics • Partitions into Pairs",
    question: `Q. In how many ways can 8 people be divided into 4 unlabeled
teams of 2 each?
A) 90
B) 105
C) 168
D) 420
E) 2520`,
    answer: `A. Correct choice: B.
Answer = 8! / [(2!)^4 × 4!] = 105.`
  },
  {
    id: 31,
    topic: "Probability & Combinatorics • Probability Basics",
    question: `Q. What is P(E)? What is P(not E)?`,
    answer: `A. P(E) = favorable/total. P(not E) = 1 − P(E).`
  },
  {
    id: 32,
    topic: "Probability & Combinatorics • Coin and Die",
    question: `Q. What is P(Tails) for a fair coin? What is P(rolling a 4) on a fair die?`,
    answer: `A. P(Tails) = 1/2. P(4) = 1/6.`
  },
  {
    id: 33,
    topic: "Probability & Combinatorics • Jar Probability",
    question: `Q. A bucket has 10 green and 90 white marbles. If one marble is
drawn at random, what is the probability it is green?
A) 1/2
B) 1/5
C) 1/10
D) 1/11
E) 1/20`,
    answer: `A. Correct choice: C.
10/(10 + 90) = 1/10.`
  },
  {
    id: 34,
    topic: "Probability & Combinatorics • Independent Events",
    question: `Q. For a fair coin and a fair die, what is the probability of getting
Heads and a 4 in one flip and one roll?
A) 1/2
B) 1/6
C) 1/12
D) 1/18
E) 1/24`,
    answer: `A. Correct choice: C.
(1/2) × (1/6) = 1/12.`
  },
  {
    id: 35,
    topic: "Probability & Combinatorics • Two-Day Weather",
    question: `Q. If the chance of rain on any day is 20%, what is the probability it
rains on day 1 and is sunny on day 2?
A) 0.04
B) 0.16
C) 0.36
D) 0.64
E) 0.80`,
    answer: `A. Correct choice: B.
0.20 × 0.80 = 0.16.`
  },
  {
    id: 36,
    topic: "Probability & Combinatorics • Odd from Two Sets",
    question: `Q. Choose one number from {1,3,6,7,8} and one from {3,5,2}.
What is the probability both numbers are odd?
A) 1/5
B) 2/5
C) 3/5
D) 2/3
E) 3/8`,
    answer: `A. Correct choice: B.
(3/5) × (2/3) = 2/5.`
  },
  {
    id: 37,
    topic: "Probability & Combinatorics • At Least a 3",
    question: `Q. If Jessica rolls a fair die, what is the probability of rolling at least
a 3?
A) 1/6
B) 1/3
C) 1/2
D) 2/3
E) 5/6`,
    answer: `A. Correct choice: D.
Outcomes {3,4,5,6}: 4/6 = 2/3.`
  },
  {
    id: 38,
    topic: "Probability & Combinatorics • Committee of Two",
    question: `Q. There are 8 employees including Bob and Rachel. If 2 are
chosen at random for a committee, what is the probability both
are Bob and Rachel?
A) 1/8
B) 1/16
C) 1/28
D) 1/56
E) 1/64`,
    answer: `A. Correct choice: C.
Total committees C(8,2) = 28. Favorable = 1. Probability = 1/28.`
  },
  {
    id: 39,
    topic: "Probability & Combinatorics • Committee of Two: Three Methods",
    question: `Q. Repeat of the prior question. Show three ways to get 1/28.`,
    answer: `A. Method 1: 1/C(8,2) = 1/28.
Method 2: Sequential draw without replacement (Bob then Rachel)
with 2! orderings gives 1/28.
Method 3: Not useful here; use 1 or 2.`
  },
  {
    id: 40,
    topic: "Probability & Combinatorics • Conditional Drawing",
    question: `Q. A jar has 1 gray, 2 white, and 4 green balls. Julia wins if the first
ball is green; otherwise she draws a second ball and wins if the
two balls are white or if the first is gray and the second is white.
What is P(win)?
A) 1/3
B) 2/3
C) 4/7
D) 11/21
E) 5/7`,
    answer: `A. Correct choice: B.
P(first green) = 4/7.
If first not green: P(white then white) = (2/7)(1/6) = 1/21;
P(gray then white) = (1/7)(2/6) = 1/21.
Total = 4/7 + 1/21 + 1/21 = 2/3.`
  },
  {
    id: 41,
    topic: "Arithmetic • Percent Basics",
    question: `Q. What is the basic percent relation? How much is 15% of 20?`,
    answer: `A. Part = Rate × Base. 15% of 20 = 3.`
  },
  {
    id: 42,
    topic: "Arithmetic • Percent Change",
    question: `Q. What is the formula for percent change? If pay rises from
$15/hr to $18/hr, what is the percent increase?
A) 15%
B) 18%
C) 20%
D) 25%
E) 30%`,
    answer: `A. Correct choice: C.
Percent change = (new − old)/old × 100%. Here: (18 − 15)/15 = 20%.`
  },
  {
    id: 43,
    topic: "Arithmetic • Tripled Output",
    question: `Q. If production tripled last year, by what percent did it increase?
A) 100%
B) 200%
C) 250%
D) 300%
E) 333%`,
    answer: `A. Correct choice: B.
Increase factor 3 ⇒ increase of 200%.`
  },
  {
    id: 44,
    topic: "Arithmetic • Percent Equality",
    question: `Q. 50% of 25 is 25% of what number?
A) 25
B) 50
C) 75
D) 100
E) 200`,
    answer: `A. Correct choice: B.
0.5 × 25 = 0.25 × x ⇒ x = 50.`
  },
  {
    id: 45,
    topic: "Arithmetic • Odd and Even Rules",
    question: `Q. List quick parity rules for addition and multiplication.`,
    answer: `A. Addition: even±even = even; odd±odd = even; even±odd = odd.
Multiplication: even×anything = even; odd×odd = odd.`
  },
  {
    id: 46,
    topic: "Arithmetic • Is Zero Even?",
    question: `Q. Is 0 odd or even?`,
    answer: `A. Zero is even. It is neither positive nor negative.`
  },
  {
    id: 47,
    topic: "Arithmetic • Divisibility Cheatsheet",
    question: `Q. Quick divisibility tests for 2, 3, 4, 5, 6, and 9.`,
    answer: `A.
2: last digit even.
3: sum of digits is multiple of 3.
4: last two digits a multiple of 4.
5: last digit 0 or 5.
6: divisible by 2 and 3.
9: sum of digits is multiple of 9.`
  },
  {
    id: 48,
    topic: "Arithmetic • Sum of Three Consecutive Evens",
    question: `Q. Which integer can be expressed as a sum of three consecutive
even integers?
A) 200
B) 303
C) 400
D) 554
E) 570`,
    answer: `A. Correct choice: E.
Sum of three consecutive evens is divisible by 3 and even. Only 570 fits.`
  },
  {
    id: 49,
    topic: "Arithmetic • Counting Integers Inclusive",
    question: `Q. How many integers are there between 1 and 21 inclusive?
A) 19
B) 20
C) 21
D) 22
E) 23`,
    answer: `A. Correct choice: C.
Use N − M + 1
21 − 1 + 1 = 21.`
  },
  {
    id: 50,
    topic: "Arithmetic • Multiples and LCM",
    question: `Q. What is a multiple? How to find LCM quickly?`,
    answer: `A. Multiples are integer products. For LCM, take highest prime powers
across the numbers.`
  },
  {
    id: 51,
    topic: "Arithmetic • LCM of 18 and 24",
    question: `Q. Find LCM(18, 24).
A) 36
B) 48
C) 60
D) 72
E) 144`,
    answer: `A. Correct choice: D.
18 = 2 × 3^2; 24 = 2^3 × 3. LCM = 2^3 × 3^2 = 72.`
  },
  {
    id: 52,
    topic: "Arithmetic • Translate Words to Math",
    question: `Q. The product of three and four is reduced by five and then
increased by the difference between the original product and
eight. What is the result?
A) 7
B) 9
C) 11
D) 15
E) 19`,
    answer: `A. Correct choice: C.
3×4 = 12; 12 − 5 = 7; original − 8 = 4; 7 + 4 = 11.`
  },
  {
    id: 53,
    topic: "Arithmetic • Reciprocal",
    question: `Q. What is the reciprocal of a nonzero number x?
List two key properties.`,
    answer: `A. The reciprocal is 1/x. Key facts: x × (1/x) = 1;
the reciprocal of a/b is b/a.`
  },
  {
    id: 54,
    topic: "Arithmetic • Absolute Value Steps",
    question: `Q. What is the 3-step approach to solving |expression| equations
and inequalities?`,
    answer: `A.
1) Split cases by sign.
2) Solve each case.
3) Check case conditions.`
  },
  {
    id: 55,
    topic: "Arithmetic • Solve |x − 1| = 4",
    question: `Q. Find all solutions to |x − 1| = 4.
A) −7
B) −3
C) 3
D) 5
E) −3 and 5`,
    answer: `A. Correct choice: E.
x − 1 = 4
x = 5; x − 1 = −4
x = −3.`
  },
  {
    id: 56,
    topic: "Arithmetic • Solve |x − 5| = 10",
    question: `Q. Find all solutions to |x − 5| = 10.
A) −10 and 10
B) −5 and 5
C) −5 and 10
D) −5 and 15
E) 5 and 15`,
    answer: `A. Correct choice: D.
x − 5 = 10
x = 15;
x − 5 = −10
x = −5.`
  },
  {
    id: 57,
    topic: "Arithmetic • Number of Factors",
    question: `Q. How many positive factors does 462 have?
A) 8
B) 12
C) 14
D) 16
E) 18`,
    answer: `A. Correct choice: D.
Prime factorization: 462 = 2 × 3 × 7 × 11. Number of factors = (1+1)^4 = 16.`
  },
  {
    id: 58,
    topic: "Arithmetic • Factors: Odd Count Exception",
    question: `Q. Do integers usually have an odd or even number of positive
factors? What is the exception?`,
    answer: `A. Most have an even number. Perfect squares are the exception and
have an odd number of factors.`
  },
  {
    id: 59,
    topic: "Arithmetic • Sum of Integers −9 to 2",
    question: `Q. What is the sum of −9, −8, −7, −6, −5, −4, −3, −2, −1, 0, 1, 2?
A) −54
B) −45
C) −42
D) −36
E) 0`,
    answer: `A. Correct choice: C.
Sum = −45 + 0 + 3 = −42.`
  },
  {
    id: 60,
    topic: "Arithmetic • Sum of Evenly Spaced Set",
    question: `Q. What is the sum of 9, 12, 15, 18, 21, 24?
A) 90
B) 96
C) 99
D) 102
E) 108`,
    answer: `A. Correct choice: C.
Average × count = (9 + 24)/2 × 6 = 16.5 × 6 = 99.`
  },
  {
    id: 61,
    topic: "Arithmetic • Recurring Decimal to Fraction",
    question: `Q. Express 0.393939… as a fraction in lowest terms.
A) 13/99
B) 13/66
C) 13/33
D) 39/99
E) 43/99`,
    answer: `A. Correct choice: C.
Let x = 0.393939… Then 100x − x = 39 ⇒ x = 39/99 = 13/33.`
  }
];


// ─── STORAGE / CONSTANTS ─────────────────────────
const STORAGE_KEY    = "gmat-math-trainer-progress-v1";
const META_KEY       = "__meta";
const ATTEMPTS_KEY   = "__attempts";
const DAILY_KEY      = "__daily";
const DRILL_HIST_KEY = "__drillHistory";

const MISTAKE_TYPES  = ["concept_gap","careless","misread","slow_strategy","no_shortcut"];
const MISTAKE_LABELS = {
  concept_gap:   "Concept gap",
  careless:      "Careless",
  misread:       "Misread",
  slow_strategy: "Slow strategy",
  no_shortcut:   "No shortcut"
};

// ─── HELPERS ─────────────────────────────────────
function normaliseDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function humanTime(seconds) {
  if (!seconds || seconds <= 0) return "0m";
  const m = Math.floor(seconds / 60), s = Math.floor(seconds % 60);
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}
function cardAccuracy(s) {
  if (!s || s.attempts === 0) return null;
  return s.correct / s.attempts;
}
function formatAccuracy(s) {
  if (!s || s.attempts === 0) return "—";
  return `${Math.round((s.correct/s.attempts)*100)}% (${s.correct}/${s.attempts})`;
}
function formatDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(undefined, { month:"short", day:"numeric" });
  } catch { return "—"; }
}

// ─── LOAD / SAVE ─────────────────────────────────
function loadProgress() {
  return window._supabaseProgress ? { ...window._supabaseProgress } : {};
}
function saveProgress(p) {
  window._supabaseProgress = p;
}

function ensureMeta(p) {
  if (!p[META_KEY]) p[META_KEY] = {};
  const m = p[META_KEY];
  m.streak            = m.streak            ?? 0;
  m.lastStudyDate     = m.lastStudyDate     ?? null;
  m.xpTotal           = m.xpTotal           ?? 0;
  m.xpToday           = m.xpToday           ?? 0;
  m.todayDate         = m.todayDate         ?? null;
  m.totalSecondsToday = m.totalSecondsToday ?? 0;
  m.attemptsToday     = m.attemptsToday     ?? 0;
  m.correctToday      = m.correctToday      ?? 0;
  return m;
}
function ensureAttempts(p) {
  if (!Array.isArray(p[ATTEMPTS_KEY])) p[ATTEMPTS_KEY] = [];
  return p[ATTEMPTS_KEY];
}
function ensureDaily(p) {
  if (!p[DAILY_KEY] || typeof p[DAILY_KEY] !== "object") p[DAILY_KEY] = {};
  return p[DAILY_KEY];
}
function ensureDrillHistory(p) {
  if (!Array.isArray(p[DRILL_HIST_KEY])) p[DRILL_HIST_KEY] = [];
  return p[DRILL_HIST_KEY];
}
function updateMetaForToday(meta, daily, now) {
  const todayStr = normaliseDate(now);
  if (meta.todayDate !== todayStr) {
    if (meta.lastStudyDate) {
      const last = new Date(meta.lastStudyDate + "T00:00:00");
      const diff = Math.round(Math.abs(now.setHours(0,0,0,0) - last) / 86400000);
      meta.streak = diff === 1 ? (meta.streak||0) + 1 : 1;
    } else {
      meta.streak = 1;
    }
    meta.todayDate         = todayStr;
    meta.xpToday           = 0;
    meta.totalSecondsToday = 0;
    meta.attemptsToday     = 0;
    meta.correctToday      = 0;
  }
  meta.lastStudyDate = todayStr;
  if (!daily[todayStr]) daily[todayStr] = { seen:0, correct:0, seconds:0 };
}

// ─── SPACED REPETITION ───────────────────────────
const SR_INTERVALS = {
  correct:     3 * 24 * 60 * 60 * 1000,
  wrong:       1 * 24 * 60 * 60 * 1000,
  wrong_twice: 4 * 60 * 60 * 1000
};
function srNextReview(s, wasCorrect) {
  const now = Date.now();
  if (wasCorrect) return now + SR_INTERVALS.correct;
  const wrongCount = (s.wrong || 0) + 1;
  if (wrongCount >= 2) return now + SR_INTERVALS.wrong_twice;
  return now + SR_INTERVALS.wrong;
}
function srIsDue(s) {
  if (!s || s.attempts === 0) return false;
  if (!s.next_review) return true;
  return Date.now() >= s.next_review;
}

// ─── CARD SELECTION ──────────────────────────────
function computeCardScore(s, nowMs) {
  if (!s || s.attempts === 0) return -1;
  const acc       = s.correct / s.attempts;
  const wrong     = s.wrong || 0;
  const daysSince = s.lastSeen ? (nowMs - new Date(s.lastSeen).getTime()) / 86400000 : 30;
  return wrong * 3 + (1 - acc) * 5 + daysSince;
}
function pickNextCard(progress, mode, topicFilter, currentId) {
  const nowMs = Date.now();
  const pool = FLASHCARDS.filter(c => {
    if (topicFilter !== "all" && c.topic !== topicFilter) return false;
    const s = progress[c.id];
    if (mode === "new")  return !s || s.attempts === 0;
    if (mode === "weak") {
      if (!s || s.attempts === 0) return false;
      const acc = cardAccuracy(s);
      return acc === null || acc < 0.7 || (s.wrong||0) >= 2;
    }
    return true;
  });
  let candidates = pool.length > 0 ? pool
    : FLASHCARDS.filter(c => topicFilter === "all" || c.topic === topicFilter);
  if (!candidates.length) return null;
  const due      = candidates.filter(c => srIsDue(progress[c.id]));
  const newCards  = candidates.filter(c => !progress[c.id] || progress[c.id].attempts === 0);
  let scoredPool  = due.length > 0 ? due : (newCards.length > 0 ? newCards : candidates);
  const scored    = scoredPool.map(c => ({
    card: c,
    score: computeCardScore(progress[c.id], nowMs) + Math.random() * 0.5
  }));
  scored.sort((a, b) => b.score - a.score);
  const best = scored.filter(x => x.card.id !== currentId);
  return (best.length > 0 ? best : scored)[0].card;
}

// ─── STATS ───────────────────────────────────────
function computeStats(p) {
  let seen = 0, correct = 0, attempts = 0;
  FLASHCARDS.forEach(c => {
    const s = p[c.id];
    if (s && s.attempts > 0) { seen++; attempts += s.attempts; correct += s.correct||0; }
  });
  return {
    total: FLASHCARDS.length, seen,
    accuracy: attempts === 0 ? 0 : Math.round(correct/attempts*100),
    attempts, correct
  };
}
function getTopics() {
  return [...new Set(FLASHCARDS.map(c => c.topic))].sort();
}
function computeMistakeAnalytics(attempts) {
  const counts = {};
  MISTAKE_TYPES.forEach(t => counts[t] = 0);
  let total = 0;
  attempts.forEach(a => {
    if (!a.correct && a.mistakeType && a.mistakeType in counts) {
      counts[a.mistakeType]++; total++;
    }
  });
  return { counts, total };
}
function computeTopicWeakness(attempts) {
  const map = {};
  attempts.forEach(a => {
    const c = FLASHCARDS.find(x => x.id === a.cardId);
    if (!c) return;
    if (!map[c.topic]) map[c.topic] = { attempts:0, correct:0 };
    map[c.topic].attempts++;
    if (a.correct) map[c.topic].correct++;
  });
  return Object.entries(map)
    .map(([topic, s]) => ({ topic, attempts:s.attempts, accuracy: s.attempts ? s.correct/s.attempts : null }))
    .sort((a,b) => (a.accuracy??0) - (b.accuracy??0));
}

// ─── CHART INSTANCES (global) ────────────────────
let mistakeChartInst  = null;
let accuracyChartInst = null;
let timeChartInst     = null;
let cardsChartInst    = null;
function destroyChart(inst) { if (inst) { try { inst.destroy(); } catch {} } }

// ─── GLOBAL APP STATE ────────────────────────────
// These are shared between initAppWithCloudData and DOMContentLoaded
let _appProgress    = {};
let _appMeta        = {};
let _appAttempts    = [];
let _appDaily       = {};
let _appDrillHist   = [];
let _currentMode    = "all";
let _currentTopic   = "all";
let _currentCard    = null;
let _drillActive    = false;
let _drillTotal     = 10;
let _drillDone      = 0;
let _drillRemaining = 2 * 60;
let _drillTimerId   = null;
let _drillCorrect   = 0;
let _pendingWrong   = false;
let _qStartedAt     = null;
let _qTimerId       = null;
let _domReady       = false;

// ─── DOM REFS (populated on DOMContentLoaded) ────
const $ = id => document.getElementById(id);
let _dom = {};

// ─── RENDER FUNCTIONS (global) ───────────────────
function _updateShowAnswerBtn(showing) {
  if (!_dom.btnShowAnswer) return;
  if (showing) {
    _dom.btnShowAnswer.innerHTML = '<span class="material-symbols-outlined">visibility_off</span> Hide Answer <span class="ml-1 text-xs opacity-70 font-medium px-2 py-0.5 bg-white/20 rounded">SPACE</span>';
  } else {
    _dom.btnShowAnswer.innerHTML = '<span class="material-symbols-outlined">visibility</span> Show Answer <span class="ml-1 text-xs opacity-70 font-medium px-2 py-0.5 bg-white/20 rounded">SPACE</span>';
  }
}

function _stopQTimer() { clearInterval(_qTimerId); _qTimerId = null; }
function _startQTimer() {
  _stopQTimer();
  _qStartedAt = Date.now();
  if (_dom.practiceTimer) _dom.practiceTimer.textContent = "";
  _qTimerId = setInterval(() => {
    const e = Math.floor((Date.now() - _qStartedAt) / 1000);
    if (_dom.practiceTimer) _dom.practiceTimer.textContent = humanTime(e);
  }, 1000);
}
function _stopDrillTimer() { clearInterval(_drillTimerId); _drillTimerId = null; }

function _updateSessionLabel() {
  if (!_dom.sessionLabel) return;
  if (_drillActive) {
    _dom.sessionLabel.textContent = `⚡ Drill Q${_drillDone+1}/${_drillTotal} · ${humanTime(_drillRemaining)} left`;
  } else {
    _dom.sessionLabel.textContent = "";
  }
}

function renderCard(card) {
  if (!_dom.cardQuestion) return;
  if (!card) {
    if (_dom.cardTopic)  _dom.cardTopic.textContent  = "";
    if (_dom.cardId)     _dom.cardId.textContent     = "";
    if (_dom.cardSrBadge) { _dom.cardSrBadge.className = "pill-sr"; _dom.cardSrBadge.textContent = ""; }
    _dom.cardQuestion.textContent = "No card available for this filter.";
    if (_dom.cardAnswer) _dom.cardAnswer.classList.add("hidden");
    if (_dom.cardStats)  _dom.cardStats.textContent  = "";
    return;
  }
  const s = _appProgress[card.id];
  if (_dom.cardTopic)  _dom.cardTopic.textContent = card.topic;
  if (_dom.cardId)     _dom.cardId.textContent    = `#${card.id}`;
  if (_dom.cardSrBadge) {
    _dom.cardSrBadge.className = "pill-sr";
    if (!s || s.attempts === 0) {
      _dom.cardSrBadge.className = "pill-sr new";
      _dom.cardSrBadge.textContent = "NEW";
    } else if (srIsDue(s)) {
      _dom.cardSrBadge.className = "pill-sr due";
      _dom.cardSrBadge.textContent = "DUE";
    } else {
      _dom.cardSrBadge.textContent = "";
    }
  }
  _dom.cardQuestion.textContent = card.question;
  const answerTextEl = _dom.cardAnswer?.querySelector(".answer-text");
  if (answerTextEl) answerTextEl.textContent = card.answer;
  if (_dom.cardAnswer) _dom.cardAnswer.classList.add("hidden");
  _updateShowAnswerBtn(false);
  if (s && s.attempts > 0) {
    const pct = Math.round(s.correct / s.attempts * 100);
    const lbl = pct < 60 ? "weak" : pct < 80 ? "ok" : "strong";
    if (_dom.cardStats) _dom.cardStats.textContent = `Attempts: ${s.attempts}  ·  Correct: ${s.correct}  ·  Accuracy: ${pct}% (${lbl})`;
  } else {
    if (_dom.cardStats) _dom.cardStats.textContent = "New card — no history yet.";
  }
  const _rb = document.getElementById("rating-buttons");
  if (_rb) _rb.classList.add("locked");
  _updateShowAnswerBtn(false);
  _updateSessionLabel();
  // Render MCQ choices
  _renderChoices(card);
}

function _renderChoices(card) {
  const q = _dom.cardQuestion;
  if (!q) return;
  const old = document.getElementById("mcq-choices");
  if (old) old.remove();
  const lines   = card.question.split("\n");
  const choices = lines.filter(l => l.trim().match(/^[A-E]\)/));
  if (!choices.length) return;
  const wrapper = document.createElement("div");
  wrapper.id = "mcq-choices";
  wrapper.style.cssText = "margin-top:20px;display:grid;gap:10px;text-align:left";
  choices.forEach(line => {
    const letter = line.trim()[0];
    const btn    = document.createElement("button");
    btn.className = "choice-btn p-3 rounded-lg border border-slate-700 hover:bg-slate-700 transition text-left text-sm";
    btn.innerHTML = `<b>${letter}.</b> ${line.slice(2).trim()}`;
    btn.onclick = () => {
      document.querySelectorAll(".choice-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      card.userChoice = letter;
    };
    wrapper.appendChild(btn);
  });
  q.after(wrapper);
}

function loadNextCard() {
  _currentCard = pickNextCard(_appProgress, _currentMode, _currentTopic, _currentCard?.id ?? null);
  renderCard(_currentCard);
  _startQTimer();
}

// ─── REFRESH FUNCTIONS (global) ──────────────────
function refreshStats() {
  if (!_domReady) return;
  const s = computeStats(_appProgress);
  if (_dom.statTotal)    _dom.statTotal.textContent    = s.total;
  if (_dom.statSeen)     _dom.statSeen.textContent     = s.seen;
  if (_dom.statAccuracy) _dom.statAccuracy.textContent = `${s.accuracy}%`;
  if (_dom.statStreak)   _dom.statStreak.textContent   = `${_appMeta.streak||0}d`;
  if (_dom.statXpToday)  _dom.statXpToday.textContent  = _appMeta.xpToday || 0;
  if (_dom.statTimeToday) _dom.statTimeToday.textContent = humanTime(_appMeta.totalSecondsToday||0);
  const accToday = _appMeta.attemptsToday
    ? Math.round(_appMeta.correctToday / _appMeta.attemptsToday * 100)
    : null;
  if (_dom.snapshotAcc)  _dom.snapshotAcc.textContent  = accToday != null ? `${accToday}%` : "—";
  const avgT = _appMeta.attemptsToday && _appMeta.totalSecondsToday
    ? (_appMeta.totalSecondsToday/_appMeta.attemptsToday).toFixed(1)
    : null;
  if (_dom.snapshotTime) _dom.snapshotTime.textContent = avgT ? `${avgT}s` : "—";
  const dailyBar = document.getElementById("daily-goal-bar");
  if (dailyBar) dailyBar.style.width = Math.min(100, Math.round((_appMeta.attemptsToday||0)/25*100)) + "%";
}

function refreshSidePanel() {
  if (!_domReady) return;
  if (_dom.ssSeen)    _dom.ssSeen.textContent    = _appMeta.attemptsToday || 0;
  if (_dom.ssCorrect) _dom.ssCorrect.textContent = _appMeta.correctToday  || 0;
  if (_dom.ssXp)      _dom.ssXp.textContent      = _appMeta.xpToday       || 0;
  if (_dom.ssNextReview) {
    if (_currentCard && _appProgress[_currentCard.id]?.next_review) {
      const nr = new Date(_appProgress[_currentCard.id].next_review);
      _dom.ssNextReview.textContent = nr.toLocaleDateString(undefined, { month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" });
    } else {
      _dom.ssNextReview.textContent = "—";
    }
  }
  if (_dom.srDueCount) _dom.srDueCount.textContent = FLASHCARDS.filter(c => srIsDue(_appProgress[c.id])).length;
  if (_dom.srNewCount) _dom.srNewCount.textContent = FLASHCARDS.filter(c => !_appProgress[c.id] || _appProgress[c.id].attempts === 0).length;
  const topics = computeTopicWeakness(_appAttempts);
  if (_dom.weakTopicsPanel) {
    _dom.weakTopicsPanel.innerHTML = "";
    if (!topics.length) {
      _dom.weakTopicsPanel.innerHTML = `<p class="hint text-xs text-slate-500">No data yet.</p>`;
    } else {
      topics.slice(0, 8).forEach(t => {
        const row = document.createElement("div");
        row.className = "weak-topic-row";
        const pct = t.accuracy != null ? Math.round(t.accuracy * 100) : null;
        const cls = pct == null ? "good" : pct < 60 ? "bad" : pct < 80 ? "ok" : "good";
        row.innerHTML = `<span class="weak-topic-name">${t.topic}</span>
          <span class="weak-topic-pct ${cls}">${pct != null ? pct+"%" : "—"}</span>`;
        _dom.weakTopicsPanel.appendChild(row);
      });
    }
  }
}

function refreshAnalytics() {
  if (!_domReady) return;
  const topicListEl = document.getElementById("analytics-topic-list");
  if (topicListEl) {
    const weakT = computeTopicWeakness(_appAttempts);
    if (!weakT.length) {
      topicListEl.innerHTML = '<p class="text-xs text-slate-500">No data yet.</p>';
    } else {
      topicListEl.innerHTML = weakT.slice(0, 8).map(t => {
        const pct = t.accuracy != null ? Math.round(t.accuracy * 100) : null;
        const cls = pct == null ? "good" : pct < 60 ? "bad" : pct < 80 ? "ok" : "good";
        const w   = pct != null ? pct : 0;
        return `<div class="analytics-topic-item">
          <div class="analytics-topic-item-header">
            <span>${t.topic}</span>
            <span class="weak-topic-pct ${cls}">${pct != null ? pct+"%" : "—"}</span>
          </div>
          <div class="analytics-topic-bar-track">
            <div class="analytics-topic-bar-fill ${cls}" style="width:${w}%"></div>
          </div>
        </div>`;
      }).join("");
    }
  }
  const { counts, total } = computeMistakeAnalytics(_appAttempts);
  if (_dom.mistakeBreakdown) {
    if (!total) {
      _dom.mistakeBreakdown.textContent = "No mistakes logged yet.";
    } else {
      _dom.mistakeBreakdown.textContent = MISTAKE_TYPES
        .filter(k => counts[k])
        .map(k => `${MISTAKE_LABELS[k]} ${Math.round(counts[k]/total*100)}%`)
        .join(" · ");
    }
  }
  if (_dom.weakTopicsEl) {
    if (!total) {
      _dom.weakTopicsEl.textContent = "Not enough data yet.";
    } else {
      const topics = computeTopicWeakness(_appAttempts);
      _dom.weakTopicsEl.textContent = topics.slice(0, 3)
        .map(t => `${t.topic}: ${t.accuracy != null ? Math.round(t.accuracy*100)+"%" : "—"}`)
        .join(" | ");
    }
  }
  // Mistake chart
  const mistakeCtx = document.getElementById("mistake-chart");
  if (mistakeCtx && window.Chart) {
    destroyChart(mistakeChartInst);
    const labels = MISTAKE_TYPES.map(k => MISTAKE_LABELS[k]);
    const data   = MISTAKE_TYPES.map(k => counts[k]||0);
    mistakeChartInst = new Chart(mistakeCtx, {
      type: "bar",
      data: { labels, datasets: [{ data, backgroundColor: "#00e5b4", borderRadius: 4 }] },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#7c8fa8", font: { size: 11 } }, grid: { color:"#1e2d45" } },
          y: { ticks: { color: "#7c8fa8", font: { size: 11 } }, grid: { color:"#1e2d45" }, beginAtZero: true, precision: 0 }
        }
      }
    });
  }
  _rebuildAnalyticsCharts();
  _rebuildStreakCalendar();
}

function rebuildErrorsTable() {
  if (!_domReady) return;
  const errorsBody = document.querySelector("#errors-table tbody");
  if (!errorsBody) return;
  errorsBody.innerHTML = "";
  const rows = [];
  FLASHCARDS.forEach(c => {
    const s = _appProgress[c.id];
    if (!s || s.attempts === 0) return;
    const acc = cardAccuracy(s);
    if ((acc !== null && acc < 0.8) || (s.wrong||0) >= 1) rows.push({ card:c, stat:s, acc });
  });
  rows.sort((a,b) => (a.acc??0) - (b.acc??0));
  if (!rows.length) {
    errorsBody.innerHTML = `<tr><td colspan="6" class="px-5 py-8 text-center text-slate-500 text-sm">No errors yet — keep practicing! 🎉</td></tr>`;
    return;
  }
  rows.forEach(({ card, stat, acc }) => {
    const tr  = document.createElement("tr");
    const pct = acc != null ? Math.round(acc*100) : null;
    const cls = pct == null ? "" : pct < 60 ? "acc-weak" : pct < 80 ? "acc-ok" : "acc-strong";
    tr.className = "cursor-pointer hover:bg-slate-800/40 transition-colors";
    tr.innerHTML = `
      <td class="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">#${card.id}</td>
      <td class="px-5 py-4 text-sm max-w-[200px]">
        <div class="font-medium text-slate-200 truncate">${card.topic}</div>
        <div class="text-xs text-slate-500 truncate mt-0.5">${card.question.split("\n")[0]}</div>
      </td>
      <td class="px-5 py-4 text-sm text-slate-400 whitespace-nowrap">${formatDate(stat.lastSeen)}</td>
      <td class="px-5 py-4 whitespace-nowrap">
        <div class="flex items-center gap-2">
          <div class="w-16 h-1.5 rounded-full bg-slate-700 overflow-hidden">
            <div class="h-full ${cls === 'acc-weak' ? 'bg-red-500' : cls === 'acc-ok' ? 'bg-amber-500' : 'bg-emerald-500'}" style="width:${pct ?? 0}%"></div>
          </div>
          <span class="text-xs font-bold ${cls === 'acc-weak' ? 'text-red-400' : cls === 'acc-ok' ? 'text-amber-400' : 'text-emerald-400'}">${formatAccuracy(stat)}</span>
        </div>
      </td>
      <td class="px-5 py-4 text-sm text-slate-400">${stat.attempts}</td>
      <td class="px-5 py-4">
        <button class="btn-retry" onclick="event.stopPropagation()">Retry</button>
      </td>
    `;
    tr.addEventListener("click", () => {
      _currentCard = card;
      switchTab("practice");
      renderCard(card);
    });
    tr.querySelector(".btn-retry").addEventListener("click", (e) => {
      e.stopPropagation();
      _currentCard = card;
      switchTab("practice");
      renderCard(card);
    });
    errorsBody.appendChild(tr);
  });
}

function rebuildAllCardsTable() {
  if (!_domReady) return;
  const allCardsBody = document.querySelector("#all-cards-table tbody");
  if (!allCardsBody) return;
  allCardsBody.innerHTML = "";
  FLASHCARDS.forEach(c => {
    const s   = _appProgress[c.id];
    const acc = cardAccuracy(s);
    const pct = acc != null ? Math.round(acc*100) : null;
    const cls = pct == null ? "" : pct < 60 ? "acc-weak" : pct < 80 ? "acc-ok" : "acc-strong";
    const statusText = !s || s.attempts === 0 ? "New" : pct >= 80 ? "Strong" : pct >= 60 ? "OK" : "Weak";
    const statusCls  = !s || s.attempts === 0 ? "text-slate-500"
      : pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-amber-400" : "text-red-400";
    const tr = document.createElement("tr");
    tr.className = "cursor-pointer hover:bg-slate-800/40 transition-colors";
    tr.innerHTML = `
      <td class="px-5 py-3 text-xs text-slate-500 whitespace-nowrap">#${c.id}</td>
      <td class="px-5 py-3 text-sm max-w-[220px]">
        <div class="font-medium text-slate-200 truncate">${c.topic}</div>
      </td>
      <td class="px-5 py-3 text-sm text-slate-400 whitespace-nowrap">${s ? s.attempts : 0}</td>
      <td class="px-5 py-3 text-sm whitespace-nowrap">
        <span class="${cls === 'acc-weak' ? 'text-red-400' : cls === 'acc-ok' ? 'text-amber-400' : 'text-emerald-400'}">${formatAccuracy(s)}</span>
      </td>
      <td class="px-5 py-3"><span class="text-xs font-bold ${statusCls}">${statusText}</span></td>
      <td class="px-5 py-3">
        <button class="btn-card-practice">Practice</button>
      </td>
    `;
    tr.addEventListener("click", () => { _currentCard = c; switchTab("practice"); renderCard(c); });
    tr.querySelector(".btn-card-practice").addEventListener("click", (e) => {
      e.stopPropagation();
      _currentCard = c; switchTab("practice"); renderCard(c);
    });
    allCardsBody.appendChild(tr);
  });
}

// ─── TAB SWITCHING (global) ──────────────────────
function switchTab(name) {
  document.querySelectorAll(".tab-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.tab === name));
  document.querySelectorAll(".tab-panel").forEach(p => {
    p.classList.toggle("active", p.id === `tab-${name}`);
  });
  if (name === "errors")    rebuildErrorsTable();
  if (name === "all-cards") rebuildAllCardsTable();
  if (name === "analytics") { _rebuildAnalyticsCharts(); _rebuildStreakCalendar(); }
}

function switchMode(m) {
  _currentMode = m;
  document.querySelectorAll(".mode-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.mode === m));
  loadNextCard();
}

// ─── ANALYTICS CHARTS ────────────────────────────
function _getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(normaliseDate(d));
  }
  return days;
}

function _rebuildAnalyticsCharts() {
  const days   = _getLast7Days();
  const labels = days.map(d => { const [,m,day] = d.split("-"); return `${m}/${day}`; });
  const accData   = days.map(d => {
    const dy = _appDaily[d];
    if (!dy || !dy.seen) return null;
    return Math.round(dy.correct/dy.seen*100);
  });
  const timeData  = days.map(d => { const dy = _appDaily[d]; return dy ? Math.round((dy.seconds||0)/60) : 0; });
  const cardsData = days.map(d => { const dy = _appDaily[d]; return dy ? (dy.seen||0) : 0; });
  const chartDefaults = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color:"#7c8fa8", font:{size:11} }, grid: { color:"#1e2d45" } },
      y: { ticks: { color:"#7c8fa8", font:{size:11} }, grid: { color:"#1e2d45" }, beginAtZero: true }
    }
  };
  const accCtx = document.getElementById("accuracy-chart");
  if (accCtx && window.Chart) {
    destroyChart(accuracyChartInst);
    accuracyChartInst = new Chart(accCtx, {
      type: "line",
      data: { labels, datasets: [{ data: accData, borderColor: "#00e5b4", backgroundColor: "rgba(0,229,180,0.1)", tension: 0.4, fill: true, pointBackgroundColor: "#00e5b4", spanGaps: true }] },
      options: { ...chartDefaults }
    });
  }
  const timeCtx = document.getElementById("time-chart");
  if (timeCtx && window.Chart) {
    destroyChart(timeChartInst);
    timeChartInst = new Chart(timeCtx, {
      type: "bar",
      data: { labels, datasets: [{ data: timeData, backgroundColor: "#0095ff", borderRadius: 4 }] },
      options: { ...chartDefaults }
    });
  }
  const cardsCtx = document.getElementById("cards-chart");
  if (cardsCtx && window.Chart) {
    destroyChart(cardsChartInst);
    cardsChartInst = new Chart(cardsCtx, {
      type: "bar",
      data: { labels, datasets: [{ data: cardsData, backgroundColor: "#ffd700", borderRadius: 4 }] },
      options: { ...chartDefaults }
    });
  }
}

function _rebuildStreakCalendar() {
  const streakLabel = document.getElementById("analytics-streak-label");
  if (streakLabel) streakLabel.textContent = `${_appMeta.streak || 0} Day Streak`;
  const cal = document.getElementById("streak-calendar");
  if (!cal) return;
  cal.innerHTML = "";
  const todayStr = normaliseDate(new Date());
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const s   = normaliseDate(d);
    const div = document.createElement("div");
    div.className = "cal-day" + (_appDaily[s]?.seen ? " studied" : "") + (s === todayStr ? " today" : "");
    div.title = s;
    cal.appendChild(div);
  }
}

// ─── DRILL ───────────────────────────────────────
function startDrill() {
  _drillActive = true; _drillTotal = 10; _drillDone = 0;
  _drillRemaining = 2 * 60; _drillCorrect = 0;
  _stopDrillTimer();
  _drillTimerId = setInterval(() => {
    _drillRemaining--;
    if (_drillRemaining <= 0) { _drillRemaining = 0; finishDrill(); }
    _updateSessionLabel();
  }, 1000);
  loadNextCard();
  _updateSessionLabel();
}

function finishDrill() {
  if (!_drillActive) return;
  _drillActive = false;
  _stopDrillTimer();
  const answered  = _drillDone || 1;
  const accuracy  = Math.round(_drillCorrect/answered*100);
  const timeUsed  = 2*60 - _drillRemaining;
  const avgTime   = timeUsed > 0 ? (timeUsed/answered).toFixed(1) : null;
  const estimated = 650 + Math.round((accuracy - 70) * 2);
  _appDrillHist.push({ date: new Date().toISOString(), questions: answered, correct: _drillCorrect, accuracy, avgTime: avgTime ? parseFloat(avgTime) : null });
  if (_appDrillHist.length > 50) _appDrillHist.splice(0, _appDrillHist.length - 50);
  saveProgress(_appProgress);
  const drillResultsEl = document.getElementById("drill-results");
  if (drillResultsEl) {
    drillResultsEl.innerHTML = `
      <div class="drill-stat"><span>Questions</span><span class="drill-stat-val">${answered}/${_drillTotal}</span></div>
      <div class="drill-stat"><span>Correct</span><span class="drill-stat-val">${_drillCorrect}</span></div>
      <div class="drill-stat"><span>Accuracy</span><span class="drill-stat-val">${accuracy}%</span></div>
      <div class="drill-stat"><span>Avg time</span><span class="drill-stat-val">${avgTime ? avgTime+"s" : "—"}</span></div>
      <div class="drill-stat"><span>Est. Quant level</span><span class="drill-stat-val">${estimated}</span></div>
    `;
  }
  const drillModal = document.getElementById("drill-modal");
  if (drillModal) drillModal.classList.remove("hidden");
  _updateSessionLabel();
}

// ─── APPLY ANSWER ────────────────────────────────
function applyAnswerUpdate({ wasCorrect, kind, mistakeType }) {
  if (!_currentCard) return;
  const id  = _currentCard.id;
  const now = new Date();
  updateMetaForToday(_appMeta, _appDaily, now);
  let s = _appProgress[id] || { attempts:0, correct:0, wrong:0, lastSeen:null, next_review:null };
  s.attempts++;
  if (wasCorrect) s.correct++;
  else s.wrong = (s.wrong||0) + 1;
  s.lastSeen    = now.toISOString();
  s.next_review = srNextReview(s, wasCorrect);
  _appProgress[id] = s;
  const timeSpent = _qStartedAt ? Math.max(1, Math.round((Date.now()-_qStartedAt)/1000)) : null;
  _stopQTimer();
  const baseXp   = wasCorrect ? (kind === "lucky" ? 5 : 10) : 2;
  const fastBonus = wasCorrect && timeSpent != null && timeSpent <= 90 ? 5 : 0;
  const xpGained = baseXp + fastBonus;
  _appMeta.xpToday           += xpGained;
  _appMeta.xpTotal           += xpGained;
  _appMeta.totalSecondsToday += timeSpent || 0;
  _appMeta.attemptsToday++;
  if (wasCorrect) _appMeta.correctToday++;
  const todayStr = normaliseDate(now);
  if (!_appDaily[todayStr]) _appDaily[todayStr] = { seen:0, correct:0, seconds:0 };
  _appDaily[todayStr].seen++;
  if (wasCorrect) _appDaily[todayStr].correct++;
  _appDaily[todayStr].seconds += timeSpent || 0;
  _appAttempts.push({ cardId: id, correct: wasCorrect, kind, mistakeType: !wasCorrect ? mistakeType||null : null, timeSpentSec: timeSpent, timestamp: now.toISOString() });
  if (_appAttempts.length > 500) _appAttempts.splice(0, _appAttempts.length - 500);
  saveProgress(_appProgress);
  // Write to Supabase
  if (window.currentUser && typeof saveReviewToSupabase === "function") {
    const ratingNum = kind === "wrong" ? 1 : kind === "lucky" ? 2 : 3;
    saveReviewToSupabase(window.currentUser.id, {
      cardId: id, topic: _currentCard.topic,
      rating: ratingNum, isError: !wasCorrect,
      cardState: _appProgress[id]
    });
  }
  refreshStats();
  refreshSidePanel();
  // Only refresh analytics/tables if that tab is visible (performance)
  const activePanel = document.querySelector(".tab-panel.active");
  if (activePanel?.id === "tab-analytics")  refreshAnalytics();
  if (activePanel?.id === "tab-errors")     rebuildErrorsTable();
  if (activePanel?.id === "tab-all-cards")  rebuildAllCardsTable();
  if (_drillActive) {
    _drillDone++;
    if (wasCorrect) _drillCorrect++;
    if (_drillDone >= _drillTotal || _drillRemaining <= 0) { finishDrill(); return; }
  }
  loadNextCard();
}

// ─── INIT FROM CLOUD DATA (called by auth.js) ────
window.initAppWithCloudData = function() {
  _appProgress  = loadProgress();
  _appMeta      = ensureMeta(_appProgress);
  _appAttempts  = window._supabaseAttempts ? [...window._supabaseAttempts] : [];
  _appDaily     = window._supabaseDaily    ? { ...window._supabaseDaily }   : {};
  _appDrillHist = ensureDrillHistory(_appProgress);

  // Recompute streak from daily data
  const todayStr = normaliseDate(new Date());
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const s = normaliseDate(d);
    if (_appDaily[s] && _appDaily[s].seen > 0) streak++;
    else if (i > 0) break;
  }
  _appMeta.streak = streak;

  // Today's stats
  if (_appDaily[todayStr]) {
    _appMeta.attemptsToday     = _appDaily[todayStr].seen    || 0;
    _appMeta.correctToday      = _appDaily[todayStr].correct || 0;
    _appMeta.totalSecondsToday = _appDaily[todayStr].seconds || 0;
    _appMeta.todayDate         = todayStr;
  }

  // Populate topic filter dropdown
  if (_dom.topicFilter) {
    _dom.topicFilter.innerHTML = '<option value="all">All Topics</option>';
    getTopics().forEach(t => {
      const opt = document.createElement("option");
      opt.value = t; opt.textContent = t;
      _dom.topicFilter.appendChild(opt);
    });
  }

  refreshStats();
  refreshSidePanel();
  refreshAnalytics();
  rebuildErrorsTable();
  rebuildAllCardsTable();
  loadNextCard();

  // Force-hide loading overlay
  const overlay = document.getElementById("loading-overlay");
  if (overlay) { overlay.classList.add("hidden"); overlay.style.display = "none"; }
};

// ─── DOM READY: wire refs + event listeners ───────
document.addEventListener("DOMContentLoaded", () => {
  _domReady = true;

  // Populate DOM refs
  _dom = {
    statTotal:        $("stat-total"),
    statSeen:         $("stat-seen"),
    statAccuracy:     $("stat-accuracy"),
    statStreak:       $("stat-streak"),
    statXpToday:      $("stat-xp-today"),
    statTimeToday:    $("stat-time-today"),
    snapshotAcc:      $("snapshot-accuracy-today"),
    snapshotTime:     $("snapshot-time-per-question"),
    cardTopic:        $("card-topic"),
    cardId:           $("card-id"),
    cardSrBadge:      $("card-sr-badge"),
    cardQuestion:     $("card-question"),
    cardAnswer:       $("card-answer"),
    cardStats:        $("card-stats"),
    sessionLabel:     $("practice-session-label"),
    practiceTimer:    $("practice-timer"),
    topicFilter:      $("topic-filter"),
    btnShowAnswer:    $("btn-show-answer"),
    btnCorrect:       $("btn-correct"),
    btnWrong:         $("btn-wrong"),
    btnLucky:         $("btn-lucky"),
    btnNext:          $("btn-next"),
    btnResetProgress: $("btn-reset-progress"),
    btnDashContinue:  $("btn-dashboard-continue"),
    btnDashDrill:     $("btn-dashboard-drill"),
    btnDashWeak:      $("btn-dashboard-weak"),
    btnDashErrors:    $("btn-dashboard-errors"),
    btnPracticeWeak:  $("btn-practice-weak"),
    ssSeen:           $("ss-seen"),
    ssCorrect:        $("ss-correct"),
    ssXp:             $("ss-xp"),
    ssNextReview:     $("ss-next-review"),
    srDueCount:       $("sr-due-count"),
    srNewCount:       $("sr-new-count"),
    mistakeBreakdown: $("mistake-breakdown"),
    weakTopicsEl:     $("weak-topics"),
    weakTopicsPanel:  $("weak-topics-panel"),
  };

  // ── Event listeners ──
  _dom.topicFilter?.addEventListener("change", () => {
    _currentTopic = _dom.topicFilter.value;
    loadNextCard();
  });

  document.querySelectorAll(".mode-btn").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.mode) switchMode(b.dataset.mode);
  }));

  document.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.tab) switchTab(b.dataset.tab);
  }));

  _dom.btnShowAnswer?.addEventListener("click", () => {
    if (!_dom.cardAnswer) return;
    const hidden = _dom.cardAnswer.classList.contains("hidden");
    _dom.cardAnswer.classList.toggle("hidden", !hidden);
    _updateShowAnswerBtn(hidden);
    const ratingEl = document.getElementById("rating-buttons");
    if (ratingEl) ratingEl.classList.toggle("locked", !hidden);
  });

  _dom.btnCorrect?.addEventListener("click", () => applyAnswerUpdate({ wasCorrect:true,  kind:"correct" }));
  _dom.btnLucky?.addEventListener("click",   () => applyAnswerUpdate({ wasCorrect:true,  kind:"lucky" }));
  _dom.btnWrong?.addEventListener("click",   () => {
    _pendingWrong = true;
    document.getElementById("mistake-modal")?.classList.remove("hidden");
  });
  _dom.btnNext?.addEventListener("click", loadNextCard);

  _dom.btnResetProgress?.addEventListener("click", async () => {
    if (!confirm("Reset all progress? This will permanently delete your cloud data.")) return;
    if (window.currentUser) {
      await window.sb.from("card_reviews").delete().eq("user_id", window.currentUser.id);
      await window.sb.from("card_states").delete().eq("user_id", window.currentUser.id);
      await window.sb.from("streaks").delete().eq("user_id", window.currentUser.id);
    }
    _appProgress = {}; _appMeta = ensureMeta(_appProgress);
    _appAttempts = []; _appDaily = {}; _appDrillHist = [];
    window._supabaseProgress = {}; window._supabaseAttempts = []; window._supabaseDaily = {};
    saveProgress(_appProgress);
    refreshStats(); refreshSidePanel(); refreshAnalytics();
    rebuildErrorsTable(); rebuildAllCardsTable(); loadNextCard();
  });

  document.querySelectorAll(".modal-reason").forEach(b => {
    b.addEventListener("click", () => {
      if (_pendingWrong) applyAnswerUpdate({ wasCorrect:false, kind:"wrong", mistakeType: b.dataset.reason||null });
      _pendingWrong = false;
      document.getElementById("mistake-modal")?.classList.add("hidden");
    });
  });
  $("btn-mistake-cancel")?.addEventListener("click", () => {
    _pendingWrong = false;
    document.getElementById("mistake-modal")?.classList.add("hidden");
  });
  $("btn-mistake-cancel-btn")?.addEventListener("click", () => {
    _pendingWrong = false;
    document.getElementById("mistake-modal")?.classList.add("hidden");
  });

  _dom.btnDashContinue?.addEventListener("click", () => {
    _drillActive = false; _stopDrillTimer(); _updateSessionLabel();
    switchTab("practice"); loadNextCard();
  });
  _dom.btnDashDrill?.addEventListener("click",  () => { switchTab("practice"); startDrill(); });
  _dom.btnDashWeak?.addEventListener("click",   () => { switchMode("weak"); switchTab("practice"); });
  _dom.btnDashErrors?.addEventListener("click", () => switchTab("errors"));
  _dom.btnPracticeWeak?.addEventListener("click", () => { switchMode("weak"); switchTab("practice"); });

  $("btn-drill-close")?.addEventListener("click", () => {
    document.getElementById("drill-modal")?.classList.add("hidden");
    switchTab("practice"); loadNextCard();
  });

  // ── Keyboard shortcuts ──
  document.addEventListener("keydown", e => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    switch (e.key) {
      case " ":  e.preventDefault(); _dom.btnShowAnswer?.click(); break;
      case "1":  e.preventDefault(); _dom.btnWrong?.click(); break;
      case "2":  e.preventDefault(); _dom.btnLucky?.click(); break;
      case "3":  e.preventDefault(); _dom.btnCorrect?.click(); break;
      case "n": case "N": e.preventDefault(); loadNextCard(); break;
    }
  });
});


// Expose cards array for other pages
window.gmatCards = FLASHCARDS.map(c => ({ id: c.id, topic: c.topic, q: c.question }));

// ═══════════════════════════════════════════════
//  MULTI-PAGE: initPage() called by auth.js
// ═══════════════════════════════════════════════
window.initPage = function() {
  if (!document.getElementById('flashcard-box') && !document.getElementById('btn-show-answer')) return;
  if (typeof window.initAppWithCloudData === 'function') window.initAppWithCloudData();

  const progress = _appProgress || {};
  const meta     = _appMeta     || {};
  const el = id => document.getElementById(id);

  let totalCorrect = 0, totalAttempts = 0;
  Object.values(progress).forEach(p => { if (p?.attempts) { totalAttempts += p.attempts; totalCorrect += p.correct||0; } });
  const totalSeen = Object.values(progress).filter(p => p?.attempts > 0).length;
  const acc = totalAttempts > 0 ? Math.round(totalCorrect/totalAttempts*100) : null;

  if (el('header-streak'))   el('header-streak').textContent   = meta.streak || 0;
  if (el('header-total'))    el('header-total').textContent    = totalSeen;
  if (el('header-accuracy')) el('header-accuracy').textContent = acc ? acc+'%' : '-%';

  const params = new URLSearchParams(window.location.search);
  const cardId = params.get('card');
  if (cardId) {
    const targetCard = FLASHCARDS.find(c => c.id === parseInt(cardId));
    if (targetCard && typeof renderCard === 'function') renderCard(targetCard);
  }

  const streak = meta.streak || 0;
  const score  = totalAttempts >= 5 ? Math.round(550 + (totalCorrect/totalAttempts)*200) : null;
  if (typeof window.updateNavUser === 'function') window.updateNavUser(window.currentUser, streak, score);
  if (typeof window.updateNavErrorsBadge === 'function') {
    const errCount = FLASHCARDS.filter(c => { const p = progress[c.id]; return p && (p.wrong||0) > 0; }).length;
    window.updateNavErrorsBadge(errCount);
  }
};
