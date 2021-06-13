import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// eslint-disable-next-line import/no-extraneous-dependencies
import Stats from 'stats.js'

import g from '/src/js/glob'
import * as threeAnim from './anim'
import * as threeMake from './make'
import * as threeRend from './rend'
import {
  setModel, toggleFlightMode, toggleFlyAlongPath, toggleWheelsDrop,
} from '../future'
import { makeDeLorean } from './delorean'
import {
  devLog, ifFunctionThenCall, isFunction, setAddOn,
} from '/src/js/utils'
import { deObscureThen } from '../obscuro'

const setThree = ( {
  controls = false, stats = false, car = true, tunnel = true, smoke = true,
} = {} ) => {
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
        smk: {},
        tnl: {},
      },
      bin: [],
      clk: new THREE.Clock(),
      drg: false,
      flm: true,
      flr: [],
      flx: {
        cdt: 0,
        ctl: 0,
      },
      grp: {},
      inScene: {},
      lve: false,
      m: {
        axis: new THREE.Vector3(),
        line: [],
        mp: 0,
        path: [],
        rotZ: [ 0, 90, -360 ],
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
      xy: [ 'x', 'y' ],
      xyz: [ 'x', 'y', 'z' ],
    }

    g.three.scene = new THREE.Scene()
    g.three.scene.fog = new THREE.Fog( new THREE.Color( 0x000000 ), 7500, 17000 )
    g.three.aspectRatio = g.main.w / g.main.h
    g.three.camera = new THREE.PerspectiveCamera( 76, g.three.aspectRatio, 0.1, 17500 )

    g.three.renderer = new THREE.WebGLRenderer( { alpha: true } )
    g.three.renderer.shadowMap.enabled = true
    g.three.renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
    // g.three.renderer.outputEncoding = THREE.sRGBEncoding
    g.three.renderer.setPixelRatio( g.window.devicePixelRatio )

    threeRend.sizeRenderer()
    g.el.deLorean.appendChild( g.three.renderer.domElement )

    if ( controls ) g.three.camControls = new OrbitControls( g.three.camera, g.three.renderer.domElement )
    // if ( g.three.camControls ) {
    //   g.three.xyz.forEach( axis => {
    //     g.three.camera.position[axis] = 500
    //   } )
    // }
    g.three.camera.rotateX( THREE.Math.degToRad( 2.23 ) )

    // it remains to be seen whether this approach will actually save any time or code... I think it will at least cut down some of three's repetition
    // just remember that ALL NAME/ID KEYS IN THE FOLLOWING OBJECT MUST BE UNIQUE, REGARDLESS OF NESTING LEVEL
    g.three.makeObjs = {
      deLorean: makeDeLorean(),
    }
    Object.keys( g.three.makeObjs ).forEach( obj => makeThreeObj( obj, g.three.makeObjs[obj] ) )

    console.log( { three: g.three } )
    Object.keys( g.three.makeObjs ).forEach( grp => g.three.scene.add( g.three.grp[grp] ) )

    // smoke group creation needed even if smoke itself is suppressed for directional light target
    g.three.grp.smoke = new THREE.Group()
    g.three.grp.smoke.name = 'smoke'
    g.three.scene.add( g.three.grp.smoke )
    g.three.inScene.smoke = g.three.grp.smoke
    if ( smoke ) threeMake.setSmoke()

    if ( tunnel ) threeMake.setLynchTunnel()

    console.log( g.three.scene )

    if ( g.three.camControls ) {
      g.three.xyz.forEach( axis => {
        g.three.camera.position[axis] = 500
      } )
      g.three.camControls.target = new THREE.Vector3( 0, 150, 0 )
      g.three.camControls.update()
    }

    g.three.lights = [ new THREE.AmbientLight( 0x404040, 0.125 ), new THREE.DirectionalLight( 0xffffff, 0.5 ) ]
    g.three.lights.forEach( light => {
      if ( light instanceof THREE.DirectionalLight ) {
        light.target = g.three.inScene.smoke
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

    if ( stats ) {
      g.three.stats = new Stats()
      g.three.stats.showPanel( 0 ) // 0: fps, 1: ms, 2: mb, 3+: custom
      g.three.stats.showPanel( 1 )
      g.three.stats.showPanel( 2 )
      g.three.stats.dom.id = 'threeStats'
      g.three.stats.dom.classList.add( 'threeDev' )
      g.el.deLorean.appendChild( g.three.stats.dom )
    }

    g.three.ani.go = ({startYourEngines = false} = {}) => {
      if ( stats ) g.three.stats.begin()
      g.three.raf = g.window.requestAnimationFrame( g.three.ani.go )
      g.three.renderer.render( g.three.scene, g.three.camera )
      threeAnim.updateAnimationFrame()
      if (stats) g.three.stats.end()
      if (startYourEngines && g.obscure) deObscureThen()
    }

    if ( controls ) g.three.scene.add( new THREE.AxesHelper( 500 ) )

    ifFunctionThenCall( g.three.mkr.setMades )
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
          if ( typeof makeObj.struct[3] === 'undefined' ) makeObj.struct[3] = 0 // phiStart
          if ( typeof makeObj.struct[4] === 'undefined' ) makeObj.struct[4] = Math.PI * 2 // phiLength
          if ( typeof makeObj.struct[5] === 'undefined' ) makeObj.struct[5] = 0 // phiStart
          if ( typeof makeObj.struct[6] === 'undefined' ) makeObj.struct[6] = Math.PI // phiLength
          g.three.obj[obj].geo = new THREE.SphereGeometry( makeObj.struct[0], makeObj.struct[1], makeObj.struct[2], makeObj.struct[3], makeObj.struct[4], makeObj.struct[5], makeObj.struct[6] )
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
      if ( makeObj.txtAss ) makeMesh.map = g.three.obj[obj].txt = threeMake.textureLoader( makeObj.txtAss )
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
