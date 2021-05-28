import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'

import g from './glob'
import { makeDeLorean } from './delorean'
import {
  devLog, isFunction, randOnum,
} from './utils'

const setThree = () => {
  g.three = {
    ani: [],
    clk: new THREE.Clock(),
    cvs: [ g.main.cx, g.main.h ],
    flr: [],
    grp: {},
    mkr: {},
    msh: {
      alphaTest: 0.36,
      side: THREE.DoubleSide,
      transparent: true,
    },
    obj: {},
    x: {},
    xy: [ 'x', 'y' ],
    xyz: [ 'x', 'y', 'z' ],
  }

  //* from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
  g.three.x.dilateGeometry = function ( geometry, length ) {
    // gather vertexNormals from geometry.faces
    const vertexNormals = new Array( geometry.vertices.length )
    geometry.faces.forEach( face => {
      /* eslint-disable prefer-destructuring */
      if ( face instanceof THREE.Face4 ) {
        vertexNormals[face.a] = face.vertexNormals[0]
        vertexNormals[face.b] = face.vertexNormals[1]
        vertexNormals[face.c] = face.vertexNormals[2]
        vertexNormals[face.d] = face.vertexNormals[3]
      } else if ( face instanceof THREE.Face3 ) {
        vertexNormals[face.a] = face.vertexNormals[0]
        vertexNormals[face.b] = face.vertexNormals[1]
        vertexNormals[face.c] = face.vertexNormals[2]
      } else console.assert( false )
      /* eslint-enable prefer-destructuring */
    } )
    // modify the vertices according to vertextNormal
    geometry.vertices.forEach( ( vertex, idx ) => {
      const vertexNormal = vertexNormals[idx]
      vertex.x += vertexNormal.x * length
      vertex.y += vertexNormal.y * length
      vertex.z += vertexNormal.z * length
    } )
  }

  g.three.x.createAtmosphereMaterial = function () {
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
      depthWrite: false,
    } )
    return material
  }

  g.three.x.GeometricGlowMesh = function ( mesh ) {
    const object3d = new THREE.Object3D()

    let geometry = mesh.geometry.clone()
    g.three.x.dilateGeometry( geometry, 0.01 )
    let material = g.three.x.createAtmosphereMaterial()
    material.uniforms.glowColor.value = new THREE.Color( 0x00D8FF )
    material.uniforms.coeficient.value = 1.1
    material.uniforms.power.value = 1.4
    const insideMesh = new THREE.Mesh( geometry, material )
    object3d.add( insideMesh )

    geometry = mesh.geometry.clone()
    g.three.x.dilateGeometry( geometry, 0.1 )
    material = g.three.x.createAtmosphereMaterial()
    material.uniforms.glowColor.value = new THREE.Color( 0x00D8FF )
    material.uniforms.coeficient.value = 0.1
    material.uniforms.power.value = 1.2
    material.side = THREE.BackSide
    const outsideMesh = new THREE.Mesh( geometry, material )
    object3d.add( outsideMesh )

    // expose a few variable
    this.object3d = object3d
    this.insideMesh = insideMesh
    this.outsideMesh = outsideMesh
  }

  // var glowMesh = new THREEx.GeometricGlowMesh(mesh)
  // mesh.add(glowMesh.object3d)
  // var insideUniforms = glowMesh.insideMesh.material.uniforms
  // insideUniforms.glowColor.value.set('hotpink')
  // var outsideUniforms = glowMesh.outsideMesh.material.uniforms
  // outsideUniforms.glowColor.value.set('hotpink')

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
    devLog( madeV2s )
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
    devLog( madeV3s )
    return madeV3s
  }

  g.three.scene = new THREE.Scene()
  g.three.camera = new THREE.PerspectiveCamera( 75, g.three.cvs[0] / g.three.cvs[1], 0.1, 10000 )

  g.three.renderer = new THREE.WebGLRenderer( { alpha: true } )
  g.three.renderer.shadowMap.enabled = true
  g.three.renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
  const setSize = () => g.three.renderer.setSize( g.three.cvs[0], g.three.cvs[1] )
  setSize()
  g.el.three.appendChild( g.three.renderer.domElement )

  g.three.camera.position.z = 5

  g.three.controls = new OrbitControls( g.three.camera, g.three.renderer.domElement )

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
    const delta = g.three.clk.getDelta()
    // ROCKET FLARE TEXTURES SWAP
    g.three.ani.forEach( ani => {
      ani( 1000 * delta )
    } )
    g.three.xyz.forEach( axis => {
      g.el[axis].innerHTML = g.three.scene.children[0].rotation[axis]
    } )
    // // TILT TEST
    // g.three.xyz.forEach(axis => {
    //   g.three.scene.children[0].rotation[axis] = g.three.mkr.tlt[axis] ? THREE.Math.degToRad(THREE.Math.radToDeg(g.three.scene.children[0].rotation[axis]) + 1) : THREE.Math.degToRad(THREE.Math.radToDeg(g.three.scene.children[0].rotation[axis]) - 1)
    //   if (g.three.scene.children[0].rotation[axis] > THREE.Math.degToRad(20) || g.three.scene.children[0].rotation[axis] < THREE.Math.degToRad(-20)) g.three.mkr.tlt[axis] = !g.three.mkr.tlt[axis]
    // })
  }

  // it remains to be seen whether this approach will actually save any time or code... I think it will at least cut down some of three's repetition
  // just remember that ALL NAME/ID KEYS IN THE FOLLOWING OBJECT MUST BE UNIQUE, REGARDLESS OF NESTING LEVEL
  g.three.makeObjs = {
    deLorean: makeDeLorean(),
  }

  Object.keys( g.three.makeObjs ).forEach( obj => makeThreeObj( obj, g.three.makeObjs[obj] ) )

  console.log( { madeObjs: g.three } )
  Object.keys( g.three.makeObjs ).forEach( grp => g.three.scene.add( g.three.grp[grp] ) )
  console.log( g.three.scene )
  g.three.flaresInScene = [
  /* eslint-disable array-bracket-newline, array-element-newline */
    [ 0, 4, 0, 0, 14 ], // this is hacky, but I was having issues with being able to access these objects by reference
    [ 0, 4, 0, 1, 14 ],
    [ 0, 4, 1, 0, 14 ],
    [ 0, 4, 1, 1, 14 ],
  /* eslint-enable array-bracket-newline, array-element-newline */
  ]

  g.three.flaresInScene.forEach( fls => {
    g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].children.forEach( ( _, flr ) => {
      if ( flr < g.three.scene.children[fls[0]].children[fls[1]].children[fls[2]].children[fls[3]].children[fls[4]].children.length - 1 ) {
        const drillDown = [ ...fls, flr ]
        g.three.ani.push( g.three.mkr.setTextureAnimator( g.three.ani.length, drillDown, 5, 1, 5, 76 ) ) // texture, #horiz, #vert, #total, duration
      }
    } )
  } )
  g.three.mkr.tlt = {}
  g.three.xyz.forEach( axis => {
    g.three.mkr.tlt[axis] = 0
  } )

  g.three.headLightsInScene = [
  /* eslint-disable array-bracket-newline, array-element-newline */
    [ 0, 1, 4, 0, 0 ],
    [ 0, 1, 4, 1, 0 ],
    /* eslint-enable array-bracket-newline, array-element-newline */
  ]
  g.three.headLightsInScene.forEach( hls => {
    const pointLight = new THREE.PointLight( 0x8ebcf0, 16, 256 )
    pointLight.castShadow = true // default false
    pointLight.position.y = 20.42
    pointLight.position.z = 21
    g.three.scene.children[hls[0]].children[hls[1]].children[hls[2]].children[hls[3]].children[hls[4]].add( pointLight )
    // g.three.scene.add( new THREE.PointLightHelper( pointLight, 10 ) )

    const spotLight = new THREE.SpotLight( 0xb3e7fb, 5, 0, THREE.Math.degToRad( 9 ), 0.25 )
    spotLight.castShadow = true // default false
    spotLight.position.y = 21
    spotLight.position.z = 22
    g.three.scene.children[hls[0]].children[hls[1]].children[hls[2]].children[hls[3]].children[hls[4]].add( spotLight )
    spotLight.target = pointLight
    // g.three.scene.add(  new THREE.SpotLightHelper( spotLight ) )
  } )


  g.three.controls.target.copy( g.three.grp.deLorean.position )
  g.three.controls.update()

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
  g.el.three.appendChild( g.three.stats.dom )

  const animate = () => {
    g.three.stats.begin()
    if ( resize() ) {
      g.three.camera.aspect = g.three.cvs[0] / g.three.cvs[1]
      g.three.camera.updateProjectionMatrix()
    }
    // eslint-disable-next-line no-undef
    requestAnimationFrame( animate )
    g.three.renderer.render( g.three.scene, g.three.camera )
    g.three.mkr.update()

    g.three.stats.end()
  }

  animate()
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
        g.three.grp[obj] = new THREE.Group()
        // devLog(makeObj)
        // g.three.grp[obj] = new THREE.Mesh(new THREE.BoxGeometry(makeObj.struct[0] || 1000, makeObj.struct[1] || 1000, makeObj.struct[2] || 1000), new makeObj.mat(makeMesh))
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
      if ( makeObj.pivot && g.three.obj[obj].geo ) g.three.obj[obj].geo.translate( makeObj.pivot[0] || 0, makeObj.pivot[1] || 0, makeObj.pivot[2] || 0 )
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
      if ( !g.three.xyz[axis] ) console.log( axis, obj, makeObj )
      const rotateAxis = `rotate${g.three.xyz.includes( axis ) ? axis.toUpperCase() : g.three.xyz[axis].toUpperCase()}`
      const rotateRad = THREE.Math.degToRad( makeObj.rotation[axis] )
      mvMe[rotateAxis]( rotateRad )
    }
  } )
}

export {
  setThree,
}
