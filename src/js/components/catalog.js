import htmlToDom from "../functions/htmlToDom.js";

(() => {
  const LIST_ROWS_COUNT = 3;

  let currentCatalogPage = 0;
  let currentCatalogButton;

  document.addEventListener('DOMContentLoaded', initCatalog);

  function initCatalog() {
    initPriceFilterSlider();
    initCatalogPagination();

    window.addEventListener('resize', updateCatalog)
    updateCatalog();
  }

  function initPriceFilterSlider() {
    const sliderDiv = document.getElementById('price-slider');

    const options = {};
    const min = 0;
    const max = 200 * 1000;
    options.start = [2000, 150 * 1000];
    options.margin = 1000;
    options.range = {
      'min': [min, 100],
      '30%': [(max - min) * 0.05, 1000],
      '60%': [(max - min) * 0.3, 1000],
      'max': [max, 1000],
    };

    createCommonRangeSlider(sliderDiv, options);
  }

  function initCatalogPagination() {
    const catalogList = document.querySelector('.catalog__list');
    const catalogCards = catalogList.querySelectorAll('.catalog-card');
    const buttonsCount = Math.ceil(catalogCards.length / LIST_ROWS_COUNT);

    const paginationDiv = document.getElementById('catalog-pagination');

    for (let i = 0; i < buttonsCount; i++) {
      const item = createPaginationItem(i);
      const button = item.querySelector('.common-pagination__button');

      if (i === currentCatalogPage) {
        button.classList.add('common-pagination__button_active');
        button.setAttribute('aria-selected', 'true');
        currentCatalogButton = button;
      }

      button.addEventListener('click', changeCurrentCatalogPage);

      paginationDiv.appendChild(item)
    }
  }

  function createPaginationItem(pageIndex) {
    return htmlToDom(`
      <li class="common-pagination__item">
        <button class="common-pagination__button" data-page="${pageIndex}" role="tab" aria-selected="false">
          ${pageIndex + 1}
        </button>
      </li>
    `);
  }

  function changeCurrentCatalogPage() {
    currentCatalogButton.classList.remove('common-pagination__button_active');
    currentCatalogButton.setAttribute('aria-selected', 'false');

    this.classList.add('common-pagination__button_active');
    this.setAttribute('aria-selected', 'true');

    currentCatalogButton = this;

    const newPage = parseInt(this.dataset.page);
    currentCatalogPage = newPage;

    updateCatalog();
  }

  function updateCatalog() {
    updateCatalogPagination();
    updateCatalogPages();
  }

  function updateCatalogPagination() {
    const catalogList = document.querySelector('.catalog__list');

    const gridComputedStyle = window.getComputedStyle(catalogList);
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

    const catalogCards = catalogList.querySelectorAll('.catalog-card');

    const maxButtonCount = Math.ceil(catalogCards.length / gridColumnCount / LIST_ROWS_COUNT);

    const paginationDiv = document.getElementById('catalog-pagination');
    const items = paginationDiv.querySelectorAll('.common-pagination__item');

    for (const [index, item] of Object.entries(items)) {
      if (index >= maxButtonCount)
        item.classList.add('common-pagination__item_hidden');
      else
        item.classList.remove('common-pagination__item_hidden');
    }

    if (currentCatalogPage >= maxButtonCount)
      currentCatalogPage = maxButtonCount - 1;
  }

  function updateCatalogPages() {
    const catalogList = document.querySelector('.catalog__list');

    const gridComputedStyle = window.getComputedStyle(catalogList);
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    const startIndex = currentCatalogPage * gridColumnCount * LIST_ROWS_COUNT;
    const endIndex = (currentCatalogPage + 1) * gridColumnCount * LIST_ROWS_COUNT;

    const catalogCards = catalogList.querySelectorAll('.catalog-card');

    for (const [index, catalogCard] of Object.entries(catalogCards)) {
      if ((index >= startIndex) && (index < endIndex))
        catalogCard.classList.remove('catalog-list__item_hidden');
      else
        catalogCard.classList.add('catalog-list__item_hidden');
    }
  }
})();
