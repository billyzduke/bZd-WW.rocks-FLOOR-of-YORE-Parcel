import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// eslint-disable-next-line import/no-extraneous-dependencies
import Stats from 'stats.js'

import g from '/src/shared/_'
import * as bttfAnim from '/src/future/bttf-tunnel/anim'
import * as threeMake from '/src/shared/three/make'
import * as threeRend from '/src/shared/three/rend'
import {
  makeDeLorean, setModel, toggleFlightMode, toggleFlyAlongPath, toggleWheelsDrop,
} from '/src/future/bttf-tunnel/delorean/_'
import {
  ifFunctionThenCall, setAddOn,
} from '/src/shared/utils'
import { deObscureThen } from '/src/obscuro/_'
import { setTunnelEnvironment } from './environment/_'

const setBTTF = ( {
  car = true, controls = false, floaters = true, fog = false, smoke = true, stats = false, tunnel = true,
} = {} ) => {
  if ( !g.bttf ) {
    g.bttf = {
      ani: {
        flr: [],
        wls: [],
        glo: [],
        smk: {},
        tnl: {},
      },
      bin: [],
      blink: {},
      clk: new THREE.Clock(),
      dev: false,
      drg: false,
      flm: true,
      flr: [],
      flx: {
        cdt: 0,
        ctl: 0,
      },
      grp: {},
      inScene: {},
      lampLights: {},
      lampLightBulbColors: {
        green: threeMake.color( 0x1efcb2 ),
        yellow: threeMake.color( 0xfcf921 ),
        red: threeMake.color( 0xfc252a ),
      },
      lampPosts: {
        clearance: {},
        turnDepthAdjustment: 500,
      },
      lampPostPairs: {
        clearance: 1442,
        position: {
          x: {
            min: 0.33,
            max: 0.66,
          },
          y: {
            min: 0.33,
            max: 0.66,
          },
        },
      },
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
      pilotingDepth: 1200,
      tunnel: {
        girderSpacing: 575,
        zoomSpeed: 25,
      },
      xy: [ 'x', 'y' ],
      xyz: [ 'x', 'y', 'z' ],
    }

    if ( g.el.future.classList.contains( 'model' ) ) g.bttf.dev = true
    if ( car && g.bttf.dev ) {
      if ( g.el.model ) setModel()
      setAddOn( '#toggleFlyAlongPath', 'click', toggleFlyAlongPath )
      setAddOn( '#toggleFlightMode', 'click', toggleFlightMode )
      setAddOn( '#toggleWheelsDrop', 'click', toggleWheelsDrop )
    }

    g.bttf.scene = new THREE.Scene()
    if ( fog ) g.bttf.scene.fog = new THREE.Fog( threeMake.color( 0x000000 ), 7500, 17000 )
    g.bttf.aspectRatio = g.main.w / g.main.h
    g.bttf.camera = new THREE.PerspectiveCamera( 76, g.bttf.aspectRatio, 0.1, 17500 )

    g.bttf.renderer = new THREE.WebGLRenderer( { alpha: true } )
    g.bttf.renderer.shadowMap.enabled = true
    g.bttf.renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
    // g.bttf.renderer.outputEncoding = THREE.sRGBEncoding
    g.bttf.renderer.setPixelRatio( g.window.devicePixelRatio )

    threeRend.sizeRenderer()
    g.el.bttfTunnel.appendChild( g.bttf.renderer.domElement )

    if ( controls ) g.bttf.camControls = new OrbitControls( g.bttf.camera, g.bttf.renderer.domElement )
    // if ( g.bttf.camControls ) {
    //   g.bttf.xyz.forEach( axis => {
    //     g.bttf.camera.position[axis] = 500
    //   } )
    // }
    g.bttf.camera.rotateX( threeMake.degToRad( 2.23 ) )

    // it remains to be seen whether this approach will actually save any time or code... I think it will at least cut down some of three's repetition
    // just remember that ALL NAME/ID KEYS IN THE FOLLOWING OBJECT MUST BE UNIQUE, REGARDLESS OF NESTING LEVEL
    if ( car ) {
      g.bttf.makeObjs = {
        deLorean: makeDeLorean(),
      }
      Object.keys( g.bttf.makeObjs ).forEach( obj => threeMake.makeThreeObj( obj, g.bttf.makeObjs[obj] ) )
      Object.keys( g.bttf.makeObjs ).forEach( grp => g.bttf.scene.add( g.bttf.grp[grp] ) )
    }

    // smoke group creation needed even if smoke itself is suppressed for directional light target
    g.bttf.grp.freeSmoke = new THREE.Group()
    g.bttf.grp.freeSmoke.name = 'freeSmoke'
    g.bttf.scene.add( g.bttf.grp.freeSmoke )
    g.bttf.inScene.allSmoke = []
    g.bttf.inScene.freeSmoke = g.bttf.grp.freeSmoke

    if ( tunnel ) setTunnelEnvironment( { smoke, floaters } )

    console.log( g.bttf.scene )

    if ( g.bttf.camControls ) {
      g.bttf.xyz.forEach( axis => {
        g.bttf.camera.position[axis] = 500
      } )
      g.bttf.camControls.target = new THREE.Vector3( 0, 150, 0 )
      g.bttf.camControls.update()
    }

    g.bttf.lights = [ new THREE.AmbientLight( 0x404040, 0.125 ), new THREE.DirectionalLight( 0xffffff, 0.5 ) ]
    g.bttf.lights.forEach( light => {
      if ( light instanceof THREE.DirectionalLight ) {
        light.target = g.bttf.inScene.freeSmoke
        light.castShadow = true // default false
        light.shadow.camera.far = 5000 // default 500
        light.shadow.camera.left = -2500
        light.shadow.camera.right = 2500
        light.shadow.camera.top = 2500
        light.shadow.camera.bottom = -2500
      // g.bttf.scene.add( new THREE.DirectionalLightHelper( light, 500 ) )
      // g.bttf.scene.add( new THREE.CameraHelper( light.shadow.camera ) )
      }
      g.bttf.scene.add( light )
    } )

    if ( stats ) {
      g.bttf.stats = new Stats()
      g.bttf.stats.showPanel( 0 ) // 0: fps, 1: ms, 2: mb, 3+: custom
      g.bttf.stats.showPanel( 1 )
      g.bttf.stats.showPanel( 2 )
      g.bttf.stats.dom.id = 'threeStats'
      g.bttf.stats.dom.classList.add( 'threeDev' )
      g.el.bttfTunnel.appendChild( g.bttf.stats.dom )
    }

    g.bttf.ani.go = ( { startYourEngines = false } = {} ) => {
      if ( stats ) g.bttf.stats.begin()
      g.bttf.raf = g.window.requestAnimationFrame( g.bttf.ani.go )
      g.bttf.renderer.render( g.bttf.scene, g.bttf.camera )
      g.bttf.renderer.state.reset()
      bttfAnim.updateAnimationFrame()
      if ( stats ) g.bttf.stats.end()
      if ( startYourEngines && g.obscure ) deObscureThen()
    }

    if ( controls ) g.bttf.scene.add( new THREE.AxesHelper( 500 ) )

    ifFunctionThenCall( g.bttf.mkr.setMades )
  }
}

const togglePauseThree = () => {
  if ( g.bttf ) g.bttf.on = !g.bttf.on
}

export {
  setBTTF, togglePauseThree,
}
