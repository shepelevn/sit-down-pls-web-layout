import htmlToDom from "../functions/htmlToDom.js";

(() => {
  const MAX_FILTER_ITEM_COUNT = 7;

  // document.addEventListener('DOMContentLoaded', initFilters);
  initFilters();

  function initFilters() {
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');

    for (const dropdown of filterDropdowns) {
      initFilterDropdown(dropdown);

      dropdown.onHide = () => {
        contractFilter(dropdown);
      }
    }
  }

  function initFilterDropdown(dropdown) {
    const items = dropdown.querySelectorAll('.filter-dropdown__label');

    if (items.length > MAX_FILTER_ITEM_COUNT + 1) {
      const moreButton = htmlToDom(`
        <button class="filter-dropdown__more underline-button">
          + ещё ${items.length - MAX_FILTER_ITEM_COUNT}
        </button>
      `);

      moreButton.addEventListener('click', () => {
        expandFilter(dropdown);
      })

      const dropdownContent = dropdown.querySelector('.filter-dropdown__content');
      dropdownContent.appendChild(moreButton);

      for (const [index, item] of Object.entries(items)) {
        if (index >= MAX_FILTER_ITEM_COUNT) {
          item.classList.add('filter-dropdown__label_hidden', 'filter-dropdown__label_extra');
        }
      }
    }
  }

  function expandFilter(dropdown) {
    const contentDiv = dropdown.querySelector('.common-dropdown__content_dynamic');
    const moreButton = contentDiv.querySelector('.filter-dropdown__more');
    moreButton.classList.add('filter-dropdown__more_hidden');

    const items = dropdown.querySelectorAll('.filter-dropdown__label_extra');

    for (const item of items) {
      item.classList.remove('filter-dropdown__label_hidden');
    }

    // The hacky way to update popper
    window.dispatchEvent(new CustomEvent('scroll'))
  }

  function contractFilter(dropdown) {
    const contentDiv = dropdown.querySelector('.common-dropdown__content_dynamic');
    const moreButton = contentDiv.querySelector('.filter-dropdown__more');
    if (moreButton)
      moreButton.classList.remove('filter-dropdown__more_hidden');

    const items = dropdown.querySelectorAll('.filter-dropdown__label_extra');

    for (const item of items) {
      item.classList.add('filter-dropdown__label_hidden');
    }
  }
})();
