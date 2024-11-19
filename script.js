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

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set the camera position
    camera.position.z = 5;

    // Create a dancer (using a sphere for the head and a cylinder for the body)
    const dancerHeadGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const dancerHeadMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const dancerHead = new THREE.Mesh(dancerHeadGeometry, dancerHeadMaterial);
    dancerHead.position.set(0, 1, 0); // Position the head

    const dancerBodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
    const dancerBodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const dancerBody = new THREE.Mesh(dancerBodyGeometry, dancerBodyMaterial);
    dancerBody.position.set(0, 0, 0); // Position the body

    scene.add(dancerHead);
    scene.add(dancerBody);

    // Add ambient light
    const light = new THREE.AmbientLight(0x404040); // Ambient light
    scene.add(light);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Rotate the dancer
        dancerHead.rotation.y += 0.01;
        dancerBody.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
