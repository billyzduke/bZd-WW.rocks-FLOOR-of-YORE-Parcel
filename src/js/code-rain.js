/*!
  BASED ON CODE LICENSED FROM https://codecanyon.net/item/code-rain-javascript-matrix-effect/25307087
 * Code Rain v1.0.0
 * (c) CreativeTier
 * contact@creativetier.com
 * http://www.creativetier.com
 */

import g from './glob'
import { isSet } from './utils'

const randomizeRain = (n1, n2) => {
  if (isSet(n2)) {
    return Math.floor(Math.random() * (n2 - n1 + 1) + n1)
  }
  return Math.floor(Math.random() * n1)
}

const rain = rId => {
  if (g.codeRain[rId]) {
    g.codeRain[rId].context1.fillStyle = g.codeRain[rId].overlayColor
    g.codeRain[rId].context1.fillRect(0, 0, g.codeRain[rId].canvas1.width, g.codeRain[rId].canvas1.height)

    g.codeRain[rId].context1.fillStyle = g.codeRain[rId].textColor
    g.codeRain[rId].context1.font = `${g.codeRain[rId].fontSize}px ${g.codeRain[rId].font}`

    if (g.codeRain[rId].highlightFirstChar) {
      g.codeRain[rId].context2.clearRect(0, 0, g.codeRain[rId].canvas2.width, g.codeRain[rId].canvas2.height)
      g.codeRain[rId].context2.font = `${g.codeRain[rId].fontSize}px ${g.codeRain[rId].font}`
    }

    for (let i = 0; i < g.codeRain[rId].columns; i++) {
      const c = g.codeRain[rId].characters[randomizeRain(g.codeRain[rId].charLength)]

      g.codeRain[rId].context1.fillText(c, g.codeRain[rId].columnWidth * i, g.codeRain[rId].rowHeight * g.codeRain[rId].drops[i])

      if (g.codeRain[rId].highlightFirstChar) {
        g.codeRain[rId].context2.fillStyle = g.codeRain[rId].highlightFirstChar
        g.codeRain[rId].context2.fillText(c, g.codeRain[rId].columnWidth * i, g.codeRain[rId].rowHeight * g.codeRain[rId].drops[i])
      }

      if (g.codeRain[rId].drops[i] > g.codeRain[rId].rows && Math.random() > 0.975) {
        g.codeRain[rId].drops[i] = 0
      }

      g.codeRain[rId].drops[i]++
    }
  }
}

const fillCanvas = rId => {
  if (g.codeRain[rId]) {
    for (let i = 0; i < 150; i++) {
      rain(rId)
    }
  }
}

const clearRain = rId => {
  if (g.codeRain[rId]) {
    g.codeRain[rId].context1.clearRect(0, 0, g.codeRain[rId].canvas1.width, g.codeRain[rId].canvas1.height)

    if (g.codeRain[rId].highlightFirstChar) {
      g.codeRain[rId].context2.clearRect(0, 0, g.codeRain[rId].canvas2.width, g.codeRain[rId].canvas2.height)
    }
  }
}

const startRaining = rId => {
  if (g.codeRain[rId]) {
    if (!g.codeRain[rId].showStart) {
      fillCanvas(rId)
    }

    g.codeRain[rId].interval = setInterval(() => rain(rId), g.codeRain[rId].interval)

    g.codeRain[rId].raining = true
  }
}

const stopRaining = (rId, clear) => {
  if (g.codeRain[rId]) {
    clearInterval(g.codeRain[rId].interval)

    if (clear) {
      clearRain(rId)
    }

    g.codeRain[rId].raining = false
  }
}

const unSetCodeRain = rId => {
  if (g.codeRain[rId]) {
    stopRaining(rId, true)

    g.codeRain[rId].canvas1.width = null
    g.codeRain[rId].canvas1.height = null

    if (g.codeRain[rId].highlightFirstChar) {
      g.codeRain[rId].canvas2.width = null
      g.codeRain[rId].canvas2.height = null
    }
  }
}

const isRaining = rId => {
  if (g.codeRain[rId]) {
    return g.codeRain[rId].raining
  }
  return false
}

const setCodeRain = config => {
  if (config.element) {
    const rId = config.element.id
    if (!isSet(config.autoStart)) {
      config.autoStart = false
    }
    g.codeRain = {}
    g.codeRain[rId] = config
    g.codeRain[rId].canvas1 = g.document.createElement('canvas')
    g.codeRain[rId].element.appendChild(g.codeRain[rId].canvas1)
    g.codeRain[rId].context1 = g.codeRain[rId].canvas1.getContext('2d')
    g.codeRain[rId].canvas2 = g.document.createElement('canvas')
    g.codeRain[rId].element.appendChild(g.codeRain[rId].canvas2)
    g.codeRain[rId].context2 = g.codeRain[rId].canvas2.getContext('2d')
    g.codeRain[rId].canvas1.width = config.element.offsetWidth
    g.codeRain[rId].canvas1.height = config.element.offsetHeight

    if (config.highlightFirstChar) {
      g.codeRain[rId].canvas2.width = config.element.offsetWidth
      g.codeRain[rId].canvas2.height = config.element.offsetHeight
    }
    g.codeRain[rId].characters = config.characters.split('')
    g.codeRain[rId].charLength = g.codeRain[rId].characters.length
    g.codeRain[rId].drops = []

    g.codeRain[rId].columns = g.codeRain[rId].canvas1.width / config.columnWidth
    g.codeRain[rId].rows = g.codeRain[rId].canvas1.height / config.rowHeight

    switch (config.direction) {
      case 'top-bottom':
      default:
        for (let i = 0; i < g.codeRain[rId].columns; i++) {
          if (!isSet(g.codeRain[rId].drops[i])) g.codeRain[rId].drops[i] = g.codeRain[rId].rows + 1
        }
    }

    if (config.autoStart) {
      startRaining(rId)
    }

    return rId
  }
  return null
}

export {
  isRaining, setCodeRain, startRaining, stopRaining, unSetCodeRain
}
