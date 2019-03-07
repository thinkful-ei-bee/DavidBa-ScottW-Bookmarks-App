'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function(){

  const addBookmarks = function(bookmarks){
    this.items = bookmarks;
  };

  const toggleIsAdding = function(){
    this.isAdding = !this.isAdding;
  };

  const setMinimum = function(newMinimum){
    this.minimum = newMinimum;
  };

  return {
    items: [],
    isAdding: false,
    minimum: 0,

    addBookmarks,
    toggleIsAdding,
    setMinimum,
  };
})();