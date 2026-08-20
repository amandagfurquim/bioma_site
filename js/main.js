const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
  // Se o autoplay for bloqueado (ex: Modo de Economia de Bateria ou dados móveis lentos)
  heroVideo.play().catch(() => {
    heroVideo.style.display = 'none';
  });

  // Se o arquivo de vídeo falhar/dar erro de carregamento
  heroVideo.addEventListener('error', () => {
    heroVideo.style.display = 'none';
  });
}

// --- LÓGICA DO CARROSSEL 3D DE SERVIÇOS ---
const cards = document.querySelectorAll('.service-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 1; // Inicia no card 2 (Marca) centralizado

function updateCarousel() {
  cards.forEach((card, index) => {
    card.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');

    if (index === currentIndex) {
      card.classList.add('active');
    } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
      card.classList.add('prev');
    } else if (index === (currentIndex + 1) % cards.length) {
      card.classList.add('next');
    } else if (index < currentIndex) {
      card.classList.add('hidden-left');
    } else {
      card.classList.add('hidden-right');
    }
  });
}

// Clique nas setas
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
});

// Clique direto nos cards laterais para centralizar
cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

// Inicializa a posição dos cards
updateCarousel();

// --- LÓGICA DE CLIQUE NOS CARDS ODS ---
const odsCards = document.querySelectorAll('.ods-card');

odsCards.forEach(card => {
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Se clicar no card que já tá ativo, ele fecha
    const isActive = card.classList.contains('is-active');
    
    // Fecha todos os outros cards abertos
    odsCards.forEach(c => c.classList.remove('is-active'));

    // Se não estava ativo, ativa o atual
    if (!isActive) {
      card.classList.add('is-active');
    }
  });
});

// Clicar fora de qualquer card fecha o card aberto
document.addEventListener('click', () => {
  odsCards.forEach(c => c.classList.remove('is-active'));
});