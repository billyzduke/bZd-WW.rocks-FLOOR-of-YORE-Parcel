import { globalMouseMove } from './window'
import htmEl from './el'
import { revealNav, hideNav, toggleShopNav } from './nav'
import { makisusan } from './help'

// import '~/node_modules/modern-css-reset/dist/reset.min.css' // prefers-reduced-motion settings has to be commented out
import '/src/scss/app.scss'

const loadApp = () => {
  const el = {
    ...htmEl([
      'help',
      'helpList',
      'helpScreen',
      'helpToggle',
      'home',
      'shopNavItem',
      'shopNavBar',
    ]),
    ...htmEl([ 'head', 'header' ], 'tag'),
    ...htmEl('.makisu', 'q', true),
  }

  if (el.header && el.home) {
    el.home.addEventListener('mouseenter', () => revealNav(el))
    el.header.addEventListener('mouseleave', () => hideNav(el))
  }
  if (el.shopNavItem && el.shopNavBar) {
    el.shopNavItem.addEventListener('click', () => toggleShopNav(el))
  }
  if (el.head && el.makisu) {
    el.helpToggle.style.transition = 'all 2.5s ease-in-out'
    makisusan(el)
  }
}

/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', loadApp)
  document.onmousemove = globalMouseMove
  loadApp()
})
/* eslint-enable no-undef */
