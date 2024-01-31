import {cva} from "class-variance-authority";
import {cnUtil} from "@/utils/cnUtil";

const radioButtonLabelVariants = cva(`ms-2 text-sm flex items-center cursor-pointer`, {
    variants: {
        color: {
            indigo: `text-indigo-600`,
            pink: `text-pink-600`,
            teal: `text-teal-600`,
        }
    },
    defaultVariants: {
        color: 'indigo'
    }
});
const radioButtonInputVariants = cva(`w-4 h-4`);
const radioButtonLabelTextVariants = cva(`pl-2`);

interface RadioButtonProps {
    name: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
    color?: 'indigo' | 'pink' | 'teal';
}

export default function RadioButton({name, value, checked, onChange, children, color = 'indigo'}: RadioButtonProps) {

    const radioButtonLabelClasses = radioButtonLabelVariants({color});
    const radioButtonInputClasses = radioButtonInputVariants();
    const radioButtonLabelTextClasses = radioButtonLabelTextVariants();

    return (
        <label className={cnUtil(radioButtonLabelClasses)}>
            <input type="radio"
                   name={name}
                   value={value}
                   checked={checked}
                   onChange={onChange}
                   className={cnUtil(radioButtonInputClasses)}/>
            <span className={cnUtil(radioButtonLabelTextClasses)}>{children}</span>
        </label>
    )
}