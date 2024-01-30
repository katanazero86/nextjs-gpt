import {OpenAiServices} from "@/services/openAi.services";

export async function POST(request: Request) {
    const { animal, color, catType, dogType } = await request.json()
    console.log(animal, color, catType, dogType);
    try {
        const openAiServices = OpenAiServices.getInstance();
        const resultImageUrl = await openAiServices.generateImage();
        return Response.json(resultImageUrl);
    } catch (err) {
        return Response.json(err);
    }
}