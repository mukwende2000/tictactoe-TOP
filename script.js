const tiles = [...document.querySelectorAll(".tile")];
const winMessage = document.querySelector(".win-message");
const winnerElement = document.querySelector(".winner");
const restartBtn = document.querySelector(".restart-btn");
const player = humanPlayer();
const computer = computerPlayer();
let marker = "X";

function humanPlayer() {
  const play = (target) => {
    if (target.textContent) return;
    target.textContent = marker;
    gamePlay.checkWin();
    marker = "O";
    tiles.splice(tiles.indexOf(target), 1);
    computer.play(tiles);
  };
  return { play };
}

function computerPlayer() {
  const _getRandomNumber = () => Math.floor(Math.random() * tiles.length);
  const play = (target) => {
    if (tiles.every((tile) => tile.textContent)) return;
    const randomNumber = _getRandomNumber();

    target[randomNumber].textContent = marker;
    gamePlay.checkWin();
    marker = "X";
    tiles.splice(tiles.indexOf(tiles[randomNumber]), 1);
  };
  return { play };
}

const gamePlay = (function gameBoard() {
  const _winningConditions = [
    [tiles[0], tiles[1], tiles[2]],
    [tiles[3], tiles[4], tiles[5]],
    [tiles[6], tiles[7], tiles[8]],
    [tiles[0], tiles[3], tiles[6]],
    [tiles[1], tiles[4], tiles[7]],
    [tiles[2], tiles[5], tiles[8]],
    [tiles[0], tiles[4], tiles[8]],
    [tiles[2], tiles[4], tiles[6]],
  ];
  const checkWin = () => {
    const winner = _winningConditions.some((conditions) =>
    conditions.every((condition) => condition.textContent === marker)
    );
    if (winner) {
      winnerElement.textContent = marker;
      winMessage.style.display = "block";
      return true;
    } else if(_winningConditions.every((conditions) =>
    conditions.every((condition) => condition.textContent)
    )) {
      winMessage.children[0].textContent = 'Its a tie'
      winMessage.style.display = "block";
    }
  };
  const restart = () => location.reload();
  return { checkWin, restart };
})()

tiles.forEach((tile) => {
  tile.addEventListener(
    "click",
    (e) => {
      player.play(e.target);
    },
    { once: true }
  );
});
restartBtn.addEventListener("click", () => gamePlay.restart());
