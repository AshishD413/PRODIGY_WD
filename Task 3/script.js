// script.js
const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
let currentPlayer = '1';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Create the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

// Function to handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.dataset.index;

    if (boardState[cellIndex] === '' && gameActive) {
        boardState[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer);

        // Check for a win
        if (checkWin(currentPlayer)) {
            message.textContent = `Player ${currentPlayer} wins!!!`;
            gameActive = false;
        } else if (boardState.includes('')) {
            currentPlayer = currentPlayer === '1' ? '2' : '1';
            message.textContent = `Player ${currentPlayer}'s turn`;
        } else {
            message.textContent = "It's a draw!";
            gameActive = false;
        }
    }
}

// Function to check for a win
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        if (pattern.every(index => boardState[index] === player)) {
            for (const index of pattern) {
                const cell = document.querySelector(`[data-index="${index}"]`);
                cell.classList.add('win');
            }
            return true;
        }
    }

    return false;
}

// Function to reset the game
function resetGame() {
    currentPlayer = '1';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = 'Player 1\'s turn';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('1', '2', 'win');
    });
}

resetButton.addEventListener('click', resetGame);

// Initial message
message.textContent = 'Player 2\'s turn';
