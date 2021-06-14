import g from '/src/shared/_'
import { beginFuture } from '/src/future/_'

const scene13 = 'Do the Time Warp / Pilot the DeLorean'

const setScene13 = ( c, n ) => {
  g.scene.setting = c

  beginFuture()

  return true
}

const spinTime = () => {
  // gsap.set('#deLorean', {
  //   rotateX: 90,
  //   rotateY: 180,
  //   rotateZ: 180,
  //   translateZ: 1000,
  //   translateY: 200,
  // })

  // gsap.to('#deLorean', {
  //   duration: 20,
  //   ease: 'none',
  //   repeat: -1,
  //   rotateX: 0,
  //   yoyo: true,
  // })
  // gsap.to('#deLorean', {
  //   duration: 40,
  //   ease: 'none',
  //   repeat: -1,
  //   rotateY: 270,
  //   yoyo: true,
  // })


}

export { scene13, setScene13 }
