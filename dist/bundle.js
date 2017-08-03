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
__export(__webpack_require__(4));
__export(__webpack_require__(5));
__export(__webpack_require__(6));
__export(__webpack_require__(7));


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
var keyboard_1 = __webpack_require__(3);
var mouse_1 = __webpack_require__(8);
var sierpinski_1 = __webpack_require__(0);
var Scene = (function () {
    function Scene() {
        this.meshSetup();
    }
    Scene.prototype.meshSetup = function () {
        var canvas = document.querySelector('canvas');
        if (!canvas) {
            return;
        }
        var context = canvas.getContext('2d');
        var mesh = new sierpinski_1.Mesh({
            p1: new sierpinski_1.Point(window.innerWidth / 2, 0),
            p2: new sierpinski_1.Point(window.innerWidth, window.innerHeight),
            p3: new sierpinski_1.Point(0, window.innerHeight)
        }, context);
        this.resizeCanvas(canvas);
        var centerScreen = new sierpinski_1.Point(innerWidth / 2, innerHeight / 2);
        var keyboard = new keyboard_1.KeyboardControls();
        var mouse = new mouse_1.MouseControls();
        keyboard.onTranslate(function (direction) {
            mesh.translate(direction.multiplyBy(5));
        });
        mouse.onTranslate(function (direction) {
            mesh.translate(direction.multiplyBy(5));
        });
        mouse.onZoomIn(function (location) {
            mesh.scale(1 - (5 / 100), location);
        });
        mouse.onZoomOut(function (location) {
            mesh.scale(1 + (5 / 100), location);
        });
        keyboard.onZoomIn(function () {
            mesh.scale(1 - (5 / 100), centerScreen);
        });
        keyboard.onZoomOut(function () {
            mesh.scale(1 + (5 / 100), centerScreen);
        });
    };
    Scene.prototype.resizeCanvas = function (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        sierpinski_1.TriangleBuilder.setBounds({
            width: canvas.width,
            height: canvas.height
        });
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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var TriangleBuilder;
(function (TriangleBuilder) {
    TriangleBuilder.maxWidth = 30;
    TriangleBuilder.minWidth = 10;
    var trianglePool = new Array();
    var context;
    var bounds;
    function reset() {
        trianglePool.length = 0;
    }
    TriangleBuilder.reset = reset;
    function setBounds(canvasBounds) {
        bounds = canvasBounds;
    }
    TriangleBuilder.setBounds = setBounds;
    function getBounds() {
        return bounds;
    }
    TriangleBuilder.getBounds = getBounds;
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
        console.time("scale");
        trianglePool.forEach(function (triangle) {
            triangle.scale(ammount, location);
        });
        console.timeEnd("scale");
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
        console.time("draw");
        context.clearRect(0, 0, innerWidth, innerHeight);
        context.beginPath();
        trianglePool.forEach(function (triangle) {
            if (!triangle.isVisible)
                return;
            context.moveTo(triangle.getVerts.p1.x, triangle.getVerts.p1.y);
            context.lineTo(triangle.getVerts.p2.x, triangle.getVerts.p2.y);
            context.lineTo(triangle.getVerts.p3.x, triangle.getVerts.p3.y);
        });
        context.fill();
        context.closePath();
        console.timeEnd("draw");
        console.log(trianglePool.length);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var Triangle = (function () {
    function Triangle(vertices) {
        this.vertices = vertices;
        this.hasSplit = false;
        if (this.width > index_1.TriangleBuilder.maxWidth) {
            this.checkSplit();
        }
    }
    Object.defineProperty(Triangle.prototype, "getVerts", {
        get: function () {
            return this.vertices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Triangle.prototype, "isVisible", {
        get: function () {
            return !(this.width > index_1.TriangleBuilder.maxWidth || this.width < index_1.TriangleBuilder.minWidth
                || this.vertices.p3.x > index_1.TriangleBuilder.getBounds().width
                || this.vertices.p1.y > index_1.TriangleBuilder.getBounds().height
                || this.vertices.p2.x < 0
                || this.vertices.p2.y < 0);
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
        this.checkSplit();
    };
    Triangle.prototype.translate = function (direction) {
        this.vertices.p1 = this.vertices.p1.add(direction);
        this.vertices.p2 = this.vertices.p2.add(direction);
        this.vertices.p3 = this.vertices.p3.add(direction);
    };
    Object.defineProperty(Triangle.prototype, "width", {
        get: function () {
            return this.vertices.p1.distanceOnX(this.vertices.p3);
        },
        enumerable: true,
        configurable: true
    });
    Triangle.prototype.checkSplit = function () {
        if (this.hasSplit) {
            return;
        }
        if (this.width > index_1.TriangleBuilder.maxWidth) {
            index_1.TriangleBuilder.createNew({
                p1: this.vertices.p1,
                p2: this.vertices.p1.midPointTo(this.vertices.p2),
                p3: this.vertices.p1.midPointTo(this.vertices.p3)
            });
            index_1.TriangleBuilder.createNew({
                p1: this.vertices.p2.midPointTo(this.vertices.p1),
                p2: this.vertices.p2,
                p3: this.vertices.p2.midPointTo(this.vertices.p3)
            });
            index_1.TriangleBuilder.createNew({
                p1: this.vertices.p3.midPointTo(this.vertices.p1),
                p2: this.vertices.p3.midPointTo(this.vertices.p2),
                p3: this.vertices.p3,
            });
            this.hasSplit = true;
        }
    };
    return Triangle;
}());
exports.Triangle = Triangle;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var Mesh = (function () {
    function Mesh(spawnPoint, context) {
        this.context = context;
        this.mesh = new Array();
        this.mesh.push(spawnPoint);
        while (this.width > index_1.TriangleBuilder.maxWidth) {
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
        this.draw();
    };
    Mesh.prototype.translate = function (direction) {
        this.mesh.forEach(function (vert) {
            vert.p1 = vert.p1.add(direction);
            vert.p2 = vert.p2.add(direction);
            vert.p3 = vert.p3.add(direction);
        });
        this.draw();
    };
    Mesh.prototype.draw = function () {
        var _this = this;
        console.time("draw");
        this.context.clearRect(0, 0, innerWidth, innerHeight);
        this.context.beginPath();
        this.mesh.forEach(function (vert) {
            if (_this.isCulled(vert)) {
                return;
            }
            _this.context.moveTo(vert.p1.x, vert.p1.y);
            _this.context.lineTo(vert.p2.x, vert.p2.y);
            _this.context.lineTo(vert.p3.x, vert.p3.y);
        });
        this.context.fill();
        this.context.closePath();
        console.timeEnd("draw");
        console.log(this.mesh.length);
    };
    Mesh.prototype.isCulled = function (vert) {
        return (vert.p3.x > index_1.TriangleBuilder.getBounds().width
            || vert.p1.y > index_1.TriangleBuilder.getBounds().height
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
        if (this.width > index_1.TriangleBuilder.maxWidth) {
            this.mesh = this.split(this.mesh);
        }
        else if (this.width < index_1.TriangleBuilder.minWidth) {
            this.mesh = this.merge(this.mesh);
        }
    };
    Mesh.prototype.split = function (oldMesh) {
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
    return Mesh;
}());
exports.Mesh = Mesh;


/***/ }),
/* 8 */
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
        _this.initial = new sierpinski_1.Point(0, 0);
        _this.panOffset = new sierpinski_1.Point(0, 0);
        _this.mouseUp = false;
        _this.wheel = function (event) {
            if (event.deltaY < 0) {
                _this.zoomOut(new sierpinski_1.Point(event.clientX, event.clientY));
            }
            else {
                _this.zoomIn(new sierpinski_1.Point(event.clientX, event.clientY));
            }
        };
        _this.startPan = function (event) {
            _this.initial = new sierpinski_1.Point(event.clientX, event.clientY);
            document.addEventListener('mousemove', _this.trackPos);
        };
        _this.endPan = function (event) {
            document.removeEventListener('mousemove', _this.trackPos);
            _this.initial = new sierpinski_1.Point(0, 0);
        };
        _this.trackPos = function (event) {
            var direction = new sierpinski_1.Point(event.movementX, event.movementY);
            var magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
            if (direction.x == 0 && direction.y == 0) {
                _this.translate(new sierpinski_1.Point(1, 1));
            }
            else {
                _this.translate(direction.divideBy(magnitude));
            }
        };
        document.addEventListener('mousedown', _this.startPan);
        document.addEventListener('mouseup', _this.endPan);
        document.addEventListener('wheel', _this.wheel);
        return _this;
    }
    return MouseControls;
}(controls_1.Controls));
exports.MouseControls = MouseControls;


/***/ })
/******/ ]);