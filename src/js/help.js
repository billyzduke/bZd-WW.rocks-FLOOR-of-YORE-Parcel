import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

import { addCSSRule, isNode } from './utils'
// eslint-disable-next-line import/no-cycle
import { hideNav } from './nav'

gsap.registerPlugin(MorphSVGPlugin)

const hideHelp = (el, dur) => {
  if (el.help && el.helpList && el.help.classList.contains('open') && !el.help.classList.contains('anim')) {
    el.help.classList.add('anim')
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
      pointerEvents: 'auto',
    })
    gsap.to(el.helpList, {
      duration: dur,
      ease: 'power4.in',
      onComplete() {
        el.help.classList.remove('anim', 'open')
        if (el.helpList.classList.contains('mkOpen')) el.helpList.classList.remove('mkOpen')
      },
      translateX: '100%',
      translateY: 3,
    })
  }
}

const helpToggle = el => {
  if (el.header && el.help && !el.help.classList.contains('anim')) {
    if (el.help.classList.contains('open')) {
      hideHelp(el, 2)
    } else {
      hideNav(el)
      el.help.classList.add('anim')
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
          el.help.classList.add('open')
          el.help.classList.remove('anim')
          gsap.set('#helpListW', {
            overflow: 'visible',
            pointerEvents: 'none',
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

const makisu = (el, mk, remNodes, n = 0) => {
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
    const mkNode = document.createElement('div')
    mkNode.id = mkN.id
    thisNode.id = `mkNode${n}`
    mkNode.classList.add('mkNode')
    const mkMeat = document.createElement('div')
    mkMeat.classList.add('mkMeat')
    const mkOver = document.createElement('div')
    mkOver.id = `${mkNode.id}_over`
    mkOver.classList.add('mkOver')
    mkOver.style.background = mk.shading
    const mkBack = document.createElement('div')
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

    const childNode = makisu(el, mk, remNodes, mkN.nextN)
    if (isNode(childNode)) {
      mkNode.appendChild(childNode)
      return mkNode
    }
  } /* else {
    console.log(mk.css)
  } */
  return document.createElement('span')
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
    const newNode = document.createElement('div')
    newNode.innerHTML = l
    mkNodes.push(newNode)
  })
  return mkNodes
}

const makisusan = el => {
  if (el.makisu && el.helpToggle && el.helpScreen && el.helpList) {
    el.makisu.forEach((m, i) => {
      const mk = {
        id: m.id,
        speed: Number(m.getAttribute('data-mk-speed')), // Duration per element
        overlap: Number(m.getAttribute('data-mk-overlap')), // Fraction of speed (0-1)
        maxCharsPerLine: Number(m.getAttribute('data-mk-mx-chrs-per-line')),
        shading: m.getAttribute('data-mk-shading'),
        css: document.createElement('style'),
      }
      mk.css.appendChild(document.createTextNode('')) // Webkit Hack
      document.body.appendChild(mk.css)

      mk.time = mk.speed * (1 - mk.overlap)
      const mkListW = document.createElement('div')
      mkListW.classList.add('mkList')
      const [ mkTitle, mkContent ] = [ ...m.children ]
      const mkNodes = makeNodes(mkContent.innerHTML)
      mk.totalNodes = mkNodes.length
      mkTitle.classList.add('mkTitle')
      mkListW.appendChild(mkTitle)
      const mkRoot = document.createElement('div')
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

      const childNode = makisu(el, mk, mkNodes)
      if (isNode(childNode)) mkRoot.appendChild(childNode)
    })
    const editNodesI = []
    editNodesI[2] = [ 'Days of Yore', '<i>Days of Yore</i>' ]
    editNodesI[18] = [ 'next', '<i>next</i>' ]
    editNodesI[23] = [ 'most', '<i>most</i>' ]
    editNodesI.forEach((nRe, nI) => {
      const editNode = document.getElementById(`mkNode${nI}`)
      editNode.innerHTML = editNode.innerHTML.replace(nRe[0], nRe[1])
    })

    el.helpToggle.addEventListener('click', () => helpToggle(el))
    el.helpScreen.addEventListener('click', () => helpToggle(el))
  }
}

export { hideHelp, makisusan }
