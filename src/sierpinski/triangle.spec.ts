import { Triangle } from './triangle';
import { Vertices } from './vertices';
import { Point } from './point';

describe('Triangle', () => {
    let vertices: Vertices;
    let triangle: Triangle

    beforeAll(() => {
        vertices = {
            p1: new Point(0, 2),
            p2: new Point(4, 4),
            p3: new Point(0, 4)
        };
    });

    beforeEach(() => {
        triangle = new Triangle({
            p1: new Point(0, 2),
            p2: new Point(4, 4),
            p3: new Point(0, 4)
        });
    });

    it('should have a constructor which accepts vertices', () => {
        const triangleConstr: Triangle = new Triangle(vertices);
        expect(triangleConstr).toBeDefined();
    });

    it('should have a getter for vertices', () => {
        expect(triangle.getVerts).toEqual(vertices);
    });

    it('should scale vertices based on ammount and location', () => {
        triangle.scale(2, new Point(1, 1));
        expect(triangle.getVerts).not.toBe(vertices);
    });

    it('should translate the vertices based on direction', () => {
        triangle.translate(new Point(0, 20));
        expect(triangle.getVerts).not.toEqual(vertices);
    })
});
