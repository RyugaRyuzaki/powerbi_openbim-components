import { MeshLambertMaterial, MeshBasicMaterial } from "three";
export declare function createMaterial(color?: string | null, transparent?: boolean, opacity?: number): MeshLambertMaterial;
export declare const CubeViewMaterial: {
    normalCube: MeshLambertMaterial;
    hoverCube: MeshLambertMaterial;
    textCube: MeshLambertMaterial;
    ring: MeshLambertMaterial;
    textRing: MeshLambertMaterial;
    outLineCube: MeshBasicMaterial;
};
