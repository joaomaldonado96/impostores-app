import React, { useState, useEffect } from 'react'
import Home from './screens/Home'
import GameRoom from './screens/GameRoom'
import CardsView from './screens/CardsView'
import Result from './screens/Result'
import wordsData from './data/words.json'

export default function App(){
  const [screen, setScreen] = useState('home') // home, room, cards, result
  const [players, setPlayers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('players') || '[]')
    } catch { return [] }
  })
  const [category, setCategory] = useState(Object.keys(wordsData)[0])
  const [word, setWord] = useState(null)
  const [impostorIndex, setImpostorIndex] = useState([]) // ahora es un array
  const [gameState, setGameState] = useState('pre') // pre, playing, finished
  const [numImpostors, setNumImpostors] = useState(1) // impostores personalizables

  // Guardar jugadores en localStorage
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players))
  }, [players])

  const addPlayer = (name) => {
    if(!name?.trim()) return
    setPlayers(p => [...p, { id: Date.now()+Math.random(), name: name.trim() }])
  }
  const removePlayer = (id) => setPlayers(p => p.filter(x => x.id !== id))

  const startGame = () => {
    
      console.log('hola')
    if(players.length < 3) {
      alert('Se necesitan al menos 3 jugadores')
      return
    }

    const list = wordsData[category] || []
    const w = list[Math.floor(Math.random()*list.length)]
    setWord(w)

    // Elegir varios impostores de forma segura
    const shuffledIndices = players.map((_, i) => i).sort(() => Math.random() - 0.5)
    const impostors = shuffledIndices.slice(0, Math.min(numImpostors, players.length - 1))
    setImpostorIndex(impostors)

    setGameState('playing')
    setScreen('cards')
  }

  const newRound = () => {
    setWord(null)
    setImpostorIndex([])
    setGameState('pre')
    setScreen('room')
  }

  const resetAll = () => {
    setPlayers([])
    setWord(null)
    setImpostorIndex([])
    setGameState('pre')
  }

  const goHome = () => {
    resetAll()
    setScreen('home')
  }

  return (
    <div className="app-root">
      {screen === 'home' && <Home onEnter={() => setScreen('room')} />}

      {screen === 'room' && (
        <GameRoom
          players={players}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
          category={category}
          setCategory={setCategory}
          startGame={startGame}
          gameState={gameState}
          setScreen={setScreen}
          resetAll={resetAll}
          goHome={goHome}
          numImpostors={numImpostors}
          setNumImpostors={setNumImpostors} // pasar setter a GameRoom
        />
      )}

      {screen === 'cards' && (
        <CardsView
          players={players}
          word={word}
          impostorIndex={impostorIndex}
          onBack={() => setScreen('room')}
        />
      )}

      {screen === 'result' && (
        <Result
          word={word}
          impostors={impostorIndex.map(i => players[i])}
          onNew={newRound}
        />
      )}
    </div>
  )
}
