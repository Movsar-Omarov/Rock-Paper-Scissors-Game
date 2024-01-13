const moveButtons = document.querySelectorAll("li button"),
startButton = document.querySelector("#reset-button"),
userWins = document.querySelector("#user-wins"),
computerWins = document.querySelector("#computer-wins"),
announcementInline = document.querySelector("#h2");

const winsOfComp = "winsOfComp",
winsOfUser = "winsOfUser";


function AnnounceComputerWin(computerMove, userMove) {
    announcementInline.textContent = ` ${computerMove} covers ${userMove}. You lose!`;
}

function AnnounceUserWin(userMove, computerMove) {
    announcementInline.textContent = `${userMove} covers ${computerMove}. You win!`; 
}

const moves = ["paper", "rock", "scissors"];

class Player {
    constucor(wins, move) {
        this.wins = wins;
        this.move = move;
    }

    CountWins() {
        if (!isNaN(this.wins)) {
            let copy = parseInt(this.wins);
        
            copy++;
            this.wins = String(copy);
        }
        else {
            this.wins = 0;
        }
    }
}


let user = new Player();
let computer = new Player();

function MoveSetterForComputer() {
    let randomMove = Math.floor(Math.random()*moves.length);

    computer.move = moves[randomMove];
}

function CountWinsOfPlayers(isPlayerComputer) {
    if (!isPlayerComputer) {
        user.CountWins();    
        userWins.textContent = user.wins.toString();
    }
    else {
        computer.CountWins();
        computerWins.textContent = computer.wins.toString();
    }
}

function AnnounceWin(pickedMoves) {   
    switch (pickedMoves) {
        case "scissors paper":
            CountWinsOfPlayers(true);
            AnnounceComputerWin(computer.move, user.move);
            break;

        case "rock scissors":
            CountWinsOfPlayers(true);
            AnnounceComputerWin(computer.move, user.move);
            break;
        
        case "paper rock":
            CountWinsOfPlayers(true);
            AnnounceComputerWin(computer.move, user.move);
            break; 

        case "paper scissors":
            CountWinsOfPlayers(false);
            AnnounceUserWin(user.move, computer.move);
            break; 

        case "scissors rock":
            CountWinsOfPlayers(false);
            AnnounceUserWin(user.move, computer.move);
            break; 

        case "rock paper":
            CountWinsOfPlayers(false);
            AnnounceUserWin(user.move, computer.move);
            break;

        default:
            announcementInline.textContent = "Draw";
    }
}

function SetMoves(event) {
    const move = event.target.parentElement.dataset.move;
    let pickedMoves = "";
    user.move = move;

    MoveSetterForComputer();
    pickedMoves = computer.move + " " + user.move;
    AnnounceWin(pickedMoves);

    localStorage.setItem(winsOfComp, computer.wins);
    localStorage.setItem(winsOfUser, user.wins);

}

function StartGame() {
    localStorage.setItem(winsOfComp, 0);
    localStorage.setItem(winsOfUser, 0);
    user.wins = 0;
    computer.wins = 0;

    userWins.textContent = 0;
    computerWins.textContent = 0;
}

moveButtons.forEach((moveButton) => {
    moveButton.addEventListener("click", SetMoves);
});

startButton.addEventListener("click", function() {
    StartGame();
});

window.addEventListener("load", function() {
    user.wins = localStorage.getItem(winsOfUser);
    computer.wins = localStorage.getItem(winsOfComp);
    userWins.textContent = user.wins;
    computerWins.textContent = computer.wins;
});