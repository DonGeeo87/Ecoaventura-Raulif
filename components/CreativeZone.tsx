import React, { useState, useRef, useEffect } from 'react';
import { Eraser, Palette, Trash2, Download } from 'lucide-react';

const CreativeZone: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'mi-dibujo-ecoaventura.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const colors = ['#000000', '#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#800080', '#A52A2A'];

  return (
    <div className="p-4 max-w-5xl mx-auto h-[80vh] flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-fredoka text-purple-900 mb-2">🎨 Pizarra Mágica</h2>
        <p className="text-purple-700 text-xl font-medium">¡Dibuja lo que aprendiste hoy sobre el bosque!</p>
      </div>

      <div className="flex-1 bg-white rounded-[2rem] shadow-2xl border-[8px] border-purple-200 overflow-hidden flex flex-col md:flex-row">
        {/* Toolbar */}
        <div className="bg-purple-50 p-6 flex flex-row md:flex-col gap-6 items-center border-b md:border-b-0 md:border-r border-purple-100 shrink-0 overflow-x-auto md:overflow-x-visible w-full md:w-24">
          <div className="flex md:flex-col gap-2">
            <button
              onClick={() => setTool('brush')}
              className={`p-3 rounded-xl transition-all ${tool === 'brush' ? 'bg-purple-500 text-white shadow-lg' : 'bg-white text-purple-900 hover:bg-purple-100'}`}
            >
              <Palette size={24} />
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-3 rounded-xl transition-all ${tool === 'eraser' ? 'bg-purple-500 text-white shadow-lg' : 'bg-white text-purple-900 hover:bg-purple-100'}`}
            >
              <Eraser size={24} />
            </button>
          </div>

          <div className="w-full h-px md:w-px md:h-12 bg-purple-200"></div>

          <div className="flex md:flex-col gap-2">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => { setColor(c); setTool('brush'); }}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-125 ${color === c && tool === 'brush' ? 'border-purple-600 scale-110 shadow-md' : 'border-white'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="w-full h-px md:w-px md:h-12 bg-purple-200"></div>

          <div className="flex md:flex-col gap-2">
            <button onClick={clearCanvas} className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200">
              <Trash2 size={24} />
            </button>
            <button onClick={downloadDrawing} className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200">
              <Download size={24} />
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] cursor-crosshair touch-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default CreativeZone;
