interface DropdownProps {
    label: string;
    options: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Dropdown({ label, options, value, onChange }: DropdownProps) {
    return (
        <div className="w-full p-4">
            <label htmlFor="dropdown" className="block text-left font-body font-bold">
                {label}
            </label>
            <select 
                id="dropdown" 
                value={value}
                onChange={onChange}
                className="w-full mt-2 bg-background border border-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}