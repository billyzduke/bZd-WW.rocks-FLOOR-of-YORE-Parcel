import { gsap, TimelineMax as TL } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import assUnderCarriageF from 'url:/src/img/future/underCarriageF.png'
import assUnderCarriageC from 'url:/src/img/future/underCarriageC.png'
import assUnderCarriageA from 'url:/src/img/future/underCarriageA.png'
import g from './glob'
import { setFlux } from './flux'
import { gsapTick, randOnum, setAddOn, toggleFermata } from './utils'
import { Plane } from 'three'

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
    grp: {},
    obj: {},
  }
  g.three.scene = new THREE.Scene()
  g.three.camera = new THREE.PerspectiveCamera(75, g.main.w / g.main.h, 0.1, 2000)

  g.three.renderer = new THREE.WebGLRenderer({ alpha: true })
  g.three.renderer.setSize(g.main.w, g.main.h)
  g.el.three.appendChild(g.three.renderer.domElement)

  g.three.camera.position.z = 5

  g.three.controls = new OrbitControls(g.three.camera, g.three.renderer.domElement);

  g.three.makeObjs = {
    deLorean: {
      position: [0, 0, -750],
      children: {
        underCarriage: {
          children: {
            bottom: {
              children: {
                f: {
                  size: [432, 119, 0],
                  txtAss: assUnderCarriageF,
                  pivot: [0, 59.5, 0],
                  position: [0, 364.5, -23],
                  rotation: [-6.71, 0, 0],
                },
                c: {
                  size: [432, 729, 0],
                  txtAss: assUnderCarriageC,
                },
                a: {
                  size: [432, 152, 0],
                  txtAss: assUnderCarriageA,
                  pivot: [0, -76, 0],
                  position: [0, -364.5, -26],
                  rotation: [7.125, 0, 0],
                },
              },
            },
          },
        },
      },
    },
  }

  Object.keys(g.three.makeObjs).forEach(obj => makeThreeObj(obj, g.three.makeObjs[obj]))

  g.three.scene.add(g.three.grp.deLorean)

  g.three.controls.target.copy(g.three.grp.deLorean.position);
  g.three.controls.update();

  const animate = () => {
    requestAnimationFrame( animate )
    g.three.renderer.render( g.three.scene, g.three.camera )
  }

  animate()
}

const cart = [ 'x', 'y', 'z' ]

const makeThreeObj = (obj, makeObj) => {
  if (makeObj.children) {
    makeObj.geo = 'group'
    Object.keys(makeObj.children).forEach(childObj => makeThreeObj(childObj, makeObj.children[childObj]))
  } else if (!makeObj.geo) {
    makeObj.geo = 'plane'
  }
  if (makeObj.geo !== 'group') g.three.obj[obj] = {}
  let makeMesh
  switch (makeObj.geo) {
    case 'group':
      g.three.grp[obj] = new THREE.Group()
      break
    case 'plane':
    default:
      g.three.obj[obj].geo = new THREE.PlaneGeometry(makeObj.size[0], makeObj.size[1])
      makeMesh = {
        alphaTest: 0.5,
        side: THREE.DoubleSide,
        transparent: true,
      }
      if (makeObj.txtAss) {
        g.three.obj[obj].txt = new THREE.TextureLoader().load(makeObj.txtAss)
        makeMesh.map = g.three.obj[obj].txt
      }
  }
  if (g.three.obj[obj]) {
    if (makeMesh) g.three.obj[obj].mat = new THREE.MeshBasicMaterial(makeMesh)
    if (makeObj.pivot && g.three.obj[obj].geo) g.three.obj[obj].geo.translate(makeObj.pivot[0] || 0, makeObj.pivot[1] || 0, makeObj.pivot[2] || 0)
    if (g.three.obj[obj].geo && g.three.obj[obj].mat) g.three.obj[obj].msh = new THREE.Mesh(g.three.obj[obj].geo, g.three.obj[obj].mat)
    if (g.three.obj[obj].msh) {
      if (makeObj.position) {
        cart.forEach((axis, i) => {
          if (typeof makeObj.position[i] !== 'undefined' && makeObj.position[i]) g.three.obj[obj].msh.position[axis] = makeObj.position[i]
        })
      }
      if (makeObj.rotation) {
        for (let r = 0; r < 3; r++) {
          if (typeof makeObj.rotation[0] !== 'undefined' && makeObj.rotation[0]) g.three.obj[obj].msh[`rotate${cart[r].toUpperCase()}`](THREE.Math.degToRad(makeObj.rotation[r]))
        }
      }
    }
  }
  if (makeObj.children && g.three.grp[obj]) {
    Object.keys(makeObj.children).forEach(childObj => {
      g.three.grp[obj].add( g.three.obj[childObj] ? g.three.obj[childObj].msh || g.three.obj[childObj] : g.three.grp[childObj] )
    })
    if (makeObj.position) g.three.grp[obj].position.set( makeObj.position[0] || 0, makeObj.position[1] || 0, makeObj.position[2] || 0 )
  }
}

export { beginFuture, setFuture, setModel, setThree }
