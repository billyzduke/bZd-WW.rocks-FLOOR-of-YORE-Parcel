import { gsap } from 'gsap'

const setLion = (w, el, scene) => {
  if (el.lolf01 && el.lolf02) {
    let ww
    if (w.w >= 1220) {
      ww = w.h
      window.scrollTo(0, 0)
    } else {
      ww = w.w
    }
    gsap.set([ el.lolf01, el.lolf02 ], {
      scale: (ww / Number(window.getComputedStyle(el.lolf01, null).getPropertyValue('width').slice(0, -2))) * 0.9,
    })
    if (scene < 8 && el.theLion) {
      gsap.set(el.theLion, {
        rotation: -2880,
        scale: 0,
        transformOrigin: '325px 714px',
      })
    }
  }
}

export { setLion }
