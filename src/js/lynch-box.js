import { SVG } from '@svgdotjs/svg.js'

import g from './glob'
import { randOcolor } from './utils'

const setLynchBox = () => {
  g.lynchBox = {
    bxs: [],
    svg: SVG().addTo( '#mainStage' ).size( g.main.w, g.main.h ).css( { position: 'absolute', 'z-index': 1000 } ),
    sts: {},
  }
  for ( let bx = 0; bx < 16; bx++ ) g.lynchBox.bxs.push( drawBox() )
  for ( let bx = g.lynchBox.bxs.length - 1; bx >= 0; bx-- ) zoomBox( bx )
}

const drawBox = () => ( g.lynchBox.svg.rect( g.main.w / 10, g.main.h / 10 ).attr( {
  fill: randOcolor(),
  'fill-opacity': 0.1,
} ) )

const translateBox = ( bx, p ) => {
  const box = g.lynchBox.bxs[bx]
  let bX = g.main.cx - ( box.width() / 2 )
  let bY = g.main.cy - ( box.height() / 2 )
  if ( typeof g.m.x !== 'undefined' && typeof g.m.y !== 'undefined' ) {
    bX -= ( ( g.m.x / g.main.scale ) - g.main.cx ) * ( 1 - p )
    bY -= ( ( g.m.y / g.main.scale ) - g.main.cy ) * ( 1 - p )
  }
  box.move( bX, bY )
}

const zoomBox = bx => {
  console.log()
  g.lynchBox.bxs[bx].animate( { duration: 7500, delay: 500 * bx } ).ease( '<' )
    // .attr( { 'fill-opacity': 1 } )
    .size( g.main.w, g.main.h )
    .during( ( p, m, e ) => {
      translateBox( bx, p )
    } )
    .loop()
}

export { /* animateLynchBox, */ setLynchBox }
