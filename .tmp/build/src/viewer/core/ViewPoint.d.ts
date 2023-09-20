export declare class ViewPoint {
    private domElement;
    /**
     *
     */
    private static cursor;
    constructor(domElement: HTMLDivElement | HTMLCanvasElement);
    _orbit: boolean;
    set orbit(orbit: boolean);
    get orbit(): boolean;
    _point: string;
    set point(point: string);
    get point(): string;
}
