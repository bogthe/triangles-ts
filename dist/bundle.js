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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
__export(__webpack_require__(3));
__export(__webpack_require__(4));
__export(__webpack_require__(5));


/***/ }),
/* 1 */
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
    Controls.prototype.zoomIn = function (location) {
        if (this.inCallback) {
            this.inCallback(location);
        }
    };
    Controls.prototype.zoomOut = function (location) {
        if (this.outCallback) {
            this.outCallback(location);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sierpinski_1 = __webpack_require__(0);
var keyboard_1 = __webpack_require__(6);
var mouse_1 = __webpack_require__(7);
window.onload = function () {
    sierpinski_1.Context.loadControls([
        new keyboard_1.KeyboardControls(),
        new mouse_1.MouseControls()
    ]);
    sierpinski_1.Context.addObjectToScene(new sierpinski_1.Mesh({
        p1: new sierpinski_1.Point(window.innerWidth / 2, 0),
        p2: new sierpinski_1.Point(window.innerWidth, window.innerHeight),
        p3: new sierpinski_1.Point(0, window.innerHeight)
    }));
    sierpinski_1.Context.addObjectToScene(new sierpinski_1.Mesh({
        p1: new sierpinski_1.Point(50, 0),
        p2: new sierpinski_1.Point(100, 100),
        p3: new sierpinski_1.Point(0, 100)
    }));
    sierpinski_1.Context.loadCanvas(document.querySelector('canvas'));
};


/***/ }),
/* 3 */
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
    Point.prototype.divideBy = function (ammount) {
        return new Point(this._x / ammount, this._y / ammount);
    };
    Point.prototype.distanceOnX = function (point) {
        return Math.abs(this._x - point.x);
    };
    Point.prototype.midPointTo = function (point) {
        return this.add(point).divideBy(2);
    };
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var Mesh = (function () {
    function Mesh(spawnPoint) {
        this.maxSize = 59049;
        this.mesh = new Array();
        this.mesh.push(spawnPoint);
        if (!spawnPoint.p1 || !spawnPoint.p2 || !spawnPoint.p3) {
            throw Error('Invalid vertices coordinates');
        }
        while (this.width > index_1.Context.maxWidth) {
            this.checkFractal();
        }
    }
    Mesh.prototype.scale = function (ammount, location) {
        this.mesh.forEach(function (vert) {
            vert.p1 = vert.p1.substract(location)
                .multiplyBy(ammount)
                .add(location);
            vert.p2 = vert.p2.substract(location)
                .multiplyBy(ammount)
                .add(location);
            vert.p3 = vert.p3.substract(location)
                .multiplyBy(ammount)
                .add(location);
        });
        this.checkFractal();
    };
    Mesh.prototype.translate = function (direction) {
        if (isNaN(direction.x) || isNaN(direction.y)) {
            return;
        }
        this.mesh.forEach(function (vert) {
            vert.p1 = vert.p1.add(direction);
            vert.p2 = vert.p2.add(direction);
            vert.p3 = vert.p3.add(direction);
        });
    };
    Mesh.prototype.draw = function (context) {
        var _this = this;
        this.mesh.forEach(function (vert) {
            if (_this.isCulled(vert)) {
                return;
            }
            context.moveTo(vert.p1.x, vert.p1.y);
            context.lineTo(vert.p2.x, vert.p2.y);
            context.lineTo(vert.p3.x, vert.p3.y);
        });
    };
    Mesh.prototype.split = function (oldMesh) {
        if (oldMesh.length >= this.maxSize) {
            return oldMesh;
        }
        var newMesh = new Array();
        oldMesh.forEach(function (vert) {
            newMesh.push({
                p1: vert.p1,
                p2: vert.p1.midPointTo(vert.p2),
                p3: vert.p1.midPointTo(vert.p3)
            });
            newMesh.push({
                p1: vert.p2.midPointTo(vert.p1),
                p2: vert.p2,
                p3: vert.p2.midPointTo(vert.p3)
            });
            newMesh.push({
                p1: vert.p3.midPointTo(vert.p1),
                p2: vert.p3.midPointTo(vert.p2),
                p3: vert.p3
            });
        });
        return newMesh;
    };
    Mesh.prototype.merge = function (oldMesh) {
        if (oldMesh.length < 3) {
            return oldMesh;
        }
        var newMesh = new Array();
        oldMesh.forEach(function (vert, index) {
            if (index % 3 !== 0) {
                return;
            }
            newMesh.push({
                p1: oldMesh[index].p1,
                p2: oldMesh[index + 1].p2,
                p3: oldMesh[index + 2].p3
            });
        });
        return newMesh;
    };
    Mesh.prototype.isCulled = function (vert) {
        return (vert.p3.x > index_1.Context.getBounds().width
            || vert.p1.y > index_1.Context.getBounds().height
            || vert.p2.x < 0
            || vert.p2.y < 0);
    };
    Object.defineProperty(Mesh.prototype, "width", {
        get: function () {
            return this.mesh[0].p1.distanceOnX(this.mesh[0].p3);
        },
        enumerable: true,
        configurable: true
    });
    Mesh.prototype.checkFractal = function () {
        if (this.width > index_1.Context.maxWidth) {
            this.mesh = this.split(this.mesh);
        }
        else if (this.width < index_1.Context.minWidth) {
            this.mesh = this.merge(this.mesh);
        }
    };
    return Mesh;
}());
exports.Mesh = Mesh;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sierpinski_1 = __webpack_require__(0);
var Context;
(function (Context) {
    Context.minWidth = 10;
    Context.maxWidth = 30;
    var speed = 5;
    var sceneObjects = new Array();
    var canvas;
    var context;
    var bounds;
    var gradientPos = new sierpinski_1.Point(255, 255);
    var gradientDirection = 1;
    function loadControls(controls) {
        controls.forEach(function (control) {
            control.onTranslate(translate);
            control.onZoomIn(zoomIn);
            control.onZoomOut(zoomOut);
        });
    }
    Context.loadControls = loadControls;
    function loadCanvas(htmlCanvas) {
        if (!htmlCanvas) {
            htmlCanvas = document.createElement('canvas');
        }
        canvas = htmlCanvas;
        context = canvas.getContext('2d');
        onResize();
    }
    Context.loadCanvas = loadCanvas;
    function addObjectToScene(obj) {
        sceneObjects.push(obj);
    }
    Context.addObjectToScene = addObjectToScene;
    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        bounds = { width: canvas.width, height: canvas.height };
        draw();
    }
    Context.onResize = onResize;
    function getBounds() {
        return bounds;
    }
    Context.getBounds = getBounds;
    function translate(direction) {
        sceneObjects.forEach(function (obj) {
            obj.translate(direction.multiplyBy(speed));
        });
        draw();
    }
    Context.translate = translate;
    function zoomIn(location) {
        sceneObjects.forEach(function (obj) {
            obj.scale(1 + (speed / 100), location);
        });
        draw();
    }
    Context.zoomIn = zoomIn;
    function zoomOut(location) {
        sceneObjects.forEach(function (obj) {
            obj.scale(1 - (speed / 100), location);
        });
        draw();
    }
    Context.zoomOut = zoomOut;
    function draw() {
        context.clearRect(0, 0, bounds.width, bounds.height);
        context.beginPath();
        sceneObjects.forEach(function (obj) {
            obj.draw(context);
        });
        context.closePath();
        mixColors();
        context.fillStyle = 'rgb(0, ' + Math.floor(255 - gradientPos.x) + ', ' +
            Math.floor(255 - gradientPos.y) + ')';
        context.fill();
    }
    function mixColors() {
        if (gradientPos.x > 255) {
            gradientDirection = -gradientDirection;
        }
        else if (gradientPos.x < 0) {
            gradientDirection = -gradientDirection;
        }
        gradientPos = gradientPos.add(new sierpinski_1.Point(gradientDirection, gradientDirection));
    }
})(Context = exports.Context || (exports.Context = {}));


/***/ }),
/* 6 */
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
var controls_1 = __webpack_require__(1);
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
                this.zoomIn(new sierpinski_1.Point(0, 0));
                break;
            case 'KeyQ':
                this.zoomOut(new sierpinski_1.Point(0, 0));
                break;
        }
    };
    return KeyboardControls;
}(controls_1.Controls));
exports.KeyboardControls = KeyboardControls;


/***/ }),
/* 7 */
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
var controls_1 = __webpack_require__(1);
var sierpinski_1 = __webpack_require__(0);
var MouseControls = (function (_super) {
    __extends(MouseControls, _super);
    function MouseControls() {
        var _this = _super.call(this) || this;
        _this.wheel = function (event) {
            if (event.deltaY < 0) {
                _this.zoomOut(new sierpinski_1.Point(event.clientX, event.clientY));
            }
            else {
                _this.zoomIn(new sierpinski_1.Point(event.clientX, event.clientY));
            }
        };
        _this.startPan = function (event) {
            document.addEventListener('mousemove', _this.trackPos);
        };
        _this.endPan = function (event) {
            document.removeEventListener('mousemove', _this.trackPos);
        };
        _this.trackPos = function (event) {
            var direction = new sierpinski_1.Point(event.movementX, event.movementY);
            var magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
            _this.translate(direction.divideBy(magnitude));
        };
        document.addEventListener('mousedown', _this.startPan);
        document.addEventListener('mouseup', _this.endPan);
        document.addEventListener('mouseleave', _this.endPan);
        document.addEventListener('wheel', _this.wheel);
        return _this;
    }
    return MouseControls;
}(controls_1.Controls));
exports.MouseControls = MouseControls;


/***/ })
/******/ ]);