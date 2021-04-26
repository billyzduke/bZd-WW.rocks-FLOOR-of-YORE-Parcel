import { gsap } from 'gsap'

const setFloor = (w, el) => {
  if (el.yoreFloor) {
    gsap.set(el.yoreFloor, {
      left: (w.w - Number(window.getComputedStyle(el.yoreFloor, null).getPropertyValue('width').slice(0, -2))) / 2,
    })
  }
}

export { setFloor }
