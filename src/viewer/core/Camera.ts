import * as THREE from "three"
import CameraControls from "camera-controls";
export class Camera {
  maxFar: number = 10e6
  minFar: number = 0.1
  radius: number = 50

  private _size: THREE.Vector2;
  set size( size: THREE.Vector2 ) {
    this._size = size.clone()
    this._OrthographicCamera.left = size.x / -50;
    this._OrthographicCamera.right = size.y / 50;
    this._PerspectiveCamera.aspect = size.x / size.y;
    this._OrthographicCamera.updateProjectionMatrix();
    this._PerspectiveCamera.updateProjectionMatrix();
  }
  get size(): THREE.Vector2 {
    return this._size
  }


  private _protection: boolean = true
  set projection( projection: boolean ) {
    this._protection = projection
    this.currentCamera = projection ? this._PerspectiveCamera : this._OrthographicCamera
  }
  get projection() {
    return this._protection
  }
  private static getSubsetOfThree() {
    return {
      MOUSE: THREE.MOUSE,
      Vector2: THREE.Vector2,
      Vector3: THREE.Vector3,
      Vector4: THREE.Vector4,
      Quaternion: THREE.Quaternion,
      Matrix4: THREE.Matrix4,
      Spherical: THREE.Spherical,
      Box3: THREE.Box3,
      Sphere: THREE.Sphere,
      Raycaster: THREE.Raycaster,
      MathUtils: THREE.MathUtils,
    };
  }
  private setupCameraControls() {
    CameraControls.install( { THREE: Camera.getSubsetOfThree() } );
    const controls = new CameraControls( this.currentCamera, this._domElement );
    controls.smoothTime = 0.001;
    controls.dollyToCursor = true;
    controls.dollyDragInverted = true;
    controls.infinityDolly = false;
    controls.dollySpeed = 5;
    controls.setTarget( 0, 0, 0 );
    controls.mouseButtons.left = CameraControls.ACTION.ROTATE;
    controls.mouseButtons.right = CameraControls.ACTION.OFFSET;
    controls.mouseButtons.middle = CameraControls.ACTION.ZOOM;
    controls.mouseButtons.wheel = CameraControls.ACTION.ZOOM;
    return controls;
  }


  private _domElement: HTMLDivElement | HTMLCanvasElement;
  private _OrthographicCamera: THREE.OrthographicCamera
  private _PerspectiveCamera: THREE.PerspectiveCamera
  currentCamera!: THREE.PerspectiveCamera | THREE.OrthographicCamera
  controls: CameraControls
  private initPerspectiveCamera() {
    const camera = new THREE.PerspectiveCamera( 45, this.size.x / this.size.y, 0.1, this.maxFar );
    camera.position.set( this.radius, this.radius, this.radius )
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
    return camera;
  }
  private initOrthographicCamera() {
    const camera = new THREE.OrthographicCamera(
      this.size.x / -50,
      this.size.x / 50,
      this.size.y / 50,
      this.size.y / -50,
      -1 * this.minFar,
      this.maxFar
    );
    camera.position.set( this.radius, this.radius, this.radius )
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
    return camera;
  }
  /**
   *
   */
  constructor( domElement: HTMLDivElement | HTMLCanvasElement, size: THREE.Vector2 ) {
    this._domElement = domElement
    this._size = size
    this._PerspectiveCamera = this.initPerspectiveCamera()
    this._OrthographicCamera = this.initOrthographicCamera()
    this.projection = true
    this.controls = this.setupCameraControls()
  }
  dispose() {
    this.controls.dispose()
  }
  update( delta?: number ): void {
    this.currentCamera.updateProjectionMatrix();
    this.controls.update( delta! );
  }
}