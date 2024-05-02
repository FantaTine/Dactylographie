// Tableau de mots pour le niveau facile
const easyWords = ["node", "html", "css", "php", "java"];

// Tableau de mots pour le niveau moyen
const mediumWords = ["programmation", "developpement", "javascript", "framework", "codage"];

// Tableau de mots pour le niveau difficile
const hardWords = ["data analytics", "machine learning", "intelligence artificielle", "cybersecurite", "cloud computing"];

// Variables pour stocker le score, le niveau, le mot actuel, le temps restant et le tableau de mots
let score = 0;
let level;
let currentWord;
let countdownTimer;
let remainingTime = 10000; // 30 secondes en millisecondes
let words; // Tableau de mots selon le niveau choisi
let scoreMultiplier = 1; // Multiplicateur de score par défaut

// Fonction pour afficher un nouveau mot
function displayNewWord() {
  // Choisir un mot aléatoire dans le tableau
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];

  // Afficher le mot à l'écran
  document.getElementById("wordDisplay").textContent = currentWord;

  // Réinitialiser le champ de saisie
  document.getElementById("userInput").value = "";

  // Démarrer le compte à rebours
  startCountdown();
}

// Fonction pour vérifier la saisie de l'utilisateur
function checkUserInput() {
  const userInput = document.getElementById("userInput").value;

  if (userInput.toLowerCase() === currentWord.toLowerCase()) {
    // Mot correct
    score += scoreMultiplier; // Utiliser le multiplicateur de score approprié
    updateScoreDisplay();
    remainingTime += 5000; // Ajouter 5 secondes au temps restant
    updateCountdownDisplay();
    displayNewWord(); // Afficher le mot suivant
  } else {
    // Mot incorrect
    if (remainingTime > 5000) {
      remainingTime -= 5000; // Réduire le temps restant de 5 secondes
      updateCountdownDisplay();
    }
  }
}

// Fonction pour mettre à jour l'affichage du score
function updateScoreDisplay() {
  document.getElementById("scoreDisplay").textContent = score;
}

// Fonction pour mettre à jour l'affichage du niveau
function updateLevelDisplay() {
  document.getElementById("levelDisplay").textContent = level;
}

// Fonction pour démarrer le compte à rebours
function startCountdown() {
  // Effacer le compte à rebours précédent s'il existe
  clearInterval(countdownTimer);

  const startTime = Date.now();
  const endTime = startTime + remainingTime;

  countdownTimer = setInterval(() => {
    const currentTime = Date.now();
    remainingTime = endTime - currentTime;
    updateCountdownDisplay();

    if (remainingTime <= 0) {
      clearInterval(countdownTimer);
      endGame();
    }
  }, 100); // Mise à jour toutes les 100 millisecondes
}

// Fonction pour mettre à jour l'affichage du compte à rebours
function updateCountdownDisplay() {
  const seconds = Math.max(Math.floor(remainingTime / 1000), 0);
  document.getElementById("countdownDisplay").textContent = seconds;
}

// Fonction pour terminer le jeu
function endGame() {
  clearInterval(countdownTimer);
  alert(`Game Over ! Votre score est ${score}`);
  resetGame();
}

// Fonction pour réinitialiser le jeu
function resetGame() {
  score = 0;
  level = 1;
  remainingTime = 30000; // Réinitialiser le temps à 30 secondes
  updateScoreDisplay();
  updateLevelDisplay();
  updateCountdownDisplay();
  displayNewWord();
}

// Fonction pour choisir le niveau de difficulté
function chooseDifficultyLevel() {
  const difficultyRadios = document.getElementsByName("difficulty");
  for (const radio of difficultyRadios) {
    if (radio.checked) {
      switch (radio.value) {
        case "easy":
          words = easyWords;
          level = "Facile";
          scoreMultiplier = 2; // Multiplicateur de score pour le niveau facile
          break;
        case "medium":
          words = mediumWords;
          level = "Moyen";
          scoreMultiplier = 4; // Multiplicateur de score pour le niveau moyen
          break;
        case "hard":
          words = hardWords;
          level = "Difficile";
          scoreMultiplier = 6; // Multiplicateur de score pour le niveau difficile
          break;
      }
      updateLevelDisplay();
      resetGame(); // Réinitialiser le jeu lorsque le niveau change
      return;
    }
  }
  alert("Veuillez choisir un niveau de difficulté.");
}

// Événement pour vérifier la saisie de l'utilisateur à chaque saisie
document.getElementById("userInput").addEventListener("input", checkUserInput);

// Événement pour choisir le niveau de difficulté lorsqu'un bouton radio est sélectionné
const difficultyRadios = document.getElementsByName("difficulty");
for (const radio of difficultyRadios) {
  radio.addEventListener("change", chooseDifficultyLevel);
}

// Événement pour réinitialiser le jeu lorsqu'un bouton est cliqué
let isPaused = false; // Nouveau état pour suivre si le jeu est en pause ou non
let pausedTime; // Variable pour stocker le temps lors de la mise en pause

// Fonction pour mettre en pause le jeu
function pauseGame() {
  if (!isPaused) {
    clearInterval(countdownTimer);
    pausedTime = remainingTime;
    isPaused = true;
    document.getElementById("pauseButton").textContent = "Reprendre";
  }
}

// Fonction pour reprendre le jeu
function resumeGame() {
  if (isPaused) {
    remainingTime = pausedTime;
    startCountdown();
    isPaused = false;
    document.getElementById("pauseButton").textContent = "Pause";
  }
}

// Ajouter un gestionnaire d'événement au bouton de pause
document.getElementById("pauseButton").addEventListener("click", function() {
  if (isPaused) {
    resumeGame();
  } else {
    pauseGame();
  }
});