// Select DOM elements
const stage = document.getElementById("stage");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const audioInput = document.getElementById("audioInput");

// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new
