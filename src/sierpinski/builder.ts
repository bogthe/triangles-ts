import { Triangle, Vertices, Point } from './index';

export module TriangleBuilder {
    export const maxWidth = 100;
    export const minWidth = 30;

    const trianglePool: Array<Triangle> = new Array<Triangle>();
    let context: CanvasRenderingContext2D;
    let bounds: Bounds;

    export function reset() {
        trianglePool.length = 0;
    }

    export function setBounds(canvasBounds: Bounds) {
        bounds = canvasBounds;
    }

    export function getBounds(): Bounds {
        return bounds;
    }

    export function loadContext(ctx: CanvasRenderingContext2D) {
        context = ctx;
    }

    export function createNew(vertices: Vertices): Triangle {
        trianglePool.push(new Triangle(vertices));
        return trianglePool[trianglePool.length - 1];
    }

    export function scale(ammount: number, location: Point) {
        trianglePool.forEach(triangle => {
            triangle.scale(ammount, location);
        });

        draw();
    }

    export function translate(direction: Point) {
        trianglePool.forEach(triangle => {
            triangle.translate(direction);
        });

        draw();
    }

    export function draw() {
        if (!context) {
            return;
        }

        context.clearRect(0, 0, innerWidth, innerHeight);
        context.beginPath();

        trianglePool.forEach(triangle => {
            if(!triangle.isVisible)
                return;
            context.moveTo(triangle.getVerts.p1.x, triangle.getVerts.p1.y);
            context.lineTo(triangle.getVerts.p2.x, triangle.getVerts.p2.y);
            context.lineTo(triangle.getVerts.p3.x, triangle.getVerts.p3.y);
            context.fill();
        });

        context.closePath();
    }

    export interface Bounds {
        width: number;
        height: number;
    }
}
