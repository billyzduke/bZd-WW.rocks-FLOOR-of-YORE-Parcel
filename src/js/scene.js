import g from './glob'
import {
  devLog, isFunction, padStr, setAddOn, upperCaseFirstLetter,
} from './utils'
import { scene00, setScene00 } from './scenes/scene-00'
import { scene01, setScene01 } from './scenes/scene-01'
import { scene02, setScene02 } from './scenes/scene-02'
import { scene03, setScene03 } from './scenes/scene-03'
import { scene04, setScene04 } from './scenes/scene-04'
import { scene05, setScene05 } from './scenes/scene-05'
import { scene06, setScene06 } from './scenes/scene-06'
import { scene07, setScene07 } from './scenes/scene-07'
import { scene08, setScene08 } from './scenes/scene-08'
import { scene09, setScene09 } from './scenes/scene-09'
import { scene10, setScene10 } from './scenes/scene-10'
import { scene11, setScene11 } from './scenes/scene-11'
import { scene12, setScene12 } from './scenes/scene-12'
import { rollEmOut } from './owl-ram'

const scenes = [
  scene00,
  scene01,
  scene02,
  scene03,
  scene04,
  scene05,
  scene06,
  scene07,
  scene08,
  scene09,
  scene10,
  scene11,
  scene12,
]
scenes.forEach((_, s) => {
  g.scene.forCleanUp[s] = {}
})

const setScenes = [
  () => setScene00(0, 1),
  () => setScene01(1, 2),
  () => setScene02(2, 3),
  () => setScene03(3, 4),
  () => setScene04(4, 5),
  () => setScene05(5, 6),
  () => setScene06(6, 7),
  () => setScene07(7, 8),
  () => setScene08(8, 9),
  () => setScene09(9, 10),
  () => setScene10(10, 11),
  () => setScene11(11, 12),
  () => setScene12(12, 13),
]

const cleanScene = s => {
  const cleanUps = Object.entries(g.scene.forCleanUp[s])
  if (cleanUps.length) {
    devLog(`running ${cleanUps.length} cleanUp${cleanUps.length !== 1 ? 's' : ''} for scene ${s}`)
    cleanUps.forEach(([ c, u ], i) => {
      if (isFunction(u)) {
        const uu = u()
        if (typeof uu === 'boolean' && uu) {
          devLog(`${i + 1} - ${c}: this pipe is clean`)
        } else devLog(`${i + 1} - ${c}: pipe cleaning function failed, returned:`, uu)
      } else devLog(`${i + 1} - ${c}: pipe cleaning failed: no function`, u)
    })
    g.scene.forCleanUp[s] = {}
  }
  return true
}

const setScene = (toScene = 0) => {
  g.scene.action = 'set'
  if (!toScene || toScene === g.scene.current + 1) {
    const parentScene = `scene${g.scene.current}`
    if (g.subScene[parentScene] && g.scene.skip.ff) {
      Object.keys(g.subScene[parentScene]).forEach(subScene => {
        if (subScene !== 'ss' && g.subScene[parentScene][subScene].progress !== 'complete') {
          skipSubScene(g.scene.current, subScene)
          return true
        }
      })
    }
    if (!g.subScene[parentScene] || g.subScene[parentScene].ss.allComplete) {
      if (setScenes[toScene]) {
        devLog(`scene ${toScene} ${g.scene.action} started: ${scenes[toScene]}`)
        let prevSceneCleaned = false
        if (toScene) {
          prevSceneCleaned = cleanScene(g.scene.current)
          devLog({ prevSceneCleaned })
        } else {
          devLog({ prevSceneCleaned })
          prevSceneCleaned = true
        }
        if (prevSceneCleaned) {
          if (toScene >= g.scene.skip.target) {
            g.scene.skip.ff = 0
            g.tL.yore.timeScale(1)
          } else {
            g.scene.action = 'skip'
          }
          const nextSceneSet = setScenes[toScene]()
          devLog({ nextSceneSet })
          if (nextSceneSet) {
            g.scene.current = toScene
            g.scene.setting = 0
            devLog(`scene ${g.scene.current} ${g.scene.action} complete: ${scenes[g.scene.current]}`, g)
            setSceneSkipper()
            return true
          }
          devLog(`a problem occurred while attempting to ${g.scene.action} scene ${toScene}`)
        } else devLog(`a problem occurred while attempting to cleanUp scene ${toScene}`)
      } else devLog(`invalid scene ${g.scene.action} attempted: scene ${toScene} does not exist`)
    }
  } else if (toScene !== g.scene.current) {
    // We're gonna ignore calls to change a scene to itself and not throw errors... Event listeners, it turns out, can accumulate on a single event, esp when using anon funcs
    devLog(`invalid scene ${g.scene.action} attempted: current scene ${g.scene.current} cannot be ${g.scene.action} to target scene ${toScene}`)
  }
  return false
}

const handleOtherTriggers = (parentScene, subScene, on) => {
  const otherTriggers = g.document.querySelectorAll(`.${parentScene}.subSceneTrigger:not(.${subScene})`)
  otherTriggers.forEach(ot => {
    if (on) ot.classList.add('wayLaid')
    else ot.classList.remove('wayLaid')
  })
}

const deActivateSubScene = (parentScene, subScene) => {
  g.subScene[parentScene][subScene].active = false
  devLog(`${parentScene} subScene ${subScene} de-activated`)
  g.subScene[parentScene].ss.active = false
  devLog(`${parentScene} all subScenes de-activated`)
  handleOtherTriggers(parentScene, subScene, false)
  killSkipper(parentScene, subScene)
  let allComplete = true
  let skipAnother = true
  Object.keys(g.subScene[parentScene]).forEach(ss => {
    if (ss !== 'ss' && g.subScene[parentScene][ss].progress !== 'complete') allComplete = false
  })
  devLog(g.scene.skip.ff)
  if (allComplete) {
    g.subScene[parentScene].ss.allComplete = true
    if (g.scene.skip.ff) setScene(g.scene.current + 1)
  } else if (g.scene.skip.ff) {
    Object.keys(g.subScene[parentScene]).forEach(ss => {
      if (ss !== 'ss' && g.subScene[parentScene][ss].progress !== 'complete' && skipAnother) {
        skipSubScene(g.scene.current, ss)
        skipAnother = false
      }
    })
  }
}

const subSceneProgress = (parentScene, subScene, progression) => {
  g.subScene[parentScene][subScene].progress = progression
  devLog(`${parentScene} subScene ${subScene} progress: ${g.subScene[parentScene][subScene].progress}`)
  if (progression === 'complete') {
    g.subScene[parentScene][subScene].ff = 0
    deActivateSubScene(parentScene, subScene)
  }
}

const setSubScenes = (scene, subScenes = []) => {
  const parentScene = `scene${padStr(scene)}`
  if (!g.subScene[parentScene]) g.subScene[parentScene] = { ss: { active: false, forCleanUp: {}, allComplete: false } }
  subScenes.forEach(subScene => {
    g.subScene[parentScene][subScene] = { active: false, ff: 0 }
    subSceneProgress(parentScene, subScene, 'set')
  })
  if (g.subScene[parentScene]) setSubSceneSkippers(scene)
}

const activateSubScene = (parentScene, subScene, progression) => {
  g.subScene[parentScene].ss.active = true
  devLog(`${parentScene} any subScene activated`)
  g.subScene[parentScene][subScene].active = true
  devLog(`${parentScene} subScene ${subScene} activated`)
  handleOtherTriggers(parentScene, subScene, true)
  killSkipper(parentScene, subScene)
  subSceneProgress(parentScene, subScene, progression)
}

const skipToScene = (toScene, e) => {
  e.target.blur()
  e.target.style.pointerEvents = 'none'
  g.scene.skip.ff = 0.1
  g.tL.yore.timeScale(1 / g.scene.skip.ff)
  g.scene.skip.target = Number(toScene)
  setScene(g.scene.current + 1)
  setTimeout(() => {
    e.target.style.pointerEvents = 'auto'
  }, 2500)
}

const setSceneSkipper = () => {
  if (g.dev) {
    if (g.el.sceneSkipper && !g.el.sceneSkipper.options.length) {
      scenes.forEach((s, i) => {
        const ssOption = g.document.createElement('option')
        ssOption.value = i
        ssOption.innerHTML = `${i}: ${s}`
        if (i < 1 || i < g.scene.current + 2 || i < g.scene.skip.target + 1) ssOption.disabled = true
        g.el.sceneSkipper.add(ssOption)
      })
      g.el.sceneSkipper.value = 0
      g.el.sceneSkipper.addEventListener('change', e => skipToScene(g.el.sceneSkipper.value, e))
    } else {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (let i in g.el.sceneSkipper.options) {
        i = Number(i) // it's not an array, so...
        if (Number.isInteger(i)) {
          if (i === g.scene.current) {
            g.el.sceneSkipper.value = i
          }
          if (i < 1 || i < g.scene.current + 2 || i < g.scene.skip.target + 1) g.el.sceneSkipper.options[i].disabled = true
        }
      }
    }
  } else {
    if (g.el.sceneSkipper && g.el.sceneSkipper.parentNode) {
      g.el.sceneSkipper.parentNode.removeChild(g.el.sceneSkipper)
      g.el.sceneSkipper = undefined
    }
    if (g.el.subSceneSkipper && g.el.subSceneSkipper.parentNode) {
      g.el.subSceneSkipper.parentNode.removeChild(g.el.subSceneSkipper)
      g.el.subSceneSkipper = undefined
    }
  }
}

const setSubSceneSkippers = scene => {
  if (scene && g.dev) {
    const parentScene = `scene${padStr(scene)}`
    if (g.el.subSceneSkippers.hasChildNodes()) {
      [ ...g.el.subSceneSkippers.children ].forEach(ssSk => {
        ssSk.parentNode.removeChild(ssSk)
      })
    }
    if (g.el.subSceneSkippers && g.subScene[parentScene]) {
      Object.keys(g.subScene[parentScene]).forEach(subScene => {
        if (subScene !== 'ss') {
          const ss = `ss${upperCaseFirstLetter(subScene)}`
          const skipButton = g.document.createElement('input')
          skipButton.type = 'checkbox'
          skipButton.id = ss
          skipButton.value = subScene
          skipButton.classList.add('onOffSwitch')
          const skipLabel = g.document.createElement('label')
          skipLabel.classList.add('onOffWrapper')
          const skipSpan = g.document.createElement('span')
          skipSpan.classList.add('onOffLabel')
          skipSpan.innerHTML = subScene
          skipSpan.for = subScene
          skipLabel.appendChild(skipButton)
          skipLabel.appendChild(skipSpan)
          g.el.subSceneSkippers.appendChild(skipLabel)
          g.scene.forCleanUp[scene][ss] = setAddOn(`#${ss}`, 'click', () => skipSubScene(scene, subScene))
        }
      })
    }
  }
}

const cleanSkipper = (scene, ss) => {
  if (isFunction(g.scene.forCleanUp[scene][ss])) {
    g.scene.forCleanUp[scene][ss]()
    g.scene.forCleanUp[scene][ss] = undefined
  }
}

const skipSubScene = (scene, subScene) => {
  const parentScene = `scene${padStr(scene)}`
  devLog(`skipping ${parentScene} subScene ${subScene}`)
  const ss = `ss${upperCaseFirstLetter(subScene)}`
  cleanSkipper(scene, ss)
  g.subScene[parentScene][subScene].ff = 0.1
  if (scene === 11 && subScene === 'folklore') {
    g.folklore.binary.folkLoreMaskIncrementX = 225
    rollEmOut()
  } else {
    const ssTrigger = g.document.querySelector(`.${parentScene}.subSceneTrigger.${subScene}`)
    ssTrigger.click()
  }
}

const killSkipper = (parentScene, subScene) => {
  const scene = parentScene.substr(5)
  const ss = `ss${upperCaseFirstLetter(subScene)}`
  cleanSkipper(scene, ss)
  const skipButton = g.document.querySelector(`#${ss}`)
  if (skipButton) {
    skipButton.checked = true
    skipButton.disabled = true
  }
}

export {
  activateSubScene, scenes, setScene, setSceneSkipper, setSubScenes, subSceneProgress,
}

