// Select DOM elements
const stage = document.getElementById("stage");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const audioInput = document.getElementById("audioInput");

// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
stage.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Position the camera
camera.position.z = 5;

// Function to create a humanoid dancer
function createDancer(x, y, z, color = 0x00ff00) {
    const group = new THREE.Group();

    // Create body parts using geometric shapes
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshStandardMaterial({ color }));
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.2, 16), new THREE.MeshStandardMaterial({ color }));
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16), new THREE.MeshStandardMaterial({ color }));
    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16), new THREE.MeshStandardMaterial({ color }));
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.6, 16), new THREE.MeshStandardMaterial({ color }));
    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.6, 16), new THREE.MeshStandardMaterial({ color }));

    // Position body parts
    head.position.set(0, 1.6, 0);
    torso.position.set(0, 0.8, 0);
    leftLeg.position.set(-0.2, 0, 0);
    rightLeg.position.set(0.2, 0, 0);
    leftArm.position.set(-0.4, 1.1, 0);
    rightArm.position.set(0.4, 1.1, 0);

    leftLeg.rotation.z = Math.PI / 10;
    rightLeg.rotation.z = -Math.PI / 10;

    // Add body parts to the group
    group.add(head, torso, leftLeg, rightLeg, leftArm, rightArm);

    // Set position of the dancer
    group.position.set(x, y, z);

    // Add light for visibility
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(x, y + 2, z);
    scene.add(light);

    // Add the dancer to the scene
    scene.add(group);

    return group;
}

// Add dancers to the stage
const dancer1 = createDancer(0, 0, 0);
const dancer2 = createDancer(2, 0, 0, 0xff0000);
const dancer3 = createDancer(-2, 0, 0, 0x0000ff);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
