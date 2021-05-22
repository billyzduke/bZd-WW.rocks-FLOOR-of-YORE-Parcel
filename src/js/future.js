import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import assUnderCarriageF from 'url:/src/img/future/underCarriageF.jpg'
import assUnderCarriageC from 'url:/src/img/future/underCarriageC.jpg'
import assUnderCarriageA from 'url:/src/img/future/underCarriageA.jpg'
import g from './glob'
import { setFlux } from './flux'
import { setAddOn } from './utils'

gsap.registerPlugin(TextPlugin)

const setFuture = () => {
  setFlux()
  gsap.set('#future', { opacity: 1 })
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

const pFiver = p5 => {
  g.p5bin = {}

  p5.preload = () => {
    g.p5bin.underCarriageF = p5.loadImage(assUnderCarriageF)
    g.p5bin.underCarriageC = p5.loadImage(assUnderCarriageC)
    g.p5bin.underCarriageA = p5.loadImage(assUnderCarriageA)
  }
  p5.setup = () => {
    p5.createCanvas(g.main.w, g.main.h, p5.WEBGL)
    p5.angleMode(p5.DEGREES)
  }

  p5.draw = () => {
    p5.fill(0,0,0,0)
    p5.texture(g.p5bin.underCarriageF)
    p5.translate(0, 0, -23)
    p5.rotateX(6.71)
    p5.plane(423, 119)

    p5.fill(0,0,0,0)
    p5.texture(g.p5bin.underCarriageC)
    p5.translate(0, 119, 0)
    p5.plane(423, 729)

    p5.fill(0,0,0,0)
    p5.texture(g.p5bin.underCarriageA)
    p5.translate(0, 848, -26)
    p5.rotateX(-7.125)
    p5.plane(423, 152)
  }
}

export { pFiver, setFuture, setModel }
