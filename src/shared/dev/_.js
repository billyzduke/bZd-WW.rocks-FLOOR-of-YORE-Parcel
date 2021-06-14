import { Draggable } from 'gsap/Draggable'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

import g from '/src/shared/_'
import {
  isFunction, isSet, padStr, setAddOn, upperCaseFirstLetter,
} from '/src/shared/utils'
import { setScene } from '/src/scenes/_'
import { rollEmOut } from '/src/main-stage/threshold/two-cows-one-owl/owl-ram/_'

const devLog = log => {
  if ( g.dev ) console.log( log )
}

const skipToScene = ( toScene, e ) => {
  e.target.blur()
  e.target.style.pointerEvents = 'none'
  g.scene.skip.ff = 0.1
  g.tL.yore.timeScale( 1 / g.scene.skip.ff )
  g.scene.skip.target = Number( toScene )
  setScene( g.scene.current + 1 )
  setTimeout( () => {
    e.target.style.pointerEvents = 'auto'
  }, 2500 )
}

const setSceneSkipper = () => {
  if ( g.dev ) {
    if ( g.el.sceneSkipper && !g.el.sceneSkipper.options.length ) {
      g.scenes.forEach( ( s, i ) => {
        const ssOption = g.document.createElement( 'option' )
        ssOption.value = i
        ssOption.innerHTML = `${i}: ${s}`
        if ( i < 1 || i < g.scene.current + 2 || i < g.scene.skip.target + 1 ) ssOption.disabled = true
        g.el.sceneSkipper.add( ssOption )
      } )
      g.el.sceneSkipper.value = 0
      g.el.sceneSkipper.addEventListener( 'change', e => skipToScene( g.el.sceneSkipper.value, e ) )
    } else {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for ( let i in g.el.sceneSkipper.options ) {
        i = Number( i ) // it's not an array, so...
        if ( Number.isInteger( i ) ) {
          if ( i === g.scene.current ) {
            g.el.sceneSkipper.value = i
          }
          if ( i < 1 || i < g.scene.current + 2 || i < g.scene.skip.target + 1 ) g.el.sceneSkipper.options[i].disabled = true
        }
      }
    }
  } else {
    if ( g.el.sceneSkipper && g.el.sceneSkipper.parentNode ) {
      g.el.sceneSkipper.parentNode.removeChild( g.el.sceneSkipper )
      g.el.sceneSkipper = undefined
    }
    if ( g.el.subSceneSkipper && g.el.subSceneSkipper.parentNode ) {
      g.el.subSceneSkipper.parentNode.removeChild( g.el.subSceneSkipper )
      g.el.subSceneSkipper = undefined
    }
  }
}

const setSubSceneSkippers = scene => {
  if ( scene && g.dev ) {
    const parentScene = `scene${padStr( scene )}`
    console.log( g.el.subSceneSkippers.hasChildNodes() )
    if ( g.el.subSceneSkippers.hasChildNodes() ) {
      [ ...g.el.subSceneSkippers.children ].forEach( ssSk => {
        ssSk.parentNode.removeChild( ssSk )
      } )
    }
    if ( g.el.subSceneSkippers && g.subScene[parentScene] ) {
      Object.keys( g.subScene[parentScene] ).forEach( subScene => {
        if ( subScene !== 'ss' ) {
          const ss = `ss${upperCaseFirstLetter( subScene )}`
          const skipButton = g.document.createElement( 'input' )
          skipButton.type = 'checkbox'
          skipButton.id = ss
          skipButton.value = subScene
          skipButton.classList.add( 'onOffSwitch' )
          const skipLabel = g.document.createElement( 'label' )
          skipLabel.classList.add( 'onOffWrapper' )
          const skipSpan = g.document.createElement( 'span' )
          skipSpan.classList.add( 'onOffLabel' )
          skipSpan.innerHTML = subScene
          skipSpan.for = subScene
          skipLabel.appendChild( skipButton )
          skipLabel.appendChild( skipSpan )
          g.el.subSceneSkippers.appendChild( skipLabel )
          g.scene.forCleanUp[scene][ss] = setAddOn( `#${ss}`, 'click', () => skipSubScene( scene, subScene ) )
        }
      } )
    }
  }
}

const cleanSkipper = ( scene, ss ) => {
  if ( isFunction( g.scene.forCleanUp[scene][ss] ) ) {
    g.scene.forCleanUp[scene][ss]()
    g.scene.forCleanUp[scene][ss] = undefined
  }
}

const skipSubScene = ( scene, subScene ) => {
  const parentScene = `scene${padStr( scene )}`
  devLog( `skipping ${parentScene} subScene ${subScene}` )
  const ss = `ss${upperCaseFirstLetter( subScene )}`
  cleanSkipper( scene, ss )
  g.subScene[parentScene][subScene].ff = 0.1
  if ( scene === 11 && subScene === 'folklore' ) {
    g.folklore.binary.folkLoreMaskIncrementX = 225
    rollEmOut()
  } else {
    const ssTrigger = g.document.querySelector( `.${parentScene}.subSceneTrigger.${subScene}` )
    ssTrigger.click()
  }
}

const maimSkipper = ( parentScene, subScene ) => {
  const scene = parentScene.substr( 5 )
  const ss = `ss${upperCaseFirstLetter( subScene )}`
  cleanSkipper( scene, ss )
  const skipButton = g.document.querySelector( `#${ss}` )
  if ( skipButton ) {
    skipButton.checked = true
    return skipButton
  }
  return false
}

const killSkipper = ( parentScene, subScene ) => {
  const maimedButton = maimSkipper( parentScene, subScene )
  if ( maimedButton ) {
    maimedButton.disabled = true
  }
}

const svgPathsMorphOriginsHelper = ( target1, target2, vars = {} ) => {
  gsap.killTweensOf( target1, false, { morphSVG: true } )
  const _getElement = function ( e ) {
    return ( typeof ( e ) === 'string' ) ? g.document.querySelector( e ) : e
  }
  const _setDefaults = function ( v = {}, defaults ) {
    defaults.forEach( p => {
      if ( !( p in v ) ) v[p] = defaults[p]
    } )
    return v
  }
  const _createSVG = function ( type, container, attributes ) {
    const element = g.document.createElementNS( 'http://www.w3.org/2000/svg', type )
    const reg = /([a-z])([A-Z])/g
    let p
    for ( p in attributes ) {
      element.setAttributeNS( null, p.replace( reg, '$1-$2' ).toLowerCase(), attributes[p] )
    }
    container.appendChild( element )
    return element
  }
  let editing = 'start'
  let lines; let startOrigin; let endOrigin
  const _createLines = function () {
    const rawPath = startElement._gsRawPath
    let i; let j; let segment; let line
    lines = []
    for ( j = 0; j < rawPath.length; j++ ) {
      segment = rawPath[j]
      for ( i = 0; i < segment.length; i += 6 ) {
        line = _createSVG( 'line', startElement.ownerSVGElement, { stroke: v.lineColor, strokeWidth: v.lineWidth } )
        line.style.opacity = v.lineOpacity
        lines.push( line )
      }
      g.parentNode.appendChild( g )
    }
    return lines
  }
  const _update = function ( leaveOrigin ) {
    const rawPath = startElement._gsRawPath
    let li = 0
    const localToGlobal = globalG.getCTM().inverse().multiply( startElement.getCTM() )
    const globalToLocal = localToGlobal.inverse()
    let o; let j; let i; let sl; let line; let segment; let ox; let oy; let x; let y
    if ( rawPath && rawPath.origin ) {
      if ( leaveOrigin === true ) {
        ox = gsap.getProperty( g, 'x' )
        oy = gsap.getProperty( g, 'y' )
      } else {
        o = rawPath.origin
        ox = o.x * localToGlobal.a + o.y * localToGlobal.c + localToGlobal.e
        oy = o.x * localToGlobal.b + o.y * localToGlobal.d + localToGlobal.f
        gsap.set( g, { x: ox, y: oy } )
      }
      if ( v.showLines ) {
        if ( !lines ) {
          _createLines()
        }
        for ( j = 0; j < rawPath.length; j++ ) {
          segment = rawPath[j]
          sl = segment.length
          for ( i = 0; i < sl; i += 6 ) {
            line = lines[li++]
            line.setAttribute( 'x1', ox )
            line.setAttribute( 'y1', oy )
            line.setAttribute( 'x2', segment[i] * localToGlobal.a + segment[i + 1] * localToGlobal.c + localToGlobal.e )
            line.setAttribute( 'y2', segment[i] * localToGlobal.b + segment[i + 1] * localToGlobal.d + localToGlobal.f )
          }
        }
      }
      if ( leaveOrigin === true ) {
        x = ( ( ox * globalToLocal.a + oy * globalToLocal.c + globalToLocal.e ) - rawPath.left ) / rawPath.width
        y = ( ( ox * globalToLocal.c + oy * globalToLocal.d + globalToLocal.f ) - rawPath.top ) / rawPath.height
        if ( editing === 'start' ) {
          startOrigin = `${Math.round( x * 100 )}% ${Math.round( y * 100 )}%`
        } else {
          endOrigin = `${Math.round( x * 100 )}% ${Math.round( y * 100 )}%`
        }
        label.textContent = startOrigin + ( endOrigin ? `, ${endOrigin}` : '' )
      }
    }
  }
  let startElement = _getElement( target1 )
  let v = _setDefaults( vars, {
    fill: 'green', scale: 1, origin: '50% 50%', lineColor: 'white', lineWidth: 0.5, lineOpacity: 0.35, duration: 2.25, ease: 'power1.inOut', draggable: true,
  } )
  let globalG = _createSVG( 'g', startElement.ownerSVGElement ) // Firefox returns null for ownerSVGElement.getCTM(), so we need a dummy element
  const labelG = _createSVG( 'g', startElement.ownerSVGElement )
  const rect = _createSVG( 'rect', labelG, { width: 120, height: 17 } )
  let label = _createSVG( 'text', labelG, { textAnchor: 'middle' } )
  let g = _createSVG( 'g', startElement.ownerSVGElement )
  // eslint-disable-next-line no-unused-vars
  const clickArea = _createSVG( 'circle', g, { r: 20, style: 'fill:transparent' } )
  const origin = _createSVG( 'circle', g, { r: 4, style: `fill:${v.fill};stroke:${v.lineColor}` } )
  const tween = gsap.to( target1, {
    duration: v.duration,
    morphSVG: {
      shape: target2, type: 'rotational', origin: v.origin, smoothTolerance: v.smoothTolerance,
    },
    onUpdate: _update,
    ease: v.ease,
  } )
  const bbox = startElement.getBBox()
  // eslint-disable-next-line no-unused-vars
  const globalToLocal = globalG.getCTM().inverse().multiply( startElement.getCTM() ).inverse()
  const localToGlobal = globalG.getCTM().inverse().multiply( startElement.getCTM() )
  const tl = gsap.timeline( { yoyo: true, repeat: -1, repeatDelay: 1.25 } )

  gsap.set( rect, {
    y: -17, x: -60, fill: 'black', opacity: 0.4,
  } )
  gsap.set( label, { y: -5, fontSize: 10, fill: 'white' } )
  gsap.set( [ g, labelG ], { scale: v.scale, svgOrigin: '0 0' } )
  gsap.set( labelG, { x: bbox.x + bbox.width / 2 + localToGlobal.e, y: bbox.y + bbox.height + localToGlobal.f } )
  tl.add( tween, 0 )
    .to( origin, { duration: v.duration, fill: 'red', ease: 'steps(1)' }, 0 )
  tl.time( 0.0001 )
  const rawPath = startElement._gsRawPath
  if ( !rawPath || !rawPath.origin ) {
    // eslint-disable-next-line no-throw-literal
    throw 'Please update to the latest MorphSVGPlugin'
  }
  if ( v.origin.indexOf( ',' ) !== -1 ) {
    // eslint-disable-next-line prefer-destructuring
    endOrigin = v.origin.split( ',' )[1]
  }
  _update()
  _update( true )
  if ( isSet( Draggable ) ) {
    Draggable.create( g, {
      onPress() {
        if ( tl.pause().progress() < 0.5 ) {
          editing = 'start'
          tl.progress( 0.0001 )
        } else {
          editing = 'end'
          tl.progress( 0.99999 )
        }
        MorphSVGPlugin.getTotalSize( startElement._gsRawPath ) // re-calculates the top/left/width/height and attaches those to the rawPath.
        gsap.set( g, { x: this.x, y: this.y } )
        _update( true )
      },
      onDrag() {
        _update( true )
      },
      onRelease() {
        const time = tl.time() // globalToLocal = startElement.ownerSVGElement.getCTM().inverse().multiply(startElement.getCTM()).inverse()
        tween.vars.morphSVG.origin = startOrigin + ( endOrigin ? `,${endOrigin}` : '' )
        tl.totalTime( 0 ).invalidate().play( time > 0.001 ? time + 1.25 : 0 )
      },
    } )
  } else devLog( 'Please load Draggable for findMorphOrigin() to work.' )
  return tl
}

export {
  cleanSkipper, devLog, killSkipper, maimSkipper, setSceneSkipper, setSubSceneSkippers, skipSubScene, skipToScene, svgPathsMorphOriginsHelper,
}
