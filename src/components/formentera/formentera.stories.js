import home from './home/home.html';
import checkout from './checkout/checkout.html';
import checkoutPayment from './checkout-payment/checkout-payment.html';
import checkoutConfirmation from './checkout-confirmation/checkout-confirmation.html';
import checkoutResident from './checkout-resident/checkout-resident.html';
import extras from './extras/extras.html';
import managementReserve from './management-reserve/management-reserve.html';

export default {
  title: 'Formentera',
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

export const Checkout = () => checkout;
Checkout.story = {
  parameters: {
    storyDescription: 'checkout template',
    storySource: {
      source: checkout,
    },
  },
};

export const CheckoutPayment = () => checkoutPayment;
CheckoutPayment.story = {
  parameters: {
    storyDescription: 'checkout pago template',
    storySource: {
      source: checkoutPayment,
    },
  },
};

export const CheckoutConfirmation = () => checkoutConfirmation;
CheckoutConfirmation.story = {
  parameters: {
    storyDescription: 'checkout pago template',
    storySource: {
      source: checkoutConfirmation,
    },
  },
};

export const CheckoutResident = () => checkoutResident;
CheckoutResident.story = {
  parameters: {
    storyDescription: 'checkout pago template',
    storySource: {
      source: checkoutResident,
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

export const ManagementReserve = () => managementReserve;
ManagementReserve.story = {
  parameters: {
    storyDescription: 'gestion reserva template',
    storySource: {
      source: managementReserve,
    },
  },
};
