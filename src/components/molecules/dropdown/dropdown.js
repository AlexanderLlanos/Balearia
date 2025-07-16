import Litepicker from 'litepicker';
import moment from 'moment';

export default function () {
  let pickerAlta;
  let pickerTrip;

  try {
    let inputTriggers = document.querySelectorAll('.js-dashboard-res-date');
    inputTriggers.forEach((input) => {
      input.addEventListener('click', function (e) {
        e.preventDefault();
        let parent = input.closest('.dropdown-item-calendar');
        let calendar = parent.querySelector('.dropdown-item-calendar-datepicker');
        if (!calendar.classList.contains('open')) {
          calendar.classList.add('open');
        }
        //calendar.classList.toggle('open')
      });
    });

    let applyFiltersTriggerList = document.querySelectorAll('.js-dashboard-reservation-apply-filter');
    applyFiltersTriggerList.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        btn.closest('.dropdown-list').classList.toggle('show');
      });
    });

    const minDate = new Date().setDate(new Date().getDate() - 1);
    if (document.querySelector('#dropdown_date_signin_prereservation_input')) {
      pickerAlta = new Litepicker({
        element: document.querySelector('#dropdown_date_signin_prereservation_input'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 1,
        numberOfMonths: 1,
        numberOfColumns: 1,
        showTooltip: false,
        inlineMode: true,
        //        minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.locale('es');
            //return moment(date).format('DD') + ' ' + moment(date).format('MMM');
            return moment(date).format('DD MMM YYYY');
          },
        },
        setup: (pickerAlta) => {
          pickerAlta.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              //day.classList.add('is-locked');
            }
          });
          pickerAlta.on('selected', (date1, date2) => {
            setTimeout(() => {
              //document.querySelector('#date_input').value = document.querySelector('#dropdown_date_signin_prereservation_input').value;
              //console.log(document.querySelector('#dropdown_date_signin_prereservation_input').value);

              let container = document
                .querySelector('#dropdown_date_signin_prereservation_input')
                .closest('.dropdown-item-calendar');

              let inputContainer = container.querySelector('.dropdown-item-calendar-inputs');
              let calendarContainer = container.querySelector('.dropdown-item-calendar-datepicker');

              moment.locale('es');

              let date1_alt = moment(date1['dateInstance']).format('DD MMM').slice(0, -1);
              let day1 = moment(date1['dateInstance']).format('dddd').substring(0, 3);
              day1 = day1.charAt(0).toUpperCase() + day1.slice(1);
              date1_alt = day1 + '. ' + date1_alt;
              inputContainer.querySelector('#dropdown_date_signin_prereservation_input_from').value = date1_alt;

              let date2_alt = moment(date2['dateInstance']).format('DD MMM').slice(0, -1);
              let day2 = moment(date2['dateInstance']).format('dddd').substring(0, 3);
              day2 = day2.charAt(0).toUpperCase() + day2.slice(1);
              date2_alt = day2 + '. ' + date2_alt;
              inputContainer.querySelector('#dropdown_date_signin_prereservation_input_until').value = date2_alt;

              calendarContainer.classList.toggle('open');

              /* document
                .querySelector('#dropdown_date_signin_prereservation_input')
                .closest('.dropdown-list')
                .classList.toggle('show');
              */

              /* let tags_container = document.querySelector('#dropdown_date_signin_prereservation_input').closest('.js-tabs__content').querySelector('.js-filter-tags')
              let element = document.createElement('div')
              element.className ='tag tag--blue tag--secondary u-align-items-center o-mb--2 o-mr--2'
              let icon = document.createElement('i')
              icon.className = 'u-text--fz-22 icon-close tag__icon u-d-flex o-ml--1 u-align-items-center u-justify-content-center'
              element.textContent = "Fecha alta: "+document.querySelector('#dropdown_date_signin_prereservation_input').value.replace('.','')
              element.appendChild(icon)
              tags_container.appendChild(element) */
            }, 200);
          });
          if (pickerAlta.options.inlineMode) {
            pickerAlta.render();
          }
        },
      });
    }
    if (document.querySelector('#dropdown_date_trip_prereservation_input')) {
      pickerTrip = new Litepicker({
        element: document.querySelector('#dropdown_date_trip_prereservation_input'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 1,
        numberOfMonths: 1,
        numberOfColumns: 1,
        showTooltip: false,
        inlineMode: true,
        //      minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.lang('es');
            //return moment(date).format('DD') + ' ' + moment(date).format('MMM');
            return moment(date).format('DD-MMM-YYYY');
          },
        },
        setup: (pickerTrip) => {
          pickerTrip.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              //day.classList.add('is-locked');
            }
          });
          pickerTrip.on('selected', (date1, date2) => {
            setTimeout(() => {
              //document.querySelector('#date_input').value = document.querySelector('#dropdown_date_trip_prereservation_input').value;
              //console.log(document.querySelector('#dropdown_date_trip_prereservation_input').value);
              let container = document
                .querySelector('#dropdown_date_trip_prereservation_input')
                .closest('.dropdown-item-calendar');
              let inputContainer = container.querySelector('.dropdown-item-calendar-inputs');
              let calendarContainer = container.querySelector('.dropdown-item-calendar-datepicker');

              moment.locale('es');

              let date1_alt = moment(date1['dateInstance']).format('DD MMM').slice(0, -1);
              let day1 = moment(date1['dateInstance']).format('dddd').substring(0, 3);
              day1 = day1.charAt(0).toUpperCase() + day1.slice(1);
              date1_alt = day1 + '. ' + date1_alt;
              inputContainer.querySelector('#dropdown_date_trip_prereservation_input_from').value = date1_alt;

              let date2_alt = moment(date2['dateInstance']).format('DD MMM').slice(0, -1);
              let day2 = moment(date2['dateInstance']).format('dddd').substring(0, 3);
              day2 = day2.charAt(0).toUpperCase() + day2.slice(1);
              date2_alt = day2 + '. ' + date2_alt;
              inputContainer.querySelector('#dropdown_date_trip_prereservation_input_until').value = date2_alt;

              calendarContainer.classList.toggle('open');

              /* document
                .querySelector('#dropdown_date_trip_prereservation_input')
                .closest('.dropdown-list')
                .classList.toggle('show');
              */
              /* let tags_container = document.querySelector('#dropdown_date_trip_prereservation_input').closest('.js-tabs__content').querySelector('.js-filter-tags')
              let element = document.createElement('div')
              element.textContent = "Fecha alta: "+document.querySelector('#dropdown_date_trip_prereservation_input').value
              tags_container.appendChild(element) */
            }, 200);
          });
          if (pickerTrip.options.inlineMode) {
            pickerTrip.render();
          }
        },
      });
    }
    if (document.querySelector('#dropdown_date_signin_confirmed_input')) {
      pickerAlta = new Litepicker({
        element: document.querySelector('#dropdown_date_signin_confirmed_input'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 1,
        numberOfMonths: 1,
        numberOfColumns: 1,
        showTooltip: false,
        inlineMode: true,
        //        minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.lang('es');
            //return moment(date).format('DD') + ' ' + moment(date).format('MMM');
            return moment(date).format('DD MMM YYYY');
          },
        },
        setup: (pickerAlta) => {
          pickerAlta.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              //day.classList.add('is-locked');
            }
          });
          pickerAlta.on('selected', (date1, date2) => {
            setTimeout(() => {
              //document.querySelector('#date_input').value = document.querySelector('#dropdown_date_signin_confirmed_input').value;
              //console.log(document.querySelector('#dropdown_date_signin_confirmed_input').value)
              let container = document
                .querySelector('#dropdown_date_signin_confirmed_input')
                .closest('.dropdown-item-calendar');
              let inputContainer = container.querySelector('.dropdown-item-calendar-inputs');
              let calendarContainer = container.querySelector('.dropdown-item-calendar-datepicker');

              moment.locale('es');

              let date1_alt = moment(date1['dateInstance']).format('DD MMM').slice(0, -1);
              let day1 = moment(date1['dateInstance']).format('dddd').substring(0, 3);
              day1 = day1.charAt(0).toUpperCase() + day1.slice(1);
              date1_alt = day1 + '. ' + date1_alt;
              inputContainer.querySelector('#dropdown_date_signin_confirmed_input_from').value = date1_alt;

              let date2_alt = moment(date2['dateInstance']).format('DD MMM').slice(0, -1);
              let day2 = moment(date2['dateInstance']).format('dddd').substring(0, 3);
              day2 = day2.charAt(0).toUpperCase() + day2.slice(1);
              date2_alt = day2 + '. ' + date2_alt;
              inputContainer.querySelector('#dropdown_date_signin_confirmed_input_until').value = date2_alt;

              calendarContainer.classList.toggle('open');

              /* document
                .querySelector('#dropdown_date_signin_confirmed_input')
                .closest('.dropdown-list')
                .classList.toggle('show');
              */

              /* let tags_container = document.querySelector('#dropdown_date_signin_confirmed_input').closest('.js-tabs__content').querySelector('.js-filter-tags')
              let element = document.createElement('div')
              element.className ='tag tag--blue tag--secondary u-align-items-center o-mb--2 o-mr--2'
              let icon = document.createElement('i')
              icon.className = 'u-text--fz-22 icon-close tag__icon u-d-flex o-ml--1 u-align-items-center u-justify-content-center'
              element.textContent = "Fecha alta: "+document.querySelector('#dropdown_date_signin_confirmed_input').value.replace('.','')
              element.appendChild(icon)
              tags_container.appendChild(element) */
            }, 200);
          });
          if (pickerAlta.options.inlineMode) {
            pickerAlta.render();
          }
        },
      });
    }
    if (document.querySelector('#dropdown_date_trip_confirmed_input')) {
      pickerTrip = new Litepicker({
        element: document.querySelector('#dropdown_date_trip_confirmed_input'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 1,
        numberOfMonths: 1,
        numberOfColumns: 1,
        showTooltip: false,
        inlineMode: true,
        //      minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.lang('es');
            //return moment(date).format('DD') + ' ' + moment(date).format('MMM');
            return moment(date).format('DD-MMM-YYYY');
          },
        },
        setup: (pickerTrip) => {
          pickerTrip.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              //day.classList.add('is-locked');
            }
          });
          pickerTrip.on('selected', (date1, date2) => {
            setTimeout(() => {
              //document.querySelector('#date_input').value = document.querySelector('#dropdown_date_trip_confirmed_input').value;
              //console.log(document.querySelector('#dropdown_date_trip_confirmed_input').value);
              let container = document
                .querySelector('#dropdown_date_trip_confirmed_input')
                .closest('.dropdown-item-calendar');
              let inputContainer = container.querySelector('.dropdown-item-calendar-inputs');
              let calendarContainer = container.querySelector('.dropdown-item-calendar-datepicker');

              moment.locale('es');

              let date1_alt = moment(date1['dateInstance']).format('DD MMM').slice(0, -1);
              let day1 = moment(date1['dateInstance']).format('dddd').substring(0, 3);
              day1 = day1.charAt(0).toUpperCase() + day1.slice(1);
              date1_alt = day1 + '. ' + date1_alt;
              inputContainer.querySelector('#dropdown_date_trip_confirmed_input_from').value = date1_alt;

              let date2_alt = moment(date2['dateInstance']).format('DD MMM').slice(0, -1);
              let day2 = moment(date2['dateInstance']).format('dddd').substring(0, 3);
              day2 = day2.charAt(0).toUpperCase() + day2.slice(1);
              date2_alt = day2 + '. ' + date2_alt;
              inputContainer.querySelector('#dropdown_date_trip_confirmed_input_until').value = date2_alt;

              calendarContainer.classList.toggle('open');

              /* document
                .querySelector('#dropdown_date_trip_confirmed_input')
                .closest('.dropdown-list')
                .classList.toggle('show');
              */
              /* let tags_container = document.querySelector('#dropdown_date_trip_confirmed_input').closest('.js-tabs__content').querySelector('.js-filter-tags')
              let element = document.createElement('div')
              element.textContent = "Fecha alta: "+document.querySelector('#dropdown_date_trip_confirmed_input').value
              tags_container.appendChild(element) */
            }, 200);
          });
          if (pickerTrip.options.inlineMode) {
            pickerTrip.render();
          }
        },
      });
    }
    if (document.querySelector('#dropdown_date_signin_done_input')) {
      pickerAlta = new Litepicker({
        element: document.querySelector('#dropdown_date_signin_done_input'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 1,
        numberOfMonths: 1,
        numberOfColumns: 1,
        showTooltip: false,
        inlineMode: true,
        //        minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.lang('es');
            //return moment(date).format('DD') + ' ' + moment(date).format('MMM');
            return moment(date).format('DD MMM YYYY');
          },
        },
        setup: (pickerAlta) => {
          pickerAlta.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              //day.classList.add('is-locked');
            }
          });
          pickerAlta.on('selected', (date1, date2) => {
            setTimeout(() => {
              //document.querySelector('#date_input').value = document.querySelector('#dropdown_date_signin_done_input').value;
              //console.log(document.querySelector('#dropdown_date_signin_done_input').value)
              let container = document
                .querySelector('#dropdown_date_signin_done_input')
                .closest('.dropdown-item-calendar');
              let inputContainer = container.querySelector('.dropdown-item-calendar-inputs');
              let calendarContainer = container.querySelector('.dropdown-item-calendar-datepicker');

              moment.locale('es');

              let date1_alt = moment(date1['dateInstance']).format('DD MMM').slice(0, -1);
              let day1 = moment(date1['dateInstance']).format('dddd').substring(0, 3);
              day1 = day1.charAt(0).toUpperCase() + day1.slice(1);
              date1_alt = day1 + '. ' + date1_alt;
              inputContainer.querySelector('#dropdown_date_signin_done_input_from').value = date1_alt;

              let date2_alt = moment(date2['dateInstance']).format('DD MMM').slice(0, -1);
              let day2 = moment(date2['dateInstance']).format('dddd').substring(0, 3);
              day2 = day2.charAt(0).toUpperCase() + day2.slice(1);
              date2_alt = day2 + '. ' + date2_alt;
              inputContainer.querySelector('#dropdown_date_signin_done_input_until').value = date2_alt;

              calendarContainer.classList.toggle('open');

              /* document
                .querySelector('#dropdown_date_signin_done_input')
                .closest('.dropdown-list')
                .classList.toggle('show');
              */
              /* let tags_container = document.querySelector('#dropdown_date_signin_done_input').closest('.js-tabs__content').querySelector('.js-filter-tags')
              let element = document.createElement('div')
              element.className ='tag tag--blue tag--secondary u-align-items-center o-mb--2 o-mr--2'
              let icon = document.createElement('i')
              icon.className = 'u-text--fz-22 icon-close tag__icon u-d-flex o-ml--1 u-align-items-center u-justify-content-center'
              element.textContent = "Fecha alta: "+document.querySelector('#dropdown_date_signin_done_input').value.replace('.','')
              element.appendChild(icon)
              tags_container.appendChild(element) */
            }, 200);
          });
          if (pickerAlta.options.inlineMode) {
            pickerAlta.render();
          }
        },
      });
    }
    if (document.querySelector('#dropdown_date_trip_done_input')) {
      pickerTrip = new Litepicker({
        element: document.querySelector('#dropdown_date_trip_done_input'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 1,
        numberOfMonths: 1,
        numberOfColumns: 1,
        showTooltip: false,
        inlineMode: true,
        //      minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.lang('es');
            //return moment(date).format('DD') + ' ' + moment(date).format('MMM');
            return moment(date).format('DD-MMM-YYYY');
          },
        },
        setup: (pickerTrip) => {
          pickerTrip.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              //day.classList.add('is-locked');
            }
          });
          pickerTrip.on('selected', (date1, date2) => {
            setTimeout(() => {
              //document.querySelector('#date_input').value = document.querySelector('#dropdown_date_trip_done_input').value;
              //console.log(document.querySelector('#dropdown_date_trip_done_input').value);
              let container = document
                .querySelector('#dropdown_date_trip_done_input')
                .closest('.dropdown-item-calendar');
              let inputContainer = container.querySelector('.dropdown-item-calendar-inputs');
              let calendarContainer = container.querySelector('.dropdown-item-calendar-datepicker');

              moment.locale('es');

              let date1_alt = moment(date1['dateInstance']).format('DD MMM').slice(0, -1);
              let day1 = moment(date1['dateInstance']).format('dddd').substring(0, 3);
              day1 = day1.charAt(0).toUpperCase() + day1.slice(1);
              date1_alt = day1 + '. ' + date1_alt;
              inputContainer.querySelector('#dropdown_date_trip_done_input_from').value = date1_alt;

              let date2_alt = moment(date2['dateInstance']).format('DD MMM').slice(0, -1);
              let day2 = moment(date2['dateInstance']).format('dddd').substring(0, 3);
              day2 = day2.charAt(0).toUpperCase() + day2.slice(1);
              date2_alt = day2 + '. ' + date2_alt;
              inputContainer.querySelector('#dropdown_date_trip_done_input_until').value = date2_alt;

              calendarContainer.classList.toggle('open');

              /* document
                .querySelector('#dropdown_date_trip_done_input')
                .closest('.dropdown-list')
                .classList.toggle('show');
              */
              /*
              let tags_container = document.querySelector('#dropdown_date_trip_done_input').closest('.js-tabs__content').querySelector('.js-filter-tags')
              let element = document.createElement('div')
              element.textContent = "Fecha alta: "+document.querySelector('#dropdown_date_trip_done_input').value
              tags_container.appendChild(element) */
            }, 200);
          });
          if (pickerTrip.options.inlineMode) {
            pickerTrip.render();
          }
        },
      });
    }
    if (document.querySelector('#dropdown_date_signin_prereservation_input_mobile')) {
      pickerAlta = new Litepicker({
        element: document.querySelector('#dropdown_date_signin_prereservation_input_mobile'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 1,
        numberOfMonths: 1,
        numberOfColumns: 1,
        showTooltip: false,
        inlineMode: true,
        //        minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.locale('es');
            //return moment(date).format('DD') + ' ' + moment(date).format('MMM');
            return moment(date).format('DD MMM YYYY');
          },
        },
        setup: (pickerAlta) => {
          pickerAlta.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              //day.classList.add('is-locked');
            }
          });
          pickerAlta.on('selected', (date1, date2) => {
            setTimeout(() => {
              //document.querySelector('#date_input').value = document.querySelector('#dropdown_date_signin_prereservation_input').value;
              //console.log(document.querySelector('#dropdown_date_signin_prereservation_input').value);

              let container = document
                .querySelector('#dropdown_date_signin_prereservation_input_mobile')
                .closest('.dropdown-item-calendar');

              let inputContainer = container.querySelector('.dropdown-item-calendar-inputs');
              let calendarContainer = container.querySelector('.dropdown-item-calendar-datepicker');

              moment.locale('es');

              let date1_alt = moment(date1['dateInstance']).format('DD MMM').slice(0, -1);
              let day1 = moment(date1['dateInstance']).format('dddd').substring(0, 3);
              day1 = day1.charAt(0).toUpperCase() + day1.slice(1);
              date1_alt = day1 + '. ' + date1_alt;
              inputContainer.querySelector('#dropdown_date_signin_prereservation_input_mobile_from').value = date1_alt;

              let date2_alt = moment(date2['dateInstance']).format('DD MMM').slice(0, -1);
              let day2 = moment(date2['dateInstance']).format('dddd').substring(0, 3);
              day2 = day2.charAt(0).toUpperCase() + day2.slice(1);
              date2_alt = day2 + '. ' + date2_alt;
              inputContainer.querySelector('#dropdown_date_signin_prereservation_input_mobile_until').value = date2_alt;

              calendarContainer.classList.toggle('open');

              /* document
                .querySelector('#dropdown_date_signin_prereservation_input')
                .closest('.dropdown-list')
                .classList.toggle('show');
              */

              let tags_container = document
                .querySelector('#dropdown_date_signin_prereservation_input_mobile')
                .closest('.js-tabs__content')
                .querySelector('.js-filter-tags');
              let element = document.createElement('div');
              element.className = 'tag tag--blue tag--secondary u-align-items-center o-mb--2 o-mr--2';
              let icon = document.createElement('i');
              icon.className =
                'u-text--fz-22 icon-close tag__icon u-d-flex o-ml--1 u-align-items-center u-justify-content-center';
              element.textContent =
                'Fecha alta: ' +
                document.querySelector('#dropdown_date_signin_prereservation_input_mobile').value.replace('.', '');
              element.appendChild(icon);
              tags_container.appendChild(element);
            }, 200);
          });
          if (pickerAlta.options.inlineMode) {
            pickerAlta.render();
          }
        },
      });
    }

    if (document.querySelector('#dropdown_date_signin_prereservation_trip_mobile')) {
      pickerAlta = new Litepicker({
        element: document.querySelector('#dropdown_date_signin_prereservation_trip_mobile'),
        singleMode: false,
        showWeekNumbers: false,
        switchingMonths: 1,
        numberOfMonths: 1,
        numberOfColumns: 1,
        showTooltip: false,
        inlineMode: true,
        //        minDate: minDate,
        format: {
          parse(date) {
            return date;
          },
          output(date) {
            moment.locale('es');
            //return moment(date).format('DD') + ' ' + moment(date).format('MMM');
            return moment(date).format('DD MMM YYYY');
          },
        },
        setup: (pickerAlta) => {
          pickerAlta.on('render:day', (day, date) => {
            if (date.toJSDate() < minDate) {
              //day.classList.add('is-locked');
            }
          });
          pickerAlta.on('selected', (date1, date2) => {
            setTimeout(() => {
              //document.querySelector('#date_input').value = document.querySelector('#dropdown_date_signin_prereservation_input').value;
              //console.log(document.querySelector('#dropdown_date_signin_prereservation_input').value);

              let container = document
                .querySelector('#dropdown_date_signin_prereservation_trip_mobile')
                .closest('.dropdown-item-calendar');

              let inputContainer = container.querySelector('.dropdown-item-calendar-inputs');
              let calendarContainer = container.querySelector('.dropdown-item-calendar-datepicker');

              moment.locale('es');

              let date1_alt = moment(date1['dateInstance']).format('DD MMM').slice(0, -1);
              let day1 = moment(date1['dateInstance']).format('dddd').substring(0, 3);
              day1 = day1.charAt(0).toUpperCase() + day1.slice(1);
              date1_alt = day1 + '. ' + date1_alt;
              inputContainer.querySelector('#dropdown_date_signin_prereservation_trip_mobile_from').value = date1_alt;

              let date2_alt = moment(date2['dateInstance']).format('DD MMM').slice(0, -1);
              let day2 = moment(date2['dateInstance']).format('dddd').substring(0, 3);
              day2 = day2.charAt(0).toUpperCase() + day2.slice(1);
              date2_alt = day2 + '. ' + date2_alt;
              inputContainer.querySelector('#dropdown_date_signin_prereservation_trip_mobile_until').value = date2_alt;

              calendarContainer.classList.toggle('open');

              /* document
                .querySelector('#dropdown_date_signin_prereservation_input')
                .closest('.dropdown-list')
                .classList.toggle('show');
              */

              let tags_container = document
                .querySelector('#dropdown_date_signin_prereservation_trip_mobile')
                .closest('.js-tabs__content')
                .querySelector('.js-filter-tags');
              let element = document.createElement('div');
              element.className = 'tag tag--blue tag--secondary u-align-items-center o-mb--2 o-mr--2';
              let icon = document.createElement('i');
              icon.className =
                'u-text--fz-22 icon-close tag__icon u-d-flex o-ml--1 u-align-items-center u-justify-content-center';
              element.textContent =
                'Fecha de viaje: ' +
                document.querySelector('#dropdown_date_signin_prereservation_trip_mobile').value.replace('.', '');
              element.appendChild(icon);
              tags_container.appendChild(element);
            }, 200);
          });
          if (pickerAlta.options.inlineMode) {
            pickerAlta.render();
          }
        },
      });
    }

    const dropdown_list = document.querySelectorAll('.dropdown-list');
    dropdown_list.forEach((dropdown) => {
      dropdown.querySelector('button').addEventListener(
        'click',
        function (event) {
          dropdown_list.forEach((dropdown) => {
            if (dropdown.classList.contains('show')) {
              dropdown.classList.remove('show');
            }
          });

          dropdown.classList.toggle('show');
        },
        false,
      );
    });

    document.addEventListener('click', function (event) {
      event.stopPropagation();
      if (!event.target.closest('.dropdown-list') && !event.target.closest('.container__months')) {
        dropdown_list.forEach((dropdown) => {
          dropdown.classList.remove('show');
        });
      }
    });

    dropdown_list.forEach((dropdown) => {
      dropdown
        ?.querySelector('div')
        ?.querySelector('div')
        ?.querySelectorAll('ul')
        .forEach((ul) => {
          ul.querySelectorAll('.item').forEach((item) => {
            item.querySelector('.g-radiobtn')?.addEventListener(
              'click',
              (event) => {
                event.stopPropagation();
                if (event.target.classList.contains('dropdown-item--custom')) {
                  if (!event.target.closest('.item').classList.contains('active')) {
                    event.target.closest('.item').classList.add('active');
                  }
                } else {
                  //dropdown.classList.remove('show');
                  event.target
                    .closest('ul')
                    .querySelector('.active')
                    ?.querySelector('.dropdown-item-calendar-datepicker')
                    ?.classList.remove('open');
                  event.target.closest('ul').querySelector('.active')?.classList.remove('active');
                }
              },
              false,
            );
          });
          /* ul.addEventListener(
            'click',
            function (event) {

              event.stopPropagation();
              console.log(event.target)
              if (event.target.classList.contains('dropdown-item--custom')) {
                if(!event.target.closest('.item').classList.contains('active')){
                  event.target.closest('.item').classList.add('active')
                }
              }else{
                dropdown.classList.remove('show');

              }
            },
            false,
          ); */
        });
    });

    dropdown_list.forEach((dropdown) => {
      dropdown
        ?.querySelector('div')
        ?.querySelectorAll('ul')
        .forEach((ul) => {
          ul.querySelectorAll('.itemPerson').forEach((item) => {
            item.querySelector('.g-radiobtn')?.addEventListener(
              'click',
              (event) => {
                event.stopPropagation();
                if (event.target.classList.contains('dropdown-item--custom')) {
                  const globalFilter = document.querySelector('#calendarDropdown');
                  globalFilter.classList.remove('spaceHide');
                  globalFilter.classList.add('spaceShow');
                } else {
                  const globalFilter = document.querySelector('#calendarDropdown');
                  globalFilter.classList.remove('spaceShow');
                  globalFilter.classList.add('spaceHide');
                }
              },
              false,
            );
          });
        });
    });

    dropdown_list.forEach((dropdown) => {
      dropdown
        ?.querySelector('div')
        ?.querySelectorAll('ul')
        .forEach((ul) => {
          console.log({ ul });
          ul.querySelectorAll('.itemTrip').forEach((item) => {
            console.log('1');
            item.querySelector('.g-radiobtn')?.addEventListener(
              'click',
              (event) => {
                console.log('2');
                event.stopPropagation();
                if (event.target.classList.contains('dropdown-item--custom')) {
                  const globalFilter = document.querySelector('#calendarDropdownTrip');
                  globalFilter.classList.remove('spaceHide');
                  globalFilter.classList.add('spaceShow');
                } else {
                  const globalFilter = document.querySelector('#calendarDropdownTrip');
                  globalFilter.classList.remove('spaceShow');
                  globalFilter.classList.add('spaceHide');
                }
              },
              false,
            );
          });
        });
    });
  } catch (error) {
    console.log(error);
  }
}
