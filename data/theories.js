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

  // ─── VERBAL — CRITICAL REASONING ─────────────────────────────

  'Critical Reasoning': {
    title: 'Critical Reasoning',
    icon: '🧠',
    summary: 'CR tests your ability to analyze short arguments. You must identify premises, conclusion, and assumptions, then strengthen, weaken, evaluate, infer, or fix the logic. The key is reading every word literally — no outside knowledge.',
    keyFacts: [
      'Premise = stated fact; Conclusion = the claim drawn from premises',
      'Assumption = unstated link the conclusion needs to be true',
      '7 question types — each has its OWN trigger words in the stem:',
      '• Strengthen — "most strongly supports", "best supports", "most justifies"',
      '• Weaken — "most weakens", "casts doubt on", "calls into question"',
      '• Assumption — "assumes which", "depends on", "required by the argument"',
      '• Inference — "must be true", "can be properly inferred", "follows logically"',
      '• Flaw — "vulnerable to criticism", "logical error", "reasoning flaw"',
      '• Evaluate — "most useful to determine", "answer to which question"',
      '• Bold-Face — "the two boldface portions play what roles" (look for evidence vs. conclusion)',
      'Conclusion-locator words: "therefore", "thus", "so", "hence", "clearly"',
      'Premise-locator words: "because", "since", "given that", "as"',
    ],
    example: {
      problem: 'A new diet pill caused weight loss in 80% of trial participants. Therefore, the pill works. Which weakens?',
      steps: [
        'Identify conclusion: "the pill works"',
        'Identify gap: did pill itself cause loss, or were participants also dieting?',
        'Best weakener: "Trial participants also followed a strict diet" — undermines causal claim',
      ],
      answer: 'Alternative cause weakens',
    },
    traps: [
      'Out of Scope — sounds smart but addresses something other than the conclusion',
      'Opposite Direction — strengthens when stem asks weaken (or vice-versa)',
      'Too Strong / Too Weak — extreme words ("all", "never", "must") rarely correct; mild qualifiers ("some", "may") rarely strong enough',
      'Real-World Knowledge — only use what the passage states; everyday facts are bait',
      'Restating a Premise — does not add new support; common wrong-answer pattern',
      'Half-right / half-wrong — first clause matches, second clause distorts; eliminate',
    ],
    solveSteps: [
      '1. Read the question STEM first — know which of the 7 types you are facing',
      '2. Read the argument; identify conclusion in your own words',
      '3. Identify premises that support it; spot the gap (assumption)',
      '4. Predict the answer shape before reading choices (e.g., "I need an alternative cause")',
      '5. Eliminate by trap — out-of-scope, reversed direction, extreme — then pick the strongest survivor',
    ],
  },

  'Strengthen': {
    title: 'Strengthen the Argument',
    icon: '➕',
    summary: 'A Strengthen choice provides new information that makes the conclusion more likely true. You are not asked to prove the conclusion — just push it further toward "true".',
    keyFacts: [
      'Strengthen = adds support to the conclusion',
      'Often closes a logical gap or rules out an alternative cause',
      'Can be a new premise, statistic, or controlled comparison',
      'GMAT keywords: "most strengthens", "most supports", "best supports"',
    ],
    example: {
      problem: 'City X built a bike lane and bike commuting rose 40%. Conclusion: bike lanes increase commuting. Strengthener?',
      steps: [
        'Gap: maybe other factors (gas prices, weather) caused the rise',
        'Strong: "Cities Y and Z added bike lanes and saw similar increases" — replication supports causal claim',
      ],
      answer: 'Replicated result',
    },
    traps: [
      '"Could strengthen" vs "most strengthens" — pick the strongest',
      'Restating premise — does not add new support',
      'Strengthening an unstated sub-point — must hit the main conclusion',
    ],
    solveSteps: [
      '1. Pin down the conclusion exactly',
      '2. Find the gap or alternative cause',
      '3. Look for an answer that closes the gap or rules out the alternative',
    ],
  },

  'Weaken': {
    title: 'Weaken the Argument',
    icon: '➖',
    summary: 'A Weakener provides new information that makes the conclusion less likely. The most common weakeners introduce an alternative explanation or counterexample.',
    keyFacts: [
      'Weaken = reduces support for the conclusion (does not need to disprove)',
      'Most powerful weakener: alternative cause for the observed effect',
      'Counterexample to an absolute claim is also a strong weakener',
      'GMAT keywords: "most weakens", "casts doubt on", "calls into question"',
    ],
    example: {
      problem: 'Coffee drinkers have lower Parkinson rates, so coffee prevents Parkinson. Weakener?',
      steps: [
        'Conclusion: coffee → lower Parkinson (causal)',
        'Best weakener: people genetically resistant to Parkinson also tend to enjoy coffee — alternative cause/correlation, not causation',
      ],
      answer: 'Alternative cause',
    },
    traps: [
      'Choices that restate the argument',
      'Choices that weaken a premise but not the conclusion',
      '"Some" or "a few" qualifiers are usually too weak to weaken on GMAT',
    ],
    solveSteps: [
      '1. Identify the conclusion and the causal/logical jump',
      '2. Brainstorm alternative explanations',
      '3. Match an answer that introduces one of those alternatives',
    ],
  },

  'Assumption': {
    title: 'Find the Assumption',
    icon: '🔗',
    summary: 'An assumption is an unstated premise the conclusion requires. Use the Negation Test: if you negate the choice and the argument falls apart, that choice is the assumption.',
    keyFacts: [
      'Assumption is necessary, not sufficient',
      'Negation Test: negate the choice; if the conclusion no longer follows, that is your assumption',
      'Assumption answers are usually modest in scope',
      'GMAT keywords: "the argument assumes", "depends on which", "required by the argument"',
    ],
    example: {
      problem: 'Sales rose after we changed the logo. So the new logo caused the increase. Assumption?',
      steps: [
        'Required: nothing else changed at the same time',
        'Choice: "no other major marketing change occurred concurrently"',
        'Negate: "another major change occurred" — destroys causal claim. Confirms assumption.',
      ],
      answer: 'No other change occurred',
    },
    traps: [
      'Strengtheners — they support but are not required',
      'Extreme assumption choices ("always", "never") — usually too strong',
      'Choices that are facts in the passage — those are premises, not assumptions',
    ],
    solveSteps: [
      '1. Identify conclusion and explicit premises',
      '2. Ask "what unstated link is needed?"',
      '3. Apply Negation Test on top 2 choices',
    ],
  },

  // ─── VERBAL — SENTENCE CORRECTION ─────────────────────────────

  'Sentence Correction': {
    title: 'Sentence Correction',
    icon: '✏️',
    summary: 'SC tests grammar, usage, and meaning. The underlined portion may be wrong; choose the most concise, grammatical, and meaning-preserving option. Choice A is always identical to the original.',
    keyFacts: [
      'Choice A = NO CHANGE (always identical to the underlined original)',
      '6 BIG GRAMMAR RULES the GMAT tests over and over:',
      '• 1. Subject-Verb Agreement — singular subject takes singular verb. Hide-the-subject trick: "The list of items IS on the desk" (not are).',
      '• 2. Parallelism — items in a list/comparison share grammatical form. "She likes hiking, swimming, AND BIKING" (not "and to bike").',
      '• 3. Modifiers — placed next to what they describe. "Walking down the street, I saw the trees" (not "the trees were tall").',
      '• 4. Pronouns — must agree in number and have a clear antecedent. "Each student turned in HIS or HER paper" (not "their").',
      '• 5. Verb Tense — sequence of tenses must reflect timeline. "By the time he arrives, she WILL HAVE LEFT".',
      '• 6. Comparisons & Idioms — compare like to like; learn idioms ("not only … but also", "different from", "between X and Y").',
      'Concision matters — between two grammatical options, the shorter and clearer wins',
      'Meaning must be preserved — never pick a choice that subtly changes meaning',
      'Eliminate splits: if 3 choices share an error, kill all 3 at once',
    ],
    example: {
      problem: 'The committee, along with the board members, [are/is] going to vote.',
      steps: [
        'Subject = "the committee" (singular). "along with the board members" is a prepositional interrupter, not a compound subject',
        'Singular subject takes singular verb: "is"',
      ],
      answer: 'is going to vote',
    },
    traps: [
      'Redundancy — "rose by an additional increase of 10%" (rose AND additional are duplicates)',
      'Faulty Comparison — "Singapore\'s climate is hotter than Tokyo" (compare climate to climate, not to a city)',
      'Interrupters that hide the subject (along with, as well as, including)',
      'Modifier placed too far from what it modifies',
      '"Like" vs "such as" — "like" compares, "such as" introduces examples',
      'Wordy passive constructions when a concise active version exists',
      'Subjunctive after "demand/require/insist that" — verb must be base form ("demand that he BE on time")',
      '"Being" — almost always wrong on GMAT; eliminate first',
    ],
    solveSteps: [
      '1. READ FOR EAR — read the original sentence. Does it sound clearly wrong?',
      '2. IDENTIFY THE ERROR — pin it to one of the 6 Big Rules (S-V, parallel, modifier, pronoun, tense, idiom)',
      '3. ELIMINATE OBVIOUSLY WRONG — kill any choice that repeats the same error or introduces a new one',
      '4. COMPARE REMAINING — focus on the splits between the 2-3 survivors',
      '5. PICK MOST CONCISE — among grammatical, meaning-preserving options, the shortest clearest one wins',
    ],
  },

  'Subject-Verb Agreement': {
    title: 'Subject-Verb Agreement',
    icon: '⚖',
    summary: 'A verb must agree in number with its subject — singular subject takes singular verb, plural subject takes plural verb. The trick: GMAT hides the subject behind interrupters or inverts the order.',
    keyFacts: [
      'Singular subject + singular verb (the dog runs)',
      'Plural subject + plural verb (the dogs run)',
      'Phrases like "along with", "as well as", "in addition to" do NOT change subject number',
      '"Each", "every", "neither", "either" + noun = singular',
      '"Either A or B" — verb agrees with B (the closer subject)',
      'Collective nouns (committee, jury) usually singular on GMAT',
    ],
    example: {
      problem: 'The list of items [is/are] on the desk.',
      steps: [
        'Subject = "list" (singular)',
        '"of items" is a prepositional phrase — not the subject',
        'Singular verb: "is"',
      ],
      answer: 'is',
    },
    traps: [
      'Prepositional phrases that put a plural noun next to the verb',
      'Inversions: "There are/is many people" — find the real subject after the verb',
      'Compound subjects with "and" are plural; with "or" follow the closer noun',
    ],
    solveSteps: [
      '1. Find the verb',
      '2. Strip out interrupting phrases and prepositional phrases',
      '3. Identify the true subject',
      '4. Match number',
    ],
  },

  'Parallelism': {
    title: 'Parallelism',
    icon: '∥',
    summary: 'When you list things or compare things, the items must share the same grammatical form — all gerunds, all infinitives, all noun phrases, etc.',
    keyFacts: [
      'Lists need parallel form: "running, jumping, swimming" (all -ing)',
      'Comparisons need parallel form: "X is more than Y" — X and Y must match',
      'Correlative pairs: "not only X but also Y", "either X or Y", "both X and Y" — X and Y parallel',
      'Watch for verb tense parallelism in compound predicates',
    ],
    example: {
      problem: 'She likes hiking, swimming, and to bike.',
      steps: [
        'List has hiking, swimming, to bike',
        'Mismatch: hiking/swimming are gerunds; to bike is infinitive',
        'Fix: "hiking, swimming, and biking"',
      ],
      answer: 'biking',
    },
    traps: [
      'Almost-parallel: "her singing and to dance"',
      'Comparing nouns to actions: "her job is more demanding than her sister" should be "than her sister\'s"',
      'Idiomatic correlatives — "not only … but also" must keep structure on both sides',
    ],
    solveSteps: [
      '1. Identify the list or comparison structure',
      '2. Match each item\'s grammatical form',
      '3. If comparing, ensure the things compared are like-things',
    ],
  },

  'Modifiers': {
    title: 'Modifiers',
    icon: '↪',
    summary: 'A modifier (word, phrase, or clause) must be placed next to the noun or verb it describes. Misplaced or dangling modifiers create absurd meaning.',
    keyFacts: [
      'Opening participial phrase modifies the subject right after it',
      'Wrong: "Walking down the street, the trees were tall" → trees are not walking',
      'Right: "Walking down the street, I noticed tall trees"',
      '"That" introduces essential clauses (no comma); "which" introduces non-essential clauses (comma)',
      'Adverbs/adjectives must clearly modify the right element',
    ],
    example: {
      problem: 'Having finished the report, the deadline still seemed close.',
      steps: [
        'Opening modifier "Having finished the report" needs a person as subject',
        '"the deadline" cannot finish a report — dangling modifier',
        'Fix: "Having finished the report, I felt the deadline was still close"',
      ],
      answer: 'I felt the deadline was still close',
    },
    traps: [
      'Dangling participial phrases',
      '"Which" with no clear noun antecedent',
      '"Only" placed in wrong slot — meaning shifts',
    ],
    solveSteps: [
      '1. Find the modifier (opening phrase, that-clause, etc.)',
      '2. Identify what it should describe',
      '3. Verify the closest noun/verb is the right target',
    ],
  },

  // ─── VERBAL — READING COMPREHENSION ───────────────────────────

  'Reading Comprehension': {
    title: 'Reading Comprehension',
    icon: '📖',
    summary: 'RC asks you to understand a 200-400 word passage and answer questions about main idea, details, inferences, tone, and structure. The correct answer is always supported directly by the passage.',
    keyFacts: [
      'Main Idea: the central thesis, not a detail',
      'Detail questions: scan for the keyword in the passage',
      'Inference: must be a logical extension of explicit statements',
      'Function: why did the author include this paragraph/sentence?',
      'Tone: pick a moderate tone — extreme tones rarely correct',
      'Always reread the cited line ± 2 lines before answering',
    ],
    example: {
      problem: 'Passage describes a new theory and notes one expert disagrees. Q: author\'s tone?',
      steps: [
        'Author presents theory neutrally and acknowledges criticism',
        'Tone is "balanced" or "measured", not "enthusiastic" or "skeptical"',
      ],
      answer: 'Balanced',
    },
    traps: [
      'Trap answers paraphrase the passage but distort meaning',
      'Out-of-scope answers — never mentioned in passage',
      'Extreme answers ("only", "always", "must") rarely correct',
      'Half-right, half-wrong: one clause matches, the other does not — eliminate',
    ],
    solveSteps: [
      '1. Read passage actively — note structure, purpose of each paragraph',
      '2. Read question; rephrase in your own words',
      '3. Predict the answer before looking at choices',
      '4. Eliminate choices that distort, exceed, or fall outside the passage',
    ],
  },

  // ─── DATA INSIGHTS ────────────────────────────────────────────
  'Data Sufficiency': {
    title: 'Data Sufficiency (DS)',
    icon: '⚖️',
    summary: 'DS questions present a question and two statements. Determine if the statements (alone or combined) provide sufficient data to answer the question — you never need to find the actual answer.',
    keyFacts: [
      'Answer choices are ALWAYS: A=St.1 alone, B=St.2 alone, C=Both together, D=Either alone, E=Neither',
      'Sufficient = can determine a unique answer (or definitively yes/no)',
      'Insufficient = multiple possible answers exist',
      '"Is x positive?" — Statement gives x = 2 → sufficient (yes). Statement gives x² = 4 → insufficient (x = 2 or −2)',
      'NEVER solve for the actual value — only determine if you COULD',
    ],
    example: {
      problem: 'Is x > 0?\n(1) x² = 9\n(2) x > −1',
      steps: [
        'St.(1) alone: x = 3 or x = −3 → cannot determine if x > 0 → INSUFFICIENT',
        'St.(2) alone: x > −1 means x could be 0, 0.5, 3, etc. → not always > 0 → INSUFFICIENT',
        'Both together: x > −1 AND x² = 9 → x = 3 (x = −3 violates x > −1) → x > 0 → SUFFICIENT',
        'Answer: C',
      ],
      answer: 'C — Both statements together are sufficient',
    },
    traps: [
      'Forgetting that 0 is neither positive nor negative',
      'Saying "sufficient" because you found one value — you need the ONLY value',
      'Not testing both positive and negative cases for squared terms',
      'Confusing "could be true" with "must be true" — DS needs must be true',
      'Rushing to C — always test each statement alone first',
    ],
    solveSteps: [
      '1. Rephrase the question — what exactly must be determined?',
      '2. Test Statement (1) ALONE — is the answer uniquely determined? Label S or I',
      '3. Test Statement (2) ALONE — same check. Label S or I',
      '4. Only if both are I: test both together',
      '5. Choose A/B/C/D/E based on the matrix',
    ],
  },

  'Two-Part Analysis': {
    title: 'Two-Part Analysis (TPA)',
    icon: '🔀',
    summary: 'TPA questions require selecting two answers — one for each column — that together satisfy a set of conditions. Both selections must simultaneously satisfy the stated constraints.',
    keyFacts: [
      'Both column answers must satisfy ALL given conditions simultaneously',
      'Typical format: find X and Y such that X + Y = k and some other constraint holds',
      'Table has 5+ rows — each row gives one (X, Y) pair option',
      'Wrong traps: pairs where one column is correct but the other is not',
      'Always verify both columns against both conditions before choosing',
    ],
    example: {
      problem: 'A committee needs 2 members from Group A and 1 from Group B. Group A has {Alice, Bob, Carol}. Select one pair from Group A that always works together, and one from Group B.',
      steps: [
        'Identify the constraint: 2 from A, 1 from B',
        'Evaluate each row for Column 1 (Group A pair)',
        'Evaluate each row for Column 2 (Group B person)',
        'Both selections must satisfy the condition simultaneously',
      ],
      answer: 'Select row where Column 1 satisfies the A-constraint AND Column 2 satisfies the B-constraint',
    },
    traps: [
      'Choosing a pair that satisfies only one column\'s constraint',
      'Forgetting to verify the selected pair against BOTH conditions',
      'Misreading "at least" vs "exactly" in the constraint',
      'Assuming the two columns are independent — they may interact',
    ],
    solveSteps: [
      '1. Read the question stem carefully — identify what Column 1 and Column 2 must each represent',
      '2. List the conditions that must hold',
      '3. For each row, check Column 1 condition independently',
      '4. For passing rows, check if Column 2 also satisfies its condition',
      '5. Select the row where BOTH columns satisfy their conditions',
    ],
  },

  'Table Analysis': {
    title: 'Table Analysis (TA)',
    icon: '📋',
    summary: 'TA questions present a sortable table. You evaluate 3 statements as True/False or Yes/No based on the data. You may sort by any column to help.',
    keyFacts: [
      'Statements are evaluated independently — one T/F per statement',
      '"Must be true" requires EVERY row to satisfy the condition',
      '"Could be true" only requires at least ONE row to satisfy it',
      'You can sort the table — useful for finding max/min, rankings, or thresholds',
      'Watch for column headers and units — common confusion point',
    ],
    example: {
      problem: 'Given a table of company revenues (cols: Company, Revenue, Region):\nStatement 1: More than half the companies are in Region A.\nStatement 2: No company has revenue over $1B.\nStatement 3: The median revenue is between $300M and $500M.',
      steps: [
        'Sort by Region — count Region A vs total → T or F',
        'Scan Revenue column for any > $1B → T or F',
        'Sort by Revenue — find median value → T or F',
      ],
      answer: 'Evaluate each statement True/False independently',
    },
    traps: [
      'Confusing "all" with "some" — "all" = must be true for every row',
      'Missing unit conversions (thousands vs millions)',
      'Forgetting to count rows carefully — off-by-one errors',
      'Treating approximate values as exact when the table shows rounded figures',
    ],
    solveSteps: [
      '1. Read all column headers and units first',
      '2. For each statement, identify which column(s) are relevant',
      '3. Sort by relevant column if needed',
      '4. Check if the statement holds for ALL rows (must be true) or just some (could be true)',
      '5. Mark True/False for each statement independently',
    ],
  },

  'Graphics Interpretation': {
    title: 'Graphics Interpretation (GI)',
    icon: '📈',
    summary: 'GI questions present a graph (bar, line, scatter, pie) and ask you to fill in blanks in statements or answer questions about what the graph shows.',
    keyFacts: [
      'Read axis labels and units BEFORE looking at the data',
      'Identify the chart type — each type has different reading strategies',
      'Scatter plots: look for correlation direction (positive/negative) and strength',
      'Bar/line: read relative heights, not exact values unless required',
      'Pie charts: percentages sum to 100%; use proportional reasoning',
    ],
    example: {
      problem: 'A scatter plot shows hours studied (x-axis) vs. test score (y-axis). A trend line is shown.\nStatement: A student who studies 6 hours is predicted to score approximately 75.',
      steps: [
        'Locate x = 6 on the horizontal axis',
        'Trace up to the trend line',
        'Read the y-value at the intersection',
        'Compare to 75 — True/False',
      ],
      answer: 'Read from the graph at x = 6 and report the y-value',
    },
    traps: [
      'Extrapolating beyond the graph\'s range — do not go past the data shown',
      'Confusing correlation with causation in scatter plots',
      'Misreading the scale — check if axes start at 0 or a non-zero value',
      'Confusing "approximately" with "exactly" — GI allows small margins of error',
    ],
    solveSteps: [
      '1. Identify graph type and read title',
      '2. Read BOTH axis labels and units carefully',
      '3. Note the scale — does the y-axis start at 0?',
      '4. For each fill-in, locate the relevant data point',
      '5. Report only what the graph directly shows — no inference beyond data',
    ],
  },

  'Multi-Source Reasoning': {
    title: 'Multi-Source Reasoning (MSR)',
    icon: '🗂',
    summary: 'MSR presents 2-3 tabs with different source types (emails, memos, charts, tables). Questions ask you to synthesize information across sources or evaluate whether claims are supported.',
    keyFacts: [
      'Each tab is a separate source — read all tabs before answering',
      'Information may appear only in one tab — check all before concluding it\'s absent',
      'Inference questions: must be supported by at least one tab, not contradict others',
      '"Supported by" vs "contradicted by" — key distinction in answer choices',
      'Dates matter — earlier memos may be superseded by later ones',
    ],
    example: {
      problem: 'Tab 1 (Email): "We shipped 500 units on March 3." Tab 2 (Invoice): "Invoice for 450 units dated March 5."\nQuestion: Did the full shipment of 500 units get invoiced?',
      steps: [
        'Read Tab 1: shipment = 500 units, March 3',
        'Read Tab 2: invoice = 450 units, March 5',
        '500 ≠ 450 → full shipment NOT fully invoiced',
        'Answer: No / Not supported',
      ],
      answer: 'No — the invoice covers only 450 of 500 units',
    },
    traps: [
      'Missing information in one tab — check ALL tabs before concluding',
      'Date confusion — newer documents may supersede older ones',
      'Inferring beyond what any single tab directly states',
      '"Supported" means DIRECTLY stated or logically implied — not plausible',
    ],
    solveSteps: [
      '1. Read all tabs to get the full picture before answering',
      '2. Note the source type and date of each tab',
      '3. For each question, identify which tabs contain relevant info',
      '4. Synthesize across tabs — look for agreements and contradictions',
      '5. For inference questions: answer must be directly supported by at least one tab',
    ],
  },

  'Boldface': {
    title: 'Boldface CR Questions',
    icon: '🔲',
    summary: 'Boldface questions show two highlighted portions of an argument and ask you to identify the logical role each plays — e.g., main conclusion, intermediate conclusion, premise, counter-premise, or background.',
    keyFacts: [
      'The argument has a Main Conclusion — often not bolded',
      'Bolded portions are typically: premise, counter-argument, intermediate conclusion, evidence',
      'Counter-premise introduces an opposing view the author then dismisses',
      'Intermediate conclusion = a sub-conclusion that supports the main claim',
      'Trigger: "The two boldface portions play which roles in the argument above?"',
      'Correct answer must accurately describe BOTH portions — half-right = wrong',
    ],
    example: {
      problem: 'Boldface #1: "Sales rose 20% this quarter." Boldface #2: "Therefore, the new marketing strategy is a success." What roles?',
      steps: [
        'Boldface #1 is a premise (stated fact) supporting the conclusion',
        'Boldface #2 uses "therefore" → it IS the main conclusion',
        'Answer: "The first is evidence for the claim made in the second; the second is the main conclusion"',
      ],
      answer: '#1 = evidence/premise; #2 = main conclusion',
    },
    traps: [
      '"Supports the conclusion" vs "IS the conclusion" — critically different',
      'Counter-premise trap: a bolded objection is NOT a premise for the main conclusion',
      'Intermediate conclusion can be both a conclusion AND a premise for the final conclusion',
      'Reading choices too quickly — answer must fit BOTH bolded portions accurately',
    ],
    solveSteps: [
      '1. Read the full argument; identify the main conclusion (often NOT bolded)',
      '2. Label each bolded portion: premise / counter-premise / intermediate conclusion / main conclusion',
      '3. Characterize both portions independently',
      '4. Match to answer choices — eliminate any that mislabel either portion',
    ],
  },

  'Flaw': {
    title: 'Find the Flaw',
    icon: '⚠️',
    summary: 'Flaw questions ask you to identify the logical error in the argument. The argument always has a gap between premises and conclusion that undermines the reasoning.',
    keyFacts: [
      'Trigger words: "the argument is flawed because it", "vulnerable to criticism because", "logical error"',
      'Common flaw types: ad hominem, false dichotomy, circular reasoning, correlation/causation, hasty generalization, unrepresentative sample',
      'Correlation ≠ causation: just because A and B co-occur does NOT mean A caused B',
      'Hasty generalization: applying a pattern from a small sample to a large population',
      'False dichotomy: assuming only 2 options exist when more are possible',
      'Circular reasoning: using the conclusion as a premise',
    ],
    example: {
      problem: 'Everyone in my office who drinks coffee is productive. Therefore, coffee improves productivity.',
      steps: [
        'Correlation used to claim causation — just because coffee-drinkers are productive does not mean coffee CAUSES productivity',
        'Alternative: productive people may choose coffee for other reasons',
        'Flaw: "It treats a correlation as if it established causation"',
      ],
      answer: 'Correlation–causation flaw',
    },
    traps: [
      'Picking an answer that identifies a weakness that is real but NOT the primary flaw',
      'Confusing a weak argument with a flawed one — flaw must be about the logical structure',
      'Extreme language: "The argument assumes without justification that ALL X..." may be wrong if the argument only says "most"',
    ],
    solveSteps: [
      '1. Identify the conclusion and premises',
      '2. Ask: "What assumption is required? Can I poke a hole in it?"',
      '3. Name the flaw type (correlation-causation? hasty generalization? false dichotomy?)',
      '4. Pick the answer that names the same flaw — exact wording will vary',
    ],
  },

  'Evaluate': {
    title: 'Evaluate the Argument',
    icon: '⚖️',
    summary: 'Evaluate questions ask which piece of information would be most useful in assessing whether the conclusion is well-supported. The best answer helps determine if the argument is strong OR weak — it works in both directions.',
    keyFacts: [
      'Trigger: "which of the following would be most useful to know in evaluating the argument?"',
      'The correct answer is a QUESTION or piece of info — not a statement that strengthens or weakens',
      'Best test: "If YES → strengthens / If NO → weakens" (or vice versa). If only one direction matters, it is a strengthener/weakener trap',
      'Focus on the assumption gap — what must be true for the conclusion to hold?',
      'Evaluate ≠ Strengthen and ≠ Weaken — the answer is useful IN BOTH SCENARIOS',
    ],
    example: {
      problem: 'A city built a new park and crime in that neighborhood dropped 15%. The park improved public safety. Evaluate question: which piece of information would be most useful?',
      steps: [
        'Gap: was the crime drop caused by the park, or by other factors?',
        'Best evaluate: "Did crime drop in comparable neighborhoods without new parks over the same period?"',
        'If YES → park was not special (weakens); if NO → park may have caused it (strengthens)',
      ],
      answer: 'Ask whether crime dropped elsewhere too (tests alternative explanation)',
    },
    traps: [
      '"If YES, strengthens; if NO, irrelevant" → this is a strengthener, not evaluate',
      'Answers about irrelevant details (cost of park, number of visitors) — not tied to the core gap',
      'Answers that directly state a fact — evaluate choices ask questions or present variables',
    ],
    solveSteps: [
      '1. Identify conclusion and the assumption gap',
      '2. Predict the question you need answered: "I need to know if X is responsible or if Y caused it"',
      '3. Apply YES/NO test: does the answer work in both directions?',
      '4. Eliminate one-directional answers (they are strengtheners or weakeners, not evaluators)',
    ],
  },

  'Inference': {
    title: 'Inference / Must Be True',
    icon: '💡',
    summary: 'Inference questions ask what MUST be true based on the information in the passage. The correct answer follows logically from the stated facts — no outside knowledge, no stretching.',
    keyFacts: [
      'Trigger: "which of the following must be true", "can be properly inferred", "follows logically from"',
      'Correct answer: provable directly from stated facts — 100% supported, not just probably true',
      'Wrong-answer traps: too extreme, only probable (not certain), contradicts stated facts',
      'The passage premises are FACTS — accept them even if they seem odd',
      'EXCEPT variant: find 4 answers that must be true; the 5th does NOT follow',
      'Combine facts when needed: if "All A are B" and "All B are C", then "All A are C" must be true',
    ],
    example: {
      problem: 'Every employee who completed the training received a certificate. Maria completed the training. What must be true?',
      steps: [
        'Directly applies: Maria completed training → Maria received certificate',
        'No need to infer anything — it directly follows from the universal rule',
      ],
      answer: 'Maria received a certificate',
    },
    traps: [
      '"Probably true" is NOT "must be true" — the answer must be guaranteed',
      '"Some" vs "All" — if the passage says "some X are Y", you cannot infer "all X are Y"',
      'Scope creep: the answer goes beyond what the passage states ("therefore the program is effective")',
      'Extreme language in wrong answers: "always", "never", "all" — rarely must-be-true',
    ],
    solveSteps: [
      '1. Read all premises as established facts',
      '2. Combine facts using valid logical links (all/some/none, if-then)',
      '3. Test each answer: "Can I prove this 100% from the stated info?"',
      '4. Eliminate anything that requires outside knowledge, probability, or exaggeration',
    ],
  },

  'Paradox': {
    title: 'Resolve the Paradox',
    icon: '🔀',
    summary: 'Paradox questions present two facts that appear contradictory and ask you to find an explanation that makes BOTH facts true simultaneously.',
    keyFacts: [
      'Trigger: "which of the following, if true, best resolves the apparent paradox?"',
      'Two facts are stated — both are TRUE. The paradox is how they can BOTH be true',
      'Correct answer: explains why BOTH facts hold; does not deny either fact',
      'Wrong answer: explains only one fact, or introduces a new contradiction',
      'Strategy: state the paradox in your own words — "X happened even though Y suggests it should not"',
    ],
    example: {
      problem: 'A hospital installed new safety equipment, yet patient injury rates increased. Resolve.',
      steps: [
        'Paradox: new safety = more injuries? That seems backwards.',
        'Resolution needed: something that makes BOTH true simultaneously',
        'Best resolution: "The hospital began treating higher-risk patients after installing the equipment" → more risk → more injuries, equipment notwithstanding',
      ],
      answer: 'Patient risk profile changed (making both facts compatible)',
    },
    traps: [
      'Answers that deny one of the two stated facts — both must remain true',
      'Answers that explain only the unexpected outcome without accounting for why the expected outcome did not happen',
      'Irrelevant third factor that does not connect the two facts',
      'Strengthening the paradox: the answer makes the contradiction even more puzzling',
    ],
    solveSteps: [
      '1. State the paradox explicitly: "Fact A says X, Fact B suggests NOT-X — how can both be true?"',
      '2. Predict the type of resolution: additional context, hidden third factor, scope difference',
      '3. Test each answer: Does it preserve BOTH facts and eliminate the contradiction?',
      '4. Eliminate answers that only partially explain or introduce new problems',
    ],
  },

  'Verb Tense': {
    title: 'Verb Tense (SC)',
    icon: '⏱',
    summary: 'GMAT Sentence Correction tests logical tense consistency. Perfect tense (has/have + past participle) indicates action completed before another past action. Simple past describes completed actions at a definite time.',
    keyFacts: [
      'Simple past (did) = completed at a specific time in the past',
      'Present perfect (has done) = action with ongoing relevance or no definite time',
      'Past perfect (had done) = completed BEFORE another past action',
      'Never use "would have" in the if-clause of a conditional',
      'Tense must be CONSISTENT within a sentence unless sequence logic requires change',
    ],
    example: {
      problem: 'By the time the merger was announced, the company [had already lost / already lost] most of its market share.',
      steps: [
        'Two past events: "announced" and "losing market share"',
        'Losing market share happened BEFORE the announcement',
        'Use past perfect (had already lost) for the earlier event',
      ],
      answer: '"had already lost" — past perfect for the earlier event',
    },
    traps: [
      'Using simple past for an action that clearly precedes another past action',
      'Using present perfect with a definite time marker ("yesterday," "in 2010")',
      'Mixing "would" in the if-clause: "If I would have known" is always wrong',
      'Changing tense mid-sentence without logical reason',
    ],
    solveSteps: [
      '1. Identify all verbs in the sentence',
      '2. Determine the chronological sequence of events',
      '3. Match tense to sequence: earlier event → past perfect; later event → simple past',
      '4. Check for time markers that lock in a specific tense',
      '5. Eliminate choices that violate tense logic',
    ],
  },

  'Pronouns': {
    title: 'Pronoun Reference (SC)',
    icon: '↔',
    summary: 'Every pronoun must have a clear, unambiguous antecedent. GMAT tests pronoun-antecedent agreement (number and gender), pronoun case (subject vs object), and ambiguous reference.',
    keyFacts: [
      'A pronoun must refer to exactly ONE clear antecedent — ambiguous reference is wrong',
      '"It" must refer to a singular noun; "they" to a plural noun',
      '"Its" = possessive of "it"; "it\'s" = it is (never correct on GMAT)',
      'A pronoun cannot refer to a noun acting as an adjective (e.g., "the company\'s growth — it grew" is wrong because "company" is possessive)',
      '"Who" = people; "that/which" = things',
    ],
    example: {
      problem: 'The committee told the managers that they needed to revise their reports.',
      steps: [
        '"They" is ambiguous — could refer to "committee" or "managers"',
        'GMAT will offer a rewrite that removes ambiguity',
        'Correct version: The committee told the managers that the managers needed to revise their reports.',
      ],
      answer: 'Rewrite to clarify which noun the pronoun refers to',
    },
    traps: [
      '"Them" used where a clear noun phrase is needed',
      'Pronoun agrees in number with a word near it but not its actual antecedent',
      '"Company" acting as adjective — cannot be the antecedent for "it"',
      'Using "they" to refer to an unnamed group (e.g., "In France, they drink wine")',
    ],
    solveSteps: [
      '1. Identify each pronoun in the sentence',
      '2. Find the intended antecedent for each pronoun',
      '3. Check: is the antecedent singular/plural matching the pronoun?',
      '4. Check: is there only ONE possible antecedent (no ambiguity)?',
      '5. Eliminate choices with unclear or mismatched pronoun references',
    ],
  },

  'Comparisons': {
    title: 'Comparisons (SC)',
    icon: '≈',
    summary: 'GMAT requires grammatically parallel and logically equivalent comparisons. "Like" compares nouns; "as" introduces clauses. "More than" vs "greater than" depends on count vs magnitude.',
    keyFacts: [
      '"Like" = compare nouns: "Like Einstein, Newton was a genius"',
      '"As" = compare clauses: "As Einstein did, Newton worked alone"',
      'Compared items must be structurally parallel (noun to noun, clause to clause)',
      '"Those of" is often needed: "Revenues of Company A exceeded those of Company B"',
      '"More than" (quantity) vs "greater than" (magnitude)',
    ],
    example: {
      problem: 'The infrastructure of city X is more advanced than city Y.',
      steps: [
        'Comparing "infrastructure of city X" to "city Y" — illogical (infrastructure ≠ city)',
        'Correct: "...more advanced than that of city Y" or "...more advanced than city Y\'s"',
        'Must compare infrastructure to infrastructure, not to a city',
      ],
      answer: 'Add "that of" or possessive to match the comparison logically',
    },
    traps: [
      'Comparing a part to a whole: "the policy of X is better than Y" (should be "Y\'s policy")',
      'Using "like" when a clause follows (should be "as")',
      '"As much" vs "more": "as much as" for equal comparisons',
      'Omitting "those of" when comparing plural nouns',
    ],
    solveSteps: [
      '1. Identify what is being compared on each side of "than/as/like"',
      '2. Check that both sides are logically equivalent (noun to noun)',
      '3. Check that both sides are grammatically parallel',
      '4. Add "that of / those of" if a noun is compared to a group',
      '5. Choose "like" (nouns) or "as" (clauses) correctly',
    ],
  },

  'Coordinate Geometry': {
    title: 'Coordinate Geometry',
    icon: '📐',
    summary: 'GMAT tests coordinate geometry including slope, distance, midpoint, equations of lines, and properties of circles and triangles on the coordinate plane.',
    keyFacts: [
      'Slope = (y₂ - y₁) / (x₂ - x₁) = rise / run',
      'Parallel lines have equal slopes; perpendicular lines have slopes that multiply to -1',
      'Distance formula: √[(x₂-x₁)² + (y₂-y₁)²]',
      'Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)',
      'Equation of line: y = mx + b where m = slope, b = y-intercept',
      'Circle centered at (h,k) with radius r: (x-h)² + (y-k)² = r²',
    ],
    example: {
      problem: 'Line L passes through (2, 3) and (6, 7). What is the slope of a line perpendicular to L?',
      steps: [
        'Slope of L = (7-3)/(6-2) = 4/4 = 1',
        'Perpendicular slope = -1/1 = -1',
      ],
      answer: '-1',
    },
    traps: [
      'Forgetting to negate AND invert for perpendicular slope',
      'Division by zero when the line is vertical (undefined slope)',
      'Confusing (x₁ - x₂) with (x₂ - x₁) — both give same slope if consistent',
      'Circle equation: not expanding to standard form before reading radius',
    ],
    solveSteps: [
      '1. Plot key points if helpful to visualize',
      '2. Apply relevant formula (slope, distance, midpoint)',
      '3. For perpendicular: negate and invert the slope',
      '4. For lines in DS: two conditions needed → two points OR slope + one point',
      '5. Sanity check: does the answer make geometric sense?',
    ],
  },

  'Overlapping Sets': {
    title: 'Overlapping Sets (Venn Diagrams)',
    icon: '⭕',
    summary: 'Overlapping sets problems use the inclusion-exclusion formula: |A ∪ B| = |A| + |B| - |A ∩ B|. For three sets: |A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|.',
    keyFacts: [
      'Two sets: Total = A + B - Both + Neither',
      'Three sets: Total = A + B + C - (A∩B) - (A∩C) - (B∩C) + (A∩B∩C) + Neither',
      '"Only A" = |A| - |A∩B| (for two sets)',
      '"Exactly two of three" = (A∩B) + (A∩C) + (B∩C) - 3(A∩B∩C)',
      'A double matrix (2×2 table) is more efficient than Venn for two overlapping attributes',
    ],
    example: {
      problem: 'Of 100 students, 60 study Math, 50 study English, and 30 study both. How many study neither?',
      steps: [
        'Total = Math + English - Both + Neither',
        '100 = 60 + 50 - 30 + Neither',
        'Neither = 100 - 80 = 20',
      ],
      answer: '20 students study neither',
    },
    traps: [
      'Forgetting to subtract the "both" category, causing double-counting',
      'For three sets, forgetting to ADD back the triple-overlap',
      'Using "at least one" when "exactly one" is asked (remove overlaps)',
      'Confusing "neither" as 0 when the problem doesn\'t state everyone is in a set',
    ],
    solveSteps: [
      '1. Write out the formula for two or three sets',
      '2. Fill in known values',
      '3. Solve for the unknown',
      '4. For DS: confirm you have enough equations to solve for the unknown',
      '5. Draw a Venn or matrix diagram to avoid errors',
    ],
  },

  'Modular Arithmetic': {
    title: 'Remainders & Modular Arithmetic',
    icon: '÷',
    summary: 'Remainder questions test the pattern of remainders when dividing by a fixed number. Key: a ≡ r (mod n) means a = qn + r where 0 ≤ r < n.',
    keyFacts: [
      'If x = qn + r, then x has remainder r when divided by n',
      'Remainders can be added and multiplied: (a+b) mod n = ((a mod n) + (b mod n)) mod n',
      'Cyclicity of units digit: powers of 2 cycle in 4 (2,4,8,6); powers of 3 in 4 (3,9,7,1)',
      'Consecutive integers: n consecutive integers contain exactly one multiple of n',
      'If a has remainder r₁ and b has remainder r₂ (same divisor), then a+b has remainder r₁+r₂ (or that minus the divisor if ≥ divisor)',
    ],
    example: {
      problem: 'What is the remainder when 7²⁰ is divided by 5?',
      steps: [
        'Units digits of powers of 7 cycle: 7,9,3,1,7,9,3,1... (cycle of 4)',
        '7²⁰: 20 is divisible by 4, so units digit = 1 (same as 7⁴)',
        'A number with units digit 1 divided by 5 has remainder 1',
      ],
      answer: 'Remainder = 1',
    },
    traps: [
      'Forgetting cyclicity — do not compute large powers directly',
      'When remainder is 0, the number IS divisible by the divisor',
      'The remainder from a product is the product of individual remainders (mod divisor)',
      'Negative remainders: if result is negative, add the divisor to make it positive',
    ],
    solveSteps: [
      '1. Identify the divisor and what\'s being divided',
      '2. Use patterns/cycles for powers rather than direct computation',
      '3. Apply the addition/multiplication rules for remainders',
      '4. Check: is the answer between 0 and (divisor - 1)?',
      '5. Verify with a small example to confirm the pattern',
    ],
  },

  // ─── 700+ TRAPS & SPECIAL TOPICS ─────────────────────────────

  'Number Line': {
    title: 'Number Line & Counting',
    icon: '↔',
    summary: 'Number-line questions test inclusive/exclusive counting, spacing between integers, and symmetric ranges around 0. One off-by-one error costs the question.',
    keyFacts: [
      'Integers from a to b INCLUSIVE: b − a + 1',
      'Integers from a to b EXCLUSIVE: b − a − 1',
      'Multiples of k from a to b: ⌊b/k⌋ − ⌊(a−1)/k⌋',
      'Even integers from a to b (both even): (b − a)/2 + 1',
      'Spacing on a number line: n equally spaced points create n−1 gaps',
      'Symmetric range: integers −n to n (inclusive) = 2n + 1 total',
    ],
    example: {
      problem: 'How many integers from 10 to 99, inclusive, are NOT divisible by 3?',
      steps: [
        'Total integers: 99 − 10 + 1 = 90',
        'Multiples of 3: ⌊99/3⌋ − ⌊9/3⌋ = 33 − 3 = 30',
        'NOT divisible by 3: 90 − 30 = 60',
      ],
      answer: '60',
    },
    traps: [
      '"From a to b" — always clarify inclusive vs exclusive',
      'Off-by-one: 1 to 10 has 10 integers, not 9',
      'Multiples of k: use floor formula, not just b/k − a/k',
      '"Every nth element" problems: watch whether endpoints are included',
    ],
    solveSteps: [
      '1. Determine inclusive or exclusive',
      '2. Use formula: b − a + 1 (inclusive)',
      '3. For multiples: ⌊b/k⌋ − ⌊(a−1)/k⌋',
      '4. Verify with small example (k=2, a=1, b=10 → 5 evens)',
    ],
  },

  'Scope Shift': {
    title: 'CR Scope Shift (Argument Errors)',
    icon: '↝',
    summary: 'Most GMAT Critical Reasoning wrong answers exploit scope shifts — introducing new terms, swapping cause/effect, or conflating correlation with causation.',
    keyFacts: [
      'Stimulus scope ≠ answer choice scope: eliminate answers outside the argument',
      'Cause ↔ Effect confusion: "A causes B" ≠ "B causes A"',
      'Correlation ≠ Causation: two events co-occurring does not mean one caused the other',
      'Analogy errors: "X worked for Y, therefore X will work for Z" ignores differences',
      'Representativeness: a sample conclusion about all requires a representative sample',
      'Circular reasoning: conclusion restates the premise in different words',
    ],
    example: {
      problem: 'Identify the scope shift: "Students who use laptops in class get lower grades. Therefore, laptops cause lower grades."',
      steps: [
        'Correlation established: laptop use correlates with lower grades',
        'Scope shift: jumps to CAUSATION without eliminating confounds',
        'Possible confound: students who struggle attend class less attentively AND use laptops more',
        'Weaken it: show another factor causes both laptop use and lower grades',
      ],
      answer: 'Correlation–causation scope shift',
    },
    traps: [
      'GMAT rarely makes obvious logical errors — the flaw is usually subtle',
      '"Strengthen" answers that just restate the premise add no logical support',
      'Extreme language (always, never, all, none) in answer choices = usually wrong',
      'Eliminate choices that are TRUE but IRRELEVANT to the argument\'s logic',
    ],
    solveSteps: [
      '1. Identify the conclusion (often after "therefore", "thus", "so")',
      '2. Identify the premise(s)',
      '3. Find the logical gap (scope shift, missing link)',
      '4. Test each answer against that specific gap',
    ],
  },

  'Idioms': {
    title: 'SC Idioms & Prepositions',
    icon: '∈',
    summary: 'GMAT SC tests ~100 idiomatic prepositional phrases. Preposition choice is non-negotiable — it is tested by ear, not logic.',
    keyFacts: [
      'Agree WITH (a person) vs Agree ON (a topic) vs Agree TO (a proposal)',
      'Differ FROM (comparison) vs Differ WITH (disagreement)',
      'Credit X WITH Y (give credit for doing Y)',
      'Attribute X TO Y (cause attributed to Y)',
      'Consider X Y (no "as" or "to be"): "I consider him a genius" ✓',
      'Regard X AS Y: "I regard him as a genius" ✓ — not "regard him to be"',
      'Between X AND Y (not "between X or Y")',
      'From X TO Y (not "from X until Y" for ranges)',
    ],
    example: {
      problem: 'Which is correct? (A) "The increase is attributed to inflation" vs (B) "The increase is attributed by inflation"',
      steps: [
        'Idiom: "attribute X TO Y" is the fixed English prepositional phrase',
        '"attributed by" would mean inflation is doing the attributing — nonsensical',
        'Answer: (A)',
      ],
      answer: 'A',
    },
    traps: [
      '"Like" vs "such as" — "such as" gives examples, "like" makes comparisons',
      '"As" vs "like" — use "as" before a clause (subject + verb)',
      '"Whether" vs "if" — use "whether" for two possibilities in noun clauses',
      'Redundant prepositions: "off of" → "off", "inside of" → "inside"',
    ],
    solveSteps: [
      '1. Circle the preposition — is it part of a fixed idiom?',
      '2. Test the idiom with a simple sentence you know is correct',
      '3. Eliminate choices that change the idiom',
      '4. If stuck, pick the more concise option',
    ],
  },

  'RC Main Idea': {
    title: 'RC Main Idea & Author Purpose',
    icon: '📌',
    summary: 'Main Idea questions ask what the passage is PRIMARILY about — the answer must cover the whole passage, not just one paragraph, and must match the author\'s tone.',
    keyFacts: [
      'Correct answer: broad enough to cover the passage, specific enough to exclude distortors',
      'Too narrow: covers only one paragraph or example',
      'Too broad: introduces scope the passage never discusses',
      'Author tone words: "suggests", "argues", "contends" = opinion; "notes", "reports" = neutral',
      'Primary purpose verbs: analyze, argue, challenge, describe, illustrate, reconcile',
      'Intro + conclusion sentences carry the most weight for main idea',
    ],
    example: {
      problem: 'A 250-word passage describes recent research on how sleep deprivation affects decision-making, argues that current workplace norms undervalue sleep, and calls for policy change. What is the primary purpose?',
      steps: [
        'Research description = evidence layer',
        'Argument about workplace norms = main claim',
        'Policy call = conclusion of argument',
        'Primary purpose: to argue that workplace norms should change to accommodate sleep needs',
        'Eliminate: "to describe sleep research" (too narrow — ignores the argument)',
      ],
      answer: 'To argue that current policies undervalue sleep and should be reformed',
    },
    traps: [
      'Extreme language in answer choices ("proves", "conclusively shows") — authors hedge',
      'Choices that use words FROM the passage but distort the meaning',
      'Correct-fact-wrong-purpose: true about a paragraph but not the whole passage',
      'Reversed tone: if author is critical, eliminate "supportive" answers',
    ],
    solveSteps: [
      '1. Note the first and last sentence of each paragraph',
      '2. Identify the author\'s stance (positive, critical, neutral)',
      '3. Pick the answer that matches both scope AND tone',
      '4. Eliminate too-narrow (single paragraph) and too-broad (adds new topics)',
    ],
  },

  'Weighted Average': {
    title: 'Weighted Average & Mixtures',
    icon: '⚖',
    summary: 'Weighted average is one of the highest-frequency 700+ topics. The Alligation method (see-saw) solves mixture problems in 20 seconds.',
    keyFacts: [
      'Weighted avg = Σ(weight × value) / Σ(weights)',
      'If two groups have averages A and B, overall average is between A and B',
      'Overall avg closer to A → group A is larger',
      'Alligation: d1/d2 = w2/w1 (distances from the mean = inverse of weights)',
      'Mixture replacement: after removing x from V and adding x of new: new conc = old × (1 − x/V)^n',
    ],
    example: {
      problem: 'Class A: 20 students, avg score 70. Class B: 30 students, avg score 80. Combined average?',
      steps: [
        'Weighted: (20×70 + 30×80) / (20+30)',
        '= (1400 + 2400) / 50',
        '= 3800 / 50 = 76',
        'Alligation check: closer to 80 (larger group) ✓',
      ],
      answer: '76',
    },
    traps: [
      '"Average of averages" (unweighted) is WRONG when groups have different sizes',
      'Trap: they give you the group sizes and hope you average the averages directly',
      'Mixture replacement: successive removal — use (1 − x/V)^n formula, not linear subtraction',
      'DS trap: knowing overall average + one group average is NOT sufficient without group sizes',
    ],
    solveSteps: [
      '1. List each group\'s (weight, value)',
      '2. Compute Σ(w × v) and Σ(w)',
      '3. Divide — or use Alligation for speed',
      '4. Sanity check: result must be BETWEEN the two group averages',
    ],
  },

  'Sentence Structure': {
    title: 'SC Sentence Structure & Clauses',
    icon: '⎪',
    summary: 'GMAT SC tests whether every modifier, clause, and appositive logically attaches to the right element. Misplaced modifiers and dangling participles are among the most tested errors.',
    keyFacts: [
      'Opening participial phrase modifies the subject of the main clause',
      '"Having done X, the team…" — the team must have done X',
      'Relative clause ("which/that") must immediately follow the noun it modifies',
      'Appositive ("X, a noun phrase, Y") — the noun phrase must match X',
      'Parallel structure: items in a list must be grammatically identical',
      'Correlative conjunctions: "not only X but also Y" — X and Y must be parallel',
    ],
    example: {
      problem: 'Choose the correct form: (A) "Running late, the bus was missed by Maria." (B) "Running late, Maria missed the bus."',
      steps: [
        'Opening phrase "Running late" must modify the subject',
        '(A): subject = "the bus" — the bus was not running late',
        '(B): subject = "Maria" — Maria was running late ✓',
        'Answer: (B)',
      ],
      answer: 'B',
    },
    traps: [
      'Long noun phrases between modifier and subject obscure the misplacement',
      '"Which" traps: "She won the award, which surprised everyone" — does "which" refer to winning or the award?',
      'Parallel list errors hidden by commas: "to run, jumping, and swim" fails parallelism',
      'False subject: "There are/is" — the real subject comes AFTER the verb',
    ],
    solveSteps: [
      '1. Identify every modifier — find what it is supposed to modify',
      '2. Check that modifier is adjacent to its referent',
      '3. Check parallel structure in lists and correlatives',
      '4. Read the sentence aloud — awkward rhythm often signals an error',
    ],
  },

  'Data Sufficiency Strategy': {
    title: 'DS Strategy & Traps',
    icon: 'DS',
    summary: 'Data Sufficiency is unique to GMAT. The five answer choices are always the same — memorize them. The most common wrong answers are C (when D is correct) and B (when A is correct).',
    keyFacts: [
      'A: (1) ALONE sufficient, (2) alone not sufficient',
      'B: (2) ALONE sufficient, (1) alone not sufficient',
      'C: BOTH together sufficient, but neither alone',
      'D: EACH statement ALONE sufficient',
      'E: NEITHER statement, even together, sufficient',
      'YES/NO questions: sufficient = always YES or always NO (not sometimes)',
      'VALUE questions: sufficient = exactly one value',
      'NEVER assume information from one statement while testing the other',
    ],
    example: {
      problem: 'Is x > 0? (1) x² > 0  (2) |x| > 0',
      steps: [
        '(1): x² > 0 → x ≠ 0, but x could be positive or negative → NOT sufficient',
        '(2): |x| > 0 → x ≠ 0, but x could be positive or negative → NOT sufficient',
        'Together: still only know x ≠ 0 → NOT sufficient',
        'Answer: E',
        'Trap: many test-takers assume x² > 0 implies x > 0 — wrong, x could be negative',
      ],
      answer: 'E',
    },
    traps: [
      'x² > 4 does NOT mean x > 2 (x could be < −2)',
      'Even powers eliminate sign information: x² = 4 → x = ±2',
      'Forgetting to test NEGATIVE values and ZERO for integer/sufficiency questions',
      '"Value" trap: ST(1): x = 3 if y = 1, or x = 5 if y = 2 → NOT sufficient (value depends on unknown)',
      'C-trap: the answer appears to need both statements, but one statement alone is enough',
    ],
    solveSteps: [
      '1. Rephrase the question to its simplest form',
      '2. Test ST(1) ALONE — try multiple values',
      '3. Test ST(2) ALONE — try multiple values',
      '4. Test together ONLY if neither alone is sufficient',
      '5. For YES/NO: look for a case where you get both YES and NO → not sufficient',
    ],
  },

  'Graphic Interpretation': {
    title: 'GI — Graphic Interpretation',
    icon: '📉',
    summary: 'GI questions present a chart, graph, or scatter plot with two fill-in-the-blank statements. You must read the graph precisely and complete both statements correctly.',
    keyFacts: [
      'Common formats: bar chart, line graph, pie chart, scatter plot, bubble chart',
      'Read axis labels carefully — units often trick test-takers (thousands, millions)',
      'Scatter plot: positive correlation = upward slope, negative = downward',
      'Pie chart: always check what 100% represents (sales, units, etc.)',
      'Bar charts: absolute values vs relative change — the question usually tests one specifically',
      'Both blanks must be correct simultaneously — don\'t forget to complete the second blank',
    ],
    example: {
      problem: 'A bar chart shows revenue for 2020–2023. Revenue was $10M, $12M, $9M, $15M. Statement: "The year with the greatest year-over-year change was ___, with a change of ___."',
      steps: [
        'YoY changes: 2020→2021: +$2M; 2021→2022: −$3M; 2022→2023: +$6M',
        'Greatest absolute change: 2022→2023, change = +$6M',
        'But "greatest change" — check if negative changes count: |−$3M| = $3M < $6M',
        'Answer: 2023, $6M increase',
      ],
      answer: '2023; +$6M',
    },
    traps: [
      'Confusing absolute change with percent change — verify which the question asks',
      'Reading bar height at the wrong scale marking',
      'Bubble charts: bubble SIZE is a third variable, not related to position',
      'Secondary axis: some charts have two y-axes with different scales',
    ],
    solveSteps: [
      '1. Read both axes, legends, and title before looking at blanks',
      '2. Note the unit on each axis',
      '3. Answer blank 1, then independently answer blank 2',
      '4. Reread the completed statement to ensure it makes logical sense',
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

// Per-question theory resolver. Merges override over topic theory key-by-key,
// so a question can override summary/keyFacts/example/traps/solveSteps independently.
// Override sources (first wins):
//   1. q.theory  — inline on the question object (legacy / hand-authored)
//   2. window.QUESTION_THEORIES[q.id].theory  — central per-question table
// Schema: { title?, icon?, summary?, keyFacts?[], example?{problem,steps,answer}, traps?[], solveSteps?[] }
function resolveTheory(q) {
  const base = (q && getTheory(q.topic, q.subtopic)) || GMAT_THEORIES['default'];
  if (!q) return base;
  const fromQ = q.theory;
  const table = (typeof window !== 'undefined' && window.QUESTION_THEORIES) ? window.QUESTION_THEORIES : null;
  const fromTable = (table && q.id != null && table[q.id]) ? table[q.id].theory : null;
  const override = fromQ || fromTable || null;
  return override ? Object.assign({}, base, override) : base;
}

if (typeof window !== 'undefined') {
  window.getTheory = getTheory;
  window.resolveTheory = resolveTheory;
}
