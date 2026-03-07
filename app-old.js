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

const STORAGE_KEY = "gmat-math-trainer-progress-v1";
const META_KEY = "__meta";
const ATTEMPTS_KEY = "__attempts";

const MISTAKE_TYPES = [
  "concept_gap",
  "careless",
  "misread",
  "slow_strategy",
  "no_shortcut"
];

function getDefaultMeta() {
  return {
    streak: 0,
    lastStudyDate: null,
    xpTotal: 0,
    xpToday: 0,
    todayDate: null,
    totalSecondsToday: 0,
    attemptsToday: 0,
    correctToday: 0
  };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function ensureMeta(progress) {
  if (!progress[META_KEY]) {
    progress[META_KEY] = getDefaultMeta();
  } else {
    progress[META_KEY] = { ...getDefaultMeta(), ...progress[META_KEY] };
  }
  return progress[META_KEY];
}

function ensureAttempts(progress) {
  if (!Array.isArray(progress[ATTEMPTS_KEY])) {
    progress[ATTEMPTS_KEY] = [];
  }
  return progress[ATTEMPTS_KEY];
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

function getTopics() {
  const set = new Set();
  FLASHCARDS.forEach((c) => set.add(c.topic));
  return Array.from(set).sort();
}

function computeStats(progress) {
  let seen = 0;
  let correct = 0;
  let attempts = 0;

  FLASHCARDS.forEach((card) => {
    const s = progress[card.id];
    if (s && s.attempts > 0) {
      seen += 1;
      attempts += s.attempts;
      correct += s.correct || 0;
    }
  });

  const accuracy = attempts === 0 ? 0 : Math.round((correct / attempts) * 100);

  return { total: FLASHCARDS.length, seen, accuracy, attempts, correct };
}

function computeTodayStats(meta) {
  if (!meta) return { accuracyToday: null, avgTime: null };
  if (!meta.attemptsToday || meta.attemptsToday === 0) {
    return { accuracyToday: null, avgTime: null };
  }
  const accuracyToday = Math.round(
    (meta.correctToday / meta.attemptsToday) * 100
  );
  const avgTime =
    meta.totalSecondsToday && meta.attemptsToday
      ? meta.totalSecondsToday / meta.attemptsToday
      : null;
  return { accuracyToday, avgTime };
}

function humanTime(seconds) {
  if (!seconds || seconds <= 0) return "0m";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

function cardAccuracy(statsForCard) {
  if (!statsForCard || statsForCard.attempts === 0) return null;
  return statsForCard.correct / statsForCard.attempts;
}

function pickNextCard(progress, mode, topicFilter, currentId) {
  const candidates = FLASHCARDS.filter((card) => {
    if (topicFilter !== "all" && card.topic !== topicFilter) return false;
    const s = progress[card.id];
    const acc = cardAccuracy(s);

    if (mode === "new") {
      return !s || s.attempts === 0;
    }
    if (mode === "weak") {
      if (!s || s.attempts === 0) return false;
      // Weak if accuracy below 70% or at least 2 wrong
      const wrong = (s.wrong || 0);
      return acc === null || acc < 0.7 || wrong >= 2;
    }
    // "all" mode
    return true;
  });

  let pool = candidates;
  if (pool.length === 0) {
    // Fallback: all cards (optionally still respect topic)
    pool = FLASHCARDS.filter(
      (c) => topicFilter === "all" || c.topic === topicFilter
    );
  }

  if (pool.length === 0) {
    return null;
  }

  // Weight weak / unseen cards more heavily
  const weighted = [];
  for (const card of pool) {
    const s = progress[card.id];
    const acc = cardAccuracy(s);
    let weight = 1;
    if (!s || s.attempts === 0) {
      weight = 4;
    } else {
      const wrong = s.wrong || 0;
      if (acc < 0.6 || wrong >= 2) weight = 5;
      else if (acc < 0.8) weight = 3;
      else weight = 1;
    }
    // Avoid repeating the same card when possible
    if (card.id === currentId && pool.length > 1) {
      weight = Math.max(1, weight - 2);
    }
    for (let i = 0; i < weight; i += 1) {
      weighted.push(card);
    }
  }

  const chosen = weighted[Math.floor(Math.random() * weighted.length)];
  return chosen || pool[0];
}

function formatAccuracy(stat) {
  if (!stat || stat.attempts === 0) return "—";
  const pct = Math.round((stat.correct / stat.attempts) * 100);
  return `${pct}% (${stat.correct}/${stat.attempts})`;
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric"
    });
  } catch {
    return "—";
  }
}

function normaliseDate(d) {
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateMetaForToday(meta, now) {
  const todayStr = normaliseDate(now);
  if (meta.todayDate !== todayStr) {
    if (meta.lastStudyDate) {
      const last = new Date(meta.lastStudyDate);
      const diffMs =
        last.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
      const diffDays = Math.round(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        meta.streak += 1;
      } else if (diffDays > 1) {
        meta.streak = 1;
      }
    } else {
      meta.streak = 1;
    }
    meta.todayDate = todayStr;
    meta.xpToday = 0;
    meta.totalSecondsToday = 0;
    meta.attemptsToday = 0;
    meta.correctToday = 0;
  }
  meta.lastStudyDate = todayStr;
}

function computeMistakeAnalytics(attempts) {
  const counts = {};
  let totalMistakes = 0;
  MISTAKE_TYPES.forEach((t) => {
    counts[t] = 0;
  });
  attempts.forEach((a) => {
    if (!a.correct && a.mistakeType) {
      if (!(a.mistakeType in counts)) {
        counts[a.mistakeType] = 0;
      }
      counts[a.mistakeType] += 1;
      totalMistakes += 1;
    }
  });
  return { counts, totalMistakes };
}

function computeTopicWeakness(attempts) {
  const perTopic = {};
  attempts.forEach((a) => {
    const card = FLASHCARDS.find((c) => c.id === a.cardId);
    if (!card) return;
    const topic = card.topic;
    if (!perTopic[topic]) {
      perTopic[topic] = { attempts: 0, correct: 0 };
    }
    perTopic[topic].attempts += 1;
    if (a.correct) perTopic[topic].correct += 1;
  });
  const entries = Object.entries(perTopic).map(([topic, s]) => ({
    topic,
    attempts: s.attempts,
    accuracy: s.attempts ? s.correct / s.attempts : null
  }));
  entries.sort((a, b) => {
    const accA = a.accuracy ?? 0;
    const accB = b.accuracy ?? 0;
    return accA - accB;
  });
  return entries;
}

document.addEventListener("DOMContentLoaded", () => {
  const topicFilterEl = document.getElementById("topic-filter");
  const statTotalEl = document.getElementById("stat-total");
  const statSeenEl = document.getElementById("stat-seen");
  const statAccuracyEl = document.getElementById("stat-accuracy");
  const statStreakEl = document.getElementById("stat-streak");
  const statXpTodayEl = document.getElementById("stat-xp-today");
  const statTimeTodayEl = document.getElementById("stat-time-today");

  const snapshotAccuracyTodayEl = document.getElementById(
    "snapshot-accuracy-today"
  );
  const snapshotTimePerQuestionEl = document.getElementById(
    "snapshot-time-per-question"
  );

  const cardTopicEl = document.getElementById("card-topic");
  const cardIdEl = document.getElementById("card-id");
  const cardQuestionEl = document.getElementById("card-question");
  const cardAnswerEl = document.getElementById("card-answer");
  const cardStatsEl = document.getElementById("card-stats");

  const practiceSessionLabelEl = document.getElementById(
    "practice-session-label"
  );
  const practiceTimerEl = document.getElementById("practice-timer");

  const btnShowAnswer = document.getElementById("btn-show-answer");
  const btnCorrect = document.getElementById("btn-correct");
  const btnWrong = document.getElementById("btn-wrong");
  const btnLucky = document.getElementById("btn-lucky");
  const btnNext = document.getElementById("btn-next");
  const btnResetProgress = document.getElementById("btn-reset-progress");

  const btnDashboardContinue = document.getElementById(
    "btn-dashboard-continue"
  );
  const btnDashboardDrill = document.getElementById("btn-dashboard-drill");
  const btnDashboardWeak = document.getElementById("btn-dashboard-weak");
  const btnDashboardErrors = document.getElementById("btn-dashboard-errors");

  const errorsTableBody = document.querySelector("#errors-table tbody");
  const allCardsTableBody = document.querySelector("#all-cards-table tbody");

  const mistakeModal = document.getElementById("mistake-modal");
  const mistakeReasonButtons = Array.from(
    document.querySelectorAll(".modal-reason")
  );
  const btnMistakeCancel = document.getElementById("btn-mistake-cancel");

  const mistakeBreakdownEl = document.getElementById("mistake-breakdown");
  const weakTopicsEl = document.getElementById("weak-topics");

  const modeButtons = Array.from(
    document.querySelectorAll(".mode-button")
  );
  const tabButtons = Array.from(
    document.querySelectorAll(".tab-button")
  );
  const tabs = {
    practice: document.getElementById("tab-practice"),
    errors: document.getElementById("tab-errors"),
    "all-cards": document.getElementById("tab-all-cards")
  };

  let progress = loadProgress();
  const meta = ensureMeta(progress);
  const attempts = ensureAttempts(progress);
  let currentMode = "all";
  let currentTopicFilter = "all";
  let currentCard = null;

  let currentQuestionStartedAt = null;
  let questionTimerId = null;

  let drillActive = false;
  let drillQuestionsTotal = 10;
  let drillQuestionsDone = 0;
  let drillTimeRemaining = 20 * 60; // seconds
  let drillTimerId = null;
  let drillCorrect = 0;

  let pendingWrongAnswer = false;

  function refreshStats() {
    const s = computeStats(progress);
    statTotalEl.textContent = s.total;
    statSeenEl.textContent = s.seen;
    statAccuracyEl.textContent = `${s.accuracy}%`;
    statStreakEl.textContent = `${meta.streak || 0} days`;
    statXpTodayEl.textContent = meta.xpToday || 0;
    statTimeTodayEl.textContent = humanTime(meta.totalSecondsToday || 0);

    const today = computeTodayStats(meta);
    if (today.accuracyToday == null) {
      snapshotAccuracyTodayEl.textContent = "—";
    } else {
      snapshotAccuracyTodayEl.textContent = `${today.accuracyToday}%`;
    }
    if (!today.avgTime) {
      snapshotTimePerQuestionEl.textContent = "—";
    } else {
      snapshotTimePerQuestionEl.textContent = `${today.avgTime.toFixed(1)}s`;
    }
  }

  function refreshAnalytics() {
    const { counts, totalMistakes } = computeMistakeAnalytics(attempts);
    if (!totalMistakes) {
      mistakeBreakdownEl.textContent = "No mistakes logged yet.";
    } else {
      const parts = [];
      Object.entries(counts).forEach(([key, value]) => {
        if (!value) return;
        const pct = Math.round((value / totalMistakes) * 100);
        let label = "";
        if (key === "concept_gap") label = "Concept gaps";
        else if (key === "careless") label = "Careless";
        else if (key === "misread") label = "Misread";
        else if (key === "slow_strategy") label = "Slow strategy";
        else if (key === "no_shortcut") label = "No shortcut";
        else label = key;
        parts.push(`${label} ${pct}%`);
      });
      mistakeBreakdownEl.textContent = parts.join(" · ");
    }

    const topics = computeTopicWeakness(attempts);
    if (!topics.length) {
      weakTopicsEl.textContent = "Not enough data yet.";
    } else {
      const topFew = topics.slice(0, 3);
      weakTopicsEl.textContent = topFew
        .map((t) => {
          if (t.accuracy == null) return `${t.topic}: —`;
          const pct = Math.round(t.accuracy * 100);
          return `${t.topic}: ${pct}%`;
        })
        .join(" | ");
    }
  }

  function stopQuestionTimer() {
    if (questionTimerId) {
      clearInterval(questionTimerId);
      questionTimerId = null;
    }
  }

  function startQuestionTimer() {
    stopQuestionTimer();
    currentQuestionStartedAt = Date.now();
    practiceTimerEl.textContent = "";
    questionTimerId = setInterval(() => {
      if (!currentQuestionStartedAt) return;
      const elapsed = Math.floor((Date.now() - currentQuestionStartedAt) / 1000);
      practiceTimerEl.textContent = `Time: ${humanTime(elapsed)}`;
    }, 1000);
  }

  function stopDrillTimer() {
    if (drillTimerId) {
      clearInterval(drillTimerId);
      drillTimerId = null;
    }
  }

  function updatePracticeHeader() {
    if (drillActive) {
      practiceSessionLabelEl.textContent = `2‑minute drill – Question ${
        drillQuestionsDone + 1
      } / ${drillQuestionsTotal} · Time left: ${humanTime(
        drillTimeRemaining
      )}`;
    } else {
      practiceSessionLabelEl.textContent = "";
    }
  }

  function renderCard(card) {
    if (!card) {
      cardTopicEl.textContent = "";
      cardIdEl.textContent = "";
      cardQuestionEl.textContent = "No card available for this filter.";
      cardAnswerEl.textContent = "";
      cardAnswerEl.classList.add("hidden");
      cardStatsEl.textContent = "";
      return;
    }

    const s = progress[card.id];
    cardTopicEl.textContent = card.topic;
    cardIdEl.textContent = `Card #${card.id}`;
    cardQuestionEl.textContent = card.question;
    cardAnswerEl.textContent = card.answer;
    cardAnswerEl.classList.add("hidden");
    btnShowAnswer.textContent = "Show answer";

    if (s && s.attempts > 0) {
      const pct = Math.round((s.correct / s.attempts) * 100);
      const label =
        pct < 60 ? "weak" : pct < 80 ? "ok" : "strong";
      cardStatsEl.textContent = `Attempts: ${s.attempts}, Correct: ${s.correct || 0}, Accuracy: ${pct}% (${label})`;
    } else {
      cardStatsEl.textContent = "New card – no history yet.";
    }

    updatePracticeHeader();
  }

  function rebuildErrorsTable() {
    errorsTableBody.innerHTML = "";
    const rows = [];
    FLASHCARDS.forEach((card) => {
      const s = progress[card.id];
      if (!s || s.attempts === 0) return;
      const accVal = cardAccuracy(s);
      const wrong = s.wrong || 0;
      if ((accVal !== null && accVal < 0.8) || wrong >= 1) {
        rows.push({ card, stat: s, acc: accVal });
      }
    });

    rows.sort((a, b) => {
      const accA = a.acc === null ? 0 : a.acc;
      const accB = b.acc === null ? 0 : b.acc;
      return accA - accB;
    });

    rows.forEach(({ card, stat }) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="nowrap">#${card.id}</td>
        <td>${card.topic}</td>
        <td>${card.question.split("\n")[0]}</td>
        <td>${formatAccuracy(stat)}</td>
        <td>${stat.attempts}</td>
        <td>${formatDate(stat.lastSeen)}</td>
      `;
      tr.addEventListener("click", () => {
        currentCard = card;
        switchTab("practice");
        renderCard(currentCard);
      });
      errorsTableBody.appendChild(tr);
    });
  }

  function rebuildAllCardsTable() {
    allCardsTableBody.innerHTML = "";
    FLASHCARDS.forEach((card) => {
      const s = progress[card.id];
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="nowrap">#${card.id}</td>
        <td>${card.topic}</td>
        <td>${card.question.split("\n")[0]}</td>
        <td>${formatAccuracy(s)}</td>
      `;
      tr.addEventListener("click", () => {
        currentCard = card;
        switchTab("practice");
        renderCard(currentCard);
      });
      allCardsTableBody.appendChild(tr);
    });
  }

  function switchMode(newMode) {
    currentMode = newMode;
    modeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === newMode);
    });
    loadNextCard();
  }

  function switchTab(tabName) {
    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    Object.entries(tabs).forEach(([name, el]) => {
      el.classList.toggle("active", name === tabName);
    });
    if (tabName === "errors") {
      rebuildErrorsTable();
    } else if (tabName === "all-cards") {
      rebuildAllCardsTable();
    }
  }

  function loadNextCard() {
    currentCard = pickNextCard(
      progress,
      currentMode,
      currentTopicFilter,
      currentCard ? currentCard.id : null
    );
    renderCard(currentCard);
    startQuestionTimer();
  }

  function applyAnswerUpdate({ wasCorrect, kind, mistakeType }) {
    if (!currentCard) return;
    const id = currentCard.id;
    const existing = progress[id] || {
      attempts: 0,
      correct: 0,
      wrong: 0,
      lastSeen: null
    };
    const now = new Date();
    updateMetaForToday(meta, now);

    existing.attempts += 1;
    if (wasCorrect) existing.correct += 1;
    else existing.wrong += 1;
    existing.lastSeen = now.toISOString();
    progress[id] = existing;

    let timeSpentSec = null;
    if (currentQuestionStartedAt) {
      timeSpentSec = Math.max(
        1,
        Math.round((Date.now() - currentQuestionStartedAt) / 1000)
      );
    }
    stopQuestionTimer();

    let baseXp = 0;
    if (wasCorrect) {
      baseXp = kind === "lucky" ? 5 : 10;
    } else {
      baseXp = 2;
    }
    let fastBonus = 0;
    if (wasCorrect && timeSpentSec != null && timeSpentSec <= 90) {
      fastBonus = 5;
    }
    const gainedXp = baseXp + fastBonus;
    meta.xpToday += gainedXp;
    meta.xpTotal += gainedXp;
    meta.totalSecondsToday += timeSpentSec || 0;
    meta.attemptsToday += 1;
    if (wasCorrect) meta.correctToday += 1;

    attempts.push({
      cardId: id,
      correct: wasCorrect,
      kind,
      mistakeType: !wasCorrect ? mistakeType || null : null,
      timeSpentSec,
      difficulty: currentCard.difficulty || null,
      timestamp: now.toISOString()
    });
    if (attempts.length > 500) {
      attempts.splice(0, attempts.length - 500);
    }

    saveProgress(progress);
    refreshStats();
    refreshAnalytics();
    rebuildErrorsTable();
    rebuildAllCardsTable();

    if (drillActive) {
      drillQuestionsDone += 1;
      if (wasCorrect) drillCorrect += 1;
      if (drillQuestionsDone >= drillQuestionsTotal || drillTimeRemaining <= 0) {
        // finishDrill will call updatePracticeHeader
        finishDrill();
        return;
      }
    }

    loadNextCard();
  }

  // Populate topics
  getTopics().forEach((topic) => {
    const opt = document.createElement("option");
    opt.value = topic;
    opt.textContent = topic;
    topicFilterEl.appendChild(opt);
  });

  topicFilterEl.addEventListener("change", () => {
    currentTopicFilter = topicFilterEl.value;
    loadNextCard();
  });

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.mode) {
        switchMode(btn.dataset.mode);
      }
    });
  });

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.tab) {
        switchTab(btn.dataset.tab);
      }
    });
  });

  btnShowAnswer.addEventListener("click", () => {
    const hidden = cardAnswerEl.classList.contains("hidden");
    cardAnswerEl.classList.toggle("hidden", !hidden);
    btnShowAnswer.textContent = hidden ? "Hide answer" : "Show answer";
  });

  btnCorrect.addEventListener("click", () => {
    applyAnswerUpdate({ wasCorrect: true, kind: "correct" });
  });

  btnWrong.addEventListener("click", () => {
    pendingWrongAnswer = true;
    mistakeModal.classList.remove("hidden");
  });

  btnLucky.addEventListener("click", () => {
    applyAnswerUpdate({ wasCorrect: true, kind: "lucky" });
  });

  btnNext.addEventListener("click", () => {
    loadNextCard();
  });

  btnResetProgress.addEventListener("click", () => {
    if (confirm("Reset all progress and error history for these flashcards?")) {
      progress = {};
      ensureMeta(progress);
      ensureAttempts(progress);
      saveProgress(progress);
      refreshStats();
      refreshAnalytics();
      rebuildErrorsTable();
      rebuildAllCardsTable();
      loadNextCard();
    }
  });

  mistakeReasonButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const reason = btn.dataset.reason || null;
      if (pendingWrongAnswer) {
        applyAnswerUpdate({
          wasCorrect: false,
          kind: "wrong",
          mistakeType: reason
        });
      }
      pendingWrongAnswer = false;
      mistakeModal.classList.add("hidden");
    });
  });

  btnMistakeCancel.addEventListener("click", () => {
    pendingWrongAnswer = false;
    mistakeModal.classList.add("hidden");
  });

  btnDashboardContinue.addEventListener("click", () => {
    drillActive = false;
    stopDrillTimer();
    updatePracticeHeader();
    switchTab("practice");
    loadNextCard();
  });

  function startDrill() {
    drillActive = true;
    drillQuestionsTotal = 10;
    drillQuestionsDone = 0;
    drillTimeRemaining = 20 * 60;
    drillCorrect = 0;
    stopDrillTimer();
    drillTimerId = setInterval(() => {
      drillTimeRemaining -= 1;
      if (drillTimeRemaining <= 0) {
        drillTimeRemaining = 0;
        finishDrill();
      }
      updatePracticeHeader();
    }, 1000);
    loadNextCard();
    updatePracticeHeader();
  }

  function finishDrill() {
    if (!drillActive) return;
    drillActive = false;
    stopDrillTimer();
    const answered = drillQuestionsDone || 1;
    const accuracy = Math.round((drillCorrect / answered) * 100);
    const timeUsed = 20 * 60 - drillTimeRemaining;
    const avgTime = timeUsed > 0 ? timeUsed / answered : null;
    const estimatedLevel = 650 + Math.round((accuracy - 70) * 2);
    alert(
      `2‑minute drill finished.\n\nQuestions: ${answered}/${drillQuestionsTotal}\nAccuracy: ${accuracy}%\nAverage time: ${
        avgTime ? `${avgTime.toFixed(1)}s` : "—"
      }\nEstimated Quant level: ${estimatedLevel}`
    );
    updatePracticeHeader();
  }

  btnDashboardDrill.addEventListener("click", () => {
    switchTab("practice");
    startDrill();
  });

  btnDashboardWeak.addEventListener("click", () => {
    switchMode("weak");
    switchTab("practice");
  });

  btnDashboardErrors.addEventListener("click", () => {
    switchTab("errors");
  });

  document.addEventListener("keydown", (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      loadNextCard();
    } else if (e.key.toLowerCase() === "s") {
      e.preventDefault();
      btnShowAnswer.click();
    } else if (e.key.toLowerCase() === "c") {
      e.preventDefault();
      btnCorrect.click();
    } else if (e.key.toLowerCase() === "w") {
      e.preventDefault();
      btnWrong.click();
    } else if (e.key.toLowerCase() === "h") {
      e.preventDefault();
      btnShowAnswer.click();
    }
  });

  // Initial render
  refreshStats();
  refreshAnalytics();
  rebuildErrorsTable();
  rebuildAllCardsTable();
  loadNextCard();
});

