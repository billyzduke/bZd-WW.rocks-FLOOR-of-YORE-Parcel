import * as THREE from 'three'

import g from '/src/shared/_'

const createAtmosphericMaterial = () => {
  const vertexShader = [
    'varying vec3 vVertexWorldPosition;',
    'varying vec3 vVertexNormal;',

    'varying vec4 vFragColor;',

    'void main(){',
    ' vVertexNormal = normalize(normalMatrix * normal);',

    ' vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;',

    ' // set gl_Position',
    ' gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}',
  ].join( '\n' )

  const fragmentShader = [
    'uniform vec3 glowColor;',
    'uniform float coeficient;',
    'uniform float power;',

    'varying vec3 vVertexNormal;',
    'varying vec3 vVertexWorldPosition;',

    'varying vec4 vFragColor;',

    'void main(){',
    ' vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
    ' vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
    ' viewCameraToVertex = normalize(viewCameraToVertex);',
    ' float intensity  = pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
    ' gl_FragColor  = vec4(glowColor, intensity);',
    '}',
  ].join( '\n' )

  // create custom material from the shader code above
  //   that is within specially labeled script tags
  const material = new THREE.ShaderMaterial( {
    uniforms: {
      coeficient: {
        type: 'f',
        value: 1.0,
      },
      power: {
        type: 'f',
        value: 2,
      },
      glowColor: {
        type: 'c',
        value: new THREE.Color( 'white' ),
      },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    // blending : THREE.AdditiveBlending,
    transparent: true,
    // depthWrite: false,
    // alphaMap,
  } )
  return material
}

const GeometricGlowMesh = ( animate = true, geoInner, [ offsetX = 0, offsetY = 0, offsetZ = 0 ] = [], color = 0x00D8FF ) => {
  const object3d = new THREE.Object3D()

  geoInner.scale( 1.01, 1.01, 1.01 )
  geoInner.translate( 0, 2, 0 )
  const matInner = createAtmosphericMaterial()
  matInner.uniforms.glowColor.value = new THREE.Color( color )
  matInner.uniforms.coeficient.value = 1.3
  matInner.uniforms.power.value = animate ? 1.3 : 5
  const innerMesh = new THREE.Mesh( geoInner, [ new THREE.MeshBasicMaterial( { opacity: animate ? 0 : 0.88, transparent: true } ), matInner ] )
  if ( animate ) g.bttf.ani.glo.push( { wax: false, msh: innerMesh } )
  object3d.add( innerMesh )

  const geoOuter = geoInner.clone()
  geoOuter.scale( 1.025, 1.025, 1.025 )
  geoOuter.translate( offsetX, offsetY, offsetZ )
  const matOuter = createAtmosphericMaterial()
  matOuter.uniforms.glowColor.value = new THREE.Color( color )
  matOuter.uniforms.coeficient.value = 0.26
  matOuter.uniforms.power.value = animate ? 0.9 : 5
  matOuter.side = THREE.BackSide
  const outerMesh = new THREE.Mesh( geoOuter, [ new THREE.MeshBasicMaterial( { opacity: animate ? 0 : 0.88, transparent: true } ), matOuter ] )
  if ( animate ) g.bttf.ani.glo.push( { wax: false, msh: outerMesh } )
  object3d.add( outerMesh )

  return {
    object3d,
    innerMesh,
    outerMesh,
  }
}

export { createAtmosphericMaterial, GeometricGlowMesh }
