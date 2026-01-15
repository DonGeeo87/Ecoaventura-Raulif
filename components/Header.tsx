
import React from 'react';
import { GameState } from '../types';

interface HeaderProps {
  currentState: GameState;
  onNavigate: (state: GameState) => void;
  progress?: number;
}

const Header: React.FC<HeaderProps> = ({ currentState, onNavigate, progress = 0 }) => {
  const getBackTarget = (): GameState | null => {
    if (currentState === GameState.HOME) return null;
    if (currentState === GameState.MAP) return GameState.HOME;
    return GameState.MAP;
  };

  const backTarget = getBackTarget();

  return (
    <header className="header-raulif">
      <div className="container-raulif">
        <div className="header-content">
          <div className="header-left">
            {backTarget && (
              <button
                onClick={() => onNavigate(backTarget)}
                className="btn-back"
              >
                <span>←</span>
                <span className="btn-back-text">Atrás</span>
              </button>
            )}

            <div
              className="logo-link"
              onClick={() => onNavigate(GameState.HOME)}
              style={{ cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}
            >
              <div>
                <h1 className="header-title">Raulif</h1>
                <span className="header-subtitle">Guardianes del Bosque</span>
              </div>

              {currentState === GameState.MAP && (
                <div className="progress-container">
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{Math.round(progress)}%</span>
                </div>
              )}
            </div>
          </div>


          {/* 
          <nav className="nav-raulif">
            <button
              onClick={() => onNavigate(GameState.EXPLORE)}
              className={`nav-link ${currentState === GameState.EXPLORE ? 'active' : ''}`}
            >
              <span>🍃</span> <span>Descubrir</span>
            </button>
          </nav>
          */}
        </div>
      </div>
    </header>
  );
};

export default Header;
