import { gsap } from 'gsap'

import g from './glob'

const setTitles = () => {
  if (g.el.tpTitle) {
    const tpTitleW = g.w.w < 2401 ? (g.w.w * 29) / 50 : 1392
    gsap.set(Array.from(g.el.tpTitle), {
      height: (tpTitleW * 202) / 1392,
      width: tpTitleW,
    })
  }
}

export { setTitles }
