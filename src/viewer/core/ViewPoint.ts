export class ViewPoint {
  /**
   *
   */
  private static cursor = {
    canvas: "canvas-cursor",
    comment: "comment-cursor",
    extrude: "extrude-cursor",
    highlighter: "highlighter-cursor",
    maker: "maker-cursor",
    orbit: "orbit-cursor",
    pen: "pen-cursor",
    pencil: "pencil-cursor",
    pointer: "pointer-cursor",
    pan: "pan-cursor",
  }
  constructor( private domElement: HTMLDivElement | HTMLCanvasElement ) {
    this.point = 'canvas'
  }
  _orbit = false
  set orbit( orbit: boolean ) {
    this._orbit = orbit
    if ( orbit ) {
      this.domElement.className = ViewPoint.cursor['orbit']
    }
    else {
      this.domElement.className = ViewPoint.cursor[this.point]
    }
  }
  get orbit() {
    return this._orbit
  }


  _point = "canvas";
  set point( point ) {
    if ( this.orbit ) return
    this._point = point
    this.domElement.className = ViewPoint.cursor[point]
  }
  get point() {
    return this._point
  }
}