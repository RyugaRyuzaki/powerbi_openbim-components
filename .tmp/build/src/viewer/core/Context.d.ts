import * as THREE from "three";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { RayCaster } from "./RayCaster";
import { Event } from "../Event";
import { ViewPoint } from "./ViewPoint";
export declare class Context {
    onInitialized: Event<Context>;
    private _clock;
    private _axes;
    private initAxes;
    private _ambientLight;
    private initAmbientLight;
    private _directionalLight;
    private initDirectionalLight;
    private _size;
    set size(size: THREE.Vector2);
    get size(): THREE.Vector2;
    set OrbitPoint(point: THREE.Vector3);
    private _viewSphere;
    set viewSphere(viewSphere: THREE.Sphere);
    get viewSphere(): THREE.Sphere;
    fitToModelLoaded(sphere: THREE.Sphere): void;
    fitToSphere(sphere: THREE.Sphere): void;
    renderer: Renderer;
    camera: Camera;
    RayCaster: RayCaster;
    private _scene;
    private _container;
    private _material;
    private _canvas;
    private _cubeView;
    private _postProduction;
    viewPoint: ViewPoint;
    constructor(scene: THREE.Scene, container: HTMLDivElement, canvas: HTMLCanvasElement, material: any);
    dispose(): void;
    /**
     * resize window
     */
    set resize(resize: boolean);
    set keyEvent(keyEvent: boolean);
    onResize: (e: any) => void;
    keyShift: boolean;
    onKeyDown: (e: any) => void;
    onKeyUp: (e: any) => void;
    render(): void;
    private update;
}
