import { Mesh, Vertices, Point } from './index';

describe('Mesh', () => {
    const defaultP: Point = new Point(0, 0);

    it('should split a triangle in two 3', () => {
        const oldMesh: Array<Vertices> = [
            { p1: new Point(2, 0), p2: new Point(4, 4), p3: new Point(0, 4) }
        ];
        const mesh: Mesh = new Mesh({ p1: defaultP, p2: defaultP, p3: defaultP });

        expect(mesh.split(oldMesh).length).toBe(3);
    });


    it('should return same triangle when no triangles left to merge', () => {
        const oldMesh: Array<Vertices> = [
            { p1: new Point(2, 0), p2: new Point(4, 4), p3: new Point(0, 4) }
        ];
        const mesh: Mesh = new Mesh({ p1: defaultP, p2: defaultP, p3: defaultP });

        expect(mesh.merge(oldMesh)).toBe(oldMesh);
    });

    it('should merge 3 triangles into 1', () => {
        const oldMesh: Array<Vertices> = [
            { p1: new Point(2, 0), p2: new Point(4, 4), p3: new Point(0, 4) },
            { p1: new Point(2, 0), p2: new Point(4, 4), p3: new Point(0, 4) },
            { p1: new Point(2, 0), p2: new Point(4, 4), p3: new Point(0, 4) }
        ];
        const mesh: Mesh = new Mesh({ p1: defaultP, p2: defaultP, p3: defaultP });

        expect(mesh.merge(oldMesh).length).toBe(1);
    });
});
