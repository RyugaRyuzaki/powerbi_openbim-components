import * as THREE from "three";
import { FragmentsGroup } from "bim-fragment";
/**
 * A simple implementation of bounding box that works for fragments. The resulting bbox is not 100% precise, but
 * it's fast, and should suffice for general use cases such as camera zooming.
 */
export declare class BoundingBox {
    enabled: boolean;
    private _absoluteMin;
    private _absoluteMax;
    constructor();
    static getDimensions(bbox: THREE.Box3): {
        width: number;
        height: number;
        depth: number;
        center: THREE.Vector3;
    };
    static newBound(positive: boolean): THREE.Vector3;
    static getBounds(points: THREE.Vector3[], min?: THREE.Vector3, max?: THREE.Vector3): THREE.Box3;
    get(): THREE.Box3;
    getMesh(): THREE.Mesh<THREE.BoxGeometry, THREE.Material | THREE.Material[], THREE.Object3DEventMap>;
    reset(): void;
    add(group: FragmentsGroup): void;
    addFragment(fragment: any): void;
    getSphere(): THREE.Sphere;
    private static getFragmentBounds;
}
