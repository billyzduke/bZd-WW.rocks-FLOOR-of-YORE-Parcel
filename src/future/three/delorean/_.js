import * as THREE from 'three'
import { gsap } from 'gsap'

import assPipeMetal01 from 'url:/src/future/three/delorean/metalPipe.png'
import assPipeMetal02 from 'url:/src/future/three/delorean/metalSphere.png'
import assHeadLightCone from 'url:/src/future/three/delorean/headLightCone.png'
import g from '/src/shared/_'
import { setAddOn } from '/src/shared/utils'
import * as threeAnim from '/src/future/three/anim'
import * as threeMake from '/src/future/three/make'
import * as threeRend from '/src/future/three/rend'
import { makeBody } from './body/_'
import { makeExterior } from './exterior/_'
import { makeInterior } from './interior/_'
import { makeUnderCarriage } from './undercarriage/_'
import { makeWheels } from './wheels/_'

const setMakes = () => {
  g.three.mkr.pipe = {
    map: [ { emissiveMap: threeMake.textureLoader( assPipeMetal01 ), emissive: new THREE.Color( 0x999999 ) }, { emissiveMap: threeMake.textureLoader( assPipeMetal02 ), emissive: new THREE.Color( 0x666666 ) }, { emissiveMap: threeMake.textureLoader( assPipeMetal01 ), emissive: new THREE.Color( 0xffffff ) } ],
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

  g.three.inScene = {
    carGyro: [ 'carGyro' ],
    deLorean: [ 'deLorean' ],
    fluxCapacitor: [ 'fluxCapacitor' ],
    flyAway: [ 'flyAway' ],
    headLights: [ 'lightBoxL', 'lightBoxR' ],
    hubCaps: [],
    interior: [ 'interior' ],
    wheelMechs: [ 'mobileMechL', 'mobileMechR' ],
    wheelRockets: [],
    wheelSides: [ 'wheelsL', 'wheelsR' ],
  }

  g.three.mkr.setMades = () => {
    g.three.inScene.wheelRockets.forEach( ( flareSet, i ) => {
      const flareGrp = g.three.scene.getObjectByName( flareSet, true )
      flareGrp.children.forEach( ( flare, flr ) => {
        if ( flr < flareGrp.children.length - 1 ) g.three.ani.flr.push( threeAnim.setRocketFlareAnimator( flare, flr ) ) // texture, #horiz, #vert, #total, duration
      } )
      g.three.inScene.wheelRockets[i] = flareGrp
    } )
    g.three.mkr.tlt = {}
    g.three.xyz.forEach( axis => {
      g.three.mkr.tlt[axis] = 0
    } )

    g.three.inScene.headLights.forEach( ( headLight, i ) => {
      const lightBox = g.three.scene.getObjectByName( headLight, true )

      const pointLight = new THREE.PointLight( 0x8ebcf0, 16, 256 )
      pointLight.castShadow = true // default false
      pointLight.position.y = 20.42
      pointLight.position.z = 23
      lightBox.add( pointLight )
      // g.three.scene.add( new THREE.PointLightHelper( pointLight, 10 ) )

      const spotLight = new THREE.SpotLight( 0xb3e7fb, 1.5, 0, THREE.Math.degToRad( 16 ), 0.25 )
      spotLight.castShadow = true // default false
      spotLight.position.y = 21
      spotLight.position.z = 12
      lightBox.add( spotLight )
      // g.three.scene.add( new THREE.SpotLightHelper( spotLight ) )

      const spotLightConeLength = 2500
      const spotLightCone = new THREE.Mesh(
        new THREE.CylinderGeometry( 700, 10, spotLightConeLength, 20, 1, 1, true ),
        new THREE.MeshBasicMaterial( {
          // color: new THREE.Color( 0xffff99 ),
          transparent: true,
          opacity: 0.23,
          map: threeMake.textureLoader( assHeadLightCone ),
          depthWrite: false,
        } ),
      )
      spotLightCone.geometry.translate( 0, spotLightConeLength / 2, 0 )
      spotLightCone.position.y = 21
      spotLightCone.position.z = 19
      if ( !g.three.obj.spotLightConeMats ) g.three.obj.spotLightConeMats = []
      g.three.obj.spotLightConeMats.push( spotLightCone.material )
      lightBox.add( spotLightCone )
      spotLightCone.rotateX( THREE.Math.degToRad( -120.5 ) )
      spotLightCone.rotateZ( THREE.Math.degToRad( i % 2 ? -8 : 8 ) )

      const spotLightTarget = new THREE.Mesh( new THREE.TetrahedronGeometry(), new THREE.MeshBasicMaterial( { opacity: 0, depthWrite: false, transparent: true } ) )
      spotLightTarget.position.y = spotLightConeLength / 4
      spotLightCone.add( spotLightTarget )
      spotLight.target = spotLightTarget

      g.three.inScene.headLights[i] = lightBox
    } )

    console.log( g.three.inScene )
    Object.keys( g.three.inScene ).forEach( itemType => {
      if ( Array.isArray( g.three.inScene[itemType] ) ) {
        g.three.inScene[itemType].forEach( ( item, i ) => {
          if ( typeof item === 'string' ) {
            const itemInScene = g.three.scene.getObjectByName( item, true )
            if ( g.three.inScene[itemType].length === 1 ) g.three.inScene[itemType] = itemInScene
            else g.three.inScene[itemType][i] = itemInScene
          }
        } )
      }
    } )

    g.three.ani.flx = threeAnim.setFluxCapacitorAnimator( g.three.inScene.fluxCapacitor )
  }
}

const makeDeLorean = () => {
  setMakes()
  return {
    // struct: [ 432, 1000, 300 ],
    position: [ 0, -210, 15 ],
    children: {
      carGyro: {
        rotation: { x: 90 },
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
      },
    },
  }
}

const prepDeLorean = () => {
  if ( !g.three.mkr.prepped ) {
    g.three.mkr.prepped = true
    g.el.glitches.style.opacity = 1
    g.three.on = true
    g.el.deLorean.style.left = 0
    setTimeout( () => {
      threeRend.startRendering( { startYourEngines: true } )
    }, 100 )
  }
}

const startDeLorean = ( { force = false } = {} ) => {
  if ( !g.three.on || force ) {
    g.el.deLorean.style.opacity = 1
    g.el.deLorean.style.pointerEvents = 'auto'
  } else {
    console.log( { alreadyOn: g.three.on } )
  }
}

const toggleFlightMode = () => {
  if ( g.three ) g.three.flm = !g.three.flm
}

const toggleFlyAlongPath = () => {
  if ( g.three.on ) {
    g.three.mov = true
  }
}

const toggleWheelsDrop = () => {
  if ( g.three ) g.three.lve = !g.three.lve
}

const movable = [ '#deLorean', '#sideViewMirrorRight div:nth-child(2)' ]

const moveModel = ( movement, axis, el, value ) => {
  const p = `${movement}${axis}`
  const m = movement === 'rotate' ? 'rotation' : 'translation'
  const d = `#${m}${axis}${el}`
  gsap.to( movable[el], {
    duration: 0.25,
    onComplete: function () {
      gsap.set( d, {
        text: value,
      } )
    },
    overwrite: 'auto',
    [p]: value,
  } )
}

const setModel = () => {
  setAddOn( '#rotateX0', 'change', e => { moveModel( 'rotate', 'X', 0, e.target.value ) } )
  setAddOn( '#rotateY0', 'change', e => { moveModel( 'rotate', 'Y', 0, e.target.value ) } )
  setAddOn( '#rotateZ0', 'change', e => { moveModel( 'rotate', 'Z', 0, e.target.value ) } )
  setAddOn( '#translateX0', 'change', e => { moveModel( 'translate', 'X', 0, e.target.value ) } )
  setAddOn( '#translateY0', 'change', e => { moveModel( 'translate', 'Y', 0, e.target.value ) } )
  setAddOn( '#translateZ0', 'change', e => { moveModel( 'translate', 'Z', 0, e.target.value ) } )
  setAddOn( '#rotateX1', 'change', e => { moveModel( 'rotate', 'X', 1, e.target.value ) } )
  setAddOn( '#rotateY1', 'change', e => { moveModel( 'rotate', 'Y', 1, e.target.value ) } )
  setAddOn( '#rotateZ1', 'change', e => { moveModel( 'rotate', 'Z', 1, e.target.value ) } )
  setAddOn( '#translateX1', 'change', e => { moveModel( 'translate', 'X', 1, e.target.value ) } )
  setAddOn( '#translateY1', 'change', e => { moveModel( 'translate', 'Y', 1, e.target.value ) } )
  setAddOn( '#translateZ1', 'change', e => { moveModel( 'translate', 'Z', 1, e.target.value ) } )
}

export {
  makeDeLorean, prepDeLorean, setModel, startDeLorean, toggleFlightMode, toggleFlyAlongPath, toggleWheelsDrop,
}
