import {twMerge} from "tailwind-merge";
import {ClassValue, clsx} from "clsx";

export function cnUtil(...classes: ClassValue[]) {
    return twMerge(clsx(classes));
}