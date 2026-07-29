import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Sparkles, 
  ShieldCheck, 
  Smile, 
  Activity, 
  Zap, 
  HeartHandshake,
  ArrowRight,
  ChevronRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const specialties = [
  {
    icon: Sparkles,
    title: "Estética & Lentes",
    description: "Lâminas ultrafinas em porcelana planejadas digitalmente para transformar a harmonia do seu sorriso.",
    serviceQuery: "Lentes de Contato e Facetas",
  },
  {
    icon: ShieldCheck,
    title: "Implantes & Próteses",
    description: "Reabilitação oral de alta precisão com implantes de titânio para devolução total de segurança e função.",
    serviceQuery: "Implantes Dentários",
  },
  {
    icon: Smile,
    title: "Harmonização (HOF)",
    description: "Procedimentos faciais estruturais para alinhar traços do rosto com o desenho natural do sorriso.",
    serviceQuery: "Harmonização Orofacial",
  },
  {
    icon: Zap,
    title: "Tratamento de Canal",
    description: "Endodontia automatizada com tecnologia de microscopia para procedimentos ágeis e indolores.",
    serviceQuery: "Tratamento de Canal (Endodontia)",
  },
  {
    icon: Activity,
    title: "Ortodontia & Alinhadores",
    description: "Aparelhos estéticos e alinhadores invisíveis para correção oclusal perfeita sem interferir no visual.",
    serviceQuery: "Ortodontia e Alinhadores",
  },
  {
    icon: HeartHandshake,
    title: "Prevenção & Profilaxia",
    description: "Protocolos de limpeza profunda e diagnósticos preventivos para garantir longevidade aos seus dentes.",
    serviceQuery: "Profilaxia e Limpeza",
  },
];

export default function Specialties() {
  const sectionRef = useRef();
  const scrollContainerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".card-item",
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

  const handleWhatsApp = (service) => {
    const phone = "5538988456205";
    const text = encodeURIComponent(
      `Olá! Gostaria de agendar uma consulta sobre ${service}.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="especialidades"
      className="py-16 lg:py-24 bg-[#F4F7FA] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* CABEÇALHO IDÊNTICO À REFERÊNCIA (Título + Botão no Canto) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#164A73] uppercase mb-2 block">
              Tratamentos Exclusivos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A4A] tracking-tight">
              Cuidado Dental Completo <br />
              para{" "}
              <span className="text-[#164A73] font-serif italic font-normal">
                Cada Sorriso.
              </span>
            </h2>
          </div>

          {/* BOTÃO "VER TODOS" COM EFEITO DE ÍCONE */}
          <button 
            onClick={() => handleWhatsApp("Avaliacaogeral")}
            className="inline-flex items-center gap-3 text-xs font-bold text-[#0B2A4A] hover:text-[#164A73] transition-colors uppercase tracking-wider group cursor-pointer"
          >
            <span>Agendar Avaliação Geral</span>
            <div className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-[#0B2A4A] group-hover:bg-[#0B2A4A] group-hover:text-white transition-all duration-300">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* CARROSSEL / GRID HORIZONTAL ELEGANTE */}
        <div 
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
        >
          {specialties.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                onClick={() => handleWhatsApp(item.serviceQuery)}
                className="
                  card-item
                  flex-shrink-0
                  w-[280px]
                  sm:w-[320px]
                  lg:w-auto
                  snap-start
                  bg-white
                  p-8
                  rounded-[28px]
                  border
                  border-slate-100
                  shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                  hover:shadow-[0_20px_40px_rgba(11,42,74,0.08)]
                  hover:-translate-y-2
                  transition-all
                  duration-300
                  flex
                  flex-col
                  justify-between
                  cursor-pointer
                  group
                  relative
                "
              >
                <div>
                  {/* Container do Ícone com Brilho Sutil */}
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F5FA] group-hover:bg-[#0B2A4A] text-[#164A73] group-hover:text-white flex items-center justify-center mb-8 transition-all duration-300 shadow-inner">
                    <IconComponent className="w-7 h-7 stroke-[1.5]" />
                  </div>

                  {/* Título do Serviço */}
                  <h3 className="text-xl font-bold text-[#0B2A4A] tracking-tight mb-3 group-hover:text-[#164A73] transition-colors">
                    {item.title}
                  </h3>

                  {/* Descrição Suave */}
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Micro-chamada com Seta que desliza */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0B2A4A]">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider text-[10px]">
                    Solicitar
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#164A73] group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}