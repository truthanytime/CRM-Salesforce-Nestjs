import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi(
      new Configuration({ apiKey: process.env.OPENAI_KEY }),
    );
  }

  async generateAISummary(prompt: string): Promise<string> {
    const model = 'text-davinci-003';
    const maxTokens = 100;
    const temperature = 0.5;

    const response = await this.openai.createCompletion({
      model,
      prompt,
      max_tokens: maxTokens,
      n: 1,
      temperature,
    });
    return response.data.choices
      .map((item) => item.text)
      .join('\n')
      .split('. ')
      .slice(0, -1)
      .join('. ')
      .concat('.');
  }
}
