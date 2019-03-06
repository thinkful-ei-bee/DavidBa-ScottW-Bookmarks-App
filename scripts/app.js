'use strict';
/* global store, item */

// eslint-disable-next-line no-unused-vars
const app = (function() {



  function render() {

    if (store.isAdding) {
      $('#js-main-buttons').addClass('hidden');
      $('.js-adding-item-container').removeClass('hidden');
      //insert add bookmark html
    }
  }

  function handleAddBookmark() {
    $('.js-add-bookmark').on('click', () => {
      store.toggleIsAdding();
      render();
    });
  }

  function handleSubmitNewBookmark() {
    $('.js-adding-item-container').on('click', '#js-submit-bookmark', (event) => {
      event.preventDefault();

      const title = $('#js-set-title').val();
      const url = $('#js-set-url').val();
      const desc = $('#js-set-desc').val();
      const rating = $('input[name=js-set-rating]:checked', '.set-rating').val();

      const newItem = item.create(title, url, desc, rating);
      store.addItem(newItem);
      store.toggleIsAdding();
      render();
    });
  }











  function bindEventListeners() {
    handleAddBookmark();
    handleSubmitNewBookmark();
  }
  return {
    render,
    bindEventListeners
  };
 
})();


const dropDownRating = () => {
  document.getElementById('js-myDropdown').classList.toggle('show');
};

window.onclick = function (e) {
  if (!e.target.matches('.js-dropbtn')) {
    let dropdowns = document.getElementsByClassName('js-dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

