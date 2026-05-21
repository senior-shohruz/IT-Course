// =====================================================================
// AI TEACHER — Auth Page JavaScript (login.html)
// =====================================================================

'use strict';

// ─── STATE ───────────────────────────────────────────────────────────
let currentTab   = 'login';
let isSubmitting = false;
let pwVisible    = false;

// ─── INIT ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initPasswordStrength();
  initInputValidation();
  initKeyboardShortcuts();
  checkURLParams();
});

// ─── URL PARAMS (e.g. ?mode=signup) ──────────────────────────────────
function checkURLParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mode') === 'signup') {
    switchTab('signup');
  }
}

// ─── FLOATING PARTICLES ───────────────────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#a78bfa', '#38bdf8', '#f472b6', '#34d399', '#fbbf24'];

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size  = Math.random() * 3 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left  = Math.random() * 100;
    const delay = Math.random() * 15;
    const dur   = 8 + Math.random() * 12;

    Object.assign(p.style, {
      width:           size + 'px',
      height:          size + 'px',
      background:      color,
      left:            left + '%',
      bottom:          '-10px',
      animationDuration:  dur + 's',
      animationDelay:  delay + 's',
      opacity:         0,
    });

    container.appendChild(p);
  }
}

// ─── TAB SWITCHER ─────────────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;

  const loginTab  = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const slider    = document.getElementById('tabSlider');

  // Update tabs
  loginTab.classList.toggle('active', tab === 'login');
  signupTab.classList.toggle('active', tab === 'signup');

  // Slide indicator
  if (tab === 'login') {
    slider.classList.remove('right');
  } else {
    slider.classList.add('right');
  }

  // Update card content
  const cardTitle    = document.getElementById('cardTitle');
  const cardSubtitle = document.getElementById('cardSubtitle');
  const submitText   = document.getElementById('submitText');
  const switchText   = document.getElementById('switchText');
  const switchBtn    = document.getElementById('switchBtn');
  const forgotLink   = document.getElementById('forgotLink');
  const googleText   = document.getElementById('googleBtnText');
  const githubText   = document.getElementById('githubBtnText');

  const nameField    = document.getElementById('nameField');
  const confirmField = document.getElementById('confirmField');
  const termsRow     = document.getElementById('termsRow');
  const pwStrength   = document.getElementById('pwStrength');

  if (tab === 'login') {
    cardTitle.textContent    = 'Welcome back 👋';
    cardSubtitle.textContent = 'Sign in to continue your learning journey';
    submitText.textContent   = 'Sign In';
    switchText.textContent   = "Don't have an account?";
    switchBtn.textContent    = 'Create one free';
    googleText.textContent   = 'Continue with Google';
    githubText.textContent   = 'Continue with GitHub';
    if (forgotLink) forgotLink.style.display = '';

    nameField.style.display    = 'none';
    confirmField.style.display = 'none';
    termsRow.style.display     = 'none';
    pwStrength.style.display   = 'none';
  } else {
    cardTitle.textContent    = 'Create your account 🚀';
    cardSubtitle.textContent = 'Start learning for free — no credit card required';
    submitText.textContent   = 'Create Account';
    switchText.textContent   = 'Already have an account?';
    switchBtn.textContent    = 'Sign in instead';
    googleText.textContent   = 'Sign up with Google';
    githubText.textContent   = 'Sign up with GitHub';
    if (forgotLink) forgotLink.style.display = 'none';

    nameField.style.display    = '';
    confirmField.style.display = '';
    termsRow.style.display     = '';
    pwStrength.style.display   = '';
  }

  // Clear errors
  clearAllErrors();
}

// ─── TOGGLE PASSWORD ──────────────────────────────────────────────────
function togglePassword() {
  const input = document.getElementById('passwordInput');
  const icon  = document.getElementById('eyeIcon');
  pwVisible = !pwVisible;
  input.type = pwVisible ? 'text' : 'password';

  icon.innerHTML = pwVisible
    ? `<path d="M2 8s2-5 6-5 6 5 6 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
       <path d="M2 8s2 5 6 5 6-5 6-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
       <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`
    : `<path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="currentColor" stroke-width="1.4"/>
       <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.4"/>`;
}

// ─── PASSWORD STRENGTH ────────────────────────────────────────────────
function initPasswordStrength() {
  const input  = document.getElementById('passwordInput');
  const label  = document.getElementById('pwLabel');
  const bars   = ['bar1','bar2','bar3','bar4'].map(id => document.getElementById(id));

  if (!input || !label) return;

  input.addEventListener('input', () => {
    if (currentTab !== 'signup') return;

    const val = input.value;
    const strength = calcStrength(val);

    // Reset bars
    bars.forEach(b => { b.className = 'pw-bar'; });

    if (!val) {
      label.textContent = 'Enter a password';
      label.style.color = 'var(--text3)';
      return;
    }

    const levels = [
      { n: 1, cls: 'weak',   text: 'Too weak',   color: 'var(--red)'    },
      { n: 2, cls: 'fair',   text: 'Fair',        color: 'var(--yellow)' },
      { n: 3, cls: 'good',   text: 'Good',        color: 'var(--blue)'   },
      { n: 4, cls: 'strong', text: 'Strong ✓',    color: 'var(--green)'  },
    ];

    const level = levels[Math.min(strength - 1, 3)];
    if (level) {
      for (let i = 0; i < level.n; i++) {
        bars[i].classList.add(level.cls);
      }
      label.textContent = level.text;
      label.style.color = level.color;
    }
  });
}

function calcStrength(pw) {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(4, score);
}

// ─── REAL-TIME VALIDATION ─────────────────────────────────────────────
function initInputValidation() {
  const emailInput = document.getElementById('emailInput');
  const pwInput    = document.getElementById('passwordInput');

  emailInput?.addEventListener('blur', () => validateEmail(true));
  pwInput?.addEventListener('blur', () => validatePassword(true));
}

function validateEmail(show = false) {
  const input = document.getElementById('emailInput');
  const error = document.getElementById('emailError');
  const val   = input.value.trim();
  const re    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!val) {
    if (show) showError(input, error, 'Email is required');
    return false;
  }
  if (!re.test(val)) {
    if (show) showError(input, error, 'Enter a valid email address');
    return false;
  }

  clearError(input, error);
  return true;
}

function validatePassword(show = false) {
  const input = document.getElementById('passwordInput');
  const error = document.getElementById('passwordError');
  const val   = input.value;

  if (!val) {
    if (show) showError(input, error, 'Password is required');
    return false;
  }
  if (currentTab === 'signup' && val.length < 8) {
    if (show) showError(input, error, 'Password must be at least 8 characters');
    return false;
  }

  clearError(input, error);
  return true;
}

function validateName() {
  if (currentTab !== 'signup') return true;
  const input = document.getElementById('nameInput');
  const error = document.getElementById('nameError');
  const val   = input.value.trim();

  if (!val) {
    showError(input, error, 'Full name is required');
    return false;
  }
  if (val.length < 2) {
    showError(input, error, 'Name must be at least 2 characters');
    return false;
  }

  clearError(input, error);
  return true;
}

function validateConfirm() {
  if (currentTab !== 'signup') return true;
  const pw      = document.getElementById('passwordInput').value;
  const input   = document.getElementById('confirmInput');
  const error   = document.getElementById('confirmError');

  if (!input.value) {
    showError(input, error, 'Please confirm your password');
    return false;
  }
  if (pw !== input.value) {
    showError(input, error, 'Passwords do not match');
    return false;
  }

  clearError(input, error);
  return true;
}

function showError(input, errorEl, msg) {
  input.classList.add('error');
  input.classList.remove('success');
  if (errorEl) errorEl.textContent = msg;
  input.style.animation = 'shake 0.4s ease';
  setTimeout(() => { input.style.animation = ''; }, 400);
}

function clearError(input, errorEl) {
  input.classList.remove('error');
  input.classList.add('success');
  if (errorEl) errorEl.textContent = '';
}

function clearAllErrors() {
  document.querySelectorAll('.field-input').forEach(i => {
    i.classList.remove('error', 'success');
  });
  document.querySelectorAll('.field-error').forEach(e => {
    e.textContent = '';
  });
}

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

// ─── FORM SUBMIT ──────────────────────────────────────────────────────
async function handleFormSubmit(e) {
  e.preventDefault();
  if (isSubmitting) return;

  // Validate
  const validEmail = validateEmail(true);
  const validPw    = validatePassword(true);
  const validName  = validateName();
  const validConf  = validateConfirm();

  if (currentTab === 'signup') {
    const terms = document.getElementById('termsCheck');
    if (!terms.checked) {
      showToast('Please accept the Terms of Service', 'error');
      return;
    }
  }

  if (!validEmail || !validPw || !validName || !validConf) return;

  // Show loading
  setLoading(true);

  // Simulate API call
  await delay(1800);

  setLoading(false);

  const email = document.getElementById('emailInput').value;
  const name  = currentTab === 'signup'
    ? document.getElementById('nameInput').value
    : email.split('@')[0];

  showSuccess(name, currentTab === 'login');
}

function setLoading(loading) {
  isSubmitting = loading;
  const btn     = document.getElementById('submitBtn');
  const text    = document.getElementById('submitText');
  const spinner = document.getElementById('btnSpinner');
  const arrow   = document.getElementById('submitArrow');

  btn.disabled = loading;
  spinner.style.display = loading ? 'flex' : 'none';
  arrow.style.display   = loading ? 'none' : 'block';
  text.textContent = loading
    ? (currentTab === 'login' ? 'Signing in...' : 'Creating account...')
    : (currentTab === 'login' ? 'Sign In' : 'Create Account');
}

// ─── GOOGLE AUTH ──────────────────────────────────────────────────────
function handleGoogleAuth() {
  const overlay = document.getElementById('googlePopup');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGooglePopup() {
  const overlay = document.getElementById('googlePopup');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

async function selectGoogleAccount(email, name) {
  closeGooglePopup();

  // Show loading state on Google button
  const googleBtn  = document.getElementById('googleBtn');
  const googleText = document.getElementById('googleBtnText');
  const origText   = googleText.textContent;
  googleText.textContent = 'Signing in...';
  googleBtn.disabled = true;

  await delay(1400);

  googleBtn.disabled = false;
  googleText.textContent = origText;

  showSuccess(name, currentTab === 'login');
}

// ─── GITHUB AUTH ──────────────────────────────────────────────────────
async function handleGithubAuth() {
  const btn  = document.getElementById('githubBtn');
  const text = document.getElementById('githubBtnText');

  btn.disabled = true;
  text.textContent = 'Connecting to GitHub...';

  await delay(1600);

  btn.disabled = false;
  text.textContent = currentTab === 'login' ? 'Continue with GitHub' : 'Sign up with GitHub';

  showSuccess('GitHub User', currentTab === 'login');
}

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────
function showSuccess(name, isLogin) {
  const overlay    = document.getElementById('successOverlay');
  const title      = document.getElementById('successTitle');
  const msg        = document.getElementById('successMsg');
  const bar        = document.getElementById('successBar');

  title.textContent = isLogin
    ? `Welcome back, ${name}! 👋`
    : `Account created! 🎉`;

  msg.textContent = isLogin
    ? 'Signed in successfully. Taking you to your dashboard...'
    : 'Your account is ready! Let\'s start your learning journey.';

  overlay.classList.add('open');

  // Animate progress bar
  setTimeout(() => { bar.style.width = '100%'; }, 100);

  // Redirect after 2.8s
  setTimeout(() => {
    overlay.classList.remove('open');
    // In real app: window.location.href = '/dashboard';
    // For demo, go back to main page
    window.location.href = 'index.html';
  }, 2900);
}

// ─── KEYBOARD SHORTCUTS ───────────────────────────────────────────────
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // ESC closes Google popup
    if (e.key === 'Escape') {
      closeGooglePopup();
    }
    // Enter submits form
    if (e.key === 'Enter' && document.activeElement.classList.contains('field-input')) {
      document.getElementById('authForm')?.requestSubmit();
    }
  });
}

// ─── TOAST ────────────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  document.querySelectorAll('.at-toast').forEach(t => t.remove());

  const colors = {
    info:    { bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.3)', text: '#a78bfa' },
    success: { bg: 'rgba(52,211,153,0.15)',  border: 'rgba(52,211,153,0.3)',  text: '#34d399' },
    error:   { bg: 'rgba(248,113,113,0.15)', border: 'rgba(248,113,113,0.3)', text: '#f87171' },
  };
  const c = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.className = 'at-toast';
  toast.textContent = msg;

  Object.assign(toast.style, {
    position:   'fixed',
    bottom:     '24px',
    left:       '50%',
    transform:  'translateX(-50%) translateY(80px)',
    padding:    '12px 20px',
    background: c.bg,
    border:     `1px solid ${c.border}`,
    borderRadius: '10px',
    color:      c.text,
    fontSize:   '14px',
    fontWeight: '500',
    fontFamily: 'Inter, sans-serif',
    zIndex:     '99999',
    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
    opacity:    '0',
    backdropFilter: 'blur(12px)',
    whiteSpace: 'nowrap',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity   = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(80px)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── UTILS ────────────────────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Close popup when clicking overlay
document.getElementById('googlePopup')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('googlePopup')) {
    closeGooglePopup();
  }
});

// Input focus glow effect
document.querySelectorAll('.field-input').forEach(input => {
  input.addEventListener('focus', () => {
    input.closest('.input-wrap')?.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.closest('.input-wrap')?.classList.remove('focused');
  });
});

// Auto-detect if user came from Google referrer (demo)
window.addEventListener('load', () => {
  const emailInput = document.getElementById('emailInput');
  if (emailInput) {
    // Focus email field on load
    setTimeout(() => emailInput.focus(), 600);
  }
});
