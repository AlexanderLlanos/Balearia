import { useStore } from '../../../../../js/useStore';

export function ChangeOutbound() {
  const { getState, setState } = useStore;
  const { changeTrip } = getState();

  document.querySelector('.js-modal-cambios-viaje-origen-1').value = changeTrip.change_source.source;
  document.querySelector('.js-modal-cambios-viaje-origen-2').value = changeTrip.change_source.destiny;

  const _update = () => {
    setState({
      changeTrip: {
        ...changeTrip,
        change_source: {
          source: document.querySelector('.js-modal-cambios-viaje-origen-1')?.value,
          destiny: document.querySelector('.js-modal-cambios-viaje-origen-2')?.value,
        },
      },
    });

    MicroModal.close('modal-cambios-viaje-origen');
  };

  document.querySelector('.js-update-cambios-viaje-origen')?.addEventListener('click', _update, true);
}
