import g from '/src/js/glob'

const setDiscoWall = () => {
  if ( g.el.discoWall ) {
    setTimeout( () => {
      g.el.discoWall.src = 'https://wrongwindows.rocks/disco-wall'
    }, 3000 )
  }
}

export { setDiscoWall }

