import * as PIXI from 'pixi.js'
// import * as PIXIDisplay from '@pixi/display'
// import { Layer } from '@pixi/layers'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

import assLynchTunnelFrame from 'url:/src/img/future/lynchTunnelFrame.png'
import g from '/src/js/glob'

gsap.registerPlugin( PixiPlugin )
PixiPlugin.registerPIXI( PIXI )

const setLynchTunnel = () => {
  // g.el.lynchTunnel.style.zIndex = 50
  // g.el.lynchTunnel.style.opacity = 1

  g.lynchTunnel = {
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
  g.lynchTunnel.pxi = new PIXI.Renderer( g.lynchTunnel.opt )
  g.lynchTunnel.stg = new PIXI.Container()
  g.lynchTunnel.stg.sortableChildren = true
  // g.lynchTunnel.lyr = new PIXIdisplay.Layer()
  // g.lynchTunnel.lyr.group.enableSort = true
  // g.lynchTunnel.stg.addChild( g.lynchTunnel.lyr )
  g.lynchTunnel.tkr = new PIXI.Ticker()
  g.lynchTunnel.pxi.view.height = g.lynchTunnel.stg.height = g.main.h
  g.lynchTunnel.pxi.view.width = g.lynchTunnel.stg.width = g.main.w
  g.lynchTunnel.pxi.view.style.height = `${g.main.h}px`
  g.lynchTunnel.pxi.view.style.width = `${g.main.w}px`
  g.el.lynchBox.appendChild( g.lynchTunnel.pxi.view )
  g.lynchTunnel.h = g.lynchTunnel.pxi.screen.height * g.main.scale
  g.lynchTunnel.w = g.lynchTunnel.pxi.screen.width * g.main.scale
  g.lynchTunnel.cx = g.lynchTunnel.w / 2
  g.lynchTunnel.cy = g.lynchTunnel.h / 2
  g.lynchTunnel.clk = Date.now()

  const boxes = 15
  for ( let bx = 0; bx < boxes; bx++ ) {
    g.lynchTunnel.bxs.push( drawBox( assLynchTunnelFrame ) )
    const boxTime = g.lynchTunnel.clk + ( 125 * bx )
    g.lynchTunnel.ini.push( boxTime )
    g.lynchTunnel.stp.push( boxTime )
    animateBox( g.lynchTunnel.bxs.length - 1 )
    g.lynchTunnel.stg.addChild( g.lynchTunnel.bxs[g.lynchTunnel.bxs.length - 1] )
    // g.lynchTunnel.bxs[g.lynchTunnel.bxs.length - 1].parentGroup = g.lynchTunnel.stg
    // g.lynchTunnel.bxs[g.lynchTunnel.bxs.length - 1].parentLayer = g.lynchTunnel.lyr
    g.lynchTunnel.bxs[g.lynchTunnel.bxs.length - 1].zOrder = boxes - bx
  }
  // g.lynchTunnel.stg.updateStage()

  // eslint-disable-next-line prefer-arrow-callback
  g.lynchTunnel.tkr.add( () => {
    g.lynchTunnel.bxs.forEach( ( _, bx ) => {
      animateBox( bx )
    } )
    g.lynchTunnel.pxi.render( g.lynchTunnel.stg )
  } )
}

const drawBox = txtAss => {
  const boxSprite = PIXI.Sprite.from( txtAss )
  boxSprite.width = g.main.w / 10
  boxSprite.height = g.main.h / 10
  return boxSprite
}

const animateBox = bx => {
  const now = Date.now()
  if ( typeof g.m.x !== 'undefined' && typeof g.m.y !== 'undefined' && now > g.lynchTunnel.stp[bx] ) {
    const box = g.lynchTunnel.bxs[bx]
    const d = ( 125 * g.lynchTunnel.ini[bx] ) / 7500
    let { height, width } = box
    if ( box.width < g.lynchTunnel.w || box.height < g.lynchTunnel.h ) {
      width += g.lynchTunnel.w / g.lynchTunnel.mvt
      height += g.lynchTunnel.h / g.lynchTunnel.mvt
      box.zOrder += 1
    } else {
      width = g.lynchTunnel.w / 10
      height = g.lynchTunnel.h / 10
      const prvBx = !bx ? g.lynchTunnel.bxs.length - 1 : bx - 1
      g.lynchTunnel.ini[bx] = g.lynchTunnel.ini[prvBx] + 7500
      // box.zOrder = 0
    }
    let x = g.lynchTunnel.cx - ( box.width / 2 )
    let y = g.lynchTunnel.cy - ( box.height / 2 )
    // console.log( { box: { w: box.width, h: box.height }, bX, bY } )
    x -= ( g.m.x - g.lynchTunnel.cx ) * ( 1 - ( width / g.lynchTunnel.w ) ) * ( 1 - Math.cbrt( d ) )
    y -= ( g.m.y - g.lynchTunnel.cy ) * ( 1 - ( height / g.lynchTunnel.h ) ) * ( 1 - Math.cbrt( d ) )
    gsap.set( box, {
      pixi: {
        alpha: width / g.lynchTunnel.w,
        width,
        height,
        x,
        y,
      },
    } )
    g.lynchTunnel.stp[bx] += 125// Date.now()
  }
}

const startLynchTunnel = () => {
  g.lynchTunnel.tkr.start()
}

export { setLynchTunnel, startLynchTunnel }
