// Set up the Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe0e0e0); // Light gray background

// Set up the Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Set up Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Set up Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a GLTF Loader
const loader = new THREE.GLTFLoader();

// Load the model
loader.load(
    './models/female_base.glb',  // Make sure the path is correct
    (gltf) => {
        console.log('Model Loaded:', gltf);  // Log the loaded model to check if it’s loaded correctly
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Adjust size of the model
        model.position.set(0, 0, 0); // Position model at the origin
        scene.add(model); // Add the model to the scene
    },
    undefined,
    (error) => {
        console.error('Error loading model:', error);
    }
);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Debugging Console Log
console.log('Scene and Renderer successfully initialized.');
