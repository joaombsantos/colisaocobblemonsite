import type { ReactNode } from "react";

interface BoxProps {
    children: ReactNode;
    color?: string;
    className?: string;
}

export function Box({ children, color = "bg-secondary/10", className = "" }: BoxProps) {
    return (
        <div className={`
            w-full 
            rounded-3xl 
            p-8 
            md:p-12 
            border 
            border-secondary/20 
            shadow-sm
            flex 
            flex-col 
            items-center 
            text-center 
            transition-all 
            duration-500
            ${color} 
            ${className}
        `}>
            {children}
        </div>
    );
}