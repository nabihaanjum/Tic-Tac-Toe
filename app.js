const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            // Highlight winner
            boxes[a].style.backgroundColor = "#90ee90";
            boxes[b].style.backgroundColor = "#90ee90";
            boxes[c].style.backgroundColor = "#90ee90";
            gameActive = false;
            setTimeout(() => {
                alert(`${boxes[a].innerText} wins!`);
            }, 100);
            return;
        }
    }

    // Check for draw
    const isDraw = [...boxes].every(box => box.innerText !== "");
    if (isDraw && gameActive) {
        gameActive = false;
        setTimeout(() => {
            alert("It's a draw!");
        }, 100);
    }
}

function handleClick(event) {
    const box = event.target;
    if (box.innerText === "" && gameActive) {
        box.innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.backgroundColor = "white";
    });
    currentPlayer = "X";
    gameActive = true;
}

// Add event listeners after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    boxes.forEach(box => box.addEventListener("click", handleClick));
    resetBtn.addEventListener("click", resetGame);
});
