// eslint-disable-next-line import/no-extraneous-dependencies
import videojs from 'video.js'

import g from '/src/js/glob'

const setBronze = () => {
  if ( g.el.bronzeVidWrapper && g.el.bronzeCauldron ) {
    g.el.bronzeVidWrapper.style.height = `${g.main.h}px`
    g.el.bronzeVidWrapper.style.width = `${g.w.w / g.main.scale}px`
    g.el.bronzeVidWrapper.style.opacity = 1
    g.el.bronzeCauldron.style.maxHeight = g.el.bronzeCauldron.style.height = g.el.bronzeVidWrapper.style.height
    g.el.bronzeCauldron.style.minWidth = g.el.bronzeCauldron.style.width = g.el.bronzeVidWrapper.style.width
    g.el.bronzeCauldron.style.objectFit = 'fill'
    g.el.bronzeCauldron.style.position = 'absolute'
    return videojs( 'bronzeCauldron' )
  }
}

export { setBronze }
