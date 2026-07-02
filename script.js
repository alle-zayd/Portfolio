// ── THEME TOGGLE ──
const btn = document.getElementById('theme-toggle');

btn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  btn.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const carouselTrack = document.querySelector('.carousel-track');
if (carouselTrack) {
  const slides = Array.from(carouselTrack.children);
  slides.forEach(slide => carouselTrack.appendChild(slide.cloneNode(true)));

  let position = 0;
  let paused = false;
  const speed = 0.5; // px per frame
  const viewport = document.querySelector('.carousel-viewport');

  viewport.addEventListener('mouseenter', () => paused = true);
  viewport.addEventListener('mouseleave', () => paused = false);

  function animateCarousel() {
    if (!paused) {
      position += speed;
      const resetPoint = carouselTrack.scrollWidth / 2;
      if (position >= resetPoint) position -= resetPoint;
      carouselTrack.style.transform = `translateX(${-position}px)`;
    }
    requestAnimationFrame(animateCarousel);
  }

  requestAnimationFrame(animateCarousel);
}

const certificateCards = document.querySelectorAll('.certificate-card');
const certificateModal = document.querySelector('.certificate-modal');
const certificateModalImage = document.querySelector('.certificate-modal-image');
const certificateModalTitle = document.getElementById('certificate-modal-title');
const certificateModalCloseTargets = document.querySelectorAll('[data-close-certificate-modal]');

function openCertificateModal(card) {
  const image = card.querySelector('img');
  const caption = card.querySelector('figcaption');

  if (!certificateModal || !certificateModalImage || !certificateModalTitle || !image || !caption) {
    return;
  }

  certificateModalImage.src = image.src;
  certificateModalImage.alt = image.alt || caption.textContent.trim();
  certificateModalTitle.textContent = caption.textContent.trim();
  certificateModal.classList.add('open');
  certificateModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('certificate-modal-open');
}

function closeCertificateModal() {
  if (!certificateModal) {
    return;
  }

  certificateModal.classList.remove('open');
  certificateModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('certificate-modal-open');
}

certificateCards.forEach((card) => {
  card.addEventListener('click', () => openCertificateModal(card));

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCertificateModal(card);
    }
  });
});

certificateModalCloseTargets.forEach((target) => {
  target.addEventListener('click', closeCertificateModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCertificateModal();
  }
});
