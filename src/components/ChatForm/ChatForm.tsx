'use client';
import {useChat} from "ai/react";
import InputForm from "@/components/ChatForm/InputForm/InputForm";
import Messages from "@/components/ChatForm/Messages/Messages";

export default function ChatForm() {

    const {messages, input, handleInputChange, handleSubmit, stop, isLoading } = useChat({
        api: '/api/openai',
        onError(error) {
            console.error(error)
        },
        initialInput: '',
        onFinish(message) {
            console.log(message);
        },
    });

    return (
        <>
            <div className="w-full flex-auto overflow-y-auto min-h-0">
                <Messages messages={messages}/>
            </div>
            <div className='w-full'>
                <InputForm value={input} onSubmit={handleSubmit} onChange={handleInputChange} onStop={stop} isLoading={isLoading}/>
            </div>
        </>
    )
}