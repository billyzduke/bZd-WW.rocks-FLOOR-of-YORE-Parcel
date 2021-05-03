import { gsap } from 'gsap'

import g from './glob'
import { randOnum } from './utils'

const setFloor = () => {
  if (g.el.yoreFloor) {
    console.log(Number(g.window.getComputedStyle(g.el.main, null).getPropertyValue('height').slice(0, -2)))
    gsap.set(g.el.yoreFloor, {
      left: (g.w.w - Number(g.window.getComputedStyle(g.el.yoreFloor, null).getPropertyValue('width').slice(0, -2))) / 2,
      top: (Number(g.window.getComputedStyle(g.el.main, null).getPropertyValue('height').slice(0, -2)) * 0.9) - 110,
    })
  }
}

const scrubTheFloor = () => {
  gsap.to('#yoreFloorTitle', {
    duration: 1,
    ease: 'back.in',
    translateX: `${randOnum() ? '-' : ''}${g.w.w * 1.5}`,
  })
}

const readTheFloor = () => {
  gsap.to('#yoreFloorTitle', {
    duration: 2,
    ease: 'elastic.out',
    onComplete() {
      setTimeout(scrubTheFloor, 4242)
    },
    translateX: '-50%',
  })
}

export { scrubTheFloor, readTheFloor, setFloor }
