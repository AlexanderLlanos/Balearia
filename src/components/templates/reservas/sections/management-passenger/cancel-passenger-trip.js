import MicroModal from 'micromodal';
import { useStore } from '../../../../../js/useStore';

export function CancelPassengerTrip() {
  const { getState, setState } = useStore;
  const { passengerManagement } = getState();

  document.querySelectorAll('.js-name_passenger-cancel-trip')?.forEach((e, index) => {
    e.innerHTML = passengerManagement.cancel_passenger_trip[index]?.name;
  });

  document.querySelectorAll('.js-type_passenger-cancel-trip')?.forEach((e, index) => {
    e.innerHTML = passengerManagement.cancel_passenger_trip[index]?.type;
  });

  document.querySelectorAll('.js-holder-cancel-trip')?.forEach((e, index) => {
    if (passengerManagement.cancel_passenger_trip[index]?.isHolder) {
      e.innerHTML = 'Titular de la reserva';
    }
  });

  const _setData = (id) => {
    if (id) {
      document.querySelector('.js-name_passenger-cancel-trip').value =
        passengerManagement.cancel_passenger_trip[id]?.name;
      document.querySelector('.js-type_passenger-cancel-trip').value = passengerManagement.add_asistant[id]?.type;
      document.querySelector('.js-type_passenger-cancel-trip').value = passengerManagement.add_asistant[id]?.isHolder;
      document.querySelector('.js-cancel-type').value = passengerManagement.add_asistant[id]?.cancel_motive;
    }
  };

  const _displayCancelPassengerTrip = (e) => {
    e.target
      .closest('.js-box-acomodations')
      ?.querySelector('.js-display-cancel-passenger-trip')
      ?.classList.toggle('active');

    let id = e.target.closest('.js-box-acomodations')?.dataset?.id;
    _setData(id);
  };

  // const _setData = (id) => {
  //   if (id) {
  //     document.querySelector('.js-cancel-type').value = passengerManagement.cancel_passenger_trip[id].cancel_motive;
  //   }
  // };

  const _getSelected = () => {
    let passengers = [];
    document.querySelectorAll('input[type=checkbox][name=cancel]').forEach((e) => {
      let id = e.closest('.js-box-acomodations')?.dataset?.id;

      let passengerData = {
        id: id,
        name: e.closest('.js-box-acomodations')?.querySelector('.js-name_passenger-cancel-trip')?.innerHTML,
        type: e.closest('.js-box-acomodations')?.querySelector('.js-type_passenger-cancel-trip')?.innerHTML,
        isHolder: e.closest('.js-box-acomodations')?.querySelector('.js-holder-cancel-trip')?.innerHTML,
        checked: e?.checked,
        cancel_motive: e.closest('.js-box-acomodations')?.querySelector('.js-cancel-type')?.value,
      };

      if (passengerData.checked) {
        passengers.push(passengerData);
      }
    });

    return passengers;
  };

  const _update = () => {
    setState({
      passengerManagement: {
        ...passengerManagement,
        cancel_passenger_trip: _getSelected(),
      },
    });

    MicroModal.close('modal-cambios-pasajero');
  };

  document.querySelectorAll('input[type=checkbox][name=cancel]').forEach((e) => {
    e.addEventListener('change', _displayCancelPassengerTrip);
  });

  document.querySelector('.js-modal-cancel-passenger-trip')?.addEventListener('click', _update, true);
}
