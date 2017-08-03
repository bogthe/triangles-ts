import { Controls } from './controls';
import { Point } from '../sierpinski';

export class MouseControls extends Controls {
    constructor() {
        super();
        document.addEventListener('mousedown', this.startPan);
        document.addEventListener('mouseup', this.endPan);
        document.addEventListener('mouseleave', this.endPan);
        document.addEventListener('wheel', this.wheel);
    }

    wheel = (event: WheelEvent) => {
        if (event.deltaY < 0) {
            this.zoomOut(new Point(event.clientX, event.clientY));
        } else {
            this.zoomIn(new Point(event.clientX, event.clientY));
        }
    }

    startPan = (event: MouseEvent) => {
        document.addEventListener('mousemove', this.trackPos);
    }

    endPan = (event: MouseEvent) => {
        document.removeEventListener('mousemove', this.trackPos);
    }

    trackPos = (event: MouseEvent) => {
        const direction: Point = new Point(event.movementX, event.movementY);
        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        this.translate(direction.divideBy(magnitude));
    }
}
