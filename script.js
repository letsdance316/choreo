// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xD3D3D3); // Light grey background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Ground Plane (Stage)
const stageGeometry = new THREE.PlaneGeometry(10, 10);
const stageMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const stage = new THREE.Mesh(stageGeometry, stageMaterial);
stage.rotation.x = -Math.PI / 2;
scene.add(stage);

// Load the Model
const loader = new THREE.GLTFLoader();
let dancers = [];

function addDancer() {
    loader.load(
        './models/female_base.glb',
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5); // Adjust size
            model.position.set(0, 0, 0); // Initial position
            scene.add(model);
            dancers.push(model);
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
        }
    );
}

// Add UI Functionality
document.getElementById('addDancer').addEventListener('click', () => {
    addDancer();
});

document.getElementById('changeClothes').addEventListener('click', () => {
    dancers.forEach((dancer) => {
        dancer.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(Math.random() * 0xffffff); // Random color for clothes
            }
        });
    });
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
