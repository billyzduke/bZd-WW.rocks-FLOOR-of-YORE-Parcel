import g from './glob'
/* eslint-disable import/no-cycle */
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
]
scenes.forEach((_, s) => {
  g.scene.forCleanUp[s] = {}
})

const cleanScene = s => {
  const cleanUps = Object.entries(g.scene.forCleanUp[s])
  if (cleanUps.length) {
    console.log(`running ${cleanUps.length} cleanUp${cleanUps.length !== 1 ? 's' : ''} for scene ${s}`)
    cleanUps.forEach(([ c, u ], i) => {
      if (typeof u === 'function' && u()) {
        console.log(`${i + 1} - ${c}: this pipe is clean`)
      }
    })
    g.scene.forCleanUp[s] = {}
  }
  return true
}

const setScene = (toScene = 0) => {
  g.scene.action = 'set'
  // console.log({ scene, toScene })
  if (!toScene || toScene === g.scene.current + 1) {
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
    ]
    if (setScenes[toScene]) {
      console.log(`scene ${toScene} ${g.scene.action} started: ${scenes[toScene]}`)
      const prevSceneCleaned = cleanScene(g.scene.current)
      console.log({ prevSceneCleaned })
      if (prevSceneCleaned) {
        if (toScene >= g.scene.skip.target) {
          g.scene.skip.ff = 0
          g.tL.yore.timeScale(1)
        } else g.scene.action = 'skip'
        const nextSceneSet = setScenes[toScene]()
        console.log({ nextSceneSet })
        if (nextSceneSet) {
          g.scene.current = toScene
          console.log(`scene ${g.scene.current} ${g.scene.action} complete: ${scenes[g.scene.current]}`, g)
          // eslint-disable-next-line no-use-before-define
          setSceneSkipper()
          return true
        }
        console.log(`a problem occurred while attempting to ${g.scene.action} scene ${toScene}`)
      } else console.log(`a problem occurred while attempting to cleanUp scene ${toScene}`)
    } else {
      console.log(`invalid scene ${g.scene.action} attempted: scene ${toScene} does not exist`)
    }
  } else if (toScene !== g.scene.current) {
    // We're gonna ignore calls to change a scene to itself and not throw errors... Event listeners, it turns out, can accumulate on a single event, esp when using anon funcs
    console.log(`invalid scene ${g.scene.action} attempted: current scene ${g.scene.current} cannot be ${g.scene.action} to target scene ${toScene}`)
  }
  return false
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
    if (!g.el.sceneSkipper.options.length) {
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
  } else if (g.el.sceneSkipper) g.el.sceneSkipper.parentNode.removeChild(g.el.sceneSkipper)
}

export { scenes, setScene, setSceneSkipper }

