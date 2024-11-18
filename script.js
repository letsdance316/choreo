// Script for dancer placement and music player

window.onload = function() {
    const dancers = document.querySelectorAll('.dancer');

    // Function to place dancers randomly on the stage
    dancers.forEach(dancer => {
        const x = Math.random() * (document.getElementById('stage').offsetWidth - 50);
        const y = Math.random() * (document.getElementById('stage').offsetHeight - 50);

        dancer.style.left = `${x}px`;
        dancer.style.top = `${y}px`;
    });
};

// Music player functionality
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const uploadMusic = document.getElementById('upload-music');
const currentTimeElem = document.getElementById('current-time');
const totalDurationElem = document.getElementById('total-duration');

// Load uploaded audio file
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

// Play and pause functionality
playBtn.addEventListener('click', () => audio.play());
pauseBtn.addEventListener('click', () => audio.pause());

// Update current time
audio.addEventListener('timeupdate', () => {
    currentTimeElem.textContent = formatTime(audio.currentTime);
});

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
