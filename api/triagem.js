// api/triagem.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, objetivo, dor, urgencia } = req.body;

  const prompt = `
    Você é um assistente virtual de triagem odontológica para a clínica "Anatomia do Sorriso".
    Analise as respostas do paciente e gere um resumo conciso e profissional em até 3 frases.

    Dados do Paciente:
    - Nome: ${nome}
    - Principal Objetivo: ${objetivo}
    - Sintomas/Desconforto: ${dor}
    - Nível de Urgência: ${urgencia}

    Sua resposta deve retornar um JSON no seguinte formato:
    {
      "recomendacao": "Descrição curta da recomendação",
      "especialista": "Nome da especialidade recomendada (ex: Implantodontia, Ortodontia, Estética)",
      "mensagemWhatsapp": "Texto formatado para enviar no WhatsApp"
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const resultado = JSON.parse(response.choices[0].message.content);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao processar triagem.' });
  }
}