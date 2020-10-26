

function setupOnTap() {
  piles.top.left.createOnTap(topAndBottomOnTap);
  piles.top.middleLeft.createOnTap(topAndBottomOnTap);
  piles.top.middleRight.createOnTap(topAndBottomOnTap);
  piles.top.right.createOnTap(topAndBottomOnTap);
  piles.bottom.left.createOnTap(topAndBottomOnTap);
  piles.bottom.middleLeft.createOnTap(topAndBottomOnTap);
  piles.bottom.middleRight.createOnTap(topAndBottomOnTap);
  piles.bottom.right.createOnTap(topAndBottomOnTap);
}

function topAndBottomOnTap(pile) {
  let targetPile = findTargetPile(pile);
  if (targetPile === false) {

    let sideToRowCooldown = {
      'bottom': piles.bottom,
      'top': piles.top
    }
    let rowToCooldown = sideToRowCooldown[pile.side];
    for (pileObjectKey in rowToCooldown) {

      let pileObject = rowToCooldown[pileObjectKey];
      pileObject.startCooldown(FAIL_COOLDOWN_DURATION);
    };

  } else {
    pile.moveTopCardToTopOf(targetPile);

    var sideToRow = {
      'top': piles.top,
      'middle': piles.middle,
      'bottom': piles.bottom
    }
    tryToOrganise(sideToRow[pile.side]);
  }
}

function findTargetPile(pile) {
  let topCard = pile.cards[0];
  let leftPileWorks = pile.isPileOneBelowOrAbove(piles.middle.middleLeft);
  let rightPileWorks = pile.isPileOneBelowOrAbove(piles.middle.middleRight);
  // both piles
  if (leftPileWorks && rightPileWorks) {
    let randomIndex = Math.floor(Math.random()*2);
    let leftOrRightPileArray = [piles.middle.middleLeft, piles.middle.middleRight];
    return leftOrRightPileArray[randomIndex];
  }
  // left pile
  else if (leftPileWorks) {
    return piles.middle.middleLeft;
  }
  // right pile
  else if (rightPileWorks) {
    return piles.middle.middleRight;
  }
  // neither pile
  else {
    return false;
  }
}