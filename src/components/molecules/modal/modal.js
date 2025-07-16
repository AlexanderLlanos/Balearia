import MicroModal from 'micromodal';
import Swiper from 'swiper/swiper-bundle';

var boat, gallery;

export default function () {
  boat = new Swiper('.mySwiperBoat', {
    slidesPerView: 2,
    spaceBetween: 0,
    navigation: {
      nextEl: '#boat-button-next',
      prevEl: '#boat-button-prev',
    },
  });

  gallery = new Swiper('.mySwiperGallery', {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: '#gallery-button-next',
      prevEl: '#gallery-button-prev',
    },
  });

  document.querySelectorAll('[data-button="modal-btn-close"]').forEach((modalCloseButton) => {
    modalCloseButton.addEventListener('click', (e) => {
      e.preventDefault();
      MicroModal.close(modalCloseButton.closest('.micromodal-slide').id);
    });
  });
}
