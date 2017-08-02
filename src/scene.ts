import { KeyboardControls } from './controls/keyboard';
import { TriangleBuilder, Point } from './sierpinski';

export class Scene {
    constructor() {
        this.initializeControls();
        this.setupScene();
    }

    private initializeControls() {
        const zoomFactor = 5;
        const translateSpeed = 5;
        const keyboard: KeyboardControls = new KeyboardControls();
        const centerScreen: Point = new Point(innerWidth / 2, innerHeight / 2);

        keyboard.onTranslate((direction) => {
            TriangleBuilder.translate(direction.multiplyBy(translateSpeed));
        });

        keyboard.onZoomIn(() => {
            TriangleBuilder.scale(1 - (zoomFactor / 100), centerScreen);
        });

        keyboard.onZoomOut(() => {
            TriangleBuilder.scale(1 + (zoomFactor / 100), centerScreen);
        });
    }

    private setupScene() {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('canvas');
        if (!canvas) {
            return;
        }

        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        TriangleBuilder.loadContext(context);
        TriangleBuilder.createNew({
            p1: new Point(window.innerWidth / 2, 0),
            p2: new Point(window.innerWidth, window.innerHeight),
            p3: new Point(0, window.innerHeight)
        });

        this.resizeCanvas(canvas);
    }

    public resizeCanvas(canvas: HTMLCanvasElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        TriangleBuilder.draw();
    }
}


window.onload = () => {
    const scene: Scene = new Scene();
    window.onresize = () => {
        scene.resizeCanvas(document.querySelector('canvas'));
    }
}
