import { gsap } from 'gsap'

import assLightning01 from 'url:/src/img/lightningBalls/lightning-ball-01.png'
import assLightning02 from 'url:/src/img/lightningBalls/lightning-ball-02.png'
import assLightning03 from 'url:/src/img/lightningBalls/lightning-ball-03.png'
import assLightning04 from 'url:/src/img/lightningBalls/lightning-ball-04.png'
import assLightning05 from 'url:/src/img/lightningBalls/lightning-ball-05.png'
import assLightning06 from 'url:/src/img/lightningBalls/lightning-ball-06.png'
import assLightning07 from 'url:/src/img/lightningBalls/lightning-ball-07.png'
import assLightning08 from 'url:/src/img/lightningBalls/lightning-ball-08.png'
import assLightning09 from 'url:/src/img/lightningBalls/lightning-ball-09.png'
import { setBaublesInLayer } from '.'
import g from '../glob'

const assLightning = [
  assLightning01,
  assLightning02,
  assLightning03,
  assLightning04,
  assLightning05,
  assLightning06,
  assLightning07,
  assLightning08,
  assLightning09,
]

const setBaubleLayer01 = () => {
  const bL = 1
  g.bL[bL] = setBaublesInLayer( bL, 33 )
  if ( g.bL[bL] ) {
    g.bL[bL].cR = 69
    g.bL[bL].cR02 = g.bL[bL].cR * 0.2 // flingRingTick
    g.bL[bL].oR = g.bL[bL].cR * 7.5 // spin/orbitRingTicks
    g.bL[bL].ctrRing = g.el.ctrRing
    g.bL[bL].ctrRingLightning = []
    g.bL[bL].zQuickOnSetters = []
    assLightning.forEach( ( assLight, i ) => {
      g.bL[bL].ctrRingLightning[i] = g.document.createElement( 'img' )
      g.bL[bL].ctrRingLightning[i].src = assLight
      g.bL[bL].ctrRingLightning[i].id = `z${i}`
      g.bL[bL].ctrRingLightning[i].height = g.bL[bL].cR * 2
      g.bL[bL].ctrRingLightning[i].width = g.bL[bL].ctrRingLightning[i].height
      g.bL[bL].ctrRingLightning[i].classList.add( 'z' )
      assLightning.forEach( ( _, z ) => {
        if ( z !== i ) g.bL[bL].ctrRingLightning[i].classList.add( `z${z}` )
      } )
      g.bL[bL].ctrRing.appendChild( g.bL[bL].ctrRingLightning[i] )
      g.bL[bL].zQuickOnSetters[i] = gsap.quickSetter( `#${g.bL[bL].ctrRingLightning[i].id}`, 'css' )
    } )
    g.bL[bL].zQuickOffSetter = gsap.quickSetter( '.z', 'opacity' )
    g.bL[bL].st = ( 2 * Math.PI ) / g.bL[bL].b.length
  }
}

const resetCtrRingPos1 = ( dur = 0.25 ) => {
  if ( g.bL[1] && g.bL[1].b && g.bL[1].b.length ) {
    g.bL[1].b.forEach( ( b, i ) => {
      const a = i * g.bL[1].st
      const x = Math.round( g.main.cx + g.bL[1].cR * Math.cos( a ) - g.b.r )
      const y = Math.round( g.main.cyOff + g.bL[1].cR * Math.sin( a ) - g.b.d )
      const reset = {
        ease: 'power2',
        filter: 'none',
        x,
        y,
        overwrite: true,
        scale: 1,
        WebkitFilter: 'none',
      }
      if ( g.scene.skip.ff ) {
        gsap.set( b, reset )
      } else {
        reset.duration = dur
        gsap.to( b, reset )
      }
      g.bL[1].bD[i] = i
    } )
  }
}

const resetCtrRingPos2 = () => {
  resetCtrRingPos1( 1.5 )
}

const setCtrRing = () => {
  if ( g.bL[1] && g.bL[1].b && g.bL[1].b.length ) {
    const r = g.main.h > g.main.w ? g.main.h : g.main.w
    g.bL[1].b.forEach( ( b, i ) => {
      const a = i * g.bL[1].st
      const x = Math.round( g.main.cx + r * Math.cos( a ) - g.b.r )
      const y = Math.round( g.main.cyOff + r * Math.sin( a ) - g.b.d )
      gsap.to( b, {
        duration: 2.5,
        ease: 'power2',
        filter: 'blur(12px)',
        x,
        y,
        WebkitFilter: 'blur(12px)',
      } )
    } )
  }
}

const evadeMouseTick = re => {
  if ( !g.scene.skip.ff && g.m.x && g.m.y ) {
    let inC = false
    let fromC = 0
    let o = ( g.w.cx > g.w.cy ) ? g.w.cx * 2 : g.w.cy * 2
    inC = ( ( g.m.x - g.w.cx ) ** 2 ) + ( ( g.m.y - g.w.cy ) ** 2 ) <= ( ( g.bL[1].cR * 2 ) ** 2 ) / 4
    if ( inC ) o = ( re ) ? g.bL[1].cR : 0
    else {
      fromC = Math.sqrt( ( ( g.m.x - g.w.cx ) ** 2 ) + ( ( g.m.y - g.w.cy ) ** 2 ) )
      o = Math.sqrt( g.bL[1].cR * fromC ) + ( fromC / 2 )
    }
    const blur = fromC ? `blur(${( fromC / 100 )}px)` : false
    g.bL[1].b.forEach( ( b, i ) => {
      let x = g.w.cx
      let y = g.w.cy
      if ( !inC && g.m.x && g.m.y ) {
        const a = i * g.bL[1].st
        x = g.w.cx + o * Math.cos( a ) + g.w.cx - g.m.x
        y = g.w.cy + o * Math.sin( a ) + g.w.cy - g.m.y
      }
      x = Math.round( ( x - g.b.r ) / g.main.scale )
      y = Math.round( ( ( y - g.b.r ) / g.main.scale ) + g.cyOffPx )
      gsap.to( b, {
        duration: 0.42,
        filter: blur || 'none',
        overwrite: true,
        translateX: x,
        translateY: y,
        WebkitFilter: blur || 'none',
      } )
    } )
    g.bL[1].zQuickOffSetter( 0 )
    if ( inC ) {
      g.bL[1].zQuickOnSetters[gsap.utils.snap( 1, gsap.utils.random( 0, g.bL[1].ctrRingLightning.length - 1 ) )]( {
        opacity: gsap.utils.random( 0, 1 ) * 0.64,
        rotateZ: gsap.utils.random( 0, 360 ),
      } )
    }
  }
}

const shockTick = () => {
  let oo = 0
  let fromCC = 0
  if ( g.m.x && g.m.y ) {
    fromCC = Math.sqrt( ( ( g.m.x - g.main.cx ) ** 2 ) + ( ( g.m.y - g.main.cyOff ) ** 2 ) )
    oo = ( g.main.cx - fromCC ) / g.main.cx
  }
  const assLightOn = gsap.utils.snap( 1, gsap.utils.random( 0, assLightning.length - 1 ) )
  g.bL[1].zQuickOffSetter( 0 )
  g.bL[1].zQuickOnSetters[assLightOn]( {
    opacity: gsap.utils.random( 0, oo ) * 0.64,
    rotateZ: gsap.utils.random( 0, 360 ),
  } )
}

const flingRingTick = () => {
  if ( !g.scene.skip.ff ) {
    g.bL[1].b.forEach( ( b, i ) => {
      const a = i * g.bL[1].st
      const tau = ( ( i + 2 ) * g.bL[1].bD[i] ) / ( Math.PI * 2 )
      const tau2 = ( ( i + 3 ) * g.bL[1].bD[i] ) / Math.PI
      const x1 = Math.sin( tau ) * g.bL[1].cR + Math.round( ( g.main.cx + ( g.bL[1].cR * Math.cos( a ) ) - g.b.r ) )
      const y1 = Math.cos( tau ) * g.bL[1].cR + Math.round( ( g.main.cyOff + ( g.bL[1].cR * Math.sin( a ) ) - g.b.r ) )
      const x2 = x1 + Math.sin( tau2 ) * g.bL[1].cR02
      const y2 = y1 + Math.cos( tau2 ) * g.bL[1].cR02
      const fromC = Math.sqrt( ( ( x2 - g.main.cx ) ** 2 ) + ( ( y2 - g.main.cyOff ) ** 2 ) )
      gsap.to( b, {
        delay: `0.${a}`,
        duration: 0.25,
        translateX: x2,
        translateY: y2,
        scale: ( fromC / 100 ) + 0.5,
        overwrite: true,
      } )
      g.bL[1].bD[i] += 0.01
    } )
  }
}

const orbitRingTick = ( orR, sp = 0.1, ang = 1, sc = 0 ) => {
  g.bL[1].b.forEach( ( b, i ) => {
    const a = g.bL[1].bD[i] * g.bL[1].st
    const x = Math.round( g.main.cx + orR * Math.cos( a ) - g.b.r )
    const y = Math.round( g.main.cyOff + ang * orR * Math.sin( a ) - g.b.d )
    const scaleY = sc ? ( y - ( g.main.cyOff / 2 ) ) / 100 : 1
    if ( g.bL[1].bD[i] === i || orR === g.bL[1].oR ) {
      gsap.to( b, {
        // delay: `0.${a}`,
        duration: sp,
        scale: scaleY,
        translateX: x,
        translateY: y,
        overwrite: true,
      } )
    } else {
      g.bL[1].bQuickMoveSetters[i]( {
        transform: `translate(${x}px, ${y}px) scale(${scaleY})`,
      } )
    }
    g.bL[1].bD[i] -= sp
  } )
}

const spinRing = () => {
  orbitRingTick( g.bL[1].cR )
}

const orbitRing = () => {
  orbitRingTick( g.bL[1].oR, 0.25, 0.25, true )
}

export {
  evadeMouseTick,
  flingRingTick,
  orbitRing,
  resetCtrRingPos1,
  resetCtrRingPos2,
  setBaubleLayer01,
  setCtrRing,
  shockTick,
  spinRing,
}
