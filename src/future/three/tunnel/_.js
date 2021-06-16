import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

import assFloatingLightShapes from 'url:/src/future/three/tunnel/floatingLightShapes.svg'
import assRoughMetal from 'url:/src/future/three/metalRough.jpg'
import assRoughMetalEmissive from 'url:/src/future/three/metalRoughEmissive.jpg'
import assPipeMetal from 'url:/src/future/three/metalPipeHorizontal.png'
import assPipeMetalEmissive from 'url:/src/future/three/metalPipeHorizontalEmissive.png'
import g from '/src/shared/_'
import { padStr } from '/src/shared/utils'
import * as threeMake from '/src/future/three/make'
import * as threeX from '/src/future/three/x'

const makeFloaterLamp = () => {
  const loader = new SVGLoader()
  // sadly, geometries based on loaded SVG paths can't be handled by makeThreeObj, as the loading of the SVGs is slightly deferred
  // still quicker to work around that than continuing to calculate the points of the base curves in 3d space manually
  loader.load(
    assFloatingLightShapes,
    pathsData => {
      const { paths } = pathsData
      const supportShape = SVGLoader.createShapes( paths[0] )

      const floaterLamp = new THREE.Group()
      if ( !g.three.inScene.floaters.children ) g.three.inScene.floaters.children = []
      floaterLamp.name = `floaterLamp${padStr( g.three.inScene.floaters.children.length )}`

      const lineSegments = [
        [ [ 0, 0, 0 ], [ 0, -42, 0 ] ],
        [ [ 0, -42, 0 ], [ 64, -106, 48 ] ],
        [ [ 64, -106, 48 ], [ 64, -318, 48 ] ],
        [ [ 64, -318, 48 ], [ -52, -388, 48 ] ],
      ]
      const extrudePath = new THREE.CurvePath()
      lineSegments.forEach( lc3 => {
        const extrudePts = threeMake.createVector3s( lc3 )
        extrudePath.curves.push( new THREE.LineCurve3( extrudePts[0], extrudePts[1] ) )
      } )
      const supportGeo = new THREE.ExtrudeGeometry( supportShape, { extrudePath, steps: 300, depth: 360 } )
      const supportMap = threeMake.textureLoader( assRoughMetal )
      const supportEmissiveMap = threeMake.textureLoader( assRoughMetalEmissive )
      const supportMat = new THREE.MeshPhysicalMaterial( {
        metalness: 1,
        roughness: 0.4,
        color: 0x4f191f,
        side: THREE.DoubleSide,
        emissive: new THREE.Color( 0x4f191f ),
        emissiveMap: supportEmissiveMap,
        map: supportMap,
      } )
      supportMat.map.wrapS = supportMat.map.wrapT = supportMat.emissiveMap.wrapS = supportMat.emissiveMap.wrapT = THREE.RepeatWrapping
      supportMat.map.repeat.set( 0.025, 0.1 )
      supportMat.emissiveMap.repeat.set( 0.025, 0.1 )
      const supportMsh = new THREE.Mesh( supportGeo, supportMat )
      supportMsh.rotation.x = THREE.Math.degToRad( 180 )
      const supportEndCapShape = SVGLoader.createShapes( paths[1] )
      const supportEndCapGeo = new THREE.LatheGeometry( supportEndCapShape[0].getPoints(), 8, 0, Math.PI )
      const supportEndCapMsh = new THREE.Mesh( supportEndCapGeo, supportMat )
      supportEndCapMsh.position.set( -42.5, -403.25, 74 )
      supportEndCapMsh.rotateX( THREE.Math.degToRad( -90 ) )
      supportEndCapMsh.rotateY( THREE.Math.degToRad( 149.5 ) )
      supportEndCapMsh.castShadow = supportEndCapMsh.receiveShadow = supportMsh.castShadow = supportMsh.receiveShadow = true
      supportMsh.add( supportEndCapMsh )
      const lightBarGuardGeo = new THREE.CylinderGeometry( 12, 12, 100, 10, 1, true, 0, Math.PI )
      const lightBarGuardMap = threeMake.textureLoader( assPipeMetal )
      const lightBarGuardEmissiveMap = threeMake.textureLoader( assPipeMetalEmissive )
      const lightBarGuardMat = new THREE.MeshPhysicalMaterial( {
        metalness: 1,
        roughness: 0.25,
        color: 0x999999,
        side: THREE.DoubleSide,
        emissive: new THREE.Color( 0x999999 ),
        emissiveMap: lightBarGuardEmissiveMap,
        emissiveIntensity: 0.75,
        map: lightBarGuardMap,
      } )
      lightBarGuardMat.map.wrapS = lightBarGuardMat.map.wrapT = lightBarGuardMat.emissiveMap.wrapS = lightBarGuardMat.emissiveMap.wrapT = THREE.RepeatWrapping
      lightBarGuardMat.map.repeat.set( 0.025, 0.1 )
      lightBarGuardMat.emissiveMap.repeat.set( 0.025, 0.1 )
      const lightBarGuardMsh = new THREE.Mesh( lightBarGuardGeo, lightBarGuardMat )
      lightBarGuardMsh.position.set( -42.5, -403.25, 94 )
      lightBarGuardMsh.rotateX( THREE.Math.degToRad( 90 ) )
      const lightBarGuardEndCapGeo = new THREE.SphereGeometry( 12, 10, 10, 0, Math.PI, 0, Math.PI / 2 )
      const lightBarGuardEndCapMsh = new THREE.Mesh( lightBarGuardEndCapGeo, lightBarGuardMat )
      lightBarGuardEndCapMsh.material.map.rotation = THREE.Math.degToRad( 90 )
      lightBarGuardEndCapMsh.rotateY( THREE.Math.degToRad( 90 ) )
      lightBarGuardEndCapMsh.position.y = 50
      lightBarGuardMsh.add( lightBarGuardEndCapMsh )

      const lightBarShape = SVGLoader.createShapes( paths[2] )
      const glowGeom = new THREE.LatheGeometry( lightBarShape[0].getPoints(), 16 )
      const glowMate = new THREE.MeshPhysicalMaterial( {
        color: 0xb8fce5,
        emissive: new THREE.Color( 0xb8fce5 ),
        emissiveIntensity: 0.9,
      } )
      const glowMesh = new THREE.Mesh( glowGeom, glowMate )
      glowMesh.position.y = -46
      lightBarGuardMsh.add( glowMesh )
      // no idea why this doesn't work in this case
      // const glowMesh = threeX.GeometricGlowMesh( false, glowGeom, [ 0, 0, 0 ], 0xb8fce5 )
      // glowMesh.object3d.position.y = -40
      // lightBarGuardMsh.add( glowMesh.object3d )
      supportMsh.add( lightBarGuardMsh )

      floaterLamp.add( supportMsh )
      const supportMshMirrored = supportMsh.clone()
      supportMshMirrored.position.x = 36
      supportMshMirrored.position.z = -42
      supportMshMirrored.rotation.y = THREE.Math.degToRad( 180 )
      floaterLamp.add( supportMshMirrored )

      const supportBaseDiamondShape = SVGLoader.createShapes( paths[3] )
      const supportBaseDiamondGeo = new THREE.ExtrudeGeometry( supportBaseDiamondShape, {
        steps: 1, depth: 36, bevelThickness: 8, bevelOffset: -6,
      } )
      const supportBase = new THREE.Mesh( supportBaseDiamondGeo, supportMat.clone() )
      supportBase.material.emissive = supportBase.material.color = new THREE.Color( 0x99999 )
      supportBase.material.map.repeat.set( 0.01, 0.01 )
      supportBase.material.emissiveMap.repeat.set( 0.01, 0.01 )
      supportBase.rotateX( THREE.Math.degToRad( 90 ) )
      supportBase.rotateZ( THREE.Math.degToRad( -90 ) )
      supportBase.position.y = 32
      supportBase.position.x = -54

      const supportBaseCylinderGeo = new THREE.CylinderGeometry( 32, 72, 12, 16, 1, true )
      const supportBaseCylinder = new THREE.Mesh( supportBaseCylinderGeo, supportBase.material )
      supportBaseCylinder.rotateX( THREE.Math.degToRad( -90 ) )

      supportBase.add( supportBaseCylinder )

      floaterLamp.add( supportBase )

      floaterLamp.position.y = 120
      g.three.inScene.floaters.add( floaterLamp )
    },
  )
}

const makeFloaters = () => {
  g.three.grp.floaters = new THREE.Group()
  g.three.grp.floaters.name = 'floaters'
  g.three.scene.add( g.three.grp.floaters )
  g.three.inScene.floaters = g.three.grp.floaters
  makeFloaterLamp()
}

export { makeFloaterLamp, makeFloaters }
