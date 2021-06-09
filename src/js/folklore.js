import { gsap, TimelineMax as TL } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

import assFolkloreTypewriter from 'url:/src/img/binaryFolklore/typewriter.png'
import assFolkloreBlueprint from 'url:/src/img/binaryFolklore/blueprint.gif'
import assFolkloreParchment from 'url:/src/img/binaryFolklore/parchment.png'
import assFolkloreRosetta from 'url:/src/img/binaryFolklore/rosetta.png'
import assFolkloreRosetta2 from 'url:/src/img/binaryFolklore/rosetta2.png'
import assFolkloreRosetta3 from 'url:/src/img/binaryFolklore/rosetta3.png'
import assFolkloreRosetta4 from 'url:/src/img/binaryFolklore/rosetta4.png'
import assFolkloreFinal01 from 'url:/src/img/binaryFolklore/folklore-final-form-01.png'
import assFolkloreFinal02 from 'url:/src/img/binaryFolklore/folklore-final-form-02.png'
import assFolkloreFinal03 from 'url:/src/img/binaryFolklore/folklore-final-form-03.png'
import assFolkloreFinal04 from 'url:/src/img/binaryFolklore/folklore-final-form-04.png'
import assFolkloreFinal05 from 'url:/src/img/binaryFolklore/folklore-final-form-05.png'
import assFolkloreFinal06 from 'url:/src/img/binaryFolklore/folklore-final-form-06.png'
import assFolkloreFinal07 from 'url:/src/img/binaryFolklore/folklore-final-form-07.png'
import { random } from 'gsap/gsap-core'
import g from './glob'
import {
  devLog, gsapTick, gsapUnTick, ifFunctionThenCall, isFunction, navToNewTab, setAddOn, randOnum, setClearActors, shuffleArray,
} from './utils'
import { setCodeRain, unSetCodeRain } from './code-rain'
import { stoneSmokeTick1, stoneSmokeTick2, stoneSmokeTick3 } from './smoke'
import { rollEmInInc, rollEmOut, setRamIcon } from './owl-ram'
import { setScene, subSceneProgress } from './scene'
import { animateBaubleLayer03or04 } from './baubles/layer-04'

gsap.registerPlugin( MorphSVGPlugin )

const setFolkLore = () => {
  setRamIcon()

  g.folklore = {
    binary: {
      charsPerPrintedLine: 51,
      cssQuickReSetters: {
        o: {
          opacity: 0,
          mixBlendMode: g.mixBlendModes[0],
        },
        s: {
          scale: 0,
          mixBlendMode: g.mixBlendModes[0],
        },
      },
      drawCharsReversed: false,
      drawSingleCharS: 0.0125,
      folkLoreMaskIncrementX: 10,
      folkLoreMaskOffsetX: 450,
      gnawSkew: 1.5,
      laserActivation: 0,
      owlLaserQuickSetter: gsap.quickSetter( '#owlLaser', 'css' ),
      owlLaser2QuickSetter: gsap.quickSetter( '#owlLaser2', 'css' ),
      ramLaserMaxTranslateX: 443,
      ramLaserQuickSetter: gsap.quickSetter( '#ramLaser', 'css' ),
      ramLaser2QuickSetter: gsap.quickSetter( '#ramLaser2', 'css' ),
      ramLaser3QuickSetter: gsap.quickSetter( '#ramLaser3', 'css' ),
      scrollCharsRowDurationS: 0.42,
      scrollFirstLineIncPx: 24.1667,
      scrollIncrementPx: 16.1667,
      scrollInitialDelayS: 1.25,
      scrollQuickSetter: gsap.quickSetter( '#binaryScroll', 'css' ),
      stoneColdLaserMagnitude: [ 2, 6, 12 ],
      stoneColdLaserUnTick: [],
      stoneDemolition: 0,
      stoneFilters: [
        'drop-shadow(0 4.2px 4.2px rgba(0,0,0,0.76))',
        'blur(5px)',
        'brightness(250%)',
        'contrast(180%)',
        'grayscale(100%)',
        'hue-rotate(180deg)',
        'invert(50%)',
        'opacity(64%)',
        'saturate(10)',
        'sepia(100%)',
      ],
      stoneLaserTimer: 1242,
      timelinePadS: 0.01,
      /* eslint-disable array-bracket-newline, array-element-newline */
      path: [
        'M1.26,2.42a.63.63,0,1,1-.63-.63A.63.63,0,0,1,1.26,2.42ZM.63,9a.63.63,0,1,0,.63.63A.63.63,0,0,0,.63,9Zm0-1.79a.63.63,0,1,0,.63.63A.63.63,0,0,0,.63,7.16Zm0-1.79A.63.63,0,1,0,1.26,6,.63.63,0,0,0,.63,5.37Zm0-1.79a.63.63,0,1,0,.63.63A.63.63,0,0,0,.63,3.58ZM7.82,1.79a.63.63,0,0,0,0,1.26.63.63,0,1,0,0-1.26ZM7.82,9a.63.63,0,1,0,0,1.26A.63.63,0,1,0,7.82,9Zm0-1.79a.63.63,0,0,0,0,1.26.63.63,0,0,0,0-1.26Zm0-1.79a.63.63,0,0,0,0,1.26.63.63,0,0,0,0-1.26Zm0-1.79a.63.63,0,0,0,0,1.26.63.63,0,0,0,0-1.26ZM2.43,7.16a.63.63,0,1,0,.62.63A.63.63,0,0,0,2.43,7.16Zm0,3.58a.63.63,0,1,0,.62.63A.63.63,0,0,0,2.43,10.74ZM2.43,0a.63.63,0,0,0,0,1.26A.63.63,0,0,0,3.05.63.63.63,0,0,0,2.43,0Zm1.8,5.37A.63.63,0,1,0,4.85,6,.63.63,0,0,0,4.23,5.37Zm0,5.37a.63.63,0,1,0,.62.63A.63.63,0,0,0,4.23,10.74ZM4.23,0a.63.63,0,0,0,0,1.26A.63.63,0,0,0,4.85.63.63.63,0,0,0,4.23,0ZM6,3.58a.63.63,0,1,0,.63.63A.63.63,0,0,0,6,3.58Zm0,7.16a.63.63,0,1,0,.63.63A.63.63,0,0,0,6,10.74ZM6,0A.63.63,0,0,0,5.4.63a.63.63,0,1,0,1.25,0A.63.63,0,0,0,6,0Z',
        'M2.4,1.8c-0.3,0-0.6,0.3-0.6,0.6S2.1,3,2.4,3s0.6-0.3,0.6-0.6S2.8,1.8,2.4,1.8z M2.4,10.7c-0.3,0-0.6,0.3-0.6,0.6S2.1,12,2.4,12s0.6-0.3,0.6-0.6S2.8,10.7,2.4,10.7z M4.9,0.6c0,0.3-0.3,0.6-0.6,0.6C3.9,1.3,3.6,1,3.6,0.6S3.9,0,4.2,0C4.6,0,4.9,0.3,4.9,0.6z M4.2,1.8c-0.3,0-0.6,0.3-0.6,0.6S3.9,3,4.2,3c0.3,0,0.6-0.3,0.6-0.6S4.6,1.8,4.2,1.8z M4.2,3.6c-0.3,0-0.6,0.3-0.6,0.6s0.3,0.6,0.6,0.6c0.3,0,0.6-0.3,0.6-0.6S4.6,3.6,4.2,3.6z M4.2,5.4C3.9,5.4,3.6,5.7,3.6,6s0.3,0.6,0.6,0.6c0.3,0,0.6-0.3,0.6-0.6S4.6,5.4,4.2,5.4z M4.2,7.2c-0.3,0-0.6,0.3-0.6,0.6c0,0.3,0.3,0.6,0.6,0.6c0.3,0,0.6-0.3,0.6-0.6C4.8,7.4,4.6,7.2,4.2,7.2z M4.2,9C3.9,9,3.6,9.2,3.6,9.6s0.3,0.6,0.6,0.6c0.3,0,0.6-0.3,0.6-0.6S4.6,9,4.2,9z M4.2,10.7c-0.3,0-0.6,0.3-0.6,0.6S3.9,12,4.2,12c0.3,0,0.6-0.3,0.6-0.6S4.6,10.7,4.2,10.7z M6,10.7c-0.3,0-0.6,0.3-0.6,0.6C5.4,11.7,5.6,12,6,12s0.6-0.3,0.6-0.6C6.6,11,6.3,10.7,6,10.7z',
      ],
    },
    /* eslint-enable array-bracket-newline, array-element-newline */
    lore: [
      'typewriter',
      'blueprint',
      'parchment',
      'rosetta',
    ],
    ass: {
      binary: [
        assFolkloreTypewriter,
        assFolkloreBlueprint,
        assFolkloreParchment,
        assFolkloreRosetta,
      ],
      finalForm: [
        assFolkloreFinal01,
        assFolkloreFinal02,
        assFolkloreFinal03,
        assFolkloreFinal04,
        assFolkloreFinal05,
        assFolkloreFinal06,
        assFolkloreFinal07,
      ],
    },
  }

  g.el.codeRain = g.document.createElement( 'div' )
  g.el.codeRain.id = 'codeRain'
  g.el.codeRain.classList.add( 'cr-rain' )
  g.el.binaryScroll.appendChild( g.el.codeRain )

  g.folklore.lore.forEach( ( fL, ass ) => {
    const newFolkLore = g.document.createElement( 'div' )
    newFolkLore.id = fL
    newFolkLore.classList.add( 'folkLore' )
    const flImg = g.document.createElement( 'img' )
    flImg.src = g.folklore.ass.binary[ass]
    const subMask = g.document.createElement( 'div' )
    subMask.appendChild( flImg )
    newFolkLore.appendChild( subMask )
    g.el.binaryScroll.appendChild( newFolkLore )
  } )

  g.el.fffBody = g.document.querySelector( '#engravenOnAllFours foreignObject' ) // foreignObject body disappears!
  g.folklore.fff = [ g.el.fffBody.querySelector( 'img' ) ]
  g.folklore.ass.finalForm.forEach( fff => {
    const fffImg = g.document.createElement( 'img' )
    fffImg.src = fff
    g.folklore.fff.push( fffImg )
    g.el.fffBody.appendChild( fffImg )
  } )

  g.folklore.whichCow = false

  gsap.set( '#ramLaser', g.folklore.binary.cssQuickReSetters.o )

  g.qss.ramIconHorns.both[0]( 1 )

  g.ramIcon.forCleanUp.ready = [ setAddOn( '#theOwlIsNotWhatItSeems', 'mouseenter', readyFolkLore ), setAddOn( '#theOwlIsNotWhatItSeems', 'mouseleave', unReadyFolkLore, 'wait' ) ]
}

const readyFolkLore = () => {
  if ( g.subScene.scene11.folklore.progress === 'set' && !g.el.theOwlIsNotWhatItSeems.classList.contains( 'wayLaid' ) ) {
    gsap.set( '#theOwlIsNotWhatItSeems', {
      cursor: 'wait',
    } )
    setTimeout( () => {
      g.ramIcon.forCleanUp.ready[2] = setAddOn( '#theOwlIsNotWhatItSeems', 'click', rollEmOut, 'pointer', 'pointer' )
    }, 500 )
  }
}

const unReadyFolkLore = () => {
  ifFunctionThenCall( g.ramIcon.forCleanUp.ready[2] )
}

// readyFolklore() -> rollEmOut() -> ramIconHornsRollOutTick() -> printOutBinary()

const printOutBinary = biBlob => {
  if ( g.subScene.scene11.folklore.progress === 'prepLyrics' ) {
    subSceneProgress( 'scene11', 'folklore', 'printLyrics' )
    g.tL.binary = new TL( { defaults: { overwrite: 'auto' }, paused: true } )
    if ( g.subScene.scene11.folklore.ff ) g.tL.binary.timeScale( 1 / g.subScene.scene11.folklore.ff )
    const biRegex = new RegExp( `[01]{1,${g.folklore.binary.charsPerPrintedLine}}`, 'g' )
    const biBlobRows = biBlob.match( biRegex ).slice( 0, 33 ).reverse()
    biBlobRows.unshift( '', '', '' )
    biBlobRows.push( '' )
    biBlobRows.forEach( ( bbr, i ) => {
      printOutRow( i + 1, bbr, biBlobRows.length )
    } )
    g.tL.binary.set( '.binaryPath', {
      opacity: 0,
    }, 0 )
    g.tL.binary.play()
    g.ramIcon.unClick = setAddOn( '#ramIcon', 'click', printSpeed, 'copy' )
  }
}

const printOutRow = ( pLine = 1, biBlobRow = '', pLines ) => {
  subSceneProgress( 'scene11', 'folklore', 'lyricsPrinting' )
  const printLineSVG = g.document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' )
  printLineSVG.setAttributeNS( 'http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink' )
  printLineSVG.setAttribute( 'viewBox', '0 0 508 12' )
  const linesAlreadyPrinted = g.el.binary.querySelectorAll( '.binaryRow' )
  printLineSVG.setAttribute( 'id', `binaryRow${linesAlreadyPrinted.length}` )
  printLineSVG.classList.add( 'binaryRow' )
  let incY = ( pLine === 1 ) ? g.folklore.binary.scrollFirstLineIncPx : g.folklore.binary.scrollIncrementPx
  incY = ( pLine === pLines ) ? 0 : `+=${incY}`
  g.tL.binary.to( g.el.binaryScroll, {
    duration: g.folklore.binary.scrollCharsRowDurationS,
    overwrite: 'auto',
    translateY: incY,
  }, '>' )
  if ( biBlobRow.length > 0 ) {
    g.el.binary.appendChild( printLineSVG )
    for ( let ch = 0; ch < biBlobRow.length; ch++ ) {
      const pathEl = g.document.createElementNS( 'http://www.w3.org/2000/svg', 'path' )
      pathEl.setAttribute( 'd', g.folklore.binary.path[Number( biBlobRow[ch] )] )
      pathEl.setAttribute( 'fill', '#000' )
      pathEl.classList.add( 'binaryPath' )
      pathEl.setAttribute( 'style', `transform:translateX(${ch * 10}px)` )
      printLineSVG.appendChild( pathEl )
    }
    g.tL.binary.set( `#binaryRow${linesAlreadyPrinted.length} .binaryPath`, {
      ease: 'none',
      onComplete() {
        if ( pLine === 8 && g.tL.binary.timeScale() < 2.23 ) g.tL.binary.timeScale( 2.23 )
        setTimeout( () => {
          g.folklore.binary.owlLaserQuickSetter( g.folklore.binary.cssQuickReSetters.o )
        }, g.folklore.binary.drawSingleCharS )
      },
      opacity: '100%',
      stagger: {
        each: g.folklore.binary.drawCharsReversed ? -g.folklore.binary.drawSingleCharS : g.folklore.binary.drawSingleCharS,
        onComplete() {
          g.folklore.binary.owlLaserQuickSetter( {
            opacity: randOnum( 23, 88 ) / 100,
            mixBlendMode: g.mixBlendModes[randOnum( 0, g.mixBlendModes.length - 1 )],
          } )
        },
      },
    }, '>' )
      .to( '#owlLaser', {
        duration: g.folklore.binary.scrollCharsRowDurationS + ( g.folklore.binary.drawSingleCharS * 8 ),
        ease: 'none',
        scaleX: g.folklore.binary.drawCharsReversed ? 1 : -1,
      }, '<' )
      .to( '#owlGlyphGlow', {
        duration: ( g.folklore.binary.scrollCharsRowDurationS + ( g.folklore.binary.drawSingleCharS * 8 ) ) / 2,
        ease: 'power1.out',
        opacity: 1,
        repeat: 1,
        scale: 1.5,
        yoyo: true,
      }, '<' )
    g.folklore.binary.drawCharsReversed = !g.folklore.binary.drawCharsReversed
  }
  if ( pLine >= pLines - 1 && g.subScene.scene11.folklore.progress !== 'lyricsPrinted' ) {
    g.tL.binary.set( '#owlLaser', {
      onComplete() {
        subSceneProgress( 'scene11', 'folklore', 'lyricsPrinted' )
        g.folklore.binary.drawCharsReversed = false
        if ( ifFunctionThenCall( g.ramIcon.unClick ) ) g.ramIcon.unClick = setAddOn( '#ramIcon', 'click', scanFolkLore )
        if ( g.subScene.scene11.folklore.ff ) g.el.ramIcon.click()
      },
      opacity: 0,
      overwrite: 'auto',
    }, '>' )
  }
}

const printSpeed = () => {
  g.tL.binary.timeScale( g.tL.binary.timeScale() * 1.42 )
}

const scanFolkLore = () => {
  if ( ![ 'ramPrimingIn', 'ramScanning', 'ramPrimingOut' ].includes( g.subScene.scene11.folklore.progress ) ) {
    if ( g.folklore.lore.length ) {
      gsap.set( '#ramIcon', {
        cursor: 'wait',
      } )
      let thisFolkLore = g.folklore.lore.shift()
      thisFolkLore = g.document.getElementById( thisFolkLore )
      g.folklore.binary.hideFolkLoreWrapperQuickSetter = g.folklore.binary.revealFolkLoreWrapperQuickSetter || gsap.quickSetter( '#graphPaper', 'css' )
      g.folklore.binary.hideFolkLoreImageQuickSetter = g.folklore.binary.revealFolkLoreImageQuickSetter || gsap.quickSetter( '#graphPaper > div', 'css' )
      g.folklore.binary.revealFolkLoreWrapperQuickSetter = gsap.quickSetter( thisFolkLore, 'css' )
      g.folklore.binary.revealFolkLoreImageQuickSetter = gsap.quickSetter( thisFolkLore.children[0], 'css' )
      subSceneProgress( 'scene11', 'folklore', 'ramPrimingIn' )
      const primeRamLaserUnTick = gsapTick( primeRamLaserTick )
      gsap.to( '#owlGlyphGlow', {
        duration: g.subScene.scene11.folklore.ff || g.folklore.binary.drawSingleCharS * 108,
        ease: 'power1.out',
        opacity: 1,
        repeat: 1,
        scale: 1.5,
        yoyo: true,
      } )
      gsap.to( '#ramLaser', {
        duration: g.subScene.scene11.folklore.ff || 0.36,
        height: 600,
        onComplete() {
          ifFunctionThenCall( primeRamLaserUnTick )
          subSceneProgress( 'scene11', 'folklore', 'ramScanning' )
          scanFolkLoreTick( thisFolkLore, 0, g.folklore.binary.drawCharsReversed )
        },
        overwrite: 'auto',
      } )
    } else if ( g.folklore.binary.stoneDemolition < 3 ) clearAwayTheStone()
    else printOutCows()
  }
}

const primeRamLaserTick = () => {
  g.folklore.binary.ramLaserQuickSetter( {
    opacity: randOnum( 23, 88 ) / 100,
    mixBlendMode: g.mixBlendModes[randOnum( 0, g.mixBlendModes.length - 1 )],
  } )
}

const scanFolkLoreTick = ( f, mv = 0, rv = false ) => {
  const mvMe = rv ? g.folklore.binary.folkLoreMaskOffsetX - mv : mv
  const fLX = rv ? -mv : -g.folklore.binary.folkLoreMaskOffsetX + mvMe
  const fLIX = -fLX
  const fLMustMove = rv ? fLX >= -g.folklore.binary.folkLoreMaskOffsetX : fLX <= 0
  const laserMustMove = rv ? mvMe >= 0 : mvMe <= g.folklore.binary.ramLaserMaxTranslateX
  if ( fLMustMove ) {
    g.folklore.binary.hideFolkLoreWrapperQuickSetter( {
      translateX: rv ? fLX : fLX + g.folklore.binary.folkLoreMaskOffsetX,
    } )
    g.folklore.binary.hideFolkLoreImageQuickSetter( {
      translateX: rv ? fLIX : fLIX - g.folklore.binary.folkLoreMaskOffsetX,
    } )
    g.folklore.binary.revealFolkLoreWrapperQuickSetter( {
      translateX: rv ? mvMe : fLX,
    } )
    g.folklore.binary.revealFolkLoreImageQuickSetter( {
      translateX: rv ? -mvMe : fLIX,
    } )
  }
  if ( laserMustMove ) {
    g.folklore.binary.ramLaserQuickSetter( {
      opacity: randOnum( 23, 88 ) / 100,
      mixBlendMode: g.mixBlendModes[randOnum( 0, g.mixBlendModes.length - 1 )],
      translateX: mvMe,
    } )
  }
  if ( fLMustMove || laserMustMove ) {
    setTimeout( () => scanFolkLoreTick( f, mv + g.folklore.binary.folkLoreMaskIncrementX, rv ), g.folklore.binary.drawSingleCharS * 0.42, f, mv, rv, g.folklore.binary )
  } else {
    g.folklore.binary.drawCharsReversed = !rv
    subSceneProgress( 'scene11', 'folklore', 'ramPrimingOut' )
    const primeRamLaserUnTick = gsapTick( primeRamLaserTick )
    gsap.to( '#ramLaser', {
      duration: g.subScene.scene11.folklore.ff || 0.36,
      height: 0,
      onComplete() {
        ifFunctionThenCall( primeRamLaserUnTick )
        g.folklore.binary.ramLaserQuickSetter( g.folklore.binary.cssQuickReSetters.o )
        subSceneProgress( 'scene11', 'folklore', 'ramScanned' )
        if ( !g.folklore.lore.length ) {
          setTimeout( () => {
            const stone = g.document.querySelector( '#rosetta img' )
            g.folklore.binary.stoneWrapper = stone.parentNode
            for ( let x = 0; x < 45; x++ ) {
              for ( let y = 0; y < 49; y++ ) {
                const tx = x * 10
                const ty = y * 12
                const stoneBlock = g.document.createElement( 'div' )
                stoneBlock.classList.add( 'stoneBlock', `stoneBlock_x${x}` )
                stoneBlock.style.backgroundPosition = `${6.75 - tx}px ${-ty}px`
                stoneBlock.style.opacity = 0
                stoneBlock.style.transform = `translate(${tx}px, ${ty}px)`
                g.folklore.binary.stoneWrapper.insertBefore( stoneBlock, stone )
              }
            }
            gsap.set( '#ramIcon', {
              cursor: 'pointer',
              onComplete: function () {
                subSceneProgress( 'scene11', 'folklore', 'readyToPulverize' )
                if ( g.subScene.scene11.folklore.ff ) g.el.ramIcon.click()
              },
            } )
          }, g.folklore.binary.stoneLaserTimer )
        } else {
          gsap.set( '#ramIcon', {
            cursor: 'pointer',
          } )
          if ( g.subScene.scene11.folklore.ff ) g.el.ramIcon.click()
        }
      },
      overwrite: 'auto',
    } )
  }
}

const clearAwayTheStone = () => {
  if ( [ 'partiallyPulverized', 'readyToPulverize', 'readyToPulverizeHarder' ].includes( g.subScene.scene11.folklore.progress ) && g.folklore.binary.stoneWrapper ) {
    subSceneProgress( 'scene11', 'folklore', 'pulverizing' )
    gsap.set( '#ramIcon', {
      cursor: 'wait',
    } )
    switch ( g.folklore.binary.laserActivation ) {
      case 0:
        g.smoke.stoneSmoke1.unTick = gsapTick( stoneSmokeTick1 )
        gsap.to( '#stoneSmoke1', {
          duration: g.subScene.scene11.folklore.ff || g.folklore.binary.stoneLaserTimer / 100,
          ease: 'power2.out',
          opacity: 0.42,
          overwrite: 'auto',
          scaleY: g.folklore.binary.stoneDemolition === 2 ? 1.5 : 1,
        } )
        g.folklore.binary.currentStone = g.document.querySelector( '#rosetta img' )
        g.folklore.binary.nextStone = g.folklore.binary.currentStone.cloneNode( true )
        g.folklore.binary.nextStone.style.opacity = 0
        g.folklore.binary.stoneWrapper.insertBefore( g.folklore.binary.nextStone, g.folklore.binary.currentStone )
        g.folklore.binary.oldStoneImgQuickSetter = gsap.quickSetter( g.folklore.binary.currentStone, 'css' )
        g.folklore.binary.newStoneImgQuickSetter = gsap.quickSetter( g.folklore.binary.nextStone, 'opacity' )
        g.folklore.binary.nextStoneImgAss = assFolkloreRosetta2
        switch ( g.folklore.binary.stoneDemolition ) {
          case 0:
            g.smoke.stoneSmoke2.opacity = 0.12
            break
          case 1:
            g.folklore.binary.nextStoneImgAss = assFolkloreRosetta3
            g.folklore.binary.codeRain = setCodeRain( {
              element: g.el.codeRain,
              characters: '%&*+.0123456789Z:<=>£¥§±·¿ØĦƧ௹Ẍ…₡₥₩€₮₲₶℞⅋∴∺∻≇≡⊏⊐⊑⊒⊢⊰⊽⋀⋁⋂⋃⋈⋯⋰♫⟣⧦⨀あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをんアイウエオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヲン丝儿吉尺开比艾马﷼',
              font: 'Arial, sans-serif',
              fontSize: 12,
              columnWidth: 10,
              rowHeight: 12,
              textColor: '#52FF52',
              overlayColor: 'rgba(0, 0, 0, 0.04)',
              highlightFirstChar: 'rgba(255, 255, 255, 0.8)',
              interval: 36,
              direction: 'top-bottom',
              showStart: true,
              autoStart: true, // or startRaining() ?
            } )
            g.smoke.stoneSmoke2.opacity = 0.23
            break
          case 2:
            g.folklore.binary.nextStoneImgAss = assFolkloreRosetta4
            g.smoke.stoneSmoke2.opacity = 0.32
            break
        }
        gsap.set( g.folklore.binary.nextStone, {
          attr: {
            src: g.folklore.binary.nextStoneImgAss,
          },
          zIndex: -1,
        } )
        gsap.to( g.folklore.binary.stoneDemolition === 1 ? '#ramLaser3' : '#ramLaser2', {
          duration: g.subScene.scene11.folklore.ff || 0.5,
          ease: 'expo.out',
          onComplete: function () {
            g.folklore.binary.stoneColdLaserUnTick[g.folklore.binary.laserActivation] = gsapTick( g.folklore.binary.stoneDemolition === 1 ? stoneColdLaserTick1R : stoneColdLaserTick1L )
            gsap.to( '#owlGlyphGlow', {
              duration: g.subScene.scene11.folklore.ff || g.folklore.binary.stoneLaserTimer / 825,
              ease: 'power2.in',
              onComplete: function () {
                subSceneProgress( 'scene11', 'folklore', 'readyToPulverizeHarder' )
                g.folklore.binary.laserActivation++
                gsap.set( '#ramIcon', {
                  cursor: 'copy',
                } )
                if ( g.subScene.scene11.folklore.ff ) g.el.ramIcon.click()
              },
              opacity: 1,
              scaleX: 2,
              scaleY: 3,
            } )
          },
          overwrite: 'auto',
          scale: 1,
        } )
        break
      case 1:
        iceIceBaby()
        gsap.to( '#stoneSmoke1', {
          duration: g.subScene.scene11.folklore.ff || g.folklore.binary.stoneLaserTimer / 100,
          ease: 'power2.out',
          opacity: 1,
          overwrite: 'auto',
        } )
        gsap.to( g.folklore.binary.stoneDemolition === 1 ? '#ramLaser2' : '#ramLaser3', {
          duration: g.subScene.scene11.folklore.ff || 0.5,
          ease: 'expo.out',
          onComplete: function () {
            g.folklore.binary.stoneColdLaserUnTick[g.folklore.binary.laserActivation] = gsapTick( g.folklore.binary.stoneDemolition === 1 ? stoneColdLaserTick2L : stoneColdLaserTick2R )
            gsap.to( '#owlGlyphGlow', {
              duration: g.subScene.scene11.folklore.ff || g.folklore.binary.stoneLaserTimer / 825,
              ease: 'power2.in',
              onComplete: function () {
                subSceneProgress( 'scene11', 'folklore', 'readyToPulverizeHarder' )
                g.folklore.binary.laserActivation++
                gsap.set( '#ramIcon', {
                  cursor: 'copy',
                } )
                if ( g.subScene.scene11.folklore.ff ) g.el.ramIcon.click()
              },
              opacity: 1,
              scaleX: 4,
              scaleY: 7,
            } )
          },
          overwrite: 'auto',
          scale: 1,
        } )
        break
      case 2:
        // eslint-disable-next-line no-unneeded-ternary
        iceIceBaby( g.folklore.binary.stoneDemolition < 2 ? 1 : 0 )
        gsap.to( '#owlLaser2', {
          duration: g.subScene.scene11.folklore.ff || 0.5,
          ease: 'expo.out',
          onComplete: function () {
            g.folklore.binary.stoneColdLaserUnTick[g.folklore.binary.laserActivation] = gsapTick( stoneColdLaserTickC )
            gsap.to( '#owlGlyphGlow', {
              duration: g.subScene.scene11.folklore.ff || g.folklore.binary.stoneLaserTimer / 825,
              ease: 'power2.in',
              onComplete: function () {
                gsap.to( '#owlGlyphGlow', {
                  duration: g.folklore.binary.stoneLaserTimer / 1500,
                  ease: 'power3.in',
                  opacity: 0.76,
                  overwrite: 'auto',
                  scale: 1,
                } )
              },
              opacity: 1,
              scaleX: 5,
              scaleY: 16,
            } )
          },
          overwrite: 'auto',
          scale: 1,
        } )
        setTimeout( () => {
          gsap.set( '#stoneSmoke2', {
            opacity: g.smoke.stoneSmoke2.opacity,
            rotateZ: random( 0, 359 ),
          } )
          g.smoke.stoneSmoke2.unTick = gsapTick( g.folklore.binary.stoneDemolition === 2 ? stoneSmokeTick3 : stoneSmokeTick2 )
          setTimeout( () => {
            g.folklore.binary.stoneColdLaserUnTick.forEach( ut => {
              ifFunctionThenCall( ut )
            } )
            iceIceBaby( 1 )
            g.folklore.binary.stoneWrapper.removeChild( g.folklore.binary.currentStone )
            if ( g.folklore.binary.stoneDemolition === 2 ) {
              subSceneProgress( 'scene11', 'folklore', 'completelyPulverized' )
              gsap.to( '.stoneSmoke', {
                duration: g.subScene.scene11.folklore.ff || g.folklore.binary.stoneLaserTimer / 200,
                ease: 'power2.out',
                onComplete: function () {
                  if ( isFunction( g.smoke.stoneSmoke1.unTick ) ) g.smoke.stoneSmoke1.unTick()
                  else {
                    devLog( g.smoke.stoneSmoke1.unTick )
                    gsapUnTick( stoneSmokeTick1 )
                  }
                  ifFunctionThenCall( g.smoke.stoneSmoke2.unTick )
                },
                opacity: 0,
                overwrite: 'auto',
                scaleY: 1.5,
              } )
              g.folklore.binary.nextStone.style.top = 0
              const codeRainMaskSizeObj = { w: 436.5, h: 646 }
              g.folklore.binary.codeRainMaskSizeObj = { ...codeRainMaskSizeObj }
              g.folklore.binary.codeRainMaskQuickSetter = gsap.quickSetter( g.el.codeRain, 'css' )
              g.folklore.binary.codeRainMaskQuickSetter( {
                maskSize: '436.5px 646px',
                maskPosition: 'center calc(50% - 36px)',
                WebkitMaskSize: '436.5px 646px',
                WebkitMaskPosition: 'center calc(50% - 36px)',
              } )
              g.folklore.codeRainMaskUnTick = gsapTick( embiggenCodeRainMaskTick )
              gsap.set( '#binaryScroll', {
                height: 586,
              } )
              gsap.to( g.folklore.binary.codeRainMaskSizeObj, {
                duration: g.subScene.scene11.folklore.ff || 2,
                ease: 'power2.in',
                h: codeRainMaskSizeObj.h * 2,
                w: codeRainMaskSizeObj.w * 2,
              } )
              setTimeout( () => {
                gsap.set( '.stoneBlock', {
                  onComplete: function () {
                    g.folklore.binary.stoneWrapper.removeChild( g.folklore.binary.nextStone )
                    subSceneProgress( 'scene11', 'folklore', 'clearingRubble' )
                    const shuffled = shuffleArray( Array.from( { length: 45 }, ( _, i ) => i ) )
                    let dLay = 0
                    shuffled.forEach( x => {
                      gsap.to( `.stoneBlock_x${x}`, {
                        delay: g.subScene.scene11.folklore.ff || dLay / 6,
                        duration: g.subScene.scene11.folklore.ff || 1.5,
                        ease: 'power2.in',
                        opacity: 0,
                        stagger: g.subScene.scene11.folklore.ff || 0.07,
                      } )
                      dLay++
                    } )
                    gsap.set( '#ramIcon', {
                      delay: g.subScene.scene11.folklore.ff || 12,
                      cursor: 'pointer',
                      onComplete: function () {
                        subSceneProgress( 'scene11', 'folklore', 'rubbleCleared' )
                        if ( g.subScene.scene11.folklore.ff ) g.el.ramIcon.click()
                      },
                    } )
                  },
                  opacity: 1,
                } )
              }, g.folklore.binary.stoneLaserTimer )
            } else {
              subSceneProgress( 'scene11', 'folklore', 'partiallyPulverized' )
              gsap.set( '#ramIcon', {
                cursor: 'pointer',
              } )
              if ( g.subScene.scene11.folklore.ff ) {
                g.folklore.binary.laserActivation = 0
                g.folklore.binary.stoneDemolition++
                g.el.ramIcon.click()
              }
            }
            g.folklore.binary.laserActivation = 0
            g.folklore.binary.stoneDemolition++
          }, g.subScene.scene11.folklore.ff ? 100 : g.folklore.binary.stoneLaserTimer )
        }, g.subScene.scene11.folklore.ff ? 100 : g.folklore.binary.stoneLaserTimer )
        break
    }
  }
}

const stoneColdLaserFlash = laserQss => {
  laserQss.forEach( lqss => {
    lqss( {
      opacity: randOnum( 23, 88 ) / 100,
      mixBlendMode: g.mixBlendModes[randOnum( 0, g.mixBlendModes.length - 1 )],
      scale: 1,
    } )
  } )
}

const stoneColdLaserTick = ( laserQss, stoneShiftPx ) => {
  stoneColdLaserFlash( laserQss )
  g.folklore.binary.oldStoneImgQuickSetter( {
    scale: randOnum( 96, 104 ) / 100,
    skewX: randOnum( 0, 15 ) / 10 - 0.75,
    skewY: randOnum( 0, 15 ) / 10 - 0.75,
    translateX: randOnum( 0, stoneShiftPx * 2 ) - stoneShiftPx,
    translateY: randOnum( 0, stoneShiftPx * 2 ) - stoneShiftPx,
  } )
}

const stoneColdLaserTick1L = () => {
  stoneColdLaserTick( [ g.folklore.binary.ramLaser2QuickSetter ], g.folklore.binary.stoneColdLaserMagnitude[0] )
}

const stoneColdLaserTick1R = () => {
  stoneColdLaserTick( [ g.folklore.binary.ramLaser3QuickSetter ], g.folklore.binary.stoneColdLaserMagnitude[0] )
}

const stoneColdLaserTick2L = () => {
  stoneColdLaserTick( [ g.folklore.binary.ramLaser2QuickSetter, g.folklore.binary.ramLaser3QuickSetter ], g.folklore.binary.stoneColdLaserMagnitude[1] )
}

const stoneColdLaserTick2R = () => {
  stoneColdLaserTick( [ g.folklore.binary.ramLaser2QuickSetter, g.folklore.binary.ramLaser3QuickSetter ], g.folklore.binary.stoneColdLaserMagnitude[1] )
}

const stoneColdLaserTickC = () => {
  stoneColdLaserFlash( [ g.folklore.binary.ramLaser2QuickSetter, g.folklore.binary.ramLaser3QuickSetter ] )
  g.folklore.binary.owlLaser2QuickSetter( {
    opacity: randOnum( 52, 96 ) / 100,
    mixBlendMode: g.mixBlendModes[randOnum( 0, g.mixBlendModes.length - 1 )],
    scale: 1,
  } )
  const flashCrack = g.folklore.binary.stoneDemolition >= 2 || randOnum( 0, 3 ) ? 1 : randOnum( 64, 96 ) / 100
  g.folklore.binary.oldStoneImgQuickSetter( {
    filter: g.folklore.binary.stoneFilters[randOnum( 0, g.folklore.binary.stoneFilters.length - 1 )],
    opacity: flashCrack,
    scale: randOnum( 96, 104 ) / 100,
    skewX: randOnum( 0, 15 ) / 10 - 0.75,
    skewY: randOnum( 0, 15 ) / 10 - 0.75,
    translateX: randOnum( 0, g.folklore.binary.stoneColdLaserMagnitude[2] * 2 ) - g.folklore.binary.stoneColdLaserMagnitude[2],
    translateY: randOnum( 0, g.folklore.binary.stoneColdLaserMagnitude[2] * 2 ) - g.folklore.binary.stoneColdLaserMagnitude[2],
  } )
  g.folklore.binary.newStoneImgQuickSetter( flashCrack === 1 ? 0 : 1 )
}

const iceIceBaby = ( on = 0 ) => {
  g.folklore.binary.ramLaser2QuickSetter( g.folklore.binary.cssQuickReSetters.s )
  g.folklore.binary.ramLaser3QuickSetter( g.folklore.binary.cssQuickReSetters.s )
  g.folklore.binary.owlLaser2QuickSetter( g.folklore.binary.cssQuickReSetters.s )
  g.folklore.binary.newStoneImgQuickSetter( on )
  if ( g.folklore.binary.nextStone ) {
    gsap.fromTo( g.folklore.binary.nextStone, {
      scale: 1.18,
    }, {
      duration: 2.5,
      ease: 'elastic.out(1, 0.1)',
      scale: 1,
    } )
  }
}

const embiggenCodeRainMaskTick = () => {
  g.folklore.binary.codeRainMaskQuickSetter( {
    WebkitMaskSize: `${g.folklore.binary.codeRainMaskSizeObj.w}px ${g.folklore.binary.codeRainMaskSizeObj.h}px`,
    maskSize: `${g.folklore.binary.codeRainMaskSizeObj.w}px ${g.folklore.binary.codeRainMaskSizeObj.h}px`,
  } )
}

const printOutCows = () => {
  if ( g.subScene.scene11.folklore.progress === 'rubbleCleared' ) {
    if ( setClearActors( '#binaryScroll > div:not(#codeRain)' ) ) {
      subSceneProgress( 'scene11', 'folklore', 'cowsComeHome' )
      g.folklore.codeRainMaskUnTick()
      g.folklore.colorHelper = {
        mo: 0, // gradient midpoint opacity
        mp: 100, // gradient midpoint position
      }
      g.tL.cowWow = new TL( { defaults: { overwrite: 'auto' } } )
      if ( g.subScene.scene11.folklore.ff ) g.tL.cowWow.timeScale( 1 / g.subScene.scene11.folklore.ff )
      g.tL.cowWow
        .set( '.cowBell', {
          scaleY: 0,
        } )
        .set( '#ramIcon', {
          cursor: 'wait',
        } )
        .set( '#folkloreFinal', {
          translateY: -16,
        } )
        .to( '#owlGlyphGlow', {
          duration: g.folklore.binary.drawSingleCharS * 45,
          ease: 'power1.out',
          opacity: 1,
          repeat: 5,
          scale: 1.5,
          yoyo: true,
        }, '>' )
        .to( '#binaryFolklore', {
          duration: 3.42,
          ease: 'power1.in',
          translateY: 64,
          scale: 0.86,
        }, '<' )
        .to( '#binaryScroll', {
          duration: 3.42,
          ease: 'power1.in',
          height: 560,
        }, '<' )
        .to( '.cow', {
          duration: 1,
          ease: 'power2.in',
          scale: 1,
        }, '<' )
        .to( '.cow', {
          duration: 2,
          ease: 'expo.inOut',
          translateX: 0,
        }, '>' )
        .to( '#owlGlyphGlow', {
          duration: 1,
          ease: 'power1.in',
          onComplete: function () {
            const colorHelper = g.document.createElement( 'div' )
            colorHelper.id = 'ffColorHelper'
            colorHelper.style.opacity = 0
            g.el.binaryScroll.appendChild( colorHelper )
            ifFunctionThenCall( g.ramIcon.unClick )
            g.ramIcon.unClick = setAddOn( '#ramIcon', 'click', chewMe )
            if ( g.subScene.scene11.folklore.ff ) g.el.ramIcon.click()
          },
          opacity: 0,
        }, g.folklore.binary.drawSingleCharS * 270 )
    }
  }
}

const chewMe = () => {
  if ( g.subScene.scene11.folklore.progress !== 'cowChewing' ) {
    subSceneProgress( 'scene11', 'folklore', 'cowChewing' )
    const whichCow = g.folklore.whichCow ? 'R' : 'L'
    const { gnawSkew } = g.folklore.binary
    const fadeInFff = g.folklore.fff.pop()
    g.tL.cowWow.pause()
    g.tL.cowWow
      .set( '#ramIcon', {
        cursor: 'wait',
        onComplete: function () {
          if ( g.folklore.binary.lastFff ) {
            gsap.to( g.folklore.binary.lastFff, {
              delay: g.subScene.scene11.folklore.ff || 1,
              duration: g.subScene.scene11.folklore.ff || 0.75,
              onComplete: function () {
                if ( g.el.fffBody.contains( g.folklore.binary.lastFff ) ) g.el.fffBody.removeChild( g.folklore.binary.lastFff )
              },
              opacity: 0,
            } )
          }
        },
      } )
      .to( `#cow${whichCow}`, {
        duration: 1.75,
        translateY: '+=7.5',
      }, '>' )
      .to( g.el.binaryScroll, {
        duration: 1.75,
        translateY: '+=1',
      }, '<' )
      .to( fadeInFff, {
        duration: 1.75,
        opacity: 1,
      }, '<' )
      .to( '#folkloreFinal', {
        duration: 1.75,
        translateY: '+=2',
      }, '<' )
      .to( `#cow${whichCow}`, {
        duration: 0.25,
        ease: 'power1.in',
        skewX: random( 1, 3 ),
        skewY: random( -3, -5 ),
        scaleX: 0.96,
        scaleY: 1.16,
      }, '<' )
    for ( let gn = 0; gn < 5; gn++ ) {
      if ( !g.folklore.colorHelper.mp ) {
        if ( !g.folklore.colorHelper.mo < 100 ) g.folklore.colorHelper.mo += 0.05
      } else g.folklore.colorHelper.mp -= 5
      const rollAmount = g.folklore.binary.gnawSkew > 9 || gn < 1 || gn > 3 ? 1 : 2
      g.tL.cowWow.to( `#cow${whichCow}`, {
        duration: 0.25,
        ease: 'none',
        skewX: randOnum( 0, 1 ) ? random( -3, -1 ) : random( 1, 3 ),
        skewY: randOnum( 0, 1 ) ? random( 3, 5 ) : random( -3, -5 ),
        scaleX: randOnum( 0, 1 ) ? 1.12 : 0.96,
        scaleY: 1,
        repeat: 1,
        yoyo: true,
      }, '>' )
        .to( g.el.codeRain, {
          duration: 0.5,
          ease: 'power2.in',
          translateY: `-=${gnawSkew * 4}`,
          skewY: whichCow === 'L' ? `+=${gnawSkew}` : `-=${gnawSkew}`,
        }, '<' )
        .to( '#ffColorHelper', {
          duration: 0.5,
          background: `linear-gradient(0, rgba(154, 175, 212, 0) 0%, rgba(154, 175, 212, ${g.folklore.colorHelper.mo}) ${g.folklore.colorHelper.mp}%, rgba(154, 175, 212, 1) 100%)`,
          ease: 'power2.in',
          opacity: 1,
          translateY: `-=${gnawSkew * 4}`,
          skewY: whichCow === 'L' ? `+=${gnawSkew}` : `-=${gnawSkew}`,
        }, '<' )
        .call( rollEmInInc, [ whichCow, rollAmount ], '>' )
    }
    g.tL.cowWow.to( `#cow${whichCow}`, {
      duration: 0.25,
      ease: 'power1.out',
      onComplete: function () {
        g.folklore.binary.lastFff = fadeInFff
        if ( g.folklore.binary.gnawSkew < 9 ) {
          subSceneProgress( 'scene11', 'folklore', 'cowSwallow' )
          g.folklore.whichCow = !g.folklore.whichCow
          g.folklore.binary.gnawSkew *= 1.3
          gsap.set( '#ramIcon', {
            cursor: 'copy',
          } )
          if ( g.subScene.scene11.folklore.ff ) g.el.ramIcon.click()
        } else {
          ifFunctionThenCall( g.ramIcon.unClick )
          const extricatedFolkloreFinalForm = g.el.folkloreFinalForm.cloneNode( true )
          extricatedFolkloreFinalForm.style.opacity = 0
          extricatedFolkloreFinalForm.style.pointerEvents = 'none'
          g.el.threshold.appendChild( extricatedFolkloreFinalForm )
          g.tL.cowWow
            .to( extricatedFolkloreFinalForm, {
              duration: 1,
              onComplete: function () {
                setAddOn( '#folkloreFinal', 'click', () => navToNewTab( 'lyrics.html' ) )
              },
              opacity: 1,
            }, '>' )
            .to( g.el.folkloreFinalForm, {
              duration: 1,
              opacity: 0,
              onComplete: function () {
                g.el.theRam.removeChild( g.el.folkloreFinalForm )
                g.el.folkloreFinalForm = extricatedFolkloreFinalForm
                g.el.ramIcon.style.pointerEvents = 'none'
                setAddOn( '#cowL', 'mouseleave', idleCow )
                setAddOn( '#cowL', 'mouseenter', idleChewL, 'no-drop' )
                setAddOn( '#cowR', 'mouseleave', idleCow )
                setAddOn( '#cowR', 'mouseenter', idleChewR, 'no-drop' )
                unSetCodeRain( g.el.codeRain.id )
                const cleanUpUsedEls = g.document.querySelectorAll( '#ramIcon #binaryFolklore, #ramIcon .laser' )
                cleanUpUsedEls.forEach( el => {
                  el.parentNode.removeChild( el )
                } )
                g.el.theOwl.classList.add( 'seems' )
                g.el.theOwlIsNotWhatItSeems.classList.remove( 'open' )
                g.el.theOwlIsNotWhatItSeems.classList.add( 'flyAndCry' )
                gsap.set( '#theOwl', {
                  cursor: 'wait',
                } )
                animateBaubleLayer03or04( null, g.subScene.scene11.folklore.ff )
                subSceneProgress( 'scene11', 'folklore', 'complete' )
                if ( g.foetus.L.drop && g.foetus.R.drop ) setScene( 12 )
              },
            }, '>' )
            .to( '#cowL .cowBell', {
              duration: 1,
              scaleY: 1,
            }, '<' )
            .to( '#cowR .cowBell', {
              duration: 1,
              scaleY: -1,
            }, '<' )
        }
      },
      skewX: 0,
      skewY: 0,
      scale: 1,
    }, '>' )
    g.tL.cowWow.play()
  }
}

const idleCow = () => {
  g.tL.cowWow.kill()
}

const idleChewL = () => {
  idleChew( 'L' )
}

const idleChewR = () => {
  idleChew( 'R' )
}

const idleChew = whichCow => {
  g.tL.cowWow = new TL( { defaults: { overwrite: 'auto' }, repeat: -1 } )
  g.tL.cowWow.pause()
  g.tL.cowWow.to( `#cow${whichCow}`, {
    duration: 0.25,
    ease: 'power1.in',
    skewX: random( 1, 3 ),
    skewY: random( -3, -5 ),
    scaleX: 0.96,
    scaleY: 1.16,
  }, '<' )
  for ( let gn = 0; gn < 5; gn++ ) {
    g.tL.cowWow.to( `#cow${whichCow}`, {
      duration: 0.25,
      ease: 'none',
      skewX: randOnum( 0, 1 ) ? random( -3, -1 ) : random( 1, 3 ),
      skewY: randOnum( 0, 1 ) ? random( 3, 5 ) : random( -3, -5 ),
      scaleX: randOnum( 0, 1 ) ? 1.12 : 0.96,
      scaleY: 1,
      repeat: 1,
      yoyo: true,
    }, '>' )
  }
  g.tL.cowWow.to( `#cow${whichCow}`, {
    duration: 0.25,
    ease: 'power1.out',
    skewX: 0,
    skewY: 0,
    scale: 1,
  }, '>' )
  g.tL.cowWow.play()
}

export {
  printOutBinary, readyFolkLore, setFolkLore, unReadyFolkLore,
}
