import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const doctors = [
  {
    name: "Dr. Eduardo Brandão Lima",
    cro: "CRO-MG 6637",
    specialty: "Cirurgião Dentista",
    image: "/images/eduardo.jpeg",
  },
  {
    name: "Dra. Núbia Paula Brandão",
    cro: "CRO-MG 33445",
    specialty: "Endodontia e Estética",
    image: "/images/nubia.jpeg",
  },
  {
    name: "Dr. Michel Brandão",
    cro: "CRO-MG 43422",
    specialty: "Implantodontia & Estética",
    image: "/images/michel.jpeg",
  },
  {
    name: "Dra. Ana Flávia Fonseca",
    cro: "CRO-MG 49079",
    specialty: "Harmonização Orofacial",
    image: "/images/ana.jpeg",
  },
];

export default function Team() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".doctor-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = (doctorName, specialty) => {
    const phone = "5538988456205";
    const text = encodeURIComponent(
      `Olá! Gostaria de agendar uma consulta com *${doctorName}* (${specialty}).`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="equipe"
      className="py-16 lg:py-24 bg-[#F8FAFC] overflow-hidden border-t border-slate-200/50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* CABEÇALHO ULTRA CLEAN */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#164A73] uppercase mb-2 block">
            Corpo Clínico
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A4A] tracking-tight">
            Nossos{" "}
            <span className="font-serif italic font-normal text-[#164A73]">
              Especialistas
            </span>
          </h2>
        </div>

        {/* GRADE CLEAN (IGUAL À SUA REFERÊNCIA) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="
                doctor-card
                group
                bg-white
                p-4
                pb-6
                rounded-2xl
                border
                border-slate-100
                shadow-sm
                hover:shadow-xl
                hover:shadow-slate-900/5
                transition-all
                duration-500
                text-center
                flex
                flex-col
              "
            >
              {/* CONTAINER DA FOTO COM INTERAÇÃO DE HOVER */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-5 bg-[#EAEFF5]">
                
                {/* FOTO DO MÉDICO */}
                <img
                  src={doctor.image}
                  alt=""
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />

                {/* BADGE DISCRETA CRO-MG */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200/60 shadow-xs flex items-center gap-1 z-10">
                  <Award className="w-3 h-3 text-[#164A73]" />
                  <span className="text-[9px] font-bold tracking-wider text-[#0B2A4A] uppercase">
                    {doctor.cro}
                  </span>
                </div>

                {/* OVERLAY DE HOVER COM BOTÃO WHATSAPP */}
                <div 
                  onClick={() => handleWhatsApp(doctor.name, doctor.specialty)}
                  className="
                    absolute 
                    inset-0 
                    bg-[#0B2A4A]/60 
                    backdrop-blur-[2px] 
                    opacity-0 
                    group-hover:opacity-100 
                    transition-all 
                    duration-300 
                    flex 
                    items-center 
                    justify-center 
                    p-4
                    cursor-pointer
                  "
                >
                  <button 
                    className="
                      bg-white 
                      text-[#0B2A4A] 
                      px-4 
                      py-2.5 
                      rounded-full 
                      text-xs 
                      font-bold 
                      uppercase 
                      tracking-wider 
                      shadow-lg 
                      flex 
                      items-center 
                      gap-2 
                      transform 
                      translate-y-4 
                      group-hover:translate-y-0 
                      transition-all 
                      duration-300
                      hover:bg-slate-100
                    "
                  >
                    <span>Agendar Consulta</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#164A73]" />
                  </button>
                </div>

              </div>

              {/* NOME DO MÉDICO */}
              <h3 className="text-lg font-bold text-[#0B2A4A] tracking-tight group-hover:text-[#164A73] transition-colors">
                {doctor.name}
              </h3>

              {/* ESPECIALIDADE */}
              <span className="text-xs text-[#164A73] font-medium mt-1 block">
                {doctor.specialty}
              </span>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}