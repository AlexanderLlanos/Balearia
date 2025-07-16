import { accommodationMap } from './mappers/accommodation.map';
import a11n from '../assets/data/accommodations.json';
import MicroModal from 'micromodal';

const data = accommodationMap.toDomain(a11n);

export const Accommodation = (options) => {
  const OUTBOUND = 'outbound';
  const INBOUND = 'inbound';
  const CAMAROTE_VIP = 'camarote_vip';
  const BUTACA_VIP = 'butaca_vip';
  const BUTACA_VIP_PLUS = 'butaca_zona_vip_plus';
  const modalVip = [CAMAROTE_VIP, BUTACA_VIP];
  const CAMAROTE_EXTERIOR = 'camarote_exterior';
  const mainWrapper = document.querySelector(options.elem);
  const closeModal = document.querySelector('.js-edit-close-btn');

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

  if (!mainWrapper) {
    return;
  }

  const seatBoxClass = '.js-a11n__seat-box';
  const seatClass = '.js-a11n__seat';
  const seatTypeClass = '.js-a11n__seat-type';
  const editableContainerClass = '.js-a11n__editable';
  const seatTypeButtonClass = '.js-a11n__seat-type__button';
  const seatTypeCloseClass = '.js-a11n__close';
  const summaryClass = '.js-a11n__summary';
  const editSummaryClass = '.js-a11n__edit';
  const activeSeatTypeClass = 'active';
  const activeClass = 'active';
  const hiddenClass = 'u-d-none';
  const tooltipActiveClass = 'tooltip--active';

  const tooltipContentClass = '.js-tooltip__content';
  const closeTooltipClass = '.js-close-tooltip';

  const seatBoxNum = mainWrapper.querySelectorAll(seatBoxClass).length;
  const initialState = document.querySelector('.js-initial-state');

  const camaroteBtn = document.querySelector('.js-camarote-selected');
  const vipBtn = document.querySelectorAll('.js-vip-selected');

  const butacaBtn = document.querySelector('.js-butaca-selected');

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
  let tripSelected;

  // private

  const _onSeatClick = (e) => {
    const seatTypeTrigger = e.target?.closest(seatClass);
    const closeTrigger = e.target?.closest(seatTypeCloseClass);
    const seatTypeButtonTrigger = e.target?.closest(seatTypeButtonClass);
    const editTrigger = e.target?.closest(editSummaryClass);
    const tooltipContent = e.target?.closest(tooltipContentClass);
    const closeTooltip = e.target?.closest(closeTooltipClass);

    if (tooltipContent) {
      if (!closeTooltip) {
        return;
      }

      seatTypeTrigger
        .closest(seatBoxClass)
        .querySelectorAll(seatClass)
        ?.forEach((e) => {
          e?.classList.remove(tooltipActiveClass);
        });

      return;
    }

    if (seatTypeTrigger?.dataset?.index === '1' && seatTypeTrigger?.classList.contains(tooltipActiveClass) === true) {
      seatTypeTrigger.classList.remove(tooltipActiveClass);
    }

    if (seatTypeTrigger?.classList.contains('tooltip--no-hover') === true) {
      _setTooltip(seatTypeTrigger);
    }

    const row = e.target?.closest(seatBoxClass);
    const accommodationId = e?.path[0]?.dataset?.accommodationId;

    if (seatTypeButtonTrigger && modalVip.indexOf(accommodationId) < 0) {
      _seatSelected(row, accommodationId);
    } else {
      //Mejora tu acomodación
      camaroteBtn?.addEventListener(
        'click',
        () => {
          _seatSelected(row, CAMAROTE_EXTERIOR);
        },
        true,
      );
      butacaBtn?.addEventListener(
        'click',
        () => {
          _seatSelected(row, BUTACA_VIP_PLUS);
        },
        true,
      );
      vipBtn.forEach((element) => {
        element?.addEventListener(
          'click',
          () => {
            _seatSelected(row, accommodationId);
          },
          true,
        );
      });
    }

    if (closeTrigger) {
      const currentSeatType = closeTrigger.closest(seatTypeClass);
      const currentSeats = closeTrigger.closest(seatBoxClass).querySelectorAll(seatClass);
      const currentTrip = closeTrigger.closest(seatBoxClass);
      const currentTripsList = closeTrigger.closest('.js-a11n__seat-box-container').querySelectorAll(seatBoxClass);

      currentSeats.forEach((item) => {
        item.className = _removeClass(item.className, activeSeatTypeClass);
      });
      currentTripsList.forEach((trip) => {
        trip.classList.remove('u-d-none');
      });
      currentSeatType.className = _removeClass(currentSeatType.className, activeSeatTypeClass);
      document.querySelector('.js-a11n-return').classList.remove('section-disabled');
    }

    if (editTrigger) {
      mainWrapper.querySelector(editableContainerClass).className = _removeClass(
        mainWrapper.querySelector(editableContainerClass).className,
        hiddenClass,
      );
      mainWrapper.querySelector(summaryClass).className = _removeClass(
        mainWrapper.querySelector(summaryClass).className,
        activeSeatTypeClass,
      );
    }

    if (!seatTypeTrigger) {
      return;
    }

    const seats = seatTypeTrigger.closest(seatBoxClass).querySelectorAll(seatClass);
    const seatTypes = seatTypeTrigger.closest(seatBoxClass).querySelectorAll(seatTypeClass);
    const seatTypeToOpen = seatTypeTrigger.getAttribute('data-index');
    const toActive = seats[seatTypeToOpen];
    const toOpen = seatTypes[seatTypeToOpen];
    const currentTrip = seatTypeTrigger.closest(seatBoxClass);
    const currentTripsList = seatTypeTrigger.closest('.js-a11n__seat-box-container').querySelectorAll(seatBoxClass);
    const currentTripsListContainer = seatTypeTrigger.closest('.js-a11n__seat-box-container');

    if (toActive.classList.contains(activeSeatTypeClass) === true) {
      toActive.classList.toggle(activeSeatTypeClass);

      currentTripsList.forEach((trip) => {
        if (trip != currentTrip) {
          trip.classList.remove('u-d-none');
        }
      });
      if (document.querySelector('.js-a11n-return').classList.contains('section-disabled')) {
        document.querySelector('.js-a11n-return').classList.remove('section-disabled');
      }
    } else {
      seats.forEach((item) => {
        item.className = _removeClass(item.className, activeSeatTypeClass);
      });
      toActive.classList.toggle(activeSeatTypeClass);

      let yOffset = -100;
      let y = currentTripsListContainer.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      if (window.scrollY != y) {
        setTimeout(() => {
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 150);
      }

      currentTripsList.forEach((trip) => {
        if (trip != currentTrip) {
          trip.classList.add('u-d-none');
        }
      });
      if (row?.dataset?.rowSelected !== undefined && row.dataset?.tripSelected === OUTBOUND) {
        document.querySelector('.js-a11n-return').classList.add('section-disabled');
      }
    }

    if (toOpen?.classList.contains(activeSeatTypeClass) === true) {
      toOpen.classList.toggle(activeSeatTypeClass);
    } else {
      seatTypes.forEach((item) => {
        item.className = _removeClass(item.className, activeSeatTypeClass);
      });
      toOpen?.classList.toggle(activeSeatTypeClass);
    }
  };

  const _setTooltip = (seatTypeTrigger) => {
    seatTypeTrigger?.parentNode?.childNodes.forEach((child) => {
      if (child.dataset?.index === '1') {
        child.classList.toggle(tooltipActiveClass);
      }
      if (document.querySelector('.js-a11n__seat-type').classList.contains('active') === true) {
        child?.classList?.remove(tooltipActiveClass);
      }
    });
  };

  const _seatSelected = (row, accommodationId) => {
    console.log(accommodationId);
    if (mainWrapper.querySelector(editableContainerClass)) {
      mainWrapper.querySelector(editableContainerClass).className += ` ${hiddenClass}`;

      const currentSummary = mainWrapper.querySelector(summaryClass);
      currentSummary.className += ` ${activeSeatTypeClass}`;
    } else if (mainWrapper.classList.contains('js-modal-mobile')) {
      let tempWrapper = document.querySelector(options.elem.replace('-mobile', ''));

      tempWrapper.querySelector(editableContainerClass).className += ` ${hiddenClass}`;

      const currentSummary = tempWrapper.querySelector(summaryClass);
      currentSummary.className += ` ${activeSeatTypeClass}`;
    }

    _setInitialState();

    if (row?.dataset?.rowSelected !== undefined && row?.dataset?.tripSelected === OUTBOUND) {
      document.querySelector('.js-a11n-return').classList.remove('section-disabled');

      costOutbound = _getDetailCostOutbound(accommodationId, row.dataset?.rowSelected);

      document.querySelector('.js-btn-accomodation-out-name').innerHTML = accommodations.find((accommodation) => {
        return costOutbound.accommodationId === accommodation.id;
      })?.name;

      _showBlock('display:block;', 'display:none;');
      _showBlockOutIn('.js-outbound-data', '.js-outbound-empty', 'display: block', 'display: none');

      _setSectionOutPriceToDropDown(document.querySelector('.js-outbound'));
      tripSelected = row.dataset?.tripSelected;
    }
    if (row?.dataset?.rowSelected !== undefined && row?.dataset?.tripSelected === INBOUND) {
      costInbound = _getDetailCostInbound(accommodationId, row.dataset?.rowSelected);

      document.querySelector('.js-btn-accomodation-in-name').innerHTML = accommodations.find((accommodation) => {
        return costInbound.accommodationId === accommodation.id;
      })?.name;

      _showBlock('display:block;', 'display:none;');
      _showBlockOutIn('.js-inbound-data', '.js-inbound-empty', 'display: block', 'display: none');

      _setSectionInPriceToDropDown(document.querySelector('.js-inbound'));
      tripSelected = row.dataset?.tripSelected;
    }

    document.querySelector('.js-a11n__out-edit').addEventListener('click', _onResetClickOutbound, true);
    document.querySelector('.js-a11n__in-edit').addEventListener('click', _onResetClickInbound, true);

    _setTotalCostToDropDown(document.querySelector('.js-outbound'), document.querySelector('.js-inbound'));

    if (mainWrapper.classList.contains('js-modal-mobile')) {
      MicroModal.close(mainWrapper.getAttributeNode('id').value);
      document.querySelector('body').style.overflow = 'visible';
    }
  };

  const _setInitialState = () => {
    if (initialState.getAttribute('data-initial-state') === 'true') {
      _showBlockOutIn('.js-outbound-data', '.js-outbound-empty', 'display: none', 'display: block');
      _showBlockOutIn('.js-inbound-data', '.js-inbound-empty', 'display: none', 'display: block');
      initialState.setAttribute('data-initial-state', 'false');
    }
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

  const _setTotalCostToDropDown = (outbound, inbound) => {
    const elems = document.querySelectorAll('.js-summary__total');
    let discount = parseFloat(document.querySelector('.js-discount-detail')?.dataset?.totalDiscount) || 0;
    let total = (parseFloat(outbound?.dataset?.outboundTotal) || 0) + (parseFloat(inbound?.dataset?.inboundTotal) || 0);
    let totalWithDiscount = (total * discount) / 100 || 0;

    document.querySelector('.js-total-dp').innerHTML = totalWithDiscount + '';

    elems.forEach(function (obj) {
      if (discount > 0) {
        return (obj.innerHTML = total - totalWithDiscount + '');
      } else {
        return (obj.innerHTML =
          (parseFloat(outbound?.dataset?.outboundTotal) || 0) + (parseFloat(inbound?.dataset?.inboundTotal) || 0) + '');
      }
    });

    _showExtrasButton(outbound, inbound);
  };

  const _showExtrasButton = (outbound, inbound) => {
    if (outbound?.dataset?.outboundTotal !== '0' && inbound?.dataset?.inboundTotal !== '0') {
      document.querySelector('.js-show-btn-extras').style.display = 'block';
      document.querySelector('.js-btn-extras').classList.add(activeClass);
      document.querySelector('.js-btn-extras').classList.remove('disabled');
    } else {
      document.querySelector('.js-show-btn-extras').style.display = 'none';
      document.querySelector('.js-btn-extras').classList.remove(activeClass);
      document.querySelector('.js-btn-extras').classList.add('disabled');
    }
  };

  const _removeClass = (str, cls) => {
    const reg = new RegExp('( )' + cls + '()', 'g');

    return str.replace(reg, '');
  };

  const _onResetClickOutbound = () => {
    if (tripSelected === OUTBOUND) {
      document.querySelector('.js-outbound').setAttribute('data-outbound-total', '0');

      _showBlockOutIn('.js-outbound-data', '.js-outbound-empty', 'display: none', 'display: block');
    }

    _setTotalCostToDropDown(document.querySelector('.js-outbound'), document.querySelector('.js-inbound'));
  };

  const _onResetClickInbound = () => {
    if (tripSelected === INBOUND) {
      document.querySelector('.js-inbound').setAttribute('data-inbound-total', '0');

      _showBlockOutIn('.js-inbound-data', '.js-inbound-empty', 'display: none', 'display: block');
    }

    _setTotalCostToDropDown(document.querySelector('.js-outbound'), document.querySelector('.js-inbound'));
  };

  const _showBlockOutIn = (classData, classEmpty, valueData, valueEmpty) => {
    document.querySelector(classData)?.setAttribute('style', valueData);
    document.querySelector(classEmpty)?.setAttribute('style', valueEmpty);
  };

  const _showBlock = (displayResume, displayEmpty) => {
    document.querySelector('.js-dropdown-data').setAttribute('style', displayResume);
    document.querySelector('.js-dropdown-empty').setAttribute('style', displayEmpty);
  };

  const _closeEditModal = () => {
    document.querySelector('.js-search-header')?.setAttribute('style', 'display:none;');
    _showBlockOutIn('.js-main-header', '.js-nav', 'display: block', 'display: flex');
  };

  const _discountDisplay = (e) => {
    document.querySelector('.js-discount-display')?.classList?.remove('show');
  };

  // public

  const render = () => {
    mainWrapper.addEventListener('click', _onSeatClick, true);
    closeModal.addEventListener('click', _closeEditModal, true);

    for (let i = 0; i < seatBoxNum; i++) {
      const seatsNum = mainWrapper.querySelectorAll(seatBoxClass)[i].querySelectorAll(seatClass).length;
      for (let s = 0; s < seatsNum; s++) {
        mainWrapper.querySelectorAll(seatBoxClass)[i].querySelectorAll(seatClass)[s].setAttribute('data-index', s);
        mainWrapper.querySelectorAll(seatBoxClass)[i].querySelectorAll(seatTypeClass)[s]?.setAttribute('data-index', s);
      }
    }

    document.querySelector('.js-close-discount')?.addEventListener('click', _discountDisplay, true);
  };

  return {
    init: render,
  };
};
