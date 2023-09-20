/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import * as THREE from "three";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { RayCaster } from "./RayCaster";
import { Event } from "../Event";
import { CubeView } from "./CubeView";
import { PostProduction } from "./PostProduction";
import { ViewPoint } from "./ViewPoint";
export class Context {
	onInitialized: Event<Context> = new Event();
	private _clock: THREE.Clock = new THREE.Clock()

	private _axes!: THREE.AxesHelper
	private initAxes() {
		this._axes = new THREE.AxesHelper( 3 );
		( this._axes.material as THREE.Material ).depthTest = false!;
		this._axes.renderOrder = 1;
		this._scene.add( this._axes );
	}
	private _ambientLight!: THREE.AmbientLight
	private initAmbientLight() {
		this._ambientLight = new THREE.AmbientLight( 0xffffff, 2 );
		this._scene.add( this._ambientLight );
	}
	private _directionalLight!: THREE.DirectionalLight
	private initDirectionalLight() {
		this._directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
		this._directionalLight.position.set( 100, 100, 100 );
		this._directionalLight.target.position.set( 0, 0, 0 );
		this._directionalLight.castShadow = true;
		this._directionalLight.shadow.bias = -0.001;
		this._directionalLight.shadow.mapSize.width = 2048;
		this._directionalLight.shadow.mapSize.height = 2048;
		this._directionalLight.shadow.camera.near = 0.1;
		this._directionalLight.shadow.camera.far = 1000.0;
		this._directionalLight.shadow.camera.left = 10;
		this._directionalLight.shadow.camera.right = -10;
		this._directionalLight.shadow.camera.top = 10;
		this._directionalLight.shadow.camera.bottom = -10;
		this._scene.add( this._directionalLight );
		this._scene.add( this._directionalLight.target );
	}

	private _size!: THREE.Vector2
	set size( size: THREE.Vector2 ) {
		this._size = size.clone()
		if ( this.renderer ) this.renderer.size = size
		if ( this.camera ) this.camera.size = size
	}
	get size() {
		return this._size
	}
	set OrbitPoint( point: THREE.Vector3 ) {
		const newP = point ? point : this.viewSphere.center
		if ( newP )
			this.camera.controls.setOrbitPoint( newP.x, newP.y, newP.z );
	}

	private _viewSphere: THREE.Sphere = new THREE.Sphere( new THREE.Vector3(), 30 )
	set viewSphere( viewSphere: THREE.Sphere ) {
		this._viewSphere = viewSphere.clone();
	}
	get viewSphere() {
		return this._viewSphere;
	}
	fitToModelLoaded( sphere: THREE.Sphere ) {
		this.viewSphere = sphere
		this.fitToSphere( this.viewSphere )
		const center = this.viewSphere.center
		this.OrbitPoint = center
	}

	fitToSphere( sphere: THREE.Sphere ) {
		if ( !this.camera.controls ) return;
		this.camera.controls.fitToSphere( sphere, true )
	}

	renderer: Renderer
	camera: Camera
	RayCaster: RayCaster
	private _scene: THREE.Scene
	private _container: HTMLDivElement
	private _material: any
	private _canvas: HTMLCanvasElement
	private _cubeView: CubeView
	private _postProduction!: PostProduction
	viewPoint!: ViewPoint
	constructor( scene: THREE.Scene, container: HTMLDivElement, canvas: HTMLCanvasElement, material: any ) {
		this._scene = scene;
		this._container = container;
		this._canvas = canvas;
		this._material = material;
		this.size = new THREE.Vector2( this._container.clientWidth, this._container.clientHeight )
		this.renderer = new Renderer( this._container, this.size, this._canvas );
		this.camera = new Camera( this.renderer.domElement, this.size );
		this.RayCaster = new RayCaster( this._scene, this.renderer, this.camera );
		this._postProduction = new PostProduction( this._scene, this.camera.currentCamera, this.size, this.renderer.renderer, this.renderer.domElement, this.camera.controls )
		this._postProduction.enabled = true
		this._postProduction.setupEvents = true
		this.viewPoint = new ViewPoint( this.renderer.domElement )
		this.initAxes()
		this.initAmbientLight()
		this.initDirectionalLight()
		this._cubeView = new CubeView( this._container, this.camera, this._material )
		this._clock.start()
		this.render()
		this._scene.background = new THREE.Color( 0x202932 );

		this.resize = true
		this.keyEvent = true

	}

	//
	dispose() {
		this.resize = false
		this.keyEvent = false
		this.renderer.dispose();
		this.camera.dispose();
		this._container.remove()
		this._canvas.remove()
		if ( this._axes ) {
			this._axes.geometry.dispose();
			( this._axes.geometry as any ) = null;
			this._axes.removeFromParent();
			( this._axes.material as THREE.Material )?.dispose();
			( this._axes.material as any ) = null;
			( this._axes as any ) = null;
		}
		if ( this._cubeView ) this._cubeView.dispose()
		this._clock.stop()
		if ( this._postProduction ) this._postProduction.dispose()
	}

	//
	/**
	 * resize window
	 */
	set resize( resize: boolean ) {
		if ( resize ) {
			window.addEventListener( "resize", this.onResize );
		} else {
			window.removeEventListener( "resize", this.onResize );
		}
	}
	set keyEvent( keyEvent: boolean ) {
		if ( keyEvent ) {
			document.addEventListener( "keydown", this.onKeyDown );
			document.addEventListener( "keyup", this.onKeyUp );
		} else {
			document.removeEventListener( "keydown", this.onKeyDown );
			document.removeEventListener( "keyup", this.onKeyUp );
		}
	}



	onResize = ( e: any ) => {
		const size = new THREE.Vector2( this._container.clientWidth, this._container.clientHeight )
		this.size = size
	};
	keyShift = false
	onKeyDown = ( e: any ) => {
		if ( e.keyCode === 17 ) {
			this.viewPoint.orbit = true
		}
		this.keyShift = ( e.keyCode === 16 );
	};
	onKeyUp = ( e: any ) => {
		this.viewPoint.orbit = false
		this.keyShift = false
	};
	render() {
		this._clock.start();
		this.update();
		this.onInitialized.trigger( this );
	}
	private update = () => {
		const delta = this._clock.getDelta();
		// Works the same as requestAnimationFrame, but let us use WebXR.
		this.camera.update( delta )
		if ( this._postProduction && this._postProduction.enabled ) {
			this._postProduction.composer.render()
		}
		else {
			this.renderer.renderer.render( this._scene, this.camera.currentCamera )
		}
		this.renderer.labelRenderer.render( this._scene, this.camera.currentCamera )

		if ( this._cubeView ) this._cubeView.update()

		this.renderer.renderer.setAnimationLoop( this.update );
	}
}
//