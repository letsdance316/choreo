// Create a basic stage setup with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple floor (a flat plane for the dancer to stand on)
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;  // Rotate to make it flat
scene.add(floor);

// Create a humanoid dancer (head, torso, arms, legs)

const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffc0cb });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.set(0, 2, 0);
scene.add(head);

const torsoGeometry = new THREE.BoxGeometry(1, 2, 0.5);
const torsoMaterial = new THREE.MeshBasicMaterial({ color: 0x87cefa });
const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
torso.position.set(0, 0, 0);
scene.add(torso);

const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5);
const armMaterial = new THREE.MeshBasicMaterial({ color: 0xadd8e6 });
const leftArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.rotation.z = Math.PI / 2;
leftArm.position.set(-1, 1, 0);
scene.add(leftArm);

const rightArm = new THREE.Mesh(armGeometry, armMaterial);
rightArm.rotation.z = Math.PI / 2;
rightArm.position.set(1, 1, 0);
scene.add(rightArm);

const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2);
const legMaterial = new THREE.MeshBasicMaterial({ color: 0x228b22 });
const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
leftLeg.position.set(-0.5, -2, 0);
scene.add(leftLeg);

const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
rightLeg.position.set(0.5, -2, 0);
scene.add(rightLeg);

const footGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.2);
const footMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
leftFoot.position.set(-0.5, -3, 0);
scene.add(leftFoot);

const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
rightFoot.position.set(0.5, -3, 0);
scene.add(rightFoot);

// Position the camera to view the scene
camera.position.z = 5;

// Music setup (Add your music file in the project directory)
const listener = new THREE.AudioListener();
camera.add(listener);

const audio = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('your-music-file.mp3', (buffer) => {
    audio.setBuffer(buffer);
    audio.setLoop(true);
    audio.setVolume(0.5);
});

// Create play/pause buttons for the music
const playButton = document.createElement('button');
playButton.innerText = 'Play Music';
playButton.style.position = 'absolute';
playButton.style.top = '10px';
playButton.style.left = '10px';
document.body.appendChild(playButton);

const pauseButton = document.createElement('button');
pauseButton.innerText = 'Pause Music';
pauseButton.style.position = 'absolute';
pauseButton.style.top = '40px';
pauseButton.style.left = '10px';
document.body.appendChild(pauseButton);

playButton.addEventListener('click', () => {
    audio.play();
});

pauseButton.addEventListener('click', () => {
    audio.pause();
});

// Render loop to animate the scene
function animate() {
    requestAnimationFrame(animate);

    // You can add animations here (e.g., rotate the dancer's arms or legs)
    
    renderer.render(scene, camera);
}

animate();
