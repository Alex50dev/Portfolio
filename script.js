// Mode sombre/clair avec sauvegarde du choix
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
});

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
