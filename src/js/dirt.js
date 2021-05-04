// eslint-disable-next-line import/no-extraneous-dependencies
import videojs from 'video.js'

import g from './glob'

const setDirt = () => {
  if (g.el.dirtVidWrapper && g.el.dirtOnTheGround) {
    g.el.dirtVidWrapper.style.height = `${g.main.h}px`
    g.el.dirtVidWrapper.style.width = `${g.w.w / g.main.scale}px`
    g.el.dirtVidWrapper.style.opacity = 1
    g.el.dirtOnTheGround.style.minHeight = g.el.dirtVidWrapper.style.height
    g.el.dirtOnTheGround.style.minWidth = g.el.dirtVidWrapper.style.width
    g.el.dirtOnTheGround.style.objectFit = 'cover'
    g.el.dirtOnTheGround.style.position = 'absolute'
    return videojs('dirtOnTheGround')
  }
}

export { setDirt }
