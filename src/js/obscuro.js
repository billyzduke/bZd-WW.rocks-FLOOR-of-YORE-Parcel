import { TimelineMax as TL } from 'gsap'

const obscure = (scene, forSecs = 1) => {
  const obscureTL = new TL({ defaults: { overwrite: false } })
  obscureTL.set('#obscuro', {
    pointerEvents: 'auto',
  })
    // .to('#helpToggle', {
    //   duration: scene.skipDur || 0.5,
    //   opacity: 0,
    // }, '<')
    .set('#obscuro', {
      pointerEvents: 'none',
    }, `<${scene.skipDur || forSecs}`)
    // .to('#helpToggle', {
    //   duration: scene.skipDur || 0.5,
    //   opacity: 0.24,
    // }, '<')
}

const obscureGrandiose = (scene, talkToTheHand = 1) => {
  const obscureTL = new TL({ defaults: { overwrite: false } })
  obscureTL.set('#obscuro', {
    pointerEvents: 'auto',
  })
    .to('#helpToggle', {
      duration: scene.skipDur || 0.5,
      opacity: 0,
    }, '<')
    .to('#obscuro, #greenThumb', {
      duration: scene.skipDur || 1,
      ease: 'power2',
      opacity: 1,
    }, '<')
    .to('#greenThumb', {
      duration: scene.skipDur || 0.5,
      ease: 'power2.in',
      opacity: 0,
    }, '>')
    .to('#redHand, #obscuroGlo', {
      duration: scene.skipDur || 0.5,
      ease: 'power2',
      opacity: 1,
      repeat: scene.skipDur ? 1 : talkToTheHand * 2 - 1,
      yoyo: true,
    }, '>')
    .to('#greenHand', {
      duration: scene.skipDur || 0.5,
      ease: 'power2',
      opacity: 1,
    }, '>')
    .set('#obscuro', {
      pointerEvents: 'none',
    }, scene.skipDur ? '>' : '<0.25')
    .to('#obscuro, #greenHand', {
      duration: scene.skipDur || 1,
      ease: 'power2.in',
      opacity: 0,
    }, scene.skipDur ? '>' : '<0.25')
    .to('#helpToggle', {
      duration: scene.skipDur || 0.5,
      opacity: 0.24,
    }, '>')
}

export { obscure, obscureGrandiose }
