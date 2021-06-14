import * as THREE from 'three'

import assExtBackBarFace from 'url:/src/future/three/delorean/exterior/backBarFace.png'
import assRearVentTop from 'url:/src/future/three/delorean/exterior/rearVentTop.png'
import assRearVentSide from 'url:/src/future/three/delorean/exterior/rearVentside.png'
import assRearVentLeftBackTop from 'url:/src/future/three/delorean/exterior/rearVentLeftBackTop.png'
import assRearVentLeftBackBottom from 'url:/src/future/three/delorean/exterior/rearVentLeftBackBottom.png'
import assRearVentRightBackTop from 'url:/src/future/three/delorean/exterior/rearVentRightBackTop.png'
import assRearVentRightBackBottom from 'url:/src/future/three/delorean/exterior/rearVentRightBackBottom.png'
import assFusionBaseGraySide from 'url:/src/future/three/delorean/exterior/fusionBaseSideCyl.png'
import assFusionBaseGrayTop from 'url:/src/future/three/delorean/exterior/fusionBaseTop.png'
import assFusionBaseBlackSide from 'url:/src/future/three/delorean/exterior/fusionBaseBlackSide.png'
import assFusionBaseWhiteSide from 'url:/src/future/three/delorean/exterior/fusionBaseWhiteCyl.png'
import assFusionFaceWide from 'url:/src/future/three/delorean/exterior/fusionFaceWide.png'
import assFusionFaceFront from 'url:/src/future/three/delorean/exterior/fusionFaceFront.png'
import assFusionFaceBack from 'url:/src/future/three/delorean/exterior/fusionFaceBack.png'
import assFusionFaceFrontCorner from 'url:/src/future/three/delorean/exterior/fusionAngleFront.png'
import assFusionFaceBackCorner from 'url:/src/future/three/delorean/exterior/fusionAngleBack.png'
import assFusionTop from 'url:/src/future/three/delorean/exterior/fusionTop.png'
import assFusionCrossSection from 'url:/src/future/three/delorean/exterior/fusionCrossSection.png'
import assFusionLockFace from 'url:/src/future/three/delorean/exterior/fusionLock.png'
import assPipeMetal03 from 'url:/src/future/three/delorean/exterior/metalPipe2.png'
import assPanelScreen from 'url:/src/future/three/delorean/exterior/panelScreen.png'
import g from '/src/shared/_'
import * as threeMake from '/src/future/three/make'
import * as threeMesh from '/src/future/three/mesh'
import * as threeX from '/src/future/three/x'

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
      map: threeMake.textureLoader( assExtBackBarFace ),
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
    position: [ 0, -284, -202 ],
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
      [`theBox${side}`]: makePolyObj,
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
      const crvPts = threeMake.createVector3s( lb.crv )
      const panelCrv = new THREE.CatmullRomCurve3( crvPts )
      const panelMap = threeMake.textureLoader( assPanelScreen )
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
      if ( lbp % 2 ) threeMesh.mirrorMesh( panelMsh )
      Object.keys( g.three.mkr.lb.panel[where].scl ).forEach( axis => {
        threeMesh.scaleMesh( panelMsh, g.three.mkr.lb.panel[where].scl[axis], axis )
      } )
      children[`lightBarPanel${where}${lbp % 2 ? 'R' : 'L'}`] = {
        msh: panelMsh,
        position: lb.pos,
      }
      const glowGeom = new THREE.ExtrudeGeometry( g.three.mkr.lb.glowProfile, { extrudePath: panelCrv, steps: 64, depth: 400 } )
      const glowMesh = threeX.GeometricGlowMesh( glowGeom, panelMat.alphaMap, [ 2, 4, 0 ] )
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
      const crvPts = threeMake.createVector3s( lb.crv )
      const tubeCrv = new THREE.CatmullRomCurve3( crvPts )
      const tubeMap = threeMake.textureLoader( assPipeMetal03 )
      const tubeGeo = new THREE.TubeGeometry( tubeCrv, 120, 2.5, 32, false )
      const tubeMat = new THREE.MeshStandardMaterial( {
        color: 0xcccccc,
        side: THREE.DoubleSide,
        emissiveMap: tubeMap,
        emissive: new THREE.Color( 0xffffff ),
      } )
      const tubeMsh = new THREE.Mesh( tubeGeo, tubeMat )
      if ( lbr % 2 ) threeMesh.mirrorMesh( tubeMsh )
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

export { makeExterior }
