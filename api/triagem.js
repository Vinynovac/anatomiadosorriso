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
    // Garante parse do body se vier como string na Serverless Function
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { nome, objetivo, descricaoLivre } = body || {};

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY não configurada na Vercel' });
    }

    const prompt = `
      Você é um assistente especialista em triagem odontológica da clínica "Anatomia do Sorriso".
      Analise a solicitação do paciente e forneça uma orientação prévia acolhedora e técnica.

      DADOS DO PACIENTE:
      - Nome: ${nome || 'Paciente'}
      - Foco Principal: ${objetivo || 'Consulta Geral'}
      - Relato Detalhado: "${descricaoLivre || 'Não informado'}"

      INSTRUÇÕES OBRIGATÓRIAS:
      - NUNCA deixe os campos em branco.
      - Na "analiseInicial", explique resumidamente como a odontologia trata o caso específico do paciente.
      - No "planoSugerido", cite os passos práticos para a consulta inicial.
      - Na "especialidade", indique a área médica responsável.

      Retorne EXATAMENTE este objeto JSON:
      {
        "analiseInicial": "Sua análise detalhada aqui.",
        "planoSugerido": "O plano de ação sugerido aqui.",
        "especialista": "A especialidade odontológica indicada"
      }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.5,
    });

    const resultado = JSON.parse(response.choices[0].message.content);

    return res.status(200).json({
      analiseInicial: resultado.analiseInicial || 'Análise prévia concluída com sucesso.',
      planoSugerido: resultado.planoSugerido || 'Avaliação clínica presencial.',
      especialista: resultado.especialista || 'Odontologia Geral',
    });
  } catch (error) {
    console.error('Erro na Vercel Function:', error);
    return res.status(500).json({ 
      error: 'Erro interno ao processar triagem',
      details: error.message 
    });
  }
}