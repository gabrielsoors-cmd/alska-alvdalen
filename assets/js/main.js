// Älska Älvdalen — liten interaktion. Inget ramverk behövs.

// Mobilmeny: öppna/stäng, lås sidscroll, stäng med Escape/länk/bredare skärm.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.setAttribute('data-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Stäng meny' : 'Öppna meny');
    document.documentElement.classList.toggle('nav-open', open);
  };

  toggle.addEventListener('click', () => setOpen(nav.getAttribute('data-open') !== 'true'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 62rem)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
});

// Kontaktformulär — statisk sajt utan backend, så vi bygger en mailto:-länk
// av det ifyllda och öppnar den i besökarens e-postklient istället.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const CONTACT_EMAIL = 'hannah@risander.se';

  // Förvälj ämne från länk, t.ex. kontakt.html?amne=medlemskap
  const topic = new URLSearchParams(window.location.search).get('amne');
  if (topic && form.topic) {
    const match = Array.from(form.topic.options).find((o) => o.dataset.key === topic);
    if (match) form.topic.value = match.value;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const topicLabel = form.topic ? form.topic.value : '';

    const subject = topicLabel
      ? `${topicLabel} — från ${name} via alskaalvdalen.com`
      : `Meddelande från ${name} via alskaalvdalen.com`;
    const body = `${message}\n\n—\n${name}\n${email}`;

    window.location.href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  });
});

// Reveal-on-scroll — subtil, progressiv upptäckt av innehåll. Respekterar
// användare som bett om minskad rörelse.
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
  }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });

  items.forEach((el) => observer.observe(el));
});
