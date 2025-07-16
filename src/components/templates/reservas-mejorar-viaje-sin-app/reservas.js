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
}
