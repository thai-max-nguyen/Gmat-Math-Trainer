// ════════════════════════════════════════════════════════════════
//  GMAT Math Trainer — Question Bank
//  Format:
//    {
//      id, type: 'PS' | 'DS',
//      topic, subtopic, difficulty: 'easy' | 'medium' | 'hard',
//      question, choices: ['...', ...], answer: 'A'..'E',
//      explanation
//    }
//
//  DS answer choices (standard GMAT, used for every DS question):
//    A) Statement (1) ALONE is sufficient, but (2) is not.
//    B) Statement (2) ALONE is sufficient, but (1) is not.
//    C) BOTH statements TOGETHER are sufficient, neither alone.
//    D) EACH statement ALONE is sufficient.
//    E) Statements (1) and (2) TOGETHER are NOT sufficient.
//
//  All answers verified by hand — see explanation for derivation.
// ════════════════════════════════════════════════════════════════

const DS_CHOICES = [
  'Statement (1) ALONE is sufficient, but (2) is not sufficient.',
  'Statement (2) ALONE is sufficient, but (1) is not sufficient.',
  'BOTH statements TOGETHER are sufficient, but NEITHER alone is.',
  'EACH statement ALONE is sufficient.',
  'Statements (1) and (2) TOGETHER are NOT sufficient.'
];

const QUESTIONS = [
  // ═══════════════════════════════════════════════════
  //  ARITHMETIC — Number Properties, Fractions, Percents
  // ═══════════════════════════════════════════════════
  {
    id: 1, type: 'PS', topic: 'Arithmetic', subtopic: 'Percents', difficulty: 'easy',
    question: 'If 30% of a number is 24, what is 75% of that number?',
    choices: ['45', '50', '55', '60', '72'],
    answer: 'D',
    explanation: '0.30·n = 24 ⇒ n = 80. 0.75·80 = 60.'
  },
  {
    id: 2, type: 'PS', topic: 'Arithmetic', subtopic: 'Percents', difficulty: 'medium',
    question: 'A store raises a price by 20%, then offers a 20% discount on the new price. The final price is what percent of the original?',
    choices: ['96%', '98%', '100%', '102%', '104%'],
    answer: 'A',
    explanation: '1.20 × 0.80 = 0.96 = 96%. Successive ±x% always nets a loss of x²/100 percent.'
  },
  {
    id: 3, type: 'PS', topic: 'Arithmetic', subtopic: 'Percents', difficulty: 'medium',
    question: 'The price of a stock fell 10% then rose 20%. Net change?',
    choices: ['+8%', '+10%', '+12%', '+15%', '+18%'],
    answer: 'A',
    explanation: '0.90 × 1.20 = 1.08 ⇒ +8%.'
  },
  {
    id: 4, type: 'PS', topic: 'Arithmetic', subtopic: 'Fractions', difficulty: 'easy',
    question: 'What is 2/3 + 3/4 − 1/6?',
    choices: ['5/4', '7/6', '3/2', '5/3', '11/12'],
    answer: 'A',
    explanation: 'Common denom 12: 8/12 + 9/12 − 2/12 = 15/12 = 5/4.'
  },
  {
    id: 5, type: 'PS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'medium',
    question: 'If n is a positive integer and n² is divisible by 72, the largest positive integer that MUST divide n is:',
    choices: ['6', '12', '24', '36', '72'],
    answer: 'B',
    explanation: '72 = 2³·3². For n² to contain 2³, n must contain 2² (since exponents in n² are even, 2³ requires ≥ 2² in n). For 3² in n², n needs 3¹. So n is divisible by 4·3 = 12.'
  },
  {
    id: 6, type: 'PS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'medium',
    question: 'How many positive integers less than 100 are divisible by 3 but not by 5?',
    choices: ['20', '24', '26', '27', '33'],
    answer: 'D',
    explanation: 'Multiples of 3 from 1 to 99: floor(99/3) = 33. Multiples of 15 (both 3 and 5) from 1 to 99: floor(99/15) = 6. So 33 − 6 = 27.'
  },
  {
    id: 7, type: 'PS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'hard',
    question: 'What is the units digit of 7^85?',
    choices: ['1', '3', '5', '7', '9'],
    answer: 'D',
    explanation: 'Units digits of 7^n cycle in a 4-pattern: 7, 9, 3, 1. 85 mod 4 = 1, so it matches 7^1 → 7.'
  },
  {
    id: 8, type: 'PS', topic: 'Arithmetic', subtopic: 'Primes', difficulty: 'medium',
    question: 'How many distinct prime factors does 210 have?',
    choices: ['2', '3', '4', '5', '6'],
    answer: 'C',
    explanation: '210 = 2 × 3 × 5 × 7 ⇒ 4 distinct primes.'
  },
  {
    id: 9, type: 'PS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'hard',
    question: 'If x and y are positive integers and x + y = 13, the greatest possible value of xy is:',
    choices: ['36', '40', '42', '44', '45'],
    answer: 'C',
    explanation: 'Maximize product with fixed sum by taking values as close as possible. 6·7 = 42.'
  },
  {
    id: 10, type: 'PS', topic: 'Arithmetic', subtopic: 'Decimals', difficulty: 'easy',
    question: 'What is 0.25 × 0.4?',
    choices: ['0.01', '0.05', '0.1', '0.25', '1.0'],
    answer: 'C',
    explanation: '0.25 × 0.4 = 0.10.'
  },
  {
    id: 11, type: 'PS', topic: 'Arithmetic', subtopic: 'Percents', difficulty: 'medium',
    question: 'Sales tax is 8%. The total bill including tax is $54. What was the pre-tax price?',
    choices: ['$48.00', '$49.68', '$50.00', '$50.32', '$51.40'],
    answer: 'C',
    explanation: '1.08·P = 54 ⇒ P = 50.'
  },
  {
    id: 12, type: 'PS', topic: 'Arithmetic', subtopic: 'Ratios', difficulty: 'easy',
    question: 'In a class, the ratio of boys to girls is 3:5. If there are 24 boys, how many girls are there?',
    choices: ['30', '35', '40', '45', '50'],
    answer: 'C',
    explanation: '3 parts = 24 ⇒ 1 part = 8 ⇒ 5 parts = 40.'
  },
  {
    id: 13, type: 'PS', topic: 'Arithmetic', subtopic: 'Ratios', difficulty: 'medium',
    question: 'A mixture is 3 parts water to 2 parts juice. To make 25 liters of mixture, how much juice is needed?',
    choices: ['8 L', '10 L', '12 L', '15 L', '20 L'],
    answer: 'B',
    explanation: 'Total parts = 5; juice = (2/5) × 25 = 10 L.'
  },
  {
    id: 14, type: 'PS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'hard',
    question: 'If n is a positive integer, what is the remainder when 7^n is divided by 5? (Choose the description that fits all n.)',
    choices: ['Always 1', 'Always 2', 'Cycles through 2, 4, 3, 1', 'Always 3', 'Always 4'],
    answer: 'C',
    explanation: '7 ≡ 2 (mod 5). 2^1=2, 2^2=4, 2^3=3, 2^4=1, then repeats every 4.'
  },
  {
    id: 15, type: 'PS', topic: 'Arithmetic', subtopic: 'LCM/GCF', difficulty: 'easy',
    question: 'What is the least common multiple (LCM) of 12 and 18?',
    choices: ['6', '24', '36', '54', '72'],
    answer: 'C',
    explanation: '12 = 2²·3; 18 = 2·3². LCM = 2²·3² = 36.'
  },
  {
    id: 16, type: 'PS', topic: 'Arithmetic', subtopic: 'LCM/GCF', difficulty: 'easy',
    question: 'GCF (HCF) of 24 and 36 is:',
    choices: ['6', '8', '12', '18', '24'],
    answer: 'C',
    explanation: '24 = 2³·3; 36 = 2²·3². GCF = 2²·3 = 12.'
  },
  {
    id: 17, type: 'PS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'medium',
    question: 'How many factors does 36 have?',
    choices: ['6', '8', '9', '10', '12'],
    answer: 'C',
    explanation: '36 = 2²·3². #factors = (2+1)(2+1) = 9.'
  },
  {
    id: 18, type: 'PS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'hard',
    question: 'What is the smallest positive integer N with exactly 6 divisors?',
    choices: ['6', '8', '12', '16', '24'],
    answer: 'C',
    explanation: 'For 6 divisors, N = p^5 or p²·q. Smallest is 2²·3 = 12. Divisors: 1, 2, 3, 4, 6, 12.'
  },
  {
    id: 19, type: 'PS', topic: 'Arithmetic', subtopic: 'Percents', difficulty: 'hard',
    question: 'A worker\'s wage is increased by 20%. To restore the original wage, by what % must the new wage be cut?',
    choices: ['16⅔%', '20%', '22%', '25%', '33⅓%'],
    answer: 'A',
    explanation: 'New = 1.2W. Reduction needed = 0.2W on 1.2W = 0.2/1.2 = 1/6 ≈ 16.67%.'
  },
  {
    id: 20, type: 'PS', topic: 'Arithmetic', subtopic: 'Percents', difficulty: 'medium',
    question: 'A merchant marks up the cost price by 40%, then offers a 25% discount on the marked price. What is the percent profit on cost?',
    choices: ['5%', '10%', '15%', '20%', '25%'],
    answer: 'A',
    explanation: 'Cost 100 ⇒ marked 140 ⇒ sale 140 × 0.75 = 105. Profit = 5 ⇒ 5%.'
  },

  // ═══════════════════════════════════════════════════
  //  ALGEBRA — Equations, Inequalities, Exponents
  // ═══════════════════════════════════════════════════
  {
    id: 21, type: 'PS', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'easy',
    question: 'If 3x + 7 = 22, what is x?',
    choices: ['3', '4', '5', '6', '7'],
    answer: 'C',
    explanation: '3x = 15 ⇒ x = 5.'
  },
  {
    id: 22, type: 'PS', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'easy',
    question: 'If 2(x − 3) = 4x + 2, then x =',
    choices: ['−4', '−2', '0', '2', '4'],
    answer: 'A',
    explanation: '2x − 6 = 4x + 2 ⇒ −8 = 2x ⇒ x = −4.'
  },
  {
    id: 23, type: 'PS', topic: 'Algebra', subtopic: 'Systems', difficulty: 'medium',
    question: 'If x + y = 10 and x − y = 4, then xy =',
    choices: ['18', '21', '24', '25', '30'],
    answer: 'B',
    explanation: 'Add: 2x = 14 ⇒ x = 7, y = 3. xy = 21.'
  },
  {
    id: 24, type: 'PS', topic: 'Algebra', subtopic: 'Quadratics', difficulty: 'easy',
    question: 'What are the solutions to x² − 5x + 6 = 0?',
    choices: ['x = 1, 6', 'x = 2, 3', 'x = −2, −3', 'x = −1, 6', 'x = 1, −6'],
    answer: 'B',
    explanation: 'Factor: (x − 2)(x − 3) = 0.'
  },
  {
    id: 25, type: 'PS', topic: 'Algebra', subtopic: 'Quadratics', difficulty: 'medium',
    question: 'If x² − 6x − 16 = 0, the positive root is:',
    choices: ['2', '4', '6', '8', '10'],
    answer: 'D',
    explanation: '(x − 8)(x + 2) = 0 ⇒ x = 8 or x = −2. Positive root = 8.'
  },
  {
    id: 26, type: 'PS', topic: 'Algebra', subtopic: 'Exponents', difficulty: 'easy',
    question: 'What is 2^3 · 2^4?',
    choices: ['2^7', '2^12', '4^7', '4^12', '8^4'],
    answer: 'A',
    explanation: 'Same base ⇒ add exponents: 2^(3+4) = 2^7.'
  },
  {
    id: 27, type: 'PS', topic: 'Algebra', subtopic: 'Exponents', difficulty: 'medium',
    question: 'If 3^(x+1) = 81, then x =',
    choices: ['1', '2', '3', '4', '5'],
    answer: 'C',
    explanation: '81 = 3^4 ⇒ x + 1 = 4 ⇒ x = 3.'
  },
  {
    id: 28, type: 'PS', topic: 'Algebra', subtopic: 'Exponents', difficulty: 'medium',
    question: 'If 2^x = 32, what is 2^(x−2)?',
    choices: ['4', '8', '16', '24', '30'],
    answer: 'B',
    explanation: '2^x = 32 = 2^5 ⇒ x = 5; 2^(5−2) = 2^3 = 8.'
  },
  {
    id: 29, type: 'PS', topic: 'Algebra', subtopic: 'Exponents', difficulty: 'hard',
    question: 'Simplify (2^10 + 2^10) / 2^11.',
    choices: ['1', '2', '1/2', '4', '0'],
    answer: 'A',
    explanation: '2^10 + 2^10 = 2 · 2^10 = 2^11. So 2^11 / 2^11 = 1.'
  },
  {
    id: 30, type: 'PS', topic: 'Algebra', subtopic: 'Inequalities', difficulty: 'easy',
    question: 'If 3x − 5 > 7, then',
    choices: ['x > 4', 'x < 4', 'x > 0', 'x ≥ 4', 'x ≤ 4'],
    answer: 'A',
    explanation: '3x > 12 ⇒ x > 4.'
  },
  {
    id: 31, type: 'PS', topic: 'Algebra', subtopic: 'Inequalities', difficulty: 'medium',
    question: 'If −2 < x < 5 and 1 < y < 6, the range of x + y is:',
    choices: ['−1 < x+y < 11', '0 < x+y < 10', '−2 < x+y < 6', '1 < x+y < 5', '−1 < x+y < 10'],
    answer: 'A',
    explanation: 'Min sum = −2 + 1 = −1, max = 5 + 6 = 11. Strict bounds.'
  },
  {
    id: 32, type: 'PS', topic: 'Algebra', subtopic: 'Absolute Value', difficulty: 'medium',
    question: 'How many integer solutions does |x − 3| < 4 have?',
    choices: ['5', '6', '7', '8', '9'],
    answer: 'C',
    explanation: '−4 < x − 3 < 4 ⇒ −1 < x < 7 ⇒ integers 0,1,2,3,4,5,6 = 7.'
  },
  {
    id: 33, type: 'PS', topic: 'Algebra', subtopic: 'Absolute Value', difficulty: 'hard',
    question: 'If |x + 4| = 3, then x² + 8x =',
    choices: ['−16', '−15', '−12', '−7', '0'],
    answer: 'D',
    explanation: 'x = −1 or x = −7. For x = −1: 1 − 8 = −7. For x = −7: 49 − 56 = −7. Either way, −7.'
  },
  {
    id: 34, type: 'PS', topic: 'Algebra', subtopic: 'Identities', difficulty: 'medium',
    question: 'If x + 1/x = 4, then x² + 1/x² =',
    choices: ['12', '14', '15', '16', '18'],
    answer: 'B',
    explanation: 'Square: (x + 1/x)² = x² + 2 + 1/x² = 16. So x² + 1/x² = 14.'
  },
  {
    id: 35, type: 'PS', topic: 'Algebra', subtopic: 'Identities', difficulty: 'medium',
    question: 'If a − b = 5 and a² − b² = 35, then a + b =',
    choices: ['5', '6', '7', '10', '12'],
    answer: 'C',
    explanation: 'a² − b² = (a + b)(a − b) ⇒ 35 = 5(a + b) ⇒ a + b = 7.'
  },
  {
    id: 36, type: 'PS', topic: 'Algebra', subtopic: 'Functions', difficulty: 'medium',
    question: 'If f(x) = 2x² − 3, then f(−2) =',
    choices: ['−5', '5', '8', '11', '13'],
    answer: 'B',
    explanation: 'f(−2) = 2(4) − 3 = 5.'
  },
  {
    id: 37, type: 'PS', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'medium',
    question: 'A taxi charges $2.50 base fare plus $0.40 per quarter mile. How much does a 5-mile ride cost?',
    choices: ['$8.50', '$9.50', '$10.50', '$11.50', '$12.50'],
    answer: 'C',
    explanation: '5 miles = 20 quarter-miles. Cost = 2.50 + 20 × 0.40 = 2.50 + 8.00 = 10.50.'
  },
  {
    id: 38, type: 'PS', topic: 'Algebra', subtopic: 'Word', difficulty: 'medium',
    question: 'Sum of two consecutive even integers is 78. What is the larger?',
    choices: ['38', '39', '40', '41', '42'],
    answer: 'C',
    explanation: 'n + (n + 2) = 78 ⇒ n = 38. Larger = 40.'
  },
  {
    id: 39, type: 'PS', topic: 'Algebra', subtopic: 'Quadratics', difficulty: 'hard',
    question: 'If x² + y² = 25 and xy = 12, what is (x + y)²?',
    choices: ['25', '37', '49', '61', '73'],
    answer: 'C',
    explanation: '(x + y)² = x² + 2xy + y² = 25 + 24 = 49.'
  },
  {
    id: 40, type: 'PS', topic: 'Algebra', subtopic: 'Functions', difficulty: 'hard',
    question: 'Let f(x) = x² + 1 and g(x) = 2x − 3. What is f(g(2))?',
    choices: ['1', '2', '5', '10', '17'],
    answer: 'B',
    explanation: 'g(2) = 1; f(1) = 1 + 1 = 2.'
  },
  {
    id: 41, type: 'PS', topic: 'Algebra', subtopic: 'Inequalities', difficulty: 'hard',
    question: 'For how many integer values of x is |2x − 5| ≤ 4?',
    choices: ['3', '4', '5', '6', '7'],
    answer: 'B',
    explanation: '−4 ≤ 2x − 5 ≤ 4 ⇒ 0.5 ≤ x ≤ 4.5 ⇒ integers 1, 2, 3, 4 = 4.'
  },
  {
    id: 42, type: 'PS', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'medium',
    question: 'A car rental costs $30/day plus $0.20/mile. If the bill was $80 for one day, how many miles?',
    choices: ['125', '200', '250', '300', '400'],
    answer: 'C',
    explanation: 'Mile cost = 80 − 30 = 50; miles = 50 / 0.20 = 250.'
  },

  // ═══════════════════════════════════════════════════
  //  GEOMETRY
  // ═══════════════════════════════════════════════════
  {
    id: 43, type: 'PS', topic: 'Geometry', subtopic: 'Triangles', difficulty: 'easy',
    question: 'A right triangle has legs of 3 and 4. What is the hypotenuse?',
    choices: ['5', '6', '7', '√7', '12'],
    answer: 'A',
    explanation: '√(9 + 16) = √25 = 5.'
  },
  {
    id: 44, type: 'PS', topic: 'Geometry', subtopic: 'Triangles', difficulty: 'medium',
    question: 'In a 30–60–90 triangle, the side opposite the 60° angle is 6√3. The hypotenuse is:',
    choices: ['6', '12', '6√2', '6√3', '12√3'],
    answer: 'B',
    explanation: 'Side ratio is 1 : √3 : 2. Side opposite 60° = x√3 = 6√3 ⇒ x = 6, hypotenuse = 2x = 12.'
  },
  {
    id: 45, type: 'PS', topic: 'Geometry', subtopic: 'Triangles', difficulty: 'easy',
    question: 'Two angles of a triangle are 50° and 70°. The third angle is:',
    choices: ['40°', '50°', '60°', '70°', '80°'],
    answer: 'C',
    explanation: 'Angles sum to 180°: 180 − 50 − 70 = 60°.'
  },
  {
    id: 46, type: 'PS', topic: 'Geometry', subtopic: 'Triangles', difficulty: 'medium',
    question: 'An isosceles right triangle has hypotenuse 10. Its area is:',
    choices: ['20', '25', '30', '50', '100'],
    answer: 'B',
    explanation: 'Each leg = 10/√2 = 5√2. Area = ½(5√2)(5√2) = ½ · 50 = 25.'
  },
  {
    id: 47, type: 'PS', topic: 'Geometry', subtopic: 'Triangles', difficulty: 'medium',
    question: 'In an equilateral triangle with side 6, what is the height?',
    choices: ['3', '3√2', '3√3', '6', '6√3'],
    answer: 'C',
    explanation: 'Height = (s√3)/2 = (6√3)/2 = 3√3.'
  },
  {
    id: 48, type: 'PS', topic: 'Geometry', subtopic: 'Triangles', difficulty: 'medium',
    question: 'An equilateral triangle has side 8. Area?',
    choices: ['8√3', '12√3', '16√3', '24√3', '32√3'],
    answer: 'C',
    explanation: 'Area = (√3/4) s² = (√3/4)(64) = 16√3.'
  },
  {
    id: 49, type: 'PS', topic: 'Geometry', subtopic: 'Circles', difficulty: 'easy',
    question: 'A circle has radius 7. Its area is:',
    choices: ['14π', '21π', '28π', '49π', '7π'],
    answer: 'D',
    explanation: 'A = πr² = 49π.'
  },
  {
    id: 50, type: 'PS', topic: 'Geometry', subtopic: 'Circles', difficulty: 'medium',
    question: 'A circle has circumference 12π. What is its area?',
    choices: ['12π', '24π', '36π', '72π', '144π'],
    answer: 'C',
    explanation: '2πr = 12π ⇒ r = 6 ⇒ A = π·36 = 36π.'
  },
  {
    id: 51, type: 'PS', topic: 'Geometry', subtopic: 'Circles', difficulty: 'hard',
    question: 'A 60° arc of a circle has length 5π. What is the area of the circle?',
    choices: ['25π', '100π', '225π', '625π', '900π'],
    answer: 'C',
    explanation: '60° = 1/6 of full circle ⇒ full circumference = 30π ⇒ r = 15. A = 225π.'
  },
  {
    id: 52, type: 'PS', topic: 'Geometry', subtopic: 'Coordinate', difficulty: 'easy',
    question: 'What is the distance between (1, 2) and (4, 6)?',
    choices: ['3', '4', '5', '7', '√7'],
    answer: 'C',
    explanation: '√(3² + 4²) = √25 = 5.'
  },
  {
    id: 53, type: 'PS', topic: 'Geometry', subtopic: 'Coordinate', difficulty: 'medium',
    question: 'Line passes through (2, 3) and (5, 9). What is its slope?',
    choices: ['1/2', '1', '3/2', '2', '3'],
    answer: 'D',
    explanation: 'm = (9 − 3) / (5 − 2) = 6 / 3 = 2.'
  },
  {
    id: 54, type: 'PS', topic: 'Geometry', subtopic: 'Coordinate', difficulty: 'medium',
    question: 'Line y = 2x + 3 is reflected across the x-axis. What is the new equation?',
    choices: ['y = −2x − 3', 'y = 2x − 3', 'y = −2x + 3', 'y = x − 3', 'y = −x + 3'],
    answer: 'A',
    explanation: 'Reflection across x-axis maps y → −y: −y = 2x + 3 ⇒ y = −2x − 3.'
  },
  {
    id: 55, type: 'PS', topic: 'Geometry', subtopic: 'Coordinate', difficulty: 'medium',
    question: 'Where do lines y = 2x + 3 and y = −x + 6 intersect?',
    choices: ['(1, 5)', '(2, 7)', '(1, 4)', '(0, 6)', '(3, 9)'],
    answer: 'A',
    explanation: '2x + 3 = −x + 6 ⇒ 3x = 3 ⇒ x = 1, y = 5.'
  },
  {
    id: 56, type: 'PS', topic: 'Geometry', subtopic: 'Coordinate', difficulty: 'hard',
    question: 'A circle is centered at (3, 4) and passes through the origin. Its radius is:',
    choices: ['3', '4', '5', '7', '√7'],
    answer: 'C',
    explanation: 'Distance from (3,4) to (0,0) = √(9 + 16) = 5.'
  },
  {
    id: 57, type: 'PS', topic: 'Geometry', subtopic: 'Quadrilaterals', difficulty: 'easy',
    question: 'A rectangle has length 12 and width 5. Its diagonal is:',
    choices: ['7', '13', '15', '17', '60'],
    answer: 'B',
    explanation: '√(144 + 25) = √169 = 13.'
  },
  {
    id: 58, type: 'PS', topic: 'Geometry', subtopic: 'Quadrilaterals', difficulty: 'medium',
    question: 'A square has area 64. What is the length of its diagonal?',
    choices: ['8', '8√2', '16', '32', '64'],
    answer: 'B',
    explanation: 'Side = 8; diagonal = 8√2.'
  },
  {
    id: 59, type: 'PS', topic: 'Geometry', subtopic: 'Volume', difficulty: 'medium',
    question: 'A cube has surface area 96. What is its volume?',
    choices: ['16', '32', '64', '96', '128'],
    answer: 'C',
    explanation: '6s² = 96 ⇒ s² = 16 ⇒ s = 4 ⇒ V = 64.'
  },
  {
    id: 60, type: 'PS', topic: 'Geometry', subtopic: 'Volume', difficulty: 'hard',
    question: 'Cylinder 1 has r = 3, h = 10. Cylinder 2 has r = 6, h = 5. Ratio V₁ : V₂ =',
    choices: ['1:1', '1:2', '1:4', '2:1', '4:1'],
    answer: 'B',
    explanation: 'V₁ = π·9·10 = 90π; V₂ = π·36·5 = 180π. 90 : 180 = 1 : 2.'
  },
  {
    id: 61, type: 'PS', topic: 'Geometry', subtopic: 'Volume', difficulty: 'medium',
    question: 'A sphere has radius 3. Volume?',
    choices: ['9π', '27π', '36π', '81π', '108π'],
    answer: 'C',
    explanation: 'V = (4/3)πr³ = (4/3)(27)π = 36π.'
  },
  {
    id: 62, type: 'PS', topic: 'Geometry', subtopic: 'Polygons', difficulty: 'medium',
    question: 'Sum of interior angles of an octagon is:',
    choices: ['720°', '900°', '1080°', '1260°', '1440°'],
    answer: 'C',
    explanation: '(n − 2) · 180° = 6 · 180° = 1080°.'
  },

  // ═══════════════════════════════════════════════════
  //  WORD PROBLEMS — Rate, Mixtures, Work, Age, Profit
  // ═══════════════════════════════════════════════════
  {
    id: 63, type: 'PS', topic: 'Word Problems', subtopic: 'Rate', difficulty: 'easy',
    question: 'A train travels at 60 mph for 2.5 hours. Distance covered:',
    choices: ['120 mi', '125 mi', '140 mi', '150 mi', '180 mi'],
    answer: 'D',
    explanation: 'd = rt = 60 · 2.5 = 150 miles.'
  },
  {
    id: 64, type: 'PS', topic: 'Word Problems', subtopic: 'Rate', difficulty: 'medium',
    question: 'Car A and Car B start 200 miles apart, driving toward each other at 40 and 60 mph. They meet in:',
    choices: ['1 hr', '1.5 hr', '2 hr', '2.5 hr', '3 hr'],
    answer: 'C',
    explanation: 'Closing rate = 100 mph. Time = 200 / 100 = 2 hr.'
  },
  {
    id: 65, type: 'PS', topic: 'Word Problems', subtopic: 'Rate', difficulty: 'hard',
    question: 'A jogger runs out at 6 mph and back at 4 mph along the same path. Average speed for the round trip:',
    choices: ['4.5 mph', '4.8 mph', '5.0 mph', '5.2 mph', '5.5 mph'],
    answer: 'B',
    explanation: 'Harmonic mean: 2(6)(4) / (6 + 4) = 48 / 10 = 4.8 mph.'
  },
  {
    id: 66, type: 'PS', topic: 'Word Problems', subtopic: 'Rate', difficulty: 'medium',
    question: 'A car travels 300 miles in 5 hours, then 200 miles in 4 hours. Average speed for the entire trip?',
    choices: ['50 mph', '52 mph', '55 mph', '55.6 mph', '60 mph'],
    answer: 'D',
    explanation: 'Total distance / total time = 500 / 9 ≈ 55.56 mph.'
  },
  {
    id: 67, type: 'PS', topic: 'Word Problems', subtopic: 'Rate', difficulty: 'hard',
    question: 'A boat goes 30 km downstream and 30 km back. Stream speed = 2 km/h, total time = 8 hours. Boat speed in still water?',
    choices: ['6 km/h', '7 km/h', '8 km/h', '9 km/h', '10 km/h'],
    answer: 'C',
    explanation: '30/(v+2) + 30/(v−2) = 8. Try v = 8: 30/10 + 30/6 = 3 + 5 = 8 ✓.'
  },
  {
    id: 68, type: 'PS', topic: 'Word Problems', subtopic: 'Work', difficulty: 'medium',
    question: 'Alice can paint a wall in 6 hours, Bob in 4 hours. Together?',
    choices: ['2 hr', '2.4 hr', '3 hr', '4 hr', '5 hr'],
    answer: 'B',
    explanation: '1/T = 1/6 + 1/4 = 5/12 ⇒ T = 12/5 = 2.4 hr.'
  },
  {
    id: 69, type: 'PS', topic: 'Word Problems', subtopic: 'Work', difficulty: 'hard',
    question: 'Pipe A fills a tank in 3 hours; pipe B drains it in 5 hours. Both open simultaneously, how long to fill (starting from empty)?',
    choices: ['3 hr', '4 hr', '5 hr', '7.5 hr', '8 hr'],
    answer: 'D',
    explanation: 'Net rate = 1/3 − 1/5 = 2/15 of tank per hour. Time = 15/2 = 7.5 hr.'
  },
  {
    id: 70, type: 'PS', topic: 'Word Problems', subtopic: 'Mixtures', difficulty: 'medium',
    question: 'A 30-liter solution is 20% salt. How much pure water must be added to make it 15% salt?',
    choices: ['5 L', '8 L', '10 L', '12 L', '15 L'],
    answer: 'C',
    explanation: 'Salt = 6 L (constant). 6 / (30 + x) = 0.15 ⇒ 30 + x = 40 ⇒ x = 10.'
  },
  {
    id: 71, type: 'PS', topic: 'Word Problems', subtopic: 'Mixtures', difficulty: 'hard',
    question: 'A 50-liter mix is 40% acid. How many liters must be drained and replaced with pure acid to make it 60% acid?',
    choices: ['10 L', '12.5 L', '15 L', '50/3 L (≈16.67)', '20 L'],
    answer: 'D',
    explanation: 'Drain x: acid removed = 0.4x; replaced with x liters of acid. New acid = 20 − 0.4x + x = 20 + 0.6x. Total = 50. (20 + 0.6x)/50 = 0.6 ⇒ 0.6x = 10 ⇒ x = 50/3.'
  },
  {
    id: 72, type: 'PS', topic: 'Word Problems', subtopic: 'Age', difficulty: 'medium',
    question: 'Mary is 3 times as old as her son. In 5 years she will be twice as old. Mary\'s current age?',
    choices: ['10', '12', '15', '18', '20'],
    answer: 'C',
    explanation: 'M = 3S; M + 5 = 2(S + 5). Substitute: 3S + 5 = 2S + 10 ⇒ S = 5, M = 15.'
  },
  {
    id: 73, type: 'PS', topic: 'Word Problems', subtopic: 'Compound Interest', difficulty: 'medium',
    question: '$1000 at 10% annual interest, compounded annually for 2 years grows to:',
    choices: ['$1100', '$1200', '$1210', '$1250', '$1331'],
    answer: 'C',
    explanation: '1000 · 1.1² = 1000 · 1.21 = 1210.'
  },
  {
    id: 74, type: 'PS', topic: 'Word Problems', subtopic: 'Simple Interest', difficulty: 'easy',
    question: 'Simple interest on $5000 at 6%/year for 3 years is:',
    choices: ['$300', '$600', '$900', '$1500', '$1800'],
    answer: 'C',
    explanation: 'I = Prt = 5000 · 0.06 · 3 = 900.'
  },
  {
    id: 75, type: 'PS', topic: 'Word Problems', subtopic: 'Sets', difficulty: 'medium',
    question: 'In a class of 60: 30 take French, 25 take Spanish, 15 take both. How many take neither?',
    choices: ['15', '20', '25', '30', '35'],
    answer: 'B',
    explanation: 'At least one = 30 + 25 − 15 = 40. Neither = 60 − 40 = 20.'
  },
  {
    id: 76, type: 'PS', topic: 'Word Problems', subtopic: 'Sets', difficulty: 'hard',
    question: 'In a 100-person survey: 70 read A, 50 read B, 35 read C. 30 read A&B, 20 read A&C, 15 read B&C, and 10 read all three. How many read at least one?',
    choices: ['85', '90', '95', '100', '105'],
    answer: 'D',
    explanation: 'Inclusion-exclusion: 70 + 50 + 35 − 30 − 20 − 15 + 10 = 100.'
  },
  {
    id: 77, type: 'PS', topic: 'Word Problems', subtopic: 'Profit', difficulty: 'medium',
    question: 'A trader buys an item for $80 and sells it for $100. Profit %?',
    choices: ['15%', '20%', '25%', '30%', '40%'],
    answer: 'C',
    explanation: '(100 − 80)/80 × 100 = 25%.'
  },

  // ═══════════════════════════════════════════════════
  //  STATISTICS
  // ═══════════════════════════════════════════════════
  {
    id: 78, type: 'PS', topic: 'Statistics', subtopic: 'Mean', difficulty: 'easy',
    question: 'Mean of 5, 8, 12, 15, 20 is:',
    choices: ['10', '11', '12', '13', '15'],
    answer: 'C',
    explanation: '(5 + 8 + 12 + 15 + 20) / 5 = 60 / 5 = 12.'
  },
  {
    id: 79, type: 'PS', topic: 'Statistics', subtopic: 'Mean', difficulty: 'medium',
    question: 'Average of 6 numbers is 22. If 5 of them sum to 110, what is the 6th?',
    choices: ['12', '20', '22', '24', '32'],
    answer: 'C',
    explanation: 'Total = 6 · 22 = 132. 6th = 132 − 110 = 22.'
  },
  {
    id: 80, type: 'PS', topic: 'Statistics', subtopic: 'Median', difficulty: 'easy',
    question: 'Median of 3, 7, 9, 4, 12?',
    choices: ['4', '7', '8', '9', '12'],
    answer: 'B',
    explanation: 'Sort: 3, 4, 7, 9, 12 ⇒ middle = 7.'
  },
  {
    id: 81, type: 'PS', topic: 'Statistics', subtopic: 'Range', difficulty: 'easy',
    question: 'Range of 4, 9, 1, 7, 6:',
    choices: ['5', '6', '7', '8', '9'],
    answer: 'D',
    explanation: 'Max − min = 9 − 1 = 8.'
  },
  {
    id: 82, type: 'PS', topic: 'Statistics', subtopic: 'Standard Deviation', difficulty: 'medium',
    question: 'Which set has the GREATEST standard deviation?',
    choices: ['{5,5,5,5,5}', '{4,5,5,5,6}', '{1,3,5,7,9}', '{4,4,5,6,6}', '{5,5,5,5,6}'],
    answer: 'C',
    explanation: '{1,3,5,7,9} is the most spread. SD measures spread around the mean.'
  },
  {
    id: 83, type: 'PS', topic: 'Statistics', subtopic: 'Mean', difficulty: 'hard',
    question: 'Mean of 5 numbers is 12. After adding two more numbers, mean becomes 14. Sum of the two new numbers?',
    choices: ['28', '30', '32', '38', '40'],
    answer: 'D',
    explanation: 'Original total = 60. New total = 7·14 = 98. Two new = 98 − 60 = 38.'
  },
  {
    id: 84, type: 'PS', topic: 'Statistics', subtopic: 'Weighted Mean', difficulty: 'medium',
    question: 'Weighted average of 80 (weight 3) and 60 (weight 2):',
    choices: ['68', '70', '72', '74', '76'],
    answer: 'C',
    explanation: '(80·3 + 60·2) / 5 = (240 + 120) / 5 = 72.'
  },
  {
    id: 85, type: 'PS', topic: 'Statistics', subtopic: 'Mean', difficulty: 'medium',
    question: 'Three test scores have mean 80. After a 4th test, mean rises to 82. What was the 4th score?',
    choices: ['82', '84', '86', '88', '90'],
    answer: 'D',
    explanation: 'Three sum = 240. Four sum = 4·82 = 328. 4th = 88.'
  },
  {
    id: 86, type: 'PS', topic: 'Statistics', subtopic: 'Standard Deviation', difficulty: 'hard',
    question: 'If 5 is added to every element of set S, the new SD compared to old is:',
    choices: ['Same', 'Old SD + 5', '5 × old SD', 'Old SD − 5', '√5 × old SD'],
    answer: 'A',
    explanation: 'Adding a constant shifts all values uniformly; spread (SD) is unchanged.'
  },
  {
    id: 87, type: 'PS', topic: 'Statistics', subtopic: 'Standard Deviation', difficulty: 'hard',
    question: 'If every element of set S is multiplied by 3, the new SD is:',
    choices: ['Same', 'Old SD + 3', 'Old SD × 3', 'Old SD ÷ 3', 'Old SD × 9'],
    answer: 'C',
    explanation: 'Multiplying every element by k scales SD by |k|.'
  },

  // ═══════════════════════════════════════════════════
  //  COMBINATORICS / PROBABILITY
  // ═══════════════════════════════════════════════════
  {
    id: 88, type: 'PS', topic: 'Combinatorics', subtopic: 'Permutations', difficulty: 'easy',
    question: 'How many ways can 4 people be arranged in a line?',
    choices: ['4', '12', '16', '24', '120'],
    answer: 'D',
    explanation: '4! = 24.'
  },
  {
    id: 89, type: 'PS', topic: 'Combinatorics', subtopic: 'Combinations', difficulty: 'medium',
    question: 'How many ways to choose 3 students from 8?',
    choices: ['24', '56', '120', '336', '512'],
    answer: 'B',
    explanation: 'C(8,3) = 8·7·6 / 6 = 56.'
  },
  {
    id: 90, type: 'PS', topic: 'Combinatorics', subtopic: 'Permutations', difficulty: 'medium',
    question: 'How many distinct 4-letter arrangements can be made from BOOK?',
    choices: ['6', '12', '24', '48', '60'],
    answer: 'B',
    explanation: '4! / 2! = 12 (O repeats once).'
  },
  {
    id: 91, type: 'PS', topic: 'Combinatorics', subtopic: 'Combinations', difficulty: 'hard',
    question: 'A committee of 5 is to be chosen from 6 men and 4 women, with at least 2 women. How many committees?',
    choices: ['180', '186', '195', '120', '252'],
    answer: 'B',
    explanation: 'Total C(10,5) = 252. Subtract committees with 0 or 1 woman: C(6,5) + C(4,1)·C(6,4) = 6 + 4·15 = 66. 252 − 66 = 186.'
  },
  {
    id: 92, type: 'PS', topic: 'Combinatorics', subtopic: 'Combinations', difficulty: 'medium',
    question: 'A team of 3 is selected from 5 men and 4 women. How many teams have exactly 1 woman?',
    choices: ['20', '30', '40', '60', '120'],
    answer: 'C',
    explanation: 'C(4,1) · C(5,2) = 4 · 10 = 40.'
  },
  {
    id: 93, type: 'PS', topic: 'Probability', subtopic: 'Basic', difficulty: 'easy',
    question: 'P(rolling a 5 on a fair die)?',
    choices: ['1/6', '1/3', '1/2', '5/6', '1'],
    answer: 'A',
    explanation: 'One favorable outcome out of 6.'
  },
  {
    id: 94, type: 'PS', topic: 'Probability', subtopic: 'Independent', difficulty: 'medium',
    question: 'Two coins flipped. P(both heads)?',
    choices: ['1/8', '1/4', '1/3', '1/2', '3/4'],
    answer: 'B',
    explanation: '½ · ½ = ¼.'
  },
  {
    id: 95, type: 'PS', topic: 'Probability', subtopic: 'Combined', difficulty: 'medium',
    question: 'A bag has 3 red and 5 blue marbles. Draw 2 without replacement. P(both red)?',
    choices: ['1/14', '3/28', '3/14', '5/28', '9/28'],
    answer: 'B',
    explanation: '(3/8)·(2/7) = 6/56 = 3/28.'
  },
  {
    id: 96, type: 'PS', topic: 'Probability', subtopic: 'Combined', difficulty: 'hard',
    question: 'P(at least one head in 3 coin flips)?',
    choices: ['1/8', '3/8', '1/2', '7/8', '1'],
    answer: 'D',
    explanation: '1 − P(no heads) = 1 − (½)³ = 1 − 1/8 = 7/8.'
  },
  {
    id: 97, type: 'PS', topic: 'Probability', subtopic: 'Conditional', difficulty: 'hard',
    question: 'A box has 3 white and 2 black balls. Draw 2 without replacement. P(2nd is white | 1st was white)?',
    choices: ['1/4', '1/3', '2/5', '1/2', '3/5'],
    answer: 'D',
    explanation: 'After removing 1 white: 2 white, 2 black left. P = 2/4 = ½.'
  },
  {
    id: 98, type: 'PS', topic: 'Probability', subtopic: 'Combined', difficulty: 'hard',
    question: 'A die is rolled twice. P(sum = 7)?',
    choices: ['1/12', '1/9', '1/6', '7/36', '11/36'],
    answer: 'C',
    explanation: '6 favorable pairs (1,6),(2,5),...,(6,1) out of 36 = 6/36 = 1/6.'
  },

  // ═══════════════════════════════════════════════════
  //  SEQUENCES
  // ═══════════════════════════════════════════════════
  {
    id: 99, type: 'PS', topic: 'Sequences', subtopic: 'Arithmetic', difficulty: 'easy',
    question: 'Arithmetic sequence: 7, 11, 15, 19, … . What is the 10th term?',
    choices: ['39', '40', '43', '47', '51'],
    answer: 'C',
    explanation: 'a_n = 7 + (n−1)·4. a_10 = 7 + 36 = 43.'
  },
  {
    id: 100, type: 'PS', topic: 'Sequences', subtopic: 'Arithmetic', difficulty: 'medium',
    question: 'Sum of first 50 positive even integers (2 + 4 + … + 100)?',
    choices: ['2500', '2550', '2600', '5000', '5050'],
    answer: 'B',
    explanation: 'n(first + last)/2 = 50·(2 + 100)/2 = 50·51 = 2550.'
  },
  {
    id: 101, type: 'PS', topic: 'Sequences', subtopic: 'Geometric', difficulty: 'medium',
    question: 'Geometric: 3, 6, 12, 24, … 7th term?',
    choices: ['96', '192', '384', '768', '1536'],
    answer: 'B',
    explanation: 'a_n = 3 · 2^(n−1). a_7 = 3 · 64 = 192.'
  },
  {
    id: 102, type: 'PS', topic: 'Sequences', subtopic: 'Sum', difficulty: 'easy',
    question: 'Sum of integers from 1 to 100, inclusive:',
    choices: ['4950', '5000', '5050', '5100', '10000'],
    answer: 'C',
    explanation: 'n(n+1)/2 = 100·101/2 = 5050.'
  },
  {
    id: 103, type: 'PS', topic: 'Sequences', subtopic: 'Arithmetic', difficulty: 'hard',
    question: 'In an arithmetic sequence, the 4th term is 11 and the 10th is 35. The 1st term is:',
    choices: ['−1', '1', '3', '5', '7'],
    answer: 'A',
    explanation: 'd = (35 − 11) / (10 − 4) = 4. a_1 = a_4 − 3d = 11 − 12 = −1.'
  },

  // ═══════════════════════════════════════════════════
  //  DATA SUFFICIENCY (50+ questions, IDs 104+)
  // ═══════════════════════════════════════════════════
  {
    id: 104, type: 'DS', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'easy',
    question: 'What is the value of x?\n(1) 2x + 3 = 11\n(2) x is positive.',
    choices: DS_CHOICES, answer: 'A',
    explanation: '(1) gives x = 4. Sufficient. (2) only restricts sign. Insufficient. Answer A.'
  },
  {
    id: 105, type: 'DS', topic: 'Algebra', subtopic: 'Systems', difficulty: 'medium',
    question: 'What is the value of x + y?\n(1) x − y = 3\n(2) 2x + 2y = 10',
    choices: DS_CHOICES, answer: 'B',
    explanation: '(1) alone: insufficient. (2) ⇒ x + y = 5. Sufficient.'
  },
  {
    id: 106, type: 'DS', topic: 'Algebra', subtopic: 'Inequalities', difficulty: 'medium',
    question: 'Is x > 0?\n(1) x² > 0\n(2) x³ > 0',
    choices: DS_CHOICES, answer: 'B',
    explanation: '(1) x² > 0 means x ≠ 0; could be ±. (2) x³ > 0 ⇒ x > 0. Sufficient alone.'
  },
  {
    id: 107, type: 'DS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'medium',
    question: 'Is integer n even?\n(1) n² is even\n(2) n + 3 is odd',
    choices: DS_CHOICES, answer: 'D',
    explanation: '(1) n² even ⇒ n even (because odd² = odd). Sufficient. (2) n + 3 odd ⇒ n even. Each alone.'
  },
  {
    id: 108, type: 'DS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'medium',
    question: 'Is integer n divisible by 4?\n(1) n is divisible by 2.\n(2) n is divisible by 8.',
    choices: DS_CHOICES, answer: 'B',
    explanation: '(1) divisible by 2 only — could be 2, 4, 6 — insufficient. (2) divisible by 8 ⇒ divisible by 4.'
  },
  {
    id: 109, type: 'DS', topic: 'Arithmetic', subtopic: 'Percents', difficulty: 'medium',
    question: 'A jacket originally priced $P was sold at a discount. What was the discount %?\n(1) The sale price was $80.\n(2) The discount was $20.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need both P and discount. (1) only sale price; (2) only discount. Together: P = 100, discount = 20%.'
  },
  {
    id: 110, type: 'DS', topic: 'Algebra', subtopic: 'Quadratics', difficulty: 'easy',
    question: 'Is x = 5?\n(1) x² = 25\n(2) x > 0',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) x = ±5. (2) any positive. Together: x = 5.'
  },
  {
    id: 111, type: 'DS', topic: 'Geometry', subtopic: 'Triangles', difficulty: 'medium',
    question: 'In triangle ABC, what is the measure of angle A?\n(1) Angle B = 50°\n(2) Angle C = 70°',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Each statement gives only one angle. Together: A = 180 − 50 − 70 = 60°.'
  },
  {
    id: 112, type: 'DS', topic: 'Geometry', subtopic: 'Quadrilaterals', difficulty: 'medium',
    question: 'What is the area of rectangle ABCD?\n(1) The perimeter is 20.\n(2) The diagonal is √50.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) L + W = 10. (2) L² + W² = 50. Together: 2LW = (L+W)² − (L²+W²) = 100 − 50 = 50 ⇒ LW = 25.'
  },
  {
    id: 113, type: 'DS', topic: 'Geometry', subtopic: 'Circles', difficulty: 'easy',
    question: 'What is the area of circle O?\n(1) Its diameter is 10.\n(2) Its circumference is 10π.',
    choices: DS_CHOICES, answer: 'D',
    explanation: 'Each gives r = 5 ⇒ A = 25π.'
  },
  {
    id: 114, type: 'DS', topic: 'Statistics', subtopic: 'Mean', difficulty: 'easy',
    question: 'What is the average of x, y, and z?\n(1) x + y + z = 30\n(2) x = 10',
    choices: DS_CHOICES, answer: 'A',
    explanation: '(1) avg = 30/3 = 10. Sufficient. (2) only one value.'
  },
  {
    id: 115, type: 'DS', topic: 'Word Problems', subtopic: 'Rate', difficulty: 'medium',
    question: 'A train travels from A to B. What is its speed?\n(1) The trip took 4 hours.\n(2) The distance is 240 miles.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need both distance and time. Together: 240/4 = 60 mph.'
  },
  {
    id: 116, type: 'DS', topic: 'Word Problems', subtopic: 'Mixtures', difficulty: 'hard',
    question: 'A solution is 30% acid. After adding pure water, what is the new % acid?\n(1) Original volume was 50 L.\n(2) 25 L of water was added.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need both. Acid = 0.30·50 = 15 L. New total = 75 L. % = 15/75 = 20%.'
  },
  {
    id: 117, type: 'DS', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'easy',
    question: 'What is x?\n(1) 5x = 25\n(2) x − 5 = 0',
    choices: DS_CHOICES, answer: 'D',
    explanation: 'Each gives x = 5.'
  },
  {
    id: 118, type: 'DS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'hard',
    question: 'Is integer N prime?\n(1) N is between 20 and 30.\n(2) N is odd.',
    choices: DS_CHOICES, answer: 'E',
    explanation: '(1) could be 23 (prime) or 25 (not). (2) too broad. Together: 21, 23, 25, 27, 29 — mix of prime and not.'
  },
  {
    id: 119, type: 'DS', topic: 'Algebra', subtopic: 'Inequalities', difficulty: 'medium',
    question: 'Is xy > 0?\n(1) x + y > 0\n(2) x · y · z > 0 and z > 0',
    choices: DS_CHOICES, answer: 'B',
    explanation: '(1) x = 5, y = −1: xy < 0; or x = 2, y = 3: xy > 0. (2) z > 0 and xyz > 0 ⇒ xy > 0.'
  },
  {
    id: 120, type: 'DS', topic: 'Geometry', subtopic: 'Coordinate', difficulty: 'medium',
    question: 'In the xy-plane, does line L pass through the origin?\n(1) L has slope 2.\n(2) L passes through (3, 6).',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Each alone is insufficient. Together: line through (3,6) with slope 2 ⇒ y = 2x ⇒ passes through (0,0).'
  },
  {
    id: 121, type: 'DS', topic: 'Statistics', subtopic: 'Range', difficulty: 'medium',
    question: 'In a group of 7 numbers, what is the range?\n(1) The maximum is 80.\n(2) The minimum is 12.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Range = max − min. Need both. Together: 80 − 12 = 68.'
  },
  {
    id: 122, type: 'DS', topic: 'Probability', subtopic: 'Basic', difficulty: 'medium',
    question: 'A bag has only red and blue marbles. P(red) on a single draw?\n(1) The number of red marbles is 8.\n(2) Twice as many red as blue.',
    choices: DS_CHOICES, answer: 'B',
    explanation: '(1) need total. (2) ratio 2:1 ⇒ P(red) = 2/3.'
  },
  {
    id: 123, type: 'DS', topic: 'Word Problems', subtopic: 'Age', difficulty: 'medium',
    question: 'How old is John now?\n(1) 5 years ago, John was twice his sister\'s age then.\n(2) John\'s sister is now 10.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) doesn\'t fix sister\'s age. (2) doesn\'t fix John\'s age. Together: 5 yr ago, sister 5; John = 10 then ⇒ now 15.'
  },
  {
    id: 124, type: 'DS', topic: 'Algebra', subtopic: 'Exponents', difficulty: 'medium',
    question: 'What is the value of 2^x · 3^y?\n(1) x = 2\n(2) y = 3',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need both. Together: 4 · 27 = 108.'
  },
  {
    id: 125, type: 'DS', topic: 'Arithmetic', subtopic: 'Fractions', difficulty: 'easy',
    question: 'What is the value of (a + b) / c?\n(1) a + b = 12\n(2) c = 4',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need both. 12/4 = 3.'
  },
  {
    id: 126, type: 'DS', topic: 'Word Problems', subtopic: 'Work', difficulty: 'hard',
    question: 'How many hours does it take Alice to complete a job alone?\n(1) Alice and Bob together complete the job in 4 hours.\n(2) Bob alone takes 6 hours.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '1/4 = 1/A + 1/6 ⇒ 1/A = 1/12 ⇒ A = 12. Need both.'
  },
  {
    id: 127, type: 'DS', topic: 'Geometry', subtopic: 'Triangles', difficulty: 'hard',
    question: 'Is triangle ABC right-angled?\n(1) AB² + BC² = AC²\n(2) AB = BC',
    choices: DS_CHOICES, answer: 'A',
    explanation: '(1) Pythagorean theorem ⇒ right angle at B. Sufficient. (2) isosceles, not necessarily right.'
  },
  {
    id: 128, type: 'DS', topic: 'Arithmetic', subtopic: 'Percents', difficulty: 'medium',
    question: 'In a survey, 60% of respondents are female. What is the total number of respondents?\n(1) 30 are male.\n(2) 45 are female.',
    choices: DS_CHOICES, answer: 'D',
    explanation: '(1) Males = 40% = 30 ⇒ total 75. (2) Females = 60% = 45 ⇒ total 75. Each alone.'
  },
  {
    id: 129, type: 'DS', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'easy',
    question: 'What is x?\n(1) x + y = 7\n(2) y = 3',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need both. x = 4.'
  },
  {
    id: 130, type: 'DS', topic: 'Geometry', subtopic: 'Quadrilaterals', difficulty: 'medium',
    question: 'Is quadrilateral ABCD a square?\n(1) All four sides are equal.\n(2) All four angles are 90°.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) rhombus possible. (2) rectangle possible. Together: rhombus + rectangle = square.'
  },
  {
    id: 131, type: 'DS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'hard',
    question: 'If x and y are positive integers, is xy divisible by 6?\n(1) x is divisible by 3.\n(2) y is even.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) only x mult of 3 — y could be odd. (2) y even — x might not have 3. Together: factor 3 from x and factor 2 from y ⇒ 6 | xy.'
  },
  {
    id: 132, type: 'DS', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'medium',
    question: 'What is the value of 3a + 2b?\n(1) a + b = 5\n(2) 2a + b = 8',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) alone insufficient. (2) alone insufficient. Together: a = 3, b = 2 ⇒ 13.'
  },
  {
    id: 133, type: 'DS', topic: 'Word Problems', subtopic: 'Rate', difficulty: 'medium',
    question: 'A boat travels upstream at speed S₁ and downstream at S₂. What is the speed of the current?\n(1) S₁ = 8 mph\n(2) S₂ = 12 mph',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Current = (S₂ − S₁)/2 = (12 − 8)/2 = 2 mph.'
  },
  {
    id: 134, type: 'DS', topic: 'Geometry', subtopic: 'Coordinate', difficulty: 'medium',
    question: 'What is the distance between points P and Q in the xy-plane?\n(1) P is at (2, 3).\n(2) Q is at (5, 7).',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need both. Distance = √(9 + 16) = 5.'
  },
  {
    id: 135, type: 'DS', topic: 'Probability', subtopic: 'Combined', difficulty: 'medium',
    question: 'A box contains marbles, some red and some blue. P(red on a single draw)?\n(1) There are 6 red marbles.\n(2) The ratio red:blue is 3:2.',
    choices: DS_CHOICES, answer: 'B',
    explanation: '(1) Need total. (2) Ratio gives P(red) = 3/5.'
  },
  {
    id: 136, type: 'DS', topic: 'Arithmetic', subtopic: 'Decimals', difficulty: 'easy',
    question: 'What is the value of x?\n(1) 0.5x = 7.5\n(2) x − 5 = 10',
    choices: DS_CHOICES, answer: 'D',
    explanation: '(1) x = 15. (2) x = 15.'
  },
  {
    id: 137, type: 'DS', topic: 'Algebra', subtopic: 'Quadratics', difficulty: 'medium',
    question: 'What is x² − y²?\n(1) x − y = 4\n(2) x + y = 10',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'x² − y² = (x+y)(x−y) = 10·4 = 40.'
  },
  {
    id: 138, type: 'DS', topic: 'Geometry', subtopic: 'Volume', difficulty: 'medium',
    question: 'What is the volume of a rectangular box?\n(1) Length × width = 20.\n(2) Height = 5.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'V = lwh. Together: 20·5 = 100.'
  },
  {
    id: 139, type: 'DS', topic: 'Statistics', subtopic: 'Standard Deviation', difficulty: 'hard',
    question: 'Is the standard deviation of set S greater than that of set T?\n(1) Range of S is greater than range of T.\n(2) S has more elements than T.',
    choices: DS_CHOICES, answer: 'E',
    explanation: '(1) larger range does NOT guarantee larger SD (e.g. one outlier). (2) sample size doesn\'t determine SD. Together still insufficient.'
  },
  {
    id: 140, type: 'DS', topic: 'Word Problems', subtopic: 'Sets', difficulty: 'medium',
    question: 'In a class, every student takes math, English, or both. How many take only math?\n(1) 25 take math.\n(2) 10 take both.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Only math = math − both = 25 − 10 = 15.'
  },
  {
    id: 141, type: 'DS', topic: 'Algebra', subtopic: 'Functions', difficulty: 'medium',
    question: 'If f(x) = ax + b, what is f(5)?\n(1) f(0) = 3\n(2) f(1) = 5',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) b = 3. (2) a + b = 5. Together a = 2, f(5) = 13.'
  },
  {
    id: 142, type: 'DS', topic: 'Algebra', subtopic: 'Inequalities', difficulty: 'hard',
    question: 'Is x > y?\n(1) x² > y²\n(2) x − y > 0',
    choices: DS_CHOICES, answer: 'B',
    explanation: '(1) x = −5, y = 2: x² > y² but x < y. Insufficient. (2) x − y > 0 ⇒ x > y.'
  },
  {
    id: 143, type: 'DS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'medium',
    question: 'Is integer N positive?\n(1) N² is positive.\n(2) N + |N| > 0',
    choices: DS_CHOICES, answer: 'B',
    explanation: '(1) N ≠ 0; could be ±. (2) If N ≤ 0, N + |N| = 0; only N > 0 makes it > 0.'
  },
  {
    id: 144, type: 'DS', topic: 'Word Problems', subtopic: 'Compound Interest', difficulty: 'hard',
    question: 'How much is in account A after 1 year?\n(1) Account A earns 5% interest.\n(2) Account A has $1000 deposited initially.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need rate, principal, and time. Together: 1000 · 1.05 = $1050.'
  },
  {
    id: 145, type: 'DS', topic: 'Geometry', subtopic: 'Triangles', difficulty: 'medium',
    question: 'In triangle ABC, is angle A > 60°?\n(1) BC is the longest side.\n(2) Angle B = 70°',
    choices: DS_CHOICES, answer: 'A',
    explanation: '(1) Largest side opposite largest angle ⇒ A is largest. In a triangle the largest angle is > 60° (avg = 60°). Sufficient. (2) angle A could be 50° (with C = 60°) — insufficient.'
  },
  {
    id: 146, type: 'DS', topic: 'Algebra', subtopic: 'Linear Equations', difficulty: 'medium',
    question: 'What is x?\n(1) x = 3y + 2\n(2) y = 4',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need both. x = 3·4 + 2 = 14.'
  },
  {
    id: 147, type: 'DS', topic: 'Geometry', subtopic: 'Quadrilaterals', difficulty: 'easy',
    question: 'What is the area of square ABCD?\n(1) Side length = 6.\n(2) Diagonal = 6√2.',
    choices: DS_CHOICES, answer: 'D',
    explanation: '(1) area = 36. (2) side = 6 (diagonal/√2) ⇒ area = 36.'
  },
  {
    id: 148, type: 'DS', topic: 'Statistics', subtopic: 'Mean', difficulty: 'medium',
    question: 'Five students took a test. What is the average score?\n(1) The lowest is 60 and the highest is 100.\n(2) The total is 400.',
    choices: DS_CHOICES, answer: 'B',
    explanation: '(1) only extremes. (2) avg = 400/5 = 80.'
  },
  {
    id: 149, type: 'DS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'easy',
    question: 'Is integer K odd?\n(1) K + 1 is even.\n(2) K + 2 is odd.',
    choices: DS_CHOICES, answer: 'D',
    explanation: '(1) K + 1 even ⇒ K odd. (2) K + 2 odd ⇒ K odd. Each alone.'
  },
  {
    id: 150, type: 'DS', topic: 'Combinatorics', subtopic: 'Permutations', difficulty: 'medium',
    question: 'How many ways to arrange the letters in a word?\n(1) The word has 5 distinct letters.\n(2) Two of the letters are vowels.',
    choices: DS_CHOICES, answer: 'A',
    explanation: '(1) 5 distinct ⇒ 5! = 120. (2) doesn\'t specify total length.'
  },
  {
    id: 151, type: 'DS', topic: 'Statistics', subtopic: 'Median', difficulty: 'medium',
    question: 'In a set of 5 distinct numbers {a, b, c, d, e}, what is the median?\n(1) When sorted, the order is a < b < c < d < e.\n(2) c = 10',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) Identifies the median position (c). (2) Gives c\'s value. Together: median = c = 10.'
  },
  {
    id: 152, type: 'DS', topic: 'Word Problems', subtopic: 'Rate', difficulty: 'hard',
    question: 'How long is the train?\n(1) The train passes a fixed point in 10 seconds.\n(2) The train\'s speed is 60 mph.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Length = speed × time. Need both.'
  },
  {
    id: 153, type: 'DS', topic: 'Geometry', subtopic: 'Polygons', difficulty: 'medium',
    question: 'A regular polygon has interior angles of 144°. How many sides?\n(1) Each exterior angle is 36°.\n(2) Each interior angle is 144°.',
    choices: DS_CHOICES, answer: 'D',
    explanation: '(1) 360° / 36° = 10 sides. (2) Interior 144° ⇒ exterior 36° ⇒ 10 sides. Each alone.'
  },
  {
    id: 154, type: 'DS', topic: 'Algebra', subtopic: 'Absolute Value', difficulty: 'medium',
    question: 'Is x = 4?\n(1) |x| = 4\n(2) x is positive.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) x = ±4. (2) only sign. Together: x = 4.'
  },
  {
    id: 155, type: 'DS', topic: 'Combinatorics', subtopic: 'Combinations', difficulty: 'medium',
    question: 'A team of 3 is to be chosen from a group. How many possible teams?\n(1) The group has 7 members.\n(2) Each team must include the captain.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) C(7,3) = 35 (without restriction). (2) restriction without group size. Together: pick 2 from remaining 6 ⇒ C(6,2) = 15.'
  },
  {
    id: 156, type: 'DS', topic: 'Probability', subtopic: 'Independent', difficulty: 'medium',
    question: 'Two coins are flipped. What is P(both heads)?\n(1) Each coin is fair.\n(2) The coins are independent.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) Each is 50/50, but if not independent, joint prob unknown. (2) independent but probabilities unknown. Together: ½·½ = ¼.'
  },
  {
    id: 157, type: 'DS', topic: 'Word Problems', subtopic: 'Profit', difficulty: 'medium',
    question: 'A store sells an item at a profit. What is the profit margin?\n(1) The cost is $40.\n(2) The selling price is $50.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'Need both cost and selling price. Together: 25%.'
  },
  {
    id: 158, type: 'DS', topic: 'Sequences', subtopic: 'Arithmetic', difficulty: 'medium',
    question: 'In an arithmetic sequence, what is the 10th term?\n(1) The first term is 3.\n(2) The common difference is 4.',
    choices: DS_CHOICES, answer: 'C',
    explanation: 'a_n = a_1 + (n−1)d. Need both. Together: 3 + 9·4 = 39.'
  },
  {
    id: 159, type: 'DS', topic: 'Geometry', subtopic: 'Coordinate', difficulty: 'hard',
    question: 'Does line L (in the xy-plane) pass through quadrant III?\n(1) L has slope 1.\n(2) L has y-intercept 2.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) slope 1, but intercept unknown. (2) intercept 2, slope unknown. Together: y = x + 2 ⇒ in QIII when x < −2 ⇒ yes.'
  },
  {
    id: 160, type: 'DS', topic: 'Arithmetic', subtopic: 'Number Properties', difficulty: 'hard',
    question: 'If x is a positive integer, is x divisible by 12?\n(1) x is divisible by 4.\n(2) x is divisible by 6.',
    choices: DS_CHOICES, answer: 'C',
    explanation: '(1) x = 4 (no), x = 12 (yes) — insufficient. (2) x = 6 (no), x = 12 (yes) — insufficient. Together: x is divisible by LCM(4,6) = 12 ⇒ YES, sufficient.'
  }
];

// Sanity for the front end
const TOPICS = [...new Set(QUESTIONS.map(q => q.topic))].sort();
const DIFFICULTIES = ['easy', 'medium', 'hard'];

// Stats
QUESTIONS.PS_COUNT = QUESTIONS.filter(q => q.type === 'PS').length;
QUESTIONS.DS_COUNT = QUESTIONS.filter(q => q.type === 'DS').length;

window.GMAT_QUESTIONS = QUESTIONS;
window.GMAT_TOPICS = TOPICS;
window.GMAT_DIFFICULTIES = DIFFICULTIES;
window.GMAT_DS_CHOICES = DS_CHOICES;
