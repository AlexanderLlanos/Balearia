import Swiper from 'swiper/swiper-bundle';
import { Tabs } from '../../../js/tabs';

export default function () {
  var swiper = new Swiper('.mySwiperReservas', {
    slidesPerView: 2,
    spaceBetween: 16,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      '@0.85': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
  const subMenu = Tabs({
    elem: '.js-tabs-submenu',
    contentClass: '.js-tabs-submenu__content',
    titleClass: '.js-tabs-submenu__title',
  });
  subMenu?.init();
  const tabsReserva = Tabs({ elem: '.js-tabs-reservas' });
  tabsReserva?.init();

  const activeClass = 'active';

  const _setClassToActive = function (classToActive) {
    document.querySelectorAll('.g-nav-vertical--item').forEach((e) => {
      console.log(e);
      if (e.classList.contains(classToActive) === true) {
        e.classList.add(activeClass);
      } else {
        e.classList.remove(activeClass);
      }
    });
  };

  const _scrollToFlexibility = function () {
    document.querySelector('.js-flexibility')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToFlexibility');
  };

  const _scrollToAcomodation = function () {
    document.querySelector('.js-accomodation')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToAcomodation');
  };

  const _scrollToPet = function () {
    console.log('scroll to pets');
    document.querySelector('.js-pets')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToPet');
  };

  const _scrollToFood = function () {
    document.querySelector('.js-food')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToFood');
  };

  const _scrollToInsurance = function () {
    document.querySelector('.js-security')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToInsurance');
  };

  const _scrollToExperience = function () {
    document.querySelector('.js-experience')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToExperience');
  };

  const _scrollToBus = function () {
    document.querySelector('.js-bus')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToBus');
  };

  const _scrollToTouristBus = function () {
    document.querySelector('.js-touristBus')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToTouristBus');
  };

  const _scrollToParking = function () {
    document.querySelector('.js-parking')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToParking');
  };

  const _scrollToRentCar = function () {
    document.querySelector('.js-rentCar')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToRentCar');
  };

  const _scrollToLand = function () {
    document.querySelector('.js-land')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    _setClassToActive('js-scrollToLand');
  };

  const sections = document.querySelectorAll('section');
  const navLi = document.querySelectorAll('.g-nav-vertical ul li');

  window.onscroll = () => {
    var current = '';

    console.log(sections);
    console.log(navLi);

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });

    navLi.forEach((li) => {
      console.log(li.childNodes[1]);
      li.childNodes[1]?.classList.remove('active');
      if (li.childNodes[1]?.classList.contains(current)) {
        li.childNodes[1]?.classList.add('active');
      }
    });
  };

  const init = () => {
    console.log('init');

    document.querySelector('.js-scrollToFlexibility')?.addEventListener('click', _scrollToFlexibility, true);
    document.querySelector('.js-scrollToAcomodation')?.addEventListener('click', _scrollToAcomodation, true);
    document.querySelector('.js-scrollToPet')?.addEventListener('click', _scrollToPet, true);
    document.querySelector('.js-scrollToFood')?.addEventListener('click', _scrollToFood, true);
    document.querySelector('.js-scrollToInsurance')?.addEventListener('click', _scrollToInsurance, true);
    document.querySelector('.js-scrollToExperience')?.addEventListener('click', _scrollToExperience, true);
    document.querySelector('.js-scrollToBus')?.addEventListener('click', _scrollToBus, true);
    document.querySelector('.js-scrollToTouristBus')?.addEventListener('click', _scrollToTouristBus, true);
    document.querySelector('.js-scrollToParking')?.addEventListener('click', _scrollToParking, true);
    document.querySelector('.js-scrollToRentCar')?.addEventListener('click', _scrollToRentCar, true);
    document.querySelector('.js-scrollToLand')?.addEventListener('click', _scrollToLand, true);
  };

  return {
    init,
  };
}
