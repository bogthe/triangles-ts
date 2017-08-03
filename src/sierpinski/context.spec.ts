import { Context, Drawable, Point } from './index';

describe('Context', () => {
    const drawable: Drawable = {
        draw: () => { },
        scale: (amm: number, loc: Point) => { },
        translate: (dir: Point) => { }
    };

    beforeAll(() => {
        Context.addObjectToScene(drawable);
    });

    it('should translate the scene objects when translate is called', () => {
        spyOn(drawable, 'translate').and.callFake((dir) => { });
        Context.translate(new Point(0, 0));
        expect(drawable.translate).toHaveBeenCalled();
    });

    it('should scale the scene objects when zoomIn is called', () => {
        spyOn(drawable, 'scale').and.callFake((amm, dir) => { });
        Context.zoomIn(new Point(0, 0));
        expect(drawable.scale).toHaveBeenCalled();
    });

    it('should scale the scene objects when zoomOut is called', () => {
        spyOn(drawable, 'scale').and.callFake((amm, dir) => { });
        Context.zoomOut(new Point(0, 0));
        expect(drawable.scale).toHaveBeenCalled();
    });
});
