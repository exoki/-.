let attempts = 6;
const cards = document.querySelectorAll(".cards");
let lockBoard = false;
let isFlippedCard = false;
let firstCard, secondCard;
[...cards].forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
});
document.querySelector(".newGame").style.visibility = "hidden";
document.querySelector(".newGame").onclick = function () {
    attempts = 6;
    document.querySelector(".attemptsNumber").innerHTML = attempts;
    cards.forEach((card) => {
        card.addEventListener("click", flipCard);
        card.classList.remove("flip");
    });
    [...cards].forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
    document.querySelector(".newGame").style.visibility = "hidden";
}
function flipCard() {
    let target = event.target.parentElement;
    if (lockBoard) return lockBoard;
    if (event.target.parentElement == firstCard) return firstCard;
    target.classList.add("flip");
    if (!isFlippedCard) {
        isFlippedCard = true;
        firstCard = event.target.parentElement;
        return;
    }
    secondCard = event.target.parentElement;
    firstCard.dataset.education === secondCard.dataset.education ? disabledCards() : unflipCards()
    if (firstCard.dataset.education != secondCard.dataset.education) {
        attempts = attempts - 1;
        document.querySelector(".attemptsNumber").innerHTML = attempts;
    }
    if (attempts == 0) {
        document.querySelector(".newGame").style.visibility = "visible";
        [...cards].forEach(card => {
            card.removeEventListener("click", flipCard);
        });  
    }
}

function disabledCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [isFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
cards.forEach(cards => cards.addEventListener("click", flipCard));
