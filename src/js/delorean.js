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
import assFusionBaseGraySide from 'url:/src/img/future/fusionBaseSideCyl.png'
import assFusionBaseGrayTop from 'url:/src/img/future/fusionBaseTop.png'
import assFusionBaseBlackSide from 'url:/src/img/future/fusionBaseBlackSide.png'
import assFusionBaseWhiteSide from 'url:/src/img/future/fusionBaseWhiteCyl.png'
import assFusionFaceWide from 'url:/src/img/future/fusionFaceWide.png'
import assFusionFaceFront from 'url:/src/img/future/fusionFaceFront.png'
import assFusionFaceBack from 'url:/src/img/future/fusionFaceBack.png'
import assFusionFaceFrontCorner from 'url:/src/img/future/fusionAngleFront.png'
import assFusionFaceBackCorner from 'url:/src/img/future/fusionAngleBack.png'
import assFusionTop from 'url:/src/img/future/fusionTop.png'
import assFusionCrossSection from 'url:/src/img/future/fusionCrossSection.png'
import assFusionLockFace from 'url:/src/img/future/fusionLock.png'
import assTireBiter from 'url:/src/img/future/tireInner.png'
import assPipeMetal01 from 'url:/src/img/future/metalPipe.png'
import assPipeMetal02 from 'url:/src/img/future/metalSphere.png'
import assPipeMetal03 from 'url:/src/img/future/metalPipe2.png'
import assPanelScreen from 'url:/src/img/future/panelScreen.png'
import g from './glob'
import { devLog } from './utils'

const setMakes = () => {
  g.three.mkr.pipe = {
    map: [ { emissiveMap: new THREE.TextureLoader().load( assPipeMetal01 ), emissive: new THREE.Color( 0x999999 ) }, { emissiveMap: new THREE.TextureLoader().load( assPipeMetal02 ), emissive: new THREE.Color( 0x666666 ) }, { emissiveMap: new THREE.TextureLoader().load( assPipeMetal01 ), emissive: new THREE.Color( 0xffffff ) } ],
    mat: {
      roughness: 0.4,
      metalness: 1,
    },
  }

  g.three.mkr.lb = {
    crvF: [
      [ 0, 0, 0 ],
      [ -180, 0, 0 ],
      [ -195.5, 0, 0 ],
      [ -199, -12, 0 ],
      [ -211, -64, 0 ],
    ],
  }

  g.three.mkr.lb.rail = {
    F: {
      T: {
        crv: g.three.mkr.lb.crvF,
        pos: [ 0, 486, -101 ],
      },
      B: {
        crv: g.three.mkr.lb.crvF,
        pos: [ 0, 486, -73 ],
      },
    },
    A: {
      F: {
        crv: [
          [ 0, 0, 0 ],
          [ -112, 0, 0 ],
          [ -127, -2, 4 ],
          [ -190, -17, 69 ],
          [ -202, -44, 88 ],
          [ -202, -59, 90 ],
          [ -202, -180, 90 ],
          [ -202.5, -210, 99 ],
          [ -210, -228, 116 ],
          [ -214, -238, 130 ],
          [ -213.5, -246, 147 ],
          [ -211, -256, 165 ],
          [ -206, -260, 171 ],
        ],
        pos: [ 0, -166, -226 ],
      },
      A: {
        crv: [
          [ 0, 0, 0 ],
          [ -112, 0, 0 ],
          [ -127, -2, 4 ],
          [ -177, -13, 52 ],
          [ -188, -23, 62 ],
          [ -190, -59, 65 ],
          [ -190.25, -145, 65 ],
          [ -190.5, -169, 67.5 ],
          [ -195, -206, 83.5 ],
          [ -210, -230, 114 ],
          [ -212, -238, 130 ],
          [ -211, -246, 147 ],
          [ -209, -256, 165 ],
        ],
        pos: [ 0, -194, -226 ],
      },
    },
  }

  const glowCrv = new THREE.EllipseCurve( 11.5, 2.5, 10.5, 6 )
  g.three.mkr.lb.glowProfile = new THREE.Shape( glowCrv.getPoints( 16 ) )

  g.three.mkr.lb.panelProfile = new THREE.Shape()
  g.three.mkr.lb.panelProfile.moveTo( 0, 1.75 )
  g.three.mkr.lb.panelProfile.lineTo( 0, 3.25 )
  g.three.mkr.lb.panelProfile.quadraticCurveTo( 0, 5, 0.875, 5 )
  g.three.mkr.lb.panelProfile.quadraticCurveTo( 1.75, 5, 1.75, 3.25 )
  g.three.mkr.lb.panelProfile.lineTo( 1.75, 1.75 )
  g.three.mkr.lb.panelProfile.lineTo( 21.25, 1.75 )
  g.three.mkr.lb.panelProfile.lineTo( 21.25, 3.25 )
  g.three.mkr.lb.panelProfile.quadraticCurveTo( 21.25, 5, 22.125, 5 )
  g.three.mkr.lb.panelProfile.quadraticCurveTo( 23, 5, 23, 3.25 )
  g.three.mkr.lb.panelProfile.lineTo( 23, 1.75 )
  g.three.mkr.lb.panelProfile.quadraticCurveTo( 23, 0, 21.25, 0 )
  g.three.mkr.lb.panelProfile.lineTo( 1.75, 0 )
  g.three.mkr.lb.panelProfile.quadraticCurveTo( 0, 0, 0, 1.75 )

  const panelCrvA = []
  g.three.mkr.lb.rail.A.F.crv.forEach( ( v3c, v ) => {
    const panelV3c = []
    v3c.forEach( ( axis, a ) => {
      panelV3c.push( ( axis + g.three.mkr.lb.rail.A.F.crv[v][a] ) / 2 )
    } )
    panelCrvA.push( panelV3c )
  } )
  const panelPosA = []
  g.three.mkr.lb.rail.A.F.pos.forEach( ( axis, a ) => {
    panelPosA.push( ( axis + g.three.mkr.lb.rail.A.F.pos[a] ) / 2 )
  } )
  panelPosA[1] -= 5
  panelPosA[2] -= 5.5

  g.three.mkr.lb.panel = {
    F: {
      crv: g.three.mkr.lb.crvF,
      pos: [ -1, 485, -76 ],
      scl: { x: 1.005 },
    },
    A: {
      crv: panelCrvA,
      pos: panelPosA,
      scl: { x: 1.01 },
    },
  }

  g.three.mkr.lb.panels = {
    F: [ g.three.mkr.lb.panel.F, g.three.mkr.lb.panel.F ],
    A: [ g.three.mkr.lb.panel.A, g.three.mkr.lb.panel.A ],
  }

  g.three.mkr.lb.rails = {
    F: [
      g.three.mkr.lb.rail.F.T,
      g.three.mkr.lb.rail.F.T,
      g.three.mkr.lb.rail.F.B,
      g.three.mkr.lb.rail.F.B,
    ],
    A: [
      g.three.mkr.lb.rail.A.F,
      g.three.mkr.lb.rail.A.F,
      g.three.mkr.lb.rail.A.A,
      g.three.mkr.lb.rail.A.A,
    ],
  }

  g.three.mkr.wheels = {
    armTarget: {
      x: 158,
      z: -16,
    },
    posTarget: {
      x: 188,
      z: -30,
    },
    rotIncRad: THREE.Math.degToRad( 5 ),
    rotTarget: Math.PI / 2,
  }

  g.three.mkr.inScene = {
    /* eslint-disable array-bracket-newline, array-element-newline */
    wheelRockets: [
      [ 0, 1, 0, 0, 14 ], // this is hacky, but I was having issues with being able to access these objects by reference
      [ 0, 1, 0, 1, 14 ],
      [ 0, 1, 1, 0, 14 ],
      [ 0, 1, 1, 1, 14 ],
    ],
    headLights: [
      [ 0, 0, 1, 4, 0, 0 ],
      [ 0, 0, 1, 4, 1, 0 ],
    ],
    /* eslint-enable array-bracket-newline, array-element-newline */
  }

  g.three.mkr.setMades = () => {
    g.three.mkr.inScene.wheelRockets.forEach( fls => {
      // NOT A HELPFUL HELPER, at least not in this case
      // const wheelHelper = new THREE.BoxHelper()
      // g.three.scene.add( wheelHelper )
      // wheelHelper.setFromObject( g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]] )

      g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].children.forEach( ( _, flr ) => {
        if ( flr < g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].children.length - 1 ) {
          const drillDown = [ ...fls, flr ]
          g.three.ani.flr.push( g.three.mkr.setTextureAnimator( g.three.ani.flr.length, drillDown, 5, 1, 5, 76 ) ) // texture, #horiz, #vert, #total, duration
        }
      } )
    } )
    g.three.mkr.tlt = {}
    g.three.xyz.forEach( axis => {
      g.three.mkr.tlt[axis] = 0
    } )

    g.three.mkr.inScene.headLights.forEach( hls => {
      const pointLight = new THREE.PointLight( 0x8ebcf0, 16, 256 )
      pointLight.castShadow = true // default false
      pointLight.position.y = 20.42
      pointLight.position.z = 21
      g.three.scene.children[hls[0]].children[hls[1]].children[hls[2]].children[hls[3]].children[hls[4]].add( pointLight )
      // g.three.scene.add( new THREE.PointLightHelper( pointLight, 10 ) )

      const spotLight = new THREE.SpotLight( 0xb3e7fb, 5, 0, THREE.Math.degToRad( 9 ), 0.25 )
      spotLight.castShadow = true // default false
      spotLight.position.y = 21
      spotLight.position.z = 22
      g.three.scene.children[hls[0]].children[hls[1]].children[hls[2]].children[hls[3]].children[hls[4]].add( spotLight )
      spotLight.target = pointLight
      // g.three.scene.add(  new THREE.SpotLightHelper( spotLight ) )
    } )
  }
}

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

const makeBody = () => ( {
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
} )

const makeInterior = () => ( {
  struct: [ 432, 1000, 300 ],
  children: {},
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
    // struct: [ 92, 15, 40 ],
    position: [ 0, -284, -206 ],
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

const makeMrFusion = () => ( {
  position: [ 0, -358, -201 ],
  children: {
    fusionBaseLevel1GrayDrum: {
      txtAss: assFusionBaseGraySide,
      geo: 'cylinder',
      // eslint-disable-next-line array-bracket-newline, array-element-newline
      struct: [ 43, 43, 32, 12, 1, true ],
      pivot: [ 0, -16 ],
      rotation: { x: -90 },
    },
    fusionBase1Level1GrayTop: {
      txtAss: assFusionBaseGrayTop,
      geo: 'circle',
      struct: [ 43, 16 ],
    },
    fusionBaseLevel2BlackDrum: {
      txtAss: assFusionBaseBlackSide,
      geo: 'cylinder',
      // eslint-disable-next-line array-bracket-newline, array-element-newline
      struct: [ 23, 23, 20, 10, 1, true ],
      pivot: [ 0, 10 ],
      rotation: { x: -90 },
    },
    fusionBaseLevel2BlackTop: {
      color: new THREE.Color( 0x3c3c3c ),
      geo: 'circle',
      struct: [ 23, 16 ],
      pivot: [ 0, 0, -20 ],
    },
    fusionBaseLevel3White: {
      txtAss: assFusionBaseWhiteSide,
      geo: 'cylinder',
      // eslint-disable-next-line array-bracket-newline, array-element-newline
      struct: [ 2, 23, 11, 6, 1, true ],
      position: [ 0, 0, -25 ],
      rotation: { x: -90 },
    },
    fusionBodyLeft: {
      txtAss: assFusionFaceWide,
      struct: [ 14, 60 ],
      pivot: [ 0, 30 ],
      position: [ 8, 0, -83.5 ],
      rotation: { x: 90, y: -90 },
    },
    fusionBodyRight: {
      txtAss: assFusionFaceWide,
      struct: [ 14, 60 ],
      pivot: [ 0, 30 ],
      position: [ -8, 0, -83.5 ],
      rotation: { x: 90, y: -90 },
    },
    fusionBodyFront: {
      txtAss: assFusionFaceFront,
      struct: [ 8, 60 ],
      pivot: [ 0, 30 ],
      position: [ 0, 14, -83.5 ],
      rotation: { x: 90 },
    },
    fusionBodyBack: {
      txtAss: assFusionFaceBack,
      struct: [ 8, 60 ],
      pivot: [ 0, 30 ],
      position: [ 0, -14, -83.5 ],
      rotation: { x: 90 },
    },
    fusionBodyFrontLeft: {
      txtAss: assFusionFaceFrontCorner,
      struct: [ 8.5, 60 ],
      pivot: [ -4.25, 30 ],
      position: [ 8, 7, -83.5 ],
      rotation: { x: 90, y: -60.25 },
    },
    fusionBodyFrontRight: {
      txtAss: assFusionFaceFrontCorner,
      struct: [ 8.5, 60 ],
      pivot: [ -4.25, 30 ],
      position: [ -8, 7, -83.5 ],
      rotation: { x: 90, y: 240.25 },
    },
    fusionBodyBackLeft: {
      txtAss: assFusionFaceBackCorner,
      struct: [ 8.5, 60 ],
      pivot: [ 4.25, 30 ],
      position: [ 8, -7, -83.5 ],
      rotation: { x: 90, y: -119.75 },
    },
    fusionBodyBackRight: {
      txtAss: assFusionFaceBackCorner,
      struct: [ 8.5, 60 ],
      pivot: [ 4.25, 30 ],
      position: [ -8, -7, -83.5 ],
      rotation: { x: 90, y: -60.25 },
    },
    fusionBodyTop: {
      txtAss: assFusionTop,
      struct: [ 16, 28 ],
      position: [ 0, 0, -83.5 ],
      depthWrite: false,
    },
    fusionBodyInnerUpper: {
      txtAss: assFusionCrossSection,
      struct: [ 16, 28 ],
      position: [ 0, 0, -43.5 ],
      rotation: { x: 45 },
    },
    fusionBodyInnerLower: {
      txtAss: assFusionCrossSection,
      struct: [ 16, 28 ],
      position: [ 0, 0, -27.5 ],
    },
    fusionBodyInnerLeft: {
      txtAss: assFusionCrossSection,
      struct: [ 16, 28 ],
      position: [ 0, 0, -80 ],
      rotation: { y: 25 },
    },
    fusionBodyInnerRight: {
      txtAss: assFusionCrossSection,
      struct: [ 16, 28 ],
      position: [ 0, 0, -80 ],
      rotation: { y: -25 },
    },
    fusionBodyInterior: {
      color: new THREE.Color( 0xefefef ),
      struct: [ 16, 24 ],
      pivot: [ 0, 12 ],
      position: [ 0, 0, -23.5 ],
      rotation: { x: -90 },
    },
    fusionLockBack: {
      color: new THREE.Color( 0xa31c18 ),
      struct: [ 10, 10 ],
      pivot: [ 0, -5 ],
      position: [ 0, -27, -24 ],
      rotation: { x: -90 },
    },
    fusionLockTop: {
      color: new THREE.Color( 0xac4139 ),
      struct: [ 10, 10 ],
      position: [ 0, -22, -24 ],
    },
    fusionLockFaceLeft: {
      txtAss: assFusionLockFace,
      struct: [ 10, 10 ],
      pivot: [ 0, 5 ],
      position: [ 5, -27, -19 ],
      rotation: { y: -90 },
    },
    fusionLockFaceRight: {
      txtAss: assFusionLockFace,
      struct: [ 10, 10 ],
      pivot: [ 0, 5 ],
      position: [ -5, -27, -19 ],
      rotation: { y: -90 },
    },
  },
} )

const makeLightBox = side => {
  const msh = { ...g.three.msh }
  const col = { color: new THREE.Color( 0xcccccc ) }
  const makePolyObj = {
    position: [ 0, 14, 58.25 ],
  }
  /* eslint-disable array-element-newline */
  const polyVert = [
    0, 0, 0, // any amount of positive y creates the same shape. HOW
    side === 'L' ? -0.75 : -0.75, 0.25, -1, // this makes zero fucking sense
    side === 'L' ? 0.75 : 0.75, 0.25, -1,
    -45.5, -11.5, -58.25,
    45.5, -11.5, -58.25,
  ]
  const polyFace = [
    0, 2, 1,
    0, 1, 3,
    0, 3, 4,
    0, 4, 2,
  ]
  /* eslint-enable array-element-newline */
  makePolyObj.geo = new THREE.PolyhedronGeometry( polyVert, polyFace, 75, 0 )
  makePolyObj.mat = new THREE.MeshStandardMaterial( { ...msh, ...col } )
  makePolyObj.msh = new THREE.Mesh( makePolyObj.geo, makePolyObj.mat )
  makePolyObj.msh.castShadow = true // default is false

  return {
    children: {
      theBox: makePolyObj,
    },
  }
}

const makeHeadLight = side => ( {
  position: [ side === 'L' ? 133 : -131, 479, -104.5 ],
  rotation: { x: 59.5, z: 180 },
  children: {
    [`lightBox${side}`]: makeLightBox( side ),
  },
} )

const makeLightBarPanel = where => {
  const children = {}

  g.three.mkr.lb.panels[where].forEach( ( lb, lbp ) => {
    if ( lb.crv.length && lb.crv.length > 1 ) {
      const crvPts = g.three.mkr.createVector3s( lb.crv )
      const panelCrv = new THREE.CatmullRomCurve3( crvPts )
      const panelMap = new THREE.TextureLoader().load( assPanelScreen )
      const panelGeo = new THREE.ExtrudeGeometry( g.three.mkr.lb.panelProfile, { extrudePath: panelCrv, steps: 64, depth: 400 } )
      const panelMat = new THREE.MeshStandardMaterial( {
        color: 0x999999,
        side: THREE.DoubleSide,
        emissiveMap: panelMap,
        emissive: new THREE.Color( 0x999999 ),
        alphaMap: panelMap,
        transparent: true,
      } )
      panelMat.alphaMap.wrapS = panelMat.alphaMap.wrapT = THREE.RepeatWrapping
      panelMat.alphaMap.repeat.set( 0.2, 0.2 )
      const panelMsh = new THREE.Mesh( panelGeo, [ new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } ), panelMat ] )
      if ( lbp % 2 ) g.three.mkr.mirrorMesh( panelMsh )
      Object.keys( g.three.mkr.lb.panel[where].scl ).forEach( axis => {
        g.three.mkr.scaleMesh( panelMsh, g.three.mkr.lb.panel[where].scl[axis], axis )
      } )
      children[`lightBarPanel${where}${lbp % 2 ? 'R' : 'L'}`] = {
        msh: panelMsh,
        position: lb.pos,
      }
      const glowGeom = new THREE.ExtrudeGeometry( g.three.mkr.lb.glowProfile, { extrudePath: panelCrv, steps: 64, depth: 400 } )
      const glowMesh = new g.three.x.GeometricGlowMesh( glowGeom, panelMat.alphaMap, [ 2, 4, 0 ] )
      panelMsh.add( glowMesh.object3d )
      // var insideUniforms = glowMesh.insideMesh.material.uniforms
      // insideUniforms.glowColor.value.set('hotpink')
      // var outsideUniforms = glowMesh.outsideMesh.material.uniforms
      // outsideUniforms.glowColor.value.set('hotpink')
    }
  } )

  return children
}

const makeLightBarRails = where => {
  const children = {}

  g.three.mkr.lb.rails[where].forEach( ( lb, lbr ) => {
    if ( lb.crv.length && lb.crv.length > 1 ) {
      const crvPts = g.three.mkr.createVector3s( lb.crv )
      const tubeCrv = new THREE.CatmullRomCurve3( crvPts )
      const tubeMap = new THREE.TextureLoader().load( assPipeMetal03 )
      const tubeGeo = new THREE.TubeGeometry( tubeCrv, 120, 2.5, 32, false )
      const tubeMat = new THREE.MeshStandardMaterial( {
        color: 0xcccccc,
        side: THREE.DoubleSide,
        emissiveMap: tubeMap,
        emissive: new THREE.Color( 0xffffff ),
      } )
      const tubeMsh = new THREE.Mesh( tubeGeo, tubeMat )
      if ( lbr % 2 ) g.three.mkr.mirrorMesh( tubeMsh )
      const whereAt = Object.keys( g.three.mkr.lb.rail[where] )
      children[`lightBarPipe${where}${whereAt[lbr < 2 ? 0 : 1]}${lbr % 2 ? 'R' : 'L'}`] = {
        msh: tubeMsh,
        position: lb.pos,
      }
    }
  } )

  return children
}

const makeLightBar = where => ( {
  children: {
    ...makeLightBarRails( where ),
    ...makeLightBarPanel( where ),
  },
} )

const makeExterior = () => ( {
  struct: [ 432, 1000, 300 ],
  children: {
    backBar: makeBackBar(),
    mrFusion: makeMrFusion(),
    rearVents: {
      position: [ 0, -457, -109 ],
      rotation: { x: 30 },
      children: {
        rearVentL: makeRearVent( 'L' ),
        rearVentR: makeRearVent( 'R' ),
      },
    },
    lightBars: {
      children: {
        lightBarFore: makeLightBar( 'F' ),
        lightBarAft: makeLightBar( 'A' ),
        // wormholeGenerator: {

        // },
        // lightBarGlowAft: {

        // },
        // lightBarAftTerminalL: {

        // },
        // lightBarAftTerminalR: {

        // },
        //   },
        // },
        //   children: {
        //     lightBarGlowAft: {

        //     },
        //     lightBarAftTerminalL: {

        //     },
        //     lightBarAftTerminalR: {

        //     },
        //   },
        // },
      },
    },
    headLights: {
      children: {
        headLightL: makeHeadLight( 'L' ),
        headLightR: makeHeadLight( 'R' ),
      },
    },
  },
} )

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
  const wheelIsFront = wheel.includes( 'F' )
  const wheelIsLeft = wheel.includes( 'L' )
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
    map: g.three.mkr.textureLoader( wheelIsFront ? assTireHubCapF : assTireHubCapA ),
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
  wheelies[`wheelFlares${wheel}`] = {
    struct: [ 276, 276, 376 ],
    pivot: [ 0, -188 ],
    rotation: [ -90 ],
    children: flares,
  }

  wheelies[`wheelMechTireMount${wheel}`] = {
    children: {
      [`wheelMechTireMountJoint${wheel}`]: {
        geo: 'cylinder',
        // eslint-disable-next-line array-bracket-newline, array-element-newline
        struct: [ 15, 15, 15, 12 ],
        mat: new THREE.MeshStandardMaterial( {
          ...msh,
          ...g.three.mkr.pipe.mat,
          ...g.three.mkr.pipe.map[2],
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
          ...g.three.mkr.pipe.mat,
          ...g.three.mkr.pipe.map[0],
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

const makeDeLorean = () => {
  setMakes()
  return {
    // struct: [ 432, 1000, 300 ],
    position: [ 0, 0, -1000 ],
    rotation: [ 135, 0, -90 ],
    children: {
      flyAway: {
        children: {
          body: makeBody(),
          exterior: makeExterior(),
          interior: makeInterior(),
          underCarriage: makeUnderCarriage(),
        },
      },
      wheels: makeWheels(),
    },
  }
}

export { makeDeLorean }
