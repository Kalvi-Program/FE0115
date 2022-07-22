let userScore = 0;
let compScore = 0;
const userScoreElement = document.querySelector(".user-score");
const compScoreElement = document.querySelector(".comp-score");
const scoreboardData = document.querySelector(".table-body");
const scoreboard = document.querySelector(".score-table");
const caution = document.querySelector(".no-round");
const result_div = document.querySelector(".result");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissor_div = document.getElementById("scissor");
const result = [];

function takeComputerChoice() {
  const choice = ["r", "p", "s"];
  const randomNo = Math.floor(Math.random() * 3);
  return choice[randomNo];
}

function convert(letter) {
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  if (letter === "s") return "Scissor";
}

function win(userChoice, computerChoice) {
  userScore++;
  userScoreElement.innerText = userScore;
  compScoreElement.innerText = compScore;
  result_div.innerHTML = `${convert(userChoice)} beats ${convert(
    computerChoice
  )}!`;
  if (userScore === 5) {
    alert("You nailed this round! Next round is starting...");
    userScore = 0;
    compScore = 0;
    result.push("Won");
    updateScoreboard();
  }
}

function lose(userChoice, computerChoice) {
  compScore++;
  userScoreElement.innerText = userScore;
  compScoreElement.innerText = compScore;
  result_div.innerHTML = `${convert(userChoice)} loses to ${convert(
    computerChoice
  )}.`;
  if (compScore === 5) {
    alert("Better luck next time! Next round is starting...");
    userScore = 0;
    compScore = 0;
    result.push("Lost");
    updateScoreboard();
  }
}

function tie(userChoice, computerChoice) {
  userScoreElement.innerHTML = userScore;
  compScoreElement.innerHTML = compScore;
  result_div.innerHTML = `${convert(userChoice)} equals ${convert(
    computerChoice
  )}.`;
}

function game(userChoice) {
  const computerChoice = takeComputerChoice();
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;

    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;

    case "rr":
    case "pp":
    case "ss":
      tie(userChoice, computerChoice);
      break;
  }
}

function updateScoreboard() {
  if (result.length !== 0) {
    caution.style.display = "none";
    scoreboard.style.display = "table";
  } else {
    scoreboard.style.display = "none";
  }
  scoreboardData.innerHTML = "";
  for (let i = 0; i < result.length; i++) {
    const row = document.createElement(`tr`);
    const rowdata = `
      <td height="50">Round - ${i + 1}</td>
      <td height="50">${result[i]}</td>`;
    row.innerHTML = rowdata;
    console.log(row);
    scoreboardData.appendChild(row);
  }
}

rock_div.addEventListener("click", function () {
  game("r");
});

paper_div.addEventListener("click", function () {
  game("p");
});

scissor_div.addEventListener("click", function () {
  game("s");
});

updateScoreboard();
