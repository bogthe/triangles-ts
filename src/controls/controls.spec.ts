import { Controls } from './controls';
import { Point } from '../sierpinski';

class ControlMock extends Controls {
}

describe('Controls', () => {
    let controls: ControlMock = new ControlMock();

    beforeEach(() => { controls = new ControlMock(); })

    it('should trigger onZoomIn callback when calling zoomIn', () => {
        const mockObj = { callback: () => { } };
        spyOn(mockObj, 'callback').and.callFake(() => { });
        controls.onZoomIn(mockObj.callback);

        controls.zoomIn();

        expect(mockObj.callback).toHaveBeenCalled();
    });

    it('should handle no onZoomIn callback when calling zoomIn', () => {
        controls.zoomIn();
    });

    it('should trigger onZoomOut callback when calling zoomOut', () => {
        const mockObj = { callback: () => { } };
        spyOn(mockObj, 'callback').and.callFake(() => { });
        controls.onZoomOut(mockObj.callback);

        controls.zoomOut();

        expect(mockObj.callback).toHaveBeenCalled();
    });

    it('should handle no onZoomOut callback when calling zoomOut', () => {
        controls.zoomOut();
    });

    it('should trigger onTranslate callback when calling translate', () => {
        const mockObj = { callback: (direction) => { } };
        spyOn(mockObj, 'callback').and.callFake(() => { });
        controls.onTranslate(mockObj.callback);

        controls.translate(new Point(4, 7));

        expect(mockObj.callback).toHaveBeenCalled();
    });

    it('should handle no onTranslate callback when calling translate', () => {
        controls.translate(new Point(0, 0));
    });
});
