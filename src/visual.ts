/* eslint-disable @typescript-eslint/no-unused-vars */

import * as pako from "pako";
import powerbi from "powerbi-visuals-api";
import 'regenerator-runtime/runtime';
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import IPromise = powerbi.IPromise;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import IVisualEventService = powerbi.extensibility.IVisualEventService;
import * as OBC from 'openbim-components'
import * as THREE from 'three'
import "../style/visual.less"
const baseUrl = "http://localhost:3000";
const fileId = "CenterConference";


export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: number;
    private visualHost: IVisualHost
    private events: IVisualEventService;
    constructor( options: VisualConstructorOptions ) {
        console.log( 'Visual constructor', options );
        this.target = options.element;
        this.updateCount = 0;
        this.visualHost = options.host;
        this.events = options.host.eventService;
    }

    public update( options: VisualUpdateOptions ) {
        this.events.renderingStarted( options );
        if ( options.dataViews === undefined || options.dataViews === null ) {
            return;
        }
        if ( this.target && document ) {
            fetch( `${baseUrl}/download/${fileId}frag.gz`, {
                method: "GET",
                mode: "cors",
            } )
                .then( res => res.arrayBuffer() )
                .then( fileZip => {
                    const file = pako.inflate( fileZip )
                    const buffer = new Uint8Array( file );
                    this.initScene( buffer );
                    this.events.renderingFinished( options );
                } )
                .catch( error => {
                    this.events.renderingFailed( options );
                } )
        }

    }

    components!: OBC.Components
    fragmentManager!: OBC.FragmentManager
    highlighter!: OBC.FragmentHighlighter
    private initScene( buffer: Uint8Array ) {
        this.target.style.width = '100%'
        this.target.style.height = '100%'
        this.target.style.position = 'relative'
        this.components = new OBC.Components();

        this.components.scene = new OBC.SimpleScene( this.components );
        this.components.renderer = new OBC.PostproductionRenderer( this.components, this.target );
        this.components.camera = new OBC.SimpleCamera( this.components );
        this.components.raycaster = new OBC.SimpleRaycaster( this.components );

        this.components.init();
        ( this.components.renderer as OBC.PostproductionRenderer ).postproduction.enabled = true;

        const scene = this.components.scene.get();
        // scene.background = null;
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
        this.fragmentManager = new OBC.FragmentManager( this.components );
        this.highlighter = new OBC.FragmentHighlighter( this.components, this.fragmentManager );
        this.loadIfcModel( buffer );
    }

    private loadIfcModel = async ( buffer: Uint8Array ) => {
        const model = await this.fragmentManager.load( buffer );
        this.highlighter.update();
        if ( model.boundingBox ) {
            this.viewSphere = this.getSphereModel( model.boundingBox );
            this.fitToZoom( this.viewSphere )
        }
        ( this.components.renderer as OBC.PostproductionRenderer ).postproduction.customEffects.outlineEnabled = true;
        // this.highlighter.outlineEnabled = true;
        const highlightMaterial = new THREE.MeshBasicMaterial( {
            color: '#BCF124',
            depthTest: false,
            opacity: 0.8,
            transparent: true
        } );

        this.highlighter.add( 'default', [highlightMaterial] );
        this.highlighter.outlineMaterial.color.set( 0xf0ff7a );
        let lastSelection;

        const singleSelection: any = {
            value: true,
        };
        async function highlightOnClick( event ) {
            const result = await this.highlighter.highlight( 'default', singleSelection.value );
            if ( result ) {
                lastSelection = {};
                for ( const fragment of result.fragments ) {
                    const fragmentID = fragment.id;
                    lastSelection[fragmentID] = [result.id];

                }

            }
        }
        this.target.addEventListener( 'click', ( event ) => highlightOnClick( event ) );
        // it did not work
    }
    private getSphereModel( boundingBox: THREE.Box3 ) {
        const { max, min } = boundingBox
        const dir = max.clone().sub( min.clone() ).normalize()
        const dis = max.distanceTo( min )
        const center = max.clone().add( dir.multiplyScalar( -dis * 0.5 ) )
        return new THREE.Sphere( center, dis * 0.5 )
    }
    private fitToZoom( sphere: THREE.Sphere ) {
        ( this.components.camera as OBC.SimpleCamera ).controls.fitToSphere( sphere, true )
        // it did not work for animate
    }
    _viewSphere!: THREE.Sphere
    set viewSphere( sphere: THREE.Sphere ) {
        if ( !sphere ) return;
        this._viewSphere = sphere?.clone()
    }
    get viewSphere() {
        return this._viewSphere
    }


}