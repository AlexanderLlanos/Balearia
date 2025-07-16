import MicroModal from 'micromodal';
import { useStore } from '../../../../../js/useStore';

export function ChangeAcomodation() {
  const { getState, setState } = useStore;
  const { passengerManagement } = getState();

  const _setData = () => {
    if (document.querySelector('.js-acomodation-type-out')) {
      document.querySelector('.js-acomodation-type-out').innerHTML =
        passengerManagement.change_accomodation.outbound.name;
    }

    if (document.querySelector('.js-acomodation-type-in')) {
      document.querySelector('.js-acomodation-type-in').innerHTML =
        passengerManagement.change_accomodation.inbound.name;
    }

    if (document.querySelector('.js-acomodation-quantity-passenger-out')) {
      document.querySelector('.js-acomodation-quantity-passenger-out').innerHTML =
        passengerManagement.change_accomodation.outbound.quantity + ' pasajeros';
    }

    if (document.querySelector('.js-acomodation-quantity-passenger-in')) {
      document.querySelector('.js-acomodation-quantity-passenger-in').innerHTML =
        passengerManagement.change_accomodation.inbound.quantity + ' pasajeros';
    }

    if (document.querySelector('.js-acomodation-total-out')) {
      document.querySelector('.js-acomodation-total-out').innerHTML =
        passengerManagement.change_accomodation.outbound.price + ' €';
    }

    if (document.querySelector('.js-acomodation-total-in')) {
      document.querySelector('.js-acomodation-total-in').innerHTML =
        passengerManagement.change_accomodation.inbound.price + ' €';
    }
  };

  _setData();

  if (document.querySelectorAll("input[name='rbtnSeatOutbound']")) {
    document.querySelectorAll("input[name='rbtnSeatOutbound']").forEach((input) => {
      if (input?.value === passengerManagement?.change_accomodation?.outbound?.accId) {
        input.closest('.js-box-acomodations__card').classList.add('active');
        input.checked = true;
      } else {
        input.checked = false;
      }
    });
  }

  if (document.querySelectorAll("input[name='rbtnSeatInbound']")) {
    document.querySelectorAll("input[name='rbtnSeatInbound']").forEach((input) => {
      if (input?.value === passengerManagement?.change_accomodation?.inbound?.accId) {
        input.closest('.js-box-acomodations__card').classList.add('active');
        input.checked = true;
      } else {
        input.checked = false;
      }
    });
  }

  const _update = () => {
    try {
      document.querySelectorAll("input[name='rbtnSeatOutbound']").forEach((input) => {
        if (input?.checked === true) {
          passengerManagement.change_accomodation.outbound = {
            ...passengerManagement.change_accomodation.outbound,
            accId: input.value,
          };
        }
      });

      document.querySelectorAll("input[name='rbtnSeatInbound']").forEach((input) => {
        if (input?.checked === true) {
          passengerManagement.change_accomodation.inbound = {
            ...passengerManagement.change_accomodation.inbound,
            accId: input.value,
          };
        }
      });

      setState({
        passengerManagement: { ...passengerManagement },
      });

      MicroModal.close('modal-cambios-pasajeros-acomodaciones');
    } catch (error) {
      console.error('_initAcomodation', error);
    }
  };

  const _openAcomodations = (e) => {
    e.target.closest('.box-acomodations').querySelector('.js-box-acomodations-body')?.classList.toggle('active');
  };

  const _setActive = (e) => {
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

  document.querySelectorAll('.js-update-acomodations').forEach((e) => {
    e?.addEventListener('click', _openAcomodations, true);
  });

  document.querySelectorAll("input[name='rbtnSeatOutbound']").forEach((input) => {
    input.addEventListener('change', _setActive);
  });

  document.querySelectorAll("input[name='rbtnSeatInbound']").forEach((input) => {
    input.addEventListener('change', _setActive);
  });

  document.querySelector('.js-update-data-acomodations')?.addEventListener('click', _update, true);
}
