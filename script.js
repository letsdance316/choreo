if (typeof THREE === 'undefined') {
    alert('Error: THREE.js is not loaded!');
} else {
    console.log('THREE.js loaded successfully');

    // Create the scene
    const scene = new THREE.Scene();

    // Change background color to light blue
    scene.background = new THREE.Color(0x87CEEB); // Light blue background

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
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 }); // Yellow head
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 2, 0); // Position the head above the body
    dancer.add(head);

    // Torso (Capsule-like shape using a stretched sphere)
    const torsoGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const torsoMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF }); // Blue torso
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.scale.set(1, 2, 1); // Make it taller (like a torso)
    torso.position.set(0, 1, 0); // Position the torso below the head
    dancer.add(torso);

    // Legs (Cylinder shapes for thighs and lower legs)
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
    const legMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF }); // Blue legs

    const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.position.set(-0.3, 0, 0); // Left leg
    dancer.add(leg1);

    const leg2 = new THREE.Mesh(legGeometry, legMaterial);
    leg2.position.set(0.3, 0, 0); // Right leg
    dancer.add(leg2);

    // Arms (Cylinder shapes for arms)
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
    const armMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF }); // Blue arms

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

    // Set up the music
    let audio = new Audio();
    let audioDuration = 0;
    let isPlaying = false;

    // Get DOM elements
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');

    // Handle file input to load audio
    document.getElementById('audioFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            audio.src = url;
            audio.load();
            audio.addEventListener('loadedmetadata', () => {
                audioDuration = audio.duration;
                durationSpan.innerText = formatTime(audioDuration);
            });
        }
    });

    // Play audio
    playButton.addEventListener('click', () => {
        if (audio.src) {
            audio.play();
            isPlaying = true;
        }
    });

    // Pause audio
    pauseButton.addEventListener('click', () => {
        audio.pause();
        isPlaying = false;
    });

    // Format time as mm:ss
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }

    // Update time display and sync dance moves
    function update() {
        if (isPlaying && audio.currentTime !== undefined) {
            currentTimeSpan.innerText = formatTime(audio.currentTime);
        }

        // Example of syncing dancer's movements with music
        if (audio.currentTime >= 5 && audio.currentTime < 10) {
            dancer.rotation.y = Math.sin(audio.currentTime); // Rotate dancer between 5s and 10s
        }

        renderer.render(scene, camera);
        requestAnimationFrame(update);
    }

    update();

    // Handle window resizing to keep the scene responsive
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
