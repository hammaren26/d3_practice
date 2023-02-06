import { IsElem, isTouchDevice, _closest, CloseMapSignHandler } from "./functions.js";

const windowHeight = window.screen.height;
const windowWidth = window.screen.width;

window.InitMainMap = function () {

   ymaps.ready(init);
   var myMap;

   function init() {
      if ($('#main_map').length) {
         $('#main_map').html('');
         myMap = new ymaps.Map('main_map', {
            // center: [55.007626692836006, 73.34148473033132],
            center: [55.00724438199162, 73.33601302394094],
            zoom: zoomValue ? zoomValue : 16,

         }, {
            searchControlProvider: 'yandex#search',
            minZoom: minZoomValue,
            maxZoom: maxZoomValue
         });

         // =======================================================
         const placemarkData = [
            { name: "Пятый театр 500м (6 мин)", icon: "../img/map_icons/5teatr.svg", coords: [55.012527, 73.329225], },
            { name: "Остановка транспорта 200 м (2 мин)", icon: "../img/map_icons/ostanovka.svg", coords: [55.012167943891896, 73.3342454482001] },
            { name: "Сквер 450 м (4 мин)", icon: "../img/map_icons/skver.svg", coords: [55.012142003891924, 73.33736515343953] },
            { name: "Дендрологический сад 800м (8 мин)", icon: "../img/map_icons/skver.svg", coords: [55.01080358993219, 73.34232602102465] },
            { name: "Панорамный вид на реку", icon: "../img/map_icons/vinareku.svg", coords: [55.01036442474175, 73.32556313761889] },
            { name: "Детский сад 320 мест (перспектива) 100 м (1 мин)", icon: "../img/map_icons/detsad.svg", coords: [55.011221494898784, 73.33092489606109] },
            { name: "Набереженая 300 м (3 мин)", icon: "../img/map_icons/vinareku.svg", coords: [55.00877697347733, 73.33119571632584] },
            { name: "Медицинский центр Поликлиника 1 км (11 мин)", icon: "../img/map_icons/poliklinika.svg", coords: [55.007626692836006, 73.34148473033132] },
            { name: "Парк отдыха \"Зелёный остров\" 1 км (11 мин)", icon: "../img/map_icons/park.svg", coords: [55.00573360176214, 73.33285874613937], active: true },
            { name: "Медицинский центр \"ЕВРОМЕД\" 1 км (11 мин)", icon: "../img/map_icons/poliklinika.svg", coords: [55.00477160578772, 73.3374185014647] },
            { name: "Школа 800 мест (Перспектива) 1,5 км (18 мин)", icon: "../img/map_icons/book.svg", coords: [55.00289071337889, 73.34564751872239] }
         ];

         let ratio = 0;
         for (const key in placemarkData) {
            let activeElClass = placemarkData[key].active && windowWidth < 768 ? 'active' : '';
            let onMapSignText = document.querySelector('.section_map__msign_text');

            if (placemarkData[key].active) {
               onMapSignText.innerHTML = placemarkData[key].name;
            }

            // Создание метки с квадратной активной областью.
            var squareLayout = ymaps.templateLayoutFactory
               .createClass(`
                  <div class="placemark ${activeElClass} js-anim-element" data-class-animate="zoomIn" data-delay="${ratio}">
                     <div class="placemark__picture">
                     <img src="${placemarkData[key]['icon']}" alt="">
                     </div>
         
                     <div class="placemark__text">
                        ${placemarkData[key]['name']}
                     </div>
                  </div>
               `);
            var squarePlacemark = new ymaps.Placemark(
               placemarkData[key]['coords'], {
               // hintContent: 'Метка с прямоугольным HTML макетом'
            }, {
               iconLayout: squareLayout,
               // Описываем фигуру активной области "Прямоугольник".
               iconShape: {
                  type: 'Rectangle',
                  // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
                  coordinates: [[0, 0], [60, 60]],
                  draggable: false,
                  iconImageOffset: [-60, -60]
               }
            }
            );


            if (isTouchDevice()) {
               myMap.behaviors
                  .disable('drag')
                  .enable('multiTouch');
            }


            myMap.geoObjects.add(squarePlacemark);

            if (isTouchDevice()) {
               squarePlacemark.events.add('click', function (e) {
                  let _this = e.get('target').getOverlaySync().getLayoutSync().getElement(); // Родительский контейнер html.
                  let pinner = _this.children[0]; // Вложенный элемент.
                  document.querySelectorAll('.placemark').forEach(el => el.classList.remove('active'))
                  pinner.classList.toggle('active');

                  if (windowWidth < 768) {
                     let sectionMapBlock = _closest(_this, '.section_map__inner');
                     let sectionMapMobileSign = sectionMapBlock.querySelector('.section_map__msign');
                     let currentPlacemarkText = pinner.querySelector('.placemark__text').innerHTML;
                     sectionMapMobileSign.classList.add('active')
                     sectionMapMobileSign.querySelector('.section_map__msign_text').innerHTML = currentPlacemarkText
                  }
               })
            } else {
               squarePlacemark.events.add('mouseenter', function (e) {
                  let _this = e.get('target').getOverlaySync().getLayoutSync().getElement(); // Родительский контейнер html.
                  let pinner = _this.children[0]; // Вложенный элемент.
                  pinner.classList.add('active')
               })
               squarePlacemark.events.add('mouseleave', function (e) {
                  let _this = e.get('target').getOverlaySync().getLayoutSync().getElement(); // Родительский контейнер html.
                  let pinner = _this.children[0]; // Вложенный элемент.
                  pinner.classList.remove('active')
               })
            }

            ratio = ratio + 100

         }

         // =======================================================
         var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="logo_map"></div>'
         )
         var myImgPlacemark = new ymaps.Placemark([55.010717116909774, 73.33281886927456], {
         }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: '../img/map_icons/map_logo.svg',
            // Размеры метки.
            iconImageSize: isTouchDevice() ? [65, 42] : [99, 97],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
         });


         myImgPlacemark.events.add('mouseenter', function (e) {
            // console.log(myImgPlacemark);
         })

         myMap.controls.remove('searchControl');
         myMap.controls.remove('geolocationControl');
         myMap.controls.remove('rulerControl');
         myMap.geoObjects.add(myImgPlacemark);




         myMap.events.add('click', function (e) {
            var coords = e.get('coords');
            // console.log(coords);
         });


         myMap.events.add('boundschange', function () {
            // console.log(myMap.getZoom());
         })

         // myMap.controls.remove('zoomControl');

         myMap.behaviors.disable('scrollZoom');
         var ctrlKey = false;
         var ctrlMessVisible = false;
         var timer;

         // Отслеживаем скролл мыши на карте, чтобы показывать уведомление
         // myMap.events.add(['wheel', 'mousedown'], function (e) {
         //    if (e.get('type') == 'wheel') {
         //       if (!ctrlKey) { // Ctrl не нажат, показываем уведомление
         //          $('#ymap_ctrl_display').fadeIn(300);
         //          ctrlMessVisible = true;
         //          clearTimeout(timer); // Очищаем таймер, чтобы продолжать показывать уведомление
         //          timer = setTimeout(function () {
         //             $('#ymap_ctrl_display').fadeOut(300);
         //             ctrlMessVisible = false;
         //          }, 1500);
         //       }
         //       else { // Ctrl нажат, скрываем сообщение
         //          $('#ymap_ctrl_display').fadeOut(100);
         //       }
         //    }
         //    if (e.get('type') == 'mousedown' && ctrlMessVisible) { // Скрываем уведомление при клике на карте
         //       $('#ymap_ctrl_display').fadeOut(100);
         //    }
         // });

         // Обрабатываем нажатие на Ctrl
         $(document).keydown(function (e) {
            if (e.which === 17 && !ctrlKey) { // Ctrl нажат: включаем масштабирование мышью
               ctrlKey = true;
               myMap.behaviors.enable('scrollZoom');
            }
         });
         $(document).keyup(function (e) { // Ctrl не нажат: выключаем масштабирование мышью
            if (e.which === 17) {
               ctrlKey = false;
               myMap.behaviors.disable('scrollZoom');
            }
         });
      }
   }
};

let minZoomValue = 16;
let maxZoomValue = 20;
let zoomValue;

document.addEventListener("DOMContentLoaded", function (event) {
   if (IsElem(".map_box")) {
      if (windowWidth <= 1440) {
         minZoomValue = 15
         maxZoomValue = 20
      }

      if (windowWidth <= 768) {
         minZoomValue = 14
         maxZoomValue = 16
         zoomValue = 15.5
      }

      InitMainMap();
   }
});


