import { Triangle, Vertices, Point } from './index';

export module TriangleBuilder {
    const trianglePool: Array<Triangle> = new Array<Triangle>();

    export function reset() {
        trianglePool.length = 0;
    }

    export function createNew(vertices: Vertices): Triangle {
        trianglePool.push(new Triangle(vertices));
        return trianglePool[trianglePool.length - 1];
    }

    export function scale(ammount: number, location: Point) {
        trianglePool.forEach(triangle => {
            triangle.scale(ammount, location);
        });
    }

    export function translate(direction: Point) {
        trianglePool.forEach(triangle => {
            triangle.translate(direction);
        });
    }

    export function draw(context: CanvasRenderingContext2D) {
        if(!context)
            return;
        
        context.clearRect(0, 0, innerWidth, innerHeight);
        context.beginPath();

        trianglePool.forEach(triangle => {
            context.moveTo(triangle.getVerts.p1.x, triangle.getVerts.p1.y);
            context.lineTo(triangle.getVerts.p2.x, triangle.getVerts.p2.y);
            context.lineTo(triangle.getVerts.p3.x, triangle.getVerts.p3.y);
            context.fill();
        });

        context.closePath();
    }
}