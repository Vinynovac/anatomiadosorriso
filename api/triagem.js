import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { nome, objetivo, descricaoLivre } = body || {};

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY não configurada na Vercel' });
    }

    // PROMPT EM CONFORMIDADE COM O CRO/CFO (SEM DIAGNÓSTICO E SEM ESPECIFICAÇÃO DE CAUSAS)
    const prompt = `
      Você é o assistente virtual de agendamento e acolhimento prévio da clínica "Anatomia do Sorriso".
      Acolha a solicitação do paciente de forma ética, profissional e acolhedora.

      DADOS DO PACIENTE:
      - Nome: ${nome || 'Paciente'}
      - Foco Principal: ${objetivo || 'Consulta Geral'}
      - Relato do Paciente: "${descricaoLivre || 'Não informado'}"

      REGRAS ÉTICAS E JURÍDICAS OBRIGATÓRIAS (CRO/CFO):
      1. NUNCA faça diagnósticos, hipóteses diagnósticas ou cite nomes de patologias específicas (ex: não diga que pode ser cárie, canal, gengivite, etc.).
      2. NUNCA recomende tratamentos específicos (ex: não diga que precisará de obturação, extração ou canal).
      3. Reforce SEMPRE de forma educacional que sintomas e desconfortos bucais exigem obrigatoriamente um exame clínico presencial completo para avaliação correta.
      4. Mantenha um tom acolhedor, profissional e de prontidão para o agendamento presencial.

      INSTRUÇÕES DOS CAMPOS DE RETORNO:
      - "analiseInicial": Acolha o relato e mencione de forma genérica e educacional a importância de passar por uma avaliação clínica no consultório para o caso do paciente.
      - "planoSugerido": Explique brevemente como funciona a consulta presencial (exame físico, anamnese e direcionamento para a equipe de odontologia da clínica).
      - "especialista": Retorne SEMPRE a string neutra "Avaliação Clínica Presencial".

      Retorne EXATAMENTE este objeto JSON:
      {
        "analiseInicial": "Mensagem acolhedora e educacional aqui.",
        "planoSugerido": "Passos para a consulta presencial aqui.",
        "especialista": "Avaliação Clínica Presencial"
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3, // Temperatura reduzida para garantir respostas mais sóbrias e padronizadas
    });

    const resultado = JSON.parse(response.choices[0].message.content);

    return res.status(200).json({
      analiseInicial: resultado.analiseInicial || 'Relato recebido. Recomendamos uma avaliação presencial para exame clínico detalhado.',
      planoSugerido: resultado.planoSugerido || 'Agendamento de consulta inicial com o corpo clínico presencial.',
      especialista: 'Avaliação Clínica Presencial', // Garantia neutra no fallback
      disclaimer: 'Esta triagem possui caráter exclusivamente orientativo de acolhimento e não substitui o diagnóstico clínico presencial realizado pelo cirurgião-dentista (Lei Federal 5.081/66).'
    });
  } catch (error) {
    console.error('Erro na Vercel Function:', error);
    return res.status(500).json({ 
      error: 'Erro interno ao processar triagem',
      details: error.message 
    });
  }
}