import { gsap, TimelineMax as TL } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import g from './glob'
// eslint-disable-next-line object-curly-newline
import { padStr, randOnum, randOcolor, setAddOn, shuffleArray } from './utils'

gsap.registerPlugin(MorphSVGPlugin, MotionPathPlugin)

const setLionHead = () => {
  setExcs()
  setAddOn('#thirdEyeWrapper', 'click', ex)
  gsap.set('#lionHead', {
    attr: {
      class: 'jarp',
    },
  })
  gsap.set('#thirdEyeClosed', {
    attr: {
      class: 'open',
    },
  })
}

const setExcs = () => {
  g.exc.path = [
    /* @ (At Symbol) */
    'M283.8,83.6c-9.9-23.7-24.9-42.1-44.7-54.4c-17.8-11.2-39.2-17.1-61.9-17.1 c-27.8,0-56.6,8.8-81,24.8c-25.8,16.8-44.8,40-54.9,67C28.8,130.2,23.2,159,25,187.3c1.7,26.6,9.7,52,23.3,73.5 c22.7,35.8,57.6,56.3,95.9,56.3c25.4,0,50.9-8.8,75.9-26.1l4.4-3.1l-2.9-4.5l-1.1-1.7l-1.3-2l-2.9-4.4l-4.5,2.6 c-22.7,13.2-44.9,19.9-66.1,19.9c-19.1,0-36.6-5.4-52.2-16.1c-14.6-10-26.9-24.4-35.7-41.8c-11.3-22.4-16.3-48-14.4-74.2 c2-28.1,12-55,28.9-77.8l0.1-0.2l0.1-0.2c10.5-16.9,26-31.1,44.8-41.1c18.4-9.7,38.8-14.9,59-14.9c16.9,0,32.5,3.6,46.5,10.6 c15,7.5,27.4,18.8,36.7,33.4c8.2,12.8,14.6,34.4,16.7,56.4c2.3,23.7-0.5,44.7-7.6,57.7c-5.4,9.9-12.9,14.7-22.8,14.7 c-1.9,0-3.8-0.2-5.9-0.5c-10.8-5.4-5.5-30.8-1.9-47.7c1.3-6.3,2.5-11.7,2.9-15.9c2.3-12.8,4.7-25.4,7.2-38.7 c1.1-5.8,2.2-11.7,3.3-17.6l1.2-6.5h-6.6l-9.6,0l-9.4,0c-6.4,0-12.8,0-19.2,0c-4.1,0-6.8,2.3-8.1,6.9c-0.8,3.1-2.9,4.9-5.5,4.9 c-1.7,0-3.4-0.7-5-2.1C177.7,77,164.8,71.8,151,71.8c-10.2,0-20.5,2.9-30.7,8.5c-9.2,5.1-17.9,12.3-25.7,21.3 c-15.2,17.5-25.2,39.9-26.8,60c-4.6,23.8,1.4,48.8,16.1,66.7c11.2,13.7,25.9,21.2,41.3,21.2c15,0,30-7.2,43.3-20.9 c0.5-0.5,0.9-1,1.3-1.4c1.8-2,2.3-2.5,3.6-2.6l0.1,0l0.1,0c0.4,0,0.8-0.1,1.2-0.1c3.5,0,5.3,2.1,9.4,7.6 c5.3,7.3,12.7,17.3,30.8,17.3c1.9,0,3.8-0.1,5.9-0.3l0.2,0l0.2,0c26.5-5.1,47.4-21,60.5-46C299.6,168.8,300.4,120.8,283.8,83.6z M164.1,118.8l0.5-0.1c0.8-0.1,1.7-0.2,2.5-0.2c7.1,0,14.8,4,19.2,9.9c2.1,2.9,4.4,7.4,2.8,12.7l-0.1,0.3l-0.1,0.3 c-0.5,2.8-0.9,5.6-1.4,8.4c-1.7,10.5-3.4,21.4-6,31.8c-6,12-20.9,21.1-35.1,21.1c-3.2,0-6.2-0.5-9-1.4c-8.6-2.9-14.3-9.4-15.9-18.5 l0-0.1l0-0.1c-3.9-16.7,0.4-36,10.8-49.1c5.4-6.8,15.1-15,30.1-15c0.4,0,0.7,0,1.1,0L164.1,118.8z',
    /* ¥ (Yen Symbol) */
    'M287.7,17.7l-1.3-3.8h-4c-4.9,0-9.8,0-14.5,0.1c-4.7,0-9.6,0.1-14.4,0.1c-8.4,0-15.2-0.1-21.4-0.3 c-0.4,0-0.7,0-1.1,0c-8,0-13,3.2-16.8,10.8c-13.8,27.8-28.3,55.9-42.4,83.1l-2.3,4.4c-2.6,5-4.5,6.5-8.4,6.6c-0.2,0-0.3,0-0.5,0 c-4.2,0-6.6-1.8-9.4-7.2c-14.6-27.7-29.2-56-43.3-83.4l-3.8-7.4c-1.2-2.2-3.6-6.9-10.3-6.9l-0.1,0C86,13.9,77.5,14,66.4,14 c-4.7,0-9.4,0-14.1,0c-4.8,0-9.7,0-14.6,0h-9.1l4.3,8.1c0.4,0.7,0.7,1.3,1,1.9c0.6,1.1,1.1,2.1,1.7,3.1c4.5,8,8.9,16,13.4,24 c15.6,27.8,31.7,56.6,47.7,84.9c2.3,4.1,3.2,7.7,3,11.6c-0.2,3.1-2.4,5.4-5.1,5.4c-4.3,0-8.7,0-13,0l-4.5,0l-4.5,0 c-8,0-14.7,0-21.5,0c-0.2,0-0.6,0-0.9-0.1c-0.5,0-1.1-0.1-1.8-0.1c-2.2,0-4.1,0.5-5.7,1.7l-2.4,1.6v2.9v28.7v5.5h5.5h3.1h2.7H52 l18.8,0l18.8,0c10.6,0,21.3,0,31.9,0c3.2,0,5.5,2.1,5.5,5.2c0,6.8,0,13.8,0,21.5c0,2.8-2.2,4.9-5.1,4.9c-7.4,0-14.8,0-22.2,0 c-16,0-32.5,0-48.8,0c-0.2,0-0.5,0-0.9-0.1c-0.5,0-1.1-0.1-1.8-0.1c-2.3,0-4.2,0.6-5.8,1.8l-2.2,1.6v2.8v28.8v5.5h5.5l3.1,0h2.6h1 l18.7,0l18.7,0l31.1,0c4.1,0,6,1.9,6,6.1c0,9,0,18,0,27.1l0,11.5v5.5h5.5h55.6h3.3l1.5-3c1.5-2.8,1.4-5.5,1.3-7.2c0-0.3,0-0.6,0-0.9 c0-6.9,0-13.9,0-20.6c0-4.3,0-8.6,0-12.9c0-3.1,2.6-5.6,5.7-5.6c6.9,0,13.7,0,20.6,0h2.3c14.7,0,31.3,0,47.5,0c0.2,0,0.5,0,0.8,0 c0.5,0,1.1,0.1,1.7,0.1c2.4,0,4.5-0.7,6.2-2.1l2.1-1.7v-2.6v-28.6v-5.5h-5.5H270l-19.2,0l-19.2,0l-30.7,0c-5.2,0-6.7-1.5-6.7-6.9 l0-4.8c0-4.6,0-9.1,0-13.7c0-3.9,2.3-6.3,6.1-6.3l13.3,0l6.6,0l6.6,0c13.8,0,28.6,0,43.5,0c0.2,0,0.5,0,0.9,0c0.5,0,1,0.1,1.6,0.1 c2.3,0,4.3-0.6,6-1.7l2.5-1.6v-3v-28.5V153h-5.5h-5.7c-3.6,0-7.2,0-10.8,0c-3.6,0-7.2,0-10.8,0c-8.9,0-15.6,0-22,0l-0.1,0 c-1.3,0-1.5-0.2-1.8-0.5c-3.4-3.4-4-8.8-1.5-13.3c6.4-11.5,12.8-23,19.3-34.6c14.2-25.4,28.8-51.7,43.2-77.5 c0.1-0.1,0.2-0.3,0.4-0.5C286.9,25.2,289.2,22,287.7,17.7z',
    /* £ (British Pound Symbol) */
    'M259.9,289.7l-19.6-44.1l-2.5-5.6l-5.3,3c-8.4,4.8-16,7-24,7c-8.9,0-17.6-2.9-26.7-6 c-8.1-2.7-17.2-5.8-27.6-7.1c-2.8-2.9-3-5.5-2.8-7.7c0.4-3.8,2.5-8.2,4.6-12.9c3-6.3,6-12.9,6-19.9c0.4-2.1,1.7-5.5,13.7-5.5 c3.1,0,6.4,0.2,9.6,0.4c3.2,0.2,6.2,0.4,9,0.4c2.2,0,4.1-0.1,5.8-0.4l4.7-0.7V186v-29.4v-5.5h-5.5c-4.2,0-8.4,0-12.5-0.1 c-4,0-8.2-0.1-12.3-0.1c-7,0-12.6,0.1-17.9,0.3c-0.2,0-0.4,0-0.6,0c-3.4,0-5.6-1.3-7.5-4.6l-0.1-0.1l-0.1-0.1 c-5.2-7.9-8.9-18.6-10.1-29.2c-1.3-11.2,0.2-21.6,4.1-29.2c4.9-9.6,13.4-14.7,25.2-15.2l0.2,0l0.2,0c1.9-0.2,3.8-0.3,5.6-0.3 c13.8,0,23.3,6.3,31.9,21.1l2.9,5l4.9-3.2l15-9.9l24.1-15.9l4-2.6l-2-4.3c-7.5-16-19.2-28.3-34.6-36.7 c-13.8-7.5-30.3-11.4-47.7-11.4c-36.6,0-72.1,17.1-90.5,43.6C71,73.4,61.1,99.1,74.2,134c2.6,7,3.1,12.2,1.4,14.6 c-1.8,2.5-6.5,3.1-10.2,3.1l-5.5,0v5.5V186v5.5h5.5l8.7,0h8.6l12.8,0c5.2,0,7.3,1.7,8.5,7c2,16.1,3,32.8-8.2,43.6l-0.1,0.1l-0.1,0.1 c-7.1,7.5-12.4,11.8-15.9,14.7c-4.4,3.6-7.2,6-7.9,10.1c-0.6,3.8,1.1,7,4.1,12.8c2.5,4.9,6.3,12.2,11,24l2.3,5.8l5.5-3.1 c12.3-6.9,23.9-10.3,35.5-10.3c13.3,0,25,4.3,37.4,8.8c12.5,4.6,25.5,9.3,40.3,9.3c16.3,0,32.6-6,49.9-18.2l3.7-2.6L259.9,289.7z',
    /* € (Euro Symbol) */
    'M256.4,291.7c-0.8-3.7-1.7-7.3-2.6-11.1c-0.4-1.6-0.8-3.2-1.2-4.8l-1.7-7l-6.3,3.5 c-12.5,6.9-26.3,10.6-40,10.6c-19.9,0-38.7-7.4-52.9-20.9c-15.2-14.4-23.6-34.1-24.3-56.9l0,0l0,0c-0.1-2,0.2-3.4,0.8-4 c0.6-0.7,2.2-1,4.4-1c7.4,0,14.8,0,22.2,0c7.7,0,15.5,0,23.2,0c13.5,0,31.3,0,49.4,0.1c0.4,0,0.7,0,1.1,0c3.1,0,5.5-0.9,7.3-2.7 c2.8-2.8,2.7-6.6,2.6-9.5c0-0.3,0-0.5,0-0.8c0.2-1.7,0.5-5.5-2-8.4c-2.6-3-6.4-3.3-9.1-3.3l-0.2,0c-14.7,0.1-30.4,0.1-51,0.1 c-8.4,0-16.7,0-25.1,0c-7.6,0-15.2,0-22.8,0h-0.1l-0.1,0c-0.1,0-0.2,0-0.3,0c-1.5,0-2.5-0.3-3.1-0.8c-1.8-1.9-1.5-8.4-1.2-12.7 c0.1-2.6,0.3-5.1,0.1-7.4c0.1-2.7,0.9-4.2,4.7-4.2h0.1l0.1,0c5-0.1,10.4-0.2,16.4-0.2c8.3,0,16.8,0.1,24.9,0.2 c8.2,0.1,16.7,0.2,25.1,0.2c14.8,0,26.9-0.4,37.8-1.2l5.3-0.4l-0.2-5.3c0-1.1,0-2.3,0-3.6c0.1-3.1,0.2-6.7-0.8-10.6l-1-4.2l-4.3,0 l-4.9,0l-20.1,0l-20.1,0c-15.6,0-34.1,0-53.1,0c-1.7,0-2.4-0.2-3.2-0.7c-2.2-3.5-1.9-8.8-1.2-12.7c3.4-19.7,21.9-46.1,32.2-52.9 l0.2-0.2l0.2-0.2c10.4-8.6,23.7-13,39.6-13c12.8,0,26.6,2.9,39.9,8.3l7.4,3l0.2-8c0-1,0.9-3.7,1.6-5.6c1.1-3,2.2-6.2,2.5-9.2 c0.6-6.9-3.7-9.6-5.9-10.5c-14.8-7.5-30-11.3-45.3-11.3c-26.5,0-52.5,11.7-73.2,33c-19.6,20.2-32.8,46.8-37,74.8 c-0.5,3.5-1.7,5-7.8,5c-1.4,0-2.9-0.1-4.3-0.2c-1.4-0.1-2.8-0.2-4.2-0.2c-8.2,0-10.8,3.9-11.5,7.2l-0.2,0.7l0,0.7c0,0.9,0,2,0,3 c-0.1,2.8-0.2,5.9,0.8,9.5l1.1,4l4.2,0l0.3,0c1.5,0,2.9,0,4.4-0.1c1.4,0,2.7-0.1,4-0.1c1.6,0,6.4,0,7.7,1.5c0.8,0.9,1,3.1,0.7,6.1 l0,0.2l0,0.2c-0.1,1.9-0.1,3.8-0.1,5.6c-0.1,12-1.4,12-4.6,12c-0.8,0-1.7-0.1-2.7-0.2l-0.5-0.1l-0.5,0c-0.9,0-1.7,0-2.6,0 c-0.5,0-1,0-1.5,0c-0.4,0-0.8,0-1.1,0c-1.9,0-5.9,0-8,3.7c-1.2,2.1-1.2,4.3-1.2,7.9c0,1,0,2.2,0,3.6c-0.1,3.4,1.3,5.5,2.4,6.7 c2.6,2.7,6.3,3,8.8,3c1.6,0,3.2-0.1,4.8-0.3c1.3-0.1,2.5-0.2,3.4-0.2c0.6,0,0.8,0,0.8,0l0.7,0.2l0.7,0c2.1,0,4,1.7,4.3,4 c6.8,43.3,23.4,74.4,49.3,92.6l0,0l0,0c19.2,13.2,39,19.8,59,19.8c17.2,0,34.7-5,52.1-14.7c0.1-0.1,0.4-0.2,0.6-0.3 C256.6,298.8,257.1,294.7,256.4,291.7z',
    /* # (Number Sign / Pound Sign / Hashtag) */
    'M274.2,90.3c-2.5,0-4.9,0-7.3,0c-2.3,0-4.5,0-6.6,0c-3.6,0-6.5,0-9.2,0c-1.2-0.2-3.5-2.3-3.8-3.5 c-0.1-5.7,0.1-10,1.4-14.4c3.9-12.2,7.6-24.8,11.1-36.9c1.4-4.8,2.8-9.7,4.3-14.5l2.1-7.1h-7.4h-29.9h-4l-1.2,3.8 c-0.1,0.4-0.3,0.8-0.4,1.2c-0.3,0.9-0.6,1.8-0.9,2.8c-2.1,7.3-4.3,14.5-6.4,21.8c-4,13.6-8,27.3-12,40.9c-0.9,3.2-4.2,5.8-5.3,6 c-4.6,0-9.3,0-13.8,0c-4.6,0-9.3,0-13.9,0c-1.1-0.3-3.3-2.2-3.7-3.3c-0.1-4.8-0.2-9.7,1.3-14.3c4.6-14.6,8.8-29.5,13-43.9l0.4-1.3 c0.1-0.3,0.2-0.7,0.4-1.1c0.7-1.9,2-5.2,0.6-9l-1.3-3.6h-3.8h-28.6h-4l-1.2,3.8c-0.1,0.4-0.3,0.8-0.4,1.2c-0.3,0.9-0.6,1.8-0.9,2.8 c-4.2,14.4-8.4,28.7-12.6,43.1l-5.5,18.7c-1.5,5-4,7-9,7h-0.7l-5.6,0l-5.6,0c-4,0-8,0-12,0c-0.2,0-0.3,0-0.5,0c-0.2,0-0.4,0-0.6,0 c-6,0-7.9,3.9-8.6,6.3c-1.9,6.9-3.8,13.7-5.8,20.9c-0.7,2.7-1.5,5.4-2.3,8.1l-1.9,7h7.2c2.2,0,4.4,0,6.5,0c2.1,0,4.1,0,6.2,0 c4,0,7,0,10-0.1c0,0,0,0,0,0c0.3,0,0.6,0,1.9,1c3.7,2.8,3.3,6.3,1.6,13.1c-3.2,12.9-7,26-10.7,38.7c-1.2,4.2-2.4,8.3-3.6,12.5 c-0.8,2.8-3.8,5-6.8,5l-11.7,0l-8.3,0l-8.3,0h-4.2l-1.1,4l-5.4,18.9l-3.7,12.9l-2,7h7.3l6.9,0l6.2,0c2.8,0,5.5,0,8.2,0 c2.4,0,4.7,2.4,4.9,5.1c0.5,7.5-1.9,14.7-4.3,22.3c-1,3-2,6.2-2.9,9.3c-1.6,5.9-3.4,11.7-5.3,17.8c-0.8,2.7-1.7,5.4-2.5,8.2 l-2.1,7.1h7.4h29.9h4l1.2-3.8c0.1-0.5,0.3-0.9,0.4-1.4c0.3-1,0.6-2,0.9-3c2-6.9,4-13.8,6.1-20.7c3.4-11.8,6.9-23.5,10.3-35.3 c0.8-2.6,3.5-5.2,4.6-5.5c4.6,0,9.3-0.1,14.2-0.1c4.8,0,9.6,0,14.8,0.1c1.1,0.4,3.1,2.1,3.7,3.2c0,0.4,0,0.7,0,1.1 c0.1,3.9,0.2,7.7-0.9,11.1c-3.2,10.3-6.3,20.8-9.3,31c-1.2,4-2.4,8.1-3.6,12.1c-0.1,0.2-0.1,0.3-0.2,0.5c-0.5,1.5-1.6,4.5,0.2,7.9 l1.5,3h3.3h28.5h3.8l1.3-3.6c0.1-0.4,0.3-0.7,0.4-1c0.3-0.8,0.6-1.7,0.9-2.6c5.1-17.1,10.2-34.2,15.3-51.3l1.7-5.6 c1.1-3.6,3.8-5.7,7.4-5.7l12,0l9,0l9.1,0h4.2l1.1-4l8.8-31.8l1.9-7h-7.2c-2.4,0-4.7,0-7,0c-2.2,0-4.4,0-6.5,0c-4,0-7.3,0-10.2,0.1 l-0.1,0c-0.6,0-1-0.1-2.5-1.3c-2.9-2.3-3.2-5-1.5-11.8c3.6-14.3,8.1-28.6,12.3-42.6c1.1-3.4,2.1-6.9,3.2-10.3 c0.7-2.3,3.6-4.2,6.4-4.2c4,0,8,0,12.1,0l8.5,0l8.8,0h4.2l1.1-4.1l3-11.2l5.4-20l1.9-6.9H274.2z M162.6,202.7l-4.2,0l-3.4,0l-3.4,0 l-3.5,0l-3.5,0l-4,0c-5,0-6.6-1.5-6.7-6.5c-0.1-4,0.5-8,1.7-12c3.1-10.1,6-20.5,8.9-30.5c1.4-5,2.9-10,4.3-15.1 c1.2-4.3,3.6-6.1,8-6.1c2.4,0,4.7,0,7.1,0c2.4,0,4.9,0,7.3,0c3.3,0,6.7,0,10,0c2.1,0,4.6,2.5,4.6,4.7c0.2,4.5-0.4,9.1-1.9,13.8 c-3.2,10.3-6.3,20.8-9.3,31c-1.4,4.8-2.8,9.6-4.3,14.4C169.2,200.9,166.9,202.7,162.6,202.7z',
    /* $ (Dollar Sign) */
    'M240.1,184.8c-4-10.1-12.4-23.7-29.9-31.4c-0.8-0.4-1.6-0.7-2.4-1.1c-6.6-2.9-13.4-6-20.6-7.9 c-5.6-1.5-11.3-3-16.8-4.4c-8.4-2.1-17.1-4.3-25.4-6.8c-11.8-3.5-16-9.3-15.9-22.1c0-8.1,6.6-15.8,14.3-16.7 c4.5-0.5,8.9-0.8,13.2-0.8c4.9,0,9.7,0.4,14.3,1c13.1,2,25.4,7.5,37.5,16.7l4.6,3.5l3.3-4.8l9.5-13.9l9.3-13.7l1.8-2.6l-1.3-2.8 c-1.3-2.9-3.6-4.4-4.9-5.3c-0.2-0.1-0.4-0.3-0.6-0.4c-14-10.2-29.9-17.3-47.4-21c-3.9-0.8-6-3.5-6-7.5l0-15.6l0-6.6v-5.5h-5.5h-18.5 h-3.6l-1.4,3.3c0,0.1-0.1,0.2-0.1,0.2c-0.3,0.5-0.8,1.6-0.8,3.1c-0.1,5.7-0.1,12.4-0.1,19c0,5.5-1.6,7.4-7.2,8.7 c-3.1,0.7-6.2,1.7-9.1,2.6l-1.3,0.4C110.2,58.1,95.4,70.8,87,88.2c-8.2,17-9.4,36.7-3.1,52.7c8.6,22,26,31.2,40.3,36.8 c10.5,4.1,21.4,6.7,32,9.3c4.1,1,8.2,2,12.3,3c8.4,2.2,17.1,4.9,23.3,12c3.8,4.3,5.8,17.1,3.3,20.7c-4.7,6.8-9.2,11.5-15.6,12.4 c-6.7,0.9-12.7,1.4-18.4,1.4c-12.8,0-24-2.4-34.2-7.2c-7.7-3.7-15-8.8-23-16l-4.9-4.4l-3.5,5.6l-19,30.7l-2.8,4.5l4.4,3 c0.4,0.3,0.7,0.5,1,0.7c0.2,0.1,0.5,0.3,0.6,0.4c16.8,14.4,37,23.6,60.1,27.4c4.4,0.7,6.5,3.1,6.5,7.3l0,14.1l0,6.1v5.5h5.5h19.1 h5.5v-5.5c0-2,0-4,0.1-5.9c0.1-4.5,0.2-9.2-0.3-13.9c-0.3-2.8,0.6-4.4,4.1-7.4c0.5-0.5,1.8-0.6,3.2-0.8c1.1-0.1,2.3-0.3,3.6-0.6 c12.8-3.4,23-8,31.2-14.3c9.5-7.3,16.4-16.9,20.6-28.6c1.4-4.1,2.7-8.6,4.2-14.4C246,210.7,244.9,196.9,240.1,184.8z',
    /* % (Percent Symbol) */
    'M136.8,135.1c9.5-11.1,19.8-30.7,15.1-61.2c-3-18.7-11.1-34.2-23.6-44.8 c-11.2-9.5-25.7-14.8-40.8-14.8V17c0,0,0,0,0,0l0-2.8c-17,0-33.1,6.4-45.2,17.9C28.6,45,21.3,62.8,20.9,83.7l0,0.1l0,0.1 c0.9,51.3,33.4,74.3,65.2,74.3C105.7,158.2,124.2,149.7,136.8,135.1z M59.5,80.8c0.3-8.7,3.1-16.1,8.1-21.4 c4.9-5.2,11.9-8.2,19.1-8.2c7.8,0,15.2,3.5,20.2,9.6c5.2,6.3,10.4,18.2,6.3,39.5c-4.4,15.5-16.5,21.1-26.4,21.1 c-8.1,0-15.6-3.4-20.7-9.2c-5.5-6.3-7.6-15-6.1-25.1l0.9-6.2L59.5,80.8z M299.4,242c-0.2-19.5-7.7-37.6-21-51.1 c-12.7-12.8-29.7-20.1-46.7-20.1h0c-17.1,0-32.8,7-45.6,20.4l-0.2,0.2l-0.2,0.2c-12.2,15.5-18.8,33.1-19,50.9 c-0.2,18.2,6.3,35.8,18.8,51l0,0.1l0,0c12,14,27.7,21.3,45.2,21.3c17.9,0,35.8-7.9,49-21.7C293.2,279.2,300.2,261.1,299.4,242z M205.9,242.1c-1.6-9.4,0.3-17.6,5.4-23.8c5.2-6.2,13.5-9.8,22.2-9.8c10.2,0,22.5,5.4,26.1,20.7c1.6,9,1.6,18.6,0,27.7l0,0l0,0 c-2.4,13.7-14.8,19.8-26.1,19.8c-0.9,0-1.8,0-2.8-0.1l-0.5,0l-0.5,0c-0.6,0.1-1.3,0.1-1.9,0.1c-7.1,0-12.1-4.1-14.9-7.5 c-5.7-6.8-8.5-16.9-7-25.3l0.2-1L205.9,242.1z M251.2,26.1c-28.8,54.4-59.9,109-90,161.9c-21.1,37-42.9,75.3-63.7,113.1 c-4,9.4-12.6,9.4-15.8,9.4c-1,0-2,0-3-0.1c-1,0-1.9-0.1-2.7-0.1c-0.3,0-0.6,0-0.9,0l-9.3,0.3l4.3-8.3 c28.6-55.5,60.5-111.5,91.4-165.6c21-36.7,42.6-74.7,63-112.2c2.3-4.5,6.4-6.8,12.3-6.8h0c1.4,0,2.8,0.1,4.1,0.2 c1.1,0.1,2.2,0.2,3.1,0.2c0.6,0,1,0,1.4-0.1l11.1-2L251.2,26.1z',
    /* & (Ampersand) */
    'M275.7,300.8c-0.3-0.3-0.5-0.7-0.8-1.1c-0.6-0.8-1.3-1.7-2-2.5c-2.8-3.4-5.6-6.8-8.3-10.2 c-7.1-8.7-14.5-17.8-22-26.5c-3.5-4.1-4.8-7.6-4.3-12c0.3-2.5,0.6-3.8,1.4-5c6.4-9.7,12.4-20.2,18.4-32.2l0.4-0.8 c3.6-7.3,7.4-14.8,10.5-22.9l1.7-4.5l-4.2-2.3l-31.2-16.9l-2.8-1.5l-2.7,1.6c-2.9,1.8-3.7,4.4-4,5.5c0,0.1,0,0.2-0.1,0.3 c-2.2,6.5-4.9,13-7.6,19.2c-1.1,2.7-2.3,5.4-3.4,8.2c-1.8,4.5-5.6,7.3-9.8,7.3c-3.6,0-6.9-2-9.3-5.8c-6.5-10.2-13.7-20.1-20.7-29.7 l-1.2-1.7c-2.2-3.1-3-7.1-2.1-10.5c0.8-3.1,3-5.5,6.3-7c6.7-3,12.6-7,18.4-11c0.8-0.6,1.6-1.1,2.4-1.6c13.7-9.2,23.2-22.7,29.2-41.3 c4.2-13,3.3-28.2-2.4-41.7c-6-14.2-16.7-25.4-30.1-31.5C182.8,16.9,170.1,14,158,14c-18.5,0-36.1,6.8-52.3,20.2 C88.7,48.2,80.7,69,83,92.7c1.4,14.4,6.3,27.9,11.1,40.9l0.4,1.2c3.8,10.3,2.8,13.5-5.6,18.7c-8.7,5.4-17.7,11.3-24.6,20 c-18.6,23.5-24.8,49.3-18.4,76.7c2.5,10.8,5.9,19.7,10.2,27.2c5.3,9.2,12.1,16.3,20.7,21.9c14.1,9.1,29.8,14.4,46.7,15.5 c2.1,0.1,4.2,0.2,6.3,0.2c19,0,37.9-5.9,58-17.9c3.3-2,6-2.9,8.3-2.9c1.9,0,4.9,0.5,9.2,5.3c1.4,1.5,3.1,3.5,4.6,5.7 c2.6,3.7,6.2,5.5,11.1,5.5l0.2,0c8.2-0.1,16.3-0.1,24.5-0.1l2.3,0l2.9,0c4.9,0,10.5,0,16.1,0c0.1,0,0.2,0,0.3,0 c0.4,0.1,1,0.1,1.7,0.1c2.9,0,5.4-1.4,6.9-4l1.9-3.2L275.7,300.8z M103.7,222.8c-0.4-8.3,0.5-14.9,2.8-20.7 c1.5-3.8,4.1-7.2,7.9-10.8c0.6-0.2,2.1-0.5,4.2-0.5c2,0,3.4,0.3,4,0.4c2.5,2.4,4.7,4.6,6.3,7.2c9.5,15.1,20.6,30.7,33.7,47.6 c1.9,2.5,2.6,5.6,2,8.7c-0.6,2.8-2.3,5-4.7,6.2c-6.5,3.3-13.4,5.1-20.1,5.1c-4.9,0-9.6-0.9-14-2.7c-13.6-5.6-21.3-16.7-22.2-32.1 c-0.1-1.7-0.1-3.5,0-5.4c0-0.9,0-1.8,0-2.8v-0.1L103.7,222.8z M152.7,119.4c-3.9,0-7.9-3-9.4-7.1c-2.7-7.3-5.3-16.2-4.5-26.3 l0.1-0.7l-0.1-0.7c-1.5-7.9,1.7-14.9,9.6-21.5c2.7-2.2,4.9-3.2,7.3-3.2c2.5,0,5,0,7.9,0c12,0,18,6.1,19,19.3c1.3,18-8.5,28-26,39.1 C155.4,119,154.1,119.4,152.7,119.4z',
    /* * (Asterisk) */
    'M287.3,205.8l-2.2-1.3l-1.9-1.1c-1.4-0.8-2.7-1.6-4.1-2.5c-4.8-2.8-9.5-5.6-14.3-8.4 c-10.4-6.1-21.2-12.4-31.8-18.7c-2-1.2-5.9-3.4-6.2-5.3c-1.2-6-0.6-8.6,2.2-10.5c0.9-0.6,1.6-1.2,2.4-1.7c0.9-0.7,1.8-1.3,2.6-1.8 c15.6-9.1,31.6-18.5,47.4-27.8c0.1-0.1,0.4-0.2,0.6-0.3c1.4-0.7,4.1-2,5.5-5.3l1.1-2.5l-1.3-2.4l-6.6-12.7 c-5.7-10.9-11.5-21.8-17.2-32.7c-0.9-1.8-3.8-7.2-9.6-7.2c-3.2,0-5.9,1.6-7.8,3.1c-3.3,2.4-6.6,4.7-9.9,7.1 c-9.7,6.9-19.7,14.1-29.4,21.4c-3.2,2.4-6,3.5-9.4,3.5c-0.4,0-0.8,0-1.2,0c-1.3-0.1-5.6-0.7-5.5-5.4c0.1-15.2,1-30.7,1.8-45.6 c0.3-5.9,0.7-12,1-18.1c0.3-5.9-1.8-9.4-3.7-11.3c-1.8-1.9-5.1-4.1-10.8-4.2c-1.5,0-2.9,0-4.4,0c-2.7,0-5.5,0-8.2,0 c-2.7,0-5.5,0-8.2,0c-6.9,0-12.2,0-17.1-0.1l-0.2,0c-4.7,0-7.7,2.1-10.1,4.2c-4.8,4.3-4.3,9.6-4,12.8c0.1,0.6,0.1,1.2,0.1,1.8 c0.5,15.3,1.1,30.9,1.7,46c0.2,5,0.4,10,0.6,15c0.1,1.5-0.1,1.6-0.3,1.8c-2,2-4.8,3.2-7.7,3.2c-2.1,0-4.1-0.6-5.8-1.8 c-7.1-5.1-14.2-10.2-21.4-15.4c-6.9-5-13.9-10-20.8-15c-1.8-1.3-4.5-2.9-7.7-2.9c-3.9,0-7.1,2.4-9.5,7c-4.1,7.9-8.2,16-12.2,23.8 l-0.5,1.1c-2.5,4.9-5,9.8-7.5,14.7l-3.3,6.6l-2.3,4.5l4.4,2.6c0.6,0.3,1.1,0.7,1.6,0.9c1,0.6,1.9,1.1,2.8,1.7 c4.5,2.7,9.1,5.3,13.6,8c11.4,6.6,23.1,13.5,34.5,20.4c4.6,2.8,6.6,4.4,6.8,8.4c0.2,4.6-1.5,7.3-6.7,10.4 C75.1,181.3,62.9,188.5,50,196c-5,2.9-10,5.8-15,8.8l-4.5,2.6l2.3,4.6l6.7,13.3c5.6,11.1,11.1,22.1,16.6,33c1.2,2.3,3.9,7.8,9.8,7.8 c3.2,0,6-1.7,8.3-3.4c3.2-2.3,6.4-4.6,9.6-7c9.5-6.9,19.3-14,28.8-21.2c3.5-2.7,6.5-3.8,10-3.8c0.4,0,0.8,0,1.3,0 c2.6,0.2,5.7,1.2,5.6,5.1c-0.7,19-1.4,38.3-2.2,57l-0.2,5.4c-0.1,3.6,0.1,8.8,3.7,12.6c2.7,2.8,6.6,4.1,12,4.2l0.8,0 c3.2,0,6.3,0,9.5,0c3.2,0,6.3,0,9.5,0c6.7,0,11.8,0,16.7,0.1l0.2,0c5.2,0,8.4-2.4,10.6-4.5c4.5-4.3,4-9.4,3.6-12.4 c-0.1-0.6-0.1-1.2-0.1-1.7c-0.3-6.6-0.7-13.2-1-19.7c-0.7-13.4-1.5-27.4-1.6-41c0-0.3,0-0.7,0-1c0-0.3,0-0.7,0-0.9 c1.8-2.2,4.7-3.5,7.6-3.5c2,0,3.8,0.6,5.3,1.7c7.6,5.5,15.1,11,22.7,16.6c6.4,4.7,12.8,9.4,19.3,14.1c2.5,1.8,5.3,3.5,8.5,3.5 c5.7,0,8.5-5.4,9.7-7.7c7.4-14.2,14.6-28.1,21.8-42.2c0.1-0.1,0.2-0.4,0.3-0.6c0.8-1.4,2.4-4,1.8-7.5L287.3,205.8z',
    /* ? (Question Mark) */
    'M195.3,274.8l0,0.2l0,0.2c-0.2,10.2-4.2,20.1-11.2,27.7c-7,7.6-16.1,12-25,12 c-6.3,0-15.4-2.1-23.2-12.3l0-0.1l0-0.1c-7.3-10-10.7-18.7-10.7-27.2c0-8.4,3.3-17.1,10.5-27.2l0.1-0.2l0.2-0.2 c8.2-9.7,17.3-11.7,23.4-11.7C177.6,235.9,194.5,254.1,195.3,274.8z M237.3,59.1c-11.3-26.8-42.5-44.8-77.7-44.8 c-30.1,0-58.3,12.9-79.6,36.3l-3.1,3.4l2.8,3.6l15.9,20.7l12.5,16.3l4.5,5.9l4.3-6.1c6.5-9.3,22.9-16.5,37.3-16.5 c6.1,0,17,1.4,21,11c5.7,13.4-2.7,21.4-17.3,33.1c-2.9,2.3-5.9,4.7-8.6,7.1c-24.9,22.1-30,53.3-13.4,81.5l2.2,3.7l4.1-1.2l14.8-4.3 l20.9-6.1l4.3-1.2l-0.3-4.4c-1-13.1-0.1-21.2,2.9-27.2c2.9-5.8,8.1-10.1,15.9-16.7c3.2-2.7,6.8-5.7,10.8-9.3l0.1-0.1l0.1-0.1 C248.9,105.6,243.7,74.3,237.3,59.1z',
    /* (Ohm) */
    'M177.6,36.5l-3.5-3.8l3.6-3.8l7.3-7.6l9.4-9.8l3.7-3.9l4,3.6l18.3,16.8l4.1,3.8l-3.9,4.1 l-11.3,11.8l-6.7,7l-4,4.2l-4-4.3l-7.1-7.6L177.6,36.5z M147.3,60.5c1,2,1.9,4,3.3,6c15.2,23.2,35.6,34.9,60.5,34.9 c0.5,0,0.9,0,1.4,0c14.9-0.3,29.9-4.4,45.8-12.7c7-3.7,15.2-8.4,22.8-15.4l3.6-3.4l-3-4l-16.5-21.7l-3.6-4.7l-4.4,3.9 c-0.6,0.6-1.2,1.1-1.8,1.6c-1.2,1-2.3,2-3.4,3c-14.3,13.2-33.2,20.8-52,20.8c-17.1,0-32.8-6.4-44.3-17.9l-0.3-0.3l-0.3-0.2l-0.1-0.1 c-0.6-0.5-2-1.6-4.1-1.6h-1.8l-1.5,1.1c-1.4,1-2.3,2.5-2.5,4.1c-0.3,2.2,0.6,3.9,1.2,4.7C146.7,59.1,147,59.7,147.3,60.5z M308,162.4l0-0.1l-0.2-0.8c-5.8-21.9-16.8-31.8-20.9-35.5c-0.4-0.3-0.7-0.6-0.9-0.8c-0.7-0.7-3.2-2.8-5.9-4.8 c-10.9-8.3-21.3-12.3-31.8-12.3c-0.5,0-1.1,0-1.6,0c-16.4,0.6-31.1,7.8-42.3,20.7c-8.1,9.4-13.8,20.1-18.9,29.7 c-5.6,10.5-11.2,18.1-17.8,24c-3.3,2.9-6.3,4.4-9.7,4.7c-0.9,0.1-1.8,0.1-2.7,0.1c-7.6,0-15.2-2.8-24.7-8.9 c-0.5-0.3-1.2-0.9-1.3-1.6c-0.1-0.6,0.3-1.7,1.6-2.9c1.1-1.1,2.4-2.1,3.7-3.1c1.7-1.4,3.4-2.8,5.1-4.4c16-16,22.6-32.8,20.2-51.4 c-3.3-26-19.7-42.2-44.9-44.3c-3-0.3-6.1-0.4-9.1-0.4C86.9,70.1,68,75.4,49.8,86c-0.7,0.4-1.4,0.8-2.1,1.2c-3.1,1.7-6.7,3.6-9.6,7.1 l-2.4,2.8l1.7,3.3l4,7.6l9.9,18.8l2,3.7l4.1-0.9c0.2-0.1,0.4-0.1,0.6-0.1c0.6-0.1,1.7-0.3,2.8-1c0.7-0.4,1.3-0.9,2-1.3 c0.5-0.3,0.9-0.6,1.4-0.9c10.4-6.9,23-14.1,37.7-15c2.6-0.1,5.7-0.3,8.6-0.3c7,0,12.2,0.9,16.9,3c7.1,3.2,11.7,9.2,12.7,16.5 c0.9,6.8-1.6,13.5-6.4,17.6c-7.4,6.2-16.1,8.4-24.3,9.8c-4.2,0.7-8.6,0.8-13.8,0.8l-0.6,0l-0.6,0c-3.3,0-6.5,0-9.7,0.2l-6.8,0.4 l1.8,6.5l4.2,15.2l4.3,15.5l1.1,4l4.1,0.1c0.7,0,1.3,0,2,0c2.3,0,4.7-0.1,6.9-0.1c2.2-0.1,4.3-0.1,6.5-0.1c3.3,0,6,0.1,8.4,0.4 c13.3,1.4,23.5,8.5,28.6,19.9c5.2,11.7,4.1,25.9-2.7,35.3c-6.3,8.7-14.4,14.8-24.1,18.1c-8.1,2.7-16.4,4.1-25.4,4.1 c-6.2,0-12.8-0.7-19.6-2c-6.9-1.3-13.6-4.4-19.8-9.1c-13.5-10.2-24.2-23.6-32.9-40.9c-0.3-0.6-0.9-2.5-1.2-3.3l0-0.1 c-0.6-1.9-3.3-11.3-3.6-12.4c0,0.1,0.1,0.5,0.1,1.1h-2.7c-0.1-0.2-0.1-0.4-0.1-0.5l-2.7,0.5H8.3c0,0,0,0,0,0H5.5 c0,3.9,1.7,11.2,3.1,17.1c0.1,0.4,0.2,0.8,0.2,0.9c3.7,16,9.3,29,13.3,35.9c21,35.9,49.8,54.1,85.4,54.1c0.6,0,1.3,0,1.9,0 c20.4-0.4,37.3-7.4,49-20.2c12.5-13.7,18.6-34.1,16.9-55.9c-1-13-5.6-24.9-10.3-36.1c-1.2-2.8-0.9-4.1-0.8-4.4 c0.2-0.3,1.4-1.1,4.5-1.2c2.2-0.1,4.3-0.1,6-0.1c0.9,0,1.9,0,2.8,0c0.9,0,1.9,0,2.8,0c0.4,0,0.8,0,1.2,0 c13.5-0.1,25.1-5.4,34.4-15.9c5.2-5.9,9.3-12.5,13.2-18.9l0.7-1.1c5.5-9,12-16.8,19.3-23.2c5-4.4,10.5-6.8,16.2-7.1c0.2,0,0.5,0,1,0 c2.7,0,9.5,0.5,15.2,5c3.8,3,6.3,6.6,8.9,11.2c0.9,2,1.6,3.6,2.1,4.9l0.2,0.5c3,9.7,3.3,18.8,3.4,27.4c0.3,21.6-7.4,38.8-23.4,52.3 c-9.5,8.1-20.6,12.3-32.1,12.3c-13,0-25.3-5.7-34.6-16c-0.6-0.7-1.3-1.1-1.9-1.5c-0.2-0.2-0.6-0.4-1-0.7l-9.6-6.9l0.9,11.8 c1.6,20.2,7,33.9,17.5,44.3c10.2,10.2,21.7,15.3,34.2,15.3c4.8,0,9.8-0.8,14.8-2.4c21.9-6.9,37.4-21.8,46-44.5 C317.1,222.1,317.4,194,308,162.4z',
    /* ! (Exclamation Point) */
    'M185.3,257.7c5.4,6.2,8.3,14.2,8.3,22.5c0,8.3-3,16.2-8.4,22.3c-5.9,6.7-14.3,10.8-24.3,11.9 l-0.6,0.1l-0.6-0.1c-10.3-1.2-19-5.4-25.1-12.2c-5.5-6.2-8.5-14.2-8.5-22.6c0-8.3,3.1-16.2,8.6-22.3c6-6.7,14.6-10.8,24.8-11.8 l0.6-0.1l0.6,0.1C170.9,246.6,179.4,250.9,185.3,257.7z M189.1,26.1c-5.9-7-16.9-11.4-28.7-11.4c-5.8,0-11.2,1-15.8,3 c-10.1,3.3-16,9.3-17.7,18c-1.4,7.2,0.3,15.2,2,23.6c0.4,1.7,0.7,3.5,1,5.2c9.7,54.3,17.2,97.1,24.4,138.8l5.2,30.3l5.6-30.2 c2.1-11.1,4.2-22.4,6.2-33.3c7.7-41,15.6-83.4,22.3-125.5C195,37.7,193.4,31.3,189.1,26.1z',
    /* Rx (Pharmacy Symbol) */
    'M23.2,307.6c-0.1-1.6-0.2-2.9-0.2-4.3c0-0.8,0.1-1.6,0.1-2.6c5.6-0.6,11.1-0.1,16.5-1.2 c14.1-3,20.9-11,20.9-25.3C60.3,201.5,60.2,128.7,60,56c-0.1-20.2-11.1-30.9-31.4-30.6c-1.6,0-3.3,0-5.1,0 c-0.6-2.4-0.6-4.7-0.2-6.9c1.8-1,3.7-0.6,5.5-0.6c44.5,0,89,0,133.6,0c24,0,45.3,8,64.1,22.3c19.5,14.8,26,35.6,25.4,59.3 c-0.6,25.9-12.7,44.3-36,55.7c-12.7,6.2-26.1,10.5-40.6,14.2c17.1,21,33.9,41.6,51.1,62.6c6-6.9,12-13.3,17.5-20.1 c3.5-4.3,2.2-9.6-2.5-13c-2.6-1.8-5.7-2.5-8.5-3.7c-0.3-1.7-0.5-3.4,0.4-5c19.1,0,38.1,0,57.3,0c1.4,4.2,0.8,6.2-4,6.7 c-8.4,0.8-15.2,4.3-20.5,11.5c-9.2,12.2-19.3,23.7-29.2,35.7c11.6,13.9,23.4,27.4,34.5,41.4c6.9,8.7,14.2,15.8,26.2,14.8 c0.6,2.9,0.2,5.1-0.2,8c-2.9,0-5.8,0-8.8,0c-15.1,0-30.2-0.1-45.4,0.1c-2.7,0-4.6-0.8-6.3-2.9c-7.2-8.9-14.7-17.6-22.1-26.4 c-1-1.2-1.8-2.8-3.7-3.6c-4.5,5.4-9.2,10.8-13.6,16.4c-3.2,4.1-2.3,6.7,2.8,7.7c3.2,0.6,6.5,0.7,9.9,1c0.9,2,0.4,4.1,0.3,6.9 c-16.7,0-33.4,0-50.4,0c0-1.9,0-4.1,0-7c10.7-1.5,17.1-9.3,23.4-17.3c5.4-6.9,11.2-13.5,17-20.5c-10.1-12.3-20.1-24.5-30.1-36.7 C157.2,210,144,194,130.9,177.9c-1.8-2.2-3.7-3.5-6.6-3.5c-6-0.2-11.9-0.6-18-0.9c-1.4,2.8-0.8,5.7-0.8,8.4 c-0.2,29.1,0.3,58.2-0.6,87.2c-0.7,22.7,14.2,30.3,30.1,31.2c2.8,0.2,5.6,0,8.5,0c1.3,2.4,0.7,4.7,0.6,7.3 C103.9,307.6,63.8,307.6,23.2,307.6z M105.2,158.7c21.8,1.1,42.6,0.5,62.3-8.1c23.7-10.3,37.7-27.7,39.6-54.2 c1.7-24.7-9.6-43.9-32.2-52.7c-17.2-6.6-35.3-8.1-53.4-6.1c-14.4,1.6-16.9,8.5-16.7,19c0.4,23.4,0.3,46.8,0.4,70.2 C105.3,137.4,105.2,147.9,105.2,158.7z',
    /* 0 (Null Symbol) */
    'M244.2,48.1C255.1,36,265.9,24,277.1,11.6c8.4,7.4,16.7,14.7,25.4,22.3 c-10.8,11.8-21.5,23.5-32.4,35.4c11.6,12,20.7,25.3,26.8,40.6c23.9,60.2,9.8,142.1-60,180c-28.9,15.7-60,20.6-92.4,18 c-25.6-2.1-49.3-9.7-70.3-25.4c-11.2,12-22.3,23.8-33.7,36c-8.5-7.3-16.8-14.4-25.4-21.7c11.3-12.3,22.3-24.4,33.6-36.7 c-10.7-11.7-19.1-24.7-23.9-39.5c-16.3-50.1-13.3-98,19-141.4c20.2-27.2,48.5-42.4,81.3-48.9c37.3-7.5,73.6-4.7,108.3,12.1 C236.8,43.9,240.2,45.9,244.2,48.1z M116.3,237.1c0.9,2.1,2.6,2.8,4.1,3.8c9.4,6.2,19.8,8.9,30.8,10.3c35,4.6,68.4-14.4,82.1-46.9 c7.8-18.6,9-37.9,5.5-57.7c-1.9-10.6-5.5-20.4-12.6-29.3C189.4,157.5,152.8,197.3,116.3,237.1z M93.1,211.2 c36.7-39.8,73-79.3,109.6-119.1c-10.2-6.9-21.1-9.5-32.4-10.6c-35.6-3.3-66.3,12.1-81,45.1c-7.8,17.5-9.6,35.8-7,54.6 C83.7,191.8,86.7,201.9,93.1,211.2z',
  ]

  for (let x = 0; x < g.exc.max; x++) {
    const pathsRay = Array.from({ length: g.exc.path.length }, (_, i) => padStr(i))
    const shuffled = shuffleArray(pathsRay)
    const fillColor = randOcolor()

    const excEl = g.document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    excEl.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
    excEl.setAttribute('viewBox', '0 0 320.4 324.8')
    excEl.setAttribute('id', `ex${padStr(x)}`)
    excEl.classList.add('exc')

    g.exc.path.forEach((d, i) => {
      const pathEl = g.document.createElementNS('http://www.w3.org/2000/svg', 'path')
      pathEl.setAttribute('d', d)
      pathEl.setAttribute('fill', fillColor)
      pathEl.setAttribute('stroke', '#000')
      pathEl.setAttribute('stroke-miterlimit', '10')
      pathEl.setAttribute('stroke-linecap', 'square')
      pathEl.setAttribute('stroke-opacity', '1')
      pathEl.setAttribute('stroke-width', '11')
      pathEl.classList.add(`xPath${shuffled[i]}`)
      if (Number(shuffled[i]) !== 0) pathEl.classList.add('xPath')
      excEl.appendChild(pathEl)
    })

    g.el.excWrapper.appendChild(excEl)
  }

  gsap.set('.exc', {
    scaleX: 3,
    scaleY: 0,
    rotateX: -108,
    translateY: 604.5,
    translateZ: -164,
    translateX: 148,
  })
}

const ex = () => {
  if (g.scene.current >= 11) {
    const excTL01 = new TL({ defaults: { overwrite: 'auto' } })
    const padEx = padStr(g.exc.which)
    excTL01.fromTo(`#ex${padEx}`, {
      opacity: 1,
      rotateX: -108,
      scaleX: 3,
      scaleY: 0,
      transformOrigin: '50% 100%',
      translateX: 148,
      translateY: 604.5,
      translateZ: -164,
    }, {
      duration: 0.25,
      scaleX: 1,
      scaleY: 1,
      overwrite: true,
    })
      .to(`#ex${padEx}`, {
        duration: 0.75,
        ease: 'power1.out',
        scale: 1.5,
        translateZ: -86,
        translateX: '+=4',
        onComplete: () => {
          claim(padEx)
        },
      }, '>')
    g.exc.which++
    if (g.exc.which >= g.exc.max) g.exc.which = 0
  }
}

const claim = whEx => {
  if (g.scene.current >= 11) {
    const excTL02 = new TL({ defaults: { overwrite: 'auto' } })
    const randSpeed = randOnum(12, 16) / 4
    excTL02.to(`#ex${whEx}`, {
      duration: randSpeed * 2,
      ease: 'none',
      fill: randOcolor(),
      motionPath: {
        align: '#excOrbit',
        alignOrigin: [ 0.5, 0.5 ],
        path: '#excOrbit',
        start: g.exc.dir ? 0 : 1,
        end: g.exc.dir ? 1 : 0,
      },
      repeat: -1,
    // overwrite: true,
    }, 0)
      .to(`#ex${whEx}`, {
        duration: randSpeed,
        ease: 'power1.in',
        opacity: -0.5,
        repeat: -1,
        scale: 0,
        yoyo: true,
      }, 0)
    g.exc.path.forEach((_, i) => {
      if (i + 1 < g.exc.path.length) {
        excTL02.to(`#ex${whEx} .xPath00`, {
          duration: 1,
          fill: randOcolor(),
          morphSVG: `#ex${whEx} .xPath${padStr(i + 1)}`,
        }, i === 0 ? 0 : '<2.5')
      }
    })
    excTL02.to(`#ex${whEx}`, {
      duration: 2.5,
      fill: randOcolor(),
      opacity: 0,
    }, '>')
    g.exc.dir = g.exc.dir ? 0 : 1
  }
}

const moveLionEyes = () => {
  const thirdEyeDeets = g.el.phasingRainbow.getBoundingClientRect()
  let translateY = -((thirdEyeDeets.y + 50 - g.m.y) / 42)
  if (translateY < 0) translateY *= 1.5
  g.lion.eyes.followMouseQuickSetter({
    translateX: gsap.utils.clamp(-16, 12.44, -(thirdEyeDeets.x + (thirdEyeDeets.width / 2) - g.m.x) / 54),
    translateY: gsap.utils.clamp(-7, 9.55, translateY),
  })
}

export { moveLionEyes, setLionHead }
