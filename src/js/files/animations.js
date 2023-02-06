import { getCoords, sleep, _closest } from "./functions.js";


function InitAnimate() {
   const animParents = document.querySelectorAll(".js-anim-parent");
   animParents.forEach(animParent => {
      // высота текущего блока
      const animParentHeight = animParent.offsetHeight;
      const visualWindowHeight = document.documentElement.clientHeight;
      let offsetYTWindow = pageYOffset;
      let animParentCoords = animParent.getBoundingClientRect();

      /* берем из css-переменной значение offset (анимация сработает раньше на offset пикселей) */
      let animParentAnimOffset = getComputedStyle(animParent).getPropertyValue('--animParentAnimOffset') ? Number(getComputedStyle(animParent).getPropertyValue('--animParentAnimOffset')) : 0

      if ((getCoords(animParent).bottom - animParentAnimOffset < offsetYTWindow + visualWindowHeight)) {
         /* нам полностью виден блок, либо он выше */
         animParent.classList.add('visible');
         // console.log(animParentAnimOffset);
         const animElements = animParent.querySelectorAll('.js-anim-element');
         animElements.forEach(animElement => {
            const animElementDelay = animElement.dataset.delay;
            // const animElementClassAnimate = animElement.dataset.classAnimate;

            if (animElementDelay) {
               sleep(animElementDelay).then(() => {
                  // animElement.style.animationName = `${animElementClassAnimate}`;
                  // animElement.style.visibility = "visible";
                  animElement.classList.add('animated');
               })
            } else {
               // animElement.style.animationName = `${animElementClassAnimate}`;
               // animElement.style.visibility = "visible";
               animElement.classList.add('animated');
            }
         });

      } else {
         /* блока не видно, он ниже */
         animParent.classList.remove('visible');
      }
   })
}


document.addEventListener("DOMContentLoaded", () => {
   // InitAnimate()
   if (window.outerWidth > 1200) {
      window.addEventListener('scroll', function () {
         InitAnimate()
      });
   } else {
      document.querySelector('.page').addEventListener('scroll', function () {
         InitAnimate()
      });
   }
});


window.addEventListener('load', function () {
   InitAnimate()
   document.querySelector('body').classList.add('load');
})



const trest_1 = document.querySelector("#trest_1")
const trest_2 = document.querySelector("#trest_2")



// trest_1.querySelector('circle').addEventListener('click', function (e) {
   // let thisTrest = _closest(this, 'g');
   // let thisLine = thisTrest.querySelector('line');


   // let thisX1 = thisLine.getAttribute('x2') //224
   // // let thisY1 = thisLine.getAttribute('y2')



   // let thisX2_data = thisLine.dataset.x2 // 518
   // let thisY2_data = thisLine.dataset.y2



   // thisLine.setAttribute('x2', 500)
   // thisLine.setAttribute('y2', 500)








   // if (thisX1 > thisX2_data) {
   //    let index = thisX1
   //    function myLoop() {
   //       setTimeout(function () {
   //          thisLine.setAttribute('x2', index)
   //          index = index - 0.5;
   //          if (index >= thisX2_data) {
   //             myLoop();
   //          }
   //       }, 0.03)
   //    }
   //    myLoop()
   // } else {
   //    console.log('ebat');
   //    let index = thisX1
   //    function myLoop() {
   //       setTimeout(function () {
   //          thisLine.setAttribute('x2', index)
   //          index = Number(index) + 0.5;
   //          if (index <= thisX2_data) {
   //             myLoop();
   //          }
   //       }, .03)
   //    }
   //    myLoop()
   // }




   // if (thisY1 > thisY2) {
   //    for (let index = thisX1; index < array.length; index--) {

   //    }
   // } else {
   //    for (let index = thisX1; index < array.length; index++) {

   //    }
   // }


// })