import * as THREE from "three";
import { MeshType } from "../enum";
export declare class RayCaster {
    private _scene;
    private _renderer;
    private _camera;
    private _rayCaster;
    private _mouse;
    private setUpRaycaster;
    _filterType: MeshType;
    set filterType(filterType: MeshType);
    get filterType(): MeshType;
    setRayCaster(event: MouseEvent): void;
    getRayCastModel(event: MouseEvent, filterModel: []): any;
    getRayCastPlane(event: MouseEvent, plane: THREE.Plane): any;
    /**
     *
     */
    constructor(scene: THREE.Scene, renderer: any, camera: any);
}
