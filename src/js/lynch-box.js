import { SVG } from '@svgdotjs/svg.js'

import g from './glob'
import { randOcolor } from './utils'

const setLynchBox = () => {
  g.el.lynchBox.style.zIndex = 50
  g.el.lynchBox.style.opacity = 1
  g.lynchBox = {
    bxs: [],
    svg: SVG().addTo( '#lynchBox' ).size( g.main.w, g.main.h ).css( { position: 'absolute', 'z-index': 1000, 'background-color': '#000000' } ),
  }
  for ( let bx = 0; bx < 15; bx++ ) g.lynchBox.bxs.push( drawBox( ) )
  for ( let bx = g.lynchBox.bxs.length - 1; bx >= 0; bx-- ) zoomBox( bx )
}

const drawBox = ( test = false ) => ( test ? g.lynchBox.svg.rect( g.main.w, g.main.h ).attr( { fill: '#2f2b29', 'fill-opacity': 0.1 } ) : SVG( '<g><path fill="#2f2b29" d="M0,0v1115h1115V0H0z M613.2,613.2H501.8V501.8h111.5V613.2z"/></g>' ).size( g.main.w, g.main.h ).addTo( g.lynchBox.svg ) )

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
  g.lynchBox.bxs[bx].back().animate( { duration: 7500, delay: 500 * bx } ).ease( '<' )
    .attr( { fill: '#836E66' } )
    .size( g.main.w * 10, g.main.h * 10 )
    .during( ( p, m, e ) => {
      translateBox( bx, p )
    } )
    .loop()
}

export { setLynchBox }
