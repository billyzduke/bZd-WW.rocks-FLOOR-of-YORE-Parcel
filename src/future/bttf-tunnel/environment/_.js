import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { gsap } from 'gsap'

import assSmoke from 'url:/src/shared/smoke/smoke_3.png'
import assSmokeAlpha from 'url:/src/shared/smoke/smoke_3_alpha.png'
import assTunnel from 'url:/src/future/bttf-tunnel/environment/lynchTunnelFrame.png'
import assTunnelAlpha from 'url:/src/future/bttf-tunnel/environment/lynchTunnelAlpha.png'
import assTunnelEmissive from 'url:/src/future/bttf-tunnel/environment/lynchTunnelEmissive.png'
import assFloatingLightShapes from 'url:/src/future/bttf-tunnel/environment/floatingLightShapes.svg'
import assRoughMetal from 'url:/src/future/bttf-tunnel/environment/metalRough.jpg'
import assRoughMetalEmissive from 'url:/src/future/bttf-tunnel/environment/metalRoughEmissive.jpg'
import assPipeMetal from 'url:/src/future/bttf-tunnel/metalPipeHorizontal.png'
import assPipeMetalEmissive from 'url:/src/future/bttf-tunnel/metalPipeHorizontalEmissive.png'
import assGoldMetal from 'url:/src/future/bttf-tunnel/environment/goldMetal.jpg'
import assGoldMetalEmissive from 'url:/src/future/bttf-tunnel/environment/goldMetalEmissive.jpg'
import assGoldRing from 'url:/src/future/bttf-tunnel/environment/levitatorRing.jpg'
import assGoldRingEmissive from 'url:/src/future/bttf-tunnel/environment/levitatorRingEmissive.jpg'
import assTireTread from 'url:/src/future/bttf-tunnel/environment/floatingLampTireTread.jpg'
import assTireTreadEmissive from 'url:/src/future/bttf-tunnel/environment/floatingLampTireTreadEmissive.jpg'
import g from '/src/shared/_'
import { padStr, randoNum } from '/src/shared/utils'
import * as threeMake from '/src/shared/three/make'
import * as threeMesh from '/src/shared/three/mesh'
// import * as threeX from '/src/future/bttf-tunnel/x'

const setTunnelEnvironment = () => {
  g.bttf.grp.tunnel = new THREE.Group()
  g.bttf.grp.tunnel.name = 'tunnel'
  g.bttf.scene.add( g.bttf.grp.tunnel )
  g.bttf.inScene.tunnel = g.bttf.grp.tunnel
  const tvp = setTunnelGirders()
  setTunnelFloaters( tvp )
  setTunnelSmoke()
}

const setTunnelGirders = ( { girders = 20, depth = 3600 } = {} ) => {
  const girderSpacing = 575
  const zoomSpeed = 25

  const tunnelTexture = threeMake.textureLoader( assTunnel )
  const tunnelAlphaTexture = threeMake.textureLoader( assTunnelAlpha )
  const tunnelEmissiveTexture = threeMake.textureLoader( assTunnelEmissive )
  const tunnelMaterial = new THREE.MeshLambertMaterial( {
    alphaMap: tunnelAlphaTexture, emissive: new THREE.Color( 0xad837e ), emissiveMap: tunnelEmissiveTexture, map: tunnelTexture, transparent: true,
  } )
  // const tunnelMaterial = new THREE.MeshBasicMaterial( {
  //   alphaTest: 0.36, map: tunnelTexture, transparent: true,
  // } )
  const tunnelDepth = depth
  const tvp = threeMake.visibleSizeAtZDepth( tunnelDepth )
  const tunnelGeo = new THREE.PlaneGeometry( tvp.w, tvp.h, 25, 25 )

  for ( let grd = 0; grd < girders; grd++ ) {
    const tunnelMat = tunnelMaterial.clone()
    const tunnelGirder = new THREE.Mesh( tunnelGeo, tunnelMat )
    tunnelGirder.name = `tunnelGirder_${padStr( grd )}`
    tunnelGirder.position.set( 0, 0, -tunnelDepth - ( girderSpacing * grd ) )
    g.bttf.grp.tunnel.children.push( tunnelGirder )
  }

  g.bttf.ani.tnl.zoomTunnel = delta => {
    let tgr = girders
    while ( tgr-- ) {
      g.bttf.grp.tunnel.children[tgr].position.z += zoomSpeed
      g.bttf.grp.tunnel.children[tgr].material.emissiveIntensity = ( ( girderSpacing * girders ) + g.bttf.grp.tunnel.children[tgr].position.z ) / ( girderSpacing * girders )
      if ( g.bttf.grp.tunnel.children[tgr].position.z >= girderSpacing - tunnelDepth ) g.bttf.grp.tunnel.children[tgr].position.z = -tunnelDepth - ( girderSpacing * ( girders - 1 ) )
      if ( g.bttf.drg ) {
        const girderViewPort = threeMake.visibleSizeAtZDepth( g.bttf.grp.tunnel.children[tgr].position.z )
        const dz = g.bttf.grp.tunnel.children[tgr].position.z / ( ( girderSpacing * girders ) - girderSpacing )

        g.bttf.grp.tunnel.children[tgr].position.x = -( ( g.bttf.inScene.deLorean.position.x / g.main.w ) * girderViewPort.cx ) * ( 1 - ( girderViewPort.w / tvp.w ) ) * Math.cbrt( dz )
        g.bttf.grp.tunnel.children[tgr].position.y = -( ( g.bttf.inScene.deLorean.position.y / g.main.h ) * girderViewPort.cy ) * ( 1 - ( girderViewPort.h / tvp.h ) ) * Math.cbrt( dz ) - 200 // delorean origin is still in the undercarriage
      }
    }
  }

  return tvp
}

const setSmokePuff = ( {
  baseZ = 0, exclude = [ 0 ], spacingZ = 0, svp = {},
} = {} ) => {
  let z = 0
  while ( exclude.includes( z ) ) z = randoNum( 0, 1000 ) - baseZ
  exclude.push( z )
  for ( let spz = 1; spz <= spacingZ; spz++ ) exclude.push( z + spz, z - spz )
  const x = randoNum( 0, svp.w ) - svp.cx
  const y = randoNum( 0, svp.h ) - svp.cy
  return {
    x,
    y,
    z,
    // exclude
  }
}

const setTunnelSmoke = ( { puffs = 99, depth = 3000 } = {} ) => {
  const smokem = [
    'c56fdd',
    'ac9bdd',
    'c6b3dd',
    'c8acdd',
    'c4c4de',
    '00dddd',
  ]
  const smokeTexture = threeMake.textureLoader( assSmoke )
  const smokeAlphaTexture = threeMake.textureLoader( assSmokeAlpha )
  const smokeMaterial = new THREE.MeshLambertMaterial( {
    alphaMap: smokeAlphaTexture, emissiveIntensity: 0.2, emissiveMap: smokeAlphaTexture, map: smokeTexture, transparent: true,
  } )
  const smokeDepth = depth
  const smokeGeo = new THREE.PlaneGeometry( smokeDepth, smokeDepth, 25, 25 )
  const svp = threeMake.visibleSizeAtZDepth( smokeDepth )
  const usedZs = [ 0 ]
  // const closestZ = -smokeDepth
  // let closestPuff

  for ( let pf = 0; pf < puffs; pf++ ) {
    const puffPos = setSmokePuff( {
      baseZ: smokeDepth, exclude: usedZs, spacingZ: 2, svp,
    } )
    const smokeMat = smokeMaterial.clone()
    smokeMat.emissive = new THREE.Color( Number( `0x${smokem[randoNum( 0, smokem.length - 1 )]}` ) )
    const dcx = Math.abs( svp.cx - puffPos.x )
    const dcy = Math.abs( svp.cy - puffPos.y )
    const o = ( ( dcx + dcy ) / 2 ) / ( ( svp.w + svp.h ) / 2 )
    smokeMat.opacity = gsap.utils.clamp( 0.23, 1, 1.23 - o )
    const puff = new THREE.Mesh( smokeGeo, smokeMat )
    puff.name = `smokePuff_${padStr( pf )}`
    puff.position.set( puffPos.x, puffPos.y, puffPos.z )
    puff.rotation.z = Math.random() * 360
    g.bttf.grp.smoke.children.push( puff )
    // if ( puffPos.z > closestZ ) {
    //   closestZ = puffPos.z
    //   closestPuff = pf
    // }
  }

  // console.log( { closestZ, closestPuff, cpObj: g.bttf.grp.smoke.children[closestPuff] } )

  g.bttf.ani.smk.swirlSmoke = delta => {
    let spf = g.bttf.grp.smoke.children.length
    let spr = 0.1
    while ( spf-- ) {
      const rotateSmoke = delta * spr
      spr += 0.1
      if ( spr > 0.3 ) spr = 0.1
      if ( spf % 2 ) g.bttf.grp.smoke.children[spf].rotation.z += rotateSmoke
      else g.bttf.grp.smoke.children[spf].rotation.z -= rotateSmoke
      g.bttf.grp.smoke.children[spf].position.z += 1
      if ( g.bttf.grp.smoke.children[spf].position.z >= -2000 ) {
        if ( g.bttf.grp.smoke.children[spf].material.opacity > 0 ) g.bttf.grp.smoke.children[spf].material.opacity -= 0.01
        if ( g.bttf.grp.smoke.children[spf].position.z >= -1900 ) {
          const puffPos = setSmokePuff( {
            baseZ: smokeDepth, svp,
          } )
          g.bttf.grp.smoke.children[spf].material.opacity = 0
          g.bttf.grp.smoke.children[spf].position.set( puffPos.x, puffPos.y, -smokeDepth )
        }
      } else if ( g.bttf.grp.smoke.children[spf].material.opacity < 1 ) g.bttf.grp.smoke.children[spf].material.opacity += 0.01
      // if ( spf === closestPuff ) console.log( { o: g.bttf.grp.smoke.children[spf].material.opacity, z: g.bttf.grp.smoke.children[spf].position.z } )
    }
  }
}

const pairLampPostsInto = ( lampPostPair, tvp, lppWidth = 500 ) => {
  const whichPair = padStr( g.bttf.inScene.lampPostPairs.length - 1 )
  if ( !lampPostPair.children.length ) {
    const loader = new SVGLoader()
    return loader.load(
      assFloatingLightShapes,
      pathsData => {
        const { paths } = pathsData
        const supportRodShape = SVGLoader.createShapes( paths[0] )

        const leftLampGyro = new THREE.Group()

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
        const supportRodGeo = new THREE.ExtrudeGeometry( supportRodShape, { extrudePath, steps: 300, depth: 360 } )
        const supportRodMap = threeMake.textureLoader( assRoughMetal )
        const supportRodEmissiveMap = threeMake.textureLoader( assRoughMetalEmissive )
        const supportRodMat = new THREE.MeshPhysicalMaterial( {
          metalness: 1,
          roughness: 0.4,
          color: new THREE.Color( 0x4f191f ),
          side: THREE.DoubleSide,
          emissive: new THREE.Color( 0x4f191f ),
          emissiveMap: supportRodEmissiveMap,
          map: supportRodMap,
        } )
        supportRodMat.map.wrapS = supportRodMat.map.wrapT = supportRodMat.emissiveMap.wrapS = supportRodMat.emissiveMap.wrapT = THREE.RepeatWrapping
        supportRodMat.map.repeat.set( 0.025, 0.1 )
        supportRodMat.emissiveMap.repeat.set( 0.025, 0.1 )
        const supportRod = new THREE.Mesh( supportRodGeo, supportRodMat )
        supportRod.rotation.x = THREE.Math.degToRad( 180 )
        const supportRodCapShape = SVGLoader.createShapes( paths[1] )
        const supportRodCapGeo = new THREE.LatheGeometry( supportRodCapShape[0].getPoints(), 8, 0, Math.PI )
        const supportRodCap = new THREE.Mesh( supportRodCapGeo, supportRodMat )
        supportRodCap.position.set( -42.5, -403.25, 74 )
        supportRodCap.rotateX( THREE.Math.degToRad( -90 ) )
        supportRodCap.rotateY( THREE.Math.degToRad( 149.5 ) )
        supportRodCap.castShadow = supportRodCap.receiveShadow = supportRod.castShadow = supportRod.receiveShadow = true
        supportRod.add( supportRodCap )
        const lightBarGuardGeo = new THREE.CylinderGeometry( 12, 12, 100, 10, 1, true, 0, Math.PI )
        const lightBarGuardMap = threeMake.textureLoader( assPipeMetal )
        const lightBarGuardEmissiveMap = threeMake.textureLoader( assPipeMetalEmissive )
        const lightBarGuardMat = new THREE.MeshPhysicalMaterial( {
          metalness: 1,
          roughness: 0.25,
          color: new THREE.Color( 0x999999 ),
          side: THREE.DoubleSide,
          emissive: new THREE.Color( 0x999999 ),
          emissiveMap: lightBarGuardEmissiveMap,
          emissiveIntensity: 0.75,
          map: lightBarGuardMap,
        } )
        lightBarGuardMat.map.wrapS = lightBarGuardMat.map.wrapT = lightBarGuardMat.emissiveMap.wrapS = lightBarGuardMat.emissiveMap.wrapT = THREE.RepeatWrapping
        lightBarGuardMat.map.repeat.set( 0.025, 0.1 )
        lightBarGuardMat.emissiveMap.repeat.set( 0.025, 0.1 )
        const lightBarGuard = new THREE.Mesh( lightBarGuardGeo, lightBarGuardMat )
        lightBarGuard.position.set( -42.5, -403.25, 94 )
        lightBarGuard.rotateX( THREE.Math.degToRad( 90 ) )
        const lightBarGuardCapGeo = new THREE.SphereGeometry( 12, 10, 10, 0, Math.PI, 0, Math.PI / 2 )
        const lightBarGuardCap = new THREE.Mesh( lightBarGuardCapGeo, lightBarGuardMat )
        lightBarGuardCap.material.map.rotation = THREE.Math.degToRad( 90 )
        lightBarGuardCap.rotateY( THREE.Math.degToRad( 90 ) )
        lightBarGuardCap.position.y = 50
        lightBarGuard.add( lightBarGuardCap )

        const lightBarShape = SVGLoader.createShapes( paths[2] )
        const glowGeom = new THREE.LatheGeometry( lightBarShape[0].getPoints(), 16 )
        const glowMate = new THREE.MeshPhysicalMaterial( {
          color: 0x1efcb2,
          emissive: new THREE.Color( 0x1efcb2 ),
          emissiveIntensity: 0.9,
        } )
        const glowMesh = new THREE.Mesh( glowGeom, glowMate )
        glowMesh.position.y = -46
        lightBarGuard.add( glowMesh )
        // no idea why the glowMesh doesn't work in this case... use it and the element never appears
        // const glowMesh = threeX.GeometricGlowMesh( false, glowGeom, [ 0, 0, 0 ], 0x1efcb2 )
        // glowMesh.object3d.position.y = -40
        // lightBarGuardMsh.add( glowMesh.object3d )
        supportRod.add( lightBarGuard )

        leftLampGyro.add( supportRod )
        const supportRodOpposite = supportRod.clone()
        supportRodOpposite.position.x = 36
        supportRodOpposite.position.z = -42
        supportRodOpposite.rotation.y = THREE.Math.degToRad( 180 )
        leftLampGyro.add( supportRodOpposite )

        // cloning materials and textures doesn't seem to really create a distinct copy,
        // in that when then trying to alter the properties of the copy, the original is still affected
        // SO WHAT IS THE POINT OF CLONING THEN
        const floaterBase = new THREE.Group()
        const floaterBaseDiamondShape = SVGLoader.createShapes( paths[3] )
        const floaterBaseDiamondGeo = new THREE.ExtrudeGeometry( floaterBaseDiamondShape, {
          steps: 1, depth: 36, bevelThickness: 8, bevelOffset: -6,
        } )
        const floaterBaseDiamondMap = threeMake.textureLoader( assRoughMetal )
        const floaterBaseDiamondEmissiveMap = threeMake.textureLoader( assRoughMetalEmissive )
        const floaterBaseDiamondMat = new THREE.MeshPhysicalMaterial( {
          metalness: 0,
          roughness: 0.8,
          color: new THREE.Color( 0x666666 ),
          side: THREE.DoubleSide,
          emissive: new THREE.Color( 0x666666 ),
          emissiveMap: floaterBaseDiamondEmissiveMap,
          map: floaterBaseDiamondMap,
        } )
        floaterBaseDiamondMat.map.wrapS = floaterBaseDiamondMat.map.wrapT = floaterBaseDiamondMat.emissiveMap.wrapS = floaterBaseDiamondMat.emissiveMap.wrapT = THREE.RepeatWrapping
        floaterBaseDiamondMat.map.repeat.set( 0.01, 0.01 )
        floaterBaseDiamondMat.emissiveMap.repeat.set( 0.01, 0.01 )
        const floaterBaseDiamond = new THREE.Mesh( floaterBaseDiamondGeo, floaterBaseDiamondMat )
        floaterBaseDiamond.rotateX( THREE.Math.degToRad( 90 ) )
        floaterBaseDiamond.rotateZ( THREE.Math.degToRad( -90 ) )
        floaterBaseDiamond.position.y = 32
        floaterBaseDiamond.position.x = -54
        floaterBase.add( floaterBaseDiamond )

        const floaterBaseCylinderGeo = new THREE.CylinderGeometry( 18, 96, 12, 16, 1, true )
        const floaterBaseCylinderMap = threeMake.textureLoader( assRoughMetal )
        const floaterBaseCylinderEmissiveMap = threeMake.textureLoader( assRoughMetalEmissive )
        const floaterBaseCylinderMat = new THREE.MeshPhysicalMaterial( {
          metalness: 0,
          roughness: 0.8,
          color: new THREE.Color( 0x666666 ),
          side: THREE.DoubleSide,
          emissive: new THREE.Color( 0x666666 ),
          emissiveMap: floaterBaseCylinderEmissiveMap,
          map: floaterBaseCylinderMap,
        } )
        floaterBaseCylinderMat.map.wrapS = floaterBaseCylinderMat.map.wrapT = floaterBaseCylinderMat.emissiveMap.wrapS = floaterBaseCylinderMat.emissiveMap.wrapT = THREE.RepeatWrapping
        floaterBaseCylinderMat.map.repeat.set( 1, 1 )
        floaterBaseCylinderMat.emissiveMap.repeat.set( 1, 1 )
        const floaterBaseCylinder = new THREE.Mesh( floaterBaseCylinderGeo, floaterBaseCylinderMat )
        floaterBaseCylinder.rotateY( THREE.Math.degToRad( -90 ) )
        floaterBaseCylinder.position.set( 17, -5, -21 )
        floaterBase.add( floaterBaseCylinder )

        const floaterBaseBumperShape = SVGLoader.createShapes( paths[4] )
        const floaterBaseBumperGeo = new THREE.ExtrudeGeometry( floaterBaseBumperShape, {
          steps: 16, depth: 36, bevelThickness: 20,
        } )
        const floaterBaseBumperMap = threeMake.textureLoader( assTireTread )
        const floaterBaseBumperEmissiveMap = threeMake.textureLoader( assTireTreadEmissive )
        const floaterBaseBumperMat = new THREE.MeshPhysicalMaterial( {
          metalness: 0,
          roughness: 0.75,
          color: new THREE.Color( 0x454545 ),
          side: THREE.DoubleSide,
          emissive: new THREE.Color( 0x454545 ),
          emissiveMap: floaterBaseBumperEmissiveMap,
          map: floaterBaseBumperMap,
        } )
        floaterBaseBumperMat.map.wrapS = floaterBaseBumperMat.map.wrapT = floaterBaseBumperMat.emissiveMap.wrapS = floaterBaseBumperMat.emissiveMap.wrapT = THREE.RepeatWrapping
        floaterBaseBumperMat.map.repeat.set( 0.1, 0.015 )
        floaterBaseBumperMat.emissiveMap.repeat.set( 0.1, 0.015 )
        floaterBaseBumperMat.map.offset.y = floaterBaseBumperMat.emissiveMap.offset.y = 0.75
        const floaterBaseBumper = new THREE.Mesh( floaterBaseBumperGeo, floaterBaseBumperMat )
        floaterBaseBumper.rotateX( THREE.Math.degToRad( 90 ) )
        floaterBaseBumper.position.set( -94.5, -31.05, -131.5 )
        floaterBase.add( floaterBaseBumper )

        const levitatorTopGeo = new THREE.CylinderGeometry( 72, 96, 36, 16, 1, true )
        const levitatorTopMap = threeMake.textureLoader( assGoldRing )
        const levitatorTopEmissiveMap = threeMake.textureLoader( assGoldRingEmissive )
        const levitatorTopMat = new THREE.MeshPhysicalMaterial( {
          metalness: 1,
          roughness: 0.15,
          color: new THREE.Color( 0xedd09d ),
          side: THREE.DoubleSide,
          emissive: new THREE.Color( 0xedd09d ),
          emissiveMap: levitatorTopEmissiveMap,
          map: levitatorTopMap,
        } )
        const levitatorTop = new THREE.Mesh( levitatorTopGeo, levitatorTopMat )
        levitatorTop.position.set( 16.5, -105, -21 )
        floaterBase.add( levitatorTop )

        const levitatorMiddleGeo = new THREE.CylinderGeometry( 96, 24, 108, 16, 1, true )
        const levitatorMiddleMap = threeMake.textureLoader( assGoldMetal )
        const levitatorMiddleEmissiveMap = threeMake.textureLoader( assGoldMetalEmissive )
        const levitatorMiddleMat = new THREE.MeshPhysicalMaterial( {
          metalness: 1,
          roughness: 0.15,
          color: new THREE.Color( 0xedd09d ),
          side: THREE.DoubleSide,
          emissive: new THREE.Color( 0xedd09d ),
          emissiveMap: levitatorMiddleEmissiveMap,
          map: levitatorMiddleMap,
        } )
        // levitatorMiddleMat.map.wrapS = levitatorMiddleMat.map.wrapT = levitatorMiddleMat.emissiveMap.wrapS = levitatorMiddleMat.emissiveMap.wrapT = THREE.RepeatWrapping
        // levitatorMiddleMat.map.repeat.set( 0.1, 0.015 )
        // levitatorMiddleMat.emissiveMap.repeat.set( 0.1, 0.015 )
        // levitatorMiddleMat.map.offset.y = levitatorMiddleMat.emissiveMap.offset.y = 0.75
        const levitatorMiddle = new THREE.Mesh( levitatorMiddleGeo, levitatorMiddleMat )
        levitatorMiddle.position.set( 16.5, -177, -21 )
        floaterBase.add( levitatorMiddle )

        const levitatorCapGeo = new THREE.SphereGeometry( 27.75, 16, 6, 0, Math.PI * 2, Math.PI * ( 2 / 3 ), Math.PI * ( 1 / 3 ) )
        const levitatorCap = new THREE.Mesh( levitatorCapGeo, levitatorMiddleMat )
        levitatorCap.position.set( 16.5, -217, -21 )
        levitatorCap.rotateY( THREE.Math.degToRad( 90 ) )
        floaterBase.add( levitatorCap )

        leftLampGyro.add( floaterBase )

        const leftLamp = new THREE.Group()
        leftLamp.name = `leftLamp${whichPair}`
        leftLampGyro.name = `leftLampGyro${whichPair}`

        leftLamp.add( leftLampGyro )

        const cx = leftLamp.width / 2
        const cy = leftLamp.height / 2

        leftLamp.position.x = randoNum( cx, tvp.w - cx - lppWidth ) - tvp.cx
        leftLamp.position.y = randoNum( cy, tvp.h - cy ) - tvp.cy

        lampPostPair.add( leftLamp )
        pairLampPostsInto( lampPostPair )
      },
    )
  }
  const rightLamp = lampPostPair.children[0].clone()
  rightLamp.name = `rightLamp${whichPair}`
  rightLamp.children[0].name = `rightLampGyro${whichPair}`
  threeMesh.mirrorMesh( rightLamp )
  rightLamp.position.x += lppWidth
  lampPostPair.add( rightLamp )
}

const setTunnelFloaters = tvp => {
  setLampPosts( tvp )
  setSignPosts()
}

const setLampPosts = tvp => {
  const lampPostPair = new THREE.Group()
  if ( !g.bttf.inScene.lampPostPairs ) g.bttf.inScene.lampPostPairs = []
  lampPostPair.name = `lampPostPair${padStr( g.bttf.inScene.lampPostPairs.length )}`
  g.bttf.grp.tunnel.children[g.bttf.grp.tunnel.children.length - 1].add( lampPostPair )
  g.bttf.inScene.lampPostPairs.push( lampPostPair )
  pairLampPostsInto( lampPostPair, tvp )
}

const setSignPosts = () => {

}

export { setTunnelEnvironment }
