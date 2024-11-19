window.onload = function() {
    const dancers = document.querySelectorAll('.dancer');

    // Position dancers randomly on the stage
    dancers.forEach((dancer) => {
        const x = Math.random() * (document.getElementById('stage').offsetWidth - 100);
        const y = Math.random() * (document.getElementById('stage').offsetHeight - 200);
        dancer.style.left = `${x}px`;
        dancer.style.top = `${y}px`;
    });
};

// Music functionality remains unchanged
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const uploadMusic = document.getElementById('upload-music');
const currentTimeElem = document.getElementById('current-time');
const totalDurationElem = document.getElementById('total-duration');

uploadMusic.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audio.src = url;
        audio.load();
        audio.addEventListener('loadedmetadata', () => {
            totalDurationElem.textContent = formatTime(audio.duration);
        });
    }
});

playBtn.addEventListener('click', () => audio.play());
pauseBtn.addEventListener('click', () => audio.pause());

audio.addEventListener('timeupdate', () => {
    currentTimeElem.textContent = formatTime(audio.currentTime);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
