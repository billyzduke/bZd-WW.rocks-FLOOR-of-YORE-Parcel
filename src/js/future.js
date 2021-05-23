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
    cvs: [g.main.cx, g.main.h],
    grp: {},
    mkr: {},
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

  g.three.mkr.wheel = () => {
    const wheel = {}
    for (let spoke = 0; spoke < 6; spoke++) {
      // spokeLong
      // spokeShort
    }
  //   [
  //     new THREE.MeshLambertMaterial({
  //         map: new THREE.TextureLoader().load(makeObj.txtAss)
  //     }),
  //     new THREE.MeshLambertMaterial({
  //         map: THREE.ImageUtils.loadTexture('/Content/Images/dice-2-hi.png')
  //     }),
  //     new THREE.MeshLambertMaterial({
  //         map: THREE.ImageUtils.loadTexture('/Content/Images/dice-3-hi.png')
  //     }),
  //     new THREE.MeshLambertMaterial({
  //         map: THREE.ImageUtils.loadTexture('/Content/Images/dice-4-hi.png')
  //     }),
  //     new THREE.MeshLambertMaterial({
  //         map: THREE.ImageUtils.loadTexture('/Content/Images/dice-5-hi.png')
  //     }),
  //     new THREE.MeshLambertMaterial({
  //         map: THREE.ImageUtils.loadTexture('/Content/Images/dice-6-hi.png')
  //     })
  //  ]
  }

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
        // width: 423px;
        // height: 729px;
        // top: 119px;
        // transform: translateZ(15px);
        wheels: {
          struct: [432, 729],
          position: [0, 0, 15],
          children: {
            wheelsL: {
              children: {
                wheelLF: g.three.mkr.wheel(),
                wheelLA: g.three.mkr.wheel(),
              }
            },
            wheelsR: {
              children: {
                wheelRF: g.three.mkr.wheel(),
                wheelRA: g.three.mkr.wheel(),
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
    g.three.renderer.render( g.three.scene, g.three.camera )
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
      makeMesh = {
        alphaTest: 0.5,
        side: THREE.DoubleSide,
        transparent: true,
      }
      if (makeObj.msh) Object.keys(makeObj.msh).forEach(mshProp => makeMesh[mshProp] = makeObj.msh[mshProp])
      if (!makeObj.mat) makeObj.mat = THREE.MeshBasicMaterial
    }
    switch (makeObj.geo) {
      case 'cylinder':
        if (g.three.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] && makeObj.struct[3]) {
          g.three.obj[obj].geo = new THREE.CylinderGeometry(makeObj.struct[0], makeObj.struct[1], makeObj.struct[2], makeObj.struct[3]);
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
