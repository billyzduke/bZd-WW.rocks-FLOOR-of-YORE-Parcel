import { gsap, TimelineMax as TL } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import g from '/src/shared/_'
import { startDeLorean } from '/src/future/three/delorean/_'
import { setFlux } from '/src/future/flux/_'
import {
  setGradientor, setWarp, startGradientor, unMaskWarpTick,
} from '/src/future/timewarp/_'
import {
  gsapTick, toggleFermata,
} from '/src/shared/utils'

gsap.registerPlugin( TextPlugin )

const setFuture = () => {
  g.tL.bttf = new TL( { defaults: { overwrite: 'auto' } } )
  // g.qss.wormHoler = gsap.quickSetter( '#blindingFlash', 'css' )
  setFlux()
  setGradientor()
  setWarp()
  gsap.set( '#future', { opacity: 1 } )
}

const beginFuture = () => {
  // const blindingFlashUnTick1 = gsapTick( wormHoleFlashTick1 )
  startGradientor( true )
  setTimeout( () => {
    // blindingFlashUnTick1()
    // const blindingFlashUnTick2 = gsapTick( wormHoleFlashTick2 )
    toggleFermata( { exceptTLs: [ 'dL', 'warp' ] } )
    startDeLorean()
    startGradientor()
    // startLynchTunnel()
    setTimeout( () => {
      // blindingFlashUnTick2()
      // wormHoleFlashTick2()
      const warpMaskSize = g.main.h < g.main.w ? g.main.h : g.main.w
      g.qss.warp( { maskSize: `${warpMaskSize}px ${warpMaskSize}px` } )
      g.warp.bin.push( gsapTick( unMaskWarpTick ) )
    }, 1442 )
  }, 2342 )
}

export {
  beginFuture, setFuture,
}
