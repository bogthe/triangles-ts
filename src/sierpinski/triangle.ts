import { Vertices, Point, TriangleBuilder } from './index';

export class Triangle {
    hasSplit: boolean = false;


    constructor(private vertices: Vertices) {
    }

    get getVerts(): Vertices {
        return this.vertices;
    }

    get isVisible(): boolean {
        return !(this.hasSplit
            || this.vertices.p3.x > TriangleBuilder.getBounds().width
            || this.vertices.p1.y > TriangleBuilder.getBounds().height
            || this.vertices.p2.x < 0
            || this.vertices.p2.y < 0
        )
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

        this.checkSplit();
    }

    public translate(direction: Point) {
        this.vertices.p1 = this.vertices.p1.add(direction);
        this.vertices.p2 = this.vertices.p2.add(direction);
        this.vertices.p3 = this.vertices.p3.add(direction);
    }

    private get width(): number {
        return this.vertices.p1.distanceOnX(this.vertices.p3);
    }

    private checkSplit() {
        if (this.hasSplit) {
            return;
        }

        if (this.width > TriangleBuilder.maxWidth) {
            this.hasSplit = true;

            TriangleBuilder.createNew({
                p1: this.vertices.p1,
                p2: this.vertices.p1.midPointTo(this.vertices.p2),
                p3: this.vertices.p1.midPointTo(this.vertices.p3)
            });

            TriangleBuilder.createNew({
                p1: this.vertices.p2.midPointTo(this.vertices.p1),
                p2: this.vertices.p2,
                p3: this.vertices.p2.midPointTo(this.vertices.p3)
            });

            TriangleBuilder.createNew({
                p1: this.vertices.p3.midPointTo(this.vertices.p1),
                p2: this.vertices.p3.midPointTo(this.vertices.p2),
                p3: this.vertices.p3,
            });
        }
    }
}
