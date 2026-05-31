/* ════════════════════════════════════════════════════════════
   GMAT Math Trainer — Application logic
   Vanilla JS, no framework, persists everything to localStorage.
   ════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const STORAGE_KEY       = 'gmat-trainer-v2';
  const TARGET_TIME_PS    = 120; // seconds per PS question
  const TARGET_TIME_DS    = 120; // seconds per DS question
  const OVER_TIME         = 120; // turn timer red after 2:00
  // GMAT Focus Edition target seconds per question type
  const GMAT_TARGET_SEC = { PS: 135, DS: 120, CR: 130, SC: 90, RC: 110, TPA: 150, TA: 120, GI: 120, MSR: 150 };
  const PULSE_TIME        = 120; // pulse timer bar at 2:00+
  const CHALLENGE_MODE_SEC = 90; // countdown limit in challenge mode
  const SR_INTERVALS   = [1, 3, 7, 14, 30]; // kept for legacy fallback

  // ── Gamification constants ─────────────────────────
  const XP_PER_CORRECT  = 10;
  const XP_PER_SKIP     = 3;
  const MAX_HEARTS      = 5;
  const SUMMARY_EVERY   = 10; // show "Lesson Complete" every N answered questions
  const SPEED_DEMON_SEC = 30; // for Speed Demon achievement

  // ── User-configurable settings (defaults) ──────────
  const DEFAULTS = {
    dailyGoal: 10,
    heartRegenMin: 30,    // 15 / 30 / 60
    warnThresholdSec: 90, // 60 / 90 / 120
    hardMode: false,
  };

  // Cumulative XP needed to *reach* level N (index = level - 1)
  // Level 1 = 0 XP, Level 2 = 50, Level 3 = 200 (50+150), Level 4 = 550, Level 5 = 1250, then +500/level.
  function xpForLevel(level) {
    if (level <= 1) return 0;
    const tiers = [0, 50, 50 + 150, 50 + 150 + 350, 50 + 150 + 350 + 700];
    if (level <= 5) return tiers[level - 1];
    return tiers[4] + (level - 5) * 500;
  }
  function levelFromXp(xp) {
    let lvl = 1;
    while (xp >= xpForLevel(lvl + 1)) lvl++;
    return lvl;
  }

  // ── GMAT Focus 2026 Topic Normalization ────────────
  // Maps any topic string → canonical GMAT Focus 2026 topic name
  const TOPIC_CANONICAL = {
    // Quant — Number Properties
    'Number Properties': 'Number Properties',
    'Number Theory': 'Number Properties',
    'Advanced Number Theory': 'Number Properties',
    'Divisibility': 'Number Properties',
    'Divisibility Tests': 'Number Properties',
    'Divisibility and Remainders': 'Number Properties',
    'Remainders': 'Number Properties',
    'Prime Numbers': 'Number Properties',
    'Factors': 'Number Properties',
    'Factors and Multiples': 'Number Properties',
    'GCD and LCM': 'Number Properties',
    'LCM': 'Number Properties',
    'Even/Odd': 'Number Properties',
    'Even/Odd Traps': 'Number Properties',
    'Consecutive Integers': 'Number Properties',
    'Digit Problems': 'Number Properties',
    'Cyclicity of Units Digits': 'Number Properties',
    'Integer Traps': 'Number Properties',
    'Basic': 'Number Properties',
    'Arithmetic': 'Number Properties',
    'Decimals': 'Number Properties',
    'Fractions': 'Fractions & Decimals',
    'Fractions and Decimals': 'Fractions & Decimals',
    'Fractions & Decimals': 'Fractions & Decimals',

    // Quant — Algebra
    'Algebra': 'Algebra',
    'Algebraic Reasoning': 'Algebra',
    'Linear Equations': 'Algebra',
    'Systems': 'Algebra',
    'Systems of Equations': 'Algebra',
    'Quadratics': 'Algebra',
    'Equations': 'Algebra',
    'Equations with Radicals': 'Algebra',
    'Polynomials': 'Algebra',
    'Fill-in-the-blank': 'Algebra',

    // Quant — Functions & Sequences
    'Function': 'Functions',
    'Functions': 'Functions',
    'Domain and Range': 'Functions',
    'Sequences': 'Functions',
    'Arithmetic Sequences': 'Functions',
    'Arithmetic & Geometric': 'Functions',
    'Arithmetic & Geometric Sequences': 'Functions',

    // Quant — Inequalities
    'Inequalities': 'Inequalities',
    'Absolute Value': 'Inequalities',
    'Absolute Values': 'Inequalities',
    'Absolute Value DS': 'Inequalities',
    'Absolute Value Equations': 'Inequalities',
    'Absolute Value Inequalities': 'Inequalities',
    'Compound Inequalities': 'Inequalities',

    // Quant — Exponents & Roots
    'Exponents': 'Exponents & Roots',
    'Exponent Rules': 'Exponents & Roots',
    'Exponents & Roots': 'Exponents & Roots',

    // Quant — Percents & Ratios
    'Percents': 'Percents & Ratios',
    'Ratios': 'Percents & Ratios',
    'Rate': 'Percents & Ratios',
    'Proportions': 'Percents & Ratios',
    'Compound Ratios': 'Percents & Ratios',
    'Compound Growth': 'Percents & Ratios',
    'Compound Interest': 'Percents & Ratios',

    // Quant — Word Problems
    'Word Problems': 'Word Problems',
    'Work': 'Word Problems',
    'Mixtures': 'Word Problems',
    'Alligation': 'Word Problems',
    'Alloy Problems': 'Word Problems',
    'Age': 'Word Problems',
    'Ages': 'Word Problems',
    'Age Problems': 'Word Problems',
    'Distance': 'Word Problems',
    'Distance-Time': 'Word Problems',
    'Combined Rates': 'Word Problems',
    'Combined': 'Word Problems',
    'Break-Even Analysis': 'Word Problems',
    'Annual': 'Word Problems',
    'Application': 'Word Problems',
    'Calculation': 'Word Problems',

    // Quant — Statistics
    'Statistics': 'Statistics & Probability',
    'Advanced Statistics': 'Statistics & Probability',
    'Mean': 'Statistics & Probability',
    'Median': 'Statistics & Probability',
    'Standard Deviation': 'Statistics & Probability',
    'Probability': 'Statistics & Probability',
    'Conditional Probability': 'Statistics & Probability',
    'Dependent Events': 'Statistics & Probability',
    'Combined Events': 'Statistics & Probability',
    'At Least': 'Statistics & Probability',
    'Arrangements': 'Statistics & Probability',
    'Combinations': 'Statistics & Probability',
    'Combinatorics': 'Statistics & Probability',
    'Permutations': 'Statistics & Probability',
    'Circular Arrangements': 'Statistics & Probability',
    'Circular Permutations': 'Statistics & Probability',
    'Bayes-Like Reasoning': 'Statistics & Probability',

    // Quant — Geometry
    'Geometry': 'Geometry',
    'Triangles': 'Geometry',
    'Circles': 'Geometry',
    'Circles & Areas': 'Geometry',
    'Angles': 'Geometry',
    'Area': 'Geometry',
    'Lines & Circles': 'Geometry',
    'Cylinders': 'Geometry',

    // Quant — Coordinate Geometry
    'Coordinate Geometry': 'Coordinate Geometry',
    'Coordinate': 'Coordinate Geometry',
    'Advanced Coordinate Geometry': 'Coordinate Geometry',
    'Distance and Midpoint': 'Coordinate Geometry',
    'Distance & Midpoint': 'Coordinate Geometry',
    'Distance and Midpoints': 'Coordinate Geometry',

    // Verbal — Critical Reasoning
    'Strengthen': 'Strengthen',
    'Weaken': 'Weaken',
    'Assumption': 'Assumption',
    'Inference': 'Inference',
    'Evaluate': 'Evaluate',
    'Evaluate the Argument': 'Evaluate',
    'Evaluation': 'Evaluate',
    'Flaw': 'Flaw',
    'Bold-Face': 'Bold-Face',
    'Bold Face': 'Bold-Face',
    'Boldface': 'Bold-Face',
    'Main Point': 'Main Point',
    'Discrepancy': 'Explain the Discrepancy',
    'Explain the Discrepancy': 'Explain the Discrepancy',
    'Paradox': 'Explain the Discrepancy',
    'Comparison Logic': 'Inference',
    'Analogical Reasoning': 'Inference',
    'Logical Reasoning': 'Inference',
    'EXCEPT': 'Inference',
    'C-Trap': 'Inference',
    'Comparison': 'Inference',
    'Conditional': 'Inference',
    'Critical Reasoning': 'Inference',

    // Verbal — Reading Comprehension
    'Main Idea': 'Main Idea (RC)',
    'Detail': 'Detail (RC)',
    'Tone': 'Author Tone (RC)',
    'Author Tone': 'Author Tone (RC)',
    'Author Tone and Attitude': 'Author Tone (RC)',
    'Author Viewpoint': 'Author Tone (RC)',
    'Author\\': 'Author Tone (RC)',
    'Author Purpose': 'Author Purpose (RC)',
    'Reading Comprehension': 'Main Idea (RC)',
    'Complete the Passage': 'Detail (RC)',
    'Absolute vs Relative Phrasing': 'Detail (RC)',

    // Verbal — Sentence Correction
    'Subject-Verb Agreement': 'Subject-Verb Agreement',
    'Modifiers': 'Modifiers',
    'Dangling Modifier': 'Modifiers',
    'Parallelism': 'Parallelism',
    'Ellipsis Errors': 'Parallelism',
    'Ellipsis and Parallel Structure': 'Parallelism',
    'Pronouns': 'Pronouns',
    'Verb Tense': 'Verb Tense',
    'Comparisons': 'Comparisons',
    'Comparison Errors': 'Comparisons',
    'Idioms': 'Idioms',
    'Sentence Correction': 'Subject-Verb Agreement',

    // DI — types as topics
    'Two-Part Analysis': 'Two-Part Analysis',
    'Table Analysis': 'Table Analysis',
    'Graphics Interpretation': 'Graphics Interpretation',
    'Graphs & Charts': 'Graphics Interpretation',
    'Data Interpretation': 'Graphics Interpretation',
    'Bar Chart': 'Graphics Interpretation',
    'Line Chart': 'Graphics Interpretation',
    'Line Graph': 'Graphics Interpretation',
    'Combo Chart': 'Graphics Interpretation',
    'Data Comparison': 'Graphics Interpretation',
    'Multi-Source Reasoning': 'Multi-Source Reasoning',
    'Email and Data': 'Multi-Source Reasoning',
    'Data Sufficiency': 'Data Sufficiency (DI)',
    'Problem Solving': 'Word Problems',

    // Additional (non-standard)
    'Compound': 'Word Problems',
    'Compound Growth': 'Percents & Ratios',
    'Financial Analysis': 'Word Problems',
    'Human Resources': 'Word Problems',
    'Logical Deduction': 'Inference',
  };

  // Canonical GMAT Focus 2026 topic list (official, shown first in filter)
  // Official GMAT Focus 2026 topics only (no Geometry, no SC)
  const GMAT_FOCUS_TOPICS = new Set([
    // Quant (Geometry removed in GMAT Focus 2026; Coordinate Geometry stays)
    'Number Properties', 'Fractions & Decimals', 'Algebra', 'Functions', 'Inequalities',
    'Exponents & Roots', 'Percents & Ratios', 'Word Problems', 'Statistics & Probability',
    'Coordinate Geometry',
    // Verbal — CR (SC removed in GMAT Focus 2026; Verbal = CR + RC only)
    'Strengthen', 'Weaken', 'Assumption', 'Inference', 'Evaluate', 'Flaw', 'Bold-Face',
    'Main Point', 'Explain the Discrepancy',
    // Verbal — RC
    'Main Idea (RC)', 'Detail (RC)', 'Author Tone (RC)', 'Author Purpose (RC)',
    // DI
    'Two-Part Analysis', 'Table Analysis', 'Graphics Interpretation',
    'Multi-Source Reasoning', 'Data Sufficiency (DI)',
  ]);

  // Topics and types that are "Additional Practice" (not tested in GMAT Focus 2026)
  const GMAT_ADDITIONAL_TOPICS = new Set([
    'Geometry',  // Removed from GMAT Focus 2026
    // SC topics below — SC removed from GMAT Focus 2026 Verbal
    'Subject-Verb Agreement', 'Modifiers', 'Parallelism', 'Pronouns', 'Verb Tense',
    'Comparisons', 'Idioms',
  ]);

  // Content NOT in GMAT Focus 2026 (kept for extra practice only)
  const GMAT_LEGACY_TYPES  = new Set(['SC']);
  const GMAT_LEGACY_TOPICS = new Set(['Geometry']);

  function canonicalTopic(raw) {
    return TOPIC_CANONICAL[raw] || raw;
  }

  // Achievement definitions
  const ACHIEVEMENTS = {
    first_blood:    { icon: '🩸',  title: 'First Blood',    desc: 'First correct answer' },
    hot_streak:     { icon: '🔥',  title: 'Hot Streak',     desc: '5 correct in a row' },
    perfectionist:  { icon: '💎',  title: 'Perfectionist',  desc: '10 correct in a row' },
    speed_demon:    { icon: '⚡',  title: 'Speed Demon',    desc: 'Correct under 30s' },
    bookworm:       { icon: '📚',  title: 'Bookworm',       desc: 'Opened theory 5 times' },
    century:        { icon: '💯',  title: 'Century',        desc: 'Answered 100 questions' },
    marathoner:     { icon: '🏃',  title: 'Marathoner',     desc: '7-day streak' },
    // master_of_<topic> dynamically added
  };

  // ─── State ───────────────────────────────────────
  const state = {
    bank: (window.GMAT_QUESTIONS || []).map(q => Object.assign({}, q, { section: q.section || 'Quant' })),
    passages: {},
    progress: {},
    attempts: [],
    session: { correct: 0, wrong: 0, skipped: 0, totalTimeSec: 0, count: 0, xpEarned: 0, sinceSummary: 0, startScore: null },
    current: null,
    selectedChoice: null,
    submitted: false,
    qStartTs: null,
    qTimerTick: null,
    filters: { section: 'all', type: 'all', topic: 'all', difficulty: 'all', mode: 'random' },
    flagged: new Set(),
    bookmarks: new Set(),
    annotations: {},
    theme: 'light',
    today: dateKey(new Date()),
    daily: {},

    // ── Gamification ─────────────────────────────
    xp: 0,
    level: 1,
    hearts: MAX_HEARTS,
    maxHearts: MAX_HEARTS,
    lastHeartRegen: null,
    streakCorrect: 0,         // current consecutive-correct counter
    bestStreakCorrect: 0,
    achievements: new Set(),  // unlocked achievement ids
    theoryOpens: 0,           // for Bookworm achievement
    soundOn: true,
    dailyGoalCelebratedFor: null, // YYYY-MM-DD already celebrated
    streakBonusMilestones: {},   // { 'YYYY-MM-DD': Set of milestones already awarded }
    practiceMode: false,      // bypass hearts when out

    // ── Adaptive mode state ──────────────────────
    adaptiveHistory: [],      // last N booleans (correct/wrong) for adaptive bias
    adaptiveLevel: 'medium',  // 'easy' | 'medium' | 'hard' — active bias

    // ── Personal records ─────────────────────────
    fastestCorrectSec: null,  // best time on a correct answer
    bestSessionAcc: null,     // 0..100 best session accuracy
    mostXpInDay: 0,           // peak daily XP

    // ── User-configurable settings ───────────────
    settings: Object.assign({}, DEFAULTS),

    // ── UI state ─────────────────────────────────
    reviewSubtab: 'attempts',

    // ── Score history ─────────────────────────────────
    scoreHistory: [],           // [{ ts, score, attempts }] snapshots every 5 answers

    // ── Exam simulation ───────────────────────────
    examMode: false,            // currently in exam simulation?
    examQueue: [],              // question IDs for this simulation
    examIndex: 0,               // current position in queue
    examStartTs: null,          // when simulation started
    examResults: [],            // { qid, wasCorrect, timeSec } per question
  };

  // Settings convenience getters
  const getDailyGoal      = () => state.settings.dailyGoal      || DEFAULTS.dailyGoal;
  const getHeartRegenMs   = () => (state.settings.heartRegenMin || DEFAULTS.heartRegenMin) * 60 * 1000;
  const getWarnThreshold  = () => state.settings.warnThresholdSec || DEFAULTS.warnThresholdSec;
  const isHardMode        = () => !!state.settings.hardMode;

  // ─── DOM refs ────────────────────────────────────
  const $ = id => document.getElementById(id);
  const dom = {};

  document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    buildPassageLookup();
    load();
    regenerateHearts();
    populateTopicFilter();
    bindEvents();
    applyTheme();
    applySoundUi();
    document.body.classList.toggle('hard-mode', isHardMode());
    renderHearts();
    renderXpBar();
    renderLevelBadge();
    renderDailyGoal();
    renderLessonProgress();
    renderHeader();
    renderSession();
    renderDashboard();
    renderReview();
    nextQuestion();
    updateBankSummary();
    initDailyTip();
    initExamCountdown();
    initQuickFilterChips();
    renderFocusNudge();
    window._gmatSetPracticeMode = (val) => { state.practiceMode = !!val; };
    window._gmatResetSummary = () => { state.session.sinceSummary = 0; };
    window._gmatSubmit = () => submitAnswer();
    window._gmatDebugState = () => ({ selectedChoice: state.selectedChoice, submitted: state.submitted, practiceMode: state.practiceMode, sinceSummary: state.session.sinceSummary });
  });

  function cacheDom() {
    [
      'bank-summary', 'hdr-accuracy', 'hdr-today', 'hdr-streak', 'theme-toggle',
      'sound-toggle',
      'hdr-level', 'level-badge',
      'xp-bar-fill', 'xp-bar-text',
      'hearts-display',
      'daily-goal-ring', 'goal-ring-arc', 'daily-goal-text',
      'filter-section', 'filter-type', 'filter-topic', 'filter-difficulty', 'filter-mode',
      'rc-passage-panel', 'rc-passage-text', 'rc-passage-toggle', 'rc-passage-header',
      'rc-passage-source', 'rc-passage-meta', 'rc-passage-counter',
      'q-cr-pill',
      'dash-verbal-section', 'dash-verbal-bars',
      'btn-restart', 'btn-exam-mode', 'daily-tip-text', 'btn-tip-next', 'daily-tip-card',
      'btn-formula-sheet', 'formula-modal', 'formula-close',
      'exam-modal', 'exam-modal-close', 'exam-section', 'exam-count', 'exam-difficulty',
      'exam-time-preview', 'btn-start-exam', 'btn-di-warmup',
      'exam-results-modal', 'exam-results-grid', 'exam-results-close', 'exam-results-trophy',
      'q-type', 'q-topic', 'q-difficulty', 'q-id',
      'q-timer', 'q-timer-value',
      'qcard-timer-bar', 'qcard-timer-bar-fill',
      'q-question', 'q-choices',
      'btn-skip', 'btn-submit', 'btn-next',
      'btn-flag', 'btn-bookmark', 'btn-annotation',
      'annotation-row', 'annotation-display', 'annotation-input-area',
      'annotation-textarea', 'annotation-cancel', 'annotation-save',
      'btn-theory-meta',
      'btn-hint', 'hint-panel', 'hint-text',
      'feedback-answer', 'feedback-explanation',
      'feedback-inline', 'feedback-inline-label',
      'btn-theory', 'btn-retry-same', 'btn-retry-harder', 'btn-retry-easier',
      'confidence-tag-row', 'ctag-sure', 'ctag-unsure', 'ctag-guessed',
      'ss-correct', 'ss-wrong', 'ss-skipped', 'ss-accuracy', 'ss-avg-time',
      'dash-total', 'dash-coverage', 'dash-accuracy', 'dash-streak', 'dash-avg-time',
      'dash-topic-bars', 'dash-difficulty-bars',
      'dash-mastery-grid', 'dash-records-row', 'btn-start-sr-review',
      'btn-export-progress', 'export-preview',
      'q-adaptive', 'q-legacy',
      'dash-sr-due', 'dash-sr-total',
      'btn-reset-progress',
      'review-filter', 'review-list',
      'review-attempts', 'review-stats', 'review-errors', 'review-patterns', 'review-badges', 'review-mastery', 'review-bookmarks',
      'topic-perf-body', 'topic-perf-empty',
      'hardest-list', 'fastest-card',
      'set-daily-goal', 'set-daily-goal-val', 'set-heart-regen',
      'set-sound', 'set-warn-threshold', 'set-hard-mode',
      'btn-reset-progress-2',
      'help-btn', 'help-modal', 'help-close', 'help-dismiss',
      'theory-modal', 'theory-close', 'theory-dismiss',
      'theory-icon', 'theory-title', 'theory-summary', 'theory-facts',
      'example-problem', 'example-steps', 'example-answer',
      'traps-list', 'steps-list',
      'theory-practice-same',
      'combo-badge', 'combo-count',
      'toast-container',
      'hearts-modal', 'hearts-regen-msg', 'hearts-practice-mode', 'hearts-refill',
      'levelup-overlay', 'levelup-level',
      'summary-modal', 'summary-trophy', 'summary-title', 'summary-message',
      'summary-xp', 'summary-acc', 'summary-avgtime', 'summary-continue',
      'gmat-score-value',
      'score-total', 'score-quant', 'score-verbal', 'score-di',
      'score-quant-bar', 'score-verbal-bar', 'score-di-bar', 'score-predictor-note',
      'plan-current-score', 'plan-q-score', 'plan-v-score', 'plan-di-score',
      'plan-q-bar', 'plan-v-bar', 'plan-di-bar', 'plan-weeks', 'plan-daily',
    ].forEach(id => { dom[id] = $(id); });
  }

  // ─── Persistence ─────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      state.progress = (data.progress && typeof data.progress === 'object') ? data.progress : {};
      state.attempts = Array.isArray(data.attempts) ? data.attempts : [];
      state.daily    = (data.daily && typeof data.daily === 'object') ? data.daily : {};
      state.theme    = (data.theme === 'light' || data.theme === 'dark') ? data.theme : 'light';
      state.flagged    = new Set(Array.isArray(data.flagged)   ? data.flagged   : []);
      state.bookmarks  = new Set(Array.isArray(data.bookmarks) ? data.bookmarks : []);
      state.annotations = (data.annotations && typeof data.annotations === 'object') ? data.annotations : {};
      if (data.filters && typeof data.filters === 'object') {
        state.filters = Object.assign(state.filters, data.filters);
      }
      // Validate filter values
      const ALLOWED_SECTIONS = ['all', 'Quant', 'Verbal', 'Data Insights'];
      const ALLOWED_TYPES = ['all', 'PS', 'DS', 'CR', 'SC', 'RC', 'TPA', 'MSR', 'TA', 'GI'];
      const ALLOWED_DIFFS = ['all', 'easy', 'medium', 'hard'];
      const ALLOWED_MODES = ['random', 'weak', 'missed', 'unseen', 'flagged', 'adaptive', 'challenge', 'recent_wrong', 'bookmarked'];
      if (!ALLOWED_SECTIONS.includes(state.filters.section)) state.filters.section = 'all';
      if (!ALLOWED_TYPES.includes(state.filters.type)) state.filters.type = 'all';
      if (!ALLOWED_DIFFS.includes(state.filters.difficulty)) state.filters.difficulty = 'all';
      if (!ALLOWED_MODES.includes(state.filters.mode)) state.filters.mode = 'random';
      const validTopics = new Set(['all', ...state.bank.map(q => q.topic), ...state.bank.map(q => canonicalTopic(q.topic))]);
      if (!validTopics.has(state.filters.topic)) state.filters.topic = 'all';

      // Gamification fields with safe fallbacks
      state.xp                = (typeof data.xp === 'number' && data.xp >= 0) ? data.xp : 0;
      state.level             = (typeof data.level === 'number' && data.level >= 1) ? data.level : levelFromXp(state.xp);
      state.hearts            = (typeof data.hearts === 'number') ? Math.max(0, Math.min(MAX_HEARTS, data.hearts)) : MAX_HEARTS;
      state.maxHearts         = MAX_HEARTS;
      state.lastHeartRegen    = (typeof data.lastHeartRegen === 'number') ? data.lastHeartRegen : null;
      state.bestStreakCorrect = (typeof data.bestStreakCorrect === 'number') ? data.bestStreakCorrect : 0;
      state.achievements      = new Set(Array.isArray(data.achievements) ? data.achievements : []);
      state.theoryOpens       = (typeof data.theoryOpens === 'number') ? data.theoryOpens : 0;
      state.soundOn           = (typeof data.soundOn === 'boolean') ? data.soundOn : true;
      state.dailyGoalCelebratedFor = typeof data.dailyGoalCelebratedFor === 'string' ? data.dailyGoalCelebratedFor : null;
      state.streakBonusMilestones  = (data.streakBonusMilestones && typeof data.streakBonusMilestones === 'object') ? data.streakBonusMilestones : {};
      // Adaptive
      state.adaptiveHistory = Array.isArray(data.adaptiveHistory) ? data.adaptiveHistory.slice(-10).map(Boolean) : [];
      state.adaptiveLevel   = ['easy','medium','hard'].includes(data.adaptiveLevel) ? data.adaptiveLevel : 'medium';
      // Personal records
      state.fastestCorrectSec = (typeof data.fastestCorrectSec === 'number' && data.fastestCorrectSec >= 0) ? data.fastestCorrectSec : null;
      state.bestSessionAcc    = (typeof data.bestSessionAcc === 'number') ? data.bestSessionAcc : null;
      state.mostXpInDay       = (typeof data.mostXpInDay === 'number') ? data.mostXpInDay : 0;
      // Score history
      state.scoreHistory = Array.isArray(data.scoreHistory) ? data.scoreHistory.slice(-50) : [];
      // Settings
      const s = data.settings || {};
      state.settings = {
        dailyGoal:        [5, 10, 15, 20, 25].includes(s.dailyGoal) ? s.dailyGoal : DEFAULTS.dailyGoal,
        heartRegenMin:    [15, 30, 60].includes(s.heartRegenMin)    ? s.heartRegenMin : DEFAULTS.heartRegenMin,
        warnThresholdSec: [60, 90, 120].includes(s.warnThresholdSec)? s.warnThresholdSec : DEFAULTS.warnThresholdSec,
        hardMode:         !!s.hardMode,
      };
      // Re-derive level from xp in case threshold logic changed
      state.level = Math.max(state.level, levelFromXp(state.xp));
    } catch (e) {
      console.warn('Failed to load saved state — starting fresh:', e);
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
    }
  }

  function save() {
    const payload = {
      progress: state.progress,
      attempts: state.attempts.slice(0, 500),
      daily:    state.daily,
      theme:    state.theme,
      filters:  state.filters,
      flagged:    [...state.flagged],
      bookmarks:  [...state.bookmarks],
      annotations: state.annotations,
      xp:       state.xp,
      level:    state.level,
      hearts:   state.hearts,
      lastHeartRegen: state.lastHeartRegen,
      bestStreakCorrect: state.bestStreakCorrect,
      achievements: [...state.achievements],
      theoryOpens: state.theoryOpens,
      soundOn:   state.soundOn,
      dailyGoalCelebratedFor: state.dailyGoalCelebratedFor,
      streakBonusMilestones: state.streakBonusMilestones,
      adaptiveHistory: state.adaptiveHistory.slice(-10),
      adaptiveLevel: state.adaptiveLevel,
      fastestCorrectSec: state.fastestCorrectSec,
      bestSessionAcc: state.bestSessionAcc,
      mostXpInDay: state.mostXpInDay,
      settings: state.settings,
      scoreHistory: state.scoreHistory.slice(-50),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to save state, attempting trim:', e);
      try {
        payload.attempts = state.attempts.slice(0, 100);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (e2) {
        console.warn('Save still failed after trim:', e2);
      }
    }
  }

  // ─── Helpers ─────────────────────────────────────
  function dateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function fmtTime(sec) {
    if (sec == null || isNaN(sec)) return '—';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2,'0')}`;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getProgress(qid) {
    let p = state.progress[qid];
    if (!p || typeof p !== 'object') {
      p = state.progress[qid] = {
        attempts: 0, correct: 0, wrong: 0, skipped: 0,
        lastSeen: null, srBox: 0, srNextDue: null, lastTimeSec: null
      };
      return p;
    }
    if (typeof p.attempts !== 'number') p.attempts = 0;
    if (typeof p.correct  !== 'number') p.correct  = 0;
    if (typeof p.wrong    !== 'number') p.wrong    = 0;
    if (typeof p.skipped  !== 'number') p.skipped  = 0;
    if (typeof p.srBox    !== 'number') p.srBox    = 0;
    return p;
  }

  // ─── RC passage lookup ───────────────────────────
  function buildPassageLookup() {
    state.passages = {};
    state.bank.forEach(q => {
      if (q.type === 'RC' && q.passageId && q.passage) {
        if (!state.passages[q.passageId]) {
          state.passages[q.passageId] = q.passage;
        }
      }
    });
  }

  function getPassageFor(q) {
    if (!q || q.type !== 'RC') return null;
    if (q.passage) return q.passage;
    if (q.passageId && state.passages[q.passageId]) return state.passages[q.passageId];
    return null;
  }

  // ─── Filtering & question selection ──────────────
  function populateTopicFilter() {
    const sel = dom['filter-topic'];
    if (!sel) return;
    // Build canonical topic set from bank
    const rawTopics = new Set(state.bank.map(q => q.topic));
    const canonSet = new Set([...rawTopics].map(canonicalTopic));
    const official = [...canonSet].filter(t => GMAT_FOCUS_TOPICS.has(t)).sort();
    const additional = [...canonSet].filter(t => !GMAT_FOCUS_TOPICS.has(t)).sort();
    sel.innerHTML = '<option value="all">All topics</option>';
    if (official.length > 0) {
      const grp = document.createElement('optgroup');
      grp.label = '— GMAT Focus 2026 —';
      official.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t; opt.textContent = t;
        grp.appendChild(opt);
      });
      sel.appendChild(grp);
    }
    if (additional.length > 0) {
      const grp = document.createElement('optgroup');
      grp.label = '— Additional Practice (not in GMAT Focus 2026) —';
      additional.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t; opt.textContent = t;
        grp.appendChild(opt);
      });
      sel.appendChild(grp);
    }
    // Try to match current filter topic via canonical
    const curCanon = canonicalTopic(state.filters.topic);
    const opts = [...sel.options].map(o => o.value);
    sel.value = opts.includes(curCanon) ? curCanon : 'all';
    if (dom['filter-section']) dom['filter-section'].value = state.filters.section;
    dom['filter-type'].value = state.filters.type;
    dom['filter-difficulty'].value = state.filters.difficulty;
    dom['filter-mode'].value = state.filters.mode;
  }

  function eligible() {
    const f = state.filters;
    return state.bank.filter(q => {
      if (f.section && f.section !== 'all' && q.section !== f.section) return false;
      if (f.type !== 'all' && q.type !== f.type) return false;
      if (f.topic !== 'all' && canonicalTopic(q.topic) !== f.topic) return false;
      if (f.difficulty !== 'all' && q.difficulty !== f.difficulty) return false;
      // When filtering by section (not 'all'), skip GMAT Focus 2026 legacy content
      // (SC is not in GMAT Focus 2026 Verbal; pure Geometry not in GMAT Focus 2026 Quant)
      // Users can still access legacy content via type filter or topic='all' + no section filter
      if (f.type === 'all' && f.section !== 'all') {
        if (f.section === 'Verbal' && GMAT_LEGACY_TYPES.has(q.type)) return false;
        if (f.section === 'Quant' && GMAT_LEGACY_TOPICS.has(canonicalTopic(q.topic))) return false;
      }
      return true;
    });
  }

  function pickNext() {
    const pool = eligible();
    if (pool.length === 0) return null;
    const mode = state.filters.mode;

    if (mode === 'weak') {
      const weak = pool.filter(q => (state.progress[q.id]?.wrong || 0) > 0);
      if (weak.length > 0) {
        weak.sort((a, b) => (state.progress[b.id]?.wrong || 0) - (state.progress[a.id]?.wrong || 0));
        return weak[Math.floor(Math.random() * Math.min(weak.length, 5))];
      }
    }
    if (mode === 'missed') {
      const now = Date.now();
      const due = pool.filter(q => {
        const p = state.progress[q.id];
        return p && p.srNextDue && p.srNextDue <= now;
      });
      if (due.length > 0) return due[Math.floor(Math.random() * due.length)];
      const fallback = pool.filter(q => (state.progress[q.id]?.wrong || 0) > 0);
      if (fallback.length > 0) return fallback[Math.floor(Math.random() * fallback.length)];
    }
    if (mode === 'unseen') {
      const unseen = pool.filter(q => !state.progress[q.id] || state.progress[q.id].attempts === 0);
      if (unseen.length > 0) return unseen[Math.floor(Math.random() * unseen.length)];
    }
    if (mode === 'flagged') {
      const flagged = pool.filter(q => state.flagged.has(q.id));
      if (flagged.length > 0) return flagged[Math.floor(Math.random() * flagged.length)];
    }
    if (mode === 'bookmarked') {
      const bm = pool.filter(q => state.bookmarks.has(q.id));
      if (bm.length > 0) return bm[Math.floor(Math.random() * bm.length)];
    }
    if (mode === 'recent_wrong') {
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const recentWrongIds = new Set(
        state.attempts
          .filter(a => !a.wasCorrect && a.kind !== 'skipped' && a.ts >= sevenDaysAgo)
          .map(a => a.qid)
      );
      const recentWrong = pool.filter(q => recentWrongIds.has(q.id));
      if (recentWrong.length > 0) return recentWrong[Math.floor(Math.random() * recentWrong.length)];
      // Fallback to weak areas
      const fallback = pool.filter(q => (state.progress[q.id]?.wrong || 0) > 0);
      if (fallback.length > 0) return fallback[Math.floor(Math.random() * fallback.length)];
    }
    if (mode === 'adaptive') {
      return pickNextAdaptive(pool);
    }

    const lastId = state.current?.id;
    let candidates = pool.filter(q => q.id !== lastId);
    if (candidates.length === 0) candidates = pool;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // ─── Adaptive mode ──────────────────────────────
  function computeAdaptiveLevel() {
    // Look at last 5 entries; default to 'medium'
    const last5 = state.adaptiveHistory.slice(-5);
    if (last5.length < 3) return 'medium';
    const correct = last5.filter(Boolean).length;
    const acc = correct / last5.length;
    if (acc > 0.75) return 'hard';
    if (acc < 0.40) return 'easy';
    return 'medium';
  }

  function pickNextAdaptive(pool) {
    const lvl = computeAdaptiveLevel();
    state.adaptiveLevel = lvl;
    const lastId = state.current?.id;
    // Bias toward target difficulty, fallback to neighbours, then anything
    const targets = (function() {
      if (lvl === 'hard')   return ['hard', 'medium', 'easy'];
      if (lvl === 'easy')   return ['easy', 'medium', 'hard'];
      return ['medium', 'easy', 'hard'];
    })();
    for (const t of targets) {
      const candidates = pool.filter(q => q.difficulty === t && q.id !== lastId);
      if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
      }
    }
    let fallback = pool.filter(q => q.id !== lastId);
    if (fallback.length === 0) fallback = pool;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  function renderAdaptiveBadge() {
    const badge = dom['q-adaptive'];
    if (!badge) return;
    if (state.filters.mode === 'adaptive') {
      const lvl = state.adaptiveLevel || 'medium';
      const label = lvl.charAt(0).toUpperCase() + lvl.slice(1);
      badge.textContent = `📈 Adaptive: ${label}`;
      badge.dataset.level = lvl;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }
  }

  // ─── Hearts ─────────────────────────────────────
  function regenerateHearts() {
    if (state.hearts >= MAX_HEARTS) {
      state.lastHeartRegen = null;
      return;
    }
    const now = Date.now();
    if (!state.lastHeartRegen) {
      state.lastHeartRegen = now;
      return;
    }
    const elapsed = now - state.lastHeartRegen;
    const regenMs = getHeartRegenMs();
    if (elapsed >= regenMs) {
      const earned = Math.floor(elapsed / regenMs);
      state.hearts = Math.min(MAX_HEARTS, state.hearts + earned);
      state.lastHeartRegen = state.hearts >= MAX_HEARTS ? null : now;
      save();
    }
  }

  function loseHeart() {
    if (state.practiceMode) return; // don't deduct in practice mode
    if (state.hearts > 0) {
      state.hearts--;
      if (state.hearts < MAX_HEARTS && !state.lastHeartRegen) {
        state.lastHeartRegen = Date.now();
      }
      // Animate the heart that just broke
      const display = dom['hearts-display'];
      if (display) {
        const idx = state.hearts; // 0..MAX_HEARTS-1
        const breakingHeart = display.children[idx];
        if (breakingHeart) {
          breakingHeart.classList.add('breaking');
          setTimeout(() => renderHearts(), 600);
        } else {
          renderHearts();
        }
      }
    }
    if (state.hearts === 0 && !state.practiceMode) {
      // Show out-of-hearts modal after a tiny delay so the user sees the last heart break
      setTimeout(() => showHeartsModal(), 700);
    }
  }

  function renderHearts() {
    const display = dom['hearts-display'];
    if (!display) return;
    display.innerHTML = '';
    for (let i = 0; i < MAX_HEARTS; i++) {
      const span = document.createElement('span');
      span.className = 'heart-icon' + (i >= state.hearts ? ' empty' : '');
      span.textContent = i < state.hearts ? '❤️' : '🤍';
      display.appendChild(span);
    }
  }

  function showHeartsModal() {
    if (state.examMode) return; // bypass hearts during exam simulation
    if (!dom['hearts-modal']) return;
    updateHeartsRegenMessage();
    dom['hearts-modal'].hidden = false;
    document.body.classList.add('modal-open');
  }
  function closeHeartsModal() {
    dom['hearts-modal'].hidden = true;
    document.body.classList.remove('modal-open');
  }
  function updateHeartsRegenMessage() {
    if (!dom['hearts-regen-msg']) return;
    if (state.hearts >= MAX_HEARTS) {
      dom['hearts-regen-msg'].textContent = 'All hearts full!';
      return;
    }
    const next = state.lastHeartRegen ? state.lastHeartRegen + getHeartRegenMs() - Date.now() : getHeartRegenMs();
    const mins = Math.max(0, Math.ceil(next / 60000));
    dom['hearts-regen-msg'].textContent = `Next heart in ~${mins} minute${mins === 1 ? '' : 's'}`;
  }

  // ─── XP & Level ─────────────────────────────────
  function awardXp(amount) {
    if (!amount) return;
    const before = state.level;
    state.xp += amount;
    state.session.xpEarned += amount;
    const after = levelFromXp(state.xp);
    if (after > before) {
      state.level = after;
      showLevelUp(after);
      playSound('levelup');
    } else {
      state.level = after;
    }
    renderXpBar();
    renderLevelBadge();
  }

  function renderXpBar() {
    const cur = xpForLevel(state.level);
    const next = xpForLevel(state.level + 1);
    const span = next - cur;
    const into = state.xp - cur;
    const pct = span > 0 ? Math.max(0, Math.min(100, (into / span) * 100)) : 100;
    if (dom['xp-bar-fill']) dom['xp-bar-fill'].style.width = pct + '%';
    if (dom['xp-bar-text']) dom['xp-bar-text'].textContent = `${into} / ${span} XP`;
  }

  function renderLevelBadge() {
    if (dom['hdr-level']) dom['hdr-level'].textContent = state.level;
  }

  function showLevelUp(newLevel) {
    if (state.examMode) return; // no interruptions during exam
    document.dispatchEvent(new CustomEvent('quill:levelup'));
    const ov = dom['levelup-overlay'];
    if (!ov) return;
    if (dom['levelup-level']) dom['levelup-level'].textContent = newLevel;
    ov.hidden = false;
    spawnConfetti(60);
    setTimeout(() => { ov.hidden = true; }, 2400);
  }

  // ─── Daily Goal ─────────────────────────────────
  function todayCount() {
    return state.daily[state.today]?.count || 0;
  }

  function renderDailyGoal() {
    const goal = getDailyGoal();
    const count = todayCount();
    const ratio = Math.min(1, count / goal);
    if (dom['goal-ring-arc']) {
      const dashLen = 100; // approx 2πr where r=15.9 → ~100
      dom['goal-ring-arc'].setAttribute('stroke-dasharray', `${dashLen},${dashLen}`);
      dom['goal-ring-arc'].setAttribute('stroke-dashoffset', String(dashLen * (1 - ratio)));
    }
    if (dom['daily-goal-text']) dom['daily-goal-text'].textContent = `${Math.min(count, goal)}/${goal}`;
    if (dom['daily-goal-ring']) {
      dom['daily-goal-ring'].classList.toggle('complete', count >= goal);
      dom['daily-goal-ring'].title = `Daily goal: ${goal} questions`;
    }
  }

  function checkDailyGoal() {
    const goal = getDailyGoal();
    const count = todayCount();
    if (count >= goal && state.dailyGoalCelebratedFor !== state.today) {
      state.dailyGoalCelebratedFor = state.today;
      showToast({ icon: '🏆', label: 'Daily Goal', title: 'Daily Goal Complete!', desc: `You hit ${goal} questions today.`, kind: 'goal' });
      spawnConfetti(50);
      playSound('achievement');
      document.dispatchEvent(new CustomEvent('quill:goal'));
      save();
    }
  }

  // ─── Daily Streak Bonus XP ───────────────────────
  function checkStreakBonus() {
    const count = todayCount();
    const milestones = [5, 10, 15, 20];
    if (!state.streakBonusMilestones[state.today]) {
      state.streakBonusMilestones[state.today] = [];
    }
    const awarded = state.streakBonusMilestones[state.today];
    milestones.forEach(m => {
      if (count >= m && !awarded.includes(m)) {
        awarded.push(m);
        awardXp(50);
        showToast({ icon: '🔥', label: 'Streak Bonus!', title: `${m} Questions Today!`, desc: '+50 XP bonus earned.', kind: 'goal' });
        playSound('achievement');
        save();
      }
    });
  }

  // ─── Achievements ───────────────────────────────
  function unlock(id, def) {
    if (state.achievements.has(id)) return;
    state.achievements.add(id);
    const a = def || ACHIEVEMENTS[id];
    if (!a) return;
    showToast({ icon: a.icon, label: 'Achievement Unlocked', title: a.title, desc: a.desc });
    playSound('achievement');
    save();
  }

  function checkAchievements({ wasCorrect, timeSec, q }) {
    if (wasCorrect) unlock('first_blood');
    if (state.streakCorrect >= 5) unlock('hot_streak');
    if (state.streakCorrect >= 10) unlock('perfectionist');
    if (wasCorrect && timeSec != null && timeSec < SPEED_DEMON_SEC) unlock('speed_demon');
    if (state.theoryOpens >= 5) unlock('bookworm');
    const totalAttempts = Object.values(state.progress).reduce((s, p) => s + (p.attempts || 0), 0);
    if (totalAttempts >= 100) unlock('century');
    if (computeStreak() >= 7) unlock('marathoner');
    // Progress milestones — toast only (not stored in achievements set)
    const milestones = [
      { n: 10,  msg: "10 questions answered! You're building momentum." },
      { n: 25,  msg: "25 questions! Strong start to your GMAT prep." },
      { n: 50,  msg: "50 questions answered! Halfway to your first century." },
      { n: 100, msg: "100 questions! 💯 You're serious about this." },
      { n: 250, msg: "250 questions! You're in the top 10% of dedicated learners." },
      { n: 500, msg: "500 questions! Expert-level dedication — your score will show it." },
    ];
    milestones.forEach(({ n, msg }) => {
      const key = 'milestone_' + n;
      if (totalAttempts === n && !state.achievements.has(key)) {
        state.achievements.add(key);
        showToast({ icon: '🎯', label: 'Milestone Reached!', title: `${n} Questions`, desc: msg, kind: 'goal' });
      }
    });

    // Personal Best — fastest correct answer
    if (wasCorrect && timeSec != null && timeSec > 0) {
      const pb = state.fastestCorrectSec;
      if (pb === null || timeSec < pb) {
        state.fastestCorrectSec = timeSec;
        if (pb !== null && pb - timeSec >= 5) { // only toast if meaningfully faster
          showToast({ icon: '⚡', label: 'Personal Best!', title: `Fastest correct: ${fmtTime(timeSec)}`, desc: `Broke your record of ${fmtTime(pb)}`, kind: 'goal' });
        }
      }
    }

    // Personal Best — all-time accuracy threshold crossed
    const totalAnswered = Object.values(state.progress).reduce((s, p) => s + (p.attempts || 0), 0);
    const totalCorrect  = Object.values(state.progress).reduce((s, p) => s + (p.correct  || 0), 0);
    if (totalAnswered >= 20) {
      const allTimeAcc = Math.round(totalCorrect / totalAnswered * 100);
      const ACC_MILESTONES = [60, 65, 70, 75, 80, 85, 90];
      ACC_MILESTONES.forEach(tgt => {
        const key = `acc_pb_${tgt}`;
        if (allTimeAcc >= tgt && !state.achievements.has(key)) {
          state.achievements.add(key);
          showToast({ icon: '📈', label: 'Accuracy Milestone!', title: `${tgt}% All-time Accuracy!`, desc: totalAnswered >= 50 ? `Based on ${totalAnswered} questions — that's real.` : 'Keep going to confirm the trend.', kind: 'goal' });
        }
      });
    }

    // Master of Topic — 80%+ accuracy on q.topic with 10+ attempts
    if (q && q.topic) {
      const stats = aggregateTopic(q.topic);
      if (stats.attempts >= 10 && stats.correct / stats.attempts >= 0.8) {
        const id = 'master_' + q.topic.toLowerCase().replace(/\s+/g, '_');
        if (!state.achievements.has(id)) {
          unlock(id, { icon: '👑', title: `Master of ${q.topic}`, desc: '80%+ accuracy on 10+ attempts' });
        }
      }
    }
  }

  function aggregateTopic(topic) {
    const stats = { attempts: 0, correct: 0 };
    const canon = canonicalTopic(topic);
    state.bank.forEach(q => {
      if (canonicalTopic(q.topic) !== canon) return;
      const p = state.progress[q.id];
      if (!p) return;
      stats.attempts += p.attempts || 0;
      stats.correct  += p.correct  || 0;
    });
    return stats;
  }

  function showToast({ icon, label, title, desc, kind }) {
    const cont = dom['toast-container'];
    if (!cont) return;
    const el = document.createElement('div');
    el.className = 'achievement-toast' + (kind === 'goal' ? ' goal-toast' : '');
    el.innerHTML = `
      <div class="achievement-icon">${escapeHtml(icon || '🏅')}</div>
      <div class="achievement-text">
        <div class="achievement-label">${escapeHtml(label || 'Achievement')}</div>
        <div class="achievement-title">${escapeHtml(title || '')}</div>
        ${desc ? `<div class="achievement-desc">${escapeHtml(desc)}</div>` : ''}
      </div>`;
    cont.appendChild(el);
    setTimeout(() => {
      el.classList.add('exiting');
      setTimeout(() => el.remove(), 400);
    }, 3500);
  }

  // ─── Combo counter ──────────────────────────────
  function renderCombo() {
    const badge = dom['combo-badge'];
    if (!badge) return;
    if (state.streakCorrect >= 3) {
      if (dom['combo-count']) dom['combo-count'].textContent = state.streakCorrect;
      // Replay entrance animation by removing and re-adding the [hidden] attribute,
      // which forces the CSS animation on .combo-badge to retrigger.
      badge.hidden = true;
      void badge.offsetWidth;
      badge.hidden = false;
    } else {
      badge.hidden = true;
    }
  }

  // ─── Sound (Web Audio API) ──────────────────────
  let audioCtx = null;
  function getCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { audioCtx = null; }
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }
  function tone(freq, durMs, type, volume, offsetMs) {
    if (!state.soundOn) return;
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + (offsetMs || 0) / 1000);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + (offsetMs || 0) / 1000);
    gain.gain.exponentialRampToValueAtTime(volume || 0.18, ctx.currentTime + (offsetMs || 0) / 1000 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (offsetMs || 0) / 1000 + (durMs / 1000));
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + (offsetMs || 0) / 1000);
    osc.stop(ctx.currentTime + (offsetMs || 0) / 1000 + (durMs / 1000) + 0.05);
  }
  function glide(fromHz, toHz, durMs, type, volume) {
    if (!state.soundOn) return;
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(fromHz, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, toHz), ctx.currentTime + durMs / 1000);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume || 0.2, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durMs / 1000);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + durMs / 1000 + 0.05);
  }
  function playSound(name) {
    if (!state.soundOn) return;
    if (name === 'correct') {
      // Warm two-note chime: C5 then E5, soft triangle
      tone(523.25, 120, 'triangle', 0.15, 0);
      tone(783.99, 180, 'triangle', 0.14, 110);
    } else if (name === 'wrong') {
      // Gentle "whoops" — soft sine dip, no harsh sawtooth
      tone(330, 80, 'sine', 0.12, 0);
      tone(220, 180, 'sine', 0.10, 70);
    } else if (name === 'levelup') {
      // Bright ascending chime: C5 E5 G5 C6
      tone(523.25, 90, 'triangle', 0.16, 0);
      tone(659.25, 90, 'triangle', 0.17, 90);
      tone(783.99, 90, 'triangle', 0.18, 180);
      tone(1046.5, 240, 'triangle', 0.20, 270);
    } else if (name === 'achievement') {
      // Celebratory sparkle: two soft high tones
      tone(880, 100, 'triangle', 0.13, 0);
      tone(1108.73, 200, 'triangle', 0.15, 90); // C#6
    } else if (name === 'skip') {
      tone(440, 100, 'sine', 0.08, 0);
    }
  }
  function applySoundUi() {
    document.documentElement.setAttribute('data-sound', state.soundOn ? 'on' : 'off');
  }
  function toggleSound() {
    state.soundOn = !state.soundOn;
    applySoundUi();
    save();
    if (state.soundOn) playSound('correct'); // little confirmation chirp
  }

  // ─── Render question ─────────────────────────────
  function nextQuestion() {
    state.submitted = false;
    state.selectedChoice = null;
    stopTimer();

    // Block if out of hearts (unless in practice mode)
    if (state.hearts <= 0 && !state.practiceMode) {
      showHeartsModal();
      return;
    }

    const q = pickNext();
    state.current = q;
    if (!q) {
      const bankEmpty = !state.bank || state.bank.length === 0;
      // Friendly empty state with mascot + quick-fix buttons
      dom['q-question'].innerHTML = '';
      const wrap = document.createElement('div');
      wrap.className = 'empty-state-rich';
      const icon = bankEmpty ? '😵' : '🦉';
      const title = bankEmpty ? 'No questions loaded' : 'No questions match your filters!';
      const msg = bankEmpty
        ? 'Check that data/questions.js loaded correctly.'
        : 'Try changing the topic or difficulty.';
      wrap.innerHTML = `
        <div class="empty-state-mascot">${icon}</div>
        <div class="empty-state-title">${escapeHtml(title)}</div>
        <div class="empty-state-msg">${escapeHtml(msg)}</div>
        ${bankEmpty ? '' : `
          <div class="empty-state-actions">
            <button class="btn btn-secondary btn-small" id="empty-show-all-topics">Show All Topics</button>
            <button class="btn btn-secondary btn-small" id="empty-show-all-diffs">Show All Difficulties</button>
            <button class="btn btn-secondary btn-small" id="empty-reset-mode">Random Mode</button>
          </div>
        `}
      `;
      dom['q-question'].appendChild(wrap);
      // Wire up
      const sat = wrap.querySelector('#empty-show-all-topics');
      if (sat) sat.addEventListener('click', () => {
        state.filters.topic = 'all';
        if (dom['filter-topic']) dom['filter-topic'].value = 'all';
        save(); nextQuestion();
      });
      const sad = wrap.querySelector('#empty-show-all-diffs');
      if (sad) sad.addEventListener('click', () => {
        state.filters.difficulty = 'all';
        if (dom['filter-difficulty']) dom['filter-difficulty'].value = 'all';
        save(); nextQuestion();
      });
      const srm = wrap.querySelector('#empty-reset-mode');
      if (srm) srm.addEventListener('click', () => {
        state.filters.mode = 'random';
        if (dom['filter-mode']) dom['filter-mode'].value = 'random';
        save(); nextQuestion();
      });

      dom['q-choices'].innerHTML = '';
      if (dom['rc-passage-panel']) dom['rc-passage-panel'].hidden = true;
      if (dom['feedback-inline']) dom['feedback-inline'].hidden = true;
      dom['btn-submit'].hidden = false;
      dom['btn-submit'].disabled = true;
      dom['btn-next'].hidden = true;
      dom['btn-skip'].disabled = true;
      dom['btn-hint'].hidden = true;
      dom['hint-panel'].hidden = true;
      dom['q-timer'].classList.remove('warn', 'over');
      dom['q-timer-value'].textContent = '0:00';
      ['q-type','q-topic','q-difficulty','q-id'].forEach(id => dom[id].textContent = '—');
      if (dom['qcard-timer-bar-fill']) dom['qcard-timer-bar-fill'].style.width = '0%';
      return;
    }

    renderQuestion(q);
  }

  function onChoiceClick(idx) {
    if (state.submitted) return;
    state.selectedChoice = idx;
    [...dom['q-choices'].querySelectorAll('.choice')].forEach((el, i) => {
      el.classList.toggle('selected', i === idx);
    });
    dom['btn-submit'].disabled = false;
  }

  function submitAnswer() {
    if (state.selectedChoice == null || state.submitted) return;
    const q = state.current;
    const pickedLetter = String.fromCharCode(65 + state.selectedChoice);
    const wasCorrect = pickedLetter === q.answer;
    const timeSec = state.qStartTs ? Math.round((Date.now() - state.qStartTs) / 1000) : null;

    state.submitted = true;
    stopTimer();

    [...dom['q-choices'].querySelectorAll('.choice')].forEach((el, i) => {
      const letter = String.fromCharCode(65 + i);
      el.classList.add('disabled');
      if (letter === q.answer) {
        el.classList.add('correct');
        if (wasCorrect) el.classList.add('pulse-correct');
      } else if (i === state.selectedChoice) {
        el.classList.add('wrong');
        el.classList.add('flash-wrong');
      }
    });

    // Progress
    const p = getProgress(q.id);
    p.attempts++;
    p.lastSeen = Date.now();
    p.lastTimeSec = timeSec;
    if (wasCorrect) {
      p.correct++;
      // SM2 algorithm: ease 1.3–2.5, interval grows by ease factor each success
      const ease = Math.max(1.3, Math.min(2.5, (p.srEase || 2.5) + 0.1));
      const reps  = (p.srReps || 0) + 1;
      const prev  = p.srInterval || 1;
      const days  = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(prev * ease);
      p.srEase    = ease;
      p.srReps    = reps;
      p.srInterval = days;
      p.srBox      = Math.min((p.srBox || 0) + 1, SR_INTERVALS.length - 1);
      p.srNextDue  = Date.now() + days * 24 * 60 * 60 * 1000;
    } else {
      p.wrong++;
      // Reset interval on wrong, reduce ease slightly
      p.srEase     = Math.max(1.3, (p.srEase || 2.5) - 0.2);
      p.srReps     = 0;
      p.srInterval = 1;
      p.srBox      = 0;
      p.srNextDue  = Date.now() + 1 * 24 * 60 * 60 * 1000;
    }

    state.session.count++;
    state.session.sinceSummary++;
    state.session.totalTimeSec += timeSec || 0;
    if (wasCorrect) state.session.correct++;
    else state.session.wrong++;

    state.today = dateKey(new Date());
    const dk = state.today;
    if (!state.daily[dk]) state.daily[dk] = { count: 0, correct: 0 };
    state.daily[dk].count++;
    if (wasCorrect) state.daily[dk].correct++;

    state.attempts.unshift({
      qid: q.id, picked: pickedLetter, wasCorrect,
      kind: wasCorrect ? 'correct' : 'wrong',
      timeSec, ts: Date.now(), confidence: null, felt: null
    });
    if (state.attempts.length > 500) state.attempts.length = 500;

    // ── Gamification updates ──
    let xpGained = 0;
    let xpMult = 1;
    if (wasCorrect) {
      state.streakCorrect++;
      if (state.streakCorrect > state.bestStreakCorrect) state.bestStreakCorrect = state.streakCorrect;
      // Combo multiplier: 3-5 → 1.5×, 6-9 → 2×, 10+ → 3×
      if      (state.streakCorrect >= 10) xpMult = 3;
      else if (state.streakCorrect >= 6)  xpMult = 2;
      else if (state.streakCorrect >= 3)  xpMult = 1.5;
      xpGained = Math.round(XP_PER_CORRECT * xpMult);
      awardXp(xpGained);
      playSound('correct');
      // Personal records
      if (timeSec != null && (state.fastestCorrectSec == null || timeSec < state.fastestCorrectSec)) {
        state.fastestCorrectSec = timeSec;
      }
    } else {
      state.streakCorrect = 0;
      loseHeart();
      playSound('wrong');
    }
    // Adaptive history
    state.adaptiveHistory.push(!!wasCorrect);
    if (state.adaptiveHistory.length > 10) state.adaptiveHistory.shift();
    // Track most XP in a day
    const dayXp = (state.daily[dk].xp = (state.daily[dk].xp || 0) + xpGained);
    if (dayXp > state.mostXpInDay) state.mostXpInDay = dayXp;
    renderCombo();
    checkAchievements({ wasCorrect, timeSec, q });

    save();
    showFeedback(q, wasCorrect, timeSec, wasCorrect ? 'correct' : 'wrong');

    // Animations
    if (wasCorrect) {
      const choices = dom['q-choices'];
      if (choices) {
        choices.classList.remove('anim-bounce-in');
        void choices.offsetWidth;
        choices.classList.add('anim-bounce-in');
      }
      const card = document.getElementById('question-card');
      if (card) {
        card.classList.remove('correct-bounce');
        void card.offsetWidth;
        card.classList.add('correct-bounce');
        setTimeout(() => card.classList.remove('correct-bounce'), 450);
      }
      const multTxt = xpMult > 1 ? ` (${xpMult}×)` : '';
      spawnXpFloat('+' + xpGained + ' XP' + multTxt);
      spawnConfetti();
      document.dispatchEvent(new CustomEvent('quill:correct', { detail: state.streakCorrect }));
      // Streak fire effect on header heart-streak when ≥ 3 in a row
      if (state.streakCorrect >= 3) {
        const hdrStreak = document.getElementById('hdr-streak');
        if (hdrStreak) {
          hdrStreak.classList.remove('streak-fire');
          void hdrStreak.offsetWidth;
          hdrStreak.classList.add('streak-fire');
          setTimeout(() => hdrStreak.classList.remove('streak-fire'), 900);
        }
      }
    } else {
      const card = document.getElementById('question-card');
      if (card) {
        card.classList.remove('anim-shake');
        void card.offsetWidth;
        card.classList.add('anim-shake');
        setTimeout(() => card.classList.remove('anim-shake'), 550);
      }
      document.dispatchEvent(new CustomEvent('quill:wrong'));
      // Heart-break animation on the hearts row
      const hearts = document.getElementById('hearts-display');
      if (hearts) {
        hearts.classList.remove('heart-break');
        void hearts.offsetWidth;
        hearts.classList.add('heart-break');
        setTimeout(() => hearts.classList.remove('heart-break'), 600);
      }
    }
    renderHearts();
    renderHeader();
    renderSession();
    renderDailyGoal();
    renderLessonProgress();

    // Snapshot score every 5 answers
    const totalAnswered = Object.values(state.progress).reduce((s, p) => s + (p.attempts || 0), 0);
    if (totalAnswered > 0 && totalAnswered % 5 === 0) {
      const snap = computeGmatScore();
      if (snap.total) {
        state.scoreHistory.push({ ts: Date.now(), score: snap.total, attempts: snap.attempts });
        if (state.scoreHistory.length > 50) state.scoreHistory.shift();
      }
    }

    renderDashboard();
    renderReview();
    checkDailyGoal();
    checkStreakBonus();
    renderFocusNudge();

    // Maybe show summary screen
    if (state.session.sinceSummary >= SUMMARY_EVERY) {
      setTimeout(() => showSessionSummary(), 800);
    }
  }

  function skipQuestion() {
    if (state.submitted) return;
    const q = state.current;
    const timeSec = state.qStartTs ? Math.round((Date.now() - state.qStartTs) / 1000) : null;

    state.submitted = true;
    stopTimer();

    [...dom['q-choices'].querySelectorAll('.choice')].forEach((el, i) => {
      const letter = String.fromCharCode(65 + i);
      el.classList.add('disabled');
      if (letter === q.answer) el.classList.add('correct');
    });

    const p = getProgress(q.id);
    p.attempts++;
    p.skipped++;
    p.lastSeen = Date.now();
    p.lastTimeSec = timeSec;
    p.srNextDue = Date.now() + 1 * 24 * 60 * 60 * 1000;

    state.session.count++;
    state.session.sinceSummary++;
    state.session.skipped++;
    state.session.totalTimeSec += timeSec || 0;

    state.today = dateKey(new Date());
    const dk = state.today;
    if (!state.daily[dk]) state.daily[dk] = { count: 0, correct: 0 };
    state.daily[dk].count++;

    state.attempts.unshift({
      qid: q.id, picked: null, wasCorrect: false, kind: 'skipped',
      timeSec, ts: Date.now(), confidence: null
    });
    if (state.attempts.length > 500) state.attempts.length = 500;

    state.streakCorrect = 0;
    awardXp(XP_PER_SKIP);
    // Track skip XP toward daily total
    state.daily[dk].xp = (state.daily[dk].xp || 0) + XP_PER_SKIP;
    if (state.daily[dk].xp > state.mostXpInDay) state.mostXpInDay = state.daily[dk].xp;
    // Adaptive: skipped counts as wrong
    state.adaptiveHistory.push(false);
    if (state.adaptiveHistory.length > 10) state.adaptiveHistory.shift();
    playSound('skip');
    renderCombo();

    save();
    showFeedback(q, false, timeSec, 'skipped');
    document.dispatchEvent(new CustomEvent('quill:skip'));
    renderHearts();
    renderHeader();
    renderSession();
    renderDailyGoal();
    renderLessonProgress();
    renderDashboard();
    renderReview();
    checkDailyGoal();
    checkStreakBonus();

    if (state.session.sinceSummary >= SUMMARY_EVERY) {
      setTimeout(() => showSessionSummary(), 600);
    }
  }

  function showFeedback(q, wasCorrect, timeSec, kind) {
    const kindClass = kind === 'skipped' ? 'skipped' : (wasCorrect ? 'correct' : 'wrong');
    const answerText = `${q.answer}) ${q.choices[q.answer.charCodeAt(0) - 65]}`;

    // ── Inline feedback (inside card) ──
    const inlineEl = dom['feedback-inline'];
    if (inlineEl) {
      inlineEl.hidden = false;
      inlineEl.className = 'feedback-inline ' + kindClass;
      const labelEl = dom['feedback-inline-label'];
      if (labelEl) {
        labelEl.textContent = wasCorrect ? '✓ Correct!' : kind === 'skipped' ? '⊘ Skipped' : '✗ Incorrect';
      }
      dom['feedback-answer'].textContent = wasCorrect ? '' : answerText;
      dom['feedback-explanation'].textContent = q.explanation || '';

      // Pace feedback
      const paceEl = document.getElementById('pace-feedback');
      if (paceEl && timeSec != null && timeSec >= 0 && q.type) {
        const target = GMAT_TARGET_SEC[q.type];
        if (target) {
          const diff = timeSec - target;
          const absDiff = Math.abs(diff);
          const diffStr = absDiff < 5 ? 'on pace' : (diff > 0 ? `+${absDiff}s over` : `${absDiff}s under`);
          const cls = diff <= -15 ? 'pace--fast' : diff <= 15 ? 'pace--ok' : 'pace--slow';
          paceEl.hidden = false;
          paceEl.className = `pace-feedback ${cls}`;
          paceEl.innerHTML = `<span class="pace-icon">${diff <= -15 ? '⚡' : diff <= 15 ? '✓' : '⏳'}</span> <span class="pace-time">${fmtTime(timeSec)}</span> <span class="pace-target">target ${fmtTime(target)} — ${escapeHtml(diffStr)}</span>`;
        } else {
          paceEl.hidden = true;
        }
      } else if (paceEl) {
        paceEl.hidden = true;
      }

      // Show theory snippet on wrong answers (prefer per-question theory)
      const snippetEl = document.getElementById('theory-snippet');
      if (snippetEl) {
        if (!wasCorrect && kind !== 'skipped' && (window.resolveTheory || window.getTheory)) {
          const theory = window.resolveTheory ? window.resolveTheory(q) : window.getTheory(q.topic, q.subtopic);
          if (theory && theory.summary) {
            snippetEl.hidden = false;
            snippetEl.innerHTML = `<span class="theory-snippet-icon">💡</span><strong>${escapeHtml(theory.title)}</strong>: ${escapeHtml(theory.summary.slice(0, 150))}${theory.summary.length > 150 ? '…' : ''}`;
          } else {
            snippetEl.hidden = true;
          }
        } else {
          snippetEl.hidden = true;
        }
      }

      const diffs = ['easy', 'medium', 'hard'];
      const curIdx = diffs.indexOf(q.difficulty);
      const hasHarder = curIdx < 2 && state.bank.some(x => x.topic === q.topic && x.difficulty === diffs[curIdx + 1]);
      const hasEasier = curIdx > 0 && state.bank.some(x => x.topic === q.topic && x.difficulty === diffs[curIdx - 1]);
      dom['btn-retry-harder'].hidden = !hasHarder;
      dom['btn-retry-easier'].hidden = wasCorrect ? !hasEasier : true;

      // Reset confidence buttons + difficulty rating
      const errorTagRow = document.getElementById('error-tag-row');
      if (kind !== 'skipped') {
        ['ctag-sure', 'ctag-unsure', 'ctag-guessed'].forEach(id => {
          if (dom[id]) dom[id].classList.remove('active');
        });
        const diffRow = document.getElementById('difficulty-rating-row');
        if (diffRow) {
          diffRow.hidden = false;
          diffRow.querySelectorAll('.diff-rate-btn').forEach(b => b.classList.remove('active'));
        }
        // Error tag only on wrong — confidence tag always hidden (reduces clutter)
        if (errorTagRow) {
          errorTagRow.hidden = (kind !== 'wrong');
          errorTagRow.querySelectorAll('.error-tag-btn').forEach(b => b.classList.remove('active'));
        }
        if (dom['confidence-tag-row']) dom['confidence-tag-row'].hidden = true;
      } else {
        const diffRow = document.getElementById('difficulty-rating-row');
        if (diffRow) diffRow.hidden = true;
        if (errorTagRow) errorTagRow.hidden = true;
        if (dom['confidence-tag-row']) dom['confidence-tag-row'].hidden = true;
      }
    }

    dom['btn-submit'].hidden = true;
    dom['btn-skip'].hidden = true;
    dom['btn-hint'].hidden = true;
    dom['hint-panel'].hidden = true;
    dom['btn-next'].hidden = false;
    renderAnnotationRow();
  }

  function setConfidence(level) {
    if (state.attempts.length === 0) return;
    state.attempts[0].confidence = level;
    save();
    ['ctag-sure', 'ctag-unsure', 'ctag-guessed'].forEach(id => {
      if (dom[id]) dom[id].classList.remove('active');
    });
    const map = { sure: 'ctag-sure', unsure: 'ctag-unsure', guessed: 'ctag-guessed' };
    if (map[level] && dom[map[level]]) dom[map[level]].classList.add('active');
  }

  function hideFeedbackBanner() {
    if (dom['feedback-inline']) dom['feedback-inline'].hidden = true;
  }

  // ─── Flag ─────────────────────────────────────────
  function toggleFlag() {
    const q = state.current;
    if (!q) return;
    if (state.flagged.has(q.id)) state.flagged.delete(q.id);
    else state.flagged.add(q.id);
    updateFlagButton();
    save();
  }

  function updateFlagButton() {
    const q = state.current;
    if (!q || !dom['btn-flag']) return;
    const flagged = state.flagged.has(q.id);
    dom['btn-flag'].classList.toggle('flagged', flagged);
    dom['btn-flag'].title = flagged ? 'Unflag this question' : 'Flag this question for review';
    dom['btn-flag'].textContent = '⚑';
  }

  // ─── Bookmark ─────────────────────────────────────
  function toggleBookmark() {
    const q = state.current;
    if (!q) return;
    if (state.bookmarks.has(q.id)) state.bookmarks.delete(q.id);
    else state.bookmarks.add(q.id);
    updateBookmarkButton();
    save();
  }

  function updateBookmarkButton() {
    const q = state.current;
    if (!q || !dom['btn-bookmark']) return;
    const saved = state.bookmarks.has(q.id);
    dom['btn-bookmark'].classList.toggle('bookmarked', saved);
    dom['btn-bookmark'].title = saved ? 'Remove bookmark [B]' : 'Bookmark this question [B]';
    dom['btn-bookmark'].textContent = saved ? '★' : '☆';
  }

  function renderBookmarkList() {
    const list = document.getElementById('bookmark-list');
    const actions = document.getElementById('bookmark-actions');
    if (!list) return;
    const ids = [...state.bookmarks];
    const questions = ids.map(id => state.bank.find(q => q.id === id)).filter(Boolean);
    if (questions.length === 0) {
      list.innerHTML = '<div class="empty-state">No bookmarks yet. Press ☆ on any question to save it.</div>';
      if (actions) actions.hidden = true;
      return;
    }
    if (actions) actions.hidden = false;
    list.innerHTML = questions.map(q => {
      const p = state.progress[q.id];
      const acc = p && p.attempts ? Math.round(p.correct / p.attempts * 100) : null;
      const accStr = acc !== null ? `${acc}% (${p.attempts} tries)` : 'Not attempted';
      return `<div class="bookmark-item">
        <div class="bookmark-item-header">
          <span class="bookmark-type-badge">${escapeHtml(q.type)}</span>
          <span class="bookmark-topic">${escapeHtml(q.topic)}</span>
          <span class="bookmark-diff diff-${q.difficulty}">${q.difficulty}</span>
          <span class="bookmark-acc">${escapeHtml(accStr)}</span>
          <button class="bookmark-remove" data-id="${q.id}" title="Remove bookmark">✕</button>
        </div>
        <p class="bookmark-question-text">${escapeHtml(q.question.slice(0, 120))}${q.question.length > 120 ? '…' : ''}</p>
        ${state.annotations[q.id] ? `<div class="bookmark-annotation">📝 ${escapeHtml(state.annotations[q.id])}</div>` : ''}
      </div>`;
    }).join('');
    list.querySelectorAll('.bookmark-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id, 10);
        state.bookmarks.delete(id);
        save();
        renderBookmarkList();
        if (state.current && state.current.id === id) updateBookmarkButton();
      });
    });
  }

  // ─── Annotations ──────────────────────────────────
  function renderAnnotationRow() {
    const q = state.current;
    if (!q || !dom['annotation-row']) return;
    const existing = state.annotations[q.id];
    dom['annotation-row'].hidden = false;
    if (dom['annotation-input-area']) dom['annotation-input-area'].hidden = true;
    if (dom['annotation-display']) {
      if (existing) {
        dom['annotation-display'].hidden = false;
        dom['annotation-display'].innerHTML = `<span class="annotation-note-icon">📝</span><span class="annotation-note-text">${escapeHtml(existing)}</span><button class="annotation-edit" id="annotation-edit">Edit</button>`;
        const editBtn = document.getElementById('annotation-edit');
        if (editBtn) editBtn.addEventListener('click', () => openAnnotationInput(existing));
      } else {
        dom['annotation-display'].hidden = true;
      }
    }
    if (dom['btn-annotation']) dom['btn-annotation'].hidden = !!existing;
  }

  function openAnnotationInput(existingText) {
    if (dom['annotation-input-area']) dom['annotation-input-area'].hidden = false;
    if (dom['btn-annotation']) dom['btn-annotation'].hidden = true;
    if (dom['annotation-display']) dom['annotation-display'].hidden = true;
    if (dom['annotation-textarea']) {
      dom['annotation-textarea'].value = existingText || '';
      dom['annotation-textarea'].focus();
    }
  }

  function saveAnnotation() {
    const q = state.current;
    if (!q) return;
    const text = dom['annotation-textarea'] ? dom['annotation-textarea'].value.trim() : '';
    if (text) state.annotations[q.id] = text;
    else delete state.annotations[q.id];
    save();
    renderAnnotationRow();
  }

  // ─── Hint ─────────────────────────────────────────
  const HINT_BANK = {
    // ── Topic-level (PS/DS) ──
    'Arithmetic': 'Break into prime factors or use order of operations. Watch for PEMDAS traps.',
    'Geometry': 'Label all given info on the figure. Look for special triangles (30-60-90, 45-45-90) and parallel-line angle pairs.',
    'Algebra': 'Isolate the variable step by step. Check if factoring simplifies faster than expanding.',
    'Statistics': 'Mean = sum/count. Median = middle value (sorted). Watch for outliers shifting the mean.',
    'Probability': 'P(event) = favorable/total. For "at least one", use 1 − P(none).',
    'Combinatorics': 'Order matters → permutation nPr = n!/(n−r)!. Order irrelevant → combination nCr = n!/r!(n−r)!.',
    'Number Theory': 'Test small cases (0, 1, −1, primes). Check "must be" vs "could be" — the former needs proof, the latter just a counterexample.',
    'Word Problems': 'Define a variable for the unknown first. Write an equation before solving. Re-read the question after solving.',

    // ── Geometry subtopics ──
    'Coordinate': 'Slope = (y₂−y₁)/(x₂−x₁). Distance = √[(x₂−x₁)²+(y₂−y₁)²]. Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2).',
    'Coordinate Geometry': 'Slope = (y₂−y₁)/(x₂−x₁). Distance = √[(x₂−x₁)²+(y₂−y₁)²]. Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2).',
    'Triangles': 'Interior angles sum to 180°. Area = ½×base×height. Pythagorean triples: 3-4-5, 5-12-13, 8-15-17.',
    'Circles': 'Area = πr². Circumference = 2πr. Arc length = (central angle/360)×2πr.',
    'Quadrilaterals': 'Rectangle: A = l×w. Parallelogram: A = base×height. Trapezoid: A = ½(b₁+b₂)×h.',
    'Volume': 'Box: l×w×h. Cylinder: πr²h. Sphere: 4/3πr³. Cone: 1/3πr²h.',
    'Angles': 'Supplementary angles sum to 180°. Vertical angles are equal. Parallel lines cut by a transversal: alternate interior angles are equal.',

    // ── Arithmetic subtopics ──
    'Percents': '"X% of Y" = (X/100)×Y. Percent change = (new−old)/old × 100.',
    'Fractions': 'To add/subtract: common denominator. To divide: multiply by reciprocal. Simplify before multiplying.',
    'Number Properties': 'Test 0, 1, −1, even, odd, prime. Divisibility rules: ÷3 (digit sum ÷3), ÷4 (last 2 digits ÷4), ÷9 (digit sum ÷9).',
    'Primes': 'Test divisibility up to √n only. 2 is the only even prime. 1 is NOT prime.',
    'LCM/GCF': 'GCF: prime factorization, take lowest powers. LCM: take highest powers. LCM × GCF = product of two numbers.',
    'Decimals': 'Align decimal points when adding/subtracting. Count total decimal places when multiplying.',
    'Ratios': 'Use a multiplier k: ratio a:b means actual values are ak and bk. Set up proportions for missing values.',

    // ── Algebra subtopics ──
    'Linear Equations': 'Isolate x step by step. Check solution by substituting back. Two equations for two unknowns.',
    'Systems': 'Substitution: solve one eq for x, substitute into other. Elimination: add/subtract equations to cancel a variable.',
    'Quadratics': 'Factor first (look for two numbers that multiply to ac and add to b). If no clean factors, use quadratic formula.',
    'Inequalities': 'Treat like an equation BUT flip the sign when multiplying or dividing by a negative.',
    'Absolute Value': '|x| = a → x = a or x = −a. |x| < a → −a < x < a. |x| > a → x < −a or x > a.',
    'Exponents': 'xᵃ × xᵇ = xᵃ⁺ᵇ. xᵃ ÷ xᵇ = xᵃ⁻ᵇ. (xᵃ)ᵇ = xᵃᵇ. x⁻ⁿ = 1/xⁿ.',
    'Roots': '√(a×b) = √a×√b. Simplify by factoring out perfect squares. √(a/b) = √a/√b.',
    'Functions': 'To evaluate f(3), replace every x with 3. For f(g(x)), evaluate the inner function first.',
    'Identities': '(a+b)² = a²+2ab+b². (a−b)² = a²−2ab+b². (a+b)(a−b) = a²−b².',
    'Word': 'Define variables clearly. Translate "is" → =, "more than" → +, "times" → ×. Write equation, then solve.',

    // ── Statistics/Probability subtopics ──
    'Mean/Median/Mode': 'Mean = sum/n. Median = middle (odd n) or avg of two middle (even n). Mode = most frequent.',
    'Standard Deviation': 'Higher SD = more spread. Adding a constant to all values shifts mean but SD unchanged. Multiplying scales both.',
    'Permutations': 'Ordered arrangements: nPr = n!/(n−r)!. "In how many ways can you arrange" → permutation.',
    'Combinations': 'Unordered selection: nCr = n!/[r!(n−r)!]. "Choose" or "select" without order → combination.',
    'Sequences': 'Arithmetic: aₙ = a₁+(n−1)d, sum = n/2×(a₁+aₙ). Geometric: aₙ = a₁×rⁿ⁻¹.',

    // ── DS strategy ──
    'DS': 'Evaluate Statement (1) ALONE → sufficient? Then Statement (2) ALONE → sufficient? Only try both together if neither alone works. Choices: A=1 alone, B=2 alone, C=both, D=either, E=neither.',

    // ── CR subtopics ──
    'Critical Reasoning': 'Identify: Premise → Conclusion → Gap. The question tells you what to do (strengthen, weaken, assume…).',
    'Strengthen': 'Add evidence that makes the conclusion more likely. The answer must connect to the gap in the argument.',
    'Weaken': 'Give a reason the conclusion might be wrong. Look for alternate explanations or attacks on the key assumption.',
    'Assumption': 'Unstated premise required for the argument. Use the Negation Test: negate each choice — if it destroys the argument, that\'s the assumption.',
    'Inference': 'Must be 100% supported by the stimulus. Avoid extremes ("always", "never"). Pick the most directly supported choice.',
    'Boldface': 'Label each bold part: premise (supports) or conclusion (main claim). Then match to the answer description.',
    'Flaw': 'Common flaws: circular reasoning, correlation ≠ causation, sampling bias, unwarranted generalization.',
    'Evaluate': 'Ask: what info would tell me if this argument is valid? The answer reveals the key variable.',
    'Paradox': 'Both facts are true. Find the answer that makes both facts compatible simultaneously.',
    'Complete': 'The blank must logically follow from the preceding logic. Treat it like a conclusion completion.',

    // ── SC subtopics ──
    'Sentence Correction': 'Read (A) to spot the error type. Eliminate all choices sharing that error. Compare survivors on a second issue.',
    'Subject-Verb Agreement': 'Strip prepositional phrases to find the true subject. Collective nouns (team, committee) take singular verbs.',
    'Parallelism': 'Items in a series must match grammatically: noun with noun, gerund with gerund, infinitive with infinitive.',
    'Modifiers': 'A modifier must sit next to what it modifies. Dangling modifier = no logical subject in the sentence.',
    'Pronoun': 'Each pronoun must refer to exactly one clear noun. Singular antecedents (each, every, anyone) → singular pronoun.',
    'Verb Tense': 'Past perfect (had done) = earlier past action. Present perfect (has done) = action with present relevance. Keep tenses consistent.',
    'Idioms': '"Distinguish X from Y" · "credit X with Y" · "consider X Y" (no "to be") · "attribute X to Y". Memorize common GMAT idiom pairs.',
    'Comparison': 'Compare like with like: compare "prices of X" to "prices of Y", not "prices of X" to "Y". Use "as X as" not "as X like".',
    'Concision': 'Eliminate redundancy ("the reason is because" → "the reason is that"). Prefer active voice. Shorter is usually better if meaning is preserved.',

    // ── DI-specific ──
    'Two-Part Analysis': 'Both selections must satisfy BOTH conditions simultaneously. Eliminate pairs that fail either. Test each row for the X condition, then Y — intersection = answer.',
    'Table Analysis': 'Sort the table mentally by the relevant column. Check whether "must be true" (every row) vs "could be true" (at least one row).',
    'Graphics Interpretation': 'Identify the chart type first (bar/line/scatter). Read axis labels and units carefully. Extrapolation = dangerous — stick to what the graph shows.',
    'Multi-Source Reasoning': 'Each tab is a separate source. Synthesize across tabs; the answer may require combining info from two. Watch for dates and source reliability.',

    // ── RC subtopics ──
    'Reading Comprehension': 'Read for structure: paragraph 1 = topic, body = support/contrast, last = conclusion. Never bring outside knowledge.',
    'Main Idea': 'Covers the WHOLE passage, not one detail. Eliminate too-narrow (one paragraph) and too-broad (beyond scope) answers.',
    'Detail': 'Return to the exact lines referenced. Paraphrase what the text says; don\'t infer beyond it.',
    'Inference': 'Directly supported, not just plausible. Avoid extreme language. If the passage says "often", the answer can\'t say "always".',
    'Tone': 'Look for evaluative adjectives and verbs. Common tones: critical, supportive, cautious, objective, skeptical, enthusiastic.',
    'Structure': 'How does paragraph 2 relate to paragraph 1? Common patterns: contrast, elaboration, example, counter-argument.',
    'Vocabulary in Context': 'The word means what makes sense in THAT sentence — not its common everyday meaning. Substitute each choice.',
  };

  // Keyword patterns for question-text fallback
  const TEXT_HINT_RULES = [
    [/slope|passes through.*\(\d|x-intercept|y-intercept|parallel line|perpendicular line|distance between.*point/i, 'Coordinate'],
    [/triangle|angle|hypotenuse|isosceles|equilateral|right angle|pythagor/i, 'Triangles'],
    [/circle|radius|diameter|circumference|arc|chord|sector/i, 'Circles'],
    [/volume|surface area|cylinder|cone|sphere|cube|rectangular solid/i, 'Volume'],
    [/rectangle|square|parallelogram|trapezoid|rhombus|quadrilateral/i, 'Quadrilaterals'],
    [/probability|at least one|exactly \d out|favorable/i, 'Probability'],
    [/how many ways|arrange|permut|combin|choose \d/i, 'Combinatorics'],
    [/mean|median|mode|average|standard deviation|range of the set/i, 'Mean/Median/Mode'],
    [/percent|% of|discount|markup|interest rate|tax/i, 'Percents'],
    [/ratio|proportion|x:y|a:b/i, 'Ratios'],
    [/rate.*time|distance.*rate|speed|mph|km\/h|travel/i, 'Distance/Rate'],
    [/work|together.*hours|pipe.*fill|rate.*job/i, 'Work Problems'],
    [/sequence|arithmetic series|geometric series|nth term/i, 'Sequences'],
    [/prime|factor|multiple|divisible|remainder|LCM|GCF/i, 'Number Properties'],
    [/\|x\||absolute value/i, 'Absolute Value'],
    [/f\(x\)|g\(x\)|function|domain|range of f/i, 'Functions'],
    [/inequality|≤|≥|greater than|less than|at most|at least.*value/i, 'Inequalities'],
    [/exponent|\^|\bsquared\b|\bcubed\b|10\^|x\^/i, 'Exponents'],
    [/√|square root|cube root/i, 'Roots'],
    [/mixture|solution|concentration|alloy/i, 'Mixtures'],
  ];

  function generateHint(q) {
    // 1. Use explicit per-question hint if author provided one
    if (q.hint && q.hint.trim()) return q.hint.trim();

    // 1b. Per-question hint table (data/question_theories.js)
    if (typeof window !== 'undefined' && window.QUESTION_THEORIES && q.id != null) {
      const entry = window.QUESTION_THEORIES[q.id];
      if (entry && entry.hint && entry.hint.trim()) return entry.hint.trim();
    }

    // 2. Extract a strategic nudge from the explanation (without revealing the answer)
    const expl = (q.explanation || '').trim();
    if (expl) {
      const hint = extractHintFromExplanation(expl, q);
      if (hint) return hint;
    }

    // 3. Fall back to topic-level hint bank
    const text  = (q.question || '').trim();
    const sub   = (q.subtopic || '').trim();
    const topic = (q.topic || '').trim();

    if (q.type === 'TPA') return HINT_BANK['Two-Part Analysis'];
    if (q.type === 'TA')  return HINT_BANK['Table Analysis'];
    if (q.type === 'GI')  return HINT_BANK['Graphics Interpretation'];
    if (q.type === 'MSR') return HINT_BANK['Multi-Source Reasoning'];
    if (q.type === 'DS')  return HINT_BANK['DS'];
    if (q.type === 'CR')  return HINT_BANK[sub] || HINT_BANK['Critical Reasoning'];
    if (q.type === 'SC')  return HINT_BANK[sub] || HINT_BANK['Sentence Correction'];
    if (q.type === 'RC')  return HINT_BANK[sub] || HINT_BANK['Reading Comprehension'];
    if (HINT_BANK[sub])   return HINT_BANK[sub];
    if (HINT_BANK[topic]) return HINT_BANK[topic];

    for (const [pattern, key] of TEXT_HINT_RULES) {
      if (pattern.test(text)) return HINT_BANK[key] || null;
    }

    return `${topic || 'GMAT'} — identify what the question asks, list knowns, pick a strategy.`;
  }

  function extractHintFromExplanation(expl, q) {
    // Strip answer-revealing content: "Answer: X", "The answer is (B)", "Only (B)", "(B) is correct"
    // Split on these boundaries and keep the STRATEGY part before them
    const stopPatterns = [
      /\bAnswer\s*:\s*[A-E]/i,
      /\bThe\s+answer\s+is\s+[\(\[A-E]/i,
      /\bOnly\s+\([A-E]\)/i,
      /\([A-E]\)\s+is\s+correct/i,
      /\([A-E]\)\s+is\s+the\s+only/i,
      /\bCorrect\s+answer\s*:\s*[A-E]/i,
    ];

    // Find where the explanation starts giving away the answer
    let cutIdx = expl.length;
    for (const pat of stopPatterns) {
      const m = expl.search(pat);
      if (m !== -1 && m < cutIdx) cutIdx = m;
    }

    // Take the pre-answer part and grab the first 1-2 meaningful sentences
    let pre = expl.slice(0, cutIdx).trim();

    // Remove "Trap:" sections at start (they give away the answer via elimination)
    pre = pre.replace(/\bTrap\b[\s\S]*$/i, '').trim();

    // Get first 1-2 sentences that give strategy without numbers/formulas
    const sentences = pre.split(/(?<=[.!?])\s+/).filter(s => s.length > 15);
    if (sentences.length === 0) return null;

    // For Quant: prefer sentences that contain approach keywords
    const strategyKeywords = /\b(define|let|set up|identify|notice|consider|think|approach|strategy|first|key|trap|check|compare|plug in|estimate|simplify|rearrange|factor)\b/i;
    const strategySentence = sentences.find(s => strategyKeywords.test(s)) || sentences[0];

    // Keep it short — max 160 chars
    return strategySentence.length > 160
      ? strategySentence.slice(0, 157) + '…'
      : strategySentence;
  }

  function showHint() {
    const q = state.current;
    if (!q || state.submitted) return;
    document.dispatchEvent(new CustomEvent('quill:hint'));
    dom['hint-text'].textContent = generateHint(q);
    dom['hint-panel'].hidden = false;
    dom['btn-hint'].disabled = true;
  }

  // ─── Theory modal ─────────────────────────────────
  function openTheoryModal(topic, subtopic, question) {
    document.dispatchEvent(new CustomEvent('quill:theory'));
    if (!window.getTheory && !window.resolveTheory) return;
    // Prefer per-question theory (q.theory merged over topic), fallback to topic
    const t = (question && window.resolveTheory)
      ? window.resolveTheory(question)
      : window.getTheory(topic, subtopic);

    // Inject question-specific explanation at top if available and already submitted
    const qExplEl = document.getElementById('theory-q-explanation');
    if (qExplEl) {
      if (question && question.explanation && state.submitted) {
        qExplEl.hidden = false;
        qExplEl.innerHTML = `<div class="theory-q-expl-label">📝 This question's explanation</div>
          <div class="theory-q-expl-body">${escapeHtml(question.explanation).replace(/\n/g, '<br>')}</div>`;
      } else {
        qExplEl.hidden = true;
      }
    }
    state.theoryOpens = (state.theoryOpens || 0) + 1;
    dom['theory-icon'].textContent = t.icon || '∑';
    dom['theory-title'].textContent = t.title;
    dom['theory-summary'].textContent = t.summary;

    dom['theory-facts'].innerHTML = '';
    (t.keyFacts || []).forEach(fact => {
      const li = document.createElement('div');
      li.className = 'theory-fact';
      li.innerHTML = `<span class="theory-fact-bullet">→</span><span>${escapeHtml(fact)}</span>`;
      dom['theory-facts'].appendChild(li);
    });

    const ex = t.example || {};
    dom['example-problem'].innerHTML = `<div class="ex-label">Problem</div><div class="ex-text">${escapeHtml(ex.problem || '')}</div>`;
    dom['example-steps'].innerHTML = '<div class="ex-label">Solution</div>' +
      (ex.steps || []).map((s, i) => `<div class="ex-step"><span class="ex-step-num">${i + 1}</span><span>${escapeHtml(s)}</span></div>`).join('');
    dom['example-answer'].innerHTML = ex.answer ? `<div class="ex-answer"><span class="ex-answer-label">Answer:</span> ${escapeHtml(ex.answer)}</div>` : '';

    dom['traps-list'].innerHTML = (t.traps || []).map(trap =>
      `<div class="trap-item"><span class="trap-icon">⚠</span><span>${escapeHtml(trap)}</span></div>`
    ).join('') || '<div class="empty-state">No specific traps noted for this topic.</div>';

    dom['steps-list'].innerHTML = (t.solveSteps || []).map(step =>
      `<div class="step-item">${escapeHtml(step)}</div>`
    ).join('');

    document.querySelectorAll('.modal-tab').forEach(b => b.classList.toggle('active', b.dataset.panel === 'concept'));
    document.querySelectorAll('.modal-panel').forEach(p => p.classList.toggle('active', p.id === 'modal-concept'));

    dom['theory-modal'].dataset.topic = topic;
    dom['theory-modal'].hidden = false;
    document.body.classList.add('modal-open');
    save();
    // Bookworm achievement check
    checkAchievements({ wasCorrect: false, timeSec: null, q: null });
  }

  function closeTheoryModal() {
    dom['theory-modal'].hidden = true;
    document.body.classList.remove('modal-open');
  }

  // ─── Retry same type ──────────────────────────────
  function retryType(targetDifficulty) {
    const q = state.current;
    if (!q) return;
    const pool = state.bank.filter(x =>
      x.topic === q.topic &&
      x.difficulty === targetDifficulty &&
      x.id !== q.id
    );
    hideFeedbackBanner();
    if (pool.length === 0) return nextQuestion();
    state.current = null;
    state.submitted = false;
    state.selectedChoice = null;
    stopTimer();
    const next = pool[Math.floor(Math.random() * pool.length)];
    state.current = next;
    renderQuestion(next);
  }

  // ─── Verbal helpers ──────────────────────────────
  // CR subtopic → coloured pill {label, klass}
  const CR_PILLS = {
    'Weaken':     { label: '🔻 Weaken',     klass: 'cr-pill-red' },
    'Strengthen': { label: '🔺 Strengthen', klass: 'cr-pill-green' },
    'Assumption': { label: '🔷 Assumption', klass: 'cr-pill-blue' },
    'Inference':  { label: '💡 Inference',  klass: 'cr-pill-yellow' },
    'Flaw':       { label: '⚠️ Flaw',       klass: 'cr-pill-orange' },
    'Evaluate':   { label: '🔍 Evaluate',   klass: 'cr-pill-purple' },
    'Bold-Face':  { label: '📋 Bold-Face',  klass: 'cr-pill-grey' },
  };

  function renderCrPill(q) {
    const pill = dom['q-cr-pill'];
    if (!pill) return;
    if (q.type === 'CR' && q.subtopic && CR_PILLS[q.subtopic]) {
      const cfg = CR_PILLS[q.subtopic];
      pill.textContent = cfg.label;
      pill.className = `badge badge-cr-pill ${cfg.klass}`;
      pill.hidden = false;
    } else {
      pill.hidden = true;
      pill.className = 'badge badge-cr-pill';
      pill.textContent = '';
    }
  }

  // DS: parse "Statement (1)" / "Statement (2)" markers and render in styled boxes.
  // Anything before the first statement marker becomes the stem.
  function renderTaQuestion(q) {
    const raw = q.question || '';
    const lines = raw.split('\n');
    let tableHtml = '';
    let preamble = [];
    let tableLines = [];
    let postamble = [];
    let inTable = false;

    lines.forEach(line => {
      if (line.includes('|')) {
        inTable = true;
        tableLines.push(line);
      } else if (inTable) {
        postamble.push(line);
      } else {
        preamble.push(line);
      }
    });

    if (tableLines.length > 0) {
      const rows = tableLines.map(line =>
        line.split('|').map(c => c.trim()).filter((_, i, a) => !(i === 0 && a[0] === '') && !(i === a.length - 1 && a[a.length - 1] === ''))
      );
      const headerRow = rows[0];
      const bodyRows = rows.slice(1);
      tableHtml = `<div class="ta-table-wrap"><table class="ta-table">
        <thead><tr>${headerRow.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
        <tbody>${bodyRows.map(r => `<tr>${r.map(c => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>`;
    }

    const pre  = preamble.join('\n').trim();
    const post = postamble.join('\n').trim();
    return `${pre ? `<p class="ta-preamble">${escapeHtml(pre).replace(/\n/g, '<br>')}</p>` : ''}
      ${tableHtml}
      ${post ? `<p class="ta-postamble">${escapeHtml(post).replace(/\n/g, '<br>')}</p>` : ''}`;
  }

  function renderDsQuestion(q) {
    const text = q.question || '';
    // Match "(1)" or "(2)" preceded by "Statement" or "statement"; tolerant whitespace.
    const re = /(Statement\s*\(\s*[12]\s*\)\s*[:\-]?\s*)/g;
    const parts = text.split(re);
    if (parts.length < 3) {
      // No statements found — fallback to plain rendered text.
      return escapeHtml(text);
    }
    let html = '';
    // parts[0] = stem text (before first statement label)
    if (parts[0] && parts[0].trim()) {
      html += `<div class="ds-stem">${escapeHtml(parts[0].trim())}</div>`;
    }
    // walk pairs: (label, body)
    for (let i = 1; i < parts.length; i += 2) {
      const labelRaw = parts[i] || '';
      const body = (parts[i + 1] || '').trim();
      const num = /\(\s*([12])\s*\)/.exec(labelRaw);
      const n = num ? num[1] : '?';
      html += `
        <div class="ds-statement ds-statement-${n}">
          <div class="ds-statement-label">Statement (${n})</div>
          <div class="ds-statement-text">${escapeHtml(body)}</div>
        </div>`;
    }
    return html;
  }

  // CR: render the argument as a styled quote block; if it has a closing question, surface it below.
  function renderCrQuestion(q) {
    // Prefer explicit `argument` field (new-style questions) over the legacy heuristic split
    if (q.argument) {
      return `<div class="cr-argument">${escapeHtml(q.argument)}</div><div class="cr-question">${escapeHtml(q.question || '')}</div>`;
    }
    // Legacy: argument and question packed into q.question — split on trailing question sentence
    const text = q.question || '';
    const trimmed = text.trim();
    const lastQ = trimmed.lastIndexOf('?');
    if (lastQ > 0 && lastQ > trimmed.length * 0.4) {
      let start = lastQ;
      for (let i = lastQ - 1; i >= 0; i--) {
        const c = trimmed[i];
        if (c === '.' || c === '!' || c === '?' || c === '\n') { start = i + 1; break; }
        if (i === 0) start = 0;
      }
      const argument = trimmed.slice(0, start).trim();
      const question = trimmed.slice(start).trim();
      if (argument && question) {
        return `<div class="cr-argument">${escapeHtml(argument)}</div><div class="cr-question">${escapeHtml(question)}</div>`;
      }
    }
    return `<div class="cr-argument">${escapeHtml(trimmed)}</div>`;
  }

  // SC: underlined portion is wrapped in [brackets]; render as <span class="sc-underline">…</span>
  function renderScQuestion(q) {
    const text = q.question || '';
    const escaped = escapeHtml(text);
    // Replace the first [ ... ] segment with the styled underline span
    const m = /\[([^\[\]]+)\]/.exec(escaped);
    if (!m) return escaped;
    const before = escaped.slice(0, m.index);
    const inner  = m[1];
    const after  = escaped.slice(m.index + m[0].length);
    return `${before}<span class="sc-underline">${inner}</span>${after}`;
  }

  // RC passage source-type tag, derived from passageId or known mapping
  const RC_SOURCE_LABELS = {
    rc_1: 'Business / Economics',
    rc_2: 'Science',
    rc_3: 'History',
    rc_4: 'Social Sciences',
    rc_5: 'Law',
    rc_6: 'Technology',
    rc_7: 'Environment',
    rc_8: 'Literature / Arts',
    rc_9: 'Science',
    rc_10: 'Business / Economics',
    rc_11: 'Behavioral Economics',
  };

  function renderRcPassage(q) {
    const panel = dom['rc-passage-panel'];
    if (!panel) return;
    const passage = getPassageFor(q);
    if (!passage) {
      panel.hidden = true;
      return;
    }
    // Split into paragraphs
    const paras = String(passage)
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(p => p.length > 0);
    const html = (paras.length ? paras : [String(passage)])
      .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
      .join('');
    if (dom['rc-passage-text']) dom['rc-passage-text'].innerHTML = html;

    // Word count + read time (~220 wpm)
    const wordCount = String(passage).trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(wordCount / 220));
    if (dom['rc-passage-meta']) {
      dom['rc-passage-meta'].textContent = `${wordCount} words · ~${minutes} min read`;
      dom['rc-passage-meta'].hidden = false;
    }
    // Source label
    if (dom['rc-passage-source']) {
      const lbl = RC_SOURCE_LABELS[q.passageId];
      if (lbl) {
        dom['rc-passage-source'].textContent = lbl;
        dom['rc-passage-source'].hidden = false;
      } else {
        dom['rc-passage-source'].hidden = true;
      }
    }
    // Question X of Y in this passage
    if (dom['rc-passage-counter']) {
      if (q.passageId) {
        const passageQs = state.bank.filter(b => b.passageId === q.passageId);
        const qIdx = passageQs.findIndex(b => b.id === q.id) + 1;
        if (passageQs.length > 1 && qIdx > 0) {
          dom['rc-passage-counter'].textContent = `Q${qIdx} of ${passageQs.length}`;
          dom['rc-passage-counter'].hidden = false;
        } else {
          dom['rc-passage-counter'].hidden = true;
        }
      } else {
        dom['rc-passage-counter'].hidden = true;
      }
    }

    panel.hidden = false;
    panel.classList.remove('collapsed');
    if (dom['rc-passage-toggle']) dom['rc-passage-toggle'].textContent = 'Hide';
  }

  function renderQuestion(q) {
    dom['q-type'].textContent = q.type;
    dom['q-type'].dataset.qtype = q.type;
    const displayTopic = canonicalTopic(q.topic);
    dom['q-topic'].textContent = `${displayTopic}${q.subtopic ? ' · ' + q.subtopic : ''}`;
    // Compute topic accuracy for tooltip
    const topicStats = { a: 0, c: 0 };
    state.bank.forEach(bq => {
      if (canonicalTopic(bq.topic) !== displayTopic) return;
      const p = state.progress[bq.id];
      if (p) { topicStats.a += p.attempts || 0; topicStats.c += p.correct || 0; }
    });
    if (topicStats.a > 0) {
      const topicAcc = Math.round(topicStats.c / topicStats.a * 100);
      dom['q-topic'].title = `${q.topic}: ${topicAcc}% accuracy (${topicStats.a} attempted)`;
      dom['q-topic'].dataset.topicAcc = topicAcc;
      dom['q-topic'].classList.toggle('badge-topic--weak', topicAcc < 50 && topicStats.a >= 3);
    } else {
      dom['q-topic'].title = `${q.topic}: not attempted yet`;
      dom['q-topic'].dataset.topicAcc = '';
      dom['q-topic'].classList.remove('badge-topic--weak');
    }
    dom['q-difficulty'].textContent = q.difficulty;
    dom['q-difficulty'].dataset.level = q.difficulty;
    dom['q-id'].textContent = `#${q.id}`;

    // Section accent: tag the card so verbal questions get purple accent
    const cardEl = document.getElementById('question-card');
    if (cardEl) cardEl.dataset.section = q.section || '';

    // CR subtopic pill (Weaken / Strengthen / Assumption / Inference / Flaw / Evaluate / Bold-Face)
    renderCrPill(q);

    // Question text — SC questions get the underlined portion highlighted; DS gets statement boxes; CR gets quote block
    if (q.type === 'SC') {
      dom['q-question'].innerHTML = renderScQuestion(q);
    } else if (q.type === 'DS') {
      dom['q-question'].innerHTML = renderDsQuestion(q);
    } else if (q.type === 'CR') {
      dom['q-question'].innerHTML = renderCrQuestion(q);
    } else if (q.type === 'RC') {
      dom['q-question'].innerHTML = `<div class="rc-q-context">📖 Reading Question</div>${escapeHtml(q.question || '')}`;
    } else if (q.type === 'TPA') {
      dom['q-question'].innerHTML = `<div class="di-type-context di-tpa">🔀 Two-Part Analysis — select one answer for each column</div>${escapeHtml(q.question || '')}`;
    } else if (q.type === 'TA') {
      dom['q-question'].innerHTML = `<div class="di-type-context di-ta">📋 Table Analysis — read the table, then select the best answer</div>${renderTaQuestion(q)}`;
    } else if (q.type === 'GI') {
      dom['q-question'].innerHTML = `<div class="di-type-context di-gi">📈 Graphics Interpretation — read the chart carefully</div>${escapeHtml(q.question || '')}`;
    } else if (q.type === 'MSR') {
      dom['q-question'].innerHTML = `<div class="di-type-context di-msr">🗂 Multi-Source Reasoning — synthesize across sources</div>${escapeHtml(q.question || '')}`;
    } else {
      dom['q-question'].textContent = q.question;
    }

    // RC passage panel — paragraphs, metadata, "Question X of Y" counter
    renderRcPassage(q);

    const cont = dom['q-choices'];
    cont.innerHTML = '';
    q.choices.forEach((text, i) => {
      const letter = String.fromCharCode(65 + i);
      // Strip leading (A)/(B)/A)/A. prefix already present in some question data
      const cleanText = text.replace(/^\([A-E]\)\s*|^[A-E]\)\s*|^[A-E]\.\s*/i, '');
      const div = document.createElement('div');
      div.className = 'choice';
      div.dataset.idx = i;
      div.innerHTML = `<div class="choice-letter">${letter}</div><div class="choice-text"></div>`;
      div.querySelector('.choice-text').textContent = cleanText;
      div.addEventListener('click', () => onChoiceClick(i));
      cont.appendChild(div);
    });

    if (dom['feedback-inline']) dom['feedback-inline'].hidden = true;
    if (dom['confidence-tag-row']) dom['confidence-tag-row'].hidden = true;
    const errTagRow = document.getElementById('error-tag-row');
    if (errTagRow) errTagRow.hidden = true;
    dom['btn-submit'].hidden = false;
    dom['btn-submit'].disabled = true;
    dom['btn-skip'].hidden = false;
    dom['btn-skip'].disabled = false;
    dom['btn-hint'].hidden = false;
    dom['btn-hint'].disabled = false;
    dom['hint-panel'].hidden = true;
    dom['btn-next'].hidden = true;
    if (dom['annotation-row']) dom['annotation-row'].hidden = false;
    updateFlagButton();
    updateBookmarkButton();
    renderAdaptiveBadge();
    // Legacy badge: SC and Geometry are not in GMAT Focus 2026
    if (dom['q-legacy']) {
      const isLegacy = GMAT_LEGACY_TYPES.has(q.type) ||
        (GMAT_LEGACY_TOPICS.has(canonicalTopic(q.topic)) && q.section === 'Quant');
      dom['q-legacy'].hidden = !isLegacy;
    }
    renderLessonProgress();

    // New-question entrance animation + streak fire glow
    const card = document.getElementById('question-card');
    if (card) {
      card.classList.remove('entering');
      void card.offsetWidth;
      card.classList.add('entering');
      card.classList.toggle('streak-active', state.streakCorrect >= 5);
    }

    startTimer();
  }

  // ─── Timer ──────────────────────────────────────
  function startTimer() {
    state.qStartTs = Date.now();
    updateTimerDisplay();
    state.qTimerTick = setInterval(updateTimerDisplay, 250);
  }

  function stopTimer() {
    if (state.qTimerTick) clearInterval(state.qTimerTick);
    state.qTimerTick = null;
  }

  function updateTimerDisplay() {
    if (!state.qStartTs) return;
    const sec = (Date.now() - state.qStartTs) / 1000;
    const t = dom['q-timer'];
    const bar = dom['qcard-timer-bar-fill'];

    if (state.filters.mode === 'challenge') {
      const remaining = CHALLENGE_MODE_SEC - sec;
      if (remaining <= 0 && !state.submitted) {
        stopTimer();
        autoTimeoutSubmit();
        return;
      }
      const rem = Math.max(0, remaining);
      t.classList.toggle('warn', rem <= 30 && rem > 10);
      t.classList.toggle('over', rem <= 10);
      dom['q-timer-value'].textContent = '⏱ ' + fmtTime(Math.ceil(rem));
      if (bar) {
        const pct = (rem / CHALLENGE_MODE_SEC) * 100;
        bar.style.width = pct + '%';
        bar.classList.toggle('warn', rem <= 30 && rem > 10);
        bar.classList.toggle('over', rem <= 10);
        bar.classList.remove('pulsing');
      }
      return;
    }

    t.classList.toggle('warn', sec >= getWarnThreshold() && sec < OVER_TIME);
    t.classList.toggle('over', sec >= OVER_TIME);
    dom['q-timer-value'].textContent = fmtTime(sec);

    // Card-top arc bar — fills as time advances toward target (2:00)
    if (bar) {
      const targetMax = OVER_TIME;
      const pct = Math.min(100, (sec / targetMax) * 100);
      bar.style.width = pct + '%';
      const ratio = sec / targetMax;
      bar.classList.toggle('warn', ratio >= 0.75 && ratio < 0.90);
      bar.classList.toggle('over', ratio >= 0.90);
      bar.classList.toggle('pulsing', sec >= PULSE_TIME);
    }
  }

  function autoTimeoutSubmit() {
    if (state.submitted || !state.current) return;
    const q = state.current;
    const timeSec = CHALLENGE_MODE_SEC;
    state.submitted = true;

    // Disable choices
    document.querySelectorAll('#q-choices .choice').forEach(el => {
      el.classList.add('disabled');
      el.style.pointerEvents = 'none';
    });

    // Highlight correct answer
    document.querySelectorAll('#q-choices .choice').forEach(el => {
      if (el.dataset.letter === q.answer) el.classList.add('correct');
    });

    // Update progress
    const p = state.progress[q.id] || { attempts: 0, correct: 0 };
    p.attempts++;
    state.progress[q.id] = p;
    updateSRSchedule(q.id, false);

    // Record attempt as timeout (wrong)
    const dk = state.today;
    if (!state.daily[dk]) state.daily[dk] = { count: 0, correct: 0 };
    state.daily[dk].count++;
    state.session.count++;
    state.session.wrong++;
    state.session.totalTimeSec += timeSec;
    state.session.sinceSummary++;

    state.attempts.unshift({
      qid: q.id, picked: null, wasCorrect: false, kind: 'wrong',
      timeSec, ts: Date.now(), confidence: null, timedOut: true
    });
    if (state.attempts.length > 500) state.attempts.length = 500;

    state.streakCorrect = 0;
    awardXp(0);

    showFeedback(q, false, timeSec, 'timeout');

    // Override label to show timeout
    if (dom['feedback-inline-label']) {
      dom['feedback-inline-label'].textContent = '⏱ Time Expired!';
    }

    save();
    renderStats();
  }

  // ─── Session Summary ─────────────────────────────
  function showSessionSummary() {
    if (state.examMode) return; // suppress during exam simulation
    if (!dom['summary-modal']) return;
    const correct = state.session.correct;
    const wrong = state.session.wrong;
    const skipped = state.session.skipped;
    const answered = correct + wrong;
    const acc = answered > 0 ? Math.round(correct / answered * 100) : 0;
    const xp = state.session.xpEarned;
    const avg = state.session.count > 0 ? state.session.totalTimeSec / state.session.count : 0;

    // Track best session accuracy as a personal record (>= 5 answered for it to count)
    if (answered >= 5 && (state.bestSessionAcc == null || acc > state.bestSessionAcc)) {
      state.bestSessionAcc = acc;
      save();
    }

    let msg = 'Practice makes perfect! 📚';
    let trophy = '📚';
    if (acc === 100 && answered > 0) { msg = "Perfect! You're on fire!"; trophy = '🏆'; }
    else if (acc >= 80)              { msg = 'Great job!';                trophy = '🌟'; }
    else if (acc >= 60)              { msg = 'Keep it up!';               trophy = '💪'; }

    if (dom['summary-trophy']) dom['summary-trophy'].textContent = trophy;
    if (dom['summary-message']) dom['summary-message'].textContent = msg;
    if (dom['summary-xp']) dom['summary-xp'].textContent = '+' + xp;
    if (dom['summary-acc']) dom['summary-acc'].textContent = acc + '%';
    if (dom['summary-avgtime']) dom['summary-avgtime'].textContent = fmtTime(avg);

    // Score delta
    const scoreDeltaEl = document.getElementById('summary-score-delta');
    const scoreDeltaVal = document.getElementById('summary-score-delta-value');
    const currentScore = computeGmatScore();
    if (currentScore.total && scoreDeltaEl && scoreDeltaVal) {
      const prev = state.session.startScore;
      if (prev && prev !== currentScore.total) {
        const delta = currentScore.total - prev;
        scoreDeltaVal.textContent = `${prev} → ${currentScore.total} (${delta > 0 ? '+' : ''}${delta})`;
        scoreDeltaVal.className = 'summary-score-delta-value ' + (delta >= 0 ? 'delta-up' : 'delta-down');
        scoreDeltaEl.hidden = false;
      } else {
        scoreDeltaEl.hidden = true;
      }
    } else if (scoreDeltaEl) {
      scoreDeltaEl.hidden = true;
    }
    state.session.startScore = currentScore.total;

    // Per-type breakdown from last 10 attempts
    const typeBreakdown = document.getElementById('summary-type-breakdown');
    if (typeBreakdown) {
      const recentAttempts = state.attempts.slice(0, 10);
      const typeStats = {};
      recentAttempts.forEach(a => {
        const q = state.bank.find(qq => qq.id === a.qid);
        if (!q) return;
        if (!typeStats[q.type]) typeStats[q.type] = { correct: 0, total: 0 };
        typeStats[q.type].total++;
        if (a.wasCorrect) typeStats[q.type].correct++;
      });
      const entries = Object.entries(typeStats);
      if (entries.length > 0) {
        typeBreakdown.innerHTML = '<div class="summary-type-title">This session</div>' +
          entries.map(([type, s]) => {
            const pct = Math.round(s.correct / s.total * 100);
            const cls = pct >= 80 ? 'ok' : pct >= 50 ? 'mid' : 'low';
            return `<div class="summary-type-row">
              <span class="summary-type-name">${type}</span>
              <span class="summary-type-acc summary-type-acc--${cls}">${pct}% (${s.correct}/${s.total})</span>
            </div>`;
          }).join('');
      } else {
        typeBreakdown.innerHTML = '';
      }
    }

    // Per-topic breakdown from last 10 attempts
    const topicBreakdownEl = document.getElementById('summary-topic-breakdown');
    if (topicBreakdownEl) {
      const recentAttempts = state.attempts.slice(0, SUMMARY_EVERY);
      const topicStats = {};
      recentAttempts.forEach(a => {
        const q = state.bank.find(qq => qq.id === a.qid);
        if (!q) return;
        if (!topicStats[q.topic]) topicStats[q.topic] = { correct: 0, total: 0 };
        topicStats[q.topic].total++;
        if (a.wasCorrect) topicStats[q.topic].correct++;
      });
      const entries = Object.entries(topicStats).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
      if (entries.length > 0) {
        topicBreakdownEl.innerHTML = '<div class="summary-type-title">Topics this session</div>' +
          entries.map(([topic, s]) => {
            const pct = Math.round(s.correct / s.total * 100);
            const cls = pct === 0 ? 'none' : pct >= 80 ? 'ok' : pct >= 50 ? 'mid' : 'low';
            const barW = pct;
            return `<div class="summary-topic-row">
              <span class="summary-topic-name">${escapeHtml(topic)}</span>
              <div class="summary-topic-bar-wrap">
                <div class="summary-topic-bar summary-topic-bar--${cls}" style="width:${barW}%"></div>
              </div>
              <span class="summary-topic-pct summary-type-acc--${cls}">${pct}%</span>
            </div>`;
          }).join('');
      } else {
        topicBreakdownEl.innerHTML = '';
      }
    }

    // Next-action recommendation
    const nextActionEl = document.getElementById('summary-next-action');
    if (nextActionEl) {
      // Find weakest topic from this session or overall
      const recentAttempts = state.attempts.slice(0, SUMMARY_EVERY);
      const weakInSession = {};
      recentAttempts.forEach(a => {
        const q = state.bank.find(qq => qq.id === a.qid);
        if (!q) return;
        if (!weakInSession[q.topic]) weakInSession[q.topic] = { correct: 0, total: 0 };
        weakInSession[q.topic].total++;
        if (a.wasCorrect) weakInSession[q.topic].correct++;
      });
      const worstTopic = Object.entries(weakInSession)
        .filter(([, s]) => s.total >= 2)
        .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))[0];

      if (worstTopic && worstTopic[1].correct / worstTopic[1].total < 0.5) {
        nextActionEl.innerHTML = `<div class="summary-next-tip">
          💡 <strong>${escapeHtml(worstTopic[0])}</strong> needs work — ${Math.round(worstTopic[1].correct / worstTopic[1].total * 100)}% accuracy. Try switching to <em>Weak Areas</em> mode.
        </div>`;
      } else if (acc >= 80) {
        nextActionEl.innerHTML = '<div class="summary-next-tip">🔥 Excellent session! Try <strong>Hard</strong> difficulty next.</div>';
      } else {
        nextActionEl.innerHTML = '';
      }
    }

    dom['summary-modal'].hidden = false;
    document.body.classList.add('modal-open');
    spawnConfetti(40);
    playSound('achievement');

    // Reset summary counter and partial xp tracker
    state.session.sinceSummary = 0;
    state.session.xpEarned = 0;
  }
  function closeSessionSummary() {
    dom['summary-modal'].hidden = true;
    document.body.classList.remove('modal-open');
    nextQuestion();
  }

  // ─── Exam Simulation ───────────────────────────
  function openExamModal() {
    if (dom['exam-modal']) {
      dom['exam-modal'].hidden = false;
      document.body.classList.add('modal-open');
      updateExamTimePreview();
    }
  }
  function closeExamModal() {
    if (dom['exam-modal']) {
      dom['exam-modal'].hidden = true;
      document.body.classList.remove('modal-open');
    }
  }
  // Official GMAT Focus 2026 exam config per mode
  const EXAM_CONFIGS = {
    full:            { label: 'Full Test (80Q · ~160 min · official GMAT Focus 2026)',  totalMins: 160, sections: [
      { section: 'Quant',        count: 37, mins: 70,  filter: q => q.section === 'Quant' && !GMAT_LEGACY_TOPICS.has(canonicalTopic(q.topic)) },
      { section: 'Verbal',       count: 23, mins: 45,  filter: q => q.section === 'Verbal' && !GMAT_LEGACY_TYPES.has(q.type) },
      { section: 'Data Insights',count: 20, mins: 45,  filter: q => q.section === 'Data Insights' },
    ]},
    Quant:           { label: 'Quant Only · 37Q · 70 min',  totalMins: 70,  sections: [
      { section: 'Quant', count: 37, mins: 70, filter: q => q.section === 'Quant' && !GMAT_LEGACY_TOPICS.has(canonicalTopic(q.topic)) },
    ]},
    Verbal:          { label: 'Verbal Only · 23Q · 45 min', totalMins: 45,  sections: [
      { section: 'Verbal', count: 23, mins: 45, filter: q => q.section === 'Verbal' && !GMAT_LEGACY_TYPES.has(q.type) },
    ]},
    'Data Insights': { label: 'Data Insights · 20Q · 45 min', totalMins: 45, sections: [
      { section: 'Data Insights', count: 20, mins: 45, filter: q => q.section === 'Data Insights' },
    ]},
  };
  const OFFICIAL_MODES = new Set(['full', 'Quant', 'Verbal', 'Data Insights']);

  function updateExamTimePreview() {
    const mode  = dom['exam-section']?.value || 'all';
    const count = parseInt(dom['exam-count']?.value || '10', 10);
    const isOfficial = OFFICIAL_MODES.has(mode);

    // Show/hide count selector (only for drill modes)
    if (dom['exam-count-row']) dom['exam-count-row'].hidden = isOfficial;

    let text = '';
    if (mode === 'full')            text = 'Official: 37Q Quant (70 min) → 23Q Verbal (45 min) → 20Q DI (45 min) · No interruptions';
    else if (mode === 'Quant')      text = 'Official: 37 questions · 70 minutes · No interruptions';
    else if (mode === 'Verbal')     text = 'Official: 23 questions (CR + RC) · 45 minutes · No interruptions';
    else if (mode === 'Data Insights') text = 'Official: 20 questions (GI, TA, TPA, MSR) · 45 minutes · No interruptions';
    else if (mode === 'mini')       text = `Mini Drill: 10 questions · ~20 minutes`;
    else                            text = `Mixed Drill: ${count} questions · ~${count * 2} minutes`;

    if (dom['exam-time-preview']) dom['exam-time-preview'].textContent = text;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function buildExamPool(filterFn, count, diff) {
    let pool = state.bank.filter(filterFn);
    if (diff !== 'all') pool = pool.filter(q => q.difficulty === diff);
    shuffle(pool);
    return pool.slice(0, count);
  }

  function startExamSimulation() {
    const mode = dom['exam-section']?.value || 'all';
    const diff = dom['exam-difficulty']?.value || 'all';
    const drillCount = parseInt(dom['exam-count']?.value || '10', 10);

    let queue = [];           // array of question IDs in order
    let sectionBudgets = [];  // [{label, endIndex, budgetSec}] for section dividers

    if (OFFICIAL_MODES.has(mode)) {
      const cfg = EXAM_CONFIGS[mode];
      let idx = 0;
      for (const sec of cfg.sections) {
        const pool = buildExamPool(sec.filter, sec.count, diff);
        if (pool.length < Math.min(sec.count, 5)) {
          alert(`Not enough ${sec.section} questions (need ${sec.count}, found ${pool.length}). Add more questions first.`);
          return;
        }
        pool.forEach(q => queue.push(q.id));
        idx += pool.length;
        sectionBudgets.push({ label: sec.section, endIndex: idx, budgetSec: sec.mins * 60 });
      }
    } else if (mode === 'mini') {
      const pool = buildExamPool(q => true, 10, diff);
      if (pool.length === 0) { alert('No questions match. Try different settings.'); return; }
      pool.forEach(q => queue.push(q.id));
      sectionBudgets.push({ label: 'Mini Drill', endIndex: pool.length, budgetSec: 20 * 60 });
    } else {
      const pool = buildExamPool(q => true, drillCount, diff);
      if (pool.length === 0) { alert('No questions match. Try different settings.'); return; }
      pool.forEach(q => queue.push(q.id));
      sectionBudgets.push({ label: 'Mixed Drill', endIndex: pool.length, budgetSec: drillCount * 2 * 60 });
    }

    state.examMode        = true;
    state.examQueue       = queue;
    state.examIndex       = 0;
    state.examStartTs     = Date.now();
    state.examResults     = [];
    state.examSectionBudgets = sectionBudgets;

    closeExamModal();
    document.body.classList.add('exam-in-progress');

    const q = state.bank.find(x => x.id === state.examQueue[0]);
    if (q) {
      state.current = q;
      state.submitted = false;
      state.selectedChoice = null;
      stopTimer();
      renderQuestion(q);
      updateExamProgressHeader();
    }
  }
  function startDiWarmup() {
    const pool = buildExamPool(q => q.section === 'Data Insights', 3, 'all');
    if (pool.length === 0) { alert('No Data Insights questions found. Check your question bank.'); return; }

    state.examMode        = true;
    state.examQueue       = pool.map(q => q.id);
    state.examIndex       = 0;
    state.examStartTs     = Date.now();
    state.examResults     = [];
    state.examSectionBudgets = [{ label: 'DI Warmup', endIndex: pool.length, budgetSec: 10 * 60 }];
    state.diWarmup        = true;

    closeExamModal();
    document.body.classList.add('exam-in-progress');

    const q = state.bank.find(x => x.id === state.examQueue[0]);
    if (q) {
      state.current = q;
      state.submitted = false;
      state.selectedChoice = null;
      stopTimer();
      renderQuestion(q);
      updateExamProgressHeader();
    }
  }

  function updateExamProgressHeader() {
    const done  = state.examIndex;
    const total = state.examQueue.length;
    // Determine which section we're in
    let sectionLabel = 'Exam';
    let sectionStart = 0;
    if (state.examSectionBudgets) {
      for (const b of state.examSectionBudgets) {
        if (done < b.endIndex) { sectionLabel = b.label; break; }
        sectionStart = b.endIndex;
      }
    }
    const sectionPos = done - sectionStart + 1;
    if (dom['q-timer-value']) {
      dom['q-timer-value'].textContent = `${sectionLabel}: ${sectionPos} of ${total - sectionStart}`;
    }
  }
  function advanceExam(wasCorrect, timeSec) {
    state.examResults.push({ qid: state.current.id, wasCorrect, timeSec });
    state.examIndex++;
    if (state.examIndex >= state.examQueue.length) {
      endExamSimulation();
      return;
    }

    // Detect section boundary in full-test mode
    if (state.examSectionBudgets && state.examSectionBudgets.length > 1) {
      const prevBudget = state.examSectionBudgets.find((b, i) =>
        state.examIndex === b.endIndex && i < state.examSectionBudgets.length - 1
      );
      if (prevBudget) {
        const nextBudget = state.examSectionBudgets.find(b => b.endIndex > state.examIndex);
        if (nextBudget) {
          showSectionBreak(nextBudget.label, nextBudget.budgetSec / 60);
          return;
        }
      }
    }

    const q = state.bank.find(x => x.id === state.examQueue[state.examIndex]);
    if (q) {
      state.current = q;
      state.submitted = false;
      state.selectedChoice = null;
      stopTimer();
      renderQuestion(q);
      updateExamProgressHeader();
    }
  }

  function showSectionBreak(nextSection, nextMins) {
    // Overlay a section-break panel instead of jumping to next question
    const main = document.querySelector('.question-panel') || document.getElementById('question-area');
    if (!main) { resumeSectionBreak(); return; }
    main.innerHTML = `
      <div class="section-break-card" id="section-break-card">
        <div class="section-break-icon">⏸️</div>
        <h2 class="section-break-title">Section Complete</h2>
        <p class="section-break-body">
          Take a moment to breathe. Next up: <strong>${escapeHtml(nextSection)}</strong>
          <br>Allotted: ${nextMins} minutes.
        </p>
        <button class="btn btn-primary" id="btn-resume-section" style="margin-top:20px">
          Continue → ${escapeHtml(nextSection)}
        </button>
      </div>`;
    const btn = document.getElementById('btn-resume-section');
    if (btn) btn.addEventListener('click', resumeSectionBreak);
  }

  function resumeSectionBreak() {
    const q = state.bank.find(x => x.id === state.examQueue[state.examIndex]);
    if (q) {
      state.current = q;
      state.submitted = false;
      state.selectedChoice = null;
      stopTimer();
      renderQuestion(q);
      updateExamProgressHeader();
    }
  }
  function endExamSimulation() {
    state.examMode = false;
    document.body.classList.remove('exam-in-progress');

    // DI warmup complete — show motivational card instead of full results modal
    if (state.diWarmup) {
      state.diWarmup = false;
      const results = state.examResults;
      const correct = results.filter(r => r.wasCorrect).length;
      const main = document.querySelector('.question-panel') || document.getElementById('question-area');
      if (main) {
        const tips = [
          'Sort tables by the relevant column before scanning rows.',
          'For MSR, read the question first — then only open the relevant tab.',
          'GI: always check axis labels and units before interpreting trends.',
          'TPA: solve each column independently; don\'t let one answer contaminate the other.',
        ];
        const tip = tips[Math.floor(Math.random() * tips.length)];
        main.innerHTML = `<div class="section-break-card">
          <div class="section-break-icon">🔥</div>
          <h2 class="section-break-title">DI Warmup Complete!</h2>
          <p class="section-break-body">${correct} / ${results.length} correct<br><br>💡 <em>${tip}</em></p>
          <button class="btn btn-primary" id="btn-warmup-done" style="margin-top:20px">Start Practicing</button>
        </div>`;
        document.getElementById('btn-warmup-done')?.addEventListener('click', nextQuestion);
      }
      return;
    }

    const results = state.examResults;
    const correct = results.filter(r => r.wasCorrect).length;
    const total   = results.length;
    const acc     = total > 0 ? Math.round(correct / total * 100) : 0;
    const elapsed = Math.round((Date.now() - state.examStartTs) / 1000);
    const avgTime = total > 0 ? Math.round((results.reduce((s, r) => s + r.timeSec, 0)) / total) : 0;

    const trophy = acc >= 80 ? '🏆' : acc >= 60 ? '🥈' : '📈';
    if (dom['exam-results-trophy']) dom['exam-results-trophy'].textContent = trophy;

    if (dom['exam-results-grid']) {
      // By-type breakdown
      const byType = {};
      results.forEach(r => {
        const q = state.bank.find(x => x.id === r.qid);
        if (!q) return;
        if (!byType[q.type]) byType[q.type] = { correct: 0, total: 0 };
        byType[q.type].total++;
        if (r.wasCorrect) byType[q.type].correct++;
      });
      const typeRows = Object.entries(byType)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([type, v]) => {
          const a = Math.round(v.correct / v.total * 100);
          const cls = a >= 70 ? 'ok' : a >= 50 ? 'mid' : 'low';
          return `<div class="exam-type-row">
            <span class="exam-type-label">${escapeHtml(type)}</span>
            <div class="exam-type-bar-wrap"><div class="exam-type-bar exam-type-bar--${cls}" style="width:${a}%"></div></div>
            <span class="exam-type-pct">${a}% (${v.correct}/${v.total})</span>
          </div>`;
        }).join('');

      dom['exam-results-grid'].innerHTML = `
        <div class="exam-result-stat"><div class="exam-result-val">${correct}/${total}</div><div class="exam-result-lbl">Correct</div></div>
        <div class="exam-result-stat"><div class="exam-result-val">${acc}%</div><div class="exam-result-lbl">Accuracy</div></div>
        <div class="exam-result-stat"><div class="exam-result-val">${fmtTime(avgTime)}</div><div class="exam-result-lbl">Avg Time</div></div>
        <div class="exam-result-stat"><div class="exam-result-val">${fmtTime(elapsed)}</div><div class="exam-result-lbl">Total Time</div></div>
        ${typeRows.length > 0 ? `<div class="exam-type-breakdown">${typeRows}</div>` : ''}
      `;
    }
    if (dom['exam-results-modal']) {
      dom['exam-results-modal'].hidden = false;
      document.body.classList.add('modal-open');
    }
  }
  function closeExamResults() {
    if (dom['exam-results-modal']) {
      dom['exam-results-modal'].hidden = true;
      document.body.classList.remove('modal-open');
    }
    nextQuestion();
  }

  function renderLessonProgress() { /* removed */ }

  // ─── Skill map (topic tree) ──────────────────────
  function topicAccuracy(topic) {
    const ids = state.bank.filter(q => q.topic === topic).map(q => q.id);
    let attempts = 0, correct = 0;
    ids.forEach(id => {
      const p = state.progress[id];
      if (!p) return;
      attempts += p.attempts || 0;
      correct  += p.correct  || 0;
    });
    return { attempts, correct, acc: attempts > 0 ? correct / attempts : 0 };
  }

  function renderSkillMap() {
    const quantWrap = document.getElementById('skill-map-quant-nodes');
    const verbalWrap = document.getElementById('skill-map-verbal-nodes');
    if (!quantWrap || !verbalWrap) return;
    quantWrap.innerHTML = '';
    verbalWrap.innerHTML = '';
    // Group topics by section, preserve bank order.
    const seen = new Set();
    const quantTopics = [];
    const verbalTopics = [];
    state.bank.forEach(q => {
      const key = q.section + '||' + q.topic;
      if (seen.has(key)) return;
      seen.add(key);
      if (q.section === 'Verbal') verbalTopics.push(q.topic);
      else quantTopics.push(q.topic);
    });
    const TOPIC_ICONS = {
      'Algebra': '🔢', 'Arithmetic': '➕', 'Geometry': '📐', 'Number Properties': '∑',
      'Word Problems': '📝', 'Statistics': '📊', 'Combinatorics': '🎲', 'Probability': '🎯',
      'Inequalities': '<>', 'Functions': 'ƒ', 'Sets': '∪', 'Sequences': '⋯',
      'Critical Reasoning': '🧠', 'Sentence Correction': '✍️', 'Reading Comprehension': '📖',
    };
    function renderNode(topic, idx, isVerbal) {
      const stat = topicAccuracy(topic);
      const acc = stat.acc;
      const locked = stat.attempts === 0;
      let mood = 'neutral';
      if (!locked) {
        if (acc >= 0.75) mood = 'good';
        else if (acc >= 0.5) mood = 'mid';
        else mood = 'low';
      }
      // 5-star mastery from accuracy (only when attempts >= 3)
      let stars = 0;
      if (stat.attempts >= 3) stars = Math.max(1, Math.min(5, Math.round(acc * 5)));
      // Position: alternate left / center / right for zigzag flow
      const col = idx % 3; // 0 left, 1 center, 2 right
      const node = document.createElement('button');
      node.type = 'button';
      node.className = `sk-node sk-node-${mood} sk-node-col-${col} ${locked ? 'sk-locked' : ''} ${isVerbal ? 'sk-verbal' : 'sk-quant'}`;
      node.dataset.topic = topic;
      const icon = TOPIC_ICONS[topic] || (isVerbal ? '📚' : '∑');
      const ringPct = locked ? 0 : Math.round(acc * 100);
      const dasharray = `${ringPct},100`;
      node.innerHTML = `
        <div class="sk-node-ring">
          <svg viewBox="0 0 36 36" width="72" height="72">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" stroke-width="3"></circle>
            <circle cx="18" cy="18" r="15.9" fill="none" class="sk-ring-arc" stroke-width="3"
                    stroke-dasharray="${dasharray}" stroke-dashoffset="0" stroke-linecap="round"
                    transform="rotate(-90 18 18)"></circle>
          </svg>
          <div class="sk-node-icon">${locked ? '🔒' : icon}</div>
        </div>
        <div class="sk-node-label">${escapeHtml(topic)}</div>
        <div class="sk-node-stars">
          ${[1,2,3,4,5].map(n => `<span class="sk-star ${n <= stars ? 'on' : ''}">★</span>`).join('')}
        </div>
        <div class="sk-node-meta">${locked ? 'Tap to start' : `${stat.correct}/${stat.attempts} · ${Math.round(acc*100)}%`}</div>
      `;
      node.addEventListener('click', () => {
        // Set topic filter, switch back to grid view, start practicing.
        state.filters.topic = topic;
        if (dom['filter-topic']) {
          // Make sure topic exists in dropdown options
          const opts = [...dom['filter-topic'].options].map(o => o.value);
          if (!opts.includes(topic)) {
            const opt = document.createElement('option');
            opt.value = topic; opt.textContent = topic;
            dom['filter-topic'].appendChild(opt);
          }
          dom['filter-topic'].value = topic;
        }
        save();
        // Flip back to filter/grid view.
        document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'filter'));
        const skillMap   = document.getElementById('skill-map');
        const filterRow  = document.querySelector('#tab-practice .filter-row');
        const qcard      = document.getElementById('question-card');
        const sessionTrk = document.querySelector('#tab-practice .session-tracker');
        if (skillMap) skillMap.hidden = true;
        if (filterRow)  filterRow.style.display  = '';
        if (qcard)      qcard.style.display      = '';
        if (sessionTrk) sessionTrk.style.display = '';
        nextQuestion();
      });
      return node;
    }
    quantTopics.forEach((t, i) => quantWrap.appendChild(renderNode(t, i, false)));
    verbalTopics.forEach((t, i) => verbalWrap.appendChild(renderNode(t, i, true)));
    if (quantTopics.length === 0) {
      quantWrap.innerHTML = '<div class="empty-state">No Quant topics in bank.</div>';
    }
    if (verbalTopics.length === 0) {
      verbalWrap.innerHTML = '<div class="empty-state">No Verbal topics in bank.</div>';
    }
  }

  // ─── Header / session / dashboard ──────────────
  function renderHeader() {
    state.today = dateKey(new Date());
    const all = Object.values(state.progress);
    const totalAttempts = all.reduce((s, p) => s + (p.attempts || 0), 0);
    const totalCorrect  = all.reduce((s, p) => s + (p.correct  || 0), 0);
    const acc = totalAttempts > 0 ? Math.round(totalCorrect / totalAttempts * 100) : null;
    dom['hdr-accuracy'].textContent = acc != null ? acc + '%' : '—';
    dom['hdr-today'].textContent = state.daily[state.today]?.count || 0;
    dom['hdr-streak'].textContent = computeStreak();
    // Update header score badge without full dashboard re-render
    const gmatScore = computeGmatScore();
    if (dom['gmat-score-value']) dom['gmat-score-value'].textContent = gmatScore.total || '—';
  }

  function computeStreak() {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const k = dateKey(d);
      if (state.daily[k]?.count > 0) streak++;
      else if (i > 0) break;
    }
    return streak;
  }

  // ─── GMAT Score Predictor ────────────────────────
  function computeGmatScore() {
    const DIFF_WEIGHTS = { easy: 1, medium: 2, hard: 3 };
    const SECTIONS = ['Quant', 'Verbal', 'Data Insights'];
    const scores = {};
    let totalAttempts = 0;

    SECTIONS.forEach(section => {
      let weightedCorrect = 0;
      let weightedTotal = 0;
      state.bank.filter(q => q.section === section).forEach(q => {
        const p = state.progress[q.id];
        if (!p || p.attempts === 0) return;
        const w = DIFF_WEIGHTS[q.difficulty] || 2;
        const acc = p.correct / p.attempts;
        weightedCorrect += acc * w * p.attempts;
        weightedTotal += w * p.attempts;
        totalAttempts += p.attempts;
      });
      scores[section] = weightedTotal > 0
        ? Math.round(60 + (weightedCorrect / weightedTotal) * 30)
        : null;
    });

    const available = SECTIONS.filter(s => scores[s] !== null);
    if (available.length === 0 || totalAttempts < 15) {
      return { total: null, sections: scores, attempts: totalAttempts };
    }
    const avgSection = available.reduce((s, sec) => s + scores[sec], 0) / available.length;
    // Linear map: section 60 → 205, section 90 → 805
    const total = Math.round(205 + ((avgSection - 60) / 30) * 600);
    return { total: Math.max(205, Math.min(805, total)), sections: scores, attempts: totalAttempts };
  }

  function renderScorePredictor() {
    const result = computeGmatScore();

    // Header badge
    if (dom['gmat-score-value']) dom['gmat-score-value'].textContent = result.total || '—';

    // Dashboard score total
    const totalEl = dom['score-total'];
    if (totalEl) {
      totalEl.textContent = result.total || '—';
      totalEl.className = 'score-total-value' +
        (!result.total ? '' : result.total >= 700 ? ' score-elite' : result.total >= 600 ? ' score-good' : ' score-low');
    }

    if (dom['score-predictor-note']) {
      dom['score-predictor-note'].textContent = result.total
        ? `Based on ${result.attempts} answered questions · Updates live`
        : `Answer ${Math.max(0, 15 - result.attempts)} more questions to unlock your estimate`;
    }

    const sectionDefs = [
      { key: 'Quant',         valId: 'score-quant',  barId: 'score-quant-bar' },
      { key: 'Verbal',        valId: 'score-verbal', barId: 'score-verbal-bar' },
      { key: 'Data Insights', valId: 'score-di',     barId: 'score-di-bar' },
    ];
    sectionDefs.forEach(({ key, valId, barId }) => {
      const val = result.sections[key];
      if (dom[valId]) dom[valId].textContent = val || '—';
      if (dom[barId]) dom[barId].style.width = val ? ((val - 60) / 30 * 100) + '%' : '0%';
    });
  }

  // ─── Exam Countdown ──────────────────────────────
  const EXAM_DATE_KEY = 'gmat-exam-date';

  function getExamDate() {
    try { return localStorage.getItem(EXAM_DATE_KEY) || null; } catch (_) { return null; }
  }
  function setExamDate(val) {
    try { if (val) localStorage.setItem(EXAM_DATE_KEY, val); else localStorage.removeItem(EXAM_DATE_KEY); } catch (_) {}
  }

  function renderExamCountdown() {
    const input = document.getElementById('exam-date-input');
    const daysVal = document.getElementById('exam-days-value');
    const daysLabel = document.getElementById('exam-days-label');
    const urgencyBar = document.getElementById('exam-urgency-bar');
    const dailyRec = document.getElementById('exam-daily-rec');
    if (!daysVal) return;

    const saved = getExamDate();
    if (input && saved) input.value = saved;

    if (!saved) {
      daysVal.textContent = '?';
      daysLabel.textContent = 'Set exam date →';
      if (urgencyBar) urgencyBar.className = 'exam-urgency-bar';
      if (dailyRec) dailyRec.textContent = 'Set your exam date to get a daily target.';
      return;
    }

    const examMs  = new Date(saved).getTime();
    const nowMs   = Date.now();
    const daysLeft = Math.ceil((examMs - nowMs) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      daysVal.textContent = 'Done';
      daysLabel.textContent = 'exam has passed';
      if (urgencyBar) urgencyBar.className = 'exam-urgency-bar exam-urgency--past';
      if (dailyRec) dailyRec.textContent = 'Update your exam date for a new plan.';
      return;
    }

    daysVal.textContent = daysLeft;
    daysLabel.textContent = daysLeft === 1 ? 'day until exam' : 'days until exam';

    let urgencyClass = 'exam-urgency--green';
    if (daysLeft < 7)  urgencyClass = 'exam-urgency--red';
    else if (daysLeft < 30) urgencyClass = 'exam-urgency--yellow';
    if (urgencyBar) urgencyBar.className = 'exam-urgency-bar ' + urgencyClass;

    // Recommended daily questions
    const score = computeGmatScore();
    const currentEst = score.total || 0;
    const gap = Math.max(0, 700 - currentEst);
    // ~10 hard questions = ~5 score points on average
    const totalQsNeeded = gap > 0 ? Math.round(gap / 5 * 10) : 50;
    const dailyTarget = daysLeft > 0 ? Math.max(5, Math.ceil(totalQsNeeded / daysLeft)) : 20;
    if (dailyRec) {
      dailyRec.textContent = gap > 0
        ? `Aim for ${dailyTarget} questions/day to close the ${gap}-point gap by exam day.`
        : `Score estimate ≥ 700! Aim for ${Math.min(dailyTarget, 15)} questions/day to maintain momentum.`;
    }
  }

  // ─── Focus Nudge ─────────────────────────────────
  const NUDGE_KEY = 'gmat-nudge-dismissed';

  function renderFocusNudge() {
    const nudge = document.getElementById('focus-nudge');
    if (!nudge) return;

    // Find weakest topic (≥3 attempts, <50% accuracy)
    const topicMap = {};
    state.bank.forEach(q => {
      if (!topicMap[q.topic]) topicMap[q.topic] = { a: 0, c: 0, section: q.section };
      const p = state.progress[q.id];
      if (p) { topicMap[q.topic].a += p.attempts || 0; topicMap[q.topic].c += p.correct || 0; }
    });
    const weak = Object.entries(topicMap)
      .filter(([, v]) => v.a >= 3 && v.c / v.a < 0.5)
      .sort((a, b) => (a[1].c / a[1].a) - (b[1].c / b[1].a));

    if (weak.length === 0) { nudge.hidden = true; return; }

    const [topicName, stats] = weak[0];
    const acc = Math.round(stats.c / stats.a * 100);

    // Don't re-show if dismissed for same topic today
    const dismissed = (() => { try { return JSON.parse(localStorage.getItem(NUDGE_KEY) || '{}'); } catch (_) { return {}; } })();
    if (dismissed[topicName] === dateKey(new Date())) { nudge.hidden = true; return; }

    const textEl = document.getElementById('focus-nudge-text');
    if (textEl) textEl.textContent = `${topicName} — only ${acc}% accuracy. Time to target this topic!`;
    nudge.hidden = false;

    const focusBtn = document.getElementById('focus-nudge-btn');
    if (focusBtn) {
      focusBtn.onclick = () => {
        dom['filter-topic'] && (dom['filter-topic'].value = topicName);
        dom['filter-mode']  && (dom['filter-mode'].value  = 'weak');
        state.filters.topic = topicName;
        state.filters.mode  = 'weak';
        nudge.hidden = true;
        nextQuestion();
      };
    }
    const dismissBtn = document.getElementById('focus-nudge-dismiss');
    if (dismissBtn) {
      dismissBtn.onclick = () => {
        nudge.hidden = true;
        dismissed[topicName] = dateKey(new Date());
        try { localStorage.setItem(NUDGE_KEY, JSON.stringify(dismissed)); } catch (_) {}
      };
    }
  }

  // ─── Quick-filter chips ──────────────────────────
  function initQuickFilterChips() {
    const applyAndGo = (mode, difficulty) => {
      if (dom['filter-mode'])       { dom['filter-mode'].value = mode; state.filters.mode = mode; }
      if (difficulty && dom['filter-difficulty']) { dom['filter-difficulty'].value = difficulty; state.filters.difficulty = difficulty; }
      switchTab('practice');
      nextQuestion();
    };
    const wk = document.getElementById('qf-weak');
    const un = document.getElementById('qf-unseen');
    const hd = document.getElementById('qf-hard');
    const sr = document.getElementById('qf-sr');
    if (wk) wk.addEventListener('click', () => applyAndGo('weak', null));
    if (un) un.addEventListener('click', () => applyAndGo('unseen', null));
    if (hd) hd.addEventListener('click', () => { applyAndGo('random', 'hard'); });
    if (sr) sr.addEventListener('click', () => applyAndGo('missed', null));
  }

  function initExamCountdown() {
    const btn = document.getElementById('btn-save-exam-date');
    if (btn) btn.addEventListener('click', () => {
      const input = document.getElementById('exam-date-input');
      if (input) { setExamDate(input.value); renderExamCountdown(); }
    });
  }

  // ─── Score Momentum ───────────────────────────────
  function renderMomentum() {
    const cont = document.getElementById('momentum-row');
    if (!cont) return;
    if (state.attempts.length < 10) { cont.innerHTML = ''; return; }

    // Last 20 attempts split into two halves
    const recent = state.attempts.slice(-20);
    const half   = Math.floor(recent.length / 2);
    const prior  = recent.slice(0, half);
    const latest = recent.slice(half);

    const acc = arr => {
      const c = arr.filter(a => a.wasCorrect).length;
      return arr.length > 0 ? Math.round(c / arr.length * 100) : 0;
    };
    const priorAcc  = acc(prior);
    const latestAcc = acc(latest);
    const delta     = latestAcc - priorAcc;

    // Score momentum from scoreHistory
    let scoreDelta = null;
    if (state.scoreHistory.length >= 2) {
      const n   = state.scoreHistory.length;
      scoreDelta = state.scoreHistory[n - 1].score - state.scoreHistory[0].score;
    }

    const arrow  = delta > 0 ? '↑' : delta < 0 ? '↓' : '→';
    const cls    = delta > 0 ? 'momentum--up' : delta < 0 ? 'momentum--down' : 'momentum--flat';
    const sign   = delta > 0 ? '+' : '';
    const trend  = delta >= 5 ? 'Strong improvement' : delta >= 1 ? 'Trending up' : delta <= -5 ? 'Declining — review weak topics' : delta <= -1 ? 'Slight dip' : 'Holding steady';
    const scoreText = scoreDelta !== null ? ` · Score ${scoreDelta >= 0 ? '+' : ''}${scoreDelta} overall` : '';

    cont.innerHTML = `
      <div class="momentum-card ${cls}">
        <div class="momentum-arrow">${arrow}</div>
        <div class="momentum-info">
          <div class="momentum-trend">${trend}</div>
          <div class="momentum-detail">Last 10 vs prior 10: ${sign}${delta}% accuracy${scoreText}</div>
        </div>
        <div class="momentum-pct">${sign}${delta}%</div>
      </div>`;
  }

  // ─── Daily Missions ───────────────────────────────
  function renderDailyMissions() {
    const cont = document.getElementById('daily-missions-list');
    if (!cont) return;

    const today = dateKey(new Date());
    const todayQ = state.daily[today]?.count || 0;
    const goal   = getDailyGoal();

    // Mission 1: Daily Goal
    const goalDone = todayQ >= goal;

    // Mission 2: Weakest topic
    const topicMap = {};
    state.bank.forEach(q => {
      if (!topicMap[q.topic]) topicMap[q.topic] = { a: 0, c: 0 };
      const p = state.progress[q.id];
      if (p) { topicMap[q.topic].a += p.attempts || 0; topicMap[q.topic].c += p.correct || 0; }
    });
    const weakTopic = Object.entries(topicMap)
      .filter(([, v]) => v.a >= 3 && v.c / v.a < 0.5)
      .sort((a, b) => (a[1].c / a[1].a) - (b[1].c / b[1].a))[0];

    // Mission 3: SR review or unseen hard
    const srDue = state.bank.filter(q => {
      const p = state.progress[q.id];
      if (!p || !p.srNextReview) return false;
      return p.srNextReview <= Date.now();
    }).length;

    const missions = [
      {
        icon: goalDone ? '✅' : '🎯',
        label: goalDone ? `Daily goal: Done! (${todayQ}/${goal})` : `Daily goal: ${todayQ}/${goal} questions`,
        sub: goalDone ? 'Well done — keep the streak going' : `${Math.max(0, goal - todayQ)} left`,
        done: goalDone,
        action: null,
        mode: 'random',
      },
      {
        icon: weakTopic ? '🔧' : '🌟',
        label: weakTopic ? `Fix: ${weakTopic[0]}` : 'No weak topics yet!',
        sub: weakTopic
          ? `${Math.round(weakTopic[1].c / weakTopic[1].a * 100)}% accuracy — needs practice`
          : 'Answer more questions to discover weak areas',
        done: false,
        topic: weakTopic?.[0],
        mode: weakTopic ? 'weak' : null,
      },
      {
        icon: srDue > 0 ? '🔁' : '🆕',
        label: srDue > 0 ? `Review ${srDue} due cards` : 'Explore new hard questions',
        sub: srDue > 0 ? 'Spaced repetition keeps knowledge sharp' : 'Try difficulty: Hard for a challenge',
        done: false,
        mode: srDue > 0 ? 'missed' : 'random',
        difficulty: srDue > 0 ? null : 'hard',
      },
    ];

    cont.innerHTML = missions.map((m, i) => `
      <div class="daily-mission ${m.done ? 'daily-mission--done' : ''}" data-mission="${i}">
        <div class="daily-mission-icon">${m.icon}</div>
        <div class="daily-mission-info">
          <div class="daily-mission-label">${escapeHtml(m.label)}</div>
          <div class="daily-mission-sub">${escapeHtml(m.sub)}</div>
        </div>
        ${!m.done && m.mode ? `<button class="daily-mission-go" data-mission="${i}">→</button>` : ''}
      </div>
    `).join('');

    // Wire up go buttons
    cont.querySelectorAll('.daily-mission-go').forEach(btn => {
      const idx = parseInt(btn.dataset.mission);
      const m = missions[idx];
      if (!m || !m.mode) return;
      btn.addEventListener('click', () => {
        if (dom['filter-mode'])       dom['filter-mode'].value = m.mode;
        if (m.topic && dom['filter-topic']) dom['filter-topic'].value = m.topic;
        if (m.difficulty && dom['filter-difficulty']) dom['filter-difficulty'].value = m.difficulty;
        state.filters.mode = m.mode;
        if (m.topic)       state.filters.topic = m.topic;
        if (m.difficulty)  state.filters.difficulty = m.difficulty;
        switchTab('practice');
        nextQuestion();
      });
    });
  }

  // ─── 30-Day Score Projection ─────────────────────
  function renderProjection() {
    const scoreEl   = document.getElementById('plan-projection-score');
    const subEl     = document.getElementById('plan-projection-sub');
    if (!scoreEl) return;

    const result = computeGmatScore();
    if (!result.total || state.scoreHistory.length < 2) {
      scoreEl.textContent = '—';
      if (subEl) subEl.textContent = 'Answer 15+ questions to unlock';
      return;
    }

    // Use scoreHistory slope to project 30 days forward
    // Each point = every 5 answers. Compute points per day from state.daily
    const last7DaysQ = (() => {
      const today = new Date();
      let total = 0;
      for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        total += state.daily[dateKey(d)]?.count || 0;
      }
      return total;
    })();
    const qPerDay = last7DaysQ / 7;

    // Score velocity: points per 5-question block from recent history
    const recent = state.scoreHistory.slice(-5);
    const oldest = state.scoreHistory.slice(0, Math.min(5, state.scoreHistory.length));
    const recentAvg  = recent.reduce((s, h) => s + h.score, 0) / recent.length;
    const oldestAvg  = oldest.reduce((s, h) => s + h.score, 0) / oldest.length;
    const totalBlocks = state.scoreHistory.length;
    const pointsPerBlock = totalBlocks > 1 ? (recentAvg - oldestAvg) / Math.max(1, totalBlocks - 1) : 0;

    // How many blocks in 30 days?
    const blocksIn30 = (qPerDay * 30) / 5;
    const projected  = Math.round(result.total + pointsPerBlock * blocksIn30);
    const projClamped = Math.max(205, Math.min(805, projected));

    scoreEl.textContent = projClamped;
    scoreEl.className = 'plan-forecast-score' +
      (projClamped >= 700 ? ' plan-forecast-score--green' : projClamped >= 600 ? '' : ' plan-forecast-score--low');

    const delta = projClamped - result.total;
    if (subEl) {
      subEl.textContent = delta > 0
        ? `+${delta} pts at ${qPerDay.toFixed(0)} q/day`
        : delta < 0
          ? `${delta} pts — increase daily practice`
          : `Flat — increase intensity`;
    }
  }

  // ─── Study Plan Generator ────────────────────────
  function renderStudyPlan() {
    const result = computeGmatScore();

    // Score hero
    if (dom['plan-current-score']) dom['plan-current-score'].textContent = result.total || '—';
    renderProjection();
    renderWeekGrid();

    // Section bars
    const planSections = [
      { key: 'Quant',         valId: 'plan-q-score',  barId: 'plan-q-bar' },
      { key: 'Verbal',        valId: 'plan-v-score',  barId: 'plan-v-bar' },
      { key: 'Data Insights', valId: 'plan-di-score', barId: 'plan-di-bar' },
    ];
    planSections.forEach(({ key, valId, barId }) => {
      const val = result.sections[key];
      if (dom[valId]) dom[valId].textContent = val || '—';
      if (dom[barId]) dom[barId].style.width = val ? ((val - 60) / 30 * 100) + '%' : '0%';
    });

    // Identify weak topics (< 50% accuracy, > 3 attempts)
    const topicStats = {};
    state.bank.forEach(q => {
      const t = canonicalTopic(q.topic);
      if (!topicStats[t]) topicStats[t] = { a: 0, c: 0, section: q.section };
      const p = state.progress[q.id];
      if (p) { topicStats[t].a += p.attempts || 0; topicStats[t].c += p.correct || 0; }
    });
    const weakTopics = Object.entries(topicStats)
      .filter(([, v]) => v.a >= 3 && (v.c / v.a) < 0.5)
      .sort((a, b) => (a[1].c / a[1].a) - (b[1].c / b[1].a))
      .slice(0, 6);

    // 4-week roadmap
    const weeksEl = dom['plan-weeks'];
    if (weeksEl) {
      const weekPlans = [
        { week: 'Week 1', focus: 'Foundation', desc: 'Master Quant basics — Arithmetic, Algebra, Geometry', topics: ['Arithmetic', 'Algebra', 'Geometry'], tag: 'Q' },
        { week: 'Week 2', focus: 'Verbal Core', desc: 'Critical Reasoning patterns — Weaken, Strengthen, Assumption', topics: ['Critical Reasoning', 'Reading Comprehension'], tag: 'V' },
        { week: 'Week 3', focus: 'Data Insights', desc: 'DS strategy + TPA & Table Analysis for the new DI section', topics: ['Data Sufficiency', 'Two-Part Analysis', 'Table Analysis'], tag: 'DI' },
        { week: 'Week 4', focus: 'Hard Mode', desc: '700+ questions only — simulate exam pressure, all sections', topics: [], tag: '🔥' },
      ];
      weeksEl.innerHTML = weekPlans.map((w, i) => `
        <div class="plan-week-card plan-week-${i + 1}">
          <div class="plan-week-head">
            <span class="plan-week-tag">${w.tag}</span>
            <div>
              <div class="plan-week-title">${w.week}: ${w.focus}</div>
              <div class="plan-week-desc">${escapeHtml(w.desc)}</div>
            </div>
          </div>
          <div class="plan-topic-chips">
            ${w.topics.map(t => `<span class="plan-topic-chip">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    // Daily recommendations
    const dailyEl = dom['plan-daily'];
    if (dailyEl) {
      const today = todayCount();
      const goal = getDailyGoal();
      const remaining = Math.max(0, goal - today);
      const items = [];

      if (weakTopics.length > 0) {
        items.push({ icon: '🎯', label: `Focus: ${weakTopics[0][0]}`, sub: `${Math.round((weakTopics[0][1].c / weakTopics[0][1].a) * 100)}% accuracy — needs work` });
      }
      items.push({ icon: '📝', label: `${remaining} questions left today`, sub: `Goal: ${goal} · Done: ${today}` });
      items.push({ icon: '⏱', label: '2 min per question target', sub: 'Stay disciplined on pacing' });
      if (!result.total || result.total < 700) {
        items.push({ icon: '📈', label: 'Hard mode practice', sub: 'Switch to Hard difficulty in filters' });
      } else {
        items.push({ icon: '🏆', label: '700+ within reach!', sub: 'Keep your streak alive' });
      }

      dailyEl.innerHTML = items.map(it => `
        <div class="plan-daily-item">
          <span class="plan-daily-icon">${it.icon}</span>
          <div>
            <div class="plan-daily-label">${escapeHtml(it.label)}</div>
            <div class="plan-daily-sub">${escapeHtml(it.sub)}</div>
          </div>
        </div>
      `).join('');
    }

    // Priority queue: top 6 unseen hard questions from weak areas, then medium
    const queueEl = document.getElementById('plan-priority-queue');
    if (queueEl) {
      const weakTopicNames = new Set(weakTopics.map(([t]) => t));
      const priorityPool = state.bank
        .filter(q => {
          const p = state.progress[q.id];
          const unseen = !p || p.attempts === 0;
          const wrong = p && (p.attempts - (p.correct || 0)) > 0;
          return (unseen || wrong) && (weakTopicNames.has(q.topic) || q.difficulty === 'hard');
        })
        .sort((a, b) => {
          const pa = state.progress[a.id], pb = state.progress[b.id];
          // Prioritize: weak-topic wrongs > hard-unseen > medium-unseen
          const scoreA = (weakTopicNames.has(a.topic) ? 3 : 0) + (a.difficulty === 'hard' ? 2 : 1) + (pa && pa.attempts > pa.correct ? 1 : 0);
          const scoreB = (weakTopicNames.has(b.topic) ? 3 : 0) + (b.difficulty === 'hard' ? 2 : 1) + (pb && pb.attempts > pb.correct ? 1 : 0);
          return scoreB - scoreA;
        })
        .slice(0, 6);
      if (priorityPool.length === 0) {
        queueEl.innerHTML = '<div class="empty-state">Answer 5+ questions to unlock your priority queue.</div>';
      } else {
        queueEl.innerHTML = priorityPool.map(q => {
          const p = state.progress[q.id];
          const status = !p || p.attempts === 0 ? 'unseen' : 'wrong';
          return `<div class="priority-q-row">
            <span class="priority-q-badge priority-q-${status}">${status === 'unseen' ? 'NEW' : '✗ Wrong'}</span>
            <span class="priority-q-type">${q.type}</span>
            <span class="priority-q-topic">${escapeHtml(q.topic)}</span>
            <span class="priority-q-diff diff-${q.difficulty}">${q.difficulty}</span>
          </div>`;
        }).join('');
      }
    }

    // Coverage per section
    const coverageEl = document.getElementById('plan-coverage');
    if (coverageEl) {
      const sections = ['Quant', 'Verbal', 'Data Insights'];
      coverageEl.innerHTML = sections.map(sec => {
        const total = state.bank.filter(q => q.section === sec).length;
        const seen  = state.bank.filter(q => q.section === sec && state.progress[q.id]?.attempts > 0).length;
        const pct   = total > 0 ? Math.round(seen / total * 100) : 0;
        const color = pct >= 50 ? 'green' : pct >= 20 ? 'yellow' : 'red';
        return `<div class="coverage-row">
          <div class="coverage-label">${sec}</div>
          <div class="coverage-track">
            <div class="coverage-fill coverage-fill--${color}" style="width:${pct}%"></div>
          </div>
          <div class="coverage-pct">${seen}/${total} (${pct}%)</div>
        </div>`;
      }).join('');
    }
  }

  function renderSession() {
    const s = state.session;
    dom['ss-correct'].textContent = s.correct;
    dom['ss-wrong'].textContent = s.wrong;
    dom['ss-skipped'].textContent = s.skipped;
    const answered = s.correct + s.wrong;
    dom['ss-accuracy'].textContent = answered > 0 ? Math.round(s.correct / answered * 100) + '%' : '—';
    dom['ss-avg-time'].textContent = s.count > 0 ? fmtTime(s.totalTimeSec / s.count) : '—';
  }

  function updateBankSummary() {
    const total = state.bank.length;
    const quant = state.bank.filter(q => q.section === 'Quant').length;
    const verbal = state.bank.filter(q => q.section === 'Verbal').length;
    const di = state.bank.filter(q => q.section === 'Data Insights').length;
    dom['bank-summary'].textContent = `${total} questions · ${quant} Quant · ${verbal} Verbal · ${di} DI`;
  }

  function renderDashboard() {
    const all = Object.values(state.progress);
    const totalAttempts = all.reduce((s, p) => s + (p.attempts || 0), 0);
    const totalCorrect  = all.reduce((s, p) => s + (p.correct  || 0), 0);
    const seenIds = Object.keys(state.progress).filter(id => state.progress[id].attempts > 0);
    const totalTime = state.attempts.reduce((s, a) => s + (a.timeSec || 0), 0);

    dom['dash-total'].textContent = totalAttempts;
    dom['dash-coverage'].textContent = state.bank.length
      ? Math.round(seenIds.length / state.bank.length * 100) + '%'
      : '0%';
    dom['dash-accuracy'].textContent = totalAttempts > 0
      ? Math.round(totalCorrect / totalAttempts * 100) + '%'
      : '—';
    dom['dash-streak'].textContent = computeStreak();
    dom['dash-avg-time'].textContent = state.attempts.length > 0
      ? fmtTime(totalTime / state.attempts.length)
      : '—';

    renderScorePredictor();
    renderTopicBars();
    renderDifficultyBars();
    renderMastery();
    renderRecords();
    renderSRStatus();
    renderVerbalPerformance();
    renderWeaknessRadar();
    renderStrengthRadar();
    renderConfidenceStats();
    renderTimeAnalytics();
    renderCharts();
    renderSectionRings();
    renderMomentum();
    renderStreakCalendar();
    renderDailyMissions();
    renderSectionBalance();
    renderWeakSpots();
    renderStudyPhase();
  }

  // ─── Study Phase System ────────────────────────────
  // Foundation (0-49% acc OR <50 answered) → Core (50-70% OR <200) → Speed (70%+ AND 200+)
  function computeStudyPhase() {
    const all = Object.values(state.progress);
    const totalAttempts = all.reduce((s, p) => s + (p.attempts || 0), 0);
    const totalCorrect  = all.reduce((s, p) => s + (p.correct  || 0), 0);
    const acc7d = compute7DayAccuracy();
    const acc = totalAttempts > 0 ? totalCorrect / totalAttempts : 0;

    if (totalAttempts < 50 || acc < 0.50) return 'foundation';
    if (totalAttempts < 200 || acc < 0.70) return 'core';
    return 'speed';
  }

  function compute7DayAccuracy() {
    const cutoff = Date.now() - 7 * 24 * 3600 * 1000;
    const recent = state.attempts.filter(a => a.ts && a.ts > cutoff);
    if (recent.length === 0) return null;
    return recent.filter(a => a.wasCorrect).length / recent.length;
  }

  function renderStudyPhase() {
    const banner   = document.getElementById('study-phase-banner');
    const badge    = document.getElementById('phase-badge');
    const label    = document.getElementById('phase-label');
    const desc     = document.getElementById('phase-desc');
    const bar      = document.getElementById('phase-progress-bar');
    const nextEl   = document.getElementById('phase-next');
    if (!banner) return;

    const all = Object.values(state.progress);
    const totalAttempts = all.reduce((s, p) => s + (p.attempts || 0), 0);
    const totalCorrect  = all.reduce((s, p) => s + (p.correct  || 0), 0);
    const acc = totalAttempts > 0 ? totalCorrect / totalAttempts : 0;
    const phase = computeStudyPhase();

    const PHASES = {
      foundation: {
        badge: '🌱 Foundation', label: 'Foundation Phase',
        color: '#10b981',
        desc: 'Focus on accuracy — get the concepts right before worrying about speed.',
        next: `${Math.round(acc * 100)}% accuracy · ${totalAttempts} answered → need 50% acc + 50 questions for Core`,
        pct: Math.min(100, (acc / 0.50) * 50 + (totalAttempts / 50) * 50) / 100,
      },
      core: {
        badge: '⚙️ Core', label: 'Core Phase',
        color: '#3b82f6',
        desc: 'Build accuracy + pacing together. Aim for 70%+ accuracy across 200 questions.',
        next: `${Math.round(acc * 100)}% / 70% accuracy · ${totalAttempts} / 200 answered → need both for Speed`,
        pct: Math.min(1, ((acc - 0.50) / 0.20 + (totalAttempts - 50) / 150) / 2),
      },
      speed: {
        badge: '🚀 Speed', label: 'Speed Phase',
        color: '#f59e0b',
        desc: 'You\'re in peak mode — use Challenge Mode and timed exam simulations to sharpen your edge.',
        next: 'Keep accuracy above 70% while drilling hard questions at pace.',
        pct: 1,
      },
    };

    const p = PHASES[phase];
    banner.dataset.phase = phase;
    if (badge)  badge.textContent  = p.badge;
    if (label)  label.textContent  = p.label;
    if (desc)   desc.textContent   = p.desc;
    if (nextEl) nextEl.textContent = p.next;
    if (bar) {
      bar.style.width = Math.round(p.pct * 100) + '%';
      bar.style.background = p.color;
    }
    banner.style.borderLeftColor = p.color;
  }

  // ─── Weekly Streak Calendar ───────────────────────
  function renderStreakCalendar() {
    const grid = document.getElementById('streak-calendar-grid');
    if (!grid) return;
    const today = new Date();
    const goal = getDailyGoal();
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const k = dateKey(d);
      const day = state.daily[k] || { count: 0, correct: 0 };
      const pct = goal > 0 ? Math.min(1, (day.count || 0) / goal) : 0;
      const isToday = i === 0;
      const label = d.toLocaleDateString(undefined, { weekday: 'short' });
      const dateNum = d.getDate();
      days.push({ k, day, pct, isToday, label, dateNum, count: day.count || 0, correct: day.correct || 0 });
    }
    grid.innerHTML = days.map(d => {
      const intensity = d.pct >= 1 ? 4 : d.pct >= 0.66 ? 3 : d.pct >= 0.33 ? 2 : d.count > 0 ? 1 : 0;
      const acc = d.count > 0 ? Math.round(d.correct / d.count * 100) : null;
      const tooltip = d.count > 0
        ? `${d.label} ${d.dateNum}: ${d.count} questions, ${acc}% acc`
        : `${d.label} ${d.dateNum}: no practice`;
      return `<div class="streak-cal-cell streak-cal-cell--${intensity}${d.isToday ? ' streak-cal-cell--today' : ''}" title="${tooltip}">
        <div class="streak-cal-day">${d.label.charAt(0)}</div>
        <div class="streak-cal-num">${d.dateNum}</div>
        ${d.count > 0 ? `<div class="streak-cal-count">${d.count}</div>` : ''}
      </div>`;
    }).join('');
  }

  function renderSectionRings() {
    const SECTION_MAP = { Quant: 'quant', Verbal: 'verbal', 'Data Insights': 'di' };
    const stats = { quant: { a: 0, c: 0 }, verbal: { a: 0, c: 0 }, di: { a: 0, c: 0 } };
    state.bank.forEach(q => {
      const key = SECTION_MAP[q.section];
      if (!key) return;
      const p = state.progress[q.id];
      if (!p || !p.attempts) return;
      stats[key].a += p.attempts;
      stats[key].c += p.correct || 0;
    });
    const CIRC = 2 * Math.PI * 32; // 201.1 for r=32
    ['quant', 'verbal', 'di'].forEach(key => {
      const s = stats[key];
      const arc = document.getElementById('ring-arc-' + key);
      const pctEl = document.getElementById('ring-pct-' + key);
      const subEl = document.getElementById('ring-sub-' + key);
      if (!arc || !pctEl) return;
      if (s.a === 0) {
        arc.style.strokeDashoffset = CIRC;
        pctEl.textContent = '—';
        if (subEl) subEl.textContent = 'no data yet';
      } else {
        const pct = Math.round(s.c / s.a * 100);
        const offset = CIRC * (1 - pct / 100);
        arc.style.strokeDashoffset = offset;
        pctEl.textContent = pct + '%';
        if (subEl) subEl.textContent = s.c + ' / ' + s.a + ' correct';
      }
    });
  }

  function renderWeekGrid() {
    const cont = document.getElementById('plan-week-grid');
    if (!cont) return;
    const today = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const goal = getDailyGoal();
    const topicStats = {};
    state.bank.forEach(q => {
      const t = canonicalTopic(q.topic);
      if (!topicStats[t]) topicStats[t] = { a: 0, c: 0, section: q.section };
      const p = state.progress[q.id];
      if (p) { topicStats[t].a += p.attempts || 0; topicStats[t].c += p.correct || 0; }
    });
    const weakTopics = Object.entries(topicStats)
      .filter(([, v]) => v.a >= 3 && (v.c / v.a) < 0.5)
      .sort((a, b) => (a[1].c / a[1].a) - (b[1].c / b[1].a));
    const sectionFocus = ['Quant', 'Verbal', 'Data Insights', 'Quant', 'Verbal', 'Data Insights', 'Mixed'];
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - today.getDay() + i); // start of week (Sun)
      const k = dateKey(d);
      const count = state.daily[k]?.count || 0;
      const done = count >= goal;
      const isToday = dateKey(d) === dateKey(today);
      const isPast = d < today && !isToday;
      const section = sectionFocus[i];
      const topicHint = weakTopics.find(([, v]) => v.section === section || section === 'Mixed')?.[0] || section;
      days.push({ name: dayNames[d.getDay()], date: d.getDate(), k, count, done, isToday, isPast, section, topicHint });
    }
    cont.innerHTML = `<div class="week-grid">${days.map(d => `
      <div class="week-grid-day ${d.done ? 'week-day--done' : d.isToday ? 'week-day--today' : d.isPast ? 'week-day--missed' : ''}">
        <div class="week-day-name">${d.name}</div>
        <div class="week-day-date">${d.date}</div>
        <div class="week-day-section">${d.section === 'Data Insights' ? 'DI' : d.section}</div>
        <div class="week-day-topic">${escapeHtml(d.topicHint.slice(0, 12))}</div>
        <div class="week-day-count">${d.done ? '✓' : d.count > 0 ? d.count : '—'}</div>
      </div>`).join('')}</div>`;
  }

  function renderSectionBalance() {
    const cont = document.getElementById('section-balance-bar');
    if (!cont) return;
    const SECTION_MAP = { Quant: 'quant', Verbal: 'verbal', 'Data Insights': 'di' };
    const counts = { quant: 0, verbal: 0, di: 0 };
    state.attempts.forEach(a => {
      const q = state.bank.find(x => x.id === a.qid);
      if (!q) return;
      const k = SECTION_MAP[q.section];
      if (k) counts[k]++;
    });
    const total = counts.quant + counts.verbal + counts.di;
    if (total < 10) { cont.innerHTML = ''; return; }
    const pq = Math.round(counts.quant / total * 100);
    const pv = Math.round(counts.verbal / total * 100);
    const pd = 100 - pq - pv;
    const warn = (pq < 20 || pv < 20 || pd < 15);
    const msg = warn
      ? `⚠ ${pq < 20 ? 'Quant' : pv < 20 ? 'Verbal' : 'Data Insights'} under-practiced — aim for ~40% Quant, ~40% Verbal, ~20% DI.`
      : '✓ Good section balance — keep it up.';
    cont.innerHTML = `
      <div class="balance-bars">
        <div class="balance-bar balance-bar--quant" style="width:${pq}%" title="Quant: ${pq}%"></div>
        <div class="balance-bar balance-bar--verbal" style="width:${pv}%" title="Verbal: ${pv}%"></div>
        <div class="balance-bar balance-bar--di" style="width:${pd}%" title="DI: ${pd}%"></div>
      </div>
      <div class="balance-labels">
        <span>Q ${pq}%</span><span>V ${pv}%</span><span>DI ${pd}%</span>
      </div>
      <div class="balance-msg ${warn ? 'balance-msg--warn' : 'balance-msg--ok'}">${msg}</div>`;
  }

  // ─── Weak Spots Widget ────────────────────────────
  function renderWeakSpots() {
    const cont = document.getElementById('weak-spots-list');
    if (!cont) return;
    const topicStats = {};
    state.attempts.filter(a => a.kind !== 'skipped').forEach(a => {
      const q = state.bank.find(x => x.id === a.qid);
      if (!q) return;
      const t = canonicalTopic(q.topic);
      if (!topicStats[t]) topicStats[t] = { correct: 0, total: 0 };
      topicStats[t].total++;
      if (a.wasCorrect) topicStats[t].correct++;
    });
    const weak = Object.entries(topicStats)
      .filter(([, v]) => v.total >= 3)
      .map(([topic, v]) => ({ topic, acc: v.correct / v.total, total: v.total }))
      .sort((a, b) => a.acc - b.acc)
      .slice(0, 3);
    const section = document.getElementById('weak-spots-section');
    if (weak.length === 0) {
      if (section) section.hidden = true;
      return;
    }
    if (section) section.hidden = false;
    cont.innerHTML = weak.map(({ topic, acc, total }) => {
      const pct = Math.round(acc * 100);
      const cls = pct < 40 ? 'weak-spot--critical' : pct < 60 ? 'weak-spot--warn' : 'weak-spot--ok';
      return `<div class="weak-spot-item ${cls}">
        <div class="weak-spot-info">
          <span class="weak-spot-topic">${escapeHtml(topic)}</span>
          <span class="weak-spot-stats">${pct}% correct (${total} attempts)</span>
        </div>
        <div class="weak-spot-bar-wrap">
          <div class="weak-spot-bar" style="width:${pct}%"></div>
        </div>
        <button class="btn btn-secondary weak-spot-drill" data-topic="${escapeHtml(topic)}">Drill</button>
      </div>`;
    }).join('');
    cont.querySelectorAll('.weak-spot-drill').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.topic;
        if (dom['filter-topic']) dom['filter-topic'].value = t;
        state.filters.topic = t;
        if (dom['filter-mode']) dom['filter-mode'].value = 'weak';
        state.filters.mode = 'weak';
        switchTab('practice');
        nextQuestion();
      });
    });
  }

  // ─── Time Analytics ───────────────────────────────
  function renderTimeAnalytics() {
    const cont = document.getElementById('time-analytics');
    if (!cont) return;
    // Target times per GMAT Focus: 2:00 per Quant, 1:50 per Verbal, 2:30 per DI
    const TARGETS = { PS: 120, DS: 120, CR: 110, SC: 90, RC: 90, TPA: 150, TA: 150, GI: 150, MSR: 180 };
    const labels  = { PS: 'Problem Solving', DS: 'Data Sufficiency', CR: 'Critical Reasoning', SC: 'Sentence Correction', RC: 'Reading Comprehension', TPA: 'Two-Part Analysis', TA: 'Table Analysis', GI: 'Graphics Interp.', MSR: 'Multi-Source Reasoning' };
    const stats = {};
    Object.keys(TARGETS).forEach(t => { stats[t] = { count: 0, total: 0 }; });

    state.attempts.forEach(a => {
      const q = state.bank.find(qq => qq.id === a.qid);
      if (!q || !stats[q.type] || !a.timeSec) return;
      stats[q.type].count++;
      stats[q.type].total += a.timeSec;
    });

    const hasData = Object.values(stats).some(s => s.count > 0);
    if (!hasData) {
      cont.innerHTML = '<div class="empty-state-msg">Answer questions to see time management data.</div>';
      return;
    }

    cont.innerHTML = '';
    Object.entries(stats).forEach(([type, s]) => {
      if (s.count === 0) return;
      const avg = s.total / s.count;
      const target = TARGETS[type];
      const ratio = avg / target;
      const cls = ratio <= 0.85 ? 'fast' : ratio <= 1.1 ? 'on-target' : 'slow';
      const icon = ratio <= 0.85 ? '🟢' : ratio <= 1.1 ? '🟡' : '🔴';
      const pctOfTarget = Math.round(ratio * 100);
      const row = document.createElement('div');
      row.className = 'time-analytics-row';
      row.innerHTML = `
        <div class="time-analytics-type">${icon} ${labels[type]}</div>
        <div class="time-analytics-bar-wrap">
          <div class="time-analytics-bar ${cls}" style="width: ${Math.min(200, pctOfTarget)}%"></div>
          <div class="time-analytics-target-line"></div>
        </div>
        <div class="time-analytics-value">${fmtTime(avg)} <span class="time-analytics-target">target: ${fmtTime(target)}</span></div>
      `;
      cont.appendChild(row);
    });
  }

  // ─── Strength Radar ───────────────────────────────
  function renderStrengthRadar() {
    const cont = document.getElementById('strength-radar');
    if (!cont) return;
    const topicMap = {};
    state.bank.forEach(q => {
      if (!topicMap[q.topic]) topicMap[q.topic] = { attempts: 0, correct: 0 };
      const p = state.progress[q.id];
      if (!p) return;
      topicMap[q.topic].attempts += p.attempts || 0;
      topicMap[q.topic].correct  += p.correct  || 0;
    });
    const strong = Object.entries(topicMap)
      .filter(([, s]) => s.attempts >= 3 && s.correct / s.attempts >= 0.75)
      .map(([topic, s]) => ({ topic, attempts: s.attempts, correct: s.correct, acc: Math.round(s.correct / s.attempts * 100) }))
      .sort((a, b) => b.acc - a.acc || b.attempts - a.attempts)
      .slice(0, 3);
    if (strong.length === 0) {
      cont.innerHTML = '<div class="strength-radar-empty">Answer 3+ questions per topic to see your strengths.</div>';
      return;
    }
    cont.innerHTML = '';
    strong.forEach(({ topic, attempts, correct, acc }) => {
      const card = document.createElement('div');
      card.className = 'strength-card';
      card.innerHTML = `
        <div class="strength-card-info">
          <div class="strength-card-topic">${escapeHtml(topic)}</div>
          <div class="strength-card-stat">${correct}/${attempts} correct</div>
        </div>
        <div class="strength-pct">${acc}%</div>`;
      cont.appendChild(card);
    });
  }

  // ─── Confidence Stats ─────────────────────────────
  function renderConfidenceStats() {
    const cont = document.getElementById('confidence-stats');
    if (!cont) return;
    const tagged = state.attempts.filter(a => a.confidence);
    if (tagged.length === 0) {
      cont.innerHTML = '<p class="empty-state-msg">Tag your confidence after answering to see insights here.</p>';
      return;
    }
    const counts = { sure: 0, unsure: 0, guessed: 0 };
    const correct = { sure: 0, unsure: 0, guessed: 0 };
    tagged.forEach(a => {
      counts[a.confidence] = (counts[a.confidence] || 0) + 1;
      if (a.wasCorrect) correct[a.confidence] = (correct[a.confidence] || 0) + 1;
    });
    const chip = (key, label, icon) => {
      const n = counts[key] || 0;
      const c = correct[key] || 0;
      const acc = n > 0 ? Math.round(c / n * 100) : 0;
      return `<div class="conf-stat-chip conf-${key}">
        ${icon} ${label}: ${n} <span style="font-weight:400;opacity:0.8">(${acc}% correct)</span>
      </div>`;
    };
    const sureAcc   = counts.sure   > 0 ? correct.sure   / counts.sure   : null;
    const guessAcc  = counts.guessed> 0 ? correct.guessed/ counts.guessed: null;
    // Calibration alerts
    let calibrationMsg = '';
    if (sureAcc !== null && counts.sure >= 5 && sureAcc < 0.70) {
      calibrationMsg += `<div class="calibration-alert calibration-alert--overconfident">⚠ Overconfidence: ${Math.round(sureAcc*100)}% accuracy on "Sure" answers. Trust your gut less — re-read the stem before committing.</div>`;
    }
    if (guessAcc !== null && counts.guessed >= 5 && guessAcc >= 0.70) {
      calibrationMsg += `<div class="calibration-alert calibration-alert--underconfident">💡 Underconfidence: ${Math.round(guessAcc*100)}% accuracy even when guessing. Trust yourself more!</div>`;
    }
    cont.innerHTML = `
      <div class="dash-section-title">Confidence Breakdown</div>
      <div class="confidence-stats-row">
        ${chip('sure', 'Sure', '✓')}
        ${chip('unsure', 'Unsure', '~')}
        ${chip('guessed', 'Guessed', '?')}
      </div>
      ${calibrationMsg}`;
  }

  // ─── Weakness Radar ───────────────────────────────
  function renderWeaknessRadar() {
    const cont = document.getElementById('weakness-radar');
    if (!cont) return;

    // Collect per-topic stats
    const topicMap = {};
    state.bank.forEach(q => {
      if (!topicMap[q.topic]) topicMap[q.topic] = { attempts: 0, correct: 0 };
      const p = state.progress[q.id];
      if (!p) return;
      topicMap[q.topic].attempts += p.attempts || 0;
      topicMap[q.topic].correct  += p.correct  || 0;
    });

    // Filter: < 50% accuracy AND >= 5 attempts
    const weak = Object.entries(topicMap)
      .filter(([, s]) => s.attempts >= 5 && s.correct / s.attempts < 0.5)
      .map(([topic, s]) => ({ topic, attempts: s.attempts, correct: s.correct, acc: Math.round(s.correct / s.attempts * 100) }))
      .sort((a, b) => a.acc - b.acc)
      .slice(0, 3);

    if (weak.length === 0) {
      cont.innerHTML = '<div class="weakness-radar-empty">No weak areas detected yet — answer 5+ questions per topic to see your radar.</div>';
      return;
    }

    cont.innerHTML = '';
    weak.forEach(({ topic, attempts, correct, acc }) => {
      const card = document.createElement('div');
      card.className = 'weakness-card';
      card.innerHTML = `
        <div class="weakness-card-info">
          <div class="weakness-card-topic">${escapeHtml(topic)}</div>
          <div class="weakness-card-stat">${acc}% accuracy · ${correct}/${attempts} correct</div>
        </div>
        <button class="weakness-card-btn" data-topic="${escapeHtml(topic)}">Practice Now</button>`;
      card.querySelector('button').addEventListener('click', () => {
        // Switch to Practice tab and set topic filter
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === 'practice'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-practice'));
        const topicSel = document.getElementById('filter-topic');
        if (topicSel) {
          topicSel.value = topic;
          topicSel.dispatchEvent(new Event('change'));
        }
      });
      cont.appendChild(card);
    });
  }

  // ─── Verbal Performance Panel ────────────────────
  function renderVerbalPerformance() {
    const cont = dom['dash-verbal-bars'];
    if (!cont) return;
    const types = ['CR', 'SC', 'RC'];
    const stats = {};
    types.forEach(t => { stats[t] = { attempts: 0, correct: 0, total: 0 }; });
    state.bank.forEach(q => {
      if (!stats[q.type]) return;
      stats[q.type].total++;
      const p = state.progress[q.id];
      if (p) {
        stats[q.type].attempts += p.attempts || 0;
        stats[q.type].correct  += p.correct  || 0;
      }
    });
    const labels = {
      CR: 'Critical Reasoning',
      SC: 'Sentence Correction',
      RC: 'Reading Comprehension',
    };
    const totalAttempted = types.reduce((s, t) => s + stats[t].attempts, 0);
    if (totalAttempted === 0) {
      cont.innerHTML = '<div class="empty-state">Answer Verbal questions (CR / SC / RC) to see your performance.</div>';
      return;
    }
    cont.innerHTML = '';
    types.forEach(t => {
      const v = stats[t];
      const pct = v.attempts > 0 ? Math.round(v.correct / v.attempts * 100) : 0;
      const cls = v.attempts === 0 ? 'mid' : pct >= 75 ? 'high' : pct >= 50 ? 'mid' : 'low';
      const div = document.createElement('div');
      div.className = 'topic-bar topic-bar--verbal';
      div.dataset.vtype = t;
      const valueLbl = v.attempts > 0 ? `${pct}% · ${v.correct}/${v.attempts}` : 'No attempts yet';
      div.innerHTML = `
        <div class="topic-bar-label" title="${labels[t]}"><span class="verbal-tag verbal-tag-${t}">${t}</span> ${labels[t]}</div>
        <div class="topic-bar-track"><div class="topic-bar-fill ${cls}" style="width: ${pct}%"></div></div>
        <div class="topic-bar-value">${valueLbl}</div>
      `;
      cont.appendChild(div);
    });
  }

  // ─── Topic Mastery Panel ───────────────────────
  function renderMastery() {
    const cont = dom['dash-mastery-grid'];
    if (!cont) return;
    cont.innerHTML = '';
    const stats = {};
    state.bank.forEach(q => {
      if (!stats[q.topic]) stats[q.topic] = { attempts: 0, correct: 0 };
      const p = state.progress[q.id];
      if (p) {
        stats[q.topic].attempts += p.attempts || 0;
        stats[q.topic].correct  += p.correct  || 0;
      }
    });
    const topics = Object.keys(stats).sort();
    if (topics.length === 0 || topics.every(t => stats[t].attempts === 0)) {
      cont.innerHTML = '<div class="empty-state">Answer 5+ questions per topic to start earning stars.</div>';
      return;
    }
    const palette = ['green', 'blue', 'orange', 'purple'];
    topics.forEach((topic, i) => {
      const v = stats[topic];
      // Star formula: only after 5+ attempts; stars = floor(min(acc%/20, 5))
      let stars = 0;
      let accLabel = '—';
      if (v.attempts >= 5) {
        const acc = (v.correct / v.attempts) * 100;
        stars = Math.max(0, Math.min(5, Math.floor(acc / 20)));
        accLabel = Math.round(acc) + '%';
      }
      const color = palette[i % palette.length];
      const card = document.createElement('div');
      card.className = `mastery-card mastery-${color}`;
      const starRow = Array.from({ length: 5 }, (_, idx) =>
        `<span class="mastery-star${idx < stars ? ' filled' : ''}">${idx < stars ? '★' : '☆'}</span>`
      ).join('');
      card.innerHTML = `
        <div class="mastery-card-head">
          <span class="mastery-topic">${escapeHtml(topic)}</span>
          <span class="mastery-acc">${accLabel}</span>
        </div>
        <div class="mastery-stars">${starRow}</div>
        <div class="mastery-stat">${v.correct}/${v.attempts} correct</div>
      `;
      cont.appendChild(card);
    });
  }

  // ─── Personal Records ──────────────────────────
  function renderRecords() {
    const cont = dom['dash-records-row'];
    if (!cont) return;
    const totalTime = state.attempts.reduce((s, a) => s + (a.timeSec || 0), 0);
    const totalH = Math.floor(totalTime / 3600);
    const totalM = Math.floor((totalTime % 3600) / 60);
    const totalTimeStr = totalH > 0 ? `${totalH}:${String(totalM).padStart(2, '0')}` : `${totalM}m`;
    const recs = [
      { icon: '🔥', label: 'Best Streak',     value: state.bestStreakCorrect || 0,                                       color: 'orange' },
      { icon: '⚡', label: 'Fastest Correct', value: state.fastestCorrectSec != null ? fmtTime(state.fastestCorrectSec) : '—', color: 'yellow' },
      { icon: '🎯', label: 'Best Session Acc',value: state.bestSessionAcc != null ? state.bestSessionAcc + '%' : '—',     color: 'green' },
      { icon: '💰', label: 'Most XP / Day',   value: state.mostXpInDay || 0,                                              color: 'purple' },
      { icon: '⏱', label: 'Total Studied',    value: totalTimeStr,                                                        color: 'blue' },
    ];
    cont.innerHTML = recs.map(r => `
      <div class="record-card record-${r.color}">
        <div class="record-icon">${r.icon}</div>
        <div class="record-value">${escapeHtml(String(r.value))}</div>
        <div class="record-label">${escapeHtml(r.label)}</div>
      </div>
    `).join('');
  }

  // ─── Progress Export ───────────────────────────
  function buildProgressCard() {
    const all = Object.values(state.progress);
    const totalAttempts = all.reduce((s, p) => s + (p.attempts || 0), 0);
    const totalCorrect  = all.reduce((s, p) => s + (p.correct  || 0), 0);
    const acc = totalAttempts > 0 ? Math.round(totalCorrect / totalAttempts * 100) : 0;
    const streak = computeStreak();

    // Topic breakdown
    const stats = {};
    state.bank.forEach(q => {
      if (!stats[q.topic]) stats[q.topic] = { a: 0, c: 0 };
      const p = state.progress[q.id];
      if (p) { stats[q.topic].a += p.attempts || 0; stats[q.topic].c += p.correct || 0; }
    });
    const rows = Object.entries(stats)
      .filter(([, v]) => v.a >= 3)
      .map(([t, v]) => ({ topic: t, acc: Math.round(v.c / v.a * 100), a: v.a }))
      .sort((x, y) => y.acc - x.acc);
    const top3 = rows.slice(0, 3);
    const weakest = rows.length > 0 ? rows[rows.length - 1] : null;

    const lines = [];
    lines.push('🎯 GMAT Math Trainer — Progress Card');
    lines.push('');
    lines.push(`⭐  Level ${state.level}  ·  ${state.xp} XP`);
    lines.push(`✓  ${totalAttempts} questions answered  ·  ${acc}% accuracy`);
    lines.push(`⚡  ${streak}-day streak  ·  Best run: ${state.bestStreakCorrect || 0} in a row`);
    lines.push('');
    if (top3.length > 0) {
      lines.push('🏆 Top topics:');
      top3.forEach((r, i) => {
        lines.push(`   ${i + 1}. ${r.topic} — ${r.acc}%`);
      });
    }
    if (weakest && (top3.length === 0 || weakest.topic !== top3[0].topic)) {
      lines.push('');
      lines.push(`📚 Working on: ${weakest.topic} (${weakest.acc}%)`);
    }
    return lines.join('\n');
  }

  function exportProgress() {
    const card = buildProgressCard();
    const previewEl = dom['export-preview'];
    if (previewEl) {
      previewEl.textContent = card;
      previewEl.hidden = false;
    }
    // Try clipboard
    const finish = (ok) => {
      showToast({
        icon: ok ? '📋' : '📝',
        label: ok ? 'Copied!' : 'Preview shown',
        title: ok ? 'Progress card copied' : 'Could not copy — text shown below',
        desc: ok ? 'Paste anywhere to share.' : 'Select and copy manually.',
      });
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(card).then(() => finish(true)).catch(() => finish(false));
    } else {
      finish(false);
    }
  }

  function renderTopicBars() {
    const cont = dom['dash-topic-bars'];
    cont.innerHTML = '';
    const stats = {};
    state.bank.forEach(q => {
      if (!stats[q.topic]) stats[q.topic] = { attempts: 0, correct: 0, total: 0 };
      stats[q.topic].total++;
      const p = state.progress[q.id];
      if (p) {
        stats[q.topic].attempts += p.attempts;
        stats[q.topic].correct  += p.correct;
      }
    });
    const rows = Object.entries(stats)
      .filter(([, v]) => v.attempts > 0)
      .sort((a, b) => (a[1].correct/a[1].attempts) - (b[1].correct/b[1].attempts));
    if (rows.length === 0) {
      cont.innerHTML = '<div class="empty-state">Answer some questions to see your weak areas.</div>';
      return;
    }
    rows.forEach(([topic, v]) => {
      const pct = Math.round(v.correct / v.attempts * 100);
      const cls = pct >= 75 ? 'high' : pct >= 50 ? 'mid' : 'low';
      const div = document.createElement('div');
      div.className = 'topic-bar';
      div.innerHTML = `
        <div class="topic-bar-label" title="${topic}">${topic}</div>
        <div class="topic-bar-track"><div class="topic-bar-fill ${cls}" style="width: ${pct}%"></div></div>
        <div class="topic-bar-value">${pct}% · ${v.correct}/${v.attempts}</div>
      `;
      cont.appendChild(div);
    });
  }

  function renderDifficultyBars() {
    const cont = dom['dash-difficulty-bars'];
    cont.innerHTML = '';
    const stats = { easy: { a: 0, c: 0 }, medium: { a: 0, c: 0 }, hard: { a: 0, c: 0 } };
    state.bank.forEach(q => {
      const p = state.progress[q.id];
      if (!p) return;
      if (!stats[q.difficulty]) return;
      stats[q.difficulty].a += p.attempts;
      stats[q.difficulty].c += p.correct;
    });
    const any = Object.values(stats).some(s => s.a > 0);
    if (!any) {
      cont.innerHTML = '<div class="empty-state">No data yet.</div>';
      return;
    }
    Object.entries(stats).forEach(([level, v]) => {
      if (v.a === 0) return;
      const pct = Math.round(v.c / v.a * 100);
      const cls = pct >= 75 ? 'high' : pct >= 50 ? 'mid' : 'low';
      const div = document.createElement('div');
      div.className = 'topic-bar';
      div.innerHTML = `
        <div class="topic-bar-label">${level.charAt(0).toUpperCase() + level.slice(1)}</div>
        <div class="topic-bar-track"><div class="topic-bar-fill ${cls}" style="width: ${pct}%"></div></div>
        <div class="topic-bar-value">${pct}% · ${v.c}/${v.a}</div>
      `;
      cont.appendChild(div);
    });
  }

  function renderSRStatus() {
    const now = Date.now();
    const all = Object.values(state.progress);
    const due = all.filter(p => p.srNextDue && p.srNextDue <= now).length;
    const total = all.filter(p => p.srNextDue).length;
    dom['dash-sr-due'].textContent = due;
    dom['dash-sr-total'].textContent = total;
    if (dom['btn-start-sr-review']) dom['btn-start-sr-review'].hidden = (due === 0);
    // Show next 7-day SR forecast in the SR panel if it exists
    const forecast = document.getElementById('sr-forecast');
    if (!forecast) return;
    const days = [0,1,2,3,4,5,6];
    const buckets = days.map(d => {
      const start = now + d * 86400000;
      const end   = start + 86400000;
      return all.filter(p => p.srNextDue && p.srNextDue >= start && p.srNextDue < end).length;
    });
    const maxB = Math.max(...buckets, 1);
    forecast.innerHTML = buckets.map((count, d) => {
      const label = d === 0 ? 'Today' : d === 1 ? 'Tmrw' : `+${d}d`;
      const h = Math.round((count / maxB) * 40);
      return `<div class="sr-forecast-col">
        <div class="sr-forecast-bar" style="height:${h}px">${count > 0 ? count : ''}</div>
        <div class="sr-forecast-label">${label}</div>
      </div>`;
    }).join('');
  }

  // ─── Chart.js dashboards ────────────────────────
  const _charts = {};

  function destroyChart(id) {
    if (_charts[id]) { _charts[id].destroy(); delete _charts[id]; }
  }

  function chartColors() {
    return {
      green:  '#58CC02', greenBg: 'rgba(88,204,2,0.18)',
      red:    '#FF4B4B', redBg:   'rgba(255,75,75,0.18)',
      blue:   '#1CB0F6', blueBg:  'rgba(28,176,246,0.18)',
      yellow: '#FFC800', yellowBg:'rgba(255,200,0,0.18)',
      orange: '#FF9600', orangeBg:'rgba(255,150,0,0.18)',
      purple: '#CE82FF', purpleBg:'rgba(206,130,255,0.18)',
      text:   getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#3c3c3c',
      grid:   getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#e5e5e5',
    };
  }

  function renderCharts() {
    if (typeof Chart === 'undefined') return;
    renderDailyChart();
    renderDifficultyDonut();
    renderTopicAccuracyChart();
    renderScoreHistoryChart();
  }

  function renderDailyChart() {
    const c = document.getElementById('chart-daily');
    if (!c) return;
    destroyChart('daily');
    const col = chartColors();

    const labels = [];
    const correctData = [];
    const wrongData = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const k = dateKey(d);
      const day = state.daily[k] || { count: 0, correct: 0 };
      labels.push(i === 0 ? 'Today' : d.toLocaleDateString(undefined, { weekday: 'short' }));
      correctData.push(day.correct || 0);
      wrongData.push((day.count || 0) - (day.correct || 0));
    }

    _charts['daily'] = new Chart(c, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Correct', data: correctData, backgroundColor: col.green, borderRadius: 6, borderSkipped: false },
          { label: 'Wrong',   data: wrongData,   backgroundColor: col.red,   borderRadius: 6, borderSkipped: false },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: col.text, font: { family: 'Nunito', weight: '700', size: 12 } } } },
        scales: {
          x: { stacked: true, ticks: { color: col.text, font: { family: 'Nunito', size: 11 } }, grid: { color: col.grid } },
          y: { stacked: true, beginAtZero: true, ticks: { color: col.text, font: { family: 'Nunito', size: 11 }, stepSize: 1 }, grid: { color: col.grid } },
        },
      },
    });
  }

  function renderScoreHistoryChart() {
    const c = document.getElementById('chart-score-history');
    const emptyEl = document.getElementById('score-history-empty');
    const wrap = document.getElementById('score-history-wrap');
    if (!c) return;
    destroyChart('scoreHistory');
    if (state.scoreHistory.length < 2) {
      if (emptyEl) emptyEl.hidden = false;
      if (wrap) wrap.hidden = true;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;
    if (wrap) wrap.hidden = false;
    const col = chartColors();
    const labels = state.scoreHistory.map((s, i) => `+${s.attempts}`);
    const data   = state.scoreHistory.map(s => s.score);
    const grad = c.getContext('2d').createLinearGradient(0, 0, 0, 200);
    grad.addColorStop(0, 'rgba(99,102,241,0.35)');
    grad.addColorStop(1, 'rgba(99,102,241,0.02)');
    _charts['scoreHistory'] = new Chart(c, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'GMAT Score Est.',
          data,
          borderColor: '#6366f1',
          backgroundColor: grad,
          borderWidth: 3,
          pointBackgroundColor: '#6366f1',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.35,
          fill: true,
        }],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: col.text, font: { family: 'Nunito', weight: '700', size: 12 } } },
          tooltip: {
            callbacks: {
              label: ctx => `Score: ${ctx.parsed.y}`,
              title: ctx => `After ${ctx[0].label} questions`,
            },
          },
        },
        scales: {
          x: { ticks: { color: col.text, font: { family: 'Nunito', size: 11 } }, grid: { color: col.grid } },
          y: {
            min: 205, max: 805,
            ticks: { color: col.text, font: { family: 'Nunito', size: 11 }, stepSize: 100 },
            grid: { color: col.grid },
          },
        },
      },
    });
  }

  function renderDifficultyDonut() {
    const c = document.getElementById('chart-difficulty-donut');
    if (!c) return;
    destroyChart('donut');
    const col = chartColors();

    const stats = { easy: 0, medium: 0, hard: 0 };
    state.bank.forEach(q => {
      const p = state.progress[q.id];
      if (p && p.attempts > 0) stats[q.difficulty] = (stats[q.difficulty] || 0) + p.attempts;
    });

    const total = stats.easy + stats.medium + stats.hard;
    if (total === 0) {
      destroyChart('donut');
      c.getContext('2d').clearRect(0, 0, c.width, c.height);
      return;
    }

    _charts['donut'] = new Chart(c, {
      type: 'doughnut',
      data: {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [{
          data: [stats.easy, stats.medium, stats.hard],
          backgroundColor: [col.green, col.yellow, col.red],
          borderWidth: 0,
          hoverOffset: 8,
        }],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: { position: 'bottom', labels: { color: col.text, font: { family: 'Nunito', weight: '700', size: 12 }, padding: 14 } },
        },
      },
    });
  }

  function renderTopicAccuracyChart() {
    const c = document.getElementById('chart-topic-accuracy');
    if (!c) return;
    destroyChart('topic');
    const col = chartColors();

    const stats = {};
    state.bank.forEach(q => {
      if (!stats[q.topic]) stats[q.topic] = { a: 0, correct: 0 };
      const p = state.progress[q.id];
      if (p && p.attempts > 0) {
        stats[q.topic].a += p.attempts;
        stats[q.topic].correct += p.correct;
      }
    });

    const rows = Object.entries(stats)
      .filter(([, v]) => v.a > 0)
      .sort((a, b) => (a[1].correct / a[1].a) - (b[1].correct / b[1].a));

    if (rows.length === 0) return;

    const labels = rows.map(([t]) => t);
    const pcts   = rows.map(([, v]) => Math.round(v.correct / v.a * 100));
    const bgColors = pcts.map(p => p >= 75 ? col.green : p >= 50 ? col.yellow : col.red);

    _charts['topic'] = new Chart(c, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Accuracy %',
          data: pcts,
          backgroundColor: bgColors,
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.x}% accuracy` } },
        },
        scales: {
          x: { beginAtZero: true, max: 100, ticks: { color: col.text, font: { family: 'Nunito', size: 11 }, callback: v => v + '%' }, grid: { color: col.grid } },
          y: { ticks: { color: col.text, font: { family: 'Nunito', size: 11 } }, grid: { color: col.grid } },
        },
      },
    });
  }

  function renderReview() {
    renderReviewAttempts();
    renderReviewStats();
  }

  function renderReviewAttempts() {
    const cont = dom['review-list'];
    if (!cont) return;
    cont.innerHTML = '';
    const filter = dom['review-filter'].value;
    let items = state.attempts;
    if (filter !== 'all') items = items.filter(a => a.kind === filter);
    if (items.length === 0) {
      const msg = state.attempts.length === 0
        ? 'No attempts yet. Start practicing on the Practice tab.'
        : `No ${filter} attempts. Try a different filter.`;
      cont.innerHTML = `<div class="empty-state">${escapeHtml(msg)}</div>`;
      return;
    }
    items.slice(0, 50).forEach(a => {
      const q = state.bank.find(qq => qq.id === a.qid);
      if (!q) return;
      const div = document.createElement('div');
      div.className = 'review-item ' + a.kind;
      const when = new Date(a.ts).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
      const status = a.kind === 'correct' ? '✓ Correct' : a.kind === 'skipped' ? '⊘ Skipped' : '✗ Wrong';
      const picked = a.picked ? `Picked ${a.picked}` : 'Skipped';
      const confMap = { sure: '✓ Sure', unsure: '~ Unsure', guessed: '? Guessed' };
      const confBadge = a.confidence
        ? `<span class="conf-badge conf-${a.confidence}">${confMap[a.confidence]}</span>`
        : '';
      div.innerHTML = `
        <div class="review-item-head">
          <strong>${status}</strong>
          ${confBadge}
          <span>·</span>
          <span>${q.type} · ${q.topic} · ${q.difficulty}</span>
          <span>·</span>
          <span>${when}</span>
          <span>·</span>
          <span>${fmtTime(a.timeSec)}</span>
        </div>
        <div class="review-item-q">${escapeHtml(q.question.slice(0, 200))}${q.question.length > 200 ? '…' : ''}</div>
        <div class="review-item-detail">${picked} · Correct answer: <strong>${q.answer}</strong></div>
        <div class="review-item-explanation">${escapeHtml(q.explanation || '')}</div>
        <div class="review-item-actions">
          <button class="btn-retry-mini" data-retry-qid="${q.id}">↺ Retry this question</button>
        </div>
      `;
      cont.appendChild(div);
    });
    // Wire up retry buttons
    cont.querySelectorAll('.btn-retry-mini').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = parseInt(btn.dataset.retryQid, 10);
        retryReviewQuestion(qid);
      });
    });
  }

  function retryReviewQuestion(qid) {
    const q = state.bank.find(x => x.id === qid);
    if (!q) return;
    state.current = q;
    state.submitted = false;
    state.selectedChoice = null;
    stopTimer();
    renderQuestion(q);
    switchTab('practice');
  }

  // ── Review Stats sub-tab ──────────────────────
  function renderReviewStats() {
    renderReviewDonut();
    renderTopicPerformance();
    renderHardestQuestions();
    renderFastestTopic();
    renderTypePacing();
  }

  function renderTypePacing() {
    const cont = document.getElementById('type-pacing-table');
    if (!cont) return;
    const types = Object.keys(GMAT_TARGET_SEC);
    const stats = {};
    state.attempts.forEach(a => {
      if (a.kind === 'skipped' || a.timeSec == null) return;
      const q = state.bank.find(x => x.id === a.qid);
      if (!q || !q.type) return;
      if (!stats[q.type]) stats[q.type] = { sum: 0, count: 0 };
      stats[q.type].sum += a.timeSec;
      stats[q.type].count++;
    });
    const rows = types.map(t => ({ type: t, target: GMAT_TARGET_SEC[t], ...stats[t] }))
      .filter(r => r.count >= 1);
    if (rows.length === 0) {
      cont.innerHTML = '<div class="empty-state">Answer questions to see pacing by type.</div>';
      return;
    }
    cont.innerHTML = rows.map(r => {
      const avg = r.sum / r.count;
      const ratio = avg / r.target;
      const cls = ratio <= 0.9 ? 'pace--fast' : ratio <= 1.1 ? 'pace--ok' : 'pace--slow';
      const icon = ratio <= 0.9 ? '⚡' : ratio <= 1.1 ? '✓' : '⏳';
      const pct = Math.min(100, Math.round(ratio * 100));
      return `<div class="type-pacing-row">
        <div class="type-pacing-label">${escapeHtml(r.type)}</div>
        <div class="type-pacing-bar-wrap">
          <div class="type-pacing-bar ${cls}" style="width:${Math.min(150,pct)}%"></div>
          <div class="type-pacing-target-line"></div>
        </div>
        <div class="type-pacing-val">${icon} ${fmtTime(avg)} <span class="type-pacing-target">/ ${fmtTime(r.target)}</span></div>
      </div>`;
    }).join('');
  }

  function renderReviewDonut() {
    const c = document.getElementById('chart-review-donut');
    if (!c) return;
    if (typeof Chart === 'undefined') return;
    destroyChart('reviewDonut');
    const col = chartColors();
    const counts = { correct: 0, wrong: 0, skipped: 0 };
    state.attempts.forEach(a => { if (counts[a.kind] != null) counts[a.kind]++; });
    const total = counts.correct + counts.wrong + counts.skipped;
    if (total === 0) {
      c.getContext('2d').clearRect(0, 0, c.width, c.height);
      return;
    }
    _charts['reviewDonut'] = new Chart(c, {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Wrong', 'Skipped'],
        datasets: [{
          data: [counts.correct, counts.wrong, counts.skipped],
          backgroundColor: [col.green, col.red, col.orange],
          borderWidth: 0,
          hoverOffset: 8,
        }],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: { position: 'bottom', labels: { color: col.text, font: { family: 'Nunito', weight: '700', size: 12 }, padding: 14 } },
        },
      },
    });
  }

  function renderTopicPerformance() {
    const tbody = dom['topic-perf-body'];
    const empty = dom['topic-perf-empty'];
    const tableWrap = tbody && tbody.closest('.topic-perf-table-wrap');
    if (!tbody || !empty) return;
    tbody.innerHTML = '';

    const stats = {};
    state.bank.forEach(q => {
      const t = canonicalTopic(q.topic);
      if (!stats[t]) stats[t] = { attempts: 0, correct: 0 };
      const p = state.progress[q.id];
      if (p) { stats[t].attempts += p.attempts || 0; stats[t].correct += p.correct || 0; }
    });

    // Last-5 trend per topic from attempts log
    const last5ByTopic = {};
    for (const a of state.attempts) {
      const q = state.bank.find(x => x.id === a.qid);
      if (!q) continue;
      if (a.kind === 'skipped') continue; // trend looks at answered only
      const t = canonicalTopic(q.topic);
      if (!last5ByTopic[t]) last5ByTopic[t] = [];
      if (last5ByTopic[t].length < 5) last5ByTopic[t].push(a.kind === 'correct');
    }

    const rows = Object.entries(stats)
      .filter(([, v]) => v.attempts > 0)
      .sort((a, b) => b[1].attempts - a[1].attempts);

    if (rows.length === 0) {
      empty.style.display = '';
      if (tableWrap) {
        const tableEl = tableWrap.querySelector('.topic-perf-table');
        if (tableEl) tableEl.style.display = 'none';
      }
      return;
    }
    empty.style.display = 'none';
    if (tableWrap) {
      const tableEl = tableWrap.querySelector('.topic-perf-table');
      if (tableEl) tableEl.style.display = '';
    }

    rows.forEach(([topic, v]) => {
      const acc = Math.round(v.correct / v.attempts * 100);
      const accCls = acc >= 75 ? 'acc-high' : acc >= 50 ? 'acc-mid' : 'acc-low';
      // Trend: compare last5 accuracy vs overall
      const last5 = last5ByTopic[topic] || [];
      let trendIcon = '→';
      let trendCls = 'trend-flat';
      if (last5.length >= 3) {
        const recentAcc = last5.filter(Boolean).length / last5.length * 100;
        const delta = recentAcc - acc;
        if (delta > 8) { trendIcon = '↑'; trendCls = 'trend-up'; }
        else if (delta < -8) { trendIcon = '↓'; trendCls = 'trend-down'; }
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${escapeHtml(topic)}</td>
        <td>${v.attempts}</td>
        <td class="acc-cell ${accCls}">${acc}%</td>
        <td><span class="trend-arrow ${trendCls}">${trendIcon}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderHardestQuestions() {
    const cont = dom['hardest-list'];
    if (!cont) return;
    const wrong = Object.entries(state.progress)
      .filter(([, p]) => (p.wrong || 0) > 0)
      .map(([id, p]) => ({ id: parseInt(id, 10), wrong: p.wrong, attempts: p.attempts || 0 }))
      .sort((a, b) => b.wrong - a.wrong || b.attempts - a.attempts)
      .slice(0, 5);
    if (wrong.length === 0) {
      cont.innerHTML = '<div class="empty-state">No wrong answers yet — keep practicing.</div>';
      return;
    }
    cont.innerHTML = '';
    wrong.forEach((w, i) => {
      const q = state.bank.find(x => x.id === w.id);
      if (!q) return;
      const div = document.createElement('div');
      div.className = 'hardest-item';
      const snippet = q.question.length > 70 ? q.question.slice(0, 70) + '…' : q.question;
      div.innerHTML = `
        <span class="hardest-rank">${i + 1}.</span>
        <span class="hardest-text" title="${escapeHtml(q.question)}">${escapeHtml(snippet)}</span>
        <span class="hardest-meta">${w.wrong}× wrong</span>
      `;
      div.addEventListener('click', () => retryReviewQuestion(w.id));
      div.style.cursor = 'pointer';
      cont.appendChild(div);
    });
  }

  function renderFastestTopic() {
    const cont = dom['fastest-card'];
    if (!cont) return;
    const totals = {}; // topic -> {sum, count}
    state.attempts.forEach(a => {
      if (a.kind === 'skipped') return;
      if (a.timeSec == null) return;
      const q = state.bank.find(x => x.id === a.qid);
      if (!q) return;
      if (!totals[q.topic]) totals[q.topic] = { sum: 0, count: 0 };
      totals[q.topic].sum += a.timeSec;
      totals[q.topic].count++;
    });
    const rows = Object.entries(totals)
      .filter(([, v]) => v.count >= 3)
      .map(([t, v]) => ({ topic: t, avg: v.sum / v.count, count: v.count }))
      .sort((a, b) => a.avg - b.avg);
    if (rows.length === 0) {
      cont.innerHTML = '<div class="empty-state">Complete a few questions to see your fastest topic.</div>';
      return;
    }
    const f = rows[0];
    cont.innerHTML = `
      <div class="fastest-topic">⚡ ${escapeHtml(f.topic)}</div>
      <div class="fastest-time">avg ${fmtTime(f.avg)} over ${f.count} attempts</div>
    `;
  }

  // ── Settings render & bind ──────────────────────
  function renderSettings() {
    if (dom['set-daily-goal']) {
      dom['set-daily-goal'].value = state.settings.dailyGoal;
      dom['set-daily-goal-val'].textContent = state.settings.dailyGoal;
    }
    if (dom['set-heart-regen']) dom['set-heart-regen'].value = String(state.settings.heartRegenMin);
    if (dom['set-sound']) dom['set-sound'].checked = !!state.soundOn;
    if (dom['set-warn-threshold']) dom['set-warn-threshold'].value = String(state.settings.warnThresholdSec);
    if (dom['set-hard-mode']) dom['set-hard-mode'].checked = !!state.settings.hardMode;
    document.body.classList.toggle('hard-mode', isHardMode());
  }

  function bindSettings() {
    if (dom['set-daily-goal']) {
      dom['set-daily-goal'].addEventListener('input', () => {
        const v = parseInt(dom['set-daily-goal'].value, 10);
        state.settings.dailyGoal = v;
        dom['set-daily-goal-val'].textContent = v;
        save();
        renderDailyGoal();
      });
    }
    if (dom['set-heart-regen']) {
      dom['set-heart-regen'].addEventListener('change', () => {
        state.settings.heartRegenMin = parseInt(dom['set-heart-regen'].value, 10);
        save();
      });
    }
    if (dom['set-sound']) {
      dom['set-sound'].addEventListener('change', () => {
        state.soundOn = !!dom['set-sound'].checked;
        applySoundUi();
        save();
      });
    }
    if (dom['set-warn-threshold']) {
      dom['set-warn-threshold'].addEventListener('change', () => {
        state.settings.warnThresholdSec = parseInt(dom['set-warn-threshold'].value, 10);
        save();
      });
    }
    if (dom['set-hard-mode']) {
      dom['set-hard-mode'].addEventListener('change', () => {
        state.settings.hardMode = !!dom['set-hard-mode'].checked;
        document.body.classList.toggle('hard-mode', isHardMode());
        save();
      });
    }
    if (dom['btn-reset-progress-2']) {
      dom['btn-reset-progress-2'].addEventListener('click', resetProgress);
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  // ─── Duolingo-style celebratory effects ─────────
  function spawnConfetti(count) {
    const colors = ['#58CC02','#1CB0F6','#FFC800','#FF4B4B','#CE82FF','#FF9600'];
    const frag = document.createDocumentFragment();
    const pieces = [];
    const n = count || 25;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size = 6 + Math.random() * 6;
      el.style.cssText =
        `left: ${Math.random() * 100}%;` +
        `background: ${colors[Math.floor(Math.random() * colors.length)]};` +
        `animation-duration: ${0.8 + Math.random() * 1}s;` +
        `animation-delay: ${Math.random() * 0.3}s;` +
        `width: ${size}px;` +
        `height: ${size}px;` +
        `border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};`;
      frag.appendChild(el);
      pieces.push(el);
    }
    document.body.appendChild(frag);
    setTimeout(() => pieces.forEach(p => p.remove()), 2400);
  }

  function spawnXpFloat(text) {
    const card = document.getElementById('question-card');
    if (!card) return;
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = text;
    const rect = card.getBoundingClientRect();
    el.style.left = (rect.left + rect.width / 2) + 'px';
    el.style.top = (rect.top + 24) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }

  // ─── Theme ──────────────────────────────────────
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    save();
  }

  // ─── Reset ──────────────────────────────────────
  function resetProgress() {
    if (!confirm('Reset all progress, attempts, stats, XP, and achievements? This cannot be undone.')) return;
    state.progress = {};
    state.attempts = [];
    state.daily = {};
    state.session = { correct: 0, wrong: 0, skipped: 0, totalTimeSec: 0, count: 0, xpEarned: 0, sinceSummary: 0 };
    state.xp = 0;
    state.level = 1;
    state.hearts = MAX_HEARTS;
    state.lastHeartRegen = null;
    state.streakCorrect = 0;
    state.bestStreakCorrect = 0;
    state.achievements = new Set();
    state.theoryOpens = 0;
    state.dailyGoalCelebratedFor = null;
    state.practiceMode = false;
    state.adaptiveHistory = [];
    state.adaptiveLevel = 'medium';
    state.fastestCorrectSec = null;
    state.bestSessionAcc = null;
    state.mostXpInDay = 0;
    state.settings = Object.assign({}, DEFAULTS);
    document.body.classList.toggle('hard-mode', isHardMode());
    save();
    renderHearts();
    renderXpBar();
    renderLevelBadge();
    renderDailyGoal();
    renderHeader();
    renderSession();
    renderDashboard();
    renderReview();
    renderSettings();
    renderCombo();
    nextQuestion();
  }

  // ─── Tabs ───────────────────────────────────────
  function switchTab(name) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + name));
    document.body.dataset.activeTab = name;
    // Hide feedback banner when leaving practice
    if (name !== 'practice') hideFeedbackBanner();
    if (name === 'dashboard') renderDashboard();
    if (name === 'review') renderReview();
    if (name === 'settings') renderSettings();
    if (name === 'plan') { renderStudyPlan(); renderExamCountdown(); }
  }

  function switchReviewSubtab(name) {
    state.reviewSubtab = name;
    document.querySelectorAll('.review-subtab').forEach(b => b.classList.toggle('active', b.dataset.subtab === name));
    if (dom['review-attempts']) dom['review-attempts'].hidden = (name !== 'attempts');
    if (dom['review-stats'])    dom['review-stats'].hidden    = (name !== 'stats');
    if (dom['review-badges'])    dom['review-badges'].hidden    = (name !== 'badges');
    if (dom['review-mastery'])   dom['review-mastery'].hidden   = (name !== 'mastery');
    if (dom['review-bookmarks']) dom['review-bookmarks'].hidden = (name !== 'bookmarks');
    const errEl = document.getElementById('review-errors');
    if (errEl) errEl.hidden = (name !== 'errors');
    const patEl = document.getElementById('review-patterns');
    if (patEl) patEl.hidden = (name !== 'patterns');
    if (dom['review-attempts']) dom['review-attempts'].classList.toggle('active', name === 'attempts');
    if (dom['review-stats'])    dom['review-stats'].classList.toggle('active', name === 'stats');
    if (name === 'stats')    renderReviewStats();
    if (name === 'errors')   renderErrorJournal();
    if (name === 'patterns') renderErrorPatterns();
    if (name === 'badges')     renderAchievementGallery();
    if (name === 'mastery')    renderMasteryGrid();
    if (name === 'bookmarks')  renderBookmarkList();
  }

  function renderMasteryGrid() {
    const cont = document.getElementById('mastery-grid');
    if (!cont) return;

    // Compute per-topic stats from progress
    const topicStats = {};
    state.bank.forEach(q => {
      if (!topicStats[q.topic]) topicStats[q.topic] = { attempts: 0, correct: 0, hard: 0, hardCorrect: 0 };
      const p = state.progress[q.id];
      if (p) {
        topicStats[q.topic].attempts += p.attempts || 0;
        topicStats[q.topic].correct  += p.correct  || 0;
        if (q.difficulty === 'hard') {
          topicStats[q.topic].hard        += p.attempts || 0;
          topicStats[q.topic].hardCorrect += p.correct  || 0;
        }
      }
    });

    const topics = Object.entries(topicStats)
      .filter(([, v]) => v.attempts > 0)
      .sort((a, b) => b[1].attempts - a[1].attempts);

    if (topics.length === 0) {
      cont.innerHTML = '<div class="empty-state">Answer questions to start building mastery in each topic.</div>';
      return;
    }

    function masteryLevel(attempts, acc) {
      if (attempts < 3)  return 0;
      if (acc >= 0.90 && attempts >= 15) return 5;
      if (acc >= 0.80 && attempts >= 10) return 4;
      if (acc >= 0.70 && attempts >= 6)  return 3;
      if (acc >= 0.55 && attempts >= 3)  return 2;
      return 1;
    }
    const labels = ['Not started', 'Beginner', 'Learning', 'Proficient', 'Advanced', 'Mastered'];
    const colors = ['#afafaf',     '#fb923c',  '#facc15',  '#60a5fa',   '#a78bfa',  '#4ade80'];

    cont.innerHTML = topics.map(([topic, v]) => {
      const acc = v.attempts > 0 ? v.correct / v.attempts : 0;
      const lvl = masteryLevel(v.attempts, acc);
      const stars = '★'.repeat(lvl) + '☆'.repeat(5 - lvl);
      const pct = Math.round(acc * 100);
      const color = colors[lvl];
      const label = labels[lvl];
      return `<div class="mastery-card" style="--mastery-color:${color}">
        <div class="mastery-stars">${stars}</div>
        <div class="mastery-topic">${escapeHtml(topic)}</div>
        <div class="mastery-label">${label}</div>
        <div class="mastery-bar-wrap"><div class="mastery-bar" style="width:${pct}%;background:${color}"></div></div>
        <div class="mastery-stats">${pct}% · ${v.attempts} q</div>
      </div>`;
    }).join('');
  }

  function renderAchievementGallery() {
    const cont = document.getElementById('achievement-gallery');
    if (!cont) return;
    const earned = state.achievements;
    // Build list: core achievements + dynamic ones from earned set
    const core = Object.entries(ACHIEVEMENTS);
    const dynamic = [...earned].filter(id => !ACHIEVEMENTS[id]).map(id => {
      if (id.startsWith('master_')) return [id, { icon: '🏅', title: id.replace('master_', 'Master: ').replace(/_/g, ' '), desc: '100% on a topic (10+ attempts)' }];
      if (id.startsWith('q')) return [id, { icon: '🔢', title: `${id.toUpperCase()} Questions`, desc: `Answered ${id.slice(1)} questions` }];
      if (id.startsWith('acc_')) return [id, { icon: '🎯', title: `${id.split('_')[1]}% Accuracy`, desc: `Reached ${id.split('_')[1]}% all-time accuracy` }];
      return [id, { icon: '⭐', title: id, desc: '' }];
    });
    const all = [...core, ...dynamic];
    const total = all.length;
    const unlockedCount = all.filter(([id]) => earned.has(id)).length;
    cont.innerHTML = `
      <div class="badge-gallery-header">
        <span class="badge-gallery-count">${unlockedCount} / ${total} earned</span>
        <div class="badge-gallery-progress-bar"><div class="badge-gallery-progress-fill" style="width:${total > 0 ? Math.round(unlockedCount/total*100) : 0}%"></div></div>
      </div>
      <div class="badge-gallery-grid">
        ${all.map(([id, a]) => {
          const unlocked = earned.has(id);
          return `<div class="badge-gallery-item ${unlocked ? 'badge-gallery-item--unlocked' : 'badge-gallery-item--locked'}" title="${escapeHtml(a.desc)}">
            <div class="badge-gallery-icon">${unlocked ? a.icon : '🔒'}</div>
            <div class="badge-gallery-title">${escapeHtml(a.title)}</div>
            <div class="badge-gallery-desc">${escapeHtml(a.desc)}</div>
          </div>`;
        }).join('')}
      </div>`;
  }

  function renderErrorPatterns() {
    const cont = document.getElementById('error-patterns-content');
    if (!cont) return;

    const wrongAttempts = state.attempts.filter(a => !a.wasCorrect && a.qid);
    if (wrongAttempts.length === 0) {
      cont.innerHTML = '<div class="empty-state">No wrong answers yet — keep practicing!</div>';
      return;
    }

    // Cluster by topic
    const byTopic = {};
    wrongAttempts.forEach(a => {
      const q = state.bank.find(qq => qq.id === a.qid);
      if (!q) return;
      if (!byTopic[q.topic]) byTopic[q.topic] = { count: 0, types: new Set(), difficulties: {} };
      byTopic[q.topic].count++;
      byTopic[q.topic].types.add(q.type);
      byTopic[q.topic].difficulties[q.difficulty] = (byTopic[q.topic].difficulties[q.difficulty] || 0) + 1;
    });

    const sorted = Object.entries(byTopic).sort((a, b) => b[1].count - a[1].count);
    const topCount = sorted[0]?.[1]?.count || 1;

    // Cluster by type
    const byType = {};
    wrongAttempts.forEach(a => {
      const q = state.bank.find(qq => qq.id === a.qid);
      if (!q) return;
      byType[q.type] = (byType[q.type] || 0) + 1;
    });
    const sortedTypes = Object.entries(byType).sort((a, b) => b[1] - a[1]);

    cont.innerHTML = `
      <div class="error-pattern-section">
        <div class="dash-section-title">Top Error Topics</div>
        ${sorted.slice(0, 8).map(([topic, stats]) => {
          const barW = Math.round(stats.count / topCount * 100);
          const types = [...stats.types].join(', ');
          return `<div class="error-pattern-row">
            <div class="error-pattern-label">${escapeHtml(topic)}</div>
            <div class="error-pattern-bar-wrap">
              <div class="error-pattern-bar" style="width:${barW}%"></div>
            </div>
            <div class="error-pattern-count">${stats.count} wrong</div>
            <div class="error-pattern-types">${types}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="error-pattern-section">
        <div class="dash-section-title">Errors by Type</div>
        <div class="error-type-chips">
          ${sortedTypes.map(([type, count]) => `
            <div class="error-type-chip">
              <span class="error-type-chip-type">${type}</span>
              <span class="error-type-chip-count">${count}</span>
            </div>`).join('')}
        </div>
      </div>
      <div class="error-pattern-section">
        <div class="dash-section-title">Improvement Advice</div>
        <div class="error-advice">
          ${sorted[0] ? `<div class="error-advice-item">🎯 Focus on <strong>${escapeHtml(sorted[0][0])}</strong> — ${sorted[0][1].count} wrong answers. Switch to "Weak Areas" mode to target it.</div>` : ''}
          ${sortedTypes[0] ? `<div class="error-advice-item">📝 Most errors in <strong>${sortedTypes[0][0]}</strong> questions — review the theory for this type.</div>` : ''}
          ${wrongAttempts.length >= 20 ? '<div class="error-advice-item">💡 You have enough data for a meaningful pattern. Check the topic with the longest bar first.</div>' : '<div class="error-advice-item">📊 Answer 20+ questions to see reliable patterns.</div>'}
        </div>
      </div>
      ${(() => {
        const tagged = wrongAttempts.filter(a => a.errorTag);
        if (tagged.length === 0) return '';
        const tagCounts = {};
        tagged.forEach(a => { tagCounts[a.errorTag] = (tagCounts[a.errorTag] || 0) + 1; });
        const tagLabels = { careless: '😅 Careless', conceptual: '📚 Conceptual', timing: '⏱ Timing', misread: '🔍 Misread',
          calc: '🔢 Calc error', unknown: '📚 Unknown', trap: '🪤 Trap' }; // legacy compat
        const topTag = Object.entries(tagCounts).sort((a,b)=>b[1]-a[1])[0]?.[0];
        const advice = {
          careless: 'Slow down on your last 20 seconds — re-read the question before clicking.',
          conceptual: 'Review the concept notes for these topics; re-do similar questions next session.',
          timing: 'Practice timed drills on these question types; use 2-min/question pacing.',
          misread: 'Underline the exact question task before looking at choices.',
        };
        return `<div class="error-pattern-section">
          <div class="dash-section-title">Error Breakdown (${tagged.length} tagged)</div>
          <div class="error-type-chips">
            ${Object.entries(tagCounts).sort((a,b)=>b[1]-a[1]).map(([k,c]) =>
              `<div class="error-type-chip"><span class="error-type-chip-type">${tagLabels[k] || k}</span><span class="error-type-chip-count">${c}</span></div>`
            ).join('')}
          </div>
          ${topTag && advice[topTag] ? `<p class="error-advice">💡 Top pattern — ${advice[topTag]}</p>` : ''}
        </div>`;
      })()}
      `;
  }

  function renderErrorJournal() {
    const cont = document.getElementById('error-journal-list');
    if (!cont) return;

    // Build per-question error counts from progress
    const errors = [];
    state.bank.forEach(q => {
      const p = state.progress[q.id];
      if (!p || p.attempts === 0) return;
      const wrong = p.attempts - (p.correct || 0);
      if (wrong < 1) return;
      errors.push({ q, wrong, attempts: p.attempts, correct: p.correct || 0 });
    });

    if (errors.length === 0) {
      cont.innerHTML = '<div class="empty-state">No errors yet — keep practicing!</div>';
      return;
    }

    // Group by topic
    errors.sort((a, b) => b.wrong - a.wrong);
    const byTopic = {};
    errors.forEach(e => {
      if (!byTopic[e.q.topic]) byTopic[e.q.topic] = [];
      byTopic[e.q.topic].push(e);
    });

    cont.innerHTML = '';
    Object.entries(byTopic)
      .sort((a, b) => b[1].reduce((s, e) => s + e.wrong, 0) - a[1].reduce((s, e) => s + e.wrong, 0))
      .slice(0, 8)
      .forEach(([topic, items]) => {
        const topicWrong = items.reduce((s, e) => s + e.wrong, 0);
        const section = document.createElement('div');
        section.className = 'error-journal-topic';
        section.innerHTML = `
          <div class="error-journal-topic-head">
            <span class="error-journal-topic-name">${escapeHtml(topic)}</span>
            <span class="error-journal-topic-badge">${topicWrong} mistake${topicWrong > 1 ? 's' : ''}</span>
          </div>`;
        items.slice(0, 5).forEach(({ q, wrong, attempts, correct }) => {
          const acc = Math.round(correct / attempts * 100);
          const row = document.createElement('div');
          row.className = 'error-journal-row';
          row.innerHTML = `
            <div class="error-journal-q-text">${escapeHtml(q.question.slice(0, 100))}${q.question.length > 100 ? '…' : ''}</div>
            <div class="error-journal-q-meta">
              <span class="error-badge">✗ ${wrong}×</span>
              <span class="error-acc ${acc < 40 ? 'acc-low' : acc < 70 ? 'acc-mid' : 'acc-ok'}">${acc}% acc</span>
              <span class="error-diff diff-${q.difficulty}">${q.difficulty}</span>
            </div>`;
          section.appendChild(row);
        });
        cont.appendChild(section);
      });
  }

  // Help modal
  function openHelpModal() {
    if (!dom['help-modal']) return;
    dom['help-modal'].hidden = false;
    document.body.classList.add('modal-open');
  }
  function closeHelpModal() {
    if (!dom['help-modal']) return;
    dom['help-modal'].hidden = true;
    document.body.classList.remove('modal-open');
  }

  function openFormulaModal() {
    if (!dom['formula-modal']) return;
    dom['formula-modal'].hidden = false;
    document.body.classList.add('modal-open');
  }
  function closeFormulaModal() {
    if (!dom['formula-modal']) return;
    dom['formula-modal'].hidden = true;
    document.body.classList.remove('modal-open');
  }

  // ─── Events ─────────────────────────────────────
  function bindEvents() {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.addEventListener('click', () => switchTab(b.dataset.tab));
    });

    ['filter-section','filter-type','filter-topic','filter-difficulty','filter-mode'].forEach(id => {
      if (!dom[id]) return;
      dom[id].addEventListener('change', () => {
        const key = id.replace('filter-', '');
        state.filters[key] = dom[id].value;
        save();
        nextQuestion();
      });
    });

    if (dom['rc-passage-toggle']) {
      dom['rc-passage-toggle'].addEventListener('click', () => {
        const panel = dom['rc-passage-panel'];
        if (!panel) return;
        panel.classList.toggle('collapsed');
        dom['rc-passage-toggle'].textContent = panel.classList.contains('collapsed') ? 'Show' : 'Hide';
      });
    }

    dom['btn-restart'].addEventListener('click', () => { hideFeedbackBanner(); nextQuestion(); });
    dom['btn-submit'].addEventListener('click', submitAnswer);
    dom['btn-skip'].addEventListener('click', skipQuestion);
    dom['btn-next'].addEventListener('click', () => {
      hideFeedbackBanner();
      if (state.examMode) {
        const lastAttempt = state.attempts[0];
        advanceExam(lastAttempt?.wasCorrect || false, lastAttempt?.timeSec || 0);
      } else {
        nextQuestion();
      }
    });
    if (dom['btn-exam-mode']) dom['btn-exam-mode'].addEventListener('click', openExamModal);
    if (dom['btn-formula-sheet']) dom['btn-formula-sheet'].addEventListener('click', openFormulaModal);

    // Difficulty felt rating
    document.querySelectorAll('.diff-rate-btn').forEach(b => {
      b.addEventListener('click', () => {
        const felt = parseInt(b.dataset.felt, 10);
        if (state.attempts.length > 0) {
          state.attempts[0].felt = felt;
          save();
        }
        document.querySelectorAll('.diff-rate-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
    });
    if (dom['formula-close']) dom['formula-close'].addEventListener('click', closeFormulaModal);
    if (dom['formula-modal']) dom['formula-modal'].addEventListener('click', e => { if (e.target === dom['formula-modal']) closeFormulaModal(); });
    if (dom['exam-modal-close']) dom['exam-modal-close'].addEventListener('click', closeExamModal);
    if (dom['exam-modal']) dom['exam-modal'].addEventListener('click', e => { if (e.target === dom['exam-modal']) closeExamModal(); });
    if (dom['btn-start-exam']) dom['btn-start-exam'].addEventListener('click', startExamSimulation);
    if (dom['btn-di-warmup'])  dom['btn-di-warmup'].addEventListener('click', startDiWarmup);
    if (dom['exam-results-close']) dom['exam-results-close'].addEventListener('click', closeExamResults);
    if (dom['exam-count']) dom['exam-count'].addEventListener('change', updateExamTimePreview);
    if (dom['exam-section']) dom['exam-section'].addEventListener('change', updateExamTimePreview);

    // View toggle: filter view ↔ skill map view.
    document.querySelectorAll('.view-toggle-btn').forEach(b => {
      b.addEventListener('click', () => {
        const view = b.dataset.view;
        document.querySelectorAll('.view-toggle-btn').forEach(x => x.classList.toggle('active', x === b));
        const isMap = view === 'skillmap';
        const filterRow  = document.querySelector('#tab-practice .filter-row');
        const qcard      = document.getElementById('question-card');
        const sessionTrk = document.querySelector('#tab-practice .session-tracker');
        const skillMap   = document.getElementById('skill-map');
        if (skillMap) skillMap.hidden = !isMap;
        if (filterRow)  filterRow.style.display  = isMap ? 'none' : '';
        if (qcard)      qcard.style.display      = isMap ? 'none' : '';
        if (sessionTrk) sessionTrk.style.display = isMap ? 'none' : '';
        if (isMap) renderSkillMap();
      });
    });
    dom['theme-toggle'].addEventListener('click', toggleTheme);
    if (dom['sound-toggle']) dom['sound-toggle'].addEventListener('click', toggleSound);
    dom['btn-reset-progress'].addEventListener('click', resetProgress);
    if (dom['btn-export-progress']) dom['btn-export-progress'].addEventListener('click', exportProgress);
    if (dom['btn-start-sr-review']) dom['btn-start-sr-review'].addEventListener('click', () => {
      if (dom['filter-mode']) dom['filter-mode'].value = 'missed';
      state.filters.mode = 'missed';
      switchTab('practice');
      nextQuestion();
    });

    dom['btn-theory-meta'].addEventListener('click', () => {
      const q = state.current;
      if (q) openTheoryModal(q.topic, q.subtopic, q);
    });

    dom['btn-flag'].addEventListener('click', toggleFlag);
    if (dom['btn-bookmark'])    dom['btn-bookmark'].addEventListener('click', toggleBookmark);
    if (dom['btn-annotation'])  dom['btn-annotation'].addEventListener('click', () => openAnnotationInput(''));

    // More-filters toggle
    const moreFiltersToggle = document.getElementById('more-filters-toggle');
    if (moreFiltersToggle) {
      moreFiltersToggle.addEventListener('click', () => {
        const body = document.getElementById('more-filters-body');
        if (!body) return;
        const open = body.hidden;
        body.hidden = !open;
        moreFiltersToggle.setAttribute('aria-expanded', String(open));
        moreFiltersToggle.textContent = open ? '− Less filters' : '+ More filters';
      });
    }

    if (dom['annotation-save']) dom['annotation-save'].addEventListener('click', saveAnnotation);
    if (dom['annotation-cancel']) dom['annotation-cancel'].addEventListener('click', () => {
      if (dom['annotation-input-area']) dom['annotation-input-area'].hidden = true;
      renderAnnotationRow();
    });
    dom['btn-hint'].addEventListener('click', showHint);

    // Drill bookmarked questions
    const drillBtn = document.getElementById('btn-drill-bookmarks');
    if (drillBtn) drillBtn.addEventListener('click', () => {
      if (state.bookmarks.size === 0) return;
      state.filters.mode = 'bookmarked';
      if (dom['filter-mode']) dom['filter-mode'].value = 'bookmarked';
      switchTab('practice');
      nextQuestion();
    });

    dom['btn-retry-same'].addEventListener('click', () => {
      const q = state.current;
      if (q) retryType(q.difficulty);
    });
    dom['btn-retry-harder'].addEventListener('click', () => {
      const q = state.current;
      if (!q) return;
      const diffs = ['easy', 'medium', 'hard'];
      const next = diffs[diffs.indexOf(q.difficulty) + 1];
      if (next) retryType(next);
    });
    dom['btn-retry-easier'].addEventListener('click', () => {
      const q = state.current;
      if (!q) return;
      const diffs = ['easy', 'medium', 'hard'];
      const prev = diffs[diffs.indexOf(q.difficulty) - 1];
      if (prev) retryType(prev);
    });

    dom['btn-theory'].addEventListener('click', () => {
      const q = state.current;
      if (q) openTheoryModal(q.topic, q.subtopic, q);
    });
    ['ctag-sure', 'ctag-unsure', 'ctag-guessed'].forEach(id => {
      if (dom[id]) dom[id].addEventListener('click', () => setConfidence(dom[id].dataset.confidence));
    });
    // Error tag buttons
    document.querySelectorAll('.error-tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.attempts.length === 0) return;
        const tag = btn.dataset.etag;
        state.attempts[0].errorTag = tag;
        document.querySelectorAll('.error-tag-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        save();
      });
    });
    dom['theory-close'].addEventListener('click', closeTheoryModal);
    dom['theory-dismiss'].addEventListener('click', closeTheoryModal);
    dom['theory-modal'].addEventListener('click', e => {
      if (e.target === dom['theory-modal']) closeTheoryModal();
    });
    dom['theory-practice-same'].addEventListener('click', () => {
      const topic = dom['theory-modal'].dataset.topic;
      closeTheoryModal();
      if (topic) {
        dom['filter-topic'].value = topic;
        state.filters.topic = topic;
        save();
        nextQuestion();
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === 'practice'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-practice'));
      }
    });
    document.querySelectorAll('.modal-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.dataset.panel;
        document.querySelectorAll('.modal-tab').forEach(b => b.classList.toggle('active', b === btn));
        document.querySelectorAll('.modal-panel').forEach(p => p.classList.toggle('active', p.id === 'modal-' + panel));
      });
    });
    dom['review-filter'].addEventListener('change', renderReview);

    // Hearts modal
    if (dom['hearts-practice-mode']) dom['hearts-practice-mode'].addEventListener('click', () => {
      state.practiceMode = true;
      closeHeartsModal();
      nextQuestion();
    });
    if (dom['hearts-refill']) dom['hearts-refill'].addEventListener('click', () => {
      state.hearts = MAX_HEARTS;
      state.lastHeartRegen = null;
      state.practiceMode = false;
      save();
      renderHearts();
      closeHeartsModal();
      nextQuestion();
    });

    // Summary modal continue
    if (dom['summary-continue']) dom['summary-continue'].addEventListener('click', closeSessionSummary);

    // Periodically tick heart regen + modal countdown
    setInterval(() => {
      const before = state.hearts;
      regenerateHearts();
      if (state.hearts !== before) renderHearts();
      if (!dom['hearts-modal'].hidden) updateHeartsRegenMessage();
    }, 5000);

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key) - 1;
        if (state.current && idx < state.current.choices.length && !state.submitted) {
          onChoiceClick(idx);
          e.preventDefault();
        }
      } else if ('aAbBcCdDeE'.includes(e.key) && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const idx = 'aAbBcCdDeE'.indexOf(e.key) >> 1;
        if (state.current && !state.submitted && idx < state.current.choices.length) {
          onChoiceClick(idx);
          e.preventDefault();
        } else if (state.submitted && (e.key === 'b' || e.key === 'B')) {
          if (state.current) { toggleBookmark(); e.preventDefault(); }
        }
      } else if (e.key === 'Enter') {
        // If summary is open, Enter advances
        if (!dom['summary-modal'].hidden) { closeSessionSummary(); e.preventDefault(); return; }
        if (!state.submitted && state.selectedChoice != null) {
          submitAnswer(); e.preventDefault();
        } else if (state.submitted) {
          hideFeedbackBanner();
          if (state.examMode) { const la = state.attempts[0]; advanceExam(la?.wasCorrect||false, la?.timeSec||0); }
          else nextQuestion();
          e.preventDefault();
        }
      } else if ((e.key === 'n' || e.key === 'N') && state.submitted) {
        hideFeedbackBanner();
        if (state.examMode) { const la = state.attempts[0]; advanceExam(la?.wasCorrect||false, la?.timeSec||0); }
        else nextQuestion();
        e.preventDefault();
      } else if ((e.key === 's' || e.key === 'S') && !state.submitted) {
        skipQuestion(); e.preventDefault();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound(); e.preventDefault();
      } else if (e.key === 'f' || e.key === 'F') {
        if (state.current) { toggleFlag(); e.preventDefault(); }
      } else if (e.key === 't' || e.key === 'T') {
        const q = state.current;
        if (q) { openTheoryModal(q.topic, q.subtopic, q); e.preventDefault(); }
      } else if (e.key === 'h' || e.key === 'H') {
        if (!state.submitted && state.current) { showHint(); e.preventDefault(); }
      } else if (e.key === '?') {
        openHelpModal(); e.preventDefault();
      }
    });

    // Review subtab buttons
    document.querySelectorAll('.review-subtab').forEach(b => {
      b.addEventListener('click', () => switchReviewSubtab(b.dataset.subtab));
    });

    // Settings panel
    bindSettings();

    // Help modal
    if (dom['help-btn'])     dom['help-btn'].addEventListener('click', openHelpModal);
    if (dom['help-close'])   dom['help-close'].addEventListener('click', closeHelpModal);
    if (dom['help-dismiss']) dom['help-dismiss'].addEventListener('click', closeHelpModal);
    if (dom['help-modal'])   dom['help-modal'].addEventListener('click', e => {
      if (e.target === dom['help-modal']) closeHelpModal();
    });
    // Esc to close modals
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (dom['help-modal']    && !dom['help-modal'].hidden)    { closeHelpModal();       e.preventDefault(); }
      if (dom['formula-modal'] && !dom['formula-modal'].hidden) { closeFormulaModal();    e.preventDefault(); }
      if (dom['theory-modal']  && !dom['theory-modal'].hidden)  { closeTheoryModal();     e.preventDefault(); }
      if (dom['summary-modal'] && !dom['summary-modal'].hidden) { closeSessionSummary();  e.preventDefault(); }
    });
  }

  // ─── Daily Tip ───────────────────────────────────
  const GMAT_TIPS = [
    'On DS questions, evaluate each statement ALONE before combining. Many test-takers lose points by combining too early.',
    'For CR Strengthen questions, the right answer closes a gap in the argument — it does NOT restate the conclusion.',
    'GMAT Quant: plug in numbers when variables appear in all 5 answer choices. Pick numbers that are easy to compute.',
    'SC rule: always identify the subject FIRST, then check verb agreement. Ignore prepositional phrases between subject and verb.',
    'RC strategy: read the passage for structure and tone, not details. Return to the passage to verify specific facts.',
    'Hard CR questions often hinge on a single qualifier: "some," "most," "all," "any." Read every word.',
    'TPA (Two-Part Analysis): always verify BOTH column selections satisfy ALL conditions simultaneously.',
    'DS trap: "sufficient" means you can answer the question — NOT that the answer is "yes." Definitively "no" is also sufficient.',
    'For combinatorics, start with the most restricted slot and work outward.',
    'In CR Weaken questions, the correct answer attacks a HIDDEN assumption — not a stated premise.',
    'GMAT uses "convenient" numbers — answers are usually whole numbers, nice fractions, or round percentages.',
    'Table Analysis: sort the table by the relevant column before evaluating each T/F statement.',
    'In modifiers (SC), the modifying phrase must touch the noun it modifies. Misplaced modifiers always signal an error.',
    'GI charts: read the axis labels and scale BEFORE interpreting any data point. Non-zero y-axis origins are common traps.',
    'Boldface CR: identify the conclusion first. Boldface roles are usually either premise, conclusion, or counter-argument.',
    'For inequalities in DS, remember that x² < 4 does NOT mean x < 2 — it means -2 < x < 2.',
    'CR Inference questions: the correct answer must be true based solely on the stated information. Do NOT bring in outside knowledge.',
    'GMAT Focus score = performance × difficulty. Hard questions are worth more — do not rush to Easy mode.',
    'For probability problems, drawing a tree diagram prevents double-counting and missing cases.',
    'SC parallelism: all items in a list must be grammatically parallel — verbs match verbs, nouns match nouns.',
    "MSR questions: read only what's needed to answer each question. Do NOT read all tabs first.",
    'On weighted averages: the mean is closer to the group with the larger weight.',
    'CR Evaluate questions: ask "what information, if known, would most affect the conclusion?" Good answer = a Yes/No question that changes the strength of the argument.',
    'In DS, Statement (1) and Statement (2) can NEVER contradict each other. If they seem to, you made a calculation error.',
    'GMAT pacing: spend the first 10 questions at your natural pace. Rushing early = more errors on hard questions.',
  ];

  let _tipIndex = Math.floor(Math.random() * GMAT_TIPS.length);

  function initDailyTip() {
    renderTip();
    if (dom['btn-tip-next']) {
      dom['btn-tip-next'].addEventListener('click', () => {
        _tipIndex = (_tipIndex + 1) % GMAT_TIPS.length;
        renderTip();
      });
    }
  }

  function renderTip() {
    if (dom['daily-tip-text']) {
      dom['daily-tip-text'].textContent = GMAT_TIPS[_tipIndex];
    }
  }

  // ─── Quill the Owl Mascot ─────────────────────────
  const QUILL_MESSAGES = {
    idle: [
      "Let's crush the GMAT! 🎓",
      "You're doing great — keep going!",
      "2 minutes per question. You got this!",
      "Consistency beats talent every time.",
      "Every question makes you sharper. 💪",
      "GMAT score = practice + strategy!",
      "Focus mode: ON 🦉",
      "I believe in you!",
      "Top 10% is within reach!",
    ],
    correct: [
      "Nailed it! 🎉",
      "Brilliant! Keep that streak alive! 🔥",
      "Perfect logic! 💎",
      "That's how it's done! ⭐",
      "You're on fire! 🔥🔥",
      "Outstanding work! 🏆",
      "GMAT pros think just like that!",
      "Flawless! 👏",
    ],
    wrong: [
      "Oops! Read the explanation carefully.",
      "That one tripped you up — check the trap!",
      "Don't worry — mistakes are how we learn! 📚",
      "Review this one. You'll get it next time!",
      "The GMAT is tricky. Let's learn from this.",
      "Close! Check the explanation 👇",
      "Every mistake = one step smarter!",
    ],
    streak: [
      "🔥 Unstoppable combo!",
      "You're in the ZONE! 🚀",
      "Streak master! 💎🔥",
      "This is what 700+ looks like!",
      "Don't stop now!! 🔥🔥🔥",
    ],
    levelup: [
      "LEVEL UP! You're rising fast! ⭐",
      "New level unlocked! Getting dangerous 🎓",
      "Look at you go! Higher level = harder challenges!",
    ],
    idle_long: [
      "Still there? Let's get back to it! 🦉",
      "The GMAT waits for no one... 👀",
      "I'm watching you (kindly) 🦉",
      "One more question? Pretty please? 📝",
    ],
    theory: [
      "Great choice! Theory first = fewer mistakes 📚",
      "Knowledge is power! Read carefully.",
      "Studying smart — I like it! 🎓",
    ],
    hint: [
      "Need a nudge? Here's a hint! 💡",
      "Even pros use hints. Smart move!",
      "Hints save time — use them wisely ⏱",
    ],
    skip: [
      "Skipping is okay — review it later!",
      "Come back to this one. No shame!",
      "Flag it and move on. Smart strategy!",
    ],
    daily_goal: [
      "DAILY GOAL DONE! You're incredible! 🏆",
      "10 questions down — consistency is key!",
      "Goal achieved! Come back tomorrow! 💪",
    ],
  };

  let _quillMsgTimer = null;
  let _quillIdleTimer = null;

  function quillSetMood(mood) {
    const svg = document.getElementById('quill-svg');
    if (!svg) return;
    svg.classList.remove('mood-happy', 'mood-sad', 'mood-think');
    if (mood && mood !== 'idle') svg.classList.add('mood-' + mood);
  }

  function quillMsg(category, mood, anim) {
    const btn = document.getElementById('quill-btn');
    const bub = document.getElementById('quill-bubble');
    const msg = document.getElementById('quill-msg');
    if (!bub || !msg) return;

    quillSetMood(mood || 'idle');

    const pool = QUILL_MESSAGES[category] || QUILL_MESSAGES.idle;
    msg.textContent = pool[Math.floor(Math.random() * pool.length)];

    if (anim && btn) {
      btn.classList.remove('anim-bounce', 'anim-shake', 'anim-spin');
      void btn.offsetWidth;
      btn.classList.add('anim-' + anim);
      setTimeout(() => btn.classList.remove('anim-' + anim), 800);
    }

    bub.removeAttribute('hidden');
    if (_quillMsgTimer) clearTimeout(_quillMsgTimer);
    _quillMsgTimer = setTimeout(() => {
      bub.setAttribute('hidden', '');
      quillSetMood('idle');
    }, 4500);
  }

  function quillResetIdleTimer() {
    if (_quillIdleTimer) clearTimeout(_quillIdleTimer);
    _quillIdleTimer = setTimeout(() => quillMsg('idle_long', 'idle'), 90000);
  }

  function initQuill() {
    const btn = document.getElementById('quill-btn');
    if (!btn) return;
    btn.addEventListener('click', () => quillMsg('idle', 'idle', 'bounce'));
    setTimeout(() => quillMsg('idle', 'idle'), 1800);
    document.addEventListener('click', quillResetIdleTimer, { passive: true });
    quillResetIdleTimer();
  }

  // Public hooks — called from submit/skip/theory/hint
  function quillOnCorrect(streak) {
    if (streak >= 3) quillMsg('streak', 'happy', 'spin');
    else quillMsg('correct', 'happy', 'bounce');
  }
  function quillOnWrong()     { quillMsg('wrong',      'sad',   'shake'); }
  function quillOnSkip()      { quillMsg('skip',       'think'); }
  function quillOnTheory()    { quillMsg('theory',     'think'); }
  function quillOnHint()      { quillMsg('hint',       'think'); }
  function quillOnLevelUp()   { quillMsg('levelup',    'happy', 'spin'); }
  function quillOnDailyGoal() { quillMsg('daily_goal', 'happy', 'spin'); }

  // Wire quill into submit flow by patching showFeedback
  const _origShowFeedback = showFeedback;
  // showFeedback is already defined above; wrap it
  (function patchShowFeedback() {
    const orig = window._showFeedbackOrig;
    // Instead, hook into submitAnswer + skipQuestion post-action
    // We patch at DOMContentLoaded via event delegation on the feedback banner
    document.addEventListener('quill:correct', e => quillOnCorrect(e.detail || 0));
    document.addEventListener('quill:wrong',   () => quillOnWrong());
    document.addEventListener('quill:skip',    () => quillOnSkip());
    document.addEventListener('quill:theory',  () => quillOnTheory());
    document.addEventListener('quill:hint',    () => quillOnHint());
    document.addEventListener('quill:levelup', () => quillOnLevelUp());
    document.addEventListener('quill:goal',    () => quillOnDailyGoal());
  })();

  document.addEventListener('DOMContentLoaded', initQuill);

})();

/* ──────────────────────────────────────────────────────────────
   MOBILE: filter drawer toggle (only acts when CSS shows the btn)
   ────────────────────────────────────────────────────────────── */
(function initMobileFilterDrawer() {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(() => {
    const btn = document.getElementById('mobile-filter-toggle');
    const sidebar = document.getElementById('practice-sidebar');
    const backdrop = document.getElementById('mobile-filter-backdrop');
    if (!btn || !sidebar || !backdrop) return;

    const open = () => {
      sidebar.classList.add('drawer-open');
      backdrop.hidden = false;
      requestAnimationFrame(() => backdrop.classList.add('show'));
      btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-locked');
    };
    const close = () => {
      sidebar.classList.remove('drawer-open');
      backdrop.classList.remove('show');
      setTimeout(() => { backdrop.hidden = true; }, 220);
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-locked');
    };
    const toggle = () => {
      if (sidebar.classList.contains('drawer-open')) close();
      else open();
    };

    btn.addEventListener('click', toggle);
    backdrop.addEventListener('click', close);

    // Close when user picks a filter or hits a sidebar CTA on mobile
    sidebar.addEventListener('click', (ev) => {
      const t = ev.target;
      if (!sidebar.classList.contains('drawer-open')) return;
      if (t.closest('.btn, .view-toggle-btn')) close();
    });
    sidebar.addEventListener('change', () => {
      if (sidebar.classList.contains('drawer-open')) close();
    });

    // Esc closes
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && sidebar.classList.contains('drawer-open')) close();
    });

    // Close on tab switch
    document.querySelectorAll('.tab-btn').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('drawer-open')) close();
      });
    });
  });
})();
