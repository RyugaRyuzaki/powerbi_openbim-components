import { BoxGeometry, EdgesGeometry, LineSegments, Mesh, Scene } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
/**
 * @param {Object three JS} scene
 * @param {class or object} material => material manager
 */
export declare class BoxCube {
    private _scene;
    private _material;
    private _loader;
    private _font;
    constructor(scene: Scene, material: any);
    /**
     * release memories
     */
    dispose(): void;
    private init;
    /**
     *
     * @param {*} item
     */
    static disposeItem(item: any): void;
    /**
     *
     * @param {*} name
     * @param {*} x0
     * @param {*} y0
     * @param {*} z0
     * @param {*} x1
     * @param {*} y1
     * @param {*} z1
     * @returns
     */
    private initItem;
    /**
     *
     * @returns
     */
    private initRing;
    /**
     *
     * @returns
     */
    initOutLine(): LineSegments<EdgesGeometry<BoxGeometry>, any>;
    /**
     *
     * @param {*} scene
     * @param {*} name
     * @param {*} x1
     * @param {*} y1
     * @param {*} z1
     * @returns
     */
    initTextSide(name: any, x1: any, y1: any, z1: any): Mesh<TextGeometry, any, import("three").Object3DEventMap>;
    /**
     *
     * @param {*} scene
     * @param {*} name
     * @param {*} nameText
     * @param {*} x1
     * @param {*} y1
     * @param {*} z1
     * @returns
     */
    initTextRing(name: any, x1: any, y1: any, z1: any): Mesh<TextGeometry, any, import("three").Object3DEventMap>;
    /**
     *
     * @param {*} name
     * @param {*} textCube
     */
    rotateRing(name: string, textCube: TextGeometry): void;
    /**
     *
     * @param {*} name
     * @param {*} textCube
     */
    rotateTextCube(name: any, textCube: any): void;
}
/**
 *
 * @param {*} view
 * @param {*} name
 * @returns
 */
export declare function switchPick(contextCamera: any, name: any): void;
