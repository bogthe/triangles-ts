import { Scene } from './scene';

describe('Scene', () => {
    it('Should test the init of the scene', () => {
        const scene: Scene = new Scene();
        expect(scene).toBeDefined();
    });
});
