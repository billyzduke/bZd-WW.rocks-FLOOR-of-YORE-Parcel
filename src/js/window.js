/* eslint-disable no-undef */

const getMouseMove = e => {
  const mm = { x: 0, y: 0 }
  if (e) {
    let eDoc, doc, body
    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (The entire following if block is only to support old IE)
    if (e.pageX == null && e.clientX != null) {
      eDoc = (e.target && e.target.ownerDocument) || document
      doc = eDoc.documentElement
      body = eDoc.body
      e.pageX = e.clientX
        + ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0)
        - ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
      e.pageY = e.clientY
        + ((doc && doc.scrollTop) || (body && body.scrollTop) || 0)
        - ((doc && doc.clientTop) || (body && body.clientTop) || 0)
    }
    mm.x = e.pageX
    mm.y = e.pageY
  }
  return mm
}

const getW = (cyOff = 0) => {
  const w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth
  const cx = w / 2

  const h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight
  const cy = h / 2
  cyOff += cy

  // eslint-disable-next-line object-curly-newline
  return { w, h, cx, cy, cyOff }
}

export { getW, getMouseMove }

