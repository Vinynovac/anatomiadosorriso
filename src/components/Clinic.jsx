import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/consultorio01.jpeg",
    alt: "Recepção da clínica Anatomia do Sorriso",
  },
  {
    src: "/images/consultorio02.jpeg",
    alt: "Consultório odontológico de alta tecnologia",
  },
  {
    src: "/images/consultorio03.jpeg",
    alt: "Espaço e equipamentos odontológicos",
  },
];

export default function Clinic() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".clinic-image",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="clinica"
      className="py-16 lg:py-24 bg-[#F8FAFC] overflow-hidden border-t border-slate-200/50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* CABEÇALHO EDITORIAL ULTRA CLEAN */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#164A73] uppercase mb-2 block">
            Nossos Espaços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A4A] tracking-tight leading-none">
            Um ambiente preparado para{" "}
            <span className="font-serif italic font-normal text-[#164A73]">
              cuidar de você.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-light max-w-xl">
            Tecnologia de ponta, conforto térmico e acústico em um projeto pensado para proporcionar tranquilidade a cada visita.
          </p>
        </div>

        {/* GRADE ASSIMÉTRICA DE GALERIA LUXO (SEM BADGES/TEXTOS SOBREPOSTOS) */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* FOTO DESTAQUE PRINCIPAL */}
          <div className="lg:col-span-7 clinic-image h-[400px] sm:h-[500px] lg:h-[540px] rounded-[28px] overflow-hidden shadow-xl shadow-slate-900/5 border border-slate-100 bg-[#EAEFF5]">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>

          {/* FOTOS SECUNDÁRIAS */}
          <div className="lg:col-span-5 grid gap-6">
            {images.slice(1).map((image, index) => (
              <div
                key={index}
                className="clinic-image h-[240px] sm:h-[257px] rounded-[28px] overflow-hidden shadow-xl shadow-slate-900/5 border border-slate-100 bg-[#EAEFF5]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}