import { TimelineMax as TL } from 'gsap'

import g from '/src/js/glob'

const obscure = (forSecs = 1) => {
  if (!g.scene.skip.ff) {
    const obscureTL = new TL({ defaults: { overwrite: false } })
    obscureTL.set('#obscuro', {
      pointerEvents: 'auto',
    })
      // .to('#helpToggle', {
      //   duration: 0.5,
      //   opacity: 0,
      // }, '<')
      .set('#obscuro', {
        pointerEvents: 'none',
      }, `<${forSecs}`)
    // .to('#helpToggle', {
    //   duration: 0.5,
    //   opacity: 0.24,
    // }, '<')
  }
  return true
}

const obscureGrandiose = (talkToTheHand = 1) => {
  if (!g.scene.skip.ff) {
    const obscureTL = new TL({ defaults: { overwrite: false } })
    obscureTL.set('#obscuro', {
      pointerEvents: 'auto',
    })
      .to('#helpToggle', {
        duration: 0.5,
        opacity: 0,
      }, '<')
      .to('#obscuro, #greenThumb', {
        duration: 1,
        ease: 'power2',
        opacity: 1,
      }, '<')
      .to('#greenThumb', {
        duration: 0.5,
        ease: 'power2.in',
        opacity: 0,
      }, '>')
      .to('#redHand, #obscuroGlo', {
        duration: 0.5,
        ease: 'power2',
        opacity: 1,
        repeat: talkToTheHand * 2 - 1,
        yoyo: true,
      }, '>')
      .to('#greenHand', {
        duration: 0.5,
        ease: 'power2',
        opacity: 1,
      }, '>')
      .set('#obscuro', {
        pointerEvents: 'none',
      }, g.scene.skip.ff ? '>' : '<0.25')
      .to('#obscuro, #greenHand', {
        duration: 1,
        ease: 'power2.in',
        opacity: 0,
      }, g.scene.skip.ff ? '>' : '<0.25')
      .to('#helpToggle', {
        duration: 0.5,
        opacity: 0.24,
      }, '>')
  }
  return true
}

export { obscure, obscureGrandiose }
