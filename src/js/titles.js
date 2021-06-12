import { gsap } from 'gsap'

import g from '/src/js/glob'
import { setAddOn } from '/src/js/utils'
import { setScene } from './scenes'

const setTitles = () => {
  if ( g.el.tpTitle ) {
    const tpTitleW = g.main.w < 2401 ? ( g.main.w * 29 ) / 50 : 1392
    gsap.set( Array.from( g.el.tpTitle ), {
      height: ( tpTitleW * 202 ) / 1392,
      width: tpTitleW,
    } )
  }
}

const drawYore = ( c, n ) => {
  g.tL.yore.set( '#tpTitleYoreAnim path', {
    drawSVG: 0,
  } )
    .to( '#tpTitleScreen', {
      duration: 2,
      // onComplete: function () {
      //   if ( g.el.deLorean && g.el.model && g.el.future.classList.contains( 'model' ) ) spinTime()
      // },
      opacity: 0,
    } )
    .fromTo( '#tpTitleYoreAnim', {
      WebkitFilter: 'grayscale(1)',
      filter: 'grayscale(1)',
    }, {
      duration: 8.23,
      ease: 'none',
      WebkitFilter: 'grayscale(0)',
      filter: 'grayscale(0)',
    }, '>' )
    .to( '#tpTitleYoreAnim path', {
      drawSVG: '100%',
      duration: 2.42,
      onComplete: function () {
        g.tL.yore.to( '#tpTitleYore', {
          duration: 2,
          opacity: 1,
        }, '>' )
          .to( '#tpTitleYoreAnim', {
            duration: 2,
            onComplete: function () {
              g.scene.forCleanUp[c].yoreTitleClick = setAddOn( '#tpTitles', 'click', () => setScene( n ), 'pointer', 'wait' )
            },
            opacity: 0,
          }, '<1' )
      },
      stagger: 0.42,
    }, '<' )
}

export { drawYore, setTitles }
