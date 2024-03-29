'use client';

import {ChatRequestOptions} from "ai";
import BasicButton from "@/components/Atoms/Buttons/BasicButton/BasicButton";
import OutlineButton from "@/components/Atoms/Buttons/OutlineButton/OutlineButton";

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
                className='flex-auto appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-700 mr-2'
                type='text'
                placeholder='질문을 입력하세요.'
                value={value}
                onChange={onChange}
                disabled={isLoading}
            />
            {isLoading ?
                <OutlineButton onClick={onStop}>
                    중지
                </OutlineButton>
                :
                <BasicButton type='submit'>
                    전송
                </BasicButton>
            }
        </form>
    )
}