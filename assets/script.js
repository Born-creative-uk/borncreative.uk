// Set current year in footer (guarded)
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Normalize title and meta description if encoding artifacts slipped in
(() => {
  const cleanTitle = 'BornCreative.ai — Web Design, AI Video & Branding';
  if (document.title !== cleanTitle) document.title = cleanTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    const clean = 'Sleek, conversion-focused web design and AI-powered video. BornCreative.ai — your next creative partner.';
    if (metaDesc.getAttribute('content') !== clean) metaDesc.setAttribute('content', clean);
  }
})();

// Cookie consent banner
if (!localStorage.getItem('bc-cookie-ok')) {
  const b = document.createElement('div');
  b.className =
    'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[30rem] bg-black/80 text-[var(--ink)] backdrop-blur border border-[var(--line)] rounded-2xl p-4 shadow-soft';
  b.innerHTML = `
    <div class="text-sm">
      We use cookies for basic analytics and to improve your experience. 
      <a href="#privacy-policy" class="underline">Learn more</a>.
    </div>
    <div class="mt-3 flex gap-2">
      <button id="bc-accept" class="flex-1 rounded-xl bg-[var(--brand)] px-4 py-2 font-semibold hover:opacity-90">OK</button>
      <button id="bc-dismiss" class="flex-1 rounded-xl border border-[var(--line)] px-4 py-2 hover:bg-white/5 hover:border-[var(--brand-2)]">Dismiss</button>
    </div>
  `;
  document.body.appendChild(b);
  document.getElementById('bc-accept').onclick = () => {
    localStorage.setItem('bc-cookie-ok', '1');
    b.remove();
  };
  document.getElementById('bc-dismiss').onclick = () => b.remove();
}

// Header brand type/delete loop
(function () {
  const wrap = document.getElementById('brand-typewrap');
  const el = document.getElementById('brand-typer');
  if (!wrap || !el) return;

  const full = (wrap.getAttribute('data-text') || el.textContent || 'BornCreative.ai').trim();
  let i = 0;
  let deleting = false;
  let pause = 650; // initial pause before start

  const step = () => {
    if (pause > 0) {
      pause -= 50;
      return setTimeout(step, 50);
    }

    if (!deleting) {
      i = Math.min(i + 1, full.length);
    } else {
      i = Math.max(i - 1, 0);
    }

    el.textContent = full.slice(0, i);

    // At bounds, flip mode and add a brief pause
    if (i === full.length && !deleting) {
      deleting = true;
      pause = 900;
    } else if (i === 0 && deleting) {
      deleting = false;
      pause = 500;
    }

    const delay = deleting ? 70 : 110;
    setTimeout(step, delay);
  };

  // Clear initial static content then start
  el.textContent = '';
  step();
})();

// About section: letter-by-letter typer on scroll (runs once, no delete)
(() => {
  // Respect reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const aboutSections = document.querySelectorAll('section#about');
  let aboutEl = null;
  for (const s of aboutSections) {
    if (s.classList.contains('relative')) { aboutEl = s; break; }
  }
  if (!aboutEl && aboutSections.length) aboutEl = aboutSections[aboutSections.length - 1];
  if (!aboutEl) return;

  const target = aboutEl.querySelector('.prose p');
  if (!target) return;

  const full = (target.textContent || '').replace(/\s+/g, ' ').trim();
  if (!full) return;

  let started = false;

  const startTyping = () => {
    if (started) return;
    started = true;
    target.textContent = '';
    let i = 0;
    const typeNext = () => {
      i = Math.min(i + 1, full.length);
      target.textContent = full.slice(0, i);
      if (i < full.length) setTimeout(typeNext, 45);
    };
    setTimeout(typeNext, 300);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startTyping();
          io.disconnect();
        }
      });
    }, { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.2 });
    io.observe(target);
  } else {
    // Fallback: start after a short delay
    setTimeout(startTyping, 500);
  }
})();

// About tagline: letter-by-letter on scroll (preserve line break, runs once)
(() => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Find the main About section (there are two with same id)
  const aboutSections = document.querySelectorAll('section#about');
  let aboutEl = null;
  for (const s of aboutSections) {
    if (s.classList.contains('relative')) { aboutEl = s; break; }
  }
  if (!aboutEl && aboutSections.length) aboutEl = aboutSections[aboutSections.length - 1];
  if (!aboutEl) return;

  const target = aboutEl.querySelector('p.text-xl.font-semibold.text-center.text-orange-400');
  if (!target) return;

  const raw = target.textContent || '';
  const full = raw
    .replace(/\r/g, '')
    .replace(/[\t\f\v ]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
  if (!full) return;

  const escapeHtml = (s) => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  let started = false;
  const startTyping = () => {
    if (started) return;
    started = true;
    target.innerHTML = '';
    let i = 0;
    const nl = full.indexOf('\n');
    const tick = () => {
      i = Math.min(i + 1, full.length);
      if (nl === -1) {
        target.innerHTML = escapeHtml(full.slice(0, i));
      } else if (i <= nl) {
        target.innerHTML = escapeHtml(full.slice(0, i));
      } else {
        const firstPart = escapeHtml(full.slice(0, nl));
        const secondCount = i - (nl + 1);
        const secondPart = escapeHtml(full.slice(nl + 1, nl + 1 + secondCount));
        target.innerHTML = firstPart + '<br><span class="text-white">' + secondPart + '</span>';
      }
      if (i < full.length) setTimeout(tick, 45);
    };
    setTimeout(tick, 300);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startTyping();
          io.disconnect();
        }
      });
    }, { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.2 });
    io.observe(target);
  } else {
    setTimeout(startTyping, 500);
  }
})();

// Global text normalization: fix common mojibake (UTF-8 mis-decoded as Windows-1252)
(() => {
  const replaceMap = [
    [/â€™/g, '’'],
    [/â€˜/g, '‘'],
    [/â€œ/g, '“'],
    [/â€\u009D/g, '”'],
    [/â€³/g, '″'],
    [/â€”/g, '—'],
    [/â€“/g, '–'],
    [/Â£/g, '£'],
    [/Â /g, ' '],
    [/\uFFFD/g, ''],
  ];

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
      // Skip inside script/style tags
      const p = node.parentNode && node.parentNode.nodeName;
      if (p === 'SCRIPT' || p === 'STYLE') return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const toFix = [];
  let n;
  while ((n = walker.nextNode())) toFix.push(n);
  toFix.forEach((text) => {
    let v = text.nodeValue;
    let changed = false;
    for (const [re, rep] of replaceMap) {
      if (re.test(v)) { v = v.replace(re, rep); changed = true; }
    }
    if (changed) text.nodeValue = v;
  });
})();

// Scroll reveal for services (left/right)
(() => {
  const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (prefersReduce || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  targets.forEach((el) => io.observe(el));
})();

// Portfolio carousel controls
(() => {
  const scroller = document.getElementById('recent-work-carousel');
  if (!scroller) return;

  const controlsRoot = document.querySelector('[data-portfolio-controls]');
  if (!controlsRoot) return;

  const buttons = controlsRoot.querySelectorAll('[data-portfolio-scroll]');
  if (!buttons.length) return;

  scroller.dataset.dragging = 'false';

  const getStep = () => {
    const card = scroller.querySelector('.portfolio-card');
    if (!card) return scroller.clientWidth * 0.8;
    const cardWidth = card.getBoundingClientRect().width;
    const styles = window.getComputedStyle(scroller);
    const gap = parseFloat(styles.columnGap || styles.gap || '16');
    return cardWidth + gap;
  };

  let ticking = false;
  const updateDisabled = () => {
    const maxScroll = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    const hasOverflow = maxScroll > 1;
    controlsRoot.dataset.inactive = hasOverflow ? 'false' : 'true';
    const atStart = scroller.scrollLeft <= 1;
    const atEnd = scroller.scrollLeft >= maxScroll - 1;
    buttons.forEach((btn) => {
      const dir = btn.getAttribute('data-portfolio-scroll');
      if (dir === 'prev') {
        btn.disabled = atStart;
      } else if (dir === 'next') {
        btn.disabled = atEnd;
      }
    });
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      updateDisabled();
    });
  };

  const dragState = {
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    active: false,
    moved: false,
    ignoreClick: false,
  };

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragState.active = true;
    dragState.pointerId = event.pointerId;
    dragState.startX = event.clientX;
    dragState.startScrollLeft = scroller.scrollLeft;
    dragState.moved = false;
    scroller.dataset.dragging = 'true';
    if (typeof scroller.setPointerCapture === 'function') {
      try { scroller.setPointerCapture(event.pointerId); } catch (err) {}
    }
  };

  const onPointerMove = (event) => {
    if (!dragState.active || event.pointerId !== dragState.pointerId) return;
    const delta = event.clientX - dragState.startX;
    scroller.scrollLeft = dragState.startScrollLeft - delta;
    if (!dragState.moved && Math.abs(delta) > 6) {
      dragState.moved = true;
    }
    requestUpdate();
  };

  const onPointerUp = (event) => {
    if (!dragState.active || event.pointerId !== dragState.pointerId) return;
    dragState.active = false;
    dragState.pointerId = null;
    scroller.dataset.dragging = 'false';
    if (dragState.moved) {
      dragState.ignoreClick = true;
      setTimeout(() => { dragState.ignoreClick = false; }, 0);
    }
    if (typeof scroller.releasePointerCapture === 'function') {
      try {
        if (typeof scroller.hasPointerCapture === 'function') {
          if (scroller.hasPointerCapture(event.pointerId)) {
            scroller.releasePointerCapture(event.pointerId);
          }
        } else {
          scroller.releasePointerCapture(event.pointerId);
        }
      } catch (err) {}
    }
    requestUpdate();
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = btn.getAttribute('data-portfolio-scroll');
      const delta = dir === 'next' ? 1 : -1;
      const step = getStep();
      scroller.scrollBy({ left: delta * step, behavior: 'smooth' });
    });
  });

  scroller.addEventListener('pointerdown', onPointerDown);
  scroller.addEventListener('pointermove', onPointerMove);
  scroller.addEventListener('pointerup', onPointerUp);
  scroller.addEventListener('pointercancel', onPointerUp);
  scroller.addEventListener('pointerleave', (event) => {
    if (!dragState.active || event.pointerId !== dragState.pointerId) return;
    onPointerUp(event);
  });

  scroller.addEventListener('click', (event) => {
    if (!dragState.ignoreClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    dragState.ignoreClick = false;
  }, true);

  scroller.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  requestUpdate();
})();



