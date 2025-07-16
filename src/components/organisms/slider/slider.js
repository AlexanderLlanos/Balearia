import Swiper from 'swiper/swiper-bundle';

export default function () {
  var swiper = new Swiper('.mySwiper2', {
    slidesPerView: 2,
    spaceBetween: 16,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      '@1.10': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      '@1.40': {
        slidesPerView: 4,
        spaceBetween: 26,
      },
    },
  });
}
