import g from '/src/shared/_'

const setDiscoWall = () => {
  if ( g.el.discoWall ) {
    setTimeout( () => {
      g.el.discoWall.src = 'https://wrongwindows.rocks/disco-wall'
    }, 3000 )
  }
}

export { setDiscoWall }

