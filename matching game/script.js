let emojis = ["🥕", "🤯", "🐇", "🌟", "👀", "🎵"];
let cards = [];
let firstCard = null;
let lockBoard = false;
let matchedCount = 0;

const board = document.getElementById("gameBoard");
const winMessage = document.getElementById("winMessage");

function createBoard() {
  board.innerHTML = "";
  winMessage.style.display = "none";
  cards = [...emojis, ...emojis];
  cards.sort(() => 0.5 - Math.random());
  matchedCount = 0;
  firstCard = null;
  lockBoard = false;

  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    board.appendChild(card);

    card.addEventListener("click", () => {
      if (lockBoard || card.classList.contains("revealed") || card.classList.contains("matched")) return;

      card.textContent = emoji;
      card.classList.add("revealed");

      if (!firstCard) {
        firstCard = card;
      } else {
        lockBoard = true;
        if (firstCard.dataset.emoji === card.dataset.emoji) {
          firstCard.classList.add("matched");
          card.classList.add("matched");
          matchedCount++;
          if (matchedCount === emojis.length) {
            winMessage.style.display = "block";
          }
          firstCard = null;
          lockBoard = false;
        } else {
          setTimeout(() => {
            firstCard.textContent = "";
            card.textContent = "";
            firstCard.classList.remove("revealed");
            card.classList.remove("revealed");
            firstCard = null;
            lockBoard = false;
          }, 1000);
        }
      }
    });
  });
}

function restartGame() {
  createBoard();
}

// เริ่มเกมครั้งแรก
createBoard();