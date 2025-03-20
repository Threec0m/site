import "./styles.css";

// --- Three.js Background Waves ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
scene.background = new THREE.Color(0x000000);

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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const pointLight = new THREE.PointLight(0x00ffff, 1);
pointLight.position.set(5, 30, 5);
scene.add(ambientLight, pointLight);

function animateWaves() {
  const positions = plane.geometry.attributes.position.array;
  const time = Date.now() * 0.0003;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    positions[i + 2] = Math.sin(x * 0.05 + time) * Math.cos(y * 0.05 + time) * 2;
  }
  plane.geometry.attributes.position.needsUpdate = true;
}

function animate() {
  requestAnimationFrame(animate);
  animateWaves();
  renderer.render(scene, camera);
}
animate();

// --- Theme Toggle Logic ---
const switchInput = document.querySelector(".switch__input");
const logoImg = document.querySelector(".logo img");

switchInput.checked = true;

switchInput.addEventListener("change", () => {
  if (switchInput.checked) {
    document.body.classList.remove("light-mode");
    scene.background = new THREE.Color(0x000000);
    plane.material.color.set(0x00ffff);
    pointLight.color.set(0x00ffff);
    logoImg.src = "assets/trica.png";
  } else {
    document.body.classList.add("light-mode");
    scene.background = new THREE.Color(0xffffff);
    plane.material.color.set(0x0061fc);
    pointLight.color.set(0x0061fc);
    logoImg.src = "assets/trica.png";
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Tabs Switching Logic for Quem Somos & Nossos Clientes ---
document.addEventListener("DOMContentLoaded", () => {
  function setupTabs(containerSelector) {
    const menu = document.querySelector(`${containerSelector} .tabs-menu`);
    if (menu) {
      const tabButtons = menu.querySelectorAll(".tab-button");
      const tabContents = document.querySelectorAll(
        `${containerSelector} .tabs-content .tab-content`
      );
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          tabButtons.forEach((btn) => btn.classList.remove("active"));
          tabContents.forEach((content) => content.classList.remove("active"));
          button.classList.add("active");
          const tabID = button.getAttribute("data-tab");
          document
            .querySelector(`${containerSelector} .tabs-content #${tabID}`)
            .classList.add("active");
        });
      });
    }
  }
  setupTabs("#quem-somos");
  setupTabs("#nossos-clientes");
});

// --- Navigation Scroll Offset ---
document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = anchor.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = document.querySelector(".site-header").offsetHeight + 20;
      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: "smooth",
      });
    }
  });
});

// --- Service Quote Modal & WhatsApp Integration ---
document.addEventListener("DOMContentLoaded", () => {
  const isDesktop = !window.matchMedia("(max-width: 768px)").matches;
  if (isDesktop) {
    const modal = document.getElementById("serviceModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalYes = document.getElementById("modalYes");
    const modalNo = document.getElementById("modalNo");
    const closeModal = document.getElementById("closeModal");

    // Use new class names for Planos carousel items and titles
    const serviceCards = document.querySelectorAll(".planos-carousel-item");
    serviceCards.forEach((card) => {
      card.addEventListener("click", () => {
        const titleElement = card.querySelector(".plano-title");
        const serviceName = titleElement
          ? titleElement.innerText.trim()
          : "Serviço";
        modalMessage.textContent = `Quer saber mais sobre ${serviceName}?`;
        modal.setAttribute("data-service", serviceName);
        modal.style.display = "block";
      });
    });

    document.querySelector('.zapBtn').addEventListener('click', () => {
      const phoneNumber = "5515998531707"; // Replace with your number
      const message = "Olá! Gostaria de saber mais sobre os serviços da Threecom.";
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    });

    modalYes.addEventListener("click", () => {
      const serviceName = modal.getAttribute("data-service") || "Serviço";
      const phoneNumber = "5515998531707";
      const text = `Olá! Gostaria de um orçamento para um serviço de ${serviceName}.`;
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
      window.open(whatsappURL, "_blank");
      modal.style.display = "none";
    });

    modalNo.addEventListener("click", () => {
      modal.style.display = "none";
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});
document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  
  if (!name || !email || !message) {
    alert("Por favor, preencha todos os campos antes de enviar.");
    return;
  }
  
  const subject = encodeURIComponent("Contato via Site Threecom");
  const body = encodeURIComponent(`Olá, meu nome é ${name}.\n\nVenho Do site da threecom.com.br\n${message}`);
  
  // This will open the user's default email client
  window.location.href = `mailto:comercial@threecom.com.br?subject=${subject}&body=${body}`;
});


// --- Mobile Navigation Toggle ---
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});
