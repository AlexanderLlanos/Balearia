import Swiper from 'swiper/swiper-bundle';

export default function () {
  let mySwiper = new Swiper('.js-banner-features-home', {
    pagination: {
      loop: true,
      autoplay: {
        delay: 3500,
      },
      slidesPerView: 1,
      spaceBetween: 50,
      el: '.swiper-pagination',
      clickable: true,
      centeredSlides: true,
      renderBullet: function (index, className) {
        let element = document.querySelectorAll('.js-slide-home')[index].dataset;

        return `
          <div class="js-options--item options--item ${className}">
            <h4 class="pagination__title">${element?.title}</h4>
            <p class="pagination__description">${element?.description}</p>
            <div class="line"></div>
          </div>
        `;
      },
    },
  });

  const slider = document.querySelector('.js-slider-on-scroll');

  if (!slider) {
    return;
  }

  var observer = new IntersectionObserver(onIntersection, {
    root: null,
    threshold: 0.25,
  });

  function onIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slider--in-view');
      } else {
        entry.target.classList.remove('slider--in-view');
      }
    });
  }

  observer.observe(slider);
}
