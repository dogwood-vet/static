const goal = { x: 0, y: 0 };

const board = new Array(5).fill(undefined).map(() => new Array(6).fill(undefined));

const player1 = { x: 0, y: 0 };
const player2 = { x: 0, y: 0 };

let running = false;

let btn = document.querySelector(".start");
let messageEl = document.querySelector(".message");


function random(max) {
    return Math.floor(Math.random() * max);
}

function populate() {
    let goalEl = document.querySelector(".goal");
    let boardEl = document.querySelector(".board");

    var node;

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 6; j++) {
            node = document.createElement("div");
            node.classList.add("node");
            var r = random(6) + 1;
            node.innerText = r;
            board[i][j] = node;
            boardEl.appendChild(node)
        }
    }

    let randomX = random(4);
    let randomY = random(5);


    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            node = document.createElement("div");
            node.classList.add("node");
            node.innerText = board[randomX + i][randomY + j].innerText;
            goal.x = randomX;
            goal.y = randomY;
            goalEl.appendChild(node)
        }
    }

}

function restart() {
    let goalEl = document.querySelector(".goal");
    let boardEl = document.querySelector(".board");
    goalEl.innerHTML = "";
    boardEl.innerHTML = "";
    btn.classList.remove("hide");
    messageEl.classList.remove("hide");

}

function movePlayer(e) {
    // 39 = right = 68
    // 37 = left = 65
    // 38 = up = 87
    // 40 = down = 83
    let code = e.keyCode;

    if (code === 39 || code === 37 || code === 40 || code === 38) {
        cleanPlayer1()

        switch (code) {
            case 39: {
                if (player1.y === 4) break;
                player1.y++;
                break;
            }
            case 37: {
                if (player1.y === 0) break;
                player1.y--;
                break;
            }
            case 40: {
                if (player1.x === 3) break;
                player1.x++;
                break;
            }
            case 38: {
                if (player1.x === 0) break;
                player1.x--;
                break;
            }
        }

        positionPlayer1();
        if (player1.x === goal.x && player1.y === goal.y) {
            restart();
            messageEl.innerText = "Player 1 won";
        }
    } else if (code === 68 || code === 65 || code === 87 || code === 83) {
        cleanPlayer2()

        switch (code) {
            case 68: {
                if (player2.y === 4) break;
                player2.y++;
                break;
            }
            case 65: {
                if (player2.y === 0) break;
                player2.y--;
                break;
            }
            case 83: {
                if (player2.x === 3) break;
                player2.x++;
                break;
            }
            case 87: {
                if (player2.x === 0) break;
                player2.x--;
                break;
            }
        }

        positionPlayer2();
        if (player2.x === goal.x && player2.y === goal.y) {
            restart();
            messageEl.innerText = "Player 2 won";

        }
    }

}

function positionPlayer1() {
    board[player1.x][player1.y].classList.add("player_1_1");
    board[player1.x][player1.y + 1].classList.add("player_1_2");
    board[player1.x + 1][player1.y].classList.add("player_1_3");
    board[player1.x + 1][player1.y + 1].classList.add("player_1_4");
}
function cleanPlayer1() {
    board[player1.x][player1.y].classList.remove("player_1_1");
    board[player1.x][player1.y + 1].classList.remove("player_1_2");
    board[player1.x + 1][player1.y].classList.remove("player_1_3");
    board[player1.x + 1][player1.y + 1].classList.remove("player_1_4");
}

function positionPlayer2() {
    board[player2.x][player2.y].classList.add("player_2_1");
    board[player2.x][player2.y + 1].classList.add("player_2_2");
    board[player2.x + 1][player2.y].classList.add("player_2_3");
    board[player2.x + 1][player2.y + 1].classList.add("player_2_4");
}
function cleanPlayer2() {
    board[player2.x][player2.y].classList.remove("player_2_1");
    board[player2.x][player2.y + 1].classList.remove("player_2_2");
    board[player2.x + 1][player2.y].classList.remove("player_2_3");
    board[player2.x + 1][player2.y + 1].classList.remove("player_2_4");
}

function init() {
    player1.x = random(4);
    player1.y = random(5);

    if (player1.x === goal.x && player1.y === goal.y) {
        if (player1.x === 3) {
            player1.x--;
        } else if (player1.x === 0) {
            player1.x++;
        }
    }

    positionPlayer1();

    player2.x = random(4);
    player2.y = random(5);

    if (player2.x === goal.x && player2.y === goal.y) {
        if (player2.x === 3) {
            player2.x--;
        } else if (player2.x === 0) {
            player2.x++;
        }
    }

    positionPlayer2();

}

function main() {

    messageEl.classList.add("hide");
    btn.classList.add("hide")
    populate();
    init();
    document.addEventListener("keydown", (e) => movePlayer(e));
}


btn.addEventListener("click", main);