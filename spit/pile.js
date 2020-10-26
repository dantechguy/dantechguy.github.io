class Pile {
  constructor(cards, domParent, side, options) {
    // an array. first item is on top
    this.cards = cards;
    this.parent = domParent;
    this.faceUp = options.faceUp;
    this.showStack = options.showStack;
    this.stackDown = options.stackDown;
    this.side = side;

    let cardOptions = {
      content: this.cards[0],
      numberOfCards: this.cards.length,
      parent: this.parent,
      faceUp: this.faceUp,
      stackDown: this.stackDown
    }
    this.cardDom = new Card(cardOptions);
    this.onTap;
    this.updateDisplay();

    this.currentlyOnCooldown = false;
  }

  isEmpty() {
    return this.cards.length === 0;
  }

  hasCards() {
    return this.cards.length > 0;
  }

  topCard() {
    if (this.isEmpty()) {
      return false;
    } else {
      return this.cards[0];
    }
  }

  updateDisplay() {
    this.cardDom.setContent(this.topCard());
    this.cardDom.setNumberOfCards(this.cards.length);
    if (this.isEmpty()) {
      this.cardDom.hide();
    } else {
      this.cardDom.show();
    };
    
  }

  moveTopCardToTopOf(otherPile) {
    if (this.hasCards()) {
      this.createMovingCardOfTopCardTo(otherPile);
      let topCard = this.topCard();
      this.cards = this.cards.slice(1)
      otherPile.cards.splice(0, 0, topCard);
      this.updateDisplay();
      setTimeout(function(){
        otherPile.updateDisplay();
      }, CARD_MOVE_DURATION);
    };
  }

  moveAllOfTheSameTopCardsToTopOf(otherPile) {
    let topCardValue = this.topCard();
    while (this.topCard() == topCardValue) {
      this.moveTopCardToTopOf(otherPile);
    }
  }

  moveTopCardToBottomOf(otherPile) {
    if (this.hasCards()) {
      this.createMovingCardOfTopCardTo(otherPile);
      let topCard = this.topCard();
      this.cards = this.cards.slice(1)
      this.otherPile.cards.push(topCard);
      this.updateDisplay();
      setTimeout(function(){
        otherPile.updateDisplay();
      }, CARD_MOVE_DURATION);
    };
  }

  createMovingCardOfTopCardTo(otherPile) {
    let content = this.topCard();
    let startPile = this;
    let endPile = otherPile;
    let faceUp = this.faceUp;
    let movingCard = new MovingCard(content, startPile, endPile, faceUp);
  }

  isPileOneBelowOrAbove(otherPile) {
    let cardConvertion = {
      'A': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
    }
    let topCard = cardConvertion[this.topCard()];
    let otherCard = cardConvertion[otherPile.topCard()];
    return (mod(topCard, 13)) === (otherCard - 1) || (mod(topCard-2, 13)) === (otherCard - 1);
  }

  startCooldown(time) {
    this.currentlyOnCooldown = true;
    this.cardDom.enableCooldown();
    let tempThis = this;
    setTimeout(function() {
      tempThis.currentlyOnCooldown = false;
      tempThis.cardDom.disableCooldown();
    }, time)
  }

  createOnTap(callback) {
    this.onTap = callback;
    let tempThis = this;
    this.cardDom.card.addEventListener('touchstart', function(event) {
      if (!tempThis.currentlyOnCooldown) {
        tempThis.onTap(tempThis);
      };
    });
  }
}