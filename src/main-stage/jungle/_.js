import { gsap, TimelineMax as TL } from 'gsap'

import assMandelBrush from 'url:/src/main-stage/jungle/fractal-brush.png'
import assTruffulaTree01 from 'url:/src/main-stage/jungle/TruffulaTree-1.png'
import assTruffulaTree02 from 'url:/src/main-stage/jungle/TruffulaTree-2.png'
import assTruffulaTree03 from 'url:/src/main-stage/jungle/TruffulaTree-3.png'
import assTruffulaTree04 from 'url:/src/main-stage/jungle/TruffulaTree-4.png'
import assWildTree01 from 'url:/src/main-stage/jungle/WildTree-1.png'
import assWildTree02 from 'url:/src/main-stage/jungle/WildTree-2.png'
import g from '/src/shared/_'
import { padStr, randoNum, shuffleArray } from '/src/shared/utils'

const assJungleLayers = [
  assWildTree01,
  assWildTree02,
  assTruffulaTree01,
  assTruffulaTree02,
  assTruffulaTree03,
  assTruffulaTree04,
  assMandelBrush,
]

const setJungleSagan = () => {
  const saganIpsum = "Bits of moving fluff are creatures of the cosmos take root and flourish. Cambrian explosion astonishment great turbulent clouds. Culture ship of the imagination with pretty stories for which there's little good evidence Rig Veda dispassionate extraterrestrial observer? Prime number at the edge of forever vastness is bearable only through love extraordinary claims require extraordinary evidence from which we spring? Citizens of distant epochs concept of the number one courage of our questions not a sunrise but a galaxyrise. Stirred by starlight Tunguska event cosmic fugue. Muse about hearts of the stars inconspicuous motes of rock and gas dream of the mind's eye vanquish the impossible. Permanence of the stars dispassionate extraterrestrial observer rings of Uranus star stuff harvesting star light vanquish the impossible? Stirred by starlight culture dispassionate extraterrestrial observer network of wormholes rich in heavy atoms? Extraplanetary hearts of the stars hundreds of thousands paroxysm of global death? As a patch of light something incredible is waiting to be known a still more glorious dawn awaits made in the interiors of collapsing stars. Euclid galaxies the ash of stellar alchemy take root and flourish. Vastness is bearable only through love dream of the mind's eye encyclopaedia galactica vanquish the impossible something incredible is waiting to be known citizens of distant epochs. A still more glorious dawn awaits star stuff harvesting star light astonishment citizens of distant epochs. A very small stage in a vast cosmic arena citizens of distant epochs brain is the seed of intelligence bits of moving fluff star stuff harvesting star light a mote of dust suspended in a sunbeam. With pretty stories for which there's little good evidence vanquish the impossible dispassionate extraterrestrial observer how far away gathered by gravity? Rings of Uranus from which we spring network of wormholes intelligent beings across the centuries something incredible is waiting to be known. Ship of the imagination the only home we've ever known concept of the number one made in the interiors of collapsing stars. The only home we've ever known star stuff harvesting star light citizens of distant epochs vanquish the impossible paroxysm of global death. Concept of the number one galaxies, a mote of dust suspended in a sunbeam network of wormholes across the centuries. Laws of physics birth encyclopaedia galactica birth emerged into consciousness the only home we've ever known and billions upon billions upon billions upon billions upon billions upon billions upon billions. Extraordinary claims require extraordinary evidence star stuff harvesting star light a still more glorious dawn awaits gathered by gravity as a patch of light made in the interiors of collapsing stars. Rich in heavy atoms vastness is bearable only through love concept of the number one another world not a sunrise but a galaxyrise. Emerged into consciousness preserve and cherish that pale blue dot finite but unbounded a mote of dust suspended in a sunbeam invent the universe. Drake Equation billions upon billions extraordinary claims require extraordinary evidence inconspicuous motes of rock and gas? Cosmic ocean globular star cluster. Concept of the number one great turbulent clouds courage of our questions two ghostly white figures in coveralls and helmets are softly dancing not a sunrise but a galaxyrise. Something incredible is waiting to be known, science finite but unbounded, rich in mystery? Realm of the galaxies laws of physics from which we spring, extraordinary claims require extraordinary evidence? Courage of our questions emerged into consciousness permanence of the stars? Vangelis light years another world of brilliant syntheses something incredible is waiting to be known hearts of the stars. How far away tingling of the spine flatland rich in heavy atoms network of wormholes. A still more glorious dawn awaits bits of moving fluff concept of the number one the only home we've ever known network of wormholes kindling the energy hidden in matter. Dispassionate extraterrestrial observer hearts of the stars Drake Equation dream of the mind's eye invent the universe. Tunguska event tesseract gathered by gravity citizens of distant epochs concept of the number one. Network of wormholes, realm of the galaxies rogue corpus callosum two ghostly white figures in coveralls and helmets are softly dancing radio telescope? Dispassionate extraterrestrial observer descended from astronomers cosmic fugue concept of the number one circumnavigated. With pretty stories for which there's little good evidence of brilliant syntheses from which we spring. Concept of the number one Drake Equation made in the interiors of collapsing stars? Realm of the galaxies paroxysm of global death realm of the galaxies cosmic ocean extraordinary claims require extraordinary evidence? Of brilliant syntheses cosmos consciousness descended from astronomers another world Vangelis? Two ghostly white figures in coveralls and helmets are softly dancing extraordinary claims require extraordinary evidence citizens of distant epochs billions upon billions with pretty stories for which there's little good evidence dispassionate extraterrestrial observer. From which we spring permanence of the stars invent the universe invent the universe permanence of the stars. The sky calls to us rings of Uranus Sea of Tranquility circumnavigated another world? Hundreds of thousands with pretty stories for which there's little good evidence. Extraplanetary star stuff harvesting star light with pretty stories for which there's little good evidence a billion trillion Cambrian explosion. A very small stage in a vast cosmic arena encyclopaedia galactica stirred by starlight rich in mystery courage of our questions a still more glorious dawn awaits. Dream of the mind's eye a still more glorious dawn awaits something incredible is waiting to be known inconspicuous motes of rock and gas a still more glorious dawn awaits the only home we've ever known and billions upon billions upon billions upon billions upon billions upon billions upon billions.Radio telescope bits of moving fluff descended from astronomers culture Drake Equation quasar. Another world something incredible is waiting to be known vastness is bearable only through love astonishment Orion's sword vanquish the impossible. Shores of the cosmic ocean with pretty stories for which there's little good evidence made in the interiors of collapsing stars invent the universe stirred by starlight finite but unbounded. Kindling the energy hidden in matter Sea of Tranquility the carbon in our apple pies astonishment vanquish the impossible not a sunrise but a galaxyrise. Rogue permanence of the stars rich in heavy atoms take root and flourish Orion's sword a mote of dust suspended in a sunbeam. Jean-François Champollion from which we spring network of wormholes descended from astronomers are creatures of the cosmos decipherment. The sky calls to us Euclid Euclid network of wormholes as a patch of light citizens of distant epochs. With pretty stories for which there's little good evidence Sea of Tranquility with pretty stories for which there's little good evidence extraordinary claims require extraordinary evidence concept of the number one emerged into consciousness? Cosmic fugue the carbon in our apple pies the only home we've ever known of brilliant syntheses shores of the cosmic ocean birth. Across the centuries radio telescope laws of physics vanquish the impossible Tunguska event another world. With pretty stories for which there's little good evidence another world bits of moving fluff a very small stage in a vast cosmic arena inconspicuous motes of rock and gas are creatures of the cosmos. Circumnavigated science stirred by starlight Hypatia finite but unbounded realm of the galaxies? Rich in heavy atoms great turbulent clouds network of wormholes Vangelis descended from astronomers rings of Uranus. Rings of Uranus a very small stage in a vast cosmic arena made in the interiors of collapsing stars concept of the number one the ash of stellar alchemy descended from astronomers. Paroxysm of global death a still more glorious dawn awaits gathered by gravity citizens of distant epochs are creatures of the cosmos bits of moving fluff. As a patch of light extraordinary claims require extraordinary evidence realm of the galaxies with pretty stories for which there's little good evidence Apollonius of Perga billions upon billions. Made in the interiors of collapsing stars two ghostly white figures in coveralls and helmets are softly dancing Cambrian explosion Rig Veda the sky calls to us with pretty stories for which there's little good evidence. The only home we've ever known star stuff harvesting star light the only home we've ever known dispassionate extraterrestrial observer Drake Equation invent the universe. Orion's sword dispassionate extraterrestrial observer Drake Equation cosmos the sky calls to us Euclid? Network of wormholes white dwarf gathered by gravity descended from astronomers another world from which we spring. Dream of the mind's eye a mote of dust suspended in a sunbeam made in the interiors of collapsing stars shores of the cosmic ocean the only home we've ever known kindling the energy hidden in matter. Euclid galaxies invent the universe two ghostly white figures in coveralls and helmets are softly dancing globular star cluster Sea of Tranquility? Kindling the energy hidden in matter of brilliant syntheses astonishment a mote of dust suspended in a sunbeam courage of our questions from which we spring? Orion's sword network of wormholes inconspicuous motes of rock and gas of brilliant syntheses vastness is bearable only through love astonishment. Prime number Sea of Tranquility a billion trillion Flatland Cambrian explosion rich in mystery? Something incredible is waiting to be known network of wormholes the only home we've ever known the only home we've ever known Apollonius of Perga cosmic ocean. Venture made in the interiors of collapsing stars from which we spring network of wormholes how far away the sky calls to us. Realm of the galaxies white dwarf something incredible is waiting to be known the sky calls to us venture courage of our questions. Realm of the galaxies the sky calls to us Flatland citizens of distant epochs Drake Equation a still more glorious dawn awaits. A mote of dust suspended in a sunbeam bits of moving fluff take root and flourish emerged into consciousness venture trillion? Dream of the mind's eye dream of the mind's eye the ash of stellar alchemy the only home we've ever known extraordinary claims require extraordinary evidence concept of the number one? As a patch of light rich in heavy atoms tingling of the spine quasar birth Jean-François Champollion. Another world extraordinary claims require extraordinary evidence from which we spring a mote of dust suspended in a sunbeam encyclopaedia galactica emerged into consciousness. Realm of the galaxies descended from astronomers with pretty stories for which there's little good evidence descended from astronomers permanence of the stars paroxysm of global death and billions upon billions upon billions upon billions upon billions upon billions upon billions."

  for ( let cs = 0; cs < 4; cs++ ) {
    const jungLorem = g.document.createElement( 'div' )
    jungLorem.classList.add( 'saganIpsum' )
    jungLorem.innerHTML = saganIpsum
    g.el[`jungSagan${cs % 2 ? 'L' : 'R'}`].appendChild( jungLorem )
  }

  gsap.to( '.saganIpsum', {
    duration: 20,
    opacity: 0.64,
    overwrite: 'auto',
  } )
  g.tL.saganIpsum = new TL( { defaults: { overwrite: 'auto' } } )
  g.tL.saganIpsum.to( '.saganIpsum', {
    duration: 180,
    ease: 'none',
    translateY: '-100%',
    repeat: -1,
  } )
}

const setJungleLayer = ( ajl, lyr ) => {
  const jungleJumble = assJungleLayers.length - lyr
  const jungLayerL = g.document.createElement( 'img' )
  jungLayerL.src = ajl
  const jungLayerClass = `jungLayer${padStr( jungleJumble )}`
  jungLayerL.classList.add( 'jungLayer', jungLayerClass )
  const jungLayerR = jungLayerL.cloneNode( true )
  g.el.jungL.appendChild( jungLayerL )
  g.el.jungR.appendChild( jungLayerR )
  const startPos = {
    translateX: '-100%',
    // zIndex: lyr,
  }
  if ( jungleJumble ) {
    const recedeByPx = g.jungle.lyr.shift()
    const adjustFraction = ( ( assJungleLayers.length + recedeByPx ) / assJungleLayers.length )
    startPos.translateZ = recedeByPx / 5
    startPos.filter = `brightness(${adjustFraction * 100}%)` // drop-shadow(0 4.2px 4.2px rgba(0,66,0,0.76))
    startPos.opacity = adjustFraction
  }
  gsap.set( `.${jungLayerClass}`, startPos )
  const jl = {
    lr: jungLayerClass,
    from: startPos,
    to: {
      dl: jungleJumble ? lyr ** 2 * 0.76 + randoNum( 0, 140 ) : 0,
      dr: !jungleJumble ? 180 : ( jungleJumble * 60 ) + 140,
      tx: !jungleJumble ? '51%' : ( jungLayerL.getBoundingClientRect().width * 2 ) + g.document.querySelector( '.jungScreen' ).getBoundingClientRect().width,
    },
  }
  console.log( jl )
  g.tL[jungLayerClass] = new TL()
  g.tL[jungLayerClass].to( `.${jungLayerClass}`, {
    delay: jl.to.dl,
    duration: jl.to.dr,
    ease: 'none',
    onRepeat: function () {
      randOjung( `.${jungLayerClass}` )
    },
    translateX: jl.to.tx,
    repeat: -1,
  } )
}

const setJungleLayers = () => {
  g.jungle.lyr = Array.from( { length: assJungleLayers.length }, ( _, i ) => -( i + 1 ) )
  g.jungle.lyr = shuffleArray( g.jungle.lyr )
  assJungleLayers.forEach( ( ajl, lyr ) => {
    setJungleLayer( ajl, lyr + 1 )
  } )
}

const setJungleMotion = () => {
  setJungleSagan()
  setJungleLayers()
}

const setJungle = () => {
  g.jungle = {}
  gsap.set( '.jungBackDrop, .jungScreen, .jungSagan', {
    height: g.main.h * 1.25,
  } )
  g.el.jungle.style.opacity = 1
}

const randOjung = ajl => {
  gsap.set( ajl, {
    scale: randoNum( 23, 96 ) / 100,
  } )
}

export { setJungle, setJungleMotion }
