'use strict';
/* global store, Item, api, cuid */

// eslint-disable-next-line no-unused-vars
const app = (function () {

  // generating dom element for our bookmarks
  function generateBookmarkEl(item) {

    return `<div class='bookmark bookmark-border'>
    <div class='bookmarkTitle'>
      <span class='ratings bookmark-rating'>Rating:${item.rating}</span>
      <span>${item.title}</span>
      <span class='delete-container'>
        <button id='js-delete-btn' data-id="${item.id}">x</button>
      </span>
    </div>
      
    <p>${item.desc}</p>
    <h5><a>${item.url}</a></h5>
  
    </div>`;
  }

  // mapping through store items to call generateBookmarkEl(item)
  function generateBookmarkString() {
    
    const filteredArray = store.items.filter(
      item => item.rating >= store.minimum
    );

    const bookmarkArray = filteredArray.map(item => 
      generateBookmarkEl(item)
    );
    return bookmarkArray.join('');
    
  }

  function render() {

    if (store.isAdding) {
      $('#js-add-btn').addClass('hidden');
      $('.js-adding-item-container').removeClass('hidden');
    
    } else if (!store.isAdding) {
      $('#js-add-btn').removeClass('hidden');
      $('.js-adding-item-container').addClass('hidden');
    }
    const bookmarkString = generateBookmarkString();
    $('.bookmark-container').html(bookmarkString);

    console.log('rendered!');
  }
      



  function handleAddBookmark() {
    $('.js-add-bookmark').on('click', () => {
      store.toggleIsAdding();
      render();
    });
  }

  function clearInputFields() {
    $('#js-set-title').val('');
    $('#js-set-url').val('');
    $('#js-set-desc').val('');
    $('input[name=js-set-rating]').prop('checked',false);

  }

  // submit handler for bookmark submit
  function handleSubmitNewBookmark() {
    $('.js-adding-item-container').on('click', '#js-submit-bookmark', (event) => {
      event.preventDefault();

      const newItem = {
        
        title: $('#js-set-title').val(),
        url: $('#js-set-url').val(),
        desc: $('#js-set-desc').val(),
        rating: $('input[name=js-set-rating]:checked', '.set-rating').val()
        
      };
      //trying something for error handling
      let error = null;
      api.createBookmark(newItem)
        .then(res => {
          if (!res.ok) {
            error = {code: res.status};
          }
          return res.json();
        })
        .then(data => {
          if (error) {
            error.message = data.message;
            alert(error.message);
            return Promise.reject(error);
          }
          store.toggleIsAdding();
          clearInputFields();
          api.getBookmarks();
        });
    });
  }

  function handleDeleteBookmark() {
    $('.bookmark-container').on('click', '#js-delete-btn', () => {
      const id = $('#js-delete-btn').data('id');
      let error = null;
      api.deleteBookmark(id)
        .then(res => {
          if (!res.ok) {
            error = {code: res.status};
          }
          return res.json();
        })
        .then(data => {
          if (error) {
            error.message = data.message;
            alert(error.message);
            return Promise.reject(error);
          }
          api.getBookmarks();
        });
    });
  }

  function handleCancelSubmit() {
    $('#js-cancel-submit').click(function(){
      store.toggleIsAdding();
      clearInputFields();
      render();
    });
  }

  function handleFilterItems() {
    $('#js-filter-ratings').change(function(){
      store.setMinimum($('#js-filter-ratings').val());
      render();
    });
  }










  function bindEventListeners() {
    handleAddBookmark();
    handleSubmitNewBookmark();
    handleDeleteBookmark();
    handleCancelSubmit();
    handleFilterItems();
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
