import * as THREE from "three";
import { Fragment } from "bim-fragment";
import { FragmentManager } from "./FragmentManager";
import { Event } from "../../Event";
interface FragmentIdMap {
    [fragmentID: string]: Set<string>;
}
interface HighlightEvents {
    [highlighterName: string]: {
        onHighlight: Event<FragmentIdMap>;
        onClear: Event<null>;
    };
}
interface HighlightMaterials {
    [name: string]: THREE.Material[] | undefined;
}
export declare class FragmentHighlighter {
    enabled: boolean;
    highlightMats: HighlightMaterials;
    events: HighlightEvents;
    private tempMatrix;
    selection: {
        [selectionID: string]: FragmentIdMap;
    };
    private _fragmentManager;
    constructor(fragmentManager: FragmentManager);
    dispose(): void;
    add(name: string, material?: THREE.Material[]): void;
    update(): void;
    highlight(name: string, result: any, removePrevious?: boolean): {
        id: string;
        fragments: Fragment[];
    };
    highlightByID(name: string, ids: {
        [fragmentID: string]: Set<string> | string[];
    }, removePrevious?: boolean): void;
    /**
     * Clears any selection previously made by calling {@link highlight}.
     */
    clear(name?: string): void;
    private addComposites;
    private clearStyle;
    private updateFragmentHighlight;
    private checkSelection;
    private addHighlightToFragment;
}
export {};
