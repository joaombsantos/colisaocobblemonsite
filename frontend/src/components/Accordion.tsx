import { useState, type ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionProps {
    label: string;
    children: ReactNode;
    className?: string;
}

export function Accordion({ label, children, className = "" }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`
            w-full 
            bg-secondary/10 
            dark:bg-white/5 
            border-2 
            border-secondary/20 
            rounded-2xl 
            overflow-hidden 
            transition-all 
            duration-300
            ${className}
        `}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-secondary/20 transition-colors"
            >
                <span className="font-body font-bold text-lg text-foreground">
                    {label}
                </span>
                <FaChevronDown 
                    className={`transition-transform duration-300 text-primary ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`} 
                />
            </button>

            <div className={`
                transition-all 
                duration-300 
                ease-in-out 
                ${isOpen ? "max-h-250 opacity-100 p-5 pt-0" : "max-h-0 opacity-0 overflow-hidden"}
            `}>
                <div className="h-px bg-secondary/20 w-full mb-4" />
                <div className="font-body text-foreground/80 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}