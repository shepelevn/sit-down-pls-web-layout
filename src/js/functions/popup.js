export function popupInitElements(popupElement) {
  let interactiveElements = popupElement.querySelectorAll('a[href], button, input, textarea, select, details');

  for(let i = 0; i < interactiveElements.length; i++) {
    interactiveElements[i].savedTabIndex = interactiveElements[i].tabIndex;
  }
}

export function popupEnableAllInteractiveElements(popupElement, tabIndex) {
  let interactiveElements = popupElement.querySelectorAll('a[href], button, input, textarea, select, details');

  for(let i = 0; i < interactiveElements.length; i++) {
    if (tabIndex) {
      interactiveElements[i].tabIndex = tabIndex;
    }
    else {
      interactiveElements[i].tabIndex = interactiveElements[i].savedTabIndex;
    }
  }
}

export function popupDisableAllInteractiveElements(popupElement) {
  let interactiveElements = popupElement.querySelectorAll('a[href], button, input, textarea, select, details');

  for(let i = 0; i < interactiveElements.length; i++) {
    interactiveElements[i].tabIndex = -1;
  }
}

