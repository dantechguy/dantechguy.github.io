function organiseAllCards() {
  tryToOrganise(piles.top);
  tryToOrganise(piles.bottom);
}

function tryToOrganise(row) {
  let cardsWereStacked = true;
  // keep looping while changes have been made
  while (cardsWereStacked) {
    cardsWereStacked = stackEqualCardsAndReturnSuccess(row);
  }

  let emptyPilesWereFilled = true;
  // keep looping while changes have been made
  while (emptyPilesWereFilled) {
    emptyPilesWereFilled = moveCardsIntoEmptyPilesAndReturnSuccess(row);
  }

  let anyChangesMade = cardsWereStacked || emptyPilesWereFilled;

  if (anyChangesMade) {
    setTimeout(function() {
      tryToOrganise()
    }, 500);
  }

}

function stackEqualCardsAndReturnSuccess(row) {
  let pileKeys = Object.keys(row);

  // only uses the left three piles to send, as only moves cards to the right
  for (let sendPileKeyIndex=0; sendPileKeyIndex<pileKeys.length-1; sendPileKeyIndex++) {
    let sendPileKey = pileKeys[sendPileKeyIndex];
    let sendPile = row[sendPileKey];

    // only contains pile keys to the right of the send pile
    let testPileKeys = pileKeys.slice(sendPileKeyIndex+1);

    for (let testPileKeyIndex=0; testPileKeyIndex<testPileKeys.length; testPileKeyIndex++) {
      let testPileKey = testPileKeys[testPileKeyIndex];
      let testPile = row[testPileKey];

      let sendPileTopCard = sendPile.topCard();
      let testPileTopCard = testPile.topCard();

      let bothPilesAreEqual = sendPileTopCard == testPileTopCard;

      if (bothPilesAreEqual) {
        sendPile.moveAllOfTheSameTopCardsToTopOf(testPile);
        // a change was made
        return true;
      };
    }

  }
  // no changes were made
  return false;
}

function moveCardsIntoEmptyPilesAndReturnSuccess(row) {
  let pileKeys = Object.keys(row);

  // only uses the left three piles to send, as only moves cards to the right
  for (let sendPileKeyIndex=0; sendPileKeyIndex<pileKeys.length-1; sendPileKeyIndex++) {
    let sendPileKey = pileKeys[sendPileKeyIndex];
    let sendPile = row[sendPileKey];

    // only contains pile keys to the right of the send pile
    let testPileKeys = pileKeys.slice(sendPileKeyIndex+1);

    for (let testPileKeyIndex=0; testPileKeyIndex<testPileKeys.length; testPileKeyIndex++) {
      let testPileKey = testPileKeys[testPileKeyIndex];
      let testPile = row[testPileKey];

      let testPileTopCard = testPile.topCard();

      let testPileIsEmpty = testPile.isEmpty();

      if (testPileIsEmpty) {
        sendPile.moveAllOfTheSameTopCardsToTopOf(testPile);
        // a change was made
        return true;
      };
    }

  }
  // no changes were made
  return false;
}