(() => {
  document.addEventListener('DOMContentLoaded', initTopCatalog);

  let openedPage = 0;

  function initTopCatalog() {
    window.addEventListener('resize', updateCatalogCards);

    updateCatalogCards();

    const moreButton = document.getElementById('top-catalog-more');
    moreButton.addEventListener('click', showMoreCatalogCards);
  }

  function showMoreCatalogCards() {
    openedPage += 1;

    updateCatalogCards();
  }

  function updateCatalogCards() {
    const catalogSection = document.querySelector('.top-catalog');
    const cards = catalogSection.querySelectorAll('.catalog-list__item');

    const gridColumnCount = getCatalogColumnCount();
    const gridRowsCount = getCatalogRowCount();

    let allCardsShown = true;

    for (const [index, card] of Object.entries(cards)) {
      if (index >= (openedPage + 1) * gridColumnCount * gridRowsCount) {
        card.classList.add('catalog-list__item_hidden');
        allCardsShown = false;
      }
      else
        card.classList.remove('catalog-list__item_hidden');
    }

    if (allCardsShown) {
      hideCatalogButton();
    }
  }

  function hideCatalogButton() {
    const moreButton = document.getElementById('top-catalog-more');
    moreButton.classList.add('top-catalog__more_hidden');
  }

  function getCatalogColumnCount() {
    const catalogList = document.querySelector('.catalog-list');
    const gridComputedStyle = window.getComputedStyle(catalogList);
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

    return gridColumnCount;
  }

  function getCatalogRowCount() {
    if (window.innerWidth < 992) return 3;

    return 2;
  }

})();
