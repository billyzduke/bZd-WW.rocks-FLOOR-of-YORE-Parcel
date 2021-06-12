import g from '/src/js/glob'
import { padStr } from '/src/js/utils'

function checkIfBelongsToMandelbrotSet( x, y ) {
  let realComponentOfResult = x
  let imaginaryComponentOfResult = y

  for ( let i = 0; i < 8; i++ ) {
    // Calculate the real and imaginary components of the result
    // separately
    const tempRealComponent = ( realComponentOfResult * realComponentOfResult ) - ( imaginaryComponentOfResult * imaginaryComponentOfResult ) + x

    const tempImaginaryComponent = ( 2 * realComponentOfResult * imaginaryComponentOfResult ) + y

    realComponentOfResult = tempRealComponent
    imaginaryComponentOfResult = tempImaginaryComponent
  }

  return ( realComponentOfResult * imaginaryComponentOfResult < 5 )
}

const drawFractal = frac => {
  g.el.jungle.appendChild( frac.el )
  frac.ct = frac.el.getContext( '2d' )
  for ( let x = 0; x < frac.el.width; x++ ) {
    for ( let y = 0; y < frac.el.height; y++ ) {
      const belongsToSet = checkIfBelongsToMandelbrotSet( x / frac.mf - frac.panX, y / frac.mf - frac.panY )
      if ( !belongsToSet ) {
        frac.ct.fillStyle = frac.iv ? '#228c22' : `hsl(119, ${50 + ( ( x / g.main.w ) * 100 )}%, ${80 - ( ( y / g.main.h ) * 50 )}%)` // '#014421' // Draw a colorful pixel
      } else {
        frac.ct.fillStyle = '#000' // Draw a black pixel
      }
      frac.ct.fillRect( x, y, 1, 1 )
    }
  }
  g.jungle.push( frac )
}

const setFractal = ( mf = 600, panX = 0, panY = 0, iv = false ) => {
  const jungLayer = g.document.createElement( 'canvas' )
  jungLayer.width = g.main.w
  jungLayer.height = g.main.h
  jungLayer.id = `jungle${padStr( g.jungle.length )}`
  drawFractal( {
    el: jungLayer,
    dn: false,
    iv,
    mf,
    panX,
    panY,
  } )
}

export { setFractal }

// setFractal(1400, 1, -0.2, true)
// setFractal(1400, 1.75, -0.2)
