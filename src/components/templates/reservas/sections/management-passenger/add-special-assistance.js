import MicroModal from 'micromodal';
import { useStore } from '../../../../../js/useStore';

export function AddSpecialAssistance() {
  const { getState, setState } = useStore;
  const { passengerManagement } = getState();

  if (document.querySelectorAll('.js-name_passenger')) {
    document.querySelectorAll('.js-name_passenger')?.forEach((e, index) => {
      e.innerHTML = passengerManagement?.add_asistant[index]?.name;
    });
  }

  const _displaySpecialAsistance = (e) => {
    e.target
      .closest('.js-box-acomodations')
      ?.querySelector('.js-display-special-asistance')
      ?.classList.toggle('active');

    let id = e.target.closest('.js-box-acomodations')?.dataset?.id;
    _setData(id);
  };

  const _setData = (id) => {
    if (id) {
      document.querySelector('.js-type-asistence').value = passengerManagement.add_asistant[id].asistant_type;
      document.querySelector('.js-type-asistence2').value = passengerManagement.add_asistant[id].asistant_type2;
      document.querySelector('.js-affiliate-number').value = passengerManagement.add_asistant[id].afilation_number;
    }
  };

  const _getSelected = () => {
    let passengers = [];
    document.querySelectorAll('input[type=checkbox][name=asistance]:checked').forEach((e) => {
      let id = e.closest('.js-box-acomodations')?.dataset?.id;

      let passengerData = {
        id: id,
        name: e.closest('.js-box-acomodations').querySelector('.js-name_passenger').innerHTML,
        checked: true,
        asistant_type: e.closest('.js-box-acomodations').querySelector('.js-type-asistence').value,
        asistant_type2: e.closest('.js-box-acomodations').querySelector('.js-type-asistence2').value,
        afilation_number: e.closest('.js-box-acomodations').querySelector('.js-affiliate-number').value,
      };
      passengers.push(passengerData);
    });

    return passengers;
  };

  const _update = () => {
    setState({
      passengerManagement: {
        ...passengerManagement,
        add_asistant: _getSelected(),
      },
    });

    MicroModal.close('modal-cambios-añadir-asistencia');
  };

  document.querySelectorAll('input[type=checkbox][name=asistance]').forEach((e) => {
    e.addEventListener('change', _displaySpecialAsistance);
  });

  document.querySelector('.js-modal-cambios-asistencia-especial')?.addEventListener('click', _update, true);
}
