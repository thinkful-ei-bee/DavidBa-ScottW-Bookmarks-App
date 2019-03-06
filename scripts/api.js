'use strict';

const api = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/davidba-scottw/bookmarks';

  const getBookmarks = function(){
    return fetch(BASE_URL);
  };

  const createBookmark = function(newItem){
    const newBookmark = JSON.stringify(newItem);

    return fetch(BASE_URL, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: newBookmark,
    });
  };

  const deleteBookmark = function(id){
    return fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  };


  return {
    getBookmarks,
    createBookmark,
    deleteBookmark
  };

})();