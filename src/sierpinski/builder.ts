import { Vertices, Point } from './index';

export module TriangleBuilder {
    export const maxWidth = 30;
    export const minWidth = 10;
    let bounds: Bounds;

    export function setBounds(canvasBounds: Bounds) {
        bounds = canvasBounds;
    }

    export function getBounds(): Bounds {
        return bounds;
    }

    export interface Bounds {
        width: number;
        height: number;
    }
}
