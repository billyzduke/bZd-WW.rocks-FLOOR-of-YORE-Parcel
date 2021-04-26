/* eslint-disable import/no-cycle, no-param-reassign */
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

const setScene = (el, scene, toScene = 0) => {
  scene.action = 'set'
  if (!toScene || toScene === scene.current + 1) {
    const setScenes = [
      setScene00,
      setScene01,
      setScene02,
      setScene03,
      setScene04,
      setScene05,
      setScene06,
      setScene07,
      setScene08,
      setScene09,
      setScene10,
      setScene11,
    ]
    if (setScenes[toScene]) {
      if (toScene >= scene.skipTarget) {
        scene.skipDur = 0
        console.log(`scene ${toScene} ${scene.action} started: ${scenes[toScene]}`)
        const sceneSet = setScenes[toScene](el, scene)
        if (sceneSet) {
          scene.current = toScene
          console.log(`scene ${scene.current} ${scene.action} complete: ${scenes[scene.current]}`)
          // eslint-disable-next-line no-use-before-define
          setSceneSkipper(el, scene)
          return true
        }
        console.log(`a problem occurred while attempting to ${scene.action} scene ${toScene}`)
      } else {
        scene.action = 'skip'
        scene.current = toScene
        console.log(`scene ${scene.current} ${scene.action}: ${scenes[scene.current]}`)
        const nextScene = scene.current + 1
        if (setScenes[nextScene]) {
          setTimeout(() => setScenes[nextScene](el, scene), 100)
          return true
        }
        console.log(`invalid scene ${scene.action} attempted: scene ${nextScene} does not exist.`)
      }
    } else {
      console.log(`invalid scene ${scene.action} attempted: scene ${toScene} does not exist`)
    }
  } else {
    console.log(`invalid scene ${scene.action} attempted: current scene ${scene.current} cannot be ${scene.action} to target scene ${toScene}`)
  }
  return false
}

const skipToScene = (el, scene, toScene, e) => {
  e.target.blur()
  e.target.style.pointerEvents = 'none'
  scene.skipDur = 0.01
  scene.targetScene = Number(toScene)
  setScene(el, scene, scene.current + 1)
  setTimeout(() => {
    e.target.style.pointerEvents = 'auto'
  }, 2500)
}

const setSceneSkipper = (el, scene) => {
  if (document.body.classList.contains('dev')) {
    if (!el.sceneSkipper.options.length) {
      scenes.forEach((s, i) => {
        const ssOption = document.createElement('option')
        ssOption.value = i
        ssOption.innerHTML = `${i}: ${s}`
        if (i < 1 || i < scene.current + 2 || i < scene.skipTarget + 1) ssOption.disabled = true
        el.sceneSkipper.add(ssOption)
      })
      // eslint-disable-next-line no-param-reassign
      el.sceneSkipper.value = 0
      el.sceneSkipper.addEventListener('change', e => skipToScene(el, scene, el.sceneSkipper.value, e))
    } else {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (let i in el.sceneSkipper.options) {
        i = Number(i) // it's not an array, so...
        if (Number.isInteger(i)) {
          if (i === scene.current) {
            el.sceneSkipper.value = i
          }
          if (i < 1 || i < scene.current + 2 || i < scene.skipTarget + 1) el.sceneSkipper.options[i].disabled = true
        }
      }
    }
  } else if (el.sceneSkipper) el.sceneSkipper.parentNode.removeChild(el.sceneSkipper)
}

export { scenes, setScene, setSceneSkipper }

