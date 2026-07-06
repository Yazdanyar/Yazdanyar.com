(function () {
  const triggers = document.querySelectorAll('.acc-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const bodyId = trigger.getAttribute('aria-controls');
      const body = document.getElementById(bodyId);
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Luk alle
      triggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const b = document.getElementById(t.getAttribute('aria-controls'));
        if (b) b.hidden = true;
      });

      // Åbn den klikkede, medmindre den allerede var åben
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        body.hidden = false;
        // Scroll let til elementet så man ser det åbne
        trigger.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
})();
