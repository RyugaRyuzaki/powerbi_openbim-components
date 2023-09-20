/* eslint-disable @typescript-eslint/no-unused-vars */


import powerbi from "powerbi-visuals-api";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import { BimModel } from "./viewer/BimModel";


export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: number;

    constructor( options: VisualConstructorOptions ) {
        console.log( 'Visual constructor', options );
        this.target = options.element;
        this.updateCount = 0;

    }

    public update( options: VisualUpdateOptions ) {

        if ( this.target && document ) {
            this.initContainer();
            this.initScene()
        }
    }
    canvas!: HTMLCanvasElement
    container!: HTMLDivElement
    private initContainer() {
        this.canvas = document.createElement( 'canvas' )
        this.canvas.style.width = '100%'
        this.canvas.style.height = '100%'
        this.canvas.style.position = 'absolute'

        this.container = document.createElement( 'div' )
        this.container.style.width = '100%'
        this.container.style.height = '100%'
        this.container.style.position = 'relative'
        this.container.appendChild( this.canvas )
        this.target.appendChild( this.container )
    }


    bimModel!: BimModel
    private initScene() {
        this.bimModel = new BimModel( this.container, this.canvas )
        this.initButton()
    }
    private initButton() {
        const divBtn = document.createElement( 'div' )
        divBtn.style.position = 'absolute'
        divBtn.style.zIndex = '1000'
        const btn = document.createElement( 'button' )
        btn.style.outline = 'none'
        btn.style.border = 'none'
        btn.style.cursor = 'pointer'
        divBtn.appendChild( btn )
        this.container.appendChild( divBtn )
        btn.textContent = this.bimModel.scene.children.length.toString()
        btn.addEventListener( 'click', () => {
            this.loadFileLocal( btn )
        } )
    }
    private loadFileLocal( btn: HTMLButtonElement ) {
        const input = document.createElement( "input" );
        input.setAttribute( "type", "file" );
        input.setAttribute( "accept", ".frag" );
        input.click();
        const bimModel = this.bimModel
        input.onchange = async function ( e: any ) {
            const file = e.target.files[0] as File;
            const reader = new FileReader();

            reader.onload = () => {
                const dataBlob = reader.result as ArrayBuffer
                const buffer = new Uint8Array( dataBlob );
                bimModel.loadModel( buffer, btn )

            };
            reader.onerror = () => {
                btn.textContent = "Error"
            }
            reader.readAsArrayBuffer( file );
        };
        input.remove();
    }

    // /**
    //  * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
    //  * This method is called once every time we open properties pane or when the user edit any format property. 
    //  */
    // public getFormattingModel(): powerbi.visuals.FormattingModel {
    //     return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    // }
}