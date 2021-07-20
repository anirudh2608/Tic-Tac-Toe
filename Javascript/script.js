const x_class = "x";
const c_class = "c";
const CellElement = document.querySelectorAll("[data-cell]");
const game = localStorage.getItem("type");
const p1 = localStorage.getItem("player1");
const p2 = localStorage.getItem("player2");
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const WinMsgText = document.querySelector("[win-msg-text]");
const WinMsgTextElement = document.getElementById("winmsg");
const Restart = document.getElementById("restart");
const board = document.getElementById("board");
const ChanceMsg = document.querySelector(".chance_msg")
let cTurn;

if (game == "Computer") {
  var name1 = "Computer";
  var name2 = "you";
} else {
  var name1 = p1;
  var name2 = p2;
}

StartGame();

Restart.addEventListener("click", StartGame);

function StartGame() {
  if(game == "Computer"){
    ChanceMsg.innerText = "It's your Chance \n Your are X"
  }else if(game == "Friend"){
    ChanceMsg.innerText = "It's "+ name2+" Chance \n Your are X"
  }
  cTurn = false;
  CellElement.forEach((cell) => {
    cell.classList.remove(x_class);
    cell.classList.remove(c_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  hoverClass();
  WinMsgTextElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = cTurn ? c_class : x_class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    EndGame(false);
  } else if (isDraw()) {
    EndGame(true);
  } else {
    if (game == "Friend") {
      if(currentClass === "x"){
        ChanceMsg.innerText = "It's "+ name1+" Chance \n Your are O"
      }else{
        ChanceMsg.innerText = "It's "+ name2+" Chance \n Your are X"
      }
      hoverClass();
      swapTurn();
    }
    hoverClass();
  }
}



function EndGame(draw) {
  if (draw) {
    WinMsgText.innerText = "Draw!";
  } else {
    console.log(cTurn);
    WinMsgText.innerText = `${cTurn ? name1 + "'s" : name2 + "'s"} Wins!`;
  }
  WinMsgTextElement.classList.add("show");
}



function isDraw() {
  return [...CellElement].every((cell) => {
    return cell.classList.contains(x_class) || cell.classList.contains(c_class);
  });
}



function placeMark(cell, currentClass) {
  if (game == "Computer") {
    cell.classList.add(currentClass);
    computer();
  } else if (game == "Friend") {
    cell.classList.add(currentClass);
  }
}



function swapTurn() {
  cTurn = !cTurn;
}



function hoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(c_class);
  if (cTurn) {
    board.classList.add(c_class);
  } else {
    board.classList.add(x_class);
  }
}



function checkWin(currentClass) {
  return win.some((combination) => {
    return combination.every((index) => {
      return CellElement[index].classList.contains(currentClass);
    });
  });
}



function computer() {
  const cell_space = [];
  for (let i = 0; i < 9; i++) {
    if (
      CellElement[i].classList.item(1) !== "x" &&
      CellElement[i].classList.item(1) !== "c"
    ) {
      cell_space.push(i);
    }
  }
  if (cell_space.length == 0) {
  } else {
    const randomNumber = Math.floor(Math.random() * cell_space.length);
    CellElement[cell_space[randomNumber]].classList.add("c");
  }
  currentClass = c_class;
  if (checkWin(currentClass)) {
    swapTurn();
    EndGame(false);
  }
}
