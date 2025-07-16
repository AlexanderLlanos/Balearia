import home from './home/home.html';
import pack from './pack/pack.html';
import extras from './extras/extras.html';
import extrasAdded from './extras-added/extras-added.html';
import extrasMenu from './extras-menu/extras-menu.html';
import extrasPackAdded from './extras-pack-added/extras-pack-added.html';
import extrasPet from './extras-pet/extras-pet.html';
import acomodations from './acomodations/acomodations.html';
import acomodationsNoDispoCoche from './acomodations-no-dispo-coche/acomodations-no-dispo-coche.html';
import acomodationsDescuentoAplicado from './acomodations-descuento-aplicado/acomodations-descuento-aplicado.html';
import confirmation from './confirmation/confirmation.html';
import confirmationCheck from './confirmation-check/confirmation-check.html';
import confirmationSend from './confirmation-send/confirmation-send.html';
import checkoutReserva from './checkout-reserva/checkout-reserva.html';
import checkoutPasajeros from './checkout-pasajeros/checkout-pasajeros.html';
import checkoutMascotas from './checkout-mascotas/checkout-mascotas.html';
import checkoutVehiculos from './checkout-vehiculos/checkout-vehiculos.html';
import checkoutPagoCodigo from './checkout-pago-codigo/checkout-pago-codigo.html';
import checkoutPagoCredito from './checkout-pago-credito/checkout-pago-credito.html';
import checkoutPagoCodigoInsertado from './checkout-pago-codigo-insertado/checkout-pago-codigo-insertado.html';
import checkoutPreReserva from './checkout-prereserva/checkout-prereserva.html';
import checkoutPreReservaSinAntelacion from './checkout-prereserva-sin-antelacion/checkout-prereserva-sin-antelacion.html';
import managementDashboard from './management-dashboard/management-dashboard.html';
import managementOfferDetail from './management-offer-detail/management-offer-detail.html';
import managementAgent from './management-agent/management-agent.html';
import managementAdmin from './management-admin/management-admin.html';
import managementAgentDate from './management-agent-date/management-agent-date.html';
import managementHelp from './management-help/management-help.html';
import managementHelpBookings from './management-help-bookings/management-help-bookings.html';
import managementHelpAnnulment from './management-help-annulment/management-help-annulment.html';
import managementHelpChange from './management-help-change/management-help-change.html';
import managementContact from './management-contact/management-contact.html';
import managementFavoriteRoutes from './management-favorite-routes/management-favorite-routes.html';
import managementConfirmed from './management-confirmed/management-confirmed.html';
import managementPreBooking from './management-pre-booking/management-pre-booking.html';
import managementCheckoutPassenger from './management-checkout-passenger/management-checkout-passenger.html';
import managementCheckoutPayment from './management-checkout-payment/management-checkout-payment.html';
import managementCheckoutGroup from './management-checkout-group/management-checkout-group.html';
import managementRelease from './management-release/management-release.html';
import managementReleaseDetail from './management-release-detail/management-release-detail.html';
import managementLogin from './management-login/management-login.html';

export default {
  title: 'Templates B2B',
};

export const Home = () => home;
Home.story = {
  parameters: {
    storyDescription: 'home template',
    storySource: {
      source: home,
    },
  },
};

export const Pack = () => pack;
Pack.story = {
  parameters: {
    storyDescription: 'pack template',
    storySource: {
      source: pack,
    },
  },
};

export const Extras = () => extras;
Extras.story = {
  parameters: {
    storyDescription: 'extras template',
    storySource: {
      source: extras,
    },
  },
};

export const ExtrasAdded = () => extrasAdded;
ExtrasAdded.story = {
  parameters: {
    storyDescription: 'extras added template',
    storySource: {
      source: extrasAdded,
    },
  },
};

export const ExtrasMenu = () => extrasMenu;
ExtrasMenu.story = {
  parameters: {
    storyDescription: 'extras menu template',
    storySource: {
      source: extrasMenu,
    },
  },
};

export const ExtrasPackAdded = () => extrasPackAdded;
ExtrasPackAdded.story = {
  parameters: {
    storyDescription: 'extras pack added',
    storySource: {
      source: extrasPackAdded,
    },
  },
};

export const ExtrasPet = () => extrasPet;
ExtrasPet.story = {
  parameters: {
    storyDescription: 'extras mascotas',
    storySource: {
      source: extrasPet,
    },
  },
};

export const Acomodations = () => acomodations;
Acomodations.story = {
  parameters: {
    storyDescription: 'Acomodations template',
    storySource: {
      source: acomodations,
    },
  },
};

export const AcomodationsNoDispoCoche = () => acomodationsNoDispoCoche;
AcomodationsNoDispoCoche.story = {
  parameters: {
    storyDescription: 'acomodation no dispo coche template',
    storySource: {
      source: acomodationsNoDispoCoche,
    },
  },
};

export const AcomodationsDescuentoAplicado = () => acomodationsDescuentoAplicado;
AcomodationsDescuentoAplicado.story = {
  parameters: {
    storyDescription: 'acomodation descuento aplicado template',
    storySource: {
      source: acomodationsDescuentoAplicado,
    },
  },
};

export const Confirmation = () => confirmation;
Confirmation.story = {
  parameters: {
    storyDescription: 'confirmation',
    storySource: {
      source: Confirmation,
    },
  },
};

export const ConfirmationCheck = () => confirmationCheck;
ConfirmationCheck.story = {
  parameters: {
    storyDescription: 'confirmation check',
    storySource: {
      source: ConfirmationCheck,
    },
  },
};

export const ConfirmationSend = () => confirmationSend;
ConfirmationSend.story = {
  parameters: {
    storyDescription: 'confirmation send',
    storySource: {
      source: ConfirmationSend,
    },
  },
};

export const CheckoutReserva = () => checkoutReserva;
CheckoutReserva.story = {
  parameters: {
    storyDescription: 'checkout reserva',
    storySource: {
      source: CheckoutReserva,
    },
  },
};

export const CheckoutPasajeros = () => checkoutPasajeros;
CheckoutPasajeros.story = {
  parameters: {
    storyDescription: 'checkout pasajeros',
    storySource: {
      source: CheckoutPasajeros,
    },
  },
};

export const CheckoutMascotas = () => checkoutMascotas;
CheckoutMascotas.story = {
  parameters: {
    storyDescription: 'checkout mascotas',
    storySource: {
      source: CheckoutMascotas,
    },
  },
};

export const CheckoutVehiculos = () => checkoutVehiculos;
CheckoutVehiculos.story = {
  parameters: {
    storyDescription: 'checkout vehículos',
    storySource: {
      source: CheckoutVehiculos,
    },
  },
};

export const CheckoutPagoCredito = () => checkoutPagoCredito;
CheckoutPagoCredito.story = {
  parameters: {
    storyDescription: 'checkout pago crédito',
    storySource: {
      source: CheckoutPagoCredito,
    },
  },
};

export const CheckoutPagoCodigo = () => checkoutPagoCodigo;
CheckoutPagoCodigo.story = {
  parameters: {
    storyDescription: 'checkout pago código',
    storySource: {
      source: CheckoutPagoCodigo,
    },
  },
};

export const CheckoutPagoCodigoInsertado = () => checkoutPagoCodigoInsertado;
CheckoutPagoCodigoInsertado.story = {
  parameters: {
    storyDescription: 'checkout pago código insertado',
    storySource: {
      source: CheckoutPagoCodigoInsertado,
    },
  },
};

export const CheckoutPreReserva = () => checkoutPreReserva;
CheckoutPreReserva.story = {
  parameters: {
    storyDescription: 'checkout pre reserva',
    storySource: {
      source: CheckoutPreReserva,
    },
  },
};

export const CheckoutPreReservaSinAntelacion = () => checkoutPreReservaSinAntelacion;
CheckoutPreReservaSinAntelacion.story = {
  parameters: {
    storyDescription: 'checkout pre reserva sin antelación',
    storySource: {
      source: CheckoutPreReservaSinAntelacion,
    },
  },
};

export const ManagementDashboard = () => managementDashboard;
ManagementDashboard.story = {
  parameters: {
    storyDescription: 'zona de gestion deshboard',
    storySource: {
      source: ManagementDashboard,
    },
  },
};

export const ManagementOfferDetail = () => managementOfferDetail;
ManagementOfferDetail.story = {
  parameters: {
    storyDescription: 'zona de gestion deshboard detalle de la oferta',
    storySource: {
      source: ManagementOfferDetail,
    },
  },
};

export const ManagementAgent = () => managementAgent;
ManagementAgent.story = {
  parameters: {
    storyDescription: 'cuenta agente',
    storySource: {
      source: ManagementAgent,
    },
  },
};

export const ManagementAdmin = () => managementAdmin;
ManagementAdmin.story = {
  parameters: {
    storyDescription: 'cuenta administrador',
    storySource: {
      source: ManagementAdmin,
    },
  },
};

export const ManagementAgentDate = () => managementAgentDate;
ManagementAgentDate.story = {
  parameters: {
    storyDescription: 'mis datos de agencia',
    storySource: {
      source: ManagementAgentDate,
    },
  },
};

export const ManagementHelp = () => managementHelp;
ManagementHelp.story = {
  parameters: {
    storyDescription: 'Centro de ayuda',
    storySource: {
      source: ManagementHelp,
    },
  },
};

export const ManagementHelpBookings = () => managementHelpBookings;
ManagementHelpBookings.story = {
  parameters: {
    storyDescription: 'Centro de ayuda mis reservas',
    storySource: {
      source: ManagementHelpBookings,
    },
  },
};

export const ManagementHelpAnnulment = () => managementHelpAnnulment;
ManagementHelpAnnulment.story = {
  parameters: {
    storyDescription: 'Centro de ayuda Anulaciones y cambios',
    storySource: {
      source: ManagementHelpAnnulment,
    },
  },
};

export const ManagementHelpChange = () => managementHelpChange;
ManagementHelpChange.story = {
  parameters: {
    storyDescription: 'Centro de ayuda Cambiar las fechas de mi viaje',
    storySource: {
      source: ManagementHelpChange,
    },
  },
};

export const ManagementContact = () => managementContact;
ManagementContact.story = {
  parameters: {
    storyDescription: 'Centro de ayuda Contacto comercial',
    storySource: {
      source: ManagementContact,
    },
  },
};

export const ManagementFavoriteRoutes = () => managementFavoriteRoutes;
ManagementFavoriteRoutes.story = {
  parameters: {
    storyDescription: 'Centro de ayuda Mis rutas favoritas',
    storySource: {
      source: ManagementFavoriteRoutes,
    },
  },
};

export const ManagementConfirmed = () => managementConfirmed;
ManagementConfirmed.story = {
  parameters: {
    storyDescription: 'Minorista confirmada',
    storySource: {
      source: ManagementConfirmed,
    },
  },
};

export const ManagementPreBooking = () => managementPreBooking;
ManagementPreBooking.story = {
  parameters: {
    storyDescription: 'Minorista pre reserva',
    storySource: {
      source: ManagementPreBooking,
    },
  },
};

export const ManagementCheckoutPassenger = () => managementCheckoutPassenger;
ManagementCheckoutPassenger.story = {
  parameters: {
    storyDescription: 'Prepago checkout confirmar reserva',
    storySource: {
      source: ManagementCheckoutPassenger,
    },
  },
};

export const ManagementCheckoutPayment = () => managementCheckoutPayment;
ManagementCheckoutPayment.story = {
  parameters: {
    storyDescription: 'Prepago checkout confirmar reserva pago',
    storySource: {
      source: ManagementCheckoutPayment,
    },
  },
};

export const ManagementCheckoutGroup = () => managementCheckoutGroup;
ManagementCheckoutGroup.story = {
  parameters: {
    storyDescription: 'Prepago checkout confirmar grupo',
    storySource: {
      source: ManagementCheckoutGroup,
    },
  },
};

export const ManagementRelease = () => managementRelease;
ManagementRelease.story = {
  parameters: {
    storyDescription: 'Comunicados',
    storySource: {
      source: ManagementRelease,
    },
  },
};

export const ManagementReleaseDetail = () => managementReleaseDetail;
ManagementReleaseDetail.story = {
  parameters: {
    storyDescription: 'Comunicados ficha',
    storySource: {
      source: ManagementReleaseDetail,
    },
  },
};

export const ManagementLogin = () => managementLogin;
ManagementLogin.story = {
  parameters: {
    storyDescription: 'Login',
    storySource: {
      source: ManagementLogin,
    },
  },
};
