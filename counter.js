(function(){
  var counters = document.querySelectorAll('.stat-count');
  if (!counters.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DURATION = 2200; // smoother, longer animation

  function animateCount(el){
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    if (reduceMotion){
      el.textContent = target;
      return;
    }

    var start = null;

    function step(timestamp){
      if (start === null) start = timestamp;

      var progress = Math.min((timestamp - start) / DURATION, 1);

      // smooth slow-down at the end
      var eased = 1 - Math.pow(1 - progress, 4);

      var current = Math.round(eased * target);
      el.textContent = current;

      if (progress < 1){
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(function(el){
    observer.observe(el);
  });
})();