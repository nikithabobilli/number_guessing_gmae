let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const guessInput = document.getElementById("userGuess");
  const result = document.getElementById("resultMessage");
  const attemptsDisplay = document.getElementById("attemptCount");

  let userGuess = Number(guessInput.value);
  if (!userGuess || userGuess < 1 || userGuess > 100) {
    result.innerHTML = "⛔ Enter a valid number between 1 and 100!";
    result.style.color = "#ff5555";
    return;
  }

  attempts++;

  if (userGuess === secretNumber) {
    result.innerHTML = `🎉 Correct! The number was ${secretNumber}.`;
    result.style.color = "#42e695";
    attemptsDisplay.innerHTML = `You guessed it in ${attempts} attempt(s)!`;

    // Ask for name and save score
    setTimeout(() => {
      let playerName = prompt("🎖️ Congrats! Enter your name for the leaderboard:");
      if (playerName) {
        saveToLeaderboard(playerName, attempts);
        showLeaderboard();
      }
    }, 500);
  } else if (userGuess < secretNumber) {
    result.innerHTML = "📈 Too low! Try a higher number.";
    result.style.color = "#ff9f43";
  } else {
    result.innerHTML = "📉 Too high! Try a lower number.";
    result.style.color = "#ff9f43";
  }

  attemptsDisplay.innerHTML = `Attempts: ${attempts}`;
  guessInput.value = "";
  guessInput.focus();
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("userGuess").value = "";
  document.getElementById("resultMessage").innerHTML = "";
  document.getElementById("attemptCount").innerHTML = "";
}

function saveToLeaderboard(name, score) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name: name, score: score });

  // Sort by least attempts
  leaderboard.sort((a, b) => a.score - b.score);

  // Limit to top 5
  if (leaderboard.length > 5) leaderboard = leaderboard.slice(0, 5);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById("leaderboardList");
  list.innerHTML = "";

  if (leaderboard.length === 0) {
    list.innerHTML = "<li>No scores yet!</li>";
  } else {
    leaderboard.forEach(player => {
      const li = document.createElement("li");
      li.textContent = `${player.name} - ${player.score} attempt(s)`;
      list.appendChild(li);
    });
  }

  document.getElementById("leaderboardContainer").style.display = "block";
}
