import { Vertices } from './vertices';
import { Point } from './point';

export class Triangle {
    constructor(private vertices: Vertices) {
    }

    get getVerts(): Vertices {
        return this.vertices;
    }

    public scale(ammount: number, location: Point) {
        this.vertices.p1 = this.vertices.p1.substract(location)
            .multiplyBy(ammount)
            .add(location);

        this.vertices.p2 = this.vertices.p2.substract(location)
            .multiplyBy(ammount)
            .add(location);

        this.vertices.p3 = this.vertices.p3.substract(location)
            .multiplyBy(ammount)
            .add(location);
    }

    public translate(direction: Point) {
        this.vertices.p1 = this.vertices.p1.add(direction);
        this.vertices.p2 = this.vertices.p2.add(direction);
        this.vertices.p3 = this.vertices.p3.add(direction);
    }
}
