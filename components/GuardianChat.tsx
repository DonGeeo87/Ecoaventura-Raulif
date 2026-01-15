import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { speakText, stopSpeech } from '../utils/speechUtils';

const OFFLINE_RESPONSES: Record<string, string> = {
  "default": "¡Qué interesante! Soy Zorrito y me encanta hablar de nuestro bosque. ¿Sabías que el Peumo huele riquísimo? ¡Visita su estación!",
  "hola": "¡Hola amiguito! 🦊 ¡Qué alegría verte en el bosque!",
  "peumo": "¡El Peumo es increíble! Sus frutos rojos se llaman 'peumos' y si frotas sus hojas huelen a limón.",
  "loica": "¡La Loica tinene el pecho rojo por una herida de un cazador, según cuenta la leyenda! ¡Es un pájaro muy valiente!",
  "zorro": "¡Ese soy yo! Soy un Zorro Culpeo, el más grande de Chile. ¡Me gusta comer ratoncitos y frutas!",
  "quillay": "El Quillay es mágico, su corteza hace espuma como jabón. ¡Limpia el bosque y también cura!",
  "puma": "El Puma es el rey de aquí. Es silencioso y fuerte. ¡Hay que respetarlo mucho!",
  "semilla": "¡La Semilla de Esmeralda es la vida del bosque! Necesitamos juntar sus fragmentos. ¡Sigue explorando!",
};

const GuardianChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy Zorrito 🦊. ¡Pucha que me alegra verte! ¿Tienes alguna duda sobre los árboles o animales del bosque nativo?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const getOfflineResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    for (const key of Object.keys(OFFLINE_RESPONSES)) {
      if (lowerText.includes(key) && key !== 'default') {
        return OFFLINE_RESPONSES[key];
      }
    }
    return OFFLINE_RESPONSES['default'];
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Simulate network delay for "thinking" effect
    setTimeout(() => {
      const botText = getOfflineResponse(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: botText }]);
      setIsSpeaking(true);
      speakText(botText, () => setIsSpeaking(false));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto h-[78vh] flex flex-col bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border-[12px] border-orange-50 my-6">
      <div className="bg-orange-500 p-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className={`w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-inner overflow-hidden p-3 ${isSpeaking ? 'animate-bounce' : ''}`}>
            <span className="text-4xl">🦊</span>
          </div>
          <div>
            <h3 className="text-white font-fredoka font-bold text-3xl">Charla con Zorrito</h3>
            <p className="text-orange-100 text-lg flex items-center gap-2 font-bold uppercase tracking-widest">
              {isSpeaking ? '● Te estoy hablando' : '● Atento a tus dudas'}
            </p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar bg-orange-50/20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-7 rounded-[2.5rem] shadow-sm text-2xl leading-relaxed ${msg.role === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white text-gray-800 border-2 border-orange-100 rounded-tl-none font-medium'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-orange-50 flex gap-3">
              <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-white border-t-4 border-orange-50">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregúntale algo a Zorrito sobre el bosque..."
            className="flex-1 px-8 py-6 rounded-3xl bg-gray-50 border-4 border-transparent focus:border-orange-300 focus:bg-white outline-none transition-all text-2xl font-medium"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 text-white px-12 rounded-3xl transition-all shadow-xl active:scale-95 font-bold text-3xl flex items-center justify-center min-w-[100px]"
          >
            {isLoading ? <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : '🚀'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuardianChat;
