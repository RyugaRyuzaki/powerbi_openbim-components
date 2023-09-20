import * as WEBIFC from "web-ifc";
import { IfcItemsCategories } from "./IfcCategories";
export declare class SpatialStructure {
    itemsByFloor: IfcItemsCategories;
    private _units;
    setUp(webIfc: WEBIFC.IfcAPI): Promise<void>;
    cleanUp(): void;
}
