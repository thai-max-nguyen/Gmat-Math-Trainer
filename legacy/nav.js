// ═══════════════════════════════════════════════════
//  nav.js — Shared sidebar nav + auth guard
//  Injected on every app page (not index.html)
// ═══════════════════════════════════════════════════

(function() {
  // ── Determine current page ──────────────────────
  const path     = window.location.pathname;
  const page     = path.split("/").pop() || "practice.html";
  const isActive = (p) => page === p ? "active" : "";

  // ── Build sidebar HTML ──────────────────────────
  const sidebarHTML = `
  <aside class="sidebar" id="app-sidebar">
    <div class="sidebar-logo">
      <div class="logo-icon">
        <span class="material-symbols-outlined text-white text-xl" style="font-variation-settings:'FILL' 1">school</span>
      </div>
      <div>
        <div style="font-size:15px;font-weight:800;color:#f8fafc;letter-spacing:-0.02em">GMAT Trainer</div>
        <div style="font-size:10px;font-weight:600;color:#3b82f6;text-transform:uppercase;letter-spacing:0.08em">Pro</div>
      </div>
    </div>

    <nav class="nav-section" style="flex:1">
      <div class="nav-section-label">Study</div>
      <a href="practice.html" class="nav-link ${isActive('practice.html')}">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' ${isActive('practice.html') ? '1' : '0'}">edit_note</span>
        Practice
      </a>
      <a href="errors.html" class="nav-link ${isActive('errors.html')}">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' ${isActive('errors.html') ? '1' : '0'}">error</span>
        Error Log
        <span id="nav-errors-badge" class="badge badge-rose" style="margin-left:auto;display:none"></span>
      </a>
      <a href="cards.html" class="nav-link ${isActive('cards.html')}">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' ${isActive('cards.html') ? '1' : '0'}">style</span>
        All Cards
      </a>

      <div class="nav-section-label" style="margin-top:12px">Insights</div>
      <a href="analytics.html" class="nav-link ${isActive('analytics.html')}">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' ${isActive('analytics.html') ? '1' : '0'}">analytics</span>
        Analytics
      </a>
    </nav>

    <div class="sidebar-footer">
      <!-- Streak/score mini-stat -->
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <div style="flex:1;background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.15);border-radius:10px;padding:10px;text-align:center">
          <div id="nav-streak" style="font-size:20px;font-weight:800;color:#3b82f6">0</div>
          <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em">Streak</div>
        </div>
        <div style="flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center">
          <div id="nav-score" style="font-size:20px;font-weight:800;color:#f8fafc">—</div>
          <div style="font-size:10px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.05em">Score</div>
        </div>
      </div>

      <!-- User block -->
      <div class="sidebar-user" id="nav-user-btn" onclick="toggleNavMenu()">
        <div class="sidebar-avatar" id="nav-avatar">?
          <span class="online-dot"></span>
        </div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name" id="nav-username">Loading…</div>
          <div class="sidebar-user-email" id="nav-email"></div>
        </div>
        <span class="material-symbols-outlined" style="font-size:18px;color:#64748b;flex-shrink:0">more_vert</span>

        <!-- Dropdown -->
        <div class="user-menu-dropdown" id="nav-user-menu">
          <div style="font-size:12px;color:#64748b;margin-bottom:8px;font-weight:600">Account</div>
          <button class="dropdown-logout" onclick="handleLogout()">
            <span class="material-symbols-outlined" style="font-size:18px">logout</span>
            Log out
          </button>
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.05);font-size:10px;color:#334155;text-align:center">GMAT Trainer v3.1</div>
        </div>
      </div>
    </div>
  </aside>`;

  // ── Inject sidebar into page ─────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    const shell = document.getElementById("app-shell");
    if (shell) shell.insertAdjacentHTML("afterbegin", sidebarHTML);
  });

  // ── Auth guard + populate user UI ───────────────
  window._navReady = false;

  window.updateNavUser = function(user, streak, score) {
    const email    = user?.email || "";
    const namePart = email.split("@")[0];
    const letter   = namePart[0]?.toUpperCase() || "?";
    const el = (id) => document.getElementById(id);
    if (el("nav-avatar"))   el("nav-avatar").childNodes[0].textContent = letter;
    if (el("nav-username")) el("nav-username").textContent = namePart;
    if (el("nav-email"))    el("nav-email").textContent = email;
    if (el("nav-streak"))   el("nav-streak").textContent = streak ?? 0;
    if (el("nav-score"))    el("nav-score").textContent  = score  ?? "—";
  };

  window.updateNavErrorsBadge = function(count) {
    const badge = document.getElementById("nav-errors-badge");
    if (!badge) return;
    if (count > 0) { badge.textContent = count; badge.style.display = ""; }
    else badge.style.display = "none";
  };

  // Toggle dropdown
  window.toggleNavMenu = function() {
    const menu = document.getElementById("nav-user-menu");
    if (menu) menu.classList.toggle("open");
  };
  document.addEventListener("click", e => {
    const btn  = document.getElementById("nav-user-btn");
    const menu = document.getElementById("nav-user-menu");
    if (menu && btn && !btn.contains(e.target)) menu.classList.remove("open");
  });
})();
