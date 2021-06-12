import * as PIXI from 'pixi.js'
// import * as PIXIDisplay from '@pixi/display'
// import { Layer } from '@pixi/layers'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

import assLynchBoxFrame from 'url:/src/img/future/lynchBoxFrame.png'
import g from './glob'

gsap.registerPlugin( PixiPlugin )
PixiPlugin.registerPIXI( PIXI )

const setLynchBox = () => {
  g.el.lynchBox.style.zIndex = 50
  g.el.lynchBox.style.opacity = 1

  g.lynchBox = {
    bxs: [],
    ini: [],
    opt: {
      antialias: true,
      autoDensity: true,
      autoStart: false,
      backgroundColor: 0x000000,
      height: g.main.h,
      width: g.main.w,
      resolution: g.window.devicePixelRatio || 1,
    },
    mvt: 60,
    stp: [],
  }
  g.lynchBox.pxi = new PIXI.Renderer( g.lynchBox.opt )
  g.lynchBox.stg = new PIXI.Container()
  g.lynchBox.stg.sortableChildren = true
  // g.lynchBox.lyr = new PIXIdisplay.Layer()
  // g.lynchBox.lyr.group.enableSort = true
  // g.lynchBox.stg.addChild( g.lynchBox.lyr )
  g.lynchBox.tkr = new PIXI.Ticker()
  g.lynchBox.pxi.view.height = g.lynchBox.stg.height = g.main.h
  g.lynchBox.pxi.view.width = g.lynchBox.stg.width = g.main.w
  g.lynchBox.pxi.view.style.height = `${g.main.h}px`
  g.lynchBox.pxi.view.style.width = `${g.main.w}px`
  g.el.lynchBox.appendChild( g.lynchBox.pxi.view )
  g.lynchBox.h = g.lynchBox.pxi.screen.height * g.main.scale
  g.lynchBox.w = g.lynchBox.pxi.screen.width * g.main.scale
  g.lynchBox.cx = g.lynchBox.w / 2
  g.lynchBox.cy = g.lynchBox.h / 2
  g.lynchBox.clk = Date.now()

  const boxes = 15
  for ( let bx = 0; bx < boxes; bx++ ) {
    g.lynchBox.bxs.push( drawBox( assLynchBoxFrame ) )
    const boxTime = g.lynchBox.clk + ( 1500 * bx )
    g.lynchBox.ini.push( boxTime )
    g.lynchBox.stp.push( boxTime )
    animateBox( g.lynchBox.bxs.length - 1 )
    g.lynchBox.stg.addChild( g.lynchBox.bxs[g.lynchBox.bxs.length - 1] )
    // g.lynchBox.bxs[g.lynchBox.bxs.length - 1].parentGroup = g.lynchBox.stg
    // g.lynchBox.bxs[g.lynchBox.bxs.length - 1].parentLayer = g.lynchBox.lyr
    g.lynchBox.bxs[g.lynchBox.bxs.length - 1].zOrder = boxes - bx
  }
  // g.lynchBox.stg.updateStage()

  // eslint-disable-next-line prefer-arrow-callback
  g.lynchBox.tkr.add( () => {
    g.lynchBox.bxs.forEach( ( _, bx ) => {
      animateBox( bx )
    } )
    g.lynchBox.pxi.render( g.lynchBox.stg )
  } )
  g.lynchBox.tkr.start()
}

const drawBox = txtAss => {
  const boxSprite = PIXI.Sprite.from( txtAss )
  boxSprite.width = g.main.w / 10
  boxSprite.height = g.main.h / 10
  return boxSprite
}

const animateBox = bx => {
  const now = Date.now()
  if ( typeof g.m.x !== 'undefined' && typeof g.m.y !== 'undefined' && now > g.lynchBox.stp[bx] ) {
    const box = g.lynchBox.bxs[bx]
    const d = ( now - g.lynchBox.ini[bx] ) / 30000
    let { height, width } = box
    if ( box.width < g.lynchBox.w || box.height < g.lynchBox.h ) {
      width += g.lynchBox.w / g.lynchBox.mvt
      height += g.lynchBox.h / g.lynchBox.mvt
      box.zOrder += 1
    } else {
      width = g.lynchBox.w / 10
      height = g.lynchBox.h / 10
      g.lynchBox.ini[bx] = Date.now()
      // box.zOrder = 0
    }
    let x = g.lynchBox.cx - ( box.width / 2 )
    let y = g.lynchBox.cy - ( box.height / 2 )
    // console.log( { box: { w: box.width, h: box.height }, bX, bY } )
    x -= ( g.m.x - g.lynchBox.cx ) * ( 1 - ( width / g.lynchBox.w ) ) * ( 1 - Math.cbrt( d ) )
    y -= ( g.m.y - g.lynchBox.cy ) * ( 1 - ( height / g.lynchBox.h ) ) * ( 1 - Math.cbrt( d ) )
    gsap.set( box, {
      pixi: {
        alpha: width / g.lynchBox.w,
        width,
        height,
        x,
        y,
      },
    } )
    g.lynchBox.stp[bx] = Date.now()
  }
}

export { setLynchBox }
