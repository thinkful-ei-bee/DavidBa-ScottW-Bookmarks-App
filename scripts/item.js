'use strict';
/* global cuid store */
// eslint-disable-next-line no-unused-vars
const Item = (function(){

  const checkForUrl = function(url) {
    return store.items.filter(item => item.url === url);
  };

  const validateUrl = function() {
    if (checkForUrl) {
      throw new TypeError('bookmark allready exists');
    }
  };

  const create = function(title, url, desc, rating) {
    return {
      id: cuid(),
      title,
      url,
      desc,
      rating
    };
  };

  return {
    create,
    validateUrl,
  };

})();