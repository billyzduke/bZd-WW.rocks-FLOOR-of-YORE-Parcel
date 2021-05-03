// eslint-disable-next-line import/no-extraneous-dependencies
import videojs from 'video.js'

import g from './glob'

const setDirt = () => {
  if (g.el.dirtVidWrapper && g.el.dirtOnTheGround) {
    g.el.dirtVidWrapper.style.height = `${g.main.h}px`
    g.el.dirtVidWrapper.style.width = `${g.main.w}px`
    g.el.dirtOnTheGround.style.minHeight = g.el.dirtVidWrapper.style.height
    g.el.dirtOnTheGround.style.minWidth = g.el.dirtVidWrapper.style.width
    g.el.dirtOnTheGround.style.objectFit = 'cover'
    g.el.dirtOnTheGround.style.position = 'absolute'
    return videojs('dirtOnTheGround')
  }
}

export { setDirt }
