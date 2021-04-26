import g from './glob'

const setGrove = () => {
  if (g.el.ggrove) {
    const groveW = Math.floor(g.w.h * 2.1574)
    // console.log({ gww: g.w.w, groveW, marginLeft: (g.w.w - groveW) / 2 })
    g.el.ggrove.width = groveW
    g.el.ggrove.style.width = `${groveW}px !important`
    g.el.ggrove.style.marginLeft = `${(g.w.w - groveW) / 2}px`
  }
}

export { setGrove }
