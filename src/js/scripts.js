import Swiper from 'swiper/swiper-bundle';

import banner from '../components/organisms/banner/banner';
import slider from '../components/organisms/slider/slider';
import { newSwiper, transitionEnd } from '../components/organisms/slider-small/slider-small';
import header from '../components/organisms/header/header';
import search from '../components/organisms/search/search';
import paymentBox from '../components/organisms/box-payment/box-payment';
import accordion from '../components/molecules/accordion/accordion';
import accordionMultiple from '../components/molecules/accordion/accordion-multiple';
import accountant from '../components/molecules/accountant/accountant';
import acomodations from '../components/templates/acomodations/acomodations';
import acomodationsOpenShedule from '../components/templates/acomodations-open-schedule/acomodations-open-schedule';
import dropdown from '../components/molecules/dropdown/dropdown';
import MicroModal from 'micromodal';
import modal from '../components/molecules/modal/modal';
import { Tabs } from './tabs';
import { Accommodation } from './accommodation';
import { extrasPage } from '../components/templates/extras/extras.page';
import { Extras } from './extras';
import reservas from '../components/templates/reservas/reservas';
import destinos from '../components/templates/destinos-lista/destinos';
import managementReserve from '../components/formentera/management-reserve/management-reserve';
import checkout from '../components/templates/checkout/checkout';
import formentera from '../components/formentera/formentera';
import home from '../components/templates/home/home';

const initScripts = () => {
  header();
  banner();
  checkout();
  paymentBox();
  slider();
  newSwiper();
  transitionEnd();
  formentera();
  search();
  accountant();
  accordion();
  accordionMultiple();
  dropdown();
  acomodations();
  acomodationsOpenShedule();
  modal();
  reservas();
  destinos();
  managementReserve();
  home();

  const loginHeader = Tabs({ elem: '.js-tabs-header' });
  loginHeader?.init();
  const loginCheckout = Tabs({ elem: '.js-login-checkout-tabs' });
  loginCheckout?.init();
  const a11nGoing = Accommodation({
    elem: '.js-a11n-going',
  });
  const a11nGoingMobile = Accommodation({
    elem: '.js-a11n-going-mobile',
  });
  a11nGoing?.init();
  a11nGoingMobile?.init();
  const a11nReturn = Accommodation({
    elem: '.js-a11n-return',
  });
  a11nReturn?.init();
  const a11nReturnMobile = Accommodation({
    elem: '.js-a11n-return-mobile',
  });
  a11nReturnMobile?.init();

  extrasPage().init();
  Extras({
    parentClass: '.js-extras',
    additionalClass: '.js-additional',
  }).init();
};

document.addEventListener('DOMContentLoaded', function () {
  try {
    MicroModal.init({
      awaitCloseAnimation: true,
      onShow: function (modal) {
        document.querySelector('body').style.overflow = 'hidden';
        console.log('micromodal open');
        const loginTabs = Tabs({
          elem: '.js-login-tabs',
        });
        loginTabs?.init();
        var sliderShip = document.querySelector('.mySwiperBoat');
        if (sliderShip) {
          var swiper = new Swiper('.mySwiperBoat', {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        }

        const facturaAutonomoTabs = Tabs({
          elem: '.js-factura-autonomo-tabs',
        });
        facturaAutonomoTabs?.init();

        const facturaVentajaTabs = Tabs({
          elem: '.js-tabs-ventaja',
        });
        facturaVentajaTabs?.init();
        if (modal.classList.contains('js-modal-mobile') && window.innerWidth >= 992) {
          document.getElementById(modal.id).classList.remove('is-open');
          document.querySelector('body').style.overflow = 'visible';
        }
      },
      onClose: function (modal) {
        document.querySelector('body').style.overflow = 'visible';
        console.log('micromodal close');
      },
    });
  } catch (e) {
    console.log('micromodal error: ', e);
  }
});

export default initScripts;

var lastScrollTop = 0;

window.addEventListener(
  'scroll',
  function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      document.getElementById('header') && document.getElementById('header').classList.add('active');
      document.querySelector('.duble-header')?.classList.add('scrolled');
      document.querySelector('.g-nav-sticky')?.classList.add('scrolled');
      document.querySelector('.js-title-section-sticky')?.classList.add('scrolled');
      document.querySelector('.js-tabs-section-sticky')?.classList.add('scrolled');
    } else {
      document.getElementById('header') && document.getElementById('header').classList.remove('active');
      document.querySelector('.duble-header')?.classList.remove('scrolled');
      document.querySelector('.g-nav-sticky')?.classList.remove('scrolled');
      document.querySelector('.js-title-section-sticky')?.classList.remove('scrolled');
      document.querySelector('.js-tabs-section-sticky')?.classList.remove('scrolled');
    }
    lastScrollTop = st <= 0 ? 0 : st;
  },
  false,
);
