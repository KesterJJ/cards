let cardCount = document.getElementById("cardCount");
let options = document.getElementById("options");
let cardBox = document.getElementById("cardBox");
let deckBack = document.getElementById("deckBack");
let back = document.getElementById("back");
let card = document.getElementById("card");
let suits = ["clubs", "spades", "diamonds", "hearts"];
let deck = [];
let removedCards = [];

//creates the deck
pushDeck = () => {
    for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j < 14; j++) {
if (j == 1) {
    deck.push(`ace_of_${suits[i]}`);
} else if (j == 11) {
    deck.push(`jack_of_${suits[i]}`);
  } else if (j == 12) {
        deck.push(`queen_of_${suits[i]}`);
    } else if (j == 13) {
        deck.push(`king_of_${suits[i]}`);
    } else {
        deck.push(`${j}_of_${suits[i]}`);
    }
}
}
return deck;
}

//choses random number between max and min inclusive
randomNumber = (max, min) => {
  let number = Math.floor(Math.random() * (max - min + 1) + min);
  return number;
}


showCard = () => {
    setTimeout(function() {card.style.zIndex = 3;}, 250);
    back.style.transform = "rotateY(180deg)";
    card.style.transform = "rotateY(-180deg)";
}

hideCard = () => {
    setTimeout(function() {card.style.zIndex = 1;}, 250);
back.style.transform = "rotateY(0deg)";
card.style.transform = "rotateY(0)";
}


//The next few functions do the shuffle animation
moveCardsRight = () => deckBack.style.left ="50%";

moveCardsLeftDown = () => {
deckBack.style.zIndex = 0;
deckBack.style.left = "0px";
}

moveCardsLeftUp = () => {
    deckBack.style.zIndex = 4;
    deckBack.style.left = "0px";
}

moveCards = () => {
moveCardsRight();
setTimeout(function() {moveCardsLeftUp()}, 100);
setTimeout(function() {moveCardsRight()}, 200);
setTimeout(function() {moveCardsLeftDown()}, 300);
setTimeout(function() {moveCardsRight()}, 400);
setTimeout(function() {moveCardsLeftUp()}, 500);
setTimeout(function() {moveCardsRight()}, 600);
setTimeout(function() {moveCardsLeftDown()}, 700);
setTimeout(function() {moveCardsRight()}, 800);
setTimeout(function() {moveCardsLeftUp()}, 900);
setTimeout(function() {moveCardsRight()}, 1000);
setTimeout(function() {moveCardsLeftDown()}, 1100);
}


//deals with the actual shuffle function
shuffle = () => {

    let newDeck = [];
    for (let i = 0; i < deck.length; i += 0) {
    let randomNo = randomNumber(deck.length - 1, 0);
    let removed = deck.splice(randomNo, 1);
    newDeck.push(removed[0]);
    }
    deck = newDeck;
    card.src = `img/${deck[0]}.png`
}
shuffleDeck = () => {
    hideCard();
    setTimeout(function() { shuffle(); }, 500);
    setTimeout(function() {moveCards()}, 500);
    
}

//Takes away the image of the card if there aren't any left
removeBacks = () => {
    if (deck.length < 2) {
        deckBack.style.opacity = 0;
    }
        back.style.opacity = 0;
        card.style.opacity = 0;

}

//moves the cards back into the pile
includeCards = () => {
back.style.transition = "transform 0.5s linear, left 0s";
card.style.transition = "transform 0.5s linear, left 0s";
back.style.left = "0px";
card.style.left = "0px";
if (deck.length >= 1) {
back.style.opacity = 1;
card.style.opacity = 1;
}
}


//moves the top card to the right and makes it fade out
removeCard = () => {
    if (deck.length > 0) {
    removedCard = deck.shift();
    removedCards.push(removedCard);
    console.log(removedCards);
    card.src = `img/${deck[0]}.png`;
    removeBacks();
    countCards();
    }
}

//returns the image of the back of the card to the bottom of the deck
returnDeckBack = () => {
    deckBack.style.transition = "opacity 0s, left 0s";
    deckBack.style.left = "0px";
    if (deck.length > 1) {
        deckBack.style.opacity = 1;
    }
    setTimeout(function() {deckBack.style.transition = "left 0.1s";}, 500);
}

//fades the back of the deck image after it moves right 
fadeCardOut = () => {
    deckBack.style.opacity = 0;
    deckBack.style.transition = "opacity 0.25s, left 0s";
    setTimeout(function() {returnDeckBack()}, 250);
}

//moves the back of the deck image to the right
moveCardOut = () => {
    deckBack.style.transition = "left 0.25s";
    deckBack.style.left = "50%"
    setTimeout(function() {fadeCardOut()}, 500);
}

//removes chosen suit from the deck and does animation
removeSuit = (suit) => {
    let removed;
    for (let i = 0; i < deck.length; i++) {
        if (deck[i].includes(`${suit}`)) {
            moveCardOut();
            removed = deck.splice(i, 1);
            removedCards.push(removed[0]);
            i--
        }

    }
    card.src = `img/${deck[0]}.png`;
    countCards();
    removeBacks();
    includeCards();
    console.log(removedCards);
}
//removes top card
takeAway = () => {
    back.style.transition = "transform 0.5s linear, left 0.5s";
card.style.transition = "transform 0.5s linear, left 0.5s";
    back.style.left = "50%";
    card.style.left = "50%";

    setTimeout(function() {removeCard()}, 1000);
    setTimeout(function() {includeCards()}, 1000);
    hideCard();
}

//Below here deals with putting cards back into the deck


takeInLast = () => {
    if (removedCards.length > 0) {
    moveCardIn();
    setTimeout(function() {retrieveLastCard()}, 500);
    hideCard();
    }
}

takeInRandom = () => {
    if (removedCards.length > 0) {
    moveCardIn();
    setTimeout(function() {retrieveRandomCard()}, 500);
    hideCard();
    }
}

takeInBottom = () => {
    if (removedCards.length > 0) {
    moveCardIn();
    setTimeout(function() {retrieveBottomCard()}, 500);
    hideCard();
    }
}

retrieveBacks = () => {
    if (deck.length >= 2) {
        deckBack.style.opacity = 1;
    }
    if (deck.length >= 1) {
        back.style.opacity = 1;
        card.style.opacity = 1;
    }
}

retrieveLastCard = () => {
    let retrieved = removedCards.pop();
    deck.unshift(retrieved);
    card.src = `img/${deck[0]}.png`;
    retrieveBacks();
    countCards();
}

retrieveBottomCard = () => {
    if (removedCards.length > 0) {
    let retrieved = removedCards.shift();
    deck.unshift(retrieved);
    card.src = `img/${deck[0]}.png`;
    retrieveBacks();
    countCards();
    }
}

retrieveRandomCard = () => {
    if (removedCards.length > 0) {
        let randomNo = randomNumber(removedCards.length - 1, 0);
    let retrieved = removedCards.splice(randomNo, 1);
    deck.unshift(retrieved[0]);
    card.src = `img/${deck[0]}.png`;
    retrieveBacks();
    countCards();
    }
    console.log(deck);
    console.log(removedCards);
}


//returns the image of the back of the card to the bottom of the deck
returnDeckBackIn = () => {
    deckBack.style.transition = "opacity 0s, left 0.25s";
    deckBack.style.left = "0px";
    setTimeout(function() {deckBack.style.transition = "left 0.1s";}, 250);
}

//fades in the back of the deck image after it moves right 
fadeCardIn = () => {
    deckBack.style.opacity = 1;
    deckBack.style.transition = "opacity 0.25s, left 0.25s";
    setTimeout(function() {returnDeckBackIn()}, 250);
}

//makes the bottom card image invisible and moves it to the right
moveCardIn = () => {
    deckBack.style.transition = "opacity 0s, left 0s";
    deckBack.style.opacity = 0;
    deckBack.style.left = "50%"
    setTimeout(function() {fadeCardIn();}, 1)
}


//retrieves chosen suit
retrieveSuit = (suit) => {
    let retrieved;
    for (let i = 0; i < removedCards.length; i++) {
        if (removedCards[i].includes(`${suit}`)) {
            retrieved = removedCards.splice(i, 1);
            deck.push(retrieved[0]);
            moveCardIn();
            i--
        }

    }
    card.src = `img/${deck[0]}.png`;
    countCards();
    retrieveBacks();
}

countCards = () => {
    cardCount.innerHTML = `Cards: ${deck.length}`;
}


pushDeck();
card.src = `img/${deck[0]}.png`
