import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
  const containerRef = useRef();
  const logoRef = useRef();
  const progressBarRef = useRef();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Animação de saída elegante
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        },
      });

      // 1. Aparição marcante da logo
      tl.from(logoRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

      // 2. Animação da barra de progresso sincronizada com o contador
      tl.to(
        progressBarRef.current,
        {
          width: "100%",
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: function () {
            setProgress(Math.round(this.progress() * 100));
          },
        },
        "-=0.4"
      );

      // 3. Desaparecimento suave da logo antes do painel subir
      tl.to(logoRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.in",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6"
    >
      <div ref={logoRef} className="flex flex-col items-center text-center">
        {/* LOGO NÍTIDA E COM A PALETA DA MARCA */}
        <img
          src="/images/logo_fundo claro.png"
          alt="Anatomia do Sorriso"
          className="h-24 sm:h-32 w-auto object-contain"
        />

        {/* CONTAINER DA BARRA DE CARREGAMENTO MINIMALISTA */}
        <div className="w-48 sm:w-64 h-[2px] bg-slate-100 rounded-full mt-8 overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#0B2A4A] to-[#164A73] w-0 rounded-full"
          />
        </div>

        {/* CONTADOR DE PORCENTAGEM ELEGANTE */}
        <span className="text-[10px] font-mono tracking-widest text-slate-400 mt-3 font-medium">
          {progress}%
        </span>
      </div>
    </div>
  );
}