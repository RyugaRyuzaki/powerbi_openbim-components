import * as WEBIFC from "web-ifc";
import * as THREE from "three";
export declare class Units {
    factor: number;
    complement: number;
    apply(matrix: THREE.Matrix4): void;
    setUp(webIfc: WEBIFC.IfcAPI): void;
    private getLengthUnits;
    private getScaleMatrix;
}
