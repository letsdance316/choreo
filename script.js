// Basic Three.js Setup
const stage = document.getElementById("stage");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, stage.clientWidth / stage.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(stage.clientWidth, stage.clientHeight);
stage.appendChild(renderer.domElement);

// Create a floor (stage)
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Camera Position
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Dancers Array
const dancers = [];

// Function to Create a New Dancer
function createDancer() {
    const dancerGeometry = new THREE.SphereGeometry(0.5, 16, 16); // Placeholder for a dancer
    const dancerMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const dancer = new THREE.Mesh(dancerGeometry, dancerMaterial);
    dancer.position.set(Math.random() * 8 - 4, 0.5, Math.random() * 8 - 4); // Random position on the stage
    dancers.push(dancer);
    scene.add(dancer);
}

// Add Dancer Button
document.getElementById("addDancer").addEventListener("click", () => {
    createDancer();
});

// Music Functionality
let audio, audioContext, audioSource, analyser, dataArray;

document.getElementById("audioFile").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        audio = new Audio(URL.createObjectURL(file));
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioSource = audioContext.createMediaElementSource(audio);

        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    }
});

document.getElementById("playMusic").addEventListener("click", () => {
    if (audio) {
        audio.play();
        animateDancers();
    }
});

// Sync Dancers with Music
function animateDancers() {
    if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        dancers.forEach((dancer, index) => {
            const scale = dataArray[index % dataArray.length] / 128.0;
            dancer.scale.set(scale, scale, scale); // Scale dancer based on music data
        });
    }

    // Update the current time display
    if (audio) {
        const currentTimeDisplay = document.getElementById("currentTime");
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        currentTimeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    if (audio && !audio.paused) {
        requestAnimationFrame(animateDancers);
    }
}

// Animation Loop for Three.js
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
