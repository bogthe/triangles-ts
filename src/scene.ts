import { KeyboardControls } from './controls/keyboard';
import { TriangleBuilder, Point, Mesh } from './sierpinski';

export class Scene {
    constructor() {
        this.meshSetup();
    }

    private meshSetup() {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('canvas');
        if (!canvas) {
            return;
        }

        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        const mesh: Mesh = new Mesh(
            {
                p1: new Point(window.innerWidth / 2, 0),
                p2: new Point(window.innerWidth, window.innerHeight),
                p3: new Point(0, window.innerHeight)
            },
            context
        );

        this.resizeCanvas(canvas);

        const centerScreen: Point = new Point(innerWidth / 2, innerHeight / 2);
        const keyboard: KeyboardControls = new KeyboardControls();
        keyboard.onTranslate((direction) => {
            mesh.translate(direction.multiplyBy(5));
        });

        keyboard.onZoomIn(() => {
            mesh.scale(1 - (5 / 100), centerScreen);
        });

        keyboard.onZoomOut(() => {
            mesh.scale(1 + (5 / 100), centerScreen);
        });

    }

    public resizeCanvas(canvas: HTMLCanvasElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        TriangleBuilder.setBounds({
            width: canvas.width,
            height: canvas.height
        });
    }
}


window.onload = () => {
    const scene: Scene = new Scene();
    window.onresize = () => {
        scene.resizeCanvas(document.querySelector('canvas'));
    }
}
