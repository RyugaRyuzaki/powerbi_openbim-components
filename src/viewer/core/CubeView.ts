/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import {
	AmbientLight,
	DirectionalLight,
	PerspectiveCamera,
	OrthographicCamera,
	Raycaster,
	Scene,
	Vector2,
	Vector3,
	WebGLRenderer,
} from "three";
import { BoxCube, switchPick } from "./BoxCube";
import { Camera } from ".";
/**
 * Cube View Class
 */
export class CubeView {
	radius = 500;

	scene: Scene = new Scene();
	private canvas: HTMLCanvasElement
	private initCanvas(): HTMLCanvasElement {
		const canvas = document.createElement( 'canvas' )
		canvas.style.position = 'absolute'
		canvas.style.width = '100%'
		canvas.style.height = '100%'
		return canvas
	}
	container: HTMLDivElement
	private initContainer(): HTMLDivElement {
		const container = document.createElement( 'div' )
		container.style.position = 'absolute'
		container.style.width = '80px'
		container.style.height = '80px'
		container.style.right = '0px'
		return container
	}
	_size: Vector2 = new Vector2()
	set size( size: Vector2 ) {
		this._size = size.clone()
	}
	get size() {
		return this._size
	}
	_boxCube: BoxCube


	renderer!: WebGLRenderer
	/**
	 *initialize renderer
	 */
	private initRenderer() {
		this.renderer = new WebGLRenderer( { canvas: this.canvas, alpha: true, antialias: true } );
		this.renderer.setSize( this.size.x, this.size.y );
		this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
		this.renderer.localClippingEnabled = true;
	}
	/**
	 *
	 */
	_PerspectiveCamera!: PerspectiveCamera
	private initPerspectiveCamera() {
		const perspectiveCamera = new PerspectiveCamera( 45, this.size.x / this.size.y, 1, 2000 );
		perspectiveCamera.userData.radius = this.radius;
		perspectiveCamera.position.set( this.radius, this.radius, this.radius )
		return perspectiveCamera
	}
	_OrthographicCamera!: OrthographicCamera
	private initOrthographicCamera() {
		const aspect = 1;
		const orthographicCamera = new OrthographicCamera(
			this.size.x / -aspect,
			this.size.x / aspect,
			this.size.y / aspect,
			this.size.y / -aspect,
			-1000,
			1000
		);
		orthographicCamera.position.set( 120, 120, 120 )
		return orthographicCamera
	}
	camera!: PerspectiveCamera | OrthographicCamera
	private initCamera() {
		this._PerspectiveCamera = this.initPerspectiveCamera()
		this._OrthographicCamera = this.initOrthographicCamera()
		this.camera = this._contextCamera.projection ? this._PerspectiveCamera : this._OrthographicCamera
	}
	_contextContainer: HTMLDivElement
	_contextCamera: Camera
	_material: any
	constructor( contextContainer: HTMLDivElement, contextCamera: Camera, material: any ) {
		this._contextContainer = contextContainer;
		this._contextCamera = contextCamera;
		this._material = material;
		this.container = this.initContainer();
		this.canvas = this.initCanvas()
		this.container.appendChild( this.canvas )
		this._contextContainer.appendChild( this.container )
		this.size = new Vector2( this.container.clientWidth, this.container.clientHeight )
		this.initCamera()
		this.initLight();
		this.initRenderer();
		this.initRayCaster();
		this._boxCube = new BoxCube( this.scene, this._material );
		this.event = true
	}
	/**
	 * release memories
	 */
	dispose() {
		this.event = false
		this.renderer.setAnimationLoop( null );
		this.renderer.renderLists.dispose();
		this._boxCube.dispose();
		this.canvas.remove()
		this.container.remove()
	}


	/**
	 * initialize light
	 */
	_AmbientLight!: AmbientLight
	_DirectionalLight!: DirectionalLight
	private initLight() {
		this._AmbientLight = new AmbientLight( 0xffffff, 2 );
		this.scene.add( this._AmbientLight );
		this._DirectionalLight = new DirectionalLight( 0xffffff, 2 );
		this._DirectionalLight.position.set( 350, 350, 350 );
		this._DirectionalLight.target.position.set( -0, 0, 0 );
		this._DirectionalLight.castShadow = true;
		this._DirectionalLight.shadow.bias = -0.001;
		this._DirectionalLight.shadow.mapSize.width = 2048;
		this._DirectionalLight.shadow.mapSize.height = 2048;
		this._DirectionalLight.shadow.camera.near = 0.1;
		this._DirectionalLight.shadow.camera.far = 100.0;
		this._DirectionalLight.shadow.camera.left = 10;
		this._DirectionalLight.shadow.camera.right = -10;
		this._DirectionalLight.shadow.camera.top = 10;
		this._DirectionalLight.shadow.camera.bottom = -10;
		this.scene.add( this._DirectionalLight );
	}


	/**
	 *initialize raycaster
	 */
	mouse!: Vector2
	rayCaster!: Raycaster
	initRayCaster() {
		this.rayCaster = new Raycaster();
		// (this.rayCaster.firstHitOnly as boolean) = true;
		this.mouse = new Vector2();
	}
	/**
	 *
	 * @param {Event} event
	 * @returns {object} object to wanna cast
	 */
	cast( event ) {
		const bounds = this.renderer.domElement.getBoundingClientRect();
		const x1 = event.clientX - bounds.left;
		const y1 = event.clientY - bounds.top;
		const x2 = bounds.right - bounds.left;
		this.mouse.x = ( x1 / x2 ) * 2 - 1;
		const y2 = bounds.bottom - bounds.top;
		this.mouse.y = -( y1 / y2 ) * 2 + 1;
		this.rayCaster.setFromCamera( this.mouse, this.camera );
		return this.rayCaster.intersectObjects( this.scene.children.filter( ( e ) => e.userData.Element ) );
	}
	/**
	 *event when hover on Box
	 */
	set event( event: boolean ) {
		const { domElement } = this.renderer
		if ( event ) {
			domElement.addEventListener( "mousemove", this.mousemove );
			domElement.addEventListener( "mouseout", this.mouseout );
			domElement.addEventListener( "click", this.onClick );
		} else {
			domElement.removeEventListener( "mousemove", this.mousemove );
			domElement.removeEventListener( "mouseout", this.mouseout );
			domElement.removeEventListener( "click", this.onClick );
		}
	}
	mousemove = ( event: any ) => {
		this.resetMaterial();
		this.found = event
	}
	mouseout = ( event: any ) => {
		this.resetMaterial();
	}
	onClick = ( event: any ) => {
		console.log( this.found );
	}
	_found: any | null
	set found( event ) {
		this._found = this.cast( event )[0];
		const { domElement } = this.renderer
		if ( this._found ) {
			domElement.style.cursor = "pointer";
			this._found.object.material = this._material.hoverCube;
		} else {
			domElement.style.cursor = "default";
		}
	}
	get found() {
		return this._found
	}


	/**
	 * reset material with only object is children of scene has userData.Element=true or not null
	 */
	resetMaterial() {
		const { normalCube } = this._material
		this.scene.children.filter( ( child ) => child.userData.Element ).forEach( ( child: any ) => {
			child.material = normalCube
		} )

	}

	/**
	 *
	 * @param {boolean} visible toggle visibility
	 */
	onVisibility( visible ) {
		this.container.style.display = visible ? "block" : "none";
	}
	/**
	 * must be called this function will
	 */
	update() {
		//calculate the vector between camera.position and controls.target of main viewer
		const position = this._contextCamera.controls.getPosition( new Vector3() );
		const target = this._contextCamera.controls.getTarget( new Vector3() );
		const vector = new Vector3( position.x - target.x, position.y - target.y, position.z - target.z ).normalize();
		//multiple from Vector3(0, 0,0)
		const newV = new Vector3( 0, 0, 0 ).add( vector.multiplyScalar( this.camera.userData.radius ) );
		// set new Camera position
		this.camera.position.x = newV.x;
		this.camera.position.y = newV.y;
		this.camera.position.z = newV.z;
		this._DirectionalLight.position.set( newV.x, newV.y, newV.z );
		this.camera.lookAt( 0, 0, 0 );
		this.camera.updateProjectionMatrix();
		this.renderer.render( this.scene, this.camera );
	}
}
