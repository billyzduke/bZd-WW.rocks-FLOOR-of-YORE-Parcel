import { hideHelp } from './help'

const revealNav = el => {
  if (el.header) el.header.classList.remove('navHidden')
  hideHelp(el, 0.5)
}

const hideNav = el => {
  if (el.header) el.header.classList.add('navHidden')
}

const toggleShopNav = el => {
  if (el.shopNavItem && el.shopNavBar) {
    if (el.shopNavItem.classList.contains('hovered') && el.shopNavBar.classList.contains('open')) {
      el.shopNavItemi.classList.remove('hovered')
      el.shopNavBar.classList.remove('open')
    } else {
      el.shopNavItem.classList.add('hovered')
      el.shopNavBar.classList.add('open')
    }
  }
}

export { revealNav, hideNav, toggleShopNav }
