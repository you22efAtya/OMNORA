const observer10 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach(el => observer10.observe(el));

// ── Staggered letter entrance after page load ──
document.querySelectorAll('.letter-block').forEach((block, i) => {
  setTimeout(() => {
    block.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)`;
    block.style.opacity = '1';
    block.style.transform = 'translateY(0)';
  }, 1100 + i * 90);
});

// ── OMNI & ORA Panel Animations ──

const panelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const panel = entry.target;
    const children = panel.querySelectorAll(
      '.panel-number, .panel-tag, .panel-word, .panel-desc, .panel-tags'
    );

    // Set initial hidden state on each child
    children.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(36px)';
      el.style.transition = 'none';
    });

    // Stagger each child in with larger delays
    children.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = `
          opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
          transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)
        `;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 150 + i * 200);
    });

    // Animate each tag pill individually
    const tags = panel.querySelectorAll('.tag');
    tags.forEach((tag, i) => {
      tag.style.opacity = '0';
      tag.style.transform = 'translateY(12px) scale(0.9)';
      tag.style.transition = 'none';
      setTimeout(() => {
        tag.style.transition = `
          opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms,
          transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms
        `;
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0) scale(1)';
      }, 900 + i * 120);
    });

    // Panel number counting up — slower tick
    const numberEl = panel.querySelector('.panel-number');
    if (numberEl) {
      const target = parseInt(numberEl.textContent.trim(), 10);
      let current = 0;
      const duration = 1800;
      const steps = 20;
      const interval = duration / steps;
      const counter = setInterval(() => {
        current++;
        numberEl.textContent = String(current).padStart(2, '0');
        if (current >= target) clearInterval(counter);
      }, interval);
    }

    // Highlight line wipe — slower reveal
    const highlight = panel.querySelector('.highlight');
    if (highlight) {
      highlight.style.opacity = '0';
      highlight.style.clipPath = 'inset(0 100% 0 0)';
      highlight.style.transition = 'none';
      setTimeout(() => {
        highlight.style.transition = `
          opacity 0.9s ease,
          clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1)
        `;
        highlight.style.opacity = '1';
        highlight.style.clipPath = 'inset(0 0% 0 0)';
      }, 900);
    }

    panelObserver.unobserve(panel);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.split-panel').forEach(panel => {
  panelObserver.observe(panel);
});