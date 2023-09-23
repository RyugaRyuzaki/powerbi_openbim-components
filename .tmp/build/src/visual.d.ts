import powerbi from "powerbi-visuals-api";
import 'regenerator-runtime/runtime';
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as OBC from 'openbim-components';
import * as THREE from 'three';
import "../style/visual.less";
export declare class Visual implements IVisual {
    private target;
    private updateCount;
    private visualHost;
    private events;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    components: OBC.Components;
    fragmentManager: OBC.FragmentManager;
    highlighter: OBC.FragmentHighlighter;
    private initScene;
    private loadIfcModel;
    private getSphereModel;
    private fitToZoom;
    _viewSphere: THREE.Sphere;
    set viewSphere(sphere: THREE.Sphere);
    get viewSphere(): THREE.Sphere;
}
