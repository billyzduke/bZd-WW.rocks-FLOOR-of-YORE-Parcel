import g from './glob'

const setGrove = () => {
  if (g.el.ggrove) {
    console.log(g.main)
    const groveW = Math.floor(g.main.h * 2.1574)
    g.el.ggrove.width = groveW
    g.el.ggrove.style.width = `${groveW}px !important`
    g.el.ggrove.style.marginLeft = `${(g.main.w - groveW) / 2}px`
  }
}

export { setGrove }
