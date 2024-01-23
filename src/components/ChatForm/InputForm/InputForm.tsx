'use client';

import {useState} from 'react';
import {ChatRequestOptions} from "ai";

interface InputFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void;
    onChange: (e: any) => void;
    onStop: () => void;
    value: string;
    isLoading: boolean;
}

export default function InputForm({onSubmit, onChange, onStop, value, isLoading}: InputFormProps) {

    return (
        <form className='py-2 flex items-center' onSubmit={onSubmit}>
            <input
                className='flex-auto appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-700'
                type='text'
                placeholder='질문을 입력하세요.'
                value={value}
                onChange={onChange}
                disabled={isLoading}
            />
            {isLoading ?
                <button
                    type="button"
                    className="ml-2 text-indigo-700 hover:bg-indigo-700 hover:text-white border border-indigo-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={onStop}>
                    중지
                </button>
                :
                <button
                    className='ml-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'>
                    전송
                </button>}
        </form>
    )
}