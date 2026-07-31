import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#071C32] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* IDENTIDADE / LOGO */}
          <a href="#" className="flex items-center cursor-pointer">
            <img 
              src="/images/logo_fundo escuro.png" 
              alt="Anatomia do Sorriso" 
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:opacity-90"
            />
          </a>

          {/* INFORMAÇÕES */}
          <div className="flex flex-col sm:flex-row gap-5 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>R. Belo Horizonte, 295, Centro, Montes Claros, MG.</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>(38) 3221-0122</span>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200">
          <p>© {year} Anatomia do Sorriso. Todos os direitos reservados.</p>

          <a
            href="https://omniavfx.com.br"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Desenvolvido com ❤️ por <span className="font-semibold">OMNIA VFX</span>
          </a>
        </div>
      </div>
    </footer>
  );
}