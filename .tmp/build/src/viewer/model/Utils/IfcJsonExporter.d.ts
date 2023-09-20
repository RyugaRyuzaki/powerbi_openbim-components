import * as WEBIFC from "web-ifc";
import { Event } from "../../Event";
/**
 * Object to export all the properties from an IFC to a JS object.
 */
export declare class IfcJsonExporter {
    loadProgress: Event<{
        progress: number;
        total: number;
    }>;
    propertiesSerialized: Event<any>;
    size?: number;
    private _progress;
    /**
     * Exports all the properties of an IFC into an array of JS objects.
     * @webIfc The instance of [web-ifc]{@link https://github.com/ifcjs/web-ifc} to use.
     * @modelID ID of the IFC model whose properties to extract.
     */
    export(webIfc: WEBIFC.IfcAPI, modelID: number): Promise<void>;
    private getAllGeometriesIDs;
    private getStructure;
}
