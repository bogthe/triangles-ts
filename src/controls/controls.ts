import { Point } from '../sierpinski';

export abstract class Controls {
    private inCallback: () => void;
    private outCallback: () => void;
    private translateCallback: (direction: Point) => void;

    onZoomIn(fn: () => void) {
        this.inCallback = fn;
    }

    onZoomOut(fn: () => void) {
        this.outCallback = fn;
    }

    onTranslate(fn: (direction: Point) => void) {
        this.translateCallback = fn;
    }

    zoomIn() {
        if (this.inCallback) {
            this.inCallback();
        }
    }

    zoomOut() {
        if (this.outCallback) {
            this.outCallback();
        }
    }

    translate(direction: Point) {
        if (this.translateCallback) {
            this.translateCallback(direction);
        }
    }
}
