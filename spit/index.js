var rowDom = {};
rowDom.top = document.querySelector('#topRow');
rowDom.middle = document.querySelector('#middleRow');
rowDom.bottom = document.querySelector('#bottomRow');



var piles = generatePiles();


startRound();

setupOnTap();

setTimeout(function(){
  organiseAllCards();
}, INITIAL_ORGANISE_WAIT);

piles.middle.left.moveTopCardToTopOf(piles.middle.middleLeft);
piles.middle.right.moveTopCardToTopOf(piles.middle.middleRight);