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
  g.three.camera = new THREE.PerspectiveCamera( 75, g.main.w / g.main.h, 0.1, 2000 )

  g.three.renderer = new THREE.WebGLRenderer( { alpha: true } )
  g.three.renderer.setSize( g.main.w, g.main.h )
  g.el.three.appendChild( g.three.renderer.domElement )

  g.three.camera.position.z = 5

  g.three.controls = new OrbitControls( g.three.camera, g.three.renderer.domElement );


  g.three.obj.underCarriageF = {
    geo: new THREE.PlaneGeometry( 432, 119 ),
    txt: new THREE.TextureLoader().load( assUnderCarriageF ),
  }
  g.three.obj.underCarriageF.mat = new THREE.MeshBasicMaterial({
    alphaTest: 0.5,
    map: g.three.obj.underCarriageF.txt,
    side: THREE.DoubleSide,
    transparent: true,
  })
  g.three.obj.underCarriageF.geo.translate(0, 59.5, 0)
  g.three.obj.underCarriageF.msh = new THREE.Mesh( g.three.obj.underCarriageF.geo, g.three.obj.underCarriageF.mat )
  g.three.obj.underCarriageF.msh.position.y = 364.5
  g.three.obj.underCarriageF.msh.position.z = -23
  g.three.obj.underCarriageF.msh.rotateX(THREE.Math.degToRad(-6.71))


  g.three.obj.underCarriageC = {
    geo: new THREE.PlaneGeometry( 432, 729 ),
    txt: new THREE.TextureLoader().load( assUnderCarriageC ),
  }
  g.three.obj.underCarriageC.mat = new THREE.MeshBasicMaterial({
    alphaTest: 0.5,
    map: g.three.obj.underCarriageC.txt,
    side: THREE.DoubleSide,
    transparent: true,
  })
  g.three.obj.underCarriageC.msh = new THREE.Mesh( g.three.obj.underCarriageC.geo, g.three.obj.underCarriageC.mat )


  g.three.obj.underCarriageA = {
    geo: new THREE.PlaneGeometry( 432, 152 ),
    txt: new THREE.TextureLoader().load( assUnderCarriageA ),
  }
  g.three.obj.underCarriageA.mat = new THREE.MeshBasicMaterial({
    alphaTest: 0.5,
    map: g.three.obj.underCarriageA.txt,
    side: THREE.DoubleSide,
    transparent: true,
  })
  g.three.obj.underCarriageA.geo.translate(0, -76, 0)
  g.three.obj.underCarriageA.msh = new THREE.Mesh( g.three.obj.underCarriageA.geo, g.three.obj.underCarriageA.mat )
  g.three.obj.underCarriageA.msh.position.y = -364.5
  g.three.obj.underCarriageA.msh.position.z = -26
  g.three.obj.underCarriageA.msh.rotateX(THREE.Math.degToRad(7.125))


  g.three.grp.deLorean = new THREE.Group()
  g.three.grp.deLorean.add(g.three.obj.underCarriageF.msh)
  g.three.grp.deLorean.add(g.three.obj.underCarriageC.msh)
  g.three.grp.deLorean.add(g.three.obj.underCarriageA.msh)
  g.three.grp.deLorean.position.set( 0, 0, -750 )

  g.three.scene.add(g.three.grp.deLorean)

  g.three.controls.target.copy(g.three.grp.deLorean.position);
  g.three.controls.update();

  const animate = () => {
    requestAnimationFrame( animate )
    g.three.renderer.render( g.three.scene, g.three.camera )
  }

  animate()
}


export { beginFuture, setFuture, setModel, setThree }
