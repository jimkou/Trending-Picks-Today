// Lightweight interactions: reveal on load + ripple effect for buttons + year injection
document.addEventListener('DOMContentLoaded', ()=> {
  // Inject current year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // Reveal product cards with a small stagger (respecting reduced motion)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    const cards = document.querySelectorAll('.card');
    cards.forEach((c, i) => {
      // add class with increasing delay
      c.classList.add('reveal', `reveal-delay-${Math.min(i+1,3)}`);
      // small initial transform handled by CSS; reveal class resets it
    });
  } else {
    // If reduced motion requested, just make them visible
    document.querySelectorAll('.card').forEach(c => c.classList.add('reveal'));
  }

  // Button ripple effect (progressive enhancement)
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height) * 1.4;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(()=> ripple.remove(), 600);
    });
  });
});
/* small inline ripple styles (inserted by JS fallback if CSS not loaded) */
(function ensureRippleStyles(){
  const css = `.btn{position:relative;overflow:hidden}.btn .ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,0.28);transform:scale(0);animation:r .6s ease-out}@keyframes r{to{transform:scale(1);opacity:0}}`;
  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();
