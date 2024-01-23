import {NextResponse} from "next/server";
import {main, Message} from "@/services/openAi.services";
import {OpenAIStream, StreamingTextResponse} from "ai";

export async function POST(request: Request) {
    const data = await request.json();
    if(!data || !data.text) return NextResponse.json({
        error: 'Not Data'
    }, {
        status: 500
    });

    try {
        const { text } = data;
        const messageObj: Message = {
            role: 'user',
            content: text as string,
        }
        const completionStream = await main(messageObj);
        const stream = OpenAIStream(completionStream);
        return new StreamingTextResponse(stream);
    } catch (err) {
        return Response.json(err);
    }
}