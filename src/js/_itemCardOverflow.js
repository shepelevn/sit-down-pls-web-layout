(() => {
  document.addEventListener('DOMContentLoaded', initIndexOverflow);

  function initIndexOverflow() {
    addElements('.design__images', '.design__picture', 5);
  }

  function addElements(containerSelector, elementSelector, newElementsCount = 5) {
    const container = document.querySelector(containerSelector);
    const element = container.querySelector(elementSelector);

    for (let i = 0; i < newElementsCount; i++) {
      container.appendChild(element.cloneNode(true));
    }
  }

})();
