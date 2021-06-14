import { gsap } from 'gsap'
// import sync from 'css-animation-sync'

import { padStr } from '/src/shared/utils'
import { devLog } from '/src/shared/dev/_'
import g from '/src/shared/_'
import { setBaubleLayer01 } from '/src/main-stage/baubles/layer-01/_'
import { setBaubleLayer02 } from '/src/main-stage/baubles/layer-02/_'
import { setBaubleLayer03 } from '/src/main-stage/baubles/layer-03/_'
import { setBaubleLayer04 } from '/src/main-stage/baubles/layer-04/_'

const setBaublesInLayer = ( bLyr, bCnt, bOpts = {}, qMvSttrs = true ) => {
  // bOpts = {
  //   d: { // id of property to adjust
  //     b: [ 'keys of baubles to adjust this property value on' ],
  //     v: 'property value to apply to above keys',
  //   }
  // }
  const padLyr = padStr( bLyr )
  const bL = {
    b: [],
    bD: [],
    bN: [],
    bW: g.document.getElementById( `bW${padLyr}` ),
    x: {},
  }
  if ( bL.bW ) {
    bL.bW.classList.add( 'paused' )
    const bLyrClass = `bL${padLyr}`
    for ( let b = 0; b < bCnt; b++ ) {
      bL.bD[b] = g.b.d
      bL.bN[b] = g.document.createElement( 'div' )
      bL.bN[b].classList.add( 'bN' )
      bL.b[b] = g.document.createElement( 'div' )
      bL.b[b].id = `${bLyrClass}_b${padStr( b )}`
      bL.b[b].classList.add( 'b', bLyrClass )
      // optional diameter
      if ( bOpts.d && bOpts.d.b && bOpts.d.b.length && bOpts.d.b.includes( b ) ) {
        bL.bD[b] = bOpts.d.v
        bL.b[b].style.height = `${bL.bD[b]}px`
        bL.b[b].style.width = bL.b[b].style.height
      }
      bL.b[b].appendChild( bL.bN[b] )
      bL.bW.appendChild( bL.b[b] )
      if ( qMvSttrs ) {
        if ( typeof bL.bQuickMoveSetters === 'undefined' ) bL.bQuickMoveSetters = []
        bL.bQuickMoveSetters[b] = gsap.quickSetter( bL.b[b], 'css' )
      }
    }
  }
  // sync('rockabye')
  return bL
}

const setBaubleLayers = () => {
  setBaubleLayer01()
  setBaubleLayer02()
  setBaubleLayer03()
  setBaubleLayer04()
  // setTimeout(() => {
  console.log( g.bL )
  g.bL.forEach( ( _, i ) => {
    devLog( `baubleLayer${padStr( i )} animations active` )
    g.bL[i].bW.classList.remove( 'paused' )
  } )
  // }, 2000)
}

const toggleBaubleLayer = ( bLyr, forcePause ) => {
  if ( g.bL[bLyr].bW.classList.contains( 'paused' ) && !forcePause ) {
    g.bL[bLyr].bW.classList.remove( 'paused' )
  } else {
    g.bL[bLyr].bW.classList.add( 'paused' )
  }
}

export { setBaublesInLayer, setBaubleLayers, toggleBaubleLayer }
