import { useStore } from '../../../../../js/useStore';

export function ContactData() {
  const { getState, setState } = useStore;
  const { contactData } = getState();

  document.querySelector('.js-email-cambios-contacto').value = contactData.email;
  document.querySelector('.js-code-cambios-contacto').value = contactData.code;
  document.querySelector('.js-phone-cambios-contacto').value = contactData.phone;

  const _update = () => {
    setState({
      contactData: {
        email: document.querySelector('.js-email-cambios-contacto')?.value,
        code: document.querySelector('.js-code-cambios-contacto')?.value,
        phone: document.querySelector('.js-phone-cambios-contacto')?.value,
      },
    });

    MicroModal.close('modal-cambios-contacto');
  };

  document.querySelector('.js-update-cambios-contacto')?.addEventListener('click', _update, true);
}
