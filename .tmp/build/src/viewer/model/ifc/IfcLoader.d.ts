import * as THREE from "three";
import * as WEBIFC from "web-ifc";
import { FragmentsGroup } from "bim-fragment";
import { Event } from "../../Event";
import { FragmentHighlighter } from "../fragment";
export declare class IfcLoader {
    ifcLoaded: Event<FragmentsGroup>;
    locationsSaved: Event<{
        [id: number]: number[];
    }>;
    api: WEBIFC.IfcAPI;
    private readonly _geometryReader;
    private readonly _dataConverter;
    private readonly _fragmentManager;
    FragmentHighlighter: FragmentHighlighter;
    get settings(): import("../ModelSetting").ModelSetting;
    /**
     *
     */
    get meshes(): THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>[];
    get groups(): FragmentsGroup[];
    get sphere(): THREE.Sphere;
    get corner(): THREE.Vector3;
    constructor();
    dispose(): void;
    spatialTree: any[];
    loadFragment(data: Uint8Array): void;
    private static setupModelLoader;
    private static getSpatialTree;
    static getSphereFromSpheres(spheres: THREE.Sphere[]): THREE.Sphere;
    static getSphere(boundingBox: THREE.Box3): THREE.Sphere;
}
