
import React, { useState, useEffect } from 'react';
import { FOREST_NODES } from '../constants';
import { FaunaItem } from '../types';
import { speakText, stopSpeech } from '../utils/speechUtils';

const ForestExplorer: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FaunaItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  // Define showMagic state to fix the "Cannot find name 'showMagic'" error
  const [showMagic, setShowMagic] = useState(false);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleListen = (text: string) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    speakText(text, () => setIsSpeaking(false));
  };

  return (
    <div style={{ padding: '5rem 0', minHeight: '100vh' }}>
      <div className="explorer-header">
        <h2 style={{ fontSize: '6rem', color: 'var(--forest-green)' }}>
          Herencia <span style={{ color: 'var(--litre-orange)', fontStyle: 'italic' }}>Viva</span>
        </h2>
        <p style={{ fontSize: '1.75rem', maxWidth: '800px', margin: '1.5rem auto', color: 'rgba(26,67,49,0.7)', fontWeight: 500 }}>
          Un viaje por la biodiversidad única del Chile central. Escucha, aprende y protege.
        </p>
        <div style={{ height: '4px', width: '100px', background: 'var(--litre-orange)', margin: '0 auto', opacity: 0.3, borderRadius: '2px' }}></div>
      </div>

      <div className="explorer-grid">
        {FOREST_NODES.map((animal) => (
          <div
            key={animal.id}
            onClick={() => setSelectedItem(animal)}
            className="animal-card"
          >
            <div className="animal-card-media">
              <img
                src={animal.imageUrl}
                alt={animal.name}
                className="animal-card-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1547407139-3c921a66005c?auto=format&fit=crop&q=80&w=1200';
                }}
              />
              <div className="animal-tag">
                <span>{animal.type === 'fauna' ? '🐾' : '🌳'}</span>
              </div>
            </div>
            <div className="animal-card-info">
              <div>
                <h3 className="animal-name font-brand">{animal.name}</h3>
                <p style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--boldo-green)', letterSpacing: '0.3em' }}>{animal.scientificName}</p>
              </div>
              <div className="divider-short"></div>
              <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '0.9rem', width: 'fit-content' }}>
                Descubrir ✨
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="overlay-backdrop">
          <div className="overlay-modal" style={{ flexDirection: 'row' }}>

            <div className="overlay-media-side" style={{ width: '50%', minHeight: 'auto' }}>
              <img
                src={showMagic ? selectedItem.magicImageUrl : selectedItem.imageUrl}
                className="media-img"
              />

              <div className="vision-toggle-container">
                <button
                  onClick={() => setShowMagic(!showMagic)}
                  className="btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 2.5rem', background: showMagic ? 'var(--litre-orange)' : 'white', color: showMagic ? 'white' : 'var(--forest-green)' }}
                >
                  <span style={{ fontSize: '2rem' }}>{showMagic ? '📸' : '✨'}</span>
                  <span>{showMagic ? 'Naturaleza Real' : 'Visión de Raulif'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedItem(null);
                  setShowMagic(false);
                }}
                className="overlay-close"
                style={{ top: '2rem', left: '2rem', right: 'auto' }}
              >✕</button>
            </div>

            <div className="overlay-info-side custom-scrollbar" style={{ width: '50%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4rem' }}>
                <div>
                  <h3 style={{ fontSize: '5rem', color: 'var(--forest-green)' }} className="font-brand">{selectedItem.name}</h3>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--boldo-green)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{selectedItem.scientificName}</p>
                </div>
                <button
                  onClick={() => handleListen(`Hola, soy un guardián del bosque. ¿Sabías que el ${selectedItem.name} es fundamental para nuestro ecosistema? ${selectedItem.funFact}. Raulif nos aconseja: ${selectedItem.ecoTip}`)}
                  className={`btn-audio ${isSpeaking ? 'active' : ''}`}
                  style={{ width: '6rem', height: '6rem', borderRadius: '2rem' }}
                >
                  <span style={{ fontSize: '3rem' }}>{isSpeaking ? '🔊' : '🔈'}</span>
                </button>
              </div>

              <div style={{ flex: 1 }}>
                <div className="mission-block">
                  <p style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', color: 'var(--boldo-green)' }}>Sabiduría Ancestral</p>
                  <p style={{ fontSize: '2rem', fontWeight: 600, fontStyle: 'italic' }}>"{selectedItem.funFact}"</p>
                </div>

                <div className="fact-block">
                  <p style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', color: 'var(--litre-orange)' }}>Misión del Guardián</p>
                  <p style={{ fontSize: '2rem', fontWeight: 900 }}>"{selectedItem.ecoTip}"</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedItem(null);
                  setShowMagic(false);
                }}
                className="btn-primary"
                style={{ marginTop: '3rem', width: '100%', justifyContent: 'center', fontSize: '2rem' }}
              >
                HE COMPRENDIDO 🌿
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForestExplorer;
