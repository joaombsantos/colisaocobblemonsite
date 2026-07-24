import { FaDownload } from "react-icons/fa6";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { FaDiscord } from "react-icons/fa";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Roadmap } from "../components/Roadmap";

export function Home() {
    return (
        <div className="home min-h-screen w-full overflow-x-hidden">
            <Header />
            <Hero />

            <div className="flex flex-col items-center justify-center gap-12 sm:gap-16 md:gap-20 text-center px-4 md:px-8 py-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                    <img 
                        src="src/assets/celebi.gif" 
                        alt="Banner de Kanto+" 
                        className="max-w-62.5 sm:max-w-xs md:max-w-sm h-auto object-contain" 
                    />
                    <div className="font-body text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl gap-4 flex flex-col justify-center items-center text-center">
                        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                            O que é o Colisão Cobblemon?
                        </h1>
                        <p className="leading-relaxed">
                            Colisão Cobblemon é um servidor que traz a verdadeira essência dos jogos de Pokémon para dentro do Minecraft,
                            combinando as melhores mecânicas da franquia com sistemas exclusivos e diversas regiões imersivas.
                        </p>
                        <Button
                            label="Baixar"
                            icon={FaDownload}
                            fontSize="2xl"
                            destination="/download"
                        />
                    </div>
                </div>

                <div className="bg-black p-4 sm:p-6 md:p-8 rounded-2xl w-full max-w-4xl flex justify-center items-center shadow-2xl">
                    <iframe
                        className="w-full aspect-video rounded-lg shadow-xl"
                        src="https://www.youtube.com/embed/GU3IjCL1gUQ"
                        title="Trailer Colisão Cobblemon"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>

                <div className="font-body text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl gap-4 flex flex-col tracking-wide sm:tracking-widest">
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
                        Escolha a sua jornada!
                    </h1>
                    <p className="leading-relaxed">
                        Escolha a aventura que mais combina com você. 
                        Reviva a clássica jornada no Mapa de Kanto, descubra novos desafios no Kanto+ ou explore um Survival em Mundo Aberto, 
                        onde você tem total liberdade para construir, capturar Pokémon e evoluir sua equipe. 
                        Cada modo oferece uma experiência única, mantendo os sistemas exclusivos que tornam o Colisão Cobblemon diferente.
                    </p>
                </div>

                <div className="w-full max-w-4xl px-8 sm:px-12">
                    <Carousel 
                        className="w-full"
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            <CarouselItem>
                                <img src="src/assets/print1.png" alt="Imagem com Inicias em Pallet" className="w-full h-auto rounded-lg object-cover" />
                            </CarouselItem>
                            <CarouselItem>
                                <img src="src/assets/print2.png" alt="Imagem com Inicias na Liga Pokémon" className="w-full h-auto rounded-lg object-cover" />
                            </CarouselItem>
                            <CarouselItem>
                                <img src="src/assets/print3.png" alt="Batalha entre 2 jogadores" className="w-full h-auto rounded-lg object-cover" />
                            </CarouselItem>
                            <CarouselItem>
                                <img src="src/assets/print4.png" alt="Imagem com Inicias de Kanto" className="w-full h-auto rounded-lg object-cover" />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className="-left-6 sm:-left-12" />
                        <CarouselNext className="-right-6 sm:-right-12" />
                    </Carousel>
                </div>

                <Roadmap />
            </div>

            <div className="bg-primary w-full flex flex-col items-center gap-6 text-center px-4 py-12 sm:py-16">
                <h2 className="font-body text-lg sm:text-xl md:text-2xl font-bold text-bright_text">
                    Ficou com alguma dúvida ou quer participar da comunidade?
                </h2>
                <Button
                    label="Acesse nosso Discord!"
                    icon={FaDiscord}
                    onClick={() => window.open("https://discord.com/invite/pCQEge6hUv", "_blank")}
                />
            </div>
        </div>
    );
}