import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

let isFirstRequest = true;
const systemMessage = {role: 'system', content: 'You are a helpful assistant. And, they answer very kindly and sincerely. And, Your name is Majinga Z'};
export async function main(messages: any) {
    // messages: [{ role: "system", content: "You are a helpful assistant." }],
    const targetMessages = isFirstRequest ? [systemMessage, ...messages] : [...messages];
    isFirstRequest = false;
    console.log(targetMessages);
    return openai.chat.completions.create({
        messages: targetMessages,
        model: "gpt-3.5-turbo",
        stream: true,
        max_tokens: 100, // 생성되는 텍스트 최대 길이
    });
}