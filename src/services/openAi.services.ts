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

   async generateImage() {
       // TODO: 이미지 생성 프롬프트 작성 해야함.
       const response = await this.openai.images.generate({
           model: "dall-e-3",
           prompt: "a white siamese cat",
           n: 1,
           quality: "standard",
           size: "1024x1024",
       });
       return response.data[0].url;
   }
}