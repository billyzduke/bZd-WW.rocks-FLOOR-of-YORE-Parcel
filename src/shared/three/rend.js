import g from '/src/shared/_'
import { devLog } from '/src/shared/dev/_'

const reSizeRenderer = () => {
  sizeRenderer()
  g.bttf.aspectRatio = g.bttf.renderer.domElement.width / g.bttf.renderer.domElement.height
  g.bttf.camera.aspect = g.bttf.aspectRatio
  g.bttf.camera.updateProjectionMatrix()
}

const sizeRenderer = () => {
  g.bttf.cvs = {
    w: g.main.w,
    h: g.main.h,
  }
  g.bttf.renderer.setSize( g.bttf.cvs.w, g.bttf.cvs.h )
}

const startRendering = ( { startYourEngines = false } = {} ) => {
  if ( g.bttf.on ) {
    g.bttf.ani.go( { startYourEngines } )
    devLog( `three: deLorean is rendering` )
  }
}

const stopRendering = () => {
  g.window.cancelAnimationFrame( g.bttf.raf )
  g.bttf.raf = undefined
  devLog( `three: deLorean rendering has been halted` )
}

export {
  reSizeRenderer, sizeRenderer, startRendering, stopRendering,
}
