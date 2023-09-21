/* eslint-disable @typescript-eslint/no-unused-vars */


import powerbi from "powerbi-visuals-api";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as OBC from 'openbim-components'
import * as THREE from 'three'
import "../style/visual.less"
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
    container!: HTMLDivElement
    private initContainer() {
        this.container = document.createElement( 'div' )
        this.container.style.width = '100%'
        this.container.style.height = '100%'
        this.container.style.position = 'relative'
        this.target.appendChild( this.container )
    }
    components!: OBC.Components
    fragments!: OBC.FragmentManager
    loadButton!: OBC.Button
    private initScene() {
        this.components = new OBC.Components();

        this.components.scene = new OBC.SimpleScene( this.components );
        this.components.renderer = new OBC.PostproductionRenderer( this.components, this.container );
        this.components.camera = new OBC.SimpleCamera( this.components );
        this.components.raycaster = new OBC.SimpleRaycaster( this.components );

        this.components.init();
        ( this.components.renderer as OBC.PostproductionRenderer ).postproduction.enabled = true;

        const scene = this.components.scene.get();
        scene.background = null;
        ( this.components.camera as OBC.SimpleCamera ).controls.setLookAt( 10, 10, 10, 0, 0, 0 );

        const directionalLight = new THREE.DirectionalLight();
        directionalLight.position.set( 5, 10, 3 );
        directionalLight.intensity = 0.5;
        scene.add( directionalLight );

        const ambientLight = new THREE.AmbientLight();
        ambientLight.intensity = 0.5;
        scene.add( ambientLight );

        const grid = new OBC.SimpleGrid( this.components, new THREE.Color( 0x666666 ) );
        this.components.tools.add( 'grid', grid );
        const gridMesh = grid.get();
        const effects = ( this.components.renderer as OBC.PostproductionRenderer ).postproduction.customEffects;
        effects.excludedMeshes.push( gridMesh )
        this.fragments = new OBC.FragmentManager( this.components );

        const toolbar = new OBC.Toolbar( this.components );
        this.components.ui.addToolbar( toolbar );
        this.loadButton = new OBC.Button( this.components );
        this.loadButton.materialIcon = "download";
        this.loadButton.tooltip = "Load model";
        toolbar.addChild( this.loadButton );
        this.loadButton.onclick = () => this.loadFileLocal()

    }

    private loadFileLocal() {
        const input = document.createElement( "input" );
        input.setAttribute( "type", "file" );
        input.setAttribute( "accept", ".frag" );
        input.click();
        input.onchange = ( e: any ) => {
            const file = e.target.files[0] as File;
            const reader = new FileReader();

            reader.onload = () => {
                const dataBlob = reader.result as ArrayBuffer
                const buffer = new Uint8Array( dataBlob );
                this.fragments.load( buffer );
                this.loadButton.tooltip = "OK";
            };
            reader.onerror = () => {
                this.loadButton.tooltip = "Error";
            }
            reader.readAsArrayBuffer( file );
        };
        input.remove();
    }


}