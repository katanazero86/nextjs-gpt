'use client';

import {useState} from 'react';

export default function InputForm() {

    const [text, setText] = useState('');
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(text);

        if (text.trim() !== '') {
            try {
                const res = await fetch('/api/openai', {
                    method: 'POST',
                    body: JSON.stringify({
                        text
                    })
                });
                const data = await res.json();
                console.log(data);
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <form className='py-2 flex items-center' onSubmit={handleSubmit}>
            <input
                className='flex-auto appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-700'
                type='text'
                placeholder='질문을 입력하세요.'
                value={text}
                onChange={handleTextChange}
            />
            <button
                className='ml-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'>전송
            </button>
        </form>
    )
}