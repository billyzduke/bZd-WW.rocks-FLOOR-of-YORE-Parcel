import * as THREE from 'three'

import assUnderCarriageF from 'url:/src/img/future/underCarriageF.png'
import assUnderCarriageC from 'url:/src/img/future/underCarriageC.png'
import assUnderCarriageA from 'url:/src/img/future/underCarriageA.png'
import assCrossAxle from 'url:/src/img/future/crossAxle.png'
import assCrossAxleF from 'url:/src/img/future/crossAxleFront.png'
import assCrossAxleA from 'url:/src/img/future/crossAxleRear.png'
import assExhaustPipeOuter from 'url:/src/img/future/exhaustPipe.png'
import assExhaustPipeInner from 'url:/src/img/future/exhaustPipeInner.png'
import assTireTread from 'url:/src/img/future/tireTread.png'
import assTireWallLong from 'url:/src/img/future/tireWallLong.png'
import assTireWallShort from 'url:/src/img/future/tireWallShort.png'
import assTireHubCapF from 'url:/src/img/future/hubCapFront.png'
import assTireHubCapA from 'url:/src/img/future/hubCapRear.png'
import assRocketFlare from 'url:/src/img/future/skyrocket.png'
import assBodyCenterLower from 'url:/src/img/future/bodyCenterLower.png'
import assBodyCenterMiddle from 'url:/src/img/future/bodyCenterMiddle.png'
import assBodyCenterUpper from 'url:/src/img/future/bodyCenterUpper.png'
import assSideWindow from 'url:/src/img/future/sideWindow.png'
import assRoof from 'url:/src/img/future/roof.png'
import assWindshield from 'url:/src/img/future/windshield.png'
import assHood from 'url:/src/img/future/hood.png'
import assBodyFrontLower from 'url:/src/img/future/bodyFrontLower.png'
import assBodyFrontUpper from 'url:/src/img/future/bodyFrontUpper.png'
import assBodyFrontCorner from 'url:/src/img/future/bodyFrontCorner.png'
import assGrille from 'url:/src/img/future/grille.png'
import assBumperFrontTop from 'url:/src/img/future/lightBarFront.png'
import assBodyEngineTop from 'url:/src/img/future/bodyEngineTop.png'
import assBodyEngineBack from 'url:/src/img/future/bodyEngineBack.png'
import assBodyAftLower from 'url:/src/img/future/bodyRearLower.png'
import assBodyAftMiddle from 'url:/src/img/future/bodyRearMiddle.png'
import assBodyAftUpper from 'url:/src/img/future/bodyRearUpper.png'
import assBodyAftCorner from 'url:/src/img/future/bodyRearCorner.png'
import assBodyEngineLeft from 'url:/src/img/future/bodyEngineUpperLeft.png'
import assBodyEngineRight from 'url:/src/img/future/bodyEngineUpperRight.png'
import assBodyBackPlate from 'url:/src/img/future/bodyBackPlate.png'
import assBodyBackLedge from 'url:/src/img/future/bodyBackLedge.png'
import assExtBackBarFace from 'url:/src/img/future/backBarFace.png'
import assRearVentTop from 'url:/src/img/future/rearVentTop.png'
import assRearVentSide from 'url:/src/img/future/rearVentside.png'
import assRearVentLeftBackTop from 'url:/src/img/future/rearVentLeftBackTop.png'
import assRearVentLeftBackBottom from 'url:/src/img/future/rearVentLeftBackBottom.png'
import assRearVentRightBackTop from 'url:/src/img/future/rearVentRightBackTop.png'
import assRearVentRightBackBottom from 'url:/src/img/future/rearVentRightBackBottom.png'
import g from './glob'
import { devLog } from './utils'

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

const makeSpokeMap = () => {
  const spokeMap = {
    long: [],
    short: [],
  }
  for ( let side = 0; side < 6; side++ ) {
    spokeMap.long.push( {
      map: g.three.mkr.textureLoader( [ 2, 3 ].includes( side ) ? assTireTread : assTireWallLong ),
    } )
    spokeMap.short.push( [ 0, 1 ].includes( side )
      ? { opacity: 0 }
      : {
        map: g.three.mkr.textureLoader( [ 2, 3 ].includes( side ) ? assTireTread : assTireWallShort ),
      } )
  }
  return spokeMap
}

const makeWheel = wheel => {
  const msh = { ...g.three.msh }
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
    wheelies[`wheel${wheel}spokeLong${spoke}`] = spokeLong
    wheelies[`wheel${wheel}spokeShort${spoke}`] = spokeShort
  }
  const hubCapMat = {
    map: g.three.mkr.textureLoader( wheel.includes( 'F' ) ? assTireHubCapF : assTireHubCapA ),
  }
  const hubCapMsh = new THREE.MeshBasicMaterial( {
    ...msh,
    ...hubCapMat,
  } )
  hubCapMsh.map.wrapS = hubCapMsh.map.wrapT = THREE.RepeatWrapping
  hubCapMsh.map.repeat.set( 0.5, 1 )
  wheelies[`wheel${wheel}hubCap`] = {
    geo: 'circle',
    struct: [ 43, 32 ],
    position: [ 0, 0, 26 ],
    mat: hubCapMsh,
  }
  const flares = {}
  for ( let flare = 0; flare < 3; flare++ ) {
    const thisFlare = `wheel${wheel}flare${flare + 1}`
    const flareMat = {
      opacity: 0.88,
      map: g.three.mkr.textureLoader( assRocketFlare ),
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
    g.three.flr.push( {
      cdt: 0,
      ctl: 0,
    } )
  }
  const flareFixMat = {
    color: new THREE.Color( 'white' ),
  }
  flares.flareFixer = {
    geo: 'cylinder',
    // eslint-disable-next-line array-bracket-newline, array-element-newline
    struct: [ 27.5, 0.01, 60, 6 ],
    pivot: [ 0, -52 ],
    mat: new THREE.MeshBasicMaterial( {
      ...msh,
      ...flareFixMat,
    } ),
  }
  wheelies[`wheel${wheel}flares`] = {
    struct: [ 276, 276, 376 ],
    pivot: [ 0, -188 ],
    rotation: [ -90 ],
    children: flares,
  }

  return {
    struct: [ 142, 142, 52 ],
    position: [ 0, wheel.includes( 'F' ) ? 289 : -286.5 ],
    children: wheelies,
  }
}

const setDeLorean = () => ( {
  struct: [ 432, 1000, 300 ],
  position: [ 0, 0, -1000 ],
  rotation: [ 135, 0, -90 ],
  children: {
    underCarriage: {
      struct: [ 432, 1000, 127 ],
      children: {
        bottom: {
          struct: [ 432, 1000, 26 ],
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
            },
            ucWheelWallFR: {
              struct: [ 127, 150 ],
              color: new THREE.Color( 'black' ),
              pivot: [ -63.5 ],
              position: [ -142, 289.5 ],
              rotation: [ 0, -90 ],
            },
            ucWheelWallAL: {
              struct: [ 127, 157 ],
              color: new THREE.Color( 'black' ),
              pivot: [ 63.5 ],
              position: [ 142, -286 ],
              rotation: [ 0, 90 ],
            },
            ucWheelWallAR: {
              struct: [ 127, 157 ],
              color: new THREE.Color( 'black' ),
              pivot: [ -63.5 ],
              position: [ -142, -286 ],
              rotation: [ 0, -90 ],
            },
            ucAxleWallFF: {
              struct: [ 432, 127 ],
              txtAss: assCrossAxleF,
              pivot: [ 0, -63.5 ],
              position: [ 0, 364.5 ],
              rotation: [ 90 ],
            },
            ucAxleWallFA: {
              struct: [ 432, 127 ],
              txtAss: assCrossAxle,
              pivot: [ 0, -63.5 ],
              position: [ 0, 214.5 ],
              rotation: [ 90 ],
            },
            ucAxleWallAF: {
              struct: [ 432, 127 ],
              txtAss: assCrossAxle,
              pivot: [ 0, -63.5 ],
              position: [ 0, -207.5 ],
              rotation: [ 90 ],
            },
            ucAxleWallAA: {
              struct: [ 432, 127 ],
              txtAss: assCrossAxleA,
              pivot: [ 0, -63.5 ],
              position: [ 0, -364.5 ],
              rotation: [ 90 ],
            },
            ucWheelWellF: {
              color: new THREE.Color( 'black' ),
              struct: [ 402, 150 ],
              position: [ 0, 289.5, -127 ],
            },
            ucWheelWellA: {
              color: new THREE.Color( 'black' ),
              struct: [ 402, 157 ],
              position: [ 0, -286, -127 ],
            },
          },
        },
      },
    },
    body: {
      struct: [ 432, 1000, 300 ],
      children: {
        bcLowerL: {
          txtAss: assBodyCenterLower,
          struct: [ 103, 460 ],
          pivot: [ 51.5 ],
          position: [ 216, 9.5 ],
          rotation: [ 0, 90 ],
        },
        bcLowerR: {
          txtAss: assBodyCenterLower,
          struct: [ 103, 460 ],
          pivot: [ 51.5 ],
          position: [ -216, 9.5 ],
          rotation: [ 0, 90 ],
        },
        bcMiddleL: {
          txtAss: assBodyCenterMiddle,
          struct: [ 61, 729 ],
          pivot: [ 30.5 ],
          position: [ 216, 0, -103 ],
          rotation: [ 0, 120 ],
        },
        bcMiddleR: {
          txtAss: assBodyCenterMiddle,
          struct: [ 61, 729 ],
          pivot: [ 30.5 ],
          position: [ -216, 0, -103 ],
          rotation: [ 0, 60 ],
        },
        bcUpperL: {
          struct: [ 100, 359 ],
          pivot: [ 50 ],
          position: [ 186, -27.5, -155 ],
          children: {
            bcUpperFrameL: {
              txtAss: assBodyCenterUpper,
              struct: [ 100, 359 ],
              pivot: [ 50 ],
              rotation: [ 0, 132.5 ],
            },
            sideViewMirrorL: {

            },
          },
        },
        bcUpperR: {
          struct: [ 100, 359 ],
          pivot: [ 50 ],
          position: [ -186, -27.5, -155 ],
          children: {
            bcUpperFrameR: {
              txtAss: assBodyCenterUpper,
              struct: [ 100, 359 ],
              pivot: [ 50 ],
              rotation: [ 0, 47.5 ],
            },
            sideViewMirrorR: {

            },
          },
        },
        sideWindowL: {
          txtAss: assSideWindow,
          struct: [ 100, 359 ],
          pivot: [ 50 ],
          position: [ 185.5, -27.5, -155 ],
          rotation: [ 0, 132.5 ],
        },
        sideWindowR: {
          txtAss: assSideWindow,
          struct: [ 100, 359 ],
          pivot: [ 50 ],
          position: [ -185.5, -27.5, -155 ],
          rotation: [ 0, 47.5 ],
        },
        roof: {
          txtAss: assRoof,
          struct: [ 251.5, 195 ],
          position: [ 0, -98.5, -220.5 ],
        },
        windshield: {
          txtAss: assWindshield,
          struct: [ 375, 167 ],
          pivot: [ 0, -82.5 ],
          position: [ 0, 149.5, -154 ],
          rotation: [ 23.5 ],
        },
        hood: {
          txtAss: assHood,
          struct: [ 387, 314 ],
          pivot: [ 0, -157 ],
          position: [ 0, 463, -133.5 ],
          rotation: [ 4 ],
        },
        bfLowerL: {
          txtAss: assBodyFrontLower,
          struct: [ 81, 119 ],
          pivot: [ -40.5, 59.5 ],
          position: [ 216, 363, -104 ],
          rotation: { y: 90, x: -12.325 }, // sometimes you have to rotate multiple axes in a specific order. sigh.
        },
        bfLowerR: {
          txtAss: assBodyFrontLower,
          struct: [ 81, 119 ],
          pivot: [ -40.5, 59.5 ],
          position: [ -216, 363, -104 ],
          rotation: { y: 90, x: 12.325 },
        },
        bfUpperL: {
          txtAss: assBodyFrontUpper,
          struct: [ 44, 121 ],
          pivot: [ 22, 60.5 ],
          position: [ 216, 363, -103 ],
          rotation: { z: 12.325, y: 120 },
        },
        bfUpperR: {
          txtAss: assBodyFrontUpper,
          struct: [ 44, 121 ],
          pivot: [ 22, 60.5 ],
          position: [ -216, 363, -103 ],
          rotation: { z: -12.325, y: 60 },
        },
        bfCornerL: {
          txtAss: assBodyFrontCorner,
          struct: [ 24, 17 ],
          pivot: [ -12, -8.5 ],
          position: [ 216, 364, -103 ],
          rotation: { y: 90 },
        },
        bfCornerR: {
          txtAss: assBodyFrontCorner,
          struct: [ 24, 17 ],
          pivot: [ -12, -8.5 ],
          position: [ -216, 364, -103 ],
          rotation: { y: 90 },
        },
        grille: {
          txtAss: assGrille,
          struct: [ 382, 36 ],
          pivot: [ 0, -18 ],
          position: [ 0, 481, -102.5 ],
          rotation: { x: 59.5 },
        },
        bumperFrontBottomUpper: {
          color: new THREE.Color( 0x18171d ),
          struct: [ 381, 24 ],
          pivot: [ 0, -12 ],
          position: [ 0, 480, -67.5 ],
          rotation: { x: -16 },
        },
        bumperFrontBottomMiddle: {
          color: new THREE.Color( 0x101010 ),
          struct: [ 381, 24 ],
          pivot: [ 0, -12 ],
          position: [ 0, 464, -42 ],
          rotation: { x: 90 },
        },
        bumperFrontBottomLower: {
          color: new THREE.Color( 0x2f2f2f ),
          struct: [ 381, 24 ],
          pivot: [ 0, -12 ],
          position: [ 0, 483, -37 ],
          rotation: { x: 34.5 },
        },
        bumperFrontTop: {
          txtAss: assBumperFrontTop,
          struct: [ 382, 36 ],
          pivot: [ 0, -18 ],
          position: [ 0, 480, -67.5 ],
          rotation: { x: 90 },
        },
        engineTop: {
          txtAss: assBodyEngineTop,
          struct: [ 316, 170 ],
          pivot: [ 0, -85 ],
          position: [ 0, -196, -220.5 ],
          rotation: { x: -11 },
        },
        engineBack: {
          txtAss: assBodyEngineBack,
          struct: [ 333, 99 ],
          pivot: [ 0, -49.5 ],
          position: [ 0, -361, -188 ],
          rotation: { x: -19 },
        },
        baLowerL: {
          txtAss: assBodyAftLower,
          struct: [ 77, 126 ],
          pivot: [ 38.5, -63 ],
          position: [ 216, -364, -26 ],
          rotation: { y: 90, x: 13 },
        },
        baLowerR: {
          txtAss: assBodyAftLower,
          struct: [ 77, 126 ],
          pivot: [ 38.5, -63 ],
          position: [ -216, -364, -26 ],
          rotation: { y: 90, x: -13 },
        },
        baMiddleL: {
          txtAss: assBodyAftMiddle,
          struct: [ 61, 126 ],
          pivot: [ 30.5, -63 ],
          position: [ 216, -364, -103 ],
          rotation: { z: -12.325, y: 120 },
        },
        baMiddleR: {
          txtAss: assBodyAftMiddle,
          struct: [ 61, 126 ],
          pivot: [ 30.5, -63 ],
          position: [ -216, -364, -103 ],
          rotation: { z: 12.325, y: 60 },
        },
        baUpperL: {
          txtAss: assBodyAftUpper,
          struct: [ 49, 98 ],
          pivot: [ 24.5, -49 ],
          position: [ 187, -358, -155.5 ],
          rotation: { z: -12.325, y: 129.5 },
        },
        baUpperR: {
          txtAss: assBodyAftUpper,
          struct: [ 49, 98 ],
          pivot: [ 24.5, -49 ],
          position: [ -187, -358, -155.5 ],
          rotation: { z: 12.325, y: 50.5 },
        },
        baCornerL: {
          txtAss: assBodyAftCorner,
          struct: [ 27, 17 ],
          pivot: [ -13.5, 8.5 ],
          position: [ 216, -364, -103 ],
          rotation: { y: 90 },
        },
        baCornerR: {
          txtAss: assBodyAftCorner,
          struct: [ 27, 17 ],
          pivot: [ -13.5, 8.5 ],
          position: [ -216, -364, -103 ],
          rotation: { y: 90 },
        },
        engineLeft: {
          txtAss: assBodyEngineLeft,
          struct: [ 87, 157 ],
          pivot: [ 42.75, -78.5 ],
          position: [ 185.5, -206, -155 ],
          rotation: { y: 132.5 },
        },
        engineRight: {
          txtAss: assBodyEngineRight,
          struct: [ 87, 157 ],
          pivot: [ 42.75, -78.5 ],
          position: [ -185.5, -206.5, -155 ],
          rotation: { y: 47.5 },
        },
        bBackPlate: {
          txtAss: assBodyBackPlate,
          struct: [ 376, 52.5 ],
          pivot: [ 0, -25 ],
          position: [ 0, -475, -109 ],
          rotation: { x: 114 },
        },
        bBackLedge: {
          txtAss: assBodyBackLedge,
          struct: [ 381, 13 ],
          pivot: [ 0, -6.5 ],
          position: [ 0, -475, -109 ],
          rotation: { x: -22 },
        },
        bumperAftUpper: {
          color: new THREE.Color( 0x2f2f2f ),
          struct: [ 376, 32 ],
          pivot: [ 0, 16.5 ],
          position: [ 0, -486.5, -72 ],
          rotation: { x: -90 },
        },
        bumperAftMiddle: {
          color: new THREE.Color( 0x101010 ),
          struct: [ 376.5, 9 ],
          pivot: [ 0, 4.5 ],
          position: [ 0, -487, -72 ],
        },
        bumperAftLower: {
          color: new THREE.Color( 0x18171d ),
          struct: [ 381, 50 ],
          pivot: [ 0, 25 ],
          position: [ 0, -474, -41 ],
          rotation: { x: -90 },
        },

      },
    },
    exterior: {
      struct: [ 432, 1000, 300 ],
      children: {
        backBar: makeBackBar(),
        rearVents: {
          position: [ 0, -457, -109 ],
          rotation: { x: 30 },
          children: {
            rearVentL: makeRearVent( 'L' ),
            rearVentR: makeRearVent( 'R' ),
          },
        },
      },
    },
    interior: {
      struct: [ 432, 1000, 300 ],
      children: {},
    },
    wheels: {
      struct: [ 432, 729, 142 ],
      position: [ 0, 0, -11 ],
      children: {
        wheelsL: {
          struct: [ 142, 729, 52 ],
          pivot: [ 71 ],
          position: [ 223 ],
          children: {
            wheelLF: makeWheel( 'LF' ),
            wheelLA: makeWheel( 'LA' ),
          },
        },
        wheelsR: {
          struct: [ 142, 729 ],
          pivot: [ -71 ],
          position: [ -223 ],
          children: {
            wheelRF: makeWheel( 'RF' ),
            wheelRA: makeWheel( 'RA' ),
          },
        },
      },
    },
  },
} )

const makeBackBar = () => {
  const bb = {
    c: 15,
    h: 40,
    w: 92,
  }
  const msh = { ...g.three.msh }
  const barFaceMats = []
  for ( let face = 0; face < 8; face++ ) {
    const mshMap = {
      map: g.three.mkr.textureLoader( assExtBackBarFace ),
    }
    barFaceMats[face] = new THREE.MeshBasicMaterial( {
      ...msh,
      ...mshMap,
    } )
  }
  barFaceMats.forEach( ( _, f ) => {
    if ( barFaceMats[f].map ) {
      barFaceMats[f].map.wrapS = barFaceMats[f].map.wrapT = THREE.RepeatWrapping

      switch ( f ) {
        case 0:
          barFaceMats[f].map.repeat.set( ( bb.w - ( bb.c * 2 ) ) / bb.w, bb.c / bb.h )
          barFaceMats[f].map.offset.x = bb.c / bb.w
          barFaceMats[f].map.offset.y = ( bb.h - bb.c ) / bb.h
          break
        case 1:
          barFaceMats[f].map.repeat.set( bb.c / bb.w, ( bb.h - bb.c ) / bb.h )
          barFaceMats[f].map.rotation = THREE.Math.degToRad( -90 )
          break
        case 2:
          barFaceMats[f].map.repeat.set( bb.c / bb.w, ( bb.h - bb.c ) / bb.h )
          barFaceMats[f].map.rotation = THREE.Math.degToRad( -90 )
          break
        case 3:
          barFaceMats[f].map.repeat.set( 1, bb.c / bb.h )
          barFaceMats[f].map.offset.y = ( bb.h - bb.c ) / bb.h
          break
        case 4:
          barFaceMats[f].map.repeat.set( bb.c / bb.w, 1 )
          barFaceMats[f].map.rotation = THREE.Math.degToRad( 90 )
          barFaceMats[f].map.offset.x = ( bb.w - bb.c ) / bb.w
          break
        case 5:
          barFaceMats[f].map.repeat.set( bb.c / bb.w, 1 )
          barFaceMats[f].map.rotation = THREE.Math.degToRad( -90 )
          break
        case 6:
          barFaceMats[f].map.rotation = THREE.Math.degToRad( 180 )
          break
      }
    }
  } )

  return {
    struct: [ 92, 15, 40 ],
    position: [ 0, -284, -210 ],
    children: {
      backBarInner: {
        struct: [ 62, 15, 25 ],
        position: [ 0, 0, 7.5 ],
        children: {
          backBarInnerTop: {
            struct: [ 62, 15 ],
            position: [ 0, 0, -25 ],
            mat: barFaceMats[0],
          },
          backBarInnerLeft: {
            struct: [ 25, 15 ],
            pivot: [ 12.5 ],
            position: [ 31 ],
            rotation: [ 0, 90 ],
            mat: barFaceMats[1],
          },
          backBarInnerRight: {
            struct: [ 25, 15 ],
            pivot: [ 12.5 ],
            position: [ -31 ],
            rotation: [ 180, -90 ],
            mat: barFaceMats[2],
          },
        },
      },
      backBarOuter: {
        geo: 'box',
        struct: [ 92, 15, 40 ],
        children: {
          backBarOuterTop: {
            struct: [ 92, 15 ],
            position: [ 0, 0, -32.5 ],
            mat: barFaceMats[3],
          },
          backBarOuterLeft: {
            struct: [ 40, 15 ],
            pivot: [ -20 ],
            position: [ 46, 0, 7.5 ],
            rotation: [ 0, -90 ],
            mat: barFaceMats[4],
          },
          backBarOuterRight: {
            struct: [ 40, 15 ],
            pivot: [ 20 ],
            position: [ -46, 0, 7.5 ],
            rotation: [ 0, 90 ],
            mat: barFaceMats[5],
          },
          backBarOuterFront: {
            struct: [ 92, 40 ],
            pivot: [ 0, 20 ],
            position: [ 0, 7.5, -32.5 ],
            rotation: [ 90 ],
            mat: barFaceMats[6],
          },
          backBarOuterBack: {
            struct: [ 92, 40 ],
            pivot: [ 0, 20 ],
            position: [ 0, -7.5, 7.5 ],
            rotation: [ -90 ],
            mat: barFaceMats[7],
          },
        },
      },
    },
  }
}

const makeRearVent = side => ( {
  position: [ side === 'L' ? 96 : -94 ],
  children: {
    [`rearVentBottom${side}`]: {
      color: new THREE.Color( 0x191e34 ),
      struct: [ 74, 92 ],
    },
    [`rearVentLeftSide${side}`]: {
      txtAss: assRearVentSide,
      struct: [ 100, 116 ],
      pivot: [ -50 ],
      position: [ 37, -12 ],
      rotation: { y: -90 },
    },
    [`rearVentRightSide${side}`]: {
      txtAss: assRearVentSide,
      struct: [ 100, 116 ],
      pivot: [ -50 ],
      position: [ -37, -12 ],
      rotation: { y: -90 },
    },
    [`rearVentTop${side}`]: {
      txtAss: assRearVentTop,
      struct: [ 74, 116 ],
      position: [ 0, -12, -100 ],
    },
    [`rearVentBackTop${side}`]: {
      txtAss: side === 'L' ? assRearVentLeftBackTop : assRearVentRightBackTop,
      struct: [ 74, 60 ],
      pivot: [ 0, 30 ],
      position: [ 0, -69, -40 ],
      rotation: { x: -90 },
    },
    [`rearVentBackBottom${side}`]: {
      txtAss: side === 'L' ? assRearVentLeftBackBottom : assRearVentRightBackBottom,
      struct: [ 74, 48 ],
      pivot: [ 0, 24 ],
      position: [ 0, -45, 0 ],
      rotation: { x: -120 },
    },
  },
} )

export { setDeLorean }
