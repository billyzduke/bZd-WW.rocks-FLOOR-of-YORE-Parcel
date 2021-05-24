import { gsap, TimelineMax as TL } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import assUnderCarriageF from 'url:/src/img/future/underCarriageF.png'
import assUnderCarriageC from 'url:/src/img/future/underCarriageC.png'
import assUnderCarriageA from 'url:/src/img/future/underCarriageA.png'
import assCrossAxle from 'url:/src/img/future/crossAxle.png'
import assCrossAxleF from 'url:/src/img/future/crossAxleFront.png'
import assCrossAxleA from 'url:/src/img/future/crossAxleRear.png'
import assExhaustPipeOuter from 'url:/src/img/future/exhaustPipe.png'
import assExhaustPipeInner from 'url:/src/img/future/exhaustPipeInner.png'
import assTireTread from 'url:/src/img/future/tireTread.png'
import assTireWallLong from 'url:/src/img/future/tireWallLong.png'
import assTireWallShort from 'url:/src/img/future/tireWallShort.png'
import assTireHubCapF from 'url:/src/img/future/hubCapFront.png'
import assTireHubCapA from 'url:/src/img/future/hubCapRear.png'
import assRocketFlare from 'url:/src/img/future/skyrocket.png'
import g from './glob'
import { setFlux } from './flux'
import { devLog, gsapTick, isFunction, randOnum, setAddOn, toggleFermata } from './utils'

gsap.registerPlugin(TextPlugin)

const setFuture = () => {
  g.tL.bttf = new TL({ defaults: { overwrite: 'auto' } })
  g.qss.wormHoler = gsap.quickSetter('#blindingFlash', 'css')
  setFlux()
  gsap.set('#future', { opacity: 1 })
  setThree()
}

const wormHoleHexes = [
  'f8f8f8',
  'fff7f7',
  'f7efef',
  'efe7f5',
  'eadaee',
  'e8ccee',
  'd7bbed',
  'eef7fb',
  'a5adf7',
  'd8bcf8',
  '877bae',
  'ffffff'
]

const wormHoleFlashTick = () => {
  const o = randOnum(1, 100)
  const c = randOnum(0, 11)
  g.qss.wormHoler({
    opacity: o < 56 ? 0 : o,
    backgroundColor: wormHoleHexes[c]
  })
}

const beginFuture = () => {
  const blindingFlashUnTick = gsapTick(wormHoleFlashTick)

  setTimeout(() => {
    g.el.deLorean.style.opacity = 1
    setTimeout(() => {
      toggleFermata(true, { exceptTLs: ['bttf'] })
      blindingFlashUnTick()
      flyOver()
    }, 700)
  }, 2300)
}

const flyOver = () => {

  gsap.to('.lightBar > div', {
    duration: 1.5,
    ease: 'power1.in',
    opacity: 0.12,
    repeat: -1,
    yoyo: true,
  })

  g.tL.bttf.set('#flux', {
      opacity: 0
    })
  .to('#deLorean', {
    duration: 9,
    ease: 'power2.in',
    translateZ: -500,
  })
  .to('#deLorean', {
    duration: 7.5,
    ease: 'power2.in',
    rotateY: '-=90',
  }, '<5')
  .to('#deLorean', {
    duration: 3.5,
    ease: 'power2.in',
    rotateZ: '+=30',
    repeat: 1,
    yoyo: true,
  }, '<2')
  .to('#deLorean', {
    duration: 5,
    ease: 'power2.in',
    translateX: '-=50',
    translateY: '-=200',
  }, '<')
  .to('#deLorean', {
    duration: 3.5,
    ease: 'power2.in',
    rotateX: '-=15',
    repeat: 1,
    yoyo: true,
  }, '>')
  .to('#deLorean', {
    duration: 4,
    ease: 'power2.out',
    translateX: '+=150',
    translateY: '-=100',
    translateZ: -400,
  }, '<')
  // CONVERT FROM FLYING TO DRIVING MODE
  // TURN OFF WHEEL ROCKETS
  .to('#deLorean #wheels .wheel .rocket', {
    duration: 1.25,
    scaleY: 0,
  }, '>')
  // SET WHEELS IN WELLS
  .to('#wheelsLeft', {
    duration: 4,
    rotateY: 90,
    translateZ: '-=42',
  }, '>')
  .to('#wheelsRight', {
    duration: 4,
    rotateY: -90,
    translateZ: '-=42',
  }, '<')
}

const movable = [ '#deLorean', '#sideViewMirrorRight div:nth-child(2)' ]

const moveModel = (movement, axis, el, value) => {
  const p = `${movement}${axis}`
  const m = movement === 'rotate' ? 'rotation' : 'translation'
  const d = `#${m}${axis}${el}`
  gsap.to(movable[el], {
    duration: 0.25,
    onComplete: function () {
      gsap.set(d, {
        text: value,
      })
    },
    overwrite: 'auto',
    [p]: value,
  })
}

const setModel = () => {
  setAddOn('#rotateX0', 'change', e => { moveModel('rotate', 'X', 0, e.target.value) })
  setAddOn('#rotateY0', 'change', e => { moveModel('rotate', 'Y', 0, e.target.value) })
  setAddOn('#rotateZ0', 'change', e => { moveModel('rotate', 'Z', 0, e.target.value) })
  setAddOn('#translateX0', 'change', e => { moveModel('translate', 'X', 0, e.target.value) })
  setAddOn('#translateY0', 'change', e => { moveModel('translate', 'Y', 0, e.target.value) })
  setAddOn('#translateZ0', 'change', e => { moveModel('translate', 'Z', 0, e.target.value) })
  setAddOn('#rotateX1', 'change', e => { moveModel('rotate', 'X', 1, e.target.value) })
  setAddOn('#rotateY1', 'change', e => { moveModel('rotate', 'Y', 1, e.target.value) })
  setAddOn('#rotateZ1', 'change', e => { moveModel('rotate', 'Z', 1, e.target.value) })
  setAddOn('#translateX1', 'change', e => { moveModel('translate', 'X', 1, e.target.value) })
  setAddOn('#translateY1', 'change', e => { moveModel('translate', 'Y', 1, e.target.value) })
  setAddOn('#translateZ1', 'change', e => { moveModel('translate', 'Z', 1, e.target.value) })
}

const setThree = () => {
  g.three = {
    clk: new THREE.Clock(),
    cvs: [g.main.cx, g.main.h],
    grp: {},
    mkr: {
      flr: []
    },
    msh: {
      alphaTest: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
    },
    obj: {},
    xyz: ['x', 'y', 'z'],
  }
  g.three.scene = new THREE.Scene()
  g.three.camera = new THREE.PerspectiveCamera(75, g.three.cvs[0] / g.three.cvs[1], 0.1, 2000)

  g.three.renderer = new THREE.WebGLRenderer({ alpha: true })
  const setSize = () => g.three.renderer.setSize( g.three.cvs[0], g.three.cvs[1])
  setSize()
  g.el.three.appendChild(g.three.renderer.domElement)

  g.three.camera.position.z = 5

  g.three.controls = new OrbitControls(g.three.camera, g.three.renderer.domElement)

  g.three.mkr.exhaustPipeFace = face => {
    let rotation = [0,0,0]
    let position = [0,0,0]
    switch (face) {
      case 'L':
        position[0] = 9.5
        rotation[1] = -90
        break
      case 'R':
        position[0] = -9.5
        rotation[1] = 90
        break
      case 'T':
        position[2] = -9.5
        rotation[1] = 180
        break;
      case 'B':
        position[2] = 9.5
        break;
    }
    return {
      txtAss: assExhaustPipeOuter,
      struct: [19, 40],
      position,
      rotation,
    }
  }

  g.three.mkr.exhaustPipe = side => {
    const faces = ['L', 'R', 'T', 'B']
    const pipe = {}
    faces.forEach(face => {
      pipe[`exP${side}${face}`] = g.three.mkr.exhaustPipeFace(face)
    })
    pipe[`exP${side}C`] = {
      txtAss: assExhaustPipeInner,
      struct: [18.5, 18.5],
      position: [0, -10],
      rotation: [90]
    }
    return pipe
  }

  g.three.mkr.textureLoader = txtAss => new THREE.TextureLoader().load(txtAss),

  g.three.mkr.spokeMap = () => {
    const spokeMap = {
      long: [],
      short: [],
    }
    for (let side = 0; side < 6; side++) {
      spokeMap.long.push({
        map: g.three.mkr.textureLoader([2, 3].includes(side) ? assTireTread : assTireWallLong),
      })
      spokeMap.short.push({
        map: g.three.mkr.textureLoader([2, 3].includes(side) ? assTireTread : assTireWallShort),
      })
    }
    return spokeMap
  }

  g.three.mkr.wheel = wheel => {
    const msh = { ...g.three.msh }
    const wheelies = {}
    const spokeMap = g.three.mkr.spokeMap()
    for (let spoke = 0; spoke < 6; spoke++) {
      const mat = {
        long: [],
        short: [],
      }
      for (let sps = 0; sps < 6; sps++) {
        mat.long.push(new THREE.MeshBasicMaterial({
          ...msh,
          ...spokeMap.long[sps]
        }))
        mat.short.push(new THREE.MeshBasicMaterial({
          ...msh,
          ...spokeMap.short[sps]
        }))
      }
      const spokeLong = {
        geo: 'box',
        struct: [18, 142, 52],
        rotation: [0, 0, spoke * 30],
        mat: mat.long,
      }
      const spokeShort = {
        geo: 'box',
        struct: [18, 120, 52],
        rotation: [0, 0, (spoke * 30) + 15],
        mat: mat.short,
      }
      wheelies[`wheel${wheel}spokeLong${spoke}`] = spokeLong
      wheelies[`wheel${wheel}spokeShort${spoke}`] = spokeShort
    }
    const hubCapMat = {
      map: g.three.mkr.textureLoader(wheel.includes('F') ? assTireHubCapF : assTireHubCapA),
    }
    wheelies[`wheel${wheel}hubCap`] = {
      geo: 'circle',
      struct: [43, 32],
      position: [0, 0, 26],
      mat: new THREE.MeshBasicMaterial({
        ...msh,
        ...hubCapMat
      }),
    }
    let flares = {}
    for (let flare = 0; flare < 3; flare++) {
      const thisFlare = `wheel${wheel}flare${flare + 1}`
      const flareMat = {
        opacity: 0.88,
        map: g.three.mkr.textureLoader(assRocketFlare),
      }
      flares[thisFlare] = {
        struct: [276, 376],
        pivot: [0, -188],
        rotation: [0, 120 * flare],
      }
      const thisFlr = g.three.mkr.flr.length
      g.three.mkr.flr.push({
        cdt: 0,
        ctl: 0,
        mat: {
          ...msh,
          ...flareMat
        },
      })
      flares[thisFlare].mat = new THREE.MeshBasicMaterial(g.three.mkr.flr[thisFlr].mat)
      g.three.mkr.flr[thisFlr].ani = g.three.mkr.setTextureAnimator(thisFlr, 5, 1, 5, 75) // texture, #horiz, #vert, #total, duration.
    }
    wheelies[`wheel${wheel}flares`] = {
      struct: [276, 276, 376],
      pivot: [0, -188],
      rotation: [-90],
      children: flares
    }

    return {
      struct: [142, 142, 52],
      position: [0, wheel.includes('F') ? 289 : -286.5 ],
      children: wheelies,
    }
  }

  g.three.mkr.setTextureAnimator = (flr, hTiles, vTiles, totTiles, tileDisplayDuration) => {
    // note: texture passed by reference, will be updated by the update function // we hope
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet.
    g.three.mkr.flr[flr].mat.map.wrapS = g.three.mkr.flr[flr].mat.map.wrapT = THREE.RepeatWrapping
    g.three.mkr.flr[flr].mat.map.repeat.set(1 / hTiles, 1 / vTiles)

    return milliSec => {
      g.three.mkr.flr[flr].cdt += milliSec
      while (g.three.mkr.flr[flr].cdt > tileDisplayDuration) {
        g.three.mkr.flr[flr].cdt -= tileDisplayDuration
        let nextTile = g.three.mkr.flr[flr].ctl
        while (nextTile === g.three.mkr.flr[flr].ctl) nextTile = randOnum(0, totTiles - 1)
        var currentColumn = g.three.mkr.flr[flr].ctl % hTiles
        g.three.mkr.flr[flr].mat.map.offset.x = currentColumn / hTiles
        var currentRow = Math.floor( g.three.mkr.flr[flr].ctl / hTiles )
        g.three.mkr.flr[flr].mat.map.offset.y = currentRow / vTiles
      }
    }
  }

  g.three.mkr.update = () => {
    const delta = g.three.clk.getDelta()
    g.three.mkr.flr.forEach(flr => {
      flr.ani(1000 * delta)
    })
  }

  // it remains to be seen whether this approach will actually save any time or code... I think it will at least cut down some of three's repetition
  // just remember that ALL NAME/ID KEYS IN THE FOLLOWING OBJECT MUST BE UNIQUE, REGARDLESS OF NESTING LEVEL
  g.three.makeObjs = {
    deLorean: {
      position: [0, 0, -848],
      children: {
        underCarriage: {
          children: {
            bottom: {
              children: {
                ucF: {
                  struct: [432, 119],
                  txtAss: assUnderCarriageF,
                  pivot: [0, 59.5],
                  position: [0, 364.5, -23],
                  rotation: [-6.71],
                },
                ucC: {
                  struct: [432, 729],
                  txtAss: assUnderCarriageC,
                },
                ucA: {
                  struct: [432, 152],
                  position: [0, -364.5, -26],
                  rotation: [7.125],
                  children: {
                    ucPanelA: {
                      struct: [432, 152],
                      txtAss: assUnderCarriageA,
                      pivot: [0, -76],
                    },
                    exhaustPipes: {
                      position: [0, -132, -9],
                      children: {
                        exPL: {
                          children: g.three.mkr.exhaustPipe('L'),
                          position: [123],
                        },
                        exPR: {
                          children: g.three.mkr.exhaustPipe('R'),
                          position: [-118],
                        }
                      }
                    }
                  }
                },
              },
            },
            top: {
              children: {
                ucWheelWallFL: {
                  struct: [127, 150],
                  color: new THREE.Color('black'),
                  pivot: [63.5],
                  position: [142, 289.5],
                  rotation: [0, 90],
                },
                ucWheelWallFR: {
                  struct: [127, 150],
                  color: new THREE.Color('black'),
                  pivot: [-63.5],
                  position: [-142, 289.5],
                  rotation: [0, -90],
                },
                ucWheelWallAL: {
                  struct: [127, 157],
                  color: new THREE.Color('black'),
                  pivot: [63.5],
                  position: [142, -286],
                  rotation: [0, 90],
                },
                ucWheelWallAR: {
                  struct: [127, 157],
                  color: new THREE.Color('black'),
                  pivot: [-63.5],
                  position: [-142, -286],
                  rotation: [0, -90],
                },
                ucAxleWallFF: {
                  struct: [432, 127],
                  txtAss: assCrossAxleF,
                  pivot: [0, -63.5],
                  position: [0, 364.5],
                  rotation: [90]
                },
                ucAxleWallFA: {
                  struct: [432, 127],
                  txtAss: assCrossAxle,
                  pivot: [0, -63.5],
                  position: [0, 214.5],
                  rotation: [90]
                },
                ucAxleWallAF: {
                  struct: [432, 127],
                  txtAss: assCrossAxle,
                  pivot: [0, -63.5],
                  position: [0, -207.5],
                  rotation: [90]
                },
                ucAxleWallAA: {
                  struct: [432, 127],
                  txtAss: assCrossAxleA,
                  pivot: [0, -63.5],
                  position: [0, -364.5],
                  rotation: [90]
                },
                ucWheelWellF: {
                  color: new THREE.Color('black'),
                  struct: [402, 150],
                  position: [ 0, 289.5, -127 ],
                },
                ucWheelWellA: {
                  color: new THREE.Color('black'),
                  struct: [402, 157],
                  position: [ 0, -286, -127 ],
                }
              },
            },
          },
        },
        body: {
          children: {

          },
        },
        wheels: {
          struct: [432, 729, 142],
          position: [0, 0, -11],
          children: {
            wheelsL: {
              struct: [142, 729, 52],
              pivot: [71],
              position: [ 223 ],
              children: {
                wheelLF: g.three.mkr.wheel('LF'),
                wheelLA: g.three.mkr.wheel('LA'),
              }
            },
            wheelsR: {
              struct: [142, 729],
              pivot: [-71],
              position: [ -223 ],
              children: {
                wheelRF: g.three.mkr.wheel('RF'),
                wheelRA: g.three.mkr.wheel('RA'),
              },
            },
          },
        },
      },
    },
  }

  Object.keys(g.three.makeObjs).forEach(obj => makeThreeObj(obj, g.three.makeObjs[obj]))

  console.log({ madeObjs: g.three })
  Object.keys(g.three.makeObjs).forEach(grp => g.three.scene.add(g.three.grp[grp]))

  g.three.controls.target.copy(g.three.grp.deLorean.position)
  g.three.controls.update()

  g.three.lights = [
    new THREE.AmbientLight(0x404040), // soft white light
    new THREE.DirectionalLight( 0xffffff, 0.5 ),
  ]
  g.three.lights.forEach(light => g.three.scene.add( light ))

  const resize = () => {
    if (g.three.renderer.domElement.width !== g.three.cvs[0] || g.three.renderer.domElement.height !== g.three.cvs[1]) {
      setSize()
      return true
    }
    return false
  }

  const animate = () => {
    if (resize()) {
      g.three.camera.aspect = g.three.cvs[0] / g.three.cvs[1]
      g.three.camera.updateProjectionMatrix()
    }
    requestAnimationFrame( animate )
    g.three.renderer.render(g.three.scene, g.three.camera)
    g.three.mkr.update()
  }

  animate()
}

const makeThreeObj = (obj, makeObj) => {
  if (obj && makeObj) {
    if (makeObj.children) {
      makeObj.geo = 'group'
      Object.keys(makeObj.children).forEach(childObj => makeThreeObj(childObj, makeObj.children[childObj]))
    } else if (!makeObj.geo) {
      makeObj.geo = 'plane'
    }
    let makeFail, makeMesh
    if (makeObj.geo !== 'group' && makeObj.struct && makeObj.struct.length && makeObj.struct.length >= 2) {
      g.three.obj[obj] = {}
      makeMesh = { ...g.three.msh }
      if (makeObj.msh) Object.keys(makeObj.msh).forEach(mshProp => makeMesh[mshProp] = makeObj.msh[mshProp])
      if (!makeObj.mat) makeObj.mat = THREE.MeshBasicMaterial
    }
    switch (makeObj.geo) {
      case 'cylinder':
        if (g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] && makeObj.struct[3]) {
          g.three.obj[obj].geo = new THREE.CylinderGeometry(makeObj.struct[0], makeObj.struct[1], makeObj.struct[2], makeObj.struct[3])
        } else makeFail = { makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'box':
        if (g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2]) {
          g.three.obj[obj].geo = new THREE.BoxGeometry(makeObj.struct[0], makeObj.struct[1], makeObj.struct[2])
        } else makeFail = { makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'circle':
        if (g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1]) {
          g.three.obj[obj].geo = new THREE.CircleGeometry(makeObj.struct[0], makeObj.struct[1])
        } else makeFail = { makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'plane':
        if (g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1]) {
          g.three.obj[obj].geo = new THREE.PlaneGeometry(makeObj.struct[0], makeObj.struct[1])
        } else makeFail = { makeFail: makeObj, failedOn: { geo: makeObj.geo } }
        break
      case 'group':
      default:
        g.three.grp[obj] = new THREE.Group()
    }
    if (makeFail) devLog(makeFail)
    else if (g.three.obj[obj] && g.three.obj[obj].geo && makeMesh && makeObj.mat) {
      if (makeObj.txtAss) makeMesh.map = g.three.obj[obj].txt = new THREE.TextureLoader().load(makeObj.txtAss)
      if (typeof makeObj.color !== 'undefined') makeMesh.color = g.three.obj[obj].hex = makeObj.color
      g.three.obj[obj].mat = isFunction(makeObj.mat) ? new makeObj.mat(makeMesh) : makeObj.mat
      if (makeObj.pivot && g.three.obj[obj].geo) g.three.obj[obj].geo.translate(makeObj.pivot[0] || 0, makeObj.pivot[1] || 0, makeObj.pivot[2] || 0)
      if (g.three.obj[obj].geo && g.three.obj[obj].mat) g.three.obj[obj].msh = new THREE.Mesh(g.three.obj[obj].geo, g.three.obj[obj].mat)
      if (g.three.obj[obj].msh) {
        if (makeObj.position) {
          g.three.xyz.forEach((axis, i) => {
            if (typeof makeObj.position[i] !== 'undefined' && makeObj.position[i]) g.three.obj[obj].msh.position[axis] = makeObj.position[i]
          })
        }
        if (makeObj.rotation) {
          g.three.xyz.forEach((axis, i) => {
            if (typeof makeObj.rotation[i] !== 'undefined' && makeObj.rotation[i]) g.three.obj[obj].msh[`rotate${axis.toUpperCase()}`](THREE.Math.degToRad(makeObj.rotation[i]))
          })
        }
      }
    } else if (makeObj.children && g.three.grp[obj]) {
      Object.keys(makeObj.children).forEach(childObj => {
        if (g.three.grp[childObj] || g.three.obj[childObj]) g.three.grp[obj].add(g.three.obj[childObj] ? g.three.obj[childObj].msh || g.three.obj[childObj] : g.three.grp[childObj])
      })
      if (makeObj.rotation) {
        g.three.xyz.forEach((axis, i) => {
          if (typeof makeObj.rotation[i] !== 'undefined' && makeObj.rotation[i]) g.three.grp[obj][`rotate${axis.toUpperCase()}`](THREE.Math.degToRad(makeObj.rotation[i]))
        })
      }
      if (makeObj.position) g.three.grp[obj].position.set(makeObj.position[0] || 0, makeObj.position[1] || 0, makeObj.position[2] || 0)
    }
  }
}

export { beginFuture, setFuture, setModel, setThree }
