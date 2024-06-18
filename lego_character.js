// Import Three.js components
import * as THREE from 'three';

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

// Function to create a LEGO character part
function createBox(x, y, z, color) {
    const geometry = new THREE.BoxGeometry(x, y, z);
    const material = new THREE.MeshStandardMaterial({ color });
    return new THREE.Mesh(geometry, material);
}

// Create head
const head = createBox(2, 2, 2, 0xFFD700); // Yellow color
head.position.set(0, 5, 0);
scene.add(head);

// Create torso
const torso = createBox(3, 4, 2, 0x0000FF); // Blue color
torso.position.set(0, 2.5, 0);
scene.add(torso);

// Create arms
const leftUpperArm = createBox(1, 3, 1, 0x0000FF); // Blue upper part
leftUpperArm.position.set(-2, 3.5, 0);
scene.add(leftUpperArm);

const leftLowerArm = createBox(1, 1, 1, 0xFFD700); // Yellow lower part
leftLowerArm.position.set(-2, 1.5, 0);
scene.add(leftLowerArm);

const rightUpperArm = createBox(1, 3, 1, 0x0000FF); // Blue upper part
rightUpperArm.position.set(2, 3.5, 0);
scene.add(rightUpperArm);

const rightLowerArm = createBox(1, 1, 1, 0xFFD700); // Yellow lower part
rightLowerArm.position.set(2, 1.5, 0);
scene.add(rightLowerArm);

// Create legs
const leftLeg = createBox(1, 3, 1, 0x000000); // Black color
leftLeg.position.set(-1, -1, 0);
scene.add(leftLeg);

const rightLeg = createBox(1, 3, 1, 0x000000); // Black color
rightLeg.position.set(1, -1, 0);
scene.add(rightLeg);

// Position the camera
camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    head.rotation.y += 0.01; // Rotate head
    renderer.render(scene, camera);
}

animate();

