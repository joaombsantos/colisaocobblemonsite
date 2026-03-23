import heroGif from "../assets/hero.gif";
import { Button } from "./Button";
import { FaDownload } from "react-icons/fa";

export function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <img 
                    src={heroGif} 
                    alt="Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
                <h1 className="font-title text-4xl md:text-7xl text-bright_text drop-shadow-lg">
                    Viva a Aventura
                </h1>
                <p className="font-body text-xl md:text-2xl text-bright_text max-w-2xl drop-shadow-md">
                    Explore o mundo de Pokemon no Minecraft
                    <br />Sua jornada começa aqui!
                </p>
                
                <div className="mt-4">
                    <Button 
                        label="Começar Jornada" 
                        icon={FaDownload} 
                        fontSize="2xl" 
                        destination="/download"
                        color="primary"
                    />
                </div>
            </div>
        </section>
    );
}