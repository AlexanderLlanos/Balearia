import { useStore } from '../../../../../js/useStore';

export function ChangeInbound() {
  const { getState, setState } = useStore;
  const { changeTrip } = getState();

  document.querySelector('.js-modal-cambios-viaje-destino-1').value = changeTrip.change_destiny.source;
  document.querySelector('.js-modal-cambios-viaje-destino-2').value = changeTrip.change_destiny.destiny;

  const _update = () => {
    setState({
      changeTrip: {
        ...changeTrip,
        change_destiny: {
          source: document.querySelector('.js-modal-cambios-viaje-destino-1')?.value,
          destiny: document.querySelector('.js-modal-cambios-viaje-destino-2')?.value,
        },
      },
    });
    console.log(getState().changeTrip.change_destiny);
    MicroModal.close('modal-cambios-viaje-destino');
  };

  document.querySelector('.js-update-cambios-viaje-destino')?.addEventListener('click', _update, true);
}
