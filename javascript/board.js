const board = document.getElementById('myCanvas');
var ctx = board.getContext("2d");

var myGamePlayer = [];
const playerTurn = document.getElementById("playersTurn");
playerTurn.innerHTML = "Player 1's Turn"

myGamePlayer[1] = 1;
myGamePlayer[2] = 1;
var tile = [];
var traps = [8, 16, 24, 32, 40];

let currentPlayer = 0;
let player1Pos = 1;
let player2Pos = 1;
var player1Freeze = 0;
var player2Freeze = 0;

var boardTiles = [
    { id: 0},
    { id: 1, x: 64, y: 64},
    { id: 2, x: 128, y: 64},
    { id: 3, x: 192, y: 64},
    { id: 4, x: 256, y: 64},
    { id: 5, x: 320, y: 64},
    { id: 6, x: 384, y: 64},
    { id: 7, x: 448, y: 64},
    { id: 8, x: 512, y: 64},
    { id: 9, x: 576, y: 64},
    { id: 10, x: 640, y: 64},
    { id: 11, x: 640, y: 128},
    { id: 12, x: 640, y: 192},
    { id: 13, x: 576, y: 192},
    { id: 14, x: 512, y: 192},
    { id: 15, x: 448, y: 192},
    { id: 16, x: 384, y: 192},
    { id: 17, x: 384, y: 256},
    { id: 18, x: 384, y: 320},
    { id: 19, x: 448, y: 320},
    { id: 20, x: 512, y: 320},
    { id: 21, x: 576, y: 320},
    { id: 22, x: 640, y: 320},
    { id: 23, x: 704, y: 320},
    { id: 24, x: 768, y: 320},
    { id: 25, x: 832, y: 320},
    { id: 26, x: 896, y: 320},
    { id: 27, x: 960, y: 320},
    { id: 28, x: 1024, y: 320},
    { id: 29, x: 1024, y: 384},
    { id: 30, x: 1024, y: 448},
    { id: 31, x: 960, y: 448},
    { id: 32, x: 896, y: 448},
    { id: 33, x: 832, y: 448},
    { id: 34, x: 768, y: 448},
    { id: 35, x: 704, y: 448},
    { id: 36, x: 640, y: 448},
    { id: 37, x: 576, y: 448},
    { id: 38, x: 512, y: 448},
    { id: 39, x: 512, y: 512},
    { id: 40, x: 512, y: 576},
    { id: 41, x: 576, y: 576},
    { id: 42, x: 640, y: 576},
    { id: 43, x: 704, y: 576},
    { id: 44, x: 768, y: 576},
    { id: 45, x: 832, y: 576},
];

//Image of the trap
var trapImg = new Image();
trapImg.src = "img/ice.png";

var players = JSON.parse(localStorage.getItem("players"));

tile[1] = new Image(); tile[1].src = players[0].pawn;
tile[2] = new Image(); tile[2].src = players[1].pawn;

var tall = 1;

//Prints dice roll to the page
function printNumber(number) {
  var placeholder = document.getElementById('dice');
  placeholder.innerHTML = number;
}

var button = document.getElementById('button');
button.onclick = function() {
  var result = rollDice();
  // printNumber(result);
};

function setPlayerTurn(){
    if(currentPlayer === 0){
        playerTurn.innerHTML = "Player 1's Turn"
    } else if (currentPlayer === 1){
        playerTurn.innerHTML = "Player 2's Turn "
    }
}

function rollDice () {
    var dice = document.getElementById("dice");
    myRoll = Math.floor(Math.random() * 6) + 1;
    dice.src = "img/dice/" + myRoll + ".png";
    //console.log(dice);
    board.width = board.width;
    tall = 1;
    for (let i = 1; i < boardTiles.length; i++) {
        // tegn firkant
        LagFirkant(i, boardTiles[i].x, boardTiles[i].y);
        //console.log(LagFirkant);
    }

    if (currentPlayer === 0 && player1Freeze === 0) {
        player1Pos += myRoll;
        console.log("P1: ", player1Pos, player1Freeze, currentPlayer);
        placePlayer(1, player1Pos)
        placePlayer(2, player2Pos)
        if (myRoll !== 6 && player2Freeze == 0) {
            currentPlayer = 1; console.log('Skal skifte fra P1 til P2');
        } else if (player2Freeze > 0) {
            player2Freeze--; console.log('P1 har trillet < 6 og P2 er frossen');
        } else {
            console.log('P1 har trillet 6');
        }
        setPlayerTurn();
    } else  if (currentPlayer === 1 && player2Freeze === 0) {
        player2Pos += myRoll;
        console.log("P2: ", player2Pos, player2Freeze, currentPlayer);
        placePlayer(1, player1Pos)
        placePlayer(2, player2Pos)
        if (myRoll !== 6 && player1Freeze == 0) {
            currentPlayer = 0; console.log('Skal skifte fra P2 til P1');
        } else if (player1Freeze > 0) {
            player1Freeze--; console.log('P2 har trillet < 6 og P1 er frossen');
        } else {
            console.log('P2 har trillet 6');
        }
        setPlayerTurn();
    } else {
        console.log("Kommer denne opp, så BØR begge være fanget");
        console.log("ELSE P1: ", player1Pos, player1Freeze, currentPlayer);
        console.log("ELSE P2: ", player2Pos, player2Freeze, currentPlayer);
        placePlayer(1, player1Pos, player1Freeze == 0); // False bare hvis player1Freeze > 0?
        placePlayer(2, player2Pos, player2Freeze == 0); // False bare hvis player2Freeze > 0?
        if (player1Freeze > 0 && currentPlayer == 0) player1Freeze--;
        if (player2Freeze > 0 && currentPlayer == 1) player2Freeze--;
        currentPlayer = (currentPlayer+1)%2;
    }
}

// Hva skjer når man triller 6 og så treffer en felle...???

function drawTiles() {
    for (let i = 1; i < boardTiles.length; i++) {
        LagFirkant(i, boardTiles[i].x, boardTiles[i].y);
    }
}

function startGame() {
    //myGameArea.start();
    //ctx.drawImage(tile[1], 10, 10);
    drawTiles();
    placePlayer(2, 1);
    placePlayer(1, 1);
}

function placePlayer(id, pos, check = true) {
    let offset = 0;
    if (player1Pos == player2Pos){
        offset = -10;
        if (id == 2) offset = 10;
    }
    if (check) checkIfTrap();
    //console.log (tile[id], boardTiles[pos].x, boardTiles[pos].y)
    ctx.drawImage(tile[id], boardTiles[pos].x+offset,boardTiles[pos].y, 64, 64);
    checkIfWon();
}

let tilesCreated = 1;
function LagFirkant(i, x, y) {
    //console.log(boardTiles);
    ctx.beginPath();

    ctx.rect(x, y, 64, 64);
    var farge = "#403d3b";
    if(i % 2) {
        farge = "#587589";
    }

    ctx.fillStyle = farge;
    ctx.fill();

    if (i === 8 || i === 16 || i === 24 || i === 32 || i === 40) {
        ctx.drawImage(trapImg, x, y, 64, 64);
    }

    ctx.font = "20px Cinzel";
    ctx.fillStyle = "#EDEDED";
    //console.log (ctx.font);

    if(tall < 10){
        ctx.fillText(tall, x + 27, y + 40);
    } else {
        ctx.fillText(tall, x + 22, y + 40);
    }
    tall++;
}

function checkIfTrap(roll) {
    for (let trap of traps) {
        if (player1Pos === trap && currentPlayer === 0) {
            console.log("player1 HIT a trap");
            player1Freeze = 1;
            return;
        }else if (player2Pos  === trap && currentPlayer === 1) {
            player2Freeze = 1;
            console.log("player2 HIT a trap");
            return;
        }
    }
}

function checkIfWon() {
    if (player1Pos >= 45) {
        localStorage.setItem("winner", "1")
        window.location = "finale.html" //redirekter url til neste side
    }else if ( player2Pos >= 45) {
        localStorage.setItem("winner", "2")
        window.location = "finale.html" //redirekter url til neste side
    }
}

window.onload = function () {
    //drawTiles();
    startGame();
}
