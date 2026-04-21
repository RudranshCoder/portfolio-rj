document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => { themeToggle.style.transform = ''; }, 150);
  });

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  const animElements = document.querySelectorAll('.anim-fade-up, .anim-scale-in, .anim-slide-left, .anim-slide-right');

  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  animElements.forEach(el => animObserver.observe(el));

  const phrases = [
    'Web Developer',
    'Problem Solver',
    'UI/UX Enthusiast',
    'Code Craftsman'
  ];
  const typewriterEl = document.getElementById('typewriterText');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typewrite() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typewrite, typeSpeed);
  }

  typewrite();

  const techSlider = document.getElementById('techSlider');
  if (techSlider) {
    const slides = techSlider.innerHTML;
    techSlider.innerHTML = slides + slides;
  }

  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('formStatus');

  function showError(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    input.style.borderColor = 'var(--error)';
  }

  function clearError(input, errorId) {
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = '';
    input.style.borderColor = '';
  }

  nameInput.addEventListener('blur', () => {
    if (!nameInput.value.trim()) {
      showError(nameInput, 'nameError', 'Name is required');
    } else {
      clearError(nameInput, 'nameError');
    }
  });

  emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, 'emailError', 'Email is required');
    } else if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, 'emailError', 'Please enter a valid email');
    } else {
      clearError(emailInput, 'emailError');
    }
  });

  messageInput.addEventListener('blur', () => {
    if (!messageInput.value.trim()) {
      showError(messageInput, 'messageError', 'Message is required');
    } else {
      clearError(messageInput, 'messageError');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, 'nameError', 'Name is required');
      isValid = false;
    } else {
      clearError(nameInput, 'nameError');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, 'emailError', 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, 'emailError', 'Please enter a valid email');
      isValid = false;
    } else {
      clearError(emailInput, 'emailError');
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, 'messageError', 'Message is required');
      isValid = false;
    } else {
      clearError(messageInput, 'messageError');
    }

    if (isValid) {
      formStatus.textContent = '✓ Message sent successfully!';
      formStatus.className = 'form-status success';
      form.reset();
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 4000);
    }
  });

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });
});
