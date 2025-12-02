import React from "react";

export default function Result({ word, impostors = [], onNew }) {
    return (
        <div className="result-screen">
            <header>
                <h2>Resultado de la partida</h2>
            </header>

            <div className="result-content">
                <h3>Palabra seleccionada:</h3>
                <p className="word">{word}</p>

                <h3>Impostores:</h3>
                <ul>
                    {impostors.map((p) => (
                        <li key={p.id} className="impostor">
                            {p.name}
                        </li>
                    ))}
                </ul>

                <button className="btn danger" onClick={onNew}>
                    Nueva ronda
                </button>
            </div>
        </div>
    );
}
