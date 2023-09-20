import * as WEBIFC from "web-ifc";
/** Configuration of the IFC-fragment conversion. */
export declare class ModelSetting {
    /** Whether to extract the IFC properties into a JSON. */
    includeProperties: boolean;
    /**
     * Generate the geometry for categories that are not included by default,
     * like IFCSPACE.
     */
    optionalCategories: number[];
    /** Path of the WASM for [web-ifc](https://github.com/ifcjs/web-ifc). */
    wasm: {
        path: string;
        absolute: boolean;
    };
    /** List of categories that won't be converted to fragments. */
    excludedCategories: Set<number>;
    /** Whether to save the absolute location of all IFC items. */
    saveLocations: boolean;
    /** Loader settings for [web-ifc](https://github.com/ifcjs/web-ifc). */
    webIfc: WEBIFC.LoaderSettings;
}
