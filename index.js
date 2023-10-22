const wordDisplay=document.querySelector(".word-display");
const keyboardDiv=document.querySelector(".keyboard");
const guessedText=document.querySelector(".guessed-text b");
const hangmanImage=document.querySelector(".hangman-box img");
const gameModal=document.querySelector(".game-modal");
const playAgainBtn=document.querySelector(".play-again");

let currentWord,wrongguesscount,correctLetters;
const maxGuesses=6;

const resetGame=()=>{
    correctLetters=[];
    wrongguesscount=0
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
    hangmanImage.src=`images/hangman-${wrongguesscount}.svg`;
    guessedText.innerText=`${wrongguesscount}/${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord=word;
    console.log(word);
    document.querySelector(".hint-text b").innerText=hint;
    resetGame();
}

const gameOver=(isVictory)=>{
    setTimeout(()=>{
         const modalText=isVictory ? `you found the word :` : `the correct word was:`
        gameModal.querySelector("img").src=`images/${isVictory?`victory` : `lost`}.gif`;
        gameModal.querySelector("h4").innerText=`${isVictory?`Congrats!` : `GameOver`}`;
        gameModal.querySelector("p").innerHTML=`${modalText}<b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300);
}

const initGame=(button,clickedletter)=>{
    // console.log(button,clickedletter);
    if(currentWord.includes(clickedletter))
    {
        // console.log(clickedletter,"is exists on the word");
        [...currentWord].forEach((letter,index)=>{
            if(letter===clickedletter)
            {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        wrongguesscount++;
        // console.log(clickedletter,"does not exists in the word");
        hangmanImage.src=`images/hangman-${wrongguesscount}.svg`;
    }
    button.disabled=true;
    guessedText.innerText=`${wrongguesscount}/${maxGuesses}`;

    if(wrongguesscount===maxGuesses)return gameOver(false);
    if(correctLetters.length===currentWord.length) return gameOver(true);

}
for(let i=97;i<=122;i++)
{
    const button = document.createElement("button");
    button.innerText=String.fromCharCode(i)
    keyboardDiv.appendChild(button);
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i)));
} 

getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);