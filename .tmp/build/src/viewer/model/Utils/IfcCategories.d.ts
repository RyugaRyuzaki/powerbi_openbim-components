import * as WEBIFC from "web-ifc";
export interface IfcItemsCategories {
    [itemID: number]: number;
}
export declare class IfcCategories {
    getAll(webIfc: WEBIFC.IfcAPI, modelID: number): IfcItemsCategories;
}
