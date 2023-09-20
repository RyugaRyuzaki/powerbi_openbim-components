import { IfcProperties } from "bim-fragment";
export declare class IfcPropertiesUtils {
    static getUnits(properties: IfcProperties): number;
    static findItemByGuid(properties: IfcProperties, guid: string): {
        [attribute: string]: any;
    };
    static findItemOfType(properties: IfcProperties, type: number): {
        [attribute: string]: any;
    };
    static getAllItemsOfType(properties: IfcProperties, type: number): any[];
    static getRelationMap(properties: IfcProperties, relationType: number, onElementsFound?: (relatingID: number, relatedIDs: number[]) => void): {
        [relatingID: number]: number[];
    };
    static getQsetQuantities(properties: IfcProperties, expressID: number, onQuantityFound?: (expressID: number) => void): number[] | null;
    static getPsetProps(properties: IfcProperties, expressID: number, onPropFound?: (expressID: number) => void): number[] | null;
    static getPsetRel(properties: IfcProperties, psetID: number): number;
    static getQsetRel(properties: IfcProperties, qsetID: number): number;
    static getEntityName(properties: IfcProperties, entityID: number): {
        key: string;
        name: string;
    };
    static getQuantityValue(properties: IfcProperties, quantityID: number): {
        key: string;
        value: any;
    };
    static isRel(expressID: number): boolean;
    static attributeExists(properties: IfcProperties, expressID: number, attribute: string): boolean;
    static groupEntitiesByType(properties: IfcProperties, expressIDs: Set<number> | number[]): Map<number, Set<number>>;
}
