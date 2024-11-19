if (typeof THREE === 'undefined') {
    alert('Error: THREE.js is not loaded!');
} else {
    console.log('THREE.js loaded successfully');

    // Create the scene
    const scene = new THREE.Scene();

    // Change background color to light blue
    scene.background = new THREE.Color(0x87CEEB); // Light blue

    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('stage').appendChild(renderer.domElement);

    // Set the camera position to view the dancer clearly
    camera.position.z = 10;

    // Create a humanoid dancer
    const dancer = new THREE.Group();

    // Head (Sphere)
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 2, 0); // Position the head above the body
    dancer.add(head);

    // Torso (Capsule-like shape using a stretched sphere)
    const torsoGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const torsoMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.scale.set(1, 2, 1); // Make it taller (like a torso)
    torso.position.set(0, 1, 0); // Position the torso below the head
    dancer.add(torso);

    // Legs (Cylinder shapes for thighs and lower legs)
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
    const legMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });

    const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.position.set(-0.3, 0, 0); // Left leg
    dancer.add(leg1);

    const leg2 = new THREE.Mesh(legGeometry, legMaterial);
    leg2.position.set(0.3, 0, 0); // Right leg
    dancer.add(leg2);

    // Arms (Cylinder shapes for arms)
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    const armMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });

    const arm1 = new THREE.Mesh(armGeometry, armMaterial);
    arm1.position.set(-1, 1.5, 0); // Left arm
    arm1.rotation.z = Math.PI / 4; // Rotate the arm slightly
    dancer.add(arm1);

    const arm2 = new THREE.Mesh(armGeometry, armMaterial);
    arm2.position.set(1, 1.5, 0); // Right arm
    arm2.rotation.z = -Math.PI / 4; // Rotate the arm slightly
    dancer.add(arm2);

    // Add the dancer group to the scene
    scene.add(dancer);

    // Add ambient light to the scene
    const light = new THREE.AmbientLight(0x404040); // Soft ambient light
    scene.add(light);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the dancer to give some animation
        dancer.rotation.y += 0.01; // Rotate the whole dancer group
        dancer.rotation.x += 0.005; // Slightly rotate the dancer for some variety

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resizing to keep the scene responsive
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
