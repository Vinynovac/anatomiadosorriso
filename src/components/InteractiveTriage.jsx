import { useState } from 'react';

export default function InteractiveTriage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    objetivo: '',
    descricaoLivre: '',
  });
  const [resultado, setResultado] = useState(null);

  const handleNext = () => setStep((prev) => prev + 1);

  const handleReset = () => {
    setResultado(null);
    setStep(1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/triagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResultado(data);
      setStep(4);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar acolhimento. Verifique se o servidor backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const abrirWhatsapp = () => {
    const telefoneClinica = '5538988456205';
    const texto = encodeURIComponent(
      `Olá! Fiz o acolhimento prévio pelo site da Anatomia do Sorriso.\n\n` +
      `*Paciente:* ${formData.nome}\n` +
      `*Foco de Interesse:* ${formData.objetivo}\n` +
      `*Relato:* ${formData.descricaoLivre || 'Não detalhado'}\n\n` +
      `*Orientações Iniciais:*\n${resultado?.analiseInicial}\n\n` +
      `Gostaria de agendar uma consulta de avaliação presencial!`
    );
    window.open(`https://wa.me/${telefoneClinica}?text=${texto}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
          Atendimento Digital
        </span>
        <h3 className="text-2xl font-bold text-slate-800 mt-2">Acolhimento Prévia para Agendamento</h3>
        <p className="text-sm text-slate-500">Responda em 1 minuto para orientarmos os próximos passos da sua visita.</p>
      </div>

      {/* ETAPA 1: NOME */}
      {step === 1 && (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">Como podemos te chamar?</label>
          <input
            type="text"
            className="w-full p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all text-slate-800"
            placeholder="Digite seu nome completo"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
          <button
            disabled={!formData.nome.trim()}
            onClick={handleNext}
            className="w-full py-4 bg-blue-900 hover:bg-blue-950 text-white rounded-2xl font-bold disabled:opacity-50 transition-all cursor-pointer"
          >
            Continuar
          </button>
        </div>
      )}

      {/* ETAPA 2: OBJETIVO */}
      {step === 2 && (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">Qual o seu foco principal no momento?</label>
          <div className="grid grid-cols-1 gap-2">
            {[
              'Estética (Clareamento, Facetas, Lentes)',
              'Alinhamento Dental & Ortodontia',
              'Restauração / Falta de Dentes (Implantes)',
              'Saúde & Prevenção (Consulta Geral, Sensibilidade, Limpeza)',
            ].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setFormData({ ...formData, objetivo: item });
                  handleNext();
                }}
                className="p-4 text-left border border-slate-200 rounded-2xl hover:bg-blue-50 hover:border-blue-900 transition-all font-medium text-slate-700 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ETAPA 3: TEXTO LIVRE */}
      {step === 3 && (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            Descreva o que gostaria de avaliar ou o desconforto que sente:
          </label>
          <textarea
            rows={4}
            className="w-full p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all text-slate-800"
            placeholder="Ex: Gostaria de saber mais sobre alinhadores transparentes / Gostaria de agendar uma revisão de rotina..."
            value={formData.descricaoLivre}
            onChange={(e) => setFormData({ ...formData, descricaoLivre: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-blue-900 hover:bg-blue-950 text-white rounded-2xl font-bold transition-all cursor-pointer"
          >
            Gerar Orientação Inicial
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-900 border-t-transparent mb-4"></div>
          <p className="text-base font-semibold text-slate-700">Organizando suas informações de acolhimento...</p>
          <p className="text-xs text-slate-400 mt-1">Preparando orientações para o seu agendamento presencial</p>
        </div>
      )}

      {/* ETAPA 4: RESULTADO COM ISENÇÃO E AVISO LEGAL CRO */}
      {step === 4 && resultado && (
        <div className="space-y-5">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Acolhimento Prévio para {formData.nome.split(' ')[0]}
              </span>
              <span className="text-xs bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded-full">
                Atendimento Presencial Recomendado
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase">Orientação Inicial</h4>
              <p className="text-sm text-slate-700 mt-1 leading-relaxed font-medium">
                {resultado.analiseInicial}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Próximo Passo Recomendado</h4>
              <p className="text-sm font-medium text-slate-800 mt-1">
                {resultado.planoSugerido}
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
            💡 <strong>Deseja agendar sua consulta presencial?</strong> Ao clicar no botão abaixo, nossa equipe receberá este resumo no WhatsApp para agilizar a marcação do seu horário com nossos cirurgiões-dentistas.
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleReset}
              className="w-full sm:w-1/3 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-2xl font-semibold text-sm transition-all cursor-pointer"
            >
              🔄 Refazer
            </button>

            <button
              onClick={abrirWhatsapp}
              className="w-full sm:w-2/3 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              Agendar Avaliação Presencial no WhatsApp
            </button>
          </div>

          {/* DISCLAIMER FIXO DE BLINDAGEM JURÍDICA E COMPLIANCE CRO */}
          <div className="pt-4 border-t border-slate-100 text-left">
            <p className="text-[11px] text-slate-400 font-light leading-relaxed">
              <strong className="font-semibold text-slate-500">Aviso Importante:</strong> Esta triagem possui caráter estritamente informativo e de acolhimento prévio para agendamento. Não substitui, em nenhuma hipótese, o diagnóstico, a consulta odontológica ou a indicação de tratamento, que são realizados exclusivamente por um cirurgião-dentista durante a avaliação clínica presencial (Lei Federal nº 5.081/66).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}