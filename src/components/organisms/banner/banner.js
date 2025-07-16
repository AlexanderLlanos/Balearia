import Swiper from 'swiper/swiper-bundle';

export default function(){
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });
}