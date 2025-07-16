import Litepicker from 'litepicker';
import moment from 'moment';
import { Tabs } from '../../../js/tabs';
import { useStep } from '../../../js/useStep';

const init = () => {
  const { getState, setState } = useStep;
  const route_dropdown = document.querySelector('#route_dropdown');
  const route_dropdown_mb = document.querySelector('#route_dropdown_mb');
  const calendar_dropdown = document.querySelector('#calendar_dropdown');
  const passenger_dropdown = document.querySelector('.js-passenger_dropdown');
  const passenger_dropdown_mb = document.querySelector('#passenger_dropdown_mb');
  const vehicle_dropdown = document.querySelector('#vehicle_dropdown');
  const vehicle_dropdown_mb = document.querySelector('#vehicle_dropdown_mb');
  const mascot_dropdown = document.querySelector('#mascot_dropdown');
  const mascot_dropdown_mb = document.querySelector('#mascot_dropdown_mb');
  const calendar_dropdown_second = document.querySelector('#calendar_dropdown_second');
  const calendar_dropdown_mb = document.querySelector('#calendar_dropdown_mb');
  let picker;
  let picker_mb;

  const searchTabs = Tabs({
    elem: '.js-search-tabs',
  });
  searchTabs?.init();

  const minDate = new Date().setDate(new Date().getDate() - 1);

  try {
    if (document.querySelector('#date_input_inline')) {
      picker = new Litepicker({
        element: document.querySelector('#date_input_inline'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 2,
        numberOfMonths: 2,
        numberOfColumns: 2,
        showTooltip: false,
        inlineMode: true,
        minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.lang('es');
            return moment(date).format('DD') + ' ' + moment(date).format('MMM');
          },
        },
        setup: (picker) => {
          picker.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              day.classList.add('is-locked');
            }
          });
          picker.on('selected', (date1, date2) => {
            setTimeout(() => {
              document.querySelector('#date_input').value = document.querySelector('#date_input_inline').value;
              if (document.querySelector('#city_multiple').classList.contains('u-d-block')) {
                route_input_second.click();
                route_input_second.focus();
                //document.querySelector("#city_multiple").classList.add("u-d-block")
              } else {
                passenger();
                calendar_dropdown.classList.remove('active');
              }
            }, 200);
          });
          if (picker.options.inlineMode) {
            picker.render();
          }
        },
      });
    }

    if (document.querySelector('#date_input_inline_mb')) {
      picker_mb = new Litepicker({
        element: document.querySelector('#date_input_inline_mb'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 2,
        numberOfMonths: 25,
        numberOfColumns: 1,
        showTooltip: false,
        inlineMode: true,
        minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.lang('es');
            return moment(date).format('DD') + ' ' + moment(date).format('MMM');
          },
        },
        setup: (picker) => {
          picker.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              day.classList.add('is-locked');
            }
          });
          picker.on('selected', (date1, date2) => {
            document.querySelector('#date_input_mb').value = document.querySelector('#date_input_inline_mb').value;
            calendar_dropdown_mb.classList.remove('active');
          });
          if (picker.options.inlineMode) {
            picker.render();
          }
        },
      });
    }

    [...document.querySelector('#dropdown_options').querySelectorAll('.item')][0]
      .querySelector('label')
      .querySelector('input').checked = true;
  } catch (error) {}

  const clean = (type) => {
    try {
      const route_dropdown_second = document.querySelector('#route_dropdown_second');
      type == 'route' ? null : route_dropdown.classList.remove('active');
      type == 'calendar' ? null : calendar_dropdown.classList.remove('active');
      type == 'passenger' ? null : passenger_dropdown.classList.remove('active');
      type == 'vehicle' ? null : vehicle_dropdown.classList.remove('active');
      type == 'mascot' ? null : mascot_dropdown.classList.remove('active');
      type == 'route_second' ? null : route_dropdown_second.classList.remove('active');
      type == 'calendar_second' ? null : calendar_dropdown_second.classList.remove('active');
    } catch (error) {}
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
      document.querySelector('#route_input_second').value = start.textContent + ' - ' + end.textContent;
      calendarSecond();
    }
  };

  const routeListMb = (ev, route_list_class) => {
    const start = ev.currentTarget.querySelector('.item').querySelector('.start').querySelector('.city');
    const end = ev.currentTarget.querySelector('.item').querySelector('.end').querySelector('.city');
    const fullRoute = start.textContent + ' - ' + end.textContent;
    document.querySelector('.back-to-form').click();
    if (route_list_class == 'route-list') {
      document.querySelector('.js-route_input').value = fullRoute;
      document.querySelector('.js-route_input_mb').value = fullRoute;
      document.querySelector('#route_input_2_mb').value = fullRoute;
    } else {
      document.querySelector('#route_input_2_second_mb').value = fullRoute;
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
        document.querySelector('#passenger_list').classList.remove('u-d-block');
        document.querySelector('#passenger_list').classList.add('u-d-none');
        document.querySelector('#passenger_bonus').classList.add('u-d-block');
        document.querySelector('#passenger_bonus').classList.remove('u-d-none');
      },
      false,
    );

    document.querySelector('.js-passenger_bonus_click_mb').addEventListener(
      'click',
      function (event) {
        document.querySelector('#passenger_list_mb').classList.remove('u-d-block');
        document.querySelector('#passenger_list_mb').classList.add('u-d-none');
        document.querySelector('#passenger_bonus_mb').classList.add('u-d-block');
        document.querySelector('#passenger_bonus_mb').classList.remove('u-d-none');
      },
      false,
    );

    document
      .querySelector('#passenger_bonus')
      .querySelector('ul')
      .querySelectorAll('.item')
      .forEach((e) =>
        e.addEventListener(
          'click',
          function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('#passenger_bonus').classList.remove('u-d-block');
            document.querySelector('#passenger_bonus').classList.add('u-d-none');
            document.querySelector('#passenger_list').classList.add('u-d-block');
            document.querySelector('#passenger_list').classList.remove('u-d-none');
            document.querySelector('#passenger_bonus_text').classList.add('u-d-block');
            document.querySelector('#passenger_bonus_text').classList.remove('u-d-none');
            document.querySelector('.js-passenger_bonus_click').classList.remove('u-d-block');
            document.querySelector('.js-passenger_bonus_click').classList.add('u-d-none');
            document.querySelector('#passenger_text').textContent =
              event.currentTarget.querySelector('label').textContent;
          },
          false,
        ),
      );

    document
      .querySelector('#passenger_bonus_mb')
      .querySelector('ul')
      .querySelectorAll('.item')
      .forEach((e) =>
        e.addEventListener(
          'click',
          function (event) {
            document.querySelector('#passenger_bonus_mb').classList.remove('u-d-block');
            document.querySelector('#passenger_bonus_mb').classList.add('u-d-none');
            document.querySelector('#passenger_list_mb').classList.add('u-d-block');
            document.querySelector('#passenger_list_mb').classList.remove('u-d-none');
            document.querySelector('#passenger_bonus_text_mb').classList.add('u-d-block');
            document.querySelector('#passenger_bonus_text_mb').classList.remove('u-d-none');
            document.querySelector('.js-passenger_bonus_click_mb').classList.remove('u-d-block');
            document.querySelector('.js-passenger_bonus_click_mb').classList.add('u-d-none');
            document.querySelector('#passenger_text_mb').textContent =
              event.currentTarget.querySelector('label').textContent;
          },
          false,
        ),
      );

    document.querySelector('#edit_bonus').addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      document.querySelector('#passenger_list').classList.remove('u-d-block');
      document.querySelector('#passenger_list').classList.add('u-d-none');
      document.querySelector('#passenger_bonus').classList.add('u-d-block');
      document.querySelector('#passenger_bonus').classList.remove('u-d-none');
    });

    document.querySelector('#edit_bonus_mb').addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      document.querySelector('#passenger_list_mb').classList.remove('u-d-block');
      document.querySelector('#passenger_list_mb').classList.add('u-d-none');
      document.querySelector('#passenger_bonus_mb').classList.add('u-d-block');
      document.querySelector('#passenger_bonus_mb').classList.remove('u-d-none');
    });

    /****  back passenger  ****/

    document.querySelectorAll('#click_back').forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          let passenger_bonus = document.querySelector('#passenger_bonus');
          let passenger_list = document.querySelector('#passenger_list');
          passenger_bonus.classList.remove('u-d-block');
          passenger_bonus.classList.add('u-d-none');
          passenger_list.classList.add('u-d-block');
          passenger_list.classList.remove('u-d-none');
        },
        false,
      ),
    );

    document.querySelectorAll('#click_back_mb').forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          let passenger_bonus_mb = document.querySelector('#passenger_bonus_mb');
          let passenger_list_mb = document.querySelector('#passenger_list_mb');
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
          .querySelector('#passenger_list')
          .querySelector('.g-accountant')
          .querySelectorAll('.g-accountant--item')
          .forEach((e) =>
            array_nro.push(Number(e.querySelector('.g-accountant--item__nro').querySelector('.nro').textContent)),
          );
        let total = array_nro.reduce((a, b) => Number(a) + Number(b), 0);
        /* Valida que el total de pasajeros se mayor a 0 */
        if (Number(total) > 0) {
          document.querySelector('#passenger_input').value = total + ' pasajero' + (Number(total) > 1 ? 's' : '');
          passenger_dropdown.classList.remove('active');
          passenger_dropdown_mb.classList.remove('active');
          vehicle();
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
          .querySelector('#passenger_list_mb')
          .querySelector('.g-accountant')
          .querySelectorAll('.g-accountant--item')
          .forEach((e) =>
            array_nro.push(Number(e.querySelector('.g-accountant--item__nro').querySelector('.nro').textContent)),
          );
        let total = array_nro.reduce((a, b) => Number(a) + Number(b), 0);
        /* Valida que el total de pasajeros se mayor a 0 */
        if (Number(total) > 0) {
          document.querySelector('#passenger_input_mb').value = total + ' pasajero' + (Number(total) > 1 ? 's' : '');
          passenger_dropdown_mb.classList.remove('active');
          // vehicle();
        }
      },
      false,
    );

    document.querySelector('#passenger_cancel').addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector('#passenger_input').value = '';
        passenger_dropdown.classList.remove('active');
        passenger_dropdown_mb.classList.remove('active');
      },
      false,
    );
  };

  const clearVehicle = (list_vehicle) => {
    let ul_list = list_vehicle?.querySelector('ul')?.querySelectorAll('.item');
    ul_list?.forEach((item, i) => {
      if (document.querySelector('#dropdown_' + i)) {
        document.querySelector('#dropdown_' + i).classList.remove('u-d-block');
        document.querySelector('#dropdown_' + i).classList.add('u-d-none');
      }
    });
  };
  const vehicle = () => {
    const list_vehicle = document.querySelector('#list_vehicle');
    vehicle_dropdown?.classList.add('active');
    vehicle_dropdown_mb?.classList.add('active');
    list_vehicle?.classList.add('u-d-block');
    list_vehicle?.classList.remove('u-d-none');
    clearVehicle(list_vehicle);
    document.querySelector('#confirm_vehicle')?.addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        const result = [...list_vehicle.querySelector('ul').querySelectorAll('.item')].filter(
          (e) => e.querySelector('.g-radiobtn').querySelector('input').checked == true,
        );

        const value = result[0].querySelector('.g-radiobtn').querySelector('input').value;
        document.querySelector('#vehicle_input').value = result[0].querySelector('.g-radiobtn').textContent;
        if (value == '1' || value == '3' || value == '4') {
          list_vehicle.classList.remove('u-d-block');
          list_vehicle.classList.add('u-d-none');
          let dropdown = document.querySelector('#dropdown_' + value);
          dropdown.classList.add('u-d-block');
          dropdown.classList.remove('u-d-none');
          vehicleDropdown();
        } else {
          vehicle_dropdown.classList.remove('active');
          vehicle_dropdown_mb.classList.remove('active');
          mascot();
        }
      },
      false,
    );

    document.querySelector('#cancel_vehicle')?.addEventListener(
      'click',
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        vehicle_dropdown.classList.remove('active');
        vehicle_dropdown_mb.classList.remove('active');
        list_vehicle.classList.remove('u-d-none');
        list_vehicle.classList.add('u-d-block');
        let ul_list = list_vehicle.querySelector('ul').querySelectorAll('.item');
        ul_list.forEach((item, i) => {
          if (document.querySelector('#dropdown_' + i)) {
            document.querySelector('#dropdown_' + i).classList.remove('u-d-block');
            document.querySelector('#dropdown_' + i).classList.add('u-d-none');
          }
        });
      },
      false,
    );

    document.querySelectorAll('.back_vehicle')?.forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          list_vehicle.classList.remove('u-d-none');
          list_vehicle.classList.add('u-d-block');
          let ul_list = list_vehicle.querySelector('ul').querySelectorAll('.item');
          ul_list.forEach((item, i) => {
            if (document.querySelector('#dropdown_' + i)) {
              document.querySelector('#dropdown_' + i).classList.remove('u-d-block');
              document.querySelector('#dropdown_' + i).classList.add('u-d-none');
            }
          });
        },
        false,
      ),
    );

    document.querySelectorAll('.filter')?.forEach((item, e) => {
      item.querySelector('input').addEventListener(
        'keyup',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          if (item.querySelector('input').value != '') {
            let input_value = item.querySelector('input').value;
            let brand =
              item.querySelector('label').textContent.toLocaleLowerCase() === 'marca'
                ? FILTER.filter((item) => item.brand.toLowerCase().includes(input_value.toLowerCase()))
                : filterModel(input_value);
            if (brand.length > 0) {
              item.querySelector('div').classList.add('active');
              item.querySelector('div').innerHTML = htmlFilter(brand);
              selectedFilter(document.querySelectorAll('.filter'));
            } else {
              item.querySelector('div').classList.remove('active');
              item.querySelector('div').innerHTML = '';
            }
          } else {
            item.querySelector('div').classList.remove('active');
            item.querySelector('div').innerHTML = '';
          }
        },
        false,
      );
    });

    checkendVehicle();
  };

  const selectedFilter = (filter) => {
    filter.forEach((item, e) =>
      item
        .querySelector('div')
        .querySelectorAll('p')
        .forEach((event) => {
          event.addEventListener(
            'click',
            function (event) {
              event.preventDefault();
              event.stopPropagation();
              item.querySelector('input').value = event.target.textContent;
              item.querySelector('div').classList.remove('active');
              item.querySelector('div').innerHTML = '';
            },
            false,
          );
        }),
    );
  };

  const filterModel = (input_value) => {
    let brand_input = document.querySelector('#label_input').value;
    let brand = FILTER.filter((item) => item.brand.toLowerCase().includes(brand_input.toLowerCase()));
    return brand[0].model.filter((item) => item.name.toLowerCase().includes(input_value.toLowerCase()));
  };

  const htmlFilter = (array) => {
    let html = '';
    array.forEach((item, e) => {
      html += `<p><span class="selected"></span>${item.name}</p> <div class="item">`;
    });
    return html;
  };

  const checkendVehicle = () => {
    const vehicle_checked = document.querySelectorAll('#vehicle_checked');
    const vehicle_radio = document.querySelector('#vehicle_radio');
    vehicle_checked.forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.stopPropagation();
          item.checked ? vehicle_radio.classList.remove('u-d-none') : vehicle_radio.classList.add('u-d-none');
        },
        false,
      ),
    );

    const vehicle_checked_second = document.querySelectorAll('#vehicle_checked_second');
    const vehicle_radio_second = document.querySelector('#vehicle_radio_second');
    vehicle_checked_second.forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.stopPropagation();
          item.checked
            ? vehicle_radio_second.classList.remove('u-d-none')
            : vehicle_radio_second.classList.add('u-d-none');
        },
        false,
      ),
    );

    const trailer_checked = document.querySelectorAll('#trailer_checked');
    const trailer_radio = document.querySelector('#trailer_radio');
    trailer_checked.forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.stopPropagation();
          item.checked ? trailer_radio.classList.remove('u-d-none') : trailer_radio.classList.add('u-d-none');
        },
        false,
      ),
    );
  };

  const checkendVehicleMb = () => {
    const vehicle_checked = document.querySelector('#vehicle_checked_mb');
    const vehicle_radio = document.querySelector('#vehicle_radio_mb');
    vehicle_checked.addEventListener(
      'click',
      function (event) {
        event.stopPropagation();
        vehicle_checked.checked ? vehicle_radio.classList.remove('u-d-none') : vehicle_radio.classList.add('u-d-none');
      },
      false,
    );

    const vehicle_checked_second = document.querySelectorAll('#vehicle_checked_second_mb');
    const vehicle_radio_second = document.querySelector('#vehicle_radio_second_mb');
    vehicle_checked_second.forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.stopPropagation();
          item.checked
            ? vehicle_radio_second.classList.remove('u-d-none')
            : vehicle_radio_second.classList.add('u-d-none');
        },
        false,
      ),
    );

    const trailer_checked = document.querySelectorAll('#trailer_checked_mb');
    const trailer_radio = document.querySelector('#trailer_radio_mb');
    trailer_checked.forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.stopPropagation();
          item.checked ? trailer_radio.classList.remove('u-d-none') : trailer_radio.classList.add('u-d-none');
        },
        false,
      ),
    );
    vehicleDropdownMb();
  };

  const vehicleDropdown = () => {
    const list_vehicle = document.querySelector('#list_vehicle');
    document.querySelectorAll('.confirm_vehicle').forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          const result = [...list_vehicle.querySelector('ul').querySelectorAll('li')].filter(
            (e) => e.querySelector('.g-radiobtn').querySelector('input').checked == true,
          );
          const value = result[0].querySelector('.g-radiobtn').querySelector('input').value;
          if (value == '1') {
            const recultFilter = [...document.querySelectorAll('.filter')].filter(
              (e) => e.querySelector('input').value != '',
            );
            if (recultFilter.length > 0) {
              vehicle_dropdown.classList.remove('active');
              mascot();
              return;
            }
          } else {
            vehicle_dropdown.classList.remove('active');
            mascot();
            return;
          }
        },
        false,
      ),
    );

    document.querySelectorAll('.cancel_vehicle').forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          //vehicle_dropdown.classList.remove("active");
          list_vehicle.classList.remove('u-d-none');
          list_vehicle.classList.add('u-d-block');
          let ul_list = list_vehicle.querySelector('ul').querySelectorAll('.item');
          ul_list.forEach((item, i) => {
            if (document.querySelector('#dropdown_' + i)) {
              document.querySelector('#dropdown_' + i).classList.remove('u-d-block');
              document.querySelector('#dropdown_' + i).classList.add('u-d-none');
            }
          });
        },
        false,
      ),
    );
  };

  const vehicleDropdownMb = () => {
    const list_vehicle = document.querySelector('#list_vehicle_mb');
    document.querySelectorAll('.confirm_vehicle_mb').forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();

          const result = [...list_vehicle.querySelector('ul').querySelectorAll('li')].filter(
            (e) => e.querySelector('.g-radiobtn').querySelector('input').checked == true,
          );

          const value = result[0].querySelector('.g-radiobtn').querySelector('input').value;
          if (value == '1') {
            const recultFilter = [...document.querySelectorAll('.filter')].filter(
              (e) => e.querySelector('input').value != '',
            );
            if (recultFilter.length > 0) {
              vehicle_dropdown_mb.classList.remove('active');
              vehicle_dropdown_mb.classList.remove('active');
            }
          } else {
            vehicle_dropdown_mb.classList.remove('active');
            vehicle_dropdown_mb.classList.remove('active');
          }
        },
        false,
      ),
    );

    document.querySelectorAll('.cancel_vehicle_mb').forEach((item, e) =>
      item.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();

          //vehicle_dropdown.classList.remove("active");
          list_vehicle.classList.remove('u-d-none');
          list_vehicle.classList.add('u-d-block');
          let ul_list = list_vehicle.querySelector('ul').querySelectorAll('.item');
          ul_list.forEach((item, i) => {
            if (document.querySelector('#dropdown_mb_' + i)) {
              document.querySelector('#dropdown_mb_' + i).classList.remove('u-d-block');
              document.querySelector('#dropdown_mb_' + i).classList.add('u-d-none');
            }
          });
        },
        false,
      ),
    );
  };

  const mascot = () => {
    mascot_dropdown.classList.add('active');
    mascot_dropdown_mb.classList.add('active');

    const mascot_confirm = document.querySelectorAll('#mascot_confirm');
    mascot_confirm.forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          mascot_dropdown.classList.remove('active');
          const array_nro = [];
          document
            .querySelectorAll('.mascot_list')
            .forEach((e) =>
              array_nro.push(Number(e.querySelector('.g-accountant--item__nro').querySelector('.nro').textContent)),
            );
          let total = array_nro.reduce((a, b) => Number(a) + Number(b), 0);
          /* Valida que el total de mascotas se mayor a 0 */
          Number(total) > 0
            ? (document.querySelector('#mascot_input').value = total + ' mascota' + (Number(total) > 1 ? 's' : ''))
            : null;
          clean('mascot');
        },
        false,
      ),
    );

    const mascot_confirm_mb = document.querySelectorAll('#mascot_confirm_mb');
    mascot_confirm_mb.forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          mascot_dropdown_mb.classList.remove('active');
          const array_nro = [];
          document
            .querySelectorAll('.mascot_list')
            .forEach((e) =>
              array_nro.push(Number(e.querySelector('.g-accountant--item__nro').querySelector('.nro').textContent)),
            );
          let total = array_nro.reduce((a, b) => Number(a) + Number(b), 0);
          /* Valida que el total de mascotas se mayor a 0 */
          Number(total) > 0
            ? (document.querySelector('#mascot_input_mb').value = total + ' mascota' + (Number(total) > 1 ? 's' : ''))
            : null;
          clean('mascot');
        },
        false,
      ),
    );

    const mascot_cancel = document.querySelectorAll('#mascot_cancel');
    mascot_cancel.forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          mascot_dropdown.classList.remove('active');
          mascot_dropdown_mb.classList.remove('active');
          clean('mascot');
        },
        false,
      ),
    );
  };

  const promotional = () => {
    try {
      const code_promotional = document.querySelector('#code_promotional');
      document.querySelectorAll('#add_code').forEach((e) =>
        e.addEventListener(
          'click',
          function (event) {
            event.preventDefault();
            event.stopPropagation();
            code_promotional.querySelector('.code_dropdown').classList.add('u-d-none');
            code_promotional.querySelector('.code_dropdown').classList.remove('u-d-block');
            code_promotional.querySelector('.add_code').querySelector('div').querySelector('span').textContent =
              document.querySelector('#code_input').value + ' ';
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
            document.querySelector('#code_input').value = '';
            code_promotional.querySelector('.add_code').classList.add('u-d-none');
            code_promotional.querySelector('.add_code').classList.remove('u-d-block');
          },
          false,
        ),
      );

      document.querySelector('#cancel_code').addEventListener(
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
        .querySelector('#button_options')
        .querySelector('.dropdown-list')
        .querySelector('button')
        .addEventListener(
          'click',
          function (event) {
            //document.querySelector("#button_options").querySelector(".dropdown-list").classList.toggle("show");
          },
          false,
        );

      document
        .querySelector('#code_promotional_mb')
        .querySelector('.promotinal')
        .querySelector('.g-dropdown')
        .querySelector('button')
        .addEventListener(
          'click',
          function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.querySelector('#promotinal_dropdown_mb').classList.add('active');
            document.querySelector('#promotinal_input_mb').focus();
          },
          false,
        );

      document.querySelector('#promotinal_confirm_mb').addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          document.querySelector('#promotinal_dropdown_mb').classList.remove('active');
          document
            .querySelector('#code_promotional_mb')
            .querySelector('.code')
            .querySelector('.g-badge')
            .querySelector('span').textContent = document.querySelector('#promotinal_input_mb').value;
          document.querySelector('#code_promotional_mb').querySelector('.code').classList.remove('u-d-none');
          document.querySelector('#code_promotional_mb').querySelector('.code').classList.add('u-d-block');
          document.querySelector('#code_promotional_mb').querySelector('.promotinal').classList.add('u-d-none');
          document.querySelector('#code_promotional_mb').querySelector('.promotinal').classList.remove('u-d-block');
          MicroModal.init();
          MicroModal.close('modal-code2');
        },
        false,
      );

      document.querySelector('#close_promotional_mb').addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          document.querySelector('#code_promotional_mb').querySelector('.code').classList.add('u-d-none');
          document.querySelector('#code_promotional_mb').querySelector('.code').classList.remove('u-d-block');
          document.querySelector('#code_promotional_mb').querySelector('.promotinal').classList.remove('u-d-none');
          document.querySelector('#code_promotional_mb').querySelector('.promotinal').classList.add('u-d-block');
        },
        false,
      );

      document.querySelector('#confirm_vehicle_mb').addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();

          const list_vehicle = document.querySelector('#list_vehicle_mb');
          const result = [...list_vehicle.querySelector('ul').querySelectorAll('li')].filter(
            (e) => e.querySelector('.g-radiobtn').querySelector('input').checked == true,
          );

          const value = result[0].querySelector('.g-radiobtn').querySelector('input').value;
          document.querySelector('#vehicle_input_mb').value = result[0].querySelector('.g-radiobtn').textContent;
          if (value == '1' || value == '3' || value == '4') {
            checkendVehicleMb();

            list_vehicle.classList.remove('u-d-block');
            list_vehicle.classList.add('u-d-none');
            let dropdown = document.querySelector('#dropdown_mb_' + value);
            dropdown.classList.add('u-d-block');
            dropdown.classList.remove('u-d-none');
            //vehicleDropdown();
          } else {
            vehicle_dropdown_mb.classList.remove('active');
          }
        },
        false,
      );
    } catch (error) {}
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

  const htmlRouteMb = (event, route_origin_mb, route_destination_mb, route_list_class) => {
    let origin = ROUTE.filter((item) => item.origin.name.toLowerCase().includes(event.target.value.toLowerCase()));
    route_origin_mb.innerHTML = resultRoutesMb(origin, event.target, 'origen', route_list_class);

    let destination = ROUTE.filter((item) =>
      item.destination.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    route_destination_mb.innerHTML = resultRoutesMb(destination, event.target, 'destino', route_list_class);

    routeListSelectorMb(route_list_class);
  };

  const routeListSelector = (route_list_class) => {
    const route_list = document.querySelectorAll('.' + route_list_class);
    route_list.forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          const route_dropdown_second = document.querySelector('#route_dropdown_second');
          route_list_class == 'route-list'
            ? route_dropdown.classList.remove('active')
            : route_dropdown_second.classList.remove('active');
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

  const routeListSelectorMb = (route_list_class) => {
    const route_list = document.querySelectorAll('.' + route_list_class);
    route_list.forEach((e) =>
      e.addEventListener(
        'click',
        function (event) {
          const route_dropdown_second = document.querySelector('#route_dropdown_second_mb');
          route_list_class == 'route-list'
            ? route_dropdown.classList.remove('active')
            : route_dropdown_second.classList.remove('active');
          routeListMb(event, route_list_class);
        },
        false,
      ),
    );
  };

  const initial = () => {
    /* poner a true checked ida y vuelta */

    if (document.querySelector('#route_click')) {
      document.querySelector('#route_click').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        routeListSelector('route-list');
        clean('route');
        route_dropdown.classList.contains('active') ? clean() : route();
      });
    }

    // route_dropdown_mb.addEventListener(...
    if (document.querySelector('#route_click-mb')) {
      document.querySelector('#route_click-mb').addEventListener('click', function () {
        route_dropdown_mb.classList.contains('active') ? clean() : route_dropdown_mb.classList.add('active');
      });
    }

    if (document.querySelector('#route_click_second-mb')) {
      document.querySelector('#route_click_second-mb').addEventListener('click', function () {
        routeListSelectorMb('route-list-second');
        document.querySelector('#route_dropdown_second_mb').classList.contains('active')
          ? clean()
          : document.querySelector('#route_dropdown_second_mb').classList.add('active');
      });
    }

    if (document.querySelector('#calendar_click_mb')) {
      document.querySelector('#calendar_click_mb').addEventListener(
        'click',
        function () {
          calendar_dropdown_mb.classList.contains('active') ? clean() : calendar_dropdown_mb.classList.add('active');
        },
        false,
      );
    }

    if (document.querySelector('#calendar_click_mb_second')) {
      document.querySelector('#calendar_click_mb_second').addEventListener(
        'click',
        function () {
          document.querySelector('#calendar_dropdown_mb_second').classList.contains('active')
            ? clean()
            : document.querySelector('#calendar_dropdown_mb_second').classList.add('active');
        },
        false,
      );
    }

    if (document.querySelectorAll('.back-to-form')) {
      document.querySelectorAll('.back-to-form').forEach((element) => {
        element.addEventListener('click', function (e) {
          if (getState()) {
            if (getState().type === 'vehicle') {
              if (getState().step === 1) {
                setState({
                  type: 'vehicle',
                  tab: '',
                  step: 0,
                });

                element.closest('.g-dropdown-click').classList.remove('active');
                return;
              }
              vehicle_dropdown_mb?.classList.add('active');

              if (getState().step > 1) {
                document.querySelectorAll('.js-step').forEach((element) => {
                  if (element?.dataset?.step == getState().step) {
                    element.classList.add('u-d-none');
                    element.classList.remove('u-d-block');
                  }
                  if (element?.dataset?.step == getState().step - 1) {
                    element.classList.remove('u-d-none');
                    element.classList.add('u-d-block');
                  }
                });

                setState({
                  type: 'vehicle',
                  tab: '',
                  step: parseInt(getState().step) - 1,
                });

                document.querySelector('#list_vehicle_mb').classList.remove('u-d-none');
              }
              return;
            }
          }

          element.closest('.g-dropdown-click').classList.remove('active');
        });
      });
    }

    if (document.querySelectorAll('#vehicle_input_mb')) {
      document.querySelectorAll('#vehicle_input_mb').forEach((element) => {
        element.addEventListener('click', function (e) {
          setState({
            type: 'vehicle',
            tab: '',
            step: 1,
          });
        });
      });
    }

    if (document.querySelectorAll('.js-setStep')) {
      document.querySelectorAll('.js-setStep').forEach((element) => {
        element.addEventListener('click', function (e) {
          let currentStep = e.target?.closest('.js-step')?.dataset?.step;
          setState({
            type: 'vehicle',
            tab: '',
            step: parseInt(currentStep) + 1 || 0,
          });
        });
      });
    }

    if (document.querySelector('#route_click-2-mb')) {
      document.querySelector('#route_click-2-mb').addEventListener('click', function (event) {
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
        document.querySelector('#route_popularity').classList.add('u-d-none');
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
        document.querySelector('#route_popularity_mb').classList.add('u-d-none');
        const route_origin_mb = document.querySelector('.js-route_origin_mb');
        const route_destination_mb = document.querySelector('.js-route_destination_mb');
        htmlRouteMb(event, route_origin_mb, route_destination_mb, 'route-list');
      });
    }

    if (document.querySelector('#route_input_second_mb')) {
      document.querySelector('#route_input_second_mb').addEventListener('keyup', function (event) {
        event.preventDefault();
        event.stopPropagation();
        routeListSelector('route-list-second');
        !route_dropdown.classList.contains('active') ? route_dropdown.classList.add('active') : null;
        document.querySelector('#route_popularity_second_mb').classList.add('u-d-none');
        const route_origin_second_mb = document.querySelector('#route_origin_second_mb');
        const route_destination_second_mb = document.querySelector('#route_destination_second_mb');
        htmlRouteMb(event, route_origin_second_mb, route_destination_second_mb, 'route-list-second');
      });
    }

    if (document.querySelector('#calendar_click_second')) {
      document.querySelector('#calendar_click_second').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean();
        calendar_dropdown.classList.contains('active') ? clean() : calendar_dropdown_second.classList.add('active');
      });
    }

    if (document.querySelector('#calendar_click')) {
      document.querySelector('#calendar_click').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean();
        calendar_dropdown.classList.contains('active') ? clean() : calendar();
      });
    }

    if (document.querySelector('#passenger_click')) {
      document.querySelector('#passenger_click').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('passenger');
        passenger_dropdown?.classList.contains('active') ? clean() : passenger();
      });
    }

    if (document.querySelector('#passenger_click-mb')) {
      document.querySelector('#passenger_click-mb').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('passenger');
        passenger_dropdown_mb.classList.contains('active') ? clean() : passenger();
      });
    }

    if (document.querySelector('#vehicle_click')) {
      document.querySelector('#vehicle_click').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('vehicle');
        vehicle_dropdown.classList.contains('active') ? clean() : vehicle();
        vehicle_dropdown?.classList.add('active');
        const list_vehicle = document.querySelector('#list_vehicle');
        list_vehicle.classList.add('u-d-block');
        list_vehicle.classList.remove('u-d-none');

        let ul_list = list_vehicle.querySelector('ul').querySelectorAll('.item');
        ul_list.forEach((item, i) => {
          let dropdown = document.querySelector('#dropdown_' + i);
          if (dropdown) {
            dropdown.classList.remove('u-d-block');
            dropdown.classList.add('u-d-none');
          }
        });
      });
    }

    if (document.querySelector('#vehicle_click-mb')) {
      document.querySelector('#vehicle_click-mb').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('vehicle');
        vehicle_dropdown_mb.classList.contains('active') ? clean() : vehicle();
        vehicle_dropdown_mb.classList.add('active');
        const list_vehicle = document.querySelector('#list_vehicle');
        list_vehicle.classList.add('u-d-block');
        list_vehicle.classList.remove('u-d-none');

        let ul_list = list_vehicle.querySelector('ul').querySelectorAll('.item');
        ul_list.forEach((item, i) => {
          let dropdown = document.querySelector('#dropdown_' + i);
          if (dropdown) {
            dropdown.classList.remove('u-d-block');
            dropdown.classList.add('u-d-none');
          }
        });
      });
    }

    if (document.querySelector('#mascot_click')) {
      document.querySelector('#mascot_click').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('mascot');
        mascot_dropdown.classList.contains('active') ? clean() : mascot();
      });
    }

    if (document.querySelector('#mascot_click-mb')) {
      document.querySelector('#mascot_click-mb').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('mascot');
        mascot_dropdown_mb.classList.contains('active') ? clean() : mascot();
      });
    }

    if (document.querySelector('#button_options')) {
      document
        .querySelector('#button_options')
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
                .querySelector('#button_options')
                .querySelector('.dropdown-list')
                .querySelector('button')
                .querySelector('span').textContent = e.querySelector('label').textContent;
              document.querySelector('#button_options').querySelector('.dropdown-list').classList.remove('show');
              if (value == 3) {
                document.querySelector('#city_multiple').classList.remove('u-d-none');
                document.querySelector('#city_multiple').classList.add('u-d-block');
                document.querySelector('#city_multiple_mb').classList.remove('u-d-none');
                document.querySelector('#city_multiple_mb').classList.add('u-d-block');
              } else {
                document.querySelector('#city_multiple').classList.add('u-d-none');
                document.querySelector('#city_multiple').classList.remove('u-d-block');
                document.querySelector('#city_multiple_mb').classList.add('u-d-none');
                document.querySelector('#city_multiple_mb').classList.remove('u-d-block');
              }
              picker.clearSelection();
              document.querySelector('#date_input').value = '';
              value == 1
                ? picker.setOptions(cambioCalendar(true, 2, 2))
                : picker.setOptions(cambioCalendar(false, 2, 2));
              picker_mb.clearSelection();
              document.querySelector('#date_input_mb').value = '';
              value == 1
                ? picker_mb.setOptions(cambioCalendar(true, 2, 1))
                : picker_mb.setOptions(cambioCalendar(false, 2, 1));
              //cambioCalendar = (singleMode, number)
            },
            false,
          ),
        );
    }

    document.addEventListener(
      'click',
      function (e) {
        if (
          !document.querySelector('#button_options') ||
          !document.querySelector('#button_options').querySelector('.dropdown-list')
        ) {
          return;
        }
        const button_options = document.querySelector('#button_options').querySelector('.dropdown-list');
        button_options.classList.contains('show') && e.target != button_options && !button_options.contains(e.target)
          ? button_options.classList.remove('show')
          : null;

        const code_promotional = document.querySelector('#code_promotional').querySelector('div').querySelector('div');
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
        vehicle_dropdown?.classList.contains('active') &&
        e.target != vehicle_dropdown &&
        !vehicle_dropdown.contains(e.target)
          ? clean()
          : null;
        mascot_dropdown?.classList.contains('active') &&
        e.target != mascot_dropdown &&
        !mascot_dropdown.contains(e.target)
          ? clean()
          : null;
        const calendar_dropdown_new = document.querySelector('#calendar_dropdown');
        calendar_dropdown_new?.classList.contains('active') &&
        e.target != calendar_dropdown_new &&
        !calendar_dropdown_new.contains(e.target) &&
        !String(calendar_dropdown_new.innerHTML).includes(String(e.target.innerHTML))
          ? clean()
          : null;
        const route_dropdown_second = document.querySelector('#route_dropdown_second');
        route_dropdown_second?.classList.contains('active') &&
        e.target != route_dropdown_second &&
        !route_dropdown_second.contains(e.target)
          ? clean()
          : null;
        const calendar_dropdown_second_new = document.querySelector('#calendar_dropdown_second');
        calendar_dropdown_second_new?.classList.contains('active') &&
        e.target != calendar_dropdown_second_new &&
        !calendar_dropdown_second_new.contains(e.target) &&
        !String(calendar_dropdown_second_new.innerHTML).includes(String(e.target.innerHTML))
          ? clean()
          : null;
      },
      false,
    );

    if (document.querySelector('#date_input_second_inline')) {
      const picker_second = new Litepicker({
        element: document.querySelector('#date_input_second_inline'),
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
            return moment(date).format('DD') + ' ' + moment(date).format('MMM');
          },
        },
        setup: (picker_second) => {
          picker_second.on('selected', (date1, date2) => {
            calendar_dropdown_second.classList.remove('active');
            document.querySelector('#date_input_second').value =
              document.querySelector('#date_input_second_inline').value;
            setTimeout(() => {
              passenger();
            }, 500);
          });
        },
      });
    }

    const route_dropdown_second = document.querySelector('#route_dropdown_second');

    if (document.querySelector('#route_click_second')) {
      document.querySelector('#route_click_second').addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clean('route_second');
        routeListSelector('route-list-second');
        route_dropdown_second.classList.contains('active') ? clean() : route_dropdown_second.classList.add('active');
      });
    }

    if (document.querySelector('#route_input_second')) {
      document.querySelector('#route_input_second').addEventListener('keyup', function (event) {
        event.preventDefault();
        event.stopPropagation();
        !route_dropdown_second.classList.contains('active') ? route_dropdown_second.classList.add('active') : null;
        document.querySelector('#route_popularity_second').classList.add('u-d-none');
        const route_origin_second = document.querySelector('#route_origin_second');
        const route_destination_second = document.querySelector('#route_destination_second');
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

  const resultRoutesMb = (routes, route_input_mb, type, route_list) => {
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
          return moment(date).format('DD') + ' ' + moment(date).format('MMM');
        },
      },
      setup: (picker) => {
        picker.on('selected', (date1, date2) => {
          setTimeout(() => {
            const route_input_second = document.querySelector('#route_input_second');
            if (document.querySelector('#city_multiple').classList.contains('u-d-block')) {
              const route_dropdown_second = document.querySelector('#route_input_second');
              route_input_second.click();
              route_input_second.focus();
              //document.querySelector("#city_multiple").classList.add("u-d-block")
            } else {
              passenger();
            }

            if (document.querySelector('#city_multiple_mb').classList.contains('u-d-block')) {
              const route_dropdown_second = document.querySelector('#route_input_second');
              route_input_second.click();
              route_input_second.focus();
              //document.querySelector("#city_multiple").classList.add("u-d-block")
            } else {
              passenger();
            }
          }, 200);
        });
      },
    };
  };

  try {
    promotional();
    initial();
  } catch (error) {}

  _removeOffer();

  document.querySelectorAll('.js-btn-add-items').forEach((e) => {
    e.addEventListener('click', _showSection);
  });
};

const _showSection = (e) => {
  e.target.classList.add('u-no-display');
  e.target.closest('.js-list-accountant').querySelector('.js-add-items')?.classList?.toggle('u-no-display');
  if (document.querySelector('.js-total-accountant')) {
    document.querySelector('.js-total-accountant').innerHTML = 1;
    document.querySelector('.js-minus-accountant').removeAttribute('disabled');
  }
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
