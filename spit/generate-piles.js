function generatePiles() {
  var piles = {
    top: {},
    middle: {},
    bottom: {}
  };
  let playersCards = splitCardsIntoTwoPiles();
  let topPlayersCards = playersCards[0];
  let bottomPlayersCards = playersCards[1];

  piles.top.left = new Pile([], rowDom.top, 'top', pileOptions.top);
  piles.top.middleLeft = new Pile([], rowDom.top, 'top', pileOptions.top);
  piles.top.middleRight = new Pile([], rowDom.top, 'top', pileOptions.top);
  piles.top.right = new Pile([], rowDom.top, 'top', pileOptions.top);

  piles.middle.left = new Pile(bottomPlayersCards, rowDom.middle, 'middle', pileOptions.middleLeft);
  piles.middle.middleLeft = new Pile([], rowDom.middle, 'middle', pileOptions.middleMiddleLeft);
  piles.middle.middleRight = new Pile([], rowDom.middle, 'middle', pileOptions.middleMiddleRight);
  piles.middle.right = new Pile(topPlayersCards, rowDom.middle, 'middle', pileOptions.middleRight);

  piles.bottom.left = new Pile([], rowDom.bottom, 'bottom', pileOptions.bottom);
  piles.bottom.middleLeft = new Pile([], rowDom.bottom, 'bottom', pileOptions.bottom);
  piles.bottom.middleRight = new Pile([], rowDom.bottom, 'bottom', pileOptions.bottom);
  piles.bottom.right = new Pile([], rowDom.bottom, 'bottom', pileOptions.bottom);

  return piles;
}

function splitCardsIntoTwoPiles() {
  let cards = 'A 2 3 4 5 6 7 8 9 10 J Q K '.repeat(4).split(' ').slice(0, 52);
  let shuffledCards = shuffleArray(cards);
  let playersCards = [
    cards.slice(0, 26),
    cards.slice(26, 52)
  ]
  return playersCards;
}