import assUnderCarriageF from 'url:/src/img/future/underCarriageF.jpg'
import g from './glob'
import htmEl from './el'

const setX3d = () => {
  g.x3d = {
    el: {
      ...htmEl([
        'underCarriageF',
      ]),
    }
  }

  g.el.x3d.width = `${g.main.w}px`
  g.el.x3d.height = `${g.main.h}px`

  if (g.x3d.el.underCarriageF) g.x3d.el.underCarriageF.setAttribute('url', assUnderCarriageF)

  require('x3dom')
}

export { setX3d }
