import * as THREE from 'three'

import g from '/src/shared/_'

const mirrorMesh = msh => {
  const flipMe = new THREE.Vector3( 1, 1, 1 )
  flipMe.x *= -1
  msh.scale.multiply( flipMe )
}

const scaleMesh = ( msh, scale, axis ) => {
  const scaleMe = new THREE.Vector3( 1, 1, 1 )
  if ( axis ) scaleMe[axis] *= scale
  else {
    g.bttf.xy.forEach( ax => {
      scaleMe[ax] *= scale
    } )
  }
  msh.scale.multiply( scaleMe )
}

export { mirrorMesh, scaleMesh }
