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
