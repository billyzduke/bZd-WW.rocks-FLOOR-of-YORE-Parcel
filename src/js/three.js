import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'

import g from './glob'
import {
  setModel, startDeLorean, toggleFlightMode, toggleFlyAlongPath, toggleWheelsDrop,
} from './future'
import { makeDeLorean } from './delorean'
import {
  devLog, ifFunctionThenCall, isFunction, randOnum, setAddOn,
} from './utils'

const setThree = () => {
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
      cvs: [ g.main.w, g.main.h ],
      flm: true,
      flr: [],
      grp: {},
      lve: false,
      m: {
        axis: new THREE.Vector3(),
        end: [],
        line: [],
        mp: 0,
        path: [],
        rotZ: [ 90, -270 ],
        strt: [],
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

    g.three.x.dilateGeometry = ( geometry, scale ) => {
      const positions = geometry.attributes.position
      for ( let i = 0; i < positions.count; i += 3 ) {
        const v = new THREE.Vector3( positions[i], positions[i + 1], positions[i + 2] ).multiplyScalar( scale )
        positions[i] = v.x
        positions[i + 1] = v.y
        positions[i + 2] = v.z
      }
      geometry.attributes.position.needsUpdate = true

      // // Geometry class is no more // have to handle it the BufferGeometry way
      // const positionAttribute = geometry.getAttribute( 'position' )
      // const vertices = []
      // for ( let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++ ) {
      //   const localVertex = new THREE.Vector3()
      //   localVertex.fromBufferAttribute( positionAttribute, vertexIndex )
      //   vertices.push( localVertex )
      // }
    }

    //* from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
    g.three.x.createAtmosphereMaterial = alphaMap => {
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
      const matInner = g.three.x.createAtmosphereMaterial( alphaMap )
      matInner.uniforms.glowColor.value = new THREE.Color( 0x00D8FF )
      matInner.uniforms.coeficient.value = 1.3
      matInner.uniforms.power.value = 1.3
      const innerMesh = new THREE.Mesh( geoInner, [ new THREE.MeshBasicMaterial( { opacity: 0, transparent: true } ), matInner ] )
      g.three.ani.glo.push( { wax: false, msh: innerMesh } )
      object3d.add( innerMesh )

      const geoOuter = geoInner.clone()
      geoOuter.scale( 1.025, 1.025, 1.025 )
      geoOuter.translate( offsetX, offsetY, offsetZ )
      const matOuter = g.three.x.createAtmosphereMaterial( alphaMap )
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

    g.three.mkr.makeMotionPath = crv => {
      const crvPts = g.three.mkr.createVector3s( crv )
      g.three.m.strt.push( crvPts[0] )
      g.three.m.end.push( crvPts[crvPts.length - 1] )
      const mPathCrv = new THREE.CatmullRomCurve3( crvPts )
      g.three.m.path.push( mPathCrv )
      // NOT SURE IF THE REST HERE IS EVEN NECESSARY UNLESS YOU WANT TO SEE THE LINE
      const mPathPts = mPathCrv.getSpacedPoints( 100 )
      const lineGeo = new THREE.BufferGeometry().setFromPoints( mPathPts )
      const lineMat = new THREE.LineBasicMaterial( {
        color: 0xffffff,
      } )
      const motionPath = new THREE.Line( lineGeo, lineMat )
      g.three.m.line.push( motionPath )
      g.three.scene.add( motionPath )
      // motionPath.geometry.computeVertexNormals()
      // const helper = new VertexNormalsHelper( motionPath, 2, 0x00ff00, 1 )
      // g.three.scene.add( helper )
    }

    g.three.mkr.moveAlongPath = obj => {
      const mPath = g.three.m.path[g.three.m.mp]
      if ( !obj.m ) {
        obj.m = 0
      }
      if ( obj.m < 1 ) {
        const inc = 0.005
        // add up to position for movement
        obj.m += inc
        // get the point at position
        let newPoint
        try {
          newPoint = mPath.getPoint( obj.m )
        } catch ( err ) {
          // suckme
        }
        if ( newPoint ) {
          obj.position.copy( newPoint )

          const tangent = mPath.getTangent( obj.m )
          g.three.m.axis.crossVectors( g.three.m.up[g.three.m.mp], tangent ).normalize().clamp( new THREE.Vector3( 0.8, -0.5, -0.5 ), new THREE.Vector3( 1.2, 0.5, 0.5 ) )

          let radians = Math.acos( g.three.m.up[g.three.m.mp].dot( tangent ) )

          if ( radians > 1.7 ) radians = 1.7
          if ( radians < 1.4 ) radians = 1.4

          obj.quaternion.setFromAxisAngle( g.three.m.axis, radians )
          obj.rotateZ( THREE.Math.degToRad( g.three.m.rotZ[g.three.m.mp] * obj.m ) )
          console.log( obj.m, obj.rotation.y, radians, g.three.m.axis.x, g.three.m.axis.y, g.three.m.axis.z )

          // RANDOM AXIS ANGLE for added jitteriness
          obj[`rotate${g.three.xyz[randOnum() ? 0 : 2].toUpperCase()}`]( THREE.Math.degToRad( randOnum() ? 0.15 : -0.15 ) )
        }
      } else {
        // g.three.mov = false
        // obj.position.copy( g.three.m.strt[mp] )
        // obj.setRotationFromAxisAngle( g.three.m.up, 0 )
        // obj.rotateZ( THREE.Math.degToRad( 180 ) )
        // obj.rotateX( THREE.Math.degToRad( 90 ) )
        // obj.rotateY( THREE.Math.degToRad( 180 ) )
        obj.m = 0
        g.three.m.mp++
      }
    }

    g.three.scene = new THREE.Scene()
    g.three.camera = new THREE.PerspectiveCamera( 75, g.three.cvs[0] / g.three.cvs[1], 0.1, 10000 )

    g.three.renderer = new THREE.WebGLRenderer( { alpha: true } )
    g.three.renderer.shadowMap.enabled = true
    g.three.renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
    const setSize = () => g.three.renderer.setSize( g.three.cvs[0], g.three.cvs[1] )
    setSize()
    g.el.deLorean.appendChild( g.three.renderer.domElement )

    g.three.camControls = new OrbitControls( g.three.camera, g.three.renderer.domElement )
    // if ( g.three.camControls ) {
    //   g.three.xyz.forEach( axis => {
    //     g.three.camera.position[axis] = 1000
    //   } )
    // } else {
    g.three.camera.position.y = 176
    // }

    g.three.mkr.textureLoader = txtAss => new THREE.TextureLoader().load( txtAss )

    g.three.mkr.setTextureAnimator = ( flr, fls, hTiles, vTiles, totTiles, tileDisplayDuration ) => {
      // note: texture passed by reference, will be updated by the update function // we hope
      // how many images does this spritesheet contain?
      //  usually equals tilesHoriz * tilesVert, but not necessarily,
      //  if there at blank tiles at the bottom of the spritesheet.
      g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].children[fls[5]].material.map.wrapS = g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].children[fls[5]].material.map.wrapT = THREE.RepeatWrapping
      g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].children[fls[5]].material.map.repeat.set( 1 / hTiles, 1 / vTiles )

      return milliSec => {
        g.three.flr[flr].cdt += milliSec
        while ( g.three.flr[flr].cdt > tileDisplayDuration ) {
          g.three.flr[flr].cdt -= tileDisplayDuration
          let nextTile = g.three.flr[flr].ctl
          while ( nextTile === g.three.flr[flr].ctl ) nextTile = randOnum( 0, totTiles - 1 )
          g.three.flr[flr].ctl = nextTile
          const currentColumn = g.three.flr[flr].ctl % hTiles
          g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].children[fls[5]].material.map.offset.x = currentColumn / hTiles
          const currentRow = Math.floor( g.three.flr[flr].ctl / hTiles )
          g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].children[fls[5]].material.map.offset.y = currentRow / vTiles
        }
      }
    }

    g.three.mkr.update = () => {
      // eslint-disable-next-line eqeqeq
      if ( g.el.deLorean.style.opacity == 1 ) {
        const delta = g.three.clk.getDelta()
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
          // let flipWax = false
          // // console.log( { gloMsh: glo.msh } )
          // if ( glo.wax ) glo.msh.material.opacity += 0.1
          // else glo.msh.material.opacity -= 0.1
          // if ( glo.msh.material.opacity <= 0 ) {
          //   glo.msh.material.opacity = 0
          //   flipWax = true
          // } else if ( glo.msh.material.opacity >= 1 ) {
          //   glo.msh.material.opacity = 1
          //   flipWax = true
          // }
          // if ( flipWax ) g.three.ani.glo[i].wax = !glo.wax
        } )

        if ( g.three.flm ) {
          // suckme
        } else {
          g.three.mkr.inScene.wheelRockets.forEach( fls => {
            if ( g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].scale.x > 0.2 ) {
              g.three.mkr.scaleMesh( g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]], 0.75 )
            } else {
              g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].scale.set( 0 )
              g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[13].material.map.offset.x = 0.5
              if ( fls[3] ) {
                const whereWheel = {
                  armRadY: g.three.scene.children[0].children[0].children[3].children[2].children[0].children[fls[2]].rotation.y,
                  armPosX: g.three.scene.children[0].children[0].children[3].children[2].children[0].children[fls[2]].position.x,
                  armPosZ: g.three.scene.children[0].children[0].children[3].children[2].children[0].children[fls[2]].position.z,
                  rotRadY: g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].rotation.y,
                  rotPosX: g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].position.x,
                  rotPosZ: g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].position.z,
                }
                if ( fls[2] ) {
                  // RIGHT SIDE
                  if ( whereWheel.rotRadY > -g.three.mkr.wheels.rotTarget ) g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].rotateY( -g.three.mkr.wheels.rotIncRad )
                  if ( whereWheel.rotPosX < -g.three.mkr.wheels.posTarget.x ) g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].position.x += 2
                  if ( whereWheel.armPosX < -g.three.mkr.wheels.armTarget.x ) g.three.scene.children[0].children[0].children[3].children[2].children[0].children[fls[2]].position.x += 1.8571
                  if ( whereWheel.armRadY > 0 ) g.three.scene.children[0].children[0].children[3].children[2].children[0].children[fls[2]].rotateY( -0.00698131 )
                } else {
                  // LEFT SIDE
                  if ( whereWheel.rotRadY < g.three.mkr.wheels.rotTarget ) g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].rotateY( g.three.mkr.wheels.rotIncRad )
                  if ( whereWheel.rotPosX > g.three.mkr.wheels.posTarget.x ) g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].position.x -= 2
                  if ( whereWheel.armPosX > g.three.mkr.wheels.armTarget.x ) g.three.scene.children[0].children[0].children[3].children[2].children[0].children[fls[2]].position.x -= 1.8571
                  if ( whereWheel.armRadY < 0 ) g.three.scene.children[0].children[0].children[3].children[2].children[0].children[fls[2]].rotateY( 0.00698131 )
                }
                if ( whereWheel.rotPosZ > g.three.mkr.wheels.posTarget.z ) g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].position.z -= 1.6
                if ( whereWheel.armPosZ > g.three.mkr.wheels.armTarget.z ) g.three.scene.children[0].children[0].children[3].children[2].children[0].children[fls[2]].position.z -= 0.9144
              }
            }
          } )
        }

        if ( g.three.lve ) g.three.scene.children[0].children[0].position.z -= 1

        if ( g.three.mov ) g.three.mkr.moveAlongPath( g.three.grp.deLorean, 0 )

        // // TILT TEST
        // g.three.xyz.forEach(axis => {
        //   g.three.scene.children[0].rotation[axis] = g.three.mkr.tlt[axis] ? THREE.Math.degToRad(THREE.Math.radToDeg(g.three.scene.children[0].rotation[axis]) + 1) : THREE.Math.degToRad(THREE.Math.radToDeg(g.three.scene.children[0].rotation[axis]) - 1)
        //   if (g.three.scene.children[0].rotation[axis] > THREE.Math.degToRad(20) || g.three.scene.children[0].rotation[axis] < THREE.Math.degToRad(-20)) g.three.mkr.tlt[axis] = !g.three.mkr.tlt[axis]
        // })
      }
    }

    // it remains to be seen whether this approach will actually save any time or code... I think it will at least cut down some of three's repetition
    // just remember that ALL NAME/ID KEYS IN THE FOLLOWING OBJECT MUST BE UNIQUE, REGARDLESS OF NESTING LEVEL
    g.three.makeObjs = {
      deLorean: makeDeLorean(),
    }
    console.log( { makeObjs: g.three.makeObjs } )
    Object.keys( g.three.makeObjs ).forEach( obj => makeThreeObj( obj, g.three.makeObjs[obj] ) )

    console.log( { madeObjs: g.three } )
    Object.keys( g.three.makeObjs ).forEach( grp => g.three.scene.add( g.three.grp[grp] ) )
    console.log( g.three.scene )

    ifFunctionThenCall( g.three.mkr.setMades )

    // if ( g.three.camControls ) {
    //   g.three.camControls.target.copy( g.three.grp.deLorean.position )
    //   g.three.camControls.update()
    // }

    g.three.lights = [ new THREE.AmbientLight( 0x404040, 0.125 ), // soft white light
      new THREE.DirectionalLight( 0xffffff, 0.5 ) ]
    g.three.lights.forEach( light => {
      if ( light instanceof THREE.DirectionalLight ) {
      // eslint-disable-next-line prefer-destructuring
        light.target = g.three.scene.children[0]
        light.castShadow = true // default false
        light.shadow.camera.far = 2500 // default 500
        light.shadow.camera.left = -500
        light.shadow.camera.right = 500
        light.shadow.camera.top = 500
        light.shadow.camera.bottom = -500
      // g.three.scene.add( new THREE.DirectionalLightHelper( light, 500 ) )
      // g.three.scene.add( new THREE.CameraHelper( light.shadow.camera ) )
      }
      g.three.scene.add( light )
    } )

    // const curve = new THREE.Curve()
    // const curvePoints = [
    //   [ -250, 0, 0 ],
    //   [ -300, 0, 0 ],
    //   [ -400, 100, 0 ],
    //   [ -500, 200, -100 ],
    //   [ -500, 300, -200 ],
    //   [ 800, 400, 100 ],
    // ]
    // curve.getPoint = t => {
    //   const tBag = t * 200
    //   if ( !curvePoints[tBag] ) curvePoints[tBag] = [ randOnum( 0, 500 ), randOnum( 0, 500 ), randOnum( 0, 500 ) ]
    //   return new THREE.Vector3( curvePoints[tBag][0], curvePoints[tBag][2], curvePoints[tBag][2] )
    // }

    // for ( let sp = 0; sp < 6; sp++ ) {
    //   let axis = g.three.xyz[sp]
    //   let dist = 750
    //   if ( !axis ) {
    //     axis = g.three.xyz[sp - 3]
    //     dist = -750
    //   }
    //   console.log( axis, dist )
    //   const geometry = new THREE.SphereGeometry( 250, 32, 32 )
    //   const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
    //   const sphere = new THREE.Mesh( geometry, material )
    //   sphere.position.z = -1000
    //   sphere.position[axis] += dist
    //   g.three.scene.add( sphere )
    // }

    const resize = () => {
      if ( g.three.renderer.domElement.width !== g.three.cvs[0] || g.three.renderer.domElement.height !== g.three.cvs[1] ) {
        setSize()
        return true
      }
      return false
    }

    g.three.stats = new Stats()
    g.three.stats.showPanel( 0 ) // 0: fps, 1: ms, 2: mb, 3+: custom
    g.three.stats.showPanel( 1 ) // 0: fps, 1: ms, 2: mb, 3+: custom
    g.three.stats.showPanel( 2 ) // 0: fps, 1: ms, 2: mb, 3+: custom
    g.three.stats.dom.id = 'threeStats'
    g.three.stats.dom.classList.add( 'threeDev' )
    g.el.deLorean.appendChild( g.three.stats.dom )

    g.three.ani.go = () => {
      g.three.stats.begin()
      if ( resize() ) {
        g.three.camera.aspect = g.three.cvs[0] / g.three.cvs[1]
        g.three.camera.updateProjectionMatrix()
      }
      // eslint-disable-next-line no-undef
      requestAnimationFrame( g.three.ani.go )
      g.three.renderer.render( g.three.scene, g.three.camera )
      g.three.mkr.update()

      g.three.stats.end()
    }

    startDeLorean()
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
      g.three.obj[obj] = { msh: makeObj.msh }
      setThreeObj( obj, makeObj )
      return
    } else if ( !makeObj.geo ) {
      makeObj.geo = 'plane'
    }
    let makeFail, makeMesh
    if ( makeObj.geo !== 'group' && makeObj.struct && makeObj.struct.length && makeObj.struct.length >= 2 ) {
      if ( makeObj.geo !== 'group' ) g.three.obj[obj] = {}
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
        g.three.grp[obj] = new THREE.Group()
        // }
    }
    if ( makeFail ) devLog( makeFail )
    else if ( g.three.obj[obj] && g.three.obj[obj].geo && makeMesh && makeObj.mat ) {
      if ( makeObj.mkr ) g.three.obj[obj].mkr = makeObj.mkr
      if ( makeObj.txtAss ) makeMesh.map = g.three.obj[obj].txt = new THREE.TextureLoader().load( makeObj.txtAss )
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
