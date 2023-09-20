import { AmbientLight, DirectionalLight, PerspectiveCamera, OrthographicCamera, Raycaster, Scene, Vector2, WebGLRenderer } from "three";
import { BoxCube } from "./BoxCube";
import { Camera } from ".";
/**
 * Cube View Class
 */
export declare class CubeView {
    radius: number;
    scene: Scene;
    private canvas;
    private initCanvas;
    container: HTMLDivElement;
    private initContainer;
    _size: Vector2;
    set size(size: Vector2);
    get size(): Vector2;
    _boxCube: BoxCube;
    renderer: WebGLRenderer;
    /**
     *initialize renderer
     */
    private initRenderer;
    /**
     *
     */
    _PerspectiveCamera: PerspectiveCamera;
    private initPerspectiveCamera;
    _OrthographicCamera: OrthographicCamera;
    private initOrthographicCamera;
    camera: PerspectiveCamera | OrthographicCamera;
    private initCamera;
    _contextContainer: HTMLDivElement;
    _contextCamera: Camera;
    _material: any;
    constructor(contextContainer: HTMLDivElement, contextCamera: Camera, material: any);
    /**
     * release memories
     */
    dispose(): void;
    /**
     * initialize light
     */
    _AmbientLight: AmbientLight;
    _DirectionalLight: DirectionalLight;
    private initLight;
    /**
     *initialize raycaster
     */
    mouse: Vector2;
    rayCaster: Raycaster;
    initRayCaster(): void;
    /**
     *
     * @param {Event} event
     * @returns {object} object to wanna cast
     */
    cast(event: any): import("three").Intersection<import("three").Object3D<import("three").Object3DEventMap>>[];
    /**
     *event when hover on Box
     */
    set event(event: boolean);
    mousemove: (event: any) => void;
    mouseout: (event: any) => void;
    onClick: (event: any) => void;
    _found: any | null;
    set found(event: any);
    get found(): any;
    /**
     * reset material with only object is children of scene has userData.Element=true or not null
     */
    resetMaterial(): void;
    /**
     *
     * @param {boolean} visible toggle visibility
     */
    onVisibility(visible: any): void;
    /**
     * must be called this function will
     */
    update(): void;
}
