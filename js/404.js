//para alert de volver
const volverBtn = document.querySelector('.volver');

        function mostrarMensajeVolver() {
            alert('¿Deseas volver al incio? ');
        }
        volverBtn.addEventListener('click', mostrarMensajeVolver);