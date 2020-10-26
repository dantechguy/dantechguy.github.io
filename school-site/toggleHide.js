function setupToggle() {
  triggerElements = document.querySelectorAll('a[data-toggle-on][data-toggle-selector]');
  triggerElements.forEach(triggerElement => {
    triggerElement.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        toggleElementOn(triggerElement); // must come before, since changing 'toggleOn' state
        toggleHiddenChildren(triggerElement);
      }
    );
  });
}

function toggleElementOn(element) {
    if (element.dataset.toggleOn === 'true') {
      element.dataset.toggleOn = 'false';
    } else {
      element.dataset.toggleOn = 'true';
    }
}

function toggleHiddenChildren(triggerElement) {
  let selector = triggerElement.dataset.toggleSelector;
  let on = triggerElement.dataset.toggleOn === 'true';
  let stagger = triggerElement.dataset.toggleStagger || 0;
  let selected = Array.from(document.querySelectorAll(selector));
  if (on) {
    selected.reverse()
  };
  let index = 0;
  selected.forEach( (element) => {
    let previousHiddenParents = parseInt(element.dataset.hiddenParents);
    let currentHiddenParents = parseInt(element.dataset.hiddenParents);
    let delay = stagger * index;
    if (on) {  // if on, we need to add 1
      currentHiddenParents++;
      setTimeout(
        () => {
          element.dataset.hiddenParents = parseInt(element.dataset.hiddenParents) + 1;
        },
        delay,
      );
    } else { // if off, we need to remove 1
      currentHiddenParents--;
      setTimeout(
        () => {
          element.dataset.hiddenParents = parseInt(element.dataset.hiddenParents) - 1;
        },
        delay,
      );
    }
    let previousShow = previousHiddenParents === 0;
    let currentShow = currentHiddenParents === 0;
    let changeShow = previousShow !== currentShow
    if (changeShow) {
      index ++;
    }
  });
}

setupToggle();
