/* eslint-disable func-names, guard-for-in, no-restricted-syntax, no-underscore-dangle, vars-on-top */ /* <-- This is all for the gsap helper function that I don't feel like spending time cleaning up */
/* eslint-disable no-bitwise */ /* <-- This is for the uuidv4 generator */
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

import g from './glob'

const addCSSRule = (sheet, selector, rules) => {
  if ('insertRule' in sheet) {
    sheet.insertRule(`${selector}{${rules}}`)
  } else if ('addRule' in sheet) {
    sheet.addRule(selector, rules)
  }
}

const convertTextToBinary = txt => {
  let bi = ''
  for (let i = 0; i < txt.length; i++) {
    bi += `${txt[i].charCodeAt(0).toString(2)} `
  }
  return bi
}

const getTranslateValues = element => {
  if (isSet(g.window)) {
    // eslint-disable-next-line no-undef
    const style = g.window.getComputedStyle(element)
    const matrix = style.transform || style.webkitTransform || style.mozTransform

    // No transform property. Simply return 0 values.
    if (matrix === 'none' || !isSet(matrix)) {
      return {
        x: 0,
        y: 0,
        z: 0,
      }
    }

    // Can either be 2d or 3d transform
    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === '2d') {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0,
      }
    }

    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === '3d') {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14],
      }
    }
  }
  return {}
}

const gsapToOrSet = (tL, too, too2, pos, set = false) => {
  if (tL) {
    if (set) {
      tL.set(too, too2, pos)
    } else tL.to(too, too2, pos)
  } else if (set) {
    gsap.set(too, too2)
  } else {
    gsap.to(too, too2)
  }
}

const gsapUnTick = tickFunc => {
  gsap.ticker.remove(tickFunc)
  if (g.dev) console.log(`${tickFunc.name}() removed from gsap.ticker`)
  return true
}

const gsapTick = tickFunc => {
  gsap.ticker.add(tickFunc)
  if (g.dev) console.log(`${tickFunc.name}() added to gsap.ticker`)
  return () => gsapUnTick(tickFunc)
}

// eslint-disable-next-line no-undef
const isNode = o => (typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string')

const isSet = value => !(typeof value === 'undefined')

const padStr = (input, padLen = 2, padWith = '0', start = true) => (start ? input.toString().padStart(padLen, padWith) : input.toString().padEnd(padLen, padWith))

const randOnum = (mn = 0, mx = 1, inc = 1) => {
  const totalSteps = (mx - mn) / inc
  const possibleValues = []
  for (let step = 0; step <= totalSteps; step += inc) {
    possibleValues[step] = mn + (step * inc)
  }
  let rando = Math.floor(Math.random() * (totalSteps + 1))
  rando = possibleValues[rando]
  rando = (parseInt(inc, 10) === inc) ? Math.floor(rando) : rando.toFixed(2)
  return (rando)
}

const randOcolor = (as = 'hex') => {
  const rgb = []
  switch (as) {
    case 'hex':
    default:
      for (let h = 0; h < 3; h++) rgb[h] = padStr(randOnum(0, 255).toString(16))
      return `#${rgb.join('')}`
  }
}

const roundNumberTo = (num, dec = 0) => Math.round(((num + Number.EPSILON) * (10 ** dec)) / (10 ** dec))

const setClearActors = domSelector => {
  const domElements = g.document.querySelectorAll(domSelector)
  domElements.forEach(domEl => {
    if (domEl.parentNode) domEl.parentNode.removeChild(domEl)
  })
  return true
}

const setClearInterval = ntrvl => {
  clearInterval(ntrvl)
  return true
}

const setRemoveOn = (domSelector, onEvent, doFunc, cursorOn = 'no-drop') => {
  const domElements = g.document.querySelectorAll(domSelector)
  domElements.forEach(domEl => {
    domEl.removeEventListener(onEvent, doFunc)
    if (g.dev) console.log(`event listener removed from #${domEl.id}: ${onEvent} => ${doFunc.name}()`)
    if (onEvent === 'click') domEl.style.cursor = cursorOn
  })
  return true
}

const setAddOn = (domSelector, onEvent, doFunc, cursorOn = 'pointer', cursorOff = 'no-drop') => {
  const domElements = g.document.querySelectorAll(domSelector)
  domElements.forEach(domEl => {
    domEl.addEventListener(onEvent, doFunc)
    if (g.dev) console.log(`event listener added to #${domEl.id}: ${onEvent} => ${doFunc.name}()`)
    domEl.style.cursor = cursorOn
  })
  return () => setRemoveOn(domSelector, onEvent, doFunc, cursorOff)
}

const shuffleArray = arr => {
  const ar = [ ...arr ]
  for (let i = ar.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ ar[i], ar[j] ] = [ ar[j], ar[i] ]
  }
  return ar
}

const svgPathsMorphOriginsHelper = (target1, target2, vars = {}) => {
  gsap.killTweensOf(target1, false, { morphSVG: true })
  const _getElement = function (e) {
    return (typeof (e) === 'string') ? g.document.querySelector(e) : e
  }
  const _setDefaults = function (v = {}, defaults) {
    for (const p in defaults) {
      if (!(p in v)) {
        v[p] = defaults[p]
      }
    }
    return v
  }
  const _createSVG = function (type, container, attributes) {
    const element = g.document.createElementNS('http://www.w3.org/2000/svg', type)
    const reg = /([a-z])([A-Z])/g
    let p
    for (p in attributes) {
      element.setAttributeNS(null, p.replace(reg, '$1-$2').toLowerCase(), attributes[p])
    }
    container.appendChild(element)
    return element
  }
  let editing = 'start'
  let lines; let startOrigin; let endOrigin
  const _createLines = function () {
    const rawPath = startElement._gsRawPath
    let i; let j; let segment; let line
    lines = []
    for (j = 0; j < rawPath.length; j++) {
      segment = rawPath[j]
      for (i = 0; i < segment.length; i += 6) {
        line = _createSVG('line', startElement.ownerSVGElement, { stroke: v.lineColor, strokeWidth: v.lineWidth })
        line.style.opacity = v.lineOpacity
        lines.push(line)
      }
      g.parentNode.appendChild(g)
    }
    return lines
  }
  const _update = function (leaveOrigin) {
    const rawPath = startElement._gsRawPath
    let li = 0
    const localToGlobal = globalG.getCTM().inverse().multiply(startElement.getCTM())
    const globalToLocal = localToGlobal.inverse()
    let o; let j; let i; let sl; let line; let segment; let ox; let oy; let x; let y
    if (rawPath && rawPath.origin) {
      if (leaveOrigin === true) {
        ox = gsap.getProperty(g, 'x')
        oy = gsap.getProperty(g, 'y')
      } else {
        o = rawPath.origin
        ox = o.x * localToGlobal.a + o.y * localToGlobal.c + localToGlobal.e
        oy = o.x * localToGlobal.b + o.y * localToGlobal.d + localToGlobal.f
        gsap.set(g, { x: ox, y: oy })
      }
      if (v.showLines) {
        if (!lines) {
          _createLines()
        }
        for (j = 0; j < rawPath.length; j++) {
          segment = rawPath[j]
          sl = segment.length
          for (i = 0; i < sl; i += 6) {
            line = lines[li++]
            line.setAttribute('x1', ox)
            line.setAttribute('y1', oy)
            line.setAttribute('x2', segment[i] * localToGlobal.a + segment[i + 1] * localToGlobal.c + localToGlobal.e)
            line.setAttribute('y2', segment[i] * localToGlobal.b + segment[i + 1] * localToGlobal.d + localToGlobal.f)
          }
        }
      }
      if (leaveOrigin === true) {
        x = ((ox * globalToLocal.a + oy * globalToLocal.c + globalToLocal.e) - rawPath.left) / rawPath.width
        y = ((ox * globalToLocal.c + oy * globalToLocal.d + globalToLocal.f) - rawPath.top) / rawPath.height
        if (editing === 'start') {
          startOrigin = `${Math.round(x * 100)}% ${Math.round(y * 100)}%`
        } else {
          endOrigin = `${Math.round(x * 100)}% ${Math.round(y * 100)}%`
        }
        label.textContent = startOrigin + (endOrigin ? `, ${endOrigin}` : '')
      }
    }
  }
  let startElement = _getElement(target1)
  let v = _setDefaults(vars, {
    fill: 'green', scale: 1, origin: '50% 50%', lineColor: 'white', lineWidth: 0.5, lineOpacity: 0.35, duration: 2.25, ease: 'power1.inOut', draggable: true,
  })
  let globalG = _createSVG('g', startElement.ownerSVGElement) // Firefox returns null for ownerSVGElement.getCTM(), so we need a dummy element
  const labelG = _createSVG('g', startElement.ownerSVGElement)
  const rect = _createSVG('rect', labelG, { width: 120, height: 17 })
  let label = _createSVG('text', labelG, { textAnchor: 'middle' })
  let g = _createSVG('g', startElement.ownerSVGElement)
  // eslint-disable-next-line no-unused-vars
  const clickArea = _createSVG('circle', g, { r: 20, style: 'fill:transparent' })
  const origin = _createSVG('circle', g, { r: 4, style: `fill:${v.fill};stroke:${v.lineColor}` })
  const tween = gsap.to(target1, {
    duration: v.duration,
    morphSVG: {
      shape: target2, type: 'rotational', origin: v.origin, smoothTolerance: v.smoothTolerance,
    },
    onUpdate: _update,
    ease: v.ease,
  })
  const bbox = startElement.getBBox()
  // eslint-disable-next-line no-unused-vars
  const globalToLocal = globalG.getCTM().inverse().multiply(startElement.getCTM()).inverse()
  const localToGlobal = globalG.getCTM().inverse().multiply(startElement.getCTM())
  const tl = gsap.timeline({ yoyo: true, repeat: -1, repeatDelay: 1.25 })

  gsap.set(rect, {
    y: -17, x: -60, fill: 'black', opacity: 0.4,
  })
  gsap.set(label, { y: -5, fontSize: 10, fill: 'white' })
  gsap.set([ g, labelG ], { scale: v.scale, svgOrigin: '0 0' })
  gsap.set(labelG, { x: bbox.x + bbox.width / 2 + localToGlobal.e, y: bbox.y + bbox.height + localToGlobal.f })
  tl.add(tween, 0)
    .to(origin, { duration: v.duration, fill: 'red', ease: 'steps(1)' }, 0)
  tl.time(0.0001)
  const rawPath = startElement._gsRawPath
  if (!rawPath || !rawPath.origin) {
    // eslint-disable-next-line no-throw-literal
    throw 'Please update to the latest MorphSVGPlugin'
  }
  if (v.origin.indexOf(',') !== -1) {
    // eslint-disable-next-line prefer-destructuring
    endOrigin = v.origin.split(',')[1]
  }
  _update()
  _update(true)
  if (isSet(Draggable)) {
    Draggable.create(g, {
      onPress() {
        if (tl.pause().progress() < 0.5) {
          editing = 'start'
          tl.progress(0.0001)
        } else {
          editing = 'end'
          tl.progress(0.99999)
        }
        MorphSVGPlugin.getTotalSize(startElement._gsRawPath) // re-calculates the top/left/width/height and attaches those to the rawPath.
        gsap.set(g, { x: this.x, y: this.y })
        _update(true)
      },
      onDrag() {
        _update(true)
      },
      onRelease() {
        const time = tl.time() // globalToLocal = startElement.ownerSVGElement.getCTM().inverse().multiply(startElement.getCTM()).inverse()
        tween.vars.morphSVG.origin = startOrigin + (endOrigin ? `,${endOrigin}` : '')
        tl.totalTime(0).invalidate().play(time > 0.001 ? time + 1.25 : 0)
      },
    })
  } else if (g.dev) console.log('Please load Draggable for findMorphOrigin() to work.')
  return tl
}

const uuidv4 = () => {
  const c = '0123456789abcdef'.split('')
  const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('')
  let r

  id[0] = c[(r = Math.random() * 0x100000000) & 0xf]
  id[1] = c[(r >>>= 4) & 0xf]
  id[2] = c[(r >>>= 4) & 0xf]
  id[3] = c[(r >>>= 4) & 0xf]
  id[4] = c[(r >>>= 4) & 0xf]
  id[5] = c[(r >>>= 4) & 0xf]
  id[6] = c[(r >>>= 4) & 0xf]
  id[7] = c[(r >>>= 4) & 0xf]

  id[9] = c[(r = Math.random() * 0x100000000) & 0xf]
  id[10] = c[(r >>>= 4) & 0xf]
  id[11] = c[(r >>>= 4) & 0xf]
  id[12] = c[(r >>>= 4) & 0xf]
  id[15] = c[(r >>>= 4) & 0xf]
  id[16] = c[(r >>>= 4) & 0xf]
  id[17] = c[(r >>>= 4) & 0xf]

  // eslint-disable-next-line no-mixed-operators
  id[19] = c[(r = Math.random() * 0x100000000) & 0x3 | 0x8]
  id[20] = c[(r >>>= 4) & 0xf]
  id[21] = c[(r >>>= 4) & 0xf]
  id[22] = c[(r >>>= 4) & 0xf]
  id[24] = c[(r >>>= 4) & 0xf]
  id[25] = c[(r >>>= 4) & 0xf]
  id[26] = c[(r >>>= 4) & 0xf]
  id[27] = c[(r >>>= 4) & 0xf]

  id[28] = c[(r = Math.random() * 0x100000000) & 0xf]
  id[29] = c[(r >>>= 4) & 0xf]
  id[30] = c[(r >>>= 4) & 0xf]
  id[31] = c[(r >>>= 4) & 0xf]
  id[32] = c[(r >>>= 4) & 0xf]
  id[33] = c[(r >>>= 4) & 0xf]
  id[34] = c[(r >>>= 4) & 0xf]
  id[35] = c[(r >>>= 4) & 0xf]

  return id.join('')
}

export {
  addCSSRule,
  convertTextToBinary,
  getTranslateValues,
  gsapToOrSet,
  gsapTick,
  isNode,
  isSet,
  padStr,
  randOnum,
  randOcolor,
  roundNumberTo,
  setAddOn,
  setClearActors,
  setClearInterval,
  setRemoveOn,
  shuffleArray,
  svgPathsMorphOriginsHelper,
  uuidv4,
}
