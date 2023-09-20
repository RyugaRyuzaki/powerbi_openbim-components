import { Fragment } from "bim-fragment";
import * as THREE from "three";
export declare function numberOfDigits(x: number): number;
export declare function toCompositeID(id: number, count: number): string;
export declare function tooeenRandomId(): string;
export declare function generateExpressIDFragmentIDMap(fragmentsList: Fragment[]): {
    [fragmentID: string]: Set<string>;
};
export declare function generateIfcGUID(): string;
export declare function bufferGeometryToIndexed(geometry: THREE.BufferGeometry): void;
