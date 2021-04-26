import g from './glob'
import { getW, getMouseMove } from './window'
import htmEl from './el'
import { revealNav, hideNav, toggleShopNav } from './nav'
import { makisusan } from './help'
import { moveLionEyes } from './lion-head'
import { setGrove } from './grove'
import { setLion } from './lion'
import { setTitles } from './titles'
import { setCurtains } from './curtains'
import { setFloor } from './floor'
import { setBronze } from './bronze'
import { setDirt } from './dirt'
import { setShaiHulud } from './shai-hulud'
import { setScene, setSceneSkipper } from './scene'

// import '~/node_modules/modern-css-reset/dist/reset.min.css' // prefers-reduced-motion settings has to be commented out
// eslint-disable-next-line import/no-absolute-path, import/no-unresolved
import '/src/scss/app.scss'

const loadApp = () => {
  const el = {
    ...htmEl([
      'binary',
      'binaryScroll',
      'bloodSplashL',
      'bloodSplashR',
      'bronzeCauldron',
      'bronzeVidWrapper',
      'ctrRing',
      'dirtOnTheGround',
      'discoWall',
      'drWorm',
      'excWrapper',
      'foetusEyeL',
      'foetusEyeR',
      'gemGuy',
      'ggrove',
      'handEyeLeft',
      'handEyeRight',
      'help',
      'helpList',
      'helpScreen',
      'helpToggle',
      'home',
      'lolf01',
      'lolf02',
      'owlLaser',
      'phasingRainbow',
      'ramIconHornLeft',
      'ramIconHornRight',
      'rosetta',
      'sceneSkipper',
      'shopNavBar',
      'shopNavItem',
      'spiralOutPath',
      'theLion',
      'wormSignScreen',
      'yoreFloor',
    ]),
    ...htmEl([ 'body', 'header' ], 'tag'),
    ...htmEl('.bW', 'q', true),
    ...htmEl('.cw', 'q', true),
    ...htmEl('.makisu', 'q', true),
    ...htmEl('.tpTitle', 'q', true),
  }
  el.bL = []
  g.el = el

  if (g.el.header && g.el.home) {
    g.el.home.addEventListener('mouseenter', () => revealNav())
    g.el.header.addEventListener('mouseleave', () => hideNav())
  }
  if (g.el.shopNavBar && g.el.shopNavItem) g.el.shopNavItem.addEventListener('click', () => toggleShopNav())
  if (g.el.helpToggle) g.el.helpToggle.style.transition = 'all 2.5s ease-in-out'

  g.w = getW(g.w.cyOffPx)
  g.crtns = { cx: g.w.cx, cy: g.w.cyOff }

  makisusan()
  setLion()
  setGrove()
  setTitles()
  setCurtains()
  setFloor()
  g.vid.bronze = g.el.bronzeCauldron ? setBronze() : undefined
  g.vid.dirt = g.el.bronzeCauldron ? setDirt() : undefined
  if (el.drWorm && g.el.wormSignScreen) setShaiHulud()

  if (el.sceneSkipper) setSceneSkipper()

  setScene()
}

const getM = () => {
  g.m = getMouseMove(g.window.event)
  moveLionEyes()
}

// eslint-disable-next-line no-undef
g.document = document
g.document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-undef
  g.window = window
  g.window.addEventListener('resize', loadApp)
  g.document.onmousemove = getM
  loadApp()
})
