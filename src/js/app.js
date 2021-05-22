import assBodyBackground from 'url:/src/img/WWineBoxBG.jpg'
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
import { setShaiHulud } from './shai-hulud'
import { setScene, setSceneSkipper } from './scene'
import { resetCtrRingPos1 } from './baubles/layer-01'
import { isSet } from './utils'

// import '~/node_modules/modern-css-reset/dist/reset.min.css' // prefers-reduced-motion settings has to be commented out
// eslint-disable-next-line import/no-absolute-path, import/no-unresolved
import '/src/scss/app.scss'

const loadApp = () => {
  if (g.document.body.classList.contains('dev') && !isSet(g.dev)) g.dev = true
  // All the DOM elements we are going to need to directly manipulate later on
  const el = {
    ...htmEl([
      'binary',
      'binaryScroll',
      'bloodSplashL',
      'bloodSplashR',
      'bronzeCauldron',
      'bronzeVidWrapper',
      'ctrRing',
      'deLorean',
      'dirtOnTheGround',
      'dirtVidWrapper',
      'discoWall',
      'drWorm',
      'excWrapper',
      'flux',
      'fluxButton',
      'fluxDisplay',
      'fluxDisplay10',
      'fluxDisplay01',
      'fluxEchoAxisC',
      'fluxEchoAxisL',
      'fluxEchoAxisR',
      'foetusCryL',
      'foetusCryR',
      'foetusEyeL',
      'foetusEyeR',
      'future',
      'gemGuy',
      'ggrove',
      'heartChakra',
      'help',
      'helpList',
      'helpScreen',
      'helpToggle',
      'home',
      'jungle',
      'jungSaganL',
      'jungSaganR',
      'jungL',
      'jungR',
      'lightningRodsWrapper',
      'lionHead',
      'lolf01',
      'lolf02',
      'model',
      'owlBeak',
      'owlLaser',
      'phasingRainbow',
      'ramIcon',
      'ramIconHornLeft',
      'ramIconHornRight',
      'rosetta',
      'sayCeren',
      'saySinan',
      'sceneSkipper',
      'subSceneSkippers',
      'shopNavBar',
      'shopNavItem',
      'spiralOutPath',
      'theLion',
      'theOwl',
      'theOwlIsNotWhatItSeems',
      'theRam',
      'thirdEyeClosed',
      'threshold',
      'wombL',
      'wombR',
      'wormSignScreen',
      'yoreFloor',
    ]),
    ...htmEl([
      'html',
      'body',
      'header',
      'main',
    ], 'tag'),
    ...htmEl('.cw', 'q', true),
    ...htmEl('.makisu', 'q', true),
    ...htmEl('.tpTitle', 'q', true),
    ...htmEl('.mkNode', 'q', true),
    ...htmEl('.smoke', 'q', true),
    ...htmEl('.wormRingSegment', 'q', true),
    ...htmEl('.folkloreFinalForm', 'q', false),
    ...htmEl('.handEyeWrapper', 'q', false),
  }
  el.bL = []
  g.el = el
  g.w = getW(g.cyOffPx)

  if (g.el.main) {
    g.main.scale = g.w.h / Number(g.window.getComputedStyle(g.el.main, null).getPropertyValue('height').slice(0, -2))
    g.el.main.style.transform = `scale(${g.main.scale})`
    g.main.w = g.w.w / g.main.scale
    g.el.main.style.width = `${g.main.w}px`
    g.main.h = g.w.h / g.main.scale
    g.main.cx = g.main.w / 2
    g.main.cy = g.main.h / 2
    g.main.cyOff = g.main.cy + g.cyOffPx
  }

  if (g.el.header && g.el.home) {
    g.el.home.addEventListener('mouseenter', () => revealNav())
    g.el.header.addEventListener('mouseleave', () => hideNav())
  }
  if (g.el.shopNavBar && g.el.shopNavItem) g.el.shopNavItem.addEventListener('click', () => toggleShopNav())
  if (g.el.helpToggle) g.el.helpToggle.style.transition = 'all 2.5s ease-in-out'

  g.crtns = { h: g.main.h, cx: g.main.cx, cy: g.main.cyOff - (g.cyOffPx * 1.5) }

  setLion()
  setGrove()
  setTitles()
  setCurtains()
  setFloor()

  if (g.scene.current >= 3) resetCtrRingPos1()

  if (el.drWorm && g.el.wormSignScreen) setShaiHulud()

  if (g.dev && g.el.sceneSkipper) setSceneSkipper()

  if (!g.scene.current) setScene()

  if (g.el.body) {
    g.el.body.style.backgroundImage = `url(${assBodyBackground})`
    g.el.body.style.backgroundColor = `rgb(118, 122, 131)`
  }

  return true
}

const initApp = () => {
  const loaded = loadApp()
  if (loaded) makisusan()
}

const getM = () => {
  if (g.el.main) g.m = getMouseMove(g.window.event, g.el.main.getBoundingClientRect())
  if (g.el.phasingRainbow && g.scene.current >= 8 && g.lion.eyes.active) moveLionEyes()
}

// eslint-disable-next-line no-undef
g.document = document
g.document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-undef
  g.window = window
  g.window.addEventListener('resize', loadApp)
  g.document.onmousemove = getM
  initApp()
})
