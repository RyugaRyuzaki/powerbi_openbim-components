import * as THREE from "three";
import * as WEBIFC from "web-ifc";
import { BvhManager } from "./BVH";
export interface IfcGeometries {
    [id: string]: {
        buffer: THREE.BufferGeometry;
        instances: {
            color: WEBIFC.Color;
            matrix: number[];
            expressID: number;
        }[];
    };
}
export declare class GeometryReader {
    private _api;
    saveLocations: boolean;
    items: IfcGeometries;
    locations: {
        [itemID: number]: [number, number, number];
    };
    BVH: BvhManager;
    get api(): WEBIFC.IfcAPI;
    /**
     *
     */
    constructor();
    cleanUp(): void;
    streamMesh(webifc: WEBIFC.IfcAPI, mesh: WEBIFC.FlatMesh, forceTransparent?: boolean): void;
    private newBufferGeometry;
    private getIndices;
    private getVertices;
    private constructBuffer;
}
