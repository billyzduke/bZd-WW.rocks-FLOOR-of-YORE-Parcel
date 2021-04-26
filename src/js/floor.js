import { gsap } from 'gsap'

import g from './glob'

const setFloor = () => {
  if (g.el.yoreFloor) {
    gsap.set(g.el.yoreFloor, {
      left: (g.w.w - Number(window.getComputedStyle(g.el.yoreFloor, null).getPropertyValue('width').slice(0, -2))) / 2,
    })
  }
}

export { setFloor }
