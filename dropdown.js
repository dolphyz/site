  var header = document.getElementById('siteHeader');
  function onScroll(){
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('mobilePanel');
  var closeBtn = document.getElementById('mobilePanelClose');
  var scrim = document.getElementById('scrim');

  function openPanel(){
    panel.classList.add('is-open');
    scrim.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closePanel(){
    panel.classList.remove('is-open');
    scrim.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function(){
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  scrim.addEventListener('click', closePanel);
  panel.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', closePanel);
  });