// ═══════════════════════════════════════════════════
//  auth.js — Supabase Auth + Data Sync
//  Multi-page version: redirects between pages
// ═══════════════════════════════════════════════════

const SUPABASE_URL  = "https://fruhberouktfhzwpvwqb.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZydWhiZXJvdWt0Zmh6d3B2d3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5Nzk2ODYsImV4cCI6MjA4ODU1NTY4Nn0.xL28aYWE4BNUzeLAXAK_rhhrl0DczfIxYbJZZI-jR3E";

window.sb          = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
window.currentUser = null;

// ── Which page type is this? ─────────────────────
const _isAuthPage = window.location.pathname.endsWith("index.html")
  || window.location.pathname === "/"
  || window.location.pathname === "";

// ── Helpers ──────────────────────────────────────
function showLoading(on) {
  const el = document.getElementById("loading-overlay");
  if (el) { el.classList.toggle("hidden", !on); el.style.display = on ? "" : "none"; }
}

function setMsg(prefix, type, msg) {
  const errEl = document.getElementById(`${prefix}-error`);
  const sucEl = document.getElementById(`${prefix}-success`);
  if (errEl) { errEl.textContent = type === "error" ? msg : ""; errEl.classList.toggle("hidden", type !== "error" || !msg); }
  if (sucEl) { sucEl.textContent = type === "success" ? msg : ""; sucEl.classList.toggle("hidden", type !== "success" || !msg); }
}

function setBtnLoading(id, loading, defaultHTML) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.disabled = loading;
  btn.innerHTML = loading
    ? `<span class="spin material-symbols-outlined" style="font-size:16px">progress_activity</span>&nbsp; Please wait…`
    : defaultHTML;
}

function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  btn.querySelector("span").textContent = show ? "visibility_off" : "visibility";
}

// ── Auth handlers (used on index.html) ───────────
async function handleLogin() {
  const email    = document.getElementById("login-email")?.value.trim();
  const password = document.getElementById("login-password")?.value;
  setMsg("login", "error", "");
  if (!email || !password) { setMsg("login", "error", "Please enter your email and password."); return; }
  const errEl = document.getElementById("login-error");
  const sucEl = document.getElementById("login-success");
  if (errEl) errEl.classList.add("hidden");
  if (sucEl) sucEl.classList.add("hidden");
  setBtnLoading("btn-login", true);
  const { error } = await window.sb.auth.signInWithPassword({ email, password });
  setBtnLoading("btn-login", false, "Sign In &nbsp;→");
  if (error) {
    const msg = error.message.includes("Invalid login") ? "❌ Invalid email or password." : error.message;
    setMsg("login", "error", msg);
  }
  // On success, onAuthStateChange fires → redirects to practice.html
}

async function handleSignup() {
  const email    = document.getElementById("signup-email")?.value.trim();
  const password = document.getElementById("signup-password")?.value;
  const confirm  = document.getElementById("signup-confirm")?.value;
  setMsg("signup", "error", "");
  if (!email || !password || !confirm) { setMsg("signup", "error", "Please fill in all fields."); return; }
  if (password.length < 6)             { setMsg("signup", "error", "Password must be at least 6 characters."); return; }
  if (password !== confirm)            { setMsg("signup", "error", "Passwords do not match."); return; }
  setBtnLoading("btn-signup", true);
  const { data, error } = await window.sb.auth.signUp({ email, password, options: { data: { email } } });
  setBtnLoading("btn-signup", false, "Create Account &nbsp;→");
  if (error) { setMsg("signup", "error", error.message); return; }
  if (data?.session) return; // onAuthStateChange handles redirect
  const { error: signInErr } = await window.sb.auth.signInWithPassword({ email, password });
  if (signInErr) { setMsg("signup", "success", "Account created! Please sign in."); showScreen("login"); }
}

async function handleForgotPassword() {
  const email = document.getElementById("login-email")?.value.trim();
  if (!email) { setMsg("login", "error", "Enter your email address first."); return; }
  const { error } = await window.sb.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/index.html" });
  if (error) setMsg("login", "error", error.message);
  else setMsg("login", "success", "📧 Password reset email sent — check your inbox.");
}

async function handleLogout() {
  await window.sb.auth.signOut();
  window.currentUser = null;
  window.location.href = "index.html";
}

// ── Login page screen switching ──────────────────
function showScreen(name) {
  ["screen-login","screen-signup"].forEach(id => document.getElementById(id)?.classList.add("hidden"));
  const map = { login:"screen-login", signup:"screen-signup" };
  document.getElementById(map[name])?.classList.remove("hidden");
}

// ── Data loading ─────────────────────────────────
async function loadUserProgress(userId) {
  try {
    const [statesRes, reviewsRes, streaksRes] = await Promise.all([
      window.sb.from("card_states").select("*").eq("user_id", userId),
      window.sb.from("card_reviews").select("*").eq("user_id", userId).order("reviewed_at", { ascending: false }).limit(500),
      window.sb.from("streaks").select("*").eq("user_id", userId).order("study_date", { ascending: false }).limit(35)
    ]);
    return {
      states:  statesRes.data  || [],
      reviews: reviewsRes.data || [],
      streaks: streaksRes.data || []
    };
  } catch (e) {
    console.error("loadUserProgress error:", e);
    return { states: [], reviews: [], streaks: [] };
  }
}

async function saveReviewToSupabase(userId, { cardId, topic, rating, isError, cardState }) {
  try {
    const todayStr = new Date().toISOString().split("T")[0];
    await Promise.all([
      window.sb.from("card_reviews").insert({ user_id: userId, card_id: String(cardId), topic, rating, is_error: isError, reviewed_at: new Date().toISOString() }),
      window.sb.from("card_states").upsert({ user_id: userId, card_id: String(cardId), next_review: cardState.next_review ? new Date(cardState.next_review).toISOString() : null, interval_days: cardState.interval_days || 1, ease_factor: cardState.ease_factor || 2.5 }, { onConflict: "user_id,card_id" }),
      window.sb.from("streaks").upsert({ user_id: userId, study_date: todayStr, cards_reviewed: 1 }, { onConflict: "user_id,study_date" })
    ]);
  } catch (e) { console.error("saveReviewToSupabase error:", e); }
}

// ── Data conversion ───────────────────────────────
function buildProgressFromSupabase({ states, reviews }) {
  const progress = {};
  reviews.forEach(r => {
    const id = parseInt(r.card_id);
    if (!progress[id]) progress[id] = { attempts:0, correct:0, wrong:0, lastSeen:null, next_review:null, interval_days:1, ease_factor:2.5 };
    progress[id].attempts++;
    if (r.rating >= 3) progress[id].correct++;
    if (r.rating === 1) progress[id].wrong = (progress[id].wrong||0)+1;
    if (!progress[id].lastSeen || r.reviewed_at > progress[id].lastSeen) progress[id].lastSeen = r.reviewed_at;
  });
  states.forEach(s => {
    const id = parseInt(s.card_id);
    if (!progress[id]) progress[id] = { attempts:0, correct:0, wrong:0, lastSeen:null, next_review:null, interval_days:1, ease_factor:2.5 };
    progress[id].next_review   = s.next_review ? new Date(s.next_review).getTime() : null;
    progress[id].interval_days = s.interval_days;
    progress[id].ease_factor   = s.ease_factor;
  });
  return progress;
}
function buildDailyFromSupabase({ reviews }) {
  const daily = {};
  reviews.forEach(r => {
    const d = r.reviewed_at.split("T")[0];
    if (!daily[d]) daily[d] = { seen:0, correct:0, seconds:0 };
    daily[d].seen++;
    if (r.rating >= 3) daily[d].correct++;
  });
  return daily;
}
function buildAttemptsFromSupabase({ reviews }) {
  return reviews.map(r => ({ cardId: parseInt(r.card_id), correct: r.rating >= 3, kind: r.rating === 1 ? "wrong" : r.rating === 2 ? "lucky" : "correct", mistakeType: null, timestamp: r.reviewed_at })).reverse();
}
function calcStreakFromDaily(daily) {
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const s = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    if (daily[s]?.seen > 0) streak++;
    else if (i > 0) break;
  }
  return streak;
}
function calcPredictedScore(progress) {
  let totalCorrect = 0, totalAttempts = 0;
  Object.values(progress).forEach(s => { if (s?.attempts > 0) { totalAttempts += s.attempts; totalCorrect += s.correct||0; } });
  if (totalAttempts < 5) return null;
  return Math.round(550 + (totalCorrect / totalAttempts) * 200);
}

// ── Auth state listener ───────────────────────────
window.sb.auth.onAuthStateChange(async (event, session) => {
  if (session?.user) {
    window.currentUser = session.user;

    if (_isAuthPage) {
      // On login page → redirect to app
      window.location.href = "practice.html";
      return;
    }

    // On app pages → load data and init
    showLoading(true);
    const data = await loadUserProgress(session.user.id);
    window._supabaseProgress = buildProgressFromSupabase(data);
    window._supabaseDaily    = buildDailyFromSupabase(data);
    window._supabaseAttempts = buildAttemptsFromSupabase(data);

    const streak = calcStreakFromDaily(window._supabaseDaily);
    const score  = calcPredictedScore(window._supabaseProgress);

    // Update nav
    if (typeof window.updateNavUser === "function") window.updateNavUser(session.user, streak, score);

    // Call page-specific init
    let tries = 0;
    const tryInit = () => {
      if (typeof window.initPage === "function") {
        window.initPage();
        showLoading(false);
      } else if (tries++ < 30) {
        setTimeout(tryInit, 100);
      } else {
        console.error("initPage() not found");
        showLoading(false);
      }
    };
    setTimeout(tryInit, 50);

  } else {
    window.currentUser = null;
    showLoading(false);
    if (!_isAuthPage) {
      // Not logged in on an app page → redirect to login
      window.location.href = "index.html";
    } else {
      // Show login screen
      showScreen("login");
    }
  }
});

// ── On page load: check session ───────────────────
(async () => {
  const { data: { session } } = await window.sb.auth.getSession();
  if (!session) {
    showLoading(false);
    if (!_isAuthPage) {
      window.location.href = "index.html";
    } else {
      showScreen("login");
    }
  }
})();
