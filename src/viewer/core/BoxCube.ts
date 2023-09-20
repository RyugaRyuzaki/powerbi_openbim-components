/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fontJSON from "./droid_sans_bold.typeface.json";
import { BoxGeometry, EdgesGeometry, LineSegments, Mesh, RingGeometry, Vector3, Scene } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// this class create all item of box cube view
/**
 * @param {Object three JS} scene
 * @param {class or object} material => material manager
 */
export class BoxCube {
	private _scene: Scene
	private _material: any
	private _loader: FontLoader = new FontLoader()
	private _font: any;

	constructor( scene: Scene, material: any ) {
		this._scene = scene;
		this._material = material;
		// load font json
		this._font = this._loader.parse( fontJSON );
		// create 24 meshes
		this.init()
	}
	/**
	 * release memories
	 */
	dispose() {
		this._scene.children.forEach( ( child ) => {
			if ( child.userData.dispose ) BoxCube.disposeItem( child );
		} );
	}
	private init() {
		this.initItem( "left", 96, 96, 16, 0, 0, 56 );
		this.initTextSide( "L", -20, -24, 64 );
		this.initItem( "right", 96, 96, 16, 0, 0, -56 );
		this.initTextSide( "R", -30, -24, 64 );

		this.initItem( "top", 96, 16, 96, 0, 56, 0 );
		this.initTextSide( "T", -20, -24, 64 );

		this.initItem( "bottom", 96, 16, 96, 0, -56, 0 );
		this.initTextSide( "BO", -55, -24, 64 );

		this.initItem( "front", 16, 96, 96, 56, 0, 0 );
		this.initTextSide( "F", -30, -24, 64 );
		this.initItem( "back", 16, 96, 96, -56, 0, 0 );
		this.initTextSide( "B", -30, -24, 64 );

		this.initTextRing( "W", -32, -62, 105 );
		this.initTextRing( "E", -16, -62, -105 );
		this.initTextRing( "N", -105, -62, 20 );
		this.initTextRing( "S", 105, -62, 20 );

		this.initItem( "left_front", 16, 96, 16, 56, 0, 56 );
		this.initItem( "left_back", 16, 96, 16, -56, 0, 56 );
		this.initItem( "right_front", 16, 96, 16, 56, 0, -56 );
		this.initItem( "right_back", 16, 96, 16, -56, 0, -56 );

		this.initItem( "top_left", 96, 16, 16, 0, 56, 56 );
		this.initItem( "top_right", 96, 16, 16, 0, 56, -56 );
		this.initItem( "top_front", 16, 16, 96, 56, 56, 0 );
		this.initItem( "top_back", 16, 16, 96, -56, 56, 0 );

		this.initItem( "bottom_left", 96, 16, 16, 0, -56, 56 );
		this.initItem( "bottom_right", 96, 16, 16, 0, -56, -56 );
		this.initItem( "bottom_front", 16, 16, 96, 56, -56, 0 );
		this.initItem( "bottom_back", 16, 16, 96, -56, -56, 0 );

		this.initItem( "top_left_front", 16, 16, 16, 56, 56, 56 );
		this.initItem( "top_left_back", 16, 16, 16, -56, 56, 56 );
		this.initItem( "top_right_front", 16, 16, 16, 56, 56, -56 );
		this.initItem( "top_right_back", 16, 16, 16, -56, 56, -56 );

		this.initItem( "bottom_left_front", 16, 16, 16, 56, -56, 56 );
		this.initItem( "bottom_left_back", 16, 16, 16, -56, -56, 56 );
		this.initItem( "bottom_right_front", 16, 16, 16, 56, -56, -56 );
		this.initItem( "bottom_right_back", 16, 16, 16, -56, -56, -56 );
		this.initRing();
		this.initOutLine();
	}
	/**
	 *
	 * @param {*} item
	 */
	static disposeItem( item: any ) {
		item.geometry.dispose();
		item.geometry = null;
		item.removeFromParent();
		item = null;
	}
	/**
	 *
	 * @param {*} name
	 * @param {*} x0
	 * @param {*} y0
	 * @param {*} z0
	 * @param {*} x1
	 * @param {*} y1
	 * @param {*} z1
	 * @returns
	 */
	private initItem( name: string, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number ): Mesh {
		const geometry = new BoxGeometry( x0, y0, z0 );
		geometry.translate( x1, y1, z1 );
		const mesh = new Mesh( geometry, this._material.normalCube );
		mesh.userData.Element = true;
		mesh.userData.dispose = true;
		mesh.name = name;
		this._scene.add( mesh );
		return mesh;
	}
	/**
	 *
	 * @returns
	 */
	private initRing() {
		const geometry = new RingGeometry( 100, 160, 30 );
		geometry.rotateX( -Math.PI / 2 );
		geometry.translate( 0, -65, 0 );
		const mesh = new Mesh( geometry, this._material.ring );
		mesh.userData.dispose = true;

		this._scene.add( mesh );
		return mesh;
	}
	/**
	 *
	 * @returns
	 */
	initOutLine() {
		const geometry = new BoxGeometry( 128, 128, 128 );
		const edges = new EdgesGeometry( geometry );
		const outLine = new LineSegments( edges, this._material.outLineCube );
		outLine.userData.dispose = true;

		this._scene.add( outLine );
		return outLine;
	}
	/**
	 *
	 * @param {*} scene
	 * @param {*} name
	 * @param {*} x1
	 * @param {*} y1
	 * @param {*} z1
	 * @returns
	 */
	initTextSide( name, x1, y1, z1 ) {
		const parameters = {
			font: this._font,
			size: 60,
			height: 2,
		};
		const textCube = new TextGeometry( name, parameters );
		textCube.translate( x1, y1, z1 );
		this.rotateTextCube( name, textCube );
		const meshCube = new Mesh( textCube, this._material.textCube );
		meshCube.userData.dispose = true;

		this._scene.add( meshCube );
		return meshCube;
	}
	/**
	 *
	 * @param {*} scene
	 * @param {*} name
	 * @param {*} nameText
	 * @param {*} x1
	 * @param {*} y1
	 * @param {*} z1
	 * @returns
	 */
	initTextRing( name, x1, y1, z1 ) {
		const parameters = {
			font: this._font,
			size: 40,
			height: 2,
		};
		const textCube = new TextGeometry( name, parameters );
		this.rotateRing( name, textCube );
		textCube.translate( x1, y1, z1 );
		const meshCube = new Mesh( textCube, this._material.textRing );
		meshCube.userData.dispose = true;
		meshCube.userData.Element = true;
		this._scene.add( meshCube );
		return meshCube;
	}
	/**
	 *
	 * @param {*} name
	 * @param {*} textCube
	 */
	rotateRing( name: string, textCube: TextGeometry ) {
		switch ( name ) {
			case "W":
				textCube.rotateX( Math.PI / 2 );
				break;
			case "E":
				textCube.rotateX( -Math.PI / 2 );
				break;
			case "S":
				textCube.rotateY( Math.PI / 2 );
				textCube.rotateZ( -Math.PI / 2 );
				break;
			case "N":
				textCube.rotateY( Math.PI / 2 );
				textCube.rotateZ( Math.PI / 2 );
				break;
			default:
				break;
		}
	}
	/**
	 *
	 * @param {*} name
	 * @param {*} textCube
	 */
	rotateTextCube( name, textCube ) {
		switch ( name ) {
			case "L":
				break;
			case "R":
				textCube.rotateY( Math.PI );
				break;
			case "T":
				textCube.rotateY( Math.PI / 2 );
				textCube.rotateZ( Math.PI / 2 );
				break;
			case "BO":
				textCube.rotateX( Math.PI / 2 );
				break;
			case "F":
				textCube.rotateY( Math.PI / 2 );
				break;
			case "B":
				textCube.rotateY( -Math.PI / 2 );
				break;
			default:
				break;
		}
	}

}
/**
 *
 * @param {*} view
 * @param {*} name
 * @returns
 */
export function switchPick( contextCamera: any, name: any ) {
	const { currentCamera, PerspectiveCamera, controls, radius, center } = contextCamera;
	// var max = currentCamera.userData.max ? currentCamera.userData.max : new Vector3( radius, radius, radius );
	// var min = currentCamera.userData.min ? currentCamera.userData.min : new Vector3( -radius, -radius, -radius );
	// const fov = PerspectiveCamera.fov;
	// const aspect = view.width / view.height;
	// //get length model
	// var length = Math.abs( max.x - min.x );
	// if ( areEqual( length, 0.0, 1e-3 ) ) length = radius;
	// //get width model
	// var width = Math.abs( max.z - min.z );
	// if ( areEqual( width, 0.0, 1e-3 ) ) width = radius;
	// //get width model
	// var height = Math.abs( max.y - min.y );
	// if ( areEqual( height, 0.0, 1e-3 ) ) height = radius;

	// function getDepth( length0, width0, height0 ) {
	// 	var aspect1 = length0 / height0;
	// 	var mainSide = aspect1 > aspect ? length0 : height0;
	// 	return ( mainSide * 0.5 ) / Math.tan( ( fov * ( Math.PI / 180 ) ) / 2 ) + width0 / 2;
	// }
	// radius *= 2;
	// var newPosition;
	// switch ( name ) {
	// 	case "left":
	// 		newPosition = {
	// 			x: cameraTarget.x,
	// 			y: cameraTarget.y,
	// 			z: cameraTarget.z + getDepth( length, width, height ),
	// 		};
	// 		break;
	// 	case "right":
	// 		newPosition = {
	// 			x: cameraTarget.x,
	// 			y: cameraTarget.y,
	// 			z: cameraTarget.z - getDepth( length, width, height ),
	// 		};
	// 		break;
	// 	case "top":
	// 		newPosition = {
	// 			x: cameraTarget.x,
	// 			y: cameraTarget.y + getDepth( length, height, width ),
	// 			z: cameraTarget.z,
	// 		};
	// 		break;
	// 	case "bottom":
	// 		newPosition = {
	// 			x: cameraTarget.x,
	// 			y: cameraTarget.y - getDepth( length, height, width ),
	// 			z: cameraTarget.z,
	// 		};
	// 		break;
	// 	case "front":
	// 		newPosition = {
	// 			x: cameraTarget.x + getDepth( width, length, height ),
	// 			y: cameraTarget.y,
	// 			z: cameraTarget.z,
	// 		};
	// 		break;
	// 	case "back":
	// 		newPosition = {
	// 			x: cameraTarget.x - getDepth( width, length, height ),
	// 			y: cameraTarget.y,
	// 			z: cameraTarget.z,
	// 		};
	// 		break;
	// 	case "left_front":
	// 		newPosition = {
	// 			x: cameraTarget.x + radius,
	// 			y: cameraTarget.y,
	// 			z: cameraTarget.z + radius,
	// 		};
	// 		break;
	// 	case "left_back":
	// 		newPosition = {
	// 			x: cameraTarget.x - radius,
	// 			y: cameraTarget.y,
	// 			z: cameraTarget.z + radius,
	// 		};
	// 		break;
	// 	case "right_front":
	// 		newPosition = {
	// 			x: cameraTarget.x + radius,
	// 			y: cameraTarget.y,
	// 			z: cameraTarget.z - radius,
	// 		};
	// 		break;
	// 	case "right_back":
	// 		newPosition = {
	// 			x: cameraTarget.x - radius,
	// 			y: cameraTarget.y,
	// 			z: cameraTarget.z - radius,
	// 		};
	// 		break;
	// 	case "top_left":
	// 		newPosition = {
	// 			x: cameraTarget.x,
	// 			y: cameraTarget.y + radius,
	// 			z: cameraTarget.z + radius,
	// 		};
	// 		break;
	// 	case "top_right":
	// 		newPosition = {
	// 			x: cameraTarget.x,
	// 			y: cameraTarget.y + radius,
	// 			z: cameraTarget.z - radius,
	// 		};
	// 		break;
	// 	case "top_front":
	// 		newPosition = {
	// 			x: cameraTarget.x + radius,
	// 			y: cameraTarget.y + radius,
	// 			z: cameraTarget.z,
	// 		};
	// 		break;
	// 	case "top_back":
	// 		newPosition = {
	// 			x: cameraTarget.x - radius,
	// 			y: cameraTarget.y + radius,
	// 			z: cameraTarget.z,
	// 		};
	// 		break;
	// 	case "bottom_left":
	// 		newPosition = {
	// 			x: cameraTarget.x,
	// 			y: cameraTarget.y - radius,
	// 			z: cameraTarget.z + radius,
	// 		};
	// 		break;
	// 	case "bottom_right":
	// 		newPosition = {
	// 			x: cameraTarget.x,
	// 			y: cameraTarget.y - radius,
	// 			z: cameraTarget.z - radius,
	// 		};
	// 		break;
	// 	case "bottom_front":
	// 		newPosition = {
	// 			x: cameraTarget.x + radius,
	// 			y: cameraTarget.y - radius,
	// 			z: cameraTarget.z,
	// 		};
	// 		break;
	// 	case "bottom_back":
	// 		newPosition = {
	// 			x: cameraTarget.x - radius,
	// 			y: cameraTarget.y - radius,
	// 			z: cameraTarget.z,
	// 		};
	// 		break;
	// 	case "top_left_front":
	// 		newPosition = {
	// 			x: cameraTarget.x + radius,
	// 			y: cameraTarget.y + radius,
	// 			z: cameraTarget.z + radius,
	// 		};
	// 		break;
	// 	case "top_left_back":
	// 		newPosition = {
	// 			x: cameraTarget.x - radius,
	// 			y: cameraTarget.y + radius,
	// 			z: cameraTarget.z + radius,
	// 		};
	// 		break;
	// 	case "top_right_front":
	// 		newPosition = {
	// 			x: cameraTarget.x + radius,
	// 			y: cameraTarget.y + radius,
	// 			z: cameraTarget.z - radius,
	// 		};
	// 		break;
	// 	case "top_right_back":
	// 		newPosition = {
	// 			x: cameraTarget.x - radius,
	// 			y: cameraTarget.y + radius,
	// 			z: cameraTarget.z - radius,
	// 		};
	// 		break;
	// 	case "bottom_left_front":
	// 		newPosition = {
	// 			x: cameraTarget.x + radius,
	// 			y: cameraTarget.y - radius,
	// 			z: cameraTarget.z + radius,
	// 		};
	// 		break;
	// 	case "bottom_left_back":
	// 		newPosition = {
	// 			x: cameraTarget.x - radius,
	// 			y: cameraTarget.y - radius,
	// 			z: cameraTarget.z + radius,
	// 		};
	// 		break;
	// 	case "bottom_right_front":
	// 		newPosition = {
	// 			x: cameraTarget.x + radius,
	// 			y: cameraTarget.y - radius,
	// 			z: cameraTarget.z - radius,
	// 		};
	// 		break;
	// 	case "bottom_right_back":
	// 		newPosition = {
	// 			x: cameraTarget.x - radius,
	// 			y: cameraTarget.y - radius,
	// 			z: cameraTarget.z - radius,
	// 		};
	// 		break;
	// 	default:
	// 		break;
	// }
	// controls.setLookAt(
	// 	newPosition.x,
	// 	newPosition.y,
	// 	newPosition.z,
	// 	cameraTarget.x,
	// 	cameraTarget.y,
	// 	cameraTarget.z,
	// 	true
	// );
	// view.updateViewAnimation(cameraTarget, oldPosition, newPosition);
}
