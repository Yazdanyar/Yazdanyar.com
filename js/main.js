(function () {
  const panels = document.querySelectorAll('.panel');
  const triggers = document.querySelectorAll('[data-target]');

  function closeAll() {
    panels.forEach(p => { p.hidden = true; });
    triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
  }

  function openPanel(target) {
    closeAll();
    const panel = document.getElementById('panel-' + target);
    if (!panel) return;
    panel.hidden = false;
    document.body.style.overflow = 'hidden';
    document.querySelectorAll(`[data-target="${target}"]`).forEach(t => t.setAttribute('aria-expanded', 'true'));
    panel.querySelector('.panel-close')?.focus();
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = trigger.getAttribute('data-target');
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeAll();
      } else {
        openPanel(target);
      }
    });
  });

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', closeAll);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();
