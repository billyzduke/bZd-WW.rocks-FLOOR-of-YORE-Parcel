import * as THREE from 'three'

import assSmoke from 'url:/src/img/smoke/smoke_3.png'
import assSmokeAlpha from 'url:/src/img/smoke/smoke_3_alpha.png'
import assTunnel from 'url:/src/img/future/lynchTunnelFrame.png'
import assTunnelAlpha from 'url:/src/img/future/lynchTunnelAlpha.png'
import g from '/src/js/glob'
import { padStr, randOnum } from '/src/js/utils'

const createVector2s = v2s => {
  if ( !v2s || !v2s.length ) return false
  const makeV2 = []
  const madeV2s = []
  v2s.forEach( v2 => {
    g.three.xy.forEach( ( axis, i ) => {
      makeV2[i] = typeof v2[axis] !== 'undefined' && v2[axis] ? v2[axis] : v2[i] || 0
    } )
    madeV2s.push( new THREE.Vector2( makeV2[0], makeV2[1] ) )
  } )
  return madeV2s
}

const createVector3s = v3s => {
  if ( !v3s || !v3s.length ) return false
  const makeV3 = []
  const madeV3s = []
  v3s.forEach( v3 => {
    g.three.xyz.forEach( ( axis, i ) => {
      makeV3[i] = typeof v3[axis] !== 'undefined' && v3[axis] ? v3[axis] : v3[i] || 0
    } )
    madeV3s.push( new THREE.Vector3( makeV3[0], makeV3[1], makeV3[2] ) )
  } )
  return madeV3s
}

const setLynchTunnel = ( { girders = 30, depth = 3600 } = {} ) => {
  g.three.grp.tunnel = new THREE.Group()
  g.three.grp.tunnel.name = 'tunnel'
  g.three.scene.add( g.three.grp.tunnel )
  g.three.mkr.inScene.tunnel = g.three.grp.tunnel
  const tunnelTexture = textureLoader( assTunnel )
  // const tunnelAlphaTexture = g.three.mkr.textureLoader( assTunnelAlpha )
  // const tunnelMaterial = new THREE.MeshLambertMaterial( {
  //   alphaMap: tunnelAlphaTexture, emissiveIntensity: 1, emissiveMap: tunnelAlphaTexture, map: tunnelTexture, transparent: true,
  // } )
  const tunnelMaterial = new THREE.MeshBasicMaterial( {
    alphaTest: 0.36, map: tunnelTexture, transparent: true,
  } )
  const tunnelDepth = depth
  const tunnelViewPort = visibleSizeAtZDepth( tunnelDepth )
  const tunnelGeo = new THREE.PlaneGeometry( tunnelViewPort.w, tunnelViewPort.h, 25, 25 )

  for ( let grd = 0; grd < girders; grd++ ) {
    const tunnelMat = tunnelMaterial.clone()
    // tunnelMat.emissive = new THREE.Color( 0x1a1514 ) )
    // tunnelMat.opacity = randOnum( 23, 100 ) / 100
    const tunnelGirder = new THREE.Mesh( tunnelGeo, tunnelMat )
    tunnelGirder.name = `tunnelGirder_${padStr( grd )}`
    tunnelGirder.position.set( 0, 0, -tunnelDepth )
    g.three.grp.tunnel.children.push( tunnelGirder )
  }

  g.three.ani.tnl.zoomTunnel = delta => {
    const tgr = g.three.grp.tunnel.children.length
    // while (tgr--) {

    // }
  }
}

const setSmoke = ( { puffs = 99, depth = 3500 } = {} ) => {
  const smokem = [
    'c56fdd',
    'ac9bdd',
    'c6b3dd',
    'c8acdd',
    'c4c4de',
    '00dddd',
  ]
  const smokeTexture = textureLoader( assSmoke )
  const smokeAlphaTexture = textureLoader( assSmokeAlpha )
  const smokeMaterial = new THREE.MeshLambertMaterial( {
    alphaMap: smokeAlphaTexture, emissiveIntensity: 0.2, emissiveMap: smokeAlphaTexture, map: smokeTexture, transparent: true,
  } )
  const smokeDepth = depth
  const smokeGeo = new THREE.PlaneGeometry( smokeDepth, smokeDepth, 25, 25 )
  const smokeViewPort = visibleSizeAtZDepth( smokeDepth )

  for ( let pf = 0; pf < puffs; pf++ ) {
    const smokeMat = smokeMaterial.clone()
    smokeMat.emissive = new THREE.Color( Number( `0x${smokem[randOnum( 0, smokem.length - 1 )]}` ) )
    smokeMat.opacity = randOnum( 23, 100 ) / 100
    const puff = new THREE.Mesh( smokeGeo, smokeMat )
    puff.name = `smokeCloud_${padStr( pf )}`
    puff.position.set( randOnum( 0, smokeViewPort.w ) - ( smokeViewPort.w / 2 ), randOnum( 0, smokeViewPort.h ) - ( smokeViewPort.h / 2 ), Math.random() * 1000 - smokeDepth )
    puff.rotation.z = Math.random() * 360
    g.three.grp.smoke.children.push( puff )
  }

  g.three.ani.smk.swirlSmoke = delta => {
    const rotateSmoke = delta * 0.2
    let spf = g.three.grp.smoke.children.length
    while ( spf-- ) {
      if ( spf % 2 ) g.three.grp.smoke.children[spf].rotation.z += rotateSmoke
      else g.three.grp.smoke.children[spf].rotation.z -= rotateSmoke
    }
  }
}

const textureLoader = txtAss => new THREE.TextureLoader().load( txtAss )

const visibleHeightAtZDepth = depth => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = g.three.camera.position.z
  if ( depth < cameraOffset ) depth -= cameraOffset
  else depth += cameraOffset

  // vertical fov in radians
  const vFOV = ( g.three.camera.fov * Math.PI ) / 180

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth )
}

const visibleSizeAtZDepth = depth => {
  const h = visibleHeightAtZDepth( depth )
  return {
    h,
    w: h * g.three.camera.aspect,
  }
}

export {
  createVector2s, createVector3s, setLynchTunnel, setSmoke, textureLoader, visibleHeightAtZDepth, visibleSizeAtZDepth,
}
