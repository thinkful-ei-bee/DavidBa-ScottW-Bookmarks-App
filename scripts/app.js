'use strict';
/* global store, Item */

// eslint-disable-next-line no-unused-vars
const app = (function () {

  // generating dom element for our bookmarks
  function generateBookmarkEl(item) {
    return `<div class='bookmark bookmark-border'>
    <div class='delete-btn'>
        <button id='js-delete-btn'>x</button>
    </div>
    <h2 class=''>${item.title}</h2>
    <p>${item.desc}</p>
    <h5><a>${item.url}</a></h5>
    <div>Rating:<span class='bookmark-rating'>${item.rating}</span></div>
    </div>`;
  }

  // mapping through store items to call generateBookmarkEl(item)
  function generateBookmarkString() {
    const bookmarkArray = store.items.map(item => 
      generateBookmarkEl(item)
    );
    return bookmarkArray.join('');
  }
  console.log(generateBookmarkString());

  function render() {
    if (store.isAdding) {
      $('#js-main-buttons').addClass('hidden');
      $('.js-adding-item-container').removeClass('hidden');
      //insert add bookmark html
    } else if (!store.isAdding) {
      $('#js-main-buttons').removeClass('hidden');
      $('.js-adding-item-container').addClass('hidden');
    }
    const bookmarkString = generateBookmarkString();
    $('.bookmark-container').html(bookmarkString);
  }



  function handleAddBookmark() {
    $('.js-add-bookmark').on('click', () => {
      store.toggleIsAdding();
      render();
    });
  }

  // submit handler for bookmark submit
  function handleSubmitNewBookmark() {
    $('.js-adding-item-container').on('click', '#js-submit-bookmark', (event) => {
      event.preventDefault();

      const title = $('#js-set-title').val();
      const url = $('#js-set-url').val();
      const desc = $('#js-set-desc').val();
      const rating = $('input[name=js-set-rating]:checked', '.set-rating').val();

      const newItem = Item.create(title, url, desc, rating);
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
    bindEventListeners,

    generateBookmarkEl,
    generateBookmarkString

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