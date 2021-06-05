import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'
import { gsap, TimelineMax as TL } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

import assSmoke from 'url:/src/img/smoke/smoke_3.png'
import assSmokeAlpha from 'url:/src/img/smoke/smoke_3_alpha.png'
import g from './glob'
import {
  setModel, toggleFlightMode, toggleFlyAlongPath, toggleWheelsDrop,
} from './future'
import { makeDeLorean } from './delorean'
import {
  devLog, ifFunctionThenCall, isFunction, padStr, randOnum, setAddOn,
} from './utils'

gsap.registerPlugin( Draggable, InertiaPlugin )

const setThree = ( controls = false, stats = false, smoke = true ) => {
  if ( !g.three ) {
    if ( g.el.future.classList.contains( 'model' ) ) {
      if ( g.el.model ) setModel()
      setAddOn( '#toggleFlyAlongPath', 'click', toggleFlyAlongPath )
      setAddOn( '#toggleFlightMode', 'click', toggleFlightMode )
      setAddOn( '#toggleWheelsDrop', 'click', toggleWheelsDrop )
    }

    g.three = {
      ani: {
        flr: [],
        wls: [],
        glo: [],
      },
      clk: new THREE.Clock(),
      drg: false,
      flm: true,
      flr: [],
      grp: {},
      lve: false,
      m: {
        axis: new THREE.Vector3(),
        // end: [],
        line: [],
        mp: 0,
        path: [],
        rotZ: [ 0, 90, -360 ],
        // strt: [],
        up: [ new THREE.Vector3( 0, -1, 0 ), new THREE.Vector3( 0, 1, 0 ) ],
      },
      mkr: {},
      mov: false,
      msh: {
        alphaTest: 0.36,
        side: THREE.DoubleSide,
        transparent: true,
      },
      on: false,
      obj: {},
      x: {},
      xy: [ 'x', 'y' ],
      xyz: [ 'x', 'y', 'z' ],
    }

    //* from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
    g.three.x.createAtmosphericMaterial = alphaMap => {
      const vertexShader = [
        'varying vec3 vVertexWorldPosition;',
        'varying vec3 vVertexNormal;',

        'varying vec4 vFragColor;',

        'void main(){',
        ' vVertexNormal = normalize(normalMatrix * normal);',

        ' vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;',

        ' // set gl_Position',
        ' gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        '}',
      ].join( '\n' )
      const fragmentShader = [
        'uniform vec3 glowColor;',
        'uniform float coeficient;',
        'uniform float power;',

        'varying vec3 vVertexNormal;',
        'varying vec3 vVertexWorldPosition;',

        'varying vec4 vFragColor;',

        'void main(){',
        ' vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
        ' vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
        ' viewCameraToVertex = normalize(viewCameraToVertex);',
        ' float intensity  = pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
        ' gl_FragColor  = vec4(glowColor, intensity);',
        '}',
      ].join( '\n' )

      // create custom material from the shader code above
      //   that is within specially labeled script tags
      const material = new THREE.ShaderMaterial( {
        uniforms: {
          coeficient: {
            type: 'f',
            value: 1.0,
          },
          power: {
            type: 'f',
            value: 2,
          },
          glowColor: {
            type: 'c',
            value: new THREE.Color( 'pink' ),
          },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        // blending : THREE.AdditiveBlending,
        transparent: true,
        // depthWrite: false,
        // alphaMap,
      } )
      return material
    }

    g.three.x.GeometricGlowMesh = ( geoInner, alphaMap, [ offsetX, offsetY, offsetZ ] = [ 0, 0, 0 ] ) => {
      const object3d = new THREE.Object3D()

      geoInner.scale( 1.01, 1.01, 1.01 )
      geoInner.translate( 0, 2, 0 )
      const matInner = g.three.x.createAtmosphericMaterial( alphaMap )
      matInner.uniforms.glowColor.value = new THREE.Color( 0x00D8FF )
      matInner.uniforms.coeficient.value = 1.3
      matInner.uniforms.power.value = 1.3
      const innerMesh = new THREE.Mesh( geoInner, [ new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } ), matInner ] )
      g.three.ani.glo.push( { wax: false, msh: innerMesh } )
      object3d.add( innerMesh )

      const geoOuter = geoInner.clone()
      geoOuter.scale( 1.025, 1.025, 1.025 )
      geoOuter.translate( offsetX, offsetY, offsetZ )
      const matOuter = g.three.x.createAtmosphericMaterial( alphaMap )
      matOuter.uniforms.glowColor.value = new THREE.Color( 0x00D8FF )
      matOuter.uniforms.coeficient.value = 0.26
      matOuter.uniforms.power.value = 0.9
      matOuter.side = THREE.BackSide
      const outerMesh = new THREE.Mesh( geoOuter, [ new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } ), matOuter ] )
      g.three.ani.glo.push( { wax: false, msh: outerMesh } )
      object3d.add( outerMesh )

      return {
        object3d,
        innerMesh,
        outerMesh,
      }
    }

    g.three.mkr.mirrorMesh = msh => {
      const flipMe = new THREE.Vector3( 1, 1, 1 )
      flipMe.x *= -1
      msh.scale.multiply( flipMe )
    }

    g.three.mkr.scaleMesh = ( msh, scale, axis ) => {
      const scaleMe = new THREE.Vector3( 1, 1, 1 )
      if ( axis ) scaleMe[axis] *= scale
      else {
        g.three.xy.forEach( ax => {
          scaleMe[ax] *= scale
        } )
      }
      msh.scale.multiply( scaleMe )
    }

    g.three.mkr.createVector2s = v2s => {
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

    g.three.mkr.createVector3s = v3s => {
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

    g.three.mkr.visibleHeightAtZDepth = depth => {
      // compensate for cameras not positioned at z=0
      const cameraOffset = g.three.camera.position.z
      if ( depth < cameraOffset ) depth -= cameraOffset
      else depth += cameraOffset

      // vertical fov in radians
      const vFOV = ( g.three.camera.fov * Math.PI ) / 180

      // Math.abs to ensure the result is always positive
      return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth )
    }

    g.three.mkr.visibleSizeAtZDepth = depth => {
      const h = g.three.mkr.visibleHeightAtZDepth( depth )
      return {
        h,
        w: h * g.three.camera.aspect,
      }
    }

    g.three.mkr.matchMove = ( tgt, obj ) => {
      const dragBox = tgt.getBoundingClientRect()
      const container = g.el.future.getBoundingClientRect()
      const viewPort = g.three.mkr.visibleSizeAtZDepth( obj.position.z )
      obj.position.x = viewPort.w * ( ( dragBox.x + ( dragBox.width / 2 ) - ( container.width / 2 ) ) / container.width )
      obj.position.y = -viewPort.h * ( ( dragBox.y + ( dragBox.height / 2 ) - ( container.height / 2 ) ) / container.height )
      tgt.innerHTML = `<p>container: {x: ${container.x}, y: ${container.y}, w: ${container.width}, h: ${container.height}}</p><p>dragBox: {cx: ${dragBox.x + ( dragBox.width / 2 )}, cy: ${dragBox.y + ( dragBox.height / 2 )}}</p><p>viewPort: {w: ${viewPort.w}, h: ${viewPort.h}}</p><p>dL center: {x: ${obj.position.x}, y: ${obj.position.y}}`
    }

    g.three.mkr.allowDragging = () => {
      Draggable.create( g.el.draggable, {
        bounds: g.el.deLorean,
        inertia: true,
        onDragStart: function () {
          g.three.drg = true
        },
      } )
    }

    g.three.mkr.backItUp = () => {
      g.three.mov = false
      ifFunctionThenCall( g.three.cleanUp )
      g.tL.dL = new TL( { defaults: { overwrite: 'auto' } } )
      g.tL.dL.to( g.three.mkr.inScene.deLorean.position, {
        duration: 9,
        ease: 'power2.in',
        z: '-=1200',
      } )
        .to( g.three.mkr.inScene.deLorean.rotation, {
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
        .to( g.three.mkr.inScene.deLorean.rotation, {
          duration: 3.5,
          ease: 'power2.in',
          x: THREE.Math.degToRad( 30 ),
          repeat: 1,
          yoyo: true,
        }, '<2' )
        .to( g.three.mkr.inScene.deLorean.position, {
          duration: 5,
          ease: 'power2.in',
          x: '+=350',
          y: '+=200',
        }, '<' )
        .to( g.three.mkr.inScene.carGyro.rotation, {
          duration: 3.5,
          ease: 'power2.in',
          x: THREE.Math.degToRad( 75 ),
          y: -THREE.Math.degToRad( 15 ),
          z: THREE.Math.degToRad( 20 ),
          repeat: 1,
          yoyo: true,
        }, '>' )
        .to( g.three.mkr.inScene.deLorean.position, {
          duration: 4,
          ease: 'power2.out',
          onComplete: function () {
            g.three.mkr.allowDragging()
            g.tL.dL.to( g.three.mkr.inScene.carGyro.rotation, {
              duration: 5.5,
              ease: 'power1.inOut',
              x: `+=${THREE.Math.degToRad( 30 )}`,
              repeat: -1,
              yoyo: true,
            }, '>' )
              .to( g.three.mkr.inScene.carGyro.rotation, {
                duration: 4.5,
                ease: 'power1.inOut',
                y: `+=${THREE.Math.degToRad( 30 )}`,
                repeat: -1,
                yoyo: true,
              }, '<' )
              .to( g.three.mkr.inScene.carGyro.rotation, {
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

    g.three.scene = new THREE.Scene()
    g.three.aspectRatio = g.main.w / g.main.h
    g.three.camera = new THREE.PerspectiveCamera( 75, g.three.aspectRatio, 0.1, 10000 )

    g.three.renderer = new THREE.WebGLRenderer( { alpha: true } )
    g.three.renderer.shadowMap.enabled = true
    g.three.renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
    // g.three.renderer.outputEncoding = THREE.sRGBEncoding
    g.three.renderer.setPixelRatio( g.window.devicePixelRatio )

    g.three.mkr.size = () => {
      g.three.cvs = {
        w: g.main.w,
        h: g.main.h,
      }
      g.three.renderer.setSize( g.three.cvs.w, g.three.cvs.h )
    }
    g.three.mkr.size()
    g.el.deLorean.appendChild( g.three.renderer.domElement )

    if ( controls ) g.three.camControls = new OrbitControls( g.three.camera, g.three.renderer.domElement )
    // if ( g.three.camControls ) {
    //   g.three.xyz.forEach( axis => {
    //     g.three.camera.position[axis] = 1000
    //   } )
    // } else {
    g.three.camera.position.y = 176
    // }

    g.three.mkr.textureLoader = txtAss => new THREE.TextureLoader().load( txtAss )

    g.three.mkr.setTextureAnimator = ( flare, flr, hTiles, vTiles, totTiles, tileDisplayDuration ) => {
      // note: texture passed by reference, will be updated by the update function // we hope
      // how many images does this spritesheet contain?
      //  usually equals tilesHoriz * tilesVert, but not necessarily,
      //  if there at blank tiles at the bottom of the spritesheet.

      flare.material.map.wrapS = flare.material.map.wrapT = THREE.RepeatWrapping
      flare.material.map.repeat.set( 1 / hTiles, 1 / vTiles )

      return milliSec => {
        g.three.flr[flr].cdt += milliSec
        while ( g.three.flr[flr].cdt > tileDisplayDuration ) {
          g.three.flr[flr].cdt -= tileDisplayDuration
          let nextTile = g.three.flr[flr].ctl
          while ( nextTile === g.three.flr[flr].ctl ) nextTile = randOnum( 0, totTiles - 1 )
          g.three.flr[flr].ctl = nextTile
          const currentColumn = g.three.flr[flr].ctl % hTiles
          flare.material.map.offset.x = currentColumn / hTiles
          const currentRow = Math.floor( g.three.flr[flr].ctl / hTiles )
          flare.material.map.offset.y = currentRow / vTiles
        }
      }
    }

    g.three.mkr.update = () => {
      // eslint-disable-next-line eqeqeq
      if ( g.three.scene.running && g.el.deLorean.style.opacity == 1 ) {
        const delta = g.three.clk.getDelta()

        if ( smoke ) g.three.mkr.evolveSmoke( delta )

        // ROCKET FLARE TEXTURES SWAP
        g.three.ani.flr.forEach( ani => {
          ani( 1000 * delta )
        } )

        g.three.xyz.forEach( axis => {
          g.el[`threeCam${axis.toUpperCase()}`].innerHTML = g.three.camera.rotation[axis].toFixed( 3 )
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
          g.three.mkr.inScene.wheelRockets.forEach( ( flareSet, i ) => {
            if ( flareSet.scale.x > 0.2 ) {
              g.three.mkr.scaleMesh( flareSet, 0.75 )
            } else {
              flareSet.scale.set( 0 )
              g.three.mkr.inScene.hubCaps[i].material.map.offset.x = 0.5
              if ( i < 2 ) {
                const side = i % 2
                const whereWheel = {
                  mechsRadY: g.three.mkr.inScene.wheelMechs[side].rotation.y,
                  mechsPosX: g.three.mkr.inScene.wheelMechs[side].position.x,
                  mechsPosZ: g.three.mkr.inScene.wheelMechs[side].position.z,
                  wheelsRadY: g.three.mkr.inScene.wheelSides[side].rotation.y,
                  wheelsPosX: g.three.mkr.inScene.wheelSides[side].position.x,
                  wheelsPosZ: g.three.mkr.inScene.wheelSides[side].position.z,
                }
                if ( side ) {
                  // RIGHT SIDE
                  if ( whereWheel.wheelsRadY > -g.three.mkr.wheels.rotTarget ) g.three.mkr.inScene.wheelSides[side].rotateY( -g.three.mkr.wheels.rotIncRad )
                  if ( whereWheel.wheelsPosX < -g.three.mkr.wheels.posTarget.x ) g.three.mkr.inScene.wheelSides[side].position.x += 2
                  if ( whereWheel.mechsPosX < -g.three.mkr.wheels.armTarget.x ) g.three.mkr.inScene.wheelMechs[side].position.x += 1.8571
                  if ( whereWheel.mechsRadY > 0 ) g.three.mkr.inScene.wheelMechs[side].rotateY( -0.00698131 )
                } else {
                  // LEFT SIDE
                  if ( whereWheel.wheelsRadY < g.three.mkr.wheels.rotTarget ) g.three.mkr.inScene.wheelSides[side].rotateY( g.three.mkr.wheels.rotIncRad )
                  if ( whereWheel.wheelsPosX > g.three.mkr.wheels.posTarget.x ) g.three.mkr.inScene.wheelSides[side].position.x -= 2
                  if ( whereWheel.mechsPosX > g.three.mkr.wheels.armTarget.x ) g.three.mkr.inScene.wheelMechs[side].position.x -= 1.8571
                  if ( whereWheel.mechsRadY < 0 ) g.three.mkr.inScene.wheelMechs[side].rotateY( 0.00698131 )
                }
                if ( whereWheel.wheelsPosZ > g.three.mkr.wheels.posTarget.z ) g.three.mkr.inScene.wheelSides[side].position.z -= 1.6
                if ( whereWheel.mechsPosZ > g.three.mkr.wheels.armTarget.z ) g.three.mkr.inScene.wheelMechs[side].position.z -= 0.9144
              }
            }
          } )
        }

        if ( g.three.lve ) g.three.mkr.inScene.flyAway.position.z -= 1

        if ( g.three.mov ) g.three.mkr.backItUp()
        // if ( g.three.mov ) g.three.mkr.moveAlongPath( g.three.grp.deLorean, 0 )

        if ( g.three.drg ) g.three.mkr.matchMove( g.el.draggable, g.three.grp.deLorean )

        // // TILT TEST
        // g.three.xyz.forEach(axis => {
        //   g.three.mkr.inScene.deLorean.rotation[axis] = g.three.mkr.tlt[axis] ? THREE.Math.degToRad(THREE.Math.radToDeg(g.three.mkr.inScene.deLorean.rotation[axis]) + 1) : THREE.Math.degToRad(THREE.Math.radToDeg(g.three.mkr.inScene.deLorean.rotation[axis]) - 1)
        //   if (g.three.mkr.inScene.deLorean.rotation[axis] > THREE.Math.degToRad(20) || g.three.mkr.inScene.deLorean.rotation[axis] < THREE.Math.degToRad(-20)) g.three.mkr.tlt[axis] = !g.three.mkr.tlt[axis]
        // })
      }
    }

    // it remains to be seen whether this approach will actually save any time or code... I think it will at least cut down some of three's repetition
    // just remember that ALL NAME/ID KEYS IN THE FOLLOWING OBJECT MUST BE UNIQUE, REGARDLESS OF NESTING LEVEL
    g.three.makeObjs = {
      deLorean: makeDeLorean(),
    }
    Object.keys( g.three.makeObjs ).forEach( obj => makeThreeObj( obj, g.three.makeObjs[obj] ) )

    console.log( { three: g.three } )
    Object.keys( g.three.makeObjs ).forEach( grp => g.three.scene.add( g.three.grp[grp] ) )

    g.three.grp.smoke = new THREE.Group()
    g.three.grp.smoke.name = 'smoke'
    g.three.scene.add( g.three.grp.smoke )
    g.three.mkr.inScene.smoke = g.three.grp.smoke
    if ( smoke ) {
      const smokeTexture = g.three.mkr.textureLoader( assSmoke )
      const smokeAlphaTexture = g.three.mkr.textureLoader( assSmokeAlpha )
      const smokeMaterial = new THREE.MeshLambertMaterial( {
        color: 0x00dddd, map: smokeTexture, transparent: true, alphaMap: smokeAlphaTexture,
      } )
      const smokeDepth = 3500
      const smokeGeo = new THREE.PlaneGeometry( smokeDepth, smokeDepth, 25, 25 )
      const viewPort = g.three.mkr.visibleSizeAtZDepth( smokeDepth )

      for ( let p = 0; p < 99; p++ ) {
        const smokeMat = smokeMaterial.clone()
        smokeMat.opacity = randOnum( 23, 100 ) / 100
        const particle = new THREE.Mesh( smokeGeo, smokeMat )
        particle.name = `smokeCloud_${padStr( p )}`
        particle.position.set( randOnum( 0, viewPort.w ) - ( viewPort.w / 2 ), randOnum( 0, viewPort.h ) - ( viewPort.h / 2 ), Math.random() * 1000 - smokeDepth )
        particle.rotation.z = Math.random() * 360
        g.three.grp.smoke.children.push( particle )
      }

      g.three.mkr.evolveSmoke = delta => {
        const rotateSmoke = delta * 0.2
        let sp = g.three.grp.smoke.children.length
        while ( sp-- ) {
          if ( sp % 2 ) g.three.grp.smoke.children[sp].rotation.z += rotateSmoke
          else g.three.grp.smoke.children[sp].rotation.z -= rotateSmoke
        }
      }
    }

    console.log( g.three.scene )

    ifFunctionThenCall( g.three.mkr.setMades )

    if ( g.three.camControls ) {
      g.three.xyz.forEach( axis => {
        g.three.camera.position[axis] = 1000
      } )
      g.three.camControls.target.copy( g.three.grp.deLorean.position )
      g.three.camControls.update()
    }

    g.three.lights = [ new THREE.AmbientLight( 0x404040, 0.125 ), new THREE.DirectionalLight( 0xffffff, 0.5 ) ]
    g.three.lights.forEach( light => {
      if ( light instanceof THREE.DirectionalLight ) {
        light.target = g.three.mkr.inScene.smoke
        light.castShadow = true // default false
        light.shadow.camera.far = 5000 // default 500
        light.shadow.camera.left = -2500
        light.shadow.camera.right = 2500
        light.shadow.camera.top = 2500
        light.shadow.camera.bottom = -2500
      // g.three.scene.add( new THREE.DirectionalLightHelper( light, 500 ) )
      // g.three.scene.add( new THREE.CameraHelper( light.shadow.camera ) )
      }
      g.three.scene.add( light )
    } )

    g.three.mkr.reSize = () => {
      g.three.mkr.size()
      g.three.aspectRatio = g.three.renderer.domElement.width / g.three.renderer.domElement.height
      g.three.camera.aspect = g.three.aspectRatio
      g.three.camera.updateProjectionMatrix()
    }

    if ( stats ) {
      g.three.stats = new Stats()
      g.three.stats.showPanel( 0 ) // 0: fps, 1: ms, 2: mb, 3+: custom
      g.three.stats.showPanel( 1 )
      g.three.stats.showPanel( 2 )
      g.three.stats.dom.id = 'threeStats'
      g.three.stats.dom.classList.add( 'threeDev' )
      g.el.deLorean.appendChild( g.three.stats.dom )
    }

    g.three.ani.go = () => {
      if ( stats ) g.three.stats.begin()
      // eslint-disable-next-line no-undef
      requestAnimationFrame( g.three.ani.go )
      g.three.renderer.render( g.three.scene, g.three.camera )
      g.three.mkr.update()
      if ( stats ) g.three.stats.end()
    }

    if ( controls ) g.three.scene.add( new THREE.AxesHelper( 500 ) )
  }
}

const setThreeObj = ( obj, makeObj ) => {
  if ( makeObj.position ) translateAxes( obj, makeObj )
  if ( makeObj.rotation ) rotateAxes( obj, makeObj )
  if ( makeObj.matrix ) setMatrix( obj, makeObj )
}

const makeThreeObj = ( obj, makeObj ) => {
  if ( obj && makeObj ) {
    if ( makeObj.children ) {
      makeObj.geo = 'group'
      Object.keys( makeObj.children ).forEach( childObj => makeThreeObj( childObj, makeObj.children[childObj] ) )
    } else if ( makeObj.msh instanceof THREE.Mesh ) {
      if ( g.three.obj[obj] ) devLog( `FUCKER! obj "${obj}" already exists!` )
      g.three.obj[obj] = { msh: makeObj.msh }
      g.three.obj[obj].msh.name = obj
      setThreeObj( obj, makeObj )
      return
    } else if ( !makeObj.geo ) {
      makeObj.geo = 'plane'
    }
    let makeFail, makeMesh
    if ( makeObj.geo !== 'group' && makeObj.struct && makeObj.struct.length && makeObj.struct.length >= 2 ) {
      if ( makeObj.geo !== 'group' ) {
        if ( g.three.obj[obj] ) devLog( `FUCKER! obj "${obj}" already exists!` )
        g.three.obj[obj] = {}
      }
      makeMesh = { ...g.three.msh }
      if ( makeObj.msh ) {
        Object.keys( makeObj.msh ).forEach( mshProp => {
          makeMesh[mshProp] = makeObj.msh[mshProp]
        } )
      }
      if ( !makeObj.mat ) makeObj.mat = THREE.MeshBasicMaterial
      if ( makeObj.msh && typeof makeObj.msh.depthWrite !== 'undefined' ) makeObj.mat.depthWrite = makeObj.msh.depthWrite
    }
    switch ( makeObj.geo ) {
      case 'cylinder':
        if ( g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] && makeObj.struct[3] ) {
          if ( typeof makeObj.struct[4] === 'undefined' ) makeObj.struct[4] = 1 // heightSegments
          if ( typeof makeObj.struct[5] === 'undefined' ) makeObj.struct[5] = false // openEnded
          g.three.obj[obj].geo = new THREE.CylinderGeometry( makeObj.struct[0], makeObj.struct[1], makeObj.struct[2], makeObj.struct[3], makeObj.struct[4], makeObj.struct[5] )
        } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'sphere':
        if ( g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] ) {
          g.three.obj[obj].geo = new THREE.SphereGeometry( makeObj.struct[0], makeObj.struct[1], makeObj.struct[2] )
        } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'torus':
        if ( g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] && makeObj.struct[3] ) {
          if ( typeof makeObj.struct[4] === 'undefined' ) makeObj.struct[4] = Math.PI * 2 // arc
          g.three.obj[obj].geo = new THREE.TorusGeometry( makeObj.struct[0], makeObj.struct[1], makeObj.struct[2], makeObj.struct[3], makeObj.struct[4] )
        } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'box':
        if ( g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] ) {
          g.three.obj[obj].geo = new THREE.BoxGeometry( makeObj.struct[0], makeObj.struct[1], makeObj.struct[2] )
        } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'circle':
        if ( g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1] ) {
          g.three.obj[obj].geo = new THREE.CircleGeometry( makeObj.struct[0], makeObj.struct[1] )
        } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'plane':
        if ( g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1] ) {
          g.three.obj[obj].geo = new THREE.PlaneGeometry( makeObj.struct[0], makeObj.struct[1] )
        } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'group':
      default:
        // if (makeObj.pivot && makeObj.struct && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2]) {
        //   console.log({ groupBox: makeObj })
        //   g.three.grp[obj] = new THREE.Mesh(new THREE.BoxGeometry(makeObj.struct[0], makeObj.struct[1], makeObj.struct[2]), new THREE.MeshBasicMaterial({ opacity: 0, transparent: true }))
        //   setPivot(g.three.grp[obj], makeObj)
        // } else {
        if ( g.three.grp[obj] ) devLog( `FUCKER! grp "${obj}" already exists!` )
        g.three.grp[obj] = new THREE.Group()
        g.three.grp[obj].name = obj
        // }
    }
    if ( makeFail ) devLog( makeFail )
    else if ( g.three.obj[obj] && g.three.obj[obj].geo && makeMesh && makeObj.mat ) {
      if ( makeObj.mkr ) g.three.obj[obj].mkr = makeObj.mkr
      if ( makeObj.txtAss ) makeMesh.map = g.three.obj[obj].txt = g.three.mkr.textureLoader( makeObj.txtAss )
      if ( typeof makeObj.color !== 'undefined' ) makeMesh.color = g.three.obj[obj].hex = makeObj.color
      // eslint-disable-next-line new-cap
      g.three.obj[obj].mat = isFunction( makeObj.mat ) ? new makeObj.mat( makeMesh ) : makeObj.mat
      if ( g.three.obj[obj].mat instanceof THREE.MeshStandardMaterial && g.three.obj[obj].txt ) {
        g.three.obj[obj].mat.emissive = new THREE.Color( 'white' )
        g.three.obj[obj].mat.emissiveMap = g.three.obj[obj].txt
      }
      if ( makeObj.pivot ) setPivot( g.three.obj[obj], makeObj )
      if ( g.three.obj[obj].geo && g.three.obj[obj].mat ) g.three.obj[obj].msh = new THREE.Mesh( g.three.obj[obj].geo, g.three.obj[obj].mat )
      if ( g.three.obj[obj].msh ) {
        g.three.obj[obj].msh.name = obj
        g.three.obj[obj].msh.castShadow = true // default is false
        g.three.obj[obj].msh.receiveShadow = true // default is false
        setThreeObj( obj, makeObj )
      }
    } else if ( makeObj.children && g.three.grp[obj] ) {
      Object.keys( makeObj.children ).forEach( childObj => {
        // if (g.three.grp[childObj]) devLog(g.three.grp[childObj])
        // if (g.three.grp[childObj] || g.three.obj[childObj]) {
        //   if (g.three.grp[childObj]) g.three.grp[childObj].updateMatrix()
        //   else if (g.three.obj[childObj].msh) g.three.obj[childObj].msh.updateMatrix()
        //   else g.three.obj[childObj].updateMatrix()
        //   g.three.grp[obj].geometry.merge(g.three.obj[childObj] ? g.three.obj[childObj].msh.geometry || g.three.obj[childObj].geometry : g.three.grp[childObj].geometry, g.three.obj[childObj] ? g.three.obj[childObj].msh.matrix || g.three.obj[childObj].matrix : g.three.grp[childObj].matrix)
        // }
        if ( g.three.grp[childObj] || g.three.obj[childObj] ) g.three.grp[obj].add( g.three.obj[childObj] ? g.three.obj[childObj].msh || g.three.obj[childObj] : g.three.grp[childObj] )
      } )
      setThreeObj( obj, makeObj )
    }
  }
}

const objOrGrp = obj => ( g.three.obj[obj] && g.three.obj[obj].msh ? g.three.obj[obj].msh : g.three.grp[obj] )

const setMatrix = ( obj, makeObj ) => {
  const mvMe = objOrGrp( obj )
  mvMe.matrix.set( makeObj.matrix )
  mvMe.matrixAutoUpdate = false
}

const setPivot = ( msh, makeObj ) => {
  if ( msh.geo ) msh.geo.translate( makeObj.pivot[0] || 0, makeObj.pivot[1] || 0, makeObj.pivot[2] || 0 )
}

const translateAxes = ( obj, makeObj ) => {
  const mvMe = objOrGrp( obj )
  g.three.xyz.forEach( ( axis, i ) => {
    if ( typeof makeObj.position[i] !== 'undefined' && makeObj.position[i] ) mvMe.position[axis] = makeObj.position[i]
  } )
}

const rotateAxes = ( obj, makeObj ) => {
  const mvMe = objOrGrp( obj )
  Object.keys( makeObj.rotation ).forEach( axis => {
    if ( makeObj.rotation[axis] ) {
      const rotateAxis = `rotate${g.three.xyz.includes( axis ) ? axis.toUpperCase() : g.three.xyz[axis].toUpperCase()}`
      const rotateRad = THREE.Math.degToRad( makeObj.rotation[axis] )
      mvMe[rotateAxis]( rotateRad )
    }
  } )
}

export {
  setThree,
}
