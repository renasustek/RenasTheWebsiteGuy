/* ============================================================
   RENAS THE WEBSITE GUY — JavaScript
   ============================================================ */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stagger children if they have fade-up class
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Add fade-up to cards and major elements
const animElements = document.querySelectorAll(
  '.benefit-card, .step-card, .pricing-card, .faq-item, .contact-card, .retainer-box, .mission-inner'
);

animElements.forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  observer.observe(el);
});

// Also observe section headers
document.querySelectorAll('.section-header').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ===== CALLBACK FORM HANDLER =====
function handleCallback(e) {
  e.preventDefault();
  const name = document.getElementById('callback-name').value;
  const phone = document.getElementById('callback-phone').value;
  const time = document.getElementById('callback-time').value;
  const timeLabel = time ? ` (${time})` : '';

  // Open WhatsApp with the callback request
  const msg = encodeURIComponent(
    `Hi Renas! I'd like to request a callback.\n\nName: ${name}\nPhone: ${phone}\nBest time: ${time || 'Any time'}${timeLabel}`
  );
  window.open(`https://wa.me/447913055346?text=${msg}`, '_blank');

  // Show success
  document.getElementById('callback-form').style.display = 'none';
  document.getElementById('callback-success').style.display = 'block';

  // Reset after 5 seconds
  setTimeout(() => {
    document.getElementById('callback-form').style.display = 'block';
    document.getElementById('callback-success').style.display = 'none';
    e.target.reset();
  }, 5000);
}

// ===== EMAIL FORM HANDLER =====
function handleEmail(e) {
  e.preventDefault();
  const name = document.getElementById('email-name').value;
  const email = document.getElementById('email-address').value;
  const message = document.getElementById('email-message').value;

  const subject = encodeURIComponent(`Website Enquiry from ${name}`);
  const body = encodeURIComponent(
    `Hi Renas,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:renasustek@gmail.com?subject=${subject}&body=${body}`;

  // Show success
  document.getElementById('email-form').style.display = 'none';
  document.getElementById('email-success').style.display = 'block';

  // Reset after 5 seconds
  setTimeout(() => {
    document.getElementById('email-form').style.display = 'block';
    document.getElementById('email-success').style.display = 'none';
    e.target.reset();
  }, 5000);
}

// ===== BUTTON PRESS RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousedown', function(e) {
    this.style.transform = 'translate(3px, 3px)';
    this.style.boxShadow = '2px 2px 0px #000';
  });
  btn.addEventListener('mouseup', function() {
    this.style.transform = '';
    this.style.boxShadow = '';
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.boxShadow = '';
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinksList.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#FF6B9D';
    }
  });
});

console.log('🚀 Renas The Website Guy — Page loaded!');
