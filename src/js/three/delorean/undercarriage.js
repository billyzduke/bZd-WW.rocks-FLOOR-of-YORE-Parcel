import * as THREE from 'three'

import assUnderCarriageF from 'url:/src/img/future/underCarriageF.png'
import assUnderCarriageC from 'url:/src/img/future/underCarriageC.png'
import assUnderCarriageA from 'url:/src/img/future/underCarriageA.png'
import assCrossAxle from 'url:/src/img/future/crossAxle.png'
import assCrossAxleF from 'url:/src/img/future/crossAxleFront.png'
import assCrossAxleA from 'url:/src/img/future/crossAxleRear.png'
import assExhaustPipeOuter from 'url:/src/img/future/exhaustPipe.png'
import assExhaustPipeInner from 'url:/src/img/future/exhaustPipeInner.png'
import g from '/src/js/glob'

const makeExhaustPipeFace = face => {
  const rotation = [ 0, 0, 0 ]
  const position = [ 0, 0, 0 ]
  switch ( face ) {
    case 'L':
      position[0] = 9.5
      rotation[1] = -90
      break
    case 'R':
      position[0] = -9.5
      rotation[1] = 90
      break
    case 'T':
      position[2] = -9.5
      rotation[1] = 180
      break
    case 'B':
      position[2] = 9.5
      break
  }
  return {
    txtAss: assExhaustPipeOuter,
    struct: [ 19, 40 ],
    position,
    rotation,
  }
}

const makeExhaustPipe = side => {
  const faces = [
    'L',
    'R',
    'T',
    'B',
  ]
  const pipe = {}
  faces.forEach( face => {
    pipe[`exP${side}${face}`] = makeExhaustPipeFace( face )
  } )
  pipe[`exP${side}C`] = {
    txtAss: assExhaustPipeInner,
    struct: [ 18.5, 18.5 ],
    position: [ 0, -10 ],
    rotation: [ 90 ],
  }
  return pipe
}

const makeWheelMech = ( wheel, mobile ) => {
  const wheelIsFront = wheel.includes( 'F' )
  const wheelIsLeft = wheel.includes( 'L' )
  const msh = { ...g.three.msh }
  let wheelies
  if ( mobile ) {
    // MOBILE MECH
    wheelies = {
      position: [ wheelIsLeft ? -81 : 81, wheelIsFront ? 289 : -286.5, -24 ],
      rotation: { z: wheelIsLeft ? -90 : 90 },
      children: {
        [`wheelMechAxleArmBearing${wheel}`]: {
          geo: 'sphere',
          struct: [ 12.5, 10, 10 ],
          mat: new THREE.MeshStandardMaterial( {
            ...msh,
            ...g.three.mkr.pipe.mat,
            ...g.three.mkr.pipe.map[2],
          } ),
        },
        [`wheelMechAxleRod${wheel}`]: {
          geo: 'cylinder',
          // eslint-disable-next-line array-bracket-newline, array-element-newline
          struct: [ 7, 7, 76, 12, 1 ],
          pivot: [ 0, 24 ],
          position: [ 0, 14, -1 ],
          mat: new THREE.MeshStandardMaterial( {
            ...msh,
            ...g.three.mkr.pipe.mat,
            ...g.three.mkr.pipe.map[0],
          } ),
        },
      },
    }
  } else {
    // STILL MECH
    wheelies = {
      geo: 'torus',
      // eslint-disable-next-line array-bracket-newline, array-element-newline
      struct: [ 36, 12, 10, 10 ],
      position: [ wheelIsLeft ? -81 : 81, wheelIsFront ? 289 : -286.5, -42 ],
      rotation: [ 0, 90 ],
      mat: new THREE.MeshStandardMaterial( {
        ...msh,
        ...g.three.mkr.pipe.mat,
        ...g.three.mkr.pipe.map[1],
      } ),
    }
  }

  return wheelies
}

const makeUnderCarriage = () => ( {
  struct: [ 432, 1000, 127 ],
  children: {
    bottom: {
      // struct: [ 432, 1000, 26 ],
      children: {
        ucF: {
          struct: [ 432, 119 ],
          txtAss: assUnderCarriageF,
          pivot: [ 0, 59.5 ],
          position: [ 0, 364.5, -23 ],
          rotation: [ -6.71 ],
        },
        ucC: {
          struct: [ 432, 729 ],
          txtAss: assUnderCarriageC,
        },
        ucA: {
          struct: [ 432, 152 ],
          position: [ 0, -364.5, -26 ],
          rotation: [ 7.125 ],
          children: {
            ucPanelA: {
              struct: [ 432, 152 ],
              txtAss: assUnderCarriageA,
              pivot: [ 0, -76 ],
            },
            exhaustPipes: {
              struct: [ 432, 40, 19 ],
              position: [ 0, -132, -9 ],
              children: {
                exPL: {
                  struct: [ 19, 40, 19 ],
                  children: makeExhaustPipe( 'L' ),
                  position: [ 123 ],
                },
                exPR: {
                  struct: [ 19, 40, 19 ],
                  children: makeExhaustPipe( 'R' ),
                  position: [ -118 ],
                },
              },
            },
          },
        },
      },
    },
    top: {
      struct: [ 432, 1000, 127 ],
      children: {
        ucWheelWallFL: {
          struct: [ 127, 150 ],
          color: new THREE.Color( 'black' ),
          pivot: [ 63.5 ],
          position: [ 142, 289.5 ],
          rotation: [ 0, 90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucWheelWallFR: {
          struct: [ 127, 150 ],
          color: new THREE.Color( 'black' ),
          pivot: [ -63.5 ],
          position: [ -142, 289.5 ],
          rotation: [ 0, -90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucWheelWallAL: {
          struct: [ 127, 157 ],
          color: new THREE.Color( 'black' ),
          pivot: [ 63.5 ],
          position: [ 142, -286 ],
          rotation: [ 0, 90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucWheelWallAR: {
          struct: [ 127, 157 ],
          color: new THREE.Color( 'black' ),
          pivot: [ -63.5 ],
          position: [ -142, -286 ],
          rotation: [ 0, -90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucAxleWallFF: {
          struct: [ 432, 127 ],
          txtAss: assCrossAxleF,
          pivot: [ 0, -63.5 ],
          position: [ 0, 364.5 ],
          rotation: [ 90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucAxleWallFA: {
          struct: [ 432, 127 ],
          txtAss: assCrossAxle,
          pivot: [ 0, -63.5 ],
          position: [ 0, 214.5 ],
          rotation: [ 90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucAxleWallAF: {
          struct: [ 432, 127 ],
          txtAss: assCrossAxle,
          pivot: [ 0, -63.5 ],
          position: [ 0, -207.5 ],
          rotation: [ 90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucAxleWallAA: {
          struct: [ 432, 127 ],
          txtAss: assCrossAxleA,
          pivot: [ 0, -63.5 ],
          position: [ 0, -364.5 ],
          rotation: [ 90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucWheelWellF: {
          color: new THREE.Color( 'black' ),
          struct: [ 402, 150 ],
          position: [ 0, 289.5, -127 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucWheelWellA: {
          color: new THREE.Color( 'black' ),
          struct: [ 402, 157 ],
          position: [ 0, -286, -127 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
      },
    },
    wheelsMech: {
      // struct: [ 432, 729, 142 ],
      position: [ 0, 0, -11 ],
      children: {
        mobileMech: {
          children: {
            mobileMechL: {
              position: [ 223 ],
              rotation: { y: -14 },
              children: {
                mobileMechLF: makeWheelMech( 'LF', true ),
                mobileMechLA: makeWheelMech( 'LA', true ),
              },
            },
            mobileMechR: {
              position: [ -223 ],
              rotation: { y: 14 },
              children: {
                mobileMechRF: makeWheelMech( 'RF', true ),
                mobileMechRA: makeWheelMech( 'RA', true ),
              },
            },
          },
        },
        stillMech: {
          children: {
            stillMechL: {
              position: [ 223 ],
              children: {
                stillMechLF: makeWheelMech( 'LF' ),
                stillMechLA: makeWheelMech( 'LA' ),
              },
            },
            stillMechR: {
              position: [ -223 ],
              children: {
                stillMechRF: makeWheelMech( 'RF' ),
                stillMechRA: makeWheelMech( 'RA' ),
              },
            },
          },
        },
      },
    },
  },
} )

export { makeUnderCarriage }
