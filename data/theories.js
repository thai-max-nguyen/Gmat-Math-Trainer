// ════════════════════════════════════════════════════════════════
//  GMAT Math Trainer — Theory Library
//  Keyed by topic name (matches question bank topic field).
//  Each entry: { title, summary, keyFacts[], example{}, traps[], solveSteps[] }
// ════════════════════════════════════════════════════════════════

const GMAT_THEORIES = {

  // ─── ARITHMETIC ──────────────────────────────────────────────

  'Percents': {
    title: 'Percents',
    icon: '%',
    summary: 'A percent is a ratio per 100. Mastering percent change, successive percents, and percent of a percent eliminates a huge chunk of GMAT arithmetic errors.',
    keyFacts: [
      'percent = part ÷ whole × 100',
      'New value = Original × (1 ± r/100)',
      'Percent change = (New − Old) / Old × 100',
      'Successive +a% then +b%: net = a + b + ab/100',
      'Two successive equal changes are NEVER neutral: +x% then −x% = net −(x²/100)%',
      'Markup then discount with same % always results in a net LOSS',
    ],
    example: {
      problem: 'A price is raised 20%, then discounted 20%. What is the net change?',
      steps: [
        'Start: $100',
        'After +20%: 100 × 1.20 = $120',
        'After −20%: 120 × 0.80 = $96',
        'Net: $96 − $100 = −$4 → −4%',
        'Shortcut: −(20)²/100 = −4%',
      ],
      answer: '−4%',
    },
    traps: [
      '"50% more" ≠ "50% of" — know which one the question asks',
      'Percent of a smaller base vs larger base: direction matters',
      '"Increased by 200%" means tripled, not doubled',
      'Always clarify WHAT the percent is of (base confusion is the #1 trap)',
    ],
    solveSteps: [
      '1. Identify the base (what is the % OF?)',
      '2. Convert % to decimal: 35% → 0.35',
      '3. Multiply or divide as needed',
      '4. For changes, use multipliers: +20% → ×1.20, −15% → ×0.85',
    ],
  },

  'Fractions': {
    title: 'Fractions & Ratios',
    icon: '½',
    summary: 'Fractions on the GMAT test your ability to compare, add, multiply, and simplify quickly. Ratios extend fractions to multi-part comparisons.',
    keyFacts: [
      'a/b ÷ c/d = a/b × d/c (flip and multiply)',
      'To add/subtract: find LCD first',
      'x/y + a/b = (xb + ay) / (yb)',
      'Comparing fractions: cross-multiply to compare (no sign flip since denominators are positive)',
      'Ratio a:b means a/(a+b) and b/(a+b) of total',
      'Compound ratio: combine proportions multiplicatively',
    ],
    example: {
      problem: 'If 2/3 of a tank is filled in 4 hours, how long to fill 5/6 of the tank?',
      steps: [
        'Rate = (2/3) ÷ 4 = 1/6 of tank per hour',
        'Time for 5/6 tank = (5/6) ÷ (1/6) = 5 hours',
      ],
      answer: '5 hours',
    },
    traps: [
      'Adding fractions by adding numerators AND denominators separately is WRONG: 1/2 + 1/3 ≠ 2/5',
      'The larger the denominator, the SMALLER the fraction (for equal numerators)',
      '"What fraction of X is Y?" — Y is numerator, X is denominator',
    ],
    solveSteps: [
      '1. Simplify fractions before multiplying',
      '2. Use cross-multiplication for comparing or solving equations',
      '3. Convert to decimals for quick sanity checks',
      '4. For complex expressions, find LCD and combine',
    ],
  },

  'Number Properties': {
    title: 'Number Properties',
    icon: '#',
    summary: 'GMAT number properties cover integers, factors, multiples, odd/even rules, and divisibility — often tested in DS questions where you must determine sufficiency.',
    keyFacts: [
      'Even × anything = even; Odd × odd = odd',
      'Even + odd = odd; Even + even = even; Odd + odd = even',
      'If n² is divisible by p (prime), then n is divisible by p',
      'LCM × GCF = product of the two numbers',
      'Number of factors of n = multiply (exponent+1) for each prime factor',
      '0 is even; 1 is neither prime nor composite',
      'Consecutive integers: product of n consecutive integers divisible by n!',
    ],
    example: {
      problem: 'If n² is divisible by 72, what is the largest integer that must divide n?',
      steps: [
        '72 = 2³ × 3²',
        'For n² divisible by 2³: n must have at least 2², so n divisible by 4',
        'For n² divisible by 3²: n must have at least 3¹',
        'So n must be divisible by 4 × 3 = 12',
      ],
      answer: '12',
    },
    traps: [
      '"Divisible by" ≠ "a multiple of" — they ARE the same but watch wording',
      'Negative integers can still be even/odd',
      'Zero divisibility: 0 is divisible by any non-zero integer',
      '"Must be" vs "could be" — very different! Test extreme cases.',
    ],
    solveSteps: [
      '1. Prime-factorize all numbers involved',
      '2. Apply odd/even rules systematically',
      '3. For DS: test n=1, n=0, n=negative to find counterexamples',
      '4. Use factor counting formula when needed: (e₁+1)(e₂+1)...',
    ],
  },

  'Primes': {
    title: 'Prime Numbers',
    icon: 'P',
    summary: 'Primes are the building blocks of all integers. GMAT tests prime factorization, GCF, LCM, and the properties of prime-related expressions.',
    keyFacts: [
      'Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37 (memorize to 37)',
      '2 is the ONLY even prime',
      'Every integer > 1 has a unique prime factorization',
      'GCF = product of lowest powers of common primes',
      'LCM = product of highest powers of all primes',
      'LCM × GCF = a × b (for two numbers)',
    ],
    example: {
      problem: 'Find GCF and LCM of 72 and 48.',
      steps: [
        '72 = 2³ × 3²',
        '48 = 2⁴ × 3',
        'GCF = 2³ × 3 = 24 (lowest powers)',
        'LCM = 2⁴ × 3² = 144 (highest powers)',
        'Check: 72 × 48 = 3456 = 24 × 144 ✓',
      ],
      answer: 'GCF = 24, LCM = 144',
    },
    traps: [
      '1 is NOT prime',
      'The question "how many prime factors" vs "how many factors" — huge difference',
      'When testing if a number is prime, only check divisibility up to √n',
    ],
    solveSteps: [
      '1. Write prime factorization using factor trees',
      '2. For GCF: take minimum exponents of shared primes',
      '3. For LCM: take maximum exponents of all primes',
      '4. Verify using LCM × GCF = product',
    ],
  },

  'LCM/GCF': {
    title: 'LCM & GCF',
    icon: '∩',
    summary: 'LCM (Least Common Multiple) and GCF (Greatest Common Factor) appear in fraction work, divisibility problems, and DS questions about shared properties.',
    keyFacts: [
      'GCF = product of SHARED prime factors at MINIMUM exponents',
      'LCM = product of ALL prime factors at MAXIMUM exponents',
      'LCM(a,b) × GCF(a,b) = a × b',
      'If GCF(a,b) = 1, the numbers are coprime (relatively prime)',
      'LCM of fractions = LCM of numerators / GCF of denominators',
    ],
    example: {
      problem: 'Two buses leave every 8 and 12 minutes. When do they next leave together?',
      steps: [
        '8 = 2³, 12 = 2² × 3',
        'LCM = 2³ × 3 = 24 minutes',
      ],
      answer: 'After 24 minutes',
    },
    traps: [
      'GCF ≤ both numbers; LCM ≥ both numbers — always sanity-check',
      'GCF of consecutive integers is always 1',
    ],
    solveSteps: [
      '1. Prime-factorize both numbers',
      '2. GCF: shared primes, take smaller exponent',
      '3. LCM: all primes, take larger exponent',
    ],
  },

  'Decimals': {
    title: 'Decimals',
    icon: '.',
    summary: 'Decimal problems test place value, rounding, and conversion between fractions and decimals. Key skill: recognizing terminating vs. repeating decimals.',
    keyFacts: [
      'Terminating decimal ⟺ denominator has only factors of 2 and 5',
      'Move decimal right = multiply by 10; left = divide by 10',
      '1/3 = 0.333…, 1/6 = 0.1666…, 1/7 = 0.142857…',
      '1/8 = 0.125, 1/9 = 0.111…, 1/11 = 0.0909…',
    ],
    example: {
      problem: 'Does 7/40 terminate?',
      steps: ['40 = 2³ × 5', 'Only factors of 2 and 5 → YES, terminates', '7/40 = 0.175'],
      answer: 'Yes, 0.175',
    },
    traps: [
      'Rounding 0.5 — GMAT rounds away from zero (0.5 → 1, −0.5 → −1)',
      'Adding zeros after decimal point doesn\'t change value: 0.5 = 0.50',
    ],
    solveSteps: [
      '1. Convert fraction to decimal via long division or memorized values',
      '2. Check termination by factoring denominator',
      '3. Round at the specified decimal place',
    ],
  },

  // ─── ALGEBRA ────────────────────────────────────────────────

  'Algebra': {
    title: 'Algebra',
    icon: 'x',
    summary: 'GMAT algebra tests your ability to set up equations, solve for unknowns, work with inequalities, and apply special formulas.',
    keyFacts: [
      '(a+b)² = a² + 2ab + b²',
      '(a−b)² = a² − 2ab + b²',
      '(a+b)(a−b) = a² − b²',
      'For ax² + bx + c = 0: x = (−b ± √(b²−4ac)) / 2a',
      'If a product = 0, at least one factor = 0',
    ],
    example: {
      problem: 'If x² − 5x + 6 = 0, what are the values of x?',
      steps: [
        'Factor: (x−2)(x−3) = 0',
        'x = 2 or x = 3',
      ],
      answer: 'x = 2 or x = 3',
    },
    traps: [
      'Don\'t divide both sides by a variable (it could be 0)',
      'Squaring both sides can introduce extraneous solutions — always check',
      'x² = 4 means x = ±2, not just x = 2',
    ],
    solveSteps: [
      '1. Isolate the unknown on one side',
      '2. Factor when possible before using quadratic formula',
      '3. Check all solutions in original equation',
    ],
  },

  'Linear Equations': {
    title: 'Linear Equations & Systems',
    icon: '=',
    summary: 'Linear equations appear everywhere. Systems of equations require the right number of independent equations to solve for unknowns — a core DS concept.',
    keyFacts: [
      'One equation → can solve for 1 unknown',
      'Two equations, two unknowns → unique solution (if independent)',
      'Elimination: multiply equations to cancel one variable',
      'Substitution: solve one equation, plug into the other',
      'Parallel lines (same slope, different y-int) → NO solution',
      'Same line → INFINITE solutions',
    ],
    example: {
      problem: 'Solve: 2x + 3y = 12 and x − y = 1',
      steps: [
        'From eq2: x = y + 1',
        'Substitute: 2(y+1) + 3y = 12',
        '5y + 2 = 12 → y = 2',
        'x = y + 1 = 3',
      ],
      answer: 'x = 3, y = 2',
    },
    traps: [
      'DS trap: two equations that are multiples of each other are NOT independent',
      '"2 equations, 2 unknowns" doesn\'t always mean sufficient — check if they\'re the same line',
    ],
    solveSteps: [
      '1. Count equations vs unknowns',
      '2. Check independence (not scalar multiples)',
      '3. Choose elimination or substitution based on structure',
    ],
  },

  'Quadratics': {
    title: 'Quadratics',
    icon: 'x²',
    summary: 'Quadratic equations produce 0, 1, or 2 solutions. On GMAT, factoring is almost always faster than the quadratic formula.',
    keyFacts: [
      'Factor by finding two numbers that multiply to c and add to b (in x²+bx+c)',
      'Discriminant b²−4ac: >0 two solutions, =0 one solution, <0 no real solutions',
      'Sum of roots = −b/a; Product of roots = c/a',
      'Perfect squares: (x±k)² = x²±2kx+k²',
      '(a²−b²) = (a+b)(a−b) — very common on GMAT',
    ],
    example: {
      problem: 'Factor x² + 7x + 12',
      steps: [
        'Need two numbers: multiply to 12, add to 7',
        '3 × 4 = 12, 3 + 4 = 7 ✓',
        '(x + 3)(x + 4)',
        'Solutions: x = −3 or x = −4',
      ],
      answer: '(x+3)(x+4) = 0',
    },
    traps: [
      'Never cancel (x−a) unless you know x ≠ a — you\'d lose a solution',
      '−b/a gives sum of roots — useful shortcut to avoid solving',
    ],
    solveSteps: [
      '1. Move everything to one side (= 0)',
      '2. Try factoring first — look for (x+a)(x+b)',
      '3. If can\'t factor, use quadratic formula',
      '4. Verify solutions by plugging back in',
    ],
  },

  'Inequalities': {
    title: 'Inequalities',
    icon: '<',
    summary: 'Inequalities follow the same rules as equations EXCEPT: multiplying/dividing by a negative number flips the sign. Absolute values create two-case problems.',
    keyFacts: [
      'Multiplying/dividing by negative → FLIP the inequality sign',
      '|x| < a ⟺ −a < x < a',
      '|x| > a ⟺ x > a OR x < −a',
      'For x² < a² (where a > 0): −a < x < a',
      'Cannot multiply inequalities unless both sides are positive',
      'To combine: (a < b) AND (c < d) → a+c < b+d (can ADD inequalities)',
    ],
    example: {
      problem: 'Solve: |2x − 3| < 7',
      steps: [
        '−7 < 2x − 3 < 7',
        'Add 3: −4 < 2x < 10',
        'Divide by 2: −2 < x < 5',
      ],
      answer: '−2 < x < 5',
    },
    traps: [
      'When multiplying by a variable, you DON\'T know its sign → split into cases or avoid',
      'DS: "x > 0" gives different info than "x² > 0" (negative x satisfies x²>0)',
    ],
    solveSteps: [
      '1. Isolate the expression (treat like equation)',
      '2. If multiplying/dividing by negative → flip sign',
      '3. For absolute value → split into two cases',
      '4. Draw number line to verify solution range',
    ],
  },

  'Exponents': {
    title: 'Exponents & Roots',
    icon: 'xⁿ',
    summary: 'Exponent rules are mechanical — master them and these questions become free points. GMAT loves testing whether you know the rules cold.',
    keyFacts: [
      'xᵃ × xᵇ = xᵃ⁺ᵇ',
      'xᵃ ÷ xᵇ = xᵃ⁻ᵇ',
      '(xᵃ)ᵇ = xᵃᵇ',
      '(xy)ᵃ = xᵃyᵃ',
      'x⁰ = 1 (for x ≠ 0)',
      'x⁻ᵃ = 1/xᵃ',
      'x^(1/n) = ⁿ√x',
      'Units digit of powers cycle in patterns (2: 2,4,8,6; 7: 7,9,3,1)',
    ],
    example: {
      problem: 'What is the units digit of 7⁸⁵?',
      steps: [
        'Units digit pattern of 7: 7, 9, 3, 1 (cycle length 4)',
        '85 ÷ 4 = remainder 1',
        'Remainder 1 → same as 7¹ → units digit 7',
      ],
      answer: '7',
    },
    traps: [
      '(x+y)² ≠ x² + y² — never distribute exponents over addition',
      '√(x²) = |x|, not x (if x could be negative)',
      '(-2)⁴ = 16 ≠ -16 — even exponents make negatives positive',
    ],
    solveSteps: [
      '1. Apply exponent rules to simplify before computing',
      '2. For units digit: find cycle length, compute remainder',
      '3. Rewrite roots as fractional exponents to apply rules',
    ],
  },

  'Absolute Value': {
    title: 'Absolute Value',
    icon: '|x|',
    summary: '|x| represents distance from zero. Split into cases based on the sign of the expression inside.',
    keyFacts: [
      '|x| = x if x ≥ 0; −x if x < 0',
      '|x| ≥ 0 always',
      '|xy| = |x||y|',
      '|x + y| ≤ |x| + |y| (triangle inequality)',
      '|x − a| = distance between x and a on number line',
    ],
    example: {
      problem: 'Solve |x − 2| = 5',
      steps: [
        'Case 1: x − 2 = 5 → x = 7',
        'Case 2: x − 2 = −5 → x = −3',
        'Both valid — check: |7−2|=5 ✓, |−3−2|=5 ✓',
      ],
      answer: 'x = 7 or x = −3',
    },
    traps: [
      'DS: "is |x| = x?" asks "is x ≥ 0?" — tests sign',
      '|x| = −x does NOT mean x is negative; it means we took the negative of a negative',
    ],
    solveSteps: [
      '1. Identify the expression inside |…|',
      '2. Set up Case 1 (inside ≥ 0) and Case 2 (inside < 0)',
      '3. Solve each case',
      '4. Check both solutions in original equation',
    ],
  },

  'Functions': {
    title: 'Functions',
    icon: 'f(x)',
    summary: 'Function questions test whether you can evaluate and compose functions. GMAT also uses "special notation" functions — just follow the definition mechanically.',
    keyFacts: [
      'f(a) means "plug a in for x"',
      'f(g(x)) — evaluate inside-out: find g(x) first, then plug into f',
      'Domain: values of x that don\'t cause division by zero or √(negative)',
      'Range: all possible output values',
    ],
    example: {
      problem: 'If f(x) = x² − 3 and g(x) = 2x + 1, find f(g(2))',
      steps: [
        'g(2) = 2(2) + 1 = 5',
        'f(5) = 5² − 3 = 22',
      ],
      answer: '22',
    },
    traps: [
      '"x ⊕ y = x² − y" — just substitute the definition literally',
      'f(x+1) ≠ f(x) + f(1) in general',
    ],
    solveSteps: [
      '1. Replace variable with given value',
      '2. For composite: evaluate innermost function first',
      '3. For special notation: follow definition exactly',
    ],
  },

  'Systems': {
    title: 'Systems of Equations',
    icon: '{}',
    summary: 'Systems of equations require n independent equations to solve n unknowns. Critical for DS sufficiency judgments.',
    keyFacts: [
      'n equations for n unknowns → unique solution (if independent)',
      'Independent = not scalar multiples of each other',
      'GMAT often asks about sum/difference of variables — don\'t always need individual values',
      'Elimination: multiply equation to cancel one variable',
    ],
    example: {
      problem: 'What is x + y if 3x + 3y = 15?',
      steps: [
        '3x + 3y = 15',
        'Divide by 3: x + y = 5',
        'No need to find x and y separately!',
      ],
      answer: 'x + y = 5',
    },
    traps: [
      'DS trap: 2x + 4y = 10 and x + 2y = 5 are the SAME equation → NOT sufficient for individual values',
      'You don\'t always need each variable; the question might ask for their sum or product',
    ],
    solveSteps: [
      '1. Count independent equations vs unknowns',
      '2. Check if question asks for combination of variables (not individual values)',
      '3. Use elimination or substitution',
    ],
  },

  // ─── GEOMETRY ────────────────────────────────────────────────

  'Geometry': {
    title: 'Geometry',
    icon: '△',
    summary: 'GMAT geometry covers triangles, circles, quadrilaterals, coordinate geometry, and 3D shapes. Focus on formulas and properties, not complex proofs.',
    keyFacts: [
      'Triangle: area = ½ × base × height; angles sum to 180°',
      'Pythagorean theorem: a² + b² = c²',
      'Common triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25',
      'Circle: area = πr², circumference = 2πr',
      'Rectangle: area = l×w, diagonal = √(l²+w²)',
      'Exterior angle of triangle = sum of two non-adjacent interior angles',
    ],
    example: {
      problem: 'A right triangle has legs 6 and 8. Find the hypotenuse and area.',
      steps: [
        'Hypotenuse: √(6²+8²) = √100 = 10 (6-8-10 is 2×(3-4-5))',
        'Area = ½ × 6 × 8 = 24',
      ],
      answer: 'Hypotenuse = 10, Area = 24',
    },
    traps: [
      'Diagrams are NOT drawn to scale on GMAT — don\'t assume lengths or angles from appearance',
      'A "rectangle" isn\'t automatically a square — verify if needed',
    ],
    solveSteps: [
      '1. Label all known values on the figure',
      '2. Identify which formula applies',
      '3. Look for special triangles (3-4-5, 30-60-90, 45-45-90) to avoid square roots',
    ],
  },

  'Triangles': {
    title: 'Triangles',
    icon: '△',
    summary: 'Triangle properties are among the most-tested geometry topics. Master the special triangles and their ratios.',
    keyFacts: [
      'Angles sum to 180°',
      'Area = ½ × base × height',
      'Pythagorean theorem: a² + b² = c² (right triangles)',
      '30-60-90 sides: x : x√3 : 2x',
      '45-45-90 sides: x : x : x√2',
      'Pythagorean triples: 3-4-5, 5-12-13, 8-15-17',
      'Triangle inequality: any side < sum of other two sides',
      'Equilateral triangle height = (√3/2)s; area = (√3/4)s²',
    ],
    example: {
      problem: 'A 30-60-90 triangle has shortest side 5. Find hypotenuse.',
      steps: [
        'Shortest side (opposite 30°) = x = 5',
        'Hypotenuse = 2x = 10',
        'Middle side (opposite 60°) = 5√3',
      ],
      answer: 'Hypotenuse = 10',
    },
    traps: [
      'Height must be PERPENDICULAR to base — not always a side of the triangle',
      'Isosceles triangle: two equal sides → two equal BASE angles (not top angle)',
    ],
    solveSteps: [
      '1. Check if it\'s a special triangle (30-60-90, 45-45-90, Pythagorean triple)',
      '2. Apply correct formula for area',
      '3. For right triangles, use Pythagorean theorem',
    ],
  },

  'Circles': {
    title: 'Circles',
    icon: '○',
    summary: 'Circle problems test area, circumference, arc length, sector area, and inscribed angles. All relate back to the central angle.',
    keyFacts: [
      'Area = πr²',
      'Circumference = 2πr = πd',
      'Arc length = (θ/360) × 2πr',
      'Sector area = (θ/360) × πr²',
      'Inscribed angle = ½ × central angle (same arc)',
      'A diameter creates a 180° arc → inscribed angle = 90°',
      'Tangent to circle is perpendicular to radius at point of tangency',
    ],
    example: {
      problem: 'Circle with radius 6. Find area of a 120° sector.',
      steps: [
        'Sector area = (120/360) × π(6²)',
        '= (1/3) × 36π',
        '= 12π',
      ],
      answer: '12π',
    },
    traps: [
      'Inscribed angle theorem: angle at circumference is HALF of central angle',
      'When a triangle is inscribed in a semicircle, the angle at circumference is 90°',
    ],
    solveSteps: [
      '1. Identify radius (or find it)',
      '2. For arc/sector: find the central angle',
      '3. Apply ratio (θ/360) to full circle',
    ],
  },

  'Coordinate': {
    title: 'Coordinate Geometry',
    icon: 'xy',
    summary: 'Coordinate geometry tests slope, distance, midpoint, and the equations of lines and circles.',
    keyFacts: [
      'Slope = (y₂−y₁)/(x₂−x₁) = rise/run',
      'y = mx + b: m = slope, b = y-intercept',
      'Parallel lines: same slope (m₁ = m₂)',
      'Perpendicular lines: slopes multiply to −1 (m₁ × m₂ = −1)',
      'Distance = √[(x₂−x₁)² + (y₂−y₁)²]',
      'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)',
    ],
    example: {
      problem: 'Line through (1,2) and (4,8). Find slope and y-intercept.',
      steps: [
        'Slope = (8−2)/(4−1) = 6/3 = 2',
        'y = 2x + b; plug in (1,2): 2 = 2(1) + b → b = 0',
        'Line: y = 2x',
      ],
      answer: 'y = 2x',
    },
    traps: [
      'Slope of vertical line is UNDEFINED (denominator = 0)',
      'Slope of horizontal line is 0 (numerator = 0)',
    ],
    solveSteps: [
      '1. Calculate slope from two points',
      '2. Use point-slope form to find equation',
      '3. Convert to y = mx + b for intercept form',
    ],
  },

  'Polygons': {
    title: 'Polygons & Quadrilaterals',
    icon: '□',
    summary: 'Polygons range from simple squares to complex hexagons. GMAT focuses on the common quadrilaterals and their special properties.',
    keyFacts: [
      'Sum of interior angles of n-gon = (n−2) × 180°',
      'Rectangle: all 90° angles; opposite sides equal',
      'Rhombus: all sides equal; diagonals bisect at 90°',
      'Parallelogram: opposite sides parallel and equal',
      'Trapezoid area = ½(b₁+b₂) × h',
      'Square diagonal = s√2',
    ],
    example: {
      problem: 'Find the area of a trapezoid with parallel sides 5 and 9, height 4.',
      steps: [
        'Area = ½(b₁ + b₂) × h',
        '= ½(5 + 9) × 4',
        '= ½ × 14 × 4 = 28',
      ],
      answer: '28',
    },
    traps: [
      'A square is a rectangle AND a rhombus — properties of all three apply',
      'Diagonal of a rectangle ≠ height (unless it\'s a square)',
    ],
    solveSteps: [
      '1. Identify quadrilateral type',
      '2. Draw and label all known sides/angles',
      '3. Apply specific formula for that shape',
    ],
  },

  'Volume': {
    title: 'Volume & 3D Geometry',
    icon: '□³',
    summary: 'GMAT 3D geometry covers cubes, rectangular solids, cylinders, and occasional cones/spheres.',
    keyFacts: [
      'Rectangular solid (box): V = l×w×h, SA = 2(lw+lh+wh)',
      'Cube: V = s³, SA = 6s²',
      'Cylinder: V = πr²h, SA = 2πrh + 2πr²',
      'Diagonal of box = √(l²+w²+h²)',
      'Volume scales as cube of linear dimension: double sides → 8× volume',
    ],
    example: {
      problem: 'Cylinder with r=3 and h=4. Find volume and lateral surface area.',
      steps: [
        'V = π(3²)(4) = 36π',
        'Lateral SA = 2π(3)(4) = 24π',
      ],
      answer: 'V = 36π, Lateral SA = 24π',
    },
    traps: [
      'Surface area vs volume — read carefully which is asked',
      'When a cube doubles in side length, volume increases 8×, not 2×',
    ],
    solveSteps: [
      '1. Identify shape type',
      '2. Find all dimensions (r, h, l, w, s)',
      '3. Apply correct formula',
    ],
  },

  // ─── WORD PROBLEMS ────────────────────────────────────────────

  'Word Problems': {
    title: 'Word Problems',
    icon: 'W',
    summary: 'Word problems require translating English into equations. The key skill is identifying the unknown and writing the correct equation before solving.',
    keyFacts: [
      '"Is" → = (equals)',
      '"More than" → + (add)',
      '"Times as many" → × (multiply)',
      '"What fraction/percent of" → division',
      'Define variables clearly; use one variable when possible',
    ],
    example: {
      problem: 'A is 3 more than twice B. Their sum is 27. Find A and B.',
      steps: [
        'A = 2B + 3',
        'A + B = 27',
        'Substitute: (2B+3) + B = 27',
        '3B = 24 → B = 8, A = 19',
      ],
      answer: 'A = 19, B = 8',
    },
    traps: [
      '"Three times as many as" → 3x (not 3+x)',
      'Read the question: it might ask for the DIFFERENCE, not individual values',
    ],
    solveSteps: [
      '1. Define variable(s) — use as few as possible',
      '2. Translate each sentence into an equation',
      '3. Solve the system',
      '4. Verify answer makes sense in the original problem',
    ],
  },

  'Rate': {
    title: 'Rate, Time & Distance',
    icon: 'D=RT',
    summary: 'Distance = Rate × Time. All rate problems are variations of this formula. Meeting/chasing problems and average speed have standard templates.',
    keyFacts: [
      'D = R × T, so R = D/T and T = D/R',
      'Average speed = Total Distance / Total Time (NOT average of speeds)',
      'Round trip average speed: 2r₁r₂/(r₁+r₂) (harmonic mean)',
      'For objects moving toward each other: combined rate = r₁ + r₂',
      'For objects moving apart: distance = (r₁ + r₂) × t',
      'For chase: closing rate = (faster − slower)',
    ],
    example: {
      problem: 'Train travels 60 mph for 2 hrs, then 40 mph for 3 hrs. Average speed?',
      steps: [
        'Total distance = 60×2 + 40×3 = 120 + 120 = 240 miles',
        'Total time = 2 + 3 = 5 hours',
        'Average speed = 240/5 = 48 mph',
      ],
      answer: '48 mph',
    },
    traps: [
      'Average speed ≠ (60+40)/2 = 50 mph — always use total D / total T',
      'Make sure units are consistent (miles vs km, hours vs minutes)',
    ],
    solveSteps: [
      '1. Set up D = R × T table with rows for each segment',
      '2. Find total distance and total time',
      '3. Divide for average speed',
    ],
  },

  'Work': {
    title: 'Work Problems',
    icon: '⚙',
    summary: 'Work = Rate × Time. When workers combine, add their rates. Individual rates are fractions of the job per unit time.',
    keyFacts: [
      'If A does a job in a hours: A\'s rate = 1/a job/hour',
      'Combined rate = 1/a + 1/b',
      'Time together = 1 / (1/a + 1/b) = ab/(a+b)',
      'Work done = Rate × Time',
      'For pipes filling/draining: drain rate is subtracted',
    ],
    example: {
      problem: 'A takes 6 hours, B takes 4 hours. Working together, how long?',
      steps: [
        'Rate A = 1/6, Rate B = 1/4',
        'Combined = 1/6 + 1/4 = 2/12 + 3/12 = 5/12',
        'Time = 12/5 = 2.4 hours',
      ],
      answer: '2.4 hours (2 hr 24 min)',
    },
    traps: [
      'Together is always FASTER than either alone — sanity check',
      'If one pipe fills and another drains, subtract the drain rate',
    ],
    solveSteps: [
      '1. Find each rate (1/time)',
      '2. Add rates for combined work',
      '3. Time = total work / combined rate',
    ],
  },

  'Mixtures': {
    title: 'Mixtures & Weighted Averages',
    icon: '⊕',
    summary: 'Mixture problems involve combining two things with different concentrations or prices. The mixture\'s property is a weighted average.',
    keyFacts: [
      'Concentration formula: C₁V₁ + C₂V₂ = C_mix × V_total',
      'Alligation shortcut: ratio of amounts = (mix − conc₂) : (conc₁ − mix)',
      'Weighted average = (sum of weight × value) / total weight',
    ],
    example: {
      problem: 'Mix 20L of 40% solution with 30L of 70% solution. Find concentration.',
      steps: [
        'Total solute = 0.40×20 + 0.70×30 = 8 + 21 = 29 liters',
        'Total volume = 50 liters',
        'Concentration = 29/50 = 58%',
      ],
      answer: '58%',
    },
    traps: [
      'Answer must be BETWEEN the two original concentrations — sanity check',
      'The proportion matters: more of a higher-concentration solution → result closer to it',
    ],
    solveSteps: [
      '1. Identify two substances and their concentrations/values',
      '2. Identify volumes/quantities',
      '3. Apply: total value = sum of individual values',
      '4. Divide by total quantity for the mix property',
    ],
  },

  // ─── STATISTICS ──────────────────────────────────────────────

  'Statistics': {
    title: 'Statistics',
    icon: 'σ',
    summary: 'GMAT statistics covers mean, median, mode, range, and standard deviation. Key skill: understanding what each measure represents and when it changes.',
    keyFacts: [
      'Mean = sum of values / count',
      'Median = middle value (or average of two middle values if even count)',
      'Mode = most frequent value',
      'Range = max − min',
      'SD measures spread around the mean',
      'Adding/subtracting constant: mean shifts, SD unchanged',
      'Multiplying by constant k: mean × k, SD × k',
    ],
    example: {
      problem: 'Set {2, 4, 6, 8, 10}. Find mean, median, range.',
      steps: [
        'Mean = (2+4+6+8+10)/5 = 30/5 = 6',
        'Median = middle value = 6',
        'Range = 10 − 2 = 8',
      ],
      answer: 'Mean = 6, Median = 6, Range = 8',
    },
    traps: [
      'Adding one value to a set CAN change the median — reorder and find new middle',
      'A set can have no mode or multiple modes',
      'Mean is affected by outliers; median is not',
    ],
    solveSteps: [
      '1. Sort the set first',
      '2. Count elements to find median position',
      '3. Calculate mean = sum/n',
      '4. For SD changes: note whether you\'re shifting or scaling',
    ],
  },

  'Mean': {
    title: 'Mean (Average)',
    icon: 'x̄',
    summary: 'Mean = sum / count. The GMAT often gives you the mean and asks you to find the sum, or vice versa. Average speed is a special case.',
    keyFacts: [
      'Sum = Mean × Count — this is the key rearrangement',
      'If you add/remove a value, new sum = old sum ± that value',
      'Weighted mean: (n₁ × m₁ + n₂ × m₂) / (n₁ + n₂)',
      'Average of evenly spaced set = (first + last) / 2',
    ],
    example: {
      problem: '5 scores average 80. A 6th score raises average to 82. What is the 6th score?',
      steps: [
        'Old sum = 5 × 80 = 400',
        'New sum = 6 × 82 = 492',
        '6th score = 492 − 400 = 92',
      ],
      answer: '92',
    },
    traps: [
      '"Average increased by 2" with 6 scores → total increased by 12, not 2',
    ],
    solveSteps: [
      '1. Convert mean → sum using Sum = Mean × Count',
      '2. Work with sums when adding/removing items',
      '3. Convert back: new mean = new sum / new count',
    ],
  },

  'Median': {
    title: 'Median',
    icon: 'M',
    summary: 'Median is the middle value in a sorted set. Unlike mean, it\'s resistant to outliers.',
    keyFacts: [
      'Sort the set first',
      'Odd count: median = middle element, position (n+1)/2',
      'Even count: median = average of two middle elements',
      'Adding values can shift median — re-sort to check',
      'Median is not affected by changing extreme values (unless they cross the middle)',
    ],
    example: {
      problem: 'Set {3, 7, 1, 9, 5}. Find median.',
      steps: [
        'Sort: {1, 3, 5, 7, 9}',
        '5 elements → middle is 3rd = 5',
      ],
      answer: '5',
    },
    traps: [
      'Never find median without sorting first',
      'For even-sized sets, median might not be in the set',
    ],
    solveSteps: ['1. Sort ascending', '2. Count elements', '3. Find middle position', '4. Average if even count'],
  },

  'Standard Deviation': {
    title: 'Standard Deviation',
    icon: 'σ',
    summary: 'Standard deviation measures how spread out data is from the mean. GMAT rarely asks you to calculate it — instead tests conceptual understanding.',
    keyFacts: [
      'High SD = data spread out; Low SD = data clustered near mean',
      'All values the same → SD = 0',
      'Adding/subtracting constant → SD unchanged (just shifts)',
      'Multiplying all values by k → SD multiplied by |k|',
      'Adding a value equal to the mean → SD decreases',
      'Sets {0,0,0,0} and {5,5,5,5} have SD = 0 but different means',
    ],
    example: {
      problem: 'Set A = {2,4,6}. Set B = each element +3. Compare SDs.',
      steps: [
        'Set B = {5,7,9}',
        'Both have same spread around their respective means',
        'SD(A) = SD(B)',
      ],
      answer: 'Same standard deviation',
    },
    traps: [
      '"All values increase by 3" → mean increases by 3, SD stays same',
      '"All values double" → mean doubles, SD doubles',
    ],
    solveSteps: [
      '1. Compare spread: are values closer or farther from mean?',
      '2. Check if operation shifts or scales',
      '3. For DS: determine if you can find mean AND spread',
    ],
  },

  'Weighted Mean': {
    title: 'Weighted Mean',
    icon: 'w̄',
    summary: 'Weighted mean accounts for different group sizes. The result is pulled toward the larger group.',
    keyFacts: [
      'Weighted mean = (n₁m₁ + n₂m₂ + …) / (n₁ + n₂ + …)',
      'Shortcut: result is between m₁ and m₂, closer to larger group\'s mean',
    ],
    example: {
      problem: 'Class A (20 students, avg 85) and Class B (30 students, avg 75). Combined avg?',
      steps: [
        'Total = 20×85 + 30×75 = 1700 + 2250 = 3950',
        'Count = 50',
        'Avg = 3950/50 = 79',
      ],
      answer: '79',
    },
    traps: [
      'Unweighted average (85+75)/2 = 80 ≠ 79 because groups have different sizes',
    ],
    solveSteps: ['1. Multiply each group\'s mean by its count', '2. Sum products', '3. Divide by total count'],
  },

  // ─── PROBABILITY & COMBINATORICS ─────────────────────────────

  'Probability': {
    title: 'Probability',
    icon: 'P',
    summary: 'P(event) = favorable outcomes / total outcomes. Master AND/OR rules and complement strategy.',
    keyFacts: [
      'P(A and B) = P(A) × P(B) for independent events',
      'P(A or B) = P(A) + P(B) − P(A and B)',
      'Complement: P(at least one) = 1 − P(none)',
      'P(all values 0 to 1)',
      'P(A | B) = P(A and B) / P(B) for conditional probability',
      'Mutually exclusive: P(A and B) = 0',
    ],
    example: {
      problem: 'Flip 3 fair coins. P(at least one heads)?',
      steps: [
        'Complement: P(no heads) = (1/2)³ = 1/8',
        'P(at least one heads) = 1 − 1/8 = 7/8',
      ],
      answer: '7/8',
    },
    traps: [
      '"At least one" → always use complement rule (1 minus none)',
      'Dependent events: second draw without replacement changes probabilities',
    ],
    solveSteps: [
      '1. Identify total and favorable outcomes',
      '2. For "at least one": use complement',
      '3. For AND: multiply probabilities (check independence)',
      '4. For OR: add and subtract overlap',
    ],
  },

  'Combinations': {
    title: 'Combinations',
    icon: 'C',
    summary: 'Combinations count selections where order doesn\'t matter. C(n,r) = n! / (r!(n−r)!)',
    keyFacts: [
      'C(n,r) = n! / (r!(n-r)!) — "n choose r"',
      'C(n,0) = C(n,n) = 1',
      'C(n,1) = C(n,n−1) = n',
      'Combinations: order doesn\'t matter (committee, selection)',
      'Permutations: order matters (arrangement, ranking)',
      'P(n,r) = n! / (n−r)! = C(n,r) × r!',
    ],
    example: {
      problem: 'How many ways to choose 3 from 7 people for a committee?',
      steps: [
        'C(7,3) = 7! / (3! × 4!)',
        '= (7 × 6 × 5) / (3 × 2 × 1)',
        '= 210 / 6 = 35',
      ],
      answer: '35 ways',
    },
    traps: [
      'Committee = combinations (no order); president/VP/secretary = permutations (order matters)',
      'Restrictions: first apply restriction, then count remaining choices',
    ],
    solveSteps: [
      '1. Determine if order matters (perm) or not (comb)',
      '2. Apply C(n,r) or P(n,r)',
      '3. For restrictions, fix constrained selections first, then count rest',
    ],
  },

  'Combinatorics': {
    title: 'Combinatorics',
    icon: 'n!',
    summary: 'Combinatorics = counting techniques. Fundamental principle, permutations, and combinations — all needed for GMAT.',
    keyFacts: [
      'Fundamental counting: k₁ × k₂ × … × kₙ total arrangements',
      'n! = n × (n−1) × … × 1 (permutations of n items)',
      'n items in a circle: (n−1)! arrangements',
      'Identical items: divide by k! for each group of k identical items',
    ],
    example: {
      problem: 'How many 3-digit numbers using 1-5 with no repeat?',
      steps: [
        '5 choices for hundreds, 4 for tens, 3 for units',
        '= 5 × 4 × 3 = 60',
      ],
      answer: '60',
    },
    traps: [
      '"At least one" restriction → complement counting',
      'Circular arrangements: fix one element, arrange the rest',
    ],
    solveSteps: [
      '1. Is order important? → permutation; not important? → combination',
      '2. Apply fundamental counting principle',
      '3. Divide out identical items if present',
    ],
  },

  'Permutations': {
    title: 'Permutations',
    icon: 'P',
    summary: 'Permutations count arrangements where order matters. P(n,r) = n!/(n−r)!',
    keyFacts: [
      'P(n,r) = n!/(n−r)! — ordered selection of r from n',
      'All n items: P(n,n) = n!',
      'Circular permutation: (n−1)!',
    ],
    example: {
      problem: 'How many ways can 5 runners finish 1st, 2nd, 3rd?',
      steps: [
        'P(5,3) = 5!/(5−3)! = 5!/2!',
        '= 5×4×3 = 60',
      ],
      answer: '60',
    },
    traps: ['Seating in a ROW = linear permutation; ROUND TABLE = circular → divide by n'],
    solveSteps: ['1. Confirm order matters', '2. Apply P(n,r) = n×(n-1)×…×(n-r+1)', '3. For circles: fix one seat, arrange remaining (n-1)!'],
  },

  // ─── SEQUENCES & SERIES ─────────────────────────────────────

  'Sequences': {
    title: 'Sequences',
    icon: 'aₙ',
    summary: 'GMAT sequences are usually arithmetic (constant difference) or geometric (constant ratio). Know the formulas for nth term and sum.',
    keyFacts: [
      'Arithmetic: aₙ = a₁ + (n−1)d',
      'Arithmetic sum: Sₙ = n(a₁ + aₙ)/2 = n × average',
      'Geometric: aₙ = a₁ × rⁿ⁻¹',
      'Geometric sum: Sₙ = a₁(rⁿ−1)/(r−1)',
      'Sum of consecutive integers 1 to n = n(n+1)/2',
    ],
    example: {
      problem: 'Arithmetic sequence: first term 3, common difference 4. Find 10th term.',
      steps: [
        'a₁₀ = 3 + (10−1)(4)',
        '= 3 + 36 = 39',
      ],
      answer: '39',
    },
    traps: [
      '"How many terms from 3 to 39 with d=4?" → (39−3)/4 + 1 = 10, not 9',
      'Sum formula requires knowing it\'s arithmetic/geometric — verify the pattern first',
    ],
    solveSteps: [
      '1. Identify sequence type (arithmetic or geometric)',
      '2. Find a₁ and d (or r)',
      '3. Apply nth term formula',
      '4. Use sum formula if needed',
    ],
  },

  // ─── SETS ────────────────────────────────────────────────────

  'Sets': {
    title: 'Sets & Venn Diagrams',
    icon: '∪',
    summary: 'Set problems involve overlapping groups. The inclusion-exclusion formula prevents double-counting.',
    keyFacts: [
      '|A ∪ B| = |A| + |B| − |A ∩ B|',
      'For three sets: |A∪B∪C| = |A|+|B|+|C|−|A∩B|−|A∩C|−|B∩C|+|A∩B∩C|',
      'Only A (not B, not C) = |A| − |A∩B| − |A∩C| + |A∩B∩C|',
      'Neither = total − |A ∪ B|',
    ],
    example: {
      problem: '100 students: 60 take Math, 40 take Science, 20 take both. How many take neither?',
      steps: [
        '|M ∪ S| = 60 + 40 − 20 = 80',
        'Neither = 100 − 80 = 20',
      ],
      answer: '20 students',
    },
    traps: [
      '"Both" is the overlap — already counted in each group, must subtract once',
      '"At least one" = union (not intersection)',
    ],
    solveSteps: [
      '1. Draw Venn diagram',
      '2. Fill in from inside out (start with overlap)',
      '3. Apply inclusion-exclusion formula',
      '4. Verify total adds up',
    ],
  },

  // ─── INTEREST ────────────────────────────────────────────────

  'Simple Interest': {
    title: 'Simple Interest',
    icon: '$',
    summary: 'Simple interest: I = P × r × t. Interest calculated on original principal only.',
    keyFacts: [
      'I = Prt (principal × rate × time)',
      'Total = P + I = P(1 + rt)',
      'Rate and time must be in consistent units',
    ],
    example: {
      problem: '$2000 at 5% simple interest for 3 years. Final amount?',
      steps: [
        'I = 2000 × 0.05 × 3 = $300',
        'Total = 2000 + 300 = $2300',
      ],
      answer: '$2300',
    },
    traps: ['Simple interest does NOT compound — interest on interest never occurs'],
    solveSteps: ['1. Identify P, r, t', '2. Convert r to decimal and t to correct unit', '3. Apply I = Prt'],
  },

  'Compound Interest': {
    title: 'Compound Interest',
    icon: '$+',
    summary: 'Compound interest earns interest on interest. Growth is exponential.',
    keyFacts: [
      'A = P(1 + r/n)^(nt)',
      'Annual compounding: A = P(1+r)ᵗ',
      'More frequent compounding → higher final amount',
      'For small r: (1+r)ⁿ ≈ 1 + nr (approximation)',
    ],
    example: {
      problem: '$1000 at 10% compounded annually for 2 years.',
      steps: [
        'Year 1: 1000 × 1.10 = $1100',
        'Year 2: 1100 × 1.10 = $1210',
      ],
      answer: '$1210',
    },
    traps: ['Compound > simple interest for same rate/time', '"Compounded semi-annually" → r/2 per period, 2t periods'],
    solveSteps: ['1. Find r per period and number of periods', '2. Apply A = P(1+r)ⁿ', '3. Approximate if exact computation is difficult'],
  },

  // ─── RATIOS ──────────────────────────────────────────────────

  'Ratios': {
    title: 'Ratios',
    icon: ':',
    summary: 'Ratios express relative sizes. Scale up/down using a multiplier. Part-to-part vs part-to-whole — always clarify.',
    keyFacts: [
      'a:b means a/(a+b) and b/(a+b) of total',
      'If a:b = 2:3, then a = 2k and b = 3k for some k',
      'Ratio chains: a:b = 2:3 and b:c = 3:5 → a:b:c = 2:3:5',
      'Scale factor: actual value = ratio part × (total / sum of ratio)',
    ],
    example: {
      problem: 'Ratio boys:girls = 3:5. Total 40 students. How many boys?',
      steps: [
        '3 parts boys + 5 parts girls = 8 parts total',
        'Each part = 40/8 = 5 students',
        'Boys = 3 × 5 = 15',
      ],
      answer: '15 boys',
    },
    traps: [
      '"Ratio 3:5" doesn\'t tell you actual numbers — need total or one value',
      'After combining ratios: make sure common term is aligned',
    ],
    solveSteps: [
      '1. Write ratio as a:b = n × (a:b)',
      '2. Find multiplier n using given total or one value',
      '3. Scale all parts',
    ],
  },

  // ─── AGE / PROFIT / MISC WORD ─────────────────────────────────

  'Age': {
    title: 'Age Problems',
    icon: '🎂',
    summary: 'Age problems involve setting up equations for past, present, and future ages. Define one variable and express others in terms of it.',
    keyFacts: [
      'Past: subtract from current age',
      'Future: add to current age',
      'Ratio of ages changes over time — can\'t apply current ratio to past/future directly',
    ],
    example: {
      problem: 'Alice is 3× Bob\'s age. In 5 years, she\'ll be 2× his age. Current ages?',
      steps: [
        'A = 3B',
        'A + 5 = 2(B + 5)',
        '3B + 5 = 2B + 10 → B = 5, A = 15',
      ],
      answer: 'Alice 15, Bob 5',
    },
    traps: ['Don\'t use current ratio for future — ages increase by same absolute amount, not same ratio'],
    solveSteps: ['1. Define current age as variable', '2. Express all ages in terms of that variable', '3. Use the time-based condition to solve'],
  },

  'Profit': {
    title: 'Profit & Cost',
    icon: '$',
    summary: 'Profit = Revenue − Cost. Markup and discount are percent operations on cost price vs selling price.',
    keyFacts: [
      'Profit = Selling Price − Cost Price',
      'Profit % = (Profit / Cost) × 100',
      'Markup: SP = CP × (1 + markup%)',
      'Discount: SP = Marked Price × (1 − discount%)',
      'Break-even: Revenue = Total Cost = Fixed + Variable',
    ],
    example: {
      problem: 'Cost $80, sold for $100. Profit %?',
      steps: [
        'Profit = 100 − 80 = $20',
        'Profit % = (20/80) × 100 = 25%',
      ],
      answer: '25%',
    },
    traps: [
      'Profit % is based on COST, not selling price (unless specified otherwise)',
      '"Discount" is on the marked/original price, not cost price',
    ],
    solveSteps: [
      '1. Identify cost price (CP) and selling price (SP)',
      '2. Profit = SP − CP',
      '3. Profit % = Profit/CP × 100',
    ],
  },

  // Default fallback
  'default': {
    title: 'GMAT Quant',
    icon: '∑',
    summary: 'GMAT Quantitative section tests arithmetic, algebra, geometry, and word problems — all at the level of high school math applied in novel ways.',
    keyFacts: [
      'PS: 5 answer choices, exactly one correct',
      'DS: determine if statements are sufficient to answer the question',
      'Target time: ~2 minutes per question',
      'No calculator — mental math and estimation are key',
    ],
    example: { problem: 'See the question for context.', steps: ['Read carefully', 'Identify what\'s being asked', 'Pick the fastest path to the answer'], answer: 'Use the explanation above' },
    traps: ['Answer choices can guide you — work backwards if stuck', 'DS: always check both statements independently first'],
    solveSteps: [
      '1. Understand exactly what\'s being asked',
      '2. Identify relevant formulas/techniques',
      '3. Execute efficiently — pick the fastest method',
      '4. Sanity check the answer',
    ],
  },
};

// Lookup function — tries exact match, then subtopic match, then default
function getTheory(topic, subtopic) {
  if (GMAT_THEORIES[topic]) return GMAT_THEORIES[topic];
  if (subtopic && GMAT_THEORIES[subtopic]) return GMAT_THEORIES[subtopic];
  return GMAT_THEORIES['default'];
}
