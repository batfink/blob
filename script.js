(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(this, function () { 'use strict';

    var babelHelpers = {};

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = (function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();

    babelHelpers.inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    babelHelpers.possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    babelHelpers;
    var tag = document.createElement.bind(document);
    var txt = document.createTextNode.bind(document);
    var get = document.querySelector.bind(document);
    var getall = document.querySelectorAll.bind(document);
    var log = console.log.bind(console);
    var err = console.error.bind(console);

    function blob (url) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.responseType = 'blob';
            req.open('GET', url);

            req.onprogress = function (e) {
                if (e.lengthComputable) {
                    log('loaded:', e.loaded / e.total * 100);
                }
            };

            req.onload = function () {
                if (req.status === 200) {
                    var imageUrl = window.URL.createObjectURL(req.response);
                    resolve(imageUrl);
                } else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = function () {
                reject(Error('Network error'));
            };

            req.send();
        });
    }

    var _HTMLElement = function _HTMLElement() {};
    _HTMLElement.prototype = HTMLElement.prototype;

    var MyElement = (function (_HTMLElement2) {
        babelHelpers.inherits(MyElement, _HTMLElement2);

        function MyElement() {
            babelHelpers.classCallCheck(this, MyElement);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(MyElement).apply(this, arguments));
        }

        babelHelpers.createClass(MyElement, [{
            key: 'createdCallback',
            value: function createdCallback() {
                var _this2 = this;

                this.setAttribute('element-created', '');
                log('element created');

                blob('./bilde.jpg').then(function (imgURL) {
                    var img = tag('img');
                    _this2.appendChild(img);
                    img.src = imgURL;
                }).catch(err);
            }
        }, {
            key: 'attachedCallback',
            value: function attachedCallback() {
                this.setAttribute('element-attached', '');
                log('element attached');
            }
        }, {
            key: 'detachedCallback',
            value: function detachedCallback() {}
        }, {
            key: 'attributeChangedCallback',
            value: function attributeChangedCallback() {}
        }]);
        return MyElement;
    })(_HTMLElement);

    document.registerElement('my-element', MyElement);

}));