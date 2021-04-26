import { gsap } from 'gsap'

import { bDiam } from './glob'

const cR = 69
const cR02 = cR * 0.2
const bbDiam = bDiam * 1.25
const bRadii = bDiam / 2
const tgBgAsses = Array.from({ length: 9 }, (_, i) => `ass/rast/lightningBalls/lightning-ball-0${i + 1}.png`)
const cyOffPx = bDiam * 1.5 // magic number

export { cyOffPx }
