const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let turn = 0;
dimension = 3;
let field = [];

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(dimension);
    for (let i = 0; i < dimension; i++) {
        field[i] = [];
        for (let j = 0; j < dimension; j++) {
            field[i][j] = EMPTY;
        }
    }
}

function CheckWinner(){
    
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if(field[row][col] != EMPTY){
        return;
    }
    if (turn % 2 == 1){
        renderSymbolInCell(ZERO, row, col);
        field[row][col] = ZERO;
    }
    else{
        renderSymbolInCell(CROSS, row, col);
        field[row][col] = CROSS;
    }
    turn += 1;
    if (turn == dimension * dimension){
        alert("Победила Дружба!")
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    turn = 0;
    let dim = field.length;
    for (let i = 0; i < dim; i++){
        for(let j = 0; j < dim; j++){
            field[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
        }
    }
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
