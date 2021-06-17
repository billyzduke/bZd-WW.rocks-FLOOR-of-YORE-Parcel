import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

import assSeatCtrTexture from 'url:/src/future/bttf-tunnel/delorean/interior/seatCtr.png'
import assSeatCtrEmMap from 'url:/src/future/bttf-tunnel/delorean/interior/seatCtrEmMap.png'
import assSeatShapePaths from 'url:/src/future/bttf-tunnel/delorean/interior/seatShapes.svg'
import assIntRoof from 'url:/src/future/bttf-tunnel/delorean/interior/interiorRoof.png'
import assIntRearPanel1 from 'url:/src/future/bttf-tunnel/delorean/interior/interiorRearPanel1.png'
import assIntRearPanel2 from 'url:/src/future/bttf-tunnel/delorean/interior/interiorRearPanel2.png'
import assIntRearPanel3 from 'url:/src/future/bttf-tunnel/delorean/interior/interiorRearPanel3.png'
import assIntDoorLower from 'url:/src/future/bttf-tunnel/delorean/interior/interiorDoorLower.png'
import assIntDoorMiddle from 'url:/src/future/bttf-tunnel/delorean/interior/interiorDoorMiddle.png'
import assIntDoorUpper from 'url:/src/future/bttf-tunnel/delorean/interior/interiorDoorUpper.png'
import assFluxCC from 'url:/src/future/flux/flux-capacitor-fluxed-cc.png'
import g from '/src/shared/_'
import * as threeMake from '/src/shared/three/make'

const makeSeats = () => {
  const loader = new SVGLoader()
  // sadly, geometries based on loaded SVG paths can't be handled by makeThreeObj, as the loading of the SVGs is slightly deferred
  // still quicker to work around that than continuing to calculate the points of the base curves in 3d space manually
  loader.load(
    assSeatShapePaths,
    pathsData => {
      const { paths } = pathsData
      const seatCtrShape = SVGLoader.createShapes( paths[0] )
      const seatCtrGeo = new THREE.ExtrudeGeometry( seatCtrShape[0], { depth: 46, bevelThickness: 14, bevelOffset: -7 } )
      seatCtrGeo.translate( 0, 0, -23 )
      const seatMat = new THREE.MeshLambertMaterial( {
        // metalness: 0,
        // roughness: 0.4,
        // dithering: true,
        side: THREE.DoubleSide,
        color: new THREE.Color( 0x88837d ),
        emissive: new THREE.Color( 0x88837d ),
        emissiveIntensity: 0.125,
      } )
      const seatCtrMat = seatMat.clone()
      seatCtrMat.map = threeMake.textureLoader( assSeatCtrTexture )
      seatCtrMat.emissiveMap = threeMake.textureLoader( assSeatCtrEmMap )
      seatCtrMat.map.wrapS = seatCtrMat.map.wrapT = seatCtrMat.emissiveMap.wrapS = seatCtrMat.emissiveMap.wrapT = THREE.RepeatWrapping
      seatCtrMat.map.repeat.set( 0.005, 0.0175 )
      seatCtrMat.emissiveMap.repeat.set( 0.005, 0.0175 )
      seatCtrMat.emissiveIntensity = 0.38
      seatCtrMat.map.offset.y = seatCtrMat.emissiveMap.offset.y = 0.125
      seatCtrMat.map.rotation = seatCtrMat.emissiveMap.rotation = THREE.Math.degToRad( 180 )
      const seatCtrMsh = new THREE.Mesh( seatCtrGeo, [ seatMat, seatCtrMat ] )
      g.bttf.inScene.seats = [ seatCtrMsh, seatCtrMsh.clone() ]
      const seatBackFlankShape = SVGLoader.createShapes( paths[1] )
      const seatBackFlankGeo = new THREE.LatheGeometry( seatBackFlankShape[0].getPoints() )
      const seatBackFlankMsh = new THREE.Mesh( seatBackFlankGeo, seatMat )
      const seatBaseFlankShape = SVGLoader.createShapes( paths[2] )
      const seatBaseFlankGeo = new THREE.LatheGeometry( seatBaseFlankShape[0].getPoints() )
      const seatBaseFlankMsh = new THREE.Mesh( seatBaseFlankGeo, seatMat )
      const seatBaseFrontShape = SVGLoader.createShapes( paths[3] )
      const seatBaseFrontGeo = new THREE.LatheGeometry( seatBaseFrontShape[0].getPoints() )
      const seatBaseFrontMsh = new THREE.Mesh( seatBaseFrontGeo, seatMat )
      const seatBaseFronts = [ seatBaseFrontMsh, seatBaseFrontMsh.clone() ]
      g.bttf.inScene.seats.forEach( ( _, side ) => {
        g.bttf.inScene.seats[side].position.set( side ? -100 : 100, -176, -188 )
        g.bttf.inScene.seats[side].rotateY( THREE.Math.degToRad( 90 ) )
        g.bttf.inScene.seats[side].rotateZ( THREE.Math.degToRad( 90 ) )
        g.bttf.inScene.seats[side].name = side ? 'passengerSeat' : 'driversSeat'
        g.bttf.inScene.interior.add( g.bttf.inScene.seats[side] )
        const seatBackFlanks = [ seatBackFlankMsh.clone(), seatBackFlankMsh.clone() ]
        seatBackFlanks.forEach( ( bkf, s ) => {
          bkf.position.x = 8
          bkf.position.y = 3
          bkf.position.z = s ? 46 : -46
          bkf.rotateZ( THREE.Math.degToRad( -23 ) )
          g.bttf.inScene.seats[side].add( bkf )
        } )
        const seatBaseFlanks = [ seatBaseFlankMsh.clone(), seatBaseFlankMsh.clone() ]
        seatBaseFlanks.forEach( ( bbf, s ) => {
          bbf.position.x = 22
          bbf.position.y = 142
          bbf.position.z = s ? 46 : -46
          bbf.rotateZ( THREE.Math.degToRad( -90 ) )
          g.bttf.inScene.seats[side].add( bbf )
        } )
        const seatBaseFront = seatBaseFronts.shift()
        seatBaseFront.position.x = 178
        seatBaseFront.position.y = 142
        seatBaseFront.position.z = -103
        seatBaseFront.rotateX( THREE.Math.degToRad( 90 ) )
        g.bttf.inScene.seats[side].add( seatBaseFront )
      } )
    },
  )
}

const makeCompass = () => ( {
  geo: 'sphere',
  // eslint-disable-next-line array-bracket-newline, array-element-newline
  struct: [ 5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2 ],
  rotation: { x: -90 },
} )

const makeDashboard = () => ( {
  struct: [ 373, 101, 69 ],
  position: [ 0, 148, -147 ],
  children: {
    compass: makeCompass(),
  },
} )

const makeInterior = () => {
  makeSeats()
  return {
    struct: [ 432, 1000, 300 ],
    children: {
      dashBoard: makeDashboard(),
      interiorDoorLowerL: {
        txtAss: assIntDoorLower,
        struct: [ 103, 422 ],
        pivot: [ 51.5 ],
        position: [ 214, 3.5 ],
        rotation: [ 0, 90 ],
      },
      interiorDoorLowerR: {
        txtAss: assIntDoorLower,
        struct: [ 103, 422 ],
        pivot: [ 51.5 ],
        position: [ -214, 3.5 ],
        rotation: [ 0, 90 ],
      },
      interiorDoorMiddleL: {
        txtAss: assIntDoorMiddle,
        struct: [ 61, 422 ],
        pivot: [ 30.5 ],
        position: [ 214, 3.5, -103 ],
        rotation: [ 0, 120.5 ],
      },
      interiorDoorMiddleR: {
        txtAss: assIntDoorMiddle,
        struct: [ 61, 422 ],
        pivot: [ 30.5 ],
        position: [ -214, 3.5, -103 ],
        rotation: [ 0, 60 ],
      },
      interiorDoorUpperL: {
        txtAss: assIntDoorUpper,
        struct: [ 100, 359 ],
        pivot: [ 50 ],
        position: [ 184, -27.5, -155 ],
        rotation: [ 0, 132.5 ],
      },
      interiorDoorUpperR: {
        txtAss: assIntDoorUpper,
        struct: [ 100, 359 ],
        pivot: [ 50 ],
        position: [ -184, -27.5, -155 ],
        rotation: [ 0, 47.5 ],
      },
      interiorRoof: {
        txtAss: assIntRoof,
        struct: [ 251.5, 195 ],
        position: [ 0, -98.5, -218.5 ],
      },
      rearPanels: {
        children: {
          rearPanel1: {
            txtAss: assIntRearPanel1,
            struct: [ 430, 218.5 ],
            pivot: [ 0, 109.25 ],
            position: [ 0, -205.5 ],
            rotation: { x: -90 },
          },
          rearPanel2: {
            txtAss: assIntRearPanel2,
            struct: [ 82, 218.5 ],
            pivot: [ 41, 109.25 ],
            position: [ -115, -186.5 ],
            rotation: { x: -90, y: 15 },
          },
          rearPanel3: {
            txtAss: assIntRearPanel3,
            struct: [ 100, 218.5 ],
            pivot: [ 50, 109.25 ],
            position: [ -215, -186.5 ],
            rotation: { x: -90 },
          },
        },
      },
      fluxCapacitor: {
        txtAss: assFluxCC,
        struct: [ 77, 111 ],
        position: [ 0, -186.5, -148 ],
        rotation: { x: -90 },
      },
    },
  }
}

export { makeInterior }
