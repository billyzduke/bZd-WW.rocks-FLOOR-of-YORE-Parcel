import { hideHelp } from '/src/header/help/_'

import g from '/src/shared/_'

const revealNav = () => {
  if ( g.el.header ) g.el.header.classList.remove( 'navHidden' )
  hideHelp( 0.5 )
}

const hideNav = () => {
  if ( g.el.header ) g.el.header.classList.add( 'navHidden' )
}

const toggleShopNav = el => {
  if ( g.el.shopNavItem && g.el.shopNavBar ) {
    if ( g.el.shopNavItem.classList.contains( 'hovered' ) && g.el.shopNavBar.classList.contains( 'open' ) ) {
      g.el.shopNavItem.classList.remove( 'hovered' )
      g.el.shopNavBar.classList.remove( 'open' )
    } else {
      g.el.shopNavItem.classList.add( 'hovered' )
      g.el.shopNavBar.classList.add( 'open' )
    }
  }
}

export { revealNav, hideNav, toggleShopNav }
