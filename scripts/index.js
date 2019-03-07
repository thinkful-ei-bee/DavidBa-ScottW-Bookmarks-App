'use strict';
/* global api app*/

$(document).ready(function() {
  api.getBookmarks();
  app.bindEventListeners(); 
});