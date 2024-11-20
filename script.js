// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the music
const listener = new THREE.AudioListener();
camera.add(listener);

const audio = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('your-music-file.mp3', (buffer) => {
    audio.setBuffer(buffer);
    audio.setLoop(true);
    audio.setVolume(0.5);
});

// Set up the humanoid figure (simple 3D model)
const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32); // Torso
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 1.5;

const headGeometry = new THREE.SphereGeometry(0.75, 32, 32); // Head
const headMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 3.75;

const legGeometry = new THREE.CylinderGeometry(0.25, 0.25, 2, 32); // Legs
const legMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const leg1 = new THREE.Mesh(legGeometry, legMaterial);
const leg2 = new THREE.Mesh(legGeometry, legMaterial);

leg1.position.y = 0.5;
leg2.position.y = 0.5;
leg1.position.x = -0.5;
leg2.position.x = 0.5;

scene.add(body, head, leg1, leg2);

// Set the camera position
camera.position.z = 5;

// Music controls (Play and Pause)
const playButton = document.createElement('button');
playButton.innerText = 'Play Music';
playButton.id = 'play-button';
document.body.appendChild(playButton);

const pauseButton = document.createElement('button');
pauseButton.innerText = 'Pause Music';
pauseButton.id = 'pause-button';
document.body.appendChild(pauseButton);

const addDancerButton = document.createElement('button');
addDancerButton.innerText = 'Add Dancer';
addDancerButton.id = 'add-dancer-button';
document.body.appendChild(addDancerButton);

// Play and pause music event listeners
playButton.addEventListener('click', () => {
    if (audio.context.state === 'suspended') {
        audio.context.resume().then(() => {
            audio.play();
        });
    } else {
        audio.play();
    }
});

pauseButton.addEventListener('click', () => {
    audio.pause();
});

// Add dancer functionality
addDancerButton.addEventListener('click', () => {
    console.log("Add dancer button clicked");
    // You can add more dancers to the scene here
    const newDancer = body.clone();
    scene.add(newDancer);
    newDancer.position.x = Math.random() * 2 - 1;
    newDancer.position.z = Math.random() * 2 - 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // Rotate the humanoid figure (and new dancers if any)
    body.rotation.x += 0.01;
    body.rotation.y += 0.01;

    // Update the position of any new dancers
    scene.children.forEach(child => {
        if (child !== body && child !== head && child !== leg1 && child !== leg2) {
            child.rotation.x += 0.01;
            child.rotation.y += 0.01;
        }
    });
}

animate();
