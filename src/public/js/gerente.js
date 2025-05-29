document.addEventListener('DOMContentLoaded', function () {
  const selects = document.querySelectorAll('.servG');

  selects.forEach(select => {
    select.addEventListener('change', function () {
      const destino = this.value;
      if (destino) {
        window.location.href = destino;
      }
    });
  });
});