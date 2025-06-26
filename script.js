//Mode sombre/clair avec sauvegarde du choix 
const themeBtn = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('dark');
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙";
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  // Gère les étoiles filantes selon le mode
  if (isDark) {
    startShootingStars();
  } else {
    stopShootingStars();
  }
});

//Création du fond étoilé statique
document.addEventListener('DOMContentLoaded', () => {
  const nbStars = 60; // Change ce nombre si tu veux plus/moins d'étoiles
  const starBg = document.querySelector('.star-bg');
  for(let i = 0; i < nbStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    // Taille random
    const size = Math.random() * 2 + 1.5; // entre 1.5 et 3px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    // Position random
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    // Délai d'anim random pour twinkle décalé
    star.style.animationDelay = `${Math.random() * 3.5}s`;
    // Animation durée random
    star.style.animationDuration = `${2.4 + Math.random()*1.5}s`;
    starBg.appendChild(star);
  }
});

//Etoiles filantes seulement en mode sombre
let shootingStarInterval = null;

function createShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  // Position de départ aléatoire (10 à 60vh)
  star.style.top = `${Math.random() * 50 + 10}vh`;
  star.style.animationDelay = `${Math.random() * 4 + 0.5}s`;
  document.body.appendChild(star);

  // Nettoyage après l’animation
  setTimeout(() => { star.remove(); }, 3500);
}

function startShootingStars() {
  if (shootingStarInterval) return; // Ne pas doubler les intervalles
  shootingStarInterval = setInterval(() => {
    // Ne lance que si dark mode (sécurité)
    if (document.body.classList.contains('dark')) {
      createShootingStar();
    }
  }, Math.random() * 4000 + 2000);
}

function stopShootingStars() {
  clearInterval(shootingStarInterval);
  shootingStarInterval = null;
  // Nettoie toutes les étoiles filantes restantes
  document.querySelectorAll('.shooting-star').forEach(el => el.remove());
}

// Lance au chargement si dark
if (document.body.classList.contains('dark')) {
  startShootingStars();
}

//Fusée animée 
function launchRocket() {
  // Crée le SVG rocket + flamme animée
  const rocket = document.createElement('div');
  rocket.className = 'rocket-svg-anim';
  rocket.innerHTML = `
  <svg width="60" height="60" viewBox="0 0 60 60" style="overflow: visible">
    <!-- Corps de la fusée -->
    <rect x="25" y="10" width="10" height="28" rx="5" fill="#fff" stroke="#c1440e" stroke-width="2"/>
    <!-- Hublot -->
    <circle cx="30" cy="20" r="3.5" fill="#58a6ff" stroke="#111" stroke-width="1"/>
    <!-- Ailettes -->
    <polygon points="25,37 19,46 27,41" fill="#f6d78d" stroke="#c1440e" stroke-width="1"/>
    <polygon points="35,37 41,46 33,41" fill="#f6d78d" stroke="#c1440e" stroke-width="1"/>
    <!-- Flamme animée -->
    <g class="rocket-flame">
      <ellipse cx="30" cy="49" rx="5" ry="10" fill="#ffab63" opacity="0.85">
        <animate attributeName="rx" values="5;6;5" dur="0.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;1;0.7" dur="0.6s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="30" cy="52" rx="2" ry="5" fill="#fff561" opacity="0.75">
        <animate attributeName="rx" values="2;4;2" dur="0.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;1;0.7" dur="0.7s" repeatCount="indefinite"/>
      </ellipse>
    </g>
  </svg>
  `;

  // Position de décollage : bas de l'écran, position horizontale aléatoire
  const leftPercent = Math.random() * 40 + 30;
  rocket.style.left = `${leftPercent}vw`;
  rocket.style.bottom = '-80px'; // Point de départ bas

  // Ajoute dans le conteneur
  document.getElementById('rocket-container').appendChild(rocket);

  // Lance l’animation
  setTimeout(() => {
    rocket.classList.add('launch');
  }, 60);

  // Nettoie après le passage
  setTimeout(() => {
    rocket.remove();
  }, 5200); // Durée de l'animation + marge
}

// Lance une fusée toutes les 15 à 35 secondes, de façon aléatoire
function randomRocketInterval() {
  const delay = Math.random() * 20000 + 15000;
  setTimeout(() => {
    launchRocket();
    randomRocketInterval();
  }, delay);
}
randomRocketInterval();

//Logos animés dans la section compétences 
function animateLogosLoop() {
  const row = document.getElementById('skills-logos-row');
  if (!row) return;
  const logos = Array.from(row.querySelectorAll('img'));
  let index = 0;
  let direction = 1; // 1 = show, -1 = hide

  function showNext() {
    if (index < logos.length) {
      logos[index].classList.add('show');
      index++;
      setTimeout(showNext, 140);
    } else {
      setTimeout(hideNext, 1000); // Pause avant de cacher
    }
  }

  function hideNext() {
    if (index > 0) {
      index--;
      logos[index].classList.remove('show');
      setTimeout(hideNext, 110);
    } else {
      setTimeout(showNext, 900); // Petite pause avant de recommencer
    }
  }

  showNext();
}

document.addEventListener("DOMContentLoaded", animateLogosLoop);

//Menu burger responsive 
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}
