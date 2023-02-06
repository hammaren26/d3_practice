// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
import {
   _closest,
   toggleFocusInputs,
   IsElem,
   SetHandlerPopupLinks,
   PhoneMask,
   ShowPopup,
   ClosePopup,
   OnClickCloseJq,
   sleep,
   getTranslateCoords,
   GetViewportDifference,
   CloseMapSignHandler
} from "./functions.js";



// import { SVG } from '@svgdotjs/svg.js';


import {
   CloseMapFloorData,
   SetHeightSlider,
   ShowMenu,
   CloseMenu,
   ShowPantrieRow,
   HidePantrieRow
} from "./local_functions.js"

import jQuery, { contains, map } from "jquery";
import "selectric/src/jquery.selectric.js";
import WOW from 'wow.js';
import Swiper, { Autoplay, Navigation, Pagination, Parallax } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import lightGallery from 'lightgallery';
import 'lightgallery/css/lightgallery-bundle.min.css';
// import 'lightgallery/scss/lightgallery-bundle.scss';
// Plugins
import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.umd.js';
import Pager from 'lightgallery/plugins/pager/lg-pager.umd.js';
import inputmask from "inputmask/dist/jquery.inputmask.js";
// svg layer openlayer.js
import Layer from 'ol/layer/Layer.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import * as olEvents from 'ol/events.js';
import { composeCssTransform } from 'ol/transform.js';
import { getCenter } from 'ol/extent.js';


// Объявление глобальныъх переменных и функций
window.$ = window.jQuery = jQuery;
window.PhoneMask = PhoneMask;
window.ShowPopup = ShowPopup;
window.ClosePopup = ClosePopup;
window.DOCUMENT = document;
window.lightGallery = lightGallery;
window.lgZoom = lgZoom;
window.Pager = Pager;
window.SetGallery = function (selector, arImg) {
   const $dynamicGallery = document.querySelector(selector);
   const dynamicGallery = lightGallery($dynamicGallery, {
      dynamic: true,
      thumbnail: false,
      plugins: [lgZoom, Pager],
      pager: false,
      licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
      dynamicEl: arImg
   });

   $dynamicGallery.addEventListener('click', function () {
      dynamicGallery.openGallery();
   });
}

$(function () {


   // Вызов глобальных констант для текущего файла==============================================================
   const windowHeight = window.screen.height;
   const windowWidth = window.screen.width;




   function InitMapSvgApartment() {
      const map = new Map({
         target: 'map'
      });

      const xPos = map.getView().viewportSize_[0]
      const yPos = map.getView().viewportSize_[1]

      const view = new View({
         // center: [0, 0],
         center: [0, 0],
         constrainOnlyCenter: true,
         smoothExtentConstraint: false,
         extent: [-xPos / 4, -yPos / 4, xPos / 4, yPos / 4],
         zoom: 2.2,
         minZoom: 1,
         // zoomFactor: 2.12,
         maxZoom: 4,
         projection: 'EPSG:4326',
         // showFullExtent: false
      })
      map.setView(view);


      // map.once('postrender', function (event) {
      //    const rooms = document.querySelectorAll('a.room');

      //    console.log(rooms);
      //    // rooms.forEach(room => {
      //    //    rooms.forEach(text => {


      //    //       room.classList.add('show');
      //    //    });
      //    // })
      // });




      // const extentValue = map.getView().calculateExtent(map.getSize())
      // console.log(extentValue);
      // console.log('getSize:', map.getSize());


      const svgContainer = document.createElement('div');
      const xhr = new XMLHttpRequest();
      // xhr.open('GET', '../files/maps_svg/1-11.svg');
      xhr.open('GET', '../files/maps_svg/12-14.svg');
      xhr.addEventListener('load', function () {
         const svg = xhr.responseXML.documentElement;
         svgContainer.ownerDocument.importNode(svg);
         svgContainer.appendChild(svg);
      });
      xhr.send();
      xhr.onload = function () {
         const rooms = document.querySelectorAll('a.room');
         rooms.forEach(room => {
            const textEls = room.querySelectorAll('text');
            textEls.forEach(text => {
               const tspan1 = text.querySelector('tspan:nth-child(1)');
               const tspan2 = text.querySelector('tspan:nth-child(2)');
               const tspan1Width = tspan1.getComputedTextLength();
               const tspan2Width = tspan2.getComputedTextLength();

               tspan2.setAttribute("dx", `${-(tspan1Width / 2) - (tspan2Width / 2)}`);
               room.classList.add('show');
            });
         })
         // ------------------------------Хавер на foreignObject btn-------------------------------------------
         const mapBtns = document.querySelectorAll('.map_btns_wrap foreignObject .map_btn');
         mapBtns.forEach((btn, index) => {
            const thisBgck = btn.dataset.bgck;
            const parent = _closest(btn, "foreignObject")
            const mapFloorData = parent.querySelector('.map_floor_data');
            const mapFloorDataClose = parent.querySelector('.map_floor_data__close');

            if (index > 0) {
               const mapFloorDataHeight = mapFloorData.offsetHeight
               const mapFloorDataWeight = mapFloorData.offsetWidth
               const btnWidth = btn.offsetWidth
               const btnHeight = btn.offsetHeight
               parent.setAttribute('width', btnWidth)
               parent.setAttribute('height', btnHeight + mapFloorDataHeight + 8)
            }



            btn.querySelector('.map_btn__num').style.backgroundColor = thisBgck;

            btn.addEventListener('mouseover', function () {
               btn.querySelector('.map_btn__value').style.backgroundColor = thisBgck;
               btn.querySelector('.map_btn__value').style.color = "#ffffff";
            })

            btn.addEventListener('mouseout', function () {
               if (!btn.classList.contains('active')) {
                  btn.querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
                  btn.querySelector('.map_btn__value').style.color = "#2c2c2c";
               }
            });

            btn.addEventListener('click', function (e) {
               CloseMapFloorData();
               btn.classList.toggle('active');
               btn.querySelector('.map_btn__value').style.backgroundColor = thisBgck;
               btn.querySelector('.map_btn__value').style.color = "#ffffff";
               mapFloorData.classList.toggle('active');

            });

            mapFloorDataClose.addEventListener('click', function (e) {
               btn.querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
               btn.querySelector('.map_btn__value').style.color = "#2c2c2c";
               btn.classList.remove('active');
               mapFloorData.classList.remove('active');

            });

            // ! доработать или создать новую чтоб по клику вне блока закрывались все окна а не только первое
            // OnClickCloseJq('.map_btns_wrap foreignObject', ['.map_btn', '.map_floor_data'], function (e) {
            //    btn.querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
            //    btn.querySelector('.map_btn__value').style.color = "#2c2c2c";
            // });
         })
      };


      const width = document.querySelector('.cmap__work_area').offsetWidth;
      const height = document.querySelector('.cmap__work_area').offsetHeight;
      // const width = 978;
      // const height = 797;



      const svgResolution = 360 / width;
      svgContainer.style.width = width + 'px';
      svgContainer.style.height = height + 'px';
      svgContainer.style.transformOrigin = 'top left';
      svgContainer.className = 'svg-layer';



      const layer = new Layer({
         render: function (frameState) {
            const scale = svgResolution / frameState.viewState.resolution;
            const center = frameState.viewState.center;
            const size = frameState.size;
            const cssTransform = composeCssTransform(
               size[0] / 2,
               size[1] / 2,
               scale,
               scale,
               frameState.viewState.rotation,
               -center[0] / svgResolution - width / 2,
               center[1] / svgResolution - height / 2
            );

            svgContainer.style.transform = cssTransform;
            svgContainer.style.opacity = this.getOpacity();
            return svgContainer;
         },
      })
      map.addLayer(
         layer
      );
   }
   function InitMapSvgParking() {
      const map = new Map({
         target: 'parking_map'
      });

      const xPos = map.getView().viewportSize_[0]
      const yPos = map.getView().viewportSize_[1]

      const view = new View({
         // center: [0, 0],
         center: [0, 0],
         constrainOnlyCenter: true,
         smoothExtentConstraint: false,
         extent: [-xPos / 4, -yPos / 4, xPos / 4, yPos / 4],
         zoom: 2,
         minZoom: 1,
         // zoomFactor: 2.12,
         maxZoom: 4,
         projection: 'EPSG:4326',
         // showFullExtent: false
      })
      map.setView(view);


      // map.once('postrender', function (event) {
      //    const rooms = document.querySelectorAll('a.room');

      //    console.log(rooms);
      //    // rooms.forEach(room => {
      //    //    rooms.forEach(text => {


      //    //       room.classList.add('show');
      //    //    });
      //    // })
      // });




      // const extentValue = map.getView().calculateExtent(map.getSize())
      // console.log(extentValue);
      // console.log('getSize:', map.getSize());


      const svgContainer = document.createElement('div');
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '../files/maps_svg/parking.svg');
      xhr.addEventListener('load', function () {
         const svg = xhr.responseXML.documentElement;
         svgContainer.ownerDocument.importNode(svg);
         svgContainer.appendChild(svg);
      });
      xhr.send();
      xhr.onload = function () {
         // ---------------------------------интерактив в паркинге (хавер, клик)----------------------------------------
         const parkingPlacesItemsAll = document.querySelectorAll('.parking_places__item');
         const pantriesItemAll = document.querySelectorAll('.pantries__item');
         const parkingVdClose = document.querySelector('.parking_vd__close');




         parkingPlacesItemsAll.forEach((parkingPlacesItem, index) => {

            parkingPlacesItem.addEventListener('click', function (e) {
               this.classList.add('active');
               let placeItemX = this.querySelector(".parking_places__item_bord").getAttribute('x')
               let placeItemY = this.querySelector(".parking_places__item_bord").getAttribute('y')
               const parkingItemInfo = document.querySelector('.parking_vd');







               // значения текущего парк. места
               const currentSquare = this.dataset.parkingSquare
               const currentPrice = this.dataset.parkingPrice
               const currentRefersStorage = this.dataset.refersStorage



               // если есть номер привязанной кладовой то выполняем эту часть кода
               if (currentRefersStorage) {
                  // получаем кладовую которая привзяана в парк месту
                  let currentPantrie;
                  let currentPantrieIndex;
                  let currentPantrieSquare;

                  pantriesItemAll.forEach((el, index) => {
                     if (el.dataset.storage && el.dataset.storage == currentRefersStorage) {
                        // значения привзяанной кладовой

                        currentPantrie = el.dataset.storage
                        currentPantrieIndex = index + 1
                        currentPantrieSquare = el.dataset.pantrieSquare
                     }
                  })


                  console.log(currentPantrieSquare);
                  // показываем блок с привяз кладовой
                  ShowPantrieRow(currentPantrieSquare, currentPantrieIndex)
               } else {
                  HidePantrieRow()
               }




               // console.log({
               //    currentPrice,
               //    currentSquare,
               //    currentRefersStorage
               // });






               parkingItemInfo.querySelector(".parking_vd__square").innerHTML = `${currentSquare} м<sup><small>2</small></sup>`
               parkingItemInfo.querySelector(".parking_vd__price").innerHTML = currentPrice
               parkingItemInfo.querySelector(".parking_vd__p_num").innerHTML = `№${index + 1}`


               parkingItemInfo.classList.add('active');

               if (this.classList.contains('vertical') || this.classList.contains('vertical_down')) {
                  placeItemX = Number(placeItemX) + 56
               }

               if (this.classList.contains('horizontal')) {
                  placeItemX = Number(placeItemX) + 120
               }

               if (this.classList.contains('rotate')) {
                  placeItemY = Number(placeItemY) + 45
               }

               parkingItemInfo.setAttribute('x', placeItemX)
               parkingItemInfo.setAttribute('y', placeItemY)

            })



            parkingPlacesItem.addEventListener('mouseover', function (e) {
               this.classList.add('hover');
               const numBord = this.querySelector('.parking_places__num_bord')
               numBord.setAttribute('transform', `${resetScaleSvg(this)} scale(1.2)`)


               // значения текущего парк. места
               const currentSquare = this.dataset.parkingSquare
               const currentPrice = this.dataset.parkingPrice
               const currentRefersStorage = this.dataset.refersStorage


               // ! сделать функцию получения элемента кладовой которая привзяна к парк. месту при каком либо событии
               if (currentRefersStorage) {
                  let currentPantrie;
                  pantriesItemAll.forEach((el, index) => {
                     if (el.dataset.storage && el.dataset.storage == currentRefersStorage) {
                        currentPantrie = el
                     }
                  })
                  currentPantrie.classList.add('hover');
               }
            })


            parkingPlacesItem.addEventListener('mouseout', function (e) {
               this.classList.remove('hover');
               const numBord = this.querySelector('.parking_places__num_bord')
               resetScaleSvg(this)



               // значения текущего парк. места
               const currentSquare = this.dataset.parkingSquare
               const currentPrice = this.dataset.parkingPrice
               const currentRefersStorage = this.dataset.refersStorage

               // ! сделать функцию получения элемента кладовой которая привзяна к парк. месту при каком либо событии
               if (currentRefersStorage) {
                  let currentPantrie;
                  pantriesItemAll.forEach((el, index) => {
                     if (el.dataset.storage && el.dataset.storage == currentRefersStorage) {
                        currentPantrie = el
                     }
                  })
                  currentPantrie.classList.remove('hover');
               }
            })
         })

         parkingVdClose.addEventListener('click', function (e) {
            _closest(this, '.parking_vd').classList.remove('active');
            HidePantrieRow()
         })



         // ------------------------------Выравнивание элементов в паркинге -------------------------------------------
         // const carsElements = document.querySelectorAll('.parking_places__item image');
         // carsElements.forEach(el => {
         //    const elWidth = el.getBBox().width
         //    const elHeight = el.getBBox().height
         //    el.style.transformOrigin = `${elWidth / 2}px ${elHeight / 2}px`
         // })

         const parkingPlacesItems = document.querySelectorAll('.parking_places__item.vertical_down');
         parkingPlacesItems.forEach(parkingPlacesItem => {
            const posX = Number(parkingPlacesItem.querySelector('.parking_places__item_bord').getAttribute('x'));
            const posY = Number(parkingPlacesItem.querySelector('.parking_places__item_bord').getAttribute('y'));
            parkingPlacesItem.querySelector('image').setAttribute('x', posX + 5)
            parkingPlacesItem.querySelector('image').setAttribute('y', posY + 8)
         });

         const parkingPlacesItemsVert = document.querySelectorAll('.parking_places__item.vertical');
         parkingPlacesItemsVert.forEach(parkingPlacesItem => {
            const posX = Number(parkingPlacesItem.querySelector('.parking_places__item_bord').getAttribute('x'));
            const posY = Number(parkingPlacesItem.querySelector('.parking_places__item_bord').getAttribute('y'));
            parkingPlacesItem.querySelector('image').setAttribute('x', posX + 5)
            parkingPlacesItem.querySelector('image').setAttribute('y', posY + 8)
         });

         const parkingPlacesItemsHoriz = document.querySelectorAll('.parking_places__item.horizontal');
         parkingPlacesItemsHoriz.forEach(parkingPlacesItem => {
            const posX = Number(parkingPlacesItem.querySelector('.parking_places__item_bord').getAttribute('x'));
            const posY = Number(parkingPlacesItem.querySelector('.parking_places__item_bord').getAttribute('y'));
            const currentImgage = parkingPlacesItem.querySelector('image');
            currentImgage.setAttribute('x', posX - currentImgage.getBBox().width + 9);
            currentImgage.setAttribute('y', posY - currentImgage.getBBox().height / 2);

         });

         // тачки под углом
         const parkingPlacesItemsRot = document.querySelectorAll('.parking_places__item.rotate');
         parkingPlacesItemsRot.forEach(parkingPlacesItem => {
            const posX = Number(parkingPlacesItem.querySelector('.parking_places__item_bord').getAttribute('x'));
            const posY = Number(parkingPlacesItem.querySelector('.parking_places__item_bord').getAttribute('y'));
            parkingPlacesItem.querySelector('image').setAttribute('x', posX - 2);
            parkingPlacesItem.querySelector('image').setAttribute('y', posY + 6);


         });

         const pantriesItems = document.querySelectorAll('.pantries__item');
         pantriesItems.forEach(pantriesItem => {
            const pantriesText = pantriesItem.querySelector('text')
            const pantriesItemWidth = pantriesItem.getBBox().width;
            const pantriesTextWidth = pantriesText.getBBox().width;

            const pantriesItemHeight = pantriesItem.getBBox().height;
            const pantriesTextHeight = pantriesText.getBBox().height;

            pantriesText.setAttribute("x", (16 / 2) - (pantriesTextWidth / 2));
            pantriesText.setAttribute("y", 12);
         })

      }


      const width = document.querySelector('.parking_map__work_area').offsetWidth;
      const height = document.querySelector('.parking_map__work_area').offsetHeight;
      // const width = 978;
      // const height = 797;



      const svgResolution = 360 / width;
      svgContainer.style.width = width + 'px';
      svgContainer.style.height = height + 'px';
      svgContainer.style.transformOrigin = 'top left';
      svgContainer.className = 'svg-layer';



      const layer = new Layer({
         render: function (frameState) {
            const scale = svgResolution / frameState.viewState.resolution;
            const center = frameState.viewState.center;
            const size = frameState.size;
            const cssTransform = composeCssTransform(
               size[0] / 2,
               size[1] / 2,
               scale,
               scale,
               frameState.viewState.rotation,
               -center[0] / svgResolution - width / 2,
               center[1] / svgResolution - height / 2
            );

            svgContainer.style.transform = cssTransform;
            svgContainer.style.opacity = this.getOpacity();
            return svgContainer;
         },
      })
      map.addLayer(
         layer
      );
   }
   function InitMapSvgCommercial() {
      const map = new Map({
         target: 'commercial_map'
      });

      const xPos = map.getView().viewportSize_[0]
      const yPos = map.getView().viewportSize_[1]

      const view = new View({
         // center: [0, 0],
         center: [0, 0],
         constrainOnlyCenter: true,
         smoothExtentConstraint: false,
         extent: [-xPos / 4, -yPos / 4, xPos / 4, yPos / 4],
         zoom: 2,
         minZoom: 1,
         // zoomFactor: 2.12,
         maxZoom: 4,
         projection: 'EPSG:4326',
         // showFullExtent: false
      })
      map.setView(view);


      // map.once('postrender', function (event) {
      //    const rooms = document.querySelectorAll('a.room');

      //    console.log(rooms);
      //    // rooms.forEach(room => {
      //    //    rooms.forEach(text => {


      //    //       room.classList.add('show');
      //    //    });
      //    // })
      // });




      // const extentValue = map.getView().calculateExtent(map.getSize())
      // console.log(extentValue);
      // console.log('getSize:', map.getSize());


      const svgContainer = document.createElement('div');
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '../files/maps_svg/commercial.svg');
      xhr.addEventListener('load', function () {
         const svg = xhr.responseXML.documentElement;
         svgContainer.ownerDocument.importNode(svg);
         svgContainer.appendChild(svg);
      });
      xhr.send();
      xhr.onload = function () {
         SetValuesOnInfoBlock('.cf_info_item.cf_info_item--commercial');
         SetValuesOnInfoBlock('.room.room--commercial');



         // ------------------------------Хавер на foreignObject btn-------------------------------------------
         const mapBtns = document.querySelectorAll('.map_btns_wrap foreignObject .map_btn');
         mapBtns.forEach((btn, index) => {
            const thisBgck = btn.dataset.bgck;
            const parent = _closest(btn, "foreignObject")
            const mapFloorData = parent.querySelector('.map_floor_data');
            const mapFloorDataClose = parent.querySelector('.map_floor_data__close');


            // задаём ширину foreignObject чтоб клик корректно отрабатывал
            if (index == 0 || index == 1) {
               const mapFloorDataHeight = mapFloorData.offsetHeight
               const mapFloorDataWeight = mapFloorData.offsetWidth
               const btnWidth = btn.offsetWidth
               const btnHeight = btn.offsetHeight
               parent.setAttribute('width', mapFloorDataWeight)
               parent.setAttribute('height', btnHeight + mapFloorDataHeight + 8)
            }



            btn.querySelector('.map_btn__num').style.backgroundColor = thisBgck;

            btn.addEventListener('mouseover', function () {
               btn.querySelector('.map_btn__value').style.backgroundColor = thisBgck;
               btn.querySelector('.map_btn__value').style.color = "#ffffff";
            })

            btn.addEventListener('mouseout', function () {
               if (!btn.classList.contains('active')) {
                  btn.querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
                  btn.querySelector('.map_btn__value').style.color = "#2c2c2c";
               }
            });

            btn.addEventListener('click', function (e) {
               CloseMapFloorData();
               btn.classList.toggle('active');
               btn.querySelector('.map_btn__value').style.backgroundColor = thisBgck;
               btn.querySelector('.map_btn__value').style.color = "#ffffff";
               mapFloorData.classList.toggle('active');

            });

            mapFloorDataClose.addEventListener('click', function (e) {
               btn.querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
               btn.querySelector('.map_btn__value').style.color = "#2c2c2c";
               btn.classList.remove('active');
               mapFloorData.classList.remove('active');

            });

            // ! доработать или создать новую чтоб по клику вне блока закрывались все окна а не только первое
            // OnClickCloseJq('.map_btns_wrap foreignObject', ['.map_btn', '.map_floor_data'], function (e) {
            //    btn.querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
            //    btn.querySelector('.map_btn__value').style.color = "#2c2c2c";
            // });
         })
      }


      // const width = document.querySelector('.parking_map__work_area').offsetWidth;
      // const height = document.querySelector('.parking_map__work_area').offsetHeight;
      const width = 978;
      const height = 797;



      const svgResolution = 360 / width;
      svgContainer.style.width = width + 'px';
      svgContainer.style.height = height + 'px';
      svgContainer.style.transformOrigin = 'top left';
      svgContainer.className = 'svg-layer';



      const layer = new Layer({
         render: function (frameState) {
            const scale = svgResolution / frameState.viewState.resolution;
            const center = frameState.viewState.center;
            const size = frameState.size;
            const cssTransform = composeCssTransform(
               size[0] / 2,
               size[1] / 2,
               scale,
               scale,
               frameState.viewState.rotation,
               -center[0] / svgResolution - width / 2,
               center[1] / svgResolution - height / 2
            );

            svgContainer.style.transform = cssTransform;
            svgContainer.style.opacity = this.getOpacity();
            return svgContainer;
         },
      })
      map.addLayer(
         layer
      );

   }
   function InitMapSvgCurrentRoom() {
      const map = new Map({
         target: 'current_room_map'
      });

      const xPos = map.getView().viewportSize_[0]
      const yPos = map.getView().viewportSize_[1]

      const view = new View({
         // center: [0, 0],
         center: [0, 0],
         constrainOnlyCenter: true,
         smoothExtentConstraint: false,
         extent: [-xPos / 4, -yPos / 4, xPos / 4, yPos / 4],
         zoom: 2,
         minZoom: 1,
         // zoomFactor: 2.12,
         maxZoom: 4,
         projection: 'EPSG:4326',
         // showFullExtent: false
      })
      map.setView(view);


      // map.once('postrender', function (event) {
      //    const rooms = document.querySelectorAll('a.room');

      //    console.log(rooms);
      //    // rooms.forEach(room => {
      //    //    rooms.forEach(text => {


      //    //       room.classList.add('show');
      //    //    });
      //    // })
      // });




      // const extentValue = map.getView().calculateExtent(map.getSize())
      // console.log(extentValue);
      // console.log('getSize:', map.getSize());


      const svgContainer = document.createElement('div');
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '../files/maps_svg/current_room.svg');
      xhr.addEventListener('load', function () {
         const svg = xhr.responseXML.documentElement;
         svgContainer.ownerDocument.importNode(svg);
         svgContainer.appendChild(svg);
      });
      xhr.send();
      xhr.onload = function () {
         SetValuesOnInfoBlock('.cf_info_item.cf_info_item--commercial');
         SetValuesOnInfoBlock('.room.room--commercial');



         // ------------------------------Хавер на foreignObject btn-------------------------------------------
         const mapBtns = document.querySelectorAll('.map_btns_wrap foreignObject .map_btn');
         mapBtns.forEach((btn, index) => {
            const thisBgck = btn.dataset.bgck;
            const parent = _closest(btn, "foreignObject")
            const mapFloorData = parent.querySelector('.map_floor_data');
            const mapFloorDataClose = parent.querySelector('.map_floor_data__close');


            // задаём ширину foreignObject чтоб клик корректно отрабатывал
            if (index == 0 || index == 1) {
               const mapFloorDataHeight = mapFloorData.offsetHeight
               const mapFloorDataWeight = mapFloorData.offsetWidth
               const btnWidth = btn.offsetWidth
               const btnHeight = btn.offsetHeight
               parent.setAttribute('width', mapFloorDataWeight)
               parent.setAttribute('height', btnHeight + mapFloorDataHeight + 8)
            }



            btn.querySelector('.map_btn__num').style.backgroundColor = thisBgck;

            btn.addEventListener('mouseover', function () {
               btn.querySelector('.map_btn__value').style.backgroundColor = thisBgck;
               btn.querySelector('.map_btn__value').style.color = "#ffffff";
            })

            btn.addEventListener('mouseout', function () {
               if (!btn.classList.contains('active')) {
                  btn.querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
                  btn.querySelector('.map_btn__value').style.color = "#2c2c2c";
               }
            });

            btn.addEventListener('click', function (e) {
               CloseMapFloorData();
               btn.classList.toggle('active');
               btn.querySelector('.map_btn__value').style.backgroundColor = thisBgck;
               btn.querySelector('.map_btn__value').style.color = "#ffffff";
               mapFloorData.classList.toggle('active');

            });

            mapFloorDataClose.addEventListener('click', function (e) {
               btn.querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
               btn.querySelector('.map_btn__value').style.color = "#2c2c2c";
               btn.classList.remove('active');
               mapFloorData.classList.remove('active');

            });

            // ! доработать или создать новую чтоб по клику вне блока закрывались все окна а не только первое
            // OnClickCloseJq('.map_btns_wrap foreignObject', ['.map_btn', '.map_floor_data'], function (e) {
            //    btn.querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
            //    btn.querySelector('.map_btn__value').style.color = "#2c2c2c";
            // });
         })
      }


      // const width = document.querySelector('.parking_map__work_area').offsetWidth;
      // const height = document.querySelector('.parking_map__work_area').offsetHeight;
      const width = 978;
      const height = 797;



      const svgResolution = 360 / width;
      svgContainer.style.width = width + 'px';
      svgContainer.style.height = height + 'px';
      svgContainer.style.transformOrigin = 'top left';
      svgContainer.className = 'svg-layer';



      const layer = new Layer({
         render: function (frameState) {
            const scale = svgResolution / frameState.viewState.resolution;
            const center = frameState.viewState.center;
            const size = frameState.size;
            const cssTransform = composeCssTransform(
               size[0] / 2,
               size[1] / 2,
               scale,
               scale,
               frameState.viewState.rotation,
               -center[0] / svgResolution - width / 2,
               center[1] / svgResolution - height / 2
            );

            svgContainer.style.transform = cssTransform;
            svgContainer.style.opacity = this.getOpacity();
            return svgContainer;
         },
      })
      map.addLayer(
         layer
      );


   }

   if (IsElem("#map")) {
      InitMapSvgApartment()
   }

   if (IsElem("#parking_map")) {
      InitMapSvgParking()
   }

   if (IsElem("#commercial_map")) {
      InitMapSvgCommercial()
   }

   if (IsElem("#current_room_map")) {
      InitMapSvgCurrentRoom()
   }

   toggleFocusInputs();
   GetViewportDifference();
   CloseMapSignHandler('.section_map__msign', '.placemark', 'active');
   CloseMapSignHandler('.section_top_view__msign', '.trest', 'hover');

   // -------------------------------------------------------------------------

   if (IsElem(".burger-btn")) {
      const burgerBtn = DOCUMENT.querySelector('.burger-btn');
      burgerBtn.addEventListener('click', function (e) {
         if (burgerBtn.classList.contains('active')) {
            CloseMenu()
         } else {
            ShowMenu()
         }
      });
   }

   // -------------------------------------------------------------------------

   const popupsOverlay = DOCUMENT.querySelectorAll('.ta_popup__overlay');
   popupsOverlay.forEach(popupOverlay => {
      popupOverlay.addEventListener('click', function () {
         ClosePopup();
      });
   });


   const closePopupLinks = DOCUMENT.querySelectorAll('a[data-close-popup]');
   closePopupLinks.forEach(closePopupLink => {
      closePopupLink.addEventListener('click', function () {
         ClosePopup()
      })
   });

   SetHandlerPopupLinks();

   // ----------------------------------------------------------------------------------

   if (IsElem('.topview_map')) {
      // btn.addEventListener('click', function (e) {
      //    document.querySelectorAll('.reset_animate_svg').forEach(el => {
      //       el.beginElement()
      //    })
      // });

      const groupsSvg = document.querySelectorAll('.topview_map g.trest');
      const animates = document.querySelectorAll('.topview_map animate');

      // animates.forEach(element => {
      //    element.setAttribute('fill', "remove")
      // });

      groupsSvg.forEach((el, index) => {
         let elTextWrap = el.querySelector('.text')
         let elTextWrapWidth = elTextWrap.getBBox()

         el.querySelector('.circle_group').addEventListener(windowWidth < 768 ? 'click' : 'mouseover', function (e) {
            document.querySelectorAll('g.trest').forEach(trestEl => {
               trestEl.classList.remove('hover')
            });
            let parentEl = _closest(el, '.trest');
            parentEl.classList.add('hover');

            if (windowWidth < 768) {
               document.querySelectorAll('g.trest').forEach(trestEl => {
                  trestEl.classList.remove('hover')
               });
               let currentTrest = _closest(this, 'g.trest');
               let currentTrestText = currentTrest.querySelector('text.small');
               let nowText = currentTrestText.querySelector('tspan:nth-child(1)').innerHTML + ' ' + currentTrestText.querySelector('tspan:nth-child(2)').innerHTML;
               const mSignText = document.querySelector('.section_top_view__msign_text');
               const mSignBox = document.querySelector('.section_top_view__msign');


               currentTrest.classList.add('hover');
               mSignBox.classList.add('active');
               mSignText.innerHTML = nowText;
            }
         })


         if (windowWidth >= 768) {
            el.querySelector('.circle_group').addEventListener('mouseout', function (e) {
               let parentEl = _closest(el, '.trest');
               parentEl.classList.remove('hover');
            })
         }
      })
   }

   // -----------------------------Selectric--------------------------------------------

   $('.js-selectric').each(function () {
      $(this).selectric();
   })

   // -----------------------------Masks--------------------------------------------
   if (IsElem("input[type=phone]")) {
      const phoneInputs = DOCUMENT.querySelectorAll('input[type=phone]');
      phoneInputs.forEach(phoneInput => {
         PhoneMask("input[type=phone]");
      });
   }

   // -----------------------------Animation--------------------------------------------

   // const jsAnimParents = DOCUMENT.querySelectorAll('.js-parent-wow');

   // jsAnimParents.forEach(jsAnimParent => {
   //    let delay = 0;
   //    const jsAnimChildrens = jsAnimParent.querySelectorAll('.wow');
   //    jsAnimChildrens.forEach(jsAnimChildren => {
   //       jsAnimChildren.setAttribute('data-wow-delay', `${delay}s`);
   //       delay += 0.5;
   //    })

   // })

   // new WOW().init();


   // new WOW({
   //    boxClass: 'vertical_animate',
   //    animateClass: 'animated',
   //    offset: 300,
   // }).init();

   // -----------------------------Sliders--------------------------------------------

   if (IsElem('.swiper')) {
      new Swiper('.section_slider__swiper', {
         // Подключаем модули слайдера
         modules: [Navigation, Pagination, Autoplay, Parallax],
         effect: 'fade',
         autoplay: {
            delay: 5000,
            disableOnInteraction: false,
         },
         parallax: true,
         // observer: true,
         // observeParents: true,
         // slidesPerView: 1,
         // spaceBetween: 0,
         // autoHeight: true,
         speed: 800,
         //touchRatio: 0,
         //simulateTouch: false,
         loop: true,
         //preloadImages: false,
         //lazy: true,
         // Dotts
         pagination: {
            el: '.section_slider__paginations',
            bulletClass: 'section_slider__paginations_bullet',
            bulletActiveClass: 'active',
            clickable: true,
         },
         // Arrows
         navigation: {
            nextEl: '.section_slider__next',
            prevEl: '.section_slider__prev',
         },
         on: {
            init: function (e) {
               // nav_swiper__cols[0].querySelector('.nav_swiper__title_wrap').classList.add('active')
            }
         }
      });
   }

   if (windowWidth < 1200 && IsElem(".section_slider")) {
      SetHeightSlider();
      window.onresize = function (event) {
         SetHeightSlider()
      };
   }

   // -----------------------------Flags--------------------------------------------

   // ! для добавления актив классов пунктам меню (после билда удалить)
   if (IsElem('#flag')) {
      const js_flag = flag.innerHTML;
      window.navItems = document.querySelectorAll('.header__nav ul li');

      switch (js_flag) {
         case 'about':
            navItems[0].classList.add('active')
            break;
         case 'infrastructure':
            navItems[1].classList.add('active')
            break;
         case 'parking':
            navItems[2].classList.add('active')
            break;
         case 'сommercial_estate':
            navItems[3].classList.add('active')
            break;
         case 'construction_progress':
            navItems[4].classList.add('active')
            break;
         default:
            break;
      }
   }

   // -----------------------------Floors--------------------------------------------
   const svgFloors = document.querySelectorAll('.floors g');
   const foreignObjParent = document.querySelector('.choosing_floor__info_obj');
   const foreignObjFloor = document.querySelector('.choosing_floor__info_obj foreignObject');

   svgFloors.forEach(floor => {
      floor.addEventListener('mouseenter', function (e) {
         const coordX = floor.dataset.cx,
            coordY = floor.dataset.cy,
            floorNumber = floor.dataset.fn,
            floorPrice = floor.dataset.price,
            floorSquare = floor.dataset.square;

         foreignObjFloor.setAttribute("y", coordY);
         foreignObjFloor.setAttribute("x", coordX);
         foreignObjFloor.querySelector("#floor_num span").innerHTML = floorNumber;
         foreignObjFloor.querySelector("#floor_from_price").innerHTML = floorPrice;
         foreignObjFloor.querySelector("#floor_from_square").innerHTML = floorSquare;

         foreignObjParent.classList.add('active');
      });


      floor.addEventListener('mouseout', function (e) {
         floor.classList.remove('active');
         foreignObjParent.classList.remove('active');
      });
   })

   // ------------------------------Выравнивание tspan относительно предыдущего-------------------------------------------

   // const rooms = document.querySelectorAll('a.room');
   // rooms.forEach(room => {
   //    const textEls = room.querySelectorAll('text');
   //    textEls.forEach(text => {
   //       const tspan1 = text.querySelector('tspan:nth-child(1)');
   //       const tspan2 = text.querySelector('tspan:nth-child(2)');
   //       const tspan1Width = tspan1.getComputedTextLength();
   //       const tspan2Width = tspan2.getComputedTextLength();

   //       tspan2.setAttribute("dx", `${-(tspan1Width / 2) - (tspan2Width / 2)}`);
   //       room.classList.add('show');
   //    });
   // })





   // ---------------------------------gallery----------------------------------------

   document.querySelectorAll('.gallery__picture').forEach(element => {
      element.addEventListener('click', function (e) {
         e.preventDefault();
      });
   });

   if (IsElem(".gallery")) {
      SetGallery('.gallery__item.gallery_1', [
         {
            src: 'https://img1.akspic.ru/attachments/crops/2/2/4/0/50422/50422-senokosnoye_ugodye-pole-selskoe_hozyajstvo-zakat-risovoe_pole-2560x1440.jpg',
            subHtml: '<div class="lightGallery-captions">Август 2022</div>',
         },
         {
            src: 'https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg',
            subHtml: '<div class="lightGallery-captions">Август 2022</div>',
         },
         {
            src: 'https://w-dog.ru/wallpapers/2/9/304378601614637/gorod-franciya-parizh-ejfeleva-bashnya-arxitektura-pod-ejfelevoj.jpg',
            subHtml: '<div class="lightGallery-captions">Август 2022</div>',
         }
      ]);

      SetGallery('.gallery__item.gallery_2', [
         {
            src: '../img/gallery/2/1.jpg',
            subHtml: '<div class="lightGallery-captions">Август 2022</div>',
         },
         {
            src: 'https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg',
            subHtml: '<div class="lightGallery-captions">Август 2022</div>',
         },
      ]);

      SetGallery('.gallery__item.gallery_3', [
         {
            src: '../img/gallery/3/1.jpg',
            subHtml: '<div class="lightGallery-captions">Август 2022</div>',
         },
         {
            src: 'https://img.desktopwallpapers.ru/rocks/pics/wide/1920x1200/27640f370156a0e0ae3ee9608fc8480a.jpg',
            subHtml: '<div class="lightGallery-captions">Август 2022</div>',
         }
      ]);
   }

   // ---------------------------------sent icon----------------------------------------

   window.SentIconStartAnimate = function () {
      if (IsElem(".sent_icon")) {
         const sentIcon = document.querySelector('.sent_icon');
         sleep(500).then(() => {
            sentIcon.classList.add('active');
         })
      }
   }

   // ---------------------------------commercial links----------------------------------------

   function SetValuesOnInfoBlock(linksSelector) {
      if (IsElem(".cmap_sub_info")) {
         const commercialLinks = document.querySelectorAll(linksSelector);

         const cmapSubInfo = document.querySelector('.cmap_sub_info');
         const backLink = document.querySelector('.cmap_sub_info .back_link');
         const comercialRoomsNum = document.querySelector('.comercial_rooms__num');
         const comercialRoomsPrice = document.querySelector('.comercial_rooms__price div:nth-child(1)');
         const comercialRoomsPriceForOne = document.querySelector('.comercial_rooms__price div:nth-child(2)');
         const comercialRoomsSquare = document.querySelector('.comercial_rooms__square');
         const comercialRoomsLinkDownload = document.querySelector('.cmap_sub_info__footer a:nth-child(2)');

         commercialLinks.forEach(commercialLink => {
            commercialLink.addEventListener('click', function (e) {
               const num = `Помещение №${commercialLink.dataset.num}`
               const price = commercialLink.dataset.price
               const priceForOne = commercialLink.dataset.priceForOne
               const square = commercialLink.dataset.square
               const linkDownload = commercialLink.dataset.linkDownload

               comercialRoomsNum.innerHTML = num;
               comercialRoomsPrice.innerHTML = price;
               comercialRoomsPriceForOne.innerHTML = priceForOne;
               comercialRoomsSquare.innerHTML = square;
               comercialRoomsLinkDownload.setAttribute('href', linkDownload)
               cmapSubInfo.classList.add('active');
            })
         });

         backLink.addEventListener('click', function (e) {
            cmapSubInfo.classList.remove('active');
         })
      }
   }



   // .cf_info_item.cf_info_item--commercial
   function resetScaleSvg(_this) {
      const numBord = _this.querySelector('.parking_places__num_bord')
      let oldTransformValue = numBord.getAttribute('transform').split(' ');
      let newTransformValue = oldTransformValue.filter(el => {
         // console.log(el.indexOf('scale'));
         return el.indexOf('scale') == -1;
      })
      newTransformValue = newTransformValue.join(' ')
      numBord.removeAttribute('transform')


      numBord.setAttribute('transform', newTransformValue)

      return numBord.getAttribute('transform')
   }












   // ---------------------------------добавление класса wrapper'у для выравнивания свг----------------------------------------
   if (IsElem(".cfloor_page")) {
      document.querySelector('.wrapper').style.display = "flex"
      document.querySelector('.wrapper').style.flexDirection = "column"
   }


   // -----------------------------------Выравнивание меню на странице выбра этажа--------------------------------------
   if (IsElem(".page.choose_apart")) {
      document.querySelector('.mobile_menu_content').classList.add('mobile_menu_content--cmap');
   }



   // ---------------------------------Выбор этажа на тачах----------------------------------------
   if (IsElem(".cf_info_touch")) {
      const cfInfoHead = document.querySelector('.cf_info__head');
      cfInfoHead.addEventListener('click', function (e) {
         if (document.querySelector('.mobile_menu_content').classList.contains('active')) {
            CloseMenu();
            sleep(1000).then(() => {
               const cfInfoTouch = document.querySelector('.cf_info_touch');
               cfInfoTouch.classList.toggle('active');
            })
         } else {
            const cfInfoTouch = document.querySelector('.cf_info_touch');
            cfInfoTouch.classList.toggle('active');
         }
      });
   }

   // ---------------------------------Подсказка в выборе квартиры----------------------------------------
   // ? добавить только один раз 
   if (IsElem(".cmap_hint")) {
      document.querySelector('.cmap_hint__close').addEventListener('click', function (e) {
         document.querySelector('.cmap_hint').classList.add('hide');
      });
   }

   // ---------------------------------Выравнивание высоты карты  в паркинге----------------------------------------
   if (IsElem(".page.parking_map") && windowWidth < 1200) {
      const parkingMapInfoAreaHeight = document.querySelector('.parking_map__info_area').offsetHeight;
      document.querySelector('.page.parking_map').style.height = `calc(100% - ${parkingMapInfoAreaHeight + 48 + 63}px)`
   }

});

window.onload = function () {
   SentIconStartAnimate();
}