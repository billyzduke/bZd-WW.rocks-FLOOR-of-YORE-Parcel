import g from '/src/shared/_'
import { devLog } from '/src/shared/dev/_'

const reSizeRenderer = () => {
  sizeRenderer()
  g.three.aspectRatio = g.three.renderer.domElement.width / g.three.renderer.domElement.height
  g.three.camera.aspect = g.three.aspectRatio
  g.three.camera.updateProjectionMatrix()
}

const sizeRenderer = () => {
  g.three.cvs = {
    w: g.main.w,
    h: g.main.h,
  }
  g.three.renderer.setSize( g.three.cvs.w, g.three.cvs.h )
}

const startRendering = ({startYourEngines = false} = {}) => {
  if ( g.three.on ) {
    g.three.ani.go({startYourEngines})
    devLog( `three: deLorean is rendering` )
  }
}

const stopRendering = () => {
  g.window.cancelAnimationFrame( g.three.raf )
  g.three.raf = undefined
  devLog( `three: deLorean rendering has been halted` )
}

export {
  reSizeRenderer, sizeRenderer, startRendering, stopRendering,
}
