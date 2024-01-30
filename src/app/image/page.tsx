import ChatForm from "@/components/ChatForm/ChatForm";
import Link from "next/link";
import ImageForm from "@/components/ImageForm/ImageForm";

export default function ImageHome() {
    return (
        <main id='app-main' className="flex min-h-screen flex-col items-center p-3">
            <div className="w-full">
                <p className="font-sans text-center text-xl w-full py-2">
                    <code className="font-mono font-bold">src/app/image/page.tsx</code>
                </p>
                <Link href='/'>
                    <p className='text-center text-blue-600 hover:underline'>
                        AI와 질문 주고받기
                    </p>
                </Link>
                <hr className="h-px my-2 border-0 w-full bg-gray-800"/>
                <p className="font-sans text-center text-md w-full py-2">
                    AI를 활용하여, 이미지를 생성해보세요!
                </p>
            </div>
            <ImageForm />
        </main>
    )
}