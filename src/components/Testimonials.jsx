import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Maria Oliveira",
    time: "Paciente há mais de 20 anos",
    text:
      "Minha família inteira confia na Anatomia do Sorriso. O cuidado, atenção e profissionalismo sempre fizeram parte de cada atendimento.",
  },
  {
    name: "Carlos Almeida",
    time: "Paciente da clínica",
    text:
      "Encontrar uma clínica com experiência e acolhimento fez toda diferença. Me sinto seguro em cada tratamento realizado.",
  },
  {
    name: "Ana Paula",
    time: "Paciente há mais de 10 anos",
    text:
      "É uma clínica onde você percebe que existe cuidado verdadeiro com cada detalhe e cada pessoa.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const contentRef = useRef();
  const isAnimating = useRef(false);

  const changeTestimonial = (index) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const next =
      index < 0 ? testimonials.length - 1 : index % testimonials.length;

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -15, // Animação vertical suave evita empurrar o layout nas laterais
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActive(next);

        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          }
        );
      },
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      changeTestimonial(active + 1);
    }, 6000);

    return () => clearInterval(timer);
  }, [active]);

  return (
    <section className="relative py-24 bg-[#0B2A4A] overflow-hidden">
      {/* GLOW DE FUNDO */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#164A73] opacity-20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        
        {/* CABEÇALHO */}
        <p className="text-blue-200 text-xs font-bold tracking-[0.35em] uppercase mb-4">
          Depoimentos
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Histórias de confiança <br className="hidden sm:block" />
          construídas ao longo dos anos.
        </h2>

        {/* CONTAINER COM ALTURA TRAVADA E FIXA (ZERO LAYOUT SHIFT) */}
        <div className="mt-12 h-[220px] sm:h-[180px] flex items-center justify-center relative">
          
          <div
            ref={contentRef}
            className="w-full max-w-4xl flex flex-col items-center justify-center"
          >
            <Quote className="w-10 h-10 text-blue-200/80 mb-4 stroke-[1.5] flex-shrink-0" />

            <p className="text-lg sm:text-2xl text-white font-light leading-relaxed">
              "{testimonials[active].text}"
            </p>

            <div className="mt-6">
              <h3 className="text-white font-semibold text-base">
                {testimonials[active].name}
              </h3>

              <p className="text-blue-200/80 text-xs mt-0.5">
                {testimonials[active].time}
              </p>
            </div>
          </div>

        </div>

        {/* NAVEGAÇÃO BOTOES */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            onClick={() => changeTestimonial(active - 1)}
            aria-label="Anterior"
            className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#0B2A4A] transition cursor-pointer active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2 items-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => changeTestimonial(index)}
                aria-label={`Depoimento ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  active === index ? "bg-white w-8" : "bg-white/30 w-2 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => changeTestimonial(active + 1)}
            aria-label="Próximo"
            className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#0B2A4A] transition cursor-pointer active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}