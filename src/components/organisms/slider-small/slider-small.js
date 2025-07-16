import Swiper from 'swiper/swiper-bundle';

var swiper, swiper2;

export function newSwiper() {
  swiper = new Swiper('.mySwiperCalendar2', {
    navigation: {
      nextEl: '#js-going--next',
      prevEl: '#js-going--prev',
    },
    slidesPerView: 7,
    centeredSlides: true,
    spaceBetween: 0,
    slideToClickedSlide: true,

    breakpoints: {
      0: {
        slidesPerView: 4,
        spaceBetween: 0,
        slidesPerGroup: 1,
        centeredSlides: true,
      },
      992: {
        slidesPerView: 7,
        spaceBetween: 0,
        slidesPerGroup: 1,
      },
    },
  });

  swiper2 = new Swiper('.js-return-dates', {
    navigation: {
      nextEl: '#js-return--next',
      prevEl: '#js-return--prev',
    },
    slidesPerView: 7,
    centeredSlides: true,
    spaceBetween: 0,
    slideToClickedSlide: true,

    breakpoints: {
      0: {
        slidesPerView: 4,
        spaceBetween: 0,
        slidesPerGroup: 1,
        centeredSlides: true,
      },
      992: {
        slidesPerView: 7,
        spaceBetween: 0,
        slidesPerGroup: 1,
      },
    },
  });
}

export function transitionEnd() {
  swiper?.on('click', function (e) {
    swiper.$el[0].swiper.slides.forEach((element, index) => {
      element.className = swiper.clickedIndex === index ? 'swiper-slide-active' : 'swiper-slide';
    });
  });
  swiper2?.on('click', function (e) {
    swiper2.$el[0].swiper.slides.forEach((element, index) => {
      element.className = swiper2.clickedIndex === index ? 'swiper-slide-active' : 'swiper-slide';
    });
  });
}
