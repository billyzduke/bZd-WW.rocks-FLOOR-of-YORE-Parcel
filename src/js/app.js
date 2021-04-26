import { g } from './glob'
import { getW, getMouseMove } from './window'
import htmEl from './el'
import { revealNav, hideNav, toggleShopNav } from './nav'
import { makisusan } from './help'
import { moveLionEyes } from './lion-head'
import { setGrove } from './grove'
import { setLion } from './lion'
import { setTitles } from './titles'
import { cyOffPx } from './bauble-layer-01'
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
    ...htmEl([ 'header' ], 'tag'),
    ...htmEl('.bW', 'q', true),
    ...htmEl('.cw', 'q', true),
    ...htmEl('.makisu', 'q', true),
    ...htmEl('.tpTitle', 'q', true),
  }
  el.bL = []
  g.el = el

  if (el.header && el.home) {
    el.home.addEventListener('mouseenter', () => revealNav(el))
    el.header.addEventListener('mouseleave', () => hideNav(el))
  }
  if (el.shopNavBar && el.shopNavItem) {
    el.shopNavItem.addEventListener('click', () => toggleShopNav(el))
  }
  if (el.header && el.help && el.helpList && el.helpScreen && el.helpToggle && el.makisu) {
    el.helpToggle.style.transition = 'all 2.5s ease-in-out'
    makisusan(el)
  }

  // eslint-disable-next-line object-curly-newline
  g.w = getW(cyOffPx)
  g.crtns = { cx: g.w.cx, cy: g.w.cyOff }

  if (el.lolf01 && el.lolf02) setLion(w, el, scene)
  if (el.ggrove) setGrove(w, el)
  if (el.tpTitle) setTitles(w, el)
  if (el.cw) setCurtains(w, el)
  if (el.yoreFloor) setFloor(w, el)
  const bronzeVid = el.bronzeCauldron ? setBronze(w, el) : undefined
  const dirtVid = el.bronzeCauldron ? setDirt(el) : undefined
  if (el.drWorm && el.wormSignScreen) setShaiHulud()

  if (el.sceneSkipper) setSceneSkipper(el, scene)

  setScene(el, scene)
}

const getM = () => {
  g.m = getMouseMove(window.event)
  moveLionEyes(m, el, scene)
}

/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', loadApp)
  document.onmousemove = getM
  loadApp()
})
/* eslint-enable no-undef */
