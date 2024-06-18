// Import Three.js components
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Function to create a LEGO brick with studs
function createLegoBrick(brickWidth, brickLength, color) {
    const group = new THREE.Group();

    // Create the main brick body
    const brickHeight = 1; // LEGO brick height is standard
    const geometry = new THREE.BoxGeometry(brickWidth, brickHeight, brickLength);
    const material = new THREE.MeshStandardMaterial({ color });
    const brick = new THREE.Mesh(geometry, material);
    brick.position.y = brickHeight / 2;
    group.add(brick);

    // Create studs on top of the brick
    const studRadius = 0.5;
    const studHeight = 0.2;
    const studGeometry = new THREE.CylinderGeometry(studRadius, studRadius, studHeight, 32);
    const studMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });

    for (let x = 0; x < brickWidth; x++) {
        for (let z = 0; z < brickLength; z++) {
            const stud = new THREE.Mesh(studGeometry, studMaterial);
            stud.position.set(x - brickWidth / 2 + 0.5, brickHeight + studHeight / 2, z - brickLength / 2 + 0.5);
            group.add(stud);
        }
    }

    return group;
}

// Create a LEGO brick
const legoBrick = createLegoBrick(4, 8, 0xFF0000); // Red brick, 4x8 studs
scene.add(legoBrick);

// Set up camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.05; // Damping factor
controls.minDistance = 5; // Minimum zoom distance
controls.maxDistance = 50; // Maximum zoom distance

// Position the camera
camera.position.set(10, 10, 20);
controls.update(); // Ensure controls are updated with the camera position

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

