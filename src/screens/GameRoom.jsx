import React from 'react'
import PlayerList from '../components/PlayerList'
import CategorySelector from '../components/CategorySelector'
import wordsData from '../data/words.json'

export default function GameRoom({
    players,
    addPlayer,
    removePlayer,
    category,
    setCategory,
    startGame,
    gameState,
    setScreen,
    resetAll,
    goHome,
    numImpostors,
    setNumImpostors
}) {
    const categories = Object.keys(wordsData)

    return (
        <div className="room">
            <header className="room-header">
                <h2 className="ghost" onClick={goHome}>Sala de juego</h2>
                <div>
                    <button
                        className="btn ghost"
                        onClick={() => {
                            if (confirm('¿Estás seguro de reiniciar la lista de jugadores?')) resetAll()
                        }}
                    >
                        Nueva lista
                    </button>
                </div>
            </header>

            <div className="room-grid">
                <div className="card">
                    <h3>Jugadores</h3>
                    <PlayerList players={players} onAdd={addPlayer} onRemove={removePlayer} />
                </div>

                <div className="card options-card">
                    <h3 className="card-title">Opciones</h3>

                    <div className="form-group">
                        <label>Categoría</label>
                        <CategorySelector categories={categories} value={category} onChange={setCategory} />
                    </div>

                    <div className="form-group">
                        <label>Número de impostores</label>
                        <select
                            disabled={players.length < 5}
                            value={numImpostors}
                            onChange={(e) => setNumImpostors(+e.target.value)}
                        >
                            {Array.from(
                                { length: Math.floor(players.length - 1) },
                                (_, i) => i + 1
                            ).map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <small className="helper-text">
                            La cantidad de impostores no puede ser mayor que la cantidad de jugadores
                        </small>
                    </div>

                    <p className="players-count">Jugadores: <strong>{players.length}</strong></p>

                    <div className="actions">
                        {gameState === 'pre' && (
                            <button className="btn primary" onClick={startGame} disabled={players.length < 3}>
                                Iniciar partida
                            </button>
                        )}
                        {gameState === 'playing' && (
                            <>
                                <button className="btn second" onClick={() => setScreen('cards')}>
                                    Ver palabras
                                </button>
                                <button className="btn danger" onClick={() => setScreen('result')}>
                                    Finalizar partida
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
