/* eslint-disable @typescript-eslint/no-unused-vars */
"use strict";
import powerbi from "powerbi-visuals-api";
// use this for async function
import 'regenerator-runtime/runtime';
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import IVisualEventService = powerbi.extensibility.IVisualEventService;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import ISelectionId = powerbi.visuals.ISelectionId;
import DataViewTableRow = powerbi.DataViewTableRow
import "../style/visual.less"
import { Viewer, DataPoint } from "./Viewer";

/**
 * 
 */
export class Visual implements IVisual {
    private target: HTMLElement;
    private visualHost: IVisualHost
    private events: IVisualEventService;
    private selectionManager: ISelectionManager;
    private viewer!: Viewer
    constructor( options: VisualConstructorOptions ) {
        console.log( 'Visual constructor', options );
        this.target = options.element;
        this.visualHost = options.host;
        this.events = options.host.eventService;
        this.selectionManager = this.visualHost.createSelectionManager();
    }
    /**
     * call this function every data change
     * @param options 
     * @returns 
     */
    public update( options: VisualUpdateOptions ) {
        // first to start render
        this.events.renderingStarted( options );
        if ( options.dataViews === undefined || options.dataViews === null ) {
            return;
        }
        const dataViews = options.dataViews;

        if ( !dataViews
            || !dataViews[0]
            || !dataViews[0].table
            || !dataViews[0].table.rows
            || !dataViews[0].table.columns
        ) {
            console.log( 'Test 1 FAILED. No data to draw table.' );
            // eslint-disable-next-line powerbi-visuals/no-inner-outer-html
            this.target.innerHTML = '<p>Error</p>'
            return;
        }

        const table = dataViews[0].table;
        // make sure first column is expressID
        const firstColExpressID = table.columns[0].displayName === 'expressID'
        if ( !firstColExpressID ) return
        // create all data point 
        //capabilities.json
        // "dataReductionAlgorithm": {
        //     "window": {
        //         "count": 100000
        //     }
        // }
        // that means allow visual 100000 row or 100000 elements
        const selectionIds: DataPoint[] = []
        table.rows.forEach( ( row: DataViewTableRow, rowIndex: number ) => {
            const expressID = row[0] as string
            const selectionId: ISelectionId = this.visualHost.createSelectionIdBuilder()
                .withTable( table, rowIndex )
                .createSelectionId();
            selectionIds.push( { expressID, selectionId } )
        } )
        if ( !this.viewer ) this.viewer = new Viewer( this.target, this.selectionManager, selectionIds, this.events, options )
    }


}
