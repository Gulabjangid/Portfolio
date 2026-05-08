// This script can be used for future interactive elements.
document.addEventListener('DOMContentLoaded', () => {
  console.log("Classic portfolio loaded.");
});


// ─── HERO NAME ANIMATION ─────────────────────────
(function animateHeroName() {
  const name = "GULAB JANGID";
  const container = document.getElementById('heroName');
  const underline = document.getElementById('heroUnderline');
  let delay = 300;

  for (const char of name) {
    const span = document.createElement('span');
    if (char === ' ') {
      span.classList.add('hero-letter', 'space');
      span.innerHTML = '&nbsp;';
    } else {
      span.classList.add('hero-letter');
      span.textContent = char;
    }
    span.style.animationDelay = `${delay}ms`;
    container.appendChild(span);
    delay += 80;
  }

  setTimeout(() => {
    underline.classList.add('active');
  }, delay + 400);
})();

// ─── TYPED TEXT EFFECT ───────────────────────────
(function typedText() {
  const roles = [
    "AI Engineer",
    "MLOps Architect",
    "Full Stack Builder",
    "Generative AI Developer"
  ];
  const el = document.getElementById('typedText');
  let roleIdx = 0, charIdx = 0, deleting = false;
  const SPEED_TYPE = 80, SPEED_DELETE = 45, PAUSE = 2000;

  function tick() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? SPEED_DELETE : SPEED_TYPE);
  }
  setTimeout(tick, 1800);
})();

// ─── SCROLL-TRIGGERED ANIMATIONS ─────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    // Stat bars
    el.querySelectorAll('.stat-fill').forEach(fill => {
      fill.classList.add('animated');
    });

    // Terminal typing
    el.querySelectorAll('.terminal-text').forEach((span, i) => {
      const text = span.dataset.text || '';
      let j = 0;
      setTimeout(() => {
        const iv = setInterval(() => {
          span.textContent = text.slice(0, j + 1);
          j++;
          if (j >= text.length) clearInterval(iv);
        }, 25);
      }, i * 500);
    });

    // Achievement cards
    el.querySelectorAll('.achievement-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('revealed'), i * 180);
    });

    observer.unobserve(el);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.about-section, .achievements-section').forEach(s => observer.observe(s));

// ─── 3D TILT CARDS ───────────────────────────────
document.querySelectorAll('.mission-card[data-tilt]').forEach(card => {
  const MAX_TILT = 15;
  let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
  let animId;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    targetX = ((e.clientY - cy) / (rect.height / 2)) * MAX_TILT;
    targetY = -((e.clientX - cx) / (rect.width / 2)) * MAX_TILT;
  });

  card.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animId);
    function lerp() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateZ(10px)`;
      animId = requestAnimationFrame(lerp);
    }
    lerp();
  });

  card.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animId);
    targetX = 0; targetY = 0;
    function reset() {
      currentX += (0 - currentX) * 0.1;
      currentY += (0 - currentY) * 0.1;
      card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateZ(0)`;
      if (Math.abs(currentX) > 0.05 || Math.abs(currentY) > 0.05) {
        animId = requestAnimationFrame(reset);
      } else {
        card.style.transform = '';
      }
    }
    reset();
  });
});

// ─── SKILL CHIP RADIAL GLOW ──────────────────────
document.querySelectorAll('.skill-chip').forEach(chip => {
  chip.addEventListener('mousemove', (e) => {
    const rect = chip.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    chip.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,180,216,0.25), rgba(0,119,182,0.08))`;
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.background = '';
  });
});

// ─── SECTION ENTRANCE (FADE-UP) ──────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(40px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  fadeObserver.observe(section);
});

// ─── TICKER TAPE DUPLICATE ───────────────────────
// already duplicated in HTML for seamless loop
