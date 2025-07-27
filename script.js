document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cells = document.querySelectorAll('[data-cell-index]');
    const statusDisplay = document.querySelector('.game-status');
    const restartButton = document.querySelector('.game-restart');

    // Game variables
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];

    // Winning conditions (indices of the gameState array)
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const winningMessage = () => `Player ${currentPlayer} has won! 🎉`;
    const drawMessage = () => `Game ended in a draw! 🤝`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

    // Initialize game
    statusDisplay.innerHTML = currentPlayerTurn();

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        // Update game state and UI
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.innerHTML = currentPlayerTurn();
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue; // Skip if any cell in the condition is empty
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        // Check for a draw
        if (!gameState.includes("")) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        // If no win and no draw, change the player
        handlePlayerChange();
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        // Check if the cell has already been played or if the game is over
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        // Process the click
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusDisplay.innerHTML = currentPlayerTurn();
        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.classList.remove('x', 'o');
        });
    }

    // Add event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
});