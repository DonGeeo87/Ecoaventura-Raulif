import React, { useEffect, useRef } from 'react';
// import * as anime from 'animejs';
import { GameNode } from '../types';

interface GameMapProps {
  nodes: GameNode[];
  onSelectNode: (node: GameNode) => void;
}

const GameMap: React.FC<GameMapProps> = ({ nodes, onSelectNode }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const nodesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${pathLength}`;

      // Calcular progreso: (nodos completados) / (total nodos - 1)
      const completedCount = nodes.filter(n => n.completed).length;
      const totalSegments = nodes.length > 1 ? nodes.length - 1 : 1;

      // Llenar hasta el último nodo desbloqueado.
      const lastUnlockedIndex = nodes.reduce((acc, curr, idx) => curr.unlocked ? idx : acc, 0);

      const progress = lastUnlockedIndex / totalSegments;
      const offset = pathLength * (1 - progress);

      pathRef.current.style.strokeDashoffset = `${offset}`;

      // Auto-scroll para móvil
      if (window.innerWidth <= 768 && nodesContainerRef.current) {
        const activeNode = nodesContainerRef.current.children[lastUnlockedIndex] as HTMLElement;
        if (activeNode) {
          activeNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }
  }, [nodes]);

  return (
    <div className="map-container">
      {/* Contenedor scrolleable interno */}
      <div className="map-scroll-content">
        <div className="map-texture"></div>

        <div className="map-decoration" style={{ top: '20%', left: '15%' }}>🌲</div>
        <div className="map-decoration" style={{ bottom: '20%', left: '40%', fontSize: '4rem' }}>🌿</div>
        <div className="map-decoration" style={{ top: '25%', right: '25%', fontSize: '6rem' }}>🌳</div>
        <div className="map-decoration" style={{ bottom: '10%', right: '10%', fontSize: '7rem' }}>⛰️</div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 450" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%', minWidth: '800px' }}>
          {/* Camino base (gris/transparente) */}
          <path
            d="M 120 320 C 250 320 300 120 500 120 C 700 120 800 320 1000 280 C 1100 240 1080 120 1080 120"
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Camino recorrido (color sólido animado) */}
          <path
            ref={pathRef}
            d="M 120 320 C 250 320 300 120 500 120 C 700 120 800 320 1000 280 C 1100 240 1080 120 1080 120"
            fill="none"
            stroke="#FFD700" /* Dorado */
            strokeWidth="14"
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 2s ease-in-out' }}
          />

          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2d5a27" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#f57c00" />
            </linearGradient>
          </defs>
        </svg>

        <div ref={nodesContainerRef} style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', minWidth: '800px' }}>
          {nodes.map((node, index) => {
            // Coordenadas calibradas matemáticamente con la curva SVG
            const positions = [
              { left: '10%', top: '71%' },  // Zorro: Inicio exacto (y=320)
              { left: '30%', top: '48%' },  // Quillay: Mitad de subida
              { left: '50%', top: '27%' },  // Loica: Cima plana (y~120)
              { left: '72%', top: '66%' },  // Peumo: Bajada profunda
              { left: '88%', top: '44%' },  // Puma: Tramo final
            ];
            const pos = positions[index];

            return (
              <div
                key={node.id}
                style={{ position: 'absolute', ...pos }}
                className="game-node"
              >
                <div style={{ position: 'relative' }}>
                  {node.unlocked && !node.completed && (
                    <div className="node-badge">
                      ¡CÚLPAME! 🐾
                    </div>
                  )}

                  <button
                    onClick={() => node.unlocked && onSelectNode(node)}
                    disabled={!node.unlocked}
                    className={`node-button ${node.completed ? 'completed' : ''}`}
                  >
                    {node.completed ? (
                      <span>⭐</span>
                    ) : (
                      <span>
                        {node.unlocked ? (node.type === 'fauna' ? '🐾' : '🌳') : '🔒'}
                      </span>
                    )}
                  </button>
                </div>

                <div className="node-label">
                  {node.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card guia-box">
        <div style={{ width: '60px', height: '60px', background: '#f0f7f0', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
          <img src="/images/logo-raulif.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Raulif" />
        </div>
        <div>
          <h4 style={{ color: 'var(--forest-green)', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Guía del Guardián</h4>
          <p style={{ color: 'var(--boldo-green)', fontSize: '0.8rem', fontWeight: 500 }}>
            Sigue la senda dorada para sanar el bosque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameMap;
