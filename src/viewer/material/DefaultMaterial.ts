import { MeshLambertMaterial, MeshBasicMaterial, DoubleSide } from "three";
import { LightColor } from "./LightColor";
//----------------------------------------------------------------
export function createMaterial( color: string | null = null, transparent = false, opacity = 1 ) {
	return new MeshLambertMaterial( {
		transparent: transparent,
		opacity: opacity,
		color: color ? color : "#" + Math.floor( Math.random() * 16777215 ).toString( 16 ),
		side: DoubleSide,
		depthWrite: true,
		depthTest: false,
	} );
}

export const CubeViewMaterial = {
	normalCube: new MeshLambertMaterial( {
		transparent: true,
		opacity: 0.9,
		color: LightColor.normalCube,
		depthTest: true,
		side: DoubleSide,
		depthWrite: true,
	} ),
	hoverCube: new MeshLambertMaterial( {
		transparent: true,
		opacity: 1,
		color: "green",
		depthTest: true,
	} ),
	textCube: new MeshLambertMaterial( {
		transparent: true,
		opacity: 0.7,
		color: "blue",
		depthTest: true,
	} ),

	ring: new MeshLambertMaterial( {
		transparent: true,
		opacity: 0.3,
		color: "blue",
		side: DoubleSide,
		depthWrite: true,
		depthTest: true,
	} ),
	textRing: new MeshLambertMaterial( {
		transparent: true,
		opacity: 1,
		color: "red",
		side: DoubleSide,
		depthWrite: true,
		depthTest: true,
	} ),
	outLineCube: new MeshBasicMaterial( {
		transparent: true,
		opacity: 1,
		color: "black",
		side: DoubleSide,
		depthWrite: true,
		depthTest: true,
	} ),
};
