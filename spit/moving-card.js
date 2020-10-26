class MovingCard {
  constructor(content, startPile, endPile, faceUp) {
    this.startPile = startPile;
    this.endPile = endPile;
    this.content = content.slice();
    this.faceUp = faceUp;

    this.startX;
    this.startY;
    this.endX;
    this.endY;
    this.findCoordinates();

    this.cardDom;
    this.generateCardDom();

    this.startMoving();
  }

  generateCardDom() {
    let cardOptions = {
      content: this.content,
      numberOfCards: 1,
      parent: document.body,
      faceUp: this.faceUp,
      stackDown: true
    }
    this.cardDom = new Card(cardOptions);
  }

  findCoordinates() {
    let startCoords = this.findCoordinatesForElement(this.startPile);
    this.startX = startCoords.x
    this.startY = startCoords.y

    let endCoords = this.findCoordinatesForElement(this.endPile);
    this.endX = endCoords.x
    this.endY = endCoords.y
  }

  findCoordinatesForElement(pile) {
    let element = pile.cardDom.card;
    let boundBox = element.getBoundingClientRect();
    let extraBorderWidth = 0;
    if (pile.showStack && !pile.stackDown) {
      extraBorderWidth = (pile.cards.length*2)-3;
    }
    let left = boundBox.left;
    let top = boundBox.top + extraBorderWidth;
    return {x:left, y:top};
  }

  startMoving() {
    this.cardDom.card.style.margin = '0';
    this.cardDom.card.style.position = 'absolute';

    this.cardDom.card.style.left = this.startX + 'px';
    this.cardDom.card.style.top = this.startY + 'px';

    let tempThis = this;

    setTimeout(function() {
      tempThis.cardDom.card.style.left = tempThis.endX + 'px';
      tempThis.cardDom.card.style.top = tempThis.endY + 'px';
    }, 0);

    setTimeout(function() {
      tempThis.cardDom.delete();
    }, CARD_MOVE_DURATION);
  }
}