import { Point, Vertices, TriangleBuilder } from './index';

export class Mesh {
    mesh: Array<Vertices> = new Array<Vertices>();

    constructor(spawnPoint: Vertices, private context: CanvasRenderingContext2D) {
        this.mesh.push(spawnPoint);

        while (this.width > TriangleBuilder.maxWidth) {
            this.checkFractal();
        }
    }

    public scale(ammount: number, location: Point) {
        this.mesh.forEach(vert => {
            vert.p1 = vert.p1.substract(location)
                .multiplyBy(ammount)
                .add(location);

            vert.p2 = vert.p2.substract(location)
                .multiplyBy(ammount)
                .add(location);

            vert.p3 = vert.p3.substract(location)
                .multiplyBy(ammount)
                .add(location);
        });

        this.checkFractal();
        this.draw();
    }

    public translate(direction: Point) {
        this.mesh.forEach(vert => {
            vert.p1 = vert.p1.add(direction);
            vert.p2 = vert.p2.add(direction);
            vert.p3 = vert.p3.add(direction);
        });
        this.draw();
    }

    public draw() {
        this.context.clearRect(0, 0, innerWidth, innerHeight);
        this.context.beginPath();

        this.mesh.forEach(vert => {
            if (this.isCulled(vert)) {
                return;
            }

            this.context.moveTo(vert.p1.x, vert.p1.y);
            this.context.lineTo(vert.p2.x, vert.p2.y);
            this.context.lineTo(vert.p3.x, vert.p3.y);
        });

        this.context.fill();
        this.context.closePath();
    }

    private isCulled(vert: Vertices): boolean {
        return (vert.p3.x > TriangleBuilder.getBounds().width
            || vert.p1.y > TriangleBuilder.getBounds().height
            || vert.p2.x < 0
            || vert.p2.y < 0
        );
    }

    private get width(): number {
        return this.mesh[0].p1.distanceOnX(this.mesh[0].p3);
    }

    private checkFractal() {
        if (this.width > TriangleBuilder.maxWidth) {
            this.mesh = this.split(this.mesh);
        } else if (this.width < TriangleBuilder.minWidth) {
            this.mesh = this.merge(this.mesh);
        }
    }

    private split(oldMesh: Array<Vertices>): Array<Vertices> {
        const newMesh: Array<Vertices> = new Array<Vertices>();
        oldMesh.forEach(vert => {
            newMesh.push({
                p1: vert.p1,
                p2: vert.p1.midPointTo(vert.p2),
                p3: vert.p1.midPointTo(vert.p3)
            });

            newMesh.push({
                p1: vert.p2.midPointTo(vert.p1),
                p2: vert.p2,
                p3: vert.p2.midPointTo(vert.p3)
            });

            newMesh.push({
                p1: vert.p3.midPointTo(vert.p1),
                p2: vert.p3.midPointTo(vert.p2),
                p3: vert.p3
            });
        });
        return newMesh;
    }

    private merge(oldMesh: Array<Vertices>) {
        const newMesh: Array<Vertices> = new Array<Vertices>();
        oldMesh.forEach((vert, index) => {
            if (index % 3 !== 0) {
                return;
            }
            newMesh.push({
                p1: oldMesh[index].p1,
                p2: oldMesh[index + 1].p2,
                p3: oldMesh[index + 2].p3
            });
        });
        return newMesh;
    }
}
