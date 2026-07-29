import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "História", target: "historia" },
    { label: "Especialidades", target: "especialidades" },
    { label: "Equipe", target: "equipe" },
    { label: "Contato", target: "contato" }, // Aponta para o id="contato" do seu CTA Final
  ];

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-300
        ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-4"
            : "bg-white/80 backdrop-blur-sm py-6"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        
        {/* LOGO */}
       <a href="#" className="flex items-center cursor-pointer">
        <img 
          src="/images/logo_fundo claro.png" 
          alt="Anatomia do Sorriso" 
          className="h-14 md:h-16 w-auto object-contain transition-all duration-300 hover:opacity-90"
        />
      </a>

        {/* MENU */}
        <nav className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              className="
                relative
                text-sm
                font-medium
                text-[#243447]
                hover:text-[#164A73]
                transition-colors
                duration-200
                py-1
                group
              "
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#164A73] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </nav>

        {/* BOTÃO "AGENDAR AVALIAÇÃO" */}
        <a
          href="#pre-agendamento"
          className="
            bg-[#0B2A4A]
            text-white
            px-7
            py-3
            rounded-full
            text-xs
            font-medium
            tracking-wider
            uppercase
            hover:bg-[#164A73]
            hover:shadow-md
            active:scale-95
            transition-all
            duration-200
            inline-block
            text-center
          "
        >
          Agendar avaliação
        </a>

      </div>
    </header>
  );
}