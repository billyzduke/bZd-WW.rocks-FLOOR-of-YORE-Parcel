import { gsap } from 'gsap'

import g from './glob'
import { pullRando } from './utils'

const setFloor = () => {
  if (g.el.yoreFloor) {
    gsap.set(g.el.yoreFloor, {
      left: (g.w.w - Number(g.window.getComputedStyle(g.el.yoreFloor, null).getPropertyValue('width').slice(0, -2))) / 2,
    })
  }
}

const readTheFloor = () => {
  gsap.to('#yoreFloorTitle', {
    duration: 2,
    ease: 'elastic.out',
    translateX: '-50%',
  })
}

const scrubTheFloor = () => {
  gsap.to('#yoreFloorTitle', {
    duration: 1,
    ease: 'back.in',
    translateX: `${pullRando() ? '-' : ''}${g.w.w * 1.5}`,
  })
}

export { scrubTheFloor, readTheFloor, setFloor }
