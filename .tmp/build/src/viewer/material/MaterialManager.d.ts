import { MeshLambertMaterial, MeshBasicMaterial } from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
export declare class MaterialManager {
    highlight: MeshLambertMaterial;
    select: MeshLambertMaterial;
    normalCube: MeshLambertMaterial;
    hoverCube: MeshLambertMaterial;
    textCube: MeshLambertMaterial;
    ring: MeshLambertMaterial;
    textRing: MeshLambertMaterial;
    outLineCube: MeshBasicMaterial;
    dimension: LineMaterial;
    modelMaterials: [];
    constructor();
    /**
     * release all materials memory
     */
    dispose(): void;
    /**
     * release the material memory
     * @param {} material
     */
    static disposeMaterial(material: any): void;
}
