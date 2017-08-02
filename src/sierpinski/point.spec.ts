import { Point } from './index';

describe('Point', () => {
    let testPoint: Point;

    beforeEach(() => {
        testPoint = new Point(4, 7);
    });

    it('should have a constructor which takes in the x,y position for the point', () => {
        const point: Point = new Point(0, 0);
        expect(point).toBeDefined();
    });

    it('should have getters for x and y properties', () => {
        expect(testPoint.x).toBe(4);
        expect(testPoint.y).toBe(7);
    });

    it('should substract two points by using a pure fuction', () => {
        const toSubstract: Point = new Point(2, 2);
        const actual: Point = testPoint.substract(toSubstract);

        expect(actual.x).toBe(2);
        expect(actual.y).toBe(5);
        expect(testPoint.x).toBe(4);
        expect(testPoint.y).toBe(7);
    });

    it('should add two points by using a pure fuction', () => {
        const toAdd: Point = new Point(2, 2);
        const actual: Point = testPoint.add(toAdd);

        expect(actual.x).toBe(6);
        expect(actual.y).toBe(9);
        expect(testPoint.x).toBe(4);
        expect(testPoint.y).toBe(7);
    });

    it('should multiply a point by an ammount using a pure function', () => {
        const ammount = 2;
        const actual: Point = testPoint.multiplyBy(ammount);

        expect(actual.x).toBe(8);
        expect(actual.y).toBe(14);
        expect(testPoint.x).toBe(4);
        expect(testPoint.y).toBe(7);
    });
});
