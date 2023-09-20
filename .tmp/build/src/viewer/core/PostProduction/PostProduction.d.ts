import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { CustomEffectsPass } from "./custom-effects-pass";
import CameraControls from "camera-controls";
export declare class PostProduction {
    private scene;
    private camera;
    private size;
    private renderer;
    private domElement;
    private controls;
    excludedItems: Set<THREE.Object3D<THREE.Object3DEventMap>>;
    readonly composer: EffectComposer;
    private _enabled;
    private _initialized;
    private _n8ao?;
    private _customEffects?;
    private _basePass?;
    private _gammaPass?;
    private _depthTexture?;
    private readonly _renderTarget;
    get basePass(): RenderPass;
    get gammaPass(): ShaderPass;
    get customEffects(): CustomEffectsPass;
    get n8ao(): any;
    get enabled(): boolean;
    set enabled(active: boolean);
    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, size: THREE.Vector2, renderer: THREE.WebGLRenderer, domElement: HTMLDivElement | HTMLCanvasElement, controls: CameraControls);
    dispose(): void;
    setSize(): void;
    update(): void;
    updateCamera(): void;
    private initialize;
    updateProjection(camera: THREE.Camera): void;
    isUserControllingCamera: boolean;
    isControlSleeping: boolean;
    lastWheelUsed: number;
    lastResized: number;
    resizeDelay: number;
    visible: boolean;
    set setupEvents(setupEvents: boolean);
    onControlStart: () => void;
    onWake: () => void;
    onResize: () => void;
    onControl: () => void;
    onControlEnd: () => void;
    onWheel: () => void;
    onSleep: () => void;
    private updatePasses;
    private newCustomPass;
    private newGammaPass;
    private newSaoPass;
    private newBasePass;
}
