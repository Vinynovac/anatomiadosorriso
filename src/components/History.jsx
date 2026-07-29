import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function History() {
  const section = useRef();
  const titleRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação sutil para o título
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
        },
      });

      // Animação para a imagem revelando suavemente
      gsap.from(imageRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="historia"
      className="pt-16 pb-28 bg-[#F8FAFC] overflow-hidden" // Padding superior reduzido drasticamente
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* CONTEÚDO TEXTUAL PREMIUM E SÓBRIO */}
          <div className="lg:col-span-5 z-10 pr-6">
            <h2 
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B2A4A] leading-[1.1] tracking-tighter"
            >
              Quatro décadas cuidando de{" "}
              <span className="font-serif italic font-medium text-[#164A73]">
                histórias
              </span>
              .
            </h2>
          </div>

          {/* GALERIA DE IMAGEM IMERSIVA */}
          <div className="lg:col-span-7">
            <div 
              ref={imageRef}
              className="relative aspect-[16/10] lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-200/50"
            >
              <img
                src="/images/consultorio.jpeg"
                alt="História da Anatomia do Sorriso"
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay sutil para integração e profundidade */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/30 to-transparent lg:from-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}