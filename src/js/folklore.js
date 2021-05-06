import { gsap, TimelineMax as TL } from 'gsap'

import assFolkloreTypewriter from 'url:/src/img/binaryFolklore/typewriter.png'
import assFolkloreBlueprint from 'url:/src/img/binaryFolklore/blueprint.gif'
import assFolkloreParchment from 'url:/src/img/binaryFolklore/parchment.png'
import assFolkloreRosetta from 'url:/src/img/binaryFolklore/rosetta.png'
import assFolkloreRosetta2 from 'url:/src/img/binaryFolklore/rosetta2.png'
import assFolkloreRosetta3 from 'url:/src/img/binaryFolklore/rosetta3.png'
import assFolkloreRosetta4 from 'url:/src/img/binaryFolklore/rosetta4.png'
// import assFolkloreBrocade from 'url:/src/img/binaryFolklore/brocade.png'
import g from './glob'
import { gsapTick, setAddOn, randOnum } from './utils'
// eslint-disable-next-line import/no-cycle
import { rollEmIn } from './owl-ram'
import { setCodeRain } from './code-rain'

const printOutRow = (pLine = 1, biBlobRow = '', pLines) => {
  const printLineSVG = g.document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  printLineSVG.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
  printLineSVG.setAttribute('viewBox', '0 0 508 12')
  const linesAlreadyPrinted = g.el.binary.querySelectorAll('.binaryRow')
  printLineSVG.setAttribute('id', `binaryRow${linesAlreadyPrinted.length}`)
  printLineSVG.classList.add('binaryRow')
  let incY = (pLine === 1) ? g.folklore.binary.var.scrollFirstLineIncPx : g.folklore.binary.var.scrollIncrementPx
  incY = (pLine === pLines) ? 0 : `+=${incY}`
  g.tL.binary.to(g.el.binaryScroll, {
    duration: g.folklore.binary.var.scrollCharsRowDurationS,
    overwrite: 'auto',
    translateY: incY,
  }, '>')
  // pos += g.folklore.binary.var.timelinePadS
  if (biBlobRow.length > 0) {
    g.el.binary.appendChild(printLineSVG)
    for (let ch = 0; ch < biBlobRow.length; ch++) {
      const pathEl = g.document.createElementNS('http://www.w3.org/2000/svg', 'path')
      pathEl.setAttribute('d', g.folklore.binary.path[Number(biBlobRow[ch])])
      pathEl.setAttribute('fill', '#000')
      pathEl.classList.add('binaryPath')
      pathEl.setAttribute('style', `transform:translateX(${ch * 10}px)`)
      printLineSVG.appendChild(pathEl)
    }
    g.tL.binary.set(`#binaryRow${linesAlreadyPrinted.length} .binaryPath`, {
      ease: 'none',
      onComplete() {
        if (pLine === 8 && g.tL.binary.timeScale() < 2.23) g.tL.binary.timeScale(2.23)
        setTimeout(() => {
          g.folklore.binary.var.owlLaserQuickSetter(g.folklore.binary.var.cssQuickReSetter)
        }, g.folklore.binary.var.drawSingleCharS)
      },
      opacity: '100%',
      stagger: {
        each: g.folklore.binary.var.drawCharsReversed ? -g.folklore.binary.var.drawSingleCharS : g.folklore.binary.var.drawSingleCharS,
        onComplete() {
          g.folklore.binary.var.owlLaserQuickSetter({
            opacity: randOnum(23, 88) / 100,
            mixBlendMode: g.mixBlendModes[randOnum(0, g.mixBlendModes.length - 1)],
          })
        },
      },
    }, '>')
      .to('#owlLaser', {
        duration: g.folklore.binary.var.scrollCharsRowDurationS + (g.folklore.binary.var.drawSingleCharS * 8),
        ease: 'none',
        scaleX: g.folklore.binary.var.drawCharsReversed ? 1 : -1,
      }, '<')
      .to('#owlGlyphGlow', {
        duration: (g.folklore.binary.var.scrollCharsRowDurationS + (g.folklore.binary.var.drawSingleCharS * 8)) / 2,
        ease: 'power1.out',
        opacity: 1,
        repeat: 1,
        scale: 1.5,
        yoyo: true,
      }, '<')
    g.folklore.binary.var.drawCharsReversed = !g.folklore.binary.var.drawCharsReversed
  }
  if (pLine >= pLines - 1) {
    g.tL.binary.set('#owlLaser', {
      onComplete() {
        g.folklore.binary.var.drawCharsReversed = false
        // eslint-disable-next-line no-use-before-define
        setAddOn('#ramIcon', 'click', scanFolkLore)
      },
      opacity: 0,
      overwrite: 'auto',
    }, '>')
  }
}

const printSpeed = () => {
  g.tL.binary.timeScale(g.tL.binary.timeScale() * 1.42)
}

const printOutBinary = biBlob => {
  g.tL.binary = new TL({ defaults: { overwrite: 'auto' }, paused: true })
  const biRegex = new RegExp(`[01]{1,${g.folklore.binary.var.charsPerPrintedLine}}`, 'g')
  const biBlobRows = biBlob.match(biRegex).slice(0, 33).reverse()
  biBlobRows.unshift('', '', '')
  biBlobRows.push('')
  // const pos = g.folklore.binary.var.scrollInitialDelayS
  biBlobRows.forEach((bbr, i) => {
    // pos += (g.folklore.binary.var.drawSingleCharS * g.folklore.binary.var.charsPerPrintedLine) + g.folklore.binary.var.scrollCharsRowDurationS + (g.folklore.binary.var.timelinePadS * 3)
    printOutRow(i + 1, bbr, biBlobRows.length)
  })
  g.tL.binary.set('.binaryPath', {
    opacity: 0,
  }, 0)
  g.tL.binary.play()
  setAddOn('#ramIcon', 'click', printSpeed, 'copy')
}

const setFolkLore = () => {
  /* eslint-disable array-bracket-newline, array-element-newline */
  g.folklore.binary.path = [
    'M1.26,2.42a.63.63,0,1,1-.63-.63A.63.63,0,0,1,1.26,2.42ZM.63,9a.63.63,0,1,0,.63.63A.63.63,0,0,0,.63,9Zm0-1.79a.63.63,0,1,0,.63.63A.63.63,0,0,0,.63,7.16Zm0-1.79A.63.63,0,1,0,1.26,6,.63.63,0,0,0,.63,5.37Zm0-1.79a.63.63,0,1,0,.63.63A.63.63,0,0,0,.63,3.58ZM7.82,1.79a.63.63,0,0,0,0,1.26.63.63,0,1,0,0-1.26ZM7.82,9a.63.63,0,1,0,0,1.26A.63.63,0,1,0,7.82,9Zm0-1.79a.63.63,0,0,0,0,1.26.63.63,0,0,0,0-1.26Zm0-1.79a.63.63,0,0,0,0,1.26.63.63,0,0,0,0-1.26Zm0-1.79a.63.63,0,0,0,0,1.26.63.63,0,0,0,0-1.26ZM2.43,7.16a.63.63,0,1,0,.62.63A.63.63,0,0,0,2.43,7.16Zm0,3.58a.63.63,0,1,0,.62.63A.63.63,0,0,0,2.43,10.74ZM2.43,0a.63.63,0,0,0,0,1.26A.63.63,0,0,0,3.05.63.63.63,0,0,0,2.43,0Zm1.8,5.37A.63.63,0,1,0,4.85,6,.63.63,0,0,0,4.23,5.37Zm0,5.37a.63.63,0,1,0,.62.63A.63.63,0,0,0,4.23,10.74ZM4.23,0a.63.63,0,0,0,0,1.26A.63.63,0,0,0,4.85.63.63.63,0,0,0,4.23,0ZM6,3.58a.63.63,0,1,0,.63.63A.63.63,0,0,0,6,3.58Zm0,7.16a.63.63,0,1,0,.63.63A.63.63,0,0,0,6,10.74ZM6,0A.63.63,0,0,0,5.4.63a.63.63,0,1,0,1.25,0A.63.63,0,0,0,6,0Z',
    'M2.4,1.8c-0.3,0-0.6,0.3-0.6,0.6S2.1,3,2.4,3s0.6-0.3,0.6-0.6S2.8,1.8,2.4,1.8z M2.4,10.7c-0.3,0-0.6,0.3-0.6,0.6S2.1,12,2.4,12s0.6-0.3,0.6-0.6S2.8,10.7,2.4,10.7z M4.9,0.6c0,0.3-0.3,0.6-0.6,0.6C3.9,1.3,3.6,1,3.6,0.6S3.9,0,4.2,0C4.6,0,4.9,0.3,4.9,0.6z M4.2,1.8c-0.3,0-0.6,0.3-0.6,0.6S3.9,3,4.2,3c0.3,0,0.6-0.3,0.6-0.6S4.6,1.8,4.2,1.8z M4.2,3.6c-0.3,0-0.6,0.3-0.6,0.6s0.3,0.6,0.6,0.6c0.3,0,0.6-0.3,0.6-0.6S4.6,3.6,4.2,3.6z M4.2,5.4C3.9,5.4,3.6,5.7,3.6,6s0.3,0.6,0.6,0.6c0.3,0,0.6-0.3,0.6-0.6S4.6,5.4,4.2,5.4z M4.2,7.2c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6c0.3,0,0.6-0.3,0.6-0.6C4.8,7.4,4.6,7.2,4.2,7.2z M4.2,9C3.9,9,3.6,9.2,3.6,9.6s0.3,0.6,0.6,0.6c0.3,0,0.6-0.3,0.6-0.6S4.6,9,4.2,9z M4.2,10.7c-0.3,0-0.6,0.3-0.6,0.6S3.9,12,4.2,12c0.3,0,0.6-0.3,0.6-0.6S4.6,10.7,4.2,10.7z M6,10.7c-0.3,0-0.6,0.3-0.6,0.6C5.4,11.7,5.6,12,6,12s0.6-0.3,0.6-0.6C6.6,11,6.3,10.7,6,10.7z',
  ]
  /* eslint-enable array-bracket-newline, array-element-newline */

  g.folklore.binary.var = {
    charsPerPrintedLine: 51,
    cssQuickReSetter: {
      opacity: 0,
      mixBlendMode: g.mixBlendModes[0],
    },
    drawCharsReversed: false,
    drawSingleCharS: 0.0125,
    folkLoreMaskIncrementX: 10,
    folkLoreMaskOffsetX: 450,
    owlLaserQuickSetter: gsap.quickSetter('#owlLaser', 'css'),
    owlLaser2QuickSetter: gsap.quickSetter('#owlLaser2', 'css'),
    ramLaserMaxTranslateX: 443,
    ramLaserQuickSetter: gsap.quickSetter('#ramLaser', 'css'),
    ramLaser2QuickSetter: gsap.quickSetter('#ramLaser2', 'css'),
    ramLaser3QuickSetter: gsap.quickSetter('#ramLaser3', 'css'),
    scrollCharsRowDurationS: 0.42,
    scrollFirstLineIncPx: 24.1667,
    scrollIncrementPx: 16.1667,
    scrollInitialDelayS: 1.25,
    stoneDemolition: 0,
    stoneFilters: [
      'drop-shadow(0 4.2px 4.2px rgba(0,0,0,0.76))',
      'blur(5px)',
      'brightness(250%)',
      'contrast(180%)',
      'grayscale(100%)',
      'hue-rotate(180deg)',
      'invert(100%)',
      'opacity(42%)',
      'saturate(10)',
      'sepia(100%)',
    ],
    stoneLaserTimer: 1242,
    timelinePadS: 0.01,
  }

  g.folklore.ass = [
    assFolkloreTypewriter,
    assFolkloreBlueprint,
    assFolkloreParchment,
    assFolkloreRosetta,
    // assFolkloreBrocade,
  ]

  g.folklore.lore = [
    'typewriter',
    'blueprint',
    'parchment',
    'rosetta',
    // 'brocade',
  ]

  g.el.codeRain = g.document.createElement('div')
  g.el.codeRain.id = 'codeRain'
  g.el.codeRain.classList.add('cr-rain')
  g.el.binaryScroll.appendChild(g.el.codeRain)

  g.folklore.lore.forEach((fL, ass) => {
    const newFolkLore = g.document.createElement('div')
    newFolkLore.id = fL
    newFolkLore.classList.add('folkLore')
    const flImg = g.document.createElement('img')
    flImg.src = g.folklore.ass[ass]
    const subMask = g.document.createElement('div')
    subMask.appendChild(flImg)
    newFolkLore.appendChild(subMask)
    g.el.binaryScroll.appendChild(newFolkLore)
  })

  gsap.set('#ramLaser', g.folklore.binary.var.cssQuickReSetter)
}

const primeRamLaser = () => {
  g.folklore.binary.var.ramLaserQuickSetter({
    opacity: randOnum(23, 88) / 100,
    mixBlendMode: g.mixBlendModes[randOnum(0, g.mixBlendModes.length - 1)],
  })
}

const scanFolkLoreTick = (f, mv = 0, rv = false) => {
  const mvMe = rv ? g.folklore.binary.var.folkLoreMaskOffsetX - mv : mv
  const fLX = rv ? -mv : -g.folklore.binary.var.folkLoreMaskOffsetX + mvMe
  const fLIX = -fLX
  const fLMustMove = rv ? fLX >= -g.folklore.binary.var.folkLoreMaskOffsetX : fLX <= 0
  const laserMustMove = rv ? mvMe >= 0 : mvMe <= g.folklore.binary.var.ramLaserMaxTranslateX
  if (fLMustMove) {
    g.folklore.binary.var.hideFolkLoreWrapperQuickSetter({
      translateX: rv ? fLX : fLX + g.folklore.binary.var.folkLoreMaskOffsetX,
    })
    g.folklore.binary.var.hideFolkLoreImageQuickSetter({
      translateX: rv ? fLIX : fLIX - g.folklore.binary.var.folkLoreMaskOffsetX,
    })
    g.folklore.binary.var.revealFolkLoreWrapperQuickSetter({
      translateX: rv ? mvMe : fLX,
    })
    g.folklore.binary.var.revealFolkLoreImageQuickSetter({
      translateX: rv ? -mvMe : fLIX,
    })
  }
  if (laserMustMove) {
    g.folklore.binary.var.ramLaserQuickSetter({
      opacity: randOnum(23, 88) / 100,
      mixBlendMode: g.mixBlendModes[randOnum(0, g.mixBlendModes.length - 1)],
      translateX: mvMe,
    })
  }
  if (fLMustMove || laserMustMove) {
    setTimeout(() => scanFolkLoreTick(f, mv + g.folklore.binary.var.folkLoreMaskIncrementX, rv), g.folklore.binary.var.drawSingleCharS * 0.42, f, mv, rv, g.folklore.binary.var)
  } else {
    g.folklore.binary.var.drawCharsReversed = !rv
    gsap.ticker.add(primeRamLaser)
    gsap.to('#ramLaser', {
      duration: 0.36,
      height: 0,
      onComplete() {
        gsap.ticker.remove(primeRamLaser)
        g.folklore.binary.var.ramLaserQuickSetter(g.folklore.binary.var.cssQuickReSetter)
        g.folklore.binary.progress = 'folklore'
        gsap.set('#ramIcon', {
          cursor: 'pointer',
        })
      },
      overwrite: 'auto',
    })
  }
}

const printOutCows = () => {
  const cowWowTL = new TL({ defaults: { overwrite: 'auto' } })
  if (g.scene.skip.ff) cowWowTL.timeScale(1 / g.scene.skip.ff)
  rollEmIn()
  cowWowTL.to('#owlGlyphGlow', {
    duration: g.folklore.binary.var.drawSingleCharS * 45,
    ease: 'power1.out',
    opacity: 1,
    repeat: 5,
    scale: 1.5,
    yoyo: true,
  })
    .to('#binaryFolklore', {
      duration: 3.42,
      ease: 'power1.in',
      translateY: 94,
      scale: 0.86,
    }, '<')
    .to('#cowStill01', {
      duration: 1,
      ease: 'power2.in',
      scale: 1,
    }, '<')
    .to('#cowStill02', {
      duration: 1,
      ease: 'power2.in',
      scaleY: 1,
      scaleX: -1,
    }, '<')
    .to('.cowStill', {
      duration: 2,
      ease: 'power2.inOut',
      translateX: 0,
      translateY: 0,
    }, '>')
    .to('#owlGlyphGlow', {
      duration: 1,
      ease: 'power1.in',
      opacity: 0,
    }, g.folklore.binary.var.drawSingleCharS * 270)
}

const stoneColdLaser = (laserQss, stoneShiftPx) => {
  laserQss({
    opacity: randOnum(23, 88) / 100,
    mixBlendMode: g.mixBlendModes[randOnum(0, g.mixBlendModes.length - 1)],
  })
  g.folklore.binary.var.stoneQuickSetter({
    translateX: randOnum(0, stoneShiftPx * 2) - stoneShiftPx,
    translateY: randOnum(0, stoneShiftPx * 2) - stoneShiftPx,
  })
}

const stoneColdLaserL = () => {
  stoneColdLaser(g.folklore.binary.var.ramLaser2QuickSetter, 5)
}

const stoneColdLaserR = () => {
  stoneColdLaser(g.folklore.binary.var.ramLaser3QuickSetter, 8)
}

const stoneColdLaserC = () => {
  g.folklore.binary.var.owlLaser2QuickSetter({
    opacity: randOnum(23, 88) / 100,
    mixBlendMode: g.mixBlendModes[randOnum(0, g.mixBlendModes.length - 1)],
  })
  g.folklore.binary.var.stoneQuickSetter({
    translateX: randOnum(0, 24) - 12,
    translateY: randOnum(0, 24) - 12,
  })
  const flashCrack = randOnum(0, 3) ? 1 : randOnum(64, 96) / 100
  g.folklore.binary.var.oldStoneImgQuickSetter({
    filter: g.folklore.binary.var.stoneFilters[randOnum(0, g.folklore.binary.var.stoneFilters.length - 1)],
    opacity: flashCrack,
  })
  g.folklore.binary.var.newStoneImgQuickSetter(flashCrack === 1 ? 0 : 1)
}

const iceIceBaby = () => {
  g.folklore.binary.var.ramLaser2QuickSetter(g.folklore.binary.var.cssQuickReSetter)
  g.folklore.binary.var.ramLaser3QuickSetter(g.folklore.binary.var.cssQuickReSetter)
  g.folklore.binary.var.owlLaser2QuickSetter(g.folklore.binary.var.cssQuickReSetter)
  g.folklore.binary.var.stoneQuickSetter({
    translateX: 0,
    translateY: 0,
  })
  g.folklore.binary.var.oldStoneImgQuickSetter({
    filter: g.folklore.binary.var.stoneFilters[0],
    opacity: 1,
  })
  g.folklore.binary.var.newStoneImgQuickSetter(0)
}

const embiggenCodeRainMaskTick = () => {
  g.folklore.binary.codeRainMaskQuickSetter({
    WebkitMaskSize: `${g.folklore.binary.codeRainMaskSizeObj.w}px ${g.folklore.binary.codeRainMaskSizeObj.h}px`,
    maskSize: `${g.folklore.binary.codeRainMaskSizeObj.w}px ${g.folklore.binary.codeRainMaskSizeObj.h}px`,
  })
}

const clearAwayTheStone = () => {
  gsap.set('#ramIcon', {
    cursor: 'wait',
  })
  const currentStone = g.document.querySelector('#rosetta img')
  const nextStone = currentStone.cloneNode(true)
  nextStone.style.opacity = 0
  const stoneWrapper = currentStone.parentNode
  stoneWrapper.insertBefore(nextStone, currentStone)
  g.folklore.binary.var.stoneQuickSetter = gsap.quickSetter('#rosetta', 'css')
  g.folklore.binary.var.oldStoneImgQuickSetter = gsap.quickSetter(currentStone, 'css')
  g.folklore.binary.var.newStoneImgQuickSetter = gsap.quickSetter(nextStone, 'opacity')
  gsap.set('#ramLaser2, #ramLaser3, #owlLaser2', {
    overwrite: 'auto',
    scale: 0,
  })
  // eslint-disable-next-line default-case
  switch (g.folklore.binary.var.stoneDemolition) {
    case 0:
      gsap.set(nextStone, {
        attr: {
          src: assFolkloreRosetta2,
        },
        zIndex: -1,
      })
      break
    case 1:
      gsap.set(nextStone, {
        attr: {
          src: assFolkloreRosetta3,
        },
        zIndex: -1,
      })
      g.folklore.binary.var.codeRain = setCodeRain({
        element: g.el.codeRain,
        characters: '%&*+.0123456789Z:<=>£¥§±·¿ØĦƧ௹Ẍ…₡₥₩€₮₲₶℞⅋∴∺∻≇≡⊏⊐⊑⊒⊢⊰⊽⋀⋁⋂⋃⋈⋯⋰♫⟣⧦⨀あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをんアイウエオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヲン丝儿吉尺开比艾马﷼',
        font: 'Arial, sans-serif',
        fontSize: 12,
        columnWidth: 12,
        rowHeight: 12,
        textColor: '#52FF52',
        overlayColor: 'rgba(0, 0, 0, 0.04)',
        highlightFirstChar: 'rgba(255, 255, 255, 0.8)',
        interval: 36,
        direction: 'top-bottom',
        showStart: true,
        autoStart: true, // or startRaining() ?
      })
      break
    case 2:
      gsap.set(nextStone, {
        attr: {
          src: assFolkloreRosetta4,
        },
        zIndex: -1,
      })
      break
  }
  gsap.to('#ramLaser2', {
    duration: g.folklore.binary.var.stoneLaserTimer / 5000,
    overwrite: 'auto',
    scale: 1,
  })
  gsap.ticker.add(stoneColdLaserL)
  gsap.to('#owlGlyphGlow', {
    duration: g.folklore.binary.var.stoneLaserTimer / 275,
    ease: 'power2.in',
    // eslint-disable-next-line func-names, object-shorthand
    onComplete: function () {
      gsap.to('#owlGlyphGlow', {
        duration: g.folklore.binary.var.stoneLaserTimer / 1500,
        ease: 'power3.in',
        opacity: 0.76,
        overwrite: 'auto',
        scale: 1,
      })
    },
    opacity: 1,
    scaleX: 5,
    scaleY: 16,
  })
  setTimeout(() => {
    iceIceBaby()
    gsap.to('#ramLaser3', {
      duration: g.folklore.binary.var.stoneLaserTimer / 5000,
      overwrite: 'auto',
      scale: 1,
    })
    gsap.ticker.add(stoneColdLaserR)
    setTimeout(() => {
      iceIceBaby()
      gsap.to('#owlLaser2', {
        duration: g.folklore.binary.var.stoneLaserTimer / 5000,
        overwrite: 'auto',
        scale: 1,
      })
      gsap.ticker.add(stoneColdLaserC)
      setTimeout(() => {
        gsap.ticker.remove(stoneColdLaserC)
        gsap.ticker.remove(stoneColdLaserL)
        gsap.ticker.remove(stoneColdLaserR)
        iceIceBaby()
        stoneWrapper.removeChild(currentStone)
        if (g.folklore.binary.var.stoneDemolition === 2) {
          gsap.set(g.el.codeRain, {
            maskSize: '436.5px 646px',
            maskPosition: 'center calc(50% - 36px)',
            WebkitMaskSize: '436.5px 646px',
            WebkitMaskPosition: 'center calc(50% - 36px)',
          })
          // node has to be cloned to avoid stone flickering out if/when mask-image is dynamically added
          const extraStone = nextStone.cloneNode(true)
          stoneWrapper.insertBefore(extraStone, nextStone)
          gsap.set(extraStone, {
            opacity: 1,
          })
          gsap.set(nextStone, {
            delay: g.folklore.binary.var.stoneLaserTimer / 4000,
            attr: {
              class: 'fragment',
            },
            // eslint-disable-next-line func-names, object-shorthand
            onComplete: function () {
              setTimeout(() => {
                gsap.to(extraStone, {
                  duration: g.folklore.binary.var.stoneLaserTimer / 5000,
                  // eslint-disable-next-line func-names, object-shorthand
                  onComplete: function () {
                    stoneWrapper.removeChild(extraStone)
                  },
                  opacity: 0,
                  overwrite: true,
                })
              }, g.folklore.binary.var.stoneLaserTimer)
            },
          })
          setTimeout(() => {
            const codeRainMaskSizeObj = { w: 436.5, h: 646 }
            g.folklore.binary.codeRainMaskSizeObj = { ...codeRainMaskSizeObj }
            g.folklore.binary.codeRainMaskQuickSetter = gsap.quickSetter(g.el.codeRain, 'css')
            g.scene.forCleanUp[11].codeRainMaskTicker = gsapTick(embiggenCodeRainMaskTick)
            gsap.to(g.folklore.binary.codeRainMaskSizeObj, {
              duration: g.scene.skip.ff || 2,
              ease: 'power2.in',
              w: codeRainMaskSizeObj.w * 2,
              h: codeRainMaskSizeObj.h * 2,
              // eslint-disable-next-line func-names, object-shorthand
              onComplete: function () {
                gsap.set('#ramIcon', {
                  cursor: 'pointer',
                })
              },
            })
          }, g.folklore.binary.var.stoneLaserTimer)
        } else {
          gsap.set('#ramIcon', {
            cursor: 'pointer',
          })
        }
        g.folklore.binary.var.stoneDemolition++
        g.folklore.binary.var.newStoneImgQuickSetter(1)
      }, g.folklore.binary.var.stoneLaserTimer * 2)
    }, g.folklore.binary.var.stoneLaserTimer)
  }, g.folklore.binary.var.stoneLaserTimer)
}

const scanFolkLore = () => {
  if (g.folklore.binary.progress !== 'scanning') {
    if (g.folklore.lore.length) {
      gsap.set('#ramIcon', {
        cursor: 'wait',
      })
      g.folklore.binary.progress = 'scanning'
      let thisFolkLore = g.folklore.lore.shift()
      thisFolkLore = g.document.getElementById(thisFolkLore)
      g.folklore.binary.var.hideFolkLoreWrapperQuickSetter = g.folklore.binary.var.revealFolkLoreWrapperQuickSetter || gsap.quickSetter('#graphPaper', 'css')
      g.folklore.binary.var.hideFolkLoreImageQuickSetter = g.folklore.binary.var.revealFolkLoreImageQuickSetter || gsap.quickSetter('#graphPaper > div', 'css')
      g.folklore.binary.var.revealFolkLoreWrapperQuickSetter = gsap.quickSetter(thisFolkLore, 'css')
      g.folklore.binary.var.revealFolkLoreImageQuickSetter = gsap.quickSetter(thisFolkLore.children[0], 'css')
      gsap.ticker.add(primeRamLaser)
      gsap.to('#owlGlyphGlow', {
        duration: g.folklore.binary.var.drawSingleCharS * 108,
        ease: 'power1.out',
        opacity: 1,
        repeat: 1,
        scale: 1.5,
        yoyo: true,
      })
      gsap.to('#ramLaser', {
        duration: 0.36,
        height: 600,
        onComplete() {
          gsap.ticker.remove(primeRamLaser)
          scanFolkLoreTick(thisFolkLore, 0, g.folklore.binary.var.drawCharsReversed)
        },
        overwrite: 'auto',
      })
    } else if (g.folklore.binary.var.stoneDemolition < 3) clearAwayTheStone()
    else printOutCows()
  }
}

export { printOutBinary, setFolkLore }
