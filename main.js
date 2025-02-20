/* --- Three.js Background Waves --- */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

// Set default dark-mode background for scene
scene.background = new THREE.Color(0x000000);

// Create animated wave plane (using bright blue 0x00ffff)
const geometry = new THREE.PlaneGeometry(100, 100, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  wireframe: true,
  transparent: true,
  opacity: 0.3,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x = -Math.PI / 2;

// Add lights (using bright blue 0x00ffff)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const pointLight = new THREE.PointLight(0x00ffff, 1);
pointLight.position.set(5, 30, 5);
scene.add(ambientLight, pointLight);

// Animate waves
function animateWaves() {
  const positions = plane.geometry.attributes.position.array;
  const time = Date.now() * 0.0003;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    positions[i + 2] =
      Math.sin(x * 0.05 + time) * Math.cos(y * 0.05 + time) * 2;
  }
  plane.geometry.attributes.position.needsUpdate = true;
}

function animate() {
  requestAnimationFrame(animate);
  animateWaves();
  renderer.render(scene, camera);
}
animate();

// Theme Toggle Logic using the switch input
const switchInput = document.querySelector('.switch__input');
const logoImg = document.querySelector('.logo img');

// Set default state to true (dark mode active)
switchInput.checked = true;

switchInput.addEventListener('change', () => {
  if (switchInput.checked) {
    // Dark Mode: When switch is checked, dark mode active.
    document.body.classList.remove('light-mode');
    scene.background = new THREE.Color(0x000000);
    plane.material.color.set(0x00ffff);
    pointLight.color.set(0x00ffff);
    logoImg.src = "./assets/text-branco-sfund.png";
  } else {
    // Light Mode: When unchecked, light mode active.
    document.body.classList.add('light-mode');
    scene.background = new THREE.Color(0xffffff);
    plane.material.color.set(0x0061fc);
    pointLight.color.set(0x0061fc);
    logoImg.src = "./assets/text-preto-sfund.png";
  }
});

// Optional: Handle window resize for Three.js
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
document.addEventListener('DOMContentLoaded', () => {
  // Tab switching for Quem Somos section
  const quemSomosMenu = document.querySelector('#quem-somos .tabs-menu');
  if (quemSomosMenu) {
    const tabButtons = quemSomosMenu.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('#quem-somos .tabs-content .tab-content');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        const tabID = button.getAttribute('data-tab');
        document.querySelector(`#quem-somos .tabs-content #${tabID}`).classList.add('active');
      });
    });
  }

  // Tab switching for Nossos Clientes section
  const nossosClientesMenu = document.querySelector('#nossos-clientes .tabs-menu');
  if (nossosClientesMenu) {
    const tabButtons = nossosClientesMenu.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('#nossos-clientes .tabs-content .tab-content');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        const tabID = button.getAttribute('data-tab');
        document.querySelector(`#nossos-clientes .tabs-content #${tabID}`).classList.add('active');
      });
    });
  }
});

