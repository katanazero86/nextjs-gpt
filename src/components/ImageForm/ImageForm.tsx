'use client';

import {useState} from "react";
import BasicButton from "@/components/Atoms/Buttons/BasicButton/BasicButton";
import LoadingButton from "@/components/Atoms/Buttons/LoadingButton/LoadingButton";
import RadioButton from "@/components/Atoms/Buttons/RadioButton/RadioButton";

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
                        <RadioButton name='catType' value={cat} checked={imageForm.catType === cat} onChange={handleChange} color='teal'>
                            {CAT_AND_DOG_TYPES[cat]}
                        </RadioButton>
                    </div>))}
                </>
            )
        } else {
            return (
                <>
                    {dogType.map(dog => (<div key={dog} className="flex items-center mb-4">
                        <RadioButton name='catType' value={dog} checked={imageForm.dogType === dog} onChange={handleChange} color='teal'>
                            {CAT_AND_DOG_TYPES[dog]}
                        </RadioButton>
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
                    <RadioButton name='animal' value='cat' checked={imageForm.animal === 'cat'} onChange={handleChange}>
                        고양이
                    </RadioButton>
                </div>
                <div className="flex items-center">
                    <RadioButton name='animal' value='dog' checked={imageForm.animal === 'dog'} onChange={handleChange}>
                        강아지
                    </RadioButton>
                </div>
            </div>
            <hr className="h-px my-4 bg-gray-400 border-0"/>
            <div>
                <div className="flex items-center mb-4">
                    <RadioButton name='color' value='black' checked={imageForm.color === 'black'} onChange={handleChange} color='pink'>
                        검정색
                    </RadioButton>
                </div>
                <div className="flex items-center mb-4">
                    <RadioButton name='color' value='white' checked={imageForm.color === 'white'} onChange={handleChange} color='pink'>
                        하얀색
                    </RadioButton>
                </div>
                <div className="flex items-center">
                    <RadioButton name='color' value='brown' checked={imageForm.color === 'brown'} onChange={handleChange} color='pink'>
                        갈색
                    </RadioButton>
                </div>
            </div>
            <hr className="h-px my-4 bg-gray-400 border-0"/>
            <div>
                {renderType()}
            </div>
            {isLoading ? <LoadingButton wFull/> : <BasicButton type='submit' wFull>
                이미지 생성 요청하기
            </BasicButton>}
        </form>
    )
}