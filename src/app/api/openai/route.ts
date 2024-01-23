import {main} from "@/services/openAi.services";
import {OpenAIStream, StreamingTextResponse} from "ai";

export async function POST(request: Request) {
    const { messages } = await request.json()
    console.log(messages);
    try {
        const completionStream = await main(messages);
        const stream = OpenAIStream(completionStream);
        return new StreamingTextResponse(stream);
    } catch (err) {
        return Response.json(err);
    }
}