import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const container = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.from(".hero-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.8,
        ease: "power3.out",
      });

      gsap.to(".hero-image img", {
        scale: 1.05,
        duration: 10,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative min-h-screen bg-[#F8FAFC] flex items-center pt-28 pb-12 lg:py-0 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LADO ESQUERDO: CONTEÚDO EDITORIAL */}
          <div className="lg:col-span-6 z-10">
            
            {/* BADGE DE AUTORIDADE */}
            <div className="hero-badge inline-flex items-center gap-3 bg-[#0B2A4A]/5 border border-[#0B2A4A]/10 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-[#164A73]"></span>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#0B2A4A] uppercase">
                Tradicação desde 1984
              </span>
            </div>

            {/* TÍTULO IMPACTANTE */}
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B2A4A] leading-[1.15] tracking-tight">
              Há mais de 40 anos cuidando de{" "}
              <span className="italic font-serif font-normal text-[#164A73]">
                histórias
              </span>{" "}
              através de sorrisos.
            </h1>

            {/* SUBTÍTULO */}
            <p className="hero-text mt-6 text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-xl">
              Uma clínica familiar que une experiência, tecnologia de ponta e um olhar humanizado no coração de Montes Claros.
            </p>

            {/* BOTÃO E MICRO-TRUST */}
            <div className="hero-cta mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="https://wa.me/5538988456205"
                target="_blank"
                rel="noreferrer"
                className="
                  bg-[#0B2A4A] 
                  text-white 
                  px-8 
                  py-4 
                  rounded-full 
                  text-sm 
                  font-semibold 
                  tracking-wider 
                  uppercase 
                  hover:bg-[#164A73] 
                  hover:shadow-xl 
                  hover:shadow-[#0B2A4A]/20 
                  active:scale-95 
                  transition-all 
                  duration-300
                "
              >
                Agendar avaliação
              </a>

              <div className="flex items-center gap-3 text-xs text-slate-500 border-l border-slate-300 pl-4 py-1">
                <span className="font-semibold text-[#0B2A4A]">40+ anos</span>
                <span>•</span>
                <span>Atendimento Exclusivo</span>
              </div>
            </div>

          </div>

          {/* LADO DIREITO: FOTO COM MOLDURA ELEGANTE */}
          <div className="lg:col-span-6 relative">
            <div className="hero-image relative h-[500px] sm:h-[600px] lg:h-[680px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10">
              <img
                src="/images/clinica.jpg"
                alt="Clínica Anatomia do Sorriso"
                className="w-full h-full object-cover"
              />
              {/* Sombra sutil interna para dar profundidade à imagem */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
            </div>

            {/* CARD FLUTUANTE DE DESTAQUE */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-xl gap-4 items-center max-w-xs z-20">
              <div className="w-12 h-12 rounded-xl bg-[#0B2A4A] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                ★
              </div>
              <div>
                <p className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider">Odontologia Familiar</p>
                <p className="text-xs text-slate-500 mt-0.5">Excelência transmitida através de gerações.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}