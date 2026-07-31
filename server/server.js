import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/triagem', async (req, res) => {
  const { nome, objetivo, descricaoLivre } = req.body;

  const prompt = `
    Você é um assistente especialista em triagem odontológica da clínica "Anatomia do Sorriso".
    Analise com atenção a solicitação do paciente e forneça uma orientação prévia acolhedora e técnica.

    DADOS DO PACIENTE:
    - Nome: ${nome}
    - Foco Principal: ${objetivo}
    - Relato Detalhado: "${descricaoLivre || 'Não informado'}"

    INSTRUÇÕES OBRIGATÓRIAS:
    - NUNCA use frases genéricas como "Análise prévia concluída".
    - Na "analiseInicial", explique de forma clara como a odontologia trata o problema específico relatado por ${nome} (ex: citar lentes de contato, aparelhos estéticos, implantes, dependendo do que ele pediu).
    - No "planoSugerido", cite os passos práticos para a consulta inicial.
    - Na "especialidade", indique exatamente a área responsável.

    Retorne EXATAMENTE este objeto JSON:
    {
      "analiseInicial": "Sua análise detalhada e personalizada aqui.",
      "planoSugerido": "O plano de ação sugerido aqui.",
      "especialista": "A especialidade odontológica indicada"
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.5,
    });

    const resultado = JSON.parse(response.choices[0].message.content);

    return res.json({
      analiseInicial: resultado.analiseInicial,
      planoSugerido: resultado.planoSugerido,
      especialista: resultado.especialista,
    });
  } catch (error) {
    console.error('Erro na OpenAI:', error);
    return res.status(500).json({ error: 'Erro ao processar triagem com IA' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Backend local da IA rodando em http://localhost:3000');
});