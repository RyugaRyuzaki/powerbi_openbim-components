import * as THREE from "three";
import { FragmentsGroup } from "bim-fragment";

import { Context } from "./core";
import { MaterialManager } from "./material/MaterialManager";
import { IfcLoader } from "./model/ifc/IfcLoader";
export class BimModel {
    /**
     *
     */
    scene: THREE.Scene = new THREE.Scene()
    material: MaterialManager = new MaterialManager()
    context!: Context;
    ifcLoader: IfcLoader = new IfcLoader()
    constructor( private container: HTMLDivElement, private canvas: HTMLCanvasElement ) {
        this.context = new Context( this.scene, this.container, this.canvas, this.material )
    }
    loadModel( buffer: Uint8Array, btn: HTMLButtonElement ) {
        this.ifcLoader.ifcLoaded.on( ( model: FragmentsGroup ) => {
            this.scene.add( model )
            btn.textContent = this.scene.children.length.toString()
        } )
        this.ifcLoader?.loadFragment( buffer );
    }
    private loadFragment = async ( dataBlob: Uint8Array ) => {

        this.ifcLoader.ifcLoaded.on( ( model: FragmentsGroup ) => {
            this.scene.add( model )
        } )
        this.ifcLoader?.loadFragment( dataBlob );
    }
}