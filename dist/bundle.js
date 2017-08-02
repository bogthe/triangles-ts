/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
__export(__webpack_require__(5));
__export(__webpack_require__(6));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keyboard_1 = __webpack_require__(2);
var sierpinski_1 = __webpack_require__(0);
var Scene = (function () {
    function Scene() {
        this.initializeControls();
        this.setupScene();
    }
    Scene.prototype.initializeControls = function () {
        var zoomFactor = 5;
        var translateSpeed = 5;
        var keyboard = new keyboard_1.KeyboardControls();
        var centerScreen = new sierpinski_1.Point(innerWidth / 2, innerHeight / 2);
        keyboard.onTranslate(function (direction) {
            sierpinski_1.TriangleBuilder.translate(direction.multiplyBy(translateSpeed));
        });
        keyboard.onZoomIn(function () {
            sierpinski_1.TriangleBuilder.scale(1 - (zoomFactor / 100), centerScreen);
        });
        keyboard.onZoomOut(function () {
            sierpinski_1.TriangleBuilder.scale(1 + (zoomFactor / 100), centerScreen);
        });
    };
    Scene.prototype.setupScene = function () {
        var canvas = document.querySelector('canvas');
        if (!canvas) {
            return;
        }
        var context = canvas.getContext('2d');
        sierpinski_1.TriangleBuilder.loadContext(context);
        sierpinski_1.TriangleBuilder.createNew({
            p1: new sierpinski_1.Point(window.innerWidth / 2, 0),
            p2: new sierpinski_1.Point(window.innerWidth, window.innerHeight),
            p3: new sierpinski_1.Point(0, window.innerHeight)
        });
        this.resizeCanvas(canvas);
    };
    Scene.prototype.resizeCanvas = function (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        sierpinski_1.TriangleBuilder.draw();
    };
    return Scene;
}());
exports.Scene = Scene;
window.onload = function () {
    var scene = new Scene();
    window.onresize = function () {
        scene.resizeCanvas(document.querySelector('canvas'));
    };
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var controls_1 = __webpack_require__(3);
var sierpinski_1 = __webpack_require__(0);
var KeyboardControls = (function (_super) {
    __extends(KeyboardControls, _super);
    function KeyboardControls() {
        var _this = _super.call(this) || this;
        _this.left = new sierpinski_1.Point(-1, 0);
        _this.up = new sierpinski_1.Point(0, -1);
        _this.right = new sierpinski_1.Point(1, 0);
        _this.down = new sierpinski_1.Point(0, 1);
        document.addEventListener('keydown', function (event) { return _this.handleEvent(event); });
        return _this;
    }
    KeyboardControls.prototype.handleEvent = function (event) {
        switch (event.code) {
            case 'ArrowLeft':
                this.translate(this.left);
                break;
            case 'ArrowUp':
                this.translate(this.up);
                break;
            case 'ArrowRight':
                this.translate(this.right);
                break;
            case 'ArrowDown':
                this.translate(this.down);
                break;
            case 'KeyE':
                this.zoomIn();
                break;
            case 'KeyQ':
                this.zoomOut();
                break;
        }
    };
    return KeyboardControls;
}(controls_1.Controls));
exports.KeyboardControls = KeyboardControls;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Controls = (function () {
    function Controls() {
    }
    Controls.prototype.onZoomIn = function (fn) {
        this.inCallback = fn;
    };
    Controls.prototype.onZoomOut = function (fn) {
        this.outCallback = fn;
    };
    Controls.prototype.onTranslate = function (fn) {
        this.translateCallback = fn;
    };
    Controls.prototype.zoomIn = function () {
        if (this.inCallback) {
            this.inCallback();
        }
    };
    Controls.prototype.zoomOut = function () {
        if (this.outCallback) {
            this.outCallback();
        }
    };
    Controls.prototype.translate = function (direction) {
        if (this.translateCallback) {
            this.translateCallback(direction);
        }
    };
    return Controls;
}());
exports.Controls = Controls;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var TriangleBuilder;
(function (TriangleBuilder) {
    var trianglePool = new Array();
    var context;
    function reset() {
        trianglePool.length = 0;
    }
    TriangleBuilder.reset = reset;
    function loadContext(ctx) {
        context = ctx;
    }
    TriangleBuilder.loadContext = loadContext;
    function createNew(vertices) {
        trianglePool.push(new index_1.Triangle(vertices));
        return trianglePool[trianglePool.length - 1];
    }
    TriangleBuilder.createNew = createNew;
    function scale(ammount, location) {
        trianglePool.forEach(function (triangle) {
            triangle.scale(ammount, location);
        });
        draw();
    }
    TriangleBuilder.scale = scale;
    function translate(direction) {
        trianglePool.forEach(function (triangle) {
            triangle.translate(direction);
        });
        draw();
    }
    TriangleBuilder.translate = translate;
    function draw() {
        if (!context) {
            return;
        }
        context.clearRect(0, 0, innerWidth, innerHeight);
        context.beginPath();
        trianglePool.forEach(function (triangle) {
            context.moveTo(triangle.getVerts.p1.x, triangle.getVerts.p1.y);
            context.lineTo(triangle.getVerts.p2.x, triangle.getVerts.p2.y);
            context.lineTo(triangle.getVerts.p3.x, triangle.getVerts.p3.y);
            context.fill();
        });
        context.closePath();
    }
    TriangleBuilder.draw = draw;
})(TriangleBuilder = exports.TriangleBuilder || (exports.TriangleBuilder = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
    function Point(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.substract = function (point) {
        return new Point(this._x - point.x, this._y - point.y);
    };
    Point.prototype.add = function (point) {
        return new Point(this._x + point.x, this._y + point.y);
    };
    Point.prototype.multiplyBy = function (ammount) {
        return new Point(this._x * ammount, this._y * ammount);
    };
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Triangle = (function () {
    function Triangle(vertices) {
        this.vertices = vertices;
    }
    Object.defineProperty(Triangle.prototype, "getVerts", {
        get: function () {
            return this.vertices;
        },
        enumerable: true,
        configurable: true
    });
    Triangle.prototype.scale = function (ammount, location) {
        this.vertices.p1 = this.vertices.p1.substract(location)
            .multiplyBy(ammount)
            .add(location);
        this.vertices.p2 = this.vertices.p2.substract(location)
            .multiplyBy(ammount)
            .add(location);
        this.vertices.p3 = this.vertices.p3.substract(location)
            .multiplyBy(ammount)
            .add(location);
    };
    Triangle.prototype.translate = function (direction) {
        this.vertices.p1 = this.vertices.p1.add(direction);
        this.vertices.p2 = this.vertices.p2.add(direction);
        this.vertices.p3 = this.vertices.p3.add(direction);
    };
    return Triangle;
}());
exports.Triangle = Triangle;


/***/ })
/******/ ]);