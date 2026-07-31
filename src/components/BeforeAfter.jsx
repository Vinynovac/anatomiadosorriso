import { useState } from "react";

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-[#164A73] tracking-[5px] text-xs font-semibold mb-5">
          TRANSFORMAÇÕES
        </p>

        <h2 className="text-4xl lg:text-5xl font-bold text-[#0B2A4A]">
          Sorrisos que contam novas histórias.
        </h2>

        <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
          Cada tratamento é planejado para respeitar a individualidade de cada paciente.
        </p>

        {/* CONTAINER PRINCIPAL */}
        <div className="relative mt-16 max-w-5xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl select-none">
          
          {/* IMAGEM DEPOIS (FUNDO) */}
          <img
            src="/images/antes.jpeg"
            alt="Depois"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* IMAGEM ANTES (SOBREPOSTA E CORTADA COM CLIP-PATH) */}
          <img
            src="/images/depois.jpeg"
            alt="Antes"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              clipPath: `inset(0 ${100 - position}% 0 0)`,
            }}
          />

          {/* LINHA DIVISÓRIA E BOTÃO DE ARRASTE */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-white shadow-xl pointer-events-none"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#0B2A4A] text-xs font-bold">
              ↔
            </div>
          </div>

          {/* INPUT RANGE INVISÍVEL PARA ARRASTAR */}
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-ew-resize z-10"
          />

          {/* BADGES */}
          <div className="absolute left-5 top-5 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs uppercase tracking-wider pointer-events-none z-0">
            Arraste para ver o resultado
          </div>

          

        </div>
      </div>
    </section>
  );
}