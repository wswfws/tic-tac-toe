const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

class GamPole {
    pole = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ]
    current_player = ZERO;
    game_end = false;

    constructor() {
    }

    has_empty_cell = true;
    _num_empty_cell = 9;

    move(row, col) {
        if (!this.game_end) {
            if (this.pole[row][col] !== EMPTY) {
                return
            }
            this.pole[row][col] = this.current_player;
            this.current_player = this.current_player === CROSS ? ZERO : CROSS;
            renderSymbolInCell(this.current_player, row, col);
            this._num_empty_cell--;
            if (this._num_empty_cell === 0) {
                this.has_empty_cell = false;
                this.game_end = true;
            }
        }

    }

    render_color(arr_to_color) {
        for (let i = 0; i < arr_to_color.length; i++) {
            const cell = arr_to_color[i];
            const player = this.pole[cell[0]][cell[1]] === CROSS ? ZERO : CROSS;
            renderSymbolInCell(player, cell[0], cell[1], "red");
        }
    }

    checkWinner() {
        for (let i = 0; i < this.pole.length; i++) {
            if (this.pole[i][0] === this.pole[i][1] && this.pole[i][0] === this.pole[i][2] && this.pole[i][2] !== EMPTY) {
                this.render_color([[i, 0], [i, 1], [i, 2]])
                this.game_end = true;
                return this.current_player
            }
            if (this.pole[0][i] === this.pole[1][i] && this.pole[0][i] === this.pole[2][i] && this.pole[2][i] !== EMPTY) {
                this.render_color([[0, i], [1, i], [2, i]])
                this.game_end = true;
                return this.current_player
            }
        }

        if (this.pole[0][0] === this.pole[1][1] && this.pole[0][0] === this.pole[2][2] && this.pole[2][2] !== EMPTY) {
            this.render_color([0, 0], [1, 1], [2, 2])
            this.game_end = true;
            return this.current_player
        }

        if (this.pole[2][0] === this.pole[1][1] && this.pole[2][0] === this.pole[0][2] && this.pole[0][2] !== EMPTY) {
            this.render_color([[0, 2], [1, 1], [2, 0]])
            this.game_end = true;
            return this.current_player;
        }

        return EMPTY;
    }
}

let pole = new GamPole();

startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
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

function cellClickHandler(row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);

    pole.move(row, col);

    const winner = pole.checkWinner();
    if (winner !== EMPTY) {
        alert(winner === CROSS ? "Выйграли крестики" : "Выйграли нолики");
    }
    if (!pole.has_empty_cell) {
        alert("победила дружба");
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    pole = new GamPole();
    startGame();
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
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

function clickOnCell(row, col) {
    findCell(row, col).click();
}
