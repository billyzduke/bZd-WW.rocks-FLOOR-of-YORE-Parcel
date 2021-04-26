import { gsap } from 'gsap'

import g from './glob'

const setGrove = () => {
  if (g.el.ggrove) {
    const groveW = Math.floor(g.w.h * 2.1574)
    gsap.set(g.el.ggrove, {
      marginLeft: (g.w.w - groveW) / 2,
      width: groveW,
    })
  }
}

export { setGrove }
