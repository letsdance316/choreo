// Script for stick figure dancers and syncing moves with music

window.onload = function() {
    const dancers = document.querySelectorAll('.dancer');

    // Function to place dancers randomly on the stage
    dancers.forEach(dancer => {
        const x = Math.random() * (document.getElementById('stage').offsetWidth - 50);
        const y = Math.random() * (document.getElementById('stage').offsetHeight - 100);

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

// Moves to sync
const moves = [
    { time: 2, dancer: 'dancer1', move: 'jump' },
    { time: 5, dancer: 'dancer2', move: 'spin' },
];

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

    // Execute moves at specific times
    moves.forEach(({ time, dancer, move }) => {
        if (Math.floor(audio.currentTime) === time) {
            performMove(dancer, move);
        }
    });
});

// Perform a move
function performMove(dancerId, move) {
    const dancer = document.getElementById(dancerId);
    if (move === 'jump') {
        dancer.style.transform = 'translateY(-50px)';
        setTimeout(() => dancer.style.transform = '', 500);
    } else if (move === 'spin') {
        dancer.style.animation = 'spin 1s linear';
        setTimeout(() => dancer.style.animation = '', 1000);
    }
}

// Add a spin animation in CSS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
