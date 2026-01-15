
export const speakText = (text: string, onEnd?: () => void) => {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  
  // Buscar una voz en español, preferiblemente de mujer/niño si está disponible
  const spanishVoice = voices.find(v => v.lang.includes('es-CL')) || 
                       voices.find(v => v.lang.includes('es-MX')) ||
                       voices.find(v => v.lang.includes('es-ES')) || 
                       voices[0];
  
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }

  utterance.lang = 'es-ES';
  utterance.pitch = 1.4; // Pitch alto para sonar como zorrito
  utterance.rate = 1.1;  // Un poco más rápido

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  window.speechSynthesis.cancel();
};
