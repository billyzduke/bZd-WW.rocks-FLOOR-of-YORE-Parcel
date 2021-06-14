/* eslint-disable guard-for-in, no-restricted-syntax, vars-on-top */ /* <-- This is all for the gsap helper function that I don't feel like spending time cleaning up */
/* eslint-disable no-bitwise */ /* <-- This is for the uuidv4 generator */
import { gsap } from 'gsap'

import g from '/src/shared/_'
import { devLog } from '/src/shared/dev/_'
import { toggleBaubleLayer } from '/src/main-stage/baubles/_'
import { toggleFloor } from '/src/main-stage/floor/_'
import { toggleLion } from '/src/main-stage/lion/_'

const addCSSRule = ( sheet, selector, rules ) => {
  if ( 'insertRule' in sheet ) {
    sheet.insertRule( `${selector}{${rules}}` )
  } else if ( 'addRule' in sheet ) {
    sheet.addRule( selector, rules )
  }
}

const convertTextToBinary = txt => {
  let bi = ''
  for ( let i = 0; i < txt.length; i++ ) {
    bi += `${txt[i].charCodeAt( 0 ).toString( 2 )} `
  }
  return bi
}

// https://gist.github.com/dmnsgn/36b26dfcd7695d02de77f5342b0979c7
// yet this doesn't really seem to work...
const getAllEventListeners = () => {
  const allEls = Array.prototype.slice.call( g.document.querySelectorAll( '*' ) )
  allEls.push( g.document )
  allEls.push( g.window )

  const types = getAllEventTypes()

  let els = []
  allEls.forEach( el => {
    els = [ ...els, ...analyzeElementListeners( el, types ) ]
  } )

  return sortElementListeners( els )
}

const sortElementListeners = els => els.sort( ( a, b ) => a.type.localeCompare( b.type ) )

const analyzeElementListeners = ( el, types ) => {
  const listeners = []
  for ( let j = 0; j < types.length; j++ ) {
    if ( typeof el[types[j]] === 'function' ) {
      listeners.push( {
        node: el,
        type: types[j],
        func: el[types[j]].toString(),
      } )
    }
  }
  return listeners
}

const getAllEventTypes = () => {
  const types = []
  for ( const ev in g.window ) {
    if ( /^on/.test( ev ) ) types[types.length] = ev
  }
  return types
}

const getElementEventListeners = el => {
  const types = getAllEventTypes()
  return sortElementListeners( analyzeElementListeners( el, types ) )
}

const getTranslateValues = element => {
  if ( isSet( g.window ) ) {
    // eslint-disable-next-line no-undef
    const style = g.window.getComputedStyle( element )
    const matrix = style.transform || style.webkitTransform || style.mozTransform

    // No transform property. Simply return 0 values.
    if ( matrix === 'none' || !isSet( matrix ) ) {
      return {
        x: 0,
        y: 0,
        z: 0,
      }
    }

    // Can either be 2d or 3d transform
    const matrixType = matrix.includes( '3d' ) ? '3d' : '2d'
    const matrixValues = matrix.match( /matrix.*\((.+)\)/ )[1].split( ', ' )

    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if ( matrixType === '2d' ) {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0,
      }
    }

    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if ( matrixType === '3d' ) {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14],
      }
    }
  }
  return {}
}

const gsapToOrSet = ( tL, too, too2, pos, set = false ) => {
  if ( tL ) {
    if ( set ) {
      tL.set( too, too2, pos )
    } else tL.to( too, too2, pos )
  } else if ( set ) {
    gsap.set( too, too2 )
  } else {
    gsap.to( too, too2 )
  }
}

const gsapUnTick = tickFunc => {
  const typeOfInput = typeof tickFunc
  const tickerHasIt = gsap.ticker._listeners.includes( tickFunc )
  if ( typeOfInput === 'function' && tickerHasIt ) {
    gsap.ticker.remove( tickFunc )
    devLog( `${tickFunc.name}() removed from gsap.ticker` )
    return true
  }
  if ( tickerHasIt ) {
    devLog( {
      gsapUnTick: 'failed', wtFunc: tickFunc, typeOfInput, tickerHasIt,
    } )
  }
  return [ tickFunc, gsap.ticker._listeners, gsap.ticker._listeners.includes( tickFunc ) ]
}

const gsapTick = tickFunc => {
  const typeOfInput = typeof tickFunc
  const tickerHasIt = gsap.ticker._listeners.includes( tickFunc )
  if ( typeOfInput === 'function' && !tickerHasIt ) {
    gsap.ticker.add( tickFunc )
    devLog( `${tickFunc.name}() added to gsap.ticker` )
    return () => gsapUnTick( tickFunc )
  }
  if ( !tickerHasIt ) {
    devLog( {
      gsapTick: 'failed', wtFunc: tickFunc, typeOfInput, tickerHasIt,
    } )
  }
  return false
}

const ifFunctionThenCall = func => ( isFunction( func ) ? func() : false )

const isFunction = func => ( ( typeof func === 'function' ) ? func.name || true : false )

// eslint-disable-next-line no-undef
const isNode = o => ( typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string' )

const isSet = value => !( typeof value === 'undefined' )

const mixItUp = () => g.mixBlendModes[randoNum( 0, g.mixBlendModes.length - 1 )]

const navToNewTab = dest => g.window.open( dest )

const navToPopUp = ( { url = '/', name = '', params = '' } = {} ) => {
  g.window.open( url, name, params )
}

const padStr = ( input, padLen = 2, padWith = '0', start = true ) => ( start ? input.toString().padStart( padLen, padWith ) : input.toString().padEnd( padLen, padWith ) )

const randoNum = ( mn = 0, mx = 1, inc = 1 ) => {
  const totalSteps = ( mx - mn ) / inc
  const possibleValues = []
  for ( let step = 0; step <= totalSteps; step += inc ) {
    possibleValues[step] = mn + ( step * inc )
  }
  let rando = Math.floor( Math.random() * ( totalSteps + 1 ) )
  rando = possibleValues[rando]
  rando = ( parseInt( inc, 10 ) === inc ) ? Math.floor( rando ) : rando.toFixed( 2 )
  return ( rando )
}

const randoColor = ( as = 'hex' ) => {
  const rgb = []
  switch ( as ) {
    case 'hex':
    default:
      for ( let h = 0; h < 3; h++ ) rgb[h] = padStr( randoNum( 0, 255 ).toString( 16 ) )
      return `#${rgb.join( '' )}`
  }
}

const roundNumberTo = ( num, dec = 0 ) => Math.round( ( ( num + Number.EPSILON ) * ( 10 ** dec ) ) / ( 10 ** dec ) )

const cleanUp = messes => {
  if ( messes && messes.length ) {
    messes.forEach( ( _, cu ) => {
      ifFunctionThenCall( messes[cu] )
      messes.cu = undefined
    } )
  } else devLog( { messEscapedCleaning: messes, typeOfMess: typeof messes } )
  return []
}

const setClearActors = domSelector => {
  const domElements = g.document.querySelectorAll( domSelector )
  Object.keys( domElements ).forEach( domEl => {
    if ( domElements[domEl].parentNode ) domElements[domEl].parentNode.removeChild( domElements[domEl] )
  } )
  return true
}

const setClearInterval = ntrvl => {
  clearInterval( ntrvl )
  return true
}

const setRemoveOn = ( domSelector, onEvent, doFunc, cursorOn = 'no-drop' ) => {
  const domElements = g.document.querySelectorAll( domSelector )
  domElements.forEach( domEl => {
    // devLog( { listeners: getElementEventListeners( domEl ) } )
    domEl.removeEventListener( onEvent, doFunc )
    devLog( `event listener removed from #${domEl.id}: ${onEvent} => ${doFunc.name}()` )
    if ( cursorOn ) domEl.style.cursor = cursorOn
    else domEl.style.pointerEvents = 'none'
  } )
  return true
}

const setAddOn = ( domSelector, onEvent, doFunc, cursorOn = 'pointer', cursorOff = 'no-drop' ) => {
  const domElements = g.document.querySelectorAll( domSelector )
  domElements.forEach( domEl => {
    if ( isFunction( doFunc ) ) {
      domEl.addEventListener( onEvent, doFunc )
      devLog( `event listener added to #${domEl.id}: ${onEvent} => ${doFunc.name || 'f'}()` )
      domEl.style.pointerEvents = 'auto'
      if ( cursorOn ) domEl.style.cursor = cursorOn
    } else {
      devLog( "Yuh done func'd up, BOY!", { domSelector, onEvent } )
      return false
    }
  } )
  return () => setRemoveOn( domSelector, onEvent, doFunc, cursorOff )
}

const shuffleArray = arr => {
  const ar = [ ...arr ]
  for ( let i = ar.length - 1; i > 0; i-- ) {
    const j = Math.floor( Math.random() * ( i + 1 ) );
    [ ar[i], ar[j] ] = [ ar[j], ar[i] ]
  }
  return ar
}

const toggleFermata = ( { exceptTLs = [], exceptTickers = [], exceptEtc = [] } = {}, forcePause = false ) => {
  // more conditionals would be strictly necessary here if this function was ever called prior to scene 13, but it's not, so...
  if ( !g.fermata || forcePause ) {
    Object.keys( g.tL ).forEach( tL => {
      const timeLine = { [tL]: g.tL[tL] }
      timeLine.shouldBePaused = !exceptTLs.includes( tL )
      if ( timeLine.shouldBePaused ) {
        timeLine.canBePaused = isFunction( g.tL[tL].pause )
        if ( timeLine.canBePaused ) {
          timeLine.paused = g.tL[tL].pause()
        }
      }
      devLog( timeLine )
    } )
    Object.keys( g.tickers ).forEach( ticker => {
      const tckr = { [ticker]: g.tickers[ticker] }
      tckr.shouldBeUnTicked = !exceptTickers.includes( ticker )
      if ( tckr.shouldBeUnTicked ) {
        tckr.wasUnTicked = ifFunctionThenCall( g.tickers[ticker] )
        // eslint-disable-next-line prefer-destructuring
        if ( tckr.wasUnTicked ) g.tickers[ticker] = tckr.wasUnTicked[0]
      }
      devLog( tckr )
    } )
    g.fermata = true
  } else {
    Object.keys( g.tL ).forEach( tL => {
      const timeLine = { [tL]: g.tL[tL] }
      timeLine.shouldBePlayed = !exceptTLs.includes( tL )
      if ( timeLine.shouldBePlayed ) {
        timeLine.canBePlayed = isFunction( g.tL[tL].play )
        if ( timeLine.canBePlayed ) {
          timeLine.played = g.tL[tL].play()
        }
      }
      devLog( timeLine )
    } )
    Object.keys( g.tickers ).forEach( ticker => {
      const tckr = { [ticker]: g.tickers[ticker] }
      tckr.shouldBeReTicked = !exceptTickers.includes( ticker )
      if ( tckr.shouldBeReTicked ) {
        tckr.wasReTicked = g.tickers[ticker] = gsapTick( g.tickers[ticker] )
      }
      devLog( tckr )
    } )
    g.fermata = false
  }
  if ( !exceptEtc.includes( 'lion' ) ) toggleLion( forcePause )
  if ( !exceptEtc.includes( 'floor' ) ) toggleFloor( forcePause )
  g.bL.forEach( ( _, i ) => {
    if ( !exceptEtc.includes( `bL${padStr( i )}` ) ) toggleBaubleLayer( i, forcePause )
  } )
}

const upperCaseFirstLetter = str => str.charAt( 0 ).toUpperCase() + str.slice( 1 )

const uuidv4 = () => {
  const c = '0123456789abcdef'.split( '' )
  const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split( '' )
  let r

  id[0] = c[( r = Math.random() * 0x100000000 ) & 0xf]
  id[1] = c[( r >>>= 4 ) & 0xf]
  id[2] = c[( r >>>= 4 ) & 0xf]
  id[3] = c[( r >>>= 4 ) & 0xf]
  id[4] = c[( r >>>= 4 ) & 0xf]
  id[5] = c[( r >>>= 4 ) & 0xf]
  id[6] = c[( r >>>= 4 ) & 0xf]
  id[7] = c[( r >>>= 4 ) & 0xf]

  id[9] = c[( r = Math.random() * 0x100000000 ) & 0xf]
  id[10] = c[( r >>>= 4 ) & 0xf]
  id[11] = c[( r >>>= 4 ) & 0xf]
  id[12] = c[( r >>>= 4 ) & 0xf]
  id[15] = c[( r >>>= 4 ) & 0xf]
  id[16] = c[( r >>>= 4 ) & 0xf]
  id[17] = c[( r >>>= 4 ) & 0xf]

  // eslint-disable-next-line no-mixed-operators
  id[19] = c[( r = Math.random() * 0x100000000 ) & 0x3 | 0x8]
  id[20] = c[( r >>>= 4 ) & 0xf]
  id[21] = c[( r >>>= 4 ) & 0xf]
  id[22] = c[( r >>>= 4 ) & 0xf]
  id[24] = c[( r >>>= 4 ) & 0xf]
  id[25] = c[( r >>>= 4 ) & 0xf]
  id[26] = c[( r >>>= 4 ) & 0xf]
  id[27] = c[( r >>>= 4 ) & 0xf]

  id[28] = c[( r = Math.random() * 0x100000000 ) & 0xf]
  id[29] = c[( r >>>= 4 ) & 0xf]
  id[30] = c[( r >>>= 4 ) & 0xf]
  id[31] = c[( r >>>= 4 ) & 0xf]
  id[32] = c[( r >>>= 4 ) & 0xf]
  id[33] = c[( r >>>= 4 ) & 0xf]
  id[34] = c[( r >>>= 4 ) & 0xf]
  id[35] = c[( r >>>= 4 ) & 0xf]

  return id.join( '' )
}

export {
  addCSSRule,
  convertTextToBinary,
  cleanUp,
  devLog,
  getAllEventListeners,
  getElementEventListeners,
  getTranslateValues,
  gsapToOrSet,
  gsapTick,
  gsapUnTick,
  ifFunctionThenCall,
  isFunction,
  isNode,
  isSet,
  mixItUp,
  navToNewTab,
  navToPopUp,
  padStr,
  randoNum,
  randoColor,
  roundNumberTo,
  setAddOn,
  setClearActors,
  setClearInterval,
  setRemoveOn,
  shuffleArray,
  toggleFermata,
  upperCaseFirstLetter,
  uuidv4,
}
