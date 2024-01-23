'use client';

import {Message} from "ai";

interface MessagesProps {
    messages: Message[];
}

export default function Messages({messages}: MessagesProps) {
    return (
        <>
            {messages.map(m => (
                <div className='text-slate-950 text-sm py-0.5' key={m.id}>
                    <span className='font-semibold'>{m.role === 'user' ? 'User: ' : 'AI: '}</span>
                    {m.content}
                </div>
            ))}
        </>
    )

}