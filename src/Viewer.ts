
import powerbi from "powerbi-visuals-api";
import * as OBC from 'openbim-components'
import * as THREE from 'three'
import * as pako from "pako";
import IVisualEventService = powerbi.extensibility.IVisualEventService;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import ISelectionId = powerbi.visuals.ISelectionId
const baseUrl = "http://localhost:3000";
const fileId = "CenterConference";
export class Viewer {
    /**
     *
     */
    components!: OBC.Components
    container!: HTMLDivElement
    fragmentManager!: OBC.FragmentManager
    highlighter!: OBC.FragmentHighlighter
    highlightMaterial!: THREE.MeshBasicMaterial
    boundingBox!: THREE.Box3

    private readonly target: any | HTMLDivElement
    private selectionManager: ISelectionManager
    private events: IVisualEventService;
    private options: VisualUpdateOptions;
    private selectionIds!: DataPoint[];
    constructor( target: any | HTMLDivElement, selectionManager: ISelectionManager, selectionIds: DataPoint[], events: IVisualEventService, options: VisualUpdateOptions ) {
        this.target = target
        this.selectionManager = selectionManager
        this.selectionIds = selectionIds
        this.events = events
        this.options = options
        this.initScene()
        this.initFragment()
        this.loadFragment()
    }
    /**
     * init scene
     */
    private initScene() {
        this.container = document.createElement( 'div' )
        this.container.className = 'full-screen'
        this.container.style.zIndex = '2000'
        this.target.style.cursor = 'default'
        this.target.appendChild( this.container )
        this.components = new OBC.Components();
        this.components.scene = new OBC.SimpleScene( this.components );
        this.components.renderer = new OBC.PostproductionRenderer( this.components, this.container );
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
        this.initToolBar()

    }
    /**
     * init tool bar
     */
    loadButton!: OBC.Button
    private initToolBar() {
        const toolbar = new OBC.Toolbar( this.components, { position: 'right' } );
        this.components.ui.addToolbar( toolbar );
        this.loadButton = new OBC.Button( this.components );
        this.loadButton.materialIcon = "Home";
        this.loadButton.tooltip = "Home";
        toolbar.addChild( this.loadButton );
        this.loadButton.onclick = () => {
            if ( !this.boundingBox ) return
            this.fitToZoom()
        }
    }
    private fitToZoom() {
        const { max, min } = this.boundingBox;
        if ( !max || !min ) return;
        // define vector from max to min
        const dir = max.clone().sub( min.clone() ).normalize();
        // distance max to min
        const dis = max.distanceTo( min );
        // center

        const center = max.clone().add( dir.clone().multiplyScalar( -0.5 * dis ) );

        // camera position
        const pos = max.clone().add( dir.clone().multiplyScalar( 0.5 * dis ) );
        // set true mean we can animate
        ( this.components.camera as OBC.SimpleCamera ).controls.setLookAt( pos.x, pos.y, pos.z, center.x, center.y, center.z, true );
    }
    /**
     * dispose
     */
    private disposeFragment() {
        this.fragmentManager.dispose()
        this.highlighter.dispose()
        this.highlightMaterial.dispose()
    }
    /**
     * init fragment
     */
    private initFragment() {
        this.fragmentManager = new OBC.FragmentManager( this.components );
        this.highlighter = new OBC.FragmentHighlighter( this.components, this.fragmentManager );
        ( this.components.renderer as OBC.PostproductionRenderer ).postproduction.customEffects.outlineEnabled = true;
        this.highlighter.outlineEnabled = true;
        this.highlightMaterial = new THREE.MeshBasicMaterial( {
            color: '#BCF124',
            depthTest: false,
            opacity: 0.8,
            transparent: true
        } );

        this.highlighter.add( 'default', [this.highlightMaterial] );
        this.highlighter.outlineMaterial.color.set( 0xf0ff7a );
        this.container.addEventListener( 'click', ( event: MouseEvent ) => {
            this.highlightOnClick( event )
        } );

    }
    /**
     * 
     * @param fileName load fragment
     * @param type 
     */
    private loadFragment( fileName: string = fileId, type: string = 'frag' ) {
        ( async () => {
            try {
                const res = await fetch( `${baseUrl}/download/${fileName}${type}.gz`, {
                    method: "GET",
                    mode: "cors",
                } )
                const fileZip = await res.arrayBuffer()
                const file = pako.inflate( fileZip )
                const buffer = new Uint8Array( file );
                const model = await this.fragmentManager.load( buffer );
                this.highlighter.update();
                if ( model.boundingBox ) {
                    this.boundingBox = model.boundingBox
                    this.fitToZoom()
                }
                // if everything is ok notify visual is success
                this.events.renderingFinished( this.options );
            } catch ( error ) {
                // if not OK, notify visual is error that means can not show viewer in visual
                this.events.renderingFailed( this.options );

            }
        } )()

    }
    lastSelection!: any
    singleSelection: any = {
        value: true,
    };
    private highlightOnClick = async ( event: MouseEvent ) => {
        event.preventDefault();
        const result = await this.highlighter.highlight( 'default', this.singleSelection.value, true );
        if ( result ) {
            this.lastSelection = {};

            for ( const fragment of result.fragments ) {
                const fragmentID = fragment.id;
                this.lastSelection[fragmentID] = [result.id];
            }
            // find the selection by expressID
            const selection = this.selectionIds.find( ( s: DataPoint ) => s.expressID.toString() === result.id )
            // if found notify to another visual
            await this.selectionManager.select( selection.selectionId )
        }
    }
}
/**
 * define data point
 */
export interface DataPoint {
    expressID: string | number;
    selectionId: ISelectionId
}