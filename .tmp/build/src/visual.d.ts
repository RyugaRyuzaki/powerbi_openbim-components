import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import { BimModel } from "./viewer/BimModel";
export declare class Visual implements IVisual {
    private target;
    private updateCount;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    canvas: HTMLCanvasElement;
    container: HTMLDivElement;
    private initContainer;
    bimModel: BimModel;
    private initScene;
    private initButton;
    private loadFileLocal;
}
