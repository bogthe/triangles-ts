import { Point, Vertices, Context, Drawable } from './index';

export class Mesh implements Drawable {
    readonly maxSize: number = 59049; // 3^10;
    mesh: Array<Vertices> = new Array<Vertices>();

    constructor(spawnPoint: Vertices) {
        this.mesh.push(spawnPoint);

        if (!spawnPoint.p1 || !spawnPoint.p2 || !spawnPoint.p3) {
            throw Error('Invalid vertices coordinates');
        }

        while (this.width > Context.maxWidth) {
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
    }

    public translate(direction: Point) {
        if (isNaN(direction.x) || isNaN(direction.y)) {
            return;
        }

        this.mesh.forEach(vert => {
            vert.p1 = vert.p1.add(direction);
            vert.p2 = vert.p2.add(direction);
            vert.p3 = vert.p3.add(direction);
        });
    }

    public draw(context: CanvasRenderingContext2D) {
        this.mesh.forEach(vert => {
            if (this.isCulled(vert)) {
                return;
            }

            context.moveTo(vert.p1.x, vert.p1.y);
            context.lineTo(vert.p2.x, vert.p2.y);
            context.lineTo(vert.p3.x, vert.p3.y);
        });
    }

    public split(oldMesh: Array<Vertices>): Array<Vertices> {
        if (oldMesh.length >= this.maxSize) {
            return oldMesh;
        }

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

    public merge(oldMesh: Array<Vertices>): Array<Vertices> {
        if (oldMesh.length < 3) {
            return oldMesh;
        }
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

    private isCulled(vert: Vertices): boolean {
        return (vert.p3.x > Context.getBounds().width
            || vert.p1.y > Context.getBounds().height
            || vert.p2.x < 0
            || vert.p2.y < 0
        );
    }

    private get width(): number {
        return this.mesh[0].p1.distanceOnX(this.mesh[0].p3);
    }

    private checkFractal() {
        if (this.width > Context.maxWidth) {
            this.mesh = this.split(this.mesh);
        } else if (this.width < Context.minWidth) {
            this.mesh = this.merge(this.mesh);
        }
    }
}
