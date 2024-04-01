const loadingwrapper = document.querySelector(".loading-wrapper");
const gamewrapper = document.querySelector(".game-wrapper");
var boxes = document.querySelectorAll(".box");
const player = document.querySelector(".player");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

setTimeout( () => {
    loadingwrapper.style.display = "none";
    gamewrapper.style.display = "flex";
}, 2000);

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    boxes.forEach( (box, index) => {
        box.innerText = "";
        box.classList.remove("win");
        boxes[index].style.pointerEvents = "all";
    })
    
    newGameBtn.classList.remove("active");
    player.innerText = `Current Player - ${currentPlayer}`;
    player.classList.remove("loss");
    player.classList.remove("winner");
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    player.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    
    winningPositions.forEach( (position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {

                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }else{
                    answer = "O";
                }

                // disable pointer events
                boxes.forEach( (box) => {
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

                boxes[position[0]].style.color = "purple";
                boxes[position[1]].style.color = "purple";
                boxes[position[2]].style.color = "purple";

        }

    });

    // means we have a winner
    if(answer !== ""){
        player.innerText = `Winner Player - ${answer}`;
        player.classList.add("winner");
        newGameBtn.classList.add("active");
        return;
    }

    // if the match is tie
    let fillcount = 0;

    gameGrid.forEach( (box)=>{
        if(box !== ""){
            fillcount++;
        }

        if(fillcount === 9){
            player.innerText = "Game Tied !";
            player.classList.add("loss");
            newGameBtn.classList.add("active");
        }
    })
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        if(gameGrid[index] === "O"){
            boxes[index].style.color = "red";
        }else{
            boxes[index].style.color = "aqua";
        }
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box , index) => {
    box.addEventListener("click" , ()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click" , initGame);
