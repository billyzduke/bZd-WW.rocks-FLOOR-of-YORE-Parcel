import * as THREE from 'three'

import assTireTread from 'url:/src/future/bttf-tunnel/delorean/wheels/tireTread.png'
import assTireWallLong from 'url:/src/future/bttf-tunnel/delorean/wheels/tireWallLong.png'
import assTireWallShort from 'url:/src/future/bttf-tunnel/delorean/wheels/tireWallShort.png'
import assTireHubCapF from 'url:/src/future/bttf-tunnel/delorean/wheels/hubCapFront.png'
import assTireHubCapA from 'url:/src/future/bttf-tunnel/delorean/wheels/hubCapRear.png'
import assRocketFlare from 'url:/src/future/bttf-tunnel/delorean/wheels/skyrocket.png'
import assTireBiter from 'url:/src/future/bttf-tunnel/delorean/wheels/tireInner.png'
import g from '/src/shared/_'
import * as threeMake from '/src/shared/three/make'

const makeSpokeMap = () => {
  const spokeMap = {
    long: [],
    short: [],
  }
  for ( let side = 0; side < 6; side++ ) {
    spokeMap.long.push( {
      map: threeMake.textureLoader( [ 2, 3 ].includes( side ) ? assTireTread : assTireWallLong ),
    } )
    spokeMap.short.push( [ 0, 1 ].includes( side )
      ? { opacity: 0 }
      : {
        map: threeMake.textureLoader( [ 2, 3 ].includes( side ) ? assTireTread : assTireWallShort ),
      } )
  }
  return spokeMap
}

const makeWheel = wheel => {
  const wheelIsFront = wheel.includes( 'F' )
  const wheelIsLeft = wheel.includes( 'L' )
  const msh = { ...g.bttf.msh }
  const wheelies = {}
  const spokeMap = makeSpokeMap()
  for ( let spoke = 0; spoke < 6; spoke++ ) {
    const mat = {
      long: [],
      short: [],
    }
    for ( let sps = 0; sps < 6; sps++ ) {
      const matLong = new THREE.MeshBasicMaterial( {
        ...msh,
        ...spokeMap.long[sps],
      } )
      mat.long.push( matLong )
      const matShort = new THREE.MeshBasicMaterial( {
        ...msh,
        ...spokeMap.short[sps],
      } )
      mat.short.push( matShort )
    }
    const spokeLong = {
      geo: 'box',
      struct: [ 18, 142, 52 ],
      rotation: [ 0, 0, spoke * 30 ],
      mat: mat.long,
    }
    const spokeShort = {
      geo: 'box',
      struct: [ 18, 120, 52 ],
      rotation: [ 0, 0, ( spoke * 30 ) + 15 ],
      mat: mat.short,
    }
    wheelies[`wheelSpokeLong${wheel}${spoke}`] = spokeLong
    wheelies[`wheelSpokeShort${wheel}${spoke}`] = spokeShort
  }
  wheelies[`wheelHubInner${wheel}`] = {
    geo: 'circle',
    txtAss: assTireBiter,
    struct: [ 43, 16 ],
    position: [ 0, 0, -16 ],
  }
  const hubCapMat = {
    map: threeMake.textureLoader( wheelIsFront ? assTireHubCapF : assTireHubCapA ),
  }
  const hubCapMsh = new THREE.MeshBasicMaterial( {
    ...msh,
    ...hubCapMat,
  } )
  hubCapMsh.map.wrapS = hubCapMsh.map.wrapT = THREE.RepeatWrapping
  hubCapMsh.map.repeat.set( 0.5, 1 )
  wheelies[`wheelHubOuter${wheel}`] = {
    geo: 'circle',
    struct: [ 43, 16 ],
    position: [ 0, 0, 26 ],
    mat: hubCapMsh,
  }
  g.bttf.inScene.hubCaps.push( `wheelHubOuter${wheel}` )
  const flares = {}
  for ( let flare = 0; flare < 3; flare++ ) {
    const thisFlare = `wheel${wheel}flare${flare + 1}`
    const flareMat = {
      opacity: 0.88,
      map: threeMake.textureLoader( assRocketFlare ),
    }
    msh.alphaTest = 0.01
    let flarePos
    switch ( flare ) {
      case 0:
        flarePos = [ 0, 0, -13 ]
        break
      case 1:
        flarePos = [ -11, 0, -5 ]
        break
      case 2:
        flarePos = [ 11, 0, -5 ]
        break
    }
    flares[thisFlare] = {
      struct: [ 276, 376 ],
      pivot: [ 0, -188 ],
      rotation: [ 0, 120 * flare ],
      position: flarePos,
      mat: new THREE.MeshBasicMaterial( {
        ...msh,
        ...flareMat,
      } ),
    }
    flares[thisFlare].mat.depthWrite = false
    g.bttf.flr.push( {
      cdt: 0,
      ctl: 0,
    } )
  }
  const flareFixMat = {
    color: threeMake.color( 'white' ),
  }
  flares[`flareFixer${wheel}`] = {
    geo: 'cylinder',
    // eslint-disable-next-line array-bracket-newline, array-element-newline
    struct: [ 27.5, 0.01, 60, 6 ],
    pivot: [ 0, -52 ],
    mat: new THREE.MeshBasicMaterial( {
      ...msh,
      ...flareFixMat,
    } ),
  }
  wheelies[`wheelFlares${wheel}`] = {
    struct: [ 276, 276, 376 ],
    pivot: [ 0, -188 ],
    rotation: [ -90 ],
    children: flares,
  }
  g.bttf.inScene.wheelRockets.push( `wheelFlares${wheel}` )

  wheelies[`wheelMechTireMount${wheel}`] = {
    children: {
      [`wheelMechTireMountJoint${wheel}`]: {
        geo: 'cylinder',
        // eslint-disable-next-line array-bracket-newline, array-element-newline
        struct: [ 15, 15, 15, 12 ],
        mat: new THREE.MeshStandardMaterial( {
          ...msh,
          ...g.bttf.mkr.pipe.mat,
          ...g.bttf.mkr.pipe.map[2],
        } ),
        position: [ 0, 0, -22 ],
        // rotation: { x: 90 },
      },
      [`wheelMechTireMountPlate${wheel}`]: {
        geo: 'cylinder',
        // eslint-disable-next-line array-bracket-newline, array-element-newline
        struct: [ 18, 18, 15, 14 ],
        mat: new THREE.MeshStandardMaterial( {
          ...msh,
          ...g.bttf.mkr.pipe.mat,
          ...g.bttf.mkr.pipe.map[0],
        } ),
        pivot: [ 0, -7 ],
        position: [ 0, 0, -7 ],
        rotation: { z: wheelIsLeft ? -90 : 90, x: 90 },
      },
    },
  }

  return {
    struct: [ 142, 142, 52 ],
    pivot: [ 71, 71, 26 ],
    position: [ 0, wheel.includes( 'F' ) ? 289 : -286.5 ],
    children: wheelies,
  }
}

const makeWheels = () => ( {
  struct: [ 432, 729, 142 ],
  position: [ 0, 0, -11 ],
  children: {
    wheelsL: {
      // struct: [ 142, 729, 52 ],
      // pivot: [ -71 ],
      position: [ 223 ],
      children: {
        wheelLF: makeWheel( 'LF' ),
        wheelLA: makeWheel( 'LA' ),
      },
    },
    wheelsR: {
      // struct: [ 142, 729, 52 ],
      // pivot: [ -71 ],
      position: [ -223 ],
      children: {
        wheelRF: makeWheel( 'RF' ),
        wheelRA: makeWheel( 'RA' ),
      },
    },
  },
} )

export { makeWheels }
