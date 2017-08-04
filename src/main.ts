import { Context, Mesh, Point } from './sierpinski';
import { KeyboardControls } from './controls/keyboard';
import { MouseControls } from './controls/mouse';

window.onload = () => {
    alert('Pan: click & drag / arrow keys \t Zoom: scroll / keys: q & e');

    Context.loadControls([
        new KeyboardControls(),
        new MouseControls()
    ]);

    Context.addObjectToScene(new Mesh({
        p1: new Point(window.innerWidth / 2, 0),
        p2: new Point(window.innerWidth, window.innerHeight),
        p3: new Point(0, window.innerHeight)
    }));

    Context.addObjectToScene(new Mesh({
        p1: new Point(50, 0),
        p2: new Point(100, 100),
        p3: new Point(0, 100)
    }));

    Context.loadCanvas(document.querySelector('canvas'));
}
