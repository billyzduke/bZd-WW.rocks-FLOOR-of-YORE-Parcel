import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { gsap, TimelineMax as TL } from 'gsap'

import assSmoke from 'url:/src/shared/smoke/smoke_3.png'
import assSmokeAlpha from 'url:/src/shared/smoke/smoke_3_alpha.png'
import assGirderFrame from 'url:/src/future/bttf-tunnel/environment/lynchTunnelFrame.png'
import assGirderFrameAlpha from 'url:/src/future/bttf-tunnel/environment/lynchTunnelAlpha.png'
import assGirderFrameEmissive from 'url:/src/future/bttf-tunnel/environment/lynchTunnelEmissive.png'
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

const setTunnelEnvironment = ( { floaters = true, smoke = true } = {} ) => {
  g.bttf.grp.tunnel = new THREE.Group()
  g.bttf.grp.tunnel.name = 'tunnel'
  g.bttf.scene.add( g.bttf.grp.tunnel )
  g.bttf.inScene.tunnel = g.bttf.grp.tunnel
  const tvp = setTunnelGirders()
  if ( floaters ) setTunnelFloaters( tvp )
  if ( smoke ) setTunnelSmoke( { tvp } )
}

const setTunnelGirders = ( { girders = 25, depth = 3600 } = {} ) => {
  const girderFrameTexture = threeMake.textureLoader( assGirderFrame )
  const girderFrameAlphaTexture = threeMake.textureLoader( assGirderFrameAlpha )
  const girderFrameEmissiveTexture = threeMake.textureLoader( assGirderFrameEmissive )
  const girderFrameMaterial = new THREE.MeshLambertMaterial( {
    alphaMap: girderFrameAlphaTexture,
    depthWrite: false,
    emissive: threeMake.color( 0xad837e ),
    emissiveMap: girderFrameEmissiveTexture,
    map: girderFrameTexture,
    transparent: true,
  } )
  const tunnelDepth = depth
  const tvp = threeMake.visibleSizeAtZDepth( tunnelDepth )
  const girderFrameGeo = new THREE.PlaneGeometry( tvp.w, tvp.h, 25, 25 )

  for ( let gdr = 0; gdr < girders; gdr++ ) {
    const girderFrameMat = girderFrameMaterial.clone()
    const girderFrame = new THREE.Mesh( girderFrameGeo, girderFrameMat )
    girderFrame.name = `girderFrame_${padStr( gdr )}`
    const girderGroup = new THREE.Group() // needed to add floaters later
    girderGroup.add( girderFrame )
    girderGroup.position.set( 0, 0, 0 - ( g.bttf.tunnel.girderSpacing * gdr ) )
    if ( gdr < girders - 1 ) {
      const girderSmoke = new THREE.Group()
      girderGroup.add( girderSmoke )
    }
    g.bttf.grp.tunnel.children.push( girderGroup )
  }

  g.bttf.ani.tnl.zoomTunnel = () => {
    let girderGroup = girders
    while ( girderGroup-- ) {
      const gdrGrp = g.bttf.grp.tunnel.children[girderGroup]
      const gdr = gdrGrp.children[0]
      gdrGrp.position.z += g.bttf.tunnel.zoomSpeed
      gdr.material.emissiveIntensity = ( ( g.bttf.tunnel.girderSpacing * girders ) + gdrGrp.position.z ) / ( g.bttf.tunnel.girderSpacing * girders )
      const lampPostPair = gdrGrp.children[1]
      if ( lampPostPair.children.length === 2 ) {
        const backBulbs = [ lampPostPair.getObjectByName( `${lampPostPair.name}_leftLampBackBulb`, true ), lampPostPair.getObjectByName( `${lampPostPair.name}_rightLampBackBulb`, true ) ]
        const frontBulbs = [ lampPostPair.getObjectByName( `${lampPostPair.name}_leftLampFrontBulb`, true ), lampPostPair.getObjectByName( `${lampPostPair.name}_rightLampFrontBulb`, true ) ]
        backBulbs.forEach( bulb => {
          if ( gdrGrp.position.z >= -( g.bttf.pilotingDepth + g.bttf.lampPosts.turnDepthAdjustment ) ) {
            if ( g.bttf.blink[bulb.name] ) {
              bulb.material.emissiveIntensity += 0.25
              g.bttf.lampLights[bulb.name].intensity += 0.075
              if ( bulb.material.emissiveIntensity >= 5 ) g.bttf.blink[bulb.name] = false
            } else {
              bulb.material.emissiveIntensity -= 0.25
              g.bttf.lampLights[bulb.name].intensity -= 0.075
              if ( bulb.material.emissiveIntensity <= 0 ) g.bttf.blink[bulb.name] = true
            }
          } else {
            if ( bulb.material.emissiveIntensity > 0 ) bulb.material.emissiveIntensity -= 0.25
            if ( g.bttf.lampLights[bulb.name].intensity > 0 ) g.bttf.lampLights[bulb.name].intensity -= 0.075
          }
        } )
        frontBulbs.forEach( bulb => {
          if ( gdrGrp.position.z < -( g.bttf.pilotingDepth + g.bttf.lampPosts.turnDepthAdjustment ) ) {
            if ( g.bttf.blink[bulb.name] ) {
              bulb.material.emissiveIntensity += 0.25
              g.bttf.lampLights[bulb.name].intensity += 0.075
              if ( bulb.material.emissiveIntensity >= 5 ) g.bttf.blink[bulb.name] = false
            } else {
              bulb.material.emissiveIntensity -= 0.25
              g.bttf.lampLights[bulb.name].intensity -= 0.075
              if ( bulb.material.emissiveIntensity <= 0 ) g.bttf.blink[bulb.name] = true
            }
          } else {
            if ( bulb.material.emissiveIntensity > 0 ) bulb.material.emissiveIntensity -= 0.25
            if ( g.bttf.lampLights[bulb.name].intensity > 0 ) g.bttf.lampLights[bulb.name].intensity -= 0.075
          }
        } )
        if ( gdrGrp.position.z >= -( g.bttf.pilotingDepth + g.bttf.lampPosts.turnDepthAdjustment ) ) {
          if ( lampPostPair.children[0].rotation.y > threeMake.degToRad( -90 ) ) lampPostPair.children[0].rotateY( threeMake.degToRad( -10 ) )
          if ( lampPostPair.children[1].rotation.y > threeMake.degToRad( -90 ) ) lampPostPair.children[1].rotateY( threeMake.degToRad( 10 ) )
        }
      }
      if ( gdrGrp.position.z >= g.bttf.tunnel.girderSpacing - tunnelDepth && gdr.material.opacity > 0 ) gdr.material.opacity = 0
      else if ( gdr.material.opacity < 1 ) gdr.material.opacity += 0.01
      if ( gdrGrp.position.z >= 0 ) {
        gdrGrp.position.z = 0 - ( g.bttf.tunnel.girderSpacing * ( girders - 1 ) )
        if ( lampPostPair.children.length === 2 ) {
          if ( g.bttf.lampPostPairs.visible ) lampPostPair.visible = true
          lampPostPair.children[0].rotateY( threeMake.degToRad( 180 ) )
          lampPostPair.children[0].position.x = randoNum( ( tvp.w * g.bttf.lampPostPairs.position.x.min ) + g.bttf.lampPosts.clearance.cx, ( tvp.w * g.bttf.lampPostPairs.position.x.max ) - g.bttf.lampPosts.clearance.cx - g.bttf.lampPostPairs.clearance ) - tvp.cx
          lampPostPair.children[0].position.y = randoNum( ( tvp.h * g.bttf.lampPostPairs.position.y.min ) + g.bttf.lampPosts.clearance.cy, ( tvp.h * g.bttf.lampPostPairs.position.y.max ) - g.bttf.lampPosts.clearance.cy ) - tvp.cy
          lampPostPair.children[1].rotateY( threeMake.degToRad( -180 ) )
          lampPostPair.children[1].position.x = lampPostPair.children[0].position.x + g.bttf.lampPostPairs.clearance + g.bttf.lampPosts.clearance.w
          lampPostPair.children[1].position.y = lampPostPair.children[0].position.y
        }
      }
      if ( g.bttf.drg ) {
        const girderViewPort = threeMake.visibleSizeAtZDepth( gdrGrp.position.z )
        const dz = gdrGrp.position.z / ( ( g.bttf.tunnel.girderSpacing * girders ) - g.bttf.tunnel.girderSpacing )
        gdrGrp.position.x = -( ( g.bttf.inScene.deLorean.position.x / g.main.w ) * girderViewPort.cx ) * ( 1 - ( girderViewPort.w / tvp.w ) ) * Math.cbrt( dz )
        gdrGrp.position.y = -( ( g.bttf.inScene.deLorean.position.y / g.main.h ) * girderViewPort.cy ) * ( 1 - ( girderViewPort.h / tvp.h ) ) * Math.cbrt( dz ) - 250 // delorean origin is still in the undercarriage
      }
    }
  }

  return tvp
}

const setSmokePuff = ( {
  baseZ = 0, exclude = [ 0 ], spacingZ = 0, svp = {}, varZ = 1000,
} = {} ) => {
  let z = 0
  while ( exclude.includes( z ) ) z = randoNum( 0, varZ ) - baseZ
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

const setTunnelSmoke = ( {
  puffsPerGirder = 3, freePuffs = 16, depth = 3000, tvp,
} = {} ) => {
  const smokem = [
    'c56fdd',
    'ac9bdd',
    'c6b3dd',
    'c8acdd',
    'c4c4de',
    '00dddd',
  ]
  threeMake.textureLoader( assSmoke, smokeTexture => {
    const smokeAlphaTexture = threeMake.textureLoader( assSmokeAlpha )
    const smokeDepth = depth
    const smokeSize = {
      w: depth + 600,
    }
    smokeSize.h = ( smokeSize.w * smokeTexture.image.width ) / smokeTexture.image.height // maintain aspect ratio of original image
    const smokeGeo = new THREE.PlaneGeometry( smokeSize.h, smokeSize.w, 25, 25 )
    const svp = threeMake.visibleSizeAtZDepth( smokeDepth )
    const usedZs = [ 0 ]
    const girderPuffSpacing = g.bttf.tunnel.girderSpacing / 1.15
    let puffPosZ

    for ( let gdr = 0; gdr < g.bttf.grp.tunnel.children.length - 1; gdr++ ) {
      puffPosZ = ( g.bttf.tunnel.girderSpacing - girderPuffSpacing ) / 2
      for ( let pf = 0; pf < puffsPerGirder; pf++ ) {
        const puffPos = setSmokePuff( { svp: tvp } )
        const smokeMat = new THREE.MeshLambertMaterial( {
          alphaMap: smokeAlphaTexture, emissiveIntensity: 0.2, emissiveMap: smokeAlphaTexture, map: smokeTexture, transparent: true,
        } )
        smokeMat.emissive = threeMake.color( Number( `0x${smokem[randoNum( 0, smokem.length - 1 )]}` ) )
        const dcx = Math.abs( tvp.cx - puffPos.x )
        const dcy = Math.abs( tvp.cy - puffPos.y )
        const o = ( ( dcx + dcy ) / 2 ) / ( ( svp.w + svp.h ) / 2 )
        smokeMat.opacity = gsap.utils.clamp( 0.23, 1, 1.23 - o )
        const puff = new THREE.Mesh( smokeGeo, smokeMat )
        puff.position.set( puffPos.x, puffPos.y, -puffPosZ )
        puff.rotation.z = Math.random() * 360
        g.bttf.inScene.allSmoke.push( puff )
        g.bttf.grp.tunnel.children[gdr].children[1].add( g.bttf.inScene.allSmoke[g.bttf.inScene.allSmoke.length - 1] )
        puffPosZ += girderPuffSpacing / 2
      }
    }

    for ( let pf = 0; pf < freePuffs; pf++ ) {
      const puffPos = setSmokePuff( {
        baseZ: smokeDepth, exclude: usedZs, spacingZ: 2, svp,
      } )
      const smokeMat = new THREE.MeshLambertMaterial( {
        alphaMap: smokeAlphaTexture, emissiveIntensity: 0.2, emissiveMap: smokeAlphaTexture, map: smokeTexture, transparent: true, depthWrite: false,
      } )
      smokeMat.emissive = threeMake.color( Number( `0x${smokem[randoNum( 0, smokem.length - 1 )]}` ) )
      const dcx = Math.abs( svp.cx - puffPos.x )
      const dcy = Math.abs( svp.cy - puffPos.y )
      const o = ( ( dcx + dcy ) / 2 ) / ( ( svp.w + svp.h ) / 2 )
      smokeMat.opacity = gsap.utils.clamp( 0.23, 1, 1.23 - o )
      const puff = new THREE.Mesh( smokeGeo, smokeMat )
      puff.name = `freePuff_${padStr( pf )}`
      puff.position.set( puffPos.x, puffPos.y, puffPos.z )
      puff.rotation.z = Math.random() * 360
      g.bttf.grp.freeSmoke.add( puff )
      g.bttf.inScene.allSmoke.push( puff )
    }

    puffPosZ = ( g.bttf.tunnel.girderSpacing - girderPuffSpacing ) / 2

    g.bttf.ani.smk.swirlSmoke = delta => {
      let spf = g.bttf.inScene.allSmoke.length
      let spr = 0.1
      while ( spf-- ) {
        const rotateSmoke = delta * spr
        spr += 0.1
        if ( spr > 0.3 ) spr = 0.1
        if ( spf % 2 ) g.bttf.inScene.allSmoke[spf].rotation.z += rotateSmoke
        else g.bttf.inScene.allSmoke[spf].rotation.z -= rotateSmoke
        g.bttf.inScene.allSmoke[spf].position.z += 1

        if ( g.bttf.inScene.allSmoke[spf].name.length ) {
          g.bttf.inScene.allSmoke[spf].material.depthWrite = false
          if ( g.bttf.inScene.allSmoke[spf].position.z >= -2700 ) {
            if ( g.bttf.inScene.allSmoke[spf].material.opacity > 0 ) g.bttf.inScene.allSmoke[spf].material.opacity -= 0.01
            if ( g.bttf.inScene.allSmoke[spf].position.z >= -2600 ) {
              const puffPos = setSmokePuff( {
                baseZ: smokeDepth, svp,
              } )
              g.bttf.inScene.allSmoke[spf].material.opacity = 0
              g.bttf.inScene.allSmoke[spf].position.set( puffPos.x, puffPos.y, -smokeDepth )
            }
          } else if ( g.bttf.inScene.allSmoke[spf].material.opacity < 1 ) g.bttf.inScene.allSmoke[spf].material.opacity += 0.01
        } else {
          const whichGirderGroup = g.bttf.inScene.allSmoke[spf].parent.parent
          if ( whichGirderGroup.position.z >= -4600 ) {
            if ( g.bttf.inScene.allSmoke[spf].material.opacity > 0 ) g.bttf.inScene.allSmoke[spf].material.opacity -= 0.0126
            else g.bttf.inScene.allSmoke[spf].material.opacity = 0
            if ( whichGirderGroup.position.z >= -2600 ) {
              g.bttf.inScene.allSmoke[spf].material.depthWrite = false
              g.bttf.inScene.allSmoke[spf].material.opacity = 0
              if ( whichGirderGroup.position.z >= -26 ) {
                const puffPos = setSmokePuff( { svp: tvp } )
                g.bttf.inScene.allSmoke[spf].position.set( puffPos.x, puffPos.y, -puffPosZ )
                puffPosZ += girderPuffSpacing / 2
                if ( puffPosZ > g.bttf.tunnel.girderSpacing ) puffPosZ = ( g.bttf.tunnel.girderSpacing - girderPuffSpacing ) / 2
              }
            }
          } else if ( g.bttf.inScene.allSmoke[spf].material.opacity < 1 ) {
            if ( !g.bttf.inScene.allSmoke[spf].material.depthWrite ) g.bttf.inScene.allSmoke[spf].material.depthWrite = true
            g.bttf.inScene.allSmoke[spf].material.opacity += 0.01
          }
        }
      }
    }
  } )
}

const pairLampPostsInto = ( lampPostPair, tvp ) => {
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
          color: threeMake.color( 0x4f191f ),
          side: THREE.DoubleSide,
          emissive: threeMake.color( 0x4f191f ),
          emissiveMap: supportRodEmissiveMap,
          map: supportRodMap,
        } )
        supportRodMat.map.wrapS = supportRodMat.map.wrapT = supportRodMat.emissiveMap.wrapS = supportRodMat.emissiveMap.wrapT = THREE.RepeatWrapping
        supportRodMat.map.repeat.set( 0.025, 0.1 )
        supportRodMat.emissiveMap.repeat.set( 0.025, 0.1 )
        const supportRod = new THREE.Mesh( supportRodGeo, supportRodMat )
        supportRod.castShadow = supportRod.receiveShadow = true
        supportRod.rotation.x = threeMake.degToRad( 180 )

        const supportRodCapShape = SVGLoader.createShapes( paths[1] )
        const supportRodCapGeo = new THREE.LatheGeometry( supportRodCapShape[0].getPoints(), 8, 0, Math.PI )
        const supportRodCap = new THREE.Mesh( supportRodCapGeo, supportRodMat )
        supportRodCap.position.set( -42.5, -403.25, 74 )
        supportRodCap.rotateX( threeMake.degToRad( -90 ) )
        supportRodCap.rotateY( threeMake.degToRad( 149.5 ) )
        supportRodCap.castShadow = supportRodCap.receiveShadow = true
        supportRod.add( supportRodCap )

        const lightBarGuardGeo = new THREE.CylinderGeometry( 12, 12, 100, 10, 1, true, 0, Math.PI )
        const lightBarGuardMap = threeMake.textureLoader( assPipeMetal )
        const lightBarGuardEmissiveMap = threeMake.textureLoader( assPipeMetalEmissive )
        const lightBarGuardMat = new THREE.MeshPhysicalMaterial( {
          metalness: 1,
          roughness: 0.25,
          color: threeMake.color( 0x999999 ),
          side: THREE.DoubleSide,
          emissive: threeMake.color( 0x999999 ),
          emissiveMap: lightBarGuardEmissiveMap,
          emissiveIntensity: 0.75,
          map: lightBarGuardMap,
        } )
        lightBarGuardMat.map.wrapS = lightBarGuardMat.map.wrapT = lightBarGuardMat.emissiveMap.wrapS = lightBarGuardMat.emissiveMap.wrapT = THREE.RepeatWrapping
        lightBarGuardMat.map.repeat.set( 0.025, 0.1 )
        lightBarGuardMat.emissiveMap.repeat.set( 0.025, 0.1 )
        const lightBarGuard = new THREE.Mesh( lightBarGuardGeo, lightBarGuardMat )
        lightBarGuard.castShadow = lightBarGuard.receiveShadow = true
        lightBarGuard.position.set( -42.5, -403.25, 94 )
        lightBarGuard.rotateX( threeMake.degToRad( 90 ) )

        const lightBarGuardCapGeo = new THREE.SphereGeometry( 12, 10, 10, 0, Math.PI, 0, Math.PI / 2 )
        const lightBarGuardCap = new THREE.Mesh( lightBarGuardCapGeo, lightBarGuardMat )
        lightBarGuardCap.castShadow = lightBarGuardCap.receiveShadow = true
        lightBarGuardCap.material.map.rotation = threeMake.degToRad( 90 )
        lightBarGuardCap.rotateY( threeMake.degToRad( 90 ) )
        lightBarGuardCap.position.y = 50
        lightBarGuard.add( lightBarGuardCap )

        const lightBarShape = SVGLoader.createShapes( paths[2] )
        const glowGeom = new THREE.LatheGeometry( lightBarShape[0].getPoints(), 16 )
        const glowMate = new THREE.MeshPhysicalMaterial( {
          color: g.bttf.lampLightBulbColors.red,
          emissive: g.bttf.lampLightBulbColors.red,
          emissiveIntensity: 0,
        } )
        const glowMesh = new THREE.Mesh( glowGeom, glowMate )
        glowMesh.name = `lampPostPair_${whichPair}_leftLampBackBulb`
        glowMesh.position.x = -4
        glowMesh.position.y = -46
        lightBarGuard.add( glowMesh )
        // no idea why the glowMesh doesn't work in this case... use it and the element never appears
        // const glowMesh = threeX.GeometricGlowMesh( false, glowGeom, [ 0, 0, 0 ], 0x1efcb2 )
        // glowMesh.object3d.position.y = -40
        // lightBarGuardMsh.add( glowMesh.object3d )
        supportRod.add( lightBarGuard )

        leftLampGyro.add( supportRod )
        const supportRodOpposite = supportRod.clone()
        supportRodOpposite.children[1].children[1].name = `lampPostPair_${whichPair}_leftLampFrontBulb`
        supportRodOpposite.children[1].children[1].material = new THREE.MeshPhysicalMaterial( {
          color: g.bttf.lampLightBulbColors.yellow,
          emissive: g.bttf.lampLightBulbColors.yellow,
          emissiveIntensity: 5,
        } )
        supportRodOpposite.position.x = 36
        supportRodOpposite.position.z = -42
        supportRodOpposite.rotation.y = threeMake.degToRad( 180 )
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
          color: threeMake.color( 0x666666 ),
          side: THREE.DoubleSide,
          emissive: threeMake.color( 0x666666 ),
          emissiveMap: floaterBaseDiamondEmissiveMap,
          map: floaterBaseDiamondMap,
        } )
        floaterBaseDiamondMat.map.wrapS = floaterBaseDiamondMat.map.wrapT = floaterBaseDiamondMat.emissiveMap.wrapS = floaterBaseDiamondMat.emissiveMap.wrapT = THREE.RepeatWrapping
        floaterBaseDiamondMat.map.repeat.set( 0.01, 0.01 )
        floaterBaseDiamondMat.emissiveMap.repeat.set( 0.01, 0.01 )
        const floaterBaseDiamond = new THREE.Mesh( floaterBaseDiamondGeo, floaterBaseDiamondMat )
        floaterBaseDiamond.castShadow = floaterBaseDiamond.receiveShadow = true
        floaterBaseDiamond.rotateX( threeMake.degToRad( 90 ) )
        floaterBaseDiamond.rotateZ( threeMake.degToRad( -90 ) )
        floaterBaseDiamond.position.y = 32
        floaterBaseDiamond.position.x = -54
        floaterBase.add( floaterBaseDiamond )

        const floaterBaseCylinderGeo = new THREE.CylinderGeometry( 18, 96, 12, 16, 1, true )
        const floaterBaseCylinderMap = threeMake.textureLoader( assRoughMetal )
        const floaterBaseCylinderEmissiveMap = threeMake.textureLoader( assRoughMetalEmissive )
        const floaterBaseCylinderMat = new THREE.MeshPhysicalMaterial( {
          metalness: 0,
          roughness: 0.8,
          color: threeMake.color( 0x666666 ),
          side: THREE.DoubleSide,
          emissive: threeMake.color( 0x666666 ),
          emissiveMap: floaterBaseCylinderEmissiveMap,
          map: floaterBaseCylinderMap,
        } )
        floaterBaseCylinderMat.map.wrapS = floaterBaseCylinderMat.map.wrapT = floaterBaseCylinderMat.emissiveMap.wrapS = floaterBaseCylinderMat.emissiveMap.wrapT = THREE.RepeatWrapping
        floaterBaseCylinderMat.map.repeat.set( 1, 1 )
        floaterBaseCylinderMat.emissiveMap.repeat.set( 1, 1 )
        const floaterBaseCylinder = new THREE.Mesh( floaterBaseCylinderGeo, floaterBaseCylinderMat )
        floaterBaseCylinder.castShadow = floaterBaseCylinder.receiveShadow = true
        floaterBaseCylinder.rotateY( threeMake.degToRad( -90 ) )
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
          color: threeMake.color( 0x454545 ),
          side: THREE.DoubleSide,
          emissive: threeMake.color( 0x454545 ),
          emissiveMap: floaterBaseBumperEmissiveMap,
          map: floaterBaseBumperMap,
        } )
        floaterBaseBumperMat.map.wrapS = floaterBaseBumperMat.map.wrapT = floaterBaseBumperMat.emissiveMap.wrapS = floaterBaseBumperMat.emissiveMap.wrapT = THREE.RepeatWrapping
        floaterBaseBumperMat.map.repeat.set( 0.1, 0.015 )
        floaterBaseBumperMat.emissiveMap.repeat.set( 0.1, 0.015 )
        floaterBaseBumperMat.map.offset.y = floaterBaseBumperMat.emissiveMap.offset.y = 0.75
        const floaterBaseBumper = new THREE.Mesh( floaterBaseBumperGeo, floaterBaseBumperMat )
        floaterBaseBumper.castShadow = floaterBaseBumper.receiveShadow = true
        floaterBaseBumper.rotateX( threeMake.degToRad( 90 ) )
        floaterBaseBumper.position.set( -94.5, -31.05, -131.5 )
        floaterBase.add( floaterBaseBumper )

        const levitatorTopGeo = new THREE.CylinderGeometry( 72, 96, 36, 16, 1, true )
        const levitatorTopMap = threeMake.textureLoader( assGoldRing )
        const levitatorTopEmissiveMap = threeMake.textureLoader( assGoldRingEmissive )
        const levitatorTopMat = new THREE.MeshPhysicalMaterial( {
          metalness: 1,
          roughness: 0.15,
          color: threeMake.color( 0xedd09d ),
          side: THREE.DoubleSide,
          emissive: threeMake.color( 0xedd09d ),
          emissiveMap: levitatorTopEmissiveMap,
          map: levitatorTopMap,
        } )
        const levitatorTop = new THREE.Mesh( levitatorTopGeo, levitatorTopMat )
        levitatorTop.castShadow = levitatorTop.receiveShadow = true
        levitatorTop.position.set( 16.5, -105, -21 )
        floaterBase.add( levitatorTop )

        const levitatorMiddleGeo = new THREE.CylinderGeometry( 96, 24, 108, 16, 1, true )
        const levitatorMiddleMap = threeMake.textureLoader( assGoldMetal )
        const levitatorMiddleEmissiveMap = threeMake.textureLoader( assGoldMetalEmissive )
        const levitatorMiddleMat = new THREE.MeshPhysicalMaterial( {
          metalness: 1,
          roughness: 0.15,
          color: threeMake.color( 0xedd09d ),
          side: THREE.DoubleSide,
          emissive: threeMake.color( 0xedd09d ),
          emissiveMap: levitatorMiddleEmissiveMap,
          map: levitatorMiddleMap,
        } )
        const levitatorMiddle = new THREE.Mesh( levitatorMiddleGeo, levitatorMiddleMat )
        levitatorMiddle.castShadow = levitatorMiddle.receiveShadow = true
        levitatorMiddle.position.set( 16.5, -177, -21 )
        floaterBase.add( levitatorMiddle )

        const levitatorCapGeo = new THREE.SphereGeometry( 27.75, 16, 6, 0, Math.PI * 2, Math.PI * ( 2 / 3 ), Math.PI * ( 1 / 3 ) )
        const levitatorCap = new THREE.Mesh( levitatorCapGeo, levitatorMiddleMat )
        levitatorCap.castShadow = levitatorCap.receiveShadow = true
        levitatorCap.position.set( 16.5, -217, -21 )
        levitatorCap.rotateY( threeMake.degToRad( 90 ) )
        floaterBase.add( levitatorCap )

        leftLampGyro.add( floaterBase )

        const leftLamp = new THREE.Group()
        leftLamp.name = `leftLamp${whichPair}`
        leftLampGyro.name = `leftLampGyro${whichPair}`

        leftLamp.add( leftLampGyro )
        threeMesh.mirrorMesh( leftLamp )
        leftLamp.rotateY( threeMake.degToRad( 90 ) )

        lampPostPair.add( leftLamp )
        pairLampPostsInto( lampPostPair, tvp )
      },
    )
  }
  const leftLamp = lampPostPair.children[0]
  const box = new THREE.Box3().setFromObject( leftLamp )
  const leftLampSizeV3 = new THREE.Vector3()
  box.getSize( leftLampSizeV3 )
  g.bttf.lampPosts.clearance.w = leftLampSizeV3.x
  g.bttf.lampPosts.clearance.cx = g.bttf.lampPosts.clearance.w / 2
  g.bttf.lampPosts.clearance.cy = leftLampSizeV3.y / 2
  leftLamp.position.x = randoNum( ( tvp.w * g.bttf.lampPostPairs.position.x.min ) + g.bttf.lampPosts.clearance.cx, ( tvp.w * g.bttf.lampPostPairs.position.x.max ) - g.bttf.lampPosts.clearance.cx - g.bttf.lampPostPairs.clearance ) - tvp.cx
  leftLamp.position.y = randoNum( ( tvp.h * g.bttf.lampPostPairs.position.y.min ) + g.bttf.lampPosts.clearance.cy, ( tvp.h * g.bttf.lampPostPairs.position.y.max ) - g.bttf.lampPosts.clearance.cy ) - tvp.cy

  const rightLamp = leftLamp.clone()
  rightLamp.name = `rightLamp${whichPair}`
  rightLamp.children[0].name = `rightLampGyro${whichPair}`
  threeMesh.mirrorMesh( rightLamp )
  rightLamp.position.x += g.bttf.lampPostPairs.clearance + g.bttf.lampPosts.clearance.w
  lampPostPair.add( rightLamp )

  rightLamp.children[0].children[0].children[1].children[1].name = `lampPostPair_${whichPair}_rightLampFrontBulb`
  rightLamp.children[0].children[0].children[1].children[1].material = new THREE.MeshPhysicalMaterial( {
    color: g.bttf.lampLightBulbColors.yellow,
    emissive: g.bttf.lampLightBulbColors.yellow,
    emissiveIntensity: 5,
  } )
  rightLamp.children[0].children[1].children[1].children[1].name = `lampPostPair_${whichPair}_rightLampBackBulb`
  rightLamp.children[0].children[1].children[1].children[1].material = new THREE.MeshPhysicalMaterial( {
    color: g.bttf.lampLightBulbColors.red,
    emissive: g.bttf.lampLightBulbColors.red,
    emissiveIntensity: 0,
  } )

  addSpotLightsToLampPostPair( lampPostPair )
  wobbleLampPosts( lampPostPair )
}

const randoRotateAxis = ( min = 10, max = 25 ) => threeMake.degToRad( Number( `${randoNum() ? '' : '-'}${randoNum( min, max )}` ) ) / 2

const randoRotateDuration = ( min = 5.5, max = 7.5 ) => randoNum( min * 10, max * 10 ) / 10

const wobbleLampPosts = lampPostPair => {
  lampPostPair.children.forEach( lampPost => {
    const lpTL = new TL( { defaults: { overwrite: 'auto' } } )
    const randoRotate = {
      x: randoRotateAxis(),
      y: randoRotateAxis(),
      z: randoRotateAxis(),
    }
    lpTL.fromTo( lampPost.children[0].rotation, {
      x: -randoRotate.x,
    }, {
      duration: randoRotateDuration(),
      ease: 'power1.inOut',
      x: randoRotate.x,
      repeat: -1,
      yoyo: true,
    }, '>' )
      .fromTo( lampPost.children[0].rotation, {
        y: randoRotate.y,
      }, {
        duration: randoRotateDuration(),
        ease: 'power1.inOut',
        y: -randoRotate.y,
        repeat: -1,
        yoyo: true,
      }, '<' )
      .fromTo( lampPost.children[0].rotation, {
        z: randoRotate.z,
      }, {
        duration: randoRotateDuration(),
        ease: 'power1.inOut',
        z: -randoRotate.z,
        repeat: -1,
        yoyo: true,
      }, '<' )
      .fromTo( lampPost.children[0].position, {
        y: -randoNum( 20, 42 ),
      }, {
        duration: randoRotateDuration( 2, 4.2 ),
        ease: 'power1.inOut',
        y: randoNum( 20, 42 ),
        repeat: -1,
        yoyo: true,
      }, '<' )
  } )
}

const setTunnelFloaters = tvp => {
  setLampPosts( tvp )
  setSignPosts()
}

const addSpotLightsToLampPostPair = lampPostPair => {
  const bulbs = {
    back: [ lampPostPair.getObjectByName( `${lampPostPair.name}_leftLampBackBulb`, true ), lampPostPair.getObjectByName( `${lampPostPair.name}_rightLampBackBulb`, true ) ],
    front: [ lampPostPair.getObjectByName( `${lampPostPair.name}_leftLampFrontBulb`, true ), lampPostPair.getObjectByName( `${lampPostPair.name}_rightLampFrontBulb`, true ) ],
  }
  Object.keys( bulbs ).forEach( bulbSet => {
    bulbs[bulbSet].forEach( bulb => {
      g.bttf.blink[bulb.name] = false
      const spotLight = new THREE.SpotLight( bulbSet === 'back' ? g.bttf.lampLightBulbColors.red : g.bttf.lampLightBulbColors.yellow, bulbSet === 'back' ? 0 : 1.5, 0, threeMake.degToRad( 12 ), 0.25 )
      spotLight.castShadow = true // default false
      spotLight.position.x = -18
      spotLight.position.y = 55
      // g.bttf.scene.add( new THREE.SpotLightHelper( spotLight ) )
      bulb.add( spotLight )
      g.bttf.lampLights[bulb.name] = spotLight
      const spotLightTarget = new THREE.Mesh( new THREE.TetrahedronGeometry(), new THREE.MeshBasicMaterial( { opacity: 0, depthWrite: false, transparent: true } ) )
      spotLightTarget.position.x = -256
      spotLightTarget.position.y = 55
      bulb.add( spotLightTarget )
      spotLight.target = spotLightTarget
    } )
  } )
  if ( !g.bttf.inScene.lampLightBulbs ) g.bttf.inScene.lampLightBulbs = []
  g.bttf.inScene.lampLightBulbs.push( bulbs )

  console.log( { gBTTF: g.bttf } )
}

const setLampPosts = tvp => {
  const lampPostPair = new THREE.Group()
  lampPostPair.visible = false
  if ( !g.bttf.inScene.lampPostPairs ) g.bttf.inScene.lampPostPairs = []
  lampPostPair.name = `lampPostPair_${padStr( g.bttf.inScene.lampPostPairs.length )}`
  g.bttf.inScene.tunnel.children[g.bttf.inScene.tunnel.children.length - 1].add( lampPostPair )
  g.bttf.inScene.lampPostPairs.push( lampPostPair )
  pairLampPostsInto( lampPostPair, tvp )
}

const setSignPosts = () => {

}

export { setTunnelEnvironment }
