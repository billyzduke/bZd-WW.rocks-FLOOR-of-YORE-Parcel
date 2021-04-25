const globalMouseMove = e => {
  let eDoc; let doc; let
    body
  e = e || window.event // IE-ism
  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (The entire following if block is only to support old IE)
  if (e.pageX == null && e.clientX != null) {
    eDoc = (e.target && e.target.ownerDocument) || document
    doc = eDoc.documentElement
    body = eDoc.body
    e.pageX = e.clientX
      + (doc && doc.scrollLeft || body && body.scrollLeft || 0)
      - (doc && doc.clientLeft || body && body.clientLeft || 0)
    e.pageY = e.clientY
      + (doc && doc.scrollTop || body && body.scrollTop || 0)
      - (doc && doc.clientTop || body && body.clientTop || 0)
  }
  m.x = e.pageX
  m.y = e.pageY
  if (el.phasingRainbow && scene >= 8 && lionEyesActive) {
    const thirdEyeDeets = el.phasingRainbow.getBoundingClientRect()
    lionEyesQuickSetter({
      translateX: gsap.utils.clamp(-16, 12.44, -(thirdEyeDeets.x + (thirdEyeDeets.width / 2) - m.x) / 54),
      translateY: gsap.utils.clamp(-7, 9.55, -(thirdEyeDeets.y + 50 - m.y) / 42),
    })
  }
}

const w = () => {
  w.w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth
  w.cx = w.w / 2

  w.h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight
  w.cy = w.h / 2
  cyOff += w.cy
}

export { w as default, globalMouseMove }

