import { streamText } from 'ai';
import { openrouter } from '../lib/ai';

export default {
    async generateRecipe(prompt: string){
        const result = streamText({
            model: openrouter('google/gemini-2.0-flash-exp:free'),
            prompt,
            system: "Eres un bartender que tiene 50 años de experiencia y le sirvió una bebida a una persona importante en Grupo Salinas."
        });

        return result.textStream;
    }
}