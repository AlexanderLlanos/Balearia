import bookingConfirmation from './booking-confirmation/booking-confirmation.html';
import bookingConfirmationIda from './booking-confirmation-ida/booking-confirmation-ida.html';
import bookingConfirmationIdaVuelta from './booking-confirmation-ida-vuelta/booking-confirmation-ida-vuelta.html';
import bookingReservas from './booking-reservas/booking-reservas.html';
import bookingDetalle from './booking-detalle/booking-detalle.html';
import bookingCheckIn from './booking-check-in/booking-check-in.html';
import bookingResumen from './booking-resumen/booking-resumen.html';
export default {
  title: 'MVP Check In',
};

export const BookingConfirmation = () => bookingConfirmation;
BookingConfirmation.story = {
  parameters: {
    storyDescription: 'Booking Confirmacion',
    storySource: {
      source: BookingConfirmation,
    },
  },
};

export const BookingConfirmationIda = () => bookingConfirmationIda;
BookingConfirmationIda.story = {
  parameters: {
    storyDescription: 'Booking Confirmacion Ida',
    storySource: {
      source: BookingConfirmationIda,
    },
  },
};

export const BookingConfirmationIdaVuelta = () => bookingConfirmationIdaVuelta;
BookingConfirmationIdaVuelta.story = {
  parameters: {
    storyDescription: 'Booking Confirmacion Ida Vuelta',
    storySource: {
      source: BookingConfirmationIdaVuelta,
    },
  },
};

export const BookingReservas = () => bookingReservas;
BookingReservas.story = {
  parameters: {
    storyDescription: 'Booking Reservas',
    storySource: {
      source: BookingReservas,
    },
  },
};

export const BookingDetalle = () => bookingDetalle;
BookingDetalle.story = {
  parameters: {
    storyDescription: 'Booking Detalles',
    storySource: {
      source: BookingDetalle,
    },
  },
};

export const BookingCheckIn = () => bookingCheckIn;
BookingCheckIn.story = {
  parameters: {
    storyDescription: 'Booking check in',
    storySource: {
      source: BookingCheckIn,
    },
  },
};

export const BookingResumen = () => bookingResumen;
BookingResumen.story = {
  parameters: {
    storyDescription: 'Booking resumen',
    storySource: {
      source: BookingResumen,
    },
  },
};