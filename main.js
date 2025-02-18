import * as THREE from 'three';

// Initialize scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create animated wave plane
const geometry = new THREE.PlaneGeometry(100, 100, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  wireframe: true,
  transparent: true,
  opacity: 0.3 // Add transparency to the waves
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

plane.rotation.x = -Math.PI / 2;

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const pointLight = new THREE.PointLight(0x00ffff, 1);
pointLight.position.set(5, 30, 5);
scene.add(ambientLight, pointLight);

// Animate waves (slow speed)
function animateWaves() {
  const positions = plane.geometry.attributes.position.array;
  const time = Date.now() * 0.0003; // Slower wave motion
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    positions[i + 2] = Math.sin(x * 0.05 + time) * Math.cos(y * 0.05 + time) * 2; // Slow, smooth waves
  }
  plane.geometry.attributes.position.needsUpdate = true;
}

// Animate scene
function animate() {
  requestAnimationFrame(animate);
  animateWaves();
  renderer.render(scene, camera);
}
animate();

// Fade-in sections on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(element => observer.observe(element));

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
