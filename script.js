if (typeof THREE === 'undefined') {
    alert('Error: THREE.js is not loaded!');
} else {
    console.log('THREE.js loaded successfully');

    // Create the scene
    const scene = new THREE.Scene();

    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('stage').appendChild(renderer.domElement);

    // Create a cube (Positioned further back so it doesn't overlap with the dancer)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(3, 0, -5); // Move the cube to the side and slightly back
    scene.add(cube);

    // Set the camera position to see both the dancer and the cube
    camera.position.z = 10;

    // Create a dancer (Head as a sphere, body as a cylinder)
    const dancerHeadGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const dancerHeadMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const dancerHead = new THREE.Mesh(dancerHeadGeometry, dancerHeadMaterial);
    dancerHead.position.set(0, 2, 0); // Position the head above the body

    const dancerBodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
    const dancerBodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const dancerBody = new THREE.Mesh(dancerBodyGeometry, dancerBodyMaterial);
    dancerBody.position.set(0, 0, 0); // Position the body

    scene.add(dancerHead);
    scene.add(dancerBody);

    // Add ambient light to the scene
    const light = new THREE.AmbientLight(0x404040); // Soft ambient light
    scene.add(light);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Rotate the dancer's body and head for some animation
        dancerHead.rotation.y += 0.01;
        dancerBody.rotation.y += 0.01;

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
