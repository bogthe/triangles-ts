import { TriangleBuilder } from './builder';
import { Point } from './point';
import { Vertices } from './vertices';

describe('Triangle Builder', () => {
    let verts: Vertices;
    let originalVerts: Vertices;

    beforeEach(() => {
        verts = {
            p1: new Point(0, 0),
            p2: new Point(1, 1),
            p3: new Point(2, 2)
        };

        originalVerts = {
            p1: new Point(0, 0),
            p2: new Point(1, 1),
            p3: new Point(2, 2)
        };

        TriangleBuilder.reset();
    });

    it('should add a newly created triangle to the pool', () => {
        let triangle = TriangleBuilder.createNew(verts);

        expect(triangle).toBeDefined();
        expect(triangle.getVerts).toEqual(verts);
    });

    it('should scale the vertices of a triangle', () => {
        let triangle = TriangleBuilder.createNew(verts);
        let secondTri = TriangleBuilder.createNew(verts);

        TriangleBuilder.scale(1.01, new Point(1, 1));

        expect(triangle.getVerts).not.toEqual(originalVerts);
        expect(secondTri.getVerts).not.toEqual(originalVerts);
    });

    it('should translate the vertices of a triangle', () => {
        let triangle = TriangleBuilder.createNew(verts);
        let secondTri = TriangleBuilder.createNew(verts);

        TriangleBuilder.translate(new Point(1, 1));
        expect(triangle.getVerts).not.toEqual(originalVerts);
        expect(secondTri.getVerts).not.toEqual(originalVerts);
    });

    it('should handle a null context without throwing an error', () => {
        TriangleBuilder.draw(null);
    });

    it('should clear the context before every draw step', () => {
        let canvas: HTMLCanvasElement = document.createElement('canvas');
        let context: CanvasRenderingContext2D = canvas.getContext('2d');
        spyOn(context, "clearRect").and.callFake(() => { });

        TriangleBuilder.draw(context);

        expect(context.clearRect).toHaveBeenCalled();
    });

    it('should make calls to context pathing when drawing a triangle', () => {
        let canvas: HTMLCanvasElement = document.createElement('canvas');
        let context: CanvasRenderingContext2D = canvas.getContext('2d');
        spyOn(context, "moveTo").and.callFake(() => { });
        spyOn(context, "lineTo").and.callFake(() => { });
        spyOn(context, "fill").and.callFake(() => { });

        TriangleBuilder.createNew(verts);
        TriangleBuilder.draw(context);

        expect(context.moveTo).toHaveBeenCalled();
        expect(context.lineTo).toHaveBeenCalled();
        expect(context.fill).toHaveBeenCalled();
    });
});