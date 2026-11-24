/* ==========================================================================
   Yris — Weiden housing course. Client-side application.

   Everything is stored in this browser (localStorage). There is no server:
   accounts, progress, payments and certificates live on the device that created them.
   ========================================================================== */

import { SEED_COURSE } from './course.js';
import { CATEGORY_BY_MODULE, EXAM_BLUEPRINT, EXTRA_QUESTIONS, PASS_MARK } from './exam.js';
import { STR } from './i18n.js';
import { icon, brandMark } from './icons.js';

/* ---------------------------------------------------------------- html helpers */
class Raw { constructor(s) { this.s = s; } }
const raw = (s) => new Raw(String(s));
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);
const flat = (v) => v instanceof Raw ? v.s : Array.isArray(v) ? v.map(flat).join('') : (v == null || v === false) ? '' : esc(v);
const html = (s, ...v) => new Raw(s.reduce((o, str, i) => o + str + (i < v.length ? flat(v[i]) : ''), ''));
const ic = (name, size, cls) => raw(icon(name, size, cls));
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------------------------------------------------------------- storage */
const NS = 'yris:v2:';
const mem = {};
const db = {
  get(k, fb) { try { const v = localStorage.getItem(NS + k); return v == null ? (k in mem ? mem[k] : fb) : JSON.parse(v); } catch { return k in mem ? mem[k] : fb; } },
  set(k, v) { mem[k] = v; try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch { /* private mode: keep in memory */ } },
  remove(k) { delete mem[k]; try { localStorage.removeItem(NS + k); } catch { /* ignore */ } },
  clearAll() { Object.keys(mem).forEach((k) => delete mem[k]); try { Object.keys(localStorage).filter((k) => k.startsWith('yris:')).forEach((k) => localStorage.removeItem(k)); } catch { /* ignore */ } }
};
const sess = {
  get(k) { try { return sessionStorage.getItem('yris:' + k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem('yris:' + k, v); } catch { /* ignore */ } },
  remove(k) { try { sessionStorage.removeItem('yris:' + k); } catch { /* ignore */ } }
};

/* ---------------------------------------------------------------- crypto */
const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const rand = (n = 8) => hex(crypto.getRandomValues(new Uint8Array(n)));
async function hashSecret(secret, salt) {
  if (globalThis.crypto?.subtle) {
    const key = await crypto.subtle.importKey('raw', enc.encode(secret), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(salt), iterations: 120000, hash: 'SHA-256' }, key, 256);
    return hex(bits);
  }
  let h = 2166136261; const s = salt + ':' + secret;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return 'fallback-' + (h >>> 0).toString(16);
}

/* ---------------------------------------------------------------- state */
const DEFAULT_SETTINGS = { tagline: 'Housing basics for international students', fee: '9.90', institution: 'Yris Housing Academy', staffSalt: null, staffHash: null, demoShortcut: true };
const S = {
  lang: 'en', theme: 'auto',
  users: [], profiles: {}, progress: {}, certificates: [], payments: {}, settings: { ...DEFAULT_SETTINGS }, course: null, tests: [],
  session: null, staff: false,
  authTab: 'login', authError: '', showForgot: false, draft: {},
  quiz: {}, exam: null, edit: null
};

const t = (key, vars) => {
  let s = (STR[S.lang] && STR[S.lang][key]) ?? STR.en[key] ?? key;
  if (vars && 'n' in vars && s.includes('|')) s = s.split('|')[vars.n === 1 ? 0 : 1];
  if (vars) for (const k in vars) s = s.replaceAll('{' + k + '}', vars[k]);
  return s;
};

function load() {
  const prefs = db.get('prefs', {});
  S.lang = prefs.lang || ((navigator.language || 'en').toLowerCase().startsWith('de') ? 'de' : 'en');
  S.theme = prefs.theme || 'auto';
  S.course = db.get('course', null) || structuredClone(SEED_COURSE);
  S.users = db.get('users', []);
  S.profiles = db.get('profiles', {});
  S.progress = db.get('progress', {});
  S.certificates = db.get('certificates', []);
  S.payments = db.get('payments', {});
  S.settings = { ...DEFAULT_SETTINGS, ...db.get('settings', {}) };
  S.tests = db.get('tests', null);
  if (!S.tests || !S.tests.length) { S.tests = makeTests(); db.set('tests', S.tests); }
  const email = db.get('session', null);
  S.session = email && S.users.some((u) => u.email === email) ? email : null;
  S.staff = sess.get('staff') === '1';
}
const savePrefs = () => db.set('prefs', { lang: S.lang, theme: S.theme });
const save = (...keys) => keys.forEach((k) => db.set(k, ({ users: S.users, profiles: S.profiles, progress: S.progress, certificates: S.certificates, payments: S.payments, settings: S.settings, course: S.course, tests: S.tests })[k]));

/* ---------------------------------------------------------------- derived data */
const lessonsFlat = () => S.course.modules.flatMap((m) => m.lessons.map((l) => ({ m, l })));
const findLesson = (id) => lessonsFlat().find((x) => x.l.id === id);
const prog = (email) => (S.progress[email] ??= { completedLessons: {}, examAttempts: [], enrolled: false });
const doneCount = (email) => lessonsFlat().filter(({ l }) => prog(email).completedLessons[l.id]).length;
const pctOf = (email) => Math.round((100 * doneCount(email)) / Math.max(1, lessonsFlat().length));
const feePaid = (email) => !!S.payments[email]?.paid;
const profileOk = (email) => !!S.profiles[email]?.confirm;
const examPassed = (email) => prog(email).examAttempts.some((a) => a.passed);
const bestScore = (email) => Math.max(0, ...prog(email).examAttempts.map((a) => a.score));
const certOf = (email) => S.certificates.find((c) => c.email === email);
const examUnlocked = (email) => pctOf(email) >= 100 && feePaid(email) && profileOk(email);
const nextLesson = (email) => lessonsFlat().find(({ l }) => !prog(email).completedLessons[l.id]);
const fullName = (email) => {
  const p = S.profiles[email] || {}; const u = S.users.find((x) => x.email === email) || {};
  return [p.firstName || u.firstName, p.lastName].filter(Boolean).join(' ');
};
const initialsOf = (email) => {
  const p = S.profiles[email] || {}; const u = S.users.find((x) => x.email === email) || {};
  return (((p.firstName || u.firstName || '?')[0] || '?') + ((p.lastName || '')[0] || '')).toUpperCase();
};
const fmtDate = (ts) => new Date(ts).toLocaleDateString(S.lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const fmtMoney = (v) => '€' + String(v).replace(',', '.');
const wordsIn = (l) => l.sections.reduce((n, s) => n + (s.body.split(/\s+/).length + s.heading.split(/\s+/).length), 0);
const minutesIn = (l) => Math.max(1, Math.round(wordsIn(l) / 190));
const paras = (s) => String(s).split(/\n{2,}/).map((x) => x.trim()).filter(Boolean);

/* ---------------------------------------------------------------- randomness */
function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function seededOrder(n, seed) {
  let h = 2166136261; for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  const r = () => { h += 0x6D2B79F5; let x = h; x = Math.imul(x ^ (x >>> 15), x | 1); x ^= x + Math.imul(x ^ (x >>> 7), x | 61); return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* ---------------------------------------------------------------- exam engine */
function buildBank() {
  const bank = [];
  S.course.modules.forEach((m) => m.lessons.forEach((l) => l.quiz.forEach((q, i) => {
    bank.push({ id: `${l.id}_q${i}`, category: CATEGORY_BY_MODULE[m.id] || 'Housing basics', q: q.q, options: q.options, correct: q.correct });
  })));
  EXTRA_QUESTIONS.forEach(([category, q, options, correct], i) => bank.push({ id: `x${i}`, category, q, options, correct }));
  return bank;
}
/* Every paper uses distinct questions. If a category runs short, it is topped up from questions left over elsewhere. */
function pickPaper(bank) {
  const byCat = {};
  bank.forEach((q) => (byCat[q.category] ||= []).push(q));
  const used = new Set(); const out = [];
  for (const [cat, n] of Object.entries(EXAM_BLUEPRINT)) {
    shuffle(byCat[cat] || []).slice(0, n).forEach((q) => { out.push(q); used.add(q.id); });
  }
  const want = Object.values(EXAM_BLUEPRINT).reduce((a, b) => a + b, 0);
  if (out.length < want) shuffle(bank.filter((q) => !used.has(q.id))).slice(0, want - out.length).forEach((q) => out.push(q));
  return shuffle(out).map((q) => q.id);
}
function makeTests() {
  const bank = buildBank();
  return ['A', 'B', 'C'].map((n) => ({ id: 'paper' + n, name: n, qids: pickPaper(bank) }));
}
function startExam(kind) {
  const map = new Map(buildBank().map((q) => [q.id, q]));
  const test = S.tests[Math.floor(Math.random() * S.tests.length)];
  const qs = test.qids.map((id) => map.get(id)).filter(Boolean).map((q) => ({ ...q, order: shuffle([...q.options.keys()]) }));
  S.exam = { kind, paper: test.name, qs, answers: {}, submitted: false, result: null };
}
function gradeExam(ex) {
  const cats = {}; const wrong = []; let score = 0;
  ex.qs.forEach((q, i) => {
    const c = (cats[q.category] ||= { c: 0, t: 0 }); c.t++;
    if (ex.answers[i] === q.correct) { score++; c.c++; } else wrong.push({ q, given: ex.answers[i] });
  });
  const pct = Math.round((100 * score) / ex.qs.length);
  return { score, total: ex.qs.length, pct, passed: pct >= PASS_MARK, cats, wrong };
}

/* ---------------------------------------------------------------- routing */
const STUDENT_ROUTES = new Set(['start', 'profile', 'courses', 'home', 'course', 'lesson', 'exam', 'practice', 'certificate', 'documents', 'handbook']);
const STAFF_ROUTES = new Set(['staff', 'staff-payments', 'staff-documents', 'staff-settings', 'staff-lesson']);
function currentRoute() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/');
  return { name: name || '', arg: decodeURIComponent(rest.join('/') || '') };
}
const go = (path) => { if (location.hash === '#/' + path) route(); else location.hash = '#/' + path; };
const homeFor = () => S.staff ? 'staff' : (S.profiles[S.session]?.complete ? 'courses' : 'start');

function route() {
  closeModal(true);
  let { name, arg } = currentRoute();
  if (name === 'verify') { S.view = { name, arg }; return paint(true); }
  if (!S.session && !S.staff) { S.view = { name: 'auth', arg: '' }; return paint(true); }
  if (S.staff && !STAFF_ROUTES.has(name)) name = 'staff';
  if (S.session && !STUDENT_ROUTES.has(name)) name = homeFor() === 'start' ? 'start' : 'courses';
  const email = S.session;
  /* Guards */
  if (name === 'exam' && !examUnlocked(email)) { toast(t('toast.examLocked')); return go('course'); }
  if (name === 'certificate' && !certOf(email) && !examPassed(email)) { toast(t('toast.certLocked')); return go('course'); }
  if (name === 'exam' && (!S.exam || S.exam.kind !== 'final' || S.exam.submitted)) startExam('final');
  if (name === 'practice' && (!S.exam || S.exam.kind !== 'practice' || S.exam.submitted)) startExam('practice');
  if (name === 'staff-lesson') { const f = findLesson(arg); if (!f) return go('staff'); if (!S.edit || S.edit.id !== arg) S.edit = structuredClone(f.l); }
  S.view = { name, arg };
  paint(true);
}

/* ---------------------------------------------------------------- shell */
const root = () => document.getElementById('root');

function paint(newRoute = false) {
  document.documentElement.lang = S.lang;
  applyTheme();
  const v = S.view || { name: 'auth', arg: '' };
  let body, title;
  const V = VIEWS[v.name] || VIEWS.auth;
  ({ body, title } = V(v.arg));
  const bare = v.name === 'auth' || v.name === 'verify';
  root().innerHTML = (bare ? body : shell(v.name, title, body)).s;
  document.title = (title ? title + ' · ' : '') + 'Yris';
  afterPaint(v, newRoute);
}

function navModel() {
  if (S.staff) return {
    groups: [
      { label: t('nav.staffArea'), items: [['staff', t('nav.controls'), 'edit'], ['staff-payments', t('nav.payments'), 'wallet'], ['staff-documents', t('nav.documents'), 'file'], ['staff-settings', t('nav.settings'), 'sliders']] }
    ],
    tabs: [['staff', t('nav.controls'), 'edit'], ['staff-payments', t('nav.payments'), 'wallet'], ['staff-documents', t('nav.documents'), 'file'], ['staff-settings', t('nav.settings'), 'sliders']],
    active: (n) => n.replace('staff-lesson', 'staff')
  };
  const map = { course: 'courses', lesson: 'courses', exam: 'courses', practice: 'courses', start: 'courses', certificate: 'documents', handbook: 'documents' };
  return {
    groups: [
      { label: t('nav.learn'), items: [['courses', t('nav.courses'), 'book'], ['home', t('nav.home'), 'home']] },
      { label: t('nav.library'), items: [['documents', t('nav.documents'), 'file']] },
      { label: t('nav.account'), items: [['profile', t('nav.profile'), 'user']] }
    ],
    tabs: [['courses', t('nav.courses'), 'book'], ['home', t('nav.home'), 'home'], ['documents', t('nav.documents'), 'file'], ['profile', t('nav.profile'), 'user']],
    active: (n) => map[n] || n
  };
}

function shell(name, title, body) {
  const nav = navModel(); const active = nav.active(name);
  const email = S.session;
  const link = ([to, label, ico]) => html`<a class="nav-link" href="#/${to}" ${active === to ? raw('aria-current="page"') : ''}>${ic(ico, 20)}<span>${label}</span></a>`;
  const displayName = S.staff ? t('staff.name') : (fullName(email) || email);
  const sub = S.staff ? t('staff.role') : email;
  const mark = S.staff ? 'ST' : initialsOf(email);
  const home = S.staff ? 'staff' : 'courses';
  const dark = isDark();
  return html`
  <a class="skip-link" href="#view" data-act="skip">${t('a11y.skip')}</a>
  <div class="ambient" aria-hidden="true"><span></span><span></span><span></span></div>
  <div class="app">
    <aside class="sidebar" aria-label="${t('a11y.sidebar')}">
      <a class="brand" href="#/${home}" aria-label="Yris">
        ${raw(brandMark(36))}
        <span class="brand-text"><strong>Yris</strong><small>${S.staff ? t('staff.console') : S.settings.tagline}</small></span>
      </a>
      <div class="sidebar-scroll">
        <nav class="nav" aria-label="${t('a11y.main')}">
          ${nav.groups.map((g) => html`<div class="nav-label">${g.label}</div>${g.items.map(link)}`)}
        </nav>
      </div>
      <div class="sidebar-foot">
        <div class="profile-chip"><span class="avatar">${mark}</span>
          <div class="body"><strong class="truncate">${displayName}</strong><small class="truncate">${sub}</small></div>
          ${S.staff ? html`<span class="chip staff">${t('staff.tag')}</span>` : ''}
        </div>
        <div class="foot-actions">
          <button class="btn btn-ghost" data-act="lang" aria-label="${t('a11y.language')}">${ic('globe', 16)} ${S.lang.toUpperCase()}</button>
          <button class="btn btn-ghost" data-act="theme" aria-label="${t('a11y.theme')}">${ic(dark ? 'sun' : 'moon', 16)}</button>
          <button class="btn btn-ghost" data-act="logout" aria-label="${t('nav.logout')}">${ic('logout', 16)}</button>
        </div>
      </div>
    </aside>

    <div class="main">
      <header class="topbar" id="topbar">
        <a class="brand topbar-brand" href="#/${home}" aria-label="Yris">${raw(brandMark(32))}<span class="brand-text"><strong>Yris</strong></span></a>
        <span class="topbar-title">${title}</span>
        <div class="topbar-actions">
          ${S.staff ? '' : html`<button class="search-pill" data-act="search" aria-label="${t('search.open')}">${ic('search', 18)}<span>${t('search.placeholderShort')}</span><kbd>/</kbd></button>`}
          <button class="icon-btn only-mobile" data-act="lang" aria-label="${t('a11y.language')}"><b style="font-size:12px">${S.lang.toUpperCase()}</b></button>
          <button class="icon-btn only-mobile" data-act="theme" aria-label="${t('a11y.theme')}">${ic(dark ? 'sun' : 'moon', 18)}</button>
          <button class="icon-btn only-mobile" data-act="logout" aria-label="${t('nav.logout')}">${ic('logout', 18)}</button>
        </div>
      </header>
      <main class="view view-enter" id="view" tabindex="-1" aria-label="${title}">${body}</main>
      <p class="foot-note no-print">${t('foot.note')}</p>
    </div>

    <nav class="tabbar" aria-label="${t('a11y.main')}">
      ${nav.tabs.map(([to, label, ico]) => html`<a class="tab" href="#/${to}" ${active === to ? raw('aria-current="page"') : ''}>${ic(ico, 22)}<span>${label}</span></a>`)}
    </nav>
  </div>`;
}

function afterPaint(v, newRoute) {
  if (newRoute) { window.scrollTo(0, 0); const el = $('#view') || $('#auth-main'); if (el && v.name !== 'auth') el.focus({ preventScroll: true }); }
  if (v.name === 'certificate' && certOf(S.session)) drawQR();
  if (v.name === 'verify') drawQR();
  onScroll();
}

/* ---------------------------------------------------------------- theme */
const mq = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = () => S.theme === 'dark' || (S.theme === 'auto' && mq.matches);
function applyTheme() {
  const el = document.documentElement;
  if (S.theme === 'auto') el.removeAttribute('data-theme'); else el.setAttribute('data-theme', S.theme);
  const meta = $('meta[name="theme-color"]'); if (meta) meta.content = isDark() ? '#081318' : '#F1F5F7';
}

/* ---------------------------------------------------------------- toast + modal */
function toast(msg) {
  const host = $('#toasts'); if (!host) return;
  host.replaceChildren();
  const el = document.createElement('div'); el.className = 'toast';
  el.innerHTML = icon('check-circle', 18) + '<span></span>'; el.lastChild.textContent = msg;
  host.append(el);
  setTimeout(() => { el.style.transition = 'opacity .25s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 260); }, 2600);
}
let lastFocus = null;
function openModal(content, { top = false, cls = '' } = {}) {
  closeModal(true);
  lastFocus = document.activeElement;
  const host = $('#overlay');
  host.innerHTML = html`<div class="overlay ${top ? 'top' : ''}" data-act="backdrop"><div class="modal ${cls}" role="dialog" aria-modal="true" aria-labelledby="modal-title">${content}</div></div>`.s;
  const first = $('[autofocus], input, button.btn-primary, button', host.firstElementChild);
  first?.focus();
}
function closeModal(silent) {
  const host = $('#overlay'); if (!host || !host.firstChild) return;
  host.innerHTML = '';
  if (!silent && lastFocus && document.contains(lastFocus)) lastFocus.focus();
}
function confirmModal({ title, body, confirmLabel, danger = false, act, arg = '' }) {
  openModal(html`<h2 id="modal-title">${title}</h2><p class="muted">${body}</p>
    <div class="modal-actions"><button class="btn btn-ghost" data-act="close-modal">${t('common.cancel')}</button>
    <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-act="${act}" data-arg="${arg}" autofocus>${confirmLabel}</button></div>`);
}

/* ================================================================ VIEWS ================================================================ */
const pageHead = (title, subtitle, actions) => html`<div class="page-head"><div><h1>${title}</h1>${subtitle ? html`<p class="subtitle">${subtitle}</p>` : ''}</div>${actions ? html`<div class="actions">${actions}</div>` : ''}</div>`;
const progressBar = (pct, cls = '') => html`<div class="bar ${cls}" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="--v:${pct}%"></i></div>`;
function ring(pct, cls = 'accent', size = 84) {
  const r = 42, c = 2 * Math.PI * r;
  return html`<div class="ring ${cls}" style="--size:${size}px" role="img" aria-label="${pct}%"><svg viewBox="0 0 100 100"><circle class="track" cx="50" cy="50" r="${r}"/><circle class="value" cx="50" cy="50" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - pct / 100)).toFixed(1)}"/></svg><b>${pct}%</b></div>`;
}
const notFound = () => ({ title: t('common.notFound'), body: html`${pageHead(t('common.notFound'))}<a class="btn btn-primary" href="#/courses">${t('common.back')}</a>` });

/* ---------------------------------------------------------------- auth */
function viewAuth() {
  const tab = S.authTab; const setup = !S.settings.staffHash;
  const tabs = html`<div class="seg" role="tablist" aria-label="${t('auth.mode')}">
    <button role="tab" type="button" data-act="tab" data-arg="login" aria-selected="${String(tab === 'login')}">${t('auth.login')}</button>
    <button role="tab" type="button" data-act="tab" data-arg="register" aria-selected="${String(tab === 'register')}">${t('auth.register')}</button></div>`;
  const pw = (id, label, ph, auto) => html`<label class="field"><span>${label}</span><div class="input-affix"><input class="input" id="${id}" name="${id}" type="password" placeholder="${ph || ''}" autocomplete="${auto}" required>
    <button type="button" data-act="toggle-pw" data-arg="${id}" aria-label="${t('auth.showPassword')}">${ic('eye', 18)}</button></div></label>`;
  let form;
  if (tab === 'login') form = html`<form class="form" data-form="login" novalidate>
      <label class="field"><span>${t('auth.emailOrUser')}</span><input class="input" name="id" value="${S.draft.id || ''}" autocomplete="username" placeholder="you@example.com" required autofocus></label>
      ${pw('pass', t('auth.password'), '••••••••', 'current-password')}
      <div class="form-error" role="alert" ${S.authError ? '' : raw('hidden')}>${ic('alert', 16)}<span>${S.authError}</span></div>
      <button class="btn btn-primary btn-lg btn-block" type="submit">${t('auth.login')}</button>
      <button class="link-btn tiny" type="button" data-act="forgot" style="text-align:left">${t('auth.forgot')}</button>
      ${S.showForgot ? html`<div class="notice">${ic('info', 18)}<span>${t('auth.forgotBody')}</span></div>` : ''}
    </form>`;
  else if (tab === 'register') form = html`<form class="form" data-form="register" novalidate>
      <div class="form-grid">
        <label class="field"><span>${t('auth.firstName')} <i class="req">*</i></span><input class="input" name="first" value="${S.draft.first || ''}" autocomplete="given-name" placeholder="Alex" required autofocus></label>
        <label class="field"><span>${t('auth.username')}</span><input class="input" name="user" value="${S.draft.user || ''}" autocomplete="username" placeholder="alex92"></label>
      </div>
      <label class="field"><span>${t('auth.email')} <i class="req">*</i></span><input class="input" name="email" type="email" value="${S.draft.email || ''}" autocomplete="email" placeholder="you@example.com" required></label>
      ${pw('pass', t('auth.password') + ' *', t('auth.passwordHint'), 'new-password')}
      <div class="form-error" role="alert" ${S.authError ? '' : raw('hidden')}>${ic('alert', 16)}<span>${S.authError}</span></div>
      <button class="btn btn-primary btn-lg btn-block" type="submit">${t('auth.createAccount')}</button>
    </form>`;
  else form = html`<form class="form" data-form="staff" novalidate>
      <div><h2 id="staff-title">${setup ? t('staff.createTitle') : t('staff.loginTitle')}</h2><p class="muted small mt-8">${setup ? t('staff.createBody') : t('staff.loginBody')}</p></div>
      ${pw('pass', setup ? t('staff.newPasscode') : t('staff.passcode'), setup ? t('staff.passcodeHint') : '', setup ? 'new-password' : 'current-password')}
      ${setup ? pw('pass2', t('staff.confirmPasscode'), '', 'new-password') : ''}
      <div class="form-error" role="alert" ${S.authError ? '' : raw('hidden')}>${ic('alert', 16)}<span>${S.authError}</span></div>
      <button class="btn btn-primary btn-lg btn-block" type="submit">${setup ? t('staff.create') : t('staff.enter')}</button>
      ${setup ? '' : html`<button class="link-btn tiny" type="button" data-act="staff-reset" style="text-align:left">${t('staff.forgot')}</button>`}
      <button class="link-btn tiny" type="button" data-act="tab" data-arg="login" style="text-align:left">${ic('arrow-left', 14)} ${t('staff.back')}</button>
    </form>`;
  const body = html`
  <div class="ambient" aria-hidden="true"><span></span><span></span><span></span></div>
  <div class="auth-top">
    <button class="icon-btn" data-act="lang" aria-label="${t('a11y.language')}"><b style="font-size:12px">${S.lang.toUpperCase()}</b></button>
    <button class="icon-btn" data-act="theme" aria-label="${t('a11y.theme')}">${ic(isDark() ? 'sun' : 'moon', 18)}</button>
  </div>
  <main class="auth" id="auth-main"><div class="auth-grid">
    <section class="auth-intro">
      <div class="brand">${raw(brandMark(44))}<span class="brand-text"><strong style="font-size:22px">Yris</strong></span></div>
      <h1>${t('auth.headline')}</h1>
      <p class="lead">${t('auth.lead')}</p>
      <ul class="auth-points">
        <li><span class="dot">${ic('book', 18)}</span>${t('auth.p1')}</li>
        <li><span class="dot">${ic('shield', 18)}</span>${t('auth.p2')}</li>
        <li><span class="dot">${ic('award', 18)}</span>${t('auth.p3')}</li>
      </ul>
    </section>
    <section class="card auth-card" aria-label="${t('auth.access')}">
      ${tab === 'staff' ? '' : html`<div class="stack" style="--gap:6px;margin-bottom:18px"><h2>${tab === 'login' ? t('auth.welcome') : t('auth.start')}</h2><p class="muted small">${tab === 'login' ? t('auth.welcomeBody') : t('auth.startBody')}</p></div>${tabs}<div class="mt-16"></div>`}
      ${form}
      <div class="auth-foot">
        ${tab === 'staff' ? '' : html`<span><button class="link-btn tiny" type="button" data-act="tab" data-arg="staff">${t('auth.staff')}</button></span>`}
        <span>${t('auth.demoNote')}</span>
      </div>
    </section>
  </div></main>`;
  return { title: t('auth.login'), body };
}

/* ---------------------------------------------------------------- verify (public) */
function viewVerify(id) {
  const c = S.certificates.find((x) => x.id.toLowerCase() === String(id).toLowerCase());
  const body = html`<div class="ambient" aria-hidden="true"><span></span><span></span><span></span></div>
  <main class="auth" id="auth-main"><section class="card verify-card">
    <div class="brand" style="justify-content:center;margin-bottom:22px">${raw(brandMark(36))}<span class="brand-text"><strong>Yris</strong></span></div>
    ${c ? html`<div class="big ok">${ic('shield', 32)}</div><h1 style="font-size:26px">${t('verify.valid')}</h1><p class="muted mt-8">${t('verify.validBody')}</p>
      <dl class="kv"><dt>${t('cert.id')}</dt><dd class="mono">${c.id}</dd><dt>${t('verify.holder')}</dt><dd>${c.name}</dd><dt>${t('verify.course')}</dt><dd>${c.course}</dd><dt>${t('verify.issuedBy')}</dt><dd>${c.institution}</dd><dt>${t('cert.issued')}</dt><dd>${fmtDate(c.date)}</dd></dl>`
      : html`<div class="big no">${ic('alert', 32)}</div><h1 style="font-size:26px">${t('verify.invalid')}</h1><p class="muted mt-8">${t('verify.invalidBody')}</p><dl class="kv"><dt>${t('cert.id')}</dt><dd class="mono">${id}</dd></dl>`}
    <p class="tiny faint mt-24">${t('verify.note')}</p>
    <a class="btn btn-outline mt-16" href="#/">${t('common.openYris')}</a>
  </section></main>`;
  return { title: t('verify.title'), body };
}

/* ---------------------------------------------------------------- onboarding */
function disclaimer() { return html`<div class="notice">${ic('info', 18)}<div><strong>${t('disclaimer.title')}</strong><br>${t('disclaimer.body')}</div></div>`; }

function courseCard({ enrolled, pct, href }) {
  const status = pct >= 100 ? html`<span class="chip success">${ic('check', 14)} ${t('status.completed')}</span>` : enrolled ? html`<span class="chip accent">${t('status.enrolled')}</span>` : html`<span class="chip">${t('status.enroll')}</span>`;
  return html`<a class="card course-card" href="${href}">
    <div class="cover"><span class="chip">${ic('pin', 14)} ${S.course.city}</span>${ic('building', 56, 'big')}</div>
    <div class="body"><h3>${S.course.title}</h3>
      <div class="muted small">${t('course.summary', { n: lessonsFlat().length, m: S.course.modules.length })}</div>
      ${enrolled ? html`${progressBar(pct, 'thin')}<div class="spread tiny muted"><span>${pct}% ${t('common.complete')}</span>${status}</div>` : html`<div class="cluster">${status}<span class="chip success">${ic('shield', 14)} ${t('course.recognised')}</span></div>`}
    </div></a>`;
}

function viewStart() {
  const email = S.session;
  return { title: t('start.title'), body: html`${pageHead(t('start.title'), t('start.subtitle'))}
    <div class="grid-auto stagger" style="--min:300px">
      <button class="card course-card" data-act="enroll" style="cursor:pointer">
        <div class="cover"><span class="chip">${ic('pin', 14)} ${S.course.city}</span>${ic('building', 56, 'big')}</div>
        <div class="body"><h3>${S.course.title}</h3><div class="muted small">${t('course.summary', { n: lessonsFlat().length, m: S.course.modules.length })}</div>
          <div class="cluster"><span class="chip success">${ic('shield', 14)} ${t('course.recognised')}</span><span class="chip accent">${prog(email).enrolled ? t('status.enrolled') : t('status.enroll')}</span></div></div>
      </button>
    </div><div class="mt-24">${disclaimer()}</div>` };
}

/* ---------------------------------------------------------------- profile */
function viewProfile() {
  const email = S.session; const p = S.profiles[email] || {}; const u = S.users.find((x) => x.email === email) || {};
  const f = (name, label, { req, type = 'text', val, ph, ac, full, hint } = {}) => html`<label class="field ${full ? 'full' : ''}"><span>${label}${req ? html` <i class="req">*</i>` : ''}</span><input class="input" name="${name}" type="${type}" value="${val ?? p[name] ?? ''}" ${ph ? raw(`placeholder="${esc(ph)}"`) : ''} ${ac ? raw(`autocomplete="${ac}"`) : ''}>${hint ? html`<small class="hint">${hint}</small>` : ''}</label>`;
  return { title: t('nav.profile'), body: html`${pageHead(t('nav.profile'), t('profile.subtitle'))}
    <form class="card form" data-form="profile" novalidate style="max-width:760px">
      <div class="form-error" role="alert" id="profErr" hidden>${ic('alert', 16)}<span></span></div>
      <div class="form-grid">
        ${f('firstName', t('auth.firstName'), { req: true, val: p.firstName ?? u.firstName, ac: 'given-name' })}
        ${f('lastName', t('profile.lastName'), { req: true, ac: 'family-name' })}
        ${f('dob', t('profile.dob'), { type: 'date', ac: 'bday' })}
        ${f('phone', t('profile.phone'), { type: 'tel', ac: 'tel' })}
        ${f('address', t('profile.address'), { full: true, ac: 'street-address' })}
        ${f('postal', t('profile.postal'), { ac: 'postal-code' })}
        ${f('city', t('profile.city'), { req: true, val: p.city ?? S.course.city, ac: 'address-level2' })}
        ${f('country', t('profile.country'), { val: p.country ?? 'Germany', ac: 'country-name' })}
        ${f('uni', t('profile.uni'))}
        ${f('program', t('profile.program'), { full: true })}
        ${f('studentId', t('profile.studentId'), { hint: t('profile.optional') })}
      </div>
      <label class="check"><input type="checkbox" name="confirm" ${p.confirm ? 'checked' : ''}><span>${t('profile.confirm')}</span></label>
      <div class="form-actions"><button class="btn btn-primary" type="submit">${t('profile.save')}</button></div>
    </form>` };
}

/* ---------------------------------------------------------------- dashboard + home */
function viewCourses() {
  const email = S.session; const pr = prog(email); const pct = pctOf(email); const nxt = nextLesson(email);
  const name = (S.profiles[email]?.firstName || S.users.find((u) => u.email === email)?.firstName || '');
  if (!pr.enrolled) {
    return { title: t('nav.courses'), body: html`${pageHead(t('nav.courses'), t('courses.empty.sub'))}
      <div class="card center" style="padding:48px 24px"><div class="doc-icon" style="margin:0 auto 14px">${ic('book', 22)}</div><h2>${t('courses.empty.title')}</h2><p class="muted mt-8">${t('courses.empty.body')}</p><a class="btn btn-primary mt-16" href="#/start">${t('courses.browse')}</a></div>` };
  }
  const done = pct >= 100;
  const hero = html`<section class="hero"><div class="hero-row">
      <div class="stack" style="--gap:10px;max-width:520px">
        <span class="chip">${ic('pin', 14)} ${S.course.city}</span>
        <h1>${name ? t('courses.hello', { name }) : t('nav.courses')}</h1>
        <p class="muted">${done ? t('courses.doneBody') : nxt ? t('courses.upNext', { title: nxt.l.title }) : ''}</p>
        <div class="cluster mt-8">
          ${done ? html`<a class="btn btn-light btn-lg" href="#/course">${t('courses.review')} ${ic('arrow-right', 18)}</a>`
      : html`<a class="btn btn-light btn-lg" href="#/lesson/${nxt.l.id}">${t('courses.continue')} ${ic('arrow-right', 18)}</a>`}
          <a class="btn btn-glass btn-lg" href="#/course">${t('courses.overview')}</a>
        </div>
      </div>
      ${ring(pct, 'on-hero', 108)}
    </div></section>`;
  const stats = html`<div class="stats mt-16">
      <div class="stat"><div class="n">${doneCount(email)}<span class="faint" style="font-size:16px"> / ${lessonsFlat().length}</span></div><div class="l">${t('courses.stat.lessons')}</div></div>
      <div class="stat"><div class="n">${feePaid(email) ? '✓' : '—'}</div><div class="l">${t('courses.stat.fee')}</div></div>
      <div class="stat"><div class="n">${pr.examAttempts.length ? bestScore(email) + '%' : '—'}</div><div class="l">${t('courses.stat.best')}</div></div>
      <div class="stat"><div class="n">${certOf(email) ? '✓' : '—'}</div><div class="l">${t('courses.stat.cert')}</div></div></div>`;
  return { title: t('nav.courses'), body: html`${hero}${stats}
    <h2 class="section-title mt-24" style="margin-bottom:12px">${t('courses.yours')}</h2>
    <div class="grid-auto" style="--min:300px">${courseCard({ enrolled: true, pct, href: '#/course' })}</div>` };
}

function viewHome() {
  const email = S.session; const pr = prog(email); const pct = pctOf(email);
  const name = (S.profiles[email]?.firstName || S.users.find((u) => u.email === email)?.firstName || '');
  const steps = [['home.s1', 'home.s1d'], ['home.s2', 'home.s2d'], ['home.s3', 'home.s3d'], ['home.s4', 'home.s4d']];
  return { title: t('nav.home'), body: html`
    <section class="hero"><div class="stack" style="--gap:10px;max-width:620px">
      <span class="chip">${ic('sparkle', 14)} ${t('home.badge')}</span>
      <h1>${name ? t('home.hello', { name }) : t('home.welcome')}</h1><p class="muted">${t('home.lead')}</p></div></section>
    <h2 class="section-title mt-24">${t('home.how')}</h2>
    <ol class="steps stagger">${steps.map(([a, b]) => html`<li><strong>${t(a)}</strong><span>${t(b)}</span></li>`)}</ol>
    <h2 class="section-title mt-24">${t('home.available')}</h2>
    <div class="grid-auto" style="--min:300px">${courseCard({ enrolled: pr.enrolled, pct, href: pr.enrolled ? '#/course' : '#/start' })}</div>
    <div class="mt-24">${disclaimer()}</div>` };
}

/* ---------------------------------------------------------------- course */
function viewCourse() {
  const email = S.session; const pr = prog(email); const pct = pctOf(email);
  const paid = feePaid(email), prof = profileOk(email), all = pct >= 100, unlocked = examUnlocked(email), passed = examPassed(email), cert = certOf(email);
  const nxt = nextLesson(email);
  const row = (label, desc, ok, action) => html`<li class="${ok ? 'done' : ''}"><span class="check-dot">${ic('check', 14)}</span><div class="grow"><div class="t">${label}</div><div class="d">${desc}</div>${!ok && action ? html`<div class="mt-8">${action}</div>` : ''}</div></li>`;
  const modules = S.course.modules.map((m) => {
    const d = m.lessons.filter((l) => pr.completedLessons[l.id]).length;
    return html`<section class="card module" aria-labelledby="mod-${m.id}">
      <div class="module-head"><span class="module-icon" style="--c:${m.color}">${ic(m.icon, 22)}</span>
        <div class="grow"><h3 id="mod-${m.id}">${m.title}</h3><div class="meta">${t('course.moduleMeta', { d, n: m.lessons.length })}</div></div>
        ${d === m.lessons.length ? html`<span class="chip success">${ic('check', 14)}</span>` : ''}</div>
      ${m.lessons.map((l, i) => { const ok = pr.completedLessons[l.id]; return html`<a class="lesson-row ${ok ? 'done' : ''}" href="#/lesson/${l.id}" style="text-decoration:none"><span class="num">${ok ? ic('check', 14) : i + 1}</span><span class="t">${l.title}</span><span class="m">${t('course.questions', { n: l.quiz.length })}</span>${ic('chevron-right', 18)}</a>`; })}
    </section>`;
  });
  return { title: S.course.title, body: html`
    <a class="back-link" href="#/courses">${ic('chevron-left', 16)} ${t('nav.courses')}</a>
    <section class="hero"><div class="hero-row"><div class="stack" style="--gap:10px;max-width:560px">
        <span class="chip">${ic('pin', 14)} ${S.course.city}</span><h1>${S.course.title}</h1>
        <p class="muted">${t('course.summary', { n: lessonsFlat().length, m: S.course.modules.length })}</p>
        <div class="cluster mt-8">${nxt ? html`<a class="btn btn-light" href="#/lesson/${nxt.l.id}">${pct ? t('courses.continue') : t('course.start')} ${ic('arrow-right', 16)}</a>` : html`<span class="chip">${ic('check', 14)} ${t('course.allDone')}</span>`}</div></div>
      ${ring(pct, 'on-hero', 108)}</div></section>
    <div class="layout-course mt-24">
      <div class="stack stagger">${modules}</div>
      <aside class="stack sticky" aria-label="${t('course.assessment')}">
        <div class="card">
          <div class="card-head"><h2>${ic('award', 20)} ${t('course.assessment')}</h2></div>
          <ul class="checklist">
            ${row(t('course.c1'), t('course.c1d', { d: doneCount(email), n: lessonsFlat().length }), all)}
            ${row(t('course.c2'), t('course.c2d'), prof, html`<a class="btn btn-sm btn-outline" href="#/profile">${t('course.c2a')}</a>`)}
            ${row(t('course.c3', { fee: fmtMoney(S.settings.fee) }), paid ? t('course.c3paid') : t('course.c3d'), paid, html`<button class="btn btn-sm btn-outline" data-act="pay">${t('course.c3a')}</button>`)}
            ${row(t('course.c4', { n: PASS_MARK }), pr.examAttempts.length ? t('course.c4best', { n: bestScore(email) }) : t('course.c4d'), passed)}
            ${row(t('course.c5'), t('course.c5d'), !!cert, passed ? html`<a class="btn btn-sm btn-outline" href="#/certificate">${t('course.c5a')}</a>` : null)}
          </ul>
          <div class="card-foot stack" style="--gap:10px">
            <a class="btn btn-block ${unlocked && !passed ? 'btn-primary' : 'btn-outline'}" href="#/exam" ${unlocked ? '' : raw('aria-disabled="true" tabindex="-1"')}>${ic(unlocked ? 'play' : 'lock', 16)} ${t('exam.final')}</a>
            ${unlocked ? '' : html`<p class="tiny faint">${t('course.locked')}</p>`}
            <a class="btn btn-block btn-ghost" href="#/practice">${t('exam.practice')}</a>
            ${S.settings.demoShortcut && !unlocked ? html`<button class="link-btn tiny" data-act="demo-unlock" style="text-align:left">${t('course.demo')}</button>` : ''}
          </div>
        </div>
      </aside></div>` };
}

/* ---------------------------------------------------------------- lesson */
function viewLesson(id) {
  const f = findLesson(id); if (!f) return notFound();
  const { m, l } = f; const email = S.session; const pr = prog(email);
  const qs = (S.quiz[l.id] ||= { answers: {}, checked: false });
  const flatL = lessonsFlat(); const i = flatL.findIndex((x) => x.l.id === l.id); const prev = flatL[i - 1], next = flatL[i + 1];
  const correctN = l.quiz.filter((q, qi) => qs.answers[qi] === q.correct).length;
  const allRight = qs.checked && correctN === l.quiz.length;
  const answered = Object.keys(qs.answers).length;
  const quiz = l.quiz.map((q, qi) => {
    const chosen = qs.answers[qi]; const ok = chosen === q.correct;
    return html`<fieldset class="card q" style="border:1px solid var(--glass-border)">
      <legend class="sr-only">${t('lesson.question', { n: qi + 1 })}</legend>
      <div class="q-head"><span class="q-num">${qi + 1}</span><div class="q-text">${q.q}</div></div>
      <div class="opts">${seededOrder(q.options.length, l.id + qi).map((oi) => {
      let cls = 'opt'; if (qs.checked) { cls += ' is-locked'; if (oi === q.correct) cls += ' is-correct'; else if (oi === chosen) cls += ' is-wrong'; } else if (chosen === oi) cls += ' is-selected';
      return html`<label class="${cls}"><input type="radio" name="lq-${qi}" value="${oi}" data-pick="lesson" data-q="${qi}" ${chosen === oi ? 'checked' : ''} ${qs.checked ? 'disabled' : ''}><span class="mark">${ic('check', 12)}</span><span>${q.options[oi]}</span></label>`;
    })}</div>
      ${qs.checked ? html`<div class="feedback ${ok ? 'ok' : 'bad'}" role="status">${ic(ok ? 'check-circle' : 'alert', 16)} ${ok ? t('lesson.correct') : t('lesson.incorrect')}</div>` : ''}
    </fieldset>`;
  });
  return { title: l.title, body: html`
    <a class="back-link" href="#/course">${ic('chevron-left', 16)} ${S.course.title}</a>
    <article class="article">
      <header class="article-head">
        <div class="meta"><span class="chip accent" style="--c:${m.color}">${m.title}</span><span class="chip">${ic('clock', 14)} ${t('lesson.minutes', { n: minutesIn(l) })}</span>${pr.completedLessons[l.id] ? html`<span class="chip success">${ic('check', 14)} ${t('status.completed')}</span>` : ''}</div>
        <h1>${l.title}</h1>
        ${S.lang === 'de' ? html`<p class="small faint mt-8">${t('lesson.englishOnly')}</p>` : ''}
      </header>
      ${l.sections.map((s) => html`<section class="card prose-card"><h2>${s.heading}</h2>${paras(s.body).map((p) => html`<p>${p}</p>`)}</section>`)}
      <h2 class="section-title mt-24" style="margin-bottom:12px">${t('lesson.check')}</h2>
      <div class="quiz">${quiz}</div>
      <div class="cluster mt-16" id="quizControls">
        ${!qs.checked ? html`<button class="btn btn-primary" data-act="check-quiz" ${answered < l.quiz.length ? 'disabled' : ''} id="checkBtn">${t('lesson.checkBtn')}</button><span class="small faint" id="quizCount">${t('lesson.answered', { a: answered, n: l.quiz.length })}</span>`
      : allRight ? html`<button class="btn btn-primary btn-lg" data-act="complete-lesson" data-arg="${l.id}">${ic('check', 18)} ${next ? t('lesson.completeNext') : t('lesson.complete')}</button>`
        : html`<button class="btn btn-primary" data-act="retry-quiz">${ic('refresh', 16)} ${t('lesson.retry')}</button><span class="small muted">${t('lesson.score', { c: correctN, n: l.quiz.length })}</span>`}
      </div>
      <nav class="lesson-nav" aria-label="${t('lesson.nav')}">
        ${prev ? html`<a class="btn btn-outline" href="#/lesson/${prev.l.id}">${ic('arrow-left', 16)} ${prev.l.title}</a>` : html`<span></span>`}
        ${next ? html`<a class="btn btn-outline" href="#/lesson/${next.l.id}">${next.l.title} ${ic('arrow-right', 16)}</a>` : ''}
      </nav>
    </article>` };
}

/* ---------------------------------------------------------------- exam */
function viewExam(practice) {
  const ex = S.exam; if (!ex) return notFound();
  const label = practice ? t('exam.practice') : t('exam.final');
  const total = ex.qs.length;
  if (ex.submitted) {
    const r = ex.result;
    const cats = Object.entries(r.cats);
    return { title: label, body: html`
      <a class="back-link" href="#/course">${ic('chevron-left', 16)} ${S.course.title}</a>
      <section class="card"><div class="result-hero">
        ${ring(r.pct, r.passed ? 'pass' : 'fail', 120)}
        <div class="stack grow" style="--gap:8px">
          <span class="chip ${r.passed ? 'success' : 'danger'}" style="align-self:flex-start">${practice ? t('exam.practiceTag') : t('exam.finalTag')}</span>
          <h1 style="font-size:28px">${r.passed ? t('exam.passed') : t('exam.notPassed')}</h1>
          <p class="muted">${t('exam.scoreLine', { c: r.score, n: r.total, p: r.pct })} ${r.passed ? '' : t('exam.needPct', { n: PASS_MARK })}</p>
          <div class="cluster mt-8">
            ${!practice && r.passed ? html`<a class="btn btn-primary" href="#/certificate">${t('exam.toCert')} ${ic('arrow-right', 16)}</a>` : ''}
            ${!r.passed || practice ? html`<button class="btn btn-primary" data-act="retry-exam" data-arg="${practice ? 'practice' : 'final'}">${ic('refresh', 16)} ${t('exam.another')}</button>` : ''}
            <a class="btn btn-outline" href="#/course">${t('exam.back')}</a>
          </div></div></div></section>
      <section class="card mt-16"><div class="card-head"><h2>${t('exam.byTopic')}</h2></div>
        <div class="breakdown">${cats.map(([c, v]) => { const p = Math.round(100 * v.c / v.t); return html`<div class="row"><span>${t('cat.' + c)}</span>${progressBar(p, 'thin')}<b>${v.c}/${v.t}</b></div>`; })}</div></section>
      <h2 class="section-title mt-24" style="margin-bottom:12px">${r.wrong.length ? t('exam.review', { n: r.wrong.length }) : t('exam.perfect')}</h2>
      <div class="stack">${r.wrong.map(({ q, given }) => html`<article class="card review-item"><div class="q-text">${q.q}<span class="cat">${t('cat.' + q.category)}</span></div>
        <div class="ans"><div class="no">${ic('x', 16)}<span>${given == null ? t('exam.unanswered') : q.options[given]}</span></div><div class="yes">${ic('check', 16)}<span>${q.options[q.correct]}</span></div></div></article>`)}</div>` };
  }
  const answered = Object.keys(ex.answers).length; const pct = Math.round(100 * answered / total);
  return { title: label, body: html`
    <a class="back-link" href="#/course">${ic('chevron-left', 16)} ${S.course.title}</a>
    <div class="card exam-bar"><div class="spread"><div><div class="eyebrow">${practice ? t('exam.practiceTag') : t('exam.finalTag')} · ${t('exam.paper', { n: ex.paper })}</div><strong id="examCount" class="tabular">${t('exam.answered', { a: answered, n: total })}</strong></div>
      <button class="btn btn-primary" data-act="submit-exam" id="submitBtn" ${answered < total ? 'disabled' : ''}>${t('exam.submit')}</button></div><div class="mt-8" id="examBar">${progressBar(pct, 'thin')}</div></div>
    <div class="quiz">${ex.qs.map((q, qi) => html`<fieldset class="card q" style="border:1px solid var(--glass-border)"><legend class="sr-only">${t('lesson.question', { n: qi + 1 })}</legend>
      <div class="q-head"><span class="q-num">${qi + 1}</span><div class="q-text">${q.q}<span class="cat">${t('cat.' + q.category)}</span></div></div>
      <div class="opts">${q.order.map((oi) => html`<label class="opt ${ex.answers[qi] === oi ? 'is-selected' : ''}"><input type="radio" name="eq-${qi}" value="${oi}" data-pick="exam" data-q="${qi}" ${ex.answers[qi] === oi ? 'checked' : ''}><span class="mark">${ic('check', 12)}</span><span>${q.options[oi]}</span></label>`)}</div></fieldset>`)}</div>
    <div class="cluster mt-16"><button class="btn btn-primary btn-lg" data-act="submit-exam" ${answered < total ? 'disabled' : ''} id="submitBtn2">${t('exam.submit')}</button></div>` };
}

/* ---------------------------------------------------------------- certificate */
const DECLARATION = 'I understand that these rules apply in real life. I accept responsibility for following these housing practices and maintaining my accommodation responsibly.';
const DECLARATION_DE = 'Ich verstehe, dass diese Regeln im echten Leben gelten. Ich übernehme die Verantwortung, diese Wohnpraktiken zu befolgen und meine Unterkunft verantwortungsvoll zu pflegen.';
const declText = () => S.lang === 'de' ? DECLARATION_DE : DECLARATION;
const norm = (s) => String(s).replace(/\s+/g, ' ').trim().toLowerCase();

function seal() {
  return html`<svg class="seal" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="g" cx="35%" cy="30%"><stop offset="0" stop-color="#F3DB8E"/><stop offset=".6" stop-color="#C99A35"/><stop offset="1" stop-color="#A67A1F"/></radialGradient></defs>
    <path fill="url(#g)" d="M50 3l7 6 9-2 5 8 9 2 1 9 7 6-4 8 2 9-8 5-2 9-9 1-6 7-8-4-8 4-6-7-9-1-2-9-8-5 2-9-4-8 7-6 1-9 9-2 5-8 9 2z"/>
    <circle cx="50" cy="50" r="30" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.2"/><circle cx="50" cy="50" r="26" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width=".8" stroke-dasharray="2 2.4"/>
    <path d="M37 38l13 14 13-14M50 52v14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function certificateEl(c) {
  return html`<div class="certificate" id="certArea" role="img" aria-label="${t('cert.title')} — ${c.name}">
    <div class="frame"></div>
    <div class="inner">
      <div class="c-brand">${raw(brandMark(30))}<span>Yris</span></div>
      <div class="c-kicker">${c.institution}</div>
      <h2 class="c-title">${t('cert.title')}</h2>
      <div class="c-kicker sub">${t('cert.awarded')}</div>
      <div class="c-name">${c.name}</div>
      <p class="c-text">${t('cert.body', { course: c.course, city: c.city })}</p>
      ${seal()}
      <div class="c-foot">
        <div class="left">${t('cert.issued')}<b>${fmtDate(c.date)}</b></div>
        <div class="c-qr" id="qrHolder" data-verify="${verifyUrl(c.id)}"></div>
        <div class="right">${t('cert.id')}<b>${c.id}</b></div>
      </div>
    </div></div>`;
}
const verifyUrl = (id) => `${location.origin}${location.pathname}#/verify/${id}`;

function viewCertificate() {
  const email = S.session; const c = certOf(email);
  if (!c) {
    return { title: t('decl.title'), body: html`
      <a class="back-link" href="#/course">${ic('chevron-left', 16)} ${S.course.title}</a>
      ${pageHead(t('decl.title'), t('decl.subtitle'))}
      <div class="stack" style="max-width:720px;--gap:18px">
        <blockquote class="decl" style="margin:0">${declText()}</blockquote>
        <label class="field"><span>${t('decl.type')}</span><textarea class="textarea" id="declArea" data-decl placeholder="${t('decl.placeholder')}" autocomplete="off" spellcheck="false"></textarea><small class="hint">${t('decl.hint')}</small></label>
        <div><button class="btn btn-primary btn-lg" data-act="issue-cert" id="issueBtn" disabled>${ic('award', 18)} ${t('decl.generate')}</button></div>
      </div>` };
  }
  return { title: t('cert.page'), body: html`
    <a class="back-link no-print" href="#/documents">${ic('chevron-left', 16)} ${t('nav.documents')}</a>
    <div class="no-print">${pageHead(t('cert.page'), t('cert.subtitle'), html`<button class="btn btn-primary" data-act="print-cert">${ic('print', 16)} ${t('cert.print')}</button>`)}</div>
    <div class="cert-stage">${certificateEl(c)}</div>
    <p class="small faint mt-16 no-print center">${t('cert.verifyNote')}</p>` };
}
function drawQR() {
  const holder = $('#qrHolder'); if (!holder || holder.childElementCount) return;
  if (window.QRCode) { try { new window.QRCode(holder, { text: holder.dataset.verify, width: 72, height: 72, colorDark: '#0D1F29', colorLight: '#ffffff', correctLevel: window.QRCode.CorrectLevel.M }); } catch { /* ignore */ } }
}

/* ---------------------------------------------------------------- documents + handbook */
function viewDocuments() {
  const email = S.session; const c = certOf(email); const p = S.profiles[email] || {};
  const card = (href, ico, title, desc, locked, chip) => html`<a class="card doc-card ${locked ? 'locked' : ''}" href="${href}" style="text-decoration:none"><span class="doc-icon">${ic(locked ? 'lock' : ico, 22)}</span><div class="stack" style="--gap:4px"><h3>${title}</h3><p>${desc}</p></div>${chip}</a>`;
  return { title: t('nav.documents'), body: html`${pageHead(t('nav.documents'), t('docs.subtitle'))}
    <div class="grid-auto stagger" style="--min:260px">
      ${card(c ? '#/certificate' : '#/course', 'award', t('docs.cert'), c ? t('docs.certReady', { id: c.id }) : t('docs.certLocked'), !c, c ? html`<span class="chip success">${ic('check', 14)} ${t('docs.issued')}</span>` : html`<span class="chip">${t('docs.locked')}</span>`)}
      ${card('#/handbook', 'book', t('docs.handbook'), t('docs.handbookDesc'), false, html`<span class="chip accent">${t('docs.printable')}</span>`)}
      ${card('#/profile', 'id', t('docs.personal'), p.complete ? t('docs.personalDesc', { name: fullName(email) }) : t('docs.personalEmpty'), false, p.confirm ? html`<span class="chip success">${ic('check', 14)} ${t('docs.confirmed')}</span>` : html`<span class="chip warning">${t('docs.incomplete')}</span>`)}
    </div>` };
}
function viewHandbook() {
  return { title: t('docs.handbook'), body: html`
    <a class="back-link no-print" href="#/documents">${ic('chevron-left', 16)} ${t('nav.documents')}</a>
    <div class="no-print">${pageHead(t('docs.handbook'), t('handbook.subtitle'), html`<button class="btn btn-primary" data-act="print-book">${ic('print', 16)} ${t('handbook.print')}</button>`)}</div>
    <article class="card handbook">
      <div class="eyebrow">${S.settings.institution}</div><h1 style="margin-top:6px">${S.course.title}</h1><p class="muted mt-8">${S.course.city}</p>
      ${S.course.modules.map((m, mi) => html`<section class="hb-module"><h2 class="hb-title"><span class="module-icon" style="--c:${m.color}">${ic(m.icon, 20)}</span>${mi + 1}. ${m.title}</h2>
        ${m.lessons.map((l, li) => html`<div class="hb-lesson"><h3>${mi + 1}.${li + 1} ${l.title}</h3>${l.sections.map((s) => html`<h4>${s.heading}</h4>${paras(s.body).map((p) => html`<p>${p}</p>`)}`)}</div>`)}</section>`)}
    </article>` };
}

/* ---------------------------------------------------------------- staff */
function staffStats() {
  const students = S.users.length; const paid = S.users.filter((u) => feePaid(u.email)).length;
  const avg = students ? Math.round(S.users.reduce((a, u) => a + pctOf(u.email), 0) / students) : 0;
  return html`<div class="stats">
    <div class="stat"><div class="n">${students}</div><div class="l">${t('staff.stat.students')}</div></div>
    <div class="stat"><div class="n">${avg}%</div><div class="l">${t('staff.stat.avg')}</div></div>
    <div class="stat"><div class="n">${paid}</div><div class="l">${t('staff.stat.paid')}</div></div>
    <div class="stat"><div class="n">${S.certificates.length}</div><div class="l">${t('staff.stat.certs')}</div></div></div>`;
}
const staffBar = (label) => html`<div class="chip staff" style="margin-bottom:14px">${t('staff.tag')} · ${label}</div>`;

function viewStaff() {
  return { title: t('nav.controls'), body: html`${staffBar(t('nav.controls'))}${pageHead(t('nav.controls'), t('staff.controls.sub'))}${staffStats()}
    <div class="stack mt-24 stagger">${S.course.modules.map((m) => html`<section class="card module"><div class="module-head"><span class="module-icon" style="--c:${m.color}">${ic(m.icon, 22)}</span><div class="grow"><h3>${m.title}</h3><div class="meta">${t('staff.moduleMeta', { n: m.lessons.length })}</div></div></div>
      ${m.lessons.map((l) => html`<a class="lesson-row" href="#/staff-lesson/${l.id}" style="text-decoration:none"><span class="num">${ic('edit', 13)}</span><span class="t">${l.title}</span><span class="m">${t('staff.sections', { n: l.sections.length })} · ${t('course.questions', { n: l.quiz.length })}</span>${ic('chevron-right', 18)}</a>`)}</section>`)}</div>` };
}

function viewStaffLesson() {
  const l = S.edit; if (!l) return notFound();
  return { title: t('staff.edit'), body: html`${staffBar(t('staff.edit'))}
    <a class="back-link" href="#/staff">${ic('chevron-left', 16)} ${t('nav.controls')}</a>${pageHead(t('staff.edit'), t('staff.edit.sub'))}
    <form class="stack" data-form="lesson" style="max-width:820px" novalidate>
      <div class="card"><label class="field"><span>${t('staff.lessonTitle')}</span><input class="input" id="ed-title" value="${l.title}"></label></div>
      ${l.sections.map((s, si) => html`<div class="card stack" data-sec><div class="spread"><h3>${t('staff.section', { n: si + 1 })}</h3><button type="button" class="btn btn-sm btn-danger" data-act="ed-del-sec" data-arg="${si}">${ic('trash', 14)} ${t('common.remove')}</button></div>
        <label class="field"><span>${t('staff.heading')}</span><input class="input" data-f="heading" value="${s.heading}"></label>
        <label class="field"><span>${t('staff.text')}</span><textarea class="textarea" data-f="body" style="min-height:140px">${s.body}</textarea></label></div>`)}
      <div><button type="button" class="btn btn-outline" data-act="ed-add-sec">${ic('plus', 16)} ${t('staff.addSection')}</button></div>
      <h2 class="section-title" style="margin:10px 0 0">${t('staff.quiz')}</h2>
      ${l.quiz.map((q, qi) => html`<div class="card stack" data-q><div class="spread"><h3>${t('lesson.question', { n: qi + 1 })}</h3><button type="button" class="btn btn-sm btn-danger" data-act="ed-del-q" data-arg="${qi}">${ic('trash', 14)} ${t('common.remove')}</button></div>
        <label class="field"><span>${t('staff.questionText')}</span><input class="input" data-f="q" value="${q.q}"></label>
        <div class="stack" style="--gap:8px"><span class="label">${t('staff.options')}</span>
          ${q.options.map((o, oi) => html`<label class="cluster" style="flex-wrap:nowrap"><input type="radio" name="correct-${qi}" value="${oi}" ${q.correct === oi ? 'checked' : ''} aria-label="${t('staff.markCorrect')}" style="width:20px;height:20px;accent-color:var(--accent)"><input class="input" data-f="opt" value="${o}" aria-label="${t('staff.option', { n: oi + 1 })}"></label>`)}
          <small class="hint">${t('staff.correctHint')}</small></div></div>`)}
      <div><button type="button" class="btn btn-outline" data-act="ed-add-q">${ic('plus', 16)} ${t('staff.addQuestion')}</button></div>
      <div class="form-error" role="alert" id="edErr" hidden>${ic('alert', 16)}<span></span></div>
      <div class="form-actions"><a class="btn btn-ghost" href="#/staff">${t('common.cancel')}</a><button class="btn btn-primary" type="submit">${t('staff.saveChanges')}</button></div>
    </form>` };
}

function viewStaffPayments() {
  const rows = S.users.map((u) => { const p = S.payments[u.email]; const paid = !!p?.paid; return html`<tr><td><strong>${fullName(u.email) || u.firstName}</strong><div class="tiny faint">${u.email}</div></td><td class="num">${pctOf(u.email)}%</td>
    <td>${paid ? html`<span class="chip success">${t('pay.paid')}</span>` : html`<span class="chip warning">${t('pay.unpaid')}</span>`}</td><td>${paid && p.date ? fmtDate(p.date) : '—'}</td>
    <td class="num">${fmtMoney(S.settings.fee)}</td><td class="num"><button class="btn btn-sm btn-outline" data-act="toggle-pay" data-arg="${u.email}">${paid ? t('pay.markUnpaid') : t('pay.markPaid')}</button></td></tr>`; });
  return { title: t('nav.payments'), body: html`${staffBar(t('nav.payments'))}${pageHead(t('nav.payments'), t('pay.sub'))}
    <div class="card flush table-wrap"><table class="table"><thead><tr><th>${t('pay.student')}</th><th class="num">${t('pay.progress')}</th><th>${t('pay.status')}</th><th>${t('pay.date')}</th><th class="num">${t('pay.fee')}</th><th></th></tr></thead>
    <tbody>${rows.length ? rows : html`<tr><td colspan="6" class="empty">${t('pay.none')}</td></tr>`}</tbody></table></div>` };
}

function viewStaffDocuments() {
  const rows = S.certificates.map((c) => html`<tr><td><strong>${c.name}</strong><div class="tiny faint">${c.email}</div></td><td class="mono">${c.id}</td><td>${fmtDate(c.date)}</td><td class="num"><a class="btn btn-sm btn-outline" href="#/verify/${c.id}">${t('staff.verify')}</a></td></tr>`);
  return { title: t('nav.documents'), body: html`${staffBar(t('nav.documents'))}${pageHead(t('nav.documents'), t('staff.docs.sub'))}
    <form class="card form" data-form="institution" style="max-width:560px" novalidate><label class="field"><span>${t('staff.institution')}</span><input class="input" name="institution" value="${S.settings.institution}"><small class="hint">${t('staff.institutionHint')}</small></label>
      <div class="form-actions"><button class="btn btn-primary" type="submit">${t('common.save')}</button></div></form>
    <h2 class="section-title mt-24" style="margin-bottom:10px">${t('staff.issued')}</h2>
    <div class="card flush table-wrap"><table class="table"><thead><tr><th>${t('pay.student')}</th><th>${t('cert.id')}</th><th>${t('cert.issued')}</th><th></th></tr></thead><tbody>${rows.length ? rows : html`<tr><td colspan="4" class="empty">${t('staff.noCerts')}</td></tr>`}</tbody></table></div>` };
}

function viewStaffSettings() {
  const s = S.settings;
  return { title: t('nav.settings'), body: html`${staffBar(t('nav.settings'))}${pageHead(t('nav.settings'), t('staff.settings.sub'))}
    <div class="stack" style="max-width:640px">
      <form class="card form" data-form="settings" novalidate>
        <h2>${t('staff.site')}</h2>
        <label class="field"><span>${t('staff.tagline')}</span><input class="input" name="tagline" value="${s.tagline}"></label>
        <label class="field"><span>${t('staff.fee')}</span><input class="input" name="fee" inputmode="decimal" value="${s.fee}"></label>
        <label class="check"><input type="checkbox" name="demo" ${s.demoShortcut ? 'checked' : ''}><span><strong>${t('staff.demo')}</strong><br><span class="muted small">${t('staff.demoHint')}</span></span></label>
        <div class="form-error" role="alert" id="setErr" hidden>${ic('alert', 16)}<span></span></div>
        <div class="form-actions"><button class="btn btn-primary" type="submit">${t('common.save')}</button></div>
      </form>
      <form class="card form" data-form="passcode" novalidate>
        <h2>${t('staff.changePasscode')}</h2><p class="muted small">${t('staff.passcodeNote')}</p>
        <label class="field"><span>${t('staff.newPasscode')}</span><input class="input" name="p1" type="password" autocomplete="new-password" placeholder="${t('staff.passcodeHint')}"></label>
        <label class="field"><span>${t('staff.confirmPasscode')}</span><input class="input" name="p2" type="password" autocomplete="new-password"></label>
        <div class="form-error" role="alert" id="pcErr" hidden>${ic('alert', 16)}<span></span></div>
        <div class="form-actions"><button class="btn btn-primary" type="submit">${t('staff.updatePasscode')}</button></div>
      </form>
      <div class="card stack"><h2>${t('staff.data')}</h2><p class="muted small">${t('staff.dataNote')}</p>
        <div class="cluster"><button class="btn btn-outline" data-act="export">${ic('download', 16)} ${t('staff.export')}</button><button class="btn btn-danger" data-act="reset">${ic('trash', 16)} ${t('staff.reset')}</button></div></div>
    </div>` };
}

const VIEWS = {
  auth: viewAuth, verify: viewVerify, start: viewStart, profile: viewProfile, courses: viewCourses, home: viewHome, course: viewCourse,
  lesson: (a) => viewLesson(a), exam: () => viewExam(false), practice: () => viewExam(true), certificate: viewCertificate, documents: viewDocuments, handbook: viewHandbook,
  staff: viewStaff, 'staff-lesson': viewStaffLesson, 'staff-payments': viewStaffPayments, 'staff-documents': viewStaffDocuments, 'staff-settings': viewStaffSettings
};

/* ---------------------------------------------------------------- search */
function searchIndex() {
  return lessonsFlat().map(({ m, l }) => ({ id: l.id, title: l.title, module: m.title, text: l.sections.map((s) => s.heading + '. ' + s.body).join(' ') }));
}
function runSearch(q) {
  const toks = norm(q).split(' ').filter(Boolean); if (!toks.length) return [];
  return searchIndex().map((e) => {
    const title = norm(e.title), text = norm(e.text);
    if (!toks.every((k) => title.includes(k) || text.includes(k) || norm(e.module).includes(k))) return null;
    const score = toks.reduce((a, k) => a + (title.includes(k) ? 5 : 0) + (text.includes(k) ? 1 : 0), 0);
    const at = text.indexOf(toks.find((k) => text.includes(k)) || ''); const src = e.text;
    const start = Math.max(0, at - 40); const snip = (start ? '…' : '') + src.slice(start, start + 120) + (src.length > start + 120 ? '…' : '');
    return { ...e, score, snip };
  }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8);
}
const mark = (s, q) => {
  const toks = norm(q).split(' ').filter(Boolean).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!toks.length) return esc(s);
  return esc(s).replace(new RegExp('(' + toks.map(esc).join('|') + ')', 'gi'), '<mark>$1</mark>');
};
function openSearch() {
  openModal(html`<h2 id="modal-title" class="sr-only">${t('search.open')}</h2><div class="search-input">${ic('search', 20)}<input id="searchInput" type="search" placeholder="${t('search.placeholder')}" autocomplete="off" aria-label="${t('search.placeholder')}" autofocus></div><div class="results" id="results" aria-live="polite"><div class="empty">${t('search.hint')}</div></div>`, { top: true, cls: 'search-modal' });
}
function renderResults(q) {
  const host = $('#results'); if (!host) return;
  const res = runSearch(q);
  host.innerHTML = !q.trim() ? `<div class="empty">${esc(t('search.hint'))}</div>` : res.length ? res.map((r) => `<button class="result" data-act="open-lesson" data-arg="${esc(r.id)}"><span class="rt">${mark(r.title, q)}</span><span class="rs">${mark(r.snip, q)}</span></button>`).join('') : `<div class="empty">${esc(t('search.none', { q }))}</div>`;
}

/* ================================================================ ACTIONS ================================================================ */
function setError(el, msg) { if (!el) return; el.hidden = !msg; const s = $('span', el); if (s) s.textContent = msg || ''; }
const busy = (btn, on) => { if (btn) { btn.classList.toggle('is-busy', on); btn.disabled = on; } };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function submitForm(kind, form) {
  const fd = new FormData(form); const btn = $('button[type=submit]', form);
  const val = (k) => String(fd.get(k) ?? '').trim();
  S.draft = ['login', 'register'].includes(kind) ? Object.fromEntries([...fd.entries()].filter(([k]) => !/^pass/.test(k))) : {};
  switch (kind) {
    case 'login': {
      const id = val('id').toLowerCase(), pw = String(fd.get('pass') || '');
      busy(btn, true);
      const u = S.users.find((x) => x.email === id || (x.username || '').toLowerCase() === id);
      const ok = u && (await hashSecret(pw, u.salt)) === u.hash;
      busy(btn, false);
      if (!ok) { S.authError = t('auth.err.credentials'); return paint(); }
      S.authError = ''; S.session = u.email; S.staff = false; sess.remove('staff'); db.set('session', u.email); prog(u.email);
      return go(S.profiles[u.email]?.complete ? 'courses' : 'start');
    }
    case 'register': {
      const first = val('first'), user = val('user'), email = val('email').toLowerCase(), pw = String(fd.get('pass') || '');
      if (!first || !email || !pw) { S.authError = t('auth.err.required'); return paint(); }
      if (!EMAIL_RE.test(email)) { S.authError = t('auth.err.email'); return paint(); }
      if (pw.length < 8 || !/\d/.test(pw)) { S.authError = t('auth.err.password'); return paint(); }
      if (S.users.some((u) => u.email === email || (user && (u.username || '').toLowerCase() === user.toLowerCase()))) { S.authError = t('auth.err.exists'); return paint(); }
      busy(btn, true);
      const salt = rand(12); const hash = await hashSecret(pw, salt);
      S.users.push({ id: rand(6), firstName: first, username: user, email, salt, hash, createdAt: Date.now() }); save('users');
      prog(email); save('progress');
      S.authError = ''; S.session = email; S.staff = false; sess.remove('staff'); db.set('session', email);
      return go('start');
    }
    case 'staff': {
      const pw = String(fd.get('pass') || ''); const setup = !S.settings.staffHash;
      busy(btn, true);
      if (setup) {
        if (pw.length < 10) { busy(btn, false); S.authError = t('staff.err.short'); return paint(); }
        if (pw !== String(fd.get('pass2') || '')) { busy(btn, false); S.authError = t('staff.err.match'); return paint(); }
        S.settings.staffSalt = rand(12); S.settings.staffHash = await hashSecret(pw, S.settings.staffSalt); save('settings');
      } else if ((await hashSecret(pw, S.settings.staffSalt)) !== S.settings.staffHash) { busy(btn, false); S.authError = t('staff.err.wrong'); return paint(); }
      busy(btn, false);
      S.authError = ''; S.staff = true; S.session = null; db.remove('session'); sess.set('staff', '1');
      return go('staff');
    }
    case 'profile': {
      const email = S.session; const err = $('#profErr');
      const req = ['firstName', 'lastName', 'city']; let missing = false;
      $$('input', form).forEach((i) => i.removeAttribute('aria-invalid'));
      req.forEach((k) => { if (!val(k)) { missing = true; form.elements[k].setAttribute('aria-invalid', 'true'); } });
      if (missing) { setError(err, t('profile.err.required')); err.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
      if (!fd.get('confirm')) { setError(err, t('profile.err.confirm')); err.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
      const p = {}; ['firstName', 'lastName', 'dob', 'phone', 'address', 'postal', 'city', 'country', 'uni', 'program', 'studentId'].forEach((k) => { p[k] = val(k); });
      S.profiles[email] = { ...p, confirm: true, complete: true }; save('profiles');
      toast(t('toast.profileSaved')); return go('courses');
    }
    case 'lesson': return saveLesson();
    case 'institution': { S.settings.institution = val('institution') || DEFAULT_SETTINGS.institution; save('settings'); toast(t('toast.saved')); return; }
    case 'settings': {
      const fee = val('fee'); const err = $('#setErr');
      if (!/^\d+([.,]\d{1,2})?$/.test(fee)) return setError(err, t('staff.err.fee'));
      S.settings.tagline = val('tagline') || DEFAULT_SETTINGS.tagline; S.settings.fee = fee.replace(',', '.'); S.settings.demoShortcut = !!fd.get('demo');
      save('settings'); setError(err, ''); toast(t('toast.saved')); return;
    }
    case 'passcode': {
      const err = $('#pcErr'); const p1 = String(fd.get('p1') || ''), p2 = String(fd.get('p2') || '');
      if (p1.length < 10) return setError(err, t('staff.err.short'));
      if (p1 !== p2) return setError(err, t('staff.err.match'));
      busy(btn, true); S.settings.staffSalt = rand(12); S.settings.staffHash = await hashSecret(p1, S.settings.staffSalt); save('settings'); busy(btn, false);
      form.reset(); setError(err, ''); toast(t('toast.passcode')); return;
    }
  }
}

/* Staff lesson editor */
function readEditor() {
  const l = S.edit; if (!l) return;
  l.title = $('#ed-title')?.value ?? l.title;
  l.sections = $$('[data-sec]').map((el) => ({ heading: $('[data-f=heading]', el).value, body: $('[data-f=body]', el).value }));
  l.quiz = $$('[data-q].card').map((el) => ({ q: $('[data-f=q]', el).value, options: $$('[data-f=opt]', el).map((i) => i.value), correct: +($('input[type=radio]:checked', el)?.value ?? 0) }));
}
function saveLesson() {
  readEditor(); const l = S.edit; const err = $('#edErr');
  if (!l.title.trim()) return setError(err, t('staff.err.title'));
  if (!l.sections.length || l.sections.some((s) => !s.heading.trim() || !s.body.trim())) return setError(err, t('staff.err.sections'));
  if (l.quiz.some((q) => !q.q.trim() || q.options.some((o) => !o.trim()))) return setError(err, t('staff.err.quiz'));
  const f = findLesson(l.id); if (!f) return;
  Object.assign(f.l, { title: l.title.trim(), sections: l.sections, quiz: l.quiz });
  save('course'); S.tests = makeTests(); save('tests'); S.exam = null; delete S.quiz[l.id];
  S.edit = null; toast(t('toast.lessonSaved')); go('staff');
}

function act(name, el, ev) {
  const arg = el.dataset.arg;
  switch (name) {
    case 'skip': ev.preventDefault(); $('#view')?.focus(); return;
    case 'theme': S.theme = isDark() ? 'light' : 'dark'; savePrefs(); return paint();
    case 'lang': S.lang = S.lang === 'en' ? 'de' : 'en'; savePrefs(); return paint();
    case 'logout': S.session = null; S.staff = false; S.exam = null; S.edit = null; S.quiz = {}; db.remove('session'); sess.remove('staff'); S.authTab = 'login'; S.authError = ''; S.draft = {}; return go('');
    case 'tab': S.authTab = arg; S.authError = ''; S.showForgot = false; S.draft = {}; return paint();
    case 'forgot': S.showForgot = !S.showForgot; return paint();
    case 'toggle-pw': { const i = $('#' + arg); const show = i.type === 'password'; i.type = show ? 'text' : 'password'; el.innerHTML = icon(show ? 'eye-off' : 'eye', 18); return; }
    case 'staff-reset': return confirmModal({ title: t('staff.reset'), body: t('staff.resetBody'), confirmLabel: t('staff.reset'), danger: true, act: 'do-reset' });
    case 'reset': return confirmModal({ title: t('staff.reset'), body: t('staff.resetBody'), confirmLabel: t('staff.reset'), danger: true, act: 'do-reset' });
    case 'do-reset': db.clearAll(); sess.remove('staff'); location.hash = ''; location.reload(); return;
    case 'export': { const data = { exportedAt: new Date().toISOString(), users: S.users.map(({ salt, hash, ...u }) => u), profiles: S.profiles, progress: S.progress, payments: S.payments, certificates: S.certificates, course: S.course, settings: { ...S.settings, staffSalt: undefined, staffHash: undefined } };
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })); a.download = 'yris-export.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); return; }
    case 'close-modal': return closeModal();
    case 'backdrop': if (ev.target === el) closeModal(); return;
    case 'search': return openSearch();
    case 'open-lesson': closeModal(true); return go('lesson/' + arg);
    case 'enroll': prog(S.session).enrolled = true; save('progress'); toast(t('toast.enrolled')); return go(S.profiles[S.session]?.complete ? 'course' : 'profile');
    case 'pay': return openModal(html`<h2 id="modal-title">${t('pay.title')}</h2><p class="muted">${t('pay.body', { fee: fmtMoney(S.settings.fee) })}</p>
      <div class="notice mt-16">${ic('info', 18)}<span>${t('pay.demo')}</span></div>
      <div class="seg mt-16" role="tablist"><button type="button" role="tab" aria-selected="true" data-act="pay-method" data-arg="bank">${t('pay.bank')}</button><button type="button" role="tab" aria-selected="false" data-act="pay-method" data-arg="paypal">PayPal</button></div>
      <dl class="kv" id="payInfo"><dt>${t('pay.iban')}</dt><dd class="mono">DE00 0000 0000 0000 0000 00</dd><dt>${t('pay.ref')}</dt><dd class="mono">YRIS-${(S.users.find((u) => u.email === S.session)?.id || '').toUpperCase()}</dd><dt>${t('pay.amount')}</dt><dd>${fmtMoney(S.settings.fee)}</dd></dl>
      <div class="modal-actions"><button class="btn btn-ghost" data-act="close-modal">${t('common.cancel')}</button><button class="btn btn-primary" data-act="pay-confirm" data-arg="bank" id="payConfirm">${t('pay.confirm')}</button></div>`);
    case 'pay-method': { $$('[data-act=pay-method]').forEach((b) => b.setAttribute('aria-selected', String(b === el)));
      $('#payInfo').innerHTML = arg === 'bank' ? `<dt>${esc(t('pay.iban'))}</dt><dd class="mono">DE00 0000 0000 0000 0000 00</dd><dt>${esc(t('pay.ref'))}</dt><dd class="mono">YRIS-${esc((S.users.find((u) => u.email === S.session)?.id || '').toUpperCase())}</dd><dt>${esc(t('pay.amount'))}</dt><dd>${esc(fmtMoney(S.settings.fee))}</dd>` : `<dt>${esc(t('pay.method'))}</dt><dd>PayPal</dd><dt>${esc(t('pay.amount'))}</dt><dd>${esc(fmtMoney(S.settings.fee))}</dd>`;
      $('#payConfirm').dataset.arg = arg; return; }
    case 'pay-confirm': S.payments[S.session] = { paid: true, date: Date.now(), method: arg }; save('payments'); closeModal(true); toast(t('toast.paid')); return paint();
    case 'demo-unlock': { const email = S.session; lessonsFlat().forEach(({ l }) => { prog(email).completedLessons[l.id] = true; }); S.payments[email] = { paid: true, date: Date.now(), method: 'demo' };
      if (!S.profiles[email]?.confirm) { S.profiles[email] = { ...(S.profiles[email] || {}), firstName: S.profiles[email]?.firstName || S.users.find((u) => u.email === email)?.firstName || 'Demo', lastName: S.profiles[email]?.lastName || 'Student', city: S.profiles[email]?.city || S.course.city, confirm: true, complete: true }; save('profiles'); }
      save('progress', 'payments'); toast(t('toast.demoUnlocked')); return paint(); }
    case 'check-quiz': { const { arg: id } = currentRoute(); S.quiz[id].checked = true; return paint(); }
    case 'retry-quiz': { const { arg: id } = currentRoute(); S.quiz[id] = { answers: {}, checked: false }; return paint(); }
    case 'complete-lesson': { const email = S.session; prog(email).completedLessons[arg] = true; save('progress'); toast(t('toast.lessonDone'));
      const flatL = lessonsFlat(); const i = flatL.findIndex((x) => x.l.id === arg); delete S.quiz[arg];
      return go(flatL[i + 1] ? 'lesson/' + flatL[i + 1].l.id : 'course'); }
    case 'submit-exam': { const ex = S.exam; if (Object.keys(ex.answers).length < ex.qs.length) return;
      ex.result = gradeExam(ex); ex.submitted = true;
      if (ex.kind === 'final') { prog(S.session).examAttempts.push({ date: Date.now(), score: ex.result.pct, passed: ex.result.passed }); save('progress'); }
      window.scrollTo(0, 0); return paint(); }
    case 'retry-exam': startExam(arg); window.scrollTo(0, 0); return paint();
    case 'issue-cert': { const email = S.session; if (certOf(email)) return go('certificate'); const area = $('#declArea'); if (!area || norm(area.value) !== norm(declText())) return;
      S.certificates.push({ id: 'YRIS-' + rand(4).toUpperCase(), email, name: fullName(email), course: S.course.title, city: S.course.city, institution: S.settings.institution, date: Date.now() }); save('certificates');
      toast(t('toast.certIssued')); return paint(); }
    case 'print-cert': return printDoc('print-cert', 'A4 landscape', '0');
    case 'print-book': return printDoc('print-book', 'A4', '16mm');
    case 'ed-add-sec': readEditor(); S.edit.sections.push({ heading: '', body: '' }); return paint();
    case 'ed-del-sec': readEditor(); S.edit.sections.splice(+arg, 1); return paint();
    case 'ed-add-q': readEditor(); S.edit.quiz.push({ q: '', options: ['', '', '', ''], correct: 0 }); return paint();
    case 'ed-del-q': readEditor(); S.edit.quiz.splice(+arg, 1); return paint();
    case 'toggle-pay': { const cur = !!S.payments[arg]?.paid; S.payments[arg] = { paid: !cur, date: Date.now(), method: 'staff' }; save('payments'); return paint(); }
  }
}

/* ---------------------------------------------------------------- global events */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  if (el.tagName === 'A' && el.getAttribute('href')?.startsWith('#') && el.dataset.act !== 'skip') return;
  act(el.dataset.act, el, e);
});
document.addEventListener('submit', (e) => { const f = e.target.closest('form[data-form]'); if (!f) return; e.preventDefault(); submitForm(f.dataset.form, f); });
document.addEventListener('change', (e) => {
  const inp = e.target.closest('input[data-pick]'); if (!inp) return;
  const q = +inp.dataset.q, o = +inp.value;
  $$('.opt', inp.closest('.opts')).forEach((l) => l.classList.toggle('is-selected', l.contains(inp)));
  if (inp.dataset.pick === 'exam') {
    const ex = S.exam; ex.answers[q] = o; const n = Object.keys(ex.answers).length, tot = ex.qs.length;
    $('#examCount').textContent = t('exam.answered', { a: n, n: tot });
    const bar = $('#examBar i'); if (bar) bar.style.setProperty('--v', Math.round(100 * n / tot) + '%');
    ['#submitBtn', '#submitBtn2'].forEach((s) => { const b = $(s); if (b) b.disabled = n < tot; });
  } else {
    const id = currentRoute().arg; const st = S.quiz[id]; st.answers[q] = o; const f = findLesson(id); const n = Object.keys(st.answers).length;
    $('#checkBtn').disabled = n < f.l.quiz.length; $('#quizCount').textContent = t('lesson.answered', { a: n, n: f.l.quiz.length });
  }
});
document.addEventListener('input', (e) => {
  if (e.target.matches('#declArea')) $('#issueBtn').disabled = norm(e.target.value) !== norm(declText());
  if (e.target.matches('#searchInput')) renderResults(e.target.value);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  const typing = /^(input|textarea|select)$/i.test(document.activeElement?.tagName || '');
  if (!S.staff && S.session && !typing && (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'))) { e.preventDefault(); openSearch(); }
  if (e.target.id === 'searchInput') {
    if (e.key === 'Enter') $('#results .result')?.click();
    if (e.key === 'ArrowDown') { e.preventDefault(); $('#results .result')?.focus(); }
  } else if (e.target.classList?.contains('result')) {
    const all = $$('#results .result'); const i = all.indexOf(e.target);
    if (e.key === 'ArrowDown') { e.preventDefault(); all[i + 1]?.focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(i ? all[i - 1].focus() : $('#searchInput').focus()); }
  }
});
/* The page size differs per document, so the @page rule is added only while printing. */
function printDoc(cls, size, margin) {
  const st = document.createElement('style'); st.id = 'print-page'; st.textContent = `@page { size: ${size}; margin: ${margin}; }`;
  document.head.append(st); document.body.classList.add(cls); window.print();
}
window.addEventListener('afterprint', () => { document.body.classList.remove('print-cert', 'print-book'); $('#print-page')?.remove(); });
window.addEventListener('hashchange', route);
mq.addEventListener?.('change', () => { if (S.theme === 'auto') paint(); });
function onScroll() { $('#topbar')?.classList.toggle('is-scrolled', window.scrollY > 70); }
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------------------------------------------------------------- boot */
load();
route();
