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
const sourceImagePath = 'Gemini_Generated_Image_i5x06ti5x06ti5x0.png';

const variantConfigs = {
  warm: {
    filter: 'saturate(1.12) contrast(1.06) brightness(1.05)',
    overlay: 'rgba(200, 134, 61, 0.22)',
    focus: 0.55,
  },
  mono: {
    filter: 'grayscale(1) contrast(1.2) brightness(1.05)',
    overlay: 'rgba(12, 15, 15, 0.32)',
    focus: 0.5,
  },
  detail: {
    filter: 'saturate(0.95) contrast(1.12)',
    overlay: 'rgba(75, 161, 77, 0.22)',
    focus: 0.35,
  },
};

function animateReadout() {
  const load = 3.2 + Math.random() * 0.7;
  const reserve = 72 + Math.random() * 8;
  loadValue.textContent = `${load.toFixed(1)} kW`;
  reserveValue.textContent = `${reserve.toFixed(0)}%`;
  progressBar.style.width = `${reserve}%`;
}

setInterval(animateReadout, 3500);

function drawCover(ctx, img, width, height, focus = 0.5) {
  const scale = Math.max(width / img.width, height / img.height);
  const drawWidth = img.width * scale;
  const drawHeight = img.height * scale;
  const x = (width - drawWidth) * focus;
  const y = (height - drawHeight) / 2;
  ctx.drawImage(img, x, y, drawWidth, drawHeight);
}

function createVariantData(img, variant) {
  const { filter, overlay, focus } = variantConfigs[variant] ?? variantConfigs.warm;
  const width = Math.min(img.width, 1400);
  const height = Math.round(width * 0.62);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.filter = filter;
  drawCover(ctx, img, width, height, focus);
  if (overlay) {
    ctx.filter = 'none';
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL('image/png');
}

function populateGeneratedImages() {
  const variantSlots = document.querySelectorAll('img[data-variant]');
  if (!variantSlots.length) return;

  const source = new Image();
  source.src = sourceImagePath;
  source.onload = () => {
    variantSlots.forEach((slot) => {
      const variantKey = slot.dataset.variant;
      const dataUrl = createVariantData(source, variantKey);
      slot.src = dataUrl;
      slot.dataset.generated = 'true';
    });
  };
  source.onerror = () => {
    variantSlots.forEach((slot) => {
      slot.src = sourceImagePath;
    });
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', populateGeneratedImages);
} else {
  populateGeneratedImages();
}
