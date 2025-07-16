import Litepicker from 'litepicker';
import moment from 'moment';

const init = () => {
  const route_dropdown = document.querySelector('.js-route_dropdown');
  const route_dropdown_mb = document.querySelector('.js-route_dropdown_mb');
  const calendar_dropdown = document.querySelector('.js-calendar_dropdown');
  const passenger_dropdown = document.querySelector('.js-passenger_dropdown');
  const passenger_dropdown_mb = document.querySelector('.js-passenger_dropdown_mb');
  const calendar_dropdown_second = document.querySelector('.js-calendar_dropdown_second');
  let picker;
  let picker_mb;

  const minDate = new Date().setDate(new Date().getDate() - 1);
  const clean = (type) => {
    try {
      type == 'route' ? null : route_dropdown.classList.remove('active');
      type == 'calendar' ? null : calendar_dropdown.classList.remove('active');
      type == 'passenger' ? null : passenger_dropdown.classList.remove('active');
      type == 'mascot' ? null : mascot_dropdown.classList.remove('active');
      type == 'calendar_second' ? null : calendar_dropdown_second.classList.remove('active');
    } catch (error) { }
  };

  const route = () => {
    route_dropdown.classList.add('active');
  };

  const routeList = (ev, route_list_class) => {
    const start = ev.currentTarget.querySelector('.item').querySelector('.start').querySelector('.city');
    const end = ev.currentTarget.querySelector('.item').querySelector('.end').querySelector('.city');
    if (route_list_class == 'route-list') {
      document.querySelector('.js-route_input').value = start.textContent + ' - ' + end.textContent;
      document.querySelector('.js-route_input_mb').value = start.textContent + ' - ' + end.textContent;
      calendar();
    } else {
      document.querySelector('.js-route_input_second').value = start.textContent + ' - ' + end.textContent;
      calendarSecond();
    }
  };

  const calendar = () => {
    calendar_dropdown?.classList.add('active');
    picker?.show();
  };

  const calendarSecond = () => {
    calendar_dropdown_second.classList.add('active');
  };

  const passenger = () => {
    passenger_dropdown?.classList.add('active');
    passenger_dropdown_mb?.classList.add('active');

    document.querySelector('.js-passenger_bonus_click').addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector('.js-passenger_list').classList.remove('u-d-block');
        document.querySelector('.js-passenger_list').classList.add('u-d-none');
        document.querySelector('.js-passenger_bonus').classList.add('u-d-block');
        document.querySelector('.js-passenger_bonus').classList.remove('u-d-none');
      },
      false,
    );

    document.querySelector('.js-passenger_bonus_click_mb').addEventListener(
      'click',
      function (event) {
        document.querySelector('.js-passenger_list_mb').classList.remove('u-d-block');
        document.querySelector('.js-passenger_list_mb').classList.add('u-d-none');
        document.querySelector('.js-passenger_bonus_mb').classList.add('u-d-block');
        document.querySelector('.js-passenger_bonus_mb').classList.remove('u-d-none');
      },
      false,
    );

    document
      .querySelector('.js-passenger_bonus')
      .querySelector('ul')
      .querySelectorAll('.item')
      .forEach((e) =>
        e.addEventListener(
          'click',
          function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.js-passenger_bonus').classList.remove('u-d-block');
            document.querySelector('.js-passenger_bonus').classList.add('u-d-none');
            document.querySelector('.js-passenger_list').classList.add('u-d-block');
            document.querySelector('.js-passenger_list').classList.remove('u-d-none');
            document.querySelector('.js-passenger_bonus_text').classList.add('u-d-block');
            document.querySelector('.js-passenger_bonus_text').classList.remove('u-d-none');
            document.querySelector('.js-passenger_bonus_click').classList.remove('u-d-block');
            document.querySelector('.js-passenger_bonus_click').classList.add('u-d-none');
            document.querySelector('.js-passenger_text').textContent =
              event.currentTarget.querySelector('label').textContent;
          },
          false,
        ),
      );

    document
      .querySelector('.js-passenger_bonus_mb')
      .querySelector('ul')
      .querySelectorAll('.item')
      .forEach((e) =>
        e.addEventListener(
          'click',
          function (event) {
            document.querySelector('.js-passenger_bonus_mb').classList.remove('u-d-block');
            document.querySelector('.js-passenger_bonus_mb').classList.add('u-d-none');
            document.querySelector('.js-passenger_list_mb').classList.add('u-d-block');
            document.querySelector('.js-passenger_list_mb').classList.remove('u-d-none');
            document.querySelector('.js-passenger_bonus_text_mb').classList.add('u-d-block');
            document.querySelector('.js-passenger_bonus_text_mb').classList.remove('u-d-none');
            document.querySelector('.js-passenger_bonus_click_mb').classList.remove('u-d-block');
            document.querySelector('.js-passenger_bonus_click_mb').classList.add('u-d-none');
          },
          false,
        ),
      );

    document.querySelector('.js-edit_bonus').addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      document.querySelector('.js-passenger_list').classList.remove('u-d-block');
      document.querySelector('.js-passenger_list').classList.add('u-d-none');
      document.querySelector('.js-passenger_bonus').classList.add('u-d-block');
      document.querySelector('.js-passenger_bonus').classList.remove('u-d-none');
    });

    document.querySelector('.js-edit_bonus_mb').addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      document.querySelector('.js-passenger_list_mb').classList.remove('u-d-block');
      document.querySelector('.js-passenger_list_mb').classList.add('u-d-none');
      document.querySelector('.js-passenger_bonus_mb').classList.add('u-d-block');
      document.querySelector('.js-passenger_bonus_mb').classList.remove('u-d-none');
    });

    /****  back passenger  ****/

    document.querySelectorAll('.js-click_back').forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          let passenger_bonus = document.querySelector('.js-passenger_bonus');
          let passenger_list = document.querySelector('.js-passenger_list');
          passenger_bonus.classList.remove('u-d-block');
          passenger_bonus.classList.add('u-d-none');
          passenger_list.classList.add('u-d-block');
          passenger_list.classList.remove('u-d-none');
        },
        false,
      ),
    );

    document.querySelectorAll('.js-click_back_mb').forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          let passenger_bonus_mb = document.querySelector('.js-passenger_bonus_mb');
          let passenger_list_mb = document.querySelector('.js-passenger_list_mb');
          passenger_bonus_mb.classList.remove('u-d-block');
          passenger_bonus_mb.classList.add('u-d-none');
          passenger_list_mb.classList.add('u-d-block');
          passenger_list_mb.classList.remove('u-d-none');
        },
        false,
      ),
    );

    /****  back passenger  ****/

    document.querySelector('.js-passenger_confirm').addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        const array_nro = [];
        document
          .querySelector('.js-passenger_list')
          .querySelector('.g-accountant')
          .querySelectorAll('.g-accountant--item')
          .forEach((e) =>
            array_nro.push(Number(e.querySelector('.g-accountant--item__nro').querySelector('.nro').textContent)),
          );
        let total = array_nro.reduce((a, b) => Number(a) + Number(b), 0);
        /* Valida que el total de pasajeros se mayor a 0 */
        if (Number(total) > 0) {
          document.querySelector('.js-passenger_input').value = total + ' pasajero' + (Number(total) > 1 ? 's' : '');
          passenger_dropdown.classList.remove('active');
          passenger_dropdown_mb.classList.remove('active');
        }
      },
      false,
    );

    document.querySelector('.js-passenger_confirm_mb').addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        passenger_dropdown_mb.classList.remove('active');
        const array_nro = [];
        document
          .querySelector('.js-passenger_list_mb')
          .querySelector('.g-accountant')
          .querySelectorAll('.g-accountant--item')
          .forEach((e) =>
            array_nro.push(Number(e.querySelector('.g-accountant--item__nro').querySelector('.nro').textContent)),
          );
        let total = array_nro.reduce((a, b) => Number(a) + Number(b), 0);
        /* Valida que el total de pasajeros se mayor a 0 */
        if (Number(total) > 0) {
          document.querySelector('.js-passenger_input_mb').value = total + ' pasajero' + (Number(total) > 1 ? 's' : '');
          passenger_dropdown_mb.classList.remove('active');
        }
      },
      false,
    );

    document.querySelector('.js-passenger_cancel').addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector('.js-passenger_input').value = '';
        passenger_dropdown.classList.remove('active');
        passenger_dropdown_mb.classList.remove('active');
      },
      false,
    );
  };

  const promotional = () => {
    try {
      const code_promotional = document.querySelector('.js-code_promotional');
      document.querySelectorAll('.js-add_code').forEach((e) =>
        e.addEventListener(
          'click',
          function (event) {
            event.preventDefault();
            event.stopPropagation();
            code_promotional.querySelector('.code_dropdown').classList.add('u-d-none');
            code_promotional.querySelector('.code_dropdown').classList.remove('u-d-block');
            code_promotional.querySelector('.add_code').querySelector('div').querySelector('span').textContent =
              document.querySelector('.js-code_input').value + ' ';
            code_promotional.querySelector('.add_code').classList.remove('u-d-none');
            code_promotional.querySelector('.add_code').classList.add('u-d-block');
          },
          false,
        ),
      );

      document.querySelectorAll('.close_promotional').forEach((e) =>
        e.addEventListener(
          'click',
          function (event) {
            //event.preventDefault();
            //event.stopPropagation();
            code_promotional.querySelector('.code_dropdown').classList.remove('u-d-none');
            code_promotional.querySelector('.code_dropdown').classList.add('u-d-block');
            code_promotional.querySelector('.add_code').querySelector('div').querySelector('span').textContent = '';
            document.querySelector('.js-code_input').value = '';
            code_promotional.querySelector('.add_code').classList.add('u-d-none');
            code_promotional.querySelector('.add_code').classList.remove('u-d-block');
          },
          false,
        ),
      );

      document.querySelector('.js-cancel_code').addEventListener(
        'click',
        function (event) {
          code_promotional.querySelector('.code_dropdown').classList.remove('u-d-none');
          code_promotional.querySelector('.code_dropdown').classList.add('u-d-block');
          code_promotional.querySelector('.add_code').querySelector('div').querySelector('span').textContent =
            'Tengo un código promocional';
          code_promotional.querySelector('.add_code').classList.add('u-d-none');
          code_promotional.querySelector('.add_code').classList.remove('u-d-block');
        },
        false,
      );
      code_promotional
        .querySelector('div')
        .querySelector('div')
        .querySelector('button')
        .addEventListener(
          'click',
          function (event) {
            code_promotional.querySelector('div').querySelector('div').classList.toggle('show');
          },
          false,
        );

      document
        .querySelector('.js-code_promotional_mb')
        .querySelector('.promotinal')
        .querySelector('.g-dropdown')
        .querySelector('button')
        .addEventListener(
          'click',
          function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('.js-promotinal_dropdown_mb').classList.add('active');
            document.querySelector('.js-promotinal_input_mb').focus();
          },
          false,
        );

      document.querySelector('.js-promotinal_confirm_mb').addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          document.querySelector('.js-promotinal_dropdown_mb').classList.remove('active');
          document
            .querySelector('.js-code_promotional_mb')
            .querySelector('.code')
            .querySelector('.g-badge')
            .querySelector('span').textContent = document.querySelector('.js-promotinal_input_mb').value;
          document.querySelector('.js-code_promotional_mb').querySelector('.code').classList.remove('u-d-none');
          document.querySelector('.js-code_promotional_mb').querySelector('.code').classList.add('u-d-block');
          document.querySelector('.js-code_promotional_mb').querySelector('.promotinal').classList.add('u-d-none');
          document.querySelector('.js-code_promotional_mb').querySelector('.promotinal').classList.remove('u-d-block');
          MicroModal.init();
          MicroModal.close('modal-code2');
        },
        false,
      );

      document.querySelector('.js-close_promotional_mb').addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          document.querySelector('.js-code_promotional_mb').querySelector('.code').classList.add('u-d-none');
          document.querySelector('.js-code_promotional_mb').querySelector('.code').classList.remove('u-d-block');
          document.querySelector('.js-code_promotional_mb').querySelector('.promotinal').classList.remove('u-d-none');
          document.querySelector('.js-code_promotional_mb').querySelector('.promotinal').classList.add('u-d-block');
        },
        false,
      );
    } catch (error) { }
  };

  const htmlRoute = (event, route_origin, route_destination, route_list_class) => {
    let ROUTES = {};

    switch (route_origin?.dataset?.routes) {
      case 'formentera':
        ROUTES = ROUTE_FORMENTERA;
        break;
      default:
        ROUTES = ROUTE;
        break;
    }

    let origin = ROUTES.filter((item) => item.origin.name.toLowerCase().includes(event.target.value.toLowerCase()));
    route_origin.innerHTML = resultRoutes(origin, event.target, 'origen', route_list_class);

    let destination = ROUTES.filter((item) =>
      item.destination.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    route_destination.innerHTML = resultRoutes(destination, event.target, 'destino', route_list_class);

    routeListSelector(route_list_class);
  };

  const routeListSelector = (route_list_class) => {
    const route_list = document.querySelectorAll('.' + route_list_class);
    route_list.forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          if (route_list_class == 'route-list') { route_dropdown.classList.remove('active') }
          routeList(event, route_list_class);
          if (document.querySelector('.js-route_origin')?.dataset?.routes === 'formentera') {
            _showPassengerDropdowm();
            passenger();
          }
        },
        false,
      ),
    );
  };

  const _showPassengerDropdowm = () => {
    document.querySelector('.js-passenger_dropdown')?.classList.toggle('active');
  };

  const initial = () => {
    /* poner a true checked ida y vuelta */

    if (document.querySelector('.js-route_click')) {
      document.querySelector('.js-route_click').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        routeListSelector('route-list');
        clean('route');
        route_dropdown.classList.contains('active') ? clean() : route();
      });
    }

    // route_dropdown_mb.addEventListener(...
    if (document.querySelector('.js-route_click-mb')) {
      document.querySelector('.js-route_click-mb').addEventListener('click', function () {
        route_dropdown_mb.classList.contains('active') ? clean() : route_dropdown_mb.classList.add('active');
      });
    }

    if (document.querySelectorAll('.back-to-form')) {
      document.querySelectorAll('.back-to-form').forEach((element) => {
        element.addEventListener('click', function () {
          element.closest('.g-dropdown-click').classList.remove('active');
        });
      });
    }

    if (document.querySelector('.js-route_click-2-mb')) {
      document.querySelector('.js-route_click-2-mb').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        routeListSelector('route-list');
        clean('route');
      });
    }

    if (document.querySelector('.js-route_input')) {
      document.querySelector('.js-route_input').addEventListener('keyup', function (event) {
        event.preventDefault();
        event.stopPropagation();
        routeListSelector('route-list');
        !route_dropdown.classList.contains('active') ? route_dropdown.classList.add('active') : null;
        document.querySelector('.js-route_popularity').classList.add('u-d-none');
        const route_origin = document.querySelector('.js-route_origin');
        const route_destination = document.querySelector('.js-route_destination');
        htmlRoute(event, route_origin, route_destination, 'route-list');
      });
    }

    if (document.querySelector('.js-route_input_mb')) {
      document.querySelector('.js-route_input_mb').addEventListener('keyup', function (event) {
        event.preventDefault();
        event.stopPropagation();
        routeListSelector('route-list');
        !route_dropdown.classList.contains('active') ? route_dropdown.classList.add('active') : null;
        document.querySelector('.js-route_popularity_mb').classList.add('u-d-none');
        const route_origin_mb = document.querySelector('.js-route_origin_mb');
        const route_destination_mb = document.querySelector('.js-route_destination_mb');
        htmlRoute(event, route_origin_mb, route_destination_mb, 'route-list');
      });
    }

    if (document.querySelector('.js-calendar_click_second')) {
      document.querySelector('.js-calendar_click_second').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean();
        calendar_dropdown.classList.contains('active') ? clean() : calendar_dropdown_second.classList.add('active');
      });
    }

    if (document.querySelector('.js-passenger_click')) {
      document.querySelector('.js-passenger_click').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('passenger');
        passenger_dropdown?.classList.contains('active') ? clean() : passenger();
      });
    }

    if (document.querySelector('.js-passenger_click-mb')) {
      document.querySelector('.js-passenger_click-mb').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('passenger');
        passenger_dropdown_mb.classList.contains('active') ? clean() : passenger();
      });
    }

    if (document.querySelector('.js-button_options')) {
      document
        .querySelector('.js-button_options')
        .querySelector('.g-dropdown-basic--content')
        .querySelector('.g-dropdown-basic--bkg')
        .querySelector('ul')
        .querySelectorAll('.item')
        .forEach((e) =>
          e.querySelector('label').addEventListener(
            'click',
            function (event) {
              let value = e.querySelector('label').querySelector('input').value;
              document
                .querySelector('.js-button_options')
                .querySelector('.dropdown-list')
                .querySelector('button')
                .querySelector('span').textContent = e.querySelector('label').textContent;
              document.querySelector('.js-button_options').querySelector('.dropdown-list').classList.remove('show');
              picker?.clearSelection();
              value == 1
                ? picker?.setOptions(cambioCalendar(true, 2, 2))
                : picker?.setOptions(cambioCalendar(false, 2, 2));
              picker_mb?.clearSelection();
              value == 1
                ? picker_mb?.setOptions(cambioCalendar(true, 2, 1))
                : picker_mb?.setOptions(cambioCalendar(false, 2, 1));
            },
            false,
          ),
        );
    }

    document.addEventListener(
      'click',
      function (e) {
        if (
          !document.querySelector('.js-button_options') ||
          !document.querySelector('.js-button_options').querySelector('.dropdown-list')
        ) {
          return;
        }
        const button_options = document.querySelector('.js-button_options').querySelector('.dropdown-list');
        button_options.classList.contains('show') && e.target != button_options && !button_options.contains(e.target)
          ? button_options.classList.remove('show')
          : null;

        const code_promotional = document.querySelector('.js-code_promotional').querySelector('div').querySelector('div');
        code_promotional.classList.contains('show') &&
          e.target != code_promotional &&
          !code_promotional.contains(e.target)
          ? code_promotional.classList.remove('show')
          : null;
        route_dropdown?.classList.contains('active') && e.target != route_dropdown && !route_dropdown.contains(e.target)
          ? clean()
          : null;
        route_dropdown_mb?.classList.contains('active') &&
          e.target != route_dropdown_mb &&
          !route_dropdown_mb.contains(e.target)
          ? clean()
          : null;
        passenger_dropdown?.classList.contains('active') &&
          e.target != passenger_dropdown &&
          !passenger_dropdown.contains(e.target)
          ? clean()
          : null;
        passenger_dropdown_mb?.classList.contains('active') &&
          e.target != passenger_dropdown_mb &&
          !passenger_dropdown_mb.contains(e.target)
          ? clean()
          : null;
        const calendar_dropdown_new = document.querySelector('.js-calendar_dropdown');
        calendar_dropdown_new?.classList.contains('active') &&
          e.target != calendar_dropdown_new &&
          !calendar_dropdown_new.contains(e.target) &&
          !String(calendar_dropdown_new.innerHTML).includes(String(e.target.innerHTML))
          ? clean()
          : null;
        const calendar_dropdown_second_new = document.querySelector('.js-calendar_dropdown_second');
        calendar_dropdown_second_new?.classList.contains('active') &&
          e.target != calendar_dropdown_second_new &&
          !calendar_dropdown_second_new.contains(e.target) &&
          !String(calendar_dropdown_second_new.innerHTML).includes(String(e.target.innerHTML))
          ? clean()
          : null;
      },
      false,
    );

    if (document.querySelector('.js-date_input_second_inline')) {
      const picker_second = new Litepicker({
        element: document.querySelector('.js-date_input_second_inline'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 2,
        numberOfMonths: 2,
        numberOfColumns: 2,
        showTooltip: false,
        inlineMode: true,
        lockDaysFormat: format,
        minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.lang('es');
            return moment(date).format('DD') + ' ' + moment(date).format('MMMM');
          },
        },
        setup: (picker_second) => {
          picker_second.on('selected', (date1, date2) => {
            calendar_dropdown_second.classList.remove('active');
            document.querySelector('.js-date_input_second').value =
              document.querySelector('.js-date_input_second_inline').value;
            setTimeout(() => {
              passenger();
            }, 500);
          });
        },
      });
    }

    if (document.querySelector('.js-route_click_second')) {
      document.querySelector('.js-route_click_second').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('route_second');
        routeListSelector('route-list-second');
      });
    }

    if (document.querySelector('.js-route_input_second')) {
      document.querySelector('.js-route_input_second').addEventListener('keyup', function (event) {
        event.preventDefault();
        event.stopPropagation();
        !route_dropdown_second.classList.contains('active') ? route_dropdown_second.classList.add('active') : null;
        document.querySelector('.js-route_popularity_second').classList.add('u-d-none');
        const route_origin_second = document.querySelector('.js-route_origin_second');
        const route_destination_second = document.querySelector('.js-route_destination_second');
        htmlRoute(event, route_origin_second, route_destination_second, 'route-list-second');
        routeListSelector('route-list-second');
      });
    }
  };

  const resultRoutes = (routes, route_input, type, route_list) => {
    let html =
      '<div class="title">\
                    <p>Como ' +
      type +
      ': <span class="selected">' +
      routes.length +
      ' rutas disponibles</span></p>\
                </div>';
    routes.forEach((route) => {
      html +=
        '<div class="u-mb--1 ' +
        route_list +
        '">\
        <div class="item">\
          <div class="info start">\
            <span class="country">' +
        route.origin.name_description +
        '</span>\
            <p class="city"><span class="selected"></span>' +
        route.origin.name +
        '</p>\
          </div>\
          <i class="icon-arrow-doble"></i>\
          <div class="info end">\
            <span class="country">' +
        route.destination.name_description +
        '</span>\
            <p class="city"><span class="selected"></span>' +
        route.destination.name +
        '</p>\
          </div>\
        </div>\
      </div>';
    });
    return html;
  };

  const cambioCalendar = (singleMode, number, numberOfColumns) => {
    return {
      element: document.querySelector('#date_input'),
      singleMode: singleMode,
      showWeekNumbers: false,
      switchingMonths: number,
      numberOfMonths: number,
      numberOfColumns: numberOfColumns,
      showTooltip: false,
      format: {
        parse(date) {
          return date;
        },
        output(date) {
          moment.lang('es');
          return moment(date).format('DD') + ' ' + moment(date).format('MMMM');
        },
      },
      setup: (picker) => {
        picker.on('selected', (date1, date2) => {
          setTimeout(() => {
            const route_input_second = document.querySelector('.js-route_input_second');
          }, 200);
        });
      },
    };
  };

  try {
    promotional();
    initial();
  } catch (error) { }

  _removeOffer();
};

const _removeOffer = () => {
  document.querySelector('.js-remove-offer')?.addEventListener('click', () => {
    document.querySelector('.js-remove-route').style.display = 'none';
    document.getElementById('js-offer').classList.remove('js-has-offer');
  });
};

const ROUTE_FORMENTERA = [
  {
    id: '1',
    origin: {
      id: '1',
      name: 'Ibiza',
      name_description: 'Mallorca, Islas Baleares, España',
    },
    destination: {
      id: '2',
      name: 'Formentera',
      name_description: 'Mallorca, Islas Baleares, España',
    },
  },
  {
    id: '2',
    origin: {
      id: '1',
      name: 'Formentera',
      name_description: 'Mallorca, Islas Baleares, España',
    },
    destination: {
      id: '2',
      name: 'Ibiza',
      name_description: 'Mallorca, Islas Baleares, España',
    },
  },
];

const ROUTE = [
  {
    id: '1',
    origin: {
      id: '1',
      name: 'Barcelona',
      name_description: 'Barcelona, Cataluña, España',
    },
    destination: {
      id: '2',
      name: 'Madrid',
      name_description: 'Barcelona, Cataluña, España',
    },
  },
  {
    id: '2',
    origin: {
      id: '1',
      name: 'Barcelona',
      name_description: 'Barcelona, Cataluña, España',
    },
    destination: {
      id: '2',
      name: 'Madrid',
      name_description: 'Barcelona, Cataluña, España',
    },
  },
  {
    id: '3',
    origin: {
      id: '1',
      name: 'Barcelona',
      name_description: 'Barcelona, Cataluña, España',
    },
    destination: {
      id: '2',
      name: 'Madrid',
      name_description: 'Barcelona, Cataluña, España',
    },
  },
  {
    id: '4',
    origin: {
      id: '1',
      name: 'Cataluña',
      name_description: 'Barcelona, Cataluña, España',
    },
    destination: {
      id: '2',
      name: 'Barcelona',
      name_description: 'Barcelona, Cataluña, España',
    },
  },
  {
    id: '5',
    origin: {
      id: '1',
      name: 'Cataluña',
      name_description: 'Barcelona, Cataluña, España',
    },
    destination: {
      id: '2',
      name: 'Barcelona',
      name_description: 'Barcelona, Cataluña, España',
    },
  },
];

const FILTER = [
  {
    id: '1',
    brand: 'Mercedes',
    name: 'Mercedes',
    model: [
      {
        id: '1',
        name: 'Clase A',
      },
      {
        id: '2',
        name: 'Clase B',
      },
      {
        id: '3',
        name: 'Clase C',
      },
    ],
  },
  {
    id: '2',
    brand: 'Audi',
    name: 'Audi',
    model: [
      {
        id: '1',
        name: 'A4 Allroad Quattro',
      },
      {
        id: '2',
        name: 'A4 Allroad Quattro',
      },
      {
        id: '3',
        name: 'A8',
      },
      {
        id: '4',
        name: 'A3',
      },
      {
        id: '5',
        name: 'A5',
      },
    ],
  },
  {
    id: '3',
    brand: 'BMW',
    name: 'BMW',
    model: [
      {
        id: '1',
        name: 'Serie 3',
      },
      {
        id: '2',
        name: 'Serie 5',
      },
      {
        id: '3',
        name: 'Serie 2 Gran Tourer',
      },
      {
        id: '4',
        name: 'X3',
      },
      {
        id: '5',
        name: 'X5',
      },
    ],
  },
  {
    id: '4',
    brand: 'CHEVROLET',
    name: 'CHEVROLET',
    model: [
      {
        id: '1',
        name: 'Cruze',
      },
      {
        id: '2',
        name: 'Aveo',
      },
      {
        id: '3',
        name: 'Trax',
      },
    ],
  },
];

export default init;
