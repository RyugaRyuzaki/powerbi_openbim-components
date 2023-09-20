/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three"
import * as WEBIFC from "web-ifc";
import { FragmentsGroup } from "bim-fragment";
import { DataConverter, GeometryReader } from "../Utils";
import { Event } from "../../Event";
import { FragmentHighlighter, FragmentManager } from "../fragment";
import { FragmentMesh } from "bim-fragment/fragment-mesh";
export class IfcLoader {
  ifcLoaded: Event<FragmentsGroup> = new Event();
  locationsSaved = new Event<{ [id: number]: number[] }>();
  api: WEBIFC.IfcAPI
  private readonly _geometryReader = new GeometryReader();
  private readonly _dataConverter = new DataConverter();
  private readonly _fragmentManager: FragmentManager = new FragmentManager()
  FragmentHighlighter: FragmentHighlighter
  get settings() {
    return this._dataConverter.settings;
  }
  /**
   *
   */
  get meshes() {
    return this._fragmentManager.meshes
  }
  get groups() {
    return this._fragmentManager.groups
  }
  get sphere() {
    if ( this.groups.length === 0 ) return new THREE.Sphere( new THREE.Vector3( 0, 0, 0 ), 40 )
    const spheres = this.groups.filter( ( g: FragmentsGroup ) => g.boundingBox ).map( ( g: FragmentsGroup ) => IfcLoader.getSphere( g.boundingBox ) )
    return IfcLoader.getSphereFromSpheres( spheres )
  }
  get corner() {
    if ( this.groups.length === 0 ) return new THREE.Vector3( 40, 40, 40 )
    const max = this.groups.filter( ( g: FragmentsGroup ) => g.boundingBox ).map( ( g: FragmentsGroup ) => g.boundingBox.max )
    const x = Math.max( ...max.map( m => m.x ) )
    const y = Math.max( ...max.map( m => m.y ) )
    const z = Math.max( ...max.map( m => m.z ) )
    return new THREE.Vector3( x, y, z )
  }
  constructor() {
    this.api = new WEBIFC.IfcAPI();
    this.FragmentHighlighter = new FragmentHighlighter( this._fragmentManager )
  }
  dispose() {
    this._geometryReader.cleanUp();
    this._dataConverter.cleanUp();
    ( this.api as any ) = null;
    ( this._geometryReader as any ) = null;
    ( this._dataConverter as any ) = null;
    this.FragmentHighlighter.dispose()
    this._fragmentManager.dispose()
    this.spatialTree = []
    this.ifcLoaded.reset()
  }
  spatialTree = []
  loadFragment( data: Uint8Array ) {
    const model = this._fragmentManager.load( data )
    // this.FragmentHighlighter.update()
    // IfcLoader.setupModelLoader( model )
    this.ifcLoaded.trigger( model )
  }

  private static setupModelLoader( ifcModel: FragmentsGroup ) {
    // model is loaded then have receive shadows?
    ifcModel.children.forEach( ( child: FragmentMesh ) => {
      child.castShadow = true;
      child.receiveShadow = true;
    } )

  }
  private static getSpatialTree( properties: any ) {
    const spatialTree = {}
    Object.keys( properties.spatialTree ).forEach( key => {
      if ( !spatialTree[properties.spatialTree[key]] ) spatialTree[properties.spatialTree[key]] = []
      if ( properties[key].type !== "IFCSPACE" )
        spatialTree[properties.spatialTree[key]].push( properties[key] )
    } )
    return Object.keys( spatialTree ).map( key => {
      return {
        buildingStorey: properties[key],
        children: [...spatialTree[key]]
      }
    } )
  }

  static getSphereFromSpheres( spheres: THREE.Sphere[] ): THREE.Sphere {
    const centers = spheres.map( ( s: THREE.Sphere ) => s.center )
    const x = centers.reduce( ( r: number, c: THREE.Vector3 ) => r += c.x, 0 ) / centers.length
    const y = centers.reduce( ( r: number, c: THREE.Vector3 ) => r += c.y, 0 ) / centers.length
    const z = centers.reduce( ( r: number, c: THREE.Vector3 ) => r += c.z, 0 ) / centers.length
    const radius = Math.max( ...spheres.map( ( s: THREE.Sphere ) => s.radius ) )
    return new THREE.Sphere( new THREE.Vector3( x, y, z ), radius )
  }
  static getSphere( boundingBox: THREE.Box3 ): THREE.Sphere {
    const { max, min } = boundingBox;
    const dir = max.clone().sub( min.clone() ).normalize()
    const dis = max.distanceTo( min )
    const center = max.clone().add( dir.multiplyScalar( -dis * 0.5 ) )
    return new THREE.Sphere( center, dis * 0.5 )
  }
}