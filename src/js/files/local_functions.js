import { _closest, sleep } from "./functions.js";
import document from "./functions.js"


// --------------------------------локальные функции (только для текущего проекта)-----------------------------------------
export const CloseMapFloorData = () => {
   const mapFloorDatas = document.querySelectorAll('.map_floor_data');
   // map_btn__value
   // const mapBtnsValue = document.querySelectorAll('.map_btn__value');



   mapFloorDatas.forEach(el => {
      el.classList.remove('active');
      _closest(el, ".map_btns_wrap foreignObject").querySelector('.map_btn__value').style.backgroundColor = "#ffffff";
      _closest(el, ".map_btns_wrap foreignObject").querySelector('.map_btn__value').style.color = "#2c2c2c";
      _closest(el, ".map_btns_wrap foreignObject").querySelector('.map_btn').classList.remove('active');
   })
}
export const SetHeightSlider = () => {
   const mainHeight = document.querySelector('.page').offsetHeight
   document.querySelector('.section_slider').style.height = `${mainHeight}px`;
}


export const ShowMenu = () => {
   const burgerBtn = document.querySelector('.burger-btn');
   const navbar = document.querySelector('.mobile_menu_content');
   const htmlParent = document.querySelector('html');
   burgerBtn.classList.add('active');
   sleep(0).then(() => {
      navbar.classList.add('active');
      htmlParent.classList.add('lock');
   })
}


export const CloseMenu = () => {
   const burgerBtn = document.querySelector('.burger-btn');
   const navbar = document.querySelector('.mobile_menu_content');
   const htmlParent = document.querySelector('html');
   burgerBtn.classList.remove('active');
   sleep(0).then(() => {
      navbar.classList.remove('active');
      htmlParent.classList.remove('lock');
   })
}


export function ShowPantrieRow(square, index) {
   const pantrieRow = document.querySelector('.parking_vd__s_row');


   pantrieRow.querySelector(".parking_vd__s_num").innerHTML = `№${index}`
   pantrieRow.querySelector(".parking_vd__s_square").innerHTML = `${square} м<sup><small>2</small></sup>`




   pantrieRow.classList.add('active');
}

export function HidePantrieRow() {
   const pantrieRow = document.querySelector('.parking_vd__s_row');
   pantrieRow.classList.remove('active');
}