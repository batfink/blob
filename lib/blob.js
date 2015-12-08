'use strict';

import { log } from '../lib/bondage.js';

let progress = 0;

export default function (url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.responseType = 'blob';
        req.open('GET', url);

        req.onprogress = function(e) {
            if (e.lengthComputable) {
                log('loaded:', e.loaded/e.total * 100);
            }
        };

        req.onload = function() {
            if (req.status === 200) {
                var imageUrl = window.URL.createObjectURL( req.response );
                resolve(imageUrl);

            } else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function() {
            reject(Error('Network error'));
        };

        req.send();
    });
}
