export class Point {
    constructor(private _x: number, private _y: number) {
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public substract(point: Point): Point {
        return new Point(this._x - point.x, this._y - point.y);
    }

    public add(point: Point): Point {
        return new Point(this._x + point.x, this._y + point.y);
    }

    public multiplyBy(ammount: number): Point {
        return new Point(this._x * ammount, this._y * ammount);
    }
}
