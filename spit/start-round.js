/*
1 2 3 4 
9 - - 0
5 6 7 8
*/

var dealOrder;
var numberToPileConversion;

function startRound() {
  dealOrder = '0495039602970198039602970198029701980198';
  numberToPileConversion = {
    1: piles.top.left,
    2: piles.top.middleLeft,
    3: piles.top.middleRight,
    4: piles.top.right,
    5: piles.bottom.left,
    6: piles.bottom.middleLeft,
    7: piles.bottom.middleRight,
    8: piles.bottom.right,
    9: piles.middle.left,
    0: piles.middle.right
  }

  let dealingPileIndex = 0;
  dealIteration(dealingPileIndex);
    
}

function dealIteration(dealingPileIndex) {
  let receivingPileIndex = dealingPileIndex + 1;

  let dealingPileNumber = dealOrder[dealingPileIndex];
  let receivingPileNumber = dealOrder[receivingPileIndex];

  let dealingPile = numberToPileConversion[dealingPileNumber];
  let receivingPile = numberToPileConversion[receivingPileNumber];

  dealingPile.moveTopCardToTopOf(receivingPile);

  if (dealingPileIndex < dealOrder.length-2) {
    dealingPileIndex += 2;
    setTimeout(function() {
      dealIteration(dealingPileIndex);
    }, CARD_DEAL_DURATION);
  }
}