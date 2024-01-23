import {openAiMain} from "@/services/openAiTestService";

export async function GET(request: Request, response: Response) {
    let res;
    try {
        res = await openAiMain();
    } catch (err) {
        return Response.json(err);
    }
    return Response.json(res);
}