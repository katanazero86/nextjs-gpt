import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
export async function main(messages: any) {
    // messages: [{ role: "system", content: "You are a helpful assistant." }],
    return openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'You are a helpful assistant.'},
            ...messages
        ],
        model: "gpt-3.5-turbo",
        stream: true,
        max_tokens: 350, // 생성되는 텍스트 최대 길이
    });
}