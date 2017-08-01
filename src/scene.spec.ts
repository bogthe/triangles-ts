import {Scene} from './scene';

describe('Scene', ()=>{
    it('Should test the init of the scene', ()=>{
        let scene:Scene = new Scene();
        expect(scene).not.toBeNull();
    });
})