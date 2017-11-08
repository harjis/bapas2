import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  var element2 = document.createElement('div');
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element2.appendChild(btn);
  element.appendChild(element2);

  return element;
}

document.body.appendChild(component());
