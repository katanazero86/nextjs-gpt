import {OpenAiServices} from "@/services/openAi.services";
import {NextResponse} from "next/server";
import {CloudinaryServices} from "@/services/cloudinary.services";

export async function POST(request: Request) {
    const { animal, color, catType, dogType } = await request.json()
    console.log(animal, color, catType, dogType);
    if(!animal || !color || !catType || !dogType) {
        return NextResponse.json({
            message: '올바른 파라미터를 전송해주세요.'
        }, {
            status: 500
        });
    }
    try {
        const openAiServices = OpenAiServices.getInstance();
        const resultImageUrl = await openAiServices.generateImage(
            animal, color, catType, dogType
        );
        if(resultImageUrl) {
            const cloudinaryServices = new CloudinaryServices();
            const uploadResult = await cloudinaryServices.uploadImage(resultImageUrl);
            return Response.json(uploadResult);
        }
    } catch (err) {
        return NextResponse.json({
            message: err
        }, {
            status: 500,
        });
    }
}