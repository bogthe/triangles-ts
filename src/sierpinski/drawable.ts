import { Point } from './index';

export interface Drawable {
    draw(context: CanvasRenderingContext2D): void;
    translate(direction: Point): void;
    scale(ammount: number, location: Point): void;
}
