import MicroModal from 'micromodal';
import { useStore } from '../../../../../js/useStore';

export function AddPassenger() {
  const { getState, setState } = useStore;
  const { passengerManagement } = getState();

  document.querySelector('.js-quantity-babies').innerHTML = passengerManagement.add_passenger.babies;
  document.querySelector('.js-quantity-adults').innerHTML = passengerManagement.add_passenger.adults;
  document.querySelector('.js-quantity-children').innerHTML = passengerManagement.add_passenger.children;

  const _update = () => {
    setState({
      passengerManagement: {
        ...passengerManagement,
        add_passenger: {
          babies: document.querySelector('.js-quantity-babies').innerHTML,
          adults: document.querySelector('.js-quantity-adults').innerHTML,
          children: document.querySelector('.js-quantity-children').innerHTML,
        },
      },
    });

    MicroModal.close('modal-cambios-añadir-pasajeros');
  };

  document.querySelector('.js-update-add-passenger')?.addEventListener('click', _update, true);
}
