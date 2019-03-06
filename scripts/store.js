'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function(){

  const addItem = function(item){
    this.items.push(item);
  };

  const findAndDelete = function(id){
    this.items = this.items.filter(item => item.id !== id);
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

    addItem,
    findAndDelete,
    toggleIsAdding,
    setMinimum,
  };
})();