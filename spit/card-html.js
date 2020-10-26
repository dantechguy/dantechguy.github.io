class Card {
  constructor(options) {
    this.content = options.content;
    this.numberOfCards = options.numberOfCards;
    this.parent = options.parent;
    this.faceUp = options.faceUp;
    this.stackDown = options.stackDown;

    this.generateHtmlElements();
    if (this.faceUp) {
      this.updateContent();
    };
    this.updateCardStackHeight();
  }

  setContent(content) {
    this.content = content;
    if (this.faceUp) {
      this.updateContent();
    };
  }

  setNumberOfCards(numberOfCards) {
    this.numberOfCards = numberOfCards;
    this.updateCardStackHeight();
  }

  generateHtmlElements() {
    if (this.faceUp) {
      this.generateFaceUpHtmlElements();
    } else {
      this.generateFaceDownHtmlElements();
    };
  }

  generateFaceUpHtmlElements() {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    // if (this.stackDown) {
    //   this.card.style.verticalAlign = 'bottom';
    // } else {
    //   this.card.style.verticalAlign = 'top';
    // }; 
    this.cardTop = document.createElement('div');
    this.cardTop.classList.add('card-top');
    this.cardBottom = document.createElement('div');
    this.cardBottom.classList.add('card-bottom');
    this.card.appendChild(this.cardTop);
    this.card.appendChild(this.cardBottom);
    this.parent.appendChild(this.card);
  }

  generateFaceDownHtmlElements() {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.style.backgroundColor = '#666';
    this.parent.appendChild(this.card);
  }

  updateContent() {
    let topCardValue = this.content;
    this.cardTop.textContent = topCardValue;
    this.cardBottom.textContent = topCardValue;
  }

  updateCardStackHeight() {
    if (this.stackDown) {
      this.card.style.borderBottomWidth = (3+(this.numberOfCards * 2)) + 'px';
    } else {
      this.card.style.borderTopWidth = (3+(this.numberOfCards * 2)) + 'px';
    };
  }

  hide() {
    this.card.style.visibility = 'hidden';
  }

  show() {
    this.card.style.visibility = 'visible';
  }

  enableCooldown() {
    this.card.classList.add('cooldown');
  }

  disableCooldown() {
    this.card.classList.remove('cooldown');
  }

  delete() {
    this.parent.removeChild(this.card);
  }
}