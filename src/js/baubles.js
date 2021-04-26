import { gsap } from 'gsap'

import { padStr } from './utils'
import { bDiam } from './glob'

const setBaublesInLayer = (el, bLyr, bCnt, bOpts, qMvSttrs) => {
  /*
    bOpts = {
      d: [baubleIndex: diameterValue]
    }
  */
  const bL = {
    b: [],
    bN: [],
  }
  const bLyrClass = `bL${padStr(bLyr)}`
  for (let b = 0; b < bCnt; b++) {
    bL.bN[b] = document.createElement('div')
    bL.bN[b].classList.add('bN')
    bL.b[b] = document.createElement('div')
    bL.b[b].id = `${bLyrClass}_b${padStr(b)}`
    bL.b[b].classList.add('b', bLyrClass)
    if (bOpts.d && bOpts.d[b] && bOpts.d[b] !== bDiam) bL.b[b].style.width = bL.b[b].style.height = `${bOpts.d[b]}px`
    bL.b[b].appendChild(bL.bN[b])
    bL.bW = el.bW[bLyr - 1]
    bL.bW.appendChild(bL.b[b])
    if (qMvSttrs) {
      if (typeof bL.bQuickMoveSetters === 'undefined') bL.bQuickMoveSetters = []
      bL.bQuickMoveSetters[b] = gsap.quickSetter(bL.b[b], 'css')
    }
  }
  return bL
}

export { setBaublesInLayer }
