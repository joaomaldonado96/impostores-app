import React, { useState } from 'react'

export default function PlayerList({ players, onAdd, onRemove }){
  const [name, setName] = useState('')
  return (
    <div>
      <div className="add-row">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre del jugador"
        />
        <button className="btn" onClick={() => { onAdd(name); setName('') }}>Añadir</button>
      </div>

      <ul className="players-list">
        {players.map((p, i) => (
          <li key={p.id} className="player-item">
            <span>{p.name}</span>
            <div className="player-actions">
              <small>#{i+1}</small>
              <button className="link" onClick={() => onRemove(p.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
