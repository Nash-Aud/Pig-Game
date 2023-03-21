'use strict';

//selecting elements
const player0EL = document.querySelector(".player--0"),
    player1EL = document.querySelector(".player--1"),
    player0Name = document.getElementById("name--0"),
    player1Name = document.getElementById("name--1"),
    score0El = document.querySelector("#score--0"),
    score1El = document.getElementById("score--1"),
    diceEl = document.querySelector(".dice"),
    btnNew = document.querySelector(".btn--new"),
    btnRoll = document.querySelector(".btn--roll"),
    btnHold = document.querySelector(".btn--hold"),
    current0El = document.getElementById("current--0"),
    current1El = document.getElementById("current--1");

let scores, currentScore, activePlayer, playing;


const init = function () {
    //State variables
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    //starting conditions
    score0El.textContent = 0;
    score1El.textContent = 0;    
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0EL.classList.add("player--active");
    player1EL.classList.remove("player--active");
    player0EL.classList.remove("player--winner");
    player1EL.classList.remove("player--winner");
    player0Name.textContent = "Player 1";
    player1Name.textContent = "Player 2";
};
init();


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    //overlay effect activating
    player0EL.classList.toggle("player--active");
    player1EL.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function() {
    if (playing) {
    // 1.- Generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2.-Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3.-Check for rolled 1: 

    // If not true, add to score
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
    } else {
      switchPlayer();
      }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
    //1.- Add current score to active player´s score
    scores[activePlayer] +=  currentScore; //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


    //2.- Check if player´s score is >= 100    
    if (scores[activePlayer] >= 10) {
        //Finish game
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        // document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer + 1} Wins!`;
        diceEl.classList.add("hidden");
    }
    else {
         // 3.- Switch to next player
        switchPlayer();
        }   
    }
});

btnNew.addEventListener("click", init);
