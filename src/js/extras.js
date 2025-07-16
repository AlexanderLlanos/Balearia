import { extrasMap } from './mappers/extras.map';
import { accommodationMap } from './mappers/accommodation.map';
import dataExtras from '../assets/data/extras.json';
import dataAccommodation from '../assets/data/accommodations.json';
import MicroModal from 'micromodal';

export const Extras = (options) => {
  const OUTBOUND = 'outbound';
  const INBOUND = 'inbound';

  const FOOD_TOKEN = 'foodToken';
  const FOOD = 'food';

  const DISPLAY_NONE = 'display:none';
  const DISPLAY_BLOCK = 'display:block';

  const respExtras = extrasMap.toDomain(dataExtras);
  const respAcommodation = accommodationMap.toDomain(dataAccommodation);

  const outElement = document.querySelector('.js-outbound');
  const inElement = document.querySelector('.js-inbound');

  const listElement = '.js-details-list';
  const ADDTOLIST = 'addToList';
  const REMOVELIST = 'removeFromList';
  const accountantClass = '.js-accountant';
  const plusClass = '.js-plus';
  const minusClass = '.js-minus';
  const quantityClass = '.js-quantity';
  const checkBoxClass = '.js-checkbox';

  let extrasResume = {
    outbound: {
      totalPrice: 0.0,
      items: [],
    },
    inbound: {
      totalPrice: 0.0,
      items: [],
    },
  };

  const activeClass = 'active';
  const sectionBtnClass = '.js-section-btn';
  const addBtnClass = '.js-btn-add';
  const removeBtnClass = '.js-btn-remove';
  const addClass = '.js-add';
  const removeClass = '.js-remove';
  const parentClass = options?.parentClass;
  const additionalClass = options?.additionalClass;

  let sectionParent, btnParent;
  let dataParking = {};
  let flexibilityToggle = false;

  let foodTokenIds = respExtras.foodToken
    .filter((element) => {
      return element.type === 'food-token';
    })
    .map((e) => {
      return e.id;
    });

  let foodIds = respExtras.food
    .filter((element) => {
      return element.type === FOOD;
    })
    .map((e) => {
      return e.id;
    });

  MicroModal.init();

  const _addFirstItem = function (box) {
    const parentElement = box.querySelector(accountantClass);
    let quantityElement = parseInt(parentElement.dataset.quantity) || 0;
    quantityElement = quantityElement + 1;
    parentElement?.setAttribute('data-quantity', quantityElement);

    _setLabelQuantity(parentElement, quantityElement);

    _extrasAction(
      parentElement?.dataset?.type,
      ADDTOLIST,
      parentElement?.dataset?.direction,
      parentElement?.dataset?.id,
      quantityElement,
      true,
    );
  };

  const _getDays = function (id) {
    let str = [0];

    outElement.querySelector(listElement).childNodes.forEach((element) => {
      if (element?.dataset?.id === id) {
        str = element.querySelector('.js-adult-total')?.innerHTML?.split(' ');
      }
    });

    return str[0];
  };

  const _setDays = function (id) {
    const parentElement = document.querySelector('.js-modal-parking')?.closest(accountantClass);

    if (parentElement) {
      document.querySelector('.js-modal-parking').dataset.quantity = _getDays(id);
      parentElement.querySelector(quantityClass).innerHTML = _getDays(id) + ' días';
    }
  };
  const _add = function (e) {
    const box = e.target?.closest(parentClass);

    if (box?.dataset.type !== 'parking') {
      box?.classList?.add(activeClass);
      _toggleBtnSection(box, DISPLAY_NONE, DISPLAY_BLOCK);
    }

    if (box.querySelector(additionalClass)) {
      const otherBox = box?.querySelector(additionalClass);
      otherBox?.setAttribute('style', 'display:flex');
      sectionParent = e.target?.closest(parentClass);
      btnParent = e.target?.closest(sectionBtnClass);

      if (box?.dataset.type === 'pets') {
        _addFirstItem(box);

        return;
      }

      return;
    } else if (box?.dataset.type === 'pets') {
      const parentElement = box.querySelector(accountantClass);
      parentElement?.setAttribute('data-quantity', 1);

      _extrasAction(
        parentElement?.dataset?.type,
        ADDTOLIST,
        parentElement?.dataset?.direction,
        parentElement?.dataset?.id,
        1,
        true,
      );

      return;
    }

    const mainContainer = document.querySelector('.js-main-container');

    if (box?.dataset.type === 'parking') {
      _setDays(box.querySelector('.js-section-btn').dataset.id);
      MicroModal.show('modal-parking');

      return;
    }

    if (
      box?.dataset.type === 'accomodation' ||
      box?.dataset.type === 'flexibility' ||
      box?.dataset.type === 'security'
    ) {
      // flexibilityToggle
      if (box?.dataset.type === 'flexibility') {
        flexibilityToggle = true;
        document.querySelector('.js-acomodaciones-tarifa-mini').setAttribute('style', 'display:none');
        document.querySelector('.js-acomodaciones-tarifa-reducida').setAttribute('style', 'display:block');
      }

      if (mainContainer?.dataset.first === 'true') {
        mainContainer?.setAttribute('data-first', box?.dataset.type);
        mainContainer?.setAttribute('data-textPrice', e.target?.closest(sectionBtnClass)?.dataset?.id);
      } else {
        switch (mainContainer?.dataset.first) {
          case 'accomodation':
            if (box?.dataset.type === 'flexibility') {
              mainContainer?.setAttribute('data-textSelected', box?.dataset.type);
              _showModalChangePrice(mainContainer);
            }
            break;
          case 'security':
            if (box?.dataset.type === 'accomodation') {
              mainContainer?.setAttribute('data-textSelected', box?.dataset.type);
              _showModalChangePrice(mainContainer);
            }
            break;
          case 'flexibility':
            break;
        }
      }
    }

    _extrasAction(
      e.target?.closest(parentClass)?.dataset?.type,
      ADDTOLIST,
      e.target?.closest(parentClass)?.dataset?.direction,
      e.target?.closest(sectionBtnClass)?.dataset?.id,
    );
  };

  const _showModalChangePrice = function (mainContainer) {
    document.querySelector('.js-data-textSelected').innerHTML = _getNameById(mainContainer.dataset.textselected);
    document.querySelector('.js-data-textPrice').innerHTML = _getNameById(mainContainer.dataset.textprice);

    MicroModal.show('modal-change-price');
  };

  const _getNameById = function (id) {
    switch (id) {
      case 'travel_insurance':
        return Object.keys(respExtras.travelInsurance).flatMap((key) => {
          return respExtras.travelInsurance[key];
        })[0].name;
      case 'flexibility':
        return Object.keys(respExtras.reducedRate).flatMap((key) => {
          return respExtras.reducedRate[key];
        })[0].name;
      default:
        return Object.keys(respExtras.accomodation).flatMap((key) => {
          return respExtras.accomodation[key];
        })[0].name;
    }
  };

  const _remove = function (e) {
    const box = e.target?.closest(parentClass);
    box?.classList?.remove(activeClass);
    _toggleBtnSection(box, 'display:display', DISPLAY_NONE);
    let value;

    if (box.dataset.type === 'parking') {
      dataParking = {
        ...dataParking,
        quantityElement: _getDays(dataParking.id),
      };

      value = {
        name: dataParking?.name || '',
        price: dataParking?.price * parseInt(dataParking?.quantityElement) || 0,
      };

      _updateResume(value?.price, value?.name, REMOVELIST, undefined, e.target?.closest(sectionBtnClass)?.dataset?.id);

      const modalBox = document.querySelector('.js-modal-parking');
      modalBox?.setAttribute('data-quantity', '0');
      document.querySelector('.js-license-plate').value = '';
      dataParking = {};
      document.querySelector('.js-data-parking').innerHTML = '';
      _setLabelQuantity(modalBox, 0);

      return;
    }

    if (box.querySelector(additionalClass)) {
      const otherBox = box?.querySelector(additionalClass);
      otherBox?.setAttribute('style', DISPLAY_NONE);
      sectionParent = e.target?.closest(parentClass);
      btnParent = e.target?.closest(sectionBtnClass);

      value = _getValueElement(otherBox);

      if (value) {
        _removeCheckbox(otherBox, value);
      }

      const parentElement = otherBox.querySelector(accountantClass);

      if (parentElement) {
        if (e.target?.closest(parentClass).classList.contains('js-foods') === true) {
          _removeFoods(otherBox, value);
          return;
        }

        _setLabelQuantity(parentElement, 0);

        value = _getValueElement(e.target?.closest(parentClass));

        value = {
          ...value,
          price: value.price * parseInt(parentElement?.dataset?.quantity),
        };

        parentElement?.setAttribute('data-quantity', 0);

        _updateResume(
          value?.price,
          value?.name,
          REMOVELIST,
          undefined,
          e.target?.closest(sectionBtnClass)?.dataset?.id,
        );
      }

      return;
    }

    const mainContainer = document.querySelector('.js-main-container');

    if (
      box?.dataset.type === 'accomodation' ||
      box?.dataset.type === 'flexibility' ||
      box?.dataset.type === 'security'
    ) {
      // flexibilityToggle
      if (box?.dataset.type === 'flexibility') {
        flexibilityToggle = false;
        document.querySelector('.js-acomodaciones-tarifa-reducida').setAttribute('style', 'display:none');
        document.querySelector('.js-acomodaciones-tarifa-mini').setAttribute('style', 'display:block');
      }

      if (mainContainer?.dataset.first === box?.dataset.type) {
        mainContainer?.setAttribute('data-first', 'true');
      }
    }

    _extrasAction(
      e.target?.closest(parentClass)?.dataset?.type,
      REMOVELIST,
      e.target?.closest(parentClass)?.dataset?.direction,
      e.target?.closest(sectionBtnClass)?.dataset?.id,
    );
  };

  const _removeCheckbox = function (otherBox, objectValue, direction = undefined, id = btnParent?.dataset?.id) {
    let itemChecked = [];
    let value = objectValue;

    otherBox.querySelectorAll('input[type="checkbox"]').forEach((e) => {
      if (e.checked === true) {
        const item = {
          isChecked: true,
          direction: e?.dataset?.direction,
        };
        itemChecked.push(item);
      }
      e.checked = false;
    });

    if (itemChecked.length > 1) {
      value = {
        ...value,
        price: value.price * 2,
      };
    }

    if (itemChecked.length === 0) {
      return;
    }

    _updateResume(value?.price, value?.name, REMOVELIST, direction, id);
  };

  const _removeFoods = function (otherBox, objectValue) {
    let value = objectValue;
    otherBox.querySelectorAll('.js-accountant').forEach((element) => {
      value = _getValueElement(element);

      value = {
        ...value,
        price: value.price * parseInt(element?.dataset?.quantity),
      };

      _setLabelQuantity(element, 0);
      element?.setAttribute('data-quantity', 0);

      _updateResume(value?.price, value?.name, REMOVELIST, element?.dataset?.direction, element?.dataset?.id);
    });
  };

  const _extrasAction = (extraType, extraAction, extraDirection, extraId, quantity = 1, hasAdditional = false) => {
    let value = {};
    const actions = {
      flexibility: () => {
        value = respExtras.reducedRate.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId);
      },
      security: () => {
        value = respExtras.travelInsurance.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId);
      },
      accomodation: () => {
        if (flexibilityToggle) {
          let prices;
          if (extraDirection === OUTBOUND) {
            prices = respAcommodation.routes.outbound[0].tariffs.filter((tariff) => {
              return tariff.id === extraId;
            })[0];
          }

          if (extraDirection === INBOUND) {
            prices = respAcommodation.routes.inbound[0].tariffs.filter((tariff) => {
              return tariff.id === extraId;
            })[0];
          }

          _updateResume(_getTotalPriceByFlexibility(prices), 'Camarote', extraAction, extraDirection, extraId);
          return;
        }

        value = respExtras.accomodation.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId);
      },
      foodToken: () => {
        value = respExtras.foodToken.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId, quantity, hasAdditional);
      },
      food: () => {
        value = respExtras.food.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId, quantity, hasAdditional);
      },
      wifi: () => {
        value = respExtras.wifi.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId);
      },
      experience: () => {
        value = respExtras.example.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId);
      },
      bus: () => {
        value = respExtras.bus.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId);
      },
      parking: () => {
        value = respExtras.parking.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(
          value?.price,
          value?.name,
          extraAction,
          extraDirection,
          extraId,
          dataParking.quantityElement,
          true,
          extraType,
        );
      },
      vehicleRental: () => {
        value = respExtras.vehicleRental.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId);
      },
      touristBus: () => {
        value = respExtras.touristBus.filter((element) => {
          return element.id === extraId;
        })[0];

        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId, quantity, true);
      },
      pets: () => {
        value = respExtras.pets.filter((element) => {
          return element.id === extraId;
        })[0];
        _updateResume(value?.price, value?.name, extraAction, extraDirection, extraId, quantity, hasAdditional);
      },
    };

    actions[extraType]?.();
  };

  const _getTotalPriceByFlexibility = function (prices) {
    return (
      prices?.adultPrice * respAcommodation.passenger?.adult?.quantity +
      prices?.senior60Price * respAcommodation.passenger?.seniors60?.quantity +
      prices?.childPrice * respAcommodation.passenger?.children?.quantity +
      prices?.babyPrice * respAcommodation.passenger?.babies?.quantity +
      prices?.baby12Price * respAcommodation.passenger?.babies12?.quantity
    );
  };

  const _toggleBtnSection = function (box, displayAddSection, displayRemoveSection) {
    const addSection = box?.querySelector(addClass);
    addSection?.setAttribute('style', displayAddSection);

    const removeSection = box?.querySelector(removeClass);
    removeSection?.setAttribute('style', displayRemoveSection);
  };

  const _showFoodDetails = function (displaySection, displayDetail) {
    document.querySelector('.js-food-on-board')?.setAttribute('style', displaySection);
    document.querySelector('.js-show-food-detail')?.setAttribute('style', displayDetail);
  };

  const _updateResume = (
    price,
    name,
    action,
    direction,
    id,
    quantity = 1,
    hasAdditional = false,
    extraType = undefined,
  ) => {
    price = parseFloat(price);

    let extraItem = { id, name, price, quantity };

    if (action === ADDTOLIST) {
      if (direction) {
        if (direction === OUTBOUND) {
          if (extraType === 'parking') {
            outElement.querySelector(listElement).childNodes.forEach((element) => {
              if (element?.dataset?.id === extraItem.id) {
                outElement.querySelector(listElement).removeChild(element);
                let str = element.querySelector('.js-adult-total')?.innerHTML?.split(' ');
                let oldQuantity = str[0];
                extrasResume.outbound.totalPrice -= price * oldQuantity;
              }
            });
            extrasResume.outbound.totalPrice += price * quantity;
          }

          if (extraType !== 'parking') {
            extrasResume.outbound.totalPrice += price;
          }

          extrasResume[OUTBOUND].items.push(extraItem);
          _addDetailToList(outElement, extraItem);
        } else {
          extrasResume.inbound.totalPrice += price;

          extrasResume[INBOUND].items.push(extraItem);
          _addDetailToList(inElement, extraItem);
        }
      } else {
        if (id === 'travel_insurance') {
          extrasResume.outbound.totalPrice += price;
          extrasResume.inbound.totalPrice += price;
          extraItem.price = price;
        } else {
          extrasResume.outbound.totalPrice += price / 2;
          extrasResume.inbound.totalPrice += price / 2;
          extraItem.price = price / 2;
        }

        extrasResume[OUTBOUND].items.push(extraItem);
        extrasResume[INBOUND].items.push(extraItem);

        _addDetailToList(outElement, extraItem);
        _addDetailToList(inElement, extraItem);
      }
    }

    if (action === REMOVELIST) {
      if (direction) {
        extrasResume[direction].items.push(extraItem);
        _removeByDirection(direction, price, id, extraItem, hasAdditional);
      } else {
        if (id === 'travel_insurance') {
          extrasResume.outbound.totalPrice -= price;
          extrasResume.inbound.totalPrice -= price;
        } else {
          extrasResume.outbound.totalPrice -= price / 2;
          extrasResume.inbound.totalPrice -= price / 2;
        }

        _removeDetailToList(outElement, extraItem, hasAdditional);
        _removeDetailToList(inElement, extraItem, hasAdditional);
        extrasResume[OUTBOUND].items = extrasResume[OUTBOUND].items.filter((item) => {
          return item.id !== id;
        });
        extrasResume[INBOUND].items = extrasResume[INBOUND].items.filter((item) => {
          return item.id !== id;
        });
      }
    }

    _setTotalCostToDropDown(outElement, inElement);
  };

  const _addDetailToList = (parentElement, item) => {
    if (item.quantity > 1) {
      _removeDetailToList(parentElement, item);
    }
    const itemElement = document.createElement('li');
    itemElement.classList.add('u-d-flex', 'u-align-items-center', 'u-justify-content-between', 'o-mb--1');
    itemElement.setAttribute('data-id', item.id);
    itemElement.innerHTML =
      "<p class='details__list-text'>" +
      item.name +
      "</p><p class='details__list-text u-font-weight-semibold'><span class='js-adult-total'>" +
      item.quantity +
      ' x ' +
      item.price +
      '</span> €</p>';

    parentElement.querySelector(listElement).appendChild(itemElement);
  };

  const _removeDetailToList = (parentElement, extraItem, hasAdditional = false) => {
    if (hasAdditional) {
      parentElement.querySelector(listElement).childNodes.forEach((element) => {
        if (element?.dataset?.id === extraItem.id) {
          if (extraItem.quantity === 0) {
            parentElement.querySelector(listElement).removeChild(element);
            return;
          }
          parentElement.querySelector(listElement).removeChild(element);
          const totalItem = extraItem.quantity - 1;
          extraItem = {
            quantity: totalItem,
            ...extraItem,
          };
          _addDetailToList(parentElement, extraItem);
        }
      });

      return;
    }
    parentElement.querySelector(listElement).childNodes.forEach((element) => {
      if (element?.dataset?.id === extraItem.id) {
        parentElement.querySelector(listElement).removeChild(element);
      }
    });
  };

  const _setTotalCostToDropDown = (outbound, inbound) => {
    outElement.querySelector('.js-total').innerHTML = extrasResume.outbound.totalPrice + '';
    inElement.querySelector('.js-total').innerHTML = extrasResume.inbound.totalPrice + '';
    outElement?.setAttribute('data-outbound-total', extrasResume.outbound.totalPrice + '');
    inElement?.setAttribute('data-inbound-total', extrasResume.inbound.totalPrice + '');

    const elems = document.querySelectorAll('.js-summary__total');
    elems.forEach(function (obj) {
      return (obj.innerHTML =
        (parseFloat(outbound?.dataset?.outboundTotal) || 0) + (parseFloat(inbound?.dataset?.inboundTotal) || 0) + '');
    });
  };

  const _setInitTotal = () => {
    extrasResume.outbound.totalPrice = parseFloat(document.querySelector('.js-outbound')?.dataset?.outboundTotal);
    extrasResume.inbound.totalPrice = parseFloat(document.querySelector('.js-inbound')?.dataset?.inboundTotal);
  };

  const _getValueElement = (parentElement) => {
    let value;
    switch (parentElement?.dataset?.type) {
      case 'wifi':
        value = respExtras.wifi.filter((e) => {
          return e.id === parentElement?.dataset?.id;
        })[0];
        break;

      case FOOD_TOKEN:
        value = respExtras.foodToken.filter((e) => {
          return e.id === parentElement?.dataset?.id;
        })[0];
        break;

      case FOOD:
        value = respExtras.food.filter((e) => {
          return e.id === parentElement?.dataset?.id;
        })[0];
        break;

      case 'boarding':
        const boarding = {
          outbound: () => {
            value = Object.keys(respExtras.boarding.outbound)
              .flatMap((key) => {
                return respExtras.boarding.outbound[key];
              })
              .filter((val) => {
                return val.id === parentElement?.dataset?.id;
              })[0];
          },
          inbound: () => {
            value = Object.keys(respExtras.boarding.inbound)
              .flatMap((key) => {
                return respExtras.boarding.inbound[key];
              })
              .filter((val) => {
                return val.id === parentElement?.dataset?.id;
              })[0];
          },
        };

        boarding[parentElement?.dataset?.direction]?.();
        break;

      default:
        value = false;
        break;
    }
    return value;
  };

  const _toggleDirection = (e) => {
    const element = e.target?.closest(checkBoxClass);
    const parentElement = e.target?.closest(additionalClass);
    let value = _getValueElement(parentElement);

    if (!value) {
      return;
    }

    if (element.checked) {
      _updateResume(value?.price, value?.name, ADDTOLIST, element?.dataset?.direction, btnParent?.dataset?.id);
    } else {
      _updateResume(value?.price, value?.name, REMOVELIST, element?.dataset?.direction, btnParent?.dataset?.id);
    }
  };

  const _addQuantity = (e) => {
    const parentElement = e.target?.closest(accountantClass);
    let quantityElement = parseInt(parentElement.dataset.quantity) || 0;
    quantityElement = quantityElement + 1;
    parentElement?.setAttribute('data-quantity', quantityElement);

    _setLabelQuantity(parentElement, quantityElement);
    if (parentElement?.dataset?.type !== 'parking') {
      _extrasAction(
        parentElement?.dataset?.type,
        ADDTOLIST,
        parentElement?.dataset?.direction,
        parentElement?.dataset?.id,
        quantityElement,
        true,
      );
    }
  };

  const _setLabelQuantity = (parentElement, quantityElement) => {
    let label;
    switch (parentElement.dataset?.type) {
      case 'touristBus':
        label = ' billetes';
        break;
      case 'parking':
        label = ' días';
        const value = respExtras.parking.filter((e) => {
          return e.id === parentElement?.dataset?.id;
        })[0];

        dataParking = {
          ...dataParking,
          id: value.id,
          name: value.name,
          price: value.price,
          quantityElement,
          quantity: quantityElement + label,
        };

        break;
      case 'pets':
        label = '';
        break;
      default:
        label = ' unidades';
        break;
    }

    parentElement.querySelector(quantityClass).innerHTML = quantityElement + label;
  };

  const _deleteQuantity = (e) => {
    const parentElement = e.target?.closest(accountantClass);
    let quantityElement = parseInt(parentElement.dataset.quantity) || 0;
    quantityElement = quantityElement - 1;
    if (quantityElement < 0) {
      return;
    }
    parentElement?.setAttribute('data-quantity', quantityElement);

    _setLabelQuantity(parentElement, quantityElement);

    if (quantityElement === 0) {
      let box = parentElement.closest('.js-pets');
      box?.classList?.remove(activeClass);
      _toggleBtnSection(box, DISPLAY_BLOCK, DISPLAY_NONE);
    }

    if (parentElement?.dataset?.type !== 'parking') {
      _extrasAction(
        parentElement?.dataset?.type,
        REMOVELIST,
        parentElement?.dataset?.direction,
        parentElement?.dataset?.id,
        quantityElement,
        true,
      );
    }
  };

  const _removeSection = (id) => {
    _setInitTotal();

    const actions = {
      foodToken: () => {
        const boxes = document.querySelectorAll('.js-token-section');
        boxes.forEach((box) => {
          _toggleBtnSection(box, 'display:display', DISPLAY_NONE);
          box?.classList?.remove(activeClass);
          const otherBox = box?.querySelector(additionalClass);
          otherBox?.setAttribute('style', DISPLAY_NONE);
          _searchIdIntoResume(OUTBOUND, foodTokenIds, otherBox, FOOD_TOKEN);
          _searchIdIntoResume(INBOUND, foodTokenIds, otherBox, FOOD_TOKEN);
        });
      },
      food: () => {
        const boxes = document.querySelectorAll('.js-food-section');
        boxes.forEach((box) => {
          _toggleBtnSection(box, 'display:display', DISPLAY_NONE);
          box?.classList?.remove(activeClass);
          box?.querySelector(additionalClass)?.setAttribute('style', DISPLAY_NONE);
          const otherBox = box?.querySelectorAll(accountantClass);
          _searchIdIntoResume(OUTBOUND, foodIds, otherBox[0], FOOD);
          _searchIdIntoResume(INBOUND, foodIds, otherBox[1], FOOD);
        });
      },
    };

    actions[id]?.();
  };

  const _searchIdIntoResume = (direction, array, otherBox, sectionType) => {
    let item;
    extrasResume[direction].items.map((e) => {
      if (array.includes(e.id)) {
        item = { price: e.price, name: e.name, id: e.id };

        if (sectionType === FOOD) {
          _removeFoods(otherBox.parentNode, item);
          _setTotalCostToDropDown(outElement, inElement);
        }

        if (sectionType === FOOD_TOKEN) {
          _removeCheckbox(otherBox, item, direction, item.id);
          _removeDetailToList(outElement, item, false);
          _removeDetailToList(inElement, item, false);
        }
      }
    });
  };

  const _removeByDirection = (direction, price, id, extraItem, hasAdditional = false) => {
    _setInitTotal();

    if (direction === OUTBOUND) {
      extrasResume.outbound.totalPrice -= price;

      _removeDetailToList(outElement, extraItem, hasAdditional);
      extrasResume[OUTBOUND].items = extrasResume[OUTBOUND].items.filter((item) => {
        return item.id !== id;
      });
    } else {
      extrasResume.inbound.totalPrice -= price;

      _removeDetailToList(inElement, extraItem, hasAdditional);
      extrasResume[INBOUND].items = extrasResume[INBOUND].items.filter((item) => {
        return item.id !== id;
      });
    }
  };

  const _saveParking = () => {
    const inpObj = document.querySelector('.js-license-plate');
    if (inpObj.checkValidity()) {
      if (dataParking?.quantityElement > 0) {
        dataParking = {
          ...dataParking,
          licensePlate: document.querySelector('.js-license-plate')?.value || '',
        };
        document.querySelector('.js-data-parking').innerHTML = `${dataParking.licensePlate} ${dataParking.quantity}`;
        MicroModal.close();
        document.querySelector('.js-parking').classList.add('active');
        let boxButtons = document.querySelector('.js-data-parking').parentElement.parentElement;

        boxButtons.querySelector('.js-add').setAttribute('style', 'display:none');
        boxButtons.querySelector('.js-remove').setAttribute('style', 'display:block');

        let element = document.querySelector('.js-modal-parking');

        _extrasAction(
          element?.dataset?.type,
          ADDTOLIST,
          element?.dataset?.direction,
          element?.dataset?.id,
          dataParking?.quantityElement,
          true,
        );
      }
    }
  };

  const _editParking = (e) => {
    _setDays(e.target.closest('.js-section-btn').dataset.id);
    MicroModal.show('modal-parking');
  };

  const _closeModalParking = (e) => {
    if (document.querySelector('.js-data-parking').innerHTML === '') {
      let boxButtons = document.querySelector('.js-data-parking').parentElement.parentElement;

      boxButtons.querySelector('.js-add').setAttribute('style', 'display:block');
      boxButtons.querySelector('.js-remove').setAttribute('style', 'display:none');

      boxButtons.closest('.js-extras').classList.remove('active');
    }
    MicroModal.close('modal-parking');
  };

  // public

  const render = () => {
    document.querySelectorAll(addBtnClass).forEach((e) => {
      e?.addEventListener('click', _add, true);
    });
    document.querySelectorAll(removeBtnClass).forEach((e) => {
      e?.addEventListener('click', _remove, true);
    });

    document.querySelector('.js-btn-food-detail')?.addEventListener(
      'click',
      () => {
        _removeSection(FOOD_TOKEN);
        _showFoodDetails(DISPLAY_NONE, DISPLAY_BLOCK);
      },
      true,
    );
    document.querySelector('.js-close-food-detail')?.addEventListener(
      'click',
      () => {
        _removeSection(FOOD);
        _showFoodDetails(DISPLAY_BLOCK, DISPLAY_NONE);
      },
      true,
    );

    document.querySelectorAll(checkBoxClass).forEach((e) => {
      e?.addEventListener('click', _toggleDirection, true);
    });

    document.querySelectorAll(plusClass).forEach((e) => {
      e?.addEventListener('click', _addQuantity, true);
    });
    document.querySelectorAll(minusClass).forEach((e) => {
      e?.addEventListener('click', _deleteQuantity, true);
    });

    document.querySelector('.js-saveParking')?.addEventListener('click', _saveParking, true);

    document.querySelector('.js-editParking')?.addEventListener('click', _editParking, true);

    document.querySelector('.js-close-modal-parking')?.addEventListener('click', _closeModalParking, true);

    _setInitTotal();
  };

  return {
    init: render,
  };
};
