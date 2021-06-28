import * as THREE from 'three'

import assUnderCarriageF from 'url:/src/future/bttf-tunnel/delorean/undercarriage/underCarriageF.png'
import assUnderCarriageC from 'url:/src/future/bttf-tunnel/delorean/undercarriage/underCarriageC.png'
import assUnderCarriageA from 'url:/src/future/bttf-tunnel/delorean/undercarriage/underCarriageA.png'
import assCrossAxle from 'url:/src/future/bttf-tunnel/delorean/undercarriage/crossAxle.png'
import assCrossAxleF from 'url:/src/future/bttf-tunnel/delorean/undercarriage/crossAxleFront.png'
import assCrossAxleA from 'url:/src/future/bttf-tunnel/delorean/undercarriage/crossAxleRear.png'
import assExhaustPipeOuter from 'url:/src/future/bttf-tunnel/delorean/undercarriage/exhaustPipe.png'
import assExhaustPipeInner from 'url:/src/future/bttf-tunnel/delorean/undercarriage/exhaustPipeInner.png'
import g from '/src/shared/_'
import * as threeMake from '/src/shared/three/make'

const makeExhaustPipe = side => ( {
  [`exP${side}`]: {
    geo: 'cylinder',
    txtAss: assExhaustPipeOuter,
    // eslint-disable-next-line array-bracket-newline, array-element-newline
    struct: [ 9.5, 9.5, 40, 10, 1, true ],
  },
  [`exP${side}C`]: {
    geo: 'circle',
    struct: [ 9, 10 ],
    txtAss: assExhaustPipeInner,
    position: [ 0, -100 ],
    rotation: [ 90 ],
  },
} )

const makeWheelMech = ( wheel, mobile ) => {
  const wheelIsFront = wheel.includes( 'F' )
  const wheelIsLeft = wheel.includes( 'L' )
  const msh = { ...g.bttf.msh }
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
            ...g.bttf.mkr.pipe.mat,
            ...g.bttf.mkr.pipe.map[2],
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
            ...g.bttf.mkr.pipe.mat,
            ...g.bttf.mkr.pipe.map[0],
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
        ...g.bttf.mkr.pipe.mat,
        ...g.bttf.mkr.pipe.map[1],
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
                  // struct: [ 19, 40, 19 ],
                  children: makeExhaustPipe( 'L' ),
                  position: [ 123 ],
                },
                exPR: {
                  // struct: [ 19, 40, 19 ],
                  children: makeExhaustPipe( 'R' ),
                  position: [ -117 ],
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
          color: threeMake.color( 'black' ),
          pivot: [ 63.5 ],
          position: [ 142, 289.5 ],
          rotation: [ 0, 90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucWheelWallFR: {
          struct: [ 127, 150 ],
          color: threeMake.color( 'black' ),
          pivot: [ -63.5 ],
          position: [ -142, 289.5 ],
          rotation: [ 0, -90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucWheelWallAL: {
          struct: [ 127, 157 ],
          color: threeMake.color( 'black' ),
          pivot: [ 63.5 ],
          position: [ 142, -286 ],
          rotation: [ 0, 90 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucWheelWallAR: {
          struct: [ 127, 157 ],
          color: threeMake.color( 'black' ),
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
          color: threeMake.color( 'black' ),
          struct: [ 402, 150 ],
          position: [ 0, 289.5, -127 ],
          mat: THREE.MeshStandardMaterial,
          msh: { transparent: false },
        },
        ucWheelWellA: {
          color: threeMake.color( 'black' ),
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
