import { Fragment, FragmentsGroup } from "bim-fragment";
import * as THREE from "three";
import { Event } from "../../Event";
/**
 * Object that can efficiently load binary files that contain
 * [fragment geometry](https://github.com/ifcjs/fragment).
 */
export declare class FragmentManager {
    /** All the created [fragments](https://github.com/ifcjs/fragment). */
    list: {
        [guid: string]: Fragment;
    };
    groups: FragmentsGroup[];
    onFragmentsLoaded: Event<FragmentsGroup>;
    private _loader;
    /** The list of meshes of the created fragments. */
    get meshes(): THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>[];
    /** {@link Component.get} */
    dispose(): void;
    disposeGroup(group: FragmentsGroup): void;
    /** Disposes all existing fragments */
    reset(): void;
    /**
     * Loads one or many fragments into the scene.
     * @param data - the bytes containing the data for the fragments to load.
     * @returns the list of IDs of the loaded fragments.
     */
    load(data: Uint8Array): FragmentsGroup;
    /**
     * Export the specified fragments.
     * @param group - the fragments group to be exported.
     * @returns the exported data as binary buffer.
     */
    export(group: FragmentsGroup): Uint8Array;
    private removeFragmentMesh;
}
