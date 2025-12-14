const navLinks = document.querySelectorAll('.top-nav nav a');
const sections = Array.from(navLinks, (link) => document.querySelector(link.getAttribute('href')));
const navCta = document.getElementById('nav-cta');

function setActiveLink() {
  const scrollPosition = window.scrollY + 140;
  sections.forEach((section, index) => {
    if (!section) return;
    const { top, height } = section.getBoundingClientRect();
    const sectionTop = top + window.scrollY;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + height) {
      navLinks.forEach((link) => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
}

document.addEventListener('scroll', setActiveLink);
setActiveLink();

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

navCta?.addEventListener('click', () => {
  document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
});

const progressBar = document.getElementById('progress-bar');
const loadValue = document.getElementById('load-value');
const reserveValue = document.getElementById('reserve-value');

function animateReadout() {
  const load = 3.2 + Math.random() * 0.7;
  const reserve = 72 + Math.random() * 8;
  loadValue.textContent = `${load.toFixed(1)} kW`;
  reserveValue.textContent = `${reserve.toFixed(0)}%`;
  progressBar.style.width = `${reserve}%`;
}

setInterval(animateReadout, 3500);
