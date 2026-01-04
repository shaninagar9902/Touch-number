// Touch Nums //
'use strict';

let gNums = [];
let gSize = 4;
let gBoard = [];
let gCurrNum = 1;
let gTimerInterval;
let gStartTime = 0;

function initGame() {
    gNums = [];
    for (let i = 1; i <= (gSize ** 2); i++) {
        gNums.push(i);
    }
    gBoard = createBoard();
    renderBoard(gBoard);
}

function createBoard() {
    const board = [];
    for (let i = 0; i < gSize; i++) {
        board[i] = [];
        for (let j = 0; j < gSize; j++) {
            board[i][j] = drawNum(gNums);
        }
    }
    return board;
}

function drawNum(gNums) {
    let idx = getRandomIntInclusive(0, gNums.length - 1);
    let num = gNums[idx];
    gNums.splice(idx, 1);
    return num;
}

function renderBoard(board) {
    let strHTML = '';
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (let j = 0; j < board[i].length; j++) {
            const value = board[i][j];
            strHTML += `<td data-value="${value}" 
            onclick="cellClicked(this)">${value}</td>`;
        }
        strHTML += '</tr>';
    }
    document.querySelector('.board').innerHTML = strHTML;
}

function cellClicked(clickedNum) {
    // save it in data attribute
    const value = +clickedNum.dataset.value;

    // check if is the right number
    if (value !== gCurrNum) return;

    // set time on press 1
    if (gCurrNum === 1) startTimer();

    // hide number on screen and add it to system
    clickedNum.classList.add('hit');
    clickedNum.innerText = '';
    gCurrNum++;

    // counter to the next number
    document.getElementById('next-num').innerText = gCurrNum <= gSize ** 2 ? gCurrNum : '';

    // end game
    if (gCurrNum > gSize ** 2) {
        clearInterval(gTimerInterval);
        gTimerInterval = null;
        document.querySelector('.board').innerHTML = '<h2>You completed all!</h2>';
    }
}

function startTimer() {
    if (gTimerInterval) return;
    gStartTime = Date.now();
    gTimerInterval = setInterval(() => {
        const delta = Date.now() - gStartTime;
        document.querySelector('.timer').innerText = `Timer: ${(delta / 1000).toFixed(3)} sec`;
    }, 37);
}

function setLevel(num) {
    gSize = +num;
    restart();
}

function restart() {
    clearInterval(gTimerInterval);
    gTimerInterval = null;

    document.querySelector('.timer').innerText = 'Timer: 0.000';
    document.getElementById('next-num').innerText = '1';

    gCurrNum = 1;
    initGame();
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}