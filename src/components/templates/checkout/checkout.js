import JustValidate from 'just-validate';
import JustValidatePluginDate from 'just-validate-plugin-date';
import MicroModal from 'micromodal';

import extraEquipment from './checkout-additonal-equipment.html';
import savedCC from './checkout-savedcc-item.html';

import { MOCK_PASSENGER_TYPES, MOCK_NATIONALITIES } from './checkout-i18n';

const MOCK_LOCALE = 'es';
const MOCK_ogPrice = 120;
const MOCK_promoCodeDiscount = {
  aplies: false,
  value: -25,
};
const MOCK_residentDiscount = {
  aplies: false,
  value: -20,
};
const MOCK_travelingDate = '25/11/2022';
const MOCK_internationalTravel = true;
const MOCK_bigFamilyDiscount = true;
const MOCK_userIsLogged = true;

const MOCK_savedPassengers = {
  passengers: {
    savedPassengerId1: {
      type: 'adult',
      gender: 'male',
      name: 'Juan',
      surname1: 'Pérez',
      surname2: 'Pérez',
      nationality: 'spanish',
      idDocType: 'nif',
      idNumber: '97438493A',
      idExpireDate: '22/02/2024',
      birthday: '19/10/1990',
    },
    savedPassengerId2: {
      type: 'adult',
      gender: 'female',
      name: 'María',
      surname1: 'Fernández',
      surname2: 'Bautista',
      nationality: 'spanish',
      idDocType: 'nif',
      idNumber: '73421054B',
      idExpireDate: '12/02/2025',
      birthday: '08/05/1991',
    },
  },
};

const MOCK_savedCredtCards = {
  cards: {
    cardId1: {
      endingNum: '5523',
      type: 'visa',
    },
    cardId2: {
      endingNum: '8962',
      type: 'mastercard',
    },
  },
};

/*
 * types:
  [car_van, motorbike, bike, scooter, electricScooter, caravan_other]
*/
const MOCK_vehicles = {
  type: 'car_van',
  model: 'Alfa-Romeo-145',
  quantity: 1,
  trailer: true,
};

const VEHICLES_TYPES_NAMES = {
  car_van: 'Coche o furgoneta',
  motorbike: 'Motocicleta',
  bike: 'Bicicleta',
  scooter: 'Ciclomotor',
  electricScooter: 'Patinete eléctrico',
  caravan_other: 'Caravana / Otros',
};

// -- Checkout Data Storage --
var checkoutData = {
  data: {
    promoCode: null,
    newsSubscribe: false,
    termsConditionsAccepted: false,
    saveCreditCard: false,
    companyBill: {
      required: false,
      idNumber: null,
      code: null,
      registration: {},
    },
  },
  passengersData: {
    allResidents: false,
  },
  vehiclesData: {},
  pets: {},
};

// -- Checkout --

const _scrollToFirstInvalidInput = () => {
  const invalidFormInputs = document.querySelectorAll('.g-input-not-valid');
  const bannerHeightOffset = -110;
  if (invalidFormInputs[0]) {
    window.scrollTo({
      top: invalidFormInputs[0].getBoundingClientRect().top + window.pageYOffset + bannerHeightOffset,
      behavior: 'smooth',
    });
  }
};

const _checkoutAdvanceStep = (form) => {
  const checkoutStepsList = document.querySelectorAll('.js-checkout-form__step');
  const stepIndex = +form.dataset.checkoutStep;
  checkoutStepsList[stepIndex].closest('.dropdown-collapse').classList.remove('show');
  checkoutStepsList[stepIndex].closest('.dropdown-collapse').classList.add('finished');
  checkoutStepsList[stepIndex + 1]?.closest('.dropdown-collapse').classList.remove('disabled');
  checkoutStepsList[stepIndex + 1]?.closest('.dropdown-collapse').classList.add('show');
  const nextFormStep = checkoutStepsList[stepIndex + 1]?.closest('.c-checkout-form__form-item').classList.add('show');
  nextFormStep &&
    window.scrollTo({
      top: nextFormStep.getBoundingClientRect().top + window.pageYOffset + bannerHeightOffset,
      behavior: 'smooth',
    });
};

const _checkoutGenerateAssistanceAffiliateInput = (id) => {
  let assistanceAffiliateInput =
    '<div class="form__input-wrapper">' +
    '<input ' +
    'class="g-input form__input" ' +
    `id=\"checkoutForm-passenger-assistanceInfo-${id}\" ` +
    `name=\"passenger-assistanceInfo-${id}\" ` +
    'placeholder=" " ' +
    '/> ' +
    '<label>Nº de afilicación</label> ';
  ('</div>');

  return assistanceAffiliateInput;
};
const _checkoutGenerateAssistancePregnantInput = (id) => {
  let assistancePregnantInput =
    '<div class="form__input-wrapper u-w--100"> ' +
    '<select ' +
    'class="form__select" ' +
    `id=\"checkoutForm-passenger-assistanceInfo-${id}\" ` +
    `name=\"passenger-assistanceInfo-${id}\" ` +
    'required' +
    '>' +
    '<option value="" selected></option> ' +
    '<option value="less_28"> menos de 28 semanas</option> ' +
    '<option value="w28">28 - 32 semanas</option> ' +
    '<option value="w32">32 - 36 semanas</option> ' +
    '</select> ' +
    '<label>Semanas de Embarazo</label> ' +
    '</div>';

  return assistancePregnantInput;
};
const _checkoutGenerateSavedCC = (ccStoredId, ccEndingNum, ccType) => {
  const ccImg = document.createElement('img');
  ccImg.alt = ccType;
  ccImg.classList.add('box-payment__card');

  // set compiled src route
  switch (ccType) {
    default:
    case 'visa':
      ccImg.src = 'static/media/visa.d166e0b9.svg';
      break;
    case 'mastercard':
      ccImg.src = 'static/media/mastercard.3ab9e789.svg';
      break;
    case 'american-express':
      ccImg.src = 'static/media/american-express.b46848c0.svg';
      break;
  }

  let savedCCitem = document.createElement('div');
  savedCCitem.innerHTML = savedCC;
  savedCCitem.querySelector('input[name="payment-accordion"]').value = 'box-payment__card-' + ccStoredId;
  savedCCitem.querySelector('input[name="payment-accordion"]').id = 'payment-accordion-content-' + ccEndingNum;
  savedCCitem.querySelector('.js-saved-cc__ending-num').innerHTML = '' + ccEndingNum;
  savedCCitem.querySelector('.js-saved-cc__image').appendChild(ccImg);
  savedCCitem.querySelector('[data-input="payment-card-expiry"]').name = 'payment-card-expiry-' + ccStoredId;
  savedCCitem.querySelector('[data-input="payment-card-cvc"]').name = 'payment-card-cvc-' + ccStoredId;

  return savedCCitem.children;
};
const _checkoutGenerateAdditionalEquipment = (id) => {
  let extraEquipmentItem = document.createElement('div');
  extraEquipmentItem.innerHTML = extraEquipment;
  extraEquipmentItem.querySelector('input').id = `checkoutForm-vehicle-additionalEquip-${id}`;
  extraEquipmentItem.querySelector('input').name = `vehicle-additionalEquip-${id}`;
  extraEquipmentItem.querySelector('select').id = `checkoutForm-vehicle-equipQty-${id}`;
  extraEquipmentItem.querySelector('select').name = `vehicle-equipQty-${id}`;
  return extraEquipmentItem.children;
};
const _fillCheckoutSummaryLocation = ({ nameString, infoString, summaryLocation }) => {
  let p_el = document.createElement('p');
  p_el.classList.add('o-mb--1');

  let span_name_el = document.createElement('span');
  span_name_el.classList.add('info__name');
  span_name_el.innerHTML = nameString;

  let span_info_el = document.createElement('span');
  span_info_el.innerHTML = infoString;

  p_el.appendChild(span_name_el);
  p_el.appendChild(span_info_el);

  summaryLocation.appendChild(p_el);
};

const _fillPassengersSummary = (passengers) => {
  let formItem = document.querySelector('[data-element="passengers"]');
  let contentLocation = formItem.querySelector('.c-checkout-form__form-summary');
  let summaryLocation = contentLocation.querySelector('.box--sumary__info');
  summaryLocation.innerHTML = '';

  Object.values(passengers).forEach((passenger) => {
    const name_string =
      passenger.name + ' ' + passenger.surname1 + (passenger.surname2 ? ' ' + passenger.surname2 : '' + ':');
    const info_string =
      ' ' +
      (passenger.email ? passenger.email + ', ' : '') +
      (passenger.phone ? passenger.phonePrefix + passenger.phone + ', ' : '') +
      MOCK_PASSENGER_TYPES[passenger.type][MOCK_LOCALE] +
      ', ' +
      MOCK_NATIONALITIES[passenger.nationality][MOCK_LOCALE] +
      ', ' +
      passenger.idDocType.toUpperCase() +
      ' ' +
      passenger.idNumber; // falta type

    _fillCheckoutSummaryLocation({
      nameString: name_string,
      infoString: info_string,
      summaryLocation,
    });
  });

  contentLocation.classList.remove('g-hidden');
};

const _fillPetsSummary = (pets) => {
  let formItem = document.querySelector('[data-element="pets"]');
  let contentLocation = formItem.querySelector('.c-checkout-form__form-summary');
  let summaryLocation = contentLocation.querySelector('.box--sumary__info');
  summaryLocation.innerHTML = '';

  Object.values(pets).forEach((pet, i) => {
    const name_string = (pet.name ? pet.name : `Mascota ${i + 1}`) + ':';
    const info_string = ' ' + pet.type + ', tamaño ' + pet.size;

    _fillCheckoutSummaryLocation({
      nameString: name_string,
      infoString: info_string,
      summaryLocation,
    });
  });

  contentLocation.classList.remove('g-hidden');
};

const _fillVehiclesSummary = (vehiclesData) => {
  let formItem = document.querySelector('[data-element="vehicles"]');
  let contentLocation = formItem.querySelector('.c-checkout-form__form-summary');
  let summaryLocation = contentLocation.querySelector('.box--sumary__info');
  summaryLocation.innerHTML = '';

  console.log('vehiclesData', vehiclesData);

  Object.values(vehiclesData?.vehicles).forEach((vehicle) => {
    const name_string = VEHICLES_TYPES_NAMES[vehicle.type] + ':';

    const info_string =
      vehicle.type === 'bike' || vehicle.type === 'scooter' || vehicle.type === 'electricScooter'
        ? ' ' + MOCK_vehicles.quantity
        : ' ' + vehicle.id;

    _fillCheckoutSummaryLocation({
      nameString: name_string,
      infoString: info_string,
      summaryLocation,
    });

    if (vehicle.trailerId) {
      const name_string2 = 'Remolque:';
      const info_string2 = ' ' + vehicle.trailerId;

      _fillCheckoutSummaryLocation({
        nameString: name_string2,
        infoString: info_string2,
        summaryLocation,
      });
    }

    if (vehicle.caravanOtherModel) {
      const name_string2 = 'Modelo:';
      const info_string2 = ' ' + vehicle.caravanOtherModel;

      _fillCheckoutSummaryLocation({
        nameString: name_string2,
        infoString: info_string2,
        summaryLocation,
      });
    }
  });

  if (vehiclesData?.additionalEquipment) {
    Object.values(vehiclesData?.additionalEquipment).forEach((equipment) => {
      const name_string = equipment.type + ':';
      const info_string = ' ' + equipment.quantity + ' unidades';

      _fillCheckoutSummaryLocation({
        nameString: name_string,
        infoString: info_string,
        summaryLocation,
      });
    });
  }

  contentLocation.classList.remove('g-hidden');
};

const _dateInputs = () => {
  const dateInputs = document.querySelectorAll('.js-input-textdate');
  dateInputs.forEach((input) => {
    var value = input.value;
    input?.addEventListener('input', (e) => {
      if (value.length <= input.value.length) {
        if (input.value.charAt(input.value.length - 1) !== '/' && isNaN(input.value.charAt(input.value.length - 1))) {
          input.value = input.value.slice(0, -1);
        }
        if (
          !isNaN(input.value.charAt(input.value.length - 1)) &&
          !isNaN(input.value.charAt(input.value.length - 2)) &&
          input.value.charAt(input.value.length - 2) !== '' &&
          input.value.split('/').length - 1 < 2
        ) {
          input.value = input.value + '/';
        }
        if (input.value.charAt(0) > 3) {
          let new_val = input.value.charAt(input.value.length - 2) + input.value.charAt(input.value.length - 1);

          let val = input.value.slice(0, -2) + '0' + new_val + '/';
          input.value = val;
        }
        if (input.value.charAt(3) > 1) {
          let new_val = input.value.charAt(input.value.length - 2) + input.value.charAt(input.value.length - 1);
          let val = input.value.slice(0, -2) + new_val + '/';
          input.value = val;
        }
        if (input.value.charAt(input.value.length - 1) === '/' || input.value.charAt(input.value.length - 1) === '-') {
          if (input.value.charAt(input.value.length - 3) === '/' || input.value.charAt(input.value.length - 3) === '') {
            let new_val = input.value.charAt(input.value.length - 2) + input.value.charAt(input.value.length - 1);
            let val = input.value.slice(0, -2) + '0' + new_val;
            input.value = val;
          }
        }
        if (input.value.length === 11) {
          input.value = input.value.slice(0, input.value.length - 1);
        }
      }
      value = input.value;
    });

    input?.addEventListener('blur', (e) => {
      if (input.value.split('/').length - 1 < 2) {
        let day = input.value.split('/')[0];
        let month = input.value.split('/')[1] ? input.value.split('/')[1] : '';
        let year = input.value.split('/')[2] ? input.value.split('/')[2] : '';

        const currentDate = new Date();
        if (year > currentDate.getFullYear() && month > currentDate.getMonth() + 1 && day > currentDate.getDate()) {
          let mm = currentDate.getMonth() + 1;
          let dd = currentDate.getDate();
          dd = dd < 10 ? '0' + dd : dd;
          mm = mm < 10 ? '0' + mm : mm;
          input.value = dd + '/' + mm + '/' + currentDate.getFullYear();
          return;
        }

        if (day.length === 1) {
          day = '0' + day;
        }
        if (month.length === 1) {
          month = '0' + month;
        }
        if (day != '') {
          input.value = day + '/';
          if (month != '') {
            input.value = input.value + month + '/';
            if (year != '') {
              input.value = input.value + year;
            }
          }
        }
      }
    });
  });
};

const _infoBanners = () => {
  const bannerInfoList = document.querySelectorAll('.banner-information');
  bannerInfoList.forEach((banner) => {
    const toggle = banner.querySelector('.banner-information__action .g-switch');
    toggle?.addEventListener('change', (e) => {
      if (e.target.checked) {
        banner.classList.add('banner-information--active');
      } else {
        banner.classList.remove('banner-information--active');
      }
    });
  });
};

const _companyBill = () => {
  // formulary
  const formSetFields = ({ formValidation, type }) => {
    // choose between 'company' and 'self employed person'
    const typeId = type === 'company' ? 'co' : 'sep';
    formValidation
      .addField(`#companyBillForm-name-${typeId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ])
      .addField(`#companyBillForm-surname-${typeId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ])
      .addField(`#companyBillForm-email-${typeId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
        {
          rule: 'email',
          errorMessage: 'Email is invalid',
        },
      ])
      .addField(`#companyBillForm-phonePrefix-${typeId}`, [
        {
          rule: 'required',
          errorMessage: '',
        },
      ])
      .addField(`#companyBillForm-phone-${typeId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
        {
          rule: 'customRegexp',
          value: /^[0-9]*$/,
        },
      ])
      .addField(`#companyBillForm-nif-${typeId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ])
      .addField(`#companyBillForm-country-${typeId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ])
      .addField(`#companyBillForm-zipcode-${typeId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ])
      .addField(`#companyBillForm-city-${typeId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ])
      .addField(`#companyBillForm-address-${typeId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ]);
  };
  const formClearFields = ({ formValidation, type }) => {
    const typeId = type === 'company' ? 'co' : 'sep';
    formValidation
      .removeField(`#companyBillForm-name-${typeId}`)
      .removeField(`#companyBillForm-surname-${typeId}`)
      .removeField(`#companyBillForm-email-${typeId}`)
      .removeField(`#companyBillForm-phonePrefix-${typeId}`)
      .removeField(`#companyBillForm-phone-${typeId}`)
      .removeField(`#companyBillForm-nif-${typeId}`)
      .removeField(`#companyBillForm-country-${typeId}`)
      .removeField(`#companyBillForm-zipcode-${typeId}`)
      .removeField(`#companyBillForm-city-${typeId}`)
      .removeField(`#companyBillForm-address-${typeId}`);
  };
  const fillBillRegistrationData = (formData, activeForm) => {
    const formTypeId = activeForm == 0 ? 'sep' : 'co';
    const billRegisterData = {
      name: formData[`name-${formTypeId}`],
      surname: formData[`surname-${formTypeId}`],
      email: formData[`email-${formTypeId}`],
      phonePrefix: formData[`phonePrefix-${formTypeId}`],
      phone: formData[`phone-${formTypeId}`],
      nif: formData[`nif-${formTypeId}`],
      country: formData[`country-${formTypeId}`],
      zipcode: formData[`zipcode-${formTypeId}`],
      city: formData[`city-${formTypeId}`],
      address: formData[`address-${formTypeId}`],
    };
    checkoutData.data.companyBill.registration = billRegisterData;
  };

  // variables
  var billRegistrationValidation = null;
  var activeModalTab = 0;
  const modalBillRegistration = document.getElementById('modal-checkout-factura-autonomo');
  const modalBillRegistrationSuccess = document.getElementById('modal-checkout-factura-ok');

  // switch between company and self-employed-person forms
  const setActiveForm = (e) => {
    if (e.target.classList.contains('active') && e.target.dataset.index != activeModalTab) {
      activeModalTab = e.target.dataset.index;
      if (billRegistrationValidation) {
        activeModalTab == 0 && formSetFields({ formValidation: billRegistrationValidation, type: 'sep' });
        activeModalTab == 0 && formClearFields({ formValidation: billRegistrationValidation, type: 'company' });
        activeModalTab == 1 && formSetFields({ formValidation: billRegistrationValidation, type: 'company' });
        activeModalTab == 1 && formClearFields({ formValidation: billRegistrationValidation, type: 'sep' });
      }
    }
  };

  const displayBillRegistrationSuccess = () => {
    document.querySelector('[data-element="factura-empresa"]')?.classList.add('g-hidden');
    document.querySelector('[data-element="factura-empresa-success"]')?.classList.remove('g-hidden');
  };

  // observer to watch modal closing and clear flow elements
  const modalMutationObserver = new MutationObserver((entries) => {
    if (!entries[entries.length - 1].target.classList.contains('is-open')) {
      modalBillRegistration.querySelectorAll('.tablinks').forEach((tab) => {
        tab.removeEventListener('click', setActiveForm);
      });
      billRegistrationValidation = null;
      modalMutationObserver.disconnect();
    }
  });

  // when modal open, init inner functions
  const initCompanyBillRegistration = () => {
    if (document.getElementById('js-form-company-bill-registration')) {
      billRegistrationValidation = new JustValidate('#js-form-company-bill-registration', {
        errorFieldCssClass: 'g-input-not-valid',
        errorLabelCssClass: 'g-input__error-label',
        focusInvalidField: false,
      });

      formSetFields({ formValidation: billRegistrationValidation, type: 'sep' });

      billRegistrationValidation
        .onSuccess((event) => {
          event.preventDefault();
          const formData = Object.fromEntries(new FormData(event.target));
          fillBillRegistrationData(formData, activeModalTab);
          MicroModal.show('modal-checkout-factura-ok');
          displayBillRegistrationSuccess();
          checkoutData.data.companyBill.required = false;
          checkoutData.data.companyBill.idNumber = null;
          checkoutData.data.companyBill.code = null;
        })
        .onFail((fields) => {
          console.log('validation failed', fields);
          _scrollToFirstInvalidInput();
        });

      modalBillRegistration.querySelectorAll('.tablinks').forEach((tab) => {
        tab.addEventListener('click', setActiveForm);
      });

      modalBillRegistrationSuccess.querySelector('[data-button="modal-btn-close"]')?.addEventListener('click', () => {
        MicroModal.close(modalBillRegistration.id);
      });
    }
  };

  const companyBillToggle = document.querySelector('[data-check="factura-empresa"]');
  companyBillToggle?.addEventListener('change', (e) => {
    if (e.target.checked) {
      checkoutData.data.companyBill.required = true;
      const companyBillIdInput = document.querySelector('[data-input="empresa-id"]');
      const companyBillCodeInput = document.querySelector('[data-input="empresa-codigo"]');

      companyBillIdInput?.addEventListener('change', (e) => {
        checkoutData.data.companyBill.idNumber = e.target.value;

        if (e.target.value !== '') {
          e.target.classList.remove('g-input-not-valid');

          if (companyBillCodeInput.value !== '') {
            checkoutData.data.companyBill.required = false;
          }
        } else {
          e.target.classList.add('g-input-not-valid');
          checkoutData.data.companyBill.required = true;
        }
      });

      companyBillCodeInput?.addEventListener('change', (e) => {
        checkoutData.data.companyBill.code = e.target.value;
        if (e.target.value !== '') {
          e.target.classList.remove('g-input-not-valid');

          if (companyBillCodeInput.value !== '') {
            checkoutData.data.companyBill.required = false;
          }
        } else {
          e.target.classList.add('g-input-not-valid');
          checkoutData.data.companyBill.required = true;
        }
      });
    } else {
      checkoutData.data.companyBill.required = false;
    }
  });

  const companyNoCodeTrigger = document.querySelector('[data-micromodal-trigger="modal-checkout-factura-autonomo"]');
  companyNoCodeTrigger?.addEventListener('click', (e) => {
    e.preventDefault();
    initCompanyBillRegistration();
    modalMutationObserver.observe(modalBillRegistration, { attributes: true });
  });
};

const _dataChecks = () => {
  const allResidentsToggle = document.querySelector('[data-check="passengers-all-residents"]');

  allResidentsToggle?.addEventListener('change', (e) => {
    checkoutData.passengersData.allResidents = e.target.checked;
    MOCK_residentDiscount.aplies = checkoutData.passengersData.allResidents;
    _updateFinalPrice();
  });

  const saveCreditCardToggle = document.querySelector('[data-check="payment-save-card"]');
  saveCreditCardToggle?.addEventListener('change', (e) => {
    checkoutData.data.saveCreditCard = e.target.checked;
  });
  const newsSubscribeToggle = document.querySelector('[data-check="newsletter-subscribe"]');
  newsSubscribeToggle?.addEventListener('change', (e) => {
    checkoutData.data.newsSubscribe = e.target.checked;
  });

  const termsConditionsToggle = document.querySelector('[data-check="terms-conditions-acceptance"]');
  termsConditionsToggle?.addEventListener('change', (e) => {
    checkoutData.data.termsConditionsAccepted = e.target.checked;
    document.querySelector('[data-trigger="complete-checkout"]').disabled = !e.target.checked;
  });

  const spreadNationalityToggle = document.querySelector('[data-check="spread-nationality"]');
  spreadNationalityToggle?.addEventListener('change', (e) => {
    if (e.target.checked) {
      const nationalityInputsList = document.querySelectorAll('*[id^="checkoutForm-passenger-nationality"]');
      nationalityInputsList.forEach((input) => {
        input.value = nationalityInputsList[0].value;
        input.addEventListener('change', () => {
          spreadNationalityToggle.checked = false;
        });
      });
    }
  });
};

const _promoCode = () => {
  const validateCode = (code) => {
    try {
      // ask to service for code validty
      // meanwhile, mock:

      if (typeof code === 'string' && code !== '') {
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  let isCodeValid = false;
  let promoCode = '';
  const promoCodeLocation = document.querySelector('[data-element="promo-code"]');
  const promoCodeInput = promoCodeLocation?.querySelector('input');
  const promoCodeApplyBtn = promoCodeLocation?.querySelector('[data-trigger="apply-promo-code"]');
  const promoCodeSuccess = document.querySelectorAll('[data-element="promo-code-success"]');
  const promoCodeApplied = document.querySelectorAll('[data-text="promo-code"]');
  const promoCodeRemoveBtn = promoCodeLocation?.querySelector('[data-trigger="remove-promo-code"]');

  promoCodeInput?.addEventListener('keydown', (e) => {
    promoCodeLocation.querySelector('.u-help')?.remove();
  });

  promoCodeApplyBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    isCodeValid = validateCode(promoCodeInput.value);
    promoCode = promoCodeInput.value.toUpperCase();

    if (isCodeValid) {
      checkoutData.data.promoCode = promoCode.toUpperCase();
      promoCodeApplied.forEach((el) => (el.innerHTML = promoCode));
      promoCodeLocation.querySelector('.collapse').classList.add('g-hidden');
      promoCodeSuccess.forEach((el) => el.classList.remove('g-hidden'));
      MOCK_promoCodeDiscount.aplies = true;
      _updateFinalPrice();
    } else {
      MicroModal.show('modal-checkout-condiciones-error');
    }
  });

  promoCodeRemoveBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    checkoutData.data.promoCode = null;
    promoCode = '';
    promoCodeInput.value = '';
    promoCodeApplied.forEach((el) => (el.innerHTML = ''));
    promoCodeSuccess.forEach((el) => el.classList.add('g-hidden'));
    promoCodeLocation.querySelector('.collapse').classList.remove('g-hidden');
    MOCK_promoCodeDiscount.aplies = false;
    _updateFinalPrice();
  });
};

const _showDetails = () => {
  const checkoutDetailsSumarryLoc = document.querySelector('[data-element="checkout-summary"]');

  checkoutDetailsSumarryLoc?.querySelector('.js-details-out-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.target
      .closest('.js-details')
      ?.querySelectorAll('.js-details-list')
      .forEach((list) => {
        list.classList.toggle('active');
      });
    e.target.classList.toggle('active');
  });

  checkoutDetailsSumarryLoc?.querySelector('.js-details-in-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.target
      .closest('.js-details')
      ?.querySelectorAll('.js-details-list')
      .forEach((list) => {
        list.classList.toggle('active');
      });
    e.target.closest('.js-details-in-btn')?.classList.toggle('active');
  });

  checkoutDetailsSumarryLoc?.querySelector('.js-details-code-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.target
      .closest('.js-details')
      ?.querySelectorAll('.js-details-list')
      .forEach((list) => {
        list.classList.toggle('active');
      });
    e.target.closest('.js-details-in-btn')?.classList.toggle('active');
  });
};

const _updateFinalPrice = () => {
  const finalPrice =
    MOCK_ogPrice +
    (MOCK_promoCodeDiscount.aplies ? MOCK_promoCodeDiscount.value : 0) +
    (MOCK_residentDiscount.aplies ? MOCK_residentDiscount.value : 0);

  document.querySelectorAll('[data-text="checkout-summary-final-price"]').forEach((el) => {
    el.innerHTML = finalPrice + ' €';
  });

  const summaryTotalPrice = document.querySelector('[data-text="checokut-sumary-total"]');
  if (summaryTotalPrice) {
    summaryTotalPrice.innerHTML = '' + (MOCK_residentDiscount.aplies ? 'Total (residentes)' : 'Total');
  }
};

const _getValidAgeDate = (referenceDate, type) => {
  const ddmmyyyFormat = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]([0-9]{4})$/;

  if (!referenceDate.match(ddmmyyyFormat)) return false;
  const dayMonth = referenceDate.substring(0, 6);
  const year = +referenceDate.substring(6);

  if (type === 'adult') {
    return dayMonth + (year - 18);
  }
  if (type === 'children') {
    return dayMonth + (year - 18);
  }
  if (type === 'senior60') {
    return dayMonth + (year - 60);
  }
  return false;
};

const _autoFill = () => {
  const autoFillPassenger = (passengerData, passengerFormId) => {
    const passengerForm = document.querySelectorAll(`*[id^="checkoutForm-passenger"][id$="${passengerFormId}"]`);
    passengerForm.forEach((input) => {
      const inputId = input.id.split('-')[2];
      if (['type, assistanceType'].includes(inputId)) {
        return;
      }
      if (inputId === 'gender') {
        input.querySelector(`input[value="${passengerData[inputId]}"]`).checked = true;
        return;
      }
      if (passengerData[inputId]) {
        input.value = passengerData[inputId];
        input.disabled = true;
      }
    });
    const savePasengerCheckbox = document.getElementById(`checkoutForm-passenger-savePassenger-${passengerFormId}`);
    savePasengerCheckbox.checked = false;
    savePasengerCheckbox.closest('[data-element="save-passenger"]').classList.add('g-hidden');
  };

  const clearPassenger = (passengerFormId) => {
    document.querySelectorAll(`*[id^="checkoutForm-passenger"][id$="${passengerFormId}"]`).forEach((input) => {
      input.value = ['type, assistanceTypem', 'idDocType', 'gender'].includes(input.id.split('-')[2])
        ? input.value
        : '';
      input.disabled = false;
    });

    const savePasengerCheckbox = document.getElementById(`checkoutForm-passenger-savePassenger-${passengerFormId}`);
    savePasengerCheckbox.closest('[data-element="save-passenger"]').classList.remove('g-hidden');
  };

  document.querySelectorAll('[data-element="save-passenger"]').forEach((section) => {
    section.classList.remove('g-hidden');
  });

  document.querySelectorAll('.js-checkout__autofill-passenger').forEach((autoFillSection) => {
    const passengerToFillId = autoFillSection.dataset.passengerId;
    autoFillSection.querySelectorAll('.js-autofill__btn-fill-passenger').forEach((autofillBtn) => {
      const savedPassengerId = autofillBtn.dataset.id;
      autofillBtn.addEventListener('click', (e) => {
        e.preventDefault;
        const clearBtn = autofillBtn.querySelector('.js-autofill__btn-clear');
        const checkbox = autofillBtn.querySelector('input[type="checkbox"]');
        //check if clear or fill button was clicked
        if (e.target.isEqualNode(clearBtn)) {
          clearPassenger(passengerToFillId);
          autofillBtn.classList.remove('is-active');
          checkbox.checked = false;
          clearBtn.classList.add('g-hidden');
        } else if (MOCK_savedPassengers?.passengers?.[savedPassengerId]) {
          autoFillPassenger(MOCK_savedPassengers.passengers[savedPassengerId], passengerToFillId);
          // reset buttons from other autofill buttons for this passenger
          autoFillSection
            .querySelectorAll('.js-autofill__btn-clear')
            .forEach((clearButton) => clearButton.classList.add('g-hidden'));
          autoFillSection.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => (checkbox.checked = false));
          autoFillSection
            .querySelectorAll('.js-autofill__btn-fill-passenger')
            .forEach((autofillBtn) => autofillBtn.classList.remove('is-active'));
          autofillBtn.classList.add('is-active');
          checkbox.checked = true;
          clearBtn.classList.remove('g-hidden');
        }
      });
    });
  });
};

const _savedCreditCards = () => {
  const paymentMethodsAccordion = document.querySelector('[data-element="payment-methods"]');
  Object.entries(MOCK_savedCredtCards.cards).forEach(([cardId, cardData]) => {
    const [savedCCHeader, savedCCPanelContent] = _checkoutGenerateSavedCC(cardId, cardData.endingNum, cardData.type);
    const savedCCcollapseItem = document.createElement('div');
    savedCCcollapseItem.classList.add('collapse--group__item');
    savedCCcollapseItem.appendChild(savedCCHeader);
    savedCCcollapseItem.appendChild(savedCCPanelContent);
    paymentMethodsAccordion?.prepend(savedCCcollapseItem);
  });
};

const _completeChecokut = () => {
  document.querySelector('[data-trigger="complete-checkout"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    //check if the inputs outside form-validation are valid
    if (checkoutData.data.companyBill.required) {
      const companyBillIdInput = document.querySelector('[data-input="empresa-id"]');
      const companyBillCodeInput = document.querySelector('[data-input="empresa-codigo"]');
      companyBillIdInput?.value === '' && companyBillIdInput.classList.add('g-input-not-valid');
      companyBillCodeInput?.value === '' && companyBillCodeInput.classList.add('g-input-not-valid');
      _scrollToFirstInvalidInput();
      return;
    }

    // send data to server
    try {
      const paymentMethod = document.querySelector('input[name="payment-accordion"]:checked').value;
      // @TODO: switch executing action depending on selected payment method

      // next 2 lines are a mocked action that forces the catch-error flow
      const mockErrorValue = 1;
      mockErrorValue.replace('-', '');
    } catch (err) {
      MicroModal.show('modal-checkout-error-pago');
    }
  });
};

const _initCheckout = () => {
  _updateFinalPrice();

  const checkoutItemsList = document.querySelectorAll('.c-checkout-form__form-item');
  checkoutItemsList.forEach((checkoutItem, idx) => {
    const checkOutProgressStep = checkoutItem.querySelector('.js-checkout-form__step');
    const checkOutModifyStep = checkoutItem.querySelector('.js-checkout-modify');

    checkOutProgressStep.dataset.checkoutStep = `${idx}`;
    if (checkOutModifyStep) {
      checkOutModifyStep.dataset.modifyStep = `${idx}`;
    }
  });

  const checkOutModificationTriggers = document.querySelectorAll('.js-checkout-modify');
  checkOutModificationTriggers.forEach((trigger) => {
    trigger?.addEventListener('click', (e) => {
      e.preventDefault();
      const stepIndex = +trigger.dataset.modifyStep;
      const checkoutStepsList = document.querySelectorAll('.js-checkout-form__step');

      checkoutStepsList[stepIndex].closest('.dropdown-collapse').classList.remove('finished');
      trigger.closest('.c-checkout-form__form-summary').classList.add('g-hidden');
      checkoutStepsList[stepIndex].closest('.dropdown-collapse').classList.add('show');

      for (let i = stepIndex + 1; i < checkoutStepsList.length; i++) {
        if (checkoutStepsList[i] !== undefined) {
          checkoutStepsList[i]?.closest('.dropdown-collapse')?.classList.remove('finished');
          checkoutStepsList[i]?.closest('.dropdown-collapse')?.classList.remove('show');
          checkoutStepsList[i]?.closest('.dropdown-collapse')?.classList.add('disabled');
          checkoutStepsList[i]
            ?.closest('.dropdown-collapse')
            ?.querySelector('.c-checkout-form__form-summary')
            ?.classList.add('g-hidden');
        }
      }
    });
  });

  MicroModal.init();
  _dateInputs();
  _infoBanners();
  _dataChecks();
  _promoCode();
  _showDetails();
  _companyBill();
  _completeChecokut();
  MOCK_userIsLogged && _autoFill();
  MOCK_userIsLogged && _savedCreditCards();
};

// -- Formularies / Validation --

const _formAddPassenger = (formValidation, passengerId, mainUser = false) => {
  formValidation
    .addField(`#checkoutForm-passenger-type-${passengerId}`, [
      {
        rule: 'required',
      },
    ])
    .addRequiredGroup(`#checkoutForm-passenger-gender-${passengerId}`, 'You should select one option')
    .addField(`#checkoutForm-passenger-name-${passengerId}`, [
      {
        rule: 'required',
        errorMessage: 'This field is required',
      },
    ])
    .addField(`#checkoutForm-passenger-surname1-${passengerId}`, [
      {
        rule: 'required',
        errorMessage: 'This field is required',
      },
    ])
    .addField(`#checkoutForm-passenger-surname2-${passengerId}`, [
      {
        rule: 'minLength',
        value: 1,
      },
      {
        validator: (value, fields) => {
          if (fields[`#checkoutForm-passenger-nationality-${passengerId}`].elem.value === 'spanish') {
            return value !== '';
          }
          return true;
        },
        errorMessage: 'This field is required',
      },
    ])
    .addField(`#checkoutForm-passenger-nationality-${passengerId}`, [
      {
        rule: 'required',
        errorMessage: 'This field is required',
      },
    ])
    .addField(`#checkoutForm-passenger-idDocType-${passengerId}`, [
      {
        rule: 'required',
      },
    ])
    .addField(`#checkoutForm-passenger-idNumber-${passengerId}`, [
      {
        validator: (value, fields) => {
          switch (fields[`#checkoutForm-passenger-idDocType-${passengerId}`].elem.value) {
            case 'nif':
              return value.match(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i) ? true : false;

            case 'nie':
              return value.match(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i) ? true : false;

            case 'not-document':
              return true;

            default:
              return value !== '';
          }
        },
        errorMessage: 'The number is invalid',
      },
    ])
    .addField(`#checkoutForm-passenger-birthday-${passengerId}`, [
      {
        plugin: JustValidatePluginDate((fields) => ({
          required: true,
          format: 'dd/mm/yyyy',
          ...(fields[`#checkoutForm-passenger-type-${passengerId}`].elem.value === 'adult' && {
            isBefore: _getValidAgeDate(MOCK_travelingDate, 'adult'),
          }),
          ...(fields[`#checkoutForm-passenger-type-${passengerId}`].elem.value === 'children' && {
            isAfter: _getValidAgeDate(MOCK_travelingDate, 'children'),
          }),
          ...(fields[`#checkoutForm-passenger-type-${passengerId}`].elem.value === 'senior60' && {
            isBefore: _getValidAgeDate(MOCK_travelingDate, 'senior60'),
          }),
        })),
        errorMessage: 'This birtday date is invalid',
      },
    ]);

  if (mainUser) {
    formValidation
      .addField(`#checkoutForm-passenger-email-${passengerId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
        {
          rule: 'email',
          errorMessage: 'Email is invalid',
        },
      ])
      .addField(`#checkoutForm-passenger-phonePrefix-${passengerId}`, [
        {
          rule: 'required',
          errorMessage: '',
        },
      ])
      .addField(`#checkoutForm-passenger-phone-${passengerId}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
        {
          rule: 'customRegexp',
          value: /^[0-9]*$/,
        },
      ]);
  }
};

const _formAddPet = (formValidation, petId) => {
  formValidation
    .addField(`#checkoutForm-pet-size-${petId}`, [
      {
        rule: 'required',
      },
    ])
    .addField(`#checkoutForm-pet-type-${petId}`, [
      {
        rule: 'required',
        errorMessage: 'This field is required',
      },
    ])
    .addField(`#checkoutForm-pet-name-${petId}`, [
      {
        rule: 'customRegexp',
        value: /(.*?)/,
      },
    ]);
};

const _formAddVehicle = (formValidation, vehicleId) => {
  formValidation
    .addField(`#checkoutForm-vehicle-type-${vehicleId}`, [
      {
        rule: 'required',
      },
    ])
    .addField(`#checkoutForm-vehicle-id-${vehicleId}`, [
      {
        rule: 'required',
      },
    ]);
};

const _formAddField = ({ fieldName, formValidation, id = null }) => {
  switch (fieldName) {
    case 'specialAssistance': {
      formValidation.addField(`#checkoutForm-passenger-assistanceType-${id}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ]);
      break;
    }

    case 'idDocumentExpireDate': {
      formValidation.addField(`#checkoutForm-passenger-idExpireDate-${id}`, [
        {
          plugin: JustValidatePluginDate(() => ({
            required: true,
            format: 'dd/mm/yyyy',
          })),
          errorMessage: 'This birtday date is invalid',
        },
      ]);
      break;
    }

    case 'savePassenger': {
      formValidation.addField(`#checkoutForm-passenger-savePassenger-${id}`, [{ validator: () => true }]);
      break;
    }

    case 'bigFamily': {
      formValidation.addField('#checkoutForm-bigFamily-id', [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ]);
      break;
    }

    case 'assistanceInfo': {
      formValidation.addField(`#checkoutForm-passenger-assistanceInfo-${id}`, [
        {
          rule: 'required',
          errorMessage: 'This field is required',
        },
      ]);
      break;
    }

    case 'baleariaClub': {
      formValidation
        .addField(`#checkoutForm-baleariaClub-password`, [
          {
            rule: 'required',
            errorMessage: ' ',
          },
          {
            rule: 'customRegexp',
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            errorMessage: ' ',
          },
        ])
        .addField(`#checkoutForm-baleariaClub-idExpireDate`, [
          {
            plugin: JustValidatePluginDate(() => ({
              requierd: true,
              format: 'dd/mm/yyyy',
            })),
          },
        ]);
      break;
    }

    case 'whatsappBoardingPass': {
      formValidation
        .addField(`#checkoutForm-boardingPassWatsapp-phonePrefix`, [
          {
            rule: 'required',
          },
        ])
        .addField(`#checkoutForm-boardingPassWatsapp-phone`, [
          {
            rule: 'required',
            errorMessage: 'This field is required',
          },
          {
            rule: 'customRegexp',
            value: /^[0-9]*$/,
          },
        ]);
      break;
    }
    case 'vehicleType': {
      formValidation.addField(`#checkoutForm-vehicle-type-${id}`, [
        {
          rule: 'required',
        },
      ]);
      break;
    }
    case 'vehicleTrailer': {
      formValidation.addField(`#checkoutForm-vehicle-trailerId-${id}`, [
        {
          rule: 'required',
        },
      ]);
      break;
    }
    case 'caravanOtherModel': {
      formValidation.addField(`#checkoutForm-vehicle-model-${id}`, [
        {
          rule: 'required',
        },
      ]);
      break;
    }
    case 'additionalEquipment': {
      formValidation
        .addField(`#checkoutForm-vehicle-additionalEquip-${id}`, [
          {
            rule: 'required',
            errorMessage: 'This field is required',
          },
        ])
        .addField(`#checkoutForm-vehicle-equipQty-${id}`, [
          {
            rule: 'required',
            errorMessage: 'This field is required',
          },
        ]);
      break;
    }
  }
};
const _formRemoveField = ({ fieldName, formValidation, id = null }) => {
  switch (fieldName) {
    case 'specialAssistance': {
      formValidation.removeField(`#checkoutForm-passenger-assistanceType-${id}`);
      break;
    }

    case 'assistanceInfo': {
      formValidation.removeField(`#checkoutForm-passenger-assistanceInfo-${id}`);
      break;
    }

    case 'baleariaClub': {
      formValidation
        .removeField(`#checkoutForm-baleariaClub-password`)
        .removeField(`#checkoutForm-baleariaClub-idExpireDate`);
      document.getElementById('checkoutForm-baleariaClub-password').value = '';
      document.getElementById('checkoutForm-baleariaClub-idExpireDate').value = '';
      break;
    }

    case 'whatsappBoardingPass': {
      formValidation
        .removeField(`#checkoutForm-boardingPassWatsapp-phonePrefix`)
        .removeField(`#checkoutForm-boardingPassWatsapp-phone`);
      document.getElementById('checkoutForm-boardingPassWatsapp-phonePrefix').value = '';
      document.getElementById('checkoutForm-boardingPassWatsapp-phone').value = '';
      break;
    }

    case 'additionalEquipment': {
      formValidation
        .removeField(`#checkoutForm-vehicle-additionalEquip-${id}`)
        .removeField(`#checkoutForm-vehicle-equipQty-${id}`);
      break;
    }
  }
};

const _fillCheckoutData = (formId, formData) => {
  switch (formId.split('js-form-checkout-')[1]) {
    case 'passengers': {
      const passangersFormData = Object.entries(formData).reduce((acc, [dataFieldKey, dataFieldValue]) => {
        const splittedField = dataFieldKey.split('-');
        if (splittedField[0] === 'passenger') {
          const passengerId = splittedField.reverse()[0];
          return {
            ...acc,
            passengers: {
              ...acc.passengers,
              [passengerId]: {
                ...acc.passengers?.[passengerId],
                [splittedField[1]]: dataFieldValue,
                ...(splittedField[1] === 'email' && { mainUser: true }),
                ...(splittedField[1] === 'savePassenger' && { savePassenger: true }),
              },
            },
          };
        }
        return {
          ...acc,
          [dataFieldKey]: dataFieldValue,
        };
      }, {});

      checkoutData = {
        ...checkoutData,
        passengersData: {
          ...checkoutData.passengersData,
          ...passangersFormData,
        },
      };

      break;
    }
    case 'pets': {
      const petsData = Object.entries(formData).reduce((acc, [dataFieldKey, dataFieldValue]) => {
        const splittedField = dataFieldKey.split('-');
        const petIdx = splittedField.reverse()[0];
        return {
          ...acc,
          [petIdx]: {
            ...acc[petIdx],
            [splittedField[1]]: dataFieldValue,
          },
        };
      }, {});
      checkoutData = {
        ...checkoutData,
        pets: petsData,
      };
    }

    case 'vehicles': {
      const vehiclesData = Object.entries(formData).reduce((acc, [dataFieldKey, dataFieldValue]) => {
        const splittedField = dataFieldKey.split('-');
        const elementId = splittedField.reverse()[0];
        if (splittedField[1] === 'additionalEquip' || splittedField[1] === 'equipQty') {
          if (!dataFieldValue) {
            return acc;
          }
          return {
            ...acc,
            additionalEquipment: {
              ...acc.additionalEquipment,
              [elementId]: {
                ...acc.additionalEquipment?.[elementId],
                ...(splittedField[1] === 'additionalEquip' && { type: dataFieldValue }),
                ...(splittedField[1] === 'equipQty' && { quantity: dataFieldValue }),
              },
            },
          };
        }

        return {
          ...acc,
          vehicles: {
            ...acc.vehicles,
            [elementId]: {
              ...acc.vehicles?.[elementId],
              ...(splittedField[1] === 'type' && { type: dataFieldValue }),
              ...(splittedField[1] === 'id' && { id: dataFieldValue }),
              ...(splittedField[1] === 'trailerId' && { trailerId: dataFieldValue }),
              ...(splittedField[1] === 'model' && { caravanOtherModel: dataFieldValue }),
            },
          },
        };
      }, {});

      checkoutData = {
        ...checkoutData,
        vehiclesData: vehiclesData,
      };
    }
    default:
      return;
  }
};

const _fillCheckoutSummary = (formId, checkoutData) => {
  switch (formId.split('js-form-checkout-')[1]) {
    case 'passengers': {
      _fillPassengersSummary(checkoutData?.passengersData?.passengers);
      break;
    }
    case 'pets': {
      _fillPetsSummary(checkoutData?.pets);
      break;
    }
    case 'vehicles': {
      _fillVehiclesSummary(checkoutData?.vehiclesData);
      break;
    }
    default:
      return;
  }
};

const _onFormSubmit = (formValidation) => {
  formValidation
    .onSuccess((event) => {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.target));
      _fillCheckoutData(formValidation.form.id, formData);
      _fillCheckoutSummary(formValidation.form.id, checkoutData);
      _checkoutAdvanceStep(formValidation.form);
    })
    .onFail((fields) => {
      console.log('validation failed', fields);
      _scrollToFirstInvalidInput();
    });
};

const _initCheckoutForms = () => {
  const checkoutFormPassengers = document.getElementById('js-form-checkout-passengers');
  const checkoutFormPets = document.getElementById('js-form-checkout-pets');
  const checkoutFormVehicless = document.getElementById('js-form-checkout-vehicles');

  if (checkoutFormPassengers) {
    const passengersValidation = new JustValidate(
      '#js-form-checkout-passengers',
      {
        errorFieldCssClass: 'g-input-not-valid',
        errorLabelCssClass: 'g-input__error-label',
        focusInvalidField: false,
      },
      [
        {
          key: 'This field is required',
          dict: {
            es: 'Este campo es obligatorio',
          },
        },
        {
          key: 'Email is invalid',
          dict: {
            es: 'Introduce un email válido',
          },
        },
        {
          key: 'The number is invalid',
          dict: {
            es: 'Introduce un número válido',
          },
        },
        {
          key: 'This birtday date is invalid',
          dict: {
            es: 'La fecha no es correcta',
          },
        },
      ],
    );
    passengersValidation.setCurrentLocale(MOCK_LOCALE);

    _formAddPassenger(passengersValidation, 1, true);
    _formAddPassenger(passengersValidation, 2);
    _formAddPassenger(passengersValidation, 3);
    _onFormSubmit(passengersValidation);

    MOCK_bigFamilyDiscount && _formAddField({ fieldName: 'bigFamily', formValidation: passengersValidation });

    const baleariaClubToggle = document.querySelector('[data-trigger="baleariaClub-toggle"]');
    baleariaClubToggle?.addEventListener('change', (e) => {
      if (e.target.checked) {
        _formAddField({ fieldName: 'baleariaClub', formValidation: passengersValidation });
      } else {
        _formRemoveField({ fieldName: 'baleariaClub', formValidation: passengersValidation });
      }
    });

    const watsappToggle = document.querySelector('[data-trigger="watsapp-toggle"]');
    watsappToggle?.addEventListener('change', (e) => {
      if (e.target.checked) {
        _formAddField({ fieldName: 'whatsappBoardingPass', formValidation: passengersValidation });
      } else {
        _formRemoveField({ fieldName: 'whatsappBoardingPass', formValidation: passengersValidation });
      }
    });

    const specialAssistaceToggles = document.querySelectorAll('[data-trigger="special-assistance"]');
    specialAssistaceToggles.forEach((toggle) => {
      toggle?.addEventListener('change', (e) => {
        const specialAssistanceLocation = toggle
          .closest('[data-element="special-assistance"]')
          ?.querySelector('.c-check-accordion__content');
        const asistanceTypeInput = specialAssistanceLocation?.querySelector('select');
        const passengerId = specialAssistanceLocation?.dataset.passengerId;
        let assistanceInfo = specialAssistanceLocation.querySelector('[data-element="assistance-info"]');

        if (e.target.checked) {
          _formAddField({ fieldName: 'specialAssistance', formValidation: passengersValidation, id: passengerId });

          asistanceTypeInput?.addEventListener('change', (e) => {
            switch (true) {
              case e.target.value === 'embarazada': {
                assistanceInfo.innerHTML = _checkoutGenerateAssistancePregnantInput(passengerId);
                _formAddField({ fieldName: 'assistanceInfo', formValidation: passengersValidation, id: passengerId });
                break;
              }
              case e.target.value.split('_')[0] === 'discapacitado': {
                assistanceInfo.innerHTML = _checkoutGenerateAssistanceAffiliateInput(passengerId);
                _formAddField({ fieldName: 'assistanceInfo', formValidation: passengersValidation, id: passengerId });
                break;
              }
              default:
                if (assistanceInfo.hasChildNodes()) {
                  _formRemoveField({
                    fieldName: 'assistanceInfo',
                    formValidation: passengersValidation,
                    id: passengerId,
                  });
                  assistanceInfo.removeChild(assistanceInfo.childNodes[0]);
                }
            }
          });
        } else {
          if (assistanceInfo.hasChildNodes()) {
            _formRemoveField({ fieldName: 'assistanceInfo', formValidation: passengersValidation, id: passengerId });
            assistanceInfo.removeChild(assistanceInfo.childNodes[0]);
          }
          _formRemoveField({ fieldName: 'specialAssistance', formValidation: passengersValidation, id: passengerId });
          asistanceTypeInput.value = '';
        }
      });
    });

    if (MOCK_userIsLogged && document.querySelectorAll('[data-id^="savedPassengerId"]').length) {
      //on integration, loop throgh passengers fetched from Accomodations data to add document-expiring-date by ID
      _formAddField({ fieldName: 'savePassenger', formValidation: passengersValidation, id: 2 });
      _formAddField({ fieldName: 'savePassenger', formValidation: passengersValidation, id: 3 });
    }

    if (MOCK_internationalTravel) {
      document
        .querySelectorAll('#js-form-checkout-passengers option[value="no-document"]')
        .forEach((option) => option.remove());
      // on integration, loop throgh passengers fetched from Accomodations data to add document-expiring-date by ID
      _formAddField({ fieldName: 'idDocumentExpireDate', formValidation: passengersValidation, id: 1 });
      _formAddField({ fieldName: 'idDocumentExpireDate', formValidation: passengersValidation, id: 2 });
      _formAddField({ fieldName: 'idDocumentExpireDate', formValidation: passengersValidation, id: 3 });
    } else {
      //no-document option for underage passengers
      const passengerIdTypeSelects = document.querySelectorAll('*[id^="checkoutForm-passenger-idDocType"]');
      passengerIdTypeSelects.forEach((select) => {
        const passengerId = select.id.split('-').reverse()[0];
        select.addEventListener('change', (e) => {
          e.target.value === 'no-document'
            ? (document.getElementById(`checkoutForm-passenger-idNumber-${passengerId}`).disabled = true)
            : (document.getElementById(`checkoutForm-passenger-idNumber-${passengerId}`).disabled = false);
        });
      });
      const nationalityInputsList = document.querySelectorAll('*[id^="checkoutForm-passenger-nationality"]');
    }
  }

  if (checkoutFormPets) {
    const petsValidation = new JustValidate('#js-form-checkout-pets', {
      errorFieldCssClass: 'g-input-not-valid',
      errorLabelCssClass: 'g-input__error-label',
      focusInvalidField: false,
    });

    _formAddPet(petsValidation, 1);
    _formAddPet(petsValidation, 2);
    _onFormSubmit(petsValidation);
  }

  if (checkoutFormVehicless) {
    const vehiclesValidation = new JustValidate('#js-form-checkout-vehicles', {
      errorFieldCssClass: 'g-input-not-valid',
      errorLabelCssClass: 'g-input__error-label',
      focusInvalidField: false,
    });

    switch (MOCK_vehicles?.type) {
      case 'bike':
      case 'scooter':
      case 'electricScooter': {
        _formAddField({
          fieldName: 'vehicleType',
          formValidation: vehiclesValidation,
          id: 1,
        });
        const vehiclesQtyText = document.querySelector('[data-text="vehicles-qty"]');
        if (vehiclesQtyText) vehiclesQtyText.innerHTML = MOCK_vehicles.quantity;
        break;
      }
      case 'motorbike': {
        for (let i = 1; i <= MOCK_vehicles.quantity; i++) {
          _formAddVehicle(vehiclesValidation, i);
        }
        const vehiclesQtyText = document.querySelector('[data-text="vehicles-qty"]');
        if (vehiclesQtyText) vehiclesQtyText.innerHTML = MOCK_vehicles.quantity;
        break;
      }
      case 'caravan_other': {
        _formAddVehicle(vehiclesValidation, 1);
        _formAddField({
          fieldName: 'caravanOtherModel',
          formValidation: vehiclesValidation,
          id: 1,
        });
        const vehiclesQtyText = document.querySelector('[data-text="vehicles-qty"]');
        if (vehiclesQtyText) vehiclesQtyText.innerHTML = MOCK_vehicles.quantity;
        break;
      }

      case 'car_van':
      default:
        _formAddVehicle(vehiclesValidation, 1);
        const vehicleModelText = document.querySelector('[data-text="vehicle-model"]');
        if (vehicleModelText && MOCK_vehicles.model) vehicleModelText.innerHTML = MOCK_vehicles.model;
    }
    if (MOCK_vehicles.trailer) {
      _formAddField({
        fieldName: 'vehicleTrailer',
        formValidation: vehiclesValidation,
        id: 1,
      });
    }
    _onFormSubmit(vehiclesValidation);

    const additionalEquipmentToggle = document.querySelector('[data-trigger="additional-equipment"]');
    additionalEquipmentToggle?.addEventListener('change', (e) => {
      const activeEquipmentList = document
        .querySelector('[data-element="additional-equipment"]')
        .querySelectorAll('[data-equipment]');
      if (e.target.checked) {
        for (let i = 0; i < activeEquipmentList.length; i++) {
          _formAddField({
            fieldName: 'additionalEquipment',
            formValidation: vehiclesValidation,
            id: activeEquipmentList[i].dataset.equipment,
          });
        }
      } else {
        for (let i = 0; i < activeEquipmentList.length; i++) {
          _formRemoveField({
            fieldName: 'additionalEquipment',
            formValidation: vehiclesValidation,
            id: activeEquipmentList[i].dataset.equipment,
          });
        }
      }
    });

    const addNewEquipmentBtn = document.querySelector('[data-trigger="add-equipment"]');
    addNewEquipmentBtn?.addEventListener('click', (e) => {
      const additionalEquipmentLocation = document.querySelector('[data-element="additional-equipment"]');
      const additionalEquipmentList = additionalEquipmentLocation.querySelectorAll('[data-equipment]');
      const newEquipmentId = +additionalEquipmentList[additionalEquipmentList.length - 1].dataset.equipment + 1;
      const [newEquipmentType, newEquipmentQty] = _checkoutGenerateAdditionalEquipment(newEquipmentId);

      let newEquimentWrapper = document.createElement('div');
      newEquimentWrapper.classList.add('o-row');
      newEquimentWrapper.dataset.equipment = newEquipmentId;
      newEquimentWrapper.appendChild(newEquipmentType);
      newEquimentWrapper.appendChild(newEquipmentQty);
      newEquimentWrapper.querySelector('[data-trigger="remove-equipment"]')?.addEventListener('click', (e) => {
        _formRemoveField({
          fieldName: 'additionalEquipment',
          formValidation: vehiclesValidation,
          id: newEquimentWrapper.dataset.equipment,
        });
        newEquimentWrapper.remove();
      });
      additionalEquipmentLocation.appendChild(newEquimentWrapper);
      _formAddField({ fieldName: 'additionalEquipment', formValidation: vehiclesValidation, id: newEquipmentId });
    });
  }
};

const _cleanOptions = (select) => {
  while (select?.length > 0) {
    select.remove(0);
  }
};

const _addOptions = (select, documentsType) => {
  _cleanOptions(select);

  documentsType.forEach((value) => {
    let option = document.createElement('option');
    option.text = value;
    select.add(option);
  });
};

const _setData = (e) => {
  let nacionality = e.target.value?.toUpperCase();
  let isResident = document.querySelector('input[type=checkbox][name=residente]')?.checked;
  let select;

  if (nacionality !== 'ON') {
    select = e.target.closest('.js-passenger')?.querySelector('.js-document-type');
  } else {
    nacionality = e.target
      .closest('.js-check-resident')
      ?.parentNode?.querySelector('.js-nacionality')
      ?.value?.toUpperCase();

    select = e.target.closest('.js-check-resident')?.parentNode?.querySelector('.js-document-type');
  }

  document.querySelector('.js-document-number').value = '';

  if (nacionality === 'ESPAÑA') {
    if (isResident) {
      _addOptions(select, ['', 'DNI']);
      return;
    }
    if (!isResident) {
      _addOptions(select, ['', 'DNI', 'PASAPORTE']);
      return;
    }
  }

  if (nacionality !== 'ESPAÑA') {
    if (isResident) {
      _addOptions(select, ['', 'NIE']);
      return;
    }
    if (!isResident) {
      _addOptions(select, ['', 'NIE', 'DOCUMENTO EXTRANJERO', 'PASAPORTE']);
      return;
    }
  }
};

const _showResidentSection = (e) => {
  document.querySelectorAll('.js-resident-section').forEach((e) => {
    e.classList.toggle('u-no-display');
  });
};

const _setMaxLength = (e) => {
  let prefix = e.target.value;
  let maxlength = '8';

  switch (prefix) {
    case '+34':
    case '+51':
      maxlength = '9';
      break;
    case '+58':
      maxlength = '10';
      break;
    default:
      maxlength = '7';
      break;
  }

  document.querySelector('.js-passenger-phone').setAttribute('maxlength', maxlength);
};

// -- Init --
const checkout = () => {
  // const respAcommodation = accommodationMap.toDomain(dataAccommodation);

  _initCheckout();
  _initCheckoutForms();

  document.querySelectorAll('input[type=checkbox][name=residente]').forEach((e) => {
    e.addEventListener('change', _showResidentSection);
    e.addEventListener('change', _setData);
  });
  document.querySelectorAll('.js-nacionality').forEach((e) => {
    e.addEventListener('change', _setData);
  });
  document.querySelectorAll('.js-passenger-phonePrefix').forEach((e) => {
    e.addEventListener('change', _setMaxLength);
  });
};

export default checkout;
