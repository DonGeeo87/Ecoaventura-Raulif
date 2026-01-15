import React, { useState, useEffect } from 'react';
import { GameState, GameNode } from './types';
import Header from './components/Header';
import GameMap from './components/GameMap';
import StationOverlay from './components/StationOverlay';
import GuardianChat from './components/GuardianChat';
import CreativeZone from './components/CreativeZone';
import ForestExplorer from './components/ForestExplorer';
import Confetti from './components/Confetti';
import { FOREST_NODES } from './constants';
import { speakText, stopSpeech } from './utils/speechUtils';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [nodes, setNodes] = useState<GameNode[]>(FOREST_NODES);
  const [selectedNode, setSelectedNode] = useState<GameNode | null>(null);
  const [unlockedTips, setUnlockedTips] = useState<string[]>([]);
  const [speakingTip, setSpeakingTip] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCompleteNode = (nodeId: string) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    setNodes(prevNodes => {
      const updated = prevNodes.map(n => n.id === nodeId ? { ...n, completed: true } : n);
      const currentNode = updated.find(n => n.id === nodeId);
      if (currentNode) {
        if (!unlockedTips.includes(currentNode.ecoTip)) {
          setUnlockedTips(prev => [...prev, currentNode.ecoTip]);
        }
        const nextOrder = currentNode.order + 1;
        return updated.map(n => n.order === nextOrder ? { ...n, unlocked: true } : n);
      }
      return updated;
    });
    setSelectedNode(null);
  };

  const listenTip = (tip: string, index: number) => {
    if (speakingTip === index) {
      stopSpeech();
      setSpeakingTip(null);
      return;
    }

    setSpeakingTip(index);
    speakText(`Mi consejo es: ${tip}`, () => setSpeakingTip(null));
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.HOME:
        return (
          <div className="home-screen">
            <div className="home-bg">
              <img
                src="https://images.unsplash.com/photo-1448375240586-dfd8f3793371?auto=format&fit=crop&q=80&w=2000"
                alt="Bosque de Chile"
              />
              <div className="home-gradient"></div>
            </div>

            <div className="home-grid">
              <div className="home-logo-container">
                <div className="logo-glow"></div>
                <div className="animate-float">
                  <img
                    src="images/logo-raulif.png"
                    alt="Raulif"
                    className="home-logo-img"
                    onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80')}
                  />
                </div>
              </div>
              <div className="home-text-content">
                <div>
                  <div className="badge-raulif">
                    <span style={{ fontSize: '1.2rem' }}>🇨🇱</span> Guardianes de la Esperanza
                  </div>
                </div>
                <h1 className="home-title">
                  Espíritu <br />
                  <span className="text-accent">
                    Nativo
                    <svg className="underline-svg" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                  </span>
                </h1>
                <p className="home-description">
                  Descubre la magia del bosque esclerófilo. Únete a Raulif en una aventura épica para proteger nuestra biodiversidad única.
                </p>
                <div style={{ paddingTop: '2rem' }}>
                  <button
                    onClick={() => setGameState(GameState.MAP)}
                    className="btn-primary"
                  >
                    <span>Explorar el Mapa</span>
                    <span style={{ fontSize: '2rem' }}>🌿</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case GameState.MAP:
        return (
          <div className="map-view">
            <div className="map-header">
              <div className="glass-card" style={{ padding: '2rem', maxWidth: '600px' }}>
                <h2 style={{ fontSize: '4rem', marginBottom: '0.75rem' }}>La Gran Ruta</h2>
                <p style={{ fontSize: '1.25rem', opacity: 0.8 }}>Sigue las huellas de Raulif para sanar el corazón del bosque nativo.</p>
              </div>
              <div className="stats-badge">
                <div className="stats-icon">✨</div>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: '#666', letterSpacing: '0.1em' }}>Semillas de Vida</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{nodes.filter(n => n.completed).length} de {nodes.length}</p>
                </div>
              </div>
            </div>
            <GameMap nodes={nodes} onSelectNode={setSelectedNode} />

            <div className="findings-section">
              <div className="findings-divider">
                <div className="line-gold"></div>
                <h3 className="findings-title">Tus Hallazgos</h3>
                <div className="line-gold" style={{ transform: 'rotate(180deg)' }}></div>
              </div>
              <div className="findings-grid">
                {unlockedTips.length === 0 ? (
                  <div className="glass-card flex-center" style={{ gridColumn: '1/-1', padding: '5rem', borderStyle: 'dashed', color: '#999' }}>
                    Comienza tu viaje para recolectar historias del bosque...
                  </div>
                ) : (
                  unlockedTips.map((tip, i) => (
                    <div key={i} className="glass-card finding-card">
                      <button
                        onClick={() => listenTip(tip, i)}
                        className={`btn-audio ${speakingTip === i ? 'active' : ''}`}
                        style={{ background: speakingTip === i ? 'var(--litre-orange)' : '#f0f7f0' }}
                      >
                        <span>{speakingTip === i ? '🔊' : '🔈'}</span>
                      </button>
                      <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--litre-orange)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Sabiduría de Raulif</p>
                        <p style={{ fontSize: '1.1rem', fontWeight: 700, fontStyle: 'italic' }}>"{tip}"</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      case GameState.EXPLORE: return <ForestExplorer />;
      case GameState.CHAT: return <GuardianChat />;
      case GameState.CREATIVE: return <CreativeZone />;
      default: return null;
    }
  };

  return (
    <div className="app-container">
      <Header
        currentState={gameState}
        onNavigate={(st) => setGameState(st)}
        progress={(nodes.filter(n => n.completed).length / nodes.length) * 100}
      />

      {(gameState === GameState.CHAT || gameState === GameState.CREATIVE || gameState === GameState.EXPLORE) && (
        <button
          onClick={() => setGameState(GameState.MAP)}
          className="back-btn-float"
        >
          ←
        </button>
      )}

      <main className="main-content">
        <div className="container-raulif">
          {renderContent()}
        </div>
      </main>

      {showConfetti && <Confetti />}
      {selectedNode && <StationOverlay node={selectedNode} onClose={() => setSelectedNode(null)} onComplete={handleCompleteNode} />}
    </div>
  );
};

export default App;
