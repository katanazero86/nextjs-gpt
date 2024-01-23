import OpenAI from "openai";

export interface Message {
    role: 'user' | 'system';
    content: string;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
export async function main(messageObj: Message) {
    const completionStream = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }, messageObj],
        model: "gpt-3.5-turbo",
        stream: true
    });
    console.log(completionStream);
    return completionStream;
}