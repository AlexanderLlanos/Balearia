const init = () => {
  document.querySelectorAll('.c-check-accordion__header').forEach((accordion) => {
    const accordionTrigger = accordion.querySelector('.g-calendar--check input');
    const accordionContent = accordion?.nextElementSibling?.classList.contains('c-check-accordion__content')
      ? accordion.nextElementSibling
      : null;

    if (accordionTrigger && accordionContent) {
      accordionTrigger.addEventListener('change', (e) => {
        if (e.target.checked) {
          accordionContent.classList.add('open');
        } else {
          accordionContent.classList.remove('open');
        }
      });
    }
  });

  document.querySelectorAll('.c-accordion').forEach((accordion) => {
    const accordionTrigger = accordion.querySelector('.c-accordion__header');
    const accordionContent = accordion.querySelector('.c-accordion__content');
    const accordionIcon = accordion.querySelector('.c-accordion__icon');
    accordionTrigger.addEventListener('click', () => {
      accordionContent.classList.toggle('open');
      accordionIcon.classList.toggle('open');
    });
  });
  document.querySelectorAll('.collapse').forEach((collapse) => {
    const collapseTrigger = collapse.querySelector('.collapse__header');
    const collapseContent = collapse.querySelector('.collapse__content');
    const collapseIcon = collapse.querySelector('.collapse__icon');
    collapseTrigger.addEventListener('click', () => {
      collapseContent.classList.toggle('open');
      collapseIcon.classList.toggle('open');
    });
  });
};

export default init;
