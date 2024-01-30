import {cva} from "class-variance-authority";
import {cnUtil} from "@/utils/cnUtil";

const basicButtonVariants = cva(`bg-indigo-700 hover:bg-indigo-800 text-white border border-indigo-700 font-bold py-2 px-4 rounded focus:outline-none`, {
    variants: {
        wFull: {
            true: 'w-full'
        }
    }
});

interface BasicButtonProps {
    children: React.ReactNode;
    wFull?: boolean;
    type?: 'button' | 'submit';
    onClick?: () => void;
}

export default function BasicButton({
                                        children, wFull = false, type = 'button', onClick = () => {
    }
                                    }: BasicButtonProps) {

    const classes = basicButtonVariants({wFull});

    return type === 'submit' ? (
        <button
            className={cnUtil(classes)}
            type={type}
        >
            {children}
        </button>
    ) : (
        <button
            className={cnUtil(classes)}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}