import Swiper from 'swiper/swiper-bundle';
import { Tabs } from '../../../js/tabs';

export default function () {
  /* const subMenu = Tabs({
    elem: '.js-tabs-submenu',
    contentClass: '.js-tabs-submenu__content',
    titleClass: '.js-tabs-submenu__title',
  });
  subMenu?.init();
  const tabsReserva = Tabs({ elem: '.js-tabs-reservas' });
  tabsReserva?.init(); */

  var swiper = new Swiper('.mobile-img-swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    },
    autoplay: {
      delay: 3500,
      //disableOnInteraction: false,
      autoplay: false,
    },
  });

  const tabAnchors = document.querySelector('.js-tabs-anchors');
  if (tabAnchors) {
    var anchors = [];
    anchors = tabAnchors?.querySelectorAll('.js-tablink__title');
    anchors?.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        let id = e.currentTarget.getAttribute('href');

        /* console.log(id);
        console.log(document.getElementById(id.replace('#', ''))); */
        let yOffset = -120;
        let y = document.getElementById(id.replace('#', '')).getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        if (window.scrollY != y) {
          setTimeout(() => {
            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 150);
        }
        //document.getElementById(id.replace('#',''))?.scrollIntoView({ top: 120, behavior: 'smooth' });
        anchors.forEach((alt_tab) => {
          alt_tab.classList.remove(activeClass);
        });
        tab.classList.add(activeClass);
      });
    });
  }

  //console.log(tabAnchors);

  const activeClass = 'active';

  const _setClassToActive = function (classToActive) {
    document.querySelectorAll('.g-nav-vertical-alternative--item').forEach((e) => {
      //console.log(e);
      if (e.classList.contains(classToActive) === true) {
        e.classList.add(activeClass);
      } else {
        e.classList.remove(activeClass);
      }
    });
  };
  const _toggleToCard = function (el, cardToActive) {
    //console.log(el);
    el.closest('.tabs')
      ?.querySelectorAll('.routes-card')
      .forEach((card) => {
        if (card.classList.contains(cardToActive) === true) {
          card.classList.add(activeClass);
        } else {
          card.classList.remove(activeClass);
        }
      });
  };

  const _toggleRouteFrom = function (e) {
    _toggleToCard(e.currentTarget, 'js-routes-from');
    _setClassToActive('js-toggle-routes-from');
  };

  const _toggleRouteTo = function (e) {
    _toggleToCard(e.currentTarget, 'js-routes-to');
    _setClassToActive('js-toggle-routes-to');
  };
  document.querySelector('.js-toggle-routes-from')?.addEventListener('click', (e) => _toggleRouteFrom(e), true);
  document.querySelector('.js-toggle-routes-to')?.addEventListener('click', (e) => _toggleRouteTo(e), true);

  if (document.querySelector('.tabs-section__buttons')) {
    document.addEventListener('scroll', () => {
      var scrollTop =
        window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
      if (window.innerWidth > 991) {
        if (scrollTop > 500) {
          document.querySelector('.tabs-section__buttons').classList.add(activeClass);
        } else {
          document.querySelector('.tabs-section__buttons').classList.remove(activeClass);
        }
      }
    });
  }
  if (document.querySelector('.c-bottom-price-layer')) {
    document.addEventListener('scroll', () => {
      var scrollTop =
        window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
      if (window.innerWidth < 992) {
        if (scrollTop > 300) {
          document.querySelector('.c-bottom-price-layer').classList.add(activeClass);
        } else {
          document.querySelector('.c-bottom-price-layer').classList.remove(activeClass);
        }
      }
    });
  }

  let copyLinks = Array(document.querySelectorAll('[data-trigger="copy-code"]'))[0];
  copyLinks.forEach((link) => {
    let codeContainer = link.parentNode.querySelector('[data-id="code"]');
    if (codeContainer) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        //console.log(codeContainer.dataset['code'])
        navigator.clipboard.writeText(codeContainer.dataset['code']);
      });
    }
  });
}
