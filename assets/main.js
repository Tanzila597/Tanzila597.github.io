(function () {
  // Nav background on scroll
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var btn = document.getElementById('menuBtn');
  var links = document.getElementById('navLinks');
  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Typing effect
  var words = ['Conference marketing', 'Social media & content', 'Community communications', 'Impact reporting', 'Event coordination'];
  var el = document.getElementById('typed');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (el && !reduce) {
    var w = 0, i = words[0].length, deleting = true;
    (function tick() {
      var word = words[w];
      el.textContent = word.slice(0, i);
      if (deleting) {
        i--;
        if (i < 0) { deleting = false; w = (w + 1) % words.length; i = 0; }
      } else {
        i++;
        if (i > words[w].length) { deleting = true; setTimeout(tick, 1600); return; }
      }
      setTimeout(tick, deleting ? 40 : 80);
    })();
  }

  // Report cards without a link yet
  document.querySelectorAll('.report-card[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
