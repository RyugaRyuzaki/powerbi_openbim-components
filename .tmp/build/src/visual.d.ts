import powerbi from "powerbi-visuals-api";
import 'regenerator-runtime/runtime';
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import "../style/visual.less";
/**
 *
 */
export declare class Visual implements IVisual {
    private target;
    private visualHost;
    private events;
    private selectionManager;
    private viewer;
    constructor(options: VisualConstructorOptions);
    /**
     * call this function every data change
     * @param options
     * @returns
     */
    update(options: VisualUpdateOptions): void;
}
