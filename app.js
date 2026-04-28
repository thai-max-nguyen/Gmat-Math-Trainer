/* ════════════════════════════════════════════════════════════
   GMAT Math Trainer — Application logic
   Vanilla JS, no framework, persists everything to localStorage.
   ════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const STORAGE_KEY = 'gmat-trainer-v2';
  const TARGET_TIME_PS = 120; // seconds per PS question
  const TARGET_TIME_DS = 120; // seconds per DS question
  const WARN_TIME      = 90;  // turn timer yellow at 1:30
  const OVER_TIME      = 120; // turn timer red after 2:00
  const SR_INTERVALS   = [1, 3, 7, 14, 30]; // days, simple Leitner-style queue

  // ─── State ───────────────────────────────────────
  const state = {
    // bank (from data/questions.js)
    bank: window.GMAT_QUESTIONS || [],
    // user history per question id:  { id: { attempts, correct, wrong, skipped, lastSeen, srBox, srNextDue, lastTimeSec } }
    progress: {},
    // attempt log (most recent first): { qid, picked, wasCorrect, kind: 'correct'|'wrong'|'skipped', timeSec, ts }
    attempts: [],
    // session-only counters (reset on reload)
    session: { correct: 0, wrong: 0, skipped: 0, totalTimeSec: 0, count: 0 },
    // current question
    current: null,
    selectedChoice: null,   // 0..4 index
    submitted: false,
    qStartTs: null,
    qTimerTick: null,
    // filters
    filters: { type: 'all', topic: 'all', difficulty: 'all', mode: 'random' },
    // theme
    theme: 'dark',
    // today's date (for streak)
    today: dateKey(new Date()),
    daily: {}, // { 'YYYY-MM-DD': { count, correct } }
  };

  // ─── DOM refs ────────────────────────────────────
  const $ = id => document.getElementById(id);
  const dom = {};

  document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    load();
    populateTopicFilter();
    bindEvents();
    applyTheme();
    renderHeader();
    renderSession();
    renderDashboard();
    renderReview();
    nextQuestion();
    updateBankSummary();
  });

  function cacheDom() {
    [
      'bank-summary', 'hdr-accuracy', 'hdr-today', 'hdr-streak', 'theme-toggle',
      'filter-type', 'filter-topic', 'filter-difficulty', 'filter-mode',
      'btn-restart',
      'q-type', 'q-topic', 'q-difficulty', 'q-id',
      'q-timer', 'q-timer-value',
      'q-question', 'q-choices',
      'btn-skip', 'btn-submit', 'btn-next',
      'q-feedback', 'feedback-status', 'feedback-time',
      'feedback-answer', 'feedback-explanation',
      'ss-correct', 'ss-wrong', 'ss-skipped', 'ss-accuracy', 'ss-avg-time',
      'dash-total', 'dash-coverage', 'dash-accuracy', 'dash-streak', 'dash-avg-time',
      'dash-topic-bars', 'dash-difficulty-bars',
      'dash-sr-due', 'dash-sr-total',
      'btn-reset-progress',
      'review-filter', 'review-list',
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
      state.theme    = (data.theme === 'light' || data.theme === 'dark') ? data.theme : 'dark';
      if (data.filters && typeof data.filters === 'object') {
        state.filters = Object.assign(state.filters, data.filters);
      }
      // Validate filter values against allowed sets — guards against stale/invalid stored data
      const ALLOWED_TYPES = ['all', 'PS', 'DS'];
      const ALLOWED_DIFFS = ['all', 'easy', 'medium', 'hard'];
      const ALLOWED_MODES = ['random', 'weak', 'missed', 'unseen'];
      if (!ALLOWED_TYPES.includes(state.filters.type)) state.filters.type = 'all';
      if (!ALLOWED_DIFFS.includes(state.filters.difficulty)) state.filters.difficulty = 'all';
      if (!ALLOWED_MODES.includes(state.filters.mode)) state.filters.mode = 'random';
      // Topic filter validated against current bank topics
      const validTopics = new Set(['all', ...(window.GMAT_TOPICS || [])]);
      if (!validTopics.has(state.filters.topic)) state.filters.topic = 'all';
    } catch (e) {
      console.warn('Failed to load saved state — starting fresh:', e);
      // Clear corrupted entry so we don't re-fail forever
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        progress: state.progress,
        attempts: state.attempts.slice(0, 500),
        daily:    state.daily,
        theme:    state.theme,
        filters:  state.filters,
      }));
    } catch (e) {
      // Likely quota exceeded — try to free space by trimming attempts then retry once
      console.warn('Failed to save state, attempting trim:', e);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          progress: state.progress,
          attempts: state.attempts.slice(0, 100),
          daily:    state.daily,
          theme:    state.theme,
          filters:  state.filters,
        }));
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
    // Auto-heal missing fields (e.g. from older save formats)
    if (typeof p.attempts !== 'number') p.attempts = 0;
    if (typeof p.correct  !== 'number') p.correct  = 0;
    if (typeof p.wrong    !== 'number') p.wrong    = 0;
    if (typeof p.skipped  !== 'number') p.skipped  = 0;
    if (typeof p.srBox    !== 'number') p.srBox    = 0;
    return p;
  }

  // ─── Filtering & question selection ──────────────
  function populateTopicFilter() {
    const sel = dom['filter-topic'];
    if (!sel) return;
    sel.innerHTML = '<option value="all">All topics</option>';
    (window.GMAT_TOPICS || []).forEach(t => {
      const opt = document.createElement('option');
      opt.value = t; opt.textContent = t;
      sel.appendChild(opt);
    });
    // restore filter selection
    sel.value = state.filters.topic;
    dom['filter-type'].value = state.filters.type;
    dom['filter-difficulty'].value = state.filters.difficulty;
    dom['filter-mode'].value = state.filters.mode;
  }

  function eligible() {
    const f = state.filters;
    return state.bank.filter(q => {
      if (f.type !== 'all' && q.type !== f.type) return false;
      if (f.topic !== 'all' && q.topic !== f.topic) return false;
      if (f.difficulty !== 'all' && q.difficulty !== f.difficulty) return false;
      return true;
    });
  }

  function pickNext() {
    const pool = eligible();
    if (pool.length === 0) return null;
    const mode = state.filters.mode;

    if (mode === 'weak') {
      // Pick from questions answered wrong, weighted by wrong count
      const weak = pool.filter(q => (state.progress[q.id]?.wrong || 0) > 0);
      if (weak.length > 0) {
        weak.sort((a, b) => (state.progress[b.id]?.wrong || 0) - (state.progress[a.id]?.wrong || 0));
        return weak[Math.floor(Math.random() * Math.min(weak.length, 5))];
      }
      // fall through to random if no weak items
    }

    if (mode === 'missed') {
      // Spaced-repetition queue: items whose srNextDue is past
      const now = Date.now();
      const due = pool.filter(q => {
        const p = state.progress[q.id];
        return p && p.srNextDue && p.srNextDue <= now;
      });
      if (due.length > 0) {
        return due[Math.floor(Math.random() * due.length)];
      }
      // fall through to wrong items not yet boxed, then random
      const fallback = pool.filter(q => (state.progress[q.id]?.wrong || 0) > 0);
      if (fallback.length > 0) return fallback[Math.floor(Math.random() * fallback.length)];
    }

    if (mode === 'unseen') {
      const unseen = pool.filter(q => !state.progress[q.id] || state.progress[q.id].attempts === 0);
      if (unseen.length > 0) return unseen[Math.floor(Math.random() * unseen.length)];
    }

    // Default: random; avoid the very last question if possible
    const lastId = state.current?.id;
    let candidates = pool.filter(q => q.id !== lastId);
    if (candidates.length === 0) candidates = pool;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // ─── Render question ─────────────────────────────
  function nextQuestion() {
    state.submitted = false;
    state.selectedChoice = null;
    stopTimer();

    const q = pickNext();
    state.current = q;
    if (!q) {
      const bankEmpty = !state.bank || state.bank.length === 0;
      dom['q-question'].textContent = bankEmpty
        ? 'No questions are loaded. Check that data/questions.js loaded correctly.'
        : 'No questions match these filters. Try changing them.';
      dom['q-choices'].innerHTML = '';
      dom['q-feedback'].hidden = true;
      dom['q-feedback'].className = 'qcard-feedback';
      dom['btn-submit'].hidden = false;
      dom['btn-submit'].disabled = true;
      dom['btn-next'].hidden = true;
      dom['btn-skip'].disabled = true;
      // Reset timer display
      dom['q-timer'].classList.remove('warn', 'over');
      dom['q-timer-value'].textContent = '0:00';
      ['q-type','q-topic','q-difficulty','q-id'].forEach(id => dom[id].textContent = '—');
      return;
    }

    dom['q-type'].textContent = q.type;
    dom['q-topic'].textContent = `${q.topic}${q.subtopic ? ' · ' + q.subtopic : ''}`;
    dom['q-difficulty'].textContent = q.difficulty;
    dom['q-difficulty'].dataset.level = q.difficulty;
    dom['q-id'].textContent = `#${q.id}`;
    dom['q-question'].textContent = q.question;

    // Render choices
    const cont = dom['q-choices'];
    cont.innerHTML = '';
    q.choices.forEach((text, i) => {
      const letter = String.fromCharCode(65 + i);
      const div = document.createElement('div');
      div.className = 'choice';
      div.dataset.idx = i;
      div.innerHTML = `<div class="choice-letter">${letter}</div><div class="choice-text"></div>`;
      div.querySelector('.choice-text').textContent = text;
      div.addEventListener('click', () => onChoiceClick(i));
      cont.appendChild(div);
    });

    dom['q-feedback'].hidden = true;
    dom['q-feedback'].className = 'qcard-feedback';
    dom['btn-submit'].hidden = false;
    dom['btn-submit'].disabled = true;
    dom['btn-skip'].hidden = false;
    dom['btn-skip'].disabled = false;
    dom['btn-next'].hidden = true;

    startTimer();
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

    // Mark choices visually
    [...dom['q-choices'].querySelectorAll('.choice')].forEach((el, i) => {
      const letter = String.fromCharCode(65 + i);
      el.classList.add('disabled');
      if (letter === q.answer) el.classList.add('correct');
      else if (i === state.selectedChoice) el.classList.add('wrong');
    });

    // Record progress
    const p = getProgress(q.id);
    p.attempts++;
    p.lastSeen = Date.now();
    p.lastTimeSec = timeSec;
    if (wasCorrect) {
      p.correct++;
      // Move up SR box on correct
      p.srBox = Math.min((p.srBox || 0) + 1, SR_INTERVALS.length - 1);
      const days = SR_INTERVALS[p.srBox];
      p.srNextDue = Date.now() + days * 24 * 60 * 60 * 1000;
    } else {
      p.wrong++;
      p.srBox = 0;
      p.srNextDue = Date.now() + SR_INTERVALS[0] * 24 * 60 * 60 * 1000;
    }

    // Session counters
    state.session.count++;
    state.session.totalTimeSec += timeSec || 0;
    if (wasCorrect) state.session.correct++;
    else state.session.wrong++;

    // Daily counters — recompute today every time so a long-running tab
    // (open across midnight) attributes activity to the correct date.
    state.today = dateKey(new Date());
    const dk = state.today;
    if (!state.daily[dk]) state.daily[dk] = { count: 0, correct: 0 };
    state.daily[dk].count++;
    if (wasCorrect) state.daily[dk].correct++;

    // Attempt log
    state.attempts.unshift({
      qid: q.id, picked: pickedLetter, wasCorrect,
      kind: wasCorrect ? 'correct' : 'wrong',
      timeSec, ts: Date.now()
    });
    if (state.attempts.length > 500) state.attempts.length = 500;

    save();
    showFeedback(q, wasCorrect, timeSec, 'correct');
    renderHeader();
    renderSession();
    renderDashboard();
    renderReview();
  }

  function skipQuestion() {
    if (state.submitted) return;
    const q = state.current;
    const timeSec = state.qStartTs ? Math.round((Date.now() - state.qStartTs) / 1000) : null;

    state.submitted = true;
    stopTimer();

    // Reveal correct answer
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
    // Skips don't help SR — set srNextDue soon
    p.srNextDue = Date.now() + 1 * 24 * 60 * 60 * 1000;

    state.session.count++;
    state.session.skipped++;
    state.session.totalTimeSec += timeSec || 0;

    state.attempts.unshift({
      qid: q.id, picked: null, wasCorrect: false, kind: 'skipped',
      timeSec, ts: Date.now()
    });
    if (state.attempts.length > 500) state.attempts.length = 500;

    save();
    showFeedback(q, false, timeSec, 'skipped');
    renderHeader();
    renderSession();
    renderDashboard();
    renderReview();
  }

  function showFeedback(q, wasCorrect, timeSec, kind) {
    const fb = dom['q-feedback'];
    fb.hidden = false;
    fb.className = 'qcard-feedback ' + (kind === 'skipped' ? 'skipped' : (wasCorrect ? 'correct' : 'wrong'));
    dom['feedback-status'].textContent =
      kind === 'skipped' ? '⊘ Skipped' :
      wasCorrect ? '✓ Correct!' : '✗ Incorrect';
    dom['feedback-time'].textContent = `Time: ${fmtTime(timeSec)} · target ${fmtTime(q.type === 'DS' ? TARGET_TIME_DS : TARGET_TIME_PS)}`;
    dom['feedback-answer'].textContent = `${q.answer}) ${q.choices[q.answer.charCodeAt(0) - 65]}`;
    dom['feedback-explanation'].textContent = q.explanation || '';
    dom['btn-submit'].hidden = true;
    dom['btn-skip'].hidden = true;
    dom['btn-next'].hidden = false;
  }

  // ─── Timer ──────────────────────────────────────
  function startTimer() {
    state.qStartTs = Date.now();
    updateTimerDisplay();
    state.qTimerTick = setInterval(updateTimerDisplay, 500);
  }

  function stopTimer() {
    if (state.qTimerTick) clearInterval(state.qTimerTick);
    state.qTimerTick = null;
  }

  function updateTimerDisplay() {
    if (!state.qStartTs) return;
    const sec = Math.floor((Date.now() - state.qStartTs) / 1000);
    const t = dom['q-timer'];
    t.classList.toggle('warn', sec >= WARN_TIME && sec < OVER_TIME);
    t.classList.toggle('over', sec >= OVER_TIME);
    dom['q-timer-value'].textContent = fmtTime(sec);
  }

  // ─── Header / session / dashboard ──────────────
  function renderHeader() {
    // Refresh today key so the "Today" counter updates if app stays open across midnight.
    state.today = dateKey(new Date());
    const all = Object.values(state.progress);
    const totalAttempts = all.reduce((s, p) => s + (p.attempts || 0), 0);
    const totalCorrect  = all.reduce((s, p) => s + (p.correct  || 0), 0);
    const acc = totalAttempts > 0 ? Math.round(totalCorrect / totalAttempts * 100) : null;
    dom['hdr-accuracy'].textContent = acc != null ? acc + '%' : '—';
    dom['hdr-today'].textContent = state.daily[state.today]?.count || 0;
    dom['hdr-streak'].textContent = computeStreak();
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
    const ps = state.bank.filter(q => q.type === 'PS').length;
    const ds = state.bank.filter(q => q.type === 'DS').length;
    dom['bank-summary'].textContent = `${total} questions · ${ps} PS · ${ds} DS`;
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

    renderTopicBars();
    renderDifficultyBars();
    renderSRStatus();
  }

  function renderTopicBars() {
    const cont = dom['dash-topic-bars'];
    cont.innerHTML = '';

    // Aggregate stats per topic
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
  }

  function renderReview() {
    const cont = dom['review-list'];
    cont.innerHTML = '';
    const filter = dom['review-filter'].value;
    let items = state.attempts;
    if (filter !== 'all') items = items.filter(a => a.kind === filter);
    if (items.length === 0) {
      // Distinguish "no attempts at all" vs "filter matches none"
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
      div.innerHTML = `
        <div class="review-item-head">
          <strong>${status}</strong>
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
      `;
      cont.appendChild(div);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
    if (!confirm('Reset all progress, attempts, and stats? This cannot be undone.')) return;
    state.progress = {};
    state.attempts = [];
    state.daily = {};
    state.session = { correct: 0, wrong: 0, skipped: 0, totalTimeSec: 0, count: 0 };
    save();
    renderHeader();
    renderSession();
    renderDashboard();
    renderReview();
    nextQuestion();
  }

  // ─── Tabs ───────────────────────────────────────
  function switchTab(name) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + name));
    if (name === 'dashboard') renderDashboard();
    if (name === 'review') renderReview();
  }

  // ─── Events ─────────────────────────────────────
  function bindEvents() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.addEventListener('click', () => switchTab(b.dataset.tab));
    });

    // Filters
    ['filter-type','filter-topic','filter-difficulty','filter-mode'].forEach(id => {
      dom[id].addEventListener('change', () => {
        const key = id.replace('filter-', '');
        state.filters[key] = dom[id].value;
        save();
        nextQuestion();
      });
    });

    dom['btn-restart'].addEventListener('click', () => nextQuestion());
    dom['btn-submit'].addEventListener('click', submitAnswer);
    dom['btn-skip'].addEventListener('click', skipQuestion);
    dom['btn-next'].addEventListener('click', nextQuestion);
    dom['theme-toggle'].addEventListener('click', toggleTheme);
    dom['btn-reset-progress'].addEventListener('click', resetProgress);
    dom['review-filter'].addEventListener('change', renderReview);

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key) - 1;
        if (state.current && idx < state.current.choices.length && !state.submitted) {
          onChoiceClick(idx);
          e.preventDefault();
        }
      } else if (e.key === 'Enter') {
        if (!state.submitted && state.selectedChoice != null) {
          submitAnswer(); e.preventDefault();
        } else if (state.submitted) {
          // After submission, Enter advances — matches user expectation for keyboard flow.
          nextQuestion(); e.preventDefault();
        }
      } else if ((e.key === 'n' || e.key === 'N') && state.submitted) {
        nextQuestion(); e.preventDefault();
      } else if ((e.key === 's' || e.key === 'S') && !state.submitted) {
        skipQuestion(); e.preventDefault();
      }
    });
  }

})();
