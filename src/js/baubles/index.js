import { gsap } from 'gsap'

import { padStr } from '../utils'
import g from '../glob'

const setBaublesInLayer = (bLyr, bCnt, bOpts = {}, qMvSttrs = true) => {
  // bOpts = {
  //   d: { // id of property to adjust
  //     b: [ 'keys of baubles to adjust this property value on' ],
  //     v: 'property value to apply to above keys',
  //   }
  // }
  const padLyr = padStr(bLyr)
  const bL = {
    b: [],
    bD: [],
    bN: [],
    bW: g.document.getElementById(`bW${padLyr}`),
  }
  if (bL.bW) {
    const bLyrClass = `bL${padLyr}`
    for (let b = 0; b < bCnt; b++) {
      bL.bD[b] = g.b.d
      bL.bN[b] = g.document.createElement('div')
      bL.bN[b].classList.add('bN')
      bL.b[b] = g.document.createElement('div')
      bL.b[b].id = `${bLyrClass}_b${padStr(b)}`
      bL.b[b].classList.add('b', bLyrClass)
      // optional diameter
      if (bOpts.d && bOpts.d.b && bOpts.d.b.length && bOpts.d.b.includes(b)) {
        bL.bD[b] = bOpts.d.v
        bL.b[b].style.height = `${bL.bD[b]}px`
        bL.b[b].style.width = bL.b[b].style.height
      }
      bL.b[b].appendChild(bL.bN[b])
      bL.bW.appendChild(bL.b[b])
      if (qMvSttrs) {
        if (typeof bL.bQuickMoveSetters === 'undefined') bL.bQuickMoveSetters = []
        bL.bQuickMoveSetters[b] = gsap.quickSetter(bL.b[b], 'css')
      }
    }
    return bL
  }
  return null
}

export { setBaublesInLayer }
