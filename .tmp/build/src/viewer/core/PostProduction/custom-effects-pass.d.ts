import * as THREE from "three";
import { Pass, FullScreenQuad } from "three/examples/jsm/postprocessing/Pass";
export declare class CustomEffectsPass extends Pass {
    resolution: THREE.Vector2;
    renderScene: THREE.Scene;
    renderCamera: THREE.Camera;
    fsQuad: FullScreenQuad;
    normalOverrideMaterial: THREE.ShaderMaterial;
    glossOverrideMaterial: THREE.ShaderMaterial;
    planeBuffer: THREE.WebGLRenderTarget;
    glossBuffer: THREE.WebGLRenderTarget;
    outlineBuffer: THREE.WebGLRenderTarget;
    excludedMeshes: THREE.Mesh[];
    outlinedMeshes: {
        [name: string]: {
            meshes: Set<THREE.InstancedMesh | THREE.Mesh>;
            material: THREE.MeshBasicMaterial;
        };
    };
    private _outlineScene;
    private _outlineEnabled;
    private _lineColor;
    private _opacity;
    private _tolerance;
    private _glossEnabled;
    private _glossExponent;
    private _minGloss;
    private _maxGloss;
    private _outlinesNeedsUpdate;
    get lineColor(): number;
    set lineColor(lineColor: number);
    get tolerance(): number;
    set tolerance(value: number);
    get opacity(): number;
    set opacity(value: number);
    get glossEnabled(): boolean;
    set glossEnabled(active: boolean);
    get glossExponent(): number;
    set glossExponent(value: number);
    get minGloss(): number;
    set minGloss(value: number);
    get maxGloss(): number;
    set maxGloss(value: number);
    get outlineEnabled(): boolean;
    set outlineEnabled(active: boolean);
    constructor(resolution: THREE.Vector2, renderScene: THREE.Scene, renderCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera);
    dispose(): void;
    setSize(width: number, height: number): void;
    render(renderer: THREE.WebGLRenderer, writeBuffer: any, readBuffer: any): void;
    get vertexShader(): string;
    get fragmentShader(): string;
    createOutlinePostProcessMaterial(): THREE.ShaderMaterial;
    private newRenderTarget;
}