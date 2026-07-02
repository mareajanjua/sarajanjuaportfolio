const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

reveals.forEach((el) => observer.observe(el));

const progress = document.querySelector('.progress span');
const arrowUp = document.querySelector('.arrow-up');
let scrollTicking = false;

const updateScrollUi = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (progress && scrollable > 0) {
    progress.style.width = `${(window.scrollY / scrollable) * 100}%`;
  }
  if (arrowUp) arrowUp.classList.toggle('visible', window.scrollY > 480);
};

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollUi();
    scrollTicking = false;
  });
}, { passive: true });

window.addEventListener('resize', updateScrollUi, { passive: true });
updateScrollUi();

if (arrowUp) {
  arrowUp.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const btn = document.querySelector('.menu-btn');
const panel = document.querySelector('.mobile-panel');

if (btn && panel) {
  btn.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    panel.setAttribute('aria-hidden', String(!isOpen));
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}
