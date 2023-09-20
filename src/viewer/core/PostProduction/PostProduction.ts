/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { N8AOPass } from "n8ao";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
import { CustomEffectsPass } from "./custom-effects-pass";
import CameraControls from "camera-controls";


// source: https://discourse.threejs.org/t/how-to-render-full-outlines-as-a-post-process-tutorial/22674

export class PostProduction {
  excludedItems = new Set<THREE.Object3D>();

  readonly composer: EffectComposer;

  private _enabled = false;
  private _initialized = false;

  private _n8ao?: any;
  private _customEffects?: CustomEffectsPass;
  private _basePass?: RenderPass;
  private _gammaPass?: ShaderPass;
  private _depthTexture?: THREE.DepthTexture;



  private readonly _renderTarget: THREE.WebGLRenderTarget;

  get basePass() {
    if ( !this._basePass ) {
      throw new Error( "Custom effects not initialized!" );
    }
    return this._basePass;
  }

  get gammaPass() {
    if ( !this._gammaPass ) {
      throw new Error( "Custom effects not initialized!" );
    }
    return this._gammaPass;
  }

  get customEffects() {
    if ( !this._customEffects ) {
      throw new Error( "Custom effects not initialized!" );
    }
    return this._customEffects;
  }

  get n8ao() {
    if ( !this._n8ao ) {
      throw new Error( "Custom effects not initialized!" );
    }
    return this._n8ao;
  }

  get enabled() {
    return this._enabled;
  }

  set enabled( active: boolean ) {
    if ( !this._initialized ) {
      this.initialize();
    }
    this._enabled = active;
  }



  constructor(
    private scene: THREE.Scene,
    private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    private size: THREE.Vector2,
    private renderer: THREE.WebGLRenderer,
    private domElement: HTMLDivElement | HTMLCanvasElement,
    private controls: CameraControls
  ) {
    this._renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    this._renderTarget.texture.colorSpace = "srgb-linear";

    this.composer = new EffectComposer( this.renderer, this._renderTarget );
    this.composer.setSize( window.innerWidth, window.innerHeight );

  }



  dispose() {
    this._renderTarget.dispose();
    this._depthTexture?.dispose();
    this._customEffects?.dispose();
    this._gammaPass?.dispose();
    this._n8ao?.dispose();
    this.excludedItems.clear();
    this.setupEvents = false
  }



  setSize() {
    if ( this._initialized ) {
      const width = this.size.x
      const height = this.size.y
      this.composer.setSize( width, height );
      this.basePass.setSize( width, height );
      this.n8ao.setSize( width, height );
      this.customEffects.setSize( width, height );
      this.gammaPass.setSize( width, height );
    }
  }

  update() {
    if ( !this._enabled ) return;
    this.composer.render();
  }

  updateCamera() {
    // const camera = this.components.camera.get();
    // if ( this._n8ao ) {
    //   this._n8ao.camera = camera;
    // }
    // if ( this._customEffects ) {
    //   this._customEffects.renderCamera = camera;
    // }
    // if ( this._basePass ) {
    //   this._basePass.camera = camera;
    // }
  }

  private initialize() {

    this.renderer.outputColorSpace = "srgb";
    this.renderer.toneMapping = THREE.NoToneMapping;

    this.newBasePass();
    this.newSaoPass();
    this.newGammaPass();
    this.newCustomPass();

    this._initialized = true;
    this.updatePasses();
  }

  updateProjection( camera: THREE.Camera ) {
    this.composer.passes.forEach( ( pass ) => {
      // @ts-ignore
      pass.camera = camera;
    } );
    this.update();
  }
  isUserControllingCamera = false;
  isControlSleeping = true;
  lastWheelUsed = 0;
  lastResized = 0;
  resizeDelay = 500;
  visible = false;

  set setupEvents( setupEvents: boolean ) {
    if ( setupEvents ) {
      this.controls.addEventListener( "control", this.onControl );
      this.controls.addEventListener( "controlstart", this.onControlStart );
      this.controls.addEventListener( "wake", this.onWake );
      this.controls.addEventListener( "controlend", this.onControlEnd );
      this.controls.addEventListener( "sleep", this.onSleep );
      this.domElement.addEventListener( "wheel", this.onWheel );
    } else {
      this.controls.removeEventListener( "control", this.onControl );
      this.controls.removeEventListener( "controlstart", this.onControlStart );
      this.controls.removeEventListener( "wake", this.onWake );
      this.controls.removeEventListener( "controlend", this.onControlEnd );
      this.controls.removeEventListener( "sleep", this.onSleep );
      this.domElement.removeEventListener( "wheel", this.onWheel );
    }
  }
  onControlStart = () => {
    this.isUserControllingCamera = true;
  };
  onWake = () => {
    this.isControlSleeping = false;
  };

  onResize = () => {
    if ( !this.enabled ) return;
    this.lastResized = performance.now();
    this.visible = false;

    setTimeout( () => {
      if ( performance.now() - this.lastResized >= this.resizeDelay ) {
        this.visible = true;
      }
    }, this.resizeDelay );
  };

  onControl = () => {
    if ( !this.enabled ) return;
    this.visible = false;
  };

  onControlEnd = () => {
    if ( !this.enabled ) return;
    this.isUserControllingCamera = false;
    if ( !this.isUserControllingCamera && this.isControlSleeping ) {
      this.visible = true;
    }
  };

  onWheel = () => {
    if ( !this.enabled ) return;
    this.lastResized = performance.now();
  };

  onSleep = () => {
    // This prevents that this gets triggered a million times when zooming with the wheel
    if ( !this.enabled ) return;
    this.isControlSleeping = true;
    const currentWheel = performance.now();
    setTimeout( () => {
      if ( this.lastWheelUsed > currentWheel ) return;
      if ( !this.isUserControllingCamera && this.isControlSleeping ) {
        this.visible = true;
      }
    }, 200 );
  };
  private updatePasses() {
    for ( const pass of this.composer.passes ) {
      this.composer.removePass( pass );
    }
    if ( this._basePass ) {
      this.composer.addPass( this.basePass );
    }
    this.composer.addPass( this.gammaPass );
    this.composer.addPass( this.n8ao );
    this.composer.addPass( this.customEffects );

  }

  private newCustomPass() {
    this._customEffects = new CustomEffectsPass(
      this.size.clone(),
      this.scene, this.camera
    );
  }

  private newGammaPass() {
    this._gammaPass = new ShaderPass( GammaCorrectionShader );
  }

  private newSaoPass() {
    this._n8ao = new N8AOPass( this.scene, this.camera, this.size.x, this.size.y );
    // this.composer.addPass(this.n8ao);
    const { configuration } = this._n8ao;
    configuration.aoSamples = 16;
    configuration.denoiseSamples = 1;
    configuration.denoiseRadius = 13;
    configuration.aoRadius = 1;
    configuration.distanceFalloff = 4;
    configuration.aoRadius = 1;
    configuration.intensity = 4;
    configuration.halfRes = true;
    configuration.color = new THREE.Color().setHex( 0xcccccc, "srgb-linear" );
  }

  private newBasePass() {
    this._basePass = new RenderPass( this.scene, this.camera );
  }
}
