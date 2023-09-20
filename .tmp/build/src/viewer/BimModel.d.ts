import * as THREE from "three";
import { Context } from "./core";
import { MaterialManager } from "./material/MaterialManager";
import { IfcLoader } from "./model/ifc/IfcLoader";
export declare class BimModel {
    private container;
    private canvas;
    /**
     *
     */
    scene: THREE.Scene;
    material: MaterialManager;
    context: Context;
    ifcLoader: IfcLoader;
    constructor(container: HTMLDivElement, canvas: HTMLCanvasElement);
    loadModel(buffer: Uint8Array, btn: HTMLButtonElement): void;
    private loadFragment;
}
