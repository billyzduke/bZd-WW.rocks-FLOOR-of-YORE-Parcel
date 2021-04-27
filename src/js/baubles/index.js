import { gsap } from 'gsap'

import { padStr } from '../utils'
import g from '../glob'

const setBaublesInLayer = (bLyr, bCnt, bOpts, qMvSttrs) => {
  /*
    bOpts = {
      d: [baubleIndex: diameterValue]
    }
  */
  const padLyr = padStr(bLyr)
  const bL = {
    b: [],
    bD: [],
    bN: [],
    bW: g.document.getElementById(`bW${padLyr}`),
  }
  const bLyrClass = `bL${padLyr}`
  for (let b = 0; b < bCnt; b++) {
    bL.bD[b] = g.b.d
    bL.bN[b] = g.document.createElement('div')
    bL.bN[b].classList.add('bN')
    bL.b[b] = g.document.createElement('div')
    bL.b[b].id = `${bLyrClass}_b${padStr(b)}`
    bL.b[b].classList.add('b', bLyrClass)
    if (bOpts.d && bOpts.d[b] && bOpts.d[b] !== bL.bD[b]) {
      bL.bD[b] = bOpts.d[b]
      bL.b[b].style.height = `${bOpts.d[b]}px`
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

export { setBaublesInLayer }
