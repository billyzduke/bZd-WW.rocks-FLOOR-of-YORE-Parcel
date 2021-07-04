import * as THREE from 'three'

import assBodyCenterLower from 'url:/src/future/bttf-tunnel/delorean/body/bodyCenterLower.png'
import assBodyCenterMiddle from 'url:/src/future/bttf-tunnel/delorean/body/bodyCenterMiddle.png'
import assBodyCenterUpper from 'url:/src/future/bttf-tunnel/delorean/body/bodyCenterUpper.png'
import assSideWindow from 'url:/src/future/bttf-tunnel/delorean/body/sideWindow.png'
import assRoof from 'url:/src/future/bttf-tunnel/delorean/body/roof.png'
import assWindShieldFrame from 'url:/src/future/bttf-tunnel/delorean/body/windShieldFrame.png'
import assWindShieldGlass from 'url:/src/future/bttf-tunnel/delorean/body/windShieldGlass.png'
import assHood from 'url:/src/future/bttf-tunnel/delorean/body/hood.png'
import assBodyFrontLower from 'url:/src/future/bttf-tunnel/delorean/body/bodyFrontLower.png'
import assBodyFrontUpper from 'url:/src/future/bttf-tunnel/delorean/body/bodyFrontUpper.png'
import assBodyFrontCorner from 'url:/src/future/bttf-tunnel/delorean/body/bodyFrontCorner.png'
import assGrille from 'url:/src/future/bttf-tunnel/delorean/body/grille.png'
import assBumperFrontTop from 'url:/src/future/bttf-tunnel/delorean/body/lightBarFront.png'
import assBodyEngineTop from 'url:/src/future/bttf-tunnel/delorean/body/bodyEngineTop.png'
import assBodyEngineBack from 'url:/src/future/bttf-tunnel/delorean/body/bodyEngineBack.png'
import assBodyAftLower from 'url:/src/future/bttf-tunnel/delorean/body/bodyRearLower.png'
import assBodyAftMiddle from 'url:/src/future/bttf-tunnel/delorean/body/bodyRearMiddle.png'
import assBodyAftUpper from 'url:/src/future/bttf-tunnel/delorean/body/bodyRearUpper.png'
import assBodyAftCorner from 'url:/src/future/bttf-tunnel/delorean/body/bodyRearCorner.png'
import assBodyEngineLeft from 'url:/src/future/bttf-tunnel/delorean/body/bodyEngineUpperLeft.png'
import assBodyEngineRight from 'url:/src/future/bttf-tunnel/delorean/body/bodyEngineUpperRight.png'
import assBodyBackPlate from 'url:/src/future/bttf-tunnel/delorean/body/bodyBackPlate.png'
import assBodyBackLedge from 'url:/src/future/bttf-tunnel/delorean/body/bodyBackLedge.png'
import assBumperAftTop from 'url:/src/future/bttf-tunnel/delorean/body/bumperAftTop.jpg'
import assBumperAftBottom from 'url:/src/future/bttf-tunnel/delorean/body/bumperAftBottom.jpg'
import * as threeMake from '/src/shared/three/make'
import { makeSideViewMirror } from '/src/future/bttf-tunnel/delorean/exterior/_'

const makeBody = () => ( {
  struct: [ 432, 1000, 300 ],
  children: {
    bcLowerL: {
      txtAss: assBodyCenterLower,
      struct: [ 103, 460 ],
      pivot: [ 51.5 ],
      position: [ 216, 9.5 ],
      rotation: [ 0, 90 ],
    },
    bcLowerR: {
      txtAss: assBodyCenterLower,
      struct: [ 103, 460 ],
      pivot: [ 51.5 ],
      position: [ -216, 9.5 ],
      rotation: [ 0, 90 ],
    },
    bcMiddleL: {
      txtAss: assBodyCenterMiddle,
      struct: [ 61, 729 ],
      pivot: [ 30.5 ],
      position: [ 216, 0, -103 ],
      rotation: [ 0, 120 ],
    },
    bcMiddleR: {
      txtAss: assBodyCenterMiddle,
      struct: [ 61, 729 ],
      pivot: [ 30.5 ],
      position: [ -216, 0, -103 ],
      rotation: [ 0, 60 ],
    },
    bcUpperL: {
      struct: [ 100, 359 ],
      pivot: [ 50 ],
      position: [ 186, -27.5, -155 ],
      children: {
        bcUpperFrameL: {
          txtAss: assBodyCenterUpper,
          struct: [ 100, 359 ],
          pivot: [ 50 ],
          rotation: [ 0, 132.5 ],
        },
        sideViewMirrorL: makeSideViewMirror( 'L' ),
      },
    },
    bcUpperR: {
      struct: [ 100, 359 ],
      pivot: [ 50 ],
      position: [ -186, -27.5, -155 ],
      children: {
        bcUpperFrameR: {
          txtAss: assBodyCenterUpper,
          struct: [ 100, 359 ],
          pivot: [ 50 ],
          rotation: [ 0, 47.5 ],
        },
        sideViewMirrorR: makeSideViewMirror( 'R' ),
      },
    },
    sideWindowL: {
      txtAss: assSideWindow,
      struct: [ 100, 359 ],
      pivot: [ 50 ],
      position: [ 185.5, -27.5, -155 ],
      rotation: [ 0, 132.5 ],
      msh: { opacity: 0 }, // <- DELETE ME
    },
    sideWindowR: {
      txtAss: assSideWindow,
      struct: [ 100, 359 ],
      pivot: [ 50 ],
      position: [ -185.5, -27.5, -155 ],
      rotation: [ 0, 47.5 ],
      msh: { opacity: 0 }, // <- DELETE ME
    },
    roof: {
      txtAss: assRoof,
      struct: [ 251.5, 195 ],
      position: [ 0, -98.5, -220.5 ],
      // msh: { opacity: 0.36 }, // <- DELETE ME
    },
    windShield: {
      children: {
        windShieldFrame: {
          txtAss: assWindShieldFrame,
          struct: [ 375, 167 ],
          pivot: [ 0, -82.5 ],
          position: [ 0, 149.5, -154 ],
          rotation: [ 23.5 ],
          msh: { opacity: 0.36 }, // <- DELETE ME
        },
        windShieldGlass: {
          txtAss: assWindShieldGlass,
          struct: [ 375, 167 ],
          pivot: [ 0, -82.5 ],
          position: [ 0, 149.25, -154 ],
          rotation: [ 23.5 ],
          mat: THREE.MeshStandardMaterial,
          msh: {
            color: 0x001133,
            metalness: 1,
            roughness: 0,
            premultipliedAlpha: true,
            opacity: 0,
          },
        },
      },
    },
    hood: {
      txtAss: assHood,
      struct: [ 387, 314 ],
      pivot: [ 0, -157 ],
      position: [ 0, 463, -133.5 ],
      rotation: [ 4 ],
    },
    bfLowerL: {
      txtAss: assBodyFrontLower,
      struct: [ 81, 119 ],
      pivot: [ -40.5, 59.5 ],
      position: [ 216, 363, -104 ],
      rotation: { y: 90, x: -12.325 }, // sometimes you have to rotate multiple axes in a specific order. sigh.
    },
    bfLowerR: {
      txtAss: assBodyFrontLower,
      struct: [ 81, 119 ],
      pivot: [ -40.5, 59.5 ],
      position: [ -216, 363, -104 ],
      rotation: { y: 90, x: 12.325 },
    },
    bfUpperL: {
      txtAss: assBodyFrontUpper,
      struct: [ 44, 121 ],
      pivot: [ 22, 60.5 ],
      position: [ 216, 363, -103 ],
      rotation: { z: 12.325, y: 120 },
    },
    bfUpperR: {
      txtAss: assBodyFrontUpper,
      struct: [ 44, 121 ],
      pivot: [ 22, 60.5 ],
      position: [ -216, 363, -103 ],
      rotation: { z: -12.325, y: 60 },
    },
    bfCornerL: {
      txtAss: assBodyFrontCorner,
      struct: [ 24, 17 ],
      pivot: [ -12, -8.5 ],
      position: [ 216, 364, -103 ],
      rotation: { y: 90 },
    },
    bfCornerR: {
      txtAss: assBodyFrontCorner,
      struct: [ 24, 17 ],
      pivot: [ -12, -8.5 ],
      position: [ -216, 364, -103 ],
      rotation: { y: 90 },
    },
    grille: {
      txtAss: assGrille,
      struct: [ 382, 36 ],
      pivot: [ 0, -18 ],
      position: [ 0, 481, -102.5 ],
      rotation: { x: 59.5 },
    },
    bumperFrontBottomUpper: {
      color: threeMake.color( 0x18171d ),
      struct: [ 381, 24 ],
      pivot: [ 0, -12 ],
      position: [ 0, 480, -67.5 ],
      rotation: { x: -16 },
    },
    bumperFrontBottomMiddle: {
      color: threeMake.color( 0x101010 ),
      struct: [ 381, 24 ],
      pivot: [ 0, -12 ],
      position: [ 0, 464, -42 ],
      rotation: { x: 90 },
    },
    bumperFrontBottomLower: {
      color: threeMake.color( 0x2f2f2f ),
      struct: [ 381, 24 ],
      pivot: [ 0, -12 ],
      position: [ 0, 483, -37 ],
      rotation: { x: 34.5 },
    },
    bumperFrontTop: {
      txtAss: assBumperFrontTop,
      struct: [ 382, 36 ],
      pivot: [ 0, -18 ],
      position: [ 0, 480, -67.5 ],
      rotation: { x: 90 },
    },
    engineTop: {
      txtAss: assBodyEngineTop,
      struct: [ 316, 170 ],
      pivot: [ 0, -85 ],
      position: [ 0, -196, -220.5 ],
      rotation: { x: -11 },
    },
    engineBack: {
      txtAss: assBodyEngineBack,
      struct: [ 333, 99 ],
      pivot: [ 0, -49.5 ],
      position: [ 0, -361, -188 ],
      rotation: { x: -19 },
    },
    baLowerL: {
      txtAss: assBodyAftLower,
      struct: [ 77, 126 ],
      pivot: [ 38.5, -63 ],
      position: [ 216, -364, -26 ],
      rotation: { y: 90, x: 13 },
    },
    baLowerR: {
      txtAss: assBodyAftLower,
      struct: [ 77, 126 ],
      pivot: [ 38.5, -63 ],
      position: [ -216, -364, -26 ],
      rotation: { y: 90, x: -13 },
    },
    baMiddleL: {
      txtAss: assBodyAftMiddle,
      struct: [ 61, 126 ],
      pivot: [ 30.5, -63 ],
      position: [ 216, -364, -103 ],
      rotation: { z: -12.325, y: 120 },
    },
    baMiddleR: {
      txtAss: assBodyAftMiddle,
      struct: [ 61, 126 ],
      pivot: [ 30.5, -63 ],
      position: [ -216, -364, -103 ],
      rotation: { z: 12.325, y: 60 },
    },
    baUpperL: {
      txtAss: assBodyAftUpper,
      struct: [ 49, 98 ],
      pivot: [ 24.5, -49 ],
      position: [ 187, -358, -155.5 ],
      rotation: { z: -12.325, y: 129.5 },
    },
    baUpperR: {
      txtAss: assBodyAftUpper,
      struct: [ 49, 98 ],
      pivot: [ 24.5, -49 ],
      position: [ -187, -358, -155.5 ],
      rotation: { z: 12.325, y: 50.5 },
    },
    baCornerL: {
      txtAss: assBodyAftCorner,
      struct: [ 27, 17 ],
      pivot: [ -13.5, 8.5 ],
      position: [ 216, -364, -103 ],
      rotation: { y: 90 },
    },
    baCornerR: {
      txtAss: assBodyAftCorner,
      struct: [ 27, 17 ],
      pivot: [ -13.5, 8.5 ],
      position: [ -216, -364, -103 ],
      rotation: { y: 90 },
    },
    engineLeft: {
      txtAss: assBodyEngineLeft,
      struct: [ 87, 157 ],
      pivot: [ 42.75, -78.5 ],
      position: [ 185.5, -206, -155 ],
      rotation: { y: 132.5 },
    },
    engineRight: {
      txtAss: assBodyEngineRight,
      struct: [ 87, 157 ],
      pivot: [ 42.75, -78.5 ],
      position: [ -185.5, -206.5, -155 ],
      rotation: { y: 47.5 },
    },
    bBackPlate: {
      txtAss: assBodyBackPlate,
      struct: [ 376, 52.5 ],
      pivot: [ 0, -25 ],
      position: [ 0, -475, -109 ],
      rotation: { x: 114 },
    },
    bBackLedge: {
      txtAss: assBodyBackLedge,
      struct: [ 381, 13 ],
      pivot: [ 0, -6.5 ],
      position: [ 0, -475, -109 ],
      rotation: { x: -22 },
    },
    bumperAftUpper: {
      txtAss: assBumperAftTop,
      struct: [ 375.5, 33 ],
      pivot: [ 0, 16.5 ],
      position: [ 0, -486.5, -71 ],
      rotation: { x: -90, y: 180 },
    },
    bumperAftMiddle: {
      color: threeMake.color( 0x101010 ),
      struct: [ 377, 9 ],
      pivot: [ 0, 4.5 ],
      position: [ 0, -487, -71 ],
      // rotation: { x: 7.125 },
    },
    bumperAftLower: {
      txtAss: assBumperAftBottom,
      struct: [ 378.5, 43 ],
      pivot: [ 0, 25 ],
      position: [ 0, -480, -37 ],
      rotation: { x: -90, y: 180 },
    },
  },
} )

export { makeBody }
