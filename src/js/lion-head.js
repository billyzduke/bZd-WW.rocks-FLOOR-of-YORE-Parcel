import { gsap } from 'gsap'

const moveLionEyes = (m, el, scene) => {
  if (el.phasingRainbow && scene >= 8 && lionEyesActive) {
    const thirdEyeDeets = el.phasingRainbow.getBoundingClientRect()
    lionEyesQuickSetter({
      translateX: gsap.utils.clamp(-16, 12.44, -(thirdEyeDeets.x + (thirdEyeDeets.width / 2) - m.x) / 54),
      translateY: gsap.utils.clamp(-7, 9.55, -(thirdEyeDeets.y + 50 - m.y) / 42),
    })
  }
}

export { moveLionEyes }
