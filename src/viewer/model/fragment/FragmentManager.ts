import { Fragment, FragmentsGroup, Serializer } from "bim-fragment";
import * as THREE from "three";
import { Event } from "../../Event";

/**
 * Object that can efficiently load binary files that contain
 * [fragment geometry](https://github.com/ifcjs/fragment).
 */
export class FragmentManager {


  /** All the created [fragments](https://github.com/ifcjs/fragment). */
  list: { [guid: string]: Fragment } = {};

  groups: FragmentsGroup[] = [];

  onFragmentsLoaded: Event<FragmentsGroup> = new Event();



  private _loader = new Serializer();

  /** The list of meshes of the created fragments. */
  get meshes() {
    const allMeshes: THREE.Mesh[] = [];
    for ( const fragID in this.list ) {
      allMeshes.push( this.list[fragID].mesh );
    }
    return allMeshes;
  }





  /** {@link Component.get} */
  dispose() {
    for ( const group of this.groups ) {
      group.dispose( true );
    }
    this.groups = [];
    this.list = {};
  }

  disposeGroup( group: FragmentsGroup ) {
    for ( const fragment of group.items ) {
      this.removeFragmentMesh( fragment );
      delete this.list[fragment.id];
    }
    group.dispose( true );
    const index = this.groups.indexOf( group );
    this.groups.splice( index, 1 );

  }

  /** Disposes all existing fragments */
  reset() {
    for ( const id in this.list ) {
      const fragment = this.list[id];
      fragment.dispose();
    }
    this.list = {};
  }

  /**
   * Loads one or many fragments into the scene.
   * @param data - the bytes containing the data for the fragments to load.
   * @returns the list of IDs of the loaded fragments.
   */
  load( data: Uint8Array ) {
    const group = this._loader.import( data );
    const ids: string[] = [];
    for ( const fragment of group.items ) {
      fragment.group = group;
      this.list[fragment.id] = fragment;
      ids.push( fragment.id );
    }
    this.groups.push( group );
    this.onFragmentsLoaded.trigger( group );
    return group;
  }

  /**
   * Export the specified fragments.
   * @param group - the fragments group to be exported.
   * @returns the exported data as binary buffer.
   */
  export( group: FragmentsGroup ) {
    return this._loader.export( group );
  }



  private removeFragmentMesh( fragment: Fragment ) {

  }
}
