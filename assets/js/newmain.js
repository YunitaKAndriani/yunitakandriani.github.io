    // ── THEME ──────────────────────────────────────────────
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-btn');

    function getTheme() {
      return localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    function applyTheme(t) {
      html.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
      themeBtn.innerHTML = t === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }

    applyTheme(getTheme());

    themeBtn.addEventListener('click', () => {
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });

    // ── LANGUAGE ───────────────────────────────────────────
    const langBtn = document.getElementById('lang-btn');
    let currentLang = 'en';

    function applyLang(lang) {
      currentLang = lang;
      document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
      });
      langBtn.innerHTML = lang === 'en'
        ? '<img class="lang-flag" src="https://flagcdn.com/w20/us.png" alt="EN">'
        : '<img class="lang-flag" src="https://flagcdn.com/w20/jp.png" alt="JP">';
    }

    langBtn.addEventListener('click', () => applyLang(currentLang === 'en' ? 'jp' : 'en'));

    // ── MOBILE NAV ────────────────────────────────────────
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

    // ── ACTIVE NAV ────────────────────────────────────────
    const sections = ['homeContent','aboutmeContent','academicContent','researchContent','blogContent'];
    const navEls   = ['nav-home','nav-aboutme','nav-academic','nav-research','nav-blog'];

    function updateNav() {
      const navH = document.getElementById('top-nav').offsetHeight + 20;
      const scrollY = window.scrollY + navH;
      let active = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) active = i;
      });
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      document.getElementById(navEls[active])?.classList.add('active');
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // ── SMOOTH SCROLL ─────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = document.getElementById('top-nav').offsetHeight + 12;
        window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
      });
    });

    // ── BIBTEX COPY ──────────────────────────────────────
    document.querySelectorAll('.citation').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const bibtex = link.closest('.pub')?.querySelector('.d-none');
        if (bibtex) {
          navigator.clipboard.writeText(bibtex.innerText.trim())
            .then(() => toastr.success('BibTeX copied!'))
            .catch(() => toastr.error('Copy failed'));
        }
      });
    });

    // toastr config
    toastr.options = { timeOut: 2000, positionClass: 'toast-bottom-right', closeButton: false };
