interface DropdwonProps {
    label: string;
    options: string[];
    onSelect?: (option: string) => void;
}


export function Dropdown({ label, options, onSelect }: DropdwonProps) {
    return (
        <div className="w-full p-4">
            <label htmlFor="dropdown" className="block text-left font-body font-bold">{label}</label>
            <select id="dropdown" className="w-full mt-2 bg-background border border-secondary rounded-md p-2">
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}