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
    dancers.push(da
