//para alert de volver
const volverBtn = document.querySelector('.volver');

        function mostrarMensajeVolver() {
            alert('¿Deseas volver al incio? ');
        }
        volverBtn.addEventListener('click', mostrarMensajeVolver);


//para crear la frase con moviento

const phrase = document.getElementById('karate-phrase');

let positionX = 0;
let speed = 2;

function animatePhrase() {

  positionX += speed;

  phrase.style.left = positionX + 'px';

  const containerWidth = document.documentElement.clientWidth;
  const phraseWidth = phrase.clientWidth;

  if (positionX + phraseWidth > containerWidth) {
    positionX = -phraseWidth;
  }

  requestAnimationFrame(animatePhrase);
}
document.addEventListener('DOMContentLoaded', animatePhrase);

  