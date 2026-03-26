import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.CHATGPT_API_KEY });

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  usage?: any;
}

export async function createChatCompletion(messages: ChatMessage[]): Promise<ChatResponse> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });
    return {
      message: response.choices[0].message.content || '',
      usage: response.usage
    };
  } catch (error) {
    throw new Error(`ChatGPT completion failed: ${error}`);
  }
}

export async function generateText(prompt: string): Promise<string> {
  try {
    const response = await createChatCompletion([{ role: 'user', content: prompt }]);
    return response.message;
  } catch (error) {
    throw new Error(`Text generation failed: ${error}`);
  }
}