import { Point } from '../sierpinski';

export abstract class Controls {
    private inCallback: (location: Point) => void;
    private outCallback: (location: Point) => void;
    private translateCallback: (direction: Point) => void;

    onZoomIn(fn: (location: Point) => void) {
        this.inCallback = fn;
    }

    onZoomOut(fn: (location: Point) => void) {
        this.outCallback = fn;
    }

    onTranslate(fn: (direction: Point) => void) {
        this.translateCallback = fn;
    }

    zoomIn(location: Point) {
        if (this.inCallback) {
            this.inCallback(location);
        }
    }

    zoomOut(location: Point) {
        if (this.outCallback) {
            this.outCallback(location);
        }
    }

    translate(direction: Point) {
        if (this.translateCallback) {
            this.translateCallback(direction);
        }
    }
}
