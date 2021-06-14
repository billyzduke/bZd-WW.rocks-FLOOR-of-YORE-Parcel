import g from '/src/shared/_'

const shiftStars = () => {
  g.tL.stars.to( '.wormRing .wormTube .innerSpace .starField.starField_01', {
    duration: 1,
    ease: 'power3.inOut',
    rotation: '+=random(1, 6)',
    stagger: {
      each: 0.2,
    },
  }, '>' )
    .to( '.wormRing .wormTube .innerSpace .starField.starField_02', {
      duration: 1,
      ease: 'power3.inOut',
      rotation: '+=random(1, 6)',
      stagger: {
        each: 0.2,
      },
    }, '>' )
    .to( '.wormRing .wormTube .innerSpace .starField.starField_03', {
      duration: 1,
      ease: 'power3.inOut',
      rotation: '+=random(1, 6)',
      stagger: {
        each: 0.2,
      },
    }, '>' )
    .to( '.wormRing .wormTube .innerSpace .starField.starField_04', {
      duration: 1,
      ease: 'power3.inOut',
      rotation: '+=random(1, 6)',
      stagger: {
        each: 0.2,
      },
    }, '>' )
}

export { shiftStars }
