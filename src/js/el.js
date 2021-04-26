/* eslint-disable no-undef */
export const htmEl = (find, findByType = 'id', returnMulti = false) => {
  if (!find || (typeof find !== 'string' && !Array.isArray(find))) return null
  const labels = typeof find === 'string' ? [ find ] : find
  const el = {}
  labels.forEach(lbl => {
    // eslint-disable-next-line no-useless-escape
    const keyFromSelector = lbl.split(/[#\.\s]/).pop()
    switch (findByType) {
      case 'q':
        el[keyFromSelector] = returnMulti ? document.querySelectorAll(lbl) : document.querySelector(lbl)
        break
      case 'tag':
        el[lbl] = returnMulti ? document.getElementsByTagName(lbl) : document.getElementsByTagName(lbl)[0]
        break
      case 'id':
      default:
        el[lbl] = document.getElementById(lbl)
    }
  })
  // console.log(el)
  return el
}

export default htmEl
