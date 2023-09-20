import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
export declare class Renderer {
    private _size;
    set size(size: THREE.Vector2);
    get size(): THREE.Vector2;
    set theme(dark: any);
    private initRenderer;
    private initLabelRenderer;
    renderer: THREE.WebGLRenderer;
    labelRenderer: CSS2DRenderer;
    domElement: HTMLDivElement | HTMLCanvasElement;
    private _container;
    /**
     *
     */
    constructor(container: HTMLDivElement, size: THREE.Vector2, canvas: HTMLCanvasElement);
    dispose(): void;
    update(scene: THREE.Scene, camera: any): void;
}
