import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

import assSupportShape from 'url:/src/future/three/tunnel/floatingLightSupportShape.svg'
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
        [ [ 64, -318, 36 ], [ -42, -388, 36 ] ],
        [ [ -42, -388, 36 ], [ -60, -388, 36 ] ],
      ]
      const extrudePath = new THREE.CurvePath()
      lineSegments.forEach( lc3 => {
        const extrudePts = threeMake.createVector3s( lc3 )
        extrudePath.curves.push( new THREE.LineCurve3( extrudePts[0], extrudePts[1] ) )
      } )

      // const extrudeCrv1 = [
      //   [ 0, 0, 0 ],
      //   [ 0, -30, 0 ],
      //   [ 0, -42, 0 ],
      //   [ 64, -106, 36 ],
      //   [ 64, -112, 36 ],
      //   [ 64, -318, 36 ],
      //   // [ 64, -324, 36 ],
      // ]

      // const extrudeCrv2 = [
      //   [ 0, -12, 0 ],
      //   [ 0, -30, 0 ],
      //   [ 0, -42, 0 ],
      //   [ -64, -130, 36 ],
      //   [ -70, -132, 36 ],
      //   [ -82, -132, 36 ],
      // ]

      // const extrudePts1 = threeMake.createVector3s( extrudeCrv1 )
      // let extrudePath = new THREE.CatmullRomCurve3( extrudePts1 )
      const supportGeo1 = new THREE.ExtrudeGeometry( supportShape, { extrudePath, steps: 100, depth: 360 } )
      // const extrudePts2 = threeMake.createVector3s( extrudeCrv2 )
      // extrudePath = new THREE.CatmullRomCurve3( extrudePts2 )
      // const supportGeo2 = new THREE.ExtrudeGeometry( supportShape, { extrudePath, steps: 200, depth: 164 } )
      const supportMat = new THREE.MeshStandardMaterial( {
        color: 0x999999,
        side: THREE.DoubleSide,
        emissive: new THREE.Color( 0x999999 ),
      } )
      const supportMsh1 = new THREE.Mesh( supportGeo1, supportMat )
      supportMsh1.position.y = 120
      supportMsh1.rotation.x = THREE.Math.degToRad( 180 )
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
