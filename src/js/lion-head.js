import { gsap } from 'gsap'

import g from './glob'

const moveLionEyes = () => {
  if (g.el.phasingRainbow && g.scene.current >= 8 && g.lion.eyes.active) {
    const thirdEyeDeets = g.el.phasingRainbow.getBoundingClientRect()
    g.lion.eyes.followMouseQuickSetter({
      translateX: gsap.utils.clamp(-16, 12.44, -(thirdEyeDeets.x + (thirdEyeDeets.width / 2) - g.m.x) / 54),
      translateY: gsap.utils.clamp(-7, 9.55, -(thirdEyeDeets.y + 50 - g.m.y) / 42),
    })
  }
}

export { moveLionEyes }
