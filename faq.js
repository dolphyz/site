(function () {
  var items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  function setState(item, isOpen){
    var btn = item.querySelector('.faq-question');
    var wrap = item.querySelector('.faq-answer-wrap');

    item.classList.toggle('is-open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    if (isOpen){
      wrap.removeAttribute('aria-hidden');
    } else {
      wrap.setAttribute('aria-hidden', 'true');
    }
  }

  // Sync aria-hidden with whatever is marked open in the HTML on page load
  items.forEach(function (item) {
    setState(item, item.classList.contains('is-open'));
  });

  items.forEach(function (item) {
    var btn = item.querySelector('.faq-question');

    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('is-open');

      // Accordion behaviour — opening one question closes the others
      items.forEach(function (other) {
        setState(other, false);
      });

      if (!wasOpen){
        setState(item, true);
      }
    });
  });
})();
