// ===================================================================
// AI TEACHER — Interactive JavaScript
// Enterprise-Level Interactions & Animations
// ===================================================================

'use strict';

// ──────────────────────────────────────────────────────────────────
// COURSE DATA
// ──────────────────────────────────────────────────────────────────
const courses = [
  {
    id: 1, category: 'ai', emoji: '🤖',
    bg: 'linear-gradient(135deg, #1e0533 0%, #0d1b40 100%)',
    level: 'Advanced', levelColor: 'rgba(167,139,250,0.2)', levelText: '#a78bfa',
    title: 'Machine Learning Mastery with Python',
    instructor: 'Dr. Andrew Chen · Ex-Google Brain',
    rating: 4.9, students: '42.3k', duration: '48h',
    price: 'Paid', priceDisplay: '$89',
    tag: 'Bestseller'
  },
  {
    id: 2, category: 'web', emoji: '⚡',
    bg: 'linear-gradient(135deg, #001233 0%, #001845 100%)',
    level: 'Intermediate', levelColor: 'rgba(56,189,248,0.2)', levelText: '#38bdf8',
    title: 'Next.js 15 — Full-Stack Modern Web Dev',
    instructor: 'Sarah Liu · Vercel Engineer',
    rating: 4.8, students: '31.8k', duration: '36h',
    price: 'Paid', priceDisplay: '$69',
    tag: 'New'
  },
  {
    id: 3, category: 'data', emoji: '📊',
    bg: 'linear-gradient(135deg, #001a00 0%, #002020 100%)',
    level: 'Beginner', levelColor: 'rgba(52,211,153,0.2)', levelText: '#34d399',
    title: 'Data Science & Analytics Bootcamp',
    instructor: 'Marcus Johnson · Netflix Data Lead',
    rating: 4.9, students: '58.1k', duration: '52h',
    price: 'Free', priceDisplay: 'Free',
    tag: 'Top Rated'
  },
  {
    id: 4, category: 'backend', emoji: '🚀',
    bg: 'linear-gradient(135deg, #1a0000 0%, #220020 100%)',
    level: 'Advanced', levelColor: 'rgba(244,114,182,0.2)', levelText: '#f472b6',
    title: 'Node.js Microservices Architecture',
    instructor: 'Elena Vasquez · Meta Backend',
    rating: 4.7, students: '24.5k', duration: '44h',
    price: 'Paid', priceDisplay: '$79',
    tag: 'Hot'
  },
  {
    id: 5, category: 'ai', emoji: '🧠',
    bg: 'linear-gradient(135deg, #0d002b 0%, #001433 100%)',
    level: 'Intermediate', levelColor: 'rgba(167,139,250,0.2)', levelText: '#a78bfa',
    title: 'LLMs & Prompt Engineering Masterclass',
    instructor: 'James Park · OpenAI Research',
    rating: 5.0, students: '19.2k', duration: '28h',
    price: 'Paid', priceDisplay: '$99',
    tag: 'Trending'
  },
  {
    id: 6, category: 'web', emoji: '🎨',
    bg: 'linear-gradient(135deg, #001a2c 0%, #00242c 100%)',
    level: 'Beginner', levelColor: 'rgba(251,191,36,0.2)', levelText: '#fbbf24',
    title: 'Modern CSS & Animation Design System',
    instructor: 'Zoe Williams · Figma Design Lead',
    rating: 4.8, students: '37.6k', duration: '24h',
    price: 'Free', priceDisplay: 'Free',
    tag: 'Popular'
  },
];

// ──────────────────────────────────────────────────────────────────
// AI CHAT RESPONSES
// ──────────────────────────────────────────────────────────────────
const aiResponses = [
  "Great question! Let me break that down step by step for you 🎯",
  "I can see you're making progress! Here's a more efficient approach to think about this concept.",
  "That's a common misconception. The key insight is to think about it differently — imagine you're explaining it to a 10-year-old.",
  "Excellent! You're on the right track. Let me show you how this connects to what you learned in the previous lesson.",
  "This is one of my favorite topics! The core principle here is actually quite elegant when you see it from this angle.",
  "I've analyzed thousands of student questions like this. The pattern I see most often is confusion about the underlying model — let me clarify.",
  "Perfect timing to ask this! This concept is the foundation of the next 5 lessons, so understanding it deeply now will pay dividends.",
];

// ──────────────────────────────────────────────────────────────────
// DOM READY
// ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initNavbar();
  initNavToggle();
  initStatCounters();
  initRevealAnimations();
  renderCourses();
  initCourseTabs();
  initPricingToggle();
  initAuthModal();
  initChatDemo();
  initCopyButtons();
});

// ──────────────────────────────────────────────────────────────────
// CURSOR GLOW
// ──────────────────────────────────────────────────────────────────
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateGlow = () => {
    glowX += (mouseX - glowX) * 0.06;
    glowY += (mouseY - glowY) * 0.06;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  };

  animateGlow();

  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
}

// ──────────────────────────────────────────────────────────────────
// NAVBAR SCROLL
// ──────────────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu
          document.getElementById('navLinks')?.classList.remove('open');
        }
      }
    });
  });
}

// ──────────────────────────────────────────────────────────────────
// MOBILE NAV TOGGLE
// ──────────────────────────────────────────────────────────────────
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen.toString());

    // Animate hamburger
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// ──────────────────────────────────────────────────────────────────
// STAT COUNTERS
// ──────────────────────────────────────────────────────────────────
function initStatCounters() {
  const statNums = document.querySelectorAll('.stat-number[data-target]');
  if (!statNums.length) return;

  const formatNum = (n, target) => {
    if (target >= 1000) {
      return Math.floor(n).toLocaleString();
    }
    return Math.floor(n).toString();
  };

  const animateCounter = (el, target, duration = 2000) => {
    const start = performance.now();
    const startVal = 0;

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (target - startVal) * eased;

      const suffix = target >= 100000 ? '+' : target === 98 ? '%' : target === 50 ? '+' : '+';
      el.textContent = formatNum(current, target) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
}

// ──────────────────────────────────────────────────────────────────
// REVEAL ANIMATIONS
// ──────────────────────────────────────────────────────────────────
function initRevealAnimations() {
  // Add reveal class to sections
  const revealTargets = document.querySelectorAll(
    '.feature-card, .testimonial-card, .step-card, .pricing-card, .course-card'
  );

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => observer.observe(el));
}

// ──────────────────────────────────────────────────────────────────
// COURSE RENDERING
// ──────────────────────────────────────────────────────────────────
function renderCourses(filter = 'all') {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? courses
    : courses.filter(c => c.category === filter);

  grid.innerHTML = '';

  filtered.forEach((course, i) => {
    const card = document.createElement('div');
    card.className = 'course-card reveal';
    card.style.transitionDelay = `${i * 80}ms`;

    card.innerHTML = `
      <div class="course-thumb">
        <div class="course-thumb-bg" style="background: ${course.bg}">
          ${course.emoji}
        </div>
        <div class="course-level-badge" style="background: ${course.levelColor}; color: ${course.levelText}; border: 1px solid ${course.levelColor}">
          ${course.level}
        </div>
        <div class="course-thumb-overlay">
          <div class="play-btn">▶</div>
        </div>
      </div>
      <div class="course-body">
        <div class="course-category">${getCategoryLabel(course.category)}</div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-instructor">${course.instructor}</p>
        <div class="course-meta">
          <span class="course-rating">★ ${course.rating}</span>
          <span>·</span>
          <span>${course.students} students</span>
          <span>·</span>
          <span>${course.duration}</span>
        </div>
        <div class="course-footer">
          <div class="course-price">
            <span class="${course.price === 'Free' ? 'free' : 'paid'}">${course.priceDisplay}</span>
          </div>
          <button class="enroll-btn">Enroll Now</button>
        </div>
      </div>
    `;

    grid.appendChild(card);

    // Animate in
    setTimeout(() => {
      card.classList.add('visible');
    }, 50 + i * 60);

    // Hover effects on enroll button
    card.querySelector('.enroll-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      showToast(`Enrolling in "${course.title}"...`);
    });

    card.addEventListener('click', () => {
      showToast(`Opening "${course.title}"...`);
    });
  });
}

function getCategoryLabel(cat) {
  const labels = {
    ai: 'AI & Machine Learning',
    web: 'Web Development',
    data: 'Data Science',
    backend: 'Backend Engineering'
  };
  return labels[cat] || cat;
}

// ──────────────────────────────────────────────────────────────────
// COURSE TABS
// ──────────────────────────────────────────────────────────────────
function initCourseTabs() {
  const tabs = document.querySelectorAll('.course-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      renderCourses(filter);
    });
  });
}

// ──────────────────────────────────────────────────────────────────
// PRICING TOGGLE
// ──────────────────────────────────────────────────────────────────
function initPricingToggle() {
  const toggle  = document.getElementById('pricingToggle');
  const monthly = document.getElementById('monthlyLabel');
  const yearly  = document.getElementById('yearlyLabel');
  if (!toggle) return;

  let isYearly = false;

  toggle.addEventListener('click', () => {
    isYearly = !isYearly;
    toggle.classList.toggle('active', isYearly);
    monthly?.classList.toggle('active', !isYearly);
    yearly?.classList.toggle('active', isYearly);

    // Update prices
    document.querySelectorAll('.price-amount[data-monthly]').forEach(el => {
      const target = isYearly ? el.dataset.yearly : el.dataset.monthly;
      if (target) {
        animatePrice(el, parseInt(target));
      }
    });
  });
}

function animatePrice(el, target) {
  const current = parseInt(el.textContent.replace('$', '')) || 0;
  const start = performance.now();
  const duration = 300;

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const val = Math.round(current + (target - current) * progress);
    el.textContent = `$${val}`;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

// ──────────────────────────────────────────────────────────────────
// AUTH MODAL
// ──────────────────────────────────────────────────────────────────
function initAuthModal() {
  const modal       = document.getElementById('authModal');
  const loginBtn    = document.getElementById('loginBtn');
  const signupBtn   = document.getElementById('signupBtn');
  const startBtn    = document.getElementById('startLearningBtn');
  const closeBtn    = document.getElementById('modalClose');
  const switchBtn   = document.getElementById('switchAuth');
  const titleEl     = document.getElementById('modalTitle');
  const subtitleEl  = document.getElementById('modalSubtitle');
  const submitBtn   = document.getElementById('authSubmitBtn');
  const nameGroup   = document.getElementById('nameGroup');
  const authForm    = document.getElementById('authForm');
  if (!modal) return;

  let isLogin = true;

  const openModal = (loginMode = true) => {
    isLogin = loginMode;
    updateModalState();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  const updateModalState = () => {
    if (isLogin) {
      titleEl.textContent = 'Welcome back';
      subtitleEl.textContent = 'Sign in to continue your learning journey';
      submitBtn.textContent = 'Sign In';
      switchBtn.textContent = 'Sign up free';
      document.querySelector('.modal-switch').firstChild.textContent = "Don't have an account? ";
      nameGroup.style.display = 'none';
    } else {
      titleEl.textContent = 'Create your account';
      subtitleEl.textContent = 'Start learning for free — no credit card required';
      submitBtn.textContent = 'Create Account';
      switchBtn.textContent = 'Sign in instead';
      document.querySelector('.modal-switch').firstChild.textContent = 'Already have an account? ';
      nameGroup.style.display = '';
    }
  };

  loginBtn?.addEventListener('click', () => openModal(true));
  signupBtn?.addEventListener('click', () => openModal(false));
  startBtn?.addEventListener('click', () => openModal(false));
  document.getElementById('startLearningBtn')?.addEventListener('click', () => openModal(false));

  // CTA buttons
  document.querySelectorAll('.plan-btn-primary, .btn-hero-primary').forEach(btn => {
    btn.addEventListener('click', () => openModal(false));
  });

  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  switchBtn?.addEventListener('click', () => {
    isLogin = !isLogin;
    updateModalState();
  });

  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = authForm.querySelector('button[type="submit"]');
    btn.textContent = '...';
    btn.disabled = true;

    setTimeout(() => {
      closeModal();
      showToast(isLogin ? '✓ Welcome back!' : '🎉 Account created! Start exploring →');
      btn.textContent = isLogin ? 'Sign In' : 'Create Account';
      btn.disabled = false;
    }, 1200);
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

// ──────────────────────────────────────────────────────────────────
// CHAT DEMO
// ──────────────────────────────────────────────────────────────────
function initChatDemo() {
  const chatInput = document.getElementById('chatInput');
  const chatSend  = document.getElementById('chatSend');
  const chatDemo  = document.getElementById('chatDemo');
  if (!chatInput || !chatSend || !chatDemo) return;

  const sendMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message
    const userMsg = createMessage(text, 'user-msg');
    chatDemo.appendChild(userMsg);
    chatInput.value = '';
    scrollChat();

    // Show typing indicator
    const typing = createTypingIndicator();
    chatDemo.appendChild(typing);
    scrollChat();

    // AI response after delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      typing.remove();
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMsg = createMessage(response, 'ai-msg');
      chatDemo.appendChild(aiMsg);
      scrollChat();
    }, delay);
  };

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

function createMessage(text, type) {
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
  div.style.opacity = '0';
  div.style.transform = 'translateY(8px)';
  div.style.transition = 'all 0.3s ease';
  setTimeout(() => {
    div.style.opacity = '1';
    div.style.transform = 'translateY(0)';
  }, 10);
  return div;
}

function createTypingIndicator() {
  const div = document.createElement('div');
  div.className = 'chat-msg ai-msg';
  div.innerHTML = `
    <div class="chat-bubble" style="padding: 12px 16px;">
      <span style="display:flex;align-items:center;gap:4px;">
        <span style="width:6px;height:6px;background:#6e7681;border-radius:50%;animation:typingBounce 1.4s ease infinite;display:block;"></span>
        <span style="width:6px;height:6px;background:#6e7681;border-radius:50%;animation:typingBounce 1.4s ease 0.2s infinite;display:block;"></span>
        <span style="width:6px;height:6px;background:#6e7681;border-radius:50%;animation:typingBounce 1.4s ease 0.4s infinite;display:block;"></span>
      </span>
    </div>
  `;
  return div;
}

function scrollChat() {
  const chatDemo = document.getElementById('chatDemo');
  if (chatDemo) {
    requestAnimationFrame(() => {
      chatDemo.scrollTop = chatDemo.scrollHeight;
    });
  }
}

// ──────────────────────────────────────────────────────────────────
// COPY BUTTONS
// ──────────────────────────────────────────────────────────────────
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-snippet')?.querySelector('pre');
      if (pre) {
        navigator.clipboard.writeText(pre.innerText).then(() => {
          const orig = btn.textContent;
          btn.textContent = '✓ Copied!';
          btn.style.color = '#34d399';
          setTimeout(() => {
            btn.textContent = orig;
            btn.style.color = '';
          }, 2000);
        });
      }
    });
  });
}

// Global copy function for inline onclick
window.copyCode = (btn) => {
  const pre = btn.closest('.code-snippet')?.querySelector('pre');
  if (pre) {
    navigator.clipboard.writeText(pre.innerText).then(() => {
      const orig = btn.textContent;
      btn.textContent = '✓ Copied!';
      btn.style.color = '#34d399';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.color = '';
      }, 2000);
    });
  }
};

// ──────────────────────────────────────────────────────────────────
// TOAST NOTIFICATIONS
// ──────────────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '14px 20px',
    background: 'rgba(13, 17, 23, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(167, 139, 250, 0.3)',
    borderRadius: '12px',
    color: '#f0f6fc',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'Inter, sans-serif',
    zIndex: '9999',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    transform: 'translateY(100px)',
    opacity: '0',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    maxWidth: '300px',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ──────────────────────────────────────────────────────────────────
// UTILITIES
// ──────────────────────────────────────────────────────────────────
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// ──────────────────────────────────────────────────────────────────
// HERO BUTTON EFFECTS
// ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const watchDemo = document.getElementById('watchDemoBtn');
  if (watchDemo) {
    watchDemo.addEventListener('click', () => {
      showToast('🎬 Demo video coming soon!');
    });
  }

  // Trusted logo animation stagger
  const logos = document.querySelectorAll('.trusted-logo');
  logos.forEach((logo, i) => {
    logo.style.animationDelay = `${i * 0.4}s`;
  });

  // Smooth scroll to section buttons
  document.querySelectorAll('[href="#pricing"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Add hover effects to stat items
  document.querySelectorAll('.stat-item').forEach(item => {
    item.style.transition = 'transform 0.2s ease';
    item.addEventListener('mouseenter', () => item.style.transform = 'translateY(-2px)');
    item.addEventListener('mouseleave', () => item.style.transform = '');
  });
});

// ──────────────────────────────────────────────────────────────────
// PARALLAX HERO ORBS
// ──────────────────────────────────────────────────────────────────
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  orbs.forEach((orb, i) => {
    const strength = (i + 1) * 12;
    orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  });
});

// ──────────────────────────────────────────────────────────────────
// PERFORMANCE: Lazy images / Intersection observer for sections
// ──────────────────────────────────────────────────────────────────
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('section').forEach(section => {
  sectionObserver.observe(section);
});
