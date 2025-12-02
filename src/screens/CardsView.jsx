import React, { useState, useRef } from "react";

export default function CardsView({ players, word, impostorIndex, onBack }) {
    const [index, setIndex] = useState(0);
    const [revealed, setRevealed] = useState({});
    const [swipeOffset, setSwipeOffset] = useState(0);

    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState(""); // "next" o "prev"

    const startY = useRef(null);
    const current = players[index];
    const isRevealed = !!revealed[index];

    // Para múltiples impostores
    const isImpostor = Array.isArray(impostorIndex)
        ? impostorIndex.includes(index)
        : index === impostorIndex;

    // ⭐ RESETEA REVEAL DEL JUGADOR
    const resetReveal = (i) => {
        setRevealed((r) => ({ ...r, [i]: false }));
    };
    const showReveal = (i) => {
        setRevealed((r) => ({ ...r, [i]: true }));
    };

    // ⭐ ANIMACIÓN CAMBIO DE TARJETA
    const triggerCardChange = (dir) => {
        resetReveal(index);
        if (animating) return;

        setDirection(dir);
        setAnimating(true);

        setTimeout(() => {
            if (dir === "next" && index < players.length - 1) {
                setIndex((i) => i + 1);
            }
            if (dir === "prev" && index > 0) {
                setIndex((i) => i - 1);
            }
            setTimeout(() => setAnimating(false), 200);
        }, 200);
    };

    const next = () => triggerCardChange("next");
    const prev = () => triggerCardChange("prev");

    // ⭐ Swipe Up para revelar
    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        const diff = startY.current - e.touches[0].clientY;
        if (diff > 0) setSwipeOffset(Math.min(diff, 120));
        if (diff > 100) showReveal(index);
    };

    const handleTouchEnd = () => {
        setSwipeOffset(0);
    };

    // ⭐ Estilos dinámicos para animación
    const cardAnimationStyle = animating
        ? {
              transform: direction === "next" ? "translateY(60px)" : "translateY(-60px)",
              opacity: 0,
              transition: "0.2s ease",
          }
        : {
              transform: `translateY(-${swipeOffset}px)`,
              opacity: 1,
              transition: swipeOffset === 0 ? "0.2s ease" : "none",
          };

    return (
        <div className="cards-view">
            <header className="cards-header">
                <h2>Tarjeta</h2>
                <button className="btn ghost" onClick={onBack}>
                    Volver
                </button>
            </header>

            <div className="card-carousel">
                <div className="card-wrapper">
                    <div
                        className="card-single"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={cardAnimationStyle}
                    >
                        <div className="player-name">{current.name}</div>
                        <span className="swipe-hint">Desliza hacia arriba ⬆</span>
                    </div>

                    <div className="reveal-box show">
                        {isRevealed &&
                            (isImpostor ? (
                                <span className="impostor-text">IMPOSTOR</span>
                            ) : (
                                <span className="word-text">{word}</span>
                            ))}
                        <span className="word-text">&nbsp;</span>
                    </div>
                </div>

                <div className="nav-buttons">
                    <button disabled={index === 0 || animating} onClick={prev} className="btn nav">
                        ← Anterior
                    </button>
                    <button
                        disabled={index === players.length - 1 || animating}
                        onClick={next}
                        className="btn nav"
                    >
                        Siguiente →
                    </button>
                </div>
            </div>
        </div>
    );
}
