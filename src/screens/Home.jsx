import React from 'react'

export default function Home({ onEnter }){
  return (
    <div className="center-card">
      <h1>Impostores App</h1>
      <p>Versión ligera — juega en un solo celular</p>
      <button className="btn" onClick={onEnter}>Entrar a la sala</button>
    </div>
  )
}
