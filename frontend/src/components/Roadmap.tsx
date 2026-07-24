import { useState } from "react";
import { Box } from "./Box";

interface RoadmapItem {
    id: number;
    title: string;
    date: string;
    description: string;
    features: string[];
    color: string;
}

const roadmapData: RoadmapItem[] = [
    {
        id: 1,
        title: "Kanto",
        date: "17/01/2026",
        description: "Abertura oficial do servidor com a Região de Kanto.",
        features: ["Região de Kanto", "Sistema de Ginásios", "Pokémon da 1ª Geração", "Economia Dinâmica", "Sistema de Breeding"],
        color: "bg-thirdary"
    },
    {
        id: 2,
        title: "Kanto+",
        date: "07/03/2026",
        description: "Uma experiência completa com novas mecânicas exclusivas do servidor.",
        features: ["Todos os Pokémon", "Missões Exclusivas", "Profissões", "Novas Mecânicas"],
        color: "bg-primary"
    },
    {
        id: 3,
        title: "Survival",
        date: "25/07/2026",
        description: "Aventura Pokémon pelo mundo de Minecraft.",
        features: ["Todos os Pokémon", "Sistema de Breeding", "Clans", "Raids todo dia", "Itens exclusivos", "Novos minérios"],
        color: "bg-secondary"
    }
];

export function Roadmap() {
    const [selectedItem, setSelectedItem] = useState<RoadmapItem>(roadmapData[0]);

    return (
        <div className="w-full max-w-5xl py-12 flex flex-col items-center gap-10">
            <h2 className="font-title text-4xl text-foreground">Servidores</h2>

            <div className="flex flex-wrap justify-center gap-8 md:gap-20">
                {roadmapData.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center gap-4 cursor-pointer group"
                        onClick={() => setSelectedItem(item)}
                    >
                        <div className={`
                            w-20 h-20 md:w-32 md:h-32 rounded-full transition-all duration-300 shadow-lg
                            ${item.color} 
                            ${selectedItem.id === item.id ? "scale-110 ring-4 ring-button" : "opacity-70 group-hover:opacity-100"}
                        `} />

                        <div className="text-center max-w-37.5">
                            <h3 className="font-bold text-lg md:text-xl leading-tight">{item.title}</h3>
                            <p className="text-sm opacity-80">{item.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Box color="bg-[#f0ede4]" className="dark:bg-white/5 min-h-75">
                <h4 className="font-bold text-2xl mb-2 text-primary">
                    {selectedItem.title}
                </h4>
                <p className="font-body text-lg mb-6 max-w-2xl text-foreground/80">
                    {selectedItem.description}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-left list-disc pl-5">
                    {selectedItem.features.map((feature, index) => (
                        <li key={index} className="font-body text-md opacity-90">
                            {feature}
                        </li>
                    ))}
                </ul>
            </Box>
        </div>
    );
}