import { accommodationMap } from '../../../js/mappers/accommodation.map';
import dataAccommodation from '../../../assets/data/accommodations.json';

const data = accommodationMap.toDomain(dataAccommodation);
let tripSelected;
const OUTBOUND = 'outbound';
const INBOUND = 'inbound';
const accommodations = [
  {
    id: 'butaca_sirena',
    name: 'Butaca Sirena',
  },
  {
    id: 'butaca_sirena_plus',
    name: 'Butaca Sirena Plus',
  },
  {
    id: 'butaca_neptuno',
    name: 'Butaca Neptuno',
  },
  {
    id: 'butaca_vip',
    name: 'Butaca VIP',
  },
  {
    id: 'butaca_neptuno_plus',
    name: 'Butaca Neptuno Plus',
  },
  {
    id: 'butaca_zona_vip_plus',
    name: 'Butaca Zona VIP Plus',
  },
  {
    id: 'camarote_exterior',
    name: 'Camorote Exterior',
  },
  {
    id: 'camarote_vip',
    name: 'Camorote VIP',
  },
];
let costOutbound, costInbound;

const resumeDetail = {
  passenger: {
    adult: {
      quantity: data.passenger.adult.quantity,
      emissionCost: data.passenger.adult.emissionCost,
      emissionCostResident: data.passenger.adult.emissionCostResident,
    },
    seniors60: {
      quantity: data.passenger.seniors60.quantity,
      emissionCost: data.passenger.seniors60.emissionCost,
      emissionCostResident: data.passenger.seniors60.emissionCostResident,
    },
    children: {
      quantity: data.passenger.children.quantity,
      emissionCost: data.passenger.children.emissionCost,
      emissionCostResident: data.passenger.children.emissionCostResident,
    },
    babies: {
      quantity: data.passenger.babies.quantity,
      emissionCost: data.passenger.babies.emissionCost,
      emissionCostResident: data.passenger.babies.emissionCostResident,
    },
    babies12: {
      quantity: data.passenger.babies12.quantity,
      emissionCost: data.passenger.babies12.emissionCost,
      emissionCostResident: data.passenger.babies12.emissionCostResident,
    },
    vehicles: {
      quantity: data.passenger.vehicles?.length,
      emissionCost: data.passenger.vehicles[0].emissionCost,
      emissionCostResident: data.passenger.vehicles[0].emissionCostResident,
    },
    tows: {
      quantity: data.passenger.tows?.length,
      emissionCost: data.passenger.tows[0].emissionCost,
      emissionCostResident: data.passenger.tows[0].emissionCostResident,
    },
  },
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

const _getIndividualCost = (routes, rowSelected, tariffId) => {
  return routes
    .filter((route) => route.id === +rowSelected)
    .flatMap((route) => route.tariffs)
    .find((tariff) => tariff.id === tariffId);
};

const _getTotalPassenger = (resume) => {
  return (
    resume?.passenger?.adult?.quantity +
    resume?.passenger?.seniors60?.quantity +
    resume?.passenger?.children?.quantity +
    resume?.passenger?.babies?.quantity +
    resume?.passenger?.babies12?.quantity +
    resume?.passenger?.vehicles?.quantity +
    resume?.passenger?.tows?.quantity
  );
};

const _getTotal = (resume) => {
  return (
    resume?.passenger?.adult?.quantity * resume?.passenger?.adult?.price +
    resume?.passenger?.seniors60?.quantity * resume?.passenger?.seniors60?.price +
    resume?.passenger?.children?.quantity * resume?.passenger?.children?.price +
    resume?.passenger?.babies?.quantity * resume?.passenger?.babies?.price +
    resume?.passenger?.babies12?.quantity * resume?.passenger?.babies12?.price +
    resume?.passenger?.vehicles?.quantity * resume?.passenger?.vehicles?.price +
    resume?.passenger?.tows?.quantity * resume?.passenger?.tows?.price
  );
};

const _getTotalEmissionCost = (resume) => {
  return (
    resume?.passenger?.adult?.quantity * resume?.passenger?.adult?.emissionCost +
    resume?.passenger?.seniors60?.quantity * resume?.passenger?.seniors60?.emissionCost +
    resume?.passenger?.children?.quantity * resume?.passenger?.children?.emissionCost +
    resume?.passenger?.babies?.quantity * resume?.passenger?.babies?.emissionCost +
    resume?.passenger?.babies12?.quantity * resume?.passenger?.babies12?.emissionCost +
    resume?.passenger?.vehicles?.quantity * resume?.passenger?.vehicles?.emissionCost +
    resume?.passenger?.tows?.quantity * resume?.passenger?.tows?.emissionCost
  );
};

const _getTotalCost = (resume) => {
  return resume.totalOutbound + resume.totalInbound + resume.totalEmissionCost;
};

const _getTotalResidentPrice = (resume) => {
  const outboundPriceResident =
    resume?.passenger?.adult?.quantity * resume?.passenger?.adult?.priceResident +
    resume?.passenger?.seniors60?.quantity * resume?.passenger?.seniors60?.priceResident +
    resume?.passenger?.children?.quantity * resume?.passenger?.children?.priceResident +
    resume?.passenger?.babies?.quantity * resume?.passenger?.babies?.priceResident +
    resume?.passenger?.babies12?.quantity * resume?.passenger?.babies12?.priceResident +
    resume?.passenger?.vehicles?.quantity * resume?.passenger?.vehicles?.priceResident +
    resume?.passenger?.tows?.quantity * resume?.passenger?.tows?.priceResident;

  const inboundPriceResident =
    resume?.passenger?.adult?.quantity * resume?.passenger?.adult?.priceResident +
    resume?.passenger?.seniors60?.quantity * resume?.passenger?.seniors60?.priceResident +
    resume?.passenger?.children?.quantity * resume?.passenger?.children?.priceResident +
    resume?.passenger?.babies?.quantity * resume?.passenger?.babies?.priceResident +
    resume?.passenger?.babies12?.quantity * resume?.passenger?.babies12?.priceResident +
    resume?.passenger?.vehicles?.quantity * resume?.passenger?.vehicles?.priceResident +
    resume?.passenger?.tows?.quantity * resume?.passenger?.tows?.priceResident;

  const emissionPriceResident =
    resume?.passenger?.adult?.quantity * resume?.passenger?.adult?.priceResident +
    resume?.passenger?.seniors60?.quantity * resume?.passenger?.seniors60?.priceResident +
    resume?.passenger?.children?.quantity * resume?.passenger?.children?.priceResident +
    resume?.passenger?.babies?.quantity * resume?.passenger?.babies?.priceResident +
    resume?.passenger?.babies12?.quantity * resume?.passenger?.babies12?.priceResident +
    resume?.passenger?.vehicles?.quantity * resume?.passenger?.vehicles?.priceResident +
    resume?.passenger?.tows?.quantity * resume?.passenger?.tows?.priceResident;

  return outboundPriceResident + inboundPriceResident + emissionPriceResident;
};

const _getDetailCostOutbound = (tariffId, selectedRow) => {
  const tariff = _getIndividualCost(data.routes.outbound, selectedRow, tariffId);
  const outboundResume = {
    passenger: {
      adult: {
        price: tariff?.adultPrice,
        priceResident: tariff?.emissionCostadultPriceResident,
      },
      seniors60: {
        price: tariff?.senior60Price,
        priceResident: tariff?.senior60PriceResident,
      },
      children: {
        price: tariff?.childPrice,
        priceResident: tariff?.childPriceResident,
      },
      babies: {
        price: tariff?.babyPrice,
        priceResident: tariff?.babyPriceResident,
      },
      babies12: {
        price: tariff?.baby12Price,
        priceResident: tariff?.baby12Price_resident,
      },
      vehicles: {
        price: tariff?.vehiclePrice,
        priceResident: tariff?.vehiclePriceResident,
      },
      tows: {
        price: tariff?.towPrice,
        priceResident: tariff?.towPriceResident,
      },
    },
  };

  resumeDetail.passenger.adult = {
    ...resumeDetail.passenger.adult,
    ...outboundResume.passenger.adult,
  };
  resumeDetail.passenger.seniors60 = {
    ...resumeDetail.passenger.seniors60,
    ...outboundResume.passenger.seniors60,
  };
  resumeDetail.passenger.children = {
    ...resumeDetail.passenger.children,
    ...outboundResume.passenger.children,
  };
  resumeDetail.passenger.babies = {
    ...resumeDetail.passenger.babies,
    ...outboundResume.passenger.babies,
  };
  resumeDetail.passenger.babies12 = {
    ...resumeDetail.passenger.babies12,
    ...outboundResume.passenger.babies12,
  };
  resumeDetail.passenger.vehicles = {
    ...resumeDetail.passenger.vehicles,
    ...outboundResume.passenger.vehicles,
  };
  resumeDetail.passenger.tows = {
    ...resumeDetail.passenger.tows,
    ...outboundResume.passenger.tows,
  };

  resumeDetail.totalPassenger = _getTotalPassenger(resumeDetail);
  resumeDetail.totalOutbound = _getTotal(resumeDetail);
  resumeDetail.totalEmissionCost = _getTotalEmissionCost(resumeDetail);
  resumeDetail.totalCost = _getTotalCost(resumeDetail);
  resumeDetail.totalResidentCost = _getTotalResidentPrice(resumeDetail);
  resumeDetail.accommodationId = tariffId;

  return resumeDetail;
};

const _getDetailCostInbound = (tariffId, selectedRow) => {
  const tariff = _getIndividualCost(data.routes.inbound, selectedRow, tariffId);
  const inboundResume = {
    accommodationId: tariffId,
    passenger: {
      adult: {
        price: tariff?.adultPrice,
        priceResident: tariff?.emissionCostadultPriceResident,
      },
      seniors60: {
        price: tariff?.senior60Price,
        priceResident: tariff?.senior60PriceResident,
      },
      children: {
        price: tariff?.childPrice,
        priceResident: tariff?.childPriceResident,
      },
      babies: {
        price: tariff?.babyPrice,
        priceResident: tariff?.babyPriceResident,
      },
      babies12: {
        price: tariff?.baby12Price,
        priceResident: tariff?.baby12Price_resident,
      },
      vehicles: {
        price: tariff?.vehiclePrice,
        priceResident: tariff?.vehiclePriceResident,
      },
      tows: {
        price: tariff?.towPrice,
        priceResident: tariff?.towPriceResident,
      },
    },
  };

  resumeDetail.passenger.adult = {
    ...resumeDetail.passenger.adult,
    ...inboundResume.passenger.adult,
  };
  resumeDetail.passenger.seniors60 = {
    ...resumeDetail.passenger.seniors60,
    ...inboundResume.passenger.seniors60,
  };
  resumeDetail.passenger.children = {
    ...resumeDetail.passenger.children,
    ...inboundResume.passenger.children,
  };
  resumeDetail.passenger.babies = {
    ...resumeDetail.passenger.babies,
    ...inboundResume.passenger.babies,
  };
  resumeDetail.passenger.babies12 = {
    ...resumeDetail.passenger.babies12,
    ...inboundResume.passenger.babies12,
  };
  resumeDetail.passenger.vehicles = {
    ...resumeDetail.passenger.vehicles,
    ...inboundResume.passenger.vehicles,
  };
  resumeDetail.passenger.tows = {
    ...resumeDetail.passenger.tows,
    ...inboundResume.passenger.tows,
  };

  resumeDetail.totalPassenger = _getTotalPassenger(resumeDetail);
  resumeDetail.totalInbound = _getTotal(resumeDetail);
  resumeDetail.totalEmissionCost = _getTotalEmissionCost(resumeDetail);
  resumeDetail.totalCost = _getTotalCost(resumeDetail);
  resumeDetail.totalResidentCost = _getTotalResidentPrice(resumeDetail);
  resumeDetail.accommodationId = tariffId;

  return resumeDetail;
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
  element.querySelector('.js-vehicle-total').innerHTML =
    costOutbound.passenger.vehicles.quantity + ' x ' + costOutbound.passenger.vehicles.price;
  element.querySelector('.js-tows-total').innerHTML =
    costOutbound.passenger.tows.quantity + ' x ' + costOutbound.passenger.tows.price;

  element.querySelector('.js-accomodation-out-name').innerHTML = accommodations.find((accommodation) => {
    return costOutbound.accommodationId === accommodation.id;
  })?.name;

  window.localStorage.setItem('costOutbound', JSON.stringify(costOutbound));
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
  element.querySelector('.js-vehicle-total').innerHTML =
    costInbound.passenger.vehicles.quantity + ' x ' + costInbound.passenger.vehicles.price;
  element.querySelector('.js-tows-total').innerHTML =
    costInbound.passenger.tows.quantity + ' x ' + costInbound.passenger.tows.price;

  element.querySelector('.js-accomodation-in-name').innerHTML = accommodations.find((accommodation) => {
    return costInbound.accommodationId === accommodation.id;
  })?.name;

  window.localStorage.setItem('costInbound', JSON.stringify(costInbound));
};

const _showBlockOutIn = (classData, classEmpty, valueData, valueEmpty) => {
  document.querySelector(classData).setAttribute('style', valueData);
  document.querySelector(classEmpty).setAttribute('style', valueEmpty);
};

const _showBlock = (displayResume, displayEmpty) => {
  document.querySelector('.js-dropdown-data')?.setAttribute('style', displayResume);
  document.querySelector('.js-dropdown-empty')?.setAttribute('style', displayEmpty);
};

const _seatSelected = (e) => {
  let row = e.target.closest('.js-add-shedule-seat');
  const allButtons = e.target.closest('.js-main-wrapper').querySelectorAll('.box-radio');
  allButtons?.forEach((btn) => {
    btn.classList.remove('active');
  });
  e.target.closest('.js-add-shedule-seat').parentElement.classList.toggle('active');
  let accommodationId = 'butaca_sirena';

  if (row?.dataset?.rowSelected !== undefined && row?.dataset?.tripSelected === OUTBOUND) {
    costOutbound = _getDetailCostOutbound(accommodationId, row.dataset?.rowSelected);

    _showBlock('display:block;', 'display:none;');
    _showBlockOutIn('.js-outbound-data', '.js-outbound-empty', 'display: block', 'display: none');

    _setSectionOutPriceToDropDown(document.querySelector('.js-outbound'));
    tripSelected = row.dataset?.tripSelected;
  }
  if (row?.dataset?.rowSelected !== undefined && row?.dataset?.tripSelected === INBOUND) {
    costInbound = _getDetailCostInbound(accommodationId, row.dataset?.rowSelected);

    _showBlock('display:block;', 'display:none;');
    _showBlockOutIn('.js-inbound-data', '.js-inbound-empty', 'display: block', 'display: none');

    _setSectionInPriceToDropDown(document.querySelector('.js-inbound'));
    tripSelected = row.dataset?.tripSelected;
  }

  _setTotalCostToDropDown(document.querySelector('.js-outbound'), document.querySelector('.js-inbound'));
};

const _setSchedule = (e) => {
  const from = e.target.closest('.js-option')?.dataset?.from;
  const to = e.target.closest('.js-option')?.dataset?.to;
  const date = e.target.closest('.js-option')?.dataset?.date;
  const route = [from, to];

  document.querySelector('.js-input-date')?.setAttribute('value', date);
  document.querySelector('.js-input-route')?.setAttribute('value', `${route[0]} - ${route[1]}`);
};

const _swapRoute = () => {
  const route = document.querySelector('.js-input-route')?.getAttribute('value')?.split('-').reverse();
  document.querySelector('.js-input-route')?.setAttribute('value', `${route?.[0].trim()} - ${route?.[1].trim()}`);
  document.querySelectorAll('.js-table-row')?.forEach((table) => {
    table.classList.toggle('active');
  });
};

const init = () => {
  document.querySelectorAll('.js-add-shedule-seat')?.forEach((e) => {
    e?.addEventListener('click', _seatSelected, true);
  });

  document.querySelector('.js-open-modal-schedule-info')?.addEventListener('click', _setSchedule, true);
  document.querySelector('.js-swap')?.addEventListener('click', _swapRoute, true);
  document.querySelector('.js-modal-vuelta-horarios')?.addEventListener('click', _setSchedule, true);
};

export default init;
