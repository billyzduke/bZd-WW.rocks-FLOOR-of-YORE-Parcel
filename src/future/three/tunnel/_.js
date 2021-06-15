import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

import assSupportShape from 'url:/src/future/three/tunnel/floatingLightSupportShapes.svg'
import assPipeMetal from 'url:/src/future/three/metalPipeVertical.png'
import assPipeMetalEmissive from 'url:/src/future/three/metalPipeVerticalEmissive.png'
import g from '/src/shared/_'
import * as threeMake from '/src/future/three/make'

const makeFloaterLamp = () => {
  const loader = new SVGLoader()
  // sadly, geometries based on loaded SVG paths can't be handled by makeThreeObj, as the loading of the SVGs is slightly deferred
  // still quicker to work around that than continuing to calculate the points of the base curves in 3d space manually
  loader.load(
    assSupportShape,
    pathsData => {
      const { paths } = pathsData
      const supportShape = SVGLoader.createShapes( paths[0] )

      const lineSegments = [
        [ [ 0, 0, 0 ], [ 0, -42, 0 ] ],
        [ [ 0, -42, 0 ], [ 64, -106, 36 ] ],
        [ [ 64, -106, 36 ], [ 64, -318, 36 ] ],
        [ [ 64, -318, 36 ], [ -52, -388, 36 ] ],
      ]
      const extrudePath = new THREE.CurvePath()
      lineSegments.forEach( lc3 => {
        const extrudePts = threeMake.createVector3s( lc3 )
        extrudePath.curves.push( new THREE.LineCurve3( extrudePts[0], extrudePts[1] ) )
      } )
      const supportGeo1 = new THREE.ExtrudeGeometry( supportShape, { extrudePath, steps: 100, depth: 360 } )
      const supportMap = threeMake.textureLoader( assPipeMetal )
      const supportEmissiveMap = threeMake.textureLoader( assPipeMetalEmissive )
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
      const supportMsh1 = new THREE.Mesh( supportGeo1, supportMat )
      supportMsh1.position.y = 120
      supportMsh1.rotation.x = THREE.Math.degToRad( 180 )
      const supportEndCapShape = SVGLoader.createShapes( paths[1] )
      const supportEndCapGeo = new THREE.LatheGeometry( supportEndCapShape[0].getPoints(), 8, 0, Math.PI )
      const supportMsh3 = new THREE.Mesh( supportEndCapGeo, supportMat )
      supportMsh3.position.set( 78.75, -403.5, -36 )
      supportMsh3.rotateX( THREE.Math.degToRad( 90 ) )
      supportMsh3.rotateY( THREE.Math.degToRad( -30 ) )
      supportMsh1.add( supportMsh3 )

      g.three.scene.add( supportMsh1 )
      const supportMsh2 = supportMsh1.clone()
      supportMsh2.position.x = 36
      supportMsh2.position.z = -26
      supportMsh2.rotation.y = THREE.Math.degToRad( 180 )
      g.three.scene.add( supportMsh2 )
    },
  )
}

export { makeFloaterLamp }
