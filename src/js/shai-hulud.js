import g from './glob'
import { roundNumberTo, setClearActors, setClearInterval } from './utils'

const clearShaiHulud = () => (setClearInterval(g.worm.ribs.ntrvl) && setClearInterval(g.worm.stars.ntrvl) ? setClearActors('#drWorm, #wormSignScreen, #solarCorona, #circlingSparks') : false)

const wormScale = s => s * g.worm.ring.dI

const wormCenter = s => (g.worm.ring.dO - wormScale(s)) / 2

const doTheWorm = (s, fH) => {
  const wCtr = roundNumberTo(wormCenter(s), 4)
  const wCtrAdj = roundNumberTo(wCtr + wormScale(s), 4)
  const useCtrX = fH ? wCtrAdj : wCtr
  return `translate(${useCtrX}px, ${wCtr}px) scaleX(${fH ? '-' : ''}${s}) scaleY(${s})`
}

const setShaiHulud = () => {
  const ww = g.w.w > g.w.h ? g.w.w : g.w.h
  const wormSignShiftY = ((g.w.h - ww) / 2) - (g.cyOffPx / 2)

  g.el.drWorm.style.top = `${wormSignShiftY}px`

  g.el.wormSignScreen.style.transform = `translateY(${wormSignShiftY}px) scale(0)`
  g.el.wormSignScreen.height = Number(window.getComputedStyle(g.el.drWorm, null).getPropertyValue('height').slice(0, -2))
  g.el.wormSignScreen.style.height = `${g.el.wormSignScreen.height}px`
  g.el.wormSignScreen.width = Number(window.getComputedStyle(g.el.drWorm, null).getPropertyValue('width').slice(0, -2))
  g.el.wormSignScreen.style.width = `${g.el.wormSignScreen.width}px`

  const wormRingSegments = g.el.wormRingSegment
  const wrmSegs = wormRingSegments.length
  let flipH = false
  let lastWrmSeg
  wormRingSegments.forEach((el, i) => {
    const wrmScale = 0.069 * (2.02799845 ** (wrmSegs - i - 1))
    el.style.height = `${wormScale(wrmScale)}px`
    el.style.opacity = 1
    el.style.width = el.style.height
    el.style.transform = doTheWorm(wrmScale, flipH)
    flipH = !flipH
    lastWrmSeg = el
  })

  if (g.w.w < 2755) {
    const lastWormTube = lastWrmSeg.querySelector('.wormTube')
    if (lastWormTube) lastWrmSeg.removeChild(lastWormTube)
  }

  let path = ''
  const loops = 12 // must set stroke-width and circle radius accordingly = 0.25/loops
  const coverCornerLoops = Math.ceil(loops * Math.sqrt(2)) + 1/* for inner circle */
  const loopSteps = 16
  const tangentOff = (4 / 3) * Math.tan(Math.PI / (2 * loopSteps))

  let px = g.worm.ring.rO
  let py = px
  let pcx = 0
  let pcy = 0

  for (let loop = 0; loop <= coverCornerLoops; loop++) {
    for (let i = 0; i < loopSteps; i++) {
      const radius = Math.max(0.25 / loops, (i / loopSteps + loop) / loops / 2) * g.worm.ring.dO
      const angle = 2 * Math.PI * i / loopSteps
      const x = Math.cos(angle) * radius + g.worm.ring.rO
      const y = Math.sin(angle) * radius + g.worm.ring.rO

      const tangent = angle + Math.PI / 2
      const cx = Math.cos(tangent) * radius * tangentOff
      const cy = Math.sin(tangent) * radius * tangentOff

      if (loop === 0 && i === 1) {
        path = `${path}M${x} ${y}`
      } else if (!(loop === 0 && i === 0)) {
        path = `${path}C${px + pcx} ${py + pcy} ${x - cx} ${y - cy} ${x} ${y}`
      }

      px = x
      py = y
      pcx = cx
      pcy = cy
    }
  }
  g.el.spiralOutPath.setAttribute('d', path)
}

export { clearShaiHulud, setShaiHulud }
