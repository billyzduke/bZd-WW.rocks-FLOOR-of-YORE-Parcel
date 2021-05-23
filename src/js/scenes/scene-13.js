import g from '../glob'
import { beginFuture } from '../future'

const scene13 = 'Enter the DeLorean'

const setScene13 = (c, n) => {
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
