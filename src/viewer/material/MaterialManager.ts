/* eslint-disable @typescript-eslint/no-explicit-any */
import { MeshLambertMaterial, MeshBasicMaterial } from "three";
import { CubeViewMaterial, createMaterial } from "./DefaultMaterial";

import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
// manage material for all materials of models except ifcModel
export class MaterialManager {
	highlight: MeshLambertMaterial
	select: MeshLambertMaterial
	normalCube: MeshLambertMaterial
	hoverCube: MeshLambertMaterial
	textCube: MeshLambertMaterial
	ring: MeshLambertMaterial
	textRing: MeshLambertMaterial
	outLineCube: MeshBasicMaterial
	dimension: LineMaterial
	modelMaterials: []
	constructor() {
		this.highlight = createMaterial( "red", true, 0.51 );
		this.select = createMaterial( "#08c73b", true, 1 );
		this.normalCube = CubeViewMaterial.normalCube;
		this.hoverCube = CubeViewMaterial.hoverCube;
		this.textCube = CubeViewMaterial.textCube;
		this.ring = CubeViewMaterial.ring;
		this.textRing = CubeViewMaterial.textRing;
		this.outLineCube = CubeViewMaterial.outLineCube;
		// use this for setting line with for every camera position
		this.dimension = new LineMaterial( {
			linewidth: 4, // in world units with size attenuation, pixels otherwise
			vertexColors: true,

			//resolution:  // to be set by renderer, eventually
			// dashes
			dashed: false,
			alphaToCoverage: true,
			depthTest: false,
		} );
		this.modelMaterials = []
	}
	/**
	 * release all materials memory
	 */
	dispose() {
		MaterialManager.disposeMaterial( this.highlight );
		MaterialManager.disposeMaterial( this.select );
		MaterialManager.disposeMaterial( this.normalCube );
		MaterialManager.disposeMaterial( this.hoverCube );
		MaterialManager.disposeMaterial( this.textCube );
		MaterialManager.disposeMaterial( this.textRing );
		MaterialManager.disposeMaterial( this.outLineCube );
		MaterialManager.disposeMaterial( this.dimension );
		this.modelMaterials = [];
	}
	/**
	 * release the material memory
	 * @param {} material
	 */
	static disposeMaterial( material: any ) {
		material.dispose();
		material = null;
	}
}
