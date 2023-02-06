// Подключение из node_modules
import tippy from 'tippy.js';

// Подключение cтилей из src/scss/libs
// import "../../scss/libs/tippy.scss";
// Подключение cтилей из node_modules
// import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
// import 'tippy.js/themes/light.css';

const template = document.getElementById('example')

console.log(template);

export function initTippy() {
   tippy('[data-tippy-content]', {
      // content: '<div class="test">v rot ebal</div>',
      arrow: true,
      content: template,
      allowHTML: true,
      arrow: false,
      trigger: 'click',
      interactive: true,
      animation: 'scale'
   });
}
initTippy();