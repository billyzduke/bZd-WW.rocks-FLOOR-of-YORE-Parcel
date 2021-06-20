import * as THREE from 'three'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

import g from '/src/shared/_'
import { cleanUp, isFunction, randoNum } from '/src/shared/utils'
import * as threeMesh from '/src/shared/three/mesh'
import * as threeMake from '/src/shared/three/make'

gsap.registerPlugin( Draggable, InertiaPlugin )

const allowDragging = () => {
  Draggable.create( g.el.draggable, {
    bounds: g.el.bttfTunnel,
    inertia: true,
    onDragStart: function () {
      g.bttf.drg = true
    },
  } )
}

const backItUp = () => {
  g.bttf.mov = false
  g.bttf.camReset = true
  g.bttf.bin = cleanUp( g.bttf.bin )
  g.tL.dL.to( g.bttf.inScene.deLorean.position, {
    duration: 9,
    ease: 'power2.in',
    z: `-=${g.bttf.pilotingDepth}`,
  } )
    .to( g.bttf.inScene.deLorean.position, {
      duration: 4.2,
      ease: 'power2.inOut',
      y: '+=36',
    }, '<' )
    .to( g.bttf.inScene.deLorean.rotation, {
      duration: 11.5,
      ease: 'power2.inOut',
      y: threeMake.degToRad( -180 ),
    }, '<4.5' )
    .to( g.bttf.obj.windShieldGlass.msh.material, {
      duration: 5,
      opacity: 1,
    }, '<' )
  // .to( g.bttf.obj.spotLightConeMats, {
  //   duration: 5,
  //   opacity: 0.23,
  // }, '<' )
    .to( g.bttf.inScene.deLorean.rotation, {
      duration: 3.5,
      ease: 'power2.inOut',
      x: threeMake.degToRad( 30 ),
      repeat: 1,
      yoyo: true,
    }, '<2' )
    .to( g.bttf.inScene.deLorean.position, {
      duration: 5,
      ease: 'power2.inOut',
      x: '+=350',
      y: '+=164',
    }, '<' )
    .to( g.bttf.inScene.carGyro.rotation, {
      duration: 3.5,
      ease: 'power2.inOut',
      x: threeMake.degToRad( 75 ),
      y: -threeMake.degToRad( 15 ),
      z: threeMake.degToRad( 20 ),
      repeat: 1,
      yoyo: true,
    }, '>' )
    .to( g.bttf.inScene.deLorean.position, {
      duration: 4,
      ease: 'power2.out',
      onComplete: function () {
        allowDragging()
        g.tL.dL.to( g.bttf.inScene.carGyro.rotation, {
          duration: 5.5,
          ease: 'power1.inOut',
          x: `+=${threeMake.degToRad( 30 )}`,
          repeat: -1,
          yoyo: true,
        }, '>' )
          .to( g.bttf.inScene.carGyro.rotation, {
            duration: 4.5,
            ease: 'power1.inOut',
            y: `+=${threeMake.degToRad( 30 )}`,
            repeat: -1,
            yoyo: true,
          }, '<' )
          .to( g.bttf.inScene.carGyro.rotation, {
            duration: 7.5,
            ease: 'power1.inOut',
            z: `-=${threeMake.degToRad( 40 )}`,
            repeat: -1,
            yoyo: true,
          }, '<' )
      },
      x: 0,
      y: 0,
    }, '<' )
}

const matchMove = ( tgt, obj ) => {
  const dragBox = tgt.getBoundingClientRect()
  const container = g.el.future.getBoundingClientRect()
  const viewPort = threeMake.visibleSizeAtZDepth( obj.position.z )
  obj.position.x = viewPort.w * ( ( dragBox.x + ( dragBox.width / 2 ) - ( container.width / 2 ) ) / container.width )
  obj.position.y = -viewPort.h * ( ( dragBox.y + ( dragBox.height / 2 ) - ( container.height / 2 ) ) / container.height )
  tgt.innerHTML = `<p>container: {x: ${container.x}, y: ${container.y}, w: ${container.width}, h: ${container.height}}</p><p>dragBox: {cx: ${dragBox.x + ( dragBox.width / 2 )}, cy: ${dragBox.y + ( dragBox.height / 2 )}}</p><p>viewPort: {w: ${viewPort.w}, h: ${viewPort.h}}</p><p>dL center: {x: ${obj.position.x}, y: ${obj.position.y}}`
}

const setFluxCapacitorAnimator = flux => textureAnimator( flux, g.bttf.flx, 5, 1, 5, 76 )

const setRocketFlareAnimator = ( flare, flr ) => textureAnimator( flare, g.bttf.flr[flr], 5, 1, 5, 76 )

const textureAnimator = ( mesh, trkObj, hTiles, vTiles, totTiles, tileDisplayDuration ) => {
  // note: texture passed by reference, will be updated by the update function // we hope
  // how many images does this spritesheet contain?
  //  usually equals tilesHoriz * tilesVert, but not necessarily,
  //  if there at blank tiles at the bottom of the spritesheet.
  if ( !trkObj || typeof trkObj !== 'object' ) return false
  if ( typeof trkObj.cdt === 'undefined' ) trkObj.cdt = 0
  if ( typeof trkObj.ctl === 'undefined' ) trkObj.ctl = 0

  mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping
  mesh.material.map.repeat.set( 1 / hTiles, 1 / vTiles )

  return milliSec => {
    trkObj.cdt += milliSec
    while ( trkObj.cdt > tileDisplayDuration ) {
      trkObj.cdt -= tileDisplayDuration
      let nextTile = trkObj.ctl
      while ( nextTile === trkObj.ctl ) nextTile = randoNum( 0, totTiles - 1 )
      trkObj.ctl = nextTile
      const currentColumn = trkObj.ctl % hTiles
      mesh.material.map.offset.x = currentColumn / hTiles
      const currentRow = Math.floor( trkObj.ctl / hTiles )
      mesh.material.map.offset.y = currentRow / vTiles
    }
  }
}

const updateAnimationFrame = () => {
  // eslint-disable-next-line eqeqeq
  if ( g.bttf.on && g.el.bttfTunnel.style.opacity == 1 ) {
    const delta = g.bttf.clk.getDelta()

    if ( isFunction( g.bttf.ani.smk.swirlSmoke ) ) g.bttf.ani.smk.swirlSmoke( delta )

    if ( isFunction( g.bttf.ani.tnl.zoomTunnel ) ) g.bttf.ani.tnl.zoomTunnel( delta )

    // ROCKET FLARE TEXTURES SWAP
    if ( g.bttf.ani.flr.length ) {
      g.bttf.ani.flr.forEach( ani => {
        ani( 1000 * delta )
      } )
    }

    if ( isFunction( g.bttf.ani.flx ) ) g.bttf.ani.flx( 1000 * delta )

    g.bttf.xyz.forEach( axis => {
      g.el[`threeCam${axis.toUpperCase()}`].innerHTML = THREE.Math.radToDeg( g.bttf.camera.rotation[axis] ).toFixed( 3 )
    } )

    g.bttf.ani.glo.forEach( ( glo, i ) => {
      if ( glo.wax ) glo.msh.material[1].uniforms.power.value += 0.5
      else glo.msh.material[1].uniforms.power.value -= 0.5
      if ( glo.msh.material[1].uniforms.power.value < 0.4 || glo.msh.material[1].uniforms.power.value > 5 ) {
        g.bttf.ani.glo[i].wax = !glo.wax
      }
    } )

    if ( g.bttf.flm ) {
      // we don't ever need to reverse the wheels retraction. so suck me
    } else {
      g.bttf.inScene.wheelRockets.forEach( ( flareSet, i ) => {
        if ( flareSet.scale.x > 0.2 ) {
          threeMesh.scaleMesh( flareSet, 0.75 )
        } else {
          flareSet.scale.set( 0 )
          g.bttf.inScene.hubCaps[i].material.map.offset.x = 0.5
          if ( i < 2 ) {
            const side = i % 2
            const whereWheel = {
              mechsRadY: g.bttf.inScene.wheelMechs[side].rotation.y,
              mechsPosX: g.bttf.inScene.wheelMechs[side].position.x,
              mechsPosZ: g.bttf.inScene.wheelMechs[side].position.z,
              wheelsRadY: g.bttf.inScene.wheelSides[side].rotation.y,
              wheelsPosX: g.bttf.inScene.wheelSides[side].position.x,
              wheelsPosZ: g.bttf.inScene.wheelSides[side].position.z,
            }
            if ( side ) {
              // RIGHT SIDE
              if ( whereWheel.wheelsRadY > -g.bttf.mkr.wheels.rotTarget ) g.bttf.inScene.wheelSides[side].rotateY( -g.bttf.mkr.wheels.rotIncRad )
              if ( whereWheel.wheelsPosX < -g.bttf.mkr.wheels.posTarget.x ) g.bttf.inScene.wheelSides[side].position.x += 2
              if ( whereWheel.mechsPosX < -g.bttf.mkr.wheels.armTarget.x ) g.bttf.inScene.wheelMechs[side].position.x += 1.8571
              if ( whereWheel.mechsRadY > 0 ) g.bttf.inScene.wheelMechs[side].rotateY( -0.00698131 )
            } else {
              // LEFT SIDE
              if ( whereWheel.wheelsRadY < g.bttf.mkr.wheels.rotTarget ) g.bttf.inScene.wheelSides[side].rotateY( g.bttf.mkr.wheels.rotIncRad )
              if ( whereWheel.wheelsPosX > g.bttf.mkr.wheels.posTarget.x ) g.bttf.inScene.wheelSides[side].position.x -= 2
              if ( whereWheel.mechsPosX > g.bttf.mkr.wheels.armTarget.x ) g.bttf.inScene.wheelMechs[side].position.x -= 1.8571
              if ( whereWheel.mechsRadY < 0 ) g.bttf.inScene.wheelMechs[side].rotateY( 0.00698131 )
            }
            if ( whereWheel.wheelsPosZ > g.bttf.mkr.wheels.posTarget.z ) g.bttf.inScene.wheelSides[side].position.z -= 1.6
            if ( whereWheel.mechsPosZ > g.bttf.mkr.wheels.armTarget.z ) g.bttf.inScene.wheelMechs[side].position.z -= 0.9144
          }
        }
      } )
    }

    if ( g.bttf.lve ) g.bttf.inScene.flyAway.position.z -= 1

    if ( g.bttf.mov ) backItUp()
    // if ( g.bttf.mov ) g.bttf.mkr.moveAlongPath( g.bttf.grp.deLorean, 0 )

    if ( g.bttf.camReset ) {
      if ( g.bttf.camera.rotation.x > 0 ) g.bttf.camera.rotateX( -threeMake.degToRad( 0.065 ) )
      else g.bttf.camReset = false
    }

    if ( g.bttf.drg ) matchMove( g.el.draggable, g.bttf.grp.deLorean )

    // // TILT TEST
    // g.bttf.xyz.forEach(axis => {
    //   g.bttf.inScene.deLorean.rotation[axis] = g.bttf.mkr.tlt[axis] ? threeMake.degToRad(THREE.Math.radToDeg(g.bttf.inScene.deLorean.rotation[axis]) + 1) : threeMake.degToRad(THREE.Math.radToDeg(g.bttf.inScene.deLorean.rotation[axis]) - 1)
    //   if (g.bttf.inScene.deLorean.rotation[axis] > threeMake.degToRad(20) || g.bttf.inScene.deLorean.rotation[axis] < threeMake.degToRad(-20)) g.bttf.mkr.tlt[axis] = !g.bttf.mkr.tlt[axis]
    // })
  }
}

export {
  allowDragging, backItUp, matchMove, setFluxCapacitorAnimator, setRocketFlareAnimator, textureAnimator, updateAnimationFrame,
}
