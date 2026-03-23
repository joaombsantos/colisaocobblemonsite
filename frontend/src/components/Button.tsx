import { Link } from "react-router-dom";
import type { IconType } from "react-icons";

interface ButtonProps {
    label?: string;
    onClick?: () => void;
    destination?: string;
    type?: "button" | "submit" | "reset";
    color?: "button" | "primary";
    icon?: IconType;
    fontSize?: "2xl" | "4xl" | "xl";
    className?: string;
}

export function Button({
    label,
    onClick,
    destination,
    type = "button",
    color = "button",
    icon: Icon,
    fontSize = "2xl",
    className = ""
}: ButtonProps) {

    const colorVariants = {
        primary: "bg-primary hover:bg-primary/80",
        button: "bg-button hover:bg-button/80"
    };

    const fontSizeVariants = {
        "2xl": "text-2xl",
        "4xl": "text-4xl",
        "xl": "text-xl"
    };

    const baseClass = `
        ${colorVariants[color]} 
        ${fontSizeVariants[fontSize]}
        text-bright_text 
        font-body 
        font-bold 
        py-4 
        px-10 
        rounded-full 
        transition-all 
        active:scale-95 
        text-center 
        flex 
        items-center 
        justify-center 
        gap-3 
        w-fit 
        whitespace-nowrap
        cursor-pointer
        ${className}
    `;

    const content = (
    <>
        {Icon && <Icon className="shrink-0" />}
        {label && <span>{label}</span>}
    </>
);

    if (destination) {
        return (
            <Link to={destination} className={baseClass}>
                {content}
            </Link>
        );
    }

    return (
        <button
            className={baseClass}
            type={type}
            onClick={onClick}
        >
            {content}
        </button>
    );
}