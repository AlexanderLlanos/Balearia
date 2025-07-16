import { accommodationMap } from '../../../js/mappers/accommodation.map';
import { extrasMap } from '../../../js/mappers/extras.map';
import dataExtras from '../../../assets/data/extras.json';
import dataAccommodation from '../../../assets/data/accommodations.json';

const respExtras = extrasMap.toDomain(dataExtras);
const respAcommodation = accommodationMap.toDomain(dataAccommodation);

let costOutbound, costInbound;
let costDiscount = {
  totalDiscount: 0,
  discount: {
    type: 'coupon',
    description: 'BALEARIA2020',
    percent: 20,
    amount: 0,
  },
};

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
  const discountDetail = menu.querySelector('.js-discount-detail')?.innerHTML || 'Sin descuento';

  if (menu) {
    const discount = parseInt(menu.getAttribute('data-discount'));

    if (discount > 0) {
      document.querySelectorAll('.js-box-discount').forEach((box) => {
        box.querySelector('.js-amount-discount').innerHTML = discount + ' %';
        box.setAttribute('style', 'display:block');
      });

      document.querySelector('.js-discount-detail').innerHTML = discountDetail;
      document
        .querySelector('.js-discount-detail')
        .setAttribute('data-total-discount', costDiscount.totalDiscount + '');
    } else {
      document.querySelectorAll('.js-box-discount').forEach((box) => {
        box.setAttribute('style', 'display:none');
      });
      document.querySelector('.js-discount-detail').innerHTML = discountDetail;
    }

    costDiscount.discount = {
      type: 'dropdownSection',
      description: discountDetail,
      percent: discount,
      amount: 0,
    };

    let outTotal = parseFloat(document.querySelector('.js-outbound')?.dataset?.outboundTotal) || 0;
    let inTotal = parseFloat(document.querySelector('.js-inbound')?.dataset?.inboundTotal) || 0;

    let total = outTotal + inTotal;

    costDiscount.totalDiscount = (total * (costDiscount.totalDiscount + discount)) / 100;
    costDiscount.discount.amount = (total * costDiscount.discount.percent) / 100;

    document.querySelector('.js-discount-detail').setAttribute('data-total-discount', discount + '');

    _setSectionDiscountToDropDown(document.querySelector('.js-discount-dp'));
    _setTotalCostToDropDown(document.querySelector('.js-outbound'), document.querySelector('.js-inbound'));
  }
};

const _showDetail = (e) => {
  const btnViewInboundDetail = e.target?.closest('.js-details-in-btn');
  const btnViewOutboundDetail = e.target?.closest('.js-details-out-btn');

  if (!!btnViewInboundDetail) {
    const contentInboundDetail = btnViewInboundDetail.closest('.js-travel-box')?.querySelector('.js-details-list');
    contentInboundDetail?.classList.toggle('active');

    return;
  }

  if (!!btnViewOutboundDetail) {
    const contentOutboundDetail = btnViewOutboundDetail.closest('.js-travel-box')?.querySelector('.js-details-list');
    contentOutboundDetail.classList.toggle('active');
  }
};

const _setCalendarScroll = () => {
  let parent = document.querySelector('.js-g-dropdown-click--mobile-content');
  let container = parent?.closest('.g-dropdown-click');
  let subheaderText = parent?.querySelector('.js-g-dropdown-click--current-month div');
  let calendarList = parent?.querySelector('.js-g-dropdown-click--calendar .litepicker .container__months');
  let firstMonthTitle = calendarList?.querySelector('.month-item .month-item-header div');
  let monthsArray = parent?.querySelectorAll('.month-item');
  if (parent) {
    subheaderText.innerHTML = firstMonthTitle.innerHTML;
    const mut = new MutationObserver((mutations, mut) => {
      if (container.classList.contains('active')) {
        monthsArray = parent.querySelectorAll('.month-item');
      }
    });
    mut.observe(container, {
      attributes: true,
    });
    parent?.addEventListener(
      'scroll',
      (e) => {
        monthsArray.forEach((month, index) => {
          if (
            month.getBoundingClientRect().top <= 49 &&
            parent.scrollTop >= month.getBoundingClientRect().height + month.getBoundingClientRect().top - 49
          ) {
            if (subheaderText.innerHTML != month.querySelector('.month-item-header div').innerHTML) {
              subheaderText.innerHTML = month.querySelector('.month-item-header div').innerHTML;
            }
          }
        });
      },
      true,
    );
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

  _setCalendarScroll();

  document.querySelector('.js-nav')?.addEventListener('click', _showDetail, true);

  const dropDownDiscount = document.querySelector('.js-dropDown-discount');

  dropDownDiscount?.addEventListener('click', _showBoxTag, true);

  if (document.querySelector('.js-ui-extras')) {
    _setResume();
  }
};

const _setResume = () => {
  costOutbound = JSON.parse(localStorage.getItem('costOutbound'));
  costInbound = JSON.parse(localStorage.getItem('costInbound'));

  if (!costOutbound || !costInbound) {
    _setInitialValue();
  }

  _setSectionOutPriceToDropDown(document.querySelector('.js-outbound'));
  _setSectionInPriceToDropDown(document.querySelector('.js-inbound'));
  _setTotalCostToDropDown(document.querySelector('.js-outbound'), document.querySelector('.js-inbound'));
};

const _setInitialValue = () => {
  const pricesOut = respAcommodation.routes.outbound
    .filter((route) => {
      return route.id === respExtras.tripData.outbound.accomodation.id;
    })[0]
    .tariffs.filter((tariff) => {
      return tariff.id === respExtras.tripData.outbound.accomodation.accId;
    })[0];

  costOutbound = {
    passenger: {
      adult: {
        quantity: respAcommodation.passenger.adult.quantity,
        price: pricesOut.adultPrice,
      },
      seniors60: {
        quantity: respAcommodation.passenger.seniors60.quantity,
        price: pricesOut.senior60Price,
      },
      children: {
        quantity: respAcommodation.passenger.children.quantity,
        price: pricesOut.childPrice,
      },
      babies: {
        quantity: respAcommodation.passenger.babies.quantity,
        price: pricesOut.babyPrice,
      },
      babies12: {
        quantity: respAcommodation.passenger.babies12.quantity,
        price: pricesOut.baby12Price,
      },
    },
  };

  costOutbound = {
    ...costOutbound,
    totalPassenger:
      costOutbound.passenger.adult.quantity +
      costOutbound.passenger.seniors60.quantity +
      costOutbound.passenger.children.quantity +
      costOutbound.passenger.babies.quantity +
      costOutbound.passenger.babies12.quantity,
    totalOutbound:
      costOutbound.passenger.adult.price * costOutbound.passenger.adult.quantity +
      costOutbound.passenger.seniors60.price * costOutbound.passenger.seniors60.quantity +
      costOutbound.passenger.children.price * costOutbound.passenger.children.quantity +
      costOutbound.passenger.babies.price * costOutbound.passenger.babies.quantity +
      costOutbound.passenger.babies12.price * costOutbound.passenger.babies12.quantity,
  };

  const pricesIn = respAcommodation.routes.inbound
    .filter((route) => {
      return route.id === respExtras.tripData.inbound.accomodation.id;
    })[0]
    .tariffs.filter((tariff) => {
      return tariff.id === respExtras.tripData.inbound.accomodation.accId;
    })[0];

  costInbound = {
    passenger: {
      adult: {
        quantity: respAcommodation.passenger.adult.quantity,
        price: pricesIn.adultPrice,
      },
      seniors60: {
        quantity: respAcommodation.passenger.seniors60.quantity,
        price: pricesIn.senior60Price,
      },
      children: {
        quantity: respAcommodation.passenger.children.quantity,
        price: pricesIn.childPrice,
      },
      babies: {
        quantity: respAcommodation.passenger.babies.quantity,
        price: pricesIn.babyPrice,
      },
      babies12: {
        quantity: respAcommodation.passenger.babies12.quantity,
        price: pricesIn.baby12Price,
      },
    },
  };

  costInbound = {
    ...costInbound,
    totalPassenger:
      costInbound.passenger.adult.quantity +
      costInbound.passenger.seniors60.quantity +
      costInbound.passenger.children.quantity +
      costInbound.passenger.babies.quantity +
      costInbound.passenger.babies12.quantity,
    totalInbound:
      costInbound.passenger.adult.price * costInbound.passenger.adult.quantity +
      costInbound.passenger.seniors60.price * costInbound.passenger.seniors60.quantity +
      costInbound.passenger.children.price * costInbound.passenger.children.quantity +
      costInbound.passenger.babies.price * costInbound.passenger.babies.quantity +
      costInbound.passenger.babies12.price * costInbound.passenger.babies12.quantity,
  };
};

const _setTotalCostToDropDown = (outbound, inbound) => {
  const elems = document.querySelectorAll('.js-summary__total');
  let discount = parseFloat(document.querySelector('.js-discount-detail')?.dataset?.totalDiscount);
  let total = (parseFloat(outbound?.dataset?.outboundTotal) || 0) + (parseFloat(inbound?.dataset?.inboundTotal) || 0);

  let totalWithDiscount = (total * discount) / 100 || 0;

  if (document.querySelector('.js-total-dp')) {
    document.querySelector('.js-total-dp').innerHTML = totalWithDiscount + '';
  }

  if (!elems) {
    return;
  }
  elems.forEach(function (obj) {
    if (discount > 0) {
      return (obj.innerHTML = total - totalWithDiscount + '');
    } else {
      return (obj.innerHTML =
        (parseFloat(outbound?.dataset?.outboundTotal) || 0) + (parseFloat(inbound?.dataset?.inboundTotal) || 0) + '');
    }
  });
};

const _setSectionOutPriceToDropDown = (element) => {
  element.setAttribute('data-outbound-total', costOutbound?.totalOutbound);
  element.querySelector('.js-total-passenger').innerHTML = costOutbound.totalPassenger;
  element.querySelector('.js-total').innerHTML = costOutbound.totalOutbound;
  element.querySelector('.js-adult-total').innerHTML =
    costOutbound.passenger.adult.quantity + ' x ' + costOutbound.passenger.adult.price;
  element.querySelector('.js-seniors60-total').innerHTML =
    costOutbound.passenger.seniors60.quantity + ' x ' + costOutbound.passenger.seniors60.price;
  element.querySelector('.js-children-total').innerHTML =
    costOutbound.passenger.children.quantity + ' x ' + costOutbound.passenger.children.price;
  element.querySelector('.js-babies-total').innerHTML =
    costOutbound.passenger.babies.quantity + ' x ' + costOutbound.passenger.babies.price;
  element.querySelector('.js-babies12-total').innerHTML =
    costOutbound.passenger.babies12.quantity + ' x ' + costOutbound.passenger.babies12.price;
  element.querySelector('.js-accomodation-out-name').innerHTML = respExtras.tripData.outbound.accomodation.name;
};

const _setSectionInPriceToDropDown = (element) => {
  element.setAttribute('data-inbound-total', costInbound?.totalInbound);
  element.querySelector('.js-total-passenger').innerHTML = costInbound.totalPassenger;
  element.querySelector('.js-total').innerHTML = costInbound.totalInbound;
  element.querySelector('.js-adult-total').innerHTML =
    costInbound.passenger.adult.quantity + ' x ' + costInbound.passenger.adult.price;
  element.querySelector('.js-seniors60-total').innerHTML =
    costInbound.passenger.seniors60.quantity + ' x ' + costInbound.passenger.seniors60.price;
  element.querySelector('.js-children-total').innerHTML =
    costInbound.passenger.children.quantity + ' x ' + costInbound.passenger.children.price;
  element.querySelector('.js-babies-total').innerHTML =
    costInbound.passenger.babies.quantity + ' x ' + costInbound.passenger.babies.price;
  element.querySelector('.js-babies12-total').innerHTML =
    costInbound.passenger.babies12.quantity + ' x ' + costInbound.passenger.babies12.price;
  element.querySelector('.js-accomodation-in-name').innerHTML = respExtras.tripData.inbound.accomodation.name;
};

const _setSectionDiscountToDropDown = (element) => {
  element.setAttribute('data-discount-total', costDiscount?.totalDiscount);
  element.querySelector('.js-total-dp').innerHTML = costDiscount.totalDiscount;

  element.querySelector('.js-discount-detail-dp').innerHTML = costDiscount.discount.description;
  element.querySelector('.js-discount-dp').innerHTML = costDiscount.discount.percent + ' %';
};

boxRadio();

export default init;
