// Älska Älvdalen — liten interaktion för mobilmenyn. Inget ramverk behövs.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

// Kontaktformulär — statisk sajt utan backend, så vi bygger en mailto:-länk
// av det ifyllda och öppnar den i besökarens e-postklient istället.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const CONTACT_EMAIL = 'hannah@risander.se';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = `Meddelande från ${name} via alskaalvdalen.com`;
    const body = `${message}\n\n—\n${name}\n${email}`;

    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  });
});

// Reveal-on-scroll — subtil, progressiv upptäckt av innehåll. Respekterar
// användare som bett om minskad rörelse (redan hanterat i CSS, men vi
// hoppar även över själva observern här för gott skull).
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });

  items.forEach((el) => observer.observe(el));
});
