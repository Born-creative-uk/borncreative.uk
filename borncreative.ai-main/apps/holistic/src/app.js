import { library, tags } from './data.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const state = {
  query: '',
  selectedCondition: null,
  activeTags: new Set()
};

const byId = (arr) => Object.fromEntries(arr.map((x) => [x.id, x]));
const itemsById = byId(library.items);

function normalize(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchCondition(query) {
  const q = normalize(query);
  if (!q) return [];
  return library.conditions.filter((c) => {
    const hay = [c.name, ...(c.aliases || []), c.id].map(normalize).join(' ');
    return hay.includes(q) || hay.split(' ').some((w) => q.includes(w));
  });
}

function renderConditionList() {
  const list = $('#condition-list');
  list.innerHTML = '';
  for (const c of library.conditions) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'w-full text-left rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 hover:border-brand hover:text-brand';
    btn.textContent = c.name;
    btn.onclick = () => selectCondition(c.id);
    li.appendChild(btn);
    list.appendChild(li);
  }
}

function renderFilters() {
  const container = $('#filters');
  container.innerHTML = '';
  for (const t of tags) {
    const btn = document.createElement('button');
    const active = state.activeTags.has(t);
    btn.className = `px-2 py-1 rounded border text-xs ${active ? 'bg-brand/20 border-brand text-brand' : 'bg-zinc-800 border-zinc-700 hover:border-brand'}`;
    btn.textContent = t;
    btn.onclick = () => {
      if (state.activeTags.has(t)) state.activeTags.delete(t); else state.activeTags.add(t);
      renderResults();
      renderFilters();
    };
    container.appendChild(btn);
  }
}

function selectCondition(id) {
  state.selectedCondition = library.conditions.find((c) => c.id === id) || null;
  state.query = state.selectedCondition ? state.selectedCondition.name : '';
  $('#search').value = state.query;
  $('#suggestions').classList.add('hidden');
  renderResults();
}

function renderSuggestions() {
  const wrap = $('#suggestions');
  const q = $('#search').value;
  const matches = matchCondition(q).slice(0, 6);
  if (!q || matches.length === 0) {
    wrap.classList.add('hidden');
    wrap.innerHTML = '';
    return;
  }
  wrap.classList.remove('hidden');
  wrap.innerHTML = '';
  for (const c of matches) {
    const btn = document.createElement('button');
    btn.className = 'block w-full text-left px-3 py-2 hover:bg-zinc-800';
    btn.innerHTML = `<div class="font-medium">${c.name}</div><div class="text-xs text-zinc-400">${(c.aliases||[]).slice(0,3).join(', ')}</div>`;
    btn.onclick = () => selectCondition(c.id);
    wrap.appendChild(btn);
  }
}

function pill(text, tone = 'zinc') {
  return `<span class="inline-flex items-center rounded-full border border-${tone}-700 bg-${tone}-900/50 px-2 py-0.5 text-xs mr-2">${text}</span>`;
}

function renderResults() {
  const container = $('#results');
  container.innerHTML = '';

  const cond = state.selectedCondition;
  if (!cond) {
    container.innerHTML = '<p class="text-zinc-400">Start by typing a condition or pick one at right.</p>';
    return;
  }

  const active = [...state.activeTags];
  const recs = (cond.recommend || [])
    .map((r) => ({ ...r, item: itemsById[r.itemId] }))
    .filter((r) => !active.length || (r.item && r.item.tags && r.item.tags.some((t) => state.activeTags.has(t))));

  const header = document.createElement('div');
  header.className = 'flex items-center justify-between';
  header.innerHTML = `
    <div>
      <h3 class="text-xl font-semibold">${cond.name}</h3>
      <div class="text-xs text-zinc-400">${(cond.aliases||[]).slice(0,4).join(', ')}</div>
    </div>
    <div class="text-xs text-zinc-400">${cond.tags.map((t)=>pill(t)).join('')}</div>
  `;
  container.appendChild(header);

  if (recs.length === 0) {
    const p = document.createElement('p');
    p.className = 'text-zinc-400 mt-4';
    p.textContent = 'No items match current filters.';
    container.appendChild(p);
    return;
  }

  for (const r of recs) {
    const it = r.item;
    const card = document.createElement('article');
    card.className = 'rounded-xl border border-zinc-800 bg-zinc-900 p-4';
    card.innerHTML = `
      <div class="flex items-start justify-between gap-4">
        <div>
          <h4 class="font-semibold">${it.name}</h4>
          <div class="text-xs text-zinc-400 mt-0.5">${it.type}</div>
        </div>
        <div class="text-xs">${pill(r.strength, r.strength === 'moderate' ? 'emerald' : r.strength === 'mixed' ? 'amber' : 'zinc')}</div>
      </div>
      <div class="mt-2 text-sm text-zinc-300">${r.rationale}</div>
      <div class="mt-3 grid md:grid-cols-3 gap-3 text-sm">
        <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
          <div class="text-xs text-zinc-400">Typical dosage</div>
          <div>${it.dosage || 'See label / practitioner guidance'}</div>
        </div>
        <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
          <div class="text-xs text-zinc-400">Evidence</div>
          <div class="capitalize">${it.evidence || r.strength}</div>
        </div>
        <div class="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
          <div class="text-xs text-zinc-400">Cautions</div>
          <div>${it.cautions || 'None noted; verify for your case.'}</div>
        </div>
      </div>
      <div class="mt-3">${(it.tags||[]).map((t)=>pill(t)).join('')}</div>
    `;
    container.appendChild(card);
  }
}

function bindUI() {
  const input = $('#search');
  const clear = $('#clear');
  input.addEventListener('input', () => {
    state.query = input.value;
    state.selectedCondition = null; // reset selection when typing
    renderSuggestions();
    renderResults();
  });
  input.addEventListener('focus', renderSuggestions);
  document.addEventListener('click', (e) => {
    const s = $('#suggestions');
    if (!s.contains(e.target) && e.target !== input) s.classList.add('hidden');
  });
  clear.onclick = () => {
    state.query = '';
    state.selectedCondition = null;
    input.value = '';
    state.activeTags.clear();
    renderFilters();
    renderSuggestions();
    renderResults();
    input.focus();
  };
}

// Init
renderConditionList();
renderFilters();
bindUI();
renderResults();

