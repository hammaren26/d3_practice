/* my functions */

const DOCUMENT = document;
export default window.DOCUMENT = DOCUMENT;

export function _closest(elem, parentSelector) {
   if (Element.prototype.closest) {
      return elem.closest(parentSelector);
   }
   let parent = elem;
   while (parent) {
      if (parent.matches(parentSelector)) {
         return parent;
      }

      parent = parent.parentElement;
   }
   return null;
}

export function checkInput(text_from_input) {
   return /[^\s]/gim.test(text_from_input);
}

export function siblings(elemSelector) {
   const elem = DOCUMENT.querySelector(elemSelector);
   console.log(elem);
   var siblings = Array.prototype.slice.call(elem.parentNode.children);

   console.log(siblings);

   for (let i = siblings.length; i--;) {
      if (siblings[i] === elem) {
         siblings.splice(i, 1);
         break;
      }
   }

   console.log(siblings);
}

// получаем значения transform элемента
export function getTranslateCoords(element) {
   const style = window.getComputedStyle(element);
   const matrix = new WebKitCSSMatrix(style.transform);

   return matrix

   return {
      x: matrix.m41,
      y: matrix.m42
   }
}


function siblings1(elem) {
   let siblings = [];
   let sibling = elem;
   while (sibling.previousSibling) {
      sibling = sibling.previousSibling;
      sibling.nodeType == 1 && siblings.push(sibling);
   }

   sibling = elem;
   while (sibling.nextSibling) {
      sibling = sibling.nextSibling;
      sibling.nodeType == 1 && siblings.push(sibling);
   }

   return siblings;
}

// закрытие подсказки на мобилах в картах
export function CloseMapSignHandler(boxSelector, classNameDeletedEls = false, deletedClass = false) {
   if (IsElem(boxSelector)) {
      const mapBox = document.querySelector(boxSelector);
      const map_sign_close = mapBox.querySelector('.js_sign_close');
      map_sign_close.addEventListener('click', function (e) {
         if (classNameDeletedEls && deletedClass) {
            document.querySelectorAll(classNameDeletedEls).forEach(el => el.classList.remove(deletedClass))
         }
         _closest(this, boxSelector).classList.remove('active');
      });
   }


}

export function GetViewportDifference() {
   const rootElement = document.createElement('div');
   document.body.appendChild(rootElement);
   rootElement.style.height = '100vh';
   const viewPortH = rootElement.getBoundingClientRect().height;
   const windowH = window.innerHeight;
   const browserUiBarsH = viewPortH - windowH;
   rootElement.remove();

   // записываем в css переменную значение разницы вьюпорта
   const root = document.querySelector(':root');
   root.style.setProperty('--difVW', `${browserUiBarsH}px`);

   return browserUiBarsH;
}


export function onClickClose(elem, className) {
   // вызвать в момент показа окна, где elem - окно
   function outsideClickListener(event) {
      if (!elem.contains(event.target) && isVisible(elem)) {  // проверяем, что клик не по элементу и элемент виден
         // elem.classList.remove(className)
         document.removeEventListener('click', outsideClickListener);
      }

      console.log('parentClickHandler');
   }

   document.addEventListener('click', outsideClickListener)
}

export function isVisible(elem) {
   //открыто ли условное окно
   return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}


export function OnClickCloseJq(selector, arrDeletedClasses, callback = () => { }) {
   if (IsElem(selector)) {
      $(document).mouseup(function (e) { // событие клика по веб-документу
         var div = $(selector); // тут указываем ID элемента
         if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            arrDeletedClasses.forEach(el => {
               document.querySelector(el).classList.remove('active');
               callback();
            })
         }
      });


   }
}

// маска для телефона
export function PhoneMask(selector) {
   $(selector).inputmask({
      mask: '+7 (999) 999-99-99',
      clearMaskOnLostFocus: true,
      showMaskOnFocus: false,
      showMaskOnHover: false,
      definitions: {
         '7': {
            validator: function (chrs, maskset, pos, strict, opts) {
               if (String(chrs) !== '8' && String(chrs) !== '7') {
                  return {
                     c: '7',
                     insert: {
                        pos: pos + 3,
                        c: chrs,
                     },
                     caret: pos + 4,
                  };
               }

               return {
                  c: '7',
               };
            },


         },
      },
      onBeforeMask: function (value, opts) {
         var processedValue = value.replace(/ /g, "");
         // if (processedValue.indexOf("32") > 1 || processedValue.indexOf("32") == -1) {
         //    processedValue = "32" + processedValue;
         // }

         return processedValue;
      }
   });
};

// +7 (999) 453-56-97


// позволяет вводить только цифры
window.ForceNumericOnly = function () {
   console.log(event.keyCode);
   if (event.keyCode < 48 || event.keyCode > 57)
      event.returnValue = false;
}


export function SetHandlerPopupLinks() {
   DOCUMENT.querySelector("[data-target-popup=exit-popup]")
   const popupOpenLinks = DOCUMENT.querySelectorAll("[data-target-popup");
   popupOpenLinks.forEach(popupOpenLink => {
      popupOpenLink.addEventListener('click', function (e) {
         e.preventDefault();
         const popupOpenLinkDataPopup = popupOpenLink.dataset.targetPopup;
         ShowPopup('.ta_popup', popupOpenLinkDataPopup);
      });
   });
}




export function isTouchDevice() {
   return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
}



window.isValue = function (event, selector = '.application_form__add_plan') {
   let fieldValue = event.target.value;
   const addPlanBtn = DOCUMENT.querySelector(selector);

   if (fieldValue.length > 0) {
      addPlanBtn.classList.add('active');
   } else {
      addPlanBtn.classList.remove('active');
   }
}


export function ShowPopup(popupClass, targetAttr = '') {
   const currentPopup = DOCUMENT.querySelector(`${popupClass}[data-popup=${targetAttr}]`);
   currentPopup.classList.add('active');
}


export function ClosePopup() {
   const popups = DOCUMENT.querySelectorAll('.ta_popup');
   popups.forEach(popup => {
      popup.classList.remove('active');
   })
}


window.isNumber = function (evt) {
   evt = (evt) ? evt : window.event;
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
   }
   return true;
}


export const sleep = (ms) => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve()
      }, ms)
   })
}

export function setPosElement(selector, direction, value) {
   if (IsElem(selector)) {
      DOCUMENT.querySelector(selector).style[direction] = value;
   }
}


// координаты относительно родителя
export function getCoordsInParent(selector) {
   var obj = document.querySelector(selector); // берем интересующий элемент  
   var posY = obj.offsetTop;  // верхний отступ эл-та от родителя
   var posX = obj.offsetLeft; // левый отступ эл-та от родителя
   return {
      posX, posY
   }
}


// координаты относительно документа
export function getCoords(elem) {
   let box = elem.getBoundingClientRect();

   return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
   };
}



export function IsElem(selector) {
   return DOCUMENT.querySelector(selector);
}


export function AllElementsRemoveClass(h_class, selector) {
   const allElementsBySelector = document.querySelectorAll(selector);
   allElementsBySelector.forEach(element => {
      element.classList.remove(h_class);
   })
}


// функция валидации поля (на вход получает текущий инпут)
export function ValidateInputs(input) {
   const formInputValue = input.value.trim();
   const currentInputWrapper = _closest(input, '.form-group');
   if (!formInputValue.length > 0) {
      currentInputWrapper.classList.add('error');
      currentInputWrapper.classList.remove('success');
   } else {
      currentInputWrapper.classList.remove('error');
      currentInputWrapper.classList.add('success');
   }
}


// функция задающая выбранным полям обработчик валидации при потере фокуса 
export function SetInputsValidate() {
   const formInputs = document.querySelectorAll('.form-input[required]');
   formInputs.forEach(formInput => {
      formInput.addEventListener('blur', function (event) {
         ValidateInputs(formInput)
      });
   });
}





// Hybrid Select (Native + Custom Select)
export function InitHybridSelect() {
   const elSelectNative = document.getElementsByClassName("js-selectNative")[0];
   const elSelectCustom = document.getElementsByClassName("js-selectCustom")[0];
   const elSelectCustomBox = elSelectCustom.children[0];
   const elSelectCustomOpts = elSelectCustom.children[1];
   const customOptsList = Array.from(elSelectCustomOpts.children);
   const optionsCount = customOptsList.length;
   const defaultLabel = elSelectCustomBox.getAttribute("data-value");

   let optionChecked = "";
   let optionHoveredIndex = -1;

   // Toggle custom select visibility when clicking the box
   elSelectCustomBox.addEventListener("click", (e) => {
      const isClosed = !elSelectCustom.classList.contains("isActive");

      if (isClosed) {
         openSelectCustom();
      } else {
         closeSelectCustom();
      }
   });

   function openSelectCustom() {
      elSelectCustom.classList.add("isActive");
      // Remove aria-hidden in case this was opened by a user
      // who uses AT (e.g. Screen Reader) and a mouse at the same time.
      elSelectCustom.setAttribute("aria-hidden", false);

      if (optionChecked) {
         const optionCheckedIndex = customOptsList.findIndex(
            (el) => el.getAttribute("data-value") === optionChecked
         );
         updateCustomSelectHovered(optionCheckedIndex);
      }

      // Add related event listeners
      document.addEventListener("click", watchClickOutside);
      document.addEventListener("keydown", supportKeyboardNavigation);
   }

   function closeSelectCustom() {
      elSelectCustom.classList.remove("isActive");

      elSelectCustom.setAttribute("aria-hidden", true);

      updateCustomSelectHovered(-1);

      // Remove related event listeners
      document.removeEventListener("click", watchClickOutside);
      document.removeEventListener("keydown", supportKeyboardNavigation);
   }

   function updateCustomSelectHovered(newIndex) {
      const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
      const option = elSelectCustomOpts.children[newIndex];

      if (prevOption) {
         prevOption.classList.remove("isHover");
      }
      if (option) {
         option.classList.add("isHover");
      }

      optionHoveredIndex = newIndex;
   }

   function updateCustomSelectChecked(value, text) {
      const prevValue = optionChecked;

      const elPrevOption = elSelectCustomOpts.querySelector(
         `[data-value="${prevValue}"`
      );
      const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

      if (elPrevOption) {
         elPrevOption.classList.remove("isActive");
      }

      if (elOption) {
         elOption.classList.add("isActive");
      }

      elSelectCustomBox.textContent = text;
      optionChecked = value;
   }

   function watchClickOutside(e) {
      const didClickedOutside = !elSelectCustom.contains(event.target);
      if (didClickedOutside) {
         closeSelectCustom();
      }
   }

   function supportKeyboardNavigation(e) {
      // press down -> go next
      if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
         let index = optionHoveredIndex;
         e.preventDefault(); // prevent page scrolling
         updateCustomSelectHovered(optionHoveredIndex + 1);
      }

      // press up -> go previous
      if (event.keyCode === 38 && optionHoveredIndex > 0) {
         e.preventDefault(); // prevent page scrolling
         updateCustomSelectHovered(optionHoveredIndex - 1);
      }

      // press Enter or space -> select the option
      if (event.keyCode === 13 || event.keyCode === 32) {
         e.preventDefault();

         const option = elSelectCustomOpts.children[optionHoveredIndex];
         const value = option && option.getAttribute("data-value");

         if (value) {
            elSelectNative.value = value;
            updateCustomSelectChecked(value, option.textContent);
         }
         closeSelectCustom();
      }

      // press ESC -> close selectCustom
      if (event.keyCode === 27) {
         closeSelectCustom();
      }
   }

   // Update selectCustom value when selectNative is changed.
   elSelectNative.addEventListener("change", (e) => {
      const value = e.target.value;
      const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
         `[data-value="${value}"]`
      )[0];

      updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
   });

   // Update selectCustom value when an option is clicked or hovered
   customOptsList.forEach(function (elOption, index) {
      elOption.addEventListener("click", (e) => {
         const value = e.target.getAttribute("data-value");

         // Sync native select to have the same value
         elSelectNative.value = value;
         updateCustomSelectChecked(value, e.target.textContent);
         closeSelectCustom();
      });

      elOption.addEventListener("mouseenter", (e) => {
         updateCustomSelectHovered(index);
      });

      // TODO: Toggle these event listeners based on selectCustom visibility
   });




   document.addEventListener('DOMContentLoaded', function () {
      const selectes = document.querySelectorAll('select')
      selectes.forEach(sel => {
         sel.style.opacity = '1';
      })

      console.log('content');
   })

   window.addEventListener('load', function () {
      const selectes = document.querySelectorAll('select')
      selectes.forEach(sel => {
         sel.classList.add('load-select')
      })
   })

}




// !!переписать на чистом js
export function toggleFocusInputs() {
   $(document).on('focus', '.form-input, .form-textarea', function () {
      $(this).closest('.form-group').addClass('focus');
   });

   $(document).on('blur', '.form-input, .form-textarea', function () {
      if (!$(this).val().length > 0) {
         $(this).closest('.form-group').removeClass('focus');
      }
   });

   $('.form-input').each(function () {
      if ($(this).val().length > 0) {
         $(this).closest('.form-group').addClass('focus');
      }
   })
}




/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
   // Проверка поддержки webp
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   // Добавление класса _webp или _no-webp для HTML
   testWebP(function (support) {
      let className = support === true ? 'webp' : 'no-webp';
      document.documentElement.classList.add(className);
   });
}
/* Проверка мобильного браузера */
export let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
   // Добавление класса _touch для HTML если браузер мобильный
   if (isMobile.any()) document.documentElement.classList.add('touch');
}
// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
   window.addEventListener("load", function () {
      setTimeout(function () {
         document.documentElement.classList.add('loaded');
      }, 0);
   });
}
// Получение хеша в адресе сайта
export function getHash() {
   if (location.hash) { return location.hash.replace('#', ''); }
}
// Указание хеша в адресе сайта
export function setHash(hash) {
   history.pushState('', '', hash);
}
// Учет плавающей панели на мобильных устройствах при 100vh
export function fullVHfix() {
   const fullScreens = document.querySelectorAll('[data-fullscreen]');
   if (fullScreens.length && isMobile.any()) {
      window.addEventListener('resize', fixHeight);
      function fixHeight() {
         let vh = window.innerHeight * 0.01;
         document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      fixHeight();
   }
}
// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
export let _slideUp = (target, duration = 500, showmore = 0) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
         target.hidden = !showmore ? true : false;
         !showmore ? target.style.removeProperty('height') : null;
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         !showmore ? target.style.removeProperty('overflow') : null;
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
export let _slideDown = (target, duration = 500, showmore = 0) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.hidden = target.hidden ? false : null;
      showmore ? target.style.removeProperty('height') : null;
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
export let _slideToggle = (target, duration = 500) => {
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
}
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
   if (document.documentElement.classList.contains('lock')) {
      bodyUnlock(delay);
   } else {
      bodyLock(delay);
   }
}
export let bodyUnlock = (delay = 500) => {
   let body = document.querySelector("body");
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      setTimeout(() => {
         for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = '0px';
         }
         body.style.paddingRight = '0px';
         document.documentElement.classList.remove("lock");
      }, delay);
      bodyLockStatus = false;
      setTimeout(function () {
         bodyLockStatus = true;
      }, delay);
   }
}
export let bodyLock = (delay = 500) => {
   let body = document.querySelector("body");
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      for (let index = 0; index < lock_padding.length; index++) {
         const el = lock_padding[index];
         el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      }
      body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      document.documentElement.classList.add("lock");

      bodyLockStatus = false;
      setTimeout(function () {
         bodyLockStatus = true;
      }, delay);
   }
}
// Модуль работы со спойлерами =======================================================================================================================================================================================================================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.

Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
export function spollers() {
   const spollersArray = document.querySelectorAll('[data-spollers]');
   if (spollersArray.length > 0) {
      // Получение обычных слойлеров
      const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
         return !item.dataset.spollers.split(",")[0];
      });
      // Инициализация обычных слойлеров
      if (spollersRegular.length) {
         initSpollers(spollersRegular);
      }
      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
      if (mdQueriesArray && mdQueriesArray.length) {
         mdQueriesArray.forEach(mdQueriesItem => {
            // Событие
            mdQueriesItem.matchMedia.addEventListener("change", function () {
               initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
         });
      }

      // Инициализация
      function initSpollers(spollersArray, matchMedia = false) {
         spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
               spollersBlock.classList.add('_spoller-init');
               initSpollerBody(spollersBlock);
               spollersBlock.addEventListener("click", setSpollerAction);
            } else {
               spollersBlock.classList.remove('_spoller-init');
               initSpollerBody(spollersBlock, false);
               spollersBlock.removeEventListener("click", setSpollerAction);
            }
         });
      }
      // Работа с контентом
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
         const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
         if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
               if (hideSpollerBody) {
                  spollerTitle.removeAttribute('tabindex');
                  if (!spollerTitle.classList.contains('_spoller-active')) {
                     spollerTitle.nextElementSibling.hidden = true;
                  }
               } else {
                  spollerTitle.setAttribute('tabindex', '-1');
                  spollerTitle.nextElementSibling.hidden = false;
               }
            });
         }
      }
      function setSpollerAction(e) {
         const el = e.target;
         const parentSpollerElement = closest(el, '[data-spollers]');
         const speedToggleSpoller = Number(parentSpollerElement.dataset.spollersSpeed);
         if (el.closest('[data-spoller]')) {
            const spollerTitle = el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
               if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
                  hideSpollersBody(spollersBlock);
               }
               spollerTitle.classList.toggle('_spoller-active');
               _slideToggle(spollerTitle.nextElementSibling, speedToggleSpoller);
            }
            e.preventDefault();
         }
      }
      function hideSpollersBody(spollersBlock) {
         const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
         if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_spoller-active');
            _slideUp(spollerActiveTitle.nextElementSibling, 100);
         }
      }
   }
}
// Модуь работы с табами =======================================================================================================================================================================================================================
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры" на неком размере экранов пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
export function tabs() {
   const tabs = document.querySelectorAll('[data-tabs]');

   console.log(tabs);
   let tabsActiveHash = [];

   if (tabs.length > 0) {
      const hash = location.hash.replace('#', '');
      if (hash.startsWith('tab-')) {
         tabsActiveHash = hash.replace('tab-', '').split('-');
      }
      tabs.forEach((tabsBlock, index) => {
         tabsBlock.classList.add('_tab-init');
         tabsBlock.setAttribute('data-tabs-index', index);
         tabsBlock.addEventListener("click", setTabsAction);
         initTabs(tabsBlock);
      });

      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(tabs, "tabs");
      if (mdQueriesArray && mdQueriesArray.length) {
         mdQueriesArray.forEach(mdQueriesItem => {
            // Событие
            mdQueriesItem.matchMedia.addEventListener("change", function () {
               setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
         });
      }
   }
   // Установка позиций заголовков
   function setTitlePosition(tabsMediaArray, matchMedia) {
      tabsMediaArray.forEach(tabsMediaItem => {
         tabsMediaItem = tabsMediaItem.item;
         const tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
         const tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
         const tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
         const tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
         tabsContentItems.forEach((tabsContentItem, index) => {
            if (matchMedia.matches) {
               tabsContent.append(tabsTitleItems[index]);
               tabsContent.append(tabsContentItem);
               tabsMediaItem.classList.add('_tab-spoller');
            } else {
               tabsTitles.append(tabsTitleItems[index]);
               tabsMediaItem.classList.remove('_tab-spoller');
            }
         });
      });
   }
   // Работа с контентом
   function initTabs(tabsBlock) {
      const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
      const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

      if (tabsActiveHashBlock) {
         const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
         tabsActiveTitle.classList.remove('_tab-active');
      }
      if (tabsContent.length > 0) {
         tabsContent.forEach((tabsContentItem, index) => {
            tabsTitles[index].setAttribute('data-tabs-title', '');
            tabsContentItem.setAttribute('data-tabs-item', '');

            if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
               tabsTitles[index].classList.add('_tab-active');
            }
            tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
         });
      }
   }
   function setTabsStatus(tabsBlock) {
      const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
      const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

      function isTabsAnamate(tabsBlock) {
         if (tabsBlock.hasAttribute('data-tabs-animate')) {
            return tabsBlock.dataset.tabsAnimate > 0 ? tabsBlock.dataset.tabsAnimate : 500;
         }
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);

      if (tabsContent.length > 0) {
         tabsContent.forEach((tabsContentItem, index) => {
            if (tabsTitles[index].classList.contains('_tab-active')) {
               if (tabsBlockAnimate) {
                  _slideDown(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = false;
               }
               if (!tabsContentItem.closest('.popup')) {
                  location.hash = `tab-${tabsBlockIndex}-${index}`;
               }
            } else {
               if (tabsBlockAnimate) {
                  _slideUp(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = true;
               }
            }
         });
      }
   }
   function setTabsAction(e) {
      console.log(e);
      const el = e.target;
      if (el.closest('[data-tabs-title]')) {
         const tabTitle = el.closest('[data-tabs-title]');
         const tabsBlock = tabTitle.closest('[data-tabs]');
         if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelectorAll('._slide').length) {

            const tabActiveTitle = tabsBlock.querySelector('[data-tabs-title]._tab-active');
            if (tabActiveTitle) {
               tabActiveTitle.classList.remove('_tab-active');
            }

            tabTitle.classList.add('_tab-active');
            setTabsStatus(tabsBlock);
         }
         e.preventDefault();
      }
   }
}
// Модуь работы с меню (бургер) =======================================================================================================================================================================================================================
export function menuInit() {
   let iconMenu = document.querySelector(".icon-menu");
   if (iconMenu) {
      iconMenu.addEventListener("click", function (e) {
         if (bodyLockStatus) {
            bodyLockToggle();
            document.documentElement.classList.toggle("menu-open");
         }
      });
   };
}
export function menuOpen() {
   bodyLock();
   document.documentElement.classList.add("menu-open");
}
export function menuClose() {
   bodyUnlock();
   document.documentElement.classList.remove("menu-open");
}
// Модуль "показать еще" =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне:
data-showmore-media = "768,min"
data-showmore="size/items"
data-showmore-content="размер/кол-во"
data-showmore-button="скорость"
Сниппет (HTML): showmore
*/
export function showMore() {
   const showMoreBlocks = document.querySelectorAll('[data-showmore]');
   let showMoreBlocksRegular;
   let mdQueriesArray;
   if (showMoreBlocks.length) {
      // Получение обычных объектов
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
         return !item.dataset.showmoreMedia;
      });
      // Инициализация обычных объектов
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

      document.addEventListener("click", showMoreActions);
      window.addEventListener("resize", showMoreActions);

      // Получение объектов с медиа запросами
      mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
      if (mdQueriesArray && mdQueriesArray.length) {
         mdQueriesArray.forEach(mdQueriesItem => {
            // Событие
            mdQueriesItem.matchMedia.addEventListener("change", function () {
               initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
         });
         initItemsMedia(mdQueriesArray);
      }
   }
   function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach(mdQueriesItem => {
         initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
   }
   function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach(showMoreBlock => {
         initItem(showMoreBlock, matchMedia);
      });
   }
   function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
      const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
      const showMoreButton = showMoreBlock.querySelector('[data-showmore-button]');
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
      if (matchMedia.matches || !matchMedia) {
         if (hiddenHeight < getOriginalHeight(showMoreContent)) {
            _slideUp(showMoreContent, 0, hiddenHeight);
            showMoreButton.hidden = false;
         } else {
            _slideDown(showMoreContent, 0, hiddenHeight);
            showMoreButton.hidden = true;
         }
      } else {
         _slideDown(showMoreContent, 0, hiddenHeight);
         showMoreButton.hidden = true;
      }
   }
   function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
      if (showMoreType === 'items') {
         const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
         const showMoreItems = showMoreContent.children;
         for (let index = 1; index < showMoreItems.length; index++) {
            const showMoreItem = showMoreItems[index - 1];
            hiddenHeight += showMoreItem.offsetHeight;
            if (index === showMoreTypeValue) break;
         }
      } else {
         const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
         hiddenHeight = showMoreTypeValue;
      }
      return hiddenHeight;
   }
   function getOriginalHeight(showMoreContent) {
      let hiddenHeight = showMoreContent.offsetHeight;
      showMoreContent.style.removeProperty('height');
      let originalHeight = showMoreContent.offsetHeight;
      showMoreContent.style.height = `${hiddenHeight}px`;
      return originalHeight;
   }
   function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;
      if (targetType === 'click') {
         if (targetEvent.closest('[data-showmore-button]')) {
            const showMoreButton = targetEvent.closest('[data-showmore-button]');
            const showMoreBlock = showMoreButton.closest('[data-showmore]');
            const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
            const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
            const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
            if (!showMoreContent.classList.contains('_slide')) {
               showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
               showMoreBlock.classList.toggle('_showmore-active');
            }
         }
      } else if (targetType === 'resize') {
         showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
         mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
      }
   }
}
// Модуль попапов ===========================================================================================================================================================================================================================
/*
Документация по работе в шаблоне:
data-popup - Атрибут для кнопки, которая вызывает попап
data-close - Атрибут для кнопки, которая закрывает попап
data-youtube - Атрибут для кода youtube
Сниппет (HTML): pl
*/
import { Popup } from "../libs/popup.js";
export const initPopups = () => new Popup({});

// Модуль параллакса мышью ===========================================================================================================================================================================================================================
/*
Документация по работе в шаблоне:
Сниппет (HTML): 
*/
import { MousePRLX } from "../libs/parallax-mouse.js";
export const initParallaxMouse = () => new MousePRLX({});

//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================

// FLS (Full Logging System)
export function FLS(message) {
   setTimeout(() => {
      if (window.FLS) {
         console.log(message);
      }
   }, 0);
}
// Получить цифры из строки
export function getDigFromString(item) {
   return parseInt(item.replace(/[^\d]/g, ''))
}
// Форматирование цифр типа 100 000 000
export function getDigFormat(item) {
   return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
export function removeClasses(array, className) {
   for (var i = 0; i < array.length; i++) {
      array[i].classList.remove(className);
   }
}
// Уникализация массива
export function uniqArray(array) {
   return array.filter(function (item, index, self) {
      return self.indexOf(item) === index;
   });
}
// Функция получения индекса внутри родителя
export function indexInParent(parent, element) {
   const array = Array.prototype.slice.call(parent.children);
   return Array.prototype.indexOf.call(array, element);
};
// Обработа медиа запросов из атрибутов 
export function dataMediaQueries(array, dataSetValue) {
   // Получение объектов с медиа запросами
   const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue]) {
         return item.dataset[dataSetValue].split(",")[0];
      }
   });
   // Инициализация объектов с медиа запросами
   if (media.length) {
      const breakpointsArray = [];
      media.forEach(item => {
         const params = item.dataset[dataSetValue];
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });
      // Получаем уникальные брейкпоинты
      let mdQueries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = []

      if (mdQueries.length) {
         // Работаем с каждым брейкпоинтом
         mdQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
            // Объекты с нужными условиями
            const itemsArray = breakpointsArray.filter(function (item) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true;
               }
            });
            mdQueriesArray.push({
               itemsArray,
               matchMedia
            })
         });
         return mdQueriesArray;
      }
   }
}
//================================================================================================================================================================================================================================================================================================================