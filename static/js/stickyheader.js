/*
[Hide Header on Scroll Down & Show on Scroll Up] by Abhinav
from https://codingreflections.com/hide-header-on-scroll-down/
*/

(function(){

  var doc = document.documentElement;
  var w = window;

  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  var header = document.getElementById('navbar');

  var checkScroll = function() {

    curScroll = w.scrollY || doc.scrollTop;
    if (navbar.classList.contains("time")) {
      // 햄버거 메뉴 전개
            direction = 1;
    }
    else if (curScroll > prevScroll) {
      //scrolled up
      direction = 2;
    }
    else if (curScroll < prevScroll) {
      //scrolled down
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  var toggleHeader = function(direction, curScroll) {
    if ((direction === 2 && curScroll > 43) && (window.innerWidth < 768)) {

      //replace 43 with the height of your header in px
      //break point에 따라 innerWidth를 다르게 설정하세요.

      header.classList.add('scroll-down');
      header.classList.remove('scroll-up');
      prevDirection = direction;
    }
    else if (direction === 1) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
      prevDirection = direction;
    }
  };

  window.addEventListener('scroll', checkScroll);

})();
