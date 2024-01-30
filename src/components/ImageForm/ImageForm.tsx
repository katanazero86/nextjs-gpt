'use client';

import {useState} from "react";
import BasicButton from "@/components/Buttons/BasicButton/BasicButton";
import LoadingButton from "@/components/Buttons/LoadingButton/LoadingButton";

interface CatAndDogTypes {
    [key: string]: string
}

const CAT_AND_DOG_TYPES: CatAndDogTypes = {
    persian: '페르시안',
    'maine coon': '메인쿤',
    siamese: '샴',
    'golden retriever': '골든 리트리버',
    maltese: '말티즈',
    dachshund: '닥스훈트'
};

export default function ImageForm() {
    const [imageForm, setImageForm] = useState<{
        animal: 'cat' | 'dog';
        color: 'black' | 'white' | 'brown';
        catType: 'persian' | 'maine coon' | 'siamese';
        dogType: 'golden retriever' | 'maltese' | 'dachshund';
    }>({
        animal: 'cat',
        color: 'black',
        catType: 'persian',
        dogType: 'golden retriever',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setImageForm({
            ...imageForm,
            [name]: value
        });
    };

    const renderType = () => {
        const catType = ['persian', 'maine coon', 'siamese'];
        const dogType = ['golden retriever', 'maltese', 'dachshund'];
        if (imageForm.animal === 'cat') {
            return (
                <>
                    {catType.map(cat => (<div key={cat} className="flex items-center mb-4">
                        <label
                            className="ms-2 text-sm text-teal-600 flex items-center">
                            <input type="radio"
                                   name='catType'
                                   value={cat}
                                   checked={imageForm.catType === cat}
                                   onChange={handleChange}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <span className='pl-2'>{CAT_AND_DOG_TYPES[cat]}</span>
                        </label>
                    </div>))}
                </>
            )
        } else {
            return (
                <>
                    {dogType.map(dog => (<div key={dog} className="flex items-center mb-4">
                        <label
                            className="ms-2 text-sm text-teal-600 flex items-center">
                            <input type="radio"
                                   name='dogType'
                                   value={dog}
                                   checked={imageForm.dogType === dog}
                                   onChange={handleChange}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <span className='pl-2'>{CAT_AND_DOG_TYPES[dog]}</span>
                        </label>
                    </div>))}
                </>
            )
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const params = {
                ...imageForm
            };
            setIsLoading(true);
            const res = await fetch('/api/openai/images', {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const imageUrl = await res.json();
            console.log(imageUrl);
            // TODO: 전달받은 URL을 바로 처리하는게 아니라, S3 같은곳에 업로드 후에 제공 받기
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <form className='w-full' onSubmit={handleSubmit}>
            <div>
                <div className="flex items-center mb-4">
                    <label
                        className="ms-2 text-sm text-indigo-600 flex items-center">
                        <input type="radio"
                               name='animal'
                               value='cat'
                               checked={imageForm.animal === 'cat'}
                               onChange={handleChange}
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <span className='pl-2'>고양이</span>
                    </label>
                </div>
                <div className="flex items-center">
                    <label
                        className="ms-2 text-sm text-indigo-600 flex items-center">
                        <input type="radio"
                               name='animal'
                               value='dog'
                               checked={imageForm.animal === 'dog'}
                               onChange={handleChange}
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <span className='pl-2'>강아지</span>
                    </label>
                </div>
            </div>
            <hr className="h-px my-4 bg-gray-400 border-0"/>
            <div>
                <div className="flex items-center mb-4">
                    <label
                        className="ms-2 text-sm text-pink-600 flex items-center">
                        <input type="radio"
                               name='color'
                               value='black'
                               checked={imageForm.color === 'black'}
                               onChange={handleChange}
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <span className='pl-2'>검정색</span>
                    </label>
                </div>
                <div className="flex items-center mb-4">
                    <label
                        className="ms-2 text-sm text-pink-600 flex items-center">
                        <input type="radio"
                               name='color'
                               value='white'
                               checked={imageForm.color === 'white'}
                               onChange={handleChange}
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <span className='pl-2'>하얀색</span>
                    </label>
                </div>
                <div className="flex items-center">
                    <label
                        className="ms-2 text-sm text-pink-600 flex items-center">
                        <input type="radio"
                               name='color'
                               value='brown'
                               checked={imageForm.color === 'brown'}
                               onChange={handleChange}
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <span className='pl-2'>갈색</span>
                    </label>
                </div>
            </div>
            <hr className="h-px my-4 bg-gray-400 border-0"/>
            <div>
                {renderType()}
            </div>
            {isLoading ? <LoadingButton wFull/> : <BasicButton type='submit' wFull>
                생성 요청하기
            </BasicButton>}
        </form>
    )
}