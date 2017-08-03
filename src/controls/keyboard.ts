import { Controls } from './controls';
import { Point } from '../sierpinski';

export class KeyboardControls extends Controls {
    private readonly left: Point = new Point(-1, 0);
    private readonly up: Point = new Point(0, -1);
    private readonly right: Point = new Point(1, 0);
    private readonly down: Point = new Point(0, 1);

    constructor() {
        super();
        document.addEventListener('keydown', event => this.handleEvent(event));
    }

    handleEvent(event: KeyboardEvent) {
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
                this.zoomIn(new Point(0, 0));
                break;
            case 'KeyQ':
                this.zoomOut(new Point(0, 0));
                break;
        }
    }
}
