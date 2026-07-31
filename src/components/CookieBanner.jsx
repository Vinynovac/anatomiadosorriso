import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ShieldCheck, Settings, Check, X, Cookie, Lock } from "lucide-react";

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Sempre ativo e bloqueado
    analytics: true,
    marketing: false,
  });

  const bannerRef = useRef(null);
  const modalRef = useRef(null);

  // Carrega preferências salvas no localStorage
  useEffect(() => {
    const savedConsent = localStorage.getItem("anatomia_cookie_consent");
    if (!savedConsent) {
      // Se nunca escolheu, abre o banner após 2.5 segundos de navegação
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setPreferences(JSON.parse(savedConsent));
    }
  }, []);

  // Animação de entrada e saída do banner flutuante
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        bannerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleSavePreferences = (customPrefs) => {
    const finalPrefs = customPrefs || preferences;
    localStorage.setItem("anatomia_cookie_consent", JSON.stringify(finalPrefs));
    setPreferences(finalPrefs);
    setShowSettings(false);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    const allAccept = { necessary: true, analytics: true, marketing: true };
    handleSavePreferences(allAccept);
  };

  return (
    <>
      {/* 1. BOTÃO FLUTUANTE RETRÁTIL (Aparece quando o banner principal está fechado) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed 
            bottom-5 
            left-5 
            z-50 
            bg-[#0B2A4A] 
            text-white 
            p-3.5 
            rounded-full 
            shadow-2xl 
            shadow-[#0B2A4A]/30 
            hover:scale-110 
            hover:bg-[#164A73] 
            transition-all 
            duration-300 
            flex 
            items-center 
            gap-2.5
            group
            cursor-pointer
            border
            border-white/10
          "
          title="Configurações de Privacidade e Cookies"
        >
          <Cookie className="w-5 h-5 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs font-semibold tracking-wider uppercase pr-1 hidden sm:inline-block">
            Privacidade
          </span>
          <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-90 transition-transform duration-500" />
        </button>
      )}

      {/* 2. BARRA DE COOKIES COMPACTA E ELEGANTE (BOTTOM BANNER) */}
      {isOpen && !showSettings && (
        <div
          ref={bannerRef}
          className="
            fixed 
            bottom-4 
            left-4 
            right-4 
            md:left-8 
            md:right-auto 
            md:max-w-xl 
            z-50 
            bg-[#0B2A4A]/95 
            backdrop-blur-xl 
            text-white 
            p-6 
            rounded-[24px] 
            border 
            border-white/10 
            shadow-[0_20px_50px_rgba(0,0,0,0.3)]
          "
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-blue-200">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold tracking-wide uppercase text-white">
                  Sua Privacidade é Prioridade
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed mt-2">
                Utilizamos cookies para personalizar sua experiência e otimizar Nossos Serviços em conformidade com a{" "}
                <strong className="font-semibold text-white">LGPD</strong>.
              </p>

              {/* AÇÕES DIRETA */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="
                    bg-white 
                    text-[#0B2A4A] 
                    px-5 
                    py-2.5 
                    rounded-full 
                    text-xs 
                    font-bold 
                    uppercase 
                    tracking-wider 
                    hover:bg-slate-100 
                    transition-all 
                    duration-200 
                    shadow-sm
                    cursor-pointer
                  "
                >
                  Aceitar Todos
                </button>

                <button
                  onClick={() => setShowSettings(true)}
                  className="
                    bg-white/10 
                    hover:bg-white/20 
                    text-white 
                    px-4 
                    py-2.5 
                    rounded-full 
                    text-xs 
                    font-medium 
                    transition-all 
                    duration-200 
                    flex 
                    items-center 
                    gap-2
                    cursor-pointer
                  "
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Gerenciar Preferências</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL DE CONFIGURAÇÕES AVANÇADAS (ENGRENAGEM) */}
      {isOpen && showSettings && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="
              bg-white 
              text-[#0B2A4A] 
              w-full 
              max-w-lg 
              rounded-[28px] 
              p-6 
              sm:p-8 
              shadow-2xl 
              border 
              border-slate-100 
              relative 
              animate-in 
              fade-in 
              zoom-in-95 
              duration-200
            "
          >
            {/* CABEÇALHO MODAL */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Settings className="w-5 h-5 text-[#164A73]" />
                <h3 className="text-lg font-bold text-[#0B2A4A] tracking-tight">
                  Preferências de Cookies
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#0B2A4A] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* LISTA DE OPÇÕES LGPD */}
            <div className="py-6 space-y-5 max-h-[60vh] overflow-y-auto pr-1">
              
              {/* COOKIES NECESSÁRIOS */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider">
                      Estritamente Necessários
                    </span>
                    <span className="text-[9px] font-bold bg-[#0B2A4A]/10 text-[#0B2A4A] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Obrigatório
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Essenciais para o funcionamento seguro do site e carregamento de fontes e scripts fundamentais.
                  </p>
                </div>
                {/* Switch Bloqueado */}
                <div className="w-10 h-6 bg-[#0B2A4A] rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-80">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-[#0B2A4A]" />
                  </div>
                </div>
              </div>

              {/* COOKIES ANALÍTICOS */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div>
                  <span className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider">
                    Desempenho & Analíticos
                  </span>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Nos ajudam a entender como os visitantes interagem com o site, permitindo melhorar continuamente a navegação.
                  </p>
                </div>
                {/* Switch Interativo */}
                <button
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      analytics: !prev.analytics,
                    }))
                  }
                  className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer ${
                    preferences.analytics ? "bg-[#0B2A4A] justify-end" : "bg-slate-200 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>

              {/* COOKIES DE MARKETING */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div>
                  <span className="text-xs font-bold text-[#0B2A4A] uppercase tracking-wider">
                    Anúncios & Mídia Social
                  </span>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Utilizados para exibir conteúdos mais relevantes e mensurar a eficácia das nossas campanhas institucionais.
                  </p>
                </div>
                {/* Switch Interativo */}
                <button
                  onClick={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      marketing: !prev.marketing,
                    }))
                  }
                  className={`w-10 h-6 rounded-full transition-colors duration-200 flex items-center px-1 cursor-pointer ${
                    preferences.marketing ? "bg-[#0B2A4A] justify-end" : "bg-slate-200 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>

            </div>

            {/* BOTÃO SALVAR */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => handleSavePreferences()}
                className="
                  w-full 
                  bg-[#0B2A4A] 
                  text-white 
                  py-3 
                  rounded-full 
                  text-xs 
                  font-bold 
                  uppercase 
                  tracking-wider 
                  hover:bg-[#164A73] 
                  transition-colors 
                  shadow-md
                  cursor-pointer
                "
              >
                Salvar Minhas Escolhas
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}