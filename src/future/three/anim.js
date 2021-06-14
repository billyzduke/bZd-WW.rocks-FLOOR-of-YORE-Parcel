import * as THREE from 'three'
import { gsap, TimelineMax as TL } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

import g from '/src/shared/_'
import { cleanUp, isFunction, randOnum } from '/src/shared/utils'
import * as msh from './mesh'
import * as mkr from './make'

gsap.registerPlugin( Draggable, InertiaPlugin )

const allowDragging = () => {
  Draggable.create( g.el.draggable, {
    bounds: g.el.deLorean,
    inertia: true,
    onDragStart: function () {
      g.three.drg = true
    },
  } )
}

const backItUp = () => {
  g.three.mov = false
  g.three.camReset = true
  g.three.bin = cleanUp( g.three.bin )
  g.tL.dL = new TL( { defaults: { overwrite: 'auto' } } )
  g.tL.dL.to( g.three.inScene.deLorean.position, {
    duration: 9,
    ease: 'power2.in',
    z: '-=1200',
  } )
    .to( g.three.inScene.deLorean.position, {
      duration: 4.2,
      ease: 'power2.inOut',
      y: '+=36',
    }, '<' )
    .to( g.three.inScene.deLorean.rotation, {
      duration: 11.5,
      ease: 'power2.in',
      y: THREE.Math.degToRad( -180 ),
    }, '<4.5' )
    .to( g.three.obj.windShieldGlass.msh.material, {
      duration: 5,
      opacity: 1,
    }, '<' )
  // .to( g.three.obj.spotLightConeMats, {
  //   duration: 5,
  //   opacity: 0.23,
  // }, '<' )
    .to( g.three.inScene.deLorean.rotation, {
      duration: 3.5,
      ease: 'power2.in',
      x: THREE.Math.degToRad( 30 ),
      repeat: 1,
      yoyo: true,
    }, '<2' )
    .to( g.three.inScene.deLorean.position, {
      duration: 5,
      ease: 'power2.in',
      x: '+=350',
      y: '+=164',
    }, '<' )
    .to( g.three.inScene.carGyro.rotation, {
      duration: 3.5,
      ease: 'power2.in',
      x: THREE.Math.degToRad( 75 ),
      y: -THREE.Math.degToRad( 15 ),
      z: THREE.Math.degToRad( 20 ),
      repeat: 1,
      yoyo: true,
    }, '>' )
    .to( g.three.inScene.deLorean.position, {
      duration: 4,
      ease: 'power2.out',
      onComplete: function () {
        allowDragging()
        g.tL.dL.to( g.three.inScene.carGyro.rotation, {
          duration: 5.5,
          ease: 'power1.inOut',
          x: `+=${THREE.Math.degToRad( 30 )}`,
          repeat: -1,
          yoyo: true,
        }, '>' )
          .to( g.three.inScene.carGyro.rotation, {
            duration: 4.5,
            ease: 'power1.inOut',
            y: `+=${THREE.Math.degToRad( 30 )}`,
            repeat: -1,
            yoyo: true,
          }, '<' )
          .to( g.three.inScene.carGyro.rotation, {
            duration: 7.5,
            ease: 'power1.inOut',
            z: `-=${THREE.Math.degToRad( 40 )}`,
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
  const viewPort = mkr.visibleSizeAtZDepth( obj.position.z )
  obj.position.x = viewPort.w * ( ( dragBox.x + ( dragBox.width / 2 ) - ( container.width / 2 ) ) / container.width )
  obj.position.y = -viewPort.h * ( ( dragBox.y + ( dragBox.height / 2 ) - ( container.height / 2 ) ) / container.height )
  tgt.innerHTML = `<p>container: {x: ${container.x}, y: ${container.y}, w: ${container.width}, h: ${container.height}}</p><p>dragBox: {cx: ${dragBox.x + ( dragBox.width / 2 )}, cy: ${dragBox.y + ( dragBox.height / 2 )}}</p><p>viewPort: {w: ${viewPort.w}, h: ${viewPort.h}}</p><p>dL center: {x: ${obj.position.x}, y: ${obj.position.y}}`
}

const setFluxCapacitorAnimator = flux => textureAnimator( flux, g.three.flx, 5, 1, 5, 76 )

const setRocketFlareAnimator = ( flare, flr ) => textureAnimator( flare, g.three.flr[flr], 5, 1, 5, 76 )

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
      while ( nextTile === trkObj.ctl ) nextTile = randOnum( 0, totTiles - 1 )
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
  if ( g.three.on && g.el.deLorean.style.opacity == 1 ) {
    const delta = g.three.clk.getDelta()

    if ( isFunction( g.three.ani.smk.swirlSmoke ) ) g.three.ani.smk.swirlSmoke( delta )

    if ( isFunction( g.three.ani.tnl.zoomTunnel ) ) g.three.ani.tnl.zoomTunnel( delta )
    // ROCKET FLARE TEXTURES SWAP
    g.three.ani.flr.forEach( ani => {
      ani( 1000 * delta )
    } )

    g.three.ani.flx( 1000 * delta )

    g.three.xyz.forEach( axis => {
      g.el[`threeCam${axis.toUpperCase()}`].innerHTML = THREE.Math.radToDeg( g.three.camera.rotation[axis] ).toFixed( 3 )
    } )

    g.three.ani.glo.forEach( ( glo, i ) => {
      if ( glo.wax ) glo.msh.material[1].uniforms.power.value += 0.5
      else glo.msh.material[1].uniforms.power.value -= 0.5
      if ( glo.msh.material[1].uniforms.power.value < 0.4 || glo.msh.material[1].uniforms.power.value > 5 ) {
        g.three.ani.glo[i].wax = !glo.wax
      }
    } )

    if ( g.three.flm ) {
      // we don't ever need to reverse the wheels retraction. so suck me
    } else {
      g.three.inScene.wheelRockets.forEach( ( flareSet, i ) => {
        if ( flareSet.scale.x > 0.2 ) {
          msh.scaleMesh( flareSet, 0.75 )
        } else {
          flareSet.scale.set( 0 )
          g.three.inScene.hubCaps[i].material.map.offset.x = 0.5
          if ( i < 2 ) {
            const side = i % 2
            const whereWheel = {
              mechsRadY: g.three.inScene.wheelMechs[side].rotation.y,
              mechsPosX: g.three.inScene.wheelMechs[side].position.x,
              mechsPosZ: g.three.inScene.wheelMechs[side].position.z,
              wheelsRadY: g.three.inScene.wheelSides[side].rotation.y,
              wheelsPosX: g.three.inScene.wheelSides[side].position.x,
              wheelsPosZ: g.three.inScene.wheelSides[side].position.z,
            }
            if ( side ) {
              // RIGHT SIDE
              if ( whereWheel.wheelsRadY > -g.three.mkr.wheels.rotTarget ) g.three.inScene.wheelSides[side].rotateY( -g.three.mkr.wheels.rotIncRad )
              if ( whereWheel.wheelsPosX < -g.three.mkr.wheels.posTarget.x ) g.three.inScene.wheelSides[side].position.x += 2
              if ( whereWheel.mechsPosX < -g.three.mkr.wheels.armTarget.x ) g.three.inScene.wheelMechs[side].position.x += 1.8571
              if ( whereWheel.mechsRadY > 0 ) g.three.inScene.wheelMechs[side].rotateY( -0.00698131 )
            } else {
              // LEFT SIDE
              if ( whereWheel.wheelsRadY < g.three.mkr.wheels.rotTarget ) g.three.inScene.wheelSides[side].rotateY( g.three.mkr.wheels.rotIncRad )
              if ( whereWheel.wheelsPosX > g.three.mkr.wheels.posTarget.x ) g.three.inScene.wheelSides[side].position.x -= 2
              if ( whereWheel.mechsPosX > g.three.mkr.wheels.armTarget.x ) g.three.inScene.wheelMechs[side].position.x -= 1.8571
              if ( whereWheel.mechsRadY < 0 ) g.three.inScene.wheelMechs[side].rotateY( 0.00698131 )
            }
            if ( whereWheel.wheelsPosZ > g.three.mkr.wheels.posTarget.z ) g.three.inScene.wheelSides[side].position.z -= 1.6
            if ( whereWheel.mechsPosZ > g.three.mkr.wheels.armTarget.z ) g.three.inScene.wheelMechs[side].position.z -= 0.9144
          }
        }
      } )
    }

    if ( g.three.lve ) g.three.inScene.flyAway.position.z -= 1

    if ( g.three.mov ) backItUp()
    // if ( g.three.mov ) g.three.mkr.moveAlongPath( g.three.grp.deLorean, 0 )

    if ( g.three.camReset ) {
      if ( g.three.camera.rotation.x > 0 ) g.three.camera.rotateX( -THREE.Math.degToRad( 0.065 ) )
      else g.three.camReset = false
    }

    if ( g.three.drg ) matchMove( g.el.draggable, g.three.grp.deLorean )

    // // TILT TEST
    // g.three.xyz.forEach(axis => {
    //   g.three.inScene.deLorean.rotation[axis] = g.three.mkr.tlt[axis] ? THREE.Math.degToRad(THREE.Math.radToDeg(g.three.inScene.deLorean.rotation[axis]) + 1) : THREE.Math.degToRad(THREE.Math.radToDeg(g.three.inScene.deLorean.rotation[axis]) - 1)
    //   if (g.three.inScene.deLorean.rotation[axis] > THREE.Math.degToRad(20) || g.three.inScene.deLorean.rotation[axis] < THREE.Math.degToRad(-20)) g.three.mkr.tlt[axis] = !g.three.mkr.tlt[axis]
    // })
  }
}

export {
  allowDragging, backItUp, matchMove, setFluxCapacitorAnimator, setRocketFlareAnimator, textureAnimator, updateAnimationFrame,
}
