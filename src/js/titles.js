import { gsap } from 'gsap'

const setTitles = (w, el) => {
  if (el.tpTitle) {
    const tpTitleW = w.w < 2401 ? (w.w * 29) / 50 : 1392
    gsap.set(Array.from(el.tpTitle), {
      height: (tpTitleW * 202) / 1392,
      width: tpTitleW,
    })
  }
}

export { setTitles }
