import { Controls } from '../controls/controls';
import { Point, Drawable } from '../sierpinski';

export module Context {
    export const minWidth = 10;
    export const maxWidth = 30;
    const speed = 5;
    const sceneObjects: Array<Drawable> = new Array<Drawable>();

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let bounds: Bounds;

    export function loadControls(controls: Controls[]) {
        controls.forEach(control => {
            control.onTranslate(translate);
            control.onZoomIn(zoomIn);
            control.onZoomOut(zoomOut);
        });
    }

    export function loadCanvas(htmlCanvas: HTMLCanvasElement) {
        if (!htmlCanvas) {
            htmlCanvas = document.createElement('canvas');
        }

        canvas = htmlCanvas;
        context = canvas.getContext('2d');
        onResize();
    }

    export function addObjectToScene(obj: Drawable) {
        sceneObjects.push(obj);
    }

    export function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        bounds = { width: canvas.width, height: canvas.height };

        draw();
    }

    export function getBounds(): Bounds {
        return bounds;
    }

    export function translate(direction: Point) {
        sceneObjects.forEach(obj => {
            obj.translate(direction.multiplyBy(speed));
        });
        draw();
    }

    export function zoomIn(location: Point) {
        sceneObjects.forEach(obj => {
            obj.scale(1 + (speed / 100), location);
        });
        draw();
    }

    export function zoomOut(location: Point) {
        sceneObjects.forEach(obj => {
            obj.scale(1 - (speed / 100), location);
        });
        draw();
    }

    function draw() {
        context.clearRect(0, 0, bounds.width, bounds.height);
        context.beginPath();

        sceneObjects.forEach(obj => {
            obj.draw(context);
        });

        context.closePath();
        context.fill();
    }

    export interface Bounds {
        width: number;
        height: number;
    }
}
