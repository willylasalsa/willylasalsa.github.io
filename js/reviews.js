(() => {
  'use strict';
  const form = document.getElementById('review-form');
  if (!form) return;
  const message = document.getElementById('review-status');

  form.querySelectorAll('.star-options').forEach(group => {
    const radios = [...group.querySelectorAll('input[type="radio"]')];
    const paint = value => {
      radios.forEach(radio => {
        const label = radio.closest('label');
        const selected = Number(radio.value) <= Number(value);
        label.classList.toggle('is-selected', selected);
      });
    };
    radios.forEach(radio => radio.addEventListener('change', () => paint(radio.value)));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const pageRating = form.querySelector('input[name="page-rating"]:checked');
    const serviceRating = form.querySelector('input[name="service-rating"]:checked');
    const comment = document.getElementById('review-comment').value.trim();
    if (!pageRating || !serviceRating || !comment) {
      message.textContent = 'Selecciona ambas valoraciones y escribe tu comentario.';
      return;
    }
    const lines = [
      'RESEÑA — SABORES QUE ENAMORAN',
      '',
      `Valoración de la página: ${pageRating.value}/5 estrellas`,
      `Valoración del servicio: ${serviceRating.value}/5 estrellas`,
      '',
      'Experiencia del cliente:',
      comment
    ];
    const url = 'https://wa.me/5358997259?text=' + encodeURIComponent(lines.join('\n'));
    const opened = window.open(url, '_blank', 'noopener');
    if (!opened) {
      message.textContent = 'Tu navegador bloqueó la apertura. Permite las ventanas emergentes e inténtalo de nuevo.';
      return;
    }
    message.textContent = 'Se preparó tu reseña en WhatsApp. Envíala para que podamos recibirla.';
  });
})();
