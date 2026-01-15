import React, { useState, useEffect } from 'react';
import { GameNode } from '../types';
import { speakText, stopSpeech } from '../utils/speechUtils';
import { X, Volume2, VolumeX } from 'lucide-react';

interface StationOverlayProps {
  node: GameNode;
  onClose: () => void;
  onComplete: (nodeId: string) => void;
}

const StationOverlay: React.FC<StationOverlayProps> = ({ node, onClose, onComplete }) => {
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const handleSpeak = (text: string, type: string) => {
    if (isSpeaking === type) {
      stopSpeech();
      setIsSpeaking(null);
      return;
    }

    setIsSpeaking(type);
    speakText(text, () => setIsSpeaking(null));
  };

  useEffect(() => {
    // Lectura automática inicial
    handleSpeak(`${node.description}. ¿Sabías que? ${node.funFact}`, 'auto');
    return () => stopSpeech();
  }, [node]);

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-modal" onClick={(e) => e.stopPropagation()}>

        <button onClick={onClose} className="overlay-close">
          <X size={28} />
        </button>

        {/* Header con título */}
        <div className="overlay-header">
          <div className="station-icon">
            {node.type === 'fauna' ? '🐾' : '🌳'}
          </div>
          <div className="station-title-info">
            <h2 className="station-name">{node.name}</h2>
            <p className="station-scientific">{node.scientificName}</p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="overlay-body">

          {/* Imagen/Video */}
          <div className="overlay-media">
            <div className="media-real">
              {node.videoUrl ? (
                <video src={node.videoUrl} autoPlay loop muted playsInline />
              ) : (
                <img
                  src={node.imageUrl}
                  alt={node.name}
                  onError={(e) => {
                    console.error('Error loading image:', node.imageUrl);
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1470093851219-69951fcbb533?auto=format&fit=crop&q=80&w=1200';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          {/* Información */}
          <div className="overlay-info custom-scrollbar">

            {/* Misión */}
            <div
              onClick={() => handleSpeak(node.description, 'mission')}
              className={`info-card mission-card ${isSpeaking === 'mission' ? 'speaking' : ''}`}
            >
              <div className="info-card-header">
                <span className="info-card-icon">🎯</span>
                <span className="info-card-label">Tu Misión</span>
              </div>
              <p className="info-card-text">{node.description}</p>
              <button className="info-card-audio">
                {isSpeaking === 'mission' ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>

            {/* Dato Curioso */}
            <div
              onClick={() => handleSpeak(node.funFact, 'fact')}
              className={`info-card fact-card ${isSpeaking === 'fact' ? 'speaking' : ''}`}
            >
              <div className="info-card-header">
                <span className="info-card-icon">💡</span>
                <span className="info-card-label">Secreto del Bosque</span>
              </div>
              <p className="info-card-text">{node.funFact}</p>
              <button className="info-card-audio">
                {isSpeaking === 'fact' ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>

            {/* Compromiso Ecológico */}
            <div
              onClick={() => handleSpeak(node.ecoTip, 'tip')}
              className={`info-card eco-card ${isSpeaking === 'tip' ? 'speaking' : ''}`}
            >
              <div className="info-card-header">
                <span className="info-card-icon">🌱</span>
                <span className="info-card-label">Compromiso Guardián</span>
              </div>
              <p className="info-card-text">"{node.ecoTip}"</p>
              <button className="info-card-audio">
                {isSpeaking === 'tip' ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>

            {/* Botón Completar */}
            <button
              onClick={() => onComplete(node.id)}
              className="btn-complete-mission"
            >
              <span>¡Completar Misión!</span>
              <span className="btn-complete-icon">✨</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default StationOverlay;
