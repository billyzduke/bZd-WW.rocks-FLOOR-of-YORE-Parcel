import { TimelineMax as TL } from 'gsap'

import g from './glob'

const obscure = (forSecs = 1) => {
  const obscureTL = new TL({ defaults: { overwrite: false } })
  obscureTL.set('#obscuro', {
    pointerEvents: 'auto',
  })
    // .to('#helpToggle', {
    //   duration: g.scene.skip.dur || 0.5,
    //   opacity: 0,
    // }, '<')
    .set('#obscuro', {
      pointerEvents: 'none',
    }, `<${g.scene.skip.dur || forSecs}`)
    // .to('#helpToggle', {
    //   duration: g.scene.skip.dur || 0.5,
    //   opacity: 0.24,
    // }, '<')
}

const obscureGrandiose = (talkToTheHand = 1) => {
  const obscureTL = new TL({ defaults: { overwrite: false } })
  obscureTL.set('#obscuro', {
    pointerEvents: 'auto',
  })
    .to('#helpToggle', {
      duration: g.scene.skip.dur || 0.5,
      opacity: 0,
    }, '<')
    .to('#obscuro, #greenThumb', {
      duration: g.scene.skip.dur || 1,
      ease: 'power2',
      opacity: 1,
    }, '<')
    .to('#greenThumb', {
      duration: g.scene.skip.dur || 0.5,
      ease: 'power2.in',
      opacity: 0,
    }, '>')
    .to('#redHand, #obscuroGlo', {
      duration: g.scene.skip.dur || 0.5,
      ease: 'power2',
      opacity: 1,
      repeat: g.scene.skip.dur ? 1 : talkToTheHand * 2 - 1,
      yoyo: true,
    }, '>')
    .to('#greenHand', {
      duration: g.scene.skip.dur || 0.5,
      ease: 'power2',
      opacity: 1,
    }, '>')
    .set('#obscuro', {
      pointerEvents: 'none',
    }, g.scene.skip.dur ? '>' : '<0.25')
    .to('#obscuro, #greenHand', {
      duration: g.scene.skip.dur || 1,
      ease: 'power2.in',
      opacity: 0,
    }, g.scene.skip.dur ? '>' : '<0.25')
    .to('#helpToggle', {
      duration: g.scene.skip.dur || 0.5,
      opacity: 0.24,
    }, '>')
}

export { obscure, obscureGrandiose }
