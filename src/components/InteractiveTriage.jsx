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
      alert('Erro ao gerar análise. Verifique se o servidor backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const abrirWhatsapp = () => {
    const telefoneClinica = '553832210122';
    const texto = encodeURIComponent(
      `Olá! Realizei a triagem inteligente pelo site da Anatomia do Sorriso.\n\n` +
      `*Paciente:* ${formData.nome}\n` +
      `*Foco do Tratamento:* ${formData.objetivo}\n` +
      `*Relato:* ${formData.descricaoLivre || 'Não detalhado'}\n\n` +
      `*Orientação Gerada pela IA:*\n${resultado?.analiseInicial}\n\n` +
      `*Especialidade Recomendada:* ${resultado?.especialista}\n` +
      `Gostaria de agendar uma consulta de avaliação!`
    );
    window.open(`https://wa.me/${telefoneClinica}?text=${texto}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
          Tecnologia Odontológica
        </span>
        <h3 className="text-2xl font-bold text-slate-800 mt-2">Triagem Clínica Personalizada</h3>
        <p className="text-sm text-slate-500">Responda em 1 minuto para nossa IA estruturar sua orientação inicial.</p>
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
            className="w-full py-4 bg-blue-900 hover:bg-blue-950 text-white rounded-2xl font-bold disabled:opacity-50 transition-all"
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
              'Saúde & Dor (Canal, Sensibilidade, Limpeza)',
            ].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setFormData({ ...formData, objetivo: item });
                  handleNext();
                }}
                className="p-4 text-left border border-slate-200 rounded-2xl hover:bg-blue-50 hover:border-blue-900 transition-all font-medium text-slate-700"
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
            Descreva o que gostaria de mudar no seu sorriso ou o desconforto que sente:
          </label>
          <textarea
            rows={4}
            className="w-full p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all text-slate-800"
            placeholder="Ex: Tenho sensibilidade nos dentes da frente ao tomar café / Gostaria de fazer clareamento para um evento..."
            value={formData.descricaoLivre}
            onChange={(e) => setFormData({ ...formData, descricaoLivre: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-blue-900 hover:bg-blue-950 text-white rounded-2xl font-bold transition-all"
          >
            Gerar Análise Personalizada
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-900 border-t-transparent mb-4"></div>
          <p className="text-base font-semibold text-slate-700">Analisando seu relato com Inteligência Artificial...</p>
          <p className="text-xs text-slate-400 mt-1">Estruturando sugestão de tratamento para a equipe médica</p>
        </div>
      )}

      {/* ETAPA 4: RESULTADO COM OPÇÕES DE DECISÃO DO PACIENTE */}
      {step === 4 && resultado && (
        <div className="space-y-5">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-left">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Pré-Análise Gerada para {formData.nome.split(' ')[0]}
              </span>
              <span className="text-xs bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded-full">
                {resultado.especialista || 'Odontologia Geral'}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase">Orientação da IA</h4>
              <p className="text-sm text-slate-700 mt-1 leading-relaxed font-medium">
                {resultado.analiseInicial}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Sugestão de Próximos Passos</h4>
              <p className="text-sm font-medium text-slate-800 mt-1">
                {resultado.planoSugerido}
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 leading-relaxed">
            💡 <strong>Deseja enviar esta pré-análise para nossa equipe?</strong> Ao clicar no botão abaixo, a recepção da Anatomia do Sorriso receberá este resumo no WhatsApp para agilizar sua avaliação presencial.
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleReset}
              className="w-full sm:w-1/3 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-2xl font-semibold text-sm transition-all"
            >
              🔄 Refazer Triagem
            </button>

            <button
              onClick={abrirWhatsapp}
              className="w-full sm:w-2/3 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
            >
              Envie a análise para agendar no WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}