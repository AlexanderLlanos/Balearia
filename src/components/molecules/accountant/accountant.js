import MicroModal from 'micromodal';

const disabled = (nro, event) => {
  if (Number(nro.querySelector('.nro').textContent) <= 0) {
    nro.querySelector('.delete').disabled = true;
    event?.target.closest('.g-accountant--item')?.classList.remove('active');
  }

  if (Number(nro.querySelector('.nro').textContent) > 0) {
    nro.querySelector('.delete').disabled = false;
    event?.target.closest('.g-accountant--item')?.classList.add('active');
  }
};

const _displayHeader = (count, price) => {
  try {
    document.querySelector('.btn-disabled').disabled = count > 0 ? false : true;
    let displayNro = document.querySelector('.btn--shopping__nro');
    let displayMount = document.querySelector('.btn-disabled');
    displayNro.innerHTML = count;
    if (count > 0) {
      const price_string = price.toFixed(2).replace('.', ',');
      displayMount.innerHTML = 'Ver pedido ' + price_string + ' €';
    } else {
      displayMount.innerHTML = 'Sin pedidos';
    }

    document.querySelectorAll('.js-icon-active').forEach((e) => {
      if (count > 0) {
        e.classList.add('active');
      } else {
        e.classList.remove('active');
      }
    });
    document.querySelectorAll('.js-icon-rest').forEach((e) => {
      if (count > 0) {
        e.classList.add('u-text--secondary');
      } else {
        e.classList.remove('u-text--secondary');
      }
    });
  } catch (error) {}
};

const _displayBtnModal = (count, price) => {
  try {
    document.querySelector('.btn-disabled-modal').disabled = count > 0 ? false : true;
    let displayBtnModal = document.querySelector('.btn-disabled-modal');
    const price_string = price.toFixed(2).replace('.', ',');

    displayBtnModal.innerHTML = 'Añadir al pedido por ' + price_string + ' €';
  } catch (error) {}
};

const _addCountModal = (e) => {
  let countModal = 0;
  let priceModal = 0.0;
  const listModal = document.querySelectorAll('.js-rest-modal');
  let modal = Array.from(listModal);

  if (modal) {
    modal.forEach((item) => {
      if (+item.innerHTML > 0) {
        let aux_count = parseFloat(item.innerHTML);
        let aux_price = +item.dataset.price;
        let subTotal = aux_count * aux_price;
        countModal = countModal + aux_count;
        priceModal = priceModal + subTotal;
      }
      _displayHeader(countModal, priceModal);
      MicroModal.close('modal-detalle-comida');
    });
  }
};

const _displayMenuOnbord = (price) => {
  try {
    if (price > 0) {
      document.getElementById('addMenu').disabled = false;
    } else {
      document.getElementById('addMenu').disabled = true;
    }
    let priceDisplay = document.querySelector('.js-total-menu');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  } catch (error) {}
};

const _displayParking = (price) => {
  try {
    if (price > 0) {
      document.getElementById('bottonParking').disabled = false;
    } else {
      document.getElementById('bottonParking').disabled = true;
    }
    let priceDisplay = document.querySelector('.js-total-parking');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  } catch (error) {}
};

const _displayBus = (price) => {
  try {
    if (price > 0) {
      document.getElementById('bottonBus').disabled = false;
    } else {
      document.getElementById('bottonBus').disabled = true;
    }
    let priceDisplay = document.querySelector('.js-total-bus');
    let price_string = price.toFixed(2).replace('.', ',');
    priceDisplay.innerHTML = price_string;
  } catch (error) {}
};

const accountant = (event, nro, type) => {
  event.preventDefault();
  event.stopPropagation();
  nro.querySelector('.nro').textContent =
    type == 'add'
      ? Number(nro.querySelector('.nro').textContent) + 1
      : Number(nro.querySelector('.nro').textContent) - 1;
  disabled(nro, event);

  let price = 0.0;
  let priceBus = 0.0;
  let priceParking = 0.0;
  const item_nro = document.querySelectorAll('.g-accountant--item__nro');
  item_nro.forEach((nroList) => {
    const list = nroList.querySelectorAll('.nro');
    let otherAVList = Array.from(list);
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (+item.innerHTML) {
          let aux_price = parseFloat(item.innerHTML);
          price = price + aux_price;
        }
      });
      _displayMenuOnbord(price * 6);
    }
  });

  const item_nro_parking = document.querySelectorAll('.g-accountant--item__nro');
  item_nro_parking.forEach((nroList) => {
    const list = nroList.querySelectorAll('.js-parking');
    let otherAVList = Array.from(list);
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (+item.innerHTML) {
          let aux_price = parseFloat(item.innerHTML);
          priceParking = priceBus + aux_price;
        }
      });
      _displayParking(priceParking * 7);
    }
  });

  const item_nro_bus = document.querySelectorAll('.g-accountant--item__nro');
  item_nro_bus.forEach((nroList) => {
    const list = nroList.querySelectorAll('.js-bus');
    let otherAVList = Array.from(list);
    if (otherAVList) {
      otherAVList.forEach((item) => {
        if (+item.innerHTML) {
          let aux_price = parseFloat(item.innerHTML);
          priceBus = priceBus + aux_price;
        }
      });
      _displayBus(priceBus * 7);
    }
  });

  if (document.querySelector('.js-total-accountant')) {
    if (nro.querySelector('.nro').textContent == 0) {
      event.target.closest('.js-list-accountant').querySelector('.js-btn-add-items')?.classList?.remove('u-no-display');
      event.target.closest('.js-add-items')?.classList?.toggle('u-no-display');
    }
  }
};

const init = () => {
  try {
    const item_nro = document.querySelectorAll('.g-accountant--item__nro');
    item_nro.forEach((nro) => {
      nro ? disabled(nro) : null;
      nro.querySelector('.add').addEventListener(
        'click',
        function (event) {
          accountant(event, nro, 'add');
        },
        false,
      );
      nro.querySelector('.delete').addEventListener(
        'click',
        function (event) {
          accountant(event, nro, 'delete');
        },
        false,
      );
    });
    document.querySelector('.btn-disabled-modal')?.addEventListener('click', _addCountModal, true);
  } catch (error) {}
};

export default init;
