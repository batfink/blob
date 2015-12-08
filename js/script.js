import { log, tag, err } from '../lib/bondage.js';
import blob from '../lib/get.js';

let _HTMLElement = function() {};
_HTMLElement.prototype = HTMLElement.prototype;

class MyElement extends _HTMLElement {

    createdCallback() {
        this.setAttribute('element-created', '');
        log('element created');

        blob('./bilde.jpg').then( imgURL =>  {
            let img = tag('img');
            this.appendChild(img);
            img.src = imgURL;
        }).catch(err);

    }

    attachedCallback() {
        this.setAttribute('element-attached', '');
        log('element attached');
    }

    detachedCallback() { }

    attributeChangedCallback() { }

}

document.registerElement('my-element', MyElement);
