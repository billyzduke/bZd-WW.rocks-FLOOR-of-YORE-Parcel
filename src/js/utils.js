const isNode = o => (typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string')

const addCSSRule = (sheet, selector, rules) => {
  if ('insertRule' in sheet) {
    sheet.insertRule(`${selector}{${rules}}`)
  } else if ('addRule' in sheet) {
    sheet.addRule(selector, rules)
  }
}

export { addCSSRule, isNode }
