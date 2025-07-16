/**

  @info: Estructura del HTML, SOLO importan las clases
  @example 'js-tabs-lo-que-sea' es la clase contenedor de la seccion tabs

  <div class="js-tabs-lo-que-sea">
    <ul>
      <li><a class="js-tabs__title">Tab 1</a></li>
      <li><a class="js-tabs__title">Tab 2</a></li>
      <li><a class="js-tabs__title">Tab 3</a></li>
    </ul>

    <div class="js-tabs__content">Content 1</div>
    <div class="js-tabs__content">Content 2</div>
    <div class="js-tabs__content">Content 3</div>
  </div>

  @example USO:
  const loginTabs = Tabs({ elem: '.js-tabs-lo-que-sea' });
  loginTabs.init();

  @param {Object} options - Options to tabs
  @param {Object} options.elem - Clase contendor del tab (*required)
  @param {Object} [options.open] - Index del tab a abrir. El inicial es 0
  @param {Object} [options.titleClass] - Clase para identificar las secciones de titulo
  @param {Object} [options.contentClass] - Clase para identificar las secciones de contenido
  @param {Object} [options.activeClass] - Clase de estado active para el title y el content. Por defecto es 'active'

 */

export const Tabs = (options) => {
  const mainWrapper = document.querySelector(options.elem);

  if (!mainWrapper) {
    return;
  }

  const open = options.open || 0;
  const titleClass = options.titleClass || '.js-tabs__title';
  const activeClass = options.activeClass || 'active';
  const contentClass = options.contentClass || '.js-tabs__content';
  const tabsNum = mainWrapper.querySelectorAll(titleClass).length;
  // private

  const _onClick = (e) => {
    const titleTab = e.target?.closest(titleClass);
    if (!titleTab) {
      return;
    }

    const tabToOpen = titleTab.getAttribute('data-index');
    e.preventDefault();
    openTab(tabToOpen);
  };

  const _reset = () => {
    mainWrapper.querySelectorAll(contentClass).forEach((item) => {
      item.style.display = 'none';
    });

    mainWrapper.querySelectorAll(titleClass).forEach((item) => {
      item.className = _removeClass(item.className, activeClass);
    });
  };

  const _removeClass = (str, cls) => {
    const reg = new RegExp('( )' + cls + '()', 'g');

    return str.replace(reg, '');
  };

  const _getValidIdxTab = (idxTab) => {
    return idxTab < 0 || isNaN(idxTab) || idxTab > tabsNum ? 0 : idxTab;
  };

  const render = (idxTab) => {
    mainWrapper.addEventListener('click', _onClick, true);

    const initTab = idxTab == null ? _getValidIdxTab(open) : _getValidIdxTab(idxTab);

    for (let i = 0; i < tabsNum; i++) {
      const getDataIndex = mainWrapper.querySelectorAll(titleClass)[i].getAttribute('data-index');
      if (getDataIndex === null) {
        mainWrapper.querySelectorAll(titleClass)[i].setAttribute('data-index', i);
      }
      if (i === initTab) {
        openTab(i);
      }
    }
  };

  // public

  const openTab = (idxTab) => {
    _reset();

    const i = _getValidIdxTab(idxTab);
    if (mainWrapper.querySelectorAll(contentClass)[i]) {
      mainWrapper.querySelectorAll(contentClass)[i].style.display = '';
      mainWrapper.querySelectorAll(contentClass)[i].style.display = '';
    }
    try {
      const container = document.querySelectorAll('.o-container');
      const headerList = document.querySelectorAll('.g-header__list');
      for (let header of headerList) header.classList.remove('active');
      for (let cont of container) cont.classList.remove('active');
    } catch (error) {
      console.log({ error });
    }
  };

  const update = (idxTab) => {
    destroy();
    _reset();
    render(idxTab);
  };

  const destroy = () => {
    mainWrapper.removeEventListener('click', _onClick);
  };

  return {
    destroy: destroy,
    init: render,
    open: openTab,
    update: update,
  };
};
