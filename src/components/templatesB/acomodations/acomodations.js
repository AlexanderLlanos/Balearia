import { accommodationMap } from '../../../js/mappers/accommodation.map';

import a11n from '../../../assets/data/accommodations.json';

const res = accommodationMap.toDomain(a11n);

const boxRadio = () => {
  document.querySelectorAll('.box-radio').forEach((box) => {
    box.querySelector('input').addEventListener('click', () => {
      if ((document.querySelector('.show-card').style.display == 'none') == true) {
        document.querySelector('.show-card').style.display = 'flex';
        document.querySelector('.show-card').nextElementSibling.style.display = 'flex';
      } else {
        document.querySelector('.show-card').style.display = 'none';
        document.querySelector('.show-card').nextElementSibling.style.display = 'none';
      }

      //.style.display = "none"
      //box.classList.toggle('active');
    });
  });
};

const cleanSwiper = () => {
  document
    .querySelector('.going')
    .querySelector('div')
    .querySelector('div')
    .querySelector('.swiper-wrapper')
    .querySelectorAll('.swiper-slide')
    .forEach((slide) => {
      slide.classList.remove('swiper-slide-active');
    });
};

const _showBoxTag = (e) => {
  const menu = e.target.closest('.js-discount');
  const discountDetail = menu.querySelector('.js-discount-detail')?.innerHTML;

  if (menu) {
    const discount = parseInt(menu.getAttribute('data-discount'));
    if (discount > 0) {
      document.querySelectorAll('.js-box-discount').forEach((box) => {
        box.querySelector('.js-amount-discount').innerHTML = discount + ' %';
        box.setAttribute('style', 'display:block');
      });

      document.querySelector('.js-discount-detail').innerHTML = discountDetail;
    } else {
      document.querySelectorAll('.js-box-discount').forEach((box) => {
        box.setAttribute('style', 'display:none');
      });
      document.querySelector('.js-discount-detail').innerHTML = 'Sin descuento';
    }
  }
};

const _showDetail = (e) => {
  const btnViewInboundDetail = e.target?.closest('.js-details-in-btn');
  const btnViewOutboundDetail = e.target?.closest('.js-details-out-btn');

  if (!!btnViewInboundDetail) {
    const contentInboundDetail = btnViewInboundDetail.closest('.js-travel-box')?.querySelector('.js-details-list');
    contentInboundDetail.classList.toggle('active');

    return;
  }

  if (!!btnViewOutboundDetail) {
    const contentOutboundDetail = btnViewOutboundDetail.closest('.js-travel-box')?.querySelector('.js-details-list');
    contentOutboundDetail.classList.toggle('active');
  }
};

const init = () => {
  if (document.querySelector('.going')) {
    const swiper = document
      .querySelector('.going')
      .querySelector('div')
      .querySelector('div')
      .querySelector('.swiper-wrapper')
      .querySelectorAll('.swiper-slide')
      .forEach((slide) => {
        slide.addEventListener('click', () => {
          cleanSwiper();
          slide.classList.add('swiper-slide-active');
        });
      });
  }

  document.querySelector('.js-nav')?.addEventListener('click', _showDetail, true);

  const dropDownDiscount = document.querySelector('.js-dropDown-discount');

  dropDownDiscount?.addEventListener('click', _showBoxTag, true);
};

boxRadio();

export default init;
