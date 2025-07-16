import Swiper from 'swiper/swiper-bundle';
import { Tabs } from '../../../js/tabs';
import MicroModal from 'micromodal';

import { useStore } from '../../../js/useStore';

import { ContactData } from './sections/contact/contact-data';
import { ChangeOutbound } from './sections/change-trip/change-outbound';
import { ChangeInbound } from './sections/change-trip/change-inbound';
import { ChangeAcomodation } from './sections/management-passenger/change-acomodation';
import { AddPassenger } from './sections/management-passenger/add-passenger';
import { AddSpecialAssistance } from './sections/management-passenger/add-special-assistance';
import { CancelPassengerTrip } from './sections/management-passenger/cancel-passenger-trip';

import petAccomodation from '../reservas-mejorar-viaje/reservas-elementos/reservas-pet-accomodation.html';
import accomodationOption from '../reservas-mejorar-viaje/reservas-elementos/reservas-pet-accomodation-opt.html';
import micromodal from 'micromodal';

const MAX_FIELD = 4;

const FILTER = [
  {
    id: '1',
    brand: 'Mercedes',
    name: 'Mercedes',
    model: [
      {
        id: '1',
        name: 'Clase A',
      },
      {
        id: '2',
        name: 'Clase B',
      },
      {
        id: '3',
        name: 'Clase C',
      },
    ],
  },
  {
    id: '2',
    brand: 'Audi',
    name: 'Audi',
    model: [
      {
        id: '1',
        name: 'A4 Allroad Quattro',
      },
      {
        id: '2',
        name: 'A4 Allroad Quattro',
      },
      {
        id: '3',
        name: 'A8',
      },
      {
        id: '4',
        name: 'A3',
      },
      {
        id: '5',
        name: 'A5',
      },
    ],
  },
  {
    id: '3',
    brand: 'BMW',
    name: 'BMW',
    model: [
      {
        id: '1',
        name: 'Serie 3',
      },
      {
        id: '2',
        name: 'Serie 5',
      },
      {
        id: '3',
        name: 'Serie 2 Gran Tourer',
      },
      {
        id: '4',
        name: 'X3',
      },
      {
        id: '5',
        name: 'X5',
      },
    ],
  },
  {
    id: '4',
    brand: 'CHEVROLET',
    name: 'CHEVROLET',
    model: [
      {
        id: '1',
        name: 'Cruze',
      },
      {
        id: '2',
        name: 'Aveo',
      },
      {
        id: '3',
        name: 'Trax',
      },
    ],
  },
];

export default function () {
  const mainModalId = 'modal-gestion-flexible';
  const modalContainerClass = '.js-modal__container';
  const modalInternalContainerClass = '.js-modal-internal__container';

  document.querySelectorAll('.js-reserva-opt').forEach((e) => {
    e.addEventListener('click', () => {
      MicroModal.close(mainModalId);
    });
  });

  document.querySelectorAll('.js-reserva-subitem').forEach((e) => {
    e.addEventListener('click', () => {
      MicroModal.close(e.closest(modalContainerClass).id);
    });
  });

  document.querySelectorAll('.js-close-opt').forEach((e) => {
    e.addEventListener('click', () => {
      MicroModal.close(e.closest(modalContainerClass).id);

      if (e.closest(modalContainerClass).classList.contains(modalInternalContainerClass) === true) {
        MicroModal.show(e.closest(modalInternalContainerClass)?.dataset?.modalParent);
      } else {
        MicroModal.show(mainModalId);
      }
    });
  });

  document.querySelectorAll('.js-return-opt').forEach((e) => {
    e.addEventListener('click', () => {
      MicroModal.close(e.closest(modalInternalContainerClass).id);
      MicroModal.show(e.closest(modalInternalContainerClass)?.dataset?.modalParent);
    });
  });

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

  const buscarMovimiento = Tabs({
    elem: '.js-tabs-buscar-movimientos',
  });
  buscarMovimiento?.init();

  const secondMenu = Tabs({
    elem: '.js-tabs-second-menu',
  });
  secondMenu?.init();

  const { getState, setState, subscribe, destroy } = useStore;
  const { changeTrip, passengerManagement, petsManagement, vehicleManagement } = getState();

  /* DATOS DE CONTACTO */

  const _initContactData = () => {
    ContactData();
  };
  document.querySelector('.js-show-modal-cambios-contacto')?.addEventListener('click', _initContactData, true);

  /* CAMBIOS EN MI VIAJE */

  // Cambiar origen
  const _initTripOutData = () => {
    ChangeOutbound();
  };
  document.querySelector('.js-modal-cambios-viaje-origen')?.addEventListener('click', _initTripOutData, true);

  // Cambiar destino
  const _initTripInData = () => {
    ChangeInbound();
  };
  document.querySelector('.js-modal-cambios-viaje-destino')?.addEventListener('click', _initTripInData, true);

  /* GESTIONAR PASAJEROS */
  // Cambiar acomodaciones
  const _initAcomodation = (e) => {
    ChangeAcomodation();
  };
  document
    .querySelector('.js-modal-cambios-pasajeros-acomodaciones')
    ?.addEventListener('click', _initAcomodation, true);

  // Añadir pasajeros a tu reserva
  const _initAddPassenger = () => {
    AddPassenger();
  };
  document.querySelector('.js-modal-cambios-añadir-pasajeros')?.addEventListener('click', _initAddPassenger, true);

  // Añadir asistencia especial
  const _initSpecialAsistanceData = () => {
    AddSpecialAssistance();
  };

  document
    .querySelector('.js-modal-cambios-añadir-asistencia')
    ?.addEventListener('click', _initSpecialAsistanceData, true);

  // Anular viaje de un pasajero

  const _initCancelPassengerTrip = () => {
    CancelPassengerTrip();
  };

  document.querySelector('.js-modal-cambios-pasajero')?.addEventListener('click', _initCancelPassengerTrip, true);

  /* GESTIONAR MASCOTAS */
  // Cambiar acomodación de mascotas
  const _initPetsAcomodation = (e) => {
    try {
      let petAccomodationList = document.querySelector('.js-pet-accomodation__pets-list');
      if (!petAccomodationList.querySelector('.js-pet-accomodation__pet-name')) {
        petsManagement.change_accomodation.forEach((pet, petIndex) => {
          let petAccomodationItem = document.createElement('div');
          petAccomodationItem.classList.add('o-col-md-24', 'o-mb--2');
          petAccomodationItem.innerHTML = petAccomodation;
          petAccomodationItem.querySelector('.js-pet-accomodation__pet-name').innerHTML = pet.name;
          petAccomodationItem.querySelector('.js-pet-accomodation__pet-type').innerHTML = pet.type;
          petAccomodationItem
            .querySelector('.js-update-pets-acomodations')
            .addEventListener('click', _openPetsAcomodations, true);

          let accomdationsList = petAccomodationItem.querySelector('.js-box-acomodations-body');
          Object.values(pet.accomodation).forEach((accom) => {
            let accomodationOptionWrapper = document.createElement('div');
            accomodationOptionWrapper.innerHTML = accomodationOption;
            accomodationOptionWrapper.querySelector('.js-pet-accomodation__name').innerHTML = accom.name;
            accomodationOptionWrapper.querySelector('.js-pet-accomodation__price').innerHTML = accom.price + ' €';
            accomodationOptionWrapper.querySelector('input').checked = accom.checked;
            accomodationOptionWrapper.querySelector('input').name = `petAccomodation-${petIndex}`;
            accomodationOptionWrapper.querySelector('input').value = accom.price;
            accomodationOptionWrapper.querySelector('input').id = `petAccomodation-${petIndex}_${accom.accId}`;
            accomodationOptionWrapper.querySelector('label').htmlFor = `petAccomodation-${petIndex}_${accom.accId}`;

            accom?.checked
              ? accomodationOptionWrapper.querySelector('.tag.tag--blue')?.classList.remove('u-hidden')
              : accomodationOptionWrapper.querySelector('.tag.tag--blue')?.classList.add('u-hidden');
            accom?.checked
              ? accomodationOptionWrapper.querySelector('.js-pet-accomodation__price')?.classList.add('u-hidden')
              : accomodationOptionWrapper.querySelector('.js-pet-accomodation__price')?.classList.remove('u-hidden');
            accomdationsList.append(accomodationOptionWrapper.firstChild);
          });
          petAccomodationList.append(petAccomodationItem);
          petAccomodationItem.querySelectorAll(`input[name=petAccomodation-${petIndex}]`).forEach((input) => {
            input.addEventListener('change', _setPets);
          });
        });
      }
    } catch (error) {
      console.error('_initPetsAcomodation', error);
    }

    try {
      document.querySelectorAll("input[name='rbtnPetsSeatOutbound']").forEach((input) => {
        if (input?.value === petsManagement?.change_accomodation?.outbound?.accId) {
          input.closest('.js-box-acomodations__card').classList.add('active');
          input.checked = true;
        } else {
          input.checked = false;
        }
      });

      document.querySelectorAll("input[name='rbtnSeatInbound']").forEach((input) => {
        if (input?.value === petsManagement?.change_accomodation?.inbound?.accId) {
          input.closest('.js-box-acomodations__card').classList.add('active');
          input.checked = true;
        } else {
          input.checked = false;
        }
      });
    } catch (error) {
      console.error('_initPetsAcomodation', error);
    }
    _setPets();
  };

  const _setPets = () => {
    let price = 0.0;
    petsManagement.change_accomodation.forEach((pet, petIndex) => {
      let otherAccommodationPassagerList = document.querySelectorAll(`input[name=${`petAccomodation-${petIndex}`}]`);
      let otherAVList = Array.from(otherAccommodationPassagerList);
      otherAVList = otherAVList.filter((item) => item.checked === true);
      if (otherAVList) {
        otherAVList.forEach((item) => {
          if (item.defaultValue) {
            let aux_price = parseFloat(item.defaultValue);
            price = price + aux_price;
          }
        });
      }
      let price_string = price;
      _displayPetTrip(price_string);
    });
  };

  const _displayPetTrip = (price) => {
    let priceDisplay = document.querySelector('.js-pet-accomodation-price');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  };

  const _openPetsAcomodations = (e) => {
    e.target.closest('.box-acomodations').querySelector('.js-box-acomodations-body')?.classList.toggle('active');
    _setPets();
  };

  const _updatePetsAcomodations = (e) => {
    try {
      document.querySelectorAll("input[name='rbtnPetsSeatOutbound']").forEach((input) => {
        if (input?.checked === true) {
          petsManagement.change_accomodation.outbound = {
            ...petsManagement.change_accomodation.outbound,
            accId: input.value,
          };
        }
      });

      document.querySelectorAll("input[name='rbtnPetsSeatInbound']").forEach((input) => {
        if (input?.checked === true) {
          petsManagement.change_accomodation.inbound = {
            ...petsManagement.change_accomodation.inbound,
            accId: input.value,
          };
        }
      });

      setState({
        petsManagement: { ...petsManagement },
      });

      MicroModal.close('modal-cambios-mascotas-acomodaciones');
    } catch (error) {
      console.error('_initPetsAcomodation', error);
    }
  };

  const _setPetsActive = (e) => {
    let name = e?.currentTarget?.name;
    let radioButtons = document.querySelectorAll('input[name="' + name + '"]');
    radioButtons.forEach((radioButton) => {
      if (!radioButton.checked) {
        radioButton.closest('.js-box-acomodations__card').classList.remove('active');
      } else {
        e.target.closest('.js-box-acomodations__card').classList.add('active');
      }
    });
  };

  document
    .querySelector('.js-modal-cambios-mascotas-acomodaciones')
    ?.addEventListener('click', _initPetsAcomodation, true);

  document.querySelectorAll('.js-update-pets-acomodations').forEach((e) => {
    e?.addEventListener('click', _openPetsAcomodations, true);
  });

  document.querySelectorAll("input[name='rbtnPetsSeatOutbound']").forEach((input) => {
    input.addEventListener('change', _setPetsActive);
  });

  document.querySelectorAll("input[name='rbtnPetsSeatInbound']").forEach((input) => {
    input.addEventListener('change', _setPetsActive);
  });

  document.querySelector('.js-update-data-pets-acomodations')?.addEventListener('click', _updatePetsAcomodations, true);

  // Añadir mascotas a tu reserva
  const _initAddPets = () => {
    document.querySelector('.js-quantity-small-pet').innerHTML = petsManagement.add_pets.small;
    document.querySelector('.js-quantity-big-pet').innerHTML = petsManagement.add_pets.big;
  };
  document.querySelector('.js-modal-cambios-añadir-mascotas')?.addEventListener('click', _initAddPets, true);

  // Anular viaje de una mascota

  const _toggleEnabledPetTrip = (e) => {
    let parentModal = e.target.closest('.modal');
    checkPetAnulationEnabled(parentModal);
  };

  const checkPetAnulationEnabled = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-modal-cancel-pet-trip');
    let anulablePetCheckList = parentModal.querySelectorAll('input[type=checkbox][name=cancelPlan]');
    let btnStatus = true;
    let otherPetList = Array.from(anulablePetCheckList);
    otherPetList = otherPetList.filter((item) => item.checked === true);
    if (otherPetList.length > 0) {
      otherPetList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-cancel-type');
        if (sel.value == '') {
          btnStatus = false;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _displayPetAnulationPrice = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    let parentModal = e.target.closest('.modal');
    let otherPetAnulationList = parentModal.querySelectorAll('input[type=checkbox][name=cancelPlan]');
    let priceDisplay = parentModal.querySelector('.js-pet-plan-price');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherPetAnulationList);
    otherAVList = otherAVList.filter((item) => item.checked === true);

    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.dataset.price) {
          let aux_price = parseFloat(item.dataset.price);
          price = price + aux_price;
        }
      });
    }
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  };

  const _petAnulationProcess = (e) => {
    let price = e.target.closest('div').querySelector('.js-display-cancel-reserved').innerHTML;
    MicroModal.close('modal-cambios-añadir-mascotas-ok');
    MicroModal.close('modal-cambios-añadir-mascotas');
    let modal = document.getElementById('modal-reservation-mascota-anulation-ok');
    modal.querySelector('.js-petAll-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-mascota-anulation-ok');
  };

  document.querySelectorAll('.js-modal-cancel-pet-trip').forEach((el) => {
    el.addEventListener('click', _petAnulationProcess);
  });

  const _anulationAllProcess = (e) => {
    let price = e.target.closest('div').querySelector('.js-display-cancel-reserved').innerHTML;
    console.log({ price });
    MicroModal.close('modal-cambios-anular-reserva');
    let modal = document.getElementById('modal-reservation-mascota-anulation-ok');
    console.log({ price });
    modal.querySelector('.js-petAll-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-mascota-anulation-ok');
  };

  document.querySelectorAll('.js-modal-cancel-all-trip').forEach((el) => {
    el.addEventListener('click', _anulationAllProcess);
  });

  const _anulationGoProcess = (e) => {
    let price = e.target.closest('div').querySelector('.js-display-cancel-reserved-going').innerHTML;
    console.log({ price });
    MicroModal.close('modal-cambios-anular-vuelta');
    let modal = document.getElementById('modal-reservation-mascota-anulation-ok');
    console.log({ price });
    modal.querySelector('.js-petAll-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-mascota-anulation-ok');
  };

  document.querySelectorAll('.js-modal-cancel-all-going-trip').forEach((el) => {
    el.addEventListener('click', _anulationGoProcess);
  });

  const _anulationPassagerProcess = (e) => {
    MicroModal.close('modal-cambios-anulaciones');
    MicroModal.close('modal-cambios-anular-reserva');
    MicroModal.close('modal-cambios-anular-vuelta');
    MicroModal.close('modal-cambios-anular-pasajero');

    MicroModal.show('modal-reservation-change-ok');
  };

  document.querySelectorAll('.js-display-anulation-passenger').forEach((el) => {
    el.addEventListener('click', _anulationPassagerProcess);
  });

  const _anulationPet = (e) => {
    let price = e.target.closest('div').querySelector('.js-pet-anulation').innerHTML;
    console.log({ price });
    MicroModal.close('modal-cambios-anular-mascota2');
    let modal = document.getElementById('modal-reservation-mascota-anulation-ok');
    console.log({ price });
    modal.querySelector('.js-petAll-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-mascota-anulation-ok');
  };

  document.querySelectorAll('.js-display-anulation-pet').forEach((el) => {
    el.addEventListener('click', _anulationPet);
  });

  const _anulationCar = (e) => {
    let price = e.target.closest('div').querySelector('.js-car-anulation').innerHTML;
    console.log({ price });
    MicroModal.close('modal-cambios-anular-vehiculo');
    let modal = document.getElementById('modal-reservation-mascota-anulation-ok');
    console.log({ price });
    modal.querySelector('.js-petAll-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-mascota-anulation-ok');
  };

  document.querySelectorAll('.js-display-anulation-car').forEach((el) => {
    el.addEventListener('click', _anulationCar);
  });

  const _anulationRestaurant = (e) => {
    let price = e.target.closest('div').querySelector('.js-display-price-cancel-bonus').innerHTML;
    console.log({ price });
    MicroModal.close('modal-cambios-anular-servicios');
    MicroModal.close('modal-cambios-anular-bono');
    MicroModal.close('modal-cambios-anular-pasajero');
    let modal = document.getElementById('modal-reservation-mascota-anulation-ok');
    console.log({ price });
    modal.querySelector('.js-petAll-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-mascota-anulation-ok');
  };

  document.querySelectorAll('#cancelBonus').forEach((el) => {
    el.addEventListener('click', _anulationRestaurant);
  });

  const _anulationMenu = (e) => {
    let price = e.target.closest('div').querySelector('.js-board-anulation').innerHTML;
    console.log({ price });
    MicroModal.close('modal-cambios-anular-servicios');
    MicroModal.close('modal-cambios-anular-menus');
    MicroModal.close('modal-cambios-anular-pasajero');
    let modal = document.getElementById('modal-reservation-mascota-anulation-ok');
    console.log({ price });
    modal.querySelector('.js-petAll-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-mascota-anulation-ok');
  };

  document.querySelectorAll('.js-display-anulation-board').forEach((el) => {
    el.addEventListener('click', _anulationMenu);
  });

  const _anulationParking = (e) => {
    let price = e.target.closest('div').querySelector('.js-parking-anulation').innerHTML;
    console.log({ price });
    MicroModal.close('modal-cambios-anular-servicios');
    MicroModal.close('modal-cambios-anular-parking');
    MicroModal.close('modal-cambios-anular-pasajero');
    let modal = document.getElementById('modal-reservation-mascota-anulation-ok');
    console.log({ price });
    modal.querySelector('.js-petAll-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-mascota-anulation-ok');
  };

  document.querySelectorAll('.js-display-anulation-parking').forEach((el) => {
    el.addEventListener('click', _anulationParking);
  });

  const _anulationBus = (e) => {
    let price = e.target.closest('div').querySelector('.js-bus-anulation').innerHTML;
    console.log({ price });
    MicroModal.close('modal-cambios-anular-servicios');
    MicroModal.close('modal-cambios-anular-bus');
    MicroModal.close('modal-cambios-anular-pasajero');
    let modal = document.getElementById('modal-reservation-mascota-anulation-ok');
    console.log({ price });
    modal.querySelector('.js-petAll-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-mascota-anulation-ok');
  };

  document.querySelectorAll('.js-display-anulation-bus').forEach((el) => {
    el.addEventListener('click', _anulationBus);
  });

  const _changeColor = (e) => {
    const lineR = document.getElementById('lineRecibido');
    const listR = document.getElementById('idRecibido');
    const listF = document.getElementById('idFavorito');
    const lineF = document.getElementById('lineFavorito');
    if (e.target.closest('.js-tabs-submenu__title')?.dataset.index == 0) {
      listR.classList.add('textActive');
      lineR.classList.add('lineActive');
      listF.classList.remove('textActive');
      lineF.classList.remove('lineActive');
    } else {
      listR.classList.remove('textActive');
      lineR.classList.remove('lineActive');
      listF.classList.add('textActive');
      lineF.classList.add('lineActive');
    }
  };

  document.querySelectorAll('.js-tabs-submenu__title').forEach((e) => {
    e.addEventListener('click', _changeColor);
  });

  const _changeTabs = (e) => {
    console.log(e.target.closest('.js-tabs-submenu__title'));
  };

  document.querySelectorAll('.js-tabs').forEach((e) => {
    e.addEventListener('click', _changeTabs);
  });

  document
    .querySelector('.js-modal-cambios-mascotas-acomodaciones')
    ?.addEventListener('click', _initPetsAcomodation, true);

  document.querySelectorAll('.js-name_pets-cancel-trip')?.forEach((e, index) => {
    e.innerHTML = petsManagement.cancel_pets_trip[index].name;
  });

  document.querySelectorAll('.js-type_pets-cancel-trip')?.forEach((e, index) => {
    e.innerHTML = petsManagement.cancel_pets_trip[index].type;
  });

  const _displayCancelPetsTrip = (e) => {
    e.target.closest('.js-box-acomodations')?.querySelector('.js-display-cancel-pets-trip')?.classList.toggle('active');

    let id = e.target.closest('.js-box-acomodations')?.dataset?.id;
    _initCancelPetsTrip(id);
    _displayPetAnulationPrice(e);
    _toggleEnabledPetTrip(e);
  };

  const _initCancelPetsTrip = (id) => {
    if (id) {
      document.querySelector('.js-cancel-type').value = petsManagement.cancel_pets_trip[id].cancel_motive;
    }
  };

  document.querySelectorAll('input[type=checkbox][name=cancelPlan]').forEach((e) => {
    e.addEventListener('change', _displayCancelPetsTrip);
  });

  const _updateCancelPetsTripData = (e) => {
    setState({
      petsManagement: { ...petsManagement },
    });

    MicroModal.close('modal-cambios-anular-mascota');
  };

  document.querySelector('.js-modal-cancel-pets-trip')?.addEventListener('click', _updateCancelPetsTripData, true);

  /* GESTIONAR VEHICULO */

  const _updateVehiclePlate = () => {
    setState({
      vehicleManagement: { ...vehicleManagement },
    });
    MicroModal.close('modal-cambios-vehiculos-matricula');
  };

  // Actualizar matrícula
  const _initVehiclePlate = () => {
    document.querySelector('.js-cambios-vehiculo-matricula').value = vehicleManagement?.update_plate[0]?.plate;
    document.querySelector('.js-cambios-remolque-matricula').value = vehicleManagement?.update_plate[1]?.plate;
  };
  document.querySelector('.js-modal-cambios-vehiculos-matricula')?.addEventListener('click', _initVehiclePlate, true);

  document.querySelector('.js-update-cambios-matricula-vehiculo')?.addEventListener('click', _updateVehiclePlate, true);

  // Cambiar de vehículo
  const _initVehicleBranch = () => {
    document.querySelector('.js-cambios-vehiculo-tipo').value = vehicleManagement?.change_vehicle?.type;
    document.querySelector('.js-cambios-vehiculo-marca').value = vehicleManagement?.change_vehicle?.branch;
    document.querySelector('.js-cambios-vehiculo-modelo').value = vehicleManagement?.change_vehicle?.modelo;
    document.querySelector('.js-add-charge-vehicle-extras').value = vehicleManagement?.change_vehicle?.checked;

    let radioButtons = document.querySelectorAll('input[name="js-add-option-charge-vehicle-extras"]');

    vehicleManagement?.change_vehicle?.options.map((e) => {
      if (e.checked === true) {
        radioButtons.forEach((option) => {
          if (option?.value === e?.description) {
            option.checked = true;
          }
        });
      }
    });
  };
  document.querySelector('.js-modal-cambios-vehiculo-data')?.addEventListener('click', _initVehicleBranch, true);

  const _updateVehicle = () => {
    setState({
      vehicleManagement: { ...vehicleManagement },
    });
    MicroModal.close('modal-cambios-vehiculo');
  };

  document.querySelector('.js-update-cambios-vehiculo')?.addEventListener('click', _updateVehicle, true);

  // Añadir un vehículo
  const vehicleOptionsSwitches = document.querySelectorAll('.js-switch');
  vehicleOptionsSwitches.forEach((sw) => {
    let input = sw.querySelector('input');
    let parent = sw.parentNode;
    let content = parent.querySelector('.js-switchable-content');
    if (content) {
      input.addEventListener('change', () => {
        if (input.checked) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    }
  });

  document
    .querySelector('.js-tabs-vehiculos-mejora')
    ?.querySelectorAll('.filter')
    ?.forEach((item, e) => {
      item.querySelector('input').addEventListener(
        'keyup',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          if (item.querySelector('input').value != '') {
            let input_value = item.querySelector('input').value;
            let brand =
              item.querySelector('label').textContent.toLocaleLowerCase() === 'marca'
                ? FILTER.filter((item) => item.brand.toLowerCase().includes(input_value.toLowerCase()))
                : filterModel(input_value);
            if (brand.length > 0) {
              item.querySelector('div').classList.add('active');
              item.querySelector('div').innerHTML = htmlFilter(brand);
              selectedFilter(document.querySelectorAll('.filter'));
            } else {
              item.querySelector('div').classList.remove('active');
              item.querySelector('div').innerHTML = '';
            }
          } else {
            item.querySelector('div').classList.remove('active');
            item.querySelector('div').innerHTML = '';
          }
        },
        false,
      );
    });

  const htmlFilter = (array) => {
    let html = '';
    array.forEach((item, e) => {
      html += `<p><span class="selected"></span>${item.name}</p> <div class="item">`;
    });
    return html;
  };

  const selectedFilter = (filter) => {
    filter.forEach((item, e) =>
      item
        .querySelector('div')
        .querySelectorAll('p')
        .forEach((event) => {
          event.addEventListener(
            'click',
            function (event) {
              event.preventDefault();
              event.stopPropagation();
              item.querySelector('input').value = event.target.textContent;
              item.querySelector('div').classList.remove('active');
              item.querySelector('div').innerHTML = '';
            },
            false,
          );
        }),
    );
  };

  const filterModel = (input_value) => {
    let brand_input = document.querySelector('#label_input').value;
    let brand = FILTER.filter((item) => item.brand.toLowerCase().includes(brand_input.toLowerCase()));
    return brand[0].model.filter((item) => item.name.toLowerCase().includes(input_value.toLowerCase()));
  };

  const savedVehicleChecks = document.querySelectorAll('.js-box-vehicle');
  savedVehicleChecks.forEach((check) => {
    let input = check.querySelector('input');
    let container = check.closest('.js-tabs__content');
    if (container) {
      check.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (input.checked) {
          input.checked = false;
        } else {
          input.checked = true;
        }
        let containerItems = container.querySelectorAll('.js-saved-vehicle-selection-view');
        containerItems.forEach((item) => {
          item.classList.toggle('active');
        });
      });
    }
  });
  document
    .querySelector('.js-tabs-vehiculos-mejora')
    ?.querySelectorAll('.js-tabs__title')[0]
    .addEventListener('click', (e) => {
      let container = document.querySelector('.js-tabs-vehiculos-mejora')?.querySelectorAll('.js-tabs__content')[0];
      let containerItems = container.querySelectorAll('.js-saved-vehicle-selection-view');
      containerItems[0].classList.add('active');
      containerItems[1].classList.remove('active');
    });

  // Añadir un remolque
  const _initAddTrailer = () => {
    document.querySelector('.js-add-trailer').value = vehicleManagement?.trailer?.checked;

    let radioButtons = document.querySelectorAll('input[name="js-add-option-add-trailer"]');

    vehicleManagement?.trailer?.options.map((e) => {
      if (e.checked === true) {
        radioButtons.forEach((option) => {
          if (option?.value === e?.description) {
            option.checked = true;
          }
        });
      }
    });
  };
  document.querySelector('.js-modal-cambios-añadir-remolque')?.addEventListener('click', _initAddTrailer, true);

  // Anular vehículo
  document.querySelectorAll('.js-plate_vehicle-cancel-trip')?.forEach((e, index) => {
    e.innerHTML = vehicleManagement.cancel_vehicle_trip[index].plate;
  });

  document.querySelectorAll('.js-type_vehicle-cancel-trip')?.forEach((e, index) => {
    e.innerHTML = vehicleManagement.cancel_vehicle_trip[index].type;
  });

  const _displayCancelVehicleTrip = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    let parentModal = e.target.closest('.modal');
    let otherAnulableVehicleList = parentModal.querySelectorAll('input[type=checkbox][name=cancelVehicle]');
    let priceDisplay = parentModal.querySelector('.js-vehicle-anulation-price');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherAnulableVehicleList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.dataset.price) {
          let aux_price = parseFloat(item.dataset.price);
          price = price + aux_price;
        }
      });
    }
    let price_string = price.toFixed(2).replace('.', ',');
    checkVehicleAnulationEnabled(parentModal);
    priceDisplay.innerHTML = price_string;
    e.target.closest('.js-box-acomodations')?.querySelector('.js-display-cancel-vehicle')?.classList.toggle('active');

    let id = e.target.closest('.js-box-acomodations')?.dataset?.id;
    _initCancelVehicleTrip(id);
  };
  const _toggleEnabledVehicleTrip = (e) => {
    let parentModal = e.target.closest('.modal');
    checkVehicleAnulationEnabled(parentModal);
  };
  const checkVehicleAnulationEnabled = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-btn-vehicle-anulation');
    let anulableVehicleCheckList = parentModal.querySelectorAll('input[type=checkbox][name=cancelVehicle]');
    let btnStatus = true;
    let otherAVList = Array.from(anulableVehicleCheckList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    if (otherAVList.length > 0) {
      otherAVList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-vehicle-anulation-reason-sel');
        if (sel.value == '') {
          btnStatus = false;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _vehicleAnulationProcess = (e) => {
    let price = e.target.closest('div').querySelector('.js-vehicle-anulation-price').innerHTML;
    MicroModal.close('modal-cambios-anular-vehiculo1');
    let modal = document.getElementById('modal-reservation-vehicle-anulation-ok');
    modal.querySelector('.js-vehicle-anulation-price').innerHTML = price;
    MicroModal.show('modal-reservation-vehicle-anulation-ok');
  };

  const _initCancelVehicleTrip = (id) => {
    if (id) {
      document.querySelector('.js-cancel-type').value = vehicleManagement.cancel_vehicle_trip[id].cancel_motive;
    }
  };

  document.querySelectorAll('input[type=checkbox][name=cancelVehicle]').forEach((e) => {
    e.addEventListener('change', _displayCancelVehicleTrip);
  });
  document.querySelectorAll('.js-vehicle-anulation-reason-sel').forEach((el) => {
    el.addEventListener('change', _toggleEnabledVehicleTrip);
  });
  document.querySelectorAll('.js-btn-vehicle-anulation').forEach((el) => {
    el.addEventListener('click', _vehicleAnulationProcess);
  });

  const _updateCancelVehicleTripData = (e) => {
    setState({
      vehicleManagement: { ...vehicleManagement },
    });

    MicroModal.close('modal-cambios-anular-vehiculo');
  };

  document
    .querySelector('.js-modal-cancel-vehicle-trip')
    ?.addEventListener('click', _updateCancelVehicleTripData, true);

  ///// Anular viaje pasajero
  const _toggleEnabledPassangerTrip = (e) => {
    let parentModal = e.target.closest('.modal');
    checkPassangerAnulationEnabled(parentModal);
  };

  const checkPassangerAnulationEnabled = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-modal-cancel-passenger-trip');
    let anulablePassengerCheckList = parentModal.querySelectorAll('input[type=checkbox][name=cancel]');
    let btnStatus = true;
    let otherAVList = Array.from(anulablePassengerCheckList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    if (otherAVList.length > 0) {
      otherAVList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-passenger-anulation-reason-sel');
        if (sel.value == '') {
          btnStatus = false;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _displayCancelPassagerTrip = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    let parentModal = e.target.closest('.modal');
    let otherAnulablePassagerList = parentModal.querySelectorAll('input[type=checkbox][name=cancel]');
    let priceDisplay = parentModal.querySelector('.js-passenger-anulation-price');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherAnulablePassagerList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.dataset.price) {
          let aux_price = parseFloat(item.dataset.price);
          price = price + aux_price;
        }
      });
    }
    let price_string = price.toFixed(2).replace('.', ',');
    checkPassangerAnulationEnabled(parentModal);
    priceDisplay.innerHTML = price_string;
    e.target
      .closest('.js-box-acomodations')
      ?.querySelector('.js-display-cancel-passenger-trip')
      ?.classList.toggle('active');
  };

  document.querySelectorAll('.js-passenger-anulation-reason-sel').forEach((el) => {
    el.addEventListener('change', _toggleEnabledPassangerTrip);
  });

  document.querySelectorAll('input[type=checkbox][name=cancel]').forEach((e) => {
    e.addEventListener('change', _displayCancelPassagerTrip);
  });

  /****Cambiar asistencia de pasajeros***** */
  const checkPassangerAsistenceEnabled = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-modal-cambios-asistencia-especial');
    let anulablePassengerCheckList = parentModal.querySelectorAll('input[type=checkbox][name=asistance-passenger]');
    let btnStatus = true;
    let otherAVList = Array.from(anulablePassengerCheckList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    if (otherAVList.length > 0) {
      otherAVList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-passenger-asistence-reason-sel');
        if (sel.value == '') {
          btnStatus = true;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _displayAsistencePassagerTrip = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    let parentModal = e.target.closest('.modal');
    let otherAsistencePassagerList = parentModal.querySelectorAll('input[type=checkbox][name=asistance-passenger]');
    let priceDisplay = parentModal.querySelector('.js-passenger-asistence-price');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherAsistencePassagerList);
    otherAVList = otherAVList.filter((item) => item.checked === true);

    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.defaultValue) {
          let aux_price = parseFloat(item.defaultValue);
          price = price + aux_price;
        }
      });
    }
    let price_string = price.toFixed(2).replace('.', ',');
    checkPassangerAsistenceEnabled(parentModal);
    priceDisplay.innerHTML = price_string;
    e.target
      .closest('.js-box-acomodations')
      ?.querySelector('.js-display-cancel-passenger-trip')
      ?.classList.toggle('active');
  };

  document.querySelectorAll('input[type=checkbox][name=asistance-passenger]').forEach((e) => {
    e.addEventListener('change', _displayAsistencePassagerTrip);
  });

  /****Modificar bono de restaurante***** */
  const _displayBono = (price) => {
    let priceDisplay = document.querySelector('.js-total-menu');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
    document.getElementById('btn-bono').disabled = false;
  };
  const _displayBonoPrice = (price) => {
    let priceDisplay = document.querySelector('.js-bono-price');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
    document.getElementById('btn-bono').disabled = false;
  };

  if (document.querySelector('input[name="radio"]')) {
    document.querySelectorAll('input[name="radio"]').forEach((elem) => {
      elem.addEventListener('change', function (event) {
        let otherAccommodationPassagerList = document.querySelectorAll('[name=radio]');
        let otherAVList = Array.from(otherAccommodationPassagerList);
        otherAVList = otherAVList.filter((item) => item.checked === true);
        let price = 0.0;
        if (otherAVList) {
          otherAVList.forEach((item) => {
            if (item.dataset.price) {
              let aux_price = parseFloat(item.dataset.price);
              price = aux_price;
            }
          });
        }
        var item = price;
        let price_string = item;
        _displayBono(price_string);
      });
    });
  }

  if (document.querySelector('input[name="radioT"]')) {
    document.querySelectorAll('input[name="radioT"]').forEach((elem) => {
      elem.addEventListener('change', function (event) {
        let otherAccommodationPassagerList = document.querySelectorAll('[name=radioT]');
        let otherAVList = Array.from(otherAccommodationPassagerList);
        otherAVList = otherAVList.filter((item) => item.checked === true);
        let price = 0.0;
        if (otherAVList) {
          otherAVList.forEach((item) => {
            if (item.dataset.price) {
              let aux_price = parseFloat(item.dataset.price);
              price = aux_price;
            }
          });
        }
        var item = price;
        let price_string = item;
        _displayBonoPrice(price_string);
      });
    });
  }

  /****Añadir mascotas a tu reserva disponibilidad***** */
  const _displayPet = (price) => {
    let priceDisplay = document.querySelector('.js-pet-price');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
    document.getElementById('btn-bono').disabled = false;
  };

  if (document.querySelector('input[name="radioPet"]')) {
    document.querySelectorAll('input[name="radioPet"]').forEach((elem) => {
      elem.addEventListener('change', function (event) {
        let otherAccommodationPassagerList = document.querySelectorAll('[name=radioPet]');
        let otherAVList = Array.from(otherAccommodationPassagerList);
        otherAVList = otherAVList.filter((item) => item.checked === true);
        let price = 0.0;
        if (otherAVList) {
          otherAVList.forEach((item) => {
            if (item.dataset.price) {
              let aux_price = parseFloat(item.dataset.price);
              price = aux_price;
            }
          });
        }
        var item = price;
        let price_string = item;
        _displayPet(price_string);
      });
    });
  }

  if (document.querySelector('input[name="radioPetD"]')) {
    document.querySelectorAll('input[name="radioPetD"]').forEach((elem) => {
      elem.addEventListener('change', function (event) {
        let otherAccommodationPassagerList = document.querySelectorAll('[name=radioPetD]');
        let otherAVList = Array.from(otherAccommodationPassagerList);
        otherAVList = otherAVList.filter((item) => item.checked === true);
        let price = 0.0;
        if (otherAVList) {
          otherAVList.forEach((item) => {
            if (item.dataset.price) {
              let aux_price = parseFloat(item.dataset.price);
              price = aux_price;
            }
          });
        }
        var item = price;
        let price_string = item;
        _displayBonoPrice(price_string);
      });
    });
  }

  /****Cambiar acomodación de pasajeros***** */
  const _displayAccommodationPassagerTrip = (price) => {
    let priceDisplay = document.querySelector('.js-accommodation-price');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  };

  if (document.querySelector('input[name="rbtnSeatOutbound"]')) {
    document.querySelectorAll('input[name="rbtnSeatOutbound"]').forEach((elem) => {
      elem.addEventListener('change', function (event) {
        let otherAccommodationPassagerList = document.querySelectorAll('[name=rbtnSeatInbound]');
        let otherAVList = Array.from(otherAccommodationPassagerList);
        otherAVList = otherAVList.filter((item) => item.checked === true);
        let price = 0.0;
        if (otherAVList) {
          otherAVList.forEach((item) => {
            if (item.defaultValue) {
              let aux_price = parseFloat(item.defaultValue);
              price = price + aux_price;
            }
          });
        }
        var item = price + parseFloat(event.target.value);
        let price_string = item;
        _displayAccommodationPassagerTrip(price_string);
      });
    });
  }

  if (document.querySelector('input[name="rbtnSeatInbound"]')) {
    document.querySelectorAll('input[name="rbtnSeatInbound"]').forEach((elem) => {
      elem.addEventListener('change', function (event) {
        let otherAccommodationPassagerList = document.querySelectorAll('[name=rbtnSeatOutbound]');
        let otherAVList = Array.from(otherAccommodationPassagerList);
        otherAVList = otherAVList.filter((item) => item.checked === true);
        let price = 0.0;
        if (otherAVList) {
          otherAVList.forEach((item) => {
            if (item.defaultValue) {
              let aux_price = parseFloat(item.defaultValue);
              price = price + aux_price;
            }
          });
        }
        var item = price + parseFloat(event.target.value);
        let price_string = item;
        _displayAccommodationPassagerTrip(price_string);
      });
    });
  }

  /* management dashboard */
  const _toggleEnabledModalFilter = (e) => {
    const globalFilter = document.querySelector('#global-filter');
    globalFilter.classList.add('open');
    const sourceData = document.querySelector('#source-data');
    sourceData.classList.add('disabled');
    const destinationData = document.querySelector('#destination-data');
    destinationData.classList.add('disabled');
    const travelDateData = document.querySelector('#travel-date-data');
    travelDateData.classList.add('disabled');
  };

  const _toggleEnabledModalFilterSource = (e) => {
    const globalFilter = document.querySelector('#global-filter');
    globalFilter.classList.add('open');
    const sourceData = document.querySelector('#high-date-data');
    sourceData.classList.add('disabled');
    const destinationData = document.querySelector('#destination-data');
    destinationData.classList.add('disabled');
    const travelDateData = document.querySelector('#travel-date-data');
    travelDateData.classList.add('disabled');
  };

  const _toggleEnabledModalFilterDestination = (e) => {
    const globalFilter = document.querySelector('#global-filter');
    globalFilter.classList.add('open');
    const sourceData = document.querySelector('#high-date-data');
    sourceData.classList.add('disabled');
    const destinationData = document.querySelector('#source-data');
    destinationData.classList.add('disabled');
    const travelDateData = document.querySelector('#travel-date-data');
    travelDateData.classList.add('disabled');
  };

  const _toggleEnabledModalFilterTravelDate = (e) => {
    const globalFilter = document.querySelector('#global-filter');
    globalFilter.classList.add('open');
    const sourceData = document.querySelector('#high-date-data');
    sourceData.classList.add('disabled');
    const destinationData = document.querySelector('#source-data');
    destinationData.classList.add('disabled');
    const travelDateData = document.querySelector('#destination-data');
    travelDateData.classList.add('disabled');
  };

  const _toggleDisabledModalFilter = (e) => {
    const globalFilter = document.querySelector('#global-filter');
    const highDate = document.querySelector('#high-date-data');
    highDate.classList.remove('disabled');
    const sourceData = document.querySelector('#source-data');
    sourceData.classList.remove('disabled');
    const destinationData = document.querySelector('#destination-data');
    destinationData.classList.remove('disabled');
    const travelDateData = document.querySelector('#travel-date-data');
    travelDateData.classList.remove('disabled');
    globalFilter.classList.remove('open');
    /*let d = document.getElementsByClassName('g-modal--info__levels');
    d.classList ? d.classList.add('open') : d.className += ' open';
    console.log('modal:', d)   */
    //checkPassangerAnulationEnabled(parentModal);
  };

  document.querySelectorAll('.js-modal-filter-high-date').forEach((el) => {
    el.addEventListener('click', _toggleEnabledModalFilter);
  });

  document.querySelectorAll('.js-modal-filter-back').forEach((el) => {
    el.addEventListener('click', _toggleDisabledModalFilter);
  });

  document.querySelectorAll('.js-modal-filter-source').forEach((el) => {
    el.addEventListener('click', _toggleEnabledModalFilterSource);
  });

  document.querySelectorAll('.js-modal-filter-destination').forEach((el) => {
    el.addEventListener('click', _toggleEnabledModalFilterDestination);
  });

  document.querySelectorAll('.js-modal-filter-travel-date').forEach((el) => {
    el.addEventListener('click', _toggleEnabledModalFilterTravelDate);
  });

  // Anular servicios extras

  /* GESTIONAR SERVICIOS EXTRAS  - REVISAR */
  // Modificar Bono restaurante

  // Añade menús a bordo

  // Añade equipaje adicional

  // Modificar Parking

  // Añade más billetes de bus

  // Anular servicios extra
  // Anular Bono restaurante
  // Anular menús a bordo
  // Anular parking en el puerto
  // Anular billetes de bus - opcipn dublicada en el mismo modal

  /* ANULACIONES */
  // Anular toda la reserva
  // Anular sólo la vuelta
  // Anular viaje de un pasajero
  // Anular viaje de una mascota
  // Anular vehículo

  // Anular servicios extra (DUPLICADO)

  const _addInputEmail = (e) => {
    if (document.querySelectorAll('.js-input-email')?.length <= MAX_FIELD) {
      let clone = document.querySelector('.js-section-add-email').cloneNode(true);
      document.querySelector('.js-section-parent-add-email').appendChild(clone);
      if (document.querySelectorAll('.js-input-email')?.length === MAX_FIELD) {
        document.querySelector('.js-add-input-email')?.classList.add('u-no-display');
      }
    }
  };

  document.querySelector('.js-add-input-email')?.addEventListener('click', _addInputEmail, true);

  const sections = document.querySelectorAll('.js-box-container .js-list-item');
  const navLi = document.querySelectorAll('.g-nav-vertical ul li');

  var current = '';
  window.addEventListener('scroll', (e) => {
    sections.forEach((section) => {
      //const sectionTop = section.offsetTop;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      if (window.pageYOffset >= sectionTop - 120) {
        //if (sectionTop - 50 < 0) {
        current = section.getAttribute('id');
      }
    });

    navLi.forEach((li) => {
      li.childNodes[1]?.classList.remove('active');
      if (li.childNodes[1]?.classList.contains(current)) {
        li.childNodes[1]?.classList.add('active');
      }
    });
  });

  const activeClass = 'active';

  const resumeBar = document.querySelector('.bar-items--reservation');
  const totalPriceContainer = resumeBar?.querySelector('.js-summary__total');
  if (totalPriceContainer) {
    var observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        let totalPrice = totalPriceContainer?.innerHTML;
        if (parseFloat(totalPrice) == 0) {
          if (resumeBar.classList.contains('show')) {
            resumeBar.classList.remove('show');
          }
        } else {
          if (!resumeBar.classList.contains('show')) {
            resumeBar.classList.add('show');
          }
        }
      });
    });
    observer.observe(totalPriceContainer, { childList: true });
  }

  const _setClassToActive = function (classToActive) {
    document.querySelectorAll('.g-nav-vertical--item').forEach((e) => {
      if (e.classList.contains(classToActive) === true) {
        e.classList.add(activeClass);
      } else {
        e.classList.remove(activeClass);
      }
    });
  };

  const _scrollToAcomodation = function () {
    document.querySelector('.js-res-accomodation')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    _setClassToActive('js-scrollToAcomodation');
    current = 'js-scrollToAcomodation';
  };
  document.querySelector('.js-scrollToAcomodation')?.addEventListener('click', _scrollToAcomodation, true);

  const _scrollToRestaurant = function () {
    document.querySelector('.js-res-restaurant')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    _setClassToActive('js-scrollToRestaurant');
    current = 'js-scrollToRestaurant';
  };
  document.querySelector('.js-scrollToRestaurant')?.addEventListener('click', _scrollToRestaurant, true);

  const _scrollToWifi = function () {
    document.querySelector('.js-res-wifi')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    _setClassToActive('js-scrollToWifi');
    current = 'js-scrollToWifi';
  };
  document.querySelector('.js-scrollToWifi')?.addEventListener('click', _scrollToWifi, true);

  const _scrollToParking = function () {
    document.querySelector('.js-res-parking')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    _setClassToActive('js-scrollToParking');
    current = 'js-scrollToParking';
  };
  document.querySelector('.js-scrollToParking')?.addEventListener('click', _scrollToParking, true);

  const _scrollToLand = function () {
    document.querySelector('.js-res-land')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    _setClassToActive('js-scrollToLand');
    current = 'js-scrollToLand';
  };
  document.querySelector('.js-scrollToLand')?.addEventListener('click', _scrollToLand, true);

  /// Añade equipaje adicional
  const _displayAddBaggage = (price) => {
    let priceDisplay = document.querySelector('.js-baggage-price');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  };

  //js-input-baggage

  const _toggleAddbaggage = (e) => {
    let sel = document.querySelector('.js-add-aditional-baggage-sel');
    let selInput = document.querySelector('.js-input-baggage');
    let btnStatus = true;
    if (sel.value == '' || selInput.value == '') {
      btnStatus = false;
    } else {
      let otherList = document.querySelectorAll('.js-add-aditional-baggage-sel');
      let otherAVList = Array.from(otherList);
      let price = 0.0;
      if (otherAVList) {
        otherAVList.forEach((item) => {
          if (item.value) {
            let aux_price = parseFloat(item.value);
            price = price + aux_price;
          }
        });
        let price_string = price;
        _displayAddBaggage(price_string);
      }
      btnStatus = true;
    }
    if (btnStatus) {
      document.getElementById('addBaggage').disabled = false;
    } else {
      document.getElementById('addBaggage').disabled = true;
    }
  };

  document.querySelectorAll('.js-add-aditional-baggage-sel').forEach((e) => {
    e.addEventListener('change', _toggleAddbaggage);
  });

  /// Anular Bono restaurante2

  const _displayCancelBonus = (price) => {
    let priceDisplay = document.querySelector('.js-display-price-cancel-bonus');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  };

  const _toggleCancelBonus = (e) => {
    let sel = document.querySelector('.js-cancel-bonus');
    let btnStatus = true;
    if (sel.value == '') {
      btnStatus = false;
    } else {
      let otherList = document.querySelectorAll('.js-cancel-bonus');
      let otherAVList = Array.from(otherList);
      let price = 0.0;
      if (otherAVList) {
        otherAVList.forEach((item) => {
          if (item.value) {
            let aux_price = parseFloat(item.value);
            price = price + aux_price;
          }
        });
        let price_string = price;
        _displayCancelBonus(price_string);
      }
      btnStatus = true;
    }
    if (btnStatus) {
      document.getElementById('cancelBonus').disabled = false;
    } else {
      document.getElementById('cancelBonus').disabled = true;
    }
  };

  document.querySelectorAll('.js-cancel-bonus').forEach((e) => {
    e.addEventListener('change', _toggleCancelBonus);
  });

  //Anular toda la reserva

  const _displayCancelReserved = (price) => {
    let priceDisplay = document.querySelector('.js-display-cancel-reserved');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  };

  const _toggleCancelReserved = (e) => {
    let sel = document.querySelector('.js-cancel-reserved');
    let btnStatus = true;
    if (sel.value == '') {
      btnStatus = false;
    } else {
      let otherList = document.querySelectorAll('.js-cancel-reserved');
      let otherAVList = Array.from(otherList);
      let price = 0.0;
      if (otherAVList) {
        otherAVList.forEach((item) => {
          if (item.value) {
            let aux_price = parseFloat(item.value);
            price = price + aux_price;
          }
        });
        let price_string = price;
        _displayCancelReserved(price_string);
      }
      btnStatus = true;
    }
    if (btnStatus) {
      document.getElementById('cancelReserved').disabled = false;
    } else {
      document.getElementById('cancelReserved').disabled = true;
    }
  };

  document.querySelectorAll('.js-cancel-reserved').forEach((e) => {
    e.addEventListener('change', _toggleCancelReserved);
  });

  //Anular toda la reserva ida

  const _displayCancelReservedGoing = (price) => {
    let priceDisplay = document.querySelector('.js-display-cancel-reserved-going');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  };

  const _toggleCancelReservedGoing = (e) => {
    let sel = document.querySelector('.js-cancel-reserved-going');
    let btnStatus = true;
    if (sel.value == '') {
      btnStatus = false;
    } else {
      let otherList = document.querySelectorAll('.js-cancel-reserved-going');
      let otherAVList = Array.from(otherList);
      let price = 0.0;
      if (otherAVList) {
        otherAVList.forEach((item) => {
          if (item.value) {
            let aux_price = parseFloat(item.value);
            price = price + aux_price;
          }
        });
        let price_string = price;
        _displayCancelReservedGoing(price_string);
      }
      btnStatus = true;
    }
    if (btnStatus) {
      document.getElementById('cancelReservedGoing').disabled = false;
    } else {
      document.getElementById('cancelReservedGoing').disabled = true;
    }
  };

  document.querySelectorAll('.js-cancel-reserved-going').forEach((e) => {
    e.addEventListener('change', _toggleCancelReservedGoing);
  });

  /// Anular viaje de un pasajero 2
  const _toggleEnabledPassanger = (e) => {
    let parentModal = e.target.closest('.modal');
    checkPassangerAnulation(parentModal);
  };

  const checkPassangerAnulation = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-display-anulation-passenger');
    let anulablePassengerCheckList = parentModal.querySelectorAll('input[type=checkbox][name=asistance]');
    let btnStatus = true;
    let otherAVList = Array.from(anulablePassengerCheckList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    if (otherAVList.length > 0) {
      otherAVList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-passenger-anulation-sel');
        if (sel.value == '') {
          btnStatus = false;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _displayAnulationPassager = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    const parentModal = e.target.closest('.modal');
    const otherAnulablePassagerList = parentModal.querySelectorAll('input[type=checkbox][name=asistance]');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherAnulablePassagerList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.dataset.price) {
          const aux_price = parseFloat(item.dataset.price);
          price = price + aux_price;
        }
      });
    }
    let priceDisplay = document.querySelector('.js-passenger-anulation');
    const price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
    checkPassangerAnulationEnabled(parentModal);
  };

  document.querySelectorAll('.js-passenger-anulation-sel').forEach((el) => {
    el.addEventListener('change', _toggleEnabledPassanger);
  });

  document.querySelectorAll('input[type=checkbox][name=asistance]').forEach((e) => {
    e.addEventListener('change', _displayAnulationPassager);
  });

  /// Anular viaje de un mascotas 2
  const _toggleEnabledPet = (e) => {
    let parentModal = e.target.closest('.modal');
    checkPetAnulation(parentModal);
  };

  const checkPetAnulation = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-display-anulation-pet');
    let anulablePetCheckList = parentModal.querySelectorAll('input[type=checkbox][name=asistance-pet]');
    let btnStatus = true;
    let otherAVList = Array.from(anulablePetCheckList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    if (otherAVList.length > 0) {
      otherAVList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-pet-anulation-sel');
        if (sel.value == '') {
          btnStatus = false;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _displayAnulationPet = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    const parentModal = e.target.closest('.modal');
    const otherAnulablePetList = parentModal.querySelectorAll('input[type=checkbox][name=asistance-pet]');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherAnulablePetList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.dataset.price) {
          const aux_price = parseFloat(item.dataset.price);
          price = price + aux_price;
        }
      });
    }
    let priceDisplay = document.querySelector('.js-pet-anulation');
    const price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
    checkPetAnulationEnabled(parentModal);
  };

  document.querySelectorAll('.js-pet-anulation-sel').forEach((el) => {
    el.addEventListener('change', _toggleEnabledPet);
  });

  document.querySelectorAll('input[type=checkbox][name=asistance-pet]').forEach((e) => {
    e.addEventListener('change', _displayAnulationPet);
  });

  /// Anular vehiculo 2
  const _toggleEnabledCar = (e) => {
    let parentModal = e.target.closest('.modal');
    checkCarAnulation(parentModal);
  };

  const checkCarAnulation = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-display-anulation-car');
    let anulableCarCheckList = parentModal.querySelectorAll('input[type=checkbox][name=asistance-car]');
    let btnStatus = true;
    let otherAVList = Array.from(anulableCarCheckList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    if (otherAVList.length > 0) {
      otherAVList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-car-anulation-sel');
        if (sel.value == '') {
          btnStatus = false;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _displayAnulationCar = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    const parentModal = e.target.closest('.modal');
    const otherAnulablePetList = parentModal.querySelectorAll('input[type=checkbox][name=asistance-car]');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherAnulablePetList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.dataset.price) {
          const aux_price = parseFloat(item.dataset.price);
          price = price + aux_price;
        }
      });
    }
    let priceDisplay = document.querySelector('.js-car-anulation');
    const price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
    checkCarAnulation(parentModal);
    e.target
      .closest('.js-box-acomodations')
      ?.querySelector('.js-display-cancel-passenger-trip')
      ?.classList.toggle('active');
  };

  document.querySelectorAll('.js-car-anulation-sel').forEach((el) => {
    el.addEventListener('change', _toggleEnabledCar);
  });

  document.querySelectorAll('input[type=checkbox][name=asistance-car]').forEach((e) => {
    e.addEventListener('change', _displayAnulationCar);
  });

  //Anular menús a bordo
  const _toggleEnabledBoard = (e) => {
    let parentModal = e.target.closest('.modal');
    checkBoardAnulation(parentModal);
  };

  const checkBoardAnulation = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-display-anulation-board');
    let anulableCheckList = parentModal.querySelectorAll('input[type=checkbox][name=menu-board]');
    let btnStatus = true;
    let otherAVList = Array.from(anulableCheckList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    if (otherAVList.length > 0) {
      otherAVList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-board-anulation-sel');
        if (sel.value == '') {
          btnStatus = false;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _displayAnulationBoard = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    const parentModal = e.target.closest('.modal');
    const otherAnulableList = parentModal.querySelectorAll('input[type=checkbox][name=menu-board]');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherAnulableList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.dataset.price) {
          const aux_price = parseFloat(item.dataset.price);
          price = price + aux_price;
        }
      });
    }
    let priceDisplay = document.querySelector('.js-board-anulation');
    const price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
    checkBoardAnulation(parentModal);
    e.target.closest('.js-box-acomodations')?.querySelector('.js-display-cancel-trip')?.classList.toggle('active');
  };

  document.querySelectorAll('.js-board-anulation-sel').forEach((el) => {
    el.addEventListener('change', _toggleEnabledBoard);
  });

  document.querySelectorAll('input[type=checkbox][name=menu-board]').forEach((e) => {
    e.addEventListener('change', _displayAnulationBoard);
  });

  ///Anular parking en el puerto ++
  const _toggleEnabledParking = (e) => {
    let parentModal = e.target.closest('.modal');
    checkParkingAnulation(parentModal);
  };

  const checkParkingAnulation = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-display-anulation-parking');
    let anulableCheckList = parentModal.querySelectorAll('input[type=checkbox][name=parking]');
    let btnStatus = true;
    let otherAVList = Array.from(anulableCheckList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    if (otherAVList.length > 0) {
      otherAVList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-parking-anulation-sel');
        if (sel.value == '') {
          btnStatus = false;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _displayAnulationParking = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    const parentModal = e.target.closest('.modal');
    const otherAnulableList = parentModal.querySelectorAll('input[type=checkbox][name=parking]');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherAnulableList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.dataset.price) {
          const aux_price = parseFloat(item.dataset.price);
          price = price + aux_price;
        }
      });
    }
    let priceDisplay = document.querySelector('.js-parking-anulation');
    const price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
    checkParkingAnulation(parentModal);
    e.target.closest('.js-box-acomodations')?.querySelector('.js-display-cancel-parking')?.classList.toggle('active');
  };

  document.querySelectorAll('.js-parking-anulation-sel').forEach((el) => {
    el.addEventListener('change', _toggleEnabledParking);
  });

  document.querySelectorAll('input[type=checkbox][name=parking]').forEach((e) => {
    e.addEventListener('change', _displayAnulationParking);
  });

  ///Anular billetes de bus +
  const _toggleEnabledBus = (e) => {
    let parentModal = e.target.closest('.modal');
    checkBusAnulation(parentModal);
  };

  const checkBusAnulation = (parentModal) => {
    let anulationBtn = parentModal.querySelector('.js-display-anulation-bus');
    let anulableCheckList = parentModal.querySelectorAll('input[type=checkbox][name=bus]');
    let btnStatus = true;
    let otherAVList = Array.from(anulableCheckList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    if (otherAVList.length > 0) {
      otherAVList.forEach((item) => {
        let parentComponent = item.closest('.box-acomodations');
        let sel = parentComponent.querySelector('.js-bus-anulation-sel');
        if (sel.value == '') {
          btnStatus = false;
        }
      });
    } else {
      btnStatus = false;
    }
    if (btnStatus) {
      anulationBtn.disabled = false;
    } else {
      anulationBtn.disabled = true;
    }
  };

  const _displayAnulationBus = (e) => {
    let parentComponent = e.target.closest('.box-acomodations');
    const parentModal = e.target.closest('.modal');
    const otherAnulableList = parentModal.querySelectorAll('input[type=checkbox][name=bus]');
    let header = parentComponent.querySelector('.box-acomodations__header');
    let body = parentComponent.querySelector('.box-acomodations__body');
    if (e.target.checked) {
      parentComponent.classList.add('active');
      header.classList.add('active');
      body.classList.add('active');
    } else {
      parentComponent.classList.remove('active');
      header.classList.remove('active');
      body.classList.remove('active');
    }
    let otherAVList = Array.from(otherAnulableList);
    otherAVList = otherAVList.filter((item) => item.checked === true);
    let price = 0.0;
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (item.dataset.price) {
          const aux_price = parseFloat(item.dataset.price);
          price = price + aux_price;
        }
      });
    }
    let priceDisplay = document.querySelector('.js-bus-anulation');
    const price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
    checkBusAnulation(parentModal);
    e.target.closest('.js-box-acomodations')?.querySelector('.js-display-cancel-bus')?.classList.toggle('active');
  };

  document.querySelectorAll('.js-bus-anulation-sel').forEach((el) => {
    el.addEventListener('change', _toggleEnabledBus);
  });

  document.querySelectorAll('input[type=checkbox][name=bus]').forEach((e) => {
    e.addEventListener('change', _displayAnulationBus);
  });

  ///acomodaciones-trayecto-combinado
  const _boxCardBottom = (e) => {
    const boxCard = document.querySelector('.js-box-one');
    if (e.target.checked) {
      boxCard.classList.add('active');
    } else {
      boxCard.classList.remove('active');
    }
  };

  const _boxCardBottomTwo = (e) => {
    const boxCard = document.querySelector('.js-box-two');
    if (e.target.checked) {
      boxCard.classList.add('active');
    } else {
      boxCard.classList.remove('active');
    }
  };

  const _boxCardBottomThree = (e) => {
    const boxCard = document.querySelector('.js-box-three');
    if (e.target.checked) {
      boxCard.classList.add('active');
    } else {
      boxCard.classList.remove('active');
    }
  };

  const _boxCardBottomFour = (e) => {
    const boxCard = document.querySelector('.js-box-four');
    if (e.target.checked) {
      boxCard.classList.add('active');
    } else {
      boxCard.classList.remove('active');
    }
  };

  const removeForbiddenCharacters = (input) => {
    let forbiddenChars = ['€', ' ', '?', '&', '=', '.', '"'];

    for (let char of forbiddenChars) {
      input = input.split(char).join('');
    }
    return input;
  };

  const _selectBox = (e) => {
    const totalPriceContainer = document?.querySelector('.price');
    const product__price = document?.querySelector('.card-product__price');
    totalPriceContainer.innerHTML = product__price.innerHTML + ' €';

    const js_price_trip_one = document?.querySelector('.js-price-trip-one');
    js_price_trip_one.innerHTML = product__price.innerHTML + ' €';

    document.querySelectorAll('.js-selected').forEach((input) => {
      input.closest('.js-selected').classList.remove('box-selected-active');
    });

    document.querySelectorAll('.js-active').forEach((input) => {
      input.closest('.js-active').classList.add('box-selected-active');
    });

    document.querySelectorAll('.js-selected-trip-one').forEach((input) => {
      input.closest('.js-selected-trip-one').classList.remove('box-selected-active');
    });

    _closeBox();
  };

  const _selectBoxOne = (e) => {
    let price = 0.0;

    const totalPriceContainer = document?.querySelector('.price');
    let totalPrice = totalPriceContainer?.innerHTML;

    const aux_price = parseFloat(removeForbiddenCharacters(totalPrice));

    const product__price = document?.querySelector('.card-product__price');
    const product_price = parseFloat(removeForbiddenCharacters(product__price.innerHTML));

    price = product_price + aux_price;
    const price_string = price.toFixed(2).replace('.', ',');
    totalPriceContainer.innerHTML = price_string + ' €';

    const js_price_trip_one = document?.querySelector('.js-price-trip-two');
    js_price_trip_one.innerHTML = product__price.innerHTML + ' €';

    document.querySelectorAll('.js-selected-trip').forEach((input) => {
      input.closest('.js-selected-trip').classList.remove('box-selected-active');
    });

    document.querySelectorAll('.js-active-trip').forEach((input) => {
      input.closest('.js-active-trip').classList.add('box-selected-active');
    });

    document.querySelectorAll('.js-selected-trip-one').forEach((input) => {
      input.closest('.js-selected-trip-one').classList.remove('box-selected-active');
    });

    _closeBox();
    const boxCardBack = document.querySelector('.js-back');
    boxCardBack.classList.remove('box-selected-active');
  };

  const _closeBox = (e) => {
    const boxCard = document.querySelector('.js-box-one');
    boxCard.classList.remove('active');
    const boxCardTwo = document.querySelector('.js-box-two');
    boxCardTwo.classList.remove('active');
  };

  document.querySelectorAll('input[id="id1"]').forEach((e) => {
    e.addEventListener('click', _boxCardBottom);
  });

  document.querySelectorAll('input[id="id2"]').forEach((e) => {
    e.addEventListener('click', _boxCardBottomTwo);
  });

  document.querySelectorAll('.js-a11n__seat-type__button').forEach((e) => {
    e.addEventListener('click', _selectBox);
  });

  document.querySelectorAll('input[id="id3"]').forEach((e) => {
    e.addEventListener('click', _boxCardBottomThree);
  });

  document.querySelectorAll('input[id="id4"]').forEach((e) => {
    e.addEventListener('click', _boxCardBottomFour);
  });

  document.querySelectorAll('.js-a11n__seat-type__button-trip').forEach((e) => {
    e.addEventListener('click', _selectBoxOne);
  });

  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  const _selectBoxBack = (e) => {
    let price = 0.0;
    const totalPriceContainer = document?.querySelector('.price');
    const aux_price = parseFloat(removeForbiddenCharacters(totalPriceContainer?.innerHTML));
    const product__price = document?.querySelector('.card-product__price');
    totalPriceContainer.innerHTML = product__price.innerHTML + ' €';
    const product_price = parseFloat(removeForbiddenCharacters(product__price.innerHTML));
    const js_price_trip_one = document?.querySelector('.js-price-trip-one');
    js_price_trip_one.innerHTML = product__price.innerHTML + ' €';
    price = product_price + aux_price;
    const price_string = price.toFixed(2).replace('.', ',');
    totalPriceContainer.innerHTML = price_string + ' €';

    document.querySelectorAll('.js-selected-back').forEach((input) => {
      input.closest('.js-selected-back').classList.remove('box-selected-active');
    });

    document.querySelectorAll('.js-active-back').forEach((input) => {
      input.closest('.js-active-back').classList.add('box-selected-active');
    });

    document.querySelectorAll('.js-selected-trip-back-one').forEach((input) => {
      input.closest('.js-selected-trip-back-one').classList.remove('box-selected-active');
    });

    _closeBoxBack();
  };

  const _selectBoxOneBack = (e) => {
    let price = 0.0;

    const totalPriceContainer = document?.querySelector('.price');
    let totalPrice = totalPriceContainer?.innerHTML;

    const aux_price = parseFloat(removeForbiddenCharacters(totalPrice));

    const product__price = document?.querySelector('.card-product__price');
    const product_price = parseFloat(removeForbiddenCharacters(product__price.innerHTML));

    price = product_price + aux_price;
    const price_string = price.toFixed(2).replace('.', ',');
    totalPriceContainer.innerHTML = price_string + ' €';

    const js_price_trip_one = document?.querySelector('.js-price-trip-two');
    js_price_trip_one.innerHTML = product__price.innerHTML + ' €';

    document.querySelectorAll('.js-selected-trip-back').forEach((input) => {
      input.closest('.js-selected-trip-back').classList.remove('box-selected-active');
    });

    document.querySelectorAll('.js-active-trip-back').forEach((input) => {
      input.closest('.js-active-trip-back').classList.add('box-selected-active');
    });

    document.querySelectorAll('.js-selected-trip-back-one').forEach((input) => {
      input.closest('.js-selected-trip-back-one').classList.remove('box-selected-active');
    });

    _closeBoxBack();
    const boxCardBack = document.querySelector('.js-back');
    boxCardBack.classList.remove('box-selected-active');
    const boxActive = document.querySelector('.bar-items__btn');
    boxActive.classList.remove('disabled');
  };

  const _closeBoxBack = (e) => {
    const boxCard = document.querySelector('.js-box-back-one');
    boxCard.classList.remove('active');
    const boxCardTwo = document.querySelector('.js-box-back-two');
    boxCardTwo.classList.remove('active');
  };

  const _boxCardBottomBack = (e) => {
    const boxCard = document.querySelector('.js-box-back-one');
    if (e.target.checked) {
      boxCard.classList.add('active');
    } else {
      boxCard.classList.remove('active');
    }
  };

  const _boxCardBottomTwoBack = (e) => {
    const boxCard = document.querySelector('.js-box-back-two');
    if (e.target.checked) {
      boxCard.classList.add('active');
    } else {
      boxCard.classList.remove('active');
    }
  };

  const _boxCardBottomThreeBack = (e) => {
    const boxCard = document.querySelector('.js-box-back-three');
    if (e.target.checked) {
      boxCard.classList.add('active');
    } else {
      boxCard.classList.remove('active');
    }
  };

  const _boxCardBottomFourBack = (e) => {
    const boxCard = document.querySelector('.js-box-back-four');
    if (e.target.checked) {
      boxCard.classList.add('active');
    } else {
      boxCard.classList.remove('active');
    }
  };

  document.querySelectorAll('input[id="id5"]').forEach((e) => {
    e.addEventListener('click', _boxCardBottomBack);
  });

  document.querySelectorAll('input[id="id6"]').forEach((e) => {
    e.addEventListener('click', _boxCardBottomTwoBack);
  });

  document.querySelectorAll('.js-a11n__seat-type__button-back').forEach((e) => {
    e.addEventListener('click', _selectBoxBack);
  });

  document.querySelectorAll('input[id="id7"]').forEach((e) => {
    e.addEventListener('click', _boxCardBottomThreeBack);
  });

  document.querySelectorAll('input[id="id8"]').forEach((e) => {
    e.addEventListener('click', _boxCardBottomFourBack);
  });

  document.querySelectorAll('.js-a11n__seat-type__button-trip-back').forEach((e) => {
    e.addEventListener('click', _selectBoxOneBack);
  });

  const removeClass = () => {
    document.querySelectorAll('.js-selected').forEach((input) => {
      input.closest('.js-selected').classList.add('box-selected-active');
    });
    document.querySelectorAll('.js-active').forEach((input) => {
      input.closest('.js-active').classList.remove('box-selected-active');
    });
    const boxCard = document.querySelector('.js-box-one');
    boxCard.classList.add('active');
  };

  const elementos = document.querySelectorAll('.js-edit-one');
  elementos.forEach(function (elemento) {
    elemento.addEventListener('click', function () {
      elemento.classList.toggle('clase2');
      removeClass();
    });
  });

  const removeClassBack = () => {
    document.querySelectorAll('.js-selected-trip').forEach((input) => {
      input.closest('.js-selected-trip').classList.add('box-selected-active');
    });
    document.querySelectorAll('.js-active-trip').forEach((input) => {
      input.closest('.js-active-trip').classList.remove('box-selected-active');
    });
    const boxCard = document.querySelector('.js-box-two');
    boxCard.classList.add('active');
  };

  const elementosTwo = document.querySelectorAll('.js-edit-two');
  elementosTwo.forEach(function (elemento) {
    elemento.addEventListener('click', function () {
      elemento.classList.toggle('clase2');
      removeClassBack();
    });
  });

  const removeClassBackThree = () => {
    document.querySelectorAll('.js-selected-back').forEach((input) => {
      input.closest('.js-selected-back').classList.add('box-selected-active');
    });
    document.querySelectorAll('.js-active-trip-back').forEach((input) => {
      input.closest('.js-active-trip-back').classList.remove('box-selected-active');
    });
    const boxCard = document.querySelector('.js-box-back-three');
    boxCard.classList.add('active');
  };

  const elementosThree = document.querySelectorAll('.js-edit-three');
  elementosThree.forEach(function (elemento) {
    //var id = elemento.firstChild.nodeValue;
    elemento.addEventListener('click', function () {
      elemento.classList.toggle('clase2');
      removeClassBackThree();
    });
  });

  const removeClassBackFour = () => {
    document.querySelectorAll('.js-selected-trip-back').forEach((input) => {
      input.closest('.js-selected-trip-back').classList.add('box-selected-active');
    });
    document.querySelectorAll('.js-active-trip-back').forEach((input) => {
      input.closest('.js-active-trip-back').classList.remove('box-selected-active');
    });
    const boxCard = document.querySelector('.js-box-back-four');
    boxCard.classList.add('active');
  };

  const elementosFour = document.querySelectorAll('.js-edit-four');
  elementosFour.forEach(function (elemento) {
    //var id = elemento.firstChild.nodeValue;
    elemento.addEventListener('click', function () {
      elemento.classList.toggle('clase2');
      removeClassBackFour();
    });
  });
}
