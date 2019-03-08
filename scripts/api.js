'use strict';
/* global store app*/
// eslint-disable-next-line no-unused-vars


// fetching thinkful API
const api = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/davidba-scottw/bookmarks';

  const getBookmarks = function(){
    let error = null;
    return fetch(BASE_URL)
      .then (res => {
        if (!res.ok) {
          error = {code: res.status};
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          return app.handleErrors(error, data);
        }
        store.addBookmarks(data);
        app.render();
      })
    ;
  };


  // creating new bookmark
  const createBookmark = function(newItem){
    const newBookmark = JSON.stringify(newItem);

    return fetch(BASE_URL, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: newBookmark,
    });
  };


  // delete bookmark
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