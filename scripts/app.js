'use strict';

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