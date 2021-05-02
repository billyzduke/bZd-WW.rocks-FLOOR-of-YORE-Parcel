import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

import g from './glob'
import { addCSSRule, isNode } from './utils'
// eslint-disable-next-line import/no-cycle
import { hideNav } from './nav'

gsap.registerPlugin(MorphSVGPlugin)

const hideHelp = dur => {
  if (g.el.help && g.el.helpList && g.el.help.classList.contains('open') && !g.el.help.classList.contains('anim')) {
    g.el.help.classList.add('anim')
    gsap.to('#que_fill', {
      duration: dur,
      morphSVG: {
        shape: '#que_fill',
        origin: '15% 13%, 15% 27%',
      },
    })
    gsap.to('#que_stroke', {
      duration: dur,
      morphSVG: {
        shape: '#que_stroke',
        origin: '15% 13%, 15% 27%',
      },
    })
    gsap.set('#helpListW', {
      overflow: 'hidden',
    })
    gsap.to(g.el.helpList, {
      duration: dur,
      ease: 'power4.in',
      onComplete() {
        g.el.help.classList.remove('anim', 'open')
        if (g.el.helpList.classList.contains('mkOpen')) g.el.helpList.classList.remove('mkOpen')
      },
      translateX: '100%',
      translateY: 3,
    })
  }
}

const helpToggle = () => {
  if (g.el.header && g.el.help && !g.el.help.classList.contains('anim')) {
    if (g.el.help.classList.contains('open')) {
      hideHelp(2)
    } else {
      hideNav()
      g.el.help.classList.add('anim')
      gsap.to('#que_fill', {
        duration: 1,
        morphSVG: {
          shape: '#x_fill',
          origin: '15% 27%, 15% 13%',
        },
      })
      gsap.to('#que_stroke', {
        duration: 1,
        morphSVG: {
          shape: '#x_stroke',
          origin: '15% 27%, 15% 13%',
        },
      })
      gsap.set('#helpMeLawd', {
        height: '100%',
      })
      gsap.to('#helpList', {
        duration: 1,
        ease: 'power4.out',
        onComplete() {
          g.el.help.classList.add('open')
          g.el.help.classList.remove('anim')
          gsap.set('#helpListW', {
            overflow: 'visible',
          })
        },
        translateX: 40,
        translateY: 0,
      })
    }
  }
}

const mkToggle = m => {
  if (m.classList.contains('mkOpen')) {
    m.classList.remove('mkOpen')
    m.classList.add('mkClosed')
  } else {
    m.classList.remove('mkClosed')
    m.classList.add('mkOpen')
  }
}

const makisu = (mk, remNodes, n = 0) => {
  if (remNodes.length > 0) { // not listening to this if I don't provide an alternate return ?!?
    const thisNode = remNodes.shift()

    const mkN = {
      id: thisNode.id,
      nextN: n + 1,
      firstN: n === 0,
      animFold: `mkFold${!n ? 'First' : ''}`,
      animUnfold: `mkUnfold${!n ? 'First' : ''}`,
      nOpenWait: n * mk.time,
      nCloseWait: (mk.totalNodes - n - 1) * mk.time - mk.time,
    }
    mkN.lastN = mkN.nextN === mk.totalNodes
    mkN.oOpenWait = (mkN.lastN) ? mkN.nOpenWait + (mk.time * 3) : mkN.nextN * mk.time + (mk.time * 3)
    mkN.oCloseWait = (mkN.firstN) ? mkN.nCloseWait : ((mk.totalNodes - n - 2) * mk.time) + (mk.speed * 0.15)

    thisNode.classList.add('mkNode')
    const mkNode = g.document.createElement('div')
    mkNode.id = mkN.id
    thisNode.id = `mkNode${n}`
    mkNode.classList.add('mkNode')
    const mkMeat = g.document.createElement('div')
    mkMeat.classList.add('mkMeat')
    const mkOver = g.document.createElement('div')
    mkOver.id = `${mkNode.id}_over`
    mkOver.classList.add('mkOver')
    mkOver.style.background = mk.shading
    const mkBack = g.document.createElement('div')
    mkBack.classList.add('mkBack')
    mkMeat.appendChild(thisNode)
    mkMeat.appendChild(mkOver)
    mkMeat.appendChild(mkBack)
    mkNode.appendChild(mkMeat)
    addCSSRule(mk.css.sheet, `#${mk.id} #${mkN.id}`, `animation: ${mkN.animFold} 1ms linear 0s 1 normal forwards;`)
    addCSSRule(mk.css.sheet, `#${mk.id}.mkOpen #${mkN.id}`, `transform: rotateX(180deg); animation: ${mkN.animUnfold} ${mk.speed.toFixed(3)}s ease-in-out ${mkN.nOpenWait.toFixed(3)}s 1 normal forwards;`)
    addCSSRule(mk.css.sheet, `#${mk.id}.mkOpen #${mkOver.id}`, `animation: mkUnfoldOver ${(mk.speed * 0.45).toFixed(3)}s ease-in-out ${mkN.oOpenWait.toFixed(3)}s 1 normal forwards;`)
    addCSSRule(mk.css.sheet, `#${mk.id}.mkClosed #${mkN.id}`, `transform: rotateX(0deg); animation: ${mkN.animFold} ${(mk.speed * 0.66).toFixed(3)}s ease-in-out ${mkN.nCloseWait.toFixed(3)}s 1 normal forwards;`)
    addCSSRule(mk.css.sheet, `#${mk.id}.mkClosed #${mkOver.id}`, `animation: mkFoldOver ${(mk.speed * 0.2178).toFixed(3)}s ease-in-out ${mkN.oCloseWait.toFixed(3)}s 1 normal forwards;`)

    const childNode = makisu(mk, remNodes, mkN.nextN)
    if (isNode(childNode)) {
      mkNode.appendChild(childNode)
      return mkNode
    }
  } /* else {
    console.log(mk.css)
  } */
  return g.document.createElement('span')
}

const makeNodes = mkContent => {
  const mkWords = mkContent.split(' ')
  const mkLines = [ '' ]
  let mkL = 1
  mkWords.forEach((wrd, i) => {
    let useMax = 44 * 2
    if (typeof mkLines[mkL] === 'undefined') mkLines[mkL] = i ? '&oplus;' : ''
    if (wrd === '|') {
      mkL++
      mkLines[mkL] = '&nbsp;<br /><hr />'
      mkL++
    } else if (wrd === '\\') {
      mkL++
      mkLines[mkL] = ''
    } else {
      if (mkLines[mkL].match(/^&oplus;/)) useMax += 7
      if (mkLines[mkL].length + wrd.length > useMax) {
        mkL++
        mkLines[mkL] = ''
      }
      mkLines[mkL] += ` ${wrd}`
      if (!i) mkLines[mkL] = `<i>${wrd}</i>`
    }
  })
  mkLines.push('')
  const mkNodes = []
  mkLines.forEach(l => {
    const newNode = g.document.createElement('div')
    newNode.innerHTML = l
    mkNodes.push(newNode)
  })
  return mkNodes
}

const makisusan = () => {
  if (g.el.makisu && g.el.helpToggle && g.el.helpScreen && g.el.helpList) {
    g.el.makisu.forEach(m => {
      const mk = {
        id: m.id,
        speed: Number(m.getAttribute('data-mk-speed')), // Duration per element
        overlap: Number(m.getAttribute('data-mk-overlap')), // Fraction of speed (0-1)
        maxCharsPerLine: Number(m.getAttribute('data-mk-mx-chrs-per-line')),
        shading: m.getAttribute('data-mk-shading'),
        css: g.document.createElement('style'),
      }
      mk.css.appendChild(g.document.createTextNode('')) // Webkit Hack
      g.document.body.appendChild(mk.css)

      mk.time = mk.speed * (1 - mk.overlap)
      const mkListW = g.document.createElement('div')
      mkListW.classList.add('mkList')
      const [ mkTitle, mkContent ] = [ ...m.children ]
      const mkNodes = makeNodes(mkContent.innerHTML)
      mk.totalNodes = mkNodes.length
      mkTitle.classList.add('mkTitle')
      mkListW.appendChild(mkTitle)
      const mkRoot = g.document.createElement('div')
      mkRoot.classList.add('mkNode', 'mkRoot')
      mkRoot.id = `mk_${m.id}`
      mkNodes.forEach((_, id) => {
        mkNodes[id].id = `${mkRoot.id}_n${id}`
      })
      addCSSRule(mk.css.sheet, `#${mk.id}.mkOpen .mkRoot#${mkRoot.id}`, `animation: mkSwingOut ${(mk.totalNodes * mk.time * 1.4).toFixed(3)}s ease-in-out 0s 1 normal forwards;`)
      addCSSRule(mk.css.sheet, `#${mk.id}.mkClosed .mkRoot#${mkRoot.id}`, `animation: mkSwingIn ${(mk.totalNodes * mk.time * 1).toFixed(3)}s ease-in-out 0s 1 normal forwards;`)

      mkListW.appendChild(mkRoot)
      m.removeChild(m.children[0])
      m.appendChild(mkListW)
      m.addEventListener('click', () => mkToggle(m))

      const childNode = makisu(mk, mkNodes)
      if (isNode(childNode)) mkRoot.appendChild(childNode)
    })
    const editNodesI = []
    editNodesI[2] = [ 'Days of Yore', '<i>Days of Yore</i>' ]
    editNodesI[18] = [ 'next', '<i>next</i>' ]
    editNodesI[23] = [ 'most', '<i>most</i>' ]
    editNodesI.forEach((nRe, nI) => {
      const editNode = g.document.getElementById(`mkNode${nI}`)
      editNode.innerHTML = editNode.innerHTML.replace(nRe[0], nRe[1])
    })

    g.el.helpToggle.addEventListener('click', () => helpToggle())
    g.el.helpScreen.addEventListener('click', () => helpToggle())
  }
}

export { hideHelp, makisusan }
