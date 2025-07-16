import login from './login/login.html';
import dashboard from './dashboard/dashboard.html';
import dashboardShopping from './dashboard-shopping/dashboard-shopping.html';
import dashboardWsp from './dashboard-wsp/dashboard-wsp.html';
import dashboardDigital from './dashboard-digital/dashboard-digital.html';
import dashboardRestaurante from './dashboard-restaurante/dashboard-restaurante.html';
import dashboardRestauranteCheckout from './dashboard-restaurante-checkout/dashboard-restaurante-checkout.html';
import dashboardRestauranteWifi from './dashboard-restaurante-wifi/dashboard-restaurante-wifi.html';
import webviews from './webviews/webviews.html';
import dashboardPet from './dashboard-pet/dashboard-pet.html';

export default {
  title: 'Templates Exp',
};

export const Login = () => login;
Login.story = {
  parameters: {
    storyDescription: 'login template',
    storySource: {
      source: login,
    },
  },
};

export const Dashboard = () => dashboard;
Dashboard.story = {
  parameters: {
    storyDescription: 'dashboard template',
    storySource: {
      source: dashboard,
    },
  },
};

export const DashboardShopping = () => dashboardShopping;
DashboardShopping.story = {
  parameters: {
    storyDescription: 'dashboard shopping template',
    storySource: {
      source: dashboardShopping,
    },
  },
};

export const DashboardWsp = () => dashboardWsp;
DashboardWsp.story = {
  parameters: {
    storyDescription: 'dashboard wsp template',
    storySource: {
      source: dashboardWsp,
    },
  },
};

export const DashboardDigital = () => dashboardDigital;
DashboardDigital.story = {
  parameters: {
    storyDescription: 'dashboard digital template',
    storySource: {
      source: dashboardDigital,
    },
  },
};

export const DashboardRestaurante = () => dashboardRestaurante;
DashboardRestaurante.story = {
  parameters: {
    storyDescription: 'dashboard restaurante template',
    storySource: {
      source: dashboardRestaurante,
    },
  },
};

export const DashboardRestauranteCheckout = () => dashboardRestauranteCheckout;
DashboardRestauranteCheckout.story = {
  parameters: {
    storyDescription: 'dashboard restaurante checkout template',
    storySource: {
      source: dashboardRestauranteCheckout,
    },
  },
};

export const DashboardRestauranteWifi = () => dashboardRestauranteWifi;
DashboardRestauranteWifi.story = {
  parameters: {
    storyDescription: 'dashboard restaurante wifi template',
    storySource: {
      source: dashboardRestauranteWifi,
    },
  },
};

export const Webviews = () => webviews;
Webviews.story = {
  parameters: {
    storyDescription: 'webviews externos',
    storySource: {
      source: webviews,
    },
  },
};

export const DashboardPet = () => dashboardPet;
DashboardPet.story = {
  parameters: {
    storyDescription: 'dashboard mascotas',
    storySource: {
      source: dashboardPet,
    },
  },
};
