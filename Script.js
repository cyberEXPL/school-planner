document.addEventListener('DOMContentLoaded', () => {
    const welcomeContainer = document.querySelector('.welcome-container');
    const mainApp = document.getElementById('mainApp');
    const userForm = document.getElementById('userForm');
    const timeForm = document.getElementById('timeForm');
    const timetableBodyStudy = document.getElementById('timetableBodyStudy');
    const timetableBodyClass = document.getElementById('timetableBodyClass');
    const timetableBodyExam = document.getElementById('timetableBodyExam');
    const displayName = document.getElementById('displayName');
    const userNameInput = document.getElementById('userName');
    const displayUniversityName = document.getElementById('displayUniversityName');
    const uniNameInput = document.getElementById('uniName');
    const timerDisplay = document.getElementById('timer');
    const startTimerButton = document.getElementById('startTimer');
    const stopTimerButton = document.getElementById('stopTimer');
    const resetTimerButton = document.getElementById('resetTimer');
    const ticTacToeBoard = document.getElementById('ticTacToeBoard');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const status = document.getElementById('status');
    let timerInterval;
    let timerSeconds = 0;
    let currentPlayer = 'X';
    let gameActive = true;
    const gameState = ['', '', '', '', '', '', '', '', ''];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    welcomeContainer.style.display = 'block';
    mainApp.style.display = 'none';

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userName = userNameInput.value.trim();
        const uniName = uniNameInput.value.trim();
        displayName.textContent = userName;
        displayUniversityName.textContent = uniName;
        welcomeContainer.style.display = 'none';
        mainApp.style.display = 'block';
    });

    timeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const scheduleType = document.getElementById('scheduleType').value;
        const courseName = document.getElementById('courseName').value;
        const day = document.getElementById('day').value;
        const time = document.getElementById('time').value;
        const color = document.getElementById('color').value;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${courseName}</td>
            <td>${day}</td>
            <td>${time}</td>
            <td style="background-color: ${color};">${color}</td>
        `;

        if (scheduleType === 'Class') {
            timetableBodyClass.appendChild(row);
        } else if (scheduleType === 'Study') {
            timetableBodyStudy.appendChild(row);
        } else if (scheduleType === 'Exam') {
            timetableBodyExam.appendChild(row);
        }

        timeForm.reset();
    });

    function updateTimerDisplay() {
        const hours = Math.floor(timerSeconds / 3600);
        const minutes = Math.floor((timerSeconds % 3600) / 60);
        const seconds = timerSeconds % 60;
        timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerSeconds = 0;
        updateTimerDisplay();
    }

    startTimerButton.addEventListener('click', startTimer);
    stopTimerButton.addEventListener('click', stopTimer);
    resetTimerButton.addEventListener('click', resetTimer);

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        if (gameState.every(cell => cell !== '')) {
            status.textContent = 'Game is a draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState.fill('');
        cells.forEach(cell => cell.textContent = '');
        status.textContent = '';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
