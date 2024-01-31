import {cva} from "class-variance-authority";
import {cnUtil} from "@/utils/cnUtil";

const outlineButtonVariants = cva(`text-indigo-700 hover:bg-indigo-800 hover:text-white border border-indigo-700 font-bold py-2 px-4 rounded focus:outline-none`, {
    variants: {
        wFull: {
            true: 'w-full'
        }
    }
});

interface OutlineButtonProps {
    children: React.ReactNode;
    wFull?: boolean;
    type?: 'button' | 'submit';
    onClick?: () => void;
}

export default function OutlineButton({
                                          children, wFull = false, type = 'button', onClick = () => {
    }
                                      }: OutlineButtonProps) {

    const classes = outlineButtonVariants({wFull});

    return type === 'submit' ? (
        <button
            type={type}
            className={cnUtil(classes)}
        >
            {children}
        </button>
    ) : (
        <button
            type={type}
            className={cnUtil(classes)}
            onClick={onClick}
        >
            {children}
        </button>
    )
}