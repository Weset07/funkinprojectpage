const originalVideos = {
    '#bf': 'images/bfchill.mp4',
    '#gf': 'images/gfchill.mp4',
    '#pico': 'images/picochill.mp4',
    '#nene': 'images/nenechill.mp4',
};

// Lista de videos reemplazantes
const replacementVideos = {
    '#bf': 'images/bfconfirmed.mp4',
    '#gf': 'images/gfconfirmed.mp4',
    '#pico': 'images/picoconfirmed.mp4',
    '#nene': 'images/neneconfirmed.mp4',
};

document.addEventListener('DOMContentLoaded', () => {
    const backgroundSound = new Audio('images/stayFunky.ogg');
    backgroundSound.loop = true;

    const playButton = document.getElementById('play-sound');
    const skipButton = document.getElementById('skip-sound'); // Nuevo botón
    const modal = document.getElementById('modal');

    playButton.addEventListener('click', () => {
        backgroundSound.play()
            .then(() => {
                modal.style.display = 'none'; // Oculta el modal al hacer clic
            })
            .catch(error => {
                console.log('Error al reproducir el audio:', error);
            });
    });

    skipButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Oculta el modal sin reproducir sonido
    });

    const FNFgame = document.getElementById("gameframe");
    FNFgame.addEventListener('load', () => {
        FNFgame.contentWindow.document.addEventListener('click', () => {
            backgroundSound.pause();
        });
    });
});

// Crear un objeto de sonido
const clickSound = new Audio('images/CS_confirm.ogg'); // Asegúrate de que la ruta sea correcta

// Función para precargar videos
function preloadVideos(videoList) {
    Object.values(videoList).forEach(src => {
        const video = document.createElement('video');
        video.src = src;
        video.load(); // Precarga el video
    });
}

// Precargar videos de reemplazo al cargar la página
window.addEventListener('load', () => {
    preloadVideos(replacementVideos);
});

// Selecciona todos los enlaces que contienen videos
const videoLinks = document.querySelectorAll('.contenedor-videos a');

videoLinks.forEach(link => {
    const video = link.querySelector('.video');
    const originalSrc = video.src; // Guarda la ruta original

     // Agregar el evento de clic para reproducir el sonido y navegar
     link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        clickSound.currentTime = 0; // Reiniciar el sonido al inicio
        clickSound.play(); // Reproducir el sonido
        // Esperar un momento para asegurarse de que el sonido se reproduzca antes de navegar
        setTimeout(() => {
            window.location.href = link.getAttribute('href'); // Navegar a la sección correspondiente
        }, 1000); // Duración del efecto de sonido

    });

});