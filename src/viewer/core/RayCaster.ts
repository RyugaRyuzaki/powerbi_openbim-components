/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as THREE from "three"
import { MeshType } from "../enum"
export class RayCaster {
  private _scene: THREE.Scene
  private _renderer: any
  private _camera: any
  private _rayCaster: THREE.Raycaster = new THREE.Raycaster()
  private _mouse: THREE.Vector2 = new THREE.Vector2()
  private setUpRaycaster(): void {
    this._rayCaster.params!.Points!.threshold = 50 as number;
  }
  _filterType: MeshType = MeshType.model
  set filterType( filterType: MeshType ) {
    this._filterType = filterType
  }
  get filterType() {
    return this._filterType
  }


  setRayCaster( event: MouseEvent ): void {
    const bounds = this._renderer.domElement.getBoundingClientRect();
    const x1 = event.clientX - bounds.left;
    const y1 = event.clientY - bounds.top;
    const x2 = bounds.right - bounds.left;
    const y2 = bounds.bottom - bounds.top;
    this._mouse.x = ( x1 / x2 ) * 2 - 1;
    this._mouse.y = -( y1 / y2 ) * 2 + 1;
    this._rayCaster.setFromCamera( this._mouse, this._camera.currentCamera );
  }
  getRayCastModel( event: MouseEvent, filterModel: [] ): any {
    this.setRayCaster( event );
    return this._rayCaster.intersectObjects( filterModel )[0];
  }
  getRayCastPlane( event: MouseEvent, plane: THREE.Plane ): any {
    this.setRayCaster( event );
    return this._renderer.ray.intersectPlane( plane, new THREE.Vector3() );
  }
  /**
   *
   */
  constructor( scene: THREE.Scene, renderer: any, camera: any ) {
    this._scene = scene
    this._renderer = renderer
    this._camera = camera
    this.setUpRaycaster()
  }

}