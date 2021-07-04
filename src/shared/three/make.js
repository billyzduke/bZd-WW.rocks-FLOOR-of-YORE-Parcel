import * as THREE from 'three'

import g from '/src/shared/_'
import { devLog, isFunction } from '/src/shared/utils'

const color = ( colorVal = 0x000000 ) => new THREE.Color( colorVal )

const createVector2s = v2s => {
  if ( !v2s || !v2s.length ) return false
  const makeV2 = []
  const madeV2s = []
  v2s.forEach( v2 => {
    g.bttf.xy.forEach( ( axis, i ) => {
      makeV2[i] = typeof v2[axis] !== 'undefined' && v2[axis] ? v2[axis] : v2[i] || 0
    } )
    madeV2s.push( new THREE.Vector2( makeV2[0], makeV2[1] ) )
  } )
  return madeV2s
}

const createVector3s = v3s => {
  if ( !v3s || !v3s.length ) return false
  const makeV3 = []
  const madeV3s = []
  v3s.forEach( v3 => {
    g.bttf.xyz.forEach( ( axis, i ) => {
      makeV3[i] = typeof v3[axis] !== 'undefined' && v3[axis] ? v3[axis] : v3[i] || 0
    } )
    madeV3s.push( new THREE.Vector3( makeV3[0], makeV3[1], makeV3[2] ) )
  } )
  return madeV3s
}

const degToRad = ( degrees = 90 ) => THREE.Math.degToRad( degrees )

const textureLoader = ( txtAss, callBack = () => { } ) => new THREE.TextureLoader().load( txtAss, txt => { if ( isFunction( callBack ) ) callBack( txt ) } )

const visibleHeightAtZDepth = depth => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = g.bttf.camera.position.z
  if ( depth < cameraOffset ) depth -= cameraOffset
  else depth += cameraOffset

  // vertical fov in radians
  const vFOV = ( g.bttf.camera.fov * Math.PI ) / 180

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth )
}

const visibleSizeAtZDepth = depth => {
  const h = visibleHeightAtZDepth( depth )
  const vsz = {
    cy: h / 2,
    h,
    w: h * g.bttf.camera.aspect,
  }
  vsz.cx = vsz.w / 2
  return vsz
}

const setThreeObj = ( obj, makeObj ) => {
  if ( makeObj.position ) translateAxes( obj, makeObj )
  if ( makeObj.rotation ) rotateAxes( obj, makeObj )
  if ( makeObj.matrix ) setMatrix( obj, makeObj )
}

const makeThreeObj = ( obj, makeObj ) => {
  if ( obj && makeObj ) {
    if ( makeObj.children ) {
      makeObj.geo = 'group'
      Object.keys( makeObj.children ).forEach( childObj => makeThreeObj( childObj, makeObj.children[childObj] ) )
    } else if ( makeObj.msh instanceof THREE.Mesh ) {
      if ( g.bttf.obj[obj] ) devLog( `FUCKER! obj "${obj}" already exists!` )
      g.bttf.obj[obj] = { msh: makeObj.msh }
      g.bttf.obj[obj].msh.name = obj
      setThreeObj( obj, makeObj )
      return
    } else if ( !makeObj.geo ) {
      makeObj.geo = 'plane'
    }
    let makeFail, makeMesh
    if ( makeObj.geo !== 'group' && ( ( makeObj.struct && makeObj.struct.length && makeObj.struct.length >= 2 ) || makeObj.geo instanceof THREE.ShapeGeometry ) ) {
      if ( makeObj.geo !== 'group' ) {
        if ( g.bttf.obj[obj] ) devLog( `FUCKER! obj "${obj}" already exists!` )
        g.bttf.obj[obj] = {}
      }
      makeMesh = { ...g.bttf.msh }
      if ( makeObj.msh ) {
        Object.keys( makeObj.msh ).forEach( mshProp => {
          makeMesh[mshProp] = makeObj.msh[mshProp]
        } )
      }
      if ( !makeObj.mat ) makeObj.mat = THREE.MeshBasicMaterial
      if ( makeObj.msh && typeof makeObj.msh.depthWrite !== 'undefined' ) makeObj.mat.depthWrite = makeObj.msh.depthWrite
      if ( makeObj.geo instanceof THREE.ShapeGeometry ) g.bttf.obj[obj].geo = makeObj.geo
    }
    if ( !( makeObj.geo instanceof THREE.ShapeGeometry ) ) {
      switch ( makeObj.geo ) {
        case 'cylinder':
          if ( g.bttf.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] && makeObj.struct[3] ) {
            if ( typeof makeObj.struct[4] === 'undefined' ) makeObj.struct[4] = 1 // heightSegments
            if ( typeof makeObj.struct[5] === 'undefined' ) makeObj.struct[5] = false // openEnded
            g.bttf.obj[obj].geo = new THREE.CylinderGeometry( makeObj.struct[0], makeObj.struct[1], makeObj.struct[2], makeObj.struct[3], makeObj.struct[4], makeObj.struct[5] )
          } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
          break
        case 'sphere':
          if ( g.bttf.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] ) {
            if ( typeof makeObj.struct[3] === 'undefined' ) makeObj.struct[3] = 0 // phiStart
            if ( typeof makeObj.struct[4] === 'undefined' ) makeObj.struct[4] = Math.PI * 2 // phiLength
            if ( typeof makeObj.struct[5] === 'undefined' ) makeObj.struct[5] = 0 // phiStart
            if ( typeof makeObj.struct[6] === 'undefined' ) makeObj.struct[6] = Math.PI // phiLength
            g.bttf.obj[obj].geo = new THREE.SphereGeometry( makeObj.struct[0], makeObj.struct[1], makeObj.struct[2], makeObj.struct[3], makeObj.struct[4], makeObj.struct[5], makeObj.struct[6] )
          } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
          break
        case 'torus':
          if ( g.bttf.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] && makeObj.struct[3] ) {
            if ( typeof makeObj.struct[4] === 'undefined' ) makeObj.struct[4] = Math.PI * 2 // arc
            g.bttf.obj[obj].geo = new THREE.TorusGeometry( makeObj.struct[0], makeObj.struct[1], makeObj.struct[2], makeObj.struct[3], makeObj.struct[4] )
          } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
          break
        case 'box':
          if ( g.bttf.obj[obj] && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2] ) {
            g.bttf.obj[obj].geo = new THREE.BoxGeometry( makeObj.struct[0], makeObj.struct[1], makeObj.struct[2] )
          } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
          break
        case 'circle':
          if ( g.bttf.obj[obj] && makeObj.struct[0] && makeObj.struct[1] ) {
            g.bttf.obj[obj].geo = new THREE.CircleGeometry( makeObj.struct[0], makeObj.struct[1] )
          } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
          break
        case 'plane':
          if ( g.bttf.obj[obj] && makeObj.struct[0] && makeObj.struct[1] ) {
            g.bttf.obj[obj].geo = new THREE.PlaneGeometry( makeObj.struct[0], makeObj.struct[1] )
          } else makeFail = { obj, makeFail: makeObj, failedOn: { geo: makeObj.geo } }
          break
        case 'group':
        default:
          // if (makeObj.pivot && makeObj.struct && makeObj.struct[0] && makeObj.struct[1] && makeObj.struct[2]) {
          //   console.log({ groupBox: makeObj })
          //   g.bttf.grp[obj] = new THREE.Mesh(new THREE.BoxGeometry(makeObj.struct[0], makeObj.struct[1], makeObj.struct[2]), new THREE.MeshBasicMaterial({ opacity: 0, transparent: true }))
          //   setPivot(g.bttf.grp[obj], makeObj)
          // } else {
          if ( g.bttf.grp[obj] ) devLog( `FUCKER! grp "${obj}" already exists!` )
          g.bttf.grp[obj] = new THREE.Group()
          g.bttf.grp[obj].name = obj
        // }
      }
    }
    if ( makeFail ) devLog( makeFail )
    else if ( g.bttf.obj[obj] && g.bttf.obj[obj].geo && makeMesh && makeObj.mat ) {
      if ( makeObj.mkr ) g.bttf.obj[obj].mkr = makeObj.mkr
      if ( makeObj.txtAss ) makeMesh.map = g.bttf.obj[obj].txt = textureLoader( makeObj.txtAss )
      if ( typeof makeObj.color !== 'undefined' ) makeMesh.color = g.bttf.obj[obj].hex = makeObj.color
      // eslint-disable-next-line new-cap
      g.bttf.obj[obj].mat = isFunction( makeObj.mat ) ? new makeObj.mat( makeMesh ) : makeObj.mat
      if ( g.bttf.obj[obj].mat instanceof THREE.MeshStandardMaterial && g.bttf.obj[obj].txt ) {
        g.bttf.obj[obj].mat.emissive = color( 'white' )
        g.bttf.obj[obj].mat.emissiveMap = g.bttf.obj[obj].txt
      }
      if ( makeObj.pivot ) setPivot( g.bttf.obj[obj], makeObj )
      if ( g.bttf.obj[obj].geo && g.bttf.obj[obj].mat ) g.bttf.obj[obj].msh = new THREE.Mesh( g.bttf.obj[obj].geo, g.bttf.obj[obj].mat )
      if ( g.bttf.obj[obj].msh ) {
        g.bttf.obj[obj].msh.name = obj
        g.bttf.obj[obj].msh.castShadow = true // default is false
        g.bttf.obj[obj].msh.receiveShadow = true // default is false
        setThreeObj( obj, makeObj )
      }
    } else if ( makeObj.children && g.bttf.grp[obj] ) {
      Object.keys( makeObj.children ).forEach( childObj => {
        // if (g.bttf.grp[childObj]) devLog(g.bttf.grp[childObj])
        // if (g.bttf.grp[childObj] || g.bttf.obj[childObj]) {
        //   if (g.bttf.grp[childObj]) g.bttf.grp[childObj].updateMatrix()
        //   else if (g.bttf.obj[childObj].msh) g.bttf.obj[childObj].msh.updateMatrix()
        //   else g.bttf.obj[childObj].updateMatrix()
        //   g.bttf.grp[obj].geometry.merge(g.bttf.obj[childObj] ? g.bttf.obj[childObj].msh.geometry || g.bttf.obj[childObj].geometry : g.bttf.grp[childObj].geometry, g.bttf.obj[childObj] ? g.bttf.obj[childObj].msh.matrix || g.bttf.obj[childObj].matrix : g.bttf.grp[childObj].matrix)
        // }
        if ( g.bttf.grp[childObj] || g.bttf.obj[childObj] ) g.bttf.grp[obj].add( g.bttf.obj[childObj] ? g.bttf.obj[childObj].msh || g.bttf.obj[childObj] : g.bttf.grp[childObj] )
      } )
      setThreeObj( obj, makeObj )
    }
  }
}

const objOrGrp = obj => ( g.bttf.obj[obj] && g.bttf.obj[obj].msh ? g.bttf.obj[obj].msh : g.bttf.grp[obj] )

const setMatrix = ( obj, makeObj ) => {
  const mvMe = objOrGrp( obj )
  mvMe.matrix.set( makeObj.matrix )
  mvMe.matrixAutoUpdate = false
}

const setPivot = ( msh, makeObj ) => {
  if ( msh.geo ) msh.geo.translate( makeObj.pivot[0] || 0, makeObj.pivot[1] || 0, makeObj.pivot[2] || 0 )
}

const translateAxes = ( obj, makeObj ) => {
  const mvMe = objOrGrp( obj )
  g.bttf.xyz.forEach( ( axis, i ) => {
    if ( typeof makeObj.position[i] !== 'undefined' && makeObj.position[i] ) mvMe.position[axis] = makeObj.position[i]
  } )
}

const rotateAxes = ( obj, makeObj ) => {
  const mvMe = objOrGrp( obj )
  Object.keys( makeObj.rotation ).forEach( axis => {
    if ( makeObj.rotation[axis] ) {
      const rotateAxis = `rotate${g.bttf.xyz.includes( axis ) ? axis.toUpperCase() : g.bttf.xyz[axis].toUpperCase()}`
      const rotateRad = degToRad( makeObj.rotation[axis] )
      mvMe[rotateAxis]( rotateRad )
    }
  } )
}

export {
  color, createVector2s, createVector3s, degToRad, makeThreeObj, textureLoader, visibleHeightAtZDepth, visibleSizeAtZDepth,
}
