interface InputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "password" | "email" | "number";
    error?: string;
    disabled?: boolean;
    className?: string;
}

export function Input({ 
    label, 
    placeholder, 
    value, 
    onChange, 
    type = "text", 
    error,
    disabled = false,
    className = "" 
}: InputProps) {
    
    const borderClass = error 
        ? "border-destructive focus:border-destructive focus:ring-destructive/50" 
        : "border-primary focus:border-transparent focus:ring-button/50";

    return (
        <div className={`text-left flex flex-col gap-1.5 w-full ${className}`}>
            <label className={`
                text-sm md:text-base  /* Fonte aumenta em telas maiores */
                font-medium font-body transition-colors 
                ${error ? 'text-destructive' : 'text-foreground/80'}
            `}>
                {label}
            </label>
            
            <input 
                className={`
                    w-full 
                    p-3 md:p-4 /* Aumenta o preenchimento interno no desktop */
                    bg-background
                    border-2 
                    rounded-xl 
                    font-body
                    text-base md:text-lg /* Texto do input mais legível em telas grandes */
                    transition-all
                    placeholder:opacity-50
                    focus:outline-none 
                    focus:ring-4 
                    disabled:opacity-50 
                    disabled:cursor-not-allowed
                    ${borderClass}
                `}
                type={type} 
                placeholder={placeholder} 
                value={value} 
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)} 
            />

            {error && (
                <span className="text-destructive text-xs md:text-sm font-medium font-body mt-0.5 animate-in fade-in slide-in-from-top-1">
                    {error}
                </span>
            )}
        </div>
    );
}