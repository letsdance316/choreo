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
    document.body.appendChild(renderer.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set the camera position
    camera.position.z = 10;

    // Create a dancer (using a simple sphere and cylinder for now)
    const dancerGeometry = new THREE.SphereGeometry(0.5, 16, 16); // Head of the dancer
    const dancerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const dancerHead = new THREE.Mesh(dancerGeometry, dancerMaterial);
    dancerHead.position.set(0, 2, 0); // Position the head above the body

    const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2); // Body of the dancer
    const body = new THREE.Mesh(bodyGeometry, dancerMaterial);
    body.position.set(0, 0, 0); // Position the body

    scene.add(dancerHead);
    scene.add(body);

    // Add light
    const light = new THREE.AmbientLight(0x404040); // Ambient light
    scene.add(light);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the cube and dancer for demo purposes
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        
        dancerHead.rotation.y += 0.01; // Rotate the head
        body.rotation.y += 0.01; // Rotate the body

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
