import { SVG } from '@svgdotjs/svg.js'

import g from './glob'
import { randOcolor } from './utils'

const setLynchBox = () => {
  g.lynchBox = {
    bxs: [],
    svg: SVG().addTo( '#mainStage' ).size( g.main.w, g.main.h ),
  }
  g.lynchBox.svg.css( { position: 'absolute', 'z-index': 1000 } )
  // console.log(g.lynchBox.svg.attr())
  for ( let box = 0; box < 16; box++ ) g.lynchBox.bxs.push( drawBox() )
  for ( let box = g.lynchBox.bxs.length - 1; box >= 0; box-- ) zoomBox( box )
}

const drawBox = () => {
  const box = g.lynchBox.svg.rect( g.main.w / 10, g.main.h / 10 ).attr( {
    fill: randOcolor(),
    'fill-opacity': 0.1,
  } )
  translateBox( box )
  return box
}

const translateBox = ( box, pos ) => {
  const bCX = g.main.cx - ( box.width() / 2 )
  const bCY = g.main.cy - ( box.height() / 2 )
  const bX = typeof g.m.x !== 'undefined' ? ( bCX * 2 ) - ( ( g.m.x + ( box.width() * ( g.m.x / g.main.w ) ) ) * ( 1 - pos ) ) : bCX
  const bY = typeof g.m.y !== 'undefined' ? ( bCY * 2 ) - ( ( g.m.y + ( box.height() * ( g.m.y / g.main.h ) ) ) * ( 1 - pos ) ) : bCY
  box.move( bX, bY )
}

const zoomBox = box => {
  console.log()
  g.lynchBox.bxs[box].animate( { duration: 7500, delay: 500 * box } ).ease( '<' )
    // .attr( { 'fill-opacity': 1 } )
    .size( g.main.w, g.main.h )
    .during( ( p, m, e ) => {
      translateBox( g.lynchBox.bxs[box], p )
    } )
    .loop()
}

// const zoomBoxes = () => {
//   g.lynchBox.bxs.forEach( box => {
//     zoomBox( box )
//   } )
// }

// const animateLynchBox = () => {
//   g.lynchBox.ntrvl = setInterval( () => {
//     zoomBoxes()
//     // if ( ++x === times ) {
//     //   clearInterval( intervalID )
//     // }
//   }, 76 )
// }

export { /* animateLynchBox, */ setLynchBox }
