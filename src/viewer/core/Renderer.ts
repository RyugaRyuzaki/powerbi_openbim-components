/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
export class Renderer {
  private _size: THREE.Vector2;
  set size( size: THREE.Vector2 ) {
    this._size = size.clone()
    this.renderer.setSize( size.x, size.y );
    this.labelRenderer.setSize( size.x, size.y );
  }
  get size(): THREE.Vector2 {
    return this._size
  }
  set theme( dark ) {
    this.renderer.setClearAlpha( dark ? 1 : 0 );
  }

  private initRenderer( canvas: HTMLCanvasElement ) {
    const renderer = new THREE.WebGLRenderer( {
      canvas: canvas,
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
    } );
    renderer.setSize( this.size.x, this.size.y );
    renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
    // set canvas to super whenever user press key "tab"
    renderer.localClippingEnabled = true;
    renderer.shadowMap.enabled = true;
    return renderer
  }
  private initLabelRenderer() {
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.outline = "none";
    labelRenderer.domElement.style.border = "none";
    labelRenderer.setSize( this.size.x, this.size.y );
    ( labelRenderer.domElement as any ).dataType = true;
    return labelRenderer
    // container.appendChild(labelRenderer.domElement);
    // this.domElement = labelRenderer.domElement;
  }
  renderer: THREE.WebGLRenderer
  labelRenderer: CSS2DRenderer
  domElement: HTMLDivElement | HTMLCanvasElement
  private _container: HTMLDivElement
  /**
   *
   */
  constructor( container: HTMLDivElement, size: THREE.Vector2, canvas: HTMLCanvasElement ) {
    this._container = container
    this._size = size
    this.renderer = this.initRenderer( canvas )
    this.labelRenderer = this.initLabelRenderer()
    this._container.appendChild( this.labelRenderer.domElement );
    this.domElement = ( this.labelRenderer.domElement as HTMLDivElement )
    this.theme = false
  }


  dispose() {
    this.renderer.setAnimationLoop( null );
    this.renderer.renderLists.dispose();
    this.labelRenderer.domElement.remove();
  }
  update( scene: THREE.Scene, camera: any ): void {
    this.renderer.render( scene, camera );
    this.labelRenderer.render( scene, camera );
  }
}