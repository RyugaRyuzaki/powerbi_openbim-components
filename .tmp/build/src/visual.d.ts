import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as OBC from 'openbim-components';
import "../style/visual.less";
export declare class Visual implements IVisual {
    private target;
    private updateCount;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    container: HTMLDivElement;
    private initContainer;
    components: OBC.Components;
    fragments: OBC.FragmentManager;
    loadButton: OBC.Button;
    private initScene;
    private loadFileLocal;
}
