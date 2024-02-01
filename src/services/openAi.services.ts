import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });
//
// let isFirstRequest = true;
// const systemMessage = {role: 'system', content: 'You are a helpful assistant. And, they answer very kindly and sincerely. And, Your name is Majinga Z'};
// export async function main(messages: any) {
//     // messages: [{ role: "system", content: "You are a helpful assistant." }],
//     const targetMessages = isFirstRequest ? [systemMessage, ...messages] : [...messages];
//     isFirstRequest = false;
//     console.log(targetMessages);
//     return openai.chat.completions.create({
//         messages: targetMessages,
//         model: "gpt-3.5-turbo",
//         stream: true,
//         max_tokens: 100, // 생성되는 텍스트 최대 길이
//     });
// }

export class OpenAiServices {

   private openai: OpenAI;
   private isFirstRequest: boolean = true;
   private static OpenAiServicesInstance: OpenAiServices;
   readonly systemMessage = {role: 'system', content: 'You are a helpful assistant. And, they answer very kindly and sincerely. And, Your name is Majinga Z'};
   constructor() {
       const openai = new OpenAI({
           apiKey: process.env.OPENAI_API_KEY
       });
       this.openai = openai;
   }

   static getInstance(): OpenAiServices {
       if(!OpenAiServices.OpenAiServicesInstance) {
           OpenAiServices.OpenAiServicesInstance = new OpenAiServices();
       }

       return OpenAiServices.OpenAiServicesInstance;
   }

   generateChat(messages: any) {
       const targetMessages = this.isFirstRequest ? [this.systemMessage, ...messages] : [...messages];
       this.isFirstRequest = false;
       console.log(targetMessages);
       return this.openai.chat.completions.create({
           messages: targetMessages,
           model: "gpt-3.5-turbo",
           stream: true,
           max_tokens: 100, // 생성되는 텍스트 최대 길이
       });
   }

   async generateImage(animal: string, color: string, catType: string, dogType: string) {
       // I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: a white siamese cat
       const prompt = `Create an image showing a ${color} ${animal === 'dog' ? dogType : catType} ${animal} running on a green lawn. The image should not include any human elements such as hands, feet, or any other human features.`;
       console.log(prompt);
       const response = await this.openai.images.generate({
           model: "dall-e-3",
           prompt,
           n: 1,
           quality: "standard",
           size: "1024x1024",
       });
       return response.data[0].url;
   }
}