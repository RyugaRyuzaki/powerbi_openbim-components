import * as THREE from "three";
import CameraControls from "camera-controls";
export declare class Camera {
    maxFar: number;
    minFar: number;
    radius: number;
    private _size;
    set size(size: THREE.Vector2);
    get size(): THREE.Vector2;
    private _protection;
    set projection(projection: boolean);
    get projection(): boolean;
    private static getSubsetOfThree;
    private setupCameraControls;
    private _domElement;
    private _OrthographicCamera;
    private _PerspectiveCamera;
    currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    controls: CameraControls;
    private initPerspectiveCamera;
    private initOrthographicCamera;
    /**
     *
     */
    constructor(domElement: HTMLDivElement | HTMLCanvasElement, size: THREE.Vector2);
    dispose(): void;
    update(delta?: number): void;
}
