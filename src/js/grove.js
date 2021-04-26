import { gsap } from 'gsap'

const setGrove = (w, el) => {
  if (el.ggrove) {
    const groveW = Math.floor(w.h * 2.1574)
    gsap.set(el.ggrove, {
      marginLeft: (w.w - groveW) / 2,
      width: groveW,
    })
  }
}

export { setGrove }
