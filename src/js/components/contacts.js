(() => {

  document.addEventListener('DOMContentLoaded', initContacts);

  function initContacts() {

    const map = document.getElementById('map');
    const closeButton = document.querySelector('.contacts__close');
    const contactsDiv = document.querySelector('.contacts');

    map.addEventListener('click', showContacts);
    closeButton.addEventListener('click', hideContacts);

    // For keyboard controls
    contactsDiv.addEventListener('focusin', showContactsFast);
  }

  function showContactsFast() {
    const contactsDiv = document.querySelector('.contacts');

    contactsDiv.classList.add('contacts_visible');
    contactsDiv.classList.add('contacts_visible-fast');
  }
  function showContacts() {
    const contactsDiv = document.querySelector('.contacts');

    contactsDiv.classList.add('contacts_visible');
  }

  function hideContacts() {
    const contactsDiv = document.querySelector('.contacts');

    contactsDiv.classList.remove('contacts_visible');
    contactsDiv.classList.remove('contacts_visible-fast');
  }

})();
