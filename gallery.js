(function(){
  var items = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  if (!items.length || !lightbox) return;

  var imgEl = document.getElementById('lightboxImg');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');
  var current = 0;

  var sources = Array.prototype.map.call(items, function(item){
    return item.getAttribute('data-full') || item.querySelector('img').src;
  });
  var captions = Array.prototype.map.call(items, function(item){
    var img = item.querySelector('img');
    return img ? img.alt : '';
  });

  function open(index){
    current = (index + sources.length) % sources.length;
    imgEl.src = sources[current];
    imgEl.alt = captions[current] || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  items.forEach(function(item, i){
    item.addEventListener('click', function(){ open(i); });
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function(){ open(current - 1); });
  nextBtn.addEventListener('click', function(){ open(current + 1); });
  lightbox.addEventListener('click', function(e){
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function(e){
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') open(current - 1);
    if (e.key === 'ArrowRight') open(current + 1);
  });
})();
